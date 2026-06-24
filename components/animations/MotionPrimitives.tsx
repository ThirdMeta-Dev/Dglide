"use client";

import {
  Children,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export const revealTransition = {
  duration: 0.65,
  ease: motionEase,
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hero?: boolean;
  y?: number;
};

export function MotionReveal({
  children,
  className = "",
  delay = 0,
  hero = false,
  y = 28,
}: MotionRevealProps) {
  if (hero) {
    return (
      <motion.div
        className={`w-full ${className}`}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: motionEase, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

type AnimatedPublicPageProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  staticFirstCount?: number;
};

export function AnimatedPublicPage({
  children,
  className = "",
  style,
  staticFirstCount = 0,
}: AnimatedPublicPageProps) {
  const items = Children.toArray(children);

  return (
    <div className={className} style={style}>
      {items.map((child, index) => {
        if (index < staticFirstCount) return child;

        return (
          <MotionReveal key={index} hero={index === staticFirstCount}>
            {child}
          </MotionReveal>
        );
      })}
    </div>
  );
}

export function MotionStagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function MotionButtonShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
    </motion.span>
  );
}

function RevealWord({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1.2 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

export function ScrollWordReveal({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.15"],
  });
  const words = text.split(" ");

  return (
    <span ref={containerRef} className={className} style={style}>
      {words.map((word, index) => (
        <RevealWord
          key={`${word}-${index}`}
          index={index}
          total={words.length}
          progress={scrollYProgress}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </RevealWord>
      ))}
    </span>
  );
}
