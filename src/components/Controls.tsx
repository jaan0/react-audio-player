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
    <div className="flex gap-6 items-center">
    {/*  <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleSeek}
        max={duration}
        value={currentTime}
      />
    */}
      <button onClick={handlePrevious} className="p-2">
        <BsSkipStartFill size={20} />
      </button>
      <button onClick={skipBackward} className="p-2">
        <BsFillRewindFill size={20} />
      </button>
      <button onClick={onPlayPause} className="p-2">
        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </button>
      <button onClick={skipForward} className="p-2">
        <BsFillFastForwardFill size={20} />
      </button>
      <button onClick={handleNext} className="p-2">
        <BsSkipEndFill size={20} />
      </button>
      <button onClick={() => setIsShuffle((prev) => !prev)} className="p-2">
        <BsShuffle
          size={20}
          className={isShuffle ? 'text-[#f50]' : ''}
        />
      </button>
      <button onClick={() => setIsRepeat((prev) => !prev)} className="p-2">
        <BsRepeat
          size={20}
          className={isRepeat ? 'text-[#f50]' : ''}
        />
      </button>
      <button onClick={handleLike} className="p-2">
        {isLiked ? (
          <BsHeartFill size={20} className="text-red-500" />
        ) : (
          <BsHeart size={20} />
        )}
      </button>
    </div>
  );
};
