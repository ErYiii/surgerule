function operator(proxies = []) {
  return proxies.map(proxy => {
    if (proxy.type === 'trojan') {
      const net = String(proxy.network || '').toLowerCase();
      if (net === 'ws') {
        const sni = proxy.sni || proxy.servername || proxy.serverName;
        if (sni) {
          proxy.host = sni;
        }
      }
    }
    return proxy;
  });
}
