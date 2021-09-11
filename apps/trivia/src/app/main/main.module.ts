import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppNavModule } from '../app-nav/app-nav.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

const routes: Routes = [
	{ path: '', component: MainComponent }
];

@NgModule({
	declarations: [
		MainComponent,
	],
	imports: [
		CommonModule,
		MainRoutingModule,
		RouterModule.forChild(routes),
		AppNavModule,
	]
})
export class MainModule { }
