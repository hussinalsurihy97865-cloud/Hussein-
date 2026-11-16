"""
الاستخدام:
  python3 scripts/prepare_audio_and_whisper.py              # envelope + موسيقى + محاذاة Whisper
  python3 scripts/prepare_audio_and_whisper.py --skip-whisper  # envelope + موسيقى فقط
"""
import json
import math
import os
import re
import subprocess
import sys
import wave
import numpy as np

VOICE_PATH = "public/voice.mp3"
MUSIC_WAV = "public/music.wav"
MUSIC_MP3 = "public/music.mp3"
ENVELOPE_PATH = "public/envelope.json"
CONTENT_TS_PATH = "src/content.ts"
FPS = 30

EXPECTED_WORDS = [
    "مرفوض", "لأن", "ما", "عندك", "خبرة؟",
    "طيب،", "من", "وين", "تجيبها", "وانت", "ما", "اشتغلت؟",
    "درست", "محاسبة،", "بس", "هل", "تعرف", "تطابق", "كشف", "حساب", "أو", "تشتغل", "على", "نظام", "محاسبي", "حقيقي؟",
    "برنامج", "المحاسب", "الجاهز", "يحلها", "لك.",
    "راح", "تستلم", "بيانات", "شركة", "تدريبية", "متكاملة", "وتنفذ", "بيدك", "أكثر", "من", "100", "عملية", "واقعية", "من", "الفواتير", "والمخزون", "إلى", "التقارير", "المالية.",
    "تدريب", "شامل", "من", "الصفر", "للاحتراف:", "إكسل،", "أنظمة", "محاسبية،", "تحليل", "مالي،", "وذكاء", "اصطناعي",
    "مع", "لقاءات", "أسبوعية", "ومتابعة", "مستمرة",
    "عشان", "في", "المقابلة", "ترد", "بثقة:", "عندي", "تدريب", "عملي", "وهذه", "أعمالي.",
    "منصة", "اشرح", "لي", "بتقدم", "لك:", "شركة", "كاملة", "وأنت", "محاسبها", "استكشف", "البرنامج", "وسجل", "الآن"
]


def compute_envelope_and_sfx():
    tmp_wav = "public/voice_tmp.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", VOICE_PATH, "-ac", "1", "-ar", "44100", tmp_wav], check=True)

    with wave.open(tmp_wav, "rb") as wf:
        sr = wf.getframerate()
        raw = wf.readframes(wf.getnframes())
        samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0

    duration = len(samples) / sr
    total_video_frames = int(math.ceil(duration * FPS))
    spf = int(sr / FPS)

    envelope = []
    for i in range(total_video_frames):
        chunk = samples[i * spf:(i + 1) * spf]
        rms = float(np.sqrt(np.mean(chunk ** 2))) if len(chunk) > 0 else 0.0
        envelope.append(round(min(1.0, rms * 3.8), 4))

    with open(ENVELOPE_PATH, "w", encoding="utf-8") as f:
        json.dump({"fps": FPS, "duration": round(duration, 3), "envelope": envelope}, f)

    t = np.linspace(0, duration, len(samples), endpoint=False)
    pad = 0.08 * np.sin(2 * np.pi * 110 * t) + 0.05 * np.sin(2 * np.pi * 164.81 * t) + 0.04 * np.sin(2 * np.pi * 220 * t)

    impacts = [0.15, 14.3, 27.1, 36.9, 41.6]
    sfx = np.zeros_like(t)
    for imp in impacts:
        mask = (t >= imp) & (t < imp + 0.8)
        rel_t = t[mask] - imp
        sfx[mask] += 0.35 * np.sin(2 * np.pi * (90 * np.exp(-rel_t * 4)) * rel_t) * np.exp(-rel_t * 5)

    mix = np.clip(pad + sfx, -0.9, 0.9)
    mix_int16 = (mix * 32767).astype(np.int16)

    with wave.open(MUSIC_WAV, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(mix_int16.tobytes())

    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", MUSIC_WAV, "-b:a", "128k", MUSIC_MP3], check=True)
    os.remove(tmp_wav)
    os.remove(MUSIC_WAV)
    print(f"OK: envelope.json ({total_video_frames} frames) + music.mp3 جاهزة، مدة الصوت {duration:.3f} ث")


def align_with_whisper():
    import whisper
    model = whisper.load_model("base")
    result = model.transcribe(VOICE_PATH, language="ar", word_timestamps=True)

    whisper_words = []
    for seg in result.get("segments", []):
        for w in seg.get("words", []):
            whisper_words.append({"word": w["word"].strip(), "start": float(w["start"]), "end": float(w["end"])})

    if len(whisper_words) < 20:
        print("WARNING: Whisper لم يستخرج كلمات كافية، سيتم الإبقاء على التوقيتات الحالية.", file=sys.stderr)
        return

    aligned = []
    n_exp = len(EXPECTED_WORDS)
    n_whisp = len(whisper_words)
    for i, exp_word in enumerate(EXPECTED_WORDS):
        mapped_idx = min(n_whisp - 1, int(round(i * (n_whisp - 1) / max(1, n_exp - 1))))
        w_obj = whisper_words[mapped_idx]
        aligned.append({
            "index": i,
            "word": exp_word,
            "start": round(w_obj["start"], 2),
            "end": round(max(w_obj["start"] + 0.12, w_obj["end"]), 2),
        })

    with open(CONTENT_TS_PATH, "r", encoding="utf-8") as f:
        code = f.read()

    lines = ["export const WORDS: WordTiming[] = ["]
    for item in aligned:
        lines.append(f'  {{ index: {item["index"]}, word: "{item["word"]}", start: {item["start"]}, end: {item["end"]} }},')
    lines.append("];")

    code = re.sub(r"export const WORDS: WordTiming\[\] = \[.*?\];", "\n".join(lines), code, flags=re.DOTALL)
    with open(CONTENT_TS_PATH, "w", encoding="utf-8") as f:
        f.write(code)
    print("OK: تمت محاذاة توقيتات Whisper مع النص.")


if __name__ == "__main__":
    compute_envelope_and_sfx()
    if "--skip-whisper" not in sys.argv:
        align_with_whisper()
