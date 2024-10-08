import React from 'react';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsShuffle,
  BsRepeat,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';
import { useAudioPlayerContext } from '../context/audio-player-context';
import { tracks } from '../data/tracks';

export interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSeek
}) => {
  const {
    audioRef,
    setTrackIndex,
    setCurrentTrack,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
  } = useAudioPlayerContext();

  const [isLiked, setIsLiked] = React.useState(false);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
      onSeek(audioRef.current.currentTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
      onSeek(audioRef.current.currentTime);
    }
  };

  const handlePrevious = React.useCallback(() => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev === 0
        ? tracks.length - 1
        : prev - 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  const handleNext = React.useCallback(() => {
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev >= tracks.length - 1
        ? 0
        : prev + 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
      <button onClick={handlePrevious} className="p-1 sm:p-2">
        <BsSkipStartFill className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button onClick={skipBackward} className="p-1 sm:p-2">
        <BsFillRewindFill className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button onClick={onPlayPause} className="p-1 sm:p-2">
        {isPlaying ? (
          <BsFillPauseFill className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        ) : (
          <BsFillPlayFill className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        )}
      </button>
      <button onClick={skipForward} className="p-1 sm:p-2">
        <BsFillFastForwardFill className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button onClick={handleNext} className="p-1 sm:p-2">
        <BsSkipEndFill className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button onClick={() => setIsShuffle((prev) => !prev)} className="p-1 sm:p-2">
        <BsShuffle
          className={`w-4 h-4 sm:w-5 sm:h-5 ${isShuffle ? 'text-[#f50]' : ''}`}
        />
      </button>
      <button onClick={() => setIsRepeat((prev) => !prev)} className="p-1 sm:p-2">
        <BsRepeat
          className={`w-4 h-4 sm:w-5 sm:h-5 ${isRepeat ? 'text-[#f50]' : ''}`}
        />
      </button>
      <button onClick={handleLike} className="p-1 sm:p-2">
        {isLiked ? (
          <BsHeartFill className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
        ) : (
          <BsHeart className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>
    </div>
  );
};
