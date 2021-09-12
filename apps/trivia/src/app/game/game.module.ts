import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormControlAtPipeModule } from '../shared/form-control-at-pipe/form-control-at-pipe.module';
import { SafePipeModule } from '../shared/safe-pipe/safe-pipe.module';
import { FullAnswerListPipe } from './full-answer-list.pipe';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { GameService } from './game.service';

@NgModule({
	declarations: [
		GameComponent,
		FullAnswerListPipe
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatRadioModule,
		MatStepperModule,
		MatToolbarModule,
		FormControlAtPipeModule,
		SafePipeModule,
		GameRoutingModule
	],
	providers: [
		GameService,
	]
})
export class GameModule { }
