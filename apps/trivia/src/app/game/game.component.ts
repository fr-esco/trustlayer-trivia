import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'tlt-trivia-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
