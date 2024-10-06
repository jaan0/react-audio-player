import { RefObject, useEffect, useRef, useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { Controls } from './Controls';
import TrackInfo from './TrackInfo';
import ProgressBar from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { Track } from '../data/tracks';

export interface TrackInfoProps {
  track: Track | null;
  className: string;
}

export interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export interface ControlsProps {
  audioRef: RefObject<HTMLAudioElement>;
}

export const AudioPlayer: React.FC = () => {
  const { currentTrack, isPlaying, setIsPlaying } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
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
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

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
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="bg-[#2e2d2d] flex flex-col sm:flex-row items-center text-white p-2 sm:p-3 md:p-4">
      <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
        <TrackInfo currentTrack={currentTrack} />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col items-center gap-1 mb-2 sm:mb-0">
        <Controls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          duration={duration}
          currentTime={currentTime}
          onSeek={handleSeek}
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
