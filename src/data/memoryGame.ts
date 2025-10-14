import {
	IngredientCard,
	CocktailCard,
	GlassCard,
	Difficulty,
	DifficultyConfig,
	MemoryCard,
	CardType,
} from '../types/memoryGame';
import { fetchMultipleCocktailImages } from '../services/cocktailAPI';

// Ingredient cards for memory matching
export const ingredientCards: IngredientCard[] = [
	{ id: 'ing1', name: 'Vodka', emoji: '🍸', category: 'spirit' },
	{ id: 'ing2', name: 'Gin', emoji: '🍸', category: 'spirit' },
	{ id: 'ing3', name: 'Rum', emoji: '🥃', category: 'spirit' },
	{ id: 'ing4', name: 'Whiskey', emoji: '🥃', category: 'spirit' },
	{ id: 'ing5', name: 'Tequila', emoji: '🍹', category: 'spirit' },
	{ id: 'ing6', name: 'Lime Juice', emoji: '🍋', category: 'juice' },
	{ id: 'ing7', name: 'Lemon Juice', emoji: '🍋', category: 'juice' },
	{ id: 'ing8', name: 'Orange Juice', emoji: '🍊', category: 'juice' },
	{ id: 'ing9', name: 'Cranberry Juice', emoji: '🫐', category: 'juice' },
	{ id: 'ing10', name: 'Pineapple Juice', emoji: '🍍', category: 'juice' },
	{ id: 'ing11', name: 'Simple Syrup', emoji: '🍯', category: 'syrup' },
	{ id: 'ing12', name: 'Grenadine', emoji: '🍒', category: 'syrup' },
	{ id: 'ing13', name: 'Triple Sec', emoji: '🍊', category: 'liqueur' },
	{ id: 'ing14', name: 'Cointreau', emoji: '🍊', category: 'liqueur' },
	{ id: 'ing15', name: 'Amaretto', emoji: '🌰', category: 'liqueur' },
	{ id: 'ing16', name: 'Mint', emoji: '🌿', category: 'garnish' },
	{ id: 'ing17', name: 'Lime Wheel', emoji: '🍋', category: 'garnish' },
	{ id: 'ing18', name: 'Cherry', emoji: '🍒', category: 'garnish' },
	{ id: 'ing19', name: 'Olive', emoji: '🫒', category: 'garnish' },
	{ id: 'ing20', name: 'Orange Peel', emoji: '🍊', category: 'garnish' },
];

// Cocktail cards for memory matching
export const cocktailCards: CocktailCard[] = [
	{ id: 'cock1', name: 'Mojito', emoji: '🍹', glass: 'Highball' },
	{ id: 'cock2', name: 'Margarita', emoji: '🍹', glass: 'Margarita' },
	{ id: 'cock3', name: 'Martini', emoji: '🍸', glass: 'Martini' },
	{ id: 'cock4', name: 'Manhattan', emoji: '🥃', glass: 'Coupe' },
	{ id: 'cock5', name: 'Old Fashioned', emoji: '🥃', glass: 'Rocks' },
	{ id: 'cock6', name: 'Cosmopolitan', emoji: '🍸', glass: 'Martini' },
	{ id: 'cock7', name: 'Daiquiri', emoji: '🍹', glass: 'Coupe' },
	{ id: 'cock8', name: 'Piña Colada', emoji: '🥥', glass: 'Hurricane' },
	{ id: 'cock9', name: 'Negroni', emoji: '🍷', glass: 'Rocks' },
	{ id: 'cock10', name: 'Whiskey Sour', emoji: '🍋', glass: 'Coupe' },
	{ id: 'cock11', name: 'Mai Tai', emoji: '🍹', glass: 'Tiki' },
	{ id: 'cock12', name: 'Bloody Mary', emoji: '🍅', glass: 'Highball' },
	{ id: 'cock13', name: 'Espresso Martini', emoji: '☕', glass: 'Martini' },
	{ id: 'cock14', name: 'Moscow Mule', emoji: '🫚', glass: 'Copper Mug' },
	{ id: 'cock15', name: 'French 75', emoji: '🥂', glass: 'Flute' },
];

