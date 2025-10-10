import { Ingredient, CocktailRecipe } from '../types/cocktailBuilder';

// Available ingredients for selection
export const ingredients: Ingredient[] = [
	// Spirits
	{
		id: 'vodka',
		name: 'Vodka',
		category: 'spirit',
		emoji: '🥶',
		color: 'bg-slate-200',
	},
	{
		id: 'gin',
		name: 'Gin',
		category: 'spirit',
		emoji: '🌿',
		color: 'bg-green-200',
	},
	{
		id: 'rum-white',
		name: 'White Rum',
		category: 'spirit',
		emoji: '🏝️',
		color: 'bg-blue-200',
	},
	{
		id: 'rum-dark',
		name: 'Dark Rum',
		category: 'spirit',
		emoji: '🏴‍☠️',
		color: 'bg-amber-800',
	},
	{
		id: 'tequila',
		name: 'Tequila',
		category: 'spirit',
		emoji: '🌵',
		color: 'bg-yellow-200',
	},
	{
		id: 'whiskey',
		name: 'Whiskey',
		category: 'spirit',
		emoji: '🥃',
		color: 'bg-amber-600',
	},
	{
		id: 'bourbon',
		name: 'Bourbon',
		category: 'spirit',
		emoji: '🌽',
		color: 'bg-orange-600',
	},

	// Liqueurs
	{
		id: 'cointreau',
		name: 'Cointreau',
		category: 'liqueur',
		emoji: '🍊',
		color: 'bg-orange-300',
	},
	{
		id: 'triple-sec',
		name: 'Triple Sec',
		category: 'liqueur',
		emoji: '🧡',
		color: 'bg-orange-200',
	},
	{
		id: 'campari',
		name: 'Campari',
		category: 'liqueur',
		emoji: '❤️',
		color: 'bg-red-500',
	},
	{
		id: 'sweet-vermouth',
		name: 'Sweet Vermouth',
		category: 'liqueur',
		emoji: '🍷',
		color: 'bg-red-400',
	},
	{
		id: 'dry-vermouth',
		name: 'Dry Vermouth',
		category: 'liqueur',
		emoji: '🤍',
		color: 'bg-gray-300',
	},
	{
		id: 'chambord',
		name: 'Chambord',
		category: 'liqueur',
		emoji: '🫐',
		color: 'bg-purple-600',
	},
	{
		id: 'amaretto',
		name: 'Amaretto',
		category: 'liqueur',
		emoji: '🥜',
		color: 'bg-amber-500',
	},

	// Juices
	{
		id: 'lime-juice',
		name: 'Lime Juice',
		category: 'juice',
		emoji: '🟢',
		color: 'bg-lime-300',
	},
	{
		id: 'lemon-juice',
		name: 'Lemon Juice',
		category: 'juice',
		emoji: '🟡',
		color: 'bg-yellow-300',
	},
	{
		id: 'orange-juice',
		name: 'Orange Juice',
		category: 'juice',
		emoji: '🟠',
		color: 'bg-orange-300',
	},
	{
		id: 'cranberry-juice',
		name: 'Cranberry Juice',
		category: 'juice',
		emoji: '🔴',
		color: 'bg-red-300',
	},
	{
		id: 'grapefruit-juice',
		name: 'Grapefruit Juice',
		category: 'juice',
		emoji: '🩷',
		color: 'bg-pink-300',
	},

	// Syrups
	{
		id: 'simple-syrup',
		name: 'Simple Syrup',
		category: 'syrup',
		emoji: '🍯',
		color: 'bg-yellow-100',
	},
	{
		id: 'grenadine',
		name: 'Grenadine',
		category: 'syrup',
		emoji: '🌹',
		color: 'bg-red-300',
	},
	{
		id: 'agave-syrup',
		name: 'Agave Syrup',
		category: 'syrup',
		emoji: '🌿',
		color: 'bg-green-300',
	},

	// Mixers
	{
		id: 'soda-water',
		name: 'Soda Water',
		category: 'mixer',
		emoji: '💧',
		color: 'bg-blue-100',
	},
	{
		id: 'tonic-water',
		name: 'Tonic Water',
		category: 'mixer',
		emoji: '✨',
		color: 'bg-blue-200',
	},
	{
		id: 'ginger-beer',
		name: 'Ginger Beer',
		category: 'mixer',
		emoji: '🔥',
		color: 'bg-amber-200',
	},
	{
		id: 'cola',
		name: 'Cola',
		category: 'mixer',
		emoji: '🥤',
		color: 'bg-amber-900',
	},

	// Garnishes
	{
		id: 'mint',
		name: 'Fresh Mint',
		category: 'garnish',
		emoji: '🌱',
		color: 'bg-green-400',
	},
	{
		id: 'lime-wheel',
		name: 'Lime Wheel',
		category: 'garnish',
		emoji: '🍋‍🟩',
		color: 'bg-lime-400',
	},
	{
		id: 'orange-peel',
		name: 'Orange Peel',
		category: 'garnish',
		emoji: '🍊',
		color: 'bg-orange-400',
	},
	{
		id: 'cherry',
		name: 'Maraschino Cherry',
		category: 'garnish',
		emoji: '🍒',
		color: 'bg-red-400',
	},
	{
		id: 'olives',
		name: 'Olives',
		category: 'garnish',
		emoji: '🫒',
		color: 'bg-green-600',
	},

	// Bitters
	{
		id: 'angostura',
		name: 'Angostura Bitters',
		category: 'bitters',
		emoji: '💧',
		color: 'bg-amber-700',
	},
	{
		id: 'orange-bitters',
		name: 'Orange Bitters',
		category: 'bitters',
		emoji: '🧡',
		color: 'bg-orange-500',
	},
];

