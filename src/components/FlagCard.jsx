import React from 'react';

const FlagCard = ({ item, onClick, type = 'countries' }) => {
  // For countries: use lowercase country code
  // For US states: use us-{stateCode} format
  const code = type === 'countries' 
    ? item.code.toLowerCase()
    : `us-${item.code.toLowerCase()}`;
  
  // Use width-based size from flagpedia.net API (w320 = 320px width, maintains 3:2 aspect ratio)
  const flagUrl = `https://flagcdn.com/w320/${code}.png`;

  return (
    <div 
      className="group relative w-full h-full overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
    >
      <img
        src={flagUrl}
        alt={`Flag of ${item.name}`}
        className="w-full h-full object-cover border-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="text-center text-white">
          <p className="text-sm font-bold mb-1">{item.code}</p>
          <p className="text-xs">{item.name}</p>
        </div>
      </div>
    </div>
  );
};

export default FlagCard;
