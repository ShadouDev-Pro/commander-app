// Hand.jsx - Zona de mano del jugador

import { useTheme } from '../../shared/hooks/useTheme';
import CardDisplay from '../../card/components/CardDisplay';

export default function Hand({ 
  cards, 
  selectedCards,
  onSelectCard,
  onPlayCard,
  onDiscardCard
}) {
  const { theme } = useTheme();

  if (!cards || cards.length === 0) {
    return (
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: `2px dashed ${theme.colors.primary}40`,
        borderRadius: '8px',
        padding: '20px',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.textSecondary
      }}>
        <p>Mano vacía</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      border: `2px solid ${theme.colors.primary}40`,
      borderRadius: '8px',
      padding: '16px'
    }}>
      <h3 style={{
        margin: '0 0 12px 0',
        color: theme.colors.primary,
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Mano ({cards.length} cartas)
      </h3>
      
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        overscrollBehavior: 'contain'
      }}>
        {cards.map((card) => (
          <div key={card.id} style={{ flexShrink: 0 }}>
            <CardDisplay
              card={card}
              selected={selectedCards?.has(card.id)}
              onSelect={onSelectCard}
              onPlay={onPlayCard}
              isInteractive={true}
              size="small"
            />
            
            {/* Botón descartar */}
            <button
              onClick={() => onDiscardCard(card.id)}
              style={{
                width: '100%',
                padding: '2px',
                marginTop: '2px',
                fontSize: '8px',
                backgroundColor: 'rgba(200, 0, 0, 0.6)',
                color: '#FFF',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Descartar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
