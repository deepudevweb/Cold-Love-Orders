import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', id: 'products' },
      { name: 'New Arrivals', id: 'products' },
      { name: 'Best Sellers', id: 'products' },
      { name: 'Gift Cards', id: 'products' },
    ],
    company: [
      { name: 'About Us', id: 'about' },
      { name: 'Contact', id: 'contact' },
      { name: 'Careers', id: 'about' },
      { name: 'Press', id: 'about' },
    ],
    support: [
      { name: 'FAQ', id: 'contact' },
      { name: 'Shipping', id: 'contact' },
      { name: 'Returns', id: 'contact' },
      { name: 'Track Order', id: 'contact' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img 
              src="https://ik.imagekit.io/deepu0090/Cold%20Love_Logo%20mockup_Horizontal_with%20ice%20cream_black%20(1).png" 
              alt="Cold Love Ice Cream"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Premium artisanal ice cream crafted with love. Experience the perfect 
              blend of natural ingredients and delightful flavors.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FF6B9D] hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-600 hover:text-[#FF6B9D] transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-600 hover:text-[#FF6B9D] transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-600 hover:text-[#FF6B9D] transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © {currentYear} Cold Love Ice Cream. Made with{' '}
            <Heart className="w-4 h-4 text-[#FF6B9D] fill-[#FF6B9D]" /> in India
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <button className="hover:text-[#FF6B9D] transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-[#FF6B9D] transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
