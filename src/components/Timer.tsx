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
		<div className='w-full max-w-2xl mx-auto mb-4 sm:mb-6'>
			<div className='flex justify-between items-center mb-2 px-1'>
				<span className='text-slate-200 font-medium text-sm sm:text-base'>
					⏰ Time Remaining
				</span>
				<span
					className={`font-bold text-sm sm:text-base ${
						isCritical
							? 'text-red-400 animate-pulse'
							: isUrgent
							? 'text-amber-400'
							: 'text-emerald-400'
					}`}
				>
					{timeLeft}s
				</span>
			</div>
			<div className='w-full bg-slate-700 border border-slate-600 rounded-full h-2 sm:h-3'>
				<div
					className={`h-2 sm:h-3 rounded-full transition-all duration-300 ease-linear ${
						isCritical
							? 'bg-gradient-to-r from-red-500 to-red-600'
							: isUrgent
							? 'bg-gradient-to-r from-amber-500 to-orange-500'
							: 'bg-gradient-to-r from-emerald-400 to-teal-500'
					}`}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default Timer;
