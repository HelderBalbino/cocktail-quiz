import { QuizQuestion } from '../types/quiz';

// Fisher-Yates shuffle algorithm to randomize array
const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array]; // Create a copy to avoid mutating original
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const baseQuestions: QuizQuestion[] = [
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
		question: 'What are the three main ingredients in a Negroni?',
		options: [
			'Gin, Campari, Sweet Vermouth',
			'Vodka, Triple Sec, Cranberry',
			'Rum, Lime, Sugar',
			'Whiskey, Bitters, Sugar',
		],
		correctAnswer: 0,
		explanation:
			'A Negroni consists of equal parts gin, Campari, and sweet vermouth, garnished with an orange slice.',
	},
	{
		id: 3,
		question:
			'Which cocktail is made with tequila, lime juice, and orange liqueur?',
		options: ['Paloma', 'Margarita', 'Tequila Sunrise', 'Mexican Mule'],
		correctAnswer: 1,
		explanation:
			'A Margarita is made with tequila, lime juice, and orange liqueur (like triple sec or Cointreau).',
	},
	{
		id: 4,
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
		id: 5,
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
		id: 6,
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
		id: 7,
		question:
			'what color edible paint garnish is used for a gin-based Ember Gimlet?',
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
		id: 8,
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
		id: 9,
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
		id: 10,
		question: 'What type of glass is used for an English Pear Bellini?',
		options: ['Coupe glass', 'Wine glass', 'Flute glass', 'Highball glass'],
		correctAnswer: 2,
		explanation:
			'An English Pear Bellini is built directly into a flute glass, which is the traditional glassware for sparkling wine cocktails.',
	},
	{
		id: 11,
		question:
			'What is the main sparkling wine used in an English Pear Bellini?',
		options: ['Champagne', 'Cava', 'Prosecco', 'Crémant'],
		correctAnswer: 2,
		explanation:
			'An English Pear Bellini uses 90ml of Prosecco as the sparkling wine component, topped over the pear and elderflower purée mix.',
	},
	{
		id: 12,
		question:
			'How much pear & elderflower purée mix is used in an English Pear Bellini?',
		options: ['25ml', '35ml', '45ml', '50ml'],
		correctAnswer: 1,
		explanation:
			'An English Pear Bellini uses exactly 35ml of pear & elderflower purée mix, which is then topped with 90ml of Prosecco.',
	},
	{
		id: 13,
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
		id: 14,
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
	{
		id: 15,
		question: 'What type of gin is used in a Garden Collins?',
		options: [
			'London Dry Gin',
			'Malfy Rosa Grapefruit Gin',
			"Hendrick's Gin",
			'Bombay Sapphire',
		],
		correctAnswer: 1,
		explanation:
			'A Garden Collins uses 50ml of Malfy Rosa Grapefruit Gin, which provides the citrus and botanical base for this refreshing cocktail.',
	},
	{
		id: 16,
		question: 'What is the ratio of Garden Collins Mix to gin?',
		options: [
			'2:1 mix to gin',
			'1:1 mix to gin',
			'1:2 mix to gin',
			'3:1 mix to gin',
		],
		correctAnswer: 1,
		explanation:
			'A Garden Collins uses equal parts (50ml each) of Garden Collins Mix and Malfy Rosa Grapefruit Gin for perfect balance.',
	},
	{
		id: 17,
		question:
			'What cocktail technique is used to prepare a Garden Collins?',
		options: [
			'Stir and strain',
			'Build in glass',
			'Whip shake and strain',
			'Muddle and shake',
		],
		correctAnswer: 2,
		explanation:
			'A Garden Collins is prepared using the whip shake technique - shaken with cubed ice and strained into a Collins glass filled with fresh cubed ice.',
	},
	{
		id: 18,
		question: 'What glassware is used for serving a Garden Collins?',
		options: [
			'Rocks glass',
			'Coupe glass',
			'Collins glass',
			'Highball glass',
		],
		correctAnswer: 2,
		explanation:
			'A Garden Collins is served in a Collins or (princesa) glass filled with cubed ice, which is the traditional tall glass for Collins-style cocktails.',
	},
	{
		id: 19,
		question:
			'How is a Garden Collins finished after shaking and straining?',
		options: [
			'Garnished with lime and no soda water',
			'Garnished with a dehydrated grapefruit slice and topped with soda water',
			'Served neat',
			'Flamed orange peel',
		],
		correctAnswer: 1,
		explanation:
			'After whip shaking and straining into the Collins glass, a Garden Collins is topped with soda water to add effervescence and dilution and Garnished with a dehydrated grapefruit slice.',
	},
	{
		id: 20,
		question:
			'What is a "whip shake" and why is it used in cocktail preparation?',
		options: [
			'A gentle shake to preserve carbonation',
			'A short, vigorous shake to aerate and chill quickly',
			'A technique used only for cream-based cocktails',
			'A method to layer ingredients without mixing',
		],
		correctAnswer: 1,
		explanation:
			"A whip shake is a short, vigorous shaking technique that quickly aerates the cocktail and chills it without over-diluting. It's ideal for cocktails that will be topped with soda or other mixers, creating a light, frothy texture.",
	},
	{
		id: 21,
		question: 'What is the base spirit in a Ruby cocktail?',
		options: ['Gin', 'Absolut Citron Vodka', 'White Rum', 'Tequila'],
		correctAnswer: 1,
		explanation:
			'The Ruby cocktail is built on Absolut Citron vodka, which provides a clean, citrus-forward base that pairs beautifully with the floral and fruity elements.',
	},
	{
		id: 22,
		question: 'What type of garnish is used for the Ruby cocktail?',
		options: ['Lemon twist', 'Rose petal', 'Mint sprig', 'Orange wheel'],
		correctAnswer: 1,
		explanation:
			'The Ruby cocktail is garnished with a single rose petal, which perfectly complements the rose liqueur in the drink and enhances its floral presentation.',
	},
	{
		id: 23,
		question: 'What bitters are used in the Ruby cocktail?',
		options: [
			'Angostura bitters',
			'Orange bitters',
			'Plum bitters',
			"Peychaud's bitters",
		],
		correctAnswer: 2,
		explanation:
			'Plum bitters are used in the Ruby cocktail (3 drops), adding depth and complexity that complements the raspberry and floral notes.',
	},
	{
		id: 24,
		question:
			'How much Ruby pre-batch is used in the cocktail preparation?',
		options: ['50ml', '75ml', '100ml', '125ml'],
		correctAnswer: 2,
		explanation:
			'The Ruby cocktail uses 100ml of Ruby pre-batch, which contains the vodka, purées, rose liqueur, and vanilla syrup premixed for consistency.',
	},
	{
		id: 25,
		question: 'What type of soda tops the Ruby cocktail?',
		options: [
			'Club soda',
			'Fever Tree orange blossom and raspberry soda',
			'Tonic water',
			'Ginger beer',
		],
		correctAnswer: 1,
		explanation:
			'The Ruby is topped with Fever Tree orange blossom and raspberry soda, which enhances both the floral notes from the rose liqueur and the berry flavors from the raspberry purée.',
	},
	{
		id: 26,
		question: 'What type of glass is the Ruby cocktail served in?',
		options: [
			'Coupe glass',
			'Martini glass',
			'collins glass',
			'Old fashioned glass',
		],
		correctAnswer: 2,
		explanation:
			'The Ruby cocktail is served in a collins glass, which provides enough space for the pre-batch, ice, and the soda topper while showcasing the beautiful color.',
	},
	{
		id: 27,
		question:
			'Which purée is included in the prebatch for the Ruby cocktail?',
		options: ['Strawberry', 'Raspberry', 'Blackberry', 'Peach'],
		correctAnswer: 1,
		explanation:
			'The Ruby cocktail contains raspberry purée and lemon juice, creating a perfect balance of berry sweetness and citrus tartness.',
	},
	{
		id: 28,
		question: 'What liqueur gives the Ruby cocktail its floral character?',
		options: [
			'Elderflower liqueur',
			'Rose liqueur',
			'Lavender liqueur',
			'Hibiscus liqueur',
		],
		correctAnswer: 1,
		explanation:
			'Rose liqueur is the key ingredient that gives the Ruby cocktail its distinctive floral character, making it a "floral easy drinker."',
	},
	{
		id: 29,
		question: 'What type of gin is used in the Sloegasm cocktail?',
		options: [
			'London Dry Gin',
			'Plymouth Sloe Gin',
			'Hendricks Gin',
			'Bombay Sapphire',
		],
		correctAnswer: 1,
		explanation:
			'Plymouth Sloe Gin is the base spirit for the Sloegasm cocktail, providing the characteristic sloe berry flavor and deep red color.',
	},
	{
		id: 30,
		question: 'Which liqueur adds berry sweetness to the Sloegasm?',
		options: ['Cointreau', 'Chambord', 'Crème de Cassis', 'Grand Marnier'],
		correctAnswer: 1,
		explanation:
			'Chambord, a premium black raspberry liqueur, adds rich berry sweetness and complexity to the Sloegasm cocktail.',
	},
	{
		id: 31,
		question: 'What type of wine is included in the Sloegasm recipe?',
		options: [
			'Embrujo Verdejo white wine',
			'Pinot Grigio',
			'Sauvignon Blanc',
			'Chardonnay',
		],
		correctAnswer: 0,
		explanation:
			'Embrujo Verdejo white wine is used in the Sloegasm, adding crisp, fresh notes and lightness to balance the rich berry flavors.',
	},
	{
		id: 32,
		question: 'How should the Ratafia be added when mixing the Sloegasm?',
		options: [
			'Pour directly into the keg',
			'Pour through a j-cloth',
			'Shake with ice first',
			'Heat before adding',
		],
		correctAnswer: 1,
		explanation:
			'The Ratafia should be poured through a j-cloth when adding to the Cornelius keg to strain out any sediment or particles.',
	},
	{
		id: 33,
		question: 'What equipment is used for batching the Sloegasm cocktail?',
		options: [
			'Large mixing bowl',
			'Cornelius keg',
			'Wine barrel',
			'Stainless steel tank',
		],
		correctAnswer: 1,
		explanation:
			'A Cornelius keg is used for batching the Sloegasm, allowing for pressurization with gas and proper mixing of all ingredients.',
	},
	{
		id: 34,
		question: 'How long should the Sloegasm keg rest in the cellar?',
		options: ['2 hours', '6 hours', 'Overnight', '3 days'],
		correctAnswer: 2,
		explanation:
			'The Sloegasm keg should be left in the cellar overnight, with hourly shaking when possible to ensure proper integration of all ingredients.',
	},
	{
		id: 35,
		question: 'What sparkling water is used in the Sloegasm recipe?',
		options: [
			'Perrier',
			'San Pellegrino',
			'Belu Sparkling Water',
			'Fever Tree',
		],
		correctAnswer: 2,
		explanation:
			'Belu Sparkling Water is specifically used in the Sloegasm recipe to provide the carbonation and dilution needed for the perfect serve.',
	},
	{
		id: 36,
		question: 'What type of bitters are used in the Sloegasm cocktail?',
		options: [
			'Angostura bitters',
			'Orange bitters',
			'Lemon Bitter',
			"Peychaud's bitters",
		],
		correctAnswer: 2,
		explanation:
			'Lemon Bitter is used in the Sloegasm to add citrus complexity and balance the sweet berry flavors with aromatic depth.',
	},
];

// Export shuffled questions that will be randomized each time the module is imported
export const cocktailQuestions: QuizQuestion[] = shuffleArray(baseQuestions);

// Function to get a fresh shuffled set of questions (useful for restarting quiz)
export const getShuffledQuestions = (): QuizQuestion[] =>
	shuffleArray(baseQuestions);
