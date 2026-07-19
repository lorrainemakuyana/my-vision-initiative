import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * A small, opinionated motion toolkit for the site.
 *
 * Three rules run through all of it:
 *
 *  - Only `opacity` and `transform` are animated. Both are GPU-composited and
 *    cheap on the low-end phones that make up most of the audience; animating
 *    layout properties (height, top, margin) is what makes pages jank.
 *
 *  - Everything is gated behind `useReducedMotion()`. A visitor who has asked
 *    their OS to reduce motion gets the final state immediately, with no
 *    movement — an accessibility expectation, not a nicety.
 *
 *  - Nothing is hidden until the browser can un-hide it. The animation only
 *    engages after mount (`useMounted`), so the server-rendered HTML and the
 *    first paint show fully-visible content. Without this, framer-motion emits
 *    `opacity:0` into the SSR markup and every wrapped section stays blank
 *    until JS hydrates — a real failure on a slow or flaky connection. The
 *    cost is that above-the-fold sections simply appear on first load instead
 *    of animating in; sections scrolled to later still reveal normally.
 *
 * Movement is deliberately small (a few px) and short (~0.5s). Restraint reads
 * as considered; big bouncy motion reads as amateur.
 */

const EASE = [0.22, 1, 0.36, 1] as const; // gentle ease-out

function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

/** Fade + rise a section into view once, the first time it is scrolled to. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}) {
  const reduce = useReducedMotion();
  const mounted = useMounted();

  if (reduce || !mounted) {
    const Plain = as === "section" ? "section" : "div";
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = as === "section" ? motion.section : motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/**
 * Wraps a grid/list so its children cascade in one after another as the group
 * scrolls into view. Pair with <StaggerItem> around each child.
 */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mounted = useMounted();

  if (reduce || !mounted) return <div className={className}>{children}</div>;

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

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mounted = useMounted();

  if (reduce || !mounted) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
