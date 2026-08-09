async function operator(proxies, targetPlatform, context) {
  return proxies.map(proxy => {
    // === 新增：节点重命名规则 ===
    if (proxy.name === '美国-HY2-55' && proxy.server === 'linsg1.dnscloudcloud.top') {
      proxy.name = '狮城-HY2-55';
    }
    if (proxy.name === '新加坡-HY2-56' && proxy.server === 'linjp1.dnscloudcloud.top') {
      proxy.name = '日本-HY2-56';
    }

    // === 原有：Trojan+WS 补充 host ===
    if (proxy.type === 'trojan') {
      const network = String(proxy.network || '').toLowerCase();
      if (network === 'ws' || network === 'websocket') {
        const sni = proxy.sni || proxy.servername || proxy.serverName;
        if (sni) {
          if (!proxy['ws-opts']) proxy['ws-opts'] = {};
          if (!proxy['ws-opts'].headers) proxy['ws-opts'].headers = {};
          proxy['ws-opts'].headers.Host = sni;
        }
      }
    }

    return proxy;
  });
}