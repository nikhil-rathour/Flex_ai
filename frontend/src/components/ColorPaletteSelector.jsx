import { useState, useEffect } from 'react';
import api from '../services/authService';

const ColorPaletteSelector = ({ onPaletteSelect }) => {
  const [palettes, setPalettes] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState(null);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const response = await api.get('/palettes');
        setPalettes(response.data);
      } catch (error) {
        console.error('Failed to fetch palettes:', error);
      }
    };
    fetchPalettes();
  }, []);

  const handleSelect = (palette) => {
    setSelectedPalette(palette.id);
    onPaletteSelect(palette);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3">Color Palette</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {palettes.map((palette) => (
          <div
            key={palette.id}
            onClick={() => handleSelect(palette)}
            className={`cursor-pointer p-4 rounded-lg border-2 transition ${
              selectedPalette === palette.id
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <h3 className="font-semibold mb-3">{palette.name}</h3>
            <div className="flex gap-2">
              {Object.entries(palette.colors).map(([key, color]) => (
                <div
                  key={key}
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: color }}
                  title={key}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteSelector;
