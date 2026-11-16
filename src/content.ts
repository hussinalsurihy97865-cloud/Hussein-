export const VIDEO_FPS = 30;
export const AUDIO_DURATION_SEC = 45.244;
export const TOTAL_FRAMES = Math.ceil(AUDIO_DURATION_SEC * VIDEO_FPS); // 1358 frames

export const COLORS = {
  bgDeep: '#040914',
  bgNavy: '#0A192F',
  bgCard: 'rgba(13, 31, 61, 0.88)',
  cyan: '#00E5FF',
  teal: '#00B4D8',
  royalBlue: '#1E40AF',
  gold: '#F59E0B',
  danger: '#EF4444',
  success: '#10B981',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
};

export interface WordTiming {
  index: number;
  word: string;
  start: number; // seconds
  end: number;   // seconds
}

// يتم تحديث start و end تلقائياً بواسطة scripts/prepare_audio_and_whisper.py
export const WORDS: WordTiming[] = [
  { index: 0, word: "مرفوض", start: 0.15, end: 0.85 },
  { index: 1, word: "لأن", start: 0.88, end: 1.25 },
  { index: 2, word: "ما", start: 1.28, end: 1.55 },
  { index: 3, word: "عندك", start: 1.58, end: 2.10 },
  { index: 4, word: "خبرة؟", start: 2.15, end: 3.10 },
  { index: 5, word: "طيب،", start: 3.55, end: 4.10 },
  { index: 6, word: "من", start: 4.15, end: 4.40 },
  { index: 7, word: "وين", start: 4.42, end: 4.80 },
  { index: 8, word: "تجيبها", start: 4.85, end: 5.45 },
  { index: 9, word: "وانت", start: 5.50, end: 5.90 },
  { index: 10, word: "ما", start: 5.92, end: 6.18 },
  { index: 11, word: "اشتغلت؟", start: 6.20, end: 6.95 },
  { index: 12, word: "درست", start: 7.30, end: 7.80 },
  { index: 13, word: "محاسبة،", start: 7.85, end: 8.55 },
  { index: 14, word: "بس", start: 8.65, end: 8.95 },
  { index: 15, word: "هل", start: 8.98, end: 9.25 },
  { index: 16, word: "تعرف", start: 9.28, end: 9.70 },
  { index: 17, word: "تطابق", start: 9.75, end: 10.25 },
  { index: 18, word: "كشف", start: 10.28, end: 10.65 },
  { index: 19, word: "حساب", start: 10.68, end: 11.20 },
  { index: 20, word: "أو", start: 11.25, end: 11.50 },
  { index: 21, word: "تشتغل", start: 11.55, end: 12.00 },
  { index: 22, word: "على", start: 12.02, end: 12.30 },
  { index: 23, word: "نظام", start: 12.32, end: 12.75 },
  { index: 24, word: "محاسبي", start: 12.78, end: 13.30 },
  { index: 25, word: "حقيقي؟", start: 13.32, end: 13.95 },
  { index: 26, word: "برنامج", start: 14.30, end: 14.85 },
  { index: 27, word: "المحاسب", start: 14.88, end: 15.50 },
  { index: 28, word: "الجاهز", start: 15.52, end: 16.10 },
  { index: 29, word: "يحلها", start: 16.15, end: 16.60 },
  { index: 30, word: "لك.", start: 16.62, end: 17.05 },
  { index: 31, word: "راح", start: 17.35, end: 17.65 },
  { index: 32, word: "تستلم", start: 17.68, end: 18.15 },
  { index: 33, word: "بيانات", start: 18.18, end: 18.70 },
  { index: 34, word: "شركة", start: 18.72, end: 19.15 },
  { index: 35, word: "تدريبية", start: 19.18, end: 19.75 },
  { index: 36, word: "متكاملة", start: 19.78, end: 20.45 },
  { index: 37, word: "وتنفذ", start: 20.55, end: 21.05 },
  { index: 38, word: "بيدك", start: 21.08, end: 21.55 },
  { index: 39, word: "أكثر", start: 21.58, end: 21.95 },
  { index: 40, word: "من", start: 21.98, end: 22.20 },
  { index: 41, word: "100", start: 22.22, end: 22.65 },
  { index: 42, word: "عملية", start: 22.68, end: 23.15 },
  { index: 43, word: "واقعية", start: 23.18, end: 23.75 },
  { index: 44, word: "من", start: 23.80, end: 24.05 },
  { index: 45, word: "الفواتير", start: 24.08, end: 24.65 },
  { index: 46, word: "والمخزون", start: 24.68, end: 25.30 },
  { index: 47, word: "إلى", start: 25.32, end: 25.60 },
  { index: 48, word: "التقارير", start: 25.62, end: 26.15 },
  { index: 49, word: "المالية.", start: 26.18, end: 26.75 },
  { index: 50, word: "تدريب", start: 27.10, end: 27.60 },
  { index: 51, word: "شامل", start: 27.62, end: 28.05 },
  { index: 52, word: "من", start: 28.08, end: 28.30 },
  { index: 53, word: "الصفر", start: 28.32, end: 28.75 },
  { index: 54, word: "للاحتراف:", start: 28.78, end: 29.45 },
  { index: 55, word: "إكسل،", start: 29.55, end: 30.15 },
  { index: 56, word: "أنظمة", start: 30.20, end: 30.65 },
  { index: 57, word: "محاسبية،", start: 30.68, end: 31.35 },
  { index: 58, word: "تحليل", start: 31.40, end: 31.85 },
  { index: 59, word: "مالي،", start: 31.88, end: 32.40 },
  { index: 60, word: "وذكاء", start: 32.45, end: 32.95 },
  { index: 61, word: "اصطناعي", start: 32.98, end: 33.65 },
  { index: 62, word: "مع", start: 33.95, end: 34.25 },
  { index: 63, word: "لقاءات", start: 34.28, end: 34.80 },
  { index: 64, word: "أسبوعية", start: 34.82, end: 35.40 },
  { index: 65, word: "ومتابعة", start: 35.45, end: 36.00 },
  { index: 66, word: "مستمرة", start: 36.02, end: 36.65 },
  { index: 67, word: "عشان", start: 36.95, end: 37.35 },
  { index: 68, word: "في", start: 37.38, end: 37.60 },
  { index: 69, word: "المقابلة", start: 37.62, end: 38.15 },
  { index: 70, word: "ترد", start: 38.18, end: 38.50 },
  { index: 71, word: "بثقة:", start: 38.52, end: 39.05 },
  { index: 72, word: "عندي", start: 39.15, end: 39.55 },
  { index: 73, word: "تدريب", start: 39.58, end: 40.00 },
  { index: 74, word: "عملي", start: 40.02, end: 40.45 },
  { index: 75, word: "وهذه", start: 40.48, end: 40.85 },
  { index: 76, word: "أعمالي.", start: 40.88, end: 41.45 },
  { index: 77, word: "منصة", start: 41.65, end: 42.00 },
  { index: 78, word: "اشرح", start: 42.02, end: 42.32 },
  { index: 79, word: "لي", start: 42.34, end: 42.52 },
  { index: 80, word: "بتقدم", start: 42.55, end: 42.88 },
  { index: 81, word: "لك:", start: 42.90, end: 43.12 },
  { index: 82, word: "شركة", start: 43.15, end: 43.48 },
  { index: 83, word: "كاملة", start: 43.50, end: 43.82 },
  { index: 84, word: "وأنت", start: 43.85, end: 44.12 },
  { index: 85, word: "محاسبها", start: 44.15, end: 44.52 },
  { index: 86, word: "استكشف", start: 44.55, end: 44.78 },
  { index: 87, word: "البرنامج", start: 44.80, end: 44.98 },
  { index: 88, word: "وسجل", start: 45.00, end: 45.12 },
  { index: 89, word: "الآن", start: 45.13, end: 45.24 },
];

