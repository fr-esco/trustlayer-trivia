import { Timestamp } from '@angular/fire/firestore';

export interface Score {
	score: number;
	createdAt: Timestamp;
	userId: string;
}

export interface LeaderboardStat extends Score {
	userDisplayName: string;
}

export interface Leaderboard {
	stats: LeaderboardStat[];
}
