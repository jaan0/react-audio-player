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

  return (<>
    <div className='bg-[#121212] text-white p-6 flex flex-col md:flex-row'>
        <div className='flex-none w-full md:w-1/3 h-48 bg-[#181818] mb-4 md:mb-0'>
            <div className='flex-none w-full h-48'>
            <img 
          src={artistTracks[0].thumbnail} 
          alt={artistName} 
          className='w-full h-full object-cover rounded-md' />
            </div>
        </div>
      <div className='flex-grow'>
        <h1 className='text-3xl font-bold mb-2'>{artistName}</h1>
        <h2 className='text-small mb-4'>Album</h2>
        <br /> <br /> <br /> <br /><br /> <br />
        <div className="grid grid-cols-1 gap-4">
          {artistTracks.map(track => (
            <div 
            key={track.id} 
            className="p-4 rounded-md flex justify-between items-center"
            onClick={() => handleTrackClick(track)}
            >
              <MusicPlayer track={track} />
            </div>
          ))}
          <MusicControl track={artistTracks[currentTrackIndex]} 
          tracks={artistTracks} 
          currentTrackIndex={currentTrackIndex} 
          onTrackChange={handleTrackChange} />
        </div>
      </div>
    </div>
  </>);
};

export default ArtistPage;
