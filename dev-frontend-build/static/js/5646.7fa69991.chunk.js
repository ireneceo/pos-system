"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5646],{512:(e,t,r)=>{r.d(t,{x:()=>S,A:()=>z});var n=r(9950),a=r(4752),i=r(5030),s=r(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],l=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),h=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),u=a.Ay.div`
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
`,p=a.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,x=a.Ay.div`
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
`,g=a.Ay.button`
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
`,m=a.Ay.div``,y=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,j=a.Ay.button`
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
`,v=a.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,b=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,w=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,P=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,E=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=a.Ay.div`
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
`,D=e=>{let{startDate:t,endDate:r,onRangeSelect:a,onClose:D,isOpen:C}=e;const{t:S}=(0,i.Bd)("common"),$=new Date,[O,B]=(0,n.useState)($.getMonth()),[R,I]=(0,n.useState)($.getFullYear()),[z,M]=(0,n.useState)(null),[T,N]=(0,n.useState)(null),[_,W]=(0,n.useState)(null),[L,Y]=(0,n.useState)("start"),K=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&M(d(t)),r&&N(d(r))},[t,r]),(0,n.useEffect)(()=>{C&&Y("start")},[C]),(0,n.useEffect)(()=>{const e=e=>{K.current&&!K.current.contains(e.target)&&D()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,D]);const U=(0,n.useCallback)(()=>{0===O?(B(11),I(e=>e-1)):B(e=>e-1)},[O]),H=(0,n.useCallback)(()=>{11===O?(B(0),I(e=>e+1)):B(e=>e+1)},[O]),V=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),i=[];for(let a=0;a<n;a++)i.push(null);for(let a=1;a<=r;a++)i.push(new Date(e,t,a));return(0,s.jsxs)(b,{children:[(0,s.jsx)(w,{children:h(e,t)}),(0,s.jsx)(F,{children:o.map(e=>(0,s.jsx)(P,{children:e},e))}),(0,s.jsx)(k,{children:i.map((e,t)=>{if(!e)return(0,s.jsx)(E,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:i,isHoverEnd:o}=(e=>{const t=z&&c(e,z),r=T&&c(e,T),n="end"===L&&_?_:T;let a=!1;if(z&&n){const[t,r]=z<=n?[z,n]:[n,z];a=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:a,isHoverEnd:"end"===L&&_&&c(e,_)}})(e),d=c(e,$);return(0,s.jsx)(A,{$isStart:!!r,$isEnd:!!n,$isInRange:i,$isHoverEnd:!!o,$isToday:d,onClick:()=>(e=>{if("start"===L)M(e),N(null),Y("end");else{let t=z,r=e;r<t&&([t,r]=[r,t]),M(t),N(r),Y("start"),a(l(t),l(r)),setTimeout(D,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},q=11===O?0:O+1,G=11===O?R+1:R,Z=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}M(r),N(n),Y("start"),a(l(r),l(n)),setTimeout(D,150)};return C?(0,s.jsx)(u,{ref:K,children:(0,s.jsxs)(p,{children:[(0,s.jsxs)(x,{children:[(0,s.jsx)(g,{onClick:()=>Z("this_week"),children:"This Week"}),(0,s.jsx)(g,{onClick:()=>Z("this_month"),children:"This Month"}),(0,s.jsx)(g,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,s.jsxs)(m,{children:[(0,s.jsxs)(y,{children:[(0,s.jsx)(j,{onClick:U,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(j,{onClick:H,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(v,{children:[V(R,O),(0,s.jsx)(f,{children:V(G,q)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,S=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,n,a]=t.split("-").map(Number);return new Date(r,n-1,a)}catch{return new Date}})(t);let n=new Date(r);const a=new Date(r);switch(e){case"today":break;case"yesterday":n.setDate(r.getDate()-1),a.setDate(r.getDate()-1);break;case"week":n.setDate(r.getDate()-6);break;case"month":n.setDate(r.getDate()-29);break;case"year":n.setDate(r.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:C(n),end:C(a)}},$=a.Ay.div`
  margin-bottom: 24px;
`,O=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,B=a.Ay.button`
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
`,R=a.Ay.div`
  position: relative;
  display: inline-block;
