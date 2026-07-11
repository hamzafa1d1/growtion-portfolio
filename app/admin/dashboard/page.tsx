import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { getAssets } from "@/lib/assets";
import { getPricing } from "@/lib/pricing";
import { DashboardClient } from "./DashboardClient";

// Admin data must always reflect the latest saved state, never a cached build.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const isAuth = await requireAuth();
  if (!isAuth) redirect("/admin");

  const [assets, pricing] = await Promise.all([getAssets(), getPricing()]);

  return <DashboardClient initialAssets={assets} initialPricing={pricing} />;
}
