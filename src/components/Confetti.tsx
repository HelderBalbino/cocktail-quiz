import React, { useEffect, useState } from 'react';

interface ConfettiProps {
	isActive: boolean;
	duration?: number;
}

interface Particle {
	id: number;
	left: number;
	animationDelay: number;
	color: string;
	size: number;
	animationType: number;
}

const Confetti: React.FC<ConfettiProps> = ({ isActive, duration = 2500 }) => {
	const [particles, setParticles] = useState<Particle[]>([]);
	const [showConfetti, setShowConfetti] = useState(false);
	const [animationKey, setAnimationKey] = useState(0);

	// Cocktail-themed colors that match your dark theme
	const colors = [
		'#10b981', // emerald-500
		'#14b8a6', // teal-500
		'#fbbf24', // amber-400
		'#f59e0b', // amber-500
		'#84cc16', // lime-500
		'#22c55e', // green-500
		'#06d6a0', // teal-400
		'#ffd23f', // yellow-400
	];

	useEffect(() => {
		if (isActive) {
			// Generate new particles with varied properties for rain effect
			const newParticles: Particle[] = Array.from(
				{ length: 40 },
				(_, i) => ({
					id: Date.now() + i, // Unique ID to ensure fresh animation
					left: Math.random() * 100,
					animationDelay: Math.random() * 1000, // Spread out over 1 second
					color: colors[Math.floor(Math.random() * colors.length)],
					size: Math.random() * 3 + 2, // Random size between 2-5px
					animationType: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3
				}),
			);

			setParticles(newParticles);
			setShowConfetti(true);
			setAnimationKey((prev) => prev + 1); // Force re-render for new animation

			// Hide confetti after duration
			const timer = setTimeout(() => {
				setShowConfetti(false);
			}, duration);

			return () => clearTimeout(timer);
		} else {
			setShowConfetti(false);
		}
	}, [isActive, duration]);

	if (!showConfetti) return null;

	return (
		<div
			key={animationKey}
			className='fixed inset-0 pointer-events-none z-50 overflow-hidden'
		>
			{particles.map((particle) => (
				<div
					key={particle.id}
					className='absolute opacity-90 rounded-sm'
					style={{
						left: `${particle.left}%`,
						width: `${particle.size}px`,
						height: `${particle.size}px`,
						backgroundColor: particle.color,
						animationDelay: `${particle.animationDelay}ms`,
						animation: `confetti-rain-${particle.animationType} 2.5s ease-out forwards`,
					}}
				/>
			))}
		</div>
	);
};

export default Confetti;
