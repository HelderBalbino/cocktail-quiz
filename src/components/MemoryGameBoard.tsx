import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryCard from './MemoryCard';
import {
	MemoryGameState,
	Difficulty,
	MemoryGameResult,
	MemoryCard as MemoryCardType
} from '../types/memoryGame';
import {
	difficultyConfigs,
	calculateMemoryScore,
	getMemoryGameTip,
	cocktailCards
} from '../data/memoryGame';
import { getCocktailCardsWithImages } from '../data/memoryGame';

interface MemoryGameBoardProps {
	difficulty: Difficulty;
	onGameComplete: (result: MemoryGameResult) => void;
	onBackToSelection: () => void;
}

// Simple card generation function
const generateSimpleCards = (difficulty: Difficulty): MemoryCardType[] => {
	const config = difficultyConfigs[difficulty];
	const pairsNeeded = config.gridSize / 2;
	const cards: MemoryCardType[] = [];

	const cocktailsToUse = cocktailCards.slice(0, pairsNeeded);

	cocktailsToUse.forEach((card, index) => {
		const pairId = `pair-${index}`;

		// First card of the pair
		cards.push({
			id: `${card.id}-1`,
			type: 'cocktail',
			value: card.name,
			emoji: card.emoji,
			isFlipped: false,
			isMatched: false,
			pairId: pairId,
		});

		// Second card of the pair
		cards.push({
			id: `${card.id}-2`,
			type: 'cocktail',
			value: card.name,
			emoji: card.emoji,
			isFlipped: false,
			isMatched: false,
			pairId: pairId,
		});
	});

	// Shuffle the cards
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}

	return cards;
};

