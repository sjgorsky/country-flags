import React from 'react';

const FlagCard = ({ country }) => {
  // Convert country code to lowercase for flagpedia.net API
  const countryCode = country.code.toLowerCase();
  // Use width-based size from flagpedia.net API (w320 = 320px width, maintains 3:2 aspect ratio)
  const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;

  return (
    <div className="group relative w-full h-full overflow-hidden">
      <img
        src={flagUrl}
        alt={`Flag of ${country.name}`}
        className="w-full h-full object-cover border-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="text-center text-white">
          <p className="text-sm font-bold mb-1">{country.code}</p>
          <p className="text-xs">{country.name}</p>
        </div>
      </div>
    </div>
  );
};

export default FlagCard;
