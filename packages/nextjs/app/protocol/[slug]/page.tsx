import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { StatusBadge } from "~~/components/StatusBadge";
import { getEntry, getProtocol, protocols, providers } from "~~/utils/risk-data";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const GITHUB_REPO = "https://github.com/clawdbotatg/leftclaw-service-job-239";

export async function generateStaticParams() {
  return protocols.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const protocol = getProtocol(slug);
  return getMetadata({
    title: protocol ? protocol.name : "Protocol",
    description: protocol ? `Risk feed coverage and governance data for ${protocol.name}.` : "Protocol risk overview.",
  });
}

const GovernanceRow = ({ label, value }: { label: string; value: string | null }) => (
  <div className="flex flex-col sm:flex-row sm:gap-3 py-2 border-b border-base-300 last:border-0">
    <span className="w-48 shrink-0 text-sm font-semibold text-base-content/60">{label}</span>
    <span className="text-sm break-words">{value ?? <span className="text-base-content/40">Not available</span>}</span>
  </div>
);

const GovernanceLinkRow = ({ label, href }: { label: string; href: string | null }) => (
  <div className="flex flex-col sm:flex-row sm:gap-3 py-2 border-b border-base-300 last:border-0">
    <span className="w-48 shrink-0 text-sm font-semibold text-base-content/60">{label}</span>
    {href ? (
      <a href={href} target="_blank" rel="noreferrer" className="text-sm link link-primary break-all">
        {href}
      </a>
    ) : (
      <span className="text-sm text-base-content/40">Not available</span>
    )}
  </div>
);

const ProtocolPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const protocol = getProtocol(slug);

  if (!protocol) {
    notFound();
  }

  const gov = protocol.governance;
  const issuesUrl = `${GITHUB_REPO}/issues/new?title=${encodeURIComponent(`Correction: ${protocol.name}`)}`;

  return (
    <div className="flex flex-col grow w-full bg-base-200">
      <div className="w-full max-w-4xl mx-auto px-4 py-10">
        <Link href="/" className="link link-hover text-sm text-base-content/60">
          ← Back to dashboard
        </Link>

        <header className="mt-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">{protocol.name}</h1>
            <span className="badge badge-outline">{protocol.category}</span>
          </div>
          <p className="text-base-content/70 max-w-2xl">{protocol.description}</p>
          <div className="flex flex-wrap gap-3 mt-3 text-sm">
            <a href={protocol.website} target="_blank" rel="noreferrer" className="link link-primary">
              Website
            </a>
            <a href={protocol.github} target="_blank" rel="noreferrer" className="link link-primary">
              GitHub
            </a>
          </div>
        </header>

        {/* TVL */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="card-title text-xl">Total Value Locked</h2>
            <p className="text-base-content/60 text-sm">TVL data from DefiLlama API — integration coming in v2.</p>
          </div>
        </section>

        {/* Governance */}
        <section className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="card-title text-xl">Governance</h2>
              <span className="badge badge-ghost text-xs">provenance: {gov.provenanceTag}</span>
            </div>
            <div className="mt-2">
              <GovernanceLinkRow label="Forum" href={gov.forum} />
              <GovernanceLinkRow label="Snapshot" href={gov.snapshot} />
              <GovernanceLinkRow label="Tally" href={gov.tally} />
              <GovernanceRow label="Multisig" value={gov.multisig} />
              <GovernanceRow label="Upgradeability" value={gov.upgradeability} />
              <GovernanceRow label="Emergency controls" value={gov.emergencyControls} />
            </div>
          </div>
        </section>

        {/* Risk feeds */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">Risk feed coverage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {providers.map(provider => {
              const entry = getEntry(protocol.slug, provider.slug);
              const status = entry?.status ?? "needs-verification";
              return (
                <div key={provider.slug} className="card bg-base-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold link link-hover"
                      >
                        {provider.name}
                      </a>
                      <StatusBadge status={status} />
                    </div>
                    {entry?.ratingLabel && <div className="text-xs text-base-content/60">{entry.ratingLabel}</div>}
                    {entry?.rating && <div className="text-sm font-semibold">{entry.rating}</div>}
                    {entry?.notes && <p className="text-xs text-base-content/70 mt-1">{entry.notes}</p>}
                    <div className="flex items-center justify-between mt-2">
                      {entry?.sourceUrl ? (
                        <a
                          href={entry.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs link link-primary inline-flex items-center gap-1"
                        >
                          Source <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-base-content/40">No source link</span>
                      )}
                      {entry?.retrievedAt && (
                        <span className="text-[11px] text-base-content/40">
                          retrieved {entry.retrievedAt.slice(0, 10)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="text-sm">
          <a href={issuesUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
            Submit a correction
          </a>
        </div>

        <p className="text-xs text-base-content/60 mt-6 border-t border-base-300 pt-4">
          Data retrieved from public sources. This dashboard does not create composite scores.
        </p>
      </div>
    </div>
  );
};

export default ProtocolPage;
