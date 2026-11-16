import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, getWordFrame, SCENES, WORDS } from './content';
import { CAIRO_FONT, WhiteLogoCard } from './ui';
import {
  Hero1Rejection,
  Hero2Paradox,
  Hero3BankRec,
  Hero4Solution,
  Hero5HundredOps,
  Hero6FourPillars,
  Hero7Mentorship,
  Hero8Interview,
  Hero9CTA,
} from './heroes';
import envelopeData from '../public/envelope.json';

export const Ad: React.FC<{ orientation: 'vertical' | 'landscape' }> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const currentScene =
    SCENES.find((s, idx) => {
      const nextScene = SCENES[idx + 1];
      const startFrame = getWordFrame(s.startWord, fps);
      const endFrame = nextScene ? getWordFrame(nextScene.startWord, fps) : Infinity;
      return frame >= startFrame && frame < endFrame;
    }) || SCENES[0];

  let flashOpacity = 0;
  for (const s of SCENES) {
    if (s.flashOnEnter) {
      const trigger = getWordFrame(s.startWord, fps);
      if (frame >= trigger && frame <= trigger + 8) {
        flashOpacity = interpolate(frame, [trigger, trigger + 8], [0.65, 0], {
          extrapolateRight: 'clamp',
        });
      }
    }
  }

  const envArray: number[] = envelopeData.envelope || [];
  const envVal = envArray[Math.min(frame, envArray.length - 1)] ?? 0.25;

  const sceneWords = WORDS.slice(currentScene.startWord, currentScene.endWord + 1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        backgroundImage: `radial-gradient(circle at 50% 25%, #0F294D 0%, ${COLORS.bgDeep} 75%)`,
        fontFamily: CAIRO_FONT,
        direction: 'rtl',
        overflow: 'hidden',
      }}
    >
      <Audio src={staticFile('voice.mp3')} volume={1} />
      <Audio src={staticFile('music.mp3')} volume={0.18} />

      <div
        style={{
          position: 'absolute',
          top: orientation === 'vertical' ? 64 : 36,
          right: orientation === 'vertical' ? 48 : 64,
          left: orientation === 'vertical' ? 48 : 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          boxSizing: 'border-box',
        }}
      >
        <WhiteLogoCard size="sm" />
        <div
          style={{
            padding: '10px 22px',
            borderRadius: 999,
            background: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            color: COLORS.cyan,
            fontSize: 22,
            fontWeight: 700,
            boxSizing: 'border-box',
          }}
        >
          برنامج المحاسب الجاهز
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: orientation === 'vertical' ? '20%' : '18%',
          width: '100%',
          height: orientation === 'vertical' ? '48%' : '52%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        {currentScene.id === 1 && <Hero1Rejection orientation={orientation} />}
        {currentScene.id === 2 && <Hero2Paradox orientation={orientation} />}
        {currentScene.id === 3 && <Hero3BankRec orientation={orientation} />}
        {currentScene.id === 4 && <Hero4Solution orientation={orientation} />}
        {currentScene.id === 5 && <Hero5HundredOps orientation={orientation} />}
        {currentScene.id === 6 && <Hero6FourPillars orientation={orientation} />}
        {currentScene.id === 7 && <Hero7Mentorship orientation={orientation} />}
        {currentScene.id === 8 && <Hero8Interview orientation={orientation} />}
        {currentScene.id === 9 && <Hero9CTA orientation={orientation} />}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: orientation === 'vertical' ? 210 : 120,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '0 48px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            maxWidth: orientation === 'vertical' ? 940 : 1400,
            background: 'rgba(4, 9, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 24,
            padding: '22px 34px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px 14px',
            direction: 'rtl',
          }}
        >
          {sceneWords.map((w) => {
            const isSpoken = currentTime >= w.start;
            const isCurrent = currentTime >= w.start && currentTime <= w.end + 0.15;
            return (
              <span
                key={w.index}
                style={{
                  fontSize: orientation === 'vertical' ? 42 : 38,
                  fontWeight: isCurrent ? 900 : 700,
                  color: isCurrent ? COLORS.cyan : isSpoken ? COLORS.white : 'rgba(255,255,255,0.28)',
                  transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                  display: 'inline-block',
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: orientation === 'vertical' ? 80 : 36,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
          height: 70,
        }}
      >
        {Array.from({ length: 36 }).map((_, i) => {
          const distFromCenter = Math.abs(i - 17.5) / 17.5;
          const wave = Math.sin(frame * 0.35 + i * 0.6) * 0.3 + 0.7;
          const barHeight = Math.max(8, Math.round(envVal * wave * (1 - distFromCenter * 0.55) * 68));
          return (
            <div
              key={i}
              style={{
                width: 6,
                height: barHeight,
                borderRadius: 99,
                background: `linear-gradient(to top, ${COLORS.teal}, ${COLORS.cyan})`,
                opacity: 0.85,
              }}
            />
          );
        })}
      </div>

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          opacity: 0.05,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '4px 4px',
        }}
      />

      {flashOpacity > 0 && (
        <AbsoluteFill style={{ backgroundColor: '#FFFFFF', opacity: flashOpacity, pointerEvents: 'none' }} />
      )}
    </AbsoluteFill>
  );
};
