import type { FunctionComponent } from "react";
import { ArrowRight } from "lucide-react";

type SolutionsIconProps = {
  variant?: "square" | "circle";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = { sm: 32, md: 40, lg: 48 };

const SolutionsIcon: FunctionComponent<SolutionsIconProps> = ({
  variant = "square",
  size = "md",
  className = "",
}) => {
  const px = sizes[size];
  const radius = variant === "square" ? 8 : px / 2;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 40 40"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <rect width="40" height="40" rx={radius} fill="#F58220" />
      <circle cx="20" cy="20" r="11" stroke="white" strokeWidth="2" fill="none" />
      <path d="M20 20 L20 9 A11 11 0 0 1 31 20 Z" fill="white" />
    </svg>
  );
};

export default SolutionsIcon;
