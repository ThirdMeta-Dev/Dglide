"use client";

import type { FunctionComponent, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BookDemoArrow: FunctionComponent = () => (
  <svg
    className="sol-btn-book-demo-arrow"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M1.5 11.5L11.5 1.5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11.5 1.5H4.5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11.5 1.5V8.5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

type SolutionsButtonProps = {
  children: ReactNode;
  variant?:
    | "primary"
    | "outline"
    | "white"
    | "book-demo"
    | "get-started-now"
    | "workflow-cta";
  onClick?: () => void;
  className?: string;
};

const SolutionsButton: FunctionComponent<SolutionsButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}) => {
  const classes = {
    primary: "sol-btn-primary",
    outline: "sol-btn-outline",
    white: "sol-btn-get-started",
    "book-demo": "sol-btn-book-demo",
    "get-started-now": "sol-btn-get-started-now",
    "workflow-cta": "sol-btn-workflow-cta",
  };

  const usesFigmaArrow =
    variant === "book-demo" ||
    variant === "get-started-now" ||
    variant === "workflow-cta";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`${classes[variant]} ${className}`}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
      {usesFigmaArrow ? (
        <BookDemoArrow />
      ) : (
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      )}
    </motion.button>
  );
};

export default SolutionsButton;
