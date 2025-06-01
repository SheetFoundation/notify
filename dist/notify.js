var k = Object.defineProperty;
var M = (o, t, e) => t in o ? k(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var i = (o, t, e) => M(o, typeof t != "symbol" ? t + "" : t, e);
var B = /* @__PURE__ */ ((o) => (o.information = "information", o.success = "success", o.warning = "warning", o.danger = "danger", o))(B || {});
class S {
  constructor() {
    i(this, "popupMargin", 16);
    i(this, "topStartingPoint", 0);
    i(this, "template", `<div data-notify="container" class="notify-container notify-opening">
        <span class="notify-icon"></span>
        <div class="notify-content">
          <span data-notify="title"></span>
          <span data-notify="message"></span>
        </div>
        <button type="button" class="notify-close">
          x
        </button>
      </div>`);
    i(this, "icons", {
      information: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.5" style="width:1.5rem;height:1.5rem;position:relative;top:.15rem" viewBox="0 0 24 24">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M11.3 11.3h0a.8.8 0 0 1 1 .8l-.7 2.8a.8.8 0 0 0 1.1.9h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.8h0v0h0v0z"/>
    </svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>`,
      danger: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>`
    });
    i(this, "closeIcon", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M343 151a32 32 0 0 0-46-46L192 211 87 105a32 32 0 0 0-46 46l106 105L41 361a32 32 0 0 0 46 46l105-106 105 106a32 32 0 0 0 46-46L237 256l106-105z"/></svg>');
    i(this, "showIcon", !0);
    i(this, "showCloseButton", !0);
    i(this, "duration", 5e3);
    i(this, "notificationsCount", 0);
  }
  setDefaultSettings(t) {
    typeof t.showIcon < "u" && (this.showIcon = t.showIcon), typeof t.showCloseButton < "u" && (this.showCloseButton = t.showCloseButton), t.duration && (this.duration = t.duration), t.topStartingPoint && (this.topStartingPoint = t.topStartingPoint), t.template && (this.template = t.template);
  }
  getIcon(t) {
    return this.icons[t];
  }
  setIcon(t, e) {
    this.icons[t] = e;
  }
  getIcons() {
    return this.icons;
  }
  setIcons(t) {
    this.icons = t;
  }
  getCloseIcon() {
    return this.closeIcon;
  }
  setCloseIcon(t) {
    this.closeIcon = t;
  }
  show(t) {
    const e = document.createElement("template"), a = this.template.trim();
    e.innerHTML = a;
    const n = e.content.firstChild;
    if (!n) return;
    const s = t.icon ?? (t.type && this.icons[t.type] ? this.icons[t.type] : ""), l = t.title ?? "", u = t.message ?? "", w = t.type ?? "information", v = t.showIcon ?? this.showIcon, y = t.duration ?? this.duration, C = t.showCloseButton ?? this.showCloseButton;
    t.log && console.log(t.log);
    const r = n.querySelector(".notify-icon");
    r && (v ? r.innerHTML = s : r == null || r.remove());
    const p = n.querySelector("[data-notify=title]");
    p && (p.innerHTML = l);
    const f = n.querySelector("[data-notify=message]");
    f && (f.innerHTML = u);
    const g = document.querySelector("body");
    if (!g) return;
    n.id = "notify-" + (Math.random() + 1).toString(36).substring(7), n.classList.add("notify-" + w);
    let I = this.popupMargin + this.topStartingPoint;
    n.style.top = I + "px", n.setAttribute("data-notify-count", String(this.notificationsCount++)), g.append(n);
    const c = document.getElementById(n.id);
    if (!c) return;
    const m = c.getBoundingClientRect(), d = m.bottom - m.top + this.popupMargin;
    if (this.topStartingPoint += d, setTimeout(() => {
      this.hide(c, d);
    }, y), C) {
      const h = c.querySelector(".notify-close");
      h && (h.innerHTML = this.closeIcon), h && h.addEventListener("click", () => {
        this.hide(c, d);
      });
    }
  }
  hide(t, e) {
    t.classList.remove("notify-opening"), t.classList.add("notify-closing");
    const a = t.getAttribute("data-notify-count");
    setTimeout(() => {
      t.remove(), this.topStartingPoint -= e, document.querySelectorAll(".notify-container").forEach((s) => {
        const l = s.getAttribute("data-notify-count");
        if (l && a && l > a) {
          const u = s.getBoundingClientRect();
          s.style.top = u.top - e + "px";
        }
      });
    }, 500);
  }
}
const L = new S();
export {
  B as NotifyType,
  L as notify
};
