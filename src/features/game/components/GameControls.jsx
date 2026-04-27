// GameControls.jsx - Controles del turno y fases del juego

import { useTheme } from '../../shared/hooks/useTheme';

export default function GameControls({
  currentPhase,
  currentPlayerName,
  onNextPhase,
  onDrawCard,
  onResetGame,
  gameOver,
  winner
}) {
  const { theme } = useTheme();

  const phaseNames = {
    beginning: 'Fase de Inicio',
    main: 'Primera Fase Principal',
    combat: 'Fase de Combate',
    main2: 'Segunda Fase Principal',
    ending: 'Fase Final'
  };

  if (gameOver) {
    return (
      <div style={{
        backgroundColor: 'rgba(0, 100, 0, 0.2)',
        border: `3px solid #00CC00`,
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#00CC00',
          margin: '0 0 12px 0',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          🎊 ¡JUEGO TERMINADO! 🎊
        </h2>
        <p style={{
          color: theme.colors.text,
          fontSize: '18px',
          margin: '0 0 16px 0'
        }}>
          <strong>{winner}</strong> es el ganador
        </p>
        <button
          onClick={onResetGame}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: theme.colors.primary,
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
        >
          Nueva Partida
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      border: `2px solid ${theme.colors.primary}40`,
      borderRadius: '8px',
      padding: '16px'
    }}>
      {/* Fase Actual */}
      <div style={{
        marginBottom: '16px',
        padding: '12px',
        backgroundColor: `rgba(211, 166, 37, 0.1)`,
        borderRadius: '6px',
        border: `1px solid ${theme.colors.primary}40`
      }}>
        <p style={{
          margin: '0 0 6px 0',
          color: theme.colors.textSecondary,
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Fase Actual
        </p>
        <h3 style={{
          margin: 0,
          color: theme.colors.primary,
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          {phaseNames[currentPhase]}
        </h3>
        <p style={{
          margin: '6px 0 0 0',
          color: theme.colors.textSecondary,
          fontSize: '12px'
        }}>
          Turno de {currentPlayerName}
        </p>
      </div>

      {/* Botones de Control */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
      }}>
        <button
          onClick={onDrawCard}
          style={{
            padding: '12px',
            fontSize: '13px',
            backgroundColor: '#0066CC',
            color: '#FFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            gridColumn: '1'
          }}
        >
          📥 Robar Carta
        </button>

        <button
          onClick={onNextPhase}
          style={{
            padding: '12px',
            fontSize: '13px',
            backgroundColor: theme.colors.primary,
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            gridColumn: '2'
          }}
        >
          ⏭️ Siguiente Fase
        </button>

        <button
          onClick={onResetGame}
          style={{
            padding: '10px',
            fontSize: '12px',
            backgroundColor: '#666',
            color: '#FFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            gridColumn: '1 / -1'
          }}
        >
          Abandonar Partida
        </button>
      </div>

      {/* Información de Fases */}
      <div style={{
        marginTop: '12px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '4px',
        fontSize: '10px',
        color: theme.colors.textSecondary,
        lineHeight: '1.6'
      }}>
        <p style={{ margin: 0 }}>
          <strong>Orden de fases:</strong> Inicio → Principal 1 → Combate → Principal 2 → Final
        </p>
      </div>
    </div>
  );
}
