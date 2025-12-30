/*! For license information please see main.20fb2d5e.js.LICENSE.txt */
(()=>{var e={403:e=>{e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<a.length;l++){var c=a[l];if(!s(c))return!1;var d=e[c],u=t[c];if(!1===(o=n?n.call(r,d,u,c):void 0)||void 0===o&&d!==u)return!1}return!0}},447:(e,t,n)=>{"use strict";n.d(t,{h:()=>i,sy:()=>s});var r=n(9950),o=n(4414);const a=(0,r.createContext)(void 0),i=()=>{const e=(0,r.useContext)(a);if(!e)throw new Error("useOrders must be used within an OrderProvider");return e},s=e=>{let{children:t}=e;const[n,i]=(0,r.useState)([]),s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}};(0,r.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/orders?limit=100",s()),t=await e.json();if(t.success){const e=t.data||t;i(e)}else console.error("OrderContext - Failed to load orders:",t.error),i([])}catch(e){console.error("OrderContext - Error loading orders from API:",e),i([])}})()},[]);return(0,o.jsx)(a.Provider,{value:{orders:n,addOrder:async(e,t)=>{try{var n,r;const o={restaurant_id:t,order_number:e.orderNumber||null,customer_name:e.customer.name,customer_phone:e.customer.phone,table_number:e.tableNumber||null,pager_number:e.pagerNumber||null,total_amount:e.total,subtotal:e.subtotal,tax:e.tax,tax_rate:e.taxRate||6,service_charge:e.serviceCharge||0,service_charge_rate:e.serviceChargeRate||10,discount:e.discount||0,coupon_code:(null===(n=e.coupon)||void 0===n?void 0:n.code)||null,coupon_discount:(null===(r=e.coupon)||void 0===r?void 0:r.amount)||0,takeaway_charge:e.takeawayCharge||0,status:e.status,order_type:"dine-in"===e.orderType?"dine_in":e.orderType,source:"pos",payment_method:e.paymentMethod||null,payment_status:e.paymentStatus||"pending",order_date:new Date,order_items:e.items.map(e=>({id:e.id,name:e.menuItem.name,price:e.menuItem.price,quantity:e.quantity,options:e.options||[],menuItem:e.menuItem,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}))},a=await fetch("/api/orders",s({method:"POST",body:JSON.stringify(o)}));if(!a.ok){const e=await a.text();throw console.error("OrderContext - HTTP error:",a.status,e),new Error(`Failed to create order: ${a.status} ${e}`)}const l=await a.json();if(!l.success)throw console.error("OrderContext - Failed to save order to database:",l.error),new Error(l.error||"Failed to create order");const c=l.data;return i(t=>t.find(t=>t.id===e.id)?(console.warn("OrderContext - Order already exists, skipping:",e.id),t):[...t,c]),c}catch(o){throw console.error("OrderContext - Error saving order to database:",o),o}},updateOrderStatus:async(e,t)=>{try{const n=await fetch(`/api/orders/${e}/status`,s({method:"PATCH",body:JSON.stringify({status:t})})),r=await n.json();if(!r.success)throw console.error("OrderContext - Failed to update order status:",r.error),new Error(r.error||"Failed to update order status");i(n=>n.map(n=>n.id===e?{...n,status:t}:n))}catch(n){throw console.error("OrderContext - Error updating order status:",n),n}},deleteOrder:async e=>{try{const t=await fetch(`/api/orders/${e}`,s({method:"DELETE"})),n=await t.json();if(!n.success)throw console.error("OrderContext - Failed to delete order:",n.error),new Error(n.error||"Failed to delete order");i(t=>t.filter(t=>t.id!==e))}catch(t){throw console.error("OrderContext - Error deleting order:",t),t}},getOrderById:e=>n.find(t=>t.id===e)},children:t})}},1085:(e,t,n)=>{"use strict";var r=n(5340),o=n(9950),a=n(7119);function i(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function c(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function d(e){if(l(e)!==e)throw Error(i(188))}function u(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=u(e)))return t;e=e.sibling}return null}var p=Object.assign,f=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),m=Symbol.for("react.portal"),g=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),b=Symbol.for("react.provider"),v=Symbol.for("react.consumer"),w=Symbol.for("react.context"),k=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),j=Symbol.for("react.suspense_list"),C=Symbol.for("react.memo"),E=Symbol.for("react.lazy");Symbol.for("react.scope");var A=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var F=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var _=Symbol.iterator;function P(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=_&&e[_]||e["@@iterator"])?e:null}var z=Symbol.for("react.client.reference");function R(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===z?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case g:return"Fragment";case y:return"Profiler";case x:return"StrictMode";case S:return"Suspense";case j:return"SuspenseList";case A:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case m:return"Portal";case w:return(e.displayName||"Context")+".Provider";case v:return(e._context.displayName||"Context")+".Consumer";case k:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case C:return null!==(t=e.displayName||null)?t:R(e.type)||"Memo";case E:t=e._payload,e=e._init;try{return R(e(t))}catch(n){}}return null}var O=Array.isArray,T=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I={pending:!1,data:null,method:null,action:null},N=[],D=-1;function L(e){return{current:e}}function $(e){0>D||(e.current=N[D],N[D]=null,D--)}function M(e,t){D++,N[D]=e.current,e.current=t}var q=L(null),H=L(null),U=L(null),W=L(null);function G(e,t){switch(M(U,t),M(H,e),M(q,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?ou(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=au(t=ou(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}$(q),M(q,e)}function V(){$(q),$(H),$(U)}function Y(e){null!==e.memoizedState&&M(W,e);var t=q.current,n=au(t,e.type);t!==n&&(M(H,e),M(q,n))}function Q(e){H.current===e&&($(q),$(H)),W.current===e&&($(W),Yu._currentValue=I)}var K=Object.prototype.hasOwnProperty,J=r.unstable_scheduleCallback,X=r.unstable_cancelCallback,Z=r.unstable_shouldYield,ee=r.unstable_requestPaint,te=r.unstable_now,ne=r.unstable_getCurrentPriorityLevel,re=r.unstable_ImmediatePriority,oe=r.unstable_UserBlockingPriority,ae=r.unstable_NormalPriority,ie=r.unstable_LowPriority,se=r.unstable_IdlePriority,le=r.log,ce=r.unstable_setDisableYieldValue,de=null,ue=null;function pe(e){if("function"===typeof le&&ce(e),ue&&"function"===typeof ue.setStrictMode)try{ue.setStrictMode(de,e)}catch(t){}}var fe=Math.clz32?Math.clz32:function(e){return 0===(e>>>=0)?32:31-(he(e)/me|0)|0},he=Math.log,me=Math.LN2;var ge=256,xe=4194304;function ye(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194048&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function be(e,t,n){var r=e.pendingLanes;if(0===r)return 0;var o=0,a=e.suspendedLanes,i=e.pingedLanes;e=e.warmLanes;var s=134217727&r;return 0!==s?0!==(r=s&~a)?o=ye(r):0!==(i&=s)?o=ye(i):n||0!==(n=s&~e)&&(o=ye(n)):0!==(s=r&~a)?o=ye(s):0!==i?o=ye(i):n||0!==(n=r&~e)&&(o=ye(n)),0===o?0:0!==t&&t!==o&&0===(t&a)&&((a=o&-o)>=(n=t&-t)||32===a&&0!==(4194048&n))?t:o}function ve(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function we(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function ke(){var e=ge;return 0===(4194048&(ge<<=1))&&(ge=256),e}function Se(){var e=xe;return 0===(62914560&(xe<<=1))&&(xe=4194304),e}function je(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ce(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ee(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-fe(t);e.entangledLanes|=t,e.entanglements[r]=1073741824|e.entanglements[r]|4194090&n}function Ae(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-fe(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}function Fe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function _e(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Pe(){var e=B.p;return 0!==e?e:void 0===(e=window.event)?32:cp(e.type)}var ze=Math.random().toString(36).slice(2),Re="__reactFiber$"+ze,Oe="__reactProps$"+ze,Te="__reactContainer$"+ze,Be="__reactEvents$"+ze,Ie="__reactListeners$"+ze,Ne="__reactHandles$"+ze,De="__reactResources$"+ze,Le="__reactMarker$"+ze;function $e(e){delete e[Re],delete e[Oe],delete e[Be],delete e[Ie],delete e[Ne]}function Me(e){var t=e[Re];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Te]||n[Re]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=bu(e);null!==e;){if(n=e[Re])return n;e=bu(e)}return t}n=(e=n).parentNode}return null}function qe(e){if(e=e[Re]||e[Te]){var t=e.tag;if(5===t||6===t||13===t||26===t||27===t||3===t)return e}return null}function He(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(i(33))}function Ue(e){var t=e[De];return t||(t=e[De]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function We(e){e[Le]=!0}var Ge=new Set,Ve={};function Ye(e,t){Qe(e,t),Qe(e+"Capture",t)}function Qe(e,t){for(Ve[e]=t,e=0;e<t.length;e++)Ge.add(t[e])}var Ke,Je,Xe=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ze={},et={};function tt(e,t,n){if(o=t,K.call(et,o)||!K.call(Ze,o)&&(Xe.test(o)?et[o]=!0:(Ze[o]=!0,0)))if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var r=t.toLowerCase().slice(0,5);if("data-"!==r&&"aria-"!==r)return void e.removeAttribute(t)}e.setAttribute(t,""+n)}var o}function nt(e,t,n){if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+n)}}function rt(e,t,n,r){if(null===r)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(n)}e.setAttributeNS(t,n,""+r)}}function ot(e){if(void 0===Ke)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ke=t&&t[1]||"",Je=-1<n.stack.indexOf("\n    at")?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+Ke+e+Je}var at=!1;function it(e,t){if(!e||at)return"";at=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(o){var r=o}Reflect.construct(e,[],n)}else{try{n.call()}catch(a){r=a}e.call(n.prototype)}}else{try{throw Error()}catch(i){r=i}(n=e())&&"function"===typeof n.catch&&n.catch(function(){})}}catch(s){if(s&&r&&"string"===typeof s.stack)return[s.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=r.DetermineComponentFrameRoot(),i=a[0],s=a[1];if(i&&s){var l=i.split("\n"),c=s.split("\n");for(o=r=0;r<l.length&&!l[r].includes("DetermineComponentFrameRoot");)r++;for(;o<c.length&&!c[o].includes("DetermineComponentFrameRoot");)o++;if(r===l.length||o===c.length)for(r=l.length-1,o=c.length-1;1<=r&&0<=o&&l[r]!==c[o];)o--;for(;1<=r&&0<=o;r--,o--)if(l[r]!==c[o]){if(1!==r||1!==o)do{if(r--,0>--o||l[r]!==c[o]){var d="\n"+l[r].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}}while(1<=r&&0<=o);break}}}finally{at=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ot(n):""}function st(e){switch(e.tag){case 26:case 27:case 5:return ot(e.type);case 16:return ot("Lazy");case 13:return ot("Suspense");case 19:return ot("SuspenseList");case 0:case 15:return it(e.type,!1);case 11:return it(e.type.render,!1);case 1:return it(e.type,!0);case 31:return ot("Activity");default:return""}}function lt(e){try{var t="";do{t+=st(e),e=e.return}while(e);return t}catch(n){return"\nError generating stack: "+n.message+"\n"+n.stack}}function ct(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function dt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function ut(e){e._valueTracker||(e._valueTracker=function(e){var t=dt(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var o=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(e){r=""+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function pt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=dt(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function ft(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var ht=/[\n"\\]/g;function mt(e){return e.replace(ht,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function gt(e,t,n,r,o,a,i,s){e.name="",null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i?e.type=i:e.removeAttribute("type"),null!=t?"number"===i?(0===t&&""===e.value||e.value!=t)&&(e.value=""+ct(t)):e.value!==""+ct(t)&&(e.value=""+ct(t)):"submit"!==i&&"reset"!==i||e.removeAttribute("value"),null!=t?yt(e,i,ct(t)):null!=n?yt(e,i,ct(n)):null!=r&&e.removeAttribute("value"),null==o&&null!=a&&(e.defaultChecked=!!a),null!=o&&(e.checked=o&&"function"!==typeof o&&"symbol"!==typeof o),null!=s&&"function"!==typeof s&&"symbol"!==typeof s&&"boolean"!==typeof s?e.name=""+ct(s):e.removeAttribute("name")}function xt(e,t,n,r,o,a,i,s){if(null!=a&&"function"!==typeof a&&"symbol"!==typeof a&&"boolean"!==typeof a&&(e.type=a),null!=t||null!=n){if(!("submit"!==a&&"reset"!==a||void 0!==t&&null!==t))return;n=null!=n?""+ct(n):"",t=null!=t?""+ct(t):n,s||t===e.value||(e.value=t),e.defaultValue=t}r="function"!==typeof(r=null!=r?r:o)&&"symbol"!==typeof r&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.name=i)}function yt(e,t,n){"number"===t&&ft(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function bt(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ct(n),t=null,o=0;o<e.length;o++){if(e[o].value===n)return e[o].selected=!0,void(r&&(e[o].defaultSelected=!0));null!==t||e[o].disabled||(t=e[o])}null!==t&&(t.selected=!0)}}function vt(e,t,n){null==t||((t=""+ct(t))!==e.value&&(e.value=t),null!=n)?e.defaultValue=null!=n?""+ct(n):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,n,r){if(null==t){if(null!=r){if(null!=n)throw Error(i(92));if(O(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}null==n&&(n=""),t=n}n=ct(t),e.defaultValue=n,(r=e.textContent)===n&&""!==r&&null!==r&&(e.value=r)}function kt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var St=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function jt(e,t,n){var r=0===t.indexOf("--");null==n||"boolean"===typeof n||""===n?r?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":r?e.setProperty(t,n):"number"!==typeof n||0===n||St.has(t)?"float"===t?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Ct(e,t,n){if(null!=t&&"object"!==typeof t)throw Error(i(62));if(e=e.style,null!=n){for(var r in n)!n.hasOwnProperty(r)||null!=t&&t.hasOwnProperty(r)||(0===r.indexOf("--")?e.setProperty(r,""):"float"===r?e.cssFloat="":e[r]="");for(var o in t)r=t[o],t.hasOwnProperty(o)&&n[o]!==r&&jt(e,o,r)}else for(var a in t)t.hasOwnProperty(a)&&jt(e,a,t[a])}function Et(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var At=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ft=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function _t(e){return Ft.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Pt=null;function zt(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Rt=null,Ot=null;function Tt(e){var t=qe(e);if(t&&(e=t.stateNode)){var n=e[Oe]||null;e:switch(e=t.stateNode,t.type){case"input":if(gt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+mt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=r[Oe]||null;if(!o)throw Error(i(90));gt(r,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(t=0;t<n.length;t++)(r=n[t]).form===e.form&&pt(r)}break e;case"textarea":vt(e,n.value,n.defaultValue);break e;case"select":null!=(t=n.value)&&bt(e,!!n.multiple,t,!1)}}}var Bt=!1;function It(e,t,n){if(Bt)return e(t,n);Bt=!0;try{return e(t)}finally{if(Bt=!1,(null!==Rt||null!==Ot)&&(Mc(),Rt&&(t=Rt,e=Ot,Ot=Rt=null,Tt(t),e)))for(t=0;t<e.length;t++)Tt(e[t])}}function Nt(e,t){var n=e.stateNode;if(null===n)return null;var r=n[Oe]||null;if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(i(231,t,typeof n));return n}var Dt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Lt=!1;if(Dt)try{var $t={};Object.defineProperty($t,"passive",{get:function(){Lt=!0}}),window.addEventListener("test",$t,$t),window.removeEventListener("test",$t,$t)}catch(Op){Lt=!1}var Mt=null,qt=null,Ht=null;function Ut(){if(Ht)return Ht;var e,t,n=qt,r=n.length,o="value"in Mt?Mt.value:Mt.textContent,a=o.length;for(e=0;e<r&&n[e]===o[e];e++);var i=r-e;for(t=1;t<=i&&n[r-t]===o[a-t];t++);return Ht=o.slice(e,1<t?1-t:void 0)}function Wt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Gt(){return!0}function Vt(){return!1}function Yt(e){function t(t,n,r,o,a){for(var i in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=o,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(o):o[i]);return this.isDefaultPrevented=(null!=o.defaultPrevented?o.defaultPrevented:!1===o.returnValue)?Gt:Vt,this.isPropagationStopped=Vt,this}return p(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Gt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Gt)},persist:function(){},isPersistent:Gt}),t}var Qt,Kt,Jt,Xt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zt=Yt(Xt),en=p({},Xt,{view:0,detail:0}),tn=Yt(en),nn=p({},en,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:hn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Jt&&(Jt&&"mousemove"===e.type?(Qt=e.screenX-Jt.screenX,Kt=e.screenY-Jt.screenY):Kt=Qt=0,Jt=e),Qt)},movementY:function(e){return"movementY"in e?e.movementY:Kt}}),rn=Yt(nn),on=Yt(p({},nn,{dataTransfer:0})),an=Yt(p({},en,{relatedTarget:0})),sn=Yt(p({},Xt,{animationName:0,elapsedTime:0,pseudoElement:0})),ln=Yt(p({},Xt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),cn=Yt(p({},Xt,{data:0})),dn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},un={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=pn[e])&&!!t[e]}function hn(){return fn}var mn=Yt(p({},en,{key:function(e){if(e.key){var t=dn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Wt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?un[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:hn,charCode:function(e){return"keypress"===e.type?Wt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Wt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),gn=Yt(p({},nn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),xn=Yt(p({},en,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:hn})),yn=Yt(p({},Xt,{propertyName:0,elapsedTime:0,pseudoElement:0})),bn=Yt(p({},nn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),vn=Yt(p({},Xt,{newState:0,oldState:0})),wn=[9,13,27,32],kn=Dt&&"CompositionEvent"in window,Sn=null;Dt&&"documentMode"in document&&(Sn=document.documentMode);var jn=Dt&&"TextEvent"in window&&!Sn,Cn=Dt&&(!kn||Sn&&8<Sn&&11>=Sn),En=String.fromCharCode(32),An=!1;function Fn(e,t){switch(e){case"keyup":return-1!==wn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _n(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Pn=!1;var zn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!zn[e.type]:"textarea"===t}function On(e,t,n,r){Rt?Ot?Ot.push(r):Ot=[r]:Rt=r,0<(t=Ud(t,"onChange")).length&&(n=new Zt("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Tn=null,Bn=null;function In(e){Id(e,0)}function Nn(e){if(pt(He(e)))return e}function Dn(e,t){if("change"===e)return t}var Ln=!1;if(Dt){var $n;if(Dt){var Mn="oninput"in document;if(!Mn){var qn=document.createElement("div");qn.setAttribute("oninput","return;"),Mn="function"===typeof qn.oninput}$n=Mn}else $n=!1;Ln=$n&&(!document.documentMode||9<document.documentMode)}function Hn(){Tn&&(Tn.detachEvent("onpropertychange",Un),Bn=Tn=null)}function Un(e){if("value"===e.propertyName&&Nn(Bn)){var t=[];On(t,Bn,e,zt(e)),It(In,t)}}function Wn(e,t,n){"focusin"===e?(Hn(),Bn=n,(Tn=t).attachEvent("onpropertychange",Un)):"focusout"===e&&Hn()}function Gn(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Nn(Bn)}function Vn(e,t){if("click"===e)return Nn(t)}function Yn(e,t){if("input"===e||"change"===e)return Nn(t)}var Qn="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Kn(e,t){if(Qn(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!K.call(t,o)||!Qn(e[o],t[o]))return!1}return!0}function Jn(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xn(e,t){var n,r=Jn(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Jn(r)}}function Zn(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?Zn(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function er(e){for(var t=ft((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=ft((e=t.contentWindow).document)}return t}function tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var nr=Dt&&"documentMode"in document&&11>=document.documentMode,rr=null,or=null,ar=null,ir=!1;function sr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;ir||null==rr||rr!==ft(r)||("selectionStart"in(r=rr)&&tr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},ar&&Kn(ar,r)||(ar=r,0<(r=Ud(or,"onSelect")).length&&(t=new Zt("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=rr)))}function lr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var cr={animationend:lr("Animation","AnimationEnd"),animationiteration:lr("Animation","AnimationIteration"),animationstart:lr("Animation","AnimationStart"),transitionrun:lr("Transition","TransitionRun"),transitionstart:lr("Transition","TransitionStart"),transitioncancel:lr("Transition","TransitionCancel"),transitionend:lr("Transition","TransitionEnd")},dr={},ur={};function pr(e){if(dr[e])return dr[e];if(!cr[e])return e;var t,n=cr[e];for(t in n)if(n.hasOwnProperty(t)&&t in ur)return dr[e]=n[t];return e}Dt&&(ur=document.createElement("div").style,"AnimationEvent"in window||(delete cr.animationend.animation,delete cr.animationiteration.animation,delete cr.animationstart.animation),"TransitionEvent"in window||delete cr.transitionend.transition);var fr=pr("animationend"),hr=pr("animationiteration"),mr=pr("animationstart"),gr=pr("transitionrun"),xr=pr("transitionstart"),yr=pr("transitioncancel"),br=pr("transitionend"),vr=new Map,wr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kr(e,t){vr.set(e,t),Ye(t,[e])}wr.push("scrollEnd");var Sr=new WeakMap;function jr(e,t){if("object"===typeof e&&null!==e){var n=Sr.get(e);return void 0!==n?n:(t={value:e,source:t,stack:lt(t)},Sr.set(e,t),t)}return{value:e,source:t,stack:lt(t)}}var Cr=[],Er=0,Ar=0;function Fr(){for(var e=Er,t=Ar=Er=0;t<e;){var n=Cr[t];Cr[t++]=null;var r=Cr[t];Cr[t++]=null;var o=Cr[t];Cr[t++]=null;var a=Cr[t];if(Cr[t++]=null,null!==r&&null!==o){var i=r.pending;null===i?o.next=o:(o.next=i.next,i.next=o),r.pending=o}0!==a&&Rr(n,o,a)}}function _r(e,t,n,r){Cr[Er++]=e,Cr[Er++]=t,Cr[Er++]=n,Cr[Er++]=r,Ar|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Pr(e,t,n,r){return _r(e,t,n,r),Or(e)}function zr(e,t){return _r(e,null,null,t),Or(e)}function Rr(e,t,n){e.lanes|=n;var r=e.alternate;null!==r&&(r.lanes|=n);for(var o=!1,a=e.return;null!==a;)a.childLanes|=n,null!==(r=a.alternate)&&(r.childLanes|=n),22===a.tag&&(null===(e=a.stateNode)||1&e._visibility||(o=!0)),e=a,a=a.return;return 3===e.tag?(a=e.stateNode,o&&null!==t&&(o=31-fe(n),null===(r=(e=a.hiddenUpdates)[o])?e[o]=[t]:r.push(t),t.lane=536870912|n),a):null}function Or(e){if(50<Rc)throw Rc=0,Oc=null,Error(i(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Tr={};function Br(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ir(e,t,n,r){return new Br(e,t,n,r)}function Nr(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Dr(e,t){var n=e.alternate;return null===n?((n=Ir(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=65011712&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Lr(e,t){e.flags&=65011714;var n=e.alternate;return null===n?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function $r(e,t,n,r,o,a){var s=0;if(r=e,"function"===typeof e)Nr(e)&&(s=1);else if("string"===typeof e)s=function(e,t,n){if(1===n||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,n,q.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case A:return(e=Ir(31,n,t,o)).elementType=A,e.lanes=a,e;case g:return Mr(n.children,o,a,t);case x:s=8,o|=24;break;case y:return(e=Ir(12,n,t,2|o)).elementType=y,e.lanes=a,e;case S:return(e=Ir(13,n,t,o)).elementType=S,e.lanes=a,e;case j:return(e=Ir(19,n,t,o)).elementType=j,e.lanes=a,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case b:case w:s=10;break e;case v:s=9;break e;case k:s=11;break e;case C:s=14;break e;case E:s=16,r=null;break e}s=29,n=Error(i(130,null===e?"null":typeof e,"")),r=null}return(t=Ir(s,n,t,o)).elementType=e,t.type=r,t.lanes=a,t}function Mr(e,t,n,r){return(e=Ir(7,e,r,t)).lanes=n,e}function qr(e,t,n){return(e=Ir(6,e,null,t)).lanes=n,e}function Hr(e,t,n){return(t=Ir(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ur=[],Wr=0,Gr=null,Vr=0,Yr=[],Qr=0,Kr=null,Jr=1,Xr="";function Zr(e,t){Ur[Wr++]=Vr,Ur[Wr++]=Gr,Gr=e,Vr=t}function eo(e,t,n){Yr[Qr++]=Jr,Yr[Qr++]=Xr,Yr[Qr++]=Kr,Kr=e;var r=Jr;e=Xr;var o=32-fe(r)-1;r&=~(1<<o),n+=1;var a=32-fe(t)+o;if(30<a){var i=o-o%5;a=(r&(1<<i)-1).toString(32),r>>=i,o-=i,Jr=1<<32-fe(t)+o|n<<o|r,Xr=a+e}else Jr=1<<a|n<<o|r,Xr=e}function to(e){null!==e.return&&(Zr(e,1),eo(e,1,0))}function no(e){for(;e===Gr;)Gr=Ur[--Wr],Ur[Wr]=null,Vr=Ur[--Wr],Ur[Wr]=null;for(;e===Kr;)Kr=Yr[--Qr],Yr[Qr]=null,Xr=Yr[--Qr],Yr[Qr]=null,Jr=Yr[--Qr],Yr[Qr]=null}var ro=null,oo=null,ao=!1,io=null,so=!1,lo=Error(i(519));function co(e){throw go(jr(Error(i(418,"")),e)),lo}function uo(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Re]=e,t[Oe]=r,n){case"dialog":Nd("cancel",t),Nd("close",t);break;case"iframe":case"object":case"embed":Nd("load",t);break;case"video":case"audio":for(n=0;n<Td.length;n++)Nd(Td[n],t);break;case"source":Nd("error",t);break;case"img":case"image":case"link":Nd("error",t),Nd("load",t);break;case"details":Nd("toggle",t);break;case"input":Nd("invalid",t),xt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),ut(t);break;case"select":Nd("invalid",t);break;case"textarea":Nd("invalid",t),wt(t,r.value,r.defaultValue,r.children),ut(t)}"string"!==typeof(n=r.children)&&"number"!==typeof n&&"bigint"!==typeof n||t.textContent===""+n||!0===r.suppressHydrationWarning||Kd(t.textContent,n)?(null!=r.popover&&(Nd("beforetoggle",t),Nd("toggle",t)),null!=r.onScroll&&Nd("scroll",t),null!=r.onScrollEnd&&Nd("scrollend",t),null!=r.onClick&&(t.onclick=Jd),t=!0):t=!1,t||co(e)}function po(e){for(ro=e.return;ro;)switch(ro.tag){case 5:case 13:return void(so=!1);case 27:case 3:return void(so=!0);default:ro=ro.return}}function fo(e){if(e!==ro)return!1;if(!ao)return po(e),ao=!0,!1;var t,n=e.tag;if((t=3!==n&&27!==n)&&((t=5===n)&&(t=!("form"!==(t=e.type)&&"button"!==t)||iu(e.type,e.memoizedProps)),t=!t),t&&oo&&co(e),po(e),13===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(i(317));e:{for(e=e.nextSibling,n=0;e;){if(8===e.nodeType)if("/$"===(t=e.data)){if(0===n){oo=xu(e.nextSibling);break e}n--}else"$"!==t&&"$!"!==t&&"$?"!==t||n++;e=e.nextSibling}oo=null}}else 27===n?(n=oo,fu(e.type)?(e=yu,yu=null,oo=e):oo=n):oo=ro?xu(e.stateNode.nextSibling):null;return!0}function ho(){oo=ro=null,ao=!1}function mo(){var e=io;return null!==e&&(null===bc?bc=e:bc.push.apply(bc,e),io=null),e}function go(e){null===io?io=[e]:io.push(e)}var xo=L(null),yo=null,bo=null;function vo(e,t,n){M(xo,t._currentValue),t._currentValue=n}function wo(e){e._currentValue=xo.current,$(xo)}function ko(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function So(e,t,n,r){var o=e.child;for(null!==o&&(o.return=e);null!==o;){var a=o.dependencies;if(null!==a){var s=o.child;a=a.firstContext;e:for(;null!==a;){var l=a;a=o;for(var c=0;c<t.length;c++)if(l.context===t[c]){a.lanes|=n,null!==(l=a.alternate)&&(l.lanes|=n),ko(a.return,n,e),r||(s=null);break e}a=l.next}}else if(18===o.tag){if(null===(s=o.return))throw Error(i(341));s.lanes|=n,null!==(a=s.alternate)&&(a.lanes|=n),ko(s,n,e),s=null}else s=o.child;if(null!==s)s.return=o;else for(s=o;null!==s;){if(s===e){s=null;break}if(null!==(o=s.sibling)){o.return=s.return,s=o;break}s=s.return}o=s}}function jo(e,t,n,r){e=null;for(var o=t,a=!1;null!==o;){if(!a)if(0!==(524288&o.flags))a=!0;else if(0!==(262144&o.flags))break;if(10===o.tag){var s=o.alternate;if(null===s)throw Error(i(387));if(null!==(s=s.memoizedProps)){var l=o.type;Qn(o.pendingProps.value,s.value)||(null!==e?e.push(l):e=[l])}}else if(o===W.current){if(null===(s=o.alternate))throw Error(i(387));s.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(null!==e?e.push(Yu):e=[Yu])}o=o.return}null!==e&&So(t,e,n,r),t.flags|=262144}function Co(e){for(e=e.firstContext;null!==e;){if(!Qn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Eo(e){yo=e,bo=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Ao(e){return _o(yo,e)}function Fo(e,t){return null===yo&&Eo(e),_o(e,t)}function _o(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},null===bo){if(null===e)throw Error(i(308));bo=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else bo=bo.next=t;return n}var Po="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},zo=r.unstable_scheduleCallback,Ro=r.unstable_NormalPriority,Oo={$$typeof:w,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function To(){return{controller:new Po,data:new Map,refCount:0}}function Bo(e){e.refCount--,0===e.refCount&&zo(Ro,function(){e.controller.abort()})}var Io=null,No=0,Do=0,Lo=null;function $o(){if(0===--No&&null!==Io){null!==Lo&&(Lo.status="fulfilled");var e=Io;Io=null,Do=0,Lo=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Mo=T.S;T.S=function(e,t){"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Io){var n=Io=[];No=0,Do=_d(),Lo={status:"pending",value:void 0,then:function(e){n.push(e)}}}No++,t.then($o,$o)}(0,t),null!==Mo&&Mo(e,t)};var qo=L(null);function Ho(){var e=qo.current;return null!==e?e:rc.pooledCache}function Uo(e,t){M(qo,null===t?qo.current:t.pool)}function Wo(){var e=Ho();return null===e?null:{parent:Oo._currentValue,pool:e}}var Go=Error(i(460)),Vo=Error(i(474)),Yo=Error(i(542)),Qo={then:function(){}};function Ko(e){return"fulfilled"===(e=e.status)||"rejected"===e}function Jo(){}function Xo(e,t,n){switch(void 0===(n=e[n])?e.push(t):n!==t&&(t.then(Jo,Jo),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw ta(e=t.reason),e;default:if("string"===typeof t.status)t.then(Jo,Jo);else{if(null!==(e=rc)&&100<e.shellSuspendCounter)throw Error(i(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var n=t;n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw ta(e=t.reason),e}throw Zo=t,Go}}var Zo=null;function ea(){if(null===Zo)throw Error(i(459));var e=Zo;return Zo=null,e}function ta(e){if(e===Go||e===Yo)throw Error(i(483))}var na=!1;function ra(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function oa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function aa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ia(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&nc)){var o=r.pending;return null===o?t.next=t:(t.next=o.next,o.next=t),r.pending=t,t=Or(e),Rr(e,null,n),t}return _r(e,r,t,n),Or(e)}function sa(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Ae(e,n)}}function la(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var o=null,a=null;if(null!==(n=n.firstBaseUpdate)){do{var i={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};null===a?o=a=i:a=a.next=i,n=n.next}while(null!==n);null===a?o=a=t:a=a.next=t}else o=a=t;return n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var ca=!1;function da(){if(ca){if(null!==Lo)throw Lo}}function ua(e,t,n,r){ca=!1;var o=e.updateQueue;na=!1;var a=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(null!==s){o.shared.pending=null;var l=s,c=l.next;l.next=null,null===i?a=c:i.next=c,i=l;var d=e.alternate;null!==d&&((s=(d=d.updateQueue).lastBaseUpdate)!==i&&(null===s?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(null!==a){var u=o.baseState;for(i=0,d=c=l=null,s=a;;){var f=-536870913&s.lane,h=f!==s.lane;if(h?(ac&f)===f:(r&f)===f){0!==f&&f===Do&&(ca=!0),null!==d&&(d=d.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var m=e,g=s;f=t;var x=n;switch(g.tag){case 1:if("function"===typeof(m=g.payload)){u=m.call(x,u,f);break e}u=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null===(f="function"===typeof(m=g.payload)?m.call(x,u,f):m)||void 0===f)break e;u=p({},u,f);break e;case 2:na=!0}}null!==(f=s.callback)&&(e.flags|=64,h&&(e.flags|=8192),null===(h=o.callbacks)?o.callbacks=[f]:h.push(f))}else h={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===d?(c=d=h,l=u):d=d.next=h,i|=f;if(null===(s=s.next)){if(null===(s=o.shared.pending))break;s=(h=s).next,h.next=null,o.lastBaseUpdate=h,o.shared.pending=null}}null===d&&(l=u),o.baseState=l,o.firstBaseUpdate=c,o.lastBaseUpdate=d,null===a&&(o.shared.lanes=0),fc|=i,e.lanes=i,e.memoizedState=u}}function pa(e,t){if("function"!==typeof e)throw Error(i(191,e));e.call(t)}function fa(e,t){var n=e.callbacks;if(null!==n)for(e.callbacks=null,e=0;e<n.length;e++)pa(n[e],t)}var ha=L(null),ma=L(0);function ga(e,t){M(ma,e=uc),M(ha,t),uc=e|t.baseLanes}function xa(){M(ma,uc),M(ha,ha.current)}function ya(){uc=ma.current,$(ha),$(ma)}var ba=0,va=null,wa=null,ka=null,Sa=!1,ja=!1,Ca=!1,Ea=0,Aa=0,Fa=null,_a=0;function Pa(){throw Error(i(321))}function za(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Qn(e[n],t[n]))return!1;return!0}function Ra(e,t,n,r,o,a){return ba=a,va=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=null===e||null===e.memoizedState?Gi:Vi,Ca=!1,a=n(r,o),Ca=!1,ja&&(a=Ta(t,n,r,o)),Oa(e),a}function Oa(e){T.H=Wi;var t=null!==wa&&null!==wa.next;if(ba=0,ka=wa=va=null,Sa=!1,Aa=0,Fa=null,t)throw Error(i(300));null===e||As||null!==(e=e.dependencies)&&Co(e)&&(As=!0)}function Ta(e,t,n,r){va=e;var o=0;do{if(ja&&(Fa=null),Aa=0,ja=!1,25<=o)throw Error(i(301));if(o+=1,ka=wa=null,null!=e.updateQueue){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,null!=a.memoCache&&(a.memoCache.index=0)}T.H=Yi,a=t(n,r)}while(ja);return a}function Ba(){var e=T.H,t=e.useState()[0];return t="function"===typeof t.then?Ma(t):t,e=e.useState()[0],(null!==wa?wa.memoizedState:null)!==e&&(va.flags|=1024),t}function Ia(){var e=0!==Ea;return Ea=0,e}function Na(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Da(e){if(Sa){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Sa=!1}ba=0,ka=wa=va=null,ja=!1,Aa=Ea=0,Fa=null}function La(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ka?va.memoizedState=ka=e:ka=ka.next=e,ka}function $a(){if(null===wa){var e=va.alternate;e=null!==e?e.memoizedState:null}else e=wa.next;var t=null===ka?va.memoizedState:ka.next;if(null!==t)ka=t,wa=e;else{if(null===e){if(null===va.alternate)throw Error(i(467));throw Error(i(310))}e={memoizedState:(wa=e).memoizedState,baseState:wa.baseState,baseQueue:wa.baseQueue,queue:wa.queue,next:null},null===ka?va.memoizedState=ka=e:ka=ka.next=e}return ka}function Ma(e){var t=Aa;return Aa+=1,null===Fa&&(Fa=[]),e=Xo(Fa,e,t),t=va,null===(null===ka?t.memoizedState:ka.next)&&(t=t.alternate,T.H=null===t||null===t.memoizedState?Gi:Vi),e}function qa(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return Ma(e);if(e.$$typeof===w)return Ao(e)}throw Error(i(438,String(e)))}function Ha(e){var t=null,n=va.updateQueue;if(null!==n&&(t=n.memoCache),null==t){var r=va.alternate;null!==r&&(null!==(r=r.updateQueue)&&(null!=(r=r.memoCache)&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===n&&(n={lastEffect:null,events:null,stores:null,memoCache:null},va.updateQueue=n),n.memoCache=t,void 0===(n=t.data[t.index]))for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=F;return t.index++,n}function Ua(e,t){return"function"===typeof t?t(e):t}function Wa(e){return Ga($a(),wa,e)}function Ga(e,t,n){var r=e.queue;if(null===r)throw Error(i(311));r.lastRenderedReducer=n;var o=e.baseQueue,a=r.pending;if(null!==a){if(null!==o){var s=o.next;o.next=a.next,a.next=s}t.baseQueue=o=a,r.pending=null}if(a=e.baseState,null===o)e.memoizedState=a;else{var l=s=null,c=null,d=t=o.next,u=!1;do{var p=-536870913&d.lane;if(p!==d.lane?(ac&p)===p:(ba&p)===p){var f=d.revertLane;if(0===f)null!==c&&(c=c.next={lane:0,revertLane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),p===Do&&(u=!0);else{if((ba&f)===f){d=d.next,f===Do&&(u=!0);continue}p={lane:0,revertLane:d.revertLane,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(l=c=p,s=a):c=c.next=p,va.lanes|=f,fc|=f}p=d.action,Ca&&n(a,p),a=d.hasEagerState?d.eagerState:n(a,p)}else f={lane:p,revertLane:d.revertLane,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(l=c=f,s=a):c=c.next=f,va.lanes|=p,fc|=p;d=d.next}while(null!==d&&d!==t);if(null===c?s=a:c.next=l,!Qn(a,e.memoizedState)&&(As=!0,u&&null!==(n=Lo)))throw n;e.memoizedState=a,e.baseState=s,e.baseQueue=c,r.lastRenderedState=a}return null===o&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Va(e){var t=$a(),n=t.queue;if(null===n)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,a=t.memoizedState;if(null!==o){n.pending=null;var s=o=o.next;do{a=e(a,s.action),s=s.next}while(s!==o);Qn(a,t.memoizedState)||(As=!0),t.memoizedState=a,null===t.baseQueue&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Ya(e,t,n){var r=va,o=$a(),a=ao;if(a){if(void 0===n)throw Error(i(407));n=n()}else n=t();var s=!Qn((wa||o).memoizedState,n);if(s&&(o.memoizedState=n,As=!0),o=o.queue,xi(2048,8,Ja.bind(null,r,o,e),[e]),o.getSnapshot!==t||s||null!==ka&&1&ka.memoizedState.tag){if(r.flags|=2048,hi(9,{destroy:void 0,resource:void 0},Ka.bind(null,r,o,n,t),null),null===rc)throw Error(i(349));a||0!==(124&ba)||Qa(r,t,n)}return n}function Qa(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=va.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},va.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Ka(e,t,n,r){t.value=n,t.getSnapshot=r,Xa(t)&&Za(e)}function Ja(e,t,n){return n(function(){Xa(t)&&Za(e)})}function Xa(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Qn(e,n)}catch(r){return!0}}function Za(e){var t=zr(e,2);null!==t&&Ic(t,e,2)}function ei(e){var t=La();if("function"===typeof e){var n=e;if(e=n(),Ca){pe(!0);try{n()}finally{pe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:e},t}function ti(e,t,n,r){return e.baseState=n,Ga(e,wa,"function"===typeof r?r:Ua)}function ni(e,t,n,r,o){if(qi(e))throw Error(i(485));if(null!==(e=t.action)){var a={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};null!==T.T?n(!0):a.isTransition=!1,r(a),null===(n=t.pending)?(a.next=t.pending=a,ri(t,a)):(a.next=n.next,t.pending=n.next=a)}}function ri(e,t){var n=t.action,r=t.payload,o=e.state;if(t.isTransition){var a=T.T,i={};T.T=i;try{var s=n(o,r),l=T.S;null!==l&&l(i,s),oi(e,t,s)}catch(c){ii(e,t,c)}finally{T.T=a}}else try{oi(e,t,a=n(o,r))}catch(d){ii(e,t,d)}}function oi(e,t,n){null!==n&&"object"===typeof n&&"function"===typeof n.then?n.then(function(n){ai(e,t,n)},function(n){return ii(e,t,n)}):ai(e,t,n)}function ai(e,t,n){t.status="fulfilled",t.value=n,si(t),e.state=n,null!==(t=e.pending)&&((n=t.next)===t?e.pending=null:(n=n.next,t.next=n,ri(e,n)))}function ii(e,t,n){var r=e.pending;if(e.pending=null,null!==r){r=r.next;do{t.status="rejected",t.reason=n,si(t),t=t.next}while(t!==r)}e.action=null}function si(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function li(e,t){return t}function ci(e,t){if(ao){var n=rc.formState;if(null!==n){e:{var r=va;if(ao){if(oo){t:{for(var o=oo,a=so;8!==o.nodeType;){if(!a){o=null;break t}if(null===(o=xu(o.nextSibling))){o=null;break t}}o="F!"===(a=o.data)||"F"===a?o:null}if(o){oo=xu(o.nextSibling),r="F!"===o.data;break e}}co(r)}r=!1}r&&(t=n[0])}}return(n=La()).memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:li,lastRenderedState:t},n.queue=r,n=Li.bind(null,va,r),r.dispatch=n,r=ei(!1),a=Mi.bind(null,va,!1,r.queue),o={state:t,dispatch:null,action:e,pending:null},(r=La()).queue=o,n=ni.bind(null,va,o,a,n),o.dispatch=n,r.memoizedState=e,[t,n,!1]}function di(e){return ui($a(),wa,e)}function ui(e,t,n){if(t=Ga(e,t,li)[0],e=Wa(Ua)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var r=Ma(t)}catch(i){if(i===Go)throw Yo;throw i}else r=t;var o=(t=$a()).queue,a=o.dispatch;return n!==t.memoizedState&&(va.flags|=2048,hi(9,{destroy:void 0,resource:void 0},pi.bind(null,o,n),null)),[r,a,e]}function pi(e,t){e.action=t}function fi(e){var t=$a(),n=wa;if(null!==n)return ui(t,n,e);$a(),t=t.memoizedState;var r=(n=$a()).queue.dispatch;return n.memoizedState=e,[t,r,!1]}function hi(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},null===(t=va.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},va.updateQueue=t),null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function mi(){return $a().memoizedState}function gi(e,t,n,r){var o=La();r=void 0===r?null:r,va.flags|=e,o.memoizedState=hi(1|t,{destroy:void 0,resource:void 0},n,r)}function xi(e,t,n,r){var o=$a();r=void 0===r?null:r;var a=o.memoizedState.inst;null!==wa&&null!==r&&za(r,wa.memoizedState.deps)?o.memoizedState=hi(t,a,n,r):(va.flags|=e,o.memoizedState=hi(1|t,a,n,r))}function yi(e,t){gi(8390656,8,e,t)}function bi(e,t){xi(2048,8,e,t)}function vi(e,t){return xi(4,2,e,t)}function wi(e,t){return xi(4,4,e,t)}function ki(e,t){if("function"===typeof t){e=e();var n=t(e);return function(){"function"===typeof n?n():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function Si(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,xi(4,4,ki.bind(null,t,e),n)}function ji(){}function Ci(e,t){var n=$a();t=void 0===t?null:t;var r=n.memoizedState;return null!==t&&za(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ei(e,t){var n=$a();t=void 0===t?null:t;var r=n.memoizedState;if(null!==t&&za(t,r[1]))return r[0];if(r=e(),Ca){pe(!0);try{e()}finally{pe(!1)}}return n.memoizedState=[r,t],r}function Ai(e,t,n){return void 0===n||0!==(1073741824&ba)?e.memoizedState=t:(e.memoizedState=n,e=Bc(),va.lanes|=e,fc|=e,n)}function Fi(e,t,n,r){return Qn(n,t)?n:null!==ha.current?(e=Ai(e,n,r),Qn(e,t)||(As=!0),e):0===(42&ba)?(As=!0,e.memoizedState=n):(e=Bc(),va.lanes|=e,fc|=e,t)}function _i(e,t,n,r,o){var a=B.p;B.p=0!==a&&8>a?a:8;var i=T.T,s={};T.T=s,Mi(e,!1,t,n);try{var l=o(),c=T.S;if(null!==c&&c(s,l),null!==l&&"object"===typeof l&&"function"===typeof l.then)$i(e,t,function(e,t){var n=[],r={status:"pending",value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status="rejected",r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}(l,r),Tc());else $i(e,t,r,Tc())}catch(d){$i(e,t,{then:function(){},status:"rejected",reason:d},Tc())}finally{B.p=a,T.T=i}}function Pi(){}function zi(e,t,n,r){if(5!==e.tag)throw Error(i(476));var o=Ri(e).queue;_i(e,o,t,I,null===n?Pi:function(){return Oi(e),n(r)})}function Ri(e){var t=e.memoizedState;if(null!==t)return t;var n={};return(t={memoizedState:I,baseState:I,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:I},next:null}).next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ua,lastRenderedState:n},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function Oi(e){$i(e,Ri(e).next.queue,{},Tc())}function Ti(){return Ao(Yu)}function Bi(){return $a().memoizedState}function Ii(){return $a().memoizedState}function Ni(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var n=Tc(),r=ia(t,e=aa(n),n);return null!==r&&(Ic(r,t,n),sa(r,t,n)),t={cache:To()},void(e.payload=t)}t=t.return}}function Di(e,t,n){var r=Tc();n={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},qi(e)?Hi(t,n):null!==(n=Pr(e,t,n,r))&&(Ic(n,e,r),Ui(n,t,r))}function Li(e,t,n){$i(e,t,n,Tc())}function $i(e,t,n,r){var o={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(qi(e))Hi(t,o);else{var a=e.alternate;if(0===e.lanes&&(null===a||0===a.lanes)&&null!==(a=t.lastRenderedReducer))try{var i=t.lastRenderedState,s=a(i,n);if(o.hasEagerState=!0,o.eagerState=s,Qn(s,i))return _r(e,t,o,0),null===rc&&Fr(),!1}catch(l){}if(null!==(n=Pr(e,t,o,r)))return Ic(n,e,r),Ui(n,t,r),!0}return!1}function Mi(e,t,n,r){if(r={lane:2,revertLane:_d(),action:r,hasEagerState:!1,eagerState:null,next:null},qi(e)){if(t)throw Error(i(479))}else null!==(t=Pr(e,n,r,2))&&Ic(t,e,2)}function qi(e){var t=e.alternate;return e===va||null!==t&&t===va}function Hi(e,t){ja=Sa=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ui(e,t,n){if(0!==(4194048&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Ae(e,n)}}var Wi={readContext:Ao,use:qa,useCallback:Pa,useContext:Pa,useEffect:Pa,useImperativeHandle:Pa,useLayoutEffect:Pa,useInsertionEffect:Pa,useMemo:Pa,useReducer:Pa,useRef:Pa,useState:Pa,useDebugValue:Pa,useDeferredValue:Pa,useTransition:Pa,useSyncExternalStore:Pa,useId:Pa,useHostTransitionStatus:Pa,useFormState:Pa,useActionState:Pa,useOptimistic:Pa,useMemoCache:Pa,useCacheRefresh:Pa},Gi={readContext:Ao,use:qa,useCallback:function(e,t){return La().memoizedState=[e,void 0===t?null:t],e},useContext:Ao,useEffect:yi,useImperativeHandle:function(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,gi(4194308,4,ki.bind(null,t,e),n)},useLayoutEffect:function(e,t){return gi(4194308,4,e,t)},useInsertionEffect:function(e,t){gi(4,2,e,t)},useMemo:function(e,t){var n=La();t=void 0===t?null:t;var r=e();if(Ca){pe(!0);try{e()}finally{pe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=La();if(void 0!==n){var o=n(t);if(Ca){pe(!0);try{n(t)}finally{pe(!1)}}}else o=t;return r.memoizedState=r.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},r.queue=e,e=e.dispatch=Di.bind(null,va,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},La().memoizedState=e},useState:function(e){var t=(e=ei(e)).queue,n=Li.bind(null,va,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ji,useDeferredValue:function(e,t){return Ai(La(),e,t)},useTransition:function(){var e=ei(!1);return e=_i.bind(null,va,e.queue,!0,!1),La().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=va,o=La();if(ao){if(void 0===n)throw Error(i(407));n=n()}else{if(n=t(),null===rc)throw Error(i(349));0!==(124&ac)||Qa(r,t,n)}o.memoizedState=n;var a={value:n,getSnapshot:t};return o.queue=a,yi(Ja.bind(null,r,a,e),[e]),r.flags|=2048,hi(9,{destroy:void 0,resource:void 0},Ka.bind(null,r,a,n,t),null),n},useId:function(){var e=La(),t=rc.identifierPrefix;if(ao){var n=Xr;t="\xab"+t+"R"+(n=(Jr&~(1<<32-fe(Jr)-1)).toString(32)+n),0<(n=Ea++)&&(t+="H"+n.toString(32)),t+="\xbb"}else t="\xab"+t+"r"+(n=_a++).toString(32)+"\xbb";return e.memoizedState=t},useHostTransitionStatus:Ti,useFormState:ci,useActionState:ci,useOptimistic:function(e){var t=La();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Mi.bind(null,va,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ha,useCacheRefresh:function(){return La().memoizedState=Ni.bind(null,va)}},Vi={readContext:Ao,use:qa,useCallback:Ci,useContext:Ao,useEffect:bi,useImperativeHandle:Si,useInsertionEffect:vi,useLayoutEffect:wi,useMemo:Ei,useReducer:Wa,useRef:mi,useState:function(){return Wa(Ua)},useDebugValue:ji,useDeferredValue:function(e,t){return Fi($a(),wa.memoizedState,e,t)},useTransition:function(){var e=Wa(Ua)[0],t=$a().memoizedState;return["boolean"===typeof e?e:Ma(e),t]},useSyncExternalStore:Ya,useId:Bi,useHostTransitionStatus:Ti,useFormState:di,useActionState:di,useOptimistic:function(e,t){return ti($a(),0,e,t)},useMemoCache:Ha,useCacheRefresh:Ii},Yi={readContext:Ao,use:qa,useCallback:Ci,useContext:Ao,useEffect:bi,useImperativeHandle:Si,useInsertionEffect:vi,useLayoutEffect:wi,useMemo:Ei,useReducer:Va,useRef:mi,useState:function(){return Va(Ua)},useDebugValue:ji,useDeferredValue:function(e,t){var n=$a();return null===wa?Ai(n,e,t):Fi(n,wa.memoizedState,e,t)},useTransition:function(){var e=Va(Ua)[0],t=$a().memoizedState;return["boolean"===typeof e?e:Ma(e),t]},useSyncExternalStore:Ya,useId:Bi,useHostTransitionStatus:Ti,useFormState:fi,useActionState:fi,useOptimistic:function(e,t){var n=$a();return null!==wa?ti(n,0,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Ha,useCacheRefresh:Ii},Qi=null,Ki=0;function Ji(e){var t=Ki;return Ki+=1,null===Qi&&(Qi=[]),Xo(Qi,e,t)}function Xi(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function Zi(e,t){if(t.$$typeof===f)throw Error(i(525));throw e=Object.prototype.toString.call(t),Error(i(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function es(e){return(0,e._init)(e._payload)}function ts(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function o(e,t){return(e=Dr(e,t)).index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=67108866,n):r:(t.flags|=67108866,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=qr(n,e.mode,r)).return=e,t):((t=o(t,n)).return=e,t)}function c(e,t,n,r){var a=n.type;return a===g?u(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===a||"object"===typeof a&&null!==a&&a.$$typeof===E&&es(a)===t.type)?(Xi(t=o(t,n.props),n),t.return=e,t):(Xi(t=$r(n.type,n.key,n.props,null,e.mode,r),n),t.return=e,t)}function d(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Hr(n,e.mode,r)).return=e,t):((t=o(t,n.children||[])).return=e,t)}function u(e,t,n,r,a){return null===t||7!==t.tag?((t=Mr(n,e.mode,r,a)).return=e,t):((t=o(t,n)).return=e,t)}function p(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=qr(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case h:return Xi(n=$r(t.type,t.key,t.props,null,e.mode,n),t),n.return=e,n;case m:return(t=Hr(t,e.mode,n)).return=e,t;case E:return p(e,t=(0,t._init)(t._payload),n)}if(O(t)||P(t))return(t=Mr(t,e.mode,n,null)).return=e,t;if("function"===typeof t.then)return p(e,Ji(t),n);if(t.$$typeof===w)return p(e,Fo(e,t),n);Zi(e,t)}return null}function f(e,t,n,r){var o=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return null!==o?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case h:return n.key===o?c(e,t,n,r):null;case m:return n.key===o?d(e,t,n,r):null;case E:return f(e,t,n=(o=n._init)(n._payload),r)}if(O(n)||P(n))return null!==o?null:u(e,t,n,r,null);if("function"===typeof n.then)return f(e,t,Ji(n),r);if(n.$$typeof===w)return f(e,t,Fo(e,n),r);Zi(e,n)}return null}function x(e,t,n,r,o){if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return l(t,e=e.get(n)||null,""+r,o);if("object"===typeof r&&null!==r){switch(r.$$typeof){case h:return c(t,e=e.get(null===r.key?n:r.key)||null,r,o);case m:return d(t,e=e.get(null===r.key?n:r.key)||null,r,o);case E:return x(e,t,n,r=(0,r._init)(r._payload),o)}if(O(r)||P(r))return u(t,e=e.get(n)||null,r,o,null);if("function"===typeof r.then)return x(e,t,n,Ji(r),o);if(r.$$typeof===w)return x(e,t,n,Fo(t,r),o);Zi(t,r)}return null}function y(l,c,d,u){if("object"===typeof d&&null!==d&&d.type===g&&null===d.key&&(d=d.props.children),"object"===typeof d&&null!==d){switch(d.$$typeof){case h:e:{for(var b=d.key;null!==c;){if(c.key===b){if((b=d.type)===g){if(7===c.tag){n(l,c.sibling),(u=o(c,d.props.children)).return=l,l=u;break e}}else if(c.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===E&&es(b)===c.type){n(l,c.sibling),Xi(u=o(c,d.props),d),u.return=l,l=u;break e}n(l,c);break}t(l,c),c=c.sibling}d.type===g?((u=Mr(d.props.children,l.mode,u,d.key)).return=l,l=u):(Xi(u=$r(d.type,d.key,d.props,null,l.mode,u),d),u.return=l,l=u)}return s(l);case m:e:{for(b=d.key;null!==c;){if(c.key===b){if(4===c.tag&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){n(l,c.sibling),(u=o(c,d.children||[])).return=l,l=u;break e}n(l,c);break}t(l,c),c=c.sibling}(u=Hr(d,l.mode,u)).return=l,l=u}return s(l);case E:return y(l,c,d=(b=d._init)(d._payload),u)}if(O(d))return function(o,i,s,l){for(var c=null,d=null,u=i,h=i=0,m=null;null!==u&&h<s.length;h++){u.index>h?(m=u,u=null):m=u.sibling;var g=f(o,u,s[h],l);if(null===g){null===u&&(u=m);break}e&&u&&null===g.alternate&&t(o,u),i=a(g,i,h),null===d?c=g:d.sibling=g,d=g,u=m}if(h===s.length)return n(o,u),ao&&Zr(o,h),c;if(null===u){for(;h<s.length;h++)null!==(u=p(o,s[h],l))&&(i=a(u,i,h),null===d?c=u:d.sibling=u,d=u);return ao&&Zr(o,h),c}for(u=r(u);h<s.length;h++)null!==(m=x(u,o,h,s[h],l))&&(e&&null!==m.alternate&&u.delete(null===m.key?h:m.key),i=a(m,i,h),null===d?c=m:d.sibling=m,d=m);return e&&u.forEach(function(e){return t(o,e)}),ao&&Zr(o,h),c}(l,c,d,u);if(P(d)){if("function"!==typeof(b=P(d)))throw Error(i(150));return function(o,s,l,c){if(null==l)throw Error(i(151));for(var d=null,u=null,h=s,m=s=0,g=null,y=l.next();null!==h&&!y.done;m++,y=l.next()){h.index>m?(g=h,h=null):g=h.sibling;var b=f(o,h,y.value,c);if(null===b){null===h&&(h=g);break}e&&h&&null===b.alternate&&t(o,h),s=a(b,s,m),null===u?d=b:u.sibling=b,u=b,h=g}if(y.done)return n(o,h),ao&&Zr(o,m),d;if(null===h){for(;!y.done;m++,y=l.next())null!==(y=p(o,y.value,c))&&(s=a(y,s,m),null===u?d=y:u.sibling=y,u=y);return ao&&Zr(o,m),d}for(h=r(h);!y.done;m++,y=l.next())null!==(y=x(h,o,m,y.value,c))&&(e&&null!==y.alternate&&h.delete(null===y.key?m:y.key),s=a(y,s,m),null===u?d=y:u.sibling=y,u=y);return e&&h.forEach(function(e){return t(o,e)}),ao&&Zr(o,m),d}(l,c,d=b.call(d),u)}if("function"===typeof d.then)return y(l,c,Ji(d),u);if(d.$$typeof===w)return y(l,c,Fo(l,d),u);Zi(l,d)}return"string"===typeof d&&""!==d||"number"===typeof d||"bigint"===typeof d?(d=""+d,null!==c&&6===c.tag?(n(l,c.sibling),(u=o(c,d)).return=l,l=u):(n(l,c),(u=qr(d,l.mode,u)).return=l,l=u),s(l)):n(l,c)}return function(e,t,n,r){try{Ki=0;var o=y(e,t,n,r);return Qi=null,o}catch(i){if(i===Go||i===Yo)throw i;var a=Ir(29,i,null,e.mode);return a.lanes=r,a.return=e,a}}}var ns=ts(!0),rs=ts(!1),os=L(null),as=null;function is(e){var t=e.alternate;M(ds,1&ds.current),M(os,e),null===as&&(null===t||null!==ha.current||null!==t.memoizedState)&&(as=e)}function ss(e){if(22===e.tag){if(M(ds,ds.current),M(os,e),null===as){var t=e.alternate;null!==t&&null!==t.memoizedState&&(as=e)}}else ls()}function ls(){M(ds,ds.current),M(os,os.current)}function cs(e){$(os),as===e&&(as=null),$(ds)}var ds=L(0);function us(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||gu(n)))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(128&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function ps(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:p({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var fs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Tc(),o=aa(r);o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=ia(e,o,r))&&(Ic(t,e,r),sa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Tc(),o=aa(r);o.tag=1,o.payload=t,void 0!==n&&null!==n&&(o.callback=n),null!==(t=ia(e,o,r))&&(Ic(t,e,r),sa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Tc(),r=aa(n);r.tag=2,void 0!==t&&null!==t&&(r.callback=t),null!==(t=ia(e,r,n))&&(Ic(t,e,n),sa(t,e,n))}};function hs(e,t,n,r,o,a,i){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,a,i):!t.prototype||!t.prototype.isPureReactComponent||(!Kn(n,r)||!Kn(o,a))}function ms(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&fs.enqueueReplaceState(t,t.state,null)}function gs(e,t){var n=t;if("ref"in t)for(var r in n={},t)"ref"!==r&&(n[r]=t[r]);if(e=e.defaultProps)for(var o in n===t&&(n=p({},n)),e)void 0===n[o]&&(n[o]=e[o]);return n}var xs="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)};function ys(e){xs(e)}function bs(e){console.error(e)}function vs(e){xs(e)}function ws(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function ks(e,t,n){try{(0,e.onCaughtError)(n.value,{componentStack:n.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Ss(e,t,n){return(n=aa(n)).tag=3,n.payload={element:null},n.callback=function(){ws(e,t)},n}function js(e){return(e=aa(e)).tag=3,e}function Cs(e,t,n,r){var o=n.type.getDerivedStateFromError;if("function"===typeof o){var a=r.value;e.payload=function(){return o(a)},e.callback=function(){ks(t,n,r)}}var i=n.stateNode;null!==i&&"function"===typeof i.componentDidCatch&&(e.callback=function(){ks(t,n,r),"function"!==typeof o&&(null===jc?jc=new Set([this]):jc.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}var Es=Error(i(461)),As=!1;function Fs(e,t,n,r){t.child=null===e?rs(t,null,n,r):ns(t,e.child,n,r)}function _s(e,t,n,r,o){n=n.render;var a=t.ref;if("ref"in r){var i={};for(var s in r)"ref"!==s&&(i[s]=r[s])}else i=r;return Eo(t),r=Ra(e,t,n,i,a,o),s=Ia(),null===e||As?(ao&&s&&to(t),t.flags|=1,Fs(e,t,r,o),t.child):(Na(e,t,o),Qs(e,t,o))}function Ps(e,t,n,r,o){if(null===e){var a=n.type;return"function"!==typeof a||Nr(a)||void 0!==a.defaultProps||null!==n.compare?((e=$r(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=a,zs(e,t,a,r,o))}if(a=e.child,!Ks(e,o)){var i=a.memoizedProps;if((n=null!==(n=n.compare)?n:Kn)(i,r)&&e.ref===t.ref)return Qs(e,t,o)}return t.flags|=1,(e=Dr(a,r)).ref=t.ref,e.return=t,t.child=e}function zs(e,t,n,r,o){if(null!==e){var a=e.memoizedProps;if(Kn(a,r)&&e.ref===t.ref){if(As=!1,t.pendingProps=r=a,!Ks(e,o))return t.lanes=e.lanes,Qs(e,t,o);0!==(131072&e.flags)&&(As=!0)}}return Bs(e,t,n,r,o)}function Rs(e,t,n){var r=t.pendingProps,o=r.children,a=null!==e?e.memoizedState:null;if("hidden"===r.mode){if(0!==(128&t.flags)){if(r=null!==a?a.baseLanes|n:n,null!==e){for(o=t.child=e.child,a=0;null!==o;)a=a|o.lanes|o.childLanes,o=o.sibling;t.childLanes=a&~r}else t.childLanes=0,t.child=null;return Os(e,t,r,n)}if(0===(536870912&n))return t.lanes=t.childLanes=536870912,Os(e,t,null!==a?a.baseLanes|n:n,n);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Uo(0,null!==a?a.cachePool:null),null!==a?ga(t,a):xa(),ss(t)}else null!==a?(Uo(0,a.cachePool),ga(t,a),ls(),t.memoizedState=null):(null!==e&&Uo(0,null),xa(),ls());return Fs(e,t,o,n),t.child}function Os(e,t,n,r){var o=Ho();return o=null===o?null:{parent:Oo._currentValue,pool:o},t.memoizedState={baseLanes:n,cachePool:o},null!==e&&Uo(0,null),xa(),ss(t),null!==e&&jo(e,t,r,!0),null}function Ts(e,t){var n=t.ref;if(null===n)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof n&&"object"!==typeof n)throw Error(i(284));null!==e&&e.ref===n||(t.flags|=4194816)}}function Bs(e,t,n,r,o){return Eo(t),n=Ra(e,t,n,r,void 0,o),r=Ia(),null===e||As?(ao&&r&&to(t),t.flags|=1,Fs(e,t,n,o),t.child):(Na(e,t,o),Qs(e,t,o))}function Is(e,t,n,r,o,a){return Eo(t),t.updateQueue=null,n=Ta(t,r,n,o),Oa(e),r=Ia(),null===e||As?(ao&&r&&to(t),t.flags|=1,Fs(e,t,n,a),t.child):(Na(e,t,a),Qs(e,t,a))}function Ns(e,t,n,r,o){if(Eo(t),null===t.stateNode){var a=Tr,i=n.contextType;"object"===typeof i&&null!==i&&(a=Ao(i)),a=new n(r,a),t.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,a.updater=fs,t.stateNode=a,a._reactInternals=t,(a=t.stateNode).props=r,a.state=t.memoizedState,a.refs={},ra(t),i=n.contextType,a.context="object"===typeof i&&null!==i?Ao(i):Tr,a.state=t.memoizedState,"function"===typeof(i=n.getDerivedStateFromProps)&&(ps(t,n,i,r),a.state=t.memoizedState),"function"===typeof n.getDerivedStateFromProps||"function"===typeof a.getSnapshotBeforeUpdate||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||(i=a.state,"function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),i!==a.state&&fs.enqueueReplaceState(a,a.state,null),ua(t,r,a,o),da(),a.state=t.memoizedState),"function"===typeof a.componentDidMount&&(t.flags|=4194308),r=!0}else if(null===e){a=t.stateNode;var s=t.memoizedProps,l=gs(n,s);a.props=l;var c=a.context,d=n.contextType;i=Tr,"object"===typeof d&&null!==d&&(i=Ao(d));var u=n.getDerivedStateFromProps;d="function"===typeof u||"function"===typeof a.getSnapshotBeforeUpdate,s=t.pendingProps!==s,d||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s||c!==i)&&ms(t,a,r,i),na=!1;var p=t.memoizedState;a.state=p,ua(t,r,a,o),da(),c=t.memoizedState,s||p!==c||na?("function"===typeof u&&(ps(t,n,u,r),c=t.memoizedState),(l=na||hs(t,n,l,r,p,c,i))?(d||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||("function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"===typeof a.componentDidMount&&(t.flags|=4194308)):("function"===typeof a.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),a.props=r,a.state=c,a.context=i,r=l):("function"===typeof a.componentDidMount&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,oa(e,t),d=gs(n,i=t.memoizedProps),a.props=d,u=t.pendingProps,p=a.context,c=n.contextType,l=Tr,"object"===typeof c&&null!==c&&(l=Ao(c)),(c="function"===typeof(s=n.getDerivedStateFromProps)||"function"===typeof a.getSnapshotBeforeUpdate)||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(i!==u||p!==l)&&ms(t,a,r,l),na=!1,p=t.memoizedState,a.state=p,ua(t,r,a,o),da();var f=t.memoizedState;i!==u||p!==f||na||null!==e&&null!==e.dependencies&&Co(e.dependencies)?("function"===typeof s&&(ps(t,n,s,r),f=t.memoizedState),(d=na||hs(t,n,d,r,p,f,l)||null!==e&&null!==e.dependencies&&Co(e.dependencies))?(c||"function"!==typeof a.UNSAFE_componentWillUpdate&&"function"!==typeof a.componentWillUpdate||("function"===typeof a.componentWillUpdate&&a.componentWillUpdate(r,f,l),"function"===typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(r,f,l)),"function"===typeof a.componentDidUpdate&&(t.flags|=4),"function"===typeof a.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof a.componentDidUpdate||i===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||i===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=f),a.props=r,a.state=f,a.context=l,r=d):("function"!==typeof a.componentDidUpdate||i===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||i===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Ts(e,t),r=0!==(128&t.flags),a||r?(a=t.stateNode,n=r&&"function"!==typeof n.getDerivedStateFromError?null:a.render(),t.flags|=1,null!==e&&r?(t.child=ns(t,e.child,null,o),t.child=ns(t,null,n,o)):Fs(e,t,n,o),t.memoizedState=a.state,e=t.child):e=Qs(e,t,o),e}function Ds(e,t,n,r){return ho(),t.flags|=256,Fs(e,t,n,r),t.child}var Ls={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $s(e){return{baseLanes:e,cachePool:Wo()}}function Ms(e,t,n){return e=null!==e?e.childLanes&~n:0,t&&(e|=gc),e}function qs(e,t,n){var r,o=t.pendingProps,a=!1,s=0!==(128&t.flags);if((r=s)||(r=(null===e||null!==e.memoizedState)&&0!==(2&ds.current)),r&&(a=!0,t.flags&=-129),r=0!==(32&t.flags),t.flags&=-33,null===e){if(ao){if(a?is(t):ls(),ao){var l,c=oo;if(l=c){e:{for(l=c,c=so;8!==l.nodeType;){if(!c){c=null;break e}if(null===(l=xu(l.nextSibling))){c=null;break e}}c=l}null!==c?(t.memoizedState={dehydrated:c,treeContext:null!==Kr?{id:Jr,overflow:Xr}:null,retryLane:536870912,hydrationErrors:null},(l=Ir(18,null,null,0)).stateNode=c,l.return=t,t.child=l,ro=t,oo=null,l=!0):l=!1}l||co(t)}if(null!==(c=t.memoizedState)&&null!==(c=c.dehydrated))return gu(c)?t.lanes=32:t.lanes=536870912,null;cs(t)}return c=o.children,o=o.fallback,a?(ls(),c=Us({mode:"hidden",children:c},a=t.mode),o=Mr(o,a,n,null),c.return=t,o.return=t,c.sibling=o,t.child=c,(a=t.child).memoizedState=$s(n),a.childLanes=Ms(e,r,n),t.memoizedState=Ls,o):(is(t),Hs(t,c))}if(null!==(l=e.memoizedState)&&null!==(c=l.dehydrated)){if(s)256&t.flags?(is(t),t.flags&=-257,t=Ws(e,t,n)):null!==t.memoizedState?(ls(),t.child=e.child,t.flags|=128,t=null):(ls(),a=o.fallback,c=t.mode,o=Us({mode:"visible",children:o.children},c),(a=Mr(a,c,n,null)).flags|=2,o.return=t,a.return=t,o.sibling=a,t.child=o,ns(t,e.child,null,n),(o=t.child).memoizedState=$s(n),o.childLanes=Ms(e,r,n),t.memoizedState=Ls,t=a);else if(is(t),gu(c)){if(r=c.nextSibling&&c.nextSibling.dataset)var d=r.dgst;r=d,(o=Error(i(419))).stack="",o.digest=r,go({value:o,source:null,stack:null}),t=Ws(e,t,n)}else if(As||jo(e,t,n,!1),r=0!==(n&e.childLanes),As||r){if(null!==(r=rc)&&(0!==(o=0!==((o=0!==(42&(o=n&-n))?1:Fe(o))&(r.suspendedLanes|n))?0:o)&&o!==l.retryLane))throw l.retryLane=o,zr(e,o),Ic(r,e,o),Es;"$?"===c.data||Vc(),t=Ws(e,t,n)}else"$?"===c.data?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,oo=xu(c.nextSibling),ro=t,ao=!0,io=null,so=!1,null!==e&&(Yr[Qr++]=Jr,Yr[Qr++]=Xr,Yr[Qr++]=Kr,Jr=e.id,Xr=e.overflow,Kr=t),(t=Hs(t,o.children)).flags|=4096);return t}return a?(ls(),a=o.fallback,c=t.mode,d=(l=e.child).sibling,(o=Dr(l,{mode:"hidden",children:o.children})).subtreeFlags=65011712&l.subtreeFlags,null!==d?a=Dr(d,a):(a=Mr(a,c,n,null)).flags|=2,a.return=t,o.return=t,o.sibling=a,t.child=o,o=a,a=t.child,null===(c=e.child.memoizedState)?c=$s(n):(null!==(l=c.cachePool)?(d=Oo._currentValue,l=l.parent!==d?{parent:d,pool:d}:l):l=Wo(),c={baseLanes:c.baseLanes|n,cachePool:l}),a.memoizedState=c,a.childLanes=Ms(e,r,n),t.memoizedState=Ls,o):(is(t),e=(n=e.child).sibling,(n=Dr(n,{mode:"visible",children:o.children})).return=t,n.sibling=null,null!==e&&(null===(r=t.deletions)?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Hs(e,t){return(t=Us({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Us(e,t){return(e=Ir(22,e,null,t)).lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Ws(e,t,n){return ns(t,e.child,null,n),(e=Hs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Gs(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),ko(e.return,t,n)}function Vs(e,t,n,r,o){var a=e.memoizedState;null===a?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=o)}function Ys(e,t,n){var r=t.pendingProps,o=r.revealOrder,a=r.tail;if(Fs(e,t,r.children,n),0!==(2&(r=ds.current)))r=1&r|2,t.flags|=128;else{if(null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Gs(e,n,t);else if(19===e.tag)Gs(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(M(ds,r),o){case"forwards":for(n=t.child,o=null;null!==n;)null!==(e=n.alternate)&&null===us(e)&&(o=n),n=n.sibling;null===(n=o)?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Vs(t,!1,o,n,a);break;case"backwards":for(n=null,o=t.child,t.child=null;null!==o;){if(null!==(e=o.alternate)&&null===us(e)){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Vs(t,!0,n,null,a);break;case"together":Vs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Qs(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),fc|=t.lanes,0===(n&t.childLanes)){if(null===e)return null;if(jo(e,t,n,!1),0===(n&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(i(153));if(null!==t.child){for(n=Dr(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Dr(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Ks(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Co(e))}function Js(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps)As=!0;else{if(!Ks(e,n)&&0===(128&t.flags))return As=!1,function(e,t,n){switch(t.tag){case 3:G(t,t.stateNode.containerInfo),vo(0,Oo,e.memoizedState.cache),ho();break;case 27:case 5:Y(t);break;case 4:G(t,t.stateNode.containerInfo);break;case 10:vo(0,t.type,t.memoizedProps.value);break;case 13:var r=t.memoizedState;if(null!==r)return null!==r.dehydrated?(is(t),t.flags|=128,null):0!==(n&t.child.childLanes)?qs(e,t,n):(is(t),null!==(e=Qs(e,t,n))?e.sibling:null);is(t);break;case 19:var o=0!==(128&e.flags);if((r=0!==(n&t.childLanes))||(jo(e,t,n,!1),r=0!==(n&t.childLanes)),o){if(r)return Ys(e,t,n);t.flags|=128}if(null!==(o=t.memoizedState)&&(o.rendering=null,o.tail=null,o.lastEffect=null),M(ds,ds.current),r)break;return null;case 22:case 23:return t.lanes=0,Rs(e,t,n);case 24:vo(0,Oo,e.memoizedState.cache)}return Qs(e,t,n)}(e,t,n);As=0!==(131072&e.flags)}else As=!1,ao&&0!==(1048576&t.flags)&&eo(t,Vr,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var r=t.elementType,o=r._init;if(r=o(r._payload),t.type=r,"function"!==typeof r){if(void 0!==r&&null!==r){if((o=r.$$typeof)===k){t.tag=11,t=_s(null,t,r,e,n);break e}if(o===C){t.tag=14,t=Ps(null,t,r,e,n);break e}}throw t=R(r)||r,Error(i(306,t,""))}Nr(r)?(e=gs(r,e),t.tag=1,t=Ns(null,t,r,e,n)):(t.tag=0,t=Bs(null,t,r,e,n))}return t;case 0:return Bs(e,t,t.type,t.pendingProps,n);case 1:return Ns(e,t,r=t.type,o=gs(r,t.pendingProps),n);case 3:e:{if(G(t,t.stateNode.containerInfo),null===e)throw Error(i(387));r=t.pendingProps;var a=t.memoizedState;o=a.element,oa(e,t),ua(t,r,null,n);var s=t.memoizedState;if(r=s.cache,vo(0,Oo,r),r!==a.cache&&So(t,[Oo],n,!0),da(),r=s.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=a,t.memoizedState=a,256&t.flags){t=Ds(e,t,r,n);break e}if(r!==o){go(o=jr(Error(i(424)),t)),t=Ds(e,t,r,n);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(oo=xu(e.firstChild),ro=t,ao=!0,io=null,so=!0,n=rs(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(ho(),r===o){t=Qs(e,t,n);break e}Fs(e,t,r,n)}t=t.child}return t;case 26:return Ts(e,t),null===e?(n=Fu(t.type,null,t.pendingProps,null))?t.memoizedState=n:ao||(n=t.type,e=t.pendingProps,(r=ru(U.current).createElement(n))[Re]=t,r[Oe]=e,eu(r,n,e),We(r),t.stateNode=r):t.memoizedState=Fu(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Y(t),null===e&&ao&&(r=t.stateNode=vu(t.type,t.pendingProps,U.current),ro=t,so=!0,o=oo,fu(t.type)?(yu=o,oo=xu(r.firstChild)):oo=o),Fs(e,t,t.pendingProps.children,n),Ts(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ao&&((o=r=oo)&&(null!==(r=function(e,t,n,r){for(;1===e.nodeType;){var o=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[Le])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(a=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(a!==o.rel||e.getAttribute("href")!==(null==o.href||""===o.href?null:o.href)||e.getAttribute("crossorigin")!==(null==o.crossOrigin?null:o.crossOrigin)||e.getAttribute("title")!==(null==o.title?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((a=e.getAttribute("src"))!==(null==o.src?null:o.src)||e.getAttribute("type")!==(null==o.type?null:o.type)||e.getAttribute("crossorigin")!==(null==o.crossOrigin?null:o.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var a=null==o.name?null:""+o.name;if("hidden"===o.type&&e.getAttribute("name")===a)return e}if(null===(e=xu(e.nextSibling)))break}return null}(r,t.type,t.pendingProps,so))?(t.stateNode=r,ro=t,oo=xu(r.firstChild),so=!1,o=!0):o=!1),o||co(t)),Y(t),o=t.type,a=t.pendingProps,s=null!==e?e.memoizedProps:null,r=a.children,iu(o,a)?r=null:null!==s&&iu(o,s)&&(t.flags|=32),null!==t.memoizedState&&(o=Ra(e,t,Ba,null,null,n),Yu._currentValue=o),Ts(e,t),Fs(e,t,r,n),t.child;case 6:return null===e&&ao&&((e=n=oo)&&(null!==(n=function(e,t,n){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!n)return null;if(null===(e=xu(e.nextSibling)))return null}return e}(n,t.pendingProps,so))?(t.stateNode=n,ro=t,oo=null,e=!0):e=!1),e||co(t)),null;case 13:return qs(e,t,n);case 4:return G(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=ns(t,null,r,n):Fs(e,t,r,n),t.child;case 11:return _s(e,t,t.type,t.pendingProps,n);case 7:return Fs(e,t,t.pendingProps,n),t.child;case 8:case 12:return Fs(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,vo(0,t.type,r.value),Fs(e,t,r.children,n),t.child;case 9:return o=t.type._context,r=t.pendingProps.children,Eo(t),r=r(o=Ao(o)),t.flags|=1,Fs(e,t,r,n),t.child;case 14:return Ps(e,t,t.type,t.pendingProps,n);case 15:return zs(e,t,t.type,t.pendingProps,n);case 19:return Ys(e,t,n);case 31:return r=t.pendingProps,n=t.mode,r={mode:r.mode,children:r.children},null===e?((n=Us(r,n)).ref=t.ref,t.child=n,n.return=t,t=n):((n=Dr(e.child,r)).ref=t.ref,t.child=n,n.return=t,t=n),t;case 22:return Rs(e,t,n);case 24:return Eo(t),r=Ao(Oo),null===e?(null===(o=Ho())&&(o=rc,a=To(),o.pooledCache=a,a.refCount++,null!==a&&(o.pooledCacheLanes|=n),o=a),t.memoizedState={parent:r,cache:o},ra(t),vo(0,Oo,o)):(0!==(e.lanes&n)&&(oa(e,t),ua(t,null,null,n),da()),o=e.memoizedState,a=t.memoizedState,o.parent!==r?(o={parent:r,cache:r},t.memoizedState=o,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=o),vo(0,Oo,r)):(r=a.cache,vo(0,Oo,r),r!==o.cache&&So(t,[Oo],n,!0))),Fs(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Xs(e){e.flags|=4}function Zs(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!Mu(t)){if(null!==(t=os.current)&&((4194048&ac)===ac?null!==as:(62914560&ac)!==ac&&0===(536870912&ac)||t!==as))throw Zo=Qo,Vo;e.flags|=8192}}function el(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Se():536870912,e.lanes|=t,xc|=t)}function tl(e,t){if(!ao)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function nl(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=65011712&o.subtreeFlags,r|=65011712&o.flags,o.return=e,o=o.sibling;else for(o=e.child;null!==o;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function rl(e,t,n){var r=t.pendingProps;switch(no(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return nl(t),null;case 3:return n=t.stateNode,r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),wo(Oo),V(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(fo(t)?Xs(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,mo())),nl(t),null;case 26:return n=t.memoizedState,null===e?(Xs(t),null!==n?(nl(t),Zs(t,n)):(nl(t),t.flags&=-16777217)):n?n!==e.memoizedState?(Xs(t),nl(t),Zs(t,n)):(nl(t),t.flags&=-16777217):(e.memoizedProps!==r&&Xs(t),nl(t),t.flags&=-16777217),null;case 27:Q(t),n=U.current;var o=t.type;if(null!==e&&null!=t.stateNode)e.memoizedProps!==r&&Xs(t);else{if(!r){if(null===t.stateNode)throw Error(i(166));return nl(t),null}e=q.current,fo(t)?uo(t):(e=vu(o,r,n),t.stateNode=e,Xs(t))}return nl(t),null;case 5:if(Q(t),n=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&Xs(t);else{if(!r){if(null===t.stateNode)throw Error(i(166));return nl(t),null}if(e=q.current,fo(t))uo(t);else{switch(o=ru(U.current),e){case 1:e=o.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:e=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":e=o.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":e=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":(e=o.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e="string"===typeof r.is?o.createElement("select",{is:r.is}):o.createElement("select"),r.multiple?e.multiple=!0:r.size&&(e.size=r.size);break;default:e="string"===typeof r.is?o.createElement(n,{is:r.is}):o.createElement(n)}}e[Re]=t,e[Oe]=r;e:for(o=t.child;null!==o;){if(5===o.tag||6===o.tag)e.appendChild(o.stateNode);else if(4!==o.tag&&27!==o.tag&&null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;null===o.sibling;){if(null===o.return||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=e;e:switch(eu(e,n,r),n){case"button":case"input":case"select":case"textarea":e=!!r.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&Xs(t)}}return nl(t),t.flags&=-16777217,null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==r&&Xs(t);else{if("string"!==typeof r&&null===t.stateNode)throw Error(i(166));if(e=U.current,fo(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,null!==(o=ro))switch(o.tag){case 27:case 5:r=o.memoizedProps}e[Re]=t,(e=!!(e.nodeValue===n||null!==r&&!0===r.suppressHydrationWarning||Kd(e.nodeValue,n)))||co(t)}else(e=ru(e).createTextNode(r))[Re]=t,t.stateNode=e}return nl(t),null;case 13:if(r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(o=fo(t),null!==r&&null!==r.dehydrated){if(null===e){if(!o)throw Error(i(318));if(!(o=null!==(o=t.memoizedState)?o.dehydrated:null))throw Error(i(317));o[Re]=t}else ho(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;nl(t),o=!1}else o=mo(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return 256&t.flags?(cs(t),t):(cs(t),null)}if(cs(t),0!==(128&t.flags))return t.lanes=n,t;if(n=null!==r,e=null!==e&&null!==e.memoizedState,n){o=null,null!==(r=t.child).alternate&&null!==r.alternate.memoizedState&&null!==r.alternate.memoizedState.cachePool&&(o=r.alternate.memoizedState.cachePool.pool);var a=null;null!==r.memoizedState&&null!==r.memoizedState.cachePool&&(a=r.memoizedState.cachePool.pool),a!==o&&(r.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),el(t,t.updateQueue),nl(t),null;case 4:return V(),null===e&&$d(t.stateNode.containerInfo),nl(t),null;case 10:return wo(t.type),nl(t),null;case 19:if($(ds),null===(o=t.memoizedState))return nl(t),null;if(r=0!==(128&t.flags),null===(a=o.rendering))if(r)tl(o,!1);else{if(0!==pc||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(a=us(e))){for(t.flags|=128,tl(o,!1),e=a.updateQueue,t.updateQueue=e,el(t,e),t.subtreeFlags=0,e=n,n=t.child;null!==n;)Lr(n,e),n=n.sibling;return M(ds,1&ds.current|2),t.child}e=e.sibling}null!==o.tail&&te()>kc&&(t.flags|=128,r=!0,tl(o,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=us(a))){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,el(t,e),tl(o,!0),null===o.tail&&"hidden"===o.tailMode&&!a.alternate&&!ao)return nl(t),null}else 2*te()-o.renderingStartTime>kc&&536870912!==n&&(t.flags|=128,r=!0,tl(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(null!==(e=o.last)?e.sibling=a:t.child=a,o.last=a)}return null!==o.tail?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=te(),t.sibling=null,e=ds.current,M(ds,r?1&e|2:1&e),t):(nl(t),null);case 22:case 23:return cs(t),ya(),r=null!==t.memoizedState,null!==e?null!==e.memoizedState!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?0!==(536870912&n)&&0===(128&t.flags)&&(nl(t),6&t.subtreeFlags&&(t.flags|=8192)):nl(t),null!==(n=t.updateQueue)&&el(t,n.retryQueue),n=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),r=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),null!==e&&$(qo),null;case 24:return n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),wo(Oo),nl(t),null;case 25:case 30:return null}throw Error(i(156,t.tag))}function ol(e,t){switch(no(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return wo(Oo),V(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return Q(t),null;case 13:if(cs(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(i(340));ho()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return $(ds),null;case 4:return V(),null;case 10:return wo(t.type),null;case 22:case 23:return cs(t),ya(),null!==e&&$(qo),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return wo(Oo),null;default:return null}}function al(e,t){switch(no(t),t.tag){case 3:wo(Oo),V();break;case 26:case 27:case 5:Q(t);break;case 4:V();break;case 13:cs(t);break;case 19:$(ds);break;case 10:wo(t.type);break;case 22:case 23:cs(t),ya(),null!==e&&$(qo);break;case 24:wo(Oo)}}function il(e,t){try{var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var o=r.next;n=o;do{if((n.tag&e)===e){r=void 0;var a=n.create,i=n.inst;r=a(),i.destroy=r}n=n.next}while(n!==o)}}catch(s){dd(t,t.return,s)}}function sl(e,t,n){try{var r=t.updateQueue,o=null!==r?r.lastEffect:null;if(null!==o){var a=o.next;r=a;do{if((r.tag&e)===e){var i=r.inst,s=i.destroy;if(void 0!==s){i.destroy=void 0,o=t;var l=n,c=s;try{c()}catch(d){dd(o,l,d)}}}r=r.next}while(r!==a)}}catch(d){dd(t,t.return,d)}}function ll(e){var t=e.updateQueue;if(null!==t){var n=e.stateNode;try{fa(t,n)}catch(r){dd(e,e.return,r)}}}function cl(e,t,n){n.props=gs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(r){dd(e,t,r)}}function dl(e,t){try{var n=e.ref;if(null!==n){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;default:r=e.stateNode}"function"===typeof n?e.refCleanup=n(r):n.current=r}}catch(o){dd(e,t,o)}}function ul(e,t){var n=e.ref,r=e.refCleanup;if(null!==n)if("function"===typeof r)try{r()}catch(o){dd(e,t,o)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof n)try{n(null)}catch(a){dd(e,t,a)}else n.current=null}function pl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(o){dd(e,e.return,o)}}function fl(e,t,n){try{var r=e.stateNode;!function(e,t,n,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,a=null,s=null,l=null,c=null,d=null,u=null;for(h in n){var p=n[h];if(n.hasOwnProperty(h)&&null!=p)switch(h){case"checked":case"value":break;case"defaultValue":c=p;default:r.hasOwnProperty(h)||Xd(e,t,h,null,r,p)}}for(var f in r){var h=r[f];if(p=n[f],r.hasOwnProperty(f)&&(null!=h||null!=p))switch(f){case"type":a=h;break;case"name":o=h;break;case"checked":d=h;break;case"defaultChecked":u=h;break;case"value":s=h;break;case"defaultValue":l=h;break;case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(i(137,t));break;default:h!==p&&Xd(e,t,f,h,r,p)}}return void gt(e,s,l,c,d,u,a,o);case"select":for(a in h=s=l=f=null,n)if(c=n[a],n.hasOwnProperty(a)&&null!=c)switch(a){case"value":break;case"multiple":h=c;default:r.hasOwnProperty(a)||Xd(e,t,a,null,r,c)}for(o in r)if(a=r[o],c=n[o],r.hasOwnProperty(o)&&(null!=a||null!=c))switch(o){case"value":f=a;break;case"defaultValue":l=a;break;case"multiple":s=a;default:a!==c&&Xd(e,t,o,a,r,c)}return t=l,n=s,r=h,void(null!=f?bt(e,!!n,f,!1):!!r!==!!n&&(null!=t?bt(e,!!n,t,!0):bt(e,!!n,n?[]:"",!1)));case"textarea":for(l in h=f=null,n)if(o=n[l],n.hasOwnProperty(l)&&null!=o&&!r.hasOwnProperty(l))switch(l){case"value":case"children":break;default:Xd(e,t,l,null,r,o)}for(s in r)if(o=r[s],a=n[s],r.hasOwnProperty(s)&&(null!=o||null!=a))switch(s){case"value":f=o;break;case"defaultValue":h=o;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=o)throw Error(i(91));break;default:o!==a&&Xd(e,t,s,o,r,a)}return void vt(e,f,h);case"option":for(var m in n)if(f=n[m],n.hasOwnProperty(m)&&null!=f&&!r.hasOwnProperty(m))if("selected"===m)e.selected=!1;else Xd(e,t,m,null,r,f);for(c in r)if(f=r[c],h=n[c],r.hasOwnProperty(c)&&f!==h&&(null!=f||null!=h))if("selected"===c)e.selected=f&&"function"!==typeof f&&"symbol"!==typeof f;else Xd(e,t,c,f,r,h);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in n)f=n[g],n.hasOwnProperty(g)&&null!=f&&!r.hasOwnProperty(g)&&Xd(e,t,g,null,r,f);for(d in r)if(f=r[d],h=n[d],r.hasOwnProperty(d)&&f!==h&&(null!=f||null!=h))switch(d){case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(i(137,t));break;default:Xd(e,t,d,f,r,h)}return;default:if(Et(t)){for(var x in n)f=n[x],n.hasOwnProperty(x)&&void 0!==f&&!r.hasOwnProperty(x)&&Zd(e,t,x,void 0,r,f);for(u in r)f=r[u],h=n[u],!r.hasOwnProperty(u)||f===h||void 0===f&&void 0===h||Zd(e,t,u,f,r,h);return}}for(var y in n)f=n[y],n.hasOwnProperty(y)&&null!=f&&!r.hasOwnProperty(y)&&Xd(e,t,y,null,r,f);for(p in r)f=r[p],h=n[p],!r.hasOwnProperty(p)||f===h||null==f&&null==h||Xd(e,t,p,f,r,h)}(r,e.type,n,t),r[Oe]=t}catch(o){dd(e,e.return,o)}}function hl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&fu(e.type)||4===e.tag}function ml(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||hl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&fu(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function gl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?(9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).insertBefore(e,t):((t=9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Jd));else if(4!==r&&(27===r&&fu(e.type)&&(n=e.stateNode,t=null),null!==(e=e.child)))for(gl(e,t,n),e=e.sibling;null!==e;)gl(e,t,n),e=e.sibling}function xl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&(27===r&&fu(e.type)&&(n=e.stateNode),null!==(e=e.child)))for(xl(e,t,n),e=e.sibling;null!==e;)xl(e,t,n),e=e.sibling}function yl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,o=t.attributes;o.length;)t.removeAttributeNode(o[0]);eu(t,r,n),t[Re]=e,t[Oe]=n}catch(a){dd(e,e.return,a)}}var bl=!1,vl=!1,wl=!1,kl="function"===typeof WeakSet?WeakSet:Set,Sl=null;function jl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Nl(e,n),4&r&&il(5,n);break;case 1:if(Nl(e,n),4&r)if(e=n.stateNode,null===t)try{e.componentDidMount()}catch(i){dd(n,n.return,i)}else{var o=gs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(o,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){dd(n,n.return,s)}}64&r&&ll(n),512&r&&dl(n,n.return);break;case 3:if(Nl(e,n),64&r&&null!==(e=n.updateQueue)){if(t=null,null!==n.child)switch(n.child.tag){case 27:case 5:case 1:t=n.child.stateNode}try{fa(e,t)}catch(i){dd(n,n.return,i)}}break;case 27:null===t&&4&r&&yl(n);case 26:case 5:Nl(e,n),null===t&&4&r&&pl(n),512&r&&dl(n,n.return);break;case 12:Nl(e,n);break;case 13:Nl(e,n),4&r&&Pl(e,n),64&r&&(null!==(e=n.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var n=e.ownerDocument;if("$?"!==e.data||"complete"===n.readyState)t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}(e,n=hd.bind(null,n))));break;case 22:if(!(r=null!==n.memoizedState||bl)){t=null!==t&&null!==t.memoizedState||vl,o=bl;var a=vl;bl=r,(vl=t)&&!a?Ll(e,n,0!==(8772&n.subtreeFlags)):Nl(e,n),bl=o,vl=a}break;case 30:break;default:Nl(e,n)}}function Cl(e){var t=e.alternate;null!==t&&(e.alternate=null,Cl(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&$e(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var El=null,Al=!1;function Fl(e,t,n){for(n=n.child;null!==n;)_l(e,t,n),n=n.sibling}function _l(e,t,n){if(ue&&"function"===typeof ue.onCommitFiberUnmount)try{ue.onCommitFiberUnmount(de,n)}catch(a){}switch(n.tag){case 26:vl||ul(n,t),Fl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode).parentNode.removeChild(n);break;case 27:vl||ul(n,t);var r=El,o=Al;fu(n.type)&&(El=n.stateNode,Al=!1),Fl(e,t,n),wu(n.stateNode),El=r,Al=o;break;case 5:vl||ul(n,t);case 6:if(r=El,o=Al,El=null,Fl(e,t,n),Al=o,null!==(El=r))if(Al)try{(9===El.nodeType?El.body:"HTML"===El.nodeName?El.ownerDocument.body:El).removeChild(n.stateNode)}catch(i){dd(n,t,i)}else try{El.removeChild(n.stateNode)}catch(i){dd(n,t,i)}break;case 18:null!==El&&(Al?(hu(9===(e=El).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,n.stateNode),Ap(e)):hu(El,n.stateNode));break;case 4:r=El,o=Al,El=n.stateNode.containerInfo,Al=!0,Fl(e,t,n),El=r,Al=o;break;case 0:case 11:case 14:case 15:vl||sl(2,n,t),vl||sl(4,n,t),Fl(e,t,n);break;case 1:vl||(ul(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount&&cl(n,t,r)),Fl(e,t,n);break;case 21:Fl(e,t,n);break;case 22:vl=(r=vl)||null!==n.memoizedState,Fl(e,t,n),vl=r;break;default:Fl(e,t,n)}}function Pl(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Ap(e)}catch(n){dd(t,t.return,n)}}function zl(e,t){var n=function(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new kl),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new kl),t;default:throw Error(i(435,e.tag))}}(e);t.forEach(function(t){var r=md.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}function Rl(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var o=n[r],a=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 27:if(fu(l.type)){El=l.stateNode,Al=!1;break e}break;case 5:El=l.stateNode,Al=!1;break e;case 3:case 4:El=l.stateNode.containerInfo,Al=!0;break e}l=l.return}if(null===El)throw Error(i(160));_l(a,s,o),El=null,Al=!1,null!==(a=o.alternate)&&(a.return=null),o.return=null}if(13878&t.subtreeFlags)for(t=t.child;null!==t;)Tl(t,e),t=t.sibling}var Ol=null;function Tl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Rl(t,e),Bl(e),4&r&&(sl(3,e,e.return),il(3,e),sl(5,e,e.return));break;case 1:Rl(t,e),Bl(e),512&r&&(vl||null===n||ul(n,n.return)),64&r&&bl&&(null!==(e=e.updateQueue)&&(null!==(r=e.callbacks)&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===n?r:n.concat(r))));break;case 26:var o=Ol;if(Rl(t,e),Bl(e),512&r&&(vl||null===n||ul(n,n.return)),4&r){var a=null!==n?n.memoizedState:null;if(r=e.memoizedState,null===n)if(null===r)if(null===e.stateNode){e:{r=e.type,n=e.memoizedProps,o=o.ownerDocument||o;t:switch(r){case"title":(!(a=o.getElementsByTagName("title")[0])||a[Le]||a[Re]||"http://www.w3.org/2000/svg"===a.namespaceURI||a.hasAttribute("itemprop"))&&(a=o.createElement(r),o.head.insertBefore(a,o.querySelector("head > title"))),eu(a,r,n),a[Re]=e,We(a),r=a;break e;case"link":var s=Lu("link","href",o).get(r+(n.href||""));if(s)for(var l=0;l<s.length;l++)if((a=s[l]).getAttribute("href")===(null==n.href||""===n.href?null:n.href)&&a.getAttribute("rel")===(null==n.rel?null:n.rel)&&a.getAttribute("title")===(null==n.title?null:n.title)&&a.getAttribute("crossorigin")===(null==n.crossOrigin?null:n.crossOrigin)){s.splice(l,1);break t}eu(a=o.createElement(r),r,n),o.head.appendChild(a);break;case"meta":if(s=Lu("meta","content",o).get(r+(n.content||"")))for(l=0;l<s.length;l++)if((a=s[l]).getAttribute("content")===(null==n.content?null:""+n.content)&&a.getAttribute("name")===(null==n.name?null:n.name)&&a.getAttribute("property")===(null==n.property?null:n.property)&&a.getAttribute("http-equiv")===(null==n.httpEquiv?null:n.httpEquiv)&&a.getAttribute("charset")===(null==n.charSet?null:n.charSet)){s.splice(l,1);break t}eu(a=o.createElement(r),r,n),o.head.appendChild(a);break;default:throw Error(i(468,r))}a[Re]=e,We(a),r=a}e.stateNode=r}else $u(o,e.type,e.stateNode);else e.stateNode=Tu(o,r,e.memoizedProps);else a!==r?(null===a?null!==n.stateNode&&(n=n.stateNode).parentNode.removeChild(n):a.count--,null===r?$u(o,e.type,e.stateNode):Tu(o,r,e.memoizedProps)):null===r&&null!==e.stateNode&&fl(e,e.memoizedProps,n.memoizedProps)}break;case 27:Rl(t,e),Bl(e),512&r&&(vl||null===n||ul(n,n.return)),null!==n&&4&r&&fl(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Rl(t,e),Bl(e),512&r&&(vl||null===n||ul(n,n.return)),32&e.flags){o=e.stateNode;try{kt(o,"")}catch(h){dd(e,e.return,h)}}4&r&&null!=e.stateNode&&fl(e,o=e.memoizedProps,null!==n?n.memoizedProps:o),1024&r&&(wl=!0);break;case 6:if(Rl(t,e),Bl(e),4&r){if(null===e.stateNode)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(h){dd(e,e.return,h)}}break;case 3:if(Du=null,o=Ol,Ol=ju(t.containerInfo),Rl(t,e),Ol=o,Bl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Ap(t.containerInfo)}catch(h){dd(e,e.return,h)}wl&&(wl=!1,Il(e));break;case 4:r=Ol,Ol=ju(e.stateNode.containerInfo),Rl(t,e),Bl(e),Ol=r;break;case 12:default:Rl(t,e),Bl(e);break;case 13:Rl(t,e),Bl(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==n&&null!==n.memoizedState)&&(wc=te()),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,zl(e,r)));break;case 22:o=null!==e.memoizedState;var c=null!==n&&null!==n.memoizedState,d=bl,u=vl;if(bl=d||o,vl=u||c,Rl(t,e),vl=u,bl=d,Bl(e),8192&r)e:for(t=e.stateNode,t._visibility=o?-2&t._visibility:1|t._visibility,o&&(null===n||c||bl||vl||Dl(e)),n=null,t=e;;){if(5===t.tag||26===t.tag){if(null===n){c=n=t;try{if(a=c.stateNode,o)"function"===typeof(s=a.style).setProperty?s.setProperty("display","none","important"):s.display="none";else{l=c.stateNode;var p=c.memoizedProps.style,f=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;l.style.display=null==f||"boolean"===typeof f?"":(""+f).trim()}}catch(h){dd(c,c.return,h)}}}else if(6===t.tag){if(null===n){c=t;try{c.stateNode.nodeValue=o?"":c.memoizedProps}catch(h){dd(c,c.return,h)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}4&r&&(null!==(r=e.updateQueue)&&(null!==(n=r.retryQueue)&&(r.retryQueue=null,zl(e,n))));break;case 19:Rl(t,e),Bl(e),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,zl(e,r)));case 30:case 21:}}function Bl(e){var t=e.flags;if(2&t){try{for(var n,r=e.return;null!==r;){if(hl(r)){n=r;break}r=r.return}if(null==n)throw Error(i(160));switch(n.tag){case 27:var o=n.stateNode;xl(e,ml(e),o);break;case 5:var a=n.stateNode;32&n.flags&&(kt(a,""),n.flags&=-33),xl(e,ml(e),a);break;case 3:case 4:var s=n.stateNode.containerInfo;gl(e,ml(e),s);break;default:throw Error(i(161))}}catch(l){dd(e,e.return,l)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Il(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Il(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Nl(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)jl(e,t.alternate,t),t=t.sibling}function Dl(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:sl(4,t,t.return),Dl(t);break;case 1:ul(t,t.return);var n=t.stateNode;"function"===typeof n.componentWillUnmount&&cl(t,t.return,n),Dl(t);break;case 27:wu(t.stateNode);case 26:case 5:ul(t,t.return),Dl(t);break;case 22:null===t.memoizedState&&Dl(t);break;default:Dl(t)}e=e.sibling}}function Ll(e,t,n){for(n=n&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var r=t.alternate,o=e,a=t,i=a.flags;switch(a.tag){case 0:case 11:case 15:Ll(o,a,n),il(4,a);break;case 1:if(Ll(o,a,n),"function"===typeof(o=(r=a).stateNode).componentDidMount)try{o.componentDidMount()}catch(c){dd(r,r.return,c)}if(null!==(o=(r=a).updateQueue)){var s=r.stateNode;try{var l=o.shared.hiddenCallbacks;if(null!==l)for(o.shared.hiddenCallbacks=null,o=0;o<l.length;o++)pa(l[o],s)}catch(c){dd(r,r.return,c)}}n&&64&i&&ll(a),dl(a,a.return);break;case 27:yl(a);case 26:case 5:Ll(o,a,n),n&&null===r&&4&i&&pl(a),dl(a,a.return);break;case 12:Ll(o,a,n);break;case 13:Ll(o,a,n),n&&4&i&&Pl(o,a);break;case 22:null===a.memoizedState&&Ll(o,a,n),dl(a,a.return);break;case 30:break;default:Ll(o,a,n)}t=t.sibling}}function $l(e,t){var n=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==n&&(null!=e&&e.refCount++,null!=n&&Bo(n))}function Ml(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Bo(e))}function ql(e,t,n,r){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)Hl(e,t,n,r),t=t.sibling}function Hl(e,t,n,r){var o=t.flags;switch(t.tag){case 0:case 11:case 15:ql(e,t,n,r),2048&o&&il(9,t);break;case 1:case 13:default:ql(e,t,n,r);break;case 3:ql(e,t,n,r),2048&o&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Bo(e)));break;case 12:if(2048&o){ql(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,i=a.id,s=a.onPostCommit;"function"===typeof s&&s(i,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(l){dd(t,t.return,l)}}else ql(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,i=t.alternate,null!==t.memoizedState?2&a._visibility?ql(e,t,n,r):Wl(e,t):2&a._visibility?ql(e,t,n,r):(a._visibility|=2,Ul(e,t,n,r,0!==(10256&t.subtreeFlags))),2048&o&&$l(i,t);break;case 24:ql(e,t,n,r),2048&o&&Ml(t.alternate,t)}}function Ul(e,t,n,r,o){for(o=o&&0!==(10256&t.subtreeFlags),t=t.child;null!==t;){var a=e,i=t,s=n,l=r,c=i.flags;switch(i.tag){case 0:case 11:case 15:Ul(a,i,s,l,o),il(8,i);break;case 23:break;case 22:var d=i.stateNode;null!==i.memoizedState?2&d._visibility?Ul(a,i,s,l,o):Wl(a,i):(d._visibility|=2,Ul(a,i,s,l,o)),o&&2048&c&&$l(i.alternate,i);break;case 24:Ul(a,i,s,l,o),o&&2048&c&&Ml(i.alternate,i);break;default:Ul(a,i,s,l,o)}t=t.sibling}}function Wl(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var n=e,r=t,o=r.flags;switch(r.tag){case 22:Wl(n,r),2048&o&&$l(r.alternate,r);break;case 24:Wl(n,r),2048&o&&Ml(r.alternate,r);break;default:Wl(n,r)}t=t.sibling}}var Gl=8192;function Vl(e){if(e.subtreeFlags&Gl)for(e=e.child;null!==e;)Yl(e),e=e.sibling}function Yl(e){switch(e.tag){case 26:Vl(e),e.flags&Gl&&null!==e.memoizedState&&function(e,t,n){if(null===qu)throw Error(i(475));var r=qu;if("stylesheet"===t.type&&("string"!==typeof n.media||!1!==matchMedia(n.media).matches)&&0===(4&t.state.loading)){if(null===t.instance){var o=_u(n.href),a=e.querySelector(Pu(o));if(a)return null!==(e=a._p)&&"object"===typeof e&&"function"===typeof e.then&&(r.count++,r=Uu.bind(r),e.then(r,r)),t.state.loading|=4,t.instance=a,void We(a);a=e.ownerDocument||e,n=zu(n),(o=ku.get(o))&&Iu(n,o),We(a=a.createElement("link"));var s=a;s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),eu(a,"link",n),t.instance=a}null===r.stylesheets&&(r.stylesheets=new Map),r.stylesheets.set(t,e),(e=t.state.preload)&&0===(3&t.state.loading)&&(r.count++,t=Uu.bind(r),e.addEventListener("load",t),e.addEventListener("error",t))}}(Ol,e.memoizedState,e.memoizedProps);break;case 5:default:Vl(e);break;case 3:case 4:var t=Ol;Ol=ju(e.stateNode.containerInfo),Vl(e),Ol=t;break;case 22:null===e.memoizedState&&(null!==(t=e.alternate)&&null!==t.memoizedState?(t=Gl,Gl=16777216,Vl(e),Gl=t):Vl(e))}}function Ql(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function Kl(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Sl=r,Zl(r,e)}Ql(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)Jl(e),e=e.sibling}function Jl(e){switch(e.tag){case 0:case 11:case 15:Kl(e),2048&e.flags&&sl(9,e,e.return);break;case 3:case 12:default:Kl(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,Xl(e)):Kl(e)}}function Xl(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Sl=r,Zl(r,e)}Ql(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:sl(8,t,t.return),Xl(t);break;case 22:2&(n=t.stateNode)._visibility&&(n._visibility&=-3,Xl(t));break;default:Xl(t)}e=e.sibling}}function Zl(e,t){for(;null!==Sl;){var n=Sl;switch(n.tag){case 0:case 11:case 15:sl(8,n,t);break;case 23:case 22:if(null!==n.memoizedState&&null!==n.memoizedState.cachePool){var r=n.memoizedState.cachePool.pool;null!=r&&r.refCount++}break;case 24:Bo(n.memoizedState.cache)}if(null!==(r=n.child))r.return=n,Sl=r;else e:for(n=e;null!==Sl;){var o=(r=Sl).sibling,a=r.return;if(Cl(r),r===n){Sl=null;break e}if(null!==o){o.return=a,Sl=o;break e}Sl=a}}}var ec={getCacheForType:function(e){var t=Ao(Oo),n=t.data.get(e);return void 0===n&&(n=e(),t.data.set(e,n)),n}},tc="function"===typeof WeakMap?WeakMap:Map,nc=0,rc=null,oc=null,ac=0,ic=0,sc=null,lc=!1,cc=!1,dc=!1,uc=0,pc=0,fc=0,hc=0,mc=0,gc=0,xc=0,yc=null,bc=null,vc=!1,wc=0,kc=1/0,Sc=null,jc=null,Cc=0,Ec=null,Ac=null,Fc=0,_c=0,Pc=null,zc=null,Rc=0,Oc=null;function Tc(){if(0!==(2&nc)&&0!==ac)return ac&-ac;if(null!==T.T){return 0!==Do?Do:_d()}return Pe()}function Bc(){0===gc&&(gc=0===(536870912&ac)||ao?ke():536870912);var e=os.current;return null!==e&&(e.flags|=32),gc}function Ic(e,t,n){(e!==rc||2!==ic&&9!==ic)&&null===e.cancelPendingCommit||(Hc(e,0),$c(e,ac,gc,!1)),Ce(e,n),0!==(2&nc)&&e===rc||(e===rc&&(0===(2&nc)&&(hc|=n),4===pc&&$c(e,ac,gc,!1)),kd(e))}function Nc(e,t,n){if(0!==(6&nc))throw Error(i(327));for(var r=!n&&0===(124&t)&&0===(t&e.expiredLanes)||ve(e,t),o=r?function(e,t){var n=nc;nc|=2;var r=Wc(),o=Gc();rc!==e||ac!==t?(Sc=null,kc=te()+500,Hc(e,t)):cc=ve(e,t);e:for(;;)try{if(0!==ic&&null!==oc){t=oc;var a=sc;t:switch(ic){case 1:ic=0,sc=null,Zc(e,t,a,1);break;case 2:case 9:if(Ko(a)){ic=0,sc=null,Xc(t);break}t=function(){2!==ic&&9!==ic||rc!==e||(ic=7),kd(e)},a.then(t,t);break e;case 3:ic=7;break e;case 4:ic=5;break e;case 7:Ko(a)?(ic=0,sc=null,Xc(t)):(ic=0,sc=null,Zc(e,t,a,7));break;case 5:var s=null;switch(oc.tag){case 26:s=oc.memoizedState;case 5:case 27:var l=oc;if(!s||Mu(s)){ic=0,sc=null;var c=l.sibling;if(null!==c)oc=c;else{var d=l.return;null!==d?(oc=d,ed(d)):oc=null}break t}}ic=0,sc=null,Zc(e,t,a,5);break;case 6:ic=0,sc=null,Zc(e,t,a,6);break;case 8:qc(),pc=6;break e;default:throw Error(i(462))}}Kc();break}catch(u){Uc(e,u)}return bo=yo=null,T.H=r,T.A=o,nc=n,null!==oc?0:(rc=null,ac=0,Fr(),pc)}(e,t):Yc(e,t,!0),a=r;;){if(0===o){cc&&!r&&$c(e,t,0,!1);break}if(n=e.current.alternate,!a||Lc(n)){if(2===o){if(a=t,e.errorRecoveryDisabledLanes&a)var s=0;else s=0!==(s=-536870913&e.pendingLanes)?s:536870912&s?536870912:0;if(0!==s){t=s;e:{var l=e;o=yc;var c=l.current.memoizedState.isDehydrated;if(c&&(Hc(l,s).flags|=256),2!==(s=Yc(l,s,!1))){if(dc&&!c){l.errorRecoveryDisabledLanes|=a,hc|=a,o=4;break e}a=bc,bc=o,null!==a&&(null===bc?bc=a:bc.push.apply(bc,a))}o=s}if(a=!1,2!==o)continue}}if(1===o){Hc(e,0),$c(e,t,0,!0);break}e:{switch(r=e,a=o){case 0:case 1:throw Error(i(345));case 4:if((4194048&t)!==t)break;case 6:$c(r,t,gc,!lc);break e;case 2:bc=null;break;case 3:case 5:break;default:throw Error(i(329))}if((62914560&t)===t&&10<(o=wc+300-te())){if($c(r,t,gc,!lc),0!==be(r,0,!0))break e;r.timeoutHandle=lu(Dc.bind(null,r,n,bc,Sc,vc,t,gc,hc,xc,lc,a,2,-0,0),o)}else Dc(r,n,bc,Sc,vc,t,gc,hc,xc,lc,a,0,-0,0)}break}o=Yc(e,t,!1),a=!1}kd(e)}function Dc(e,t,n,r,o,a,s,l,c,d,u,p,f,h){if(e.timeoutHandle=-1,(8192&(p=t.subtreeFlags)||16785408===(16785408&p))&&(qu={stylesheets:null,count:0,unsuspend:Hu},Yl(t),null!==(p=function(){if(null===qu)throw Error(i(475));var e=qu;return e.stylesheets&&0===e.count&&Gu(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&Gu(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}())))return e.cancelPendingCommit=p(nd.bind(null,e,t,a,n,r,o,s,l,c,u,1,f,h)),void $c(e,a,s,!d);nd(e,t,a,n,r,o,s,l,c)}function Lc(e){for(var t=e;;){var n=t.tag;if((0===n||11===n||15===n)&&16384&t.flags&&(null!==(n=t.updateQueue)&&null!==(n=n.stores)))for(var r=0;r<n.length;r++){var o=n[r],a=o.getSnapshot;o=o.value;try{if(!Qn(a(),o))return!1}catch(i){return!1}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function $c(e,t,n,r){t&=~mc,t&=~hc,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var o=t;0<o;){var a=31-fe(o),i=1<<a;r[a]=-1,o&=~i}0!==n&&Ee(e,n,t)}function Mc(){return 0!==(6&nc)||(Sd(0,!1),!1)}function qc(){if(null!==oc){if(0===ic)var e=oc.return;else bo=yo=null,Da(e=oc),Qi=null,Ki=0,e=oc;for(;null!==e;)al(e.alternate,e),e=e.return;oc=null}}function Hc(e,t){var n=e.timeoutHandle;-1!==n&&(e.timeoutHandle=-1,cu(n)),null!==(n=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,n()),qc(),rc=e,oc=n=Dr(e.current,null),ac=t,ic=0,sc=null,lc=!1,cc=ve(e,t),dc=!1,xc=gc=mc=hc=fc=pc=0,bc=yc=null,vc=!1,0!==(8&t)&&(t|=32&t);var r=e.entangledLanes;if(0!==r)for(e=e.entanglements,r&=t;0<r;){var o=31-fe(r),a=1<<o;t|=e[o],r&=~a}return uc=t,Fr(),n}function Uc(e,t){va=null,T.H=Wi,t===Go||t===Yo?(t=ea(),ic=3):t===Vo?(t=ea(),ic=4):ic=t===Es?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,sc=t,null===oc&&(pc=1,ws(e,jr(t,e.current)))}function Wc(){var e=T.H;return T.H=Wi,null===e?Wi:e}function Gc(){var e=T.A;return T.A=ec,e}function Vc(){pc=4,lc||(4194048&ac)!==ac&&null!==os.current||(cc=!0),0===(134217727&fc)&&0===(134217727&hc)||null===rc||$c(rc,ac,gc,!1)}function Yc(e,t,n){var r=nc;nc|=2;var o=Wc(),a=Gc();rc===e&&ac===t||(Sc=null,Hc(e,t)),t=!1;var i=pc;e:for(;;)try{if(0!==ic&&null!==oc){var s=oc,l=sc;switch(ic){case 8:qc(),i=6;break e;case 3:case 2:case 9:case 6:null===os.current&&(t=!0);var c=ic;if(ic=0,sc=null,Zc(e,s,l,c),n&&cc){i=0;break e}break;default:c=ic,ic=0,sc=null,Zc(e,s,l,c)}}Qc(),i=pc;break}catch(d){Uc(e,d)}return t&&e.shellSuspendCounter++,bo=yo=null,nc=r,T.H=o,T.A=a,null===oc&&(rc=null,ac=0,Fr()),i}function Qc(){for(;null!==oc;)Jc(oc)}function Kc(){for(;null!==oc&&!Z();)Jc(oc)}function Jc(e){var t=Js(e.alternate,e,uc);e.memoizedProps=e.pendingProps,null===t?ed(e):oc=t}function Xc(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Is(n,t,t.pendingProps,t.type,void 0,ac);break;case 11:t=Is(n,t,t.pendingProps,t.type.render,t.ref,ac);break;case 5:Da(t);default:al(n,t),t=Js(n,t=oc=Lr(t,uc),uc)}e.memoizedProps=e.pendingProps,null===t?ed(e):oc=t}function Zc(e,t,n,r){bo=yo=null,Da(t),Qi=null,Ki=0;var o=t.return;try{if(function(e,t,n,r,o){if(n.flags|=32768,null!==r&&"object"===typeof r&&"function"===typeof r.then){if(null!==(t=n.alternate)&&jo(t,n,o,!0),null!==(n=os.current)){switch(n.tag){case 13:return null===as?Vc():null===n.alternate&&0===pc&&(pc=3),n.flags&=-257,n.flags|=65536,n.lanes=o,r===Qo?n.flags|=16384:(null===(t=n.updateQueue)?n.updateQueue=new Set([r]):t.add(r),ud(e,r,o)),!1;case 22:return n.flags|=65536,r===Qo?n.flags|=16384:(null===(t=n.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):null===(n=t.retryQueue)?t.retryQueue=new Set([r]):n.add(r),ud(e,r,o)),!1}throw Error(i(435,n.tag))}return ud(e,r,o),Vc(),!1}if(ao)return null!==(t=os.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=o,r!==lo&&go(jr(e=Error(i(422),{cause:r}),n))):(r!==lo&&go(jr(t=Error(i(423),{cause:r}),n)),(e=e.current.alternate).flags|=65536,o&=-o,e.lanes|=o,r=jr(r,n),la(e,o=Ss(e.stateNode,r,o)),4!==pc&&(pc=2)),!1;var a=Error(i(520),{cause:r});if(a=jr(a,n),null===yc?yc=[a]:yc.push(a),4!==pc&&(pc=2),null===t)return!0;r=jr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=o&-o,n.lanes|=e,la(n,e=Ss(n.stateNode,r,e)),!1;case 1:if(t=n.type,a=n.stateNode,0===(128&n.flags)&&("function"===typeof t.getDerivedStateFromError||null!==a&&"function"===typeof a.componentDidCatch&&(null===jc||!jc.has(a))))return n.flags|=65536,o&=-o,n.lanes|=o,Cs(o=js(o),e,n,r),la(n,o),!1}n=n.return}while(null!==n);return!1}(e,o,t,n,ac))return pc=1,ws(e,jr(n,e.current)),void(oc=null)}catch(a){if(null!==o)throw oc=o,a;return pc=1,ws(e,jr(n,e.current)),void(oc=null)}32768&t.flags?(ao||1===r?e=!0:cc||0!==(536870912&ac)?e=!1:(lc=e=!0,(2===r||9===r||3===r||6===r)&&(null!==(r=os.current)&&13===r.tag&&(r.flags|=16384))),td(t,e)):ed(t)}function ed(e){var t=e;do{if(0!==(32768&t.flags))return void td(t,lc);e=t.return;var n=rl(t.alternate,t,uc);if(null!==n)return void(oc=n);if(null!==(t=t.sibling))return void(oc=t);oc=t=e}while(null!==t);0===pc&&(pc=5)}function td(e,t){do{var n=ol(e.alternate,e);if(null!==n)return n.flags&=32767,void(oc=n);if(null!==(n=e.return)&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&null!==(e=e.sibling))return void(oc=e);oc=e=n}while(null!==e);pc=6,oc=null}function nd(e,t,n,r,o,a,s,l,c){e.cancelPendingCommit=null;do{sd()}while(0!==Cc);if(0!==(6&nc))throw Error(i(327));if(null!==t){if(t===e.current)throw Error(i(177));if(a=t.lanes|t.childLanes,function(e,t,n,r,o,a){var i=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=i&~n;0<n;){var d=31-fe(n),u=1<<d;s[d]=0,l[d]=-1;var p=c[d];if(null!==p)for(c[d]=null,d=0;d<p.length;d++){var f=p[d];null!==f&&(f.lane&=-536870913)}n&=~u}0!==r&&Ee(e,r,0),0!==a&&0===o&&0!==e.tag&&(e.suspendedLanes|=a&~(i&~t))}(e,n,a|=Ar,s,l,c),e===rc&&(oc=rc=null,ac=0),Ac=t,Ec=e,Fc=n,_c=a,Pc=o,zc=r,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,J(ae,function(){return ld(),null})):(e.callbackNode=null,e.callbackPriority=0),r=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||r){r=T.T,T.T=null,o=B.p,B.p=2,s=nc,nc|=4;try{!function(e,t){if(e=e.containerInfo,tu=np,tr(e=er(e))){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var o=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch(g){n=null;break e}var s=0,l=-1,c=-1,d=0,u=0,p=e,f=null;t:for(;;){for(var h;p!==n||0!==o&&3!==p.nodeType||(l=s+o),p!==a||0!==r&&3!==p.nodeType||(c=s+r),3===p.nodeType&&(s+=p.nodeValue.length),null!==(h=p.firstChild);)f=p,p=h;for(;;){if(p===e)break t;if(f===n&&++d===o&&(l=s),f===a&&++u===r&&(c=s),null!==(h=p.nextSibling))break;f=(p=f).parentNode}p=h}n=-1===l||-1===c?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(nu={focusedElem:e,selectionRange:n},np=!1,Sl=t;null!==Sl;)if(e=(t=Sl).child,0!==(1024&t.subtreeFlags)&&null!==e)e.return=t,Sl=e;else for(;null!==Sl;){switch(a=(t=Sl).alternate,e=t.flags,t.tag){case 0:case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==a){e=void 0,n=t,o=a.memoizedProps,a=a.memoizedState,r=n.stateNode;try{var m=gs(n.type,o,(n.elementType,n.type));e=r.getSnapshotBeforeUpdate(m,a),r.__reactInternalSnapshotBeforeUpdate=e}catch(x){dd(n,n.return,x)}}break;case 3:if(0!==(1024&e))if(9===(n=(e=t.stateNode.containerInfo).nodeType))mu(e);else if(1===n)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":mu(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(i(163))}if(null!==(e=t.sibling)){e.return=t.return,Sl=e;break}Sl=t.return}}(e,t)}finally{nc=s,B.p=o,T.T=r}}Cc=1,rd(),od(),ad()}}function rd(){if(1===Cc){Cc=0;var e=Ec,t=Ac,n=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||n){n=T.T,T.T=null;var r=B.p;B.p=2;var o=nc;nc|=4;try{Tl(t,e);var a=nu,i=er(e.containerInfo),s=a.focusedElem,l=a.selectionRange;if(i!==s&&s&&s.ownerDocument&&Zn(s.ownerDocument.documentElement,s)){if(null!==l&&tr(s)){var c=l.start,d=l.end;if(void 0===d&&(d=c),"selectionStart"in s)s.selectionStart=c,s.selectionEnd=Math.min(d,s.value.length);else{var u=s.ownerDocument||document,p=u&&u.defaultView||window;if(p.getSelection){var f=p.getSelection(),h=s.textContent.length,m=Math.min(l.start,h),g=void 0===l.end?m:Math.min(l.end,h);!f.extend&&m>g&&(i=g,g=m,m=i);var x=Xn(s,m),y=Xn(s,g);if(x&&y&&(1!==f.rangeCount||f.anchorNode!==x.node||f.anchorOffset!==x.offset||f.focusNode!==y.node||f.focusOffset!==y.offset)){var b=u.createRange();b.setStart(x.node,x.offset),f.removeAllRanges(),m>g?(f.addRange(b),f.extend(y.node,y.offset)):(b.setEnd(y.node,y.offset),f.addRange(b))}}}}for(u=[],f=s;f=f.parentNode;)1===f.nodeType&&u.push({element:f,left:f.scrollLeft,top:f.scrollTop});for("function"===typeof s.focus&&s.focus(),s=0;s<u.length;s++){var v=u[s];v.element.scrollLeft=v.left,v.element.scrollTop=v.top}}np=!!tu,nu=tu=null}finally{nc=o,B.p=r,T.T=n}}e.current=t,Cc=2}}function od(){if(2===Cc){Cc=0;var e=Ec,t=Ac,n=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||n){n=T.T,T.T=null;var r=B.p;B.p=2;var o=nc;nc|=4;try{jl(e,t.alternate,t)}finally{nc=o,B.p=r,T.T=n}}Cc=3}}function ad(){if(4===Cc||3===Cc){Cc=0,ee();var e=Ec,t=Ac,n=Fc,r=zc;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Cc=5:(Cc=0,Ac=Ec=null,id(e,e.pendingLanes));var o=e.pendingLanes;if(0===o&&(jc=null),_e(n),t=t.stateNode,ue&&"function"===typeof ue.onCommitFiberRoot)try{ue.onCommitFiberRoot(de,t,void 0,128===(128&t.current.flags))}catch(l){}if(null!==r){t=T.T,o=B.p,B.p=2,T.T=null;try{for(var a=e.onRecoverableError,i=0;i<r.length;i++){var s=r[i];a(s.value,{componentStack:s.stack})}}finally{T.T=t,B.p=o}}0!==(3&Fc)&&sd(),kd(e),o=e.pendingLanes,0!==(4194090&n)&&0!==(42&o)?e===Oc?Rc++:(Rc=0,Oc=e):Rc=0,Sd(0,!1)}}function id(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Bo(t)))}function sd(e){return rd(),od(),ad(),ld()}function ld(){if(5!==Cc)return!1;var e=Ec,t=_c;_c=0;var n=_e(Fc),r=T.T,o=B.p;try{B.p=32>n?32:n,T.T=null,n=Pc,Pc=null;var a=Ec,s=Fc;if(Cc=0,Ac=Ec=null,Fc=0,0!==(6&nc))throw Error(i(331));var l=nc;if(nc|=4,Jl(a.current),Hl(a,a.current,s,n),nc=l,Sd(0,!1),ue&&"function"===typeof ue.onPostCommitFiberRoot)try{ue.onPostCommitFiberRoot(de,a)}catch(c){}return!0}finally{B.p=o,T.T=r,id(e,t)}}function cd(e,t,n){t=jr(n,t),null!==(e=ia(e,t=Ss(e.stateNode,t,2),2))&&(Ce(e,2),kd(e))}function dd(e,t,n){if(3===e.tag)cd(e,e,n);else for(;null!==t;){if(3===t.tag){cd(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===jc||!jc.has(r))){e=jr(n,e),null!==(r=ia(t,n=js(2),2))&&(Cs(n,r,t,e),Ce(r,2),kd(r));break}}t=t.return}}function ud(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new tc;var o=new Set;r.set(t,o)}else void 0===(o=r.get(t))&&(o=new Set,r.set(t,o));o.has(n)||(dc=!0,o.add(n),e=pd.bind(null,e,t,n),t.then(e,e))}function pd(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,rc===e&&(ac&n)===n&&(4===pc||3===pc&&(62914560&ac)===ac&&300>te()-wc?0===(2&nc)&&Hc(e,0):mc|=n,xc===ac&&(xc=0)),kd(e)}function fd(e,t){0===t&&(t=Se()),null!==(e=zr(e,t))&&(Ce(e,t),kd(e))}function hd(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),fd(e,n)}function md(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;null!==o&&(n=o.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}null!==r&&r.delete(t),fd(e,n)}var gd=null,xd=null,yd=!1,bd=!1,vd=!1,wd=0;function kd(e){e!==xd&&null===e.next&&(null===xd?gd=xd=e:xd=xd.next=e),bd=!0,yd||(yd=!0,uu(function(){0!==(6&nc)?J(re,jd):Cd()}))}function Sd(e,t){if(!vd&&bd){vd=!0;do{for(var n=!1,r=gd;null!==r;){if(!t)if(0!==e){var o=r.pendingLanes;if(0===o)var a=0;else{var i=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-fe(42|e)+1)-1,a=201326741&(a&=o&~(i&~s))?201326741&a|1:a?2|a:0}0!==a&&(n=!0,Fd(r,a))}else a=ac,0===(3&(a=be(r,r===rc?a:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||ve(r,a)||(n=!0,Fd(r,a));r=r.next}}while(n);vd=!1}}function jd(){Cd()}function Cd(){bd=yd=!1;var e=0;0!==wd&&(function(){var e=window.event;if(e&&"popstate"===e.type)return e!==su&&(su=e,!0);return su=null,!1}()&&(e=wd),wd=0);for(var t=te(),n=null,r=gd;null!==r;){var o=r.next,a=Ed(r,t);0===a?(r.next=null,null===n?gd=o:n.next=o,null===o&&(xd=n)):(n=r,(0!==e||0!==(3&a))&&(bd=!0)),r=o}Sd(e,!1)}function Ed(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,a=-62914561&e.pendingLanes;0<a;){var i=31-fe(a),s=1<<i,l=o[i];-1===l?0!==(s&n)&&0===(s&r)||(o[i]=we(s,t)):l<=t&&(e.expiredLanes|=s),a&=~s}if(n=ac,n=be(e,e===(t=rc)?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===n||e===t&&(2===ic||9===ic)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&X(r),e.callbackNode=null,e.callbackPriority=0;if(0===(3&n)||ve(e,n)){if((t=n&-n)===e.callbackPriority)return t;switch(null!==r&&X(r),_e(n)){case 2:case 8:n=oe;break;case 32:default:n=ae;break;case 268435456:n=se}return r=Ad.bind(null,e),n=J(n,r),e.callbackPriority=t,e.callbackNode=n,t}return null!==r&&null!==r&&X(r),e.callbackPriority=2,e.callbackNode=null,2}function Ad(e,t){if(0!==Cc&&5!==Cc)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(sd()&&e.callbackNode!==n)return null;var r=ac;return 0===(r=be(e,e===rc?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Nc(e,r,t),Ed(e,te()),null!=e.callbackNode&&e.callbackNode===n?Ad.bind(null,e):null)}function Fd(e,t){if(sd())return null;Nc(e,t,!0)}function _d(){return 0===wd&&(wd=ke()),wd}function Pd(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:_t(""+e)}function zd(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}for(var Rd=0;Rd<wr.length;Rd++){var Od=wr[Rd];kr(Od.toLowerCase(),"on"+(Od[0].toUpperCase()+Od.slice(1)))}kr(fr,"onAnimationEnd"),kr(hr,"onAnimationIteration"),kr(mr,"onAnimationStart"),kr("dblclick","onDoubleClick"),kr("focusin","onFocus"),kr("focusout","onBlur"),kr(gr,"onTransitionRun"),kr(xr,"onTransitionStart"),kr(yr,"onTransitionCancel"),kr(br,"onTransitionEnd"),Qe("onMouseEnter",["mouseout","mouseover"]),Qe("onMouseLeave",["mouseout","mouseover"]),Qe("onPointerEnter",["pointerout","pointerover"]),Qe("onPointerLeave",["pointerout","pointerover"]),Ye("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ye("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ye("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ye("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ye("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ye("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Td="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bd=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Td));function Id(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&o.isPropagationStopped())break e;a=s,o.currentTarget=c;try{a(o)}catch(d){xs(d)}o.currentTarget=null,a=l}else for(i=0;i<r.length;i++){if(l=(s=r[i]).instance,c=s.currentTarget,s=s.listener,l!==a&&o.isPropagationStopped())break e;a=s,o.currentTarget=c;try{a(o)}catch(d){xs(d)}o.currentTarget=null,a=l}}}}function Nd(e,t){var n=t[Be];void 0===n&&(n=t[Be]=new Set);var r=e+"__bubble";n.has(r)||(Md(t,e,2,!1),n.add(r))}function Dd(e,t,n){var r=0;t&&(r|=4),Md(n,e,r,t)}var Ld="_reactListening"+Math.random().toString(36).slice(2);function $d(e){if(!e[Ld]){e[Ld]=!0,Ge.forEach(function(t){"selectionchange"!==t&&(Bd.has(t)||Dd(t,!1,e),Dd(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Ld]||(t[Ld]=!0,Dd("selectionchange",!1,t))}}function Md(e,t,n,r){switch(cp(t)){case 2:var o=rp;break;case 8:o=op;break;default:o=ap}n=o.bind(null,t,n,e),o=void 0,!Lt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(o=!0),r?void 0!==o?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):void 0!==o?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function qd(e,t,n,r,o){var a=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var i=r.tag;if(3===i||4===i){var s=r.stateNode.containerInfo;if(s===o)break;if(4===i)for(i=r.return;null!==i;){var c=i.tag;if((3===c||4===c)&&i.stateNode.containerInfo===o)return;i=i.return}for(;null!==s;){if(null===(i=Me(s)))return;if(5===(c=i.tag)||6===c||26===c||27===c){r=a=i;continue e}s=s.parentNode}}r=r.return}It(function(){var r=a,o=zt(n),i=[];e:{var s=vr.get(e);if(void 0!==s){var c=Zt,d=e;switch(e){case"keypress":if(0===Wt(n))break e;case"keydown":case"keyup":c=mn;break;case"focusin":d="focus",c=an;break;case"focusout":d="blur",c=an;break;case"beforeblur":case"afterblur":c=an;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=rn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=on;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=xn;break;case fr:case hr:case mr:c=sn;break;case br:c=yn;break;case"scroll":case"scrollend":c=tn;break;case"wheel":c=bn;break;case"copy":case"cut":case"paste":c=ln;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=gn;break;case"toggle":case"beforetoggle":c=vn}var u=0!==(4&t),p=!u&&("scroll"===e||"scrollend"===e),f=u?null!==s?s+"Capture":null:s;u=[];for(var h,m=r;null!==m;){var g=m;if(h=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===h||null===f||null!=(g=Nt(m,f))&&u.push(Hd(m,g,h)),p)break;m=m.return}0<u.length&&(s=new c(s,d,null,n,o),i.push({event:s,listeners:u}))}}if(0===(7&t)){if(c="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===Pt||!(d=n.relatedTarget||n.fromElement)||!Me(d)&&!d[Te])&&(c||s)&&(s=o.window===o?o:(s=o.ownerDocument)?s.defaultView||s.parentWindow:window,c?(c=r,null!==(d=(d=n.relatedTarget||n.toElement)?Me(d):null)&&(p=l(d),u=d.tag,d!==p||5!==u&&27!==u&&6!==u)&&(d=null)):(c=null,d=r),c!==d)){if(u=rn,g="onMouseLeave",f="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(u=gn,g="onPointerLeave",f="onPointerEnter",m="pointer"),p=null==c?s:He(c),h=null==d?s:He(d),(s=new u(g,m+"leave",c,n,o)).target=p,s.relatedTarget=h,g=null,Me(o)===r&&((u=new u(f,m+"enter",d,n,o)).target=h,u.relatedTarget=p,g=u),p=g,c&&d)e:{for(f=d,m=0,h=u=c;h;h=Wd(h))m++;for(h=0,g=f;g;g=Wd(g))h++;for(;0<m-h;)u=Wd(u),m--;for(;0<h-m;)f=Wd(f),h--;for(;m--;){if(u===f||null!==f&&u===f.alternate)break e;u=Wd(u),f=Wd(f)}u=null}else u=null;null!==c&&Gd(i,s,c,u,!1),null!==d&&null!==p&&Gd(i,p,d,u,!0)}if("select"===(c=(s=r?He(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===c&&"file"===s.type)var x=Dn;else if(Rn(s))if(Ln)x=Yn;else{x=Gn;var y=Wn}else!(c=s.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==s.type&&"radio"!==s.type?r&&Et(r.elementType)&&(x=Dn):x=Vn;switch(x&&(x=x(e,r))?On(i,x,n,o):(y&&y(e,s,r),"focusout"===e&&r&&"number"===s.type&&null!=r.memoizedProps.value&&yt(s,"number",s.value)),y=r?He(r):window,e){case"focusin":(Rn(y)||"true"===y.contentEditable)&&(rr=y,or=r,ar=null);break;case"focusout":ar=or=rr=null;break;case"mousedown":ir=!0;break;case"contextmenu":case"mouseup":case"dragend":ir=!1,sr(i,n,o);break;case"selectionchange":if(nr)break;case"keydown":case"keyup":sr(i,n,o)}var b;if(kn)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Pn?Fn(e,n)&&(v="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(v="onCompositionStart");v&&(Cn&&"ko"!==n.locale&&(Pn||"onCompositionStart"!==v?"onCompositionEnd"===v&&Pn&&(b=Ut()):(qt="value"in(Mt=o)?Mt.value:Mt.textContent,Pn=!0)),0<(y=Ud(r,v)).length&&(v=new cn(v,e,null,n,o),i.push({event:v,listeners:y}),b?v.data=b:null!==(b=_n(n))&&(v.data=b))),(b=jn?function(e,t){switch(e){case"compositionend":return _n(t);case"keypress":return 32!==t.which?null:(An=!0,En);case"textInput":return(e=t.data)===En&&An?null:e;default:return null}}(e,n):function(e,t){if(Pn)return"compositionend"===e||!kn&&Fn(e,t)?(e=Ut(),Ht=qt=Mt=null,Pn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Cn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(v=Ud(r,"onBeforeInput")).length&&(y=new cn("onBeforeInput","beforeinput",null,n,o),i.push({event:y,listeners:v}),y.data=b)),function(e,t,n,r,o){if("submit"===t&&n&&n.stateNode===o){var a=Pd((o[Oe]||null).action),i=r.submitter;i&&null!==(t=(t=i[Oe]||null)?Pd(t.formAction):i.getAttribute("formAction"))&&(a=t,i=null);var s=new Zt("action","action",null,r,o);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==wd){var e=i?zd(o,i):new FormData(o);zi(n,{pending:!0,data:e,method:o.method,action:a},null,e)}}else"function"===typeof a&&(s.preventDefault(),e=i?zd(o,i):new FormData(o),zi(n,{pending:!0,data:e,method:o.method,action:a},a,e))},currentTarget:o}]})}}(i,e,r,n,o)}Id(i,t)})}function Hd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ud(e,t){for(var n=t+"Capture",r=[];null!==e;){var o=e,a=o.stateNode;if(5!==(o=o.tag)&&26!==o&&27!==o||null===a||(null!=(o=Nt(e,n))&&r.unshift(Hd(e,o,a)),null!=(o=Nt(e,t))&&r.push(Hd(e,o,a))),3===e.tag)return r;e=e.return}return[]}function Wd(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function Gd(e,t,n,r,o){for(var a=t._reactName,i=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(s=s.tag,null!==l&&l===r)break;5!==s&&26!==s&&27!==s||null===c||(l=c,o?null!=(c=Nt(n,a))&&i.unshift(Hd(n,c,l)):o||null!=(c=Nt(n,a))&&i.push(Hd(n,c,l))),n=n.return}0!==i.length&&e.push({event:t,listeners:i})}var Vd=/\r\n?/g,Yd=/\u0000|\uFFFD/g;function Qd(e){return("string"===typeof e?e:""+e).replace(Vd,"\n").replace(Yd,"")}function Kd(e,t){return t=Qd(t),Qd(e)===t}function Jd(){}function Xd(e,t,n,r,o,a){switch(n){case"children":"string"===typeof r?"body"===t||"textarea"===t&&""===r||kt(e,r):("number"===typeof r||"bigint"===typeof r)&&"body"!==t&&kt(e,""+r);break;case"className":nt(e,"class",r);break;case"tabIndex":nt(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":nt(e,n,r);break;case"style":Ct(e,r,a);break;case"data":if("object"!==t){nt(e,"data",r);break}case"src":case"href":if(""===r&&("a"!==t||"href"!==n)){e.removeAttribute(n);break}if(null==r||"function"===typeof r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=_t(""+r),e.setAttribute(n,r);break;case"action":case"formAction":if("function"===typeof r){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof a&&("formAction"===n?("input"!==t&&Xd(e,t,"name",o.name,o,null),Xd(e,t,"formEncType",o.formEncType,o,null),Xd(e,t,"formMethod",o.formMethod,o,null),Xd(e,t,"formTarget",o.formTarget,o,null)):(Xd(e,t,"encType",o.encType,o,null),Xd(e,t,"method",o.method,o,null),Xd(e,t,"target",o.target,o,null))),null==r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=_t(""+r),e.setAttribute(n,r);break;case"onClick":null!=r&&(e.onclick=Jd);break;case"onScroll":null!=r&&Nd("scroll",e);break;case"onScrollEnd":null!=r&&Nd("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(i(61));if(null!=(n=r.__html)){if(null!=o.children)throw Error(i(60));e.innerHTML=n}}break;case"multiple":e.multiple=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"muted":e.muted=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==r||"function"===typeof r||"boolean"===typeof r||"symbol"===typeof r){e.removeAttribute("xlink:href");break}n=_t(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""+r):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":!0===r?e.setAttribute(n,""):!1!==r&&null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,r):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":null!=r&&"function"!==typeof r&&"symbol"!==typeof r&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case"rowSpan":case"start":null==r||"function"===typeof r||"symbol"===typeof r||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case"popover":Nd("beforetoggle",e),Nd("toggle",e),tt(e,"popover",r);break;case"xlinkActuate":rt(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":rt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":rt(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":rt(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":rt(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":rt(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":rt(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":rt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":rt(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":tt(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&tt(e,n=At.get(n)||n,r)}}function Zd(e,t,n,r,o,a){switch(n){case"style":Ct(e,r,a);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(i(61));if(null!=(n=r.__html)){if(null!=o.children)throw Error(i(60));e.innerHTML=n}}break;case"children":"string"===typeof r?kt(e,r):("number"===typeof r||"bigint"===typeof r)&&kt(e,""+r);break;case"onScroll":null!=r&&Nd("scroll",e);break;case"onScrollEnd":null!=r&&Nd("scrollend",e);break;case"onClick":null!=r&&(e.onclick=Jd);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:Ve.hasOwnProperty(n)||("o"!==n[0]||"n"!==n[1]||(o=n.endsWith("Capture"),t=n.slice(2,o?n.length-7:void 0),"function"===typeof(a=null!=(a=e[Oe]||null)?a[n]:null)&&e.removeEventListener(t,a,o),"function"!==typeof r)?n in e?e[n]=r:!0===r?e.setAttribute(n,""):tt(e,n,r):("function"!==typeof a&&null!==a&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,o)))}}function eu(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Nd("error",e),Nd("load",e);var r,o=!1,a=!1;for(r in n)if(n.hasOwnProperty(r)){var s=n[r];if(null!=s)switch(r){case"src":o=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(i(137,t));default:Xd(e,t,r,s,n,null)}}return a&&Xd(e,t,"srcSet",n.srcSet,n,null),void(o&&Xd(e,t,"src",n.src,n,null));case"input":Nd("invalid",e);var l=r=s=a=null,c=null,d=null;for(o in n)if(n.hasOwnProperty(o)){var u=n[o];if(null!=u)switch(o){case"name":a=u;break;case"type":s=u;break;case"checked":c=u;break;case"defaultChecked":d=u;break;case"value":r=u;break;case"defaultValue":l=u;break;case"children":case"dangerouslySetInnerHTML":if(null!=u)throw Error(i(137,t));break;default:Xd(e,t,o,u,n,null)}}return xt(e,r,l,c,d,s,a,!1),void ut(e);case"select":for(a in Nd("invalid",e),o=s=r=null,n)if(n.hasOwnProperty(a)&&null!=(l=n[a]))switch(a){case"value":r=l;break;case"defaultValue":s=l;break;case"multiple":o=l;default:Xd(e,t,a,l,n,null)}return t=r,n=s,e.multiple=!!o,void(null!=t?bt(e,!!o,t,!1):null!=n&&bt(e,!!o,n,!0));case"textarea":for(s in Nd("invalid",e),r=a=o=null,n)if(n.hasOwnProperty(s)&&null!=(l=n[s]))switch(s){case"value":o=l;break;case"defaultValue":a=l;break;case"children":r=l;break;case"dangerouslySetInnerHTML":if(null!=l)throw Error(i(91));break;default:Xd(e,t,s,l,n,null)}return wt(e,o,a,r),void ut(e);case"option":for(c in n)if(n.hasOwnProperty(c)&&null!=(o=n[c]))if("selected"===c)e.selected=o&&"function"!==typeof o&&"symbol"!==typeof o;else Xd(e,t,c,o,n,null);return;case"dialog":Nd("beforetoggle",e),Nd("toggle",e),Nd("cancel",e),Nd("close",e);break;case"iframe":case"object":Nd("load",e);break;case"video":case"audio":for(o=0;o<Td.length;o++)Nd(Td[o],e);break;case"image":Nd("error",e),Nd("load",e);break;case"details":Nd("toggle",e);break;case"embed":case"source":case"link":Nd("error",e),Nd("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in n)if(n.hasOwnProperty(d)&&null!=(o=n[d]))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(i(137,t));default:Xd(e,t,d,o,n,null)}return;default:if(Et(t)){for(u in n)n.hasOwnProperty(u)&&(void 0!==(o=n[u])&&Zd(e,t,u,o,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(null!=(o=n[l])&&Xd(e,t,l,o,n,null))}var tu=null,nu=null;function ru(e){return 9===e.nodeType?e:e.ownerDocument}function ou(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function au(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function iu(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var su=null;var lu="function"===typeof setTimeout?setTimeout:void 0,cu="function"===typeof clearTimeout?clearTimeout:void 0,du="function"===typeof Promise?Promise:void 0,uu="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof du?function(e){return du.resolve(null).then(e).catch(pu)}:lu;function pu(e){setTimeout(function(){throw e})}function fu(e){return"head"===e}function hu(e,t){var n=t,r=0,o=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&8===a.nodeType)if("/$"===(n=a.data)){if(0<r&&8>r){n=r;var i=e.ownerDocument;if(1&n&&wu(i.documentElement),2&n&&wu(i.body),4&n)for(wu(n=i.head),i=n.firstChild;i;){var s=i.nextSibling,l=i.nodeName;i[Le]||"SCRIPT"===l||"STYLE"===l||"LINK"===l&&"stylesheet"===i.rel.toLowerCase()||n.removeChild(i),i=s}}if(0===o)return e.removeChild(a),void Ap(t);o--}else"$"===n||"$?"===n||"$!"===n?o++:r=n.charCodeAt(0)-48;else r=0;n=a}while(n);Ap(t)}function mu(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":mu(n),$e(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===n.rel.toLowerCase())continue}e.removeChild(n)}}function gu(e){return"$!"===e.data||"$?"===e.data&&"complete"===e.ownerDocument.readyState}function xu(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"F!"===t||"F"===t)break;if("/$"===t)return null}}return e}var yu=null;function bu(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}function vu(e,t,n){switch(t=ru(n),e){case"html":if(!(e=t.documentElement))throw Error(i(452));return e;case"head":if(!(e=t.head))throw Error(i(453));return e;case"body":if(!(e=t.body))throw Error(i(454));return e;default:throw Error(i(451))}}function wu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);$e(e)}var ku=new Map,Su=new Set;function ju(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Cu=B.d;B.d={f:function(){var e=Cu.f(),t=Mc();return e||t},r:function(e){var t=qe(e);null!==t&&5===t.tag&&"form"===t.type?Oi(t):Cu.r(e)},D:function(e){Cu.D(e),Au("dns-prefetch",e,null)},C:function(e,t){Cu.C(e,t),Au("preconnect",e,t)},L:function(e,t,n){Cu.L(e,t,n);var r=Eu;if(r&&e&&t){var o='link[rel="preload"][as="'+mt(t)+'"]';"image"===t&&n&&n.imageSrcSet?(o+='[imagesrcset="'+mt(n.imageSrcSet)+'"]',"string"===typeof n.imageSizes&&(o+='[imagesizes="'+mt(n.imageSizes)+'"]')):o+='[href="'+mt(e)+'"]';var a=o;switch(t){case"style":a=_u(e);break;case"script":a=Ru(e)}ku.has(a)||(e=p({rel:"preload",href:"image"===t&&n&&n.imageSrcSet?void 0:e,as:t},n),ku.set(a,e),null!==r.querySelector(o)||"style"===t&&r.querySelector(Pu(a))||"script"===t&&r.querySelector(Ou(a))||(eu(t=r.createElement("link"),"link",e),We(t),r.head.appendChild(t)))}},m:function(e,t){Cu.m(e,t);var n=Eu;if(n&&e){var r=t&&"string"===typeof t.as?t.as:"script",o='link[rel="modulepreload"][as="'+mt(r)+'"][href="'+mt(e)+'"]',a=o;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Ru(e)}if(!ku.has(a)&&(e=p({rel:"modulepreload",href:e},t),ku.set(a,e),null===n.querySelector(o))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ou(a)))return}eu(r=n.createElement("link"),"link",e),We(r),n.head.appendChild(r)}}},X:function(e,t){Cu.X(e,t);var n=Eu;if(n&&e){var r=Ue(n).hoistableScripts,o=Ru(e),a=r.get(o);a||((a=n.querySelector(Ou(o)))||(e=p({src:e,async:!0},t),(t=ku.get(o))&&Nu(e,t),We(a=n.createElement("script")),eu(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},r.set(o,a))}},S:function(e,t,n){Cu.S(e,t,n);var r=Eu;if(r&&e){var o=Ue(r).hoistableStyles,a=_u(e);t=t||"default";var i=o.get(a);if(!i){var s={loading:0,preload:null};if(i=r.querySelector(Pu(a)))s.loading=5;else{e=p({rel:"stylesheet",href:e,"data-precedence":t},n),(n=ku.get(a))&&Iu(e,n);var l=i=r.createElement("link");We(l),eu(l,"link",e),l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),l.addEventListener("load",function(){s.loading|=1}),l.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Bu(i,t,r)}i={type:"stylesheet",instance:i,count:1,state:s},o.set(a,i)}}},M:function(e,t){Cu.M(e,t);var n=Eu;if(n&&e){var r=Ue(n).hoistableScripts,o=Ru(e),a=r.get(o);a||((a=n.querySelector(Ou(o)))||(e=p({src:e,async:!0,type:"module"},t),(t=ku.get(o))&&Nu(e,t),We(a=n.createElement("script")),eu(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},r.set(o,a))}}};var Eu="undefined"===typeof document?null:document;function Au(e,t,n){var r=Eu;if(r&&"string"===typeof t&&t){var o=mt(t);o='link[rel="'+e+'"][href="'+o+'"]',"string"===typeof n&&(o+='[crossorigin="'+n+'"]'),Su.has(o)||(Su.add(o),e={rel:e,crossOrigin:n,href:t},null===r.querySelector(o)&&(eu(t=r.createElement("link"),"link",e),We(t),r.head.appendChild(t)))}}function Fu(e,t,n,r){var o,a,s,l,c=(c=U.current)?ju(c):null;if(!c)throw Error(i(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof n.precedence&&"string"===typeof n.href?(t=_u(n.href),(r=(n=Ue(c).hoistableStyles).get(t))||(r={type:"style",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===n.rel&&"string"===typeof n.href&&"string"===typeof n.precedence){e=_u(n.href);var d=Ue(c).hoistableStyles,u=d.get(e);if(u||(c=c.ownerDocument||c,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,u),(d=c.querySelector(Pu(e)))&&!d._p&&(u.instance=d,u.state.loading=5),ku.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ku.set(e,n),d||(o=c,a=e,s=n,l=u.state,o.querySelector('link[rel="preload"][as="style"]['+a+"]")?l.loading=1:(a=o.createElement("link"),l.preload=a,a.addEventListener("load",function(){return l.loading|=1}),a.addEventListener("error",function(){return l.loading|=2}),eu(a,"link",s),We(a),o.head.appendChild(a))))),t&&null===r)throw Error(i(528,""));return u}if(t&&null!==r)throw Error(i(529,""));return null;case"script":return t=n.async,"string"===typeof(n=n.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Ru(n),(r=(n=Ue(c).hoistableScripts).get(t))||(r={type:"script",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(i(444,e))}}function _u(e){return'href="'+mt(e)+'"'}function Pu(e){return'link[rel="stylesheet"]['+e+"]"}function zu(e){return p({},e,{"data-precedence":e.precedence,precedence:null})}function Ru(e){return'[src="'+mt(e)+'"]'}function Ou(e){return"script[async]"+e}function Tu(e,t,n){if(t.count++,null===t.instance)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+mt(n.href)+'"]');if(r)return t.instance=r,We(r),r;var o=p({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return We(r=(e.ownerDocument||e).createElement("style")),eu(r,"style",o),Bu(r,n.precedence,e),t.instance=r;case"stylesheet":o=_u(n.href);var a=e.querySelector(Pu(o));if(a)return t.state.loading|=4,t.instance=a,We(a),a;r=zu(n),(o=ku.get(o))&&Iu(r,o),We(a=(e.ownerDocument||e).createElement("link"));var s=a;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),eu(a,"link",r),t.state.loading|=4,Bu(a,n.precedence,e),t.instance=a;case"script":return a=Ru(n.src),(o=e.querySelector(Ou(a)))?(t.instance=o,We(o),o):(r=n,(o=ku.get(a))&&Nu(r=p({},n),o),We(o=(e=e.ownerDocument||e).createElement("script")),eu(o,"link",r),e.head.appendChild(o),t.instance=o);case"void":return null;default:throw Error(i(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(r=t.instance,t.state.loading|=4,Bu(r,n.precedence,e));return t.instance}function Bu(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=r.length?r[r.length-1]:null,a=o,i=0;i<r.length;i++){var s=r[i];if(s.dataset.precedence===t)a=s;else if(a!==o)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=9===n.nodeType?n.head:n).insertBefore(e,t.firstChild)}function Iu(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function Nu(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var Du=null;function Lu(e,t,n){if(null===Du){var r=new Map,o=Du=new Map;o.set(n,r)}else(r=(o=Du).get(n))||(r=new Map,o.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),o=0;o<n.length;o++){var a=n[o];if(!(a[Le]||a[Re]||"link"===e&&"stylesheet"===a.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==a.namespaceURI){var i=a.getAttribute(t)||"";i=e+i;var s=r.get(i);s?s.push(a):r.set(i,[a])}}return r}function $u(e,t,n){(e=e.ownerDocument||e).head.insertBefore(n,"title"===t?e.querySelector("head > title"):null)}function Mu(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var qu=null;function Hu(){}function Uu(){if(this.count--,0===this.count)if(this.stylesheets)Gu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var Wu=null;function Gu(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,Wu=new Map,t.forEach(Vu,e),Wu=null,Uu.call(e))}function Vu(e,t){if(!(4&t.state.loading)){var n=Wu.get(e);if(n)var r=n.get(null);else{n=new Map,Wu.set(e,n);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<o.length;a++){var i=o[a];"LINK"!==i.nodeName&&"not all"===i.getAttribute("media")||(n.set(i.dataset.precedence,i),r=i)}r&&n.set(null,r)}i=(o=t.instance).getAttribute("data-precedence"),(a=n.get(i)||r)===r&&n.set(null,o),n.set(i,o),this.count++,r=Uu.bind(this),o.addEventListener("load",r),o.addEventListener("error",r),a?a.parentNode.insertBefore(o,a.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(o,e.firstChild),t.state.loading|=4}}var Yu={$$typeof:w,Provider:null,Consumer:null,_currentValue:I,_currentValue2:I,_threadCount:0};function Qu(e,t,n,r,o,a,i,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=je(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=je(0),this.hiddenUpdates=je(null),this.identifierPrefix=r,this.onUncaughtError=o,this.onCaughtError=a,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function Ku(e,t,n,r,o,a,i,s,l,c,d,u){return e=new Qu(e,t,n,i,s,l,c,u),t=1,!0===a&&(t|=24),a=Ir(3,null,null,t),e.current=a,a.stateNode=e,(t=To()).refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},ra(a),e}function Ju(e){return e?e=Tr:Tr}function Xu(e,t,n,r,o,a){o=Ju(o),null===r.context?r.context=o:r.pendingContext=o,(r=aa(t)).payload={element:n},null!==(a=void 0===a?null:a)&&(r.callback=a),null!==(n=ia(e,r,t))&&(Ic(n,0,t),sa(n,e,t))}function Zu(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function ep(e,t){Zu(e,t),(e=e.alternate)&&Zu(e,t)}function tp(e){if(13===e.tag){var t=zr(e,67108864);null!==t&&Ic(t,0,67108864),ep(e,67108864)}}var np=!0;function rp(e,t,n,r){var o=T.T;T.T=null;var a=B.p;try{B.p=2,ap(e,t,n,r)}finally{B.p=a,T.T=o}}function op(e,t,n,r){var o=T.T;T.T=null;var a=B.p;try{B.p=8,ap(e,t,n,r)}finally{B.p=a,T.T=o}}function ap(e,t,n,r){if(np){var o=ip(r);if(null===o)qd(e,t,r,sp,n),yp(e,r);else if(function(e,t,n,r,o){switch(t){case"focusin":return up=bp(up,e,t,n,r,o),!0;case"dragenter":return pp=bp(pp,e,t,n,r,o),!0;case"mouseover":return fp=bp(fp,e,t,n,r,o),!0;case"pointerover":var a=o.pointerId;return hp.set(a,bp(hp.get(a)||null,e,t,n,r,o)),!0;case"gotpointercapture":return a=o.pointerId,mp.set(a,bp(mp.get(a)||null,e,t,n,r,o)),!0}return!1}(o,e,t,n,r))r.stopPropagation();else if(yp(e,r),4&t&&-1<xp.indexOf(e)){for(;null!==o;){var a=qe(o);if(null!==a)switch(a.tag){case 3:if((a=a.stateNode).current.memoizedState.isDehydrated){var i=ye(a.pendingLanes);if(0!==i){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;i;){var l=1<<31-fe(i);s.entanglements[1]|=l,i&=~l}kd(a),0===(6&nc)&&(kc=te()+500,Sd(0,!1))}}break;case 13:null!==(s=zr(a,2))&&Ic(s,0,2),Mc(),ep(a,2)}if(null===(a=ip(r))&&qd(e,t,r,sp,n),a===o)break;o=a}null!==o&&r.stopPropagation()}else qd(e,t,r,null,n)}}function ip(e){return lp(e=zt(e))}var sp=null;function lp(e){if(sp=null,null!==(e=Me(e))){var t=l(e);if(null===t)e=null;else{var n=t.tag;if(13===n){if(null!==(e=c(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return sp=e,null}function cp(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ne()){case re:return 2;case oe:return 8;case ae:case ie:return 32;case se:return 268435456;default:return 32}default:return 32}}var dp=!1,up=null,pp=null,fp=null,hp=new Map,mp=new Map,gp=[],xp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function yp(e,t){switch(e){case"focusin":case"focusout":up=null;break;case"dragenter":case"dragleave":pp=null;break;case"mouseover":case"mouseout":fp=null;break;case"pointerover":case"pointerout":hp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mp.delete(t.pointerId)}}function bp(e,t,n,r,o,a){return null===e||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[o]},null!==t&&(null!==(t=qe(t))&&tp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==o&&-1===t.indexOf(o)&&t.push(o),e)}function vp(e){var t=Me(e.target);if(null!==t){var n=l(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=c(n)))return e.blockedOn=t,void function(e,t){var n=B.p;try{return B.p=e,t()}finally{B.p=n}}(e.priority,function(){if(13===n.tag){var e=Tc();e=Fe(e);var t=zr(n,e);null!==t&&Ic(t,0,e),ep(n,e)}})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function wp(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=ip(e.nativeEvent);if(null!==n)return null!==(t=qe(n))&&tp(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);Pt=r,n.target.dispatchEvent(r),Pt=null,t.shift()}return!0}function kp(e,t,n){wp(e)&&n.delete(t)}function Sp(){dp=!1,null!==up&&wp(up)&&(up=null),null!==pp&&wp(pp)&&(pp=null),null!==fp&&wp(fp)&&(fp=null),hp.forEach(kp),mp.forEach(kp)}function jp(e,t){e.blockedOn===t&&(e.blockedOn=null,dp||(dp=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Sp)))}var Cp=null;function Ep(e){Cp!==e&&(Cp=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Cp===e&&(Cp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],o=e[t+2];if("function"!==typeof r){if(null===lp(r||n))continue;break}var a=qe(n);null!==a&&(e.splice(t,3),t-=3,zi(a,{pending:!0,data:o,method:n.method,action:r},r,o))}}))}function Ap(e){function t(t){return jp(t,e)}null!==up&&jp(up,e),null!==pp&&jp(pp,e),null!==fp&&jp(fp,e),hp.forEach(t),mp.forEach(t);for(var n=0;n<gp.length;n++){var r=gp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<gp.length&&null===(n=gp[0]).blockedOn;)vp(n),null===n.blockedOn&&gp.shift();if(null!=(n=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<n.length;r+=3){var o=n[r],a=n[r+1],i=o[Oe]||null;if("function"===typeof a)i||Ep(n);else if(i){var s=null;if(a&&a.hasAttribute("formAction")){if(o=a,i=a[Oe]||null)s=i.formAction;else if(null!==lp(o))continue}else s=i.action;"function"===typeof s?n[r+1]=s:(n.splice(r,3),r-=3),Ep(n)}}}function Fp(e){this._internalRoot=e}function _p(e){this._internalRoot=e}_p.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(i(409));Xu(t.current,Tc(),e,t,null,null)},_p.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;Xu(e.current,2,null,e,null,null),Mc(),t[Te]=null}},_p.prototype.unstable_scheduleHydration=function(e){if(e){var t=Pe();e={blockedOn:null,target:e,priority:t};for(var n=0;n<gp.length&&0!==t&&t<gp[n].priority;n++);gp.splice(n,0,e),0===n&&vp(e)}};var Pp=o.version;if("19.1.0"!==Pp)throw Error(i(527,Pp,"19.1.0"));B.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(i(188));throw e=Object.keys(e).join(","),Error(i(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=l(e)))throw Error(i(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(null===o)break;var a=o.alternate;if(null===a){if(null!==(r=o.return)){n=r;continue}break}if(o.child===a.child){for(a=o.child;a;){if(a===n)return d(o),e;if(a===r)return d(o),t;a=a.sibling}throw Error(i(188))}if(n.return!==r.return)n=o,r=a;else{for(var s=!1,c=o.child;c;){if(c===n){s=!0,n=o,r=a;break}if(c===r){s=!0,r=o,n=a;break}c=c.sibling}if(!s){for(c=a.child;c;){if(c===n){s=!0,n=a,r=o;break}if(c===r){s=!0,r=a,n=o;break}c=c.sibling}if(!s)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(3!==n.tag)throw Error(i(188));return n.stateNode.current===n?e:t}(t),e=null===(e=null!==e?u(e):null)?null:e.stateNode};var zp={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:T,reconcilerVersion:"19.1.0"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Rp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Rp.isDisabled&&Rp.supportsFiber)try{de=Rp.inject(zp),ue=Rp}catch(Tp){}}t.createRoot=function(e,t){if(!s(e))throw Error(i(299));var n=!1,r="",o=ys,a=bs,l=vs;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onUncaughtError&&(o=t.onUncaughtError),void 0!==t.onCaughtError&&(a=t.onCaughtError),void 0!==t.onRecoverableError&&(l=t.onRecoverableError),void 0!==t.unstable_transitionCallbacks&&t.unstable_transitionCallbacks),t=Ku(e,1,!1,null,0,n,r,o,a,l,0,null),e[Te]=t.current,$d(e),new Fp(t)},t.hydrateRoot=function(e,t,n){if(!s(e))throw Error(i(299));var r=!1,o="",a=ys,l=bs,c=vs,d=null;return null!==n&&void 0!==n&&(!0===n.unstable_strictMode&&(r=!0),void 0!==n.identifierPrefix&&(o=n.identifierPrefix),void 0!==n.onUncaughtError&&(a=n.onUncaughtError),void 0!==n.onCaughtError&&(l=n.onCaughtError),void 0!==n.onRecoverableError&&(c=n.onRecoverableError),void 0!==n.unstable_transitionCallbacks&&n.unstable_transitionCallbacks,void 0!==n.formState&&(d=n.formState)),(t=Ku(e,1,!0,t,0,r,o,a,l,c,0,d)).context=Ju(null),n=t.current,(o=aa(r=Fe(r=Tc()))).callback=null,ia(n,o,r),n=r,t.current.lanes=n,Ce(t,n),kd(t),e[Te]=t.current,$d(e),new _p(t)},t.version="19.1.0"},1313:(e,t,n)=>{"use strict";n.d(t,{Ay:()=>c,j:()=>s,oz:()=>l});var r=n(9950),o=n(4752),a=n(4492),i=n(4414);const s=o.Ay.div`
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
`,l=o.Ay.button`
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
`,c=e=>{var t;let{tabs:n,className:o,useUrlParams:c=!1,defaultTab:d,onTabChange:u}=e;const p=(0,a.Zp)(),f=(0,a.zy)(),[h,m]=(0,r.useState)(d||(null===(t=n[0])||void 0===t?void 0:t.key)||"");(0,r.useEffect)(()=>{if(c){const e=new URLSearchParams(f.search).get("tab");e&&n.some(t=>t.key===e)?m(e):d&&m(d)}},[f.search,c,n,d]);return(0,i.jsx)(s,{className:o,children:n.map(e=>(0,i.jsx)(l,{active:c?e.key===h:e.active,onClick:()=>(e=>{if(e.onClick)e.onClick();else if(c){m(e.key);const t=new URLSearchParams(f.search);t.set("tab",e.key),p(`${f.pathname}?${t.toString()}`,{replace:!0}),u&&u(e.key)}})(e),children:e.label},e.key))})}},1352:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(1085)},1367:(e,t,n)=>{"use strict";n.d(t,{As:()=>s,OJ:()=>d});var r=n(9950),o=n(4492),a=n(4414);const i=(0,r.createContext)(void 0),s=()=>{const e=(0,r.useContext)(i);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e},l={"System Admin":["view_all_managers","create_manager","edit_manager","delete_manager","view_all_restaurants","view_system_stats","manage_subscriptions","system_settings","view_all_reports"],"Foodcourt General":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_foodcourt_managers","create_foodcourt_manager","edit_foodcourt_manager","manage_foodcourt_restaurants","view_foodcourt_stats","manage_rent","send_announcements"],"Brand General":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_brand_managers","create_brand_manager","edit_brand_manager","manage_brand_restaurants","view_brand_stats","view_brand_performance","send_announcements"],"Foodcourt Manager":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_assigned_restaurants","manage_rent_settings","support_restaurant_opening","communicate_with_tenants","view_rent_reports"],"Brand Manager":["view_own_restaurants","create_restaurant","edit_restaurant","delete_restaurant","view_all_staff","manage_staff","view_consolidated_reports","manage_menus","view_all_orders","view_brand_restaurants","manage_brand_performance","support_restaurant_opening","communicate_with_franchises","view_brand_reports"],"Restaurant Admin":["view_restaurant","edit_restaurant_settings","manage_restaurant_staff","view_restaurant_reports","manage_restaurant_menu","view_restaurant_orders","manage_tables"],Staff:["use_pos","create_order","view_orders","process_payment","view_kitchen_display","view_customer_display"]},c={"System Admin":["/pos/admin/*","/pos/basic","/pos/profile"],"Foodcourt General":["/pos/foodcourt/general/*","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/staff","/pos/promotions","/pos/reports","/pos/settings","/pos/profile"],"Brand General":["/pos/brand/general/*","/pos/brand-products","/pos/recipes","/pos/ingredients","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/staff","/pos/promotions","/pos/reports","/pos/settings","/pos/profile"],"Foodcourt Manager":["/pos/foodcourt/*","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/staff","/pos/promotions","/pos/reports","/pos/settings","/pos/profile"],"Brand Manager":["/pos/brand/*","/pos/brand-products","/pos/recipes","/pos/ingredients","/pos/manager/*","/pos/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/staff","/pos/promotions","/pos/reports","/pos/settings","/pos/profile"],"Restaurant Admin":["/pos/restaurant/*","/restaurant/:restaurantId/*","/restaurant/*","/pos/pos-terminal","/pos/dashboard","/pos/basic","/pos/kitchen","/pos/display","/pos/live-orders","/pos/sales","/pos/menu","/pos/categories","/pos/options","/pos/customers","/pos/staff","/pos/promotions","/pos/reports","/pos/settings","/pos/company-information","/pos/profile","/pos/inventory","/pos/support","/pos/operation-inquiry","/pos/invoices","/pos/history"],Staff:["/restaurant/:restaurantId/*","/restaurant/*","/pos/pos-terminal","/pos/kitchen","/pos/display","/pos/live-orders","/pos/basic","/pos/settings","/pos/company-information","/pos/profile","/pos/support","/pos/operation-inquiry"]},d=e=>{let{children:t}=e;const[n,s]=(0,r.useState)(null),[d,u]=(0,r.useState)(!0),p=(0,o.Zp)();(0,r.useEffect)(()=>{(async()=>{try{const r=localStorage.getItem("auth_token");if(!r)return void u(!1);const o=await fetch("/api/auth/me",{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const r=await o.json();if(r.success&&r.data){var e,t,n;const o=r.data,a={id:(null===(e=o.id)||void 0===e?void 0:e.toString())||"1",email:o.email,name:o.username||o.email.split("@")[0],role:o.role,restaurantId:(null===(t=o.restaurant_id)||void 0===t?void 0:t.toString())||null,managerId:(null===(n=o.manager_id)||void 0===n?void 0:n.toString())||null,permissions:l[o.role]||[],restaurantStatus:o.restaurantStatus,restaurantName:o.restaurantName};s(a)}}else console.error("\u274c Token validation failed:",o.status),localStorage.removeItem("auth_token")}catch(r){console.error("\u274c Failed to check session:",r),localStorage.removeItem("auth_token")}u(!1)})()},[]);const f={user:n,isAuthenticated:!!n,isLoading:d,login:async(e,t)=>{console.log("AuthContext login called with:",e,t);try{console.log("Making API call to /api/auth/login...");const i=await fetch("/api/auth/login",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})});if(console.log("API login response received:",i),console.log("API login response status:",i.status),i.ok){const e=await i.json();if(console.log("API login result:",e),e.success&&e.data){var n,r,o;const t=e.data.user;let i=null,c=null;if(t.restaurant_id)try{const e=await fetch(`/api/restaurants/${t.restaurant_id}`);if(e.ok){const t=await e.json();i=t.status,c=t.name,console.log("Restaurant info fetched:",{status:i,name:c})}}catch(a){console.error("Failed to fetch restaurant info:",a)}const d={id:(null===(n=t.id)||void 0===n?void 0:n.toString())||"1",email:t.email,name:t.username||t.email.split("@")[0],role:t.role,restaurantId:(null===(r=t.restaurant_id)||void 0===r?void 0:r.toString())||null,managerId:(null===(o=t.manager_id)||void 0===o?void 0:o.toString())||null,permissions:l[t.role]||[],restaurantStatus:i,restaurantName:c};return console.log("Setting user data from API:",d),s(d),localStorage.setItem("auth_token",e.data.token),console.log("Login successful with JWT token"),!0}}return console.log("Login failed - API returned error"),!1}catch(a){return console.error("Login error:",a),!1}},logout:async()=>{console.log("Logging out...");try{await fetch("/api/auth/logout",{method:"POST",credentials:"include"})}catch(e){console.error("Logout error:",e)}s(null),localStorage.removeItem("auth_token"),p("/pos")},updateUser:e=>{if(!n)return;const t={...n,...e};s(t)},hasPermission:e=>{var t;return n&&(null===(t=n.permissions)||void 0===t?void 0:t.includes(e))||!1},canAccessRoute:e=>{if(!n)return!1;const t=c[n.role];return!!t&&t.some(t=>{if(t.endsWith("/*")){const n=t.slice(0,-2);return e.startsWith(n)}return e===t})}};return(0,a.jsx)(i.Provider,{value:f,children:t})}},1721:(e,t,n)=>{"use strict";n.d(t,{mM:()=>o});var r=n(4752);const o=r.Ay.select`
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
`},1863:(e,t,n)=>{"use strict";var r=n(9950);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function a(){}var i={d:{f:a,r:function(){throw Error(o(522))},D:a,C:a,L:a,m:a,X:a,S:a,M:a},p:0,findDOMNode:null},s=Symbol.for("react.portal");var l=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(o(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:s,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,i.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&i.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var n=t.as,r=c(n,t.crossOrigin),o="string"===typeof t.integrity?t.integrity:void 0,a="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?i.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:r,integrity:o,fetchPriority:a}):"script"===n&&i.d.X(e,{crossOrigin:r,integrity:o,fetchPriority:a,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&i.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else i.d.m(e)},t.requestFormReset=function(e){i.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},t.useFormStatus=function(){return l.H.useHostTransitionStatus()},t.version="19.1.0"},1983:(e,t)=>{"use strict";var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.iterator;var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function x(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||h}function y(){}function b(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||h}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=x.prototype;var v=b.prototype=new y;v.constructor=b,m(v,x.prototype),v.isPureReactComponent=!0;var w=Array.isArray,k={H:null,A:null,T:null,S:null,V:null},S=Object.prototype.hasOwnProperty;function j(e,t,r,o,a,i){return r=i.ref,{$$typeof:n,type:e,key:t,ref:void 0!==r?r:null,props:i}}function C(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var E=/\/+/g;function A(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function F(){}function _(e,t,o,a,i){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l,c,d=!1;if(null===e)d=!0;else switch(s){case"bigint":case"string":case"number":d=!0;break;case"object":switch(e.$$typeof){case n:case r:d=!0;break;case p:return _((d=e._init)(e._payload),t,o,a,i)}}if(d)return i=i(e),d=""===a?"."+A(e,0):a,w(i)?(o="",null!=d&&(o=d.replace(E,"$&/")+"/"),_(i,t,o,"",function(e){return e})):null!=i&&(C(i)&&(l=i,c=o+(null==i.key||e&&e.key===i.key?"":(""+i.key).replace(E,"$&/")+"/")+d,i=j(l.type,c,void 0,0,0,l.props)),t.push(i)),1;d=0;var u,h=""===a?".":a+":";if(w(e))for(var m=0;m<e.length;m++)d+=_(a=e[m],t,o,s=h+A(a,m),i);else if("function"===typeof(m=null===(u=e)||"object"!==typeof u?null:"function"===typeof(u=f&&u[f]||u["@@iterator"])?u:null))for(e=m.call(e),m=0;!(a=e.next()).done;)d+=_(a=a.value,t,o,s=h+A(a,m++),i);else if("object"===s){if("function"===typeof e.then)return _(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(F,F):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,o,a,i);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return d}function P(e,t,n){if(null==e)return e;var r=[],o=0;return _(e,r,"","",function(e){return t.call(n,e,o++)}),r}function z(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var R="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)};function O(){}t.Children={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!C(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=x,t.Fragment=o,t.Profiler=i,t.PureComponent=b,t.StrictMode=a,t.Suspense=d,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return k.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var r=m({},e.props),o=e.key;if(null!=t)for(a in void 0!==t.ref&&void 0,void 0!==t.key&&(o=""+t.key),t)!S.call(t,a)||"key"===a||"__self"===a||"__source"===a||"ref"===a&&void 0===t.ref||(r[a]=t[a]);var a=arguments.length-2;if(1===a)r.children=n;else if(1<a){for(var i=Array(a),s=0;s<a;s++)i[s]=arguments[s+2];r.children=i}return j(e.type,o,void 0,0,0,r)},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},t.createElement=function(e,t,n){var r,o={},a=null;if(null!=t)for(r in void 0!==t.key&&(a=""+t.key),t)S.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(o[r]=t[r]);var i=arguments.length-2;if(1===i)o.children=n;else if(1<i){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+2];o.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps)void 0===o[r]&&(o[r]=i[r]);return j(e,a,void 0,0,0,o)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=C,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:z}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=k.T,n={};k.T=n;try{var r=e(),o=k.S;null!==o&&o(n,r),"object"===typeof r&&null!==r&&"function"===typeof r.then&&r.then(O,R)}catch(a){R(a)}finally{k.T=t}},t.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},t.use=function(e){return k.H.use(e)},t.useActionState=function(e,t,n){return k.H.useActionState(e,t,n)},t.useCallback=function(e,t){return k.H.useCallback(e,t)},t.useContext=function(e){return k.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return k.H.useDeferredValue(e,t)},t.useEffect=function(e,t,n){var r=k.H;if("function"===typeof n)throw Error("useEffect CRUD overload is not enabled in this build of React.");return r.useEffect(e,t)},t.useId=function(){return k.H.useId()},t.useImperativeHandle=function(e,t,n){return k.H.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return k.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return k.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return k.H.useMemo(e,t)},t.useOptimistic=function(e,t){return k.H.useOptimistic(e,t)},t.useReducer=function(e,t,n){return k.H.useReducer(e,t,n)},t.useRef=function(e){return k.H.useRef(e)},t.useState=function(e){return k.H.useState(e)},t.useSyncExternalStore=function(e,t,n){return k.H.useSyncExternalStore(e,t,n)},t.useTransition=function(){return k.H.useTransition()},t.version="19.1.0"},2118:(e,t,n)=>{"use strict";n.d(t,{A:()=>L});var r=n(9950),o=n(4752),a=n(9037),i=n(9610);const s=[{code:"MY",name:"Malaysia",dialCode:"+60",flag:"\ud83c\uddf2\ud83c\uddfe",minLength:9,maxLength:10},{code:"SG",name:"Singapore",dialCode:"+65",flag:"\ud83c\uddf8\ud83c\uddec",minLength:8,maxLength:8},{code:"TH",name:"Thailand",dialCode:"+66",flag:"\ud83c\uddf9\ud83c\udded",minLength:9,maxLength:9},{code:"KR",name:"South Korea",dialCode:"+82",flag:"\ud83c\uddf0\ud83c\uddf7",minLength:10,maxLength:11},{code:"ID",name:"Indonesia",dialCode:"+62",flag:"\ud83c\uddee\ud83c\udde9",minLength:9,maxLength:12},{code:"PH",name:"Philippines",dialCode:"+63",flag:"\ud83c\uddf5\ud83c\udded",minLength:10,maxLength:10},{code:"VN",name:"Vietnam",dialCode:"+84",flag:"\ud83c\uddfb\ud83c\uddf3",minLength:9,maxLength:10}],l=e=>s.find(t=>t.code===e)||s[0],c=function(e){if(!e)return"";const t=l(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY"),n=t.dialCode.replace("+","");let r=e.replace(/\D/g,"");return r.startsWith(n)?"+"+r:(r.startsWith("0")&&(r=r.substring(1)),t.dialCode+r)},d=function(e){const t=l(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY"),n=e.replace(/\D/g,""),r=t.maxLength;return n.substring(0,r)},u=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY";if(!e)return"Phone number is required";const n=l(t),r=c(e,t).replace(n.dialCode,"");return r.length<n.minLength?`Phone number must be at least ${n.minLength} digits`:r.length>n.maxLength?`Phone number must be at most ${n.maxLength} digits`:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MY";if(!e)return!1;const n=l(t),r=c(e,t).replace(n.dialCode,"");return r.length>=n.minLength&&r.length<=n.maxLength}(e,t)?null:"Please enter a valid phone number"};var p=n(4414);const f=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,h=o.Ay.div`
  position: relative;
  display: flex;
  align-items: center;
`,m=o.Ay.input`
  width: 100%;
  padding: 12px 16px 12px 80px;
  border: 2px solid ${e=>e.hasError?"#EF4444":"#E5E7EB"};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  min-height: 44px;
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
`,g=o.Ay.div`
  font-size: 12px;
  color: #EF4444;
  margin-top: 4px;
`,x=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,y=o.Ay.button`
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
`,b=o.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 280px;
  z-index: 1000;
  min-width: 260px;
  display: flex;
  flex-direction: column;
`,v=o.Ay.div`
  padding: 8px;
  border-bottom: 1px solid #E5E7EB;
`,w=o.Ay.input`
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
`,k=o.Ay.div`
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
`,S=o.Ay.div`
  padding: 20px;
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,j=o.Ay.button`
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
`,C=o.Ay.span`
  font-size: 18px;
`,E=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,A=o.Ay.div`
  font-weight: 500;
  color: #1F2937;
`,F=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,_=e=>{let{value:t,onChange:n,placeholder:o="123456789",required:a=!1,disabled:i=!1,autoFocus:_=!1,onBlur:P,defaultCountry:z="MY"}=e;const[R,O]=(0,r.useState)(""),[T,B]=(0,r.useState)(!1),[I,N]=(0,r.useState)(null),[D,L]=(0,r.useState)(l(z)),[$,M]=(0,r.useState)(!1),[q,H]=(0,r.useState)(""),U=(0,r.useRef)(null),W=(0,r.useRef)(null);(0,r.useEffect)(()=>{if(t){const e=t.replace(D.dialCode,"");O(d(e,D.code))}else O("")},[t,D]),(0,r.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&(M(!1),H(""))};return $&&(document.addEventListener("mousedown",e),setTimeout(()=>{var e;null===(e=W.current)||void 0===e||e.focus()},100)),()=>{document.removeEventListener("mousedown",e)}},[$]);const G=s.filter(e=>{const t=q.toLowerCase();return e.name.toLowerCase().includes(t)||e.code.toLowerCase().includes(t)||e.dialCode.includes(t)});return(0,p.jsxs)(f,{children:[(0,p.jsxs)(h,{ref:U,children:[(0,p.jsxs)(y,{type:"button",onClick:()=>M(!$),disabled:i,children:[(0,p.jsx)(C,{children:D.flag}),(0,p.jsx)("span",{children:D.dialCode})]}),$&&(0,p.jsxs)(b,{children:[(0,p.jsx)(v,{children:(0,p.jsx)(w,{ref:W,type:"text",placeholder:"Search country...",value:q,onChange:e=>H(e.target.value),onClick:e=>e.stopPropagation()})}),(0,p.jsx)(k,{children:G.length>0?G.map(e=>(0,p.jsxs)(j,{type:"button",onClick:()=>(e=>{if(L(e),M(!1),H(""),R){const t=R.replace(/\D/g,""),r=c(t,e.code);n(r)}})(e),children:[(0,p.jsx)(C,{children:e.flag}),(0,p.jsxs)(E,{children:[(0,p.jsx)(A,{children:e.name}),(0,p.jsx)(F,{children:e.dialCode})]})]},e.code)):(0,p.jsx)(S,{children:"No countries found"})})]}),(0,p.jsx)(m,{type:"tel",value:R,onChange:e=>{const t=e.target.value,r=d(t,D.code);O(r);const o=t.replace(/\D/g,""),a=o?c(o,D.code):"";n(a),I&&N(null)},onBlur:()=>{if(B(!1),t&&a){const e=u(t,D.code);N(e)}P&&P()},onFocus:()=>{B(!0),N(null)},placeholder:o,disabled:i,autoFocus:_,hasError:!!I,inputMode:"numeric"})]}),I&&(0,p.jsx)(g,{children:I}),!I&&!T&&!t&&(0,p.jsxs)(x,{children:[D.name," phone number (",D.minLength,"-",D.maxLength," digits)"]})]})},P=o.Ay.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 20px;
`,z=o.Ay.button`
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
`,R=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,O=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`,T=o.Ay.input`
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,B=o.Ay.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`,I=o.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,N=o.Ay.div`
  min-height: ${e=>e.show?"auto":"0"};
  max-height: ${e=>e.show?"200px":"0"};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  opacity: ${e=>e.show?"1":"0"};
`,D=o.Ay.div`
  padding: 12px;
  background: #FEE2E2;
  border: 1px solid #EF4444;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  line-height: 1.5;
`,L=()=>{const{showCustomerModal:e,setShowCustomerModal:t,setGuestInfo:n,loginCustomer:o,registerCustomer:s,customerModalMode:l}=(0,a.c)(),[c,d]=(0,r.useState)("login"),[u,f]=(0,r.useState)({name:"",phone:""}),[h,m]=(0,r.useState)({phone:"",password:""}),[g,x]=(0,r.useState)({name:"",phone:"",email:"",password:""}),[y,b]=(0,r.useState)(""),[v,w]=(0,r.useState)(""),[k,S]=(0,r.useState)(!1);(0,r.useEffect)(()=>{e||(d("login"),f({name:"",phone:""}),m({phone:"",password:""}),x({name:"",phone:"",email:"",password:""}),b(""),w(""),S(!1))},[e]);const j=()=>{t(!1)},C=()=>{u.name&&u.phone&&(n({name:u.name,phone:u.phone}),j())},E=async()=>{if(h.phone){b(""),S(!0);try{await o(h.phone,h.password)?j():b("Login failed. Please check your phone number and password.")}catch(e){b(e.message||"Login failed. Please try again.")}finally{S(!1)}}else b("Phone number is required")},A=async()=>{if(g.name&&g.phone)if(!g.password||g.password.length<6)w("Password must be at least 6 characters");else{w(""),S(!0);try{await s(g),j()}catch(e){w(e.message||"Registration failed. Please try again.")}finally{S(!1)}}else w("Name and phone number are required")};return(0,p.jsxs)(i.aF,{isOpen:e,onClose:j,title:"guest"===l?"Guest Order":"register"===l?"Add New Customer":"login"===c?"Member Login":"Create Account",footer:"guest"===l?(0,p.jsxs)(B,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(i.yl,{variant:"secondary",onClick:j,children:"Cancel"}),(0,p.jsx)(i.yl,{variant:"primary",disabled:!u.name||!u.phone,onClick:C,children:"Continue"})]}),(0,p.jsx)(N,{show:!1})]}):"register"===l?(0,p.jsxs)(B,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(i.yl,{variant:"secondary",onClick:j,children:"Cancel"}),(0,p.jsx)(i.yl,{variant:"primary",disabled:!g.name||!g.phone||k,onClick:A,children:k?"Adding...":"Add Customer"})]}),(0,p.jsx)(N,{show:!!v,children:v&&(0,p.jsx)(D,{children:v})})]}):"member"===l?"login"===c?(0,p.jsxs)(B,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(i.yl,{variant:"secondary",onClick:j,children:"Cancel"}),(0,p.jsx)(i.yl,{variant:"primary",disabled:!h.phone||k,onClick:E,children:k?"Logging in...":"Login"})]}),(0,p.jsx)(N,{show:!!y,children:y&&(0,p.jsx)(D,{children:y})})]}):(0,p.jsxs)(B,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(i.yl,{variant:"secondary",onClick:j,children:"Cancel"}),(0,p.jsx)(i.yl,{variant:"primary",disabled:!g.name||!g.phone||k,onClick:A,children:k?"Creating...":"Create Account"})]}),(0,p.jsx)(N,{show:!!v,children:v&&(0,p.jsx)(D,{children:v})})]}):null,children:["guest"===l&&(0,p.jsxs)(R,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Your Name *"}),(0,p.jsx)(T,{type:"text",placeholder:"Enter your name",value:u.name,onChange:e=>f({...u,name:e.target.value})})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Phone Number *"}),(0,p.jsx)(_,{value:u.phone,onChange:e=>f({...u,phone:e}),required:!0})]})]}),"register"===l&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Full Name *"}),(0,p.jsx)(T,{type:"text",placeholder:"Enter customer's full name",value:g.name,onChange:e=>{x({...g,name:e.target.value}),w("")},disabled:k})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Phone Number *"}),(0,p.jsx)(_,{value:g.phone,onChange:e=>{x({...g,phone:e}),w("")},required:!0,disabled:k})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Email Address"}),(0,p.jsx)(T,{type:"email",placeholder:"Enter email (optional)",value:g.email,onChange:e=>{x({...g,email:e.target.value}),w("")},disabled:k})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Password *"}),(0,p.jsx)(T,{type:"password",placeholder:"Create a password (min 6 characters)",value:g.password,onChange:e=>{x({...g,password:e.target.value}),w("")},disabled:k})]})]}),"member"===l&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(P,{children:[(0,p.jsx)(z,{active:"login"===c,onClick:()=>d("login"),children:"Login"}),(0,p.jsx)(z,{active:"register"===c,onClick:()=>d("register"),children:"Sign Up"})]}),"login"===c&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Phone Number *"}),(0,p.jsx)(_,{value:h.phone,onChange:e=>{m({...h,phone:e}),b("")},required:!0,disabled:k})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Password *"}),(0,p.jsx)(T,{type:"password",placeholder:"Enter your password",value:h.password,onChange:e=>{m({...h,password:e.target.value}),b("")},disabled:k})]})]}),"register"===c&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Full Name *"}),(0,p.jsx)(T,{type:"text",placeholder:"Enter your full name",value:g.name,onChange:e=>{x({...g,name:e.target.value}),w("")},disabled:k})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Phone Number *"}),(0,p.jsx)(_,{value:g.phone,onChange:e=>{x({...g,phone:e}),w("")},required:!0,disabled:k})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Email Address"}),(0,p.jsx)(T,{type:"email",placeholder:"Enter your email (optional)",value:g.email,onChange:e=>{x({...g,email:e.target.value}),w("")},disabled:k})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.lR,{children:"Password *"}),(0,p.jsx)(T,{type:"password",placeholder:"Create a password (min 6 characters)",value:g.password,onChange:e=>{x({...g,password:e.target.value}),w("")},disabled:k})]})]})]})]})}},3832:(e,t,n)=>{"use strict";n.d(t,{$n:()=>c,UC:()=>l,Y9:()=>a,ex:()=>s,hE:()=>i,mc:()=>o});var r=n(4752);const o=r.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,a=r.Ay.div`
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
`,i=r.Ay.h1`
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
`,c=r.Ay.button`
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
`},3916:(e,t)=>{"use strict";var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function o(e,t,r){var o=null;if(void 0!==r&&(o=""+r),void 0!==t.key&&(o=""+t.key),"key"in t)for(var a in r={},t)"key"!==a&&(r[a]=t[a]);else r=t;return t=r.ref,{$$typeof:n,type:e,key:o,ref:void 0!==t?t:null,props:r}}t.Fragment=r,t.jsx=o,t.jsxs=o},4414:(e,t,n)=>{"use strict";e.exports=n(3916)},4492:(e,t,n)=>{"use strict";n.d(t,{BV:()=>we,C5:()=>ye,Kd:()=>rt,N_:()=>at,Zp:()=>ne,g:()=>re,ok:()=>ct,qh:()=>be,zy:()=>Z});var r=n(9950),o=(n(4599),"popstate");function a(){return p(function(e,t){let{pathname:n,search:r,hash:o}=e.location;return c("",{pathname:n,search:r,hash:o},t.state&&t.state.usr||null,t.state&&t.state.key||"default")},function(e,t){return"string"===typeof t?t:d(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function i(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function s(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function l(e,t){return{usr:e.state,key:e.key,idx:t}}function c(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?u(t):t,state:n,key:t&&t.key||r||Math.random().toString(36).substring(2,10)}}function d(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function u(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function p(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:i=!1}=r,s=a.history,d="POP",u=null,p=h();function h(){return(s.state||{idx:null}).idx}function m(){d="POP";let e=h(),t=null==e?null:e-p;p=e,u&&u({action:d,location:x.location,delta:t})}function g(e){return f(e)}null==p&&(p=0,s.replaceState({...s.state,idx:p},""));let x={get action(){return d},get location(){return e(a,s)},listen(e){if(u)throw new Error("A history only accepts one active listener");return a.addEventListener(o,m),u=e,()=>{a.removeEventListener(o,m),u=null}},createHref:e=>t(a,e),createURL:g,encodeLocation(e){let t=g(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){d="PUSH";let r=c(x.location,e,t);n&&n(r,e),p=h()+1;let o=l(r,p),f=x.createHref(r);try{s.pushState(o,"",f)}catch(m){if(m instanceof DOMException&&"DataCloneError"===m.name)throw m;a.location.assign(f)}i&&u&&u({action:d,location:x.location,delta:1})},replace:function(e,t){d="REPLACE";let r=c(x.location,e,t);n&&n(r,e),p=h();let o=l(r,p),a=x.createHref(r);s.replaceState(o,"",a),i&&u&&u({action:d,location:x.location,delta:0})},go:e=>s.go(e)};return x}function f(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="http://localhost";"undefined"!==typeof window&&(n="null"!==window.location.origin?window.location.origin:window.location.href),i(n,"No window.location.(origin|href) available to create URL");let r="string"===typeof e?e:d(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}new WeakMap;function h(e,t){return m(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function m(e,t,n,r){let o=P(("string"===typeof t?u(t):t).pathname||"/",n);if(null==o)return null;let a=g(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n]);return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(a);let i=null;for(let s=0;null==i&&s<a.length;++s){let e=_(o);i=E(a[s],e,r)}return i}function g(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=(e,o,a)=>{let s={relativePath:void 0===a?e.path||"":a,caseSensitive:!0===e.caseSensitive,childrenIndex:o,route:e};s.relativePath.startsWith("/")&&(i(s.relativePath.startsWith(r),`Absolute route path "${s.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),s.relativePath=s.relativePath.slice(r.length));let l=B([r,s.relativePath]),c=n.concat(s);e.children&&e.children.length>0&&(i(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),g(e.children,t,c,l)),(null!=e.path||e.index)&&t.push({path:l,score:C(l,e.index),routesMeta:c})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let n of x(e.path))o(e,t,n);else o(e,t)}),t}function x(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,o=n.endsWith("?"),a=n.replace(/\?$/,"");if(0===r.length)return o?[a,""]:[a];let i=x(r.join("/")),s=[];return s.push(...i.map(e=>""===e?a:[a,e].join("/"))),o&&s.push(...i),s.map(t=>e.startsWith("/")&&""===t?"/":t)}var y=/^:[\w-]+$/,b=3,v=2,w=1,k=10,S=-2,j=e=>"*"===e;function C(e,t){let n=e.split("/"),r=n.length;return n.some(j)&&(r+=S),t&&(r+=v),n.filter(e=>!j(e)).reduce((e,t)=>e+(y.test(t)?b:""===t?w:k),r)}function E(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:r}=e,o={},a="/",i=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,c="/"===a?t:t.slice(a.length)||"/",d=A({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),u=e.route;if(!d&&l&&n&&!r[r.length-1].route.index&&(d=A({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!d)return null;Object.assign(o,d.params),i.push({params:o,pathname:B([a,d.pathname]),pathnameBase:I(B([a,d.pathnameBase])),route:u}),"/"!==d.pathnameBase&&(a=B([a,d.pathnameBase]))}return i}function A(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=F(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let a=o[0],i=a.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:o}=t;if("*"===r){let e=s[n]||"";i=a.slice(0,a.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=o&&!l?void 0:(l||"").replace(/%2F/g,"/"),e},{}),pathname:a,pathnameBase:i,pattern:e}}function F(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];s("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:null!=n}),n?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":""!==e&&"/"!==e&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function _(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return s(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function P(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}function z(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function R(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function O(e){let t=R(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function T(e,t,n){let r,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?r=u(e):(r={...e},i(!r.pathname||!r.pathname.includes("?"),z("?","pathname","search",r)),i(!r.pathname||!r.pathname.includes("#"),z("#","pathname","hash",r)),i(!r.search||!r.search.includes("#"),z("#","search","hash",r)));let a,s=""===e||""===r.pathname,l=s?"/":r.pathname;if(null==l)a=n;else{let e=t.length-1;if(!o&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;r.pathname=t.join("/")}a=e>=0?t[e]:"/"}let c=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:n,search:r="",hash:o=""}="string"===typeof e?u(e):e,a=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)}),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:a,search:N(r),hash:D(o)}}(r,a),d=l&&"/"!==l&&l.endsWith("/"),p=(s||"."===l)&&n.endsWith("/");return c.pathname.endsWith("/")||!d&&!p||(c.pathname+="/"),c}var B=e=>e.join("/").replace(/\/\/+/g,"/"),I=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),N=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",D=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";function L(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}var $=["POST","PUT","PATCH","DELETE"],M=(new Set($),["GET",...$]);new Set(M),Symbol("ResetLoaderData");var q=r.createContext(null);q.displayName="DataRouter";var H=r.createContext(null);H.displayName="DataRouterState";var U=r.createContext({isTransitioning:!1});U.displayName="ViewTransition";var W=r.createContext(new Map);W.displayName="Fetchers";var G=r.createContext(null);G.displayName="Await";var V=r.createContext(null);V.displayName="Navigation";var Y=r.createContext(null);Y.displayName="Location";var Q=r.createContext({outlet:null,matches:[],isDataRoute:!1});Q.displayName="Route";var K=r.createContext(null);K.displayName="RouteError";var J=!0;function X(){return null!=r.useContext(Y)}function Z(){return i(X(),"useLocation() may be used only in the context of a <Router> component."),r.useContext(Y).location}var ee="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function te(e){r.useContext(V).static||r.useLayoutEffect(e)}function ne(){let{isDataRoute:e}=r.useContext(Q);return e?function(){let{router:e}=pe("useNavigate"),t=he("useNavigate"),n=r.useRef(!1);te(()=>{n.current=!0});let o=r.useCallback(async function(r){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(n.current,ee),n.current&&("number"===typeof r?e.navigate(r):await e.navigate(r,{fromRouteId:t,...o}))},[e,t]);return o}():function(){i(X(),"useNavigate() may be used only in the context of a <Router> component.");let e=r.useContext(q),{basename:t,navigator:n}=r.useContext(V),{matches:o}=r.useContext(Q),{pathname:a}=Z(),l=JSON.stringify(O(o)),c=r.useRef(!1);te(()=>{c.current=!0});let d=r.useCallback(function(r){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(s(c.current,ee),!c.current)return;if("number"===typeof r)return void n.go(r);let i=T(r,JSON.parse(l),a,"path"===o.relative);null==e&&"/"!==t&&(i.pathname="/"===i.pathname?t:B([t,i.pathname])),(o.replace?n.replace:n.push)(i,o.state,o)},[t,n,l,a,e]);return d}()}r.createContext(null);function re(){let{matches:e}=r.useContext(Q),t=e[e.length-1];return t?t.params:{}}function oe(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:n}=r.useContext(Q),{pathname:o}=Z(),a=JSON.stringify(O(n));return r.useMemo(()=>T(e,JSON.parse(a),o,"path"===t),[e,a,o,t])}function ae(e,t,n,o){i(X(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=r.useContext(V),{matches:l}=r.useContext(Q),c=l[l.length-1],d=c?c.params:{},p=c?c.pathname:"/",f=c?c.pathnameBase:"/",m=c&&c.route;if(J){let e=m&&m.path||"";xe(p,!m||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let g,x=Z();if(t){let e="string"===typeof t?u(t):t;i("/"===f||e.pathname?.startsWith(f),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${e.pathname}" was given in the \`location\` prop.`),g=e}else g=x;let y=g.pathname||"/",b=y;if("/"!==f){let e=f.replace(/^\//,"").split("/");b="/"+y.replace(/^\//,"").split("/").slice(e.length).join("/")}let v=h(e,{pathname:b});J&&(s(m||null!=v,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),s(null==v||void 0!==v[v.length-1].route.element||void 0!==v[v.length-1].route.Component||void 0!==v[v.length-1].route.lazy,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`));let w=de(v&&v.map(e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:B([f,a.encodeLocation?a.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?f:B([f,a.encodeLocation?a.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),l,n,o);return t&&w?r.createElement(Y.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},w):w}function ie(){let e=me(),t=L(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:o},i={padding:"2px 4px",backgroundColor:o},s=null;return J&&(console.error("Error handled by React Router default ErrorBoundary:",e),s=r.createElement(r.Fragment,null,r.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),r.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",r.createElement("code",{style:i},"ErrorBoundary")," or"," ",r.createElement("code",{style:i},"errorElement")," prop on your route."))),r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:a},n):null,s)}var se=r.createElement(ie,null),le=class extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?r.createElement(Q.Provider,{value:this.props.routeContext},r.createElement(K.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function ce(e){let{routeContext:t,match:n,children:o}=e,a=r.useContext(q);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(Q.Provider,{value:t},o)}function de(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(null==e){if(!n)return null;if(n.errors)e=n.matches;else{if(0!==t.length||n.initialized||!(n.matches.length>0))return null;e=n.matches}}let o=e,a=n?.errors;if(null!=a){let e=o.findIndex(e=>e.route.id&&void 0!==a?.[e.route.id]);i(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),o=o.slice(0,Math.min(o.length,e+1))}let s=!1,l=-1;if(n)for(let r=0;r<o.length;r++){let e=o[r];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(l=r),e.route.id){let{loaderData:t,errors:r}=n,a=e.route.loader&&!t.hasOwnProperty(e.route.id)&&(!r||void 0===r[e.route.id]);if(e.route.lazy||a){s=!0,o=l>=0?o.slice(0,l+1):[o[0]];break}}}return o.reduceRight((e,i,c)=>{let d,u=!1,p=null,f=null;n&&(d=a&&i.route.id?a[i.route.id]:void 0,p=i.route.errorElement||se,s&&(l<0&&0===c?(xe("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),u=!0,f=null):l===c&&(u=!0,f=i.route.hydrateFallbackElement||null)));let h=t.concat(o.slice(0,c+1)),m=()=>{let t;return t=d?p:u?f:i.route.Component?r.createElement(i.route.Component,null):i.route.element?i.route.element:e,r.createElement(ce,{match:i,routeContext:{outlet:e,matches:h,isDataRoute:null!=n},children:t})};return n&&(i.route.ErrorBoundary||i.route.errorElement||0===c)?r.createElement(le,{location:n.location,revalidation:n.revalidation,component:p,error:d,children:m(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):m()},null)}function ue(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function pe(e){let t=r.useContext(q);return i(t,ue(e)),t}function fe(e){let t=r.useContext(H);return i(t,ue(e)),t}function he(e){let t=function(e){let t=r.useContext(Q);return i(t,ue(e)),t}(e),n=t.matches[t.matches.length-1];return i(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function me(){let e=r.useContext(K),t=fe("useRouteError"),n=he("useRouteError");return void 0!==e?e:t.errors?.[n]}var ge={};function xe(e,t,n){t||ge[e]||(ge[e]=!0,s(!1,n))}r.memo(function(e){let{routes:t,future:n,state:r}=e;return ae(t,void 0,r,n)});function ye(e){let{to:t,replace:n,state:o,relative:a}=e;i(X(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=r.useContext(V);s(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:c}=r.useContext(Q),{pathname:d}=Z(),u=ne(),p=T(t,O(c),d,"path"===a),f=JSON.stringify(p);return r.useEffect(()=>{u(JSON.parse(f),{replace:n,state:o,relative:a})},[u,f,a,n,o]),null}function be(e){i(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function ve(e){let{basename:t="/",children:n=null,location:o,navigationType:a="POP",navigator:l,static:c=!1}=e;i(!X(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=t.replace(/^\/*/,"/"),p=r.useMemo(()=>({basename:d,navigator:l,static:c,future:{}}),[d,l,c]);"string"===typeof o&&(o=u(o));let{pathname:f="/",search:h="",hash:m="",state:g=null,key:x="default"}=o,y=r.useMemo(()=>{let e=P(f,d);return null==e?null:{location:{pathname:e,search:h,hash:m,state:g,key:x},navigationType:a}},[d,f,h,m,g,x,a]);return s(null!=y,`<Router basename="${d}"> is not able to match the URL "${f}${h}${m}" because it does not start with the basename, so the <Router> won't render anything.`),null==y?null:r.createElement(V.Provider,{value:p},r.createElement(Y.Provider,{children:n,value:y}))}function we(e){let{children:t,location:n}=e;return ae(ke(t),n)}r.Component;function ke(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[];return r.Children.forEach(e,(e,o)=>{if(!r.isValidElement(e))return;let a=[...t,o];if(e.type===r.Fragment)return void n.push.apply(n,ke(e.props.children,a));i(e.type===be,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),i(!e.props.index||!e.props.children,"An index route cannot have child routes.");let s={id:e.props.id||a.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(s.children=ke(e.props.children,a)),n.push(s)}),n}var Se="get",je="application/x-www-form-urlencoded";function Ce(e){return null!=e&&"string"===typeof e.tagName}function Ee(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}var Ae=null;var Fe=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function _e(e){return null==e||Fe.has(e)?e:(s(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${je}"`),null)}function Pe(e,t){let n,r,o,a,i;if(Ce(s=e)&&"form"===s.tagName.toLowerCase()){let i=e.getAttribute("action");r=i?P(i,t):null,n=e.getAttribute("method")||Se,o=_e(e.getAttribute("enctype"))||je,a=new FormData(e)}else if(function(e){return Ce(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Ce(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let i=e.form;if(null==i)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||i.getAttribute("action");if(r=s?P(s,t):null,n=e.getAttribute("formmethod")||i.getAttribute("method")||Se,o=_e(e.getAttribute("formenctype"))||_e(i.getAttribute("enctype"))||je,a=new FormData(i,e),!function(){if(null===Ae)try{new FormData(document.createElement("form"),0),Ae=!1}catch(e){Ae=!0}return Ae}()){let{name:t,type:n,value:r}=e;if("image"===n){let e=t?`${t}.`:"";a.append(`${e}x`,"0"),a.append(`${e}y`,"0")}else t&&a.append(t,r)}}else{if(Ce(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Se,r=null,o=je,i=e}var s;return a&&"text/plain"===o&&(i=a,a=void 0),{action:r,method:n.toLowerCase(),encType:o,formData:a,body:i}}function ze(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}async function Re(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Oe(e){return null!=e&&"string"===typeof e.page}function Te(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Be(e,t,n,r,o,a){let i=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith("*")&&n[t].params["*"]!==e.params["*"];return"assets"===a?t.filter((e,t)=>i(e,t)||s(e,t)):"data"===a?t.filter((t,a)=>{let l=r.routes[t.route.id];if(!l||!l.hasLoader)return!1;if(i(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof r)return r}return!0}):[]}function Ie(e,t){let{includeHydrateFallback:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r=e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let o=[r.module];return r.clientActionModule&&(o=o.concat(r.clientActionModule)),r.clientLoaderModule&&(o=o.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(o=o.concat(r.hydrateFallbackModule)),r.imports&&(o=o.concat(r.imports)),o}).flat(1),[...new Set(r)];var r}function Ne(e,t){let n=new Set,r=new Set(t);return e.reduce((e,o)=>{if(t&&!Oe(o)&&"script"===o.as&&o.href&&r.has(o.href))return e;let a=JSON.stringify(function(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}(o));return n.has(a)||(n.add(a),e.push({key:a,link:o})),e},[])}function De(e){return{__html:e}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;Symbol("SingleFetchRedirect");var Le=new Set([100,101,204,205]);function $e(e,t){let n="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return"/"===n.pathname?n.pathname="_root.data":t&&"/"===P(n.pathname,t)?n.pathname=`${t.replace(/\/$/,"")}/_root.data`:n.pathname=`${n.pathname.replace(/\/$/,"")}.data`,n}r.Component;function Me(e){let{error:t,isOutsideRemixApp:n}=e;console.error(t);let o,a=r.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(L(t))return r.createElement(qe,{title:"Unhandled Thrown Response!"},r.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),J?a:null);if(t instanceof Error)o=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);o=new Error(e)}return r.createElement(qe,{title:"Application Error!",isOutsideRemixApp:n},r.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),r.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},o.stack),a)}function qe(e){let{title:t,renderScripts:n,isOutsideRemixApp:o,children:a}=e,{routeModules:i}=Ve();return i.root?.Layout&&!o?a:r.createElement("html",{lang:"en"},r.createElement("head",null,r.createElement("meta",{charSet:"utf-8"}),r.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),r.createElement("title",null,t)),r.createElement("body",null,r.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},a,n?r.createElement(et,null):null)))}function He(e,t){return"lazy"===e.mode&&!0===t}function Ue(){let e=r.useContext(q);return ze(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function We(){let e=r.useContext(H);return ze(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Ge=r.createContext(void 0);function Ve(){let e=r.useContext(Ge);return ze(e,"You must render this element inside a <HydratedRouter> element"),e}function Ye(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Qe(e,t,n){if(n&&!Ze)return[e[0]];if(t){let n=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,n+1)}return e}function Ke(e){let{page:t,...n}=e,{router:o}=Ue(),a=r.useMemo(()=>h(o.routes,t,o.basename),[o.routes,t,o.basename]);return a?r.createElement(Xe,{page:t,matches:a,...n}):null}function Je(e){let{manifest:t,routeModules:n}=Ve(),[o,a]=r.useState([]);return r.useEffect(()=>{let r=!1;return async function(e,t,n){return Ne((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Re(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Te).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,n).then(e=>{r||a(e)}),()=>{r=!0}},[e,t,n]),o}function Xe(e){let{page:t,matches:n,...o}=e,a=Z(),{manifest:i,routeModules:s}=Ve(),{basename:l}=Ue(),{loaderData:c,matches:d}=We(),u=r.useMemo(()=>Be(t,n,d,i,a,"data"),[t,n,d,i,a]),p=r.useMemo(()=>Be(t,n,d,i,a,"assets"),[t,n,d,i,a]),f=r.useMemo(()=>{if(t===a.pathname+a.search+a.hash)return[];let e=new Set,r=!1;if(n.forEach(t=>{let n=i.routes[t.route.id];n&&n.hasLoader&&(!u.some(e=>e.route.id===t.route.id)&&t.route.id in c&&s[t.route.id]?.shouldRevalidate||n.hasClientLoader?r=!0:e.add(t.route.id))}),0===e.size)return[];let o=$e(t,l);return r&&e.size>0&&o.searchParams.set("_routes",n.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[o.pathname+o.search]},[l,c,a,i,u,n,t,s]),h=r.useMemo(()=>Ie(p,i),[p,i]),m=Je(p);return r.createElement(r.Fragment,null,f.map(e=>r.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...o})),h.map(e=>r.createElement("link",{key:e,rel:"modulepreload",href:e,...o})),m.map(e=>{let{key:t,link:n}=e;return r.createElement("link",{key:t,...n})}))}Ge.displayName="FrameworkContext";var Ze=!1;function et(e){let{manifest:t,serverHandoffString:n,isSpaMode:o,renderMeta:a,routeDiscovery:i,ssr:s}=Ve(),{router:l,static:c,staticContext:d}=Ue(),{matches:u}=We(),p=He(i,s);a&&(a.didRenderScripts=!0);let f=Qe(u,null,o);r.useEffect(()=>{Ze=!0},[]);let m=r.useMemo(()=>{let o=d?`window.__reactRouterContext = ${n};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",a=c?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${p?"":`import ${JSON.stringify(t.url)}`};\n${f.map((e,n)=>{let r=`route${n}`,o=t.routes[e.route.id];ze(o,`Route ${e.route.id} not found in manifest`);let{clientActionModule:a,clientLoaderModule:i,clientMiddlewareModule:s,hydrateFallbackModule:l,module:c}=o,d=[...a?[{module:a,varName:`${r}_clientAction`}]:[],...i?[{module:i,varName:`${r}_clientLoader`}]:[],...s?[{module:s,varName:`${r}_clientMiddleware`}]:[],...l?[{module:l,varName:`${r}_HydrateFallback`}]:[],{module:c,varName:`${r}_main`}];return 1===d.length?`import * as ${r} from ${JSON.stringify(c)};`:[d.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${r} = {${d.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${p?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:n,...r}=e,o=new Set(t.state.matches.map(e=>e.route.id)),a=t.state.location.pathname.split("/").filter(Boolean),i=["/"];for(a.pop();a.length>0;)i.push(`/${a.join("/")}`),a.pop();i.forEach(e=>{let n=h(t.routes,e,t.basename);n&&n.forEach(e=>o.add(e.route.id))});let s=[...o].reduce((e,t)=>Object.assign(e,{[t]:r.routes[t]}),{});return{...r,routes:s,sri:!!n||void 0}}(t,l),null,2)};`:""}\n  window.__reactRouterRouteModules = {${f.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return r.createElement(r.Fragment,null,r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:De(o),type:void 0}),r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:De(a),type:"module",async:!0}))},[]),g=Ze?[]:(x=t.entry.imports.concat(Ie(f,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let y="object"===typeof t.sri?t.sri:{};return Ze?null:r.createElement(r.Fragment,null,"object"===typeof t.sri?r.createElement("script",{"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:y})}}):null,p?null:r.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:y[t.url],suppressHydrationWarning:!0}),r.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:y[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>r.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:y[t],suppressHydrationWarning:!0})),m)}function tt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}var nt="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{nt&&(window.__reactRouterVersion="7.6.3")}catch(ft){}function rt(e){let{basename:t,children:n,window:o}=e,i=r.useRef();null==i.current&&(i.current=a({window:o,v5Compat:!0}));let s=i.current,[l,c]=r.useState({action:s.action,location:s.location}),d=r.useCallback(e=>{r.startTransition(()=>c(e))},[c]);return r.useLayoutEffect(()=>s.listen(d),[s,d]),r.createElement(ve,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:s})}var ot=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,at=r.forwardRef(function(e,t){let n,{onClick:o,discover:a="render",prefetch:l="none",relative:c,reloadDocument:u,replace:p,state:f,target:h,to:m,preventScrollReset:g,viewTransition:x,...y}=e,{basename:b}=r.useContext(V),v="string"===typeof m&&ot.test(m),w=!1;if("string"===typeof m&&v&&(n=m,nt))try{let e=new URL(window.location.href),t=m.startsWith("//")?new URL(e.protocol+m):new URL(m),n=P(t.pathname,b);t.origin===e.origin&&null!=n?m=n+t.search+t.hash:w=!0}catch(ft){s(!1,`<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let k=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i(X(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:o}=r.useContext(V),{hash:a,pathname:s,search:l}=oe(e,{relative:t}),c=s;return"/"!==n&&(c="/"===s?n:B([n,s])),o.createHref({pathname:c,search:l,hash:a})}(m,{relative:c}),[S,j,C]=function(e,t){let n=r.useContext(Ge),[o,a]=r.useState(!1),[i,s]=r.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:d,onMouseLeave:u,onTouchStart:p}=t,f=r.useRef(null);r.useEffect(()=>{if("render"===e&&s(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{s(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),r.useEffect(()=>{if(o){let e=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(e)}}},[o]);let h=()=>{a(!0)},m=()=>{a(!1),s(!1)};return n?"intent"!==e?[i,f,{}]:[i,f,{onFocus:Ye(l,h),onBlur:Ye(c,m),onMouseEnter:Ye(d,h),onMouseLeave:Ye(u,m),onTouchStart:Ye(p,h)}]:[!1,f,{}]}(l,y),E=function(e){let{target:t,replace:n,state:o,preventScrollReset:a,relative:i,viewTransition:s}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=ne(),c=Z(),u=oe(e,{relative:i});return r.useCallback(r=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(r,t)){r.preventDefault();let t=void 0!==n?n:d(c)===d(u);l(e,{replace:t,state:o,preventScrollReset:a,relative:i,viewTransition:s})}},[c,l,u,n,o,t,e,a,i,s])}(m,{replace:p,state:f,target:h,preventScrollReset:g,relative:c,viewTransition:x});let A=r.createElement("a",{...y,...C,href:n||k,onClick:w||u?o:function(e){o&&o(e),e.defaultPrevented||E(e)},ref:tt(t,j),target:h,"data-discover":v||"render"!==a?void 0:"true"});return S&&!v?r.createElement(r.Fragment,null,A,r.createElement(Ke,{page:k})):A});at.displayName="Link",r.forwardRef(function(e,t){let{"aria-current":n="page",caseSensitive:o=!1,className:a="",end:s=!1,style:l,to:c,viewTransition:d,children:u,...p}=e,f=oe(c,{relative:p.relative}),h=Z(),m=r.useContext(H),{navigator:g,basename:x}=r.useContext(V),y=null!=m&&function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.useContext(U);i(null!=n,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:o}=lt("useViewTransitionState"),a=oe(e,{relative:t.relative});if(!n.isTransitioning)return!1;let s=P(n.currentLocation.pathname,o)||n.currentLocation.pathname,l=P(n.nextLocation.pathname,o)||n.nextLocation.pathname;return null!=A(a.pathname,l)||null!=A(a.pathname,s)}(f)&&!0===d,b=g.encodeLocation?g.encodeLocation(f).pathname:f.pathname,v=h.pathname,w=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;o||(v=v.toLowerCase(),w=w?w.toLowerCase():null,b=b.toLowerCase()),w&&x&&(w=P(w,x)||w);const k="/"!==b&&b.endsWith("/")?b.length-1:b.length;let S,j=v===b||!s&&v.startsWith(b)&&"/"===v.charAt(k),C=null!=w&&(w===b||!s&&w.startsWith(b)&&"/"===w.charAt(b.length)),E={isActive:j,isPending:C,isTransitioning:y},F=j?n:void 0;S="function"===typeof a?a(E):[a,j?"active":null,C?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let _="function"===typeof l?l(E):l;return r.createElement(at,{...p,"aria-current":F,className:S,ref:t,style:_,to:c,viewTransition:d},"function"===typeof u?u(E):u)}).displayName="NavLink";var it=r.forwardRef((e,t)=>{let{discover:n="render",fetcherKey:o,navigate:a,reloadDocument:s,replace:l,state:c,method:u=Se,action:p,onSubmit:f,relative:h,preventScrollReset:m,viewTransition:g,...x}=e,y=pt(),b=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:n}=r.useContext(V),o=r.useContext(Q);i(o,"useFormAction must be used inside a RouteContext");let[a]=o.matches.slice(-1),s={...oe(e||".",{relative:t})},l=Z();if(null==e){s.search=l.search;let e=new URLSearchParams(s.search),t=e.getAll("index");if(t.some(e=>""===e)){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let n=e.toString();s.search=n?`?${n}`:""}}e&&"."!==e||!a.route.index||(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index");"/"!==n&&(s.pathname="/"===s.pathname?n:B([n,s.pathname]));return d(s)}(p,{relative:h}),v="get"===u.toLowerCase()?"get":"post",w="string"===typeof p&&ot.test(p);return r.createElement("form",{ref:t,method:v,action:b,onSubmit:s?f:e=>{if(f&&f(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,n=t?.getAttribute("formmethod")||u;y(t||e.currentTarget,{fetcherKey:o,method:n,navigate:a,replace:l,state:c,relative:h,preventScrollReset:m,viewTransition:g})},...x,"data-discover":w||"render"!==n?void 0:"true"})});function st(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function lt(e){let t=r.useContext(q);return i(t,st(e)),t}function ct(e){s("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=r.useRef(Ee(e)),n=r.useRef(!1),o=Z(),a=r.useMemo(()=>function(e,t){let n=Ee(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}(o.search,n.current?null:t.current),[o.search]),i=ne(),l=r.useCallback((e,t)=>{const r=Ee("function"===typeof e?e(a):e);n.current=!0,i("?"+r,t)},[i,a]);return[a,l]}it.displayName="Form";var dt=0,ut=()=>`__${String(++dt)}__`;function pt(){let{router:e}=lt("useSubmit"),{basename:t}=r.useContext(V),n=he("useRouteId");return r.useCallback(async function(r){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:a,method:i,encType:s,formData:l,body:c}=Pe(r,t);if(!1===o.navigate){let t=o.fetcherKey||ut();await e.fetch(t,n,o.action||a,{preventScrollReset:o.preventScrollReset,formData:l,body:c,formMethod:o.method||i,formEncType:o.encType||s,flushSync:o.flushSync})}else await e.navigate(o.action||a,{preventScrollReset:o.preventScrollReset,formData:l,body:c,formMethod:o.method||i,formEncType:o.encType||s,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[e,t,n])}},4599:(e,t)=>{"use strict";const n=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,r=/^[\u0021-\u003A\u003C-\u007E]*$/,o=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,a=/^[\u0020-\u003A\u003D-\u007E]*$/,i=Object.prototype.toString,s=(()=>{const e=function(){};return e.prototype=Object.create(null),e})();function l(e,t,n){do{const n=e.charCodeAt(t);if(32!==n&&9!==n)return t}while(++t<n);return n}function c(e,t,n){for(;t>n;){const n=e.charCodeAt(--t);if(32!==n&&9!==n)return t+1}return n}function d(e){if(-1===e.indexOf("%"))return e;try{return decodeURIComponent(e)}catch(t){return e}}},4728:(e,t,n)=>{"use strict";n.d(t,{He:()=>i,Mo:()=>c,SC:()=>o,Wh:()=>a,r6:()=>s,yY:()=>l});var r=n(4752);const o=r.Ay.button`
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
`,a=r.Ay.span`
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
`,i=(r.Ay.div`
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
`,c=r.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 12px;
  width: 100%;
  box-sizing: border-box;

  ${e=>"success"===e.type?"\n    background: #ECFDF5;\n    color: #059669;\n    border: 1px solid #A7F3D0;\n  ":"\n    background: #FEE2E2;\n    color: #DC2626;\n    border: 1px solid #FECACA;\n  "}
`},4752:(e,t,n)=>{"use strict";n.d(t,{NP:()=>$t,DU:()=>Kt,AH:()=>Wt,Ay:()=>Yt,i7:()=>Jt});var r=function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.create;function o(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var a=n(9950),i=n(403),s=n.n(i),l="-ms-",c="-moz-",d="-webkit-",u="comm",p="rule",f="decl",h="@keyframes",m=Math.abs,g=String.fromCharCode,x=Object.assign;function y(e){return e.trim()}function b(e,t){return(e=t.exec(e))?e[0]:e}function v(e,t,n){return e.replace(t,n)}function w(e,t,n){return e.indexOf(t,n)}function k(e,t){return 0|e.charCodeAt(t)}function S(e,t,n){return e.slice(t,n)}function j(e){return e.length}function C(e){return e.length}function E(e,t){return t.push(e),e}function A(e,t){return e.filter(function(e){return!b(e,t)})}var F=1,_=1,P=0,z=0,R=0,O="";function T(e,t,n,r,o,a,i,s){return{value:e,root:t,parent:n,type:r,props:o,children:a,line:F,column:_,length:i,return:"",siblings:s}}function B(e,t){return x(T("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function I(e){for(;e.root;)e=B(e.root,{children:[e]});E(e,e.siblings)}function N(){return R=z>0?k(O,--z):0,_--,10===R&&(_=1,F--),R}function D(){return R=z<P?k(O,z++):0,_++,10===R&&(_=1,F++),R}function L(){return k(O,z)}function $(){return z}function M(e,t){return S(O,e,t)}function q(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function H(e){return F=_=1,P=j(O=e),z=0,[]}function U(e){return O="",e}function W(e){return y(M(z-1,Y(91===e?e+2:40===e?e+1:e)))}function G(e){for(;(R=L())&&R<33;)D();return q(e)>2||q(R)>3?"":" "}function V(e,t){for(;--t&&D()&&!(R<48||R>102||R>57&&R<65||R>70&&R<97););return M(e,$()+(t<6&&32==L()&&32==D()))}function Y(e){for(;D();)switch(R){case e:return z;case 34:case 39:34!==e&&39!==e&&Y(R);break;case 40:41===e&&Y(e);break;case 92:D()}return z}function Q(e,t){for(;D()&&e+R!==57&&(e+R!==84||47!==L()););return"/*"+M(t,z-1)+"*"+g(47===e?e:D())}function K(e){for(;!q(L());)D();return M(e,z)}function J(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function X(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case f:return e.return=e.return||e.value;case u:return"";case h:return e.return=e.value+"{"+J(e.children,r)+"}";case p:if(!j(e.value=e.props.join(",")))return""}return j(n=J(e.children,r))?e.return=e.value+"{"+n+"}":""}function Z(e,t,n){switch(function(e,t){return 45^k(e,0)?(((t<<2^k(e,0))<<2^k(e,1))<<2^k(e,2))<<2^k(e,3):0}(e,t)){case 5103:return d+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return d+e+e;case 4789:return c+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return d+e+c+e+l+e+e;case 5936:switch(k(e,t+11)){case 114:return d+e+l+v(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return d+e+l+v(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return d+e+l+v(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return d+e+l+e+e;case 6165:return d+e+l+"flex-"+e+e;case 5187:return d+e+v(e,/(\w+).+(:[^]+)/,d+"box-$1$2"+l+"flex-$1$2")+e;case 5443:return d+e+l+"flex-item-"+v(e,/flex-|-self/g,"")+(b(e,/flex-|baseline/)?"":l+"grid-row-"+v(e,/flex-|-self/g,""))+e;case 4675:return d+e+l+"flex-line-pack"+v(e,/align-content|flex-|-self/g,"")+e;case 5548:return d+e+l+v(e,"shrink","negative")+e;case 5292:return d+e+l+v(e,"basis","preferred-size")+e;case 6060:return d+"box-"+v(e,"-grow","")+d+e+l+v(e,"grow","positive")+e;case 4554:return d+v(e,/([^-])(transform)/g,"$1"+d+"$2")+e;case 6187:return v(v(v(e,/(zoom-|grab)/,d+"$1"),/(image-set)/,d+"$1"),e,"")+e;case 5495:case 3959:return v(e,/(image-set\([^]*)/,d+"$1$`$1");case 4968:return v(v(e,/(.+:)(flex-)?(.*)/,d+"box-pack:$3"+l+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+d+e+e;case 4200:if(!b(e,/flex-|baseline/))return l+"grid-column-align"+S(e,t)+e;break;case 2592:case 3360:return l+v(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,b(e.props,/grid-\w+-end/)})?~w(e+(n=n[t].value),"span",0)?e:l+v(e,"-start","")+e+l+"grid-row-span:"+(~w(n,"span",0)?b(n,/\d+/):+b(n,/\d+/)-+b(e,/\d+/))+";":l+v(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return b(e.props,/grid-\w+-start/)})?e:l+v(v(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return v(e,/(.+)-inline(.+)/,d+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(j(e)-1-t>6)switch(k(e,t+1)){case 109:if(45!==k(e,t+4))break;case 102:return v(e,/(.+:)(.+)-([^]+)/,"$1"+d+"$2-$3$1"+c+(108==k(e,t+3)?"$3":"$2-$3"))+e;case 115:return~w(e,"stretch",0)?Z(v(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return v(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,o,a,i,s){return l+n+":"+r+s+(o?l+n+"-span:"+(a?i:+i-+r)+s:"")+e});case 4949:if(121===k(e,t+6))return v(e,":",":"+d)+e;break;case 6444:switch(k(e,45===k(e,14)?18:11)){case 120:return v(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+d+(45===k(e,14)?"inline-":"")+"box$3$1"+d+"$2$3$1"+l+"$2box$3")+e;case 100:return v(e,":",":"+l)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return v(e,"scroll-","scroll-snap-")+e}return e}function ee(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case f:return void(e.return=Z(e.value,e.length,n));case h:return J([B(e,{value:v(e.value,"@","@"+d)})],r);case p:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(b(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":I(B(e,{props:[v(t,/:(read-\w+)/,":-moz-$1")]})),I(B(e,{props:[t]})),x(e,{props:A(n,r)});break;case"::placeholder":I(B(e,{props:[v(t,/:(plac\w+)/,":"+d+"input-$1")]})),I(B(e,{props:[v(t,/:(plac\w+)/,":-moz-$1")]})),I(B(e,{props:[v(t,/:(plac\w+)/,l+"input-$1")]})),I(B(e,{props:[t]})),x(e,{props:A(n,r)})}return""})}}function te(e){return U(ne("",null,null,null,[""],e=H(e),0,[0],e))}function ne(e,t,n,r,o,a,i,s,l){for(var c=0,d=0,u=i,p=0,f=0,h=0,x=1,y=1,b=1,S=0,C="",A=o,F=a,_=r,P=C;y;)switch(h=S,S=D()){case 40:if(108!=h&&58==k(P,u-1)){-1!=w(P+=v(W(S),"&","&\f"),"&\f",m(c?s[c-1]:0))&&(b=-1);break}case 34:case 39:case 91:P+=W(S);break;case 9:case 10:case 13:case 32:P+=G(h);break;case 92:P+=V($()-1,7);continue;case 47:switch(L()){case 42:case 47:E(oe(Q(D(),$()),t,n,l),l);break;default:P+="/"}break;case 123*x:s[c++]=j(P)*b;case 125*x:case 59:case 0:switch(S){case 0:case 125:y=0;case 59+d:-1==b&&(P=v(P,/\f/g,"")),f>0&&j(P)-u&&E(f>32?ae(P+";",r,n,u-1,l):ae(v(P," ","")+";",r,n,u-2,l),l);break;case 59:P+=";";default:if(E(_=re(P,t,n,c,d,o,s,C,A=[],F=[],u,a),a),123===S)if(0===d)ne(P,t,_,_,A,a,u,s,F);else switch(99===p&&110===k(P,3)?100:p){case 100:case 108:case 109:case 115:ne(e,_,_,r&&E(re(e,_,_,0,0,o,s,C,o,A=[],u,F),F),o,F,u,s,r?A:F);break;default:ne(P,_,_,_,[""],F,0,s,F)}}c=d=f=0,x=b=1,C=P="",u=i;break;case 58:u=1+j(P),f=h;default:if(x<1)if(123==S)--x;else if(125==S&&0==x++&&125==N())continue;switch(P+=g(S),S*x){case 38:b=d>0?1:(P+="\f",-1);break;case 44:s[c++]=(j(P)-1)*b,b=1;break;case 64:45===L()&&(P+=W(D())),p=L(),d=u=j(C=P+=K($())),S++;break;case 45:45===h&&2==j(P)&&(x=0)}}return a}function re(e,t,n,r,o,a,i,s,l,c,d,u){for(var f=o-1,h=0===o?a:[""],g=C(h),x=0,b=0,w=0;x<r;++x)for(var k=0,j=S(e,f+1,f=m(b=i[x])),E=e;k<g;++k)(E=y(b>0?h[k]+" "+j:v(j,/&\f/g,h[k])))&&(l[w++]=E);return T(e,t,n,0===o?p:s,l,c,d,u)}function oe(e,t,n,r){return T(e,t,n,u,g(R),S(e,2,-2),0,r)}function ae(e,t,n,r,o){return T(e,t,n,f,S(e,0,r),S(e,r+1,-1),r,o)}var ie={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},se="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_ATTR)||"data-styled",le="active",ce="data-styled-version",de="6.1.19",ue="/*!sc*/\n",pe="undefined"!=typeof window&&"undefined"!=typeof document,fe=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_VERSION:"(date +%s)",REACT_APP_API_URL:""}.SC_DISABLE_SPEEDY)),he={},me=(new Set,Object.freeze([])),ge=Object.freeze({});function xe(e,t,n){return void 0===n&&(n=ge),e.theme!==n.theme&&e.theme||t||n.theme}var ye=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),be=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ve=/(^-|-$)/g;function we(e){return e.replace(be,"-").replace(ve,"")}var ke=/(a)(d)/gi,Se=52,je=function(e){return String.fromCharCode(e+(e>25?39:97))};function Ce(e){var t,n="";for(t=Math.abs(e);t>Se;t=t/Se|0)n=je(t%Se)+n;return(je(t%Se)+n).replace(ke,"$1-$2")}var Ee,Ae=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Fe=function(e){return Ae(5381,e)};function _e(e){return Ce(Fe(e)>>>0)}function Pe(e){return e.displayName||e.name||"Component"}function ze(e){return"string"==typeof e&&!0}var Re="function"==typeof Symbol&&Symbol.for,Oe=Re?Symbol.for("react.memo"):60115,Te=Re?Symbol.for("react.forward_ref"):60112,Be={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Ie={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ne={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},De=((Ee={})[Te]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ee[Oe]=Ne,Ee);function Le(e){return("type"in(t=e)&&t.type.$$typeof)===Oe?Ne:"$$typeof"in e?De[e.$$typeof]:Be;var t}var $e=Object.defineProperty,Me=Object.getOwnPropertyNames,qe=Object.getOwnPropertySymbols,He=Object.getOwnPropertyDescriptor,Ue=Object.getPrototypeOf,We=Object.prototype;function Ge(e,t,n){if("string"!=typeof t){if(We){var r=Ue(t);r&&r!==We&&Ge(e,r,n)}var o=Me(t);qe&&(o=o.concat(qe(t)));for(var a=Le(e),i=Le(t),s=0;s<o.length;++s){var l=o[s];if(!(l in Ie||n&&n[l]||i&&l in i||a&&l in a)){var c=He(t,l);try{$e(e,l,c)}catch(e){}}}}return e}function Ve(e){return"function"==typeof e}function Ye(e){return"object"==typeof e&&"styledComponentId"in e}function Qe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Ke(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function Je(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Xe(e,t,n){if(void 0===n&&(n=!1),!n&&!Je(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Xe(e[r],t[r]);else if(Je(t))for(var r in t)e[r]=Xe(e[r],t[r]);return e}function Ze(e,t){Object.defineProperty(e,"toString",{value:t})}function et(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var tt=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)if((o<<=1)<0)throw et(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var a=r;a<o;a++)this.groupSizes[a]=0}for(var i=this.indexOfGroup(e+1),s=(a=0,t.length);a<s;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,a=r;a<o;a++)t+="".concat(this.tag.getRule(a)).concat(ue);return t},e}(),nt=new Map,rt=new Map,ot=1,at=function(e){if(nt.has(e))return nt.get(e);for(;rt.has(ot);)ot++;var t=ot++;return nt.set(e,t),rt.set(t,e),t},it=function(e,t){ot=t+1,nt.set(e,t),rt.set(t,e)},st="style[".concat(se,"][").concat(ce,'="').concat(de,'"]'),lt=new RegExp("^".concat(se,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ct=function(e,t,n){for(var r,o=n.split(","),a=0,i=o.length;a<i;a++)(r=o[a])&&e.registerName(t,r)},dt=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(ue),o=[],a=0,i=r.length;a<i;a++){var s=r[a].trim();if(s){var l=s.match(lt);if(l){var c=0|parseInt(l[1],10),d=l[2];0!==c&&(it(d,c),ct(e,d,l[3]),e.getTag().insertRules(c,o)),o.length=0}else o.push(s)}}},ut=function(e){for(var t=document.querySelectorAll(st),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(se)!==le&&(dt(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function pt(){return n.nc}var ft=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){var t=Array.from(e.querySelectorAll("style[".concat(se,"]")));return t[t.length-1]}(n),a=void 0!==o?o.nextSibling:null;r.setAttribute(se,le),r.setAttribute(ce,de);var i=pt();return i&&r.setAttribute("nonce",i),n.insertBefore(r,a),r},ht=function(){function e(e){this.element=ft(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}throw et(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),mt=function(){function e(e){this.element=ft(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),gt=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),xt=pe,yt={isServer:!pe,useCSSOMInjection:!fe},bt=function(){function e(e,t,n){void 0===e&&(e=ge),void 0===t&&(t={});var o=this;this.options=r(r({},yt),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&pe&&xt&&(xt=!1,ut(this)),Ze(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=function(n){var o=function(e){return rt.get(e)}(n);if(void 0===o)return"continue";var a=e.names.get(o),i=t.getGroup(n);if(void 0===a||!a.size||0===i.length)return"continue";var s="".concat(se,".g").concat(n,'[id="').concat(o,'"]'),l="";void 0!==a&&a.forEach(function(e){e.length>0&&(l+="".concat(e,","))}),r+="".concat(i).concat(s,'{content:"').concat(l,'"}').concat(ue)},a=0;a<n;a++)o(a);return r}(o)})}return e.registerId=function(e){return at(e)},e.prototype.rehydrate=function(){!this.server&&pe&&ut(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(r(r({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new gt(n):t?new ht(n):new mt(n)}(this.options),new tt(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(at(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(at(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(at(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),vt=/&/g,wt=/^\s*\/\/.*$/gm;function kt(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=kt(e.children,t)),e})}function St(e){var t,n,r,o=void 0===e?ge:e,a=o.options,i=void 0===a?ge:a,s=o.plugins,l=void 0===s?me:s,c=function(e,r,o){return o.startsWith(n)&&o.endsWith(n)&&o.replaceAll(n,"").length>0?".".concat(t):e},d=l.slice();d.push(function(e){e.type===p&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(vt,n).replace(r,c))}),i.prefix&&d.push(ee),d.push(X);var u=function(e,o,a,s){void 0===o&&(o=""),void 0===a&&(a=""),void 0===s&&(s="&"),t=s,n=o,r=new RegExp("\\".concat(n,"\\b"),"g");var l=e.replace(wt,""),c=te(a||o?"".concat(a," ").concat(o," { ").concat(l," }"):l);i.namespace&&(c=kt(c,i.namespace));var u,p=[];return J(c,function(e){var t=C(e);return function(n,r,o,a){for(var i="",s=0;s<t;s++)i+=e[s](n,r,o,a)||"";return i}}(d.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)})))),p};return u.hash=l.length?l.reduce(function(e,t){return t.name||et(15),Ae(e,t.name)},5381).toString():"",u}var jt=new bt,Ct=St(),Et=a.createContext({shouldForwardProp:void 0,styleSheet:jt,stylis:Ct}),At=(Et.Consumer,a.createContext(void 0));function Ft(){return(0,a.useContext)(Et)}function _t(e){var t=(0,a.useState)(e.stylisPlugins),n=t[0],r=t[1],o=Ft().styleSheet,i=(0,a.useMemo)(function(){var t=o;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,o]),l=(0,a.useMemo)(function(){return St({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:n})},[e.enableVendorPrefixes,e.namespace,n]);(0,a.useEffect)(function(){s()(n,e.stylisPlugins)||r(e.stylisPlugins)},[e.stylisPlugins]);var c=(0,a.useMemo)(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:i,stylis:l}},[e.shouldForwardProp,i,l]);return a.createElement(Et.Provider,{value:c},a.createElement(At.Provider,{value:l},e.children))}var Pt=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Ct);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Ze(this,function(){throw et(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=Ct),this.name+e.hash},e}(),zt=function(e){return e>="A"&&e<="Z"};function Rt(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;zt(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Ot=function(e){return null==e||!1===e||""===e},Tt=function(e){var t,n,r=[];for(var a in e){var i=e[a];e.hasOwnProperty(a)&&!Ot(i)&&(Array.isArray(i)&&i.isCss||Ve(i)?r.push("".concat(Rt(a),":"),i,";"):Je(i)?r.push.apply(r,o(o(["".concat(a," {")],Tt(i),!1),["}"],!1)):r.push("".concat(Rt(a),": ").concat((t=a,null==(n=i)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in ie||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Bt(e,t,n,r){return Ot(e)?[]:Ye(e)?[".".concat(e.styledComponentId)]:Ve(e)?!Ve(o=e)||o.prototype&&o.prototype.isReactComponent||!t?[e]:Bt(e(t),t,n,r):e instanceof Pt?n?(e.inject(n,r),[e.getName(r)]):[e]:Je(e)?Tt(e):Array.isArray(e)?Array.prototype.concat.apply(me,e.map(function(e){return Bt(e,t,n,r)})):[e.toString()];var o}function It(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ve(n)&&!Ye(n))return!1}return!0}var Nt=Fe(de),Dt=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&It(e),this.componentId=t,this.baseHash=Ae(Nt,t),this.baseStyle=n,bt.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Qe(r,this.staticRulesId);else{var o=Ke(Bt(this.rules,e,t,n)),a=Ce(Ae(this.baseHash,o)>>>0);if(!t.hasNameForId(this.componentId,a)){var i=n(o,".".concat(a),void 0,this.componentId);t.insertRules(this.componentId,a,i)}r=Qe(r,a),this.staticRulesId=a}else{for(var s=Ae(this.baseHash,n.hash),l="",c=0;c<this.rules.length;c++){var d=this.rules[c];if("string"==typeof d)l+=d;else if(d){var u=Ke(Bt(d,e,t,n));s=Ae(s,u+c),l+=u}}if(l){var p=Ce(s>>>0);t.hasNameForId(this.componentId,p)||t.insertRules(this.componentId,p,n(l,".".concat(p),void 0,this.componentId)),r=Qe(r,p)}}return r},e}(),Lt=a.createContext(void 0);Lt.Consumer;function $t(e){var t=a.useContext(Lt),n=(0,a.useMemo)(function(){return function(e,t){if(!e)throw et(14);if(Ve(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw et(8);return t?r(r({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?a.createElement(Lt.Provider,{value:n},e.children):null}var Mt={};new Set;function qt(e,t,n){var o=Ye(e),i=e,s=!ze(e),l=t.attrs,c=void 0===l?me:l,d=t.componentId,u=void 0===d?function(e,t){var n="string"!=typeof e?"sc":we(e);Mt[n]=(Mt[n]||0)+1;var r="".concat(n,"-").concat(_e(de+n+Mt[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):d,p=t.displayName,f=void 0===p?function(e){return ze(e)?"styled.".concat(e):"Styled(".concat(Pe(e),")")}(e):p,h=t.displayName&&t.componentId?"".concat(we(t.displayName),"-").concat(t.componentId):t.componentId||u,m=o&&i.attrs?i.attrs.concat(c).filter(Boolean):c,g=t.shouldForwardProp;if(o&&i.shouldForwardProp){var x=i.shouldForwardProp;if(t.shouldForwardProp){var y=t.shouldForwardProp;g=function(e,t){return x(e,t)&&y(e,t)}}else g=x}var b=new Dt(n,h,o?i.componentStyle:void 0);function v(e,t){return function(e,t,n){var o=e.attrs,i=e.componentStyle,s=e.defaultProps,l=e.foldedComponentIds,c=e.styledComponentId,d=e.target,u=a.useContext(Lt),p=Ft(),f=e.shouldForwardProp||p.shouldForwardProp,h=xe(t,u,s)||ge,m=function(e,t,n){for(var o,a=r(r({},t),{className:void 0,theme:n}),i=0;i<e.length;i+=1){var s=Ve(o=e[i])?o(a):o;for(var l in s)a[l]="className"===l?Qe(a[l],s[l]):"style"===l?r(r({},a[l]),s[l]):s[l]}return t.className&&(a.className=Qe(a.className,t.className)),a}(o,t,h),g=m.as||d,x={};for(var y in m)void 0===m[y]||"$"===y[0]||"as"===y||"theme"===y&&m.theme===h||("forwardedAs"===y?x.as=m.forwardedAs:f&&!f(y,g)||(x[y]=m[y]));var b=function(e,t){var n=Ft();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,m),v=Qe(l,c);return b&&(v+=" "+b),m.className&&(v+=" "+m.className),x[ze(g)&&!ye.has(g)?"class":"className"]=v,n&&(x.ref=n),(0,a.createElement)(g,x)}(w,e,t)}v.displayName=f;var w=a.forwardRef(v);return w.attrs=m,w.componentStyle=b,w.displayName=f,w.shouldForwardProp=g,w.foldedComponentIds=o?Qe(i.foldedComponentIds,i.styledComponentId):"",w.styledComponentId=h,w.target=o?i.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=o?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,o=t;r<o.length;r++)Xe(e,o[r],!0);return e}({},i.defaultProps,e):e}}),Ze(w,function(){return".".concat(w.styledComponentId)}),s&&Ge(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function Ht(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Ut=function(e){return Object.assign(e,{isCss:!0})};function Wt(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ve(e)||Je(e))return Ut(Bt(Ht(me,o([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?Bt(r):Ut(Bt(Ht(r,t)))}function Gt(e,t,n){if(void 0===n&&(n=ge),!t)throw et(1,t);var a=function(r){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,Wt.apply(void 0,o([r],a,!1)))};return a.attrs=function(o){return Gt(e,t,r(r({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},a.withConfig=function(o){return Gt(e,t,r(r({},n),o))},a}var Vt=function(e){return Gt(qt,e)},Yt=Vt;ye.forEach(function(e){Yt[e]=Vt(e)});var Qt=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=It(e),bt.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var o=r(Ke(Bt(this.rules,t,n,r)),""),a=this.componentId+e;n.insertRules(a,a,o)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&bt.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function Kt(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var i=Wt.apply(void 0,o([e],t,!1)),s="sc-global-".concat(_e(JSON.stringify(i))),l=new Qt(i,s),c=function(e){var t=Ft(),n=a.useContext(Lt),r=a.useRef(t.styleSheet.allocateGSInstance(s)).current;return t.styleSheet.server&&d(r,e,t.styleSheet,n,t.stylis),a.useLayoutEffect(function(){if(!t.styleSheet.server)return d(r,e,t.styleSheet,n,t.stylis),function(){return l.removeStyles(r,t.styleSheet)}},[r,e,t.styleSheet,n,t.stylis]),null};function d(e,t,n,o,a){if(l.isStatic)l.renderStyles(e,he,n,a);else{var i=r(r({},t),{theme:xe(t,o,c.defaultProps)});l.renderStyles(e,i,n,a)}}return a.memo(c)}function Jt(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=Ke(Wt.apply(void 0,o([e],t,!1))),a=_e(r);return new Pt(a,r)}(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=pt(),r=Ke([n&&'nonce="'.concat(n,'"'),"".concat(se,'="true"'),"".concat(ce,'="').concat(de,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw et(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw et(2);var n=e.instance.toString();if(!n)return[];var o=((t={})[se]="",t[ce]=de,t.dangerouslySetInnerHTML={__html:n},t),i=pt();return i&&(o.nonce=i),[a.createElement("style",r({},o,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new bt({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw et(2);return a.createElement(_t,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw et(3)}})(),"__sc-".concat(se,"__")},5340:(e,t,n)=>{"use strict";e.exports=n(9487)},5651:(e,t,n)=>{"use strict";n.d(t,{e:()=>l,y:()=>c});var r=n(9950),o=n(7197),a=n(1367),i=n(4414);const s=(0,r.createContext)(void 0),l=()=>{const e=(0,r.useContext)(s);if(!e)throw new Error("usePaymentStatus must be used within PaymentStatusProvider");return e},c=e=>{let{children:t}=e;const{user:n}=(0,a.As)(),[l,c]=(0,r.useState)({hasOverdue:!1,overdueAmount:0,overdueDays:0,restrictionLevel:"none",overdueInvoices:[]}),[d,u]=(0,r.useState)(!1),[p,f]=(0,r.useState)(!1),[h,m]=(0,r.useState)(!1),[g,x]=(0,r.useState)(!1),[y,b]=(0,r.useState)(!1),v=()=>{if(!n)return;if("System Admin"===n.role)return void c({hasOverdue:!1,overdueAmount:0,overdueDays:0,restrictionLevel:"none",overdueInvoices:[]});const e=(0,o.Lh)(n.role,n.id||"");c(e),"warning"!==e.restrictionLevel||g?"partial"!==e.restrictionLevel||y?"blocked"===e.restrictionLevel&&m(!0):f(!0):u(!0)};return(0,r.useEffect)(()=>{v();const e=setInterval(v,18e5);return()=>clearInterval(e)},[n]),(0,i.jsx)(s.Provider,{value:{paymentStatus:l,refreshPaymentStatus:v,canAccess:e=>(0,o.YD)(e,l.restrictionLevel),showWarning:d,showPartialRestriction:p,showBlockedModal:h,dismissWarning:()=>{u(!1),x(!0),setTimeout(()=>x(!1),36e5)},dismissPartialRestriction:()=>{f(!1),b(!0),setTimeout(()=>b(!1),72e5)}},children:t})}},5665:(e,t,n)=>{"use strict";n.d(t,{E_:()=>c,G$:()=>f,MD:()=>o,Os:()=>i,Ot:()=>d,XS:()=>u,d1:()=>l,h2:()=>p,hI:()=>a,v0:()=>s});n(9950);var r=n(4752);n(4414);const o=r.Ay.div`
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
`,a=r.Ay.div`
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
`,i=r.Ay.div`
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
`,c=r.Ay.div`
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  color: ${e=>{switch(e.trend){case"up":return"#059669";case"down":return"#DC2626";default:return"#6B7280"}}};
`,d=r.Ay.div`
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
`,f=r.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`},5781:(e,t,n)=>{"use strict";n.d(t,{Y:()=>l,g:()=>s});var r=n(9950),o=n(1367),a=n(4414);const i=(0,r.createContext)(void 0),s=()=>{const e=(0,r.useContext)(i);if(!e)throw new Error("useStaff must be used within a StaffProvider");return e},l=e=>{let{children:t}=e;const{user:n,isAuthenticated:s}=(0,o.As)(),[l,c]=(0,r.useState)(null),[d,u]=(0,r.useState)(null),[p,f]=(0,r.useState)([]),[h,m]=(0,r.useState)([]),g=!!l,x=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},y={admin:["all"],manager:["staff_management","shift_management","reports_view","settings_edit","pos_access","kitchen_access","customer_management","inventory_management"],cashier:["pos_access","customer_management","shift_basic"],kitchen:["kitchen_access","order_management","shift_basic"],server:["pos_access","customer_service","shift_basic"]};(0,r.useEffect)(()=>{if(s&&n&&!l){const e={id:n.id,username:n.email.split("@")[0],name:n.name,email:n.email,phone:"",role:n.role.toLowerCase().includes("admin")?"admin":n.role.toLowerCase().includes("staff")?"cashier":"manager",department:"management",isActive:!0,permissions:n.permissions||[],joinDate:(new Date).toISOString(),totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0},schedule:{monday:{start:"09:00",end:"18:00",active:!0},tuesday:{start:"09:00",end:"18:00",active:!0},wednesday:{start:"09:00",end:"18:00",active:!0},thursday:{start:"09:00",end:"18:00",active:!0},friday:{start:"09:00",end:"18:00",active:!0},saturday:{start:"09:00",end:"18:00",active:!0},sunday:{start:"09:00",end:"18:00",active:!0}}};c(e)}},[s,n]),(0,r.useEffect)(()=>{b()},[]);const b=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/staff",{credentials:"include",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}}),n=await t.json();n.success&&Array.isArray(n.data)?f(n.data):f([])}catch(e){console.error("Failed to load staff:",e),f([])}},v=async(e,t)=>{const n=p.map(n=>n.id===e?{...n,...t}:n);f(n);const r=n.find(t=>t.id===e);return(null===l||void 0===l?void 0:l.id)===e&&c(r),r},w=e=>p.find(t=>t.id===e)||null,k=e=>{m(t=>t.map(t=>t.id===e?{...t,endTime:(new Date).toISOString(),status:"completed"}:t)),(null===d||void 0===d?void 0:d.id)===e&&u(null)},S={currentStaff:l,currentShift:d,isLoggedIn:g,staffList:p,activeShifts:h,login:async(e,t)=>{try{const n=await fetch("/api/staff/login",x({method:"POST",body:JSON.stringify({username:e,password:t})})),r=await n.json();return n.ok&&r.success?(c(r.data),!0):(console.error("Staff login failed:",r.message),!1)}catch(n){return console.error("Staff login error:",n),!1}},logout:async()=>{try{d&&"active"===d.status&&k(d.id),await fetch("/api/staff/logout",x({method:"POST"})),c(null),u(null)}catch(e){console.error("Logout error:",e)}},addStaff:async e=>{const t={id:`staff-${Date.now()}`,username:e.username||"",name:e.name||"",email:e.email||"",phone:e.phone||"",role:e.role||"cashier",department:e.department||"service",isActive:!0,permissions:y[e.role||"cashier"],joinDate:(new Date).toISOString().split("T")[0],totalShifts:0,totalSales:0,performance:{efficiency:0,customerRating:0,ordersProcessed:0},schedule:{monday:{start:"09:00",end:"17:00",active:!1},tuesday:{start:"09:00",end:"17:00",active:!1},wednesday:{start:"09:00",end:"17:00",active:!1},thursday:{start:"09:00",end:"17:00",active:!1},friday:{start:"09:00",end:"17:00",active:!1},saturday:{start:"09:00",end:"17:00",active:!1},sunday:{start:"09:00",end:"17:00",active:!1}},...e};return f(e=>[...e,t]),t},updateStaff:v,deactivateStaff:e=>{v(e,{isActive:!1})},getStaffById:w,searchStaff:e=>{if(!e.trim())return p;const t=e.toLowerCase();return p.filter(n=>n.name.toLowerCase().includes(t)||n.username.toLowerCase().includes(t)||n.email.toLowerCase().includes(t)||n.phone.includes(e))},startShift:async e=>{var t;const n={id:`shift-${Date.now()}`,staffId:e,staffName:(null===(t=w(e))||void 0===t?void 0:t.name)||"Unknown",startTime:(new Date).toISOString(),salesAmount:0,ordersProcessed:0,status:"active"};return m(e=>[...e,n]),(null===l||void 0===l?void 0:l.id)===e&&u(n),n},endShift:k,startBreak:e=>{m(t=>t.map(t=>t.id===e?{...t,status:"break"}:t))},endBreak:e=>{m(t=>t.map(t=>t.id===e?{...t,status:"active"}:t))},updateShiftStats:(e,t,n)=>{m(r=>r.map(r=>r.id===e?{...r,salesAmount:r.salesAmount+t,ordersProcessed:r.ordersProcessed+n}:r))},hasPermission:e=>!!l&&(l.permissions.includes("all")||l.permissions.includes(e)),getRolePermissions:e=>y[e]};return(0,a.jsx)(i.Provider,{value:S,children:t})}},6038:(e,t,n)=>{"use strict";n.d(t,{DL:()=>r,Qn:()=>a,vv:()=>o});const r={RM:{symbol:"RM",name:"Malaysian Ringgit",decimals:2},USD:{symbol:"$",name:"US Dollar",decimals:2},KRW:{symbol:"\u20a9",name:"Korean Won",decimals:0},SGD:{symbol:"S$",name:"Singapore Dollar",decimals:2},THB:{symbol:"\u0e3f",name:"Thai Baht",decimals:2},JPY:{symbol:"\xa5",name:"Japanese Yen",decimals:0},EUR:{symbol:"\u20ac",name:"Euro",decimals:2},GBP:{symbol:"\xa3",name:"British Pound",decimals:2},AUD:{symbol:"A$",name:"Australian Dollar",decimals:2},CNY:{symbol:"\xa5",name:"Chinese Yuan",decimals:2},INR:{symbol:"\u20b9",name:"Indian Rupee",decimals:2},PHP:{symbol:"\u20b1",name:"Philippine Peso",decimals:2},VND:{symbol:"\u20ab",name:"Vietnamese Dong",decimals:0},IDR:{symbol:"Rp",name:"Indonesian Rupiah",decimals:0},TWD:{symbol:"NT$",name:"Taiwan Dollar",decimals:0},HKD:{symbol:"HK$",name:"Hong Kong Dollar",decimals:2}};function o(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"RM",o=arguments.length>2?arguments[2]:void 0;const a=r[n],i="string"===typeof e?parseFloat(e):e;if(isNaN(i)){return`${(null===a||void 0===a?void 0:a.symbol)||n} 0`}const s=void 0!==o?o?2:0:null!==(t=null===a||void 0===a?void 0:a.decimals)&&void 0!==t?t:2,l=i.toLocaleString("en-US",{minimumFractionDigits:s,maximumFractionDigits:s});return`${(null===a||void 0===a?void 0:a.symbol)||n} ${l}`}function a(e){var t;return(null===(t=r[e])||void 0===t?void 0:t.symbol)||e}},6910:(e,t,n)=>{"use strict";n.d(t,{JR:()=>o,hY:()=>r});const r=()=>"",o=r()},7119:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(1863)},7197:(e,t,n)=>{"use strict";n.d(t,{Lh:()=>o,YD:()=>i,vr:()=>s,vv:()=>r.vv});var r=n(6038);const o=(e,t)=>{const n=[],r=n.length>0,o=Math.max(...n.map(e=>e.overdueDays)),i=n.reduce((e,t)=>e+t.amount,0);let s,l="none";return o>=8?l="blocked":o>=4?(l="partial",s=a(new Date,8-o).toISOString().split("T")[0]):o>=1&&(l="warning",s=a(new Date,4-o).toISOString().split("T")[0]),{hasOverdue:r,overdueAmount:i,overdueDays:o,restrictionLevel:l,nextRestrictionDate:s,overdueInvoices:n}},a=(e,t)=>{const n=new Date(e);return n.setDate(n.getDate()+t),n},i=(e,t)=>{if(["/invoices","/profile","/settings","/logout"].some(t=>e.includes(t)))return!0;switch(t){case"none":case"warning":default:return!0;case"partial":return!["/pos-terminal","/reports","/analytics","/promotions"].some(t=>e.includes(t));case"blocked":return!1}},s=e=>{switch(e){case"partial":return["New Orders (POS Terminal)","Reports & Analytics","Promotions Management","New Customer Registration"];case"blocked":return["All POS Functions","Kitchen Display","Customer Display","Reports & Analytics","Staff Management","Menu Management","All Business Operations"];default:return[]}}},7492:(e,t,n)=>{"use strict";n.d(t,{rA:()=>m,wr:()=>h,ex:()=>y.ex,SC:()=>o.SC,$n:()=>y.$n,mc:()=>y.mc,UC:()=>y.UC,XS:()=>r.XS,h2:()=>r.h2,G$:()=>r.G$,Ot:()=>r.Ot,pp:()=>x,gE:()=>i.gE,ZQ:()=>i.ZQ,lR:()=>i.lR,FX:()=>i.FX,Lz:()=>i.Lz,Y9:()=>y.Y9,K0:()=>g,Np:()=>f,PM:()=>u,Uj:()=>p,aF:()=>i.aF,zf:()=>i.zf,Xd:()=>k,yY:()=>o.yY,He:()=>o.He,r6:()=>o.r6,hI:()=>r.hI,d1:()=>r.d1,v0:()=>r.v0,E_:()=>r.E_,Os:()=>r.Os,MD:()=>r.MD,Mo:()=>o.Mo,oz:()=>a.oz,j:()=>a.j,XI:()=>l,A0:()=>c,Hj:()=>d,hE:()=>y.hE});var r=n(5665),o=n(4728),a=n(1313),i=n(9610),s=(n(1721),n(4752));const l=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
  }
`,c=s.Ay.div`
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

  @media (max-width: 768px) {
    display: none;
  }
`,d=s.Ay.div`
  display: grid;
  grid-template-columns: ${e=>e.columns};
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
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
`,u=s.Ay.div`
  display: none;
  font-size: 10px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    display: block;
  }
`,p=s.Ay.div`
  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
  }
`,f=s.Ay.div`
  display: contents;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`,h=s.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #F3F4F6;
  }
`,m=s.Ay.button`
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
`,g=s.Ay.button`
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
`,x=s.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;var y=n(3832),b=(n(9950),n(4414));const v=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,w=s.Ay.button`
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
`,k=e=>{let{onMoveUp:t,onMoveDown:n,disableUp:r=!1,disableDown:o=!1}=e;return(0,b.jsxs)(v,{children:[(0,b.jsx)(w,{onClick:t,disabled:r,title:"Move up",children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,b.jsx)("path",{d:"M7 14l5-5 5 5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,b.jsx)(w,{onClick:n,disabled:o,title:"Move down",children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,b.jsx)("path",{d:"M7 10l5 5 5-5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}},8819:(e,t,n)=>{"use strict";n.d(t,{w:()=>r});const r={colors:{primary:"#635BFF",secondary:"#0A2540",background:"#FAFBFC",surface:"#FFFFFF",text:{primary:"#0A2540",secondary:"#6B7C93",light:"#8898AA"},status:{success:"#28C76F",warning:"#FF9F43",error:"#EA5455",info:"#00CFE8"},border:"#E4E7EB"},typography:{fontFamily:'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontSize:{xs:"12px",sm:"14px",base:"16px",lg:"18px",xl:"20px","2xl":"24px","3xl":"30px"},fontWeight:{regular:400,medium:500,semibold:600,bold:700}},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px","2xl":"48px"},borderRadius:{sm:"4px",md:"8px",lg:"12px",xl:"16px",full:"9999px"},shadows:{sm:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06)",md:"0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)",lg:"0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",xl:"0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)"},transitions:{fast:"150ms ease-in-out",normal:"300ms ease-in-out",slow:"500ms ease-in-out"},breakpoints:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px"}}},8930:(e,t,n)=>{"use strict";n.d(t,{BV:()=>d,b:()=>s});var r=n(9950),o=n(4492),a=n(4414);const i=(0,r.createContext)(void 0),s=()=>{const e=(0,r.useContext)(i);if(!e)throw new Error("useMenu must be used within a MenuProvider");return e},l=[],c=[],d=e=>{let{children:t}=e;const n=(0,o.zy)(),[s,d]=(0,r.useState)(l),[u,p]=(0,r.useState)([]),[f,h]=(0,r.useState)(c),m=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},g=(0,r.useCallback)(async()=>{try{const e=window.location.pathname.split("/"),t=e.indexOf("restaurant"),n=e.indexOf("mobile");let r=null,o=null,a=null;if(t>=0?(r=e[t+1],a=`/api/menu?restaurantId=${r}`):n>=0&&(o=e[n+1],a=`/api/mobile/menu/${o}`),!r&&!o)return;const i=await fetch(a,{...m()});if(!i.ok)return void console.error("Failed to load menu:",i.status);const s=await i.json();if(s.success&&s.data){const e=["\ud83c\udf54","\ud83c\udf55","\ud83e\udd64","\ud83c\udf70","\ud83c\udf5c","\ud83e\udd57","\ud83c\udf63","\ud83c\udf2e"],t=s.data.categories.map((t,n)=>({id:t.id?t.id.toString():t.name.toLowerCase().replace(/\s+/g,"_"),name:t.name,emoji:t.emoji||e[n%e.length],order:void 0!==t.displayOrder?t.displayOrder:n}));d(t);const n=s.data.items.map(e=>{let t=[];if(e.optionGroups)try{t="string"===typeof e.optionGroups?JSON.parse(e.optionGroups):e.optionGroups}catch(r){console.warn("Failed to parse optionGroups for item:",e.id,r),t=[]}let n="";return e.categoryId?n=e.categoryId.toString():e.category&&(n=e.category.toLowerCase().replace(/\s+/g,"_")),{id:e.id.toString(),code:e.code||void 0,name:e.name,price:parseFloat(e.price),category:n,description:e.description||"",emoji:e.emoji||"\ud83c\udf7d\ufe0f",soldOut:e.soldOut||!1,image:e.image||void 0,options:e.options||[],optionGroups:t,preparationTime:e.preparationTime||15,is_set_menu:e.is_set_menu||!1,set_items:e.set_items||void 0,set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}});n.sort((e,t)=>e.category!==t.category?0:e.is_set_menu&&!t.is_set_menu?-1:!e.is_set_menu&&t.is_set_menu?1:e.is_set_menu&&t.is_set_menu?(e.set_display_order||0)-(t.set_display_order||0):parseInt(e.id)-parseInt(t.id)),p(n)}else console.warn("MenuContext - Invalid API response format")}catch(e){console.error("MenuContext - Failed to load menu from API:",e)}},[]),x=(0,r.useCallback)(async()=>{try{const e=window.location.pathname.split("/"),t=e.indexOf("restaurant"),n=t>=0?e[t+1]:null;if(!n)return;const r=`/api/option-groups?restaurantId=${n}`,o=await fetch(r,{...m()});if(!o.ok)return void console.error("Failed to load option groups:",o.status);const a=await o.json();a.success&&a.data?h(a.data):console.warn("MenuContext - Invalid option groups response:",a)}catch(e){console.error("MenuContext - Failed to load option groups from API:",e)}},[]);(0,r.useEffect)(()=>{const e=n.pathname.split("/"),t=e.indexOf("restaurant"),r=e.indexOf("mobile"),o=t>=0?e[t+1]:null,a=r>=0?e[r+1]:null;(o||a)&&(g(),o&&x())},[n.pathname,g,x]);return(0,a.jsx)(i.Provider,{value:{categories:s,menuItems:u,optionGroups:f,getItemsByCategory:e=>u.filter(t=>t.category===e),getItemById:e=>u.find(t=>t.id===e),updateMenuItem:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null,o={code:e.code,name:e.name,price:e.price,category:e.category,description:e.description,image:e.image,emoji:e.emoji,soldOut:e.soldOut,optionGroups:e.optionGroups,is_set_menu:e.is_set_menu,set_items:e.set_items,set_display_order:e.set_display_order,recipe_id:e.recipe_id||null};console.log("\ud83d\udd35 Updating menu item with data:",o);const a=r?`/api/menu/product/${e.id}?restaurantId=${r}`:`/api/menu/product/${e.id}`,i=await fetch(a,{method:"PUT",...m(),body:JSON.stringify(o)});if(!i.ok)throw new Error("Failed to update menu item");const s=(await i.json()).data||e,l=u.map(t=>t.id===e.id?{...s,id:String(s.id)}:t);p(l)}catch(t){throw console.error("Failed to update menu item:",t),t}},addMenuItem:async e=>{try{var t;const n=window.location.pathname.split("/"),r=n.indexOf("restaurant"),o=r>=0?n[r+1]:null,a={code:e.code,name:e.name,price:e.price,category:e.category,description:e.description,image:e.image,emoji:e.emoji,optionGroups:e.optionGroups,is_set_menu:e.is_set_menu,set_items:e.set_items,set_display_order:e.set_display_order,recipe_id:e.recipe_id||null,...o&&{restaurant_id:o}};console.log("\ud83d\udfe2 Creating menu item with data:",a);const i=await fetch("/api/menu/product",{method:"POST",...m(),body:JSON.stringify(a)});if(!i.ok)throw new Error("Failed to add menu item");const s=await i.json(),l=s.data?{...s.data,id:String(s.data.id)}:{...e,id:String((null===(t=s.data)||void 0===t?void 0:t.id)||e.id)},c=[...u,l];p(c)}catch(n){throw console.error("Failed to add menu item:",n),n}},removeMenuItem:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null,o=r?`/api/menu/product/${e}?restaurantId=${r}`:`/api/menu/product/${e}`;if(!(await fetch(o,{method:"DELETE",...m()})).ok)throw new Error("Failed to delete menu item");const a=u.filter(t=>t.id!==e);p(a),console.log("Menu item deleted:",e)}catch(t){throw console.error("Failed to delete menu item:",t),t}},toggleItemSoldOut:async e=>{try{const t=u.find(t=>t.id===e);if(!t)return;const n={...t,soldOut:!t.soldOut},r=window.location.pathname.split("/"),o=r.indexOf("restaurant"),a=o>=0?r[o+1]:null,i=a?`/api/menu/product/${e}?restaurantId=${a}`:`/api/menu/product/${e}`;if(!(await fetch(i,{method:"PUT",...m(),body:JSON.stringify({name:n.name,price:n.price,category:n.category,description:n.description,image:n.image,soldOut:n.soldOut})})).ok)throw new Error("Failed to toggle sold out status");const s=u.map(t=>t.id===e?n:t);p(s)}catch(t){throw console.error("Failed to toggle sold out:",t),t}},addCategory:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null;if(!r)throw new Error("Restaurant ID not found in URL");const o=await fetch(`/api/categories?restaurantId=${r}`,{method:"POST",...m(),body:JSON.stringify({name:e.name,emoji:e.emoji||"\ud83c\udf7d\ufe0f",description:`Category: ${e.name}`})});if(!o.ok){const e=await o.json().catch(()=>({}));throw console.error("Failed to add category:",e),new Error(e.error||"Failed to add category")}console.log("Category added on server:",e.name),await g(),console.log("Menu reloaded after category addition")}catch(t){throw console.error("Failed to add category:",t),t}},updateCategory:async(e,t)=>{try{if(!s.find(t=>t.id===e))throw new Error("Category not found");const n=window.location.pathname.split("/"),r=n.indexOf("restaurant"),o=r>=0?n[r+1]:null;if(!o)throw new Error("Restaurant ID not found in URL");const a=await fetch(`/api/categories/id/${e}?restaurantId=${o}`,{method:"PUT",...m(),body:JSON.stringify({name:t.name,emoji:t.emoji,description:t.name?`Category: ${t.name}`:void 0})});if(!a.ok){const e=await a.json().catch(()=>({}));throw console.error("Failed to update category:",e),new Error(e.error||"Failed to update category")}console.log("Category updated on server:",t),await g(),console.log("Menu reloaded after category update")}catch(n){throw console.error("Failed to update category:",n),n}},deleteCategory:async e=>{try{const t=s.find(t=>t.id===e);if(!t)throw new Error("Category not found");if(!(await fetch(`/api/categories/${t.name}`,{method:"DELETE",...m()})).ok)throw new Error("Failed to delete category");console.log("Category deleted on server:",t.name),await g(),console.log("Menu reloaded after category deletion")}catch(t){throw console.error("Failed to delete category:",t),t}},reorderCategories:async e=>{console.log("\ud83d\udd04 reorderCategories called with:",e);try{d(e);const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null;if(console.log("\ud83d\udccd Restaurant ID from URL:",r),!r)return void console.error("\u274c Restaurant ID not found in URL");const o=localStorage.getItem("auth_token");console.log("\ud83d\udd11 Token exists:",!!o);const a={categories:e};console.log("\ud83d\udce6 Sending payload:",JSON.stringify(a,null,2));const i=`/api/categories/reorder?restaurantId=${r}`;console.log("\ud83c\udf10 Calling API:",i);const s=await fetch(i,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Response status:",s.status),!s.ok){const e=await s.text();throw console.error("\u274c Response error:",e),new Error(`Failed to reorder categories: ${s.status}`)}const l=await s.json();console.log("\u2705 Category order saved to backend:",l)}catch(t){console.error("\u274c Failed to reorder categories:",t),await g()}},addOptionGroup:async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:null,o=await fetch("/api/option-groups",{method:"POST",...m(),body:JSON.stringify({name:e.name,required:e.required,multiple:e.multiple,options:e.options,restaurant_id:r})});if(!o.ok){const e=await o.json().catch(()=>({}));throw console.error("Failed to create option group:",e),new Error(e.error||"Failed to create option group")}const a=await o.json();a.success&&a.data&&(console.log("Option group created:",a.data.id),await x(),console.log("Option groups reloaded after creation"))}catch(t){throw console.error("Failed to create option group:",t),t}},updateOptionGroup:async(e,t)=>{try{const n=f.find(t=>t.id===e);if(!n)throw new Error("Option group not found");const r={...n,...t},o=await fetch(`/api/option-groups/${e}`,{method:"PUT",...m(),body:JSON.stringify({name:r.name,required:r.required,multiple:r.multiple,options:r.options})});if(!o.ok){const e=await o.json().catch(()=>({}));throw console.error("Failed to update option group:",e),new Error(e.error||"Failed to update option group")}const a=await o.json();a.success&&a.data&&(console.log("Option group updated:",e),await x(),console.log("Option groups reloaded after update"))}catch(n){throw console.error("Failed to update option group:",n),n}},deleteOptionGroup:async e=>{try{const t=await fetch(`/api/option-groups/${e}`,{method:"DELETE",...m()});if(!t.ok){const e=await t.json().catch(()=>({}));throw console.error("Failed to delete option group:",e),new Error(e.error||"Failed to delete option group")}console.log("Option group deleted:",e),await x(),console.log("Option groups reloaded after deletion")}catch(t){throw console.error("Failed to delete option group:",t),t}},reloadMenu:g},children:t})}},9018:(e,t,n)=>{"use strict";n.d(t,{Pj:()=>l,tv:()=>c});var r=n(9950),o=n(4414);const a={name:"FOODCOURT CENTRAL",businessRegistration:"000123456789",phone:"+60 3-1234-5678",email:"contact@foodcourt.com",address:"123 Main Street, City Center",city:"Kuala Lumpur",state:"Wilayah Persekutuan",postalCode:"50000",gstRegNo:"000123456789"},i={openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur",orderNumberReset:"daily",defaultPreparationTime:15,taxEnabled:!0,taxRate:6,serviceChargeEnabled:!1,serviceChargeRate:10,currency:"RM",cashRounding:.05,roundingApplyTo:"cash_only",pagerSystem:{enabled:!1,totalPagers:50},takeawayPricing:{enabled:!1,pricingType:"per-item",perItemCharge:.5,categoryCharges:{food:1,beverage:.5,dessert:.5,other:.5}},deliveryPricing:{enabled:!1,minimumOrder:0,freeAbove:999999,zones:[]}},s=(0,r.createContext)(void 0),l=()=>{const e=(0,r.useContext)(s);if(!e)throw new Error("useStore must be used within a StoreProvider");return e},c=e=>{let{children:t}=e;const[n,l]=(0,r.useState)(a),[c,d]=(0,r.useState)(i);(0,r.useEffect)(()=>{(async()=>{try{const n=localStorage.getItem("auth_token");console.log("\ud83d\udd11 StoreContext: Auth token exists:",!!n);const r=window.location.pathname.match(/\/restaurant\/(\d+)/);let o=r?parseInt(r[1]):null;if(!o&&window.location.pathname.includes("/mobile/")){const n=window.location.pathname.match(/\/mobile\/([^\/]+)/);if(n){const r=n[1];console.log("\ud83d\udcf1 StoreContext: Found mobile slug:",r);try{const t=await fetch(`/api/restaurants/slug/${r}`);if(t.ok){var e;const n=await t.json();o=n.id||(null===(e=n.data)||void 0===e?void 0:e.id),console.log("\u2705 StoreContext: Got restaurant ID from slug:",o)}}catch(t){console.error("\u274c StoreContext: Failed to get restaurant from slug:",t)}}}if(console.log("\ud83c\udf10 StoreContext: Restaurant ID from URL:",o),!o){console.log("\ud83d\udd0d StoreContext: Fetching user info from /api/auth/me");const e=await fetch("/api/auth/me",{credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}}});if(console.log("\ud83d\udce1 StoreContext: /api/auth/me response status:",e.status),e.ok){const t=await e.json();console.log("\ud83d\udc64 StoreContext: User info:",t),o=t.restaurant_id}else{console.error("\u274c StoreContext: Failed to get user info");const t=await e.text();console.error("Error details:",t)}}if(!o)return void console.warn("\u26a0\ufe0f StoreContext: No restaurant_id found, using default settings");console.log("\ud83c\udfaf StoreContext: Using restaurant_id:",o);const a=(new Date).getTime();console.log("\ud83d\udcde StoreContext: Fetching settings from /api/store/settings?restaurantId="+o);const s=await fetch(`/api/store/settings?restaurantId=${o}&_t=${a}`,{credentials:"include",headers:{"Content-Type":"application/json","Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",...n?{Authorization:`Bearer ${n}`}:{}}});if(console.log("\ud83d\udce1 StoreContext: /api/store/settings response status:",s.status),s.ok){const e=await s.json();if(console.log("\ud83c\udfea StoreContext: API response:",e),e.success&&e.data){const t={name:e.data.name||"",businessRegistration:e.data.business_registration||"",phone:e.data.phone||"",email:e.data.email||"",address:e.data.address||"",city:e.data.city||"",state:e.data.state||"",postalCode:e.data.postal_code||"",gstRegNo:e.data.tax_id||""};if(console.log("\ud83c\udfea StoreContext: Loaded store data:",t),l(t),e.data.operation_settings){const t="string"===typeof e.data.operation_settings?JSON.parse(e.data.operation_settings):e.data.operation_settings;d({...i,...t,currency:e.data.currency||"RM",cashRounding:e.data.cash_rounding||.05,roundingApplyTo:e.data.rounding_apply_to||"cash_only"})}else d({...i,currency:e.data.currency||"RM",cashRounding:e.data.cash_rounding||.05,roundingApplyTo:e.data.rounding_apply_to||"cash_only"})}}else{console.error("\u274c StoreContext: Failed to fetch store settings");const e=await s.text();console.error("Error details:",e)}}catch(n){console.error("\u274c StoreContext: Error loading store settings:",n),console.error("Error stack:",n instanceof Error?n.stack:"No stack trace")}})()},[]);return(0,o.jsx)(s.Provider,{value:{storeSettings:n,operationSettings:c,updateSettings:e=>{e.store&&l(e.store),e.operations&&d(e.operations)},getStoreInfo:()=>(console.log("\ud83c\udfea StoreContext: getStoreInfo() called, returning:",n),n),getTakeawayCharge:e=>{if(!c.takeawayPricing.enabled)return 0;if("per-item"===c.takeawayPricing.pricingType)return c.takeawayPricing.perItemCharge;if(e){const t=e.toLowerCase();if(t in c.takeawayPricing.categoryCharges)return c.takeawayPricing.categoryCharges[t]}return c.takeawayPricing.categoryCharges.other}},children:t})}},9037:(e,t,n)=>{"use strict";n.d(t,{c:()=>i,y:()=>s});var r=n(9950),o=n(4414);const a=(0,r.createContext)(void 0),i=()=>{const e=(0,r.useContext)(a);if(!e)throw new Error("useCustomer must be used within a CustomerProvider");return e},s=e=>{let{children:t}=e;const[n,i]=(0,r.useState)(null),[s,l]=(0,r.useState)(null),[c,d]=(0,r.useState)([]),[u,p]=(0,r.useState)(!1),[f,h]=(0,r.useState)("guest"),m=!n&&!!s,g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}};(0,r.useEffect)(()=>{x()},[]);const x=async()=>{try{const e=1,t=await fetch(`/api/customers/${e}`,g()),n=await t.json();if(n.success&&Array.isArray(n.data)){const e=n.data.map(e=>({id:e.customer.id.toString(),type:e.customer.type,name:e.customer.name,phone:e.customer.phone,email:e.customer.email||"",points:e.points||0,totalOrders:e.total_orders||0,totalSpent:parseFloat(e.total_spent)||0,favoriteItems:[],addresses:[],joinDate:e.first_order_at?new Date(e.first_order_at).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],lastOrderDate:e.last_order_at?new Date(e.last_order_at).toISOString().split("T")[0]:void 0,loyaltyTier:e.loyalty_tier||"Bronze",isActive:!0}));d(e)}else d([])}catch(e){console.error("Failed to load customers:",e),d([])}},y=async(e,t)=>{const r=c.map(n=>n.id===e?{...n,...t}:n);d(r);const o=r.find(t=>t.id===e);return(null===n||void 0===n?void 0:n.id)===e&&i(o),o},b=e=>c.find(t=>t.id===e)||null,v={currentCustomer:n,guestInfo:s,isGuest:m,customers:c,setCurrentCustomer:i,setGuestInfo:l,registerCustomer:async e=>{try{const t=await fetch("/api/customers/register",g({method:"POST",body:JSON.stringify({phone:e.phone,name:e.name,email:e.email,password:e.password,restaurantId:1})})),n=await t.json();if(!t.ok||!n.success)throw console.error("Registration failed:",n.message),new Error(n.message||"Registration failed");const r={id:n.data.id.toString(),type:n.data.type,name:n.data.name,phone:n.data.phone,email:n.data.email||"",points:n.data.points||0,totalOrders:n.data.totalOrders||0,totalSpent:n.data.totalSpent||0,favoriteItems:[],addresses:[],joinDate:(new Date).toISOString().split("T")[0],loyaltyTier:n.data.loyaltyTier||"Bronze",isActive:!0};return i(r),l(null),await x(),r}catch(t){throw console.error("Registration error:",t),t}},loginCustomer:async(e,t)=>{try{const n=await fetch("/api/customers/auth",g({method:"POST",body:JSON.stringify({phone:e,password:t,restaurantId:1})})),r=await n.json();if(!n.ok||!r.success)return console.error("Login failed:",r.message),null;const o={id:r.data.id.toString(),type:r.data.type,name:r.data.name,phone:r.data.phone,email:r.data.email||"",points:r.data.points||0,totalOrders:r.data.totalOrders||0,totalSpent:r.data.totalSpent||0,favoriteItems:[],addresses:[],joinDate:(new Date).toISOString().split("T")[0],loyaltyTier:r.data.loyaltyTier||"Bronze",isActive:!0};return i(o),l(null),o}catch(n){return console.error("Login error:",n),null}},logoutCustomer:()=>{i(null),l(null)},updateCustomer:y,searchCustomers:e=>{if(!e.trim())return c;const t=e.toLowerCase();return c.filter(n=>{var r;return n.name.toLowerCase().includes(t)||n.phone.includes(e)||(null===(r=n.email)||void 0===r?void 0:r.toLowerCase().includes(t))})},getCustomerByPhone:e=>c.find(t=>t.phone===e)||null,getCustomerById:b,deleteCustomer:async e=>{try{const t=await fetch(`/api/customers/${e}`,g({method:"DELETE"})),r=await t.json();return t.ok&&r.success?(d(c.filter(t=>t.id!==e)),(null===n||void 0===n?void 0:n.id)===e&&i(null),!0):(console.error("Delete customer failed:",r.message),!1)}catch(t){return console.error("Delete customer error:",t),!1}},addPoints:(e,t)=>{var n;y(e,{points:((null===(n=b(e))||void 0===n?void 0:n.points)||0)+t})},usePoints:(e,t)=>{const n=b(e);return!(!n||n.points<t)&&(y(e,{points:n.points-t}),!0)},addToFavorites:(e,t)=>{const n=b(e);n&&!n.favoriteItems.includes(t)&&y(e,{favoriteItems:[...n.favoriteItems,t]})},removeFromFavorites:(e,t)=>{const n=b(e);n&&y(e,{favoriteItems:n.favoriteItems.filter(e=>e!==t)})},updateCustomerOrderStats:(e,t)=>{const n=b(e);if(!n)return;const r=Math.floor(t),o=n.totalSpent+t;let a="Bronze";o>=5e3?a="VIP":o>=2e3?a="Gold":o>=500&&(a="Silver"),y(e,{totalOrders:n.totalOrders+1,totalSpent:o,points:n.points+r,loyaltyTier:a,lastOrderDate:(new Date).toISOString().split("T")[0]})},showCustomerModal:u,setShowCustomerModal:p,customerModalMode:f,setCustomerModalMode:h};return(0,o.jsx)(a.Provider,{value:v,children:t})}},9487:(e,t)=>{"use strict";function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(!(0<a(o,t)))break e;e[r]=t,e[n]=o,n=r}}function r(e){return 0===e.length?null:e[0]}function o(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,i=o>>>1;r<i;){var s=2*(r+1)-1,l=e[s],c=s+1,d=e[c];if(0>a(l,n))c<o&&0>a(d,l)?(e[r]=d,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else{if(!(c<o&&0>a(d,n)))break e;e[r]=d,e[c]=n,r=c}}}return t}function a(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var i=performance;t.unstable_now=function(){return i.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],d=[],u=1,p=null,f=3,h=!1,m=!1,g=!1,x=!1,y="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,v="undefined"!==typeof setImmediate?setImmediate:null;function w(e){for(var t=r(d);null!==t;){if(null===t.callback)o(d);else{if(!(t.startTime<=e))break;o(d),t.sortIndex=t.expirationTime,n(c,t)}t=r(d)}}function k(e){if(g=!1,w(e),!m)if(null!==r(c))m=!0,j||(j=!0,S());else{var t=r(d);null!==t&&R(k,t.startTime-e)}}var S,j=!1,C=-1,E=5,A=-1;function F(){return!!x||!(t.unstable_now()-A<E)}function _(){if(x=!1,j){var e=t.unstable_now();A=e;var n=!0;try{e:{m=!1,g&&(g=!1,b(C),C=-1),h=!0;var a=f;try{t:{for(w(e),p=r(c);null!==p&&!(p.expirationTime>e&&F());){var i=p.callback;if("function"===typeof i){p.callback=null,f=p.priorityLevel;var s=i(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof s){p.callback=s,w(e),n=!0;break t}p===r(c)&&o(c),w(e)}else o(c);p=r(c)}if(null!==p)n=!0;else{var l=r(d);null!==l&&R(k,l.startTime-e),n=!1}}break e}finally{p=null,f=a,h=!1}n=void 0}}finally{n?S():j=!1}}}if("function"===typeof v)S=function(){v(_)};else if("undefined"!==typeof MessageChannel){var P=new MessageChannel,z=P.port2;P.port1.onmessage=_,S=function(){z.postMessage(null)}}else S=function(){y(_,0)};function R(e,n){C=y(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},t.unstable_scheduleCallback=function(e,o,a){var i=t.unstable_now();switch("object"===typeof a&&null!==a?a="number"===typeof(a=a.delay)&&0<a?i+a:i:a=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:u++,callback:o,priorityLevel:e,startTime:a,expirationTime:s=a+s,sortIndex:-1},a>i?(e.sortIndex=a,n(d,e),null===r(c)&&e===r(d)&&(g?(b(C),C=-1):g=!0,R(k,a-i))):(e.sortIndex=s,n(c,e),m||h||(m=!0,j||(j=!0,S()))),e},t.unstable_shouldYield=F,t.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}},9610:(e,t,n)=>{"use strict";n.d(t,{Ay:()=>j,FX:()=>x,IM:()=>b,Lz:()=>y,ZQ:()=>g,aF:()=>k,fh:()=>f,gE:()=>h,lR:()=>m,mH:()=>i,yl:()=>v,zf:()=>S});n(9950);var r=n(7119),o=n(4752),a=n(4414);const i=o.Ay.div`
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
`,s=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,l=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,c=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,d=o.Ay.button`
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
`,p=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,h=o.Ay.div`
  margin-bottom: 20px;
`,m=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,g=o.Ay.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,x=o.Ay.select`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,y=o.Ay.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
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
`,w=e=>{let{isOpen:t,onClose:n,title:o,children:f,footer:h,maxWidth:m,size:g="medium",headerActions:x}=e;if(!t)return null;const y=(0,a.jsx)(i,{onClick:n,children:(0,a.jsxs)(s,{style:{maxWidth:(()=>{if(m)return m;switch(g){case"small":return"400px";case"large":return"800px";default:return"600px"}})()},onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:o}),(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[x,(0,a.jsx)(d,{onClick:n,children:"\xd7"})]})]}),(0,a.jsx)(u,{children:f}),h&&(0,a.jsx)(p,{children:h})]})});return r.createPortal(y,document.body)},k=w,S=w,j=w},9950:(e,t,n)=>{"use strict";e.exports=n(1983)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var a=Object.create(null);n.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&r;("object"==typeof s||"function"==typeof s)&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>i[e]=()=>r[e]);return i.default=()=>r,n.d(a,i),a}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce((t,r)=>(n.f[r](e,t),t),[])),n.u=e=>"static/js/"+e+"."+{1:"f541f432",187:"9609e2b9",408:"ba484fed",441:"63cf11d3",677:"5cd001ea",733:"34392957",749:"445b3aad",758:"a1537818",1038:"94ebd71e",1268:"5372aff5",1450:"4df0aa27",1566:"99dfe955",1748:"3328ec2b",2301:"421a22f9",2341:"47c6595b",2370:"8dbbf19c",2548:"75380051",2612:"09593ae6",2652:"fc29cc21",2766:"146cd03d",2790:"af544373",2969:"dedd1e7d",2980:"63d83324",3201:"9051a77a",3310:"c1c3d443",3416:"8737d0a8",3422:"988d9358",3543:"76c60ed8",3585:"de938600",3643:"898b78c7",3913:"b71402ff",4032:"1e842d50",4083:"4560b645",4107:"7bdd95bb",4269:"b16f8c4b",4293:"a96827d6",4551:"3a910e72",4602:"4822f7f8",4648:"6ab27e98",4656:"c7d7dc51",4662:"256e53b7",4685:"7b9342ea",4987:"00404732",5008:"cd3f6034",5577:"11082e93",5581:"e603f2fb",5871:"49b727f7",6e3:"ff1d8084",6121:"beef95d6",6136:"4736a3ce",6152:"4267ad66",6529:"21c45ad7",6554:"4127de70",6780:"31688c4c",6814:"3d91216d",6837:"4c135f95",6843:"5896fa7a",6866:"b5a93bc9",6929:"e2b310c6",7283:"795e76d5",7576:"8a28f3a2",7606:"a81cec23",7693:"d04feb67",7795:"b9e48c23",7999:"92b73772",8018:"da3cac79",8026:"ae22e889",8060:"efdcf8fa",8206:"4381c638",8309:"505b8d00",8317:"be8bd1ad",8844:"6ebf57a6",9134:"b724dad4",9163:"6ef9c081",9327:"e959abe8",9328:"e781434b",9440:"a3a4bcf3",9485:"e552391f",9876:"901c7332",9889:"64ac82a9"}[e]+".chunk.js",n.miniCssF=e=>{},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="frontend:";n.l=(r,o,a,i)=>{if(e[r])e[r].push(o);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+a){s=u;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[o];var p=(t,n)=>{s.onerror=s.onload=null,clearTimeout(f);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach(e=>e(n)),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={8792:0};n.f.j=(t,r)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((n,r)=>o=e[t]=[n,r]);r.push(o[2]=a);var i=n.p+n.u(t),s=new Error;n.l(i,r=>{if(n.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}},"chunk-"+t,t)}};var t=(t,r)=>{var o,a,i=r[0],s=r[1],l=r[2],c=0;if(i.some(t=>0!==e[t])){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)l(n)}for(t&&t(r);c<i.length;c++)a=i[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0},r=self.webpackChunkfrontend=self.webpackChunkfrontend||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0,(()=>{"use strict";var e=n(9950),t=n(1352),r=n(4492),o=n(4752),a=n(8819);const i=o.DU`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    font-family: ${a.w.typography.fontFamily};
    font-size: ${a.w.typography.fontSize.base};
    color: ${a.w.colors.text.primary};
    background-color: ${a.w.colors.background};
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
    background: ${a.w.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${a.w.colors.text.secondary};
    border-radius: ${a.w.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${a.w.colors.text.primary};
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
`;var s=n(4414);const l=(0,e.createContext)(a.w),c=e=>{let{children:t}=e;return(0,s.jsx)(l.Provider,{value:a.w,children:(0,s.jsxs)(o.NP,{theme:a.w,children:[(0,s.jsx)(i,{}),t]})})};var d=n(447),u=n(9018),p=n(8930),f=n(9037),h=n(5781),m=n(1367),g=n(5651);const x=o.Ay.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
`,y=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,b=o.Ay.h2`
  font-size: 24px;
  color: #0A2540;
  margin-bottom: 12px;
`,v=o.Ay.p`
  color: #6B7280;
  margin-bottom: 24px;
`,w=o.Ay.button`
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
`,k=o.Ay.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
`,S=o.Ay.div`
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
`,j=e=>{let{children:t,requiredRole:n,requiredPermission:o,requireRestaurantMatch:a=!1}=e;const{user:i,isAuthenticated:l,isLoading:c,hasPermission:d,canAccessRoute:u}=(0,m.As)(),p=(0,r.zy)(),f=(0,r.Zp)(),h=(0,r.g)();if(c)return(0,s.jsx)(k,{children:(0,s.jsx)(S,{})});if(!l)return(0,s.jsx)(r.C5,{to:"/pos",state:{from:p},replace:!0});if(a&&h.restaurantId&&i){const e=parseInt(h.restaurantId,10),t=i.restaurantId?Number(i.restaurantId):void 0;if(!("System Admin"===i.role)&&t&&t!==e){const e=`/restaurant/${t}/${p.pathname.split("/").filter(Boolean).slice(2).join("/")||"dashboard"}`;return(0,s.jsx)(r.C5,{to:e,replace:!0})}}if(n&&i&&!n.includes(i.role))switch(i.role){case"System Admin":return(0,s.jsx)(r.C5,{to:"/pos/admin/dashboard",replace:!0});case"Foodcourt General":return(0,s.jsx)(r.C5,{to:"/pos/foodcourt/general/dashboard",replace:!0});case"Brand General":return(0,s.jsx)(r.C5,{to:"/pos/brand/general/dashboard",replace:!0});case"Foodcourt Manager":return(0,s.jsx)(r.C5,{to:"/pos/foodcourt/dashboard",replace:!0});case"Brand Manager":return(0,s.jsx)(r.C5,{to:"/pos/brand/dashboard",replace:!0});case"Restaurant Admin":return(0,s.jsx)(r.C5,{to:`/restaurant/${i.restaurantId||"1"}/dashboard`,replace:!0});case"Staff":return(0,s.jsx)(r.C5,{to:`/restaurant/${i.restaurantId||"1"}/basic`,replace:!0});default:return(0,s.jsx)(r.C5,{to:"/pos",replace:!0})}if(o&&!d(o))return(0,s.jsx)(x,{children:(0,s.jsxs)(y,{children:[(0,s.jsx)(b,{children:"Insufficient Permissions"}),(0,s.jsx)(v,{children:"You don't have the required permission to perform this action."}),(0,s.jsx)(w,{onClick:()=>f(-1),children:"Go Back"})]})});if(n&&n.length>0){if(!(["/pos/recipes","/pos/ingredients","/pos/brand-products","/pos/suppliers"].some(e=>p.pathname.startsWith(e))&&i&&("Brand General"===i.role||"Brand Manager"===i.role||"System Admin"===i.role))&&!u(p.pathname))switch(null===i||void 0===i?void 0:i.role){case"System Admin":return(0,s.jsx)(r.C5,{to:"/pos/admin/dashboard",replace:!0});case"Foodcourt General":return(0,s.jsx)(r.C5,{to:"/pos/foodcourt/general/dashboard",replace:!0});case"Brand General":return(0,s.jsx)(r.C5,{to:"/pos/brand/general/dashboard",replace:!0});case"Foodcourt Manager":return(0,s.jsx)(r.C5,{to:"/pos/foodcourt/dashboard",replace:!0});case"Brand Manager":return(0,s.jsx)(r.C5,{to:"/pos/brand/dashboard",replace:!0});case"Restaurant Admin":return(0,s.jsx)(r.C5,{to:`/restaurant/${i.restaurantId||"1"}/dashboard`,replace:!0});case"Staff":return(0,s.jsx)(r.C5,{to:`/restaurant/${i.restaurantId||"1"}/basic`,replace:!0});default:return(0,s.jsx)(r.C5,{to:"/pos",replace:!0})}}return(0,s.jsx)(s.Fragment,{children:t})},C=()=>{const{pathname:t}=(0,r.zy)();return(0,e.useEffect)(()=>{window.scrollTo(0,0)},[t]),null};var E=n(7492);const A=o.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
`,F=o.Ay.header`
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`,_=o.Ay.div`
  font-size: 28px;
  font-weight: bold;
  color: white;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`,P=o.Ay.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`,z=o.Ay.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`,R=o.Ay.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  color: white;
`,O=o.Ay.h1`
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`,T=o.Ay.p`
  font-size: 22px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`,B=o.Ay.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`,I=(0,o.Ay)(E.SC)`
  background: white;
  color: #667eea;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`,N=(0,o.Ay)(E.SC)`
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
`,D=o.Ay.section`
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
`,L=o.Ay.div`
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
`,$=o.Ay.div`
  font-size: 48px;
  margin-bottom: 20px;
`,M=o.Ay.h3`
  font-size: 24px;
  margin-bottom: 15px;
`,q=o.Ay.p`
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
`,H=o.Ay.footer`
  background: rgba(0, 0, 0, 0.2);
  padding: 30px 50px;
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,U=()=>{const e=(0,r.Zp)();return(0,s.jsxs)(A,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(_,{children:"Purple Here"}),(0,s.jsxs)(P,{children:[(0,s.jsx)(z,{onClick:()=>e("/about"),children:"About Us"}),(0,s.jsx)(z,{onClick:()=>e("/service"),children:"Services"}),(0,s.jsx)(z,{onClick:()=>e("/pos"),children:"POS System Access"})]})]}),(0,s.jsxs)(R,{children:[(0,s.jsx)(O,{children:"Smart Store Management Starts Here"}),(0,s.jsx)(T,{children:"Efficiently manage your food courts, brands, and restaurants with Purple Here POS System"}),(0,s.jsxs)(B,{children:[(0,s.jsx)(I,{onClick:()=>e("/pos"),children:"Get Started"}),(0,s.jsx)(N,{onClick:()=>e("/service"),children:"Learn More"})]})]}),(0,s.jsxs)(D,{children:[(0,s.jsxs)(L,{children:[(0,s.jsx)($,{children:"\ud83c\udfea"}),(0,s.jsx)(M,{children:"Food Court Management"}),(0,s.jsx)(q,{children:"Efficiently manage multiple stores and monitor them in real-time"})]}),(0,s.jsxs)(L,{children:[(0,s.jsx)($,{children:"\ud83d\udcca"}),(0,s.jsx)(M,{children:"Brand Integration"}),(0,s.jsx)(q,{children:"View data from all branches at a glance and analyze performance"})]}),(0,s.jsxs)(L,{children:[(0,s.jsx)($,{children:"\ud83d\udcb3"}),(0,s.jsx)(M,{children:"Easy Order & Payment"}),(0,s.jsx)(q,{children:"Handle everything from mobile orders to POS payments conveniently"})]})]}),(0,s.jsx)(H,{children:"\xa9 2025 Purple Here. All rights reserved."})]})},W=o.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`,G=o.Ay.header`
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`,V=o.Ay.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`,Y=o.Ay.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`,Q=o.Ay.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`,K=o.Ay.main`
  max-width: 1000px;
  margin: 80px auto;
  padding: 60px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    margin: 40px 20px;
    padding: 30px 20px;
  }
`,J=o.Ay.h1`
  font-size: 42px;
  color: #667eea;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`,X=o.Ay.section`
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`,Z=o.Ay.h2`
  font-size: 28px;
  color: #764ba2;
  margin-bottom: 20px;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`,ee=o.Ay.p`
  font-size: 18px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,te=o.Ay.ul`
  list-style: none;
  padding: 0;
`,ne=o.Ay.li`
  font-size: 18px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 15px;
  padding-left: 30px;
  position: relative;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,re=(0,o.Ay)(E.SC)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  display: block;
  margin: 40px auto 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`,oe=()=>{const e=(0,r.Zp)();return(0,s.jsxs)(W,{children:[(0,s.jsxs)(G,{children:[(0,s.jsx)(V,{onClick:()=>e("/"),children:"Purple Here"}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(Q,{onClick:()=>e("/about"),children:"About Us"}),(0,s.jsx)(Q,{onClick:()=>e("/service"),children:"Services"}),(0,s.jsx)(Q,{onClick:()=>e("/pos"),children:"POS System Access"})]})]}),(0,s.jsxs)(K,{children:[(0,s.jsx)(J,{children:"About Us"}),(0,s.jsxs)(X,{children:[(0,s.jsx)(Z,{children:"Our Vision"}),(0,s.jsx)(ee,{children:"Purple Here provides an integrated POS solution for food courts, brands, and restaurants. Our goal is to digitize every aspect of store operations to maximize efficiency and support data-driven decision making."})]}),(0,s.jsxs)(X,{children:[(0,s.jsx)(Z,{children:"Why Purple Here?"}),(0,s.jsxs)(te,{children:[(0,s.jsxs)(ne,{children:[(0,s.jsx)("strong",{children:"Multi-tier Management:"})," From food court general managers to brand managers, we provide a hierarchical management system"]}),(0,s.jsxs)(ne,{children:[(0,s.jsx)("strong",{children:"Real-time Data:"})," Monitor orders, sales, and inventory data from all stores in real-time"]}),(0,s.jsxs)(ne,{children:[(0,s.jsx)("strong",{children:"Mobile Ordering:"})," QR code-based mobile ordering improves customer convenience and store operation efficiency"]}),(0,s.jsxs)(ne,{children:[(0,s.jsx)("strong",{children:"Unified Management:"})," Manage menus, staff, customers, and invoices in one integrated system"]}),(0,s.jsxs)(ne,{children:[(0,s.jsx)("strong",{children:"Cloud-based:"})," Access anywhere, anytime with our cloud system for remote management capabilities"]})]})]}),(0,s.jsxs)(X,{children:[(0,s.jsx)(Z,{children:"Our Technology"}),(0,s.jsx)(ee,{children:"Built on the latest web technologies and cloud infrastructure for a stable and scalable system. We provide a fast and convenient user experience with React-based intuitive UI and real-time Socket.IO communication."})]}),(0,s.jsx)(re,{onClick:()=>e("/service"),children:"Learn More About Our Services"})]})]})},ae=o.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`,ie=o.Ay.header`
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`,se=o.Ay.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`,le=o.Ay.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`,ce=o.Ay.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`,de=o.Ay.main`
  max-width: 1200px;
  margin: 80px auto;
  padding: 60px;

  @media (max-width: 768px) {
    margin: 40px 20px;
    padding: 30px 20px;
  }
`,ue=o.Ay.h1`
  font-size: 48px;
  color: white;
  margin-bottom: 50px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 30px;
  }
`,pe=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,fe=o.Ay.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
`,he=o.Ay.div`
  font-size: 56px;
  margin-bottom: 20px;
`,me=o.Ay.h2`
  font-size: 28px;
  color: #667eea;
  margin-bottom: 15px;
`,ge=o.Ay.p`
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
`,xe=o.Ay.ul`
  list-style: none;
  padding: 0;
`,ye=o.Ay.li`
  font-size: 15px;
  color: #666;
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;

  &:before {
    content: '▪';
    position: absolute;
    left: 0;
    color: #764ba2;
    font-size: 18px;
  }
`,be=o.Ay.section`
  background: rgba(255, 255, 255, 0.95);
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`,ve=o.Ay.h2`
  font-size: 36px;
  color: #667eea;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`,we=o.Ay.p`
  font-size: 18px;
  color: #555;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 30px;
`,ke=(0,o.Ay)(E.SC)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 18px 50px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 30px;
    font-size: 18px;
  }
`,Se=()=>{const e=(0,r.Zp)();return(0,s.jsxs)(ae,{children:[(0,s.jsxs)(ie,{children:[(0,s.jsx)(se,{onClick:()=>e("/"),children:"Purple Here"}),(0,s.jsxs)(le,{children:[(0,s.jsx)(ce,{onClick:()=>e("/about"),children:"About Us"}),(0,s.jsx)(ce,{onClick:()=>e("/service"),children:"Services"}),(0,s.jsx)(ce,{onClick:()=>e("/pos"),children:"POS System Access"})]})]}),(0,s.jsxs)(de,{children:[(0,s.jsx)(ue,{children:"Our Services"}),(0,s.jsxs)(pe,{children:[(0,s.jsxs)(fe,{children:[(0,s.jsx)(he,{children:"\ud83c\udfea"}),(0,s.jsx)(me,{children:"Food Court Management"}),(0,s.jsx)(ge,{children:"An integrated solution for efficiently managing food courts with multiple stores"}),(0,s.jsxs)(xe,{children:[(0,s.jsx)(ye,{children:"Food court general manager hierarchy"}),(0,s.jsx)(ye,{children:"Rent and contract management"}),(0,s.jsx)(ye,{children:"Real-time monitoring of tenant stores"}),(0,s.jsx)(ye,{children:"Integrated sales analysis and reports"}),(0,s.jsx)(ye,{children:"Tenant support ticket system"})]})]}),(0,s.jsxs)(fe,{children:[(0,s.jsx)(he,{children:"\ud83c\udfe2"}),(0,s.jsx)(me,{children:"Brand Integration"}),(0,s.jsx)(ge,{children:"A centralized management system for brands operating multiple locations"}),(0,s.jsxs)(xe,{children:[(0,s.jsx)(ye,{children:"Brand general manager authority system"}),(0,s.jsx)(ye,{children:"All-branch performance dashboard"}),(0,s.jsx)(ye,{children:"Unified menu and pricing management"}),(0,s.jsx)(ye,{children:"Franchise support system"}),(0,s.jsx)(ye,{children:"Branch-by-branch comparative analysis"})]})]}),(0,s.jsxs)(fe,{children:[(0,s.jsx)(he,{children:"\ud83d\udcb3"}),(0,s.jsx)(me,{children:"POS System"}),(0,s.jsx)(ge,{children:"An all-in-one POS solution for intuitive and fast store operations"}),(0,s.jsxs)(xe,{children:[(0,s.jsx)(ye,{children:"Touch-based intuitive UI"}),(0,s.jsx)(ye,{children:"Real-time order management and kitchen display"}),(0,s.jsx)(ye,{children:"Multiple payment method support"}),(0,s.jsx)(ye,{children:"Menu, option, and category management"}),(0,s.jsx)(ye,{children:"Customer display integration"})]})]}),(0,s.jsxs)(fe,{children:[(0,s.jsx)(he,{children:"\ud83d\udcf1"}),(0,s.jsx)(me,{children:"Mobile Ordering"}),(0,s.jsx)(ge,{children:"A convenient mobile ordering system via QR codes"}),(0,s.jsxs)(xe,{children:[(0,s.jsx)(ye,{children:"Instant ordering via QR code scan"}),(0,s.jsx)(ye,{children:"Automatic table number recognition"}),(0,s.jsx)(ye,{children:"Real-time order notifications"}),(0,s.jsx)(ye,{children:"Customer order history management"}),(0,s.jsx)(ye,{children:"Mobile payment integration"})]})]}),(0,s.jsxs)(fe,{children:[(0,s.jsx)(he,{children:"\ud83d\udcca"}),(0,s.jsx)(me,{children:"Analytics & Reports"}),(0,s.jsx)(ge,{children:"Powerful analytics tools for data-driven decision making"}),(0,s.jsxs)(xe,{children:[(0,s.jsx)(ye,{children:"Daily/weekly/monthly sales analysis"}),(0,s.jsx)(ye,{children:"Popular menu and trend analysis"}),(0,s.jsx)(ye,{children:"Time-based order pattern analysis"}),(0,s.jsx)(ye,{children:"Customer analysis and return rates"}),(0,s.jsx)(ye,{children:"Customizable reports"})]})]}),(0,s.jsxs)(fe,{children:[(0,s.jsx)(he,{children:"\ud83d\udc65"}),(0,s.jsx)(me,{children:"Unified Management"}),(0,s.jsx)(ge,{children:"Manage staff, customers, and invoices all in one place"}),(0,s.jsxs)(xe,{children:[(0,s.jsx)(ye,{children:"Staff account and permission management"}),(0,s.jsx)(ye,{children:"Customer information and points management"}),(0,s.jsx)(ye,{children:"Automatic invoice generation system"}),(0,s.jsx)(ye,{children:"Promotion and discount management"}),(0,s.jsx)(ye,{children:"Inventory management (optional)"})]})]})]}),(0,s.jsxs)(be,{children:[(0,s.jsx)(ve,{children:"Flexible Pricing Plans"}),(0,s.jsx)(we,{children:"We offer various pricing plans based on your store size and needs. From small restaurants to large food courts, we'll find the optimal solution for you."}),(0,s.jsx)(we,{children:(0,s.jsx)("strong",{children:"Start now and experience a 30-day free trial!"})}),(0,s.jsx)(ke,{onClick:()=>e("/pos"),children:"Start Free Trial"})]})]})]})},je=[{role:"System Admin",email:"irene@irenewp.com",password:"admin123",description:"System Administrator (All Permissions)",color:"#DC2626"},{role:"Foodcourt General",email:"foodcourt_general@orderhere.center",password:"test123",description:"Foodcourt General Manager (Overall Foodcourt Management)",color:"#7C3AED"},{role:"Brand General",email:"brand_general@orderhere.center",password:"test123",description:"Brand General Manager (Overall Brand Management)",color:"#059669"},{role:"Foodcourt Manager",email:"foodcourt_manager1@orderhere.center",password:"test123",description:"Foodcourt Manager (Specific Foodcourt Management)",color:"#2563EB"},{role:"Brand Manager",email:"brand_manager1@orderhere.center",password:"test123",description:"Brand Manager (Specific Brand Management)",color:"#EA580C"},{role:"Restaurant Admin",email:"admin@kdine.com",password:"restaurant123",description:"Test Restaurant Updated - Restaurant Admin (INACTIVE)",color:"#0891B2"},{role:"Staff",email:"staff@kdine.com",password:"staff123",description:"Test Restaurant Updated - Staff (INACTIVE)",color:"#65A30D"}],Ce=o.Ay.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,Ee=o.Ay.div`
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
`,Ae=o.Ay.div`
  flex: 1;
  padding: 60px;
  
  @media (max-width: 968px) {
    padding: 40px 30px;
  }
`,Fe=o.Ay.div`
  flex: 1;
  background: #F8FAFC;
  padding: 60px;
  border-left: 1px solid #E6EBF1;
  
  @media (max-width: 968px) {
    padding: 40px 30px;
    border-left: none;
    border-top: 1px solid #E6EBF1;
  }
`,_e=o.Ay.img`
  max-width: 200px;
  max-height: 80px;
  object-fit: contain;
  object-position: left center;
  margin-bottom: 24px;
  display: block;
`,Pe=o.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,ze=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Re=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,Oe=o.Ay.input`
  padding: 14px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Te=o.Ay.button`
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
`,Be=o.Ay.div`
  background: #FEF2F2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #FEE2E2;
`,Ie=o.Ay.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 20px;
`,Ne=o.Ay.div`
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
`,De=o.Ay.div`
  font-size: 14px;
  font-weight: 700;
  color: ${e=>e.color};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Le=o.Ay.div`
  display: flex;
  gap: 20px;
  margin: 8px 0;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 4px;
  }
`,$e=o.Ay.div`
  font-size: 13px;
  color: #374151;
  
  strong {
    color: #0A2540;
    font-weight: 600;
  }
`,Me=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`,qe=o.Ay.div`
  width: 100%;
  height: 1px;
  background: #E6EBF1;
  margin: 30px 0;
`,He=o.Ay.div`
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
`,Ue=()=>{const t=(0,r.Zp)(),n=(0,r.zy)(),{login:o,user:a,isAuthenticated:i,isLoading:l}=(0,m.As)(),[c,d]=(0,e.useState)(""),[u,p]=(0,e.useState)(""),[f,h]=(0,e.useState)(""),[g,x]=(0,e.useState)(!1),[y,b]=(0,e.useState)("");(0,e.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?b(t.brand_logo):t.brandLogo?b(t.brandLogo):t.logo&&b(t.logo)}}catch(f){console.error("Failed to fetch site settings:",f)}})()},[]),(0,e.useEffect)(()=>{if(!l&&i&&a){var e,r;const o=null===(e=n.state)||void 0===e||null===(r=e.from)||void 0===r?void 0:r.pathname;if(o&&"/pos"!==o)t(o,{replace:!0});else switch(a.role){case"System Admin":t("/pos/admin/dashboard",{replace:!0});break;case"Foodcourt General":t("/pos/foodcourt/general/dashboard",{replace:!0});break;case"Brand General":t("/pos/brand/general/dashboard",{replace:!0});break;case"Foodcourt Manager":t("/pos/foodcourt/dashboard",{replace:!0});break;case"Brand Manager":t("/pos/brand/dashboard",{replace:!0});break;case"Restaurant Admin":a.restaurantId?t(`/restaurant/${a.restaurantId}/dashboard`,{replace:!0}):t("/pos/restaurant/dashboard",{replace:!0});break;case"Staff":a.restaurantId?t(`/restaurant/${a.restaurantId}/pos-terminal`,{replace:!0}):t("/pos/basic",{replace:!0});break;default:t("/pos/basic",{replace:!0})}}},[l,i,a,t,n]);return(0,s.jsx)(Ce,{children:(0,s.jsxs)(Ee,{children:[(0,s.jsxs)(Ae,{children:[y&&(0,s.jsx)(_e,{src:y,alt:"Brand Logo"}),(0,s.jsxs)(Pe,{onSubmit:async e=>{e.preventDefault(),h(""),x(!0);try{await o(c,u)||h("Invalid email/username or password")}catch(f){console.error("Login error:",f),h("Login failed. Please try again.")}finally{x(!1)}},children:[(0,s.jsxs)(ze,{children:[(0,s.jsx)(Re,{children:"Email or Username"}),(0,s.jsx)(Oe,{type:"text",value:c,onChange:e=>d(e.target.value),placeholder:"Enter your email or username",required:!0})]}),(0,s.jsxs)(ze,{children:[(0,s.jsx)(Re,{children:"Password"}),(0,s.jsx)(Oe,{type:"password",value:u,onChange:e=>p(e.target.value),placeholder:"Enter your password",required:!0})]}),f&&(0,s.jsx)(Be,{children:f}),(0,s.jsx)(Te,{type:"submit",disabled:g,children:g?"Signing in...":"Sign In"})]}),(0,s.jsx)(qe,{}),(0,s.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",fontSize:"14px"},children:[(0,s.jsx)("p",{children:"POS System v2.0"}),(0,s.jsx)("p",{style:{marginTop:"8px",fontSize:"12px"},children:"Multi-tenant architecture with role-based access control"})]})]}),(0,s.jsxs)(Fe,{children:[(0,s.jsx)(Ie,{children:"Available Accounts"}),(0,s.jsxs)(He,{children:[(0,s.jsx)("strong",{children:"Quick Login:"})," Click any account card below to auto-fill credentials"]}),je.map(e=>(0,s.jsxs)(Ne,{color:e.color,onClick:()=>(e=>{d(e.email),p(e.password)})(e),children:[(0,s.jsx)(De,{color:e.color,children:e.role}),(0,s.jsxs)(Le,{children:[(0,s.jsxs)($e,{children:[(0,s.jsx)("strong",{children:"Email:"})," ",e.email]}),(0,s.jsxs)($e,{children:[(0,s.jsx)("strong",{children:"Pass:"})," ",e.password]})]}),(0,s.jsx)(Me,{children:e.description})]},e.email)),(0,s.jsx)(qe,{}),(0,s.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Note:"})," Using real database authentication."]}),(0,s.jsx)("p",{children:"Enter the correct password for each account."})]})]})]})})},We=(0,e.createContext)(void 0),Ge=()=>{const t=(0,e.useContext)(We);if(!t)throw new Error("useMobileOrder must be used within MobileOrderProvider");return t},Ve=t=>{let{children:n}=t;const[r,o]=(0,e.useState)(null),[a,i]=(0,e.useState)(()=>sessionStorage.getItem("orderType")),l=(0,e.useCallback)(e=>{i(e),e?sessionStorage.setItem("orderType",e):sessionStorage.removeItem("orderType")},[]),[c,d]=(0,e.useState)([]),[u,p]=(0,e.useState)(null),[f]=(0,e.useState)([]),[h,m]=(0,e.useState)(!1),[g,x]=(0,e.useState)(null),y=c.reduce((e,t)=>e+t.totalPrice,0),b={currentStore:r,setCurrentStore:o,orderType:a,setOrderType:l,cartItems:c,cartTotal:y,addToCart:(0,e.useCallback)((e,t,n,r)=>{let o=r||"";if(e.is_set_menu&&e.set_items&&e.set_items.length>0){const t=e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ");o=o?`[${t}] ${o}`:`[${t}]`}const a=`${e.id}-${n.join("-")}-${Date.now()}`;let i=e.price;const s=[],l=[];e.optionGroups&&n.forEach(t=>{var n;const r=null===(n=e.optionGroups)||void 0===n?void 0:n.flatMap(e=>e.options).find(e=>e.id===t);r&&(i+=r.price,s.push({id:r.id,name:r.name,price:r.price}),l.push(r.name))}),i*=t;const c={id:a,menuItem:e,quantity:t,selectedOptions:l,selectedOptionsData:s,specialInstructions:o,totalPrice:i};d(e=>[...e,c])},[]),updateCartItem:(0,e.useCallback)((e,t)=>{d(n=>n.map(n=>{if(n.id===e){const e=n.totalPrice/n.quantity;return{...n,quantity:t,totalPrice:e*t}}return n}))},[]),removeFromCart:(0,e.useCallback)(e=>{d(t=>t.filter(t=>t.id!==e))},[]),clearCart:(0,e.useCallback)(()=>{d([])},[]),currentOrder:u,setCurrentOrder:p,orderHistory:f,isLoading:h,setIsLoading:m,error:g,setError:x,currency:(null===r||void 0===r?void 0:r.currency)||"RM"};return(0,s.jsx)(We.Provider,{value:b,children:n})};var Ye=n(6910);const Qe=o.i7`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,Ke=o.i7`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,Je=o.Ay.div`
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
  animation: ${Qe} 0.2s ease-out;
`,Xe=o.Ay.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  animation: ${Ke} 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`,Ze=o.Ay.div`
  padding: 24px 24px 16px;
  text-align: center;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"success":return"#F0FDF4";case"warning":return"#FFFBEB";default:return"#EFF6FF"}}};
`,et=o.Ay.div`
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
`,tt=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,nt=o.Ay.div`
  padding: 16px 24px 24px;
  text-align: center;
`,rt=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
`,ot=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
`,at=o.Ay.button`
  flex: 1;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${e=>"secondary"===e.variant?"\n    background: #F3F4F6;\n    border: none;\n    color: #4B5563;\n\n    &:active {\n      background: #E5E7EB;\n    }\n  ":`\n    background: ${(()=>{switch(e.buttonType){case"error":return"#DC2626";case"success":return"#16A34A";case"warning":return"#D97706";default:return"#635BFF"}})()};\n    border: none;\n    color: white;\n\n    &:active {\n      opacity: 0.9;\n    }\n  `}
`,it=()=>(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,s.jsx)("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),(0,s.jsx)("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}),st=()=>(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,s.jsx)("path",{d:"M9 12l2 2 4-4"})]}),lt=()=>(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("path",{d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"}),(0,s.jsx)("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),(0,s.jsx)("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),ct=()=>(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,s.jsx)("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),(0,s.jsx)("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})]}),dt=e=>{let{isOpen:t,onClose:n,type:r="info",title:o,message:a,confirmText:i="OK",cancelText:l="Cancel",onConfirm:c,showCancel:d=!1}=e;if(!t)return null;return(0,s.jsx)(Je,{onClick:n,children:(0,s.jsxs)(Xe,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(Ze,{type:r,children:[(0,s.jsx)(et,{type:r,children:(()=>{switch(r){case"error":return(0,s.jsx)(it,{});case"success":return(0,s.jsx)(st,{});case"warning":return(0,s.jsx)(lt,{});default:return(0,s.jsx)(ct,{})}})()}),(0,s.jsx)(tt,{children:o})]}),(0,s.jsx)(nt,{children:(0,s.jsx)(rt,{children:a})}),(0,s.jsxs)(ot,{children:[d&&(0,s.jsx)(at,{variant:"secondary",onClick:n,children:l}),(0,s.jsx)(at,{buttonType:r,onClick:()=>{c&&c(),n()},children:i})]})]})})},ut=dt,pt=o.Ay.div`
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
`,ft=o.Ay.div`
  text-align: center;
  margin-bottom: 48px;
`,ht=o.Ay.h1`
  font-size: 28px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,mt=o.Ay.p`
  font-size: 15px;
  color: #6B7C93;
  margin: 0;
`,gt=o.Ay.div`
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
`,xt=o.Ay.button`
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
`,yt=o.Ay.div`
  font-size: 48px;
  margin-bottom: 4px;
`,bt=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,vt=o.Ay.div`
  margin-top: auto;
  padding-top: 48px;
  padding-bottom: 24px;
  text-align: center;
  font-size: 12px;
  color: #8898AA;
`,wt=()=>{const t=(0,r.Zp)(),{slug:n}=(0,r.g)(),[o]=(0,r.ok)(),{setCurrentStore:a,setIsLoading:i,clearCart:l,orderType:c,setOrderType:d,cartItems:u}=Ge(),[p,f]=(0,e.useState)(null),[h,m]=(0,e.useState)(null),[g,x]=(0,e.useState)(!1),[y,b]=(0,e.useState)(null);(0,e.useEffect)(()=>{(async()=>{if(n)try{const t=await fetch(`${Ye.JR}/api/mobile/store/${n}`);if(t.ok){const r=await t.json();var e;if(r.success&&r.data)console.log("Store data loaded:",r.data),m({id:(null===(e=r.data.id)||void 0===e?void 0:e.toString())||"1",slug:r.data.slug||n,name:r.data.name||"Restaurant",description:r.data.description||"Welcome to our restaurant",logo:r.data.logo||"/images/store-logo.png",isOpen:!1!==r.data.isOpen,openingHours:r.data.openingHours||{},openingTime:r.data.openingTime,closingTime:r.data.closingTime,timeZone:r.data.timeZone,orderTypes:r.data.orderTypes||{dineIn:!0,takeaway:!0,pickup:!1,delivery:!1}})}}catch(t){console.error("Error loading store data:",t)}})()},[n]);const v=e=>({"dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pre-order Pickup",delivery:"Delivery"}[e]||e),w=async e=>{if(console.log("Order type selected:",e),console.log("Previous order type:",c),console.log("Cart items count:",u.length),u.length>0&&c&&c!==e)return b(e),void x(!0);await k(e)},k=async e=>{i(!0);try{const r="guest_"+Date.now();localStorage.setItem("mobileToken",r);const o=n||sessionStorage.getItem("restaurantSlug");if(!o)throw new Error("Restaurant not found");const i=h||{id:"1",slug:o,name:"Restaurant",description:"Welcome to our restaurant",logo:"/images/store-logo.png",isOpen:!0,openingHours:{}};a(i),c&&c!==e&&(console.log("Order type changed - clearing cart"),l()),d(e),sessionStorage.setItem("restaurantId",i.id),sessionStorage.removeItem("scheduledPickupTime"),t(`/mobile/${o}/menu`)}catch(r){console.error("Error initializing order:",r),alert("Error initializing order. Please try again.")}finally{i(!1)}};(0,e.useEffect)(()=>{const e=o.get("table");if(e)f(e),sessionStorage.setItem("tableNumber",e);else{const e=sessionStorage.getItem("tableNumber");e&&f(e)}n&&sessionStorage.setItem("restaurantSlug",n)},[o,n]);const S=(null===h||void 0===h?void 0:h.orderTypes)||{dineIn:!0,takeaway:!0,pickup:!1,delivery:!1};return(0,s.jsxs)(pt,{children:[(0,s.jsxs)(ft,{children:[(0,s.jsx)(ht,{children:(null===h||void 0===h?void 0:h.name)||"Welcome"}),(0,s.jsx)(mt,{children:"How would you like your order?"})]}),p&&(0,s.jsxs)("div",{style:{margin:"0 0 24px 0",padding:"12px 20px",background:"#F0F4FF",borderRadius:"8px",color:"#635BFF",fontSize:"14px",fontWeight:"500",textAlign:"center",border:"1px solid #C7D2FE"},children:["Table ",p]}),(0,s.jsxs)(gt,{children:[S.dineIn&&(0,s.jsxs)(xt,{onClick:()=>w("dine-in"),children:[(0,s.jsx)(yt,{children:"\ud83c\udf7d\ufe0f"}),(0,s.jsx)(bt,{children:"Dine In"})]}),S.takeaway&&(0,s.jsxs)(xt,{onClick:()=>w("takeaway"),children:[(0,s.jsx)(yt,{children:"\ud83e\udd61"}),(0,s.jsx)(bt,{children:"Takeaway"})]}),S.pickup&&(0,s.jsxs)(xt,{onClick:()=>w("pickup"),children:[(0,s.jsx)(yt,{children:"\ud83d\udce6"}),(0,s.jsx)(bt,{children:"Pre-order Pickup"})]}),S.delivery&&(0,s.jsxs)(xt,{onClick:()=>w("delivery"),children:[(0,s.jsx)(yt,{children:"\ud83d\ude9a"}),(0,s.jsx)(bt,{children:"Delivery"})]})]}),(0,s.jsx)(vt,{children:"Powered by Purple Here POS"}),(0,s.jsx)(ut,{isOpen:g,onClose:()=>{if(x(!1),b(null),c){const e=n||sessionStorage.getItem("restaurantSlug");t(`/mobile/${e}/menu`)}},type:"warning",title:"Change Order Type?",message:`You are currently ordering as ${v(c||"")}. Changing to ${v(y||"")} will reset your cart.`,confirmText:"Continue",cancelText:"Back to Menu",onConfirm:async()=>{x(!1),y&&await k(y),b(null)},showCancel:!0})]})},kt=()=>{if(!/iPhone|iPad|iPod/.test(navigator.userAgent))return()=>{};const e=e=>{const t=e.target;"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName||setTimeout(()=>{window.scrollTo(0,window.scrollY)},100)};return document.addEventListener("focusout",e),()=>{document.removeEventListener("focusout",e)}},St=o.Ay.div`
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
`,jt=o.Ay.header`
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
`,Ct=o.Ay.button`
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
`,Et=o.Ay.h1`
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
`,At=o.Ay.div`
  width: 40px; /* Match back button width for centering */
  height: 40px; /* Match back button height */
`,Ft=o.Ay.main`
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
`,_t=o.Ay.nav`
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
`,Pt=o.Ay.button`
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
`,zt=o.Ay.div`
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
`,Rt=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>{switch(e.orderType){case"dine-in":return"#059669";case"takeaway":return"#D97706";case"delivery":return"#2563EB";case"pickup":return"#7C3AED";default:return"#6B7280"}}};
  white-space: nowrap;
`,Ot=t=>{let{children:n,title:o,showBack:a=!1,onBack:i,currentPage:l,cartItemCount:c=0}=t;const d=(0,r.Zp)(),{currentStore:u,orderType:p}=Ge();(0,e.useEffect)(()=>kt(),[]);const f=e=>{switch(e){case"dine-in":return"Dine-In";case"takeaway":return"Takeaway";case"delivery":return"Delivery";case"pickup":return"Pre-Order Pickup";default:return null}},h=(null===u||void 0===u?void 0:u.slug)||sessionStorage.getItem("restaurantSlug")||"default",m=sessionStorage.getItem("tableNumber"),g=e=>{d(e===`/mobile/${h}`&&m?`${e}?table=${m}`:e)};return(0,s.jsxs)(St,{children:[o&&(0,s.jsxs)(jt,{children:[a?(0,s.jsx)(Ct,{onClick:i,children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M15 18L9 12L15 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}):(0,s.jsx)(At,{}),(0,s.jsx)(Et,{children:o}),p&&"home"!==l&&f(p)?(0,s.jsxs)(Rt,{orderType:p,children:[(0,s.jsx)("span",{children:(e=>{switch(e){case"dine-in":return"\ud83c\udf7d\ufe0f";case"takeaway":return"\ud83d\udecd\ufe0f";case"delivery":return"\ud83d\ude9a";case"pickup":return"\u23f0";default:return""}})(p)}),(0,s.jsx)("span",{children:f(p)})]}):(0,s.jsx)(At,{})]}),(0,s.jsx)(Ft,{children:n}),(0,s.jsxs)(_t,{children:[(0,s.jsxs)(Pt,{active:"home"===l,onClick:()=>g(`/mobile/${h}`),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M9 22V12H15V22",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,s.jsx)("span",{children:"Home"})]}),(0,s.jsxs)(Pt,{active:"menu"===l,onClick:()=>g(`/mobile/${h}/menu`),children:[(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M4 6H20M4 12H20M4 18H20",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),(0,s.jsx)("span",{children:"Menu"})]}),(0,s.jsxs)(Pt,{active:"cart"===l,style:{position:"relative"},onClick:()=>g(`/mobile/${h}/cart`),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,s.jsx)("path",{d:"M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,s.jsx)("path",{d:"M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),c>0&&(0,s.jsx)(zt,{children:c}),(0,s.jsx)("span",{children:"Cart"})]}),(0,s.jsxs)(Pt,{active:"orders"===l,onClick:()=>g(`/mobile/${h}/account`),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("circle",{cx:"12",cy:"7",r:"4",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,s.jsx)("span",{children:"Account"})]})]})]})};var Tt=n(6038);const Bt=o.Ay.div`
  background: white;
  padding: 16px;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #E5E7EB;
  border-radius: 8px;
`,It=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,Nt=o.Ay.div`
  font-size: 14px;
  color: ${e=>e.isOpen?"#10B981":"#EF4444"};
  font-weight: 500;
`,Dt=o.Ay.div`
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
`,Lt=o.Ay.button`
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
`,$t=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
`,Mt=o.Ay.div`
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
`,qt=o.Ay.div`
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
`,Ht=t=>{let{src:n,alt:r,fallback:o}=t;const[a,i]=(0,e.useState)(!1),[l,c]=(0,e.useState)(!1),d=(0,e.useRef)(null);return(0,e.useEffect)(()=>{const e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&d.current&&(d.current.src=n,e.disconnect())})},{rootMargin:"100px"});return d.current&&e.observe(d.current),()=>e.disconnect()},[n]),l?(0,s.jsx)("span",{children:o}):(0,s.jsx)("img",{ref:d,alt:r,style:{opacity:a?1:0,transition:"opacity 0.3s"},onLoad:()=>i(!0),onError:()=>c(!0)})},Ut=o.Ay.div`
  padding: 12px;
`,Wt=o.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
  line-height: 1.3;
`,Gt=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,Vt=o.Ay.div`
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
`,Yt=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
`,Qt=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #9CA3AF;
`,Kt=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #9CA3AF;
  font-size: 14px;
`,Jt=o.Ay.div`
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
`,Xt=o.Ay.button`
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
`,Zt=o.Ay.div`
  height: 20px;
  width: 100%;
`,en=()=>{const{slug:t}=(0,r.g)(),n=(0,r.Zp)(),{currentStore:o,setCurrentStore:a,cartItems:i,currency:l,isLoading:c,setIsLoading:d,setError:u}=Ge(),[p,f]=(0,e.useState)([]),[h,m]=(0,e.useState)([]),[g,x]=(0,e.useState)("all"),[y,b]=(0,e.useState)(null),[v,w]=(0,e.useState)(!1),k=(0,e.useRef)(null),S=(0,e.useRef)(null),j=(0,e.useCallback)(async function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(t){1===n?d(!0):w(!0);try{if(1===n){const e=await fetch(`/api/restaurants/slug/${t}`);if(e.ok){const t=await e.json();t.success&&t.data&&a({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo_url||"",isOpen:"active"===t.data.status,openingHours:t.data.opening_hours||{}})}}let o=`/api/mobile/menu/${t}?page=${n}&limit=20`;e&&"all"!==e&&(o+=`&categoryId=${e}`);const i=await fetch(o);if(i.ok){const e=await i.json();if(e.success&&e.data){1===n&&f(e.data.categories||[]);const t=(e.data.items||[]).map(e=>{var t;return{id:e.id.toString(),code:e.code,name:e.name,price:parseFloat(e.price),categoryId:(null===(t=e.categoryId)||void 0===t?void 0:t.toString())||"",emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image,is_set_menu:e.is_set_menu||!1,set_items:e.set_items}});m(r?e=>[...e,...t]:t),e.pagination&&b(e.pagination)}}}catch(o){u("Failed to load menu"),console.error("Error loading menu:",o)}finally{d(!1),w(!1)}}},[t,a,u,d]);(0,e.useEffect)(()=>{j()},[t]);const C=(0,e.useCallback)(e=>{x(e),m([]),b(null),j("all"===e?void 0:e,1,!1)},[j]),E=(0,e.useCallback)(()=>{if(null===y||void 0===y||!y.hasMore||v)return;const e=y.page+1;j("all"===g?void 0:g,e,!0)},[y,v,g,j]);(0,e.useEffect)(()=>(S.current&&S.current.disconnect(),S.current=new IntersectionObserver(e=>{e[0].isIntersecting&&null!==y&&void 0!==y&&y.hasMore&&!v&&E()},{rootMargin:"100px"}),k.current&&S.current.observe(k.current),()=>{S.current&&S.current.disconnect()}),[null===y||void 0===y?void 0:y.hasMore,v,E]);const A=(0,e.useCallback)(e=>{n(`/mobile/${t}/item/${e.id}`)},[n,t]),F=(0,e.useCallback)(()=>{n(`/mobile/${t}/cart`)},[n,t]),_=(0,e.useCallback)(e=>(0,s.jsxs)(Mt,{onClick:()=>A(e),children:[e.is_set_menu&&(0,s.jsx)(Vt,{children:"SET"}),(0,s.jsx)(qt,{hasImage:!!e.image,children:e.image?(0,s.jsx)(Ht,{src:e.image,alt:e.name,fallback:e.emoji||"\ud83c\udf7d\ufe0f"}):(0,s.jsx)("span",{children:e.emoji||"\ud83c\udf7d\ufe0f"})}),(0,s.jsxs)(Ut,{children:[(0,s.jsxs)(Wt,{children:[e.code?`${e.code} `:"",e.name]}),(0,s.jsx)(Gt,{children:(0,Tt.vv)(e.price,l)}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,s.jsx)(Yt,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")})]})]},e.id),[A,l]);return c?(0,s.jsx)(Ot,{title:"Menu",currentPage:"menu",children:(0,s.jsx)(Qt,{children:"Loading menu..."})}):(0,s.jsxs)(Ot,{title:"Menu",currentPage:"menu",cartItemCount:i.length,children:[o&&(0,s.jsxs)(Bt,{children:[(0,s.jsx)(It,{children:o.name}),(0,s.jsx)(Nt,{isOpen:o.isOpen,children:o.isOpen?"\u2713 Open Now":"\u2717 Closed"})]}),(0,s.jsxs)(Dt,{children:[(0,s.jsx)(Lt,{active:"all"===g,onClick:()=>C("all"),children:"All Items"}),p.map(e=>(0,s.jsxs)(Lt,{active:g===e.id,onClick:()=>C(e.id),children:[e.emoji," ",e.name]},e.id))]}),h.length>0?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)($t,{children:h.map(_)}),(0,s.jsx)(Zt,{ref:k}),v&&(0,s.jsx)(Kt,{children:"Loading more..."})]}):(0,s.jsxs)(Jt,{children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 24L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"M12 12V16M12 8H12.01",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,s.jsx)("p",{children:"No items available in this category"})]}),i.length>0&&(0,s.jsxs)(Xt,{onClick:F,children:[(0,s.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,s.jsx)("path",{d:"M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,s.jsx)("path",{d:"M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),"View Cart (",i.length,")"]})]})};const tn=new class{async request(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`/api${e}`;console.log("API Request:",{url:n,endpoint:e,method:t.method||"GET"});const r={"Content-Type":"application/json",...t.headers||{}};try{const e=await fetch(n,{...t,credentials:"include",headers:r});if(console.log("API Response:",{status:e.status,ok:e.ok}),!e.ok){const t=await e.text();console.error("API Error Response:",t);try{const n=JSON.parse(t);throw new Error(n.message||`Request failed: ${e.status}`)}catch{throw new Error(`Request failed: ${e.status}`)}}const o=await e.text();if(console.log("API Response Body:",o),o)try{return JSON.parse(o)}catch{return{success:!0}}return{success:!0}}catch(o){throw console.error("\u274c API request failed:",o),o}}async login(e,t){return this.request("/mobile/auth/login",{method:"POST",body:JSON.stringify({email:e,password:t})})}async register(e){return this.request("/mobile/auth/register",{method:"POST",body:JSON.stringify(e)})}async guestToken(){return this.request("/mobile/auth/guest",{method:"POST"})}async guestCheckout(){return this.request("/mobile/auth/guest",{method:"POST"})}async getStoreByQRCode(e){return this.request(`/mobile/store/qr/${e}`)}async getMenu(e){return this.request(`/mobile/menu/${e}`)}async getItemDetails(e){return this.request(`/mobile/menu/item/${e}`)}async validateCart(e,t){return this.request("/mobile/cart/validate",{method:"POST",body:JSON.stringify({items:e,storeId:t})})}async createOrder(e){return this.request("/mobile/order",{method:"POST",body:JSON.stringify(e)})}async getOrder(e){return this.request(`/mobile/order/${e}`)}async cancelOrder(e){return this.request(`/mobile/order/${e}/cancel`,{method:"POST"})}async createPaymentIntent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"RM";return this.request("/mobile/payment/intent",{method:"POST",body:JSON.stringify({amount:e,currency:t})})}async confirmPayment(e,t){return this.request("/mobile/payment/confirm",{method:"POST",body:JSON.stringify({paymentIntentId:e,orderId:t})})}async getOrders(){return this.request("/mobile/orders")}},nn=o.Ay.div`
  background: white;
  margin: 0 0 16px 0;
  padding-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,rn=o.Ay.div`
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
`,on=o.Ay.div`
  padding: 0 16px;
`,an=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,sn=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
`,ln=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`,cn=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6B7280;
  
  svg {
    width: 16px;
    height: 16px;
  }
`,dn=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,un=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,pn=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,fn=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
  font-size: 14px;
  color: #4B5563;
`,hn=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,mn=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,gn=o.Ay.span`
  font-size: 12px;
  color: #EF4444;
  font-weight: 500;
  background: #FEE2E2;
  padding: 2px 8px;
  border-radius: 4px;
`,xn=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`,yn=o.Ay.button`
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
`,bn=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,vn=o.Ay.label`
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
`,wn=o.Ay.input`
  width: 18px;
  height: 18px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`,kn=o.Ay.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`,Sn=o.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,jn=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Cn=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,En=o.Ay.button`
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
`,An=o.Ay.span`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  min-width: 30px;
  text-align: center;
`,Fn=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 80px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,_n=o.Ay.textarea`
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
`,Pn=o.Ay.button`
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
`,zn=o.Ay.span`
  font-size: 18px;
`,Rn=()=>{const{slug:t,itemId:n}=(0,r.g)(),o=(0,r.Zp)(),{addToCart:a,currency:i}=Ge(),{getItemById:l,optionGroups:c}=(0,p.b)(),[d,u]=(0,e.useState)(null),[f,h]=(0,e.useState)([]),[m,g]=(0,e.useState)(1),[x,y]=(0,e.useState)(""),[b,v]=(0,e.useState)(!0);(0,e.useEffect)(()=>{if(!n)return;const e=l(n);e?(u(e),v(!1)):w()},[n]);const w=async()=>{if(n)try{const e=await tn.getItemDetails(n);if(e.data&&e.data.success&&e.data.data){const t=e.data.data,n={id:t.id,name:t.name,price:parseFloat(t.price),emoji:t.emoji,image:t.image,description:t.description||"",preparationTime:t.preparationTime||15,calories:t.calories||0,isAvailable:!1!==t.isAvailable,optionGroups:t.optionGroups||[]};u(n)}else console.error("Item not found"),o(-1)}catch(e){console.error("Error loading item details:",e),o(-1)}finally{v(!1)}},k=null!==d&&void 0!==d&&d.optionGroups?Array.isArray(d.optionGroups)&&d.optionGroups.length>0&&"object"===typeof d.optionGroups[0]?d.optionGroups:d.optionGroups.map(e=>c.find(t=>t.id===e)).filter(e=>void 0!==e):[],S=(e,t,n,r)=>{if(n)h(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]);else{const n=k.find(e=>e.id===t);if(n){const t=n.options.map(e=>e.id),o=f.includes(e);h(o&&!r?e=>e.filter(e=>!t.includes(e)):n=>[...n.filter(e=>!t.includes(e)),e])}}},j=()=>!k.length||k.filter(e=>e.required).every(e=>f.some(t=>e.options.some(e=>e.id===t)));return b?(0,s.jsx)(Ot,{title:"Loading...",showBack:!0,onBack:()=>o(-1),children:(0,s.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#9CA3AF"},children:"Loading item details..."})}):d?(0,s.jsxs)(Ot,{title:d.code?`${d.code} ${d.name}`:d.name,showBack:!0,onBack:()=>o(-1),children:[(0,s.jsxs)(nn,{children:[(0,s.jsx)(rn,{hasImage:!!d.image,children:d.image?(0,s.jsx)("img",{src:d.image,alt:d.name}):d.emoji}),(0,s.jsxs)(on,{children:[(0,s.jsxs)(an,{children:[d.code?`${d.code} `:"",d.name]}),(0,s.jsx)(sn,{children:d.description}),(0,s.jsxs)(ln,{children:[d.preparationTime>0&&(0,s.jsxs)(cn,{children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M12 6V12L16 14",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2"})]}),d.preparationTime," min"]}),d.calories&&(0,s.jsxs)(cn,{children:[(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 2 11 2C11 6.41828 14.5817 10 19 10V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),d.calories," cal"]})]})]})]}),d.is_set_menu&&d.set_items&&d.set_items.length>0&&(0,s.jsxs)(dn,{children:[(0,s.jsx)(un,{children:"\ud83c\udf71 This set includes:"}),(0,s.jsx)(pn,{children:d.set_items.map((e,t)=>(0,s.jsxs)(fn,{children:["\u2022 ",e.name," x",e.quantity]},t))})]}),null===k||void 0===k?void 0:k.map(e=>(0,s.jsxs)(hn,{children:[(0,s.jsxs)(mn,{children:[e.name,e.required&&(0,s.jsx)(gn,{children:"Required"})]}),e.multiple?(0,s.jsx)(bn,{children:e.options.map(t=>(0,s.jsxs)(vn,{children:[(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,s.jsx)(wn,{type:"checkbox",checked:f.includes(t.id),onChange:()=>S(t.id,e.id,e.multiple,e.required)}),(0,s.jsx)(kn,{children:t.name})]}),t.price>0&&(0,s.jsxs)(Sn,{children:["+",(0,Tt.vv)(t.price,i)]})]},t.id))}):(0,s.jsx)(xn,{children:e.options.map(t=>(0,s.jsxs)(yn,{selected:f.includes(t.id),onClick:()=>S(t.id,e.id,e.multiple,e.required),children:[(0,s.jsx)("div",{children:t.name}),t.price>0&&(0,s.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:["+",(0,Tt.vv)(t.price,i)]})]},t.id))})]},e.id)),(0,s.jsxs)(jn,{children:[(0,s.jsx)("div",{style:{fontSize:"16px",fontWeight:600,color:"#1F2937"},children:"Quantity"}),(0,s.jsxs)(Cn,{children:[(0,s.jsx)(En,{onClick:()=>g(Math.max(1,m-1)),disabled:m<=1,children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})}),(0,s.jsx)(An,{children:m}),(0,s.jsx)(En,{onClick:()=>g(m+1),children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M12 5V19M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,s.jsxs)(Fn,{children:[(0,s.jsx)("div",{style:{fontSize:"16px",fontWeight:600,color:"#1F2937",marginBottom:"8px"},children:"Special Instructions"}),(0,s.jsx)(_n,{rows:3,placeholder:"Any special requests? (optional)",value:x,onChange:e=>y(e.target.value)})]}),(0,s.jsxs)(Pn,{onClick:()=>{if(!d||!j())return;const e={...d,optionGroups:k};a(e,m,f,x),o(`/mobile/${t}/cart`)},disabled:!j(),children:[(0,s.jsx)("span",{children:"Add to Cart"}),(0,s.jsx)(zn,{children:(0,Tt.vv)((()=>{if(!d)return 0;let e=d.price*m;return f.forEach(t=>{var n;const r=null===k||void 0===k||null===(n=k.flatMap(e=>e.options))||void 0===n?void 0:n.find(e=>e.id===t);r&&(e+=r.price*m)}),e})(),i)})]})]}):(0,s.jsx)(Ot,{title:"Item Not Found",showBack:!0,onBack:()=>o(-1),children:(0,s.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#9CA3AF"},children:"This item could not be found."})})},On=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 140px; /* Space for checkout button + bottom nav */
`,Tn=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Bn=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`,In=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`,Nn=o.Ay.button`
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 4px;
  
  svg {
    width: 20px;
    height: 20px;
  }
`,Dn=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
`,Ln=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$n=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Mn=o.Ay.button`
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
`,qn=o.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  min-width: 20px;
  text-align: center;
`,Hn=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,Un=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,Wn=o.Ay.div`
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
`,Gn=o.Ay.button`
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
`,Vn=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Yn=o.Ay.div`
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
`,Qn=o.Ay.button`
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
`,Kn=()=>{const{slug:e}=(0,r.g)(),t=(0,r.Zp)(),{cartItems:n,cartTotal:o,updateCartItem:a,removeFromCart:i,currency:l}=Ge(),{operationSettings:c}=(0,u.Pj)(),d=o,p=c.serviceChargeEnabled?d*(c.serviceChargeRate/100):0,f=c.taxEnabled?d*(c.taxRate/100):0,h=d+p+f,m=(e,t)=>{0===t?i(e):a(e,t)},g=()=>{t(`/mobile/${e}/menu`)};return 0===n.length?(0,s.jsx)(Ot,{title:"Cart",currentPage:"cart",children:(0,s.jsxs)(Wn,{children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,s.jsx)("path",{d:"M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z",stroke:"currentColor",strokeWidth:"2"}),(0,s.jsx)("path",{d:"M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,s.jsx)("h3",{children:"Your cart is empty"}),(0,s.jsx)("p",{children:"Add some delicious items to get started"}),(0,s.jsx)(Gn,{onClick:g,children:"Browse Menu"})]})}):(0,s.jsxs)(Ot,{title:"Cart",currentPage:"cart",cartItemCount:n.length,children:[(0,s.jsxs)(On,{children:[n.map(e=>(0,s.jsxs)(Tn,{children:[(0,s.jsxs)(Bn,{children:[(0,s.jsxs)(In,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),(0,s.jsx)(Nn,{onClick:()=>i(e.id),children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M18 6L6 18M6 6L18 18",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e.selectedOptions.length>0&&(0,s.jsx)(Dn,{children:e.selectedOptions.join(", ")}),e.specialInstructions&&(0,s.jsxs)(Un,{children:["Note: ",e.specialInstructions]}),(0,s.jsxs)(Ln,{children:[(0,s.jsxs)($n,{children:[(0,s.jsx)(Mn,{onClick:()=>m(e.id,e.quantity-1),disabled:e.quantity<=1,children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})}),(0,s.jsx)(qn,{children:e.quantity}),(0,s.jsx)(Mn,{onClick:()=>m(e.id,e.quantity+1),children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M12 5V19M5 12H19",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]}),(0,s.jsx)(Hn,{children:(0,Tt.vv)(e.totalPrice,l)})]})]},e.id)),(0,s.jsxs)(Vn,{children:[(0,s.jsxs)(Yn,{children:[(0,s.jsx)("span",{children:"Subtotal"}),(0,s.jsx)("span",{children:(0,Tt.vv)(d,l)})]}),c.serviceChargeEnabled&&p>0&&(0,s.jsxs)(Yn,{children:[(0,s.jsxs)("span",{children:["Service Charge (",c.serviceChargeRate,"%)"]}),(0,s.jsx)("span",{children:(0,Tt.vv)(p,l)})]}),c.taxEnabled&&f>0&&(0,s.jsxs)(Yn,{children:[(0,s.jsxs)("span",{children:["Tax (",c.taxRate,"%)"]}),(0,s.jsx)("span",{children:(0,Tt.vv)(f,l)})]}),(0,s.jsxs)(Yn,{children:[(0,s.jsx)("span",{children:"Total"}),(0,s.jsx)("span",{children:(0,Tt.vv)(h,l)})]})]})]}),(0,s.jsx)(Qn,{onClick:()=>{t(`/mobile/${e}/payment`)},children:"Proceed to Checkout"})]})};var Jn=n(2118);const Xn=[{code:"+82",country:"KR",name:"South Korea",flag:"\ud83c\uddf0\ud83c\uddf7"},{code:"+60",country:"MY",name:"Malaysia",flag:"\ud83c\uddf2\ud83c\uddfe"},{code:"+65",country:"SG",name:"Singapore",flag:"\ud83c\uddf8\ud83c\uddec"},{code:"+81",country:"JP",name:"Japan",flag:"\ud83c\uddef\ud83c\uddf5"},{code:"+86",country:"CN",name:"China",flag:"\ud83c\udde8\ud83c\uddf3"},{code:"+1",country:"US",name:"United States",flag:"\ud83c\uddfa\ud83c\uddf8"},{code:"+44",country:"GB",name:"United Kingdom",flag:"\ud83c\uddec\ud83c\udde7"},{code:"+61",country:"AU",name:"Australia",flag:"\ud83c\udde6\ud83c\uddfa"},{code:"+66",country:"TH",name:"Thailand",flag:"\ud83c\uddf9\ud83c\udded"},{code:"+84",country:"VN",name:"Vietnam",flag:"\ud83c\uddfb\ud83c\uddf3"},{code:"+63",country:"PH",name:"Philippines",flag:"\ud83c\uddf5\ud83c\udded"},{code:"+62",country:"ID",name:"Indonesia",flag:"\ud83c\uddee\ud83c\udde9"},{code:"+91",country:"IN",name:"India",flag:"\ud83c\uddee\ud83c\uddf3"}],Zn=(e,t)=>{const n=t.replace(/\D/g,"");return`${e}${n.startsWith("0")?n.slice(1):n}`},er=e=>{if(!e)return{countryCode:"+82",phoneNumber:""};const t=[...Xn].sort((e,t)=>t.code.length-e.code.length);for(const n of t)if(e.startsWith(n.code))return{countryCode:n.code,phoneNumber:e.slice(n.code.length)};return{countryCode:"+82",phoneNumber:e.replace(/^\+/,"")}},tr=o.Ay.div`
  display: flex;
  gap: 8px;
`,nr=o.Ay.select`
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
`,rr=o.Ay.input`
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
`,or=t=>{let{value:n,onChange:r,defaultCountryCode:o,placeholder:a="Phone number",disabled:i=!1}=t;const[l,c]=(0,e.useState)(()=>{if(n){return er(n).countryCode}return(e=>{var t;if(!e)return"+60";const n=e.toUpperCase();let r=Xn.find(e=>e.country===n);return r||(r=Xn.find(e=>e.name.toUpperCase()===n)),(null===(t=r)||void 0===t?void 0:t.code)||"+60"})(o)}),[d,u]=(0,e.useState)(()=>{if(n){return er(n).phoneNumber}return""});(0,e.useEffect)(()=>{if(n){const e=er(n);c(e.countryCode),u(e.phoneNumber)}},[n]);return(0,s.jsxs)(tr,{children:[(0,s.jsx)(nr,{value:l,onChange:e=>{const t=e.target.value;c(t),d&&r(Zn(t,d))},disabled:i,children:Xn.map(e=>(0,s.jsxs)("option",{value:e.code,children:[e.flag," ",e.code]},e.code))}),(0,s.jsx)(rr,{type:"tel",value:d,onChange:e=>{const t=e.target.value;u(t),r(t?Zn(l,t):"")},placeholder:a,disabled:i})]})},ar=o.Ay.div`
  padding-bottom: 100px;
  max-width: 100%;
  box-sizing: border-box;
`,ir=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`,sr=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,lr=o.Ay.label`
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
`,cr=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,dr=o.Ay.button`
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
`,ur=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  text-align: center;
`,pr=o.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-align: center;
`,fr=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,hr=o.Ay.label`
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
`,mr=o.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  accent-color: #635BFF;
`,gr=o.Ay.div`
  flex: 1;
`,xr=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,yr=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,br=o.Ay.div`
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
`,vr=o.Ay.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
`,wr=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,kr=o.Ay.div`
  flex: 1;
`,Sr=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 2px;
`,jr=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,Cr=o.Ay.div`
  font-size: 12px;
  color: #667eea;
  margin-top: 4px;
  font-weight: 500;
`,Er=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-left: 12px;
`,Ar=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,Fr=o.Ay.input`
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
`,_r=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
`,Pr=o.Ay.div`
  background: #FEE2E2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`,zr=o.Ay.button`
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
`,Rr=o.Ay.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,Or=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Tr=o.Ay.select`
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
`,Br=o.Ay.div`
  margin-top: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Ir=o.Ay.div`
  flex: 1;
`,Nr=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Dr=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Lr=o.Ay.button`
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
`,$r=o.Ay.textarea`
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
`,Mr=o.Ay.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,qr=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`,Hr=o.Ay.button`
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
`,Ur=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Wr=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`,Gr=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Vr=o.Ay.div`
  font-size: 14px;
  font-weight: 700;
  color: #635BFF;
`,Yr=o.Ay.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #92400E;
`,Qr={SAVE10:{type:"percentage",value:10,minOrder:30},SAVE5:{type:"fixed",value:5,minOrder:20},WELCOME:{type:"percentage",value:15,minOrder:0},FOODIE20:{type:"percentage",value:20,minOrder:50}},Kr=()=>{var t;const{slug:n}=(0,r.g)(),o=(0,r.Zp)(),{cartItems:a,cartTotal:i,clearCart:l,setCurrentOrder:c,currentStore:d,setCurrentStore:p,currency:h}=Ge(),{currentCustomer:m,guestInfo:g,updateCustomerOrderStats:x,updateCustomer:y,setGuestInfo:b,logoutCustomer:v,loginCustomer:w,registerCustomer:k}=(0,f.c)(),{getTakeawayCharge:S,operationSettings:j}=(0,u.Pj)(),[C,E]=(0,e.useState)(null),[A,F]=(0,e.useState)(!1),[_,P]=(0,e.useState)(""),[z,R]=(0,e.useState)(""),[O,T]=(0,e.useState)(""),[B,I]=(0,e.useState)(""),[N,D]=(0,e.useState)(""),[L,$]=(0,e.useState)([]),[M,q]=(0,e.useState)(""),[H,U]=(0,e.useState)(""),[W,G]=(0,e.useState)(0),[V,Y]=(0,e.useState)(""),[Q,K]=(0,e.useState)(""),[J,X]=(0,e.useState)(""),[Z,ee]=(0,e.useState)(""),[te,ne]=(0,e.useState)(null),[re,oe]=(0,e.useState)([]),[ae,ie]=(0,e.useState)(null),[se,le]=(0,e.useState)(!0),[ce,de]=(0,e.useState)([]),[ue,pe]=(0,e.useState)(""),[fe,he]=(0,e.useState)(""),[me,ge]=(0,e.useState)(""),[xe,ye]=(0,e.useState)(!1),[be,ve]=(0,e.useState)(!1),[we,ke]=(0,e.useState)(!1),[Se,je]=(0,e.useState)(""),[Ce,Ee]=(0,e.useState)(""),[Ae,Fe]=(0,e.useState)(""),_e=sessionStorage.getItem("orderType")||"dine-in",Pe=(()=>{if("pickup"!==_e||se||!ae)return null;const e=new Date,[t,n]=ae.split(":").map(Number);return e.setHours(t,n,0,0),e.toISOString()})(),ze=null===d||void 0===d?void 0:d.cash_rounding,Re=(null===d||void 0===d?void 0:d.rounding_apply_to)||"cash_only",Oe=i,Te=(()=>{if("takeaway"!==_e&&"pickup"!==_e||!j.takeawayPricing.enabled)return 0;let e=0;if("per-item"===j.takeawayPricing.pricingType){const t=a.reduce((e,t)=>e+t.quantity,0);e=t*j.takeawayPricing.perItemCharge}else a.forEach(t=>{const n=S(t.menuItem.categoryId||t.menuItem.category);e+=n*t.quantity});return e})(),Be=(()=>{if("delivery"!==_e||!te)return 0;const e=re.find(e=>e.id===te);if(!e)return 0;const t=j.deliveryPricing,n=(null===t||void 0===t?void 0:t.freeAbove)||999999;return Oe>=n?(console.log("\u2705 Order qualifies for free delivery (subtotal >= freeAbove)"),0):e.fee})(),Ie=j.taxEnabled?Oe*(j.taxRate/100):0,Ne=j.serviceChargeEnabled?Oe*(j.serviceChargeRate/100):0,De=Oe-W+Ie+Ne+Te+Be,Le="all"===Re&&ze?($e=De,ze?Math.round($e/ze)*ze:$e):De;var $e;const Me=e.useMemo(()=>{if(!C)return console.log("\u26a0\ufe0f paymentMethods is null/undefined, returning empty array"),[];console.log("\ud83d\udd0d Filtering payment methods for mobile. Raw paymentMethods:",JSON.stringify(C,null,2));const e=[],t=C._order;return(t&&Array.isArray(t)?t.filter(e=>"_order"!==e&&C[e]):Object.keys(C).filter(e=>"_order"!==e)).forEach(t=>{const n=C[t];if(n)if(console.log(`\ud83d\udd0d Checking ${t}:`,{enabled:n.enabled,availableIn:n.availableIn,passesCheck:n.enabled&&n.availableIn&&n.availableIn.includes("mobile")}),n.enabled&&n.availableIn&&n.availableIn.includes("mobile")){if("delivery"===_e&&"payAtCounter"===t)return void console.log(`\u274c ${t} excluded - Pay at Counter not allowed for delivery`);console.log(`\u2705 ${t} passed filter - adding to available methods`),e.push({key:t,label:n.label,...n})}else console.log(`\u274c ${t} failed filter - excluded from mobile`)}),console.log("\ud83d\udd0d Final available methods for mobile:",e.map(e=>e.key)),e},[C,_e]),[qe,He]=(0,e.useState)("");e.useEffect(()=>{(async()=>{if(n){console.log("\ud83c\udfea Loading restaurant from slug:",n);try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();if(t.success&&t.data){const e=t.data;console.log("\u2705 Restaurant loaded from slug API:",e),p({id:e.id.toString(),name:e.name,slug:e.slug,description:e.description||"",logo:e.logo_url||"",isOpen:"active"===e.status,openingHours:e.opening_hours||""})}}else console.error("Failed to load restaurant by slug:",e.status)}catch(_){console.error("Failed to load restaurant:",_)}}})()},[n,p]),e.useEffect(()=>{m||g||b({name:"Guest",phone:""})},[]),e.useEffect(()=>{(async()=>{try{if(null===d||void 0===d||!d.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load payment settings");console.log("\ud83d\udcb3 Loading payment settings for restaurant ID:",d.id);const e=await fetch(`/api/restaurants/${d.id}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings?(console.log("\u2705 Payment settings loaded:",n.payment_settings),E(n.payment_settings)):console.warn("\u26a0\ufe0f No payment_settings found in restaurant data")}}catch(_){console.error("Failed to load payment settings:",_)}})()},[null===d||void 0===d?void 0:d.id]),e.useEffect(()=>{(async()=>{try{if(null===d||void 0===d||!d.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load table settings");console.log("\ud83c\udf7d\ufe0f Loading table settings for restaurant ID:",d.id);const t=await fetch(`/api/restaurants/${d.id}`);if(t.ok){var e;const n=await t.json(),r=n.data||n;if(null!==(e=r.operation_settings)&&void 0!==e&&e.enableTableNumbers){const{totalTables:e,tablePrefix:t}=r.operation_settings;console.log("\u2705 Table settings loaded:",{totalTables:e,tablePrefix:t});const n=[];for(let r=1;r<=e;r++)n.push(`${t||"T"}${String(r).padStart(3,"0")}`);$(n)}else console.log("\u2139\ufe0f Table numbers not enabled for this restaurant"),$([])}}catch(_){console.error("Failed to load table settings:",_)}})();const e=sessionStorage.getItem("tableNumber");e&&q(e)},[null===d||void 0===d?void 0:d.id]),e.useEffect(()=>{if(console.log("\ud83d\udd0d Delivery zone effect triggered"),console.log("Order type:",_e),console.log("operationSettings.deliveryPricing:",j.deliveryPricing),"delivery"===_e)if(j.deliveryPricing&&j.deliveryPricing.zones&&j.deliveryPricing.zones.length>0){const e=j.deliveryPricing.zones;console.log("\ud83d\ude9a Loading delivery zones:",e),oe(e)}else console.log("\u2139\ufe0f No delivery zones configured - delivery zone selection not required"),oe([])},[_e,j.deliveryPricing]),e.useEffect(()=>{if("delivery"===_e)if(m){var e,t;console.log("\ud83d\udccd Loading member address:",m);const n=(null===(e=m.addresses)||void 0===e?void 0:e.find(e=>e.isDefault))||(null===(t=m.addresses)||void 0===t?void 0:t[0]);n&&K(n.address||""),X(m.phone||"")}else g&&g.phone&&(console.log("\ud83d\udccd Syncing guest phone for delivery:",g.phone),X(g.phone))},[m,g,_e]),e.useEffect(()=>{"delivery"===_e&&g&&"Guest"===g.name&&!g.phone&&(console.log("\u26a0\ufe0f Quick Order not allowed for delivery - clearing guest info"),b(null))},[_e,g,b]),e.useEffect(()=>{if("pickup"!==_e)return;const e=(()=>{const e=[],t=new Date,n=j.openingTime||"09:00",r=j.closingTime||"22:00",[o,a]=n.split(":").map(Number),[i,s]=r.split(":").map(Number);let l=60*t.getHours()+t.getMinutes();const c=30*Math.ceil((l+30)/30),u=60*o+a,p=60*i+s;let f=Math.max(u,c);f=30*Math.ceil(f/30);const h=(null===d||void 0===d?void 0:d.breakTimes)||[];for(let d=f;d<p;d+=30){const t=Math.floor(d/60),n=d%60,r=`${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`;h.some(e=>{if(!e.start||!e.end)return!1;const[t,n]=e.start.split(":").map(Number),[r,o]=e.end.split(":").map(Number);return d>=60*t+n&&d<60*r+o})||e.push(r)}return e})();console.log("\ud83d\udce6 Generated pickup time slots:",e),de(e)},[_e,j,d]);const Ue=async()=>{if(m&&"delivery"===_e&&Q.trim())try{console.log("\ud83d\udcbe Saving delivery address to member profile...");const e=m.addresses||[];if(e.some(e=>e.address===Q))console.log("\u2139\ufe0f Address already exists in member profile");else{const t={id:`addr_${Date.now()}`,label:"Delivery Address",address:Q,isDefault:0===e.length};await y(m.id,{addresses:[...e,t]}),console.log("\u2705 Delivery address saved to member profile")}}catch(_){console.error("\u274c Failed to save delivery address:",_)}},We=e=>e.selectedOptions||[];return(0,s.jsxs)(Ot,{title:"Payment",showBack:!0,onBack:()=>o(`/mobile/${n}/cart`),children:[(0,s.jsxs)(ar,{children:[(0,s.jsxs)(yr,{children:[(0,s.jsx)(vr,{children:a.map((e,t)=>(0,s.jsxs)(wr,{children:[(0,s.jsxs)(kr,{children:[(0,s.jsxs)(Sr,{children:[e.menuItem.emoji," ",e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),(0,s.jsxs)(jr,{children:["Qty: ",e.quantity]}),e.menuItem.is_set_menu&&e.menuItem.set_items&&e.menuItem.set_items.length>0&&(0,s.jsxs)(Cr,{children:["\ud83c\udf71 Includes: ",e.menuItem.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")]})]}),(0,s.jsx)(Er,{children:(0,Tt.vv)(e.totalPrice,h)})]},t))}),(0,s.jsxs)(br,{children:[(0,s.jsx)("span",{children:"Subtotal"}),(0,s.jsx)("span",{children:(0,Tt.vv)(Oe,h)})]}),W>0&&(0,s.jsxs)(br,{children:[(0,s.jsx)("span",{children:"Discount"}),(0,s.jsxs)("span",{style:{color:"#059669"},children:["-",(0,Tt.vv)(W,h)]})]}),Te>0&&(0,s.jsxs)(br,{children:[(0,s.jsx)("span",{children:"Takeaway Charge"}),(0,s.jsx)("span",{children:(0,Tt.vv)(Te,h)})]}),Be>0&&(0,s.jsxs)(br,{children:[(0,s.jsx)("span",{children:"Delivery Fee"}),(0,s.jsx)("span",{children:(0,Tt.vv)(Be,h)})]}),Ne>0&&(0,s.jsxs)(br,{children:[(0,s.jsxs)("span",{children:["Service Charge (",j.serviceChargeRate,"%)"]}),(0,s.jsx)("span",{children:(0,Tt.vv)(Ne,h)})]}),Ie>0&&(0,s.jsxs)(br,{children:[(0,s.jsxs)("span",{children:["Tax (",j.taxRate,"%)"]}),(0,s.jsx)("span",{children:(0,Tt.vv)(Ie,h)})]}),(0,s.jsxs)(br,{className:"total",children:[(0,s.jsx)("span",{children:"Total"}),(0,s.jsx)("span",{children:(0,Tt.vv)(Le,h)})]})]}),_&&(0,s.jsx)(Pr,{children:_}),(0,s.jsxs)(ir,{children:[(0,s.jsx)(sr,{children:"Customer Information"}),(0,s.jsxs)(lr,{style:{opacity:"delivery"===_e?.5:1},children:[(0,s.jsx)("input",{type:"checkbox",checked:!(!g||"Guest"!==g.name||g.phone),disabled:"delivery"===_e,onChange:e=>{e.target.checked?(b({name:"Guest",phone:""}),ye(!1),ve(!1),ke(!1)):b(null)}}),(0,s.jsxs)("span",{children:["Quick Order (No customer info required)","delivery"===_e?" - Not available for delivery":""]})]}),(0,s.jsxs)(cr,{children:[(0,s.jsxs)(dr,{selected:xe||we||g&&"Guest"!==g.name,onClick:()=>{ye(!xe),ve(!1),ke(!1),m&&v()},children:[(0,s.jsx)(ur,{children:"Guest Or Register"}),(0,s.jsx)(pr,{children:"Order as guest or sign up"})]}),(0,s.jsxs)(dr,{selected:be||!!m,onClick:()=>{ve(!be),ye(!1),ke(!1),b(null)},children:[(0,s.jsx)(ur,{children:"Member"}),(0,s.jsx)(pr,{children:"Login"})]})]}),xe&&!m&&(0,s.jsxs)("div",{style:{marginTop:"16px"},children:[(0,s.jsxs)(lr,{children:[(0,s.jsx)("input",{type:"checkbox",checked:we,onChange:e=>ke(e.target.checked)}),(0,s.jsx)("span",{children:"Register as a Member (Earn points & benefits)"})]}),(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Name *"}),(0,s.jsx)(Fr,{type:"text",placeholder:"Enter your name",value:ue,onChange:e=>pe(e.target.value)})]}),(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Phone Number *"}),(0,s.jsx)(or,{value:fe,onChange:he,defaultCountryCode:null===d||void 0===d?void 0:d.country,placeholder:"Phone number"})]}),(0,s.jsxs)(Mr,{children:[(0,s.jsxs)(qr,{children:["Email ",we?"*":"(Optional)"]}),(0,s.jsx)(Fr,{type:"email",placeholder:"your.email@example.com",value:me,onChange:e=>ge(e.target.value)})]}),we&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Password *"}),(0,s.jsx)(Fr,{type:"password",placeholder:"Enter password",value:Se,onChange:e=>je(e.target.value)})]}),(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Confirm Password *"}),(0,s.jsx)(Fr,{type:"password",placeholder:"Confirm password",value:Ce,onChange:e=>Ee(e.target.value)})]})]}),(0,s.jsx)("button",{onClick:async()=>{if(ue.trim()&&fe.trim())if(we){if(!me.trim())return void alert("Email is required for member registration");if(!Se.trim())return void alert("Password is required for member registration");if(Se!==Ce)return void alert("Passwords do not match");try{const e=await k({name:ue,phone:fe,email:me,password:Se});console.log("\u2705 Customer registered:",e),alert("Registration successful! You are now logged in as a member."),ye(!1),ke(!1),pe(""),he(""),ge(""),je(""),Ee("")}catch(_){console.error("Registration failed:",_),alert(_.message||"Registration failed. Please try again.")}}else b({name:ue,phone:fe}),ye(!1);else alert("Please enter name and phone number")},style:{width:"100%",padding:"12px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer"},children:we?"Register & Continue":"Save Guest Info"})]}),be&&!m&&(0,s.jsxs)("div",{style:{marginTop:"16px"},children:[(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Email or Phone Number *"}),(0,s.jsx)(Fr,{type:"text",placeholder:"Email or phone number",value:fe,onChange:e=>he(e.target.value)})]}),(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Password *"}),(0,s.jsx)(Fr,{type:"password",placeholder:"Enter your password",value:Ae,onChange:e=>Fe(e.target.value)})]}),(0,s.jsx)("button",{onClick:async()=>{if(fe.trim())if(Ae.trim())try{const e=await w(fe,Ae);e?(console.log("\u2705 Member logged in:",e),ve(!1),he(""),Fe("")):alert("Login failed. Please check your phone number and password.")}catch(_){console.error("Login error:",_),alert("Login failed. Please try again.")}else alert("Please enter your password");else alert("Please enter your phone number")},style:{width:"100%",padding:"12px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginBottom:"12px"},children:"Login as Member"}),(0,s.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center",marginBottom:"8px"},children:(0,s.jsx)("span",{onClick:()=>o(`/mobile/${n}/forgot-password`),style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Forgot password?"})}),(0,s.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",textAlign:"center"},children:["Not a member yet?"," ",(0,s.jsx)("span",{onClick:()=>{ve(!1),ye(!0),ke(!0)},style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Sign up here"})]})]}),m&&(0,s.jsxs)(Br,{children:[(0,s.jsxs)(Ir,{children:[(0,s.jsx)(Nr,{children:m.name}),(0,s.jsxs)(Dr,{children:[m.phone,m.email&&` \u2022 ${m.email}`]})]}),(0,s.jsx)(Lr,{onClick:()=>{v(),ve(!1)},title:"Clear customer info",children:"\xd7"})]}),g&&"Guest"!==g.name&&!m&&(0,s.jsxs)(Br,{children:[(0,s.jsxs)(Ir,{children:[(0,s.jsx)(Nr,{children:g.name}),(0,s.jsx)(Dr,{children:g.phone||"No phone number"})]}),(0,s.jsx)(Lr,{onClick:()=>{b(null),pe(""),he(""),ge(""),ye(!1)},title:"Clear guest info",children:"\xd7"})]})]}),"delivery"===_e&&(0,s.jsxs)(ir,{children:[(0,s.jsx)(sr,{children:"Delivery Information *"}),g&&"Guest"===g.name&&!g.phone&&(0,s.jsx)(Yr,{children:"\u26a0\ufe0f Quick Order is not available for delivery. Please enter your contact information and address."}),(null===(t=j.deliveryPricing)||void 0===t?void 0:t.minimumOrder)>0&&Oe<j.deliveryPricing.minimumOrder&&(0,s.jsxs)(Yr,{children:["\u2139\ufe0f Minimum order for delivery: ",(0,Tt.vv)(j.deliveryPricing.minimumOrder,h)]}),(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Delivery Address *"}),(0,s.jsx)($r,{placeholder:"Enter your full delivery address...",value:Q,onChange:e=>K(e.target.value)})]}),(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Delivery Notes (Optional)"}),(0,s.jsx)($r,{placeholder:"E.g., Gate code, landmark, special instructions...",value:Z,onChange:e=>ee(e.target.value),style:{minHeight:"60px"}})]}),re.length>0&&(0,s.jsxs)(Mr,{children:[(0,s.jsx)(qr,{children:"Select Delivery Zone *"}),re.map(e=>{var t;return(0,s.jsxs)(Hr,{selected:te===e.id,onClick:()=>ne(e.id),type:"button",children:[(0,s.jsx)(Ur,{children:e.name}),(0,s.jsxs)(Wr,{children:[(0,s.jsx)(Gr,{children:e.description}),(0,s.jsx)(Vr,{children:null!==(t=j.deliveryPricing)&&void 0!==t&&t.freeAbove&&Oe>=j.deliveryPricing.freeAbove?"FREE":(0,Tt.vv)(e.fee,h)})]})]},e.id)})]})]}),"pickup"===_e&&(0,s.jsxs)(ir,{children:[(0,s.jsx)(sr,{children:"Pickup Time *"}),(0,s.jsx)("button",{type:"button",onClick:()=>{le(!0),ie(null)},style:{width:"100%",padding:"16px",marginBottom:"12px",border:"1px solid "+(se?"#635BFF":"#E6EBF1"),borderRadius:"8px",background:se?"#F0F4FF":"white",color:se?"#635BFF":"#0A2540",fontSize:"15px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s"},children:"Ready as soon as possible"}),(0,s.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px",textAlign:"center"},children:"Or schedule a pickup time"}),(0,s.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px"},children:ce.map(e=>{const[t,n]=e.split(":").map(Number),r=t>=12?"PM":"AM",o=t%12||12,a=60*t+n+30,i=Math.floor(a/60),l=a%60,c=i>=12?"PM":"AM",d=i%12||12,u=`${o}:${n.toString().padStart(2,"0")}`,p=`${d}:${l.toString().padStart(2,"0")}`,f=r===c?`${u} - ${p} ${c}`:`${u} ${r} - ${p} ${c}`;return(0,s.jsx)("button",{type:"button",onClick:()=>{le(!1),ie(e)},style:{padding:"12px 8px",border:"1px solid "+(se||ae!==e?"#E6EBF1":"#635BFF"),borderRadius:"8px",background:se||ae!==e?"white":"#F0F4FF",color:se||ae!==e?"#0A2540":"#635BFF",fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s"},children:f},e)})}),0===ce.length&&(0,s.jsx)("div",{style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No available pickup times for today"})]}),(0,s.jsxs)(ir,{children:[(0,s.jsx)(sr,{children:"Coupon Code"}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,s.jsx)(Fr,{type:"text",placeholder:"Enter coupon code",value:H,onChange:e=>U(e.target.value.toUpperCase()),style:{flex:1}}),(0,s.jsx)("button",{onClick:()=>{if(Y(""),!H)return void Y("Please enter a coupon code");const e=Qr[H];if(!e)return Y("Invalid coupon code"),void G(0);if(e.minOrder&&Oe<e.minOrder)return Y(`Minimum order of ${(0,Tt.vv)(e.minOrder,h)} required`),void G(0);let t=0;t="percentage"===e.type?Oe*e.value/100:Math.min(e.value,Oe),G(t),Y("")},style:{padding:"12px 20px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.15s"},onMouseEnter:e=>e.currentTarget.style.background="#5A51E6",onMouseLeave:e=>e.currentTarget.style.background="#635BFF",children:"Apply"})]}),V&&(0,s.jsx)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:V}),W>0&&(0,s.jsxs)("div",{style:{color:"#059669",fontSize:"12px",marginTop:"8px"},children:["Coupon applied! You saved ",(0,Tt.vv)(W,h)]})]}),"dine-in"===sessionStorage.getItem("orderType")&&L.length>0&&(0,s.jsxs)(Or,{children:[(0,s.jsx)(sr,{children:"Table Number"}),(0,s.jsxs)(Tr,{value:M,onChange:e=>q(e.target.value),children:[(0,s.jsx)("option",{value:"",children:"Free Seating"}),L.map(e=>(0,s.jsx)("option",{value:e,children:e},e))]})]}),(0,s.jsxs)(ir,{children:[(0,s.jsx)(sr,{children:"Payment Method *"}),!qe&&(0,s.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginBottom:"12px",padding:"8px 12px",background:"#FEE2E2",borderRadius:"8px"},children:"Please select a payment method to continue"}),(0,s.jsx)(fr,{children:Me.map(e=>(0,s.jsxs)(hr,{selected:qe===e.key,children:[(0,s.jsx)(mr,{type:"radio",name:"payment",checked:qe===e.key,onChange:()=>{console.log("\ud83d\udd35 Payment method changed to:",e.key),He(e.key),P("")}}),(0,s.jsx)(gr,{children:(0,s.jsx)(xr,{children:e.label})})]},e.key))}),"card"===qe&&(0,s.jsxs)(Ar,{children:[(0,s.jsx)(Fr,{type:"text",placeholder:"Card Number",value:z,onChange:e=>R((e=>{const t=e.replace(/\s+/g,"").replace(/[^0-9]/gi,"").match(/\d{4,16}/g),n=t&&t[0]||"",r=[];for(let o=0,a=n.length;o<a;o+=4)r.push(n.substring(o,o+4));return r.length?r.join(" "):e})(e.target.value)),maxLength:19}),(0,s.jsx)(Fr,{type:"text",placeholder:"Cardholder Name",value:O,onChange:e=>T(e.target.value)}),(0,s.jsxs)(_r,{children:[(0,s.jsx)(Fr,{type:"text",placeholder:"MM/YY",value:B,onChange:e=>I((e=>{const t=e.replace(/\s+/g,"").replace(/[^0-9]/gi,"");return t.length>=2?t.slice(0,2)+"/"+t.slice(2,4):t})(e.target.value)),maxLength:5}),(0,s.jsx)(Fr,{type:"text",placeholder:"CVV",value:N,onChange:e=>D(e.target.value.replace(/\D/g,"")),maxLength:3})]})]})]})]}),(0,s.jsx)(zr,{onClick:async()=>{if(console.log("\ud83d\udd35\ud83d\udd35\ud83d\udd35 PAY BUTTON CLICKED! \ud83d\udd35\ud83d\udd35\ud83d\udd35"),console.log("Payment method selected:",qe),console.log("Cart items count:",a.length),P(""),qe){F(!0);try{console.log("\ud83d\udd35 Step 1: Validating cart...");const e=await tn.validateCart(a.map(e=>({id:e.menuItem.id,quantity:e.quantity,price:e.totalPrice/e.quantity,options:e.selectedOptions})),(null===d||void 0===d?void 0:d.id)||"1");if(console.log("\ud83d\udd35 Step 2: Validation response:",e),!e.success||!e.data.isValid){const e="Some items in your cart have changed. Please review your order.";return console.error("\u274c Validation failed:",e),P(e),void F(!1)}if(console.log("\ud83d\udd35 Step 3: Preparing order..."),console.log("Order type:",_e),console.log("Payment method:",qe),console.log("\ud83d\udd35 Step 4: Processing payment for method:",qe),"payAtCounter"===qe||"counter"===qe){if(console.log("\ud83d\udd35 Processing counter payment..."),"delivery"===_e){if(!m&&(!g||!g.phone))return P("Please enter your contact information (Guest Order or Member)"),void F(!1);if(!Q.trim())return P("Please enter your delivery address"),void F(!1);if(!J.trim())return P("Please enter your phone number in Customer Information"),void F(!1);if(re.length>0&&!te)return P("Please select a delivery zone"),void F(!1)}try{let e=null;if("delivery"===_e&&te&&re.length>0){const t=re.find(e=>e.id===te);e=(null===t||void 0===t?void 0:t.name)||null}const t={restaurant_id:(null===d||void 0===d?void 0:d.id)||1,customer_name:m?m.name:g&&g.name||"Guest",customer_phone:m?m.phone:g&&g.phone||null,table_number:M||null,total_amount:Le,takeaway_charge:Te,delivery_fee:Be,delivery_info:"delivery"===_e?{address:Q,phone:J,notes:Z,zoneName:e,zoneId:te}:null,scheduled_pickup_time:"pickup"===_e&&Pe?Pe:null,customer_id:m?m.id:null,status:"outstanding",order_type:"dine-in"===_e?"dine_in":_e,source:"mobile",payment_method:"counter",payment_status:"pending",kitchen_ready:!1,order_date:new Date,order_items:a.map(e=>({name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:We(e),special_instructions:e.specialInstructions||null,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}))};console.log("\ud83d\udcbe Saving order to DATABASE...");const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok)throw new Error("Failed to save order to database");const i=(await r.json()).data;console.log("\u2705 Order saved to DB with ID:",i.id);const s=i.order_number,u=s?s.split("-")[1]:"001";m&&x(m.id,Le),await Ue();const p=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");p.includes(i.id)||(p.push(i.id),localStorage.setItem("customerOrderIds",JSON.stringify(p))),c({id:i.id,pickupNumber:u,items:a,total:Le,status:"outstanding",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"pending"}),l(),o(`/mobile/${n}/order/${i.id}`)}catch(_){return console.error("\u274c Failed to save order to DB:",_),P("Failed to create order. Please try again."),void F(!1)}}else if("bankTransfer"===qe||"bank_transfer"===qe||"bank"===qe||"qr"===qe||"qrPayment"===qe||"qr_payment"===qe){if(console.log("\ud83d\udd35 Processing QR / Bank Transfer payment - NOT saving order yet..."),"delivery"===_e){if(console.log("\ud83d\ude9a Delivery validation check:",{currentCustomer:!!m,guestInfo:g,deliveryAddress:Q,deliveryPhone:J,selectedZone:te}),!m&&(!g||!g.phone)){console.log("\u274c Validation failed: No customer/guest info");const e="Please enter your contact information (Guest Order or Member)";return P(e),alert(e),void F(!1)}if(!Q.trim()){console.log("\u274c Validation failed: No delivery address");const e="Please enter your delivery address";return P(e),alert(e),void F(!1)}if(!J.trim()){console.log("\u274c Validation failed: No delivery phone");const e="Please enter your phone number in Customer Information";return P(e),alert(e),void F(!1)}if(re.length>0&&!te){console.log("\u274c Validation failed: No delivery zone selected");const e="Please select a delivery zone";return P(e),alert(e),void F(!1)}console.log("\u2705 Delivery validation passed")}let e=null;if("delivery"===_e&&te&&re.length>0){const t=re.find(e=>e.id===te);e=(null===t||void 0===t?void 0:t.name)||null}const t={restaurant_id:(null===d||void 0===d?void 0:d.id)||1,customer_name:m?m.name:g&&g.name||"Guest",customer_phone:m?m.phone:g&&g.phone||null,table_number:M||null,total_amount:Le,takeaway_charge:Te,delivery_fee:Be,delivery_info:"delivery"===_e?{address:Q,phone:J,notes:Z,zoneName:e,zoneId:te}:null,scheduled_pickup_time:"pickup"===_e&&Pe?Pe:null,status:"outstanding",order_type:"dine-in"===_e?"dine_in":_e,source:"mobile",payment_method:"qr"===qe||"qrPayment"===qe||"qr_payment"===qe?"QR Payment":"Bank Transfer",payment_status:"pending",kitchen_ready:!1,order_date:new Date,order_items:a.map(e=>({name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:We(e),special_instructions:e.specialInstructions||null})),customer_id:(null===m||void 0===m?void 0:m.id)||null};sessionStorage.setItem("pendingOrderData",JSON.stringify(t));const r="qr"===qe||"qrPayment"===qe||"qr_payment"===qe?`/mobile/${n}/payment/qr`:`/mobile/${n}/payment/bank-transfer`;console.log("\ud83d\udd35 Navigating to:",r),o(r),F(!1)}else if("card"===qe||"fpx"===qe){if(console.log("\ud83d\udd35 Processing card / FPX payment..."),"delivery"===_e){if(!m&&(!g||!g.phone))return P("Please enter your contact information (Guest Order or Member)"),void F(!1);if(!Q.trim())return P("Please enter your delivery address"),void F(!1);if(!J.trim())return P("Please enter your phone number in Customer Information"),void F(!1);if(re.length>0&&!te)return P("Please select a delivery zone"),void F(!1)}try{let e=null;if("delivery"===_e&&te&&re.length>0){const t=re.find(e=>e.id===te);e=(null===t||void 0===t?void 0:t.name)||null}const t={restaurant_id:(null===d||void 0===d?void 0:d.id)||1,customer_id:m?m.id:null,customer_name:m?m.name:g&&g.name||"Guest",customer_phone:m?m.phone:g&&g.phone||null,table_number:M||null,total_amount:Le,takeaway_charge:Te,delivery_fee:Be,delivery_info:"delivery"===_e?{address:Q,phone:J,notes:Z,zoneName:e,zoneId:te}:null,scheduled_pickup_time:"pickup"===_e&&Pe?Pe:null,status:"pending",order_type:"dine-in"===_e?"dine_in":_e,source:"mobile",payment_method:"card"===qe?"Card":"FPX",payment_status:"completed",kitchen_ready:!1,order_date:new Date,order_items:a.map(e=>({name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:We(e),special_instructions:e.specialInstructions||null,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}))};console.log("\ud83d\udcbe Saving card/FPX order to DATABASE..."),await new Promise(e=>setTimeout(e,2e3));const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!r.ok)throw new Error("Failed to save order to database");const i=(await r.json()).data;console.log("\u2705 Card/FPX order saved to DB with ID:",i.id);const s=i.order_number,u=s?s.split("-")[1]:"001";m&&x(m.id,Le),await Ue();const p=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");p.includes(i.id)||(p.push(i.id),localStorage.setItem("customerOrderIds",JSON.stringify(p))),c({id:i.id,pickupNumber:u,items:a,total:Le,status:"pending",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"completed"}),l(),console.log("\u2705 Card / FPX payment saved, navigating..."),o(`/mobile/${n}/order/${i.id}`)}catch(_){return console.error("\u274c Failed to save card/FPX order to DB:",_),P("Failed to create order. Please try again."),void F(!1)}}else console.error("\u274c Invalid payment method:",qe),P("Invalid payment method selected."),F(!1)}catch(e){const t=(null===e||void 0===e?void 0:e.message)||"Payment failed. Please try again.";console.error("\u274c\u274c\u274c PAYMENT ERROR CAUGHT \u274c\u274c\u274c"),console.error("Error details:",e),console.error("Error message:",t),P(t),alert(`Payment Error: ${t}`)}finally{console.log("\ud83d\udd35 Finally block executing..."),console.log("Current processing state:",A),F(!1),console.log("\u2705 Finally block complete")}}else P("Please select a payment method")},disabled:A||0===a.length,children:A?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(Rr,{}),"Processing..."]}):(0,s.jsxs)(s.Fragment,{children:["Pay ",(0,Tt.vv)(Le,h)]})}),(0,s.jsx)(Jn.A,{})]})},Jr=o.Ay.div`
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
`,Xr=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,Zr=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
`,eo=o.Ay.div`
  font-size: 48px;
  font-weight: 700;
  color: #635BFF;
  margin: 16px 0;
`,to=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0;
`,no=o.Ay.div`
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,ro=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1E40AF;
  margin-bottom: 8px;
`,oo=o.Ay.div`
  font-size: 13px;
  color: #1E40AF;
  line-height: 1.6;
`,ao=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,io=o.Ay.div`
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
`,so=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
`,lo=o.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
`,co=o.Ay.div`
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
`,uo=o.Ay.button`
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
`,po=o.Ay.div`
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
`,fo=o.Ay.input`
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
`,ho=o.Ay.button`
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
`,mo=o.Ay.input`
  display: none;
`,go=o.Ay.button`
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
`,xo=()=>{const{slug:t}=(0,r.g)(),n=(0,r.Zp)(),o=(0,r.zy)(),{setCurrentOrder:a,clearCart:i,currentStore:l,currency:c}=Ge(),d=(0,e.useRef)(null),u=sessionStorage.getItem("pendingOrderData"),p=u?JSON.parse(u):o.state,f=(null===p||void 0===p?void 0:p.total_amount)||(null===p||void 0===p?void 0:p.total)||0,h=null===p||void 0===p?void 0:p.id;console.log("\ud83d\udd35 QRPaymentPage - orderData:",p),console.log("\ud83d\udd35 QRPaymentPage - orderId:",h),console.log("\ud83d\udd35 QRPaymentPage - total:",f);const[m,g]=(0,e.useState)(null),[x,y]=(0,e.useState)(""),[b,v]=(0,e.useState)(""),[w,k]=(0,e.useState)(!1),[S,j]=(0,e.useState)(null);e.useEffect(()=>{(async()=>{try{if(null===l||void 0===l||!l.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load QR code");const n=await fetch(`/api/restaurants/${l.id}`);if(n.ok){var e,t;const r=await n.json(),o=r.data||r;null!==(e=o.payment_settings)&&void 0!==e&&null!==(t=e.qrPayment)&&void 0!==t&&t.qrImage?(j(o.payment_settings.qrPayment.qrImage),console.log("\u2705 QR Code image loaded from settings")):(console.log("\u274c No QR image found in qrPayment settings"),console.log("Payment settings keys:",Object.keys(o.payment_settings||{})))}}catch(n){console.error("Failed to load QR code:",n)}})()},[null===l||void 0===l?void 0:l.id]);const C=e=>{if(e.size>5242880)return void alert("Image size must be less than 5MB");if(!e.type.startsWith("image/"))return void alert("Please upload an image file");const t=new FileReader;t.onloadend=()=>{g(t.result),y(e.name)},t.readAsDataURL(e)};return(0,s.jsxs)(Ot,{title:"QR Payment",showBack:!0,onBack:()=>n(`/mobile/${t}/payment`),children:[(0,s.jsxs)(Jr,{children:[(0,s.jsxs)(Xr,{children:[(0,s.jsx)(eo,{children:(0,Tt.vv)(f,c)}),(0,s.jsx)(to,{children:S?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("img",{src:S,alt:"QR Code for Payment",style:{width:"280px",height:"280px",borderRadius:"12px",objectFit:"contain"}}),(0,s.jsx)(go,{onClick:()=>{if(!S)return void alert("QR Code image not available");const e=document.createElement("a");e.href=S,e.download=`QR-Payment-${f.toFixed(2)}.png`,document.body.appendChild(e),e.click(),document.body.removeChild(e)},children:"Download QR Code"})]}):(0,s.jsxs)("div",{style:{width:"280px",height:"280px",background:"white",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"12px",color:"#6B7280",fontSize:"16px",fontWeight:"600",textAlign:"center",padding:"20px",border:"1px solid #E5E7EB"},children:["QR Code",(0,s.jsx)("br",{}),"(Loading...)",(0,s.jsx)("br",{}),(0,Tt.vv)(f,c)]})})]}),(0,s.jsxs)(no,{children:[(0,s.jsx)(ro,{children:"\ud83d\udcf1 How to Pay"}),(0,s.jsxs)(oo,{children:["1. Open your banking app (Maybank, CIMB, etc.)",(0,s.jsx)("br",{}),'2. Select "Scan & Pay" or "DuitNow QR"',(0,s.jsx)("br",{}),"3. Scan the QR code above",(0,s.jsx)("br",{}),"4. Complete payment in your banking app",(0,s.jsx)("br",{}),"5. Upload payment screenshot or enter reference number below"]})]}),(0,s.jsxs)(ao,{children:[(0,s.jsx)(Zr,{children:"Payment Proof"}),m?(0,s.jsxs)(co,{children:[(0,s.jsx)("img",{src:m,alt:"Payment receipt"}),(0,s.jsx)(uo,{onClick:()=>{g(null),y(""),d.current&&(d.current.value="")},children:"\xd7"})]}):(0,s.jsxs)(io,{onClick:()=>{var e;return null===(e=d.current)||void 0===e?void 0:e.click()},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{var t;e.preventDefault(),e.stopPropagation();const n=null===(t=e.dataTransfer.files)||void 0===t?void 0:t[0];n&&C(n)},children:[(0,s.jsx)(so,{children:"Upload Payment Screenshot"}),(0,s.jsx)(lo,{children:"PNG, JPG up to 5MB"})]}),(0,s.jsx)(mo,{ref:d,type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];n&&C(n)}}),x&&(0,s.jsxs)("div",{style:{fontSize:"13px",color:"#059669",marginBottom:"16px",padding:"8px 12px",background:"#F0FDF4",borderRadius:"6px"},children:["\u2713 ",x]}),(0,s.jsx)(po,{children:"OR"}),(0,s.jsx)(fo,{type:"text",placeholder:"Enter Transaction Reference Number",value:b,onChange:e=>v(e.target.value)})]})]}),(0,s.jsx)(ho,{onClick:async()=>{if(m||b){k(!0);try{const e=sessionStorage.getItem("pendingOrderData");if(!e)return alert("Order data not found. Please go back and try again."),void k(!1);const r=JSON.parse(e),o={...r,payment_status:"payment_verification_pending",payment_proof:{image:m,reference:b,file_name:x,uploaded_at:(new Date).toISOString()}};console.log("\ud83d\udcbe Creating order with payment proof in DATABASE...");const s=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!s.ok)throw new Error("Failed to create order in database");const l=(await s.json()).data;console.log("\u2705 Order created in DB with ID:",l.id);const c=l.order_number,d=c?c.split("-")[1]:"001",u=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");u.includes(l.id)||(u.push(l.id),localStorage.setItem("customerOrderIds",JSON.stringify(u))),a({id:l.id,pickupNumber:d,items:r.order_items,total:r.total_amount,status:"outstanding",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"pending"}),i(),sessionStorage.removeItem("pendingOrderData"),n(`/mobile/${t}/order/${l.id}`)}catch(e){console.error("Error submitting payment proof:",e),alert("Failed to submit payment proof. Please try again.")}finally{k(!1)}}else alert("Please upload payment receipt or enter transaction reference number")},disabled:w||!m&&!b,children:w?"Submitting...":"Confirm Payment"})]})},yo=o.Ay.div`
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
`,bo=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,vo=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
`,wo=o.Ay.div`
  font-size: 48px;
  font-weight: 700;
  color: #635BFF;
  margin: 16px 0 24px;
  text-align: center;
`,ko=o.Ay.div`
  background: #FAFBFC;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`,So=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`,jo=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,Co=o.Ay.div`
  font-size: 14px;
  color: #1F2937;
  font-weight: 600;
  text-align: right;
`,Eo=o.Ay.button`
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
`,Ao=o.Ay.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,Fo=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
`,_o=o.Ay.div`
  font-size: 13px;
  color: #92400E;
  line-height: 1.6;
`,Po=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,zo=o.Ay.div`
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
`,Ro=o.Ay.div`
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
`,Oo=o.Ay.button`
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
`,To=o.Ay.div`
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
`,Bo=o.Ay.input`
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
`,Io=o.Ay.button`
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
`,No=o.Ay.input`
  display: none;
`,Do=()=>{const{slug:t}=(0,r.g)(),n=(0,r.Zp)(),o=(0,r.zy)(),{setCurrentOrder:a,clearCart:i,currentStore:l,currency:c}=Ge(),d=(0,e.useRef)(null),u=sessionStorage.getItem("pendingOrderData"),p=u?JSON.parse(u):o.state,f=(null===p||void 0===p?void 0:p.total_amount)||(null===p||void 0===p?void 0:p.total)||0,[h,m]=(0,e.useState)(null),[g,x]=(0,e.useState)(""),[y,b]=(0,e.useState)(""),[v,w]=(0,e.useState)(!1),[k,S]=(0,e.useState)(null),[j,C]=(0,e.useState)({bankName:"Loading...",accountName:"Loading...",accountNumber:"Loading..."});e.useEffect(()=>{(async()=>{try{if(null===l||void 0===l||!l.id)return void console.warn("\u26a0\ufe0f No currentStore.id available, cannot load bank details");const t=await fetch(`/api/restaurants/${l.id}`);if(t.ok){var e;const n=await t.json(),r=n.data||n;if(null!==(e=r.payment_settings)&&void 0!==e&&e.bankTransfer){const e=r.payment_settings.bankTransfer;C({bankName:e.bankName||"Maybank",accountName:e.accountName||"ABC Restaurant Sdn Bhd",accountNumber:e.accountNumber||"514-123-456-789"})}else C({bankName:"Maybank",accountName:"ABC Restaurant Sdn Bhd",accountNumber:"514-123-456-789"})}}catch(t){console.error("Failed to load bank details:",t),C({bankName:"Maybank",accountName:"ABC Restaurant Sdn Bhd",accountNumber:"514-123-456-789"})}})()},[null===l||void 0===l?void 0:l.id]);const E=(e,t)=>{navigator.clipboard.writeText(e),S(t),setTimeout(()=>S(null),2e3)},A=e=>{if(e.size>5242880)return void alert("Image size must be less than 5MB");if(!e.type.startsWith("image/"))return void alert("Please upload an image file");const t=new FileReader;t.onloadend=()=>{m(t.result),x(e.name)},t.readAsDataURL(e)};return(0,s.jsxs)(Ot,{title:"Bank Transfer",showBack:!0,onBack:()=>n(`/mobile/${t}/payment`),children:[(0,s.jsxs)(yo,{children:[(0,s.jsxs)(bo,{children:[(0,s.jsx)(wo,{children:(0,Tt.vv)(f,c)}),(0,s.jsxs)(ko,{children:[(0,s.jsxs)(So,{children:[(0,s.jsx)(jo,{children:"Bank Name"}),(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,s.jsx)(Co,{children:j.bankName}),(0,s.jsx)(Eo,{onClick:()=>E(j.bankName,"bankName"),children:"bankName"===k?"Copied!":"Copy"})]})]}),(0,s.jsxs)(So,{children:[(0,s.jsx)(jo,{children:"Account Name"}),(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,s.jsx)(Co,{children:j.accountName}),(0,s.jsx)(Eo,{onClick:()=>E(j.accountName,"accountName"),children:"accountName"===k?"Copied!":"Copy"})]})]}),(0,s.jsxs)(So,{children:[(0,s.jsx)(jo,{children:"Account Number"}),(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,s.jsx)(Co,{children:j.accountNumber}),(0,s.jsx)(Eo,{onClick:()=>E(j.accountNumber,"accountNumber"),children:"accountNumber"===k?"Copied!":"Copy"})]})]})]})]}),(0,s.jsxs)(Ao,{children:[(0,s.jsx)(Fo,{children:"\u26a0\ufe0f Important"}),(0,s.jsxs)(_o,{children:["1. Transfer exactly ",(0,s.jsx)("strong",{children:(0,Tt.vv)(f,c)})," to the account above",(0,s.jsx)("br",{}),"2. Keep your transaction receipt",(0,s.jsx)("br",{}),"3. Upload the receipt or enter reference number below",(0,s.jsx)("br",{}),"4. Your order will be confirmed after verification"]})]}),(0,s.jsxs)(Po,{children:[(0,s.jsx)(vo,{children:"Payment Proof"}),h?(0,s.jsxs)(Ro,{children:[(0,s.jsx)("img",{src:h,alt:"Payment receipt"}),(0,s.jsx)(Oo,{onClick:()=>{m(null),x(""),d.current&&(d.current.value="")},children:"\xd7"})]}):(0,s.jsx)(zo,{onClick:()=>{var e;return null===(e=d.current)||void 0===e?void 0:e.click()},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{var t;e.preventDefault(),e.stopPropagation();const n=null===(t=e.dataTransfer.files)||void 0===t?void 0:t[0];n&&A(n)}}),(0,s.jsx)(No,{ref:d,type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];n&&A(n)}}),g&&(0,s.jsxs)("div",{style:{fontSize:"13px",color:"#059669",marginBottom:"16px",padding:"8px 12px",background:"#F0FDF4",borderRadius:"6px"},children:["\u2713 ",g]}),(0,s.jsx)(To,{children:"OR"}),(0,s.jsx)(Bo,{type:"text",placeholder:"Enter Transfer Reference Number",value:y,onChange:e=>b(e.target.value)})]})]}),(0,s.jsx)(Io,{onClick:async()=>{if(h||y){w(!0);try{const e=sessionStorage.getItem("pendingOrderData");if(!e)return alert("Order data not found. Please go back and try again."),void w(!1);const r=JSON.parse(e),o={...r,payment_status:"payment_verification_pending",payment_proof:{image:h,reference:y,file_name:g,uploaded_at:(new Date).toISOString()}};console.log("\ud83d\udcbe Creating order with payment proof in DATABASE...");const s=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!s.ok)throw new Error("Failed to create order in database");const l=(await s.json()).data;console.log("\u2705 Order created in DB with ID:",l.id);const c=l.order_number,d=c?c.split("-")[1]:"001",u=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");u.includes(l.id)||(u.push(l.id),localStorage.setItem("customerOrderIds",JSON.stringify(u))),a({id:l.id,pickupNumber:d,items:r.order_items,total:r.total_amount,status:"outstanding",createdAt:new Date,estimatedPickupTime:new Date(Date.now()+18e5),paymentStatus:"pending"}),i(),sessionStorage.removeItem("pendingOrderData"),n(`/mobile/${t}/order/${l.id}`)}catch(e){console.error("Error submitting payment proof:",e),alert("Failed to submit payment proof. Please try again.")}finally{w(!1)}}else alert("Please upload payment receipt or enter transfer reference number")},disabled:v||!h&&!y,children:v?"Submitting...":"Confirm Payment"})]})},Lo=e=>{const t=new Date(e),n=new Date(t.getTime()+18e5),r=e=>{const t=e.getHours(),n=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:n}},o=r(t),a=r(n);return o.period===a.period?`${o.time} - ${a.time} ${a.period}`:`${o.time} ${o.period} - ${a.time} ${a.period}`},$o=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
`,Mo=o.Ay.div`
  background: linear-gradient(135deg, #635BFF 0%, #4F46E5 100%);
  color: white;
  border-radius: 20px;
  padding: 32px 48px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(99, 91, 255, 0.3);
  margin-bottom: 32px;
`,qo=o.Ay.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
`,Ho=o.Ay.div`
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
`,Uo=o.Ay.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 32px;
`,Wo=o.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Go=o.Ay.div`
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
`,Vo=o.Ay.div`
  flex: 1;
`,Yo=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: ${e=>e.active||e.completed?"#1F2937":"#9CA3AF"};
  margin-bottom: 4px;
`,Qo=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Ko=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`,Jo=o.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Xo=o.Ay.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`,Zo=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,ea=o.Ay.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`,ta=o.Ay.button`
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
`,na=(0,o.Ay)(ta)`
  background: #635BFF;
  color: white;
  border: none;
  
  &:active {
    background: #5A51E6;
  }
`,ra=(0,o.Ay)(ta)`
  background: white;
  color: #6B7280;
  border: 1px solid #E5E7EB;
  
  &:active {
    background: #F9FAFB;
  }
`,oa=()=>{const{slug:t,orderId:n}=(0,r.g)(),o=(0,r.Zp)(),{currency:a}=Ge(),[i,l]=(0,e.useState)(null),[c,d]=(0,e.useState)(!0),[u,p]=(0,e.useState)(null);(0,e.useEffect)(()=>{n&&f();const e=e=>{"pos_orders"!==e.key&&"guestOrders"!==e.key||!n||f(!0)},t=()=>{n&&f(!0)};window.addEventListener("storage",e),window.addEventListener("storage",t);const r=setInterval(()=>{n&&"completed"!==(null===i||void 0===i?void 0:i.status)&&f(!0)},3e3);return()=>{clearInterval(r),window.removeEventListener("storage",e),window.removeEventListener("storage",t)}},[n]);const f=async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!n)return p("No order ID provided"),void d(!1);e||(d(!0),p(null));try{console.log("\ufffd\ufffd Loading order with ID:",n);try{const t=await fetch(`/api/mobile/order/${n}`);if(console.log("\ud83d\udce1 API response status:",t.status),t.ok){const n=await t.json();console.log("\ud83d\udce6 API response data:",n);const r=n.data||n;if(r&&(r.id||r.orderNumber))return console.log("\u2705 Loaded order from API:",r),l({...r,estimatedPickupTime:r.estimatedPickupTime||new Date(new Date(r.createdAt||r.order_date||Date.now()).getTime()+9e5)}),p(null),void(e||d(!1));console.warn("\u26a0\ufe0f API order data is incomplete:",r)}else{console.log("\u26a0\ufe0f API response not OK:",t.status);const e=await t.text();console.log("\u26a0\ufe0f Error response:",e)}}catch(t){console.error("\u274c Failed to load order from database:",t),e||p("Order not found")}}catch(u){console.error("\u274c Error loading order:",u),e||p("Failed to load order")}finally{e||d(!1)}},h=()=>{o(`/mobile/${t}/menu`)},m=()=>{o(`/mobile/${t}`)};if(c)return(0,s.jsx)(Ot,{title:"Loading Order...",children:(0,s.jsx)($o,{children:(0,s.jsx)("div",{style:{color:"#9CA3AF",fontSize:"16px",textAlign:"center",padding:"48px 24px"},children:"Loading your order..."})})});if(u||!i)return(0,s.jsx)(Ot,{title:"Order Not Found",children:(0,s.jsxs)($o,{children:[(0,s.jsx)("div",{style:{color:"#9CA3AF",fontSize:"16px",textAlign:"center",padding:"48px 24px"},children:u||"This order could not be found."}),(0,s.jsx)("div",{style:{textAlign:"center",marginTop:"16px"},children:(0,s.jsx)(ra,{onClick:()=>o(`/mobile/${t}`),children:"Back to Home"})})]})});const g=()=>{try{return i.table_number||i.tableNumber||null}catch(u){return null}},x=()=>{const e=g();if(e){return`T${String(e).replace(/^T/i,"")}`}return(()=>{try{if(g())return null;if(i.pickup_number)return i.pickup_number;if(i.pickupNumber)return i.pickupNumber;const e=i.order_number||i.orderNumber;if(e&&"string"===typeof e&&e.includes("-")){const t=e.split("-");if(t.length>1)return t[t.length-1]}if(i.id){const e=String(i.id);return(e.startsWith("ORD")?e.substring(3):e).padStart(3,"0")}return"000"}catch(u){return console.error("Error getting pickup number:",u),"000"}})()},y=()=>{try{return i.order_number||i.orderNumber||i.id||"N/A"}catch(u){return console.error("Error getting order number:",u),"N/A"}},b=()=>{try{const e=i.total_amount||i.total||0,t=parseFloat(e);return isNaN(t)?(console.error("Invalid total amount:",e),0):t}catch(u){return console.error("Error getting total amount:",u),0}},v=()=>{try{return i.payment_status||i.paymentStatus||"pending"}catch(u){return console.error("Error getting payment status:",u),"pending"}},w=()=>{try{return i.order_items||i.items||[]}catch(u){return console.error("Error getting order items:",u),[]}},k=(()=>{if(!i)return[];const e="payment_verification_pending"===(i.payment_status||i.paymentStatus),t="outstanding"===(null===i||void 0===i?void 0:i.status),n=e?[{id:"payment_verification_pending",title:"Payment Verification",icon:"1",time:"Verifying payment..."},{id:"pending",title:"Order Placed",icon:"2",time:"Pending"},{id:"preparing",title:"Preparing",icon:"3",time:"Waiting"},{id:"ready",title:"Ready for Pickup",icon:"4",time:"Waiting"},{id:"completed",title:"Completed",icon:"\u2713",time:""}]:t?[{id:"outstanding",title:"Awaiting Payment",icon:"1",time:"Staff is waiting at counter..."},{id:"pending",title:"Order Placed",icon:"2",time:"Pending"},{id:"preparing",title:"Preparing",icon:"3",time:"Waiting"},{id:"ready",title:"Ready for Pickup",icon:"4",time:"Waiting"},{id:"completed",title:"Completed",icon:"\u2713",time:""}]:[{id:"pending",title:"Order Placed",icon:"1",time:"Just now"},{id:"preparing",title:"Preparing",icon:"2",time:"In 2 min"},{id:"ready",title:"Ready for Pickup",icon:"3",time:"In 15 min"},{id:"completed",title:"Completed",icon:"\u2713",time:""}];let r=null===i||void 0===i?void 0:i.status;e?r="payment_verification_pending":t&&(r="outstanding");const o=n.findIndex(e=>e.id===r);return n.map((e,t)=>({...e,active:t===o,completed:t<o}))})();try{return(0,s.jsx)(Ot,{title:"Order Status",currentPage:"orders",children:(0,s.jsxs)($o,{children:[(0,s.jsxs)(Mo,{children:[(0,s.jsx)(qo,{children:g()?"Your Table Number":"Your Pickup Number"}),(0,s.jsx)(Ho,{children:x()}),"pickup"===(null===i||void 0===i?void 0:i.order_type)&&(0,s.jsxs)("div",{style:{fontSize:"14px",color:"#8B5CF6",fontWeight:"600",marginTop:"8px"},children:["Pickup: ",null!==i&&void 0!==i&&i.scheduled_pickup_time?Lo(i.scheduled_pickup_time):"ASAP"]})]}),(0,s.jsx)(Uo,{children:k.map(e=>(0,s.jsxs)(Wo,{active:e.active,completed:e.completed,children:[(0,s.jsx)(Go,{active:e.active,completed:e.completed,children:e.icon}),(0,s.jsxs)(Vo,{children:[(0,s.jsx)(Yo,{active:e.active,completed:e.completed,children:e.title}),e.time&&(0,s.jsx)(Qo,{children:e.time})]})]},e.id))}),(0,s.jsxs)(Ko,{children:[(0,s.jsxs)(Jo,{children:[(0,s.jsx)("span",{style:{color:"#6B7280"},children:"Order Number"}),(0,s.jsx)("span",{style:{fontWeight:600},children:y()})]}),(0,s.jsxs)(Jo,{children:[(0,s.jsx)("span",{style:{color:"#6B7280"},children:"Total Amount"}),(0,s.jsx)("span",{style:{fontWeight:600},children:(0,Tt.vv)(b(),a)})]}),(0,s.jsxs)(Jo,{children:[(0,s.jsx)("span",{style:{color:"#6B7280"},children:"Payment"}),(0,s.jsx)("span",{style:{fontWeight:600,color:"payment_verification_pending"===v()?"#F59E0B":"completed"===v()||"paid"===v()?"#10B981":"#6B7280"},children:"payment_verification_pending"===v()?"Verifying Payment":"completed"===v()||"paid"===v()?"\u2713 Paid":"Pay at Counter"})]}),w().length>0&&(0,s.jsx)(Xo,{children:w().map((e,t)=>{try{var n;const r=(null===e||void 0===e||null===(n=e.menuItem)||void 0===n?void 0:n.name)||(null===e||void 0===e?void 0:e.name)||"Item",o=(null===e||void 0===e?void 0:e.quantity)||1,a=(null===e||void 0===e?void 0:e.options)||(null===e||void 0===e?void 0:e.selectedOptions)||[],i=(null===e||void 0===e?void 0:e.special_instructions)||(null===e||void 0===e?void 0:e.specialInstructions);return(0,s.jsxs)("div",{style:{marginBottom:"8px"},children:[(0,s.jsxs)(Zo,{children:[o,"x ",r,a.length>0&&` (${a.join(", ")})`]}),i&&(0,s.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"2px",paddingLeft:"16px"},children:["Note: ",i]})]},(null===e||void 0===e?void 0:e.id)||`item-${t}`)}catch(r){return console.error("Error rendering item:",r),null}})}),(null===i||void 0===i?void 0:i.delivery_info)&&(0,s.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#F3F4F6",borderRadius:"8px"},children:[(0,s.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"8px"},children:"Delivery Information"}),(0,s.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[(0,s.jsx)("div",{style:{marginBottom:"4px"},children:i.delivery_info.address}),(0,s.jsxs)("div",{style:{marginBottom:"4px"},children:["Phone: ",i.delivery_info.phone]}),i.delivery_info.zoneName&&(0,s.jsxs)("div",{style:{marginBottom:"4px"},children:["Zone: ",i.delivery_info.zoneName]}),i.delivery_info.notes&&(0,s.jsxs)("div",{style:{fontStyle:"italic"},children:["Notes: ",i.delivery_info.notes]})]})]})]}),"payment_verification_pending"===v()&&(0,s.jsxs)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"24px",width:"100%",maxWidth:"400px"},children:[(0,s.jsx)("div",{style:{color:"#92400E",fontWeight:600,marginBottom:"8px"},children:"Payment Verification in Progress"}),(0,s.jsx)("div",{style:{color:"#92400E",fontSize:"13px"},children:"Your payment is being verified by our staff. You will be notified once confirmed."}),(()=>{try{const e=i.payment_proof||i.paymentProof;if(e&&"object"===typeof e){const t=e.reference,n=e.file_name||e.fileName;if(t||n)return(0,s.jsxs)("div",{style:{marginTop:"12px",padding:"8px",background:"white",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:[t&&(0,s.jsxs)("div",{children:["Reference: ",(0,s.jsx)("strong",{children:t})]}),n&&(0,s.jsxs)("div",{children:["Receipt: ",n]})]})}}catch(e){console.error("Error rendering payment proof:",e)}return null})()]}),"outstanding"===(null===i||void 0===i?void 0:i.status)&&"counter"===(null===i||void 0===i?void 0:i.payment_method)&&(0,s.jsxs)("div",{style:{background:"#EBF8FF",border:"1px solid #635BFF",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"24px",width:"100%",maxWidth:"400px"},children:[(0,s.jsx)("div",{style:{color:"#1E40AF",fontWeight:600,marginBottom:"8px"},children:"Awaiting Payment at Counter"}),(0,s.jsx)("div",{style:{color:"#1E40AF",fontSize:"13px"},children:"Please proceed to the counter to complete your payment. Our staff is waiting to assist you."})]}),"ready"===(null===i||void 0===i?void 0:i.status)&&(0,s.jsx)("div",{style:{background:"#D1FAE5",border:"1px solid #10B981",borderRadius:"8px",padding:"12px 16px",textAlign:"center",marginBottom:"24px",width:"100%",maxWidth:"400px"},children:(0,s.jsx)("div",{style:{color:"#065F46",fontWeight:600},children:"Your order is ready for pickup!"})}),"completed"===(null===i||void 0===i?void 0:i.status)&&(0,s.jsxs)(ea,{children:[(0,s.jsx)(ra,{onClick:m,children:"Home"}),(0,s.jsx)(na,{onClick:h,children:"New Order"})]})]})})}catch(S){return console.error("\u274c Error rendering order tracking page:",S),(0,s.jsx)(Ot,{title:"Error",children:(0,s.jsxs)($o,{children:[(0,s.jsx)("div",{style:{color:"#EF4444",fontSize:"16px",textAlign:"center",padding:"48px 24px"},children:"An error occurred while displaying your order."}),(0,s.jsx)("div",{style:{textAlign:"center",marginTop:"16px"},children:(0,s.jsx)(ra,{onClick:()=>o(`/mobile/${t}`),children:"Back to Home"})})]})})}},aa=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,ia=o.Ay.div`
  text-align: center;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,sa=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,la=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,ca=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`,da=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,ua=o.Ay.div`
  flex: 1;
`,pa=o.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,fa=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,ha=o.Ay.div`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"completed":return"#D1FAE5";case"preparing":case"payment_verification_pending":return"#FEF3C7";case"ready":return"#DBEAFE";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#065F46";case"preparing":case"payment_verification_pending":return"#92400E";case"ready":return"#1E40AF";case"cancelled":return"#991B1B";default:return"#374151"}}};
`,ma=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`,ga=o.Ay.div`
  font-size: 14px;
  color: #4B5563;
  display: flex;
  justify-content: space-between;
`,xa=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
`,ya=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`,ba=o.Ay.div`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${e=>{switch(e.orderType){case"dine-in":case"dine_in":return"#E0E7FF";case"takeaway":return"#FEF3C7";case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.orderType){case"dine-in":case"dine_in":return"#3730A3";case"takeaway":return"#92400E";case"pickup":return"#6D28D9";case"delivery":return"#065F46";default:return"#374151"}}};
`,va=e=>{switch(e){case"dine-in":case"dine_in":return"Dine In";case"takeaway":return"Takeaway";case"pickup":return"Pre-order Pickup";case"delivery":return"Delivery";default:return e}},wa=()=>{const t=(0,r.Zp)(),{slug:n}=(0,r.g)(),[o,a]=(0,e.useState)([]),{currentStore:i,setCurrentStore:l,currency:c}=Ge(),{currentCustomer:d}=(0,f.c)();(0,e.useEffect)(()=>{(async()=>{if(!i&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&l({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,i,l]),(0,e.useEffect)(()=>{if(i){u();const e=setInterval(()=>{u()},5e3);return()=>{clearInterval(e)}}},[i,d]);const u=async()=>{if(i)try{if(d&&d.id){console.log("\ud83d\udd04 Loading orders for logged-in customer:",d.id,"restaurant:",i.id);const e=await fetch(`/api/customers/${d.id}/orders?restaurant_id=${i.id}&limit=100`);if(e.ok){const t=await e.json();if(t.success&&t.data)return console.log(`\u2705 Loaded ${t.data.length} orders for customer from API`),void a(t.data)}return console.log("\u2139\ufe0f No orders found for this customer"),void a([])}console.log("\ud83d\udd04 Loading guest orders from localStorage...");const e=JSON.parse(localStorage.getItem("customerOrderIds")||"[]");if(0===e.length)return console.log("\u2139\ufe0f No orders found in localStorage"),void a([]);console.log(`\ud83d\udccb Found ${e.length} order IDs in localStorage:`,e);const t=e.map(async e=>{try{const t=await fetch(`/api/mobile/order/${e}`);if(t.ok){return(await t.json()).data}return null}catch(t){return console.error(`Failed to load order ${e}:`,t),null}}),n=(await Promise.all(t)).filter(e=>null!==e);console.log(`\u2705 Loaded ${n.length} orders from API`);const r=[...n].sort((e,t)=>{const n=new Date(e.createdAt||e.order_date||e.created_at).getTime();return new Date(t.createdAt||t.order_date||t.created_at).getTime()-n});a(r)}catch(e){console.error("\u274c Error loading orders:",e),a([])}else console.warn("No currentStore available")},p=e=>{const t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?`Today at ${t.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}`:t.toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})},h=e=>{switch(e){case"pending":return"Order Placed";case"payment_verification_pending":return"Payment Verification";case"preparing":return"Preparing";case"ready":return"Ready for Pickup";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e}};return(0,s.jsx)(Ot,{title:"My Orders",currentPage:"orders",children:(0,s.jsx)(aa,{children:0===o.length?(0,s.jsxs)(ia,{children:[(0,s.jsx)(sa,{children:"No orders yet"}),(0,s.jsx)(la,{children:"Your order history will appear here"})]}):o.map((e,r)=>{if(!e||!e.id)return console.warn("Invalid order data:",e),null;const o=e.id,a=e.pickup_number||e.pickupNumber||(e.order_number?String(e.order_number).split("-").pop():null)||(e.orderNumber?String(e.orderNumber).split("-").pop():null)||String(o).padStart(3,"0"),i=e.createdAt||e.order_date||e.created_at||(new Date).toISOString();let l=e.order_items||e.items||[];Array.isArray(l)||(console.warn(`Order ${o}: orderItems is not an array:`,l),l=[]);const d=e.total_amount||e.total||0,u=e.order_type||e.orderType||"takeaway",f=e.payment_status||e.paymentStatus,m=e.status||"pending";let g;return g="payment_verification_pending"===f?"payment_verification_pending":m,console.log(`Order ${o}: pickupNumber=${a}, paymentStatus=${f}, orderStatus=${m}, displayStatus=${g}, items=${l.length}`),(0,s.jsxs)(ca,{onClick:()=>(e=>{t(`/mobile/${n}/order/${e}`)})(String(o)),children:[(0,s.jsxs)(da,{children:[(0,s.jsxs)(ua,{children:[(0,s.jsxs)(pa,{children:["Order #",a]}),(0,s.jsx)(fa,{children:p(i)})]}),(0,s.jsx)(ha,{status:g,children:h(g)})]}),l.length>0?(0,s.jsxs)(ma,{children:[l.slice(0,2).map((e,t)=>{var n,r;const o=e.name||(null===(n=e.menuItem)||void 0===n?void 0:n.name)||"Item",a=e.quantity||1,i=e.item_price||e.price||(null===(r=e.menuItem)||void 0===r?void 0:r.price)||0;return(0,s.jsxs)(ga,{children:[(0,s.jsxs)("span",{children:[a,"x ",o]}),(0,s.jsx)("span",{children:(0,Tt.vv)(Number(i)*a,c)})]},`item-${t}`)}),l.length>2&&(0,s.jsx)(ga,{children:(0,s.jsxs)("span",{style:{color:"#6B7280"},children:["+",l.length-2," more items"]})})]}):(0,s.jsx)(ma,{children:(0,s.jsx)(ga,{children:(0,s.jsx)("span",{style:{color:"#6B7280"},children:"No items"})})}),(0,s.jsxs)(xa,{children:[(0,s.jsx)(ya,{children:(0,Tt.vv)(Number(d),c)}),(0,s.jsx)(ba,{orderType:u,children:va(u)})]})]},`order-${o}-${r}`)}).filter(Boolean)})})},ka=o.Ay.div`
  padding: 0 0 24px;
`,Sa=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,ja=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`,Ca=o.Ay.div`
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
`,Ea=o.Ay.div`
  flex: 1;
`,Aa=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,Fa=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,_a=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  margin: 4px 0 0 0;
`,Pa=o.Ay.div`
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`,za=o.Ay.div`
  flex: 1;
  text-align: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 12px;
`,Ra=o.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
`,Oa=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,Ta=o.Ay.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`,Ba=o.Ay.button`
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
`,Ia=o.Ay.div`
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
`,Na=o.Ay.div`
  flex: 1;
`,Da=o.Ay.div`
  font-size: 15px;
  font-weight: 500;
  color: #1F2937;
`,La=o.Ay.div`
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 2px;
`,$a=o.Ay.div`
  color: #D1D5DB;

  svg {
    width: 20px;
    height: 20px;
  }
`,Ma=o.Ay.button`
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
`,qa=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`,Ha=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ua=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
`,Wa=o.Ay.button`
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
`,Ga=o.Ay.button`
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
`,Va=o.Ay.div`
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
`,Ya=o.Ay.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 24px;
`,Qa=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,Ka=o.Ay.div`
  margin-bottom: 16px;
`,Ja=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`,Xa=o.Ay.input`
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
`,Za=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ei=o.Ay.button`
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${e=>"secondary"===e.variant?"\n    background: #F3F4F6;\n    border: none;\n    color: #4B5563;\n  ":"\n    background: #635BFF;\n    border: none;\n    color: white;\n  "}
`,ti=()=>{const t=(0,r.Zp)(),{slug:n}=(0,r.g)(),{currentCustomer:o,logoutCustomer:a,updateCustomer:i}=(0,f.c)(),{currency:l,currentStore:c,setCurrentStore:d}=Ge(),[u,p]=(0,e.useState)(!1),[h,m]=(0,e.useState)(""),[g,x]=(0,e.useState)(""),[y,b]=(0,e.useState)(""),[v,w]=(0,e.useState)(!1),[k,S]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""}),[j,C]=(0,e.useState)({totalOrders:0,totalSpent:0,points:0});(0,e.useEffect)(()=>{(async()=>{if(!c&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&d({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,c,d]),(0,e.useEffect)(()=>{(async()=>{if(o&&c)try{const e=await fetch(`/api/customers/stats/${o.id}?restaurant_id=${c.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&C({totalOrders:t.data.total_orders||0,totalSpent:parseFloat(t.data.total_spent)||0,points:t.data.points||0})}}catch(e){console.error("Failed to load customer stats:",e)}})()},[o,c]);const E=(e,t,n,r)=>{S({isOpen:!0,type:e,title:t,message:n,onConfirm:r})};return o?(0,s.jsxs)(Ot,{title:"My Account",currentPage:"orders",children:[(0,s.jsxs)(ka,{children:[(0,s.jsxs)(Sa,{children:[(0,s.jsxs)(ja,{children:[(0,s.jsx)(Ca,{children:(A=o.name||"U",A.split(" ").map(e=>e[0]).join("").toUpperCase().substring(0,2))}),(0,s.jsxs)(Ea,{children:[(0,s.jsx)(Aa,{children:o.name}),(0,s.jsx)(Fa,{children:o.phone}),o.email&&(0,s.jsx)(_a,{children:o.email})]})]}),(0,s.jsxs)(Pa,{children:[(0,s.jsxs)(za,{children:[(0,s.jsx)(Ra,{children:j.totalOrders}),(0,s.jsx)(Oa,{children:"Orders"})]}),(0,s.jsxs)(za,{children:[(0,s.jsx)(Ra,{children:(0,Tt.vv)(j.totalSpent,l)}),(0,s.jsx)(Oa,{children:"Total Spent"})]}),(0,s.jsxs)(za,{children:[(0,s.jsx)(Ra,{children:j.points}),(0,s.jsx)(Oa,{children:"Points"})]})]})]}),(0,s.jsxs)(Ta,{children:[(0,s.jsxs)(Ba,{onClick:()=>t(`/mobile/${n}/orders`),children:[(0,s.jsx)(Ia,{color:"#635BFF",children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("path",{d:"M9 11l3 3L22 4"}),(0,s.jsx)("path",{d:"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"})]})}),(0,s.jsxs)(Na,{children:[(0,s.jsx)(Da,{children:"Order History"}),(0,s.jsx)(La,{children:"View your past orders"})]}),(0,s.jsx)($a,{children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{d:"M9 18l6-6-6-6"})})})]}),(0,s.jsxs)(Ba,{onClick:()=>p(!0),children:[(0,s.jsx)(Ia,{color:"#10B981",children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,s.jsx)("path",{d:"M7 11V7a5 5 0 0110 0v4"})]})}),(0,s.jsxs)(Na,{children:[(0,s.jsx)(Da,{children:"Change Password"}),(0,s.jsx)(La,{children:"Update your password"})]}),(0,s.jsx)($a,{children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{d:"M9 18l6-6-6-6"})})})]})]}),(0,s.jsx)(Ma,{onClick:()=>{E("warning","Logout","Are you sure you want to logout?",()=>{a(),t(`/mobile/${n}`)})},children:"Logout"})]}),u&&(0,s.jsx)(Va,{onClick:()=>p(!1),children:(0,s.jsxs)(Ya,{onClick:e=>e.stopPropagation(),children:[(0,s.jsx)(Qa,{children:"Change Password"}),(0,s.jsxs)(Ka,{children:[(0,s.jsx)(Ja,{children:"Current Password"}),(0,s.jsx)(Xa,{type:"password",value:h,onChange:e=>m(e.target.value),placeholder:"Enter current password"})]}),(0,s.jsxs)(Ka,{children:[(0,s.jsx)(Ja,{children:"New Password"}),(0,s.jsx)(Xa,{type:"password",value:g,onChange:e=>x(e.target.value),placeholder:"Enter new password"})]}),(0,s.jsxs)(Ka,{children:[(0,s.jsx)(Ja,{children:"Confirm New Password"}),(0,s.jsx)(Xa,{type:"password",value:y,onChange:e=>b(e.target.value),placeholder:"Confirm new password"})]}),(0,s.jsxs)(Za,{children:[(0,s.jsx)(ei,{variant:"secondary",onClick:()=>p(!1),children:"Cancel"}),(0,s.jsx)(ei,{onClick:async()=>{if(h)if(g)if(g.length<6)E("error","Error","Password must be at least 6 characters");else if(g===y){w(!0);try{const e=await fetch(`/api/customers/${null===o||void 0===o?void 0:o.id}/password`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:h,newPassword:g})}),t=await e.json();e.ok&&t.success?(p(!1),m(""),x(""),b(""),E("success","Success","Password changed successfully")):E("error","Error",t.message||"Failed to change password")}catch(e){E("error","Error","Failed to change password. Please try again.")}finally{w(!1)}}else E("error","Error","New passwords do not match");else E("error","Error","Please enter a new password");else E("error","Error","Please enter your current password")},disabled:v,children:v?"Changing...":"Change Password"})]})]})}),(0,s.jsx)(ut,{isOpen:k.isOpen,onClose:()=>S(e=>({...e,isOpen:!1})),type:k.type,title:k.title,message:k.message,onConfirm:k.onConfirm,showCancel:!!k.onConfirm})]}):(0,s.jsxs)(Ot,{title:"Account",currentPage:"orders",children:[(0,s.jsxs)(ka,{children:[(0,s.jsxs)(qa,{children:[(0,s.jsx)(Ca,{style:{margin:"0 auto 20px",width:80,height:80,fontSize:32},children:(0,s.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,s.jsx)("circle",{cx:"12",cy:"7",r:"4"})]})}),(0,s.jsx)(Ha,{children:"Welcome!"}),(0,s.jsx)(Ua,{children:"Login or create an account to track your orders, earn points, and enjoy a faster checkout experience."}),(0,s.jsx)(Wa,{onClick:()=>t(`/mobile/${n}/login`),children:"Login"}),(0,s.jsx)(Ga,{onClick:()=>t(`/mobile/${n}/register`),children:"Create Account"})]}),(0,s.jsx)(Ta,{style:{marginTop:16},children:(0,s.jsxs)(Ba,{onClick:()=>t(`/mobile/${n}/orders`),children:[(0,s.jsx)(Ia,{color:"#635BFF",children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("path",{d:"M9 11l3 3L22 4"}),(0,s.jsx)("path",{d:"M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"})]})}),(0,s.jsxs)(Na,{children:[(0,s.jsx)(Da,{children:"Order History"}),(0,s.jsx)(La,{children:"View your recent orders"})]}),(0,s.jsx)($a,{children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{d:"M9 18l6-6-6-6"})})})]})})]}),(0,s.jsx)(ut,{isOpen:k.isOpen,onClose:()=>S(e=>({...e,isOpen:!1})),type:k.type,title:k.title,message:k.message,onConfirm:k.onConfirm,showCancel:!!k.onConfirm})]});var A},ni=o.Ay.div`
  padding: 20px 0;
`,ri=o.Ay.div`
  text-align: center;
  margin-bottom: 32px;
`,oi=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ai=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,ii=o.Ay.form`
  display: flex;
  flex-direction: column;
`,si=o.Ay.div`
  margin-bottom: 20px;
`,li=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,ci=o.Ay.input`
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
`,di=o.Ay.button`
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
`,ui=o.Ay.button`
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
`,pi=o.Ay.div`
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
`,fi=o.Ay.button`
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
`,hi=o.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 24px;
`,mi=o.Ay.button`
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
`,gi=()=>{const t=(0,r.Zp)(),{slug:n}=(0,r.g)(),{setCurrentCustomer:o}=(0,f.c)(),{currentStore:a,setCurrentStore:i}=Ge(),[l,c]=(0,e.useState)("email"),[d,u]=(0,e.useState)(""),[p,h]=(0,e.useState)(""),[m,g]=(0,e.useState)(""),[x,y]=(0,e.useState)(!1),[b,v]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!a&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&i({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{},country:t.data.country})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,a,i]);const w=(e,t,n)=>{v({isOpen:!0,type:e,title:t,message:n})};return(0,s.jsxs)(Ot,{title:"Login",onBack:()=>{window.history.length>1?t(-1):t(`/mobile/${n}/menu`)},children:[(0,s.jsxs)(ni,{children:[(0,s.jsxs)(ri,{children:[(0,s.jsx)(oi,{children:"Welcome Back"}),(0,s.jsx)(ai,{children:"Login to your account"})]}),(0,s.jsxs)(ii,{onSubmit:async e=>{e.preventDefault();const r="email"===l?d:p;if(r)if(m){y(!0);try{const e=await fetch("/api/customers/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier:r,password:m})}),a=await e.json();if(e.ok&&a.success){const e={id:a.data.id.toString(),type:a.data.type,name:a.data.name,phone:a.data.phone,email:a.data.email||"",points:a.data.points||0,totalOrders:a.data.totalOrders||0,totalSpent:a.data.totalSpent||0,favoriteItems:[],addresses:[],joinDate:(new Date).toISOString().split("T")[0],loyaltyTier:a.data.loyaltyTier||"Bronze",isActive:!0};o(e),w("success","Welcome!",`Welcome back, ${a.data.name}!`),setTimeout(()=>{t(`/mobile/${n}/account`)},1500)}else w("error","Login Failed",a.message||"Invalid email/phone or password")}catch(a){w("error","Error","Failed to login. Please try again.")}finally{y(!1)}}else w("error","Error","Please enter your password");else w("error","Error","email"===l?"Please enter your email":"Please enter your phone number")},children:[(0,s.jsxs)(hi,{children:[(0,s.jsx)(mi,{type:"button",active:"email"===l,onClick:()=>c("email"),children:"Email"}),(0,s.jsx)(mi,{type:"button",active:"phone"===l,onClick:()=>c("phone"),children:"Phone"})]}),"email"===l?(0,s.jsxs)(si,{children:[(0,s.jsx)(li,{children:"Email Address"}),(0,s.jsx)(ci,{type:"email",value:d,onChange:e=>u(e.target.value),placeholder:"Enter your email",autoComplete:"email"})]}):(0,s.jsxs)(si,{children:[(0,s.jsx)(li,{children:"Phone Number"}),(0,s.jsx)(or,{value:p,onChange:h,defaultCountryCode:null===a||void 0===a?void 0:a.country,placeholder:"Phone number"})]}),(0,s.jsxs)(si,{children:[(0,s.jsx)(li,{children:"Password"}),(0,s.jsx)(ci,{type:"password",value:m,onChange:e=>g(e.target.value),placeholder:"Enter your password",autoComplete:"current-password"})]}),(0,s.jsx)(di,{type:"button",onClick:()=>t(`/mobile/${n}/forgot-password`),children:"Forgot Password?"}),(0,s.jsx)(ui,{type:"submit",disabled:x,children:x?"Logging in...":"Login"}),(0,s.jsx)(pi,{children:(0,s.jsx)("span",{children:"New here?"})}),(0,s.jsx)(fi,{type:"button",onClick:()=>t(`/mobile/${n}/register`),children:"Create Account"})]})]}),(0,s.jsx)(ut,{isOpen:b.isOpen,onClose:()=>v(e=>({...e,isOpen:!1})),type:b.type,title:b.title,message:b.message})]})},xi=o.Ay.div`
  padding: 20px 0;
`,yi=o.Ay.div`
  text-align: center;
  margin-bottom: 24px;
`,bi=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`,vi=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,wi=o.Ay.form`
  display: flex;
  flex-direction: column;
`,ki=o.Ay.div`
  margin-bottom: 16px;

  input, select {
    border-color: ${e=>e.hasError?"#DC2626":"#E5E7EB"};
  }
`,Si=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,ji=o.Ay.input`
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
`,Ci=o.Ay.span`
  color: #DC2626;
  margin-left: 2px;
`,Ei=o.Ay.div`
  color: #DC2626;
  font-size: 12px;
  margin-top: 4px;
`,Ai=o.Ay.div`
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
`,Fi=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,_i=o.Ay.button`
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
`,Pi=o.Ay.div`
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
`,zi=o.Ay.button`
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
`,Ri=o.Ay.p`
  font-size: 12px;
  color: #9CA3AF;
  text-align: center;
  margin: 16px 0 0;
  line-height: 1.5;

  a {
    color: #635BFF;
    text-decoration: none;
  }
`,Oi=()=>{const t=(0,r.Zp)(),{slug:n}=(0,r.g)(),{loginCustomer:o}=(0,f.c)(),{currentStore:a,setCurrentStore:i}=Ge(),[l,c]=(0,e.useState)(""),[d,u]=(0,e.useState)(""),[p,h]=(0,e.useState)(""),[m,g]=(0,e.useState)(""),[x,y]=(0,e.useState)(""),[b,v]=(0,e.useState)(!1),[w,k]=(0,e.useState)({}),[S,j]=(0,e.useState)(""),[C,E]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!a&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&i({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{},country:t.data.country})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,a,i]);const A=e=>{k(t=>({...t,[e]:void 0})),j("")};return(0,s.jsxs)(Ot,{title:"Create Account",onBack:()=>{window.history.length>1?t(-1):t(`/mobile/${n}/menu`)},children:[(0,s.jsxs)(xi,{children:[(0,s.jsxs)(yi,{children:[(0,s.jsx)(bi,{children:"Create Account"}),(0,s.jsx)(vi,{children:"Join us for a better experience"})]}),(0,s.jsxs)(wi,{onSubmit:async e=>{if(e.preventDefault(),j(""),(()=>{const e={};l.trim()||(e.name="Name is required"),d.trim()||(e.phone="Phone number is required"),p.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p)||(e.email="Please enter a valid email address"):e.email="Email is required";return m?m.length<6&&(e.password="Password must be at least 6 characters"):e.password="Password is required",x?m!==x&&(e.confirmPassword="Passwords do not match"):e.confirmPassword="Please confirm your password",k(e),0===Object.keys(e).length})()){v(!0);try{const e=await fetch("/api/customers/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l.trim(),phone:d.trim(),email:p.trim(),password:m,restaurantId:null===a||void 0===a?void 0:a.id})}),r=await e.json();e.ok&&r.success?(o(r.data),E({isOpen:!0,type:"success",title:"Welcome!",message:"Your account has been created successfully!",onConfirm:()=>t(`/mobile/${n}/account`)})):r.field?k({[r.field]:r.message}):j(r.message||"Failed to create account. Please try again.")}catch(r){j("Failed to create account. Please check your connection and try again.")}finally{v(!1)}}},children:[S&&(0,s.jsxs)(Ai,{children:[S,S.includes("already registered")&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsx)("a",{onClick:()=>t(`/mobile/${n}/login`),children:"Login here"})]})]}),(0,s.jsxs)(ki,{hasError:!!w.name,children:[(0,s.jsxs)(Si,{children:["Name",(0,s.jsx)(Ci,{children:"*"})]}),(0,s.jsx)(ji,{type:"text",value:l,onChange:e=>{c(e.target.value),A("name")},placeholder:"Enter your name"}),w.name&&(0,s.jsx)(Ei,{children:w.name})]}),(0,s.jsxs)(ki,{hasError:!!w.phone,children:[(0,s.jsxs)(Si,{children:["Phone Number",(0,s.jsx)(Ci,{children:"*"})]}),(0,s.jsx)(or,{value:d,onChange:e=>{u(e),A("phone")},defaultCountryCode:null===a||void 0===a?void 0:a.country,placeholder:"Phone number"}),w.phone&&(0,s.jsx)(Ei,{children:w.phone})]}),(0,s.jsxs)(ki,{hasError:!!w.email,children:[(0,s.jsxs)(Si,{children:["Email",(0,s.jsx)(Ci,{children:"*"})]}),(0,s.jsx)(ji,{type:"email",value:p,onChange:e=>{h(e.target.value),A("email")},placeholder:"Enter your email"}),w.email&&(0,s.jsx)(Ei,{children:w.email})]}),(0,s.jsxs)(ki,{hasError:!!w.password,children:[(0,s.jsxs)(Si,{children:["Password",(0,s.jsx)(Ci,{children:"*"})]}),(0,s.jsx)(ji,{type:"password",value:m,onChange:e=>{g(e.target.value),A("password")},placeholder:"Create a password"}),(0,s.jsx)(Fi,{children:"Minimum 6 characters"}),w.password&&(0,s.jsx)(Ei,{children:w.password})]}),(0,s.jsxs)(ki,{hasError:!!w.confirmPassword,children:[(0,s.jsxs)(Si,{children:["Confirm Password",(0,s.jsx)(Ci,{children:"*"})]}),(0,s.jsx)(ji,{type:"password",value:x,onChange:e=>{y(e.target.value),A("confirmPassword")},placeholder:"Confirm your password"}),w.confirmPassword&&(0,s.jsx)(Ei,{children:w.confirmPassword})]}),(0,s.jsx)(Ri,{children:"By creating an account, you agree to our Terms of Service and Privacy Policy"}),(0,s.jsx)(_i,{type:"submit",disabled:b,children:b?"Creating Account...":"Create Account"}),(0,s.jsx)(Pi,{children:(0,s.jsx)("span",{children:"Already have an account?"})}),(0,s.jsx)(zi,{type:"button",onClick:()=>t(`/mobile/${n}/login`),children:"Login"})]})]}),(0,s.jsx)(ut,{isOpen:C.isOpen,onClose:()=>{E(e=>({...e,isOpen:!1})),C.onConfirm&&C.onConfirm()},type:C.type,title:C.title,message:C.message})]})},Ti=o.Ay.div`
  padding: 20px 0;
`,Bi=o.Ay.div`
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
`,Ii=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
  text-align: center;
`,Ni=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
  text-align: center;
`,Di=o.Ay.form`
  display: flex;
  flex-direction: column;
`,Li=o.Ay.div`
  margin-bottom: 20px;
`,$i=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,Mi=o.Ay.input`
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
`,qi=o.Ay.div`
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 16px;
  padding: 12px;
  background: #FEF2F2;
  border-radius: 8px;
`,Hi=o.Ay.div`
  color: #0369A1;
  font-size: 13px;
  margin-bottom: 16px;
  padding: 12px;
  background: #E0F2FE;
  border-radius: 8px;
`,Ui=o.Ay.button`
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
`,Wi=o.Ay.button`
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
`,Gi=o.Ay.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #6B7280;

  span {
    color: #635BFF;
    cursor: pointer;
    text-decoration: underline;
  }
`,Vi=o.Ay.div`
  text-align: center;
  padding: 40px 0;
`,Yi=o.Ay.div`
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
`,Qi=o.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`,Ki=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
`,Ji=o.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 24px;
`,Xi=o.Ay.button`
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
`,Zi=()=>{const t=(0,r.Zp)(),{slug:n}=(0,r.g)(),{currentStore:o,setCurrentStore:a}=Ge(),[i,l]=(0,e.useState)("email"),[c,d]=(0,e.useState)(""),[u,p]=(0,e.useState)(""),[f,h]=(0,e.useState)(!1),[m,g]=(0,e.useState)(!1),[x,y]=(0,e.useState)(""),[b,v]=(0,e.useState)(""),[w,k]=(0,e.useState)(""),[S,j]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!o&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&a({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,o,a]);const C=()=>{window.history.length>1?t(-1):t(`/mobile/${n}/menu`)};if(m){const e="email"===i?c:w;return(0,s.jsxs)(Ot,{title:"Password Reset",onBack:C,children:[(0,s.jsxs)(Vi,{children:[(0,s.jsx)(Yi,{children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("path",{d:"M22 11.08V12a10 10 0 11-5.93-9.14"}),(0,s.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),(0,s.jsx)(Qi,{children:"Check Your Email"}),(0,s.jsxs)(Ki,{children:["We've sent a password reset link to ",(0,s.jsx)("strong",{children:e}),". Please check your inbox and spam folder."]}),(0,s.jsx)(Ui,{onClick:C,children:"Continue"})]}),(0,s.jsx)(ut,{isOpen:S.isOpen,onClose:()=>j(e=>({...e,isOpen:!1})),type:S.type,title:S.title,message:S.message})]})}return(0,s.jsxs)(Ot,{title:"Forgot Password",onBack:C,children:[(0,s.jsxs)(Ti,{children:[(0,s.jsx)(Bi,{children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,s.jsx)("path",{d:"M7 11V7a5 5 0 0110 0v4"})]})}),(0,s.jsx)(Ii,{children:"Forgot Password?"}),(0,s.jsx)(Ni,{children:"Enter your email or phone number and we'll send you a link to reset your password."}),(0,s.jsxs)(Ji,{children:[(0,s.jsx)(Xi,{active:"email"===i,onClick:()=>{l("email"),y(""),v("")},children:"By Email"}),(0,s.jsx)(Xi,{active:"phone"===i,onClick:()=>{l("phone"),y("")},children:"By Phone"})]}),"email"===i?(0,s.jsxs)(Di,{onSubmit:async e=>{if(e.preventDefault(),y(""),!c.trim())return void y("Please enter your email address");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)){h(!0);try{const e=await fetch("/api/customers/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c.trim(),slug:n})});!1===(await e.json()).emailExists?y("No account found with this email address."):g(!0)}catch(t){y("Failed to send reset email. Please try again.")}finally{h(!1)}}else y("Please enter a valid email address")},children:[(0,s.jsxs)(Li,{children:[(0,s.jsx)($i,{children:"Email Address"}),(0,s.jsx)(Mi,{type:"email",value:c,onChange:e=>{d(e.target.value),y("")},placeholder:"Enter your email"})]}),x&&(0,s.jsxs)(qi,{children:[x,x.includes("No account")&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsx)("span",{onClick:()=>t(`/mobile/${n}/register`),style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Sign up here"})]})]}),(0,s.jsx)(Ui,{type:"submit",disabled:f,children:f?"Sending...":"Send Reset Link"}),(0,s.jsxs)(Gi,{children:["Don't know your email?"," ",(0,s.jsx)("span",{onClick:()=>{l("phone"),y("")},children:"Use phone number"})]})]}):(0,s.jsxs)(Di,{onSubmit:async e=>{if(e.preventDefault(),y(""),v(""),u.trim()){h(!0);try{const e=await fetch("/api/customers/find-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:u.trim()})}),t=await e.json();!1===t.found?y("No account found with this phone number."):v(t.maskedEmail)}catch(t){y("Failed to find account. Please try again.")}finally{h(!1)}}else y("Please enter your phone number")},children:[(0,s.jsxs)(Li,{children:[(0,s.jsx)($i,{children:"Phone Number"}),(0,s.jsx)(or,{value:u,onChange:p,defaultCountryCode:null===o||void 0===o?void 0:o.country,placeholder:"Phone number"})]}),x&&(0,s.jsxs)(qi,{children:[x,x.includes("No account")&&(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsx)("span",{onClick:()=>t(`/mobile/${n}/register`),style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},children:"Sign up here"})]})]}),b&&(0,s.jsxs)(Hi,{children:["We found your account! Reset link will be sent to: ",(0,s.jsx)("strong",{children:b})]}),b?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(Ui,{type:"button",onClick:async()=>{h(!0),y("");try{const e=await fetch("/api/customers/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:u.trim(),slug:n})}),t=await e.json();t.success?(k(b),g(!0)):y(t.message||"Failed to send reset email.")}catch(e){y("Failed to send reset email. Please try again.")}finally{h(!1)}},disabled:f,children:f?"Sending...":"Send Reset Link"}),(0,s.jsx)(Wi,{type:"button",onClick:()=>t(`/mobile/${n}/login`),children:"Back to Login"})]}):(0,s.jsx)(Ui,{type:"submit",disabled:f,children:f?"Searching...":"Find My Account"}),(0,s.jsxs)(Gi,{children:["Remember your email?"," ",(0,s.jsx)("span",{onClick:()=>{l("email"),y(""),v("")},children:"Use email instead"})]})]})]}),(0,s.jsx)(ut,{isOpen:S.isOpen,onClose:()=>j(e=>({...e,isOpen:!1})),type:S.type,title:S.title,message:S.message})]})},es=o.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
`,ts=o.Ay.div`
  text-align: center;
  margin: 60px 0 32px;
`,ns=o.Ay.div`
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
`,rs=o.Ay.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 8px 0;
`,os=o.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
`,as=o.Ay.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`,is=o.Ay.div`
  margin-bottom: 20px;
`,ss=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,ls=o.Ay.input`
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
`,cs=o.Ay.button`
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
`,ds=o.Ay.div`
  text-align: center;
  padding: 40px 0;
`,us=o.Ay.div`
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
`,ps=o.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`,fs=o.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
`,hs=o.Ay.div`
  text-align: center;
  padding: 40px 0;
`,ms=o.Ay.div`
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
`,gs=o.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 12px 0;
`,xs=o.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
`,ys=()=>{const t=(0,r.Zp)(),{slug:n}=(0,r.g)(),[o]=(0,r.ok)(),a=o.get("token"),{currentStore:i,setCurrentStore:l}=Ge(),[c,d]=(0,e.useState)(""),[u,p]=(0,e.useState)(""),[f,h]=(0,e.useState)(!1),[m,g]=(0,e.useState)(!1),[x,y]=(0,e.useState)(null),[b,v]=(0,e.useState)(null),[w,k]=(0,e.useState)({isOpen:!1,type:"info",title:"",message:""});(0,e.useEffect)(()=>{(async()=>{if(!i&&n)try{const e=await fetch(`/api/restaurants/slug/${n}`);if(e.ok){const t=await e.json();t.success&&t.data&&l({id:t.data.id.toString(),name:t.data.name,slug:t.data.slug,description:t.data.description||"",logo:t.data.logo||"",isOpen:t.data.is_open||!0,openingHours:t.data.opening_hours||{}})}}catch(e){console.error("Failed to load restaurant:",e)}})()},[n,i,l]),(0,e.useEffect)(()=>{(async()=>{if(a)try{const e=await fetch(`/api/customers/verify-reset-token?token=${a}`),t=await e.json();y(e.ok&&t.valid),t.slug&&v(t.slug)}catch(e){y(!1)}else y(!1)})()},[a]);const S=(e,t,n)=>{k({isOpen:!0,type:e,title:t,message:n})};if(null===x)return(0,s.jsx)(es,{children:(0,s.jsxs)(ts,{children:[(0,s.jsx)(ns,{children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,s.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}),(0,s.jsx)(rs,{children:"Verifying..."}),(0,s.jsx)(os,{children:"Please wait while we verify your reset link."})]})});if(!1===x)return(0,s.jsx)(es,{children:(0,s.jsxs)(hs,{children:[(0,s.jsx)(ms,{children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,s.jsx)("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),(0,s.jsx)("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),(0,s.jsx)(gs,{children:"Invalid or Expired Link"}),(0,s.jsx)(xs,{children:"This password reset link is invalid or has expired. Please request a new one."}),(0,s.jsx)(cs,{onClick:()=>t(`/mobile/${b||n}/forgot-password`),children:"Request New Link"})]})});const j=b||n;return m?(0,s.jsx)(es,{children:(0,s.jsxs)(ds,{children:[(0,s.jsx)(us,{children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("path",{d:"M22 11.08V12a10 10 0 11-5.93-9.14"}),(0,s.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),(0,s.jsx)(ps,{children:"Password Reset!"}),(0,s.jsx)(fs,{children:"Your password has been successfully reset. You can now login with your new password."}),(0,s.jsx)(cs,{onClick:()=>t(`/mobile/${j}/login`),children:"Login Now"})]})}):(0,s.jsxs)(es,{children:[(0,s.jsxs)(ts,{children:[(0,s.jsx)(ns,{children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,s.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),(0,s.jsx)("path",{d:"M7 11V7a5 5 0 0110 0v4"})]})}),(0,s.jsx)(rs,{children:"Reset Password"}),(0,s.jsx)(os,{children:"Enter your new password below."})]}),(0,s.jsxs)(as,{onSubmit:async e=>{if(e.preventDefault(),c)if(c.length<6)S("error","Error","Password must be at least 6 characters");else if(c===u){h(!0);try{const e=await fetch("/api/customers/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:a,password:c})}),t=await e.json();e.ok&&t.success?g(!0):S("error","Error",t.message||"Failed to reset password. The link may have expired.")}catch(t){S("error","Error","Failed to reset password. Please try again.")}finally{h(!1)}}else S("error","Error","Passwords do not match");else S("error","Error","Please enter a new password")},children:[(0,s.jsxs)(is,{children:[(0,s.jsx)(ss,{children:"New Password"}),(0,s.jsx)(ls,{type:"password",value:c,onChange:e=>d(e.target.value),placeholder:"Enter new password (min 6 characters)"})]}),(0,s.jsxs)(is,{children:[(0,s.jsx)(ss,{children:"Confirm New Password"}),(0,s.jsx)(ls,{type:"password",value:u,onChange:e=>p(e.target.value),placeholder:"Confirm new password"})]}),(0,s.jsx)(cs,{type:"submit",disabled:f,children:f?"Resetting...":"Reset Password"})]}),(0,s.jsx)(ut,{isOpen:w.isOpen,onClose:()=>k(e=>({...e,isOpen:!1})),type:w.type,title:w.title,message:w.message})]})},bs=()=>(0,s.jsx)(f.y,{children:(0,s.jsx)(h.Y,{children:(0,s.jsx)(Ve,{children:(0,s.jsxs)(r.BV,{children:[(0,s.jsx)(r.qh,{path:"/:slug",element:(0,s.jsx)(wt,{})}),(0,s.jsx)(r.qh,{path:"/:slug/order-type",element:(0,s.jsx)(wt,{})}),(0,s.jsx)(r.qh,{path:"/:slug/menu",element:(0,s.jsx)(en,{})}),(0,s.jsx)(r.qh,{path:"/:slug/item/:itemId",element:(0,s.jsx)(Rn,{})}),(0,s.jsx)(r.qh,{path:"/:slug/cart",element:(0,s.jsx)(Kn,{})}),(0,s.jsx)(r.qh,{path:"/:slug/payment",element:(0,s.jsx)(Kr,{})}),(0,s.jsx)(r.qh,{path:"/:slug/payment/qr",element:(0,s.jsx)(xo,{})}),(0,s.jsx)(r.qh,{path:"/:slug/payment/bank-transfer",element:(0,s.jsx)(Do,{})}),(0,s.jsx)(r.qh,{path:"/:slug/order/:orderId",element:(0,s.jsx)(oa,{})}),(0,s.jsx)(r.qh,{path:"/:slug/orders",element:(0,s.jsx)(wa,{})}),(0,s.jsx)(r.qh,{path:"/:slug/account",element:(0,s.jsx)(ti,{})}),(0,s.jsx)(r.qh,{path:"/:slug/login",element:(0,s.jsx)(gi,{})}),(0,s.jsx)(r.qh,{path:"/:slug/register",element:(0,s.jsx)(Oi,{})}),(0,s.jsx)(r.qh,{path:"/:slug/forgot-password",element:(0,s.jsx)(Zi,{})}),(0,s.jsx)(r.qh,{path:"/:slug/reset-password",element:(0,s.jsx)(ys,{})})]})})})}),vs=()=>(0,s.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"16px",color:"#6B7280"},children:"Loading..."}),ws=e.lazy(()=>Promise.all([n.e(3422),n.e(3310),n.e(7693),n.e(4648)]).then(n.bind(n,4648))),ks=e.lazy(()=>Promise.all([n.e(7693),n.e(2548)]).then(n.bind(n,2548))),Ss=e.lazy(()=>Promise.all([n.e(3422),n.e(6814)]).then(n.bind(n,6814))),js=e.lazy(()=>Promise.all([n.e(3422),n.e(6e3)]).then(n.bind(n,6e3))),Cs=e.lazy(()=>Promise.all([n.e(3310),n.e(6554)]).then(n.bind(n,6554))),Es=e.lazy(()=>Promise.all([n.e(4662),n.e(3585),n.e(3310),n.e(4032)]).then(n.bind(n,4032))),As=e.lazy(()=>Promise.all([n.e(9163),n.e(3310),n.e(187)]).then(n.bind(n,187))),Fs=e.lazy(()=>Promise.all([n.e(3310),n.e(2766)]).then(n.bind(n,2766))),_s=e.lazy(()=>Promise.all([n.e(3310),n.e(4656)]).then(n.bind(n,4656))),Ps=e.lazy(()=>Promise.all([n.e(3310),n.e(2370)]).then(n.bind(n,2370))),zs=e.lazy(()=>Promise.all([n.e(3310),n.e(1748)]).then(n.bind(n,1748))),Rs=e.lazy(()=>Promise.all([n.e(3310),n.e(3416)]).then(n.bind(n,3416))),Os=e.lazy(()=>Promise.all([n.e(3310),n.e(6780)]).then(n.bind(n,6780))),Ts=e.lazy(()=>Promise.all([n.e(3310),n.e(408)]).then(n.bind(n,408))),Bs=e.lazy(()=>Promise.all([n.e(3310),n.e(6136)]).then(n.bind(n,6136))),Is=e.lazy(()=>Promise.all([n.e(3310),n.e(9440)]).then(n.bind(n,9440))),Ns=e.lazy(()=>Promise.all([n.e(3310),n.e(3201)]).then(n.bind(n,3201))),Ds=e.lazy(()=>Promise.all([n.e(3310),n.e(3643)]).then(n.bind(n,3643))),Ls=e.lazy(()=>Promise.all([n.e(3310),n.e(2341)]).then(n.bind(n,2341))),$s=e.lazy(()=>Promise.all([n.e(3310),n.e(9327)]).then(n.bind(n,9327))),Ms=e.lazy(()=>Promise.all([n.e(3310),n.e(7283)]).then(n.bind(n,7283))),qs=e.lazy(()=>Promise.all([n.e(3310),n.e(6529)]).then(n.bind(n,6529))),Hs=e.lazy(()=>Promise.all([n.e(3310),n.e(4107)]).then(n.bind(n,4107))),Us=e.lazy(()=>Promise.all([n.e(3310),n.e(6837)]).then(n.bind(n,6837))),Ws=e.lazy(()=>Promise.all([n.e(3310),n.e(1566)]).then(n.bind(n,1566))),Gs=e.lazy(()=>Promise.all([n.e(4662),n.e(3310),n.e(1)]).then(n.bind(n,1))),Vs=e.lazy(()=>Promise.all([n.e(3310),n.e(5871)]).then(n.bind(n,5871))),Ys=e.lazy(()=>Promise.all([n.e(3310),n.e(6843)]).then(n.bind(n,6843))),Qs=e.lazy(()=>Promise.all([n.e(3310),n.e(4685)]).then(n.bind(n,4685))),Ks=e.lazy(()=>Promise.all([n.e(3310),n.e(9889)]).then(n.bind(n,9889))),Js=e.lazy(()=>Promise.all([n.e(3310),n.e(4083)]).then(n.bind(n,4083))),Xs=e.lazy(()=>Promise.all([n.e(3310),n.e(6866)]).then(n.bind(n,6866))),Zs=e.lazy(()=>Promise.all([n.e(3310),n.e(733)]).then(n.bind(n,733))),el=e.lazy(()=>Promise.all([n.e(3310),n.e(5581)]).then(n.bind(n,5581))),tl=e.lazy(()=>Promise.all([n.e(3310),n.e(2969)]).then(n.bind(n,2969))),nl=e.lazy(()=>Promise.all([n.e(3310),n.e(5008)]).then(n.bind(n,5008))),rl=e.lazy(()=>Promise.all([n.e(3310),n.e(5577)]).then(n.bind(n,5577))),ol=e.lazy(()=>Promise.all([n.e(3310),n.e(3543)]).then(n.bind(n,3543))),al=e.lazy(()=>Promise.all([n.e(3310),n.e(8317)]).then(n.bind(n,8317))),il=e.lazy(()=>Promise.all([n.e(3310),n.e(4602)]).then(n.bind(n,4602))),sl=e.lazy(()=>Promise.all([n.e(3310),n.e(8018)]).then(n.bind(n,8018))),ll=e.lazy(()=>Promise.all([n.e(3310),n.e(6121)]).then(n.bind(n,6121))),cl=e.lazy(()=>Promise.all([n.e(3310),n.e(3913)]).then(n.bind(n,3913))),dl=e.lazy(()=>Promise.all([n.e(3310),n.e(7795)]).then(n.bind(n,7795))),ul=e.lazy(()=>Promise.all([n.e(3310),n.e(1038)]).then(n.bind(n,1038))),pl=e.lazy(()=>Promise.all([n.e(3310),n.e(9485)]).then(n.bind(n,9485))),fl=e.lazy(()=>Promise.all([n.e(3310),n.e(4551)]).then(n.bind(n,4551))),hl=e.lazy(()=>Promise.all([n.e(3310),n.e(4269)]).then(n.bind(n,4269))),ml=e.lazy(()=>Promise.all([n.e(3310),n.e(8309)]).then(n.bind(n,8309))),gl=e.lazy(()=>Promise.all([n.e(3310),n.e(4293)]).then(n.bind(n,4293))),xl=e.lazy(()=>Promise.all([n.e(3310),n.e(7606)]).then(n.bind(n,7606))),yl=e.lazy(()=>Promise.all([n.e(3310),n.e(441)]).then(n.bind(n,441))),bl=e.lazy(()=>Promise.all([n.e(3310),n.e(749)]).then(n.bind(n,749))),vl=e.lazy(()=>Promise.all([n.e(3310),n.e(8026)]).then(n.bind(n,8026))),wl=e.lazy(()=>Promise.all([n.e(3310),n.e(758)]).then(n.bind(n,758))),kl=e.lazy(()=>Promise.all([n.e(3310),n.e(2301)]).then(n.bind(n,2301))),Sl=e.lazy(()=>Promise.all([n.e(3310),n.e(6152)]).then(n.bind(n,6152))),jl=e.lazy(()=>Promise.all([n.e(3310),n.e(2612)]).then(n.bind(n,2612))),Cl=e.lazy(()=>Promise.all([n.e(3310),n.e(8060)]).then(n.bind(n,8060))),El=e.lazy(()=>Promise.all([n.e(3310),n.e(2980)]).then(n.bind(n,2980))),Al=e.lazy(()=>Promise.all([n.e(3310),n.e(7999)]).then(n.bind(n,7999))),Fl=e.lazy(()=>Promise.all([n.e(3310),n.e(2652)]).then(n.bind(n,2652))),_l=e.lazy(()=>Promise.all([n.e(3310),n.e(8844)]).then(n.bind(n,8844))),Pl=e.lazy(()=>Promise.all([n.e(3310),n.e(9134)]).then(n.bind(n,9134))),zl=e.lazy(()=>Promise.all([n.e(3310),n.e(9328)]).then(n.bind(n,9328))),Rl=e.lazy(()=>Promise.all([n.e(3310),n.e(7576)]).then(n.bind(n,7576))),Ol=e.lazy(()=>Promise.all([n.e(3310),n.e(1268)]).then(n.bind(n,1268))),Tl=e.lazy(()=>Promise.all([n.e(3310),n.e(4987)]).then(n.bind(n,4987))),Bl=e.lazy(()=>Promise.all([n.e(4662),n.e(3585),n.e(3310),n.e(677)]).then(n.bind(n,677))),Il=e.lazy(()=>Promise.all([n.e(3310),n.e(1450)]).then(n.bind(n,1450))),Nl=e.lazy(()=>Promise.all([n.e(3310),n.e(6929)]).then(n.bind(n,6929))),Dl=e.lazy(()=>Promise.all([n.e(3310),n.e(2790)]).then(n.bind(n,2790))),Ll=e.lazy(()=>Promise.all([n.e(3310),n.e(9876)]).then(n.bind(n,9876))),$l=()=>{const{user:e,isAuthenticated:t,isLoading:n}=(0,m.As)();if(n)return(0,s.jsx)("div",{children:"Loading..."});if(!t)return(0,s.jsx)(r.C5,{to:"/pos",replace:!0});switch(null===e||void 0===e?void 0:e.role){case"System Admin":return(0,s.jsx)(r.C5,{to:"/pos/admin/dashboard",replace:!0});case"Foodcourt General":return(0,s.jsx)(r.C5,{to:"/pos/foodcourt/general/dashboard",replace:!0});case"Brand General":return(0,s.jsx)(r.C5,{to:"/pos/brand/general/dashboard",replace:!0});case"Foodcourt Manager":return(0,s.jsx)(r.C5,{to:"/pos/foodcourt/dashboard",replace:!0});case"Brand Manager":return(0,s.jsx)(r.C5,{to:"/pos/brand/dashboard",replace:!0});case"Restaurant Admin":case"Staff":{const t=(null===e||void 0===e?void 0:e.restaurantId)||"1",n="Restaurant Admin"===(null===e||void 0===e?void 0:e.role)?`/restaurant/${t}/dashboard`:`/restaurant/${t}/basic`;return(0,s.jsx)(r.C5,{to:n,replace:!0})}default:{const t=(null===e||void 0===e?void 0:e.restaurantId)||"1";return(0,s.jsx)(r.C5,{to:`/restaurant/${t}/basic`,replace:!0})}}},Ml=()=>{const{user:e}=(0,m.As)(),t=(0,r.zy)().pathname.replace("/pos/restaurant/",""),n=(null===e||void 0===e?void 0:e.restaurantId)||"1";return(0,s.jsx)(r.C5,{to:`/restaurant/${n}/${t}`,replace:!0})};const ql=function(){return e.useEffect(()=>{(async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();if(t.seo_title&&(document.title=t.seo_title),t.favicon_url){const e=document.getElementById("favicon");e&&(e.href=t.favicon_url)}if(t.seo_description){const e=document.getElementById("meta-description");e&&e.setAttribute("content",t.seo_description)}if(t.seo_keywords){const e=document.getElementById("meta-keywords");e&&e.setAttribute("content",t.seo_keywords)}if(t.seo_title){const e=document.getElementById("og-title"),n=document.getElementById("twitter-title");e&&e.setAttribute("content",t.seo_title),n&&n.setAttribute("content",t.seo_title)}if(t.seo_description){const e=document.getElementById("og-description"),n=document.getElementById("twitter-description");e&&e.setAttribute("content",t.seo_description),n&&n.setAttribute("content",t.seo_description)}if(t.og_image_url){const e=document.getElementById("og-image"),n=document.getElementById("twitter-image");e&&e.setAttribute("content",t.og_image_url),n&&n.setAttribute("content",t.og_image_url)}}}catch(e){console.error("Failed to load site settings:",e)}})()},[]),(0,s.jsx)(c,{children:(0,s.jsx)(u.tv,{children:(0,s.jsx)(f.y,{children:(0,s.jsx)(d.sy,{children:(0,s.jsx)(r.Kd,{children:(0,s.jsx)(m.OJ,{children:(0,s.jsx)(h.Y,{children:(0,s.jsx)(p.BV,{children:(0,s.jsxs)(g.y,{children:[(0,s.jsx)(C,{}),(0,s.jsx)(e.Suspense,{fallback:(0,s.jsx)(vs,{}),children:(0,s.jsxs)(r.BV,{children:[(0,s.jsx)(r.qh,{path:"/",element:(0,s.jsx)(U,{})}),(0,s.jsx)(r.qh,{path:"/about",element:(0,s.jsx)(oe,{})}),(0,s.jsx)(r.qh,{path:"/service",element:(0,s.jsx)(Se,{})}),(0,s.jsx)(r.qh,{path:"/pos",element:(0,s.jsx)(Ue,{})}),(0,s.jsx)(r.qh,{path:"/mobile/*",element:(0,s.jsx)(bs,{})}),(0,s.jsx)(r.qh,{path:"/pos/admin/dashboard",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Ns,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/managers",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Ds,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/restaurants",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Ls,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/subscriptions",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)($s,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/staff",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(sl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/invoices",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Ms,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/plans",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Us,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/addon-modules",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Ws,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/report",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Gs,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/support",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Vs,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/system-config",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Xs,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/security",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(Zs,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/backup",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(el,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/logs",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(tl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/settings",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(fl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/site-settings",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(hl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/restaurant-subscriptions",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(nl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/admin/notification-settings",element:(0,s.jsx)(j,{requiredRole:["System Admin"],children:(0,s.jsx)(xl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/profile",element:(0,s.jsx)(j,{children:(0,s.jsx)(Os,{})})}),(0,s.jsx)(r.qh,{path:"/pos/foodcourt/general/dashboard",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General"],children:(0,s.jsx)(yl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/foodcourt/general/management",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General"],children:(0,s.jsx)(zl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/foodcourt/general/stats",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General"],children:(0,s.jsx)(Rl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand/general/dashboard",element:(0,s.jsx)(j,{requiredRole:["Brand General"],children:(0,s.jsx)(bl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand/general/management",element:(0,s.jsx)(j,{requiredRole:["Brand General"],children:(0,s.jsx)(Ol,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand/general/performance",element:(0,s.jsx)(j,{requiredRole:["Brand General"],children:(0,s.jsx)(Tl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand/general/reports",element:(0,s.jsx)(j,{requiredRole:["Brand General"],children:(0,s.jsx)(Bl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/recipes",element:(0,s.jsx)(j,{requiredRole:["Brand General","System Admin"],children:(0,s.jsx)(kl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand-products",element:(0,s.jsx)(j,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,s.jsx)(Pl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand-inventory",element:(0,s.jsx)(j,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,s.jsx)(Fl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/recipe-management/recipes",element:(0,s.jsx)(j,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,s.jsx)(Sl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/recipe-management/ingredients",element:(0,s.jsx)(j,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,s.jsx)(jl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/suppliers",element:(0,s.jsx)(j,{requiredRole:["Brand General","Brand Manager","System Admin"],children:(0,s.jsx)(Cl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/foodcourt/dashboard",element:(0,s.jsx)(j,{requiredRole:["Foodcourt Manager"],children:(0,s.jsx)(vl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/foodcourt/rent-management",element:(0,s.jsx)(j,{requiredRole:["Foodcourt Manager"],children:(0,s.jsx)(Il,{})})}),(0,s.jsx)(r.qh,{path:"/pos/foodcourt/tenant-support",element:(0,s.jsx)(j,{requiredRole:["Foodcourt Manager"],children:(0,s.jsx)(Nl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand/dashboard",element:(0,s.jsx)(j,{requiredRole:["Brand Manager"],children:(0,s.jsx)(wl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand/franchise-support",element:(0,s.jsx)(j,{requiredRole:["Brand Manager"],children:(0,s.jsx)(Dl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/brand/reports",element:(0,s.jsx)(j,{requiredRole:["Brand Manager"],children:(0,s.jsx)(Ll,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/dashboard",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(rl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/subscriptions",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(ol,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/restaurants",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(al,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/staff",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(il,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/sales",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(ll,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/reports",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(cl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/customers",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(dl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/promotions",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(ul,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/plans",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(pl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/support",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(Ys,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/operation-inquiry",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(Ks,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/invoices",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(Hs,{})})}),(0,s.jsx)(r.qh,{path:"/pos/manager/notification-settings",element:(0,s.jsx)(j,{requiredRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(xl,{})})}),(0,s.jsx)(r.qh,{path:"/pos/restaurant/*",element:(0,s.jsx)(Ml,{})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/dashboard",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"],children:(0,s.jsx)(ml,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/live-orders",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,s.jsx)(ws,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/pos-terminal",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,s.jsx)(ks,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/kitchen",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,s.jsx)(Ss,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/display",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,s.jsx)(js,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/menu",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Fs,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/categories",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(_s,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/options",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Ps,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/recipe-management",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(kl,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/suppliers",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Cl,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/customers",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(zs,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/staff",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Rs,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/sales",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Ts,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/promotions",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Cs,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/reports",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Es,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/support",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,s.jsx)(Qs,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/operation-inquiry",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,s.jsx)(Js,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/settings",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(As,{})})}),(0,s.jsx)(r.qh,{path:"/pos/dashboard",element:(0,s.jsx)(j,{children:(0,s.jsx)($l,{})})}),(0,s.jsx)(r.qh,{path:"/pos/basic",element:(0,s.jsx)(j,{children:(0,s.jsx)(gl,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/company-information",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin","Staff"],children:(0,s.jsx)(Bs,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/profile",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,children:(0,s.jsx)(Os,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/invoices",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin"],children:(0,s.jsx)(qs,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/history",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin"],children:(0,s.jsx)(Is,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/notification-settings",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["Restaurant Admin"],children:(0,s.jsx)(xl,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/inventory",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(El,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/stock-take",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Al,{})})}),(0,s.jsx)(r.qh,{path:"/restaurants/:restaurantId/inventory",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(El,{})})}),(0,s.jsx)(r.qh,{path:"/restaurants/:restaurantId/stock-take",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(Al,{})})}),(0,s.jsx)(r.qh,{path:"/restaurant/:restaurantId/product-recipes",element:(0,s.jsx)(j,{requireRestaurantMatch:!0,requiredRole:["System Admin","Foodcourt General","Brand General","Foodcourt Manager","Brand Manager","Restaurant Admin"],children:(0,s.jsx)(_l,{})})})]})})]})})})})})})})})})},Hl=e=>{e&&e instanceof Function&&n.e(8206).then(n.bind(n,8206)).then(t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:a,getTTFB:i}=t;n(e),r(e),o(e),a(e),i(e)})},Ul=window.fetch,Wl=(0,Ye.hY)();window.fetch=(e,t)=>{const n="string"===typeof e?e:e.toString();if(n.startsWith("/api/")&&Wl){return Ul(`${Wl}${n}`,t)}return n.startsWith("/api/"),Ul(e,t)};t.createRoot(document.getElementById("root")).render((0,s.jsx)(e.StrictMode,{children:(0,s.jsx)(ql,{})})),Hl()})()})();