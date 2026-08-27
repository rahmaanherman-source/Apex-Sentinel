# 🔱 APEX SENTINEL

## AI-powered, local-first browser security & protection

**APEX SENTINEL** is the security/protection member of the GODSPEED APEX ecosystem. Sentinel is designed to sit at the edge of the browser as an AI assistant: it watches the security context the browser actually exposes, explains what it finds, and helps the user decide what to do.

The **Mechanical Cat** is Sentinel's persistent AI identity/avatar.

> **Protect. Detect. Explain. Respond.**

---

## PRODUCT LOCK

APEX SENTINEL's primary purpose is browser security and protection.

It is intended to help with:

- Phishing and suspicious-site analysis
- Suspicious links and redirects
- Malicious or suspicious web content
- Pop-up and unwanted-page behavior
- Unsafe-download review
- Browser privacy exposure
- Security alerts and evidence review
- Local cleanup and organization where the browser/companion environment actually grants access
- AI explanations of the security context available to Sentinel
- Privacy/VPN status or integrations where a real supported integration exists

### What Sentinel does **not** claim

- It does not claim a site is safe without evidence.
- It does not invent threat detections, security scores, blocklists, or scan results.
- It does not pretend a browser extension has unrestricted operating-system access.
- It does not claim desktop-wide or phone-wide protection unless a real companion application implements that capability.
- It does not silently delete user files or mail.
- It does not present a third-party partnership or integration as connected unless it is actually wired and verified.
- The optimizer/tab-discard product remains separate.
- The frozen contest build remains separate and must not be modified for the sidebar product.

### Strict product-experience exclusion

Legacy/test components from unrelated work must not leak into Sentinel's product identity, onboarding, marketing, feature descriptions, or architecture. They remain classified separately unless explicitly promoted into Sentinel through an audited product decision.

---

## 🐈‍⬛ THE MECHANICAL CAT UX

Sentinel is designed as a **right-edge peek**, not a full-page takeover.

- The webpage remains visible.
- A small edge affordance can open the Sentinel panel.
- The panel is compact and sidebar-oriented.
- The Mechanical Cat acts as the recognizable AI companion.
- Alerts should be noticeable without covering the user's work.
- The Cat can have personality, reactions, and different cosmetic/purr styles while keeping security messaging clear.
- High-severity events can escalate visually, but Sentinel should not become an obstructive overlay.

The intended experience is: **the Cat sits on the edge, watches the evidence available to it, and speaks up when something actually matters.**

---

## 🛡️ PROTECTION MODEL

Sentinel follows an evidence-first model:

```text
BROWSER CONTEXT
      ↓
AVAILABLE EVIDENCE
      ↓
LOCAL ANALYSIS / VERIFIED INTEGRATION
      ↓
EXPLAIN
      ↓
USER DECISION
      ↓
AUTHORIZED ACTION
```

Actions must match the permissions and APIs actually available in the active browser build.

### Protection surfaces

| Surface | Sentinel behavior |
|---|---|
| Current page | Inspect available browser/page context when permitted |
| Links | Review destination information before an authorized action |
| Downloads | Review available download context; do not pretend to scan files the extension cannot access |
| Pop-ups | Surface suspicious behavior where the browser APIs permit detection/control |
| Privacy | Explain exposed permissions/context and real integration status |
| Cleanup | Preview and organize only resources the user explicitly grants access to |
| AI | Explain evidence; never manufacture a verdict |
| VPN | Show/control a real integration when one is actually connected |
| Desktop | Requires an actual local companion for OS-wide file operations |
| Email | Requires a real mail connector/API and explicit user authorization |

---

## 🧹 CLEANUP & ORGANIZATION

Sentinel's local-first direction includes **user-controlled digital cleanup**.

Where a real local capability exists, the intended organization model is:

```text
AI / COMPUTER / HUMAN
        ↓
     NAME
        ↓
     DATE
        ↓
     TYPE
```

The system should preview proposed changes before destructive operations. Large cleanup batches are possible only when the user has explicitly selected/granted the relevant resources and the underlying tool actually supports the operation.