`,I=a.Ay.button`
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
`,z=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:a,onPeriodChange:o,onCalendarRangeSelect:l,includeToday:d=!1,children:c}=e;const{t:h}=(0,i.Bd)("common"),[u,p]=(0,n.useState)(!1),x=d?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)($,{children:(0,s.jsxs)(O,{children:[x.map(e=>(0,s.jsx)(B,{active:t===e&&!a,onClick:()=>o(e),children:g[e]},e)),(0,s.jsxs)(R,{children:[(0,s.jsxs)(I,{active:a,onClick:()=>p(!u),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,s.jsx)(D,{isOpen:u,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{l(e,t),p(!1)},onClose:()=>p(!1)})]}),c]})})}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),a=r(4492);function i(e){const[t,r]=(0,a.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[s,o]=(0,n.useState)(i());return[s,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},5646:(e,t,r)=>{r.r(t),r.d(t,{default:()=>we});var n=r(9950),a=r(4752),i=r(8409),s=r(2597),o=r(2653),l=r(1095),d=r(2847),c=r(3245),h=r(158),u=r(3440),p=r(2174),x=r(7119),g=r(3875),m=r(2004),y=r(3485),j=r(4051),v=r(1958);function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},f.apply(null,arguments)}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function w(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var F=32;class P extends n.PureComponent{renderIcon(e,t){var{inactiveColor:r}=this.props,a=16,i=F/6,s=F/3,o=e.inactive?r:e.color,l=null!==t&&void 0!==t?t:e.type;if("none"===l)return null;if("plainline"===l)return n.createElement("line",{strokeWidth:4,fill:"none",stroke:o,strokeDasharray:e.payload.strokeDasharray,x1:0,y1:a,x2:F,y2:a,className:"recharts-legend-icon"});if("line"===l)return n.createElement("path",{strokeWidth:4,fill:"none",stroke:o,d:"M0,".concat(a,"h").concat(s,"\n            A").concat(i,",").concat(i,",0,1,1,").concat(2*s,",").concat(a,"\n            H").concat(F,"M").concat(2*s,",").concat(a,"\n            A").concat(i,",").concat(i,",0,1,1,").concat(s,",").concat(a),className:"recharts-legend-icon"});if("rect"===l)return n.createElement("path",{stroke:"none",fill:o,d:"M0,".concat(4,"h").concat(F,"v").concat(24,"h").concat(-32,"z"),className:"recharts-legend-icon"});if(n.isValidElement(e.legendIcon)){var d=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach(function(t){w(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e);return delete d.legendIcon,n.cloneElement(e.legendIcon,d)}return n.createElement(j.i,{fill:o,cx:a,cy:a,size:F,sizeType:"diameter",type:l})}renderItems(){var{payload:e,iconSize:t,layout:r,formatter:a,inactiveColor:i,iconType:s}=this.props,o={x:0,y:0,width:F,height:F},l={display:"horizontal"===r?"inline-block":"block",marginRight:10},d={display:"inline-block",verticalAlign:"middle",marginRight:4};return e.map((e,r)=>{var c=e.formatter||a,h=(0,m.$)({"recharts-legend-item":!0,["legend-item-".concat(r)]:!0,inactive:e.inactive});if("none"===e.type)return null;var u=e.inactive?i:e.color,p=c?c(e.value,e,r):e.value;return n.createElement("li",f({className:h,style:l,key:"legend-item-".concat(r)},(0,v.XC)(this.props,e,r)),n.createElement(y.u,{width:t,height:t,viewBox:o,style:d,"aria-label":"".concat(p," legend icon")},this.renderIcon(e,s)),n.createElement("span",{className:"recharts-legend-item-text",style:{color:u}},p))})}render(){var{payload:e,layout:t,align:r}=this.props;if(!e||!e.length)return null;var a={padding:0,margin:0,textAlign:"horizontal"===t?r:"left"};return n.createElement("ul",{className:"recharts-default-legend",style:a},this.renderItems())}}w(P,"displayName","Legend"),w(P,"defaultProps",{align:"center",iconSize:14,inactiveColor:"#ccc",layout:"horizontal",verticalAlign:"middle"});var k=r(1570),E=r(4661),A=r(3776),D=r(2852);var C=r(3241),S=r(9297),$=r(6873),O=["contextPayload"];function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},B.apply(null,arguments)}function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function I(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach(function(t){z(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function z(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function M(e){return e.value}function T(e){var{contextPayload:t}=e,r=function(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(-1!==t.indexOf(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],-1===t.indexOf(r)&&{}.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}(e,O),a=(0,E.s)(t,e.payloadUniqBy,M),i=I(I({},r),{},{payload:a});return n.isValidElement(e.content)?n.cloneElement(e.content,i):"function"===typeof e.content?n.createElement(e.content,i):n.createElement(P,i)}function N(e){var t=(0,A.j)();return(0,n.useEffect)(()=>{t((0,$.h1)(e))},[t,e]),null}function _(e){var t=(0,A.j)();return(0,n.useEffect)(()=>(t((0,$.hx)(e)),()=>{t((0,$.hx)({width:0,height:0}))}),[t,e]),null}function W(e){var t=(0,A.G)(D.g0),r=(0,g.M)(),a=(0,S.Kp)(),{width:i,height:s,wrapperStyle:o,portal:l}=e,[d,c]=(0,C.V)([t]),h=(0,S.yi)(),u=(0,S.rY)(),p=h-(a.left||0)-(a.right||0),m=L.getWidthOrHeight(e.layout,s,i,p),y=l?o:I(I({position:"absolute",width:(null===m||void 0===m?void 0:m.width)||i||"auto",height:(null===m||void 0===m?void 0:m.height)||s||"auto"},function(e,t,r,n,a,i){var s,o,{layout:l,align:d,verticalAlign:c}=t;return e&&(void 0!==e.left&&null!==e.left||void 0!==e.right&&null!==e.right)||(s="center"===d&&"vertical"===l?{left:((n||0)-i.width)/2}:"right"===d?{right:r&&r.right||0}:{left:r&&r.left||0}),e&&(void 0!==e.top&&null!==e.top||void 0!==e.bottom&&null!==e.bottom)||(o="middle"===c?{top:((a||0)-i.height)/2}:"bottom"===c?{bottom:r&&r.bottom||0}:{top:r&&r.top||0}),I(I({},s),o)}(o,e,a,h,u,d)),o),j=null!==l&&void 0!==l?l:r;if(null==j)return null;var v=n.createElement("div",{className:"recharts-legend-wrapper",style:y,ref:c},n.createElement(N,{layout:e.layout,align:e.align,verticalAlign:e.verticalAlign,itemSorter:e.itemSorter}),n.createElement(_,{width:d.width,height:d.height}),n.createElement(T,B({},e,m,{margin:a,chartWidth:h,chartHeight:u,contextPayload:t})));return(0,x.createPortal)(v,j)}class L extends n.PureComponent{static getWidthOrHeight(e,t,r,n){return"vertical"===e&&(0,k.Et)(t)?{height:t}:"horizontal"===e?{width:r||n}:null}render(){return n.createElement(W,this.props)}}z(L,"displayName","Legend"),z(L,"defaultProps",{align:"center",iconSize:14,itemSorter:"value",layout:"horizontal",verticalAlign:"bottom"});var Y=r(4915),K=r(7621),U=r(5297),H=r(7766),V=r(294),q=r(3588),G=r(6038),Z=r(9018),Q=r(512),X=r(5030),J=r(4414);const ee=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,te=a.Ay.div`
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
`,re=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  @media (max-width: 768px) { font-size: 20px; }
`,ne=a.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,ae=a.Ay.div`
  padding: 24px 32px;
  @media (max-width: 768px) { padding: 16px; }
`,ie=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,se=a.Ay.button`
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
`,oe=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`,le=a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,de=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`,ce=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  overflow-x: auto;
`,he=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,ue=a.Ay.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  border-bottom: 2px solid #E6EBF1;
  white-space: nowrap;
`,pe=a.Ay.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #0A2540;
  border-bottom: 1px solid #F3F4F6;
