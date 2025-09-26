import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    products: [
      { name: 'Bengali Sweets', href: '/sweets?category=bengali' },
      { name: 'Punjabi Sweets', href: '/sweets?category=punjabi' },
      { name: 'South Indian', href: '/sweets?category=south-indian' },
      { name: 'Premium Collection', href: '/sweets?category=fusion' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
  };

  return (
    <footer className="footer">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white">Mithai Mahal</span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Bringing you the authentic taste of traditional Indian sweets, crafted with love and the finest ingredients since 1985.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@mithaimahal.com</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Sweet Street, Delhi, India 110001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} Mithai Mahal. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;