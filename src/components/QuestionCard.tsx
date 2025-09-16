import React from 'react';
import { QuizQuestion } from '../types/quiz';

interface QuestionCardProps {
	question: QuizQuestion;
	selectedAnswer: number | null;
	onAnswerSelect: (answerIndex: number) => void;
	showExplanation: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	question,
	selectedAnswer,
	onAnswerSelect,
	showExplanation,
}) => {
	return (
		<div className='bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-2xl mx-auto'>
			<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight'>
				{question.question}
			</h2>

			<div className='space-y-3 sm:space-y-4'>
				{question.options.map((option, index) => (
					<button
						key={index}
						onClick={() => onAnswerSelect(index)}
						className={`w-full p-4 sm:p-5 text-left rounded-lg border-2 transition-all duration-200 min-h-[60px] touch-manipulation text-sm sm:text-base ${
							selectedAnswer === index
								? showExplanation
									? index === question.correctAnswer
										? 'bg-green-100 border-green-500 text-green-800'
										: 'bg-red-100 border-red-500 text-red-800'
									: 'bg-amber-100 border-amber-500 text-amber-800'
								: showExplanation &&
								  index === question.correctAnswer
								? 'bg-green-100 border-green-500 text-green-800'
								: 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200'
						}`}
						disabled={showExplanation}
					>
						<span className='font-medium'>
							{String.fromCharCode(65 + index)}.
						</span>{' '}
						{option}
					</button>
				))}
			</div>

			{showExplanation && question.explanation && (
				<div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 border-l-4 border-amber-400 rounded'>
					{/* Personalized message based on correct/incorrect answer */}
					<div className='mb-3'>
						{selectedAnswer === question.correctAnswer ? (
							<div className='flex items-center gap-2 text-green-700 font-medium text-sm sm:text-base'>
								<span className='text-lg'>🎉</span>
								<span>
									Excellent! You're a cocktail connoisseur!
								</span>
							</div>
						) : (
							<div className='flex items-center gap-2 text-orange-700 font-medium text-sm sm:text-base'>
								<span className='text-lg'>📚</span>
								<span>
									Close, but not quite! Here's what you need
									to know:
								</span>
							</div>
						)}
					</div>

					<h3 className='font-semibold text-amber-800 mb-2 text-sm sm:text-base'>
						Explanation:
					</h3>
					<p className='text-amber-700 text-sm sm:text-base leading-relaxed'>
						{question.explanation}
					</p>
				</div>
			)}
		</div>
	);
};

export default QuestionCard;
