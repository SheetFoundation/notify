var S = Object.defineProperty;
var x = (i, t, o) => t in i ? S(i, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : i[t] = o;
var e = (i, t, o) => (x(i, typeof t != "symbol" ? t + "" : t, o), o);
class I {
  constructor() {
    e(this, "popupMargin", 16);
    e(this, "topStartingPoint", 0);
    e(this, "template", `<div data-notify="container" class="fixed mx-3 right-0 z-[9999] notify-container notify-opening">
        <span class="notify-icon"></span>
        <div data-notify="title-message-block">
          <span data-notify="title"></span>
          <span data-notify="message"></span>
        </div>
      </div>`);
    e(this, "icons", {
      information: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>`,
      danger: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>`
    });
    e(this, "showIcon", !0);
    e(this, "duration", 5e3);
  }
  setDefaultSettings(t) {
    typeof t.showIcon < "u" && (this.showIcon = t.showIcon), t.duration && (this.duration = t.duration), t.topStartingPoint && (this.topStartingPoint = t.topStartingPoint), t.template && (this.template = t.template);
  }
  getIcon(t) {
    return this.icons[t];
  }
  setIcon(t, o) {
    this.icons[t] = o;
  }
  getIcons() {
    return this.icons;
  }
  setIcons(t) {
    this.icons = t;
  }
  show(t) {
    const o = document.createElement("template"), u = this.template.trim();
    o.innerHTML = u;
    const n = o.content.firstChild;
    if (!n)
      return;
    const g = t.type && this.icons[t.type] ? this.icons[t.type] : "", m = t.title ?? "", f = t.message ?? "", w = t.type ?? "information", y = t.showIcon ?? this.showIcon, v = t.duration ?? this.duration;
    t.log && console.log(t.log);
    const a = n.querySelector(".notify-icon");
    a && y && (a.innerHTML = g);
    const c = n.querySelector("[data-notify=title]");
    c && (c.innerHTML = m);
    const l = n.querySelector("[data-notify=message]");
    l && (l.innerHTML = f);
    const d = document.querySelector("body");
    if (!d)
      return;
    n.id = "notify-" + (Math.random() + 1).toString(36).substring(7), n.classList.add("notify-" + w);
    let k = this.popupMargin + this.topStartingPoint;
    n.style.top = k + "px", d.append(n);
    const s = document.getElementById(n.id);
    if (!s)
      return;
    const p = s.getBoundingClientRect(), r = p.bottom - p.top + this.popupMargin;
    this.topStartingPoint += r, setTimeout(() => {
      s.classList.remove("notify-opening"), s.classList.add("notify-closing"), setTimeout(() => {
        s.remove(), this.topStartingPoint -= r, document.querySelectorAll(".notify-container").forEach((h) => {
          const M = h.getBoundingClientRect();
          h.style.top = M.top - r + "px";
        });
      }, 500);
    }, v);
  }
}
const T = new I();
export {
  T as notify
};
