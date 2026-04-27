// GameZones.jsx - Componente para mostrar zonas del juego (Library, Graveyard, Exile)

import { useTheme } from '../../shared/hooks/useTheme';
import CardDisplay from '../../card/components/CardDisplay';

export default function GameZones({ playerState, onDrawCards }) {
  const { theme } = useTheme();

  const zones = [
    { name: 'Biblioteca', cards: playerState.zones.library, icon: '📚' },
    { name: 'Cementerio', cards: playerState.zones.graveyard, icon: '⚰️' },
    { name: 'Exilio', cards: playerState.zones.exile, icon: '🚫' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginTop: '16px'
    }}>
      {zones.map((zone) => (
        <div
          key={zone.name}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: `1px solid ${theme.colors.primary}40`,
            borderRadius: '6px',
            padding: '12px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <h4 style={{
              margin: 0,
              color: theme.colors.text,
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {zone.icon} {zone.name}
            </h4>
            <span style={{
              backgroundColor: theme.colors.primary,
              color: '#000',
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              {zone.cards.length}
            </span>
          </div>

          {zone.name === 'Biblioteca' && zone.cards.length > 0 && (
            <button
              onClick={() => onDrawCards && onDrawCards(1)}
              style={{
                width: '100%',
                padding: '6px',
                marginBottom: '8px',
                fontSize: '11px',
                backgroundColor: theme.colors.primary,
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              Robar 1
            </button>
          )}

          {zone.cards.length > 0 ? (
            <div style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {zone.cards.slice(0, 3).map((card, idx) => (
                <CardDisplay
                  key={card.id || idx}
                  card={zone.name === 'Biblioteca' ? null : card}
                  size="small"
                  isInteractive={false}
                />
              ))}
              {zone.cards.length > 3 && (
                <div style={{
                  width: '70px',
                  height: '100px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(211, 166, 37, 0.1)',
                  border: `1px dashed ${theme.colors.primary}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: theme.colors.textSecondary,
                  fontWeight: 'bold'
                }}>
                  +{zone.cards.length - 3}
                </div>
              )}
            </div>
          ) : (
            <div style={{
              color: theme.colors.textSecondary,
              fontSize: '11px',
              fontStyle: 'italic',
              padding: '10px',
              textAlign: 'center'
            }}>
              Vacío
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
