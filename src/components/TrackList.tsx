import React, { useState } from 'react';
import { Track } from '../data/tracks';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface TrackListProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
  selectedTrack: Track | null;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onSelectTrack, selectedTrack }) => {
  const [showAllTracks, setShowAllTracks] = useState(false);

  const toggleShowAllTracks = () => {
    setShowAllTracks(!showAllTracks);
  };

  const displayedTracks = showAllTracks ? tracks : tracks.slice(0, 4);

  return (
    <div className="max-w-md ml-4">
      <h2 className="text-xl font-bold mb-2 text-[#FFD700]">Track List</h2>
      {tracks.length === 0 ? (
        <p>No tracks available for this artist.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {displayedTracks.map((track) => {
              const isSelected = selectedTrack && selectedTrack.id === track.id;
              return (
                <li
                  key={track.id}
                  className={`p-2 rounded cursor-pointer ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => onSelectTrack(track)}
                >
                  <div className="font-semibold">{track.title}</div>
                  <div className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                    {track.author}
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-blue-200' : 'text-gray-500'}`}>
                    Artist: {track.artist}
                  </div>
                </li>
              );
            })}
          </ul>
          {tracks.length > 4 && (
            <button
              onClick={toggleShowAllTracks}
              className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
            >
              {showAllTracks ? (
                <>
                  <FaChevronUp className="mr-1" /> Show Less
                </>
              ) : (
                <>
                  <FaChevronDown className="mr-1" /> Show More
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TrackList;
