import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <section className="section-spacing">
        <div className="section-container">
          <div className="section-panel mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-3xl font-bold text-white shadow-[0_20px_45px_rgba(33,150,243,0.24)]">
              404
            </div>
            <h1 className="heading-section mb-4">Oops! Page not found</h1>
            <p className="body-large mx-auto max-w-xl">The page you are looking for is unavailable or may have moved.</p>
            <div className="mt-8">
              <Link href="/" className="button-primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
