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
		if (percentage >= 90) return 'text-yellow-600';
		if (percentage >= 80) return 'text-green-600';
		if (percentage >= 70) return 'text-blue-600';
		if (percentage >= 60) return 'text-orange-600';
		return 'text-red-600';
	};

	return (
		<div className='bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto text-center'>
			<div className='mb-6'>
				<div className='text-6xl mb-4'>
					{getGradeEmoji(result.percentage)}
				</div>
				<h2 className='text-3xl font-bold text-gray-800 mb-2'>
					Quiz Complete!
				</h2>
				<p className='text-gray-600 text-lg'>{result.message}</p>
			</div>

			<div className='mb-8'>
				<div
					className={`text-5xl font-bold mb-2 ${getGradeColor(
						result.percentage,
					)}`}
				>
					{result.percentage}%
				</div>
				<p className='text-gray-600 text-lg'>
					You scored {result.score} out of {result.totalQuestions}{' '}
					questions correctly
				</p>
			</div>

			<div className='space-y-4'>
				<div className='grid grid-cols-3 gap-4 text-center'>
					<div className='bg-green-50 p-4 rounded-lg'>
						<div className='text-2xl font-bold text-green-600'>
							{result.score}
						</div>
						<div className='text-sm text-gray-600'>Correct</div>
					</div>
					<div className='bg-red-50 p-4 rounded-lg'>
						<div className='text-2xl font-bold text-red-600'>
							{result.totalQuestions - result.score}
						</div>
						<div className='text-sm text-gray-600'>Incorrect</div>
					</div>
					<div className='bg-blue-50 p-4 rounded-lg'>
						<div className='text-2xl font-bold text-blue-600'>
							{result.totalQuestions}
						</div>
						<div className='text-sm text-gray-600'>Total</div>
					</div>
				</div>

				<button
					onClick={onRestart}
					className='bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105'
				>
					🔄 Take Quiz Again
				</button>
			</div>
		</div>
	);
};

export default ResultsScreen;
