import React, { useState, useEffect } from 'react';

interface TimerProps {
	duration: number; // Duration in seconds
	onTimeUp: () => void;
	isActive: boolean;
	onReset?: () => void;
}

const Timer: React.FC<TimerProps> = ({
	duration,
	onTimeUp,
	isActive,
	onReset,
}) => {
	const [timeLeft, setTimeLeft] = useState(duration);

	useEffect(() => {
		setTimeLeft(duration);
	}, [duration, onReset]);

	useEffect(() => {
		if (!isActive) return;

		if (timeLeft <= 0) {
			onTimeUp();
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					onTimeUp();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, isActive, onTimeUp]);

	const percentage = (timeLeft / duration) * 100;
	const isUrgent = timeLeft <= 10;
	const isCritical = timeLeft <= 5;

	return (
		<div className='w-full max-w-2xl mx-auto mb-4 sm:mb-6 px-4 sm:px-0'>
			{/* Mobile-optimized timer display */}
			<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-3 sm:p-4 mb-3'>
				<div className='flex justify-between items-center mb-3'>
					<div className='flex items-center gap-2'>
						<span className='text-2xl'>⏰</span>
						<span className='text-slate-200 font-medium text-mobile-sm sm:text-base'>
							Time Remaining
						</span>
					</div>
					<div
						className={`px-3 py-1 rounded-full font-bold text-mobile-lg sm:text-xl ${
							isCritical
								? 'bg-red-900/50 text-red-300 animate-pulse border border-red-500'
								: isUrgent
								? 'bg-amber-900/50 text-amber-300 border border-amber-500'
								: 'bg-emerald-900/50 text-emerald-300 border border-emerald-500'
						}`}
					>
						{timeLeft}s
					</div>
				</div>

				{/* Enhanced progress bar for mobile */}
				<div className='w-full bg-slate-700 border border-slate-600 rounded-full h-3 sm:h-4 relative overflow-hidden'>
					<div
						className={`h-3 sm:h-4 rounded-full transition-all duration-300 ease-linear relative ${
							isCritical
								? 'bg-gradient-to-r from-red-500 to-red-600'
								: isUrgent
								? 'bg-gradient-to-r from-amber-500 to-orange-500'
								: 'bg-gradient-to-r from-emerald-400 to-teal-500'
						}`}
						style={{ width: `${percentage}%` }}
					>
						{/* Animated shine effect */}
						<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse'></div>
					</div>

					{/* Critical time warning overlay */}
					{isCritical && (
						<div className='absolute inset-0 bg-red-500/20 animate-pulse rounded-full'></div>
					)}
				</div>

				{/* Mobile-friendly status text */}
				<div className='mt-2 text-center'>
					<span
						className={`text-mobile-xs font-medium ${
							isCritical
								? 'text-red-300'
								: isUrgent
								? 'text-amber-300'
								: 'text-slate-400'
						}`}
					>
						{isCritical
							? '🚨 Hurry up!'
							: isUrgent
							? '⚡ Time running out!'
							: '✨ Take your time'}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Timer;
