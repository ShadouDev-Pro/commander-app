// CardDisplay.jsx - Componente para mostrar una carta en formato compacto y interactivo

import { useTheme } from '../../shared/hooks/useTheme';

export default function CardDisplay({ 
  card, 
  selected, 
  onSelect, 
  onPlay, 
  isInteractive, 
  isTapped, 
  isDamaged,
  size = 'medium' // small, medium, large
}) {
  const { theme } = useTheme();

  if (!card) return null;

  const handleClick = () => {
    if (isInteractive && onSelect) {
      onSelect(card.id);
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    if (onPlay) {
      onPlay(card.id);
    }
  };

  const sizeStyles = {
    small: { width: '70px', height: '100px', fontSize: '7px', padding: '4px' },
    medium: { width: '100px', height: '140px', fontSize: '9px', padding: '8px' },
    large: { width: '150px', height: '210px', fontSize: '11px', padding: '10px' }
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        ...currentSize,
        border: selected ? `3px solid ${theme.colors.primary}` : `2px solid rgba(211, 166, 37, 0.5)`,
        borderRadius: '8px',
        backgroundColor: theme.colors.card || 'rgba(20, 20, 30, 0.9)',
        cursor: isInteractive ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
        transform: isTapped ? 'rotate(90deg)' : 'rotate(0deg)',
        opacity: isDamaged ? 0.7 : 1,
        boxShadow: selected 
          ? `0 0 15px ${theme.colors.primary}80` 
          : `0 0 5px ${theme.colors.primary}30`,
        color: theme.colors.text
      }}
    >
      {/* Nombre y Maná */}
      <div style={{ 
        fontSize: `calc(${currentSize.fontSize} * 1.1)`, 
        fontWeight: 'bold', 
        color: '#FFE5B4', 
        textOverflow: 'ellipsis', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap',
        marginBottom: '2px'
      }}>
        {card.name}
      </div>

      {/* Maná */}
      {card.mana && (
        <div style={{ fontSize: currentSize.fontSize, color: '#FFD700', fontWeight: 'bold', marginBottom: '2px' }}>
          {card.mana}
        </div>
      )}

      {/* Tipo */}
      <div style={{ 
        fontSize: `calc(${currentSize.fontSize} * 0.85)`, 
        color: '#BBBBBB', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
        marginBottom: '2px'
      }}>
        {card.type}
      </div>

      {/* Power/Toughness */}
      {card.power && card.toughness && (
        <div style={{ 
          fontSize: currentSize.fontSize, 
          fontWeight: 'bold', 
          color: '#FFD700', 
          textAlign: 'right',
          marginTop: 'auto'
        }}>
          {card.power}/{card.toughness}
        </div>
      )}

      {/* Loyalty */}
      {card.loyalty && (
        <div style={{ 
          fontSize: currentSize.fontSize, 
          fontWeight: 'bold', 
          color: '#FFD700', 
          textAlign: 'right',
          marginTop: 'auto'
        }}>
          {card.loyalty}
        </div>
      )}

      {/* Daño en la carta */}
      {isDamaged && (
        <div style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          backgroundColor: '#CC0000',
          color: 'white',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `calc(${currentSize.fontSize} * 1.2)`,
          fontWeight: 'bold'
        }}>
          {isDamaged}
        </div>
      )}

      {/* Indicador de Girado */}
      {isTapped && (
        <div style={{
          position: 'absolute',
          top: '2px',
          left: '2px',
          backgroundColor: 'rgba(255, 215, 0, 0.3)',
          borderRadius: '50%',
          width: '16px',
          height: '16px'
        }} title="Girada" />
      )}

      {/* Botón para jugar */}
      {isInteractive && onPlay && (
        <button
          onClick={handlePlay}
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '24px',
            height: '24px',
            padding: 0,
            fontSize: `calc(${currentSize.fontSize} * 1.5)`,
            backgroundColor: '#D3A625',
            color: '#000',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ':hover': {
              backgroundColor: '#FFD700'
            }
          }}
          title="Jugar carta"
        >
          ▶
        </button>
      )}
    </div>
  );
}