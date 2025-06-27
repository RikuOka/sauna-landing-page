'use client';

import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="キーワードで検索..."
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full"
    />
  );
};

export default SearchBar;
