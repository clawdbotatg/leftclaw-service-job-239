import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Methodology",
  description:
    "How the Open DeFi Risk Dashboard selects protocols and risk feeds, determines coverage, and commits to never producing composite scores.",
});

const GITHUB_REPO = "https://github.com/clawdbotatg/leftclaw-service-job-239";
const ISSUES_URL = `${GITHUB_REPO}/issues`;

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-10 scroll-mt-20">
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    <div className="space-y-3 text-base-content/80 leading-relaxed">{children}</div>
  </section>
);

const Methodology: NextPage = () => {
  return (
    <div className="flex flex-col grow w-full bg-base-200">
      <div className="w-full max-w-3xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Methodology</h1>
          <p className="text-base-content/70">
            How this dashboard is built, what it does, and the principles it commits to.
          </p>
        </header>

        <Section id="what-it-does" title="What this dashboard does and doesn't do">
          <p>
            The Open DeFi Risk Dashboard is a neutral, open-source aggregator. It collects what independent risk
            providers publicly say about top Ethereum DeFi protocols and presents those assessments verbatim, side by
            side.
          </p>
          <p>
            <strong>It does not</strong> rate protocols itself, blend provider opinions into a single number, or rank
            protocols against one another. We surface sources; we do not adjudicate them.
          </p>
        </Section>

        <Section id="no-composite" title="No composite scoring">
          <div className="alert bg-base-100 border-l-4 border-primary block">
            <p className="italic text-base-content">
              &ldquo;This dashboard does not create composite scores. Each provider&apos;s assessment is shown verbatim
              and attributed to its source. We never average, weight, or merge ratings into a single risk number.&rdquo;
            </p>
          </div>
          <p>
            Composite scores hide disagreement and create false precision. Two providers can reasonably reach opposite
            conclusions about the same protocol. Collapsing that into one figure would erase the very signal a reader
            needs. We keep every assessment separate and attributed.
          </p>
        </Section>

        <Section id="protocol-selection" title="How protocols are selected">
          <p>
            The protocol set is the seed list from the Ethereum Foundation&apos;s DeFi risk-tooling RFP — twenty major
            Ethereum DeFi protocols spanning lending, DEX/AMM, aggregation, yield, liquid staking, and restaking. This
            keeps the initial scope neutral and grounded in a public reference rather than our own preferences.
          </p>
          <p>Additions or removals are proposed and discussed openly via GitHub issues.</p>
        </Section>

        <Section id="feed-selection" title="How risk feeds are selected">
          <p>
            We include risk providers that publish protocol-level DeFi risk assessments and that can be referenced by a
            public URL. Each provider is listed with its self-described methodology, the availability of its data
            (public API, public website, or manual), and notes on coverage.
          </p>
          <p>
            Inclusion is not an endorsement of a provider&apos;s methodology. It only means the provider publishes
            assessments relevant to the protocols tracked here.
          </p>
        </Section>

        <Section id="coverage-status" title="How coverage status is determined">
          <p>Every protocol × provider pair is assigned one of five coverage statuses:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Covered</strong> — the provider publishes a dedicated, current assessment of the protocol.
            </li>
            <li>
              <strong>Partial</strong> — the provider covers the protocol only indirectly (e.g. specific markets or
              assets).
            </li>
            <li>
              <strong>Needs verification</strong> — coverage is unconfirmed and awaits a human check against the source.
            </li>
            <li>
              <strong>Not covered</strong> — the provider does not assess the protocol.
            </li>
            <li>
              <strong>Source unavailable</strong> — a source was expected but could not be retrieved.
            </li>
          </ul>
          <p>
            Most pairs begin as <em>needs verification</em> by design. We would rather show an honest &ldquo;not yet
            confirmed&rdquo; than imply coverage we have not checked.
          </p>
        </Section>

        <Section id="governance-data" title="How governance data is sourced">
          <p>
            Governance details — forums, Snapshot and Tally spaces, multisig addresses, upgradeability, and emergency
            controls — are sourced from official protocol documentation and, where possible, verified on-chain. Each
            protocol carries a provenance tag describing the strongest source we relied on.
          </p>
        </Section>

        <Section id="provenance" title="How provenance tags work">
          <p>Provenance tags describe how a piece of data was sourced:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <code className="badge badge-ghost">official-documentation</code> — taken from the protocol&apos;s own
              docs or governance pages.
            </li>
            <li>
              <code className="badge badge-ghost">onchain</code> — verified directly against on-chain contracts.
            </li>
            <li>
              <code className="badge badge-ghost">community</code> — sourced from community research or third parties.
            </li>
            <li>
              <code className="badge badge-ghost">unverified</code> — not yet confirmed against a primary source.
            </li>
          </ul>
        </Section>

        <Section id="conflicts" title="How conflicts are disclosed">
          <p>
            When providers disagree about the same protocol, we show both assessments next to each other rather than
            reconciling them. If a provider has a known relationship with a protocol it assesses, that relationship is
            noted alongside the entry where we are aware of it. Disclosures are tracked publicly in the repository.
          </p>
        </Section>

        <Section id="corrections" title="How to submit corrections">
          <p>
            All data lives in plain JSON files in the public repository. If something is wrong, out of date, or missing,
            open a GitHub issue and we will review it openly.
          </p>
          <a href={ISSUES_URL} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Submit a correction
          </a>
        </Section>

        <Section id="charter" title="Project Charter">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-lg">The no-composite-scoring commitment</h3>
              <p>
                This project exists to make DeFi risk intelligence legible, not to rank protocols. We commit to the
                following:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-base-content/80">
                <li>We will never publish a composite or blended risk score.</li>
                <li>Every assessment is attributed to its source and shown verbatim.</li>
                <li>All underlying data is open, versioned, and correctable by anyone.</li>
                <li>Inclusion of a provider or protocol is not an endorsement.</li>
                <li>The dashboard is a public good, licensed under AGPL 3.0, and is not financial advice.</li>
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Methodology;
