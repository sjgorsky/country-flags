import React, { useState, useEffect } from 'react';

const CountryModal = ({ country, isOpen, onClose, type = 'countries' }) => {
  const [outlineError, setOutlineError] = useState(false);
  const [svgPath, setSvgPath] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Reset error state and SVG path when country changes
  useEffect(() => {
    setOutlineError(false);
    setSvgPath(null);
    setLoading(false);
    
    // Fetch state outline if it's a US state
    if (type === 'states' && country) {
      fetchStateOutline(country.code);
    }
  }, [country, type]);
  
  const fetchStateOutline = async (stateCode) => {
    setLoading(true);
    try {
      // Use theunitedstates.io API for state GeoJSON
      const response = await fetch(
        `https://theunitedstates.io/districts/states/${stateCode}/shape.geojson`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch outline');
      }
      
      const geoJson = await response.json();
      
      // Convert GeoJSON to SVG path
      // Simple conversion: extract coordinates and create path
      if (geoJson.features && geoJson.features.length > 0) {
        const path = geoJsonToSvgPath(geoJson);
        setSvgPath(path);
      } else {
        throw new Error('No features found');
      }
    } catch (error) {
      console.error('Error fetching state outline:', error);
      setOutlineError(true);
    } finally {
      setLoading(false);
    }
  };
  
  // GeoJSON to SVG path converter (handles Polygon and MultiPolygon)
  const geoJsonToSvgPath = (geoJson) => {
    if (!geoJson.features || geoJson.features.length === 0) return null;
    
    const feature = geoJson.features[0];
    if (!feature.geometry) return null;
    
    let allCoordinates = [];
    
    // Handle Polygon
    if (feature.geometry.type === 'Polygon') {
      allCoordinates = feature.geometry.coordinates[0]; // Use outer ring
    }
    // Handle MultiPolygon
    else if (feature.geometry.type === 'MultiPolygon') {
      // Use the largest polygon (usually the main landmass)
      const polygons = feature.geometry.coordinates;
      const largestPolygon = polygons.reduce((largest, current) => {
        const largestSize = largest[0].length;
        const currentSize = current[0].length;
        return currentSize > largestSize ? current : largest;
      });
      allCoordinates = largestPolygon[0];
    } else {
      return null;
    }
    
    if (allCoordinates.length === 0) return null;
    
    // Calculate bounding box for scaling
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    allCoordinates.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    if (width === 0 || height === 0) return null;
    
    // Scale to fit in 400x300 viewport with padding
    const padding = 20;
    const scale = Math.min((400 - padding * 2) / width, (300 - padding * 2) / height);
    const offsetX = -minX + padding / scale;
    const offsetY = -minY + padding / scale;
    
    // Convert to SVG path
    const pathData = allCoordinates.map(([x, y], index) => {
      const svgX = (x + offsetX) * scale;
      const svgY = (y + offsetY) * scale;
      return `${index === 0 ? 'M' : 'L'} ${svgX.toFixed(2)} ${svgY.toFixed(2)}`;
    }).join(' ') + ' Z';
    
    return {
      path: pathData,
      viewBox: `0 0 ${400} ${300}`
    };
  };
  
  if (!isOpen || !country) return null;

  // For countries: use lowercase country code
  // For US states: use us-{stateCode} format
  const code = type === 'countries' 
    ? country.code.toLowerCase()
    : `us-${country.code.toLowerCase()}`;
  
  // Using a service for country outline SVGs
  const outlineUrl = `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/vector.svg`;

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
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {type === 'countries' ? 'Country Outline' : 'State Outline'}
            </h3>
            <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center min-h-[300px] border-2 border-gray-200">
              {loading ? (
                <div className="text-gray-400 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-sm">Loading outline...</p>
                </div>
              ) : outlineError ? (
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
              ) : type === 'states' && svgPath ? (
                <svg
                  viewBox={svgPath.viewBox}
                  className="max-w-full max-h-[400px] w-full h-auto"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d={svgPath.path}
                    fill="none"
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
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
