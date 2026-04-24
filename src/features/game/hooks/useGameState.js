import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/saves";

export function useGameState() {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem("commanderGameState");
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  });

  const [savedGames, setSavedGames] = useState({});

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("commanderDarkMode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  // Cargar partidas del servidor al iniciar
  useEffect(() => {
    fetchSaves();
  }, []);

  const fetchSaves = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setSavedGames(data);
      }
    } catch (err) {
      console.warn("Servidor de archivos no disponible. Usando modo offline.");
    }
  };

  useEffect(() => {
    if (gameState) {
      localStorage.setItem("commanderGameState", JSON.stringify(gameState));
    } else {
      localStorage.removeItem("commanderGameState");
    }
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem("commanderDarkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const startGame = (numPlayers, startingLife) => {
    const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: Date.now() + i,
      name: `Jugador ${i + 1}`,
      life: startingLife,
      startingLife: startingLife,
    }));
    setGameState({
      players: newPlayers,
      numPlayers,
      startingLife,
      timestamp: Date.now()
    });
  };

  const saveGame = async (name) => {
    if (!gameState) return;
    const gameData = { ...gameState, savedAt: Date.now() };
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, data: gameData })
      });
      if (response.ok) {
        fetchSaves();
      }
    } catch (err) {
      // Fallback a localStorage si el servidor falla
      setSavedGames(prev => ({ ...prev, [name]: gameData }));
    }
  };

  const loadGame = (name) => {
    const game = savedGames[name];
    if (game) {
      setGameState(game);
    }
  };

  const deleteSavedGame = async (name) => {
    try {
      const response = await fetch(`${API_URL}/${name}`, { method: "DELETE" });
      if (response.ok) {
        fetchSaves();
      }
    } catch (err) {
      setSavedGames(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const updatePlayerLife = (index, amount) => {
    setGameState(prev => {
      if (!prev) return prev;
      const newPlayers = [...prev.players];
      newPlayers[index] = {
        ...newPlayers[index],
        life: newPlayers[index].life + amount
      };
      return { ...prev, players: newPlayers };
    });
  };

  const updatePlayerName = (index, newName) => {
    setGameState(prev => {
      if (!prev) return prev;
      const newPlayers = [...prev.players];
      newPlayers[index] = {
        ...newPlayers[index],
        name: newName
      };
      return { ...prev, players: newPlayers };
    });
  };

  const resetGame = () => {
    setGameState(null);
  };

  const importGame = (gameData) => {
    try {
      if (!gameData.players || !Array.isArray(gameData.players)) {
        throw new Error("Formato de partida inválido");
      }
      
      const name = gameData.name || `Importada ${new Date().toLocaleTimeString()}`;
      saveGame(name);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };


  return {
    gameState,
    savedGames,
    isDarkMode,
    toggleDarkMode,
    startGame,
    saveGame,
    loadGame,
    deleteSavedGame,
    importGame,
    updatePlayerLife,
    updatePlayerName,
    resetGame,
  };
}


