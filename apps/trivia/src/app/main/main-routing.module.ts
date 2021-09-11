import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
	{
		path: '', component: MainComponent, children: [
			{ path: 'play', loadChildren: () => import('../game/game.module').then(m => m.GameModule) },
			{ path: 'leaderboard', loadChildren: () => import('../leaderboard/leaderboard.module').then(m => m.LeaderboardModule) },
			{ path: '', redirectTo: 'play', pathMatch: 'full' },
			{ path: '**', redirectTo: 'play', pathMatch: 'full' }
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