A browser extension cannot arbitrarily clean an entire desktop. OS-wide cleanup requires a local companion application with appropriate permissions.

Likewise, email cleanup requires a real connected mail API. No mailbox is silently trashed merely because Sentinel can see a message list.

---

## 🔐 LOCAL-FIRST / PRIVACY ARCHITECTURE

Sentinel is designed around **local-first processing**.

Principles:

1. Keep sensitive processing local whenever possible.
2. Request the minimum permissions required by each release.
3. Do not transmit user data merely because an AI feature exists.
4. External services are integrations, not assumptions.
5. Credentials belong in secure credential storage, not chat history, UI text, or logs.
6. Every external connection should have an explicit, auditable status.
7. The UI must distinguish **available**, **configured**, **connected**, **unsupported**, and **not verified**.

Potential integrations such as a privacy AI or VPN service may be architecturally aligned with Sentinel, but they are **not partnerships or connected features until a real integration exists and is verified**.

---

## 🤖 SENTINEL AI

The Sentinel sidebar is the primary AI interaction surface.

Example questions:

- “Is this suspicious?”
- “Why did Sentinel flag this?”
- “What is this link trying to do?”
- “What evidence do we have?”
- “What can I safely clean?”
- “What permissions does this site appear to be using?”

The assistant should answer from actual evidence and clearly state when the browser does not expose enough information to determine an answer.

An external AI provider may be used only when it is deliberately configured and the connection is represented honestly in the UI.

---

## 🧩 APEX FAMILY / COMPONENT CLASSIFICATION

Every existing repository component must be classified before being promoted into the Sentinel experience:

### 1. Sentinel Core

Directly implements the protected-browser experience: sidebar/side-panel UI, Sentinel AI interaction, security analysis, alerts, browser context, and authorized protection actions.

### 2. Sentinel Supporting Infrastructure

Shared infrastructure required to make Sentinel work safely: build/package tooling, secure local state, browser adapters, verification tooling, tests, icons/assets, and documentation.

### 3. Separate Product

A product with its own purpose, lifecycle, permissions, or release artifact. It is not merged merely because it can communicate with Sentinel.

### 4. Legacy/Test Code

Historical experiments, contest/test implementations, prototypes, or functionality that is not part of Sentinel's current product contract.

**Only categories 1–2 belong in the Sentinel experience by default.**

---

## 📦 RELEASE SEPARATION

The repository may contain multiple legitimate artifacts. They must remain clearly separated.

### Contest 1.0.0

The frozen Firefox contest candidate is the popup-only artifact with empty permissions. Its known frozen SHA-256 begins:

```text
ef513078572a551fcd95a7b5f018aa06f152e122483054a053061b15a6302832
```

It must not be modified, merged with the optimizer, or repackaged as the sidebar product.

### Sidebar 1.1.0

The new product direction is the Sentinel sidebar/side-panel experience. Its UI lives under `sidebar/` and is designed around the Mechanical Cat, current browser context, Protection Center, Ask Sentinel, APEX Family modules, and local cleanup controls.

The sidebar UI currently uses:

```text
sidebar/sidebar.html
sidebar/sidebar.css
sidebar/sidebar.js
```

The sidebar JavaScript reads the active tab when the browser exposes it and deliberately returns honest states when a capability is unavailable. fileciteturn68file0

### Optimizer

The tab-discard/optimizer implementation is a **separate product/artifact**. It is not automatically part of Sentinel's security shield and must not be merged into the frozen contest build.

---

## 🖥️ BROWSER ARCHITECTURE

Sentinel is intended to support browser-specific UI adapters rather than pretending every browser has the same API.

```text
                    APEX SENTINEL
                          │
              ┌───────────┴───────────┐
              │                       │
        Sentinel Core          Local/Verified Services
              │
       ┌──────┼──────┐
       │      │      │
    Firefox  Chrome  Edge
    Sidebar  Side    Side
             Panel   Panel
```

The webpage remains beside the panel.

Browser limitations are part of the product contract, not something the UI should hide.

---

## 📁 CURRENT SIDEBAR UI

The current sidebar contains these product surfaces:

