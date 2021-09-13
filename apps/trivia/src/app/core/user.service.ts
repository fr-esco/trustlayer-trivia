import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, fromRef, query, where } from '@angular/fire/firestore';
import { NGXLogger } from 'ngx-logger';
import { from, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private readonly firestore: Firestore,
		private readonly logger: NGXLogger,
	) { }

	registerUser$({ username, password }: User) {
		const usersCollection = collection(this.firestore, 'users');
		const usersQuery = query(usersCollection, where('username', '==', username));

		return fromRef(usersQuery).pipe(
			first(),
			switchMap(result => {
				if (result.empty) {
					this.logger.info('UserService', 'User not found', username);

					return from(addDoc(usersCollection, {
						username,
						// NOTE should be encrypted server-side
						password,
					})).pipe(
						map(doc => doc.id),
						tap(userId => this.logger.info('UserService', 'User created', userId))
					)
				}

				const user = result.docs[0];
				// NOTE password should be checked server-side

				return of(user.id);
			}),
		);

	}
}
