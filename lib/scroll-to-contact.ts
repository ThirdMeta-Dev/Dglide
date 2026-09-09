import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { isFsmIndiaAdsPath, openFsmIndiaLeadModal } from "@/lib/fsm-india-ads";

export function scrollToContact(router: AppRouterInstance) {
  if (typeof window !== "undefined" && isFsmIndiaAdsPath(window.location.pathname)) {
    openFsmIndiaLeadModal();
    return;
  }

  router.push("/schedule-demo");
}
