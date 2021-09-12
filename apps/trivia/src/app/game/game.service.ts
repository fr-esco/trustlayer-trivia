import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ScoreService } from '../core/score.service';
import { GameQuestion, OpenTDbResponse } from './game.model';

@Injectable(/*{
	providedIn: 'root'
}*/)
export class GameService {

	constructor(
		private readonly http: HttpClient,
		private readonly scoreService: ScoreService,
	) { }

	getRightAnswerScore(question: GameQuestion) {
		return this.scoreService.scoreList[question.difficulty];
	}

	generate$() {
		return this.http.get<OpenTDbResponse>(`https://opentdb.com/api.php?amount=${environment.feature.game.questionCount}`)
			.pipe(
				map(response => response.results)
			);
	}

	saveScore(score: number, userId: string, userDisplayName: string) {
		return this.scoreService.saveScore(score, userId, userDisplayName);
	}
}
