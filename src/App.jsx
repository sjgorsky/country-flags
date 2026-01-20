import React, { useState } from 'react';
import FlagGrid from './components/FlagGrid';
import CountryModal from './components/CountryModal';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFlagClick = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

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
        <FlagGrid onFlagClick={handleFlagClick} />
      </main>
      <CountryModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
