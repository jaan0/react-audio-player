import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  RefObject,
  useRef,
} from 'react';

import { tracks } from '../data/tracks';

export interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  timeProgress: number;
  setTimeProgress: Dispatch<SetStateAction<number>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  trackIndex: number;
  isShuffle: boolean;
  setIsShuffle: Dispatch<SetStateAction<boolean>>;
  isRepeat: boolean;
  setIsRepeat: Dispatch<SetStateAction<boolean>>;
  skipForward: () => void;
  skipBackward: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
}

const AudioPlayerContext = createContext<
  AudioPlayerContextType | undefined
>(undefined);

export const AudioPlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [trackIndex, setTrackIndex] = useState<number>(0);

  const [currentTrack, setCurrentTrack] = useState<Track>(
    tracks[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  const playNextTrack = () => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev >= tracks.length - 1
        ? 0
        : prev + 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  };

  const playPreviousTrack = () => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev === 0
        ? tracks.length - 1
        : prev - 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  };

  const contextValue = {
    currentTrack,
    setCurrentTrack,
    audioRef,
    progressBarRef,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    setTrackIndex,
    isPlaying,
    setIsPlaying,
    trackIndex,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    skipForward,
    skipBackward,
    playNextTrack,
    playPreviousTrack,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);

  if (context === undefined) {
    throw new Error(
      'useAudioPlayerContext must be used within an AudioPlayerProvider'
    );
  }

  return context;
};
