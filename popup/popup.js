// ============================================================
// PRINCIPAL    : RAHMANN MANZAR EL HERMAN
// ENTITY       : Make It All Count LLC / Apex Global LLC
// PATENT       : USPTO Provisional #63/940,186
// PHONE        : 312-307-6355
// EMAIL        : rahmaanherman@icloud.com
// DOMAIN       : apexlifeglobal.com
// DATE         : 2026-06-28
// DESCRIPTION  : APEX SENTINEL — Popup Logic
// ============================================================

'use strict';

// ============================================================
// DOM ELEMENTS
// ============================================================

const elements = {
  statusDot: document.getElementById('statusDot'),
  statusText: document.getElementById('statusText'),
  sovereignToggle: document.getElementById('sovereignToggle'),
  trackersBlocked: document.getElementById('trackersBlocked'),
  cookiesBlocked: document.getElementById('cookiesBlocked'),
  threatsDetected: document.getElementById('threatsDetected'),
  toggleBtn: document.getElementById('toggleBtn'),
  toggleBtnText: document.getElementById('toggleBtnText'),
  resetBtn: document.getElementById('resetBtn')
};

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('[APEX SENTINEL] Popup initialized');
  loadStats();
  setupEventListeners();
});

// ============================================================
// LOAD STATISTICS
// ============================================================

async function loadStats() {
  try {
    const response = await browser.runtime.sendMessage({ action: 'getStats' });
    
    if (response) {
      updateUI(response);
    }
  } catch (error) {
    console.error('[APEX SENTINEL] Error loading stats:', error);
  }
}

function updateUI(data) {
  // Update stats
  if (data.stats) {
    elements.trackersBlocked.textContent = data.stats.trackersBlocked || 0;
    elements.cookiesBlocked.textContent = data.stats.cookiesBlocked || 0;
    elements.threatsDetected.textContent = data.stats.threatsDetected || 0;
  }
  
  // Update status
  if (data.enabled !== undefined) {
    updateStatus(data.enabled);
  }
  
  // Update sovereign mode toggle
  if (data.sovereignMode !== undefined) {
    elements.sovereignToggle.checked = data.sovereignMode;
  }
}

function updateStatus(enabled) {
  if (enabled) {
    elements.statusDot.classList.add('active');
    elements.statusText.textContent = 'ACTIVE';
    elements.statusText.style.color = '#00ff00';
    elements.toggleBtnText.textContent = 'Disable Protection';
  } else {
    elements.statusDot.classList.remove('active');
    elements.statusText.textContent = 'DISABLED';
    elements.statusText.style.color = '#ff0000';
    elements.toggleBtnText.textContent = 'Enable Protection';
  }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

function setupEventListeners() {
  // Toggle protection on/off
  elements.toggleBtn.addEventListener('click', async () => {
    try {
      const response = await browser.runtime.sendMessage({ action: 'toggleEnabled' });
      if (response) {
        updateStatus(response.enabled);
        showNotification(response.enabled ? 'Protection Enabled' : 'Protection Disabled');
      }
    } catch (error) {
      console.error('[APEX SENTINEL] Error toggling protection:', error);
    }
  });
  
  // Sovereign mode toggle
  elements.sovereignToggle.addEventListener('change', async () => {
    try {
      const response = await browser.runtime.sendMessage({ action: 'toggleSovereignMode' });
      if (response) {
        showNotification(response.sovereignMode ? 'Sovereign Mode Enabled' : 'Sovereign Mode Disabled');
      }
    } catch (error) {
      console.error('[APEX SENTINEL] Error toggling sovereign mode:', error);
    }
  });
  
  // Reset statistics
  elements.resetBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to reset all statistics?')) {
      try {
        const response = await browser.runtime.sendMessage({ action: 'resetStats' });
        if (response && response.success) {
          elements.trackersBlocked.textContent = '0';
          elements.cookiesBlocked.textContent = '0';
          elements.threatsDetected.textContent = '0';
          showNotification('Statistics Reset');
        }
      } catch (error) {
        console.error('[APEX SENTINEL] Error resetting stats:', error);
      }
    }
  });
}

// ============================================================
// NOTIFICATIONS
// ============================================================

function showNotification(message) {
  // Create temporary notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 255, 0, 0.9);
    color: #000;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
    z-index: 1000;
    animation: slideDown 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

// ============================================================
// AUTO-REFRESH STATS
// ============================================================

// Refresh stats every 5 seconds
setInterval(loadStats, 5000);

console.log('[APEX SENTINEL] Popup script loaded. GODSPEED.');
