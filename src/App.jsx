import React from 'react';
import { Scene } from './components/3D/Scene';
import { Controls } from './components/UI/Controls';
import { Settings } from './components/UI/Settings';
import { ArrayDisplay } from './components/UI/ArrayDisplay';
import { SearchResultModal } from './components/UI/SearchResultModal';

import { useStore } from './store/useStore';

function App() {
  const visualizationMode = useStore((state) => state.visualizationMode);

  return (
    <div className="w-full h-screen relative overflow-hidden text-white font-sans">
      {/* 3D Background Scene */}
      <Scene />
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-10">
        
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <Settings />
          {visualizationMode === '1D_ARRAY' && <ArrayDisplay />}
        </div>
        
        {/* Bottom Section */}
        <div className="flex justify-center pb-8">
          <Controls />
        </div>
        
      </div>

      {/* Modals */}
      <SearchResultModal />
    </div>
  );
}

export default App;
