import React, { useState } from 'react';
import FlagGrid from './components/FlagGrid';
import CountryModal from './components/CountryModal';
import { countries } from './countries';
import { usStates } from './usStates';

const App = () => {
  const [activeTab, setActiveTab] = useState('countries');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFlagClick = (item) => {
    if (activeTab === 'countries') {
      // Open modal for countries
      setSelectedCountry(item);
      setIsModalOpen(true);
    } else if (activeTab === 'states') {
      // Open Wikipedia page for US states
      const stateName = item.name.replace(/\s+/g, '_');
      const wikipediaUrl = `https://en.wikipedia.org/wiki/${stateName}`;
      window.open(wikipediaUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  // Filter items based on active tab and search query
  const getFilteredItems = () => {
    const items = activeTab === 'countries' ? countries : usStates;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredItems = getFilteredItems();
  const searchPlaceholder = activeTab === 'countries' 
    ? 'Search countries...' 
    : 'Search states...';

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm z-10 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800">
                World Flags
              </h1>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => {
                    setActiveTab('countries');
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'countries'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Countries
                </button>
                <button
                  onClick={() => {
                    setActiveTab('states');
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'states'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  US States
                </button>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <FlagGrid 
          onFlagClick={handleFlagClick} 
          items={filteredItems}
          type={activeTab}
        />
      </main>
      <CountryModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={activeTab}
      />
    </div>
  );
};

export default App;
