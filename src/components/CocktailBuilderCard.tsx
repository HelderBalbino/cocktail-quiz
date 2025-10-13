import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CocktailRecipe, Ingredient } from '../types/cocktailBuilder';
import { getMixedIngredientOptions } from '../data/cocktailRecipes';
import IngredientCategories from './IngredientCategories';

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
			className='bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl sm:rounded-3xl shadow-2xl mobile-padding sm:p-8 max-w-5xl mx-auto relative overflow-hidden'
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			{/* Background decoration */}
			<div className='absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-transparent to-teal-900/5 pointer-events-none'></div>
			<div className='absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none'></div>
			<div className='absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none'></div>

			{/* Mobile-Optimized Progress Tracker */}
			{!showResults && (
				<motion.div
					className='mb-4 sm:absolute sm:top-4 sm:right-4 z-20'
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 1.0 }}
				>
					<div className='bg-slate-700/90 backdrop-blur-sm border border-slate-600 rounded-xl p-3 sm:p-3 shadow-lg w-full sm:w-auto'>
						<div className='flex items-center justify-between sm:gap-3'>
							<div className='flex items-center gap-4 sm:gap-3'>
								<div className='text-center'>
									<div className='text-mobile-xs text-slate-400 mb-1'>
										Selected
									</div>
									<div
										className={`text-mobile-lg sm:text-lg font-bold ${
											selectedIngredients.length === 0
												? 'text-slate-400'
												: selectedIngredients.length <=
												  3
												? 'text-amber-400'
												: selectedIngredients.length <=
												  5
												? 'text-emerald-400'
												: 'text-purple-400'
										}`}
									>
										{selectedIngredients.length}
									</div>
								</div>
								<div className='w-px h-8 bg-slate-600'></div>
								<div className='text-center'>
									<div className='text-mobile-xs text-slate-400 mb-1'>
										Needed
									</div>
									<div className='text-mobile-lg sm:text-lg font-bold text-teal-400'>
										{
											recipe.ingredients.filter(
												(ing) => ing.essential,
											).length
										}
									</div>
								</div>
							</div>

							{/* Mobile completion indicator */}
							<div className='sm:hidden'>
								<div
									className={`w-2 h-2 rounded-full ${
										selectedIngredients.length >=
										recipe.ingredients.filter(
											(ing) => ing.essential,
										).length
											? 'bg-emerald-400 animate-pulse'
											: 'bg-slate-500'
									}`}
								></div>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Content wrapper */}
			<div className='relative z-10'>
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

				{/* Mobile-Optimized Recipe Header */}
				<motion.div
					className='text-center mb-6 sm:mb-8'
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<motion.div
						className='relative inline-block mb-3 sm:mb-4'
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{
							duration: 0.8,
							delay: 0.3,
							type: 'spring',
							stiffness: 200,
						}}
					>
						<div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl'></div>
						<div className='relative text-5xl sm:text-6xl lg:text-7xl p-3 sm:p-4'>
							{recipe.emoji}
						</div>
					</motion.div>

					<motion.h2
						className='text-mobile-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2 sm:mb-3 px-4'
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						{recipe.name}
					</motion.h2>

					<motion.p
						className='text-slate-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto'
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						{recipe.description}
					</motion.p>

					<motion.div
						className='flex justify-center items-center gap-4'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<div className='bg-gradient-to-r from-slate-700 to-slate-600 px-4 py-2 rounded-full border border-slate-500 shadow-lg'>
							<span className='text-sm text-slate-300 mr-2'>
								🥃
							</span>
							<span className='text-sm font-medium text-teal-400'>
								{recipe.glassware}
							</span>
						</div>

						<div
							className={`px-4 py-2 rounded-full border shadow-lg ${
								recipe.difficulty === 'easy'
									? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-500 text-white'
									: recipe.difficulty === 'medium'
									? 'bg-gradient-to-r from-yellow-600 to-amber-600 border-yellow-500 text-white'
									: 'bg-gradient-to-r from-red-600 to-rose-600 border-red-500 text-white'
							}`}
						>
							<span className='text-sm font-medium'>
								{recipe.difficulty.charAt(0).toUpperCase() +
									recipe.difficulty.slice(1)}
							</span>
						</div>
					</motion.div>
				</motion.div>

				{/* Mobile-Optimized Selected Ingredients Bar */}
				<motion.div
					className='mb-6 sm:mb-8'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.7 }}
				>
					<motion.div
						className='bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-xl sm:rounded-2xl mobile-padding sm:p-6 shadow-xl'
						layout
						transition={{ duration: 0.3 }}
					>
						<motion.div
							className='flex items-center justify-between mb-3 sm:mb-4'
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
							<div className='flex items-center gap-2 sm:gap-3'>
								<motion.span
									className='text-xl sm:text-2xl'
									animate={{ rotate: [0, 10, -10, 0] }}
									transition={{
										duration: 2,
										repeat: Infinity,
										repeatDelay: 3,
									}}
								>
									🍹
								</motion.span>
								<h3 className='text-mobile-lg sm:text-xl font-bold text-emerald-400'>
									Your Cocktail
								</h3>
							</div>
							<motion.div
								className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-mobile-xs sm:text-sm font-bold ${
									selectedIngredients.length === 0
										? 'bg-slate-600 text-slate-400'
										: selectedIngredients.length <= 3
										? 'bg-amber-600 text-white'
										: selectedIngredients.length <= 5
										? 'bg-emerald-600 text-white'
										: 'bg-purple-600 text-white'
								}`}
								animate={{ scale: [1, 1.05, 1] }}
								transition={{
									duration: 0.5,
									repeat: Infinity,
									repeatDelay: 2,
								}}
							>
								{selectedIngredients.length} items
							</motion.div>
						</motion.div>

						{/* Mobile-optimized ingredient display */}
						<motion.div
							className='min-h-[60px] sm:min-h-[80px] bg-slate-900/50 border border-slate-600 rounded-lg sm:rounded-xl p-3 sm:p-4'
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
											Select ingredients to build your
											cocktail
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
													getIngredientStatus(
														ingredient,
													);
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
														<span>
															{ingredient.name}
														</span>
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
				</motion.div>

				{/* Available Ingredients - Organized by Categories */}
				<motion.div className='mb-6'>
					<motion.h3
						className='text-xl font-bold text-teal-400 mb-6 flex items-center gap-3'
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 1.0 }}
					>
						<motion.span
							className='text-2xl'
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
						<div className='bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm font-medium'>
							{availableIngredients.length} ingredients
						</div>
					</motion.h3>

					<IngredientCategories
						ingredients={availableIngredients}
						selectedIngredients={selectedIngredients}
						onIngredientSelect={onIngredientSelect}
						onIngredientRemove={onIngredientRemove}
						showResults={showResults}
						getIngredientStatus={getIngredientStatus}
					/>
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
										transition={{
											duration: 0.4,
											delay: 0.5,
										}}
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
										transition={{
											duration: 0.4,
											delay: 0.6,
										}}
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
										transition={{
											duration: 0.4,
											delay: 0.7,
										}}
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
															rotate: [
																0, 10, -10, 0,
															],
														}}
														transition={{
															duration: 2,
															delay:
																1.5 +
																index * 0.1,
															repeat: Infinity,
															repeatDelay: 3,
														}}
													>
														{
															recipeIngredient
																.ingredient
																.emoji
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
															initial={{
																scale: 0,
															}}
															animate={{
																scale: 1,
															}}
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
										transition={{
											duration: 0.3,
											delay: 1.7,
										}}
									>
										Instructions:
									</motion.h5>
									<motion.p
										className='text-sm text-slate-300'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: 0.4,
											delay: 1.8,
										}}
									>
										{recipe.instructions}
									</motion.p>
									<motion.p
										className='text-xs text-slate-400 mt-2'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: 0.3,
											delay: 1.9,
										}}
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
										transition={{
											duration: 0.4,
											delay: 2.1,
										}}
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
										transition={{
											duration: 0.5,
											delay: 2.3,
										}}
									>
										{recipe.history}
									</motion.p>
								</motion.div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Mobile-Optimized Action Buttons */}
				{!showResults ? (
					<motion.div
						className='text-center space-y-3 sm:space-y-4'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 1.2 }}
					>
						<motion.button
							onClick={onComplete}
							disabled={selectedIngredients.length === 0}
							className={`relative overflow-hidden font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl text-mobile-base sm:text-lg shadow-2xl transition-all duration-300 w-full sm:w-auto touch-target ${
								selectedIngredients.length === 0
									? 'bg-slate-600 text-slate-400 cursor-not-allowed'
									: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-700'
							}`}
							whileHover={{
								scale:
									selectedIngredients.length > 0 ? 1.02 : 1,
								boxShadow:
									selectedIngredients.length > 0
										? '0 20px 40px rgba(16, 185, 129, 0.4)'
										: 'none',
							}}
							whileTap={{
								scale:
									selectedIngredients.length > 0 ? 0.98 : 1,
							}}
							animate={
								selectedIngredients.length > 0
									? {
											backgroundPosition: [
												'0% 50%',
												'100% 50%',
												'0% 50%',
											],
									  }
									: {}
							}
							transition={{
								backgroundPosition: {
									duration: 3,
									repeat: Infinity,
								},
								scale: { type: 'spring', stiffness: 300 },
							}}
							style={{
								backgroundSize:
									selectedIngredients.length > 0
										? '200% 100%'
										: '100% 100%',
							}}
						>
							{selectedIngredients.length === 0 && (
								<motion.div
									className='absolute inset-0 bg-slate-700 opacity-50'
									initial={{ width: '0%' }}
									animate={{ width: '100%' }}
									transition={{ duration: 0.3 }}
								/>
							)}
							<span className='relative z-10 flex items-center justify-center gap-2 sm:gap-3'>
								<span className='text-xl sm:text-2xl'>🍹</span>
								<span className='hidden sm:inline'>
									Check My Cocktail
								</span>
								<span className='sm:hidden'>
									Check Cocktail
								</span>
								{selectedIngredients.length > 0 && (
									<motion.span
										className='bg-white/20 px-2 py-1 rounded-full text-mobile-xs sm:text-sm'
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: 'spring',
											stiffness: 300,
										}}
									>
										{selectedIngredients.length}
									</motion.span>
								)}
							</span>
						</motion.button>

						{selectedIngredients.length === 0 && (
							<motion.p
								className='text-slate-400 text-mobile-sm px-4'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								<span className='sm:hidden'>
									Tap ingredients to build your cocktail
								</span>
								<span className='hidden sm:inline'>
									Select ingredients to build your cocktail
								</span>
							</motion.p>
						)}
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
							className='relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl text-mobile-base sm:text-lg shadow-2xl w-full sm:w-auto touch-target'
							whileHover={{
								scale: 1.02,
								boxShadow:
									'0 20px 40px rgba(168, 85, 247, 0.5)',
							}}
							whileTap={{ scale: 0.95 }}
							animate={{
								backgroundPosition: [
									'0% 50%',
									'100% 50%',
									'0% 50%',
								],
							}}
							transition={{
								backgroundPosition: {
									duration: 3,
									repeat: Infinity,
								},
								scale: { type: 'spring', stiffness: 300 },
							}}
							style={{ backgroundSize: '200% 100%' }}
						>
							<span className='flex items-center justify-center gap-2 sm:gap-3'>
								<span className='text-xl sm:text-2xl'>➡️</span>
								<span>Next Cocktail</span>
							</span>
						</motion.button>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default CocktailBuilderCard;
