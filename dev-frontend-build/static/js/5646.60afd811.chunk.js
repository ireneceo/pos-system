"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5646],{512:(e,t,n)=>{n.d(t,{x:()=>D,A:()=>I});var r=n(9950),i=n(4752),a=n(4414);const s=["Su","Mo","Tu","We","Th","Fr","Sa"],o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,n,r]=e.split("-").map(Number);return new Date(t,n-1,r)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),d=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=i.Ay.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  padding: 20px 24px;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease-out;

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  }
`,u=i.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,x=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #E6EBF1;
  min-width: 120px;

  @media (max-width: 768px) {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid #E6EBF1;
    padding-right: 0;
    margin-right: 0;
    padding-bottom: 12px;
    margin-bottom: 16px;
    min-width: 0;
    gap: 4px;
  }
`,p=i.Ay.button`
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;

  &:hover {
    background: #F3F4F6;
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 8px 10px;
    background: #F6F9FC;
    border-radius: 8px;
  }
`,g=i.Ay.div``,m=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,y=i.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #6B7280;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,j=i.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,v=i.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,f=i.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=i.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,F=i.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,E=i.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=i.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.12s, color 0.12s;
  position: relative;
  user-select: none;

  color: ${e=>e.$isStart||e.$isEnd?"#FFFFFF":e.$isInRange?"#635BFF":"#374151"};
  background: ${e=>e.$isStart||e.$isEnd?"#635BFF":e.$isInRange?"#F0EEFF":"transparent"};
  font-weight: ${e=>e.$isStart||e.$isEnd||e.$isToday?700:400};

  ${e=>e.$isToday&&!e.$isStart&&!e.$isEnd&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 4px;\n      width: 4px;\n      height: 4px;\n      border-radius: 50%;\n      background: #635BFF;\n    }\n  "}

  ${e=>e.$isHoverEnd&&!e.$isStart&&!e.$isEnd&&"\n    background: #E8E5FF;\n    color: #635BFF;\n  "}

  &:hover {
    ${e=>!e.$isStart&&!e.$isEnd&&`\n      background: ${e.$isInRange?"#E8E5FF":"#F3F4F6"};\n    `}
  }
`,C=e=>{let{startDate:t,endDate:n,onRangeSelect:i,onClose:C,isOpen:$}=e;const D=new Date,[S,O]=(0,r.useState)(D.getMonth()),[R,B]=(0,r.useState)(D.getFullYear()),[P,I]=(0,r.useState)(null),[z,M]=(0,r.useState)(null),[N,T]=(0,r.useState)(null),[L,_]=(0,r.useState)("start"),W=(0,r.useRef)(null);(0,r.useEffect)(()=>{t&&I(l(t)),n&&M(l(n))},[t,n]),(0,r.useEffect)(()=>{$&&_("start")},[$]),(0,r.useEffect)(()=>{const e=e=>{W.current&&!W.current.contains(e.target)&&C()};return $&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[$,C]);const K=(0,r.useCallback)(()=>{0===S?(O(11),B(e=>e-1)):O(e=>e-1)},[S]),Y=(0,r.useCallback)(()=>{11===S?(O(0),B(e=>e+1)):O(e=>e+1)},[S]),U=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),r=((e,t)=>new Date(e,t,1).getDay())(e,t),l=[];for(let i=0;i<r;i++)l.push(null);for(let i=1;i<=n;i++)l.push(new Date(e,t,i));return(0,a.jsxs)(f,{children:[(0,a.jsx)(b,{children:d(e,t)}),(0,a.jsx)(w,{children:s.map(e=>(0,a.jsx)(F,{children:e},e))}),(0,a.jsx)(k,{children:l.map((e,t)=>{if(!e)return(0,a.jsx)(E,{},`e-${t}`);const{isStart:n,isEnd:r,isInRange:s,isHoverEnd:l}=(e=>{const t=P&&c(e,P),n=z&&c(e,z),r="end"===L&&N?N:z;let i=!1;if(P&&r){const[t,n]=P<=r?[P,r]:[r,P];i=((e,t,n)=>{const r=e.getTime();return r>t.getTime()&&r<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:i,isHoverEnd:"end"===L&&N&&c(e,N)}})(e),d=c(e,D);return(0,a.jsx)(A,{$isStart:!!n,$isEnd:!!r,$isInRange:s,$isHoverEnd:!!l,$isToday:d,onClick:()=>(e=>{if("start"===L)I(e),M(null),_("end");else{let t=P,n=e;n<t&&([t,n]=[n,t]),I(t),M(n),_("start"),i(o(t),o(n)),setTimeout(C,200)}})(e),onMouseEnter:()=>T(e),onMouseLeave:()=>T(null),children:e.getDate()},e.getTime())})})]})},H=11===S?0:S+1,V=11===S?R+1:R,q=e=>{const t=new Date;let n;const r=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}I(n),M(r),_("start"),i(o(n),o(r)),setTimeout(C,150)};return $?(0,a.jsx)(h,{ref:W,children:(0,a.jsxs)(u,{children:[(0,a.jsxs)(x,{children:[(0,a.jsx)(p,{onClick:()=>q("this_week"),children:"This Week"}),(0,a.jsx)(p,{onClick:()=>q("this_month"),children:"This Month"}),(0,a.jsx)(p,{onClick:()=>q("this_year"),children:"This Year"})]}),(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(y,{onClick:K,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(y,{onClick:Y,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(j,{children:[U(R,S),(0,a.jsx)(v,{children:U(V,H)})]})]})]})}):null},$=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,D=e=>{const t=new Date;let n=new Date;const r=new Date;switch(e){case"today":break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:$(n),end:$(r)}},S=i.Ay.div`
  margin-bottom: 24px;
`,O=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,R=i.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
    border-color: ${e=>e.active?"#5A51E6":"#CBD5E1"};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,B=i.Ay.div`
  position: relative;
  display: inline-block;
`,P=i.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${e=>e.active?"#F0EEFF":"#FFFFFF"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    gap: 6px;
  }
`,I=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:i,onPeriodChange:s,onCalendarRangeSelect:o,includeToday:l=!1,children:c}=e;const[d,h]=(0,r.useState)(!1),u=l?["today","week","month","year","all"]:["week","month","year","all"],x={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,a.jsx)(S,{children:(0,a.jsxs)(O,{children:[u.map(e=>(0,a.jsx)(R,{active:t===e&&!i,onClick:()=>s(e),children:x[e]},e)),(0,a.jsxs)(B,{children:[(0,a.jsxs)(P,{active:i,onClick:()=>h(!d),children:[(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,a.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,a.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,a.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,a.jsx)(C,{isOpen:d,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{o(e,t),h(!1)},onClose:()=>h(!1)})]}),c]})})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>d,oz:()=>c,tU:()=>l});n(9950);var r=n(4752),i=n(4414);const a=r.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,s=r.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,o=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:n,style:r}=e;return(0,i.jsx)(a,{className:n,style:r,children:t})},c=e=>{let{active:t,onClick:n,children:r,className:a}=e;return(0,i.jsx)(s,{active:t,onClick:n,className:a,children:r})},d=e=>{let{count:t,variant:n="default",showZero:r=!1}=e;return 0!==t||r?(0,i.jsx)(o,{variant:n,children:t}):null}},2653:(e,t,n)=>{n.d(t,{M:()=>a});var r=n(9950),i=n(4492);function a(e){const[t,n]=(0,i.ok)(),a=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[s,o]=(0,r.useState)(a());return[s,(0,r.useCallback)(e=>{o(e),n({tab:e})},[n])]}},5646:(e,t,n)=>{n.r(t),n.d(t,{default:()=>be});var r=n(9950),i=n(4752),a=n(8409),s=n(2597),o=n(2653),l=n(1095),c=n(2847),d=n(3245),h=n(158),u=n(3440),x=n(2174),p=n(7119),g=n(6256),m=n(2004),y=n(3485),j=n(6432),v=n(1958);function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f.apply(null,arguments)}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var F=32;class k extends r.PureComponent{renderIcon(e,t){var{inactiveColor:n}=this.props,i=16,a=F/6,s=F/3,o=e.inactive?n:e.color,l=null!==t&&void 0!==t?t:e.type;if("none"===l)return null;if("plainline"===l)return r.createElement("line",{strokeWidth:4,fill:"none",stroke:o,strokeDasharray:e.payload.strokeDasharray,x1:0,y1:i,x2:F,y2:i,className:"recharts-legend-icon"});if("line"===l)return r.createElement("path",{strokeWidth:4,fill:"none",stroke:o,d:"M0,".concat(i,"h").concat(s,"\n            A").concat(a,",").concat(a,",0,1,1,").concat(2*s,",").concat(i,"\n            H").concat(F,"M").concat(2*s,",").concat(i,"\n            A").concat(a,",").concat(a,",0,1,1,").concat(s,",").concat(i),className:"recharts-legend-icon"});if("rect"===l)return r.createElement("path",{stroke:"none",fill:o,d:"M0,".concat(4,"h").concat(F,"v").concat(24,"h").concat(-32,"z"),className:"recharts-legend-icon"});if(r.isValidElement(e.legendIcon)){var c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach(function(t){w(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e);return delete c.legendIcon,r.cloneElement(e.legendIcon,c)}return r.createElement(j.i,{fill:o,cx:i,cy:i,size:F,sizeType:"diameter",type:l})}renderItems(){var{payload:e,iconSize:t,layout:n,formatter:i,inactiveColor:a,iconType:s}=this.props,o={x:0,y:0,width:F,height:F},l={display:"horizontal"===n?"inline-block":"block",marginRight:10},c={display:"inline-block",verticalAlign:"middle",marginRight:4};return e.map((e,n)=>{var d=e.formatter||i,h=(0,m.$)({"recharts-legend-item":!0,["legend-item-".concat(n)]:!0,inactive:e.inactive});if("none"===e.type)return null;var u=e.inactive?a:e.color,x=d?d(e.value,e,n):e.value;return r.createElement("li",f({className:h,style:l,key:"legend-item-".concat(n)},(0,v.XC)(this.props,e,n)),r.createElement(y.u,{width:t,height:t,viewBox:o,style:c,"aria-label":"".concat(x," legend icon")},this.renderIcon(e,s)),r.createElement("span",{className:"recharts-legend-item-text",style:{color:u}},x))})}render(){var{payload:e,layout:t,align:n}=this.props;if(!e||!e.length)return null;var i={padding:0,margin:0,textAlign:"horizontal"===t?n:"left"};return r.createElement("ul",{className:"recharts-default-legend",style:i},this.renderItems())}}w(k,"displayName","Legend"),w(k,"defaultProps",{align:"center",iconSize:14,inactiveColor:"#ccc",layout:"horizontal",verticalAlign:"middle"});var E=n(1570),A=n(4661),C=n(3776),$=n(2852);var D=n(3241),S=n(9297),O=n(6873),R=["contextPayload"];function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},B.apply(null,arguments)}function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach(function(t){z(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function z(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function M(e){return e.value}function N(e){var{contextPayload:t}=e,n=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(-1!==t.indexOf(r))continue;n[r]=e[r]}return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],-1===t.indexOf(n)&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(e,R),i=(0,A.s)(t,e.payloadUniqBy,M),a=I(I({},n),{},{payload:i});return r.isValidElement(e.content)?r.cloneElement(e.content,a):"function"===typeof e.content?r.createElement(e.content,a):r.createElement(k,a)}function T(e){var t=(0,C.j)();return(0,r.useEffect)(()=>{t((0,O.h1)(e))},[t,e]),null}function L(e){var t=(0,C.j)();return(0,r.useEffect)(()=>(t((0,O.hx)(e)),()=>{t((0,O.hx)({width:0,height:0}))}),[t,e]),null}function _(e){var t=(0,C.G)($.g0),n=(0,g.M)(),i=(0,S.Kp)(),{width:a,height:s,wrapperStyle:o,portal:l}=e,[c,d]=(0,D.V)([t]),h=(0,S.yi)(),u=(0,S.rY)(),x=h-(i.left||0)-(i.right||0),m=W.getWidthOrHeight(e.layout,s,a,x),y=l?o:I(I({position:"absolute",width:(null===m||void 0===m?void 0:m.width)||a||"auto",height:(null===m||void 0===m?void 0:m.height)||s||"auto"},function(e,t,n,r,i,a){var s,o,{layout:l,align:c,verticalAlign:d}=t;return e&&(void 0!==e.left&&null!==e.left||void 0!==e.right&&null!==e.right)||(s="center"===c&&"vertical"===l?{left:((r||0)-a.width)/2}:"right"===c?{right:n&&n.right||0}:{left:n&&n.left||0}),e&&(void 0!==e.top&&null!==e.top||void 0!==e.bottom&&null!==e.bottom)||(o="middle"===d?{top:((i||0)-a.height)/2}:"bottom"===d?{bottom:n&&n.bottom||0}:{top:n&&n.top||0}),I(I({},s),o)}(o,e,i,h,u,c)),o),j=null!==l&&void 0!==l?l:n;if(null==j)return null;var v=r.createElement("div",{className:"recharts-legend-wrapper",style:y,ref:d},r.createElement(T,{layout:e.layout,align:e.align,verticalAlign:e.verticalAlign,itemSorter:e.itemSorter}),r.createElement(L,{width:c.width,height:c.height}),r.createElement(N,B({},e,m,{margin:i,chartWidth:h,chartHeight:u,contextPayload:t})));return(0,p.createPortal)(v,j)}class W extends r.PureComponent{static getWidthOrHeight(e,t,n,r){return"vertical"===e&&(0,E.Et)(t)?{height:t}:"horizontal"===e?{width:n||r}:null}render(){return r.createElement(_,this.props)}}z(W,"displayName","Legend"),z(W,"defaultProps",{align:"center",iconSize:14,itemSorter:"value",layout:"horizontal",verticalAlign:"bottom"});var K=n(4915),Y=n(7621),U=n(5297),H=n(2528),V=n(294),q=n(3588),G=n(6038),Z=n(9018),Q=n(512),X=n(4414);const J=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,ee=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,te=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  @media (max-width: 768px) { font-size: 20px; }
`,ne=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,re=i.Ay.div`
  padding: 24px 32px;
  @media (max-width: 768px) { padding: 16px; }
`,ie=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,ae=i.Ay.button`
  padding: 8px 16px;
  background: white;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
  &:hover { background: #F8FAFC; }
`,se=i.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`,oe=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,le=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`,ce=i.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  overflow-x: auto;
`,de=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,he=i.Ay.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  border-bottom: 2px solid #E6EBF1;
  white-space: nowrap;
`,ue=i.Ay.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #0A2540;
  border-bottom: 1px solid #F3F4F6;
`,xe=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"paid":return"#DCFCE7";case"pending_payment":return"#FEF3C7";case"payment_submitted":return"#DBEAFE";case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"pending_payment":return"#D97706";case"payment_submitted":return"#2563EB";case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,pe=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,ge=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
  font-size: 14px;
`,me=["#635BFF","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7"],ye={subscription:"Subscription",service:"Service",consulting:"Consulting",rent:"Rent",others:"Others"},je={stripe:"Stripe",paypal:"PayPal",bank_transfer:"Bank Transfer",qr_payment:"QR Payment"},ve={restaurant:"Restaurant",brand_manager:"Brand Manager",foodcourt_manager:"Foodcourt Manager",restaurant_owner:"Restaurant Owner"},fe={draft:"Draft",pending_payment:"Pending Payment",payment_submitted:"Payment Submitted",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"},be=()=>{const{operationSettings:e,siteTimezone:t}=(0,Z.Pj)(),n=(null===e||void 0===e?void 0:e.currency)||"MYR",[i,p]=(0,o.M)("revenue"),[g,m]=(0,r.useState)("month"),[y,j]=(0,r.useState)(()=>(0,Q.x)("month")),[v,f]=(0,r.useState)(!1),[b,w]=(0,r.useState)(""),[F,k]=(0,r.useState)(!1),[E,A]=(0,r.useState)(!1),[C,$]=(0,r.useState)([]);(0,r.useEffect)(()=>{(async()=>{const e=localStorage.getItem("auth_token"),t=e?{Authorization:`Bearer ${e}`}:{};let r=[];try{const e=await fetch("/api/currencies/supported",{headers:t});if(e.ok){const t=await e.json();r=(t.data||t||[]).map(e=>"string"===typeof e?e:e.code)}}catch{}0===r.length&&(r=[n]),$(r);try{var i;const e=await fetch("/api/admin-reports/default-currency",{headers:t}),n=await e.json();n.success&&null!==(i=n.data)&&void 0!==i&&i.currency&&r.includes(n.data.currency)?w(n.data.currency):w(r[0])}catch{w(r[0])}A(!0)})()},[n]);const[D,S]=(0,r.useState)(null),[O,R]=(0,r.useState)([]),[B,P]=(0,r.useState)([]),[I,z]=(0,r.useState)(null),[M,N]=(0,r.useState)([]),[T,L]=(0,r.useState)(null),[_,be]=(0,r.useState)(null),we=(0,r.useCallback)(()=>"all"!==g||v?`start_date=${y.start}&end_date=${y.end}`:"period=all",[g,v,y]),Fe=(0,r.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const n=localStorage.getItem("auth_token"),r=t?"?"+t:"",i=b?r?`&currency=${b}`:`?currency=${b}`:"",a=await fetch(`/api/admin-reports/${e}${r}${i}`,{headers:n?{Authorization:`Bearer ${n}`}:{}}),s=await a.json();if(!s.success)throw new Error(s.error||"API Error");return s.data},[b]),ke=(0,r.useCallback)(async()=>{k(!0);try{const e=we(),[t,n,r]=await Promise.all([Fe("revenue-summary",e),Fe("revenue-trend"),Fe("revenue-by-category",e)]);S(t),R(n),P(r)}catch(e){console.error("Error fetching revenue data:",e)}k(!1)},[Fe,we]),Ee=(0,r.useCallback)(async()=>{k(!0);try{const e=we(),[t,n]=await Promise.all([Fe("payment-analysis",e),Fe("overdue-invoices")]);z(t),N(n)}catch(e){console.error("Error fetching payment data:",e)}k(!1)},[Fe,we]),Ae=(0,r.useCallback)(async()=>{k(!0);try{const e=we(),t=await Fe("customer-analysis",e);L(t)}catch(e){console.error("Error fetching customer data:",e)}k(!1)},[Fe,we]),Ce=(0,r.useCallback)(async()=>{k(!0);try{const e=await Fe("subscription-stats");be(e)}catch(e){console.error("Error fetching subscription data:",e)}k(!1)},[Fe]);(0,r.useEffect)(()=>{if(E&&b)switch(i){case"revenue":ke();break;case"payment":Ee();break;case"customer":Ae();break;case"subscription":Ce()}},[i,g,b,y,E]);return(0,X.jsx)(X.Fragment,{children:(0,X.jsxs)(J,{children:[(0,X.jsxs)(ee,{children:[(0,X.jsx)(te,{children:"Reports"}),(0,X.jsx)(ne,{children:(0,X.jsx)(ae,{onClick:()=>{let e="",t="";if("revenue"===i&&D?(e="Metric,Value\n",e+=`Total Revenue,${D.totalRevenue}\n`,e+=`Pending Amount,${D.pendingAmount}\n`,e+=`Paid Invoices,${D.paidInvoices}/${D.totalInvoices}\n`,e+=`Collection Rate,${D.collectionRate}%\n\n`,e+="Category,Count,Total\n",B.forEach(t=>{e+=`${t.category},${t.count},${t.total}\n`}),t="revenue-report.csv"):"payment"===i&&I?(e="Status,Count,Amount\n",I.statusBreakdown.forEach(t=>{e+=`${t.status},${t.count},${t.total}\n`}),e+="\nPayment Method,Count,Amount\n",I.paymentMethods.forEach(t=>{e+=`${t.method},${t.count},${t.total}\n`}),t="payment-report.csv"):"customer"===i&&T?(e="Restaurant,Revenue,Invoices,Overdue\n",T.topRestaurants.forEach(t=>{e+=`${t.restaurantName},${t.totalRevenue},${t.invoiceCount},${t.overdueCount}\n`}),t="customer-report.csv"):"subscription"===i&&_&&(e="Plan,Subscribers,Monthly Revenue\n",_.planDistribution.forEach(t=>{e+=`${t.planName},${t.subscriberCount},${t.monthlyRevenue}\n`}),t="subscription-report.csv"),e){const n=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=t,i.click(),URL.revokeObjectURL(r)}},children:"Export CSV"})})]}),(0,X.jsxs)(re,{children:[(0,X.jsxs)(s.tU,{children:[(0,X.jsx)(s.oz,{active:"revenue"===i,onClick:()=>p("revenue"),children:"Revenue"}),(0,X.jsx)(s.oz,{active:"payment"===i,onClick:()=>p("payment"),children:"Payment"}),(0,X.jsx)(s.oz,{active:"customer"===i,onClick:()=>p("customer"),children:"Customer"}),(0,X.jsx)(s.oz,{active:"subscription"===i,onClick:()=>p("subscription"),children:"Subscription"})]}),(0,X.jsx)(Q.A,{activePeriod:g,dateRange:y,isCustomDateRange:v,onPeriodChange:e=>{m(e),f(!1),j((0,Q.x)(e))},onCalendarRangeSelect:(e,t)=>{f(!0),m("all"),j({start:e,end:t})},children:(0,X.jsx)(ie,{value:b,onChange:e=>w(e.target.value),children:C.map(e=>(0,X.jsx)("option",{value:e,children:e},e))})}),"revenue"===i&&(()=>{if(F)return(0,X.jsx)(pe,{children:"Loading revenue data..."});if(!D)return(0,X.jsx)(ge,{children:"No data available"});const e=B.reduce((e,t)=>e+t.total,0);return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(a.MD,{children:[(0,X.jsxs)(a.hI,{color:"#059669",children:[(0,X.jsx)(a.Os,{children:(0,G.vv)(D.totalRevenue,b)}),(0,X.jsx)(a.v0,{children:"Total Revenue"}),(0,X.jsx)(a.d1,{children:"Collected payments"})]}),(0,X.jsxs)(a.hI,{color:"#D97706",children:[(0,X.jsx)(a.Os,{children:(0,G.vv)(D.pendingAmount,b)}),(0,X.jsx)(a.v0,{children:"Pending Amount"}),(0,X.jsx)(a.d1,{children:"Awaiting payment"})]}),(0,X.jsxs)(a.hI,{color:"#635BFF",children:[(0,X.jsxs)(a.Os,{children:[D.paidInvoices," / ",D.totalInvoices]}),(0,X.jsx)(a.v0,{children:"Paid Invoices"}),(0,X.jsx)(a.d1,{children:"Completed / Total"})]}),(0,X.jsxs)(a.hI,{color:"#2563EB",children:[(0,X.jsxs)(a.Os,{children:[D.collectionRate,"%"]}),(0,X.jsx)(a.v0,{children:"Collection Rate"}),(0,X.jsx)(a.d1,{children:"Payment success rate"})]})]}),(0,X.jsxs)(le,{children:[(0,X.jsxs)(se,{children:[(0,X.jsx)(oe,{children:"Revenue Trend (Last 12 Months)"}),O.length>0?(0,X.jsx)(l.u,{width:"100%",height:300,children:(0,X.jsxs)(c.b,{data:O,children:[(0,X.jsx)(d.d,{strokeDasharray:"3 3",stroke:"#E6EBF1"}),(0,X.jsx)(h.W,{dataKey:"month",tick:{fontSize:12}}),(0,X.jsx)(u.h,{tick:{fontSize:12}}),(0,X.jsx)(x.m,{formatter:e=>(0,G.vv)(e,b)}),(0,X.jsx)(W,{}),(0,X.jsx)(K.N,{type:"monotone",dataKey:"billed",stroke:"#635BFF",strokeWidth:2,name:"Billed",dot:{r:3}}),(0,X.jsx)(K.N,{type:"monotone",dataKey:"collected",stroke:"#059669",strokeWidth:2,name:"Collected",dot:{r:3}})]})}):(0,X.jsx)(ge,{children:"No trend data"})]}),(0,X.jsxs)(se,{children:[(0,X.jsx)(oe,{children:"Revenue by Category"}),B.length>0?(0,X.jsx)(l.u,{width:"100%",height:300,children:(0,X.jsxs)(Y.r,{children:[(0,X.jsx)(U.F,{data:B.map(e=>({...e,name:ye[e.category]||e.category})),dataKey:"total",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:B.map((e,t)=>(0,X.jsx)(H.f,{fill:me[t%me.length]},t))}),(0,X.jsx)(x.m,{formatter:e=>(0,G.vv)(e,b)})]})}):(0,X.jsx)(ge,{children:"No category data"})]})]}),(0,X.jsxs)(ce,{children:[(0,X.jsx)(oe,{children:"Revenue by Category (Detail)"}),(0,X.jsxs)(de,{children:[(0,X.jsx)("thead",{children:(0,X.jsxs)("tr",{children:[(0,X.jsx)(he,{children:"Category"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Invoices"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Amount"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Share"})]})}),(0,X.jsx)("tbody",{children:B.map((t,n)=>(0,X.jsxs)("tr",{children:[(0,X.jsx)(ue,{children:ye[t.category]||t.category}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:t.count}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:(0,G.vv)(t.total,b)}),(0,X.jsxs)(ue,{style:{textAlign:"right"},children:[e>0?(t.total/e*100).toFixed(1):0,"%"]})]},n))})]})]})]})})(),"payment"===i&&(F?(0,X.jsx)(pe,{children:"Loading payment data..."}):I?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(a.MD,{children:[(0,X.jsxs)(a.hI,{color:"#DC2626",children:[(0,X.jsx)(a.Os,{children:I.overdueCount}),(0,X.jsx)(a.v0,{children:"Overdue Invoices"}),(0,X.jsx)(a.d1,{children:(0,G.vv)(I.overdueAmount,b)})]}),(0,X.jsxs)(a.hI,{color:"#635BFF",children:[(0,X.jsxs)(a.Os,{children:[I.avgPaymentDays," days"]}),(0,X.jsx)(a.v0,{children:"Avg Payment Time"}),(0,X.jsx)(a.d1,{children:"Issue to payment"})]}),(0,X.jsxs)(a.hI,{color:"#2563EB",children:[(0,X.jsx)(a.Os,{children:I.awaitingCount}),(0,X.jsx)(a.v0,{children:"Awaiting Confirmation"}),(0,X.jsx)(a.d1,{children:"Payment submitted"})]}),(0,X.jsxs)(a.hI,{color:"#059669",children:[(0,X.jsx)(a.Os,{children:(0,G.vv)(I.thisMonthCollected,b)}),(0,X.jsx)(a.v0,{children:"This Month Collected"}),(0,X.jsx)(a.d1,{children:"Current month"})]})]}),(0,X.jsxs)(le,{children:[(0,X.jsxs)(ce,{children:[(0,X.jsx)(oe,{children:"Payment Status Breakdown"}),(0,X.jsxs)(de,{children:[(0,X.jsx)("thead",{children:(0,X.jsxs)("tr",{children:[(0,X.jsx)(he,{children:"Status"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Count"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Amount"})]})}),(0,X.jsx)("tbody",{children:I.statusBreakdown.map((e,t)=>(0,X.jsxs)("tr",{children:[(0,X.jsx)(ue,{children:(0,X.jsx)(xe,{status:e.status,children:fe[e.status]||e.status})}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:e.count}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:(0,G.vv)(e.total,b)})]},t))})]})]}),(0,X.jsxs)(se,{children:[(0,X.jsx)(oe,{children:"Payment Methods"}),I.paymentMethods.length>0?(0,X.jsx)(l.u,{width:"100%",height:300,children:(0,X.jsxs)(Y.r,{children:[(0,X.jsx)(U.F,{data:I.paymentMethods.map(e=>({...e,name:je[e.method]||e.method})),dataKey:"count",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:I.paymentMethods.map((e,t)=>(0,X.jsx)(H.f,{fill:me[t%me.length]},t))}),(0,X.jsx)(x.m,{})]})}):(0,X.jsx)(ge,{children:"No payment method data"})]})]}),M.length>0&&(0,X.jsxs)(ce,{children:[(0,X.jsxs)(oe,{children:["Overdue Invoices (",M.length,")"]}),(0,X.jsxs)(de,{children:[(0,X.jsx)("thead",{children:(0,X.jsxs)("tr",{children:[(0,X.jsx)(he,{children:"Invoice #"}),(0,X.jsx)(he,{children:"Restaurant"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Amount"}),(0,X.jsx)(he,{children:"Due Date"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Days Overdue"})]})}),(0,X.jsx)("tbody",{children:M.map(e=>(0,X.jsxs)("tr",{children:[(0,X.jsx)(ue,{style:{fontWeight:500},children:e.invoiceNumber}),(0,X.jsx)(ue,{children:e.restaurantName}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:(0,G.vv)(e.amount,e.currency)}),(0,X.jsx)(ue,{children:new Date(e.dueDate).toLocaleDateString("en-GB",{timeZone:t||"Asia/Kuala_Lumpur"})}),(0,X.jsx)(ue,{style:{textAlign:"right",color:e.daysOverdue>30?"#DC2626":"#D97706",fontWeight:600},children:e.daysOverdue})]},e.id))})]})]})]}):(0,X.jsx)(ge,{children:"No data available"})),"customer"===i&&(F?(0,X.jsx)(pe,{children:"Loading customer data..."}):T?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(a.MD,{children:[(0,X.jsxs)(a.hI,{color:"#6366F1",children:[(0,X.jsx)(a.Os,{children:T.totalRestaurants}),(0,X.jsx)(a.v0,{children:"Total Restaurants"}),(0,X.jsx)(a.d1,{children:"All registered"})]}),(0,X.jsxs)(a.hI,{color:"#059669",children:[(0,X.jsx)(a.Os,{children:T.activeRestaurants}),(0,X.jsx)(a.v0,{children:"Active Restaurants"}),(0,X.jsx)(a.d1,{children:"With invoices (3 months)"})]}),(0,X.jsxs)(a.hI,{color:"#2563EB",children:[(0,X.jsx)(a.Os,{children:T.newThisMonth}),(0,X.jsx)(a.v0,{children:"New This Month"}),(0,X.jsx)(a.d1,{children:"Recently registered"})]}),(0,X.jsxs)(a.hI,{color:"#F59E0B",children:[(0,X.jsx)(a.Os,{children:(0,G.vv)(T.arpu,b)}),(0,X.jsx)(a.v0,{children:"ARPU"}),(0,X.jsx)(a.d1,{children:"Avg revenue per restaurant"})]})]}),(0,X.jsxs)(le,{children:[(0,X.jsxs)(se,{children:[(0,X.jsx)(oe,{children:"Monthly Registration Trend"}),T.registrationTrend.length>0?(0,X.jsx)(l.u,{width:"100%",height:300,children:(0,X.jsxs)(V.E,{data:T.registrationTrend,children:[(0,X.jsx)(d.d,{strokeDasharray:"3 3",stroke:"#E6EBF1"}),(0,X.jsx)(h.W,{dataKey:"month",tick:{fontSize:12}}),(0,X.jsx)(u.h,{tick:{fontSize:12},allowDecimals:!1}),(0,X.jsx)(x.m,{}),(0,X.jsx)(q.y,{dataKey:"count",fill:"#635BFF",radius:[4,4,0,0],name:"New Restaurants"})]})}):(0,X.jsx)(ge,{children:"No registration data"})]}),(0,X.jsxs)(se,{children:[(0,X.jsx)(oe,{children:"Payer Type Distribution"}),T.payerDistribution.length>0?(0,X.jsx)(l.u,{width:"100%",height:300,children:(0,X.jsxs)(Y.r,{children:[(0,X.jsx)(U.F,{data:T.payerDistribution.map(e=>({...e,name:ve[e.payerType]||e.payerType})),dataKey:"total",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:T.payerDistribution.map((e,t)=>(0,X.jsx)(H.f,{fill:me[t%me.length]},t))}),(0,X.jsx)(x.m,{formatter:e=>(0,G.vv)(e,b)})]})}):(0,X.jsx)(ge,{children:"No payer data"})]})]}),(0,X.jsxs)(ce,{children:[(0,X.jsx)(oe,{children:"Top 10 Restaurants by Revenue"}),(0,X.jsxs)(de,{children:[(0,X.jsx)("thead",{children:(0,X.jsxs)("tr",{children:[(0,X.jsx)(he,{children:"#"}),(0,X.jsx)(he,{children:"Restaurant"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Total Revenue"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Invoices"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Overdue"})]})}),(0,X.jsx)("tbody",{children:T.topRestaurants.map((e,t)=>(0,X.jsxs)("tr",{children:[(0,X.jsx)(ue,{style:{fontWeight:600,color:t<3?"#635BFF":"#6B7280"},children:t+1}),(0,X.jsx)(ue,{style:{fontWeight:500},children:e.restaurantName}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:(0,G.vv)(e.totalRevenue,b)}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:e.invoiceCount}),(0,X.jsx)(ue,{style:{textAlign:"right",color:e.overdueCount>0?"#DC2626":"#059669"},children:e.overdueCount})]},t))})]})]})]}):(0,X.jsx)(ge,{children:"No data available"})),"subscription"===i&&(()=>{if(F)return(0,X.jsx)(pe,{children:"Loading subscription data..."});if(!_)return(0,X.jsx)(ge,{children:"No data available"});const e=_.planDistribution.reduce((e,t)=>e+t.monthlyRevenue,0);return(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(a.MD,{children:[(0,X.jsxs)(a.hI,{color:"#7C3AED",children:[(0,X.jsx)(a.Os,{children:_.activePlans}),(0,X.jsx)(a.v0,{children:"Active Plans"}),(0,X.jsx)(a.d1,{children:"Currently available"})]}),(0,X.jsxs)(a.hI,{color:"#059669",children:[(0,X.jsx)(a.Os,{children:(0,G.vv)(_.mrr,b)}),(0,X.jsx)(a.v0,{children:"MRR"}),(0,X.jsx)(a.d1,{children:"Monthly Recurring Revenue"})]}),(0,X.jsxs)(a.hI,{color:"#F59E0B",children:[(0,X.jsx)(a.Os,{children:(0,G.vv)(_.arpu,b)}),(0,X.jsx)(a.v0,{children:"ARPU"}),(0,X.jsx)(a.d1,{children:"Avg per subscriber"})]}),(0,X.jsxs)(a.hI,{color:"#635BFF",children:[(0,X.jsx)(a.Os,{style:{fontSize:"16px"},children:_.mostPopularPlan}),(0,X.jsx)(a.v0,{children:"Most Popular"}),(0,X.jsxs)(a.d1,{children:[_.activeSubscribers," subscribers"]})]})]}),(0,X.jsxs)(le,{children:[(0,X.jsxs)(ce,{children:[(0,X.jsx)(oe,{children:"Plan Revenue Breakdown"}),(0,X.jsxs)(de,{children:[(0,X.jsx)("thead",{children:(0,X.jsxs)("tr",{children:[(0,X.jsx)(he,{children:"Plan"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Subscribers"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Monthly Revenue"}),(0,X.jsx)(he,{style:{textAlign:"right"},children:"Share"})]})}),(0,X.jsxs)("tbody",{children:[_.planDistribution.map((t,n)=>(0,X.jsxs)("tr",{children:[(0,X.jsx)(ue,{style:{fontWeight:500},children:t.planName}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:t.subscriberCount}),(0,X.jsx)(ue,{style:{textAlign:"right"},children:(0,G.vv)(t.monthlyRevenue,b)}),(0,X.jsxs)(ue,{style:{textAlign:"right"},children:[e>0?(t.monthlyRevenue/e*100).toFixed(1):0,"%"]})]},n)),0===_.planDistribution.length&&(0,X.jsx)("tr",{children:(0,X.jsx)(ue,{colSpan:4,style:{textAlign:"center",color:"#9CA3AF"},children:"No subscription data yet"})})]})]})]}),(0,X.jsxs)(se,{children:[(0,X.jsx)(oe,{children:"Plan Distribution"}),_.planDistribution.length>0?(0,X.jsx)(l.u,{width:"100%",height:300,children:(0,X.jsxs)(Y.r,{children:[(0,X.jsx)(U.F,{data:_.planDistribution,dataKey:"subscriberCount",nameKey:"planName",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{planName:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:_.planDistribution.map((e,t)=>(0,X.jsx)(H.f,{fill:me[t%me.length]},t))}),(0,X.jsx)(x.m,{})]})}):(0,X.jsx)(ge,{children:"No plan data"})]})]})]})})()]})]})})}}}]);