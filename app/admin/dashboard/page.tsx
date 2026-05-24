import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import { getAssets } from "@/lib/assets";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const isAuth = await requireAuth();
  if (!isAuth) redirect("/admin");

  const assets = await getAssets();

  return <DashboardClient initialAssets={assets} />;
}
