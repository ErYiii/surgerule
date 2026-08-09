function operator(proxies = []) {
  return proxies.map(proxy => {
    // 仅处理 Trojan 协议节点
    if (proxy.type === 'trojan') {
      // 判断是否使用了 WebSocket 传输
      // 兼容 Sub-Store 中可能使用的 network / transport 两种字段名
      const network = String(proxy.network || proxy.transport || '').toLowerCase();
      const isWS = network === 'ws' || network === 'websocket';
      
      if (isWS) {
        // 获取 SNI 值（兼容 sni / servername / serverName 等可能的字段名）
        const sni = proxy.sni || proxy.servername || proxy.serverName;
        
        // 如果节点缺少 host 但存在 sni，则将 sni 的值赋给 host
        if (!proxy.host && sni) {
          proxy.host = sni;
        }
      }
    }
    return proxy;
  });
}
