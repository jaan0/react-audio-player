import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tracks } from '../data/tracks';
import MusicPlayer from './MusicPlayer';
import { Track } from '../data/tracks';
import MusicControl from './MusicControl';

const ArtistPage: React.FC = () => {
  const { artistName } = useParams<{ artistName: string }>();
  
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

    {currentTrack && <MusicPlayer track={currentTrack} />}

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleTrackChange = (newIndex: number) => {
    setCurrentTrackIndex(newIndex);
  };


  // Filter tracks by the artist name
  const artistTracks = tracks.filter(track => track.artist === artistName);

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track);
  };

  return (
    <>
      <div className='artist-header'>
        <div className='album-container'>
          <img 
            src={artistTracks[0].thumbnail} 
            alt={artistName} 
            className='album-cover' 
          />
        </div>
        <div className='album-info'>
          <h1 className='album-title'>{artistName}</h1>
          <h2 className='album-type'>Album</h2>
        </div>
      </div>

      <div className="album-details">
        {artistTracks.map(track => (
          <div 
            key={track.id} 
            className="p-4 rounded-md flex justify-between items-center"
            onClick={() => handleTrackClick(track)}
          >
            <MusicPlayer track={track} />
          </div>
        ))}
        <hr className='album-divider' />
        <MusicControl 
          track={artistTracks[currentTrackIndex]} 
          tracks={artistTracks} 
          currentTrackIndex={currentTrackIndex} 
          onTrackChange={handleTrackChange} 
        />
      </div>
    </>
  );
};

export default ArtistPage;
