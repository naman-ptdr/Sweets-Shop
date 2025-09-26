import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart, User, LogOut, Shield, Bell, Search, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Sweets', href: '/sweets', icon: '🍯' },
    { name: 'Our Story', href: '/story', icon: '📖' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-amber-100' 
          : 'bg-white/90 backdrop-blur-md shadow-lg'
      }`}>
        <div className="container">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative">
              <div className={`relative transition-all duration-300 ${
                isScrolled ? 'w-12 h-12' : 'w-14 h-14'
              } bg-gradient-to-br from-primary via-primary-dark to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 shadow-xl group-hover:shadow-2xl`}>
                <Heart className={`${isScrolled ? 'w-6 h-6' : 'w-7 h-7'} text-white transition-all duration-300`} />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="flex flex-col">
                <span className={`font-display font-bold text-gradient transition-all duration-300 ${
                  isScrolled ? 'text-xl' : 'text-2xl'
                }`}>Mithai Mahal</span>
                <span className="text-xs text-secondary font-medium -mt-1">Sweet Traditions</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center gap-2 font-semibold transition-all duration-300 px-4 py-2.5 rounded-xl group ${
                    isActive(item.href)
                      ? 'text-primary bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                      : 'text-secondary hover:text-primary hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-amber-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button className="hidden md:flex p-2.5 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105 group">
                <Search className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
              </button>

              {/* Notifications */}
              {isAuthenticated && (
                <button className="relative p-2.5 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105 group">
                  <Bell className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                    2
                  </span>
                </button>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative p-2.5 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105 group">
                <ShoppingCart className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-primary-dark text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="relative w-10 h-10 bg-gradient-to-br from-primary via-primary-dark to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <User className="w-5 h-5 text-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-bold text-primary">{user?.name}</p>
                      <p className="text-xs text-secondary -mt-0.5">{user?.role}</p>
                    </div>
                  </button>

                  {/* Enhanced User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-lg border border-amber-100 rounded-2xl shadow-2xl py-3 z-50 animate-fade-in-up">
                      {/* User Info Header */}
                      <div className="px-5 py-4 border-b border-amber-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{user?.name}</p>
                            <p className="text-sm text-secondary">{user?.email}</p>
                            {user?.role === 'admin' && (
                              <span className="inline-flex items-center px-2 py-1 mt-1 text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full font-medium">
                                <Shield className="w-3 h-3 mr-1" />
                                Administrator
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-5 py-3 text-sm hover:bg-amber-50 transition-colors font-medium group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3 text-gray-500 group-hover:text-primary transition-colors" />
                          My Profile
                        </Link>
                        
                        <Link
                          to="/orders"
                          className="flex items-center px-5 py-3 text-sm hover:bg-amber-50 transition-colors font-medium group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-3 text-gray-500 group-hover:text-primary transition-colors" />
                          My Orders
                        </Link>

                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="flex items-center px-5 py-3 text-sm hover:bg-blue-50 transition-colors font-medium group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Shield className="w-4 h-4 mr-3 text-blue-600" />
                            Admin Dashboard
                          </Link>
                        )}
                        
                        <hr className="my-2 border-amber-100" />
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-5 py-3 text-sm hover:bg-red-50 transition-colors text-red-600 font-medium group"
                        >
                          <LogOut className="w-4 h-4 mr-3 group-hover:translate-x-1 transition-transform" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth" className="btn btn-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                {isMenuOpen ? 
                  <X className="w-6 h-6 text-secondary" /> : 
                  <Menu className="w-6 h-6 text-secondary" />
                }
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-amber-100 animate-fade-in-up">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 py-3 px-4 font-semibold transition-all duration-300 rounded-xl ${
                      isActive(item.href)
                        ? 'text-primary bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                        : 'text-secondary hover:text-primary hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {!isAuthenticated && (
                <div className="mt-4 pt-4 border-t border-amber-100">
                  <Link 
                    to="/auth" 
                    className="btn btn-primary w-full justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
