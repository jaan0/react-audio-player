import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';
import { Controls } from './Controls';
import { TrackInfo } from './TrackInfo';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';

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
    <div className="min-h-8 bg-[#2e2d2d] flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-9 justify-between items-center text-white p-2 sm:p-3 md:p-4 lg:p-[0.5rem_10px]">
      <TrackInfo track={currentTrack} className="w-full sm:w-1/4" />
      <div className="w-full sm:w-1/2 flex flex-col items-center gap-1 m-auto flex-1">
        <Controls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          duration={duration}
          currentTime={currentTime}
          onSeek={handleSeek}
        />
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
      </div>
      <div className="flex items-center gap-2 text-gray-400 w-full sm:w-1/4 justify-end">
        <VolumeControl audioRef={audioRef} />
      </div>
      <audio ref={audioRef} />
    </div>
  );
};
