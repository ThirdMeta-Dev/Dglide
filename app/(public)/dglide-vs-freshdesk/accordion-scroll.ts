type AccordionScrollInput = {
  currentScrollY: number;
  targetGroupTop: number;
  stickyTop: number;
  collapsingContentHeight: number;
  precedingTriggerHeight?: number;
};

export function calculateAccordionScrollTarget({
  currentScrollY,
  targetGroupTop,
  stickyTop,
  collapsingContentHeight,
  precedingTriggerHeight = 0,
}: AccordionScrollInput) {
  return Math.max(
    0,
    currentScrollY
      + targetGroupTop
      - stickyTop
      - Math.max(0, collapsingContentHeight)
      - Math.max(0, precedingTriggerHeight)
  );
}
