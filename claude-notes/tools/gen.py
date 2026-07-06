#!/usr/bin/env python3
"""Generate images via OpenRouter (Gemini 3.1 Flash Image) for 'Everything That Hurt You'.

Usage:
  gen.py --out PATH --prompt "..." [--ref image.png ...] [--aspect 16:9|3:4|1:1] [--retries N]

Saves the first returned image to PATH (PNG). Exits nonzero on failure.
"""
import argparse, base64, json, mimetypes, os, sys, time
import requests

API = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemini-3.1-flash-image"


def data_url(path):
    mime = mimetypes.guess_type(path)[0] or "image/png"
    with open(path, "rb") as f:
        return f"data:{mime};base64,{base64.b64encode(f.read()).decode()}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--ref", action="append", default=[])
    ap.add_argument("--aspect", default=None)
    ap.add_argument("--retries", type=int, default=3)
    ap.add_argument("--model", default=MODEL, help="OpenRouter image model id (default: %(default)s)")
    a = ap.parse_args()

    key = os.environ["OPENROUTER_KEY"].strip()
    content = []
    for r in a.ref:
        content.append({"type": "image_url", "image_url": {"url": data_url(r)}})
    content.append({"type": "text", "text": a.prompt})

    body = {
        "model": a.model,
        "messages": [{"role": "user", "content": content}],
        "modalities": ["image", "text"],
    }
    if a.aspect:
        body["image_config"] = {"aspect_ratio": a.aspect}

    last_err = None
    for attempt in range(a.retries):
        try:
            resp = requests.post(
                API,
                headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                json=body,
                timeout=300,
            )
            j = resp.json()
            if resp.status_code != 200:
                raise RuntimeError(f"HTTP {resp.status_code}: {json.dumps(j)[:500]}")
            msg = j["choices"][0]["message"]
            images = msg.get("images") or []
            if not images:
                raise RuntimeError(f"no image in response; text={str(msg.get('content'))[:300]}")
            url = images[0]["image_url"]["url"]
            if not url.startswith("data:"):
                raise RuntimeError(f"unexpected image url form: {url[:100]}")
            b64 = url.split(",", 1)[1]
            os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
            with open(a.out, "wb") as f:
                f.write(base64.b64decode(b64))
            print(f"saved {a.out} ({len(b64)*3//4} bytes)")
            return 0
        except Exception as e:
            last_err = e
            print(f"attempt {attempt+1} failed: {e}", file=sys.stderr)
            time.sleep(3 * (attempt + 1))
    print(f"FAILED: {last_err}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
