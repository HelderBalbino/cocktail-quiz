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
	{
		id: 11,
		question:
			'What is the key ingredient that makes an Ember Gimlet unique?',
		options: [
			'Elderflower liqueur',
			'Jalapeño & dill cordial',
			'Cucumber syrup',
			'Basil simple syrup',
		],
		correctAnswer: 1,
		explanation:
			'An Ember Gimlet uses house-made jalapeño & dill cordial combined with vodka or gin, creating a spicy and herbaceous flavor profile.',
	},
	{
		id: 12,
		question: 'What glassware is used for an "on the rocks" Ember Gimlet?',
		options: [
			'Coupe glass',
			'Martini glass',
			'Rayo rock glass',
			'Highball glass',
		],
		correctAnswer: 2,
		explanation:
			'For an on the rocks serve, an Ember Gimlet is stirred into a rayo rock glass, while the straight up version uses a praline coupe glass.',
	},
	{
		id: 13,
		question:
			'In professional bartending, what color edible paint garnish is used for a gin-based Ember Gimlet?',
		options: [
			'Blue edible paint',
			'Red edible paint',
			'Green edible paint',
			'Yellow edible paint',
		],
		correctAnswer: 2,
		explanation:
			'Green edible paint is used as garnish for gin-based Ember Gimlets, while blue edible paint is used for vodka-based versions.',
	},
	{
		id: 14,
		question: 'What is the standard ratio for an Ember Gimlet recipe?',
		options: [
			'2:1 spirit to cordial',
			'1:1 spirit to cordial',
			'3:1 spirit to cordial',
			'1:2 spirit to cordial',
		],
		correctAnswer: 1,
		explanation:
			'An Ember Gimlet uses equal parts (50ml each) of Bone Idyll Vodka or Gin and house-made jalapeño & dill cordial.',
	},
	{
		id: 15,
		question: 'Which technique is used to prepare an Ember Gimlet?',
		options: [
			'Shaken with ice',
			'Built in glass',
			'Stirred in mixing glass',
			'Muddled and strained',
		],
		correctAnswer: 2,
		explanation:
			'An Ember Gimlet is stirred in a mixing glass before being served either straight up in a praline coupe or on the rocks in a rayo rock glass.',
	},
	{
		id: 16,
		question: 'What type of glass is used for an English Pear Bellini?',
		options: ['Coupe glass', 'Wine glass', 'Flute glass', 'Highball glass'],
		correctAnswer: 2,
		explanation:
			'An English Pear Bellini is built directly into a flute glass, which is the traditional glassware for sparkling wine cocktails.',
	},
	{
		id: 17,
		question:
			'What is the main sparkling wine used in an English Pear Bellini?',
		options: ['Champagne', 'Cava', 'Prosecco', 'Crémant'],
		correctAnswer: 2,
		explanation:
			'An English Pear Bellini uses 90ml of Prosecco as the sparkling wine component, topped over the pear and elderflower purée mix.',
	},
	{
		id: 18,
		question:
			'How much pear & elderflower purée mix is used in an English Pear Bellini?',
		options: ['25ml', '35ml', '45ml', '50ml'],
		correctAnswer: 1,
		explanation:
			'An English Pear Bellini uses exactly 35ml of pear & elderflower purée mix, which is then topped with 90ml of Prosecco.',
	},
	{
		id: 19,
		question:
			'What is the proper mixing technique for an English Pear Bellini?',
		options: [
			'Shake vigorously',
			'Stir gently with a bar spoon',
			'Layer without mixing',
			'Muddle the ingredients',
		],
		correctAnswer: 1,
		explanation:
			'After adding the pear & elderflower purée and topping with Prosecco, an English Pear Bellini should be stirred gently with a bar spoon to preserve the bubbles.',
	},
	{
		id: 20,
		question:
			'What flavor profile does elderflower add to the English Pear Bellini?',
		options: [
			'Citrus and tart',
			'Floral and sweet',
			'Spicy and warm',
			'Bitter and herbal',
		],
		correctAnswer: 1,
		explanation:
			'Elderflower provides a delicate floral and sweet flavor that complements the pear purée, creating an elegant and aromatic cocktail profile.',
	},
];
