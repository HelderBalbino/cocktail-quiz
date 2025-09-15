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
		<div className='bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto text-center'>
			<div className='mb-8'>
				<div className='text-6xl mb-4'>🍸</div>
				<h1 className='text-4xl font-bold text-gray-800 mb-4'>
					Cocktail Quiz
				</h1>
				<p className='text-gray-600 text-lg leading-relaxed'>
					Test your knowledge of cocktails, spirits, and bartending
					techniques. Are you ready to become a cocktail connoisseur?
				</p>
			</div>

			<div className='mb-8 space-y-4'>
				<div className='bg-blue-50 p-4 rounded-lg'>
					<h3 className='font-semibold text-blue-800 mb-2'>
						Quiz Details:
					</h3>
					<ul className='text-blue-700 space-y-1'>
						<li>📝 {totalQuestions} multiple choice questions</li>
						<li>⏱️ No time limit - take your time!</li>
						<li>💡 Explanations provided after each question</li>
						<li>🏆 Get your score and see how you rank</li>
					</ul>
				</div>
			</div>

			<button
				onClick={onStart}
				className='bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg'
			>
				🚀 Start Quiz
			</button>
		</div>
	);
};

export default StartScreen;
