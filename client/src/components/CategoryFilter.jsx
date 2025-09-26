import { Button } from '@/components/ui/button';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Sweets', color: 'bg-primary' },
    { id: 'bengali', name: 'Bengali', color: 'bg-emerald-500' },
    { id: 'punjabi', name: 'Punjabi', color: 'bg-orange-500' },
    { id: 'rajasthani', name: 'Rajasthani', color: 'bg-pink-500' },
    { id: 'south-indian', name: 'South Indian', color: 'bg-purple-500' },
    { id: 'maharashtrian', name: 'Maharashtrian', color: 'bg-indigo-500' },
    { id: 'fusion', name: 'Fusion', color: 'bg-rose-500' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-gradient-primary text-primary-foreground shadow-soft'
              : 'hover:bg-muted'
          }`}
        >
          <div 
            className={`w-2 h-2 rounded-full mr-2 ${category.color}`}
          />
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;