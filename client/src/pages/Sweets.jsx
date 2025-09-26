import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Star, AlertCircle, Filter, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/api.js';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

// Import sweet images
import rasagullaImage from '@/assets/rasgulla.jpg';
import gulabJamunImage from '@/assets/gulab-jamun.jpg';
import laddooImage from '@/assets/laddoo.jpg';
import kajuKatliImage from '@/assets/kaju-katli.jpg';
import mysorePakImage from '@/assets/mysore-pak.jpg';
import modakImage from '@/assets/modak.jpg';
import ghewarImage from '@/assets/ghewar.jpg';

const Sweets = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchaseLoading, setPurchaseLoading] = useState({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  // Image mapping for sweets
  const imageMap = {
    'rasgulla': rasagullaImage,
    'gulab jamun': gulabJamunImage,
    'motichoor laddoo': laddooImage,
    'laddoo': laddooImage,
    'kaju katli': kajuKatliImage,
    'mysore pak': mysorePakImage,
    'modak': modakImage,
    'ghewar': ghewarImage,
    'sandesh': rasagullaImage
  };

  const getImageForSweet = (sweetName) => {
    const name = sweetName.toLowerCase();
    return imageMap[name] || rasagullaImage;
  };

  // Fetch sweets from API
  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const data = await api.get('/sweets');
      setSweets(data || []);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      setError('Failed to load sweets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock sweet data for fallback
  const mockSweets = [
    {
      id: '1',
      name: 'Rasgulla',
      price: 450,
      originalPrice: 500,
      image: rasagullaImage,
      category: 'bengali',
      description: 'Soft and spongy cottage cheese balls in sweet syrup',
      rating: 4.8,
      reviews: 124,
      isPopular: true
    },
    {
      id: '2',
      name: 'Gulab Jamun',
      price: 380,
      originalPrice: 420,
      image: gulabJamunImage,
      category: 'punjabi',
      description: 'Deep-fried milk solids in aromatic sugar syrup',
      rating: 4.9,
      reviews: 89,
      isPopular: true
    },
    {
      id: '3',
      name: 'Motichoor Laddoo',
      price: 520,
      image: laddooImage,
      category: 'rajasthani',
      description: 'Delicate gram flour pearls shaped into golden balls',
      rating: 4.7,
      reviews: 67
    },
    {
      id: '4',
      name: 'Kaju Katli',
      price: 890,
      image: kajuKatliImage,
      category: 'fusion',
      description: 'Premium cashew fudge with silver foil',
      rating: 4.9,
      reviews: 156,
      isPremium: true
    },
    {
      id: '5',
      name: 'Mysore Pak',
      price: 650,
      image: mysorePakImage,
      category: 'south-indian',
      description: 'Traditional ghee-rich South Indian sweet',
      rating: 4.6,
      reviews: 43
    },
    {
      id: '6',
      name: 'Modak',
      price: 320,
      image: modakImage,
      category: 'maharashtrian',
      description: 'Steamed rice flour dumplings with coconut jaggery',
      rating: 4.5,
      reviews: 32
    },
    {
      id: '7',
      name: 'Ghewar',
      price: 750,
      image: ghewarImage,
      category: 'rajasthani',
      description: 'Honeycomb-textured festive sweet with dry fruits',
      rating: 4.8,
      reviews: 78,
      isFestive: true
    },
    {
      id: '8',
      name: 'Sandesh',
      price: 420,
      image: rasagullaImage,
      category: 'bengali',
      description: 'Delicate cottage cheese sweet with cardamom',
      rating: 4.7,
      reviews: 91
    },
  ];

  const categories = useMemo(() => {
    const allCategories = sweets.map(s => s.category);
    const uniqueCategories = [...new Set(allCategories)];
    
    return [
      { id: 'all', name: 'All Sweets', count: sweets.length },
      ...uniqueCategories.map(cat => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: sweets.filter(s => s.category === cat).length
      }))
    ];
  }, [sweets]);

  const filteredSweets = useMemo(() => {
    return sweets.filter((sweet) => {
      const matchesCategory = selectedCategory === 'all' || sweet.category === selectedCategory;
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sweet.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = (!priceRange.min || sweet.price >= parseInt(priceRange.min)) &&
                          (!priceRange.max || sweet.price <= parseInt(priceRange.max));
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [sweets, searchQuery, selectedCategory, priceRange]);

  const handlePurchase = async (sweetId) => {
    if (!isAuthenticated) {
      alert('Please login to purchase sweets');
      return;
    }

    try {
      setPurchaseLoading(prev => ({ ...prev, [sweetId]: true }));
      await api.post(`/sweets/${sweetId}/purchase`);
      
      // Update local state
      setSweets(prev => prev.map(sweet => 
        sweet._id === sweetId 
          ? { ...sweet, quantityInStock: Math.max(0, sweet.quantityInStock - 1) }
          : sweet
      ));
      
      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase error:', error);
      alert(error.data?.message || 'Purchase failed. Please try again.');
    } finally {
      setPurchaseLoading(prev => ({ ...prev, [sweetId]: false }));
    }
  };

  const handleToggleWishlist = (id) => {
    console.log('Added to wishlist:', id);
  };

  const handleAddToCart = (sweet) => {
    addToCart(sweet, 1);
    alert(`Added ${sweet.name} to cart!`);
  };

  const searchSweets = async () => {
    if (!searchQuery && selectedCategory === 'all' && !priceRange.min && !priceRange.max) {
      fetchSweets();
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('name', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (priceRange.min) params.append('minPrice', priceRange.min);
      if (priceRange.max) params.append('maxPrice', priceRange.max);
      
      const data = await api.get(`/sweets/search?${params.toString()}`);
      setSweets(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery || selectedCategory !== 'all' || priceRange.min || priceRange.max) {
        searchSweets();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Our Sweet Collection
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover authentic Indian sweets made with traditional recipes and the finest ingredients
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white py-8 border-b border-light">
        <div className="container">
          <div className="flex flex-col gap-6">
            {/* Search and Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sweets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Filters */}
            <div className={`space-y-4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 text-secondary hover:bg-gray-200'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">Price Range</h3>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min price"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <span className="text-secondary">to</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max price"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setPriceRange({ min: '', max: '' })}
                    className="px-3 py-2 text-sm text-secondary hover:text-primary transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-secondary">
              <span>Showing {filteredSweets.length} of {sweets.length} sweets</span>
              {(searchQuery || selectedCategory !== 'all' || priceRange.min || priceRange.max) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange({ min: '', max: '' });
                    fetchSweets();
                  }}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sweet Grid */}
      <section className="section bg-white">
        <div className="container">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary">Loading delicious sweets...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-red-600">Error Loading Sweets</h3>
              <p className="text-secondary mb-4">{error}</p>
              <button onClick={fetchSweets} className="btn btn-primary">
                Try Again
              </button>
            </div>
          ) : filteredSweets.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🍯</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">No sweets found</h3>
              <p className="text-secondary">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSweets.map((sweet, index) => (
                <div
                  key={sweet._id}
                  className="card group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={getImageForSweet(sweet.name)}
                      alt={sweet.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
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
                          Low Stock ({sweet.quantityInStock})
                        </span>
                      ) : (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          In Stock ({sweet.quantityInStock})
                        </span>
                      )}
                    </div>
                    
                    {/* Wishlist */}
                    <button
                      onClick={() => handleToggleWishlist(sweet._id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleAddToCart(sweet)}
                        disabled={sweet.quantityInStock === 0}
                        className="flex-1 bg-white text-primary py-2 rounded-lg font-semibold hover:bg-gray-50 disabled:bg-gray-400 disabled:cursor-not-allowed border border-primary"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handlePurchase(sweet._id)}
                        disabled={sweet.quantityInStock === 0 || purchaseLoading[sweet._id]}
                        className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {purchaseLoading[sweet._id] ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Buying...
                          </div>
                        ) : sweet.quantityInStock === 0 ? (
                          'Sold Out'
                        ) : (
                          'Buy Now'
                        )}
                      </button>
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
                          className="btn border border-primary text-primary hover:bg-primary hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex-1"
                        >
                          Add to Cart
                        </button>
                        <Link to={`/sweets/${sweet._id}`} className="btn btn-primary flex-1 text-center">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sweets;