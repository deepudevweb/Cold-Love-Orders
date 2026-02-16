import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface HeaderProps {
  onCartClick: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onCartClick, onNavigate, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img 
              src="https://ik.imagekit.io/deepu0090/Cold%20Love_Logo%20mockup_Horizontal_with%20ice%20cream_black%20(1).png" 
              alt="Cold Love Ice Cream"
              className="h-20 w-auto object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'text-[#FF6B9D]'
                    : 'text-gray-700 hover:text-[#FF6B9D]'
                }`}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCartClick}
              className="relative p-2 rounded-full bg-[#FF6B9D]/10 hover:bg-[#FF6B9D]/20 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-[#FF6B9D]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B9D] text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-3 px-4 rounded-xl transition-colors ${
                    currentPage === link.id
                      ? 'bg-[#FF6B9D]/10 text-[#FF6B9D]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
