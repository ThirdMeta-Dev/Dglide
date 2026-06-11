import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function scrollToContact(router: AppRouterInstance) {
  router.push("/schedule-demo");
}
