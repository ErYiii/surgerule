function operator(proxies = []) {
  return proxies.map(proxy => {
    if (proxy.type === 'trojan') {
      const net = String(proxy.network || '').toLowerCase();
      if (net === 'ws') {
        // 补充 host
        const sni = proxy.sni || proxy.servername || proxy.serverName;
        if (sni) {
          proxy.host = sni;
        }
        // 将 network 替换为 transport
        proxy.transport = 'ws';
        delete proxy.network;
      }
    }
    return proxy;
  });
}