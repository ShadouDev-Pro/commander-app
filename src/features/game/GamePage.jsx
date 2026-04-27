import { useState } from "react";
import { useTheme } from "../shared/hooks/useTheme";
import { useGameState } from "./hooks/useGameState";
import GameSetup from "./components/GameSetup";
import Button from "../shared/components/Button";
import ThemeToggle from "../shared/components/ThemeToggle";
import Battlefield from "./components/Battlefield";
import Hand from "./components/Hand";
import GameZones from "./components/GameZones";
import PlayerInfo from "./components/PlayerInfo";
import GameControls from "./components/GameControls";

export default function GamePage() {
  const { theme } = useTheme();
  const [gameSetupComplete, setGameSetupComplete] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);
  const [selectedDecks, setSelectedDecks] = useState([]);

  // Hook del juego - SIEMPRE se inicializa pero con datos seguros
  const gameState = useGameState(gameSetupComplete ? playerNames : [], gameSetupComplete ? selectedDecks : []);

  const {
    players = [],
    currentPlayerIndex = 0,
    currentPlayer = null,
    gamePhase = 'beginning',
    selectedCards = new Set(),
    gameOver = false,
    winner = null,
    handleDrawCards = () => {},
    handlePlayCard = () => {},
    handleDiscardCard = () => {},
    handleSacrificeCard = () => {},
    handleTapCard = () => {},
    handleChangeLife = () => {},
    handleNextPhase = () => {},
    handleSelectCard = () => {},
    resetGameState = () => {}
  } = gameState || {};

  const handleStartGame = (names, decks) => {
    setPlayerNames(names);
    setSelectedDecks(decks);
    setGameSetupComplete(true);
  };

  const handleResetGame = () => {
    setGameSetupComplete(false);
    setPlayerNames([]);
    setSelectedDecks([]);
    resetGameState();
  };

  // Mostrar setup si no estamos listos
  if (!gameSetupComplete || !currentPlayer || players.length === 0) {
    return <GameSetup onStartGame={handleStartGame} />;
  }

  return (
    <div
      style={{
        background: theme.colors.background,
        minHeight: "100vh",
        color: theme.colors.text,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: `2px solid rgba(211, 166, 37, 0.3)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: `rgba(0, 0, 0, 0.3)`
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(211, 166, 37, 0.3)",
              background: "linear-gradient(135deg, #D3A625 0%, #FFE5B4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            COMMANDER ONLINE
          </h1>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "11px",
              color: theme.colors.textSecondary,
              letterSpacing: "1px",
            }}
          >
            Plataforma de Juego
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <ThemeToggle />
        </div>
      </div>

      {/* Layout Principal */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 1fr",
          gap: "16px",
          padding: "16px",
          flex: 1,
          overflowY: "auto",
          gridAutoFlow: "dense"
        }}
      >
        {/* Panel Izquierdo - Jugadores no actuales */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflowY: "auto"
        }}>
          <h3 style={{
            margin: '0 0 8px 0',
            color: theme.colors.primary,
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            Jugadores
          </h3>
          {players.map((player, index) => (
            index !== currentPlayerIndex && (
              <PlayerInfo
                key={index}
                player={player}
                isCurrentPlayer={false}
                onChangeLife={(amount) => {
                  const newAmount = -amount; // Inverso para el otro jugador
                  handleChangeLife(index, newAmount);
                }}
              />
            )
          ))}
        </div>

        {/* Panel Central - Juego Actual */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflowY: "auto"
        }}>
          {/* Campos de Batalla Enemigos */}
          {players.map((player, index) => (
            index !== currentPlayerIndex && (
              <div key={`enemy-${index}`}>
                <Battlefield
                  cards={player.zones.battlefield}
                  playerName={player.playerName}
                  selectedCards={selectedCards}
                  onSelectCard={handleSelectCard}
                  onPlayCard={() => {}} // Los enemigos no pueden jugar carta
                  onTapCard={() => {}} // Los enemigos no pueden girar
                  onSacrificeCard={() => {}} // Los enemigos no pueden sacrificar
                />
              </div>
            )
          ))}

          {/* Divisor */}
          <div style={{
            height: '2px',
            backgroundColor: `rgba(211, 166, 37, 0.2)`,
            margin: '12px 0'
          }} />

          {/* Campo de Batalla del Jugador Actual */}
          <div>
            <Battlefield
              cards={currentPlayer.zones.battlefield}
              playerName={currentPlayer.playerName}
              selectedCards={selectedCards}
              onSelectCard={handleSelectCard}
              onPlayCard={handlePlayCard}
              onTapCard={(cardId) => handleTapCard(currentPlayerIndex, cardId)}
              onSacrificeCard={(cardId) => handleSacrificeCard(currentPlayerIndex, cardId)}
            />
          </div>

          {/* Mano del Jugador Actual */}
          <Hand
            cards={currentPlayer.zones.hand}
            selectedCards={selectedCards}
            onSelectCard={handleSelectCard}
            onPlayCard={(cardId) => handlePlayCard(currentPlayerIndex, cardId)}
            onDiscardCard={(cardId) => handleDiscardCard(currentPlayerIndex, cardId)}
          />

          {/* Zonas del Juego */}
          <GameZones
            playerState={currentPlayer}
            onDrawCards={() => handleDrawCards(currentPlayerIndex, 1)}
          />
        </div>

        {/* Panel Derecho - Controles y Info */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflowY: "auto"
        }}>
          {/* Información del Jugador Actual */}
          <PlayerInfo
            player={currentPlayer}
            isCurrentPlayer={true}
            onChangeLife={(amount) => handleChangeLife(currentPlayerIndex, amount)}
          />

          {/* Controles del Juego */}
          <GameControls
            currentPhase={gamePhase}
            currentPlayerName={currentPlayer.playerName}
            onNextPhase={() => handleNextPhase()}
            onDrawCard={() => handleDrawCards(currentPlayerIndex, 1)}
            onResetGame={handleResetGame}
            gameOver={gameOver}
            winner={winner}
          />
        </div>
      </div>
    </div>
  );
}