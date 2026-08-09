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

a = {
  "name": "美国-TROJAN-66",
  "type": "trojan",
  "server": "123.dnscloudcloud.top",
  "port": 443,
  "password": "16e55eb5-7270-4922-aafa-dcf8b5ca2dfe",
  "udp": true,
  "skip-cert-verify": false,
  "sni": "618419.123925.xyz",
  "network": "ws",
  "ws-opts": {
    "path": "/answer"
  },
  "tls": true,
  "id": 11,
  "block-quic": "on",
}
// 1. 调用函数并传入参数 a（注意要放在数组里，因为函数定义是 proxies = [a]）
const result = operator([a]);

// 2. 将结果打印到控制台
console.log(JSON.stringify(result, null, 2));