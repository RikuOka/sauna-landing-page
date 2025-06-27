'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const GlobalSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?search=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="キーワード検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-1 rounded-md text-gray-800"
      />
      <button type="submit" className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded-md">
        検索
      </button>
    </form>
  );
};

export default GlobalSearchBar;
