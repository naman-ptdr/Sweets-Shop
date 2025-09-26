import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Heart, ArrowLeft, Mail, Lock, User, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.name, formData.email, formData.password, formData.role);
      }

      if (result.success) {
        setSuccess(isLogin ? 'Login successful! Redirecting...' : 'Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setErrors({});
    setFormData({ name: '', email: '', password: '', role: 'user' });
  };

  const fillDemoCredentials = (type) => {
    if (type === 'admin') {
      setFormData({ ...formData, email: 'admin@test.com', password: 'admin123' });
    } else {
      setFormData({ ...formData, email: 'user@test.com', password: 'user123' });
    }
    setError('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-primary rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-secondary hover:text-primary transition-all duration-300 mb-8 font-medium group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl relative">
              <Heart className="w-8 h-8 text-white" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <span className="font-display text-3xl font-bold text-gradient">Mithai Mahal</span>
          </Link>
        </div>

        <div className="card shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2 text-gradient">
                {isLogin ? 'Welcome Back!' : 'Join Our Sweet Family'}
              </h1>
              <p className="text-secondary text-lg">
                {isLogin 
                  ? 'Sign in to continue your sweet journey'
                  : 'Create an account to start exploring delicious treats'
                }
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in-up">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">{success}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-fade-in-up">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="animate-fade-in-up">
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all duration-300 ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-primary/50'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all duration-300 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-primary/50'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all duration-300 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-primary/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-colors p-1 rounded-lg hover:bg-gray-100"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div className="animate-fade-in-up">
                  <label htmlFor="role" className="block text-sm font-semibold text-primary mb-2">
                    Account Type
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg bg-white hover:border-primary/50 transition-all duration-300"
                  >
                    <option value="user">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full btn btn-primary btn-lg text-lg font-bold py-4 mt-8 relative overflow-hidden group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Please wait...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="mt-8 text-center">
              <p className="text-secondary mb-2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={switchMode}
                className="text-primary font-bold text-lg hover:underline transition-all duration-300 hover:scale-105 inline-block"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Try Demo Accounts:
              </h4>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('admin')}
                  className="w-full p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md group"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="font-semibold text-amber-800">Admin Account</p>
                      <p className="text-sm text-amber-600">admin@test.com</p>
                    </div>
                    <div className="text-xs text-amber-600 group-hover:text-amber-800 transition-colors">
                      Click to fill
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('user')}
                  className="w-full p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-md group"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="font-semibold text-amber-800">Customer Account</p>
                      <p className="text-sm text-amber-600">user@test.com</p>
                    </div>
                    <div className="text-xs text-amber-600 group-hover:text-amber-800 transition-colors">
                      Click to fill
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;