const MemoryGameBoard: React.FC<MemoryGameBoardProps> = ({
	difficulty,
	onGameComplete,
	onBackToSelection,
}) => {
	const [gameState, setGameState] = useState<MemoryGameState>(() => {
		const config = difficultyConfigs[difficulty];
		const cards = generateSimpleCards(difficulty);

		return {
			cards,
			difficulty,
			flippedCards: [],
			matchedPairs: 0,
			totalPairs: cards.length / 2,
			moves: 0,
			timeLeft: config.timeLimit,
			isComplete: false,
			isPlaying: false,
			score: 0,
		};
	});

	const [showTip, setShowTip] = useState(false);
	const [currentTip, setCurrentTip] = useState('');
	const [gameStarted, setGameStarted] = useState(false);

	// Load images in the background after component mounts
	useEffect(() => {
		const loadCocktailImages = async () => {
			try {
				const enhancedCocktails = await getCocktailCardsWithImages();

				// Update existing cards with images
				setGameState(prev => ({
					...prev,
					cards: prev.cards.map(card => {
						if (card.type === 'cocktail') {
							const enhanced = enhancedCocktails.find(c => c.name === card.value);
							return {
								...card,
								image: enhanced?.imageUrl
							};
						}
						return card;
					})
				}));
			} catch (error) {
				console.warn('Failed to load cocktail images:', error);
				// Continue with emoji-only cards
			}
		};

		loadCocktailImages();
	}, []);

	// Timer effect
	useEffect(() => {
		if (!gameState.isPlaying || gameState.isComplete) return;

		const timer = setInterval(() => {
			setGameState((prev) => {
				if (prev.timeLeft <= 1) {
					// Time's up - end game
					const timeUsed = difficultyConfigs[difficulty].timeLimit;
					const scoreData = calculateMemoryScore(
						prev.moves,
						timeUsed,
						difficultyConfigs[difficulty].timeLimit,
						difficulty,
					);

					const result: MemoryGameResult = {
						score: scoreData.score,
						moves: prev.moves,
						timeUsed,
						totalPairs: prev.totalPairs,
						matchedPairs: prev.matchedPairs,
						difficulty,
						percentage: Math.round(
							(prev.matchedPairs / prev.totalPairs) * 100,
						),
						message: "Time's up! " + scoreData.message,
						stars: scoreData.stars,
					};

					setTimeout(() => onGameComplete(result), 1000);
					return {
						...prev,
						timeLeft: 0,
						isComplete: true,
						isPlaying: false,
					};
				}
				return { ...prev, timeLeft: prev.timeLeft - 1 };
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [gameState.isPlaying, gameState.isComplete, difficulty, onGameComplete]);

	// Check for matches when flipped cards change
	useEffect(() => {
		if (gameState.flippedCards.length === 2) {
			const [card1Id, card2Id] = gameState.flippedCards;
			const card1 = gameState.cards.find((c) => c.id === card1Id);
			const card2 = gameState.cards.find((c) => c.id === card2Id);

			if (card1 && card2) {
				// Check if cards match (same pairId)
				const isMatch = card1.pairId === card2.pairId;

				setTimeout(() => {
					setGameState((prev) => {
						const newCards = prev.cards.map((card) => {
							if (card.id === card1Id || card.id === card2Id) {
								return {
									...card,
									isFlipped: isMatch,
									isMatched: isMatch,
								};
							}
							return { ...card, isFlipped: false };
						});

						const newMatchedPairs =
							prev.matchedPairs + (isMatch ? 1 : 0);
						const isGameComplete =
							newMatchedPairs === prev.totalPairs;

						// If game is complete, calculate final result
						if (isGameComplete) {
							const timeUsed =
								difficultyConfigs[difficulty].timeLimit -
								prev.timeLeft;
							const scoreData = calculateMemoryScore(
								prev.moves,
								timeUsed,
								difficultyConfigs[difficulty].timeLimit,
								difficulty,
							);

							const result: MemoryGameResult = {
								score: scoreData.score,
								moves: prev.moves,
								timeUsed,
								totalPairs: prev.totalPairs,
								matchedPairs: newMatchedPairs,
								difficulty,
								percentage: 100,
								message: scoreData.message,
								stars: scoreData.stars,
							};

							setTimeout(() => onGameComplete(result), 1500);
						}

						return {
							...prev,
							cards: newCards,
							flippedCards: [],
							matchedPairs: newMatchedPairs,
							isComplete: isGameComplete,
							isPlaying: isGameComplete ? false : prev.isPlaying,
						};
					});
				}, 1000);
			}
		}
	}, [gameState.flippedCards, gameState.cards, difficulty, onGameComplete]);

	const startGame = useCallback(() => {
		setGameState((prev) => ({
			...prev,
			isPlaying: true,
			startTime: Date.now(),
		}));
		setGameStarted(true);
		setShowTip(false);
	}, []);

	const handleCardClick = useCallback(
		(cardId: string) => {
			if (!gameState.isPlaying || gameState.flippedCards.length >= 2)
				return;

			const card = gameState.cards.find((c) => c.id === cardId);
			if (!card || card.isFlipped || card.isMatched) return;

			// Start game on first card click
			if (!gameStarted) {
				startGame();
			}

			setGameState((prev) => {
				const newFlippedCards = [...prev.flippedCards, cardId];
				const newCards = prev.cards.map((c) =>
					c.id === cardId ? { ...c, isFlipped: true } : c,
				);

				// Increment moves when flipping the second card of a pair
				const newMoves =
					newFlippedCards.length === 2 ? prev.moves + 1 : prev.moves;

				return {
					...prev,
					cards: newCards,
					flippedCards: newFlippedCards,
					moves: newMoves,
				};
			});
		},
		[
			gameState.isPlaying,
			gameState.flippedCards.length,
			gameState.cards,
			gameStarted,
			startGame,
		],
	);

	const resetGame = () => {
		const cards = generateSimpleCards(difficulty);
		const config = difficultyConfigs[difficulty];

		setGameState({
			cards,
			difficulty,
			flippedCards: [],
			matchedPairs: 0,
			totalPairs: cards.length / 2,
			moves: 0,
			timeLeft: config.timeLimit,
			isComplete: false,
			isPlaying: false,
			score: 0,
		});
		setGameStarted(false);
		setShowTip(true);
		setCurrentTip(getMemoryGameTip());

		// Load images again for new cards
		getCocktailCardsWithImages().then(enhancedCocktails => {
			setGameState(prev => ({
				...prev,
				cards: prev.cards.map(card => {
					if (card.type === 'cocktail') {
						const enhanced = enhancedCocktails.find(c => c.name === card.value);
						return {
							...card,
							image: enhanced?.imageUrl
						};
					}
					return card;
				})
			}));
		}).catch(error => {
			console.warn('Failed to load cocktail images on reset:', error);
		});
	};

	const config = difficultyConfigs[difficulty];
	const progress = (gameState.matchedPairs / gameState.totalPairs) * 100;
	const timePercentage = (gameState.timeLeft / config.timeLimit) * 100;
	const isTimeUrgent = timePercentage <= 25;

	// Show tip on mount
	useEffect(() => {
		setShowTip(true);
		setCurrentTip(getMemoryGameTip());
	}, []);

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
			<div className='container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8'>
				{/* Header */}
				<motion.div
					className='mb-4 sm:mb-6'
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className='flex items-center justify-between mb-4'>
							<div className='flex items-center gap-3'>
								<motion.div
									className='text-4xl sm:text-5xl'
									animate={{
										scale: [1, 1.1, 1],
										rotate: [0, 5, -5, 0],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										repeatDelay: 3,
									}}
								>
									🧠
								</motion.div>
								<div>
									<h1 className='text-mobile-2xl sm:text-3xl font-bold text-white'>
										Memory Match
									</h1>
									<p className='text-slate-400 text-mobile-sm'>
										{config.description}
									</p>
								</div>
							</div>

							{/* Back button */}
							<button
								onClick={onBackToSelection}
								className='mobile-back-btn'
							>
								<span className='flex items-center gap-1'>
									<span>←</span>
									<span className='hidden sm:inline'>
										Back
									</span>
								</span>
							</button>
						</div>

						{/* Game stats */}
						<div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
							{/* Timer */}
							<div
								className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-3 ${
									isTimeUrgent
										? 'border-red-500 bg-red-900/20'
										: 'border-slate-600'
								}`}
							>
								<div className='text-center'>
									<div
										className={`text-mobile-lg sm:text-xl font-bold ${
											isTimeUrgent
												? 'text-red-400 animate-pulse'
												: 'text-emerald-400'
										}`}
									>
										{Math.floor(gameState.timeLeft / 60)}:
										{(gameState.timeLeft % 60)
											.toString()
											.padStart(2, '0')}
									</div>
									<div className='text-mobile-xs text-slate-400'>
										Time Left
									</div>
								</div>
							</div>

							{/* Moves */}
							<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-3'>
								<div className='text-center'>
									<div className='text-mobile-lg sm:text-xl font-bold text-amber-400'>
										{gameState.moves}
									</div>
									<div className='text-mobile-xs text-slate-400'>
										Moves
									</div>
								</div>
							</div>

							{/* Progress */}
							<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-3'>
								<div className='text-center'>
									<div className='text-mobile-lg sm:text-xl font-bold text-purple-400'>
										{gameState.matchedPairs}/
										{gameState.totalPairs}
									</div>
									<div className='text-mobile-xs text-slate-400'>
										Pairs
									</div>
								</div>
							</div>

							{/* Difficulty */}
							<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-3'>
								<div className='text-center'>
									<div className='text-mobile-lg sm:text-xl font-bold text-teal-400'>
										{config.name}
									</div>
									<div className='text-mobile-xs text-slate-400'>
										Level
									</div>
								</div>
							</div>
						</div>

						{/* Progress bar */}
						<div className='mt-4 bg-slate-700 border border-slate-600 rounded-full h-2 sm:h-3 overflow-hidden'>
							<motion.div
								className='h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 rounded-full'
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{ duration: 0.5 }}
								style={{ backgroundSize: '200% 100%' }}
							/>
						</div>
					</motion.div>

					{/* Tip overlay */}
					<AnimatePresence>
						{showTip && !gameStarted && (
							<motion.div
								className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<motion.div
									className='bg-slate-800 border border-slate-600 rounded-2xl p-6 max-w-md mx-auto text-center'
									initial={{ scale: 0.8, y: 50 }}
									animate={{ scale: 1, y: 0 }}
									exit={{ scale: 0.8, y: 50 }}
								>
									<div className='text-4xl mb-4'>💡</div>
									<h3 className='text-mobile-lg sm:text-xl font-bold text-white mb-3'>
										Ready to Play?
									</h3>
									<p className='text-slate-300 text-mobile-sm mb-4 leading-relaxed'>
										{currentTip}
									</p>
									<button
										onClick={startGame}
										className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 w-full touch-target'
									>
										🚀 Start Game
									</button>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Game board */}
					<motion.div
						className={`grid gap-2 sm:gap-3 mx-auto max-w-4xl`}
						style={{
							gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
							gridTemplateRows: `repeat(${config.rows}, minmax(0, 1fr))`,
						}}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						{gameState.cards.map((card, index) => (
							<MemoryCard
								key={card.id}
								card={card}
								onCardClick={handleCardClick}
								isClickable={
									gameState.isPlaying &&
									gameState.flippedCards.length < 2
								}
								index={index}
							/>
						))}
					</motion.div>

					{/* Game controls */}
					{gameStarted && !gameState.isComplete && (
						<motion.div
							className='mt-6 text-center'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
						>
							<button
								onClick={resetGame}
								className='bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 touch-target'
							>
								🔄 Reset Game
							</button>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MemoryGameBoard;
