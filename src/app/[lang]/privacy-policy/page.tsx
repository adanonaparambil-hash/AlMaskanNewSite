import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui';
import { alternatesFor } from '@/i18n/config';
import { getContent, type Content } from '@/i18n/server';

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: ReactNode;
  whoTitle: string;
  who: (s: Content['site']) => string;
  infoTitle: string;
  info: string[];
  cookiesTitle: string;
  cookies: string;
  videoTitle: string;
  video: string;
  choicesTitle: string;
  choices: (email: ReactNode, phone: ReactNode) => ReactNode;
};

const en: Copy = {
  metaTitle: 'Privacy policy',
  metaDescription: 'How this website handles the information you send us through the inquiry form.',
  eyebrow: 'Legal',
  title: <>Privacy <em>policy</em></>,
  whoTitle: 'Who we are',
  who: (s) => `This website is operated for ${s.name}, ${s.operator}, ${s.address.slice(2).join(', ')}.`,
  infoTitle: 'Information you send us',
  info: [
    'When you use the inquiry form we receive the details you enter — your name, email address, optional phone number and organisation, the topic you choose, your message and — for accommodation inquiries — the optional room type, number of residents and preferred move-in date. We use them only to reply to your query or complaint.',
    'Your message is delivered to our team by email. Please do not include sensitive personal information in the message.',
  ],
  cookiesTitle: 'Cookies and tracking',
  cookies: 'This website does not set advertising or analytics cookies. There are no user accounts on this website.',
  videoTitle: 'Embedded video',
  video: 'Our film is hosted on YouTube. Nothing is loaded from YouTube until you press play; once you do, YouTube’s own privacy practices apply to that player.',
  choicesTitle: 'Your choices',
  choices: (email, phone) => <>To ask what we hold about you, or to have your details deleted, email {email} or call {phone}.</>,
};

const ar: Copy = {
  metaTitle: 'سياسة الخصوصية',
  metaDescription: 'كيف يتعامل هذا الموقع مع المعلومات التي ترسلها إلينا عبر نموذج الاستفسار.',
  eyebrow: 'الشؤون القانونية',
  title: <>سياسة <em>الخصوصية</em></>,
  whoTitle: 'من نحن',
  who: (s) => `يُدار هذا الموقع لصالح ${s.name}، ${s.operator}، ${s.address.slice(2).join('، ')}.`,
  infoTitle: 'المعلومات التي ترسلها إلينا',
  info: [
    'عند استخدامك نموذج الاستفسار، نتلقى البيانات التي تُدخلها — اسمك وبريدك الإلكتروني، ورقم هاتفك واسم مؤسستك (اختيارياً)، والموضوع الذي تختاره، ورسالتك، وفي استفسارات السكن: نوع الغرفة وعدد المقيمين وتاريخ الانتقال المفضّل (اختيارياً). ولا نستخدمها إلا للرد على استفسارك أو شكواك.',
    'تُرسَل رسالتك إلى فريقنا عبر البريد الإلكتروني. يُرجى عدم تضمين أي معلومات شخصية حساسة في الرسالة.',
  ],
  cookiesTitle: 'ملفات تعريف الارتباط والتتبّع',
  cookies: 'لا يضع هذا الموقع ملفات تعريف ارتباط إعلانية أو تحليلية. ولا توجد حسابات مستخدمين على هذا الموقع.',
  videoTitle: 'الفيديو المُضمَّن',
  video: 'فيلمنا مستضاف على YouTube. لا يُحمَّل أي شيء من YouTube إلى أن تضغط على زر التشغيل؛ وبمجرد أن تفعل ذلك، تسري ممارسات الخصوصية الخاصة بـ YouTube على ذلك المشغّل.',
  choicesTitle: 'خياراتك',
  choices: (email, phone) => <>لمعرفة البيانات التي نحتفظ بها عنك، أو لطلب حذف بياناتك، راسلنا على {email} أو اتصل على {phone}.</>,
};
const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/privacy-policy', locale) };
}

// The original page was WordPress's unedited placeholder policy (comments, Gravatar, login cookies) and did not
// describe this business. This notice only describes what the new site actually does; see docs/reference-audit.md.
export default async function PrivacyPage() {
  const c = await getContent();
  const t = COPY[c.locale];
  const site = c.site;
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="display display--xl" data-reveal="blur">{t.title}</h1>
          </div>
        </div>
      </header>
      <section className="section--tight section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose-page">
            <h2>{t.whoTitle}</h2>
            <p>{t.who(site)}</p>
            <h2>{t.infoTitle}</h2>
            <p>
              {t.info[0]}
              {' '}{t.info[1]}
            </p>
            <h2>{t.cookiesTitle}</h2>
            <p>{t.cookies}</p>
            <h2>{t.videoTitle}</h2>
            <p>{t.video}</p>
            <h2>{t.choicesTitle}</h2>
            <p>
              {t.choices(
                <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a>,
                <a href={site.phones[0].href} dir="ltr">{site.phones[0].label}</a>,
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
