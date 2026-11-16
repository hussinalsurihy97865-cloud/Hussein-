import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, getWordFrame } from './content';
import { baseCardStyle, IconAlert, IconCheck, WhiteLogoCard } from './ui';

interface HeroProps {
  orientation: 'vertical' | 'landscape';
}

const wrap: React.CSSProperties = { width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' };

// 1. مشهد الرفض
export const Hero1Rejection: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampTrigger = getWordFrame(0, fps);
  const slam = spring({ frame: frame - stampTrigger, fps, config: { damping: 12, stiffness: 220 } });
  const scale = interpolate(slam, [0, 1], [2.8, 1]);

  return (
    <div style={wrap}>
      <div
        style={{
          ...baseCardStyle,
          width: orientation === 'vertical' ? '90%' : '68%',
          padding: 40,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 28, color: COLORS.textMuted, marginBottom: 16 }}>طلب توظيف — محاسب مالي</div>
        <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.white, marginBottom: 24 }}>السيرة الذاتية للمتقدم</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 18, background: 'rgba(255,255,255,0.05)', borderRadius: 14, fontSize: 26, color: '#E2E8F0', boxSizing: 'border-box' }}>
            المؤهل: بكالوريوس محاسبة
          </div>
          <div style={{ padding: 18, background: 'rgba(239,68,68,0.15)', border: `1px solid ${COLORS.danger}`, borderRadius: 14, fontSize: 26, color: '#FCA5A5', display: 'flex', alignItems: 'center', gap: 12, boxSizing: 'border-box' }}>
            <IconAlert /> الخبرة العملية: 0 سنوات
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '12%',
            transform: `scale(${scale}) rotate(-14deg)`,
            opacity: slam,
            border: `6px solid ${COLORS.danger}`,
            color: COLORS.danger,
            padding: '12px 36px',
            borderRadius: 16,
            fontSize: 64,
            fontWeight: 900,
            backgroundColor: 'rgba(20, 5, 10, 0.92)',
            boxShadow: `0 0 40px rgba(239, 68, 68, 0.6)`,
            boxSizing: 'border-box',
          }}
        >
          مرفوض
        </div>
      </div>
    </div>
  );
};

// 2. مشهد الحلقة المفرغة
export const Hero2Paradox: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = getWordFrame(5, fps);
  const prog = spring({ frame: frame - start, fps, config: { damping: 14 } });

  return (
    <div style={wrap}>
      <div style={{ ...baseCardStyle, width: orientation === 'vertical' ? '90%' : '70%', padding: 42, textAlign: 'center' }}>
        <div style={{ fontSize: 34, color: COLORS.gold, fontWeight: 800, marginBottom: 28 }}>معضلة الخريج الجديد</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ ...baseCardStyle, padding: '24px 32px', flex: 1, minWidth: 240, borderColor: COLORS.gold }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.white }}>الوظيفة</div>
            <div style={{ fontSize: 24, color: COLORS.textMuted }}>تشتـرط خبرة سابقة</div>
          </div>
          <div style={{ fontSize: 54, color: COLORS.cyan, transform: `rotate(${prog * 180}deg)` }}>⇄</div>
          <div style={{ ...baseCardStyle, padding: '24px 32px', flex: 1, minWidth: 240, borderColor: COLORS.cyan }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.white }}>الخبرة</div>
            <div style={{ fontSize: 24, color: COLORS.textMuted }}>تحتاج فرصة عمل</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. مشهد مطابقة كشف الحساب
