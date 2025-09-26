import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartTable = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-3xl">🛒</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground">
          Add some delicious sweets to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card-sweet p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Product Image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-lg font-bold text-primary">₹{item.price} per kg</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity} kg
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="card-premium p-6 space-y-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          {subtotal < 1000 && (
            <p className="text-xs text-muted-foreground">
              Add ₹{1000 - subtotal} more for free delivery
            </p>
          )}
          <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>

        <Button className="w-full btn-hero">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartTable;