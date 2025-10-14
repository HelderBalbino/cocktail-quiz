import React from 'react';
import { motion } from 'framer-motion';
import { MemoryGameResult } from '../types/memoryGame';
import { difficultyConfigs, getMemoryGameTip } from '../data/memoryGame';

interface MemoryGameResultsProps {
	result: MemoryGameResult;
	onPlayAgain: () => void;
	onBackToSelection: () => void;
}

const MemoryGameResults: React.FC<MemoryGameResultsProps> = ({
	result,
	onPlayAgain,
	onBackToSelection,
}) => {
	const getGradeEmoji = (stars: number) => {
		switch (stars) {
			case 3:
				return '🏆';
			case 2:
				return '🥈';
			case 1:
				return '🥉';
			default:
				return '📚';
		}
	};

	const getGradeColor = (stars: number) => {
		switch (stars) {
			case 3:
				return 'text-yellow-400';
			case 2:
				return 'text-gray-300';
			case 1:
				return 'text-amber-600';
			default:
				return 'text-slate-400';
		}
	};

	const getPerformanceCategory = () => {
		if (result.stars === 3) return 'Memory Master!';
		if (result.stars === 2) return 'Great Memory!';
		if (result.stars === 1) return 'Good Effort!';
		return 'Keep Practicing!';
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const config = difficultyConfigs[result.difficulty];

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'>
			<div className='container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8'>
				<motion.div
					className='max-w-2xl mx-auto'
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{/* Results Header */}
					<motion.div
						className='text-center mb-6 sm:mb-8'
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<motion.div
							className='text-6xl sm:text-7xl mb-4'
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							transition={{
								duration: 0.8,
								delay: 0.4,
								type: 'spring',
								stiffness: 200,
							}}
						>
							{getGradeEmoji(result.stars)}
						</motion.div>

						<motion.h1
							className='text-mobile-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2'
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							Game Complete!
						</motion.h1>

						<motion.p
							className={`text-mobile-lg sm:text-xl font-semibold mb-4 ${getGradeColor(
								result.stars,
							)}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.8 }}
						>
							{getPerformanceCategory()}
						</motion.p>

						<motion.p
							className='text-slate-300 text-mobile-sm sm:text-base px-4'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 1.0 }}
						>
							{result.message}
						</motion.p>
					</motion.div>

					{/* Stats Grid */}
					<motion.div
						className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.2 }}
					>
						{/* Score */}
						<motion.div
							className='bg-slate-800/80 border border-slate-600 rounded-xl p-4 text-center'
							whileHover={{ scale: 1.02 }}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 1.3 }}
						>
							<div
								className={`text-mobile-2xl sm:text-3xl font-bold ${getGradeColor(
									result.stars,
								)}`}
							>
								{result.score.toLocaleString()}
							</div>
							<div className='text-mobile-xs text-slate-400'>
								Score
							</div>
						</motion.div>

						{/* Time */}
						<motion.div
							className='bg-slate-800/80 border border-slate-600 rounded-xl p-4 text-center'
							whileHover={{ scale: 1.02 }}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 1.4 }}
						>
							<div className='text-mobile-2xl sm:text-3xl font-bold text-emerald-400'>
								{formatTime(result.timeUsed)}
							</div>
							<div className='text-mobile-xs text-slate-400'>
								Time Used
							</div>
						</motion.div>

						{/* Moves */}
						<motion.div
							className='bg-slate-800/80 border border-slate-600 rounded-xl p-4 text-center'
							whileHover={{ scale: 1.02 }}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 1.5 }}
						>
							<div className='text-mobile-2xl sm:text-3xl font-bold text-amber-400'>
								{result.moves}
							</div>
							<div className='text-mobile-xs text-slate-400'>
								Moves
							</div>
						</motion.div>

						{/* Pairs */}
						<motion.div
							className='bg-slate-800/80 border border-slate-600 rounded-xl p-4 text-center'
							whileHover={{ scale: 1.02 }}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 1.6 }}
						>
							<div className='text-mobile-2xl sm:text-3xl font-bold text-purple-400'>
								{result.matchedPairs}/{result.totalPairs}
							</div>
							<div className='text-mobile-xs text-slate-400'>
								Pairs Found
							</div>
						</motion.div>
					</motion.div>

					{/* Performance Details */}
					<motion.div
						className='bg-slate-800/50 border border-slate-600 rounded-xl p-4 sm:p-6 mb-6'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.8 }}
					>
						<h3 className='text-mobile-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2'>
							<span className='text-2xl'>🎯</span>
							Performance Summary
						</h3>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-mobile-sm sm:text-base'>
							<div className='flex justify-between'>
								<span className='text-slate-400'>
									Difficulty:
								</span>
								<span className='text-white font-semibold'>
									{config.name}
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-slate-400'>
									Completion:
								</span>
								<span className='text-white font-semibold'>
									{result.percentage}%
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-slate-400'>
									Star Rating:
								</span>
								<div className='flex items-center gap-1'>
									{[1, 2, 3].map((star) => (
										<motion.span
											key={star}
											className={`text-lg ${
												star <= result.stars
													? 'text-yellow-400'
													: 'text-slate-600'
											}`}
											initial={{ scale: 0, rotate: -180 }}
											animate={{ scale: 1, rotate: 0 }}
											transition={{
												duration: 0.4,
												delay: 2.0 + star * 0.1,
												type: 'spring',
												stiffness: 200,
											}}
										>
											⭐
										</motion.span>
									))}
								</div>
							</div>
							<div className='flex justify-between'>
								<span className='text-slate-400'>
									Time Limit:
								</span>
								<span className='text-white font-semibold'>
									{formatTime(config.timeLimit)}
								</span>
							</div>
						</div>
					</motion.div>

					{/* Memory Tip */}
					<motion.div
						className='bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-600/50 rounded-xl p-4 sm:p-6 mb-6'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 2.2 }}
					>
						<h3 className='text-mobile-lg sm:text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2'>
							<span className='text-2xl'>💡</span>
							Memory Tip
						</h3>
						<p className='text-slate-300 text-mobile-sm sm:text-base leading-relaxed'>
							{getMemoryGameTip()}
						</p>
					</motion.div>

					{/* Action Buttons */}
					<motion.div
						className='flex flex-col sm:flex-row gap-3 sm:gap-4'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 2.4 }}
					>
						<motion.button
							onClick={onPlayAgain}
							className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 sm:py-4 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 touch-target'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<span className='flex items-center justify-center gap-2'>
								<span className='text-xl'>🔄</span>
								<span>Play Again</span>
							</span>
						</motion.button>

						<motion.button
							onClick={onBackToSelection}
							className='flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 touch-target'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<span className='flex items-center justify-center gap-2'>
								<span className='text-xl'>🎮</span>
								<span>Game Menu</span>
							</span>
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default MemoryGameResults;
