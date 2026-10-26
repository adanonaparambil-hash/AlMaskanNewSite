import { Button, Eyebrow } from '@/components/ui';
import { getContent } from '@/i18n/server';

const en = {
  eyebrow: 'Error 404',
  title: <>This page has <em>moved on</em></>,
  lead: 'We could not find what you were looking for. Try the home page or get in touch.',
  home: 'Back to home',
  contact: 'Contact us',
};
const ar: typeof en = {
  eyebrow: 'خطأ 404',
  title: <>هذه الصفحة <em>لم تعد هنا</em></>,
  lead: 'لم نتمكن من العثور على ما تبحث عنه. جرّب الصفحة الرئيسية أو تواصل معنا.',
  home: 'العودة إلى الرئيسية',
  contact: 'تواصل معنا',
};
const COPY = { en, ar };

export default async function NotFound() {
  const c = await getContent();
  const t = COPY[c.locale];
  return (
    <section className="notfound">
      <div>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="display display--xl" data-reveal="chars">{t.title}</h1>
        <p className="lead" style={{ margin: '24px auto 36px' }}>{t.lead}</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button href="/">{t.home}</Button>
          <Button href="/contact-us" variant="line">{t.contact}</Button>
        </div>
      </div>
    </section>
  );
}
