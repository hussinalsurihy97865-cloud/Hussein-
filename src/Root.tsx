import React from 'react';
import { Composition } from 'remotion';
import { Ad } from './Ad';
import { VIDEO_FPS, TOTAL_FRAMES } from './content';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Ad-Vertical"
        component={Ad}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={1080}
        height={1920}
        defaultProps={{ orientation: 'vertical' as const }}
      />
      <Composition
        id="Ad-Landscape"
        component={Ad}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{ orientation: 'landscape' as const }}
      />
    </>
  );
};
