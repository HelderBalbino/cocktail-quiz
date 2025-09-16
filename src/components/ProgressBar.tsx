import React from 'react';

interface ProgressBarProps {
	current: number;
	total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
	const percentage = (current / total) * 100;

	return (
		<div className='w-full max-w-2xl mx-auto mb-4 sm:mb-6'>
			<div className='flex justify-between items-center mb-2 px-1'>
				<span className='text-slate-200 font-medium text-sm sm:text-base'>
					Question {current + 1} of {total}
				</span>
				<span className='text-slate-200 font-medium text-sm sm:text-base'>
					{Math.round(percentage)}% Complete
				</span>
			</div>
			<div className='w-full bg-slate-700 border border-slate-600 rounded-full h-2 sm:h-3'>
				<div
					className='bg-gradient-to-r from-emerald-400 to-teal-500 h-2 sm:h-3 rounded-full transition-all duration-300 ease-out'
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
