// deckTypes.js - Tipos de datos para decks de Magic: The Gathering Commander

export const Deck = {
  id: String, // UUID o identificador único
  name: String, // Nombre del deck
  commander: Object, // Carta comandante { id, name, mana, colors, image }
  format: String, // 'commander', 'brawl', etc.
  cards: Array, // Lista de cartas [Card]
  colors: Array, // Colores del deck ['W', 'U', 'B', 'R', 'G']
  createdAt: Date,
  updatedAt: Date
};

export const Card = {
  id: String, // Scryfall ID o similar
  name: String,
  mana: String, // Costo de maná '{2}{W}{U}'
  colors: Array, // Colores ['W', 'U']
  type: String, // Tipo de carta 'Creature — Human Wizard'
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