#!/usr/bin/env python3
"""Generate music via OpenRouter (Google Lyria 3) for 'Everything That Hurt You'.

Usage:
  gen_music.py --out PATH --prompt "..." [--model pro|clip] [--retries N]

Models: 'pro' = google/lyria-3-pro-preview, full-length song, $0.08/song.
        'clip' = google/lyria-3-clip-preview, ~30s, $0.04/clip.
Audio output REQUIRES stream=true; audio arrives as base64 MP3 (192kbps 44.1kHz)
in delta.audio.data chunks. Saves the MP3 to PATH. Exits nonzero on failure.
"""
import argparse, base64, json, os, sys, time
import requests

API = "https://openrouter.ai/api/v1/chat/completions"
MODELS = {"pro": "google/lyria-3-pro-preview", "clip": "google/lyria-3-clip-preview"}


def generate(model, prompt, timeout=600):
    key = os.environ["OPENROUTER_KEY"].strip()
    body = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "modalities": ["text", "audio"],
        "stream": True,
    }
    resp = requests.post(
        API,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        json=body,
        timeout=timeout,
        stream=True,
    )
    if resp.status_code != 200:
        raise RuntimeError(f"HTTP {resp.status_code}: {resp.text[:500]}")
    audio, text = [], []
    for line in resp.iter_lines():
        if not line or not line.startswith(b"data: "):
            continue
        payload = line[6:]
        if payload == b"[DONE]":
            break
        chunk = json.loads(payload)
        if "error" in chunk:
            raise RuntimeError(f"stream error: {json.dumps(chunk['error'])[:500]}")
        for ch in chunk.get("choices", []):
            delta = ch.get("delta", {})
            if delta.get("content"):
                text.append(delta["content"])
            au = delta.get("audio")
            if au and au.get("data"):
                audio.append(au["data"])
    if not audio:
        raise RuntimeError(f"no audio in response; text={''.join(text)[:300]}")
    return base64.b64decode("".join(audio)), "".join(text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--model", choices=list(MODELS), default="pro")
    ap.add_argument("--retries", type=int, default=3)
    a = ap.parse_args()

    last_err = None
    for attempt in range(a.retries):
        try:
            raw, text = generate(MODELS[a.model], a.prompt)
            os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
            with open(a.out, "wb") as f:
                f.write(raw)
            print(f"saved {a.out} ({len(raw)} bytes; transcript={text[:80]!r})")
            return 0
        except Exception as e:
            last_err = e
            print(f"attempt {attempt+1} failed: {e}", file=sys.stderr)
            time.sleep(5 * (attempt + 1))
    print(f"FAILED: {last_err}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
