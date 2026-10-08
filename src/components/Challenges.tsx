import { useContext, useState } from 'react';

import { ChallengesContext } from '../store/challenges-context';
import ChallengeItem from './ChallengeItem';
import ChallengeTabs from './ChallengeTabs';
import type { ChallengeStatus } from '../types/challenge';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState<ChallengeStatus>('active');
  const [expanded, setExpanded] = useState<string | null>(null);

  function handleSelectType(newType: ChallengeStatus) {
    setSelectedType(newType);
  }

  function handleViewDetails(id: string) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge : any) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge : any) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge : any) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {displayedChallenges.length > 0 && (
          <ol className="challenge-items">
            {displayedChallenges.map((challenge) => (
              <ChallengeItem
                key={challenge.id}
                challenge={challenge}
                onViewDetails={() => handleViewDetails(challenge.id)}
                isExpanded={expanded === challenge.id}
              />
            ))}
          </ol>
        )}
        {displayedChallenges.length === 0 && <p>No challenges found.</p>}
      </ChallengeTabs>
    </div>
  );
}