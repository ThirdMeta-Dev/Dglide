import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { isFsmIndiaAdsPath, openFsmIndiaLeadModal } from "@/lib/fsm-india-ads";

export function scrollToContact(router: AppRouterInstance) {
  if (typeof window !== "undefined") {
    const hasLeadModal = document.getElementById("fsm-india-lead-modal-trigger");
    if (isFsmIndiaAdsPath(window.location.pathname) || hasLeadModal) {
      openFsmIndiaLeadModal();
      return;
    }
  }

  router.push("/schedule-demo");
}
