/* ============================================================
 * EVERYTHING THAT HURT YOU — kinetic novel engine
 * Vanilla JS, no dependencies, no build step. Parses script.txt
 * at load (see informal spec, Part IV). Runs from any static host.
 *
 * Persistence: progress auto-saves on every displayed line to BOTH
 * a cookie and localStorage (no UI action). Chapter menu lets the
 * reader rejoin any chapter already reached.
 * ============================================================ */
"use strict";

/* ---------------- parser ---------------- */

const SPEAKERS = new Set([
  "Avram", "Her", "Bartender", "Announcer", "Clerk",
  "Adventurer 1", "Adventurer 2", "Adventurer 3", "Adventurer 4", "Adventurer 5", "Adventurer 6", "Healer", "Slavetaker", "Bandit",
  "Attendant", "Nobleman", "God",
]);

function parseScript(text) {
  const raw = text.split(/\r?\n/);
  const ins = [];
  const chapters = [];
  let pendingSmall = false; // @small marks the NEXT say to render smaller/quieter
  let pendingSlow = false; // @slow marks the NEXT say to type slower
  let i = 0;
  while (i < raw.length) {
    const line = raw[i].trim();
    i++;
    if (!line) continue;
    if (line.startsWith("@")) {
      const m = line.match(/^@(\w+)\s*(.*)$/);
      if (!m) continue;
      const name = m[1];
      const rest = m[2].trim();
      switch (name) {
        case "note":
          break;
        case "bg": {
          const [id, trans, ms] = rest.split(/\s+/);
          ins.push({ op: "bg", id, trans: trans || "fade", ms: +ms || 0 });
          break;
        }
        case "cg": {
          const [id, trans] = rest.split(/\s+/);
          ins.push({ op: "cg", id, trans: trans || "fade" });
          break;
        }
        case "sprite": {
          const [char, expr, slot, anim] = rest.split(/\s+/);
          ins.push({ op: "sprite", char, expr, slot: slot || "left", anim: anim || null });
          break;
        }
        case "clear":
          ins.push({ op: "clear", what: rest || "all" });
          break;
        case "voiceover":
          ins.push({ op: "voiceover", mode: rest }); // on | off | over
          break;
        case "flash": {
          const [color, ms, hold] = rest.split(/\s+/);
          ins.push({ op: "flash", color: color || "white", ms: +ms || 300, hold: +hold || 0 });
          break;
        }
        case "overlay": {
          if (rest.startsWith("floor")) {
            ins.push({ op: "floor", n: +rest.split(/\s+/)[1] });
          } else if (rest === "end") {
            // stray end; ignore
          } else {
            const kind = rest.split(/\s+/)[0]; // status | inscription
            const lines = [];
            while (i < raw.length) {
              const l = raw[i].trim();
              i++;
              if (l === "@overlay end") break;
              if (l.startsWith(">")) lines.push(l.replace(/^>\s?/, ""));
            }
            ins.push({ op: "overlay", kind, lines });
          }
          break;
        }
        case "montage": {
          const p = rest.split(/\s+/);
          if (p[0] === "begin") ins.push({ op: "montage", secs: +p[1] || 4 });
          else ins.push({ op: "montage_end" });
          break;
        }
        case "pause":
          ins.push({ op: "pause", ms: +rest || 800 });
          break;
        case "hold":
          ins.push({ op: "hold" });
          break;
        case "small":
          pendingSmall = true; // attaches to the next say line; no instruction
          break;
        case "slow":
          pendingSlow = true; // next say line types slower (no instruction)
          break;
        case "autoplay":
          // @autoplay <ms> turns on scoped auto-advance; @autoplay off turns it off
          ins.push({ op: "autoplay", ms: rest === "off" ? null : (+rest || 3000) });
          break;
        case "textbox":
          ins.push({ op: "textbox", show: rest !== "hide" });
          break;
        case "tint":
          ins.push({ op: "tint", mode: rest || "off" });
          break;
        case "sfx":
          ins.push({ op: "sfx", id: rest });
          break;
        case "bgm": {
          const p = rest.split(/\s+/);
          ins.push({ op: "bgm", id: p[0], instant: p[1] === "cut" });
          break;
        }
        case "chapter": {
          const cm = rest.match(/^(\d+)\s+(.*)$/);
          const ch = { op: "chapter", n: +cm[1], title: cm[2], at: ins.length };
          chapters.push(ch);
          ins.push(ch);
          break;
        }
        default:
          ins.push({ op: "unknown", name, rest });
      }
    } else {
      const dm = line.match(/^([A-Za-z][A-Za-z0-9 ]{0,20}?):\s+(.*)$/);
      if (dm && SPEAKERS.has(dm[1])) {
        ins.push({ op: "say", speaker: dm[1], text: dm[2], small: pendingSmall, slow: pendingSlow });
        pendingSmall = false; pendingSlow = false;
      } else {
        ins.push({ op: "narrate", text: line });
      }
    }
  }
  return { ins, chapters };
}

/* *word* -> emphasis tokens; also HTML-escapes */
function emphasisTokens(text) {
  const tokens = [];
  const parts = text.split(/\*([^*]+)\*/);
  for (let j = 0; j < parts.length; j++) {
    if (parts[j] === "") continue;
    tokens.push({ t: parts[j], em: j % 2 === 1 });
  }
  return tokens;
}

/* node export for the validation harness */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { parseScript, SPEAKERS, emphasisTokens };
}

/* ---------------- player (browser only) ---------------- */

