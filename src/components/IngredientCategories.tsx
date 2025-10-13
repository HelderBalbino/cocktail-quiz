import React from 'react';
import { motion } from 'framer-motion';
import { Ingredient } from '../types/cocktailBuilder';

interface IngredientCategoriesProps {
	ingredients: Ingredient[];
	selectedIngredients: Ingredient[];
	onIngredientSelect: (ingredient: Ingredient) => void;
	onIngredientRemove: (ingredient: Ingredient) => void;
	showResults: boolean;
	getIngredientStatus: (ingredient: Ingredient) => {
		selected: boolean;
		status: 'correct' | 'wrong' | 'missed' | 'neutral';
	};
}

const categoryInfo = {
	spirit: {
		name: 'Spirits',
		emoji: '🥃',
		color: 'from-amber-600 to-orange-600',
	},
	liqueur: {
		name: 'Liqueurs',
		emoji: '🍷',
		color: 'from-purple-600 to-pink-600',
	},
	juice: {
		name: 'Juices',
		emoji: '🍊',
		color: 'from-orange-500 to-yellow-500',
	},
	syrup: {
		name: 'Syrups',
		emoji: '🍯',
		color: 'from-yellow-600 to-amber-600',
	},
	mixer: { name: 'Mixers', emoji: '💧', color: 'from-blue-500 to-cyan-500' },
	garnish: {
		name: 'Garnishes',
		emoji: '🌿',
		color: 'from-green-500 to-emerald-500',
	},
	bitters: {
		name: 'Bitters',
		emoji: '💧',
		color: 'from-red-600 to-rose-600',
	},
};

const IngredientCategories: React.FC<IngredientCategoriesProps> = ({
	ingredients,
	selectedIngredients,
	onIngredientSelect,
	onIngredientRemove,
	showResults,
	getIngredientStatus,
}) => {
	const categorizedIngredients = React.useMemo(() => {
		const categories: Record<string, Ingredient[]> = {};
		ingredients.forEach((ingredient) => {
			if (!categories[ingredient.category]) {
				categories[ingredient.category] = [];
			}
			categories[ingredient.category].push(ingredient);
		});
		return categories;
	}, [ingredients]);

	return (
		<motion.div
			className='space-y-4 sm:space-y-6'
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.9 }}
		>
			{Object.entries(categorizedIngredients).map(
				([category, categoryIngredients], categoryIndex) => {
					const info =
						categoryInfo[category as keyof typeof categoryInfo];
					if (!info) return null;

					return (
						<motion.div
							key={category}
							className='bg-slate-700/30 rounded-xl mobile-padding sm:p-4 border border-slate-600/50'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								duration: 0.4,
								delay: 1.0 + categoryIndex * 0.1,
							}}
						>
							<motion.div
								className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.3,
									delay: 1.1 + categoryIndex * 0.1,
								}}
							>
								<div
									className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
								>
									{info.emoji}
								</div>
								<h4 className='text-mobile-base sm:text-lg font-semibold text-white'>
									{info.name}
								</h4>
								<div className='bg-slate-600 text-slate-300 px-2 py-1 rounded-full text-mobile-xs font-medium ml-auto'>
									{categoryIngredients.length}
								</div>
							</motion.div>

							{/* Mobile-optimized ingredient grid */}
							<motion.div
								className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.4,
									delay: 1.2 + categoryIndex * 0.1,
								}}
							>
								{categoryIngredients.map(
									(ingredient, index) => {
										const status =
											getIngredientStatus(ingredient);
										const isSelected =
											selectedIngredients.some(
												(sel) =>
													sel.id === ingredient.id,
											);

										return (
											<motion.button
												key={ingredient.id}
												initial={{
													opacity: 0,
													scale: 0.8,
													y: 20,
												}}
												animate={{
													opacity: 1,
													scale: 1,
													y: 0,
												}}
												transition={{
													duration: 0.3,
													delay:
														1.3 +
														categoryIndex * 0.1 +
														index * 0.03,
													type: 'spring',
													stiffness: 300,
												}}
												whileHover={{
													scale: showResults
														? 1
														: isSelected
														? 1.1
														: 1.05,
													rotateY: showResults
														? 0
														: 5,
												}}
												whileTap={{
													scale: showResults
														? 1
														: 0.95,
												}}
												onClick={() => {
													if (showResults) return;
													if (isSelected) {
														onIngredientRemove(
															ingredient,
														);
													} else {
														onIngredientSelect(
															ingredient,
														);
													}
												}}
												className={`relative p-2 sm:p-3 rounded-xl border-2 text-center transition-all duration-200 touch-target group ${
													showResults
														? status.status ===
														  'correct'
															? 'bg-emerald-900/80 border-emerald-400 text-emerald-100 shadow-emerald-400/20 shadow-lg'
															: status.status ===
															  'wrong'
															? 'bg-red-900/80 border-red-400 text-red-100 shadow-red-400/20 shadow-lg'
															: status.status ===
															  'missed'
															? 'bg-amber-900/80 border-amber-400 text-amber-100 animate-pulse shadow-amber-400/20 shadow-lg'
															: 'bg-slate-700/50 border-slate-600 text-slate-300'
														: isSelected
														? 'bg-gradient-to-br from-teal-800 to-teal-900 border-teal-400 text-teal-100 shadow-teal-400/30 shadow-lg transform'
														: 'bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/70 hover:border-slate-500 hover:shadow-lg active:scale-95'
												}`}
												disabled={showResults}
											>
												{/* Status indicator */}
												{showResults &&
													status.status !==
														'neutral' && (
														<motion.div
															className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
																status.status ===
																'correct'
																	? 'bg-emerald-500 text-white'
																	: status.status ===
																	  'wrong'
																	? 'bg-red-500 text-white'
																	: 'bg-amber-500 text-white'
															}`}
															initial={{
																scale: 0,
															}}
															animate={{
																scale: 1,
															}}
															transition={{
																duration: 0.3,
																delay: 0.5,
															}}
														>
															{status.status ===
															'correct'
																? '✓'
																: status.status ===
																  'wrong'
																? '✗'
																: '!'}
														</motion.div>
													)}

												{/* Selection indicator */}
												{isSelected && !showResults && (
													<motion.div
														className='absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center'
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{
															type: 'spring',
															stiffness: 300,
														}}
													>
														<span className='text-xs text-white'>
															✓
														</span>
													</motion.div>
												)}

												<motion.div
													className='text-xl sm:text-2xl mb-1 sm:mb-2'
													animate={
														isSelected &&
														!showResults
															? {
																	scale: [
																		1, 1.2,
																		1,
																	],
																	rotate: [
																		0, 10,
																		-10, 0,
																	],
															  }
															: {}
													}
													transition={{
														duration: 0.5,
													}}
												>
													{ingredient.emoji}
												</motion.div>
												<div className='text-mobile-xs sm:text-xs font-medium leading-tight px-1'>
													{ingredient.name}
												</div>

												{/* Mobile-friendly tooltip (only on non-touch devices) */}
												<div className='hidden sm:block opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10'>
													{ingredient.name}
													<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'></div>
												</div>
											</motion.button>
										);
									},
								)}
							</motion.div>
						</motion.div>
					);
				},
			)}
		</motion.div>
	);
};

export default IngredientCategories;
