import { FunctionComponent } from "react";
import SolutionsFinalCTA from "@/components/solutions/sections/SolutionsFinalCTA";
import {
  platformFinalCtaEyebrow,
  platformFinalCtaHeading,
} from "@/data/platformPageData";

const PlatformFinalCTA: FunctionComponent = () => (
  <SolutionsFinalCTA
    eyebrow={platformFinalCtaEyebrow}
    heading={platformFinalCtaHeading}
    buttonLabel="See It Live!"
  />
);

export default PlatformFinalCTA;
