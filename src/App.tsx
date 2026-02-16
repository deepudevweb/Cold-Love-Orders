import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { seedProducts } from '@/data/products';

type Page = 'home' | 'products' | 'checkout' | 'about' | 'contact';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Seed products on app load
  useEffect(() => {
    seedProducts();
  }, []);

  // Handle navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage />;
      case 'checkout':
        return <CheckoutPage onBack={() => setCurrentPage('products')} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
