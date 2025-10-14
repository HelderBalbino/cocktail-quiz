import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MemoryCard as MemoryCardType } from '../types/memoryGame';

interface MemoryCardProps {
	card: MemoryCardType;
	onCardClick: (cardId: string) => void;
	isClickable: boolean;
	index: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
	card,
	onCardClick,
	isClickable,
	index,
}) => {
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	const handleClick = () => {
		if (isClickable && !card.isFlipped && !card.isMatched) {
			onCardClick(card.id);
		}
	};

	const handleImageLoad = () => {
		setImageLoading(false);
	};

	const handleImageError = () => {
		setImageLoading(false);
		setImageError(true);
	};

	// Card type specific styling
	const getCardTypeColor = () => {
		switch (card.type) {
			case 'ingredient':
				return 'from-emerald-600 to-teal-600';
			case 'cocktail':
				return 'from-purple-600 to-pink-600';
			case 'glass':
				return 'from-amber-600 to-orange-600';
			default:
				return 'from-slate-600 to-slate-700';
		}
	};

	const getCardTypeIcon = () => {
		switch (card.type) {
			case 'ingredient':
				return '🧪';
			case 'cocktail':
				return '🍹';
			case 'glass':
				return '🥃';
			default:
				return '❓';
		}
	};

	return (
		<motion.div
			className='relative w-full aspect-square cursor-pointer memory-card-touch'
			initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
			animate={{
				opacity: 1,
				scale: 1,
				rotateY: 0,
			}}
			transition={{
				duration: 0.6,
				delay: index * 0.05,
				type: 'spring',
				stiffness: 200,
			}}
			whileHover={
				isClickable && !card.isFlipped && !card.isMatched
					? { scale: 1.05, y: -2 }
					: {}
			}
			whileTap={
				isClickable && !card.isFlipped && !card.isMatched
					? { scale: 0.95 }
					: {}
			}
			onClick={handleClick}
			onTouchStart={() => {}}
			style={{ perspective: '1000px' }}
		>
			{/* Card Container with 3D flip effect */}
			<motion.div
				className='relative w-full h-full'
				style={{
					transformStyle: 'preserve-3d',
				}}
				animate={{
					rotateY: card.isFlipped || card.isMatched ? 180 : 0,
				}}
				transition={{
					duration: 0.6,
					type: 'spring',
					stiffness: 200,
				}}
			>
				{/* Card Back */}
				<motion.div
					className={`absolute inset-0 rounded-xl border-2 border-slate-600 shadow-lg backface-hidden ${
						card.isMatched
							? 'bg-gradient-to-br from-green-700 to-emerald-700 border-green-500'
							: isClickable && !card.isFlipped
							? 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'
							: 'bg-gradient-to-br from-slate-700 to-slate-800'
					}`}
					style={{
						backfaceVisibility: 'hidden',
						transform: 'rotateY(0deg)',
					}}
				>
					<div className='flex flex-col items-center justify-center h-full p-2 sm:p-3'>
						{/* Card type indicator */}
						<motion.div
							className='text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2'
							animate={
								isClickable &&
								!card.isFlipped &&
								!card.isMatched
									? {
											scale: [1, 1.1, 1],
											rotate: [0, 5, -5, 0],
									  }
									: {}
							}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatDelay: 3,
							}}
						>
							{card.isMatched ? '✨' : '❓'}
						</motion.div>

						{/* Card back pattern */}
						<div className='w-full h-2 bg-slate-600 rounded-full mb-1 opacity-30'></div>
						<div className='w-3/4 h-2 bg-slate-600 rounded-full mb-1 opacity-20'></div>
						<div className='w-1/2 h-2 bg-slate-600 rounded-full opacity-10'></div>

						{/* Matched indicator */}
						{card.isMatched && (
							<motion.div
								className='mt-2 text-green-300 font-bold text-mobile-xs'
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3 }}
							>
								MATCHED!
							</motion.div>
						)}
					</div>
				</motion.div>

				{/* Card Front */}
				<motion.div
					className={`absolute inset-0 rounded-xl border-2 shadow-lg backface-hidden bg-gradient-to-br ${getCardTypeColor()} border-slate-500`}
					style={{
						backfaceVisibility: 'hidden',
						transform: 'rotateY(180deg)',
					}}
				>
					<div className='flex flex-col items-center justify-center h-full p-2 sm:p-3 text-white relative overflow-hidden'>
						{/* Background pattern */}
						<div className='absolute inset-0 opacity-10'>
							<div className='absolute top-2 left-2 text-lg opacity-50'>
								{getCardTypeIcon()}
							</div>
							<div className='absolute bottom-2 right-2 text-lg opacity-50 transform rotate-180'>
								{getCardTypeIcon()}
							</div>
						</div>

						{/* Main image or emoji */}
						<motion.div
							className='text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2 relative z-10 flex items-center justify-center'
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								duration: 0.5,
								type: 'spring',
								stiffness: 300,
							}}
						>
							{card.image &&
							card.type === 'cocktail' &&
							!imageError ? (
								<div className='relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20'>
									{imageLoading && (
										<div className='absolute inset-0 bg-slate-600 rounded-lg animate-pulse flex items-center justify-center'>
											<span className='text-lg'>
												{card.emoji}
											</span>
										</div>
									)}
									<img
										src={card.image}
										alt={card.value}
										onLoad={handleImageLoad}
										onError={handleImageError}
										className={`w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300 ${
											imageLoading
												? 'opacity-0'
												: 'opacity-100'
										}`}
									/>
								</div>
							) : (
								<span className='text-3xl sm:text-4xl md:text-5xl'>
									{card.emoji}
								</span>
							)}
						</motion.div>

						{/* Card name */}
						<motion.div
							className='text-mobile-xs sm:text-xs font-bold text-center leading-tight relative z-10 px-1'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							{card.value}
						</motion.div>

						{/* Card type badge */}
						<motion.div
							className={`absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center text-mobile-xs`}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3 }}
						>
							{getCardTypeIcon()}
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			{/* Shine effect for matched cards */}
			{card.isMatched && (
				<motion.div
					className='absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent'
					initial={{ x: '-100%' }}
					animate={{ x: '100%' }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatDelay: 2,
					}}
					style={{ pointerEvents: 'none' }}
				/>
			)}
		</motion.div>
	);
};

export default MemoryCard;
