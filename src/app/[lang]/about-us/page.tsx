import type { Metadata } from 'next';
import { Marquee } from '@/components/fx';
import { ContactBand } from '@/components/Footer';
import { Button, Eyebrow, Fact, Heading, Media, PageHero } from '@/components/ui';
import { alternatesFor } from '@/i18n/config';
import { getContent } from '@/i18n/server';
import { img } from '@/lib/images';

const en = {
  metaTitle: 'About us',
  metaDescription:
    'Al Maskaan Village is a community-oriented worker accommodation development in Khazaen Economic City. Our purpose, vision, mission, values, facts and figures, and the Adrak Group management team.',
  eyebrow: 'About us',
  heroTitle: <>Beyond <em>accommodation</em></>,
  heroLead: 'We believe everyone deserves a place to call home — a space that feels safe, comfortable and truly welcoming.',
  standEyebrow: 'What we stand for',
  standTitle: <>A home-away-from-home <em>community</em></>,
  standText:
    'At Al Maskaan Village, we believe everyone deserves a place to call home — a space that feels safe, comfortable and truly welcoming. We are passionate about crafting communities where diversity thrives and everyone feels a sense of belonging. We are also committed to shaping the future of accommodation, starting right now. Every detail is crafted with our residents’ comfort and satisfaction in mind, so their experience at Al Maskaan Village is nothing short of exceptional.',
  pillarsLabel: 'Purpose, vision and mission',
  purpose: 'Purpose',
  vision: 'Vision',
  mission: 'Mission',
  factsEyebrow: 'Facts and figures',
  factsTitle: <>What you need to <em>know</em></>,
  factsFine: 'Figures as published by Al Maskaan Village.',
  marquee: ['Quality', 'Sustainability', 'Empathy', 'Purpose', 'Vision', 'Mission'],
  valuesEyebrow: 'Values',
  valuesTitle: <>Quality, sustainability, <em>empathy</em></>,
  apartEyebrow: 'What sets us apart',
  apartTitle: <>Forward-thinking, inclusive, <em>committed</em></>,
  apartList: 'What sets us apart',
  committedList: 'We are committed to',
  teamEyebrow: 'Seasoned experts',
  teamTitle: <>Management <em>team</em></>,
  storyEyebrow: 'Our story',
  storyTitle: <>From a winning pitch to a <em>village</em></>,
  newsButton: 'Read the latest news',
};
const ar: typeof en = {
  metaTitle: 'من نحن',
  metaDescription:
    'قرية المسكن مشروع سكني للعاملين يتمحور حول المجتمع في مدينة خزائن الاقتصادية. تعرّف على غايتنا ورؤيتنا ورسالتنا وقيمنا، وعلى الحقائق والأرقام، وفريق الإدارة في مجموعة أدرك.',
  eyebrow: 'من نحن',
  heroTitle: <>ما هو أبعد من <em>السكن</em></>,
  heroLead: 'نؤمن بأن لكل إنسان الحق في مكان يسمّيه بيته — مساحة يشعر فيها بالأمان والراحة والترحيب الحقيقي.',
  standEyebrow: 'ما نؤمن به',
  standTitle: <>مجتمعٌ هو <em>بيتك الثاني</em></>,
  standText:
    'في قرية المسكن، نؤمن بأن لكل إنسان الحق في مكان يسمّيه بيته — مساحة يشعر فيها بالأمان والراحة والترحيب الحقيقي. نحن شغوفون ببناء مجتمعات يزدهر فيها التنوّع ويشعر فيها الجميع بالانتماء. كما نلتزم بصياغة مستقبل السكن، بدءاً من اليوم. كل تفصيل مصمَّم مع مراعاة راحة المقيمين لدينا ورضاهم، لتكون تجربتهم في قرية المسكن استثنائية بكل معنى الكلمة.',
  pillarsLabel: 'الغاية والرؤية والرسالة',
  purpose: 'الغاية',
  vision: 'الرؤية',
  mission: 'الرسالة',
  factsEyebrow: 'حقائق وأرقام',
  factsTitle: <>ما تحتاج إلى <em>معرفته</em></>,
  factsFine: 'الأرقام كما نشرتها قرية المسكن.',
  marquee: ['الجودة', 'الاستدامة', 'التعاطف', 'الغاية', 'الرؤية', 'الرسالة'],
  valuesEyebrow: 'القيم',
  valuesTitle: <>الجودة، الاستدامة، <em>التعاطف</em></>,
  apartEyebrow: 'ما يميّزنا',
  apartTitle: <>استشرافٌ للمستقبل، وشمولٌ للجميع، <em>والتزامٌ راسخ</em></>,
  apartList: 'ما يميّزنا',
  committedList: 'نلتزم بـ',
  teamEyebrow: 'خبراء متمرّسون',
  teamTitle: <>فريق <em>الإدارة</em></>,
  storyEyebrow: 'قصتنا',
  storyTitle: <>من عرضٍ فائز إلى <em>قرية</em></>,
  newsButton: 'اقرأ آخر الأخبار',
};
const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/about-us', locale) };
}

