import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, runTransaction, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Leaderboard, LeaderboardStat, Score } from './score.model';

@Injectable({
	providedIn: 'root'
})
export class ScoreService {
	#leaderboardRef = doc(this.firestore, 'scores/leaderboard');
	leaderboard$ = docData(this.#leaderboardRef) as Observable<Leaderboard>;

	readonly scoreList = {
		easy: 1,
		medium: 2,
		hard: 3
	};

	constructor(
		private readonly firestore: Firestore,
	) { }

	/**
	 * Save the Score for the User.
	 * Then aggregate the result in the special `leaderboard` document
	 * for optimizing (both performance and cost) "Leaderboard" page rendering.
	 */
	async saveScore(score: number, userId: string, userDisplayName: string) {
		const createdAt = Timestamp.now();
		const scoresCollection = collection(this.firestore, 'scores');
		const newScoreDoc: Score = {
			createdAt,
			score,
			userId,
		}

		return runTransaction(this.firestore, async t => {
			const leaderboard = await t.get(this.#leaderboardRef);
			const candidateStatDoc: LeaderboardStat = {
				score,
				createdAt,
				userId,
				userDisplayName,
			};
			const stats: LeaderboardStat[] = leaderboard.exists() ? leaderboard.get('stats') : [];
			let i = 0, stat: LeaderboardStat;
			// eslint-disable-next-line no-cond-assign
			for (; stat = stats[i]; i++) {
				if (stat.score < candidateStatDoc.score) {
					stats.splice(i, 0, candidateStatDoc);
					break;
				}
			}
			if (i === stats.length) {
				stats.push(candidateStatDoc);
			}
			if (stats.length > environment.feature.score.leaderboardStatMaxQuantity) {
				stats.pop();
			}

			t.set(doc(scoresCollection), newScoreDoc);

			return t.set(this.#leaderboardRef, { stats });
		})
	}
}
