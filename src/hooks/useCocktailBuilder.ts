import { useState, useCallback, useMemo } from 'react';
import {
	CocktailBuilderState,
	CocktailBuilderResult,
	Ingredient,
	CocktailRecipe,
} from '../types/cocktailBuilder';
import { getShuffledCocktailRecipes } from '../data/cocktailRecipes';

export const useCocktailBuilder = () => {
	const [cocktailRecipes, setCocktailRecipes] = useState<CocktailRecipe[]>(
		() => getShuffledCocktailRecipes(),
	);
	const [cocktailBuilderState, setCocktailBuilderState] =
		useState<CocktailBuilderState>({
			currentCocktailIndex: 0,
			selectedIngredients: [],
			score: 0,
			streak: 0,
			isComplete: false,
			showResults: false,
			gameMode: 'practice',
		});
	const [showCocktailResults, setShowCocktailResults] = useState(false);
	const [cocktailScores, setCocktailScores] = useState<number[]>([]);

	const currentRecipe = useMemo(
		() => cocktailRecipes[cocktailBuilderState.currentCocktailIndex],
		[cocktailRecipes, cocktailBuilderState.currentCocktailIndex],
	);

	const selectedIngredients = useMemo(
		() => cocktailBuilderState.selectedIngredients,
		[cocktailBuilderState.selectedIngredients],
	);

	const startCocktailBuilder = useCallback(() => {
		const shuffledRecipes = getShuffledCocktailRecipes();
		setCocktailRecipes(shuffledRecipes);
		setCocktailBuilderState({
			currentCocktailIndex: 0,
			selectedIngredients: [],
			score: 0,
			streak: 0,
			isComplete: false,
			showResults: false,
			gameMode: 'practice',
		});
		setShowCocktailResults(false);
		setCocktailScores([]);
	}, []);

	const handleIngredientSelect = useCallback((ingredient: Ingredient) => {
		setCocktailBuilderState((prev) => {
			if (
				!prev.selectedIngredients.some(
					(ing) => ing.id === ingredient.id,
				)
			) {
				return {
					...prev,
					selectedIngredients: [
						...prev.selectedIngredients,
						ingredient,
					],
				};
			}
			return prev;
		});
	}, []);

	const handleIngredientRemove = useCallback((ingredient: Ingredient) => {
		setCocktailBuilderState((prev) => ({
			...prev,
			selectedIngredients: prev.selectedIngredients.filter(
				(ing) => ing.id !== ingredient.id,
			),
		}));
	}, []);

	const calculateCocktailScore = useCallback(
		(recipe: CocktailRecipe, selected: Ingredient[]) => {
			const correctIngredients = recipe.ingredients
				.filter((ing) => ing.essential)
				.map((ing) => ing.ingredient.id);
			const selectedIds = selected.map((ing) => ing.id);
			const correctSelected = selectedIds.filter((id) =>
				correctIngredients.includes(id),
			).length;
			const wrongSelected = selectedIds.filter(
				(id) =>
					!recipe.ingredients.some((rec) => rec.ingredient.id === id),
			).length;

			// Dynamic scoring based on recipe complexity
			const maxScore = correctIngredients.length * 10;
			const score = Math.max(0, correctSelected * 10 - wrongSelected * 5);
			return { score, maxScore, correctSelected, wrongSelected };
		},
		[],
	);

	const handleCocktailComplete = useCallback(() => {
		if (!showCocktailResults) {
			// Show results for current cocktail
			setShowCocktailResults(true);

			// Calculate score for this cocktail
			const { score } = calculateCocktailScore(
				currentRecipe,
				selectedIngredients,
			);
			setCocktailScores((prev) => [...prev, score]);

			// Update streak
			const correctIngredients = currentRecipe.ingredients
				.filter((ing) => ing.essential)
				.map((ing) => ing.ingredient.id);
			const selectedIds = selectedIngredients.map((ing) => ing.id);
			const isPerfect =
				correctIngredients.every((id) => selectedIds.includes(id)) &&
				selectedIds.every((id) => correctIngredients.includes(id));

			setCocktailBuilderState((prev) => ({
				...prev,
				streak: isPerfect ? prev.streak + 1 : 0,
			}));
		} else {
			// Move to next cocktail
			const nextIndex = cocktailBuilderState.currentCocktailIndex + 1;

			if (nextIndex >= cocktailRecipes.length) {
				// End game
				setCocktailBuilderState((prev) => ({
					...prev,
					isComplete: true,
					showResults: true,
				}));
				return 'cocktail-results';
			} else {
				// Next cocktail
				setCocktailBuilderState((prev) => ({
					...prev,
					currentCocktailIndex: nextIndex,
					selectedIngredients: [],
				}));
				setShowCocktailResults(false);
				return null;
			}
		}
	}, [
		showCocktailResults,
		currentRecipe,
		selectedIngredients,
		calculateCocktailScore,
		cocktailBuilderState.currentCocktailIndex,
		cocktailRecipes.length,
	]);

	const getCocktailBuilderResult = useCallback((): CocktailBuilderResult => {
		const totalScore = cocktailScores.reduce(
			(sum, score) => sum + score,
			0,
		);

		// Calculate dynamic max possible score
		const maxPossibleScore = cocktailRecipes.reduce((sum, recipe) => {
			const essentialCount = recipe.ingredients.filter(
				(ing) => ing.essential,
			).length;
			return sum + essentialCount * 10;
		}, 0);

		const percentage =
			maxPossibleScore > 0
				? Math.round((totalScore / maxPossibleScore) * 100)
				: 0;

		// Count perfect cocktails (100% accuracy for each recipe)
		const perfectCocktails = cocktailScores.filter((score, index) => {
			const recipe = cocktailRecipes[index];
			const maxCocktailScore =
				recipe.ingredients.filter((ing) => ing.essential).length * 10;
			return score === maxCocktailScore;
		}).length;

		let message = '';
		if (percentage >= 80) message = "Amazing! You're a natural mixologist!";
		else if (percentage >= 60)
			message = "Great work! You're learning fast!";
		else
			message =
				'Keep practicing - every cocktail is a learning experience!';

		return {
			score: totalScore,
			totalCocktails: cocktailRecipes.length,
			percentage,
			perfectCocktails,
			streak: cocktailBuilderState.streak,
			message,
		};
	}, [cocktailScores, cocktailRecipes, cocktailBuilderState.streak]);

	const resetCocktailBuilder = useCallback(() => {
		startCocktailBuilder();
	}, [startCocktailBuilder]);

	return {
		cocktailRecipes,
		cocktailBuilderState,
		selectedIngredients,
		showCocktailResults,
		cocktailScores,
		currentRecipe,
		startCocktailBuilder,
		handleIngredientSelect,
		handleIngredientRemove,
		handleCocktailComplete,
		getCocktailBuilderResult,
		resetCocktailBuilder,
		calculateCocktailScore,
	};
};
