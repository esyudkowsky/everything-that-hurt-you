#!/usr/bin/env python3
"""Make seamless-loop versions of the Lyria BGM tracks.

Generative tracks end in fade-outs no matter what the prompt asks, so loopability
is manufactured deterministically here instead of by regeneration:
  1. trim leading quiet and the trailing fade (windowed-RMS vs track median),
  2. equal-power crossfade the last CROSSFADE seconds into the track's own head,
  3. start the file at head+CROSSFADE — so end-of-file flows sample-continuously
     back into start-of-file when the engine loops it.
NOTE for the engine: MP3 has ~50ms codec padding at file edges; loop via Web Audio
decoded buffers (sample-accurate) or two crossfading <audio> elements, not a naive
<audio loop> tag, or the seam will click/gap.

Usage: make_loops.py IN.mp3 [IN2.mp3 ...]   (writes IN_loop.mp3 next to input)
"""
import os, subprocess, sys
import numpy as np

SR = 44100
CROSSFADE = 2.0   # seconds blended across the loop seam
WIN = 0.1         # RMS window, seconds


def decode(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"],
        capture_output=True, check=True).stdout
    return np.frombuffer(raw, "<f4").reshape(-1, 2).astype(np.float64)


def encode(path, samples):
    pcm = (np.clip(samples, -1, 1) * 32767).astype("<i2").tobytes()
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ac", "2", "-ar", str(SR),
         "-i", "-", "-b:a", "192k", path],
        input=pcm, check=True)


def loopify(path):
    a = decode(path)
    mono = a.mean(axis=1)
    hop = int(SR * WIN)
    nwin = len(mono) // hop
    rms = np.sqrt((mono[: nwin * hop].reshape(nwin, hop) ** 2).mean(axis=1))
    med = np.median(rms)
    loud = np.nonzero(rms >= med * 10 ** (-4 / 20))[0]   # within 4dB of median
    audible = np.nonzero(rms >= med * 10 ** (-12 / 20))[0]
    start, end = audible[0] * hop, (loud[-1] + 1) * hop
    a = a[start:end]

    n = int(SR * CROSSFADE)
    theta = np.linspace(0, np.pi / 2, n)[:, None]
    tail = a[-n:] * np.cos(theta) + a[:n] * np.sin(theta)
    out = np.concatenate([a[n:-n], tail])

    dst = os.path.splitext(path)[0] + "_loop.mp3"
    encode(dst, out)
    print(f"{os.path.basename(dst)}: trimmed {start/SR:.1f}s head, "
          f"{(len(mono)-end)/SR:.1f}s tail fade; {len(out)/SR:.1f}s loop")
    return dst


if __name__ == "__main__":
    for p in sys.argv[1:]:
        loopify(p)
