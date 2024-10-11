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
    <div className="mb-4 sm:mb-6 md:mb-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#FF0000] ">Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 ">
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
