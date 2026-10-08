import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import Badge from './Badge';
import type { Challenge, ChallengeStatus } from '../types/challenge';

interface TabProps {
  isSelected: boolean;
  onSelect: () => void;
  badgeCaption: number;
  children: ReactNode;
}

function Tab({ isSelected, onSelect, badgeCaption, children }: TabProps) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {isSelected && (
        <motion.div layoutId="tab-indicator" className="active-tab-indicator" />
      )}
    </li>
  );
}

interface ChallengeTabsProps {
  selectedType: ChallengeStatus;
  onSelectType: (type: ChallengeStatus) => void;
  challenges: Record<ChallengeStatus, Challenge[]>;
  children: ReactNode;
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}: ChallengeTabsProps) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}