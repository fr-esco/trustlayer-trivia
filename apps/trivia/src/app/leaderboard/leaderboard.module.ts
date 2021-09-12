import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardComponent } from './leaderboard.component';


@NgModule({
	declarations: [
		LeaderboardComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatTableModule,
		MatToolbarModule,
		LeaderboardRoutingModule
	]
})
export class LeaderboardModule { }
