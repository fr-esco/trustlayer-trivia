import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'tlt-trivia-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