`,xe=a.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"paid":return"#DCFCE7";case"pending_payment":return"#FEF3C7";case"payment_submitted":return"#DBEAFE";case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"pending_payment":return"#D97706";case"payment_submitted":return"#2563EB";case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,ge=a.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,me=a.Ay.div`
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
  font-size: 14px;
`,ye=["#635BFF","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7"],je={subscription:"Subscription",service:"Service",consulting:"Consulting",rent:"Rent",others:"Others"},ve={stripe:"Stripe",paypal:"PayPal",bank_transfer:"Bank Transfer",qr_payment:"QR Payment"},fe={restaurant:"Restaurant",brand_manager:"Brand Manager",foodcourt_manager:"Foodcourt Manager",restaurant_owner:"Restaurant Owner"},be={draft:"Draft",pending_payment:"Pending Payment",payment_submitted:"Payment Submitted",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"},we=()=>{const{t:e}=(0,X.Bd)("admin"),{operationSettings:t,siteTimezone:r}=(0,Z.Pj)(),a=(null===t||void 0===t?void 0:t.currency)||"MYR",[x,g]=(0,o.M)("revenue"),[m,y]=(0,n.useState)("month"),[j,v]=(0,n.useState)(()=>(0,Q.x)("month")),[f,b]=(0,n.useState)(!1),[w,F]=(0,n.useState)(""),[P,k]=(0,n.useState)(!1),[E,A]=(0,n.useState)(!1),[D,C]=(0,n.useState)([]);(0,n.useEffect)(()=>{(async()=>{const e=localStorage.getItem("auth_token"),t=e?{Authorization:`Bearer ${e}`}:{};let r=[];try{const e=await fetch("/api/currencies/supported",{headers:t});if(e.ok){const t=await e.json();r=(t.data||t||[]).map(e=>"string"===typeof e?e:e.code)}}catch{}0===r.length&&(r=[a]),C(r);try{var n;const e=await fetch("/api/admin-reports/default-currency",{headers:t}),a=await e.json();a.success&&null!==(n=a.data)&&void 0!==n&&n.currency&&r.includes(a.data.currency)?F(a.data.currency):F(r[0])}catch{F(r[0])}A(!0)})()},[a]);const[S,$]=(0,n.useState)(null),[O,B]=(0,n.useState)([]),[R,I]=(0,n.useState)([]),[z,M]=(0,n.useState)(null),[T,N]=(0,n.useState)([]),[_,W]=(0,n.useState)(null),[we,Fe]=(0,n.useState)(null),Pe=(0,n.useCallback)(()=>"all"!==m||f?`start_date=${j.start}&end_date=${j.end}`:"period=all",[m,f,j]),ke=(0,n.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const r=localStorage.getItem("auth_token"),n=t?"?"+t:"",a=w?n?`&currency=${w}`:`?currency=${w}`:"",i=await fetch(`/api/admin-reports/${e}${n}${a}`,{headers:r?{Authorization:`Bearer ${r}`}:{}}),s=await i.json();if(!s.success)throw new Error(s.error||"API Error");return s.data},[w]),Ee=(0,n.useCallback)(async()=>{k(!0);try{const e=Pe(),[t,r,n]=await Promise.all([ke("revenue-summary",e),ke("revenue-trend"),ke("revenue-by-category",e)]);$(t),B(r),I(n)}catch(e){console.error("Error fetching revenue data:",e)}k(!1)},[ke,Pe]),Ae=(0,n.useCallback)(async()=>{k(!0);try{const e=Pe(),[t,r]=await Promise.all([ke("payment-analysis",e),ke("overdue-invoices")]);M(t),N(r)}catch(e){console.error("Error fetching payment data:",e)}k(!1)},[ke,Pe]),De=(0,n.useCallback)(async()=>{k(!0);try{const e=Pe(),t=await ke("customer-analysis",e);W(t)}catch(e){console.error("Error fetching customer data:",e)}k(!1)},[ke,Pe]),Ce=(0,n.useCallback)(async()=>{k(!0);try{const e=await ke("subscription-stats");Fe(e)}catch(e){console.error("Error fetching subscription data:",e)}k(!1)},[ke]);(0,n.useEffect)(()=>{if(E&&w)switch(x){case"revenue":Ee();break;case"payment":Ae();break;case"customer":De();break;case"subscription":Ce()}},[x,m,w,j,E]);return(0,J.jsx)(J.Fragment,{children:(0,J.jsxs)(ee,{children:[(0,J.jsxs)(te,{children:[(0,J.jsx)(re,{children:e("admin:reportsPage.reports")}),(0,J.jsx)(ne,{children:(0,J.jsx)(se,{onClick:()=>{let e="",t="";if("revenue"===x&&S?(e="Metric,Value\n",e+=`Total Revenue,${S.totalRevenue}\n`,e+=`Pending Amount,${S.pendingAmount}\n`,e+=`Paid Invoices,${S.paidInvoices}/${S.totalInvoices}\n`,e+=`Collection Rate,${S.collectionRate}%\n\n`,e+="Category,Count,Total\n",R.forEach(t=>{e+=`${t.category},${t.count},${t.total}\n`}),t="revenue-report.csv"):"payment"===x&&z?(e="Status,Count,Amount\n",z.statusBreakdown.forEach(t=>{e+=`${t.status},${t.count},${t.total}\n`}),e+="\nPayment Method,Count,Amount\n",z.paymentMethods.forEach(t=>{e+=`${t.method},${t.count},${t.total}\n`}),t="payment-report.csv"):"customer"===x&&_?(e="Restaurant,Revenue,Invoices,Overdue\n",_.topRestaurants.forEach(t=>{e+=`${t.restaurantName},${t.totalRevenue},${t.invoiceCount},${t.overdueCount}\n`}),t="customer-report.csv"):"subscription"===x&&we&&(e="Plan,Subscribers,Monthly Revenue\n",we.planDistribution.forEach(t=>{e+=`${t.planName},${t.subscriberCount},${t.monthlyRevenue}\n`}),t="subscription-report.csv"),e){const r=new Blob([e],{type:"text/csv"}),n=URL.createObjectURL(r),a=document.createElement("a");a.href=n,a.download=t,a.click(),URL.revokeObjectURL(n)}},children:e("admin:reportsPage.exportCsv")})})]}),(0,J.jsxs)(ae,{children:[(0,J.jsxs)(s.tU,{children:[(0,J.jsx)(s.oz,{active:"revenue"===x,onClick:()=>g("revenue"),children:e("admin:reportsPage.revenue")}),(0,J.jsx)(s.oz,{active:"payment"===x,onClick:()=>g("payment"),children:e("admin:reportsPage.payment")}),(0,J.jsx)(s.oz,{active:"customer"===x,onClick:()=>g("customer"),children:e("admin:reportsPage.customer")}),(0,J.jsx)(s.oz,{active:"subscription"===x,onClick:()=>g("subscription"),children:e("admin:reportsPage.subscription")})]}),(0,J.jsx)(Q.A,{activePeriod:m,dateRange:j,isCustomDateRange:f,onPeriodChange:e=>{y(e),b(!1),v((0,Q.x)(e))},onCalendarRangeSelect:(e,t)=>{b(!0),y("all"),v({start:e,end:t})},children:(0,J.jsx)(ie,{value:w,onChange:e=>F(e.target.value),children:D.map(e=>(0,J.jsx)("option",{value:e,children:e},e))})}),"revenue"===x&&(()=>{if(P)return(0,J.jsx)(ge,{children:e("admin:reportsPage.loadingRevenueData")});if(!S)return(0,J.jsx)(me,{children:e("admin:reportsPage.noDataAvailable")});const t=R.reduce((e,t)=>e+t.total,0);return(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(i.MD,{children:[(0,J.jsxs)(i.hI,{color:"#059669",children:[(0,J.jsx)(i.Os,{children:(0,G.vv)(S.totalRevenue,w)}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.totalRevenue")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.collectedPayments")})]}),(0,J.jsxs)(i.hI,{color:"#D97706",children:[(0,J.jsx)(i.Os,{children:(0,G.vv)(S.pendingAmount,w)}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.pendingAmount")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.awaitingPayment")})]}),(0,J.jsxs)(i.hI,{color:"#635BFF",children:[(0,J.jsxs)(i.Os,{children:[S.paidInvoices," / ",S.totalInvoices]}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.paidInvoices")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.completedTotal")})]}),(0,J.jsxs)(i.hI,{color:"#2563EB",children:[(0,J.jsxs)(i.Os,{children:[S.collectionRate,"%"]}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.collectionRate")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.paymentSuccessRate")})]})]}),(0,J.jsxs)(de,{children:[(0,J.jsxs)(oe,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.revenueTrendLast12Months")}),O.length>0?(0,J.jsx)(l.u,{width:"100%",height:300,children:(0,J.jsxs)(d.b,{data:O,children:[(0,J.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#E6EBF1"}),(0,J.jsx)(h.W,{dataKey:"month",tick:{fontSize:12}}),(0,J.jsx)(u.h,{tick:{fontSize:12}}),(0,J.jsx)(p.m,{formatter:e=>(0,G.vv)(e,w)}),(0,J.jsx)(L,{}),(0,J.jsx)(Y.N,{type:"monotone",dataKey:"billed",stroke:"#635BFF",strokeWidth:2,name:"Billed",dot:{r:3}}),(0,J.jsx)(Y.N,{type:"monotone",dataKey:"collected",stroke:"#059669",strokeWidth:2,name:"Collected",dot:{r:3}})]})}):(0,J.jsx)(me,{children:e("admin:reportsPage.noTrendData")})]}),(0,J.jsxs)(oe,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.revenueByCategory")}),R.length>0?(0,J.jsx)(l.u,{width:"100%",height:300,children:(0,J.jsxs)(K.r,{children:[(0,J.jsx)(U.F,{data:R.map(e=>({...e,name:je[e.category]||e.category})),dataKey:"total",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},children:R.map((e,t)=>(0,J.jsx)(H.f,{fill:ye[t%ye.length]},t))}),(0,J.jsx)(p.m,{formatter:e=>(0,G.vv)(e,w)})]})}):(0,J.jsx)(me,{children:e("admin:reportsPage.noCategoryData")})]})]}),(0,J.jsxs)(ce,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.revenueByCategoryDetail")}),(0,J.jsxs)(he,{children:[(0,J.jsx)("thead",{children:(0,J.jsxs)("tr",{children:[(0,J.jsx)(ue,{children:e("admin:reportsPage.category")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.invoices")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.amount")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.share")})]})}),(0,J.jsx)("tbody",{children:R.map((e,r)=>(0,J.jsxs)("tr",{children:[(0,J.jsx)(pe,{children:je[e.category]||e.category}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:e.count}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:(0,G.vv)(e.total,w)}),(0,J.jsxs)(pe,{style:{textAlign:"right"},children:[t>0?(e.total/t*100).toFixed(1):0,"%"]})]},r))})]})]})]})})(),"payment"===x&&(P?(0,J.jsx)(ge,{children:e("admin:reportsPage.loadingPaymentData")}):z?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(i.MD,{children:[(0,J.jsxs)(i.hI,{color:"#DC2626",children:[(0,J.jsx)(i.Os,{children:z.overdueCount}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.overdueInvoices")}),(0,J.jsx)(i.d1,{children:(0,G.vv)(z.overdueAmount,w)})]}),(0,J.jsxs)(i.hI,{color:"#635BFF",children:[(0,J.jsxs)(i.Os,{children:[z.avgPaymentDays," days"]}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.avgPaymentTime")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.issueToPayment")})]}),(0,J.jsxs)(i.hI,{color:"#2563EB",children:[(0,J.jsx)(i.Os,{children:z.awaitingCount}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.awaitingConfirmation")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.paymentSubmitted")})]}),(0,J.jsxs)(i.hI,{color:"#059669",children:[(0,J.jsx)(i.Os,{children:(0,G.vv)(z.thisMonthCollected,w)}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.thisMonthCollected")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.currentMonth")})]})]}),(0,J.jsxs)(de,{children:[(0,J.jsxs)(ce,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.paymentStatusBreakdown")}),(0,J.jsxs)(he,{children:[(0,J.jsx)("thead",{children:(0,J.jsxs)("tr",{children:[(0,J.jsx)(ue,{children:e("admin:reportsPage.status")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.count")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.amount")})]})}),(0,J.jsx)("tbody",{children:z.statusBreakdown.map((e,t)=>(0,J.jsxs)("tr",{children:[(0,J.jsx)(pe,{children:(0,J.jsx)(xe,{status:e.status,children:be[e.status]||e.status})}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:e.count}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:(0,G.vv)(e.total,w)})]},t))})]})]}),(0,J.jsxs)(oe,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.paymentMethods")}),z.paymentMethods.length>0?(0,J.jsx)(l.u,{width:"100%",height:300,children:(0,J.jsxs)(K.r,{children:[(0,J.jsx)(U.F,{data:z.paymentMethods.map(e=>({...e,name:ve[e.method]||e.method})),dataKey:"count",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},children:z.paymentMethods.map((e,t)=>(0,J.jsx)(H.f,{fill:ye[t%ye.length]},t))}),(0,J.jsx)(p.m,{})]})}):(0,J.jsx)(me,{children:e("admin:reportsPage.noPaymentMethodData")})]})]}),T.length>0&&(0,J.jsxs)(ce,{children:[(0,J.jsxs)(le,{children:["Overdue Invoices (",T.length,")"]}),(0,J.jsxs)(he,{children:[(0,J.jsx)("thead",{children:(0,J.jsxs)("tr",{children:[(0,J.jsx)(ue,{children:"Invoice #"}),(0,J.jsx)(ue,{children:e("admin:reportsPage.restaurant")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.amount")}),(0,J.jsx)(ue,{children:e("admin:reportsPage.dueDate")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.daysOverdue")})]})}),(0,J.jsx)("tbody",{children:T.map(e=>(0,J.jsxs)("tr",{children:[(0,J.jsx)(pe,{style:{fontWeight:500},children:e.invoiceNumber}),(0,J.jsx)(pe,{children:e.restaurantName}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:(0,G.vv)(e.amount,e.currency)}),(0,J.jsx)(pe,{children:new Date(e.dueDate).toLocaleDateString("en-GB",{timeZone:r||"Asia/Kuala_Lumpur"})}),(0,J.jsx)(pe,{style:{textAlign:"right",color:e.daysOverdue>30?"#DC2626":"#D97706",fontWeight:600},children:e.daysOverdue})]},e.id))})]})]})]}):(0,J.jsx)(me,{children:e("admin:reportsPage.noDataAvailable")})),"customer"===x&&(P?(0,J.jsx)(ge,{children:e("admin:reportsPage.loadingCustomerData")}):_?(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(i.MD,{children:[(0,J.jsxs)(i.hI,{color:"#6366F1",children:[(0,J.jsx)(i.Os,{children:_.totalRestaurants}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.totalRestaurants")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.allRegistered")})]}),(0,J.jsxs)(i.hI,{color:"#059669",children:[(0,J.jsx)(i.Os,{children:_.activeRestaurants}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.activeRestaurants")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.withInvoices3Months")})]}),(0,J.jsxs)(i.hI,{color:"#2563EB",children:[(0,J.jsx)(i.Os,{children:_.newThisMonth}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.newThisMonth")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.recentlyRegistered")})]}),(0,J.jsxs)(i.hI,{color:"#F59E0B",children:[(0,J.jsx)(i.Os,{children:(0,G.vv)(_.arpu,w)}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.arpu")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.avgRevenuePerRestaurant")})]})]}),(0,J.jsxs)(de,{children:[(0,J.jsxs)(oe,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.monthlyRegistrationTrend")}),_.registrationTrend.length>0?(0,J.jsx)(l.u,{width:"100%",height:300,children:(0,J.jsxs)(V.E,{data:_.registrationTrend,children:[(0,J.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#E6EBF1"}),(0,J.jsx)(h.W,{dataKey:"month",tick:{fontSize:12}}),(0,J.jsx)(u.h,{tick:{fontSize:12},allowDecimals:!1}),(0,J.jsx)(p.m,{}),(0,J.jsx)(q.y,{dataKey:"count",fill:"#635BFF",radius:[4,4,0,0],name:"New Restaurants"})]})}):(0,J.jsx)(me,{children:e("admin:reportsPage.noRegistrationData")})]}),(0,J.jsxs)(oe,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.payerTypeDistribution")}),_.payerDistribution.length>0?(0,J.jsx)(l.u,{width:"100%",height:300,children:(0,J.jsxs)(K.r,{children:[(0,J.jsx)(U.F,{data:_.payerDistribution.map(e=>({...e,name:fe[e.payerType]||e.payerType})),dataKey:"total",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},children:_.payerDistribution.map((e,t)=>(0,J.jsx)(H.f,{fill:ye[t%ye.length]},t))}),(0,J.jsx)(p.m,{formatter:e=>(0,G.vv)(e,w)})]})}):(0,J.jsx)(me,{children:e("admin:reportsPage.noPayerData")})]})]}),(0,J.jsxs)(ce,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.top10RestaurantsByRevenue")}),(0,J.jsxs)(he,{children:[(0,J.jsx)("thead",{children:(0,J.jsxs)("tr",{children:[(0,J.jsx)(ue,{children:"#"}),(0,J.jsx)(ue,{children:e("admin:reportsPage.restaurant")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.totalRevenue")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.invoices")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.overdue")})]})}),(0,J.jsx)("tbody",{children:_.topRestaurants.map((e,t)=>(0,J.jsxs)("tr",{children:[(0,J.jsx)(pe,{style:{fontWeight:600,color:t<3?"#635BFF":"#6B7280"},children:t+1}),(0,J.jsx)(pe,{style:{fontWeight:500},children:e.restaurantName}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:(0,G.vv)(e.totalRevenue,w)}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:e.invoiceCount}),(0,J.jsx)(pe,{style:{textAlign:"right",color:e.overdueCount>0?"#DC2626":"#059669"},children:e.overdueCount})]},t))})]})]})]}):(0,J.jsx)(me,{children:e("admin:reportsPage.noDataAvailable")})),"subscription"===x&&(()=>{if(P)return(0,J.jsx)(ge,{children:e("admin:reportsPage.loadingSubscriptionData")});if(!we)return(0,J.jsx)(me,{children:e("admin:reportsPage.noDataAvailable")});const t=we.planDistribution.reduce((e,t)=>e+t.monthlyRevenue,0);return(0,J.jsxs)(J.Fragment,{children:[(0,J.jsxs)(i.MD,{children:[(0,J.jsxs)(i.hI,{color:"#7C3AED",children:[(0,J.jsx)(i.Os,{children:we.activePlans}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.activePlans")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.currentlyAvailable")})]}),(0,J.jsxs)(i.hI,{color:"#059669",children:[(0,J.jsx)(i.Os,{children:(0,G.vv)(we.mrr,w)}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.mrr")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.monthlyRecurringRevenue")})]}),(0,J.jsxs)(i.hI,{color:"#F59E0B",children:[(0,J.jsx)(i.Os,{children:(0,G.vv)(we.arpu,w)}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.arpu")}),(0,J.jsx)(i.d1,{children:e("admin:reportsPage.avgPerSubscriber")})]}),(0,J.jsxs)(i.hI,{color:"#635BFF",children:[(0,J.jsx)(i.Os,{style:{fontSize:"16px"},children:we.mostPopularPlan}),(0,J.jsx)(i.v0,{children:e("admin:reportsPage.mostPopular")}),(0,J.jsxs)(i.d1,{children:[we.activeSubscribers," subscribers"]})]})]}),(0,J.jsxs)(de,{children:[(0,J.jsxs)(ce,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.planRevenueBreakdown")}),(0,J.jsxs)(he,{children:[(0,J.jsx)("thead",{children:(0,J.jsxs)("tr",{children:[(0,J.jsx)(ue,{children:e("admin:reportsPage.plan")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.subscribers")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.monthlyRevenue")}),(0,J.jsx)(ue,{style:{textAlign:"right"},children:e("admin:reportsPage.share")})]})}),(0,J.jsxs)("tbody",{children:[we.planDistribution.map((e,r)=>(0,J.jsxs)("tr",{children:[(0,J.jsx)(pe,{style:{fontWeight:500},children:e.planName}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:e.subscriberCount}),(0,J.jsx)(pe,{style:{textAlign:"right"},children:(0,G.vv)(e.monthlyRevenue,w)}),(0,J.jsxs)(pe,{style:{textAlign:"right"},children:[t>0?(e.monthlyRevenue/t*100).toFixed(1):0,"%"]})]},r)),0===we.planDistribution.length&&(0,J.jsx)("tr",{children:(0,J.jsx)(pe,{colSpan:4,style:{textAlign:"center",color:"#9CA3AF"},children:e("admin:reportsPage.noSubscriptionDataYet")})})]})]})]}),(0,J.jsxs)(oe,{children:[(0,J.jsx)(le,{children:e("admin:reportsPage.planDistribution")}),we.planDistribution.length>0?(0,J.jsx)(l.u,{width:"100%",height:300,children:(0,J.jsxs)(K.r,{children:[(0,J.jsx)(U.F,{data:we.planDistribution,dataKey:"subscriberCount",nameKey:"planName",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{planName:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},children:we.planDistribution.map((e,t)=>(0,J.jsx)(H.f,{fill:ye[t%ye.length]},t))}),(0,J.jsx)(p.m,{})]})}):(0,J.jsx)(me,{children:e("admin:reportsPage.noPlanData")})]})]})]})})()]})]})})}}}]);