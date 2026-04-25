import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 14px",
        fontSize: "18px",
        background: theme.isDarkMode
          ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1e 100%)"
          : "linear-gradient(135deg, #F0E6D2 0%, #E6D5B8 100%)",
        color: theme.colors.text,
        border: `2px solid ${theme.colors.warning}`,
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        fontWeight: "bold",
        boxShadow: `
          0 4px 8px rgba(0, 0, 0, 0.3),
          inset 0 1px 2px rgba(255, 255, 255, 0.1),
          0 0 12px rgba(211, 166, 37, 0.2)
        `,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      title="Cambiar tema"
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.05)";
        e.target.style.boxShadow = `
          0 6px 12px rgba(0, 0, 0, 0.4),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          0 0 20px rgba(211, 166, 37, 0.4)
        `;
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = `
          0 4px 8px rgba(0, 0, 0, 0.3),
          inset 0 1px 2px rgba(255, 255, 255, 0.1),
          0 0 12px rgba(211, 166, 37, 0.2)
        `;
      }}
      onMouseDown={(e) => {
        e.target.style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.target.style.transform = "scale(1.05)";
      }}
    >
      {theme.isDarkMode ? "☀️" : "🌙"}
    </button>
  );
}
