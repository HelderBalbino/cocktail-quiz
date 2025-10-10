import React, { useEffect, useState } from 'react';
import { GameMode } from '../types/cocktailBuilder';

interface GameModeSelectionProps {
	onSelectMode: (mode: 'quiz' | 'cocktail-builder') => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({
	onSelectMode,
}) => {
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShowContent(true), 200);
		return () => clearTimeout(timer);
	}, []);

	const gameModes: GameMode[] = [
		{
			id: 'quiz',
			name: 'Cocktail Quiz',
			description: 'Test your cocktail knowledge with timed questions',
			emoji: '🧠',
			color: 'from-emerald-600 to-teal-600',
			features: [
				'48 Professional Questions',
				'20-Second Timer',
				'Detailed Explanations',
				'Score Tracking',
			],
		},
		{
			id: 'cocktail-builder',
			name: 'Cocktail Builder',
			description: 'Create cocktails by selecting the right ingredients',
			emoji: '🍹',
			color: 'from-purple-600 to-pink-600',
			features: [
				'Interactive Building',
				'Visual Feedback',
				'Recipe Learning',
				'Multiple Difficulty Levels',
			],
		},
	];

	return (
		<div className='relative min-h-screen flex items-center justify-center p-4'>
			{/* Animated background overlay */}
			<div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 animate-gradient opacity-90'></div>

			{/* Floating cocktail decorations */}
			<div className='absolute top-10 left-10 text-4xl animate-float opacity-20'>
				🍸
			</div>
			<div
				className='absolute top-20 right-20 text-3xl animate-float opacity-15'
				style={{ animationDelay: '1s' }}
			>
				🍹
			</div>
			<div
				className='absolute bottom-20 left-20 text-3xl animate-float opacity-20'
				style={{ animationDelay: '2s' }}
			>
				🥃
			</div>
			<div
				className='absolute bottom-32 right-10 text-4xl animate-float opacity-15'
				style={{ animationDelay: '0.5s' }}
			>
				🍊
			</div>

			<div
				className={`relative bg-slate-800/95 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-sm p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
					showContent ? 'animate-bounce-in' : 'opacity-0'
				}`}
			>
				{/* Header Section */}
				<div
					className={`mb-8 sm:mb-10 ${
						showContent ? 'animate-fade-in-up' : 'opacity-0'
					}`}
				>
					<div className='text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 animate-float'>
						🎮
					</div>
					<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
						Choose Your Game
					</h1>
					<p className='text-slate-300 text-lg sm:text-xl leading-relaxed px-2 max-w-lg mx-auto'>
						Test your cocktail expertise with different game modes
					</p>
				</div>

				{/* Game Mode Cards */}
				<div
					className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 ${
						showContent ? 'animate-slide-in-left' : 'opacity-0'
					}`}
					style={{ animationDelay: '0.3s' }}
				>
					{gameModes.map((mode, index) => (
						<div
							key={mode.id}
							className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
								showContent ? 'animate-fade-in-up' : 'opacity-0'
							}`}
							style={{ animationDelay: `${0.5 + index * 0.2}s` }}
							onClick={() =>
								onSelectMode(
									mode.id as 'quiz' | 'cocktail-builder',
								)
							}
						>
							<div className='bg-gradient-to-br from-slate-700/80 to-slate-600/80 border border-slate-600 p-6 sm:p-8 rounded-xl backdrop-blur-sm hover:border-slate-500 transition-all duration-300 h-full'>
								{/* Mode Icon and Title */}
								<div className='mb-6'>
									<div className='text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300'>
										{mode.emoji}
									</div>
									<h3 className='text-xl sm:text-2xl font-bold text-white mb-2'>
										{mode.name}
									</h3>
									<p className='text-slate-300 text-sm sm:text-base leading-relaxed'>
										{mode.description}
									</p>
								</div>

								{/* Features List */}
								<div className='space-y-3 mb-6'>
									{mode.features.map((feature, idx) => (
										<div
											key={idx}
											className='flex items-center gap-3 text-slate-300'
										>
											<div className='w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0'></div>
											<span className='text-sm'>
												{feature}
											</span>
										</div>
									))}
								</div>

								{/* Play Button */}
								<button
									className={`w-full bg-gradient-to-r ${mode.color} text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-white/20`}
								>
									<span className='flex items-center justify-center gap-2'>
										<span className='text-xl'>
											{mode.emoji}
										</span>
										Play {mode.name}
										<span className='text-xl'>🚀</span>
									</span>
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Back to Quiz Info */}
				<div
					className={`text-center ${
						showContent ? 'animate-fade-in-up' : 'opacity-0'
					}`}
					style={{ animationDelay: '1s' }}
				>
					<div className='inline-flex items-center gap-2 bg-slate-700/60 border border-slate-600/60 px-4 py-2 rounded-full'>
						<span className='text-slate-400'>✨</span>
						<span className='text-slate-400 text-sm font-medium'>
							Both games share the same cocktail knowledge base
						</span>
						<span className='text-slate-400'>✨</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameModeSelection;
