import { CLEAN_PARAMS } from './constants.js';

export function cleanUrl(input, params = CLEAN_PARAMS) {
  const url = new URL(input);
  for (const key of [...url.searchParams.keys()]) {
    if (params.includes(key.toLowerCase())) url.searchParams.delete(key);
  }
  return url.toString();
}

export function cleanHref(href) {
  try { return cleanUrl(href); } catch { return href; }
}
