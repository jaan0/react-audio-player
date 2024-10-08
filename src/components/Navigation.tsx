import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo/logo.png'; // Update this path



export interface NavigationProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (term: string) => void;
  searchResults: any[]; // Replace 'any' with a more specific type if possible
  handleSearchResultClick: (result: any) => void; // Replace 'any' with a more specific type if possible
}

const Navigation: React.FC<NavigationProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  searchResults,
  handleSearchResultClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <header className="bg-black bg-opacity-30 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-pink-300">Home</Link>
            <Link to="/tracks" className="hover:text-pink-300">Tracks</Link>
            <Link to="/about" className="hover:text-pink-300">About</Link>
            <Link to="/contact" className="hover:text-pink-300">Contact Us</Link>
          </div>
          
          <div className="flex items-center space-x-12  ">
            <button onClick={toggleSearch} className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <form onSubmit={onSearch} className="hidden md:flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded-l"
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-r">
                Search
              </button>
            </form>
            <div className="hidden md:flex space-x-2">
              <Link to="/login" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">Login</Link>
              <Link to="/signup" className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded">Signup</Link>
            </div>
            <button onClick={toggleMenu} className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link to="/" className="block py-2 hover:text-pink-300">Home</Link>
            <Link to="/tracks" className="block py-2 hover:text-pink-300">Tracks</Link>
            <Link to="/about" className="block py-2 hover:text-pink-300">About</Link>
            <Link to="/contact" className="block py-2 hover:text-pink-300">Contact Us</Link>
            <Link to="/login" className="block py-2 hover:text-pink-300">Login</Link>
            <Link to="/signup" className="block py-2 hover:text-pink-300">Signup</Link>
          </div>
        )}
        
        {isSearchOpen && (
          <form onSubmit={onSearch} className="mt-4 md:hidden">
            <div className="flex items-center space-x-4 flex-grow justify-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-gray-700 text-white px-3 py-1 rounded-l"
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-r">
                Search
              </button>
            </div>
          </form>
        )}
        
        {searchResults.length > 0 && (
          <div className="absolute z-10 bg-white text-black mt-1 w-full rounded shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchResultClick(result)}
              >
                <div className="font-semibold">{result.title}</div>
                <div className="text-sm text-gray-600">{result.type}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;