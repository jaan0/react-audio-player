import React from 'react';
import { getUniqueArtists } from '../data/tracks';

interface ArtistListProps {
  onSelectArtist: (artist: string) => void;
  selectedArtist: string;
}

const ArtistList: React.FC<ArtistListProps> = ({ onSelectArtist, selectedArtist }) => {
  const artists = getUniqueArtists();
  console.log('Available artists:', artists);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2 text-[#FFD700] ">Artists</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            console.log('Clicked All Artists');
            onSelectArtist('');
          }}
          className={`px-3 py-1 rounded-full ${
            selectedArtist === ''
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All Artists
        </button>
        {artists.map((artist) => (
          <button
            key={artist}
            onClick={() => {
              console.log('Clicked artist:', artist);
              onSelectArtist(artist);
            }}
            className={`px-3 py-1 rounded-full ${
              selectedArtist === artist
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {artist}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
