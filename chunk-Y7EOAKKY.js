// src/lib/config.js
var CONFIG_KEY = "__AURA_CONFIG__";
function getConfig() {
  const config = globalThis[CONFIG_KEY];
  if (!config) {
    throw new Error("\u914D\u7F6E\u672A\u6CE8\u5165\uFF1A\u8BF7\u4F7F\u7528 npm run build \u6784\u5EFA\u540E\u518D\u6253\u5F00\u9875\u9762");
  }
  return config;
}
function getTiers() {
  return getConfig().staking.tiers;
}

export {
  getConfig,
  getTiers
};
//# sourceMappingURL=chunk-Y7EOAKKY.js.map
