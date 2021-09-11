import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot([
			{
				path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule),
			},
			{ path: '', redirectTo: 'main', pathMatch: 'full' },
			{ path: '**', redirectTo: 'main', pathMatch: 'full' }
		], { initialNavigation: 'enabledBlocking' }),
		LoggerModule.forRoot({
			enableSourceMaps: !environment.production,
			level: environment.production ? NgxLoggerLevel.INFO : NgxLoggerLevel.DEBUG,
			serverLogLevel: NgxLoggerLevel.OFF,
		}),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
