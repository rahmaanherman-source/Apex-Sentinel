// APEX SENTINEL — CL4R1T4S local audit feed
// Privacy boundary: never record full URLs, page content, credentials, cookies, tokens, or PII.

const MAX_EVENTS = 250;
const STORAGE_KEY = "claritasAuditFeed";

function sanitizeDetails(details = {}) {
  const blocked = new Set(["url", "href", "cookie", "token", "authorization", "password", "content", "email"]);
  return Object.fromEntries(Object.entries(details).filter(([key]) => !blocked.has(key.toLowerCase())));
}

export async function recordAudit({ module = "system", action, decision = "allow", result = "ok", details = {} }) {
  const event = {
    event_id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    module,
    action,
    decision,
    result,
    details: sanitizeDetails(details)
  };

  const stored = await browser.storage.local.get(STORAGE_KEY);
  const events = Array.isArray(stored[STORAGE_KEY]) ? stored[STORAGE_KEY] : [];
  events.push(event);
  await browser.storage.local.set({ [STORAGE_KEY]: events.slice(-MAX_EVENTS) });
  return event;
}

export async function readAuditFeed() {
  const stored = await browser.storage.local.get(STORAGE_KEY);
  return Array.isArray(stored[STORAGE_KEY]) ? stored[STORAGE_KEY] : [];
}

export async function clearAuditFeed() {
  await browser.storage.local.remove(STORAGE_KEY);
}
