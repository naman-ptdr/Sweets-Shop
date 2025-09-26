import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

// Import sweet images
import rasagullaImage from '@/assets/rasgulla.jpg';
import gulabJamunImage from '@/assets/gulab-jamun.jpg';
import laddooImage from '@/assets/laddoo.jpg';
import kajuKatliImage from '@/assets/kaju-katli.jpg';
import mysorePakImage from '@/assets/mysore-pak.jpg';
import modakImage from '@/assets/modak.jpg';
import ghewarImage from '@/assets/ghewar.jpg';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

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

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      }
    }
  };

  const subtotal = getCartTotal();
  const deliveryFee = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/sweets"
              className="flex items-center text-secondary hover:text-primary transition-colors font-medium group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Shopping Cart
          </h1>
          <p className="text-xl text-secondary">
            Review your selected sweets and proceed to checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="section bg-white">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
              <p className="text-secondary mb-8">
                Looks like you haven't added any sweets to your cart yet.
              </p>
              <Link to="/sweets" className="btn btn-primary">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Cart Items ({cartItems.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item._id} className="card p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={getImageForSweet(item.name)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-secondary">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-600 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(item._id, -1)}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, 1)}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">₹{item.price * item.quantity}</div>
                            <div className="text-sm text-secondary">₹{item.price} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="card p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    {subtotal < 1000 && (
                      <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                        Add ₹{1000 - subtotal} more for free delivery!
                      </div>
                    )}
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{total}</span>
                    </div>
                  </div>
                  
                  <Link to="/checkout" className="btn btn-primary w-full mb-4">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                  
                  <Link to="/sweets" className="btn border border-gray-300 text-gray-700 hover:bg-gray-50 w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                  
                  <div className="mt-6 space-y-3 text-sm text-secondary">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Multiple payment options available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Same day delivery available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;