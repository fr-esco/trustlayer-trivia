import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs/operators';

import { User } from '../core/user.model';
import { UserService } from '../core/user.service';

@Component({
	selector: 'tlt-trivia-user-registration-dialog',
	templateUrl: './user-registration-dialog.component.html',
	styleUrls: ['./user-registration-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRegistrationDialogComponent {
	readonly form = this.fb.group({
		username: [null, Validators.required],
		password: [null, Validators.required],
	});
	loading = false;

	constructor(
		private readonly cdr: ChangeDetectorRef,
		private readonly dialogRef: MatDialogRef<UserRegistrationDialogComponent, {
			userId: string;
			userDisplayName: User['username'];
		}>,
		private readonly fb: FormBuilder,
		private readonly logger: NGXLogger,
		private readonly userService: UserService,
		private readonly zone: NgZone,
	) { }

	registerUser() {
		this.loading = true;
		const username: User['username'] = this.form.value.username;
		const password: User['password'] = this.form.value.password;

		this.userService.registerUser$({ username, password }).pipe(
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			}),
		).subscribe(userId => {
			this.logger.info('UserRegistrationDialogComponent', 'User identified', userId);
			this.zone.run(() => this.dialogRef.close({ userId, userDisplayName: username }));
		});

	}
}
