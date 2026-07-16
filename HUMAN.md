# HUMAN.md — things that need a human (or that OpenRouter could not do)

Status as of 2026-07-02, end of the audio session. Claude cannot hear audio, and
OpenRouter has no model that makes sound effects — so the items below are yours.

## 1. Four sound effects need to be sourced by hand

OpenRouter's only audio generators are Lyria 3 (music) and GPT-Audio (speech). Every
attempt to get foley out of Lyria produced music — you heard the results. These four
SFX therefore need to come from a free sound library such as freesound.org (filter by
license CC0, or CC-BY if you're willing to credit):

- **sfx_sword** — one sword-on-sword clash (used in the slavetaker ambush).
- **sfx_impact** — one heavy blunt impact (used in the ambush).
- **sfx_crowd** — crowd murmur/hubbub, loopable (used at the auction).
- **sfx_fire** — campfire crackle, loopable (in the spec's audio list, but currently
  not called anywhere in script.txt — lowest priority, maybe skip).

Install: drop files into `assets/audio/` and add entries under `"audio"` in
`assets/manifest.json` (id → path, same as the existing entries). Any format a
browser plays is fine (mp3/ogg/wav). The novel must also work with these missing,
so there's no deadline pressure from the engine side.

## 2. Listen to the music (Claude could only look at it)

All six BGM tracks were generated and QA'd by spectrogram only. Please audition:

- The six tracks in `assets/audio/` (`bgm_wistful`, `bgm_tavern`, `bgm_dungeon`,
  `bgm_tension`, `bgm_lament`, `bgm_void`). Most at risk of being wrong:
  **bgm_dungeon** (its deep booms may feel too rhythmic for ambience) and
  **bgm_void** (a loud pulsing layer enters ~28s in; the intent was near-static).
- The **loop versions** (`bgm_*_loop.mp3` — these are what the game will actually
  play, on repeat). Let each one wrap around at least once and listen to the seam.
  Most at risk: **tavern** and **tension** (the beat may skip at the seam) and
  **void** (the texture shifts at the seam).

If a track is wrong, tell the next Claude session "regenerate bgm_X, it sounds like
Y, it should sound like Z" — the pipeline is one command and eight cents; directions
are in `claude-notes/HANDOFF-AUDIO.md`.

**NEW 2026-07-03 — the two title-screen tracks also need ears.** Generated this
session (same Lyria pipeline, clean instrumental transcripts, spectrogram not yet
re-checked), wired into the title screen:

- **bgm_title** (`assets/audio/bgm_title_loop.mp3`) — the cheerful theme, plays on the
  title screen *before* the story is finished. Meant to be warm/inviting, a storybook
  being opened.
- **bgm_title_end** (`assets/audio/bgm_title_end_loop.mp3`) — the somber theme, plays
  on the title screen *after* the story is finished (save flag `fin`). The author's
  ideal was the *same melody* as bgm_title, reharmonized minor. Lyria is text-only with
  no audio conditioning, so this was prompted with a text description of the cheerful
  theme, not the actual audio — **please judge whether it reads as the same theme or
  just a different sad piece.** A plain contrasting somber track is an acceptable
  fallback if it doesn't land; if you want another try, tell the next session and it
  can regenerate (one command, eight cents each). Note: browsers may keep the title
  music silent until your first click on the page — that's an autoplay-policy quirk,
  not a broken track.

## 3. About sfx_silence-cut (the one SFX that exists)

You asked what it was: the spec calls for "a reverse-cymbal into nothing" to play at
the whiteout — a ~5 second rising *whoosh* that cuts dead to absolute silence the
instant the screen goes white. Lyria couldn't make it, so it was synthesized from
scratch (`claude-notes/tools/make_sfx.py`). It passes structural checks but no one
has heard it: **please listen to `assets/audio/sfx_silence-cut.wav`.** If the swell
sounds cheap or wrong, replace it with a "reverse cymbal" from a sound library
(common search term, many free hits) — but keep the hard cut + trailing silence, or
have the engine cut it; the instant silence IS the effect.

## Money spent this session

≈ $0.72 of OpenRouter credit total: six songs at $0.08, plus ~$0.24 of failed SFX
clip attempts at $0.04 each.

## Finale whiteout hiss — RESOLVED 2026-07-04

The ch15 finale whiteout (`@flash white 1400` before `cg_burning_walk`) now reuses
**`sfx_silence-cut`** — the same hiss as the earlier big whiteout at the wound — per
the author, so no new audio asset is needed.

## 4. Deploy the reader-progress analytics Worker (~10 minutes)

You decided on Cloudflare Workers + Analytics Engine to see how many new readers play
and exactly how far each gets. The code is written and lives in `/analytics/`
(`worker.js`, `wrangler.toml`, plus `queries.md` and `CLIENT-SPEC.md` for reference).
It's anonymous (a random UUID per browser, no PII). You just need to deploy it and
paste the resulting URL back into the site. Everything below is copy-paste.

You need: [Node.js](https://nodejs.org) installed (for `npx`), and a terminal.

### Step 1 — Cloudflare account
Go to https://dash.cloudflare.com/sign-up and create a free account (or log in if you
have one). No credit card needed for what we're using.

### Step 2 — Log wrangler into your account
Wrangler is Cloudflare's CLI; `npx` runs it without a global install.
```sh
cd analytics
npx wrangler login
```
A browser window opens — click **Allow**. (If no browser opens, it prints a URL to
paste.) This links the CLI to your account.

### Step 3 — Deploy
From inside the `analytics/` folder:
```sh
npx wrangler deploy
```
Wrangler reads `wrangler.toml`, creates the Analytics Engine dataset binding, and
publishes the Worker. On success it prints a line like:
```
Published ethy-analytics
  https://ethy-analytics.<your-subdomain>.workers.dev
```
**Copy that `https://...workers.dev` URL.** Sanity-check it:
```sh
curl https://ethy-analytics.<your-subdomain>.workers.dev/health
```
should print `ok`.

### Step 4 — Put the URL into the site
A follow-up Claude session will have added a constant near the top of `engine.js`:
```js
const ANALYTICS_URL = "";
```
Set it to your Worker URL **with `/beacon` on the end**:
```js
const ANALYTICS_URL = "https://ethy-analytics.<your-subdomain>.workers.dev/beacon";
```
While that string is empty, analytics is completely off and the site behaves exactly
as before — so nothing breaks if you deploy the Worker later, or never. Commit + push
the `engine.js` change to publish it on Vercel.

### Step 5 — Create an API token to read the numbers
The Worker *writes* data automatically; to *query* it you need a read token.
1. Go to https://dash.cloudflare.com/profile/api-tokens → **Create Token**.
2. Use the **"Create Custom Token"** template. Give it permission
   **Account → Account Analytics → Read**. Scope it to your account.
3. Create it and **copy the token once** (it's shown only once).
4. You'll also need your **Account ID**: dashboard → Workers & Pages → it's in the
   right-hand sidebar (a 32-char hex string).

Paste both into the `curl` template at the top of `analytics/queries.md`, then run any
of the queries there (unique readers/day, chapter funnel, drop-off histogram, finishes).

### Costs, limits, and retention (verified against Cloudflare docs, 2026-07-16)
- **Retention: 90 days.** Analytics Engine stores each data point for three months,
  then it ages out. If you want history, run the queries periodically and save the
  output. (Cloudflare offers longer retention on request / higher tiers.)
- **Per-write limits (well within our usage):** up to 20 text fields + 20 numeric
  fields + 1 index per event; max 250 events written per Worker request. We write one
  small event per beacon, so this is never a concern.
- **Free tier:** Analytics Engine is included with Workers. The free Workers plan
  covers 100,000 Worker requests/day — far more than an indie novel will see. I could
  not find published exact free-tier *write/query* row allowances for Analytics Engine
  specifically; when you first open the Analytics Engine section of the dashboard it
  will show current pricing/allowances — glance at it, but at this traffic you will be
  comfortably inside the free tier. There is no charge unless you explicitly upgrade.

## 5. Move the media (images + audio) to Cloudflare R2 (~20 minutes)

Decided: the app keeps running on Vercel, but all the heavy media (every image and
audio file the manifest references) moves to a Cloudflare R2 bucket, served from R2's
free public `r2.dev` URL. Vercel keeps serving the small stuff: `index.html`,
`engine.js`, `script.txt`, `assets/manifest.prod.json`, and the `<head>` og:image +
favicon. Content-hashed filenames + a one-year immutable cache header mean a browser
re-downloads a file only when its bytes actually change.

A Claude session already built the tooling and wired the engine:
- `claude-notes/tools/build_media.js` — hashes + copies every manifest media file into
  `/dist-media/` and emits the production manifest.
- `claude-notes/tools/media.config.json` — holds the one swappable `base` URL.
- `engine.js` — prefers `assets/manifest.prod.json` when present and resolves every
  asset as `base + path`; with no prod manifest it uses the local `assets/manifest.json`
  exactly as before.

You need: [Node.js](https://nodejs.org) and a terminal. The migration is safe to do
whenever — until you set `base` and commit a prod manifest, nothing changes.

### Step 1 — Create the R2 bucket
Cloudflare dashboard → **R2** → **Create bucket**. Name it e.g. `ethy-media`. (R2 has a
free tier: 10 GB storage + generous free operations; this project's media is well under
that. No credit card needed to start, though R2 may ask you to add a payment method for
the R2 product specifically — you will not be charged at this scale.)

### Step 2 — Turn on public `r2.dev` access
Open the bucket → **Settings** → **Public access** → enable **r2.dev subdomain** (Allow
Access). Cloudflare gives you a URL like:
```
https://pub-<hash>.r2.dev
```
**Copy it.** That is your `base`.

> ⚠️ **Verified caveat (Cloudflare R2 docs, checked 2026-07-16):** public access
> through `r2.dev` "is rate-limited and should only be used for development purposes"
> — it throttles to `429` at hundreds of requests/second and is **not** cached at
> Cloudflare's edge. At this project's traffic that is completely fine. When you want
> production-grade delivery (edge caching, higher limits), attach a **custom domain**
> to the bucket — see the upgrade path at the end. The engine is built so that switch
> is a one-line change.

### Step 3 — Point the config at your bucket and build
Edit `claude-notes/tools/media.config.json` and set `base` to your r2.dev URL **with a
trailing slash**:
```json
{ "base": "https://pub-<hash>.r2.dev/" }
```
Then, from the repo root:
```sh
node claude-notes/tools/build_media.js
```
This creates `/dist-media/` (hashed copies of every image + audio file, directory
structure preserved) and writes `assets/manifest.prod.json`. (With `base` empty it
prepares `/dist-media/` but deliberately writes **no** prod manifest, so a base-less,
would-404 manifest can never ship.)

### Step 4 — Upload `/dist-media/` to the bucket with the immutable cache header
Every object must be uploaded with:
```
Cache-Control: public, max-age=31536000, immutable
```
Because the filenames are content-hashed, this header is safe and the same for *every*
object (change the bytes → new filename → new URL → cache is bypassed automatically).

**Recommended: rclone** (the standard tool for bulk directory sync to R2; wrangler
historically uploads one object at a time and its bulk command sets metadata only
globally — but a single global header is exactly what we want here, so either works).

Verified against Cloudflare's rclone guide (2026-07-16), configure `~/.config/rclone/rclone.conf`:
```toml
[r2]
type = s3
provider = Cloudflare
access_key_id = <R2 API token access key>
secret_access_key = <R2 API token secret>
endpoint = https://<accountid>.r2.cloudflarestorage.com
acl = private
```
(Create the access key/secret in the dashboard: **R2 → Manage R2 API Tokens → Create
API token**, Object Read & Write. The `endpoint` is the S3 API endpoint — the
`<accountid>.r2.cloudflarestorage.com` one, **not** the r2.dev URL.)

Then, from the repo root, upload preserving paths and stamping the cache header on
every object (`--header-upload` is rclone's S3-backend flag for exactly this — confirm
with `rclone help flags header-upload` on your version):
```sh
rclone copy dist-media/ r2:ethy-media/ \
  --header-upload "Cache-Control: public, max-age=31536000, immutable" \
  --progress
```
This lands objects at keys like `assets/bg/bg_town_gate.4934f376.webp`, which is exactly
`base + path` from the prod manifest.

**Alternative: wrangler** (Cloudflare's CLI, `npx wrangler`) — single-object put supports
the cache header via `--cache-control` (alias `--cc`), e.g.
`npx wrangler r2 object put ethy-media/assets/bg/x.<hash>.webp --file=... --cache-control "public, max-age=31536000, immutable"`.
Fine for a one-off fix; tedious for the whole set. Prefer rclone for the bulk upload.

**Then verify the header actually comes back** (the docs do not explicitly promise that
`r2.dev` echoes stored `Cache-Control` on responses, so confirm it rather than trust it):
```sh
curl -I "https://pub-<hash>.r2.dev/assets/bg/bg_town_gate.<hash>.webp"
```
You should see `HTTP/2 200` and a `cache-control: public, max-age=31536000, immutable`
line. If the header is missing, re-upload with the flag above; if it is present, browser
caching is working (edge caching is a custom-domain feature, see below).

### Step 5 — Ship it
```sh
git add assets/manifest.prod.json claude-notes/tools/media.config.json
git commit -m "Serve media from R2"
git push
```
Vercel redeploys; `engine.js` now loads `manifest.prod.json`, sees the `base`, and pulls
every image/audio file from R2. **Foolproof failure, by design:** if the prod manifest is
present but media does not actually load from `base` (wrong URL, forgot to upload), the
site shows a loud boot error naming the base instead of silently rendering placeholders.
You can leave the original `assets/**` image/audio files in the repo (Vercel ignores them
once the prod manifest is in use) or delete them in a later cleanup — either is fine.

### Future art updates (the whole point of the hashing)
When you replace or add art/audio, the flow is always:
1. drop the new file into `assets/` and update `assets/manifest.json` (id → path),
2. `node claude-notes/tools/build_media.js`,
3. `rclone copy dist-media/ r2:ethy-media/ --header-upload "Cache-Control: public, max-age=31536000, immutable"`
   (unchanged files keep their hash and are skipped/identical; changed files get a new
   hashed name automatically),
4. commit the updated `assets/manifest.prod.json` and push.
No cache purge needed — a changed file is a new URL.

### Later: custom-domain upgrade (production-grade delivery)
When you own a domain on Cloudflare, attach it to the bucket (**bucket → Settings →
Custom Domains → Connect Domain**, e.g. `media.yourdomain.com`). That gives you real
Cloudflare **edge caching** and no r2.dev rate limit. The only app change is a **one-line**
edit: set `base` in `media.config.json` to `https://media.yourdomain.com/`, re-run
`build_media.js`, commit the regenerated `manifest.prod.json`, push. (You do not have to
re-upload the media — same bucket, same object keys.)

