import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { OpenTDbResponse } from './game.model';

@Injectable(/*{
	providedIn: 'root'
}*/)
export class GameService {

	constructor(
		private readonly http: HttpClient,
	) { }

	generate$() {
		return this.http.get<OpenTDbResponse>(`https://opentdb.com/api.php?amount=${environment.feature.game.questionCount}`)
			.pipe(
				map(response => response.results)
			);
	}
}
