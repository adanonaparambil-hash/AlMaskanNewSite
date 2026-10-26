'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Img } from '@/lib/images';
import { useI18n } from '@/i18n/client';

/**
 * Click-to-load YouTube player. The original site embeds this film; we do not download or re-host it.
 * Nothing is requested from YouTube until the visitor presses play (privacy + performance).
 */
export default function VideoFacade({ id, title, poster }: { id: string; title: string; poster: Img }) {
  const { ui } = useI18n();
  const [playing, setPlaying] = useState(false);
  return (
    <div className="video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video__play" onClick={() => setPlaying(true)} aria-label={ui.video.aria(title)}>
          <span className="media">
            <span className="media__inner">
              <Image src={poster.src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" style={{ objectFit: 'cover' }} />
            </span>
          </span>
          <span className="video__btn"><i aria-hidden="true" />{ui.video.play}</span>
        </button>
      )}
    </div>
  );
}
