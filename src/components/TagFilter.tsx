'use client';

import React from 'react';

interface TagFilterProps {
  tags: string[];
  onTagClick: (tag: string) => void;
  selectedTags: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, onTagClick, selectedTags }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
