import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NGXLogger } from 'ngx-logger';
import { map, shareReplay } from 'rxjs/operators';

import { GameQuestion } from './game.model';
import { GameService } from './game.service';

@UntilDestroy()
@Component({
	selector: 'tlt-trivia-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
	readonly questions$ = this.gameService.generate$().pipe(
		shareReplay(1)
	);

	formGroup?: FormGroup;
	get questionFormArray() {
		return this.formGroup?.get('questions') as FormArray;
	}

	constructor(
		private readonly cdr: ChangeDetectorRef,
		private readonly fb: FormBuilder,
		private readonly gameService: GameService,
		private readonly logger: NGXLogger,
	) { }

	ngOnInit(): void {
		this.logger.debug('GameComponent::ngOnInit');
		this.questions$.pipe(
			map(questions => {

				return this.fb.array(questions.map(q => this.createQuestionFormControl(q)));
			}),
			untilDestroyed(this),
		).subscribe(questionFormArray => {
			this.formGroup = this.fb.group({
				questions: questionFormArray
			});
			this.formGroup.valueChanges.subscribe(v => this.logger.debug(v));
			this.cdr.markForCheck();
		})
	}

	private createQuestionFormControl(_question: GameQuestion) {
		return this.fb.control(null, Validators.required);
	}

}
