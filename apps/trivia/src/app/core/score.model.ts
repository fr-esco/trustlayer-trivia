import { Timestamp } from '@angular/fire/firestore';

import { User } from './user.model';

export interface Score {
	score: number;
	createdAt: Timestamp;
	userId: string;
}

export interface LeaderboardStat extends Score {
	userDisplayName: User['username'];
}

export interface Leaderboard {
	stats: LeaderboardStat[];
}
