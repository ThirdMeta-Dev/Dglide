import type { FunctionComponent, ReactNode } from "react";

type PlatformContainerProps = {
  children: ReactNode;
  className?: string;
};

const PlatformContainer: FunctionComponent<PlatformContainerProps> = ({
  children,
  className = "",
}) => <div className={`plat-container ${className}`}>{children}</div>;

export default PlatformContainer;
