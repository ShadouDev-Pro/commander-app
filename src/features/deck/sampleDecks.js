// sampleDecks.js - Decks de ejemplo para Commander

import { Deck } from './deckTypes.js';

const createCard = (id, name, mana, colors, type, text, power, toughness) => ({
  id,
  name,
  mana,
  colors,
  type,
  text,
  image: null,
  power,
  toughness,
  rarity: 'common'
});

export const sampleDecks = [
  {
    id: 'deck-1',
    name: 'Jace, Control Azul',
    commander: {
      id: 'jace-commander',
      name: 'Jace, the Mind Sculptor',
      mana: '{2}{U}{U}',
      colors: ['U'],
      type: 'Legendary Planeswalker — Jace',
      text: '+2: Look at the top card of target player\'s library. You may put that card on the bottom of that library.\n0: Target player mills three cards.\n-1: Return target creature to its owner\'s hand.\n-12: Exile all cards from target player\'s library.',
      image: null,
      loyalty: '3'
    },
    format: 'commander',
    cards: [
      createCard('card-1-1', 'Brainstorm', '{U}', ['U'], 'Instant', 'Draw three cards, then put two cards from your hand on top of your library in any order.'),
      createCard('card-1-2', 'Counterspell', '{U}{U}', ['U'], 'Instant', 'Counter target spell.'),
      createCard('card-1-3', 'Mana Leak', '{1}{U}', ['U'], 'Instant', 'Counter target spell unless its controller pays {3}.'),
      createCard('card-1-4', 'Cancel', '{1}{U}{U}', ['U'], 'Instant', 'Counter target spell.'),
      createCard('card-1-5', 'Snapcaster Mage', '{1}{U}', ['U'], 'Creature — Human Wizard', 'Flash\nWhen Snapcaster Mage enters the battlefield, target instant or sorcery card in your graveyard gains flashback until end of turn. The flashback cost is equal to its mana cost.', '2', '1'),
      createCard('card-1-6', 'Delver of Secrets', '{U}', ['U'], 'Creature — Human Insect', 'At the beginning of your upkeep, look at the top card of your library. You may reveal it. If an instant or sorcery card is revealed this way, transform Delver of Secrets.', '1', '1'),
      createCard('card-1-7', 'Faerie Conclave', null, [], 'Land', 'Tap: Add U.\n1U: Faerie Conclave becomes a 2/1 blue Creature — Faerie with flying until end of turn. It\'s still a land.'),
      createCard('card-1-8', 'Island', null, ['U'], 'Basic Land — Island', ''),
      createCard('card-1-9', 'Island', null, ['U'], 'Basic Land — Island', ''),
      createCard('card-1-10', 'Island', null, ['U'], 'Basic Land — Island', ''),
      createCard('card-1-11', 'Flooded Strand', null, ['U', 'W'], 'Land', 'Flooded Strand enters the battlefield tapped.\nT, Pay 1 life, Sacrifice Flooded Strand: Search your library for a Plains or Island card, put it onto the battlefield, then shuffle.'),
      createCard('card-1-12', 'Mystical Tutor', '{U}', ['U'], 'Instant', 'Search your library for an instant or sorcery card and put it on top of your library, then shuffle.'),
      createCard('card-1-13', 'Ponder', '{U}', ['U'], 'Sorcery', 'Look at the top three cards of your library. Put them back in any order. Then draw a card.'),
      createCard('card-1-14', 'Preordain', '{U}', ['U'], 'Sorcery', 'Scry 2, then draw a card.'),
    ],
    colors: ['U'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'deck-2',
    name: 'Liliana, Control Negro',
    commander: {
      id: 'liliana-commander',
      name: 'Liliana of the Veil',
      mana: '{1}{B}{B}',
      colors: ['B'],
      type: 'Legendary Planeswalker — Liliana',
      text: '+1: Each player discards a card.\n-2: Target player sacrifices a creature.\n-6: Separate all permanents target player controls into two piles.',
      image: null,
      loyalty: '3'
    },
    format: 'commander',
    cards: [
      createCard('card-2-1', 'Thoughtseize', '{B}', ['B'], 'Sorcery', 'Target opponent reveals their hand. You choose a nonland card from it. That player discards that card. You lose 2 life.'),
      createCard('card-2-2', 'Dark Confidant', '{1}{B}', ['B'], 'Creature — Human Cleric', 'At the beginning of your upkeep, reveal the top card of your library and put that card into your hand. Each opponent loses life equal to that card\'s converted mana cost.', '2', '1'),
      createCard('card-2-3', 'Grave Pact', '{1}{B}{B}', ['B'], 'Enchantment', 'Whenever a creature you control dies, each opponent loses 1 life.'),
      createCard('card-2-4', 'Cabal Therapy', '{B}', ['B'], 'Sorcery', 'Name a nonland card. Target opponent reveals their hand and discards all cards with that name. Flashback—Sacrifice a creature.'),
      createCard('card-2-5', 'Swamp', null, ['B'], 'Basic Land — Swamp', ''),
      createCard('card-2-6', 'Swamp', null, ['B'], 'Basic Land — Swamp', ''),
      createCard('card-2-7', 'Swamp', null, ['B'], 'Basic Land — Swamp', ''),
      createCard('card-2-8', 'Malakir Rebirth', '{B}', ['B'], 'Instant — Aura', 'Enchant creature you control\nWhen enchanted creature dies, return that card to the battlefield tapped under your control.'),
      createCard('card-2-9', 'Zulaport Cutthroat', '{1}{B}', ['B'], 'Creature — Human Cleric Ally', 'Whenever Zulaport Cutthroat or another creature you control dies, each opponent loses 1 life.', '1', '1'),
      createCard('card-2-10', 'Viscera Seer', '{B}', ['B'], 'Creature — Vampire Wizard', 'Sacrifice a creature: Viscera Seer gainsshroud until end of turn. Tap Viscera Seer.', '1', '1'),
      createCard('card-2-11', 'Fleshbag Marauder', '{1}{B}', ['B'], 'Creature — Orc', 'When Fleshbag Marauder enters the battlefield, sacrifice a creature.', '2', '1'),
    ],
    colors: ['B'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'deck-3',
    name: 'Gideon, Artefactos Blancos',
    commander: {
      id: 'gideon-commander',
      name: 'Gideon, Ally of Zendikar',
      mana: '{2}{W}{W}',
      colors: ['W'],
      type: 'Legendary Planeswalker — Gideon',
      text: '+1: Until end of turn, Gideon becomes a 5/5 creature. Prevent all damage to him this turn.\n0: Create a 2/2 Knight Ally token.\n-4: You get an emblem with "Creatures you control get +1/+1."',
      image: null,
      loyalty: '4'
    },
    format: 'commander',
    cards: [
      createCard('card-3-1', 'Stoneforge Mystic', '{1}{W}', ['W'], 'Creature — Kor Artificer', 'When Stoneforge Mystic enters the battlefield, you may search your library for an Equipment card, reveal it, put it into your hand, then shuffle.', '2', '2'),
      createCard('card-3-2', 'Thalia, Guardian of Thraben', '{W}{W}', ['W'], 'Creature — Human Soldier', 'First strike\nNoncreature spells your opponents cast cost {1} more to cast.', '2', '1'),
      createCard('card-3-3', 'Swords to Plowshares', '{W}', ['W'], 'Instant', 'Target creature is exiled. Its controller gains life equal to its power.'),
      createCard('card-3-4', 'Path to Exile', '{W}', ['W'], 'Instant', 'Exile target creature. Its controller searches their library for a basic land card, puts it onto the battlefield, then shuffles.'),
      createCard('card-3-5', 'Plains', null, ['W'], 'Basic Land — Plains', ''),
      createCard('card-3-6', 'Plains', null, ['W'], 'Basic Land — Plains', ''),
      createCard('card-3-7', 'Plains', null, ['W'], 'Basic Land — Plains', ''),
      createCard('card-3-8', 'Honor of the Pure', '{1}{W}', ['W'], 'Enchantment', 'White creatures you control get +1/+2.'),
      createCard('card-3-9', 'Benalish Marshal', '{1}{W}', ['W'], 'Creature — Human Knight', 'Other creatures you control get +1/+1 and have vigilance.', '2', '2'),
      createCard('card-3-10', 'Soldier of the Pantheon', '{W}', ['W'], 'Creature — Human Soldier', 'Vigilance\nWhenever an opponent casts a multicolored spell, Soldier of the Pantheon gains lifelink until end of turn.', '1', '1'),
    ],
    colors: ['W'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];