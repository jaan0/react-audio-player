import React, { useState, useEffect } from 'react';
import { tracks, Track } from '../data/tracks';
import TrackList from '../components/TrackList';
import ArtistList from '../components/ArtistList';
import { useAudio } from '../context/AudioContext';

const Tracks: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const { setCurrentTrack, setIsPlaying } = useAudio();

  const filteredTracks = selectedArtist
    ? tracks.filter((track) => track.artist === selectedArtist)
    : tracks;

  const handleSelectTrack = (track: Track) => {
    console.log('Selected track:', track);
    setSelectedTrack(track);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleSelectArtist = (artist: string) => {
    console.log('Selected artist:', artist);
    setSelectedArtist(artist);
  };

  useEffect(() => {
    console.log('Current selected artist:', selectedArtist);
    console.log('Filtered tracks:', filteredTracks);
  }, [selectedArtist, filteredTracks]);

  return (
    <div className="w-full bg-red-500 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Tracks</h1>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <ArtistList onSelectArtist={handleSelectArtist} selectedArtist={selectedArtist} />
            <TrackList 
              tracks={filteredTracks} 
              onSelectTrack={handleSelectTrack} 
              selectedTrack={selectedTrack} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
