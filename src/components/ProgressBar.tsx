import React from 'react';
import { SeekBarProps } from './MusicPlayer'; // Ensure it's imported as a type

const ProgressBar: React.FC<SeekBarProps> = ({ currentTime, duration, onSeek }) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    onSeek(time);
  };

  return (
    <div className="flex items-center w-full">
      <span className="text-xs">{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 100}
        value={currentTime}
        onChange={handleSeek}
        className="flex-grow mx-2"
        style={{ background: `linear-gradient(to right, #1db954 0%, #1db954 ${(currentTime / duration) * 100}%, #4d4d4d ${(currentTime / duration) * 100}%, #4d4d4d 100%)` }}
      />
      <span className="text-xs">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
