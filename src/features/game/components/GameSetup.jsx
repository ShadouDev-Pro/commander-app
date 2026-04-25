import { useState } from "react";
import { useTheme } from "../../shared/hooks/useTheme";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import ThemeToggle from "../../shared/components/ThemeToggle";

export default function GameSetup({ onStartGame }) {
  const { theme } = useTheme();
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(Array(2).fill(""));

  const handlePlayerCountChange = (count) => {
    if (count >= 2 && count <= 6) {
      setPlayerCount(count);
      setPlayerNames(Array(count).fill(""));
    }
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const finalNames = playerNames.map((name, index) =>
      name.trim() || `Jugador ${index + 1}`
    );
    onStartGame(finalNames);
  };

  return (
    <div
      style={{
        background: theme.colors.background,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Theme Toggle en esquina */}
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <ThemeToggle />
      </div>

      {/* Setup Panel */}
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "40px",
          borderRadius: "12px",
          background: theme.colors.card,
          border: "3px solid",
          borderImage: `linear-gradient(135deg, #D3A625 0%, #A0791D 100%) 1`,
          boxShadow: `
            0 0 50px rgba(211, 166, 37, 0.2),
            inset 0 0 30px rgba(211, 166, 37, 0.05),
            0 20px 60px rgba(0, 0, 0, 0.9)
          `,
          color: theme.colors.text,
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
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
              margin: "8px 0 0 0",
              fontSize: "13px",
              color: theme.colors.textSecondary,
              letterSpacing: "2px",
            }}
          >
            CONFIGURA TU PARTIDA
          </p>
        </div>

        {/* Player Count Section */}
        <div style={{ marginBottom: "35px" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "15px",
              fontSize: "14px",
              color: theme.colors.text,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "bold",
            }}
          >
            Cantidad de Jugadores
          </h3>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {[2, 3, 4, 5, 6].map((count) => (
              <button
                key={count}
                onClick={() => handlePlayerCountChange(count)}
                style={{
                  padding: "12px 18px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor:
                    playerCount === count ? "rgba(211, 166, 37, 0.3)" : "transparent",
                  color: playerCount === count ? theme.colors.warning : theme.colors.textSecondary,
                  border: `2px solid ${playerCount === count ? theme.colors.warning : "rgba(211, 166, 37, 0.2)"}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textShadow: playerCount === count ? "0 0 10px rgba(211, 166, 37, 0.5)" : "none",
                }}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Player Names Section */}
        <div style={{ marginBottom: "35px" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "15px",
              fontSize: "14px",
              color: theme.colors.text,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "bold",
            }}
          >
            Nombres de Jugadores
          </h3>
          <p
            style={{
              margin: "0 0 15px 0",
              fontSize: "12px",
              color: theme.colors.textSecondary,
            }}
          >
            (Dejar en blanco para nombres por defecto)
          </p>
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {playerNames.map((name, index) => (
              <Input
                key={index}
                label={`Jugador ${index + 1}`}
                value={name}
                onChange={(value) => handleNameChange(index, value)}
                placeholder={`Jugador ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button onClick={handleStartGame} variant="primary">
          Iniciar Partida
        </Button>
      </div>
    </div>
  );
}
