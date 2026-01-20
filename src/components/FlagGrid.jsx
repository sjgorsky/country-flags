import React from 'react';
import FlagCard from './FlagCard';

const FlagGrid = ({ onFlagClick, items = [], type = 'countries' }) => {
  const emptyMessage = type === 'countries' ? 'No countries found' : 'No states found';

  return (
    <div className="w-full h-full overflow-y-auto">
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-0">
          {items.map((item) => (
            <div key={item.code} className="aspect-[3/2]">
              <FlagCard item={item} onClick={onFlagClick} type={type} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlagGrid;
