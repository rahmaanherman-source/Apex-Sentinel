import { DEFAULT_STATE, MESSAGE } from './lib/constants.js';

const load = async () => ({ ...DEFAULT_STATE, ...(await chrome.storage.local.get(DEFAULT_STATE)) });

chrome.runtime.onInstalled.addListener(async () => {
  const current = await chrome.storage.local.get(DEFAULT_STATE);
  await chrome.storage.local.set({ ...DEFAULT_STATE, ...current });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    const state = await load();
    if (message.action === MESSAGE.GET_STATE) return sendResponse(state);
    if (message.action === MESSAGE.TOGGLE_SHIELD) { state.shield = !state.shield; await chrome.storage.local.set({ shield: state.shield }); }
    if (message.action === MESSAGE.TOGGLE_CLEANSE) { state.cleanse = !state.cleanse; await chrome.storage.local.set({ cleanse: state.cleanse }); }
    if (message.action === MESSAGE.TOGGLE_AURA) { state.aura = !state.aura; await chrome.storage.local.set({ aura: state.aura }); }
    if (message.action === MESSAGE.SET_SITE_AURA) {
      state.siteAura[message.host] = Boolean(message.enabled);
      await chrome.storage.local.set({ siteAura: state.siteAura });
    }
    sendResponse(await load());
  })();
  return true;
});

chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener(() => {});
