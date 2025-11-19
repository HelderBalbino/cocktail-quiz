import { useState, useCallback, useMemo } from 'react';
import { QuizState, QuizResult, QuizQuestion } from '../types/quiz';
import { getShuffledQuestions } from '../data/questions';

export const useQuiz = () => {
	const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
		getShuffledQuestions(),
	);
	const [quizState, setQuizState] = useState<QuizState>({
		currentQuestionIndex: 0,
		answers: [],
		score: 0,
		isComplete: false,
		showResults: false,
	});
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);
	const [timerKey, setTimerKey] = useState(0);

	const currentQuestion = useMemo(
		() => questions[quizState.currentQuestionIndex],
		[questions, quizState.currentQuestionIndex],
	);

	const startQuiz = useCallback(() => {
		const shuffledQuestions = getShuffledQuestions();
		setQuestions(shuffledQuestions);
		setQuizState({
			currentQuestionIndex: 0,
			answers: [],
			score: 0,
			isComplete: false,
			showResults: false,
		});
		setSelectedAnswer(null);
		setShowExplanation(false);
		setTimerKey(0);
	}, []);

	const handleAnswerSelect = useCallback(
		(answerIndex: number) => {
			if (showExplanation) return;

			setSelectedAnswer(answerIndex);
			setShowExplanation(true);

			const isCorrect = answerIndex === currentQuestion.correctAnswer;

			setQuizState((prev) => ({
				...prev,
				answers: [...prev.answers, answerIndex],
				score: isCorrect ? prev.score + 1 : prev.score,
			}));
		},
		[showExplanation, currentQuestion],
	);

	const handleNextQuestion = useCallback(() => {
		const nextIndex = quizState.currentQuestionIndex + 1;

		if (nextIndex >= questions.length) {
			setQuizState((prev) => ({
				...prev,
				isComplete: true,
				showResults: true,
			}));
			return 'quiz-results';
		} else {
			setQuizState((prev) => ({
				...prev,
				currentQuestionIndex: nextIndex,
			}));
			setSelectedAnswer(null);
			setShowExplanation(false);
			setTimerKey((prev) => prev + 1);
			return null;
		}
	}, [quizState.currentQuestionIndex, questions.length]);

	const handleTimeUp = useCallback(() => {
		if (showExplanation) return;

		setSelectedAnswer(null);
		setShowExplanation(true);

		setQuizState((prev) => ({
			...prev,
			answers: [...prev.answers, -1],
		}));
	}, [showExplanation]);

	const getQuizResult = useCallback((): QuizResult => {
		const percentage = Math.round(
			(quizState.score / questions.length) * 100,
		);
		let message = '';

		if (percentage >= 90)
			message = "Outstanding! You're a cocktail master! 🍸";
		else if (percentage >= 80)
			message = 'Excellent work! You know your cocktails! 🥇';
		else if (percentage >= 70)
			message = "Great job! You're well on your way! 🥈";
		else if (percentage >= 60) message = 'Good effort! Keep learning! 🥉';
		else message = "Don't worry, practice makes perfect! 📚";

		return {
			score: quizState.score,
			totalQuestions: questions.length,
			percentage,
			message,
		};
	}, [quizState.score, questions.length]);

	const resetQuiz = useCallback(() => {
		startQuiz();
	}, [startQuiz]);

	return {
		questions,
		quizState,
		selectedAnswer,
		showExplanation,
		timerKey,
		currentQuestion,
		startQuiz,
		handleAnswerSelect,
		handleNextQuestion,
		handleTimeUp,
		getQuizResult,
		resetQuiz,
	};
};
