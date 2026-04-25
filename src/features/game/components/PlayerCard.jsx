import { useTheme } from "../../shared/hooks/useTheme";
import { useState } from "react";
import { getDeckById } from "../../deck/services/deckService";

export default function PlayerCard({ player, index, onChangeLife }) {
  const { theme } = useTheme();
  const [pressedButton, setPressedButton] = useState(null);

  const deck = player.deckId ? getDeckById(player.deckId) : null;

  const cardStyle = {
    margin: "15px",
    padding: "25px",
    borderRadius: "12px",
    background: theme.colors.card,
    minWidth: "280px",
    color: theme.colors.text,
    border: "3px solid",
    borderImage: `linear-gradient(135deg, #D3A625 0%, #A0791D 100%) 1`,
    boxShadow: `
      0 0 30px rgba(211, 166, 37, 0.3),
      inset 0 0 30px rgba(211, 166, 37, 0.1),
      0 20px 40px rgba(0, 0, 0, 0.8)
    `,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  };

  const cornerDecor = {
    position: "absolute",
    width: "40px",
    height: "40px",
    background: `linear-gradient(135deg, #D3A625 0%, transparent 100%)`,
    opacity: 0.2,
  };

  const playerNameStyle = {
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: theme.colors.text,
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const lifeCounterStyle = {
    background: theme.colors.lifeBg,
    padding: "20px",
    borderRadius: "8px",
    fontSize: "64px",
    fontWeight: "900",
    marginBottom: "25px",
    color: "#FFE5B4",
    textShadow: "0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 100, 100, 0.3)",
    letterSpacing: "2px",
    boxShadow: `
      inset 0 2px 4px rgba(0, 0, 0, 0.5),
      0 0 15px rgba(196, 30, 58, 0.4)
    `,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const buttonContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "15px",
  };

  const createButtonStyle = (bgGradient, buttonId) => ({
    padding: "12px 8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "6px",
    cursor: "pointer",
    background: bgGradient,
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    boxShadow: `
      0 4px 8px rgba(0, 0, 0, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.2)
    `,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: pressedButton === buttonId ? "scale(0.98) translateY(-1px)" : "scale(1)",
  });

  const handleButtonMouseDown = (e, buttonId) => {
    setPressedButton(buttonId);
    e.target.style.transform = "scale(0.96) translateY(1px)";
    e.target.style.boxShadow = `
      0 2px 4px rgba(0, 0, 0, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.1)
    `;
  };

  const handleButtonMouseUp = (e, buttonId) => {
    setPressedButton(null);
    e.target.style.transform = "scale(1) translateY(-2px)";
    e.target.style.boxShadow = `
      0 6px 12px rgba(0, 0, 0, 0.5),
      inset 0 1px 2px rgba(255, 255, 255, 0.2),
      0 0 15px rgba(211, 166, 37, 0.2)
    `;
  };

  const handleButtonMouseEnter = (e) => {
    if (pressedButton === null) {
      e.target.style.transform = "scale(1.02) translateY(-2px)";
      e.target.style.boxShadow = `
        0 6px 12px rgba(0, 0, 0, 0.5),
        inset 0 1px 2px rgba(255, 255, 255, 0.2),
        0 0 15px rgba(211, 166, 37, 0.2)
      `;
    }
  };

  const handleButtonMouseLeave = (e) => {
    if (pressedButton === null) {
      e.target.style.transform = "scale(1)";
      e.target.style.boxShadow = `
        0 4px 8px rgba(0, 0, 0, 0.4),
        inset 0 1px 2px rgba(255, 255, 255, 0.2)
      `;
    }
  };

  return (
    <div style={cardStyle}>
      {/* Corner decorations */}
      <div style={{ ...cornerDecor, top: "0", left: "0" }}></div>
      <div
        style={{
          ...cornerDecor,
          bottom: "0",
          right: "0",
          transform: "rotate(180deg)",
        }}
      ></div>

      <h2 style={playerNameStyle}>{player.name}</h2>

      {deck && (
        <div style={{
          marginBottom: "15px",
          padding: "10px",
          background: "rgba(211, 166, 37, 0.1)",
          borderRadius: "6px",
          border: "1px solid rgba(211, 166, 37, 0.3)",
        }}>
          <div style={{ fontSize: "12px", color: theme.colors.textSecondary, marginBottom: "5px" }}>
            Commander:
          </div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: theme.colors.text }}>
            {deck.commander.name}
          </div>
          <div style={{ fontSize: "12px", color: theme.colors.textSecondary }}>
            {deck.commander.mana}
          </div>
        </div>
      )}

      <div style={lifeCounterStyle}>{player.life}</div>

      <div style={buttonContainerStyle}>
        <button
          onClick={() => onChangeLife(index, 1)}
          style={{
            ...createButtonStyle(theme.buttons.increment, "plus-1"),
            fontSize: "18px",
          }}
          onMouseDown={(e) => handleButtonMouseDown(e, "plus-1")}
          onMouseUp={(e) => handleButtonMouseUp(e, "plus-1")}
          onMouseLeave={handleButtonMouseLeave}
          onMouseEnter={handleButtonMouseEnter}
        >
          +1
        </button>
        <button
          onClick={() => onChangeLife(index, -1)}
          style={{
            ...createButtonStyle(theme.buttons.decrement, "minus-1"),
            fontSize: "18px",
          }}
          onMouseDown={(e) => handleButtonMouseDown(e, "minus-1")}
          onMouseUp={(e) => handleButtonMouseUp(e, "minus-1")}
          onMouseLeave={handleButtonMouseLeave}
          onMouseEnter={handleButtonMouseEnter}
        >
          -1
        </button>
        <button
          onClick={() => onChangeLife(index, 5)}
          style={{
            ...createButtonStyle(theme.buttons.major, "plus-5"),
            fontSize: "18px",
          }}
          onMouseDown={(e) => handleButtonMouseDown(e, "plus-5")}
          onMouseUp={(e) => handleButtonMouseUp(e, "plus-5")}
          onMouseLeave={handleButtonMouseLeave}
          onMouseEnter={handleButtonMouseEnter}
        >
          +5
        </button>
        <button
          onClick={() => onChangeLife(index, -5)}
          style={{
            ...createButtonStyle(theme.buttons.penalty, "minus-5"),
            fontSize: "18px",
          }}
          onMouseDown={(e) => handleButtonMouseDown(e, "minus-5")}
          onMouseUp={(e) => handleButtonMouseUp(e, "minus-5")}
          onMouseLeave={handleButtonMouseLeave}
          onMouseEnter={handleButtonMouseEnter}
        >
          -5
        </button>
      </div>
    </div>
  );
}
