import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';


@NgModule({
	declarations: [
		GameComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatToolbarModule,
		GameRoutingModule
	]
})
export class GameModule { }
