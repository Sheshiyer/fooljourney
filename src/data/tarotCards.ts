import type { TarotCard } from '../types';

export const tarotCards: Record<string, TarotCard> = {
  'Seven of Wands': {
    name: 'Seven of Wands',
    meaning: 'Standing your ground, defending your position, perseverance against opposition',
    reversed: 'Giving up, overwhelmed by challenges, lack of self-belief',
    element: 'Fire',
    planet: 'Mars'
  },
  'Knight of Swords': {
    name: 'Knight of Swords',
    meaning: 'Action, impulsiveness, defending beliefs, rushing forward',
    reversed: 'Recklessness, impatience, lack of direction, aggression',
    element: 'Air',
    planet: 'Mercury'
  },
  'Three of Wands': {
    name: 'Three of Wands',
    meaning: 'Expansion, foresight, overseas opportunities, leadership',
    reversed: 'Lack of foresight, delays, obstacles to expansion',
    element: 'Fire',
    planet: 'Sun'
  },
  'The Fool': {
    name: 'The Fool',
    meaning: 'New beginnings, innocence, spontaneity, free spirit',
    reversed: 'Recklessness, taken advantage of, inconsideration, foolishness',
    element: 'Air',
    planet: 'Uranus'
  }
};