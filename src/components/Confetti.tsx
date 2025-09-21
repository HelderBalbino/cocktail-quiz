import React, { useEffect, useState } from 'react';

interface ConfettiProps {
	isActive: boolean;
	duration?: number;
}

interface Particle {
	id: number;
	x: number;
	y: number;
	xDirection: number;
	yDirection: number;
	animationDelay: number;
	color: string;
	size: number;
	shape: string;
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

	// Different shapes for variety
	const shapes = ['square', 'circle', 'triangle'];

	useEffect(() => {
		if (isActive) {
			// Generate MASSIVE explosion particles radiating outward from center
			const newParticles: Particle[] = Array.from(
				{ length: 120 }, // Double the particles for bigger explosion
				(_, i) => {
					// Create circular spread pattern
					const angle = (i / 120) * 360; // Distribute evenly in circle
					const distance = 100 + Math.random() * 200; // Much larger distance (was 50-150, now 100-300)
					const radians = (angle * Math.PI) / 180;

					return {
						id: Date.now() + i,
						x: 50, // Start from center
						y: 50, // Start from center
						xDirection: Math.cos(radians) * distance,
						yDirection: Math.sin(radians) * distance,
						animationDelay: Math.random() * 400, // Slightly longer burst
						color: colors[
							Math.floor(Math.random() * colors.length)
						],
						size: Math.random() * 6 + 4, // Bigger particles: 4-10px (was 3-7px)
						shape: shapes[
							Math.floor(Math.random() * shapes.length)
						],
						animationType: Math.floor(Math.random() * 3) + 1,
					};
				},
			);

			setParticles(newParticles);
			setShowConfetti(true);
			setAnimationKey((prev) => prev + 1);

			// Hide confetti after explosion
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
					className={`absolute opacity-90 ${
						particle.shape === 'circle'
							? 'rounded-full'
							: particle.shape === 'triangle'
							? 'triangle'
							: 'rounded-sm'
					}`}
					style={
						{
							left: `${particle.x}%`,
							top: `${particle.y}%`,
							width: `${particle.size}px`,
							height: `${particle.size}px`,
							backgroundColor: particle.color,
							animationDelay: `${particle.animationDelay}ms`,
							animation: `confetti-burst-${particle.animationType} 2.8s ease-out forwards`,
							'--x-direction': `${particle.xDirection}px`,
							'--y-direction': `${particle.yDirection}px`,
						} as React.CSSProperties
					}
				/>
			))}
		</div>
	);
};

export default Confetti;
