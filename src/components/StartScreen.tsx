import React, { useEffect, useState } from 'react';

interface StartScreenProps {
	onStart: () => void;
	totalQuestions: number;
}

const StartScreen: React.FC<StartScreenProps> = ({
	onStart,
	totalQuestions,
}) => {
	const [showContent, setShowContent] = useState(false);
	const [questionCount, setQuestionCount] = useState(0);

	useEffect(() => {
		// Show content after a brief delay
		const timer = setTimeout(() => setShowContent(true), 200);

		// Animate question counter
		const countTimer = setTimeout(() => {
			let current = 0;
			const increment = Math.ceil(totalQuestions / 20);
			const counter = setInterval(() => {
				current += increment;
				if (current >= totalQuestions) {
					current = totalQuestions;
					clearInterval(counter);
				}
				setQuestionCount(current);
			}, 50);
		}, 1000);

		return () => {
			clearTimeout(timer);
			clearTimeout(countTimer);
		};
	}, [totalQuestions]);

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
				className={`relative bg-slate-800/95 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-sm p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto text-center transition-all duration-1000 ${
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
						🍸
					</div>
					<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
						Cocktail Quiz
					</h1>
					<p className='text-slate-300 text-lg sm:text-xl leading-relaxed px-2 max-w-lg mx-auto'>
						Test your knowledge of cocktails, spirits, and
						professional bartending techniques
					</p>
				</div>

				{/* Quiz Details Section */}
				<div
					className={`mb-8 sm:mb-10 space-y-6 ${
						showContent ? 'animate-slide-in-left' : 'opacity-0'
					}`}
					style={{ animationDelay: '0.3s' }}
				>
					<div className='bg-gradient-to-r from-slate-700/80 to-slate-600/80 border border-slate-600 p-4 sm:p-6 rounded-xl backdrop-blur-sm'>
						<h3 className='font-bold text-emerald-400 mb-4 text-lg sm:text-xl flex items-center justify-center gap-2'>
							<span className='text-2xl'>📊</span>
							Quiz Challenge
						</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300'>
							<div className='flex items-center justify-center gap-3 p-3 bg-slate-800/50 rounded-lg'>
								<span className='text-2xl'>📝</span>
								<div className='text-left'>
									<div className='font-semibold text-emerald-400 text-2xl animate-number-count'>
										{questionCount}
									</div>
									<div className='text-sm'>Questions</div>
								</div>
							</div>
							<div className='flex items-center justify-center gap-3 p-3 bg-slate-800/50 rounded-lg'>
								<span className='text-2xl'>⏱️</span>
								<div className='text-left'>
									<div className='font-semibold text-emerald-400 text-2xl'>
										20s
									</div>
									<div className='text-sm'>Per Question</div>
								</div>
							</div>
						</div>
					</div>

					{/* Features List */}
					<div
						className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
							showContent ? 'animate-slide-in-right' : 'opacity-0'
						}`}
						style={{ animationDelay: '0.6s' }}
					>
						<div className='bg-slate-700/60 border border-slate-600 p-4 rounded-lg backdrop-blur-sm'>
							<div className='text-2xl mb-2'>💡</div>
							<div className='text-sm font-medium text-white'>
								Expert Explanations
							</div>
							<div className='text-xs text-slate-400'>
								Learn from each answer
							</div>
						</div>
						<div className='bg-slate-700/60 border border-slate-600 p-4 rounded-lg backdrop-blur-sm'>
							<div className='text-2xl mb-2'>🏆</div>
							<div className='text-sm font-medium text-white'>
								Performance Scoring
							</div>
							<div className='text-xs text-slate-400'>
								Track your expertise
							</div>
						</div>
					</div>
				</div>

				{/* Start Button */}
				<div
					className={`${
						showContent ? 'animate-fade-in-up' : 'opacity-0'
					}`}
					style={{ animationDelay: '0.9s' }}
				>
					<button
						onClick={onStart}
						className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-8 sm:px-12 rounded-xl text-lg sm:text-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto min-h-[56px] touch-manipulation border border-emerald-500 animate-pulse-glow relative overflow-hidden group'
					>
						<span className='relative z-10 flex items-center justify-center gap-3'>
							<span className='text-2xl'>🚀</span>
							Start Quiz Challenge
							<span className='text-2xl'>🎯</span>
						</span>
						<div className='absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
					</button>
				</div>

				{/* Difficulty indicator */}
				<div
					className={`mt-6 text-center ${
						showContent ? 'animate-fade-in-up' : 'opacity-0'
					}`}
					style={{ animationDelay: '1.2s' }}
				>
					<div className='inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full'>
						<span className='text-amber-400'>⚡</span>
						<span className='text-amber-300 text-sm font-medium'>
							Professional Level
						</span>
						<span className='text-amber-400'>⚡</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StartScreen;