export const Hero3BankRec: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bankWord = getWordFrame(17, fps);
  const erpWord = getWordFrame(23, fps);
  const showBank = spring({ frame: frame - bankWord, fps });
  const showErp = spring({ frame: frame - erpWord, fps });

  return (
    <div style={wrap}>
      <div style={{ ...baseCardStyle, width: orientation === 'vertical' ? '92%' : '76%', padding: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: COLORS.cyan }}>مذكرة تسوية البنك والنظام المحاسبي</span>
          <span style={{ fontSize: 22, padding: '6px 16px', background: 'rgba(245,158,11,0.2)', color: COLORS.gold, borderRadius: 10 }}>مهمة عملية</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 18, background: 'rgba(255,255,255,0.05)', borderRadius: 14, fontSize: 26, color: COLORS.white, boxSizing: 'border-box' }}>
            <span>رصيد كشف الحساب البنكي</span>
            <span style={{ fontFamily: 'monospace', color: COLORS.cyan }}>148,500.00 SAR</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 18, background: 'rgba(255,255,255,0.05)', borderRadius: 14, fontSize: 26, color: COLORS.white, opacity: 0.4 + 0.6 * showBank, boxSizing: 'border-box' }}>
            <span>رصيد الأستاذ العام بالنظام</span>
            <span style={{ fontFamily: 'monospace', color: COLORS.gold }}>142,150.00 SAR</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 18, background: 'rgba(239,68,68,0.16)', border: `1px solid ${COLORS.danger}`, borderRadius: 14, fontSize: 26, color: '#FCA5A5', opacity: 0.3 + 0.7 * showErp, boxSizing: 'border-box' }}>
            <span>فروقات معلّقة تحتاج تسوية قيد</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>6,350.00 SAR ❓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. مشهد الحل
export const Hero4Solution: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = getWordFrame(26, fps);
  const pop = spring({ frame: frame - start, fps, config: { damping: 12 } });

  return (
    <div style={wrap}>
      <div
        style={{
          ...baseCardStyle,
          width: orientation === 'vertical' ? '90%' : '70%',
          padding: 44,
          textAlign: 'center',
          transform: `scale(${interpolate(pop, [0, 1], [0.85, 1])})`,
          border: `2px solid ${COLORS.cyan}`,
          boxShadow: `0 0 60px rgba(0, 229, 255, 0.35)`,
        }}
      >
        <WhiteLogoCard size="md" style={{ marginBottom: 24 }} />
        <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.white, marginBottom: 12 }}>برنامج المحاسب الجاهز</div>
        <div style={{ fontSize: 30, color: COLORS.cyan, fontWeight: 700 }}>جسرك العملي من التخرج إلى التوظيف المباشر</div>
      </div>
    </div>
  );
};

