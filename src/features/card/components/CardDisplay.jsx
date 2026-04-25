// CardDisplay.jsx - Componente para mostrar una carta

import { useTheme } from '../../shared/hooks/useTheme';

export default function CardDisplay({ card }) {
  const { theme } = useTheme();

  return (
    <div style={{
      padding: '10px',
      margin: '5px',
      borderRadius: '6px',
      background: theme.colors.card,
      border: '1px solid rgba(211, 166, 37, 0.3)',
      minWidth: '150px',
      fontSize: '12px',
    }}>
      <div style={{ fontWeight: 'bold', color: theme.colors.text }}>
        {card.name}
      </div>
      <div style={{ color: theme.colors.textSecondary, margin: '2px 0' }}>
        {card.mana} - {card.type}
      </div>
      <div style={{ color: theme.colors.text, fontSize: '10px' }}>
        {card.text.length > 50 ? card.text.substring(0, 50) + '...' : card.text}
      </div>
    </div>
  );
}