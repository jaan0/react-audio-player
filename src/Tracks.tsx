import React, { useState } from 'react';
import { tracks, Track } from './data/tracks';
import Player from './components/Player';
import TrackList from './components/TrackList';
import ArtistList from './components/ArtistList';

const Tracks: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<string>('');

  const filteredTracks = selectedArtist
    ? tracks.filter((track) => track.artist === selectedArtist)
    : tracks;

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleSelectArtist = (artist: string) => {
    setSelectedArtist(artist);
    setCurrentTrack(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#FFD700]">Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ArtistList onSelectArtist={handleSelectArtist} selectedArtist={selectedArtist} />
          <TrackList  
          tracks={filteredTracks} 
          onSelectTrack={handleSelectTrack} 
          selectedTrack={currentTrack}
          />
        </div>
        <div>
          {currentTrack && <Player track={currentTrack} />}
        </div>
      </div>
    </div>
  );
};

export default Tracks;
