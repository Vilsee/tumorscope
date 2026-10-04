'use client';
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search..." }: SearchBarProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) onSearch(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        className="w-full bg-[#121826] border border-[#1A2236] rounded-full px-6 py-3 text-[#E8EDF4] focus:outline-none focus:border-[#2D7DD2] transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
