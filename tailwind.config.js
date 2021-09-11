const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
	prefix: '',
	purge: {
		enabled: guessProductionMode(),
		content: [
			'./apps/**/*.{html,ts}',
			'./libs/**/*.{html,ts}',
		]
	},
	// https://tailwindcss.com/trivia/dark-mode
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
