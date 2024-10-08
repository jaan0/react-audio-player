import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { searchPages, SearchResult } from './utils/search';
import SongOfTheDay from './components/SongOfTheDay';
import { AudioPlayer } from './components/AudioPlayer';
import Tracks from './Tracks'; // Import your Tracks component
import About from './About';
import Contact from './contact';
import logo from './logo/logo.png'; //import ArtistList from './components/ArtistList';
import { AudioProvider } from './context/AudioContext';
import Song from './components/Song';
import LoginForm from './forms/login';  
import SignupForm from './forms/signup';


interface Song {
  id: string | number;
  title: string;
  // Add other properties as needed
}

function searchSongAcrossAllArtists(query: string): Song | null {
  // Implement your search logic here
  // This is just a placeholder. Replace with actual search logic.
  console.log('Searching for:', query);
  
  // Example implementation:
  if (query === "example") {
    return { id: "1", title: "Example Song" };
  }
  
  return null; // Return null if no song is found
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const showAudioPlayer = location.pathname === '/' || location.pathname === '/tracks';

  useEffect(() => {
    if (searchTerm) {
      const results = searchPages(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchError('Please enter a search term');
      return;
    }

    setSearchError(''); // Clear any previous error
    const song = searchSongAcrossAllArtists(query);
    
    if (song) {
      navigate(`/song/${song.id}`);
    } else {
      navigate(`/tracks?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    if (result.type === 'track' && result.id) {
      navigate('/tracks', { state: { selectedTrackId: result.id } });
      setSelectedTrackId(result.id);
    } else if (result.path) {
      navigate(result.path);
    }
    setSearchTerm('');
    setSearchResults([]);
  };
  return (
  <>
  <div>
 
    <AudioProvider>
    <div className="flex flex-col min-h-screen bg-[#011d36]">
      <header className="p-4 bg-black bg-opacity-30 text-white">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
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
                  e.preventDefault(); // Prevent default form submission
                  handleSearch(searchTerm); // Use the current searchTerm state
                }} className="search-form flex flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSearchError(''); // Clear error when user types
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



      <main className={`flex-grow flex items-center justify-center ${showAudioPlayer ? 'pb-24' : ''}`}>
        <Routes>
          <Route path="/" element={<>
            <div className="container mx-auto mt-4">
            <SongOfTheDay />
            </div>
          </>} />
          <Route path="/tracks" element={<Tracks selectedTrackId={selectedTrackId} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/song/:id" element={<Song />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </main>
              <br />
      <footer className={`${showAudioPlayer ? 'fixed bottom-0 left-0 right-0' : ''} bg-black bg-opacity-80 text-white`}>
        <div className="container mx-auto">
          {showAudioPlayer && <AudioPlayer />}
          <p className="text-center py-2">&copy; {currentYear} Created with ❤️ by <a href="https://github.com/jaan0">Jan</a>. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </AudioProvider>
    </div> 
  
  </>);
}

function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;