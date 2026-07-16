/* ============================================================
 * ethy-analytics — Cloudflare Worker for reader-progress beacons
 *
 * Plain Worker, no build step, no npm deps. Writes one row per
 * reader event into a Workers Analytics Engine dataset.
 *
 * Routes:
 *   POST /beacon  -> record an event (always answers 204, even on junk)
 *   GET  /health  -> 200 "ok"
 *   OPTIONS *     -> CORS preflight
 *
 * Privacy stance: garbage / disallowed input is dropped SILENTLY with
 * 204 so abusers get no signal about what validation rejected.
 * ============================================================ */

"use strict";

// Origins allowed to talk to us. Production Vercel site + local dev servers.
const ALLOWED_ORIGINS = new Set([
  "https://everything-that-hurt-you.vercel.app",
  "http://localhost:8000",
  "http://localhost:8321",
  "http://127.0.0.1:8000",
  "http://127.0.0.1:8321",
]);

// Event names we accept. Anything else is dropped.
const EVENTS = new Set(["start", "chapter", "finish", "exit"]);

// Domain bounds for the story: 16 chapters (0-15), ~537 lines (0..536).
// PC_MAX is generous headroom in case the script grows; still rejects absurd values.
const CH_MIN = 0, CH_MAX = 15;
const PC_MIN = 0, PC_MAX = 100000;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    // Preflight: browsers send this for application/json POSTs.
    if (request.method === "OPTIONS") {
      return preflight(origin);
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return withCors(new Response("ok", { status: 200 }), origin);
    }

    if (request.method === "POST" && url.pathname === "/beacon") {
      // From here on we NEVER surface a non-204: parse errors, bad types,
      // out-of-range values all fall through to the same silent 204.
      try {
        const raw = await request.text();
        const evt = parseEvent(raw);
        if (evt) {
          // blobs: string columns; doubles: numeric columns; indexes: 1 sampling key.
          env.READER_EVENTS.writeDataPoint({
            blobs: [evt.ev, evt.rid],
            doubles: [evt.ch, evt.pc, evt.fin],
            indexes: [evt.rid],
          });
        }
      } catch (_) {
        // swallow — never signal failure
      }
      return withCors(new Response(null, { status: 204 }), origin);
    }

    return withCors(new Response("not found", { status: 404 }), origin);
  },
};

/* ---------------- validation ---------------- */

// Returns a normalized event object, or null if anything is off.
function parseEvent(raw) {
  if (!raw || raw.length > 2048) return null; // cap body size
  let body;
  try {
    body = JSON.parse(raw);
  } catch (_) {
    return null;
  }
  if (typeof body !== "object" || body === null) return null;

  const ev = body.ev;
  if (typeof ev !== "string" || !EVENTS.has(ev)) return null;

  // rid: anonymous UUID string. Enforce a UUID-ish shape (length + charset)
  // rather than a strict RFC parse — cheap, and rejects obvious junk.
  const rid = body.rid;
  if (typeof rid !== "string" || rid.length < 8 || rid.length > 64) return null;
  if (!/^[0-9a-fA-F-]+$/.test(rid)) return null;

  const ch = intInRange(body.ch, CH_MIN, CH_MAX);
  if (ch === null) return null;

  const pc = intInRange(body.pc, PC_MIN, PC_MAX);
  if (pc === null) return null;

  // fin is a 0/1 flag.
  const fin = intInRange(body.fin, 0, 1);
  if (fin === null) return null;

  return { ev, rid, ch, pc, fin };
}

// Integer within [min,max] (inclusive), else null. Rejects floats and NaN.
function intInRange(v, min, max) {
  if (typeof v !== "number" || !Number.isInteger(v)) return null;
  if (v < min || v > max) return null;
  return v;
}

/* ---------------- CORS ---------------- */

function preflight(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return new Response(null, { status: 204, headers });
}

function withCors(resp, origin) {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    resp.headers.set("Access-Control-Allow-Origin", origin);
    resp.headers.set("Vary", "Origin");
  }
  return resp;
}
