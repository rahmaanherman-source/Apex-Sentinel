const STYLE_ID = 'apex-sentinel-aura';

export function applyAura() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `:root{color-scheme:dark!important}html{background:#0a0a0a!important}body{background:#0a0a0a!important;color:#e8e8e8!important}body a{color:#8ab4ff!important}body img,body video{filter:brightness(.92)!important}`;
  (document.head || document.documentElement).appendChild(style);
}

export function removeAura() { document.getElementById(STYLE_ID)?.remove(); }
