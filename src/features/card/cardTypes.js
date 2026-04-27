// cardTypes.js - Tipos de datos para cartas de Magic: The Gathering

export const Card = {
  id: String, // Scryfall ID o similar
  name: String,
  mana: String, // Costo de maná '{2}{W}{U}'
  colors: Array, // Colores ['W', 'U']
  type: String, // Tipo de carta 'Creature — Human Wizard'
  keywords: Array, // Keywords como ['Flying', 'Trample', 'Flash']
  text: String, // Texto de la carta
  image: String, // URL de la imagen
  power: String, // Para criaturas
  toughness: String, // Para criaturas
  loyalty: String, // Para planeswalkers
  rarity: String // 'common', 'uncommon', 'rare', 'mythic'
};

// Zonas del juego donde pueden estar las cartas
export const CardZone = {
  hand: Array, // Cartas en mano
  library: Array, // Biblioteca
  graveyard: Array, // Cementerio
  exile: Array, // Exilio
  battlefield: Array, // Campo de batalla
  command: Object // Zona de comandante (solo el comandante)
};