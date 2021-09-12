import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormControlAtPipe } from './form-control-at.pipe';

@NgModule({
	declarations: [
		FormControlAtPipe
	],
	imports: [
		CommonModule
	],
	exports: [
		FormControlAtPipe
	]
})
export class FormControlAtPipeModule { }
