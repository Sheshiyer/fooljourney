export interface JournalEntry {
  id: string;
  title: string;
  symbol: string;
  tarot: string;
  numerology: string;
  content: string;
  secrets: string[];
  interactions: string[];
  timestamp?: number;
}

export interface TarotCard {
  name: string;
  meaning: string;
  reversed: string;
  element: string;
  planet: string;
}

export interface Secret {
  id: string;
  content: string;
  discovered: boolean;
  entryId: string;
}

export interface UserState {
  darkMode: boolean;
  activeEntry: string | null;
  discoveredSecrets: string[];
  mousePosition: { x: number; y: number };
  konamiProgress: number;
  breathActive: boolean;
  timeDilationActive: boolean;
  portalActive: boolean;
  pillarNames: string[];
}

export interface BlogEntry extends JournalEntry {
  author?: string;
  tags?: string[];
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}