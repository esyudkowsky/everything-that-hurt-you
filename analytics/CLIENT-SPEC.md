# Client contract — wiring engine.js to the analytics beacon

This is the exact contract for the follow-up agent that will add analytics calls to
`engine.js`. The server side (`analytics/worker.js`) is already built and expects
precisely the payload described here. Do not change the payload shape without also
updating the Worker and `queries.md`.

## Endpoint constant

Add a single constant near the top of `engine.js`:

```js
const ANALYTICS_URL = ""; // e.g. "https://ethy-analytics.<subdomain>.workers.dev/beacon"
```

The author pastes the deployed Worker URL here (see HUMAN.md). While it is the empty
string, **all analytics is disabled** — the site must behave exactly as it does today.

## Anonymous reader id (rid)

```js
let rid = localStorage.getItem("ethy_rid");
if (!rid) { rid = crypto.randomUUID(); localStorage.setItem("ethy_rid", rid); }
```

- Key is exactly `ethy_rid`.
- `crypto.randomUUID()` — anonymous, no PII, no fingerprinting.
- Persisted so a returning reader is the same rid across sessions.

## When analytics is OFF (fail-safe gates)

Sending is **disabled** (do nothing, silently) when ANY of:

1. `ANALYTICS_URL` is empty, OR
2. `location.hostname` is `localhost` or `127.0.0.1` — UNLESS a debug flag is set
   (e.g. `localStorage.getItem("ethy_debug") === "1"` or `?ethy_debug=1`), so the
   author can test locally on purpose.

Wrap all of this in a single guard, e.g. `analyticsEnabled()`, checked before every send.

## Payload shape (every event)

JSON object with these five fields, always all present:

```json
{ "rid": "<uuid>", "ev": "start|chapter|finish|exit", "ch": <int 0-15>, "pc": <int line index>, "fin": <0|1> }
```

- `ch` — current chapter (0–15).
- `pc` — current line index (0..~536). Send the reader's **current** line for
  start/chapter/finish, and their **furthest reached** line for exit.
- `fin` — 1 if the reader has finished the story before (the engine's existing `fin`
  save flag), else 0. Pass whatever the engine already tracks; 0 is a safe default.

## Send mechanism

Two paths, both fail-silent (wrap in try/catch, ignore all errors/rejections):

**Normal events (start / chapter / finish)** — `fetch`, fire-and-forget:

```js
fetch(ANALYTICS_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
  keepalive: true,
}).catch(() => {});
```

**Exit event** — `navigator.sendBeacon` on `pagehide` and on `visibilitychange` when
`document.visibilityState === "hidden"` (covers mobile/tab-close where fetch won't run):

```js
// sendBeacon sends text/plain and CANNOT be aborted — ideal for unload.
// The Worker accepts text/plain bodies containing the JSON, so no header needed.
navigator.sendBeacon(ANALYTICS_URL, JSON.stringify(payload));
```

Note: `sendBeacon` sends `Content-Type: text/plain`, which is a CORS "simple request"
— no preflight — and the Worker parses the JSON out of the text body. Do not set a
JSON content-type on the beacon or the browser will try to preflight and it will fail
during unload.

## Firing rules (dedupe — do NOT spam)

Use localStorage to make each of these fire the minimum number of times.

- **start** — once per reader, ever. First time a story line is shown. Guard with a
  flag like `localStorage.getItem("ethy_started")`; set it after sending.
- **chapter** — once per NEW max chapter reached. Keep a set of chapters already
  reported, e.g. JSON array in `localStorage["ethy_ch_sent"]`; when the reader enters
  a chapter number not in the set, send `chapter` and add it. Never re-send a chapter.
- **finish** — once, when the end card is shown. Guard with `localStorage["ethy_finished"]`.
- **exit** — via sendBeacon on pagehide / hidden. **Throttle:** track the last pc you
  sent an exit for (`localStorage["ethy_exit_pc"]`). Only send if the reader's current
  max pc is greater than that value; then update it. This means idle tab-switches with
  no reading progress send nothing.

All four sends respect the OFF gates above.

## Summary of localStorage keys this introduces

| key                 | purpose                                            |
|---------------------|----------------------------------------------------|
| `ethy_rid`          | anonymous reader UUID                              |
| `ethy_started`      | start event already sent                          |
| `ethy_ch_sent`      | JSON array of chapters already reported            |
| `ethy_finished`     | finish event already sent                          |
| `ethy_exit_pc`      | furthest pc an exit beacon has been sent for       |
| `ethy_debug` (opt)  | set to "1" to enable analytics on localhost        |

None of these collide with the engine's existing save keys — confirm against the
current `engine.js` persistence code before shipping.
