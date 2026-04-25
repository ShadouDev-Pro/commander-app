import { useState } from "react";
import { useTheme } from "../shared/hooks/useTheme";
import GameSetup from "./components/GameSetup";
import PlayerCard from "./components/PlayerCard";
import Button from "../shared/components/Button";
import ThemeToggle from "../shared/components/ThemeToggle";

export default function GamePage() {
  const { theme } = useTheme();
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);

  const handleStartGame = (playerNames) => {
    const newPlayers = playerNames.map((name) => ({
      name,
      life: 40,
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  const changeLife = (index, amount) => {
    const newPlayers = [...players];
    newPlayers[index].life += amount;
    setPlayers(newPlayers);
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setPlayers([]);
  };

  if (!gameStarted) {
    return <GameSetup onStartGame={handleStartGame} />;
  }

  return (
    <div
      style={{
        background: theme.colors.background,
        minHeight: "100vh",
        padding: "20px",
        color: theme.colors.text,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          paddingBottom: "20px",
          borderBottom: `2px solid rgba(211, 166, 37, 0.3)`,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "3px",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(211, 166, 37, 0.3)",
              background: "linear-gradient(135deg, #D3A625 0%, #FFE5B4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Commander
          </h1>
          <p
            style={{
              margin: "5px 0 0 0",
              fontSize: "12px",
              color: theme.colors.textSecondary,
              letterSpacing: "1px",
            }}
          >
            Life Counter
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <ThemeToggle />
          <Button onClick={handleResetGame} variant="secondary">
            Nueva Partida
          </Button>
        </div>
      </div>

      {/* Players Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          padding: "20px",
        }}
      >
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            playerName={player.name}
            life={player.life}
            index={index}
            onChangeLife={changeLife}
          />
        ))}
      </div>
    </div>
  );
}