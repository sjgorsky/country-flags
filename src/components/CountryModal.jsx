import React, { useState, useEffect } from 'react';

const CountryModal = ({ country, isOpen, onClose }) => {
  const [outlineError, setOutlineError] = useState(false);
  
  // Reset error state when country changes
  useEffect(() => {
    setOutlineError(false);
  }, [country]);
  
  if (!isOpen || !country) return null;

  const countryCode = country.code.toLowerCase();
  
  // Using a service for country outline SVGs
  // This uses a CDN that provides country shape SVGs
  // Alternative: Could use GeoJSON with a mapping library like react-simple-maps
  const outlineUrl = `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${countryCode}/vector.svg`;

  const handleImageError = () => {
    setOutlineError(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{country.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Country Outline</h3>
            <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center min-h-[300px] border-2 border-gray-200">
              {outlineError ? (
                <div className="text-gray-400 text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <p className="text-sm">Outline not available for {country.name}</p>
                </div>
              ) : (
                <img
                  src={outlineUrl}
                  alt={`Outline of ${country.name}`}
                  className="max-w-full max-h-[400px] object-contain"
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;
