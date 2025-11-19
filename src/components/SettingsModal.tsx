import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	settings: {
		theme: 'dark' | 'light';
		soundEnabled: boolean;
		difficulty: 'easy' | 'medium' | 'hard';
		timerDuration: number;
	};
	onUpdateSetting: (key: string, value: any) => void;
	onReset: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = memo(
	({ isOpen, onClose, settings, onUpdateSetting, onReset }) => {
		if (!isOpen) return null;

		return (
			<div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
				<motion.div
					className='bg-slate-800 rounded-xl border border-slate-600 max-w-md w-full max-h-[90vh] overflow-y-auto'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.2 }}
				>
					<div className='p-6'>
						<div className='flex items-center justify-between mb-6'>
							<h2 className='text-xl font-bold text-white flex items-center gap-2'>
								⚙️ Settings
							</h2>
							<button
								onClick={onClose}
								className='text-slate-400 hover:text-white transition-colors p-1'
								aria-label='Close settings'
							>
								✕
							</button>
						</div>

						<div className='space-y-6'>
							{/* Theme Setting */}
							<div>
								<label className='block text-sm font-medium text-slate-300 mb-2'>
									Theme
								</label>
								<div className='grid grid-cols-2 gap-2'>
									{(['dark', 'light'] as const).map(
										(theme) => (
											<button
												key={theme}
												onClick={() =>
													onUpdateSetting(
														'theme',
														theme,
													)
												}
												className={`p-3 rounded-lg border-2 transition-all capitalize ${
													settings.theme === theme
														? 'border-purple-500 bg-purple-500/20 text-white'
														: 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
												}`}
											>
												{theme === 'dark' ? '🌙' : '☀️'}{' '}
												{theme}
											</button>
										),
									)}
								</div>
							</div>

							{/* Sound Setting */}
							<div>
								<label className='block text-sm font-medium text-slate-300 mb-2'>
									Sound Effects
								</label>
								<button
									onClick={() =>
										onUpdateSetting(
											'soundEnabled',
											!settings.soundEnabled,
										)
									}
									className={`w-full p-3 rounded-lg border-2 transition-all ${
										settings.soundEnabled
											? 'border-green-500 bg-green-500/20 text-white'
											: 'border-slate-600 bg-slate-700 text-slate-300'
									}`}
								>
									{settings.soundEnabled
										? '🔊 Enabled'
										: '🔇 Disabled'}
								</button>
							</div>

							{/* Difficulty Setting */}
							<div>
								<label className='block text-sm font-medium text-slate-300 mb-2'>
									Default Difficulty
								</label>
								<div className='grid grid-cols-3 gap-2'>
									{(['easy', 'medium', 'hard'] as const).map(
										(difficulty) => (
											<button
												key={difficulty}
												onClick={() =>
													onUpdateSetting(
														'difficulty',
														difficulty,
													)
												}
												className={`p-3 rounded-lg border-2 transition-all capitalize text-sm ${
													settings.difficulty ===
													difficulty
														? 'border-blue-500 bg-blue-500/20 text-white'
														: 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
												}`}
											>
												{difficulty === 'easy'
													? '😊'
													: difficulty === 'medium'
													? '🤔'
													: '😤'}{' '}
												{difficulty}
											</button>
										),
									)}
								</div>
							</div>

							{/* Timer Duration Setting */}
							<div>
								<label className='block text-sm font-medium text-slate-300 mb-2'>
									Timer Duration: {settings.timerDuration}s
								</label>
								<input
									type='range'
									min='10'
									max='60'
									step='5'
									value={settings.timerDuration}
									onChange={(e) =>
										onUpdateSetting(
											'timerDuration',
											Number(e.target.value),
										)
									}
									className='w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider'
								/>
								<div className='flex justify-between text-xs text-slate-400 mt-1'>
									<span>10s</span>
									<span>60s</span>
								</div>
							</div>
						</div>

						<div className='flex gap-3 mt-6 pt-6 border-t border-slate-600'>
							<button
								onClick={onReset}
								className='px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors'
							>
								Reset to Defaults
							</button>
							<button
								onClick={onClose}
								className='flex-1 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors'
							>
								Save & Close
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		);
	},
);

SettingsModal.displayName = 'SettingsModal';

export default SettingsModal;
