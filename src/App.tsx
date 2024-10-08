import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SongOfTheDay from './components/SongOfTheDay';
import { AudioPlayer } from './components/AudioPlayer';
import Tracks from './Tracks';
import About from './About';
import Contact from './contact';
import { AudioProvider } from './context/AudioContext';
import Song from './components/Song';
import LoginForm from './forms/login';  
import SignupForm from './forms/signup';
import Navigation from './components/Navigation';
import { useState } from 'react';
import { SearchResult } from './components/types/SearchResult';

// Create a new component for the app content
function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults] = useState<SearchResult[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Add your search logic here
  };

  const handleSearchResultClick = (result: SearchResult) => {
    setSearchTerm(result.title);
    // Add your logic for handling search result click
  };

  const showAudioPlayer = location.pathname === '/' || location.pathname === '/tracks';

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-[#011d36]">
      <Navigation 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchResults={searchResults}
        handleSearchResultClick={handleSearchResultClick}
      />
      
      <AudioProvider>
        <main className={`flex-grow flex items-center justify-center ${showAudioPlayer ? 'pb-24' : ''}`}>
          <Routes>
            <Route path="/" element={<>
              <div className="container mx-auto mt-4">
                <SongOfTheDay />
              </div>
            </>} />
            <Route path="/tracks" element={<Tracks selectedTrackId={null} />} />
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
      </AudioProvider>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;