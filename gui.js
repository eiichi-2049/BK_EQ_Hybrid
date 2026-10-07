/* PARALLEL 推拉 — 可发现性 / 双击激活 / Normal 可调 / 模式锁 */
(function () {
  "use strict";

  const logEl = document.getElementById("log");
  const checks = { ring: false, hint: false, dbl: false, blend: false, lock: false, rotate: false };

  function log(msg) {
    logEl.textContent = msg + "\n" + logEl.textContent.split("\n").slice(0, 24).join("\n");
  }
  function mark(k) {
    if (checks[k]) return;
    checks[k] = true;
    const el = document.querySelector('.chk[data-k="' + k + '"]');
    if (el) el.classList.add("ok");
    log("✔ " + k);
  }

  // ---------- 模式状态 ----------
  const MODES = ["normal", "push", "pull"];
  const MODE_CN = { normal: "正常 · 混合可调", push: "按下 Push · Pultec 100%", pull: "拉出 Pull · SSL 100%" };
  let modeIdx = 0;
  let locked = false;
  let blend = 0.5; // 仅 normal 使用

  const modeRing = document.getElementById("modeRing");
  const modeBadge = document.getElementById("modeBadge");
  const statusEl = document.getElementById("status");
  const mixvalEl = document.getElementById("mixval");
  const weightsEl = document.getElementById("weights");
  const needle = document.getElementById("needle");
  const lockBox = document.getElementById("modeLock");
  const toast = document.getElementById("toast");

  function mode() { return MODES[modeIdx]; }

  function applyRouting() {
    const m = mode();
    let p = 0.5, s = 0.5;
    if (m === "push") { p = 1; s = 0; }
    else if (m === "pull") { p = 0; s = 1; }
    else { p = blend; s = 1 - blend; }

    if (modeRing) {
      modeRing.dataset.mode = m;
      mark("ring");
    }
    if (modeBadge) {
      modeBadge.textContent = MODE_CN[m];
      modeBadge.className = "mode-badge" + (m === "normal" ? "" : " " + m);
    }
    if (statusEl) {
      statusEl.textContent = m === "push" ? "左侧工作" : m === "pull" ? "右侧工作" : (p > 0.67 ? "左侧工作" : p < 0.33 ? "右侧工作" : "混合工作");
    }
    if (mixvalEl) mixvalEl.textContent = p.toFixed(3);
    if (weightsEl) weightsEl.textContent = "P " + Math.round(p * 100) + "% · S " + Math.round(s * 100) + "%";
    if (needle) needle.style.transform = "rotate(" + (-25 + p * 50) + "deg)";
    log("模式=" + m + "  P=" + p.toFixed(2) + " S=" + s.toFixed(2) + (locked ? " [锁]" : ""));
  }

  function setMode(i) {
    if (locked) { log("模式已锁定，双击无效"); return; }
    modeIdx = ((i % 3) + 3) % 3;
    if (mode() !== "normal") {
      const ptr = parallel && parallel.querySelector(".pointer");
      if (ptr) ptr.style.transform = "rotate(" + (mode() === "push" ? 135 : -135) + "deg)";
    }
    mark("dbl");
    applyRouting();
  }

  // ---------- 通用旋钮 ----------
  function initKnob(knob) {
    const min = parseFloat(knob.dataset.min || "0");
    const max = parseFloat(knob.dataset.max || "1");
    let val = parseFloat(knob.dataset.val || "0");
    const name = knob.dataset.name || "K";
    const isParallel = knob.id === "parallel";

    const ptr = document.createElement("div");
    ptr.className = "pointer";
    knob.appendChild(ptr);

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    knob.appendChild(label);

    const valEl = document.createElement("div");
    valEl.className = "val";
    knob.appendChild(valEl);

    function paint() {
      const n = (val - min) / (max - min || 1);
      if (!isParallel || mode() === "normal")
        ptr.style.transform = "rotate(" + (-135 + n * 270) + "deg)";
      valEl.textContent = val < 10 ? val.toFixed(2) : val.toFixed(0);
    }

    function setVal(v, silent) {
      val = Math.min(max, Math.max(min, v));
      paint();
      if (isParallel) {
        if (mode() === "normal") {
          blend = val;
          mark("blend");
          applyRouting();
        } else {
          applyRouting();
        }
      } else if (!silent) {
        log(name + " → " + valEl.textContent);
      }
    }

    let dragging = false, lastY = 0, moved = false, lastClick = 0;

    knob.addEventListener("pointerdown", (e) => {
      dragging = true; moved = false; lastY = e.clientY;
      knob.setPointerCapture(e.pointerId);
      knob.classList.add("dragging");
      e.preventDefault();
    });

    knob.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dy = lastY - e.clientY;
      if (Math.abs(dy) > 0.5) moved = true;
      lastY = e.clientY;
      // ③ 仅 Normal 可调比例；Push/Pull 旋转被忽略
      if (isParallel && mode() !== "normal") return;
      setVal(val + (dy / 150) * (max - min));
      mark("rotate");
    });

    knob.addEventListener("pointerup", (e) => {
      dragging = false;
      knob.classList.remove("dragging");
      if (!isParallel) return;

      const now = Date.now();
      const isDouble = now - lastClick < 320;
      lastClick = now;

      // ② 双击激活模式切换（单击不再直接切档，防误触）
      if (isDouble && !moved) {
        setMode(modeIdx + 1);
        return;
      }
      if (!moved) {
        log("提示：双击切换推/拉模式（已开启防误触）");
      }
    });

    setVal(val, true);
  }

  // ④ 模式锁
  if (lockBox) {
    lockBox.addEventListener("change", () => {
      locked = lockBox.checked;
      mark("lock");
      log(locked ? "模式锁 ON — 双击不会切换" : "模式锁 OFF");
      applyRouting();
    });
  }

  // ① 首次提示
  const btnHint = document.getElementById("btnHint");
  const toastOk = document.getElementById("toastOk");
  function hideToast() { if (toast) toast.classList.add("hidden"); mark("hint"); }
  if (toastOk) toastOk.addEventListener("click", hideToast);
  if (btnHint) btnHint.addEventListener("click", () => { if (toast) toast.classList.remove("hidden"); mark("hint"); });
  try {
    if (localStorage.getItem("bk_eq_hint_seen") === "1") hideToast();
    else {
      mark("hint");
      if (toastOk) toastOk.addEventListener("click", () => localStorage.setItem("bk_eq_hint_seen", "1"));
    }
  } catch (_) { mark("hint"); }

  const parallel = document.getElementById("parallel");
  document.querySelectorAll(".knob").forEach(initKnob);
  applyRouting();
  log("双击 PARALLEL 循环模式 · 拖拽仅在 Normal 调比例");
})();
