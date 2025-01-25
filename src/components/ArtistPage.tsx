import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { tracks } from '../data/tracks';
import MusicControl from './MusicControl';

const ArtistPage: React.FC = () => {
  const { artistName } = useParams<{ artistName: string }>();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durations, setDurations] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const artistTracks = tracks.filter(track => track.artist === artistName);

  useEffect(() => {
    // Load durations for all tracks
    const loadDurations = async () => {
      const durationsArray = await Promise.all(
        artistTracks.map(track => {
          return new Promise<number>((resolve) => {
            const audio = new Audio(track.src);
            audio.onloadedmetadata = () => {
              resolve(audio.duration);
            };
          });
        })
      );
      setDurations(durationsArray);
    };

    loadDurations();
  }, [artistTracks]);

  useEffect(() => {
    if (artistTracks.length > 0) {
      const currentTrack = artistTracks[currentTrackIndex];
      audioRef.current.src = currentTrack.src;
      audioRef.current.preload = 'auto';

      const handleCanPlayThrough = () => {
        console.log("Audio can play through without buffering.");
        if (isPlaying) {
          audioRef.current.play().catch(error => {
            console.error("Error playing audio:", error);
          });
        }
      };

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

      return () => {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.pause();
      };
    }
  }, [currentTrackIndex, isPlaying, artistTracks]);

  const handleTrackChange = (newIndex: number) => {
    setCurrentTrackIndex(newIndex);
    setIsPlaying(false); // Reset playing state
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const calculateTotalDuration = (durations: number[]): string => {
    if (durations.length === 0) return '0 min 0 sec'; // Handle empty array case

    const totalSeconds = durations.reduce((acc, duration) => acc + duration, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60); // Use floor for exact seconds

    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className='artist-page'>
      <div className='album-header'>
        <div className='album-container'>
          <img 
            src={artistTracks[0]?.thumbnail} 
            alt={artistName} 
            className='album-cover' 
          />
          <div className='album-info'>
            <h2 className='album-type'>Album</h2>
            <h1 className='album-title'>{artistName}</h1>
            <div className='artist-details'>
              <img src={artistTracks[0].thumbnail} alt={artistName} className='artist-image' />
              <span className='artist-name'>{artistName}</span> ● 
                <span className='track-info'> 
                {artistTracks.length} songs, {calculateTotalDuration(durations)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='album-details'>
        <div className='album-controls'>
        {/* Add play and other control buttons here */}
        </div>
        <table className='track-list'>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
            {artistTracks.map((track, index) => (
              <tr 
                key={track.id} 
                onClick={() => handleTrackChange(index)}
                className="hover:cursor-pointer"
              >
                <td>{index + 1}</td>
                <td>{track.title}</td>
                <td>{durations[index] !== undefined && durations[index] !== null 
                        ? formatDuration(durations[index]) 
                        : 'loading...'}</td>
                <td>
                  <button onClick={(e) => {
                    e.stopPropagation(); // Prevents the row's onClick from firing
                    handleTrackChange(index);
                    handlePlayPause();
                  }}>
                    {isPlaying && currentTrackIndex === index ? '⏸' : '▶'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <MusicControl 
          track={artistTracks[currentTrackIndex]} 
          tracks={artistTracks} 
          currentTrackIndex={currentTrackIndex} 
          onTrackChange={handleTrackChange} 
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      </div>
    </div>
  );
};

export default ArtistPage;
