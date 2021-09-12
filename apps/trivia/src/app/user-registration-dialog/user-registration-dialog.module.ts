import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SpinnerButtonModule } from '@tlt-trivia/spinner-button';

import { UserRegistrationDialogComponent } from './user-registration-dialog.component';

@NgModule({
	declarations: [
		UserRegistrationDialogComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		SpinnerButtonModule,
	],
	exports: [
		MatDialogModule,
	]
})
export class UserRegistrationDialogModule { }
