import React, { useState, useEffect, useRef } from 'react';
import { tracks } from '../data/tracks';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail: string;
}

const SongOfTheDay: React.FC = () => {
  const [songOfTheDay, setSongOfTheDay] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const randomSong = tracks[randomIndex];
    setSongOfTheDay(randomSong);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleViewMore = () => {
    navigate('/tracks');
  };

  if (!songOfTheDay) return null;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-xs">
        <img src={songOfTheDay.thumbnail} alt={songOfTheDay.title} className="w-full h-40 object-cover rounded-md mb-2" />
        <div className="text-center">
          <h3 className="text-md font-semibold truncate text-[#FF0000] uppercase">{songOfTheDay.title}</h3>
          <p className="text-sm text-gray-600 truncate ">{songOfTheDay.author}</p>
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={togglePlay}
            className="bg-[#FF0000] text-white p-1 rounded-full hover:bg-[#FF0000] transition-colors w-8 h-8 flex items-center justify-center"
          >
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
          </button>
        </div>
        <div className='flex justify-center mt-4'>
          <button
            onClick={handleViewMore}
            className="bg-[#FF0000] text-white px-4 py-2 rounded-md hover:bg-[#FF0000] transition-colors"
          >
            View More
          </button>
        </div>
        <audio ref={audioRef} src={songOfTheDay.src} />
      </div>
    </div>
  );
};

export default SongOfTheDay;
