import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SearchResult } from './types/SearchResult';

function Tracks() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<SearchResult | null>(null);
  const [allSongs, setAllSongs] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Fetch all songs
    const fetchSongs = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch('/path-to-your-data-file.json');
        const data = await response.json();
        setAllSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    // Find the specific song when id changes
    if (id && allSongs.length > 0) {
      const foundSong = allSongs.find(s => s.id.toString() === id);
      setSong(foundSong || null);
    }
  }, [id, allSongs]);

  if (id && !song) {
    return <div>Loading...</div>;
  }

  if (id && song) {
    // Display individual song
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{song.title}</h1>
        <p className="text-lg">Artist: {song.artist}</p>
        {/* Add more details or player component here */}
      </div>
    );
  }

  // Display list of all tracks
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Trackssss</h1>
      <ul>
        {allSongs.map(song => (
          <li key={song.id} className="mb-2">
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-sm text-gray-600">{song.author} - {song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracks;
