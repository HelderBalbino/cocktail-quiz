import React from 'react';

interface ProgressBarProps {
	current: number;
	total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
	const percentage = (current / total) * 100;

	return (
		<div className='w-full max-w-2xl mx-auto mb-4 sm:mb-6 px-4 sm:px-0'>
			{/* Mobile-optimized progress display */}
			<div className='bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-3 sm:p-4'>
				<div className='flex justify-between items-center mb-3'>
					<div className='flex items-center gap-2'>
						<span className='text-2xl'>📊</span>
						<span className='text-slate-200 font-medium text-mobile-sm sm:text-base'>
							Progress
						</span>
					</div>
					<div className='text-right'>
						<div className='text-emerald-400 font-bold text-mobile-lg sm:text-xl'>
							{current + 1}/{total}
						</div>
						<div className='text-slate-400 text-mobile-xs'>
							{Math.round(percentage)}% Complete
						</div>
					</div>
				</div>

				{/* Enhanced progress bar */}
				<div className='w-full bg-slate-700 border border-slate-600 rounded-full h-3 sm:h-4 relative overflow-hidden'>
					<div
						className='bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 h-3 sm:h-4 rounded-full transition-all duration-500 ease-out relative'
						style={{
							width: `${percentage}%`,
							backgroundSize: '200% 100%',
							animation:
								percentage > 0 ? 'shimmer 2s infinite' : 'none',
						}}
					>
						{/* Animated shine effect */}
						<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse'></div>
					</div>
				</div>

				{/* Mobile-friendly milestone indicators */}
				<div className='flex justify-between mt-2 text-mobile-xs text-slate-400'>
					<span className={current >= 0 ? 'text-emerald-400' : ''}>
						Start
					</span>
					<span
						className={percentage >= 25 ? 'text-emerald-400' : ''}
					>
						25%
					</span>
					<span
						className={percentage >= 50 ? 'text-emerald-400' : ''}
					>
						50%
					</span>
					<span
						className={percentage >= 75 ? 'text-emerald-400' : ''}
					>
						75%
					</span>
					<span
						className={percentage >= 100 ? 'text-emerald-400' : ''}
					>
						Finish
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
