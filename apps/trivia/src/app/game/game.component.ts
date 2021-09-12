import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NGXLogger } from 'ngx-logger';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from '../../environments/environment';
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

	readonly correctFeedbackList: boolean[] = [];
	formGroup?: FormGroup;
	get questionFormArray() {
		return this.formGroup?.get('questions') as FormArray;
	}

	constructor(
		private readonly cdr: ChangeDetectorRef,
		private readonly domSanitizer: DomSanitizer,
		private readonly fb: FormBuilder,
		private readonly gameService: GameService,
		private readonly logger: NGXLogger,
	) { }

	ngOnInit(): void {
		this.logger.debug('GameComponent::ngOnInit');
		this.questions$.pipe(
			map(questions => {

				return this.fb.array(questions.map((q, i) => this.createQuestionFormControl(q, i)));
			}),
			untilDestroyed(this),
		).subscribe(questionFormArray => {
			this.formGroup = this.fb.group({
				questions: questionFormArray
			});
			this.cdr.markForCheck();
		})
	}

	private createQuestionFormControl(question: GameQuestion, index: number) {
		const formControl = this.fb.control(null, Validators.required);
		formControl.valueChanges
			.pipe(
				// first(x => !!x)
				map(v => this.domSanitizer.sanitize(SecurityContext.HTML, v))
			)
			.subscribe(v => {
				this.correctFeedbackList[index] = v === question.correct_answer;
				if (environment.production)
					formControl.disable();
				this.cdr.markForCheck();
			});

		return formControl;
	}

}
