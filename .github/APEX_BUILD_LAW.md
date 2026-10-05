# APEX Build Law — Repair Before Expansion

**Fix the existing action before adding another action.** Completion requires working behavior and executable evidence.

Inspect first; snapshot first; make the smallest requested change; preserve existing behavior; run the real build/tests; revert on regression instead of fixing forward blindly.

Evidence: `DOCUMENTED` → `SCAFFOLDED` → `RUNNABLE` → `BENCHMARKED` → `VERIFIED`; failure: `BLOCKED` | `UNVERIFIED`.

Never turn skipped, simulated, inferred, or unexecuted checks green. Record defects, repairs, tests, commands, preserved behavior, and blockers.

Repair the bottleneck before adding surface area.
