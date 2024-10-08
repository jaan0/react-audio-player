import React, { useRef, useEffect } from 'react';
import { Controls, ControlsProps } from '../components/Controls'; // Update this import
import { useAudio } from '../context/AudioContext';
import { Track } from '../data/tracks'; // Import Track type

interface PlayerProps {
  track: Track;
}

const Player: React.FC<PlayerProps> = ({ track }) => {
  const { isPlaying, setIsPlaying } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);


  useEffect(() => {
    // Reset audio when track changes
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [track, setIsPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };


  const controlsProps: ControlsProps = {
    isPlaying,
    onPlayPause: handlePlayPause
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
      <img src={track.thumbnail} alt={track.title} className="w-full h-48 object-cover mb-4 rounded" />
      <h2 className="text-xl font-bold mb-2">{track.title}</h2>
      <p className="text-gray-600 mb-4">{track.author}</p>
      <audio
        ref={audioRef}
        src={track.src}
        onEnded={() => setIsPlaying(false)}
      />
      <Controls 
        {...controlsProps}
      />
    </div>
  );
};

export default Player;

