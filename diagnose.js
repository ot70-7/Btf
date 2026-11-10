import {
  $,
  chooseWallet,
  connectWallet,
  describeEnvironment,
  detectProviders,
  el,
  setStatus,
  toast
} from "./chunk-CECUWWW6.js";
import "./chunk-Y7EOAKKY.js";
import "./chunk-5MXUSYBM.js";

// src/diagnose.js
var env = describeEnvironment();
function yes(flag) {
  return el("td", { text: flag ? "\u2713" : "\u2014" });
}
$("#candidates").replaceChildren(
  ...env.candidates.length ? env.candidates.map(
    (item) => el(
      "tr",
      {},
      el("td", { text: `${item.path}` }),
      yes(item.capabilities?.connect),
      yes(item.capabilities?.request),
      yes(item.capabilities?.signAndSendTransaction),
      yes(item.capabilities?.signTransaction)
    )
  ) : [el("tr", {}, el("td", { colspan: "5", text: "\u6CA1\u6709\u63A2\u6D4B\u5230\u4EFB\u4F55\u6CE8\u5165\u5BF9\u8C61" }))]
);
$("#hint").textContent = env.candidates.length ? "\u53EA\u6709\u5F53\u67D0\u4E00\u884C\u7684 connect \u6216 request \u4E3A \u2713 \u65F6\uFF0C\u9875\u9762\u624D\u80FD\u5524\u8D77\u8BE5\u94B1\u5305\u3002" : "\u5F53\u524D\u73AF\u5883\u6CA1\u6709\u6CE8\u5165 Solana \u94B1\u5305\uFF0C\u8BF7\u786E\u8BA4\u662F\u5728\u94B1\u5305 App \u7684 DApp \u6D4F\u89C8\u5668\u4E2D\u6253\u5F00\u3002";
$("#standard").replaceChildren(
  ...env.standard.length ? env.standard.map(
    (wallet) => el("div", {
      class: "kv__row kv__row--stack",
      text: `${wallet.name ?? "\u672A\u77E5"}\uFF5C${wallet.error ? "\u8BFB\u53D6\u5931\u8D25" : (wallet.features ?? []).join(", ")}`
    })
  ) : [el("p", { class: "small muted", text: "navigator.wallets \u4E3A\u7A7A\uFF08\u8BE5\u94B1\u5305\u672A\u6CE8\u518C Wallet Standard\uFF09" })]
);
$("#raw").textContent = JSON.stringify(env, null, 2);
$("#copy-report").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(env, null, 2));
    toast("\u8BCA\u65AD\u4FE1\u606F\u5DF2\u590D\u5236", "ok");
  } catch {
    toast("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u957F\u6309\u9009\u4E2D\u4E0B\u9762\u7684\u539F\u59CB\u4FE1\u606F", "error");
  }
});
$("#try-connect").addEventListener("click", async () => {
  const usable = detectProviders();
  if (usable.length === 0) {
    toast("\u6CA1\u6709\u53EF\u7528\u94B1\u5305\uFF1A\u4E0A\u9762\u8868\u683C\u91CC connect/request \u5168\u90E8\u4E3A\u7A7A", "error", 9e3);
    return;
  }
  try {
    const wallet = await connectWallet({ choose: chooseWallet });
    setStatus(`\u8FDE\u63A5\u6210\u529F\uFF1A${wallet.label} \xB7 ${wallet.publicKey.toBase58()}`, "ok");
  } catch (error) {
    setStatus(`\u8FDE\u63A5\u5931\u8D25\uFF1A${error.message}`, "error");
    toast(error.message, "error", 9e3);
  }
});
//# sourceMappingURL=diagnose.js.map
