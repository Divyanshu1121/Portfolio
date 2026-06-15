// Shared Framer Motion animation variants for DivyanshuOS

export const windowVariants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
      duration: 0.2,
    },
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: 'easeIn',
    },
  },
};

export const minimizeVariants = {
  visible: {
    scaleY: 1,
    opacity: 1,
    y: 0,
  },
  minimized: {
    scaleY: 0.1,
    opacity: 0,
    y: 400,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const dockSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
};

export const notificationVariants = {
  initial: { opacity: 0, x: 100, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export const spotlightOverlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export const spotlightModal = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.12 },
  },
};

export const progressBarVariant = (level: number) => ({
  hidden: { width: 0 },
  visible: {
    width: `${level}%`,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
});

// Count-up animation helper
export function animateValue(
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void,
) {
  const startTime = performance.now();
  const diff = end - start;

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + diff * eased;
    onUpdate(value);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      onComplete?.();
    }
  }

  requestAnimationFrame(update);
}
