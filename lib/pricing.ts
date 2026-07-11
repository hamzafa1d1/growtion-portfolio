import { list } from "@vercel/blob";

export interface PricingPackage {
  label: string;
  price: number;
}

export interface PricingPlan {
  category: string;
  packages: PricingPackage[];
  features: string[];
  msg: string; // pre-filled WhatsApp message for this plan
}

export interface PricingConfig {
  eyebrow: string; // small uppercase line above the title
  title: string;
  currencyLabel: string; // e.g. "DT"
  currencyNote: string; // e.g. "Prix en DT (Dinar Tunisien)"
  whatsappNumber: string; // digits only, e.g. "21656614879"
  plans: PricingPlan[];
}

/** Blob pathname where the editable pricing config is stored. */
export const PRICING_PATHNAME = "config/pricing.json";

/**
 * The built-in pricing shown until an admin saves a custom config (and the
 * fallback if the stored config is missing or unreadable).
 */
export const DEFAULT_PRICING: PricingConfig = {
  eyebrow: "Transparent & simple",
  title: "NOS TARIFS",
  currencyLabel: "DT",
  currencyNote: "Prix en DT (Dinar Tunisien)",
  whatsappNumber: "21656614879",
  plans: [
    {
      category: "Vidéos Publicitaires",
      packages: [
        { label: "1 vidéo + 1 hook gratuit", price: 79 },
        { label: "3 vidéos + 3 hooks gratuits", price: 199 },
        { label: "5 vidéos + 5 hooks gratuits", price: 299 },
      ],
      features: ["Script optimisé", "Hook accrocheur", "Montage pro", "Révisions incluses"],
      msg: "Bonjour! Je suis intéressé(e) par vos Vidéos Publicitaires.",
    },
    {
      category: "Vidéos UGC",
      packages: [
        { label: "1 vidéo UGC", price: 199 },
        { label: "2 vidéos UGC", price: 350 },
      ],
      features: ["Créateur authentique", "Casting inclus", "Haute conversion", "Format Reels/TikTok"],
      msg: "Bonjour! Je suis intéressé(e) par vos Vidéos UGC.",
    },
    {
      category: "Tournage",
      packages: [
        { label: "1 vidéo tournée", price: 350 },
        { label: "3 vidéos tournées", price: 900 },
        { label: "5 vidéos tournées", price: 1250 },
      ],
      features: ["Tournage professionnel", "Éclairage & cadrage", "Direction créative", "Montage inclus"],
      msg: "Bonjour! Je suis intéressé(e) par votre service Tournage.",
    },
  ],
};

/** Coerces arbitrary parsed JSON into a valid PricingConfig, filling defaults. */
export function normalizePricing(input: unknown): PricingConfig {
  if (!input || typeof input !== "object") return DEFAULT_PRICING;
  const data = input as Partial<PricingConfig>;

  const plans = Array.isArray(data.plans)
    ? data.plans
        .map((p): PricingPlan | null => {
          if (!p || typeof p !== "object") return null;
          const plan = p as Partial<PricingPlan>;
          return {
            category: typeof plan.category === "string" ? plan.category : "",
            packages: Array.isArray(plan.packages)
              ? plan.packages
                  .map((pkg): PricingPackage | null => {
                    if (!pkg || typeof pkg !== "object") return null;
                    const label = typeof pkg.label === "string" ? pkg.label : "";
                    const price = Number(pkg.price);
                    return { label, price: Number.isFinite(price) ? price : 0 };
                  })
                  .filter((x): x is PricingPackage => x !== null)
              : [],
            features: Array.isArray(plan.features)
              ? plan.features.filter((f): f is string => typeof f === "string")
              : [],
            msg: typeof plan.msg === "string" ? plan.msg : "",
          };
        })
        .filter((x): x is PricingPlan => x !== null)
    : DEFAULT_PRICING.plans;

  return {
    eyebrow: typeof data.eyebrow === "string" ? data.eyebrow : DEFAULT_PRICING.eyebrow,
    title: typeof data.title === "string" ? data.title : DEFAULT_PRICING.title,
    currencyLabel:
      typeof data.currencyLabel === "string" ? data.currencyLabel : DEFAULT_PRICING.currencyLabel,
    currencyNote:
      typeof data.currencyNote === "string" ? data.currencyNote : DEFAULT_PRICING.currencyNote,
    whatsappNumber:
      typeof data.whatsappNumber === "string"
        ? data.whatsappNumber.replace(/[^\d]/g, "")
        : DEFAULT_PRICING.whatsappNumber,
    plans: plans.length > 0 ? plans : DEFAULT_PRICING.plans,
  };
}

/**
 * Loads the pricing config from Vercel Blob, falling back to DEFAULT_PRICING
 * when storage is not configured (local dev) or nothing has been saved yet.
 */
export async function getPricing(): Promise<PricingConfig> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULT_PRICING;

  try {
    const { blobs } = await list({
      prefix: PRICING_PATHNAME,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const match = blobs.find((b) => b.pathname === PRICING_PATHNAME);
    if (!match) return DEFAULT_PRICING;

    // no-store so a save is reflected on the next page revalidation rather than
    // being masked by fetch-level caching.
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return DEFAULT_PRICING;
    return normalizePricing(await res.json());
  } catch {
    return DEFAULT_PRICING;
  }
}
