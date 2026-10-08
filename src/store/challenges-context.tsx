import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type {
  Challenge,
  ChallengeStatus,
  NewChallengeData,
} from '../types/challenge';

interface ChallengesContextType {
  challenges: Challenge[];
  addChallenge: (challenge: NewChallengeData) => void;
  deleteChallenge: (challengeId: string) => void;
  updateChallengeStatus: (
    challengeId: string,
    newStatus: ChallengeStatus
  ) => void;
}

export const ChallengesContext = createContext<ChallengesContextType>({
  challenges: [],
  addChallenge: () => {},
  deleteChallenge: () => {},
  updateChallengeStatus: () => {},
});

interface ChallengesContextProviderProps {
  children: ReactNode;
}

export default function ChallengesContextProvider({
  children,
}: ChallengesContextProviderProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  function addChallenge(challenge: NewChallengeData) {
    setChallenges((prevChallenges) => [
      { ...challenge, id: Math.random().toString(), status: 'active' },
      ...prevChallenges,
    ]);
  }

  function deleteChallenge(challengeId: string) {
    setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  }

  function updateChallengeStatus(
    challengeId: string,
    newStatus: ChallengeStatus
  ) {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  }

  const challengesContext = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}