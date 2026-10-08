export interface ChallengeImage {
  src: string;
  alt: string;
}

export type ChallengeStatus = 'active' | 'completed' | 'failed';

export interface NewChallengeData {
  title: string;
  description: string;
  deadline: string;
  image: ChallengeImage;
}

export interface Challenge extends NewChallengeData {
  id: string;
  status: ChallengeStatus;
}