- Current Page context
- Evidence state
- Protection Center
- Page review
- Link review
- Download review
- Privacy review
- Pop-up review
- Cleanup
- Mechanical Cat status/personality
- Ask Sentinel
- APEX Family module navigation
- Performance
- Verification
- Security
- Release

The implementation intentionally uses language such as **“Evidence not assessed”**, **“no automatic verdict”**, and **“external AI connection is not claimed unless it is configured”** instead of fabricating protection results. fileciteturn62file0

---

## 🧪 AUDIT & VERIFICATION

**Source of truth is executable behavior, not old documentation.**

For every release, audit:

- Manifest permissions
- Host permissions
- Content scripts
- Background/service-worker behavior
- Browser-specific APIs
- External network requests
- Storage behavior
- File/mail access
- Security claims made by the UI
- Destructive actions and confirmation gates
- Separation of frozen and experimental artifacts

A feature is not “complete” merely because a button or card exists in the UI.

The audit must distinguish:

```text
IMPLEMENTED
TESTED
BROWSER-VERIFIED
CONNECTED
SUPPORTED
NOT SUPPORTED
BLOCKED
```

Do not collapse those states into a generic green checkmark.

---

## 🚧 CURRENT REPOSITORY AUDIT NOTE

The repository contains older documentation describing a broader 1.0.4 privacy/security extension with `storage`, `tabs`, `webRequest`, `webNavigation`, `cookies`, `privacy`, and `<all_urls>` access. Those claims are historical and must not automatically be treated as the current frozen contest architecture. fileciteturn64file0

The product lock for the current Sentinel direction takes precedence: **do not add broad permissions, page injection, malware blocking, or other capabilities simply because an older document says they exist. Verify the active manifest and executable code before making a capability claim.**

---

## 🚀 DEVELOPMENT PRINCIPLES

### No blind shipping

Every capability must be traceable to code, permission, API, test, and browser verification.

### No fake green

A UI status must never imply successful protection when the underlying capability has not actually run.

### Local first

Keep processing and sensitive state local unless an explicit external integration is required and configured.

### User remains in control

Especially for cleanup, deletion, email operations, downloads, and other destructive actions.

### One Sentinel

Sentinel has one product identity. Browser-specific implementations are adapters around that identity—not unrelated products disguised as one extension.

### Separate what is separate

Frozen contest artifacts, optimizer releases, experiments, and legacy/test code remain independently auditable.

---

## 🗺️ ROADMAP

### Current

- [x] Sentinel product identity defined
- [x] Mechanical Cat identity/avatar
- [x] Sidebar UI surface
- [x] Evidence-first security language
- [x] Current-page context surface
- [x] Local cleanup surface with permission limitations stated
- [x] APEX Family navigation surface
- [x] Frozen contest artifact kept separate
- [x] Optimizer kept separate

### Next engineering gates

- [ ] Verify active manifest against the intended 1.1.0 browser adapters
- [ ] Wire only capabilities backed by real browser APIs
- [ ] Add tests for sidebar messaging and permission boundaries
- [ ] Verify Firefox sidebar behavior in a real Firefox installation
- [ ] Verify Chromium side-panel behavior in a supported Chromium browser
- [ ] Implement secure local companion architecture for genuine desktop cleanup, if shipped
- [ ] Implement real mail connector only where an authorized API exists
- [ ] Implement real VPN integration only where a supported integration exists
- [ ] Connect an external AI provider only when explicitly configured
- [ ] Produce release artifacts only after executable verification

---

## 📜 IP / ECOSYSTEM

- **APEX SENTINEL** — security/protection product
- **GODSPEED APEX Ecosystem** — broader ecosystem
- **Apex Life Global** — ecosystem/brand umbrella
- **USPTO Provisional Patent:** #63/940,186 — as documented in repository materials

Repository legal/entity information should be verified against the current authoritative legal records before publication or store submission.

---

## 🔱 THE RULE

> **If Sentinel cannot prove it, Sentinel does not claim it.**

The Mechanical Cat can be playful.
The security boundary cannot be.

**GODSPEED.**
