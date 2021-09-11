import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';

@NgModule({
	imports: [CommonModule, MatProgressSpinnerModule],
	declarations: [
		SpinnerButtonComponent
	],
	exports: [
		SpinnerButtonComponent
	],
})
export class SpinnerButtonModule { }