// Fisher-Yates shuffle for ingredients
const shuffleIngredients = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

// Helper function to find ingredient by ID
const findIngredient = (id: string): Ingredient => {
	const ingredient = ingredients.find((ing) => ing.id === id);
	if (!ingredient) throw new Error(`Ingredient ${id} not found`);
	return ingredient;
};

// Cocktail recipes for the builder game
const baseCocktailRecipes: CocktailRecipe[] = [
	{
		id: 'mojito',
		name: 'Mojito',
		emoji: '🍃',
		description:
			'The classic Cuban cocktail with white rum, mint, and lime',
		ingredients: [
			{
				ingredient: findIngredient('rum-white'),
				amount: '50ml',
				essential: true,
			},
			{
				ingredient: findIngredient('lime-juice'),
				amount: '25ml',
				essential: true,
			},
			{
				ingredient: findIngredient('simple-syrup'),
				amount: '15ml',
				essential: true,
			},
			{
				ingredient: findIngredient('mint'),
				amount: '8-10 leaves',
				essential: true,
			},
			{
				ingredient: findIngredient('soda-water'),
				amount: 'Top',
				essential: true,
			},
		],
		instructions:
			'Muddle mint gently, add rum, lime juice, and syrup. Shake with ice, strain into glass with fresh ice. Top with soda water.',
		glassware: 'Highball Glass',
		difficulty: 'easy',
	},
	{
		id: 'negroni',
		name: 'Negroni',
		emoji: '🍷',
		description: 'Equal parts gin, Campari, and sweet vermouth',
		ingredients: [
			{
				ingredient: findIngredient('gin'),
				amount: '30ml',
				essential: true,
			},
			{
				ingredient: findIngredient('campari'),
				amount: '30ml',
				essential: true,
			},
			{
				ingredient: findIngredient('sweet-vermouth'),
				amount: '30ml',
				essential: true,
			},
			{
				ingredient: findIngredient('orange-peel'),
				amount: '1 twist',
				essential: false,
			},
		],
		instructions:
			'Stir all ingredients with ice. Strain into rocks glass over large ice cube. Express orange peel over drink.',
		glassware: 'Rocks Glass',
		difficulty: 'medium',
	},
	{
		id: 'margarita',
		name: 'Margarita',
		emoji: '🍹',
		description:
			'Tequila, lime juice, and orange liqueur - the perfect balance',
		ingredients: [
			{
				ingredient: findIngredient('tequila'),
				amount: '50ml',
				essential: true,
			},
			{
				ingredient: findIngredient('lime-juice'),
				amount: '25ml',
				essential: true,
			},
			{
				ingredient: findIngredient('cointreau'),
				amount: '20ml',
				essential: true,
			},
			{
				ingredient: findIngredient('lime-wheel'),
				amount: '1 wheel',
				essential: false,
			},
		],
		instructions:
			'Shake all ingredients with ice. Strain into coupe glass or rocks glass with salted rim.',
		glassware: 'Coupe or Rocks Glass',
		difficulty: 'easy',
	},
	{
		id: 'old-fashioned',
		name: 'Old Fashioned',
		emoji: '🥃',
		description: 'Whiskey, sugar, bitters - the original cocktail',
		ingredients: [
			{
				ingredient: findIngredient('bourbon'),
				amount: '60ml',
				essential: true,
			},
			{
				ingredient: findIngredient('simple-syrup'),
				amount: '10ml',
				essential: true,
			},
			{
				ingredient: findIngredient('angostura'),
				amount: '2-3 dashes',
				essential: true,
			},
			{
				ingredient: findIngredient('orange-peel'),
				amount: '1 twist',
				essential: false,
			},
		],
		instructions:
			'Stir all ingredients with ice. Strain into rocks glass over large ice cube. Express orange peel.',
		glassware: 'Rocks Glass',
		difficulty: 'medium',
	},
	{
		id: 'martini',
		name: 'Gin Martini',
		emoji: '🍸',
		description: 'The classic: gin and dry vermouth, stirred not shaken',
		ingredients: [
			{
				ingredient: findIngredient('gin'),
				amount: '60ml',
				essential: true,
			},
			{
				ingredient: findIngredient('dry-vermouth'),
				amount: '10ml',
				essential: true,
			},
			{
				ingredient: findIngredient('olives'),
				amount: '2-3 olives',
				essential: false,
			},
		],
		instructions:
			'Stir gin and vermouth with ice. Strain into chilled coupe glass. Garnish with olives.',
		glassware: 'Coupe Glass',
		difficulty: 'hard',
	},
	{
		id: 'daiquiri',
		name: 'Daiquiri',
		emoji: '🏝️',
		description: 'Simple perfection: white rum, lime, and sugar',
		ingredients: [
			{
				ingredient: findIngredient('rum-white'),
				amount: '50ml',
				essential: true,
			},
			{
				ingredient: findIngredient('lime-juice'),
				amount: '25ml',
				essential: true,
			},
			{
				ingredient: findIngredient('simple-syrup'),
				amount: '15ml',
				essential: true,
			},
		],
		instructions:
			'Shake all ingredients with ice. Double strain into chilled coupe glass.',
		glassware: 'Coupe Glass',
		difficulty: 'easy',
	},
	{
		id: 'whiskey-sour',
		name: 'Whiskey Sour',
		emoji: '🍋',
		description: 'Whiskey, lemon juice, and simple syrup - a classic sour',
		ingredients: [
			{
				ingredient: findIngredient('bourbon'),
				amount: '50ml',
				essential: true,
			},
			{
				ingredient: findIngredient('lemon-juice'),
				amount: '25ml',
				essential: true,
			},
			{
				ingredient: findIngredient('simple-syrup'),
				amount: '15ml',
				essential: true,
			},
			{
				ingredient: findIngredient('cherry'),
				amount: '1 cherry',
				essential: false,
			},
		],
		instructions:
			'Shake all ingredients with ice. Strain into coupe glass. Garnish with cherry.',
		glassware: 'Coupe Glass',
		difficulty: 'easy',
	},
	{
		id: 'moscow-mule',
		name: 'Moscow Mule',
		emoji: '🐴',
		description: 'Vodka, lime juice, and ginger beer in a copper mug',
		ingredients: [
			{
				ingredient: findIngredient('vodka'),
				amount: '50ml',
				essential: true,
			},
			{
				ingredient: findIngredient('lime-juice'),
				amount: '15ml',
				essential: true,
			},
			{
				ingredient: findIngredient('ginger-beer'),
				amount: 'Top',
				essential: true,
			},
			{
				ingredient: findIngredient('lime-wheel'),
				amount: '1 wheel',
				essential: false,
			},
		],
		instructions:
			'Build in copper mug with ice. Add vodka and lime juice, top with ginger beer. Stir gently.',
		glassware: 'Copper Mug',
		difficulty: 'easy',
	},
];

// Export shuffled cocktail recipes
export const cocktailRecipes: CocktailRecipe[] = baseCocktailRecipes;

// Function to get shuffled recipes
export const getShuffledCocktailRecipes = (): CocktailRecipe[] => {
	return [...baseCocktailRecipes].sort(() => Math.random() - 0.5);
};

// Function to get wrong ingredients for a cocktail (for multiple choice style)
export const getWrongIngredients = (
	correctIngredients: Ingredient[],
	count: number = 8,
): Ingredient[] => {
	const correctIds = correctIngredients.map((ing) => ing.id);
	const availableWrong = ingredients.filter(
		(ing) => !correctIds.includes(ing.id),
	);
	return shuffleIngredients(availableWrong).slice(0, count);
};

// Function to get mixed ingredients for selection (correct + wrong)
export const getMixedIngredientOptions = (
	recipe: CocktailRecipe,
): Ingredient[] => {
	const correctIngredients = recipe.ingredients.map((ing) => ing.ingredient);
	const wrongIngredients = getWrongIngredients(correctIngredients, 12);
	const allOptions = [...correctIngredients, ...wrongIngredients];
	return shuffleIngredients(allOptions);
};
