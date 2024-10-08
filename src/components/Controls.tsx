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

export interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
}) => {
  const {
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    skipForward,
    skipBackward,
    playNextTrack,
    playPreviousTrack,
  } = useAudioPlayerContext();

  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      <button onClick={() => setIsShuffle((prev) => !prev)}>
        <BsShuffle className={`w-5 h-5 ${isShuffle ? 'text-[#f50]' : 'text-gray-600'}`} />
      </button>
      <button onClick={playPreviousTrack}>
        <BsSkipStartFill className="w-6 h-6 text-gray-600" />
      </button>
      <button onClick={skipBackward}>
        <BsFillRewindFill className="w-6 h-6 text-gray-600" />
      </button>
      
      <button 
        onClick={onPlayPause} 
        className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600"
      >
        {isPlaying ? (
          <BsFillPauseFill className="w-8 h-8" />
        ) : (
          <BsFillPlayFill className="w-8 h-8" />
        )}
      </button>
      
      <button onClick={skipForward}>
        <BsFillFastForwardFill className="w-6 h-6 text-gray-600" />
      </button>
      <button onClick={playNextTrack}>
        <BsSkipEndFill className="w-6 h-6 text-gray-600" />
      </button>
      <button onClick={() => setIsRepeat((prev) => !prev)}>
        <BsRepeat className={`w-5 h-5 ${isRepeat ? 'text-[#f50]' : 'text-gray-600'}`} />
      </button>
      <button onClick={handleLike}>
        {isLiked ? (
          <BsHeartFill className="w-5 h-5 text-red-500" />
        ) : (
          <BsHeart className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  );
};
