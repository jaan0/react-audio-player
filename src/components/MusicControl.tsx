import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';


const MusicControl: React.FC<{ 
  track: { title: string; artist: string; src: string; thumbnail: string }; 
  tracks: { title: string; artist: string; src: string; thumbnail: string }[]; 
  currentTrackIndex: number; 
  onTrackChange: (index: number) => void; 
  isPlaying: boolean;
  onPlayPause: () => void;
}> = ({ track, tracks, currentTrackIndex, onTrackChange, isPlaying, onPlayPause }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = track.src; // Update audio source when track changes
      audioRef.current.preload = 'auto'; // Preload the audio
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Audio play error:", error)); // Handle play promise
      } else {
        audioRef.current.pause();
      }
    }
  }, [track, isPlaying]); // Re-run when the track or play state changes

  const handleNextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      onTrackChange(currentTrackIndex + 1);
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrackIndex > 0) {
      onTrackChange(currentTrackIndex - 1);
    }
  };

  const someCalculationOrValue = 42; // Define it with a valid number
  const maxValue = someCalculationOrValue; // Ensure this is a valid number

  return (
    <div className="bg-[#4c4c4c] text-white p-4 flex items-center justify-between fixed bottom-0 left-0 right-0">
      <div className="flex items-center">
        <img src={track.thumbnail} alt={track.title} className="w-16 h-16 object-cover rounded-md mr-4" />
        <div className="hidden sm:block">
          <h3 className="font-semibold text-[#3be377]">{track.title}</h3>
          <p className="text-sm text-gray-400">{track.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={handlePreviousTrack} className="text-white">
          <FaStepBackward />
        </button>
        <button onClick={onPlayPause} className="text-white">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleNextTrack} className="text-white">
          <FaStepForward />
        </button>
      </div>
      <div className="flex items-center ml-4 space-x-2">
        <span className="text-xs">{Math.floor(currentTime)} / {Math.floor(duration)}</span>
        <input
          type="range"
          min="0"
          max={isNaN(maxValue) ? "0" : maxValue.toString()} // Cast to string or provide a default
          value={currentTime}
          onChange={handleProgressChange}
          className="mx-2 w-full"
        />
      </div>
      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default MusicControl;
