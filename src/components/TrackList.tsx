import React, { useState } from 'react';
import { Track } from '../data/tracks';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface TrackListProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
  selectedTrack: Track | null;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onSelectTrack, selectedTrack }) => {
  const [displayCount, setDisplayCount] = useState(4);

  const showMoreTracks = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 4, tracks.length));
  };

  const showLessTracks = () => {
    setDisplayCount(4);
  };

  const displayedTracks = tracks.slice(0, displayCount);

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8">
      <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#FF0000]">Track List</h2>
      {tracks.length === 0 ? (
        <p className="text-sm sm:text-base">No tracks available for this artist.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {displayedTracks.map((track) => {
              const isSelected = selectedTrack && selectedTrack.id === track.id;
              return (
                <li
                  key={track.id}
                  className={`p-2 sm:p-3 rounded cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF0000] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => onSelectTrack(track)}
                >
                  <div className="font-bold text-sm sm:text-base">{track.title}</div>
                  <div className={`text-xs sm:text-sm ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
                    {track.author}
                  </div>
                  
                </li>
              );
            })}
          </ul>
          {displayCount < tracks.length ? (
            <button
              onClick={showMoreTracks}
              className="mt-2 flex items-center text-[#FF0000] hover:text-[#FF0000]-900 text-sm sm:text-base"
            >
              <FaChevronDown className="mr-1" /> Show More
            </button>
          ) : displayCount > 4 ? (
            <button
              onClick={showLessTracks}
              className="mt-2 flex items-center text-[#FF0000] hover:text-[#FF0000]-900 text-sm sm:text-base"
            >
              <FaChevronUp className="mr-1" /> Show Less
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TrackList;
