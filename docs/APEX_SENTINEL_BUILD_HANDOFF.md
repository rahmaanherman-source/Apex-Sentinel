# 🔱 APEX SENTINEL — BUILD HANDOFF

**Purpose:** This document is the source-of-truth engineering handoff for Antigravity, Grok, and any other AI/code agent working on APEX SENTINEL.

## 0. COMMAND

Build the real APEX SENTINEL product in this repository. Do not build a brochure, mock security product, or unrelated feature bundle. Audit the existing repository first, classify every component, preserve frozen artifacts, then implement only capabilities that can be proven by executable code, permissions, APIs, tests, and browser verification.

**Product identity:** APEX SENTINEL is an AI-powered, local-first browser security and protection system. The Mechanical Cat is the persistent Sentinel AI identity/avatar.

**Core mission:** Protect → Detect → Explain → Respond.

## 1. PRODUCT LOCK

Sentinel's primary purpose is browser security/protection:

- phishing and suspicious-site analysis
- suspicious links and redirects
- malicious/suspicious web content where real evidence exists
- pop-up and unwanted-page behavior
- unsafe-download review
- browser privacy exposure
- security alerts and evidence review
- AI explanation of available evidence
- local desktop/file cleanup when a real native companion provides OS access
- email hygiene only through a real authorized mail connector
- VPN/privacy status or control only through a real supported integration

### Strict exclusions

Do NOT put unrelated legacy/test functionality into Sentinel's identity, UI, onboarding, marketing, or architecture. Do not introduce unrelated terminology merely because it exists elsewhere in the repository.

Do not merge the tab optimizer into Sentinel. Do not modify or merge the frozen contest artifact.

Do not invent detections, blocklists, threat scores, partnerships, integrations, OS access, or successful scans.

## 2. MECHANICAL CAT UX

The supplied APEX SENTINEL logo is the Sentinel AI avatar/identity.

The Cat is a right-edge peek/sidebar companion, not a full-page takeover.

Normal state:
- quiet, compact, non-obstructive
- webpage remains visible
- edge affordance opens the panel

Important state:
- Cat can visually react when genuine evidence requires attention
- use stronger visual behavior for high-severity verified events
- never cover the user's work unnecessarily

Personality/cosmetic purr variants are allowed as UX decoration, but security statements remain precise.

## 3. FOUR-WAY COMPONENT AUDIT

Before changing code, classify every existing component as exactly one of:

1. **Sentinel Core** — directly implements Sentinel's protected-browser experience.
2. **Sentinel Supporting Infrastructure** — shared browser adapters, IPC, secure state, tests, packaging, assets, verification, documentation.
3. **Separate Product** — independent lifecycle/purpose/release/permissions, including the optimizer.
4. **Legacy/Test Code** — historical experiments, prototypes, contest/test code, or unrelated functionality.

Only categories 1–2 enter the Sentinel experience by default.

## 4. FROZEN CONTEST ARTIFACT

The frozen contest candidate must remain untouched:

`release/baselines/apex-sentinel-firefox-1.0.0-baseline.zip`

SHA-256:

`ef513078572a551fcd95a7b5f018aa06f152e122483054a053061b15a6302832`

Firefox ID:

`apex-sentinel@apexlifeglobal.com`

It is a separate popup-only contest artifact. Do not merge it with the sidebar or optimizer.

## 5. CURRENT REPOSITORY WARNING

The current `main` manifest is NOT automatically accepted as the product contract. It currently contains broad permissions, `<all_urls>`, content scripts, and security-related browser APIs. Those must be audited and reduced/changed only according to an explicitly verified release design.

Do not assume an old README or old code claim equals implemented capability. Executable behavior is the source of truth.

## 6. TARGET ARCHITECTURE

```text
                         🔱 APEX SENTINEL
                                │
             ┌──────────────────┴──────────────────┐
             │                                     │
      BROWSER EXPERIENCE                    LOCAL SENTINEL CORE
             │                                     │
     Firefox / Chrome / Edge                 Native companion
             │                                     │
     Sidebar / Side Panel                  Filesystem / OS access
             │                                     │
             └──────────────────┬──────────────────┘
                                │
                         Secure local IPC
                                │
                       Sentinel decision layer
```

