import {
  Connection,
  PublicKey,
  VersionedTransaction,
  __toESM,
  require_buffer
} from "./chunk-6BHCQRA3.js";

// src/lib/polyfills.js
var import_buffer = __toESM(require_buffer(), 1);
if (!globalThis.Buffer) {
  globalThis.Buffer = import_buffer.Buffer;
}

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
  const startSlot = await connection.getSlot("confirmed").catch(() => 0);
  let signature;
  try {
    signature = await requestSignature(connection, transaction, wallet);
  } catch (error) {
    if (!(error instanceof SignatureParseError)) throw error;
    signature = await findRecentSignature(connection, wallet.publicKey, startSlot);
  }
  const confirmation = await connection.confirmTransaction(
    { signature, blockhash: latest.blockhash, lastValidBlockHeight: latest.lastValidBlockHeight },
    "confirmed"
  );
  if (confirmation.value.err) {
    throw new Error(`\u4EA4\u6613\u5931\u8D25\uFF1A${JSON.stringify(confirmation.value.err)}`);
  }
  return signature;
}
async function findRecentSignature(connection, publicKey, startSlot, timeoutMs = 9e4) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 });
      const hit = signatures.find((item) => !item.err && item.slot >= startSlot);
      if (hit) return hit.signature;
    } catch {
    }
    await new Promise((resolve) => setTimeout(resolve, 4e3));
  }
  throw new Error(
    "\u4EA4\u6613\u7ED3\u679C\u672A\u77E5\uFF1A\u94B1\u5305\u6CA1\u6709\u8FD4\u56DE\u53EF\u8BC6\u522B\u7684\u7B7E\u540D\uFF0C\u94FE\u4E0A\u4E5F\u6CA1\u627E\u5230\u65B0\u4EA4\u6613\u3002\u8BF7\u5230\u6D4F\u89C8\u5668\u67E5\u770B\u8BE5\u94B1\u5305\u7684\u6700\u8FD1\u4EA4\u6613\u540E\u518D\u51B3\u5B9A\u662F\u5426\u91CD\u8BD5\u3002"
  );
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
  if (typeof provider.signTransaction === "function") {
    const signed = await provider.signTransaction(transaction);
    const raw = signed?.serialize ? signed.serialize() : signed;
    return connection.sendRawTransaction(raw, { maxRetries: 3 });
  }
  if (typeof provider.signAndSendTransaction === "function") {
    const result = await provider.signAndSendTransaction(transaction);
    return normalizeSignature(result);
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
var SignatureParseError = class extends Error {
  constructor(message, bytes) {
    super(message);
    this.name = "SignatureParseError";
    this.bytes = bytes ?? null;
  }
};
function normalizeSignature(value, depth = 0) {
  if (value === null || value === void 0) throw new Error("\u94B1\u5305\u672A\u8FD4\u56DE\u7B7E\u540D");
  if (depth > 3) throw new SignatureParseError("\u65E0\u6CD5\u89E3\u6790\u94B1\u5305\u8FD4\u56DE\u7684\u7B7E\u540D");
  if (typeof value === "string") {
    const text = value.trim();
    if (/^[1-9A-HJ-NP-Za-km-z]{80,90}$/.test(text)) return text;
    if (/^[0-9a-fA-F]{128}$/.test(text)) {
      return encodeBase58(Uint8Array.from(text.match(/.{2}/g).map((pair) => parseInt(pair, 16))));
    }
    const bytes = decodeBase64(text);
    if (bytes && bytes.length === 64) return encodeBase58(bytes);
    if (bytes && bytes.length > 64) {
      throw new SignatureParseError("\u94B1\u5305\u8FD4\u56DE\u7684\u662F\u4EA4\u6613\u6570\u636E\u800C\u4E0D\u662F\u7B7E\u540D", bytes);
    }
    if (/^[1-9A-HJ-NP-Za-km-z]{60,90}$/.test(text)) return text;
    throw new SignatureParseError(`\u94B1\u5305\u8FD4\u56DE\u7684\u7B7E\u540D\u65E0\u6CD5\u8BC6\u522B\uFF08\u957F\u5EA6 ${text.length}\uFF09`);
  }
  if (value instanceof Uint8Array) {
    if (value.length === 64) return encodeBase58(value);
    if (value.length > 64) throw new SignatureParseError("\u94B1\u5305\u8FD4\u56DE\u7684\u662F\u4EA4\u6613\u6570\u636E\u800C\u4E0D\u662F\u7B7E\u540D", value);
    throw new SignatureParseError(`\u7B7E\u540D\u957F\u5EA6\u5F02\u5E38\uFF08${value.length} \u5B57\u8282\uFF09`);
  }
  if (Array.isArray(value)) return normalizeSignature(Uint8Array.from(value), depth + 1);
  if (typeof value === "object") {
    if (value.signature !== void 0) return normalizeSignature(value.signature, depth + 1);
    if (value.signedTransaction !== void 0 || value.transaction !== void 0) {
      const raw = value.signedTransaction ?? value.transaction;
      const bytes = raw instanceof Uint8Array ? raw : typeof raw === "string" ? decodeBase64(raw) : null;
      throw new SignatureParseError("\u94B1\u5305\u8FD4\u56DE\u4E86\u5DF2\u7B7E\u540D\u4EA4\u6613\u800C\u4E0D\u662F\u7B7E\u540D", bytes);
    }
  }
  throw new SignatureParseError("\u94B1\u5305\u672A\u8FD4\u56DE\u53EF\u7528\u7B7E\u540D");
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
function chooseWallet(options, labels = {}) {
  return new Promise((resolve) => {
    const overlay = el("div", { class: "modal" });
    const finish = (value) => {
      overlay.remove();
      resolve(value);
    };
    const card = el(
      "div",
      { class: "modal__card" },
      el("h2", { class: "modal__title", text: labels.title ?? "\u9009\u62E9\u94B1\u5305" }),
      el("p", { class: "modal__subtitle", text: labels.subtitle ?? "\u68C0\u6D4B\u5230\u591A\u4E2A\u94B1\u5305\uFF0C\u8BF7\u9009\u62E9\u672C\u6B21\u7528\u4E8E\u7B7E\u540D\u7684\u94B1\u5305\u3002" }),
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
        el("button", { class: "btn btn--ghost", type: "button", onclick: () => finish(null) }, labels.cancel ?? "\u53D6\u6D88")
      )
    );
    overlay.append(card);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) finish(null);
    });
    document.body.append(overlay);
  });
}
function reviewTransaction({
  title,
  subtitle,
  rows = [],
  risks = [],
  confirmLabel = "\u5728\u94B1\u5305\u4E2D\u786E\u8BA4",
  cancelLabel = "\u53D6\u6D88",
  riskTitle = "\u98CE\u9669\u4E0E\u4E0D\u53EF\u9006\u6027"
}) {
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
        el("h3", { text: riskTitle }),
        el("ul", {}, risks.map((risk) => el("li", { text: risk })))
      ) : null,
      el(
        "div",
        { class: "modal__actions" },
        el("button", { class: "btn btn--ghost", type: "button", onclick: () => close(false) }, cancelLabel),
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
async function withBusy(button, task, busyLabel = "\u5904\u7406\u4E2D\u2026") {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = busyLabel;
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

// src/lib/i18n.js
var STORAGE_KEY = "btf.lang";
var DEFAULT_LANG = "en";
var SUPPORTED = ["en", "zh"];
var messages = {
  en: {
    meta: {
      title: "BTF Staking",
      description: "BTF (BUY THE FUTURE) is a fixed-supply Solana asset with non-custodial staking, five lock tiers and rewards reserved before they are promised.",
      ogTitle: "BUY THE FUTURE (BTF)",
      ogDescription: "BUY THE FUTURE. BUILD THE NEXT WORLD.",
      diagnoseTitle: "Wallet Diagnostics"
    },
    nav: {
      primary: "Primary",
      sections: "Sections",
      home: "Home",
      stake: "Stake",
      vision: "Vision",
      diagnose: "Diagnose"
    },
    header: {
      connect: "Connect",
      openWallet: "Open Wallet"
    },
    lang: {
      label: "Language"
    },
    hero: {
      eyebrow: "BTF \xB7 SOLANA",
      title1: "BUY THE FUTURE.",
      title2: "BUILD THE NEXT WORLD.",
      lead: "A fixed-supply asset for a community building beyond the token \u2014 toward a connected digital economy and a new generation of blockchain infrastructure.",
      ctaStake: "Enter Staking",
      ctaVision: "Explore the Vision",
      statSupply: "Fixed supply",
      statTiers: "Staking tiers",
      statMint: "Mint authority",
      scroll: "Scroll to stake"
    },
    stake: {
      eyebrow: "STAKING",
      title: "Stake BTF",
      lead: "Choose a lock term, stake BTF, and earn from a pre-funded reward pool. Principal and rewards stay verifiable on-chain."
    },
    summary: {
      title: "My Assets",
      balance: "Token balance",
      staked: "Staked",
      claimed: "Rewards claimed",
      claimable: "Claimable now",
      positionsHint: "{n} positions",
      paidOnchain: "Paid on-chain",
      accruing: "Accruing by the second",
      aprNote: "Tier APRs: {aprs} (the APR is fixed when a position opens)",
      paused: "New stakes are paused"
    },
    tiers: {
      title: "Choose a lock term",
      select: "Select",
      disabled: "Disabled",
      unlockAnytime: "Unlock anytime",
      lockedDays: "Locked {days} days"
    },
    tier: {
      flex: "Flexible",
      d30: "30 days",
      d90: "90 days",
      d180: "180 days",
      d360: "360 days"
    },
    amount: {
      label: "Amount ({symbol})",
      max: "Max balance",
      hintReward: "Max reward (worst case): {amount} {symbol}",
      hintUnlock: "Unlocks: {time}",
      stake: "Confirm stake",
      stakeDisabled: "Pool not ready",
      stakePaused: "New stakes paused",
      disclaimer: "Staking moves tokens into the contract vault. Principal cannot be withdrawn before the lock ends; at maturity, principal and unclaimed rewards can be withdrawn together."
    },
    positions: {
      title: "My Positions",
      connect: "Connect your wallet to see your positions.",
      empty: "No staking positions yet.",
      claim: "Claim {amount}",
      nothing: "Nothing to claim",
      unstake: "Unstake",
      opened: "Opened: {time}",
      flexible: "Flexible staking, unlock anytime",
      matured: "Matured on {time}",
      locked: "Locked until {time} ({days} days left)",
      claimed: "Claimed: {amount}"
    },
    rules: {
      title: "Rules",
      "1": "All rewards come from a reward vault pre-funded by the project. No new tokens are minted.",
      "2": "Each position locks the APR at opening time; later APR changes do not affect existing positions.",
      "3": "Rewards accrue linearly by the second, capped at the tier's accrual window (365 days for Flexible).",
      "4": "If the reward pool cannot cover a new position's maximum liability, the contract rejects the stake.",
      "5": "The contract has no instruction that lets the project withdraw user principal or promised rewards."
    },
    vision: {
      eyebrow: "THE VISION",
      title: "More than a token.",
      lead: "BTF is a long-term bet on a connected digital future \u2014 built in public, owned by its community, and designed to outlast the cycle.",
      p1: "BTF is more than a token. It is a conviction that the future is not something we wait for \u2014 it is something we build together.",
      p2: "Starting from a community-driven digital asset, BTF is designed to grow into a broader ecosystem through technology, innovation and global participation.",
      p3: "Our ambition reaches beyond a single token: a connected digital economy, an independent network, and a new generation of blockchain infrastructure.",
      p4: "Fixed supply. No mint authority. No freeze authority. A long-term project reserve and a staking system that reserves rewards before they are promised.",
      tagline: "One Vision. One Community. One Future.",
      pillar1Title: "Fixed by design",
      pillar1Body: "1,000,000,000 BTF. No mint, no freeze. Scarcity enforced by code.",
      pillar2Title: "Non-custodial",
      pillar2Body: "Your keys stay in your wallet. The staking contract has no withdrawal backdoor.",
      pillar3Title: "Built for the long term",
      pillar3Body: "Five lock tiers, rewards reserved up front, and a 50% project reserve for the road ahead."
    },
    footer: {
      contract: "Contract",
      copy: "Copy",
      copied: "Contract address copied",
      copyFailed: "Copy failed",
      website: "Website",
      telegram: "Telegram",
      disclaimer: "Nothing on this site is financial advice. Crypto assets are volatile; do your own research and understand the risks."
    },
    wallet: {
      hintMobile: "Open this page in Bitget Wallet's DApp browser so it can request signatures.",
      hintDesktop: "No wallet extension detected. Install Bitget Wallet or Phantom, then refresh.",
      hintSuffix: "Still stuck? Open diagnose.html to inspect the interfaces your wallet exposes.",
      notSelected: "No wallet selected",
      noAccount: "The wallet did not return an account.",
      injected: "A wallet object was detected but it exposes no usable connect/request method. Open diagnose.html for details."
    },
    error: {
      rejected: "Transaction cancelled in your wallet",
      insufficient: "Insufficient balance or fees",
      invalidAmount: "Enter a valid amount",
      tooManyDecimals: "Up to {n} decimal places"
    },
    status: {
      connectHint: "Connect your wallet to read on-chain data.",
      poolReadFailed: "Failed to read the staking pool: {error}",
      poolMissing: "The staking pool has not been created yet (the program ID may still be a placeholder, or the project has not initialized it).",
      refreshFailed: "Refresh failed: {error}",
      minStake: "Minimum stake is {amount} {symbol}"
    },
    toast: {
      connectFirst: "Connect your wallet first",
      enterAmount: "Enter an amount to stake",
      stakeSuccess: "Staked: {sig}",
      claimSuccess: "Claimed: {sig}",
      unstakeSuccess: "Unstaked: {sig}",
      locked: "The lock period has not ended yet"
    },
    modal: {
      chooseWalletTitle: "Choose a wallet",
      chooseWalletSubtitle: "Multiple wallets detected. Choose the one to sign with.",
      riskTitle: "Risk and irreversibility",
      confirm: "Confirm in wallet"
    },
    common: {
      cancel: "Cancel",
      processing: "Processing\u2026"
    },
    review: {
      stake: {
        title: "Confirm stake",
        subtitle: "Your wallet will sign the transaction; tokens move from your account into the staking vault.",
        term: "Lock term",
        apr: "APR",
        amount: "Amount",
        unlock: "Unlocks",
        commitment: "Reserved reward (worst case)",
        wallet: "Your wallet",
        contract: "Contract",
        risk1: "Principal cannot be withdrawn during the lock; the position cannot be closed early.",
        risk2: "Rewards depend on the reward vault balance; the contract rejects stakes that exceed the budget.",
        risk3: "APR is a parameter, not a promise of returns."
      },
      claim: {
        title: "Claim rewards",
        subtitle: "Only accrued rewards move; principal stays in the contract and keeps accruing.",
        position: "Position",
        amount: "This claim",
        receiver: "Receiver",
        risk1: "Claimed rewards reset for that period; the position keeps accruing at its original APR."
      },
      unstake: {
        title: "Unstake",
        subtitle: "Principal and unclaimed rewards return to your wallet; the position account closes.",
        position: "Position",
        principal: "Principal",
        unclaimed: "Unclaimed rewards",
        receiver: "Receiver",
        risk1: "The position stops accruing after unstaking; staking again requires a new position at the APR then in effect."
      }
    },
    network: {
      mainnet: "Mainnet"
    },
    diagnose: {
      title: "Wallet Diagnostics",
      back: "Back to staking",
      reading: "Reading the wallet interfaces visible to this browser\u2026",
      results: "Detected interfaces",
      object: "Object",
      hintYes: "A wallet can be invoked only when connect or request is \u2713 in its row.",
      hintNo: "No Solana wallet is injected. Open this page inside a wallet app's DApp browser.",
      noInjected: "No injected objects detected",
      standard: "Wallet Standard",
      unknown: "Unknown",
      readError: "Read failed",
      noStandard: "navigator.wallets is empty (this wallet does not register Wallet Standard)",
      actions: "Actions",
      tryConnect: "Try connecting",
      copy: "Copy diagnostics",
      note: "If \u201CTry connecting\u201D fails, send me the copied diagnostics so I can adapt to the interfaces your wallet actually exposes.",
      raw: "Raw information",
      copied: "Diagnostics copied",
      copyFailed: "Copy failed. Long-press the raw information below and copy it manually.",
      noWallet: "No usable wallet: every connect/request cell above is empty.",
      connected: "Connected: {wallet} \xB7 {address}",
      connectFailed: "Connection failed: {error}"
    }
  },
  zh: {
    meta: {
      title: "BTF \u8D28\u62BC",
      description: "BTF\uFF08BUY THE FUTURE\uFF09\u662F Solana \u4E0A\u7684\u56FA\u5B9A\u4F9B\u5E94\u8D44\u4EA7\uFF0C\u63D0\u4F9B\u975E\u6258\u7BA1\u8D28\u62BC\u3001\u4E94\u6863\u9501\u4ED3\uFF0C\u4EE5\u53CA\u5148\u9884\u7559\u540E\u53D1\u653E\u7684\u5956\u52B1\u673A\u5236\u3002",
      ogTitle: "BUY THE FUTURE (BTF)",
      ogDescription: "\u4E70\u5165\u672A\u6765\uFF0C\u5EFA\u8BBE\u4E0B\u4E00\u4E2A\u4E16\u754C\u3002",
      diagnoseTitle: "\u94B1\u5305\u8BCA\u65AD"
    },
    nav: {
      primary: "\u4E3B\u5BFC\u822A",
      sections: "\u9875\u9762\u5BFC\u822A",
      home: "\u9996\u9875",
      stake: "\u8D28\u62BC",
      vision: "\u613F\u666F",
      diagnose: "\u8BCA\u65AD"
    },
    header: {
      connect: "\u8FDE\u63A5",
      openWallet: "\u6253\u5F00\u94B1\u5305"
    },
    lang: {
      label: "\u8BED\u8A00"
    },
    hero: {
      eyebrow: "BTF \xB7 SOLANA",
      title1: "\u4E70\u5165\u672A\u6765\u3002",
      title2: "\u5EFA\u8BBE\u4E0B\u4E00\u4E2A\u4E16\u754C\u3002",
      lead: "\u4E00\u679A\u56FA\u5B9A\u4F9B\u5E94\u7684\u6570\u5B57\u8D44\u4EA7\uFF0C\u8FDE\u63A5\u4E00\u4E2A\u4E0D\u6B62\u4E8E\u4EE3\u5E01\u7684\u793E\u533A\u2014\u2014\u8D70\u5411\u4E92\u8054\u7684\u6570\u5B57\u7ECF\u6D4E\u4E0E\u65B0\u4E00\u4EE3\u533A\u5757\u94FE\u57FA\u7840\u8BBE\u65BD\u3002",
      ctaStake: "\u5F00\u59CB\u8D28\u62BC",
      ctaVision: "\u4E86\u89E3\u613F\u666F",
      statSupply: "\u56FA\u5B9A\u4F9B\u5E94",
      statTiers: "\u8D28\u62BC\u6863\u4F4D",
      statMint: "\u589E\u53D1\u6743\u9650",
      scroll: "\u5411\u4E0B\u8FDB\u5165\u8D28\u62BC"
    },
    stake: {
      eyebrow: "STAKING",
      title: "\u8D28\u62BC BTF",
      lead: "\u9009\u62E9\u9501\u4ED3\u671F\u9650\uFF0C\u8D28\u62BC BTF\uFF0C\u4ECE\u9884\u5148\u6CE8\u5165\u7684\u5956\u52B1\u6C60\u4E2D\u83B7\u53D6\u6536\u76CA\u3002\u672C\u91D1\u4E0E\u5956\u52B1\u5168\u7A0B\u94FE\u4E0A\u53EF\u9A8C\u8BC1\u3002"
    },
    summary: {
      title: "\u6211\u7684\u8D44\u4EA7",
      balance: "\u4EE3\u5E01\u4F59\u989D",
      staked: "\u8D28\u62BC\u4E2D",
      claimed: "\u7D2F\u8BA1\u5DF2\u9886\u5956\u52B1",
      claimable: "\u5F53\u524D\u53EF\u9886\u53D6",
      positionsHint: "{n} \u4E2A\u4ED3\u4F4D",
      paidOnchain: "\u94FE\u4E0A\u5DF2\u652F\u4ED8",
      accruing: "\u6309\u79D2\u7D2F\u8BA1",
      aprNote: "\u5404\u6863 APR\uFF1A{aprs}\uFF08APR \u4EE5\u4ED3\u4F4D\u5F00\u4ED3\u65F6\u8BB0\u5F55\u4E3A\u51C6\uFF09",
      paused: "\u8D28\u62BC\u6C60\u5DF2\u6682\u505C\u65B0\u8D28\u62BC"
    },
    tiers: {
      title: "\u9009\u62E9\u8D28\u62BC\u671F\u9650",
      select: "\u9009\u62E9",
      disabled: "\u672A\u542F\u7528",
      unlockAnytime: "\u968F\u65F6\u53EF\u89E3\u9664",
      lockedDays: "\u9501\u4ED3 {days} \u5929"
    },
    tier: {
      flex: "\u7075\u6D3B\u8D28\u62BC",
      d30: "30 \u5929",
      d90: "90 \u5929",
      d180: "180 \u5929",
      d360: "360 \u5929"
    },
    amount: {
      label: "\u8D28\u62BC\u6570\u91CF\uFF08{symbol}\uFF09",
      max: "\u5168\u90E8\u4F59\u989D",
      hintReward: "\u6700\u574F\u60C5\u51B5\u5956\u52B1\uFF1A{amount} {symbol}",
      hintUnlock: "\u5230\u671F\uFF1A{time}",
      stake: "\u786E\u8BA4\u8D28\u62BC",
      stakeDisabled: "\u8D28\u62BC\u6C60\u672A\u5C31\u7EEA",
      stakePaused: "\u5F53\u524D\u6682\u505C\u63A5\u53D7\u65B0\u8D28\u62BC",
      disclaimer: "\u8D28\u62BC\u4F1A\u628A\u4EE3\u5E01\u8F6C\u5165\u5408\u7EA6\u91D1\u5E93\u3002\u9501\u4ED3\u6863\u4F4D\u5230\u671F\u524D\u65E0\u6CD5\u53D6\u56DE\u672C\u91D1\uFF1B\u5230\u671F\u540E\u672C\u91D1\u4E0E\u672A\u9886\u5956\u52B1\u53EF\u4E00\u8D77\u53D6\u56DE\u3002"
    },
    positions: {
      title: "\u6211\u7684\u8D28\u62BC",
      connect: "\u8FDE\u63A5\u94B1\u5305\u540E\u663E\u793A\u4F60\u7684\u4ED3\u4F4D\u3002",
      empty: "\u8FD8\u6CA1\u6709\u8D28\u62BC\u4ED3\u4F4D\u3002",
      claim: "\u9886\u53D6 {amount}",
      nothing: "\u6682\u65E0\u53EF\u9886\u53D6",
      unstake: "\u89E3\u9664\u8D28\u62BC",
      opened: "\u5F00\u4ED3\uFF1A{time}",
      flexible: "\u7075\u6D3B\u8D28\u62BC\uFF0C\u968F\u65F6\u53EF\u89E3\u9664",
      matured: "\u5DF2\u4E8E {time} \u5230\u671F",
      locked: "\u9501\u4ED3\u81F3 {time}\uFF08\u5269\u4F59 {days} \u5929\uFF09",
      claimed: "\u5DF2\u9886\uFF1A{amount}"
    },
    rules: {
      title: "\u89C4\u5219\u8BF4\u660E",
      "1": "\u5956\u52B1\u5168\u90E8\u6765\u81EA\u9879\u76EE\u65B9\u9884\u5148\u5B58\u5165\u7684\u5956\u52B1\u91D1\u5E93\uFF0C\u4E0D\u4F1A\u589E\u53D1\u65B0\u4EE3\u5E01\u3002",
      "2": "\u6BCF\u7B14\u8D28\u62BC\u5728\u5F00\u4ED3\u65F6\u9501\u5B9A\u5F53\u65F6\u7684 APR\uFF0C\u4E4B\u540E\u9879\u76EE\u65B9\u8C03\u6574 APR \u4E0D\u5F71\u54CD\u5DF2\u5F00\u4ED3\u4F4D\u3002",
      "3": "\u5956\u52B1\u6309\u79D2\u7EBF\u6027\u7D2F\u8BA1\uFF0C\u6700\u591A\u7D2F\u8BA1\u5230\u8BE5\u6863\u4F4D\u7684\u8BA1\u606F\u7A97\u53E3\u7ED3\u675F\uFF08\u7075\u6D3B\u6863\u4E3A 365 \u5929\uFF09\u3002",
      "4": "\u5956\u52B1\u6C60\u4E0D\u8DB3\u4EE5\u8986\u76D6\u65B0\u4ED3\u4F4D\u7684\u6700\u5927\u5E94\u4ED8\u5956\u52B1\u65F6\uFF0C\u65B0\u8D28\u62BC\u4F1A\u88AB\u5408\u7EA6\u62D2\u7EDD\u3002",
      "5": "\u5408\u7EA6\u6CA1\u6709\u4EFB\u4F55\u8BA9\u9879\u76EE\u65B9\u63D0\u53D6\u7528\u6237\u672C\u91D1\u6216\u5DF2\u627F\u8BFA\u5956\u52B1\u7684\u6307\u4EE4\u3002"
    },
    vision: {
      eyebrow: "THE VISION",
      title: "\u4E0D\u6B62\u662F\u4E00\u679A\u4EE3\u5E01\u3002",
      lead: "BTF \u662F\u5BF9\u4E92\u8054\u6570\u5B57\u672A\u6765\u7684\u4E00\u6B21\u957F\u671F\u4E0B\u6CE8\u2014\u2014\u516C\u5F00\u5EFA\u8BBE\uFF0C\u7531\u793E\u533A\u5171\u540C\u62E5\u6709\uFF0C\u5E76\u4E3A\u7A7F\u8D8A\u5468\u671F\u800C\u8BBE\u8BA1\u3002",
      p1: "BTF \u4E0D\u53EA\u662F\u4E00\u679A\u4EE3\u5E01\u3002\u5B83\u662F\u4E00\u79CD\u4FE1\u5FF5\uFF1A\u672A\u6765\u4E0D\u662F\u7B49\u6765\u7684\uFF0C\u800C\u662F\u6211\u4EEC\u4E00\u8D77\u5EFA\u51FA\u6765\u7684\u3002",
      p2: "\u4ECE\u4E00\u4E2A\u793E\u533A\u9A71\u52A8\u7684\u6570\u5B57\u8D44\u4EA7\u51FA\u53D1\uFF0CBTF \u5E0C\u671B\u501F\u52A9\u6280\u672F\u3001\u521B\u65B0\u4E0E\u5168\u7403\u53C2\u4E0E\uFF0C\u6210\u957F\u4E3A\u66F4\u5E7F\u9614\u751F\u6001\u7684\u4E00\u90E8\u5206\u3002",
      p3: "\u6211\u4EEC\u7684\u76EE\u6807\u4E0D\u6B62\u4E8E\u5355\u4E00\u4EE3\u5E01\uFF1A\u800C\u662F\u4E92\u8054\u7684\u6570\u5B57\u7ECF\u6D4E\u3001\u72EC\u7ACB\u7684\u7F51\u7EDC\uFF0C\u4EE5\u53CA\u65B0\u4E00\u4EE3\u533A\u5757\u94FE\u57FA\u7840\u8BBE\u65BD\u3002",
      p4: "\u56FA\u5B9A\u4F9B\u5E94\uFF0C\u65E0\u589E\u53D1\u6743\u9650\uFF0C\u65E0\u51BB\u7ED3\u6743\u9650\u3002\u957F\u671F\u9879\u76EE\u50A8\u5907\uFF0C\u52A0\u4E0A\u300C\u5148\u9884\u7559\u3001\u540E\u53D1\u653E\u300D\u7684\u8D28\u62BC\u5956\u52B1\u4F53\u7CFB\u3002",
      tagline: "\u540C\u4E00\u4E2A\u613F\u666F\uFF0C\u540C\u4E00\u4E2A\u793E\u533A\uFF0C\u540C\u4E00\u4E2A\u672A\u6765\u3002",
      pillar1Title: "\u56FA\u5B9A\u4F9B\u5E94",
      pillar1Body: "10 \u4EBF\u679A BTF\uFF0C\u65E0\u589E\u53D1\u3001\u65E0\u51BB\u7ED3\uFF0C\u7A00\u7F3A\u6027\u7531\u4EE3\u7801\u4FDD\u8BC1\u3002",
      pillar2Title: "\u975E\u6258\u7BA1",
      pillar2Body: "\u79C1\u94A5\u59CB\u7EC8\u5728\u4F60\u7684\u94B1\u5305\u91CC\uFF0C\u8D28\u62BC\u5408\u7EA6\u6CA1\u6709\u63D0\u73B0\u540E\u95E8\u3002",
      pillar3Title: "\u957F\u671F\u4E3B\u4E49",
      pillar3Body: "\u4E94\u6863\u9501\u4ED3\uFF0C\u5956\u52B1\u5148\u9884\u7559\u540E\u53D1\u653E\uFF0C50% \u9879\u76EE\u50A8\u5907\u9762\u5411\u957F\u671F\u5EFA\u8BBE\u3002"
    },
    footer: {
      contract: "\u5408\u7EA6\u5730\u5740",
      copy: "\u590D\u5236",
      copied: "\u5408\u7EA6\u5730\u5740\u5DF2\u590D\u5236",
      copyFailed: "\u590D\u5236\u5931\u8D25",
      website: "\u5B98\u7F51",
      telegram: "Telegram",
      disclaimer: "\u672C\u9875\u9762\u4E0D\u6784\u6210\u4EFB\u4F55\u6295\u8D44\u5EFA\u8BAE\u3002\u52A0\u5BC6\u8D44\u4EA7\u4EF7\u683C\u6CE2\u52A8\u5267\u70C8\uFF0C\u8BF7\u81EA\u884C\u7814\u7A76\u5E76\u627F\u62C5\u98CE\u9669\u3002"
    },
    wallet: {
      hintMobile: "\u8BF7\u5728 Bitget Wallet \u7684\u300CDApp \u6D4F\u89C8\u5668\u300D\u4E2D\u6253\u5F00\u672C\u9875\u5730\u5740\uFF0C\u9875\u9762\u624D\u80FD\u5524\u8D77\u94B1\u5305\u7B7E\u540D\u3002",
      hintDesktop: "\u672A\u68C0\u6D4B\u5230\u94B1\u5305\u6269\u5C55\uFF0C\u8BF7\u5B89\u88C5 Bitget Wallet \u6216 Phantom \u6269\u5C55\u540E\u5237\u65B0\u672C\u9875\u3002",
      hintSuffix: "\u4ECD\u8FDE\u4E0D\u4E0A\u53EF\u6253\u5F00 diagnose.html \u67E5\u770B\u94B1\u5305\u5B9E\u9645\u66B4\u9732\u7684\u63A5\u53E3\u3002",
      notSelected: "\u672A\u9009\u62E9\u94B1\u5305",
      noAccount: "\u94B1\u5305\u672A\u8FD4\u56DE\u8D26\u6237\u3002",
      injected: "\u68C0\u6D4B\u5230\u6CE8\u5165\u5BF9\u8C61\uFF0C\u4F46\u6CA1\u6709\u53EF\u7528\u7684 connect/request \u65B9\u6CD5\u3002\u8BF7\u6253\u5F00 diagnose.html \u67E5\u770B\u8BE6\u7EC6\u63A5\u53E3\u3002"
    },
    error: {
      rejected: "\u4F60\u5DF2\u5728\u94B1\u5305\u4E2D\u53D6\u6D88\u4EA4\u6613",
      insufficient: "\u4F59\u989D\u4E0D\u8DB3\uFF0C\u6216\u624B\u7EED\u8D39\u4E0D\u8DB3",
      invalidAmount: "\u8BF7\u8F93\u5165\u6709\u6548\u6570\u91CF",
      tooManyDecimals: "\u6700\u591A\u652F\u6301 {n} \u4F4D\u5C0F\u6570"
    },
    status: {
      connectHint: "\u8FDE\u63A5\u94B1\u5305\u540E\u8BFB\u53D6\u94FE\u4E0A\u6570\u636E\u3002",
      poolReadFailed: "\u8BFB\u53D6\u8D28\u62BC\u6C60\u5931\u8D25\uFF1A{error}",
      poolMissing: "\u8D28\u62BC\u6C60\u5C1A\u672A\u521B\u5EFA\uFF08\u7A0B\u5E8F\u5730\u5740\u53EF\u80FD\u4ECD\u662F\u5360\u4F4D\u503C\uFF0C\u6216\u9879\u76EE\u65B9\u5C1A\u672A\u521D\u59CB\u5316\uFF09\u3002",
      refreshFailed: "\u5237\u65B0\u5931\u8D25\uFF1A{error}",
      minStake: "\u6700\u5C0F\u8D28\u62BC\u6570\u91CF\u4E3A {amount} {symbol}"
    },
    toast: {
      connectFirst: "\u8BF7\u5148\u8FDE\u63A5\u94B1\u5305",
      enterAmount: "\u8BF7\u8F93\u5165\u8D28\u62BC\u6570\u91CF",
      stakeSuccess: "\u8D28\u62BC\u6210\u529F\uFF1A{sig}",
      claimSuccess: "\u5DF2\u9886\u53D6\uFF1A{sig}",
      unstakeSuccess: "\u5DF2\u89E3\u9664\uFF1A{sig}",
      locked: "\u9501\u4ED3\u671F\u672A\u7ED3\u675F\uFF0C\u65E0\u6CD5\u89E3\u9664"
    },
    modal: {
      chooseWalletTitle: "\u9009\u62E9\u94B1\u5305",
      chooseWalletSubtitle: "\u68C0\u6D4B\u5230\u591A\u4E2A\u94B1\u5305\uFF0C\u8BF7\u9009\u62E9\u672C\u6B21\u7528\u4E8E\u7B7E\u540D\u7684\u94B1\u5305\u3002",
      riskTitle: "\u98CE\u9669\u4E0E\u4E0D\u53EF\u9006\u6027",
      confirm: "\u5728\u94B1\u5305\u4E2D\u786E\u8BA4"
    },
    common: {
      cancel: "\u53D6\u6D88",
      processing: "\u5904\u7406\u4E2D\u2026"
    },
    review: {
      stake: {
        title: "\u786E\u8BA4\u8D28\u62BC",
        subtitle: "\u4EA4\u6613\u5C06\u7531\u4F60\u7684\u94B1\u5305\u7B7E\u540D\uFF0C\u4EE3\u5E01\u4ECE\u4F60\u7684\u8D26\u6237\u8F6C\u5165\u8D28\u62BC\u5408\u7EA6\u91D1\u5E93\u3002",
        term: "\u8D28\u62BC\u671F\u9650",
        apr: "APR",
        amount: "\u8D28\u62BC\u6570\u91CF",
        unlock: "\u5230\u671F\u65F6\u95F4",
        commitment: "\u9884\u7559\u5956\u52B1\uFF08\u6700\u574F\u60C5\u51B5\uFF09",
        wallet: "\u4F60\u7684\u94B1\u5305",
        contract: "\u5408\u7EA6",
        risk1: "\u9501\u4ED3\u671F\u95F4\u672C\u91D1\u4E0D\u53EF\u63D0\u53D6\uFF0C\u5230\u671F\u524D\u65E0\u6CD5\u89E3\u9664\u3002",
        risk2: "\u53D1\u653E\u5956\u52B1\u53D6\u51B3\u4E8E\u5956\u52B1\u6C60\u4F59\u989D\uFF0C\u5408\u7EA6\u4F1A\u62D2\u7EDD\u8D85\u51FA\u9884\u7B97\u7684\u8D28\u62BC\u3002",
        risk3: "APR \u53EA\u662F\u53C2\u6570\uFF0C\u4E0D\u6784\u6210\u6536\u76CA\u627F\u8BFA\u3002"
      },
      claim: {
        title: "\u9886\u53D6\u5956\u52B1",
        subtitle: "\u53EA\u8F6C\u79FB\u5DF2\u7D2F\u79EF\u7684\u5956\u52B1\uFF0C\u672C\u91D1\u7559\u5728\u5408\u7EA6\u4E2D\u7EE7\u7EED\u8BA1\u606F\u3002",
        position: "\u4ED3\u4F4D",
        amount: "\u672C\u6B21\u9886\u53D6",
        receiver: "\u63A5\u6536\u5730\u5740",
        risk1: "\u9886\u53D6\u540E\u8BE5\u6BB5\u65F6\u95F4\u7684\u5956\u52B1\u5F52\u96F6\uFF0C\u4ED3\u4F4D\u7EE7\u7EED\u6309\u539F APR \u7D2F\u79EF\u3002"
      },
      unstake: {
        title: "\u89E3\u9664\u8D28\u62BC",
        subtitle: "\u672C\u91D1\u4E0E\u672A\u9886\u53D6\u5956\u52B1\u4F1A\u4E00\u8D77\u56DE\u5230\u4F60\u7684\u94B1\u5305\uFF0C\u4ED3\u4F4D\u8D26\u6237\u5173\u95ED\u3002",
        position: "\u4ED3\u4F4D",
        principal: "\u672C\u91D1",
        unclaimed: "\u672A\u9886\u53D6\u5956\u52B1",
        receiver: "\u63A5\u6536\u5730\u5740",
        risk1: "\u89E3\u9664\u540E\u8BE5\u4ED3\u4F4D\u4E0D\u518D\u8BA1\u606F\uFF1B\u5982\u9700\u7EE7\u7EED\u8D28\u62BC\u9700\u91CD\u65B0\u5F00\u4ED3\uFF0C\u6309\u5F53\u65F6 APR \u6267\u884C\u3002"
      }
    },
    network: {
      mainnet: "\u4E3B\u7F51"
    },
    diagnose: {
      title: "\u94B1\u5305\u8BCA\u65AD",
      back: "\u8FD4\u56DE\u8D28\u62BC",
      reading: "\u6B63\u5728\u8BFB\u53D6\u5F53\u524D\u6D4F\u89C8\u5668\u53EF\u89C1\u7684\u94B1\u5305\u63A5\u53E3\u2026",
      results: "\u63A2\u6D4B\u7ED3\u679C",
      object: "\u5BF9\u8C61",
      hintYes: "\u53EA\u6709\u5F53\u67D0\u4E00\u884C\u7684 connect \u6216 request \u4E3A \u2713 \u65F6\uFF0C\u9875\u9762\u624D\u80FD\u5524\u8D77\u8BE5\u94B1\u5305\u3002",
      hintNo: "\u5F53\u524D\u73AF\u5883\u6CA1\u6709\u6CE8\u5165 Solana \u94B1\u5305\uFF0C\u8BF7\u786E\u8BA4\u662F\u5728\u94B1\u5305 App \u7684 DApp \u6D4F\u89C8\u5668\u4E2D\u6253\u5F00\u3002",
      noInjected: "\u6CA1\u6709\u63A2\u6D4B\u5230\u4EFB\u4F55\u6CE8\u5165\u5BF9\u8C61",
      standard: "Wallet Standard",
      unknown: "\u672A\u77E5",
      readError: "\u8BFB\u53D6\u5931\u8D25",
      noStandard: "navigator.wallets \u4E3A\u7A7A\uFF08\u8BE5\u94B1\u5305\u672A\u6CE8\u518C Wallet Standard\uFF09",
      actions: "\u64CD\u4F5C",
      tryConnect: "\u5C1D\u8BD5\u8FDE\u63A5\u94B1\u5305",
      copy: "\u590D\u5236\u8BCA\u65AD\u4FE1\u606F",
      note: "\u82E5\u300C\u5C1D\u8BD5\u8FDE\u63A5\u300D\u62A5\u9519\uFF0C\u8BF7\u628A\u590D\u5236\u7684\u8BCA\u65AD\u4FE1\u606F\u53D1\u7ED9\u6211\uFF0C\u6211\u6309\u4F60\u94B1\u5305\u771F\u5B9E\u66B4\u9732\u7684\u63A5\u53E3\u9002\u914D\u3002",
      raw: "\u539F\u59CB\u4FE1\u606F",
      copied: "\u8BCA\u65AD\u4FE1\u606F\u5DF2\u590D\u5236",
      copyFailed: "\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u957F\u6309\u9009\u4E2D\u4E0B\u9762\u7684\u539F\u59CB\u4FE1\u606F",
      noWallet: "\u6CA1\u6709\u53EF\u7528\u94B1\u5305\uFF1A\u4E0A\u9762\u8868\u683C\u91CC connect/request \u5168\u90E8\u4E3A\u7A7A",
      connected: "\u8FDE\u63A5\u6210\u529F\uFF1A{wallet} \xB7 {address}",
      connectFailed: "\u8FDE\u63A5\u5931\u8D25\uFF1A{error}"
    }
  }
};
var current = readLang();
var listeners = /* @__PURE__ */ new Set();
function readLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(stored)) return stored;
  } catch {
  }
  return DEFAULT_LANG;
}
function lookup(lang, key) {
  return key.split(".").reduce((node, part) => node == null ? void 0 : node[part], messages[lang]);
}
function t(key, vars = {}) {
  const value = lookup(current, key) ?? lookup(DEFAULT_LANG, key) ?? key;
  return String(value).replace(
    /\{(\w+)\}/g,
    (_, name) => vars[name] === void 0 ? `{${name}}` : String(vars[name])
  );
}
function onLangChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
  }
  applyTranslations();
  for (const listener of listeners) listener(current);
}
function applyTranslations(root = document) {
  document.documentElement.lang = current === "zh" ? "zh-CN" : "en";
  for (const node of root.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n);
  }
  for (const node of root.querySelectorAll("[data-i18n-content]")) {
    node.setAttribute("content", t(node.dataset.i18nContent));
  }
  for (const node of root.querySelectorAll("[data-i18n-placeholder]")) {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  }
  for (const node of root.querySelectorAll("[data-i18n-aria-label]")) {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  }
  for (const node of root.querySelectorAll("[data-i18n-title]")) {
    node.setAttribute("title", t(node.dataset.i18nTitle));
  }
  const docTitleKey = document.documentElement.dataset.i18nDocTitle;
  if (docTitleKey) document.title = t(docTitleKey);
  for (const button of root.querySelectorAll("[data-lang]")) {
    const active = button.dataset.lang === current;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}
function initI18n() {
  applyTranslations();
  for (const button of document.querySelectorAll("[data-lang]")) {
    button.addEventListener("click", () => setLang(button.dataset.lang));
  }
}

export {
  getConfig,
  getTiers,
  Writer,
  Reader,
  discriminatorHex,
  getConnection,
  describeEnvironment,
  detectProviders,
  isMobileBrowser,
  connectWallet,
  signAndSend,
  $,
  el,
  toast,
  chooseWallet,
  reviewTransaction,
  withBusy,
  setStatus,
  t,
  onLangChange,
  initI18n
};
//# sourceMappingURL=chunk-YTZY3SPC.js.map
