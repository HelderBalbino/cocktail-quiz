import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
	message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = memo(
	({ message = 'Mixing up something special...' }) => (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center'>
			<div className='text-center'>
				<motion.div
					className='text-6xl mb-4'
					animate={{
						scale: [1, 1.1, 1],
						rotate: [0, 5, -5, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatDelay: 1,
					}}
				>
					🍸
				</motion.div>
				<motion.h2
					className='text-xl text-white font-medium mb-2'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					{message}
				</motion.h2>
				<motion.div
					className='flex justify-center space-x-1 mt-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
				>
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							className='w-2 h-2 bg-purple-500 rounded-full'
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: i * 0.2,
							}}
						/>
					))}
				</motion.div>
			</div>
		</div>
	),
);

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
