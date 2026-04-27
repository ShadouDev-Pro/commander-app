// useGameState.js - Hook para manejar el estado del juego

import { useState, useCallback, useEffect } from 'react';
import {
  initializePlayerGameState,
  drawCards,
  playCard,
  discardCard,
  sacrificeCard,
  toggleTapCard,
  changeLife,
  addCommanderDamage,
  resetTurn,
  isPlayerDefeated,
  getPlayerStats
} from '../services/gameService';

export const useGameState = (playerNames, selectedDecks) => {
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    try {
      console.log('Inicializando juego con jugadores:', playerNames);
      console.log('Decks seleccionados:', selectedDecks);
      
      if (!playerNames || playerNames.length === 0) {
        console.warn('No hay nombres de jugadores');
        setPlayers([]);
        return;
      }

      const initialPlayers = playerNames.map((name, index) => {
        console.log(`Inicializando jugador ${index}: ${name} con deck ${selectedDecks[index]}`);
        return initializePlayerGameState(name, selectedDecks[index]);
      });
      
      console.log('Jugadores inicializados:', initialPlayers);
      setPlayers(initialPlayers);
    } catch (error) {
      console.error('Error inicializando juego:', error.message);
      console.error('Stack:', error.stack);
      setPlayers([]);
    }
  }, [playerNames, selectedDecks]);
  
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState('beginning'); // beginning, main, combat, ending
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Función para resetear el estado del juego
  const resetGameState = useCallback(() => {
    setCurrentPlayerIndex(0);
    setGamePhase('beginning');
    setSelectedCards(new Set());
    setGameOver(false);
    setWinner(null);
  }, []);

  // Obtiene el jugador actual
  const getCurrentPlayer = useCallback(() => {
    return players[currentPlayerIndex];
  }, [players, currentPlayerIndex]);

  // Dibuja cartas para un jugador
  const handleDrawCards = useCallback((playerIndex, amount = 1) => {
    const newPlayers = [...players];
    const { newState, cardsDrawn } = drawCards(newPlayers[playerIndex], amount);
    newPlayers[playerIndex] = newState;
    setPlayers(newPlayers);
    return cardsDrawn;
  }, [players]);

  // Juega una carta desde la mano
  const handlePlayCard = useCallback((playerIndex, cardId) => {
    try {
      const newPlayers = [...players];
      newPlayers[playerIndex] = playCard(newPlayers[playerIndex], cardId);
      setPlayers(newPlayers);
      setSelectedCards(new Set()); // Deselecciona la carta
      return true;
    } catch (error) {
      console.error('Error al jugar carta:', error);
      return false;
    }
  }, [players]);

  // Descarta una carta de la mano
  const handleDiscardCard = useCallback((playerIndex, cardId) => {
    try {
      const newPlayers = [...players];
      newPlayers[playerIndex] = discardCard(newPlayers[playerIndex], cardId);
      setPlayers(newPlayers);
      return true;
    } catch (error) {
      console.error('Error al descartar carta:', error);
      return false;
    }
  }, [players]);

  // Sacrifica una carta del campo de batalla
  const handleSacrificeCard = useCallback((playerIndex, cardId) => {
    try {
      const newPlayers = [...players];
      newPlayers[playerIndex] = sacrificeCard(newPlayers[playerIndex], cardId);
      setPlayers(newPlayers);
      return true;
    } catch (error) {
      console.error('Error al sacrificar carta:', error);
      return false;
    }
  }, [players]);

  // Gira/desgiRA una carta del campo de batalla
  const handleTapCard = useCallback((playerIndex, cardId) => {
    try {
      const newPlayers = [...players];
      newPlayers[playerIndex] = toggleTapCard(newPlayers[playerIndex], cardId);
      setPlayers(newPlayers);
      return true;
    } catch (error) {
      console.error('Error al girar carta:', error);
      return false;
    }
  }, [players]);

  // Cambia la vida de un jugador
  const handleChangeLife = useCallback((playerIndex, amount) => {
    const newPlayers = [...players];
    newPlayers[playerIndex] = changeLife(newPlayers[playerIndex], amount);
    
    // Verifica si el jugador fue eliminado
    if (isPlayerDefeated(newPlayers[playerIndex])) {
      const remainingPlayers = newPlayers.filter((_, i) => !isPlayerDefeated(newPlayers[i]));
      
      if (remainingPlayers.length === 1) {
        setGameOver(true);
        setWinner(remainingPlayers[0].playerName);
      }
    }

    setPlayers(newPlayers);
  }, [players]);

  // Añade daño de comandante
  const handleAddCommanderDamage = useCallback((targetPlayerIndex, sourcePlayerIndex, amount) => {
    const newPlayers = [...players];
    newPlayers[targetPlayerIndex] = addCommanderDamage(
      newPlayers[targetPlayerIndex],
      sourcePlayerIndex,
      amount
    );

    // Verifica si el jugador fue eliminado por daño de comandante
    if (isPlayerDefeated(newPlayers[targetPlayerIndex])) {
      const remainingPlayers = newPlayers.filter((_, i) => !isPlayerDefeated(newPlayers[i]));
      
      if (remainingPlayers.length === 1) {
        setGameOver(true);
        setWinner(remainingPlayers[0].playerName);
      }
    }

    setPlayers(newPlayers);
  }, [players]);

  // Avanza a la siguiente fase del turno
  const handleNextPhase = useCallback(() => {
    const phases = ['beginning', 'main', 'combat', 'main2', 'ending'];
    const currentIndex = phases.indexOf(gamePhase);
    const nextPhase = phases[(currentIndex + 1) % phases.length];

    if (nextPhase === 'beginning') {
      // Avanza al siguiente jugador
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(nextPlayerIndex);
      
      // El nuevo jugador roba una carta
      const { newState } = drawCards(players[nextPlayerIndex], 1);
      const newPlayers = [...players];
      newPlayers[nextPlayerIndex] = resetTurn(newState);
      setPlayers(newPlayers);
    }

    setGamePhase(nextPhase);
  }, [gamePhase, currentPlayerIndex, players]);

  // Selecciona/deselecciona una carta
  const handleSelectCard = useCallback((cardId) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  }, [selectedCards]);

  // Obtiene estadísticas de todos los jugadores
  const getPlayersStats = useCallback(() => {
    return players.map(p => getPlayerStats(p));
  }, [players]);

  return {
    players,
    currentPlayerIndex,
    currentPlayer: getCurrentPlayer(),
    gamePhase,
    selectedCards,
    gameOver,
    winner,
    
    // Acciones del juego
    handleDrawCards,
    handlePlayCard,
    handleDiscardCard,
    handleSacrificeCard,
    handleTapCard,
    handleChangeLife,
    handleAddCommanderDamage,
    handleNextPhase,
    handleSelectCard,
    getPlayersStats,
    
    // Métodos auxiliares
    setCurrentPlayerIndex,
    setGamePhase,
    setGameOver,
    resetGameState
  };
};
