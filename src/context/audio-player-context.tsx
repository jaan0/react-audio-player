import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { tracks } from '../data/tracks';  // Import your tracks data

//import { tracks } from '../data/tracks';

export interface Track {
  id: number;
  title: string;
  src: string;
  author: string;
  thumbnail: string;
  artist: string;
}

interface AudioPlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  isShuffle: boolean;
  setIsShuffle: (value: boolean) => void;
  isRepeat: boolean;
  setIsRepeat: (value: boolean) => void;
  skipForward: () => void;
  skipBackward: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// Define the props type for AudioPlayerProvider
interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
    // Add logic to actually play/pause audio
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(prevIndex => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
    // Add logic to play the new track
  }, []);

  const previousTrack = useCallback(() => {
    setCurrentTrackIndex(prevIndex => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
    // Add logic to play the new track
  }, []);

  const currentTrack = tracks[currentTrackIndex];
  return (
    <AudioPlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      togglePlayPause,
      nextTrack,
      previousTrack,
      isShuffle: false, // Add default value
      setIsShuffle: () => {}, // Add empty function for now
      isRepeat: false, // Add default value
      setIsRepeat: () => {}, // Add empty function for now
      skipForward: () => {}, // Add empty function for now
      skipBackward: () => {}, // Add empty function for now
      playNextTrack: nextTrack, // Use existing nextTrack function
      playPreviousTrack: previousTrack, // Use existing previousTrack function
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

// Export the useAudioPlayer hook
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
