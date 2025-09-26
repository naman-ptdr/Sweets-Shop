import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus, Share2, AlertCircle } from 'lucide-react';
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

const SweetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sweet, setSweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
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

  useEffect(() => {
    fetchSweet();
  }, [id]);

  const fetchSweet = async () => {
    try {
      setLoading(true);
      const data = await api.get(`/sweets/${id}`);
      setSweet(data);
    } catch (error) {
      console.error('Error fetching sweet:', error);
      setError('Failed to load sweet details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    try {
      setPurchaseLoading(true);
      await api.post(`/sweets/${id}/purchase`);
      
      // Update local state
      setSweet(prev => ({
        ...prev,
        quantityInStock: Math.max(0, prev.quantityInStock - 1)
      }));
      
      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase error:', error);
      alert(error.data?.message || 'Purchase failed. Please try again.');
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!sweet) return;
    addToCart(sweet, quantity);
    alert(`Added ${quantity} ${sweet.name}(s) to cart!`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (sweet?.quantityInStock || 0)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading sweet details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !sweet) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-red-600">Error Loading Sweet</h3>
          <p className="text-secondary mb-4">{error || 'Sweet not found'}</p>
          <Link to="/sweets" className="btn btn-primary">
            Back to Sweets
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-secondary mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/sweets" className="hover:text-primary transition-colors">Sweets</Link>
            <span>/</span>
            <span className="text-primary font-medium">{sweet.name}</span>
          </div>
          <Link to="/sweets" className="inline-flex items-center text-secondary hover:text-primary transition-colors font-medium group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Sweets
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={getImageForSweet(sweet.name)}
                  alt={sweet.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute top-4 left-4">
                  {sweet.quantityInStock === 0 ? (
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                      Out of Stock
                    </span>
                  ) : sweet.quantityInStock < 5 ? (
                    <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                      Low Stock ({sweet.quantityInStock})
                    </span>
                  ) : (
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                      In Stock ({sweet.quantityInStock})
                    </span>
                  )}
                </div>
                <button className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {sweet.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.{Math.floor(Math.random() * 9) + 1}</span>
                    <span className="text-sm text-secondary">(124 reviews)</span>
                  </div>
                </div>
                <h1 className="font-display text-4xl font-bold mb-4">{sweet.name}</h1>
                <p className="text-xl text-secondary leading-relaxed">
                  {sweet.description || 'Delicious traditional Indian sweet made with finest ingredients and authentic recipes passed down through generations.'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">₹{sweet.price}</span>
                <span className="text-lg text-secondary line-through">₹{Math.floor(sweet.price * 1.2)}</span>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full font-medium">
                  17% OFF
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= sweet.quantityInStock}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-secondary">
                  Total: <span className="font-bold text-primary text-lg">₹{sweet.price * quantity}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={sweet.quantityInStock === 0}
                    className="flex-1 btn btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handlePurchase}
                    disabled={sweet.quantityInStock === 0 || purchaseLoading}
                    className="flex-1 btn bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {purchaseLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : sweet.quantityInStock === 0 ? (
                      'Out of Stock'
                    ) : (
                      'Buy Now'
                    )}
                  </button>
                </div>
                
                <button className="w-full btn border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share this Sweet
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="text-sm font-medium">Free Delivery</div>
                  <div className="text-xs text-secondary">On orders above ₹1000</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🌿</div>
                  <div className="text-sm font-medium">Fresh & Pure</div>
                  <div className="text-xs text-secondary">Made with natural ingredients</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="text-sm font-medium">Premium Quality</div>
                  <div className="text-xs text-secondary">Traditional recipes</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl mb-2">🎁</div>
                  <div className="text-sm font-medium">Gift Packaging</div>
                  <div className="text-xs text-secondary">Beautiful presentation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SweetDetails;