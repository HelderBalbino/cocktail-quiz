import React from 'react';

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

const DefaultErrorFallback: React.FC<{
	error: Error;
	resetError: () => void;
}> = ({ error, resetError }) => (
	<div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center p-4'>
		<div className='bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md w-full text-center'>
			<div className='text-4xl mb-4'>🍸💥</div>
			<h2 className='text-xl font-bold text-white mb-2'>
				Oops! Something went wrong
			</h2>
			<p className='text-red-300 mb-4'>
				The cocktail mixer seems to have malfunctioned. Don't worry,
				we'll get it fixed!
			</p>
			<details className='text-left mb-4 text-sm'>
				<summary className='cursor-pointer text-red-400 hover:text-red-300'>
					Error Details
				</summary>
				<pre className='mt-2 p-2 bg-slate-800 rounded text-red-200 overflow-auto'>
					{error.message}
				</pre>
			</details>
			<button
				onClick={resetError}
				className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors'
			>
				🔄 Try Again
			</button>
		</div>
	</div>
);

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	resetError = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError && this.state.error) {
			const FallbackComponent =
				this.props.fallback || DefaultErrorFallback;
			return (
				<FallbackComponent
					error={this.state.error}
					resetError={this.resetError}
				/>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
