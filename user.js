import {
  claimable,
  fetchPool,
  fetchPositions,
  fetchUserState,
  ixClaim,
  ixStake,
  ixUnstake,
  maxReward,
  positionPda,
  userStatePda
} from "./chunk-EB77RWRN.js";
import {
  formatBps,
  formatDateTime,
  formatDuration,
  formatTokens,
  getAssociatedTokenAddressSync,
  parseTokens,
  shorten
} from "./chunk-KZEFVH3E.js";
import {
  $,
  chooseWallet,
  connectWallet,
  detectProviders,
  el,
  getConnection,
  reviewTransaction,
  setStatus,
  signAndSend,
  toast,
  walletHint,
  withBusy
} from "./chunk-YFKEAXUE.js";
import {
  getConfig,
  getTiers
} from "./chunk-Y7EOAKKY.js";
import {
  PublicKey
} from "./chunk-5MXUSYBM.js";

// src/user.js
var state = {
  connection: getConnection(),
  wallet: null,
  pool: null,
  userState: null,
  positions: [],
  balance: 0n,
  selectedTier: 0
};
var config = getConfig();
function nowSeconds() {
  return Math.floor(Date.now() / 1e3);
}
function decodeError(error) {
  const message = error?.message ?? String(error);
  const anchorError = error?.error?.errorMessage;
  if (anchorError) return anchorError;
  if (message.includes("User rejected")) return "\u4F60\u5DF2\u5728\u94B1\u5305\u4E2D\u53D6\u6D88\u4EA4\u6613";
  if (message.includes("insufficient")) return "\u4F59\u989D\u4E0D\u8DB3\uFF0C\u6216\u624B\u7EED\u8D39\u4E0D\u8DB3";
  return message;
}
init();
async function init() {
  const badge = $("#network-badge");
  badge.textContent = config.network === "mainnet-beta" ? "\u4E3B\u7F51" : config.network;
  if (config.network === "mainnet-beta") badge.classList.add("badge--warn");
  $("#connect").addEventListener("click", onConnect);
  $("#stake").addEventListener("click", onStake);
  $("#max").addEventListener("click", () => {
    $("#amount").value = formatTokens(state.balance, config.token.decimals, 9);
  });
  if (detectProviders().length === 0) {
    $("#connect").textContent = "\u5728\u94B1\u5305\u4E2D\u6253\u5F00";
    setStatus(walletHint(), "error");
  }
  renderTiers();
  renderAbout();
  renderSummary();
  try {
    state.pool = await fetchPool(state.connection);
  } catch (error) {
    setStatus(`\u8BFB\u53D6\u8D28\u62BC\u6C60\u5931\u8D25\uFF1A${decodeError(error)}`, "error");
    return;
  }
  if (!state.pool) {
    setStatus("\u8D28\u62BC\u6C60\u5C1A\u672A\u521B\u5EFA\uFF08\u7A0B\u5E8F\u5730\u5740\u53EF\u80FD\u4ECD\u662F\u5360\u4F4D\u503C\uFF0C\u6216\u9879\u76EE\u65B9\u5C1A\u672A\u521D\u59CB\u5316\uFF09\u3002", "error");
    $("#stake").disabled = true;
    $("#stake").textContent = "\u8D28\u62BC\u6C60\u672A\u5C31\u7EEA";
    renderSummary();
    return;
  }
  renderSummary();
}
async function onConnect() {
  if (detectProviders().length === 0) {
    toast(walletHint(), "error", 8e3);
    return;
  }
  try {
    state.wallet = await connectWallet({ choose: chooseWallet });
    $("#connect").textContent = shorten(state.wallet.publicKey.toBase58());
    $("#connect").dataset.connected = "true";
    await refresh();
  } catch (error) {
    toast(decodeError(error), "error");
  }
}
async function refresh() {
  if (!state.wallet) return;
  const owner = state.wallet.publicKey;
  try {
    const [pool, userState, positions] = await Promise.all([
      fetchPool(state.connection),
      fetchUserState(state.connection, owner),
      fetchPositions(state.connection, owner)
    ]);
    state.pool = pool;
    state.userState = userState;
    state.positions = positions.sort((a, b) => Number(a.startTs - b.startTs));
    state.balance = await loadBalance(owner, pool);
    renderSummary();
    renderPositions();
    renderTiers();
  } catch (error) {
    setStatus(`\u5237\u65B0\u5931\u8D25\uFF1A${decodeError(error)}`, "error");
  }
}
async function loadBalance(owner, pool) {
  if (!pool) return 0n;
  const ata = getAssociatedTokenAddressSync(new PublicKey(pool.mint), owner);
  try {
    const balance = await state.connection.getTokenAccountBalance(ata, "confirmed");
    return BigInt(balance.value.amount);
  } catch {
    return 0n;
  }
}
function tierLabel(index) {
  return getTiers()[index]?.label ?? `Tier ${index}`;
}
function renderSummary() {
  const pool = state.pool;
  const positions = state.positions.filter((p) => p.owner === state.wallet?.publicKey.toBase58());
  const staked = positions.reduce((sum, p) => sum + p.amount, 0n);
  const claimed = state.userState?.totalClaimed ?? 0n;
  const now = nowSeconds();
  const outstanding = positions.reduce(
    (sum, p) => sum + claimable(p.amount, p.aprBps, now - Number(p.startTs), p.capSecs, p.claimed),
    0n
  );
  const aprs = pool ? pool.tiers.map((tier) => formatBps(tier.aprBps)).join(" / ") : "\u2014";
  const card = $("#summary");
  card.replaceChildren(
    el(
      "div",
      { class: "grid-2" },
      statBox("\u4EE3\u5E01\u4F59\u989D", formatTokens(state.balance, config.token.decimals), config.token.symbol),
      statBox("\u8D28\u62BC\u4E2D", formatTokens(staked, config.token.decimals), `${positions.length} \u4E2A\u4ED3\u4F4D`),
      statBox("\u7D2F\u8BA1\u5DF2\u9886\u5956\u52B1", formatTokens(claimed, config.token.decimals), "\u94FE\u4E0A\u5DF2\u652F\u4ED8"),
      statBox("\u5F53\u524D\u53EF\u9886\u53D6", formatTokens(outstanding, config.token.decimals), "\u6309\u79D2\u7D2F\u8BA1")
    ),
    el("p", { class: "small muted", text: `\u5404\u6863 APR\uFF1A${aprs}\uFF08APR \u4EE5\u4ED3\u4F4D\u5F00\u4ED3\u65F6\u8BB0\u5F55\u4E3A\u51C6\uFF09` })
  );
  $("#summary-title").textContent = pool?.paused ? "\u8D28\u62BC\u6C60\u5DF2\u6682\u505C\u65B0\u8D28\u62BC" : "\u6211\u7684\u8D44\u4EA7";
  if (pool?.paused) {
    $("#stake").disabled = true;
    $("#stake").textContent = "\u5F53\u524D\u6682\u505C\u63A5\u53D7\u65B0\u8D28\u62BC";
  }
}
function renderAbout() {
  const host = $("#about");
  if (!host) return;
  const text = config.token.description || "";
  host.replaceChildren(
    ...text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph) => el("p", { class: "small muted", text: paragraph }))
  );
}
function statBox(label, value, hint) {
  return el(
    "div",
    { class: "stat" },
    el("span", { class: "stat__label", text: label }),
    el("strong", { class: "stat__value", text: value }),
    el("span", { class: "stat__hint", text: hint })
  );
}
function renderTiers() {
  const host = $("#tiers");
  const pool = state.pool;
  host.replaceChildren(
    ...getTiers().map((tier, index) => {
      const onChain = pool?.tiers[index];
      const aprBps = onChain ? onChain.aprBps : BigInt(tier.aprBps);
      const lockSecs = onChain ? Number(onChain.lockSecs) : tier.lockSecs;
      const card = el(
        "div",
        { class: `tier${state.selectedTier === index ? " is-active" : ""}`, role: "button", tabindex: "0" },
        el(
          "div",
          { class: "tier__main" },
          el("span", { class: "tier__apr", text: formatBps(aprBps) }),
          el("span", { class: "tier__meta", text: `${tier.label} \xB7 ${lockSecs === 0 ? "\u968F\u65F6\u53EF\u89E3\u9664" : `\u9501\u4ED3 ${Math.round(lockSecs / 86400)} \u5929`}` })
        ),
        el("span", { class: "tier__meta", text: onChain?.enabled === false ? "\u672A\u542F\u7528" : "\u9009\u62E9" })
      );
      const select = () => {
        state.selectedTier = index;
        renderTiers();
        renderStakeHint();
      };
      card.addEventListener("click", select);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") select();
      });
      return card;
    })
  );
  renderStakeHint();
}
function renderStakeHint() {
  const pool = state.pool;
  if (!pool) return;
  const tier = pool.tiers[state.selectedTier];
  const now = nowSeconds();
  let amount = 0n;
  try {
    amount = parseTokens($("#amount").value, config.token.decimals);
  } catch {
    amount = 0n;
  }
  const reward = amount > 0n ? maxReward(amount, tier.aprBps, tier.capSecs) : 0n;
  const unlock = Number(tier.lockSecs) === 0 ? "\u968F\u65F6\u53EF\u89E3\u9664" : formatDateTime(now + Number(tier.lockSecs));
  $("#amount-hint").replaceChildren(
    el("span", { class: "small muted", text: `\u6700\u574F\u60C5\u51B5\u5956\u52B1\uFF1A${formatTokens(reward, config.token.decimals)} ${config.token.symbol}` }),
    el("span", { class: "spacer" }),
    el("span", { class: "small muted", text: `\u5230\u671F\uFF1A${unlock}` })
  );
  const minimum = formatTokens(pool.minStake, config.token.decimals, 9);
  if (amount > 0n && amount < pool.minStake) {
    setStatus(`\u6700\u5C0F\u8D28\u62BC\u6570\u91CF\u4E3A ${minimum} ${config.token.symbol}`, "error");
  } else {
    setStatus("", "info");
  }
}
function renderPositions() {
  const host = $("#positions");
  const now = nowSeconds();
  if (!state.wallet) {
    host.replaceChildren(el("p", { class: "muted small", text: "\u8FDE\u63A5\u94B1\u5305\u540E\u663E\u793A\u4F60\u7684\u4ED3\u4F4D\u3002" }));
    return;
  }
  if (state.positions.length === 0) {
    host.replaceChildren(el("p", { class: "muted small", text: "\u8FD8\u6CA1\u6709\u8D28\u62BC\u4ED3\u4F4D\u3002" }));
    return;
  }
  host.replaceChildren(
    ...state.positions.map((position) => {
      const pending = claimable(
        position.amount,
        position.aprBps,
        now - Number(position.startTs),
        position.capSecs,
        position.claimed
      );
      const unlocked = now >= Number(position.unlockTs);
      const remaining = Number(position.unlockTs) - now;
      const claimButton = el(
        "button",
        { class: "btn btn--ghost btn--small", type: "button", onclick: (event) => onClaim(position, event.currentTarget) },
        pending > 0n ? `\u9886\u53D6 ${formatTokens(pending, config.token.decimals)}` : "\u6682\u65E0\u53EF\u9886\u53D6"
      );
      claimButton.disabled = pending === 0n;
      const unstakeButton = el(
        "button",
        { class: "btn btn--small", type: "button", onclick: (event) => onUnstake(position, event.currentTarget) },
        "\u89E3\u9664\u8D28\u62BC"
      );
      unstakeButton.disabled = !unlocked;
      return el(
        "div",
        { class: "position" },
        el(
          "div",
          { class: "position__head" },
          el("span", { class: "position__amount", text: `${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}` }),
          el("span", { class: "badge", text: `${tierLabel(position.tier)} \xB7 ${formatBps(position.aprBps)}` })
        ),
        el(
          "div",
          { class: "position__meta" },
          el("span", { text: `\u5F00\u4ED3\uFF1A${formatDateTime(position.startTs)}` }),
          el("span", {
            text: Number(position.unlockTs) === 0 ? "\u7075\u6D3B\u8D28\u62BC\uFF0C\u968F\u65F6\u53EF\u89E3\u9664" : unlocked ? `\u5DF2\u4E8E ${formatDateTime(position.unlockTs)} \u5230\u671F` : `\u9501\u4ED3\u81F3 ${formatDateTime(position.unlockTs)}\uFF08\u5269\u4F59 ${Math.ceil(remaining / 86400)} \u5929\uFF09`
          }),
          el("span", { text: `\u5DF2\u9886\uFF1A${formatTokens(position.claimed, config.token.decimals)}` })
        ),
        el("div", { class: "position__actions" }, claimButton, unstakeButton)
      );
    })
  );
}
async function onStake(event) {
  const button = event.currentTarget;
  if (!state.wallet) {
    toast("\u8BF7\u5148\u8FDE\u63A5\u94B1\u5305", "error");
    return;
  }
  let amount;
  try {
    amount = parseTokens($("#amount").value, config.token.decimals);
  } catch (error) {
    toast(error.message, "error");
    return;
  }
  if (amount <= 0n) {
    toast("\u8BF7\u8F93\u5165\u8D28\u62BC\u6570\u91CF", "error");
    return;
  }
  const pool = state.pool;
  const tier = pool.tiers[state.selectedTier];
  const owner = state.wallet.publicKey;
  const nonce = state.userState?.nextNonce ?? 0n;
  const unlockTs = Number(tier.lockSecs) === 0 ? 0 : nowSeconds() + Number(tier.lockSecs);
  const commitment = maxReward(amount, tier.aprBps, tier.capSecs);
  const confirmed = await reviewTransaction({
    title: "\u786E\u8BA4\u8D28\u62BC",
    subtitle: "\u4EA4\u6613\u5C06\u7531\u4F60\u7684\u94B1\u5305\u7B7E\u540D\uFF0C\u4EE3\u5E01\u4ECE\u4F60\u7684\u8D26\u6237\u8F6C\u5165\u8D28\u62BC\u5408\u7EA6\u91D1\u5E93\u3002",
    rows: [
      ["\u8D28\u62BC\u671F\u9650", `${tierLabel(state.selectedTier)}\uFF08${formatDuration(tier.lockSecs)}\uFF09`],
      ["APR", formatBps(tier.aprBps)],
      ["\u8D28\u62BC\u6570\u91CF", `${formatTokens(amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u5230\u671F\u65F6\u95F4", unlockTs === 0 ? "\u968F\u65F6\u53EF\u89E3\u9664" : formatDateTime(unlockTs)],
      ["\u9884\u7559\u5956\u52B1\uFF08\u6700\u574F\u60C5\u51B5\uFF09", formatTokens(commitment, config.token.decimals)],
      ["\u4F60\u7684\u94B1\u5305", shorten(owner.toBase58(), 6, 6)],
      ["\u5408\u7EA6", shorten(config.staking.programId, 6, 6)]
    ],
    risks: [
      "\u9501\u4ED3\u671F\u95F4\u672C\u91D1\u4E0D\u53EF\u63D0\u53D6\uFF0C\u5230\u671F\u524D\u65E0\u6CD5\u89E3\u9664\u3002",
      "\u53D1\u653E\u5956\u52B1\u53D6\u51B3\u4E8E\u5956\u52B1\u6C60\u4F59\u989D\uFF0C\u5408\u7EA6\u4F1A\u62D2\u7EDD\u8D85\u51FA\u9884\u7B97\u7684\u8D28\u62BC\u3002",
      "APR \u53EA\u662F\u53C2\u6570\uFF0C\u4E0D\u6784\u6210\u6536\u76CA\u627F\u8BFA\u3002"
    ]
  });
  if (!confirmed) return;
  await withBusy(button, async () => {
    try {
      const ix = ixStake({
        owner,
        userState: userStatePda(owner),
        position: positionPda(owner, nonce),
        ownerAta: getAssociatedTokenAddressSync(new PublicKey(pool.mint), owner),
        principalVault: new PublicKey(pool.principalVault),
        rewardVault: new PublicKey(pool.rewardVault),
        tier: state.selectedTier,
        amount,
        nonce
      });
      const { Transaction } = await import("./index.browser.esm-GSMPWBNF.js");
      const tx = new Transaction().add(ix);
      tx.feePayer = owner;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u8D28\u62BC\u6210\u529F\uFF1A${shorten(signature)}`, "ok");
      $("#amount").value = "";
      await refresh();
    } catch (error) {
      toast(decodeError(error), "error");
    }
  });
}
async function onClaim(position, button) {
  const owner = state.wallet.publicKey;
  const now = nowSeconds();
  const pending = claimable(position.amount, position.aprBps, now - Number(position.startTs), position.capSecs, position.claimed);
  const confirmed = await reviewTransaction({
    title: "\u9886\u53D6\u5956\u52B1",
    subtitle: "\u53EA\u8F6C\u79FB\u5DF2\u7D2F\u79EF\u7684\u5956\u52B1\uFF0C\u672C\u91D1\u7559\u5728\u5408\u7EA6\u4E2D\u7EE7\u7EED\u8BA1\u606F\u3002",
    rows: [
      ["\u4ED3\u4F4D", `${tierLabel(position.tier)} \xB7 ${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u672C\u6B21\u9886\u53D6", `${formatTokens(pending, config.token.decimals)} ${config.token.symbol}`],
      ["\u63A5\u6536\u5730\u5740", shorten(owner.toBase58(), 6, 6)]
    ],
    risks: ["\u9886\u53D6\u540E\u8BE5\u6BB5\u65F6\u95F4\u7684\u5956\u52B1\u5F52\u96F6\uFF0C\u4ED3\u4F4D\u7EE7\u7EED\u6309\u539F APR \u7D2F\u79EF\u3002"]
  });
  if (!confirmed) return;
  await withBusy(button, async () => {
    try {
      const ix = ixClaim({
        owner,
        userState: userStatePda(owner),
        position: new PublicKey(position.address),
        ownerAta: getAssociatedTokenAddressSync(new PublicKey(state.pool.mint), owner),
        rewardVault: new PublicKey(state.pool.rewardVault),
        nonce: position.nonce
      });
      const { Transaction } = await import("./index.browser.esm-GSMPWBNF.js");
      const tx = new Transaction().add(ix);
      tx.feePayer = owner;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u5DF2\u9886\u53D6\uFF1A${shorten(signature)}`, "ok");
      await refresh();
    } catch (error) {
      toast(decodeError(error), "error");
    }
  });
}
async function onUnstake(position, button) {
  const owner = state.wallet.publicKey;
  const unlocked = nowSeconds() >= Number(position.unlockTs);
  if (!unlocked) {
    toast("\u9501\u4ED3\u671F\u672A\u7ED3\u675F\uFF0C\u65E0\u6CD5\u89E3\u9664", "error");
    return;
  }
  const now = nowSeconds();
  const pending = claimable(position.amount, position.aprBps, now - Number(position.startTs), position.capSecs, position.claimed);
  const confirmed = await reviewTransaction({
    title: "\u89E3\u9664\u8D28\u62BC",
    subtitle: "\u672C\u91D1\u4E0E\u672A\u9886\u53D6\u5956\u52B1\u4F1A\u4E00\u8D77\u56DE\u5230\u4F60\u7684\u94B1\u5305\uFF0C\u4ED3\u4F4D\u8D26\u6237\u5173\u95ED\u3002",
    rows: [
      ["\u4ED3\u4F4D", `${tierLabel(position.tier)} \xB7 ${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u672C\u91D1", `${formatTokens(position.amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u672A\u9886\u53D6\u5956\u52B1", `${formatTokens(pending, config.token.decimals)} ${config.token.symbol}`],
      ["\u63A5\u6536\u5730\u5740", shorten(owner.toBase58(), 6, 6)]
    ],
    risks: ["\u89E3\u9664\u540E\u8BE5\u4ED3\u4F4D\u4E0D\u518D\u8BA1\u606F\uFF1B\u5982\u9700\u7EE7\u7EED\u8D28\u62BC\u9700\u91CD\u65B0\u5F00\u4ED3\uFF0C\u6309\u5F53\u65F6 APR \u6267\u884C\u3002"]
  });
  if (!confirmed) return;
  await withBusy(button, async () => {
    try {
      const ix = ixUnstake({
        owner,
        userState: userStatePda(owner),
        position: new PublicKey(position.address),
        ownerAta: getAssociatedTokenAddressSync(new PublicKey(state.pool.mint), owner),
        principalVault: new PublicKey(state.pool.principalVault),
        rewardVault: new PublicKey(state.pool.rewardVault),
        nonce: position.nonce
      });
      const { Transaction } = await import("./index.browser.esm-GSMPWBNF.js");
      const tx = new Transaction().add(ix);
      tx.feePayer = owner;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u5DF2\u89E3\u9664\uFF1A${shorten(signature)}`, "ok");
      await refresh();
    } catch (error) {
      toast(decodeError(error), "error");
    }
  });
}
window.addEventListener("aura:refresh", refresh);
$("#amount").addEventListener("input", renderStakeHint);
//# sourceMappingURL=user.js.map
