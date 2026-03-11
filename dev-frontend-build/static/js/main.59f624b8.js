/*! For license information please see main.59f624b8.js.LICENSE.txt */
(()=>{var e={403:e=>{e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<i.length;l++){var d=i[l];if(!s(d))return!1;var c=e[d],u=t[d];if(!1===(o=n?n.call(r,c,u,d):void 0)||void 0===o&&c!==u)return!1}return!0}},447:(e,t,n)=>{"use strict";n.d(t,{h:()=>a,sy:()=>s});var r=n(9950),o=n(4414);const i=(0,r.createContext)(void 0),a=()=>{const e=(0,r.useContext)(i);if(!e)throw new Error("useOrders must be used within an OrderProvider");return e},s=e=>{let{children:t}=e;const[n,a]=(0,r.useState)([]),s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}};(0,r.useEffect)(()=>{(async()=>{try{if(!localStorage.getItem("auth_token"))return;const e=await fetch("/api/orders?limit=100",s()),t=await e.json();if(t.success){const e=t.data||t;a(e)}else a([])}catch(e){a([])}})()},[]);return(0,o.jsx)(i.Provider,{value:{orders:n,addOrder:async(e,t)=>{try{var n,r,o,i;const l={restaurant_id:t,order_number:e.orderNumber||null,customer_name:e.customer.name,customer_phone:e.customer.phone,table_number:e.tableNumber||null,pager_number:e.pagerNumber||null,total_amount:e.total,subtotal:e.subtotal,tax:e.tax,tax_rate:e.taxRate||6,service_charge:e.serviceCharge||0,service_charge_rate:e.serviceChargeRate||10,discount:e.discount||0,coupon_code:(null===(n=e.coupon)||void 0===n?void 0:n.code)||null,coupon_discount:(null===(r=e.coupon)||void 0===r?void 0:r.amount)||0,discount_policy_name:(null===(o=e.discountPolicy)||void 0===o?void 0:o.name)||null,discount_policy_amount:(null===(i=e.discountPolicy)||void 0===i?void 0:i.amount)||0,points_used:e.points_used||null,point_discount:e.point_discount||0,takeaway_charge:e.takeawayCharge||0,status:e.status,order_type:"dine-in"===e.orderType?"dine_in":e.orderType,source:"pos",payment_method:e.paymentMethod||null,payment_status:e.paymentStatus||"pending",order_date:new Date,cashier_id:e.cashier_id||null,cashier_name:e.cashier_name||null,guest_count:e.guest_count||null,order_items:e.items.map(e=>({id:e.id,name:e.menuItem.name,price:e.menuItem.price,quantity:e.quantity,options:e.options||[],menuItem:e.menuItem,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}))},d=await fetch("/api/orders",s({method:"POST",body:JSON.stringify(l)}));if(!d.ok){const e=await d.text();throw new Error(`Failed to create order: ${d.status} ${e}`)}const c=await d.json();if(!c.success)throw new Error(c.error||"Failed to create order");const u=c.data;return a(t=>t.find(t=>t.id===e.id)?t:[...t,u]),u}catch(l){throw l}},updateOrderStatus:async(e,t)=>{try{const n=await fetch(`/api/orders/${e}/status`,s({method:"PATCH",body:JSON.stringify({status:t})})),r=await n.json();if(!r.success)throw new Error(r.error||"Failed to update order status");a(n=>n.map(n=>n.id===e?{...n,status:t}:n))}catch(n){throw n}},deleteOrder:async e=>{try{const t=await fetch(`/api/orders/${e}`,s({method:"DELETE"})),n=await t.json();if(!n.success)throw new Error(n.error||"Failed to delete order");a(t=>t.filter(t=>t.id!==e))}catch(t){throw t}},getOrderById:e=>n.find(t=>t.id===e)},children:t})}},755:(e,t,n)=>{"use strict";n.d(t,{e:()=>l,i:()=>s});var r=n(9950),o=n(4414);const i={primaryColor:"#8B5CF6",secondaryColor:"#A78BFA",accentColor:"#C4B5FD"},a=(0,r.createContext)(void 0),s=e=>{let{children:t}=e;const[n,s]=(0,r.useState)(i),l=e=>{s(e),document.documentElement.style.setProperty("--brand-primary",e.primaryColor),document.documentElement.style.setProperty("--brand-secondary",e.secondaryColor),document.documentElement.style.setProperty("--brand-accent",e.accentColor)},d=n.primaryColor===i.primaryColor;return(0,r.useEffect)(()=>{l(n)},[]),(0,o.jsx)(a.Provider,{value:{theme:n,setTheme:l,resetTheme:()=>{l(i)},isDefaultTheme:d},children:t})},l=()=>{const e=(0,r.useContext)(a);return e||{theme:i,setTheme:()=>{},resetTheme:()=>{},isDefaultTheme:!0}}},949:e=>{"use strict";e.exports=function(e,t,n,r,o,i,a,s){if(!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[n,r,o,i,a,s],c=0;(l=new Error(t.replace(/%s/g,function(){return d[c++]}))).name="Invariant Violation"}throw l.framesToPop=1,l}}},1085:(e,t,n)=>{"use strict";var r=n(5340),o=n(9950),i=n(7119);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function d(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function c(e){if(l(e)!==e)throw Error(a(188))}function u(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=u(e)))return t;e=e.sibling}return null}var p=Object.assign,h=Symbol.for("react.element"),m=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),b=Symbol.for("react.provider"),v=Symbol.for("react.consumer"),w=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),A=Symbol.for("react.memo"),C=Symbol.for("react.lazy");Symbol.for("react.scope");var F=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var _=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var E=Symbol.iterator;function P(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=E&&e[E]||e["@@iterator"])?e:null}var B=Symbol.for("react.client.reference");function z(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===B?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case f:return"Fragment";case y:return"Profiler";case x:return"StrictMode";case k:return"Suspense";case S:return"SuspenseList";case F:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case w:return(e.displayName||"Context")+".Provider";case v:return(e._context.displayName||"Context")+".Consumer";case j:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case A:return null!==(t=e.displayName||null)?t:z(e.type)||"Memo";case C:t=e._payload,e=e._init;try{return z(e(t))}catch(n){}}return null}var R=Array.isArray,T=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,O=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I={pending:!1,data:null,method:null,action:null},$=[],M=-1;function D(e){return{current:e}}function N(e){0>M||(e.current=$[M],$[M]=null,M--)}function L(e,t){M++,$[M]=e.current,e.current=t}var q=D(null),H=D(null),W=D(null),U=D(null);function G(e,t){switch(L(W,t),L(H,e),L(q,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?ou(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=iu(t=ou(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}N(q),L(q,e)}function Y(){N(q),N(H),N(W)}function V(e){null!==e.memoizedState&&L(U,e);var t=q.current,n=iu(t,e.type);t!==n&&(L(H,e),L(q,n))}function Q(e){H.current===e&&(N(q),N(H)),U.current===e&&(N(U),Vu._currentValue=I)}var K=Object.prototype.hasOwnProperty,J=r.unstable_scheduleCallback,X=r.unstable_cancelCallback,Z=r.unstable_shouldYield,ee=r.unstable_requestPaint,te=r.unstable_now,ne=r.unstable_getCurrentPriorityLevel,re=r.unstable_ImmediatePriority,oe=r.unstable_UserBlockingPriority,ie=r.unstable_NormalPriority,ae=r.unstable_LowPriority,se=r.unstable_IdlePriority,le=r.log,de=r.unstable_setDisableYieldValue,ce=null,ue=null;function pe(e){if("function"===typeof le&&de(e),ue&&"function"===typeof ue.setStrictMode)try{ue.setStrictMode(ce,e)}catch(t){}}var he=Math.clz32?Math.clz32:function(e){return 0===(e>>>=0)?32:31-(me(e)/ge|0)|0},me=Math.log,ge=Math.LN2;var fe=256,xe=4194304;function ye(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194048&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function be(e,t,n){var r=e.pendingLanes;if(0===r)return 0;var o=0,i=e.suspendedLanes,a=e.pingedLanes;e=e.warmLanes;var s=134217727&r;return 0!==s?0!==(r=s&~i)?o=ye(r):0!==(a&=s)?o=ye(a):n||0!==(n=s&~e)&&(o=ye(n)):0!==(s=r&~i)?o=ye(s):0!==a?o=ye(a):n||0!==(n=r&~e)&&(o=ye(n)),0===o?0:0!==t&&t!==o&&0===(t&i)&&((i=o&-o)>=(n=t&-t)||32===i&&0!==(4194048&n))?t:o}function ve(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function we(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function je(){var e=fe;return 0===(4194048&(fe<<=1))&&(fe=256),e}function ke(){var e=xe;return 0===(62914560&(xe<<=1))&&(xe=4194304),e}function Se(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ae(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ce(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-he(t);e.entangledLanes|=t,e.entanglements[r]=1073741824|e.entanglements[r]|4194090&n}function Fe(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-he(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}function _e(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ee(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Pe(){var e=O.p;return 0!==e?e:void 0===(e=window.event)?32:dp(e.type)}var Be=Math.random().toString(36).slice(2),ze="__reactFiber$"+Be,Re="__reactProps$"+Be,Te="__reactContainer$"+Be,Oe="__reactEvents$"+Be,Ie="__reactListeners$"+Be,$e="__reactHandles$"+Be,Me="__reactResources$"+Be,De="__reactMarker$"+Be;function Ne(e){delete e[ze],delete e[Re],delete e[Oe],delete e[Ie],delete e[$e]}function Le(e){var t=e[ze];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Te]||n[ze]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=bu(e);null!==e;){if(n=e[ze])return n;e=bu(e)}return t}n=(e=n).parentNode}return null}function qe(e){if(e=e[ze]||e[Te]){var t=e.tag;if(5===t||6===t||13===t||26===t||27===t||3===t)return e}return null}function He(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(a(33))}function We(e){var t=e[Me];return t||(t=e[Me]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ue(e){e[De]=!0}var Ge=new Set,Ye={};function Ve(e,t){Qe(e,t),Qe(e+"Capture",t)}function Qe(e,t){for(Ye[e]=t,e=0;e<t.length;e++)Ge.add(t[e])}var Ke,Je,Xe=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ze={},et={};function tt(e,t,n){if(o=t,K.call(et,o)||!K.call(Ze,o)&&(Xe.test(o)?et[o]=!0:(Ze[o]=!0,0)))if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var r=t.toLowerCase().slice(0,5);if("data-"!==r&&"aria-"!==r)return void e.removeAttribute(t)}e.setAttribute(t,""+n)}var o}function nt(e,t,n){if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+n)}}function rt(e,t,n,r){if(null===r)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(n)}e.setAttributeNS(t,n,""+r)}}function ot(e){if(void 0===Ke)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ke=t&&t[1]||"",Je=-1<n.stack.indexOf("\n    at")?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+Ke+e+Je}var it=!1;function at(e,t){if(!e||it)return"";it=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(o){var r=o}Reflect.construct(e,[],n)}else{try{n.call()}catch(i){r=i}e.call(n.prototype)}}else{try{throw Error()}catch(a){r=a}(n=e())&&"function"===typeof n.catch&&n.catch(function(){})}}catch(s){if(s&&r&&"string"===typeof s.stack)return[s.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=r.DetermineComponentFrameRoot(),a=i[0],s=i[1];if(a&&s){var l=a.split("\n"),d=s.split("\n");for(o=r=0;r<l.length&&!l[r].includes("DetermineComponentFrameRoot");)r++;for(;o<d.length&&!d[o].includes("DetermineComponentFrameRoot");)o++;if(r===l.length||o===d.length)for(r=l.length-1,o=d.length-1;1<=r&&0<=o&&l[r]!==d[o];)o--;for(;1<=r&&0<=o;r--,o--)if(l[r]!==d[o]){if(1!==r||1!==o)do{if(r--,0>--o||l[r]!==d[o]){var c="\n"+l[r].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}}while(1<=r&&0<=o);break}}}finally{it=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ot(n):""}function st(e){switch(e.tag){case 26:case 27:case 5:return ot(e.type);case 16:return ot("Lazy");case 13:return ot("Suspense");case 19:return ot("SuspenseList");case 0:case 15:return at(e.type,!1);case 11:return at(e.type.render,!1);case 1:return at(e.type,!0);case 31:return ot("Activity");default:return""}}function lt(e){try{var t="";do{t+=st(e),e=e.return}while(e);return t}catch(n){return"\nError generating stack: "+n.message+"\n"+n.stack}}function dt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function ct(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function ut(e){e._valueTracker||(e._valueTracker=function(e){var t=ct(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(e){r=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function pt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ct(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function ht(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var mt=/[\n"\\]/g;function gt(e){return e.replace(mt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function ft(e,t,n,r,o,i,a,s){e.name="",null!=a&&"function"!==typeof a&&"symbol"!==typeof a&&"boolean"!==typeof a?e.type=a:e.removeAttribute("type"),null!=t?"number"===a?(0===t&&""===e.value||e.value!=t)&&(e.value=""+dt(t)):e.value!==""+dt(t)&&(e.value=""+dt(t)):"submit"!==a&&"reset"!==a||e.removeAttribute("value"),null!=t?yt(e,a,dt(t)):null!=n?yt(e,a,dt(n)):null!=r&&e.removeAttribute("value"),null==o&&null!=i&&(e.defaultChecked=!!i),null!=o&&(e.checked=o&&"function"!==typeof o&&"symbol"!==typeof o),null!=s&&"function"!==typeof s&&"symbol"!==typeof s&&"boolean"!==typeof s?e.name=""+dt(s):e.removeAttribute("name")}function xt(e,t,n,r,o,i,a,s){if(null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.type=i),null!=t||null!=n){if(!("submit"!==i&&"reset"!==i||void 0!==t&&null!==t))return;n=null!=n?""+dt(n):"",t=null!=t?""+dt(t):n,s||t===e.value||(e.value=t),e.defaultValue=t}r="function"!==typeof(r=null!=r?r:o)&&"symbol"!==typeof r&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,null!=a&&"function"!==typeof a&&"symbol"!==typeof a&&"boolean"!==typeof a&&(e.name=a)}function yt(e,t,n){"number"===t&&ht(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function bt(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+dt(n),t=null,o=0;o<e.length;o++){if(e[o].value===n)return e[o].selected=!0,void(r&&(e[o].defaultSelected=!0));null!==t||e[o].disabled||(t=e[o])}null!==t&&(t.selected=!0)}}function vt(e,t,n){null==t||((t=""+dt(t))!==e.value&&(e.value=t),null!=n)?e.defaultValue=null!=n?""+dt(n):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,n,r){if(null==t){if(null!=r){if(null!=n)throw Error(a(92));if(R(r)){if(1<r.length)throw Error(a(93));r=r[0]}n=r}null==n&&(n=""),t=n}n=dt(t),e.defaultValue=n,(r=e.textContent)===n&&""!==r&&null!==r&&(e.value=r)}function jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var kt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function St(e,t,n){var r=0===t.indexOf("--");null==n||"boolean"===typeof n||""===n?r?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":r?e.setProperty(t,n):"number"!==typeof n||0===n||kt.has(t)?"float"===t?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function At(e,t,n){if(null!=t&&"object"!==typeof t)throw Error(a(62));if(e=e.style,null!=n){for(var r in n)!n.hasOwnProperty(r)||null!=t&&t.hasOwnProperty(r)||(0===r.indexOf("--")?e.setProperty(r,""):"float"===r?e.cssFloat="":e[r]="");for(var o in t)r=t[o],t.hasOwnProperty(o)&&n[o]!==r&&St(e,o,r)}else for(var i in t)t.hasOwnProperty(i)&&St(e,i,t[i])}function Ct(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ft=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_t=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Et(e){return _t.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Pt=null;function Bt(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var zt=null,Rt=null;function Tt(e){var t=qe(e);if(t&&(e=t.stateNode)){var n=e[Re]||null;e:switch(e=t.stateNode,t.type){case"input":if(ft(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+gt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=r[Re]||null;if(!o)throw Error(a(90));ft(r,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(t=0;t<n.length;t++)(r=n[t]).form===e.form&&pt(r)}break e;case"textarea":vt(e,n.value,n.defaultValue);break e;case"select":null!=(t=n.value)&&bt(e,!!n.multiple,t,!1)}}}var Ot=!1;function It(e,t,n){if(Ot)return e(t,n);Ot=!0;try{return e(t)}finally{if(Ot=!1,(null!==zt||null!==Rt)&&(Ld(),zt&&(t=zt,e=Rt,Rt=zt=null,Tt(t),e)))for(t=0;t<e.length;t++)Tt(e[t])}}function $t(e,t){var n=e.stateNode;if(null===n)return null;var r=n[Re]||null;if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(a(231,t,typeof n));return n}var Mt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Dt=!1;if(Mt)try{var Nt={};Object.defineProperty(Nt,"passive",{get:function(){Dt=!0}}),window.addEventListener("test",Nt,Nt),window.removeEventListener("test",Nt,Nt)}catch(Rp){Dt=!1}var Lt=null,qt=null,Ht=null;function Wt(){if(Ht)return Ht;var e,t,n=qt,r=n.length,o="value"in Lt?Lt.value:Lt.textContent,i=o.length;for(e=0;e<r&&n[e]===o[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===o[i-t];t++);return Ht=o.slice(e,1<t?1-t:void 0)}function Ut(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Gt(){return!0}function Yt(){return!1}function Vt(e){function t(t,n,r,o,i){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=o,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(null!=o.defaultPrevented?o.defaultPrevented:!1===o.returnValue)?Gt:Yt,this.isPropagationStopped=Yt,this}return p(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Gt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Gt)},persist:function(){},isPersistent:Gt}),t}var Qt,Kt,Jt,Xt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zt=Vt(Xt),en=p({},Xt,{view:0,detail:0}),tn=Vt(en),nn=p({},en,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Jt&&(Jt&&"mousemove"===e.type?(Qt=e.screenX-Jt.screenX,Kt=e.screenY-Jt.screenY):Kt=Qt=0,Jt=e),Qt)},movementY:function(e){return"movementY"in e?e.movementY:Kt}}),rn=Vt(nn),on=Vt(p({},nn,{dataTransfer:0})),an=Vt(p({},en,{relatedTarget:0})),sn=Vt(p({},Xt,{animationName:0,elapsedTime:0,pseudoElement:0})),ln=Vt(p({},Xt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),dn=Vt(p({},Xt,{data:0})),cn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},un={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function hn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=pn[e])&&!!t[e]}function mn(){return hn}var gn=Vt(p({},en,{key:function(e){if(e.key){var t=cn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Ut(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?un[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mn,charCode:function(e){return"keypress"===e.type?Ut(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Ut(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),fn=Vt(p({},nn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),xn=Vt(p({},en,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mn})),yn=Vt(p({},Xt,{propertyName:0,elapsedTime:0,pseudoElement:0})),bn=Vt(p({},nn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),vn=Vt(p({},Xt,{newState:0,oldState:0})),wn=[9,13,27,32],jn=Mt&&"CompositionEvent"in window,kn=null;Mt&&"documentMode"in document&&(kn=document.documentMode);var Sn=Mt&&"TextEvent"in window&&!kn,An=Mt&&(!jn||kn&&8<kn&&11>=kn),Cn=String.fromCharCode(32),Fn=!1;function _n(e,t){switch(e){case"keyup":return-1!==wn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function En(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Pn=!1;var Bn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Bn[e.type]:"textarea"===t}function Rn(e,t,n,r){zt?Rt?Rt.push(r):Rt=[r]:zt=r,0<(t=Wc(t,"onChange")).length&&(n=new Zt("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Tn=null,On=null;function In(e){Ic(e,0)}function $n(e){if(pt(He(e)))return e}function Mn(e,t){if("change"===e)return t}var Dn=!1;if(Mt){var Nn;if(Mt){var Ln="oninput"in document;if(!Ln){var qn=document.createElement("div");qn.setAttribute("oninput","return;"),Ln="function"===typeof qn.oninput}Nn=Ln}else Nn=!1;Dn=Nn&&(!document.documentMode||9<document.documentMode)}function Hn(){Tn&&(Tn.detachEvent("onpropertychange",Wn),On=Tn=null)}function Wn(e){if("value"===e.propertyName&&$n(On)){var t=[];Rn(t,On,e,Bt(e)),It(In,t)}}function Un(e,t,n){"focusin"===e?(Hn(),On=n,(Tn=t).attachEvent("onpropertychange",Wn)):"focusout"===e&&Hn()}function Gn(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return $n(On)}function Yn(e,t){if("click"===e)return $n(t)}function Vn(e,t){if("input"===e||"change"===e)return $n(t)}var Qn="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Kn(e,t){if(Qn(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!K.call(t,o)||!Qn(e[o],t[o]))return!1}return!0}function Jn(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xn(e,t){var n,r=Jn(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Jn(r)}}function Zn(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?Zn(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function er(e){for(var t=ht((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=ht((e=t.contentWindow).document)}return t}function tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var nr=Mt&&"documentMode"in document&&11>=document.documentMode,rr=null,or=null,ir=null,ar=!1;function sr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;ar||null==rr||rr!==ht(r)||("selectionStart"in(r=rr)&&tr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},ir&&Kn(ir,r)||(ir=r,0<(r=Wc(or,"onSelect")).length&&(t=new Zt("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=rr)))}function lr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var dr={animationend:lr("Animation","AnimationEnd"),animationiteration:lr("Animation","AnimationIteration"),animationstart:lr("Animation","AnimationStart"),transitionrun:lr("Transition","TransitionRun"),transitionstart:lr("Transition","TransitionStart"),transitioncancel:lr("Transition","TransitionCancel"),transitionend:lr("Transition","TransitionEnd")},cr={},ur={};function pr(e){if(cr[e])return cr[e];if(!dr[e])return e;var t,n=dr[e];for(t in n)if(n.hasOwnProperty(t)&&t in ur)return cr[e]=n[t];return e}Mt&&(ur=document.createElement("div").style,"AnimationEvent"in window||(delete dr.animationend.animation,delete dr.animationiteration.animation,delete dr.animationstart.animation),"TransitionEvent"in window||delete dr.transitionend.transition);var hr=pr("animationend"),mr=pr("animationiteration"),gr=pr("animationstart"),fr=pr("transitionrun"),xr=pr("transitionstart"),yr=pr("transitioncancel"),br=pr("transitionend"),vr=new Map,wr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function jr(e,t){vr.set(e,t),Ve(t,[e])}wr.push("scrollEnd");var kr=new WeakMap;function Sr(e,t){if("object"===typeof e&&null!==e){var n=kr.get(e);return void 0!==n?n:(t={value:e,source:t,stack:lt(t)},kr.set(e,t),t)}return{value:e,source:t,stack:lt(t)}}var Ar=[],Cr=0,Fr=0;function _r(){for(var e=Cr,t=Fr=Cr=0;t<e;){var n=Ar[t];Ar[t++]=null;var r=Ar[t];Ar[t++]=null;var o=Ar[t];Ar[t++]=null;var i=Ar[t];if(Ar[t++]=null,null!==r&&null!==o){var a=r.pending;null===a?o.next=o:(o.next=a.next,a.next=o),r.pending=o}0!==i&&zr(n,o,i)}}function Er(e,t,n,r){Ar[Cr++]=e,Ar[Cr++]=t,Ar[Cr++]=n,Ar[Cr++]=r,Fr|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Pr(e,t,n,r){return Er(e,t,n,r),Rr(e)}function Br(e,t){return Er(e,null,null,t),Rr(e)}function zr(e,t,n){e.lanes|=n;var r=e.alternate;null!==r&&(r.lanes|=n);for(var o=!1,i=e.return;null!==i;)i.childLanes|=n,null!==(r=i.alternate)&&(r.childLanes|=n),22===i.tag&&(null===(e=i.stateNode)||1&e._visibility||(o=!0)),e=i,i=i.return;return 3===e.tag?(i=e.stateNode,o&&null!==t&&(o=31-he(n),null===(r=(e=i.hiddenUpdates)[o])?e[o]=[t]:r.push(t),t.lane=536870912|n),i):null}function Rr(e){if(50<zd)throw zd=0,Rd=null,Error(a(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Tr={};function Or(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ir(e,t,n,r){return new Or(e,t,n,r)}function $r(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Mr(e,t){var n=e.alternate;return null===n?((n=Ir(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=65011712&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Dr(e,t){e.flags&=65011714;var n=e.alternate;return null===n?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Nr(e,t,n,r,o,i){var s=0;if(r=e,"function"===typeof e)$r(e)&&(s=1);else if("string"===typeof e)s=function(e,t,n){if(1===n||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,n,q.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case F:return(e=Ir(31,n,t,o)).elementType=F,e.lanes=i,e;case f:return Lr(n.children,o,i,t);case x:s=8,o|=24;break;case y:return(e=Ir(12,n,t,2|o)).elementType=y,e.lanes=i,e;case k:return(e=Ir(13,n,t,o)).elementType=k,e.lanes=i,e;case S:return(e=Ir(19,n,t,o)).elementType=S,e.lanes=i,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case b:case w:s=10;break e;case v:s=9;break e;case j:s=11;break e;case A:s=14;break e;case C:s=16,r=null;break e}s=29,n=Error(a(130,null===e?"null":typeof e,"")),r=null}return(t=Ir(s,n,t,o)).elementType=e,t.type=r,t.lanes=i,t}function Lr(e,t,n,r){return(e=Ir(7,e,r,t)).lanes=n,e}function qr(e,t,n){return(e=Ir(6,e,null,t)).lanes=n,e}function Hr(e,t,n){return(t=Ir(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Wr=[],Ur=0,Gr=null,Yr=0,Vr=[],Qr=0,Kr=null,Jr=1,Xr="";function Zr(e,t){Wr[Ur++]=Yr,Wr[Ur++]=Gr,Gr=e,Yr=t}function eo(e,t,n){Vr[Qr++]=Jr,Vr[Qr++]=Xr,Vr[Qr++]=Kr,Kr=e;var r=Jr;e=Xr;var o=32-he(r)-1;r&=~(1<<o),n+=1;var i=32-he(t)+o;if(30<i){var a=o-o%5;i=(r&(1<<a)-1).toString(32),r>>=a,o-=a,Jr=1<<32-he(t)+o|n<<o|r,Xr=i+e}else Jr=1<<i|n<<o|r,Xr=e}function to(e){null!==e.return&&(Zr(e,1),eo(e,1,0))}function no(e){for(;e===Gr;)Gr=Wr[--Ur],Wr[Ur]=null,Yr=Wr[--Ur],Wr[Ur]=null;for(;e===Kr;)Kr=Vr[--Qr],Vr[Qr]=null,Xr=Vr[--Qr],Vr[Qr]=null,Jr=Vr[--Qr],Vr[Qr]=null}var ro=null,oo=null,io=!1,ao=null,so=!1,lo=Error(a(519));function co(e){throw fo(Sr(Error(a(418,"")),e)),lo}function uo(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ze]=e,t[Re]=r,n){case"dialog":$c("cancel",t),$c("close",t);break;case"iframe":case"object":case"embed":$c("load",t);break;case"video":case"audio":for(n=0;n<Tc.length;n++)$c(Tc[n],t);break;case"source":$c("error",t);break;case"img":case"image":case"link":$c("error",t),$c("load",t);break;case"details":$c("toggle",t);break;case"input":$c("invalid",t),xt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),ut(t);break;case"select":$c("invalid",t);break;case"textarea":$c("invalid",t),wt(t,r.value,r.defaultValue,r.children),ut(t)}"string"!==typeof(n=r.children)&&"number"!==typeof n&&"bigint"!==typeof n||t.textContent===""+n||!0===r.suppressHydrationWarning||Kc(t.textContent,n)?(null!=r.popover&&($c("beforetoggle",t),$c("toggle",t)),null!=r.onScroll&&$c("scroll",t),null!=r.onScrollEnd&&$c("scrollend",t),null!=r.onClick&&(t.onclick=Jc),t=!0):t=!1,t||co(e)}function po(e){for(ro=e.return;ro;)switch(ro.tag){case 5:case 13:return void(so=!1);case 27:case 3:return void(so=!0);default:ro=ro.return}}function ho(e){if(e!==ro)return!1;if(!io)return po(e),io=!0,!1;var t,n=e.tag;if((t=3!==n&&27!==n)&&((t=5===n)&&(t=!("form"!==(t=e.type)&&"button"!==t)||au(e.type,e.memoizedProps)),t=!t),t&&oo&&co(e),po(e),13===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(a(317));e:{for(e=e.nextSibling,n=0;e;){if(8===e.nodeType)if("/$"===(t=e.data)){if(0===n){oo=xu(e.nextSibling);break e}n--}else"$"!==t&&"$!"!==t&&"$?"!==t||n++;e=e.nextSibling}oo=null}}else 27===n?(n=oo,hu(e.type)?(e=yu,yu=null,oo=e):oo=n):oo=ro?xu(e.stateNode.nextSibling):null;return!0}function mo(){oo=ro=null,io=!1}function go(){var e=ao;return null!==e&&(null===bd?bd=e:bd.push.apply(bd,e),ao=null),e}function fo(e){null===ao?ao=[e]:ao.push(e)}var xo=D(null),yo=null,bo=null;function vo(e,t,n){L(xo,t._currentValue),t._currentValue=n}function wo(e){e._currentValue=xo.current,N(xo)}function jo(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function ko(e,t,n,r){var o=e.child;for(null!==o&&(o.return=e);null!==o;){var i=o.dependencies;if(null!==i){var s=o.child;i=i.firstContext;e:for(;null!==i;){var l=i;i=o;for(var d=0;d<t.length;d++)if(l.context===t[d]){i.lanes|=n,null!==(l=i.alternate)&&(l.lanes|=n),jo(i.return,n,e),r||(s=null);break e}i=l.next}}else if(18===o.tag){if(null===(s=o.return))throw Error(a(341));s.lanes|=n,null!==(i=s.alternate)&&(i.lanes|=n),jo(s,n,e),s=null}else s=o.child;if(null!==s)s.return=o;else for(s=o;null!==s;){if(s===e){s=null;break}if(null!==(o=s.sibling)){o.return=s.return,s=o;break}s=s.return}o=s}}function So(e,t,n,r){e=null;for(var o=t,i=!1;null!==o;){if(!i)if(0!==(524288&o.flags))i=!0;else if(0!==(262144&o.flags))break;if(10===o.tag){var s=o.alternate;if(null===s)throw Error(a(387));if(null!==(s=s.memoizedProps)){var l=o.type;Qn(o.pendingProps.value,s.value)||(null!==e?e.push(l):e=[l])}}else if(o===U.current){if(null===(s=o.alternate))throw Error(a(387));s.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(null!==e?e.push(Vu):e=[Vu])}o=o.return}null!==e&&ko(t,e,n,r),t.flags|=262144}function Ao(e){for(e=e.firstContext;null!==e;){if(!Qn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Co(e){yo=e,bo=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Fo(e){return Eo(yo,e)}function _o(e,t){return null===yo&&Co(e),Eo(e,t)}function Eo(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},null===bo){if(null===e)throw Error(a(308));bo=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else bo=bo.next=t;return n}var Po="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Bo=r.unstable_scheduleCallback,zo=r.unstable_NormalPriority,Ro={$$typeof:w,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function To(){return{controller:new Po,data:new Map,refCount:0}}function Oo(e){e.refCount--,0===e.refCount&&Bo(zo,function(){e.controller.abort()})}var Io=null,$o=0,Mo=0,Do=null;function No(){if(0===--$o&&null!==Io){null!==Do&&(Do.status="fulfilled");var e=Io;Io=null,Mo=0,Do=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Lo=T.S;T.S=function(e,t){"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Io){var n=Io=[];$o=0,Mo=Ec(),Do={status:"pending",value:void 0,then:function(e){n.push(e)}}}$o++,t.then(No,No)}(0,t),null!==Lo&&Lo(e,t)};var qo=D(null);function Ho(){var e=qo.current;return null!==e?e:rd.pooledCache}function Wo(e,t){L(qo,null===t?qo.current:t.pool)}function Uo(){var e=Ho();return null===e?null:{parent:Ro._currentValue,pool:e}}var Go=Error(a(460)),Yo=Error(a(474)),Vo=Error(a(542)),Qo={then:function(){}};function Ko(e){return"fulfilled"===(e=e.status)||"rejected"===e}function Jo(){}function Xo(e,t,n){switch(void 0===(n=e[n])?e.push(t):n!==t&&(t.then(Jo,Jo),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw ti(e=t.reason),e;default:if("string"===typeof t.status)t.then(Jo,Jo);else{if(null!==(e=rd)&&100<e.shellSuspendCounter)throw Error(a(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var n=t;n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw ti(e=t.reason),e}throw Zo=t,Go}}var Zo=null;function ei(){if(null===Zo)throw Error(a(459));var e=Zo;return Zo=null,e}function ti(e){if(e===Go||e===Vo)throw Error(a(483))}var ni=!1;function ri(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function oi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ii(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ai(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&nd)){var o=r.pending;return null===o?t.next=t:(t.next=o.next,o.next=t),r.pending=t,t=Rr(e),zr(e,null,n),t}return Er(e,r,t,n),Rr(e)}function si(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Fe(e,n)}}function li(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var o=null,i=null;if(null!==(n=n.firstBaseUpdate)){do{var a={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};null===i?o=i=a:i=i.next=a,n=n.next}while(null!==n);null===i?o=i=t:i=i.next=t}else o=i=t;return n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,callbacks:r.callbacks},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var di=!1;function ci(){if(di){if(null!==Do)throw Do}}function ui(e,t,n,r){di=!1;var o=e.updateQueue;ni=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,s=o.shared.pending;if(null!==s){o.shared.pending=null;var l=s,d=l.next;l.next=null,null===a?i=d:a.next=d,a=l;var c=e.alternate;null!==c&&((s=(c=c.updateQueue).lastBaseUpdate)!==a&&(null===s?c.firstBaseUpdate=d:s.next=d,c.lastBaseUpdate=l))}if(null!==i){var u=o.baseState;for(a=0,c=d=l=null,s=i;;){var h=-536870913&s.lane,m=h!==s.lane;if(m?(id&h)===h:(r&h)===h){0!==h&&h===Mo&&(di=!0),null!==c&&(c=c.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var g=e,f=s;h=t;var x=n;switch(f.tag){case 1:if("function"===typeof(g=f.payload)){u=g.call(x,u,h);break e}u=g;break e;case 3:g.flags=-65537&g.flags|128;case 0:if(null===(h="function"===typeof(g=f.payload)?g.call(x,u,h):g)||void 0===h)break e;u=p({},u,h);break e;case 2:ni=!0}}null!==(h=s.callback)&&(e.flags|=64,m&&(e.flags|=8192),null===(m=o.callbacks)?o.callbacks=[h]:m.push(h))}else m={lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===c?(d=c=m,l=u):c=c.next=m,a|=h;if(null===(s=s.next)){if(null===(s=o.shared.pending))break;s=(m=s).next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}null===c&&(l=u),o.baseState=l,o.firstBaseUpdate=d,o.lastBaseUpdate=c,null===i&&(o.shared.lanes=0),hd|=a,e.lanes=a,e.memoizedState=u}}function pi(e,t){if("function"!==typeof e)throw Error(a(191,e));e.call(t)}function hi(e,t){var n=e.callbacks;if(null!==n)for(e.callbacks=null,e=0;e<n.length;e++)pi(n[e],t)}var mi=D(null),gi=D(0);function fi(e,t){L(gi,e=ud),L(mi,t),ud=e|t.baseLanes}function xi(){L(gi,ud),L(mi,mi.current)}function yi(){ud=gi.current,N(mi),N(gi)}var bi=0,vi=null,wi=null,ji=null,ki=!1,Si=!1,Ai=!1,Ci=0,Fi=0,_i=null,Ei=0;function Pi(){throw Error(a(321))}function Bi(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Qn(e[n],t[n]))return!1;return!0}function zi(e,t,n,r,o,i){return bi=i,vi=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=null===e||null===e.memoizedState?Ga:Ya,Ai=!1,i=n(r,o),Ai=!1,Si&&(i=Ti(t,n,r,o)),Ri(e),i}function Ri(e){T.H=Ua;var t=null!==wi&&null!==wi.next;if(bi=0,ji=wi=vi=null,ki=!1,Fi=0,_i=null,t)throw Error(a(300));null===e||Fs||null!==(e=e.dependencies)&&Ao(e)&&(Fs=!0)}function Ti(e,t,n,r){vi=e;var o=0;do{if(Si&&(_i=null),Fi=0,Si=!1,25<=o)throw Error(a(301));if(o+=1,ji=wi=null,null!=e.updateQueue){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}T.H=Va,i=t(n,r)}while(Si);return i}function Oi(){var e=T.H,t=e.useState()[0];return t="function"===typeof t.then?Li(t):t,e=e.useState()[0],(null!==wi?wi.memoizedState:null)!==e&&(vi.flags|=1024),t}function Ii(){var e=0!==Ci;return Ci=0,e}function $i(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Mi(e){if(ki){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}ki=!1}bi=0,ji=wi=vi=null,Si=!1,Fi=Ci=0,_i=null}function Di(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ji?vi.memoizedState=ji=e:ji=ji.next=e,ji}function Ni(){if(null===wi){var e=vi.alternate;e=null!==e?e.memoizedState:null}else e=wi.next;var t=null===ji?vi.memoizedState:ji.next;if(null!==t)ji=t,wi=e;else{if(null===e){if(null===vi.alternate)throw Error(a(467));throw Error(a(310))}e={memoizedState:(wi=e).memoizedState,baseState:wi.baseState,baseQueue:wi.baseQueue,queue:wi.queue,next:null},null===ji?vi.memoizedState=ji=e:ji=ji.next=e}return ji}function Li(e){var t=Fi;return Fi+=1,null===_i&&(_i=[]),e=Xo(_i,e,t),t=vi,null===(null===ji?t.memoizedState:ji.next)&&(t=t.alternate,T.H=null===t||null===t.memoizedState?Ga:Ya),e}function qi(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return Li(e);if(e.$$typeof===w)return Fo(e)}throw Error(a(438,String(e)))}function Hi(e){var t=null,n=vi.updateQueue;if(null!==n&&(t=n.memoCache),null==t){var r=vi.alternate;null!==r&&(null!==(r=r.updateQueue)&&(null!=(r=r.memoCache)&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===n&&(n={lastEffect:null,events:null,stores:null,memoCache:null},vi.updateQueue=n),n.memoCache=t,void 0===(n=t.data[t.index]))for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=_;return t.index++,n}function Wi(e,t){return"function"===typeof t?t(e):t}function Ui(e){return Gi(Ni(),wi,e)}function Gi(e,t,n){var r=e.queue;if(null===r)throw Error(a(311));r.lastRenderedReducer=n;var o=e.baseQueue,i=r.pending;if(null!==i){if(null!==o){var s=o.next;o.next=i.next,i.next=s}t.baseQueue=o=i,r.pending=null}if(i=e.baseState,null===o)e.memoizedState=i;else{var l=s=null,d=null,c=t=o.next,u=!1;do{var p=-536870913&c.lane;if(p!==c.lane?(id&p)===p:(bi&p)===p){var h=c.revertLane;if(0===h)null!==d&&(d=d.next={lane:0,revertLane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===Mo&&(u=!0);else{if((bi&h)===h){c=c.next,h===Mo&&(u=!0);continue}p={lane:0,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===d?(l=d=p,s=i):d=d.next=p,vi.lanes|=h,hd|=h}p=c.action,Ai&&n(i,p),i=c.hasEagerState?c.eagerState:n(i,p)}else h={lane:p,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===d?(l=d=h,s=i):d=d.next=h,vi.lanes|=p,hd|=p;c=c.next}while(null!==c&&c!==t);if(null===d?s=i:d.next=l,!Qn(i,e.memoizedState)&&(Fs=!0,u&&null!==(n=Do)))throw n;e.memoizedState=i,e.baseState=s,e.baseQueue=d,r.lastRenderedState=i}return null===o&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Yi(e){var t=Ni(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(null!==o){n.pending=null;var s=o=o.next;do{i=e(i,s.action),s=s.next}while(s!==o);Qn(i,t.memoizedState)||(Fs=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Vi(e,t,n){var r=vi,o=Ni(),i=io;if(i){if(void 0===n)throw Error(a(407));n=n()}else n=t();var s=!Qn((wi||o).memoizedState,n);if(s&&(o.memoizedState=n,Fs=!0),o=o.queue,xa(2048,8,Ji.bind(null,r,o,e),[e]),o.getSnapshot!==t||s||null!==ji&&1&ji.memoizedState.tag){if(r.flags|=2048,ma(9,{destroy:void 0,resource:void 0},Ki.bind(null,r,o,n,t),null),null===rd)throw Error(a(349));i||0!==(124&bi)||Qi(r,t,n)}return n}function Qi(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=vi.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},vi.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Ki(e,t,n,r){t.value=n,t.getSnapshot=r,Xi(t)&&Zi(e)}function Ji(e,t,n){return n(function(){Xi(t)&&Zi(e)})}function Xi(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Qn(e,n)}catch(r){return!0}}function Zi(e){var t=Br(e,2);null!==t&&Id(t,e,2)}function ea(e){var t=Di();if("function"===typeof e){var n=e;if(e=n(),Ai){pe(!0);try{n()}finally{pe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:e},t}function ta(e,t,n,r){return e.baseState=n,Gi(e,wi,"function"===typeof r?r:Wi)}function na(e,t,n,r,o){if(qa(e))throw Error(a(485));if(null!==(e=t.action)){var i={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}};null!==T.T?n(!0):i.isTransition=!1,r(i),null===(n=t.pending)?(i.next=t.pending=i,ra(t,i)):(i.next=n.next,t.pending=n.next=i)}}function ra(e,t){var n=t.action,r=t.payload,o=e.state;if(t.isTransition){var i=T.T,a={};T.T=a;try{var s=n(o,r),l=T.S;null!==l&&l(a,s),oa(e,t,s)}catch(d){aa(e,t,d)}finally{T.T=i}}else try{oa(e,t,i=n(o,r))}catch(c){aa(e,t,c)}}function oa(e,t,n){null!==n&&"object"===typeof n&&"function"===typeof n.then?n.then(function(n){ia(e,t,n)},function(n){return aa(e,t,n)}):ia(e,t,n)}function ia(e,t,n){t.status="fulfilled",t.value=n,sa(t),e.state=n,null!==(t=e.pending)&&((n=t.next)===t?e.pending=null:(n=n.next,t.next=n,ra(e,n)))}function aa(e,t,n){var r=e.pending;if(e.pending=null,null!==r){r=r.next;do{t.status="rejected",t.reason=n,sa(t),t=t.next}while(t!==r)}e.action=null}function sa(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function la(e,t){return t}function da(e,t){if(io){var n=rd.formState;if(null!==n){e:{var r=vi;if(io){if(oo){t:{for(var o=oo,i=so;8!==o.nodeType;){if(!i){o=null;break t}if(null===(o=xu(o.nextSibling))){o=null;break t}}o="F!"===(i=o.data)||"F"===i?o:null}if(o){oo=xu(o.nextSibling),r="F!"===o.data;break e}}co(r)}r=!1}r&&(t=n[0])}}return(n=Di()).memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:t},n.queue=r,n=Da.bind(null,vi,r),r.dispatch=n,r=ea(!1),i=La.bind(null,vi,!1,r.queue),o={state:t,dispatch:null,action:e,pending:null},(r=Di()).queue=o,n=na.bind(null,vi,o,i,n),o.dispatch=n,r.memoizedState=e,[t,n,!1]}function ca(e){return ua(Ni(),wi,e)}function ua(e,t,n){if(t=Gi(e,t,la)[0],e=Ui(Wi)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var r=Li(t)}catch(a){if(a===Go)throw Vo;throw a}else r=t;var o=(t=Ni()).queue,i=o.dispatch;return n!==t.memoizedState&&(vi.flags|=2048,ma(9,{destroy:void 0,resource:void 0},pa.bind(null,o,n),null)),[r,i,e]}function pa(e,t){e.action=t}function ha(e){var t=Ni(),n=wi;if(null!==n)return ua(t,n,e);Ni(),t=t.memoizedState;var r=(n=Ni()).queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ma(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},null===(t=vi.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},vi.updateQueue=t),null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ga(){return Ni().memoizedState}function fa(e,t,n,r){var o=Di();r=void 0===r?null:r,vi.flags|=e,o.memoizedState=ma(1|t,{destroy:void 0,resource:void 0},n,r)}function xa(e,t,n,r){var o=Ni();r=void 0===r?null:r;var i=o.memoizedState.inst;null!==wi&&null!==r&&Bi(r,wi.memoizedState.deps)?o.memoizedState=ma(t,i,n,r):(vi.flags|=e,o.memoizedState=ma(1|t,i,n,r))}function ya(e,t){fa(8390656,8,e,t)}function ba(e,t){xa(2048,8,e,t)}function va(e,t){return xa(4,2,e,t)}function wa(e,t){return xa(4,4,e,t)}function ja(e,t){if("function"===typeof t){e=e();var n=t(e);return function(){"function"===typeof n?n():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function ka(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,xa(4,4,ja.bind(null,t,e),n)}function Sa(){}function Aa(e,t){var n=Ni();t=void 0===t?null:t;var r=n.memoizedState;return null!==t&&Bi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ca(e,t){var n=Ni();t=void 0===t?null:t;var r=n.memoizedState;if(null!==t&&Bi(t,r[1]))return r[0];if(r=e(),Ai){pe(!0);try{e()}finally{pe(!1)}}return n.memoizedState=[r,t],r}function Fa(e,t,n){return void 0===n||0!==(1073741824&bi)?e.memoizedState=t:(e.memoizedState=n,e=Od(),vi.lanes|=e,hd|=e,n)}function _a(e,t,n,r){return Qn(n,t)?n:null!==mi.current?(e=Fa(e,n,r),Qn(e,t)||(Fs=!0),e):0===(42&bi)?(Fs=!0,e.memoizedState=n):(e=Od(),vi.lanes|=e,hd|=e,t)}function Ea(e,t,n,r,o){var i=O.p;O.p=0!==i&&8>i?i:8;var a=T.T,s={};T.T=s,La(e,!1,t,n);try{var l=o(),d=T.S;if(null!==d&&d(s,l),null!==l&&"object"===typeof l&&"function"===typeof l.then)Na(e,t,function(e,t){var n=[],r={status:"pending",value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status="rejected",r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}(l,r),Td());else Na(e,t,r,Td())}catch(c){Na(e,t,{then:function(){},status:"rejected",reason:c},Td())}finally{O.p=i,T.T=a}}function Pa(){}function Ba(e,t,n,r){if(5!==e.tag)throw Error(a(476));var o=za(e).queue;Ea(e,o,t,I,null===n?Pa:function(){return Ra(e),n(r)})}function za(e){var t=e.memoizedState;if(null!==t)return t;var n={};return(t={memoizedState:I,baseState:I,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:I},next:null}).next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:n},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function Ra(e){Na(e,za(e).next.queue,{},Td())}function Ta(){return Fo(Vu)}function Oa(){return Ni().memoizedState}function Ia(){return Ni().memoizedState}function $a(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var n=Td(),r=ai(t,e=ii(n),n);return null!==r&&(Id(r,t,n),si(r,t,n)),t={cache:To()},void(e.payload=t)}t=t.return}}function Ma(e,t,n){var r=Td();n={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},qa(e)?Ha(t,n):null!==(n=Pr(e,t,n,r))&&(Id(n,e,r),Wa(n,t,r))}function Da(e,t,n){Na(e,t,n,Td())}function Na(e,t,n,r){var o={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(qa(e))Ha(t,o);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var a=t.lastRenderedState,s=i(a,n);if(o.hasEagerState=!0,o.eagerState=s,Qn(s,a))return Er(e,t,o,0),null===rd&&_r(),!1}catch(l){}if(null!==(n=Pr(e,t,o,r)))return Id(n,e,r),Wa(n,t,r),!0}return!1}function La(e,t,n,r){if(r={lane:2,revertLane:Ec(),action:r,hasEagerState:!1,eagerState:null,next:null},qa(e)){if(t)throw Error(a(479))}else null!==(t=Pr(e,n,r,2))&&Id(t,e,2)}function qa(e){var t=e.alternate;return e===vi||null!==t&&t===vi}function Ha(e,t){Si=ki=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Wa(e,t,n){if(0!==(4194048&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Fe(e,n)}}var Ua={readContext:Fo,use:qi,useCallback:Pi,useContext:Pi,useEffect:Pi,useImperativeHandle:Pi,useLayoutEffect:Pi,useInsertionEffect:Pi,useMemo:Pi,useReducer:Pi,useRef:Pi,useState:Pi,useDebugValue:Pi,useDeferredValue:Pi,useTransition:Pi,useSyncExternalStore:Pi,useId:Pi,useHostTransitionStatus:Pi,useFormState:Pi,useActionState:Pi,useOptimistic:Pi,useMemoCache:Pi,useCacheRefresh:Pi},Ga={readContext:Fo,use:qi,useCallback:function(e,t){return Di().memoizedState=[e,void 0===t?null:t],e},useContext:Fo,useEffect:ya,useImperativeHandle:function(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,fa(4194308,4,ja.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fa(4194308,4,e,t)},useInsertionEffect:function(e,t){fa(4,2,e,t)},useMemo:function(e,t){var n=Di();t=void 0===t?null:t;var r=e();if(Ai){pe(!0);try{e()}finally{pe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Di();if(void 0!==n){var o=n(t);if(Ai){pe(!0);try{n(t)}finally{pe(!1)}}}else o=t;return r.memoizedState=r.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},r.queue=e,e=e.dispatch=Ma.bind(null,vi,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},Di().memoizedState=e},useState:function(e){var t=(e=ea(e)).queue,n=Da.bind(null,vi,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Sa,useDeferredValue:function(e,t){return Fa(Di(),e,t)},useTransition:function(){var e=ea(!1);return e=Ea.bind(null,vi,e.queue,!0,!1),Di().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=vi,o=Di();if(io){if(void 0===n)throw Error(a(407));n=n()}else{if(n=t(),null===rd)throw Error(a(349));0!==(124&id)||Qi(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,ya(Ji.bind(null,r,i,e),[e]),r.flags|=2048,ma(9,{destroy:void 0,resource:void 0},Ki.bind(null,r,i,n,t),null),n},useId:function(){var e=Di(),t=rd.identifierPrefix;if(io){var n=Xr;t="\xab"+t+"R"+(n=(Jr&~(1<<32-he(Jr)-1)).toString(32)+n),0<(n=Ci++)&&(t+="H"+n.toString(32)),t+="\xbb"}else t="\xab"+t+"r"+(n=Ei++).toString(32)+"\xbb";return e.memoizedState=t},useHostTransitionStatus:Ta,useFormState:da,useActionState:da,useOptimistic:function(e){var t=Di();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=La.bind(null,vi,!0,n),n.dispatch=t,[e,t]},useMemoCache:Hi,useCacheRefresh:function(){return Di().memoizedState=$a.bind(null,vi)}},Ya={readContext:Fo,use:qi,useCallback:Aa,useContext:Fo,useEffect:ba,useImperativeHandle:ka,useInsertionEffect:va,useLayoutEffect:wa,useMemo:Ca,useReducer:Ui,useRef:ga,useState:function(){return Ui(Wi)},useDebugValue:Sa,useDeferredValue:function(e,t){return _a(Ni(),wi.memoizedState,e,t)},useTransition:function(){var e=Ui(Wi)[0],t=Ni().memoizedState;return["boolean"===typeof e?e:Li(e),t]},useSyncExternalStore:Vi,useId:Oa,useHostTransitionStatus:Ta,useFormState:ca,useActionState:ca,useOptimistic:function(e,t){return ta(Ni(),0,e,t)},useMemoCache:Hi,useCacheRefresh:Ia},Va={readContext:Fo,use:qi,useCallback:Aa,useContext:Fo,useEffect:ba,useImperativeHandle:ka,useInsertionEffect:va,useLayoutEffect:wa,useMemo:Ca,useReducer:Yi,useRef:ga,useState:function(){return Yi(Wi)},useDebugValue:Sa,useDeferredValue:function(e,t){var n=Ni();return null===wi?Fa(n,e,t):_a(n,wi.memoizedState,e,t)},useTransition:function(){var e=Yi(Wi)[0],t=Ni().memoizedState;return["boolean"===typeof e?e:Li(e),t]},useSyncExternalStore:Vi,useId:Oa,useHostTransitionStatus:Ta,useFormState:ha,useActionState:ha,useOptimistic:function(e,t){var n=Ni();return null!==wi?ta(n,0,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Hi,useCacheRefresh:Ia},Qa=null,Ka=0;function Ja(e){var t=Ka;return Ka+=1,null===Qa&&(Qa=[]),Xo(Qa,e,t)}function Xa(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function Za(e,t){if(t.$$typeof===h)throw Error(a(525));throw e=Object.prototype.toString.call(t),Error(a(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function es(e){return(0,e._init)(e._payload)}function ts(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function o(e,t){return(e=Mr(e,t)).index=0,e.sibling=null,e}function i(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=67108866,n):r:(t.flags|=67108866,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=qr(n,e.mode,r)).return=e,t):((t=o(t,n)).return=e,t)}function d(e,t,n,r){var i=n.type;return i===f?u(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===C&&es(i)===t.type)?(Xa(t=o(t,n.props),n),t.return=e,t):(Xa(t=Nr(n.type,n.key,n.props,null,e.mode,r),n),t.return=e,t)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Hr(n,e.mode,r)).return=e,t):((t=o(t,n.children||[])).return=e,t)}function u(e,t,n,r,i){return null===t||7!==t.tag?((t=Lr(n,e.mode,r,i)).return=e,t):((t=o(t,n)).return=e,t)}function p(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=qr(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case m:return Xa(n=Nr(t.type,t.key,t.props,null,e.mode,n),t),n.return=e,n;case g:return(t=Hr(t,e.mode,n)).return=e,t;case C:return p(e,t=(0,t._init)(t._payload),n)}if(R(t)||P(t))return(t=Lr(t,e.mode,n,null)).return=e,t;if("function"===typeof t.then)return p(e,Ja(t),n);if(t.$$typeof===w)return p(e,_o(e,t),n);Za(e,t)}return null}function h(e,t,n,r){var o=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return null!==o?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case m:return n.key===o?d(e,t,n,r):null;case g:return n.key===o?c(e,t,n,r):null;case C:return h(e,t,n=(o=n._init)(n._payload),r)}if(R(n)||P(n))return null!==o?null:u(e,t,n,r,null);if("function"===typeof n.then)return h(e,t,Ja(n),r);if(n.$$typeof===w)return h(e,t,_o(e,n),r);Za(e,n)}return null}function x(e,t,n,r,o){if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return l(t,e=e.get(n)||null,""+r,o);if("object"===typeof r&&null!==r){switch(r.$$typeof){case m:return d(t,e=e.get(null===r.key?n:r.key)||null,r,o);case g:return c(t,e=e.get(null===r.key?n:r.key)||null,r,o);case C:return x(e,t,n,r=(0,r._init)(r._payload),o)}if(R(r)||P(r))return u(t,e=e.get(n)||null,r,o,null);if("function"===typeof r.then)return x(e,t,n,Ja(r),o);if(r.$$typeof===w)return x(e,t,n,_o(t,r),o);Za(t,r)}return null}function y(l,d,c,u){if("object"===typeof c&&null!==c&&c.type===f&&null===c.key&&(c=c.props.children),"object"===typeof c&&null!==c){switch(c.$$typeof){case m:e:{for(var b=c.key;null!==d;){if(d.key===b){if((b=c.type)===f){if(7===d.tag){n(l,d.sibling),(u=o(d,c.props.children)).return=l,l=u;break e}}else if(d.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===C&&es(b)===d.type){n(l,d.sibling),Xa(u=o(d,c.props),c),u.return=l,l=u;break e}n(l,d);break}t(l,d),d=d.sibling}c.type===f?((u=Lr(c.props.children,l.mode,u,c.key)).return=l,l=u):(Xa(u=Nr(c.type,c.key,c.props,null,l.mode,u),c),u.return=l,l=u)}return s(l);case g:e:{for(b=c.key;null!==d;){if(d.key===b){if(4===d.tag&&d.stateNode.containerInfo===c.containerInfo&&d.stateNode.implementation===c.implementation){n(l,d.sibling),(u=o(d,c.children||[])).return=l,l=u;break e}n(l,d);break}t(l,d),d=d.sibling}(u=Hr(c,l.mode,u)).return=l,l=u}return s(l);case C:return y(l,d,c=(b=c._init)(c._payload),u)}if(R(c))return function(o,a,s,l){for(var d=null,c=null,u=a,m=a=0,g=null;null!==u&&m<s.length;m++){u.index>m?(g=u,u=null):g=u.sibling;var f=h(o,u,s[m],l);if(null===f){null===u&&(u=g);break}e&&u&&null===f.alternate&&t(o,u),a=i(f,a,m),null===c?d=f:c.sibling=f,c=f,u=g}if(m===s.length)return n(o,u),io&&Zr(o,m),d;if(null===u){for(;m<s.length;m++)null!==(u=p(o,s[m],l))&&(a=i(u,a,m),null===c?d=u:c.sibling=u,c=u);return io&&Zr(o,m),d}for(u=r(u);m<s.length;m++)null!==(g=x(u,o,m,s[m],l))&&(e&&null!==g.alternate&&u.delete(null===g.key?m:g.key),a=i(g,a,m),null===c?d=g:c.sibling=g,c=g);return e&&u.forEach(function(e){return t(o,e)}),io&&Zr(o,m),d}(l,d,c,u);if(P(c)){if("function"!==typeof(b=P(c)))throw Error(a(150));return function(o,s,l,d){if(null==l)throw Error(a(151));for(var c=null,u=null,m=s,g=s=0,f=null,y=l.next();null!==m&&!y.done;g++,y=l.next()){m.index>g?(f=m,m=null):f=m.sibling;var b=h(o,m,y.value,d);if(null===b){null===m&&(m=f);break}e&&m&&null===b.alternate&&t(o,m),s=i(b,s,g),null===u?c=b:u.sibling=b,u=b,m=f}if(y.done)return n(o,m),io&&Zr(o,g),c;if(null===m){for(;!y.done;g++,y=l.next())null!==(y=p(o,y.value,d))&&(s=i(y,s,g),null===u?c=y:u.sibling=y,u=y);return io&&Zr(o,g),c}for(m=r(m);!y.done;g++,y=l.next())null!==(y=x(m,o,g,y.value,d))&&(e&&null!==y.alternate&&m.delete(null===y.key?g:y.key),s=i(y,s,g),null===u?c=y:u.sibling=y,u=y);return e&&m.forEach(function(e){return t(o,e)}),io&&Zr(o,g),c}(l,d,c=b.call(c),u)}if("function"===typeof c.then)return y(l,d,Ja(c),u);if(c.$$typeof===w)return y(l,d,_o(l,c),u);Za(l,c)}return"string"===typeof c&&""!==c||"number"===typeof c||"bigint"===typeof c?(c=""+c,null!==d&&6===d.tag?(n(l,d.sibling),(u=o(d,c)).return=l,l=u):(n(l,d),(u=qr(c,l.mode,u)).return=l,l=u),s(l)):n(l,d)}return function(e,t,n,r){try{Ka=0;var o=y(e,t,n,r);return Qa=null,o}catch(a){if(a===Go||a===Vo)throw a;var i=Ir(29,a,null,e.mode);return i.lanes=r,i.return=e,i}}}var ns=ts(!0),rs=ts(!1),os=D(null),is=null;function as(e){var t=e.alternate;L(cs,1&cs.current),L(os,e),null===is&&(null===t||null!==mi.current||null!==t.memoizedState)&&(is=e)}function ss(e){if(22===e.tag){if(L(cs,cs.current),L(os,e),null===is){var t=e.alternate;null!==t&&null!==t.memoizedState&&(is=e)}}else ls()}function ls(){L(cs,cs.current),L(os,os.current)}function ds(e){N(os),is===e&&(is=null),N(cs)}var cs=D(0);function us(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||fu(n)))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function ps(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:p({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var hs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Td(),o=ii(r);o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=ai(e,o,r))&&(Id(t,e,r),si(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Td(),o=ii(r);o.tag=1,o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=ai(e,o,r))&&(Id(t,e,r),si(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Td(),r=ii(n);r.tag=2,void 0!==t&&null!==t&&(r.callback=t),null!==(t=ai(e,r,n))&&(Id(t,e,n),si(t,e,n))}};function ms(e,t,n,r,o,i,a){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,i,a):!t.prototype||!t.prototype.isPureReactComponent||(!Kn(n,r)||!Kn(o,i))}function gs(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&hs.enqueueReplaceState(t,t.state,null)}function fs(e,t){var n=t;if("ref"in t)for(var r in n={},t)"ref"!==r&&(n[r]=t[r]);if(e=e.defaultProps)for(var o in n===t&&(n=p({},n)),e)void 0===n[o]&&(n[o]=e[o]);return n}var xs="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)};function ys(e){xs(e)}function bs(e){console.error(e)}function vs(e){xs(e)}function ws(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function js(e,t,n){try{(0,e.onCaughtError)(n.value,{componentStack:n.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function ks(e,t,n){return(n=ii(n)).tag=3,n.payload={element:null},n.callback=function(){ws(e,t)},n}function Ss(e){return(e=ii(e)).tag=3,e}function As(e,t,n,r){var o=n.type.getDerivedStateFromError;if("function"===typeof o){var i=r.value;e.payload=function(){return o(i)},e.callback=function(){js(t,n,r)}}var a=n.stateNode;null!==a&&"function"===typeof a.componentDidCatch&&(e.callback=function(){js(t,n,r),"function"!==typeof o&&(null===Sd?Sd=new Set([this]):Sd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}var Cs=Error(a(461)),Fs=!1;function _s(e,t,n,r){t.child=null===e?rs(t,null,n,r):ns(t,e.child,n,r)}function Es(e,t,n,r,o){n=n.render;var i=t.ref;if("ref"in r){var a={};for(var s in r)"ref"!==s&&(a[s]=r[s])}else a=r;return Co(t),r=zi(e,t,n,a,i,o),s=Ii(),null===e||Fs?(io&&s&&to(t),t.flags|=1,_s(e,t,r,o),t.child):($i(e,t,o),Qs(e,t,o))}function Ps(e,t,n,r,o){if(null===e){var i=n.type;return"function"!==typeof i||$r(i)||void 0!==i.defaultProps||null!==n.compare?((e=Nr(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,Bs(e,t,i,r,o))}if(i=e.child,!Ks(e,o)){var a=i.memoizedProps;if((n=null!==(n=n.compare)?n:Kn)(a,r)&&e.ref===t.ref)return Qs(e,t,o)}return t.flags|=1,(e=Mr(i,r)).ref=t.ref,e.return=t,t.child=e}function Bs(e,t,n,r,o){if(null!==e){var i=e.memoizedProps;if(Kn(i,r)&&e.ref===t.ref){if(Fs=!1,t.pendingProps=r=i,!Ks(e,o))return t.lanes=e.lanes,Qs(e,t,o);0!==(131072&e.flags)&&(Fs=!0)}}return Os(e,t,n,r,o)}function zs(e,t,n){var r=t.pendingProps,o=r.children,i=null!==e?e.memoizedState:null;if("hidden"===r.mode){if(0!==(128&t.flags)){if(r=null!==i?i.baseLanes|n:n,null!==e){for(o=t.child=e.child,i=0;null!==o;)i=i|o.lanes|o.childLanes,o=o.sibling;t.childLanes=i&~r}else t.childLanes=0,t.child=null;return Rs(e,t,r,n)}if(0===(536870912&n))return t.lanes=t.childLanes=536870912,Rs(e,t,null!==i?i.baseLanes|n:n,n);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Wo(0,null!==i?i.cachePool:null),null!==i?fi(t,i):xi(),ss(t)}else null!==i?(Wo(0,i.cachePool),fi(t,i),ls(),t.memoizedState=null):(null!==e&&Wo(0,null),xi(),ls());return _s(e,t,o,n),t.child}function Rs(e,t,n,r){var o=Ho();return o=null===o?null:{parent:Ro._currentValue,pool:o},t.memoizedState={baseLanes:n,cachePool:o},null!==e&&Wo(0,null),xi(),ss(t),null!==e&&So(e,t,r,!0),null}function Ts(e,t){var n=t.ref;if(null===n)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof n&&"object"!==typeof n)throw Error(a(284));null!==e&&e.ref===n||(t.flags|=4194816)}}function Os(e,t,n,r,o){return Co(t),n=zi(e,t,n,r,void 0,o),r=Ii(),null===e||Fs?(io&&r&&to(t),t.flags|=1,_s(e,t,n,o),t.child):($i(e,t,o),Qs(e,t,o))}function Is(e,t,n,r,o,i){return Co(t),t.updateQueue=null,n=Ti(t,r,n,o),Ri(e),r=Ii(),null===e||Fs?(io&&r&&to(t),t.flags|=1,_s(e,t,n,i),t.child):($i(e,t,i),Qs(e,t,i))}function $s(e,t,n,r,o){if(Co(t),null===t.stateNode){var i=Tr,a=n.contextType;"object"===typeof a&&null!==a&&(i=Fo(a)),i=new n(r,i),t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,i.updater=hs,t.stateNode=i,i._reactInternals=t,(i=t.stateNode).props=r,i.state=t.memoizedState,i.refs={},ri(t),a=n.contextType,i.context="object"===typeof a&&null!==a?Fo(a):Tr,i.state=t.memoizedState,"function"===typeof(a=n.getDerivedStateFromProps)&&(ps(t,n,a,r),i.state=t.memoizedState),"function"===typeof n.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(a=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),a!==i.state&&hs.enqueueReplaceState(i,i.state,null),ui(t,r,i,o),ci(),i.state=t.memoizedState),"function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!0}else if(null===e){i=t.stateNode;var s=t.memoizedProps,l=fs(n,s);i.props=l;var d=i.context,c=n.contextType;a=Tr,"object"===typeof c&&null!==c&&(a=Fo(c));var u=n.getDerivedStateFromProps;c="function"===typeof u||"function"===typeof i.getSnapshotBeforeUpdate,s=t.pendingProps!==s,c||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(s||d!==a)&&gs(t,i,r,a),ni=!1;var p=t.memoizedState;i.state=p,ui(t,r,i,o),ci(),d=t.memoizedState,s||p!==d||ni?("function"===typeof u&&(ps(t,n,u,r),d=t.memoizedState),(l=ni||ms(t,n,l,r,p,d,a))?(c||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=d),i.props=r,i.state=d,i.context=a,r=l):("function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,oi(e,t),c=fs(n,a=t.memoizedProps),i.props=c,u=t.pendingProps,p=i.context,d=n.contextType,l=Tr,"object"===typeof d&&null!==d&&(l=Fo(d)),(d="function"===typeof(s=n.getDerivedStateFromProps)||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(a!==u||p!==l)&&gs(t,i,r,l),ni=!1,p=t.memoizedState,i.state=p,ui(t,r,i,o),ci();var h=t.memoizedState;a!==u||p!==h||ni||null!==e&&null!==e.dependencies&&Ao(e.dependencies)?("function"===typeof s&&(ps(t,n,s,r),h=t.memoizedState),(c=ni||ms(t,n,c,r,p,h,l)||null!==e&&null!==e.dependencies&&Ao(e.dependencies))?(d||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(r,h,l),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,h,l)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=h),i.props=r,i.state=h,i.context=l,r=c):("function"!==typeof i.componentDidUpdate||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return i=r,Ts(e,t),r=0!==(128&t.flags),i||r?(i=t.stateNode,n=r&&"function"!==typeof n.getDerivedStateFromError?null:i.render(),t.flags|=1,null!==e&&r?(t.child=ns(t,e.child,null,o),t.child=ns(t,null,n,o)):_s(e,t,n,o),t.memoizedState=i.state,e=t.child):e=Qs(e,t,o),e}function Ms(e,t,n,r){return mo(),t.flags|=256,_s(e,t,n,r),t.child}var Ds={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ns(e){return{baseLanes:e,cachePool:Uo()}}function Ls(e,t,n){return e=null!==e?e.childLanes&~n:0,t&&(e|=fd),e}function qs(e,t,n){var r,o=t.pendingProps,i=!1,s=0!==(128&t.flags);if((r=s)||(r=(null===e||null!==e.memoizedState)&&0!==(2&cs.current)),r&&(i=!0,t.flags&=-129),r=0!==(32&t.flags),t.flags&=-33,null===e){if(io){if(i?as(t):ls(),io){var l,d=oo;if(l=d){e:{for(l=d,d=so;8!==l.nodeType;){if(!d){d=null;break e}if(null===(l=xu(l.nextSibling))){d=null;break e}}d=l}null!==d?(t.memoizedState={dehydrated:d,treeContext:null!==Kr?{id:Jr,overflow:Xr}:null,retryLane:536870912,hydrationErrors:null},(l=Ir(18,null,null,0)).stateNode=d,l.return=t,t.child=l,ro=t,oo=null,l=!0):l=!1}l||co(t)}if(null!==(d=t.memoizedState)&&null!==(d=d.dehydrated))return fu(d)?t.lanes=32:t.lanes=536870912,null;ds(t)}return d=o.children,o=o.fallback,i?(ls(),d=Ws({mode:"hidden",children:d},i=t.mode),o=Lr(o,i,n,null),d.return=t,o.return=t,d.sibling=o,t.child=d,(i=t.child).memoizedState=Ns(n),i.childLanes=Ls(e,r,n),t.memoizedState=Ds,o):(as(t),Hs(t,d))}if(null!==(l=e.memoizedState)&&null!==(d=l.dehydrated)){if(s)256&t.flags?(as(t),t.flags&=-257,t=Us(e,t,n)):null!==t.memoizedState?(ls(),t.child=e.child,t.flags|=128,t=null):(ls(),i=o.fallback,d=t.mode,o=Ws({mode:"visible",children:o.children},d),(i=Lr(i,d,n,null)).flags|=2,o.return=t,i.return=t,o.sibling=i,t.child=o,ns(t,e.child,null,n),(o=t.child).memoizedState=Ns(n),o.childLanes=Ls(e,r,n),t.memoizedState=Ds,t=i);else if(as(t),fu(d)){if(r=d.nextSibling&&d.nextSibling.dataset)var c=r.dgst;r=c,(o=Error(a(419))).stack="",o.digest=r,fo({value:o,source:null,stack:null}),t=Us(e,t,n)}else if(Fs||So(e,t,n,!1),r=0!==(n&e.childLanes),Fs||r){if(null!==(r=rd)&&(0!==(o=0!==((o=0!==(42&(o=n&-n))?1:_e(o))&(r.suspendedLanes|n))?0:o)&&o!==l.retryLane))throw l.retryLane=o,Br(e,o),Id(r,e,o),Cs;"$?"===d.data||Yd(),t=Us(e,t,n)}else"$?"===d.data?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,oo=xu(d.nextSibling),ro=t,io=!0,ao=null,so=!1,null!==e&&(Vr[Qr++]=Jr,Vr[Qr++]=Xr,Vr[Qr++]=Kr,Jr=e.id,Xr=e.overflow,Kr=t),(t=Hs(t,o.children)).flags|=4096);return t}return i?(ls(),i=o.fallback,d=t.mode,c=(l=e.child).sibling,(o=Mr(l,{mode:"hidden",children:o.children})).subtreeFlags=65011712&l.subtreeFlags,null!==c?i=Mr(c,i):(i=Lr(i,d,n,null)).flags|=2,i.return=t,o.return=t,o.sibling=i,t.child=o,o=i,i=t.child,null===(d=e.child.memoizedState)?d=Ns(n):(null!==(l=d.cachePool)?(c=Ro._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=Uo(),d={baseLanes:d.baseLanes|n,cachePool:l}),i.memoizedState=d,i.childLanes=Ls(e,r,n),t.memoizedState=Ds,o):(as(t),e=(n=e.child).sibling,(n=Mr(n,{mode:"visible",children:o.children})).return=t,n.sibling=null,null!==e&&(null===(r=t.deletions)?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Hs(e,t){return(t=Ws({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Ws(e,t){return(e=Ir(22,e,null,t)).lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Us(e,t,n){return ns(t,e.child,null,n),(e=Hs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Gs(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),jo(e.return,t,n)}function Ys(e,t,n,r,o){var i=e.memoizedState;null===i?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function Vs(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(_s(e,t,r.children,n),0!==(2&(r=cs.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Gs(e,n,t);else if(19===e.tag)Gs(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(L(cs,r),o){case"forwards":for(n=t.child,o=null;null!==n;)null!==(e=n.alternate)&&null===us(e)&&(o=n),n=n.sibling;null===(n=o)?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Ys(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;null!==o;){if(null!==(e=o.alternate)&&null===us(e)){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Ys(t,!0,n,null,i);break;case"together":Ys(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Qs(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),hd|=t.lanes,0===(n&t.childLanes)){if(null===e)return null;if(So(e,t,n,!1),0===(n&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(a(153));if(null!==t.child){for(n=Mr(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Mr(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Ks(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Ao(e))}function Js(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps)Fs=!0;else{if(!Ks(e,n)&&0===(128&t.flags))return Fs=!1,function(e,t,n){switch(t.tag){case 3:G(t,t.stateNode.containerInfo),vo(0,Ro,e.memoizedState.cache),mo();break;case 27:case 5:V(t);break;case 4:G(t,t.stateNode.containerInfo);break;case 10:vo(0,t.type,t.memoizedProps.value);break;case 13:var r=t.memoizedState;if(null!==r)return null!==r.dehydrated?(as(t),t.flags|=128,null):0!==(n&t.child.childLanes)?qs(e,t,n):(as(t),null!==(e=Qs(e,t,n))?e.sibling:null);as(t);break;case 19:var o=0!==(128&e.flags);if((r=0!==(n&t.childLanes))||(So(e,t,n,!1),r=0!==(n&t.childLanes)),o){if(r)return Vs(e,t,n);t.flags|=128}if(null!==(o=t.memoizedState)&&(o.rendering=null,o.tail=null,o.lastEffect=null),L(cs,cs.current),r)break;return null;case 22:case 23:return t.lanes=0,zs(e,t,n);case 24:vo(0,Ro,e.memoizedState.cache)}return Qs(e,t,n)}(e,t,n);Fs=0!==(131072&e.flags)}else Fs=!1,io&&0!==(1048576&t.flags)&&eo(t,Yr,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var r=t.elementType,o=r._init;if(r=o(r._payload),t.type=r,"function"!==typeof r){if(void 0!==r&&null!==r){if((o=r.$$typeof)===j){t.tag=11,t=Es(null,t,r,e,n);break e}if(o===A){t.tag=14,t=Ps(null,t,r,e,n);break e}}throw t=z(r)||r,Error(a(306,t,""))}$r(r)?(e=fs(r,e),t.tag=1,t=$s(null,t,r,e,n)):(t.tag=0,t=Os(null,t,r,e,n))}return t;case 0:return Os(e,t,t.type,t.pendingProps,n);case 1:return $s(e,t,r=t.type,o=fs(r,t.pendingProps),n);case 3:e:{if(G(t,t.stateNode.containerInfo),null===e)throw Error(a(387));r=t.pendingProps;var i=t.memoizedState;o=i.element,oi(e,t),ui(t,r,null,n);var s=t.memoizedState;if(r=s.cache,vo(0,Ro,r),r!==i.cache&&ko(t,[Ro],n,!0),ci(),r=s.element,i.isDehydrated){if(i={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=Ms(e,t,r,n);break e}if(r!==o){fo(o=Sr(Error(a(424)),t)),t=Ms(e,t,r,n);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(oo=xu(e.firstChild),ro=t,io=!0,ao=null,so=!0,n=rs(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(mo(),r===o){t=Qs(e,t,n);break e}_s(e,t,r,n)}t=t.child}return t;case 26:return Ts(e,t),null===e?(n=_u(t.type,null,t.pendingProps,null))?t.memoizedState=n:io||(n=t.type,e=t.pendingProps,(r=ru(W.current).createElement(n))[ze]=t,r[Re]=e,eu(r,n,e),Ue(r),t.stateNode=r):t.memoizedState=_u(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return V(t),null===e&&io&&(r=t.stateNode=vu(t.type,t.pendingProps,W.current),ro=t,so=!0,o=oo,hu(t.type)?(yu=o,oo=xu(r.firstChild)):oo=o),_s(e,t,t.pendingProps.children,n),Ts(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&io&&((o=r=oo)&&(null!==(r=function(e,t,n,r){for(;1===e.nodeType;){var o=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[De])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(i=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(i!==o.rel||e.getAttribute("href")!==(null==o.href||""===o.href?null:o.href)||e.getAttribute("crossorigin")!==(null==o.crossOrigin?null:o.crossOrigin)||e.getAttribute("title")!==(null==o.title?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((i=e.getAttribute("src"))!==(null==o.src?null:o.src)||e.getAttribute("type")!==(null==o.type?null:o.type)||e.getAttribute("crossorigin")!==(null==o.crossOrigin?null:o.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var i=null==o.name?null:""+o.name;if("hidden"===o.type&&e.getAttribute("name")===i)return e}if(null===(e=xu(e.nextSibling)))break}return null}(r,t.type,t.pendingProps,so))?(t.stateNode=r,ro=t,oo=xu(r.firstChild),so=!1,o=!0):o=!1),o||co(t)),V(t),o=t.type,i=t.pendingProps,s=null!==e?e.memoizedProps:null,r=i.children,au(o,i)?r=null:null!==s&&au(o,s)&&(t.flags|=32),null!==t.memoizedState&&(o=zi(e,t,Oi,null,null,n),Vu._currentValue=o),Ts(e,t),_s(e,t,r,n),t.child;case 6:return null===e&&io&&((e=n=oo)&&(null!==(n=function(e,t,n){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!n)return null;if(null===(e=xu(e.nextSibling)))return null}return e}(n,t.pendingProps,so))?(t.stateNode=n,ro=t,oo=null,e=!0):e=!1),e||co(t)),null;case 13:return qs(e,t,n);case 4:return G(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=ns(t,null,r,n):_s(e,t,r,n),t.child;case 11:return Es(e,t,t.type,t.pendingProps,n);case 7:return _s(e,t,t.pendingProps,n),t.child;case 8:case 12:return _s(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,vo(0,t.type,r.value),_s(e,t,r.children,n),t.child;case 9:return o=t.type._context,r=t.pendingProps.children,Co(t),r=r(o=Fo(o)),t.flags|=1,_s(e,t,r,n),t.child;case 14:return Ps(e,t,t.type,t.pendingProps,n);case 15:return Bs(e,t,t.type,t.pendingProps,n);case 19:return Vs(e,t,n);case 31:return r=t.pendingProps,n=t.mode,r={mode:r.mode,children:r.children},null===e?((n=Ws(r,n)).ref=t.ref,t.child=n,n.return=t,t=n):((n=Mr(e.child,r)).ref=t.ref,t.child=n,n.return=t,t=n),t;case 22:return zs(e,t,n);case 24:return Co(t),r=Fo(Ro),null===e?(null===(o=Ho())&&(o=rd,i=To(),o.pooledCache=i,i.refCount++,null!==i&&(o.pooledCacheLanes|=n),o=i),t.memoizedState={parent:r,cache:o},ri(t),vo(0,Ro,o)):(0!==(e.lanes&n)&&(oi(e,t),ui(t,null,null,n),ci()),o=e.memoizedState,i=t.memoizedState,o.parent!==r?(o={parent:r,cache:r},t.memoizedState=o,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=o),vo(0,Ro,r)):(r=i.cache,vo(0,Ro,r),r!==o.cache&&ko(t,[Ro],n,!0))),_s(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(a(156,t.tag))}function Xs(e){e.flags|=4}function Zs(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!Lu(t)){if(null!==(t=os.current)&&((4194048&id)===id?null!==is:(62914560&id)!==id&&0===(536870912&id)||t!==is))throw Zo=Qo,Yo;e.flags|=8192}}function el(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?ke():536870912,e.lanes|=t,xd|=t)}function tl(e,t){if(!io)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function nl(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=65011712&o.subtreeFlags,r|=65011712&o.flags,o.return=e,o=o.sibling;else for(o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function rl(e,t,n){var r=t.pendingProps;switch(no(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return nl(t),null;case 3:return n=t.stateNode,r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),wo(Ro),Y(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(ho(t)?Xs(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,go())),nl(t),null;case 26:return n=t.memoizedState,null===e?(Xs(t),null!==n?(nl(t),Zs(t,n)):(nl(t),t.flags&=-16777217)):n?n!==e.memoizedState?(Xs(t),nl(t),Zs(t,n)):(nl(t),t.flags&=-16777217):(e.memoizedProps!==r&&Xs(t),nl(t),t.flags&=-16777217),null;case 27:Q(t),n=W.current;var o=t.type;if(null!==e&&null!=t.stateNode)e.memoizedProps!==r&&Xs(t);else{if(!r){if(null===t.stateNode)throw Error(a(166));return nl(t),null}e=q.current,ho(t)?uo(t):(e=vu(o,r,n),t.stateNode=e,Xs(t))}return nl(t),null;case 5:if(Q(t),n=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&Xs(t);else{if(!r){if(null===t.stateNode)throw Error(a(166));return nl(t),null}if(e=q.current,ho(t))uo(t);else{switch(o=ru(W.current),e){case 1:e=o.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:e=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":e=o.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":e=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":(e=o.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e="string"===typeof r.is?o.createElement("select",{is:r.is}):o.createElement("select"),r.multiple?e.multiple=!0:r.size&&(e.size=r.size);break;default:e="string"===typeof r.is?o.createElement(n,{is:r.is}):o.createElement(n)}}e[ze]=t,e[Re]=r;e:for(o=t.child;null!==o;){if(5===o.tag||6===o.tag)e.appendChild(o.stateNode);else if(4!==o.tag&&27!==o.tag&&null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;null===o.sibling;){if(null===o.return||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=e;e:switch(eu(e,n,r),n){case"button":case"input":case"select":case"textarea":e=!!r.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&Xs(t)}}return nl(t),t.flags&=-16777217,null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==r&&Xs(t);else{if("string"!==typeof r&&null===t.stateNode)throw Error(a(166));if(e=W.current,ho(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,null!==(o=ro))switch(o.tag){case 27:case 5:r=o.memoizedProps}e[ze]=t,(e=!!(e.nodeValue===n||null!==r&&!0===r.suppressHydrationWarning||Kc(e.nodeValue,n)))||co(t)}else(e=ru(e).createTextNode(r))[ze]=t,t.stateNode=e}return nl(t),null;case 13:if(r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(o=ho(t),null!==r&&null!==r.dehydrated){if(null===e){if(!o)throw Error(a(318));if(!(o=null!==(o=t.memoizedState)?o.dehydrated:null))throw Error(a(317));o[ze]=t}else mo(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;nl(t),o=!1}else o=go(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return 256&t.flags?(ds(t),t):(ds(t),null)}if(ds(t),0!==(128&t.flags))return t.lanes=n,t;if(n=null!==r,e=null!==e&&null!==e.memoizedState,n){o=null,null!==(r=t.child).alternate&&null!==r.alternate.memoizedState&&null!==r.alternate.memoizedState.cachePool&&(o=r.alternate.memoizedState.cachePool.pool);var i=null;null!==r.memoizedState&&null!==r.memoizedState.cachePool&&(i=r.memoizedState.cachePool.pool),i!==o&&(r.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),el(t,t.updateQueue),nl(t),null;case 4:return Y(),null===e&&Nc(t.stateNode.containerInfo),nl(t),null;case 10:return wo(t.type),nl(t),null;case 19:if(N(cs),null===(o=t.memoizedState))return nl(t),null;if(r=0!==(128&t.flags),null===(i=o.rendering))if(r)tl(o,!1);else{if(0!==pd||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(i=us(e))){for(t.flags|=128,tl(o,!1),e=i.updateQueue,t.updateQueue=e,el(t,e),t.subtreeFlags=0,e=n,n=t.child;null!==n;)Dr(n,e),n=n.sibling;return L(cs,1&cs.current|2),t.child}e=e.sibling}null!==o.tail&&te()>jd&&(t.flags|=128,r=!0,tl(o,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=us(i))){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,el(t,e),tl(o,!0),null===o.tail&&"hidden"===o.tailMode&&!i.alternate&&!io)return nl(t),null}else 2*te()-o.renderingStartTime>jd&&536870912!==n&&(t.flags|=128,r=!0,tl(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(null!==(e=o.last)?e.sibling=i:t.child=i,o.last=i)}return null!==o.tail?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=te(),t.sibling=null,e=cs.current,L(cs,r?1&e|2:1&e),t):(nl(t),null);case 22:case 23:return ds(t),yi(),r=null!==t.memoizedState,null!==e?null!==e.memoizedState!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?0!==(536870912&n)&&0===(128&t.flags)&&(nl(t),6&t.subtreeFlags&&(t.flags|=8192)):nl(t),null!==(n=t.updateQueue)&&el(t,n.retryQueue),n=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),r=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),null!==e&&N(qo),null;case 24:return n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),wo(Ro),nl(t),null;case 25:case 30:return null}throw Error(a(156,t.tag))}function ol(e,t){switch(no(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return wo(Ro),Y(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return Q(t),null;case 13:if(ds(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(a(340));mo()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return N(cs),null;case 4:return Y(),null;case 10:return wo(t.type),null;case 22:case 23:return ds(t),yi(),null!==e&&N(qo),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return wo(Ro),null;default:return null}}function il(e,t){switch(no(t),t.tag){case 3:wo(Ro),Y();break;case 26:case 27:case 5:Q(t);break;case 4:Y();break;case 13:ds(t);break;case 19:N(cs);break;case 10:wo(t.type);break;case 22:case 23:ds(t),yi(),null!==e&&N(qo);break;case 24:wo(Ro)}}function al(e,t){try{var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var o=r.next;n=o;do{if((n.tag&e)===e){r=void 0;var i=n.create,a=n.inst;r=i(),a.destroy=r}n=n.next}while(n!==o)}}catch(s){cc(t,t.return,s)}}function sl(e,t,n){try{var r=t.updateQueue,o=null!==r?r.lastEffect:null;if(null!==o){var i=o.next;r=i;do{if((r.tag&e)===e){var a=r.inst,s=a.destroy;if(void 0!==s){a.destroy=void 0,o=t;var l=n,d=s;try{d()}catch(c){cc(o,l,c)}}}r=r.next}while(r!==i)}}catch(c){cc(t,t.return,c)}}function ll(e){var t=e.updateQueue;if(null!==t){var n=e.stateNode;try{hi(t,n)}catch(r){cc(e,e.return,r)}}}function dl(e,t,n){n.props=fs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(r){cc(e,t,r)}}function cl(e,t){try{var n=e.ref;if(null!==n){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;default:r=e.stateNode}"function"===typeof n?e.refCleanup=n(r):n.current=r}}catch(o){cc(e,t,o)}}function ul(e,t){var n=e.ref,r=e.refCleanup;if(null!==n)if("function"===typeof r)try{r()}catch(o){cc(e,t,o)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof n)try{n(null)}catch(i){cc(e,t,i)}else n.current=null}function pl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(o){cc(e,e.return,o)}}function hl(e,t,n){try{var r=e.stateNode;!function(e,t,n,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,i=null,s=null,l=null,d=null,c=null,u=null;for(m in n){var p=n[m];if(n.hasOwnProperty(m)&&null!=p)switch(m){case"checked":case"value":break;case"defaultValue":d=p;default:r.hasOwnProperty(m)||Xc(e,t,m,null,r,p)}}for(var h in r){var m=r[h];if(p=n[h],r.hasOwnProperty(h)&&(null!=m||null!=p))switch(h){case"type":i=m;break;case"name":o=m;break;case"checked":c=m;break;case"defaultChecked":u=m;break;case"value":s=m;break;case"defaultValue":l=m;break;case"children":case"dangerouslySetInnerHTML":if(null!=m)throw Error(a(137,t));break;default:m!==p&&Xc(e,t,h,m,r,p)}}return void ft(e,s,l,d,c,u,i,o);case"select":for(i in m=s=l=h=null,n)if(d=n[i],n.hasOwnProperty(i)&&null!=d)switch(i){case"value":break;case"multiple":m=d;default:r.hasOwnProperty(i)||Xc(e,t,i,null,r,d)}for(o in r)if(i=r[o],d=n[o],r.hasOwnProperty(o)&&(null!=i||null!=d))switch(o){case"value":h=i;break;case"defaultValue":l=i;break;case"multiple":s=i;default:i!==d&&Xc(e,t,o,i,r,d)}return t=l,n=s,r=m,void(null!=h?bt(e,!!n,h,!1):!!r!==!!n&&(null!=t?bt(e,!!n,t,!0):bt(e,!!n,n?[]:"",!1)));case"textarea":for(l in m=h=null,n)if(o=n[l],n.hasOwnProperty(l)&&null!=o&&!r.hasOwnProperty(l))switch(l){case"value":case"children":break;default:Xc(e,t,l,null,r,o)}for(s in r)if(o=r[s],i=n[s],r.hasOwnProperty(s)&&(null!=o||null!=i))switch(s){case"value":h=o;break;case"defaultValue":m=o;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=o)throw Error(a(91));break;default:o!==i&&Xc(e,t,s,o,r,i)}return void vt(e,h,m);case"option":for(var g in n)if(h=n[g],n.hasOwnProperty(g)&&null!=h&&!r.hasOwnProperty(g))if("selected"===g)e.selected=!1;else Xc(e,t,g,null,r,h);for(d in r)if(h=r[d],m=n[d],r.hasOwnProperty(d)&&h!==m&&(null!=h||null!=m))if("selected"===d)e.selected=h&&"function"!==typeof h&&"symbol"!==typeof h;else Xc(e,t,d,h,r,m);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var f in n)h=n[f],n.hasOwnProperty(f)&&null!=h&&!r.hasOwnProperty(f)&&Xc(e,t,f,null,r,h);for(c in r)if(h=r[c],m=n[c],r.hasOwnProperty(c)&&h!==m&&(null!=h||null!=m))switch(c){case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(a(137,t));break;default:Xc(e,t,c,h,r,m)}return;default:if(Ct(t)){for(var x in n)h=n[x],n.hasOwnProperty(x)&&void 0!==h&&!r.hasOwnProperty(x)&&Zc(e,t,x,void 0,r,h);for(u in r)h=r[u],m=n[u],!r.hasOwnProperty(u)||h===m||void 0===h&&void 0===m||Zc(e,t,u,h,r,m);return}}for(var y in n)h=n[y],n.hasOwnProperty(y)&&null!=h&&!r.hasOwnProperty(y)&&Xc(e,t,y,null,r,h);for(p in r)h=r[p],m=n[p],!r.hasOwnProperty(p)||h===m||null==h&&null==m||Xc(e,t,p,h,r,m)}(r,e.type,n,t),r[Re]=t}catch(o){cc(e,e.return,o)}}function ml(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&hu(e.type)||4===e.tag}function gl(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||ml(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&hu(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function fl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?(9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).insertBefore(e,t):((t=9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Jc));else if(4!==r&&(27===r&&hu(e.type)&&(n=e.stateNode,t=null),null!==(e=e.child)))for(fl(e,t,n),e=e.sibling;null!==e;)fl(e,t,n),e=e.sibling}function xl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&(27===r&&hu(e.type)&&(n=e.stateNode),null!==(e=e.child)))for(xl(e,t,n),e=e.sibling;null!==e;)xl(e,t,n),e=e.sibling}function yl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,o=t.attributes;o.length;)t.removeAttributeNode(o[0]);eu(t,r,n),t[ze]=e,t[Re]=n}catch(i){cc(e,e.return,i)}}var bl=!1,vl=!1,wl=!1,jl="function"===typeof WeakSet?WeakSet:Set,kl=null;function Sl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:$l(e,n),4&r&&al(5,n);break;case 1:if($l(e,n),4&r)if(e=n.stateNode,null===t)try{e.componentDidMount()}catch(a){cc(n,n.return,a)}else{var o=fs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(o,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){cc(n,n.return,s)}}64&r&&ll(n),512&r&&cl(n,n.return);break;case 3:if($l(e,n),64&r&&null!==(e=n.updateQueue)){if(t=null,null!==n.child)switch(n.child.tag){case 27:case 5:case 1:t=n.child.stateNode}try{hi(e,t)}catch(a){cc(n,n.return,a)}}break;case 27:null===t&&4&r&&yl(n);case 26:case 5:$l(e,n),null===t&&4&r&&pl(n),512&r&&cl(n,n.return);break;case 12:$l(e,n);break;case 13:$l(e,n),4&r&&Pl(e,n),64&r&&(null!==(e=n.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var n=e.ownerDocument;if("$?"!==e.data||"complete"===n.readyState)t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}(e,n=mc.bind(null,n))));break;case 22:if(!(r=null!==n.memoizedState||bl)){t=null!==t&&null!==t.memoizedState||vl,o=bl;var i=vl;bl=r,(vl=t)&&!i?Dl(e,n,0!==(8772&n.subtreeFlags)):$l(e,n),bl=o,vl=i}break;case 30:break;default:$l(e,n)}}function Al(e){var t=e.alternate;null!==t&&(e.alternate=null,Al(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Ne(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Cl=null,Fl=!1;function _l(e,t,n){for(n=n.child;null!==n;)El(e,t,n),n=n.sibling}function El(e,t,n){if(ue&&"function"===typeof ue.onCommitFiberUnmount)try{ue.onCommitFiberUnmount(ce,n)}catch(i){}switch(n.tag){case 26:vl||ul(n,t),_l(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode).parentNode.removeChild(n);break;case 27:vl||ul(n,t);var r=Cl,o=Fl;hu(n.type)&&(Cl=n.stateNode,Fl=!1),_l(e,t,n),wu(n.stateNode),Cl=r,Fl=o;break;case 5:vl||ul(n,t);case 6:if(r=Cl,o=Fl,Cl=null,_l(e,t,n),Fl=o,null!==(Cl=r))if(Fl)try{(9===Cl.nodeType?Cl.body:"HTML"===Cl.nodeName?Cl.ownerDocument.body:Cl).removeChild(n.stateNode)}catch(a){cc(n,t,a)}else try{Cl.removeChild(n.stateNode)}catch(a){cc(n,t,a)}break;case 18:null!==Cl&&(Fl?(mu(9===(e=Cl).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,n.stateNode),Fp(e)):mu(Cl,n.stateNode));break;case 4:r=Cl,o=Fl,Cl=n.stateNode.containerInfo,Fl=!0,_l(e,t,n),Cl=r,Fl=o;break;case 0:case 11:case 14:case 15:vl||sl(2,n,t),vl||sl(4,n,t),_l(e,t,n);break;case 1:vl||(ul(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount&&dl(n,t,r)),_l(e,t,n);break;case 21:_l(e,t,n);break;case 22:vl=(r=vl)||null!==n.memoizedState,_l(e,t,n),vl=r;break;default:_l(e,t,n)}}function Pl(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Fp(e)}catch(n){cc(t,t.return,n)}}function Bl(e,t){var n=function(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new jl),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new jl),t;default:throw Error(a(435,e.tag))}}(e);t.forEach(function(t){var r=gc.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}function zl(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var o=n[r],i=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 27:if(hu(l.type)){Cl=l.stateNode,Fl=!1;break e}break;case 5:Cl=l.stateNode,Fl=!1;break e;case 3:case 4:Cl=l.stateNode.containerInfo,Fl=!0;break e}l=l.return}if(null===Cl)throw Error(a(160));El(i,s,o),Cl=null,Fl=!1,null!==(i=o.alternate)&&(i.return=null),o.return=null}if(13878&t.subtreeFlags)for(t=t.child;null!==t;)Tl(t,e),t=t.sibling}var Rl=null;function Tl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:zl(t,e),Ol(e),4&r&&(sl(3,e,e.return),al(3,e),sl(5,e,e.return));break;case 1:zl(t,e),Ol(e),512&r&&(vl||null===n||ul(n,n.return)),64&r&&bl&&(null!==(e=e.updateQueue)&&(null!==(r=e.callbacks)&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===n?r:n.concat(r))));break;case 26:var o=Rl;if(zl(t,e),Ol(e),512&r&&(vl||null===n||ul(n,n.return)),4&r){var i=null!==n?n.memoizedState:null;if(r=e.memoizedState,null===n)if(null===r)if(null===e.stateNode){e:{r=e.type,n=e.memoizedProps,o=o.ownerDocument||o;t:switch(r){case"title":(!(i=o.getElementsByTagName("title")[0])||i[De]||i[ze]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=o.createElement(r),o.head.insertBefore(i,o.querySelector("head > title"))),eu(i,r,n),i[ze]=e,Ue(i),r=i;break e;case"link":var s=Du("link","href",o).get(r+(n.href||""));if(s)for(var l=0;l<s.length;l++)if((i=s[l]).getAttribute("href")===(null==n.href||""===n.href?null:n.href)&&i.getAttribute("rel")===(null==n.rel?null:n.rel)&&i.getAttribute("title")===(null==n.title?null:n.title)&&i.getAttribute("crossorigin")===(null==n.crossOrigin?null:n.crossOrigin)){s.splice(l,1);break t}eu(i=o.createElement(r),r,n),o.head.appendChild(i);break;case"meta":if(s=Du("meta","content",o).get(r+(n.content||"")))for(l=0;l<s.length;l++)if((i=s[l]).getAttribute("content")===(null==n.content?null:""+n.content)&&i.getAttribute("name")===(null==n.name?null:n.name)&&i.getAttribute("property")===(null==n.property?null:n.property)&&i.getAttribute("http-equiv")===(null==n.httpEquiv?null:n.httpEquiv)&&i.getAttribute("charset")===(null==n.charSet?null:n.charSet)){s.splice(l,1);break t}eu(i=o.createElement(r),r,n),o.head.appendChild(i);break;default:throw Error(a(468,r))}i[ze]=e,Ue(i),r=i}e.stateNode=r}else Nu(o,e.type,e.stateNode);else e.stateNode=Tu(o,r,e.memoizedProps);else i!==r?(null===i?null!==n.stateNode&&(n=n.stateNode).parentNode.removeChild(n):i.count--,null===r?Nu(o,e.type,e.stateNode):Tu(o,r,e.memoizedProps)):null===r&&null!==e.stateNode&&hl(e,e.memoizedProps,n.memoizedProps)}break;case 27:zl(t,e),Ol(e),512&r&&(vl||null===n||ul(n,n.return)),null!==n&&4&r&&hl(e,e.memoizedProps,n.memoizedProps);break;case 5:if(zl(t,e),Ol(e),512&r&&(vl||null===n||ul(n,n.return)),32&e.flags){o=e.stateNode;try{jt(o,"")}catch(m){cc(e,e.return,m)}}4&r&&null!=e.stateNode&&hl(e,o=e.memoizedProps,null!==n?n.memoizedProps:o),1024&r&&(wl=!0);break;case 6:if(zl(t,e),Ol(e),4&r){if(null===e.stateNode)throw Error(a(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(m){cc(e,e.return,m)}}break;case 3:if(Mu=null,o=Rl,Rl=Su(t.containerInfo),zl(t,e),Rl=o,Ol(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Fp(t.containerInfo)}catch(m){cc(e,e.return,m)}wl&&(wl=!1,Il(e));break;case 4:r=Rl,Rl=Su(e.stateNode.containerInfo),zl(t,e),Ol(e),Rl=r;break;case 12:default:zl(t,e),Ol(e);break;case 13:zl(t,e),Ol(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==n&&null!==n.memoizedState)&&(wd=te()),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Bl(e,r)));break;case 22:o=null!==e.memoizedState;var d=null!==n&&null!==n.memoizedState,c=bl,u=vl;if(bl=c||o,vl=u||d,zl(t,e),vl=u,bl=c,Ol(e),8192&r)e:for(t=e.stateNode,t._visibility=o?-2&t._visibility:1|t._visibility,o&&(null===n||d||bl||vl||Ml(e)),n=null,t=e;;){if(5===t.tag||26===t.tag){if(null===n){d=n=t;try{if(i=d.stateNode,o)"function"===typeof(s=i.style).setProperty?s.setProperty("display","none","important"):s.display="none";else{l=d.stateNode;var p=d.memoizedProps.style,h=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;l.style.display=null==h||"boolean"===typeof h?"":(""+h).trim()}}catch(m){cc(d,d.return,m)}}}else if(6===t.tag){if(null===n){d=t;try{d.stateNode.nodeValue=o?"":d.memoizedProps}catch(m){cc(d,d.return,m)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}4&r&&(null!==(r=e.updateQueue)&&(null!==(n=r.retryQueue)&&(r.retryQueue=null,Bl(e,n))));break;case 19:zl(t,e),Ol(e),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Bl(e,r)));case 30:case 21:}}function Ol(e){var t=e.flags;if(2&t){try{for(var n,r=e.return;null!==r;){if(ml(r)){n=r;break}r=r.return}if(null==n)throw Error(a(160));switch(n.tag){case 27:var o=n.stateNode;xl(e,gl(e),o);break;case 5:var i=n.stateNode;32&n.flags&&(jt(i,""),n.flags&=-33),xl(e,gl(e),i);break;case 3:case 4:var s=n.stateNode.containerInfo;fl(e,gl(e),s);break;default:throw Error(a(161))}}catch(l){cc(e,e.return,l)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Il(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Il(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function $l(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Sl(e,t.alternate,t),t=t.sibling}function Ml(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:sl(4,t,t.return),Ml(t);break;case 1:ul(t,t.return);var n=t.stateNode;"function"===typeof n.componentWillUnmount&&dl(t,t.return,n),Ml(t);break;case 27:wu(t.stateNode);case 26:case 5:ul(t,t.return),Ml(t);break;case 22:null===t.memoizedState&&Ml(t);break;default:Ml(t)}e=e.sibling}}function Dl(e,t,n){for(n=n&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var r=t.alternate,o=e,i=t,a=i.flags;switch(i.tag){case 0:case 11:case 15:Dl(o,i,n),al(4,i);break;case 1:if(Dl(o,i,n),"function"===typeof(o=(r=i).stateNode).componentDidMount)try{o.componentDidMount()}catch(d){cc(r,r.return,d)}if(null!==(o=(r=i).updateQueue)){var s=r.stateNode;try{var l=o.shared.hiddenCallbacks;if(null!==l)for(o.shared.hiddenCallbacks=null,o=0;o<l.length;o++)pi(l[o],s)}catch(d){cc(r,r.return,d)}}n&&64&a&&ll(i),cl(i,i.return);break;case 27:yl(i);case 26:case 5:Dl(o,i,n),n&&null===r&&4&a&&pl(i),cl(i,i.return);break;case 12:Dl(o,i,n);break;case 13:Dl(o,i,n),n&&4&a&&Pl(o,i);break;case 22:null===i.memoizedState&&Dl(o,i,n),cl(i,i.return);break;case 30:break;default:Dl(o,i,n)}t=t.sibling}}function Nl(e,t){var n=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==n&&(null!=e&&e.refCount++,null!=n&&Oo(n))}function Ll(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Oo(e))}function ql(e,t,n,r){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)Hl(e,t,n,r),t=t.sibling}function Hl(e,t,n,r){var o=t.flags;switch(t.tag){case 0:case 11:case 15:ql(e,t,n,r),2048&o&&al(9,t);break;case 1:case 13:default:ql(e,t,n,r);break;case 3:ql(e,t,n,r),2048&o&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Oo(e)));break;case 12:if(2048&o){ql(e,t,n,r),e=t.stateNode;try{var i=t.memoizedProps,a=i.id,s=i.onPostCommit;"function"===typeof s&&s(a,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(l){cc(t,t.return,l)}}else ql(e,t,n,r);break;case 23:break;case 22:i=t.stateNode,a=t.alternate,null!==t.memoizedState?2&i._visibility?ql(e,t,n,r):Ul(e,t):2&i._visibility?ql(e,t,n,r):(i._visibility|=2,Wl(e,t,n,r,0!==(10256&t.subtreeFlags))),2048&o&&Nl(a,t);break;case 24:ql(e,t,n,r),2048&o&&Ll(t.alternate,t)}}function Wl(e,t,n,r,o){for(o=o&&0!==(10256&t.subtreeFlags),t=t.child;null!==t;){var i=e,a=t,s=n,l=r,d=a.flags;switch(a.tag){case 0:case 11:case 15:Wl(i,a,s,l,o),al(8,a);break;case 23:break;case 22:var c=a.stateNode;null!==a.memoizedState?2&c._visibility?Wl(i,a,s,l,o):Ul(i,a):(c._visibility|=2,Wl(i,a,s,l,o)),o&&2048&d&&Nl(a.alternate,a);break;case 24:Wl(i,a,s,l,o),o&&2048&d&&Ll(a.alternate,a);break;default:Wl(i,a,s,l,o)}t=t.sibling}}function Ul(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var n=e,r=t,o=r.flags;switch(r.tag){case 22:Ul(n,r),2048&o&&Nl(r.alternate,r);break;case 24:Ul(n,r),2048&o&&Ll(r.alternate,r);break;default:Ul(n,r)}t=t.sibling}}var Gl=8192;function Yl(e){if(e.subtreeFlags&Gl)for(e=e.child;null!==e;)Vl(e),e=e.sibling}function Vl(e){switch(e.tag){case 26:Yl(e),e.flags&Gl&&null!==e.memoizedState&&function(e,t,n){if(null===qu)throw Error(a(475));var r=qu;if("stylesheet"===t.type&&("string"!==typeof n.media||!1!==matchMedia(n.media).matches)&&0===(4&t.state.loading)){if(null===t.instance){var o=Eu(n.href),i=e.querySelector(Pu(o));if(i)return null!==(e=i._p)&&"object"===typeof e&&"function"===typeof e.then&&(r.count++,r=Wu.bind(r),e.then(r,r)),t.state.loading|=4,t.instance=i,void Ue(i);i=e.ownerDocument||e,n=Bu(n),(o=ju.get(o))&&Iu(n,o),Ue(i=i.createElement("link"));var s=i;s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),eu(i,"link",n),t.instance=i}null===r.stylesheets&&(r.stylesheets=new Map),r.stylesheets.set(t,e),(e=t.state.preload)&&0===(3&t.state.loading)&&(r.count++,t=Wu.bind(r),e.addEventListener("load",t),e.addEventListener("error",t))}}(Rl,e.memoizedState,e.memoizedProps);break;case 5:default:Yl(e);break;case 3:case 4:var t=Rl;Rl=Su(e.stateNode.containerInfo),Yl(e),Rl=t;break;case 22:null===e.memoizedState&&(null!==(t=e.alternate)&&null!==t.memoizedState?(t=Gl,Gl=16777216,Yl(e),Gl=t):Yl(e))}}function Ql(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function Kl(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];kl=r,Zl(r,e)}Ql(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)Jl(e),e=e.sibling}function Jl(e){switch(e.tag){case 0:case 11:case 15:Kl(e),2048&e.flags&&sl(9,e,e.return);break;case 3:case 12:default:Kl(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,Xl(e)):Kl(e)}}function Xl(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];kl=r,Zl(r,e)}Ql(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:sl(8,t,t.return),Xl(t);break;case 22:2&(n=t.stateNode)._visibility&&(n._visibility&=-3,Xl(t));break;default:Xl(t)}e=e.sibling}}function Zl(e,t){for(;null!==kl;){var n=kl;switch(n.tag){case 0:case 11:case 15:sl(8,n,t);break;case 23:case 22:if(null!==n.memoizedState&&null!==n.memoizedState.cachePool){var r=n.memoizedState.cachePool.pool;null!=r&&r.refCount++}break;case 24:Oo(n.memoizedState.cache)}if(null!==(r=n.child))r.return=n,kl=r;else e:for(n=e;null!==kl;){var o=(r=kl).sibling,i=r.return;if(Al(r),r===n){kl=null;break e}if(null!==o){o.return=i,kl=o;break e}kl=i}}}var ed={getCacheForType:function(e){var t=Fo(Ro),n=t.data.get(e);return void 0===n&&(n=e(),t.data.set(e,n)),n}},td="function"===typeof WeakMap?WeakMap:Map,nd=0,rd=null,od=null,id=0,ad=0,sd=null,ld=!1,dd=!1,cd=!1,ud=0,pd=0,hd=0,md=0,gd=0,fd=0,xd=0,yd=null,bd=null,vd=!1,wd=0,jd=1/0,kd=null,Sd=null,Ad=0,Cd=null,Fd=null,_d=0,Ed=0,Pd=null,Bd=null,zd=0,Rd=null;function Td(){if(0!==(2&nd)&&0!==id)return id&-id;if(null!==T.T){return 0!==Mo?Mo:Ec()}return Pe()}function Od(){0===fd&&(fd=0===(536870912&id)||io?je():536870912);var e=os.current;return null!==e&&(e.flags|=32),fd}function Id(e,t,n){(e!==rd||2!==ad&&9!==ad)&&null===e.cancelPendingCommit||(Hd(e,0),Nd(e,id,fd,!1)),Ae(e,n),0!==(2&nd)&&e===rd||(e===rd&&(0===(2&nd)&&(md|=n),4===pd&&Nd(e,id,fd,!1)),jc(e))}function $d(e,t,n){if(0!==(6&nd))throw Error(a(327));for(var r=!n&&0===(124&t)&&0===(t&e.expiredLanes)||ve(e,t),o=r?function(e,t){var n=nd;nd|=2;var r=Ud(),o=Gd();rd!==e||id!==t?(kd=null,jd=te()+500,Hd(e,t)):dd=ve(e,t);e:for(;;)try{if(0!==ad&&null!==od){t=od;var i=sd;t:switch(ad){case 1:ad=0,sd=null,Zd(e,t,i,1);break;case 2:case 9:if(Ko(i)){ad=0,sd=null,Xd(t);break}t=function(){2!==ad&&9!==ad||rd!==e||(ad=7),jc(e)},i.then(t,t);break e;case 3:ad=7;break e;case 4:ad=5;break e;case 7:Ko(i)?(ad=0,sd=null,Xd(t)):(ad=0,sd=null,Zd(e,t,i,7));break;case 5:var s=null;switch(od.tag){case 26:s=od.memoizedState;case 5:case 27:var l=od;if(!s||Lu(s)){ad=0,sd=null;var d=l.sibling;if(null!==d)od=d;else{var c=l.return;null!==c?(od=c,ec(c)):od=null}break t}}ad=0,sd=null,Zd(e,t,i,5);break;case 6:ad=0,sd=null,Zd(e,t,i,6);break;case 8:qd(),pd=6;break e;default:throw Error(a(462))}}Kd();break}catch(u){Wd(e,u)}return bo=yo=null,T.H=r,T.A=o,nd=n,null!==od?0:(rd=null,id=0,_r(),pd)}(e,t):Vd(e,t,!0),i=r;;){if(0===o){dd&&!r&&Nd(e,t,0,!1);break}if(n=e.current.alternate,!i||Dd(n)){if(2===o){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=0!==(s=-536870913&e.pendingLanes)?s:536870912&s?536870912:0;if(0!==s){t=s;e:{var l=e;o=yd;var d=l.current.memoizedState.isDehydrated;if(d&&(Hd(l,s).flags|=256),2!==(s=Vd(l,s,!1))){if(cd&&!d){l.errorRecoveryDisabledLanes|=i,md|=i,o=4;break e}i=bd,bd=o,null!==i&&(null===bd?bd=i:bd.push.apply(bd,i))}o=s}if(i=!1,2!==o)continue}}if(1===o){Hd(e,0),Nd(e,t,0,!0);break}e:{switch(r=e,i=o){case 0:case 1:throw Error(a(345));case 4:if((4194048&t)!==t)break;case 6:Nd(r,t,fd,!ld);break e;case 2:bd=null;break;case 3:case 5:break;default:throw Error(a(329))}if((62914560&t)===t&&10<(o=wd+300-te())){if(Nd(r,t,fd,!ld),0!==be(r,0,!0))break e;r.timeoutHandle=lu(Md.bind(null,r,n,bd,kd,vd,t,fd,md,xd,ld,i,2,-0,0),o)}else Md(r,n,bd,kd,vd,t,fd,md,xd,ld,i,0,-0,0)}break}o=Vd(e,t,!1),i=!1}jc(e)}function Md(e,t,n,r,o,i,s,l,d,c,u,p,h,m){if(e.timeoutHandle=-1,(8192&(p=t.subtreeFlags)||16785408===(16785408&p))&&(qu={stylesheets:null,count:0,unsuspend:Hu},Vl(t),null!==(p=function(){if(null===qu)throw Error(a(475));var e=qu;return e.stylesheets&&0===e.count&&Gu(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&Gu(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}())))return e.cancelPendingCommit=p(nc.bind(null,e,t,i,n,r,o,s,l,d,u,1,h,m)),void Nd(e,i,s,!c);nc(e,t,i,n,r,o,s,l,d)}function Dd(e){for(var t=e;;){var n=t.tag;if((0===n||11===n||15===n)&&16384&t.flags&&(null!==(n=t.updateQueue)&&null!==(n=n.stores)))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Qn(i(),o))return!1}catch(a){return!1}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Nd(e,t,n,r){t&=~gd,t&=~md,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var o=t;0<o;){var i=31-he(o),a=1<<i;r[i]=-1,o&=~a}0!==n&&Ce(e,n,t)}function Ld(){return 0!==(6&nd)||(kc(0,!1),!1)}function qd(){if(null!==od){if(0===ad)var e=od.return;else bo=yo=null,Mi(e=od),Qa=null,Ka=0,e=od;for(;null!==e;)il(e.alternate,e),e=e.return;od=null}}function Hd(e,t){var n=e.timeoutHandle;-1!==n&&(e.timeoutHandle=-1,du(n)),null!==(n=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,n()),qd(),rd=e,od=n=Mr(e.current,null),id=t,ad=0,sd=null,ld=!1,dd=ve(e,t),cd=!1,xd=fd=gd=md=hd=pd=0,bd=yd=null,vd=!1,0!==(8&t)&&(t|=32&t);var r=e.entangledLanes;if(0!==r)for(e=e.entanglements,r&=t;0<r;){var o=31-he(r),i=1<<o;t|=e[o],r&=~i}return ud=t,_r(),n}function Wd(e,t){vi=null,T.H=Ua,t===Go||t===Vo?(t=ei(),ad=3):t===Yo?(t=ei(),ad=4):ad=t===Cs?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,sd=t,null===od&&(pd=1,ws(e,Sr(t,e.current)))}function Ud(){var e=T.H;return T.H=Ua,null===e?Ua:e}function Gd(){var e=T.A;return T.A=ed,e}function Yd(){pd=4,ld||(4194048&id)!==id&&null!==os.current||(dd=!0),0===(134217727&hd)&&0===(134217727&md)||null===rd||Nd(rd,id,fd,!1)}function Vd(e,t,n){var r=nd;nd|=2;var o=Ud(),i=Gd();rd===e&&id===t||(kd=null,Hd(e,t)),t=!1;var a=pd;e:for(;;)try{if(0!==ad&&null!==od){var s=od,l=sd;switch(ad){case 8:qd(),a=6;break e;case 3:case 2:case 9:case 6:null===os.current&&(t=!0);var d=ad;if(ad=0,sd=null,Zd(e,s,l,d),n&&dd){a=0;break e}break;default:d=ad,ad=0,sd=null,Zd(e,s,l,d)}}Qd(),a=pd;break}catch(c){Wd(e,c)}return t&&e.shellSuspendCounter++,bo=yo=null,nd=r,T.H=o,T.A=i,null===od&&(rd=null,id=0,_r()),a}function Qd(){for(;null!==od;)Jd(od)}function Kd(){for(;null!==od&&!Z();)Jd(od)}function Jd(e){var t=Js(e.alternate,e,ud);e.memoizedProps=e.pendingProps,null===t?ec(e):od=t}function Xd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Is(n,t,t.pendingProps,t.type,void 0,id);break;case 11:t=Is(n,t,t.pendingProps,t.type.render,t.ref,id);break;case 5:Mi(t);default:il(n,t),t=Js(n,t=od=Dr(t,ud),ud)}e.memoizedProps=e.pendingProps,null===t?ec(e):od=t}function Zd(e,t,n,r){bo=yo=null,Mi(t),Qa=null,Ka=0;var o=t.return;try{if(function(e,t,n,r,o){if(n.flags|=32768,null!==r&&"object"===typeof r&&"function"===typeof r.then){if(null!==(t=n.alternate)&&So(t,n,o,!0),null!==(n=os.current)){switch(n.tag){case 13:return null===is?Yd():null===n.alternate&&0===pd&&(pd=3),n.flags&=-257,n.flags|=65536,n.lanes=o,r===Qo?n.flags|=16384:(null===(t=n.updateQueue)?n.updateQueue=new Set([r]):t.add(r),uc(e,r,o)),!1;case 22:return n.flags|=65536,r===Qo?n.flags|=16384:(null===(t=n.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):null===(n=t.retryQueue)?t.retryQueue=new Set([r]):n.add(r),uc(e,r,o)),!1}throw Error(a(435,n.tag))}return uc(e,r,o),Yd(),!1}if(io)return null!==(t=os.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=o,r!==lo&&fo(Sr(e=Error(a(422),{cause:r}),n))):(r!==lo&&fo(Sr(t=Error(a(423),{cause:r}),n)),(e=e.current.alternate).flags|=65536,o&=-o,e.lanes|=o,r=Sr(r,n),li(e,o=ks(e.stateNode,r,o)),4!==pd&&(pd=2)),!1;var i=Error(a(520),{cause:r});if(i=Sr(i,n),null===yd?yd=[i]:yd.push(i),4!==pd&&(pd=2),null===t)return!0;r=Sr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=o&-o,n.lanes|=e,li(n,e=ks(n.stateNode,r,e)),!1;case 1:if(t=n.type,i=n.stateNode,0===(128&n.flags)&&("function"===typeof t.getDerivedStateFromError||null!==i&&"function"===typeof i.componentDidCatch&&(null===Sd||!Sd.has(i))))return n.flags|=65536,o&=-o,n.lanes|=o,As(o=Ss(o),e,n,r),li(n,o),!1}n=n.return}while(null!==n);return!1}(e,o,t,n,id))return pd=1,ws(e,Sr(n,e.current)),void(od=null)}catch(i){if(null!==o)throw od=o,i;return pd=1,ws(e,Sr(n,e.current)),void(od=null)}32768&t.flags?(io||1===r?e=!0:dd||0!==(536870912&id)?e=!1:(ld=e=!0,(2===r||9===r||3===r||6===r)&&(null!==(r=os.current)&&13===r.tag&&(r.flags|=16384))),tc(t,e)):ec(t)}function ec(e){var t=e;do{if(0!==(32768&t.flags))return void tc(t,ld);e=t.return;var n=rl(t.alternate,t,ud);if(null!==n)return void(od=n);if(null!==(t=t.sibling))return void(od=t);od=t=e}while(null!==t);0===pd&&(pd=5)}function tc(e,t){do{var n=ol(e.alternate,e);if(null!==n)return n.flags&=32767,void(od=n);if(null!==(n=e.return)&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&null!==(e=e.sibling))return void(od=e);od=e=n}while(null!==e);pd=6,od=null}function nc(e,t,n,r,o,i,s,l,d){e.cancelPendingCommit=null;do{sc()}while(0!==Ad);if(0!==(6&nd))throw Error(a(327));if(null!==t){if(t===e.current)throw Error(a(177));if(i=t.lanes|t.childLanes,function(e,t,n,r,o,i){var a=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,l=e.expirationTimes,d=e.hiddenUpdates;for(n=a&~n;0<n;){var c=31-he(n),u=1<<c;s[c]=0,l[c]=-1;var p=d[c];if(null!==p)for(d[c]=null,c=0;c<p.length;c++){var h=p[c];null!==h&&(h.lane&=-536870913)}n&=~u}0!==r&&Ce(e,r,0),0!==i&&0===o&&0!==e.tag&&(e.suspendedLanes|=i&~(a&~t))}(e,n,i|=Fr,s,l,d),e===rd&&(od=rd=null,id=0),Fd=t,Cd=e,_d=n,Ed=i,Pd=o,Bd=r,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,J(ie,function(){return lc(),null})):(e.callbackNode=null,e.callbackPriority=0),r=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||r){r=T.T,T.T=null,o=O.p,O.p=2,s=nd,nd|=4;try{!function(e,t){if(e=e.containerInfo,tu=np,tr(e=er(e))){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch(f){n=null;break e}var s=0,l=-1,d=-1,c=0,u=0,p=e,h=null;t:for(;;){for(var m;p!==n||0!==o&&3!==p.nodeType||(l=s+o),p!==i||0!==r&&3!==p.nodeType||(d=s+r),3===p.nodeType&&(s+=p.nodeValue.length),null!==(m=p.firstChild);)h=p,p=m;for(;;){if(p===e)break t;if(h===n&&++c===o&&(l=s),h===i&&++u===r&&(d=s),null!==(m=p.nextSibling))break;h=(p=h).parentNode}p=m}n=-1===l||-1===d?null:{start:l,end:d}}else n=null}n=n||{start:0,end:0}}else n=null;for(nu={focusedElem:e,selectionRange:n},np=!1,kl=t;null!==kl;)if(e=(t=kl).child,0!==(1024&t.subtreeFlags)&&null!==e)e.return=t,kl=e;else for(;null!==kl;){switch(i=(t=kl).alternate,e=t.flags,t.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==i){e=void 0,n=t,o=i.memoizedProps,i=i.memoizedState,r=n.stateNode;try{var g=fs(n.type,o,(n.elementType,n.type));e=r.getSnapshotBeforeUpdate(g,i),r.__reactInternalSnapshotBeforeUpdate=e}catch(x){cc(n,n.return,x)}}break;case 3:if(0!==(1024&e))if(9===(n=(e=t.stateNode.containerInfo).nodeType))gu(e);else if(1===n)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":gu(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(a(163))}if(null!==(e=t.sibling)){e.return=t.return,kl=e;break}kl=t.return}}(e,t)}finally{nd=s,O.p=o,T.T=r}}Ad=1,rc(),oc(),ic()}}function rc(){if(1===Ad){Ad=0;var e=Cd,t=Fd,n=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||n){n=T.T,T.T=null;var r=O.p;O.p=2;var o=nd;nd|=4;try{Tl(t,e);var i=nu,a=er(e.containerInfo),s=i.focusedElem,l=i.selectionRange;if(a!==s&&s&&s.ownerDocument&&Zn(s.ownerDocument.documentElement,s)){if(null!==l&&tr(s)){var d=l.start,c=l.end;if(void 0===c&&(c=d),"selectionStart"in s)s.selectionStart=d,s.selectionEnd=Math.min(c,s.value.length);else{var u=s.ownerDocument||document,p=u&&u.defaultView||window;if(p.getSelection){var h=p.getSelection(),m=s.textContent.length,g=Math.min(l.start,m),f=void 0===l.end?g:Math.min(l.end,m);!h.extend&&g>f&&(a=f,f=g,g=a);var x=Xn(s,g),y=Xn(s,f);if(x&&y&&(1!==h.rangeCount||h.anchorNode!==x.node||h.anchorOffset!==x.offset||h.focusNode!==y.node||h.focusOffset!==y.offset)){var b=u.createRange();b.setStart(x.node,x.offset),h.removeAllRanges(),g>f?(h.addRange(b),h.extend(y.node,y.offset)):(b.setEnd(y.node,y.offset),h.addRange(b))}}}}for(u=[],h=s;h=h.parentNode;)1===h.nodeType&&u.push({element:h,left:h.scrollLeft,top:h.scrollTop});for("function"===typeof s.focus&&s.focus(),s=0;s<u.length;s++){var v=u[s];v.element.scrollLeft=v.left,v.element.scrollTop=v.top}}np=!!tu,nu=tu=null}finally{nd=o,O.p=r,T.T=n}}e.current=t,Ad=2}}function oc(){if(2===Ad){Ad=0;var e=Cd,t=Fd,n=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||n){n=T.T,T.T=null;var r=O.p;O.p=2;var o=nd;nd|=4;try{Sl(e,t.alternate,t)}finally{nd=o,O.p=r,T.T=n}}Ad=3}}function ic(){if(4===Ad||3===Ad){Ad=0,ee();var e=Cd,t=Fd,n=_d,r=Bd;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Ad=5:(Ad=0,Fd=Cd=null,ac(e,e.pendingLanes));var o=e.pendingLanes;if(0===o&&(Sd=null),Ee(n),t=t.stateNode,ue&&"function"===typeof ue.onCommitFiberRoot)try{ue.onCommitFiberRoot(ce,t,void 0,128===(128&t.current.flags))}catch(l){}if(null!==r){t=T.T,o=O.p,O.p=2,T.T=null;try{for(var i=e.onRecoverableError,a=0;a<r.length;a++){var s=r[a];i(s.value,{componentStack:s.stack})}}finally{T.T=t,O.p=o}}0!==(3&_d)&&sc(),jc(e),o=e.pendingLanes,0!==(4194090&n)&&0!==(42&o)?e===Rd?zd++:(zd=0,Rd=e):zd=0,kc(0,!1)}}function ac(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Oo(t)))}function sc(e){return rc(),oc(),ic(),lc()}function lc(){if(5!==Ad)return!1;var e=Cd,t=Ed;Ed=0;var n=Ee(_d),r=T.T,o=O.p;try{O.p=32>n?32:n,T.T=null,n=Pd,Pd=null;var i=Cd,s=_d;if(Ad=0,Fd=Cd=null,_d=0,0!==(6&nd))throw Error(a(331));var l=nd;if(nd|=4,Jl(i.current),Hl(i,i.current,s,n),nd=l,kc(0,!1),ue&&"function"===typeof ue.onPostCommitFiberRoot)try{ue.onPostCommitFiberRoot(ce,i)}catch(d){}return!0}finally{O.p=o,T.T=r,ac(e,t)}}function dc(e,t,n){t=Sr(n,t),null!==(e=ai(e,t=ks(e.stateNode,t,2),2))&&(Ae(e,2),jc(e))}function cc(e,t,n){if(3===e.tag)dc(e,e,n);else for(;null!==t;){if(3===t.tag){dc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Sd||!Sd.has(r))){e=Sr(n,e),null!==(r=ai(t,n=Ss(2),2))&&(As(n,r,t,e),Ae(r,2),jc(r));break}}t=t.return}}function uc(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new td;var o=new Set;r.set(t,o)}else void 0===(o=r.get(t))&&(o=new Set,r.set(t,o));o.has(n)||(cd=!0,o.add(n),e=pc.bind(null,e,t,n),t.then(e,e))}function pc(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,rd===e&&(id&n)===n&&(4===pd||3===pd&&(62914560&id)===id&&300>te()-wd?0===(2&nd)&&Hd(e,0):gd|=n,xd===id&&(xd=0)),jc(e)}function hc(e,t){0===t&&(t=ke()),null!==(e=Br(e,t))&&(Ae(e,t),jc(e))}function mc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),hc(e,n)}function gc(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;null!==o&&(n=o.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(a(314))}null!==r&&r.delete(t),hc(e,n)}var fc=null,xc=null,yc=!1,bc=!1,vc=!1,wc=0;function jc(e){e!==xc&&null===e.next&&(null===xc?fc=xc=e:xc=xc.next=e),bc=!0,yc||(yc=!0,uu(function(){0!==(6&nd)?J(re,Sc):Ac()}))}function kc(e,t){if(!vc&&bc){vc=!0;do{for(var n=!1,r=fc;null!==r;){if(!t)if(0!==e){var o=r.pendingLanes;if(0===o)var i=0;else{var a=r.suspendedLanes,s=r.pingedLanes;i=(1<<31-he(42|e)+1)-1,i=201326741&(i&=o&~(a&~s))?201326741&i|1:i?2|i:0}0!==i&&(n=!0,_c(r,i))}else i=id,0===(3&(i=be(r,r===rd?i:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||ve(r,i)||(n=!0,_c(r,i));r=r.next}}while(n);vc=!1}}function Sc(){Ac()}function Ac(){bc=yc=!1;var e=0;0!==wc&&(function(){var e=window.event;if(e&&"popstate"===e.type)return e!==su&&(su=e,!0);return su=null,!1}()&&(e=wc),wc=0);for(var t=te(),n=null,r=fc;null!==r;){var o=r.next,i=Cc(r,t);0===i?(r.next=null,null===n?fc=o:n.next=o,null===o&&(xc=n)):(n=r,(0!==e||0!==(3&i))&&(bc=!0)),r=o}kc(e,!1)}function Cc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=-62914561&e.pendingLanes;0<i;){var a=31-he(i),s=1<<a,l=o[a];-1===l?0!==(s&n)&&0===(s&r)||(o[a]=we(s,t)):l<=t&&(e.expiredLanes|=s),i&=~s}if(n=id,n=be(e,e===(t=rd)?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===n||e===t&&(2===ad||9===ad)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&X(r),e.callbackNode=null,e.callbackPriority=0;if(0===(3&n)||ve(e,n)){if((t=n&-n)===e.callbackPriority)return t;switch(null!==r&&X(r),Ee(n)){case 2:case 8:n=oe;break;case 32:default:n=ie;break;case 268435456:n=se}return r=Fc.bind(null,e),n=J(n,r),e.callbackPriority=t,e.callbackNode=n,t}return null!==r&&null!==r&&X(r),e.callbackPriority=2,e.callbackNode=null,2}function Fc(e,t){if(0!==Ad&&5!==Ad)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(sc()&&e.callbackNode!==n)return null;var r=id;return 0===(r=be(e,e===rd?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:($d(e,r,t),Cc(e,te()),null!=e.callbackNode&&e.callbackNode===n?Fc.bind(null,e):null)}function _c(e,t){if(sc())return null;$d(e,t,!0)}function Ec(){return 0===wc&&(wc=je()),wc}function Pc(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:Et(""+e)}function Bc(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}for(var zc=0;zc<wr.length;zc++){var Rc=wr[zc];jr(Rc.toLowerCase(),"on"+(Rc[0].toUpperCase()+Rc.slice(1)))}jr(hr,"onAnimationEnd"),jr(mr,"onAnimationIteration"),jr(gr,"onAnimationStart"),jr("dblclick","onDoubleClick"),jr("focusin","onFocus"),jr("focusout","onBlur"),jr(fr,"onTransitionRun"),jr(xr,"onTransitionStart"),jr(yr,"onTransitionCancel"),jr(br,"onTransitionEnd"),Qe("onMouseEnter",["mouseout","mouseover"]),Qe("onMouseLeave",["mouseout","mouseover"]),Qe("onPointerEnter",["pointerout","pointerover"]),Qe("onPointerLeave",["pointerout","pointerover"]),Ve("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ve("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ve("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ve("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ve("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ve("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Tc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Oc=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Tc));function Ic(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,d=s.currentTarget;if(s=s.listener,l!==i&&o.isPropagationStopped())break e;i=s,o.currentTarget=d;try{i(o)}catch(c){xs(c)}o.currentTarget=null,i=l}else for(a=0;a<r.length;a++){if(l=(s=r[a]).instance,d=s.currentTarget,s=s.listener,l!==i&&o.isPropagationStopped())break e;i=s,o.currentTarget=d;try{i(o)}catch(c){xs(c)}o.currentTarget=null,i=l}}}}function $c(e,t){var n=t[Oe];void 0===n&&(n=t[Oe]=new Set);var r=e+"__bubble";n.has(r)||(Lc(t,e,2,!1),n.add(r))}function Mc(e,t,n){var r=0;t&&(r|=4),Lc(n,e,r,t)}var Dc="_reactListening"+Math.random().toString(36).slice(2);function Nc(e){if(!e[Dc]){e[Dc]=!0,Ge.forEach(function(t){"selectionchange"!==t&&(Oc.has(t)||Mc(t,!1,e),Mc(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Dc]||(t[Dc]=!0,Mc("selectionchange",!1,t))}}function Lc(e,t,n,r){switch(dp(t)){case 2:var o=rp;break;case 8:o=op;break;default:o=ip}n=o.bind(null,t,n,e),o=void 0,!Dt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(o=!0),r?void 0!==o?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):void 0!==o?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function qc(e,t,n,r,o){var i=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var a=r.tag;if(3===a||4===a){var s=r.stateNode.containerInfo;if(s===o)break;if(4===a)for(a=r.return;null!==a;){var d=a.tag;if((3===d||4===d)&&a.stateNode.containerInfo===o)return;a=a.return}for(;null!==s;){if(null===(a=Le(s)))return;if(5===(d=a.tag)||6===d||26===d||27===d){r=i=a;continue e}s=s.parentNode}}r=r.return}It(function(){var r=i,o=Bt(n),a=[];e:{var s=vr.get(e);if(void 0!==s){var d=Zt,c=e;switch(e){case"keypress":if(0===Ut(n))break e;case"keydown":case"keyup":d=gn;break;case"focusin":c="focus",d=an;break;case"focusout":c="blur",d=an;break;case"beforeblur":case"afterblur":d=an;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=rn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=on;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=xn;break;case hr:case mr:case gr:d=sn;break;case br:d=yn;break;case"scroll":case"scrollend":d=tn;break;case"wheel":d=bn;break;case"copy":case"cut":case"paste":d=ln;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=fn;break;case"toggle":case"beforetoggle":d=vn}var u=0!==(4&t),p=!u&&("scroll"===e||"scrollend"===e),h=u?null!==s?s+"Capture":null:s;u=[];for(var m,g=r;null!==g;){var f=g;if(m=f.stateNode,5!==(f=f.tag)&&26!==f&&27!==f||null===m||null===h||null!=(f=$t(g,h))&&u.push(Hc(g,f,m)),p)break;g=g.return}0<u.length&&(s=new d(s,c,null,n,o),a.push({event:s,listeners:u}))}}if(0===(7&t)){if(d="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===Pt||!(c=n.relatedTarget||n.fromElement)||!Le(c)&&!c[Te])&&(d||s)&&(s=o.window===o?o:(s=o.ownerDocument)?s.defaultView||s.parentWindow:window,d?(d=r,null!==(c=(c=n.relatedTarget||n.toElement)?Le(c):null)&&(p=l(c),u=c.tag,c!==p||5!==u&&27!==u&&6!==u)&&(c=null)):(d=null,c=r),d!==c)){if(u=rn,f="onMouseLeave",h="onMouseEnter",g="mouse","pointerout"!==e&&"pointerover"!==e||(u=fn,f="onPointerLeave",h="onPointerEnter",g="pointer"),p=null==d?s:He(d),m=null==c?s:He(c),(s=new u(f,g+"leave",d,n,o)).target=p,s.relatedTarget=m,f=null,Le(o)===r&&((u=new u(h,g+"enter",c,n,o)).target=m,u.relatedTarget=p,f=u),p=f,d&&c)e:{for(h=c,g=0,m=u=d;m;m=Uc(m))g++;for(m=0,f=h;f;f=Uc(f))m++;for(;0<g-m;)u=Uc(u),g--;for(;0<m-g;)h=Uc(h),m--;for(;g--;){if(u===h||null!==h&&u===h.alternate)break e;u=Uc(u),h=Uc(h)}u=null}else u=null;null!==d&&Gc(a,s,d,u,!1),null!==c&&null!==p&&Gc(a,p,c,u,!0)}if("select"===(d=(s=r?He(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===d&&"file"===s.type)var x=Mn;else if(zn(s))if(Dn)x=Vn;else{x=Gn;var y=Un}else!(d=s.nodeName)||"input"!==d.toLowerCase()||"checkbox"!==s.type&&"radio"!==s.type?r&&Ct(r.elementType)&&(x=Mn):x=Yn;switch(x&&(x=x(e,r))?Rn(a,x,n,o):(y&&y(e,s,r),"focusout"===e&&r&&"number"===s.type&&null!=r.memoizedProps.value&&yt(s,"number",s.value)),y=r?He(r):window,e){case"focusin":(zn(y)||"true"===y.contentEditable)&&(rr=y,or=r,ir=null);break;case"focusout":ir=or=rr=null;break;case"mousedown":ar=!0;break;case"contextmenu":case"mouseup":case"dragend":ar=!1,sr(a,n,o);break;case"selectionchange":if(nr)break;case"keydown":case"keyup":sr(a,n,o)}var b;if(jn)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Pn?_n(e,n)&&(v="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(v="onCompositionStart");v&&(An&&"ko"!==n.locale&&(Pn||"onCompositionStart"!==v?"onCompositionEnd"===v&&Pn&&(b=Wt()):(qt="value"in(Lt=o)?Lt.value:Lt.textContent,Pn=!0)),0<(y=Wc(r,v)).length&&(v=new dn(v,e,null,n,o),a.push({event:v,listeners:y}),b?v.data=b:null!==(b=En(n))&&(v.data=b))),(b=Sn?function(e,t){switch(e){case"compositionend":return En(t);case"keypress":return 32!==t.which?null:(Fn=!0,Cn);case"textInput":return(e=t.data)===Cn&&Fn?null:e;default:return null}}(e,n):function(e,t){if(Pn)return"compositionend"===e||!jn&&_n(e,t)?(e=Wt(),Ht=qt=Lt=null,Pn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return An&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(v=Wc(r,"onBeforeInput")).length&&(y=new dn("onBeforeInput","beforeinput",null,n,o),a.push({event:y,listeners:v}),y.data=b)),function(e,t,n,r,o){if("submit"===t&&n&&n.stateNode===o){var i=Pc((o[Re]||null).action),a=r.submitter;a&&null!==(t=(t=a[Re]||null)?Pc(t.formAction):a.getAttribute("formAction"))&&(i=t,a=null);var s=new Zt("action","action",null,r,o);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==wc){var e=a?Bc(o,a):new FormData(o);Ba(n,{pending:!0,data:e,method:o.method,action:i},null,e)}}else"function"===typeof i&&(s.preventDefault(),e=a?Bc(o,a):new FormData(o),Ba(n,{pending:!0,data:e,method:o.method,action:i},i,e))},currentTarget:o}]})}}(a,e,r,n,o)}Ic(a,t)})}function Hc(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Wc(e,t){for(var n=t+"Capture",r=[];null!==e;){var o=e,i=o.stateNode;if(5!==(o=o.tag)&&26!==o&&27!==o||null===i||(null!=(o=$t(e,n))&&r.unshift(Hc(e,o,i)),null!=(o=$t(e,t))&&r.push(Hc(e,o,i))),3===e.tag)return r;e=e.return}return[]}function Uc(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function Gc(e,t,n,r,o){for(var i=t._reactName,a=[];null!==n&&n!==r;){var s=n,l=s.alternate,d=s.stateNode;if(s=s.tag,null!==l&&l===r)break;5!==s&&26!==s&&27!==s||null===d||(l=d,o?null!=(d=$t(n,i))&&a.unshift(Hc(n,d,l)):o||null!=(d=$t(n,i))&&a.push(Hc(n,d,l))),n=n.return}0!==a.length&&e.push({event:t,listeners:a})}var Yc=/\r\n?/g,Vc=/\u0000|\uFFFD/g;function Qc(e){return("string"===typeof e?e:""+e).replace(Yc,"\n").replace(Vc,"")}function Kc(e,t){return t=Qc(t),Qc(e)===t}function Jc(){}function Xc(e,t,n,r,o,i){switch(n){case"children":"string"===typeof r?"body"===t||"textarea"===t&&""===r||jt(e,r):("number"===typeof r||"bigint"===typeof r)&&"body"!==t&&jt(e,""+r);break;case"className":nt(e,"class",r);break;case"tabIndex":nt(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":nt(e,n,r);break;case"style":At(e,r,i);break;case"data":if("object"!==t){nt(e,"data",r);break}case"src":case"href":if(""===r&&("a"!==t||"href"!==n)){e.removeAttribute(n);break}if(null==r||"function"===typeof r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Et(""+r),e.setAttribute(n,r);break;case"action":case"formAction":if("function"===typeof r){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof i&&("formAction"===n?("input"!==t&&Xc(e,t,"name",o.name,o,null),Xc(e,t,"formEncType",o.formEncType,o,null),Xc(e,t,"formMethod",o.formMethod,o,null),Xc(e,t,"formTarget",o.formTarget,o,null)):(Xc(e,t,"encType",o.encType,o,null),Xc(e,t,"method",o.method,o,null),Xc(e,t,"target",o.target,o,null))),null==r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Et(""+r),e.setAttribute(n,r);break;case"onClick":null!=r&&(e.onclick=Jc);break;case"onScroll":null!=r&&$c("scroll",e);break;case"onScrollEnd":null!=r&&$c("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(a(61));if(null!=(n=r.__html)){if(null!=o.children)throw Error(a(60));e.innerHTML=n}}break;case"multiple":e.multiple=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"muted":e.muted=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==r||"function"===typeof r||"boolean"===typeof r||"symbol"===typeof r){e.removeAttribute("xlink:href");break}n=Et(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""+r):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":!0===r?e.setAttribute(n,""):!1!==r&&null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,r):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":null!=r&&"function"!==typeof r&&"symbol"!==typeof r&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case"rowSpan":case"start":null==r||"function"===typeof r||"symbol"===typeof r||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case"popover":$c("beforetoggle",e),$c("toggle",e),tt(e,"popover",r);break;case"xlinkActuate":rt(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":rt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":rt(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":rt(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":rt(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":rt(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":rt(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":rt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":rt(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":tt(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&tt(e,n=Ft.get(n)||n,r)}}function Zc(e,t,n,r,o,i){switch(n){case"style":At(e,r,i);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(a(61));if(null!=(n=r.__html)){if(null!=o.children)throw Error(a(60));e.innerHTML=n}}break;case"children":"string"===typeof r?jt(e,r):("number"===typeof r||"bigint"===typeof r)&&jt(e,""+r);break;case"onScroll":null!=r&&$c("scroll",e);break;case"onScrollEnd":null!=r&&$c("scrollend",e);break;case"onClick":null!=r&&(e.onclick=Jc);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:Ye.hasOwnProperty(n)||("o"!==n[0]||"n"!==n[1]||(o=n.endsWith("Capture"),t=n.slice(2,o?n.length-7:void 0),"function"===typeof(i=null!=(i=e[Re]||null)?i[n]:null)&&e.removeEventListener(t,i,o),"function"!==typeof r)?n in e?e[n]=r:!0===r?e.setAttribute(n,""):tt(e,n,r):("function"!==typeof i&&null!==i&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,o)))}}function eu(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":$c("error",e),$c("load",e);var r,o=!1,i=!1;for(r in n)if(n.hasOwnProperty(r)){var s=n[r];if(null!=s)switch(r){case"src":o=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,t));default:Xc(e,t,r,s,n,null)}}return i&&Xc(e,t,"srcSet",n.srcSet,n,null),void(o&&Xc(e,t,"src",n.src,n,null));case"input":$c("invalid",e);var l=r=s=i=null,d=null,c=null;for(o in n)if(n.hasOwnProperty(o)){var u=n[o];if(null!=u)switch(o){case"name":i=u;break;case"type":s=u;break;case"checked":d=u;break;case"defaultChecked":c=u;break;case"value":r=u;break;case"defaultValue":l=u;break;case"children":case"dangerouslySetInnerHTML":if(null!=u)throw Error(a(137,t));break;default:Xc(e,t,o,u,n,null)}}return xt(e,r,l,d,c,s,i,!1),void ut(e);case"select":for(i in $c("invalid",e),o=s=r=null,n)if(n.hasOwnProperty(i)&&null!=(l=n[i]))switch(i){case"value":r=l;break;case"defaultValue":s=l;break;case"multiple":o=l;default:Xc(e,t,i,l,n,null)}return t=r,n=s,e.multiple=!!o,void(null!=t?bt(e,!!o,t,!1):null!=n&&bt(e,!!o,n,!0));case"textarea":for(s in $c("invalid",e),r=i=o=null,n)if(n.hasOwnProperty(s)&&null!=(l=n[s]))switch(s){case"value":o=l;break;case"defaultValue":i=l;break;case"children":r=l;break;case"dangerouslySetInnerHTML":if(null!=l)throw Error(a(91));break;default:Xc(e,t,s,l,n,null)}return wt(e,o,i,r),void ut(e);case"option":for(d in n)if(n.hasOwnProperty(d)&&null!=(o=n[d]))if("selected"===d)e.selected=o&&"function"!==typeof o&&"symbol"!==typeof o;else Xc(e,t,d,o,n,null);return;case"dialog":$c("beforetoggle",e),$c("toggle",e),$c("cancel",e),$c("close",e);break;case"iframe":case"object":$c("load",e);break;case"video":case"audio":for(o=0;o<Tc.length;o++)$c(Tc[o],e);break;case"image":$c("error",e),$c("load",e);break;case"details":$c("toggle",e);break;case"embed":case"source":case"link":$c("error",e),$c("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&null!=(o=n[c]))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,t));default:Xc(e,t,c,o,n,null)}return;default:if(Ct(t)){for(u in n)n.hasOwnProperty(u)&&(void 0!==(o=n[u])&&Zc(e,t,u,o,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(null!=(o=n[l])&&Xc(e,t,l,o,n,null))}var tu=null,nu=null;function ru(e){return 9===e.nodeType?e:e.ownerDocument}function ou(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function iu(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function au(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var su=null;var lu="function"===typeof setTimeout?setTimeout:void 0,du="function"===typeof clearTimeout?clearTimeout:void 0,cu="function"===typeof Promise?Promise:void 0,uu="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof cu?function(e){return cu.resolve(null).then(e).catch(pu)}:lu;function pu(e){setTimeout(function(){throw e})}function hu(e){return"head"===e}function mu(e,t){var n=t,r=0,o=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&8===i.nodeType)if("/$"===(n=i.data)){if(0<r&&8>r){n=r;var a=e.ownerDocument;if(1&n&&wu(a.documentElement),2&n&&wu(a.body),4&n)for(wu(n=a.head),a=n.firstChild;a;){var s=a.nextSibling,l=a.nodeName;a[De]||"SCRIPT"===l||"STYLE"===l||"LINK"===l&&"stylesheet"===a.rel.toLowerCase()||n.removeChild(a),a=s}}if(0===o)return e.removeChild(i),void Fp(t);o--}else"$"===n||"$?"===n||"$!"===n?o++:r=n.charCodeAt(0)-48;else r=0;n=i}while(n);Fp(t)}function gu(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":gu(n),Ne(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===n.rel.toLowerCase())continue}e.removeChild(n)}}function fu(e){return"$!"===e.data||"$?"===e.data&&"complete"===e.ownerDocument.readyState}function xu(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"F!"===t||"F"===t)break;if("/$"===t)return null}}return e}var yu=null;function bu(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}function vu(e,t,n){switch(t=ru(n),e){case"html":if(!(e=t.documentElement))throw Error(a(452));return e;case"head":if(!(e=t.head))throw Error(a(453));return e;case"body":if(!(e=t.body))throw Error(a(454));return e;default:throw Error(a(451))}}function wu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ne(e)}var ju=new Map,ku=new Set;function Su(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Au=O.d;O.d={f:function(){var e=Au.f(),t=Ld();return e||t},r:function(e){var t=qe(e);null!==t&&5===t.tag&&"form"===t.type?Ra(t):Au.r(e)},D:function(e){Au.D(e),Fu("dns-prefetch",e,null)},C:function(e,t){Au.C(e,t),Fu("preconnect",e,t)},L:function(e,t,n){Au.L(e,t,n);var r=Cu;if(r&&e&&t){var o='link[rel="preload"][as="'+gt(t)+'"]';"image"===t&&n&&n.imageSrcSet?(o+='[imagesrcset="'+gt(n.imageSrcSet)+'"]',"string"===typeof n.imageSizes&&(o+='[imagesizes="'+gt(n.imageSizes)+'"]')):o+='[href="'+gt(e)+'"]';var i=o;switch(t){case"style":i=Eu(e);break;case"script":i=zu(e)}ju.has(i)||(e=p({rel:"preload",href:"image"===t&&n&&n.imageSrcSet?void 0:e,as:t},n),ju.set(i,e),null!==r.querySelector(o)||"style"===t&&r.querySelector(Pu(i))||"script"===t&&r.querySelector(Ru(i))||(eu(t=r.createElement("link"),"link",e),Ue(t),r.head.appendChild(t)))}},m:function(e,t){Au.m(e,t);var n=Cu;if(n&&e){var r=t&&"string"===typeof t.as?t.as:"script",o='link[rel="modulepreload"][as="'+gt(r)+'"][href="'+gt(e)+'"]',i=o;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=zu(e)}if(!ju.has(i)&&(e=p({rel:"modulepreload",href:e},t),ju.set(i,e),null===n.querySelector(o))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ru(i)))return}eu(r=n.createElement("link"),"link",e),Ue(r),n.head.appendChild(r)}}},X:function(e,t){Au.X(e,t);var n=Cu;if(n&&e){var r=We(n).hoistableScripts,o=zu(e),i=r.get(o);i||((i=n.querySelector(Ru(o)))||(e=p({src:e,async:!0},t),(t=ju.get(o))&&$u(e,t),Ue(i=n.createElement("script")),eu(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(o,i))}},S:function(e,t,n){Au.S(e,t,n);var r=Cu;if(r&&e){var o=We(r).hoistableStyles,i=Eu(e);t=t||"default";var a=o.get(i);if(!a){var s={loading:0,preload:null};if(a=r.querySelector(Pu(i)))s.loading=5;else{e=p({rel:"stylesheet",href:e,"data-precedence":t},n),(n=ju.get(i))&&Iu(e,n);var l=a=r.createElement("link");Ue(l),eu(l,"link",e),l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),l.addEventListener("load",function(){s.loading|=1}),l.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Ou(a,t,r)}a={type:"stylesheet",instance:a,count:1,state:s},o.set(i,a)}}},M:function(e,t){Au.M(e,t);var n=Cu;if(n&&e){var r=We(n).hoistableScripts,o=zu(e),i=r.get(o);i||((i=n.querySelector(Ru(o)))||(e=p({src:e,async:!0,type:"module"},t),(t=ju.get(o))&&$u(e,t),Ue(i=n.createElement("script")),eu(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(o,i))}}};var Cu="undefined"===typeof document?null:document;function Fu(e,t,n){var r=Cu;if(r&&"string"===typeof t&&t){var o=gt(t);o='link[rel="'+e+'"][href="'+o+'"]',"string"===typeof n&&(o+='[crossorigin="'+n+'"]'),ku.has(o)||(ku.add(o),e={rel:e,crossOrigin:n,href:t},null===r.querySelector(o)&&(eu(t=r.createElement("link"),"link",e),Ue(t),r.head.appendChild(t)))}}function _u(e,t,n,r){var o,i,s,l,d=(d=W.current)?Su(d):null;if(!d)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof n.precedence&&"string"===typeof n.href?(t=Eu(n.href),(r=(n=We(d).hoistableStyles).get(t))||(r={type:"style",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===n.rel&&"string"===typeof n.href&&"string"===typeof n.precedence){e=Eu(n.href);var c=We(d).hoistableStyles,u=c.get(e);if(u||(d=d.ownerDocument||d,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,u),(c=d.querySelector(Pu(e)))&&!c._p&&(u.instance=c,u.state.loading=5),ju.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ju.set(e,n),c||(o=d,i=e,s=n,l=u.state,o.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=o.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),eu(i,"link",s),Ue(i),o.head.appendChild(i))))),t&&null===r)throw Error(a(528,""));return u}if(t&&null!==r)throw Error(a(529,""));return null;case"script":return t=n.async,"string"===typeof(n=n.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=zu(n),(r=(n=We(d).hoistableScripts).get(t))||(r={type:"script",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Eu(e){return'href="'+gt(e)+'"'}function Pu(e){return'link[rel="stylesheet"]['+e+"]"}function Bu(e){return p({},e,{"data-precedence":e.precedence,precedence:null})}function zu(e){return'[src="'+gt(e)+'"]'}function Ru(e){return"script[async]"+e}function Tu(e,t,n){if(t.count++,null===t.instance)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+gt(n.href)+'"]');if(r)return t.instance=r,Ue(r),r;var o=p({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return Ue(r=(e.ownerDocument||e).createElement("style")),eu(r,"style",o),Ou(r,n.precedence,e),t.instance=r;case"stylesheet":o=Eu(n.href);var i=e.querySelector(Pu(o));if(i)return t.state.loading|=4,t.instance=i,Ue(i),i;r=Bu(n),(o=ju.get(o))&&Iu(r,o),Ue(i=(e.ownerDocument||e).createElement("link"));var s=i;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),eu(i,"link",r),t.state.loading|=4,Ou(i,n.precedence,e),t.instance=i;case"script":return i=zu(n.src),(o=e.querySelector(Ru(i)))?(t.instance=o,Ue(o),o):(r=n,(o=ju.get(i))&&$u(r=p({},n),o),Ue(o=(e=e.ownerDocument||e).createElement("script")),eu(o,"link",r),e.head.appendChild(o),t.instance=o);case"void":return null;default:throw Error(a(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(r=t.instance,t.state.loading|=4,Ou(r,n.precedence,e));return t.instance}function Ou(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=r.length?r[r.length-1]:null,i=o,a=0;a<r.length;a++){var s=r[a];if(s.dataset.precedence===t)i=s;else if(i!==o)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=9===n.nodeType?n.head:n).insertBefore(e,t.firstChild)}function Iu(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function $u(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var Mu=null;function Du(e,t,n){if(null===Mu){var r=new Map,o=Mu=new Map;o.set(n,r)}else(r=(o=Mu).get(n))||(r=new Map,o.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),o=0;o<n.length;o++){var i=n[o];if(!(i[De]||i[ze]||"link"===e&&"stylesheet"===i.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==i.namespaceURI){var a=i.getAttribute(t)||"";a=e+a;var s=r.get(a);s?s.push(i):r.set(a,[i])}}return r}function Nu(e,t,n){(e=e.ownerDocument||e).head.insertBefore(n,"title"===t?e.querySelector("head > title"):null)}function Lu(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var qu=null;function Hu(){}function Wu(){if(this.count--,0===this.count)if(this.stylesheets)Gu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var Uu=null;function Gu(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,Uu=new Map,t.forEach(Yu,e),Uu=null,Wu.call(e))}function Yu(e,t){if(!(4&t.state.loading)){var n=Uu.get(e);if(n)var r=n.get(null);else{n=new Map,Uu.set(e,n);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<o.length;i++){var a=o[i];"LINK"!==a.nodeName&&"not all"===a.getAttribute("media")||(n.set(a.dataset.precedence,a),r=a)}r&&n.set(null,r)}a=(o=t.instance).getAttribute("data-precedence"),(i=n.get(a)||r)===r&&n.set(null,o),n.set(a,o),this.count++,r=Wu.bind(this),o.addEventListener("load",r),o.addEventListener("error",r),i?i.parentNode.insertBefore(o,i.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(o,e.firstChild),t.state.loading|=4}}var Vu={$$typeof:w,Provider:null,Consumer:null,_currentValue:I,_currentValue2:I,_threadCount:0};function Qu(e,t,n,r,o,i,a,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Se(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Se(0),this.hiddenUpdates=Se(null),this.identifierPrefix=r,this.onUncaughtError=o,this.onCaughtError=i,this.onRecoverableError=a,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function Ku(e,t,n,r,o,i,a,s,l,d,c,u){return e=new Qu(e,t,n,a,s,l,d,u),t=1,!0===i&&(t|=24),i=Ir(3,null,null,t),e.current=i,i.stateNode=e,(t=To()).refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:r,isDehydrated:n,cache:t},ri(i),e}function Ju(e){return e?e=Tr:Tr}function Xu(e,t,n,r,o,i){o=Ju(o),null===r.context?r.context=o:r.pendingContext=o,(r=ii(t)).payload={element:n},null!==(i=void 0===i?null:i)&&(r.callback=i),null!==(n=ai(e,r,t))&&(Id(n,0,t),si(n,e,t))}function Zu(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function ep(e,t){Zu(e,t),(e=e.alternate)&&Zu(e,t)}function tp(e){if(13===e.tag){var t=Br(e,67108864);null!==t&&Id(t,0,67108864),ep(e,67108864)}}var np=!0;function rp(e,t,n,r){var o=T.T;T.T=null;var i=O.p;try{O.p=2,ip(e,t,n,r)}finally{O.p=i,T.T=o}}function op(e,t,n,r){var o=T.T;T.T=null;var i=O.p;try{O.p=8,ip(e,t,n,r)}finally{O.p=i,T.T=o}}function ip(e,t,n,r){if(np){var o=ap(r);if(null===o)qc(e,t,r,sp,n),yp(e,r);else if(function(e,t,n,r,o){switch(t){case"focusin":return up=bp(up,e,t,n,r,o),!0;case"dragenter":return pp=bp(pp,e,t,n,r,o),!0;case"mouseover":return hp=bp(hp,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return mp.set(i,bp(mp.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,gp.set(i,bp(gp.get(i)||null,e,t,n,r,o)),!0}return!1}(o,e,t,n,r))r.stopPropagation();else if(yp(e,r),4&t&&-1<xp.indexOf(e)){for(;null!==o;){var i=qe(o);if(null!==i)switch(i.tag){case 3:if((i=i.stateNode).current.memoizedState.isDehydrated){var a=ye(i.pendingLanes);if(0!==a){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;a;){var l=1<<31-he(a);s.entanglements[1]|=l,a&=~l}jc(i),0===(6&nd)&&(jd=te()+500,kc(0,!1))}}break;case 13:null!==(s=Br(i,2))&&Id(s,0,2),Ld(),ep(i,2)}if(null===(i=ap(r))&&qc(e,t,r,sp,n),i===o)break;o=i}null!==o&&r.stopPropagation()}else qc(e,t,r,null,n)}}function ap(e){return lp(e=Bt(e))}var sp=null;function lp(e){if(sp=null,null!==(e=Le(e))){var t=l(e);if(null===t)e=null;else{var n=t.tag;if(13===n){if(null!==(e=d(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return sp=e,null}function dp(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ne()){case re:return 2;case oe:return 8;case ie:case ae:return 32;case se:return 268435456;default:return 32}default:return 32}}var cp=!1,up=null,pp=null,hp=null,mp=new Map,gp=new Map,fp=[],xp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function yp(e,t){switch(e){case"focusin":case"focusout":up=null;break;case"dragenter":case"dragleave":pp=null;break;case"mouseover":case"mouseout":hp=null;break;case"pointerover":case"pointerout":mp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":gp.delete(t.pointerId)}}function bp(e,t,n,r,o,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},null!==t&&(null!==(t=qe(t))&&tp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==o&&-1===t.indexOf(o)&&t.push(o),e)}function vp(e){var t=Le(e.target);if(null!==t){var n=l(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=d(n)))return e.blockedOn=t,void function(e,t){var n=O.p;try{return O.p=e,t()}finally{O.p=n}}(e.priority,function(){if(13===n.tag){var e=Td();e=_e(e);var t=Br(n,e);null!==t&&Id(t,0,e),ep(n,e)}})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function wp(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=ap(e.nativeEvent);if(null!==n)return null!==(t=qe(n))&&tp(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);Pt=r,n.target.dispatchEvent(r),Pt=null,t.shift()}return!0}function jp(e,t,n){wp(e)&&n.delete(t)}function kp(){cp=!1,null!==up&&wp(up)&&(up=null),null!==pp&&wp(pp)&&(pp=null),null!==hp&&wp(hp)&&(hp=null),mp.forEach(jp),gp.forEach(jp)}function Sp(e,t){e.blockedOn===t&&(e.blockedOn=null,cp||(cp=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,kp)))}var Ap=null;function Cp(e){Ap!==e&&(Ap=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Ap===e&&(Ap=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],o=e[t+2];if("function"!==typeof r){if(null===lp(r||n))continue;break}var i=qe(n);null!==i&&(e.splice(t,3),t-=3,Ba(i,{pending:!0,data:o,method:n.method,action:r},r,o))}}))}function Fp(e){function t(t){return Sp(t,e)}null!==up&&Sp(up,e),null!==pp&&Sp(pp,e),null!==hp&&Sp(hp,e),mp.forEach(t),gp.forEach(t);for(var n=0;n<fp.length;n++){var r=fp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<fp.length&&null===(n=fp[0]).blockedOn;)vp(n),null===n.blockedOn&&fp.shift();if(null!=(n=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<n.length;r+=3){var o=n[r],i=n[r+1],a=o[Re]||null;if("function"===typeof i)a||Cp(n);else if(a){var s=null;if(i&&i.hasAttribute("formAction")){if(o=i,a=i[Re]||null)s=a.formAction;else if(null!==lp(o))continue}else s=a.action;"function"===typeof s?n[r+1]=s:(n.splice(r,3),r-=3),Cp(n)}}}function _p(e){this._internalRoot=e}function Ep(e){this._internalRoot=e}Ep.prototype.render=_p.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(a(409));Xu(t.current,Td(),e,t,null,null)},Ep.prototype.unmount=_p.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;Xu(e.current,2,null,e,null,null),Ld(),t[Te]=null}},Ep.prototype.unstable_scheduleHydration=function(e){if(e){var t=Pe();e={blockedOn:null,target:e,priority:t};for(var n=0;n<fp.length&&0!==t&&t<fp[n].priority;n++);fp.splice(n,0,e),0===n&&vp(e)}};var Pp=o.version;if("19.1.0"!==Pp)throw Error(a(527,Pp,"19.1.0"));O.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(a(188));throw e=Object.keys(e).join(","),Error(a(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=l(e)))throw Error(a(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(null===o)break;var i=o.alternate;if(null===i){if(null!==(r=o.return)){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return c(o),e;if(i===r)return c(o),t;i=i.sibling}throw Error(a(188))}if(n.return!==r.return)n=o,r=i;else{for(var s=!1,d=o.child;d;){if(d===n){s=!0,n=o,r=i;break}if(d===r){s=!0,r=o,n=i;break}d=d.sibling}if(!s){for(d=i.child;d;){if(d===n){s=!0,n=i,r=o;break}if(d===r){s=!0,r=i,n=o;break}d=d.sibling}if(!s)throw Error(a(189))}}if(n.alternate!==r)throw Error(a(190))}if(3!==n.tag)throw Error(a(188));return n.stateNode.current===n?e:t}(t),e=null===(e=null!==e?u(e):null)?null:e.stateNode};var Bp={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:T,reconcilerVersion:"19.1.0"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{ce=zp.inject(Bp),ue=zp}catch(Tp){}}t.createRoot=function(e,t){if(!s(e))throw Error(a(299));var n=!1,r="",o=ys,i=bs,l=vs;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onUncaughtError&&(o=t.onUncaughtError),void 0!==t.onCaughtError&&(i=t.onCaughtError),void 0!==t.onRecoverableError&&(l=t.onRecoverableError),void 0!==t.unstable_transitionCallbacks&&t.unstable_transitionCallbacks),t=Ku(e,1,!1,null,0,n,r,o,i,l,0,null),e[Te]=t.current,Nc(e),new _p(t)},t.hydrateRoot=function(e,t,n){if(!s(e))throw Error(a(299));var r=!1,o="",i=ys,l=bs,d=vs,c=null;return null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(r=!0),void 0!==n.identifierPrefix&&(o=n.identifierPrefix),void 0!==n.onUncaughtError&&(i=n.onUncaughtError),void 0!==n.onCaughtError&&(l=n.onCaughtError),void 0!==n.onRecoverableError&&(d=n.onRecoverableError),void 0!==n.unstable_transitionCallbacks&&n.unstable_transitionCallbacks,void 0!==n.formState&&(c=n.formState)),(t=Ku(e,1,!0,t,0,r,o,i,l,d,0,c)).context=Ju(null),n=t.current,(o=ii(r=_e(r=Td()))).callback=null,ai(n,o,r),n=r,t.current.lanes=n,Ae(t,n),jc(t),e[Te]=t.current,Nc(e),new Ep(t)},t.version="19.1.0"},1352:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(1085)},1367:(e,t,n)=>{"use strict";n.d(t,{As:()=>s,OJ:()=>c});var r=n(9950),o=n(4492),i=n(4414);const a=(0,r.createContext)(void 0),s=()=>{const e=(0,r.useContext)(a);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e},l={"System Admin":["view_all_managers","create_manager","edit_manager","delete_manager","view_all_restaurants","view_system_stats","manage_subscriptions","system_settings","view_all_reports"],"Foodcourt General":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_foodcourt_managers","create_foodcourt_manager","edit_foodcourt_manager","manage_foodcourt_restaurants","view_foodcourt_stats","manage_rent","send_announcements"],"Brand General":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_brand_managers","create_brand_manager","edit_brand_manager","manage_brand_restaurants","view_brand_stats","view_brand_performance","send_announcements"],"Foodcourt Manager":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_assigned_restaurants","manage_rent_settings","support_restaurant_opening","communicate_with_tenants","view_rent_reports"],"Brand Manager":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_brand_restaurants","manage_brand_performance","support_restaurant_opening","communicate_with_franchises","view_brand_reports"],"Restaurant Owner":["view_own_restaurants","view_restaurant_stats","view_restaurant_orders","view_invoices","pay_invoices","view_reports","view_comparison_stats"],"Restaurant Admin":["view_restaurant","edit_restaurant_settings","manage_restaurant_staff","view_restaurant_reports","manage_restaurant_menu","view_restaurant_orders","manage_tables"],Staff:["use_pos","create_order","view_orders","process_payment","view_kitchen_display","view_customer_display"],"Supplier Admin":[]},d={"System Admin":["/pos/admin/*","/pos/basic","/pos/profile"],"Foodcourt General":["/pos/foodcourt/general/*","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/manager/admins","/pos/coupons","/pos/reports","/pos/settings","/pos/profile"],"Brand General":["/pos/brand/general/*","/pos/brand-products","/pos/recipes","/pos/ingredients","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/manager/admins","/pos/coupons","/pos/reports","/pos/settings","/pos/profile"],"Foodcourt Manager":["/pos/foodcourt/*","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/manager/admins","/pos/coupons","/pos/reports","/pos/settings","/pos/profile"],"Brand Manager":["/pos/brand/*","/pos/brand-products","/pos/recipes","/pos/ingredients","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/manager/admins","/pos/coupons","/pos/reports","/pos/settings","/pos/profile"],"Restaurant Owner":["/pos/owner/*","/pos/profile"],"Restaurant Admin":["/pos/restaurant/*","/restaurant/:restaurantId/*","/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/manager/admins","/pos/coupons","/pos/reports","/pos/settings","/pos/company-information","/pos/profile","/pos/inventory","/pos/support","/pos/operation-inquiry","/pos/invoices","/pos/history"],Staff:["/restaurant/:restaurantId/*","/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/coupons","/pos/reports","/pos/settings","/pos/company-information","/pos/profile","/pos/inventory","/pos/support","/pos/operation-inquiry","/pos/invoices","/pos/history"],"Supplier Admin":[]},c=e=>{let{children:t}=e;const[n,s]=(0,r.useState)(null),[c,u]=(0,r.useState)(!0),p=(0,o.Zp)();(0,r.useEffect)(()=>{(async()=>{try{const r=localStorage.getItem("auth_token");if(!r)return void u(!1);const o=await fetch("/api/auth/me",{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const r=await o.json();if(r.success&&r.data){var e,t,n;const o=r.data,i="Staff"!==o.role&&"Brand Manager"!==o.role&&"Foodcourt Manager"!==o.role||!Array.isArray(o.permissions)?l[o.role]||[]:o.permissions,a={id:(null===(e=o.id)||void 0===e?void 0:e.toString())||"1",email:o.email,name:o.username||o.email.split("@")[0],role:o.role,restaurantId:(null===(t=o.restaurant_id)||void 0===t?void 0:t.toString())||null,managerId:(null===(n=o.manager_id)||void 0===n?void 0:n.toString())||null,brand_id:o.brand_id||null,foodcourt_id:o.foodcourt_id||null,permissions:i,restaurantStatus:o.restaurantStatus,restaurantName:o.restaurantName};s(a)}}else localStorage.removeItem("auth_token")}catch(r){localStorage.removeItem("auth_token")}u(!1)})()},[]);const h=r.useRef(null),m=async()=>{var e,t;try{const e=window.__originalFetch||window.fetch;await e("/api/auth/logout",{method:"POST",credentials:"include"})}catch(o){}const r=(null===n||void 0===n||null===(e=n.email)||void 0===e?void 0:e.includes("demo-"))||(null===n||void 0===n||null===(t=n.email)||void 0===t?void 0:t.includes("@purplehere.com"));s(null),localStorage.removeItem("auth_token"),localStorage.removeItem("user"),p(r?"/demo":"/pos")};h.current=m,(0,r.useEffect)(()=>{if(window.__fetchInterceptorInstalled)return;window.__fetchInterceptorInstalled=!0;const e=window.fetch.bind(window);return window.__originalFetch=e,window.fetch=async function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];const o=await e(...n);if(401===o.status){var i;const e="string"===typeof n[0]?n[0]:(null===(i=n[0])||void 0===i?void 0:i.url)||"";!(e.includes("/api/auth/login")||e.includes("/api/auth/register")||e.includes("/api/auth/signup"))&&localStorage.getItem("auth_token")&&(console.log("[Auth] Token expired - auto logout"),localStorage.removeItem("auth_token"),localStorage.removeItem("user"),h.current&&h.current())}return o},()=>{window.fetch=e,window.__fetchInterceptorInstalled=!1}},[]);const g={user:n,isAuthenticated:!!n,isLoading:c,login:async(e,t)=>{try{const a=await fetch("/api/auth/login",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})});if(a.ok){const e=await a.json();if(e.success&&e.data){var n,r,o;const t=e.data.user;let a=null,d=null;if(t.restaurant_id)try{const e=await fetch(`/api/restaurants/${t.restaurant_id}`);if(e.ok){const t=await e.json();a=t.status,d=t.name}}catch(i){}const c="Staff"===t.role&&Array.isArray(t.permissions)?t.permissions:l[t.role]||[],u={id:(null===(n=t.id)||void 0===n?void 0:n.toString())||"1",email:t.email,name:t.username||t.email.split("@")[0],role:t.role,restaurantId:(null===(r=t.restaurant_id)||void 0===r?void 0:r.toString())||null,managerId:(null===(o=t.manager_id)||void 0===o?void 0:o.toString())||null,brand_id:t.brand_id||null,foodcourt_id:t.foodcourt_id||null,permissions:c,restaurantStatus:a,restaurantName:d};return s(u),localStorage.setItem("auth_token",e.data.token),!0}}return!1}catch(i){return!1}},logout:m,switchUser:(e,t)=>{var n,r,o;const i={id:null===(n=t.id)||void 0===n?void 0:n.toString(),email:t.email,name:t.name||t.username||t.email.split("@")[0],role:t.role,restaurantId:(null===(r=t.restaurant_id)||void 0===r?void 0:r.toString())||null,restaurant_id:t.restaurant_id||null,managerId:(null===(o=t.manager_id)||void 0===o?void 0:o.toString())||null,brand_id:t.brand_id||null,foodcourt_id:t.foodcourt_id||null,permissions:t.permissions||[]};localStorage.setItem("auth_token",e),s(i)},updateUser:e=>{if(!n)return;const t={...n,...e};s(t)},hasPermission:e=>{var t;return n&&(null===(t=n.permissions)||void 0===t?void 0:t.includes(e))||!1},canAccessRoute:e=>{if(!n)return!1;const t=d[n.role];return!!t&&t.some(t=>{if(t.endsWith("/*")){const n=t.slice(0,-2);return e.startsWith(n)}return e===t})}};return(0,i.jsx)(a.Provider,{value:g,children:t})}},1721:(e,t,n)=>{"use strict";n.d(t,{mM:()=>o});var r=n(4752);const o=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &:disabled {
    background-color: #F9FAFB;
    color: #9CA3AF;
    cursor: not-allowed;
    border-color: #E5E7EB;
  }
`;(0,r.Ay)(o)`
  /* 향후 react-select 등과 연동 시 사용 */
`,(0,r.Ay)(o)`
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px; /* iOS 확대 방지 */
    min-width: 120px;
  }
`,(0,r.Ay)(o)`
  ${e=>{switch(e.variant){case"success":return"\n          border-color: #10B981;\n          &:focus { border-color: #059669; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }\n        ";case"warning":return"\n          border-color: #F59E0B;\n          &:focus { border-color: #D97706; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1); }\n        ";case"danger":return"\n          border-color: #EF4444;\n          &:focus { border-color: #DC2626; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); }\n        ";default:return""}}}
`,(0,r.Ay)(o)`
  padding: 8px 12px;
  font-size: 13px;
  min-width: 120px;
`,(0,r.Ay)(o)`
  padding: 16px 20px;
  font-size: 16px;
  min-width: 200px;
`},1863:(e,t,n)=>{"use strict";var r=n(9950);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var a={d:{f:i,r:function(){throw Error(o(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},s=Symbol.for("react.portal");var l=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(o(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:s,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.flushSync=function(e){var t=l.T,n=a.p;try{if(l.T=null,a.p=2,e)return e()}finally{l.T=t,a.p=n,a.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,a.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&a.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var n=t.as,r=d(n,t.crossOrigin),o="string"===typeof t.integrity?t.integrity:void 0,i="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?a.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:r,integrity:o,fetchPriority:i}):"script"===n&&a.d.X(e,{crossOrigin:r,integrity:o,fetchPriority:i,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=d(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&a.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var n=t.as,r=d(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var n=d(t.as,t.crossOrigin);a.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else a.d.m(e)},t.requestFormReset=function(e){a.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},t.useFormStatus=function(){return l.H.useHostTransitionStatus()},t.version="19.1.0"},1983:(e,t)=>{"use strict";var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,f={};function x(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||m}function y(){}function b(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||m}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=x.prototype;var v=b.prototype=new y;v.constructor=b,g(v,x.prototype),v.isPureReactComponent=!0;var w=Array.isArray,j={H:null,A:null,T:null,S:null,V:null},k=Object.prototype.hasOwnProperty;function S(e,t,r,o,i,a){return r=a.ref,{$$typeof:n,type:e,key:t,ref:void 0!==r?r:null,props:a}}function A(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var C=/\/+/g;function F(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function _(){}function E(e,t,o,i,a){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l,d,c=!1;if(null===e)c=!0;else switch(s){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case n:case r:c=!0;break;case p:return E((c=e._init)(e._payload),t,o,i,a)}}if(c)return a=a(e),c=""===i?"."+F(e,0):i,w(a)?(o="",null!=c&&(o=c.replace(C,"$&/")+"/"),E(a,t,o,"",function(e){return e})):null!=a&&(A(a)&&(l=a,d=o+(null==a.key||e&&e.key===a.key?"":(""+a.key).replace(C,"$&/")+"/")+c,a=S(l.type,d,void 0,0,0,l.props)),t.push(a)),1;c=0;var u,m=""===i?".":i+":";if(w(e))for(var g=0;g<e.length;g++)c+=E(i=e[g],t,o,s=m+F(i,g),a);else if("function"===typeof(g=null===(u=e)||"object"!==typeof u?null:"function"===typeof(u=h&&u[h]||u["@@iterator"])?u:null))for(e=g.call(e),g=0;!(i=e.next()).done;)c+=E(i=i.value,t,o,s=m+F(i,g++),a);else if("object"===s){if("function"===typeof e.then)return E(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(_,_):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,o,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function P(e,t,n){if(null==e)return e;var r=[],o=0;return E(e,r,"","",function(e){return t.call(n,e,o++)}),r}function B(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var z="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)};function R(){}t.Children={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!A(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=x,t.Fragment=o,t.Profiler=a,t.PureComponent=b,t.StrictMode=i,t.Suspense=c,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return j.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var r=g({},e.props),o=e.key;if(null!=t)for(i in void 0!==t.ref&&void 0,void 0!==t.key&&(o=""+t.key),t)!k.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(r[i]=t[i]);var i=arguments.length-2;if(1===i)r.children=n;else if(1<i){for(var a=Array(i),s=0;s<i;s++)a[s]=arguments[s+2];r.children=a}return S(e.type,o,void 0,0,0,r)},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},t.createElement=function(e,t,n){var r,o={},i=null;if(null!=t)for(r in void 0!==t.key&&(i=""+t.key),t)k.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(o[r]=t[r]);var a=arguments.length-2;if(1===a)o.children=n;else if(1<a){for(var s=Array(a),l=0;l<a;l++)s[l]=arguments[l+2];o.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps)void 0===o[r]&&(o[r]=a[r]);return S(e,i,void 0,0,0,o)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:d,render:e}},t.isValidElement=A,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:B}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=j.T,n={};j.T=n;try{var r=e(),o=j.S;null!==o&&o(n,r),"object"===typeof r&&null!==r&&"function"===typeof r.then&&r.then(R,z)}catch(i){z(i)}finally{j.T=t}},t.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()},t.use=function(e){return j.H.use(e)},t.useActionState=function(e,t,n){return j.H.useActionState(e,t,n)},t.useCallback=function(e,t){return j.H.useCallback(e,t)},t.useContext=function(e){return j.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return j.H.useDeferredValue(e,t)},t.useEffect=function(e,t,n){var r=j.H;if("function"===typeof n)throw Error("useEffect CRUD overload is not enabled in this build of React.");return r.useEffect(e,t)},t.useId=function(){return j.H.useId()},t.useImperativeHandle=function(e,t,n){return j.H.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return j.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return j.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return j.H.useMemo(e,t)},t.useOptimistic=function(e,t){return j.H.useOptimistic(e,t)},t.useReducer=function(e,t,n){return j.H.useReducer(e,t,n)},t.useRef=function(e){return j.H.useRef(e)},t.useState=function(e){return j.H.useState(e)},t.useSyncExternalStore=function(e,t,n){return j.H.useSyncExternalStore(e,t,n)},t.useTransition=function(){return j.H.useTransition()},t.version="19.1.0"},2420:(e,t,n)=>{"use strict";n.d(t,{A:()=>y});var r=n(9950),o=n(4752),i=n(4492),a=n(9037),s=n(9610),l=n(8666),d=n(4414);const c=o.Ay.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 20px;
`,u=o.Ay.button`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: ${e=>e.active?"#635BFF":"#6B7280"};
  border-bottom: 2px solid ${e=>e.active?"#635BFF":"transparent"};
  margin-bottom: -1px;

  &:hover {
    color: ${e=>e.active?"#635BFF":"#374151"};
  }
`,p=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,h=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`,m=o.Ay.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`,g=o.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,f=o.Ay.div`
  min-height: ${e=>e.show?"auto":"0"};
  max-height: ${e=>e.show?"200px":"0"};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  opacity: ${e=>e.show?"1":"0"};
`,x=o.Ay.div`
  padding: 12px;
  background: #FEE2E2;
  border: 1px solid #EF4444;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  line-height: 1.5;
`,y=()=>{const{restaurantId:e}=(0,i.g)(),{showCustomerModal:t,setShowCustomerModal:n,setGuestInfo:o,loginCustomer:y,registerCustomer:b,customerModalMode:v}=(0,a.c)(),[w,j]=(0,r.useState)("login"),[k,S]=(0,r.useState)({name:"",phone:""}),[A,C]=(0,r.useState)({phone:"",password:""}),[F,_]=(0,r.useState)({name:"",phone:"",email:"",password:""}),[E,P]=(0,r.useState)(""),[B,z]=(0,r.useState)(""),[R,T]=(0,r.useState)(!1);(0,r.useEffect)(()=>{t||(j("login"),S({name:"",phone:""}),C({phone:"",password:""}),_({name:"",phone:"",email:"",password:""}),P(""),z(""),T(!1))},[t]);const O=()=>{n(!1)},I=()=>{k.name&&k.phone&&(o({name:k.name,phone:k.phone}),O())},$=async()=>{if(A.phone){P(""),T(!0);try{await y(A.phone,A.password)?O():P("Login failed. Please check your phone number and password.")}catch(e){P(e.message||"Login failed. Please try again.")}finally{T(!1)}}else P("Phone number is required")},M=async()=>{if(F.name&&F.phone)if("member"!==v||F.password&&!(F.password.length<6))if(F.password&&F.password.length>0&&F.password.length<6)z("Password must be at least 6 characters");else{z(""),T(!0);try{await b(F,e),O()}catch(t){z(t.message||"Registration failed. Please try again.")}finally{T(!1)}}else z("Password must be at least 6 characters");else z("Name and phone number are required")};return(0,d.jsxs)(s.aF,{isOpen:t,onClose:O,title:"guest"===v?"Guest Order":"register"===v?"Add New Customer":"login"===w?"Member Login":"Create Account",footer:"guest"===v?(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{children:[(0,d.jsx)(s.yl,{variant:"secondary",onClick:O,children:"Cancel"}),(0,d.jsx)(s.yl,{variant:"primary",disabled:!k.name||!k.phone,onClick:I,children:"Continue"})]}),(0,d.jsx)(f,{show:!1})]}):"register"===v?(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{children:[(0,d.jsx)(s.yl,{variant:"secondary",onClick:O,children:"Cancel"}),(0,d.jsx)(s.yl,{variant:"primary",disabled:!F.name||!F.phone||R,onClick:M,children:R?"Adding...":"Add Customer"})]}),(0,d.jsx)(f,{show:!!B,children:B&&(0,d.jsx)(x,{children:B})})]}):"member"===v?"login"===w?(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{children:[(0,d.jsx)(s.yl,{variant:"secondary",onClick:O,children:"Cancel"}),(0,d.jsx)(s.yl,{variant:"primary",disabled:!A.phone||R,onClick:$,children:R?"Logging in...":"Login"})]}),(0,d.jsx)(f,{show:!!E,children:E&&(0,d.jsx)(x,{children:E})})]}):(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{children:[(0,d.jsx)(s.yl,{variant:"secondary",onClick:O,children:"Cancel"}),(0,d.jsx)(s.yl,{variant:"primary",disabled:!F.name||!F.phone||R,onClick:M,children:R?"Creating...":"Create Account"})]}),(0,d.jsx)(f,{show:!!B,children:B&&(0,d.jsx)(x,{children:B})})]}):null,children:["guest"===v&&(0,d.jsxs)(p,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Your Name *"}),(0,d.jsx)(s.ZQ,{type:"text",placeholder:"Enter your name",value:k.name,onChange:e=>S({...k,name:e.target.value})})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Phone Number *"}),(0,d.jsx)(l.A,{value:k.phone,onChange:e=>S({...k,phone:e}),required:!0})]})]}),"register"===v&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Full Name *"}),(0,d.jsx)(s.ZQ,{type:"text",placeholder:"Enter customer's full name",value:F.name,onChange:e=>{_({...F,name:e.target.value}),z("")},disabled:R})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Phone Number *"}),(0,d.jsx)(l.A,{value:F.phone,onChange:e=>{_({...F,phone:e}),z("")},required:!0,disabled:R})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Email Address"}),(0,d.jsx)(s.ZQ,{type:"email",placeholder:"Enter email (optional)",value:F.email,onChange:e=>{_({...F,email:e.target.value}),z("")},disabled:R})]})]}),"member"===v&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(u,{active:"login"===w,onClick:()=>j("login"),children:"Login"}),(0,d.jsx)(u,{active:"register"===w,onClick:()=>j("register"),children:"Sign Up"})]}),"login"===w&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Phone Number *"}),(0,d.jsx)(l.A,{value:A.phone,onChange:e=>{C({...A,phone:e}),P("")},required:!0,disabled:R})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Password *"}),(0,d.jsx)(s.ZQ,{type:"password",placeholder:"Enter your password",value:A.password,onChange:e=>{C({...A,password:e.target.value}),P("")},disabled:R})]})]}),"register"===w&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Full Name *"}),(0,d.jsx)(s.ZQ,{type:"text",placeholder:"Enter your full name",value:F.name,onChange:e=>{_({...F,name:e.target.value}),z("")},disabled:R})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Phone Number *"}),(0,d.jsx)(l.A,{value:F.phone,onChange:e=>{_({...F,phone:e}),z("")},required:!0,disabled:R})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Email Address"}),(0,d.jsx)(s.ZQ,{type:"email",placeholder:"Enter your email (optional)",value:F.email,onChange:e=>{_({...F,email:e.target.value}),z("")},disabled:R})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(s.lR,{children:"Password *"}),(0,d.jsx)(s.ZQ,{type:"password",placeholder:"Create a password (min 6 characters)",value:F.password,onChange:e=>{_({...F,password:e.target.value}),z("")},disabled:R})]})]})]})]})}},2853:(e,t,n)=>{"use strict";n.d(t,{A0:()=>i,Hj:()=>a,K0:()=>p,Np:()=>d,PM:()=>s,Uj:()=>l,XI:()=>o,pp:()=>h,rA:()=>u,wr:()=>c});var r=n(4752);const o=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`,i=r.Ay.div`
  display: grid;
  grid-template-columns: ${e=>e.columns};
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`,a=r.Ay.div`
  display: grid;
  grid-template-columns: ${e=>e.columns};
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  text-align: center;
  transition: all 0.2s;

  /* 정보/이름/제목 열 좌측 정렬 (MobileValue에 className="col-info") */
  div.col-info {
    text-align: left;
  }

  /* 액션 열 좌측 정렬 (ActionButtons에 className="col-action" 또는 자체 스타일) */
  div.col-action {
    text-align: left;
  }

  /* 금액/가격 열은 우측 정렬 */
  div.col-amount,
  div.col-total,
  div.col-price,
  div.col-fee,
  div.col-salary,
  div.col-revenue,
  div.col-cost,
  div.col-money {
    text-align: right;
  }

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    display: block;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    /* 모바일에서는 모두 좌측 정렬 */
    div.col-info,
    div.col-amount,
    div.col-total,
    div.col-price,
    div.col-fee,
    div.col-salary,
    div.col-revenue,
    div.col-cost,
    div.col-money {
      text-align: left;
    }

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,s=r.Ay.div`
  display: none;
  font-size: 10px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;

  @media (max-width: 1024px) {
    display: block;
  }
`,l=r.Ay.div`
  @media (max-width: 1024px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
  }
`,d=r.Ay.div`
  display: contents;

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`,c=r.Ay.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,u=r.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
    flex: 0 0 auto;
  }
`,p=r.Ay.button`
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  font-size: 13px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  ${e=>{switch(e.variant){case"edit":return"\n          background: #EBF5FF;\n          border: 1px solid #3B82F6;\n          color: #3B82F6;\n          &:hover {\n            background: #DBEAFE;\n            transform: translateY(-1px);\n          }\n        ";case"delete":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";case"view":return"\n          background: #F0FDF4;\n          border: 1px solid #22C55E;\n          color: #22C55E;\n          &:hover {\n            background: #DCFCE7;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            background: #E6EBF1;\n            transform: translateY(-1px);\n          }\n        "}}}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
    min-height: 30px;
  }
`,h=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  grid-column: 1 / -1;

  h3 {
    color: #374151;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #6B7280;
  }

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }
`;r.Ay.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 1024px) {
    display: block;
  }

  tbody {
    @media (max-width: 1024px) {
      display: block;
    }
  }
`,r.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 1024px) {
    display: none;
  }
`,r.Ay.th`
  padding: 14px 16px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,r.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,r.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;
  text-align: ${e=>e.align||"center"};

  @media (max-width: 1024px) {
    flex: ${e=>e.isActions?"1 1 100%":"1 1 calc(50% - 5px)"};
    min-width: ${e=>e.isActions?"auto":"140px"};
    padding: 0;
    border-bottom: none;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: ${e=>e.isActions?"none":"block"};
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    ${e=>e.isActions&&"\n      padding-top: 10px;\n      margin-top: 10px;\n      border-top: 1px solid #F3F4F6;\n    "}
  }
`,r.Ay.tbody``},2924:(e,t,n)=>{"use strict";n.d(t,{FI:()=>s,FS:()=>r,MB:()=>l,jM:()=>o,n4:()=>i,w6:()=>a});const r=[{code:"MY",name:"Malaysia",dialCode:"+60",flag:"\ud83c\uddf2\ud83c\uddfe",minLength:9,maxLength:10},{code:"SG",name:"Singapore",dialCode:"+65",flag:"\ud83c\uddf8\ud83c\uddec",minLength:8,maxLength:8},{code:"TH",name:"Thailand",dialCode:"+66",flag:"\ud83c\uddf9\ud83c\udded",minLength:9,maxLength:9},{code:"KR",name:"South Korea",dialCode:"+82",flag:"\ud83c\uddf0\ud83c\uddf7",minLength:10,maxLength:11},{code:"ID",name:"Indonesia",dialCode:"+62",flag:"\ud83c\uddee\ud83c\udde9",minLength:9,maxLength:12},{code:"PH",name:"Philippines",dialCode:"+63",flag:"\ud83c\uddf5\ud83c\udded",minLength:10,maxLength:10},{code:"VN",name:"Vietnam",dialCode:"+84",flag:"\ud83c\uddfb\ud83c\uddf3",minLength:9,maxLength:10}],o=e=>r.find(t=>t.code===e)||r[0],i=function(e){if(!e)return"";const t=o(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY"),n=t.dialCode.replace("+","");let r=e.replace(/\D/g,"");return r.startsWith(n)?"+"+r:(r.startsWith("0")&&(r=r.substring(1)),t.dialCode+r)},a=function(e){const t=o(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY"),n=e.replace(/\D/g,""),r=t.maxLength;return n.substring(0,r)},s=e=>{if(!e)return"";const t=e.replace(/[^0-9+]/g,"");if(t.startsWith("+60")){const e=t.substring(3);return 9===e.length?`+60 ${e.substring(0,2)}-${e.substring(2,5)} ${e.substring(5)}`:10===e.length?`+60 ${e.substring(0,2)}-${e.substring(2,6)} ${e.substring(6)}`:`+60 ${e}`}if(t.startsWith("+82")){const e=t.substring(3);return e.startsWith("10")&&10===e.length?`+82 ${e.substring(0,2)}-${e.substring(2,6)}-${e.substring(6)}`:e.startsWith("2")&&e.length>=9?`+82 ${e.substring(0,1)}-${e.substring(1,5)}-${e.substring(5)}`:e.length>=10?`+82 ${e.substring(0,2)}-${e.substring(2,6)}-${e.substring(6)}`:`+82 ${e}`}if(t.startsWith("+65")){const e=t.substring(3);return 8===e.length?`+65 ${e.substring(0,4)} ${e.substring(4)}`:`+65 ${e}`}if(t.startsWith("+66")){const e=t.substring(3);return 9===e.length?`+66 ${e.substring(0,2)}-${e.substring(2,5)}-${e.substring(5)}`:`+66 ${e}`}if(t.startsWith("+62")){const e=t.substring(3);return e.length>=10?`+62 ${e.substring(0,3)}-${e.substring(3,7)}-${e.substring(7)}`:`+62 ${e}`}return t},l=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY";if(!e)return"Phone number is required";const n=o(t),r=i(e,t).replace(n.dialCode,"");return r.length<n.minLength?`Phone number must be at least ${n.minLength} digits`:r.length>n.maxLength?`Phone number must be at most ${n.maxLength} digits`:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY";if(!e)return!1;const n=o(t),r=i(e,t).replace(n.dialCode,"");return r.length>=n.minLength&&r.length<=n.maxLength}(e,t)?null:"Please enter a valid phone number"}},3832:(e,t,n)=>{"use strict";n.d(t,{$n:()=>d,UC:()=>l,Y9:()=>i,ex:()=>s,hE:()=>a,mc:()=>o});var r=n(4752);const o=r.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,i=r.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,a=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,s=r.Ay.div`
  display: flex;
  gap: 12px;
`,l=r.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,d=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":default:return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5A54E5;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        ";case"secondary":return"\n          background: #F8F9FA;\n          color: #6B7C93;\n          border: 1px solid #E6EBF1;\n          &:hover {\n            background: #EBEEF2;\n            border-color: #D1D9E0;\n          }\n        ";case"danger":return"\n          background: #DC3545;\n          color: white;\n          &:hover {\n            background: #C82333;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n          }\n        "}}}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`},3916:(e,t)=>{"use strict";var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function o(e,t,r){var o=null;if(void 0!==r&&(o=""+r),void 0!==t.key&&(o=""+t.key),"key"in t)for(var i in r={},t)"key"!==i&&(r[i]=t[i]);else r=t;return t=r.ref,{$$typeof:n,type:e,key:o,ref:void 0!==t?t:null,props:r}}t.Fragment=r,t.jsx=o,t.jsxs=o},4414:(e,t,n)=>{"use strict";e.exports=n(3916)},4492:(e,t,n)=>{"use strict";n.d(t,{BV:()=>ke,C5:()=>be,Kd:()=>it,N_:()=>st,Zp:()=>ne,g:()=>oe,ok:()=>ut,qh:()=>we,sv:()=>ve,zy:()=>Z});var r=n(9950),o=(n(4599),"popstate");function i(){return p(function(e,t){let{pathname:n,search:r,hash:o}=e.location;return d("",{pathname:n,search:r,hash:o},t.state&&t.state.usr||null,t.state&&t.state.key||"default")},function(e,t){return"string"===typeof t?t:c(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function a(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function s(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function l(e,t){return{usr:e.state,key:e.key,idx:t}}function d(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?u(t):t,state:n,key:t&&t.key||r||Math.random().toString(36).substring(2,10)}}function c(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function u(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function p(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:i=document.defaultView,v5Compat:a=!1}=r,s=i.history,c="POP",u=null,p=m();function m(){return(s.state||{idx:null}).idx}function g(){c="POP";let e=m(),t=null==e?null:e-p;p=e,u&&u({action:c,location:x.location,delta:t})}function f(e){return h(e)}null==p&&(p=0,s.replaceState({...s.state,idx:p},""));let x={get action(){return c},get location(){return e(i,s)},listen(e){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(o,g),u=e,()=>{i.removeEventListener(o,g),u=null}},createHref:e=>t(i,e),createURL:f,encodeLocation(e){let t=f(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){c="PUSH";let r=d(x.location,e,t);n&&n(r,e),p=m()+1;let o=l(r,p),h=x.createHref(r);try{s.pushState(o,"",h)}catch(g){if(g instanceof DOMException&&"DataCloneError"===g.name)throw g;i.location.assign(h)}a&&u&&u({action:c,location:x.location,delta:1})},replace:function(e,t){c="REPLACE";let r=d(x.location,e,t);n&&n(r,e),p=m();let o=l(r,p),i=x.createHref(r);s.replaceState(o,"",i),a&&u&&u({action:c,location:x.location,delta:0})},go:e=>s.go(e)};return x}function h(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="http://localhost";"undefined"!==typeof window&&(n="null"!==window.location.origin?window.location.origin:window.location.href),a(n,"No window.location.(origin|href) available to create URL");let r="string"===typeof e?e:c(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}new WeakMap;function m(e,t){return g(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function g(e,t,n,r){let o=P(("string"===typeof t?u(t):t).pathname||"/",n);if(null==o)return null;let i=f(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n]);return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(i);let a=null;for(let s=0;null==a&&s<i.length;++s){let e=E(o);a=C(i[s],e,r)}return a}function f(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=(e,o,i)=>{let s={relativePath:void 0===i?e.path||"":i,caseSensitive:!0===e.caseSensitive,childrenIndex:o,route:e};s.relativePath.startsWith("/")&&(a(s.relativePath.startsWith(r),`Absolute route path "${s.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),s.relativePath=s.relativePath.slice(r.length));let l=O([r,s.relativePath]),d=n.concat(s);e.children&&e.children.length>0&&(a(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),f(e.children,t,d,l)),(null!=e.path||e.index)&&t.push({path:l,score:A(l,e.index),routesMeta:d})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let n of x(e.path))o(e,t,n);else o(e,t)}),t}function x(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(0===r.length)return o?[i,""]:[i];let a=x(r.join("/")),s=[];return s.push(...a.map(e=>""===e?i:[i,e].join("/"))),o&&s.push(...a),s.map(t=>e.startsWith("/")&&""===t?"/":t)}var y=/^:[\w-]+$/,b=3,v=2,w=1,j=10,k=-2,S=e=>"*"===e;function A(e,t){let n=e.split("/"),r=n.length;return n.some(S)&&(r+=k),t&&(r+=v),n.filter(e=>!S(e)).reduce((e,t)=>e+(y.test(t)?b:""===t?w:j),r)}function C(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:r}=e,o={},i="/",a=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,d="/"===i?t:t.slice(i.length)||"/",c=F({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},d),u=e.route;if(!c&&l&&n&&!r[r.length-1].route.index&&(c=F({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},d)),!c)return null;Object.assign(o,c.params),a.push({params:o,pathname:O([i,c.pathname]),pathnameBase:I(O([i,c.pathnameBase])),route:u}),"/"!==c.pathnameBase&&(i=O([i,c.pathnameBase]))}return a}function F(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=_(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],a=i.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:o}=t;if("*"===r){let e=s[n]||"";a=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=o&&!l?void 0:(l||"").replace(/%2F/g,"/"),e},{}),pathname:i,pathnameBase:a,pattern:e}}function _(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];s("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":""!==e&&"/"!==e&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function E(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return s(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function P(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function B(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function z(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function R(e){let t=z(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function T(e,t,n){let r,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?r=u(e):(r={...e},a(!r.pathname||!r.pathname.includes("?"),B("?","pathname","search",r)),a(!r.pathname||!r.pathname.includes("#"),B("#","pathname","hash",r)),a(!r.search||!r.search.includes("#"),B("#","search","hash",r)));let i,s=""===e||""===r.pathname,l=s?"/":r.pathname;if(null==l)i=n;else{let e=t.length-1;if(!o&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;r.pathname=t.join("/")}i=e>=0?t[e]:"/"}let d=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:n,search:r="",hash:o=""}="string"===typeof e?u(e):e,i=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)}),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:i,search:$(r),hash:M(o)}}(r,i),c=l&&"/"!==l&&l.endsWith("/"),p=(s||"."===l)&&n.endsWith("/");return d.pathname.endsWith("/")||!c&&!p||(d.pathname+="/"),d}var O=e=>e.join("/").replace(/\/\/+/g,"/"),I=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),$=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",M=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";function D(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}var N=["POST","PUT","PATCH","DELETE"],L=(new Set(N),["GET",...N]);new Set(L),Symbol("ResetLoaderData");var q=r.createContext(null);q.displayName="DataRouter";var H=r.createContext(null);H.displayName="DataRouterState";var W=r.createContext({isTransitioning:!1});W.displayName="ViewTransition";var U=r.createContext(new Map);U.displayName="Fetchers";var G=r.createContext(null);G.displayName="Await";var Y=r.createContext(null);Y.displayName="Navigation";var V=r.createContext(null);V.displayName="Location";var Q=r.createContext({outlet:null,matches:[],isDataRoute:!1});Q.displayName="Route";var K=r.createContext(null);K.displayName="RouteError";var J=!0;function X(){return null!=r.useContext(V)}function Z(){return a(X(),"useLocation() may be used only in the context of a <Router> component."),r.useContext(V).location}var ee="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function te(e){r.useContext(Y).static||r.useLayoutEffect(e)}function ne(){let{isDataRoute:e}=r.useContext(Q);return e?function(){let{router:e}=he("useNavigate"),t=ge("useNavigate"),n=r.useRef(!1);te(()=>{n.current=!0});let o=r.useCallback(async function(r){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(n.current,ee),n.current&&("number"===typeof r?e.navigate(r):await e.navigate(r,{fromRouteId:t,...o}))},[e,t]);return o}():function(){a(X(),"useNavigate() may be used only in the context of a <Router> component.");let e=r.useContext(q),{basename:t,navigator:n}=r.useContext(Y),{matches:o}=r.useContext(Q),{pathname:i}=Z(),l=JSON.stringify(R(o)),d=r.useRef(!1);te(()=>{d.current=!0});let c=r.useCallback(function(r){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(s(d.current,ee),!d.current)return;if("number"===typeof r)return void n.go(r);let a=T(r,JSON.parse(l),i,"path"===o.relative);null==e&&"/"!==t&&(a.pathname="/"===a.pathname?t:O([t,a.pathname])),(o.replace?n.replace:n.push)(a,o.state,o)},[t,n,l,i,e]);return c}()}var re=r.createContext(null);function oe(){let{matches:e}=r.useContext(Q),t=e[e.length-1];return t?t.params:{}}function ie(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:n}=r.useContext(Q),{pathname:o}=Z(),i=JSON.stringify(R(n));return r.useMemo(()=>T(e,JSON.parse(i),o,"path"===t),[e,i,o,t])}function ae(e,t,n,o){a(X(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=r.useContext(Y),{matches:l}=r.useContext(Q),d=l[l.length-1],c=d?d.params:{},p=d?d.pathname:"/",h=d?d.pathnameBase:"/",g=d&&d.route;if(J){let e=g&&g.path||"";ye(p,!g||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let f,x=Z();if(t){let e="string"===typeof t?u(t):t;a("/"===h||e.pathname?.startsWith(h),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${h}" but pathname "${e.pathname}" was given in the \`location\` prop.`),f=e}else f=x;let y=f.pathname||"/",b=y;if("/"!==h){let e=h.replace(/^\//,"").split("/");b="/"+y.replace(/^\//,"").split("/").slice(e.length).join("/")}let v=m(e,{pathname:b});J&&(s(g||null!=v,`No routes matched location "${f.pathname}${f.search}${f.hash}" `),s(null==v||void 0!==v[v.length-1].route.element||void 0!==v[v.length-1].route.Component||void 0!==v[v.length-1].route.lazy,`Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`));let w=ue(v&&v.map(e=>Object.assign({},e,{params:Object.assign({},c,e.params),pathname:O([h,i.encodeLocation?i.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?h:O([h,i.encodeLocation?i.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),l,n,o);return t&&w?r.createElement(V.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...f},navigationType:"POP"}},w):w}function se(){let e=fe(),t=D(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:o},a={padding:"2px 4px",backgroundColor:o},s=null;return J&&(console.error("Error handled by React Router default ErrorBoundary:",e),s=r.createElement(r.Fragment,null,r.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),r.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",r.createElement("code",{style:a},"ErrorBoundary")," or"," ",r.createElement("code",{style:a},"errorElement")," prop on your route."))),r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:i},n):null,s)}var le=r.createElement(se,null),de=class extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?r.createElement(Q.Provider,{value:this.props.routeContext},r.createElement(K.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function ce(e){let{routeContext:t,match:n,children:o}=e,i=r.useContext(q);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(Q.Provider,{value:t},o)}function ue(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(null==e){if(!n)return null;if(n.errors)e=n.matches;else{if(0!==t.length||n.initialized||!(n.matches.length>0))return null;e=n.matches}}let o=e,i=n?.errors;if(null!=i){let e=o.findIndex(e=>e.route.id&&void 0!==i?.[e.route.id]);a(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),o=o.slice(0,Math.min(o.length,e+1))}let s=!1,l=-1;if(n)for(let r=0;r<o.length;r++){let e=o[r];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(l=r),e.route.id){let{loaderData:t,errors:r}=n,i=e.route.loader&&!t.hasOwnProperty(e.route.id)&&(!r||void 0===r[e.route.id]);if(e.route.lazy||i){s=!0,o=l>=0?o.slice(0,l+1):[o[0]];break}}}return o.reduceRight((e,a,d)=>{let c,u=!1,p=null,h=null;n&&(c=i&&a.route.id?i[a.route.id]:void 0,p=a.route.errorElement||le,s&&(l<0&&0===d?(ye("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),u=!0,h=null):l===d&&(u=!0,h=a.route.hydrateFallbackElement||null)));let m=t.concat(o.slice(0,d+1)),g=()=>{let t;return t=c?p:u?h:a.route.Component?r.createElement(a.route.Component,null):a.route.element?a.route.element:e,r.createElement(ce,{match:a,routeContext:{outlet:e,matches:m,isDataRoute:null!=n},children:t})};return n&&(a.route.ErrorBoundary||a.route.errorElement||0===d)?r.createElement(de,{location:n.location,revalidation:n.revalidation,component:p,error:c,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):g()},null)}function pe(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function he(e){let t=r.useContext(q);return a(t,pe(e)),t}function me(e){let t=r.useContext(H);return a(t,pe(e)),t}function ge(e){let t=function(e){let t=r.useContext(Q);return a(t,pe(e)),t}(e),n=t.matches[t.matches.length-1];return a(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function fe(){let e=r.useContext(K),t=me("useRouteError"),n=ge("useRouteError");return void 0!==e?e:t.errors?.[n]}var xe={};function ye(e,t,n){t||xe[e]||(xe[e]=!0,s(!1,n))}r.memo(function(e){let{routes:t,future:n,state:r}=e;return ae(t,void 0,r,n)});function be(e){let{to:t,replace:n,state:o,relative:i}=e;a(X(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=r.useContext(Y);s(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:d}=r.useContext(Q),{pathname:c}=Z(),u=ne(),p=T(t,R(d),c,"path"===i),h=JSON.stringify(p);return r.useEffect(()=>{u(JSON.parse(h),{replace:n,state:o,relative:i})},[u,h,i,n,o]),null}function ve(e){return function(e){let t=r.useContext(Q).outlet;return t?r.createElement(re.Provider,{value:e},t):t}(e.context)}function we(e){a(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function je(e){let{basename:t="/",children:n=null,location:o,navigationType:i="POP",navigator:l,static:d=!1}=e;a(!X(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let c=t.replace(/^\/*/,"/"),p=r.useMemo(()=>({basename:c,navigator:l,static:d,future:{}}),[c,l,d]);"string"===typeof o&&(o=u(o));let{pathname:h="/",search:m="",hash:g="",state:f=null,key:x="default"}=o,y=r.useMemo(()=>{let e=P(h,c);return null==e?null:{location:{pathname:e,search:m,hash:g,state:f,key:x},navigationType:i}},[c,h,m,g,f,x,i]);return s(null!=y,`<Router basename="${c}"> is not able to match the URL "${h}${m}${g}" because it does not start with the basename, so the <Router> won't render anything.`),null==y?null:r.createElement(Y.Provider,{value:p},r.createElement(V.Provider,{children:n,value:y}))}function ke(e){let{children:t,location:n}=e;return ae(Se(t),n)}r.Component;function Se(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[];return r.Children.forEach(e,(e,o)=>{if(!r.isValidElement(e))return;let i=[...t,o];if(e.type===r.Fragment)return void n.push.apply(n,Se(e.props.children,i));a(e.type===we,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),a(!e.props.index||!e.props.children,"An index route cannot have child routes.");let s={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(s.children=Se(e.props.children,i)),n.push(s)}),n}var Ae="get",Ce="application/x-www-form-urlencoded";function Fe(e){return null!=e&&"string"===typeof e.tagName}function _e(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}var Ee=null;var Pe=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Be(e){return null==e||Pe.has(e)?e:(s(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ce}"`),null)}function ze(e,t){let n,r,o,i,a;if(Fe(s=e)&&"form"===s.tagName.toLowerCase()){let a=e.getAttribute("action");r=a?P(a,t):null,n=e.getAttribute("method")||Ae,o=Be(e.getAttribute("enctype"))||Ce,i=new FormData(e)}else if(function(e){return Fe(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Fe(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let a=e.form;if(null==a)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||a.getAttribute("action");if(r=s?P(s,t):null,n=e.getAttribute("formmethod")||a.getAttribute("method")||Ae,o=Be(e.getAttribute("formenctype"))||Be(a.getAttribute("enctype"))||Ce,i=new FormData(a,e),!function(){if(null===Ee)try{new FormData(document.createElement("form"),0),Ee=!1}catch(e){Ee=!0}return Ee}()){let{name:t,type:n,value:r}=e;if("image"===n){let e=t?`${t}.`:"";i.append(`${e}x`,"0"),i.append(`${e}y`,"0")}else t&&i.append(t,r)}}else{if(Fe(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Ae,r=null,o=Ce,a=e}var s;return i&&"text/plain"===o&&(a=i,i=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:i,body:a}}function Re(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}async function Te(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Oe(e){return null!=e&&"string"===typeof e.page}function Ie(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function $e(e,t,n,r,o,i){let a=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith("*")&&n[t].params["*"]!==e.params["*"];return"assets"===i?t.filter((e,t)=>a(e,t)||s(e,t)):"data"===i?t.filter((t,i)=>{let l=r.routes[t.route.id];if(!l||!l.hasLoader)return!1;if(a(t,i)||s(t,i))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof r)return r}return!0}):[]}function Me(e,t){let{includeHydrateFallback:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r=e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let o=[r.module];return r.clientActionModule&&(o=o.concat(r.clientActionModule)),r.clientLoaderModule&&(o=o.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(o=o.concat(r.hydrateFallbackModule)),r.imports&&(o=o.concat(r.imports)),o}).flat(1),[...new Set(r)];var r}function De(e,t){let n=new Set,r=new Set(t);return e.reduce((e,o)=>{if(t&&!Oe(o)&&"script"===o.as&&o.href&&r.has(o.href))return e;let i=JSON.stringify(function(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}(o));return n.has(i)||(n.add(i),e.push({key:i,link:o})),e},[])}function Ne(e){return{__html:e}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;Symbol("SingleFetchRedirect");var Le=new Set([100,101,204,205]);function qe(e,t){let n="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return"/"===n.pathname?n.pathname="_root.data":t&&"/"===P(n.pathname,t)?n.pathname=`${t.replace(/\/$/,"")}/_root.data`:n.pathname=`${n.pathname.replace(/\/$/,"")}.data`,n}r.Component;function He(e){let{error:t,isOutsideRemixApp:n}=e;console.error(t);let o,i=r.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(D(t))return r.createElement(We,{title:"Unhandled Thrown Response!"},r.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),J?i:null);if(t instanceof Error)o=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);o=new Error(e)}return r.createElement(We,{title:"Application Error!",isOutsideRemixApp:n},r.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),r.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},o.stack),i)}function We(e){let{title:t,renderScripts:n,isOutsideRemixApp:o,children:i}=e,{routeModules:a}=Qe();return a.root?.Layout&&!o?i:r.createElement("html",{lang:"en"},r.createElement("head",null,r.createElement("meta",{charSet:"utf-8"}),r.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),r.createElement("title",null,t)),r.createElement("body",null,r.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},i,n?r.createElement(nt,null):null)))}function Ue(e,t){return"lazy"===e.mode&&!0===t}function Ge(){let e=r.useContext(q);return Re(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Ye(){let e=r.useContext(H);return Re(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Ve=r.createContext(void 0);function Qe(){let e=r.useContext(Ve);return Re(e,"You must render this element inside a <HydratedRouter> element"),e}function Ke(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Je(e,t,n){if(n&&!tt)return[e[0]];if(t){let n=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,n+1)}return e}function Xe(e){let{page:t,...n}=e,{router:o}=Ge(),i=r.useMemo(()=>m(o.routes,t,o.basename),[o.routes,t,o.basename]);return i?r.createElement(et,{page:t,matches:i,...n}):null}function Ze(e){let{manifest:t,routeModules:n}=Qe(),[o,i]=r.useState([]);return r.useEffect(()=>{let r=!1;return async function(e,t,n){return De((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Te(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Ie).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),o}function et(e){let{page:t,matches:n,...o}=e,i=Z(),{manifest:a,routeModules:s}=Qe(),{basename:l}=Ge(),{loaderData:d,matches:c}=Ye(),u=r.useMemo(()=>$e(t,n,c,a,i,"data"),[t,n,c,a,i]),p=r.useMemo(()=>$e(t,n,c,a,i,"assets"),[t,n,c,a,i]),h=r.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let e=new Set,r=!1;if(n.forEach(t=>{let n=a.routes[t.route.id];n&&n.hasLoader&&(!u.some(e=>e.route.id===t.route.id)&&t.route.id in d&&s[t.route.id]?.shouldRevalidate||n.hasClientLoader?r=!0:e.add(t.route.id))}),0===e.size)return[];let o=qe(t,l);return r&&e.size>0&&o.searchParams.set("_routes",n.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[o.pathname+o.search]},[l,d,i,a,u,n,t,s]),m=r.useMemo(()=>Me(p,a),[p,a]),g=Ze(p);return r.createElement(r.Fragment,null,h.map(e=>r.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...o})),m.map(e=>r.createElement("link",{key:e,rel:"modulepreload",href:e,...o})),g.map(e=>{let{key:t,link:n}=e;return r.createElement("link",{key:t,...n})}))}Ve.displayName="FrameworkContext";var tt=!1;function nt(e){let{manifest:t,serverHandoffString:n,isSpaMode:o,renderMeta:i,routeDiscovery:a,ssr:s}=Qe(),{router:l,static:d,staticContext:c}=Ge(),{matches:u}=Ye(),p=Ue(a,s);i&&(i.didRenderScripts=!0);let h=Je(u,null,o);r.useEffect(()=>{tt=!0},[]);let g=r.useMemo(()=>{let o=c?`window.__reactRouterContext = ${n};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",i=d?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${p?"":`import ${JSON.stringify(t.url)}`};\n${h.map((e,n)=>{let r=`route${n}`,o=t.routes[e.route.id];Re(o,`Route ${e.route.id} not found in manifest`);let{clientActionModule:i,clientLoaderModule:a,clientMiddlewareModule:s,hydrateFallbackModule:l,module:d}=o,c=[...i?[{module:i,varName:`${r}_clientAction`}]:[],...a?[{module:a,varName:`${r}_clientLoader`}]:[],...s?[{module:s,varName:`${r}_clientMiddleware`}]:[],...l?[{module:l,varName:`${r}_HydrateFallback`}]:[],{module:d,varName:`${r}_main`}];return 1===c.length?`import * as ${r} from ${JSON.stringify(d)};`:[c.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${r} = {${c.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${p?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:n,...r}=e,o=new Set(t.state.matches.map(e=>e.route.id)),i=t.state.location.pathname.split("/").filter(Boolean),a=["/"];for(i.pop();i.length>0;)a.push(`/${i.join("/")}`),i.pop();a.forEach(e=>{let n=m(t.routes,e,t.basename);n&&n.forEach(e=>o.add(e.route.id))});let s=[...o].reduce((e,t)=>Object.assign(e,{[t]:r.routes[t]}),{});return{...r,routes:s,sri:!!n||void 0}}(t,l),null,2)};`:""}\n  window.__reactRouterRouteModules = {${h.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return r.createElement(r.Fragment,null,r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:Ne(o),type:void 0}),r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:Ne(i),type:"module",async:!0}))},[]),f=tt?[]:(x=t.entry.imports.concat(Me(h,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let y="object"===typeof t.sri?t.sri:{};return tt?null:r.createElement(r.Fragment,null,"object"===typeof t.sri?r.createElement("script",{"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:y})}}):null,p?null:r.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:y[t.url],suppressHydrationWarning:!0}),r.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:y[t.entry.module],suppressHydrationWarning:!0}),f.map(t=>r.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:y[t],suppressHydrationWarning:!0})),g)}function rt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}var ot="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{ot&&(window.__reactRouterVersion="7.6.3")}catch(gt){}function it(e){let{basename:t,children:n,window:o}=e,a=r.useRef();null==a.current&&(a.current=i({window:o,v5Compat:!0}));let s=a.current,[l,d]=r.useState({action:s.action,location:s.location}),c=r.useCallback(e=>{r.startTransition(()=>d(e))},[d]);return r.useLayoutEffect(()=>s.listen(c),[s,c]),r.createElement(je,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:s})}var at=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,st=r.forwardRef(function(e,t){let n,{onClick:o,discover:i="render",prefetch:l="none",relative:d,reloadDocument:u,replace:p,state:h,target:m,to:g,preventScrollReset:f,viewTransition:x,...y}=e,{basename:b}=r.useContext(Y),v="string"===typeof g&&at.test(g),w=!1;if("string"===typeof g&&v&&(n=g,ot))try{let e=new URL(window.location.href),t=g.startsWith("//")?new URL(e.protocol+g):new URL(g),n=P(t.pathname,b);t.origin===e.origin&&null!=n?g=n+t.search+t.hash:w=!0}catch(gt){s(!1,`<Link to="${g}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};a(X(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:o}=r.useContext(Y),{hash:i,pathname:s,search:l}=ie(e,{relative:t}),d=s;return"/"!==n&&(d="/"===s?n:O([n,s])),o.createHref({pathname:d,search:l,hash:i})}(g,{relative:d}),[k,S,A]=function(e,t){let n=r.useContext(Ve),[o,i]=r.useState(!1),[a,s]=r.useState(!1),{onFocus:l,onBlur:d,onMouseEnter:c,onMouseLeave:u,onTouchStart:p}=t,h=r.useRef(null);r.useEffect(()=>{if("render"===e&&s(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{s(e.isIntersecting)})},{threshold:.5});return h.current&&e.observe(h.current),()=>{e.disconnect()}}},[e]),r.useEffect(()=>{if(o){let e=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(e)}}},[o]);let m=()=>{i(!0)},g=()=>{i(!1),s(!1)};return n?"intent"!==e?[a,h,{}]:[a,h,{onFocus:Ke(l,m),onBlur:Ke(d,g),onMouseEnter:Ke(c,m),onMouseLeave:Ke(u,g),onTouchStart:Ke(p,m)}]:[!1,h,{}]}(l,y),C=function(e){let{target:t,replace:n,state:o,preventScrollReset:i,relative:a,viewTransition:s}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=ne(),d=Z(),u=ie(e,{relative:a});return r.useCallback(r=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(r,t)){r.preventDefault();let t=void 0!==n?n:c(d)===c(u);l(e,{replace:t,state:o,preventScrollReset:i,relative:a,viewTransition:s})}},[d,l,u,n,o,t,e,i,a,s])}(g,{replace:p,state:h,target:m,preventScrollReset:f,relative:d,viewTransition:x});let F=r.createElement("a",{...y,...A,href:n||j,onClick:w||u?o:function(e){o&&o(e),e.defaultPrevented||C(e)},ref:rt(t,S),target:m,"data-discover":v||"render"!==i?void 0:"true"});return k&&!v?r.createElement(r.Fragment,null,F,r.createElement(Xe,{page:j})):F});st.displayName="Link",r.forwardRef(function(e,t){let{"aria-current":n="page",caseSensitive:o=!1,className:i="",end:s=!1,style:l,to:d,viewTransition:c,children:u,...p}=e,h=ie(d,{relative:p.relative}),m=Z(),g=r.useContext(H),{navigator:f,basename:x}=r.useContext(Y),y=null!=g&&function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.useContext(W);a(null!=n,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:o}=ct("useViewTransitionState"),i=ie(e,{relative:t.relative});if(!n.isTransitioning)return!1;let s=P(n.currentLocation.pathname,o)||n.currentLocation.pathname,l=P(n.nextLocation.pathname,o)||n.nextLocation.pathname;return null!=F(i.pathname,l)||null!=F(i.pathname,s)}(h)&&!0===c,b=f.encodeLocation?f.encodeLocation(h).pathname:h.pathname,v=m.pathname,w=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;o||(v=v.toLowerCase(),w=w?w.toLowerCase():null,b=b.toLowerCase()),w&&x&&(w=P(w,x)||w);const j="/"!==b&&b.endsWith("/")?b.length-1:b.length;let k,S=v===b||!s&&v.startsWith(b)&&"/"===v.charAt(j),A=null!=w&&(w===b||!s&&w.startsWith(b)&&"/"===w.charAt(b.length)),C={isActive:S,isPending:A,isTransitioning:y},_=S?n:void 0;k="function"===typeof i?i(C):[i,S?"active":null,A?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let E="function"===typeof l?l(C):l;return r.createElement(st,{...p,"aria-current":_,className:k,ref:t,style:E,to:d,viewTransition:c},"function"===typeof u?u(C):u)}).displayName="NavLink";var lt=r.forwardRef((e,t)=>{let{discover:n="render",fetcherKey:o,navigate:i,reloadDocument:s,replace:l,state:d,method:u=Ae,action:p,onSubmit:h,relative:m,preventScrollReset:g,viewTransition:f,...x}=e,y=mt(),b=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:n}=r.useContext(Y),o=r.useContext(Q);a(o,"useFormAction must be used inside a RouteContext");let[i]=o.matches.slice(-1),s={...ie(e||".",{relative:t})},l=Z();if(null==e){s.search=l.search;let e=new URLSearchParams(s.search),t=e.getAll("index");if(t.some(e=>""===e)){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let n=e.toString();s.search=n?`?${n}`:""}}e&&"."!==e||!i.route.index||(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index");"/"!==n&&(s.pathname="/"===s.pathname?n:O([n,s.pathname]));return c(s)}(p,{relative:m}),v="get"===u.toLowerCase()?"get":"post",w="string"===typeof p&&at.test(p);return r.createElement("form",{ref:t,method:v,action:b,onSubmit:s?h:e=>{if(h&&h(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,n=t?.getAttribute("formmethod")||u;y(t||e.currentTarget,{fetcherKey:o,method:n,navigate:i,replace:l,state:d,relative:m,preventScrollReset:g,viewTransition:f})},...x,"data-discover":w||"render"!==n?void 0:"true"})});function dt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ct(e){let t=r.useContext(q);return a(t,dt(e)),t}function ut(e){s("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=r.useRef(_e(e)),n=r.useRef(!1),o=Z(),i=r.useMemo(()=>function(e,t){let n=_e(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}(o.search,n.current?null:t.current),[o.search]),a=ne(),l=r.useCallback((e,t)=>{const r=_e("function"===typeof e?e(i):e);n.current=!0,a("?"+r,t)},[a,i]);return[i,l]}lt.displayName="Form";var pt=0,ht=()=>`__${String(++pt)}__`;function mt(){let{router:e}=ct("useSubmit"),{basename:t}=r.useContext(Y),n=ge("useRouteId");return r.useCallback(async function(r){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:i,method:a,encType:s,formData:l,body:d}=ze(r,t);if(!1===o.navigate){let t=o.fetcherKey||ht();await e.fetch(t,n,o.action||i,{preventScrollReset:o.preventScrollReset,formData:l,body:d,formMethod:o.method||a,formEncType:o.encType||s,flushSync:o.flushSync})}else await e.navigate(o.action||i,{preventScrollReset:o.preventScrollReset,formData:l,body:d,formMethod:o.method||a,formEncType:o.encType||s,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,n])}},4599:(e,t)=>{"use strict";const n=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,r=/^[\u0021-\u003A\u003C-\u007E]*$/,o=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,i=/^[\u0020-\u003A\u003D-\u007E]*$/,a=Object.prototype.toString,s=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function l(e,t,n){do{const n=e.charCodeAt(t);if(32!==n&&9!==n)return t}while(++t<n);return n}function d(e,t,n){for(;t>n;){const n=e.charCodeAt(--t);if(32!==n&&9!==n)return t+1}return n}function c(e){if(-1===e.indexOf("%"))return e;try{return decodeURIComponent(e)}catch(t){return e}}},4728:(e,t,n)=>{"use strict";n.d(t,{He:()=>a,Mo:()=>d,SC:()=>o,Wh:()=>i,r6:()=>s,yY:()=>l});var r=n(4752);const o=r.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>{switch(e.size){case"small":return"8px 14px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 6px;
  font-size: ${e=>{switch(e.size){case"small":return"12px";case"large":return"16px";default:return"14px"}}};
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: ${e=>{switch(e.size){case"small":return"28px";case"large":return"48px";default:return"36px"}}};
  width: ${e=>e.fullWidth?"100%":"auto"};

  ${e=>{switch(e.variant){case"primary":default:return r.AH`
          background: #635BFF;
          color: white;
          &:hover:not(:disabled) {
            background: #5A54E5;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
        `;case"secondary":return r.AH`
          background: #F8F9FA;
          color: #6B7C93;
          border: 1px solid #E6EBF1;
          &:hover:not(:disabled) {
            background: #EBEEF2;
            border-color: #D1D9E0;
          }
        `;case"danger":return r.AH`
          background: #DC3545;
          color: white;
          &:hover:not(:disabled) {
            background: #C82333;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
          }
        `;case"success":return r.AH`
          background: #28A745;
          color: white;
          &:hover:not(:disabled) {
            background: #218838;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
          }
        `;case"warning":return r.AH`
          background: #FFC107;
          color: #212529;
          &:hover:not(:disabled) {
            background: #E0A800;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
          }
        `;case"info":return r.AH`
          background: #17A2B8;
          color: white;
          &:hover:not(:disabled) {
            background: #138496;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
          }
        `}}}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.2);
  }
`,i=r.Ay.span`
  display: inline-block;
  padding: ${e=>{switch(e.size){case"small":default:return"4px 12px";case"large":return"8px 16px"}}};
  border-radius: 6px;
  font-size: ${e=>{switch(e.size){case"small":default:return"11px";case"large":return"15px"}}};
  font-weight: 600;
  text-align: center;
  white-space: nowrap;

  ${e=>{switch(e.status){case"draft":default:return r.AH`
          background: #F3F4F6;
          color: #6B7280;
        `;case"pending_payment":case"warning":return r.AH`
          background: #FEF3C7;
          color: #D97706;
        `;case"payment_submitted":case"info":return r.AH`
          background: #DBEAFE;
          color: #2563EB;
        `;case"paid":case"active":case"success":return r.AH`
          background: #ECFDF5;
          color: #059669;
        `;case"overdue":case"error":case"cancelled":case"inactive":return r.AH`
          background: #FEE2E2;
          color: #DC2626;
        `}}}
`,a=(r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 8px 12px;
  min-height: 44px;
`,r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 8px 12px;
  text-align: center;
  line-height: 1.4;
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.3;
  text-align: center;
  gap: 2px;
`,r.Ay.div`
  display: ${e=>!1===e.show?"none":"flex"};
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  min-height: 44px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  transition: all 0.3s ease;

  ${e=>{switch(e.variant){case"success":default:return r.AH`
          background: #ECFDF5;
          color: #059669;
          border: 1px solid #A7F3D0;
        `;case"error":return r.AH`
          background: #FEE2E2;
          color: #DC2626;
          border: 1px solid #FECACA;
        `;case"warning":return r.AH`
          background: #FEF3C7;
          color: #D97706;
          border: 1px solid #FDE68A;
        `;case"info":return r.AH`
          background: #E0F2FE;
          color: #0369A1;
          border: 1px solid #BAE6FD;
        `}}}

  &::before {
    content: '${e=>{switch(e.variant){case"error":return"\u2715";case"warning":return"\u26a0";case"info":return"\u2139";default:return"\u2713"}}}';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${e=>{switch(e.variant){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#0369A1";default:return"#059669"}}};
    color: white;
    font-size: 12px;
    flex-shrink: 0;
  }
`,r.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`),s=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`,l=r.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: ${e=>"secondary"===e.variant?"1px solid #E5E7EB":"none"};
  background: ${e=>"secondary"===e.variant?"white":"#635BFF"};
  color: ${e=>"secondary"===e.variant?"#6B7280":"white"};

  &:hover:not(:disabled) {
    background: ${e=>"secondary"===e.variant?"#F9FAFB":"#5A51E6"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,d=r.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 12px;
  width: 100%;
  box-sizing: border-box;

  ${e=>"success"===e.type?"\n    background: #ECFDF5;\n    color: #059669;\n    border: 1px solid #A7F3D0;\n  ":"\n    background: #FEE2E2;\n    color: #DC2626;\n    border: 1px solid #FECACA;\n  "}
`},4752:(e,t,n)=>{"use strict";n.d(t,{NP:()=>Nt,DU:()=>Kt,AH:()=>Ut,Ay:()=>Vt,i7:()=>Jt});var r=function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.create;function o(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var i=n(9950),a=n(403),s=n.n(a),l="-ms-",d="-moz-",c="-webkit-",u="comm",p="rule",h="decl",m="@keyframes",g=Math.abs,f=String.fromCharCode,x=Object.assign;function y(e){return e.trim()}function b(e,t){return(e=t.exec(e))?e[0]:e}function v(e,t,n){return e.replace(t,n)}function w(e,t,n){return e.indexOf(t,n)}function j(e,t){return 0|e.charCodeAt(t)}function k(e,t,n){return e.slice(t,n)}function S(e){return e.length}function A(e){return e.length}function C(e,t){return t.push(e),e}function F(e,t){return e.filter(function(e){return!b(e,t)})}var _=1,E=1,P=0,B=0,z=0,R="";function T(e,t,n,r,o,i,a,s){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:_,column:E,length:a,return:"",siblings:s}}function O(e,t){return x(T("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function I(e){for(;e.root;)e=O(e.root,{children:[e]});C(e,e.siblings)}function $(){return z=B>0?j(R,--B):0,E--,10===z&&(E=1,_--),z}function M(){return z=B<P?j(R,B++):0,E++,10===z&&(E=1,_++),z}function D(){return j(R,B)}function N(){return B}function L(e,t){return k(R,e,t)}function q(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function H(e){return _=E=1,P=S(R=e),B=0,[]}function W(e){return R="",e}function U(e){return y(L(B-1,V(91===e?e+2:40===e?e+1:e)))}function G(e){for(;(z=D())&&z<33;)M();return q(e)>2||q(z)>3?"":" "}function Y(e,t){for(;--t&&M()&&!(z<48||z>102||z>57&&z<65||z>70&&z<97););return L(e,N()+(t<6&&32==D()&&32==M()))}function V(e){for(;M();)switch(z){case e:return B;case 34:case 39:34!==e&&39!==e&&V(z);break;case 40:41===e&&V(e);break;case 92:M()}return B}function Q(e,t){for(;M()&&e+z!==57&&(e+z!==84||47!==D()););return"/*"+L(t,B-1)+"*"+f(47===e?e:M())}function K(e){for(;!q(D());)M();return L(e,B)}function J(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function X(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case h:return e.return=e.return||e.value;case u:return"";case m:return e.return=e.value+"{"+J(e.children,r)+"}";case p:if(!S(e.value=e.props.join(",")))return""}return S(n=J(e.children,r))?e.return=e.value+"{"+n+"}":""}function Z(e,t,n){switch(function(e,t){return 45^j(e,0)?(((t<<2^j(e,0))<<2^j(e,1))<<2^j(e,2))<<2^j(e,3):0}(e,t)){case 5103:return c+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return c+e+e;case 4789:return d+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return c+e+d+e+l+e+e;case 5936:switch(j(e,t+11)){case 114:return c+e+l+v(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return c+e+l+v(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return c+e+l+v(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return c+e+l+e+e;case 6165:return c+e+l+"flex-"+e+e;case 5187:return c+e+v(e,/(\w+).+(:[^]+)/,c+"box-$1$2"+l+"flex-$1$2")+e;case 5443:return c+e+l+"flex-item-"+v(e,/flex-|-self/g,"")+(b(e,/flex-|baseline/)?"":l+"grid-row-"+v(e,/flex-|-self/g,""))+e;case 4675:return c+e+l+"flex-line-pack"+v(e,/align-content|flex-|-self/g,"")+e;case 5548:return c+e+l+v(e,"shrink","negative")+e;case 5292:return c+e+l+v(e,"basis","preferred-size")+e;case 6060:return c+"box-"+v(e,"-grow","")+c+e+l+v(e,"grow","positive")+e;case 4554:return c+v(e,/([^-])(transform)/g,"$1"+c+"$2")+e;case 6187:return v(v(v(e,/(zoom-|grab)/,c+"$1"),/(image-set)/,c+"$1"),e,"")+e;case 5495:case 3959:return v(e,/(image-set\([^]*)/,c+"$1$`$1");case 4968:return v(v(e,/(.+:)(flex-)?(.*)/,c+"box-pack:$3"+l+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+c+e+e;case 4200:if(!b(e,/flex-|baseline/))return l+"grid-column-align"+k(e,t)+e;break;case 2592:case 3360:return l+v(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,b(e.props,/grid-\w+-end/)})?~w(e+(n=n[t].value),"span",0)?e:l+v(e,"-start","")+e+l+"grid-row-span:"+(~w(n,"span",0)?b(n,/\d+/):+b(n,/\d+/)-+b(e,/\d+/))+";":l+v(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return b(e.props,/grid-\w+-start/)})?e:l+v(v(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return v(e,/(.+)-inline(.+)/,c+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(S(e)-1-t>6)switch(j(e,t+1)){case 109:if(45!==j(e,t+4))break;case 102:return v(e,/(.+:)(.+)-([^]+)/,"$1"+c+"$2-$3$1"+d+(108==j(e,t+3)?"$3":"$2-$3"))+e;case 115:return~w(e,"stretch",0)?Z(v(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return v(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,o,i,a,s){return l+n+":"+r+s+(o?l+n+"-span:"+(i?a:+a-+r)+s:"")+e});case 4949:if(121===j(e,t+6))return v(e,":",":"+c)+e;break;case 6444:switch(j(e,45===j(e,14)?18:11)){case 120:return v(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+c+(45===j(e,14)?"inline-":"")+"box$3$1"+c+"$2$3$1"+l+"$2box$3")+e;case 100:return v(e,":",":"+l)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return v(e,"scroll-","scroll-snap-")+e}return e}function ee(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case h:return void(e.return=Z(e.value,e.length,n));case m:return J([O(e,{value:v(e.value,"@","@"+c)})],r);case p:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(b(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":I(O(e,{props:[v(t,/:(read-\w+)/,":-moz-$1")]})),I(O(e,{props:[t]})),x(e,{props:F(n,r)});break;case"::placeholder":I(O(e,{props:[v(t,/:(plac\w+)/,":"+c+"input-$1")]})),I(O(e,{props:[v(t,/:(plac\w+)/,":-moz-$1")]})),I(O(e,{props:[v(t,/:(plac\w+)/,l+"input-$1")]})),I(O(e,{props:[t]})),x(e,{props:F(n,r)})}return""})}}function te(e){return W(ne("",null,null,null,[""],e=H(e),0,[0],e))}function ne(e,t,n,r,o,i,a,s,l){for(var d=0,c=0,u=a,p=0,h=0,m=0,x=1,y=1,b=1,k=0,A="",F=o,_=i,E=r,P=A;y;)switch(m=k,k=M()){case 40:if(108!=m&&58==j(P,u-1)){-1!=w(P+=v(U(k),"&","&\f"),"&\f",g(d?s[d-1]:0))&&(b=-1);break}case 34:case 39:case 91:P+=U(k);break;case 9:case 10:case 13:case 32:P+=G(m);break;case 92:P+=Y(N()-1,7);continue;case 47:switch(D()){case 42:case 47:C(oe(Q(M(),N()),t,n,l),l);break;default:P+="/"}break;case 123*x:s[d++]=S(P)*b;case 125*x:case 59:case 0:switch(k){case 0:case 125:y=0;case 59+c:-1==b&&(P=v(P,/\f/g,"")),h>0&&S(P)-u&&C(h>32?ie(P+";",r,n,u-1,l):ie(v(P," ","")+";",r,n,u-2,l),l);break;case 59:P+=";";default:if(C(E=re(P,t,n,d,c,o,s,A,F=[],_=[],u,i),i),123===k)if(0===c)ne(P,t,E,E,F,i,u,s,_);else switch(99===p&&110===j(P,3)?100:p){case 100:case 108:case 109:case 115:ne(e,E,E,r&&C(re(e,E,E,0,0,o,s,A,o,F=[],u,_),_),o,_,u,s,r?F:_);break;default:ne(P,E,E,E,[""],_,0,s,_)}}d=c=h=0,x=b=1,A=P="",u=a;break;case 58:u=1+S(P),h=m;default:if(x<1)if(123==k)--x;else if(125==k&&0==x++&&125==$())continue;switch(P+=f(k),k*x){case 38:b=c>0?1:(P+="\f",-1);break;case 44:s[d++]=(S(P)-1)*b,b=1;break;case 64:45===D()&&(P+=U(M())),p=D(),c=u=S(A=P+=K(N())),k++;break;case 45:45===m&&2==S(P)&&(x=0)}}return i}function re(e,t,n,r,o,i,a,s,l,d,c,u){for(var h=o-1,m=0===o?i:[""],f=A(m),x=0,b=0,w=0;x<r;++x)for(var j=0,S=k(e,h+1,h=g(b=a[x])),C=e;j<f;++j)(C=y(b>0?m[j]+" "+S:v(S,/&\f/g,m[j])))&&(l[w++]=C);return T(e,t,n,0===o?p:s,l,d,c,u)}function oe(e,t,n,r){return T(e,t,n,u,f(z),k(e,2,-2),0,r)}function ie(e,t,n,r,o){return T(e,t,n,h,k(e,0,r),k(e,r+1,-1),r,o)}var ae={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},se="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_ATTR)||"data-styled",le="active",de="data-styled-version",ce="6.1.19",ue="/*!sc*/\n",pe="undefined"!=typeof window&&"undefined"!=typeof document,he=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY)),me={},ge=(new Set,Object.freeze([])),fe=Object.freeze({});function xe(e,t,n){return void 0===n&&(n=fe),e.theme!==n.theme&&e.theme||t||n.theme}var ye=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),be=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ve=/(^-|-$)/g;function we(e){return e.replace(be,"-").replace(ve,"")}var je=/(a)(d)/gi,ke=52,Se=function(e){return String.fromCharCode(e+(e>25?39:97))};function Ae(e){var t,n="";for(t=Math.abs(e);t>ke;t=t/ke|0)n=Se(t%ke)+n;return(Se(t%ke)+n).replace(je,"$1-$2")}var Ce,Fe=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},_e=function(e){return Fe(5381,e)};function Ee(e){return Ae(_e(e)>>>0)}function Pe(e){return e.displayName||e.name||"Component"}function Be(e){return"string"==typeof e&&!0}var ze="function"==typeof Symbol&&Symbol.for,Re=ze?Symbol.for("react.memo"):60115,Te=ze?Symbol.for("react.forward_ref"):60112,Oe={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Ie={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},$e={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Me=((Ce={})[Te]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ce[Re]=$e,Ce);function De(e){return("type"in(t=e)&&t.type.$$typeof)===Re?$e:"$$typeof"in e?Me[e.$$typeof]:Oe;var t}var Ne=Object.defineProperty,Le=Object.getOwnPropertyNames,qe=Object.getOwnPropertySymbols,He=Object.getOwnPropertyDescriptor,We=Object.getPrototypeOf,Ue=Object.prototype;function Ge(e,t,n){if("string"!=typeof t){if(Ue){var r=We(t);r&&r!==Ue&&Ge(e,r,n)}var o=Le(t);qe&&(o=o.concat(qe(t)));for(var i=De(e),a=De(t),s=0;s<o.length;++s){var l=o[s];if(!(l in Ie||n&&n[l]||a&&l in a||i&&l in i)){var d=He(t,l);try{Ne(e,l,d)}catch(e){}}}}return e}function Ye(e){return"function"==typeof e}function Ve(e){return"object"==typeof e&&"styledComponentId"in e}function Qe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Ke(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function Je(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Xe(e,t,n){if(void 0===n&&(n=!1),!n&&!Je(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Xe(e[r],t[r]);else if(Je(t))for(var r in t)e[r]=Xe(e[r],t[r]);return e}function Ze(e,t){Object.defineProperty(e,"toString",{value:t})}function et(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var tt=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)if((o<<=1)<0)throw et(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var i=r;i<o;i++)this.groupSizes[i]=0}for(var a=this.indexOfGroup(e+1),s=(i=0,t.length);i<s;i++)this.tag.insertRule(a,t[i])&&(this.groupSizes[e]++,a++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,i=r;i<o;i++)t+="".concat(this.tag.getRule(i)).concat(ue);return t},e}(),nt=new Map,rt=new Map,ot=1,it=function(e){if(nt.has(e))return nt.get(e);for(;rt.has(ot);)ot++;var t=ot++;return nt.set(e,t),rt.set(t,e),t},at=function(e,t){ot=t+1,nt.set(e,t),rt.set(t,e)},st="style[".concat(se,"][").concat(de,'="').concat(ce,'"]'),lt=new RegExp("^".concat(se,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),dt=function(e,t,n){for(var r,o=n.split(","),i=0,a=o.length;i<a;i++)(r=o[i])&&e.registerName(t,r)},ct=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(ue),o=[],i=0,a=r.length;i<a;i++){var s=r[i].trim();if(s){var l=s.match(lt);if(l){var d=0|parseInt(l[1],10),c=l[2];0!==d&&(at(c,d),dt(e,c,l[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(s)}}},ut=function(e){for(var t=document.querySelectorAll(st),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(se)!==le&&(ct(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function pt(){return n.nc}var ht=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){var t=Array.from(e.querySelectorAll("style[".concat(se,"]")));return t[t.length-1]}(n),i=void 0!==o?o.nextSibling:null;r.setAttribute(se,le),r.setAttribute(de,ce);var a=pt();return a&&r.setAttribute("nonce",a),n.insertBefore(r,i),r},mt=function(){function e(e){this.element=ht(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}throw et(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),gt=function(){function e(e){this.element=ht(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),ft=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),xt=pe,yt={isServer:!pe,useCSSOMInjection:!he},bt=function(){function e(e,t,n){void 0===e&&(e=fe),void 0===t&&(t={});var o=this;this.options=r(r({},yt),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&pe&&xt&&(xt=!1,ut(this)),Ze(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=function(n){var o=function(e){return rt.get(e)}(n);if(void 0===o)return"continue";var i=e.names.get(o),a=t.getGroup(n);if(void 0===i||!i.size||0===a.length)return"continue";var s="".concat(se,".g").concat(n,'[id="').concat(o,'"]'),l="";void 0!==i&&i.forEach(function(e){e.length>0&&(l+="".concat(e,","))}),r+="".concat(a).concat(s,'{content:"').concat(l,'"}').concat(ue)},i=0;i<n;i++)o(i);return r}(o)})}return e.registerId=function(e){return it(e)},e.prototype.rehydrate=function(){!this.server&&pe&&ut(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(r(r({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new ft(n):t?new mt(n):new gt(n)}(this.options),new tt(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(it(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(it(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(it(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),vt=/&/g,wt=/^\s*\/\/.*$/gm;function jt(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=jt(e.children,t)),e})}function kt(e){var t,n,r,o=void 0===e?fe:e,i=o.options,a=void 0===i?fe:i,s=o.plugins,l=void 0===s?ge:s,d=function(e,r,o){return o.startsWith(n)&&o.endsWith(n)&&o.replaceAll(n,"").length>0?".".concat(t):e},c=l.slice();c.push(function(e){e.type===p&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(vt,n).replace(r,d))}),a.prefix&&c.push(ee),c.push(X);var u=function(e,o,i,s){void 0===o&&(o=""),void 0===i&&(i=""),void 0===s&&(s="&"),t=s,n=o,r=new RegExp("\\".concat(n,"\\b"),"g");var l=e.replace(wt,""),d=te(i||o?"".concat(i," ").concat(o," { ").concat(l," }"):l);a.namespace&&(d=jt(d,a.namespace));var u,p=[];return J(d,function(e){var t=A(e);return function(n,r,o,i){for(var a="",s=0;s<t;s++)a+=e[s](n,r,o,i)||"";return a}}(c.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)})))),p};return u.hash=l.length?l.reduce(function(e,t){return t.name||et(15),Fe(e,t.name)},5381).toString():"",u}var St=new bt,At=kt(),Ct=i.createContext({shouldForwardProp:void 0,styleSheet:St,stylis:At}),Ft=(Ct.Consumer,i.createContext(void 0));function _t(){return(0,i.useContext)(Ct)}function Et(e){var t=(0,i.useState)(e.stylisPlugins),n=t[0],r=t[1],o=_t().styleSheet,a=(0,i.useMemo)(function(){var t=o;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,o]),l=(0,i.useMemo)(function(){return kt({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:n})},[e.enableVendorPrefixes,e.namespace,n]);(0,i.useEffect)(function(){s()(n,e.stylisPlugins)||r(e.stylisPlugins)},[e.stylisPlugins]);var d=(0,i.useMemo)(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:a,stylis:l}},[e.shouldForwardProp,a,l]);return i.createElement(Ct.Provider,{value:d},i.createElement(Ft.Provider,{value:l},e.children))}var Pt=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=At);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Ze(this,function(){throw et(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=At),this.name+e.hash},e}(),Bt=function(e){return e>="A"&&e<="Z"};function zt(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;Bt(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Rt=function(e){return null==e||!1===e||""===e},Tt=function(e){var t,n,r=[];for(var i in e){var a=e[i];e.hasOwnProperty(i)&&!Rt(a)&&(Array.isArray(a)&&a.isCss||Ye(a)?r.push("".concat(zt(i),":"),a,";"):Je(a)?r.push.apply(r,o(o(["".concat(i," {")],Tt(a),!1),["}"],!1)):r.push("".concat(zt(i),": ").concat((t=i,null==(n=a)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in ae||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Ot(e,t,n,r){return Rt(e)?[]:Ve(e)?[".".concat(e.styledComponentId)]:Ye(e)?!Ye(o=e)||o.prototype&&o.prototype.isReactComponent||!t?[e]:Ot(e(t),t,n,r):e instanceof Pt?n?(e.inject(n,r),[e.getName(r)]):[e]:Je(e)?Tt(e):Array.isArray(e)?Array.prototype.concat.apply(ge,e.map(function(e){return Ot(e,t,n,r)})):[e.toString()];var o}function It(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ye(n)&&!Ve(n))return!1}return!0}var $t=_e(ce),Mt=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&It(e),this.componentId=t,this.baseHash=Fe($t,t),this.baseStyle=n,bt.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Qe(r,this.staticRulesId);else{var o=Ke(Ot(this.rules,e,t,n)),i=Ae(Fe(this.baseHash,o)>>>0);if(!t.hasNameForId(this.componentId,i)){var a=n(o,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,a)}r=Qe(r,i),this.staticRulesId=i}else{for(var s=Fe(this.baseHash,n.hash),l="",d=0;d<this.rules.length;d++){var c=this.rules[d];if("string"==typeof c)l+=c;else if(c){var u=Ke(Ot(c,e,t,n));s=Fe(s,u+d),l+=u}}if(l){var p=Ae(s>>>0);t.hasNameForId(this.componentId,p)||t.insertRules(this.componentId,p,n(l,".".concat(p),void 0,this.componentId)),r=Qe(r,p)}}return r},e}(),Dt=i.createContext(void 0);Dt.Consumer;function Nt(e){var t=i.useContext(Dt),n=(0,i.useMemo)(function(){return function(e,t){if(!e)throw et(14);if(Ye(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw et(8);return t?r(r({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?i.createElement(Dt.Provider,{value:n},e.children):null}var Lt={};new Set;function qt(e,t,n){var o=Ve(e),a=e,s=!Be(e),l=t.attrs,d=void 0===l?ge:l,c=t.componentId,u=void 0===c?function(e,t){var n="string"!=typeof e?"sc":we(e);Lt[n]=(Lt[n]||0)+1;var r="".concat(n,"-").concat(Ee(ce+n+Lt[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):c,p=t.displayName,h=void 0===p?function(e){return Be(e)?"styled.".concat(e):"Styled(".concat(Pe(e),")")}(e):p,m=t.displayName&&t.componentId?"".concat(we(t.displayName),"-").concat(t.componentId):t.componentId||u,g=o&&a.attrs?a.attrs.concat(d).filter(Boolean):d,f=t.shouldForwardProp;if(o&&a.shouldForwardProp){var x=a.shouldForwardProp;if(t.shouldForwardProp){var y=t.shouldForwardProp;f=function(e,t){return x(e,t)&&y(e,t)}}else f=x}var b=new Mt(n,m,o?a.componentStyle:void 0);function v(e,t){return function(e,t,n){var o=e.attrs,a=e.componentStyle,s=e.defaultProps,l=e.foldedComponentIds,d=e.styledComponentId,c=e.target,u=i.useContext(Dt),p=_t(),h=e.shouldForwardProp||p.shouldForwardProp,m=xe(t,u,s)||fe,g=function(e,t,n){for(var o,i=r(r({},t),{className:void 0,theme:n}),a=0;a<e.length;a+=1){var s=Ye(o=e[a])?o(i):o;for(var l in s)i[l]="className"===l?Qe(i[l],s[l]):"style"===l?r(r({},i[l]),s[l]):s[l]}return t.className&&(i.className=Qe(i.className,t.className)),i}(o,t,m),f=g.as||c,x={};for(var y in g)void 0===g[y]||"$"===y[0]||"as"===y||"theme"===y&&g.theme===m||("forwardedAs"===y?x.as=g.forwardedAs:h&&!h(y,f)||(x[y]=g[y]));var b=function(e,t){var n=_t();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(a,g),v=Qe(l,d);return b&&(v+=" "+b),g.className&&(v+=" "+g.className),x[Be(f)&&!ye.has(f)?"class":"className"]=v,n&&(x.ref=n),(0,i.createElement)(f,x)}(w,e,t)}v.displayName=h;var w=i.forwardRef(v);return w.attrs=g,w.componentStyle=b,w.displayName=h,w.shouldForwardProp=f,w.foldedComponentIds=o?Qe(a.foldedComponentIds,a.styledComponentId):"",w.styledComponentId=m,w.target=o?a.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=o?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,o=t;r<o.length;r++)Xe(e,o[r],!0);return e}({},a.defaultProps,e):e}}),Ze(w,function(){return".".concat(w.styledComponentId)}),s&&Ge(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function Ht(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Wt=function(e){return Object.assign(e,{isCss:!0})};function Ut(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ye(e)||Je(e))return Wt(Ot(Ht(ge,o([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?Ot(r):Wt(Ot(Ht(r,t)))}function Gt(e,t,n){if(void 0===n&&(n=fe),!t)throw et(1,t);var i=function(r){for(var i=[],a=1;a<arguments.length;a++)i[a-1]=arguments[a];return e(t,n,Ut.apply(void 0,o([r],i,!1)))};return i.attrs=function(o){return Gt(e,t,r(r({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},i.withConfig=function(o){return Gt(e,t,r(r({},n),o))},i}var Yt=function(e){return Gt(qt,e)},Vt=Yt;ye.forEach(function(e){Vt[e]=Yt(e)});var Qt=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=It(e),bt.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var o=r(Ke(Ot(this.rules,t,n,r)),""),i=this.componentId+e;n.insertRules(i,i,o)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&bt.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function Kt(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var a=Ut.apply(void 0,o([e],t,!1)),s="sc-global-".concat(Ee(JSON.stringify(a))),l=new Qt(a,s),d=function(e){var t=_t(),n=i.useContext(Dt),r=i.useRef(t.styleSheet.allocateGSInstance(s)).current;return t.styleSheet.server&&c(r,e,t.styleSheet,n,t.stylis),i.useLayoutEffect(function(){if(!t.styleSheet.server)return c(r,e,t.styleSheet,n,t.stylis),function(){return l.removeStyles(r,t.styleSheet)}},[r,e,t.styleSheet,n,t.stylis]),null};function c(e,t,n,o,i){if(l.isStatic)l.renderStyles(e,me,n,i);else{var a=r(r({},t),{theme:xe(t,o,d.defaultProps)});l.renderStyles(e,a,n,i)}}return i.memo(d)}function Jt(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=Ke(Ut.apply(void 0,o([e],t,!1))),i=Ee(r);return new Pt(i,r)}(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=pt(),r=Ke([n&&'nonce="'.concat(n,'"'),"".concat(se,'="true"'),"".concat(de,'="').concat(ce,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw et(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw et(2);var n=e.instance.toString();if(!n)return[];var o=((t={})[se]="",t[de]=ce,t.dangerouslySetInnerHTML={__html:n},t),a=pt();return a&&(o.nonce=a),[i.createElement("style",r({},o,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new bt({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw et(2);return i.createElement(Et,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw et(3)}})(),"__sc-".concat(se,"__")},4901:e=>{var t="undefined"!==typeof Element,n="function"===typeof Map,r="function"===typeof Set,o="function"===typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var s,l,d,c;if(Array.isArray(e)){if((s=e.length)!=a.length)return!1;for(l=s;0!==l--;)if(!i(e[l],a[l]))return!1;return!0}if(n&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(c=e.entries();!(l=c.next()).done;)if(!a.has(l.value[0]))return!1;for(c=e.entries();!(l=c.next()).done;)if(!i(l.value[1],a.get(l.value[0])))return!1;return!0}if(r&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(c=e.entries();!(l=c.next()).done;)if(!a.has(l.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((s=e.length)!=a.length)return!1;for(l=s;0!==l--;)if(e[l]!==a[l])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf&&"function"===typeof e.valueOf&&"function"===typeof a.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString&&"function"===typeof e.toString&&"function"===typeof a.toString)return e.toString()===a.toString();if((s=(d=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(l=s;0!==l--;)if(!Object.prototype.hasOwnProperty.call(a,d[l]))return!1;if(t&&e instanceof Element)return!1;for(l=s;0!==l--;)if(("_owner"!==d[l]&&"__v"!==d[l]&&"__o"!==d[l]||!e.$$typeof)&&!i(e[d[l]],a[d[l]]))return!1;return!0}return e!==e&&a!==a}e.exports=function(e,t){try{return i(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},5340:(e,t,n)=>{"use strict";e.exports=n(9487)},5665:(e,t,n)=>{"use strict";n.d(t,{E_:()=>d,G$:()=>h,MD:()=>o,Os:()=>a,Ot:()=>c,XS:()=>u,d1:()=>l,h2:()=>p,hI:()=>i,v0:()=>s});n(9950);var r=n(4752);n(4414);const o=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 24px;
  }
`,i=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
  }
`,a=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 2px;
  }
`,s=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`,l=r.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;

  @media (max-width: 768px) {
    font-size: 10px;
    margin-top: 2px;
  }
`,d=r.Ay.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  color: ${e=>{switch(e.trend){case"up":return"#059669";case"down":return"#DC2626";default:return"#6B7280"}}};
`,c=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`,u=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,p=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,h=r.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`},5781:(e,t,n)=>{"use strict";n.d(t,{Y:()=>l,g:()=>s});var r=n(9950),o=n(1367),i=n(4414);const a=(0,r.createContext)(void 0),s=()=>{const e=(0,r.useContext)(a);if(!e)throw new Error("useStaff must be used within a StaffProvider");return e},l=e=>{let{children:t}=e;const{user:n,isAuthenticated:s}=(0,o.As)(),[l,d]=(0,r.useState)(null),[c,u]=(0,r.useState)(null),[p,h]=(0,r.useState)([]),[m,g]=(0,r.useState)([]),f=!!l,x=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},y={admin:["all"],manager:["staff_management","shift_management","reports_view","settings_edit","pos_access","kitchen_access","customer_management","inventory_management"],cashier:["pos_access","customer_management","shift_basic"],kitchen:["kitchen_access","order_management","shift_basic"],server:["pos_access","customer_service","shift_basic"]};(0,r.useEffect)(()=>{if(s&&n&&!l){const e={id:n.id,username:n.email.split("@")[0],name:n.name,email:n.email,phone:"",role:n.role.toLowerCase().includes("admin")?"admin":n.role.toLowerCase().includes("staff")?"cashier":"manager",department:"management",isActive:!0,permissions:n.permissions||[],joinDate:(new Date).toISOString(),totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0},schedule:{monday:{start:"09:00",end:"18:00",active:!0},tuesday:{start:"09:00",end:"18:00",active:!0},wednesday:{start:"09:00",end:"18:00",active:!0},thursday:{start:"09:00",end:"18:00",active:!0},friday:{start:"09:00",end:"18:00",active:!0},saturday:{start:"09:00",end:"18:00",active:!0},sunday:{start:"09:00",end:"18:00",active:!0}}};d(e)}},[s,n]),(0,r.useEffect)(()=>{n&&n.restaurant_id&&Number(n.restaurant_id)>0&&b()},[n]);const b=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/staff",{credentials:"include",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}}),n=await t.json();n.success&&Array.isArray(n.data)?h(n.data):h([])}catch(e){h([])}},v=async(e,t)=>{const n=p.map(n=>n.id===e?{...n,...t}:n);h(n);const r=n.find(t=>t.id===e);return(null===l||void 0===l?void 0:l.id)===e&&d(r),r},w=e=>p.find(t=>t.id===e)||null,j=e=>{g(t=>t.map(t=>t.id===e?{...t,endTime:(new Date).toISOString(),status:"completed"}:t)),(null===c||void 0===c?void 0:c.id)===e&&u(null)},k={currentStaff:l,currentShift:c,isLoggedIn:f,staffList:p,activeShifts:m,login:async(e,t)=>{try{const n=await fetch("/api/staff/login",x({method:"POST",body:JSON.stringify({username:e,password:t})})),r=await n.json();return!(!n.ok||!r.success)&&(d(r.data),!0)}catch(n){return!1}},logout:async()=>{try{c&&"active"===c.status&&j(c.id),await fetch("/api/staff/logout",x({method:"POST"})),d(null),u(null)}catch(e){}},addStaff:async e=>{const t={id:`staff-${Date.now()}`,username:e.username||"",name:e.name||"",email:e.email||"",phone:e.phone||"",role:e.role||"cashier",department:e.department||"service",isActive:!0,permissions:y[e.role||"cashier"],joinDate:(new Date).toISOString().split("T")[0],totalShifts:0,totalSales:0,performance:{efficiency:0,customerRating:0,ordersProcessed:0},schedule:{monday:{start:"09:00",end:"17:00",active:!1},tuesday:{start:"09:00",end:"17:00",active:!1},wednesday:{start:"09:00",end:"17:00",active:!1},thursday:{start:"09:00",end:"17:00",active:!1},friday:{start:"09:00",end:"17:00",active:!1},saturday:{start:"09:00",end:"17:00",active:!1},sunday:{start:"09:00",end:"17:00",active:!1}},...e};return h(e=>[...e,t]),t},updateStaff:v,deactivateStaff:e=>{v(e,{isActive:!1})},getStaffById:w,searchStaff:e=>{if(!e.trim())return p;const t=e.toLowerCase();return p.filter(n=>n.name.toLowerCase().includes(t)||n.username.toLowerCase().includes(t)||n.email.toLowerCase().includes(t)||n.phone.includes(e))},startShift:async e=>{var t;const n={id:`shift-${Date.now()}`,staffId:e,staffName:(null===(t=w(e))||void 0===t?void 0:t.name)||"Unknown",startTime:(new Date).toISOString(),salesAmount:0,ordersProcessed:0,status:"active"};return g(e=>[...e,n]),(null===l||void 0===l?void 0:l.id)===e&&u(n),n},endShift:j,startBreak:e=>{g(t=>t.map(t=>t.id===e?{...t,status:"break"}:t))},endBreak:e=>{g(t=>t.map(t=>t.id===e?{...t,status:"active"}:t))},updateShiftStats:(e,t,n)=>{g(r=>r.map(r=>r.id===e?{...r,salesAmount:r.salesAmount+t,ordersProcessed:r.ordersProcessed+n}:r))},hasPermission:e=>!!l&&(l.permissions.includes("all")||l.permissions.includes(e)),getRolePermissions:e=>y[e]};return(0,i.jsx)(a.Provider,{value:k,children:t})}},6038:(e,t,n)=>{"use strict";n.d(t,{DL:()=>r,Qn:()=>a,Wh:()=>l,e_:()=>o,vv:()=>i});const r={MYR:{symbol:"RM",name:"Malaysian Ringgit",decimals:2},RM:{symbol:"RM",name:"Malaysian Ringgit",decimals:2},USD:{symbol:"$",name:"US Dollar",decimals:2},KRW:{symbol:"\u20a9",name:"Korean Won",decimals:0},SGD:{symbol:"S$",name:"Singapore Dollar",decimals:2},THB:{symbol:"\u0e3f",name:"Thai Baht",decimals:2},JPY:{symbol:"\xa5",name:"Japanese Yen",decimals:0},EUR:{symbol:"\u20ac",name:"Euro",decimals:2},GBP:{symbol:"\xa3",name:"British Pound",decimals:2},AUD:{symbol:"A$",name:"Australian Dollar",decimals:2},CNY:{symbol:"\xa5",name:"Chinese Yuan",decimals:2},INR:{symbol:"\u20b9",name:"Indian Rupee",decimals:2},PHP:{symbol:"\u20b1",name:"Philippine Peso",decimals:2},VND:{symbol:"\u20ab",name:"Vietnamese Dong",decimals:0},IDR:{symbol:"Rp",name:"Indonesian Rupiah",decimals:0},TWD:{symbol:"NT$",name:"Taiwan Dollar",decimals:0},HKD:{symbol:"HK$",name:"Hong Kong Dollar",decimals:2}};function o(e){var t,n;return null!==(t=null===(n=r[e])||void 0===n?void 0:n.decimals)&&void 0!==t?t:2}function i(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"RM",o=arguments.length>2?arguments[2]:void 0;const i=r[n],a="string"===typeof e?parseFloat(e):e;if(isNaN(a)){return`${(null===i||void 0===i?void 0:i.symbol)||n} 0`}const s=void 0!==o?o?2:0:null!==(t=null===i||void 0===i?void 0:i.decimals)&&void 0!==t?t:2,l=a.toLocaleString("en-US",{minimumFractionDigits:s,maximumFractionDigits:s});return`${(null===i||void 0===i?void 0:i.symbol)||n} ${l}`}function a(e){var t;return(null===(t=r[e])||void 0===t?void 0:t.symbol)||e}const s={RM:"MYR"};function l(e){return s[e]||e}},6910:(e,t,n)=>{"use strict";n.d(t,{JR:()=>o,hY:()=>r});const r=()=>"",o=r()},7119:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(1863)},8409:(e,t,n)=>{"use strict";n.d(t,{rA:()=>c.rA,wr:()=>c.wr,ex:()=>v.ex,SC:()=>o.SC,$n:()=>v.$n,mc:()=>v.mc,UC:()=>v.UC,XS:()=>r.XS,h2:()=>r.h2,G$:()=>r.G$,Ot:()=>r.Ot,bQ:()=>p,AA:()=>x,DM:()=>b,Bv:()=>g,an:()=>u,ys:()=>y,B_:()=>h,gU:()=>f,J2:()=>m,pp:()=>c.pp,gE:()=>d.gE,ZQ:()=>d.ZQ,lR:()=>d.lR,FX:()=>d.FX,Lz:()=>d.Lz,Y9:()=>v.Y9,K0:()=>c.K0,Np:()=>c.Np,PM:()=>c.PM,Uj:()=>c.Uj,aF:()=>d.aF,yl:()=>d.yl,zf:()=>d.zf,Xd:()=>k,yY:()=>o.yY,He:()=>o.He,r6:()=>o.r6,hI:()=>r.hI,d1:()=>r.d1,v0:()=>r.v0,E_:()=>r.E_,Os:()=>r.Os,MD:()=>r.MD,Mo:()=>o.Mo,oz:()=>l,j:()=>s,XI:()=>c.XI,A0:()=>c.A0,Hj:()=>c.Hj,hE:()=>v.hE});var r=n(5665),o=n(4728),i=(n(9950),n(4752)),a=n(4414);const s=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
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

  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
`,l=i.Ay.button`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
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
`;var d=n(9610),c=(n(1721),n(2853));const u=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  width: 100%;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,p=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 1024px) {
    display: block;
  }

  tbody {
    @media (max-width: 1024px) {
      display: block;
    }
  }
`,h=i.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 1024px) {
    display: none;
  }
`,m=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,g=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;
  text-align: ${e=>e.align||"left"};
  word-wrap: break-word;

  /* 내부 콘텐츠도 정렬 */
  > * {
    text-align: inherit;
  }

  @media (max-width: 1024px) {
    flex: ${e=>e.mobileFullWidth?"1 1 100%":"1 1 calc(50% - 5px)"};
    min-width: ${e=>e.mobileFullWidth?"100%":"140px"};
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    ${e=>e.mobileFullWidth?"\n      padding-top: 10px;\n      margin-top: 10px;\n      border-top: 1px solid #F3F4F6;\n      &:before { display: none; }\n    ":""}
  }
`,f=i.Ay.th`
  padding: 14px 16px;
  text-align: ${e=>e.align||"center"};
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  ${e=>e.width?`width: ${e.width};`:""}
`,x=i.Ay.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,y=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  @media (max-width: 1024px) {
    padding: 40px 20px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
  }
`,b=i.Ay.span`
  font-weight: ${e=>e.highlight?"600":"500"};
  color: ${e=>e.highlight?"#0A2540":"#6B7280"};
`;i.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: normal;
  line-height: 1.3;
  text-align: center;

  ${e=>{switch(e.variant){case"success":return"\n          background: #E6F9F0;\n          color: #059669;\n        ";case"warning":return"\n          background: #FEF3C7;\n          color: #D97706;\n        ";case"error":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"info":return"\n          background: #E0F2FE;\n          color: #0284C7;\n        ";default:return"\n          background: #F3F4F6;\n          color: #6B7280;\n        "}}}
`;var v=n(3832);const w=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,j=i.Ay.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
    color: #6B7280;
  }
`,k=e=>{let{onMoveUp:t,onMoveDown:n,disableUp:r=!1,disableDown:o=!1}=e;return(0,a.jsxs)(w,{children:[(0,a.jsx)(j,{onClick:t,disabled:r,title:"Move up",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,a.jsx)("path",{d:"M7 14l5-5 5 5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,a.jsx)(j,{onClick:n,disabled:o,title:"Move down",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,a.jsx)("path",{d:"M7 10l5 5 5-5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})};var S=n(8819);const A=i.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return S.w.components.button.paddingSm;case"large":return S.w.components.button.paddingLg;default:return S.w.components.button.paddingMd}}};
  border: none;
  border-radius: ${S.w.borderRadius.md};
  font-size: ${S.w.typography.fontSize.sm};
  font-weight: ${S.w.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  text-decoration: none;
  white-space: nowrap;
  width: ${e=>e.fullWidth?"100%":"auto"};

  ${e=>{switch(e.variant){case"secondary":case"cancel":case"outline":return i.AH`
          background: ${S.w.colors.surface};
          color: ${S.w.colors.text.muted};
          border: 1px solid ${S.w.colors.border};

          &:hover:not(:disabled) {
            background: ${S.w.colors.surfaceHover};
            color: ${S.w.colors.secondary};
            border-color: ${S.w.colors.borderHover};
          }
        `;case"danger":return i.AH`
          background: ${S.w.colors.danger};
          color: ${S.w.colors.surface};

          &:hover:not(:disabled) {
            background: ${S.w.colors.dangerHover};
            transform: translateY(-1px);
            box-shadow: ${S.w.shadows.dangerHover};
          }
        `;case"danger-outline":return i.AH`
          background: ${S.w.colors.surface};
          color: ${S.w.colors.danger};
          border: 1px solid ${S.w.colors.danger};

          &:hover:not(:disabled) {
            background: ${S.w.colors.dangerLight};
            color: ${S.w.colors.dangerHover};
            border-color: ${S.w.colors.dangerHover};
          }
        `;case"success":return i.AH`
          background: ${S.w.colors.status.successAlt};
          color: ${S.w.colors.surface};

          &:hover:not(:disabled) {
            background: ${S.w.colors.status.successDark};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          }
        `;case"warning":return i.AH`
          background: ${S.w.colors.status.warningAlt};
          color: ${S.w.colors.surface};

          &:hover:not(:disabled) {
            background: #B45309;
            transform: translateY(-1px);
          }
        `;case"info":return i.AH`
          background: ${S.w.colors.status.info};
          color: ${S.w.colors.surface};

          &:hover:not(:disabled) {
            background: #0891B2;
            transform: translateY(-1px);
          }
        `;default:return i.AH`
          background: ${S.w.colors.primary};
          color: ${S.w.colors.surface};

          &:hover:not(:disabled) {
            background: ${S.w.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: ${S.w.shadows.primaryHover};
          }
        `}}}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none;
    pointer-events: none;
  }

  /* Icon sizing */
  svg {
    width: ${e=>{switch(e.size){case"small":return S.w.components.button.iconSizeSm;case"large":return S.w.components.button.iconSizeLg;default:return S.w.components.button.iconSizeMd}}};
    height: ${e=>{switch(e.size){case"small":return S.w.components.button.iconSizeSm;case"large":return S.w.components.button.iconSizeLg;default:return S.w.components.button.iconSizeMd}}};
  }
`;(0,i.Ay)(A)`
  &:disabled {
    opacity: 1;
    background: ${e=>{switch(e.variant){case"primary":return S.w.colors.disabled.primaryBg;case"danger":return S.w.colors.disabled.dangerBg;default:return S.w.colors.disabled.background}}};
    color: ${e=>{switch(e.variant){case"primary":case"danger":return"rgba(255, 255, 255, 0.7)";default:return S.w.colors.disabled.text}}};
  }
`},8666:(e,t,n)=>{"use strict";n.d(t,{A:()=>k});var r=n(9950),o=n(4752),i=n(2924),a=n(4414);const s=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,l=o.Ay.div`
  position: relative;
  display: flex;
  align-items: center;
`,d=o.Ay.input`
  width: 100%;
  padding: 8px 12px 8px 80px;
  border: 1px solid ${e=>e.hasError?"#EF4444":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${e=>e.hasError?"#EF4444":"#635BFF"};
    box-shadow: 0 0 0 3px ${e=>e.hasError?"rgba(239, 68, 68, 0.1)":"rgba(99, 91, 255, 0.1)"};
  }

  &::placeholder {
    color: #9CA3AF;
  }

  &:disabled {
    background: #F3F4F6;
    cursor: not-allowed;
  }
`,c=o.Ay.div`
  font-size: 12px;
  color: #EF4444;
  margin-top: 4px;
`,u=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,p=o.Ay.button`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #F3F4F6;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`,h=o.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 280px;
  z-index: 1000;
  min-width: 260px;
  display: flex;
  flex-direction: column;
`,m=o.Ay.div`
  padding: 8px;
  border-bottom: 1px solid #E5E7EB;
`,g=o.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,f=o.Ay.div`
  overflow-y: auto;
  max-height: 220px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F3F4F6;
  }

  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }
`,x=o.Ay.div`
  padding: 20px;
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,y=o.Ay.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.2s;

  &:hover {
    background: #F3F4F6;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`,b=o.Ay.span`
  font-size: 18px;
`,v=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,w=o.Ay.div`
  font-weight: 500;
  color: #1F2937;
`,j=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,k=e=>{let{value:t,onChange:n,placeholder:o="123456789",required:k=!1,disabled:S=!1,autoFocus:A=!1,onBlur:C,defaultCountry:F="MY"}=e;const[_,E]=(0,r.useState)(""),[P,B]=(0,r.useState)(!1),[z,R]=(0,r.useState)(null),[T,O]=(0,r.useState)((0,i.jM)(F)),[I,$]=(0,r.useState)(!1),[M,D]=(0,r.useState)(""),N=(0,r.useRef)(null),L=(0,r.useRef)(null);(0,r.useEffect)(()=>{if(t){const e=t.replace(T.dialCode,"");E((0,i.w6)(e,T.code))}else E("")},[t,T]),(0,r.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&($(!1),D(""))};return I&&(document.addEventListener("mousedown",e),setTimeout(()=>{var e;null===(e=L.current)||void 0===e||e.focus()},100)),()=>{document.removeEventListener("mousedown",e)}},[I]);const q=i.FS.filter(e=>{const t=M.toLowerCase();return e.name.toLowerCase().includes(t)||e.code.toLowerCase().includes(t)||e.dialCode.includes(t)});return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{ref:N,children:[(0,a.jsxs)(p,{type:"button",onClick:()=>$(!I),disabled:S,children:[(0,a.jsx)(b,{children:T.flag}),(0,a.jsx)("span",{children:T.dialCode})]}),I&&(0,a.jsxs)(h,{children:[(0,a.jsx)(m,{children:(0,a.jsx)(g,{ref:L,type:"text",placeholder:"Search country...",value:M,onChange:e=>D(e.target.value),onClick:e=>e.stopPropagation()})}),(0,a.jsx)(f,{children:q.length>0?q.map(e=>(0,a.jsxs)(y,{type:"button",onClick:()=>(e=>{if(O(e),$(!1),D(""),_){const t=_.replace(/\D/g,""),r=(0,i.n4)(t,e.code);n(r)}})(e),children:[(0,a.jsx)(b,{children:e.flag}),(0,a.jsxs)(v,{children:[(0,a.jsx)(w,{children:e.name}),(0,a.jsx)(j,{children:e.dialCode})]})]},e.code)):(0,a.jsx)(x,{children:"No countries found"})})]}),(0,a.jsx)(d,{type:"tel",value:_,onChange:e=>{const t=e.target.value,r=(0,i.w6)(t,T.code);E(r);const o=t.replace(/\D/g,""),a=o?(0,i.n4)(o,T.code):"";n(a),z&&R(null)},onBlur:()=>{if(B(!1),_&&k){const e=_.replace(/\D/g,""),t=e?(0,i.n4)(e,T.code):"",n=t?(0,i.MB)(t,T.code):null;R(n)}C&&C()},onFocus:()=>{B(!0),R(null)},placeholder:o,disabled:S,autoFocus:A,hasError:!!z,inputMode:"numeric"})]}),z&&(0,a.jsx)(c,{children:z}),!z&&!P&&!t&&(0,a.jsxs)(u,{children:[T.name," phone number (",T.minLength,"-",T.maxLength," digits)"]})]})}},8819:(e,t,n)=>{"use strict";n.d(t,{w:()=>r});const r={colors:{primary:"#635BFF",primaryHover:"#5A51E6",primaryLight:"rgba(99, 91, 255, 0.1)",primaryShadow:"rgba(99, 91, 255, 0.3)",secondary:"#0A2540",secondaryLight:"#F8FAFC",background:"#FAFBFC",backgroundAlt:"#F6F9FC",surface:"#FFFFFF",surfaceHover:"#F8FAFC",surfaceMuted:"#F3F4F6",text:{primary:"#0A2540",secondary:"#6B7C93",light:"#8898AA",muted:"#6B7280",dark:"#374151",placeholder:"#9CA3AF"},status:{success:"#28C76F",successAlt:"#059669",successAlt2:"#10B981",successLight:"#ECFDF5",successDark:"#15803D",warning:"#FF9F43",warningAlt:"#D97706",warningLight:"#FFF7ED",warningLightAlt:"#FEF3C7",error:"#EA5455",errorLight:"#FEF2F2",errorLightAlt:"#FEE2E2",info:"#00CFE8"},danger:"#DC2626",dangerHover:"#B91C1C",dangerLight:"#FEF2F2",dangerBorder:"#FCA5A5",dangerShadow:"rgba(220, 38, 38, 0.3)",border:"#E6EBF1",borderLight:"#E5E7EB",borderHover:"#CBD5E1",disabled:{background:"#F3F4F6",text:"#D1D5DB",primaryBg:"#A5A0FF",dangerBg:"#FCA5A5"}},typography:{fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontSize:{xs:"12px",sm:"14px",base:"16px",lg:"18px",xl:"20px","2xl":"24px","3xl":"30px"},fontWeight:{regular:400,medium:500,semibold:600,bold:700}},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px","2xl":"48px"},borderRadius:{sm:"4px",md:"8px",lg:"12px",xl:"16px",full:"9999px"},shadows:{sm:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06)",md:"0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)",lg:"0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",primaryHover:"0 4px 12px rgba(99, 91, 255, 0.3)",dangerHover:"0 4px 12px rgba(220, 38, 38, 0.3)"},transitions:{fast:"150ms ease-in-out",normal:"300ms ease-in-out",slow:"500ms ease-in-out"},breakpoints:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px"},components:{button:{paddingSm:"8px 14px",paddingMd:"12px 20px",paddingLg:"16px 28px",iconSizeSm:"14px",iconSizeMd:"16px",iconSizeLg:"18px"},modal:{overlayBg:"rgba(0, 0, 0, 0.5)",widthSm:"400px",widthMd:"600px",widthLg:"800px",headerPadding:"24px",bodyPadding:"24px",footerPadding:"20px 24px"}}}},8930:(e,t,n)=>{"use strict";n.d(t,{BV:()=>u,b:()=>s});var r=n(9950),o=n(4492),i=n(4414);const a=(0,r.createContext)(void 0),s=()=>{const e=(0,r.useContext)(a);if(!e)throw new Error("useMenu must be used within a MenuProvider");return e},l=[],d=e=>e?`menu_categories_${e}`:null,c=[],u=e=>{let{children:t}=e;const n=(0,o.zy)(),[s,u]=(0,r.useState)(l),[p,h]=(0,r.useState)([]),[m,g]=(0,r.useState)(c),[f,x]=(0,r.useState)(!1),[y,b]=(0,r.useState)(new Set),v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},w=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=window.location.pathname.includes("/mobile/");if(!e&&!t)return;const n=window.location.pathname.split("/"),r=n.indexOf("restaurant"),o=n.indexOf("mobile");let i=null,a=null,s=null;if(r>=0?(i=n[r+1],s=`/api/menu?restaurantId=${i}`):o>=0&&(a=n[o+1],s=`/api/mobile/menu/${a}`),!i&&!a)return;const l=await fetch(s,{...v()});if(!l.ok)return;const c=await l.json();if(c.success&&c.data){const e=["\ud83c\udf54","\ud83c\udf55","\ud83e\udd64","\ud83c\udf70","\ud83c\udf5c","\ud83e\udd57","\ud83c\udf63","\ud83c\udf2e"],t=c.data.categories.map((t,n)=>({id:t.id?t.id.toString():t.name.toLowerCase().replace(/\s+/g,"_"),name:t.name,emoji:t.emoji||e[n%e.length],order:void 0!==t.displayOrder?t.displayOrder:n,isActive:void 0===t.isActive||t.isActive}));u(t),((e,t)=>{const n=d(e);if(n&&0!==t.length)try{localStorage.setItem(n,JSON.stringify(t))}catch(r){}})(i,t);const n=c.data.items.map(e=>{let t=[];if(e.optionGroups)try{t="string"===typeof e.optionGroups?JSON.parse(e.optionGroups):e.optionGroups}catch(r){t=[]}let n="";return e.categoryId?n=e.categoryId.toString():e.category&&(n=e.category.toLowerCase().replace(/\s+/g,"_")),{id:e.id.toString(),code:e.code||void 0,name:e.name,price:parseFloat(e.price),category:n,description:e.description||"",emoji:e.emoji||"\ud83c\udf7d\ufe0f",soldOut:e.soldOut||!1,image:e.image||void 0,options:e.options||[],optionGroups:t,preparationTime:e.preparationTime||15,is_set_menu:e.is_set_menu||!1,set_items:e.set_items||void 0,set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}});n.sort((e,t)=>e.category!==t.category?0:e.is_set_menu&&!t.is_set_menu?-1:!e.is_set_menu&&t.is_set_menu?1:e.is_set_menu&&t.is_set_menu?(e.set_display_order||0)-(t.set_display_order||0):parseInt(t.id)-parseInt(e.id)),h(n)}}catch(e){}},[]),j=(0,r.useCallback)(async()=>{try{const e=window.location.pathname.split("/"),t=e.indexOf("restaurant"),n=t>=0?e[t+1]:null;if(!n)return;const r=`/api/option-groups?restaurantId=${n}`,o=await fetch(r,{...v()});if(!o.ok)return;const i=await o.json();i.success&&i.data&&g(i.data)}catch(e){}},[]),k=(0,r.useCallback)(async e=>{try{if("all"!==e&&y.has(e))return;const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null;if(!r)return;x(!0);const o="all"===e?`/api/menu?restaurantId=${r}`:`/api/menu?restaurantId=${r}&categoryId=${e}`,i=await fetch(o,{...v()});if(!i.ok)return;const a=await i.json();if(a.success&&a.data){const t=a.data.items.map(e=>{let t=[];if(e.optionGroups)try{t="string"===typeof e.optionGroups?JSON.parse(e.optionGroups):e.optionGroups}catch(r){t=[]}let n="";return e.categoryId?n=e.categoryId.toString():e.category&&(n=e.category.toLowerCase().replace(/\s+/g,"_")),{id:e.id.toString(),code:e.code||void 0,name:e.name,price:parseFloat(e.price),category:n,description:e.description||"",emoji:e.emoji||"\ud83c\udf7d\ufe0f",soldOut:e.soldOut||!1,image:e.image||void 0,options:e.options||[],optionGroups:t,preparationTime:e.preparationTime||15,is_set_menu:e.is_set_menu||!1,set_items:e.set_items||void 0,set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}});t.sort((e,t)=>e.category!==t.category?0:e.is_set_menu&&!t.is_set_menu?-1:!e.is_set_menu&&t.is_set_menu?1:e.is_set_menu&&t.is_set_menu?(e.set_display_order||0)-(t.set_display_order||0):parseInt(e.id)-parseInt(t.id)),"all"===e?(h(t),b(new Set(["all"]))):(h(e=>{const n=new Set(e.map(e=>e.id)),r=t.filter(e=>!n.has(e.id));return[...e,...r]}),b(t=>{const n=new Set(t);return n.add(e),n}))}}catch(t){}finally{x(!1)}},[y]);(0,r.useEffect)(()=>{const e=n.pathname.split("/"),t=e.indexOf("restaurant"),r=e.indexOf("mobile"),o=t>=0?e[t+1]:null,i=r>=0?e[r+1]:null;if(o||i){if(o){const e=(e=>{const t=d(e);if(!t)return[];try{const e=localStorage.getItem(t);if(e)return JSON.parse(e)}catch(n){}return[]})(o);e.length>0&&u(e)}w(),o&&j()}},[n.pathname,w,j]);return(0,i.jsx)(a.Provider,{value:{categories:s,menuItems:p,optionGroups:m,isLoadingMenu:f,loadedCategories:y,getItemsByCategory:e=>p.filter(t=>t.category===e),getItemById:e=>p.find(t=>t.id===e),loadMenuByCategory:k,updateMenuItem:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null,o={code:e.code,name:e.name,price:e.price,category:e.category,description:e.description,image:e.image,emoji:e.emoji,soldOut:e.soldOut,optionGroups:e.optionGroups,is_set_menu:e.is_set_menu,set_items:e.set_items,set_display_order:e.set_display_order,recipe_id:e.recipe_id||null},i=r?`/api/menu/product/${e.id}?restaurantId=${r}`:`/api/menu/product/${e.id}`,a=await fetch(i,{method:"PUT",...v(),body:JSON.stringify(o)});if(!a.ok)throw new Error("Failed to update menu item");const s=(await a.json()).data,l={...e,...s&&{id:String(s.id),name:s.name,price:parseFloat(s.price),category:s.category,description:s.description||"",emoji:s.emoji||e.emoji,soldOut:s.soldOut||!1,image:s.image||e.image,optionGroups:s.option_groups?JSON.parse(s.option_groups):e.optionGroups,is_set_menu:s.is_set_menu||!1,set_items:s.set_items||e.set_items,set_display_order:s.set_display_order||0,recipe_id:s.recipe_id||null}},d=p.map(t=>t.id===e.id?l:t);h(d)}catch(t){throw t}},addMenuItem:async e=>{try{var t;const n=window.location.pathname.split("/"),r=n.indexOf("restaurant"),o=r>=0?n[r+1]:null,i={code:e.code,name:e.name,price:e.price,category:e.category,description:e.description,image:e.image,emoji:e.emoji,optionGroups:e.optionGroups,is_set_menu:e.is_set_menu,set_items:e.set_items,set_display_order:e.set_display_order,recipe_id:e.recipe_id||null,...o&&{restaurant_id:o}},a=await fetch("/api/menu/product",{method:"POST",...v(),body:JSON.stringify(i)});if(!a.ok)throw new Error("Failed to add menu item");const s=await a.json(),l=[s.data?{...s.data,id:String(s.data.id)}:{...e,id:String((null===(t=s.data)||void 0===t?void 0:t.id)||e.id)},...p];h(l)}catch(n){throw n}},removeMenuItem:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null,o=r?`/api/menu/product/${e}?restaurantId=${r}`:`/api/menu/product/${e}`;if(!(await fetch(o,{method:"DELETE",...v()})).ok)throw new Error("Failed to delete menu item");const i=p.filter(t=>t.id!==e);h(i)}catch(t){throw t}},toggleItemSoldOut:async e=>{try{const t=p.find(t=>t.id===e);if(!t)return;const n={...t,soldOut:!t.soldOut},r=window.location.pathname.split("/"),o=r.indexOf("restaurant"),i=o>=0?r[o+1]:null,a=i?`/api/menu/product/${e}?restaurantId=${i}`:`/api/menu/product/${e}`;if(!(await fetch(a,{method:"PUT",...v(),body:JSON.stringify({name:n.name,price:n.price,category:n.category,description:n.description,image:n.image,soldOut:n.soldOut})})).ok)throw new Error("Failed to toggle sold out status");const s=p.map(t=>t.id===e?n:t);h(s)}catch(t){throw t}},addCategory:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null;if(!r)throw new Error("Restaurant ID not found in URL");const o=await fetch(`/api/categories?restaurantId=${r}`,{method:"POST",...v(),body:JSON.stringify({name:e.name,emoji:e.emoji||"\ud83c\udf7d\ufe0f",description:`Category: ${e.name}`})});if(!o.ok){const e=await o.json().catch(()=>({}));throw new Error(e.error||"Failed to add category")}await w()}catch(t){throw t}},updateCategory:async(e,t)=>{try{if(!s.find(t=>t.id===e))throw new Error("Category not found");const n=window.location.pathname.split("/"),r=n.indexOf("restaurant"),o=r>=0?n[r+1]:null;if(!o)throw new Error("Restaurant ID not found in URL");const i=await fetch(`/api/categories/id/${e}?restaurantId=${o}`,{method:"PUT",...v(),body:JSON.stringify({name:t.name,emoji:t.emoji,description:t.name?`Category: ${t.name}`:void 0})});if(!i.ok){const e=await i.json().catch(()=>({}));throw new Error(e.error||"Failed to update category")}await w()}catch(n){throw n}},deleteCategory:async e=>{try{const t=s.find(t=>t.id===e);if(!t)throw new Error("Category not found");if(!(await fetch(`/api/categories/${t.name}`,{method:"DELETE",...v()})).ok)throw new Error("Failed to delete category");await w()}catch(t){throw t}},reorderCategories:async e=>{try{u(e);const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null;if(!r)return;const o=localStorage.getItem("auth_token"),i={categories:e},a=`/api/categories/reorder?restaurantId=${r}`,s=await fetch(a,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(i)});if(!s.ok)throw new Error(`Failed to reorder categories: ${s.status}`);await s.json()}catch(t){await w()}},addOptionGroup:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null,o=await fetch("/api/option-groups",{method:"POST",...v(),body:JSON.stringify({name:e.name,required:e.required,multiple:e.multiple,options:e.options,restaurant_id:r})});if(!o.ok){const e=await o.json().catch(()=>({}));throw new Error(e.error||"Failed to create option group")}const i=await o.json();i.success&&i.data&&await j()}catch(t){throw t}},updateOptionGroup:async(e,t)=>{try{const n=m.find(t=>t.id===e);if(!n)throw new Error("Option group not found");const r={...n,...t},o=await fetch(`/api/option-groups/${e}`,{method:"PUT",...v(),body:JSON.stringify({name:r.name,required:r.required,multiple:r.multiple,options:r.options})});if(!o.ok){const e=await o.json().catch(()=>({}));throw new Error(e.error||"Failed to update option group")}const i=await o.json();i.success&&i.data&&await j()}catch(n){throw n}},deleteOptionGroup:async e=>{try{const t=await fetch(`/api/option-groups/${e}`,{method:"DELETE",...v()});if(!t.ok){const e=await t.json().catch(()=>({}));throw new Error(e.error||"Failed to delete option group")}await j()}catch(t){throw t}},reloadMenu:w},children:t})}},9018:(e,t,n)=>{"use strict";n.d(t,{Pj:()=>l,tv:()=>d});var r=n(9950),o=n(4414);const i={name:"FOODCOURT CENTRAL",businessRegistration:"000123456789",phone:"+60 3-1234-5678",email:"contact@foodcourt.com",address:"123 Main Street, City Center",city:"Kuala Lumpur",state:"Wilayah Persekutuan",postalCode:"50000",gstRegNo:"000123456789"},a={openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur",orderNumberReset:"daily",defaultPreparationTime:15,taxEnabled:!0,taxRate:6,serviceChargeEnabled:!1,serviceChargeRate:10,currency:"RM",cashRounding:.05,roundingApplyTo:"cash_only",pagerSystem:{enabled:!1,totalPagers:50},takeawayPricing:{enabled:!1,pricingType:"per-item",perItemCharge:.5,categoryCharges:{food:1,beverage:.5,dessert:.5,other:.5}},deliveryPricing:{enabled:!1,minimumOrder:0,freeAbove:999999,zones:[]}},s=(0,r.createContext)(void 0),l=()=>{const e=(0,r.useContext)(s);if(!e)throw new Error("useStore must be used within a StoreProvider");return e},d=e=>{let{children:t}=e;const[n,l]=(0,r.useState)(i),[d,c]=(0,r.useState)(a),[u,p]=(0,r.useState)("Asia/Kuala_Lumpur");(0,r.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.timezone&&p(t.timezone)}}catch(e){}})()},[]),(0,r.useEffect)(()=>{(async()=>{try{const n=localStorage.getItem("auth_token");if(!n)return;const r=window.location.pathname.match(/\/restaurant\/(\d+)/);let o=r?parseInt(r[1]):null;if(!o&&window.location.pathname.includes("/mobile/")){const n=window.location.pathname.match(/\/mobile\/([^/]+)/);if(n){const r=n[1];try{const t=await fetch(`/api/restaurants/slug/${r}`);if(t.ok){var e;const n=await t.json();o=n.id||(null===(e=n.data)||void 0===e?void 0:e.id)}}catch(t){}}}if(!o){const e=await fetch("/api/auth/me",{credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}}});if(e.ok){o=(await e.json()).restaurant_id}}if(!o)return;const i=(new Date).getTime(),s=await fetch(`/api/store/settings?restaurantId=${o}&_t=${i}`,{credentials:"include",headers:{"Content-Type":"application/json","Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",...n?{Authorization:`Bearer ${n}`}:{}}});if(s.ok){const e=await s.json();if(e.success&&e.data){const t={name:e.data.name||"",businessRegistration:e.data.business_registration||"",phone:e.data.phone||"",email:e.data.email||"",address:e.data.address||"",city:e.data.city||"",state:e.data.state||"",postalCode:e.data.postal_code||"",gstRegNo:e.data.tax_id||""};if(l(t),e.data.operation_settings){const t="string"===typeof e.data.operation_settings?JSON.parse(e.data.operation_settings):e.data.operation_settings;c({...a,...t,currency:e.data.currency||"RM",cashRounding:e.data.cash_rounding||.05,roundingApplyTo:e.data.rounding_apply_to||"cash_only"})}else c({...a,currency:e.data.currency||"RM",cashRounding:e.data.cash_rounding||.05,roundingApplyTo:e.data.rounding_apply_to||"cash_only"})}}}catch(n){}})()},[]);return(0,o.jsx)(s.Provider,{value:{storeSettings:n,operationSettings:d,siteTimezone:u,updateSettings:e=>{e.store&&l(e.store),e.operations&&c(e.operations)},getStoreInfo:()=>n,getTakeawayCharge:e=>{if(!d.takeawayPricing.enabled)return 0;if("per-item"===d.takeawayPricing.pricingType)return d.takeawayPricing.perItemCharge;if(e){const t=e.toLowerCase();if(t in d.takeawayPricing.categoryCharges)return d.takeawayPricing.categoryCharges[t]}return d.takeawayPricing.categoryCharges.other}},children:t})}},9037:(e,t,n)=>{"use strict";n.d(t,{c:()=>a,y:()=>s});var r=n(9950),o=n(4414);const i=(0,r.createContext)(void 0),a=()=>{const e=(0,r.useContext)(i);if(!e)throw new Error("useCustomer must be used within a CustomerProvider");return e},s=e=>{let{children:t}=e;const[n,a]=(0,r.useState)(()=>{try{const e=localStorage.getItem("mobile_customer");return e?JSON.parse(e):null}catch{return null}}),[s,l]=(0,r.useState)(()=>{try{const e=localStorage.getItem("mobile_guest");return e?JSON.parse(e):null}catch{return null}}),d=e=>{a(e),e?localStorage.setItem("mobile_customer",JSON.stringify(e)):localStorage.removeItem("mobile_customer")},c=e=>{l(e),e?localStorage.setItem("mobile_guest",JSON.stringify(e)):localStorage.removeItem("mobile_guest")},[u,p]=(0,r.useState)([]),[h,m]=(0,r.useState)(!1),[g,f]=(0,r.useState)("guest"),x=!n&&!!s,y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},b=r.useRef(!1),v=(0,r.useCallback)(async e=>{if(!b.current){b.current=!0;try{let n=e;if(!n){const e=localStorage.getItem("user");if(e)try{const t=JSON.parse(e);n=t.restaurantId||t.restaurant_id}catch(t){}}if(!n){const e=window.location.pathname.match(/\/restaurant\/(\d+)/);e&&(n=e[1])}n||(n=1);const r=localStorage.getItem("auth_token"),o=await fetch(`/api/customers/${n}`,{credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}}}),i=await o.json();if(i.success&&Array.isArray(i.data)){const e=i.data.map(e=>({id:e.customer.id.toString(),type:e.customer.type,name:e.customer.name,phone:e.customer.phone,email:e.customer.email||"",points:e.points||0,totalOrders:e.total_orders||0,totalSpent:parseFloat(e.total_spent)||0,favoriteItems:[],addresses:[],joinDate:e.first_order_at?new Date(e.first_order_at).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],lastOrderDate:e.last_order_at?new Date(e.last_order_at).toISOString().split("T")[0]:void 0,loyaltyTier:e.loyalty_tier||"Bronze",isActive:!0}));p(e)}else p([])}catch(n){p([])}finally{b.current=!1}}},[]),w=async(e,t)=>{const r=u.map(n=>n.id===e?{...n,...t}:n);p(r);const o=r.find(t=>t.id===e);return(null===n||void 0===n?void 0:n.id)===e&&d(o),o},j=e=>u.find(t=>t.id===e)||null,k={currentCustomer:n,guestInfo:s,isGuest:x,customers:u,setCurrentCustomer:d,setGuestInfo:c,registerCustomer:async(e,t)=>{try{const n=await fetch("/api/customers/register",y({method:"POST",body:JSON.stringify({phone:e.phone,name:e.name,email:e.email,password:e.password,restaurantId:t||void 0})})),r=await n.json();if(!n.ok||!r.success)throw new Error(r.message||"Registration failed");const o={id:r.data.id.toString(),type:r.data.type,name:r.data.name,phone:r.data.phone,email:r.data.email||"",points:r.data.points||0,totalOrders:r.data.totalOrders||0,totalSpent:r.data.totalSpent||0,favoriteItems:[],addresses:[],joinDate:(new Date).toISOString().split("T")[0],loyaltyTier:r.data.loyaltyTier||"Bronze",isActive:!0};return d(o),c(null),await v(t),o}catch(n){throw n}},loginCustomer:async(e,t,n)=>{try{const r=await fetch("/api/customers/auth",y({method:"POST",body:JSON.stringify({phone:e,password:t,restaurantId:n||void 0})})),o=await r.json();if(!r.ok||!o.success)return null;const i={id:o.data.id.toString(),type:o.data.type,name:o.data.name,phone:o.data.phone,email:o.data.email||"",points:o.data.points||0,totalOrders:o.data.totalOrders||0,totalSpent:o.data.totalSpent||0,favoriteItems:[],addresses:[],joinDate:(new Date).toISOString().split("T")[0],loyaltyTier:o.data.loyaltyTier||"Bronze",isActive:!0};return d(i),c(null),i}catch(r){return null}},logoutCustomer:()=>{d(null),c(null)},updateCustomer:w,searchCustomers:e=>{if(!e.trim())return u;const t=e.toLowerCase();return u.filter(n=>{var r;return n.name.toLowerCase().includes(t)||n.phone.includes(e)||(null===(r=n.email)||void 0===r?void 0:r.toLowerCase().includes(t))})},getCustomerByPhone:e=>u.find(t=>t.phone===e)||null,getCustomerById:j,deleteCustomer:async e=>{try{const t=await fetch(`/api/customers/${e}`,y({method:"DELETE"})),r=await t.json();return!(!t.ok||!r.success)&&(p(u.filter(t=>t.id!==e)),(null===n||void 0===n?void 0:n.id)===e&&d(null),!0)}catch(t){return!1}},reloadCustomers:v,addPoints:(e,t)=>{var n;w(e,{points:((null===(n=j(e))||void 0===n?void 0:n.points)||0)+t})},usePoints:(e,t)=>{const n=j(e);return!(!n||n.points<t)&&(w(e,{points:n.points-t}),!0)},addToFavorites:(e,t)=>{const n=j(e);n&&!n.favoriteItems.includes(t)&&w(e,{favoriteItems:[...n.favoriteItems,t]})},removeFromFavorites:(e,t)=>{const n=j(e);n&&w(e,{favoriteItems:n.favoriteItems.filter(e=>e!==t)})},updateCustomerOrderStats:(e,t)=>{const n=j(e);if(!n)return;const r=Math.floor(t),o=n.totalSpent+t;let i="Bronze";o>=5e3?i="VIP":o>=2e3?i="Gold":o>=500&&(i="Silver"),w(e,{totalOrders:n.totalOrders+1,totalSpent:o,points:n.points+r,loyaltyTier:i,lastOrderDate:(new Date).toISOString().split("T")[0]})},showCustomerModal:h,setShowCustomerModal:m,customerModalMode:g,setCustomerModalMode:f};return(0,o.jsx)(i.Provider,{value:k,children:t})}},9487:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(!(0<i(o,t)))break e;e[r]=t,e[n]=o,n=r}}function r(e){return 0===e.length?null:e[0]}function o(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,a=o>>>1;r<a;){var s=2*(r+1)-1,l=e[s],d=s+1,c=e[d];if(0>i(l,n))d<o&&0>i(c,l)?(e[r]=c,e[d]=n,r=d):(e[r]=l,e[s]=n,r=s);else{if(!(d<o&&0>i(c,n)))break e;e[r]=c,e[d]=n,r=d}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var a=performance;t.unstable_now=function(){return a.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var d=[],c=[],u=1,p=null,h=3,m=!1,g=!1,f=!1,x=!1,y="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,v="undefined"!==typeof setImmediate?setImmediate:null;function w(e){for(var t=r(c);null!==t;){if(null===t.callback)o(c);else{if(!(t.startTime<=e))break;o(c),t.sortIndex=t.expirationTime,n(d,t)}t=r(c)}}function j(e){if(f=!1,w(e),!g)if(null!==r(d))g=!0,S||(S=!0,k());else{var t=r(c);null!==t&&z(j,t.startTime-e)}}var k,S=!1,A=-1,C=5,F=-1;function _(){return!!x||!(t.unstable_now()-F<C)}function E(){if(x=!1,S){var e=t.unstable_now();F=e;var n=!0;try{e:{g=!1,f&&(f=!1,b(A),A=-1),m=!0;var i=h;try{t:{for(w(e),p=r(d);null!==p&&!(p.expirationTime>e&&_());){var a=p.callback;if("function"===typeof a){p.callback=null,h=p.priorityLevel;var s=a(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof s){p.callback=s,w(e),n=!0;break t}p===r(d)&&o(d),w(e)}else o(d);p=r(d)}if(null!==p)n=!0;else{var l=r(c);null!==l&&z(j,l.startTime-e),n=!1}}break e}finally{p=null,h=i,m=!1}n=void 0}}finally{n?k():S=!1}}}if("function"===typeof v)k=function(){v(E)};else if("undefined"!==typeof MessageChannel){var P=new MessageChannel,B=P.port2;P.port1.onmessage=E,k=function(){B.postMessage(null)}}else k=function(){y(E,0)};function z(e,n){A=y(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},t.unstable_scheduleCallback=function(e,o,i){var a=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?a+i:a:i=a,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:u++,callback:o,priorityLevel:e,startTime:i,expirationTime:s=i+s,sortIndex:-1},i>a?(e.sortIndex=i,n(c,e),null===r(d)&&e===r(c)&&(f?(b(A),A=-1):f=!0,z(j,i-a))):(e.sortIndex=s,n(d,e),g||m||(g=!0,S||(S=!0,k()))),e},t.unstable_shouldYield=_,t.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}},9610:(e,t,n)=>{"use strict";n.d(t,{Ay:()=>S,FX:()=>x,IM:()=>b,Lz:()=>y,ZQ:()=>f,aF:()=>j,fh:()=>h,gE:()=>m,lR:()=>g,mH:()=>a,yl:()=>v,zf:()=>k});n(9950);var r=n(7119),o=n(4752),i=n(4414);const a=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,s=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  flex-shrink: 0;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 80px);
  overflow: hidden;
`,l=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,d=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,c=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`,u=o.Ay.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
`,p=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
`,h=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,m=o.Ay.div`
  margin-bottom: 20px;
`,g=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,f=o.Ay.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,x=o.Ay.select`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }
`,y=o.Ay.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,b=o.Ay.div`
  display: ${e=>!1===e.show?"none":"block"};
  margin-top: 16px;
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  line-height: 1.5;
`,v=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>{switch(e.variant){case"primary":case"danger":return"none";default:return"1px solid #E6EBF1"}}};
  background: ${e=>{switch(e.variant){case"primary":return"#635BFF";case"danger":return"#DC2626";default:return"white"}}};
  color: ${e=>{switch(e.variant){case"primary":case"danger":return"white";default:return"#6B7C93"}}};

  &:hover:not(:disabled) {
    background: ${e=>{switch(e.variant){case"primary":return"#5A51E6";case"danger":return"#B91C1C";default:return"#F8FAFC"}}};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${e=>{switch(e.variant){case"primary":return"#A5A0FF";case"danger":return"#FCA5A5";default:return"#F3F4F6"}}};
    color: ${e=>{switch(e.variant){case"primary":case"danger":return"rgba(255, 255, 255, 0.7)";default:return"#D1D5DB"}}};
    cursor: not-allowed;
    transform: none;
    opacity: 1;
  }
`,w=e=>{let{isOpen:t,onClose:n,title:o,children:h,footer:m,maxWidth:g,size:f="medium",headerActions:x}=e;if(!t)return null;const y=(0,i.jsx)(a,{onClick:n,children:(0,i.jsxs)(s,{style:{maxWidth:(()=>{if(g)return g;switch(f){case"small":return"400px";case"large":return"800px";default:return"600px"}})()},onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(l,{children:[(0,i.jsx)(d,{children:o}),(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[x,(0,i.jsx)(c,{onClick:n,children:"\xd7"})]})]}),(0,i.jsx)(u,{children:h}),m&&(0,i.jsx)(p,{children:m})]})});return r.createPortal(y,document.body)},j=w,k=w,S=w},9950:(e,t,n)=>{"use strict";e.exports=n(1983)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var i=Object.create(null);n.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&r;("object"==typeof s||"function"==typeof s)&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>a[e]=()=>r[e]);return a.default=()=>r,n.d(i,a),i}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce((t,r)=>(n.f[r](e,t),t),[])),n.u=e=>"static/js/"+e+"."+{6:"740be5d4",265:"7273bc05",276:"e6817c3d",347:"e4d95a4a",408:"50694b4b",441:"a38c72cd",677:"64bb1967",733:"a8447c67",749:"bfad10d8",758:"c2b5064a",1038:"da6b7386",1143:"a6ea14bf",1231:"abc5d48c",1268:"b9254bf8",1291:"b6b6e918",1323:"19a08c15",1450:"96979ab4",1513:"d5d291f5",1748:"2688dd91",1770:"bc5ca880",2045:"837ac7ce",2341:"a436c08b",2370:"1242a183",2476:"62f2cf36",2612:"deb27e31",2652:"2de489a5",2766:"d69450a9",2790:"513fdbb8",2890:"004aa8fc",2940:"cc140cf6",2980:"f96b901d",3201:"7a60b5c7",3377:"a0b0e51b",3416:"c3b75ccf",3422:"988d9358",3534:"67042afc",3543:"bdc5683f",3585:"edfe8e15",3643:"10e660e9",3667:"6b960b7b",3724:"c663bdd6",3913:"cf9e319f",4022:"ce157671",4083:"7af7bf39",4105:"0371633e",4107:"d1f8a823",4240:"b7555169",4263:"8d105289",4269:"523b2db0",4293:"1d2dd065",4325:"81f25c2f",4551:"92f5f6ff",4636:"eb773414",4648:"0262e45b",4656:"7274504a",4685:"c2a07f17",4802:"309af816",4833:"0625ca5e",4987:"c47a8926",5008:"cc6979e7",5082:"027b11f9",5373:"02ba47f7",5577:"06d59342",5581:"1d0c575f",5612:"9b8371b3",5637:"834eab66",5646:"60afd811",5684:"cd7d9844",5747:"d7ce1d7c",5863:"381b2a1f",5871:"5d8d4387",5940:"044711ce",6e3:"c62393d2",6121:"b08e9869",6136:"4e6a5b3a",6152:"ce057fb2",6312:"d0d29037",6458:"992434f4",6529:"67715241",6554:"f9a2955a",6780:"490edd23",6814:"3304f4e3",6832:"2f15cc76",6837:"1de815e5",6843:"1fd66732",6866:"0ebd45c6",6929:"ee91dd9a",6950:"3362c544",7082:"23c703a9",7121:"0df3af78",7140:"4b8cf1f4",7283:"544e56ff",7565:"bbf7f618",7576:"459efb41",7592:"fce043f3",7606:"7056fd34",7771:"130ef207",7795:"9129db62",7909:"27dfa742",7999:"dde52456",8018:"37a3f66f",8026:"ffad86b4",8060:"a62e9de9",8186:"c4c31702",8206:"4381c638",8309:"d789603d",8317:"0f2302b3",8348:"1930d2e0",8725:"9f83dbf0",8844:"0cab6801",9133:"6043037a",9134:"2389cac3",9163:"6ef9c081",9246:"b7288ce5",9327:"70504bda",9328:"2d4da45d",9440:"f1793428",9485:"4b28defa",9640:"bf41b74a",9641:"2afb319c",9647:"af16429b",9684:"2e9a4f73",9876:"f20fb19f",9889:"bdc6fa93"}[e]+".chunk.js",n.miniCssF=e=>{},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="frontend:";n.l=(r,o,i,a)=>{if(e[r])e[r].push(o);else{var s,l;if(void 0!==i)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+i){s=u;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=r),e[r]=[o];var p=(t,n)=>{s.onerror=s.onload=null,clearTimeout(h);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach(e=>e(n)),t)return t(n)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={8792:0};n.f.j=(t,r)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((n,r)=>o=e[t]=[n,r]);r.push(o[2]=i);var a=n.p+n.u(t),s=new Error;n.l(a,r=>{if(n.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,o[1](s)}},"chunk-"+t,t)}};var t=(t,r)=>{var o,i,a=r[0],s=r[1],l=r[2],d=0;if(a.some(t=>0!==e[t])){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)l(n)}for(t&&t(r);d<a.length;d++)i=a[d],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0},r=self.webpackChunkfrontend=self.webpackChunkfrontend||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0,(()=>{"use strict";var e=n(9950),t=n(1352),r=n(4901),o=n.n(r),i=n(949),a=n.n(i),s=n(403),l=n.n(s),d=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(d||{}),c={rel:["amphtml","canonical","alternate"]},u={type:["application/ld+json"]},p={charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},h=Object.values(d),m={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},g=Object.entries(m).reduce((e,t)=>{let[n,r]=t;return e[r]=n,e},{}),f="data-rh",x="defaultTitle",y="defer",b="encodeSpecialCharacters",v="onChangeClientState",w="titleTemplate",j="prioritizeSeoTags",k=(e,t)=>{for(let n=e.length-1;n>=0;n-=1){const r=e[n];if(Object.prototype.hasOwnProperty.call(r,t))return r[t]}return null},S=e=>{let t=k(e,"title");const n=k(e,w);if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,()=>t);const r=k(e,x);return t||r||void 0},A=e=>k(e,v)||(()=>{}),C=(e,t)=>t.filter(t=>"undefined"!==typeof t[e]).map(t=>t[e]).reduce((e,t)=>({...e,...t}),{}),F=(e,t)=>t.filter(e=>"undefined"!==typeof e.base).map(e=>e.base).reverse().reduce((t,n)=>{if(!t.length){const r=Object.keys(n);for(let o=0;o<r.length;o+=1){const i=r[o].toLowerCase();if(-1!==e.indexOf(i)&&n[i])return t.concat(n)}}return t},[]),_=(e,t,n)=>{const r={};return n.filter(t=>{return!!Array.isArray(t[e])||("undefined"!==typeof t[e]&&(n=`Helmet: ${e} should be of type "Array". Instead found type "${typeof t[e]}"`,console&&"function"===typeof console.warn&&console.warn(n)),!1);var n}).map(t=>t[e]).reverse().reduce((e,n)=>{const o={};n.filter(e=>{let n;const i=Object.keys(e);for(let r=0;r<i.length;r+=1){const o=i[r],a=o.toLowerCase();-1===t.indexOf(a)||"rel"===n&&"canonical"===e[n].toLowerCase()||"rel"===a&&"stylesheet"===e[a].toLowerCase()||(n=a),-1===t.indexOf(o)||"innerHTML"!==o&&"cssText"!==o&&"itemprop"!==o||(n=o)}if(!n||!e[n])return!1;const a=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][a]&&(o[n][a]=!0,!0)}).reverse().forEach(t=>e.push(t));const i=Object.keys(o);for(let t=0;t<i.length;t+=1){const e=i[t],n={...r[e],...o[e]};r[e]=n}return e},[]).reverse()},E=(e,t)=>{if(Array.isArray(e)&&e.length)for(let n=0;n<e.length;n+=1){if(e[n][t])return!0}return!1},P=e=>Array.isArray(e)?e.join(""):e,B=(e,t)=>Array.isArray(e)?e.reduce((e,n)=>(((e,t)=>{const n=Object.keys(e);for(let r=0;r<n.length;r+=1)if(t[n[r]]&&t[n[r]].includes(e[n[r]]))return!0;return!1})(n,t)?e.priority.push(n):e.default.push(n),e),{priority:[],default:[]}):{default:e,priority:[]},z=(e,t)=>({...e,[t]:void 0}),R=["noscript","script","style"],T=function(e){return!1===(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},O=e=>Object.keys(e).reduce((t,n)=>{const r="undefined"!==typeof e[n]?`${n}="${e[n]}"`:`${n}`;return t?`${t} ${r}`:r},""),I=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((t,n)=>(t[m[n]||n]=e[n],t),t)},$=(t,n)=>n.map((n,r)=>{const o={key:r,[f]:!0};return Object.keys(n).forEach(e=>{const t=m[e]||e;if("innerHTML"===t||"cssText"===t){const e=n.innerHTML||n.cssText;o.dangerouslySetInnerHTML={__html:e}}else o[t]=n[e]}),e.createElement(t,o)}),M=function(t,n){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];switch(t){case"title":return{toComponent:()=>((t,n,r)=>{const o=I(r,{key:n,[f]:!0});return[e.createElement("title",o,n)]})(0,n.title,n.titleAttributes),toString:()=>((e,t,n,r)=>{const o=O(n),i=P(t);return o?`<${e} ${f}="true" ${o}>${T(i,r)}</${e}>`:`<${e} ${f}="true">${T(i,r)}</${e}>`})(t,n.title,n.titleAttributes,r)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>I(n),toString:()=>O(n)};default:return{toComponent:()=>$(t,n),toString:()=>function(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return t.reduce((t,r)=>{const o=r,i=Object.keys(o).filter(e=>!("innerHTML"===e||"cssText"===e)).reduce((e,t)=>{const r="undefined"===typeof o[t]?t:`${t}="${T(o[t],n)}"`;return e?`${e} ${r}`:r},""),a=o.innerHTML||o.cssText||"",s=-1===R.indexOf(e);return`${t}<${e} ${f}="true" ${i}${s?"/>":`>${a}</${e}>`}`},"")}(t,n,r)}}},D=e=>{const{baseTag:t,bodyAttributes:n,encode:r=!0,htmlAttributes:o,noscriptTags:i,styleTags:a,title:s="",titleAttributes:l,prioritizeSeoTags:d}=e;let{linkTags:h,metaTags:m,scriptTags:g}=e,f={toComponent:()=>{},toString:()=>""};return d&&({priorityMethods:f,linkTags:h,metaTags:m,scriptTags:g}=(e=>{let{metaTags:t,linkTags:n,scriptTags:r,encode:o}=e;const i=B(t,p),a=B(n,c),s=B(r,u);return{priorityMethods:{toComponent:()=>[...$("meta",i.priority),...$("link",a.priority),...$("script",s.priority)],toString:()=>`${M("meta",i.priority,o)} ${M("link",a.priority,o)} ${M("script",s.priority,o)}`},metaTags:i.default,linkTags:a.default,scriptTags:s.default}})(e)),{priority:f,base:M("base",t,r),bodyAttributes:M("bodyAttributes",n,r),htmlAttributes:M("htmlAttributes",o,r),link:M("link",h,r),meta:M("meta",m,r),noscript:M("noscript",i,r),script:M("script",g,r),style:M("style",a,r),title:M("title",{title:s,titleAttributes:l},r)}},N=[],L=!("undefined"===typeof window||!window.document||!window.document.createElement),q=class{instances=[];canUseDOM=(()=>L)();context;value={setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?N:this.instances,add:e=>{(this.canUseDOM?N:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?N:this.instances).indexOf(e);(this.canUseDOM?N:this.instances).splice(t,1)}}};constructor(e,t){this.context=e,this.canUseDOM=t||!1,t||(e.helmet=D({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},H=e.createContext({}),W=class t extends e.Component{static canUseDOM=(()=>L)();helmetData;constructor(e){super(e),this.helmetData=new q(this.props.context||{},t.canUseDOM)}render(){return e.createElement(H.Provider,{value:this.helmetData.value},this.props.children)}},U=(e,t)=>{const n=document.head||document.querySelector("head"),r=n.querySelectorAll(`${e}[${f}]`),o=[].slice.call(r),i=[];let a;return t&&t.length&&t.forEach(t=>{const n=document.createElement(e);for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))if("innerHTML"===e)n.innerHTML=t.innerHTML;else if("cssText"===e)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{const r=e,o="undefined"===typeof t[r]?"":t[r];n.setAttribute(e,o)}n.setAttribute(f,"true"),o.some((e,t)=>(a=t,n.isEqualNode(e)))?o.splice(a,1):i.push(n)}),o.forEach(e=>e.parentNode?.removeChild(e)),i.forEach(e=>n.appendChild(e)),{oldTags:o,newTags:i}},G=(e,t)=>{const n=document.getElementsByTagName(e)[0];if(!n)return;const r=n.getAttribute(f),o=r?r.split(","):[],i=[...o],a=Object.keys(t);for(const s of a){const e=t[s]||"";n.getAttribute(s)!==e&&n.setAttribute(s,e),-1===o.indexOf(s)&&o.push(s);const r=i.indexOf(s);-1!==r&&i.splice(r,1)}for(let s=i.length-1;s>=0;s-=1)n.removeAttribute(i[s]);o.length===i.length?n.removeAttribute(f):n.getAttribute(f)!==a.join(",")&&n.setAttribute(f,a.join(","))},Y=(e,t)=>{const{baseTag:n,bodyAttributes:r,htmlAttributes:o,linkTags:i,metaTags:a,noscriptTags:s,onChangeClientState:l,scriptTags:d,styleTags:c,title:u,titleAttributes:p}=e;G("body",r),G("html",o),((e,t)=>{"undefined"!==typeof e&&document.title!==e&&(document.title=P(e)),G("title",t)})(u,p);const h={baseTag:U("base",n),linkTags:U("link",i),metaTags:U("meta",a),noscriptTags:U("noscript",s),scriptTags:U("script",d),styleTags:U("style",c)},m={},g={};Object.keys(h).forEach(e=>{const{newTags:t,oldTags:n}=h[e];t.length&&(m[e]=t),n.length&&(g[e]=h[e].oldTags)}),t&&t(),l(e,m,g)},V=null,Q=e=>{V&&cancelAnimationFrame(V),e.defer?V=requestAnimationFrame(()=>{Y(e,()=>{V=null})}):(Y(e),V=null)},K=class extends e.Component{rendered=!1;shouldComponentUpdate(e){return!l()(e,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:e}=this.props.context;e.remove(this),this.emitChange()}emitChange(){const{helmetInstances:e,setHelmet:t}=this.props.context;let n=null;const r=(o=e.get().map(e=>{const t={...e.props};return delete t.context,t}),{baseTag:F(["href"],o),bodyAttributes:C("bodyAttributes",o),defer:k(o,y),encode:k(o,b),htmlAttributes:C("htmlAttributes",o),linkTags:_("link",["rel","href"],o),metaTags:_("meta",["name","charset","http-equiv","property","itemprop"],o),noscriptTags:_("noscript",["innerHTML"],o),onChangeClientState:A(o),scriptTags:_("script",["src","innerHTML"],o),styleTags:_("style",["cssText"],o),title:S(o),titleAttributes:C("titleAttributes",o),prioritizeSeoTags:E(o,j)});var o;W.canUseDOM?Q(r):D&&(n=D(r)),t(n)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:e}=this.props.context;e.add(this),this.emitChange()}render(){return this.init(),null}},J=class extends e.Component{static defaultProps={defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1};shouldComponentUpdate(e){return!o()(z(this.props,"helmetData"),z(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,n,r){return{...t,[e.type]:[...t[e.type]||[],{...n,...this.mapNestedChildrenToProps(e,r)}]}}mapObjectTypeChildren(e,t,n,r){switch(e.type){case"title":return{...t,[e.type]:r,titleAttributes:{...n}};case"body":return{...t,bodyAttributes:{...n}};case"html":return{...t,htmlAttributes:{...n}};default:return{...t,[e.type]:{...n}}}}mapArrayTypeChildrenToProps(e,t){let n={...t};return Object.keys(e).forEach(t=>{n={...n,[t]:e[t]}}),n}warnOnInvalidChildren(e,t){return a()(h.some(t=>e.type===t),"function"===typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${h.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),a()(!t||"string"===typeof t||Array.isArray(t)&&!t.some(e=>"string"!==typeof e),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(t,n){let r={};return e.Children.forEach(t,e=>{if(!e||!e.props)return;const{children:t,...o}=e.props,i=Object.keys(o).reduce((e,t)=>(e[g[t]||t]=o[t],e),{});let{type:a}=e;switch("symbol"===typeof a?a=a.toString():this.warnOnInvalidChildren(e,t),a){case"Symbol(react.fragment)":n=this.mapChildrenToProps(t,n);break;case"link":case"meta":case"noscript":case"script":case"style":r=this.flattenArrayTypeChildren(e,r,i,t);break;default:n=this.mapObjectTypeChildren(e,n,i,t)}}),this.mapArrayTypeChildrenToProps(r,n)}render(){const{children:t,...n}=this.props;let r={...n},{helmetData:o}=n;if(t&&(r=this.mapChildrenToProps(t,r)),o&&!(o instanceof q)){o=new q(o.context,!0),delete r.helmetData}return o?e.createElement(K,{...r,context:o.value}):e.createElement(H.Consumer,null,t=>e.createElement(K,{...r,context:t}))}},X=n(4492),Z=n(4752),ee=n(8819);const te=Z.DU`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    font-family: ${ee.w.typography.fontFamily};
    font-size: ${ee.w.typography.fontSize.base};
    color: ${ee.w.colors.text.primary};
    background-color: ${ee.w.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${ee.w.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${ee.w.colors.text.secondary};
    border-radius: ${ee.w.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${ee.w.colors.text.primary};
  }

  /* Animations */
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes blink {
    0%, 50%, 100% {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0.5;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Utility Classes */
  .pulse {
    animation: pulse 2s infinite;
  }

  .blink {
    animation: blink 2s infinite;
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
`;var ne=n(4414);const re=(0,e.createContext)(ee.w),oe=e=>{let{children:t}=e;return(0,ne.jsx)(re.Provider,{value:ee.w,children:(0,ne.jsxs)(Z.NP,{theme:ee.w,children:[(0,ne.jsx)(te,{}),t]})})};var ie=n(447),ae=n(9018),se=n(8930),le=n(9037),de=n(5781),ce=n(1367),ue=n(6038);const pe=(e,t)=>{const n=new Date(e);return n.setDate(n.getDate()+t),n},he=e=>{switch(e){case"partial":return["New Orders (POS Terminal)","Reports & Analytics","Promotions Management","New Customer Registration"];case"blocked":return["All POS Functions","Kitchen Display","Customer Display","Reports & Analytics","Staff Management","Menu Management","All Business Operations"];default:return[]}},me=(0,e.createContext)(void 0),ge=()=>{const t=(0,e.useContext)(me);if(!t)throw new Error("usePaymentStatus must be used within PaymentStatusProvider");return t},fe=t=>{let{children:n}=t;const{user:r}=(0,ce.As)(),[o,i]=(0,e.useState)({hasOverdue:!1,overdueAmount:0,overdueDays:0,restrictionLevel:"none",overdueInvoices:[]}),[a,s]=(0,e.useState)(!1),[l,d]=(0,e.useState)(!1),[c,u]=(0,e.useState)(!1),[p,h]=(0,e.useState)(!1),[m,g]=(0,e.useState)(!1),f=()=>{if(!r)return;if("System Admin"===r.role)return void i({hasOverdue:!1,overdueAmount:0,overdueDays:0,restrictionLevel:"none",overdueInvoices:[]});const e=(()=>{const e=[],t=e.length>0,n=Math.max(...e.map(e=>e.overdueDays)),r=e.reduce((e,t)=>e+t.amount,0);let o,i="none";return n>=8?i="blocked":n>=4?(i="partial",o=pe(new Date,8-n).toISOString().split("T")[0]):n>=1&&(i="warning",o=pe(new Date,4-n).toISOString().split("T")[0]),{hasOverdue:t,overdueAmount:r,overdueDays:n,restrictionLevel:i,nextRestrictionDate:o,overdueInvoices:e}})(r.role,r.id);i(e),"warning"!==e.restrictionLevel||p?"partial"!==e.restrictionLevel||m?"blocked"===e.restrictionLevel&&u(!0):d(!0):s(!0)};return(0,e.useEffect)(()=>{f();const e=setInterval(f,18e5);return()=>clearInterval(e)},[r]),(0,ne.jsx)(me.Provider,{value:{paymentStatus:o,refreshPaymentStatus:f,canAccess:e=>((e,t)=>{if(["/invoices","/profile","/settings","/logout"].some(t=>e.includes(t)))return!0;switch(t){case"none":case"warning":default:return!0;case"partial":return!["/pos-terminal","/reports","/analytics","/coupons"].some(t=>e.includes(t));case"blocked":return!1}})(e,o.restrictionLevel),showWarning:a,showPartialRestriction:l,showBlockedModal:c,dismissWarning:()=>{s(!1),h(!0),setTimeout(()=>h(!1),36e5)},dismissPartialRestriction:()=>{d(!1),g(!0),setTimeout(()=>g(!1),72e5)}},children:n})},xe={site_name:"PurpleHere",brand_logo_url:null,favicon_url:null,seo_title:"PurpleHere - Cloud POS System",seo_description:"Subscription-based cloud POS system for restaurants, brands, and food courts.",seo_keywords:null,og_image_url:null,contact_email:null,contact_phone:null},ye=(0,e.createContext)({settings:xe,loading:!0}),be=t=>{let{children:n}=t;const[r,o]=(0,e.useState)(xe),[i,a]=(0,e.useState)(!0);(0,e.useEffect)(()=>{s()},[]);const s=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();o({site_name:t.site_name||xe.site_name,brand_logo_url:t.brand_logo_url,favicon_url:t.favicon_url,seo_title:t.seo_title,seo_description:t.seo_description,seo_keywords:t.seo_keywords,og_image_url:t.og_image_url,contact_email:t.contact_email,contact_phone:t.contact_phone})}}catch(e){console.error("Failed to load site settings:",e)}a(!1)};return(0,ne.jsx)(ye.Provider,{value:{settings:r,loading:i},children:n})},ve=Z.Ay.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
`,we=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,je=Z.Ay.h2`
  font-size: 24px;
  color: #0A2540;
  margin-bottom: 12px;
`,ke=Z.Ay.p`
  color: #6B7280;
  margin-bottom: 24px;
`,Se=Z.Ay.button`
  padding: 10px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #5A51E6;
  }
`,Ae=Z.Ay.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
`,Ce=Z.Ay.div`
  width: 40px;
  height: 40px;
  border: 4px solid #E6EBF1;
  border-top: 4px solid #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,Fe=e=>{let{children:t,requiredRole:n,requiredPermission:r,requireRestaurantMatch:o=!1}=e;const{user:i,isAuthenticated:a,isLoading:s,hasPermission:l,canAccessRoute:d}=(0,ce.As)(),c=(0,X.zy)(),u=(0,X.Zp)(),p=(0,X.g)();if(s)return(0,ne.jsx)(Ae,{children:(0,ne.jsx)(Ce,{})});if(!a)return(0,ne.jsx)(X.C5,{to:"/pos",state:{from:c},replace:!0});if(o&&p.restaurantId&&i){const e=parseInt(p.restaurantId,10),t=i.restaurantId?Number(i.restaurantId):void 0;if(!("System Admin"===i.role)&&t&&t!==e){const e=`/restaurant/${t}/${c.pathname.split("/").filter(Boolean).slice(2).join("/")||"dashboard"}`;return(0,ne.jsx)(X.C5,{to:e,replace:!0})}}if(n&&i&&!n.includes(i.role))switch(i.role){case"System Admin":return(0,ne.jsx)(X.C5,{to:"/pos/admin/dashboard",replace:!0});case"Foodcourt General":return(0,ne.jsx)(X.C5,{to:"/pos/foodcourt/general/dashboard",replace:!0});case"Brand General":return(0,ne.jsx)(X.C5,{to:"/pos/brand/general/dashboard",replace:!0});case"Foodcourt Manager":return(0,ne.jsx)(X.C5,{to:"/pos/foodcourt/dashboard",replace:!0});case"Brand Manager":return(0,ne.jsx)(X.C5,{to:"/pos/brand/dashboard",replace:!0});case"Restaurant Admin":case"Staff":return(0,ne.jsx)(X.C5,{to:`/restaurant/${i.restaurantId||"1"}/dashboard`,replace:!0});case"Restaurant Owner":return(0,ne.jsx)(X.C5,{to:"/pos/owner/dashboard",replace:!0});default:return(0,ne.jsx)(X.C5,{to:"/pos",replace:!0})}if(r&&!l(r))return(0,ne.jsx)(ve,{children:(0,ne.jsxs)(we,{children:[(0,ne.jsx)(je,{children:"Insufficient Permissions"}),(0,ne.jsx)(ke,{children:"You don't have the required permission to perform this action."}),(0,ne.jsx)(Se,{onClick:()=>u(-1),children:"Go Back"})]})});if(n&&n.length>0){if(!(["/pos/recipes","/pos/ingredients","/pos/brand-products","/pos/brand-product-recipes","/pos/brand-inventory","/pos/suppliers","/pos/brand/company-info","/pos/brand/invoices","/pos/brand/plans","/pos/brand/payment-settings","/pos/brand/general","/pos/brand/dashboard","/pos/brand/reports","/pos/brand/franchise-support","/pos/manager/restaurants","/pos/manager/invoices","/pos/manager/subscriptions","/pos/manager/admins","/pos/manager/customers","/pos/manager/coupons","/pos/manager/sales","/pos/manager/reports","/pos/manager/support","/pos/manager/operation-inquiry","/pos/manager/plans","/pos/manager/notification-settings","/pos/foodcourt/company-info","/pos/foodcourt/invoices","/pos/foodcourt/plans","/pos/foodcourt/payment-settings","/pos/foodcourt/general","/pos/foodcourt/dashboard","/pos/foodcourt/rent-management","/pos/foodcourt/tenant-support","/pos/brand/manager","/pos/foodcourt/manager","/pos/owner/dashboard","/pos/owner/restaurants","/pos/owner/reports","/pos/owner/invoices","/pos/profile"].some(e=>c.pathname.startsWith(e))&&i&&("Brand General"===i.role||"Brand Manager"===i.role||"Foodcourt General"===i.role||"Foodcourt Manager"===i.role||"Restaurant Owner"===i.role||"System Admin"===i.role))&&!d(c.pathname))switch(null===i||void 0===i?void 0:i.role){case"System Admin":return(0,ne.jsx)(X.C5,{to:"/pos/admin/dashboard",replace:!0});case"Foodcourt General":return(0,ne.jsx)(X.C5,{to:"/pos/foodcourt/general/dashboard",replace:!0});case"Brand General":return(0,ne.jsx)(X.C5,{to:"/pos/brand/general/dashboard",replace:!0});case"Foodcourt Manager":return(0,ne.jsx)(X.C5,{to:"/pos/foodcourt/dashboard",replace:!0});case"Brand Manager":return(0,ne.jsx)(X.C5,{to:"/pos/brand/dashboard",replace:!0});case"Restaurant Admin":case"Staff":return(0,ne.jsx)(X.C5,{to:`/restaurant/${i.restaurantId||"1"}/dashboard`,replace:!0});case"Restaurant Owner":return(0,ne.jsx)(X.C5,{to:"/pos/owner/dashboard",replace:!0});default:return(0,ne.jsx)(X.C5,{to:"/pos",replace:!0})}}return(0,ne.jsx)(ne.Fragment,{children:t})},_e=()=>{const{pathname:t}=(0,X.zy)();return(0,e.useEffect)(()=>{"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual")},[]),(0,e.useEffect)(()=>{window.scrollTo({top:0,left:0,behavior:"instant"})},[t]),null},Ee="cookie_consent_accepted",Pe=Z.i7`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,Be=Z.Ay.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  animation: ${Pe} 0.4s ease-out;
`,ze=Z.Ay.div`
  background: #1A1A2E;
  color: #E0E0E0;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 16px 20px;
    gap: 16px;
  }
`,Re=Z.Ay.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.5;

  a {
    color: #635BFF;
    text-decoration: underline;

    &:hover {
      color: #8B83FF;
    }
  }
`,Te=Z.Ay.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`,Oe=Z.Ay.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: #5A51E6;
  }
`,Ie=Z.Ay.button`
  background: transparent;
  color: #999;
  border: 1px solid #444;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #666;
    color: #ccc;
  }
`,$e=()=>{const[t,n]=(0,e.useState)(!1),r=(0,X.zy)(),o=r.pathname.startsWith("/pos")||r.pathname.startsWith("/restaurant")||r.pathname.startsWith("/kitchen")||r.pathname.startsWith("/customer-display")||r.pathname.startsWith("/mobile-order");(0,e.useEffect)(()=>{const e=localStorage.getItem(Ee);if(!e&&!o){const e=setTimeout(()=>n(!0),1e3);return()=>clearTimeout(e)}"true"===e&&"function"===typeof window.gtag&&window.gtag("consent","update",{analytics_storage:"granted",ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"})},[o]);return t?(0,ne.jsx)(Be,{children:(0,ne.jsxs)(ze,{children:[(0,ne.jsxs)(Re,{children:['We use cookies to enhance your experience and analyze site traffic. By clicking "Accept All", you consent to our use of cookies. See our ',(0,ne.jsx)("a",{href:"/privacy",children:"Privacy Policy"})," for details."]}),(0,ne.jsxs)(Te,{children:[(0,ne.jsx)(Ie,{onClick:()=>{localStorage.setItem(Ee,"essential_only"),"function"===typeof window.gtag&&window.gtag("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"}),n(!1)},children:"Essential Only"}),(0,ne.jsx)(Oe,{onClick:()=>{localStorage.setItem(Ee,"true"),"function"===typeof window.gtag&&window.gtag("consent","update",{analytics_storage:"granted",ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"}),n(!1)},children:"Accept All"})]})]})}):null};var Me=n(755);const De=Z.Ay.div`
  background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%);
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: between;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
`,Ne=Z.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,Le=Z.Ay.div`
  font-size: 24px;
  color: #D97706;
`,qe=Z.Ay.div`
  color: #92400E;
`,He=Z.Ay.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`,We=Z.Ay.div`
  font-size: 14px;
  line-height: 1.4;
`,Ue=Z.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,Ge=Z.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #D97706;\n    color: white;\n    \n    &:hover {\n      background: #B45309;\n    }\n  ":"\n    background: transparent;\n    color: #92400E;\n    border: 1px solid #D97706;\n    \n    &:hover {\n      background: rgba(217, 119, 6, 0.1);\n    }\n  "}
`,Ye=Z.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  margin: auto 0;
`,Ve=Z.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: auto 0;
`,Qe=Z.Ay.div`
  padding: 24px 24px 16px 24px;
  background: ${e=>"blocked"===e.type?"linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)":"linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)"};
  border-bottom: 1px solid ${e=>"blocked"===e.type?"#FCA5A5":"#F59E0B"};
  text-align: center;
`,Ke=Z.Ay.div`
  font-size: 48px;
  margin-bottom: 12px;
  color: ${e=>"blocked"===e.type?"#DC2626":"#D97706"};
`,Je=Z.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>"blocked"===e.type?"#991B1B":"#92400E"};
  margin: 0 0 8px 0;
`,Xe=Z.Ay.p`
  font-size: 16px;
  color: ${e=>"blocked"===e.type?"#B91C1C":"#A16207"};
  margin: 0;
`,Ze=Z.Ay.div`
  padding: 24px;
`,et=Z.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  text-align: center;
`,tt=Z.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
`,nt=Z.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #DC2626;
`,rt=Z.Ay.div`
  margin-bottom: 20px;
`,ot=Z.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,it=Z.Ay.ul`
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
  
  li {
    position: relative;
    font-size: 14px;
    color: #6B7280;
    margin-bottom: 8px;
    padding-left: 8px;
    
    &::before {
      content: '⛔';
      position: absolute;
      left: -16px;
      top: 0;
    }
  }
`,at=Z.Ay.div`
  background: #FEF2F2;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,st=Z.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
  margin: 0 0 12px 0;
`,lt=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #FCA5A5;
  
  &:last-child {
    border-bottom: none;
  }
`,dt=Z.Ay.div`
  font-size: 14px;
  color: #7F1D1D;
`,ct=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
`,ut=Z.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
`,pt=Z.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #DC2626;\n    color: white;\n    \n    &:hover {\n      background: #B91C1C;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,ht=()=>{const{paymentStatus:e,showWarning:t,showPartialRestriction:n,showBlockedModal:r,dismissWarning:o,dismissPartialRestriction:i}=ge(),a=(0,X.Zp)(),s=()=>{a("/invoices")};if(t&&"warning"===e.restrictionLevel)return(0,ne.jsxs)(De,{children:[(0,ne.jsxs)(Ne,{children:[(0,ne.jsx)(Le,{children:"!"}),(0,ne.jsxs)(qe,{children:[(0,ne.jsx)(He,{children:"Payment Reminder"}),(0,ne.jsxs)(We,{children:["You have ",(0,ue.vv)(e.overdueAmount)," in overdue invoices. Some features may be restricted in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days if not paid."]})]})]}),(0,ne.jsxs)(Ue,{children:[(0,ne.jsx)(Ge,{variant:"primary",onClick:s,children:"Pay Now"}),(0,ne.jsx)(Ge,{onClick:o,children:"Dismiss"})]})]});if(n&&"partial"===e.restrictionLevel){const t=he("partial");return(0,ne.jsx)(Ye,{children:(0,ne.jsxs)(Ve,{children:[(0,ne.jsxs)(Qe,{type:"partial",children:[(0,ne.jsx)(Ke,{type:"partial",children:"\xd7"}),(0,ne.jsx)(Je,{type:"partial",children:"Service Restrictions Active"}),(0,ne.jsxs)(Xe,{type:"partial",children:["Payment overdue for ",e.overdueDays," days"]})]}),(0,ne.jsxs)(Ze,{children:[(0,ne.jsxs)(et,{children:[(0,ne.jsx)(tt,{children:"Outstanding Amount"}),(0,ne.jsx)(nt,{children:(0,ue.vv)(e.overdueAmount)})]}),(0,ne.jsxs)(rt,{children:[(0,ne.jsx)(ot,{children:"Restricted Features:"}),(0,ne.jsx)(it,{children:t.map((e,t)=>(0,ne.jsx)("li",{children:e},t))})]}),(0,ne.jsxs)(at,{children:[(0,ne.jsx)(st,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,ne.jsxs)(lt,{children:[(0,ne.jsxs)(dt,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,ne.jsx)(ct,{children:(0,ue.vv)(e.amount)})]},e.id))]}),(0,ne.jsxs)("div",{style:{color:"#DC2626",fontSize:"14px",textAlign:"center",marginBottom:"16px"},children:["\u23f0 Complete access will be blocked in ",e.nextRestrictionDate?Math.ceil((new Date(e.nextRestrictionDate).getTime()-(new Date).getTime())/864e5):1," days"]}),(0,ne.jsxs)(ut,{children:[(0,ne.jsx)(pt,{variant:"primary",onClick:s,children:"Pay Outstanding Invoices"}),(0,ne.jsx)(pt,{variant:"secondary",onClick:i,children:"Continue with Restrictions"})]})]})]})})}if(r&&"blocked"===e.restrictionLevel){const t=he("blocked");return(0,ne.jsx)(Ye,{children:(0,ne.jsxs)(Ve,{children:[(0,ne.jsxs)(Qe,{type:"blocked",children:[(0,ne.jsx)(Ke,{type:"blocked",children:"-"}),(0,ne.jsx)(Je,{type:"blocked",children:"Access Blocked"}),(0,ne.jsx)(Xe,{type:"blocked",children:"Account suspended due to overdue payment"})]}),(0,ne.jsxs)(Ze,{children:[(0,ne.jsxs)(et,{children:[(0,ne.jsx)(tt,{children:"Outstanding Amount"}),(0,ne.jsx)(nt,{children:(0,ue.vv)(e.overdueAmount)})]}),(0,ne.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",marginBottom:"20px",textAlign:"center"},children:[(0,ne.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#991B1B",marginBottom:"8px"},children:"Service Suspended"}),(0,ne.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Your account has been suspended due to payment overdue for ",e.overdueDays," days. All business operations are currently unavailable."]})]}),(0,ne.jsxs)(rt,{children:[(0,ne.jsx)(ot,{children:"Blocked Features:"}),(0,ne.jsx)(it,{children:t.map((e,t)=>(0,ne.jsx)("li",{children:e},t))})]}),(0,ne.jsxs)(at,{children:[(0,ne.jsx)(st,{children:"Overdue Invoices:"}),e.overdueInvoices.map(e=>(0,ne.jsxs)(lt,{children:[(0,ne.jsxs)(dt,{children:[e.invoiceNumber," (Due: ",e.dueDate,")"]}),(0,ne.jsx)(ct,{children:(0,ue.vv)(e.amount)})]},e.id))]}),(0,ne.jsx)(ut,{children:(0,ne.jsx)(pt,{variant:"primary",onClick:s,children:"Pay Now to Restore Access"})})]})]})})}return null},mt=Z.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 50%, #FCA5A5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,gt=Z.Ay.div`
  background: white;
  border-radius: 20px;
  padding: 48px 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 2px solid #FCA5A5;
`,ft=Z.Ay.div`
  font-size: 80px;
  margin-bottom: 24px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`,xt=Z.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  color: #991B1B;
  margin-bottom: 16px;
`,yt=Z.Ay.p`
  font-size: 18px;
  color: #7F1D1D;
  margin-bottom: 32px;
  line-height: 1.6;
`,bt=Z.Ay.div`
  background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #FECACA;
`,vt=Z.Ay.div`
  font-size: 16px;
  color: #B91C1C;
  margin-bottom: 8px;
  font-weight: 500;
`,wt=Z.Ay.div`
  font-size: 48px;
  font-weight: 700;
  color: #DC2626;
  margin-bottom: 8px;
`,jt=Z.Ay.div`
  font-size: 14px;
  color: #991B1B;
`,kt=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`,St=Z.Ay.button`
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`,At=Z.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 20px;
  margin-top: 32px;
  text-align: left;
`,Ct=Z.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`,Ft=Z.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  
  strong {
    color: #0A2540;
    font-weight: 600;
  }
`,_t=Z.Ay.button`
  background: transparent;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    color: #0A2540;
    border-color: #CBD5E1;
  }
`,Et=()=>{const{paymentStatus:e}=ge(),t=(0,X.Zp)();return(0,ne.jsx)(mt,{children:(0,ne.jsxs)(gt,{children:[(0,ne.jsx)(ft,{children:"-"}),(0,ne.jsx)(xt,{children:"Access Suspended"}),(0,ne.jsx)(yt,{children:"Your account has been temporarily suspended due to overdue payment. Please settle your outstanding invoices to restore full access to all services."}),(0,ne.jsxs)(bt,{children:[(0,ne.jsx)(vt,{children:"Outstanding Amount"}),(0,ne.jsx)(wt,{children:(0,ue.vv)(e.overdueAmount)}),(0,ne.jsxs)(jt,{children:["Overdue for ",e.overdueDays," days"]})]}),(0,ne.jsxs)(kt,{children:[(0,ne.jsx)(St,{onClick:()=>{t("/invoices")},children:"\ud83e\uddfe View & Pay Invoices"}),(0,ne.jsx)(_t,{onClick:()=>{t("/pos")},children:"Switch Account"})]}),(0,ne.jsxs)(At,{children:[(0,ne.jsx)(Ct,{children:"Need Help?"}),(0,ne.jsxs)(Ft,{children:[(0,ne.jsx)("strong",{children:"Support Team:"}),(0,ne.jsx)("br",{}),"\ud83d\udce7 Email: billing@orderhere.com",(0,ne.jsx)("br",{}),"\ud83d\udcde Phone: +60 3-1234-5678",(0,ne.jsx)("br",{}),"\ud83d\udd50 Hours: Mon-Fri 9AM-6PM (GMT+8)",(0,ne.jsx)("br",{}),(0,ne.jsx)("br",{}),(0,ne.jsx)("strong",{children:"Payment Methods:"}),(0,ne.jsx)("br",{}),"\u2022 Online Banking Transfer",(0,ne.jsx)("br",{}),"\u2022 Credit/Debit Card",(0,ne.jsx)("br",{}),"\u2022 FPX Payment Gateway",(0,ne.jsx)("br",{}),"\u2022 Cash Deposit (Selected Banks)"]})]})]})})},Pt=Z.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
`,Bt=Z.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${e=>e.isCollapsed?"0px":"220px"};
  height: 100vh;
  background: #FAFBFC;
  border-right: ${e=>e.isCollapsed?"none":"1px solid #E6EBF1"};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow-x: hidden;

  @media (max-width: 768px) {
    transform: translateX(${e=>e.isOpen?"0":"-100%"});
    transition: transform 0.3s, width 0.3s ease;
  }
`,zt=Z.Ay.div`
  padding: ${e=>e.isCollapsed?"16px 8px":"16px"};
  border-bottom: 1px solid #E6EBF1;
  flex-shrink: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: ${e=>e.isCollapsed?"center":"space-between"};
`,Rt=Z.Ay.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,Tt=Z.Ay.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  display: ${e=>e.isCollapsed?"flex":"none"};
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`,Ot=Z.Ay.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`,It=Z.Ay.img`
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
`,$t=Z.Ay.nav`
  padding: 8px 0 24px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
    transition: background 0.2s;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
  
  /* 모바일에서 스무스 스크롤 */
  -webkit-overflow-scrolling: touch;
  
  /* 스크롤 페이드 효과 */
  mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  
  @media (max-width: 768px) {
    padding-bottom: 30px;
    mask-image: none;
    -webkit-mask-image: none;
  }
`,Mt=Z.Ay.div`
  margin-bottom: 0;

  &:last-child {
    margin-bottom: 0;
  }
`,Dt=Z.Ay.div`
  color: #8898AA;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 16px;
  margin-bottom: 6px;
  margin-top: 20px;
`,Nt=(0,Z.Ay)(X.N_)`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #6B7C93;
  text-decoration: none;
  transition: all 0.15s;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  min-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
  }

  ${e=>e.active&&"\n    background: #F0F4FF;\n    color: #635BFF;\n    border-right: 2px solid #635BFF;\n  "}

  ${e=>e.hasPending&&"\n    &::after {\n      content: '';\n      position: absolute;\n      right: 12px;\n      top: 50%;\n      transform: translateY(-50%);\n      width: 8px;\n      height: 8px;\n      background: #FF6B6B;\n      border-radius: 50%;\n      animation: blink 1s infinite;\n    }\n  "}

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`,Lt=Z.Ay.span`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  flex-shrink: 0;

  ${e=>e.hasPending&&"\n    animation: pulse 1s infinite;\n  "}

  @keyframes pulse {
    0%, 50% { transform: scale(1); }
    25% { transform: scale(1.15); }
  }
`,qt=Z.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #B0BEC5;
  font-size: 13px;
  font-weight: 500;
  min-height: 28px;
  white-space: nowrap;
  cursor: not-allowed;
  user-select: none;
`,Ht=Z.Ay.span`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #B0BEC5;
  flex-shrink: 0;
`,Wt=Z.Ay.div`
  margin-left: ${e=>e.isCollapsed?"0px":"220px"};
  min-height: 100vh;
  background: #FAFBFC;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`,Ut=Z.Ay.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  z-index: 999;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
  }
`,Gt=Z.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  display: none;
  align-items: center;
  justify-content: center;
  color: #0A2540;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: #F6F9FC;
    border-radius: 4px;
  }
`,Yt=Z.Ay.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`,Vt=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Qt=Z.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
  }
`,Kt=Z.Ay.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: white;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Owner":return"#7C3AED";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,Jt=Z.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 480px) {
    display: none;
  }
`,Xt=Z.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1;
`,Zt=Z.Ay.div`
  font-size: 10px;
  color: #6B7280;
  text-transform: capitalize;
  line-height: 1;
`,en=Z.Ay.div`
  @media (max-width: 768px) {
    padding-top: 56px;
  }
`,tn=Z.Ay.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;

  @media (max-width: 768px) {
    display: ${e=>e.isOpen?"block":"none"};
  }
`,nn=Z.Ay.div`
  margin-top: auto;
`,rn=Z.Ay.div`
  padding: 16px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,on=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #F0F4FF;
  }
`,an=Z.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Owner":return"#7C3AED";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,sn=Z.Ay.div`
  flex: 1;
  min-width: 0;
`,ln=Z.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,dn=Z.Ay.div`
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
`,cn=Z.Ay.div`
  font-size: 10px;
  color: #8898AA;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,un=t=>{var n,r,o,i,a,s,l,d,c,u,p,h,m,g,f,x,y,b,v,w,j,k,S,A,C,F,_,E,P,B;let{children:z}=t;const R=(0,X.zy)(),T=(0,X.Zp)(),[O,I]=(0,e.useState)(!1),[$,M]=(0,e.useState)(!1),[D,N]=(0,e.useState)(""),L=e.useRef(null),{logout:q,currentStaff:H,isLoggedIn:W}=(0,de.g)(),{user:U,logout:G}=(0,ce.As)(),{paymentStatus:Y,canAccess:V}=ge(),Q=(null===(n=R.pathname.match(/\/restaurant\/(\d+)/))||void 0===n?void 0:n[1])||(null===U||void 0===U?void 0:U.restaurantId)||(null===U||void 0===U||null===(r=U.restaurant_id)||void 0===r?void 0:r.toString())||"1",{isRouteAllowed:K,hasActiveSubscription:J,loading:Z}=(t=>{const[n,r]=(0,e.useState)([]),[o,i]=(0,e.useState)(null),[a,s]=(0,e.useState)(null),[l,d]=(0,e.useState)(!0),[c,u]=(0,e.useState)(null),[p,h]=(0,e.useState)(!0),m="number"===typeof t?{role:"Restaurant Admin",restaurantId:t}:t,g=(null===m||void 0===m?void 0:m.role)||"",f=(null===m||void 0===m?void 0:m.restaurantId)||null,x=(null===m||void 0===m?void 0:m.brandId)||null,y=(null===m||void 0===m?void 0:m.foodcourtId)||null;return(0,e.useEffect)(()=>{(async()=>{let e=null;const t=localStorage.getItem("auth_token"),n={};if(t&&(n.Authorization=`Bearer ${t}`),"Restaurant Admin"!==g&&"Staff"!==g||!f?"Brand General"!==g&&"Brand Manager"!==g||!x?"Foodcourt General"!==g&&"Foodcourt Manager"!==g||!y?"Restaurant Owner"===g&&(e="/api/owner/allowed-routes"):e=`/api/foodcourts/${y}/allowed-routes`:e=`/api/brands/${x}/allowed-routes`:e=`/api/restaurants/${f}/allowed-routes`,!e)return r([]),i(null),s(null),h(!0),void d(!1);try{d(!0);const t=await fetch(e,{headers:n});if(!t.ok)throw new Error("Failed to fetch allowed routes");const o=await t.json();r(o.allowed_routes||[]),i(o.subscription_status||null),s(o.plan_type||null),h(!o.plan_type),u(null)}catch(o){console.error("useAllowedRoutes Error:",o),u(o instanceof Error?o.message:"Unknown error"),r([]),i(null),s(null),h(!0)}finally{d(!1)}})()},[g,f,x,y]),{allowedRoutes:n,loading:l,error:c,isRouteAllowed:e=>{if(p)return!0;const t=e.replace(/:restaurantId/g,(null===f||void 0===f?void 0:f.toString())||"");return n.some(e=>{const n=e.replace(/:restaurantId/g,(null===f||void 0===f?void 0:f.toString())||"").replace(/:slug/g,"[^/]+").replace(/:id/g,"[^/]+").replace(/\*/g,"[^/]+");return new RegExp(`^${n}$`).test(t)})},subscriptionStatus:o,planType:a,hasActiveSubscription:null!==a&&""!==a}})(null!==U&&void 0!==U&&U.role?{role:U.role,restaurantId:"Restaurant Admin"===U.role||"Staff"===U.role?Number(Q):null,brandId:"Brand General"===U.role||"Brand Manager"===U.role?Number(U.brand_id):null,foodcourtId:"Foodcourt General"===U.role||"Foodcourt Manager"===U.role?Number(U.foodcourt_id):null}:null),[ee,te]=(0,e.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0,pendingOrders:0,unreadComments:{notices:0,systemInquiry:0,operationInquiry:0}}),re=(0,e.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&te(t=>({...t,...e.data}))}}catch(e){}},[]);(0,e.useEffect)(()=>{if(U){re();const e=setInterval(re,15e3);return()=>clearInterval(e)}},[U,re]),(0,e.useEffect)(()=>{const e=()=>re();return window.addEventListener("refreshBadgeCounts",e),()=>window.removeEventListener("refreshBadgeCounts",e)},[re]);const oe=()=>{q(),G(),T("/pos")},ie=e=>R.pathname===e,ae=e=>{var t;return"Restaurant Admin"===(null===U||void 0===U?void 0:U.role)||"Staff"===(null===U||void 0===U?void 0:U.role)&&((null===U||void 0===U||null===(t=U.permissions)||void 0===t?void 0:t.includes(e))||!1)},se=e=>{var t;return"Brand General"===(null===U||void 0===U?void 0:U.role)||"Foodcourt General"===(null===U||void 0===U?void 0:U.role)||("Brand Manager"===(null===U||void 0===U?void 0:U.role)||"Foodcourt Manager"===(null===U||void 0===U?void 0:U.role))&&((null===U||void 0===U||null===(t=U.permissions)||void 0===t?void 0:t.includes(e))||!1)},le=e=>{if(!e)return"?";const t=e.trim().split(" ").filter(e=>e.length>0);return 0===t.length?"?":1===t.length?t[0].substring(0,2).toUpperCase():t.slice(0,2).map(e=>e[0]).join("").toUpperCase()},ue=()=>{window.innerWidth<=768&&I(!1)},pe=()=>{M(!$)};if((0,e.useEffect)(()=>{N("/uploads/logos/brand-logo.png");const e=()=>{N(`/uploads/logos/brand-logo.png?v=${Date.now()}`)};return window.addEventListener("brandLogoUpdated",e),()=>{window.removeEventListener("brandLogoUpdated",e)}},[]),(0,e.useEffect)(()=>{const e=R.pathname;e.includes("/invoices")||e.includes("/profile")||e.includes("/settings")||"System Admin"!==(null===U||void 0===U?void 0:U.role)&&(V(e)||"blocked"!==Y.restrictionLevel&&T("/pos/dashboard"))},[R.pathname,Y.restrictionLevel,V,T,U]),("Restaurant Admin"===(null===U||void 0===U?void 0:U.role)||"Staff"===(null===U||void 0===U?void 0:U.role))&&"inactive"===(null===U||void 0===U?void 0:U.restaurantStatus))return(0,ne.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#F8FAFC",padding:"20px"},children:(0,ne.jsxs)("div",{style:{background:"white",borderRadius:"12px",padding:"48px",maxWidth:"600px",width:"100%",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)",textAlign:"center"},children:[(0,ne.jsx)("h2",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540",marginBottom:"16px"},children:"Restaurant Inactive"}),(0,ne.jsxs)("p",{style:{fontSize:"16px",color:"#6B7280",marginBottom:"24px",lineHeight:"1.6"},children:[U.restaurantName?`"${U.restaurantName}"`:"Your restaurant"," is currently inactive. All features have been temporarily disabled."]}),(0,ne.jsx)("p",{style:{fontSize:"14px",color:"#8898AA",marginBottom:"32px"},children:"Please contact your system administrator to reactivate your account."}),(0,ne.jsx)("button",{onClick:oe,style:{background:"#635BFF",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#5A51E6",onMouseLeave:e=>e.currentTarget.style.background="#635BFF",children:"Logout"})]})});if("blocked"===Y.restrictionLevel&&"System Admin"!==(null===U||void 0===U?void 0:U.role))return(0,ne.jsx)(Et,{});const he=["/pos/brand/invoices","/pos/foodcourt/invoices","/pos/owner/invoices","/pos/profile"].some(e=>R.pathname.startsWith(e)),me=!Z&&!J&&!he&&("Brand General"===(null===U||void 0===U?void 0:U.role)||"Brand Manager"===(null===U||void 0===U?void 0:U.role)||"Foodcourt General"===(null===U||void 0===U?void 0:U.role)||"Foodcourt Manager"===(null===U||void 0===U?void 0:U.role)||"Restaurant Owner"===(null===U||void 0===U?void 0:U.role));return me?(0,ne.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#F8FAFC",padding:"20px"},children:(0,ne.jsxs)("div",{style:{background:"white",borderRadius:"16px",padding:"48px",maxWidth:"480px",width:"100%",textAlign:"center",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"},children:[(0,ne.jsx)("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"\u26a0"}),(0,ne.jsx)("h2",{style:{fontSize:"22px",fontWeight:"700",color:"#1A1A2E",marginBottom:"12px"},children:"No Active Subscription"}),(0,ne.jsx)("p",{style:{color:"#6B7280",fontSize:"15px",lineHeight:"1.6",marginBottom:"32px"},children:"Your account does not have an active subscription plan. Please contact your system administrator or check your invoices to activate your subscription."}),(0,ne.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[(0,ne.jsx)("button",{onClick:()=>T("Brand General"===(null===U||void 0===U?void 0:U.role)||"Brand Manager"===(null===U||void 0===U?void 0:U.role)?"/pos/brand/invoices":"Foodcourt General"===(null===U||void 0===U?void 0:U.role)||"Foodcourt Manager"===(null===U||void 0===U?void 0:U.role)?"/pos/foodcourt/invoices":"Restaurant Owner"===(null===U||void 0===U?void 0:U.role)?"/pos/owner/invoices":"/pos/dashboard"),style:{padding:"12px 24px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer"},children:"View Invoices"}),(0,ne.jsx)("button",{onClick:()=>{G(),T("/pos")},style:{padding:"12px 24px",background:"white",color:"#374151",border:"1px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer"},children:"Logout"})]})]})}):(0,ne.jsxs)(Me.i,{children:[(0,ne.jsxs)(Pt,{children:[(0,ne.jsx)(ht,{}),(0,ne.jsxs)(Ut,{children:[(0,ne.jsx)(Gt,{onClick:()=>{I(!O)},children:"\u2630"}),(0,ne.jsx)(Yt,{children:D&&(0,ne.jsx)("img",{src:D,alt:"Brand Logo",style:{maxHeight:"32px",objectFit:"contain"}})}),(0,ne.jsx)(Vt,{children:W&&H?(0,ne.jsxs)(Qt,{onClick:()=>window.location.href="/profile",children:[(0,ne.jsx)(Kt,{role:H.role,children:le(H.name)}),(0,ne.jsxs)(Jt,{children:[(0,ne.jsx)(Xt,{children:H.name}),(0,ne.jsx)(Zt,{children:H.role})]})]}):(0,ne.jsx)(Qt,{onClick:()=>window.location.href="/profile",children:(0,ne.jsx)(Kt,{role:"default",children:"?"})})})]}),(0,ne.jsx)(tn,{isOpen:O,onClick:ue}),(0,ne.jsxs)(Bt,{isOpen:O,isCollapsed:$,children:[(0,ne.jsxs)(zt,{isCollapsed:$,children:[!$&&(0,ne.jsx)(Ot,{children:D&&(0,ne.jsx)(It,{src:D,alt:"Brand Logo"})}),(0,ne.jsx)(Rt,{onClick:pe,title:$?"Expand Sidebar":"Collapse Sidebar",children:$?(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,ne.jsx)("path",{d:"M9 18l6-6-6-6"})}):(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,ne.jsx)("path",{d:"M15 18l-6-6 6-6"})})})]}),(0,ne.jsxs)($t,{ref:L,children:[(0,ne.jsxs)(Mt,{children:["System Admin"===(null===U||void 0===U?void 0:U.role)&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Nt,{to:"/pos/admin/dashboard",active:ie("/pos/admin/dashboard"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a0"}),"Dashboard"]}),(0,ne.jsx)(Dt,{children:"Management"}),(0,ne.jsxs)(Nt,{to:"/pos/admin/managers",active:ie("/pos/admin/managers"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25ef"}),"Managers"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/restaurants",active:ie("/pos/admin/restaurants"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Restaurants"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/staff",active:ie("/pos/admin/staff"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c6"}),"Staff"]}),(0,ne.jsx)(Dt,{children:"Operations"}),(0,ne.jsxs)(Nt,{to:"/pos/admin/invoices",active:ie("/pos/admin/invoices"),hasPending:ee.invoices>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.invoices>0,children:"\u25a6"}),"Invoices"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/subscriptions",active:ie("/pos/admin/subscriptions"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c8"}),"Subscriptions"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/report",active:ie("/pos/admin/report"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2630"}),"Report"]}),(0,ne.jsx)(Dt,{children:"Communication"}),(0,ne.jsxs)(Nt,{to:"/pos/admin/notices",active:ie("/pos/admin/notices"),hasPending:ee.notices>0||(null===(o=ee.unreadComments)||void 0===o?void 0:o.notices)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.notices>0||(null===(i=ee.unreadComments)||void 0===i?void 0:i.notices)>0,children:"\u25c8"}),"Notices"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/support",active:ie("/pos/admin/support"),hasPending:ee.systemInquiry>0||(null===(a=ee.unreadComments)||void 0===a?void 0:a.systemInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.systemInquiry>0||(null===(s=ee.unreadComments)||void 0===s?void 0:s.systemInquiry)>0,children:"\u25ce"}),"Inquiry Management"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/contact-inquiries",active:ie("/pos/admin/contact-inquiries"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"@"}),"Contact Inquiries"]}),(0,ne.jsx)(Dt,{children:"Plans & Payments"}),(0,ne.jsxs)(Nt,{to:"/pos/admin/plans",active:ie("/pos/admin/plans"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2261"}),"Subscription Plans"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/payment-settings",active:ie("/pos/admin/payment-settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"$"}),"Payment Settings"]})]}),("Brand General"===(null===U||void 0===U?void 0:U.role)||"Brand Manager"===(null===U||void 0===U?void 0:U.role))&&(0,ne.jsxs)(ne.Fragment,{children:[se("dashboard")&&K("/pos/brand/general/dashboard")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/dashboard",active:ie("/pos/brand/general/dashboard"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a0"}),"Dashboard"]}),se("management")&&(K("/pos/brand/general/management")||K("/pos/manager/restaurants")||K("/pos/manager/staff")||K("/pos/brand/manager"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Management"}),K("/pos/brand/general/management")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/management",active:ie("/pos/brand/general/management"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25ac"}),"Brands"]}),K("/pos/manager/restaurants")&&(0,ne.jsxs)(Nt,{to:"/pos/manager/restaurants",active:ie("/pos/manager/restaurants"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Restaurants"]}),K("/pos/manager/staff")&&(0,ne.jsxs)(Nt,{to:"/pos/manager/admins",active:ie("/pos/manager/admins"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c6"}),"Restaurant Admins"]}),"Brand General"===(null===U||void 0===U?void 0:U.role)&&K("/pos/brand/manager")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/manager",active:ie("/pos/brand/manager"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c7"}),"Managers"]})]}),se("products")&&(K("/pos/brand-products")||K("/pos/recipes")||K("/pos/brand-product-recipes")||K("/pos/brand-inventory"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Products & Inventory"}),K("/pos/brand-products")&&(0,ne.jsxs)(Nt,{to:"/pos/brand-products",active:ie("/pos/brand-products"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c7"}),"Products"]}),K("/pos/recipes")&&(0,ne.jsxs)(Nt,{to:"/pos/recipes",active:ie("/pos/recipes"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c8"}),"Recipes"]}),K("/pos/brand-product-recipes")&&(0,ne.jsxs)(Nt,{to:"/pos/brand-product-recipes",active:ie("/pos/brand-product-recipes"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2295"}),"Product Recipes"]}),K("/pos/suppliers")&&(0,ne.jsxs)(Nt,{to:"/pos/suppliers",active:ie("/pos/suppliers"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c7"}),"Suppliers"]}),K("/pos/brand-inventory")&&(0,ne.jsxs)(Nt,{to:"/pos/brand-inventory",active:ie("/pos/brand-inventory"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a4"}),"Inventory"]})]}),se("operations")&&(K("/pos/brand/invoices")||K("/pos/brand/general/reports")||K("/pos/brand/general/performance"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Operations"}),K("/pos/brand/invoices")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/invoices",active:ie("/pos/brand/invoices"),hasPending:ee.invoices>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.invoices>0,children:"\u25a6"}),"Invoices"]}),K("/pos/brand/general/reports")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/reports",active:ie("/pos/brand/general/reports"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c9"}),"Reports"]}),K("/pos/brand/general/performance")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/performance",active:ie("/pos/brand/general/performance"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25b2"}),"Performance"]})]}),se("communication")&&(K("/pos/brand/general/notices")||K("/pos/brand/general/system-inquiry")||K("/pos/brand/general/operation-inquiry"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Communication"}),K("/pos/brand/general/notices")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/notices",active:ie("/pos/brand/general/notices"),hasPending:ee.notices>0||(null===(l=ee.unreadComments)||void 0===l?void 0:l.notices)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.notices>0||(null===(d=ee.unreadComments)||void 0===d?void 0:d.notices)>0,children:"\u25c8"}),"Notices"]}),K("/pos/brand/general/system-inquiry")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/system-inquiry",active:ie("/pos/brand/general/system-inquiry"),hasPending:ee.systemInquiry>0||(null===(c=ee.unreadComments)||void 0===c?void 0:c.systemInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.systemInquiry>0||(null===(u=ee.unreadComments)||void 0===u?void 0:u.systemInquiry)>0,children:"?"}),"System Inquiry"]}),K("/pos/brand/general/operation-inquiry")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/operation-inquiry",active:ie("/pos/brand/general/operation-inquiry"),hasPending:ee.operationInquiry>0||(null===(p=ee.unreadComments)||void 0===p?void 0:p.operationInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.operationInquiry>0||(null===(h=ee.unreadComments)||void 0===h?void 0:h.operationInquiry)>0,children:"\u25ce"}),"Inquiry Management"]})]}),se("plans_payments")&&(K("/pos/brand/plans")||K("/pos/brand/general/subscriptions")||K("/pos/brand/payment-settings"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Plans & Payments"}),K("/pos/brand/plans")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/plans",active:ie("/pos/brand/plans"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2630"}),"Subscription Plans"]}),K("/pos/brand/general/subscriptions")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/general/subscriptions",active:ie("/pos/brand/general/subscriptions"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c8"}),"Subscriptions"]}),K("/pos/brand/payment-settings")&&(0,ne.jsxs)(Nt,{to:"/pos/brand/payment-settings",active:ie("/pos/brand/payment-settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"$"}),"Payment Settings"]})]})]}),("Foodcourt General"===(null===U||void 0===U?void 0:U.role)||"Foodcourt Manager"===(null===U||void 0===U?void 0:U.role))&&(0,ne.jsxs)(ne.Fragment,{children:[se("dashboard")&&K("/pos/foodcourt/general/dashboard")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/general/dashboard",active:ie("/pos/foodcourt/general/dashboard"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a0"}),"Dashboard"]}),se("management")&&(K("/pos/foodcourt/general/management")||K("/pos/manager/restaurants")||K("/pos/manager/staff")||K("/pos/foodcourt/manager"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Management"}),K("/pos/foodcourt/general/management")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/general/management",active:ie("/pos/foodcourt/general/management"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c9"}),"Foodcourts"]}),K("/pos/manager/restaurants")&&(0,ne.jsxs)(Nt,{to:"/pos/manager/restaurants",active:ie("/pos/manager/restaurants"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Restaurants"]}),K("/pos/manager/staff")&&(0,ne.jsxs)(Nt,{to:"/pos/manager/admins",active:ie("/pos/manager/admins"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c6"}),"Restaurant Admins"]}),"Foodcourt General"===(null===U||void 0===U?void 0:U.role)&&K("/pos/foodcourt/manager")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/manager",active:ie("/pos/foodcourt/manager"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c7"}),"Managers"]})]}),se("operations")&&(K("/pos/foodcourt/invoices")||K("/pos/foodcourt/general/stats")||K("/pos/manager/customers")||K("/pos/manager/coupons"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Operations"}),K("/pos/foodcourt/invoices")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/invoices",active:ie("/pos/foodcourt/invoices"),hasPending:ee.invoices>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.invoices>0,children:"\u25a6"}),"Invoices"]}),K("/pos/foodcourt/general/stats")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/general/stats",active:ie("/pos/foodcourt/general/stats"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25b2"}),"Statistics"]}),K("/pos/manager/customers")&&(0,ne.jsxs)(Nt,{to:"/pos/manager/customers",active:ie("/pos/manager/customers"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25cb"}),"Customers"]}),K("/pos/manager/coupons")&&(0,ne.jsxs)(Nt,{to:"/pos/manager/coupons",active:ie("/pos/manager/coupons"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"%"}),"Coupons"]})]}),se("communication")&&(K("/pos/foodcourt/general/notices")||K("/pos/foodcourt/general/system-inquiry")||K("/pos/foodcourt/general/operation-inquiry"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Communication"}),K("/pos/foodcourt/general/notices")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/general/notices",active:ie("/pos/foodcourt/general/notices"),hasPending:ee.notices>0||(null===(m=ee.unreadComments)||void 0===m?void 0:m.notices)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.notices>0||(null===(g=ee.unreadComments)||void 0===g?void 0:g.notices)>0,children:"\u25c8"}),"Notices"]}),K("/pos/foodcourt/general/system-inquiry")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/general/system-inquiry",active:ie("/pos/foodcourt/general/system-inquiry"),hasPending:ee.systemInquiry>0||(null===(f=ee.unreadComments)||void 0===f?void 0:f.systemInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.systemInquiry>0||(null===(x=ee.unreadComments)||void 0===x?void 0:x.systemInquiry)>0,children:"?"}),"System Inquiry"]}),K("/pos/foodcourt/general/operation-inquiry")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/general/operation-inquiry",active:ie("/pos/foodcourt/general/operation-inquiry"),hasPending:ee.operationInquiry>0||(null===(y=ee.unreadComments)||void 0===y?void 0:y.operationInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.operationInquiry>0||(null===(b=ee.unreadComments)||void 0===b?void 0:b.operationInquiry)>0,children:"\u25ce"}),"Inquiry Management"]})]}),se("plans_payments")&&(K("/pos/foodcourt/plans")||K("/pos/foodcourt/general/subscriptions")||K("/pos/foodcourt/payment-settings"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Plans & Payments"}),K("/pos/foodcourt/plans")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/plans",active:ie("/pos/foodcourt/plans"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2630"}),"Subscription Plans"]}),K("/pos/foodcourt/general/subscriptions")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/general/subscriptions",active:ie("/pos/foodcourt/general/subscriptions"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c8"}),"Subscriptions"]}),K("/pos/foodcourt/payment-settings")&&(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/payment-settings",active:ie("/pos/foodcourt/payment-settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"$"}),"Payment Settings"]})]})]}),"Restaurant Owner"===(null===U||void 0===U?void 0:U.role)&&(0,ne.jsxs)(ne.Fragment,{children:[K("/pos/owner/dashboard")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/dashboard",active:ie("/pos/owner/dashboard"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a0"}),"Dashboard"]}),K("/pos/owner/restaurants")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/restaurants",active:ie("/pos/owner/restaurants"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Restaurants"]}),(K("/pos/owner/invoices")||K("/pos/owner/performance")||K("/pos/owner/reports"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Operations"}),K("/pos/owner/invoices")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/invoices",active:ie("/pos/owner/invoices"),hasPending:ee.invoices>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.invoices>0,children:"\u25a6"}),"Invoices"]}),K("/pos/owner/performance")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/performance",active:ie("/pos/owner/performance"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c8"}),"Performance"]}),K("/pos/owner/reports")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/reports",active:ie("/pos/owner/reports"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2630"}),"Reports"]})]}),(K("/pos/owner/notices")||K("/pos/owner/system-inquiry")||K("/pos/owner/operation-inquiry"))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Dt,{children:"Communication"}),K("/pos/owner/notices")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/notices",active:ie("/pos/owner/notices"),hasPending:ee.notices>0||(null===(v=ee.unreadComments)||void 0===v?void 0:v.notices)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.notices>0||(null===(w=ee.unreadComments)||void 0===w?void 0:w.notices)>0,children:"\u25c8"}),"Notices"]}),K("/pos/owner/system-inquiry")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/system-inquiry",active:ie("/pos/owner/system-inquiry"),hasPending:ee.systemInquiry>0||(null===(j=ee.unreadComments)||void 0===j?void 0:j.systemInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.systemInquiry>0||(null===(k=ee.unreadComments)||void 0===k?void 0:k.systemInquiry)>0,children:"\u25c7"}),"System Inquiry"]}),K("/pos/owner/operation-inquiry")&&(0,ne.jsxs)(Nt,{to:"/pos/owner/operation-inquiry",active:ie("/pos/owner/operation-inquiry"),hasPending:ee.operationInquiry>0||(null===(S=ee.unreadComments)||void 0===S?void 0:S.operationInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.operationInquiry>0||(null===(A=ee.unreadComments)||void 0===A?void 0:A.operationInquiry)>0,children:"\u25c6"}),"Operation Inquiry"]})]})]}),"Supplier Admin"===(null===U||void 0===U?void 0:U.role)&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Dashboard"]}),(0,ne.jsx)(Dt,{children:"Orders"}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Purchase Orders"]}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Order History"]}),(0,ne.jsx)(Dt,{children:"Products"}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Products"]}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Price List"]}),(0,ne.jsx)(Dt,{children:"Customers"}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Restaurants"]}),(0,ne.jsx)(Dt,{children:"Analytics"}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Sales Report"]})]}),("Restaurant Admin"===(null===U||void 0===U?void 0:U.role)||"Staff"===(null===U||void 0===U?void 0:U.role))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/dashboard`,active:ie(`/restaurant/${Q}/dashboard`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a0"}),"Dashboard"]}),(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/live-orders`,active:ie(`/restaurant/${Q}/live-orders`),hasPending:ee.pendingOrders>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.pendingOrders>0,children:"\u25c9"}),"Live Orders"]})]})]}),("Restaurant Admin"===(null===U||void 0===U?void 0:U.role)||"Staff"===(null===U||void 0===U?void 0:U.role))&&(K(`/restaurant/${Q}/pos-terminal`)||K(`/restaurant/${Q}/floor-plan`)||K(`/restaurant/${Q}/kitchen`)||K(`/restaurant/${Q}/display`)||K("/mobile/:slug/menu"))&&(0,ne.jsxs)(Mt,{children:[(0,ne.jsx)(Dt,{children:"System Access"}),K(`/restaurant/${Q}/pos-terminal`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/pos-terminal`,active:ie(`/restaurant/${Q}/pos-terminal`),onClick:e=>{e.preventDefault(),ue(),window.open(`/restaurant/${Q}/pos-terminal`,"_blank")},children:[(0,ne.jsx)(Lt,{children:"\u25a6"}),"POS Terminal"]}),K(`/restaurant/${Q}/floor-plan`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/floor-plan`,active:ie(`/restaurant/${Q}/floor-plan`),onClick:e=>{e.preventDefault(),ue(),window.open(`/restaurant/${Q}/floor-plan`,"_blank")},children:[(0,ne.jsx)(Lt,{children:"\u25a6"}),"Floor Plan"]}),K(`/restaurant/${Q}/kitchen`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/kitchen`,active:ie(`/restaurant/${Q}/kitchen`),onClick:e=>{e.preventDefault(),ue(),window.open(`/restaurant/${Q}/kitchen`,"_blank")},children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Kitchen Display"]}),K(`/restaurant/${Q}/display`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/display`,active:ie(`/restaurant/${Q}/display`),onClick:e=>{e.preventDefault(),ue(),window.open(`/restaurant/${Q}/display`,"_blank")},children:[(0,ne.jsx)(Lt,{children:"\u25a1"}),"Customer Display"]}),K("/mobile/:slug/menu")&&(0,ne.jsxs)(Nt,{to:"/mobile",active:ie("/mobile"),onClick:async e=>{if(e.preventDefault(),ue(),null===U||void 0===U||!U.restaurantId)return console.error("No restaurant ID found for user"),void alert("Unable to open mobile order - no restaurant associated with your account");const t=U.restaurantId;console.log("Fetching restaurant:",t);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{credentials:"include",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}});if(console.log("Response status:",n.status),n.ok){const e=await n.json();console.log("Restaurant result:",e);const r=(e.success?e.data:e).slug||`restaurant-${t}`;console.log("Using slug:",r),window.open(`/mobile/${r}`,"_blank")}else console.error("Failed to fetch restaurant, status:",n.status),window.open(`/mobile/restaurant-${t}`,"_blank")}catch(n){console.error("Error fetching restaurant slug:",n),window.open(`/mobile/restaurant-${t}`,"_blank")}},children:[(0,ne.jsx)(Lt,{children:"\u25ef"}),"Mobile Order"]})]}),(ae("support")||ae("reports")||ae("inventory"))&&(ae("support")&&K(`/restaurant/${Q}/invoices`)||ae("reports")&&K(`/restaurant/${Q}/reports`)||ae("inventory")&&K(`/restaurant/${Q}/inventory`)||ae("inventory")&&K(`/restaurant/${Q}/suppliers`))&&(0,ne.jsxs)(Mt,{children:[(0,ne.jsx)(Dt,{children:"Operations"}),ae("support")&&K(`/restaurant/${Q}/invoices`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/invoices`,active:ie(`/restaurant/${Q}/invoices`),hasPending:ee.invoices>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.invoices>0,children:"\u25a6"}),"Invoices"]}),ae("reports")&&K(`/restaurant/${Q}/reports`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/reports`,active:ie(`/restaurant/${Q}/reports`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2630"}),"Reports"]}),ae("inventory")&&K(`/restaurant/${Q}/inventory`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/inventory`,active:ie(`/restaurant/${Q}/inventory`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a4"}),"Inventory"]}),ae("inventory")&&K(`/restaurant/${Q}/suppliers`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/suppliers`,active:ie(`/restaurant/${Q}/suppliers`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c7"}),"Suppliers"]})]}),ae("support")&&(K(`/restaurant/${Q}/notices`)||K(`/restaurant/${Q}/support`)||K(`/restaurant/${Q}/operation-inquiry`))&&(0,ne.jsxs)(Mt,{children:[(0,ne.jsx)(Dt,{children:"Communication"}),K(`/restaurant/${Q}/notices`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/notices`,active:ie(`/restaurant/${Q}/notices`),hasPending:ee.notices>0||(null===(C=ee.unreadComments)||void 0===C?void 0:C.notices)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.notices>0||(null===(F=ee.unreadComments)||void 0===F?void 0:F.notices)>0,children:"\u25c8"}),"Notices"]}),K(`/restaurant/${Q}/support`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/support`,active:ie(`/restaurant/${Q}/support`),hasPending:ee.systemInquiry>0||(null===(_=ee.unreadComments)||void 0===_?void 0:_.systemInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.systemInquiry>0||(null===(E=ee.unreadComments)||void 0===E?void 0:E.systemInquiry)>0,children:"\u25ce"}),"System Inquiry"]}),K(`/restaurant/${Q}/operation-inquiry`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/operation-inquiry`,active:ie(`/restaurant/${Q}/operation-inquiry`),hasPending:ee.operationInquiry>0||(null===(P=ee.unreadComments)||void 0===P?void 0:P.operationInquiry)>0,onClick:ue,children:[(0,ne.jsx)(Lt,{hasPending:ee.operationInquiry>0||(null===(B=ee.unreadComments)||void 0===B?void 0:B.operationInquiry)>0,children:"\u25b2"}),"Operation Inquiry"]})]}),ae("menu_management")&&(K(`/restaurant/${Q}/menu`)||K(`/restaurant/${Q}/categories`)||K(`/restaurant/${Q}/options`)||K(`/restaurant/${Q}/recipe-management`))&&(0,ne.jsxs)(Mt,{children:[(0,ne.jsx)(Dt,{children:"Products"}),K(`/restaurant/${Q}/menu`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/menu`,active:ie(`/restaurant/${Q}/menu`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2261"}),"Menu"]}),K(`/restaurant/${Q}/categories`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/categories`,active:ie(`/restaurant/${Q}/categories`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c8"}),"Categories"]}),K(`/restaurant/${Q}/options`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/options`,active:ie(`/restaurant/${Q}/options`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2699"}),"Options"]}),K(`/restaurant/${Q}/recipe-management`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/recipe-management`,active:ie(`/restaurant/${Q}/recipe-management`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d8"}),"Recipe"]})]}),("Restaurant Admin"===(null===U||void 0===U?void 0:U.role)||ae("marketing"))&&("Restaurant Admin"===(null===U||void 0===U?void 0:U.role)&&K(`/restaurant/${Q}/staff`)||ae("marketing")&&K(`/restaurant/${Q}/customers`)||ae("marketing")&&K(`/restaurant/${Q}/coupons`))&&(0,ne.jsxs)(Mt,{children:[(0,ne.jsx)(Dt,{children:"Team & Marketing"}),"Restaurant Admin"===(null===U||void 0===U?void 0:U.role)&&K(`/restaurant/${Q}/staff`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/staff`,active:ie(`/restaurant/${Q}/staff`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c6"}),"Staff"]}),ae("marketing")&&K(`/restaurant/${Q}/customers`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/customers`,active:ie(`/restaurant/${Q}/customers`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25ef"}),"Customers"]}),ae("marketing")&&K(`/restaurant/${Q}/coupons`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/coupons`,active:ie(`/restaurant/${Q}/coupons`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"%"}),"Coupons"]})]}),(0,ne.jsxs)(Mt,{children:[(0,ne.jsx)(Dt,{children:"Settings"}),"Restaurant Admin"===(null===U||void 0===U?void 0:U.role)||"Staff"===(null===U||void 0===U?void 0:U.role)?(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/profile`,active:ie(`/restaurant/${Q}/profile`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25ef"}),"My Profile"]}):"Supplier Admin"===(null===U||void 0===U?void 0:U.role)?(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"My Profile"]}):(0,ne.jsxs)(Nt,{to:"/pos/profile",active:ie("/pos/profile"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25ef"}),"My Profile"]}),"System Admin"===(null===U||void 0===U?void 0:U.role)&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Nt,{to:"/pos/admin/settings",active:ie("/pos/admin/settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2699"}),"Company Info"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/site-settings",active:ie("/pos/admin/site-settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25c8"}),"Site Settings"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/notification-settings",active:ie("/pos/admin/notification-settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2709"}),"Notifications"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/system-config",active:ie("/pos/admin/system-config"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2699"}),"System Config"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/content",active:ie("/pos/admin/content"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2630"}),"Content"]}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Security"]}),(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Backup & Restore"]}),(0,ne.jsxs)(Nt,{to:"/pos/admin/logs",active:ie("/pos/admin/logs"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2630"}),"System Logs"]})]}),("Brand General"===(null===U||void 0===U?void 0:U.role)||"Brand Manager"===(null===U||void 0===U?void 0:U.role))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Nt,{to:"/pos/brand/company-info",active:ie("/pos/brand/company-info"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Company Info"]}),(0,ne.jsxs)(Nt,{to:"/pos/manager/notification-settings",active:ie("/pos/manager/notification-settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2709"}),"Notifications"]})]}),("Foodcourt General"===(null===U||void 0===U?void 0:U.role)||"Foodcourt Manager"===(null===U||void 0===U?void 0:U.role))&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Nt,{to:"/pos/foodcourt/company-info",active:ie("/pos/foodcourt/company-info"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Company Info"]}),(0,ne.jsxs)(Nt,{to:"/pos/manager/notification-settings",active:ie("/pos/manager/notification-settings"),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2709"}),"Notifications"]})]}),"Supplier Admin"===(null===U||void 0===U?void 0:U.role)&&(0,ne.jsx)(ne.Fragment,{children:(0,ne.jsxs)(qt,{title:"Coming Soon",children:[(0,ne.jsx)(Ht,{children:"\u2298"}),"Company Info"]})}),ae("settings")&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/settings`,active:ie(`/restaurant/${Q}/settings`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2699"}),"Store Settings"]}),(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/company-information`,active:ie(`/restaurant/${Q}/company-information`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25d0"}),"Company Info"]}),(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/notification-settings`,active:ie(`/restaurant/${Q}/notification-settings`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2709"}),"Notifications"]}),"Restaurant Admin"===(null===U||void 0===U?void 0:U.role)&&K(`/restaurant/${Q}/floor-plan`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/floor-plan-editor`,active:ie(`/restaurant/${Q}/floor-plan-editor`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u25a6"}),"Floor Plan Editor"]})]}),ae("reports")&&("Restaurant Admin"===(null===U||void 0===U?void 0:U.role)||"Staff"===(null===U||void 0===U?void 0:U.role))&&K(`/restaurant/${Q}/history`)&&(0,ne.jsxs)(Nt,{to:`/restaurant/${Q}/history`,active:ie(`/restaurant/${Q}/history`),onClick:ue,children:[(0,ne.jsx)(Lt,{children:"\u2261"}),"Change History"]}),(0,ne.jsxs)(Nt,{to:"#",onClick:e=>{e.preventDefault(),oe()},children:[(0,ne.jsx)(Lt,{children:"\u21a9"}),"Logout"]})]})]}),(0,ne.jsx)(nn,{children:U&&(0,ne.jsx)(rn,{children:(0,ne.jsxs)(on,{onClick:()=>{"Restaurant Admin"===U.role||"Staff"===U.role?T(`/restaurant/${Q}/profile`):T("/pos/profile")},children:[(0,ne.jsx)(an,{role:U.role,children:le(U.full_name||U.name||U.email)}),(0,ne.jsxs)(sn,{children:[(0,ne.jsx)(ln,{children:U.full_name||U.name||"User"}),(0,ne.jsx)(dn,{children:U.role}),(0,ne.jsx)(cn,{children:U.email})]})]})})})]}),(0,ne.jsx)(Tt,{isCollapsed:$,onClick:pe,title:"Open Sidebar",children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,ne.jsx)("path",{d:"M9 18l6-6-6-6"})})}),(0,ne.jsx)(Wt,{isCollapsed:$,children:(0,ne.jsx)(en,{children:z})})]}),(0,ne.jsx)("style",{children:"\n        @media print {\n          /* Hide EVERYTHING except print content */\n          body > *:not(#bill-print-content):not([data-print-bill]) {\n            display: none !important;\n          }\n\n          body {\n            margin: 0 !important;\n            padding: 0 !important;\n          }\n        }\n      "})]})},pn=()=>{const{isAuthenticated:e,isLoading:t}=(0,ce.As)();return t?(0,ne.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"#6B7C93"},children:"Loading..."}):e?(0,ne.jsx)(un,{children:(0,ne.jsx)(X.sv,{})}):(0,ne.jsx)(X.C5,{to:"/pos",replace:!0})},hn=Z.Ay.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`,mn=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`,gn=Z.Ay.img`
  height: 36px;
  width: auto;

  @media (max-width: 768px) {
    height: 28px;
  }
`,fn=Z.Ay.span`
  font-size: 14px;
  font-weight: 300;
  color: #9CA3AF;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`,xn=Z.Ay.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`,yn=Z.Ay.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #0A2540;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`,bn=Z.Ay.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: ${e=>e.isOpen?1:0};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: ${e=>e.isOpen?"block":"none"};
  }
`,vn=Z.Ay.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 9999;
  flex-direction: column;
  padding: 0;
  transform: ${e=>e.isOpen?"translateX(0)":"translateX(100%)"};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
  }
`,wn=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
`,jn=Z.Ay.span`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
`,kn=Z.Ay.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,Sn=Z.Ay.div`
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`,An=Z.Ay.button`
  background: none;
  border: none;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
    background: #F0F4FF;
  }
`,Cn=Z.Ay.button`
  background: ${e=>e.active?"#F0F4FF":"transparent"};
  border: none;
  color: ${e=>e.active?"#635BFF":"#0A2540"};
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  padding: 16px 12px;
  border-radius: 12px;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
    background: #F0F4FF;
  }
`,Fn=Z.Ay.button`
  background: white;
  color: #635BFF;
  border: 2px solid #635BFF;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 8px;
  transition: all 0.2s;
  margin-left: 8px;

  &:hover {
    background: #F8F7FF;
    transform: translateY(-1px);
  }
`,_n=Z.Ay.button`
  background: #635BFF;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.2s;
  margin-left: 4px;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }
`,En=Z.Ay.button`
  background: white;
  color: #635BFF;
  border: 2px solid #635BFF;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 12px;
  transition: all 0.2s;
  text-align: center;
  margin-top: 16px;

  &:hover {
    background: #F8F7FF;
  }
`,Pn=Z.Ay.button`
  background: #635BFF;
  color: white;
  border: none;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 12px;
  transition: all 0.2s;
  text-align: center;
  margin-top: 8px;

  &:hover {
    background: #5A51E6;
  }
`,Bn=t=>{let{logo:n}=t;const r=(0,X.Zp)(),o=(0,X.zy)(),{user:i}=(0,ce.As)(),[a,s]=(0,e.useState)(!1),l="/uploads/logos/brand-logo.png",d=e=>o.pathname===e,c=e=>{r(e),s(!1)};return(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(hn,{children:[(0,ne.jsxs)(mn,{onClick:()=>c("/"),children:[(n||l)&&(0,ne.jsx)(gn,{src:n||l,alt:"Logo"}),(0,ne.jsx)(fn,{children:"Everything You Need, All"})]}),(0,ne.jsxs)(xn,{children:[(0,ne.jsx)(An,{active:d("/about"),onClick:()=>c("/about"),children:"About"}),(0,ne.jsx)(An,{active:d("/features"),onClick:()=>c("/features"),children:"Features"}),(0,ne.jsx)(An,{active:d("/pricing"),onClick:()=>c("/pricing"),children:"Pricing"}),(0,ne.jsx)(An,{active:d("/demo"),onClick:()=>c("/demo"),children:"Demo"}),(0,ne.jsx)(An,{active:d("/faq"),onClick:()=>c("/faq"),children:"FAQ"}),(0,ne.jsx)(An,{active:d("/blog"),onClick:()=>c("/blog"),children:"Blog"}),(0,ne.jsx)(An,{active:d("/contact"),onClick:()=>c("/contact"),children:"Contact"}),(0,ne.jsx)(Fn,{onClick:()=>c("/signup"),children:"Sign Up Free"}),(0,ne.jsx)(_n,{onClick:()=>c("/pos"),children:"Sign In"})]}),(0,ne.jsx)(yn,{onClick:()=>s(!a),children:a?"\u2715":"\u2630"})]}),(0,ne.jsx)(bn,{isOpen:a,onClick:()=>s(!1)}),(0,ne.jsxs)(vn,{isOpen:a,children:[(0,ne.jsxs)(wn,{children:[(0,ne.jsx)(jn,{children:"Menu"}),(0,ne.jsx)(kn,{onClick:()=>s(!1),children:"\xd7"})]}),(0,ne.jsxs)(Sn,{children:[(0,ne.jsx)(Cn,{active:d("/about"),onClick:()=>c("/about"),children:"About"}),(0,ne.jsx)(Cn,{active:d("/features"),onClick:()=>c("/features"),children:"Features"}),(0,ne.jsx)(Cn,{active:d("/pricing"),onClick:()=>c("/pricing"),children:"Pricing"}),(0,ne.jsx)(Cn,{active:d("/demo"),onClick:()=>c("/demo"),children:"Demo"}),(0,ne.jsx)(Cn,{active:d("/faq"),onClick:()=>c("/faq"),children:"FAQ"}),(0,ne.jsx)(Cn,{active:d("/blog"),onClick:()=>c("/blog"),children:"Blog"}),(0,ne.jsx)(Cn,{active:d("/contact"),onClick:()=>c("/contact"),children:"Contact"}),(0,ne.jsx)(En,{onClick:()=>c("/signup"),children:"Sign Up Free"}),(0,ne.jsx)(Pn,{onClick:()=>c("/pos"),children:"Sign In"})]})]})]})},zn=Z.Ay.footer`
  background: #0A2540;
  color: white;
  padding: 60px 48px 30px;

  @media (max-width: 768px) {
    padding: 40px 20px 20px;
  }
`,Rn=Z.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,Tn=Z.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`,On=Z.Ay.div``,In=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,$n=Z.Ay.span`
  font-size: 24px;
  font-weight: 700;
  color: white;
`,Mn=Z.Ay.p`
  font-size: 14px;
  color: #8898AA;
  line-height: 1.6;
  max-width: 300px;
`,Dn=Z.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #8898AA;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`,Nn=Z.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Ln=Z.Ay.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: color 0.2s;

  &:hover {
    color: #635BFF;
  }
`,qn=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Hn=Z.Ay.div`
  font-size: 14px;
  color: white;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`,Wn=Z.Ay.span`
  color: #8898AA;
  min-width: 60px;
`,Un=Z.Ay.a`
  color: white;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #635BFF;
  }
`,Gn=Z.Ay.hr`
  border: none;
  border-top: 1px solid #1E3A5F;
  margin: 0 0 20px 0;
`,Yn=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`,Vn=Z.Ay.p`
  font-size: 13px;
  color: #8898AA;
`,Qn=Z.Ay.div`
  display: flex;
  gap: 24px;
`,Kn=Z.Ay.button`
  background: none;
  border: none;
  color: #8898AA;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`,Jn=()=>{const t=(0,X.Zp)(),n=(new Date).getFullYear(),[r,o]=(0,e.useState)({email:"support@purplehere.com",phone:"+60-XX-XXX-XXXX",hours:"Mon-Fri 9AM-6PM (GMT+8)"});return(0,e.useEffect)(()=>{fetch("/api/site-settings").then(e=>e.json()).then(e=>{var t;const n=(null===(t=e.business_hours)||void 0===t?void 0:t.weekdays)||"Mon-Fri 9AM-6PM (GMT+8)";o({email:e.email||"support@purplehere.com",phone:e.phone||"+60-XX-XXX-XXXX",hours:n})}).catch(e=>console.error("Failed to load company settings:",e))},[]),(0,ne.jsx)(zn,{children:(0,ne.jsxs)(Rn,{children:[(0,ne.jsxs)(Tn,{children:[(0,ne.jsx)(On,{children:(0,ne.jsxs)(In,{children:[(0,ne.jsx)($n,{children:"PurpleHere"}),(0,ne.jsx)(Mn,{children:"Smart store management starts here. Efficiently manage your food courts, brands, and restaurants with our powerful POS system."})]})}),(0,ne.jsxs)(On,{children:[(0,ne.jsx)(Dn,{children:"Product"}),(0,ne.jsxs)(Nn,{children:[(0,ne.jsx)("li",{children:(0,ne.jsx)(Ln,{onClick:()=>t("/features"),children:"Features"})}),(0,ne.jsx)("li",{children:(0,ne.jsx)(Ln,{onClick:()=>t("/pricing"),children:"Pricing"})}),(0,ne.jsx)("li",{children:(0,ne.jsx)(Ln,{onClick:()=>t("/demo"),children:"Demo"})})]})]}),(0,ne.jsxs)(On,{children:[(0,ne.jsx)(Dn,{children:"Info"}),(0,ne.jsxs)(Nn,{children:[(0,ne.jsx)("li",{children:(0,ne.jsx)(Ln,{onClick:()=>t("/about"),children:"About Us"})}),(0,ne.jsx)("li",{children:(0,ne.jsx)(Ln,{onClick:()=>t("/faq"),children:"FAQ"})}),(0,ne.jsx)("li",{children:(0,ne.jsx)(Ln,{onClick:()=>t("/blog"),children:"Blog"})}),(0,ne.jsx)("li",{children:(0,ne.jsx)(Ln,{onClick:()=>t("/contact"),children:"Contact"})})]})]}),(0,ne.jsxs)(On,{children:[(0,ne.jsx)(Dn,{children:"Company"}),(0,ne.jsxs)(qn,{children:[(0,ne.jsxs)(Hn,{children:[(0,ne.jsx)(Wn,{children:"Name"}),(0,ne.jsx)("span",{children:"GIT CONSULTING SDN. BHD."})]}),(0,ne.jsxs)(Hn,{children:[(0,ne.jsx)(Wn,{children:"SSM"}),(0,ne.jsx)("span",{children:"202201012250(1457947-A)"})]}),(0,ne.jsxs)(Hn,{children:[(0,ne.jsx)(Wn,{children:"Web"}),(0,ne.jsx)(Un,{href:"https://gitconsulting.group",target:"_blank",rel:"noopener noreferrer",children:"gitconsulting.group"})]}),(0,ne.jsxs)(Hn,{children:[(0,ne.jsx)(Wn,{children:"E-mail"}),(0,ne.jsx)(Un,{href:"mailto:help@gitconsulting.group",children:"help@gitconsulting.group"})]})]})]})]}),(0,ne.jsx)(Gn,{}),(0,ne.jsxs)(Yn,{children:[(0,ne.jsxs)(Vn,{children:["\xa9 ",n," PurpleHere. All rights reserved."]}),(0,ne.jsxs)(Qn,{children:[(0,ne.jsx)(Kn,{onClick:()=>t("/privacy"),children:"Privacy Policy"}),(0,ne.jsx)(Kn,{onClick:()=>t("/terms"),children:"Terms of Service"})]})]})]})})},Xn=Z.Ay.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #FAFBFC;
`,Zn=Z.Ay.main`
  flex: 1;
  padding-top: 68px; /* Header height */
`,er=e=>{let{children:t}=e;return(0,ne.jsxs)(Xn,{children:[(0,ne.jsx)(Bn,{}),(0,ne.jsx)(Zn,{children:t}),(0,ne.jsx)(Jn,{})]})};var tr=n(8409);const nr=e=>{const t="undefined"!==typeof window?window.location.origin:"https://purplehere.com";return{"@context":"https://schema.org","@type":"Organization",name:(null===e||void 0===e?void 0:e.site_name)||"PurpleHere",url:t,logo:(null===e||void 0===e?void 0:e.brand_logo_url)||`${t}/logo.png`,description:"Subscription-based cloud POS system for restaurants, brands, and food courts",contactPoint:{"@type":"ContactPoint",contactType:"sales",email:(null===e||void 0===e?void 0:e.contact_email)||"contact@purplehere.com"}}},rr=e=>({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:e.map((e,t)=>({"@type":"ListItem",position:t+1,name:e.name,item:e.url}))}),or=e=>({"@context":"https://schema.org","@type":"WebSite",name:e||"PurpleHere",url:"https://purplehere.com",potentialAction:{"@type":"SearchAction",target:{"@type":"EntryPoint",urlTemplate:"https://purplehere.com/blog?search={search_term_string}"},"query-input":"required name=search_term_string"}}),ir=t=>{let{title:n,description:r,keywords:o,ogImage:i,ogType:a="website",canonicalUrl:s,author:l,publishedTime:d,modifiedTime:c,jsonLd:u,noindex:p=!1,twitterSite:h="@purplehere"}=t;const{settings:m}=(0,e.useContext)(ye),g=m.site_name||"PurpleHere",f=r||m.seo_description||"Subscription-based cloud POS system for restaurants, brands, and food courts.",x=i||m.og_image_url||"",y=o||m.seo_keywords||"",b=n?`${n} | ${g}`:m.seo_title||g,v="undefined"!==typeof window?window.location.href:"";return(0,ne.jsxs)(J,{children:[(0,ne.jsx)("title",{children:b}),(0,ne.jsx)("meta",{name:"description",content:f}),y&&(0,ne.jsx)("meta",{name:"keywords",content:y}),l&&(0,ne.jsx)("meta",{name:"author",content:l}),p&&(0,ne.jsx)("meta",{name:"robots",content:"noindex, nofollow"}),s&&(0,ne.jsx)("link",{rel:"canonical",href:s}),(0,ne.jsx)("meta",{property:"og:title",content:b}),(0,ne.jsx)("meta",{property:"og:description",content:f}),(0,ne.jsx)("meta",{property:"og:type",content:a}),(0,ne.jsx)("meta",{property:"og:url",content:s||v}),x&&(0,ne.jsx)("meta",{property:"og:image",content:x}),(0,ne.jsx)("meta",{property:"og:site_name",content:g}),"article"===a&&d&&(0,ne.jsx)("meta",{property:"article:published_time",content:d}),"article"===a&&c&&(0,ne.jsx)("meta",{property:"article:modified_time",content:c}),"article"===a&&l&&(0,ne.jsx)("meta",{property:"article:author",content:l}),(0,ne.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,ne.jsx)("meta",{name:"twitter:title",content:b}),(0,ne.jsx)("meta",{name:"twitter:description",content:f}),x&&(0,ne.jsx)("meta",{name:"twitter:image",content:x}),h&&(0,ne.jsx)("meta",{name:"twitter:site",content:h}),(()=>{if(!u)return null;return(Array.isArray(u)?u:[u]).map((e,t)=>(0,ne.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(e)}},t))})()]})},ar=Z.Ay.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: calc(100vh - 80px);
`,sr=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 100px 20px 80px;
  color: white;
`,lr=Z.Ay.h1`
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`,dr=Z.Ay.p`
  font-size: 22px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`,cr=Z.Ay.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`,ur=Z.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #667eea;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #635BFF;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`,pr=(0,Z.Ay)(tr.SC)`
  background: transparent;
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`,hr=Z.Ay.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 80px 50px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
`,mr=Z.Ay.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  color: white;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`,gr=Z.Ay.div`
  font-size: 48px;
  margin-bottom: 20px;
`,fr=Z.Ay.h2`
  font-size: 24px;
  margin-bottom: 15px;
`,xr=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
`,yr=()=>{const e=(0,X.Zp)(),t=[nr(),{"@context":"https://schema.org","@type":"SoftwareApplication",name:`${n||"PurpleHere"} POS`,applicationCategory:"BusinessApplication",operatingSystem:"Web Browser",description:"Cloud-based Point of Sale system for restaurants with real-time order management, inventory tracking, and multi-location support.",offers:{"@type":"Offer",price:"0",priceCurrency:"USD",description:"7-day free trial available"},featureList:["Real-time order management","Inventory tracking","Multi-location support","Kitchen display system","Customer display","Reports & Analytics","Staff management","Recipe management"]},or(),{"@context":"https://schema.org","@type":"SoftwareApplication","@id":"https://purplehere.com/#software",name:"PurpleHere POS",applicationCategory:"BusinessApplication",operatingSystem:"Web Browser",url:"https://purplehere.com",description:"Cloud-based Point of Sale system for restaurants, brands, and food courts with real-time order management, inventory tracking, and multi-location support.",provider:{"@type":"Organization",name:"GIT CONSULTING SDN. BHD.",address:{"@type":"PostalAddress",addressCountry:"MY"},url:"https://purplehere.com"},offers:{"@type":"AggregateOffer",priceCurrency:"USD",lowPrice:"0",highPrice:"0",offerCount:"3",description:"7-day free trial available. Contact us for pricing."}}];var n;return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Cloud POS System for Restaurants",description:"PurpleHere is a subscription-based cloud POS system for restaurants, brands, and food courts. Real-time order management, inventory tracking, multi-location support. Start your 7-day free trial today.",keywords:"POS system, restaurant POS, cloud POS, food court management, brand management, order management, inventory tracking",ogType:"website",canonicalUrl:"https://purplehere.com",jsonLd:t}),(0,ne.jsxs)(ar,{children:[(0,ne.jsxs)(sr,{children:[(0,ne.jsx)(lr,{children:"Smart Store Management Starts Here"}),(0,ne.jsx)(dr,{children:"Efficiently manage your food courts, brands, and restaurants with Purple Here POS System"}),(0,ne.jsxs)(cr,{children:[(0,ne.jsx)(ur,{onClick:()=>e("/demo"),children:"Try Demo"}),(0,ne.jsx)(pr,{onClick:()=>e("/pricing"),children:"View Pricing"})]})]}),(0,ne.jsxs)(hr,{children:[(0,ne.jsxs)(mr,{children:[(0,ne.jsx)(gr,{"aria-hidden":"true",children:"\u25ce"}),(0,ne.jsx)(fr,{children:"Restaurant Management"}),(0,ne.jsx)(xr,{children:"Efficiently manage your restaurant and monitor operations in real-time"})]}),(0,ne.jsxs)(mr,{children:[(0,ne.jsx)(gr,{"aria-hidden":"true",children:"\u2630"}),(0,ne.jsx)(fr,{children:"Brand Integration"}),(0,ne.jsx)(xr,{children:"View data from all branches at a glance and analyze performance"})]}),(0,ne.jsxs)(mr,{children:[(0,ne.jsx)(gr,{"aria-hidden":"true",children:"\u25c8"}),(0,ne.jsx)(fr,{children:"Easy Order & Payment"}),(0,ne.jsx)(xr,{children:"Handle everything from mobile orders to POS payments conveniently"})]})]})]})]})},br=Z.Ay.div`
  background: #FAFBFC;
`,vr=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,wr=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,jr=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,kr=Z.Ay.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,Sr=Z.Ay.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`,Ar=Z.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,Cr=Z.Ay.p`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 20px;
`,Fr=Z.Ay.ul`
  list-style: none;
  padding: 0;
`,_r=Z.Ay.li`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 15px;
  padding-left: 28px;
  position: relative;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
    font-size: 18px;
  }

  strong {
    color: #0A2540;
  }
`,Er=Z.Ay.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
  margin-top: 40px;
  border-radius: 16px;
`,Pr=Z.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`,Br=Z.Ay.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`,zr=()=>{const e=(0,X.Zp)();return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"About PurpleHere - Our Story & Mission",description:"Learn about PurpleHere, the cloud POS platform built for restaurants, brands, and food courts. Our mission is to simplify restaurant management.",keywords:"about PurpleHere, restaurant POS company, cloud POS platform, restaurant technology",canonicalUrl:"https://purplehere.com/about"}),(0,ne.jsxs)(br,{children:[(0,ne.jsxs)(vr,{children:[(0,ne.jsx)(wr,{children:"About PurpleHere"}),(0,ne.jsx)(jr,{children:"Where Innovation Meets Food Business"})]}),(0,ne.jsxs)(kr,{children:[(0,ne.jsxs)(Sr,{children:[(0,ne.jsx)(Ar,{children:"Our Story"}),(0,ne.jsx)(Cr,{children:(0,ne.jsx)("strong",{children:"Like a Purple Cow, Standing Out Through Creative Innovation"})}),(0,ne.jsx)(Cr,{children:'PurpleHere is inspired by Seth Godin\'s "Purple Cow" - a remarkable solution that stands out in the foodcourt and chain restaurant industry. We break conventional thinking and deliver innovation that truly matters.'}),(0,ne.jsxs)(Cr,{children:[(0,ne.jsx)("strong",{children:'"Here"'}),' represents the central hub where all your outlets, data, and solutions converge into one unified platform. It embodies the immediacy of "start right here, right now" and serves as the place where everything comes together.']})]}),(0,ne.jsxs)(Sr,{children:[(0,ne.jsx)(Ar,{children:"Our Vision"}),(0,ne.jsx)(Cr,{children:(0,ne.jsx)("strong",{children:'"Not Just Another POS, But a Creative Unified Platform"'})}),(0,ne.jsx)(Cr,{children:"Beyond simple order processing, we revolutionize the entire food business operation like a purple cow in the field. Our goal is to digitalize every aspect of store management, maximize operational efficiency, and empower data-driven decision making."})]}),(0,ne.jsxs)(Sr,{children:[(0,ne.jsx)(Ar,{children:"Why PurpleHere?"}),(0,ne.jsxs)(Fr,{children:[(0,ne.jsxs)(_r,{children:[(0,ne.jsx)("strong",{children:"Innovative Thinking:"})," Stand out with a remarkable, differentiated solution that breaks industry stereotypes"]}),(0,ne.jsxs)(_r,{children:[(0,ne.jsx)("strong",{children:"Unified Platform:"})," Manage all outlets, data, and features from a single centralized system"]}),(0,ne.jsxs)(_r,{children:[(0,ne.jsx)("strong",{children:"Real-time Insights:"})," Monitor and analyze orders, sales, and inventory across all locations in real-time"]}),(0,ne.jsxs)(_r,{children:[(0,ne.jsx)("strong",{children:"Mobile Ordering:"})," QR code-based mobile ordering enhances both customer convenience and operational efficiency"]}),(0,ne.jsxs)(_r,{children:[(0,ne.jsx)("strong",{children:"Cloud-Based:"})," Access your system anytime, anywhere with cloud technology enabling remote management"]})]})]}),(0,ne.jsxs)(Sr,{children:[(0,ne.jsx)(Ar,{children:"Our Technology"}),(0,ne.jsx)(Cr,{children:"Built on modern web technologies and cloud infrastructure, we deliver a stable and scalable system. Our React-based intuitive UI and real-time Socket.IO communication provide a fast and seamless user experience."}),(0,ne.jsx)(Cr,{children:"Works smoothly across various devices, and we continuously maintain the latest technology and security standards through regular updates."})]}),(0,ne.jsxs)(Er,{children:[(0,ne.jsx)(Pr,{children:"Experience the Difference, Start Today"}),(0,ne.jsx)(Br,{onClick:()=>e("/features"),children:"Explore Features"})]})]})]})]})},Rr=Z.Ay.div`
  background: #FAFBFC;
`,Tr=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,Or=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,Ir=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,$r=Z.Ay.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 60px;

  @media (max-width: 768px) {
    padding: 24px 16px 40px;
  }
`,Mr=Z.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`,Dr=Z.Ay.button`
  padding: 12px 24px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#425466"};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    ${e=>!e.active&&"background: #F8F9FF;"}
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`,Nr=Z.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 12px 0;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 19px;
  }
`,Lr=Z.Ay.p`
  font-size: 15px;
  color: #6B7C93;
  margin: 0 auto 36px;
  text-align: center;
  max-width: 720px;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,qr=Z.Ay.div`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #E6EBF1;
  color: ${e=>"advanced"===e.variant?"#7C3AED":"#0A2540"};
`,Hr=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }
`,Wr=Z.Ay.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    border-color: #635BFF;
  }
`,Ur=Z.Ay.div`
  position: relative;
  background: #F0F2F5;
  padding: 16px;
  cursor: pointer;
`,Gr=Z.Ay.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #D9DEE3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`,Yr=Z.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`,Vr=Z.Ay.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ADB5BD;
  font-size: 14px;
`,Qr=Z.Ay.div`
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
`,Kr=Z.Ay.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${e=>e.active?"white":"rgba(255,255,255,0.5)"};
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  padding: 0;
`,Jr=Z.Ay.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${e=>"left"===e.direction?"left: 8px;":"right: 8px;"}
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.85);
  color: #0A2540;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);

  ${Gr}:hover & {
    opacity: 1;
  }
`,Xr=Z.Ay.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`,Zr=Z.Ay.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
  align-self: flex-start;
  background: ${e=>"advanced"===e.variant?"#F3E8FF":"#ECFDF5"};
  color: ${e=>"advanced"===e.variant?"#7C3AED":"#059669"};
`,eo=Z.Ay.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,to=Z.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0 0 16px 0;
`,no=Z.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`,ro=Z.Ay.li`
  font-size: 13px;
  color: #374151;
  padding: 4px 0;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
  }
`,oo=Z.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,io=Z.Ay.img`
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.15);
`,ao=Z.Ay.button`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
`,so=Z.Ay.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${e=>"left"===e.direction?"left: 16px;":"right: 16px;"}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
`,lo=Z.Ay.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  z-index: 10001;
`,co=Z.Ay.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
  border-radius: 16px;
`,uo=Z.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px 0;
`,po=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 24px 0;
`,ho=Z.Ay.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`,mo=t=>{let{images:n,title:r,onOpenLightbox:o}=t;const[i,a]=(0,e.useState)(0);return 0===n.length?(0,ne.jsx)(Ur,{children:(0,ne.jsx)(Gr,{children:(0,ne.jsx)(Vr,{children:"Screenshot coming soon"})})}):(0,ne.jsx)(Ur,{onClick:()=>o(n,i,r),children:(0,ne.jsxs)(Gr,{children:[(0,ne.jsx)(Yr,{src:n[i],alt:`${r} - ${i+1}`,loading:"lazy"}),n.length>1&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Jr,{direction:"left",onClick:e=>{e.stopPropagation(),a(e=>0===e?n.length-1:e-1)},children:"\u2039"}),(0,ne.jsx)(Jr,{direction:"right",onClick:e=>{e.stopPropagation(),a(e=>e===n.length-1?0:e+1)},children:"\u203a"}),(0,ne.jsx)(Qr,{children:n.map((e,t)=>(0,ne.jsx)(Kr,{active:t===i,onClick:e=>{e.stopPropagation(),a(t)}},t))})]})]})})},go=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Array.from({length:t},(t,n)=>`/images/features/dashboard/${e}_${n+1}.webp`)},fo=[{key:"restaurant",label:"Restaurant",heading:"Everything a restaurant needs to manage orders, menus, staff, and customers",description:"From a powerful POS terminal and real-time kitchen display to staff scheduling, inventory tracking, and customer management \u2014 PurpleHere brings every aspect of restaurant operations into one seamless platform. Reduce manual work, minimize errors, and serve customers faster with tools built specifically for the food service industry. Whether you run a single cafe or a busy full-service restaurant, our system adapts to your workflow and scales with your growth.",features:[{code:"dashboard",title:"Dashboard",description:"Real-time overview of sales, orders, and key metrics at a glance",points:["Daily sales summary","Order statistics","Revenue trends","Quick notifications"],category:"basic",images:go("dashboard",2)},{code:"live_orders",title:"Live Orders",description:"Real-time order tracking and status management",points:["Real-time order queue","Status updates (Pending \u2192 Preparing \u2192 Ready)","Order details and modifications","Sound notifications for new orders"],category:"basic",images:go("live_orders",3)},{code:"pos_terminal",title:"POS Terminal",description:"Fast and intuitive point-of-sale system for taking orders",points:["Quick order entry with categories","Split bill & multiple payments","Discount and coupon application","Receipt printing & email"],category:"basic",images:go("pos_terminal",3)},{code:"kitchen_display",title:"Kitchen Display",description:"Kitchen display system for streamlined order preparation",points:["Color-coded order priorities","Preparation time tracking","Order bump when complete","Multi-station support"],category:"basic",images:go("kitchen_display")},{code:"customer_display",title:"Customer Display",description:"Customer-facing screen showing order status and queue",points:["Order status display","Queue number management","Branding customization","Multi-language support"],category:"basic",images:go("customer_display")},{code:"menu_management",title:"Menu Management",description:"Complete menu, category, and option management",points:["Menu items with images & pricing","Category organization","Option groups & modifiers","Availability toggle"],category:"basic",images:go("menu_management",4)},{code:"invoice_billing",title:"Invoice & Billing",description:"Invoice management, payment tracking, and billing history",points:["Invoice list with status tracking","Multiple payment methods","Payment history","Invoice settings & templates"],category:"basic",images:go("invoice_billing",3)},{code:"reports",title:"Reports & Analytics",description:"Sales reports, revenue analytics, and business insights",points:["Daily, weekly, monthly reports","Sales by category and item","Payment method breakdown","Export to CSV/Excel"],category:"basic",images:go("reports",6)},{code:"staff_management",title:"Staff & Permission Management",description:"Staff management with role-based permissions and PIN access",points:["Staff accounts with PIN login","6 permission groups","Role-based menu access","Staff activity tracking"],category:"basic",images:go("staff_management",2)},{code:"customer_crm",title:"Customer Management",description:"Customer database and relationship management",points:["Customer profiles","Order history per customer","Customer insights","Segmentation and filtering"],category:"basic",images:go("customer_crm",3)},{code:"coupons",title:"Coupon Management",description:"Create and manage discount coupons and promotions",points:["Percentage or fixed discounts","Minimum order requirements","Usage limits and expiry dates","Coupon performance tracking"],category:"basic",images:go("coupons",3)},{code:"notices",title:"Notices",description:"Receive system-wide announcements and notices",points:["Notice feed with read status","Comment and discussion","Priority-based sorting","File attachments"],category:"basic",images:go("notices",2)},{code:"membership",title:"Membership",description:"Customer membership and loyalty program management",points:["Membership tier management","Point accumulation & redemption","Member benefits & rewards","Membership analytics"],category:"basic",images:go("membership")},{code:"system_inquiry",title:"System Inquiry",description:"Submit and track system support tickets",points:["Create support tickets","Priority and category tagging","Status tracking","Communication thread"],category:"advanced",images:go("system_inquiry",4)},{code:"operation_inquiry",title:"Operation Inquiry",description:"Communicate operational requests with Brand or Foodcourt management",points:["Submit operational inquiries","Track request status","Two-way communication","Available for affiliated restaurants only"],category:"advanced",images:go("operation_inquiry",3)},{code:"activity_logs",title:"Change History",description:"Track all changes made by team members for accountability",points:["Activity audit trail","User-level tracking","Date range filtering","Change detail view"],category:"advanced",images:go("activity_logs")},{code:"floor_plan",title:"Floor Plan & Table Management",description:"Visual floor plan editor with drag-and-drop table layout",points:["Drag-and-drop floor plan editor","Table status tracking","Section management","Real-time availability"],category:"advanced",images:go("floor_plan",4)},{code:"mobile_ordering",title:"Mobile Ordering",description:"Let customers order directly from their phones via QR code",points:["QR code table ordering","Digital menu with images","Real-time order tracking","Online payment integration"],category:"advanced",images:go("mobile_ordering",6)},{code:"recipe_management",title:"Recipe Management",description:"Create and manage recipes with ingredient cost tracking",points:["Recipe creation with steps","Ingredient mapping","Cost calculation per serving","Recipe versioning"],category:"advanced",images:go("recipe_management",3)},{code:"inventory_management",title:"Inventory & Supplier Management",description:"Stock tracking, supplier management, and inventory control",points:["Real-time stock levels","Supplier database","Purchase tracking","Low stock alerts"],category:"advanced",images:go("inventory_management",5)},{code:"advanced_inventory",title:"Advanced Inventory",description:"Advanced stock take, loss analysis, and order suggestions",points:["Periodic stock take","Loss (shrinkage) analysis","Auto order suggestions","Expiry management"],category:"advanced",images:go("advanced_inventory")}]},{key:"brand",label:"Brand",heading:"Centralized control for franchise and multi-location brands",description:"Monitor every outlet in real time, standardize menus and recipes across all locations, and manage subscriptions from a single dashboard. PurpleHere gives brand operators full visibility into sales performance, staff activity, and operational consistency \u2014 ensuring every franchise delivers the same quality your brand promises. With built-in invoice management, performance analytics, and multi-tier permission controls, scaling your brand has never been easier.",features:[{code:"brand_dashboard",title:"Dashboard",description:"Centralized overview of all brand locations and performance",points:["Multi-location sales overview","Performance at a glance","Trend analysis","Quick access to any outlet"],category:"basic",images:go("brand_dashboard",2)},{code:"brand_management",title:"Brand Management",description:"Manage brand information and global settings",points:["Brand profile settings","Logo and branding","Global configurations","Brand-level controls"],category:"basic",images:go("brand_management",2)},{code:"brand_restaurant_mgmt",title:"Restaurant Management",description:"Manage all restaurants under the brand",points:["Restaurant list overview","Add/remove locations","Assign plans and modules","Monitor restaurant status"],category:"basic",images:go("brand_restaurant_mgmt",3)},{code:"brand_restaurant_admin",title:"Restaurant Admin Management",description:"Manage restaurant admins across all locations",points:["Admin assignment per restaurant","Admin overview across locations","Role management","Access control"],category:"basic",images:go("brand_restaurant_admin",3)},{code:"brand_manager_mgmt",title:"Manager Management",description:"Create and manage brand managers with permission control",points:["Brand manager accounts","Permission groups","Activity monitoring","Manager hierarchy"],category:"basic",images:go("brand_manager_mgmt",2)},{code:"brand_invoices",title:"Invoice & Billing",description:"Generate and manage invoices for franchise locations",points:["Invoice generation","Payment tracking","Billing history","Multiple payment methods"],category:"basic",images:go("brand_invoices",4)},{code:"brand_reports",title:"Reports",description:"Comprehensive reporting across all brand locations",points:["Consolidated sales reports","Location comparison","Revenue breakdown","Export capabilities"],category:"basic",images:go("brand_reports",5)},{code:"brand_notices",title:"Notice Management",description:"Send announcements and notices to all brand restaurants",points:["Broadcast to all locations","Targeted notices","Read receipts","Comment threads"],category:"basic",images:go("brand_notices",3)},{code:"brand_system_inquiry",title:"System Inquiry",description:"System support and issue tracking",points:["Support ticket creation","Priority management","Status tracking","Resolution history"],category:"advanced",images:go("brand_system_inquiry",3)},{code:"brand_operation_inquiry",title:"Inquiry Management",description:"Manage operational inquiries from franchise restaurants",points:["Inquiry queue management","Response and resolution","Category-based organization","Performance metrics"],category:"advanced",images:go("brand_operation_inquiry",2)},{code:"brand_products",title:"Product Management",description:"Centralized product and menu management for the brand",points:["Global product catalog","Menu standardization","Price management","Product distribution to outlets"],category:"advanced",images:go("brand_products",6)},{code:"brand_recipes",title:"Recipe Management",description:"Standardized recipe management across all franchises",points:["Central recipe database","Ingredient standardization","Cost tracking","Recipe distribution"],category:"advanced",images:go("brand_recipes",3)},{code:"brand_product_recipes",title:"Product Recipe Management",description:"Link products to recipes for automated cost tracking",points:["Product-recipe linking","Cost per product calculation","Margin analysis","Recipe assignment"],category:"advanced",images:go("brand_product_recipes",3)},{code:"brand_inventory",title:"Inventory & Supplier Management",description:"Centralized inventory and supplier oversight across locations",points:["Multi-location stock overview","Supplier database","Inventory alerts","Supply chain visibility"],category:"advanced",images:go("brand_inventory",4)},{code:"brand_performance",title:"Performance Analytics",description:"Deep performance comparison across all brand locations",points:["Location ranking","Sales comparison charts","Growth trends","Benchmark analysis"],category:"advanced",images:go("brand_performance",2)},{code:"brand_plans",title:"Subscription Plans",description:"Create and manage subscription plans for franchise locations",points:["Plan template creation","Module selection per plan","Pricing configuration","Plan assignment"],category:"advanced",images:go("brand_plans",3)},{code:"brand_subscriptions",title:"Subscription Management",description:"Track and manage subscriptions for all franchisees",points:["Subscription status overview","Billing cycle management","Renewal tracking","Usage monitoring"],category:"advanced",images:go("brand_subscriptions",2)},{code:"brand_payment_settings",title:"Payment Settings",description:"Configure payment methods and billing for the brand",points:["Payment gateway setup","Bank account configuration","Billing preferences","Tax settings"],category:"advanced",images:go("brand_payment_settings",2)}]},{key:"foodcourt",label:"Foodcourt",heading:"Unified management for foodcourt operators",description:"Oversee all tenant restaurants from one place \u2014 handle billing, manage inquiries, track real-time performance analytics, and streamline shared services effortlessly. PurpleHere simplifies the complexity of multi-tenant foodcourt operations with automated invoicing, centralized notice broadcasting, and detailed revenue breakdowns per tenant. Spend less time on admin work and more time growing your foodcourt business.",features:[{code:"fc_dashboard",title:"Dashboard",description:"Foodcourt-wide overview with tenant performance summary",points:["Tenant sales overview","Occupancy status","Revenue summary","Quick tenant access"],category:"basic",images:go("fc_dashboard")},{code:"fc_management",title:"Foodcourt Management",description:"Manage foodcourt information and operations",points:["Foodcourt profile","Operating hours","Facility management","Configuration settings"],category:"basic",images:go("fc_management")},{code:"fc_restaurant_mgmt",title:"Restaurant Management",description:"Manage tenant restaurants in the foodcourt",points:["Tenant list overview","Add/remove tenants","Plan assignment","Tenant status monitoring"],category:"basic",images:go("fc_restaurant_mgmt")},{code:"fc_admin_mgmt",title:"Restaurant Admin Management",description:"Manage restaurant admins across foodcourt tenants",points:["Admin assignment","Admin overview","Access management","Role configuration"],category:"basic",images:go("fc_admin_mgmt")},{code:"fc_manager_mgmt",title:"Manager Management",description:"Create and manage foodcourt managers with permissions",points:["Manager accounts","Permission control","Activity tracking","Role assignment"],category:"basic",images:go("fc_manager_mgmt")},{code:"fc_invoices",title:"Invoice & Billing",description:"Generate invoices for foodcourt tenants",points:["Tenant invoice generation","Rent and service billing","Payment tracking","Billing history"],category:"basic",images:go("fc_invoices")},{code:"fc_notices",title:"Notice Management",description:"Send notices and announcements to foodcourt tenants",points:["Broadcast notices","Targeted communication","Read tracking","Attachment support"],category:"basic",images:go("fc_notices")},{code:"fc_system_inquiry",title:"System Inquiry",description:"System support for foodcourt operations",points:["Support tickets","Issue categorization","Status tracking","Resolution management"],category:"advanced",images:go("fc_system_inquiry")},{code:"fc_operation_inquiry",title:"Inquiry Management",description:"Handle operational inquiries from foodcourt tenants",points:["Inquiry queue","Response management","Category filtering","Resolution tracking"],category:"advanced",images:go("fc_operation_inquiry")},{code:"fc_stats",title:"Statistics & Analytics",description:"Sales and performance statistics across all tenants",points:["Tenant comparison charts","Revenue analysis","Peak hours analysis","Growth trends"],category:"advanced",images:go("fc_stats")},{code:"fc_customers",title:"Customer Management",description:"Shared customer database for the foodcourt",points:["Customer profiles","Visit history","Spending patterns","Customer insights"],category:"advanced",images:go("fc_customers")},{code:"fc_coupons",title:"Coupon Management",description:"Foodcourt-wide coupon and promotion management",points:["Foodcourt promotions","Cross-tenant coupons","Usage tracking","Campaign management"],category:"advanced",images:go("fc_coupons")},{code:"fc_plans",title:"Subscription Plans",description:"Create plans for foodcourt tenant subscriptions",points:["Plan templates","Module selection","Pricing tiers","Plan assignment"],category:"advanced",images:go("fc_plans")},{code:"fc_subscriptions",title:"Subscription Management",description:"Track and manage tenant subscriptions",points:["Subscription overview","Billing management","Renewal tracking","Status monitoring"],category:"advanced",images:go("fc_subscriptions")},{code:"fc_payment_settings",title:"Payment Settings",description:"Configure payment and billing for the foodcourt",points:["Payment methods","Bank configuration","Billing preferences","Tax setup"],category:"advanced",images:go("fc_payment_settings")}]},{key:"owner",label:"Owner",heading:"Portfolio-level oversight for multi-location restaurant owners",description:"Compare performance side by side, track financials across every location, and stay fully informed \u2014 all without interfering with day-to-day operations. PurpleHere gives restaurant owners a bird's-eye view of their entire portfolio with consolidated reports, invoice management, and performance benchmarking. Make data-driven decisions about your investments while your on-site teams handle the daily workflow independently.",features:[{code:"owner_dashboard",title:"Dashboard",description:"Portfolio overview with multi-restaurant performance summary",points:["All restaurants at a glance","Revenue summary","Performance overview","Quick navigation"],category:"basic",images:go("owner_dashboard")},{code:"owner_restaurants",title:"Restaurant Portfolio",description:"View and manage all owned restaurants",points:["Restaurant list","Status overview","Performance indicators","Quick access to details"],category:"basic",images:go("owner_restaurants")},{code:"owner_invoices",title:"Invoice & Billing",description:"Invoice management and payment for all owned restaurants",points:["Consolidated invoices","Payment tracking","Billing history","Multi-restaurant billing"],category:"basic",images:go("owner_invoices")},{code:"owner_notices",title:"Notices",description:"System notices and announcements",points:["Notice feed","Read tracking","Comments","Attachments"],category:"basic",images:go("owner_notices")},{code:"owner_system_inquiry",title:"System Inquiry",description:"System support for restaurant owner",points:["Support tickets","Issue tracking","Priority management","Resolution history"],category:"advanced",images:go("owner_system_inquiry")},{code:"owner_operation_inquiry",title:"Operation Inquiry",description:"Operational inquiries across owned restaurants",points:["Operation requests","Multi-restaurant scope","Status tracking","Communication thread"],category:"advanced",images:go("owner_operation_inquiry")},{code:"owner_performance",title:"Performance Analytics",description:"Compare performance across all owned restaurants",points:["Restaurant ranking","Sales comparison","Growth analysis","Benchmark reporting"],category:"advanced",images:go("owner_performance")},{code:"owner_reports",title:"Financial Reports",description:"Financial and operational reports across portfolio",points:["Revenue analysis","Expense tracking","Profit margins","Export capabilities"],category:"advanced",images:go("owner_reports")}]}],xo=()=>{const t=(0,X.Zp)(),[n,r]=(0,e.useState)("restaurant"),[o,i]=(0,e.useState)(null),[a,s]=(0,e.useState)(new Set),l=fo.find(e=>e.key===n),d=l.features.filter(e=>"basic"===e.category),c=l.features.filter(e=>"advanced"===e.category),u=(0,e.useCallback)((e,t,n)=>{const r=e.filter(e=>!a.has(e));r.length>0&&i({images:r,index:Math.min(t,r.length-1),title:n})},[a]),p=(0,e.useCallback)(e=>{s(t=>new Set([...t,e]))},[]);(0,e.useEffect)(()=>{const e=e=>{o&&("Escape"===e.key&&i(null),"ArrowLeft"===e.key&&i(e=>e?{...e,index:0===e.index?e.images.length-1:e.index-1}:null),"ArrowRight"===e.key&&i(e=>e?{...e,index:e.index===e.images.length-1?0:e.index+1}:null))};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[o]);const h=e=>{const t=(e=>e.images.filter(e=>!a.has(e)))(e);return(0,ne.jsxs)(Wr,{children:[t.length>0?(0,ne.jsx)(mo,{images:t,title:e.title,onOpenLightbox:u}):(0,ne.jsx)(Ur,{children:(0,ne.jsx)(Vr,{children:"Screenshot coming soon"})}),(0,ne.jsxs)(Xr,{children:[(0,ne.jsx)(Zr,{variant:e.category,children:e.category}),(0,ne.jsx)(eo,{children:e.title}),(0,ne.jsx)(to,{children:e.description}),(0,ne.jsx)(no,{children:e.points.map((e,t)=>(0,ne.jsx)(ro,{children:e},t))})]}),e.images.map(e=>(0,ne.jsx)("img",{src:e,alt:"",style:{display:"none"},onError:()=>p(e)},e))]},e.code)};return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Features - Powerful POS Tools for Every Business",description:"Explore PurpleHere's powerful features: POS terminal, menu management, real-time analytics, multi-branch support, kitchen display, and more.",keywords:"POS features, restaurant management features, kitchen display, menu management, order management, analytics",canonicalUrl:"https://purplehere.com/features",jsonLd:[{"@context":"https://schema.org","@type":"HowTo",name:"How to Get Started with PurpleHere POS",description:"Set up your cloud POS system in minutes with PurpleHere.",step:[{"@type":"HowToStep",position:1,name:"Request a Free Trial",text:"Visit purplehere.com/contact and fill out the form to request your 7-day free trial. No credit card required."},{"@type":"HowToStep",position:2,name:"Set Up Your Restaurant",text:"Add your restaurant details, configure menus, categories, and pricing in the dashboard."},{"@type":"HowToStep",position:3,name:"Start Taking Orders",text:"Use the POS terminal to process orders, manage kitchen display, and track analytics in real-time."}]},rr([{name:"Home",url:"https://purplehere.com"},{name:"Features",url:"https://purplehere.com/features"}])]}),(0,ne.jsxs)(Rr,{children:[(0,ne.jsxs)(Tr,{children:[(0,ne.jsx)(Or,{children:"Powerful Features for Every Need"}),(0,ne.jsx)(Ir,{children:"From multi-brand management to individual restaurant operations \u2014 explore all the tools that power your business."})]}),(0,ne.jsxs)($r,{children:[(0,ne.jsx)(Mr,{children:fo.map(e=>(0,ne.jsx)(Dr,{active:n===e.key,onClick:()=>r(e.key),children:e.label},e.key))}),(0,ne.jsx)(Nr,{children:l.heading}),(0,ne.jsx)(Lr,{children:l.description}),d.length>0&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(qr,{variant:"basic",children:["Basic Features (",d.length,")"]}),(0,ne.jsx)(Hr,{children:d.map(h)})]}),c.length>0&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(qr,{variant:"advanced",children:["Advanced Features (",c.length,")"]}),(0,ne.jsx)(Hr,{children:c.map(h)})]}),(0,ne.jsxs)(co,{children:[(0,ne.jsx)(uo,{children:"Ready to Transform Your Business?"}),(0,ne.jsx)(po,{children:"Try our demo accounts or contact us to get started with PurpleHere"}),(0,ne.jsx)(ho,{onClick:()=>t("/demo"),children:"Try Demo Now"})]})]})]}),o&&(0,ne.jsxs)(oo,{onClick:()=>i(null),children:[(0,ne.jsx)(ao,{onClick:()=>i(null),children:"\xd7"}),o.images.length>1&&(0,ne.jsx)(so,{direction:"left",onClick:e=>{e.stopPropagation(),i(e=>e?{...e,index:0===e.index?e.images.length-1:e.index-1}:null)},children:"\u2039"}),(0,ne.jsx)(io,{src:o.images[o.index],alt:o.title,onClick:e=>e.stopPropagation()}),o.images.length>1&&(0,ne.jsx)(so,{direction:"right",onClick:e=>{e.stopPropagation(),i(e=>e?{...e,index:e.index===e.images.length-1?0:e.index+1}:null)},children:"\u203a"}),(0,ne.jsxs)(lo,{children:[o.title," \u2014 ",o.index+1," / ",o.images.length]})]})]})},yo=Z.Ay.div`
  background: #FAFBFC;
`,bo=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,vo=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,wo=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,jo=Z.Ay.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 16px;
`,ko=Z.Ay.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`,So=Z.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`,Ao=Z.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,Co=Z.Ay.button`
  padding: 12px 24px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#425466"};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    ${e=>!e.active&&"background: #F8F9FF;"}
  }
`,Fo=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,_o=Z.Ay.span`
  font-size: 14px;
  color: #6B7C93;
`,Eo=Z.Ay.select`
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Po=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto;
  }
`,Bo=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${e=>e.popular?"#635BFF":"#E6EBF1"};
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;

  ${e=>e.popular&&"\n    box-shadow: 0 8px 24px rgba(99, 91, 255, 0.15);\n  "}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`,zo=Z.Ay.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #635BFF;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`,Ro=Z.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-align: center;
`,To=(Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
  text-align: center;
  min-height: 40px;
`,Z.Ay.div`
  text-align: center;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 12px;
  margin-bottom: 24px;
`),Oo=Z.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,Io=Z.Ay.span`
  font-size: 20px;
  font-weight: 600;
  color: #6B7280;
  margin-right: 4px;
`,$o=Z.Ay.span`
  font-size: 16px;
  font-weight: 500;
  color: #6B7280;
`,Mo=Z.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-top: 8px;
`,Do=Z.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,No=Z.Ay.div`
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 16px;
`,Lo=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
  }
`,qo=Z.Ay.span`
  font-size: 14px;
  color: #374151;
`,Ho=Z.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,Wo=Z.Ay.div`
  margin-bottom: 20px;
`,Uo=Z.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  margin-bottom: 12px;
`,Go=Z.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
`,Yo=Z.Ay.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: ${e=>e.included?"#1F2937":"#D1D5DB"};
  background: ${e=>e.included?"#F0FDF4":"transparent"};
`,Vo=Z.Ay.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 11px;
  flex-shrink: 0;
  background: ${e=>e.included?"#10B981":"#E5E7EB"};
  color: ${e=>e.included?"white":"#9CA3AF"};
`,Qo=Z.Ay.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
  margin: 10px 0 4px 0;
  &:first-child {
    margin-top: 0;
  }
`,Ko=Z.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  flex: 1;
`,Jo=Z.Ay.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
`,Xo=Z.Ay.span`
  color: #10B981;
  font-weight: bold;
`,Zo=Z.Ay.button`
  width: 100%;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.primary?"#635BFF":"white"};
  color: ${e=>e.primary?"white":"#635BFF"};
  border: 2px solid #635BFF;
  margin-top: auto;

  &:hover {
    background: ${e=>e.primary?"#5A51E6":"#F0F4FF"};
    transform: translateY(-1px);
  }
`,ei=Z.Ay.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
`,ti=Z.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`,ni=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
`,ri=Z.Ay.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`,oi={dashboard:"Dashboard",live_orders:"Live Orders",pos_terminal:"POS Terminal",kitchen_display:"Kitchen Display",customer_display:"Customer Display",menu_management:"Menu Management",invoice_billing:"Invoice & Billing",reports:"Reports & Analytics",staff_management:"Staff & Permissions",customer_crm:"Customer Management",coupons:"Coupons & Promotions",notices:"Notices",membership:"Membership",system_inquiry:"System Inquiry",operation_inquiry:"Operation Inquiry",activity_logs:"Change History",floor_plan:"Floor Plan & Tables",mobile_ordering:"Mobile Ordering",recipe_management:"Recipe Management",inventory_management:"Inventory & Suppliers",advanced_inventory:"Advanced Inventory",brand_dashboard:"Dashboard",brand_management:"Brand Management",brand_restaurant_mgmt:"Restaurant Management",brand_admin_staff:"Admin & Staff Management",brand_restaurant_admin:"Restaurant Admin Management",brand_manager_mgmt:"Manager Management",brand_invoices:"Invoice & Billing",brand_reports:"Reports",brand_notices:"Notice Management",brand_system_inquiry:"System Inquiry",brand_operation_inquiry:"Operation Inquiry",brand_products:"Product Management",brand_recipes:"Recipe Management",brand_product_recipes:"Product Recipe Management",brand_inventory:"Inventory & Suppliers",brand_performance:"Performance Analytics",brand_plans:"Subscription Plans",brand_subscriptions:"Subscription Management",brand_payment_settings:"Payment Settings",fc_dashboard:"Dashboard",fc_management:"Foodcourt Management",fc_restaurant_mgmt:"Restaurant Management",fc_admin_mgmt:"Admin Management",fc_admin_staff:"Admin & Staff Management",fc_manager_mgmt:"Manager Management",fc_invoices:"Invoice & Billing",fc_notices:"Notice Management",fc_system_inquiry:"System Inquiry",fc_operation_inquiry:"Operation Inquiry",fc_stats:"Statistics & Analytics",fc_customers:"Customer Management",fc_coupons:"Coupon Management",fc_plans:"Subscription Plans",fc_subscriptions:"Subscription Management",fc_payment_settings:"Payment Settings",owner_dashboard:"Dashboard",owner_restaurants:"Restaurant Portfolio",owner_invoices:"Invoice & Billing",owner_notices:"Notices",owner_system_inquiry:"System Inquiry",owner_operation_inquiry:"Operation Inquiry",owner_performance:"Performance Analytics",owner_reports:"Financial Reports"},ii={KR:"KRW",MY:"MYR",SG:"SGD",JP:"JPY",CN:"CNY",TW:"TWD",TH:"THB",VN:"VND",PH:"PHP",ID:"IDR",IN:"INR",AU:"AUD",GB:"GBP",DE:"EUR",FR:"EUR",IT:"EUR",ES:"EUR",NL:"EUR",US:"USD",CA:"CAD"},ai=()=>{const t=(0,X.Zp)(),[n,r]=(0,e.useState)("restaurant"),[o,i]=(0,e.useState)([]),[a,s]=(0,e.useState)(!0),[l,d]=(0,e.useState)([]),[c,u]=(0,e.useState)([]),[p,h]=(0,e.useState)("USD"),m=async()=>{try{var e;const t=await fetch("https://ipapi.co/json/",{signal:AbortSignal.timeout(3e3)});if(!t.ok)throw new Error("IP API request failed");const n=null===(e=(await t.json()).country_code)||void 0===e?void 0:e.toUpperCase();return n&&ii[n]?ii[n]:"USD"}catch(t){return console.warn("IP-based currency detection failed, using browser language fallback:",t),(()=>{try{var e;const t=(null===(e=(navigator.language||"en-US").split("-")[1])||void 0===e?void 0:e.toUpperCase())||"";return ii[t]||"USD"}catch{return"USD"}})()}};(0,e.useEffect)(()=>{g(),x(),f()},[]);const g=async()=>{try{const e=await fetch("/api/public/plans");if(e.ok){const t=await e.json();i(t)}}catch(e){console.error("Failed to load plans:",e)}finally{s(!1)}},f=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(e.ok){const t=await e.json(),n=Array.isArray(t)?t:t.data||t.modules||[];u(n)}}catch(e){console.error("Failed to load modules:",e)}},x=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const t=(await e.json()).data||[];d(t);const n=await m();t.some(e=>e.code===n)?h(n):t.length>0&&h(t[0].code)}}catch(e){console.error("Failed to load currencies:",e);const t=[{code:"USD",symbol:"$",name:"US Dollar",decimals:2},{code:"MYR",symbol:"RM",name:"Malaysian Ringgit",decimals:2},{code:"KRW",symbol:"\u20a9",name:"Korean Won",decimals:0}];d(t);const n=await m(),r=t.some(e=>e.code===n);h(r?n:t[0].code)}},y=o.map(e=>({...e,features:Array.isArray(e.features)?e.features:"string"===typeof e.features?(()=>{try{return JSON.parse(e.features)}catch{return[]}})():[],included_modules:Array.isArray(e.included_modules)?e.included_modules:"string"===typeof e.included_modules?(()=>{try{return JSON.parse(e.included_modules)}catch{return[]}})():[]})),b=y.filter(e=>e.plan_target===n),v=e=>l.find(t=>t.code===e)||{code:e,symbol:e,name:e,decimals:2},w=(e,t)=>{const n=v(t);return 0===e?"Contact Us":0===n.decimals?Math.round(e).toLocaleString():e.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})},j=(e,t)=>e.currency_prices&&e.currency_prices[p]?e.currency_prices[p][t]:0,k=e=>-1===e?"Unlimited":e.toLocaleString(),S={restaurant:"Restaurant",brand:"Brand",foodcourt:"Foodcourt",owner:"Owner"},A=["restaurant","brand","foodcourt","owner"].filter(e=>y.some(t=>t.plan_target===e)),C=b.length>0?b:[],F=v(p),_=rr([{name:"Home",url:"https://purplehere.com"},{name:"Pricing",url:"https://purplehere.com/pricing"}]);return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Pricing - Subscription Plans",description:"Simple, transparent pricing for PurpleHere POS system. Choose from Basic, Professional, or Enterprise plans for restaurants, brands, and food courts. 7-day free trial available.",keywords:"POS pricing, restaurant POS cost, POS subscription, PurpleHere plans, free trial POS",canonicalUrl:"https://purplehere.com/pricing",jsonLd:[_,{"@context":"https://schema.org","@type":"SoftwareApplication","@id":"https://purplehere.com/#software",name:"PurpleHere POS",applicationCategory:"BusinessApplication",operatingSystem:"Web Browser",url:"https://purplehere.com",description:"Cloud-based Point of Sale system for restaurants, brands, and food courts with real-time order management, inventory tracking, and multi-location support.",provider:{"@type":"Organization",name:"GIT CONSULTING SDN. BHD.",address:{"@type":"PostalAddress",addressCountry:"MY"},url:"https://purplehere.com"},offers:{"@type":"AggregateOffer",priceCurrency:"USD",lowPrice:"0",highPrice:"0",offerCount:"3",description:"7-day free trial available. Contact us for pricing."}}]}),(0,ne.jsxs)(yo,{children:[(0,ne.jsxs)(bo,{children:[(0,ne.jsx)(vo,{children:"Simple, Transparent Pricing"}),(0,ne.jsx)(wo,{children:"Choose the plan that fits your business. No hidden fees, cancel anytime."}),(0,ne.jsx)(jo,{children:"7 Days Free Trial - No Credit Card Required"})]}),(0,ne.jsxs)(ko,{children:[(0,ne.jsxs)(So,{children:[(0,ne.jsx)(Ao,{children:A.map(e=>(0,ne.jsx)(Co,{active:n===e,onClick:()=>r(e),children:S[e]||e},e))}),(0,ne.jsxs)(Fo,{children:[(0,ne.jsx)(_o,{children:"Currency:"}),(0,ne.jsx)(Eo,{value:p,onChange:e=>h(e.target.value),children:l.map(e=>(0,ne.jsxs)("option",{value:e.code,children:[e.symbol," ",e.code," - ",e.name]},e.code))})]})]}),a?(0,ne.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading plans..."}):0===C.length?(0,ne.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No plans available for this category yet."}):(0,ne.jsx)(Po,{children:C.map(e=>{const r=j(e,"monthly"),o=j(e,"annual"),i=e.name.toLowerCase().includes("professional");const a=r>0?Math.round((12*r-o)/(12*r)*100):0;return(0,ne.jsxs)(Bo,{popular:i,children:[i&&(0,ne.jsx)(zo,{children:"Most Popular"}),(0,ne.jsx)(Ro,{children:e.display_name}),(0,ne.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#635BFF",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"24px",textAlign:"center"},children:"restaurant"===e.plan_target?"Restaurant Plan":"brand"===e.plan_target?"Brand Plan":"foodcourt"===e.plan_target?"Foodcourt Plan":"Owner Plan"}),(0,ne.jsx)(To,{children:0===r?(0,ne.jsx)(Oo,{children:"Contact Us"}):(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Oo,{children:[(0,ne.jsx)(Io,{children:F.symbol}),w(r,p),(0,ne.jsx)($o,{children:"/month"})]}),o>0&&(0,ne.jsxs)(Mo,{children:[F.symbol," ",w(o,p),"/year",a>0&&` (Save ${a}%)`]}),(0,ne.jsx)(Do,{children:"Billed monthly or annually"})]})}),(0,ne.jsxs)(No,{children:["restaurant"===e.plan_target&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Lo,{children:[(0,ne.jsx)(qo,{children:"Staff Limit"}),(0,ne.jsx)(Ho,{children:k(e.staff_limit)})]}),(0,ne.jsxs)(Lo,{children:[(0,ne.jsx)(qo,{children:"Orders/month"}),(0,ne.jsx)(Ho,{children:k(e.order_limit)})]}),(0,ne.jsxs)(Lo,{children:[(0,ne.jsx)(qo,{children:"Menu Items"}),(0,ne.jsx)(Ho,{children:k(e.menu_item_limit)})]})]}),("brand"===e.plan_target||"foodcourt"===e.plan_target)&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Lo,{children:[(0,ne.jsx)(qo,{children:"Restaurants"}),(0,ne.jsx)(Ho,{children:k(e.restaurant_limit)})]}),(0,ne.jsxs)(Lo,{children:[(0,ne.jsx)(qo,{children:"Managers"}),(0,ne.jsx)(Ho,{children:k(e.manager_limit)})]})]}),"owner"===e.plan_target&&(0,ne.jsxs)(Lo,{children:[(0,ne.jsx)(qo,{children:"Restaurants"}),(0,ne.jsx)(Ho,{children:k(e.restaurant_limit)})]})]}),(t=>{const n=c.filter(t=>t.target_user_type===e.plan_target||"all"===t.target_user_type),r=n.filter(e=>"basic"===e.category),o=n.filter(e=>"basic"!==e.category),i=new Set(e.included_modules||[]);return 0===n.length&&(null===(t=e.included_modules)||void 0===t?void 0:t.length)>0?(0,ne.jsxs)(Wo,{children:[(0,ne.jsxs)(Uo,{children:["Included Modules (",e.included_modules.length,")"]}),(0,ne.jsx)(Go,{children:e.included_modules.map((e,t)=>(0,ne.jsxs)(Yo,{included:!0,children:[(0,ne.jsx)(Vo,{included:!0,children:"\u2713"}),oi[e]||e]},t))})]}):n.length>0?(0,ne.jsxs)(Wo,{children:[(0,ne.jsx)(Uo,{children:"Modules"}),(0,ne.jsxs)(Go,{children:[r.length>0&&(0,ne.jsx)(Qo,{children:"Basic"}),r.map(e=>(0,ne.jsxs)(Yo,{included:i.has(e.module_code),children:[(0,ne.jsx)(Vo,{included:i.has(e.module_code),children:i.has(e.module_code)?"\u2713":"\u2014"}),oi[e.module_code]||e.name]},e.module_code)),o.length>0&&(0,ne.jsx)(Qo,{children:"Advanced"}),o.map(e=>(0,ne.jsxs)(Yo,{included:i.has(e.module_code),children:[(0,ne.jsx)(Vo,{included:i.has(e.module_code),children:i.has(e.module_code)?"\u2713":"\u2014"}),oi[e.module_code]||e.name]},e.module_code))]})]}):null})(),e.features&&e.features.length>0&&""!==e.features[0]&&(0,ne.jsx)(Ko,{children:e.features.filter(e=>e&&e.trim()).map((e,t)=>(0,ne.jsxs)(Jo,{children:[(0,ne.jsx)(Xo,{children:"\u2713"}),e]},t))}),(0,ne.jsx)(Zo,{primary:i,onClick:()=>t("/signup",{state:{plan_target:n,plan_id:e.id}}),children:"Start Free Trial"})]},e.id)})})]}),(0,ne.jsxs)(ei,{children:[(0,ne.jsx)(ti,{children:"Ready to get started?"}),(0,ne.jsx)(ni,{children:"Start your 7-day free trial today. No credit card required."}),(0,ne.jsx)(ri,{onClick:()=>t("/signup"),children:"Start Free Trial"})]})]})]})},si=Z.Ay.div`
  background: #FAFBFC;
`,li=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,di=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,ci=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,ui=Z.Ay.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
`,pi=Z.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`,hi=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
`,mi=Z.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 24px;
`,gi=Z.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,fi=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,xi=Z.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,yi=Z.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,bi=Z.Ay.input`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,vi=Z.Ay.select`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,wi=Z.Ay.textarea`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,ji=Z.Ay.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #B0BEC5;
    cursor: not-allowed;
  }
`,ki=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`,Si=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,Ai=Z.Ay.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;
`,Ci=Z.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #F0F4F8;

  &:last-child {
    border-bottom: none;
  }
`,Fi=Z.Ay.span`
  font-size: 20px;
  width: 24px;
  text-align: center;
`,_i=Z.Ay.div`
  flex: 1;
`,Ei=Z.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #8898AA;
  text-transform: uppercase;
  margin-bottom: 4px;
`,Pi=Z.Ay.div`
  font-size: 15px;
  color: #0A2540;
`,Bi=Z.Ay.a`
  color: #635BFF;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #5A51E6;
    text-decoration: underline;
  }
`,zi=Z.Ay.div`
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 8px;
  padding: 16px;
  color: #065F46;
  text-align: center;
`,Ri=Z.Ay.div`
  background: #FEF2F2;
  border: 1px solid #EF4444;
  border-radius: 8px;
  padding: 16px;
  color: #991B1B;
  text-align: center;
`,Ti=()=>{var t,n;const r=(0,X.zy)().state,[o,i]=(0,e.useState)({name:"",email:"",phone:"",company_name:"",inquiry_type:(null===r||void 0===r?void 0:r.inquiry_type)||"",interested_plan:(null===r||void 0===r?void 0:r.interested_plan)||"",preferred_username:"",message:""}),[a,s]=(0,e.useState)(!1),[l,d]=(0,e.useState)(!1),[c,u]=(0,e.useState)(""),[p,h]=(0,e.useState)(null);(0,e.useEffect)(()=>{fetch("/api/site-settings").then(e=>e.json()).then(e=>{h({email:e.email||"support@purplehere.com",phone:e.phone||"+60-XX-XXX-XXXX",whatsapp:e.whatsapp||e.phone||"+60-XX-XXX-XXXX",business_hours:e.business_hours||{weekdays:"9:00 AM - 6:00 PM (GMT+8)",weekend:"Closed"}})}).catch(e=>console.error("Failed to load company settings:",e))},[]);const m=e=>{const{name:t,value:n}=e.target;i(e=>({...e,[t]:n}))};return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Contact Us - Get Started with PurpleHere",description:"Contact PurpleHere for a free trial, pricing inquiry, or technical support. We typically respond within 24 hours.",keywords:"contact PurpleHere, POS free trial, POS demo request, restaurant POS support",canonicalUrl:"https://purplehere.com/contact"}),(0,ne.jsxs)(si,{children:[(0,ne.jsxs)(li,{children:[(0,ne.jsx)(di,{children:"Get in Touch"}),(0,ne.jsx)(ci,{children:"Our team is here to help you get started with PurpleHere POS"})]}),(0,ne.jsx)(ui,{children:(0,ne.jsxs)(pi,{children:[(0,ne.jsxs)(hi,{children:[(0,ne.jsx)(mi,{children:"Send us a message"}),l?(0,ne.jsx)(zi,{children:"Thank you for your message! We'll get back to you within 24 hours."}):(0,ne.jsxs)(gi,{onSubmit:async e=>{e.preventDefault(),s(!0),u("");try{const e=await fetch("/api/public/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(e.ok)d(!0),i({name:"",email:"",phone:"",company_name:"",inquiry_type:"",interested_plan:"",preferred_username:"",message:""});else{const t=await e.json();u(t.error||"Failed to send message. Please try again.")}}catch(t){u("Network error. Please check your connection and try again.")}finally{s(!1)}},children:[c&&(0,ne.jsx)(Ri,{children:c}),(0,ne.jsxs)(fi,{children:[(0,ne.jsxs)(xi,{children:["Name",(0,ne.jsx)(yi,{children:"*"})]}),(0,ne.jsx)(bi,{type:"text",name:"name",value:o.name,onChange:m,required:!0,placeholder:"Your name"})]}),(0,ne.jsxs)(fi,{children:[(0,ne.jsxs)(xi,{children:["Email",(0,ne.jsx)(yi,{children:"*"})]}),(0,ne.jsx)(bi,{type:"email",name:"email",value:o.email,onChange:m,required:!0,placeholder:"your@email.com"})]}),(0,ne.jsxs)(fi,{children:[(0,ne.jsx)(xi,{children:"Phone"}),(0,ne.jsx)(bi,{type:"tel",name:"phone",value:o.phone,onChange:m,placeholder:"+60-XX-XXX-XXXX"})]}),(0,ne.jsxs)(fi,{children:[(0,ne.jsx)(xi,{children:"Company Name"}),(0,ne.jsx)(bi,{type:"text",name:"company_name",value:o.company_name,onChange:m,placeholder:"Your company or restaurant name"})]}),(0,ne.jsxs)(fi,{children:[(0,ne.jsxs)(xi,{children:["Inquiry Type",(0,ne.jsx)(yi,{children:"*"})]}),(0,ne.jsxs)(vi,{name:"inquiry_type",value:o.inquiry_type,onChange:m,required:!0,children:[(0,ne.jsx)("option",{value:"",children:"Select inquiry type..."}),(0,ne.jsx)("option",{value:"free_trial",children:"Start Free Trial (7 days free)"}),(0,ne.jsx)("option",{value:"pricing",children:"Pricing Inquiry"}),(0,ne.jsx)("option",{value:"demo",children:"Request Demo"}),(0,ne.jsx)("option",{value:"support",children:"Technical Support"}),(0,ne.jsx)("option",{value:"partnership",children:"Partnership"}),(0,ne.jsx)("option",{value:"other",children:"Other"})]})]}),"free_trial"===o.inquiry_type&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(fi,{children:[(0,ne.jsxs)(xi,{children:["Interested Plan",(0,ne.jsx)(yi,{children:"*"})]}),(0,ne.jsxs)(vi,{name:"interested_plan",value:o.interested_plan,onChange:m,required:!0,children:[(0,ne.jsx)("option",{value:"",children:"Select a plan..."}),(0,ne.jsx)("option",{value:"restaurant_basic",children:"Restaurant - Basic"}),(0,ne.jsx)("option",{value:"restaurant_professional",children:"Restaurant - Professional"}),(0,ne.jsx)("option",{value:"restaurant_enterprise",children:"Restaurant - Enterprise"}),(0,ne.jsx)("option",{value:"brand_basic",children:"Brand - Basic"}),(0,ne.jsx)("option",{value:"brand_professional",children:"Brand - Professional"}),(0,ne.jsx)("option",{value:"brand_enterprise",children:"Brand - Enterprise"}),(0,ne.jsx)("option",{value:"foodcourt_basic",children:"Foodcourt - Basic"}),(0,ne.jsx)("option",{value:"foodcourt_professional",children:"Foodcourt - Professional"}),(0,ne.jsx)("option",{value:"foodcourt_enterprise",children:"Foodcourt - Enterprise"})]})]}),(0,ne.jsxs)(fi,{children:[(0,ne.jsxs)(xi,{children:["Preferred Username",(0,ne.jsx)(yi,{children:"*"})]}),(0,ne.jsx)(bi,{type:"text",name:"preferred_username",value:o.preferred_username,onChange:m,required:!0,placeholder:"e.g., myrestaurant (letters, numbers, underscore only)",pattern:"^[a-zA-Z0-9_]+$"}),(0,ne.jsx)("small",{style:{color:"#6B7C93",fontSize:"12px"},children:"This will be your login ID. Only letters, numbers, and underscores allowed."})]})]}),o.inquiry_type&&"free_trial"!==o.inquiry_type&&(0,ne.jsxs)(fi,{children:[(0,ne.jsx)(xi,{children:"Interested Plan"}),(0,ne.jsxs)(vi,{name:"interested_plan",value:o.interested_plan,onChange:m,children:[(0,ne.jsx)("option",{value:"",children:"Select a plan..."}),(0,ne.jsx)("option",{value:"restaurant_basic",children:"Restaurant - Basic"}),(0,ne.jsx)("option",{value:"restaurant_professional",children:"Restaurant - Professional"}),(0,ne.jsx)("option",{value:"restaurant_enterprise",children:"Restaurant - Enterprise"}),(0,ne.jsx)("option",{value:"brand_basic",children:"Brand - Basic"}),(0,ne.jsx)("option",{value:"brand_professional",children:"Brand - Professional"}),(0,ne.jsx)("option",{value:"brand_enterprise",children:"Brand - Enterprise"}),(0,ne.jsx)("option",{value:"foodcourt_basic",children:"Foodcourt - Basic"}),(0,ne.jsx)("option",{value:"foodcourt_professional",children:"Foodcourt - Professional"}),(0,ne.jsx)("option",{value:"foodcourt_enterprise",children:"Foodcourt - Enterprise"}),(0,ne.jsx)("option",{value:"other",children:"Other / Not sure yet"})]})]}),(0,ne.jsxs)(fi,{children:[(0,ne.jsxs)(xi,{children:["Message",(0,ne.jsx)(yi,{children:"*"})]}),(0,ne.jsx)(wi,{name:"message",value:o.message,onChange:m,required:!0,placeholder:"Tell us about your business needs..."})]}),(0,ne.jsx)(ji,{type:"submit",disabled:a,children:a?"Sending...":"Send Message"})]})]}),(0,ne.jsxs)(ki,{children:[(0,ne.jsxs)(Si,{children:[(0,ne.jsx)(Ai,{children:"Contact Information"}),p?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Ci,{children:[(0,ne.jsx)(Fi,{children:"@"}),(0,ne.jsxs)(_i,{children:[(0,ne.jsx)(Ei,{children:"Email"}),(0,ne.jsx)(Pi,{children:(0,ne.jsx)(Bi,{href:`mailto:${p.email}`,children:p.email})})]})]}),(0,ne.jsxs)(Ci,{children:[(0,ne.jsx)(Fi,{children:"#"}),(0,ne.jsxs)(_i,{children:[(0,ne.jsx)(Ei,{children:"Phone"}),(0,ne.jsx)(Pi,{children:(0,ne.jsx)(Bi,{href:`tel:${p.phone.replace(/[^+\d]/g,"")}`,children:p.phone})})]})]}),(0,ne.jsxs)(Ci,{children:[(0,ne.jsx)(Fi,{children:"W"}),(0,ne.jsxs)(_i,{children:[(0,ne.jsx)(Ei,{children:"WhatsApp"}),(0,ne.jsx)(Pi,{children:(0,ne.jsx)(Bi,{href:`https://wa.me/${p.whatsapp.replace(/[^+\d]/g,"")}`,target:"_blank",rel:"noopener noreferrer",children:p.whatsapp})})]})]})]}):(0,ne.jsx)(Pi,{style:{color:"#9CA3AF"},children:"Loading..."})]}),(0,ne.jsxs)(Si,{children:[(0,ne.jsx)(Ai,{children:"Business Hours"}),p?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Ci,{children:[(0,ne.jsx)(Fi,{children:"~"}),(0,ne.jsxs)(_i,{children:[(0,ne.jsx)(Ei,{children:"Monday - Friday"}),(0,ne.jsx)(Pi,{children:(null===(t=p.business_hours)||void 0===t?void 0:t.weekdays)||"N/A"})]})]}),(0,ne.jsxs)(Ci,{children:[(0,ne.jsx)(Fi,{children:"~"}),(0,ne.jsxs)(_i,{children:[(0,ne.jsx)(Ei,{children:"Saturday - Sunday"}),(0,ne.jsx)(Pi,{children:(null===(n=p.business_hours)||void 0===n?void 0:n.weekend)||"N/A"})]})]})]}):(0,ne.jsx)(Pi,{style:{color:"#9CA3AF"},children:"Loading..."})]}),(0,ne.jsxs)(Si,{children:[(0,ne.jsx)(Ai,{children:"Free Trial"}),(0,ne.jsxs)("p",{style:{fontSize:"14px",color:"#6B7C93",lineHeight:"1.6",marginBottom:"12px"},children:["Try PurpleHere POS free for ",(0,ne.jsx)("strong",{style:{color:"#635BFF"},children:"7 days"})," with full access to all features. No credit card required."]}),(0,ne.jsxs)("ul",{style:{fontSize:"14px",color:"#6B7C93",lineHeight:"1.8",margin:0,paddingLeft:"20px"},children:[(0,ne.jsx)("li",{children:"Full feature access"}),(0,ne.jsx)("li",{children:"Dedicated onboarding support"}),(0,ne.jsx)("li",{children:"No commitment, cancel anytime"})]})]}),(0,ne.jsxs)(Si,{children:[(0,ne.jsx)(Ai,{children:"Response Time"}),(0,ne.jsx)("p",{style:{fontSize:"14px",color:"#6B7C93",lineHeight:"1.6"},children:"We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly."})]})]})]})})]})]})},Oi=Z.Ay.div`
  background: #FAFBFC;
`,Ii=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,$i=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,Mi=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,Di=Z.Ay.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
`,Ni=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Li=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  min-height: 500px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`,qi=Z.Ay.div`
  font-size: 48px;
  margin-bottom: 20px;
`,Hi=Z.Ay.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`,Wi=Z.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.6;
  margin-bottom: 24px;
`,Ui=Z.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  flex: 1;
`,Gi=Z.Ay.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;

  &::before {
    content: '~';
    color: #10B981;
    font-weight: bold;
  }
`,Yi=Z.Ay.button`
  width: 100%;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.isLoading?"#5A51E6":"#635BFF"};
  color: white;
  border: none;
  margin-top: auto;
  position: relative;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
    opacity: 0.6;
  }
`,Vi=Z.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 12px;
  padding: 20px;
  margin-top: 40px;
  text-align: center;
`,Qi=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
`,Ki=Z.Ay.p`
  font-size: 14px;
  color: #78350F;
  margin: 0;
`,Ji=Z.Ay.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
`,Xi=Z.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`,Zi=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
`,ea=Z.Ay.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`,ta=Z.Ay.div`
  background: #FEE2E2;
  color: #991B1B;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`,na={brand_general:{email:"demo-brand@purplehere.com",password:"Demo@2024",role:"Brand General",icon:"#",description:"Manage multiple brands and restaurants from a single dashboard",features:["Multi-brand dashboard","Restaurant management","Centralized inventory","Performance reports","Staff management"]},restaurant_admin:{email:"demo-restaurant@purplehere.com",password:"Demo@2024",role:"Restaurant Admin",icon:"%",description:"Full restaurant management experience with all features",features:["POS Terminal","Kitchen Display","Menu Management","Reports & Analytics","Customer Management"]}},ra=()=>{const t=(0,X.Zp)(),{login:n}=(0,ce.As)(),[r,o]=(0,e.useState)(null),[i,a]=(0,e.useState)(""),s=async e=>{o(e),a("");const r=na[e];try{const o=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r.email,password:r.password})}),l=await o.json();if(o.ok&&l.success&&l.data&&l.data.token)if(localStorage.setItem("auth_token",l.data.token),localStorage.setItem("user",JSON.stringify(l.data.user)),await n(r.email,r.password),"brand_general"===e)t("/pos/brand/general/dashboard");else{var i,s;const e=(null===(i=l.data.user)||void 0===i?void 0:i.restaurant_id)||(null===(s=l.data.user)||void 0===s?void 0:s.restaurantId);t(`/restaurant/${e}/dashboard`)}else a(l.message||l.error||"Demo account login failed. Please contact support.")}catch(l){a("Network error. Please try again.")}finally{o(null)}};return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Try Demo - Experience PurpleHere POS",description:"Try PurpleHere POS system live with our interactive demo. Explore features for restaurants, brands, and food courts - no signup required.",keywords:"POS demo, try POS system, restaurant POS demo, free POS trial",canonicalUrl:"https://purplehere.com/demo"}),(0,ne.jsxs)(Oi,{children:[(0,ne.jsxs)(Ii,{children:[(0,ne.jsx)($i,{children:"Try PurpleHere POS"}),(0,ne.jsx)(Mi,{children:"Experience our system with demo accounts. No signup required."})]}),(0,ne.jsxs)(Di,{children:[i&&(0,ne.jsx)(ta,{children:i}),(0,ne.jsxs)(Ni,{children:[(0,ne.jsxs)(Li,{children:[(0,ne.jsx)(qi,{children:na.brand_general.icon}),(0,ne.jsx)(Hi,{children:"Brand General"}),(0,ne.jsx)(Wi,{children:na.brand_general.description}),(0,ne.jsx)(Ui,{children:na.brand_general.features.map((e,t)=>(0,ne.jsx)(Gi,{children:e},t))}),(0,ne.jsx)(Yi,{onClick:()=>s("brand_general"),disabled:"brand_general"===r,isLoading:"brand_general"===r,children:"brand_general"===r?"Logging in...":"Login as Brand General"})]}),(0,ne.jsxs)(Li,{children:[(0,ne.jsx)(qi,{children:na.restaurant_admin.icon}),(0,ne.jsx)(Hi,{children:"Restaurant Admin"}),(0,ne.jsx)(Wi,{children:na.restaurant_admin.description}),(0,ne.jsx)(Ui,{children:na.restaurant_admin.features.map((e,t)=>(0,ne.jsx)(Gi,{children:e},t))}),(0,ne.jsx)(Yi,{onClick:()=>s("restaurant_admin"),disabled:"restaurant_admin"===r,isLoading:"restaurant_admin"===r,children:"restaurant_admin"===r?"Logging in...":"Login as Restaurant"})]})]}),(0,ne.jsxs)(Vi,{children:[(0,ne.jsx)(Qi,{children:"Demo Account Notice"}),(0,ne.jsx)(Ki,{children:"Demo accounts are reset daily at midnight (site timezone). Any changes you make will be restored to the default state."})]})]}),(0,ne.jsxs)(Ji,{children:[(0,ne.jsx)(Xi,{children:"Want your own account?"}),(0,ne.jsx)(Zi,{children:"Contact our sales team to set up your personalized account."}),(0,ne.jsx)(ea,{onClick:()=>t("/contact"),children:"Contact Us"})]})]})]})},oa={KR:"KRW",MY:"MYR",SG:"SGD",JP:"JPY",CN:"CNY",TW:"TWD",TH:"THB",VN:"VND",PH:"PHP",ID:"IDR",IN:"INR",AU:"AUD",GB:"GBP",DE:"EUR",FR:"EUR",IT:"EUR",ES:"EUR",NL:"EUR",US:"USD",CA:"CAD"},ia={"Restaurant Admin":{icon:()=>(0,ne.jsxs)("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M3 21h18"}),(0,ne.jsx)("path",{d:"M5 21V7l7-4 7 4v14"}),(0,ne.jsx)("path",{d:"M9 21v-4h6v4"}),(0,ne.jsx)("path",{d:"M9 10h1"}),(0,ne.jsx)("path",{d:"M14 10h1"}),(0,ne.jsx)("path",{d:"M9 14h1"}),(0,ne.jsx)("path",{d:"M14 14h1"})]}),title:"Restaurant",subtitle:"Manage a single restaurant with full POS features",planTarget:"restaurant"},"Brand General":{icon:()=>(0,ne.jsxs)("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"}),(0,ne.jsx)("path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"}),(0,ne.jsx)("path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"}),(0,ne.jsx)("path",{d:"M10 6h4"}),(0,ne.jsx)("path",{d:"M10 10h4"}),(0,ne.jsx)("path",{d:"M10 14h4"}),(0,ne.jsx)("path",{d:"M10 18h4"})]}),title:"Brand",subtitle:"Manage your brand and franchise restaurants",planTarget:"brand"},"Foodcourt General":{icon:()=>(0,ne.jsxs)("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M3 11l9-9 9 9"}),(0,ne.jsx)("path",{d:"M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"}),(0,ne.jsx)("path",{d:"M9 21v-6h6v6"}),(0,ne.jsx)("circle",{cx:"12",cy:"14",r:"1"})]}),title:"Food Court",subtitle:"Manage a food court and tenant restaurants",planTarget:"foodcourt"},"Restaurant Owner":{icon:()=>(0,ne.jsxs)("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,ne.jsx)("circle",{cx:"10",cy:"7",r:"4"}),(0,ne.jsx)("path",{d:"M19 8v6"}),(0,ne.jsx)("path",{d:"M22 11h-6"})]}),title:"Owner",subtitle:"Own and oversee multiple restaurants",planTarget:"owner"}},aa={role:"",full_name:"",email:"",username:"",password:"",confirm_password:"",phone:"",restaurant_name:"",restaurant_address:"",restaurant_phone:"",restaurant_email:"",brand_name:"",foodcourt_name:"",foodcourt_address:"",company_name:"",plan_id:null,billing_cycle:"monthly"},sa="signup_draft",la=Z.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,da=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,ca=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;
`,ua=Z.Ay.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`,pa=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 24px;
  }
`,ha=Z.Ay.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 36px;
  position: relative;
  padding: 0 20px;
`,ma=Z.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
`,ga=Z.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  background: ${e=>{let{active:t,current:n}=e;return n||t?"#635BFF":"#E6EBF1"}};
  color: ${e=>{let{active:t}=e;return t?"white":"#6B7C93"}};
`,fa=Z.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: ${e=>{let{active:t}=e;return t?"#0A2540":"#6B7C93"}};
`,xa=Z.Ay.div`
  position: absolute;
  top: 18px;
  left: 50px;
  right: 50px;
  height: 3px;
  background: #E6EBF1;
  z-index: 0;
`,ya=Z.Ay.div`
  height: 100%;
  background: #635BFF;
  transition: width 0.3s;
  border-radius: 2px;
`,ba=Z.Ay.div`
  margin-bottom: 32px;
`,va=Z.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 4px;
`,wa=Z.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 24px;
`,ja=Z.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,ka=Z.Ay.div`
  position: relative;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid ${e=>{let{selected:t}=e;return t?"#635BFF":"#E6EBF1"}};
  background: ${e=>{let{selected:t}=e;return t?"#F8F7FF":"white"}};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: ${e=>{let{selected:t}=e;return t?"#635BFF":"#CBD5E1"}};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,Sa=Z.Ay.div`
  margin-bottom: 12px;
  color: #635BFF;
  display: flex;
  justify-content: center;
`,Aa=Z.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 6px;
`,Ca=Z.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  line-height: 1.4;
`,Fa=Z.Ay.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`,_a=Z.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Ea=Z.Ay.div`
  grid-column: ${e=>{let{fullWidth:t}=e;return t?"1 / -1":"auto"}};
`,Pa=Z.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 6px;
`,Ba=Z.Ay.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${e=>{let{hasError:t}=e;return t?"#DC2626":"#E6EBF1"}};
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  transition: all 0.2s;
  background: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${e=>{let{hasError:t}=e;return t?"#DC2626":"#635BFF"}};
    box-shadow: 0 0 0 3px ${e=>{let{hasError:t}=e;return t?"rgba(220, 38, 38, 0.1)":"rgba(99, 91, 255, 0.1)"}};
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,za=Z.Ay.div`
  position: relative;
`,Ra=Z.Ay.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6B7C93;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #635BFF;
  }
`,Ta=Z.Ay.div`
  font-size: 12px;
  color: #DC2626;
  margin-top: 4px;
`,Oa=Z.Ay.div`
  padding: 14px 18px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  font-size: 13px;
  color: #4338CA;
  line-height: 1.5;
  margin: 16px 0;
`,Ia=Z.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 4px;
`,$a=Z.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 16px;
`,Ma=Z.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,Da=Z.Ay.select`
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Na=Z.Ay.div`
  display: flex;
  gap: 0;
  background: #F3F4F6;
  border-radius: 8px;
  padding: 3px;
  width: fit-content;
`,La=Z.Ay.button`
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${e=>{let{active:t}=e;return t?"white":"transparent"}};
  color: ${e=>{let{active:t}=e;return t?"#0A2540":"#6B7C93"}};
  box-shadow: ${e=>{let{active:t}=e;return t?"0 1px 3px rgba(0,0,0,0.1)":"none"}};
`,qa=Z.Ay.span`
  display: inline-block;
  font-size: 11px;
  background: #ECFDF5;
  color: #059669;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 6px;
`,Ha=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
`,Wa=Z.Ay.div`
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${e=>{let{selected:t}=e;return t?"#635BFF":"#E6EBF1"}};
  background: ${e=>{let{selected:t}=e;return t?"#F8F7FF":"white"}};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: ${e=>{let{selected:t}=e;return t?"#635BFF":"#CBD5E1"}};
  }
`,Ua=Z.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,Ga=Z.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #635BFF;
  margin-bottom: 4px;
`,Ya=Z.Ay.span`
  font-size: 13px;
  font-weight: 400;
  color: #6B7C93;
`,Va=Z.Ay.div`
  font-size: 11px;
  color: #059669;
  font-weight: 500;
  margin-bottom: 8px;
`,Qa=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Ka=Z.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,Ja=Z.Ay.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #635BFF;
`,Xa=Z.Ay.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,Za=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`,es=Z.Ay.div`
  font-size: 14px;
  color: #6B7C93;
`,ts=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${e=>{let{highlight:t}=e;return t?"#635BFF":"#0A2540"}};
`,ns=Z.Ay.div`
  height: 1px;
  background: #E6EBF1;
  margin: 4px 0;
`,rs=Z.Ay.div`
  margin-top: 20px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border: 1px solid #C7D2FE;
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #4338CA;
`,os=Z.Ay.div`
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  margin-bottom: 20px;
`,is=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,as=Z.Ay.div`
  flex: 1;
`,ss=Z.Ay.button`
  padding: 12px 24px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  color: #6B7C93;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #F8FAFC;
    border-color: #CBD5E1;
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,ls=Z.Ay.button`
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }
`,ds=Z.Ay.button`
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,cs=Z.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #6B7C93;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
    &:hover { text-decoration: underline; }
  }
`,us=()=>{const t=(0,X.Zp)(),n=(0,X.zy)(),r=(()=>{try{const e=sessionStorage.getItem(sa);if(!e)return null;const t=JSON.parse(e);return Date.now()-t.ts>18e5?(sessionStorage.removeItem(sa),null):t}catch{return null}})(),[o,i]=(0,e.useState)((null===r||void 0===r?void 0:r.step)||1),[a,s]=(0,e.useState)({...aa,...null===r||void 0===r?void 0:r.form}),[l,d]=(0,e.useState)([]),[c,u]=(0,e.useState)([]),[p,h]=(0,e.useState)((null===r||void 0===r?void 0:r.currency)||"USD"),[m,g]=(0,e.useState)(""),[f,x]=(0,e.useState)({}),[y,b]=(0,e.useState)(!1),[v,w]=(0,e.useState)(!1);(0,e.useEffect)(()=>{const e=n.state;if(null!==e&&void 0!==e&&e.plan_target){const t={restaurant:"Restaurant Admin",brand:"Brand General",foodcourt:"Foodcourt General",owner:"Restaurant Owner"};t[e.plan_target]&&(s(n=>({...n,role:t[e.plan_target]})),i(2))}},[n.state]),(0,e.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/public/plans");if(e.ok){const t=await e.json(),n=Array.isArray(t)?t:t.data||[];d(n.filter(e=>e.plan_target))}}catch(e){console.error("Failed to load plans:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const t=(await e.json()).data||[];if(u(t),null===r||void 0===r||!r.currency){const e=await(async()=>{try{var e;const t=await fetch("https://ipapi.co/json/",{signal:AbortSignal.timeout(3e3)});if(!t.ok)throw new Error("IP API failed");const n=null===(e=(await t.json()).country_code)||void 0===e?void 0:e.toUpperCase();return n&&oa[n]||"USD"}catch{try{var t;const e=(null===(t=(navigator.language||"en-US").split("-")[1])||void 0===t?void 0:t.toUpperCase())||"";return oa[e]||"USD"}catch{return"USD"}}})();t.some(t=>t.code===e)?h(e):t.length>0&&h(t[0].code)}}}catch{u([{code:"USD",symbol:"$",name:"US Dollar",decimals:2},{code:"MYR",symbol:"RM",name:"Malaysian Ringgit",decimals:2},{code:"KRW",symbol:"\u20a9",name:"Korean Won",decimals:0}])}})()},[]),(0,e.useEffect)(()=>{const e=n.state;null!==e&&void 0!==e&&e.plan_id&&l.length>0&&s(t=>({...t,plan_id:parseInt(e.plan_id)}))},[n.state,l]);const j=l.filter(e=>{var t;return!!a.role&&e.plan_target===(null===(t=ia[a.role])||void 0===t?void 0:t.planTarget)}),k=l.find(e=>e.id===a.plan_id);(0,e.useEffect)(()=>{((e,t,n)=>{try{const{password:r,confirm_password:o,...i}=e;sessionStorage.setItem(sa,JSON.stringify({form:i,step:t,currency:n,ts:Date.now()}))}catch{}})(a,o,p)},[a,o,p]);const S=(e,t)=>{s(n=>({...n,[e]:t})),f[e]&&x(t=>{const n={...t};return delete n[e],n})},A=(e,t)=>e.currency_prices&&e.currency_prices[p]?e.currency_prices[p][t]:0,C=(F=p,c.find(e=>e.code===F)||{code:F,symbol:F,name:F,decimals:2});var F;const _=e=>{const t=Number(e)||0;return 0===t?"Free":0===C.decimals?`${C.symbol} ${Math.round(t).toLocaleString()}`:`${C.symbol} ${t.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`},E=e=>{const t=Number(e)||0;return-1===t?"Unlimited":t.toLocaleString()};return(0,ne.jsxs)(er,{children:[(0,ne.jsxs)(J,{children:[(0,ne.jsx)("title",{children:"Sign Up - PurpleHere"}),(0,ne.jsx)("meta",{name:"description",content:"Create your PurpleHere POS account. Start with a 7-day free trial."})]}),(0,ne.jsxs)(la,{children:[(0,ne.jsx)(da,{children:"Create Your Account"}),(0,ne.jsx)(ca,{children:"Start your 7-day free trial today"})]}),(0,ne.jsx)(ua,{children:(0,ne.jsxs)(pa,{children:[(0,ne.jsxs)(ha,{children:[[1,2,3,4].map(e=>(0,ne.jsxs)(ma,{active:o>=e,current:o===e,children:[(0,ne.jsx)(ga,{active:o>=e,current:o===e,children:o>e?"\u2713":e}),(0,ne.jsx)(fa,{active:o>=e,children:1===e?"Type":2===e?"Account":3===e?"Business":"Review"})]},e)),(0,ne.jsx)(xa,{children:(0,ne.jsx)(ya,{style:{width:(o-1)/3*100+"%"}})})]}),m&&(0,ne.jsx)(os,{children:m}),1===o&&(0,ne.jsxs)(ba,{children:[(0,ne.jsx)(va,{children:"Choose your account type"}),(0,ne.jsx)(wa,{children:"Select the type that best describes your business"}),(0,ne.jsx)(ja,{children:Object.entries(ia).map(e=>{let[t,n]=e;return(0,ne.jsxs)(ka,{selected:a.role===t,onClick:()=>S("role",t),children:[(0,ne.jsx)(Sa,{children:(0,ne.jsx)(n.icon,{})}),(0,ne.jsx)(Aa,{children:n.title}),(0,ne.jsx)(Ca,{children:n.subtitle}),a.role===t&&(0,ne.jsx)(Fa,{children:"\u2713"})]},t)})})]}),2===o&&(0,ne.jsxs)(ba,{children:[(0,ne.jsx)(va,{children:"Account information"}),(0,ne.jsx)(wa,{children:"Create your login credentials"}),(0,ne.jsxs)(_a,{children:[(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Full Name *"}),(0,ne.jsx)(Ba,{type:"text",value:a.full_name,onChange:e=>S("full_name",e.target.value),placeholder:"Enter your full name",hasError:!!f.full_name}),f.full_name&&(0,ne.jsx)(Ta,{children:f.full_name})]}),(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Email *"}),(0,ne.jsx)(Ba,{type:"email",value:a.email,onChange:e=>S("email",e.target.value),placeholder:"you@example.com",hasError:!!f.email}),f.email&&(0,ne.jsx)(Ta,{children:f.email})]}),(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Username *"}),(0,ne.jsx)(Ba,{type:"text",value:a.username,onChange:e=>S("username",e.target.value),placeholder:"Choose a username",hasError:!!f.username}),f.username&&(0,ne.jsx)(Ta,{children:f.username})]}),(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Phone"}),(0,ne.jsx)(Ba,{type:"tel",value:a.phone,onChange:e=>S("phone",e.target.value),placeholder:"Optional"})]}),(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Password *"}),(0,ne.jsxs)(za,{children:[(0,ne.jsx)(Ba,{type:v?"text":"password",value:a.password,onChange:e=>S("password",e.target.value),placeholder:"Min 8 chars, upper, lower, number",hasError:!!f.password}),(0,ne.jsx)(Ra,{onClick:()=>w(!v),children:v?"Hide":"Show"})]}),f.password&&(0,ne.jsx)(Ta,{children:f.password})]}),(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Confirm Password *"}),(0,ne.jsx)(Ba,{type:v?"text":"password",value:a.confirm_password,onChange:e=>S("confirm_password",e.target.value),placeholder:"Re-enter your password",hasError:!!f.confirm_password}),f.confirm_password&&(0,ne.jsx)(Ta,{children:f.confirm_password})]})]})]}),3===o&&(()=>{var e;const t=a.role;return(0,ne.jsxs)(ba,{children:[(0,ne.jsx)(va,{children:"Business details"}),(0,ne.jsxs)(wa,{children:["Set up your ",(null===(e=ia[t])||void 0===e?void 0:e.title.toLowerCase())||"business"]}),"Restaurant Admin"===t&&(0,ne.jsxs)(_a,{children:[(0,ne.jsxs)(Ea,{fullWidth:!0,children:[(0,ne.jsx)(Pa,{children:"Restaurant Name *"}),(0,ne.jsx)(Ba,{type:"text",value:a.restaurant_name,onChange:e=>S("restaurant_name",e.target.value),placeholder:"Enter restaurant name",hasError:!!f.restaurant_name}),f.restaurant_name&&(0,ne.jsx)(Ta,{children:f.restaurant_name})]}),(0,ne.jsxs)(Ea,{fullWidth:!0,children:[(0,ne.jsx)(Pa,{children:"Address"}),(0,ne.jsx)(Ba,{type:"text",value:a.restaurant_address,onChange:e=>S("restaurant_address",e.target.value),placeholder:"Restaurant address (optional)"})]}),(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Restaurant Phone"}),(0,ne.jsx)(Ba,{type:"tel",value:a.restaurant_phone,onChange:e=>S("restaurant_phone",e.target.value),placeholder:"Restaurant phone number"})]}),(0,ne.jsxs)(Ea,{children:[(0,ne.jsx)(Pa,{children:"Restaurant Email"}),(0,ne.jsx)(Ba,{type:"email",value:a.restaurant_email,onChange:e=>S("restaurant_email",e.target.value),placeholder:"Restaurant contact email"})]})]}),"Brand General"===t&&(0,ne.jsx)(_a,{children:(0,ne.jsxs)(Ea,{fullWidth:!0,children:[(0,ne.jsx)(Pa,{children:"Brand Name *"}),(0,ne.jsx)(Ba,{type:"text",value:a.brand_name,onChange:e=>S("brand_name",e.target.value),placeholder:"Enter brand name",hasError:!!f.brand_name}),f.brand_name&&(0,ne.jsx)(Ta,{children:f.brand_name})]})}),"Foodcourt General"===t&&(0,ne.jsxs)(_a,{children:[(0,ne.jsxs)(Ea,{fullWidth:!0,children:[(0,ne.jsx)(Pa,{children:"Food Court Name *"}),(0,ne.jsx)(Ba,{type:"text",value:a.foodcourt_name,onChange:e=>S("foodcourt_name",e.target.value),placeholder:"Enter food court name",hasError:!!f.foodcourt_name}),f.foodcourt_name&&(0,ne.jsx)(Ta,{children:f.foodcourt_name})]}),(0,ne.jsxs)(Ea,{fullWidth:!0,children:[(0,ne.jsx)(Pa,{children:"Address"}),(0,ne.jsx)(Ba,{type:"text",value:a.foodcourt_address,onChange:e=>S("foodcourt_address",e.target.value),placeholder:"Food court address (optional)"})]})]}),"Restaurant Owner"===t&&(0,ne.jsx)(_a,{children:(0,ne.jsxs)(Ea,{fullWidth:!0,children:[(0,ne.jsx)(Pa,{children:"Company Name"}),(0,ne.jsx)(Ba,{type:"text",value:a.company_name,onChange:e=>S("company_name",e.target.value),placeholder:"Company name (optional)"})]})}),"Restaurant Admin"!==t&&(0,ne.jsx)(Oa,{children:"Restaurant Owner"===t?"Link your restaurants after signing up from the dashboard. Each restaurant will need its own POS subscription. Restaurants can also be linked to a brand or food court.":"You can add and manage restaurants after signing up. Each restaurant will need its own POS subscription."}),"Restaurant Admin"===t&&(0,ne.jsx)(Oa,{children:"Your restaurant can be linked to a brand or food court later from the admin dashboard."}),(0,ne.jsx)(Ia,{children:"Select a plan *"}),(0,ne.jsx)($a,{children:"All plans include a 7-day free trial. No payment required."}),f.plan_id&&(0,ne.jsx)(Ta,{style:{marginBottom:12},children:f.plan_id}),(0,ne.jsxs)(Ma,{children:[(0,ne.jsxs)(Na,{children:[(0,ne.jsx)(La,{active:"monthly"===a.billing_cycle,onClick:()=>S("billing_cycle","monthly"),children:"Monthly"}),(0,ne.jsx)(La,{active:"annual"===a.billing_cycle,onClick:()=>S("billing_cycle","annual"),children:"Annual"})]}),c.length>0&&(0,ne.jsx)(Da,{value:p,onChange:e=>h(e.target.value),children:c.map(e=>(0,ne.jsxs)("option",{value:e.code,children:[e.symbol," ",e.code]},e.code))})]}),(0,ne.jsx)(Ha,{children:j.map(e=>{const t=A(e,"monthly"),n=A(e,"annual"),r="annual"===a.billing_cycle?n:t,o=t>0?Math.round((12*t-n)/(12*t)*100):0;return(0,ne.jsxs)(Wa,{selected:a.plan_id===e.id,onClick:()=>S("plan_id",e.id),children:[(0,ne.jsx)(Ua,{children:e.display_name||e.name}),(0,ne.jsxs)(Ga,{children:[_(r),(0,ne.jsxs)(Ya,{children:["/","annual"===a.billing_cycle?"year":"month"]})]}),"annual"===a.billing_cycle&&o>0&&(0,ne.jsxs)(qa,{children:["Save ",o,"%"]}),"monthly"===a.billing_cycle&&n>0&&o>0&&(0,ne.jsxs)(Va,{children:[_(n),"/year (save ",o,"%)"]}),(0,ne.jsxs)(Qa,{children:["restaurant"===e.plan_target&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Ka,{children:["Staff: ",E(e.staff_limit)]}),(0,ne.jsxs)(Ka,{children:["Orders: ",E(e.order_limit)]}),(0,ne.jsxs)(Ka,{children:["Menu Items: ",E(e.menu_item_limit)]})]}),("brand"===e.plan_target||"foodcourt"===e.plan_target)&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(Ka,{children:["Restaurants: ",E(e.restaurant_limit)]}),(0,ne.jsxs)(Ka,{children:["Managers: ",E(e.manager_limit)]})]}),"owner"===e.plan_target&&(0,ne.jsxs)(Ka,{children:["Restaurants: ",E(e.restaurant_limit)]})]}),a.plan_id===e.id&&(0,ne.jsx)(Ja,{children:"Selected"})]},e.id)})})]})})(),4===o&&(()=>{var e;const t=a.role,n=k?A(k,"annual"===a.billing_cycle?"annual":"monthly"):0;return(0,ne.jsxs)(ba,{children:[(0,ne.jsx)(va,{children:"Review & confirm"}),(0,ne.jsx)(wa,{children:"Check your details before creating your account"}),(0,ne.jsxs)(Xa,{children:[(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Account Type"}),(0,ne.jsx)(ts,{children:null===(e=ia[t])||void 0===e?void 0:e.title})]}),(0,ne.jsx)(ns,{}),(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Full Name"}),(0,ne.jsx)(ts,{children:a.full_name})]}),(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Email"}),(0,ne.jsx)(ts,{children:a.email})]}),(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Username"}),(0,ne.jsx)(ts,{children:a.username})]}),(0,ne.jsx)(ns,{}),"Restaurant Admin"===t&&(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Restaurant"}),(0,ne.jsx)(ts,{children:a.restaurant_name})]}),"Brand General"===t&&(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Brand"}),(0,ne.jsx)(ts,{children:a.brand_name})]}),"Foodcourt General"===t&&(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Food Court"}),(0,ne.jsx)(ts,{children:a.foodcourt_name})]}),"Restaurant Owner"===t&&a.company_name&&(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Company"}),(0,ne.jsx)(ts,{children:a.company_name})]}),(0,ne.jsx)(ns,{}),(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Plan"}),(0,ne.jsx)(ts,{children:(null===k||void 0===k?void 0:k.display_name)||(null===k||void 0===k?void 0:k.name)})]}),(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Billing"}),(0,ne.jsx)(ts,{children:"annual"===a.billing_cycle?"Annual":"Monthly"})]}),(0,ne.jsxs)(Za,{children:[(0,ne.jsx)(es,{children:"Price"}),(0,ne.jsxs)(ts,{highlight:!0,children:[_(n),"/","annual"===a.billing_cycle?"year":"month"]})]})]}),(0,ne.jsx)(rs,{children:"7-day free trial included \u2014 no payment required now"})]})})(),(0,ne.jsxs)(is,{children:[o>1&&(0,ne.jsx)(ss,{onClick:()=>{g(""),x({}),i(e=>e-1)},disabled:y,children:"Back"}),(0,ne.jsx)(as,{}),o<4?(0,ne.jsx)(ls,{onClick:()=>{g(""),1!==o||a.role?(2!==o||(()=>{const e={};return a.full_name.trim()||(e.full_name="Full name is required"),a.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)||(e.email="Invalid email format"):e.email="Email is required",a.username.trim()?/^[a-zA-Z0-9_]{3,30}$/.test(a.username)||(e.username="3-30 characters, letters, numbers, underscore only"):e.username="Username is required",a.password?/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(a.password)||(e.password="Min 8 characters with uppercase, lowercase, and number"):e.password="Password is required",a.password!==a.confirm_password&&(e.confirm_password="Passwords do not match"),x(e),0===Object.keys(e).length})())&&(3!==o||(()=>{const e={},t=a.role;return"Restaurant Admin"!==t||a.restaurant_name.trim()||(e.restaurant_name="Restaurant name is required"),"Brand General"!==t||a.brand_name.trim()||(e.brand_name="Brand name is required"),"Foodcourt General"!==t||a.foodcourt_name.trim()||(e.foodcourt_name="Food court name is required"),a.plan_id||(e.plan_id="Please select a plan"),x(e),0===Object.keys(e).length})())&&i(e=>e+1):g("Please select an account type")},children:"Continue"}):(0,ne.jsx)(ds,{onClick:async()=>{b(!0),g("");try{var e;const n=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:a.role,full_name:a.full_name,email:a.email,username:a.username,password:a.password,phone:a.phone||void 0,restaurant_name:a.restaurant_name||void 0,restaurant_address:a.restaurant_address||void 0,restaurant_phone:a.restaurant_phone||void 0,restaurant_email:a.restaurant_email||void 0,brand_name:a.brand_name||void 0,foodcourt_name:a.foodcourt_name||void 0,foodcourt_address:a.foodcourt_address||void 0,company_name:a.company_name||void 0,plan_id:a.plan_id,billing_cycle:a.billing_cycle,currency:p})}),r=await n.json();if(!n.ok)throw new Error(r.message||"Signup failed");if(sessionStorage.removeItem(sa),null!==(e=r.data)&&void 0!==e&&e.token){localStorage.setItem("auth_token",r.data.token);const e=r.data.user;"Restaurant Admin"===e.role&&e.restaurant_id?t(`/restaurant/${e.restaurant_id}/dashboard`,{replace:!0}):"Brand General"===e.role?t("/pos/brand/general/dashboard",{replace:!0}):"Foodcourt General"===e.role?t("/pos/foodcourt/general/dashboard",{replace:!0}):"Restaurant Owner"===e.role?t("/pos/owner/dashboard",{replace:!0}):t("/pos",{replace:!0}),window.location.reload()}}catch(n){g(n.message||"Something went wrong. Please try again.")}finally{b(!1)}},disabled:y,children:y?"Creating Account...":"Create Account & Start Free Trial"})]}),(0,ne.jsxs)(cs,{children:["Already have an account? ",(0,ne.jsx)(X.N_,{to:"/pos",children:"Sign in"})]})]})})]})},ps=Z.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`,hs=Z.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  @media (max-width: 768px) { font-size: 26px; }
`,ms=Z.Ay.p`
  font-size: 15px;
  opacity: 0.9;
  margin: 6px 0 0;
`,gs=Z.Ay.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`,fs=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #E6EBF1;
  @media (max-width: 640px) { padding: 28px 24px; }
`,xs=Z.Ay.div`
  text-align: center;
  margin-bottom: 20px;
`,ys=Z.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px;
  text-align: center;
`,bs=Z.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0 0 24px;
  text-align: center;
`,vs=Z.Ay.div`
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  margin-bottom: 20px;
`,ws=Z.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,js=Z.Ay.div``,ks=Z.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 6px;
`,Ss=Z.Ay.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  color: #0A2540;
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,As=Z.Ay.button`
  padding: 13px 24px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,Cs=Z.Ay.div`
  text-align: center;
  margin-top: 20px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #6B7C93;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    &:hover { color: #635BFF; }
  }
`,Fs=Z.Ay.div`
  text-align: center;
`,_s=Z.Ay.div`
  margin-bottom: 16px;
`,Es=Z.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 12px;
`,Ps=Z.Ay.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0 0 8px;

  strong { color: #0A2540; }
`,Bs=Z.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  margin: 0 0 24px;
`,zs=Z.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`,Rs=Z.Ay.button`
  padding: 10px 20px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  color: #6B7C93;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #F8FAFC; border-color: #CBD5E1; }
`,Ts=(0,Z.Ay)(X.N_)`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  &:hover { background: #5A51E6; }
`,Os=()=>{const[t,n]=(0,e.useState)(""),[r,o]=(0,e.useState)(""),[i,a]=(0,e.useState)(!1),[s,l]=(0,e.useState)(!1);return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(J,{children:(0,ne.jsx)("title",{children:"Forgot Password - PurpleHere"})}),(0,ne.jsxs)(ps,{children:[(0,ne.jsx)(hs,{children:"Reset Your Password"}),(0,ne.jsx)(ms,{children:"We'll send you a link to reset your password"})]}),(0,ne.jsx)(gs,{children:(0,ne.jsx)(fs,{children:s?(0,ne.jsxs)(Fs,{children:[(0,ne.jsx)(_s,{children:(0,ne.jsxs)("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,ne.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),(0,ne.jsx)(Es,{children:"Check your email"}),(0,ne.jsxs)(Ps,{children:["If an account exists for ",(0,ne.jsx)("strong",{children:t}),", we've sent a password reset link. The link expires in 60 minutes."]}),(0,ne.jsx)(Bs,{children:"Didn't receive the email? Check your spam folder or try again."}),(0,ne.jsxs)(zs,{children:[(0,ne.jsx)(Rs,{onClick:()=>{l(!1),n("")},children:"Try another email"}),(0,ne.jsx)(Ts,{to:"/pos",children:"Back to Sign In"})]})]}):(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(xs,{children:(0,ne.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"#635BFF",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("rect",{x:"3",y:"5",width:"18",height:"14",rx:"2"}),(0,ne.jsx)("polyline",{points:"3 7 12 13 21 7"})]})}),(0,ne.jsx)(ys,{children:"Forgot your password?"}),(0,ne.jsx)(bs,{children:"Enter the email address associated with your account and we'll send you a link to reset your password."}),r&&(0,ne.jsx)(vs,{children:r}),(0,ne.jsxs)(ws,{onSubmit:async e=>{if(e.preventDefault(),o(""),t.trim()){a(!0);try{const e=await fetch("/api/auth/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t.trim()})}),n=await e.json();if(!e.ok)throw new Error(n.message||"Something went wrong");l(!0)}catch(n){o(n.message||"Something went wrong. Please try again.")}finally{a(!1)}}else o("Please enter your email address")},children:[(0,ne.jsxs)(js,{children:[(0,ne.jsx)(ks,{children:"Email address"}),(0,ne.jsx)(Ss,{type:"email",value:t,onChange:e=>n(e.target.value),placeholder:"you@example.com",autoFocus:!0})]}),(0,ne.jsx)(As,{type:"submit",disabled:i,children:i?"Sending...":"Send Reset Link"})]}),(0,ne.jsx)(Cs,{children:(0,ne.jsxs)(X.N_,{to:"/pos",children:[(0,ne.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,ne.jsx)("path",{d:"M15 18l-6-6 6-6"})}),"Back to Sign In"]})})]})})})]})},Is=Z.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`,$s=Z.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  @media (max-width: 768px) { font-size: 26px; }
`,Ms=Z.Ay.p`
  font-size: 15px;
  opacity: 0.9;
  margin: 6px 0 0;
`,Ds=Z.Ay.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`,Ns=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #E6EBF1;
  @media (max-width: 640px) { padding: 28px 24px; }
`,Ls=Z.Ay.div`
  text-align: center;
  margin-bottom: 20px;
`,qs=Z.Ay.div`
  text-align: center;
  margin-bottom: 16px;
`,Hs=Z.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px;
  text-align: center;
`,Ws=Z.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0 0 24px;
  text-align: center;
  strong { color: #0A2540; }
`,Us=Z.Ay.div`
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  margin-bottom: 20px;
`,Gs=Z.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Ys=Z.Ay.div``,Vs=Z.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 6px;
`,Qs=Z.Ay.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  color: #0A2540;
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,Ks=Z.Ay.div`
  position: relative;
`,Js=Z.Ay.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6B7C93;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  &:hover { color: #635BFF; }
`,Xs=Z.Ay.button`
  padding: 13px 24px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,Zs=Z.Ay.div`
  text-align: center;
  margin-top: 20px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #6B7C93;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    &:hover { color: #635BFF; }
  }
`,el=(0,Z.Ay)(X.N_)`
  display: inline-block;
  padding: 12px 32px;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  &:hover { background: #5A51E6; }
`,tl=Z.Ay.div`
  text-align: center;
`,nl=Z.Ay.div`
  margin-bottom: 16px;
`,rl=Z.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 12px;
`,ol=Z.Ay.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0 0 24px;
`,il=()=>{const[t]=(0,X.ok)(),n=t.get("token")||"",r=t.get("email")||"",[o,i]=(0,e.useState)(""),[a,s]=(0,e.useState)(""),[l,d]=(0,e.useState)(!1),[c,u]=(0,e.useState)(""),[p,h]=(0,e.useState)(!1),[m,g]=(0,e.useState)(!1);if(!n||!r)return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(J,{children:(0,ne.jsx)("title",{children:"Reset Password - PurpleHere"})}),(0,ne.jsx)(Is,{children:(0,ne.jsx)($s,{children:"Reset Your Password"})}),(0,ne.jsx)(Ds,{children:(0,ne.jsxs)(Ns,{children:[(0,ne.jsx)(qs,{children:(0,ne.jsxs)("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"#DC2626",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,ne.jsx)("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),(0,ne.jsx)("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),(0,ne.jsx)(Hs,{children:"Invalid Reset Link"}),(0,ne.jsx)(Ws,{children:"This password reset link is invalid or incomplete. Please request a new one."}),(0,ne.jsx)(el,{to:"/forgot-password",children:"Request New Reset Link"})]})})]});return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(J,{children:(0,ne.jsx)("title",{children:"Reset Password - PurpleHere"})}),(0,ne.jsxs)(Is,{children:[(0,ne.jsx)($s,{children:"Reset Your Password"}),(0,ne.jsx)(Ms,{children:"Create a new password for your account"})]}),(0,ne.jsx)(Ds,{children:(0,ne.jsx)(Ns,{children:m?(0,ne.jsxs)(tl,{children:[(0,ne.jsx)(nl,{children:(0,ne.jsxs)("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"#059669",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,ne.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),(0,ne.jsx)(rl,{children:"Password Reset Complete"}),(0,ne.jsx)(ol,{children:"Your password has been updated successfully. You can now sign in with your new password."}),(0,ne.jsx)(el,{to:"/pos",children:"Sign In"})]}):(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Ls,{children:(0,ne.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"#635BFF",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,ne.jsx)("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]})}),(0,ne.jsx)(Hs,{children:"Create new password"}),(0,ne.jsxs)(Ws,{children:["Enter a new password for ",(0,ne.jsx)("strong",{children:r})]}),c&&(0,ne.jsx)(Us,{children:c}),(0,ne.jsxs)(Gs,{onSubmit:async e=>{if(e.preventDefault(),u(""),o)if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(o))if(o===a){h(!0);try{const e=await fetch("/api/auth/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,token:n,password:o})}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to reset password");g(!0)}catch(t){u(t.message||"Something went wrong. Please try again.")}finally{h(!1)}}else u("Passwords do not match");else u("Password must be at least 8 characters with uppercase, lowercase, and number");else u("Please enter a new password")},children:[(0,ne.jsxs)(Ys,{children:[(0,ne.jsx)(Vs,{children:"New Password"}),(0,ne.jsxs)(Ks,{children:[(0,ne.jsx)(Qs,{type:l?"text":"password",value:o,onChange:e=>i(e.target.value),placeholder:"Min 8 chars, upper, lower, number",autoFocus:!0}),(0,ne.jsx)(Js,{type:"button",onClick:()=>d(!l),children:l?"Hide":"Show"})]})]}),(0,ne.jsxs)(Ys,{children:[(0,ne.jsx)(Vs,{children:"Confirm New Password"}),(0,ne.jsx)(Qs,{type:l?"text":"password",value:a,onChange:e=>s(e.target.value),placeholder:"Re-enter your new password"})]}),(0,ne.jsx)(Xs,{type:"submit",disabled:p,children:p?"Resetting...":"Reset Password"})]}),(0,ne.jsx)(Zs,{children:(0,ne.jsxs)(X.N_,{to:"/pos",children:[(0,ne.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,ne.jsx)("path",{d:"M15 18l-6-6 6-6"})}),"Back to Sign In"]})})]})})})]})},al=Z.Ay.div`
  background: #FAFBFC;
`,sl=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`,ll=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,dl=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,cl=Z.Ay.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,ul=Z.Ay.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`,pl=Z.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,hl=Z.Ay.p`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,ml=Z.Ay.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`,gl=Z.Ay.div`
  background: #F8F9FB;
  border-left: 4px solid #635BFF;
  padding: 16px 20px;
  margin: 20px 0;
  border-radius: 4px;
`,fl=Z.Ay.p`
  font-size: 15px;
  line-height: 1.7;
  color: #0A2540;
  margin: 0;
`,xl=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`,yl=Z.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  min-width: 60px;
`,bl=Z.Ay.a`
  font-size: 15px;
  color: #635BFF;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #5A51E6;
    text-decoration: underline;
  }
`,vl=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,wl=Z.Ay.div`
  background: #F8F9FB;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
`,jl=Z.Ay.h4`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 12px;
`,kl=Z.Ay.p`
  font-size: 14px;
  line-height: 1.6;
  color: #6B7C93;
  margin: 0;
`,Sl=()=>(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Company Information - GIT Consulting Sdn. Bhd.",description:"GIT Consulting Sdn. Bhd. operates PurpleHere, a cloud-based POS platform for restaurants, brands, and food courts based in Malaysia.",keywords:"GIT Consulting, PurpleHere company, Malaysia POS company, restaurant technology company",canonicalUrl:"https://purplehere.com/company"}),(0,ne.jsxs)(al,{children:[(0,ne.jsxs)(sl,{children:[(0,ne.jsx)(ll,{children:"About Our Company"}),(0,ne.jsx)(dl,{children:"Technology commercialization through expert consulting and operational support"})]}),(0,ne.jsxs)(cl,{children:[(0,ne.jsxs)(ul,{children:[(0,ne.jsx)(pl,{children:"Company Information"}),(0,ne.jsx)(ml,{children:"GIT CONSULTING SDN. BHD."}),(0,ne.jsx)(hl,{children:"An official corporation registered in Malaysia, providing technology commercialization through technical advice, consulting, and operational support services."}),(0,ne.jsxs)(gl,{children:[(0,ne.jsxs)(fl,{children:["P-02-06A, Tropicana Avenue, Persiaran Tropicana",(0,ne.jsx)("br",{}),"Tropicana Golf & Country Resort",(0,ne.jsx)("br",{}),"47410, Petaling Jaya, Selangor, Malaysia"]}),(0,ne.jsxs)(xl,{children:[(0,ne.jsx)(yl,{children:"Email:"}),(0,ne.jsx)(bl,{href:"mailto:help@gitconsulting.group",children:"help@gitconsulting.group"})]})]})]}),(0,ne.jsxs)(ul,{children:[(0,ne.jsx)(pl,{children:"Our Expertise"}),(0,ne.jsx)(hl,{children:"We bridge the gap between traditional business consulting and technical implementation. While general consulting firms often lack technical expertise and focus solely on management consulting, GIT combines deep technical knowledge with practical operational support to deliver comprehensive solutions."})]}),(0,ne.jsxs)(ul,{children:[(0,ne.jsx)(pl,{children:"Core Services"}),(0,ne.jsxs)(vl,{children:[(0,ne.jsxs)(wl,{children:[(0,ne.jsx)(jl,{children:"Consulting"}),(0,ne.jsx)(kl,{children:"IT consulting, startup guidance, management consulting, overseas expansion, and business modeling expertise"})]}),(0,ne.jsxs)(wl,{children:[(0,ne.jsx)(jl,{children:"Technical Support"}),(0,ne.jsx)(kl,{children:"Expert matching, continuous technical analysis, and high-quality reporting for technology projects"})]}),(0,ne.jsxs)(wl,{children:[(0,ne.jsx)(jl,{children:"Business Services"}),(0,ne.jsx)(kl,{children:"Branding, marketing, design, website development, and comprehensive startup support services"})]})]})]}),(0,ne.jsxs)(ul,{children:[(0,ne.jsx)(pl,{children:"Our Approach"}),(0,ne.jsx)(hl,{children:"We provide end-to-end support combining strategic consulting with hands-on technical implementation. Our team of experts delivers continuous technical analysis, expert matching, and operational support to help businesses succeed in technology-driven markets."})]})]})]})]}),Al=Z.Ay.div`
  background: #FAFBFC;
`,Cl=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`,Fl=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,_l=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,El=Z.Ay.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,Pl=Z.Ay.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`,Bl=Z.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,zl=Z.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;

  &:first-of-type {
    margin-top: 0;
  }
`,Rl=Z.Ay.p`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`,Tl=Z.Ay.ul`
  margin: 16px 0;
  padding-left: 24px;
`,Ol=Z.Ay.li`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`,Il=Z.Ay.p`
  font-size: 14px;
  color: #8898AA;
  margin-top: 8px;
`,$l=Z.Ay.div`
  background: #F8F9FB;
  border-left: 4px solid #635BFF;
  padding: 16px 20px;
  margin: 20px 0;
  border-radius: 4px;
`,Ml=Z.Ay.p`
  font-size: 15px;
  line-height: 1.7;
  color: #0A2540;
  margin: 0;
`,Dl=Z.Ay.a`
  color: #635BFF;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #5A51E6;
    text-decoration: underline;
  }
`,Nl=()=>(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Privacy Policy - PurpleHere",description:"PurpleHere's privacy policy. Learn how we collect, use, and protect your personal information.",keywords:"privacy policy, data protection, PurpleHere privacy",canonicalUrl:"https://purplehere.com/privacy"}),(0,ne.jsxs)(Al,{children:[(0,ne.jsxs)(Cl,{children:[(0,ne.jsx)(Fl,{children:"Privacy Policy"}),(0,ne.jsx)(_l,{children:"How we collect, use, and protect your personal information"})]}),(0,ne.jsxs)(El,{children:[(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Introduction"}),(0,ne.jsx)(Rl,{children:'GIT CONSULTING SDN. BHD. ("we", "us", "our", or "PurpleHere") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our PurpleHere POS system and related services.'}),(0,ne.jsx)(Rl,{children:"By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with this policy, please do not use our services."}),(0,ne.jsx)(Il,{children:"Last Updated: February 2026"})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Information We Collect"}),(0,ne.jsx)(zl,{children:"Personal Information"}),(0,ne.jsx)(Rl,{children:"We may collect personally identifiable information that you voluntarily provide to us, including:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsx)(Ol,{children:"Name, email address, and phone number"}),(0,ne.jsx)(Ol,{children:"Business name and address"}),(0,ne.jsx)(Ol,{children:"Payment and billing information"}),(0,ne.jsx)(Ol,{children:"Account credentials (username and password)"}),(0,ne.jsx)(Ol,{children:"Communication preferences"})]}),(0,ne.jsx)(zl,{children:"Business Data"}),(0,ne.jsx)(Rl,{children:"When you use our POS system, we collect business-related data including:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsx)(Ol,{children:"Transaction records and sales data"}),(0,ne.jsx)(Ol,{children:"Inventory and menu information"}),(0,ne.jsx)(Ol,{children:"Customer data you input into the system"}),(0,ne.jsx)(Ol,{children:"Staff information and access logs"}),(0,ne.jsx)(Ol,{children:"Reports and analytics data"})]}),(0,ne.jsx)(zl,{children:"Technical Information"}),(0,ne.jsx)(Rl,{children:"We automatically collect certain technical information when you use our services:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsx)(Ol,{children:"Device information (browser type, operating system)"}),(0,ne.jsx)(Ol,{children:"IP address and location data"}),(0,ne.jsx)(Ol,{children:"Usage patterns and feature interactions"}),(0,ne.jsx)(Ol,{children:"Error logs and diagnostic data"})]})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"How We Use Your Information"}),(0,ne.jsx)(Rl,{children:"We use the information we collect for the following purposes:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsx)(Ol,{children:"To provide, operate, and maintain our POS services"}),(0,ne.jsx)(Ol,{children:"To process transactions and manage your subscription"}),(0,ne.jsx)(Ol,{children:"To send you service-related communications and updates"}),(0,ne.jsx)(Ol,{children:"To provide customer support and respond to inquiries"}),(0,ne.jsx)(Ol,{children:"To improve our services and develop new features"}),(0,ne.jsx)(Ol,{children:"To detect, prevent, and address technical issues or fraud"}),(0,ne.jsx)(Ol,{children:"To comply with legal obligations"})]})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Data Sharing and Disclosure"}),(0,ne.jsx)(Rl,{children:"We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Service Providers:"})," With trusted third-party service providers who assist us in operating our services (e.g., payment processors, cloud hosting)"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Legal Requirements:"})," When required by law, court order, or government authority"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Business Transfers:"})," In connection with a merger, acquisition, or sale of assets"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Consent:"})," With your explicit consent for specific purposes"]})]})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Data Security"}),(0,ne.jsx)(Rl,{children:"We implement appropriate technical and organizational security measures to protect your personal information, including:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsx)(Ol,{children:"SSL/TLS encryption for data transmission"}),(0,ne.jsx)(Ol,{children:"Encrypted storage of sensitive data"}),(0,ne.jsx)(Ol,{children:"Regular security audits and vulnerability assessments"}),(0,ne.jsx)(Ol,{children:"Access controls and authentication mechanisms"}),(0,ne.jsx)(Ol,{children:"Employee training on data protection"})]}),(0,ne.jsx)(Rl,{children:"However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security."})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Data Retention"}),(0,ne.jsx)(Rl,{children:"We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. Specifically:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsx)(Ol,{children:"Account information: Retained while your account is active and for 5 years after termination"}),(0,ne.jsx)(Ol,{children:"Transaction records: Retained for 7 years for legal and accounting purposes"}),(0,ne.jsx)(Ol,{children:"Technical logs: Retained for up to 12 months"})]}),(0,ne.jsx)(Rl,{children:"You may request deletion of your data at any time, subject to our legal obligations to retain certain information."})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Your Rights"}),(0,ne.jsx)(Rl,{children:"Depending on your location, you may have the following rights regarding your personal data:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Access:"})," Request a copy of the personal data we hold about you"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Correction:"})," Request correction of inaccurate or incomplete data"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Deletion:"})," Request deletion of your personal data"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Portability:"})," Request transfer of your data to another service"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Objection:"})," Object to certain processing of your data"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Restriction:"})," Request restriction of processing in certain circumstances"]})]}),(0,ne.jsx)(Rl,{children:"To exercise these rights, please contact us using the information provided below."})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Cookies and Tracking"}),(0,ne.jsx)(Rl,{children:"We use cookies and similar tracking technologies to enhance your experience:"}),(0,ne.jsxs)(Tl,{children:[(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Essential Cookies:"})," Required for basic functionality and security"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Analytics Cookies:"})," Help us understand how users interact with our services"]}),(0,ne.jsxs)(Ol,{children:[(0,ne.jsx)("strong",{children:"Preference Cookies:"})," Remember your settings and preferences"]})]}),(0,ne.jsx)(Rl,{children:"You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect the functionality of our services."})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"International Data Transfers"}),(0,ne.jsx)(Rl,{children:"Our services are hosted in Malaysia. If you access our services from outside Malaysia, your information may be transferred to, stored, and processed in Malaysia or other countries where our service providers are located."}),(0,ne.jsx)(Rl,{children:"We ensure that any international transfers comply with applicable data protection laws and that appropriate safeguards are in place."})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Children's Privacy"}),(0,ne.jsx)(Rl,{children:"Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Changes to This Policy"}),(0,ne.jsx)(Rl,{children:'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.'}),(0,ne.jsx)(Rl,{children:"Continued use of our services after any changes constitutes acceptance of the updated policy."})]}),(0,ne.jsxs)(Pl,{children:[(0,ne.jsx)(Bl,{children:"Contact Us"}),(0,ne.jsx)(Rl,{children:"If you have any questions about this Privacy Policy or our data practices, please contact us:"}),(0,ne.jsx)($l,{children:(0,ne.jsxs)(Ml,{children:[(0,ne.jsx)("strong",{children:"GIT CONSULTING SDN. BHD."}),(0,ne.jsx)("br",{}),"P-02-06A, Tropicana Avenue, Persiaran Tropicana",(0,ne.jsx)("br",{}),"Tropicana Golf & Country Resort",(0,ne.jsx)("br",{}),"47410, Petaling Jaya, Selangor, Malaysia",(0,ne.jsx)("br",{}),(0,ne.jsx)("br",{}),"Email: ",(0,ne.jsx)(Dl,{href:"mailto:help@gitconsulting.group",children:"help@gitconsulting.group"}),(0,ne.jsx)("br",{}),"Website: ",(0,ne.jsx)(Dl,{href:"https://purplehere.com",children:"purplehere.com"})]})})]})]})]})]}),Ll=Z.Ay.div`
  background: #FAFBFC;
`,ql=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`,Hl=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,Wl=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,Ul=Z.Ay.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,Gl=Z.Ay.section`
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`,Yl=Z.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,Vl=Z.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;

  &:first-of-type {
    margin-top: 0;
  }
`,Ql=Z.Ay.p`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`,Kl=Z.Ay.ul`
  margin: 16px 0;
  padding-left: 24px;
`,Jl=Z.Ay.li`
  font-size: 16px;
  line-height: 1.8;
  color: #6B7C93;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`,Xl=Z.Ay.p`
  font-size: 14px;
  color: #8898AA;
  margin-top: 8px;
`,Zl=Z.Ay.div`
  background: #F8F9FB;
  border-left: 4px solid #635BFF;
  padding: 16px 20px;
  margin: 20px 0;
  border-radius: 4px;
`,ed=Z.Ay.p`
  font-size: 15px;
  line-height: 1.7;
  color: #0A2540;
  margin: 0;
`,td=Z.Ay.a`
  color: #635BFF;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #5A51E6;
    text-decoration: underline;
  }
`,nd=Z.Ay.div`
  background: #FFF8E1;
  border: 1px solid #FFE082;
  border-radius: 8px;
  padding: 16px 20px;
  margin: 20px 0;
`,rd=Z.Ay.p`
  font-size: 15px;
  line-height: 1.6;
  color: #5D4037;
  margin: 0;
`,od=Z.Ay.div`
  overflow-x: auto;
  margin: 20px 0;
`,id=Z.Ay.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`,ad=Z.Ay.th`
  background: #F8F9FB;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #0A2540;
  border-bottom: 2px solid #E6EBF1;
`,sd=Z.Ay.td`
  padding: 12px 16px;
  border-bottom: 1px solid #E6EBF1;
  color: #6B7C93;
`,ld=()=>(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Terms of Service - PurpleHere",description:"PurpleHere's terms of service. Read our terms for using the PurpleHere POS platform and subscription services.",keywords:"terms of service, PurpleHere terms, POS subscription terms",canonicalUrl:"https://purplehere.com/terms"}),(0,ne.jsxs)(Ll,{children:[(0,ne.jsxs)(ql,{children:[(0,ne.jsx)(Hl,{children:"Terms of Service"}),(0,ne.jsx)(Wl,{children:"Please read these terms carefully before using our services"})]}),(0,ne.jsxs)(Ul,{children:[(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"1. Agreement to Terms"}),(0,ne.jsx)(Ql,{children:'These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", "your") and GIT CONSULTING SDN. BHD. ("Company", "we", "us", "our") regarding your use of PurpleHere POS system and related services ("Services").'}),(0,ne.jsx)(Ql,{children:"By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use our Services."}),(0,ne.jsx)(Xl,{children:"Last Updated: February 2026"})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"2. Description of Services"}),(0,ne.jsx)(Ql,{children:"PurpleHere provides a cloud-based Point of Sale (POS) system designed for restaurants, food courts, and food service businesses. Our Services include:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsx)(Jl,{children:"Order management and processing"}),(0,ne.jsx)(Jl,{children:"Menu and inventory management"}),(0,ne.jsx)(Jl,{children:"Sales reporting and analytics"}),(0,ne.jsx)(Jl,{children:"Customer relationship management"}),(0,ne.jsx)(Jl,{children:"Staff management and scheduling"}),(0,ne.jsx)(Jl,{children:"Payment processing integration"}),(0,ne.jsx)(Jl,{children:"Mobile ordering capabilities"})]})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"3. Subscription Plans and Pricing"}),(0,ne.jsx)(Vl,{children:"3.1 Free Trial"}),(0,ne.jsx)(Ql,{children:"New users may be eligible for a 7-day free trial period. During the trial:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsx)(Jl,{children:"Full access to all features is provided"}),(0,ne.jsx)(Jl,{children:"No credit card is required to start the trial"}),(0,ne.jsx)(Jl,{children:"Trial period begins upon account activation"}),(0,ne.jsx)(Jl,{children:"Trial is available only for first-time registrations"})]}),(0,ne.jsx)(Vl,{children:"3.2 Paid Subscriptions"}),(0,ne.jsx)(Ql,{children:"After the trial period, continued use requires a paid subscription. Subscription plans vary by features and pricing. All prices are exclusive of applicable taxes unless otherwise stated."}),(0,ne.jsx)(Vl,{children:"3.3 Payment Terms"}),(0,ne.jsx)(Ql,{children:"Subscription fees are billed in advance on a monthly or annual basis, depending on your chosen plan. Payment is due on the billing date specified in your account."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"4. Payment and Billing Policy"}),(0,ne.jsx)(Vl,{children:"4.1 Payment Methods"}),(0,ne.jsx)(Ql,{children:"We accept payment via credit card, debit card, bank transfer, and other payment methods as specified in your account settings. You are responsible for keeping your payment information current."}),(0,ne.jsx)(Vl,{children:"4.2 Automatic Renewal"}),(0,ne.jsx)(Ql,{children:"Subscriptions automatically renew at the end of each billing period unless cancelled before the renewal date. You will be charged the then-current rate for your subscription plan."}),(0,ne.jsx)(Vl,{children:"4.3 Late Payment and Grace Period"}),(0,ne.jsx)(nd,{children:(0,ne.jsxs)(rd,{children:[(0,ne.jsx)("strong",{children:"Important:"})," If payment is not received by the due date, a 7-day grace period will apply. During this period, you will receive payment reminders and your account will remain fully functional. If payment is not received within the grace period, your account will be suspended."]})}),(0,ne.jsx)(od,{children:(0,ne.jsxs)(id,{children:[(0,ne.jsx)("thead",{children:(0,ne.jsxs)("tr",{children:[(0,ne.jsx)(ad,{children:"Status"}),(0,ne.jsx)(ad,{children:"Duration"}),(0,ne.jsx)(ad,{children:"Account Access"}),(0,ne.jsx)(ad,{children:"Action Required"})]})}),(0,ne.jsxs)("tbody",{children:[(0,ne.jsxs)("tr",{children:[(0,ne.jsx)(sd,{children:(0,ne.jsx)("strong",{children:"Active"})}),(0,ne.jsx)(sd,{children:"Payment up to date"}),(0,ne.jsx)(sd,{children:"Full access"}),(0,ne.jsx)(sd,{children:"None"})]}),(0,ne.jsxs)("tr",{children:[(0,ne.jsx)(sd,{children:(0,ne.jsx)("strong",{children:"Unpaid (Grace Period)"})}),(0,ne.jsx)(sd,{children:"7 days after due date"}),(0,ne.jsx)(sd,{children:"Full access with warnings"}),(0,ne.jsx)(sd,{children:"Complete payment"})]}),(0,ne.jsxs)("tr",{children:[(0,ne.jsx)(sd,{children:(0,ne.jsx)("strong",{children:"Suspended"})}),(0,ne.jsx)(sd,{children:"After grace period"}),(0,ne.jsx)(sd,{children:"Access blocked"}),(0,ne.jsx)(sd,{children:"Complete payment to restore"})]})]})]})}),(0,ne.jsx)(Vl,{children:"4.4 Account Suspension"}),(0,ne.jsx)(Ql,{children:"Suspended accounts cannot access POS features until payment is completed. Your data will be retained for 90 days after suspension. After 90 days, data may be permanently deleted."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"5. Refund Policy"}),(0,ne.jsx)(Vl,{children:"5.1 Subscription Refunds"}),(0,ne.jsx)(Ql,{children:"We offer refunds under the following conditions:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsxs)(Jl,{children:[(0,ne.jsx)("strong",{children:"Within 14 days of initial purchase:"})," Full refund if you are not satisfied with our Services. This applies only to first-time subscribers."]}),(0,ne.jsxs)(Jl,{children:[(0,ne.jsx)("strong",{children:"Service outage:"})," Pro-rated refund if our Services are unavailable for more than 24 consecutive hours due to issues on our end."]}),(0,ne.jsxs)(Jl,{children:[(0,ne.jsx)("strong",{children:"Duplicate charges:"})," Full refund for any erroneous duplicate billing."]})]}),(0,ne.jsx)(Vl,{children:"5.2 Non-Refundable Items"}),(0,ne.jsx)(Ql,{children:"The following are not eligible for refunds:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsx)(Jl,{children:"Subscription fees after the 14-day satisfaction guarantee period"}),(0,ne.jsx)(Jl,{children:"Partial month usage after cancellation"}),(0,ne.jsx)(Jl,{children:"Custom development or setup fees"}),(0,ne.jsx)(Jl,{children:"Third-party service fees (payment processor fees, etc.)"})]}),(0,ne.jsx)(Vl,{children:"5.3 Refund Process"}),(0,ne.jsx)(Ql,{children:"To request a refund, contact our support team at help@gitconsulting.group with your account details and reason for the request. Refunds are typically processed within 5-10 business days to the original payment method."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"6. Cancellation Policy"}),(0,ne.jsx)(Vl,{children:"6.1 How to Cancel"}),(0,ne.jsx)(Ql,{children:"You may cancel your subscription at any time through your account settings or by contacting our support team. Cancellation takes effect at the end of the current billing period."}),(0,ne.jsx)(Vl,{children:"6.2 Effect of Cancellation"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsx)(Jl,{children:"You retain access until the end of your paid billing period"}),(0,ne.jsx)(Jl,{children:"No refund for unused time in the current billing period"}),(0,ne.jsx)(Jl,{children:"Your data will be retained for 30 days after cancellation"}),(0,ne.jsx)(Jl,{children:"You may export your data before the retention period expires"})]}),(0,ne.jsx)(Vl,{children:"6.3 Reactivation"}),(0,ne.jsx)(Ql,{children:"If you wish to reactivate your account after cancellation, you may do so within 30 days with your data intact. After 30 days, you may still reactivate but your previous data may not be available."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"7. User Responsibilities"}),(0,ne.jsx)(Vl,{children:"7.1 Account Security"}),(0,ne.jsx)(Ql,{children:"You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsx)(Jl,{children:"Use strong, unique passwords"}),(0,ne.jsx)(Jl,{children:"Not share account credentials with unauthorized users"}),(0,ne.jsx)(Jl,{children:"Notify us immediately of any unauthorized access"}),(0,ne.jsx)(Jl,{children:"Log out from shared devices"})]}),(0,ne.jsx)(Vl,{children:"7.2 Acceptable Use"}),(0,ne.jsx)(Ql,{children:"You agree not to use our Services to:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsx)(Jl,{children:"Violate any applicable laws or regulations"}),(0,ne.jsx)(Jl,{children:"Infringe on intellectual property rights"}),(0,ne.jsx)(Jl,{children:"Transmit malware or malicious code"}),(0,ne.jsx)(Jl,{children:"Attempt to gain unauthorized access to our systems"}),(0,ne.jsx)(Jl,{children:"Interfere with or disrupt our Services"}),(0,ne.jsx)(Jl,{children:"Use automated tools to access our Services without permission"})]}),(0,ne.jsx)(Vl,{children:"7.3 Data Accuracy"}),(0,ne.jsx)(Ql,{children:"You are responsible for the accuracy and legality of the data you input into our system, including menu items, pricing, customer information, and staff records."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"8. Intellectual Property"}),(0,ne.jsx)(Vl,{children:"8.1 Our Intellectual Property"}),(0,ne.jsx)(Ql,{children:"PurpleHere, including its logo, software, design, and content, is owned by GIT CONSULTING SDN. BHD. and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our written permission."}),(0,ne.jsx)(Vl,{children:"8.2 Your Content"}),(0,ne.jsx)(Ql,{children:"You retain ownership of the data and content you upload to our Services. By using our Services, you grant us a limited license to use, store, and process your content solely for the purpose of providing our Services."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"9. Service Availability and Modifications"}),(0,ne.jsx)(Vl,{children:"9.1 Service Availability"}),(0,ne.jsx)(Ql,{children:"We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance when possible."}),(0,ne.jsx)(Vl,{children:"9.2 Service Modifications"}),(0,ne.jsx)(Ql,{children:"We reserve the right to modify, suspend, or discontinue any part of our Services at any time. We will provide reasonable notice for significant changes that affect your use of our Services."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"10. Limitation of Liability"}),(0,ne.jsx)(Ql,{children:"TO THE MAXIMUM EXTENT PERMITTED BY LAW:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsx)(Jl,{children:'Our Services are provided "AS IS" without warranties of any kind, express or implied'}),(0,ne.jsx)(Jl,{children:"We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services"}),(0,ne.jsx)(Jl,{children:"Our total liability shall not exceed the amount you paid for our Services in the 12 months preceding the claim"}),(0,ne.jsx)(Jl,{children:"We are not responsible for any loss of data, revenue, or business opportunities"})]})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"11. Indemnification"}),(0,ne.jsx)(Ql,{children:"You agree to indemnify, defend, and hold harmless GIT CONSULTING SDN. BHD. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our Services, violation of these Terms, or infringement of any third-party rights."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"12. Dispute Resolution"}),(0,ne.jsx)(Vl,{children:"12.1 Governing Law"}),(0,ne.jsx)(Ql,{children:"These Terms are governed by and construed in accordance with the laws of Malaysia, without regard to conflict of law principles."}),(0,ne.jsx)(Vl,{children:"12.2 Dispute Resolution Process"}),(0,ne.jsx)(Ql,{children:"Any disputes arising from these Terms or our Services shall be resolved through:"}),(0,ne.jsxs)(Kl,{children:[(0,ne.jsxs)(Jl,{children:[(0,ne.jsx)("strong",{children:"Step 1:"})," Good faith negotiation between the parties"]}),(0,ne.jsxs)(Jl,{children:[(0,ne.jsx)("strong",{children:"Step 2:"})," Mediation, if negotiation fails"]}),(0,ne.jsxs)(Jl,{children:[(0,ne.jsx)("strong",{children:"Step 3:"})," Binding arbitration in Kuala Lumpur, Malaysia"]})]})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"13. Changes to Terms"}),(0,ne.jsx)(Ql,{children:"We may update these Terms from time to time. We will notify you of material changes via email or through our Services at least 30 days before the changes take effect. Continued use of our Services after the effective date constitutes acceptance of the updated Terms."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"14. General Provisions"}),(0,ne.jsx)(Vl,{children:"14.1 Entire Agreement"}),(0,ne.jsx)(Ql,{children:"These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding our Services."}),(0,ne.jsx)(Vl,{children:"14.2 Severability"}),(0,ne.jsx)(Ql,{children:"If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect."}),(0,ne.jsx)(Vl,{children:"14.3 Waiver"}),(0,ne.jsx)(Ql,{children:"Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision."}),(0,ne.jsx)(Vl,{children:"14.4 Assignment"}),(0,ne.jsx)(Ql,{children:"You may not assign or transfer your rights under these Terms without our written consent. We may assign our rights and obligations without restriction."})]}),(0,ne.jsxs)(Gl,{children:[(0,ne.jsx)(Yl,{children:"15. Contact Information"}),(0,ne.jsx)(Ql,{children:"For questions about these Terms or our Services, please contact us:"}),(0,ne.jsx)(Zl,{children:(0,ne.jsxs)(ed,{children:[(0,ne.jsx)("strong",{children:"GIT CONSULTING SDN. BHD."}),(0,ne.jsx)("br",{}),"P-02-06A, Tropicana Avenue, Persiaran Tropicana",(0,ne.jsx)("br",{}),"Tropicana Golf & Country Resort",(0,ne.jsx)("br",{}),"47410, Petaling Jaya, Selangor, Malaysia",(0,ne.jsx)("br",{}),(0,ne.jsx)("br",{}),"Email: ",(0,ne.jsx)(td,{href:"mailto:help@gitconsulting.group",children:"help@gitconsulting.group"}),(0,ne.jsx)("br",{}),"Website: ",(0,ne.jsx)(td,{href:"https://purplehere.com",children:"purplehere.com"})]})})]})]})]})]});var dd=n(2853);const cd=Z.Ay.div`
  background: #FAFBFC;
`,ud=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,pd=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,hd=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,md=Z.Ay.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,gd=Z.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 48px;
`,fd=Z.Ay.button`
  padding: 12px 24px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#425466"};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #635BFF;
    ${e=>!e.active&&"background: #F8F9FF;"}
  }
`,xd=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,yd=Z.Ay.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`,bd=Z.Ay.button`
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`,vd=Z.Ay.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  flex: 1;
  line-height: 1.4;
`,wd=Z.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${e=>e.isOpen?"#635BFF":"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;

  svg {
    width: 16px;
    height: 16px;
    color: ${e=>e.isOpen?"white":"#6B7280"};
    transform: ${e=>e.isOpen?"rotate(180deg)":"rotate(0)"};
    transition: transform 0.3s;
  }
`,jd=Z.Ay.div`
  max-height: ${e=>e.isOpen?"800px":"0"};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`,kd=Z.Ay.div`
  padding: 0 24px;
  font-size: 15px;
  color: #425466;
  line-height: 1.7;

  p {
    margin: 0 0 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &::after {
    content: '';
    display: block;
    height: 24px;
  }
`,Sd=Z.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  background: #F3F4F6;
  color: #6B7280;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
`,Ad=Z.Ay.div`
  text-align: center;
  padding: 48px;
  background: linear-gradient(135deg, #635BFF 0%, #8B5CF6 100%);
  border-radius: 24px;
  margin-top: 48px;
  color: white;

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 12px;
  }

  p {
    font-size: 16px;
    opacity: 0.9;
    margin: 0 0 24px;
  }
`,Cd=Z.Ay.button`
  padding: 14px 32px;
  background: white;
  color: #635BFF;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`,Fd=Z.Ay.div`
  text-align: center;
  padding: 60px;
  color: #6B7280;
`,_d=()=>{const t=(0,X.Zp)(),[n,r]=(0,X.ok)(),[o,i]=(0,e.useState)([]),[a,s]=(0,e.useState)([]),[l,d]=(0,e.useState)(!0),[c,u]=(0,e.useState)("all"),[p,h]=(0,e.useState)(null);(0,e.useEffect)(()=>{m();const e=n.get("category");e&&u(e)},[]),(0,e.useEffect)(()=>{r("all"!==c?{category:c}:{})},[c]);const m=async()=>{try{const e=await fetch("/api/contents/public/faq");if(e.ok){const t=await e.json();i(t.categories||[]),s(t.items||[])}}catch(e){console.error("Error fetching FAQs:",e)}d(!1)},g="all"===c?a:a.filter(e=>{var t;return(null===(t=e.category)||void 0===t?void 0:t.slug)===c}),f=(0,e.useMemo)(()=>0===a.length?null:(e=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:e.map(e=>({"@type":"Question",name:e.question,acceptedAnswer:{"@type":"Answer",text:e.answer}}))}))(a.map(e=>({question:e.title,answer:e.content.replace(/<[^>]*>/g,"")}))),[a]),x=rr([{name:"Home",url:"https://purplehere.com"},{name:"FAQ",url:"https://purplehere.com/faq"}]);return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"FAQ - Frequently Asked Questions",description:"Find answers to common questions about PurpleHere POS system. Learn about pricing, features, free trial, setup, and support for restaurants, brands, and food courts.",keywords:"POS FAQ, restaurant POS questions, PurpleHere help, POS system support, free trial POS",canonicalUrl:"https://purplehere.com/faq",jsonLd:f?[f,x]:[x]}),(0,ne.jsxs)(cd,{children:[(0,ne.jsxs)(ud,{children:[(0,ne.jsx)(pd,{children:"Frequently Asked Questions"}),(0,ne.jsx)(hd,{children:"Find answers to common questions about PurpleHere POS system"})]}),(0,ne.jsxs)(md,{children:[(0,ne.jsxs)(gd,{children:[(0,ne.jsx)(fd,{active:"all"===c,onClick:()=>u("all"),children:"All"}),o.map(e=>(0,ne.jsx)(fd,{active:c===e.slug,onClick:()=>u(e.slug),children:e.name},e.id))]}),l?(0,ne.jsx)(Fd,{children:"Loading..."}):0===g.length?(0,ne.jsxs)(dd.pp,{children:[(0,ne.jsx)("h3",{children:"No FAQs found"}),(0,ne.jsx)("p",{children:"Check back later for updates"})]}):(0,ne.jsx)(xd,{children:g.map(e=>(0,ne.jsxs)(yd,{isOpen:p===e.id,children:[(0,ne.jsxs)(bd,{onClick:()=>{return t=e.id,void h(p===t?null:t);var t},children:[(0,ne.jsx)(vd,{children:e.title}),(0,ne.jsx)(wd,{isOpen:p===e.id,children:(0,ne.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})})]}),(0,ne.jsx)(jd,{isOpen:p===e.id,children:(0,ne.jsxs)(kd,{children:[e.category&&(0,ne.jsx)(Sd,{children:e.category.name}),(0,ne.jsx)("div",{dangerouslySetInnerHTML:{__html:e.content.replace(/\n/g,"<br/>")}})]})})]},e.id))}),(0,ne.jsxs)(Ad,{children:[(0,ne.jsx)("h3",{children:"Still have questions?"}),(0,ne.jsx)("p",{children:"Can't find the answer you're looking for? Our support team is here to help."}),(0,ne.jsx)(Cd,{onClick:()=>t("/contact"),children:"Contact Support"})]})]})]})]})},Ed=Z.Ay.div`
  background: #FAFBFC;
`,Pd=Z.Ay.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`,Bd=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,zd=Z.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,Rd=Z.Ay.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,Td=Z.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 48px;
`,Od=Z.Ay.button`
  padding: 12px 24px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#425466"};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #635BFF;
    ${e=>!e.active&&"background: #F8F9FF;"}
  }
`,Id=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,$d=Z.Ay.article`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`,Md=Z.Ay.div`
  width: 100%;
  height: 200px;
  background: ${e=>e.hasImage?"transparent":"linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #DEE2E6 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 48px;
  }
`,Dd=Z.Ay.div`
  padding: 24px;
`,Nd=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`,Ld=Z.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  background: #F0EFFF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,qd=Z.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,Hd=Z.Ay.h2`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,Wd=Z.Ay.p`
  font-size: 14px;
  color: #425466;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,Ud=Z.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  ${$d}:hover & svg {
    transform: translateX(4px);
  }
`,Gd=Z.Ay.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 48px;
`,Yd=Z.Ay.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#425466"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Vd=Z.Ay.div`
  text-align: center;
  padding: 60px;
  color: #6B7280;
  grid-column: 1 / -1;
`,Qd=()=>{const t=(0,X.Zp)(),[n,r]=(0,X.ok)(),[o,i]=(0,e.useState)([]),[a,s]=(0,e.useState)([]),[l,d]=(0,e.useState)(!0),[c,u]=(0,e.useState)("all"),[p,h]=(0,e.useState)({total:0,page:1,limit:12,totalPages:1});(0,e.useEffect)(()=>{const e=n.get("category"),t=n.get("page");e&&u(e),t&&h(e=>({...e,page:parseInt(t)}))},[]),(0,e.useEffect)(()=>{m()},[c,p.page]),(0,e.useEffect)(()=>{const e={};"all"!==c&&(e.category=c),p.page>1&&(e.page=p.page.toString()),r(e)},[c,p.page]);const m=async()=>{d(!0);try{const e="all"!==c?`&category=${c}`:"",t=await fetch(`/api/contents/public/blog?page=${p.page}&limit=${p.limit}${e}`);if(t.ok){const e=await t.json();i(e.categories||[]),s(e.items||[]),h(e.pagination||p)}}catch(e){console.error("Error fetching blog posts:",e)}d(!1)},g=(0,e.useMemo)(()=>0===a.length?null:{"@context":"https://schema.org","@type":"ItemList",itemListElement:a.map((e,t)=>({name:e.title,url:`https://purplehere.com/blog/${e.slug}`,position:t+1})).map(e=>({"@type":"ListItem",position:e.position,name:e.name,url:e.url}))},[a]),f=rr([{name:"Home",url:"https://purplehere.com"},{name:"Blog",url:"https://purplehere.com/blog"}]),x=e=>{u(e),h(e=>({...e,page:1}))};return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:"Blog - Restaurant Industry Insights & Tips",description:"Read the latest articles about restaurant management, POS technology, food industry trends, and business tips from PurpleHere.",keywords:"restaurant blog, POS tips, food industry trends, restaurant management tips",canonicalUrl:"https://purplehere.com/blog",jsonLd:g?[g,f]:[f]}),(0,ne.jsxs)(Ed,{children:[(0,ne.jsxs)(Pd,{children:[(0,ne.jsx)(Bd,{children:"Blog"}),(0,ne.jsx)(zd,{children:"Stay updated with the latest news and tips for PurpleHere POS"})]}),(0,ne.jsxs)(Rd,{children:[(0,ne.jsxs)(Td,{children:[(0,ne.jsx)(Od,{active:"all"===c,onClick:()=>x("all"),children:"All"}),o.map(e=>(0,ne.jsx)(Od,{active:c===e.slug,onClick:()=>x(e.slug),children:e.name},e.id))]}),(0,ne.jsx)(Id,{children:l?(0,ne.jsx)(Vd,{children:"Loading..."}):0===a.length?(0,ne.jsxs)(dd.pp,{children:[(0,ne.jsx)("h3",{children:"No posts found"}),(0,ne.jsx)("p",{children:"Check back later for new content"})]}):a.map(e=>{var n,r;return(0,ne.jsxs)($d,{onClick:()=>t(`/blog/${e.slug}`),children:[(0,ne.jsx)(Md,{hasImage:!!e.thumbnail_url,children:e.thumbnail_url?(0,ne.jsx)("img",{src:e.thumbnail_url,alt:e.title}):(0,ne.jsx)("span",{children:(null===(n=e.category)||void 0===n?void 0:n.icon)||"\ud83d\udcdd"})}),(0,ne.jsxs)(Dd,{children:[(0,ne.jsxs)(Nd,{children:[e.category&&(0,ne.jsx)(Ld,{children:e.category.name}),(0,ne.jsx)(qd,{children:(r=e.published_at,r?new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"")})]}),(0,ne.jsx)(Hd,{children:e.title}),(0,ne.jsxs)(Wd,{children:[e.excerpt||e.content.substring(0,150).replace(/<[^>]*>/g,""),"..."]}),(0,ne.jsxs)(Ud,{children:["Read more",(0,ne.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]},e.id)})}),p.totalPages>1&&(0,ne.jsxs)(Gd,{children:[(0,ne.jsx)(Yd,{onClick:()=>h(e=>({...e,page:e.page-1})),disabled:p.page<=1,children:"<"}),Array.from({length:p.totalPages},(e,t)=>t+1).map(e=>(0,ne.jsx)(Yd,{active:e===p.page,onClick:()=>h(t=>({...t,page:e})),children:e},e)),(0,ne.jsx)(Yd,{onClick:()=>h(e=>({...e,page:e.page+1})),disabled:p.page>=p.totalPages,children:">"})]})]})]})]})},Kd=Z.Ay.div`
  background: #FAFBFC;
`,Jd=Z.Ay.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px 60px;
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px 40px;
  }
`,Xd=Z.Ay.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    padding: 0 4px;
  }
`,Zd=Z.Ay.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  color: #425466;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,ec=Z.Ay.span`
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`,tc=Z.Ay.h1`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 0 20px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 26px;
    line-height: 1.4;
    margin-bottom: 0;
  }
`,nc=Z.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    margin-top: 20px;

    span {
      gap: 10px;
      font-size: 14px;
    }

    svg {
      width: 18px;
      height: 18px;
      opacity: 0.8;
    }
  }
`,rc=Z.Ay.div`
  max-width: 900px;
  margin: -30px auto 0;
  padding: 0 48px;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin-top: -20px;
  }
`,oc=Z.Ay.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`,ic=Z.Ay.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 48px 80px;

  @media (max-width: 768px) {
    padding: 32px 20px 60px;
  }
`,ac=Z.Ay.div`
  margin-bottom: 32px;
`,sc=Z.Ay.div`
  font-size: 17px;
  line-height: 1.8;
  color: #1F2937;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #0A2540;
    margin: 48px 0 24px;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: #0A2540;
    margin: 36px 0 16px;
  }

  p {
    margin: 0 0 24px;
  }

  ul, ol {
    margin: 0 0 24px;
    padding-left: 24px;

    li {
      margin-bottom: 12px;
    }
  }

  blockquote {
    margin: 32px 0;
    padding: 24px 32px;
    background: #F8F9FF;
    border-left: 4px solid #635BFF;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #425466;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 24px 0;
  }

  a {
    color: #635BFF;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  code {
    background: #F3F4F6;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 15px;
  }

  pre {
    background: #1F2937;
    color: #E5E7EB;
    padding: 24px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 24px 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }
`,lc=Z.Ay.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 48px 80px;

  @media (max-width: 768px) {
    padding: 0 20px 60px;
  }
`,dc=Z.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 24px;
  padding-top: 48px;
  border-top: 1px solid #E5E7EB;
`,cc=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,uc=Z.Ay.div`
  background: #F8F9FF;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F0EFFF;
    transform: translateY(-2px);
  }
`,pc=Z.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px;
  line-height: 1.4;
`,hc=Z.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,mc=Z.Ay.div`
  text-align: center;
  padding: 120px 20px;
  color: #6B7280;
`,gc=Z.Ay.div`
  text-align: center;
  padding: 120px 20px;

  h2 {
    font-size: 24px;
    color: #0A2540;
    margin: 0 0 12px;
  }

  p {
    color: #6B7280;
    margin: 0 0 24px;
  }
`,fc=()=>{const{slug:t}=(0,X.g)(),n=(0,X.Zp)(),[r,o]=(0,e.useState)(null),[i,a]=(0,e.useState)([]),[s,l]=(0,e.useState)(!0),[d,c]=(0,e.useState)(!1);(0,e.useEffect)(()=>{t&&u()},[t]);const u=async()=>{l(!0),c(!1);try{const e=await fetch(`/api/contents/public/blog/${t}`);if(e.ok){const t=await e.json();o(t.post),a(t.relatedPosts||[])}else 404===e.status&&c(!0)}catch(e){console.error("Error fetching post:",e),c(!0)}l(!1)},p=e=>e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"";if(s)return(0,ne.jsx)(er,{children:(0,ne.jsx)(Kd,{children:(0,ne.jsx)(mc,{children:"Loading..."})})});if(d||!r)return(0,ne.jsx)(er,{children:(0,ne.jsx)(Kd,{children:(0,ne.jsxs)(gc,{children:[(0,ne.jsx)("h2",{children:"Post not found"}),(0,ne.jsx)("p",{children:"The blog post you're looking for doesn't exist or has been removed."}),(0,ne.jsxs)(Zd,{onClick:()=>n("/blog"),style:{background:"#635BFF",border:"none"},children:[(0,ne.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),"Back to Blog"]})]})})});const h=e=>e?e.includes("@")?"PurpleHere Team":e:null,m=`https://purplehere.com/blog/${r.slug}`,g=(e=>{const t="undefined"!==typeof window?window.location.origin:"https://purplehere.com";return{"@context":"https://schema.org","@type":"Article",headline:e.title,description:e.description,url:e.url,image:e.image,author:{"@type":"Organization",name:e.author||"PurpleHere"},publisher:{"@type":"Organization",name:"PurpleHere",logo:{"@type":"ImageObject",url:`${t}/logo.png`}},datePublished:e.publishedTime,dateModified:e.modifiedTime||e.publishedTime}})({title:r.seo_title||r.title,description:r.seo_description||r.excerpt||r.ai_summary||"",url:m,image:r.og_image_url||r.thumbnail_url||void 0,author:h(r.author_name)||"PurpleHere",publishedTime:r.published_at||void 0}),f=rr([{name:"Home",url:"https://purplehere.com"},{name:"Blog",url:"https://purplehere.com/blog"},{name:r.title,url:m}]);return(0,ne.jsxs)(er,{children:[(0,ne.jsx)(ir,{title:r.seo_title||r.title,description:r.seo_description||r.excerpt||r.ai_summary||`Read ${r.title} on PurpleHere Blog`,keywords:r.seo_keywords||void 0,ogImage:r.og_image_url||r.thumbnail_url||void 0,ogType:"article",canonicalUrl:m,author:h(r.author_name)||"PurpleHere",publishedTime:r.published_at||void 0,jsonLd:[g,f]}),(0,ne.jsxs)(Kd,{children:[(0,ne.jsx)(Jd,{children:(0,ne.jsxs)(Xd,{children:[r.category&&(0,ne.jsx)(ec,{children:r.category.name}),(0,ne.jsx)(tc,{children:r.title}),(0,ne.jsxs)(nc,{children:[r.author_name&&(0,ne.jsxs)("span",{children:[(0,ne.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),h(r.author_name)]}),(0,ne.jsxs)("span",{children:[(0,ne.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})}),p(r.published_at)]}),(0,ne.jsxs)("span",{children:[(0,ne.jsxs)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]}),r.view_count," views"]})]})]})}),r.thumbnail_url&&(0,ne.jsx)(rc,{children:(0,ne.jsx)(oc,{children:(0,ne.jsx)("img",{src:r.thumbnail_url,alt:r.title})})}),(0,ne.jsxs)(ic,{children:[(0,ne.jsx)(ac,{children:(0,ne.jsxs)(Zd,{onClick:()=>n("/blog"),children:[(0,ne.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,ne.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),"Back to Blog"]})}),(0,ne.jsx)(sc,{dangerouslySetInnerHTML:{__html:r.content}})]}),i.length>0&&(0,ne.jsxs)(lc,{children:[(0,ne.jsx)(dc,{children:"Related Posts"}),(0,ne.jsx)(cc,{children:i.map(e=>(0,ne.jsxs)(uc,{onClick:()=>n(`/blog/${e.slug}`),children:[(0,ne.jsx)(pc,{children:e.title}),(0,ne.jsx)(hc,{children:p(e.published_at)})]},e.id))})]})]})]})},xc=[{role:"Brand General",email:"demo-brand@purplehere.com",password:"Demo@2024",description:"Manage multiple brands and restaurants from a single dashboard",color:"#059669"},{role:"Restaurant Admin",email:"demo-restaurant@purplehere.com",password:"Demo@2024",description:"Full restaurant management experience with all features",color:"#0891B2"}],yc=[{role:"Brand General",email:"brand_general@orderhere.center",password:"Test1234",description:"Brand General Manager (Multi-Brand Management)",color:"#DC2626"},{role:"Foodcourt General",email:"foodcourt_general@orderhere.center",password:"Test1234",description:"Foodcourt General Manager (Overall Foodcourt Management)",color:"#EA580C"},{role:"Restaurant Owner",email:"owner@purplehere.com",password:"Owner1234",description:"Restaurant Owner (Multi-Restaurant Financial Dashboard)",color:"#7C3AED"},{role:"Restaurant Admin",email:"admin@kdine.com",password:"Restaurant1",description:"K-DINE Restaurant Admin (300+ orders for testing)",color:"#0891B2"},{role:"Staff",email:"staff@kdine.com",password:"Staff1234",description:"Test Restaurant Updated - Staff (INACTIVE)",color:"#65A30D"}],bc=Z.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,vc=Z.Ay.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1200px;
  display: flex;
  overflow: hidden;
  
  @media (max-width: 968px) {
    flex-direction: column;
    max-width: 500px;
  }
`,wc=Z.Ay.div`
  flex: 1;
  padding: 60px;
  
  @media (max-width: 968px) {
    padding: 40px 30px;
  }
`,jc=Z.Ay.div`
  flex: 1;
  background: #F8FAFC;
  padding: 60px;
  border-left: 1px solid #E6EBF1;
  
  @media (max-width: 968px) {
    padding: 40px 30px;
    border-left: none;
    border-top: 1px solid #E6EBF1;
  }
`,kc=Z.Ay.img`
  max-width: 200px;
  max-height: 80px;
  object-fit: contain;
  object-position: left center;
  margin-bottom: 24px;
  display: block;
`,Sc=Z.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Ac=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Cc=Z.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,Fc=Z.Ay.input`
  padding: 14px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,_c=Z.Ay.div`
  position: relative;
  display: flex;
  align-items: center;
`,Ec=Z.Ay.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,Pc=Z.Ay.button`
  padding: 14px 24px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;
  
  &:hover {
    background: #5A51E6;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 91, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`,Bc=Z.Ay.div`
  background: #FEF2F2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #FEE2E2;
`,zc=Z.Ay.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;
`,Rc=Z.Ay.div`
  background: white;
  border: 2px solid #E6EBF1;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${e=>e.color};
  }
  
  &:hover {
    border-color: ${e=>e.color};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
  }
`,Tc=Z.Ay.div`
  font-size: 14px;
  font-weight: 700;
  color: ${e=>e.color};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Oc=Z.Ay.div`
  display: flex;
  gap: 20px;
  margin: 8px 0;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 4px;
  }
`,Ic=Z.Ay.div`
  font-size: 13px;
  color: #374151;
  
  strong {
    color: #0A2540;
    font-weight: 600;
  }
`,$c=Z.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,Mc=Z.Ay.div`
  width: 100%;
  height: 1px;
  background: #E6EBF1;
  margin: 30px 0;
`,Dc=Z.Ay.div`
  background: #EFF6FF;
  border: 1px solid #DBEAFE;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  color: #1E40AF;
  margin-bottom: 20px;

  strong {
    font-weight: 600;
  }
`,Nc=Z.Ay.div`
  margin-bottom: 30px;
`,Lc=Z.Ay.h3`
  font-size: 18px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '🎯';
    font-size: 20px;
  }
`,qc=Z.Ay.div`
  background: white;
  border: 2px solid ${e=>e.color};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${e=>e.color};
  }

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`,Hc=Z.Ay.button`
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  cursor: pointer;
  transition: all 0.2s;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border-color: #9CA3AF;
    background: #F9FAFB;
  }

  span {
    font-size: 10px;
    background: #F3F4F6;
    padding: 2px 8px;
    border-radius: 4px;
    color: #6B7280;
  }
`,Wc=Z.Ay.div`
  max-height: ${e=>e.show?"2000px":"0"};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  opacity: ${e=>e.show?"1":"0"};
  transition: opacity 0.3s ease-in-out, max-height 0.3s ease-in-out;
`,Uc=Z.Ay.div`
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  color: #6B7C93;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
    &:hover { text-decoration: underline; }
  }
`,Gc=(0,Z.Ay)(X.N_)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #9CA3AF !important;
  font-size: 13px;
  font-weight: 400 !important;

  &:hover {
    color: #6B7C93 !important;
    text-decoration: none !important;
  }

  svg {
    flex-shrink: 0;
  }
`,Yc=()=>{const t=(0,X.Zp)(),n=(0,X.zy)(),{login:r,user:o,isAuthenticated:i,isLoading:a}=(0,ce.As)(),[s,l]=(0,e.useState)(""),[d,c]=(0,e.useState)(""),[u,p]=(0,e.useState)(""),[h,m]=(0,e.useState)(!1),g="/uploads/logos/brand-logo.png",[f,x]=(0,e.useState)(!1),[y,b]=(0,e.useState)(!1);(0,e.useEffect)(()=>{if(!a&&i&&o){var e,r;const i=null===(e=n.state)||void 0===e||null===(r=e.from)||void 0===r?void 0:r.pathname;if(i&&"/pos"!==i)t(i,{replace:!0});else switch(o.role){case"System Admin":t("/pos/admin/dashboard",{replace:!0});break;case"Foodcourt General":t("/pos/foodcourt/general/dashboard",{replace:!0});break;case"Brand General":t("/pos/brand/general/dashboard",{replace:!0});break;case"Foodcourt Manager":t("/pos/foodcourt/dashboard",{replace:!0});break;case"Brand Manager":t("/pos/brand/dashboard",{replace:!0});break;case"Restaurant Admin":o.restaurantId?t(`/restaurant/${o.restaurantId}/dashboard`,{replace:!0}):t("/pos/restaurant/dashboard",{replace:!0});break;case"Restaurant Owner":t("/pos/owner/dashboard",{replace:!0});break;case"Staff":o.restaurantId?t(`/restaurant/${o.restaurantId}/dashboard`,{replace:!0}):t("/pos/basic",{replace:!0});break;default:t("/pos/basic",{replace:!0})}}},[a,i,o,t,n]);const v=e=>{l(e.email),c(e.password)};return(0,ne.jsx)(bc,{children:(0,ne.jsxs)(vc,{children:[(0,ne.jsxs)(wc,{children:[g&&(0,ne.jsx)(kc,{src:g,alt:"Brand Logo"}),(0,ne.jsxs)(Sc,{onSubmit:async e=>{e.preventDefault(),p(""),m(!0);try{await r(s,d)||p("Invalid email/username or password")}catch(u){console.error("Login error:",u),p("Login failed. Please try again.")}finally{m(!1)}},children:[(0,ne.jsxs)(Ac,{children:[(0,ne.jsx)(Cc,{children:"Email or Username"}),(0,ne.jsx)(Fc,{type:"text",value:s,onChange:e=>l(e.target.value),placeholder:"Enter your email or username",required:!0})]}),(0,ne.jsxs)(Ac,{children:[(0,ne.jsx)(Cc,{children:"Password"}),(0,ne.jsxs)(_c,{children:[(0,ne.jsx)(Fc,{type:f?"text":"password",value:d,onChange:e=>c(e.target.value),placeholder:"Enter your password",required:!0}),(0,ne.jsx)(Ec,{type:"button",onClick:()=>x(!f),tabIndex:-1,children:f?(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,ne.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,ne.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),u&&(0,ne.jsx)(Bc,{children:u}),(0,ne.jsx)(Pc,{type:"submit",disabled:h,children:h?"Signing in...":"Sign In"})]}),(0,ne.jsx)(Mc,{}),(0,ne.jsxs)(Uc,{children:[(0,ne.jsx)(X.N_,{to:"/forgot-password",className:"forgot-link",children:"Forgot your password?"}),(0,ne.jsxs)("span",{children:["Don't have an account? ",(0,ne.jsx)(X.N_,{to:"/signup",children:"Sign up"})]}),(0,ne.jsxs)(Gc,{to:"/",children:[(0,ne.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,ne.jsx)("path",{d:"M15 18l-6-6 6-6"})}),"Back to Home"]})]})]}),(0,ne.jsxs)(jc,{children:[(0,ne.jsx)(zc,{children:"Available Accounts"}),(0,ne.jsxs)(Dc,{children:[(0,ne.jsx)("strong",{children:"Quick Login:"})," Click any account card below to auto-fill credentials"]}),(0,ne.jsxs)(Nc,{children:[(0,ne.jsx)(Lc,{children:"Demo Accounts"}),xc.map(e=>(0,ne.jsxs)(qc,{color:e.color,onClick:()=>v(e),children:[(0,ne.jsx)(Tc,{color:e.color,children:e.role}),(0,ne.jsxs)(Oc,{children:[(0,ne.jsxs)(Ic,{children:[(0,ne.jsx)("strong",{children:"Email:"})," ",e.email]}),(0,ne.jsxs)(Ic,{children:[(0,ne.jsx)("strong",{children:"Pass:"})," ",e.password]})]}),(0,ne.jsx)($c,{children:e.description})]},e.email))]}),(0,ne.jsxs)(Hc,{onClick:()=>b(!y),children:[y?"\u25b2":"\u25bc"," ",(0,ne.jsx)("span",{children:"TEST"})," Test Accounts"]}),(0,ne.jsx)(Wc,{show:y,children:yc.map(e=>(0,ne.jsxs)(Rc,{color:e.color,onClick:()=>v(e),children:[(0,ne.jsx)(Tc,{color:e.color,children:e.role}),(0,ne.jsxs)(Oc,{children:[(0,ne.jsxs)(Ic,{children:[(0,ne.jsx)("strong",{children:"Email:"})," ",e.email]}),(0,ne.jsxs)(Ic,{children:[(0,ne.jsx)("strong",{children:"Pass:"})," ",e.password]})]}),(0,ne.jsx)($c,{children:e.description})]},e.email))}),(0,ne.jsx)(Mc,{}),(0,ne.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:[(0,ne.jsxs)("p",{children:[(0,ne.jsx)("strong",{children:"Note:"})," Using real database authentication."]}),(0,ne.jsx)("p",{children:"Demo accounts are reset daily at midnight (GMT+8)."})]})]})]})})},Vc=(0,e.createContext)(void 0),Qc=()=>{const t=(0,e.useContext)(Vc);if(!t)throw new Error("useMobileOrder must be used within MobileOrderProvider");return t},Kc=t=>{let{children:n}=t;const[r,o]=(0,e.useState)(null),[i,a]=(0,e.useState)(()=>sessionStorage.getItem("orderType")),s=(0,e.useCallback)(e=>{a(e),e?sessionStorage.setItem("orderType",e):sessionStorage.removeItem("orderType")},[]),[l,d]=(0,e.useState)(()=>{try{const e=localStorage.getItem("mobile_cart");return e?JSON.parse(e):[]}catch{return[]}}),c=(0,e.useCallback)(e=>{d(t=>{const n="function"===typeof e?e(t):e;return localStorage.setItem("mobile_cart",JSON.stringify(n)),n})},[]),[u,p]=(0,e.useState)(null),[h]=(0,e.useState)([]),[m,g]=(0,e.useState)(!1),[f,x]=(0,e.useState)(null),y=l.reduce((e,t)=>e+t.totalPrice,0),b={currentStore:r,setCurrentStore:o,orderType:i,setOrderType:s,cartItems:l,cartTotal:y,addToCart:(0,e.useCallback)((e,t,n,r)=>{let o=r||"";if(e.is_set_menu&&e.set_items&&e.set_items.length>0){const t=e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ");o=o?`[${t}] ${o}`:`[${t}]`}const i=`${e.id}-${n.join("-")}-${Date.now()}`;let a=e.price;const s=[],l=[];e.optionGroups&&n.forEach(t=>{var n;const r=null===(n=e.optionGroups)||void 0===n?void 0:n.flatMap(e=>e.options).find(e=>e.id===t);r&&(a+=r.price,s.push({id:r.id,name:r.name,price:r.price}),l.push(r.name))}),a*=t;const d={id:i,menuItem:e,quantity:t,selectedOptions:l,selectedOptionsData:s,specialInstructions:o,totalPrice:a};c(e=>[...e,d])},[]),updateCartItem:(0,e.useCallback)((e,t)=>{c(n=>n.map(n=>{if(n.id===e){const e=n.totalPrice/n.quantity;return{...n,quantity:t,totalPrice:e*t}}return n}))},[]),removeFromCart:(0,e.useCallback)(e=>{c(t=>t.filter(t=>t.id!==e))},[]),clearCart:(0,e.useCallback)(()=>{d([]),localStorage.removeItem("mobile_cart")},[]),currentOrder:u,setCurrentOrder:p,orderHistory:h,isLoading:m,setIsLoading:g,error:f,setError:x,currency:(null===r||void 0===r?void 0:r.currency)||"RM"};return(0,ne.jsx)(Vc.Provider,{value:b,children:n})};var Jc=n(6910);const Xc=Z.i7`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,Zc=Z.i7`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,eu=Z.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
  animation: ${Xc} 0.2s ease-out;
`,tu=Z.Ay.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  animation: ${Zc} 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`,nu=Z.Ay.div`
  padding: 24px 24px 16px;
  text-align: center;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"success":return"#F0FDF4";case"warning":return"#FFFBEB";default:return"#EFF6FF"}}};
`,ru=Z.Ay.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  background: ${e=>{switch(e.type){case"error":return"#FEE2E2";case"success":return"#DCFCE7";case"warning":return"#FEF3C7";default:return"#DBEAFE"}}};

  svg {
    width: 28px;
    height: 28px;
    color: ${e=>{switch(e.type){case"error":return"#DC2626";case"success":return"#16A34A";case"warning":return"#D97706";default:return"#2563EB"}}};
  }
`,ou=Z.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,iu=Z.Ay.div`
  padding: 16px 24px 24px;
  text-align: center;
`,au=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
`,su=Z.Ay.div`
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
`,lu=Z.Ay.button`
  flex: 1;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${e=>"secondary"===e.variant?"\n    background: #F3F4F6;\n    border: none;\n    color: #4B5563;\n\n    &:active {\n      background: #E5E7EB;\n    }\n  ":`\n    background: ${(()=>{switch(e.buttonType){case"error":return"#DC2626";case"success":return"#16A34A";case"warning":return"#D97706";default:return"#635BFF"}})()};\n    border: none;\n    color: white;\n\n    &:active {\n      opacity: 0.9;\n    }\n  `}
`,du=()=>(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,ne.jsx)("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),(0,ne.jsx)("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}),cu=()=>(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,ne.jsx)("path",{d:"M9 12l2 2 4-4"})]}),uu=()=>(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("path",{d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"}),(0,ne.jsx)("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),(0,ne.jsx)("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),pu=()=>(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,ne.jsx)("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),(0,ne.jsx)("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})]}),hu=e=>{let{isOpen:t,onClose:n,type:r="info",title:o,message:i,confirmText:a="OK",cancelText:s="Cancel",onConfirm:l,showCancel:d=!1}=e;if(!t)return null;return(0,ne.jsx)(eu,{onClick:n,children:(0,ne.jsxs)(tu,{onClick:e=>e.stopPropagation(),children:[(0,ne.jsxs)(nu,{type:r,children:[(0,ne.jsx)(ru,{type:r,children:(()=>{switch(r){case"error":return(0,ne.jsx)(du,{});case"success":return(0,ne.jsx)(cu,{});case"warning":return(0,ne.jsx)(uu,{});default:return(0,ne.jsx)(pu,{})}})()}),(0,ne.jsx)(ou,{children:o})]}),(0,ne.jsx)(iu,{children:(0,ne.jsx)(au,{children:i})}),(0,ne.jsxs)(su,{children:[d&&(0,ne.jsx)(lu,{variant:"secondary",onClick:n,children:s}),(0,ne.jsx)(lu,{buttonType:r,onClick:()=>{l&&l(),n()},children:a})]})]})})},mu=hu,gu=Z.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 24px 24px;
  box-sizing: border-box;

  /* Tablet support */
  @media (min-width: 768px) {
    background: #E5E7EB;
    padding: 80px 24px 24px;
  }
`,fu=Z.Ay.div`
  text-align: center;
  margin-bottom: 48px;
`,xu=Z.Ay.h1`
  font-size: 28px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,yu=Z.Ay.p`
  font-size: 15px;
  color: #6B7C93;
  margin: 0;
`,bu=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 500px;
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`,vu=Z.Ay.button`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`,wu=Z.Ay.div`
  font-size: 48px;
  margin-bottom: 4px;
`,ju=Z.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,ku=Z.Ay.div`
  margin-top: auto;
  padding-top: 48px;
  padding-bottom: 24px;
  text-align: center;
  font-size: 12px;
  color: #8898AA;
`,Su=()=>{const t=(0,X.Zp)(),{slug:n}=(0,X.g)(),[r]=(0,X.ok)(),{setCurrentStore:o,setIsLoading:i,clearCart:a,orderType:s,setOrderType:l,cartItems:d}=Qc(),[c,u]=(0,e.useState)(null),[p,h]=(0,e.useState)(null),[m,g]=(0,e.useState)(!1),[f,x]=(0,e.useState)(null);(0,e.useEffect)(()=>{(async()=>{if(n)try{const t=await fetch(`${Jc.JR}/api/mobile/store/${n}`);if(t.ok){const r=await t.json();var e;if(r.success&&r.data)console.log("Store data loaded:",r.data),h({id:(null===(e=r.data.id)||void 0===e?void 0:e.toString())||"1",slug:r.data.slug||n,name:r.data.name||"Restaurant",description:r.data.description||"Welcome to our restaurant",logo:r.data.logo||"/images/store-logo.png",isOpen:!1!==r.data.isOpen,openingHours:r.data.openingHours||{},openingTime:r.data.openingTime,closingTime:r.data.closingTime,timeZone:r.data.timeZone,orderTypes:r.data.orderTypes||{dineIn:!0,takeaway:!0,pickup:!1,delivery:!1}})}}catch(t){console.error("Error loading store data:",t)}})()},[n]);const y=e=>({"dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pre-order Pickup",delivery:"Delivery"}[e]||e),b=async e=>{if(console.log("Order type selected:",e),console.log("Previous order type:",s),console.log("Cart items count:",d.length),d.length>0&&s&&s!==e)return x(e),void g(!0);await v(e)},v=async e=>{i(!0);try{const r="guest_"+Date.now();localStorage.setItem("mobileToken",r);const i=n||sessionStorage.getItem("restaurantSlug");if(!i)throw new Error("Restaurant not found");const d=p||{id:"1",slug:i,name:"Restaurant",description:"Welcome to our restaurant",logo:"/images/store-logo.png",isOpen:!0,openingHours:{}};o(d),s&&s!==e&&(console.log("Order type changed - clearing cart"),a()),l(e),sessionStorage.setItem("restaurantId",d.id),sessionStorage.removeItem("scheduledPickupTime"),t(`/mobile/${i}/menu`)}catch(r){console.error("Error initializing order:",r),alert("Error initializing order. Please try again.")}finally{i(!1)}};(0,e.useEffect)(()=>{const e=r.get("table");if(e)u(e),sessionStorage.setItem("tableNumber",e);else{const e=sessionStorage.getItem("tableNumber");e&&u(e)}n&&sessionStorage.setItem("restaurantSlug",n)},[r,n]);const w=(null===p||void 0===p?void 0:p.orderTypes)||{dineIn:!0,takeaway:!0,pickup:!1,delivery:!1};return(0,ne.jsxs)(gu,{children:[(0,ne.jsxs)(fu,{children:[(0,ne.jsx)(xu,{children:(null===p||void 0===p?void 0:p.name)||"Welcome"}),(0,ne.jsx)(yu,{children:"How would you like your order?"})]}),c&&(0,ne.jsxs)("div",{style:{margin:"0 0 24px 0",padding:"12px 20px",background:"#F0F4FF",borderRadius:"8px",color:"#635BFF",fontSize:"14px",fontWeight:"500",textAlign:"center",border:"1px solid #C7D2FE"},children:["Table ",c]}),(0,ne.jsxs)(bu,{children:[w.dineIn&&(0,ne.jsxs)(vu,{onClick:()=>b("dine-in"),children:[(0,ne.jsx)(wu,{children:"\ud83c\udf7d\ufe0f"}),(0,ne.jsx)(ju,{children:"Dine In"})]}),w.takeaway&&(0,ne.jsxs)(vu,{onClick:()=>b("takeaway"),children:[(0,ne.jsx)(wu,{children:"\ud83e\udd61"}),(0,ne.jsx)(ju,{children:"Takeaway"})]}),w.pickup&&(0,ne.jsxs)(vu,{onClick:()=>b("pickup"),children:[(0,ne.jsx)(wu,{children:"\ud83d\udce6"}),(0,ne.jsx)(ju,{children:"Pre-order Pickup"})]}),w.delivery&&(0,ne.jsxs)(vu,{onClick:()=>b("delivery"),children:[(0,ne.jsx)(wu,{children:"\ud83d\ude9a"}),(0,ne.jsx)(ju,{children:"Delivery"})]})]}),(0,ne.jsx)(ku,{children:"Powered by Purple Here POS"}),(0,ne.jsx)(mu,{isOpen:m,onClose:()=>{if(g(!1),x(null),s){const e=n||sessionStorage.getItem("restaurantSlug");t(`/mobile/${e}/menu`)}},type:"warning",title:"Change Order Type?",message:`You are currently ordering as ${y(s||"")}. Changing to ${y(f||"")} will reset your cart.`,confirmText:"Continue",cancelText:"Back to Menu",onConfirm:async()=>{g(!1),f&&await v(f),x(null)},showCancel:!0})]})},Au=()=>{if(!/iPhone|iPad|iPod/.test(navigator.userAgent))return()=>{};const e=e=>{const t=e.target;"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName||setTimeout(()=>{window.scrollTo(0,window.scrollY)},100)};return document.addEventListener("focusout",e),()=>{document.removeEventListener("focusout",e)}},Cu=Z.Ay.div`
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  background: #F9FAFB;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: none; /* Prevent horizontal overscroll bounce */

  /* PWA safe area handling */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);

  /* Tablet support - center content */
  @media (min-width: 768px) {
    background: #E5E7EB;
  }
`,Fu=Z.Ay.header`
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 12px 16px;
  min-height: 64px; /* Fixed height to match back button height */
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 0 0 12px 12px;
  }
`,_u=Z.Ay.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s;

  &:active {
    background: #F3F4F6;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #374151;
  }
`,Eu=Z.Ay.h1`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
`,Pu=Z.Ay.div`
  width: 40px; /* Match back button width for centering */
  height: 40px; /* Match back button height */
`,Bu=Z.Ay.main`
  flex: 1;
  padding: 16px;
  padding-bottom: 80px; /* Space for bottom navigation */
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden; /* Prevent horizontal scroll in content */
  word-wrap: break-word; /* Prevent long words from causing overflow */

  /* Tablet support */
  @media (min-width: 768px) {
    background: #F9FAFB;
    padding: 24px;
    padding-bottom: 100px;
    border-radius: 12px;
    margin-top: 16px;
  }
`,zu=Z.Ay.nav`
  background: white;
  border-top: 1px solid #E5E7EB;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  z-index: 100;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
`,Ru=Z.Ay.button`
  background: none;
  border: none;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${e=>e.active?"#635BFF":"#9CA3AF"};
  transition: color 0.2s;
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  span {
    font-size: 12px;
    font-weight: 500;
  }
`,Tu=Z.Ay.div`
  position: absolute;
  top: -4px;
  right: 8px;
  background: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`,Ou=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>{switch(e.orderType){case"dine-in":return"#059669";case"takeaway":return"#D97706";case"delivery":return"#2563EB";case"pickup":return"#7C3AED";default:return"#6B7280"}}};
  white-space: nowrap;
`,Iu=t=>{let{children:n,title:r,showBack:o=!1,onBack:i,currentPage:a,cartItemCount:s=0}=t;const l=(0,X.Zp)(),{currentStore:d,orderType:c}=Qc();(0,e.useEffect)(()=>Au(),[]);const u=e=>{switch(e){case"dine-in":return"Dine-In";case"takeaway":return"Takeaway";case"delivery":return"Delivery";case"pickup":return"Pre-Order Pickup";default:return null}},p=(null===d||void 0===d?void 0:d.slug)||sessionStorage.getItem("restaurantSlug")||"default",h=sessionStorage.getItem("tableNumber"),m=e=>{l(e===`/mobile/${p}`&&h?`${e}?table=${h}`:e)};return(0,ne.jsxs)(Cu,{children:[r&&(0,ne.jsxs)(Fu,{children:[o?(0,ne.jsx)(_u,{onClick:i,children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M15 18L9 12L15 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}):(0,ne.jsx)(Pu,{}),(0,ne.jsx)(Eu,{children:r}),c&&"home"!==a&&u(c)?(0,ne.jsxs)(Ou,{orderType:c,children:[(0,ne.jsx)("span",{children:(e=>{switch(e){case"dine-in":return"\ud83c\udf7d\ufe0f";case"takeaway":return"\ud83d\udecd\ufe0f";case"delivery":return"\ud83d\ude9a";case"pickup":return"\u23f0";default:return""}})(c)}),(0,ne.jsx)("span",{children:u(c)})]}):(0,ne.jsx)(Pu,{})]}),(0,ne.jsx)(Bu,{children:n}),(0,ne.jsxs)(zu,{children:[(0,ne.jsxs)(Ru,{active:"home"===a,onClick:()=>m(`/mobile/${p}`),children:[(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,ne.jsx)("path",{d:"M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M9 22V12H15V22",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ne.jsx)("span",{children:"Home"})]}),(0,ne.jsxs)(Ru,{active:"menu"===a,onClick:()=>m(`/mobile/${p}/menu`),children:[(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M4 6H20M4 12H20M4 18H20",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),(0,ne.jsx)("span",{children:"Menu"})]}),(0,ne.jsxs)(Ru,{active:"cart"===a,style:{position:"relative"},onClick:()=>m(`/mobile/${p}/cart`),children:[(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,ne.jsx)("path",{d:"M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,ne.jsx)("path",{d:"M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,ne.jsx)("path",{d:"M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),s>0&&(0,ne.jsx)(Tu,{children:s}),(0,ne.jsx)("span",{children:"Cart"})]}),(0,ne.jsxs)(Ru,{active:"orders"===a,onClick:()=>m(`/mobile/${p}/account`),children:[(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,ne.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("circle",{cx:"12",cy:"7",r:"4",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ne.jsx)("span",{children:"Account"})]})]})]})},$u=Z.Ay.div`
  background: white;
  padding: 16px;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #E5E7EB;
  border-radius: 8px;
`,Mu=Z.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,Du=Z.Ay.div`
  font-size: 14px;
  color: ${e=>e.isOpen?"#10B981":"#EF4444"};
  font-weight: 500;
`,Nu=Z.Ay.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin: 0 0 16px 0;
  padding: 0;
  border-bottom: 1px solid #E5E7EB;

  &::-webkit-scrollbar {
    display: none;
  }
`,Lu=Z.Ay.button`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: ${e=>e.active?"#635BFF":"#6B7280"};
  border-bottom: 2px solid ${e=>e.active?"#635BFF":"transparent"};
  margin-bottom: -1px;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: ${e=>e.active?"#635BFF":"#374151"};
  }

  &:active {
    transform: none;
  }
`,qu=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
`,Hu=Z.Ay.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;

  &:active {
    transform: scale(0.98);
  }
`,Wu=Z.Ay.div`
  width: 100%;
  height: 120px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Uu=t=>{let{src:n,alt:r,fallback:o}=t;const[i,a]=(0,e.useState)(!1),[s,l]=(0,e.useState)(!1),d=(0,e.useRef)(null);return(0,e.useEffect)(()=>{const e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&d.current&&(d.current.src=n,e.disconnect())})},{rootMargin:"100px"});return d.current&&e.observe(d.current),()=>e.disconnect()},[n]),s?(0,ne.jsx)("span",{children:o}):(0,ne.jsx)("img",{ref:d,alt:r,style:{opacity:i?1:0,transition:"opacity 0.3s"},onLoad:()=>a(!0),onError:()=>l(!0)})},Gu=Z.Ay.div`
  padding: 12px;
`,Yu=Z.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
  line-height: 1.3;
`,Vu=Z.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,Qu=Z.Ay.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  z-index: 1;
`,Ku=Z.Ay.div`
  font-size: 11px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
`,Ju=Z.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #9CA3AF;
`,Xu=Z.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #9CA3AF;
  font-size: 14px;
`,Zu=Z.Ay.div`
  text-align: center;
  padding: 40px 0;
  color: #9CA3AF;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    font-size: 16px;
    margin: 0;
  }
`,ep=Z.Ay.button`
  position: fixed;
  bottom: 80px;
  right: 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 90;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
`,tp=Z.Ay.div`
  height: 20px;
  width: 100%;
`,np=()=>{const{slug:t}=(0,X.g)(),n=(0,X.Zp)(),{currentStore:r,setCurrentStore:o,cartItems:i,currency:a,isLoading:s,setIsLoading:l,setError:d}=Qc(),[c,u]=(0,e.useState)([]),[p,h]=(0,e.useState)([]),[m,g]=(0,e.useState)("all"),[f,x]=(0,e.useState)(null),[y,b]=(0,e.useState)(!1),v=(0,e.useRef)(null),w=(0,e.useRef)(null),j=(0,e.useCallback)(async function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(t){1===n?l(!0):b(!0);try{if(1===n){const e=await fetch(`/api/restaurants/slug/${t}`);if(e.ok){const t=await e.json();t.success&&t.data&&o({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo_url||"",isOpen:"active"===t.data.status,openingHours:t.data.opening_hours||{}})}}let i=`/api/mobile/menu/${t}?page=${n}&limit=20`;e&&"all"!==e&&(i+=`&categoryId=${e}`);const a=await fetch(i);if(a.ok){const e=await a.json();if(e.success&&e.data){1===n&&u(e.data.categories||[]);const t=(e.data.items||[]).map(e=>{var t;return{id:e.id.toString(),code:e.code,name:e.name,price:parseFloat(e.price),categoryId:(null===(t=e.categoryId)||void 0===t?void 0:t.toString())||"",emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image,is_set_menu:e.is_set_menu||!1,set_items:e.set_items}});h(r?e=>[...e,...t]:t),e.pagination&&x(e.pagination)}}}catch(i){d("Failed to load menu"),console.error("Error loading menu:",i)}finally{l(!1),b(!1)}}},[t,o,d,l]);(0,e.useEffect)(()=>{j()},[t]);const k=(0,e.useCallback)(e=>{g(e),h([]),x(null),j("all"===e?void 0:e,1,!1)},[j]),S=(0,e.useCallback)(()=>{if(null===f||void 0===f||!f.hasMore||y)return;const e=f.page+1;j("all"===m?void 0:m,e,!0)},[f,y,m,j]);(0,e.useEffect)(()=>(w.current&&w.current.disconnect(),w.current=new IntersectionObserver(e=>{e[0].isIntersecting&&null!==f&&void 0!==f&&f.hasMore&&!y&&S()},{rootMargin:"100px"}),v.current&&w.current.observe(v.current),()=>{w.current&&w.current.disconnect()}),[null===f||void 0===f?void 0:f.hasMore,y,S]);const A=(0,e.useCallback)(e=>{n(`/mobile/${t}/item/${e.id}`)},[n,t]),C=(0,e.useCallback)(()=>{n(`/mobile/${t}/cart`)},[n,t]),F=(0,e.useCallback)(e=>(0,ne.jsxs)(Hu,{onClick:()=>A(e),children:[e.is_set_menu&&(0,ne.jsx)(Qu,{children:"SET"}),(0,ne.jsx)(Wu,{hasImage:!!e.image,children:e.image?(0,ne.jsx)(Uu,{src:e.image,alt:e.name,fallback:e.emoji||"\ud83c\udf7d\ufe0f"}):(0,ne.jsx)("span",{children:e.emoji||"\ud83c\udf7d\ufe0f"})}),(0,ne.jsxs)(Gu,{children:[(0,ne.jsxs)(Yu,{children:[e.code?`${e.code} `:"",e.name]}),(0,ne.jsx)(Vu,{children:(0,ue.vv)(e.price,a)}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,ne.jsx)(Ku,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")})]})]},e.id),[A,a]);return s?(0,ne.jsx)(Iu,{title:"Menu",currentPage:"menu",children:(0,ne.jsx)(Ju,{children:"Loading menu..."})}):(0,ne.jsxs)(Iu,{title:"Menu",currentPage:"menu",cartItemCount:i.length,children:[r&&(0,ne.jsxs)($u,{children:[(0,ne.jsx)(Mu,{children:r.name}),(0,ne.jsx)(Du,{isOpen:r.isOpen,children:r.isOpen?"\u2713 Open Now":"\u2717 Closed"})]}),(0,ne.jsxs)(Nu,{children:[(0,ne.jsx)(Lu,{active:"all"===m,onClick:()=>k("all"),children:"All Items"}),c.map(e=>(0,ne.jsxs)(Lu,{active:m===e.id,onClick:()=>k(e.id),children:[e.emoji," ",e.name]},e.id))]}),p.length>0?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(qu,{children:p.map(F)}),(0,ne.jsx)(tp,{ref:v}),y&&(0,ne.jsx)(Xu,{children:"Loading more..."})]}):(0,ne.jsxs)(Zu,{children:[(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,ne.jsx)("path",{d:"M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 24L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("path",{d:"M12 12V16M12 8H12.01",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ne.jsx)("p",{children:"No items available in this category"})]}),i.length>0&&(0,ne.jsxs)(ep,{onClick:C,children:[(0,ne.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,ne.jsx)("path",{d:"M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,ne.jsx)("path",{d:"M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,ne.jsx)("path",{d:"M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),"View Cart (",i.length,")"]})]})};const rp=new class{async request(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`/api${e}`;console.log("API Request:",{url:n,endpoint:e,method:t.method||"GET"});const r={"Content-Type":"application/json",...t.headers||{}};try{const e=await fetch(n,{...t,credentials:"include",headers:r});if(console.log("API Response:",{status:e.status,ok:e.ok}),!e.ok){const t=await e.text();console.error("API Error Response:",t);try{const n=JSON.parse(t);throw new Error(n.message||`Request failed: ${e.status}`)}catch{throw new Error(`Request failed: ${e.status}`)}}const o=await e.text();if(console.log("API Response Body:",o),o)try{return JSON.parse(o)}catch{return{success:!0}}return{success:!0}}catch(o){throw console.error("\u274c API request failed:",o),o}}async login(e,t){return this.request("/mobile/auth/login",{method:"POST",body:JSON.stringify({email:e,password:t})})}async register(e){return this.request("/mobile/auth/register",{method:"POST",body:JSON.stringify(e)})}async guestToken(){return this.request("/mobile/auth/guest",{method:"POST"})}async guestCheckout(){return this.request("/mobile/auth/guest",{method:"POST"})}async getStoreByQRCode(e){return this.request(`/mobile/store/qr/${e}`)}async getMenu(e){return this.request(`/mobile/menu/${e}`)}async getItemDetails(e){return this.request(`/mobile/menu/item/${e}`)}async validateCart(e,t){return this.request("/mobile/cart/validate",{method:"POST",body:JSON.stringify({items:e,storeId:t})})}async createOrder(e){return this.request("/mobile/order",{method:"POST",body:JSON.stringify(e)})}async getOrder(e){return this.request(`/mobile/order/${e}`)}async cancelOrder(e){return this.request(`/mobile/order/${e}/cancel`,{method:"POST"})}async createPaymentIntent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"RM";return this.request("/mobile/payment/intent",{method:"POST",body:JSON.stringify({amount:e,currency:t})})}async confirmPayment(e,t){return this.request("/mobile/payment/confirm",{method:"POST",body:JSON.stringify({paymentIntentId:e,orderId:t})})}async getOrders(){return this.request("/mobile/orders")}},op=Z.Ay.div`
  background: white;
  margin: 0 0 16px 0;
  padding-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,ip=Z.Ay.div`
  width: 100%;
  height: 250px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.hasImage?"0":"120px"};
  margin-bottom: 16px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,ap=Z.Ay.div`
  padding: 0 16px;
`,sp=Z.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,lp=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
`,dp=Z.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`,cp=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6B7280;
  
  svg {
    width: 16px;
    height: 16px;
  }
`,up=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,pp=Z.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,hp=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,mp=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
  font-size: 14px;
  color: #4B5563;
`,gp=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,fp=Z.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,xp=Z.Ay.span`
  font-size: 12px;
  color: #EF4444;
  font-weight: 500;
  background: #FEE2E2;
  padding: 2px 8px;
  border-radius: 4px;
`,yp=Z.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,bp=Z.Ay.button`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${e=>e.selected?"#635BFF":"#E5E7EB"};
  background: ${e=>e.selected?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.selected?"#635BFF":"#374151"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:active {
    transform: scale(0.98);
  }
`,vp=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,wp=Z.Ay.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  min-height: 44px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:active {
    background: #F9FAFB;
  }
`,jp=Z.Ay.input`
  width: 18px;
  height: 18px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,kp=Z.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,Sp=Z.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,Ap=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Cp=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Fp=Z.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    background: #F3F4F6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,_p=Z.Ay.span`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  min-width: 30px;
  text-align: center;
`,Ep=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 80px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Pp=Z.Ay.textarea`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 12px;
  font-size: 16px; /* iOS zoom 방지 */
  resize: none;
  font-family: inherit;
  box-sizing: border-box;
  min-height: 80px;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Bp=Z.Ay.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
    bottom: 80px;
  }

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,zp=Z.Ay.span`
  font-size: 18px;
`,Rp=()=>{const{slug:t,itemId:n}=(0,X.g)(),r=(0,X.Zp)(),{addToCart:o,currency:i}=Qc(),{getItemById:a,optionGroups:s}=(0,se.b)(),[l,d]=(0,e.useState)(null),[c,u]=(0,e.useState)([]),[p,h]=(0,e.useState)(1),[m,g]=(0,e.useState)(""),[f,x]=(0,e.useState)(!0);(0,e.useEffect)(()=>{if(!n)return;const e=a(n);e?(d(e),x(!1)):y()},[n]);const y=async()=>{if(n)try{const e=await rp.getItemDetails(n);if(e&&e.success&&e.data){const t=e.data,n={id:t.id,name:t.name,price:parseFloat(t.price),emoji:t.emoji,image:t.image,description:t.description||"",preparationTime:t.preparationTime||15,calories:t.calories||0,isAvailable:!1!==t.isAvailable,optionGroups:t.optionGroups||[]};d(n)}else console.error("Item not found"),r(-1)}catch(e){console.error("Error loading item details:",e),r(-1)}finally{x(!1)}},b=null!==l&&void 0!==l&&l.optionGroups?Array.isArray(l.optionGroups)&&l.optionGroups.length>0&&"object"===typeof l.optionGroups[0]?l.optionGroups:l.optionGroups.map(e=>s.find(t=>t.id===e)).filter(e=>void 0!==e):[],v=(e,t,n,r)=>{if(n)u(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);else{const n=b.find(e=>e.id===t);if(n){const t=n.options.map(e=>e.id),o=c.includes(e);u(o&&!r?e=>e.filter(e=>!t.includes(e)):n=>[...n.filter(e=>!t.includes(e)),e])}}},w=()=>!b.length||b.filter(e=>e.required).every(e=>c.some(t=>e.options.some(e=>e.id===t)));return f?(0,ne.jsx)(Iu,{title:"Loading...",showBack:!0,onBack:()=>r(-1),children:(0,ne.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#9CA3AF"},children:"Loading item details..."})}):l?(0,ne.jsxs)(Iu,{title:l.code?`${l.code} ${l.name}`:l.name,showBack:!0,onBack:()=>r(-1),children:[(0,ne.jsxs)(op,{children:[(0,ne.jsx)(ip,{hasImage:!!l.image,children:l.image?(0,ne.jsx)("img",{src:l.image,alt:l.name}):l.emoji}),(0,ne.jsxs)(ap,{children:[(0,ne.jsxs)(sp,{children:[l.code?`${l.code} `:"",l.name]}),(0,ne.jsx)(lp,{children:l.description}),(0,ne.jsxs)(dp,{children:[l.preparationTime>0&&(0,ne.jsxs)(cp,{children:[(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,ne.jsx)("path",{d:"M12 6V12L16 14",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2"})]}),l.preparationTime," min"]}),l.calories&&(0,ne.jsxs)(cp,{children:[(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 2 11 2C11 6.41828 14.5817 10 19 10V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),l.calories," cal"]})]})]})]}),l.is_set_menu&&l.set_items&&l.set_items.length>0&&(0,ne.jsxs)(up,{children:[(0,ne.jsx)(pp,{children:"\ud83c\udf71 This set includes:"}),(0,ne.jsx)(hp,{children:l.set_items.map((e,t)=>(0,ne.jsxs)(mp,{children:["\u2022 ",e.name," x",e.quantity]},t))})]}),null===b||void 0===b?void 0:b.map(e=>(0,ne.jsxs)(gp,{children:[(0,ne.jsxs)(fp,{children:[e.name,e.required&&(0,ne.jsx)(xp,{children:"Required"})]}),e.multiple?(0,ne.jsx)(vp,{children:e.options.map(t=>(0,ne.jsxs)(wp,{children:[(0,ne.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,ne.jsx)(jp,{type:"checkbox",checked:c.includes(t.id),onChange:()=>v(t.id,e.id,e.multiple,e.required)}),(0,ne.jsx)(kp,{children:t.name})]}),t.price>0&&(0,ne.jsxs)(Sp,{children:["+",(0,ue.vv)(t.price,i)]})]},t.id))}):(0,ne.jsx)(yp,{children:e.options.map(t=>(0,ne.jsxs)(bp,{selected:c.includes(t.id),onClick:()=>v(t.id,e.id,e.multiple,e.required),children:[(0,ne.jsx)("div",{children:t.name}),t.price>0&&(0,ne.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,ue.vv)(t.price,i)]})]},t.id))})]},e.id)),(0,ne.jsxs)(Ap,{children:[(0,ne.jsx)("div",{style:{fontSize:"16px",fontWeight:600,color:"#1F2937"},children:"Quantity"}),(0,ne.jsxs)(Cp,{children:[(0,ne.jsx)(Fp,{onClick:()=>h(Math.max(1,p-1)),disabled:p<=1,children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})}),(0,ne.jsx)(_p,{children:p}),(0,ne.jsx)(Fp,{onClick:()=>h(p+1),children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M12 5V19M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,ne.jsxs)(Ep,{children:[(0,ne.jsx)("div",{style:{fontSize:"16px",fontWeight:600,color:"#1F2937",marginBottom:"8px"},children:"Special Instructions"}),(0,ne.jsx)(Pp,{rows:3,placeholder:"Any special requests? (optional)",value:m,onChange:e=>g(e.target.value)})]}),(0,ne.jsxs)(Bp,{onClick:()=>{if(!l||!w())return;const e={...l,optionGroups:b};o(e,p,c,m),r(`/mobile/${t}/cart`)},disabled:!w(),children:[(0,ne.jsx)("span",{children:"Add to Cart"}),(0,ne.jsx)(zp,{children:(0,ue.vv)((()=>{if(!l)return 0;let e=l.price*p;return c.forEach(t=>{var n;const r=null===b||void 0===b||null===(n=b.flatMap(e=>e.options))||void 0===n?void 0:n.find(e=>e.id===t);r&&(e+=r.price*p)}),e})(),i)})]})]}):(0,ne.jsx)(Iu,{title:"Item Not Found",showBack:!0,onBack:()=>r(-1),children:(0,ne.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#9CA3AF"},children:"This item could not be found."})})},Tp=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 140px; /* Space for checkout button + bottom nav */
`,Op=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Ip=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`,$p=Z.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`,Mp=Z.Ay.button`
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 4px;
  
  svg {
    width: 20px;
    height: 20px;
  }
`,Dp=Z.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`,Np=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Lp=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,qp=Z.Ay.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    background: #F3F4F6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #6B7280;
  }
`,Hp=Z.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  min-width: 20px;
  text-align: center;
`,Wp=Z.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,Up=Z.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,Gp=Z.Ay.div`
  text-align: center;
  padding: 60px 24px;
  
  svg {
    width: 80px;
    height: 80px;
    color: #D1D5DB;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #6B7280;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 14px;
    color: #9CA3AF;
    margin: 0 0 24px 0;
  }
`,Yp=Z.Ay.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:active {
    background: #5A51E6;
  }
`,Vp=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Qp=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid #E5E7EB;
    font-size: 16px;
    font-weight: 600;
  }
`,Kp=Z.Ay.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
    bottom: 80px;
  }

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,Jp=()=>{const{slug:e}=(0,X.g)(),t=(0,X.Zp)(),{cartItems:n,cartTotal:r,updateCartItem:o,removeFromCart:i,currency:a}=Qc(),{operationSettings:s}=(0,ae.Pj)(),l=r,d=s.serviceChargeEnabled?l*(s.serviceChargeRate/100):0,c=s.taxEnabled?l*(s.taxRate/100):0,u=l+d+c,p=(e,t)=>{0===t?i(e):o(e,t)},h=()=>{t(`/mobile/${e}/menu`)};return 0===n.length?(0,ne.jsx)(Iu,{title:"Cart",currentPage:"cart",children:(0,ne.jsxs)(Gp,{children:[(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,ne.jsx)("path",{d:"M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,ne.jsx)("path",{d:"M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,ne.jsx)("path",{d:"M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ne.jsx)("h3",{children:"Your cart is empty"}),(0,ne.jsx)("p",{children:"Add some delicious items to get started"}),(0,ne.jsx)(Yp,{onClick:h,children:"Browse Menu"})]})}):(0,ne.jsxs)(Iu,{title:"Cart",currentPage:"cart",cartItemCount:n.length,children:[(0,ne.jsxs)(Tp,{children:[n.map(e=>(0,ne.jsxs)(Op,{children:[(0,ne.jsxs)(Ip,{children:[(0,ne.jsxs)($p,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),(0,ne.jsx)(Mp,{onClick:()=>i(e.id),children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M18 6L6 18M6 6L18 18",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e.selectedOptions.length>0&&(0,ne.jsx)(Dp,{children:e.selectedOptions.join(", ")}),e.specialInstructions&&(0,ne.jsxs)(Up,{children:["Note: ",e.specialInstructions]}),(0,ne.jsxs)(Np,{children:[(0,ne.jsxs)(Lp,{children:[(0,ne.jsx)(qp,{onClick:()=>p(e.id,e.quantity-1),disabled:e.quantity<=1,children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})}),(0,ne.jsx)(Hp,{children:e.quantity}),(0,ne.jsx)(qp,{onClick:()=>p(e.id,e.quantity+1),children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ne.jsx)("path",{d:"M12 5V19M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]}),(0,ne.jsx)(Wp,{children:(0,ue.vv)(e.totalPrice,a)})]})]},e.id)),(0,ne.jsxs)(Vp,{children:[(0,ne.jsxs)(Qp,{children:[(0,ne.jsx)("span",{children:"Subtotal"}),(0,ne.jsx)("span",{children:(0,ue.vv)(l,a)})]}),s.serviceChargeEnabled&&d>0&&(0,ne.jsxs)(Qp,{children:[(0,ne.jsxs)("span",{children:["Service Charge (",s.serviceChargeRate,"%)"]}),(0,ne.jsx)("span",{children:(0,ue.vv)(d,a)})]}),s.taxEnabled&&c>0&&(0,ne.jsxs)(Qp,{children:[(0,ne.jsxs)("span",{children:["Tax (",s.taxRate,"%)"]}),(0,ne.jsx)("span",{children:(0,ue.vv)(c,a)})]}),(0,ne.jsxs)(Qp,{children:[(0,ne.jsx)("span",{children:"Total"}),(0,ne.jsx)("span",{children:(0,ue.vv)(u,a)})]})]})]}),(0,ne.jsx)(Kp,{onClick:()=>{t(`/mobile/${e}/payment`)},children:"Proceed to Checkout"})]})};var Xp=n(2420);const Zp=[{code:"+82",country:"KR",name:"South Korea",flag:"\ud83c\uddf0\ud83c\uddf7"},{code:"+60",country:"MY",name:"Malaysia",flag:"\ud83c\uddf2\ud83c\uddfe"},{code:"+65",country:"SG",name:"Singapore",flag:"\ud83c\uddf8\ud83c\uddec"},{code:"+81",country:"JP",name:"Japan",flag:"\ud83c\uddef\ud83c\uddf5"},{code:"+86",country:"CN",name:"China",flag:"\ud83c\udde8\ud83c\uddf3"},{code:"+1",country:"US",name:"United States",flag:"\ud83c\uddfa\ud83c\uddf8"},{code:"+44",country:"GB",name:"United Kingdom",flag:"\ud83c\uddec\ud83c\udde7"},{code:"+61",country:"AU",name:"Australia",flag:"\ud83c\udde6\ud83c\uddfa"},{code:"+66",country:"TH",name:"Thailand",flag:"\ud83c\uddf9\ud83c\udded"},{code:"+84",country:"VN",name:"Vietnam",flag:"\ud83c\uddfb\ud83c\uddf3"},{code:"+63",country:"PH",name:"Philippines",flag:"\ud83c\uddf5\ud83c\udded"},{code:"+62",country:"ID",name:"Indonesia",flag:"\ud83c\uddee\ud83c\udde9"},{code:"+91",country:"IN",name:"India",flag:"\ud83c\uddee\ud83c\uddf3"}],eh=(e,t)=>{const n=t.replace(/\D/g,"");return`${e}${n.startsWith("0")?n.slice(1):n}`},th=e=>{if(!e)return{countryCode:"+82",phoneNumber:""};const t=[...Zp].sort((e,t)=>t.code.length-e.code.length);for(const n of t)if(e.startsWith(n.code))return{countryCode:n.code,phoneNumber:e.slice(n.code.length)};return{countryCode:"+82",phoneNumber:e.replace(/^\+/,"")}},nh=Z.Ay.div`
  display: flex;
  gap: 8px;
`,rh=Z.Ay.select`
  width: 110px;
  padding: 14px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,oh=Z.Ay.input`
  flex: 1;
  padding: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: white;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,ih=t=>{let{value:n,onChange:r,defaultCountryCode:o,placeholder:i="Phone number",disabled:a=!1}=t;const[s,l]=(0,e.useState)(()=>{if(n){return th(n).countryCode}return(e=>{var t;if(!e)return"+60";const n=e.toUpperCase();let r=Zp.find(e=>e.country===n);return r||(r=Zp.find(e=>e.name.toUpperCase()===n)),(null===(t=r)||void 0===t?void 0:t.code)||"+60"})(o)}),[d,c]=(0,e.useState)(()=>{if(n){return th(n).phoneNumber}return""});(0,e.useEffect)(()=>{if(n){const e=th(n);l(e.countryCode),c(e.phoneNumber)}},[n]);return(0,ne.jsxs)(nh,{children:[(0,ne.jsx)(rh,{value:s,onChange:e=>{const t=e.target.value;l(t),d&&r(eh(t,d))},disabled:a,children:Zp.map(e=>(0,ne.jsxs)("option",{value:e.code,children:[e.flag," ",e.code]},e.code))}),(0,ne.jsx)(oh,{type:"tel",value:d,onChange:e=>{const t=e.target.value;c(t),r(t?eh(s,t):"")},placeholder:i,disabled:a})]})},ah=Z.Ay.div`
  padding-bottom: 100px;
  max-width: 100%;
  box-sizing: border-box;
`,sh=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`,lh=Z.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,dh=Z.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #635BFF;
    cursor: pointer;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #1F2937;
  }
`,ch=Z.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,uh=Z.Ay.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  border: 1px solid ${e=>e.selected?"#635BFF":"#E5E7EB"};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"rgba(99, 91, 255, 0.05)":"white"};
  width: 100%;
  gap: 6px;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.05);
  }

  &:active {
    transform: scale(0.98);
  }
`,ph=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  text-align: center;
`,hh=Z.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-align: center;
`,mh=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,gh=Z.Ay.label`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid ${e=>e.selected?"#635BFF":"#E5E7EB"};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"rgba(99, 91, 255, 0.05)":"white"};

  &:active {
    transform: scale(0.98);
  }
`,fh=Z.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  accent-color: #635BFF;
`,xh=Z.Ay.div`
  flex: 1;
`,yh=Z.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,bh=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,vh=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  color: #6B7280;

  &.total {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #E5E7EB;
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0;
  }
`,wh=Z.Ay.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
`,jh=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,kh=Z.Ay.div`
  flex: 1;
`,Sh=Z.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 2px;
`,Ah=Z.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,Ch=Z.Ay.div`
  font-size: 12px;
  color: #667eea;
  margin-top: 4px;
  font-weight: 500;
`,Fh=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-left: 12px;
`,_h=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,Eh=Z.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 16px; /* Prevents iOS auto-zoom on focus */
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,Ph=Z.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
`,Bh=Z.Ay.div`
  background: #FEE2E2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`,zh=Z.Ay.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
    bottom: 80px;
  }

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,Rh=Z.Ay.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,Th=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Oh=Z.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Ih=Z.Ay.div`
  margin-top: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$h=Z.Ay.div`
  flex: 1;
`,Mh=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Dh=Z.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Nh=Z.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-left: 8px;

  &:hover {
    background: #E5E7EB;
    color: #6B7280;
  }

  &:active {
    transform: scale(0.95);
  }
`,Lh=Z.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 16px; /* Prevent iOS zoom on focus */
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,qh=Z.Ay.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,Hh=Z.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`,Wh=Z.Ay.button`
  width: 100%;
  background: ${e=>e.selected?"#EFF6FF":"white"};
  border: 2px solid ${e=>e.selected?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:last-child {
    margin-bottom: 0;
  }
`,Uh=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Gh=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`,Yh=Z.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Vh=Z.Ay.div`
  font-size: 14px;
  font-weight: 700;
  color: #635BFF;
`,Qh=Z.Ay.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #92400E;
`,Kh=()=>{var t;const{slug:n}=(0,X.g)(),r=(0,X.Zp)(),{cartItems:o,cartTotal:i,clearCart:a,setCurrentOrder:s,currentStore:l,setCurrentStore:d,currency:c}=Qc(),{currentCustomer:u,guestInfo:p,updateCustomerOrderStats:h,updateCustomer:m,setGuestInfo:g,logoutCustomer:f,loginCustomer:x,registerCustomer:y}=(0,le.c)(),{getTakeawayCharge:b,operationSettings:v}=(0,ae.Pj)(),[w,j]=(0,e.useState)(null),[k,S]=(0,e.useState)(!1),[A,C]=(0,e.useState)(""),[F,_]=(0,e.useState)(""),[E,P]=(0,e.useState)(""),[B,z]=(0,e.useState)(""),[R,T]=(0,e.useState)(""),[O,I]=(0,e.useState)([]),[$,M]=(0,e.useState)(""),[D,N]=(0,e.useState)(""),[L,q]=(0,e.useState)(0),[H,W]=(0,e.useState)(""),[U,G]=(0,e.useState)(""),[Y,V]=(0,e.useState)(""),[Q,K]=(0,e.useState)(""),[J,Z]=(0,e.useState)(null),[ee,te]=(0,e.useState)([]),[re,oe]=(0,e.useState)(null),[ie,se]=(0,e.useState)(!0),[de,ce]=(0,e.useState)([]),[pe,he]=(0,e.useState)(""),[me,ge]=(0,e.useState)(""),[fe,xe]=(0,e.useState)(""),[ye,be]=(0,e.useState)(!1),[ve,we]=(0,e.useState)(!1),[je,ke]=(0,e.useState)(!1),[Se,Ae]=(0,e.useState)(""),[Ce,Fe]=(0,e.useState)(""),[_e,Ee]=(0,e.useState)(""),[Pe,Be]=(0,e.useState)(0),[ze,Re]=(0,e.useState)(0),[Te,Oe]=(0,e.useState)(0),[Ie,$e]=(0,e.useState)(null),[Me,De]=(0,e.useState)(!1),[Ne,Le]=(0,e.useState)("Bronze");e.useEffect(()=>{(async()=>{if(null!==l&&void 0!==l&&l.id)try{const e=await fetch(`/api/membership/settings/${l.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&($e(t.data),console.log("\u2705 Membership settings loaded:",t.data))}if(null!==u&&void 0!==u&&u.id){const e=await fetch(`/api/membership/customer/${l.id}/${u.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&(Be(t.data.points||0),Le(t.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",t.data.points,"Tier:",t.data.loyalty_tier))}}else Be(0),Re(0),Oe(0),De(!1)}catch(A){console.error("Failed to load membership data:",A)}})()},[null===l||void 0===l?void 0:l.id,null===u||void 0===u?void 0:u.id]),e.useEffect(()=>{if(Ie&&ze>0){const e=parseFloat(Ie.points_to_currency)||100;Oe(ze/e)}else Oe(0)},[ze,Ie]);const qe=sessionStorage.getItem("orderType")||"dine-in",He=(()=>{if("pickup"!==qe||ie||!re)return null;const e=new Date,[t,n]=re.split(":").map(Number);return e.setHours(t,n,0,0),e.toISOString()})(),We=null===l||void 0===l?void 0:l.cash_rounding,Ue=(null===l||void 0===l?void 0:l.rounding_apply_to)||"cash_only",Ge=i,Ye=(()=>{if("takeaway"!==qe&&"pickup"!==qe||!v.takeawayPricing.enabled)return 0;let e=0;if("per-item"===v.takeawayPricing.pricingType){const t=o.reduce((e,t)=>e+t.quantity,0);e=t*v.takeawayPricing.perItemCharge}else o.forEach(t=>{const n=b(t.menuItem.categoryId||t.menuItem.category);e+=n*t.quantity});return e})(),Ve=(()=>{if("delivery"!==qe||!J)return 0;const e=ee.find(e=>e.id===J);if(!e)return 0;const t=v.deliveryPricing,n=(null===t||void 0===t?void 0:t.freeAbove)||999999;return Ge>=n?(console.log("\u2705 Order qualifies for free delivery (subtotal >= freeAbove)"),0):e.fee})(),Qe=Ge-L-Te,Ke=v.taxEnabled?Qe*(v.taxRate/100):0,Je=v.serviceChargeEnabled?Qe*(v.serviceChargeRate/100):0,Xe=Qe+Ke+Je+Ye+Ve,Ze="all"===Ue&&We?(et=Xe,We?Math.round(et/We)*We:et):Xe;var et;const tt=e.useMemo(()=>{if(!Ie||!Ie.is_active)return 0;const e=Ie.min_points_to_use||100,t=parseFloat(Ie.max_points_per_order_percent)||50,n=parseFloat(Ie.points_to_currency)||100,r=t/100*(Ge-L),o=Math.floor(r*n),i=Math.min(Pe,o);return Pe<e?0:i},[Ie,Pe,Ge,L]),nt=e.useMemo(()=>{if(!w)return console.log("\u26a0\ufe0f paymentMethods is null/undefined, returning empty array"),[];console.log("\ud83d\udd0d Filtering payment methods for mobile. Raw paymentMethods:",JSON.stringify(w,null,2));const e=[],t=w._order;return(t&&Array.isArray(t)?t.filter(e=>"_order"!==e&&w[e]):Object.keys(w).filter(e=>"_order"!==e)).forEach(t=>{const n=w[t];if(n)if(console.log(`\ud83d\udd0d Checking ${t}:`,{enabled:n.enabled,availableIn:n.availableIn,passesCheck:n.enabled&&n.availableIn&&n.availableIn.includes("mobile")}),n.enabled&&n.availableIn&&n.availableIn.includes("mobile")){if("delivery"===qe&&"payAtCounter"===t)return void console.log(`\u274c ${t} excluded - Pay at Counter not allowed for delivery`);console.log(`\u2705 ${t} passed filter - adding to available methods`),e.push({key:t,label:n.label,...n})}else console.log(`\u274c ${t} failed filter - excluded from mobile`)}),console.log("\ud83d\udd0d Final available methods for mobile:",e.map(e=>e.key)),e},[w,qe]),[rt,ot]=(0,e.useState)("");e.useEffect(()=>{(async()=>{if(n){console.log("\ud83c\udfea Loading restaurant from slug:",n);try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();if(t.success&&t.data){const e=t.data;console.log("\u2705 Restaurant loaded from slug API:",e),d({id:e.id.toString(),name:e.name,slug:e.slug,description:e.description||"",logo:e.logo_url||"",isOpen:"active"===e.status,openingHours:e.opening_hours||""})}}else console.error("Failed to load restaurant by slug:",e.status)}catch(A){console.error("Failed to load restaurant:",A)}}})()},[n,d]),e.useEffect(()=>{u?p&&"Guest"===p.name&&!p.phone&&g(null):p||g({name:"Guest",phone:""})},[u]),e.useEffect(()=>{(async()=>{try{if(null===l||void 0===l||!l.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load payment settings");console.log("\ud83d\udcb3 Loading payment settings for restaurant ID:",l.id);const e=await fetch(`/api/restaurants/${l.id}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings?(console.log("\u2705 Payment settings loaded:",n.payment_settings),j(n.payment_settings)):console.warn("\u26a0\ufe0f No payment_settings found in restaurant data")}}catch(A){console.error("Failed to load payment settings:",A)}})()},[null===l||void 0===l?void 0:l.id]),e.useEffect(()=>{(async()=>{try{if(null===l||void 0===l||!l.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load table settings");console.log("\ud83c\udf7d\ufe0f Loading table settings for restaurant ID:",l.id);const t=await fetch(`/api/restaurants/${l.id}`);if(t.ok){var e;const n=await t.json(),r=n.data||n;if(null!==(e=r.operation_settings)&&void 0!==e&&e.enableTableNumbers){const{totalTables:e,tablePrefix:t}=r.operation_settings;console.log("\u2705 Table settings loaded:",{totalTables:e,tablePrefix:t});const n=[];for(let r=1;r<=e;r++)n.push(`${t||"T"}${String(r).padStart(3,"0")}`);I(n)}else console.log("\u2139\ufe0f Table numbers not enabled for this restaurant"),I([])}}catch(A){console.error("Failed to load table settings:",A)}})();const e=sessionStorage.getItem("tableNumber");e&&M(e)},[null===l||void 0===l?void 0:l.id]),e.useEffect(()=>{if(console.log("\ud83d\udd0d Delivery zone effect triggered"),console.log("Order type:",qe),console.log("operationSettings.deliveryPricing:",v.deliveryPricing),"delivery"===qe)if(v.deliveryPricing&&v.deliveryPricing.zones&&v.deliveryPricing.zones.length>0){const e=v.deliveryPricing.zones;console.log("\ud83d\ude9a Loading delivery zones:",e),te(e)}else console.log("\u2139\ufe0f No delivery zones configured - delivery zone selection not required"),te([])},[qe,v.deliveryPricing]),e.useEffect(()=>{if("delivery"===qe)if(u){var e,t;console.log("\ud83d\udccd Loading member address:",u);const n=(null===(e=u.addresses)||void 0===e?void 0:e.find(e=>e.isDefault))||(null===(t=u.addresses)||void 0===t?void 0:t[0]);n&&G(n.address||""),V(u.phone||"")}else p&&p.phone&&(console.log("\ud83d\udccd Syncing guest phone for delivery:",p.phone),V(p.phone))},[u,p,qe]),e.useEffect(()=>{"delivery"===qe&&p&&"Guest"===p.name&&!p.phone&&(console.log("\u26a0\ufe0f Quick Order not allowed for delivery - clearing guest info"),g(null))},[qe,p,g]),e.useEffect(()=>{if("pickup"!==qe)return;const e=(()=>{const e=[],t=new Date,n=v.openingTime||"09:00",r=v.closingTime||"22:00",[o,i]=n.split(":").map(Number),[a,s]=r.split(":").map(Number);let d=60*t.getHours()+t.getMinutes();const c=30*Math.ceil((d+30)/30),u=60*o+i,p=60*a+s;let h=Math.max(u,c);h=30*Math.ceil(h/30);const m=(null===l||void 0===l?void 0:l.breakTimes)||[];for(let l=h;l<p;l+=30){const t=Math.floor(l/60),n=l%60,r=`${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`;m.some(e=>{if(!e.start||!e.end)return!1;const[t,n]=e.start.split(":").map(Number),[r,o]=e.end.split(":").map(Number);return l>=60*t+n&&l<60*r+o})||e.push(r)}return e})();console.log("\ud83d\udce6 Generated pickup time slots:",e),ce(e)},[qe,v,l]);const it=async()=>{if(u&&"delivery"===qe&&U.trim())try{console.log("\ud83d\udcbe Saving delivery address to member profile...");const e=u.addresses||[];if(e.some(e=>e.address===U))console.log("\u2139\ufe0f Address already exists in member profile");else{const t={id:`addr_${Date.now()}`,label:"Delivery Address",address:U,isDefault:0===e.length};await m(u.id,{addresses:[...e,t]}),console.log("\u2705 Delivery address saved to member profile")}}catch(A){console.error("\u274c Failed to save delivery address:",A)}},at=e=>e.selectedOptions||[];return(0,ne.jsxs)(Iu,{title:"Payment",showBack:!0,onBack:()=>r(`/mobile/${n}/cart`),children:[(0,ne.jsxs)(ah,{children:[(0,ne.jsxs)(bh,{children:[(0,ne.jsx)(wh,{children:o.map((e,t)=>(0,ne.jsxs)(jh,{children:[(0,ne.jsxs)(kh,{children:[(0,ne.jsxs)(Sh,{children:[e.menuItem.emoji," ",e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),(0,ne.jsxs)(Ah,{children:["Qty: ",e.quantity]}),e.menuItem.is_set_menu&&e.menuItem.set_items&&e.menuItem.set_items.length>0&&(0,ne.jsxs)(Ch,{children:["\ud83c\udf71 Includes: ",e.menuItem.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")]})]}),(0,ne.jsx)(Fh,{children:(0,ue.vv)(e.totalPrice,c)})]},t))}),(0,ne.jsxs)(vh,{children:[(0,ne.jsx)("span",{children:"Subtotal"}),(0,ne.jsx)("span",{children:(0,ue.vv)(Ge,c)})]}),L>0&&(0,ne.jsxs)(vh,{children:[(0,ne.jsx)("span",{children:"Coupon Discount"}),(0,ne.jsxs)("span",{style:{color:"#059669"},children:["-",(0,ue.vv)(L,c)]})]}),Te>0&&(0,ne.jsxs)(vh,{children:[(0,ne.jsxs)("span",{children:["Points Discount (",ze," pts)"]}),(0,ne.jsxs)("span",{style:{color:"#059669"},children:["-",(0,ue.vv)(Te,c)]})]}),Ye>0&&(0,ne.jsxs)(vh,{children:[(0,ne.jsx)("span",{children:"Takeaway Charge"}),(0,ne.jsx)("span",{children:(0,ue.vv)(Ye,c)})]}),Ve>0&&(0,ne.jsxs)(vh,{children:[(0,ne.jsx)("span",{children:"Delivery Fee"}),(0,ne.jsx)("span",{children:(0,ue.vv)(Ve,c)})]}),Je>0&&(0,ne.jsxs)(vh,{children:[(0,ne.jsxs)("span",{children:["Service Charge (",v.serviceChargeRate,"%)"]}),(0,ne.jsx)("span",{children:(0,ue.vv)(Je,c)})]}),Ke>0&&(0,ne.jsxs)(vh,{children:[(0,ne.jsxs)("span",{children:["Tax (",v.taxRate,"%)"]}),(0,ne.jsx)("span",{children:(0,ue.vv)(Ke,c)})]}),(0,ne.jsxs)(vh,{className:"total",children:[(0,ne.jsx)("span",{children:"Total"}),(0,ne.jsx)("span",{children:(0,ue.vv)(Ze,c)})]})]}),A&&(0,ne.jsx)(Bh,{children:A}),(0,ne.jsxs)(sh,{children:[(0,ne.jsx)(lh,{children:"Customer Information"}),(0,ne.jsxs)(dh,{style:{opacity:"delivery"===qe?.5:1},children:[(0,ne.jsx)("input",{type:"checkbox",checked:!(!p||"Guest"!==p.name||p.phone),disabled:"delivery"===qe,onChange:e=>{e.target.checked?(g({name:"Guest",phone:""}),be(!1),we(!1),ke(!1)):g(null)}}),(0,ne.jsxs)("span",{children:["Quick Order (No customer info required)","delivery"===qe?" - Not available for delivery":""]})]}),(0,ne.jsxs)(ch,{children:[(0,ne.jsxs)(uh,{selected:ye||je||p&&"Guest"!==p.name,onClick:()=>{be(!ye),we(!1),ke(!1),u&&f()},children:[(0,ne.jsx)(ph,{children:"Guest Or Register"}),(0,ne.jsx)(hh,{children:"Order as guest or sign up"})]}),(0,ne.jsxs)(uh,{selected:ve||!!u,onClick:()=>{we(!ve),be(!1),ke(!1),g(null)},children:[(0,ne.jsx)(ph,{children:"Member"}),(0,ne.jsx)(hh,{children:"Login"})]})]}),ye&&!u&&(0,ne.jsxs)("div",{style:{marginTop:"16px"},children:[(0,ne.jsxs)(dh,{children:[(0,ne.jsx)("input",{type:"checkbox",checked:je,onChange:e=>ke(e.target.checked)}),(0,ne.jsx)("span",{children:"Register as a Member (Earn points & benefits)"})]}),(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Name *"}),(0,ne.jsx)(Eh,{type:"text",placeholder:"Enter your name",value:pe,onChange:e=>he(e.target.value)})]}),(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Phone Number *"}),(0,ne.jsx)(ih,{value:me,onChange:ge,defaultCountryCode:null===l||void 0===l?void 0:l.country,placeholder:"Phone number"})]}),(0,ne.jsxs)(qh,{children:[(0,ne.jsxs)(Hh,{children:["Email ",je?"*":"(Optional)"]}),(0,ne.jsx)(Eh,{type:"email",placeholder:"your.email@example.com",value:fe,onChange:e=>xe(e.target.value)})]}),je&&(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Password *"}),(0,ne.jsx)(Eh,{type:"password",placeholder:"Enter password",value:Se,onChange:e=>Ae(e.target.value)})]}),(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Confirm Password *"}),(0,ne.jsx)(Eh,{type:"password",placeholder:"Confirm password",value:Ce,onChange:e=>Fe(e.target.value)})]})]}),(0,ne.jsx)("button",{onClick:async()=>{if(pe.trim()&&me.trim())if(je){if(!fe.trim())return void alert("Email is required for member registration");if(!Se.trim())return void alert("Password is required for member registration");if(Se!==Ce)return void alert("Passwords do not match");try{const e=await y({name:pe,phone:me,email:fe,password:Se},null===l||void 0===l?void 0:l.id);console.log("\u2705 Customer registered:",e),alert("Registration successful! You are now logged in as a member."),be(!1),ke(!1),he(""),ge(""),xe(""),Ae(""),Fe("")}catch(A){console.error("Registration failed:",A),alert(A.message||"Registration failed. Please try again.")}}else g({name:pe,phone:me}),be(!1);else alert("Please enter name and phone number")},style:{width:"100%",padding:"12px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer"},children:je?"Register & Continue":"Save Guest Info"})]}),ve&&!u&&(0,ne.jsxs)("div",{style:{marginTop:"16px"},children:[(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Email or Phone Number *"}),(0,ne.jsx)(Eh,{type:"text",placeholder:"Email or phone number",value:me,onChange:e=>ge(e.target.value)})]}),(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Password *"}),(0,ne.jsx)(Eh,{type:"password",placeholder:"Enter your password",value:_e,onChange:e=>Ee(e.target.value)})]}),(0,ne.jsx)("button",{onClick:async()=>{if(me.trim())if(_e.trim())try{const e=await x(me,_e,null===l||void 0===l?void 0:l.id);e?(console.log("\u2705 Member logged in:",e),we(!1),ge(""),Ee("")):alert("Login failed. Please check your phone number and password.")}catch(A){console.error("Login error:",A),alert("Login failed. Please try again.")}else alert("Please enter your password");else alert("Please enter your phone number")},style:{width:"100%",padding:"12px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginBottom:"12px"},children:"Login as Member"}),(0,ne.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",marginBottom:"8px"},children:(0,ne.jsx)("span",{onClick:()=>r(`/mobile/${n}/forgot-password`),style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Forgot password?"})}),(0,ne.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center"},children:["Not a member yet?"," ",(0,ne.jsx)("span",{onClick:()=>{we(!1),be(!0),ke(!0)},style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Sign up here"})]})]}),u&&(0,ne.jsxs)(Ih,{children:[(0,ne.jsxs)($h,{children:[(0,ne.jsx)(Mh,{children:u.name}),(0,ne.jsxs)(Dh,{children:[u.phone,u.email&&` \u2022 ${u.email}`]})]}),(0,ne.jsx)(Nh,{onClick:()=>{f(),we(!1)},title:"Clear customer info",children:"\xd7"})]}),p&&"Guest"!==p.name&&!u&&(0,ne.jsxs)(Ih,{children:[(0,ne.jsxs)($h,{children:[(0,ne.jsx)(Mh,{children:p.name}),(0,ne.jsx)(Dh,{children:p.phone||"No phone number"})]}),(0,ne.jsx)(Nh,{onClick:()=>{g(null),he(""),ge(""),xe(""),be(!1)},title:"Clear guest info",children:"\xd7"})]})]}),"delivery"===qe&&(0,ne.jsxs)(sh,{children:[(0,ne.jsx)(lh,{children:"Delivery Information *"}),p&&"Guest"===p.name&&!p.phone&&(0,ne.jsx)(Qh,{children:"\u26a0\ufe0f Quick Order is not available for delivery. Please enter your contact information and address."}),(null===(t=v.deliveryPricing)||void 0===t?void 0:t.minimumOrder)>0&&Ge<v.deliveryPricing.minimumOrder&&(0,ne.jsxs)(Qh,{children:["\u2139\ufe0f Minimum order for delivery: ",(0,ue.vv)(v.deliveryPricing.minimumOrder,c)]}),(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Delivery Address *"}),(0,ne.jsx)(Lh,{placeholder:"Enter your full delivery address...",value:U,onChange:e=>G(e.target.value)})]}),(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Delivery Notes (Optional)"}),(0,ne.jsx)(Lh,{placeholder:"E.g., Gate code, landmark, special instructions...",value:Q,onChange:e=>K(e.target.value),style:{minHeight:"60px"}})]}),ee.length>0&&(0,ne.jsxs)(qh,{children:[(0,ne.jsx)(Hh,{children:"Select Delivery Zone *"}),ee.map(e=>{var t;return(0,ne.jsxs)(Wh,{selected:J===e.id,onClick:()=>Z(e.id),type:"button",children:[(0,ne.jsx)(Uh,{children:e.name}),(0,ne.jsxs)(Gh,{children:[(0,ne.jsx)(Yh,{children:e.description}),(0,ne.jsx)(Vh,{children:null!==(t=v.deliveryPricing)&&void 0!==t&&t.freeAbove&&Ge>=v.deliveryPricing.freeAbove?"FREE":(0,ue.vv)(e.fee,c)})]})]},e.id)})]})]}),"pickup"===qe&&(0,ne.jsxs)(sh,{children:[(0,ne.jsx)(lh,{children:"Pickup Time *"}),(0,ne.jsx)("button",{type:"button",onClick:()=>{se(!0),oe(null)},style:{width:"100%",padding:"16px",marginBottom:"12px",border:"1px solid "+(ie?"#635BFF":"#E6EBF1"),borderRadius:"8px",background:ie?"#F0F4FF":"white",color:ie?"#635BFF":"#0A2540",fontSize:"15px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s"},children:"Ready as soon as possible"}),(0,ne.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px",textAlign:"center"},children:"Or schedule a pickup time"}),(0,ne.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px"},children:de.map(e=>{const[t,n]=e.split(":").map(Number),r=t>=12?"PM":"AM",o=t%12||12,i=60*t+n+30,a=Math.floor(i/60),s=i%60,l=a>=12?"PM":"AM",d=a%12||12,c=`${o}:${n.toString().padStart(2,"0")}`,u=`${d}:${s.toString().padStart(2,"0")}`,p=r===l?`${c} - ${u} ${l}`:`${c} ${r} - ${u} ${l}`;return(0,ne.jsx)("button",{type:"button",onClick:()=>{se(!1),oe(e)},style:{padding:"12px 8px",border:"1px solid "+(ie||re!==e?"#E6EBF1":"#635BFF"),borderRadius:"8px",background:ie||re!==e?"white":"#F0F4FF",color:ie||re!==e?"#0A2540":"#635BFF",fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s"},children:p},e)})}),0===de.length&&(0,ne.jsx)("div",{style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No available pickup times for today"})]}),(0,ne.jsxs)(sh,{children:[(0,ne.jsx)(lh,{children:"Coupon Code"}),L>0?(0,ne.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"#F0FDF4",border:"1px solid #86EFAC",borderRadius:"8px"},children:[(0,ne.jsxs)("div",{children:[(0,ne.jsx)("div",{style:{fontWeight:600,color:"#166534",fontSize:"14px"},children:D}),(0,ne.jsxs)("div",{style:{fontSize:"12px",color:"#15803D",marginTop:"2px"},children:["-",(0,ue.vv)(L,c)," applied"]})]}),(0,ne.jsx)("button",{onClick:()=>{N(""),q(0),W("")},style:{padding:"6px 12px",background:"white",color:"#DC2626",border:"1px solid #DC2626",borderRadius:"6px",fontSize:"12px",fontWeight:"500",cursor:"pointer"},children:"Remove"})]}):(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,ne.jsx)(Eh,{type:"text",placeholder:"Enter coupon code",value:D,onChange:e=>N(e.target.value.toUpperCase()),style:{flex:1}}),(0,ne.jsx)("button",{onClick:async()=>{if(W(""),D)if(null!==l&&void 0!==l&&l.id)try{const e=await(async(e,t,n,r,o)=>{const i=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:e,restaurant_id:t,order_amount:n,order_type:r,customer_id:o||null})});if(!i.ok){const e=await i.json();throw new Error(e.error||e.message||"Invalid coupon")}return i.json()})(D,parseInt(l.id,10),Ge,qe,null===u||void 0===u?void 0:u.id);e.valid&&e.data?(q(e.data.discountAmount),W("")):(W(e.error||"Invalid coupon"),q(0))}catch(A){W(A.message||"Failed to validate coupon"),q(0)}else W("Store not found");else W("Please enter a coupon code")},style:{padding:"12px 20px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.15s"},onMouseEnter:e=>e.currentTarget.style.background="#5A51E6",onMouseLeave:e=>e.currentTarget.style.background="#635BFF",children:"Apply"})]}),H&&(0,ne.jsx)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:H})]})]}),u&&(null===Ie||void 0===Ie?void 0:Ie.is_active)&&(0,ne.jsxs)(sh,{children:[(0,ne.jsx)(lh,{children:"Use Points"}),(0,ne.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px",background:"#F9FAFB",borderRadius:"8px",marginBottom:"12px"},children:[(0,ne.jsxs)("div",{children:[(0,ne.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:"Available Points"}),(0,ne.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[Ne," Member"]})]}),(0,ne.jsxs)("div",{style:{fontSize:"20px",fontWeight:"700",color:"#635BFF"},children:[Pe.toLocaleString()," pts"]})]}),Pe>=((null===Ie||void 0===Ie?void 0:Ie.min_points_to_use)||100)?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px",cursor:"pointer"},children:[(0,ne.jsx)("input",{type:"checkbox",checked:Me,onChange:e=>{De(e.target.checked),e.target.checked?Re(tt):Re(0)},style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,ne.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:"Use points for this order"})]}),Me&&tt>0&&(0,ne.jsxs)("div",{children:[(0,ne.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:[(0,ne.jsxs)("span",{children:[(null===Ie||void 0===Ie?void 0:Ie.min_points_to_use)||100," pts"]}),(0,ne.jsxs)("span",{children:[tt.toLocaleString()," pts (max)"]})]}),(0,ne.jsx)("input",{type:"range",min:(null===Ie||void 0===Ie?void 0:Ie.min_points_to_use)||100,max:tt,value:ze,onChange:e=>Re(Number(e.target.value)),style:{width:"100%",height:"8px",borderRadius:"4px",background:"#E5E7EB",accentColor:"#635BFF"}}),(0,ne.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"12px",padding:"12px",background:"#EFF6FF",borderRadius:"8px"},children:[(0,ne.jsxs)("div",{children:[(0,ne.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:["Using: ",ze.toLocaleString()," pts"]}),(0,ne.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["(",(null===Ie||void 0===Ie?void 0:Ie.points_to_currency)||100," pts = ",(0,ue.vv)(1,c),")"]})]}),(0,ne.jsxs)("div",{style:{fontSize:"16px",fontWeight:"700",color:"#059669"},children:["-",(0,ue.vv)(Te,c)]})]})]})]}):(0,ne.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",padding:"12px"},children:["Minimum ",(null===Ie||void 0===Ie?void 0:Ie.min_points_to_use)||100," points required to use"]}),(null===Ie||void 0===Ie?void 0:Ie.points_per_currency)&&(0,ne.jsx)("div",{style:{marginTop:"12px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:(()=>{const e="VIP"===Ne?parseFloat(Ie.vip_bonus_rate):"Gold"===Ne?parseFloat(Ie.gold_bonus_rate):"Silver"===Ne?parseFloat(Ie.silver_bonus_rate):parseFloat(Ie.bronze_bonus_rate),t=Math.floor((Ge-L)*parseFloat(Ie.points_per_currency)*e),n=t/parseFloat(Ie.points_to_currency);return(0,ne.jsxs)(ne.Fragment,{children:["You will earn approximately ",(0,ne.jsx)("strong",{children:t.toLocaleString()})," points"," ","(",(0,ue.vv)(n,c)," value) from this order","Bronze"!==Ne&&` (${Ne} ${e}x bonus)`]})})()})]}),"dine-in"===sessionStorage.getItem("orderType")&&O.length>0&&(0,ne.jsxs)(Th,{children:[(0,ne.jsx)(lh,{children:"Table Number"}),(0,ne.jsxs)(Oh,{value:$,onChange:e=>M(e.target.value),children:[(0,ne.jsx)("option",{value:"",children:"Free Seating"}),O.map(e=>(0,ne.jsx)("option",{value:e,children:e},e))]})]}),(0,ne.jsxs)(sh,{children:[(0,ne.jsx)(lh,{children:"Payment Method *"}),!rt&&(0,ne.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginBottom:"12px",padding:"8px 12px",background:"#FEE2E2",borderRadius:"8px"},children:"Please select a payment method to continue"}),(0,ne.jsx)(mh,{children:nt.map(e=>(0,ne.jsxs)(gh,{selected:rt===e.key,children:[(0,ne.jsx)(fh,{type:"radio",name:"payment",checked:rt===e.key,onChange:()=>{console.log("\ud83d\udd35 Payment method changed to:",e.key),ot(e.key),C("")}}),(0,ne.jsx)(xh,{children:(0,ne.jsx)(yh,{children:e.label})})]},e.key))}),"card"===rt&&(0,ne.jsxs)(_h,{children:[(0,ne.jsx)(Eh,{type:"text",placeholder:"Card Number",value:F,onChange:e=>_((e=>{const t=e.replace(/\s+/g,"").replace(/[^0-9]/gi,"").match(/\d{4,16}/g),n=t&&t[0]||"",r=[];for(let o=0,i=n.length;o<i;o+=4)r.push(n.substring(o,o+4));return r.length?r.join(" "):e})(e.target.value)),maxLength:19}),(0,ne.jsx)(Eh,{type:"text",placeholder:"Cardholder Name",value:E,onChange:e=>P(e.target.value)}),(0,ne.jsxs)(Ph,{children:[(0,ne.jsx)(Eh,{type:"text",placeholder:"MM/YY",value:B,onChange:e=>z((e=>{const t=e.replace(/\s+/g,"").replace(/[^0-9]/gi,"");return t.length>=2?t.slice(0,2)+"/"+t.slice(2,4):t})(e.target.value)),maxLength:5}),(0,ne.jsx)(Eh,{type:"text",placeholder:"CVV",value:R,onChange:e=>T(e.target.value.replace(/\D/g,"")),maxLength:3})]})]})]})]}),(0,ne.jsx)(zh,{onClick:async()=>{if(console.log("\ud83d\udd35\ud83d\udd35\ud83d\udd35 PAY BUTTON CLICKED! \ud83d\udd35\ud83d\udd35\ud83d\udd35"),console.log("Payment method selected:",rt),console.log("Cart items count:",o.length),C(""),rt){S(!0);try{console.log("\ud83d\udd35 Step 1: Validating cart...");const e=await rp.validateCart(o.map(e=>({id:e.menuItem.id,quantity:e.quantity,price:e.totalPrice/e.quantity,options:e.selectedOptions})),(null===l||void 0===l?void 0:l.id)||"1");if(console.log("\ud83d\udd35 Step 2: Validation response:",e),!e.success||!e.data.isValid){const e="Some items in your cart have changed. Please review your order.";return console.error("\u274c Validation failed:",e),C(e),void S(!1)}if(console.log("\ud83d\udd35 Step 3: Preparing order..."),console.log("Order type:",qe),console.log("Payment method:",rt),console.log("\ud83d\udd35 Step 4: Processing payment for method:",rt),"payAtCounter"===rt||"counter"===rt){if(console.log("\ud83d\udd35 Processing counter payment..."),"delivery"===qe){if(!u&&(!p||!p.phone))return C("Please enter your contact information (Guest Order or Member)"),void S(!1);if(!U.trim())return C("Please enter your delivery address"),void S(!1);if(!Y.trim())return C("Please enter your phone number in Customer Information"),void S(!1);if(ee.length>0&&!J)return C("Please select a delivery zone"),void S(!1)}try{let e=null;if("delivery"===qe&&J&&ee.length>0){const t=ee.find(e=>e.id===J);e=(null===t||void 0===t?void 0:t.name)||null}const t={restaurant_id:(null===l||void 0===l?void 0:l.id)||1,customer_name:u?u.name:p&&p.name||"Guest",customer_phone:u?u.phone:p&&p.phone||null,table_number:$||null,subtotal:Ge,total_amount:Ze,tax:Ke,tax_rate:v.taxEnabled?v.taxRate:0,service_charge:Je,service_charge_rate:v.serviceChargeEnabled?v.serviceChargeRate:0,takeaway_charge:Ye,delivery_fee:Ve,points_used:ze>0?ze:null,point_discount:Te>0?Te:null,coupon_code:D&&L>0?D:null,coupon_discount:L>0?L:null,delivery_info:"delivery"===qe?{address:U,phone:Y,notes:Q,zoneName:e,zoneId:J}:null,scheduled_pickup_time:"pickup"===qe&&He?He:null,customer_id:u?u.id:null,status:"outstanding",order_type:"dine-in"===qe?"dine_in":qe,source:"mobile",payment_method:"counter",payment_status:"pending",kitchen_ready:!1,order_date:new Date,order_items:o.map(e=>{var t;const n=e.totalPrice/e.quantity,r=(null===(t=e.selectedOptionsData)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price})))||[];return{name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,quantity:e.quantity,price:n,basePrice:e.menuItem.price,optionPrice:n-e.menuItem.price,options:at(e),optionDetails:r,special_instructions:e.specialInstructions||null,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}})};console.log("\ud83d\udcbe Saving order to DATABASE...");const i=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok)throw new Error("Failed to save order to database");const d=(await i.json()).data;console.log("\u2705 Order saved to DB with ID:",d.id);const c=d.order_number,m=c?c.split("-")[1]:"001";u&&h(u.id,Ze),await it();const g=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");g.includes(d.id)||(g.push(d.id),localStorage.setItem("customerOrderIds",JSON.stringify(g))),s({id:d.id,pickupNumber:m,items:o,total:Ze,status:"outstanding",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"pending"}),a(),r(`/mobile/${n}/order/${d.id}`)}catch(A){return console.error("\u274c Failed to save order to DB:",A),C("Failed to create order. Please try again."),void S(!1)}}else if("bankTransfer"===rt||"bank_transfer"===rt||"bank"===rt||"qr"===rt||"qrPayment"===rt||"qr_payment"===rt){if(console.log("\ud83d\udd35 Processing QR / Bank Transfer payment - NOT saving order yet..."),"delivery"===qe){if(console.log("\ud83d\ude9a Delivery validation check:",{currentCustomer:!!u,guestInfo:p,deliveryAddress:U,deliveryPhone:Y,selectedZone:J}),!u&&(!p||!p.phone)){console.log("\u274c Validation failed: No customer/guest info");const e="Please enter your contact information (Guest Order or Member)";return C(e),alert(e),void S(!1)}if(!U.trim()){console.log("\u274c Validation failed: No delivery address");const e="Please enter your delivery address";return C(e),alert(e),void S(!1)}if(!Y.trim()){console.log("\u274c Validation failed: No delivery phone");const e="Please enter your phone number in Customer Information";return C(e),alert(e),void S(!1)}if(ee.length>0&&!J){console.log("\u274c Validation failed: No delivery zone selected");const e="Please select a delivery zone";return C(e),alert(e),void S(!1)}console.log("\u2705 Delivery validation passed")}let e=null;if("delivery"===qe&&J&&ee.length>0){const t=ee.find(e=>e.id===J);e=(null===t||void 0===t?void 0:t.name)||null}const t={restaurant_id:(null===l||void 0===l?void 0:l.id)||1,customer_name:u?u.name:p&&p.name||"Guest",customer_phone:u?u.phone:p&&p.phone||null,table_number:$||null,subtotal:Ge,total_amount:Ze,tax:Ke,tax_rate:v.taxEnabled?v.taxRate:0,service_charge:Je,service_charge_rate:v.serviceChargeEnabled?v.serviceChargeRate:0,takeaway_charge:Ye,delivery_fee:Ve,points_used:ze>0?ze:null,point_discount:Te>0?Te:null,delivery_info:"delivery"===qe?{address:U,phone:Y,notes:Q,zoneName:e,zoneId:J}:null,scheduled_pickup_time:"pickup"===qe&&He?He:null,status:"outstanding",order_type:"dine-in"===qe?"dine_in":qe,source:"mobile",payment_method:"qr"===rt||"qrPayment"===rt||"qr_payment"===rt?"QR Payment":"Bank Transfer",payment_status:"pending",kitchen_ready:!1,order_date:new Date,order_items:o.map(e=>{var t;const n=e.totalPrice/e.quantity,r=(null===(t=e.selectedOptionsData)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price})))||[];return{name:e.menuItem.name,quantity:e.quantity,price:n,basePrice:e.menuItem.price,optionPrice:n-e.menuItem.price,options:at(e),optionDetails:r,special_instructions:e.specialInstructions||null}}),customer_id:(null===u||void 0===u?void 0:u.id)||null};sessionStorage.setItem("pendingOrderData",JSON.stringify(t));const i="qr"===rt||"qrPayment"===rt||"qr_payment"===rt?`/mobile/${n}/payment/qr`:`/mobile/${n}/payment/bank-transfer`;console.log("\ud83d\udd35 Navigating to:",i),r(i),S(!1)}else if("card"===rt||"fpx"===rt){if(console.log("\ud83d\udd35 Processing card / FPX payment..."),"delivery"===qe){if(!u&&(!p||!p.phone))return C("Please enter your contact information (Guest Order or Member)"),void S(!1);if(!U.trim())return C("Please enter your delivery address"),void S(!1);if(!Y.trim())return C("Please enter your phone number in Customer Information"),void S(!1);if(ee.length>0&&!J)return C("Please select a delivery zone"),void S(!1)}try{let e=null;if("delivery"===qe&&J&&ee.length>0){const t=ee.find(e=>e.id===J);e=(null===t||void 0===t?void 0:t.name)||null}const t={restaurant_id:(null===l||void 0===l?void 0:l.id)||1,customer_id:u?u.id:null,customer_name:u?u.name:p&&p.name||"Guest",customer_phone:u?u.phone:p&&p.phone||null,table_number:$||null,subtotal:Ge,total_amount:Ze,tax:Ke,tax_rate:v.taxEnabled?v.taxRate:0,service_charge:Je,service_charge_rate:v.serviceChargeEnabled?v.serviceChargeRate:0,takeaway_charge:Ye,delivery_fee:Ve,points_used:ze>0?ze:null,point_discount:Te>0?Te:null,coupon_code:D&&L>0?D:null,coupon_discount:L>0?L:null,delivery_info:"delivery"===qe?{address:U,phone:Y,notes:Q,zoneName:e,zoneId:J}:null,scheduled_pickup_time:"pickup"===qe&&He?He:null,status:"pending",order_type:"dine-in"===qe?"dine_in":qe,source:"mobile",payment_method:"card"===rt?"Card":"FPX",payment_status:"completed",kitchen_ready:!1,order_date:new Date,order_items:o.map(e=>{var t;const n=e.totalPrice/e.quantity,r=(null===(t=e.selectedOptionsData)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price})))||[];return{name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,quantity:e.quantity,price:n,basePrice:e.menuItem.price,optionPrice:n-e.menuItem.price,options:at(e),optionDetails:r,special_instructions:e.specialInstructions||null,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}})};console.log("\ud83d\udcbe Saving card/FPX order to DATABASE..."),await new Promise(e=>setTimeout(e,2e3));const i=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok)throw new Error("Failed to save order to database");const d=(await i.json()).data;console.log("\u2705 Card/FPX order saved to DB with ID:",d.id);const c=d.order_number,m=c?c.split("-")[1]:"001";u&&h(u.id,Ze),await it();const g=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");g.includes(d.id)||(g.push(d.id),localStorage.setItem("customerOrderIds",JSON.stringify(g))),s({id:d.id,pickupNumber:m,items:o,total:Ze,status:"pending",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"completed"}),a(),console.log("\u2705 Card / FPX payment saved, navigating..."),r(`/mobile/${n}/order/${d.id}`)}catch(A){return console.error("\u274c Failed to save card/FPX order to DB:",A),C("Failed to create order. Please try again."),void S(!1)}}else console.error("\u274c Invalid payment method:",rt),C("Invalid payment method selected."),S(!1)}catch(e){const t=(null===e||void 0===e?void 0:e.message)||"Payment failed. Please try again.";console.error("\u274c\u274c\u274c PAYMENT ERROR CAUGHT \u274c\u274c\u274c"),console.error("Error details:",e),console.error("Error message:",t),C(t),alert(`Payment Error: ${t}`)}finally{console.log("\ud83d\udd35 Finally block executing..."),console.log("Current processing state:",k),S(!1),console.log("\u2705 Finally block complete")}}else C("Please select a payment method")},disabled:k||0===o.length,children:k?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Rh,{}),"Processing..."]}):(0,ne.jsxs)(ne.Fragment,{children:["Pay ",(0,ue.vv)(Ze,c)]})}),(0,ne.jsx)(Xp.A,{})]})},Jh=Z.Ay.div`
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
`,Xh=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,Zh=Z.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
`,em=Z.Ay.div`
  font-size: 48px;
  font-weight: 700;
  color: #635BFF;
  margin: 16px 0;
`,tm=Z.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0;
`,nm=Z.Ay.div`
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,rm=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1E40AF;
  margin-bottom: 8px;
`,om=Z.Ay.div`
  font-size: 13px;
  color: #1E40AF;
  line-height: 1.6;
`,im=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,am=Z.Ay.div`
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 32px 16px;
  text-align: center;
  background: #FAFBFC;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.02);
  }
`,sm=Z.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
`,lm=Z.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
`,dm=Z.Ay.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid #E5E7EB;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`,cm=Z.Ay.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`,um=Z.Ay.div`
  text-align: center;
  margin: 24px 0;
  color: #9CA3AF;
  font-size: 14px;
  font-weight: 500;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background: #E5E7EB;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`,pm=Z.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px; /* Prevents iOS/mobile auto-zoom on focus */
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,hm=Z.Ay.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,mm=Z.Ay.input`
  display: none;
`,gm=Z.Ay.button`
  background: none;
  border: none;
  color: #1F2937;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  text-decoration: underline;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`,fm=()=>{const{slug:t}=(0,X.g)(),n=(0,X.Zp)(),r=(0,X.zy)(),{setCurrentOrder:o,clearCart:i,currentStore:a,currency:s}=Qc(),l=(0,e.useRef)(null),d=sessionStorage.getItem("pendingOrderData"),c=d?JSON.parse(d):r.state,u=(null===c||void 0===c?void 0:c.total_amount)||(null===c||void 0===c?void 0:c.total)||0,p=null===c||void 0===c?void 0:c.id;console.log("\ud83d\udd35 QRPaymentPage - orderData:",c),console.log("\ud83d\udd35 QRPaymentPage - orderId:",p),console.log("\ud83d\udd35 QRPaymentPage - total:",u);const[h,m]=(0,e.useState)(null),[g,f]=(0,e.useState)(""),[x,y]=(0,e.useState)(""),[b,v]=(0,e.useState)(!1),[w,j]=(0,e.useState)(null);e.useEffect(()=>{(async()=>{try{if(null===a||void 0===a||!a.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load QR code");const n=await fetch(`/api/restaurants/${a.id}`);if(n.ok){var e,t;const r=await n.json(),o=r.data||r,i=(null===(e=o.payment_settings)||void 0===e?void 0:e.qrPayment)||(null===(t=o.payment_settings)||void 0===t?void 0:t.qr);null!==i&&void 0!==i&&i.qrImage?(j(i.qrImage),console.log("\u2705 QR Code image loaded from settings")):console.log("\u274c No QR image found in payment settings")}}catch(n){console.error("Failed to load QR code:",n)}})()},[null===a||void 0===a?void 0:a.id]);const k=e=>{if(e.size>5242880)return void alert("Image size must be less than 5MB");if(!e.type.startsWith("image/"))return void alert("Please upload an image file");const t=new FileReader;t.onloadend=()=>{m(t.result),f(e.name)},t.readAsDataURL(e)};return(0,ne.jsxs)(Iu,{title:"QR Payment",showBack:!0,onBack:()=>n(`/mobile/${t}/payment`),children:[(0,ne.jsxs)(Jh,{children:[(0,ne.jsxs)(Xh,{children:[(0,ne.jsx)(em,{children:(0,ue.vv)(u,s)}),(0,ne.jsx)(tm,{children:w?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)("img",{src:w,alt:"QR Code for Payment",style:{width:"280px",height:"280px",borderRadius:"12px",objectFit:"contain"}}),(0,ne.jsx)(gm,{onClick:()=>{if(!w)return void alert("QR Code image not available");const e=document.createElement("a");e.href=w,e.download=`QR-Payment-${u.toFixed(2)}.png`,document.body.appendChild(e),e.click(),document.body.removeChild(e)},children:"Download QR Code"})]}):(0,ne.jsxs)("div",{style:{width:"280px",height:"280px",background:"white",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"12px",color:"#6B7280",fontSize:"16px",fontWeight:"600",textAlign:"center",padding:"20px",border:"1px solid #E5E7EB"},children:["QR Code",(0,ne.jsx)("br",{}),"(Loading...)",(0,ne.jsx)("br",{}),(0,ue.vv)(u,s)]})})]}),(0,ne.jsxs)(nm,{children:[(0,ne.jsx)(rm,{children:"\ud83d\udcf1 How to Pay"}),(0,ne.jsxs)(om,{children:["1. Open your banking app (Maybank, CIMB, etc.)",(0,ne.jsx)("br",{}),'2. Select "Scan & Pay" or "DuitNow QR"',(0,ne.jsx)("br",{}),"3. Scan the QR code above",(0,ne.jsx)("br",{}),"4. Complete payment in your banking app",(0,ne.jsx)("br",{}),"5. Upload payment screenshot or enter reference number below"]})]}),(0,ne.jsxs)(im,{children:[(0,ne.jsx)(Zh,{children:"Payment Proof"}),h?(0,ne.jsxs)(dm,{children:[(0,ne.jsx)("img",{src:h,alt:"Payment receipt"}),(0,ne.jsx)(cm,{onClick:()=>{m(null),f(""),l.current&&(l.current.value="")},children:"\xd7"})]}):(0,ne.jsxs)(am,{onClick:()=>{var e;return null===(e=l.current)||void 0===e?void 0:e.click()},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{var t;e.preventDefault(),e.stopPropagation();const n=null===(t=e.dataTransfer.files)||void 0===t?void 0:t[0];n&&k(n)},children:[(0,ne.jsx)(sm,{children:"Upload Payment Screenshot"}),(0,ne.jsx)(lm,{children:"PNG, JPG up to 5MB"})]}),(0,ne.jsx)(mm,{ref:l,type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];n&&k(n)}}),g&&(0,ne.jsxs)("div",{style:{fontSize:"13px",color:"#059669",marginBottom:"16px",padding:"8px 12px",background:"#F0FDF4",borderRadius:"6px"},children:["\u2713 ",g]}),(0,ne.jsx)(um,{children:"OR"}),(0,ne.jsx)(pm,{type:"text",placeholder:"Enter Transaction Reference Number",value:x,onChange:e=>y(e.target.value)})]})]}),(0,ne.jsx)(hm,{onClick:async()=>{if(h||x){v(!0);try{const e=sessionStorage.getItem("pendingOrderData");if(!e)return alert("Order data not found. Please go back and try again."),void v(!1);const r=JSON.parse(e),a={...r,payment_status:"payment_verification_pending",payment_proof:{image:h,reference:x,file_name:g,uploaded_at:(new Date).toISOString()}};console.log("\ud83d\udcbe Creating order with payment proof in DATABASE...");const s=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!s.ok)throw new Error("Failed to create order in database");const l=(await s.json()).data;console.log("\u2705 Order created in DB with ID:",l.id);const d=l.order_number,c=d?d.split("-")[1]:"001",u=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");u.includes(l.id)||(u.push(l.id),localStorage.setItem("customerOrderIds",JSON.stringify(u))),o({id:l.id,pickupNumber:c,items:r.order_items,total:r.total_amount,status:"outstanding",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"pending"}),i(),sessionStorage.removeItem("pendingOrderData"),n(`/mobile/${t}/order/${l.id}`)}catch(e){console.error("Error submitting payment proof:",e),alert("Failed to submit payment proof. Please try again.")}finally{v(!1)}}else alert("Please upload payment receipt or enter transaction reference number")},disabled:b||!h&&!x,children:b?"Submitting...":"Confirm Payment"})]})},xm=Z.Ay.div`
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
`,ym=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,bm=Z.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
`,vm=Z.Ay.div`
  font-size: 48px;
  font-weight: 700;
  color: #635BFF;
  margin: 16px 0 24px;
  text-align: center;
`,wm=Z.Ay.div`
  background: #FAFBFC;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`,jm=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`,km=Z.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,Sm=Z.Ay.div`
  font-size: 14px;
  color: #1F2937;
  font-weight: 600;
  text-align: right;
`,Am=Z.Ay.button`
  background: #EFF6FF;
  color: #1E40AF;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 8px;

  &:hover {
    background: #DBEAFE;
  }

  &:active {
    transform: scale(0.95);
  }
`,Cm=Z.Ay.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,Fm=Z.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
`,_m=Z.Ay.div`
  font-size: 13px;
  color: #92400E;
  line-height: 1.6;
`,Em=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,Pm=Z.Ay.div`
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 32px 16px;
  text-align: center;
  background: #FAFBFC;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.02);
  }

  &:after {
    content: 'Drag & Drop or Click to Upload';
    color: #9CA3AF;
    font-size: 14px;
  }
`,Bm=Z.Ay.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid #E5E7EB;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`,zm=Z.Ay.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`,Rm=Z.Ay.div`
  text-align: center;
  margin: 24px 0;
  color: #9CA3AF;
  font-size: 14px;
  font-weight: 500;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background: #E5E7EB;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`,Tm=Z.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px; /* Prevents iOS/mobile auto-zoom on focus */
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,Om=Z.Ay.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,Im=Z.Ay.input`
  display: none;
`,$m=()=>{const{slug:t}=(0,X.g)(),n=(0,X.Zp)(),r=(0,X.zy)(),{setCurrentOrder:o,clearCart:i,currentStore:a,currency:s}=Qc(),l=(0,e.useRef)(null),d=sessionStorage.getItem("pendingOrderData"),c=d?JSON.parse(d):r.state,u=(null===c||void 0===c?void 0:c.total_amount)||(null===c||void 0===c?void 0:c.total)||0,[p,h]=(0,e.useState)(null),[m,g]=(0,e.useState)(""),[f,x]=(0,e.useState)(""),[y,b]=(0,e.useState)(!1),[v,w]=(0,e.useState)(null),[j,k]=(0,e.useState)({bankName:"Loading...",accountName:"Loading...",accountNumber:"Loading..."});e.useEffect(()=>{(async()=>{try{if(null===a||void 0===a||!a.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load bank details");const t=await fetch(`/api/restaurants/${a.id}`);if(t.ok){var e;const n=await t.json(),r=n.data||n;if(null!==(e=r.payment_settings)&&void 0!==e&&e.bankTransfer){const e=r.payment_settings.bankTransfer;k({bankName:e.bankName||"Maybank",accountName:e.accountName||"ABC Restaurant Sdn Bhd",accountNumber:e.accountNumber||"514-123-456-789"})}else k({bankName:"Maybank",accountName:"ABC Restaurant Sdn Bhd",accountNumber:"514-123-456-789"})}}catch(t){console.error("Failed to load bank details:",t),k({bankName:"Maybank",accountName:"ABC Restaurant Sdn Bhd",accountNumber:"514-123-456-789"})}})()},[null===a||void 0===a?void 0:a.id]);const S=(e,t)=>{navigator.clipboard.writeText(e),w(t),setTimeout(()=>w(null),2e3)},A=e=>{if(e.size>5242880)return void alert("Image size must be less than 5MB");if(!e.type.startsWith("image/"))return void alert("Please upload an image file");const t=new FileReader;t.onloadend=()=>{h(t.result),g(e.name)},t.readAsDataURL(e)};return(0,ne.jsxs)(Iu,{title:"Bank Transfer",showBack:!0,onBack:()=>n(`/mobile/${t}/payment`),children:[(0,ne.jsxs)(xm,{children:[(0,ne.jsxs)(ym,{children:[(0,ne.jsx)(vm,{children:(0,ue.vv)(u,s)}),(0,ne.jsxs)(wm,{children:[(0,ne.jsxs)(jm,{children:[(0,ne.jsx)(km,{children:"Bank Name"}),(0,ne.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,ne.jsx)(Sm,{children:j.bankName}),(0,ne.jsx)(Am,{onClick:()=>S(j.bankName,"bankName"),children:"bankName"===v?"Copied!":"Copy"})]})]}),(0,ne.jsxs)(jm,{children:[(0,ne.jsx)(km,{children:"Account Name"}),(0,ne.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,ne.jsx)(Sm,{children:j.accountName}),(0,ne.jsx)(Am,{onClick:()=>S(j.accountName,"accountName"),children:"accountName"===v?"Copied!":"Copy"})]})]}),(0,ne.jsxs)(jm,{children:[(0,ne.jsx)(km,{children:"Account Number"}),(0,ne.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,ne.jsx)(Sm,{children:j.accountNumber}),(0,ne.jsx)(Am,{onClick:()=>S(j.accountNumber,"accountNumber"),children:"accountNumber"===v?"Copied!":"Copy"})]})]})]})]}),(0,ne.jsxs)(Cm,{children:[(0,ne.jsx)(Fm,{children:"\u26a0\ufe0f Important"}),(0,ne.jsxs)(_m,{children:["1. Transfer exactly ",(0,ne.jsx)("strong",{children:(0,ue.vv)(u,s)})," to the account above",(0,ne.jsx)("br",{}),"2. Keep your transaction receipt",(0,ne.jsx)("br",{}),"3. Upload the receipt or enter reference number below",(0,ne.jsx)("br",{}),"4. Your order will be confirmed after verification"]})]}),(0,ne.jsxs)(Em,{children:[(0,ne.jsx)(bm,{children:"Payment Proof"}),p?(0,ne.jsxs)(Bm,{children:[(0,ne.jsx)("img",{src:p,alt:"Payment receipt"}),(0,ne.jsx)(zm,{onClick:()=>{h(null),g(""),l.current&&(l.current.value="")},children:"\xd7"})]}):(0,ne.jsx)(Pm,{onClick:()=>{var e;return null===(e=l.current)||void 0===e?void 0:e.click()},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{var t;e.preventDefault(),e.stopPropagation();const n=null===(t=e.dataTransfer.files)||void 0===t?void 0:t[0];n&&A(n)}}),(0,ne.jsx)(Im,{ref:l,type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];n&&A(n)}}),m&&(0,ne.jsxs)("div",{style:{fontSize:"13px",color:"#059669",marginBottom:"16px",padding:"8px 12px",background:"#F0FDF4",borderRadius:"6px"},children:["\u2713 ",m]}),(0,ne.jsx)(Rm,{children:"OR"}),(0,ne.jsx)(Tm,{type:"text",placeholder:"Enter Transfer Reference Number",value:f,onChange:e=>x(e.target.value)})]})]}),(0,ne.jsx)(Om,{onClick:async()=>{if(p||f){b(!0);try{const e=sessionStorage.getItem("pendingOrderData");if(!e)return alert("Order data not found. Please go back and try again."),void b(!1);const r=JSON.parse(e),a={...r,payment_status:"payment_verification_pending",payment_proof:{image:p,reference:f,file_name:m,uploaded_at:(new Date).toISOString()}};console.log("\ud83d\udcbe Creating order with payment proof in DATABASE...");const s=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!s.ok)throw new Error("Failed to create order in database");const l=(await s.json()).data;console.log("\u2705 Order created in DB with ID:",l.id);const d=l.order_number,c=d?d.split("-")[1]:"001",u=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");u.includes(l.id)||(u.push(l.id),localStorage.setItem("customerOrderIds",JSON.stringify(u))),o({id:l.id,pickupNumber:c,items:r.order_items,total:r.total_amount,status:"outstanding",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"pending"}),i(),sessionStorage.removeItem("pendingOrderData"),n(`/mobile/${t}/order/${l.id}`)}catch(e){console.error("Error submitting payment proof:",e),alert("Failed to submit payment proof. Please try again.")}finally{b(!1)}}else alert("Please upload payment receipt or enter transfer reference number")},disabled:y||!p&&!f,children:y?"Submitting...":"Confirm Payment"})]})},Mm=e=>{const t=new Date(e),n=new Date(t.getTime()+18e5),r=e=>{const t=e.getHours(),n=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:n}},o=r(t),i=r(n);return o.period===i.period?`${o.time} - ${i.time} ${i.period}`:`${o.time} ${o.period} - ${i.time} ${i.period}`},Dm=Z.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
`,Nm=Z.Ay.div`
  background: linear-gradient(135deg, #635BFF 0%, #4F46E5 100%);
  color: white;
  border-radius: 20px;
  padding: 32px 48px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(99, 91, 255, 0.3);
  margin-bottom: 32px;
`,Lm=Z.Ay.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
`,qm=Z.Ay.div`
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
`,Hm=Z.Ay.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 32px;
`,Wm=Z.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Um=Z.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${e=>e.completed?"#10B981":e.active?"#635BFF":"#E5E7EB"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin-right: 16px;
  position: relative;

  ${e=>e.active&&"\n    &::after {\n      content: '';\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      border: 3px solid #635BFF;\n      animation: pulse 2s infinite;\n    }\n\n    @keyframes pulse {\n      0% {\n        transform: scale(1);\n        opacity: 1;\n      }\n      100% {\n        transform: scale(1.3);\n        opacity: 0;\n      }\n    }\n  "}
`,Gm=Z.Ay.div`
  flex: 1;
`,Ym=Z.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: ${e=>e.active||e.completed?"#1F2937":"#9CA3AF"};
  margin-bottom: 4px;
`,Vm=Z.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Qm=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`,Km=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Jm=Z.Ay.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`,Xm=Z.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Zm=Z.Ay.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`,eg=Z.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`,tg=(0,Z.Ay)(eg)`
  background: #635BFF;
  color: white;
  border: none;
  
  &:active {
    background: #5A51E6;
  }
`,ng=(0,Z.Ay)(eg)`
  background: white;
  color: #6B7280;
  border: 1px solid #E5E7EB;
  
  &:active {
    background: #F9FAFB;
  }
`,rg=()=>{const{slug:t,orderId:n}=(0,X.g)(),r=(0,X.Zp)(),{currency:o}=Qc(),[i,a]=(0,e.useState)(null),[s,l]=(0,e.useState)(!0),[d,c]=(0,e.useState)(null);(0,e.useEffect)(()=>{n&&u();const e=e=>{"pos_orders"!==e.key&&"guestOrders"!==e.key||!n||u(!0)},t=()=>{n&&u(!0)};window.addEventListener("storage",e),window.addEventListener("storage",t);const r=setInterval(()=>{n&&"completed"!==(null===i||void 0===i?void 0:i.status)&&u(!0)},3e3);return()=>{clearInterval(r),window.removeEventListener("storage",e),window.removeEventListener("storage",t)}},[n]);const u=async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!n)return c("No order ID provided"),void l(!1);e||(l(!0),c(null));try{console.log("\ufffd\ufffd Loading order with ID:",n);try{const t=await fetch(`/api/mobile/order/${n}`);if(console.log("\ud83d\udce1 API response status:",t.status),t.ok){const n=await t.json();console.log("\ud83d\udce6 API response data:",n);const r=n.data||n;if(r&&(r.id||r.orderNumber))return console.log("\u2705 Loaded order from API:",r),a({...r,estimatedPickupTime:r.estimatedPickupTime||new Date(new Date(r.createdAt||r.order_date||Date.now()).getTime()+9e5)}),c(null),void(e||l(!1));console.warn("\u26a0\ufe0f API order data is incomplete:",r)}else{console.log("\u26a0\ufe0f API response not OK:",t.status);const e=await t.text();console.log("\u26a0\ufe0f Error response:",e)}}catch(t){console.error("\u274c Failed to load order from database:",t),e||c("Order not found")}}catch(d){console.error("\u274c Error loading order:",d),e||c("Failed to load order")}finally{e||l(!1)}},p=()=>{r(`/mobile/${t}/menu`)},h=()=>{r(`/mobile/${t}`)};if(s)return(0,ne.jsx)(Iu,{title:"Loading Order...",children:(0,ne.jsx)(Dm,{children:(0,ne.jsx)("div",{style:{color:"#9CA3AF",fontSize:"16px",textAlign:"center",padding:"48px 24px"},children:"Loading your order..."})})});if(d||!i)return(0,ne.jsx)(Iu,{title:"Order Not Found",children:(0,ne.jsxs)(Dm,{children:[(0,ne.jsx)("div",{style:{color:"#9CA3AF",fontSize:"16px",textAlign:"center",padding:"48px 24px"},children:d||"This order could not be found."}),(0,ne.jsx)("div",{style:{textAlign:"center",marginTop:"16px"},children:(0,ne.jsx)(ng,{onClick:()=>r(`/mobile/${t}`),children:"Back to Home"})})]})});const m=()=>{try{return i.table_number||i.tableNumber||null}catch(d){return null}},g=()=>{const e=m();if(e){return`T${String(e).replace(/^T/i,"")}`}return(()=>{try{if(m())return null;if(i.pickup_number)return i.pickup_number;if(i.pickupNumber)return i.pickupNumber;const e=i.order_number||i.orderNumber;if(e&&"string"===typeof e&&e.includes("-")){const t=e.split("-");if(t.length>1)return t[t.length-1]}if(i.id){const e=String(i.id);return(e.startsWith("ORD")?e.substring(3):e).padStart(3,"0")}return"000"}catch(d){return console.error("Error getting pickup number:",d),"000"}})()},f=()=>{try{return i.order_number||i.orderNumber||i.id||"N/A"}catch(d){return console.error("Error getting order number:",d),"N/A"}},x=()=>{try{const e=i.total_amount||i.total||0,t=parseFloat(e);return isNaN(t)?(console.error("Invalid total amount:",e),0):t}catch(d){return console.error("Error getting total amount:",d),0}},y=()=>{try{return i.payment_status||i.paymentStatus||"pending"}catch(d){return console.error("Error getting payment status:",d),"pending"}},b=()=>{try{return i.order_items||i.items||[]}catch(d){return console.error("Error getting order items:",d),[]}},v=(()=>{if(!i)return[];const e="payment_verification_pending"===(i.payment_status||i.paymentStatus),t="outstanding"===(null===i||void 0===i?void 0:i.status),n=e?[{id:"payment_verification_pending",title:"Payment Verification",icon:"1",time:"Verifying payment..."},{id:"pending",title:"Order Placed",icon:"2",time:"Pending"},{id:"preparing",title:"Preparing",icon:"3",time:"Waiting"},{id:"ready",title:"Ready for Pickup",icon:"4",time:"Waiting"},{id:"completed",title:"Completed",icon:"\u2713",time:""}]:t?[{id:"outstanding",title:"Awaiting Payment",icon:"1",time:"Staff is waiting at counter..."},{id:"pending",title:"Order Placed",icon:"2",time:"Pending"},{id:"preparing",title:"Preparing",icon:"3",time:"Waiting"},{id:"ready",title:"Ready for Pickup",icon:"4",time:"Waiting"},{id:"completed",title:"Completed",icon:"\u2713",time:""}]:[{id:"pending",title:"Order Placed",icon:"1",time:"Just now"},{id:"preparing",title:"Preparing",icon:"2",time:"In 2 min"},{id:"ready",title:"Ready for Pickup",icon:"3",time:"In 15 min"},{id:"completed",title:"Completed",icon:"\u2713",time:""}];let r=null===i||void 0===i?void 0:i.status;e?r="payment_verification_pending":t&&(r="outstanding");const o=n.findIndex(e=>e.id===r);return n.map((e,t)=>({...e,active:t===o,completed:t<o}))})();try{var w;return(0,ne.jsx)(Iu,{title:"Order Status",currentPage:"orders",children:(0,ne.jsxs)(Dm,{children:[(0,ne.jsxs)(Nm,{children:[(0,ne.jsx)(Lm,{children:m()?"Your Table Number":"Your Pickup Number"}),(0,ne.jsx)(qm,{children:g()}),"pickup"===(null===i||void 0===i?void 0:i.order_type)&&(0,ne.jsxs)("div",{style:{fontSize:"14px",color:"#8B5CF6",fontWeight:"600",marginTop:"8px"},children:["Pickup: ",null!==i&&void 0!==i&&i.scheduled_pickup_time?Mm(i.scheduled_pickup_time):"ASAP"]})]}),(0,ne.jsx)(Hm,{children:v.map(e=>(0,ne.jsxs)(Wm,{active:e.active,completed:e.completed,children:[(0,ne.jsx)(Um,{active:e.active,completed:e.completed,children:e.icon}),(0,ne.jsxs)(Gm,{children:[(0,ne.jsx)(Ym,{active:e.active,completed:e.completed,children:e.title}),e.time&&(0,ne.jsx)(Vm,{children:e.time})]})]},e.id))}),(0,ne.jsxs)(Qm,{children:[(0,ne.jsxs)(Km,{children:[(0,ne.jsx)("span",{style:{color:"#6B7280"},children:"Order Number"}),(0,ne.jsx)("span",{style:{fontWeight:600},children:f()})]}),(0,ne.jsxs)(Km,{children:[(0,ne.jsx)("span",{style:{color:"#6B7280"},children:"Total Amount"}),(0,ne.jsx)("span",{style:{fontWeight:600},children:(0,ue.vv)(x(),o)})]}),(i.point_discount||i.points_used)&&Number(i.point_discount||0)>0&&(0,ne.jsxs)(Km,{children:[(0,ne.jsx)("span",{style:{color:"#6B7280"},children:"Points Used"}),(0,ne.jsxs)("span",{style:{fontWeight:600,color:"#10B981"},children:["-",(0,ue.vv)(Number(i.point_discount),o)," (",null===(w=i.points_used)||void 0===w?void 0:w.toLocaleString()," pts)"]})]}),(0,ne.jsxs)(Km,{children:[(0,ne.jsx)("span",{style:{color:"#6B7280"},children:"Payment"}),(0,ne.jsx)("span",{style:{fontWeight:600,color:"payment_verification_pending"===y()?"#F59E0B":"completed"===y()||"paid"===y()?"#10B981":"#6B7280"},children:"payment_verification_pending"===y()?"Verifying Payment":"completed"===y()||"paid"===y()?"\u2713 Paid":"Pay at Counter"})]}),b().length>0&&(0,ne.jsx)(Jm,{children:b().map((e,t)=>{try{var n;const r=(null===e||void 0===e||null===(n=e.menuItem)||void 0===n?void 0:n.name)||(null===e||void 0===e?void 0:e.name)||"Item",o=(null===e||void 0===e?void 0:e.quantity)||1,i=(null===e||void 0===e?void 0:e.options)||(null===e||void 0===e?void 0:e.selectedOptions)||[],a=(null===e||void 0===e?void 0:e.special_instructions)||(null===e||void 0===e?void 0:e.specialInstructions);return(0,ne.jsxs)("div",{style:{marginBottom:"8px"},children:[(0,ne.jsxs)(Xm,{children:[o,"x ",r,i.length>0&&` (${i.join(", ")})`]}),a&&(0,ne.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"2px",paddingLeft:"16px"},children:["Note: ",a]})]},(null===e||void 0===e?void 0:e.id)||`item-${t}`)}catch(r){return console.error("Error rendering item:",r),null}})}),(null===i||void 0===i?void 0:i.delivery_info)&&(0,ne.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#F3F4F6",borderRadius:"8px"},children:[(0,ne.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"8px"},children:"Delivery Information"}),(0,ne.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[(0,ne.jsx)("div",{style:{marginBottom:"4px"},children:i.delivery_info.address}),(0,ne.jsxs)("div",{style:{marginBottom:"4px"},children:["Phone: ",i.delivery_info.phone]}),i.delivery_info.zoneName&&(0,ne.jsxs)("div",{style:{marginBottom:"4px"},children:["Zone: ",i.delivery_info.zoneName]}),i.delivery_info.notes&&(0,ne.jsxs)("div",{style:{fontStyle:"italic"},children:["Notes: ",i.delivery_info.notes]})]})]})]}),"payment_verification_pending"===y()&&(0,ne.jsxs)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"24px",width:"100%",maxWidth:"400px"},children:[(0,ne.jsx)("div",{style:{color:"#92400E",fontWeight:600,marginBottom:"8px"},children:"Payment Verification in Progress"}),(0,ne.jsx)("div",{style:{color:"#92400E",fontSize:"13px"},children:"Your payment is being verified by our staff. You will be notified once confirmed."}),(()=>{try{const e=i.payment_proof||i.paymentProof;if(e&&"object"===typeof e){const t=e.reference,n=e.file_name||e.fileName;if(t||n)return(0,ne.jsxs)("div",{style:{marginTop:"12px",padding:"8px",background:"white",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:[t&&(0,ne.jsxs)("div",{children:["Reference: ",(0,ne.jsx)("strong",{children:t})]}),n&&(0,ne.jsxs)("div",{children:["Receipt: ",n]})]})}}catch(e){console.error("Error rendering payment proof:",e)}return null})()]}),"outstanding"===(null===i||void 0===i?void 0:i.status)&&"counter"===(null===i||void 0===i?void 0:i.payment_method)&&(0,ne.jsxs)("div",{style:{background:"#EBF8FF",border:"1px solid #635BFF",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"24px",width:"100%",maxWidth:"400px"},children:[(0,ne.jsx)("div",{style:{color:"#1E40AF",fontWeight:600,marginBottom:"8px"},children:"Awaiting Payment at Counter"}),(0,ne.jsx)("div",{style:{color:"#1E40AF",fontSize:"13px"},children:"Please proceed to the counter to complete your payment. Our staff is waiting to assist you."})]}),"ready"===(null===i||void 0===i?void 0:i.status)&&(0,ne.jsx)("div",{style:{background:"#D1FAE5",border:"1px solid #10B981",borderRadius:"8px",padding:"12px 16px",textAlign:"center",marginBottom:"24px",width:"100%",maxWidth:"400px"},children:(0,ne.jsx)("div",{style:{color:"#065F46",fontWeight:600},children:"Your order is ready for pickup!"})}),"completed"===(null===i||void 0===i?void 0:i.status)&&(0,ne.jsxs)(Zm,{children:[(0,ne.jsx)(ng,{onClick:h,children:"Home"}),(0,ne.jsx)(tg,{onClick:p,children:"New Order"})]})]})})}catch(j){return console.error("\u274c Error rendering order tracking page:",j),(0,ne.jsx)(Iu,{title:"Error",children:(0,ne.jsxs)(Dm,{children:[(0,ne.jsx)("div",{style:{color:"#EF4444",fontSize:"16px",textAlign:"center",padding:"48px 24px"},children:"An error occurred while displaying your order."}),(0,ne.jsx)("div",{style:{textAlign:"center",marginTop:"16px"},children:(0,ne.jsx)(ng,{onClick:()=>r(`/mobile/${t}`),children:"Back to Home"})})]})})}},og=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,ig=Z.Ay.div`
  text-align: center;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,ag=Z.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,sg=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,lg=Z.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`,dg=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,cg=Z.Ay.div`
  flex: 1;
`,ug=Z.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,pg=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,hg=Z.Ay.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"completed":return"#D1FAE5";case"preparing":case"payment_verification_pending":return"#FEF3C7";case"ready":return"#DBEAFE";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#065F46";case"preparing":case"payment_verification_pending":return"#92400E";case"ready":return"#1E40AF";case"cancelled":return"#991B1B";default:return"#374151"}}};
`,mg=Z.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`,gg=Z.Ay.div`
  font-size: 14px;
  color: #4B5563;
  display: flex;
  justify-content: space-between;
`,fg=Z.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
`,xg=Z.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,yg=Z.Ay.div`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${e=>{switch(e.orderType){case"dine-in":case"dine_in":return"#E0E7FF";case"takeaway":return"#FEF3C7";case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.orderType){case"dine-in":case"dine_in":return"#3730A3";case"takeaway":return"#92400E";case"pickup":return"#6D28D9";case"delivery":return"#065F46";default:return"#374151"}}};
`,bg=e=>{switch(e){case"dine-in":case"dine_in":return"Dine In";case"takeaway":return"Takeaway";case"pickup":return"Pre-order Pickup";case"delivery":return"Delivery";default:return e}},vg=()=>{const t=(0,X.Zp)(),{slug:n}=(0,X.g)(),[r,o]=(0,e.useState)([]),{currentStore:i,setCurrentStore:a,currency:s}=Qc(),{currentCustomer:l}=(0,le.c)();(0,e.useEffect)(()=>{(async()=>{if(!i&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&a({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,i,a]),(0,e.useEffect)(()=>{if(i){d();const e=setInterval(()=>{d()},5e3);return()=>{clearInterval(e)}}},[i,l]);const d=async()=>{if(i)try{if(l&&l.id){console.log("\ud83d\udd04 Loading orders for logged-in customer:",l.id,"restaurant:",i.id);const e=await fetch(`/api/customers/${l.id}/orders?restaurant_id=${i.id}&limit=100`);if(e.ok){const t=await e.json();if(t.success&&t.data)return console.log(`\u2705 Loaded ${t.data.length} orders for customer from API`),void o(t.data)}return console.log("\u2139\ufe0f No orders found for this customer"),void o([])}console.log("\ud83d\udd04 Loading guest orders from localStorage...");const e=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");if(0===e.length)return console.log("\u2139\ufe0f No orders found in localStorage"),void o([]);console.log(`\ud83d\udccb Found ${e.length} order IDs in localStorage:`,e);const t=e.map(async e=>{try{const t=await fetch(`/api/mobile/order/${e}`);if(t.ok){return(await t.json()).data}return null}catch(t){return console.error(`Failed to load order ${e}:`,t),null}}),n=(await Promise.all(t)).filter(e=>null!==e);console.log(`\u2705 Loaded ${n.length} orders from API`);const r=[...n].sort((e,t)=>{const n=new Date(e.createdAt||e.order_date||e.created_at).getTime();return new Date(t.createdAt||t.order_date||t.created_at).getTime()-n});o(r)}catch(e){console.error("\u274c Error loading orders:",e),o([])}else console.warn("No currentStore available")},c=e=>{const t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?`Today at ${t.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}`:t.toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})},u=e=>{switch(e){case"pending":return"Order Placed";case"payment_verification_pending":return"Payment Verification";case"preparing":return"Preparing";case"ready":return"Ready for Pickup";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e}};return(0,ne.jsx)(Iu,{title:"My Orders",currentPage:"orders",children:(0,ne.jsx)(og,{children:0===r.length?(0,ne.jsxs)(ig,{children:[(0,ne.jsx)(ag,{children:"No orders yet"}),(0,ne.jsx)(sg,{children:"Your order history will appear here"})]}):r.map((e,r)=>{if(!e||!e.id)return console.warn("Invalid order data:",e),null;const o=e.id,i=e.pickup_number||e.pickupNumber||(e.order_number?String(e.order_number).split("-").pop():null)||(e.orderNumber?String(e.orderNumber).split("-").pop():null)||String(o).padStart(3,"0"),a=e.createdAt||e.order_date||e.created_at||(new Date).toISOString();let l=e.order_items||e.items||[];Array.isArray(l)||(console.warn(`Order ${o}: orderItems is not an array:`,l),l=[]);const d=e.total_amount||e.total||0,p=e.order_type||e.orderType||"takeaway",h=e.payment_status||e.paymentStatus,m=e.status||"pending";let g;return g="payment_verification_pending"===h?"payment_verification_pending":m,console.log(`Order ${o}: pickupNumber=${i}, paymentStatus=${h}, orderStatus=${m}, displayStatus=${g}, items=${l.length}`),(0,ne.jsxs)(lg,{onClick:()=>(e=>{t(`/mobile/${n}/order/${e}`)})(String(o)),children:[(0,ne.jsxs)(dg,{children:[(0,ne.jsxs)(cg,{children:[(0,ne.jsxs)(ug,{children:["Order #",i]}),(0,ne.jsx)(pg,{children:c(a)})]}),(0,ne.jsx)(hg,{status:g,children:u(g)})]}),l.length>0?(0,ne.jsxs)(mg,{children:[l.slice(0,2).map((e,t)=>{var n,r;const o=e.name||(null===(n=e.menuItem)||void 0===n?void 0:n.name)||"Item",i=e.quantity||1,a=e.item_price||e.price||(null===(r=e.menuItem)||void 0===r?void 0:r.price)||0;return(0,ne.jsxs)(gg,{children:[(0,ne.jsxs)("span",{children:[i,"x ",o]}),(0,ne.jsx)("span",{children:(0,ue.vv)(Number(a)*i,s)})]},`item-${t}`)}),l.length>2&&(0,ne.jsx)(gg,{children:(0,ne.jsxs)("span",{style:{color:"#6B7280"},children:["+",l.length-2," more items"]})})]}):(0,ne.jsx)(mg,{children:(0,ne.jsx)(gg,{children:(0,ne.jsx)("span",{style:{color:"#6B7280"},children:"No items"})})}),(0,ne.jsxs)(fg,{children:[(0,ne.jsx)(xg,{children:(0,ue.vv)(Number(d),s)}),(0,ne.jsx)(yg,{orderType:p,children:bg(p)})]})]},`order-${o}-${r}`)}).filter(Boolean)})})},wg=Z.Ay.div`
  padding: 0 0 24px;
`,jg=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,kg=Z.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`,Sg=Z.Ay.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #635BFF 0%, #8B85FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
`,Ag=Z.Ay.div`
  flex: 1;
`,Cg=Z.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,Fg=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,_g=Z.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  margin: 4px 0 0 0;
`,Eg=Z.Ay.div`
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`,Pg=Z.Ay.div`
  flex: 1;
  text-align: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 12px;
`,Bg=Z.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
`,zg=Z.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,Rg=Z.Ay.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`,Tg=Z.Ay.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: none;
  border: none;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: #F9FAFB;
  }
`,Og=Z.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${e=>e.color||"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    color: ${e=>e.color?"white":"#6B7280"};
  }
`,Ig=Z.Ay.div`
  flex: 1;
`,$g=Z.Ay.div`
  font-size: 15px;
  font-weight: 500;
  color: #1F2937;
`,Mg=Z.Ay.div`
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 2px;
`,Dg=Z.Ay.div`
  color: #D1D5DB;

  svg {
    width: 20px;
    height: 20px;
  }
`,Ng=Z.Ay.button`
  width: 100%;
  padding: 16px;
  background: #FEF2F2;
  border: none;
  border-radius: 12px;
  color: #DC2626;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:active {
    background: #FEE2E2;
  }
`,Lg=Z.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,qg=Z.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Hg=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
`,Wg=Z.Ay.button`
  width: 100%;
  padding: 16px;
  background: #635BFF;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background 0.2s;

  &:active {
    background: #5A51E6;
  }
`,Ug=Z.Ay.button`
  width: 100%;
  padding: 16px;
  background: white;
  border: 2px solid #635BFF;
  border-radius: 12px;
  color: #635BFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    background: #F5F3FF;
  }
`,Gg=Z.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`,Yg=Z.Ay.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  margin: auto 0;
`,Vg=Z.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,Qg=Z.Ay.div`
  margin-bottom: 16px;
`,Kg=Z.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`,Jg=Z.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px; /* Prevent iOS zoom on focus */
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Xg=Z.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,Zg=Z.Ay.button`
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${e=>"secondary"===e.variant?"\n    background: #F3F4F6;\n    border: none;\n    color: #4B5563;\n  ":"\n    background: #635BFF;\n    border: none;\n    color: white;\n  "}
`,ef=()=>{const t=(0,X.Zp)(),{slug:n}=(0,X.g)(),{currentCustomer:r,logoutCustomer:o}=(0,le.c)(),{currency:i,currentStore:a,setCurrentStore:s}=Qc(),[l,d]=(0,e.useState)(!1),[c,u]=(0,e.useState)(""),[p,h]=(0,e.useState)(""),[m,g]=(0,e.useState)(""),[f,x]=(0,e.useState)(!1),[y,b]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""}),[v,w]=(0,e.useState)({totalOrders:0,totalSpent:0,points:0}),[j,k]=(0,e.useState)(!0);(0,e.useEffect)(()=>{(async()=>{if(!a&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&s({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,a,s]),(0,e.useEffect)(()=>{(async()=>{if(a)try{const e=await fetch(`/api/membership/settings/${a.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&k(!0===t.data.is_active)}}catch(e){console.error("Failed to load membership settings:",e)}})()},[a]),(0,e.useEffect)(()=>{(async()=>{if(r&&a)try{const e=await fetch(`/api/customers/stats/${r.id}?restaurant_id=${a.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&w({totalOrders:t.data.total_orders||0,totalSpent:parseFloat(t.data.total_spent)||0,points:t.data.points||0})}}catch(e){console.error("Failed to load customer stats:",e)}})()},[r,a]);const S=(e,t,n,r)=>{b({isOpen:!0,type:e,title:t,message:n,onConfirm:r})};return r?(0,ne.jsxs)(Iu,{title:"My Account",currentPage:"orders",children:[(0,ne.jsxs)(wg,{children:[(0,ne.jsxs)(jg,{children:[(0,ne.jsxs)(kg,{children:[(0,ne.jsx)(Sg,{children:(A=r.name||"U",A.split(" ").map(e=>e[0]).join("").toUpperCase().substring(0,2))}),(0,ne.jsxs)(Ag,{children:[(0,ne.jsx)(Cg,{children:r.name}),(0,ne.jsx)(Fg,{children:r.phone}),r.email&&(0,ne.jsx)(_g,{children:r.email})]})]}),(0,ne.jsxs)(Eg,{children:[(0,ne.jsxs)(Pg,{children:[(0,ne.jsx)(Bg,{children:v.totalOrders}),(0,ne.jsx)(zg,{children:"Orders"})]}),(0,ne.jsxs)(Pg,{children:[(0,ne.jsx)(Bg,{children:(0,ue.vv)(v.totalSpent,i)}),(0,ne.jsx)(zg,{children:"Total Spent"})]}),j&&(0,ne.jsxs)(Pg,{children:[(0,ne.jsx)(Bg,{children:v.points}),(0,ne.jsx)(zg,{children:"Points"})]})]})]}),(0,ne.jsxs)(Rg,{children:[(0,ne.jsxs)(Tg,{onClick:()=>t(`/mobile/${n}/orders`),children:[(0,ne.jsx)(Og,{color:"#635BFF",children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("path",{d:"M9 11l3 3L22 4"}),(0,ne.jsx)("path",{d:"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"})]})}),(0,ne.jsxs)(Ig,{children:[(0,ne.jsx)($g,{children:"Order History"}),(0,ne.jsx)(Mg,{children:"View your past orders"})]}),(0,ne.jsx)(Dg,{children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,ne.jsx)("path",{d:"M9 18l6-6-6-6"})})})]}),(0,ne.jsxs)(Tg,{onClick:()=>d(!0),children:[(0,ne.jsx)(Og,{color:"#10B981",children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,ne.jsx)("path",{d:"M7 11V7a5 5 0 0110 0v4"})]})}),(0,ne.jsxs)(Ig,{children:[(0,ne.jsx)($g,{children:"Change Password"}),(0,ne.jsx)(Mg,{children:"Update your password"})]}),(0,ne.jsx)(Dg,{children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,ne.jsx)("path",{d:"M9 18l6-6-6-6"})})})]})]}),(0,ne.jsx)(Ng,{onClick:()=>{S("warning","Logout","Are you sure you want to logout?",()=>{o(),t(`/mobile/${n}`)})},children:"Logout"})]}),l&&(0,ne.jsx)(Gg,{onClick:()=>d(!1),children:(0,ne.jsxs)(Yg,{onClick:e=>e.stopPropagation(),children:[(0,ne.jsx)(Vg,{children:"Change Password"}),(0,ne.jsxs)(Qg,{children:[(0,ne.jsx)(Kg,{children:"Current Password"}),(0,ne.jsx)(Jg,{type:"password",value:c,onChange:e=>u(e.target.value),placeholder:"Enter current password"})]}),(0,ne.jsxs)(Qg,{children:[(0,ne.jsx)(Kg,{children:"New Password"}),(0,ne.jsx)(Jg,{type:"password",value:p,onChange:e=>h(e.target.value),placeholder:"Enter new password"})]}),(0,ne.jsxs)(Qg,{children:[(0,ne.jsx)(Kg,{children:"Confirm New Password"}),(0,ne.jsx)(Jg,{type:"password",value:m,onChange:e=>g(e.target.value),placeholder:"Confirm new password"})]}),(0,ne.jsxs)(Xg,{children:[(0,ne.jsx)(Zg,{variant:"secondary",onClick:()=>d(!1),children:"Cancel"}),(0,ne.jsx)(Zg,{onClick:async()=>{if(c)if(p)if(p.length<6)S("error","Error","Password must be at least 6 characters");else if(p===m){x(!0);try{const e=await fetch(`/api/customers/${null===r||void 0===r?void 0:r.id}/password`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:c,newPassword:p})}),t=await e.json();e.ok&&t.success?(d(!1),u(""),h(""),g(""),S("success","Success","Password changed successfully")):S("error","Error",t.message||"Failed to change password")}catch(e){S("error","Error","Failed to change password. Please try again.")}finally{x(!1)}}else S("error","Error","New passwords do not match");else S("error","Error","Please enter a new password");else S("error","Error","Please enter your current password")},disabled:f,children:f?"Changing...":"Change Password"})]})]})}),(0,ne.jsx)(mu,{isOpen:y.isOpen,onClose:()=>b(e=>({...e,isOpen:!1})),type:y.type,title:y.title,message:y.message,onConfirm:y.onConfirm,showCancel:!!y.onConfirm})]}):(0,ne.jsxs)(Iu,{title:"Account",currentPage:"orders",children:[(0,ne.jsxs)(wg,{children:[(0,ne.jsxs)(Lg,{children:[(0,ne.jsx)(Sg,{style:{margin:"0 auto 20px",width:80,height:80,fontSize:32},children:(0,ne.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,ne.jsx)("circle",{cx:"12",cy:"7",r:"4"})]})}),(0,ne.jsx)(qg,{children:"Welcome!"}),(0,ne.jsxs)(Hg,{children:["Login or create an account to track your orders",j?", earn points,":""," and enjoy a faster checkout experience."]}),(0,ne.jsx)(Wg,{onClick:()=>t(`/mobile/${n}/login`),children:"Login"}),(0,ne.jsx)(Ug,{onClick:()=>t(`/mobile/${n}/register`),children:"Create Account"})]}),(0,ne.jsx)(Rg,{style:{marginTop:16},children:(0,ne.jsxs)(Tg,{onClick:()=>t(`/mobile/${n}/orders`),children:[(0,ne.jsx)(Og,{color:"#635BFF",children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("path",{d:"M9 11l3 3L22 4"}),(0,ne.jsx)("path",{d:"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"})]})}),(0,ne.jsxs)(Ig,{children:[(0,ne.jsx)($g,{children:"Order History"}),(0,ne.jsx)(Mg,{children:"View your recent orders"})]}),(0,ne.jsx)(Dg,{children:(0,ne.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,ne.jsx)("path",{d:"M9 18l6-6-6-6"})})})]})})]}),(0,ne.jsx)(mu,{isOpen:y.isOpen,onClose:()=>b(e=>({...e,isOpen:!1})),type:y.type,title:y.title,message:y.message,onConfirm:y.onConfirm,showCancel:!!y.onConfirm})]});var A},tf=Z.Ay.div`
  padding: 20px 0;
`,nf=Z.Ay.div`
  text-align: center;
  margin-bottom: 32px;
`,rf=Z.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`,of=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,af=Z.Ay.form`
  display: flex;
  flex-direction: column;
`,sf=Z.Ay.div`
  margin-bottom: 20px;
`,lf=Z.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,df=Z.Ay.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,cf=Z.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-align: right;
  margin-top: -12px;
  margin-bottom: 20px;
`,uf=Z.Ay.button`
  width: 100%;
  padding: 14px;
  background: #635BFF;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,pf=Z.Ay.div`
  display: flex;
  align-items: center;
  margin: 24px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E5E7EB;
  }

  span {
    padding: 0 16px;
    color: #9CA3AF;
    font-size: 14px;
  }
`,hf=Z.Ay.button`
  width: 100%;
  padding: 14px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`,mf=Z.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 24px;
`,gf=Z.Ay.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.active?"white":"transparent"};
  color: ${e=>e.active?"#1F2937":"#6B7280"};
  box-shadow: ${e=>e.active?"0 1px 3px rgba(0,0,0,0.1)":"none"};
`,ff=()=>{const t=(0,X.Zp)(),{slug:n}=(0,X.g)(),{setCurrentCustomer:r}=(0,le.c)(),{currentStore:o,setCurrentStore:i}=Qc(),[a,s]=(0,e.useState)("email"),[l,d]=(0,e.useState)(""),[c,u]=(0,e.useState)(""),[p,h]=(0,e.useState)(""),[m,g]=(0,e.useState)(!1),[f,x]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!o&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&i({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{},country:t.data.country})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,o,i]);const y=(e,t,n)=>{x({isOpen:!0,type:e,title:t,message:n})};return(0,ne.jsxs)(Iu,{title:"Login",onBack:()=>{window.history.length>1?t(-1):t(`/mobile/${n}/menu`)},children:[(0,ne.jsxs)(tf,{children:[(0,ne.jsxs)(nf,{children:[(0,ne.jsx)(rf,{children:"Welcome Back"}),(0,ne.jsx)(of,{children:"Login to your account"})]}),(0,ne.jsxs)(af,{onSubmit:async e=>{e.preventDefault();const o="email"===a?l:c;if(o)if(p){g(!0);try{const e=await fetch("/api/customers/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier:o,password:p})}),i=await e.json();if(e.ok&&i.success){const e={id:i.data.id.toString(),type:i.data.type,name:i.data.name,phone:i.data.phone,email:i.data.email||"",points:i.data.points||0,totalOrders:i.data.totalOrders||0,totalSpent:i.data.totalSpent||0,favoriteItems:[],addresses:[],joinDate:(new Date).toISOString().split("T")[0],loyaltyTier:i.data.loyaltyTier||"Bronze",isActive:!0};r(e),t(`/mobile/${n}/account`)}else y("error","Login Failed",i.message||"Invalid email/phone or password")}catch(i){y("error","Error","Failed to login. Please try again.")}finally{g(!1)}}else y("error","Error","Please enter your password");else y("error","Error","email"===a?"Please enter your email":"Please enter your phone number")},children:[(0,ne.jsxs)(mf,{children:[(0,ne.jsx)(gf,{type:"button",active:"email"===a,onClick:()=>s("email"),children:"Email"}),(0,ne.jsx)(gf,{type:"button",active:"phone"===a,onClick:()=>s("phone"),children:"Phone"})]}),"email"===a?(0,ne.jsxs)(sf,{children:[(0,ne.jsx)(lf,{children:"Email Address"}),(0,ne.jsx)(df,{type:"email",value:l,onChange:e=>d(e.target.value),placeholder:"Enter your email",autoComplete:"email"})]}):(0,ne.jsxs)(sf,{children:[(0,ne.jsx)(lf,{children:"Phone Number"}),(0,ne.jsx)(ih,{value:c,onChange:u,defaultCountryCode:null===o||void 0===o?void 0:o.country,placeholder:"Phone number"})]}),(0,ne.jsxs)(sf,{children:[(0,ne.jsx)(lf,{children:"Password"}),(0,ne.jsx)(df,{type:"password",value:p,onChange:e=>h(e.target.value),placeholder:"Enter your password",autoComplete:"current-password"})]}),(0,ne.jsx)(cf,{type:"button",onClick:()=>t(`/mobile/${n}/forgot-password`),children:"Forgot Password?"}),(0,ne.jsx)(uf,{type:"submit",disabled:m,children:m?"Logging in...":"Login"}),(0,ne.jsx)(pf,{children:(0,ne.jsx)("span",{children:"New here?"})}),(0,ne.jsx)(hf,{type:"button",onClick:()=>t(`/mobile/${n}/register`),children:"Create Account"})]})]}),(0,ne.jsx)(mu,{isOpen:f.isOpen,onClose:()=>x(e=>({...e,isOpen:!1})),type:f.type,title:f.title,message:f.message})]})},xf=Z.Ay.div`
  padding: 20px 0;
`,yf=Z.Ay.div`
  text-align: center;
  margin-bottom: 24px;
`,bf=Z.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`,vf=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,wf=Z.Ay.form`
  display: flex;
  flex-direction: column;
`,jf=Z.Ay.div`
  margin-bottom: 16px;

  input, select {
    border-color: ${e=>e.hasError?"#DC2626":"#E5E7EB"};
  }
`,kf=Z.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,Sf=Z.Ay.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,Af=Z.Ay.span`
  color: #DC2626;
  margin-left: 2px;
`,Cf=Z.Ay.div`
  color: #DC2626;
  font-size: 12px;
  margin-top: 4px;
`,Ff=Z.Ay.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  color: #DC2626;
  font-size: 14px;

  a {
    color: #635BFF;
    text-decoration: underline;
    cursor: pointer;
  }
`,_f=Z.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,Ef=Z.Ay.button`
  width: 100%;
  padding: 14px;
  background: #635BFF;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,Pf=Z.Ay.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E5E7EB;
  }

  span {
    padding: 0 16px;
    color: #9CA3AF;
    font-size: 14px;
  }
`,Bf=Z.Ay.button`
  width: 100%;
  padding: 14px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`,zf=Z.Ay.p`
  font-size: 12px;
  color: #9CA3AF;
  text-align: center;
  margin: 16px 0 0;
  line-height: 1.5;

  a {
    color: #635BFF;
    text-decoration: none;
  }
`,Rf=()=>{const t=(0,X.Zp)(),{slug:n}=(0,X.g)(),{loginCustomer:r}=(0,le.c)(),{currentStore:o,setCurrentStore:i}=Qc(),[a,s]=(0,e.useState)(""),[l,d]=(0,e.useState)(""),[c,u]=(0,e.useState)(""),[p,h]=(0,e.useState)(""),[m,g]=(0,e.useState)(""),[f,x]=(0,e.useState)(!1),[y,b]=(0,e.useState)({}),[v,w]=(0,e.useState)(""),[j,k]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!o&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&i({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{},country:t.data.country})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,o,i]);const S=e=>{b(t=>({...t,[e]:void 0})),w("")};return(0,ne.jsxs)(Iu,{title:"Create Account",onBack:()=>{window.history.length>1?t(-1):t(`/mobile/${n}/menu`)},children:[(0,ne.jsxs)(xf,{children:[(0,ne.jsxs)(yf,{children:[(0,ne.jsx)(bf,{children:"Create Account"}),(0,ne.jsx)(vf,{children:"Join us for a better experience"})]}),(0,ne.jsxs)(wf,{onSubmit:async e=>{if(e.preventDefault(),w(""),(()=>{const e={};a.trim()||(e.name="Name is required"),l.trim()||(e.phone="Phone number is required"),c.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)||(e.email="Please enter a valid email address"):e.email="Email is required";return p?p.length<6&&(e.password="Password must be at least 6 characters"):e.password="Password is required",m?p!==m&&(e.confirmPassword="Passwords do not match"):e.confirmPassword="Please confirm your password",b(e),0===Object.keys(e).length})()){x(!0);try{const e=await fetch("/api/customers/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a.trim(),phone:l.trim(),email:c.trim(),password:p,restaurantId:null===o||void 0===o?void 0:o.id})}),i=await e.json();e.ok&&i.success?(r(i.data),k({isOpen:!0,type:"success",title:"Welcome!",message:"Your account has been created successfully!",onConfirm:()=>t(`/mobile/${n}/account`)})):i.field?b({[i.field]:i.message}):w(i.message||"Failed to create account. Please try again.")}catch(i){w("Failed to create account. Please check your connection and try again.")}finally{x(!1)}}},children:[v&&(0,ne.jsxs)(Ff,{children:[v,v.includes("already registered")&&(0,ne.jsxs)(ne.Fragment,{children:[" ",(0,ne.jsx)("a",{href:`/mobile/${n}/login`,onClick:e=>{e.preventDefault(),t(`/mobile/${n}/login`)},children:"Login here"})]})]}),(0,ne.jsxs)(jf,{hasError:!!y.name,children:[(0,ne.jsxs)(kf,{children:["Name",(0,ne.jsx)(Af,{children:"*"})]}),(0,ne.jsx)(Sf,{type:"text",value:a,onChange:e=>{s(e.target.value),S("name")},placeholder:"Enter your name"}),y.name&&(0,ne.jsx)(Cf,{children:y.name})]}),(0,ne.jsxs)(jf,{hasError:!!y.phone,children:[(0,ne.jsxs)(kf,{children:["Phone Number",(0,ne.jsx)(Af,{children:"*"})]}),(0,ne.jsx)(ih,{value:l,onChange:e=>{d(e),S("phone")},defaultCountryCode:null===o||void 0===o?void 0:o.country,placeholder:"Phone number"}),y.phone&&(0,ne.jsx)(Cf,{children:y.phone})]}),(0,ne.jsxs)(jf,{hasError:!!y.email,children:[(0,ne.jsxs)(kf,{children:["Email",(0,ne.jsx)(Af,{children:"*"})]}),(0,ne.jsx)(Sf,{type:"email",value:c,onChange:e=>{u(e.target.value),S("email")},placeholder:"Enter your email"}),y.email&&(0,ne.jsx)(Cf,{children:y.email})]}),(0,ne.jsxs)(jf,{hasError:!!y.password,children:[(0,ne.jsxs)(kf,{children:["Password",(0,ne.jsx)(Af,{children:"*"})]}),(0,ne.jsx)(Sf,{type:"password",value:p,onChange:e=>{h(e.target.value),S("password")},placeholder:"Create a password"}),(0,ne.jsx)(_f,{children:"Minimum 6 characters"}),y.password&&(0,ne.jsx)(Cf,{children:y.password})]}),(0,ne.jsxs)(jf,{hasError:!!y.confirmPassword,children:[(0,ne.jsxs)(kf,{children:["Confirm Password",(0,ne.jsx)(Af,{children:"*"})]}),(0,ne.jsx)(Sf,{type:"password",value:m,onChange:e=>{g(e.target.value),S("confirmPassword")},placeholder:"Confirm your password"}),y.confirmPassword&&(0,ne.jsx)(Cf,{children:y.confirmPassword})]}),(0,ne.jsx)(zf,{children:"By creating an account, you agree to our Terms of Service and Privacy Policy"}),(0,ne.jsx)(Ef,{type:"submit",disabled:f,children:f?"Creating Account...":"Create Account"}),(0,ne.jsx)(Pf,{children:(0,ne.jsx)("span",{children:"Already have an account?"})}),(0,ne.jsx)(Bf,{type:"button",onClick:()=>t(`/mobile/${n}/login`),children:"Login"})]})]}),(0,ne.jsx)(mu,{isOpen:j.isOpen,onClose:()=>{k(e=>({...e,isOpen:!1})),j.onConfirm&&j.onConfirm()},type:j.type,title:j.title,message:j.message})]})},Tf=Z.Ay.div`
  padding: 20px 0;
`,Of=Z.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #635BFF;
  }
`,If=Z.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
  text-align: center;
`,$f=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
  text-align: center;
`,Mf=Z.Ay.form`
  display: flex;
  flex-direction: column;
`,Df=Z.Ay.div`
  margin-bottom: 20px;
`,Nf=Z.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,Lf=Z.Ay.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,qf=Z.Ay.div`
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 16px;
  padding: 12px;
  background: #FEF2F2;
  border-radius: 8px;
`,Hf=Z.Ay.div`
  color: #0369A1;
  font-size: 13px;
  margin-bottom: 16px;
  padding: 12px;
  background: #E0F2FE;
  border-radius: 8px;
`,Wf=Z.Ay.button`
  width: 100%;
  padding: 14px;
  background: #635BFF;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,Uf=Z.Ay.button`
  width: 100%;
  padding: 14px;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;

  &:active {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`,Gf=Z.Ay.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #6B7280;

  span {
    color: #635BFF;
    cursor: pointer;
    text-decoration: underline;
  }
`,Yf=Z.Ay.div`
  text-align: center;
  padding: 40px 0;
`,Vf=Z.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #DCFCE7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #16A34A;
  }
`,Qf=Z.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`,Kf=Z.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
`,Jf=Z.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 24px;
`,Xf=Z.Ay.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.active?"white":"transparent"};
  color: ${e=>e.active?"#1F2937":"#6B7280"};
  box-shadow: ${e=>e.active?"0 1px 3px rgba(0,0,0,0.1)":"none"};
`,Zf=()=>{const t=(0,X.Zp)(),{slug:n}=(0,X.g)(),{currentStore:r,setCurrentStore:o}=Qc(),[i,a]=(0,e.useState)("email"),[s,l]=(0,e.useState)(""),[d,c]=(0,e.useState)(""),[u,p]=(0,e.useState)(!1),[h,m]=(0,e.useState)(!1),[g,f]=(0,e.useState)(""),[x,y]=(0,e.useState)(""),[b,v]=(0,e.useState)(""),[w,j]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!r&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&o({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,r,o]);const k=()=>{window.history.length>1?t(-1):t(`/mobile/${n}/menu`)};if(h){const e="email"===i?s:b;return(0,ne.jsxs)(Iu,{title:"Password Reset",onBack:k,children:[(0,ne.jsxs)(Yf,{children:[(0,ne.jsx)(Vf,{children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("path",{d:"M22 11.08V12a10 10 0 11-5.93-9.14"}),(0,ne.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),(0,ne.jsx)(Qf,{children:"Check Your Email"}),(0,ne.jsxs)(Kf,{children:["We've sent a password reset link to ",(0,ne.jsx)("strong",{children:e}),". Please check your inbox and spam folder."]}),(0,ne.jsx)(Wf,{onClick:k,children:"Continue"})]}),(0,ne.jsx)(mu,{isOpen:w.isOpen,onClose:()=>j(e=>({...e,isOpen:!1})),type:w.type,title:w.title,message:w.message})]})}return(0,ne.jsxs)(Iu,{title:"Forgot Password",onBack:k,children:[(0,ne.jsxs)(Tf,{children:[(0,ne.jsx)(Of,{children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,ne.jsx)("path",{d:"M7 11V7a5 5 0 0110 0v4"})]})}),(0,ne.jsx)(If,{children:"Forgot Password?"}),(0,ne.jsx)($f,{children:"Enter your email or phone number and we'll send you a link to reset your password."}),(0,ne.jsxs)(Jf,{children:[(0,ne.jsx)(Xf,{active:"email"===i,onClick:()=>{a("email"),f(""),y("")},children:"By Email"}),(0,ne.jsx)(Xf,{active:"phone"===i,onClick:()=>{a("phone"),f("")},children:"By Phone"})]}),"email"===i?(0,ne.jsxs)(Mf,{onSubmit:async e=>{if(e.preventDefault(),f(""),!s.trim())return void f("Please enter your email address");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)){p(!0);try{const e=await fetch("/api/customers/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s.trim(),slug:n})});!1===(await e.json()).emailExists?f("No account found with this email address."):m(!0)}catch(t){f("Failed to send reset email. Please try again.")}finally{p(!1)}}else f("Please enter a valid email address")},children:[(0,ne.jsxs)(Df,{children:[(0,ne.jsx)(Nf,{children:"Email Address"}),(0,ne.jsx)(Lf,{type:"email",value:s,onChange:e=>{l(e.target.value),f("")},placeholder:"Enter your email"})]}),g&&(0,ne.jsxs)(qf,{children:[g,g.includes("No account")&&(0,ne.jsxs)(ne.Fragment,{children:[" ",(0,ne.jsx)("span",{onClick:()=>t(`/mobile/${n}/register`),style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Sign up here"})]})]}),(0,ne.jsx)(Wf,{type:"submit",disabled:u,children:u?"Sending...":"Send Reset Link"}),(0,ne.jsxs)(Gf,{children:["Don't know your email?"," ",(0,ne.jsx)("span",{onClick:()=>{a("phone"),f("")},children:"Use phone number"})]})]}):(0,ne.jsxs)(Mf,{onSubmit:async e=>{if(e.preventDefault(),f(""),y(""),d.trim()){p(!0);try{const e=await fetch("/api/customers/find-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:d.trim()})}),t=await e.json();!1===t.found?f("No account found with this phone number."):y(t.maskedEmail)}catch(t){f("Failed to find account. Please try again.")}finally{p(!1)}}else f("Please enter your phone number")},children:[(0,ne.jsxs)(Df,{children:[(0,ne.jsx)(Nf,{children:"Phone Number"}),(0,ne.jsx)(ih,{value:d,onChange:c,defaultCountryCode:null===r||void 0===r?void 0:r.country,placeholder:"Phone number"})]}),g&&(0,ne.jsxs)(qf,{children:[g,g.includes("No account")&&(0,ne.jsxs)(ne.Fragment,{children:[" ",(0,ne.jsx)("span",{onClick:()=>t(`/mobile/${n}/register`),style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Sign up here"})]})]}),x&&(0,ne.jsxs)(Hf,{children:["We found your account! Reset link will be sent to: ",(0,ne.jsx)("strong",{children:x})]}),x?(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsx)(Wf,{type:"button",onClick:async()=>{p(!0),f("");try{const e=await fetch("/api/customers/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:d.trim(),slug:n})}),t=await e.json();t.success?(v(x),m(!0)):f(t.message||"Failed to send reset email.")}catch(e){f("Failed to send reset email. Please try again.")}finally{p(!1)}},disabled:u,children:u?"Sending...":"Send Reset Link"}),(0,ne.jsx)(Uf,{type:"button",onClick:()=>t(`/mobile/${n}/login`),children:"Back to Login"})]}):(0,ne.jsx)(Wf,{type:"submit",disabled:u,children:u?"Searching...":"Find My Account"}),(0,ne.jsxs)(Gf,{children:["Remember your email?"," ",(0,ne.jsx)("span",{onClick:()=>{a("email"),f(""),y("")},children:"Use email instead"})]})]})]}),(0,ne.jsx)(mu,{isOpen:w.isOpen,onClose:()=>j(e=>({...e,isOpen:!1})),type:w.type,title:w.title,message:w.message})]})},ex=Z.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
`,tx=Z.Ay.div`
  text-align: center;
  margin: 60px 0 32px;
`,nx=Z.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #635BFF;
  }
`,rx=Z.Ay.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ox=Z.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
`,ix=Z.Ay.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`,ax=Z.Ay.div`
  margin-bottom: 20px;
`,sx=Z.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,lx=Z.Ay.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,dx=Z.Ay.button`
  width: 100%;
  padding: 16px;
  background: #635BFF;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`,cx=Z.Ay.div`
  text-align: center;
  padding: 40px 0;
`,ux=Z.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #DCFCE7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #16A34A;
  }
`,px=Z.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`,hx=Z.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
`,mx=Z.Ay.div`
  text-align: center;
  padding: 40px 0;
`,gx=Z.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #FEE2E2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  svg {
    width: 40px;
    height: 40px;
    color: #DC2626;
  }
`,fx=Z.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`,xx=Z.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
`,yx=()=>{const t=(0,X.Zp)(),{slug:n}=(0,X.g)(),[r]=(0,X.ok)(),o=r.get("token"),{currentStore:i,setCurrentStore:a}=Qc(),[s,l]=(0,e.useState)(""),[d,c]=(0,e.useState)(""),[u,p]=(0,e.useState)(!1),[h,m]=(0,e.useState)(!1),[g,f]=(0,e.useState)(null),[x,y]=(0,e.useState)(null),[b,v]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!i&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&a({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,i,a]),(0,e.useEffect)(()=>{(async()=>{if(o)try{const e=await fetch(`/api/customers/verify-reset-token?token=${o}`),t=await e.json();f(e.ok&&t.valid),t.slug&&y(t.slug)}catch(e){f(!1)}else f(!1)})()},[o]);const w=(e,t,n)=>{v({isOpen:!0,type:e,title:t,message:n})};if(null===g)return(0,ne.jsx)(ex,{children:(0,ne.jsxs)(tx,{children:[(0,ne.jsx)(nx,{children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,ne.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}),(0,ne.jsx)(rx,{children:"Verifying..."}),(0,ne.jsx)(ox,{children:"Please wait while we verify your reset link."})]})});if(!1===g)return(0,ne.jsx)(ex,{children:(0,ne.jsxs)(mx,{children:[(0,ne.jsx)(gx,{children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,ne.jsx)("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),(0,ne.jsx)("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),(0,ne.jsx)(fx,{children:"Invalid or Expired Link"}),(0,ne.jsx)(xx,{children:"This password reset link is invalid or has expired. Please request a new one."}),(0,ne.jsx)(dx,{onClick:()=>t(`/mobile/${x||n}/forgot-password`),children:"Request New Link"})]})});const j=x||n;return h?(0,ne.jsx)(ex,{children:(0,ne.jsxs)(cx,{children:[(0,ne.jsx)(ux,{children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("path",{d:"M22 11.08V12a10 10 0 11-5.93-9.14"}),(0,ne.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),(0,ne.jsx)(px,{children:"Password Reset!"}),(0,ne.jsx)(hx,{children:"Your password has been successfully reset. You can now login with your new password."}),(0,ne.jsx)(dx,{onClick:()=>t(`/mobile/${j}/login`),children:"Login Now"})]})}):(0,ne.jsxs)(ex,{children:[(0,ne.jsxs)(tx,{children:[(0,ne.jsx)(nx,{children:(0,ne.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,ne.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,ne.jsx)("path",{d:"M7 11V7a5 5 0 0110 0v4"})]})}),(0,ne.jsx)(rx,{children:"Reset Password"}),(0,ne.jsx)(ox,{children:"Enter your new password below."})]}),(0,ne.jsxs)(ix,{onSubmit:async e=>{if(e.preventDefault(),s)if(s.length<6)w("error","Error","Password must be at least 6 characters");else if(s===d){p(!0);try{const e=await fetch("/api/customers/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o,password:s})}),t=await e.json();e.ok&&t.success?m(!0):w("error","Error",t.message||"Failed to reset password. The link may have expired.")}catch(t){w("error","Error","Failed to reset password. Please try again.")}finally{p(!1)}}else w("error","Error","Passwords do not match");else w("error","Error","Please enter a new password")},children:[(0,ne.jsxs)(ax,{children:[(0,ne.jsx)(sx,{children:"New Password"}),(0,ne.jsx)(lx,{type:"password",value:s,onChange:e=>l(e.target.value),placeholder:"Enter new password (min 6 characters)"})]}),(0,ne.jsxs)(ax,{children:[(0,ne.jsx)(sx,{children:"Confirm New Password"}),(0,ne.jsx)(lx,{type:"password",value:d,onChange:e=>c(e.target.value),placeholder:"Confirm new password"})]}),(0,ne.jsx)(dx,{type:"submit",disabled:u,children:u?"Resetting...":"Reset Password"})]}),(0,ne.jsx)(mu,{isOpen:b.isOpen,onClose:()=>v(e=>({...e,isOpen:!1})),type:b.type,title:b.title,message:b.message})]})},bx=()=>(0,ne.jsx)(le.y,{children:(0,ne.jsx)(de.Y,{children:(0,ne.jsx)(Kc,{children:(0,ne.jsxs)(X.BV,{children:[(0,ne.jsx)(X.qh,{path:"/:slug",element:(0,ne.jsx)(Su,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/order-type",element:(0,ne.jsx)(Su,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/menu",element:(0,ne.jsx)(np,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/item/:itemId",element:(0,ne.jsx)(Rp,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/cart",element:(0,ne.jsx)(Jp,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/payment",element:(0,ne.jsx)(Kh,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/payment/qr",element:(0,ne.jsx)(fm,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/payment/bank-transfer",element:(0,ne.jsx)($m,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/order/:orderId",element:(0,ne.jsx)(rg,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/orders",element:(0,ne.jsx)(vg,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/account",element:(0,ne.jsx)(ef,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/login",element:(0,ne.jsx)(ff,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/register",element:(0,ne.jsx)(Rf,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/forgot-password",element:(0,ne.jsx)(Zf,{})}),(0,ne.jsx)(X.qh,{path:"/:slug/reset-password",element:(0,ne.jsx)(yx,{})})]})})})}),vx=()=>(0,ne.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"16px",color:"#6B7280"},children:"Loading..."}),wx=e.lazy(()=>Promise.all([n.e(3422),n.e(5863),n.e(1323),n.e(4648)]).then(n.bind(n,4648))),jx=e.lazy(()=>Promise.all([n.e(5863),n.e(1323),n.e(9641)]).then(n.bind(n,9641))),kx=e.lazy(()=>Promise.all([n.e(3422),n.e(6814)]).then(n.bind(n,6814))),Sx=e.lazy(()=>Promise.all([n.e(3422),n.e(6e3)]).then(n.bind(n,6e3))),Ax=e.lazy(()=>n.e(6554).then(n.bind(n,6554))),Cx=e.lazy(()=>Promise.all([n.e(347),n.e(4325),n.e(3585),n.e(4263)]).then(n.bind(n,4263))),Fx=e.lazy(()=>Promise.all([n.e(9163),n.e(5863),n.e(7592)]).then(n.bind(n,7592))),_x=e.lazy(()=>n.e(2766).then(n.bind(n,2766))),Ex=e.lazy(()=>n.e(4656).then(n.bind(n,4656))),Px=e.lazy(()=>n.e(2370).then(n.bind(n,2370))),Bx=e.lazy(()=>n.e(1748).then(n.bind(n,1748))),zx=e.lazy(()=>n.e(3416).then(n.bind(n,3416))),Rx=e.lazy(()=>n.e(6780).then(n.bind(n,6780))),Tx=e.lazy(()=>n.e(408).then(n.bind(n,408))),Ox=e.lazy(()=>n.e(6136).then(n.bind(n,6136))),Ix=e.lazy(()=>n.e(7909).then(n.bind(n,7909))),$x=e.lazy(()=>n.e(1513).then(n.bind(n,1513))),Mx=e.lazy(()=>n.e(9440).then(n.bind(n,9440))),Dx=e.lazy(()=>Promise.all([n.e(3422),n.e(5863),n.e(1323),n.e(5747)]).then(n.bind(n,5747))),Nx=e.lazy(()=>n.e(5082).then(n.bind(n,5082))),Lx=e.lazy(()=>n.e(3201).then(n.bind(n,3201))),qx=e.lazy(()=>n.e(3643).then(n.bind(n,3643))),Hx=e.lazy(()=>n.e(2341).then(n.bind(n,2341))),Wx=e.lazy(()=>n.e(9327).then(n.bind(n,9327))),Ux=e.lazy(()=>Promise.all([n.e(5612),n.e(5373),n.e(7283)]).then(n.bind(n,7283))),Gx=e.lazy(()=>Promise.all([n.e(5612),n.e(9246),n.e(9684),n.e(5373),n.e(6529)]).then(n.bind(n,6529))),Yx=e.lazy(()=>n.e(4107).then(n.bind(n,4107))),Vx=e.lazy(()=>n.e(6837).then(n.bind(n,6837))),Qx=e.lazy(()=>Promise.all([n.e(347),n.e(4325),n.e(3585),n.e(5646)]).then(n.bind(n,5646))),Kx=e.lazy(()=>Promise.all([n.e(3724),n.e(5871)]).then(n.bind(n,5871))),Jx=e.lazy(()=>n.e(2940).then(n.bind(n,2940))),Xx=e.lazy(()=>Promise.all([n.e(3724),n.e(6843)]).then(n.bind(n,6843))),Zx=e.lazy(()=>Promise.all([n.e(3724),n.e(4685)]).then(n.bind(n,4685))),ey=e.lazy(()=>n.e(9889).then(n.bind(n,9889))),ty=e.lazy(()=>Promise.all([n.e(3724),n.e(4083)]).then(n.bind(n,4083))),ny=e.lazy(()=>n.e(6866).then(n.bind(n,6866))),ry=e.lazy(()=>n.e(733).then(n.bind(n,733))),oy=e.lazy(()=>n.e(5581).then(n.bind(n,5581))),iy=e.lazy(()=>Promise.all([n.e(9246),n.e(3667)]).then(n.bind(n,3667))),ay=e.lazy(()=>n.e(9647).then(n.bind(n,9647))),sy=e.lazy(()=>n.e(5008).then(n.bind(n,5008))),ly=e.lazy(()=>n.e(5577).then(n.bind(n,5577))),dy=e.lazy(()=>n.e(3543).then(n.bind(n,3543))),cy=e.lazy(()=>n.e(8317).then(n.bind(n,8317))),uy=e.lazy(()=>n.e(4833).then(n.bind(n,4833))),py=e.lazy(()=>n.e(5637).then(n.bind(n,8018))),hy=e.lazy(()=>n.e(6121).then(n.bind(n,6121))),my=e.lazy(()=>n.e(3913).then(n.bind(n,3913))),gy=e.lazy(()=>n.e(7795).then(n.bind(n,7795))),fy=e.lazy(()=>n.e(1038).then(n.bind(n,1038))),xy=e.lazy(()=>n.e(9485).then(n.bind(n,9485))),yy=e.lazy(()=>n.e(4551).then(n.bind(n,4551))),by=e.lazy(()=>n.e(9640).then(n.bind(n,9640))),vy=e.lazy(()=>n.e(4269).then(n.bind(n,4269))),wy=e.lazy(()=>Promise.all([n.e(6458),n.e(8309)]).then(n.bind(n,8309))),jy=e.lazy(()=>n.e(4293).then(n.bind(n,4293))),ky=e.lazy(()=>n.e(7606).then(n.bind(n,7606))),Sy=e.lazy(()=>Promise.all([n.e(347),n.e(4325),n.e(6458),n.e(441)]).then(n.bind(n,441))),Ay=e.lazy(()=>Promise.all([n.e(347),n.e(4325),n.e(6458),n.e(749)]).then(n.bind(n,749))),Cy=e.lazy(()=>n.e(8026).then(n.bind(n,8026))),Fy=e.lazy(()=>n.e(758).then(n.bind(n,758))),_y=e.lazy(()=>n.e(8186).then(n.bind(n,8186))),Ey=e.lazy(()=>n.e(6).then(n.bind(n,6))),Py=e.lazy(()=>Promise.all([n.e(1231),n.e(276)]).then(n.bind(n,276))),By=e.lazy(()=>n.e(6152).then(n.bind(n,6152))),zy=e.lazy(()=>n.e(2612).then(n.bind(n,2612))),Ry=e.lazy(()=>n.e(8060).then(n.bind(n,8060))),Ty=e.lazy(()=>Promise.all([n.e(2045),n.e(2980)]).then(n.bind(n,2980))),Oy=e.lazy(()=>n.e(7999).then(n.bind(n,7999))),Iy=e.lazy(()=>Promise.all([n.e(2045),n.e(2652)]).then(n.bind(n,2652))),$y=e.lazy(()=>n.e(8844).then(n.bind(n,8844))),My=e.lazy(()=>Promise.all([n.e(1231),n.e(7121)]).then(n.bind(n,7121))),Dy=e.lazy(()=>n.e(9134).then(n.bind(n,9134))),Ny=e.lazy(()=>Promise.all([n.e(347),n.e(3585),n.e(6312)]).then(n.bind(n,6312))),Ly=e.lazy(()=>n.e(8348).then(n.bind(n,8348))),qy=e.lazy(()=>n.e(1143).then(n.bind(n,1143))),Hy=e.lazy(()=>Promise.all([n.e(347),n.e(4325),n.e(3585),n.e(4105)]).then(n.bind(n,4105))),Wy=e.lazy(()=>Promise.all([n.e(5612),n.e(9246),n.e(9684),n.e(5373),n.e(5940)]).then(n.bind(n,5940))),Uy=e.lazy(()=>Promise.all([n.e(3724),n.e(1770)]).then(n.bind(n,1770))),Gy=e.lazy(()=>n.e(4022).then(n.bind(n,4022))),Yy=e.lazy(()=>Promise.all([n.e(3724),n.e(4802)]).then(n.bind(n,4802))),Vy=e.lazy(()=>n.e(9328).then(n.bind(n,9328))),Qy=e.lazy(()=>n.e(7576).then(n.bind(n,7576))),Ky=e.lazy(()=>n.e(2890).then(n.bind(n,2890))),Jy=e.lazy(()=>Promise.all([n.e(5612),n.e(9246),n.e(9684),n.e(5373),n.e(2476)]).then(n.bind(n,2476))),Xy=e.lazy(()=>n.e(5684).then(n.bind(n,5684))),Zy=e.lazy(()=>n.e(9133).then(n.bind(n,9133))),eb=e.lazy(()=>n.e(1268).then(n.bind(n,1268))),tb=e.lazy(()=>n.e(4987).then(n.bind(n,4987))),nb=e.lazy(()=>Promise.all([n.e(347),n.e(4325),n.e(3585),n.e(677)]).then(n.bind(n,677))),rb=e.lazy(()=>n.e(6950).then(n.bind(n,6950))),ob=e.lazy(()=>Promise.all([n.e(5612),n.e(9246),n.e(9684),n.e(5373),n.e(6832)]).then(n.bind(n,6832))),ib=e.lazy(()=>n.e(4240).then(n.bind(n,4240))),ab=e.lazy(()=>n.e(3377).then(n.bind(n,3377))),sb=e.lazy(()=>n.e(1450).then(n.bind(n,1450))),lb=e.lazy(()=>n.e(6929).then(n.bind(n,6929))),db=e.lazy(()=>n.e(2790).then(n.bind(n,2790))),cb=e.lazy(()=>n.e(9876).then(n.bind(n,9876))),ub=e.lazy(()=>Promise.all([n.e(3724),n.e(8725)]).then(n.bind(n,8725))),pb=e.lazy(()=>n.e(7771).then(n.bind(n,7771))),hb=e.lazy(()=>Promise.all([n.e(3724),n.e(1291)]).then(n.bind(n,1291))),mb=e.lazy(()=>n.e(7565).then(n.bind(n,7565))),gb=e.lazy(()=>Promise.all([n.e(3724),n.e(3534)]).then(n.bind(n,3534))),fb=e.lazy(()=>Promise.all([n.e(3724),n.e(4636)]).then(n.bind(n,4636))),xb=e.lazy(()=>Promise.all([n.e(3724),n.e(8018)]).then(n.bind(n,5637))),yb=e.lazy(()=>n.e(7140).then(n.bind(n,7140))),bb=()=>{const{user:e,isAuthenticated:t,isLoading:n}=(0,ce.As)();if(n)return(0,ne.jsx)("div",{children:"Loading..."});if(!t)return(0,ne.jsx)(X.C5,{to:"/pos",replace:!0});switch(null===e||void 0===e?void 0:e.role){case"System Admin":return(0,ne.jsx)(X.C5,{to:"/pos/admin/dashboard",replace:!0});case"Foodcourt General":case"Foodcourt Manager":return(0,ne.jsx)(X.C5,{to:"/pos/foodcourt/general/dashboard",replace:!0});case"Brand General":case"Brand Manager":return(0,ne.jsx)(X.C5,{to:"/pos/brand/general/dashboard",replace:!0});case"Restaurant Owner":return(0,ne.jsx)(X.C5,{to:"/pos/owner/dashboard",replace:!0});case"Restaurant Admin":case"Staff":{const t=(null===e||void 0===e?void 0:e.restaurantId)||"1";return(0,ne.jsx)(X.C5,{to:`/restaurant/${t}/dashboard`,replace:!0})}default:{const t=(null===e||void 0===e?void 0:e.restaurantId)||"1";return(0,ne.jsx)(X.C5,{to:`/restaurant/${t}/dashboard`,replace:!0})}}},vb=()=>{const{user:e}=(0,ce.As)(),t=(0,X.zy)().pathname.replace("/pos/restaurant/",""),n=(null===e||void 0===e?void 0:e.restaurantId)||"1";return(0,ne.jsx)(X.C5,{to:`/restaurant/${n}/${t}`,replace:!0})};const wb=function(){return e.useEffect(()=>{(async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();if(t.seo_title&&(document.title=t.seo_title),t.favicon_url){const e=document.getElementById("favicon");e&&(e.href=t.favicon_url);const n=document.getElementById("apple-touch-icon");n&&(n.href=t.favicon_url)}if(t.seo_description){const e=document.getElementById("meta-description");e&&e.setAttribute("content",t.seo_description)}if(t.seo_keywords){const e=document.getElementById("meta-keywords");e&&e.setAttribute("content",t.seo_keywords)}if(t.seo_title){const e=document.getElementById("og-title"),n=document.getElementById("twitter-title");e&&e.setAttribute("content",t.seo_title),n&&n.setAttribute("content",t.seo_title)}if(t.seo_description){const e=document.getElementById("og-description"),n=document.getElementById("twitter-description");e&&e.setAttribute("content",t.seo_description),n&&n.setAttribute("content",t.seo_description)}if(t.og_image_url){const e=document.getElementById("og-image"),n=document.getElementById("twitter-image");e&&e.setAttribute("content",t.og_image_url),n&&n.setAttribute("content",t.og_image_url)}}}catch(e){console.error("Failed to load site settings:",e)}})()},[]),(0,ne.jsx)(oe,{children:(0,ne.jsx)(be,{children:(0,ne.jsx)(ae.tv,{children:(0,ne.jsx)(le.y,{children:(0,ne.jsx)(ie.sy,{children:(0,ne.jsx)(X.Kd,{children:(0,ne.jsx)(ce.OJ,{children:(0,ne.jsx)(de.Y,{children:(0,ne.jsx)(se.BV,{children:(0,ne.jsxs)(fe,{children:[(0,ne.jsx)(_e,{}),(0,ne.jsx)($e,{}),(0,ne.jsx)(e.Suspense,{fallback:(0,ne.jsx)(vx,{}),children:(0,ne.jsxs)(X.BV,{children:[(0,ne.jsx)(X.qh,{path:"/",element:(0,ne.jsx)(yr,{})}),(0,ne.jsx)(X.qh,{path:"/about",element:(0,ne.jsx)(zr,{})}),(0,ne.jsx)(X.qh,{path:"/features",element:(0,ne.jsx)(xo,{})}),(0,ne.jsx)(X.qh,{path:"/service",element:(0,ne.jsx)(X.C5,{to:"/features",replace:!0})}),(0,ne.jsx)(X.qh,{path:"/pricing",element:(0,ne.jsx)(ai,{})}),(0,ne.jsx)(X.qh,{path:"/contact",element:(0,ne.jsx)(Ti,{})}),(0,ne.jsx)(X.qh,{path:"/demo",element:(0,ne.jsx)(ra,{})}),(0,ne.jsx)(X.qh,{path:"/signup",element:(0,ne.jsx)(us,{})}),(0,ne.jsx)(X.qh,{path:"/forgot-password",element:(0,ne.jsx)(Os,{})}),(0,ne.jsx)(X.qh,{path:"/reset-password",element:(0,ne.jsx)(il,{})}),(0,ne.jsx)(X.qh,{path:"/company",element:(0,ne.jsx)(Sl,{})}),(0,ne.jsx)(X.qh,{path:"/privacy",element:(0,ne.jsx)(Nl,{})}),(0,ne.jsx)(X.qh,{path:"/terms",element:(0,ne.jsx)(ld,{})}),(0,ne.jsx)(X.qh,{path:"/faq",element:(0,ne.jsx)(_d,{})}),(0,ne.jsx)(X.qh,{path:"/blog",element:(0,ne.jsx)(Qd,{})}),(0,ne.jsx)(X.qh,{path:"/blog/:slug",element:(0,ne.jsx)(fc,{})}),(0,ne.jsx)(X.qh,{path:"/pos",element:(0,ne.jsx)(Yc,{})}),(0,ne.jsx)(X.qh,{path:"/mobile/*",element:(0,ne.jsx)(bx,{})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/pos-terminal",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(jx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/kitchen",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(kx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/display",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(Sx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/floor-plan",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(Dx,{})})}),(0,ne.jsxs)(X.qh,{element:(0,ne.jsx)(pn,{}),children:[(0,ne.jsx)(X.qh,{path:"/pos/admin/dashboard",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Lx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/managers",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(qx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/restaurants",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Hx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/subscriptions",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Wx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/staff",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(py,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/invoices",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Ux,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/plans",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Vx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/report",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Qx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/support",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Kx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/contact-inquiries",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(Jx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/notices",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(gb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/system-config",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(ny,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/security",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(ry,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/backup",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(oy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/logs",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(iy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/content",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(ay,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/settings",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(yy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/payment-settings",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(by,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/site-settings",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(vy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/restaurant-subscriptions",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(sy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/admin/notification-settings",element:(0,ne.jsx)(Fe,{requiredRole:["System Admin"],children:(0,ne.jsx)(ky,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/profile",element:(0,ne.jsx)(Fe,{children:(0,ne.jsx)(Rx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/dashboard",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(Ny,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/restaurants",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(Ly,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/performance",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(qy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/reports",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(Hy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/invoices",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(Wy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/notices",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(Uy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/system-inquiry",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(Gy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/owner/operation-inquiry",element:(0,ne.jsx)(Fe,{requiredRole:["Restaurant Owner"],children:(0,ne.jsx)(Yy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/general/dashboard",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(Sy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/general/management",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(Vy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/general/stats",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(Qy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/general/subscriptions",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(Ky,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/general/system-inquiry",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(hb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/general/operation-inquiry",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(mb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/manager",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General"],children:(0,ne.jsx)(Ey,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/general/notices",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(xb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/invoices",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(Jy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/plans",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(Xy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/payment-settings",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)(Zy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/dashboard",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(Ay,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/management",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(eb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/performance",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(tb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/reports",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(nb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/subscriptions",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(rb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/system-inquiry",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(ub,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/operation-inquiry",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(pb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/manager",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General"],children:(0,ne.jsx)(_y,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/general/notices",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(fb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/invoices",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(ob,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/plans",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(ib,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/payment-settings",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(ab,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/company-info",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager"],children:(0,ne.jsx)(Ix,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/company-info",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Foodcourt Manager"],children:(0,ne.jsx)($x,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/recipes",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,ne.jsx)(Py,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand-products",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,ne.jsx)(Dy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand-inventory",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,ne.jsx)(Iy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand-product-recipes",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,ne.jsx)(My,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/recipe-management/recipes",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,ne.jsx)(By,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/recipe-management/ingredients",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,ne.jsx)(zy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/suppliers",element:(0,ne.jsx)(Fe,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,ne.jsx)(Ry,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/dashboard",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt Manager"],children:(0,ne.jsx)(Cy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/rent-management",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt Manager"],children:(0,ne.jsx)(sb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/foodcourt/tenant-support",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt Manager"],children:(0,ne.jsx)(lb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/dashboard",element:(0,ne.jsx)(Fe,{requiredRole:["Brand Manager"],children:(0,ne.jsx)(Fy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/franchise-support",element:(0,ne.jsx)(Fe,{requiredRole:["Brand Manager"],children:(0,ne.jsx)(db,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/brand/reports",element:(0,ne.jsx)(Fe,{requiredRole:["Brand Manager"],children:(0,ne.jsx)(cb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/dashboard",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(ly,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/subscriptions",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(dy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/restaurants",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(cy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/admins",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(uy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/sales",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(hy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/reports",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(my,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/customers",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(gy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/coupons",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(fy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/plans",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(xy,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/support",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(Xx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/operation-inquiry",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(ey,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/invoices",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(Yx,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/manager/notification-settings",element:(0,ne.jsx)(Fe,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(ky,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/restaurant/*",element:(0,ne.jsx)(vb,{})}),(0,ne.jsx)(X.qh,{path:"/pos/dashboard",element:(0,ne.jsx)(Fe,{children:(0,ne.jsx)(bb,{})})}),(0,ne.jsx)(X.qh,{path:"/pos/basic",element:(0,ne.jsx)(Fe,{children:(0,ne.jsx)(jy,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/dashboard",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,ne.jsx)(wy,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/live-orders",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(wx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/menu",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(_x,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/categories",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Ex,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/options",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Px,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/recipe-management",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Py,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/suppliers",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Ry,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/customers",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Bx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/staff",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,ne.jsx)(zx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/sales",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Tx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/coupons",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Ax,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/reports",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Cx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/support",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(Zx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/operation-inquiry",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(ty,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/notices",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(yb,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/settings",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Fx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/floor-plan-editor",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin"],children:(0,ne.jsx)(Nx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/company-information",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(Ox,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/profile",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,children:(0,ne.jsx)(Rx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/invoices",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(Gx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/history",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(Mx,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/notification-settings",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,ne.jsx)(ky,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/inventory",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Ty,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/stock-take",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Oy,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurants/:restaurantId/inventory",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Ty,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurants/:restaurantId/stock-take",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)(Oy,{})})}),(0,ne.jsx)(X.qh,{path:"/restaurant/:restaurantId/product-recipes",element:(0,ne.jsx)(Fe,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin","Staff"],children:(0,ne.jsx)($y,{})})})]})]})})]})})})})})})})})})})},jb=e=>{e&&e instanceof Function&&n.e(8206).then(n.bind(n,8206)).then(t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:i,getTTFB:a}=t;n(e),r(e),o(e),i(e),a(e)})},kb=window.fetch,Sb=(0,Jc.hY)();window.fetch=(e,t)=>{const n="string"===typeof e?e:e.toString();if(n.startsWith("/api/")&&Sb){return kb(`${Sb}${n}`,t)}return n.startsWith("/api/"),kb(e,t)};t.createRoot(document.getElementById("root")).render((0,ne.jsx)(e.StrictMode,{children:(0,ne.jsx)(W,{children:(0,ne.jsx)(wb,{})})})),jb()})()})();