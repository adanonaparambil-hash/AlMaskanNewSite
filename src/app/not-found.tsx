import { Button, Eyebrow } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="notfound">
      <div>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="display display--xl" data-reveal="chars">This page has <em>moved on</em></h1>
        <p className="lead" style={{ margin: '24px auto 36px' }}>We could not find what you were looking for. Try the home page or get in touch.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button href="/">Back to home</Button>
          <Button href="/contact-us" variant="line">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
