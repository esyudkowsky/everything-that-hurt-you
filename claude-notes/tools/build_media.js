#!/usr/bin/env node
/* ============================================================
 * build_media.js — media pipeline for the R2 CDN move.
 *
 * Node stdlib only. No dependencies, no build step.
 *
 * What it does
 * ------------
 * Reads the DEV manifest (assets/manifest.json), and for every media file it
 * references (images AND audio, across every section: bg/cg/sprites/ui/audio):
 *   1. reads the file bytes,
 *   2. computes an 8-char content hash (sha256, first 8 hex),
 *   3. copies it into /dist-media/ preserving its directory structure, renamed
 *      <name>.<hash8>.<ext>  (e.g. assets/bg/bg_cliff.webp ->
 *      dist-media/assets/bg/bg_cliff.1a2b3c4d.webp),
 *   4. records the hashed relative path in a PRODUCTION manifest.
 *
 * Then, IF a non-empty "base" is configured in media.config.json, it writes
 * assets/manifest.prod.json — a copy of the manifest with every path replaced
 * by its hashed path, plus a top-level "base" field. The engine prefers that
 * file when present (see engine.js boot()), so URLs resolve to base + path.
 *
 * Idempotent: unchanged file -> same hash -> same filename -> same URL, so the
 * immutable Cache-Control on R2 stays valid and an art fix automatically gets a
 * new filename (cache bust for free). /dist-media is wiped and regenerated each
 * run so the upload set is exactly the current media (no stale accumulation).
 *
 * Deploy workflow (see HUMAN.md, section 5):
 *   1. set "base" in claude-notes/tools/media.config.json to your R2 URL
 *      (with trailing slash),
 *   2. node claude-notes/tools/build_media.js,
 *   3. upload the CONTENTS of /dist-media/ to R2 (immutable Cache-Control),
 *   4. commit assets/manifest.prod.json and redeploy Vercel.
 *
 * Local dev is untouched: assets/manifest.json (relative, unhashed) is the
 * checked-in dev manifest; without a manifest.prod.json the engine uses it.
 * ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const TOOLS_DIR = __dirname;
const ROOT = path.resolve(TOOLS_DIR, "..", "..");
const DEV_MANIFEST = path.join(ROOT, "assets", "manifest.json");
const PROD_MANIFEST = path.join(ROOT, "assets", "manifest.prod.json");
const CONFIG = path.join(TOOLS_DIR, "media.config.json");
const DIST = path.join(ROOT, "dist-media");

// Sections of the manifest that hold media files to hash+move. Everything in the
// manifest today is media; if a non-media section is ever added, list it here to
// exclude it, otherwise all object-valued sections are processed.
const NON_MEDIA_KEYS = new Set(["base"]);

function die(msg) {
  console.error("build_media: " + msg);
  process.exit(1);
}

function readJson(file) {
  let txt;
  try { txt = fs.readFileSync(file, "utf8"); }
  catch (e) { die("cannot read " + file + " (" + e.message + ")"); }
  try { return JSON.parse(txt); }
  catch (e) { die("invalid JSON in " + file + " (" + e.message + ")"); }
}

function hash8(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 8);
}

// assets/bg/bg_x.webp  ->  assets/bg/bg_x.<hash>.webp
function hashedRelPath(relPath, hash) {
  const dir = path.posix.dirname(relPath.split(path.sep).join("/"));
  const ext = path.posix.extname(relPath);
  const base = path.posix.basename(relPath, ext);
  const name = base + "." + hash + ext;
  return dir === "." ? name : dir + "/" + name;
}

function rmrf(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function main() {
  const manifest = readJson(DEV_MANIFEST);
  const config = fs.existsSync(CONFIG) ? readJson(CONFIG) : {};
  let base = typeof config.base === "string" ? config.base.trim() : "";
  if (base && !base.endsWith("/")) base += "/"; // normalize: base is a URL prefix

  // Fresh dist-media each run (idempotent: same content -> same hashed names).
  rmrf(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  const prod = {};
  const missing = [];
  let count = 0;

  for (const section of Object.keys(manifest)) {
    if (NON_MEDIA_KEYS.has(section)) continue;
    const entries = manifest[section];
    if (!entries || typeof entries !== "object") continue;
    prod[section] = {};
    for (const id of Object.keys(entries)) {
      const relPath = entries[id];
      const srcAbs = path.join(ROOT, relPath);
      let buf;
      try { buf = fs.readFileSync(srcAbs); }
      catch (e) { missing.push(relPath); continue; }
      const h = hash8(buf);
      const hashedRel = hashedRelPath(relPath, h);
      const destAbs = path.join(DIST, hashedRel);
      fs.mkdirSync(path.dirname(destAbs), { recursive: true });
      fs.writeFileSync(destAbs, buf);
      prod[section][id] = hashedRel;
      count++;
    }
  }

  if (missing.length) {
    die("missing media files referenced by the dev manifest:\n  " +
        missing.join("\n  ") + "\nFix assets/manifest.json before shipping.");
  }

  console.log("build_media: hashed " + count + " media file(s) into " +
              path.relative(ROOT, DIST) + "/");

  if (!base) {
    // No base configured: media is prepared but we deliberately do NOT emit a
    // production manifest (a base-less prod manifest would 404 every asset on
    // the CDN). Remove any stale one so the engine falls back to dev cleanly.
    rmrf(PROD_MANIFEST);
    console.log("build_media: no \"base\" set in " +
                path.relative(ROOT, CONFIG) + " — NOT writing assets/manifest.prod.json.");
    console.log("build_media: set base to your R2 URL and re-run to produce the production manifest.");
    return;
  }

  const outManifest = Object.assign({ base: base }, prod);
  fs.writeFileSync(PROD_MANIFEST, JSON.stringify(outManifest, null, 2) + "\n");
  console.log("build_media: wrote assets/manifest.prod.json (base = " + base + ").");
  console.log("build_media: now upload the CONTENTS of dist-media/ to R2, commit " +
              "assets/manifest.prod.json, and redeploy Vercel.");
}

main();
