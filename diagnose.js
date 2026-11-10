import {
  $,
  chooseWallet,
  connectWallet,
  describeEnvironment,
  detectProviders,
  el,
  initI18n,
  onLangChange,
  setStatus,
  t,
  toast
} from "./chunk-YTZY3SPC.js";
import "./chunk-6BHCQRA3.js";

// src/diagnose.js
var env = describeEnvironment();
initI18n();
function yes(flag) {
  return el("td", { text: flag ? "\u2713" : "\u2014" });
}
function chooseWalletI18n(options) {
  return chooseWallet(options, {
    title: t("modal.chooseWalletTitle"),
    subtitle: t("modal.chooseWalletSubtitle"),
    cancel: t("common.cancel")
  });
}
function render() {
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
    ) : [el("tr", {}, el("td", { colspan: "5", text: t("diagnose.noInjected") }))]
  );
  $("#hint").textContent = env.candidates.length ? t("diagnose.hintYes") : t("diagnose.hintNo");
  $("#standard").replaceChildren(
    ...env.standard.length ? env.standard.map(
      (wallet) => el("div", {
        class: "kv__row kv__row--stack",
        text: `${wallet.name ?? t("diagnose.unknown")}\uFF5C${wallet.error ? t("diagnose.readError") : (wallet.features ?? []).join(", ")}`
      })
    ) : [el("p", { class: "small muted", text: t("diagnose.noStandard") })]
  );
  $("#raw").textContent = JSON.stringify(env, null, 2);
}
render();
onLangChange(render);
$("#copy-report").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(env, null, 2));
    toast(t("diagnose.copied"), "ok");
  } catch {
    toast(t("diagnose.copyFailed"), "error");
  }
});
$("#try-connect").addEventListener("click", async () => {
  const usable = detectProviders();
  if (usable.length === 0) {
    toast(t("diagnose.noWallet"), "error", 9e3);
    return;
  }
  try {
    const wallet = await connectWallet({ choose: chooseWalletI18n });
    setStatus(
      t("diagnose.connected", {
        wallet: wallet.label,
        address: wallet.publicKey.toBase58()
      }),
      "ok"
    );
  } catch (error) {
    setStatus(t("diagnose.connectFailed", { error: error.message }), "error");
    toast(error.message, "error", 9e3);
  }
});
//# sourceMappingURL=diagnose.js.map
