import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { OpenTDbResponse } from './game.model';

@Injectable(/*{
	providedIn: 'root'
}*/)
export class GameService {

	constructor(
		private readonly http: HttpClient,
	) { }

	generate$() {
		return this.http.get<OpenTDbResponse>('https://opentdb.com/api.php?amount=10').pipe(
			map(response => response.results)
		);
	}
}
