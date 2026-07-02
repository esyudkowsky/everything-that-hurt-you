#!/usr/bin/env python3
"""Synthesize sfx_silence-cut for 'Everything That Hurt You'.

A reverse-cymbal swell into instant, absolute silence (the whiteout sting).
Made programmatically, NOT by AI: like the ui_* graphics, this asset needs exact
behavior — a true hard cut to digital zero — and Lyria (a music model) kept
returning drum loops for it. Reverse cymbal = inharmonic metallic partials +
brightening noise under an exponentially rising envelope, cut dead at the peak.

Writes 44.1kHz 16-bit stereo WAV (lossless; no codec smear at the cut).
Usage: make_sfx.py [out.wav]
"""
import sys, wave
import numpy as np

SR = 44100
SWELL = 5.5      # seconds of rise
TAIL = 1.5       # seconds of pure digital silence after the cut
rng = np.random.default_rng(7)

n = int(SR * SWELL)
t = np.arange(n) / SR

# Exponentially rising envelope, ~55 dB of rise ending at full scale.
env = np.exp((t / SWELL) * 6.3)
env /= env[-1]

def channel(seed_off):
    r = np.random.default_rng(7 + seed_off)
    # Noise bed that brightens over time: crossfade dark -> bright noise.
    noise = r.standard_normal(n)
    dark = np.convolve(noise, np.ones(24) / 24, mode="same")   # lowpassed
    bright = noise - np.convolve(noise, np.ones(6) / 6, mode="same")  # highpassed
    mix = (1 - t / SWELL) * dark * 1.5 + (t / SWELL) * bright
    # Inharmonic metallic partials (cymbal-ish cluster), each rising with env.
    partials = np.zeros(n)
    for f in (3211.0, 4087.0, 5333.0, 6521.0, 7907.0, 9413.0):
        f_d = f * (1 + 0.004 * (seed_off - 0.5))  # slight stereo detune
        partials += np.sin(2 * np.pi * f_d * t + r.uniform(0, 2 * np.pi)) / 6
    return (0.75 * mix + 0.35 * partials) * env

left, right = channel(0), channel(1)
peak = max(np.abs(left).max(), np.abs(right).max())
left, right = left / peak * 0.89, right / peak * 0.89  # ~-1 dBFS

silence = np.zeros(int(SR * TAIL))
stereo = np.stack([np.concatenate([left, silence]),
                   np.concatenate([right, silence])], axis=1)
pcm = (stereo * 32767).astype("<i2")

out = sys.argv[1] if len(sys.argv) > 1 else "assets/audio/sfx_silence-cut.wav"
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f"saved {out} ({pcm.nbytes} bytes, {SWELL + TAIL}s)")
