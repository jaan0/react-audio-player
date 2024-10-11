import React, { useRef, useEffect } from 'react';
import MusicControl from '../components/MusicControl';
import { useAudio } from '../context/AudioContext';
import { Track, tracks } from '../data/tracks'; // Import Track type

interface PlayerProps {
  track: Track;
}

type MusicControlProps = {
  track: { title: string; artist: string; src: string; thumbnail: string; };
  tracks: { title: string; artist: string; src: string; thumbnail: string; }[];
  currentTrackIndex: number;
  onTrackChange: (index: number) => void;
  isPlaying: boolean; // Add this line
  onPlayPause: () => void; // Add this line if it doesn't exist
};

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

  const controlsProps: MusicControlProps = {
    isPlaying,
    onPlayPause: handlePlayPause,
    track,
    tracks,
    currentTrackIndex: 0,
    onTrackChange: () => {}
  };
  
  return (
    <div className="bg-[#23232359] p-4 rounded-lg shadow-md text-center">
      <img src={track.thumbnail} alt={track.title} className="w-full h-48 object-cover mb-4 rounded" />
      <h2 className="text-xl font-bold mb-2 text-red-500 uppercase">{track.title}</h2>
      <p className="text-red-500 mb-4">{track.author}</p>
      <audio
        ref={audioRef}
        src={track.src}
        onEnded={() => setIsPlaying(false)}
      />
      <MusicControl 
        {...controlsProps} 
        track={track} 
        // Add the missing properties
        tracks={tracks} 
        currentTrackIndex={0} 
        onTrackChange={() => {}} 
      />
    </div>
  );
};

export default Player;
