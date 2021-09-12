import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { addDoc, collection, doc, Firestore, query } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { where } from '@firebase/firestore';
import { NGXLogger } from 'ngx-logger';
import { fromRef } from 'rxfire/firestore';
import { from, of } from 'rxjs';
import { finalize, first, map, switchMap, tap } from 'rxjs/operators';

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
		private readonly dialogRef: MatDialogRef<UserRegistrationDialogComponent, string>,
		private readonly fb: FormBuilder,
		private readonly firestore: Firestore,
		private readonly logger: NGXLogger,
	) { }

	registerUser() {
		this.loading = true;
		const username: string = this.form.value.username;
		const password: string = this.form.value.password;

		const usersCollection = collection(this.firestore, 'users');
		const usersQuery = query(usersCollection, where('username', '==', username));
		fromRef(usersQuery).pipe(
			first(),
			switchMap(result => {
				if (result.empty) {
					this.logger.info('UserRegistrationDialogComponent', 'User not found', username);

					return from(addDoc(usersCollection, {
						username,
						// NOTE should be encrypted server-side
						password,
					})).pipe(
						map(doc => doc.id),
						tap(userId => this.logger.info('UserRegistrationDialogComponent', 'User created', userId))
					)
				}

				const user = result.docs[0];
				// NOTE password should be checked server-side

				return of(user.id);
			}),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			}),
		).subscribe(userId => {
			this.logger.info('UserRegistrationDialogComponent', 'User identified', userId);
			this.dialogRef.close(userId);
		});

	}
}
