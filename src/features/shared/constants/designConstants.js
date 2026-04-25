// Colores de maná de Magic: The Gathering
export const MANA_COLORS = {
  WHITE: "#F0E6D2",
  BLUE: "#0E68AB",
  BLACK: "#150B00",
  RED: "#C41E3A",
  GREEN: "#0D7E3E",
  GOLD: "#D3A625",
};

// Paleta de diseño para Magic
export const MAGIC_DESIGN = {
  light: {
    background: "linear-gradient(135deg, #F5F1E8 0%, #EDE8DD 100%)",
    cardBg: "linear-gradient(135deg, #FAF7F0 0%, #F0EBDE 100%)",
    accentBorder: "linear-gradient(135deg, #D3A625 0%, #A0791D 100%)",
    textPrimary: "#2C2C2C",
    textSecondary: "#666666",
    lifeBg: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
  },
  dark: {
    background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 100%)",
    cardBg: "linear-gradient(135deg, #1a1a1e 0%, #141418 100%)",
    accentBorder: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    textPrimary: "#FFE5B4",
    textSecondary: "#8B8B8B",
    lifeBg: "linear-gradient(135deg, #FF4444 0%, #CC0000 100%)",
  },
};

// Estilos de botones para acciones
export const BUTTON_STYLES = {
  increment: `linear-gradient(135deg, ${MANA_COLORS.GREEN} 0%, #0D6930 100%)`,
  decrement: `linear-gradient(135deg, ${MANA_COLORS.RED} 0%, #8B1528 100%)`,
  major: `linear-gradient(135deg, ${MANA_COLORS.BLUE} 0%, #054D7A 100%)`,
  penalty: `linear-gradient(135deg, ${MANA_COLORS.GOLD} 0%, #7A5F1A 100%)`,
};