// Glass cards for memory matching
export const glassCards: GlassCard[] = [
	{
		id: 'glass1',
		name: 'Martini Glass',
		emoji: '🍸',
		description: 'Iconic V-shaped cocktail glass',
	},
	{
		id: 'glass2',
		name: 'Highball Glass',
		emoji: '🥤',
		description: 'Tall glass for mixed drinks',
	},
	{
		id: 'glass3',
		name: 'Rocks Glass',
		emoji: '🥃',
		description: 'Short tumbler for spirits',
	},
	{
		id: 'glass4',
		name: 'Coupe Glass',
		emoji: '🍷',
		description: 'Shallow, broad bowl glass',
	},
	{
		id: 'glass5',
		name: 'Hurricane Glass',
		emoji: '🌪️',
		description: 'Curved glass for tropical drinks',
	},
	{
		id: 'glass6',
		name: 'Margarita Glass',
		emoji: '🍹',
		description: 'Wide rim glass for margaritas',
	},
	{
		id: 'glass7',
		name: 'Wine Glass',
		emoji: '🍷',
		description: 'Traditional wine serving glass',
	},
	{
		id: 'glass8',
		name: 'Champagne Flute',
		emoji: '🥂',
		description: 'Tall, narrow sparkling wine glass',
	},
	{
		id: 'glass9',
		name: 'Copper Mug',
		emoji: '🫚',
		description: 'Metal mug for Moscow Mules',
	},
	{
		id: 'glass10',
		name: 'Tiki Mug',
		emoji: '🗿',
		description: 'Decorative ceramic mug',
	},
];

// Difficulty configurations
export const difficultyConfigs: Record<Difficulty, DifficultyConfig> = {
	easy: {
		gridSize: 12,
		rows: 3,
		cols: 4,
		timeLimit: 120, // 2 minutes
		cardTypes: ['ingredient'],
		name: 'Easy',
		description: '3×4 grid • Ingredients only • 2 minutes',
	},
	medium: {
		gridSize: 16,
		rows: 4,
		cols: 4,
		timeLimit: 180, // 3 minutes
		cardTypes: ['ingredient', 'cocktail'],
		name: 'Medium',
		description: '4×4 grid • Ingredients & Cocktails • 3 minutes',
	},
	hard: {
		gridSize: 20,
		rows: 4,
		cols: 5,
		timeLimit: 240, // 4 minutes
		cardTypes: ['ingredient', 'cocktail', 'glass'],
		name: 'Hard',
		description: '4×5 grid • All card types • 4 minutes',
	},
};

// Shuffle array utility
const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

// Generate memory cards for a specific difficulty
export const generateMemoryCards = async (
	difficulty: Difficulty,
): Promise<MemoryCard[]> => {
	const config = difficultyConfigs[difficulty];
	const pairsNeeded = config.gridSize / 2;
	const cards: MemoryCard[] = [];

	// Get enhanced cocktail cards with images
	const enhancedCocktails = await getCocktailCardsWithImages();

	// Get available cards based on difficulty
	let availableCards: {
		id: string;
		name: string;
		emoji: string;
		imageUrl?: string;
		type: CardType;
	}[] = [];

	if (config.cardTypes.includes('ingredient')) {
		availableCards.push(
			...ingredientCards.map((card) => ({
				...card,
				type: 'ingredient' as CardType,
			})),
		);
	}
	if (config.cardTypes.includes('cocktail')) {
		availableCards.push(
			...enhancedCocktails.map((card) => ({
				...card,
				type: 'cocktail' as CardType,
			})),
		);
	}
	if (config.cardTypes.includes('glass')) {
		availableCards.push(
			...glassCards.map((card) => ({
				...card,
				type: 'glass' as CardType,
			})),
		);
	}

	// Shuffle and select the required number of unique cards
	const shuffledCards = shuffleArray(availableCards);
	const selectedCards = shuffledCards.slice(0, pairsNeeded);

	// Create pairs of memory cards
	selectedCards.forEach((card, index) => {
		const pairId = `pair-${index}`;

		// First card of the pair
		cards.push({
			id: `${card.id}-1`,
			type: card.type,
			value: card.name,
			emoji: card.emoji,
			image: card.imageUrl,
			isFlipped: false,
			isMatched: false,
			pairId: pairId,
		});

		// Second card of the pair
		cards.push({
			id: `${card.id}-2`,
			type: card.type,
			value: card.name,
			emoji: card.emoji,
			image: card.imageUrl,
			isFlipped: false,
			isMatched: false,
			pairId: pairId,
		});
	});

	// Shuffle the final card array
	return shuffleArray(cards);
};

