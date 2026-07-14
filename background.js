// ============================================================
// PRINCIPAL    : RAHMANN MANZAR EL HERMAN
// ENTITY       : Make It All Count LLC / Apex Global LLC
// PATENT       : USPTO Provisional #63/940,186
// PHONE        : 312-307-6355
// EMAIL        : rahmaanherman@icloud.com
// DOMAIN       : apexlifeglobal.com
// DATE         : 2026-06-28
// DESCRIPTION  : APEX SENTINEL — Background Service Worker
// ============================================================

'use strict';

// ============================================================
// CONSTANTS & CONFIGURATION
// ============================================================

const APEX_CONFIG = {
  version: '1.0.4',
  name: 'APEX SENTINEL',
  mode: 'sovereign',
  privacyLevel: 'maximum',
  trackingProtection: true,
  securityMonitoring: true
};

// ============================================================
// EXTENSION LIFECYCLE
// ============================================================

// Extension installation/update handler
browser.runtime.onInstalled.addListener((details) => {
  console.log('[APEX SENTINEL] Extension installed/updated:', details.reason);
  
  if (details.reason === 'install') {
    initializeExtension();
  } else if (details.reason === 'update') {
    handleUpdate(details.previousVersion);
  }
});

// Extension startup handler
browser.runtime.onStartup.addListener(() => {
  console.log('[APEX SENTINEL] Extension started');
  activatePrivacyProtection();
  activateSecurityMonitoring();
});

// ============================================================
// INITIALIZATION
// ============================================================

async function initializeExtension() {
  console.log('[APEX SENTINEL] Initializing extension...');
  
  // Set default configuration
  await browser.storage.local.set({
    config: APEX_CONFIG,
    stats: {
      trackersBlocked: 0,
      cookiesBlocked: 0,
      threatsDetected: 0,
      activationDate: Date.now()
    },
    enabled: true,
    sovereignMode: true
  });
  
  // Activate privacy and security features
  activatePrivacyProtection();
  activateSecurityMonitoring();
  
  console.log('[APEX SENTINEL] Initialization complete. System is ACTIVE.');
}

async function handleUpdate(previousVersion) {
  console.log(`[APEX SENTINEL] Updated from ${previousVersion} to ${APEX_CONFIG.version}`);
  
  // Preserve existing stats but update config
  const stored = await browser.storage.local.get(['stats']);
  await browser.storage.local.set({
    config: APEX_CONFIG,
    stats: stored.stats || {
      trackersBlocked: 0,
      cookiesBlocked: 0,
      threatsDetected: 0,
      activationDate: Date.now()
    }
  });
}

// ============================================================
// PRIVACY PROTECTION
// ============================================================

function activatePrivacyProtection() {
  console.log('[APEX SENTINEL] Privacy protection ACTIVE');
  
  // Monitor web requests for tracking attempts
  if (browser.webRequest) {
    browser.webRequest.onBeforeRequest.addListener(
      handleWebRequest,
      { urls: ['<all_urls>'] },
      ['blocking']
    );
  }
}

function handleWebRequest(details) {
  // Common tracking domains to block
  const trackingDomains = [
    'google-analytics.com',
    'doubleclick.net',
    'facebook.com/tr',
    'connect.facebook.net',
    'googletagmanager.com',
    'hotjar.com',
    'mouseflow.com',
    'crazyegg.com'
  ];
  
  const url = new URL(details.url);
  
  // Block known tracking domains
  for (const domain of trackingDomains) {
    if (url.hostname.includes(domain)) {
      incrementStat('trackersBlocked');
      console.log('[APEX SENTINEL] Blocked tracker:', url.hostname);
      return { cancel: true };
    }
  }
  
  return { cancel: false };
}

// ============================================================
// SECURITY MONITORING
// ============================================================

function activateSecurityMonitoring() {
  console.log('[APEX SENTINEL] Security monitoring ACTIVE');
  
  // Monitor for suspicious navigation patterns
  if (browser.webNavigation) {
    browser.webNavigation.onBeforeNavigate.addListener(handleNavigation);
  }
  
  // Monitor cookie access
  if (browser.cookies) {
    browser.cookies.onChanged.addListener(handleCookieChange);
  }
}

function handleNavigation(details) {
  const url = details.url;
  
  // Check for suspicious patterns
  if (isSuspiciousUrl(url)) {
    incrementStat('threatsDetected');
    console.warn('[APEX SENTINEL] Suspicious URL detected:', url);
    
    // Notify user through badge
    browser.action.setBadgeText({ text: '!', tabId: details.tabId });
    browser.action.setBadgeBackgroundColor({ color: '#FF0000', tabId: details.tabId });
  }
}

function handleCookieChange(changeInfo) {
  if (!changeInfo.removed && changeInfo.cause === 'explicit') {
    // Track third-party cookies
    const cookie = changeInfo.cookie;
    if (isThirdPartyCookie(cookie)) {
      incrementStat('cookiesBlocked');
      console.log('[APEX SENTINEL] Third-party cookie detected:', cookie.domain);
    }
  }
}

function isSuspiciousUrl(url) {
  try {
    const urlObj = new URL(url);
    
    // Check for known malicious patterns
    const suspiciousPatterns = [
      /phishing/i,
      /malware/i,
      /suspicious/i,
      /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // Raw IP addresses
      /data:text\/html/i // Data URLs can be used for phishing
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(url));
  } catch {
    return false;
  }
}

function isThirdPartyCookie(cookie) {
  // Simple heuristic: third-party cookies often have domain starting with '.'
  return cookie.domain.startsWith('.');
}

// ============================================================
// STATISTICS & STORAGE
// ============================================================

async function incrementStat(statName) {
  const stored = await browser.storage.local.get('stats');
  const stats = stored.stats || {};
  
  stats[statName] = (stats[statName] || 0) + 1;
  
  await browser.storage.local.set({ stats });
  
  // Update badge with total blocks
  const totalBlocks = (stats.trackersBlocked || 0) + (stats.cookiesBlocked || 0);
  if (totalBlocks > 0) {
    browser.action.setBadgeText({ text: String(totalBlocks) });
    browser.action.setBadgeBackgroundColor({ color: '#00FF00' });
  }
}

// ============================================================
// MESSAGE HANDLER
// ============================================================

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[APEX SENTINEL] Message received:', message);
  
  switch (message.action) {
    case 'getStats':
      browser.storage.local.get(['stats', 'config', 'enabled', 'sovereignMode'])
        .then(sendResponse);
      return true; // Indicates async response
      
    case 'toggleEnabled':
      browser.storage.local.get('enabled').then(stored => {
        const newState = !stored.enabled;
        browser.storage.local.set({ enabled: newState });
        sendResponse({ enabled: newState });
      });
      return true;
      
    case 'toggleSovereignMode':
      browser.storage.local.get('sovereignMode').then(stored => {
        const newState = !stored.sovereignMode;
        browser.storage.local.set({ sovereignMode: newState });
        sendResponse({ sovereignMode: newState });
      });
      return true;
      
    case 'resetStats':
      browser.storage.local.set({
        stats: {
          trackersBlocked: 0,
          cookiesBlocked: 0,
          threatsDetected: 0,
          activationDate: Date.now()
        }
      }).then(() => {
        browser.action.setBadgeText({ text: '' });
        sendResponse({ success: true });
      });
      return true;
      
    default:
      sendResponse({ error: 'Unknown action' });
      return false;
  }
});

// ============================================================
// APEX SENTINEL ACTIVATED
// ============================================================

console.log('[APEX SENTINEL] Background service worker loaded. GODSPEED.');