if (typeof document !== "undefined") (function () {
  const $ = (id) => document.getElementById(id);
  const SAVE_KEY = "ethy_save";
  const SETTINGS_KEY = "ethy_settings";
  // showChapter: "full" (Ch. N/TOTAL · Title) | "number" (Ch. N/TOTAL) | "off"
  const DEFAULT_SETTINGS = { typeMs: 33, autoplay: false, autoplayDelayMs: 900, showChapter: "number", musicOn: true };
  const TINTS = {
    night: "rgba(18, 38, 88, 0.30)",
    dusk: "rgba(120, 60, 20, 0.22)",
    firelight: "rgba(255, 140, 40, 0.14)",
    off: "rgba(0,0,0,0)",
  };

  let MANIFEST = null;
  let SCRIPT = null;

  let pc = 0;
  let maxPc = 0;
  let finished = false;
  let cameFromFinale = false; // reached the title straight from the ending this session
  let waiting = false;     // waiting for click at ins[pc]
  let autoTimer = null;    // pause/floor/montage auto-advance
  let voHideTimer = null;  // deferred voiceover-layer fade-out hide
  let typer = null;        // {tokens, count, total, node}
  let mode = "title";      // title | play | menu
  let statusShown = false; // status overlay currently waiting
  // rollback / scene review (standard VN backlog navigation)
  let history = [];        // pcs of blocking stops this play session
  let reviewIdx = 0;       // index into history currently displayed
  let reviewing = false;   // true while showing a rolled-back (past) beat
  let uiHidden = false;    // effective: all overlay UI hidden to view/screenshot art
  let shiftPeek = false;   // Shift currently held (momentary peek)
  let capsSticky = false;  // Caps Lock toggled ON mid-scene (sticky until advance)
  let musicEnabled = true; // music on/off preference (corner toggle); persisted in settings
  let titleMusicPick = null; // jukebox pick from the title Chapters screen: temporarily
                             // overrides the title BGM, forgotten once play begins
  let audioUnlocked = false; // has a real user gesture let audio actually start playing yet?
  let chapFading = false;  // a coordinated chapter fade is in progress
  let chapArmed = false;   // this step() run may trigger a chapter fade (forward play only)
  const CHAP_FADE_MS = 1800; // fade-to-black / fade-in duration
  const CHAP_HOLD_MS = 400;  // beat of full black between the two fades
  const st = freshState();
  let settings = loadSettings();

  function loadSettings() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(SETTINGS_KEY)); } catch (e) {}
    const merged = Object.assign({}, DEFAULT_SETTINGS, s || {});
    // migrate the old boolean showChapter (true=full title, false=off) to the tri-state
    if (merged.showChapter === true) merged.showChapter = "full";
    else if (merged.showChapter === false) merged.showChapter = "off";
    return merged;
  }
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  function freshState() {
    return {
      bg: null, cg: null,
      sprites: { left: null, center: null, right: null }, // {char, expr}
      tint: "off",
      vo: "off", voLines: [],
      voGroup: [], voShown: 0, // full voiceover group (pre-laid-out) + reveal count
      autoAdvanceMs: null, // scoped @autoplay: auto-advance each beat after this many ms
      montage: null, // {secs}
      bgm: null,
      inscription: null,
      chapter: 0,
    };
  }

  /* ---------- assets ---------- */

  function assetPath(kind, id) {
    const sect = MANIFEST[kind];
    return (sect && sect[id]) || null;
  }
  function spritePath(char, expr) {
    return assetPath("sprites", char + "." + expr);
  }
  const preloaded = new Map();
  function preload(path) {
    if (!path || preloaded.has(path)) return;
    const img = new Image();
    img.src = path;
    preloaded.set(path, img);
  }
  function preloadAhead() {
    let seen = 0;
    for (let j = pc + 1; j < SCRIPT.ins.length && seen < 24; j++, seen++) {
      const c = SCRIPT.ins[j];
      if (c.op === "bg") preload(assetPath("bg", c.id));
      else if (c.op === "cg") preload(assetPath("cg", c.id));
      else if (c.op === "sprite") preload(spritePath(c.char, c.expr));
    }
  }

  /* full-screen image element; falls back to the placeholder card */
  function makeLayerImg(kind, id) {
    const wrap = document.createElement("div");
    wrap.className = "layer-img";
    const path = assetPath(kind, id);
    if (path) {
      wrap.style.backgroundImage = "url('" + path + "')";
    } else {
      wrap.style.backgroundImage =
        "url('" + (assetPath("ui", "placeholder_card") || "") + "')";
      const label = document.createElement("div");
      label.className = "placeholder-label";
      label.textContent = id;
      wrap.appendChild(label);
    }
    return wrap;
  }

  function swapLayer(container, el, trans, ms) {
    const old = Array.from(container.children);
    container.appendChild(el);
    if (trans === "cut") {
      el.style.opacity = "1";
      old.forEach((o) => o.remove());
    } else {
      // optional custom fade duration (ms); default is the .layer-img CSS (600ms)
      if (ms > 0) el.style.transition = "opacity " + ms + "ms ease";
      el.style.opacity = "0";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.opacity = "1";
        })
      );
      setTimeout(() => old.forEach((o) => o.remove()), (ms > 0 ? ms : 600) + 100);
    }
  }

  /* ---------- render primitives ---------- */

  // BG and CG are ONE scene layer (#bglayer). A @bg or @cg just replaces whatever's
  // there — no second layer, no cross-fade between two layers (that was the source of
  // the "weird flashes"). The only difference: a @cg is full art so it clears sprites;
  // a @bg keeps them (characters stand in front of a backdrop). To put a dialogue figure
  // over a CG, set the @sprite AFTER the @cg.
  function setBg(id, trans, instant, ms) {
    st.bg = id; st.cg = null;
    swapLayer($("bglayer"), makeLayerImg("bg", id), instant ? "cut" : trans, ms);
    clearInscription();
  }
  function showCg(id, trans, instant) {
    st.cg = id; st.bg = null;
    execClear("all", instant);
    swapLayer($("bglayer"), makeLayerImg("cg", id), instant ? "cut" : trans);
    clearInscription();
  }
  // clears the whole scene layer (bg OR cg) — used when the voiceover goes to on-black
  function clearCg(trans) {
    st.cg = null; st.bg = null;
    const c = $("bglayer");
    if (!c.children.length) return;
    if (trans === "cut") {
      c.innerHTML = "";
    } else {
      Array.from(c.children).forEach((o) => {
        o.style.opacity = "0";
        setTimeout(() => o.remove(), 700);
      });
    }
  }

  let sprGen = 0;
  function setSprite(char, expr, slot, instant, anim) {
    st.sprites[slot] = { char, expr };
    const holder = $("spr-" + slot);
    holder.dataset.gen = ++sprGen; // invalidate any pending clearSlot wipe
    const path = spritePath(char, expr);
    let img = holder.querySelector("img");
    const entering = !img || holder.dataset.char !== char;
    if (!img) {
      img = document.createElement("img");
      img.alt = "";
      holder.appendChild(img);
    }
    img.onerror = () => {
      img.src = assetPath("ui", "placeholder_card") || "";
    };
    img.src = path || (assetPath("ui", "placeholder_card") || "");
    holder.dataset.char = char;
    holder.style.display = "";
    if (entering && !instant) {
      holder.style.opacity = "0";
      if (anim === "slide")
        holder.style.transform = "translateX(" + (slot === "right" ? "45%" : "-45%") + ")";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          holder.style.opacity = "1";
          if (anim === "slide") holder.style.transform = "translateX(0)";
        })
      );
    } else {
      holder.style.opacity = "1";
      holder.style.transform = "translateX(0)";
    }
  }
  function clearSlot(slot, instant) {
    st.sprites[slot] = null;
    const holder = $("spr-" + slot);
    delete holder.dataset.char;
    const gen = String(++sprGen);
    holder.dataset.gen = gen;
    if (instant) {
      holder.style.display = "none";
      holder.innerHTML = "";
    } else {
      holder.style.opacity = "0";
      setTimeout(() => {
        if (holder.dataset.gen !== gen) return; // a newer sprite took the slot
        holder.style.display = "none";
        holder.innerHTML = "";
      }, 400);
    }
  }
  function execClear(what, instant) {
    if (what === "all") {
      clearSlot("left", instant);
      clearSlot("center", instant);
      clearSlot("right", instant);
    } else clearSlot(what, instant);
  }

  /* speaker -> sprite char prefix, for highlight/dim */
  function speakerPrefix(sp) {
    if (!sp) return null;
    const map = {
      Avram: "avram", Her: "her", Bartender: "bartender",
      Announcer: "announcer", Clerk: "clerk", Healer: "healer",
      "Adventurer 1": "adventurer1", "Adventurer 2": "adventurer2",
      "Adventurer 4": "adventurer4", "Adventurer 5": "adventurer5", "Adventurer 6": "adventurer6",
      Slavetaker: "slavetaker", Bandit: "slavetaker", Attendant: "attendant",
      Nobleman: "nobleman", God: "god",
    };
    return map[sp] || null;
  }
  function applyDim(speaker) {
    const pref = speakerPrefix(speaker);
    for (const slot of ["left", "center", "right"]) {
      const holder = $("spr-" + slot);
      const s = st.sprites[slot];
      if (!s) continue;
      // char id prefix match: "her_camp" speaks for "Her", not "healer" —
      // compare against the char id's first segment before "_" too
      const base = s.char.split("_")[0];
      const speaking = pref && (s.char === pref || base === pref);
      holder.style.filter = !pref || speaking ? "none" : "brightness(0.6)";
    }
  }

  function setTint(mode2) {
    st.tint = mode2;
    $("tint").style.background = TINTS[mode2] || TINTS.off;
  }

  function flash(color, ms, holdMs) {
    const f = $("flash");
    f.style.transition = "none";
    f.style.background = color === "black" ? "#000" : "#fff";
    f.style.opacity = "1";
    // holdMs: keep the screen at full colour for this long BEFORE the fade begins
    // (used so the finale whiteout stays until the ~4.84s hiss finishes).
    const startFade = () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          f.style.transition = "opacity " + ms + "ms ease-out";
          f.style.opacity = "0";
        })
      );
    if (holdMs > 0) setTimeout(startFade, holdMs);
    else startFade();
  }

  /* ---------- textbox / dialogue ---------- */

  function showTextbox(speaker) {
    $("textbox").style.display = "";
    const tagged = !!speaker;
    $("plate").style.display = tagged ? "" : "none";
    $("namelabel").style.display = tagged ? "" : "none";
    $("namelabel").textContent = tagged ? speaker : "";
  }
  function hideTextbox() {
    $("textbox").style.display = "none";
  }

  /* long paragraphs must fit the box: pre-measure at full text and step the
     font size down until nothing clips */
  const DIALOG_SIZES = ["3.4cqh", "3.0cqh", "2.7cqh", "2.4cqh", "2.15cqh", "1.95cqh"];
  function fitDialogFont(text) {
    const node = $("dialog");
    node.textContent = text;
    for (const size of DIALOG_SIZES) {
      node.style.fontSize = size;
      if (node.scrollHeight <= node.clientHeight + 2) break;
    }
    node.textContent = "";
  }

  function startTyper(text, italicAll, small, slow) {
    const node = $("dialog");
    node.innerHTML = "";
    // a "|" in the text is a mid-line pause: type up to it, wait for a click,
    // then continue. Split into segments; the box is fitted to the full text.
    fitDialogFont(text.replace(/\s*\|\s*/g, " "));
    node.classList.toggle("small-line", !!small);
    if (small) node.style.fontSize = "1.9cqh";
    const segments = text.split("|").map((s) => {
      const tokens = emphasisTokens(s.trim());
      return { tokens, total: tokens.reduce((a, t) => a + t.t.length, 0) };
    });
    typer = { segments, segIdx: 0, count: 0, node, italicAll, atPause: false, slow: !!slow };
    tickTyper();
  }
  function renderTyper() {
    const { segments, segIdx, count, node, italicAll } = typer;
    node.innerHTML = "";
    for (let si = 0; si <= segIdx; si++) {
      if (si > 0) node.appendChild(document.createTextNode(" "));
      const seg = segments[si];
      let left = si < segIdx ? seg.total : count;
      for (const tk of seg.tokens) {
        if (left <= 0) break;
        const s = tk.t.slice(0, left);
        left -= tk.t.length;
        const span = document.createElement(tk.em || italicAll ? "em" : "span");
        span.textContent = s;
        node.appendChild(span);
      }
    }
    const segDone = count >= segments[segIdx].total;
    $("adv").style.visibility = segDone ? "visible" : "hidden";
  }
  function tickTyper() {
    if (!typer) return;
    const seg = typer.segments[typer.segIdx];
    // @slow lines always type one char at a time at a deliberate pace, even if
    // the reader's Text Speed is Instant (for the "Goodbye, Master." beat).
    const slow = typer.slow;
    const step = (!slow && settings.typeMs <= 0) ? seg.total : 1;
    const delay = slow ? 95 : settings.typeMs;
    typer.count = Math.min(typer.count + step, seg.total);
    renderTyper();
    if (typer.count < seg.total) {
      typer.timer = setTimeout(tickTyper, delay);
    } else {
      typer.atPause = typer.segIdx < typer.segments.length - 1;
      maybeAutoplay();
    }
  }
  // reveal every remaining segment at once (rollback/review — no animation, no pauses)
  function finishTyperFully() {
    if (!typer) return;
    clearTimeout(typer.timer);
    typer.segIdx = typer.segments.length - 1;
    typer.count = typer.segments[typer.segIdx].total;
    typer.atPause = false;
    renderTyper();
  }
  function completeTyper() {
    if (!typer) return false;
    const seg = typer.segments[typer.segIdx];
    if (typer.count < seg.total) {
      // still typing this segment: a click fast-forwards it to the end
      clearTimeout(typer.timer);
      typer.count = seg.total;
      typer.atPause = typer.segIdx < typer.segments.length - 1;
      renderTyper();
      maybeAutoplay();
      return true; // consumed the click
    }
    if (typer.atPause) {
      // finished a segment at a "|" pause: a click continues to the next segment
      typer.segIdx++;
      typer.count = 0;
      typer.atPause = false;
      tickTyper();
      return true; // consumed the click
    }
    return false;
  }

  /* ---------- voiceover ---------- */

  function setVoiceover(mode2, instant) {
    st.vo = mode2;
    const layer = $("volayer");
    // cancel any pending fade-out hide from a previous "off": otherwise, when
    // an "off" is immediately followed by "over"/"on" in the same click-advance
    // (as in the opening voiceover run), the old 800ms timer fires later and
    // hides the freshly-shown line with no click. (bug fix 2026-07-04)
    if (voHideTimer) { clearTimeout(voHideTimer); voHideTimer = null; }
    if (mode2 === "on" || mode2 === "over") {
      // "on" is meant to be pure black; clear the CG instantly so a stale
      // image can't flash through while volayer's opacity fades in over the
      // scene below it. "over" deliberately keeps the scene visible, skip it.
      if (mode2 === "on") clearCg("cut");
      st.voLines = [];
      $("volines").innerHTML = "";
      layer.classList.toggle("vo-over", mode2 === "over");
      layer.style.display = "";
      layer.style.opacity = instant ? "1" : "0";
      if (!instant)
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (layer.style.opacity = "1"))
        );
      hideTextbox();
    } else {
      if (instant) {
        layer.style.display = "none";
      } else {
        layer.style.opacity = "0";
        voHideTimer = setTimeout(() => {
          voHideTimer = null;
          layer.style.display = "none";
        }, 800);
      }
      $("volines").innerHTML = "";
      st.voLines = [];
    }
  }
  function voLineDiv(text) {
    const div = document.createElement("div");
    div.className = "voline";
    for (const tk of emphasisTokens(text)) {
      const span = document.createElement(tk.em ? "em" : "span");
      span.textContent = tk.t;
      div.appendChild(span);
    }
    return div;
  }
  // Collect every voiceover line of the current group (from the instruction after
  // the @voiceover on/over, up to the next @voiceover directive).
  function voGroupTexts(fromIdx) {
    const texts = [];
    for (let j = fromIdx; j < SCRIPT.ins.length; j++) {
      const c = SCRIPT.ins[j];
      if (c.op === "voiceover") break;
      if (c.op === "narrate") texts.push(c.text);
    }
    return texts;
  }
  // Lay out the WHOLE group up front as hidden (opacity 0) lines so the block's
  // final height/position is fixed. Revealing a line then never nudges the
  // already-visible lines above it (author 2026-07-04).
  function prerenderVoGroup(fromIdx) {
    st.voGroup = voGroupTexts(fromIdx);
    st.voShown = 0;
    st.voLines = [];
    const box = $("volines");
    box.innerHTML = "";
    for (const text of st.voGroup) box.appendChild(voLineDiv(text));
  }
  // Reveal the next pre-laid-out line (or, as a fallback, append one).
  function revealVoLine(instant) {
    const box = $("volines");
    let div = box.children[st.voShown];
    if (!div) { div = voLineDiv(st.voGroup[st.voShown] || ""); box.appendChild(div); }
    st.voLines.push(st.voGroup[st.voShown]);
    st.voShown++;
    if (instant) div.style.opacity = "1";
    else
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (div.style.opacity = "1"))
      );
  }

  /* ---------- overlays ---------- */

  /* Status screens (author 2026-07-04): skills listed vertically with the levels
     right-aligned. The engine tracks the last level SHOWN for each skill across
     status screens; when a skill has risen since it was last shown, it displays
     the prior level and a click animates it up to the new level (arrow + bold).
     Skills never shown before just display their current level. */
  let statusShownLevels = {}; // header -> { skillName -> lastShownLevel }
  let statusRevealed = true;  // false while a status screen still has level-ups to reveal
  function parseStatusLine(raw) {
    const inner = raw.replace(/^\s*\[/, "").replace(/\]\s*$/, "");
    const dash = inner.indexOf("—"); // em-dash between header and skills
    const header = (dash >= 0 ? inner.slice(0, dash) : "").trim();
    const rest = (dash >= 0 ? inner.slice(dash + 1) : inner).trim();
    const skills = rest.split("·").map((s) => s.trim()).filter(Boolean).map((part) => {
      const ci = part.indexOf(":");
      const name = (ci >= 0 ? part.slice(0, ci) : part).trim();
      const nums = ((ci >= 0 ? part.slice(ci + 1) : "").match(/-?\d+/g) || []).map(Number);
      return { name, level: nums.length ? nums[nums.length - 1] : null };
    });
    return { header, skills };
  }
  // fold a status line's levels into the shown-levels map without rendering (for seek)
  function recordStatusLevels(lines) {
    for (const raw of lines) {
      const b = parseStatusLine(raw);
      const m = statusShownLevels[b.header] || (statusShownLevels[b.header] = {});
      for (const sk of b.skills) if (sk.level != null) m[sk.name] = sk.level;
    }
  }
  function showStatus(lines) {
    const box = $("status-lines");
    box.innerHTML = "";
    // 3-column grid (see CSS): [skill name (right) | old "Lv M" (right) | "→ Lv N" (left)].
    // The prior level sits in a fixed column; the "→ Lv N" lives in its own aligned
    // column that fades in on the click, so nothing already shown moves. A skill
    // never shown before has NO old value — it just fades in "→ Lv N".
    // Special case: the FIRST status screen (nothing recorded yet) shows ONLY Avram,
    // with his numbers straight away (no reveal click), and no SLAVE at all.
    const isFirstScreen = Object.keys(statusShownLevels).length === 0;
    let hasReveal = false;
    for (const raw of lines) {
      const b = parseStatusLine(raw);
      if (isFirstScreen && !/^avram\b/i.test(b.header)) continue; // no SLAVE on the first screen
      const prevMap = statusShownLevels[b.header] || (statusShownLevels[b.header] = {});
      const head = document.createElement("div"); head.className = "status-head";
      head.textContent = b.header;
      box.appendChild(head);
      for (const sk of b.skills) {
        const prior = prevMap[sk.name];
        const lvl = sk.level;
        const isNew = prior == null && lvl != null;                 // first appearance -> "→ Lv N", no old value
        const isInc = prior != null && lvl != null && lvl > prior;  // rose since last shown
        const arrow = isNew || isInc;
        if (arrow && !isFirstScreen) hasReveal = true;

        const nm = document.createElement("div"); nm.className = "skill-name";
        nm.textContent = sk.name;
        const oldv = document.createElement("div"); oldv.className = "skill-old";
        oldv.textContent = isNew ? "" : ("Lv " + (lvl == null ? "—" : (isInc ? prior : lvl)));
        const newv = document.createElement("div"); newv.className = "skill-new";
        newv.textContent = arrow ? ("→ Lv " + lvl) : "";
        // on later screens the "→ Lv N" is hidden until the click; the first screen
        // shows everything straight away.
        if (arrow && !isFirstScreen) newv.classList.add("pending");

        box.appendChild(nm); box.appendChild(oldv); box.appendChild(newv);
        if (lvl != null) prevMap[sk.name] = lvl; // now shown
      }
    }
    statusRevealed = isFirstScreen ? true : !hasReveal;
    const panel = $("status");
    panel.style.display = "";
    panel.classList.remove("slide-in");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => panel.classList.add("slide-in"))
    );
    statusShown = true;
  }
  // click: fade the pending "→ Lv N" cells in (nothing already shown moves)
  function revealStatusIncreases() {
    statusRevealed = true;
    $("status-lines").querySelectorAll(".skill-new.pending").forEach((el) => el.classList.remove("pending"));
  }
  function hideStatus() {
    $("status").style.display = "none";
    $("status").classList.remove("slide-in");
    statusShown = false;
    statusRevealed = true;
  }

  function showInscription(lines) {
    st.inscription = lines;
    const box = $("inscription");
    box.innerHTML = "";
    for (const l of lines) {
      const div = document.createElement("div");
      div.textContent = l;
      box.appendChild(div);
    }
    box.style.display = "";
  }
  function clearInscription() {
    st.inscription = null;
    $("inscription").style.display = "none";
  }

  function showFloor(n) {
    // label reads "Floor 16", not a bare "16" — readers won't parse the number alone
    $("floor-num").textContent = "Floor " + n;
    const el = $("floor");
    el.style.display = "";
    el.style.opacity = "0";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => (el.style.opacity = "1"))
    );
  }
  function hideFloor() {
    $("floor").style.display = "none";
  }

  /* ---------- audio (optional; silent when files absent) ---------- */

  let bgmEl = null;
  const BGM_VOL = 0.7;
  const BGM_FADE_MS = 1200;

  /* fades el's volume to 0 over BGM_FADE_MS then pauses it; instant = hard cut */
  function fadeOutBgmEl(el, instant) {
    if (!el) return;
    if (instant) { el.pause(); return; }
    const t0 = performance.now();
    const startVol = el.volume;
    (function tick() {
      const t = Math.min(1, (performance.now() - t0) / BGM_FADE_MS);
      el.volume = startVol * (1 - t);
      if (t < 1) requestAnimationFrame(tick);
      else el.pause();
    })();
  }
  /* fades el's volume from 0 to BGM_VOL; instant = jump straight to full volume.
     Guarded by "bgmEl === el" so a superseded fade-in doesn't clobber a newer
     track's volume if @bgm changes again before this one finishes. */
  function fadeInBgmEl(el, instant) {
    if (instant) { el.volume = BGM_VOL; return; }
    const t0 = performance.now();
    (function tick() {
      if (bgmEl !== el) return;
      const t = Math.min(1, (performance.now() - t0) / BGM_FADE_MS);
      el.volume = BGM_VOL * t;
      if (t < 1) requestAnimationFrame(tick);
    })();
  }
  function playBgm(id, instant) {
    const outgoing = bgmEl;
    if (id === "stop" || !id) {
      st.bgm = null;
      bgmEl = null;
      fadeOutBgmEl(outgoing, instant);
      return;
    }
    st.bgm = id;
    // Already playing this exact track? Leave it alone — re-requesting the current
    // BGM (a redundant @bgm, or a seek/chapter-fade re-applying the same track) must
    // NOT restart it. (This is why a flash beat near a duplicate @bgm looked like a restart.)
    if (bgmEl && !bgmEl.paused && bgmEl.dataset && bgmEl.dataset.bgmId === id) return;
    const path = assetPath("audio", id);
    if (!path || !musicEnabled) {
      // audio asset absent, OR music toggled off — remember st.bgm (so the
      // corner toggle can resume it) but play nothing
      bgmEl = null;
      fadeOutBgmEl(outgoing, instant);
      return;
    }
    const el = new Audio(path);
    el.dataset.bgmId = id;
    el.loop = true;
    el.volume = instant ? BGM_VOL : 0;
    el.play().then(() => {
      // playback actually started (post-gesture, or a browser that allows autoplay)
      if (!audioUnlocked) { audioUnlocked = true; updateMusicBtn(); }
    }).catch(() => {});
    bgmEl = el;
    fadeOutBgmEl(outgoing, instant);
    fadeInBgmEl(el, instant);
  }
  /* ---------- music on/off (corner toggle, every screen) ---------- */
  function updateMusicBtn() {
    const btn = $("musicbtn");
    if (!btn) return;
    // Show the "on" note only when music is enabled AND audio has actually been
    // unlocked by a user gesture. Before the first click (autoplay-blocked) OR
    // when the user has muted, show the slashed/muted note.
    btn.classList.toggle("off", !(musicEnabled && audioUnlocked));
    btn.title = !musicEnabled
      ? "Music off — click to play"
      : audioUnlocked
        ? "Music on — click to mute"
        : "Music on (starts on your first click) — click here to keep it off";
  }
  function toggleMusic() {
    // First interaction on a blocked-but-enabled title: the click just STARTS the
    // music (unlocks it) — it must NOT also mute. This is the case where the music
    // shows muted only because autoplay hasn't been unlocked yet.
    if (!audioUnlocked && musicEnabled) {
      audioUnlocked = true;
      if (st.bgm) playBgm(st.bgm, false);
      updateMusicBtn();
      return;
    }
    // Otherwise a normal on<->off toggle (persisted).
    musicEnabled = !musicEnabled;
    settings.musicOn = musicEnabled;
    saveSettings();
    audioUnlocked = true;
    updateMusicBtn();
    if (musicEnabled) {
      if (st.bgm) playBgm(st.bgm, false); // resume the current intended track
    } else {
      fadeOutBgmEl(bgmEl, false);
      bgmEl = null;
    }
  }

  const sfxCache = {};
  function preloadSfx(id) {
    const path = assetPath("audio", id);
    if (!path || sfxCache[id]) return;
    const a = new Audio(path);
    a.volume = 0.8;
    a.preload = "auto";
    try { a.load(); } catch (e) {}
    sfxCache[id] = a;
  }
  function playSfx(id) {
    if (id === "stop" || !id) return;
    const path = assetPath("audio", id);
    if (!path) return;
    // reuse a preloaded/decoded element so playback starts immediately (no
    // first-play decode latency — matters for the finale hiss)
    let a = sfxCache[id];
    if (!a) { a = new Audio(path); a.volume = 0.8; sfxCache[id] = a; }
    try { a.currentTime = 0; } catch (e) {}
    a.play().catch(() => {});
  }

  /* ---------- persistence: cookie + localStorage, no UI action ---------- */

  function save() {
    maxPc = Math.max(maxPc, pc);
    const data = JSON.stringify({ pc, max: maxPc, fin: finished ? 1 : 0, ts: Date.now() });
    try { localStorage.setItem(SAVE_KEY, data); } catch (e) {}
    try {
      document.cookie =
        SAVE_KEY + "=" + encodeURIComponent(data) +
        "; max-age=31536000; path=/; SameSite=Lax";
    } catch (e) {}
  }
  function loadSave() {
    let a = null, b = null;
    try { a = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) {}
    try {
      const m = document.cookie.match(new RegExp("(?:^|; )" + SAVE_KEY + "=([^;]*)"));
      if (m) b = JSON.parse(decodeURIComponent(m[1]));
    } catch (e) {}
    if (a && b) return (a.ts || 0) >= (b.ts || 0) ? a : b;
    return a || b;
  }

  /* ---------- execution ---------- */

  function clearTimers() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
    if (typer) { clearTimeout(typer.timer); typer = null; }
    clearAutoplayTimer();
  }

  let autoplayTimer = null;
  let lastAutoAdvance = 0; // timestamp of the last auto-fired advance (click-merge window)
  function clearAutoplayTimer() {
    if (autoplayTimer) { clearTimeout(autoplayTimer); autoplayTimer = null; }
  }
  function maybeAutoplay() {
    clearAutoplayTimer();
    if (reviewing || chapFading) return;
    // scoped @autoplay (st.autoAdvanceMs) forces auto-advance even with the global
    // Autoplay setting off; otherwise fall back to the setting.
    const ms = st.autoAdvanceMs != null ? st.autoAdvanceMs
             : (settings.autoplay ? settings.autoplayDelayMs : null);
    if (ms == null) return;
    autoplayTimer = setTimeout(() => {
      autoplayTimer = null;
      if (mode === "play" && waiting) { lastAutoAdvance = Date.now(); advance(true); }
    }, ms);
  }

  /* returns true if execution must wait for input/timer */
  function exec(c) {
    switch (c.op) {
      case "say":
      case "narrate": {
        if ((st.vo === "on" || st.vo === "over") && c.op === "narrate") {
          revealVoLine(false);
          save();
          maybeAutoplay();
          return true;
        }
        showTextbox(c.op === "say" ? c.speaker : null);
        applyDim(c.op === "say" ? c.speaker : null);
        startTyper(c.text, c.op === "narrate", c.small, c.slow);
        save();
        return true;
      }
      case "hold":
        hideTextbox();
        save();
        maybeAutoplay();
        return true;
      case "pause":
        autoTimer = setTimeout(advance, c.ms);
        return true;
      case "bg":
        setBg(c.id, c.trans, false, c.ms);
        return false;
      case "cg":
        showCg(c.id, c.trans);
        if (st.montage) {
          hideTextbox();
          save();
          // wait for a click like any other cutscene beat; only auto-advance
          // (after the script's specified dwell time) if Autoplay is on
          if (settings.autoplay) autoTimer = setTimeout(advance, st.montage.secs * 1000);
          return true;
        }
        return false;
      case "sprite":
        setSprite(c.char, c.expr, c.slot, false, c.anim);
        return false;
      case "clear":
        execClear(c.what);
        return false;
      case "voiceover":
        setVoiceover(c.mode);
        // pre-lay-out the whole upcoming group so lines reveal in place
        if (c.mode === "on" || c.mode === "over") prerenderVoGroup(pc + 1);
        return false;
      case "autoplay":
        st.autoAdvanceMs = c.ms;
        return false;
      case "flash":
        flash(c.color, c.ms, c.hold);
        return false;
      case "overlay":
        if (c.kind === "status") {
          hideTextbox();
          showStatus(c.lines);
        } else {
          showInscription(c.lines);
        }
        save();
        maybeAutoplay();
        return true;
      case "floor":
        hideTextbox();
        showFloor(c.n);
        save();
        autoTimer = setTimeout(advance, 1100);
        return true;
      case "montage":
        st.montage = { secs: c.secs };
        hideTextbox();
        return false;
      case "montage_end":
        st.montage = null;
        return false;
      case "textbox":
        if (!c.show) hideTextbox();
        return false;
      case "tint":
        setTint(c.mode);
        return false;
      case "bgm":
        playBgm(c.id, c.instant);
        return false;
      case "sfx":
        playSfx(c.id);
        return false;
      case "chapter":
        st.chapter = c.n;
        return false;
      default:
        return false;
    }
  }

  function step() {
    waiting = false;
    while (pc < SCRIPT.ins.length) {
      const c = SCRIPT.ins[pc];
      // Coordinated chapter transition: when forward play reaches a @chapter marker,
      // fade to black (old scene/music already fading), apply the new scene under the
      // black, then fade back in. Only from advance()-driven play (chapArmed), never
      // from a seek/resume/rollback.
      if (c.op === "chapter" && chapArmed && !chapFading) {
        startChapterFade();
        return;
      }
      const blocked = exec(c);
      if (blocked) {
        waiting = true;
        preloadAhead();
        updateChapterIndicator();
        return;
      }
      pc++;
    }
    endCard();
  }

  /* ---------- coordinated chapter-transition fade ---------- */
  function startChapterFade() {
    chapFading = true;
    chapArmed = false;
    clearTimers();
    // fade the black curtain IN (the trailing @bgm of the old chapter, if any, is
    // already fading out from this same step — the two coincide)
    const cf = $("chapfade");
    cf.style.transition = "opacity " + CHAP_FADE_MS + "ms ease";
    cf.style.opacity = "1";
    setTimeout(finishChapterFade, CHAP_FADE_MS + CHAP_HOLD_MS);
  }
  function finishChapterFade() {
    // under full black: run the new chapter's setup directives (bg/sprites/bgm/…)
    // through to its first blocking beat, all invisibly
    waiting = false;
    while (pc < SCRIPT.ins.length) {
      const c = SCRIPT.ins[pc];
      const blocked = exec(c);
      if (blocked) { waiting = true; break; }
      pc++;
    }
    if (pc >= SCRIPT.ins.length) {
      chapFading = false;
      $("chapfade").style.opacity = "0";
      endCard();
      return;
    }
    preloadAhead();
    updateChapterIndicator();
    pushHistory();
    // reveal: fade the black curtain OUT (the new @bgm fades in over ~the same span)
    const cf = $("chapfade");
    requestAnimationFrame(() => {
      cf.style.transition = "opacity " + CHAP_FADE_MS + "ms ease";
      cf.style.opacity = "0";
    });
    setTimeout(() => { chapFading = false; if (waiting) maybeAutoplay(); }, CHAP_FADE_MS);
  }
  function cancelChapterFade() {
    chapFading = false;
    chapArmed = false;
    const cf = $("chapfade");
    cf.style.transition = "none";
    cf.style.opacity = "0";
  }

  function updateChapterIndicator() {
    const el = $("chapter-indicator");
    const modeSet = settings.showChapter;
    if (modeSet === "off" || !modeSet) { el.style.display = "none"; return; }
    const total = SCRIPT && SCRIPT.chapters ? SCRIPT.chapters.length : 0;
    // Title screen: show the latest COMPLETED chapter as progress ("Ch. N/TOTAL").
    // A chapter counts as completed once the reader has passed into the next one;
    // a finished save (fin) counts all TOTAL as complete (13/13). No progress -> 0.
    if (mode === "title" && $("title").style.display !== "none") {
      const sv = loadSave() || {};
      const maxReached = Math.max(sv.max || 0, maxPc);
      let n = 0;
      if (sv.fin || finished) {
        n = total;
      } else {
        for (let i = 0; i < SCRIPT.chapters.length - 1; i++) {
          if (maxReached >= SCRIPT.chapters[i + 1].at) n = SCRIPT.chapters[i].n;
        }
      }
      let t = "Ch. " + n + "/" + total;
      if (modeSet === "full") {
        const done = SCRIPT.chapters.find((c) => c.n === n);
        t += " · " + (n === 0 ? "Title" : (done ? done.title : ""));
      }
      el.textContent = t;
      el.style.display = "";
      return;
    }
    if (mode !== "play") { el.style.display = "none"; return; }
    let current = null;
    for (const ch of SCRIPT.chapters) {
      if (ch.at > pc) break;
      current = ch;
    }
    if (!current) { el.style.display = "none"; return; }
    let text = "Ch. " + current.n + "/" + total;
    if (modeSet === "full") text += " · " + current.title;
    el.textContent = text;
    el.style.display = "";
  }

  function advance(fromAuto) {
    if (mode !== "play" || reviewing || chapFading) return;
    // click-merge: during scoped @autoplay, a manual click landing right on top of
    // an auto-advance (within 250ms after it fired) is swallowed so the reader
    // doesn't skip a frame by double-advancing (author 2026-07-04 spec, approx).
    if (!fromAuto && st.autoAdvanceMs != null && Date.now() - lastAutoAdvance < 250) return;
    // status level-ups: the first click animates the numbers up, the next advances
    if (statusShown && !statusRevealed) { revealStatusIncreases(); return; }
    if (completeTyper()) return; // first click completes the reveal
    if (!waiting) return;
    if (!fromAuto) lastAutoAdvance = Date.now(); // a manual advance restarts the cadence
    if (capsSticky) { capsSticky = false; refreshUiHidden(); } // committed advance clears screenshot-hide
    clearTimers();
    if (statusShown) hideStatus();
    hideFloor();
    pc++;
    chapArmed = true;   // this forward step may cross a @chapter boundary
    step();
    chapArmed = false;
    if (waiting) pushHistory();
  }

  /* ---------- skip (hold Ctrl to fast-advance through already-read text) ---------- */

  let skipActive = false;
  let skipTimer = null;
  function skipTick() {
    skipTimer = null;
    if (!skipActive || mode !== "play" || reviewing || chapFading || pc >= maxPc) return;
    advance();
    if (skipActive) skipTimer = setTimeout(skipTick, 40);
  }
  function startSkip() {
    if (skipActive) return;
    skipActive = true;
    skipTick();
  }
  function stopSkip() {
    skipActive = false;
    if (skipTimer) { clearTimeout(skipTimer); skipTimer = null; }
  }

  /* ---------- rollback / scene review + Shift-hide (standard VN features) ----------
     history[] records the pc of every blocking stop reached this play session.
     Left/Up step back through them (review mode); Right/Down step forward; at the
     leading edge Right/Down is a normal advance. End or a click while reviewing
     jumps back to the present beat and eats the input. Shift held hides the
     dialogue overlay so the art can be seen; releasing restores it. */
  function pushHistory() {
    if (history[history.length - 1] !== pc) history.push(pc);
    if (history.length > 1000) history.shift();
    reviewIdx = history.length - 1;
    reviewing = false;
  }
  function reviewSeek(target) {
    seek(target);        // reconstruct + render the beat (instant transitions)
    finishTyperFully();  // no typewriter animation or pauses in review
  }
  function rollBack() {
    if (mode !== "play" || uiHidden) return;
    if (reviewIdx <= 0) return;           // already at the oldest recorded beat
    reviewIdx--;
    reviewing = true;
    reviewSeek(history[reviewIdx]);
  }
  function rollForward() {
    if (mode !== "play" || uiHidden) return;
    if (reviewIdx >= history.length - 1) { advance(); return; } // leading edge: next
    reviewIdx++;
    if (reviewIdx >= history.length - 1) reviewing = false;     // caught up to present
    reviewSeek(history[reviewIdx]);
  }
  function returnToPresent() {
    if (!reviewing) return;
    reviewIdx = history.length - 1;
    reviewing = false;
    reviewSeek(history[reviewIdx]);
  }

  // every corner/overlay control that should get out of the way for a clean look
  // at the art (dialogue box, music toggle, menu button, chapter indicator)
  const HIDEABLE = ["textbox", "volines", "musicbtn", "menubtn", "chapter-indicator"];
  function applyUiHidden(hide) {
    for (const id of HIDEABLE) {
      const el = $(id);
      if (!el) continue;
      if (hide) {
        if (el.dataset.peek === undefined) el.dataset.peek = el.style.display;
        el.style.display = "none";
      } else if (el.dataset.peek !== undefined) {
        el.style.display = el.dataset.peek;
        delete el.dataset.peek;
      }
    }
  }
  // Shift-peek and Caps-sticky both hide; recompute the effective state.
  function refreshUiHidden() {
    const shouldHide = mode === "play" && (shiftPeek || capsSticky);
    if (shouldHide === uiHidden) return;
    uiHidden = shouldHide;
    applyUiHidden(shouldHide);
  }
  function hideUI() { shiftPeek = true; refreshUiHidden(); }
  function showUI() { shiftPeek = false; refreshUiHidden(); }

  /* ---------- seek: silent state replay for resume / chapter jump ---------- */

  function seek(target) {
    clearTimers();
    cancelChapterFade();
    hideStatus();
    hideFloor();
    statusShownLevels = {}; // rebuilt by recordStatusLevels during the replay below
    Object.assign(st, freshState());
    // wipe visual layers
    $("bglayer").innerHTML = "";
    $("cglayer").innerHTML = "";
    execClear("all", true);
    clearInscription();
    setVoiceover("off", true);
    hideTextbox();

    let voGroupStart = 0; // index of the first line in the current voiceover group
    for (let j = 0; j < target && j < SCRIPT.ins.length; j++) {
      const c = SCRIPT.ins[j];
      switch (c.op) {
        case "bg": st.bg = c.id; st.cg = null; st.inscription = null; break;
        case "cg": st.cg = c.id; st.bg = null; st.inscription = null; st.sprites = { left: null, center: null, right: null }; break;
        case "sprite": st.sprites[c.slot] = { char: c.char, expr: c.expr }; break;
        case "clear":
          if (c.what === "all") st.sprites = { left: null, center: null, right: null };
          else st.sprites[c.what] = null;
          break;
        case "voiceover": st.vo = c.mode; if (c.mode !== "off") { st.voLines = []; voGroupStart = j + 1; } break;
        case "narrate": if (st.vo === "on" || st.vo === "over") st.voLines.push(c.text); break;
        case "autoplay": st.autoAdvanceMs = c.ms; break;
        case "tint": st.tint = c.mode; break;
        case "montage": st.montage = { secs: c.secs }; break;
        case "montage_end": st.montage = null; break;
        case "bgm": st.bgm = c.id === "stop" ? null : c.id; break;
        case "overlay":
          if (c.kind === "inscription") st.inscription = c.lines;
          else recordStatusLevels(c.lines); // fold status levels into shown-map
          break;
        case "chapter": st.chapter = c.n; break;
      }
    }

    // render reconstructed state instantly
    if (st.bg) setBgInstant(st.bg);
    if (st.cg) showCgInstant(st.cg);
    for (const slot of ["left", "center", "right"])
      if (st.sprites[slot]) setSprite(st.sprites[slot].char, st.sprites[slot].expr, slot, true);
    setTint(st.tint);
    if (st.vo === "on" || st.vo === "over") {
      const shown = st.voLines.length;
      setVoiceover(st.vo, true);
      // rebuild the FULL group laid out (so continuing play won't shift lines),
      // then instantly reveal the ones already read
      prerenderVoGroup(voGroupStart);
      for (let k = 0; k < shown; k++) revealVoLine(true);
    }
    if (st.inscription) showInscription(st.inscription);
    playBgm(st.bgm || "stop", true);

    pc = target;
    step();
  }
  function setBgInstant(id) {
    const el = makeLayerImg("bg", id);
    el.style.opacity = "1";
    $("bglayer").innerHTML = "";
    $("bglayer").appendChild(el);
  }
  function showCgInstant(id) {
    const el = makeLayerImg("cg", id);
    el.style.opacity = "1";
    $("bglayer").innerHTML = "";
    $("bglayer").appendChild(el);
  }

  /* ---------- title / menus / end ---------- */

  function showTitle() {
    mode = "title";
    $("title").style.display = "";
    $("pausemenu").style.display = "none";
    $("chapters").style.display = "none";
    $("endcard").style.display = "none";
    $("menubtn").style.display = ""; // hamburger stays in its usual upper-right spot on the title
    const sv = loadSave();
    $("btn-continue").style.display = sv && sv.pc > 0 && !sv.fin ? "" : "none";
    $("btn-chapters-title").style.display = sv && sv.max > 0 ? "" : "none";
    // After finishing, the content warning becomes a re-read / no-spoilers note
    // (two centered lines).
    if (sv && sv.fin)
      $("title-notice").innerHTML =
        "This story benefits from being read twice.<br>Please do not spoil it for others.";
    else
      $("title-notice").textContent =
        "This is a grownup story. Content may be disturbing to some viewers.";
    // Title-screen BGM: cheerful before the story is finished, somber after.
    // (Browsers may block autoplay until the first user gesture; playBgm no-ops
    // silently in that case and picks up on the next showTitle after a click.)
    // BUT if we arrived here straight from the finale this session, KEEP
    // Skagganauk's music (bgm_void) playing — the somber second title track is
    // reserved for a fresh reload of a finished save, not the immediate
    // return-to-title after the ending (author 2026-07-04).
    if (titleMusicPick)
      playBgm(titleMusicPick); // a jukebox pick keeps playing on the title (until play begins)
    else if (!cameFromFinale)
      playBgm(sv && sv.fin ? "bgm_title_end" : "bgm_title");
    updateChapterIndicator();
  }
  function beginPlay(target) {
    $("title").style.display = "none";
    $("endcard").style.display = "none";
    $("pausemenu").style.display = "none";
    $("chapters").style.display = "none";
    $("menubtn").style.display = "";
    mode = "play";
    uiHidden = false; shiftPeek = false; capsSticky = false;
    titleMusicPick = null; // beginning the KN / jumping to a chapter forgets the jukebox pick
    seek(target);
    history = [pc]; reviewIdx = 0; reviewing = false;
  }
  function endCard() {
    clearTimers();
    setVoiceover("off", true); // clear Skagganauk's last line instantly as FIN appears
    finished = true;
    cameFromFinale = true; // returning to title from here keeps Skagganauk's music
    pc = 0;
    save();
    mode = "menu";
    $("menubtn").style.display = "none";
    $("endcard").style.display = "";
    updateChapterIndicator();
  }

  const BGM_NAMES = {
    bgm_title: "Title Theme",
    bgm_title_end: "Title Theme — After",
    bgm_tavern: "The Tavern",
    bgm_montage: "Training Days",
    bgm_campfire: "Campfire",
    bgm_tension: "Tension",
    bgm_wistful: "Wistful",
    bgm_lament: "Lament",
    bgm_dungeon: "The Deep Floors",
    bgm_void: "Skagganauk — The Void",
  };
  /* jukebox: every BGM heard up to the furthest point reached, playable from the
     chapters screen (title context only, so a sample can't leak into gameplay). */
  function renderMusicList(maxReached, sv) {
    const sec = $("music-section"), mlist = $("music-list");
    const heard = [], seen = new Set();
    const push = (id) => {
      if (id && id !== "stop" && !seen.has(id) && assetPath("audio", id)) {
        seen.add(id); heard.push(id);
      }
    };
    push("bgm_title");
    const limit = Math.min(maxReached, SCRIPT.ins.length - 1);
    for (let k = 0; k <= limit; k++)
      if (SCRIPT.ins[k].op === "bgm") push(SCRIPT.ins[k].id);
    if (finished || (sv && sv.fin)) push("bgm_title_end");
    mlist.innerHTML = "";
    if (heard.length <= 1) { sec.style.display = "none"; return; }
    sec.style.display = "";
    for (const id of heard) {
      const b = document.createElement("button");
      b.className = "music-btn" + (st.bgm === id ? " playing" : "");
      b.textContent = BGM_NAMES[id] || id;
      b.onclick = (e) => {
        e.stopPropagation();
        playBgm(id);
        // remember this pick so it keeps playing when we return to the title screen
        // (the music list is title-context only; cleared again once play begins)
        titleMusicPick = id;
        for (const c of mlist.children) c.classList.remove("playing");
        b.classList.add("playing");
      };
      mlist.appendChild(b);
    }
  }

  function openChapters(fromTitle) {
    const sv = loadSave() || { max: 0 };
    const maxReached = Math.max(sv.max || 0, maxPc);
    const list = $("chapter-list");
    list.innerHTML = "";
    // "0 · Title" — the zeroth chapter is the title screen; always available.
    const titleBtn = document.createElement("button");
    titleBtn.className = "chapter-btn";
    titleBtn.textContent = "0 · Title";
    titleBtn.onclick = (e) => {
      e.stopPropagation();
      $("chapters").style.display = "none";
      showTitle();
    };
    list.appendChild(titleBtn);
    for (const ch of SCRIPT.chapters) {
      const reached = ch.at <= maxReached || (sv.fin && finishedAll(sv));
      const btn = document.createElement("button");
      btn.className = "chapter-btn" + (reached ? "" : " locked");
      btn.textContent = reached ? ch.n + " · " + ch.title : ch.n + " · ─────";
      if (reached)
        btn.onclick = (e) => {
          e.stopPropagation();
          $("chapters").style.display = "none";
          beginPlay(ch.at);
        };
      list.appendChild(btn);
    }
    if (fromTitle) renderMusicList(maxReached, sv);
    else $("music-section").style.display = "none";
    $("chapters").dataset.from = fromTitle ? "title" : "pause";
    if (fromTitle) { $("title").style.display = "none"; $("menubtn").style.display = "none"; }
    $("endcard").style.display = "none"; // FIN overlay must not sit on top of the chapter list
    $("chapters").style.display = "";
    if (!fromTitle) mode = "menu";
    updateChapterIndicator();
  }
  function finishedAll(sv) {
    return !!(sv && sv.fin);
  }
  function closeChapters() {
    $("chapters").style.display = "none";
    if ($("chapters").dataset.from === "pause") openPause();
    else showTitle();
  }

  function openPause() {
    mode = "menu";
    $("pausemenu").style.display = "";
    updateChapterIndicator();
  }
  function closePause() {
    $("pausemenu").style.display = "none";
    mode = "play";
    updateChapterIndicator();
  }

  function renderSettingsUI() {
    for (const btn of $("speed-group").children)
      btn.classList.toggle("selected", +btn.dataset.speed === settings.typeMs);
    for (const btn of $("autoplay-group").children)
      btn.classList.toggle("selected", (btn.dataset.autoplay === "1") === settings.autoplay);
    for (const btn of $("delay-group").children)
      btn.classList.toggle("selected", +btn.dataset.delay === settings.autoplayDelayMs);
    $("autoplay-delay-row").classList.toggle("disabled", !settings.autoplay);
    for (const btn of $("showchapter-group").children)
      btn.classList.toggle("selected", btn.dataset.showchapter === settings.showChapter);
  }
  function openSettings(fromTitle) {
    disarmDelete();
    renderSettingsUI();
    $("settingsmenu").dataset.from = fromTitle ? "title" : "pause";
    if (fromTitle) { $("title").style.display = "none"; $("menubtn").style.display = "none"; }
    else $("pausemenu").style.display = "none";
    $("settingsmenu").style.display = "";
    if (!fromTitle) mode = "menu";
    updateChapterIndicator();
  }
  function closeSettings() {
    disarmDelete();
    $("settingsmenu").style.display = "none";
    if ($("settingsmenu").dataset.from === "title") showTitle();
    else openPause();
  }
  /* red destructive action: two-click confirm, then wipe all saved progress and
     restore the original (pre-finish) title music. */
  let deleteArmed = false;
  function disarmDelete() {
    deleteArmed = false;
    const b = $("btn-delete-progress");
    if (b) { b.classList.remove("armed"); b.textContent = "Delete all progress"; }
  }
  function onDeleteProgress() {
    const b = $("btn-delete-progress");
    if (!deleteArmed) {
      deleteArmed = true;
      b.classList.add("armed");
      b.textContent = "Click again to erase everything";
      return;
    }
    // confirmed: wipe the save AND reset settings to defaults, so e.g. Show
    // Chapter returns to off (author 2026-07-04)
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    try { localStorage.removeItem(SETTINGS_KEY); } catch (e) {}
    document.cookie = SAVE_KEY + "=; max-age=0; path=/";
    settings = Object.assign({}, DEFAULT_SETTINGS);
    finished = false; cameFromFinale = false; maxPc = 0; pc = 0;
    disarmDelete();
    titleMusicPick = null; // wiping progress also clears any jukebox pick
    playBgm("bgm_title"); // restore the original cheerful title theme
    $("settingsmenu").style.display = "none";
    showTitle();
  }

  /* ---------- credits + original-outline viewer (title screen only) ---------- */
  function openCredits() {
    $("title").style.display = "none";
    $("menubtn").style.display = "none";
    $("creditsmenu").style.display = "";
    updateChapterIndicator();
  }
  function closeCredits() {
    $("creditsmenu").style.display = "none";
    showTitle();
  }
  let outlineLoaded = false;
  function renderOutline(md) {
    const esc = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const em = (s) => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
    const out = [];
    for (const raw of md.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line) continue;
      if (line.startsWith("# ")) out.push("<h3>" + em(line.slice(2)) + "</h3>");
      else if (line.startsWith("\\- "))
        out.push('<div class="vo-line">— ' + em(line.slice(3)) + "</div>");
      else if (line.startsWith("- "))
        out.push('<div class="vo-line">— ' + em(line.slice(2)) + "</div>");
      else out.push('<div class="sd-line">' + em(line) + "</div>");
    }
    return out.join("\n");
  }
  async function openScriptView() {
    $("creditsmenu").style.display = "none";
    $("scriptview").style.display = "";
    const el = $("scriptview-content");
    if (!outlineLoaded) {
      el.textContent = "Loading…";
      try {
        const r = await fetch("claude-inputs/original-script.md", { cache: "no-cache" });
        if (!r.ok) throw new Error(String(r.status));
        el.innerHTML = renderOutline(await r.text());
        outlineLoaded = true;
      } catch (e) {
        el.textContent = "Could not load the original outline.";
      }
    }
    el.scrollTop = 0;
  }
  function closeScriptView() {
    $("scriptview").style.display = "none";
    openCredits();
  }

  /* ---------- input ---------- */

  function onAdvanceInput(e) {
    if (mode !== "play") return;
    e.preventDefault();
    if (chapFading) return;                  // ignore input mid chapter transition
    if (shiftPeek) return;                   // Shift-hold peek: don't advance
    // Caps-Lock screenshot hide is sticky until the reader advances — this input
    // both clears the hide and advances the scene.
    if (capsSticky) { capsSticky = false; refreshUiHidden(); }
    if (reviewing) { returnToPresent(); return; } // click returns to present, eats it
    advance();
  }

  function wire() {
    // Autoplay unlock: browsers block audio until the first user gesture, so the
    // title BGM started by showTitle() at boot is created-but-paused. On the first
    // pointer/key interaction anywhere, resume the current track if it's paused.
    // Capture phase so it runs regardless of which element was clicked (buttons,
    // backdrop, stage), before that element's own handler. Cheap and idempotent.
    const unlockAudio = (e) => {
      // the music button handles its own first click (via toggleMusic); don't also
      // unlock here, or a single click on it would start AND toggle the music at once
      if (e && e.target && e.target.closest && e.target.closest("#musicbtn")) return;
      const wasLocked = !audioUnlocked;
      audioUnlocked = true;
      // resume the current title/scene track that was created-but-blocked at load
      // (only if the user hasn't muted — a persisted mute must NOT auto-start)
      if (musicEnabled && bgmEl && bgmEl.paused) bgmEl.play().catch(() => {});
      if (wasLocked) updateMusicBtn();
    };
    window.addEventListener("pointerdown", unlockAudio, { capture: true });
    window.addEventListener("keydown", unlockAudio, { capture: true });

    $("stage").addEventListener("click", (e) => {
      if (e.target.closest("#menubtn") || e.target.closest("#musicbtn") ||
          e.target.closest("#chapter-indicator") || e.target.closest(".menu")) return;
      onAdvanceInput(e);
    });
    $("musicbtn").onclick = (e) => { e.stopPropagation(); toggleMusic(); };
    // clicking the chapter indicator opens the chapter list (progress + jump)
    $("chapter-indicator").onclick = (e) => {
      e.stopPropagation();
      if (mode === "play") openChapters(false);
      else if (mode === "title" && $("title").style.display !== "none") openChapters(true);
    };
    document.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") onAdvanceInput(e);
      else if (e.key === "Escape") {
        if (mode === "play") openPause();
        else if ($("scriptview").style.display !== "none") closeScriptView();
        else if ($("creditsmenu").style.display !== "none") closeCredits();
        else if ($("chapters").style.display !== "none") closeChapters();
        else if ($("settingsmenu").style.display !== "none") closeSettings();
        else if ($("pausemenu").style.display !== "none") closePause();
      } else if (e.key === "Control") {
        startSkip();
      } else if (e.key === "Shift") {
        if (mode === "play") { e.preventDefault(); hideUI(); }
      } else if (e.key === "CapsLock") {
        // Toggling Caps Lock ON while a scene is shown hides all UI (sticky) so the
        // reader can screenshot without holding a key; toggling it OFF restores.
        // If Caps was ALREADY on when the scene began there is no keydown, so nothing
        // hides — that's intentional (avoids inscrutable always-hidden UI).
        if (mode === "play") {
          capsSticky = !!(e.getModifierState && e.getModifierState("CapsLock"));
          refreshUiHidden();
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (mode === "play") { e.preventDefault(); rollBack(); }
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (mode === "play") { e.preventDefault(); rollForward(); }
      } else if (e.key === "End") {
        if (mode === "play" && reviewing) { e.preventDefault(); returnToPresent(); }
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Control") stopSkip();
      else if (e.key === "Shift") showUI();
    });
    window.addEventListener("blur", () => { capsSticky = false; showUI(); });
    window.addEventListener("blur", stopSkip);
    $("menubtn").onclick = (e) => {
      e.stopPropagation();
      // on the title the hamburger opens Settings; in play it opens the pause menu
      if (mode === "title") openSettings(true); else openPause();
    };
    $("btn-begin").onclick = () => beginPlay(0);
    $("btn-continue").onclick = () => {
      const sv = loadSave();
      maxPc = (sv && sv.max) || 0;
      beginPlay((sv && sv.pc) || 0);
    };
    $("btn-chapters-title").onclick = () => openChapters(true);
    $("btn-settings-title").onclick = () => openSettings(true);
    $("btn-credits-title").onclick = () => openCredits();
    $("btn-credits-back").onclick = closeCredits;
    $("credit-outline").onclick = () => openScriptView();
    $("btn-scriptview-back").onclick = closeScriptView;
    $("btn-resume").onclick = closePause;
    $("btn-chapters").onclick = () => {
      $("pausemenu").style.display = "none";
      openChapters(false);
    };
    $("btn-settings").onclick = () => openSettings(false);
    $("btn-settings-back").onclick = closeSettings;
    $("btn-delete-progress").onclick = (e) => { e.stopPropagation(); onDeleteProgress(); };
    $("btn-totitle").onclick = () => { showTitle(); };
    $("btn-chapters-back").onclick = closeChapters;
    $("btn-end-title").onclick = () => showTitle();
    $("btn-end-chapters").onclick = () => openChapters(true);

    $("speed-group").addEventListener("click", (e) => {
      const btn = e.target.closest(".opt-btn");
      if (!btn) return;
      settings.typeMs = +btn.dataset.speed;
      saveSettings();
      renderSettingsUI();
    });
    $("autoplay-group").addEventListener("click", (e) => {
      const btn = e.target.closest(".opt-btn");
      if (!btn) return;
      settings.autoplay = btn.dataset.autoplay === "1";
      saveSettings();
      renderSettingsUI();
      if (settings.autoplay && mode === "play" && waiting) maybeAutoplay();
    });
    $("delay-group").addEventListener("click", (e) => {
      const btn = e.target.closest(".opt-btn");
      if (!btn) return;
      settings.autoplayDelayMs = +btn.dataset.delay;
      saveSettings();
      renderSettingsUI();
    });
    $("showchapter-group").addEventListener("click", (e) => {
      const btn = e.target.closest(".opt-btn");
      if (!btn) return;
      settings.showChapter = btn.dataset.showchapter;
      saveSettings();
      renderSettingsUI();
      updateChapterIndicator();
    });
  }

  /* ---------- boot ---------- */

  async function fetchText(url) {
    const r = await fetch(url, { cache: "no-cache" });
    if (!r.ok) throw new Error(url + ": " + r.status);
    return r.text();
  }

  async function boot() {
    try {
      const [mtext, stext] = await Promise.all([
        fetchText("assets/manifest.json"),
        fetchText("script.txt"),
      ]);
      MANIFEST = JSON.parse(mtext);
      SCRIPT = parseScript(stext);
    } catch (err) {
      $("boot-error").style.display = "";
      $("boot-error").textContent =
        "Could not load script/assets (" + err.message + "). " +
        "If opening from file://, serve the folder instead, e.g.: python3 -m http.server";
      return;
    }
    const sv = loadSave();
    if (sv) { maxPc = sv.max || 0; finished = !!sv.fin; }
    // preload/decode sound effects so they start instantly (the finale hiss is
    // a long 7s clip and was audibly late to start on first play)
    for (const id of Object.keys(MANIFEST.audio || {}))
      if (id.startsWith("sfx")) preloadSfx(id);
    // optional real Skagganauk font; silent no-op when the file is absent
    try {
      const fr = await fetch("assets/fonts/skagganauk.woff2", { method: "HEAD" });
      if (fr.ok) {
        const face = new FontFace("Skagganauk", "url('assets/fonts/skagganauk.woff2')");
        await face.load();
        document.fonts.add(face);
      }
    } catch (e) {}
    // title art
    const t = assetPath("ui", "ui_title");
    if (t) $("title-art").style.backgroundImage = "url('" + t + "')";
    const box = assetPath("ui", "ui_textbox_box");
    if (box) $("textbox-img").style.backgroundImage = "url('" + box + "')";
    const plate = assetPath("ui", "ui_textbox_plate");
    if (plate) $("plate").style.backgroundImage = "url('" + plate + "')";
    const sf = assetPath("ui", "ui_status_frame");
    if (sf) $("status-frame").style.backgroundImage = "url('" + sf + "')";
    const fm = assetPath("ui", "ui_floor_marker");
    if (fm) $("floor-frame").style.backgroundImage = "url('" + fm + "')";
    musicEnabled = settings.musicOn !== false;
    wire();
    updateMusicBtn();
    showTitle();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
