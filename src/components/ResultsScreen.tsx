import React from 'react';
import { QuizResult } from '../types/quiz';

interface ResultsScreenProps {
	result: QuizResult;
	onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onRestart }) => {
	const getGradeEmoji = (percentage: number) => {
		if (percentage >= 90) return '🏆';
		if (percentage >= 80) return '🥇';
		if (percentage >= 70) return '🥈';
		if (percentage >= 60) return '🥉';
		return '📚';
	};

	const getGradeColor = (percentage: number) => {
		if (percentage >= 90) return 'text-yellow-400';
		if (percentage >= 80) return 'text-emerald-400';
		if (percentage >= 70) return 'text-teal-400';
		if (percentage >= 60) return 'text-amber-400';
		return 'text-slate-400';
	};

	return (
		<div className='bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto text-center'>
			<div className='mb-4 sm:mb-6'>
				<div className='text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4'>
					{getGradeEmoji(result.percentage)}
				</div>
				<h2 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
					Quiz Complete!
				</h2>
				<p className='text-slate-300 text-base sm:text-lg px-2'>
					{result.message}
				</p>
			</div>

			<div className='mb-6 sm:mb-8'>
				<div
					className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${getGradeColor(
						result.percentage,
					)}`}
				>
					{result.percentage}%
				</div>
				<p className='text-gray-600 text-sm sm:text-base lg:text-lg'>
					You scored {result.score} out of {result.totalQuestions}{' '}
					questions correctly
				</p>
			</div>

			<div className='space-y-4 sm:space-y-6'>
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center'>
					<div className='bg-slate-700 border border-slate-600 p-3 sm:p-4 rounded-lg'>
						<div className='text-xl sm:text-2xl font-bold text-emerald-400'>
							{result.score}
						</div>
						<div className='text-xs sm:text-sm text-slate-300'>
							Correct
						</div>
					</div>
					<div className='bg-slate-700 border border-slate-600 p-3 sm:p-4 rounded-lg'>
						<div className='text-xl sm:text-2xl font-bold text-red-400'>
							{result.totalQuestions - result.score}
						</div>
						<div className='text-xs sm:text-sm text-slate-300'>
							Incorrect
						</div>
					</div>
					<div className='bg-slate-700 border border-slate-600 p-3 sm:p-4 rounded-lg'>
						<div className='text-xl sm:text-2xl font-bold text-teal-400'>
							{result.totalQuestions}
						</div>
						<div className='text-xs sm:text-sm text-slate-300'>
							Total
						</div>
					</div>
				</div>

				<button
					onClick={onRestart}
					className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base border border-emerald-500'
				>
					🔄 Take Quiz Again
				</button>
			</div>
		</div>
	);
};

export default ResultsScreen;
