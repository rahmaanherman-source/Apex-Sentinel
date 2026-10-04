# AI-Coworker-SaaS Integration Contract

AI-Coworker-SaaS is a separate APEX product repository. It is protected by APEX Sentinel through an explicit policy boundary; it does not duplicate Sentinel's browser-security implementation.

## Boundary

```text
AI-Coworker-SaaS
  ├─ Graph / loops
  ├─ Verification / evidence
  ├─ Workflow state
  └─ Human exception boundary
          │
          ▼
     APEX Sentinel
  ├─ security policy
  ├─ authorization
  ├─ high-risk enforcement
  └─ audit/protection decisions
```

## Integration rule

Sentinel may approve, deny, or escalate an action based on policy and available evidence. AI-Coworker-SaaS owns workflow execution and correction loops. Neither product should claim capabilities the connected implementation does not actually expose.

## Trust states

`IMPLEMENTED` → `TESTED` → `CONNECTED` → `VERIFIED`

An adapter that is merely present in source is not considered connected.

## Product separation

- Sentinel remains the security/protection product.
- AI-Coworker-SaaS remains the governed autonomous-work product.
- Shared interfaces are contracts, not duplicated implementations.
- New integrations belong in adapters unless they become a demonstrated Sentinel core security capability.
