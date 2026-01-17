import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/authService';

const ColorPalettePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;
  const [palettes, setPalettes] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState(null);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const response = await api.get('http://localhost:4000/api/palettes');
        setPalettes(response.data);
      } catch (error) {
        console.error('Failed to fetch palettes:', error);
      }
    };
    fetchPalettes();
  }, []);

  const handleSelect = (palette) => {
    setSelectedPalette(palette.id);
  };

  const handleContinue = () => {
    const palette = palettes.find(p => p.id === selectedPalette);
    navigate('/form', { state: { selectedPalette: palette, username } });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px' }}>
            Choose Your Color Palette
          </h1>
          <p style={{ fontSize: '16px', color: '#666', fontWeight: '400' }}>
            Select a color scheme for your website
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {palettes.map((palette) => (
            <div
              key={palette.id}
              onClick={() => handleSelect(palette)}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedPalette === palette.id ? '3px solid #1a1a1a' : '3px solid transparent',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: selectedPalette === palette.id 
                  ? '0 4px 12px rgba(0,0,0,0.15)' 
                  : '0 2px 8px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={(e) => {
                if (selectedPalette !== palette.id) {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPalette !== palette.id) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }
              }}
            >
              {Object.values(palette.colors).slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  style={{
                    height: '25%',
                    backgroundColor: color,
                    width: '100%'
                  }}
                />
              ))}
              {selectedPalette === palette.id && (
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleContinue}
            disabled={!selectedPalette}
            style={{
              padding: '14px 48px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              backgroundColor: selectedPalette ? '#1a1a1a' : '#ccc',
              border: 'none',
              borderRadius: '12px',
              cursor: selectedPalette ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              boxShadow: selectedPalette ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedPalette) {
                e.currentTarget.style.backgroundColor = '#333';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPalette) {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPalettePage;
