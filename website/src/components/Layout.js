import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
  return (
    <div className="site-shell min-h-screen flex flex-col">
      <Header />
      <main className="site-main flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
