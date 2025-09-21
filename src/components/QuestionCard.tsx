import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types/quiz';
import Confetti from './Confetti';

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
	const [showConfetti, setShowConfetti] = useState(false);
	const [shakeCorrectAnswer, setShakeCorrectAnswer] = useState(false);
	const [confettiKey, setConfettiKey] = useState(0);

	// Reset confetti state when moving to new question
	useEffect(() => {
		setShowConfetti(false);
		setShakeCorrectAnswer(false);
	}, [question.id]);

	// Trigger animations when correct answer is revealed
	useEffect(() => {
		if (showExplanation && selectedAnswer === question.correctAnswer) {
			// Force new confetti animation by updating key
			setConfettiKey((prev) => prev + 1);

			// Trigger confetti
			setShowConfetti(true);

			// Trigger shake animation for correct answer
			setShakeCorrectAnswer(true);

			// Reset shake animation after it completes
			const shakeTimer = setTimeout(() => {
				setShakeCorrectAnswer(false);
			}, 600);

			// Reset confetti after animation completes
			const confettiTimer = setTimeout(() => {
				setShowConfetti(false);
			}, 2800);

			return () => {
				clearTimeout(shakeTimer);
				clearTimeout(confettiTimer);
			};
		}
	}, [showExplanation, selectedAnswer, question.correctAnswer]);
	return (
		<div className='bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-4 sm:p-6 max-w-2xl mx-auto'>
			{/* Confetti Animation */}
			<Confetti
				key={confettiKey}
				isActive={showConfetti}
				duration={2800}
			/>

			<h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 leading-tight'>
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
										? 'bg-emerald-900 border-emerald-500 text-emerald-100 animate-success-glow'
										: 'bg-red-900 border-red-500 text-red-100'
									: 'bg-teal-900 border-teal-500 text-teal-100'
								: showExplanation &&
								  index === question.correctAnswer
								? 'bg-emerald-900 border-emerald-500 text-emerald-100 animate-success-glow'
								: 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 active:bg-slate-500'
						} ${
							// Add shake animation to correct answer when revealed
							showExplanation &&
							index === question.correctAnswer &&
							shakeCorrectAnswer
								? 'animate-gentle-shake'
								: ''
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
				<div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-700 border border-slate-600 rounded-lg'>
					{/* Personalized message based on correct/incorrect answer */}
					<div className='mb-3'>
						{selectedAnswer === question.correctAnswer ? (
							<div className='flex items-center gap-2 text-emerald-300 font-medium text-sm sm:text-base'>
								<span className='text-lg'>🎉</span>
								<span>Excellent! Correct answer!</span>
							</div>
						) : selectedAnswer === null ? (
							<div className='flex items-center gap-2 text-red-300 font-medium text-sm sm:text-base'>
								<span className='text-lg'>⏰</span>
								<span>
									Time's up! Here's the correct answer:
								</span>
							</div>
						) : (
							<div className='flex items-center gap-2 text-amber-300 font-medium text-sm sm:text-base'>
								<span className='text-lg'>📚</span>
								<span>
									Close, but not quite! Here's what you need
									to know:
								</span>
							</div>
						)}
					</div>

					<h3 className='font-semibold text-teal-400 mb-2 text-sm sm:text-base'>
						Explanation:
					</h3>
					<p className='text-slate-300 text-sm sm:text-base leading-relaxed'>
						{question.explanation}
					</p>
				</div>
			)}
		</div>
	);
};

export default QuestionCard;
