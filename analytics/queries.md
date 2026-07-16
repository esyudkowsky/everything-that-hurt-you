# Analytics Engine queries — reader progress

These run against the Workers Analytics Engine **SQL API**, not `wrangler`. Each
query below is a bare SQL statement; run any of them with the curl template.

## Column mapping

The Worker writes each event as (see `worker.js`):

| SQL column | source            | meaning                                  |
|------------|-------------------|------------------------------------------|
| `blob1`    | `blobs[0]`        | event name: `start`/`chapter`/`finish`/`exit` |
| `blob2`    | `blobs[1]`        | `rid` — anonymous reader UUID            |
| `double1`  | `doubles[0]`      | `ch` — chapter (0–15)                     |
| `double2`  | `doubles[1]`      | `pc` — line index                         |
| `double3`  | `doubles[2]`      | `fin` — finished-before flag (0/1)        |
| `index1`   | `indexes[0]`      | `rid` (sampling key)                      |
| `timestamp`| auto              | server receive time (UTC)                 |

Dataset/table name is `reader_events` (the `dataset` in `wrangler.toml`).

## A note on sampling (READ THIS)

Analytics Engine **adaptively samples** writes under high volume. Every returned
row carries an implicit `_sample_interval` — the number of real events that row
represents. For anything counting events or readers you must weight by it:

- count of events  → `SUM(_sample_interval)`
- distinct readers → cannot be summed; use `count(DISTINCT blob2)` (an estimate;
  sampling makes it a lower-ish bound, but for a novel with modest traffic you
  will almost never be sampled and counts are exact).

The Worker sets `indexes = [rid]`, so when sampling does kick in it keeps or drops
whole readers together — that makes per-reader funnels/histograms below coherent
rather than tearing a single reader's events apart.

For a low-traffic indie title you are very unlikely to hit sampling at all, so the
plain `count(DISTINCT ...)` forms below are given directly; `SUM(_sample_interval)`
is noted where it matters if you ever do get popular.

## curl template

```sh
# Fill these in:
CF_ACCOUNT_ID="<your-account-id>"        # Cloudflare dashboard -> Workers -> right sidebar
CF_API_TOKEN="<your-api-token>"          # token with "Account Analytics: Read" (see HUMAN.md)

curl -s "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/analytics_engine/sql" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: text/plain" \
  --data "SELECT 1"          # <-- replace this string with any query below
```

Tip: put a query in a file and pass `--data @query.sql`. Add `FORMAT JSON` /
default returns JSON; append your own `LIMIT` while exploring.

---

## (a) Unique readers per day

```sql
SELECT
  toDate(timestamp) AS day,
  count(DISTINCT blob2) AS readers
FROM reader_events
WHERE timestamp > now() - INTERVAL '30' DAY
GROUP BY day
ORDER BY day;
```

"A reader" = any rid that produced at least one event that day. To count only
readers who actually began the story, add `AND blob1 = 'start'` (start fires once
per reader on the first line shown — see CLIENT-SPEC.md).

## (b) Funnel — distinct readers whose max chapter ≥ N (N = 1..15)

One row per threshold N with the number of readers who reached at least chapter N.
Uses a per-reader max chapter, then counts readers at each cutoff.

```sql
WITH per_reader AS (
  SELECT blob2 AS rid, max(double1) AS max_ch
  FROM reader_events
  WHERE timestamp > now() - INTERVAL '90' DAY
  GROUP BY rid
)
SELECT n AS chapter_at_least,
       count(*) AS readers
FROM per_reader
ARRAY JOIN [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] AS n
WHERE max_ch >= n
GROUP BY n
ORDER BY n;
```

If `ARRAY JOIN` gives you trouble on the SQL API, the portable fallback is 15
one-line queries:

```sql
SELECT count(DISTINCT blob2) FROM reader_events WHERE double1 >= 1;   -- repeat with 2, 3, ... 15
```

## (c) Drop-off histogram — per-reader furthest line (pc), bucketed by 10

Where do readers stop? Take each reader's furthest line, bucket into groups of 10
lines, and count readers per bucket. A tall bar followed by a cliff = a drop-off point.

```sql
WITH per_reader AS (
  SELECT blob2 AS rid, max(double2) AS max_pc
  FROM reader_events
  WHERE timestamp > now() - INTERVAL '90' DAY
  GROUP BY rid
)
SELECT
  floor(max_pc / 10) * 10 AS pc_bucket_start,   -- e.g. 120 means lines 120-129
  count(*) AS readers
FROM per_reader
GROUP BY pc_bucket_start
ORDER BY pc_bucket_start;
```

## (d) Finishes per day

```sql
SELECT
  toDate(timestamp) AS day,
  count(DISTINCT blob2) AS finishers
FROM reader_events
WHERE blob1 = 'finish'
  AND timestamp > now() - INTERVAL '90' DAY
GROUP BY day
ORDER BY day;
```

`fin` (double3) is the "has finished before" flag the reader arrived with; `blob1 =
'finish'` is the act of finishing this session. Count finishers with the latter.

---

### Sampling-safe variants (only needed if you ever get high traffic)

Event *counts* (not distinct-reader counts) should weight by the sample interval:

```sql
-- e.g. total beacons received per day, sampling-corrected
SELECT toDate(timestamp) AS day, SUM(_sample_interval) AS events
FROM reader_events
GROUP BY day ORDER BY day;
```
