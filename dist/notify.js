var k = Object.defineProperty;
var S = (o, t, n) => t in o ? k(o, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : o[t] = n;
var s = (o, t, n) => (S(o, typeof t != "symbol" ? t + "" : t, n), n);
class x {
  constructor() {
    s(this, "popupMargin", 16);
    s(this, "topStartingPoint", 0);
    s(this, "template", `<div data-notify="container" class="fixed mx-3 right-0 z-[9999] notify-container notify-opening">
        <span class="notify-icon"></span>
        <div data-notify="title-message-block">
          <span data-notify="title"></span>
          <span data-notify="message"></span>
        </div>
      </div>`);
    s(this, "icons", {
      information: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>`,
      danger: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>`
    });
  }
  show(t) {
    const n = document.createElement("template"), g = this.template.trim();
    n.innerHTML = g;
    const e = n.content.firstChild;
    if (!e)
      return;
    const y = t.type && this.icons[t.type] ? this.icons[t.type] : "", f = t.title ?? "", u = t.message ?? "", h = t.type ?? "information", v = t.duration ? parseInt(t.duration) : 5e3;
    t.log && console.log(t.log);
    const a = e.querySelector(".notify-icon");
    a && (a.innerHTML = y);
    const l = e.querySelector("[data-notify=title]");
    l && (l.innerHTML = f);
    const c = e.querySelector("[data-notify=message]");
    c && (c.innerHTML = u);
    const p = document.querySelector("body");
    if (!p)
      return;
    e.id = "notify-" + (Math.random() + 1).toString(36).substring(7), e.classList.add("notify-" + h);
    let w = this.popupMargin + this.topStartingPoint;
    e.style.top = w + "px", p.append(e);
    const i = document.getElementById(e.id);
    if (!i)
      return;
    const d = i.getBoundingClientRect(), r = d.bottom - d.top + this.popupMargin;
    this.topStartingPoint += r, setTimeout(() => {
      i.classList.remove("notify-opening"), i.classList.add("notify-closing"), setTimeout(() => {
        i.remove(), this.topStartingPoint -= r, document.querySelectorAll(".notify-container").forEach((m) => {
          const M = m.getBoundingClientRect();
          m.style.top = M.top - r + "px";
        });
      }, 500);
    }, v);
  }
}
const H = new x();
export {
  H as notify
};
