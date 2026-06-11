import type { FunctionComponent, ReactNode } from "react";

type SolutionsContainerProps = {
  children: ReactNode;
  className?: string;
};

const SolutionsContainer: FunctionComponent<SolutionsContainerProps> = ({
  children,
  className = "",
}) => (
  <div className={`sol-container ${className}`}>{children}</div>
);

export default SolutionsContainer;
