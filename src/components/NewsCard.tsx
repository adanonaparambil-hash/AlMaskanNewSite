import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/news';
import { formatDate } from '@/lib/news';
import { Arrow, cx } from './ui';

export default function NewsCard({ a, feature, priority }: { a: Article; feature?: boolean; priority?: boolean }) {
  return (
    <article className={cx('card', feature && 'card--feature')} data-stagger-item data-tilt="4" data-cursor="Read">
      {a.image && (
        <div className="media">
          <div className="media__inner">
            <Image
              src={a.image.src}
              alt=""
              fill
              sizes={feature ? '(min-width: 960px) 40vw, 100vw' : '(min-width: 960px) 30vw, (min-width: 620px) 45vw, 100vw'}
              priority={priority}
              quality={75}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gap: 14 }}>
        <time className="card__date" dateTime={a.date}>{formatDate(a.date)}</time>
        <h3>{a.title}</h3>
        <p>{a.excerpt}</p>
        <span className="more">Read more <Arrow /></span>
      </div>
      <Link className="card__link" href={`/news/${a.slug}`} aria-label={`${a.title} — read article`} />
    </article>
  );
}
