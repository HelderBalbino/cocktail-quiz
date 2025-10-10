export interface Ingredient {
	id: string;
	name: string;
	category:
		| 'spirit'
		| 'liqueur'
		| 'mixer'
		| 'garnish'
		| 'juice'
		| 'syrup'
		| 'bitters';
	emoji: string;
	color: string;
}

export interface CocktailRecipe {
	id: string;
	name: string;
	emoji: string;
	description: string;
	ingredients: {
		ingredient: Ingredient;
		amount: string;
		essential: boolean; // Must have this ingredient to be correct
	}[];
	instructions: string;
	glassware: string;
	difficulty: 'easy' | 'medium' | 'hard';
	history: string;
}

export interface CocktailBuilderState {
	currentCocktailIndex: number;
	selectedIngredients: Ingredient[];
	score: number;
	streak: number;
	isComplete: boolean;
	showResults: boolean;
	gameMode: 'practice' | 'challenge' | 'timeattack';
}

export interface CocktailBuilderResult {
	score: number;
	totalCocktails: number;
	percentage: number;
	perfectCocktails: number;
	streak: number;
	message: string;
}

export interface GameMode {
	id: string;
	name: string;
	description: string;
	emoji: string;
	color: string;
	features: string[];
}
