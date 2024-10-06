import { ChangeEvent, RefObject, useEffect, useState } from 'react';

import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';

interface VolumeControlProps {
  audioRef: RefObject<HTMLAudioElement>;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ audioRef }) => {
  const [volume, setVolume] = useState<number>(60);
  const [muteVolume, setMuteVolume] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff size={25} />
          ) : volume < 40 ? (
            <IoMdVolumeLow size={25} />
          ) : (
            <IoMdVolumeHigh size={25} />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          className="volumn"
          onChange={handleVolumeChange}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};
