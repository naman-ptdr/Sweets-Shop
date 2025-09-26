import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Truck, Clock, Star, Heart, ShoppingBag, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import api from '@/api.js';
import heroImage from '@/assets/hero-shop.jpg';
import rasagullaImage from '@/assets/rasgulla.jpg';
import gulabJamunImage from '@/assets/gulab-jamun.jpg';
import laddooImage from '@/assets/laddoo.jpg';
import kajuKatliImage from '@/assets/kaju-katli.jpg';
import ghewarImage from '@/assets/ghewar.jpg';
import modakImage from '@/assets/modak.jpg';

const Home = () => {
  const [featuredSweets, setFeaturedSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Image mapping for sweets
  const imageMap = {
    'rasgulla': rasagullaImage,
    'gulab jamun': gulabJamunImage,
    'motichoor laddoo': laddooImage,
    'laddoo': laddooImage,
    'kaju katli': kajuKatliImage,
    'mysore pak': rasagullaImage,
    'modak': modakImage,
    'ghewar': ghewarImage,
    'sandesh': rasagullaImage
  };

  const getImageForSweet = (sweetName) => {
    const name = sweetName.toLowerCase();
    return imageMap[name] || rasagullaImage;
  };

  useEffect(() => {
    fetchFeaturedSweets();
  }, []);

  const fetchFeaturedSweets = async () => {
    try {
      const data = await api.get('/sweets');
      // Get first 4 sweets as featured
      setFeaturedSweets((data || []).slice(0, 4));
    } catch (error) {
      console.error('Error fetching featured sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (sweet) => {
    addToCart(sweet, 1);
    alert(`Added ${sweet.name} to cart!`);
  };
  const categories = [
    {
      name: 'Bengali Sweets',
      description: 'Traditional rasgulla, sandesh, and mishti doi',
      image: rasagullaImage,
      href: '/sweets?category=bengali',
      color: 'from-rose-400 to-pink-500'
    },
    {
      name: 'Classic Favorites', 
      description: 'Gulab jamun, laddoo, and traditional delights',
      image: gulabJamunImage,
      href: '/sweets?category=all',
      color: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Premium Collection',
      description: 'Kaju katli, dry fruit sweets, and premium mithai',
      image: kajuKatliImage,
      href: '/sweets?category=fusion',
      color: 'from-yellow-400 to-amber-500'
    },
    {
      name: 'Festive Specials',
      description: 'Seasonal sweets for every celebration',
      image: ghewarImage,
      href: '/sweets',
      color: 'from-green-400 to-emerald-500'
    },
  ];

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Made with finest ingredients and traditional recipes',
      color: 'bg-gradient-to-br from-blue-50 to-indigo-100'
    },
    {
      icon: Truck,
      title: 'Fresh Delivery',
      description: 'Same day delivery for orders placed before 2 PM',
      color: 'bg-gradient-to-br from-green-50 to-emerald-100'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Order anytime, we are always here to serve you',
      color: 'bg-gradient-to-br from-purple-50 to-violet-100'
    },
    {
      icon: Sparkles,
      title: 'Authentic Taste',
      description: 'Traditional flavors passed down through generations',
      color: 'bg-gradient-to-br from-amber-50 to-yellow-100'
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'The best mithai in town! Fresh, authentic, and delivered on time.',
      rating: 5,
      image: '👩🏻💼'
    },
    {
      name: 'Rajesh Kumar',
      text: 'Amazing quality and taste. My family loves their Bengali sweets!',
      rating: 5,
      image: '👨🏻💼'
    },
    {
      name: 'Anita Patel',
      text: 'Perfect for festivals and celebrations. Highly recommended!',
      rating: 5,
      image: '👩🏻🦳'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Mithai Mahal Sweet Shop"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Premium Indian Sweets Since 1985</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient-x">
                Mithai Mahal
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-95 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Experience the sweetest traditions of India with our premium collection of authentic mithai, crafted with love and served with pride
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Link to="/sweets" className="btn btn-primary btn-lg group shadow-2xl hover:shadow-primary/25 transition-all duration-300">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Explore Sweets
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/story" className="btn bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white hover:text-primary btn-lg transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" />
                Our Story
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-red-400/20 rounded-full blur-xl animate-float" />
      </section>

      {/* Featured Sweets */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Featured Sweets
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Taste our most popular and beloved traditional Indian sweets
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary">Loading featured sweets...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredSweets.map((sweet, index) => (
                <div
                  key={sweet._id}
                  className="card group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <img
                      src={getImageForSweet(sweet.name)}
                      alt={sweet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Stock Badge */}
                    <div className="absolute top-4 left-4">
                      {sweet.quantityInStock === 0 ? (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          Out of Stock
                        </span>
                      ) : sweet.quantityInStock < 5 ? (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          In Stock
                        </span>
                      )}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleAddToCart(sweet)}
                        disabled={sweet.quantityInStock === 0}
                        className="flex-1 bg-white text-primary py-2 rounded-lg font-semibold hover:bg-gray-50 disabled:bg-gray-400 disabled:cursor-not-allowed border border-primary text-sm"
                      >
                        <ShoppingCart className="w-4 h-4 inline mr-1" />
                        Add to Cart
                      </button>
                      <Link
                        to={`/sweets/${sweet._id}`}
                        className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark text-center text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {sweet.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.{Math.floor(Math.random() * 9) + 1}</span>
                      </div>
                    </div>
                    
                    <Link to={`/sweets/${sweet._id}`}>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors hover:underline">
                        {sweet.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">₹{sweet.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(sweet)}
                          disabled={sweet.quantityInStock === 0}
                          className="btn border border-primary text-primary hover:bg-primary hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed text-sm px-3 py-1"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/sweets" className="btn btn-primary btn-lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              View All Sweets
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sweet Categories */}
      <section className="section bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Sweet Categories
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collection of traditional Indian sweets from different regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.href}
                className="card group animate-fade-in-up bg-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="text-secondary mb-4">{category.description}</p>
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform">
                    Explore Collection
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Why Choose Us?</h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">Experience the difference with our premium service and authentic taste</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`card text-center ${feature.color} border-0 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="card-body">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-secondary leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">What Our Customers Say</h2>
            <p className="text-xl text-secondary">Don't just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{testimonial.image}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary via-primary-dark to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Ready to Taste Heaven?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Join thousands of satisfied customers who trust us for their sweet celebrations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link to="/sweets" className="btn bg-white text-primary hover:bg-gray-100 btn-lg group shadow-xl">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary btn-lg transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Happy Customers', icon: Heart },
              { number: '50+', label: 'Sweet Varieties', icon: Sparkles },
              { number: '5★', label: 'Average Rating', icon: Star },
              { number: '24/7', label: 'Service Available', icon: Clock }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-secondary font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;