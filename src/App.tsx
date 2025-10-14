import { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsScreen from './components/ResultsScreen';
import StartScreen from './components/StartScreen';
import Timer from './components/Timer';
import GameModeSelection from './components/GameModeSelection';
import CocktailBuilderCard from './components/CocktailBuilderCard';
import CocktailBuilderResults from './components/CocktailBuilderResults';
import MemoryGameBoard from './components/MemoryGameBoard';
import MemoryGameResults from './components/MemoryGameResults';
import { getShuffledQuestions } from './data/questions';
import { getShuffledCocktailRecipes } from './data/cocktailRecipes';
import { QuizState, QuizResult } from './types/quiz';
import {
	CocktailBuilderState,
	CocktailBuilderResult,
	Ingredient,
} from './types/cocktailBuilder';
import { MemoryGameResult, Difficulty } from './types/memoryGame';

type AppState =
	| 'game-selection'
	| 'quiz-start'
	| 'quiz-playing'
	| 'quiz-results'
	| 'cocktail-start'
	| 'cocktail-playing'
	| 'cocktail-results'
	| 'memory-start'
	| 'memory-playing'
	| 'memory-results';

function App() {
	// App state management
	const [appState, setAppState] = useState<AppState>('game-selection');

	// Quiz state
	const [questions, setQuestions] = useState(() => getShuffledQuestions());
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

	// Cocktail builder state
	const [cocktailRecipes, setCocktailRecipes] = useState(() =>
		getShuffledCocktailRecipes(),
	);
	const [cocktailBuilderState, setCocktailBuilderState] =
		useState<CocktailBuilderState>({
			currentCocktailIndex: 0,
			selectedIngredients: [],
			score: 0,
			streak: 0,
			isComplete: false,
			showResults: false,
			gameMode: 'practice',
		});
	const [selectedIngredients, setSelectedIngredients] = useState<
		Ingredient[]
	>([]);
	const [showCocktailResults, setShowCocktailResults] = useState(false);
	const [cocktailScores, setCocktailScores] = useState<number[]>([]);

	// Memory game state
	const [memoryGameResult, setMemoryGameResult] =
		useState<MemoryGameResult | null>(null);
	const [selectedDifficulty, setSelectedDifficulty] =
		useState<Difficulty>('easy');

	// Game mode selection handlers
	const handleGameModeSelect = (
		mode: 'quiz' | 'cocktail-builder' | 'memory-game',
	) => {
		if (mode === 'quiz') {
			setAppState('quiz-start');
		} else if (mode === 'cocktail-builder') {
			setAppState('cocktail-start');
		} else {
			setAppState('memory-start');
		}
	};

	const backToGameSelection = () => {
		setAppState('game-selection');
		// Reset all states
		resetQuiz();
		resetCocktailBuilder();
		resetMemoryGame();
	};

	// Quiz handlers
	const startQuiz = () => {
		const shuffledQuestions = getShuffledQuestions();
		setQuestions(shuffledQuestions);
		setAppState('quiz-playing');
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
			setAppState('quiz-results');
		} else {
			setQuizState((prev) => ({
				...prev,
				currentQuestionIndex: nextIndex,
			}));
			setSelectedAnswer(null);
			setShowExplanation(false);
			setTimerKey((prev) => prev + 1);
		}
	};

	const handleTimeUp = () => {
		if (showExplanation) return;

		setSelectedAnswer(null);
		setShowExplanation(true);

		setQuizState((prev) => ({
			...prev,
			answers: [...prev.answers, -1],
		}));
	};

	const getQuizResult = (): QuizResult => {
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
	};

	const resetQuiz = () => {
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
	};

	// Cocktail builder handlers
	const startCocktailBuilder = () => {
		const shuffledRecipes = getShuffledCocktailRecipes();
		setCocktailRecipes(shuffledRecipes);
		setAppState('cocktail-playing');
		setCocktailBuilderState({
			currentCocktailIndex: 0,
			selectedIngredients: [],
			score: 0,
			streak: 0,
			isComplete: false,
			showResults: false,
			gameMode: 'practice',
		});
		setSelectedIngredients([]);
		setShowCocktailResults(false);
		setCocktailScores([]);
	};

	const handleIngredientSelect = (ingredient: Ingredient) => {
		if (!selectedIngredients.some((ing) => ing.id === ingredient.id)) {
			setSelectedIngredients((prev) => [...prev, ingredient]);
		}
	};

	const handleIngredientRemove = (ingredient: Ingredient) => {
		setSelectedIngredients((prev) =>
			prev.filter((ing) => ing.id !== ingredient.id),
		);
	};

	const handleCocktailComplete = () => {
		if (!showCocktailResults) {
			// Show results for current cocktail
			setShowCocktailResults(true);

			// Calculate score for this cocktail
			const currentRecipe =
				cocktailRecipes[cocktailBuilderState.currentCocktailIndex];
			const correctIngredients = currentRecipe.ingredients
				.filter((ing) => ing.essential)
				.map((ing) => ing.ingredient.id);
			const selectedIds = selectedIngredients.map((ing) => ing.id);
			const correctSelected = selectedIds.filter((id) =>
				correctIngredients.includes(id),
			).length;
			const wrongSelected = selectedIds.filter(
				(id) =>
					!currentRecipe.ingredients.some(
						(rec) => rec.ingredient.id === id,
					),
			).length;
			const cocktailScore = Math.max(
				0,
				correctSelected * 10 - wrongSelected * 5,
			);

			setCocktailScores((prev) => [...prev, cocktailScore]);
		} else {
			// Move to next cocktail
			const nextIndex = cocktailBuilderState.currentCocktailIndex + 1;

			if (nextIndex >= cocktailRecipes.length) {
				// End game
				setCocktailBuilderState((prev) => ({
					...prev,
					isComplete: true,
					showResults: true,
				}));
				setAppState('cocktail-results');
			} else {
				// Next cocktail
				setCocktailBuilderState((prev) => ({
					...prev,
					currentCocktailIndex: nextIndex,
				}));
				setSelectedIngredients([]);
				setShowCocktailResults(false);
			}
		}
	};

	const getCocktailBuilderResult = (): CocktailBuilderResult => {
		const totalScore = cocktailScores.reduce(
			(sum, score) => sum + score,
			0,
		);
		const maxPossibleScore = cocktailRecipes.length * 50; // Assuming max 5 essential ingredients per cocktail
		const percentage = Math.round((totalScore / maxPossibleScore) * 100);

		// Count perfect cocktails (100% accuracy)
		const perfectCocktails = cocktailScores.filter((score) => {
			const maxCocktailScore = 50; // Adjust based on recipe
			return score === maxCocktailScore;
		}).length;

		let message = '';
		if (percentage >= 80) message = "Amazing! You're a natural mixologist!";
		else if (percentage >= 60)
			message = "Great work! You're learning fast!";
		else
			message =
				'Keep practicing - every cocktail is a learning experience!';

		return {
			score: totalScore,
			totalCocktails: cocktailRecipes.length,
			percentage,
			perfectCocktails,
			streak: 0, // TODO: Implement streak tracking
			message,
		};
	};

	const resetCocktailBuilder = () => {
		const shuffledRecipes = getShuffledCocktailRecipes();
		setCocktailRecipes(shuffledRecipes);
		setCocktailBuilderState({
			currentCocktailIndex: 0,
			selectedIngredients: [],
			score: 0,
			streak: 0,
			isComplete: false,
			showResults: false,
			gameMode: 'practice',
		});
		setSelectedIngredients([]);
		setShowCocktailResults(false);
		setCocktailScores([]);
	};

	// Memory game handlers
	const startMemoryGame = () => {
		setAppState('memory-playing');
		setMemoryGameResult(null);
	};

	const handleMemoryGameComplete = (result: MemoryGameResult) => {
		setMemoryGameResult(result);
		setAppState('memory-results');
	};

	const resetMemoryGame = () => {
		setMemoryGameResult(null);
	};

	// Render based on app state
	if (appState === 'game-selection') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<div className='container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8'>
					<GameModeSelection onSelectMode={handleGameModeSelect} />
				</div>
			</div>
		);
	}

	if (appState === 'quiz-start') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
					<StartScreen
						onStart={startQuiz}
						totalQuestions={questions.length}
					/>
					{/* Back button */}
					<div className='fixed top-4 left-4'>
						<button
							onClick={backToGameSelection}
							className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
						>
							← Back
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (appState === 'quiz-results') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
					<ResultsScreen
						result={getQuizResult()}
						onRestart={startQuiz}
					/>
					{/* Back button */}
					<div className='fixed top-4 left-4'>
						<button
							onClick={backToGameSelection}
							className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
						>
							🎮 Games
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (appState === 'cocktail-start') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
					<div className='text-center'>
						<div className='text-6xl mb-4 animate-float'>🍹</div>
						<h1 className='text-3xl font-bold text-white mb-4'>
							Cocktail Builder
						</h1>
						<p className='text-slate-300 mb-8 max-w-2xl mx-auto'>
							Build cocktails by selecting the correct
							ingredients! Test your knowledge of classic recipes
							and learn as you go.
						</p>
						<button
							onClick={startCocktailBuilder}
							className='bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105'
						>
							🍹 Start Building Cocktails
						</button>
					</div>
					{/* Back button */}
					<div className='fixed top-4 left-4'>
						<button
							onClick={backToGameSelection}
							className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
						>
							← Back
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (appState === 'cocktail-results') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
					<CocktailBuilderResults
						result={getCocktailBuilderResult()}
						onRestart={startCocktailBuilder}
						onBackToMenu={backToGameSelection}
					/>
				</div>
			</div>
		);
	}

	if (appState === 'memory-start') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
					<div className='text-center max-w-4xl mx-auto'>
						<div className='text-6xl mb-4 animate-float'>🧩</div>
						<h1 className='text-3xl font-bold text-white mb-4'>
							Memory Match
						</h1>
						<p className='text-slate-300 mb-8 max-w-2xl mx-auto'>
							Test your memory by matching cocktail ingredients,
							names, and glasses. Choose your difficulty and see
							how quickly you can clear the board!
						</p>

						{/* Difficulty Selection */}
						<div className='mb-8'>
							<h3 className='text-xl text-white mb-4'>
								Choose Difficulty
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto'>
								{(
									['easy', 'medium', 'hard'] as Difficulty[]
								).map((diff) => (
									<button
										key={diff}
										onClick={() => {
											setSelectedDifficulty(diff);
											startMemoryGame();
										}}
										className={`p-4 rounded-lg border-2 transition-all duration-300 ${
											selectedDifficulty === diff
												? 'bg-blue-600 border-blue-400 text-white'
												: 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
										}`}
									>
										<div className='text-2xl mb-2'>
											{diff === 'easy'
												? '😊'
												: diff === 'medium'
												? '🤔'
												: '😤'}
										</div>
										<div className='font-bold capitalize'>
											{diff}
										</div>
										<div className='text-sm opacity-75'>
											{diff === 'easy' &&
												'4x3 Grid • 3 Min'}
											{diff === 'medium' &&
												'4x4 Grid • 4 Min'}
											{diff === 'hard' &&
												'4x5 Grid • 5 Min'}
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
					{/* Back button */}
					<div className='fixed top-4 left-4'>
						<button
							onClick={backToGameSelection}
							className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
						>
							← Back
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (appState === 'memory-playing') {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<MemoryGameBoard
					difficulty={selectedDifficulty}
					onGameComplete={handleMemoryGameComplete}
					onBackToSelection={backToGameSelection}
				/>
			</div>
		);
	}

	if (appState === 'memory-results') {
		if (!memoryGameResult) {
			return <div>Loading...</div>;
		}

		return (
			<MemoryGameResults
				result={memoryGameResult}
				onPlayAgain={startMemoryGame}
				onBackToSelection={backToGameSelection}
			/>
		);
	}

	if (appState === 'cocktail-playing') {
		const currentRecipe =
			cocktailRecipes[cocktailBuilderState.currentCocktailIndex];

		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
					{/* Progress bar for cocktail builder */}
					<ProgressBar
						current={cocktailBuilderState.currentCocktailIndex}
						total={cocktailRecipes.length}
					/>

					<CocktailBuilderCard
						recipe={currentRecipe}
						selectedIngredients={selectedIngredients}
						onIngredientSelect={handleIngredientSelect}
						onIngredientRemove={handleIngredientRemove}
						showResults={showCocktailResults}
						onComplete={handleCocktailComplete}
					/>

					{/* Back button */}
					<div className='fixed top-4 left-4'>
						<button
							onClick={backToGameSelection}
							className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
						>
							🎮 Games
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Quiz playing state
	const currentQuestion = questions[quizState.currentQuestionIndex];

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
				<ProgressBar
					current={quizState.currentQuestionIndex}
					total={questions.length}
				/>

				<Timer
					key={timerKey}
					duration={20}
					onTimeUp={handleTimeUp}
					isActive={!showExplanation}
				/>

				<QuestionCard
					question={currentQuestion}
					selectedAnswer={selectedAnswer}
					onAnswerSelect={handleAnswerSelect}
					showExplanation={showExplanation}
				/>

				{showExplanation && (
					<div className='max-w-2xl mx-auto mt-4 sm:mt-6 text-center px-4 sm:px-0'>
						<button
							onClick={handleNextQuestion}
							className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base border border-emerald-500'
						>
							{quizState.currentQuestionIndex ===
							questions.length - 1
								? '🏁 See Results'
								: '➡️ Next Question'}
						</button>
					</div>
				)}

				{/* Back button */}
				<div className='fixed top-4 left-4'>
					<button
						onClick={backToGameSelection}
						className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
					>
						🎮 Games
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
