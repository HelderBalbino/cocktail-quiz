import React from 'react';
import { CocktailBuilderResult } from '../types/cocktailBuilder';

interface CocktailBuilderResultsProps {
	result: CocktailBuilderResult;
	onRestart: () => void;
	onBackToMenu: () => void;
}

const CocktailBuilderResults: React.FC<CocktailBuilderResultsProps> = ({
	result,
	onRestart,
	onBackToMenu,
}) => {
	const getGradeEmoji = (percentage: number) => {
		if (percentage >= 90) return '🏆';
		if (percentage >= 80) return '🥇';
		if (percentage >= 70) return '🥈';
		if (percentage >= 60) return '🥉';
		return '🍹';
	};

	const getGradeColor = (percentage: number) => {
		if (percentage >= 90) return 'text-yellow-400';
		if (percentage >= 80) return 'text-emerald-400';
		if (percentage >= 70) return 'text-teal-400';
		if (percentage >= 60) return 'text-amber-400';
		return 'text-slate-400';
	};

	const getTitle = (percentage: number) => {
		if (percentage >= 90) return 'Master Mixologist!';
		if (percentage >= 80) return 'Expert Bartender!';
		if (percentage >= 70) return 'Skilled Mixologist!';
		if (percentage >= 60) return 'Cocktail Enthusiast!';
		return 'Keep Learning!';
	};

	return (
		<div className='bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center'>
			{/* Header */}
			<div className='mb-6'>
				<div className='text-5xl sm:text-6xl mb-4'>
					{getGradeEmoji(result.percentage)}
				</div>
				<h2 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
					{getTitle(result.percentage)}
				</h2>
				<p className='text-slate-300 text-base sm:text-lg px-2'>
					{result.message}
				</p>
			</div>

			{/* Score Display */}
			<div className='mb-6'>
				<div
					className={`text-4xl sm:text-5xl font-bold mb-2 ${getGradeColor(
						result.percentage,
					)}`}
				>
					{result.percentage}%
				</div>
				<p className='text-slate-400 text-sm sm:text-base'>
					Average accuracy across {result.totalCocktails} cocktails
				</p>
			</div>

			{/* Stats Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8'>
				<div className='bg-slate-700 border border-slate-600 p-3 sm:p-4 rounded-lg'>
					<div className='text-xl sm:text-2xl font-bold text-emerald-400'>
						{result.score}
					</div>
					<div className='text-xs sm:text-sm text-slate-300'>
						Total Points
					</div>
				</div>
				<div className='bg-slate-700 border border-slate-600 p-3 sm:p-4 rounded-lg'>
					<div className='text-xl sm:text-2xl font-bold text-purple-400'>
						{result.perfectCocktails}
					</div>
					<div className='text-xs sm:text-sm text-slate-300'>
						Perfect Recipes
					</div>
				</div>
				<div className='bg-slate-700 border border-slate-600 p-3 sm:p-4 rounded-lg'>
					<div className='text-xl sm:text-2xl font-bold text-amber-400'>
						{result.streak}
					</div>
					<div className='text-xs sm:text-sm text-slate-300'>
						Best Streak
					</div>
				</div>
				<div className='bg-slate-700 border border-slate-600 p-3 sm:p-4 rounded-lg'>
					<div className='text-xl sm:text-2xl font-bold text-teal-400'>
						{result.totalCocktails}
					</div>
					<div className='text-xs sm:text-sm text-slate-300'>
						Cocktails Made
					</div>
				</div>
			</div>

			{/* Achievement Badges */}
			<div className='mb-8'>
				<h3 className='text-lg font-semibold text-white mb-4'>
					Achievements
				</h3>
				<div className='flex flex-wrap justify-center gap-3'>
					{result.perfectCocktails > 0 && (
						<div className='bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full text-sm font-medium'>
							🎯 Perfect Recipe Maker
						</div>
					)}
					{result.percentage >= 80 && (
						<div className='bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 rounded-full text-sm font-medium'>
							⭐ Expert Mixologist
						</div>
					)}
					{result.streak >= 3 && (
						<div className='bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 rounded-full text-sm font-medium'>
							🔥 Streak Master
						</div>
					)}
					{result.totalCocktails >= 5 && (
						<div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full text-sm font-medium'>
							🍹 Cocktail Explorer
						</div>
					)}
				</div>
			</div>

			{/* Action Buttons */}
			<div className='space-y-4'>
				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<button
						onClick={onRestart}
						className='bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 min-h-[48px] touch-manipulation border border-purple-500'
					>
						🍹 Build More Cocktails
					</button>
					<button
						onClick={onBackToMenu}
						className='bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-200 transform hover:scale-105 min-h-[48px] touch-manipulation border border-slate-500'
					>
						🎮 Back to Games
					</button>
				</div>
			</div>

			{/* Fun Fact */}
			<div className='mt-6 p-4 bg-slate-700/50 border border-slate-600 rounded-lg'>
				<div className='text-emerald-400 font-medium mb-2'>
					🧠 Did you know?
				</div>
				<p className='text-slate-300 text-sm'>
					{result.percentage >= 80
						? "You're showing professional-level cocktail knowledge! Consider a career in mixology!"
						: result.percentage >= 60
						? "You're well on your way to becoming a cocktail expert. Keep practicing!"
						: 'Every master bartender started where you are now. Keep building and learning!'}
				</p>
			</div>
		</div>
	);
};

export default CocktailBuilderResults;
