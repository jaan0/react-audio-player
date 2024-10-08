import React from 'react';
import { SeekBarProps } from './AudioPlayer';

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
    <div className="w-full flex items-center gap-2">
      <span className="text-xs">{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 100}
        value={currentTime}
        onChange={handleSeek}
        className="w-full"
        style={{ background: `linear-gradient(to right, #1db954 0%, #1db954 ${(currentTime / duration) * 100}%, #4d4d4d ${(currentTime / duration) * 100}%, #4d4d4d 100%)` }}
      />
      <span className="text-xs">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
