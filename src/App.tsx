import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Tracks from './Tracks';
import About from './About';
import Contact from './contact';
import { AudioProvider } from './context/AudioContext';
import Song from './components/Song';
import LoginForm from './forms/login';  
import SignupForm from './forms/signup';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import { SearchResult } from './components/types/SearchResult';
import { tracks, Track } from './data/tracks';  
import PopularContent from './PopularContent';
import ArtistPage from './components/ArtistPage';
import MusicPlayer from './components/MusicPlayer';

function AppContent() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [allSongs, setAllSongs] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const convertedTracks: SearchResult[] = tracks.map(track => ({
      ...track,
      path: track.src // Assuming 'url' in Track corresponds to 'path' in SearchResult
    }));
    setAllSongs(convertedTracks);
    setIsLoading(false);
  }, []);

  const handleSearch = (term: string) => {
    const lowercaseTerm = term.toLowerCase();
    const results = allSongs.filter(song => 
      song.title.toLowerCase().includes(lowercaseTerm) ||
      song.artist.toLowerCase().includes(lowercaseTerm)
    );
    setSearchResults(results);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    console.log('Clicked on:', result);
  };

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track); // Use setCurrentTrack to update the current track
};

  const showAudioPlayer = location.pathname === '/' || location.pathname === '/tracks';
  const currentYear = new Date().getFullYear();

  return (<>
    <div className="flex flex-col min-h-screen">
      <Navigation 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchResults={searchResults as Track[]}
        handleSearchResultClick={(result: Track) => handleSearchResultClick(result as SearchResult)}
      />
      
      <AudioProvider>
        <main className={`flex-grow flex items-center justify-center bg-[#121212] ${showAudioPlayer ? 'pb-24' : ''}`}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full"></div>
          ) : (
            <Routes>
              <Route path="/" element={<PopularContent />} />
              <Route path="/artist/:artistName" element={<ArtistPage />} />
              <Route path="/tracks" element={<Tracks selectedTrackId={null} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/song/:id" element={<Song />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          )}
        </main>
        
        <footer className={`${showAudioPlayer ? 'fixed bottom-0 left-0 right-0' : ''} bg-black bg-opacity-80 text-white`}>
          <div className="container mx-auto">
            <p className="text-center py-2">&copy; {currentYear} Created with ❤️ by <a href="https://github.com/jaan0">Jan</a>. All rights reserved.</p>
          </div>
        </footer>
      </AudioProvider>
    </div>
    <div onClick={() => handleTrackSelect(tracks[0])}>
        {/* Track item content */}
    </div>

    {currentTrack && <MusicPlayer track={currentTrack} />}
    {currentTrack ? (
    <MusicPlayer track={currentTrack} />
) : (
    <div>No track selected</div> // Optional: Display a message or placeholder
)}

  </>);

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