// 5. مشهد +100 عملية
export const Hero5HundredOps: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countStart = getWordFrame(38, fps);
  const countEnd = getWordFrame(43, fps);
  const count = Math.floor(
    interpolate(frame, [countStart, countEnd], [1, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const items = [
    { label: 'فواتير مبيعات ومشتريات', wordIdx: 45 },
    { label: 'إدارة وجرد المخزون', wordIdx: 46 },
    { label: 'القوائم والتقارير المالية', wordIdx: 48 },
  ];

  return (
    <div style={wrap}>
      <div style={{ ...baseCardStyle, width: orientation === 'vertical' ? '92%' : '76%', padding: 38 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 26, color: COLORS.cyan, fontWeight: 700 }}>بيانات شركة تدريبية متكاملة</div>
            <div style={{ fontSize: 36, color: COLORS.white, fontWeight: 900 }}>تطبيق عملي بيدك</div>
          </div>
          <div style={{ background: 'rgba(0,229,255,0.15)', border: `2px solid ${COLORS.cyan}`, borderRadius: 20, padding: '12px 28px', fontSize: 56, fontWeight: 900, color: COLORS.cyan, boxSizing: 'border-box' }}>
            +{count} عملية
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((it, idx) => {
            const active = frame >= getWordFrame(it.wordIdx, fps);
            return (
              <div
                key={idx}
                style={{
                  boxSizing: 'border-box',
                  padding: '18px 24px',
                  borderRadius: 16,
                  background: active ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active ? COLORS.success : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.white,
                }}
              >
                <span>{it.label}</span>
                <IconCheck color={active ? COLORS.success : COLORS.textMuted} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 6. مشهد الأركان الأربعة
export const Hero6FourPillars: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillars = [
    { title: 'Microsoft Excel', sub: 'نماذج وجداول احترافية', word: 55, color: '#10B981' },
    { title: 'أنظمة محاسبية ERP', sub: 'تطبيق على برامج فعلية', word: 56, color: '#00E5FF' },
    { title: 'تحليل مالي', sub: 'مؤشرات وقراءة القوائم', word: 58, color: '#F59E0B' },
    { title: 'ذكاء اصطناعي AI', sub: 'أتمتة وتسريع المهام', word: 60, color: '#A855F7' },
  ];

  return (
    <div style={wrap}>
      <div
        style={{
          width: orientation === 'vertical' ? '92%' : '78%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          boxSizing: 'border-box',
        }}
      >
        {pillars.map((p, i) => {
          const isLit = frame >= getWordFrame(p.word, fps);
          return (
            <div
              key={i}
              style={{
                ...baseCardStyle,
                padding: 28,
                border: `2px solid ${isLit ? p.color : 'rgba(255,255,255,0.12)'}`,
                boxShadow: isLit ? `0 0 35px ${p.color}44` : 'none',
                transform: `scale(${isLit ? 1.02 : 0.96})`,
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 900, color: isLit ? p.color : COLORS.white, marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 22, color: COLORS.textMuted }}>{p.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 7. مشهد اللقاءات الأسبوعية
export const Hero7Mentorship: React.FC<HeroProps> = ({ orientation }) => {
  return (
    <div style={wrap}>
      <div style={{ ...baseCardStyle, width: orientation === 'vertical' ? '90%' : '72%', padding: 40 }}>
        <div style={{ fontSize: 38, fontWeight: 900, color: COLORS.cyan, marginBottom: 24 }}>لقاءات أسبوعية مباشرة ومتابعة مستمرة</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          {['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'].map((w, idx) => (
            <div
              key={idx}
              style={{
                boxSizing: 'border-box',
                flex: 1,
                padding: '22px 12px',
                borderRadius: 16,
                background: 'rgba(0, 229, 255, 0.12)',
                border: `1px solid ${COLORS.cyan}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.white, marginBottom: 8 }}>{w}</div>
              <div style={{ fontSize: 18, color: COLORS.cyan }}>مراجعة وتوجيه ✓</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 8. مشهد المقابلة الوظيفية
export const Hero8Interview: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const showPortfolio = frame >= getWordFrame(72, fps);

  return (
    <div style={wrap}>
      <div style={{ ...baseCardStyle, width: orientation === 'vertical' ? '90%' : '72%', padding: 40, borderColor: showPortfolio ? COLORS.success : COLORS.cyan }}>
        <div style={{ fontSize: 26, color: COLORS.textMuted, marginBottom: 12 }}>لجنة المقابلة الشخصية</div>
        <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.white, marginBottom: 24 }}>
          &ldquo;عندي تدريب عملي.. وهذه أعمالي!&rdquo;
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ boxSizing: 'border-box', flex: 1, padding: 20, borderRadius: 16, background: 'rgba(16,185,129,0.18)', border: `1px solid ${COLORS.success}`, color: COLORS.white, fontSize: 24, fontWeight: 700 }}>
            ✓ حقيبة تقارير مالية مكتملة
          </div>
          <div style={{ boxSizing: 'border-box', flex: 1, padding: 20, borderRadius: 16, background: 'rgba(16,185,129,0.18)', border: `1px solid ${COLORS.success}`, color: COLORS.white, fontSize: 24, fontWeight: 700 }}>
            ✓ مطابقة حسابات فعلية
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. مشهد الخاتمة
export const Hero9CTA: React.FC<HeroProps> = ({ orientation }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.25) * 0.035;

  return (
    <div style={wrap}>
      <div
        style={{
          ...baseCardStyle,
          width: orientation === 'vertical' ? '92%' : '74%',
          padding: 46,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <WhiteLogoCard size="lg" />
        <div style={{ fontSize: 44, fontWeight: 900, color: COLORS.white }}>شركة كاملة.. وأنت محاسبها</div>
        <div
          style={{
            boxSizing: 'border-box',
            transform: `scale(${pulse})`,
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.teal})`,
            color: '#031024',
            fontSize: 36,
            fontWeight: 900,
            padding: '18px 48px',
            borderRadius: 999,
            boxShadow: `0 12px 35px rgba(0, 229, 255, 0.45)`,
          }}
        >
          استكشف البرنامج وسجّل الآن
        </div>
      </div>
    </div>
  );
};
