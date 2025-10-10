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
			"The classic Cuban cocktail that's refreshing and aromatic",
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
		history: 'The Mojito originated in 16th century Cuba, initially as a medicinal drink called "El Draque" named after English privateer Sir Francis Drake. Cuban slaves working in sugar fields created an early version using aguardiente (a crude rum precursor), lime juice, sugar cane juice, and mint to combat scurvy and other ailments. The modern Mojito gained international fame through Ernest Hemingway, who frequented La Bodeguita del Medio in Havana where he famously said, "My mojito in La Bodeguita, my daiquiri in El Floridita."',
	},
	{
		id: 'negroni',
		name: 'Negroni',
		emoji: '🍷',
		description: 'A bold and bitter Italian aperitif cocktail',
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
		history: 'Created in 1919 at Caffè Casoni in Florence by Count Camillo Negroni, who asked bartender Fosco Scarselli to strengthen his favorite Americano cocktail by replacing soda water with gin. The drink was originally called the "Negroni sbagliato" (wrong Negroni) but became so popular that it dropped the "sbagliato." The Negroni family later established a distillery and began producing a ready-made version. This bitter aperitif became a symbol of Italian sophistication and is now celebrated annually on Negroni Week worldwide.',
	},
	{
		id: 'margarita',
		name: 'Margarita',
		emoji: '🍹',
		description: 'A vibrant Mexican cocktail with a perfect citrus balance',
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
		history: 'The Margarita\'s origins are disputed, with multiple creation stories from the 1930s-1940s. The most credible tale credits Carlos "Danny" Herrera, who created it in 1938 at his restaurant Rancho La Gloria in Tijuana for customer Marjorie King, who was allergic to all spirits except tequila. Another story credits socialite Margarita Sames, who supposedly invented it in 1948 at her Acapulco vacation home. The drink gained popularity in the US during the 1970s, coinciding with the rise of tequila imports and Mexican cuisine culture.',
	},
	{
		id: 'old-fashioned',
		name: 'Old Fashioned',
		emoji: '🥃',
		description: 'The timeless American classic cocktail',
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
		history: 'The Old Fashioned dates back to the 1880s when cocktail culture was becoming overly complicated with elaborate ingredients. Traditional drinkers demanded their whiskey be made the "old-fashioned way" - simply with whiskey, sugar, bitters, and water. The drink was first documented in 1895 in George Kappeler\'s "Modern American Drinks." Originally made with rye whiskey, it later transitioned to bourbon. The cocktail experienced a renaissance in the 2000s, becoming a symbol of classic American bartending and the craft cocktail movement.',
	},
	{
		id: 'martini',
		name: 'Gin Martini',
		emoji: '🍸',
		description: 'The ultimate sophisticated cocktail served ice-cold',
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
		history: 'The Martini\'s exact origins are debated, but it likely evolved from the Martinez cocktail in the 1880s. Some credit Jerry Thomas\'s 1887 "Bartender\'s Guide," while others point to the town of Martinez, California. Initially made with Old Tom gin and sweet vermouth, it gradually shifted to dry vermouth and London Dry gin. The ratio debate ("dry" vs "wet") became legendary, with Winston Churchill famously preferring his so dry that he would "glance at the vermouth bottle while drinking the gin." James Bond popularized the "shaken, not stirred" variation, though purists insist on stirring.',
	},
	{
		id: 'daiquiri',
		name: 'Daiquiri',
		emoji: '🏝️',
		description: 'A perfectly balanced tropical classic',
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
		history: 'Named after the Cuban town of Daiquirí, this cocktail was invented around 1898 by American mining engineer Jennings Cox. When entertaining guests at his home near Santiago de Cuba, Cox ran out of gin and substituted the local Bacardi rum with lime juice and sugar. The drink gained international fame through Constantino Ribalaigua, head bartender at El Floridita in Havana, who perfected the recipe and served it to celebrities including Ernest Hemingway. Hemingway famously preferred his "Papa Doble" - a double daiquiri with no sugar and extra lime.',
	},
	{
		id: 'whiskey-sour',
		name: 'Whiskey Sour',
		emoji: '🍋',
		description: 'A tangy and smooth classic American cocktail',
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
		history: 'The Whiskey Sour belongs to the "sour" family of cocktails that emerged in the 1860s, following the basic template of spirit, citrus, and sweetener. First published in Jerry Thomas\'s 1862 "How to Mix Drinks," it originally used gum syrup instead of simple syrup. The drink gained popularity during American Prohibition when bootleg whiskey was harsh and needed mellowing with citrus and sugar. Modern craft bartenders often add egg white for texture and foam, creating the "Boston Sour" variation. The cocktail represents the perfect balance of sweet, sour, and spirit - a foundational concept in mixology.',
	},
	{
		id: 'moscow-mule',
		name: 'Moscow Mule',
		emoji: '🐴',
		description:
			'A crisp and spicy cocktail traditionally served in copper',
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
		history: 'The Moscow Mule was invented in 1941 at the Cock \'n\' Bull pub in Hollywood by owner Jack Morgan, who was struggling to sell his homemade ginger beer. He partnered with John Martin from Heublein spirits (promoting Smirnoff vodka) and Sophie Berezinski (selling copper mugs). Together they created this cocktail, served in the distinctive copper mug, which became essential to the drink\'s identity. The copper mug keeps the drink colder and enhances the aroma. The Moscow Mule helped introduce vodka to American palates and sparked the tiki cocktail movement of the 1940s-50s.',
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
