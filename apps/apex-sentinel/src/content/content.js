import { applyAura, removeAura } from './aura.js';
import { cleanHref } from '../lib/url-cleaner.js';

async function sync() {
  const state = await chrome.storage.local.get({ aura: true, cleanse: true, siteAura: {} });
  const host = location.hostname;
  const aura = state.siteAura[host] ?? state.aura;
  aura ? applyAura() : removeAura();
  if (state.cleanse) {
    document.querySelectorAll('a[href]').forEach((a) => {
      const cleaned = cleanHref(a.href);
      if (cleaned !== a.href) a.href = cleaned;
    });
  }
}

if (!/^(chrome|edge|about):/.test(location.protocol)) {
  sync();
  new MutationObserver(() => sync()).observe(document.documentElement, { childList: true, subtree: true });
}
