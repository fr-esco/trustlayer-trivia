import 'zone.js/plugins/zone-error';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: 'AIzaSyDDr4U7ML41ruO-t5wlQoHfH3pdrsrRtnk',
		authDomain: 'trustlayer-trivia.firebaseapp.com',
		projectId: 'trustlayer-trivia',
		storageBucket: 'trustlayer-trivia.appspot.com',
		messagingSenderId: '883194304390',
		appId: '1:883194304390:web:157d89c9f2fde46aacbe07',
		useEmulators: false,
	},
	feature: {
		game: {
			questionCount: 3
		}
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