The browser extension alone cannot truthfully claim unrestricted desktop access. Genuine desktop-wide cleanup requires a native local companion with explicit user-granted permissions.

## 7. DESKTOP / FILE CAPABILITY

Build a real local scanner in the companion layer, not a fake browser-only scanner.

Supported workflow should eventually include:

```text
Choose folders/drives
      ↓
Inventory files
      ↓
SHA-256 / metadata
      ↓
Duplicate analysis
      ↓
Classification
      ↓
Preview proposed actions
      ↓
User authorization
      ↓
Move / archive / quarantine / delete
      ↓
Audit log
```

File metadata should include, where available:

- path
- filename
- extension/type
- size
- creation time
- modification time
- SHA-256
- duplicate group
- classification
- proposed action

Classifications may include:

`KEEP`, `REVIEW`, `DUPLICATE`, `JUNK`, `TEMPORARY`, `LARGE_UNUSED`, `SUSPICIOUS`, `QUARANTINE`.

Never label a file as malware without actual evidence from a real detection mechanism.

## 8. LARGE-SCALE CLEANUP

There is no arbitrary product rule that cleanup must stop at 100 items. If the user authorizes a valid batch and the implementation safely supports it, thousands of candidates may be processed.

However:

- destructive operations require explicit authorization
- show counts and scope before execution
- maintain an audit trail
- prefer quarantine for uncertain items
- never silently wipe arbitrary directories
- never interpret a broad request as permission to delete the whole OS

Example:

```text
8,421 candidates found
4,812 exact duplicates
1,943 temporary/junk candidates
611 large/unused candidates
1,055 require review

[ REVIEW ] [ CLEAN SELECTED ]
```

## 9. QUARANTINE

Questionable files should be movable into a controlled quarantine area with:

- original path
- hash
- timestamp
- reason/classification
- restore capability
- permanent-delete capability requiring authorization

## 10. FILE ORGANIZATION

User-requested organization model:

```text
AI / COMPUTER / HUMAN
        ↓
      NAME
        ↓
      DATE
        ↓
      TYPE
```

Make the hierarchy configurable. Preview proposed moves before changing the filesystem.

## 11. EMAIL HYGIENE

Email is not available merely because an AI can discuss email.

Implement only through an actual authorized connector/API.

Allowed future workflow:

```text
Connect mailbox
    ↓
Read permitted metadata/messages
    ↓
Classify
    ↓
Preview batch
    ↓
User confirms
    ↓
Archive / label / trash
    ↓
Audit
```

No silent mailbox deletion. No claimed integration until connected and verified.

## 12. VPN / PRIVACY

Do not fake a VPN.

Sentinel may display or control VPN status only when a real integration exists. Otherwise report the capability as unavailable/not connected.

Local-first is the default. Network use must be explicit and auditable.

## 13. AI AGENT

The Mechanical Cat is the AI interface.

Example:

> User: Clean my desktop.
>
> Sentinel: I found 8,421 candidates in the folders you authorized. I can prepare a cleanup plan without changing anything.
>
> User: Delete the duplicates.
>
> Sentinel: 4,812 exact duplicates are selected. This will remove those files after verification. Proceed?

The AI must distinguish:

- evidence found
- analysis performed
- action available
- action executed
- unsupported capability
- failed action
- not verified

## 14. LOCAL-FIRST / PRIVACY

Principles:

1. Keep sensitive processing local whenever possible.
2. Request minimum permissions required for each release.
3. Do not transmit user data merely because an AI feature exists.
4. External services are explicit integrations, never assumptions.
5. Credentials belong in secure storage, not chat history, UI text, or logs.
6. External connection status must be truthful.
7. Prefer local IPC for extension-to-desktop communication.

## 15. BROWSER LAYERS

Use browser-specific adapters.

