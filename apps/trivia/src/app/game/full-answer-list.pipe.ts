import { Pipe, PipeTransform } from '@angular/core';

import { GameQuestion } from './game.model';

@Pipe({
	name: 'fullAnswerList'
})
export class FullAnswerListPipe implements PipeTransform {

	transform(value: GameQuestion) {
		return [value.correct_answer, ...value.incorrect_answers]
			.sort(() => Math.random() < 0.5 ? 1 : -1);
	}

}
