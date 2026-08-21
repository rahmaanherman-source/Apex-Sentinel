# APEX SENTINEL

Privacy-first browser protection by **Apex Global LLC**.

## Trinity

- **SHIELD** — blocks known advertising/tracking request domains using Manifest V3 declarative rules.
- **AURA** — applies a conservative dark theme with per-site enable/disable state.
- **CLEANSE** — removes common tracking parameters from navigations and links.

## Status

This repository contains the implementation source and tests. Claims about compatibility, rule counts, and blocking effectiveness are targets that must be verified against current browser versions before release.

**Patent reference:** USPTO provisional application 63/940,186.

## Development

Load `apps/apex-sentinel` as an unpacked extension in a Chromium-based browser with Developer Mode enabled. Run `npm test` from this directory.