```text
Sentinel Core
├── Firefox adapter → sidebar
├── Chromium adapter → side panel
└── Edge adapter → supported side-panel mechanism
```

Do not pretend browser APIs are identical.

## 16. SECURITY MODEL

Evidence-first:

```text
Browser context
      ↓
Available evidence
      ↓
Local analysis / verified external intelligence
      ↓
Explain finding
      ↓
User decision
      ↓
Authorized action
```

Possible verdict states:

- `VERIFIED THREAT`
- `SUSPICIOUS`
- `NO THREAT EVIDENCE FOUND`
- `UNKNOWN`
- `NOT_SUPPORTED`
- `ERROR`

Never fabricate a numeric safety score.

## 17. POP-UP / LINK / DOWNLOAD PROTECTION

These capabilities must be backed by real browser APIs and tests.

Do not implement a hardcoded list and call it malware protection.

Do not claim that every malicious website can be blocked unless a real blocking mechanism and evidence source exist.

Do not inject a page-covering warning unless the browser architecture genuinely requires it and the behavior is explicitly designed/tested.

## 18. MANIFEST / PERMISSION RULE

Before changing the manifest:

1. audit current manifest
2. identify required API for each feature
3. minimize permissions
4. separate browser builds where necessary
5. test permission behavior
6. document why each permission exists

A feature does not justify a permission merely because an older prototype used it.

## 19. RELEASE TRACKS

Keep these separate:

```text
Contest 1.0.0
    frozen

Sidebar / Sentinel product
    active development

Optimizer
    separate product

Legacy/Test
    isolated
```

No accidental merge.

## 20. REQUIRED REPOSITORY STRUCTURE

Target structure:

```text
extension/
  firefox/
  chromium/
  shared/
  sidebar/
  popup/
  background/
  assets/

sentinel-core/
  scanner/
  filesystem/
  organizer/
  duplicates/
  quarantine/
  cleanup/
  encryption/
  audit/
  ipc/

connectors/
  mail/
  vpn/

ai/
  sentinel-agent/
  tools/
  policies/

security/
  url-analysis/
  download-analysis/
  reputation/

release/
  baselines/
  sidebar/
  optimizer/

tests/
docs/
```

Adapt this to the existing repository rather than blindly duplicating existing modules.

## 21. REQUIRED TESTING

For every implemented feature, provide tests for:

- permission boundaries
- IPC authorization
- file selection boundaries
- path traversal protection
- duplicate detection
- quarantine/restore
- deletion confirmation
- large batch handling
- browser message passing
- unsupported browser APIs
- network-disabled behavior
- AI tool authorization
- audit logging

For security-sensitive operations, test both allowed and denied paths.

## 22. AUDIT LANGUAGE

Never collapse these states:

```text
IMPLEMENTED
TESTED
BROWSER-VERIFIED
CONNECTED
SUPPORTED
NOT SUPPORTED
BLOCKED
ERROR
```

Green UI must never mean “secure” unless the underlying claim has actually been verified.

## 23. AI AGENT RULES

Antigravity and Grok must:

- read this file before changing Sentinel
- inspect the actual repository before coding
- preserve the frozen contest artifact
- classify existing components
- avoid speculative security claims
- avoid adding broad permissions without a concrete feature requirement
- build real implementations, not demo buttons
- run tests after changes
- report exactly what was implemented and verified
- identify anything that remains blocked or unsupported
- leave a reproducible audit trail

## 24. DEFINITION OF DONE

Sentinel is not “done” because the sidebar looks good.

A release is ready only when:

```text
CODE
  ↓
TESTS
  ↓
PERMISSION AUDIT
  ↓
BROWSER VERIFICATION
  ↓
LOCAL-COMPANION VERIFICATION (if applicable)
  ↓
SECURITY CLAIM AUDIT
  ↓
PACKAGING
  ↓
HASH / ARTIFACT RECORD
```

## 25. FINAL PRODUCT RULE

> **If Sentinel cannot prove it, Sentinel does not claim it.**

The Mechanical Cat can be playful.
The security boundary cannot.

**GODSPEED.**
