import { createContext, useState, useEffect } from "react";
import { MAGIC_DESIGN, BUTTON_STYLES, MANA_COLORS } from "../constants/designConstants";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : true; // Modo oscuro por defecto
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const designMode = isDarkMode ? MAGIC_DESIGN.dark : MAGIC_DESIGN.light;

  // Ajustar colores para mejor contraste en modo claro
  const lightModeButtons = {
    increment: `linear-gradient(135deg, #0D6930 0%, #094B20 100%)`,
    decrement: `linear-gradient(135deg, #8B1528 0%, #5C0A1F 100%)`,
    major: `linear-gradient(135deg, #054D7A 0%, #032E52 100%)`,
    penalty: `linear-gradient(135deg, #A0791D 0%, #6B5213 100%)`,
  };

  const theme = {
    isDarkMode,
    design: designMode,
    colors: {
      background: designMode.background,
      text: designMode.textPrimary,
      textSecondary: designMode.textSecondary,
      border: MANA_COLORS.GOLD,
      card: designMode.cardBg,
      accentBorder: designMode.accentBorder,
      lifeBg: designMode.lifeBg,
      primary: MANA_COLORS.BLUE,
      success: MANA_COLORS.GREEN,
      danger: MANA_COLORS.RED,
      warning: MANA_COLORS.GOLD,
      secondary: "#333333",
    },
    buttons: isDarkMode ? BUTTON_STYLES : lightModeButtons,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
