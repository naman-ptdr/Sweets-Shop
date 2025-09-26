import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-background/50 border-border/50 focus:bg-background"
      />
    </div>
  );
};

export default SearchBar;