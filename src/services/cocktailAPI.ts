// TheCocktailDB API integration
export interface CocktailAPIResponse {
	drinks: CocktailAPIData[] | null;
}

export interface CocktailAPIData {
	idDrink: string;
	strDrink: string;
	strDrinkThumb: string;
	strInstructions: string;
	strGlass: string;
	strCategory: string;
}

const COCKTAIL_API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1';

// Cache for API responses to avoid repeated requests
const imageCache = new Map<string, string>();

/**
 * Fetch cocktail image from TheCocktailDB API
 * @param cocktailName - Name of the cocktail to search for
 * @returns Promise<string | null> - Image URL or null if not found
 */
export const fetchCocktailImage = async (
	cocktailName: string,
): Promise<string | null> => {
	// Check cache first
	const cacheKey = cocktailName.toLowerCase();
	if (imageCache.has(cacheKey)) {
		return imageCache.get(cacheKey) || null;
	}

	try {
		// Clean the cocktail name for API search
		const cleanName = cocktailName.toLowerCase().trim();
		const response = await fetch(
			`${COCKTAIL_API_BASE}/search.php?s=${encodeURIComponent(
				cleanName,
			)}`,
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: CocktailAPIResponse = await response.json();

		if (data.drinks && data.drinks.length > 0) {
			// Get the first matching drink's image
			const imageUrl = data.drinks[0].strDrinkThumb;

			// Cache the result
			imageCache.set(cacheKey, imageUrl);

			return imageUrl;
		}

		// Cache null result to avoid repeated failed requests
		imageCache.set(cacheKey, '');
		return null;
	} catch (error) {
		console.warn(`Failed to fetch image for ${cocktailName}:`, error);

		// Cache failed result
		imageCache.set(cacheKey, '');
		return null;
	}
};

/**
 * Fetch multiple cocktail images in parallel
 * @param cocktailNames - Array of cocktail names
 * @returns Promise<Map<string, string | null>> - Map of cocktail name to image URL
 */
export const fetchMultipleCocktailImages = async (
	cocktailNames: string[],
): Promise<Map<string, string | null>> => {
	const imagePromises = cocktailNames.map(async (name) => {
		const imageUrl = await fetchCocktailImage(name);
		return [name, imageUrl] as const;
	});

	const results = await Promise.allSettled(imagePromises);
	const imageMap = new Map<string, string | null>();

	results.forEach((result, index) => {
		if (result.status === 'fulfilled') {
			const [name, url] = result.value;
			imageMap.set(name, url);
		} else {
			// Handle failed requests
			imageMap.set(cocktailNames[index], null);
		}
	});

	return imageMap;
};

/**
 * Search for cocktails by partial name (useful for autocomplete)
 * @param searchTerm - Partial cocktail name
 * @returns Promise<CocktailAPIData[]> - Array of matching cocktails
 */
export const searchCocktails = async (
	searchTerm: string,
): Promise<CocktailAPIData[]> => {
	try {
		const response = await fetch(
			`${COCKTAIL_API_BASE}/search.php?s=${encodeURIComponent(
				searchTerm,
			)}`,
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: CocktailAPIResponse = await response.json();
		return data.drinks || [];
	} catch (error) {
		console.warn(`Failed to search cocktails for "${searchTerm}":`, error);
		return [];
	}
};

/**
 * Get cocktail details by ID
 * @param cocktailId - The cocktail ID from TheCocktailDB
 * @returns Promise<CocktailAPIData | null> - Cocktail details or null
 */
export const getCocktailById = async (
	cocktailId: string,
): Promise<CocktailAPIData | null> => {
	try {
		const response = await fetch(
			`${COCKTAIL_API_BASE}/lookup.php?i=${cocktailId}`,
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: CocktailAPIResponse = await response.json();
		return data.drinks?.[0] || null;
	} catch (error) {
		console.warn(
			`Failed to fetch cocktail details for ID ${cocktailId}:`,
			error,
		);
		return null;
	}
};

/**
 * Clear the image cache (useful for development or memory management)
 */
export const clearImageCache = (): void => {
	imageCache.clear();
};

/**
 * Get current cache size
 */
export const getCacheSize = (): number => {
	return imageCache.size;
};
