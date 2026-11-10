import {
  getConfig
} from "./chunk-Y7EOAKKY.js";
import {
  Connection,
  PublicKey,
  VersionedTransaction
} from "./chunk-5MXUSYBM.js";

// src/lib/borsh.js
var Writer = class {
  constructor() {
    this.parts = [];
  }
  raw(bytes) {
    this.parts.push(Uint8Array.from(bytes));
    return this;
  }
  u8(value) {
    this.parts.push(Uint8Array.of(value & 255));
    return this;
  }
  bool(value) {
    return this.u8(value ? 1 : 0);
  }
  u16(value) {
    const b = new Uint8Array(2);
    new DataView(b.buffer).setUint16(0, Number(value), true);
    this.parts.push(b);
    return this;
  }
  u32(value) {
    const b = new Uint8Array(4);
    new DataView(b.buffer).setUint32(0, Number(value), true);
    this.parts.push(b);
    return this;
  }
  u64(value) {
    return this.big(value, 8, false);
  }
  u128(value) {
    return this.big(value, 16, false);
  }
  i64(value) {
    return this.big(value, 8, true);
  }
  big(value, size, signed) {
    const b = new Uint8Array(size);
    const view = new DataView(b.buffer);
    const v = BigInt(value);
    if (signed) {
      view.setBigInt64(0, v, true);
    } else if (size === 16) {
      view.setBigUint64(0, v & 0xffffffffffffffffn, true);
      view.setBigUint64(8, v >> 64n, true);
    } else {
      view.setBigUint64(0, v, true);
    }
    this.parts.push(b);
    return this;
  }
  pubkey(base58) {
    return this.raw(decodeBase58(base58));
  }
  bytes() {
    const total = this.parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const part of this.parts) {
      out.set(part, offset);
      offset += part.length;
    }
    return out;
  }
};
var Reader = class {
  constructor(bytes, offset = 0) {
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.offset = offset;
  }
  u8() {
    return this.bytes[this.offset++];
  }
  bool() {
    return this.u8() !== 0;
  }
  u16() {
    const v = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return v;
  }
  u32() {
    const v = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return v;
  }
  u64() {
    const v = this.view.getBigUint64(this.offset, true);
    this.offset += 8;
    return v;
  }
  u128() {
    const lo = this.view.getBigUint64(this.offset, true);
    const hi = this.view.getBigUint64(this.offset + 8, true);
    this.offset += 16;
    return hi << 64n | lo;
  }
  i64() {
    const v = this.view.getBigInt64(this.offset, true);
    this.offset += 8;
    return v;
  }
  pubkey() {
    const slice = this.bytes.slice(this.offset, this.offset + 32);
    this.offset += 32;
    return encodeBase58(slice);
  }
  rest() {
    return this.bytes.slice(this.offset);
  }
};
function discriminatorHex(bytes) {
  return Array.from(bytes.slice(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function encodeBase58(bytes) {
  let value = 0n;
  for (const byte of bytes) {
    value = value << 8n | BigInt(byte);
  }
  let out = "";
  while (value > 0n) {
    const mod = value % 58n;
    out = ALPHABET[Number(mod)] + out;
    value /= 58n;
  }
  for (const byte of bytes) {
    if (byte !== 0) break;
    out = "1" + out;
  }
  return out === "" ? "1" : out;
}
function decodeBase58(text) {
  let value = 0n;
  for (const char of text) {
    const index = ALPHABET.indexOf(char);
    if (index < 0) throw new Error(`invalid base58 character: ${char}`);
    value = value * 58n + BigInt(index);
  }
  const out = [];
  while (value > 0n) {
    out.unshift(Number(value % 256n));
    value /= 256n;
  }
  for (const char of text) {
    if (char !== "1") break;
    out.unshift(0);
  }
  const bytes = Uint8Array.from(out);
  if (bytes.length !== 32) {
    throw new Error(`expected a 32-byte address, got ${bytes.length} bytes`);
  }
  return bytes;
}

// src/lib/wallet.js
function getConnection() {
  const config = getConfig();
  const override = new URLSearchParams(window.location.search).get("rpc");
  if (override) {
    try {
      localStorage.setItem("aura.rpc", override);
    } catch {
    }
  }
  const rpc = localStorage.getItem("aura.rpc") || config.rpc;
  return new Connection(rpc, { commitment: "confirmed" });
}
var CANDIDATES = [
  { label: "Bitget Wallet", path: "bitgetWallet.solana", get: () => window.bitgetWallet?.solana },
  { label: "Bitget Wallet", path: "bitgetWallet.providers.solana", get: () => window.bitgetWallet?.providers?.solana },
  { label: "Bitget Wallet", path: "bitgetWallet.provider.solana", get: () => window.bitgetWallet?.provider?.solana },
  { label: "Bitget Wallet", path: "bitkeep.solana", get: () => window.bitkeep?.solana },
  { label: "Bitget Wallet", path: "bitgetWallet", get: () => window.bitgetWallet },
  { label: "Bitget Wallet", path: "bitkeep", get: () => window.bitkeep },
  { label: "Phantom", path: "phantom.solana", get: () => window.phantom?.solana },
  { label: "Solflare", path: "solflare", get: () => window.solflare },
  { label: "Backpack", path: "backpack", get: () => window.backpack },
  { label: "Solana \u94B1\u5305", path: "solana", get: () => window.solana }
];
function capabilities(object) {
  const has = (key) => typeof object?.[key] === "function";
  const connectable = has("connect") || has("request");
  return {
    connect: has("connect"),
    request: has("request"),
    signAndSendTransaction: has("signAndSendTransaction"),
    signTransaction: has("signTransaction"),
    connectable
  };
}
function describeEnvironment() {
  const found = [];
  for (const candidate of CANDIDATES) {
    let object;
    try {
      object = candidate.get();
    } catch (error) {
      found.push({ label: candidate.label, path: candidate.path, error: String(error) });
      continue;
    }
    if (!object) continue;
    let keys = [];
    try {
      keys = Object.keys(object).slice(0, 24);
    } catch {
      keys = [];
    }
    found.push({
      label: candidate.label,
      path: candidate.path,
      type: typeof object,
      capabilities: capabilities(object),
      keys
    });
  }
  const standard = [];
  try {
    for (const wallet of window?.navigator?.wallets?.get?.() ?? []) {
      standard.push({
        name: wallet.name,
        chains: wallet.chains,
        features: Object.keys(wallet.features ?? {})
      });
    }
  } catch (error) {
    standard.push({ name: "\u8BFB\u53D6\u5931\u8D25", error: String(error) });
  }
  return {
    url: window?.location?.href ?? "",
    userAgent: window?.navigator?.userAgent ?? "",
    candidates: found,
    standard,
    legacySolana: window.solana ? { present: true, isPhantom: Boolean(window.solana.isPhantom), isSolflare: Boolean(window.solana.isSolflare) } : { present: false }
  };
}
function detectProviders() {
  const options = [];
  const seen = /* @__PURE__ */ new Set();
  const add = (option) => {
    const key = option.label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    options.push(option);
  };
  for (const candidate of CANDIDATES) {
    let object;
    try {
      object = candidate.get();
    } catch {
      continue;
    }
    if (!object) continue;
    const caps = capabilities(object);
    if (!caps.connectable) continue;
    add({ kind: "legacy", label: candidate.label, provider: object, path: candidate.path });
  }
  for (const wallet of standardWallets()) {
    add({ kind: "standard", label: wallet.name || "Wallet Standard", wallet });
  }
  return options;
}
function standardWallets() {
  const registry = window?.navigator?.wallets;
  if (!registry || typeof registry.get !== "function") return [];
  return registry.get().filter((wallet) => {
    const features = wallet.features ?? {};
    return features["standard:connect"] && (features["solana:signAndSendTransaction"] || features["solana:signTransaction"]);
  });
}
function isMobileBrowser() {
  return /android|iphone|ipad|mobile/i.test(window?.navigator?.userAgent ?? "");
}
function walletHint() {
  const base = isMobileBrowser() ? "\u8BF7\u5728 Bitget Wallet \u7684\u300CDApp \u6D4F\u89C8\u5668\u300D\u4E2D\u6253\u5F00\u672C\u9875\u5730\u5740\uFF0C\u9875\u9762\u624D\u80FD\u5524\u8D77\u94B1\u5305\u7B7E\u540D\u3002" : "\u672A\u68C0\u6D4B\u5230\u94B1\u5305\u6269\u5C55\uFF0C\u8BF7\u5B89\u88C5 Bitget Wallet \u6216 Phantom \u6269\u5C55\u540E\u5237\u65B0\u672C\u9875\u3002";
  return `${base} \u4ECD\u8FDE\u4E0D\u4E0A\u53EF\u6253\u5F00 diagnose.html \u67E5\u770B\u94B1\u5305\u5B9E\u9645\u66B4\u9732\u7684\u63A5\u53E3\u3002`;
}
async function connectWallet({ choose } = {}) {
  const options = detectProviders();
  if (options.length === 0) {
    const env = describeEnvironment();
    const injected = env.candidates.map((item) => item.path).join("\u3001");
    throw new Error(
      injected ? `\u68C0\u6D4B\u5230\u6CE8\u5165\u5BF9\u8C61\uFF08${injected}\uFF09\uFF0C\u4F46\u90FD\u6CA1\u6709\u53EF\u7528\u7684 connect/request \u65B9\u6CD5\u3002\u8BF7\u6253\u5F00 diagnose.html \u67E5\u770B\u8BE6\u7EC6\u63A5\u53E3\uFF0C\u6216\u6539\u7528 Wallet Standard \u94B1\u5305\u3002` : walletHint()
    );
  }
  let option = options[0];
  if (options.length > 1) {
    option = choose ? await choose(options) : options[0];
    if (!option) throw new Error("\u672A\u9009\u62E9\u94B1\u5305");
  }
  if (option.kind === "standard") {
    const wallet = option.wallet;
    const connected = await wallet.features["standard:connect"].connect();
    const account = connected?.accounts?.[0] ?? wallet.accounts?.[0];
    if (!account?.address) throw new Error(`${option.label} \u672A\u8FD4\u56DE\u8D26\u6237`);
    const publicKey = new PublicKey(account.address);
    return { kind: "standard", label: option.label, wallet, account, publicKey };
  }
  const provider = option.provider;
  let response;
  if (typeof provider.connect === "function") {
    response = await provider.connect();
  } else if (typeof provider.request === "function") {
    response = await provider.request({ method: "connect" });
  } else {
    throw new Error(`${option.label} \u4E0D\u652F\u6301\u8FDE\u63A5`);
  }
  const raw = response?.publicKey ?? provider.publicKey ?? response;
  if (!raw) throw new Error(`${option.label} \u8FDE\u63A5\u5931\u8D25`);
  const address = raw.toBase58 ? raw.toBase58() : String(raw);
  return { kind: "legacy", label: option.label, provider, publicKey: new PublicKey(address) };
}
async function signAndSend(connection, transaction, wallet, { signers = [] } = {}) {
  transaction.feePayer = wallet.publicKey;
  const latest = await connection.getLatestBlockhash("confirmed");
  transaction.recentBlockhash = latest.blockhash;
  transaction.lastValidBlockHeight = latest.lastValidBlockHeight;
  for (const signer of signers) {
    transaction.partialSign(signer);
  }
  const signature = await requestSignature(connection, transaction, wallet);
  const confirmation = await connection.confirmTransaction(
    { signature, blockhash: latest.blockhash, lastValidBlockHeight: latest.lastValidBlockHeight },
    "confirmed"
  );
  if (confirmation.value.err) {
    throw new Error(`\u4EA4\u6613\u5931\u8D25\uFF1A${JSON.stringify(confirmation.value.err)}`);
  }
  return signature;
}
async function requestSignature(connection, transaction, wallet) {
  if (wallet.kind === "standard") {
    const features = wallet.wallet.features;
    const input = {
      account: wallet.account,
      chain: "solana:mainnet",
      transaction: new Uint8Array(transaction.serialize({ requireAllSignatures: false }))
    };
    if (features["solana:signAndSendTransaction"]) {
      const outputs2 = await features["solana:signAndSendTransaction"].signAndSendTransaction(input);
      const first2 = Array.isArray(outputs2) ? outputs2[0] : outputs2;
      return normalizeSignature(first2?.signature ?? first2);
    }
    const signFeature = features["solana:signTransaction"];
    if (!signFeature) throw new Error("\u8BE5\u94B1\u5305\u4E0D\u652F\u6301\u7B7E\u540D");
    const outputs = await signFeature.signTransaction(input);
    const first = Array.isArray(outputs) ? outputs[0] : outputs;
    if (!first?.signedTransaction) throw new Error("\u94B1\u5305\u672A\u8FD4\u56DE\u7B7E\u540D\u4EA4\u6613");
    const signed = VersionedTransaction.deserialize(new Uint8Array(first.signedTransaction));
    return connection.sendRawTransaction(signed.serialize(), { maxRetries: 3 });
  }
  const provider = wallet.provider;
  if (typeof provider.signAndSendTransaction === "function") {
    const result = await provider.signAndSendTransaction(transaction);
    return normalizeSignature(result);
  }
  if (typeof provider.signTransaction === "function") {
    const signed = await provider.signTransaction(transaction);
    return connection.sendRawTransaction(signed.serialize(), { maxRetries: 3 });
  }
  if (typeof provider.request === "function") {
    const result = await provider.request({
      method: "signAndSendTransaction",
      params: { message: transaction.serialize({ requireAllSignatures: false }).toString("base64") }
    });
    return normalizeSignature(result);
  }
  throw new Error("\u8BE5\u94B1\u5305\u4E0D\u652F\u6301\u7B7E\u540D");
}
function normalizeSignature(value, depth = 0) {
  if (value === null || value === void 0) throw new Error("\u94B1\u5305\u672A\u8FD4\u56DE\u7B7E\u540D");
  if (depth > 3) throw new Error("\u65E0\u6CD5\u89E3\u6790\u94B1\u5305\u8FD4\u56DE\u7684\u7B7E\u540D");
  if (typeof value === "string") {
    const text = value.trim();
    if (/^[1-9A-HJ-NP-Za-km-z]{80,90}$/.test(text)) return text;
    const bytes = decodeBase64(text);
    if (bytes && bytes.length === 64) return encodeBase58(bytes);
    if (/^[1-9A-HJ-NP-Za-km-z]{60,90}$/.test(text)) return text;
    throw new Error(`\u94B1\u5305\u8FD4\u56DE\u7684\u7B7E\u540D\u65E0\u6CD5\u8BC6\u522B\uFF08\u957F\u5EA6 ${text.length}\uFF09`);
  }
  if (value instanceof Uint8Array) return encodeBase58(value);
  if (Array.isArray(value)) return encodeBase58(Uint8Array.from(value));
  if (typeof value === "object") {
    if (value.signature !== void 0) return normalizeSignature(value.signature, depth + 1);
    if (value.signedTransaction !== void 0) {
      throw new Error("\u94B1\u5305\u8FD4\u56DE\u4E86\u5DF2\u7B7E\u540D\u4EA4\u6613\u800C\u4E0D\u662F\u7B7E\u540D\uFF0C\u8BF7\u6539\u7528 signTransaction \u6D41\u7A0B");
    }
  }
  throw new Error("\u94B1\u5305\u672A\u8FD4\u56DE\u53EF\u7528\u7B7E\u540D");
}
function decodeBase64(text) {
  try {
    if (typeof Buffer !== "undefined") return Uint8Array.from(Buffer.from(text, "base64"));
    const binary = atob(text);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  } catch {
    return null;
  }
}

// src/lib/ui.js
function $(selector, root = document) {
  return root.querySelector(selector);
}
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value === null || value === void 0 || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "dataset") {
      Object.assign(node.dataset, value);
    } else {
      node.setAttribute(key, value === true ? "" : String(value));
    }
  }
  for (const child of children.flat()) {
    if (child === null || child === void 0 || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}
function toast(message, kind = "info", timeout = 5200) {
  const host = $("#toasts");
  if (!host) return;
  const item = el("div", { class: `toast toast--${kind}`, text: message });
  host.append(item);
  setTimeout(() => item.remove(), timeout);
}
function chooseWallet(options) {
  return new Promise((resolve) => {
    const overlay = el("div", { class: "modal" });
    const finish = (value) => {
      overlay.remove();
      resolve(value);
    };
    const card = el(
      "div",
      { class: "modal__card" },
      el("h2", { class: "modal__title", text: "\u9009\u62E9\u94B1\u5305" }),
      el("p", { class: "modal__subtitle", text: "\u68C0\u6D4B\u5230\u591A\u4E2A\u94B1\u5305\uFF0C\u8BF7\u9009\u62E9\u672C\u6B21\u7528\u4E8E\u7B7E\u540D\u7684\u94B1\u5305\u3002" }),
      el(
        "div",
        { class: "stack" },
        options.map(
          (option) => el("button", { class: "btn btn--ghost", type: "button", onclick: () => finish(option) }, option.label)
        )
      ),
      el(
        "div",
        { class: "modal__actions" },
        el("button", { class: "btn btn--ghost", type: "button", onclick: () => finish(null) }, "\u53D6\u6D88")
      )
    );
    overlay.append(card);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) finish(null);
    });
    document.body.append(overlay);
  });
}
function reviewTransaction({ title, subtitle, rows = [], risks = [], confirmLabel = "\u5728\u94B1\u5305\u4E2D\u786E\u8BA4" }) {
  return new Promise((resolve) => {
    const overlay = el("div", { class: "modal" });
    const close = (value) => {
      overlay.remove();
      resolve(value);
    };
    const card = el(
      "div",
      { class: "modal__card" },
      el("h2", { class: "modal__title", text: title }),
      subtitle ? el("p", { class: "modal__subtitle", text: subtitle }) : null,
      el(
        "dl",
        { class: "kv" },
        rows.map(
          ([label, value]) => el("div", { class: "kv__row" }, el("dt", { text: label }), el("dd", { text: String(value) }))
        )
      ),
      risks.length ? el(
        "div",
        { class: "risk" },
        el("h3", { text: "\u98CE\u9669\u4E0E\u4E0D\u53EF\u9006\u6027" }),
        el("ul", {}, risks.map((risk) => el("li", { text: risk })))
      ) : null,
      el(
        "div",
        { class: "modal__actions" },
        el("button", { class: "btn btn--ghost", type: "button", onclick: () => close(false) }, "\u53D6\u6D88"),
        el("button", { class: "btn", type: "button", onclick: () => close(true) }, confirmLabel)
      )
    );
    overlay.append(card);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close(false);
    });
    document.body.append(overlay);
  });
}
async function withBusy(button, task) {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = "\u5904\u7406\u4E2D\u2026";
  try {
    return await task();
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}
function setStatus(text, kind = "info") {
  const node = $("#status");
  if (!node) return;
  node.textContent = text;
  node.className = `status status--${kind}`;
}

export {
  Writer,
  Reader,
  discriminatorHex,
  encodeBase58,
  getConnection,
  describeEnvironment,
  detectProviders,
  walletHint,
  connectWallet,
  signAndSend,
  $,
  el,
  toast,
  chooseWallet,
  reviewTransaction,
  withBusy,
  setStatus
};
//# sourceMappingURL=chunk-YFKEAXUE.js.map
