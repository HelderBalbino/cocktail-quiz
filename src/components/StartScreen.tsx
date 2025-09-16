import React from 'react';

interface StartScreenProps {
	onStart: () => void;
	totalQuestions: number;
}

const StartScreen: React.FC<StartScreenProps> = ({
	onStart,
	totalQuestions,
}) => {
	return (
		<div className='bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto text-center'>
			<div className='mb-6 sm:mb-8'>
				<div className='text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4'>
					🍸
				</div>
				<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4'>
					Cocktail Quiz
				</h1>
				<p className='text-gray-600 text-base sm:text-lg leading-relaxed px-2'>
					Test your knowledge of cocktails, spirits, and bartending
					techniques.
				</p>
			</div>

			<div className='mb-6 sm:mb-8 space-y-4'>
				<div className='bg-amber-50 p-3 sm:p-4 rounded-lg'>
					<h3 className='font-semibold text-amber-800 mb-2 text-sm sm:text-base'>
						Quiz Details:
					</h3>
					<ul className='text-amber-700 space-y-1 text-sm sm:text-base'>
						<li>📝 {totalQuestions} multiple choice questions</li>
						<li>⏱️ No time limit - take your time!</li>
						<li>💡 Explanations provided after each question</li>
						<li>🏆 Get your score and see how you rank</li>
					</ul>
				</div>
			</div>

			<button
				onClick={onStart}
				className='bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto min-h-[48px] touch-manipulation'
			>
				🚀 Start Quiz
			</button>
		</div>
	);
};

export default StartScreen;
