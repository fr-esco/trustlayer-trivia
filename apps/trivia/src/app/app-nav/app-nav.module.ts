import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { AppNavComponent } from './app-nav.component';

@NgModule({
	declarations: [AppNavComponent],
	exports: [AppNavComponent],
	imports: [
		CommonModule,
		RouterModule,
		LayoutModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatSidenavModule,
		MatToolbarModule,
	]
})
export class AppNavModule { }
