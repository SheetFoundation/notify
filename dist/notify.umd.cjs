(function(o,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(o=typeof globalThis<"u"?globalThis:o||self,e(o.Notify={}))})(this,function(o){"use strict";var L=Object.defineProperty;var T=(o,e,s)=>e in o?L(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s;var i=(o,e,s)=>T(o,typeof e!="symbol"?e+"":e,s);var e=(r=>(r.information="information",r.success="success",r.warning="warning",r.danger="danger",r))(e||{});class s{constructor(){i(this,"popupMargin",16);i(this,"topStartingPoint",0);i(this,"template",`<div data-notify="container" class="notify-container notify-opening">
        <span class="notify-icon"></span>
        <div data-notify="title-message-block">
          <span data-notify="title"></span>
          <span data-notify="message"></span>
        </div>
      </div>`);i(this,"icons",{information:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>`,success:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>`,warning:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>`,danger:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; position: relative; top: .15rem">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>`});i(this,"showIcon",!0);i(this,"duration",5e3)}setDefaultSettings(t){typeof t.showIcon<"u"&&(this.showIcon=t.showIcon),t.duration&&(this.duration=t.duration),t.topStartingPoint&&(this.topStartingPoint=t.topStartingPoint),t.template&&(this.template=t.template)}getIcon(t){return this.icons[t]}setIcon(t,c){this.icons[t]=c}getIcons(){return this.icons}setIcons(t){this.icons=t}show(t){const c=document.createElement("template"),w=this.template.trim();c.innerHTML=w;const n=c.content.firstChild;if(!n)return;const y=t.icon??(t.type&&this.icons[t.type]?this.icons[t.type]:""),v=t.title??"",k=t.message??"",M=t.type??"information",S=t.showIcon??this.showIcon,I=t.duration??this.duration;t.log&&console.log(t.log);const d=n.querySelector(".notify-icon");d&&S&&(d.innerHTML=y);const p=n.querySelector("[data-notify=title]");p&&(p.innerHTML=v);const h=n.querySelector("[data-notify=message]");h&&(h.innerHTML=k);const m=document.querySelector("body");if(!m)return;n.id="notify-"+(Math.random()+1).toString(36).substring(7),n.classList.add("notify-"+M);let x=this.popupMargin+this.topStartingPoint;n.style.top=x+"px",m.append(n);const a=document.getElementById(n.id);if(!a)return;const u=a.getBoundingClientRect(),l=u.bottom-u.top+this.popupMargin;this.topStartingPoint+=l,setTimeout(()=>{a.classList.remove("notify-opening"),a.classList.add("notify-closing"),setTimeout(()=>{a.remove(),this.topStartingPoint-=l,document.querySelectorAll(".notify-container").forEach(g=>{const b=g.getBoundingClientRect();g.style.top=b.top-l+"px"})},500)},I)}}const f=new s;o.NotifyType=e,o.notify=f,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
