import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { map, tap } from 'rxjs/operators';

import { ScoreService } from '../core/score.service';

@Component({
	selector: 'tlt-trivia-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit {
	displayedColumns?: string[];
	readonly stats$ = this.scoreService.leaderboard$.pipe(
		map(leaderboard => leaderboard.stats || []),
		tap(stats => this.displayedColumns = stats.length ? ['position', 'userDisplayName', 'score', 'createdAt'] : undefined)
	);

	constructor(
		private readonly logger: NGXLogger,
		private readonly scoreService: ScoreService,
	) { }

	ngOnInit(): void {
		this.logger.debug('LeaderboardComponent::ngOnInit');
	}

}