export default async function AboutPage() {
  const c = await getContent();
  const t = COPY[c.locale];
  return (
    <>
      <PageHero fx="chars" glow="var(--glow-amber)"
        eyebrow={t.eyebrow}
        title={t.heroTitle}
        lead={t.heroLead}
        image={img('hero.courtyard')}
        crumbs={[{ label: c.ui.home, href: '/' }, { label: t.eyebrow }]}
      />

      <section className="section--tight section" aria-labelledby="stand-title">
        <div className="container cols-2">
          <div>
            <Eyebrow>{t.standEyebrow}</Eyebrow>
            <h2 id="stand-title" className="display display--lg" data-reveal="blur">{t.standTitle}</h2>
          </div>
          <div className="prose" data-reveal="fade">
            <p>
              {t.standText}
            </p>
          </div>
        </div>
      </section>

      <section className="section--tight section" aria-label={t.pillarsLabel}>
        <div className="container">
          <div className="pillars" data-stagger="0.12">
            {[
              [t.purpose, c.about.purpose],
              [t.vision, c.about.vision],
              [t.mission, c.about.mission],
            ].map(([label, p]) => (
              <div key={label} data-stagger-item><span className="tag">{label}</span><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="facts-title">
        <div className="container">
          <Eyebrow>{t.factsEyebrow}</Eyebrow>
          <Heading as="h2" className="display--lg" fx="scale" id="facts-title">{t.factsTitle}</Heading>
          <div className="facts" style={{ marginTop: 'clamp(32px, 5vw, 64px)' }} data-stagger="0.08">
            {c.facts.map((f) => <Fact key={f.label} {...f} />)}
          </div>
          <p className="fine">{t.factsFine}</p>
        </div>
      </section>

      <Marquee outline speed={0.8} items={t.marquee} />

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <Eyebrow>{t.valuesEyebrow}</Eyebrow>
          <Heading as="h2" className="display--lg" fx="chars" id="values-title">{t.valuesTitle}</Heading>
          <div className="values" style={{ marginTop: 'clamp(32px, 5vw, 64px)' }} data-stagger="0.12">
            {c.about.values.map((v) => (
              <div key={v.name} data-stagger-item><h3>{v.name}</h3><p>{v.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="apart-title">
        <div className="container grid-12" style={{ alignItems: 'start' }}>
          <div style={{ gridColumn: '1 / span 5' }}>
            <Eyebrow>{t.apartEyebrow}</Eyebrow>
            <h2 id="apart-title" className="display display--lg" data-reveal="blur">{t.apartTitle}</h2>
            <Media k="life.garden" ratio="4 / 3" sizes="(min-width: 900px) 40vw, 100vw" reveal parallax={0.06} className="" style={{ marginTop: 40 }} />
          </div>
          <div style={{ gridColumn: '7 / span 6', display: 'grid', gap: 48 }}>
            <div>
              <h3 className="eyebrow">{t.apartList}</h3>
              <ul className="checks" data-stagger="0.08">
                {c.about.apart.map((a) => <li key={a.label} data-stagger-item><span><b>{a.label}</b><span>{a.text}</span></span></li>)}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">{t.committedList}</h3>
              <ul className="checks" data-stagger="0.08">
                {c.about.committed.map((a) => <li key={a.label} data-stagger-item><span><b>{a.label}</b><span>{a.text}</span></span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <Eyebrow>{t.teamEyebrow}</Eyebrow>
          <Heading as="h2" className="display--lg" fx="chars" id="team-title">{t.teamTitle}</Heading>
          <div className="team" style={{ marginTop: 'clamp(40px, 5vw, 80px)' }}>
            {c.about.team.map((m, i) => (
              <article key={m.name} className={i === 0 ? 'member member--lead' : 'member'}>
                {/* the founder's portrait fills the height of his card; the others keep the portrait frame */}
                <Media k={m.image} ratio={i === 0 ? undefined : '4 / 5'} sizes={i === 0 ? '(min-width: 1000px) 32vw, 100vw' : '(min-width: 1000px) 28vw, 50vw'} position="50% 18%" reveal />
                <div>
                  <h3>{m.name}</h3>
                  <p className="role">{m.role}</p>
                  {m.bio.map((p) => <p key={p}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="story-title">
        <div className="container story">
          <div className="story__head">
            <Eyebrow>{t.storyEyebrow}</Eyebrow>
            <h2 id="story-title" className="display display--lg" data-reveal="lines">{t.storyTitle}</h2>
            <div style={{ marginTop: 32 }} data-reveal="fade"><Button href="/news" variant="line">{t.newsButton}</Button></div>
          </div>
          <ol className="timeline" data-timeline>
            <li className="timeline__rail" aria-hidden="true"><div className="timeline__line" data-timeline-line /></li>
            {c.story.map((s, i) => (
              <li key={i} className="tl-item" data-timeline-item>
                <p className="tl-item__year">{s.year}</p>
                <p className="tl-item__title">{s.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
