(() => {
  const api = globalThis.browser ?? globalThis.chrome;
  const $ = (id) => document.getElementById(id);

  function send(message) {
    try { return api?.runtime?.sendMessage?.(message); } catch { return undefined; }
  }

  async function getTab() {
    try {
      const tabs = await api.tabs.query({ active: true, currentWindow: true });
      return tabs?.[0] ?? null;
    } catch { return null; }
  }

  function renderContext(tab) {
    if (!tab) return;
    $('page-title').textContent = tab.title || 'Current page';
    $('page-url').textContent = tab.url || 'URL unavailable';
    if (tab.favIconUrl) $('page-icon').innerHTML = `<img src="${escapeAttr(tab.favIconUrl)}" alt="" style="width:22px;height:22px;border-radius:6px">`;
  }

  function escapeAttr(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function say(text, user = false) {
    const row = document.createElement('div');
    row.className = `message ${user ? 'user' : 'bot'}`;
    row.textContent = text;
    $('messages').appendChild(row);
    $('messages').scrollTop = $('messages').scrollHeight;
  }

  async function action(type) {
    const tab = await getTab();
    if (type === 'choose-files') {
      $('cleanup-status').textContent = 'Browser extensions cannot choose arbitrary desktop folders. A local companion is required for OS file access.';
      return;
    }
    if (type === 'organize') {
      $('cleanup-status').textContent = 'Preview-only: no folder has been granted, so nothing was changed.';
      return;
    }
    const labels = {
      page: 'Page inspection requested. No verdict is shown until evidence is available.',
      link: 'Link review requested. Select a link or provide a URL for an evidence-based check.',
      download: 'Download review requested. No file was altered.',
      privacy: 'Privacy review requested. Current browser context is being checked where available.',
      popup: 'Pop-up review requested. No page-wide blocking claim is being made.',
      cleanup: 'Cleanup opened. Sentinel will preview changes before anything is removed.'
    };
    $('shield-state').textContent = 'CHECKING';
    $('cat-title').textContent = 'Purr… checking the evidence.';
    $('cat-message').textContent = labels[type] || 'Sentinel is checking available context.';
    $('evidence').innerHTML = '<span class="dot neutral"></span><span>Evidence requested — no automatic verdict</span>';
    send({ type: 'SENTINEL_ACTION', action: type, tabId: tab?.id, url: tab?.url });
    setTimeout(() => { $('shield-state').textContent = 'READY'; }, 700);
  }

  document.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', () => action(btn.dataset.action)));
  document.querySelectorAll('[data-module]').forEach(btn => btn.addEventListener('click', () => say(`${btn.dataset.module}: module surface opened. Runtime status is reported only when the connected module provides evidence.`)));

  $('ask-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = $('ask-input');
    const question = input.value.trim();
    if (!question) return;
    say(question, true); input.value = '';
    const tab = await getTab();
    send({ type: 'SENTINEL_ASK', question, tabId: tab?.id, url: tab?.url });
    say('I can answer from the evidence and browser context actually available to me. An external AI connection is not claimed unless it is configured.');
  });

  $('home').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  (async () => {
    const tab = await getTab();
    renderContext(tab);
    try {
      const state = await api.storage.local.get(['sentinelShieldEnabled']);
      if (state?.sentinelShieldEnabled === false) {
        $('shield-state').textContent = 'PAUSED';
        $('cat-title').textContent = 'Purr… protection is paused.';
      }
    } catch {}
  })();
})();
