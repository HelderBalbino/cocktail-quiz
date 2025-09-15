import { QuizQuestion } from '../types/quiz';

export const cocktailQuestions: QuizQuestion[] = [
	{
		id: 1,
		question: 'What is the main spirit in a Mojito?',
		options: ['Vodka', 'Rum', 'Gin', 'Tequila'],
		correctAnswer: 1,
		explanation:
			'A Mojito is made with white rum, sugar, lime juice, soda water, and mint.',
	},
	{
		id: 2,
		question: "Which cocktail is known as the 'King of Cocktails'?",
		options: ['Manhattan', 'Martini', 'Old Fashioned', 'Negroni'],
		correctAnswer: 0,
		explanation:
			"The Manhattan is often referred to as the 'King of Cocktails' due to its classic status and popularity.",
	},
	{
		id: 3,
		question:
			'What type of glass is traditionally used for serving a Martini?',
		options: [
			'Rocks glass',
			'Highball glass',
			'Martini glass',
			'Wine glass',
		],
		correctAnswer: 2,
		explanation:
			'A Martini is traditionally served in a Martini glass (also called a cocktail glass).',
	},
	{
		id: 4,
		question: 'What are the three main ingredients in a Negroni?',
		options: [
			'Gin, Campari, Sweet Vermouth',
			'Vodka, Triple Sec, Cranberry',
			'Rum, Lime, Sugar',
			'Whiskey, Bitters, Sugar',
		],
		correctAnswer: 0,
		explanation:
			'A Negroni consists of equal parts gin, Campari, and sweet vermouth, garnished with an orange peel.',
	},
	{
		id: 5,
		question:
			'Which cocktail is made with tequila, lime juice, and orange liqueur?',
		options: ['Paloma', 'Margarita', 'Tequila Sunrise', 'Mexican Mule'],
		correctAnswer: 1,
		explanation:
			'A Margarita is made with tequila, lime juice, and orange liqueur (like triple sec or Cointreau).',
	},
	{
		id: 6,
		question: "What does 'muddling' mean in bartending?",
		options: [
			'Shaking vigorously',
			'Stirring gently',
			'Crushing ingredients',
			'Straining liquid',
		],
		correctAnswer: 2,
		explanation:
			'Muddling involves gently crushing ingredients (like mint or fruit) to release their flavors and oils.',
	},
	{
		id: 7,
		question: 'Which spirit is the base of a Bloody Mary?',
		options: ['Gin', 'Rum', 'Vodka', 'Whiskey'],
		correctAnswer: 2,
		explanation:
			'A Bloody Mary is made with vodka, tomato juice, and various spices and flavorings.',
	},
	{
		id: 8,
		question: 'What is the difference between a Daiquiri and a Mojito?',
		options: [
			'Different spirits',
			'Daiquiri has no mint',
			'Mojito has no lime',
			'They are the same',
		],
		correctAnswer: 1,
		explanation:
			'Both use rum and lime, but a Mojito includes fresh mint and soda water, while a Daiquiri does not.',
	},
	{
		id: 9,
		question: 'What type of vermouth is used in a classic Martini?',
		options: [
			'Sweet vermouth',
			'Dry vermouth',
			'Blanc vermouth',
			'No vermouth',
		],
		correctAnswer: 1,
		explanation:
			'A classic Martini uses dry vermouth with gin (or vodka), garnished with an olive or lemon twist.',
	},
	{
		id: 10,
		question: "Which cocktail is served 'on the rocks'?",
		options: [
			'A cocktail served hot',
			'A cocktail served with ice',
			'A cocktail served without alcohol',
			'A cocktail served in a salt-rimmed glass',
		],
		correctAnswer: 1,
		explanation:
			"'On the rocks' means served over ice cubes in a rocks glass (old fashioned glass).",
	},
];
