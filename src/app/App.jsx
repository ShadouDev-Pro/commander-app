import { ThemeProvider } from "../features/shared/context/ThemeContext";
import GamePage from "../features/game/GamePage";
import { useTheme } from "../features/shared/hooks/useTheme";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        transition: "background 0.5s ease, color 0.5s ease",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <GamePage />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

