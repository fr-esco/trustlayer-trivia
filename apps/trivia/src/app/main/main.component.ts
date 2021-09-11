import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
	selector: 'tlt-trivia-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

	constructor(
		private readonly logger: NGXLogger,
	) { }

	ngOnInit(): void {
		this.logger.debug('MainComponent::ngOnInit');
	}

}
