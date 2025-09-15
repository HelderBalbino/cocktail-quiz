export interface QuizQuestion {
	id: number;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation?: string;
}

export interface QuizState {
	currentQuestionIndex: number;
	answers: number[];
	score: number;
	isComplete: boolean;
	showResults: boolean;
}

export interface QuizResult {
	score: number;
	totalQuestions: number;
	percentage: number;
	message: string;
}
