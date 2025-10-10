import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
		<motion.div
			className='bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			{/* Animated Confetti Effect */}
			<AnimatePresence>
				{showConfetti && (
					<motion.div
						className='fixed inset-0 pointer-events-none z-50 overflow-hidden'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						{Array.from({ length: 50 }, (_, i) => (
							<motion.div
								key={i}
								className='absolute text-2xl'
								initial={{
									x: '50%',
									y: '50%',
									scale: 0,
									rotate: 0,
								}}
								animate={{
									x: `${Math.random() * 100}%`,
									y: `${Math.random() * 100}%`,
									scale: [0, 1.2, 1],
									rotate: 360,
								}}
								exit={{
									scale: 0,
									opacity: 0,
								}}
								transition={{
									duration: 2 + Math.random() * 2,
									ease: 'easeOut',
									delay: Math.random() * 0.5,
								}}
							>
								🎉
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Recipe Header with staggered animations */}
			<motion.div
				className='text-center mb-6'
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<motion.div
					className='text-4xl sm:text-5xl mb-3'
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.3,
						type: 'spring',
						stiffness: 200,
					}}
				>
					{recipe.emoji}
				</motion.div>
				<motion.h2
					className='text-2xl sm:text-3xl font-bold text-white mb-2'
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					{recipe.name}
				</motion.h2>
				<motion.p
					className='text-slate-300 text-sm sm:text-base mb-4'
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					{recipe.description}
				</motion.p>
				<motion.div
					className='flex justify-center items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<div className='inline-flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-full'>
						<span className='text-xs text-slate-400'>
							Served in:
						</span>
						<span className='text-xs font-medium text-teal-400'>
							{recipe.glassware}
						</span>
					</div>
				</motion.div>
			</motion.div>

			{/* Selected Ingredients Bar with animations */}
			<motion.div
				className='mb-6'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.7 }}
			>
				<motion.h3
					className='text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2'
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<motion.span
						className='text-xl'
						animate={{ rotate: [0, 10, -10, 0] }}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatDelay: 3,
						}}
					>
						🍹
					</motion.span>
					Your Cocktail ({selectedIngredients.length} ingredients)
				</motion.h3>
				<motion.div
					className='min-h-[60px] bg-slate-700/50 border border-slate-600 rounded-lg p-3'
					layout
					transition={{ duration: 0.3 }}
				>
					<AnimatePresence mode='wait'>
						{selectedIngredients.length === 0 ? (
							<motion.div
								className='text-center text-slate-400 py-4'
								key='empty-state'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								<motion.span
									className='text-3xl block mb-2'
									animate={{
										scale: [1, 1.1, 1],
										rotate: [0, 5, -5, 0],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										repeatDelay: 2,
									}}
								>
									🥃
								</motion.span>
								<span className='text-sm'>
									Select ingredients to build your cocktail
								</span>
							</motion.div>
						) : (
							<motion.div
								className='flex flex-wrap gap-2'
								key='ingredients-list'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								{selectedIngredients.map(
									(ingredient, index) => {
										const status =
											getIngredientStatus(ingredient);
										return (
											<motion.button
												key={ingredient.id}
												initial={{
													opacity: 0,
													scale: 0.8,
													x: -20,
												}}
												animate={{
													opacity: 1,
													scale: 1,
													x: 0,
												}}
												exit={{
													opacity: 0,
													scale: 0.8,
													x: 20,
												}}
												transition={{
													duration: 0.3,
													delay: index * 0.1,
													type: 'spring',
													stiffness: 300,
												}}
												whileHover={{
													scale: showResults
														? 1
														: 1.05,
												}}
												whileTap={{
													scale: showResults
														? 1
														: 0.95,
												}}
												onClick={() =>
													!showResults &&
													onIngredientRemove(
														ingredient,
													)
												}
												className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
													showResults
														? status.status ===
														  'correct'
															? 'bg-emerald-600 text-white border border-emerald-500'
															: 'bg-red-600 text-white border border-red-500'
														: 'bg-slate-600 text-white hover:bg-slate-500 border border-slate-500'
												}`}
												disabled={showResults}
											>
												<span className='text-lg'>
													{ingredient.emoji}
												</span>
												<span>{ingredient.name}</span>
												{!showResults && (
													<span className='text-xs'>
														×
													</span>
												)}
											</motion.button>
										);
									},
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.div>

			{/* Available Ingredients with staggered animations */}
			<motion.div
				className='mb-6'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.9 }}
			>
				<motion.h3
					className='text-lg font-semibold text-teal-400 mb-3 flex items-center gap-2'
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 1.0 }}
				>
					<motion.span
						className='text-xl'
						animate={{ rotate: [0, 15, -15, 0] }}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							repeatDelay: 4,
						}}
					>
						🧪
					</motion.span>
					Available Ingredients
				</motion.h3>
				<motion.div
					className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 1.1 }}
				>
					{availableIngredients.map((ingredient, index) => {
						const status = getIngredientStatus(ingredient);
						const isSelected = selectedIngredients.some(
							(sel) => sel.id === ingredient.id,
						);

						return (
							<motion.button
								key={ingredient.id}
								initial={{ opacity: 0, scale: 0.8, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{
									duration: 0.3,
									delay: 1.2 + index * 0.05,
									type: 'spring',
									stiffness: 300,
								}}
								whileHover={{
									scale: showResults
										? 1
										: isSelected
										? 1.1
										: 1.05,
									rotateY: showResults ? 0 : 5,
								}}
								whileTap={{ scale: showResults ? 1 : 0.95 }}
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
										? 'bg-teal-900 border-teal-500 text-teal-100'
										: 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:border-slate-500'
								}`}
								disabled={showResults}
							>
								<motion.div
									className='text-xl mb-1'
									animate={
										isSelected
											? {
													scale: [1, 1.2, 1],
													rotate: [0, 10, -10, 0],
											  }
											: {}
									}
									transition={{ duration: 0.5 }}
								>
									{ingredient.emoji}
								</motion.div>
								<div className='text-xs font-medium'>
									{ingredient.name}
								</div>
							</motion.button>
						);
					})}
				</motion.div>
			</motion.div>

			{/* Results Section */}
			<AnimatePresence>
				{showResults && (
					<motion.div
						className='bg-slate-700/50 border border-slate-600 rounded-lg p-4 sm:p-6 mb-6'
						initial={{ opacity: 0, scale: 0.9, y: 30 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: -30 }}
						transition={{
							duration: 0.5,
							type: 'spring',
							damping: 25,
						}}
					>
						<motion.h3
							className='text-xl font-bold text-white mb-4 flex items-center gap-2'
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<motion.span
								className='text-2xl'
								animate={{
									scale: [1, 1.2, 1],
									rotate: [0, 5, -5, 0],
								}}
								transition={{ duration: 1, delay: 0.4 }}
							>
								📊
							</motion.span>
							Recipe Results
						</motion.h3>

						{scoreData && (
							<motion.div
								className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<motion.div
									className='text-center p-3 bg-slate-800 rounded-lg'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: 0.5 }}
									whileHover={{ scale: 1.05 }}
								>
									<motion.div
										className={`text-2xl font-bold ${
											scoreData.percentage >= 80
												? 'text-emerald-400'
												: scoreData.percentage >= 60
												? 'text-yellow-400'
												: 'text-red-400'
										}`}
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: 'spring',
											stiffness: 200,
											damping: 10,
											delay: 0.7,
										}}
									>
										{scoreData.percentage}%
									</motion.div>
									<div className='text-xs text-slate-400'>
										Accuracy
									</div>
								</motion.div>
								<motion.div
									className='text-center p-3 bg-slate-800 rounded-lg'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: 0.6 }}
									whileHover={{ scale: 1.05 }}
								>
									<motion.div
										className='text-2xl font-bold text-emerald-400'
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: 'spring',
											stiffness: 200,
											damping: 10,
											delay: 0.8,
										}}
									>
										{scoreData.correctSelected}
									</motion.div>
									<div className='text-xs text-slate-400'>
										Correct
									</div>
								</motion.div>
								<motion.div
									className='text-center p-3 bg-slate-800 rounded-lg'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: 0.7 }}
									whileHover={{ scale: 1.05 }}
								>
									<motion.div
										className='text-2xl font-bold text-red-400'
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: 'spring',
											stiffness: 200,
											damping: 10,
											delay: 0.9,
										}}
									>
										{scoreData.wrongSelected}
									</motion.div>
									<div className='text-xs text-slate-400'>
										Wrong
									</div>
								</motion.div>
							</motion.div>
						)}

						{/* Correct Recipe */}
						<motion.div
							className='bg-slate-800 rounded-lg p-4'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 1.0 }}
						>
							<motion.h4
								className='text-lg font-semibold text-emerald-400 mb-3'
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 1.1 }}
							>
								Correct Recipe:
							</motion.h4>
							<motion.div
								className='space-y-2'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 1.2 }}
							>
								{recipe.ingredients.map(
									(recipeIngredient, index) => (
										<motion.div
											key={index}
											className='flex items-center justify-between text-sm'
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												duration: 0.3,
												delay: 1.3 + index * 0.1,
											}}
										>
											<div className='flex items-center gap-2'>
												<motion.span
													className='text-lg'
													animate={{
														rotate: [0, 10, -10, 0],
													}}
													transition={{
														duration: 2,
														delay:
															1.5 + index * 0.1,
														repeat: Infinity,
														repeatDelay: 3,
													}}
												>
													{
														recipeIngredient
															.ingredient.emoji
													}
												</motion.span>
												<span className='text-white'>
													{
														recipeIngredient
															.ingredient.name
													}
												</span>
												{recipeIngredient.essential && (
													<motion.span
														className='text-xs bg-red-600 text-white px-2 py-1 rounded'
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{
															type: 'spring',
															stiffness: 300,
															delay:
																1.4 +
																index * 0.1,
														}}
													>
														Essential
													</motion.span>
												)}
											</div>
											<span className='text-slate-300'>
												{recipeIngredient.amount}
											</span>
										</motion.div>
									),
								)}
							</motion.div>

							<motion.div
								className='mt-4 pt-4 border-t border-slate-600'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 1.6 }}
							>
								<motion.h5
									className='text-sm font-semibold text-teal-400 mb-2'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, delay: 1.7 }}
								>
									Instructions:
								</motion.h5>
								<motion.p
									className='text-sm text-slate-300'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.4, delay: 1.8 }}
								>
									{recipe.instructions}
								</motion.p>
								<motion.p
									className='text-xs text-slate-400 mt-2'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, delay: 1.9 }}
								>
									Serve in: {recipe.glassware}
								</motion.p>
							</motion.div>

							{/* Cocktail History Section */}
							<motion.div
								className='mt-6 pt-4 border-t border-slate-600'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 2.0 }}
							>
								<motion.h5
									className='text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2'
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: 2.1 }}
								>
									<motion.span
										className='text-lg'
										animate={{
											rotate: [0, 10, -10, 0],
											scale: [1, 1.1, 1],
										}}
										transition={{
											duration: 3,
											delay: 2.2,
											repeat: Infinity,
											repeatDelay: 5,
										}}
									>
										📜
									</motion.span>
									Historical Background
								</motion.h5>
								<motion.p
									className='text-sm text-slate-300 leading-relaxed'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 2.3 }}
								>
									{recipe.history}
								</motion.p>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Action Button */}
			{!showResults ? (
				<motion.div
					className='text-center'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1.2 }}
				>
					<motion.button
						onClick={onComplete}
						disabled={selectedIngredients.length === 0}
						className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
						whileHover={{
							scale: selectedIngredients.length > 0 ? 1.05 : 1,
							boxShadow:
								selectedIngredients.length > 0
									? '0 10px 25px rgba(16, 185, 129, 0.3)'
									: 'none',
						}}
						whileTap={{
							scale: selectedIngredients.length > 0 ? 0.95 : 1,
						}}
						animate={
							selectedIngredients.length > 0
								? {
										boxShadow: [
											'0 0 0 rgba(16, 185, 129, 0)',
											'0 0 20px rgba(16, 185, 129, 0.3)',
											'0 0 0 rgba(16, 185, 129, 0)',
										],
								  }
								: {}
						}
						transition={{
							boxShadow: { duration: 2, repeat: Infinity },
							scale: { type: 'spring', stiffness: 300 },
						}}
					>
						🍹 Check My Cocktail
					</motion.button>
				</motion.div>
			) : (
				<motion.div
					className='text-center'
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 2.0 }}
				>
					<motion.button
						onClick={onComplete}
						className='bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105'
						whileHover={{
							scale: 1.05,
							boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)',
						}}
						whileTap={{ scale: 0.95 }}
						animate={{
							boxShadow: [
								'0 0 0 rgba(168, 85, 247, 0)',
								'0 0 20px rgba(168, 85, 247, 0.4)',
								'0 0 0 rgba(168, 85, 247, 0)',
							],
						}}
						transition={{
							boxShadow: { duration: 2.5, repeat: Infinity },
							scale: { type: 'spring', stiffness: 300 },
						}}
					>
						➡️ Next Cocktail
					</motion.button>
				</motion.div>
			)}
		</motion.div>
	);
};

export default CocktailBuilderCard;
