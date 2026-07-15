// ============================================================
// PRINCIPAL    : RAHMANN MANZAR EL HERMAN
// ENTITY       : Make It All Count LLC / Apex Global LLC
// PATENT       : USPTO Provisional #63/940,186
// PHONE        : 312-307-6355
// EMAIL        : rahmaanherman@icloud.com
// DOMAIN       : apexlifeglobal.com
// DATE         : 2026-06-28
// DESCRIPTION  : APEX SENTINEL — Content Script
// ============================================================

'use strict';

// ============================================================
// CONTENT SCRIPT INITIALIZATION
// ============================================================

(function() {
  console.log('[APEX SENTINEL] Content script loaded on:', window.location.href);
  
  // Mark page as protected by Apex Sentinel
  const meta = document.createElement('meta');
  meta.name = 'apex-sentinel-protection';
  meta.content = 'active';
  document.head.appendChild(meta);
  
  // Initialize protection features
  initializeProtection();
  monitorPageChanges();
  
})();

// ============================================================
// PROTECTION INITIALIZATION
// ============================================================

function initializeProtection() {
  // Block known tracking scripts
  blockTrackingScripts();
  
  // Monitor form submissions for privacy
  monitorFormSubmissions();
  
  // Detect and warn about suspicious elements
  detectSuspiciousElements();
  
  console.log('[APEX SENTINEL] Protection features initialized');
}

// ============================================================
// TRACKING SCRIPT BLOCKING
// ============================================================

function blockTrackingScripts() {
  const trackingPatterns = [
    /google-analytics\.com/i,
    /googletagmanager\.com/i,
    /doubleclick\.net/i,
    /facebook\.com\/tr/i,
    /connect\.facebook\.net/i,
    /hotjar\.com/i,
    /mouseflow\.com/i,
    /crazyegg\.com/i
  ];
  
  // Monitor script additions
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'SCRIPT' && node.src) {
          for (const pattern of trackingPatterns) {
            if (pattern.test(node.src)) {
              console.warn('[APEX SENTINEL] Blocked tracking script:', node.src);
              node.remove();
              break;
            }
          }
        }
      });
    });
  });
  
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

// ============================================================
// FORM SUBMISSION MONITORING
// ============================================================

function monitorFormSubmissions() {
  document.addEventListener('submit', (event) => {
    const form = event.target;
    
    // Check if form contains sensitive fields
    const hasSensitiveFields = checkForSensitiveFields(form);
    
    if (hasSensitiveFields && !isSecureConnection()) {
      console.warn('[APEX SENTINEL] Warning: Sensitive data submitted over insecure connection');
      
      // Optionally block submission (commented out for user control)
      // event.preventDefault();
      // alert('APEX SENTINEL: This form contains sensitive data but is not using a secure connection (HTTPS).');
    }
  }, true);
}

function checkForSensitiveFields(form) {
  const sensitivePatterns = [
    /password/i,
    /credit[_-]?card/i,
    /cvv/i,
    /ssn/i,
    /social[_-]?security/i,
    /bank/i
  ];
  
  const inputs = form.querySelectorAll('input, textarea');
  
  for (const input of inputs) {
    const name = input.name || input.id || '';
    const type = input.type || '';
    
    if (type === 'password') return true;
    
    for (const pattern of sensitivePatterns) {
      if (pattern.test(name)) return true;
    }
  }
  
  return false;
}

function isSecureConnection() {
  return window.location.protocol === 'https:';
}

// ============================================================
// SUSPICIOUS ELEMENT DETECTION
// ============================================================

function detectSuspiciousElements() {
  // Check for elements that might be phishing attempts
  const links = document.querySelectorAll('a[href]');
  
  links.forEach((link) => {
    const href = link.href;
    const text = link.textContent.trim();
    
    // Check if displayed URL doesn't match actual URL (potential phishing)
    if (isSuspiciousLink(href, text)) {
      console.warn('[APEX SENTINEL] Suspicious link detected:', href);
      
      // Add visual indicator
      link.style.border = '2px solid red';
      link.title = 'APEX SENTINEL: This link may be suspicious';
    }
  });
}

function isSuspiciousLink(href, text) {
  try {
    const url = new URL(href);
    
    // Check if text looks like a URL but doesn't match href
    const urlPattern = /^https?:\/\//i;
    if (urlPattern.test(text)) {
      const textUrl = new URL(text);
      if (textUrl.hostname !== url.hostname) {
        return true;
      }
    }
    
    // Check for known suspicious patterns
    const suspiciousPatterns = [
      /bit\.ly/i,
      /tinyurl/i,
      /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(url.hostname));
  } catch {
    return false;
  }
}

// ============================================================
// PAGE CHANGE MONITORING
// ============================================================

function monitorPageChanges() {
  // Re-check for threats when page content changes (for SPAs)
  const observer = new MutationObserver((mutations) => {
    // Debounce: only check after significant changes
    clearTimeout(window.apexSentinelCheckTimeout);
    window.apexSentinelCheckTimeout = setTimeout(() => {
      detectSuspiciousElements();
    }, 1000);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// ============================================================
// COMMUNICATION WITH BACKGROUND SCRIPT
// ============================================================

// Listen for messages from background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkPage') {
    const result = {
      url: window.location.href,
      isSecure: isSecureConnection(),
      hasSensitiveForms: document.querySelector('input[type="password"]') !== null
    };
    
    sendResponse(result);
    return true;
  }
});

// ============================================================
// PAGE PROTECTION STATUS
// ============================================================

// Add visual indicator that page is protected (subtle)
function addProtectionIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'apex-sentinel-indicator';
  indicator.textContent = '🛡️';
  indicator.title = 'Protected by APEX SENTINEL';
  
  // Styles will be injected via content.css
  document.body.appendChild(indicator);
}

// Add indicator when page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addProtectionIndicator);
} else {
  addProtectionIndicator();
}

console.log('[APEX SENTINEL] Content script active. GODSPEED.');
