"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5646],{2597:(e,t,n)=>{n.d(t,{Ex:()=>d,oz:()=>c,tU:()=>o});n(9950);var r=n(4752),i=n(4414);const a=r.Ay.div`
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
`,l=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,o=e=>{let{children:t,className:n,style:r}=e;return(0,i.jsx)(a,{className:n,style:r,children:t})},c=e=>{let{active:t,onClick:n,children:r,className:a}=e;return(0,i.jsx)(s,{active:t,onClick:n,className:a,children:r})},d=e=>{let{count:t,variant:n="default",showZero:r=!1}=e;return 0!==t||r?(0,i.jsx)(l,{variant:n,children:t}):null}},2653:(e,t,n)=>{n.d(t,{M:()=>a});var r=n(9950),i=n(4492);function a(e){const[t,n]=(0,i.ok)(),a=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[s,l]=(0,r.useState)(a());return[s,(0,r.useCallback)(e=>{l(e),n({tab:e})},[n])]}},5646:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Ae});var r=n(9950),i=n(4752),a=n(8409),s=n(2597),l=n(2653),o=n(1095),c=n(2847),d=n(3245),h=n(158),u=n(3440),x=n(2174),p=n(7119),g=n(6256),m=n(2004),y=n(3485),j=n(6432),v=n(1958);function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(null,arguments)}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function w(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var A=32;class k extends r.PureComponent{renderIcon(e,t){var{inactiveColor:n}=this.props,i=16,a=A/6,s=A/3,l=e.inactive?n:e.color,o=null!==t&&void 0!==t?t:e.type;if("none"===o)return null;if("plainline"===o)return r.createElement("line",{strokeWidth:4,fill:"none",stroke:l,strokeDasharray:e.payload.strokeDasharray,x1:0,y1:i,x2:A,y2:i,className:"recharts-legend-icon"});if("line"===o)return r.createElement("path",{strokeWidth:4,fill:"none",stroke:l,d:"M0,".concat(i,"h").concat(s,"\n            A").concat(a,",").concat(a,",0,1,1,").concat(2*s,",").concat(i,"\n            H").concat(A,"M").concat(2*s,",").concat(i,"\n            A").concat(a,",").concat(a,",0,1,1,").concat(s,",").concat(i),className:"recharts-legend-icon"});if("rect"===o)return r.createElement("path",{stroke:"none",fill:l,d:"M0,".concat(4,"h").concat(A,"v").concat(24,"h").concat(-32,"z"),className:"recharts-legend-icon"});if(r.isValidElement(e.legendIcon)){var c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach(function(t){w(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e);return delete c.legendIcon,r.cloneElement(e.legendIcon,c)}return r.createElement(j.i,{fill:l,cx:i,cy:i,size:A,sizeType:"diameter",type:o})}renderItems(){var{payload:e,iconSize:t,layout:n,formatter:i,inactiveColor:a,iconType:s}=this.props,l={x:0,y:0,width:A,height:A},o={display:"horizontal"===n?"inline-block":"block",marginRight:10},c={display:"inline-block",verticalAlign:"middle",marginRight:4};return e.map((e,n)=>{var d=e.formatter||i,h=(0,m.$)({"recharts-legend-item":!0,["legend-item-".concat(n)]:!0,inactive:e.inactive});if("none"===e.type)return null;var u=e.inactive?a:e.color,x=d?d(e.value,e,n):e.value;return r.createElement("li",b({className:h,style:o,key:"legend-item-".concat(n)},(0,v.XC)(this.props,e,n)),r.createElement(y.u,{width:t,height:t,viewBox:l,style:c,"aria-label":"".concat(x," legend icon")},this.renderIcon(e,s)),r.createElement("span",{className:"recharts-legend-item-text",style:{color:u}},x))})}render(){var{payload:e,layout:t,align:n}=this.props;if(!e||!e.length)return null;var i={padding:0,margin:0,textAlign:"horizontal"===t?n:"left"};return r.createElement("ul",{className:"recharts-default-legend",style:i},this.renderItems())}}w(k,"displayName","Legend"),w(k,"defaultProps",{align:"center",iconSize:14,inactiveColor:"#ccc",layout:"horizontal",verticalAlign:"middle"});var F=n(1570),E=n(4661),C=n(3776),O=n(2852);var P=n(3241),D=n(9297),S=n(6873),B=["contextPayload"];function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},R.apply(null,arguments)}function $(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$(Object(n),!0).forEach(function(t){z(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function z(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e){return e.value}function M(e){var{contextPayload:t}=e,n=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(-1!==t.indexOf(r))continue;n[r]=e[r]}return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],-1===t.indexOf(n)&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(e,B),i=(0,E.s)(t,e.payloadUniqBy,N),a=I(I({},n),{},{payload:i});return r.isValidElement(e.content)?r.cloneElement(e.content,a):"function"===typeof e.content?r.createElement(e.content,a):r.createElement(k,a)}function T(e){var t=(0,C.j)();return(0,r.useEffect)(()=>{t((0,S.h1)(e))},[t,e]),null}function _(e){var t=(0,C.j)();return(0,r.useEffect)(()=>(t((0,S.hx)(e)),()=>{t((0,S.hx)({width:0,height:0}))}),[t,e]),null}function K(e){var t=(0,C.G)(O.g0),n=(0,g.M)(),i=(0,D.Kp)(),{width:a,height:s,wrapperStyle:l,portal:o}=e,[c,d]=(0,P.V)([t]),h=(0,D.yi)(),u=(0,D.rY)(),x=h-(i.left||0)-(i.right||0),m=L.getWidthOrHeight(e.layout,s,a,x),y=o?l:I(I({position:"absolute",width:(null===m||void 0===m?void 0:m.width)||a||"auto",height:(null===m||void 0===m?void 0:m.height)||s||"auto"},function(e,t,n,r,i,a){var s,l,{layout:o,align:c,verticalAlign:d}=t;return e&&(void 0!==e.left&&null!==e.left||void 0!==e.right&&null!==e.right)||(s="center"===c&&"vertical"===o?{left:((r||0)-a.width)/2}:"right"===c?{right:n&&n.right||0}:{left:n&&n.left||0}),e&&(void 0!==e.top&&null!==e.top||void 0!==e.bottom&&null!==e.bottom)||(l="middle"===d?{top:((i||0)-a.height)/2}:"bottom"===d?{bottom:n&&n.bottom||0}:{top:n&&n.top||0}),I(I({},s),l)}(l,e,i,h,u,c)),l),j=null!==o&&void 0!==o?o:n;if(null==j)return null;var v=r.createElement("div",{className:"recharts-legend-wrapper",style:y,ref:d},r.createElement(T,{layout:e.layout,align:e.align,verticalAlign:e.verticalAlign,itemSorter:e.itemSorter}),r.createElement(_,{width:c.width,height:c.height}),r.createElement(M,R({},e,m,{margin:i,chartWidth:h,chartHeight:u,contextPayload:t})));return(0,p.createPortal)(v,j)}class L extends r.PureComponent{static getWidthOrHeight(e,t,n,r){return"vertical"===e&&(0,F.Et)(t)?{height:t}:"horizontal"===e?{width:n||r}:null}render(){return r.createElement(K,this.props)}}z(L,"displayName","Legend"),z(L,"defaultProps",{align:"center",iconSize:14,itemSorter:"value",layout:"horizontal",verticalAlign:"bottom"});var W=n(4915),U=n(7621),V=n(5297),H=n(2528),Y=n(294),Z=n(3588),q=n(6038),G=n(9018),Q=n(4414);const X=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,J=i.Ay.div`
  position: sticky;
  top: 0;
  z-index: 100;
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
`,ee=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  @media (max-width: 768px) { font-size: 20px; }
`,te=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,ne=i.Ay.div`
  padding: 24px 32px;
  @media (max-width: 768px) { padding: 16px; }
`,re=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
`,ie=i.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: ${e=>e.active?"#5A51E6":"#F8FAFC"}; }
`,ae=i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  &:focus { outline: none; border-color: #635BFF; }
`,se=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,le=i.Ay.button`
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
`,oe=i.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`,ce=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,de=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`,he=i.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  overflow-x: auto;
`,ue=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,xe=i.Ay.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  border-bottom: 2px solid #E6EBF1;
  white-space: nowrap;
`,pe=i.Ay.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #0A2540;
  border-bottom: 1px solid #F3F4F6;
`,ge=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"paid":return"#DCFCE7";case"pending_payment":return"#FEF3C7";case"payment_submitted":return"#DBEAFE";case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"pending_payment":return"#D97706";case"payment_submitted":return"#2563EB";case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,me=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,ye=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
  font-size: 14px;
`,je=["#635BFF","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7"],ve={subscription:"Subscription",service:"Service",consulting:"Consulting",rent:"Rent",others:"Others"},be={stripe:"Stripe",paypal:"PayPal",bank_transfer:"Bank Transfer",qr_payment:"QR Payment"},fe={restaurant:"Restaurant",brand_manager:"Brand Manager",foodcourt_manager:"Foodcourt Manager",restaurant_owner:"Restaurant Owner"},we={draft:"Draft",pending_payment:"Pending Payment",payment_submitted:"Payment Submitted",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"},Ae=()=>{const{operationSettings:e,siteTimezone:t}=(0,G.Pj)(),n=(null===e||void 0===e?void 0:e.currency)||"MYR",[i,p]=(0,l.M)("revenue"),[g,m]=(0,r.useState)("month"),[y,j]=(0,r.useState)(""),[v,b]=(0,r.useState)(""),[f,w]=(0,r.useState)(""),[A,k]=(0,r.useState)(!1),[F,E]=(0,r.useState)(!1),[C,O]=(0,r.useState)([]);(0,r.useEffect)(()=>{(async()=>{const e=localStorage.getItem("auth_token"),t=e?{Authorization:`Bearer ${e}`}:{};let r=[];try{const e=await fetch("/api/currencies/supported",{headers:t});if(e.ok){const t=await e.json();r=(t.data||t||[]).map(e=>"string"===typeof e?e:e.code)}}catch{}0===r.length&&(r=[n]),O(r);try{var i;const e=await fetch("/api/admin-reports/default-currency",{headers:t}),n=await e.json();n.success&&null!==(i=n.data)&&void 0!==i&&i.currency&&r.includes(n.data.currency)?j(n.data.currency):j(r[0])}catch{j(r[0])}E(!0)})()},[n]);const[P,D]=(0,r.useState)(null),[S,B]=(0,r.useState)([]),[R,$]=(0,r.useState)([]),[I,z]=(0,r.useState)(null),[N,M]=(0,r.useState)([]),[T,_]=(0,r.useState)(null),[K,Ae]=(0,r.useState)(null),ke=(0,r.useCallback)(()=>{const e=t||"Asia/Kuala_Lumpur",n=(new Date).toLocaleDateString("en-CA",{timeZone:e}),[r,i]=n.split("-"),a=parseInt(r),s=parseInt(i)-1;let l,o;switch(g){case"all":return"period=all";case"3months":l=new Date(a,s-2,1),o=new Date(a,s+1,0);break;case"6months":l=new Date(a,s-5,1),o=new Date(a,s+1,0);break;case"year":l=new Date(a,0,1),o=new Date(a,11,31);break;case"custom":if(v&&f)return`start_date=${v}&end_date=${f}`;l=new Date(a,s,1),o=new Date(a,s+1,0);break;default:l=new Date(a,s,1),o=new Date(a,s+1,0)}return`start_date=${l.toISOString().split("T")[0]}&end_date=${o.toISOString().split("T")[0]}`},[g,v,f,t]),Fe=(0,r.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const n=localStorage.getItem("auth_token"),r=t?"?"+t:"",i=y?r?`&currency=${y}`:`?currency=${y}`:"",a=await fetch(`/api/admin-reports/${e}${r}${i}`,{headers:n?{Authorization:`Bearer ${n}`}:{}}),s=await a.json();if(!s.success)throw new Error(s.error||"API Error");return s.data},[y]),Ee=(0,r.useCallback)(async()=>{k(!0);try{const e=ke(),[t,n,r]=await Promise.all([Fe("revenue-summary",e),Fe("revenue-trend"),Fe("revenue-by-category",e)]);D(t),B(n),$(r)}catch(e){console.error("Error fetching revenue data:",e)}k(!1)},[Fe,ke]),Ce=(0,r.useCallback)(async()=>{k(!0);try{const e=ke(),[t,n]=await Promise.all([Fe("payment-analysis",e),Fe("overdue-invoices")]);z(t),M(n)}catch(e){console.error("Error fetching payment data:",e)}k(!1)},[Fe,ke]),Oe=(0,r.useCallback)(async()=>{k(!0);try{const e=ke(),t=await Fe("customer-analysis",e);_(t)}catch(e){console.error("Error fetching customer data:",e)}k(!1)},[Fe,ke]),Pe=(0,r.useCallback)(async()=>{k(!0);try{const e=await Fe("subscription-stats");Ae(e)}catch(e){console.error("Error fetching subscription data:",e)}k(!1)},[Fe]);(0,r.useEffect)(()=>{if(F&&y)switch(i){case"revenue":Ee();break;case"payment":Ce();break;case"customer":Oe();break;case"subscription":Pe()}},[i,g,y,v,f,F]);return(0,Q.jsx)(Q.Fragment,{children:(0,Q.jsxs)(X,{children:[(0,Q.jsxs)(J,{children:[(0,Q.jsx)(ee,{children:"Reports"}),(0,Q.jsx)(te,{children:(0,Q.jsx)(le,{onClick:()=>{let e="",t="";if("revenue"===i&&P?(e="Metric,Value\n",e+=`Total Revenue,${P.totalRevenue}\n`,e+=`Pending Amount,${P.pendingAmount}\n`,e+=`Paid Invoices,${P.paidInvoices}/${P.totalInvoices}\n`,e+=`Collection Rate,${P.collectionRate}%\n\n`,e+="Category,Count,Total\n",R.forEach(t=>{e+=`${t.category},${t.count},${t.total}\n`}),t="revenue-report.csv"):"payment"===i&&I?(e="Status,Count,Amount\n",I.statusBreakdown.forEach(t=>{e+=`${t.status},${t.count},${t.total}\n`}),e+="\nPayment Method,Count,Amount\n",I.paymentMethods.forEach(t=>{e+=`${t.method},${t.count},${t.total}\n`}),t="payment-report.csv"):"customer"===i&&T?(e="Restaurant,Revenue,Invoices,Overdue\n",T.topRestaurants.forEach(t=>{e+=`${t.restaurantName},${t.totalRevenue},${t.invoiceCount},${t.overdueCount}\n`}),t="customer-report.csv"):"subscription"===i&&K&&(e="Plan,Subscribers,Monthly Revenue\n",K.planDistribution.forEach(t=>{e+=`${t.planName},${t.subscriberCount},${t.monthlyRevenue}\n`}),t="subscription-report.csv"),e){const n=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=t,i.click(),URL.revokeObjectURL(r)}},children:"Export CSV"})})]}),(0,Q.jsxs)(ne,{children:[(0,Q.jsxs)(s.tU,{children:[(0,Q.jsx)(s.oz,{active:"revenue"===i,onClick:()=>p("revenue"),children:"Revenue"}),(0,Q.jsx)(s.oz,{active:"payment"===i,onClick:()=>p("payment"),children:"Payment"}),(0,Q.jsx)(s.oz,{active:"customer"===i,onClick:()=>p("customer"),children:"Customer"}),(0,Q.jsx)(s.oz,{active:"subscription"===i,onClick:()=>p("subscription"),children:"Subscription"})]}),(0,Q.jsxs)(re,{children:[(0,Q.jsx)(ie,{active:"all"===g,onClick:()=>m("all"),children:"All"}),(0,Q.jsx)(ie,{active:"month"===g,onClick:()=>m("month"),children:"This Month"}),(0,Q.jsx)(ie,{active:"3months"===g,onClick:()=>m("3months"),children:"3 Months"}),(0,Q.jsx)(ie,{active:"6months"===g,onClick:()=>m("6months"),children:"6 Months"}),(0,Q.jsx)(ie,{active:"year"===g,onClick:()=>m("year"),children:"This Year"}),(0,Q.jsx)(ie,{active:"custom"===g,onClick:()=>m("custom"),children:"Custom"}),"custom"===g&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(ae,{type:"date",value:v,onChange:e=>b(e.target.value)}),(0,Q.jsx)("span",{style:{color:"#6B7280"},children:"to"}),(0,Q.jsx)(ae,{type:"date",value:f,onChange:e=>w(e.target.value)})]}),(0,Q.jsx)(se,{value:y,onChange:e=>j(e.target.value),children:C.map(e=>(0,Q.jsx)("option",{value:e,children:e},e))})]}),"revenue"===i&&(()=>{if(A)return(0,Q.jsx)(me,{children:"Loading revenue data..."});if(!P)return(0,Q.jsx)(ye,{children:"No data available"});const e=R.reduce((e,t)=>e+t.total,0);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(a.MD,{children:[(0,Q.jsxs)(a.hI,{color:"#059669",children:[(0,Q.jsx)(a.Os,{children:(0,q.vv)(P.totalRevenue,y)}),(0,Q.jsx)(a.v0,{children:"Total Revenue"}),(0,Q.jsx)(a.d1,{children:"Collected payments"})]}),(0,Q.jsxs)(a.hI,{color:"#D97706",children:[(0,Q.jsx)(a.Os,{children:(0,q.vv)(P.pendingAmount,y)}),(0,Q.jsx)(a.v0,{children:"Pending Amount"}),(0,Q.jsx)(a.d1,{children:"Awaiting payment"})]}),(0,Q.jsxs)(a.hI,{color:"#635BFF",children:[(0,Q.jsxs)(a.Os,{children:[P.paidInvoices," / ",P.totalInvoices]}),(0,Q.jsx)(a.v0,{children:"Paid Invoices"}),(0,Q.jsx)(a.d1,{children:"Completed / Total"})]}),(0,Q.jsxs)(a.hI,{color:"#2563EB",children:[(0,Q.jsxs)(a.Os,{children:[P.collectionRate,"%"]}),(0,Q.jsx)(a.v0,{children:"Collection Rate"}),(0,Q.jsx)(a.d1,{children:"Payment success rate"})]})]}),(0,Q.jsxs)(de,{children:[(0,Q.jsxs)(oe,{children:[(0,Q.jsx)(ce,{children:"Revenue Trend (Last 12 Months)"}),S.length>0?(0,Q.jsx)(o.u,{width:"100%",height:300,children:(0,Q.jsxs)(c.b,{data:S,children:[(0,Q.jsx)(d.d,{strokeDasharray:"3 3",stroke:"#E6EBF1"}),(0,Q.jsx)(h.W,{dataKey:"month",tick:{fontSize:12}}),(0,Q.jsx)(u.h,{tick:{fontSize:12}}),(0,Q.jsx)(x.m,{formatter:e=>(0,q.vv)(e,y)}),(0,Q.jsx)(L,{}),(0,Q.jsx)(W.N,{type:"monotone",dataKey:"billed",stroke:"#635BFF",strokeWidth:2,name:"Billed",dot:{r:3}}),(0,Q.jsx)(W.N,{type:"monotone",dataKey:"collected",stroke:"#059669",strokeWidth:2,name:"Collected",dot:{r:3}})]})}):(0,Q.jsx)(ye,{children:"No trend data"})]}),(0,Q.jsxs)(oe,{children:[(0,Q.jsx)(ce,{children:"Revenue by Category"}),R.length>0?(0,Q.jsx)(o.u,{width:"100%",height:300,children:(0,Q.jsxs)(U.r,{children:[(0,Q.jsx)(V.F,{data:R.map(e=>({...e,name:ve[e.category]||e.category})),dataKey:"total",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:R.map((e,t)=>(0,Q.jsx)(H.f,{fill:je[t%je.length]},t))}),(0,Q.jsx)(x.m,{formatter:e=>(0,q.vv)(e,y)})]})}):(0,Q.jsx)(ye,{children:"No category data"})]})]}),(0,Q.jsxs)(he,{children:[(0,Q.jsx)(ce,{children:"Revenue by Category (Detail)"}),(0,Q.jsxs)(ue,{children:[(0,Q.jsx)("thead",{children:(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(xe,{children:"Category"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Invoices"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Amount"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Share"})]})}),(0,Q.jsx)("tbody",{children:R.map((t,n)=>(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(pe,{children:ve[t.category]||t.category}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:t.count}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:(0,q.vv)(t.total,y)}),(0,Q.jsxs)(pe,{style:{textAlign:"right"},children:[e>0?(t.total/e*100).toFixed(1):0,"%"]})]},n))})]})]})]})})(),"payment"===i&&(A?(0,Q.jsx)(me,{children:"Loading payment data..."}):I?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(a.MD,{children:[(0,Q.jsxs)(a.hI,{color:"#DC2626",children:[(0,Q.jsx)(a.Os,{children:I.overdueCount}),(0,Q.jsx)(a.v0,{children:"Overdue Invoices"}),(0,Q.jsx)(a.d1,{children:(0,q.vv)(I.overdueAmount,y)})]}),(0,Q.jsxs)(a.hI,{color:"#635BFF",children:[(0,Q.jsxs)(a.Os,{children:[I.avgPaymentDays," days"]}),(0,Q.jsx)(a.v0,{children:"Avg Payment Time"}),(0,Q.jsx)(a.d1,{children:"Issue to payment"})]}),(0,Q.jsxs)(a.hI,{color:"#2563EB",children:[(0,Q.jsx)(a.Os,{children:I.awaitingCount}),(0,Q.jsx)(a.v0,{children:"Awaiting Confirmation"}),(0,Q.jsx)(a.d1,{children:"Payment submitted"})]}),(0,Q.jsxs)(a.hI,{color:"#059669",children:[(0,Q.jsx)(a.Os,{children:(0,q.vv)(I.thisMonthCollected,y)}),(0,Q.jsx)(a.v0,{children:"This Month Collected"}),(0,Q.jsx)(a.d1,{children:"Current month"})]})]}),(0,Q.jsxs)(de,{children:[(0,Q.jsxs)(he,{children:[(0,Q.jsx)(ce,{children:"Payment Status Breakdown"}),(0,Q.jsxs)(ue,{children:[(0,Q.jsx)("thead",{children:(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(xe,{children:"Status"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Count"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Amount"})]})}),(0,Q.jsx)("tbody",{children:I.statusBreakdown.map((e,t)=>(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(pe,{children:(0,Q.jsx)(ge,{status:e.status,children:we[e.status]||e.status})}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:e.count}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:(0,q.vv)(e.total,y)})]},t))})]})]}),(0,Q.jsxs)(oe,{children:[(0,Q.jsx)(ce,{children:"Payment Methods"}),I.paymentMethods.length>0?(0,Q.jsx)(o.u,{width:"100%",height:300,children:(0,Q.jsxs)(U.r,{children:[(0,Q.jsx)(V.F,{data:I.paymentMethods.map(e=>({...e,name:be[e.method]||e.method})),dataKey:"count",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:I.paymentMethods.map((e,t)=>(0,Q.jsx)(H.f,{fill:je[t%je.length]},t))}),(0,Q.jsx)(x.m,{})]})}):(0,Q.jsx)(ye,{children:"No payment method data"})]})]}),N.length>0&&(0,Q.jsxs)(he,{children:[(0,Q.jsxs)(ce,{children:["Overdue Invoices (",N.length,")"]}),(0,Q.jsxs)(ue,{children:[(0,Q.jsx)("thead",{children:(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(xe,{children:"Invoice #"}),(0,Q.jsx)(xe,{children:"Restaurant"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Amount"}),(0,Q.jsx)(xe,{children:"Due Date"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Days Overdue"})]})}),(0,Q.jsx)("tbody",{children:N.map(e=>(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(pe,{style:{fontWeight:500},children:e.invoiceNumber}),(0,Q.jsx)(pe,{children:e.restaurantName}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:(0,q.vv)(e.amount,e.currency)}),(0,Q.jsx)(pe,{children:new Date(e.dueDate).toLocaleDateString("en-GB",{timeZone:t||"Asia/Kuala_Lumpur"})}),(0,Q.jsx)(pe,{style:{textAlign:"right",color:e.daysOverdue>30?"#DC2626":"#D97706",fontWeight:600},children:e.daysOverdue})]},e.id))})]})]})]}):(0,Q.jsx)(ye,{children:"No data available"})),"customer"===i&&(A?(0,Q.jsx)(me,{children:"Loading customer data..."}):T?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(a.MD,{children:[(0,Q.jsxs)(a.hI,{color:"#6366F1",children:[(0,Q.jsx)(a.Os,{children:T.totalRestaurants}),(0,Q.jsx)(a.v0,{children:"Total Restaurants"}),(0,Q.jsx)(a.d1,{children:"All registered"})]}),(0,Q.jsxs)(a.hI,{color:"#059669",children:[(0,Q.jsx)(a.Os,{children:T.activeRestaurants}),(0,Q.jsx)(a.v0,{children:"Active Restaurants"}),(0,Q.jsx)(a.d1,{children:"With invoices (3 months)"})]}),(0,Q.jsxs)(a.hI,{color:"#2563EB",children:[(0,Q.jsx)(a.Os,{children:T.newThisMonth}),(0,Q.jsx)(a.v0,{children:"New This Month"}),(0,Q.jsx)(a.d1,{children:"Recently registered"})]}),(0,Q.jsxs)(a.hI,{color:"#F59E0B",children:[(0,Q.jsx)(a.Os,{children:(0,q.vv)(T.arpu,y)}),(0,Q.jsx)(a.v0,{children:"ARPU"}),(0,Q.jsx)(a.d1,{children:"Avg revenue per restaurant"})]})]}),(0,Q.jsxs)(de,{children:[(0,Q.jsxs)(oe,{children:[(0,Q.jsx)(ce,{children:"Monthly Registration Trend"}),T.registrationTrend.length>0?(0,Q.jsx)(o.u,{width:"100%",height:300,children:(0,Q.jsxs)(Y.E,{data:T.registrationTrend,children:[(0,Q.jsx)(d.d,{strokeDasharray:"3 3",stroke:"#E6EBF1"}),(0,Q.jsx)(h.W,{dataKey:"month",tick:{fontSize:12}}),(0,Q.jsx)(u.h,{tick:{fontSize:12},allowDecimals:!1}),(0,Q.jsx)(x.m,{}),(0,Q.jsx)(Z.y,{dataKey:"count",fill:"#635BFF",radius:[4,4,0,0],name:"New Restaurants"})]})}):(0,Q.jsx)(ye,{children:"No registration data"})]}),(0,Q.jsxs)(oe,{children:[(0,Q.jsx)(ce,{children:"Payer Type Distribution"}),T.payerDistribution.length>0?(0,Q.jsx)(o.u,{width:"100%",height:300,children:(0,Q.jsxs)(U.r,{children:[(0,Q.jsx)(V.F,{data:T.payerDistribution.map(e=>({...e,name:fe[e.payerType]||e.payerType})),dataKey:"total",nameKey:"name",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{name:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:T.payerDistribution.map((e,t)=>(0,Q.jsx)(H.f,{fill:je[t%je.length]},t))}),(0,Q.jsx)(x.m,{formatter:e=>(0,q.vv)(e,y)})]})}):(0,Q.jsx)(ye,{children:"No payer data"})]})]}),(0,Q.jsxs)(he,{children:[(0,Q.jsx)(ce,{children:"Top 10 Restaurants by Revenue"}),(0,Q.jsxs)(ue,{children:[(0,Q.jsx)("thead",{children:(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(xe,{children:"#"}),(0,Q.jsx)(xe,{children:"Restaurant"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Total Revenue"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Invoices"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Overdue"})]})}),(0,Q.jsx)("tbody",{children:T.topRestaurants.map((e,t)=>(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(pe,{style:{fontWeight:600,color:t<3?"#635BFF":"#6B7280"},children:t+1}),(0,Q.jsx)(pe,{style:{fontWeight:500},children:e.restaurantName}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:(0,q.vv)(e.totalRevenue,y)}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:e.invoiceCount}),(0,Q.jsx)(pe,{style:{textAlign:"right",color:e.overdueCount>0?"#DC2626":"#059669"},children:e.overdueCount})]},t))})]})]})]}):(0,Q.jsx)(ye,{children:"No data available"})),"subscription"===i&&(()=>{if(A)return(0,Q.jsx)(me,{children:"Loading subscription data..."});if(!K)return(0,Q.jsx)(ye,{children:"No data available"});const e=K.planDistribution.reduce((e,t)=>e+t.monthlyRevenue,0);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(a.MD,{children:[(0,Q.jsxs)(a.hI,{color:"#7C3AED",children:[(0,Q.jsx)(a.Os,{children:K.activePlans}),(0,Q.jsx)(a.v0,{children:"Active Plans"}),(0,Q.jsx)(a.d1,{children:"Currently available"})]}),(0,Q.jsxs)(a.hI,{color:"#059669",children:[(0,Q.jsx)(a.Os,{children:(0,q.vv)(K.mrr,y)}),(0,Q.jsx)(a.v0,{children:"MRR"}),(0,Q.jsx)(a.d1,{children:"Monthly Recurring Revenue"})]}),(0,Q.jsxs)(a.hI,{color:"#F59E0B",children:[(0,Q.jsx)(a.Os,{children:(0,q.vv)(K.arpu,y)}),(0,Q.jsx)(a.v0,{children:"ARPU"}),(0,Q.jsx)(a.d1,{children:"Avg per subscriber"})]}),(0,Q.jsxs)(a.hI,{color:"#635BFF",children:[(0,Q.jsx)(a.Os,{style:{fontSize:"16px"},children:K.mostPopularPlan}),(0,Q.jsx)(a.v0,{children:"Most Popular"}),(0,Q.jsxs)(a.d1,{children:[K.activeSubscribers," subscribers"]})]})]}),(0,Q.jsxs)(de,{children:[(0,Q.jsxs)(he,{children:[(0,Q.jsx)(ce,{children:"Plan Revenue Breakdown"}),(0,Q.jsxs)(ue,{children:[(0,Q.jsx)("thead",{children:(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(xe,{children:"Plan"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Subscribers"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Monthly Revenue"}),(0,Q.jsx)(xe,{style:{textAlign:"right"},children:"Share"})]})}),(0,Q.jsxs)("tbody",{children:[K.planDistribution.map((t,n)=>(0,Q.jsxs)("tr",{children:[(0,Q.jsx)(pe,{style:{fontWeight:500},children:t.planName}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:t.subscriberCount}),(0,Q.jsx)(pe,{style:{textAlign:"right"},children:(0,q.vv)(t.monthlyRevenue,y)}),(0,Q.jsxs)(pe,{style:{textAlign:"right"},children:[e>0?(t.monthlyRevenue/e*100).toFixed(1):0,"%"]})]},n)),0===K.planDistribution.length&&(0,Q.jsx)("tr",{children:(0,Q.jsx)(pe,{colSpan:4,style:{textAlign:"center",color:"#9CA3AF"},children:"No subscription data yet"})})]})]})]}),(0,Q.jsxs)(oe,{children:[(0,Q.jsx)(ce,{children:"Plan Distribution"}),K.planDistribution.length>0?(0,Q.jsx)(o.u,{width:"100%",height:300,children:(0,Q.jsxs)(U.r,{children:[(0,Q.jsx)(V.F,{data:K.planDistribution,dataKey:"subscriberCount",nameKey:"planName",cx:"50%",cy:"50%",outerRadius:100,label:e=>{let{planName:t,percent:n}=e;return`${t} ${(100*n).toFixed(0)}%`},children:K.planDistribution.map((e,t)=>(0,Q.jsx)(H.f,{fill:je[t%je.length]},t))}),(0,Q.jsx)(x.m,{})]})}):(0,Q.jsx)(ye,{children:"No plan data"})]})]})]})})()]})]})})}}}]);