#!/usr/bin/env node
/* Validation harness: parses script.txt with the real engine parser and
 * cross-checks every referenced asset against assets/manifest.json.
 * Run: node claude-notes/tools/validate_script.js
 */
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "../..");
const { parseScript, SPEAKERS } = require(path.join(root, "engine.js"));

const text = fs.readFileSync(path.join(root, "script.txt"), "utf8");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "assets/manifest.json"), "utf8")
);
const { ins, chapters } = parseScript(text);

let errors = 0, warnings = 0;
const err = (m) => { console.log("ERROR:", m); errors++; };
const warn = (m) => { console.log("warn :", m); warnings++; };

/* --- unknown directives --- */
for (const c of ins)
  if (c.op === "unknown") err(`unknown directive @${c.name} ${c.rest}`);

/* --- asset references --- */
const missing = new Set();
const usedSprites = new Set();
for (const c of ins) {
  if (c.op === "bg" && !manifest.bg[c.id]) missing.add("bg: " + c.id);
  if (c.op === "cg" && !manifest.cg[c.id]) missing.add("cg: " + c.id);
  if (c.op === "sprite") {
    const id = c.char + "." + c.expr;
    usedSprites.add(id);
    if (!manifest.sprites[id]) missing.add("sprite: " + id);
  }
  if (c.op === "bgm" && c.id !== "stop" && !manifest.audio[c.id])
    warn("bgm not in manifest (will be silent): " + c.id);
  if (c.op === "sfx" && c.id !== "stop" && !manifest.audio[c.id])
    warn("sfx not in manifest (will be silent): " + c.id);
}
for (const m of missing) err("missing asset — " + m);

/* --- files actually exist --- */
for (const sect of ["bg", "cg", "sprites", "ui", "audio"])
  for (const [id, p] of Object.entries(manifest[sect] || {}))
    if (!fs.existsSync(path.join(root, p))) err(`manifest ${sect}/${id} -> ${p} file missing`);

/* --- structure checks --- */
if (chapters.length !== 13) err(`expected 13 chapters, got ${chapters.length}`);
const chNums = chapters.map((c) => c.n).join(",");
if (chNums !== "1,2,3,4,5,6,7,8,9,10,11,12,13")
  err("chapter numbering off: " + chNums);

/* voiceover balance */
let vo = "off";
for (const c of ins) {
  if (c.op === "voiceover") vo = c.mode;
  if (c.op === "fadeout") vo = "off"; // @fadeout dismisses the voiceover with the scene
  if ((c.op === "say") && vo !== "off")
    err(`tagged dialogue inside voiceover mode: ${c.speaker}: ${c.text.slice(0, 40)}`);
}
if (vo !== "off") err("script ends with voiceover still " + vo);

/* montage balance */
let inMontage = false;
for (const c of ins) {
  if (c.op === "montage") {
    if (inMontage) err("nested @montage begin");
    inMontage = true;
  }
  if (c.op === "montage_end") {
    if (!inMontage) err("stray @montage end");
    inMontage = false;
  }
  if (inMontage && (c.op === "say")) err("dialogue inside montage");
}
if (inMontage) err("unclosed montage");

/* sprite slot sanity: 'Her' never appears in left slot, Avram never right */
for (const c of ins) {
  if (c.op !== "sprite") continue;
  if (c.char.startsWith("her") && c.slot !== "right")
    warn(`her sprite in ${c.slot} slot`);
  if (c.char.startsWith("avram") && c.slot !== "left")
    warn(`avram sprite in ${c.slot} slot`);
}

/* simulate a full click-through: every blocking op reachable, count clicks */
const BLOCKING = new Set(["say", "narrate", "hold", "pause", "floor", "overlay"]);
let clicks = 0, montage = false, dialogueLines = 0, narration = 0, voLines = 0;
vo = "off";
for (const c of ins) {
  if (c.op === "voiceover") vo = c.mode;
  if (c.op === "fadeout") vo = "off";
  if (c.op === "montage") montage = true;
  if (c.op === "montage_end") montage = false;
  if (BLOCKING.has(c.op) || (c.op === "cg" && montage)) clicks++;
  if (c.op === "say") dialogueLines++;
  if (c.op === "narrate" && vo === "off") narration++;
  if (c.op === "narrate" && vo !== "off") voLines++;
}

/* expression usage summary */
const exprByChar = {};
for (const id of usedSprites) {
  const [ch, ex] = id.split(".");
  (exprByChar[ch] = exprByChar[ch] || []).push(ex);
}
const unusedSprites = Object.keys(manifest.sprites).filter((s) => !usedSprites.has(s));

console.log("—".repeat(50));
console.log(`instructions: ${ins.length}`);
console.log(`chapters: ${chapters.map((c) => c.n + ":" + c.title).join(" | ")}`);
console.log(`dialogue lines: ${dialogueLines}, narration: ${narration}, voiceover lines: ${voLines}`);
console.log(`total reader clicks (excl. auto-advance timers): ~${clicks}`);
console.log(`distinct sprites used: ${usedSprites.size}; unused in library: ${unusedSprites.length}`);
if (unusedSprites.length) console.log("  unused:", unusedSprites.join(", "));
console.log("—".repeat(50));
console.log(errors ? `FAIL — ${errors} error(s), ${warnings} warning(s)` : `OK — 0 errors, ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
