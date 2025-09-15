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
		<div className='bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto'>
			<h2 className='text-2xl font-bold text-gray-800 mb-6'>
				{question.question}
			</h2>

			<div className='space-y-4'>
				{question.options.map((option, index) => (
					<button
						key={index}
						onClick={() => onAnswerSelect(index)}
						className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
							selectedAnswer === index
								? showExplanation
									? index === question.correctAnswer
										? 'bg-green-100 border-green-500 text-green-800'
										: 'bg-red-100 border-red-500 text-red-800'
									: 'bg-blue-100 border-blue-500 text-blue-800'
								: showExplanation &&
								  index === question.correctAnswer
								? 'bg-green-100 border-green-500 text-green-800'
								: 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
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
				<div className='mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded'>
					<h3 className='font-semibold text-blue-800 mb-2'>
						Explanation:
					</h3>
					<p className='text-blue-700'>{question.explanation}</p>
				</div>
			)}
		</div>
	);
};

export default QuestionCard;
