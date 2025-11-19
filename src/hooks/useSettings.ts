import { useState, useEffect, useCallback } from 'react';

interface Settings {
	theme: 'dark' | 'light';
	soundEnabled: boolean;
	difficulty: 'easy' | 'medium' | 'hard';
	timerDuration: number;
}

const DEFAULT_SETTINGS: Settings = {
	theme: 'dark',
	soundEnabled: true,
	difficulty: 'medium',
	timerDuration: 20,
};

const STORAGE_KEY = 'cocktail-quiz-settings';

export const useSettings = () => {
	const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
	const [isLoading, setIsLoading] = useState(true);

	// Load settings from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsedSettings = JSON.parse(stored);
				setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
			}
		} catch (error) {
			console.warn('Failed to load settings from localStorage:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Save settings to localStorage whenever they change
	useEffect(() => {
		if (!isLoading) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
			} catch (error) {
				console.warn('Failed to save settings to localStorage:', error);
			}
		}
	}, [settings, isLoading]);

	const updateSetting = useCallback(
		<K extends keyof Settings>(key: K, value: Settings[K]) => {
			setSettings((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const resetSettings = useCallback(() => {
		setSettings(DEFAULT_SETTINGS);
	}, []);

	return {
		settings,
		isLoading,
		updateSetting,
		resetSettings,
	};
};
