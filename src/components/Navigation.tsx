
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../logo/logo.png';

interface NavigationProps {
  handleSearch: (term: string) => void;
  searchResults: Array<{ title: string; content?: string; type: string }>;
  handleSearchResultClick: (result: { title: string; content?: string; type: string }) => void;
}

const Navigation: React.FC<NavigationProps> = ({ handleSearch, searchResults, handleSearchResultClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 bg-black text-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <img
            src={logo}
            alt="App Logo"
            width={100}
            height={100}
            onClick={() => window.location.reload()}
            className="cursor-pointer"
          />
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <nav className={`nav-container ${isMenuOpen ? 'block' : 'hidden'} lg:flex w-full lg:w-auto mt-4 lg:mt-0`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-4">
              <li><Link to="/" className="block py-2 hover:text-pink-300">Home</Link></li>
              <li><Link to="/tracks" className="block py-2 hover:text-pink-300">Tracks</Link></li>
              <li><Link to="/about" className="block py-2 hover:text-pink-300">About</Link></li>
              <li><Link to="/contact" className="block py-2 hover:text-pink-300">Contact Us</Link></li>
            </ul>
            <div className="search-container relative mt-4 lg:mt-0 lg:ml-4 w-full lg:w-auto">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchTerm);
              }} className="search-form flex flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchError('');
                  }}
                  className={`search-input px-2 py-1 rounded text-black w-full sm:w-64 mb-2 sm:mb-0 ${searchError ? 'border-red-500' : ''}`}
                />
                <button type="submit" className="search-button bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded sm:ml-2">
                  Search
                </button>
              </form>
              {searchError && <p className="text-red-500 text-sm mt-1">{searchError}</p>}
              {searchResults.length > 0 && (
                <ul className="absolute z-10 bg-white text-black mt-1 w-full rounded shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <li key={index} className="px-2 py-1 hover:bg-gray-200 cursor-pointer" onClick={() => handleSearchResultClick(result)}>
                      <div className="font-semibold">{result.title}</div>
                      {result.content && (
                        <div className="text-sm text-gray-600">{result.content}</div>
                      )}
                      <div className="text-xs text-gray-400">{result.type}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
          <div className="lg:hidden mt-4 space-y-2">
            <button className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded w-full">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-purple-500 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded w-full">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
          <div className="hidden lg:flex space-x-2 mt-4 lg:mt-0">
            <button className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-purple-500 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;

