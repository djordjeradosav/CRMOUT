import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchButton = ({
  onSearch,
  onClear,
  placeholder = 'Enter search term...',
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setIsSearchOpen(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearchOpen(false);
    if (onClear) {
      onClear();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  if (isSearchOpen) {
    return (
      <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-white">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          className="flex-1 outline-none text-sm"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <button
          onClick={handleSearch}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsSearchOpen(true)}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Search className="h-5 w-5 mr-2" />
      Search
    </button>
  );
};

export default SearchButton;
