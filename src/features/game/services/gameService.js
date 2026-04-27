// gameService.js - Servicios y lógica del juego Commander

import { sampleDecks } from '../../deck/sampleDecks';

/**
 * Inicializa el estado del juego para un jugador
 */
export const initializePlayerGameState = (playerName, deckId) => {
  if (!deckId) {
    throw new Error(`No se ha seleccionado un deck para ${playerName}`);
  }

  const deck = sampleDecks.find(d => d.id === deckId);
  if (!deck) {
    throw new Error(`Deck con ID "${deckId}" no encontrado. Decks disponibles: ${sampleDecks.map(d => d.id).join(', ')}`);
  }

  // Crear una copia del deck para no modificar el original
  const allCards = [deck.commander, ...deck.cards];
  const shuffledLibrary = shuffleDeck([...allCards]);

  return {
    playerName,
    deckId,
    life: 40,
    maxLife: 40,
    commander: deck.commander,
    zones: {
      hand: [],
      library: shuffledLibrary,
      graveyard: [],
      exile: [],
      battlefield: []
    },
    manaPool: {
      white: 0,
      blue: 0,
      black: 0,
      red: 0,
      green: 0,
      colorless: 0
    },
    commanderCastCount: 0, // Contador de veces que el comandante ha sido lanzado
    commanderDamage: {}, // { playerId: damage }
    selectedCard: null, // Carta seleccionada para jugar
    actions: []
  };
};

/**
 * Mezcla un deck usando Fisher-Yates shuffle
 */
export const shuffleDeck = (cards) => {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

/**
 * Roba X cartas del deck hacia la mano
 */
export const drawCards = (playerState, amount) => {
  const newState = { ...playerState };
  const cardsDrawn = [];

  for (let i = 0; i < amount; i++) {
    if (newState.zones.library.length > 0) {
      const card = newState.zones.library.shift();
      newState.zones.hand.push(card);
      cardsDrawn.push(card);
    }
    // Si no hay cartas en la biblioteca, el jugador pierde (no implementado aquí)
  }

  return { newState, cardsDrawn };
};

/**
 * Juega una carta desde la mano al campo de batalla
 */
export const playCard = (playerState, cardId) => {
  const newState = { ...playerState };
  const cardIndex = newState.zones.hand.findIndex(c => c.id === cardId);

  if (cardIndex === -1) {
    throw new Error('Carta no encontrada en mano');
  }

  const card = newState.zones.hand[cardIndex];
  newState.zones.hand.splice(cardIndex, 1);
  newState.zones.battlefield.push({
    ...card,
    isTapped: false,
    damageOnCard: 0,
    hasAttacked: false
  });

  return newState;
};

/**
 * Descarta una carta de la mano al cementerio
 */
export const discardCard = (playerState, cardId) => {
  const newState = { ...playerState };
  const cardIndex = newState.zones.hand.findIndex(c => c.id === cardId);

  if (cardIndex === -1) {
    throw new Error('Carta no encontrada en mano');
  }

  const card = newState.zones.hand[cardIndex];
  newState.zones.hand.splice(cardIndex, 1);
  newState.zones.graveyard.push(card);

  return newState;
};

/**
 * Mueve una carta del campo de batalla al cementerio
 */
export const sacrificeCard = (playerState, cardId) => {
  const newState = { ...playerState };
  const cardIndex = newState.zones.battlefield.findIndex(c => c.id === cardId);

  if (cardIndex === -1) {
    throw new Error('Carta no encontrada en el campo de batalla');
  }

  const card = newState.zones.battlefield[cardIndex];
  newState.zones.battlefield.splice(cardIndex, 1);
  newState.zones.graveyard.push(card);

  return newState;
};

/**
 * Cambia el estado de un permanente (tap/untap)
 */
export const toggleTapCard = (playerState, cardId) => {
  const newState = { ...playerState };
  const card = newState.zones.battlefield.find(c => c.id === cardId);

  if (!card) {
    throw new Error('Carta no encontrada en el campo de batalla');
  }

  card.isTapped = !card.isTapped;
  return newState;
};

/**
 * Marca una criatura como atacante
 */
export const declareAttacker = (playerState, cardId, defendingPlayerId) => {
  const newState = { ...playerState };
  const card = newState.zones.battlefield.find(c => c.id === cardId);

  if (!card) {
    throw new Error('Carta no encontrada en el campo de batalla');
  }

  if (card.isTapped) {
    throw new Error('La carta no puede atacar si está girada');
  }

  card.hasAttacked = true;
  card.defendingAgainst = defendingPlayerId;

  return newState;
};

/**
 * Modifica la vida de un jugador
 */
export const changeLife = (playerState, amount) => {
  const newState = { ...playerState };
  newState.life += amount;

  if (newState.life < 0) {
    newState.life = 0;
  }

  return newState;
};

/**
 * Añade daño de comandante a un jugador
 */
export const addCommanderDamage = (playerState, sourcePlayerId, amount) => {
  const newState = { ...playerState };
  if (!newState.commanderDamage[sourcePlayerId]) {
    newState.commanderDamage[sourcePlayerId] = 0;
  }
  newState.commanderDamage[sourcePlayerId] += amount;

  return newState;
};

/**
 * Obtiene el daño total de comandante
 */
export const getTotalCommanderDamage = (playerState) => {
  return Object.values(playerState.commanderDamage).reduce((sum, damage) => sum + damage, 0);
};

/**
 * Resetea el turno: untap all permanentes, marca attackers como no atacados
 */
export const resetTurn = (playerState) => {
  const newState = { ...playerState };
  
  newState.zones.battlefield.forEach(card => {
    card.isTapped = false;
    card.hasAttacked = false;
    card.damageOnCard = 0;
  });

  return newState;
};

/**
 * Retorna si un jugador ha sido eliminado
 */
export const isPlayerDefeated = (playerState) => {
  return playerState.life <= 0 || getTotalCommanderDamage(playerState) >= 21;
};

/**
 * Obtiene estadísticas del jugador
 */
export const getPlayerStats = (playerState) => {
  return {
    life: playerState.life,
    maxLife: playerState.maxLife,
    handSize: playerState.zones.hand.length,
    librarySize: playerState.zones.library.length,
    graveyardSize: playerState.zones.graveyard.length,
    exileSize: playerState.zones.exile.length,
    battlefieldSize: playerState.zones.battlefield.length,
    creatures: playerState.zones.battlefield.filter(c => c.type?.includes('Creature')).length,
    commanderDamage: getTotalCommanderDamage(playerState)
  };
};
