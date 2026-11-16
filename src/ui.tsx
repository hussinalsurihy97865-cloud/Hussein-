import React from 'react';
import { Img, staticFile } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { COLORS } from './content';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '600', '700', '800', '900'],
});

export const CAIRO_FONT = fontFamily;

export const baseCardStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  background: COLORS.bgCard,
  border: '1px solid rgba(0, 229, 255, 0.28)',
  borderRadius: 24,
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
  backdropFilter: 'blur(16px)',
  direction: 'rtl',
  fontFamily: CAIRO_FONT,
};

// الشعار شفاف بحروف داكنة، لذا يوضع دائماً داخل بطاقة بيضاء نقية
export const WhiteLogoCard: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}> = ({ size = 'md', style }) => {
  const dimensions = {
    sm: { padding: '10px 18px', height: 84, radius: 18 },
    md: { padding: '16px 28px', height: 130, radius: 24 },
    lg: { padding: '24px 44px', height: 210, radius: 32 },
  }[size];

  return (
    <div
      style={{
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
        padding: dimensions.padding,
        borderRadius: dimensions.radius,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 14px 40px rgba(0, 229, 255, 0.25), 0 4px 12px rgba(0,0,0,0.4)',
        border: '2px solid rgba(0, 229, 255, 0.45)',
        ...style,
      }}
    >
      <Img
        src={staticFile('logo.png')}
        style={{
          height: dimensions.height,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};

export const IconCheck: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = COLORS.success,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} fillOpacity={0.2} stroke={color} strokeWidth="2" />
    <path d="M8 12.5L10.8 15.3L16 9.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconAlert: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = COLORS.danger,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} fillOpacity={0.2} stroke={color} strokeWidth="2" />
    <path d="M12 7V13M12 16.5H12.01" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
