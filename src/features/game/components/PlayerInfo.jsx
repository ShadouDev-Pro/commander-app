// PlayerInfo.jsx - Panel de información del jugador

import { useTheme } from '../../shared/hooks/useTheme';
import CardDisplay from '../../card/components/CardDisplay';

export default function PlayerInfo({ 
  player, 
  isCurrentPlayer,
  onChangeLife
}) {
  const { theme } = useTheme();

  const stats = {
    life: player.life,
    maxLife: player.maxLife,
    handSize: player.zones.hand.length,
    librarySize: player.zones.library.length,
    graveyardSize: player.zones.graveyard.length,
    creatures: player.zones.battlefield.filter(c => c.type?.includes('Creature')).length,
    commanderDamage: Object.values(player.commanderDamage).reduce((a, b) => a + b, 0)
  };

  const isDefeated = player.life <= 0 || stats.commanderDamage >= 21;

  return (
    <div style={{
      backgroundColor: isCurrentPlayer 
        ? `rgba(211, 166, 37, 0.15)` 
        : 'rgba(0, 0, 0, 0.3)',
      border: isCurrentPlayer 
        ? `2px solid ${theme.colors.primary}` 
        : `1px solid ${theme.colors.primary}40`,
      borderRadius: '8px',
      padding: '16px',
      minWidth: '250px',
      position: 'relative',
      opacity: isDefeated ? 0.6 : 1
    }}>
      {/* Indicador de jugador actual */}
      {isCurrentPlayer && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          backgroundColor: theme.colors.primary,
          color: '#000',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          Su Turno
        </div>
      )}

      {/* Nombre y Comandante */}
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{
          margin: '0 0 4px 0',
          color: theme.colors.text,
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {player.playerName}
        </h3>
        <p style={{
          margin: '0 0 8px 0',
          color: theme.colors.textSecondary,
          fontSize: '12px'
        }}>
          Comandante: {player.commander.name}
        </p>

        {/* Mostrar comandante */}
        <div style={{ marginBottom: '12px' }}>
          <CardDisplay
            card={player.commander}
            size="small"
            isInteractive={false}
          />
        </div>
      </div>

      {/* Vida */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: `2px solid ${stats.life <= 10 ? '#CC0000' : theme.colors.primary}`,
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: stats.life <= 10 ? '#FF6666' : theme.colors.primary,
          marginBottom: '6px'
        }}>
          {player.life}/{player.maxLife}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '6px'
        }}>
          <button
            onClick={() => onChangeLife(-1)}
            style={{
              flex: 1,
              padding: '6px',
              backgroundColor: '#CC0000',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            -1
          </button>
          <button
            onClick={() => onChangeLife(1)}
            style={{
              flex: 1,
              padding: '6px',
              backgroundColor: '#00CC00',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            +1
          </button>
          <button
            onClick={() => onChangeLife(-5)}
            style={{
              flex: 1,
              padding: '6px',
              backgroundColor: '#990000',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            -5
          </button>
        </div>
      </div>

      {/* Daño de Comandante */}
      {stats.commanderDamage > 0 && (
        <div style={{
          backgroundColor: 'rgba(200, 0, 0, 0.2)',
          border: '1px solid rgba(200, 0, 0, 0.5)',
          borderRadius: '6px',
          padding: '10px',
          marginBottom: '12px'
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#FF6666',
            marginBottom: '6px'
          }}>
            Daño de Comandante: {stats.commanderDamage}/21
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(stats.commanderDamage / 21) * 100}%`,
              height: '100%',
              backgroundColor: '#FF6666'
            }} />
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginTop: '12px'
      }}>
        <div style={{
          backgroundColor: 'rgba(211, 166, 37, 0.1)',
          borderRadius: '6px',
          padding: '8px',
          textAlign: 'center',
          fontSize: '11px'
        }}>
          <div style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
            {stats.handSize}
          </div>
          <div style={{ color: theme.colors.textSecondary, fontSize: '9px' }}>
            Mano
          </div>
        </div>
        <div style={{
          backgroundColor: 'rgba(211, 166, 37, 0.1)',
          borderRadius: '6px',
          padding: '8px',
          textAlign: 'center',
          fontSize: '11px'
        }}>
          <div style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
            {stats.librarySize}
          </div>
          <div style={{ color: theme.colors.textSecondary, fontSize: '9px' }}>
            Biblioteca
          </div>
        </div>
        <div style={{
          backgroundColor: 'rgba(211, 166, 37, 0.1)',
          borderRadius: '6px',
          padding: '8px',
          textAlign: 'center',
          fontSize: '11px'
        }}>
          <div style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
            {stats.creatures}
          </div>
          <div style={{ color: theme.colors.textSecondary, fontSize: '9px' }}>
            Criaturas
          </div>
        </div>
        <div style={{
          backgroundColor: 'rgba(211, 166, 37, 0.1)',
          borderRadius: '6px',
          padding: '8px',
          textAlign: 'center',
          fontSize: '11px'
        }}>
          <div style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
            {stats.graveyardSize}
          </div>
          <div style={{ color: theme.colors.textSecondary, fontSize: '9px' }}>
            Cementerio
          </div>
        </div>
      </div>

      {/* Estado de derrota */}
      {isDefeated && (
        <div style={{
          marginTop: '12px',
          padding: '8px',
          backgroundColor: 'rgba(200, 0, 0, 0.3)',
          border: '2px solid #CC0000',
          borderRadius: '6px',
          textAlign: 'center',
          color: '#FF6666',
          fontWeight: 'bold',
          fontSize: '12px'
        }}>
          ☠️ JUGADOR ELIMINADO ☠️
        </div>
      )}
    </div>
  );
}
