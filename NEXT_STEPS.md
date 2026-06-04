# Next Steps

## Delivered in this build

- Static dashboard with 20 EF RFP seed protocols × 14 risk providers matrix
- 24 static pages: home, methodology, 20 protocol detail pages
- Data layer in `public/data/` (protocols.json, providers.json, risk-data.json)
- AGPL 3.0 license
- GitHub community correction workflow (via issues/PRs)
- Deployed to IPFS

## Not yet implemented (v2 scope)

### Live DefiLlama TVL integration
- Add a build-time script to fetch TVL from https://api.llama.fi/protocols
- Map protocol slugs to DefiLlama IDs and populate the `tvl` field in protocols.json
- Refresh data on each deploy

### Provider feed automation
- DeFiScan: implement API scraper for machine-readable risk scores
- DeFi Saver: implement API scraper for their public risk monitoring data
- Xerberus: implement API integration for their ratings
- BlockAnalitica: parse public-website data for lending protocol coverage
- LlamaRisk: parse published reports for coverage data
- All others: manual curation workflow via GitHub PRs

### Protocol detail pages - full coverage
- Risk feed cards with actual data (currently shows "needs-verification")
- Audit history section (verify sources and add)
- Incident history section

### OG social image
- Create a proper 1200x630 OG image (currently using thumbnail placeholder)
- Consider using Satori or puppeteer for dynamic OG images per protocol

### ENS subdomain
- Register a human-readable ENS subdomain pointing to the IPFS CID

### Steward confirmation
- PressburgPrince to confirm as long-term steward in writing
- Add steward contact to CONTRIBUTING.md

### EF RFP submission
- Review requirements at https://esp.ethereum.foundation/applicants/rfp/defi_risk_intel_agg
- Identify qualified technical contributor/reviewer per RFP requirement
- Draft and submit proposal

## Contributing

Corrections welcome via GitHub issues and pull requests at:
https://github.com/clawdbotatg/leftclaw-service-job-239
