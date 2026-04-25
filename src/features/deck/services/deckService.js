// deckService.js - Servicios para gestión de decks

import { sampleDecks } from '../sampleDecks';

// Obtener un deck por ID
export function getDeckById(deckId) {
  return sampleDecks.find(deck => deck.id === deckId) || null;
}

// Obtener todos los decks disponibles
export function getAllDecks() {
  return sampleDecks;
}

// Validar si un deck es válido para Commander
export function validateDeck(deck) {
  // Para Commander, debe tener exactamente un comandante legendario
  if (!deck.commander) return false;
  if (!deck.commander.type.includes('Legendary')) return false;
  return true;
}

// Calcular estadísticas del deck
export function calculateDeckStats(deck) {
  const stats = {
    totalCards: deck.cards.length,
    colors: deck.colors,
    manaCurve: {}, // Simplificado
    types: {} // Simplificado
  };

  // Calcular curva de maná
  deck.cards.forEach(card => {
    const cmc = getConvertedManaCost(card.mana);
    stats.manaCurve[cmc] = (stats.manaCurve[cmc] || 0) + 1;
  });

  return stats;
}

// Función auxiliar para calcular costo convertido de maná
function getConvertedManaCost(mana) {
  if (!mana) return 0;
  // Simplificado: contar números y símbolos de maná
  const matches = mana.match(/\{(\d+|[WUBRG])\}/g);
  if (!matches) return 0;
  return matches.reduce((total, symbol) => {
    const num = symbol.match(/(\d+)/);
    return total + (num ? parseInt(num[1]) : 1);
  }, 0);
}