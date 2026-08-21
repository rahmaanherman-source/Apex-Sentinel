export function matchesHost(hostname, domain) {
  const host = String(hostname || '').toLowerCase().replace(/^www\./, '');
  const target = String(domain || '').toLowerCase().replace(/^www\./, '');
  return host === target || host.endsWith(`.${target}`);
}

export function shouldBlock(url, domains) {
  try {
    const host = new URL(url).hostname;
    return domains.some((domain) => matchesHost(host, domain));
  } catch {
    return false;
  }
}
