import { RefObject, useEffect, useRef, useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { Controls } from './Controls';
import TrackInfo from './TrackInfo';
import ProgressBar from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { Track } from '../data/tracks';

export interface TrackInfoProps {
  currentTrack: Track | null;
  className?: string; // Make className optional
}

export interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export interface ControlsProps {
  audioRef: RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  onPlayPause: () => void;
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const AudioPlayer: React.FC = () => {
  const { currentTrack, isPlaying, setIsPlaying } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      console.log('Loading track:', currentTrack.src);
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, isPlaying, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      console.log('Audio loaded, duration:', audio.duration);
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      console.log('Current time:', audio.currentTime);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    console.log('Seeking to:', time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
      <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
        <TrackInfo currentTrack={currentTrack} />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col items-center gap-1 mb-2 sm:mb-0">
        <Controls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
      </div>
      <div className="w-full sm:w-1/4 flex justify-center sm:justify-end">
        <VolumeControl audioRef={audioRef} />
      </div>
      <audio ref={audioRef} />
    </div>
  );
};
