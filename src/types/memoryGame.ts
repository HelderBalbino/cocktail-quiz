export type Difficulty = 'easy' | 'medium' | 'hard';

export type CardType = 'ingredient' | 'cocktail' | 'glass';

export interface MemoryCard {
	id: string;
	type: CardType;
	value: string; // The actual content (ingredient name, cocktail name, etc.)
	emoji: string;
	image?: string;
	isFlipped: boolean;
	isMatched: boolean;
	pairId: string; // Used to identify matching pairs
}

export interface DifficultyConfig {
	gridSize: number; // Total number of cards (must be even)
	rows: number;
	cols: number;
	timeLimit: number; // in seconds
	cardTypes: CardType[];
	name: string;
	description: string;
}

export interface MemoryGameState {
	cards: MemoryCard[];
	difficulty: Difficulty;
	flippedCards: string[]; // Array of card IDs currently flipped
	matchedPairs: number;
	totalPairs: number;
	moves: number;
	timeLeft: number;
	isComplete: boolean;
	isPlaying: boolean;
	score: number;
	startTime?: number;
}

export interface MemoryGameResult {
	score: number;
	moves: number;
	timeUsed: number;
	totalPairs: number;
	matchedPairs: number;
	difficulty: Difficulty;
	percentage: number;
	message: string;
	stars: number; // 1-3 star rating
}

export interface GameMode {
	id: 'quiz' | 'cocktail-builder' | 'memory-match';
	name: string;
	description: string;
	emoji: string;
	color: string;
	features: string[];
}

// Card content interfaces
export interface IngredientCard {
	id: string;
	name: string;
	emoji: string;
	category: string;
}

export interface CocktailCard {
	id: string;
	name: string;
	emoji: string;
	glass: string;
}

export interface GlassCard {
	id: string;
	name: string;
	emoji: string;
	description: string;
}
