import React, { useState, useRef, useEffect } from 'react';

const MusicControl: React.FC<{ 
  track: { title: string; artist: string; src: string; thumbnail: string }; 
  tracks: { title: string; artist: string; src: string; thumbnail: string }[]; 
  currentTrackIndex: number; 
  onTrackChange: (index: number) => void; 
}> = ({ track, tracks, currentTrackIndex, onTrackChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

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
      if (isPlaying) {
        audioRef.current.play(); // Play the new track if it was already playing
      }
    }
  }, [track]); // Re-run when the track changes

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

  return (
    <div className="bg-[#121212] text-white p-4 flex items-center justify-between fixed bottom-0 left-0 right-0">
      <div className="flex items-center">
        <img src={track.thumbnail} alt={track.title} className="w-16 h-16 object-cover rounded-md mr-4" />
        <div>
          <h3 className="font-semibold">{track.title}</h3>
          <p className="text-sm text-gray-400">{track.artist}</p>
        </div>
      </div>
      <div className="flex items-center"> 
        <button onClick={togglePlay} className="text-green-500">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <audio ref={audioRef} src={track.src} />
        <button className="ml-4" onClick={handleNextTrack}>Next</button>
        <button className="ml-4" onClick={handlePreviousTrack}>Previous</button>
      </div>
      <div className="flex items-center ml-4">
        <span>{Math.floor(currentTime)} / {Math.floor(duration)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="mx-2"
        />
      </div>
    </div>
  );
};

export default MusicControl;
