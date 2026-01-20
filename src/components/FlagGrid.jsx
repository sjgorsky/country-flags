import React from 'react';
import FlagCard from './FlagCard';

const FlagGrid = ({ onFlagClick, countries = [] }) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {countries.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No countries found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-0">
          {countries.map((country) => (
            <div key={country.code} className="aspect-[3/2]">
              <FlagCard country={country} onClick={onFlagClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlagGrid;
