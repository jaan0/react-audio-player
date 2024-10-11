import React from 'react';
import { Track } from '../context/audio-player-context';

interface TrackInfoProps {
  currentTrack: Track | null;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ currentTrack }) => {
  if (!currentTrack) {
    return null; // or return a placeholder component
  }

  return (
    <div className="flex items-center space-x-4">
      {currentTrack.thumbnail ? (
        <img
          className="w-16 h-16 rounded-full"
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
        />
      ) : (
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      )}
      <div>
        <h3 className="font-bold text-red-600">{currentTrack.title}</h3>
        <p className="text-sm text-red-400">{currentTrack.author}</p>
      </div>
    </div>
  );
};

export default TrackInfo;
