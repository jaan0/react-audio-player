import React, { useState } from 'react';

export type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void; 
}

const MusicPlayer: React.FC<{ track: { title: string; artist: string; src: string; thumbnail: string } }> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
      <div className="flex-start mr-20">
        <div>
          <h3 className="font-semibold">{track.title}</h3>
          <p className="text-sm text-gray-400">{track.artist}</p>
        </div>
      </div>
      <div className="flex flex-row ml-20">
        <button onClick={togglePlay} className="text-green-500">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <audio ref={audioRef} src={track.src} />
      </div>
    </div>
  );
};

export default MusicPlayer;