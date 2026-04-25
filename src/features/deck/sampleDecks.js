// sampleDecks.js - Decks de ejemplo para Commander

import { Deck } from './deckTypes.js';

export const sampleDecks = [
  {
    id: 'deck-1',
    name: 'Jace, the Mind Sculptor',
    commander: {
      id: 'jace-commander',
      name: 'Jace, the Mind Sculptor',
      mana: '{2}{U}{U}',
      colors: ['U'],
      type: 'Legendary Planeswalker — Jace',
      text: '+2: Look at the top card of target player\'s library. You may put that card on the bottom of that library.\n0: Target player mills three cards.\n-1: Return target creature to its owner\'s hand.\n-12: Exile all cards from target player\'s library. That player shuffles their hand into their library.',
      image: 'https://cards.scryfall.io/large/front/4/4/44a8e8e1-4a8b-4b7a-8b7a-8b7a8b7a8b7a.jpg', // Placeholder
      loyalty: '3'
    },
    format: 'commander',
    cards: [
      { id: 'card-1', name: 'Brainstorm', mana: '{U}', colors: ['U'], type: 'Instant', text: 'Draw three cards, then put two cards from your hand on top of your library in any order.' },
      { id: 'card-2', name: 'Counterspell', mana: '{U}{U}', colors: ['U'], type: 'Instant', text: 'Counter target spell.' },
      { id: 'card-3', name: 'Lightning Bolt', mana: '{R}', colors: ['R'], type: 'Instant', text: 'Lightning Bolt deals 3 damage to any target.' }
    ], // Cartas de ejemplo
    colors: ['U'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'deck-2',
    name: 'Liliana of the Veil',
    commander: {
      id: 'liliana-commander',
      name: 'Liliana of the Veil',
      mana: '{1}{B}{B}',
      colors: ['B'],
      type: 'Legendary Planeswalker — Liliana',
      text: '+1: Each player discards a card.\n-2: Target player sacrifices a creature.\n-6: Separate all permanents target player controls into two piles. That player sacrifices all permanents in the pile of their choice.',
      image: 'https://cards.scryfall.io/large/front/5/5/55a8e8e1-4a8b-4b7a-8b7a-8b7a8b7a8b7a.jpg', // Placeholder
      loyalty: '3'
    },
    format: 'commander',
    cards: [],
    colors: ['B'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'deck-3',
    name: 'Gideon, Ally of Zendikar',
    commander: {
      id: 'gideon-commander',
      name: 'Gideon, Ally of Zendikar',
      mana: '{2}{W}{W}',
      colors: ['W'],
      type: 'Legendary Planeswalker — Gideon',
      text: '+1: Until end of turn, Gideon, Ally of Zendikar becomes a 5/5 Human Soldier Ally creature with indestructible that\'s still a planeswalker. Prevent all damage that would be dealt to him this turn.\n0: Create a 2/2 white Knight Ally creature token.\n-4: You get an emblem with "Creatures you control get +1/+1."',
      image: 'https://cards.scryfall.io/large/front/6/6/66a8e8e1-4a8b-4b7a-8b7a-8b7a8b7a8b7a.jpg', // Placeholder
      loyalty: '4'
    },
    format: 'commander',
    cards: [],
    colors: ['W'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];