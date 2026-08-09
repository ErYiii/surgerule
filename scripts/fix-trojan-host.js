async function operator(proxies, targetPlatform, context) {
  return proxies.map(proxy => {
    if (proxy.type === 'trojan') {
      const network = String(proxy.network || '').toLowerCase();
      if (network === 'ws' || network === 'websocket') {
        const sni = proxy.sni || proxy.servername || proxy.serverName;
        if (sni) {
          proxy.host = sni;
        }
      }
    }
    return proxy;
  });
}