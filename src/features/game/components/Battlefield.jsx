// Battlefield.jsx - Zona del campo de batalla

import { useTheme } from '../../shared/hooks/useTheme';
import CardDisplay from '../../card/components/CardDisplay';

export default function Battlefield({ 
  cards, 
  playerName,
  selectedCards,
  onSelectCard,
  onTapCard,
  onSacrificeCard
}) {
  const { theme } = useTheme();

  if (!cards || cards.length === 0) {
    return (
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: `2px dashed ${theme.colors.primary}40`,
        borderRadius: '8px',
        padding: '20px',
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.textSecondary
      }}>
        <p>No hay permanentes en el campo de batalla</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      border: `2px solid ${theme.colors.primary}40`,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px'
    }}>
      <h3 style={{
        margin: '0 0 12px 0',
        color: theme.colors.primary,
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Campo de Batalla - {playerName}
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '12px'
      }}>
        {cards.map((card) => (
          <div key={card.id} style={{ position: 'relative' }}>
            <CardDisplay
              card={card}
              selected={selectedCards?.has(card.id)}
              onSelect={onSelectCard}
              isInteractive={true}
              isTapped={card.isTapped}
              isDamaged={card.damageOnCard}
              size="medium"
            />
            
            {/* Botones de acción */}
            <div style={{
              display: 'flex',
              gap: '4px',
              marginTop: '4px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => onTapCard(card.id)}
                style={{
                  padding: '2px 6px',
                  fontSize: '9px',
                  backgroundColor: card.isTapped ? '#FFD700' : '#666',
                  color: card.isTapped ? '#000' : '#FFF',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  flex: 1,
                  minWidth: '40px'
                }}
              >
                {card.isTapped ? '↶' : '↻'}
              </button>
              
              <button
                onClick={() => onSacrificeCard(card.id)}
                style={{
                  padding: '2px 6px',
                  fontSize: '9px',
                  backgroundColor: '#CC0000',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  flex: 1,
                  minWidth: '40px'
                }}
              >
                ✗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
