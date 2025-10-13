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
		<div className='bg-slate-800 border border-slate-700 rounded-lg shadow-2xl mobile-padding sm:p-6 max-w-2xl mx-auto'>
			{/* Confetti Animation */}
			<Confetti
				key={confettiKey}
				isActive={showConfetti}
				duration={2800}
			/>

			<h2 className='text-mobile-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2'>
				{question.question}
			</h2>

			<div className='space-y-3 mobile-gap sm:space-y-4'>
				{question.options.map((option, index) => (
					<button
						key={index}
						onClick={() => onAnswerSelect(index)}
						className={`w-full mobile-padding sm:p-5 text-left rounded-lg border-2 transition-all duration-200 touch-target touch-manipulation text-mobile-sm sm:text-base leading-relaxed ${
							selectedAnswer === index
								? showExplanation
									? index === question.correctAnswer
										? 'bg-emerald-900 border-emerald-500 text-emerald-100 animate-success-glow'
										: 'bg-red-900 border-red-500 text-red-100'
									: 'bg-teal-900 border-teal-500 text-teal-100'
								: showExplanation &&
								  index === question.correctAnswer
								? 'bg-emerald-900 border-emerald-500 text-emerald-100 animate-success-glow'
								: 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 active:bg-slate-500 active:scale-[0.98]'
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
						<div className='flex items-start gap-3'>
							<span className='font-bold text-mobile-base bg-slate-600 px-2 py-1 rounded-md flex-shrink-0 mt-0.5'>
								{String.fromCharCode(65 + index)}
							</span>
							<span className='flex-1'>{option}</span>
						</div>
					</button>
				))}
			</div>

			{showExplanation && question.explanation && (
				<div className='mt-4 sm:mt-6 mobile-padding sm:p-4 bg-slate-700 border border-slate-600 rounded-lg'>
					{/* Personalized message based on correct/incorrect answer */}
					<div className='mb-3'>
						{selectedAnswer === question.correctAnswer ? (
							<div className='flex items-center gap-3 text-emerald-300 font-medium text-mobile-sm sm:text-base p-2 bg-emerald-900/20 rounded-lg'>
								<span className='text-2xl'>🎉</span>
								<span>Excellent! Correct answer!</span>
							</div>
						) : selectedAnswer === null ? (
							<div className='flex items-center gap-3 text-red-300 font-medium text-mobile-sm sm:text-base p-2 bg-red-900/20 rounded-lg'>
								<span className='text-2xl'>⏰</span>
								<span>
									Time's up! Here's the correct answer:
								</span>
							</div>
						) : (
							<div className='flex items-center gap-3 text-amber-300 font-medium text-mobile-sm sm:text-base p-2 bg-amber-900/20 rounded-lg'>
								<span className='text-2xl'>📚</span>
								<span>
									Close, but not quite! Here's what you need
									to know:
								</span>
							</div>
						)}
					</div>

					<h3 className='font-semibold text-teal-400 mb-3 text-mobile-base sm:text-base flex items-center gap-2'>
						<span className='text-lg'>💡</span>
						Explanation:
					</h3>
					<p className='text-slate-300 text-mobile-sm sm:text-base leading-relaxed bg-slate-800/50 p-3 rounded-lg'>
						{question.explanation}
					</p>
				</div>
			)}
		</div>
	);
};

export default QuestionCard;
