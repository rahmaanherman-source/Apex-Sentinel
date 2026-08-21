export const DEFAULT_STATE = { shield: true, cleanse: true, aura: true, blocked: 0, siteAura: {} };

export const CLEAN_PARAMS = [
  'utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id',
  'fbclid','gclid','msclkid','dclid','gbraid','wbraid','ttclid','twclid',
  'li_fat_id','mc_cid','mc_eid','_hsenc','_hsmi','hsCtaTracking','vero_conv',
  'vero_id','yclid','igshid','s_kwcid','wickedid','wt_mc','trkCampaign',
  'trkAdGroup','trkCreative','trkDevice','trkKeyword','trkPlacement','ref','source'
];

export const MESSAGE = {
  GET_STATE: 'getState',
  TOGGLE_SHIELD: 'toggleShield',
  TOGGLE_CLEANSE: 'toggleCleanse',
  TOGGLE_AURA: 'toggleAura',
  SET_SITE_AURA: 'setSiteAura'
};
