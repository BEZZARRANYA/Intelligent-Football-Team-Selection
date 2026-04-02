export interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  score: number;
  recentForm: number;
  fitness: number;
  minutes: number;
  matchesPlayed: number;
  starts: number;
}

export interface LineupPlayer {
  position: string;
  basePosition: string;
  playerId: number;
  playerName: string;
  naturalPosition: string;
  score: number;
  isNaturalPosition: boolean;
  recentForm: number;
  fitness: number;
  compatFactor: number;
}

export interface BenchPlayer {
  playerId: number;
  playerName: string;
  naturalPosition: string;
  score: number;
}

export interface Formation {
  name: string;
  description: string;
  positions: string[];
  positionsDisplay: Record<string, { x: number; y: number } | { x: number; y: number }[]>;
}

export interface LineupData {
  lineup: LineupPlayer[];
  bench: Record<string, BenchPlayer[]>;
  teamScore: number;
  averageScore: number;
  outOfPosition: number;
}

export interface SelectionReason {
  stat: string;
  description: string;
  value: number;
  contribution: number;
  normalized: number;
}

export interface PlayerExplanation {
  playerId: number;
  playerName: string;
  position: string;
  naturalPosition: string;
  isNaturalPosition: boolean;
  overallScore: number;
  fitness: number;
  recentForm: number;
  minutes: number;
  compatFactor: number;
  rankForPosition: number;
  totalCandidates: number;
  selectionSentence: string;
  backupComparison: string;
  scoreGap: number;
  selectionReasons: SelectionReason[];
  positionDescription: string;
}

export type TacticalMode = 'balanced' | 'attacking' | 'defensive';
export type FormationType = '4-3-3' | '4-2-3-1' | '4-4-2';
