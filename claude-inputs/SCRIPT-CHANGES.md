# SCRIPT-CHANGES.md — diff log between script.md revisions

Tracks user-directed line-level edits to the master script (`claude-inputs/script.md`)
after rev. 2 was locked in and staged into `/script.txt` (the file the engine actually
plays). Each entry lists what changed, why, and which files were touched — both the
master script and the live stage script must be kept in sync; check this file's
"synced to" line before trusting `/script.txt` matches the current script.md rev.

---

## rev. 2 → rev. 3 (2026-07-02)

**Change:** "Some guy in the middle of nowhere drinking tea who I heard say something
about a Demon Lord!" → "Some guy in the middle of nowhere who I heard say something
about a Demon Lord!" (Avram's line, bartender scene, 1 occurrence).

**Why:** User-directed. "Drinking tea" foreshadows the prologue-flash reveal (the
God is the one drinking tea) too specifically for a throwaway Avram line — removing
it keeps the later "guy drinking tea in the middle of nowhere" payoff (see
`claude-inputs/fable-conversation.md` line 33/47, the prologue tea-flash panel)
from being spoiled early.

**Synced to:**
- `claude-inputs/script.md` (rev. 3 header; line ~69)
- `/script.txt` (stage script v2 header; the `Avram:` line in chapter 2, The
  Bartender)

**Verification:** `node claude-notes/tools/validate_script.js` → 0 errors after the
edit (dialogue text changes aren't checked against anything but must not break
directive parsing, which it doesn't — plain text edit only).
