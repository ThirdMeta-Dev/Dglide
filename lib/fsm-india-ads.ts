export const FSM_INDIA_ADS_PATH = "/field-service-management-fsm-india";
export const FSM_INDIA_LEAD_MODAL_TRIGGER_ID = "fsm-india-lead-modal-trigger";
export const FSM_INDIA_BROCHURE_MODAL_TRIGGER_ID = "fsm-india-brochure-modal-trigger";
export const FSM_HVAC_BROCHURE_PATH = "/brochures/dglide-fsm-hvac-brochure.pdf";

export type FsmIndiaLeadIntent = "demo" | "brochure";

export function isFsmIndiaAdsPath(pathname: string) {
  return pathname.replace(/\/+$/, "") === FSM_INDIA_ADS_PATH;
}

export function openFsmIndiaLeadModal(intent: FsmIndiaLeadIntent = "demo") {
  if (typeof window === "undefined") return;
  document
    .getElementById(
      intent === "brochure"
        ? FSM_INDIA_BROCHURE_MODAL_TRIGGER_ID
        : FSM_INDIA_LEAD_MODAL_TRIGGER_ID
    )
    ?.click();
}
