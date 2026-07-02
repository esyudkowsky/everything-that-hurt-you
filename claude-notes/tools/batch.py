#!/usr/bin/env python3
"""Batch-run generation jobs from a JSON file.

Job fields: out (path), prompt, refs (list, optional), aspect (optional),
sprite (bool — if true, run bgremove into `out`, keeping raw in raw_dir).
Skips jobs whose `out` already exists unless --force. Runs 4 workers.
"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor, as_completed

TOOLS = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(TOOLS, "..", "raw")


def run(job, force):
    out = job["out"]
    if os.path.exists(out) and not force:
        return (out, "skip")
    os.makedirs(RAW, exist_ok=True)
    is_sprite = job.get("sprite")
    raw_out = os.path.join(RAW, os.path.basename(out)) if is_sprite else out
    cmd = [sys.executable, os.path.join(TOOLS, "gen.py"), "--out", raw_out, "--prompt", job["prompt"]]
    for r in job.get("refs", []):
        cmd += ["--ref", r]
    if job.get("aspect"):
        cmd += ["--aspect", job["aspect"]]
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        return (out, f"GEN-FAIL: {p.stderr.strip()[-200:]}")
    if is_sprite:
        p2 = subprocess.run([sys.executable, os.path.join(TOOLS, "bgremove.py"), raw_out, out],
                            capture_output=True, text=True)
        if p2.returncode != 0:
            return (out, f"BG-WARN({p2.returncode}): {p2.stdout.strip()} {p2.stderr.strip()[-150:]}")
    return (out, "ok")


def main():
    jobs_file = sys.argv[1]
    force = "--force" in sys.argv
    only = [a for a in sys.argv[2:] if a != "--force"]
    jobs = json.load(open(jobs_file))
    if only:
        jobs = [j for j in jobs if any(o in j["out"] for o in only)]
    fails = 0
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = {ex.submit(run, j, force): j for j in jobs}
        for f in as_completed(futs):
            out, status = f.result()
            print(f"{status:8s} {out}" if status in ("ok", "skip") else f"{out}: {status}")
            if "FAIL" in status:
                fails += 1
    print(f"done, {fails} failures / {len(jobs)} jobs")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
