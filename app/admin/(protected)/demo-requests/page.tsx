import { createClient } from "@/lib/supabase/server";
import DemoRequestsClient from "./DemoRequestsClient";

export default async function DemoRequestsPage() {
  const supabase = await createClient();
  const { data: requests, error } = await supabase
    .from("dglide_demo_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return <DemoRequestsClient initialData={requests ?? []} error={error?.message} />;
}
