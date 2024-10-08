import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { searchPages, SearchResult } from './utils/search';
import SongOfTheDay from './components/SongOfTheDay';
import { AudioPlayer } from './components/AudioPlayer';
import Tracks from './Tracks'; // Import your Tracks component
import About from './About';
import Contact from './contact';
import { AudioProvider } from './context/AudioContext';
import Song from './components/Song';
import LoginForm from './forms/login';  
import SignupForm from './forms/signup';
import Navigation from './components/Navigation';


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
    <Navigation 
      handleSearch={handleSearch}
      searchResults={searchResults}
      handleSearchResultClick={(result: { title: string; content?: string; type: string; id?: number; path?: string }) => {
        if (result.type === 'track' && result.id) {
          navigate('/tracks', { state: { selectedTrackId: result.id } });
          setSelectedTrackId(result.id);
        } else if (result.path) {
          navigate(result.path);
        }
        setSearchTerm('');
        setSearchResults([]);
      }}
    />
    <AudioProvider>
      <div className="flex flex-col min-h-screen bg-[#011d36]">
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
  </>
  );
}

function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;