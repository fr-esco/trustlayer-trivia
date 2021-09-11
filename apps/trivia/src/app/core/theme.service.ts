import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

export type APP_THEME = 'dark' | 'light' | null

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	readonly #appTheme$ = new BehaviorSubject<APP_THEME>(this.appTheme)

	// https://developer.mozilla.org/en-US/trivia/Web/CSS/@media/prefers-color-scheme
	readonly #osDark$ = this.breakpointObserver
		.observe('(prefers-color-scheme: dark)')
		.pipe(
			map(result => result.matches),
		)

	readonly appTheme$ = this.#appTheme$.asObservable().pipe(
		switchMap(appTheme => appTheme ? of(appTheme) : this.#osDark$.pipe(
			map(osDark => osDark ? 'dark' : null)
		)),
		shareReplay(1)
	)

	get appTheme() {
		if (isPlatformBrowser(this.platformId)) {
			// if (localStorage.theme === 'dark')
			// 	return 'dark'
			// else if (!('theme' in localStorage))
			// 	return null
			return localStorage.getItem('theme') as APP_THEME
		}

		return null
	}

	set appTheme(theme) {
		if (isPlatformBrowser(this.platformId)) {
			if (theme)
				localStorage.setItem('theme', theme)
			else
				localStorage.removeItem('theme')
		}

		this.#appTheme$.next(this.appTheme)
	}

	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		@Inject(DOCUMENT) private readonly documentRef: Document,
		private readonly logger: NGXLogger,
		private readonly overlay: OverlayContainer,
		// eslint-disable-next-line @typescript-eslint/ban-types
		@Inject(PLATFORM_ID) private readonly platformId: Object,
	) {
		const darkClassName = 'dark'; // TODO configurable

		this.appTheme$.subscribe(theme => {
			this.logger.info('Theme changed', { theme })
			if (theme === 'dark') {
				this.documentRef.documentElement.classList.add(darkClassName)
				this.overlay.getContainerElement().classList.add(darkClassName)
			} else {
				this.documentRef.documentElement.classList.remove(darkClassName)
				this.overlay.getContainerElement().classList.remove(darkClassName)
			}
		})
	}
}
