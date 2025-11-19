import React, { useState, Suspense } from 'react';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsScreen from './components/ResultsScreen';
import StartScreen from './components/StartScreen';
import Timer from './components/Timer';
import GameModeSelection from './components/GameModeSelection';
import CocktailBuilderCard from './components/CocktailBuilderCard';
import CocktailBuilderResults from './components/CocktailBuilderResults';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import SettingsModal from './components/SettingsModal';
import { useQuiz } from './hooks/useQuiz';
import { useCocktailBuilder } from './hooks/useCocktailBuilder';
import { useSettings } from './hooks/useSettings';
import { useProgress } from './hooks/useProgress';

type AppState =
	| 'game-selection'
	| 'quiz-start'
	| 'quiz-playing'
	| 'quiz-results'
	| 'cocktail-start'
	| 'cocktail-playing'
	| 'cocktail-results';

const App: React.FC = () => {
	// App state management
	const [appState, setAppState] = useState<AppState>('game-selection');
	const [showSettings, setShowSettings] = useState(false);

	// Custom hooks
	const {
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
	} = useQuiz();

	const {
		currentRecipe,
		selectedIngredients,
		showCocktailResults,
		startCocktailBuilder,
		handleIngredientSelect,
		handleIngredientRemove,
		handleCocktailComplete,
		getCocktailBuilderResult,
		resetCocktailBuilder,
	} = useCocktailBuilder();

	const {
		settings,
		isLoading: isLoadingSettings,
		updateSetting,
		resetSettings,
	} = useSettings();
	const { saveQuizResult, saveCocktailBuilderResult } = useProgress();

	// Game mode selection handlers
	const handleGameModeSelect = (mode: 'quiz' | 'cocktail-builder') => {
		if (mode === 'quiz') {
			setAppState('quiz-start');
		} else {
			setAppState('cocktail-start');
		}
	};

	const backToGameSelection = () => {
		setAppState('game-selection');
	};

	// Enhanced handlers with progress tracking
	const handleQuizStart = () => {
		startQuiz();
		setAppState('quiz-playing');
	};

	const handleCocktailBuilderStart = () => {
		startCocktailBuilder();
		setAppState('cocktail-playing');
	};

	const handleQuizNextQuestion = () => {
		const result = handleNextQuestion();
		if (result === 'quiz-results') {
			setAppState('quiz-results');
			// Save result to progress
			const quizResult = getQuizResult();
			saveQuizResult(quizResult);
		}
	};

	const handleCocktailBuilderComplete = () => {
		const result = handleCocktailComplete();
		if (result === 'cocktail-results') {
			setAppState('cocktail-results');
			// Save result to progress
			const cocktailResult = getCocktailBuilderResult();
			saveCocktailBuilderResult(cocktailResult);
		}
	};

	// Settings handlers
	const handleSettingsOpen = () => setShowSettings(true);
	const handleSettingsClose = () => setShowSettings(false);

	// Loading state for settings
	if (isLoadingSettings) {
		return <LoadingScreen message='Loading your preferences...' />;
	}

	// Render based on app state - wrapped in ErrorBoundary
	// Render based on app state - wrapped in ErrorBoundary
	return (
		<ErrorBoundary>
			<div
				className={`min-h-screen ${
					settings.theme === 'dark'
						? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'
						: 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
				}`}
			>
				<Suspense fallback={<LoadingScreen />}>
					{/* Settings button - always visible */}
					<button
						onClick={handleSettingsOpen}
						className='fixed top-4 right-4 z-50 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors'
						aria-label='Settings'
					>
						⚙️
					</button>

					{/* Settings Modal */}
					<SettingsModal
						isOpen={showSettings}
						onClose={handleSettingsClose}
						settings={settings}
						onUpdateSetting={updateSetting}
						onReset={resetSettings}
					/>

					{appState === 'game-selection' && (
						<div className='container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8'>
							<GameModeSelection
								onSelectMode={handleGameModeSelect}
							/>
						</div>
					)}

					{appState === 'quiz-start' && (
						<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
							<StartScreen
								onStart={handleQuizStart}
								totalQuestions={questions.length}
							/>
							<div className='fixed top-4 left-4'>
								<button
									onClick={backToGameSelection}
									className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
								>
									← Back
								</button>
							</div>
						</div>
					)}

					{appState === 'quiz-results' && (
						<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
							<ResultsScreen
								result={getQuizResult()}
								onRestart={handleQuizStart}
							/>
							<div className='fixed top-4 left-4'>
								<button
									onClick={backToGameSelection}
									className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
								>
									🎮 Games
								</button>
							</div>
						</div>
					)}

					{appState === 'cocktail-start' && (
						<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
							<div className='text-center'>
								<div className='text-6xl mb-4'>🍹</div>
								<h1 className='text-3xl font-bold text-white mb-4'>
									Cocktail Builder
								</h1>
								<p className='text-slate-300 mb-8 max-w-2xl mx-auto'>
									Build cocktails by selecting the correct
									ingredients! Test your knowledge of classic
									recipes and learn as you go.
								</p>
								<button
									onClick={handleCocktailBuilderStart}
									className='bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105'
								>
									🍹 Start Building Cocktails
								</button>
							</div>
							<div className='fixed top-4 left-4'>
								<button
									onClick={backToGameSelection}
									className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
								>
									← Back
								</button>
							</div>
						</div>
					)}

					{appState === 'cocktail-results' && (
						<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
							<CocktailBuilderResults
								result={getCocktailBuilderResult()}
								onRestart={handleCocktailBuilderStart}
								onBackToMenu={backToGameSelection}
							/>
						</div>
					)}

					{appState === 'cocktail-playing' && currentRecipe && (
						<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
							<ProgressBar
								current={currentRecipe ? 0 : 0}
								total={10}
							/>

							<CocktailBuilderCard
								recipe={currentRecipe}
								selectedIngredients={selectedIngredients}
								onIngredientSelect={handleIngredientSelect}
								onIngredientRemove={handleIngredientRemove}
								showResults={showCocktailResults}
								onComplete={handleCocktailBuilderComplete}
							/>

							<div className='fixed top-4 left-4'>
								<button
									onClick={backToGameSelection}
									className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
								>
									🎮 Games
								</button>
							</div>
						</div>
					)}

					{appState === 'quiz-playing' && currentQuestion && (
						<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
							<ProgressBar
								current={quizState.currentQuestionIndex}
								total={questions.length}
							/>

							<Timer
								key={timerKey}
								duration={settings.timerDuration}
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
										onClick={handleQuizNextQuestion}
										className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base border border-emerald-500'
									>
										{quizState.currentQuestionIndex ===
										questions.length - 1
											? '🏁 See Results'
											: '➡️ Next Question'}
									</button>
								</div>
							)}

							<div className='fixed top-4 left-4'>
								<button
									onClick={backToGameSelection}
									className='bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-200'
								>
									🎮 Games
								</button>
							</div>
						</div>
					)}
				</Suspense>
			</div>
		</ErrorBoundary>
	);
};

export default App;
