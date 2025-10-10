import React, { useState, useEffect } from 'react';
import { CocktailRecipe, Ingredient } from '../types/cocktailBuilder';
import { getMixedIngredientOptions } from '../data/cocktailRecipes';

interface CocktailBuilderCardProps {
	recipe: CocktailRecipe;
	selectedIngredients: Ingredient[];
	onIngredientSelect: (ingredient: Ingredient) => void;
	onIngredientRemove: (ingredient: Ingredient) => void;
	showResults: boolean;
	onComplete: () => void;
}

const CocktailBuilderCard: React.FC<CocktailBuilderCardProps> = ({
	recipe,
	selectedIngredients,
	onIngredientSelect,
	onIngredientRemove,
	showResults,
	onComplete,
}) => {
	const [availableIngredients, setAvailableIngredients] = useState<
		Ingredient[]
	>([]);
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		// Get mixed ingredients when recipe changes
		const mixedIngredients = getMixedIngredientOptions(recipe);
		setAvailableIngredients(mixedIngredients);
	}, [recipe]);

	useEffect(() => {
		// Check if recipe is complete when showing results
		if (showResults) {
			const correctIngredients = recipe.ingredients
				.filter((ing) => ing.essential)
				.map((ing) => ing.ingredient.id);
			const selectedIds = selectedIngredients.map((ing) => ing.id);
			const isComplete = correctIngredients.every((id) =>
				selectedIds.includes(id),
			);

			if (isComplete) {
				setShowConfetti(true);
				setTimeout(() => setShowConfetti(false), 3000);
			}
		}
	}, [showResults, selectedIngredients, recipe]);

	const getIngredientStatus = (ingredient: Ingredient) => {
		const isSelected = selectedIngredients.some(
			(sel) => sel.id === ingredient.id,
		);
		const isCorrect = recipe.ingredients.some(
			(rec) => rec.ingredient.id === ingredient.id,
		);
		const isEssential = recipe.ingredients.some(
			(rec) => rec.ingredient.id === ingredient.id && rec.essential,
		);

		if (!showResults) {
			return {
				selected: isSelected,
				status: 'neutral' as const,
			};
		}

		if (isSelected && isCorrect) {
			return { selected: true, status: 'correct' as const };
		} else if (isSelected && !isCorrect) {
			return { selected: true, status: 'wrong' as const };
		} else if (!isSelected && isEssential) {
			return { selected: false, status: 'missed' as const };
		}

		return { selected: false, status: 'neutral' as const };
	};

	const calculateScore = () => {
		const correctIngredients = recipe.ingredients
			.filter((ing) => ing.essential)
			.map((ing) => ing.ingredient.id);
		const selectedIds = selectedIngredients.map((ing) => ing.id);
		const correctSelected = selectedIds.filter((id) =>
			correctIngredients.includes(id),
		).length;
		const wrongSelected = selectedIds.filter(
			(id) => !recipe.ingredients.some((rec) => rec.ingredient.id === id),
		).length;

		const score = Math.max(0, correctSelected * 10 - wrongSelected * 5);
		const maxScore = correctIngredients.length * 10;
		const percentage = Math.round((score / maxScore) * 100);

		return { score, maxScore, percentage, correctSelected, wrongSelected };
	};

	const scoreData = showResults ? calculateScore() : null;

	return (
		<div className='bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 max-w-4xl mx-auto'>
			{/* Confetti Effect */}
			{showConfetti && (
				<div className='fixed inset-0 pointer-events-none z-50 overflow-hidden'>
					{Array.from({ length: 50 }, (_, i) => (
						<div
							key={i}
							className='absolute text-2xl animate-bounce'
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 2}s`,
								animationDuration: `${2 + Math.random() * 2}s`,
							}}
						>
							🎉
						</div>
					))}
				</div>
			)}

			{/* Recipe Header */}
			<div className='text-center mb-6'>
				<div className='text-4xl sm:text-5xl mb-3'>{recipe.emoji}</div>
				<h2 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
					{recipe.name}
				</h2>
				<p className='text-slate-300 text-sm sm:text-base mb-2'>
					{recipe.description}
				</p>
				<div className='inline-flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-full'>
					<span className='text-xs text-slate-400'>Difficulty:</span>
					<span
						className={`text-xs font-medium ${
							recipe.difficulty === 'easy'
								? 'text-green-400'
								: recipe.difficulty === 'medium'
								? 'text-yellow-400'
								: 'text-red-400'
						}`}
					>
						{recipe.difficulty.charAt(0).toUpperCase() +
							recipe.difficulty.slice(1)}
					</span>
				</div>
			</div>

			{/* Selected Ingredients Bar */}
			<div className='mb-6'>
				<h3 className='text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2'>
					<span className='text-xl'>🍹</span>
					Your Cocktail ({selectedIngredients.length} ingredients)
				</h3>
				<div className='min-h-[60px] bg-slate-700/50 border border-slate-600 rounded-lg p-3'>
					{selectedIngredients.length === 0 ? (
						<div className='text-center text-slate-400 py-4'>
							<span className='text-3xl block mb-2'>🥃</span>
							<span className='text-sm'>
								Select ingredients to build your cocktail
							</span>
						</div>
					) : (
						<div className='flex flex-wrap gap-2'>
							{selectedIngredients.map((ingredient) => {
								const status = getIngredientStatus(ingredient);
								return (
									<button
										key={ingredient.id}
										onClick={() =>
											!showResults &&
											onIngredientRemove(ingredient)
										}
										className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
											showResults
												? status.status === 'correct'
													? 'bg-emerald-600 text-white border border-emerald-500'
													: 'bg-red-600 text-white border border-red-500'
												: 'bg-slate-600 text-white hover:bg-slate-500 border border-slate-500'
										} ${
											!showResults
												? 'hover:scale-105'
												: ''
										}`}
										disabled={showResults}
									>
										<span className='text-lg'>
											{ingredient.emoji}
										</span>
										<span>{ingredient.name}</span>
										{!showResults && (
											<span className='text-xs'>×</span>
										)}
									</button>
								);
							})}
						</div>
					)}
				</div>
			</div>

			{/* Available Ingredients */}
			<div className='mb-6'>
				<h3 className='text-lg font-semibold text-teal-400 mb-3 flex items-center gap-2'>
					<span className='text-xl'>🧪</span>
					Available Ingredients
				</h3>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
					{availableIngredients.map((ingredient) => {
						const status = getIngredientStatus(ingredient);
						const isSelected = selectedIngredients.some(
							(sel) => sel.id === ingredient.id,
						);

						return (
							<button
								key={ingredient.id}
								onClick={() => {
									if (showResults) return;
									if (isSelected) {
										onIngredientRemove(ingredient);
									} else {
										onIngredientSelect(ingredient);
									}
								}}
								className={`p-3 rounded-lg border-2 text-center transition-all duration-200 min-h-[80px] ${
									showResults
										? status.status === 'correct'
											? 'bg-emerald-900 border-emerald-500 text-emerald-100'
											: status.status === 'wrong'
											? 'bg-red-900 border-red-500 text-red-100'
											: status.status === 'missed'
											? 'bg-amber-900 border-amber-500 text-amber-100 animate-pulse'
											: 'bg-slate-700 border-slate-600 text-slate-300'
										: isSelected
										? 'bg-teal-900 border-teal-500 text-teal-100 transform scale-105'
										: 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:border-slate-500 hover:scale-105'
								}`}
								disabled={showResults}
							>
								<div className='text-xl mb-1'>
									{ingredient.emoji}
								</div>
								<div className='text-xs font-medium'>
									{ingredient.name}
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* Results Section */}
			{showResults && (
				<div className='bg-slate-700/50 border border-slate-600 rounded-lg p-4 sm:p-6 mb-6'>
					<h3 className='text-xl font-bold text-white mb-4 flex items-center gap-2'>
						<span className='text-2xl'>📊</span>
						Recipe Results
					</h3>

					{scoreData && (
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
							<div className='text-center p-3 bg-slate-800 rounded-lg'>
								<div
									className={`text-2xl font-bold ${
										scoreData.percentage >= 80
											? 'text-emerald-400'
											: scoreData.percentage >= 60
											? 'text-yellow-400'
											: 'text-red-400'
									}`}
								>
									{scoreData.percentage}%
								</div>
								<div className='text-xs text-slate-400'>
									Accuracy
								</div>
							</div>
							<div className='text-center p-3 bg-slate-800 rounded-lg'>
								<div className='text-2xl font-bold text-emerald-400'>
									{scoreData.correctSelected}
								</div>
								<div className='text-xs text-slate-400'>
									Correct
								</div>
							</div>
							<div className='text-center p-3 bg-slate-800 rounded-lg'>
								<div className='text-2xl font-bold text-red-400'>
									{scoreData.wrongSelected}
								</div>
								<div className='text-xs text-slate-400'>
									Wrong
								</div>
							</div>
						</div>
					)}

					{/* Correct Recipe */}
					<div className='bg-slate-800 rounded-lg p-4'>
						<h4 className='text-lg font-semibold text-emerald-400 mb-3'>
							Correct Recipe:
						</h4>
						<div className='space-y-2'>
							{recipe.ingredients.map(
								(recipeIngredient, index) => (
									<div
										key={index}
										className='flex items-center justify-between text-sm'
									>
										<div className='flex items-center gap-2'>
											<span className='text-lg'>
												{
													recipeIngredient.ingredient
														.emoji
												}
											</span>
											<span className='text-white'>
												{
													recipeIngredient.ingredient
														.name
												}
											</span>
											{recipeIngredient.essential && (
												<span className='text-xs bg-red-600 text-white px-2 py-1 rounded'>
													Essential
												</span>
											)}
										</div>
										<span className='text-slate-300'>
											{recipeIngredient.amount}
										</span>
									</div>
								),
							)}
						</div>

						<div className='mt-4 pt-4 border-t border-slate-600'>
							<h5 className='text-sm font-semibold text-teal-400 mb-2'>
								Instructions:
							</h5>
							<p className='text-sm text-slate-300'>
								{recipe.instructions}
							</p>
							<p className='text-xs text-slate-400 mt-2'>
								Serve in: {recipe.glassware}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Action Button */}
			{!showResults ? (
				<div className='text-center'>
					<button
						onClick={onComplete}
						disabled={selectedIngredients.length === 0}
						className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
					>
						🍹 Check My Cocktail
					</button>
				</div>
			) : (
				<div className='text-center'>
					<button
						onClick={onComplete}
						className='bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105'
					>
						➡️ Next Cocktail
					</button>
				</div>
			)}
		</div>
	);
};

export default CocktailBuilderCard;
