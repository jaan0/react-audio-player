import React, { useState } from 'react';
import { tracks } from './data/tracks';
import { useNavigate } from 'react-router-dom';

const PopularContent: React.FC = () => {
  const [visibleTracks, setVisibleTracks] = useState(7); // Initially show 7 tracks
  const navigate = useNavigate();

  const handleShowMore = () => {
    setVisibleTracks(prev => prev + 7); // Show 7 more tracks
  };

  const handleTrackClick = (artist: string) => {
    navigate(`/artist/${artist}`);
  };

  // Get unique artists for the first 7 tracks
  const uniqueArtists = Array.from(new Set(tracks.map(track => track.artist))).slice(0, 7);
  const uniqueTracks = uniqueArtists
    .map(artist => tracks.find(track => track.artist === artist))
    .filter((track): track is typeof tracks[number] => track !== undefined); // Filter out undefined values

  // Shuffle remaining tracks
  const remainingTracks = tracks.filter(track => !uniqueTracks.includes(track));
  const shuffledRemainingTracks = remainingTracks.sort(() => Math.random() - 0.5);

  // Combine unique tracks and shuffled remaining tracks
  const displayedTracks = [...uniqueTracks, ...shuffledRemainingTracks].slice(0, visibleTracks);

  return (
    <div className="bg-[#121212] text-white p-6">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text">Popular Tracks</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {displayedTracks.map((track) => (
            <div key={track.id} className="cursor-pointer" onClick={() => handleTrackClick(track.artist)}>
              <img src={track.thumbnail} alt={track.title} className="w-full aspect-square object-cover rounded-md mb-2" />
              <h3 className="font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
          ))}
        </div>
        <br />
        <button className="text-sm text-[#3be377]" onClick={handleShowMore}>
          Show More
        </button>
      </section>
    </div>
  );
};

export default PopularContent;
