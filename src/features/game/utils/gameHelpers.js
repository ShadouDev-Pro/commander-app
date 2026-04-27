// gameHelpers.js - Funciones auxiliares para la lógica del juego

/**
 * Calcula el manacost de una carta
 */
export const calculateManaCost = (manaString) => {
  if (!manaString) return 0;
  
  // Contar los símbolos de maná
  const matches = manaString.match(/{([^}]+)}/g) || [];
  let total = 0;
  
  matches.forEach(match => {
    const content = match.slice(1, -1);
    // Si es un número, agregarlo
    if (!isNaN(content)) {
      total += parseInt(content);
    } else {
      // Si es un símbolo de color, contar como 1
      total += 1;
    }
  });
  
  return total;
};

/**
 * Extrae los colores de un string de maná
 */
export const extractColors = (manaString) => {
  if (!manaString) return [];
  
  const colorMap = {
    'W': 'white',
    'U': 'blue',
    'B': 'black',
    'R': 'red',
    'G': 'green'
  };
  
  const matches = manaString.match(/{([WUBRG])}/g) || [];
  const colors = matches.map(match => colorMap[match[1]]);
  
  return [...new Set(colors)]; // Remover duplicados
};

/**
 * Verifica si una carta puede ser jugada
 */
export const canPlayCard = (card, playerMana) => {
  const cost = calculateManaCost(card.mana);
  const totalMana = Object.values(playerMana).reduce((a, b) => a + b, 0);
  return totalMana >= cost;
};

/**
 * Verifica si una criatura puede atacar
 */
export const canAttack = (card) => {
  if (!card.type?.includes('Creature')) return false;
  return !card.isTapped && !card.hasAttacked;
};

/**
 * Obtiene el poder y resistencia de una criatura
 */
export const getPowerToughness = (card) => {
  if (!card.power || !card.toughness) return null;
  return {
    power: parseInt(card.power || 0),
    toughness: parseInt(card.toughness || 0)
  };
};

/**
 * Verifica si una criatura ha sido eliminada
 */
export const isCreatureDead = (card) => {
  if (!card.type?.includes('Creature')) return false;
  const { toughness } = getPowerToughness(card);
  return card.damageOnCard >= toughness;
};

/**
 * Ordena las cartas por tipo
 */
export const sortCardsByType = (cards) => {
  const typeOrder = ['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Artifact', 'Planeswalker', 'Land'];
  
  return cards.sort((a, b) => {
    const indexA = typeOrder.findIndex(type => a.type?.includes(type));
    const indexB = typeOrder.findIndex(type => b.type?.includes(type));
    
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

/**
 * Obtiene información de resumen de un jugador
 */
export const getPlayerSummary = (player) => {
  return {
    name: player.playerName,
    life: player.life,
    maxLife: player.maxLife,
    isDefeated: player.life <= 0,
    handSize: player.zones.hand.length,
    librarySize: player.zones.library.length,
    graveyardSize: player.zones.graveyard.length,
    exileSize: player.zones.exile.length,
    creatures: player.zones.battlefield.filter(c => c.type?.includes('Creature')).length,
    permanents: player.zones.battlefield.length
  };
};

/**
 * Retorna un color de icon para los colores del maná
 */
export const getColorIcon = (color) => {
  const icons = {
    'white': '⚪',
    'blue': '🔵',
    'black': '⚫',
    'red': '🔴',
    'green': '🟢'
  };
  return icons[color] || '⚪';
};

/**
 * Formatea el nombre de una fase
 */
export const getPhaseEmoji = (phase) => {
  const emojis = {
    'beginning': '🌅',
    'main': '⚔️',
    'combat': '⚔️',
    'main2': '⚔️',
    'ending': '🌙'
  };
  return emojis[phase] || '❓';
};
