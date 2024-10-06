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

  return (<div className="flex items-center justify-center min-h-screen p-4">
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-xs">
      <img src={songOfTheDay.thumbnail} alt={songOfTheDay.title} className="w-full h-40 object-cover rounded-md mb-2" />
      <div className="text-center">
        <h3 className="text-md font-semibold truncate">{songOfTheDay.title}</h3>
        <p className="text-sm text-gray-600 truncate">{songOfTheDay.author}</p>
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={togglePlay}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <br />
      <div className='flex justify-center'>
      <button
          onClick={handleViewMore}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          View More
        </button>
      </div>
      <audio ref={audioRef} src={songOfTheDay.src} />
    </div>
  </div>);
};

export default SongOfTheDay;
