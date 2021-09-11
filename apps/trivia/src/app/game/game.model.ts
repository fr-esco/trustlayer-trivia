export interface OpenTDbResponse {
	response_code: number;
	results: GameQuestion[];
}

export interface GameQuestion {
	category: GameCategory;
	type: 'multiple' | 'boolean';
	difficulty: 'easy' | 'medium' | 'hard';
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

/**
 * @link https://opentdb.com/api_category.php Triva Categories
 */
export type GameCategory = 'General Knowledge'
	| 'Entertainment: Books'
	| 'Entertainment: Film'
	| 'Entertainment: Music'
	| 'Entertainment: Musicals & Theatres'
	| 'Entertainment: Television'
	| 'Entertainment: Video Games'
	| 'Entertainment: Board Games'
	| 'Science & Nature'
	| 'Science: Computers'
	| 'Science: Mathematics'
	| 'Mythology'
	| 'Sports'
	| 'Geography'
	| 'History'
	| 'Politics'
	| 'Art'
	| 'Celebrities'
	| 'Animals'
	| 'Vehicles'
	| 'Entertainment: Comics'
	| 'Science: Gadgets'
	| 'Entertainment: Japanese Anime & Manga'
	| 'Entertainment: Cartoon & Animations';
