import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { GameQuestion, OpenTDbResponse } from './game.model';

@Injectable(/*{
	providedIn: 'root'
}*/)
export class GameService {
	readonly scoreList = {
		easy: 1,
		medium: 2,
		hard: 3
	};

	constructor(
		private readonly http: HttpClient,
	) { }

	getRightAnswerScore(question: GameQuestion) {
		return this.scoreList[question.difficulty];
	}

	generate$() {
		return this.http.get<OpenTDbResponse>(`https://opentdb.com/api.php?amount=${environment.feature.game.questionCount}`)
			.pipe(
				map(response => response.results)
			);
	}
}
