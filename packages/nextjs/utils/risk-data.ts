import protocolsJson from "~~/public/data/protocols.json";
import providersJson from "~~/public/data/providers.json";
import riskDataJson from "~~/public/data/risk-data.json";

export type CoverageStatus = "covered" | "partial" | "not-covered" | "needs-verification" | "source-unavailable";

export type ProvenanceTag = "official-documentation" | "onchain" | "community" | "unverified";

export type Governance = {
  forum: string | null;
  snapshot: string | null;
  tally: string | null;
  multisig: string | null;
  upgradeability: string | null;
  emergencyControls: string | null;
  provenanceTag: string;
};

export type Protocol = {
  slug: string;
  name: string;
  category: string;
  description: string;
  website: string;
  github: string;
  tvl: number | null;
  governance: Governance;
};

export type Provider = {
  slug: string;
  name: string;
  website: string;
  description: string;
  methodology: string;
  dataAvailability: string;
  coverageNotes: string;
};

export type RiskEntry = {
  protocolSlug: string;
  providerSlug: string;
  status: CoverageStatus;
  rating: string | null;
  ratingLabel: string | null;
  sourceUrl: string | null;
  lastUpdated: string | null;
  retrievedAt: string;
  notes: string | null;
};

export const protocols = protocolsJson as Protocol[];
export const providers = providersJson as Provider[];
export const riskData = riskDataJson as RiskEntry[];

// Providers shown in the dashboard matrix (kept narrow so the grid fits on screen).
export const MATRIX_PROVIDER_SLUGS = [
  "defiscan",
  "blockanalitica",
  "llamarisk",
  "defi-saver",
  "credora",
  "xerberus",
  "pharos",
];

// Top-level category buckets used by the dashboard category filter.
export const CATEGORY_FILTERS = ["All", "Lending", "DEX", "Staking", "Yield"] as const;
export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export const STATUS_FILTERS = ["All", "Covered", "Partial", "Needs Verification", "Not Covered"] as const;
export type StatusFilter = (typeof STATUS_FILTERS)[number];

export function matchesCategory(category: string, filter: CategoryFilter): boolean {
  if (filter === "All") return true;
  const c = category.toLowerCase();
  switch (filter) {
    case "Lending":
      return c.includes("lending") || c.includes("credit") || c.includes("leverage");
    case "DEX":
      return c.includes("dex") || c.includes("amm") || c.includes("aggregator") || c.includes("stableswap");
    case "Staking":
      return c.includes("staking") || c.includes("restaking");
    case "Yield":
      return c.includes("yield");
    default:
      return true;
  }
}

export function statusFilterToValue(filter: StatusFilter): CoverageStatus | null {
  switch (filter) {
    case "Covered":
      return "covered";
    case "Partial":
      return "partial";
    case "Needs Verification":
      return "needs-verification";
    case "Not Covered":
      return "not-covered";
    default:
      return null;
  }
}

export function getEntry(protocolSlug: string, providerSlug: string): RiskEntry | undefined {
  return riskData.find(e => e.protocolSlug === protocolSlug && e.providerSlug === providerSlug);
}

export function getProtocol(slug: string): Protocol | undefined {
  return protocols.find(p => p.slug === slug);
}

export function getProvider(slug: string): Provider | undefined {
  return providers.find(p => p.slug === slug);
}

export const STATUS_META: Record<CoverageStatus, { label: string; badgeClass: string }> = {
  covered: { label: "Covered", badgeClass: "badge-success" },
  partial: { label: "Partial", badgeClass: "badge-warning" },
  "not-covered": { label: "Not covered", badgeClass: "badge-ghost" },
  "needs-verification": { label: "?", badgeClass: "badge-neutral" },
  "source-unavailable": { label: "Source unavailable", badgeClass: "badge-error" },
};