// Calculate score based on performance
export const calculateMemoryScore = (
	moves: number,
	timeUsed: number,
	timeLimit: number,
	difficulty: Difficulty,
): { score: number; stars: number; message: string } => {
	const baseScore = 1000;
	const difficultyMultiplier =
		difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;

	// Time bonus (more time left = higher bonus)
	const timeRatio = Math.max(0, (timeLimit - timeUsed) / timeLimit);
	const timeBonus = Math.floor(timeRatio * 500);

	// Move penalty (fewer moves = higher score)
	const optimalMoves = difficultyConfigs[difficulty].gridSize;
	const movePenalty = Math.max(0, (moves - optimalMoves) * 10);

	// Calculate final score
	const finalScore = Math.max(
		0,
		Math.floor(
			(baseScore + timeBonus - movePenalty) * difficultyMultiplier,
		),
	);

	// Determine stars (1-3)
	let stars = 1;
	let message = 'Good effort! Keep practicing your memory skills.';

	if (timeRatio > 0.6 && moves <= optimalMoves * 1.2) {
		stars = 3;
		message = 'Incredible! You have an amazing memory!';
	} else if (timeRatio > 0.3 && moves <= optimalMoves * 1.5) {
		stars = 2;
		message = 'Great job! Your memory skills are impressive!';
	}

	return { score: finalScore, stars, message };
};

// Get random memory game tip
export const getMemoryGameTip = (): string => {
	const tips = [
		"💡 Focus on the corners and edges first - they're easier to remember!",
		'🧠 Try to create mental patterns or stories to remember card positions.',
		'⚡ Take a moment to scan the board before making your first move.',
		'🎯 Look for distinctive emojis that stand out from the rest.',
		'🔄 If you find one card, try to remember where you saw its pair earlier.',
		"⏰ Don't rush - accuracy is more important than speed.",
		'🌟 Practice with easier difficulties to build your memory skills.',
		'🎨 Group similar card types together in your mind for better recall.',
	];

	return tips[Math.floor(Math.random() * tips.length)];
};

/**
 * Enhance cocktail cards with images from TheCocktailDB API
 * @param cards - Original cocktail cards array
 * @returns Promise<CocktailCard[]> - Enhanced cards with image URLs
 */
export const enhanceCocktailCardsWithImages = async (
	cards: CocktailCard[],
): Promise<CocktailCard[]> => {
	try {
		// Extract cocktail names for API requests
		const cocktailNames = cards.map((card) => card.name);

		// Fetch images for all cocktails
		const imageMap = await fetchMultipleCocktailImages(cocktailNames);

		// Enhance cards with image URLs
		const enhancedCards = cards.map((card) => ({
			...card,
			imageUrl: imageMap.get(card.name) || undefined,
		}));

		return enhancedCards;
	} catch (error) {
		console.warn('Failed to enhance cocktail cards with images:', error);
		// Return original cards as fallback
		return cards;
	}
};

/**
 * Get cocktail cards with images (cached for performance)
 */
let enhancedCocktailCardsCache: CocktailCard[] | null = null;

export const getCocktailCardsWithImages = async (): Promise<CocktailCard[]> => {
	if (enhancedCocktailCardsCache) {
		return enhancedCocktailCardsCache;
	}

	enhancedCocktailCardsCache = await enhanceCocktailCardsWithImages(
		cocktailCards,
	);
	return enhancedCocktailCardsCache;
};
