import React, { useState, useEffect } from 'react';
import { SearchResult } from './types/SearchResult';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (term: string) => void;
  searchResults: SearchResult[];
  handleSearchResultClick: (result: SearchResult) => void;
}

function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  handleSearch, 
  searchResults, 
  handleSearchResultClick 
}: SearchBarProps) {
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setShowResults(searchTerm.trim() !== '');
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setError('Please enter a search term');
    } else {
      setError(null);
      handleSearch(searchTerm);
      setShowResults(true);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search for songs..."
          className="w-full px-8 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="px-2 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {error && (
        <p className="absolute text-red-500 text-sm mt-1">{error}</p>
      )}
      {showResults && (
        <ul className="absolute z-10 w-full bg-white border rounded-b mt-1 max-h-60 overflow-y-auto">
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSearchResultClick(result)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
                <div className="font-bold">{result.title}</div>
                <div className="text-sm text-gray-600">{result.artist}</div>
              </li>
            ))}
            </ul>
          )}
      {searchTerm && searchResults.length === 0 && (
        <p className="absolute text-gray-500 text-sm mt-1">No results found</p>
      )}
    </div>
  );
}

export default SearchBar;
