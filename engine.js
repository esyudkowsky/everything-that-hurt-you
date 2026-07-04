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
  "Adventurer 1", "Adventurer 2", "Healer", "Slavetaker", "Bandit",
  "Attendant", "Nobleman", "God",
]);

function parseScript(text) {
  const raw = text.split(/\r?\n/);
  const ins = [];
  const chapters = [];
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
          const [id, trans] = rest.split(/\s+/);
          ins.push({ op: "bg", id, trans: trans || "fade" });
          break;
        }
        case "cg": {
          const [id, trans] = rest.split(/\s+/);
          ins.push({ op: "cg", id, trans: trans || "fade" });
          break;
        }
        case "sprite": {
          const [char, expr, slot] = rest.split(/\s+/);
          ins.push({ op: "sprite", char, expr, slot: slot || "left" });
          break;
        }
        case "clear":
          ins.push({ op: "clear", what: rest || "all" });
          break;
        case "voiceover":
          ins.push({ op: "voiceover", mode: rest }); // on | off | over
          break;
        case "flash": {
          const [color, ms] = rest.split(/\s+/);
          ins.push({ op: "flash", color: color || "white", ms: +ms || 300 });
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
        ins.push({ op: "say", speaker: dm[1], text: dm[2] });
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
  const DEFAULT_SETTINGS = { typeMs: 33, autoplay: false, autoplayDelayMs: 900, showChapter: false };
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
  let waiting = false;     // waiting for click at ins[pc]
  let autoTimer = null;    // pause/floor/montage auto-advance
  let typer = null;        // {tokens, count, total, node}
  let mode = "title";      // title | play | menu
  let statusShown = false; // status overlay currently waiting
  const st = freshState();
  let settings = loadSettings();

  function loadSettings() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(SETTINGS_KEY)); } catch (e) {}
    return Object.assign({}, DEFAULT_SETTINGS, s || {});
  }
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  function freshState() {
    return {
      bg: null, cg: null,
      sprites: { left: null, right: null }, // {char, expr}
      tint: "off",
      vo: "off", voLines: [],
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

  function swapLayer(container, el, trans) {
    const old = Array.from(container.children);
    container.appendChild(el);
    if (trans === "cut") {
      el.style.opacity = "1";
      old.forEach((o) => o.remove());
    } else {
      el.style.opacity = "0";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.opacity = "1";
        })
      );
      setTimeout(() => old.forEach((o) => o.remove()), 700);
    }
  }

  /* ---------- render primitives ---------- */

  function setBg(id, trans, instant) {
    st.bg = id;
    swapLayer($("bglayer"), makeLayerImg("bg", id), instant ? "cut" : trans);
    clearCg(instant ? "cut" : trans);
    clearInscription();
  }
  function showCg(id, trans, instant) {
    st.cg = id;
    swapLayer($("cglayer"), makeLayerImg("cg", id), instant ? "cut" : trans);
    clearInscription();
  }
  function clearCg(trans) {
    st.cg = null;
    const c = $("cglayer");
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
  function setSprite(char, expr, slot, instant) {
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
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (holder.style.opacity = "1"))
      );
    } else {
      holder.style.opacity = "1";
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
      Slavetaker: "slavetaker", Bandit: "slavetaker", Attendant: "attendant",
      Nobleman: "nobleman", God: "god",
    };
    return map[sp] || null;
  }
  function applyDim(speaker) {
    const pref = speakerPrefix(speaker);
    for (const slot of ["left", "right"]) {
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

  function flash(color, ms) {
    const f = $("flash");
    f.style.transition = "none";
    f.style.background = color === "black" ? "#000" : "#fff";
    f.style.opacity = "1";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        f.style.transition = "opacity " + ms + "ms ease-out";
        f.style.opacity = "0";
      })
    );
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

  function startTyper(text, italicAll) {
    const node = $("dialog");
    node.innerHTML = "";
    fitDialogFont(text);
    const tokens = emphasisTokens(text);
    const total = tokens.reduce((a, t) => a + t.t.length, 0);
    typer = { tokens, count: 0, total, node, italicAll };
    tickTyper();
  }
  function renderTyper() {
    const { tokens, count, node, italicAll } = typer;
    node.innerHTML = "";
    let left = count;
    for (const tk of tokens) {
      if (left <= 0) break;
      const s = tk.t.slice(0, left);
      left -= tk.t.length;
      const span = document.createElement(tk.em || italicAll ? "em" : "span");
      span.textContent = s;
      node.appendChild(span);
    }
    $("adv").style.visibility = typer.count >= typer.total ? "visible" : "hidden";
  }
  function tickTyper() {
    if (!typer) return;
    const step = settings.typeMs <= 0 ? typer.total : 1;
    typer.count = Math.min(typer.count + step, typer.total);
    renderTyper();
    if (typer.count < typer.total) {
      typer.timer = setTimeout(tickTyper, settings.typeMs);
    } else {
      maybeAutoplay();
    }
  }
  function completeTyper() {
    if (!typer) return false;
    if (typer.count < typer.total) {
      clearTimeout(typer.timer);
      typer.count = typer.total;
      renderTyper();
      maybeAutoplay();
      return true; // consumed the click
    }
    return false;
  }

  /* ---------- voiceover ---------- */

  function setVoiceover(mode2, instant) {
    st.vo = mode2;
    const layer = $("volayer");
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
        setTimeout(() => (layer.style.display = "none"), 800);
      }
      $("volines").innerHTML = "";
      st.voLines = [];
    }
  }
  function addVoLine(text, instant) {
    st.voLines.push(text);
    const div = document.createElement("div");
    div.className = "voline";
    for (const tk of emphasisTokens(text)) {
      const span = document.createElement(tk.em ? "em" : "span");
      span.textContent = tk.t;
      div.appendChild(span);
    }
    $("volines").appendChild(div);
    if (instant) div.style.opacity = "1";
    else
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (div.style.opacity = "1"))
      );
  }

  /* ---------- overlays ---------- */

  function showStatus(lines) {
    const box = $("status-lines");
    box.innerHTML = "";
    for (const l of lines) {
      const div = document.createElement("div");
      div.textContent = l;
      box.appendChild(div);
    }
    const panel = $("status");
    panel.style.display = "";
    panel.classList.remove("slide-in");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => panel.classList.add("slide-in"))
    );
    statusShown = true;
  }
  function hideStatus() {
    $("status").style.display = "none";
    $("status").classList.remove("slide-in");
    statusShown = false;
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
    $("floor-num").textContent = n;
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
    const path = assetPath("audio", id);
    if (!path) {
      // app must run silent when audio absent
      bgmEl = null;
      fadeOutBgmEl(outgoing, instant);
      return;
    }
    const el = new Audio(path);
    el.loop = true;
    el.volume = instant ? BGM_VOL : 0;
    el.play().catch(() => {});
    bgmEl = el;
    fadeOutBgmEl(outgoing, instant);
    fadeInBgmEl(el, instant);
  }
  function playSfx(id) {
    if (id === "stop" || !id) return;
    const path = assetPath("audio", id);
    if (!path) return;
    const a = new Audio(path);
    a.volume = 0.8;
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
  function clearAutoplayTimer() {
    if (autoplayTimer) { clearTimeout(autoplayTimer); autoplayTimer = null; }
  }
  function maybeAutoplay() {
    clearAutoplayTimer();
    if (!settings.autoplay) return;
    autoplayTimer = setTimeout(() => {
      autoplayTimer = null;
      if (mode === "play" && waiting) advance();
    }, settings.autoplayDelayMs);
  }

  /* returns true if execution must wait for input/timer */
  function exec(c) {
    switch (c.op) {
      case "say":
      case "narrate": {
        if ((st.vo === "on" || st.vo === "over") && c.op === "narrate") {
          addVoLine(c.text);
          save();
          maybeAutoplay();
          return true;
        }
        showTextbox(c.op === "say" ? c.speaker : null);
        applyDim(c.op === "say" ? c.speaker : null);
        startTyper(c.text, c.op === "narrate");
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
        setBg(c.id, c.trans);
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
        setSprite(c.char, c.expr, c.slot);
        return false;
      case "clear":
        execClear(c.what);
        return false;
      case "voiceover":
        setVoiceover(c.mode);
        return false;
      case "flash":
        flash(c.color, c.ms);
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

  function updateChapterIndicator() {
    const el = $("chapter-indicator");
    if (!settings.showChapter || mode !== "play") { el.style.display = "none"; return; }
    let current = null;
    for (const ch of SCRIPT.chapters) {
      if (ch.at > pc) break;
      current = ch;
    }
    el.textContent = current ? "Ch. " + current.n + " · " + current.title : "";
    el.style.display = current ? "" : "none";
  }

  function advance() {
    if (mode !== "play") return;
    if (completeTyper()) return; // first click completes the reveal
    if (!waiting) return;
    clearTimers();
    if (statusShown) hideStatus();
    hideFloor();
    pc++;
    step();
  }

  /* ---------- skip (hold Ctrl to fast-advance through already-read text) ---------- */

  let skipActive = false;
  let skipTimer = null;
  function skipTick() {
    skipTimer = null;
    if (!skipActive || mode !== "play" || pc >= maxPc) return;
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

  /* ---------- seek: silent state replay for resume / chapter jump ---------- */

  function seek(target) {
    clearTimers();
    hideStatus();
    hideFloor();
    Object.assign(st, freshState());
    // wipe visual layers
    $("bglayer").innerHTML = "";
    $("cglayer").innerHTML = "";
    execClear("all", true);
    clearInscription();
    setVoiceover("off", true);
    hideTextbox();

    for (let j = 0; j < target && j < SCRIPT.ins.length; j++) {
      const c = SCRIPT.ins[j];
      switch (c.op) {
        case "bg": st.bg = c.id; st.cg = null; st.inscription = null; break;
        case "cg": st.cg = c.id; st.inscription = null; break;
        case "sprite": st.sprites[c.slot] = { char: c.char, expr: c.expr }; break;
        case "clear":
          if (c.what === "all") st.sprites = { left: null, right: null };
          else st.sprites[c.what] = null;
          break;
        case "voiceover": st.vo = c.mode; if (c.mode !== "off") st.voLines = []; break;
        case "narrate": if (st.vo === "on" || st.vo === "over") st.voLines.push(c.text); break;
        case "tint": st.tint = c.mode; break;
        case "montage": st.montage = { secs: c.secs }; break;
        case "montage_end": st.montage = null; break;
        case "bgm": st.bgm = c.id === "stop" ? null : c.id; break;
        case "overlay": if (c.kind === "inscription") st.inscription = c.lines; break;
        case "chapter": st.chapter = c.n; break;
      }
    }

    // render reconstructed state instantly
    if (st.bg) setBgInstant(st.bg);
    if (st.cg) showCgInstant(st.cg);
    for (const slot of ["left", "right"])
      if (st.sprites[slot]) setSprite(st.sprites[slot].char, st.sprites[slot].expr, slot, true);
    setTint(st.tint);
    if (st.vo === "on" || st.vo === "over") {
      const linesNow = st.voLines.slice();
      setVoiceover(st.vo, true);
      for (const l of linesNow) addVoLine(l, true);
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
    $("cglayer").innerHTML = "";
    $("cglayer").appendChild(el);
  }

  /* ---------- title / menus / end ---------- */

  function showTitle() {
    mode = "title";
    $("title").style.display = "";
    $("pausemenu").style.display = "none";
    $("chapters").style.display = "none";
    $("endcard").style.display = "none";
    $("menubtn").style.display = "none";
    const sv = loadSave();
    $("btn-continue").style.display = sv && sv.pc > 0 && !sv.fin ? "" : "none";
    $("btn-chapters-title").style.display = sv && sv.max > 0 ? "" : "none";
    // Title-screen BGM: cheerful before the story is finished, somber after.
    // (Browsers may block autoplay until the first user gesture; playBgm no-ops
    // silently in that case and picks up on the next showTitle after a click.)
    playBgm(sv && sv.fin ? "bgm_title_end" : "bgm_title");
    updateChapterIndicator();
  }
  /* ---------- prototype password gate (kid-brother security only) ----------
     The plaintext ("red flower rocket") is not stored; only this djb2-xor
     hash of the normalized phrase is. Case/whitespace-insensitive. Once
     entered correctly it stays unlocked for the rest of the page session. */
  const GATE_HASH = "cf67cb57";
  let gateUnlocked = false;
  let gatePending = null; // fn to run once the gate is passed
  function gateHash(s) {
    const norm = s.trim().toLowerCase().replace(/\s+/g, " ");
    let x = 5381;
    for (let i = 0; i < norm.length; i++) x = ((x * 33) ^ norm.charCodeAt(i)) >>> 0;
    return x.toString(16);
  }
  function requireGate(fn) {
    if (gateUnlocked) { fn(); return; }
    gatePending = fn;
    $("title").style.display = "none";
    $("gate-msg").textContent = "";
    $("gate-input").value = "";
    $("gatemenu").style.display = "";
    setTimeout(() => $("gate-input").focus(), 30);
  }
  function submitGate() {
    if (gateHash($("gate-input").value) === GATE_HASH) {
      gateUnlocked = true;
      $("gatemenu").style.display = "none";
      const fn = gatePending; gatePending = null;
      if (fn) fn();
    } else {
      $("gate-msg").textContent = "Not quite. Try again.";
      $("gate-input").value = "";
      $("gate-input").focus();
    }
  }
  function cancelGate() {
    gatePending = null;
    $("gatemenu").style.display = "none";
    showTitle();
  }

  function beginPlay(target) {
    $("title").style.display = "none";
    $("endcard").style.display = "none";
    $("pausemenu").style.display = "none";
    $("chapters").style.display = "none";
    $("menubtn").style.display = "";
    mode = "play";
    seek(target);
  }
  function endCard() {
    clearTimers();
    finished = true;
    pc = 0;
    save();
    mode = "menu";
    $("menubtn").style.display = "none";
    $("endcard").style.display = "";
    updateChapterIndicator();
  }

  function openChapters(fromTitle) {
    const sv = loadSave() || { max: 0 };
    const maxReached = Math.max(sv.max || 0, maxPc);
    const list = $("chapter-list");
    list.innerHTML = "";
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
    $("chapters").dataset.from = fromTitle ? "title" : "pause";
    if (fromTitle) $("title").style.display = "none";
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
      btn.classList.toggle("selected", (btn.dataset.showchapter === "1") === settings.showChapter);
  }
  function openSettings(fromTitle) {
    renderSettingsUI();
    $("settingsmenu").dataset.from = fromTitle ? "title" : "pause";
    if (fromTitle) $("title").style.display = "none";
    else $("pausemenu").style.display = "none";
    $("settingsmenu").style.display = "";
    if (!fromTitle) mode = "menu";
  }
  function closeSettings() {
    $("settingsmenu").style.display = "none";
    if ($("settingsmenu").dataset.from === "title") showTitle();
    else openPause();
  }

  /* ---------- input ---------- */

  function onAdvanceInput(e) {
    if (mode === "play") {
      e.preventDefault();
      advance();
    }
  }

  function wire() {
    // Autoplay unlock: browsers block audio until the first user gesture, so the
    // title BGM started by showTitle() at boot is created-but-paused. On the first
    // pointer/key interaction anywhere, resume the current track if it's paused.
    // Capture phase so it runs regardless of which element was clicked (buttons,
    // backdrop, stage), before that element's own handler. Cheap and idempotent.
    const unlockAudio = () => {
      if (bgmEl && bgmEl.paused) bgmEl.play().catch(() => {});
    };
    window.addEventListener("pointerdown", unlockAudio, { capture: true });
    window.addEventListener("keydown", unlockAudio, { capture: true });

    $("stage").addEventListener("click", (e) => {
      if (e.target.closest("#menubtn") || e.target.closest(".menu")) return;
      onAdvanceInput(e);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") onAdvanceInput(e);
      else if (e.key === "Escape") {
        if (mode === "play") openPause();
        else if ($("chapters").style.display !== "none") closeChapters();
        else if ($("settingsmenu").style.display !== "none") closeSettings();
        else if ($("pausemenu").style.display !== "none") closePause();
      } else if (e.key === "Control") {
        startSkip();
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Control") stopSkip();
    });
    window.addEventListener("blur", stopSkip);
    $("menubtn").onclick = (e) => { e.stopPropagation(); openPause(); };
    $("btn-begin").onclick = () => requireGate(() => beginPlay(0));
    $("btn-continue").onclick = () => requireGate(() => {
      const sv = loadSave();
      maxPc = (sv && sv.max) || 0;
      beginPlay((sv && sv.pc) || 0);
    });
    $("btn-chapters-title").onclick = () => requireGate(() => openChapters(true));
    $("btn-gate-ok").onclick = submitGate;
    $("btn-gate-cancel").onclick = cancelGate;
    $("gate-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); submitGate(); }
      else if (e.key === "Escape") { e.preventDefault(); cancelGate(); }
    });
    $("btn-settings-title").onclick = () => openSettings(true);
    $("btn-resume").onclick = closePause;
    $("btn-chapters").onclick = () => {
      $("pausemenu").style.display = "none";
      openChapters(false);
    };
    $("btn-settings").onclick = () => openSettings(false);
    $("btn-settings-back").onclick = closeSettings;
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
      settings.showChapter = btn.dataset.showchapter === "1";
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
    wire();
    showTitle();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
