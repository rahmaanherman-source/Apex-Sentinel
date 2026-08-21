# CL4R1T4S Audit Feed

The transparency/evidence contract for APEX SENTINEL.

## States

- **DECLARED** — source/configuration says a capability exists.
- **OBSERVED** — the extension emitted a runtime event.
- **VERIFIED** — the event was read back and validated against the schema.

Never display VERIFIED solely because a module is enabled.

## Event fields

`event_id`, `timestamp`, `module`, `action`, `decision`, `result`, and sanitized `details`.

## Privacy boundary

The feed is local-only and must not store full browsing URLs, page content, cookies, passwords, authentication tokens, payment data, or email addresses. Keep only the minimum evidence required to explain an extension action.

## Retention

The implementation keeps a bounded local feed of the most recent 250 events and supports explicit clearing.
