# Open DeFi Risk Dashboard

**Live URL:** https://bafybeidjlai5ensmpmt2txl7mnm4vxkib34f5dl63m3ulscymfktmtowei.ipfs.community.bgipfs.com/

A neutral, open-source aggregator of DeFi risk intelligence. It collects what independent risk
providers publicly say about top Ethereum DeFi protocols and presents those assessments **verbatim,
side by side** — without ever blending them into a composite score.

> Built in response to the Ethereum Foundation's DeFi risk-tooling RFP. The seed protocol list is
> drawn directly from that RFP.

## What it does

- **Risk matrix** — a protocol × provider grid showing coverage status (covered, partial, needs
  verification, not covered, source unavailable) for 20 major Ethereum DeFi protocols across leading
  risk providers, with links back to each source.
- **Protocol detail pages** — governance data (forum, Snapshot, Tally, multisig, upgradeability,
  emergency controls), provenance tags, and per-provider risk feed cards.
- **Methodology** — a transparent explanation of how protocols and feeds are selected, how coverage
  is determined, and our charter commitment to never produce composite scores.

## What it deliberately does not do

This dashboard does **not** rate protocols itself, average or weight provider opinions, or rank
protocols against one another. It surfaces sources; it does not adjudicate them. See the
`/methodology` page for the full charter.

## License

Licensed under **AGPL 3.0**. This is a public good and is **not financial advice**.

## Architecture

- **Frontend only** — no smart contracts. Built on the Scaffold-ETH 2 (Next.js App Router, Tailwind,
  DaisyUI) frontend package, with the wallet/contract UI unused since this is a pure data dashboard.
- **Static data layer** — all risk and governance data lives in plain JSON under
  `packages/nextjs/public/data/`:
  - `protocols.json` — the 20 EF RFP seed protocols + governance metadata
  - `providers.json` — the tracked risk providers and their self-described methodologies
  - `risk-data.json` — one entry per protocol × provider pair with coverage status, rating, source
    URL, and timestamps
- **Static export** — `yarn build` produces a fully static site in `packages/nextjs/out/`.
- **Pages** — `/` (dashboard matrix), `/methodology`, `/protocol/[slug]` (statically generated per
  protocol via `generateStaticParams`).

## Run locally

```bash
yarn install
cd packages/nextjs
yarn dev          # http://localhost:3000
```

Production build (static export):

```bash
cd packages/nextjs
NODE_OPTIONS="--require ./polyfill-localstorage.cjs" NEXT_PUBLIC_IPFS_BUILD=true yarn build
# output in packages/nextjs/out/
```

## How to contribute / submit corrections

All data is open and correctable. If a coverage status, rating, source link, or governance field is
wrong, out of date, or missing, please
[open a GitHub issue](https://github.com/clawdbotatg/leftclaw-service-job-239/issues). Data edits are
simple JSON changes and are reviewed openly.

## Live deployment

_Placeholder — IPFS/live URL will be added after deployment._

## Reference

- Ethereum Foundation DeFi risk-tooling RFP (seed protocol list).
