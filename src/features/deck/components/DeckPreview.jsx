// DeckPreview.jsx - Componente para previsualizar un deck

import { useTheme } from '../../shared/hooks/useTheme';
import CardDisplay from '../../card/components/CardDisplay';

export default function DeckPreview({ deck }) {
  const { theme } = useTheme();

  if (!deck) return null;

  return (
    <div style={{
      padding: '15px',
      borderRadius: '8px',
      background: 'rgba(211, 166, 37, 0.1)',
      border: '1px solid rgba(211, 166, 37, 0.3)',
      marginTop: '10px',
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: theme.colors.text }}>
        Commander: {deck.commander.name}
      </h4>
      <div style={{ fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '10px' }}>
        {deck.commander.mana} - {deck.commander.type}
      </div>
      <div style={{ fontSize: '10px', color: theme.colors.text, marginBottom: '10px' }}>
        {deck.commander.text}
      </div>
      {deck.cards.length > 0 && (
        <div>
          <h5 style={{ margin: '10px 0 5px 0', color: theme.colors.text }}>
            Cartas ({deck.cards.length}):
          </h5>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {deck.cards.slice(0, 5).map(card => (
              <CardDisplay key={card.id} card={card} />
            ))}
            {deck.cards.length > 5 && (
              <div style={{
                padding: '10px',
                margin: '5px',
                borderRadius: '6px',
                background: theme.colors.card,
                border: '1px solid rgba(211, 166, 37, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: theme.colors.textSecondary,
              }}>
                +{deck.cards.length - 5} más
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}