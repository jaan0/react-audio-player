import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo/logo.png'; // Update this path
import { Track} from '../data/tracks';
import { FaGithub, FaEnvelope, FaGlobe,  FaInstagram } from 'react-icons/fa';






export interface NavigationProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (term: string) => void;
  searchResults: Track[];
  handleSearchResultClick: (result: Track) => void;
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

  return (<>
 
    <header className="bg-black  text-white bg-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="home"><a href="https://emoji.gg/emoji/7184-spotify-home"><img src="https://cdn3.emoji.gg/emojis/7184-spotify-home.png" width="25px" height="25px" alt="Spotify_Home"/></a></Link>
            {/* <Link to="/tracks" className="text-white">🎶</Link> */}
            <Link to="/about" className="text-[#0c7531] hover:text-[#3be377]">About</Link>
            <Link to="/contact" className="text-[#0c7531] hover:text-[#3be377]">Request a song</Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <a href="https://github.com/jaan0" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
              <FaGithub size={24} />
            </a>
            <a href="mailto:ali.mahesar04@gmail.com" className="text-[#0c7531] hover:text-[#3be377]">
              <FaEnvelope size={24} />
            </a>
            <a href="https://portfolio-ali-jans-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
              <FaGlobe size={24} />
            </a>
            <a href="https://www.instagram.com/a.l.i._.j.a.a.n/" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
              <FaInstagram size={24} />
            </a>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-12">
            <button onClick={toggleSearch} className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button onClick={toggleMenu} className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link to="/" className="block py-2 "><a href="https://emoji.gg/emoji/7184-spotify-home"><img src="https://cdn3.emoji.gg/emojis/7184-spotify-home.png" width="25px" height="25px" alt="Spotify_Home"/></a></Link>
            {/* <Link to="/tracks" className="block py-2">🎶</Link> */}
            <Link to="/about" className="block py-2 text-[#0c7531] hover:text-[#3be377]">About</Link>
            <Link to="/contact" className="block py-2 text-[#0c7531] hover:text-[#3be377]">Contact Us</Link>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/jaan0" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
                <FaGithub size={24} />
              </a>
              <a href="mailto:ali.mahesar04@gmail.com" className="text-[#0c7531] hover:text-[#3be377]">
                <FaEnvelope size={24} />
              </a>
              <a href="https://portfolio-ali-jans-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
                <FaGlobe size={24} />
              </a>
              <a href="https://www.instagram.com/a.l.i._.j.a.a.n/" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
                <FaInstagram size={24} />
              </a>
            </div>
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
                <div className="text-sm text-gray-600">{result.artist}</div>
              </div>
            ))}
            </div>
          )}
        </div>
    </header>
    </>
  );
};

export default Navigation;