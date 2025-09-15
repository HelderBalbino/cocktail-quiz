import React from 'react';

interface ProgressBarProps {
	current: number;
	total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
	const percentage = (current / total) * 100;

	return (
		<div className='w-full max-w-2xl mx-auto mb-6'>
			<div className='flex justify-between items-center mb-2'>
				<span className='text-white font-medium'>
					Question {current + 1} of {total}
				</span>
				<span className='text-white font-medium'>
					{Math.round(percentage)}% Complete
				</span>
			</div>
			<div className='w-full bg-white bg-opacity-30 rounded-full h-3'>
				<div
					className='bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300 ease-out'
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
