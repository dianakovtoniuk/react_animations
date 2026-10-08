import { useContext, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context';
import Modal from './Modal';
import images from '../assets/images';
import type { ChallengeImage } from '../types/challenge';

interface NewChallengeProps {
  onDone: () => void;
}

export default function NewChallenge({ onDone }: NewChallengeProps) {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const deadline = useRef<HTMLInputElement>(null);

  const [scope, animate] = useAnimate<HTMLFormElement>();

  const [selectedImage, setSelectedImage] = useState<ChallengeImage | null>(
    null
  );
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image: ChallengeImage) {
    setSelectedImage(image);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredTitle = title.current?.value ?? '';
    const enteredDescription = description.current?.value ?? '';
    const enteredDeadline = deadline.current?.value ?? '';

    if (
      !enteredTitle.trim() ||
      !enteredDescription.trim() ||
      !enteredDeadline.trim() ||
      !selectedImage
    ) {
      animate(
        'input, textarea',
        { x: [-10, 0, 10, 0] },
        /** FIX FOR NEWER FRAMER MOTION -- no 'spring' transition  */
        { type: 'tween', ease: 'linear', duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    onDone();
    addChallenge({
      title: enteredTitle,
      description: enteredDescription,
      deadline: enteredDeadline,
      image: selectedImage,
    });
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}