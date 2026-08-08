function main(config) {
  return config.split('\n').map(line => {
    const trimmed = line.trim();
    
    // 跳过空行和注释
    if (!trimmed || trimmed.startsWith('#')) return line;
    
    // 只处理 Trojan + WebSocket 且缺少 host 的节点
    const isTrojan = /^[^=]+=\s*trojan,/.test(trimmed);
    const hasWs = trimmed.includes('transport=ws') || trimmed.includes('ws=true');
    const hasHost = trimmed.includes('host=');
    
    if (isTrojan && hasWs && !hasHost) {
      const sniMatch = trimmed.match(/sni=([^,\s]+)/);
      if (sniMatch) {
        const sniValue = sniMatch[1];
        // 在 sni 参数后面插入 host=xxx
        return trimmed.replace(/(sni=[^,\s]+)/, `$1,host=${sniValue}`);
      }
    }
    
    return line;
  }).join('\n');
}
