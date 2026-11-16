# إعلان برنامج المحاسب الجاهز — منصة اشرح لي (Remotion)

## تشغيل محلي
```
npm install
npm start                 # معاينة في المتصفح
npm run render:vertical   # out/Ad-Vertical.mp4  (1080x1920)
npm run render:landscape  # out/Ad-Landscape.mp4  (1920x1080)
```
يتطلب Node 18+.

## الملفات الجاهزة داخل public/
- voice.mp3 : التعليق الصوتي (45.244 ثانية)
- logo.png : الشعار
- envelope.json : موجة الصوت (مولّدة)
- music.mp3 : موسيقى/مؤثرات خلفية (مولّدة)

## (اختياري) محاذاة Whisper
```
pip install numpy openai-whisper
python3 scripts/prepare_audio_and_whisper.py
```
أو ارفع المشروع إلى GitHub وشغّل workflow باسم Render Remotion Ad.
