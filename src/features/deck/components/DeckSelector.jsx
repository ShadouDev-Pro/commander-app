// DeckSelector.jsx - Componente para seleccionar un deck

import { useState } from 'react';
import { useTheme } from '../../shared/hooks/useTheme';
import Button from '../../shared/components/Button';
import { sampleDecks } from '../sampleDecks';
import DeckPreview from './DeckPreview';

export default function DeckSelector({ onDeckSelect, selectedDeckId }) {
  const { theme } = useTheme();
  const [selected, setSelected] = useState(selectedDeckId || null);

  const handleSelect = (deckId) => {
    setSelected(deckId);
    onDeckSelect(deckId);
  };

  const selectedDeck = selected ? sampleDecks.find(d => d.id === selected) : null;

  return (
    <div style={{ marginBottom: '35px' }}>
      <h3
        style={{
          marginTop: 0,
          marginBottom: '15px',
          fontSize: '14px',
          color: theme.colors.text,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 'bold',
        }}
      >
        Seleccionar Deck
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sampleDecks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => handleSelect(deck.id)}
            style={{
              padding: '15px',
              borderRadius: '8px',
              background: selected === deck.id ? 'rgba(211, 166, 37, 0.2)' : theme.colors.card,
              border: `2px solid ${selected === deck.id ? theme.colors.warning : 'rgba(211, 166, 37, 0.2)'}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: theme.colors.text, fontSize: '16px' }}>
                {deck.name}
              </h4>
              <p style={{ margin: '5px 0 0 0', color: theme.colors.textSecondary, fontSize: '12px' }}>
                Commander: {deck.commander.name} ({deck.commander.mana})
              </p>
              <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                {deck.colors.map((color) => (
                  <span
                    key={color}
                    style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: getManaColor(color),
                    }}
                  />
                ))}
              </div>
            </div>
            {selected === deck.id && (
              <div style={{ color: theme.colors.warning, fontSize: '20px' }}>✓</div>
            )}
          </div>
        ))}
      </div>

      {selectedDeck && <DeckPreview deck={selectedDeck} />}
    </div>
  );
}

// Función auxiliar para colores de maná
function getManaColor(color) {
  const colors = {
    W: '#FFFBD5', // Blanco
    U: '#0E68AB', // Azul
    B: '#150B00', // Negro
    R: '#D3202A', // Rojo
    G: '#00733E', // Verde
  };
  return colors[color] || '#D3A625'; // Oro por defecto
}