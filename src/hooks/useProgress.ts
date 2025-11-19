import { useState, useEffect, useCallback } from 'react';
import { QuizResult } from '../types/quiz';
import { CocktailBuilderResult } from '../types/cocktailBuilder';

interface Progress {
	quizResults: QuizResult[];
	cocktailBuilderResults: CocktailBuilderResult[];
	totalGamesPlayed: number;
	bestQuizScore: number;
	bestCocktailScore: number;
	currentStreak: number;
	lastPlayedDate: string;
}

const DEFAULT_PROGRESS: Progress = {
	quizResults: [],
	cocktailBuilderResults: [],
	totalGamesPlayed: 0,
	bestQuizScore: 0,
	bestCocktailScore: 0,
	currentStreak: 0,
	lastPlayedDate: '',
};

const PROGRESS_STORAGE_KEY = 'cocktail-quiz-progress';

export const useProgress = () => {
	const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
	const [isLoading, setIsLoading] = useState(true);

	// Load progress from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
			if (stored) {
				const parsedProgress = JSON.parse(stored);
				setProgress({ ...DEFAULT_PROGRESS, ...parsedProgress });
			}
		} catch (error) {
			console.warn('Failed to load progress from localStorage:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Save progress to localStorage whenever it changes
	useEffect(() => {
		if (!isLoading) {
			try {
				localStorage.setItem(
					PROGRESS_STORAGE_KEY,
					JSON.stringify(progress),
				);
			} catch (error) {
				console.warn('Failed to save progress to localStorage:', error);
			}
		}
	}, [progress, isLoading]);

	const saveQuizResult = useCallback((result: QuizResult) => {
		setProgress((prev) => ({
			...prev,
			quizResults: [...prev.quizResults, result],
			totalGamesPlayed: prev.totalGamesPlayed + 1,
			bestQuizScore: Math.max(prev.bestQuizScore, result.percentage),
			lastPlayedDate: new Date().toISOString(),
		}));
	}, []);

	const saveCocktailBuilderResult = useCallback(
		(result: CocktailBuilderResult) => {
			setProgress((prev) => ({
				...prev,
				cocktailBuilderResults: [
					...prev.cocktailBuilderResults,
					result,
				],
				totalGamesPlayed: prev.totalGamesPlayed + 1,
				bestCocktailScore: Math.max(
					prev.bestCocktailScore,
					result.percentage,
				),
				currentStreak: result.streak,
				lastPlayedDate: new Date().toISOString(),
			}));
		},
		[],
	);

	const clearProgress = useCallback(() => {
		setProgress(DEFAULT_PROGRESS);
	}, []);

	return {
		progress,
		isLoading,
		saveQuizResult,
		saveCocktailBuilderResult,
		clearProgress,
	};
};
