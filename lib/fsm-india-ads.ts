export const FSM_INDIA_ADS_PATH = "/field-service-management-fsm-india";
export const FSM_INDIA_LEAD_MODAL_EVENT = "dglide:open-fsm-india-lead-modal";

export function isFsmIndiaAdsPath(pathname: string) {
  return pathname.replace(/\/+$/, "") === FSM_INDIA_ADS_PATH;
}

export function openFsmIndiaLeadModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(FSM_INDIA_LEAD_MODAL_EVENT));
}
