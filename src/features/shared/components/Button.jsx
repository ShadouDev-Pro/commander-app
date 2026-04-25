import { useTheme } from "../hooks/useTheme";
import { useState } from "react";

export default function Button({ children, onClick, variant = "primary", disabled = false }) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles = {
    padding: "14px 32px",
    fontSize: "16px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "900",
    opacity: disabled ? 0.5 : 1,
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    boxShadow: `
      0 4px 8px rgba(0, 0, 0, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.2),
      0 0 20px rgba(211, 166, 37, 0.15)
    `,
    position: "relative",
    overflow: "hidden",
  };

  const variants = {
    primary: {
      ...baseStyles,
      background: theme.isDarkMode
        ? "linear-gradient(135deg, #0E68AB 0%, #054D7A 100%)"
        : "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
      color: "white",
    },
    secondary: {
      ...baseStyles,
      background: theme.isDarkMode
        ? "linear-gradient(135deg, #333333 0%, #1a1a1a 100%)"
        : "linear-gradient(135deg, #666666 0%, #404040 100%)",
      color: "#FFE5B4",
    },
    danger: {
      ...baseStyles,
      background: theme.isDarkMode
        ? "linear-gradient(135deg, #C41E3A 0%, #8B1528 100%)"
        : "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
      color: "white",
    },
    gold: {
      ...baseStyles,
      background: "linear-gradient(135deg, #D3A625 0%, #A0791D 100%)",
      color: "#FFE5B4",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
      boxShadow: `
        0 4px 8px rgba(0, 0, 0, 0.4),
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        0 0 20px rgba(211, 166, 37, 0.4)
      `,
    },
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.target.style.transform = "translateY(-3px)";
      e.target.style.boxShadow = `
        0 8px 16px rgba(0, 0, 0, 0.5),
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        0 0 30px rgba(211, 166, 37, 0.35)
      `;
    }
  };

  const handleMouseLeave = (e) => {
    if (!isPressed) {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = `
        0 4px 8px rgba(0, 0, 0, 0.4),
        inset 0 1px 2px rgba(255, 255, 255, 0.2),
        0 0 20px rgba(211, 166, 37, 0.15)
      `;
    }
  };

  const handleMouseDown = (e) => {
    if (!disabled) {
      setIsPressed(true);
      e.target.style.transform = "translateY(-1px) scale(0.98)";
      e.target.style.boxShadow = `
        0 2px 4px rgba(0, 0, 0, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        0 0 15px rgba(211, 166, 37, 0.25)
      `;
    }
  };

  const handleMouseUp = (e) => {
    if (!disabled) {
      setIsPressed(false);
      e.target.style.transform = "translateY(-3px)";
      e.target.style.boxShadow = `
        0 8px 16px rgba(0, 0, 0, 0.5),
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        0 0 30px rgba(211, 166, 37, 0.35)
      `;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={variants[variant] || variants.primary}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </button>
  );
}
