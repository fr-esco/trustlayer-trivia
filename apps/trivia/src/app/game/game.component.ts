import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, SecurityContext } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NGXLogger } from 'ngx-logger';
import { first, map, shareReplay } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserRegistrationDialogComponent } from '../user-registration-dialog/user-registration-dialog.component';
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

	readonly stepperOrientation$ = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(({ matches }) => matches ? 'vertical' : 'horizontal')
		);

	answerCount = 0;
	readonly correctFeedbackList: boolean[] = [];
	formGroup?: FormGroup;
	readonly questionCount = environment.feature.game.questionCount;
	get questionFormArray() {
		return this.formGroup?.get('questions') as FormArray;
	}
	score = 0;

	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		private readonly cdr: ChangeDetectorRef,
		private readonly dialog: MatDialog,
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

	saveScore() {
		this.logger.info('GameComponent', 'User wants to save their score', this.score);
		this.dialog.open(UserRegistrationDialogComponent).afterClosed()
			.subscribe(userId => {
				this.logger.debug('GameComponent', 'Saving score for user', userId)
			})
	}

	private createQuestionFormControl(question: GameQuestion, index: number) {
		const formControl = this.fb.control(null, Validators.required);
		formControl.valueChanges
			.pipe(
				first(x => !!x),
				map(v => this.domSanitizer.sanitize(SecurityContext.HTML, v))
			)
			.subscribe(v => {
				this.answerCount++;
				this.correctFeedbackList[index] = v === question.correct_answer;
				this.score += this.correctFeedbackList[index]
					? this.gameService.getRightAnswerScore(question)
					: 0;
				if (environment.production)
					formControl.disable();
				this.cdr.markForCheck();
			});

		return formControl;
	}

}
