// Loon 资源解释器：仅补全 Trojan+WebSocket 且缺失 host 的节点
function parse(resource) {
    const lines = resource.split('\n');
    const result = [];

    for (let line of lines) {
        // 1. 必须是 trojan 节点
        const isTrojan = /^trojan\s*=/i.test(line);
        
        // 2. 必须是 WebSocket 传输 (Loon格式通常为 ws=true)
        const isWs = /,\s*ws\s*=\s*true/i.test(line);
        
        // 3. 必须缺失 host 参数 (不存在host= 或 host=后面为空)
        const missingHost = !/,\s*host\s*=\s*[^,\s]+/i.test(line);
        
        if (isTrojan && isWs && missingHost) {
            // 提取 sni 的值
            const sniMatch = line.match(/,\s*sni\s*=\s*([^,\s]+)/i);
            if (sniMatch && sniMatch[1]) {
                const sniValue = sniMatch[1].trim();
                // 清理行尾空白后追加 host
                line = line.replace(/\s*$/, '') + ', host=' + sniValue;
            }
        }
        
        result.push(line);
    }

    return result.join('\n');
}