export interface SceneDef {
  id: number;
  startWord: number;
  endWord: number;
  flashOnEnter?: boolean;
}

export const SCENES: SceneDef[] = [
  { id: 1, startWord: 0, endWord: 4, flashOnEnter: true },
  { id: 2, startWord: 5, endWord: 11, flashOnEnter: false },
  { id: 3, startWord: 12, endWord: 25, flashOnEnter: false },
  { id: 4, startWord: 26, endWord: 30, flashOnEnter: true },
  { id: 5, startWord: 31, endWord: 49, flashOnEnter: false },
  { id: 6, startWord: 50, endWord: 61, flashOnEnter: true },
  { id: 7, startWord: 62, endWord: 66, flashOnEnter: false },
  { id: 8, startWord: 67, endWord: 76, flashOnEnter: true },
  { id: 9, startWord: 77, endWord: 89, flashOnEnter: true },
];

export function getWordFrame(wordIndex: number, fps = VIDEO_FPS): number {
  const w = WORDS[Math.min(Math.max(0, wordIndex), WORDS.length - 1)];
  return Math.round(w.start * fps);
}

export function getWordEndFrame(wordIndex: number, fps = VIDEO_FPS): number {
  const w = WORDS[Math.min(Math.max(0, wordIndex), WORDS.length - 1)];
  return Math.round(w.end * fps);
}
