import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SweetCard = ({
  id,
  name,
  price,
  image,
  category,
  description,
  isInWishlist = false,
  onAddToCart,
  onToggleWishlist,
}) => {
  return (
    <div className="card-sweet group overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={() => onToggleWishlist(id)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-soft hover:scale-110 transition-all"
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
              }`}
            />
          </button>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">₹{price}</p>
            <p className="text-xs text-muted-foreground">per kg</p>
          </div>

          <Button
            onClick={() => onAddToCart(id)}
            className="btn-festive group/btn"
          >
            <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SweetCard;