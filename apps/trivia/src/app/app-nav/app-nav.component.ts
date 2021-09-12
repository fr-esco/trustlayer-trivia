import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { APP_THEME, ThemeService } from '../core/theme.service';

@Component({
	selector: 'tlt-trivia-app-nav',
	templateUrl: './app-nav.component.html',
	styleUrls: ['./app-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavComponent {
	#isHandset = false;

	readonly isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			tap(result => this.#isHandset = result),
			shareReplay()
		);

	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		private readonly themeService: ThemeService,
	) { }

	changeTheme(theme: APP_THEME) {
		this.themeService.appTheme = theme;
	}

	closeOnClick(drawer: MatSidenav) {
		if (this.#isHandset) {
			drawer.close();
		}
	}

}
