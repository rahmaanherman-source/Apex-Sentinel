# CL4R1T4S Audit Feed

APEX SENTINEL transparency contract. The feed records observable extension events without storing browsing content, credentials, tokens, or raw URLs.

## Event contract

Each event contains:

- `event_id`: locally generated event identifier
- `timestamp`: ISO-8601 timestamp
- `module`: `shield`, `cleanse`, `aura`, or `system`
- `action`: normalized action name
- `decision`: `allow`, `block`, `redirect`, `toggle`, or `error`
- `result`: short non-sensitive result
- `details`: sanitized metadata only

## Privacy boundary

The audit feed MUST NOT contain page contents, authentication tokens, cookies, passwords, payment data, full browsing URLs, or personally identifying browsing history.

## Verification states

- DECLARED: capability exists in source/configuration.
- OBSERVED: an event was emitted at runtime.
- VERIFIED: an emitted event was read back and validated against the event schema.

A green status must never be used to imply VERIFIED unless the corresponding evidence exists.
