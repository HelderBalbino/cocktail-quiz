import { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsScreen from './components/ResultsScreen';
import StartScreen from './components/StartScreen';
import { getShuffledQuestions } from './data/questions';
import { QuizState, QuizResult } from './types/quiz';

function App() {
	const [questions, setQuestions] = useState(() => getShuffledQuestions());
	const [quizState, setQuizState] = useState<QuizState>({
		currentQuestionIndex: 0,
		answers: [],
		score: 0,
		isComplete: false,
		showResults: false,
	});

	const [hasStarted, setHasStarted] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);

	const startQuiz = () => {
		const shuffledQuestions = getShuffledQuestions();
		setQuestions(shuffledQuestions);
		setHasStarted(true);
		setQuizState({
			currentQuestionIndex: 0,
			answers: [],
			score: 0,
			isComplete: false,
			showResults: false,
		});
		setSelectedAnswer(null);
		setShowExplanation(false);
	};

	const handleAnswerSelect = (answerIndex: number) => {
		if (showExplanation) return;

		setSelectedAnswer(answerIndex);
		setShowExplanation(true);

		const currentQuestion = questions[quizState.currentQuestionIndex];
	const [quizState, setQuizState] = useState<QuizState>({
		currentQuestionIndex: 0,
		answers: [],
		score: 0,
		isComplete: false,
		showResults: false,
	});

	const [hasStarted, setHasStarted] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);

	const startQuiz = () => {
		setHasStarted(true);
		setQuizState({
			currentQuestionIndex: 0,
			answers: [],
			score: 0,
			isComplete: false,
			showResults: false,
		});
		setSelectedAnswer(null);
		setShowExplanation(false);
	};

	const handleAnswerSelect = (answerIndex: number) => {
		if (showExplanation) return;

		setSelectedAnswer(answerIndex);
		setShowExplanation(true);

		const currentQuestion = questions[quizState.currentQuestionIndex];
		const isCorrect = answerIndex === currentQuestion.correctAnswer;

		setQuizState((prev) => ({
			...prev,
			answers: [...prev.answers, answerIndex],
			score: isCorrect ? prev.score + 1 : prev.score,
		}));
	};

	const handleNextQuestion = () => {
		const nextIndex = quizState.currentQuestionIndex + 1;

		if (nextIndex >= questions.length) {
			setQuizState((prev) => ({
				...prev,
				isComplete: true,
				showResults: true,
			}));
		} else {
			setQuizState((prev) => ({
				...prev,
				currentQuestionIndex: nextIndex,
			}));
			setSelectedAnswer(null);
			setShowExplanation(false);
		}
	};

	const getQuizResult = (): QuizResult => {
		const percentage = Math.round((quizState.score / questions.length) * 100);
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
	};

	const resetQuiz = () => {
		const shuffledQuestions = getShuffledQuestions();
		setQuestions(shuffledQuestions);
		setHasStarted(false);
		setQuizState({
			currentQuestionIndex: 0,
			answers: [],
			score: 0,
			isComplete: false,
			showResults: false,
		});
		setSelectedAnswer(null);
		setShowExplanation(false);
	};

	if (!hasStarted) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
				<div className='container mx-auto px-4 py-8'>
					<StartScreen
						onStart={startQuiz}
						totalQuestions={questions.length}
					/>
				</div>
			</div>
		);
	}

	if (quizState.showResults) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
				<div className='container mx-auto px-4 py-8'>
					<ResultsScreen
						result={getQuizResult()}
						onRestart={resetQuiz}
					/>
				</div>
			</div>
		);
	}

	const currentQuestion = questions[quizState.currentQuestionIndex];

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
			<div className='container mx-auto px-4 py-8'>
				<ProgressBar
					current={quizState.currentQuestionIndex}
					total={questions.length}
				/>

				<QuestionCard
					question={currentQuestion}
					selectedAnswer={selectedAnswer}
					onAnswerSelect={handleAnswerSelect}
					showExplanation={showExplanation}
				/>

				{showExplanation && (
					<div className='max-w-2xl mx-auto mt-6 text-center'>
						<button
							onClick={handleNextQuestion}
							className='bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105'
						>
							{quizState.currentQuestionIndex ===
							questions.length - 1
								? '🏁 See Results'
								: '➡️ Next Question'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
