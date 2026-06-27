"use client";

import {
  Children,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

// ─── Core easing & transition ────────────────────────────────────────────────

export const motionEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const revealTransition = {
  duration: 0.65,
  ease: motionEase,
};

// ─── Legacy stagger variants (kept for MotionStagger / MotionItem) ────────────

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

// ─── ScrollReveal ─────────────────────────────────────────────────────────────
// Directional entrance animation for any element.
// Respects prefers-reduced-motion by collapsing to a plain fade.

export type RevealDirection = "up" | "down" | "left" | "right" | "fade";

function hiddenState(dir: RevealDirection, distance: number) {
  switch (dir) {
    case "up":    return { opacity: 0, y: distance, x: 0 };
    case "down":  return { opacity: 0, y: -distance, x: 0 };
    case "left":  return { opacity: 0, x: -distance, y: 0 };
    case "right": return { opacity: 0, x: distance, y: 0 };
    case "fade":  return { opacity: 0, x: 0, y: 0 };
  }
}

function visibleState(dir: RevealDirection) {
  switch (dir) {
    case "left":
    case "right": return { opacity: 1, x: 0, y: 0 };
    case "up":
    case "down":  return { opacity: 1, y: 0, x: 0 };
    case "fade":  return { opacity: 1, x: 0, y: 0 };
  }
}

type ScrollRevealProps = {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
  style?: CSSProperties;
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  distance = 32,
  once = true,
  amount = 0.25,
  className,
  style,
}: ScrollRevealProps) {
  const shouldReduce = useReducedMotion();

  const initial = shouldReduce ? { opacity: 0, x: 0, y: 0 } : hiddenState(direction, distance);
  const visible = shouldReduce ? { opacity: 1, x: 0, y: 0 } : visibleState(direction);

  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={visible}
      viewport={{ once, amount }}
      transition={{
        duration: shouldReduce ? 0.2 : duration,
        ease: motionEase,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerReveal ────────────────────────────────────────────────────────────
// Wraps a group of StaggerItem children; fires cascade when entering viewport.

type StaggerRevealProps = {
  children: ReactNode;
  stagger?: number;
  delayStart?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  amount?: number | "some" | "all";
};

export function StaggerReveal({
  children,
  stagger = 0.1,
  delayStart = 0,
  className,
  style,
  once = true,
  amount = 0.2,
}: StaggerRevealProps) {
  const shouldReduce = useReducedMotion();

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : stagger,
        delayChildren: delayStart,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ──────────────────────────────────────────────────────────────
// Direct child of StaggerReveal. Inherits timing from parent.

type StaggerItemProps = {
  children: ReactNode;
  direction?: RevealDirection;
  distance?: number;
  className?: string;
  style?: CSSProperties;
};

export function StaggerItem({
  children,
  direction = "up",
  distance = 28,
  className,
  style,
}: StaggerItemProps) {
  const shouldReduce = useReducedMotion();

  const variants: Variants = {
    hidden: shouldReduce ? { opacity: 0, x: 0, y: 0 } : hiddenState(direction, distance),
    visible: shouldReduce
      ? { opacity: 1, x: 0, y: 0, transition: { duration: 0.15 } }
      : { ...(direction === "left" || direction === "right" ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, y: 0, x: 0 }), transition: revealTransition },
  };

  return (
    <motion.div className={className} style={style} variants={variants}>
      {children}
    </motion.div>
  );
}

// ─── Legacy: MotionReveal ─────────────────────────────────────────────────────
// Kept for AnimatedPublicPage compatibility. Respects reduced motion.

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
  const shouldReduce = useReducedMotion();

  if (hero) {
    return (
      <motion.div
        className={`w-full ${className}`}
        initial={{ opacity: 0, y: shouldReduce ? 0 : -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0.2 : 0.7, ease: motionEase, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: shouldReduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedPublicPage ───────────────────────────────────────────────────────
// Page-level wrapper. Wraps every direct child section with MotionReveal.
// staticFirstCount: how many children to leave un-animated (e.g. hero).
// The first animated child uses hero=true (animate-on-mount) not whileInView.

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

// ─── Legacy: MotionStagger / MotionItem ───────────────────────────────────────
// Kept for existing usages (ContactPageSections etc.)

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
      viewport={{ once: true, amount: 0.15 }}
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

// ─── MotionButtonShell ────────────────────────────────────────────────────────

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

// ─── ScrollWordReveal ─────────────────────────────────────────────────────────

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
          {index < words.length - 1 ? " " : ""}
        </RevealWord>
      ))}
    </span>
  );
}
