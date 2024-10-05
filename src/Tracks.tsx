import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AudioPlayer } from './components/AudioPlayer';
import { PlayList } from './components/PlayList';

const Tracks: React.FC = () => {
  return (<>
    <div>
      
      <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-5 text-white">
                  All Tracks Here..
                </h1>
                <PlayList />    
                
              </div>
            } />
            <Route path="/tracks" element={<PlayList />} />
            {/* Add routes for About and Contact if you have those components */}
          </Routes>
        </main>
    <br />
        <AudioPlayer/>
    </div>
  </>
  );
};

export default Tracks;
