import React from 'react';
import FlagGrid from './components/FlagGrid';

const App = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm z-10 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            World Flags
          </h1>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <FlagGrid />
      </main>
    </div>
  );
};

export default App;
