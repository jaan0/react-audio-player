import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface SongData {
  id: string | number;
  title: string;
  artist: string;
  // Add other relevant song properties
}

const Song: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<SongData | null>(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/songs/${id}`);
        const data = await response.json();
        setSong(data);
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    if (id) {
      fetchSongDetails();
    }
  }, [id]);

  if (!song) return <div>Loading...</div>;

  return (
    <div>
      <h2>{song.title}</h2>
      <p>Artist: {song.artist}</p>
      {/* Add more song details and a play button */}
    </div>
  );
};

export default Song;
