"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[187],{187:(e,n,r)=>{r.r(n),r.d(n,{default:()=>J});var t=r(9950),i=r(4752),a=r(9163),o=r(3310),s=r(7492),l=r(1367),d=r(9018),c=r(8930),p=r(755),h=r(3705),g=r(4669),x=r(4492);var u=r(4414);const y=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,v=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,j=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: #635BFF;
  color: white;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #635BFF;
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`,b=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: #635BFF;
  color: white;
  
  &:hover {
    background: #5A51E6;
  }
  
  &:disabled {
    background: #E6EBF1;
    color: #8898AA;
    cursor: not-allowed;
  }
`,f=i.Ay.main`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,C=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,w=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  box-sizing: border-box;
`,S=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,A=i.Ay.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,T=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,k=i.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
  }

  &:disabled {
    background: #F6F9FC;
    color: #8898AA;
    cursor: not-allowed;
  }
`,B=i.Ay.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
  }
`,F=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`,P=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,E=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`,I=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,R=i.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${I}:checked + & {
    background-color: #635BFF;
  }

  ${I}:focus + & {
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  ${I}:checked + &:before {
    transform: translateX(24px);
  }
`,z=i.Ay.hr`
  border: none;
  border-top: 1px solid #F6F9FC;
  margin: 20px 0;
`,M=i.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
`,D=i.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 12px;

  ${e=>"success"===e.type?"\n    background: #ECFDF5;\n    color: #059669;\n    border: 1px solid #A7F3D0;\n  ":"\n    background: #FEF2F2;\n    color: #DC2626;\n    border: 1px solid #FECACA;\n  "}
`,_=i.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,N=i.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 16px;
`,O=(0,i.Ay)(k)`
  width: 100px;
  display: inline-block;
  margin-right: 8px;
`,K=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;
`,L=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: all 0.15s;
  
  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,$=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,U=i.Ay.div`
  margin: 12px 0;
  display: flex;
  justify-content: center;
`,q=i.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
`,W=i.Ay.button`
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  color: #6B7C93;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
`,G=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo"},{code:"CN",name:"China",timezone:"Asia/Shanghai"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh"},{code:"PH",name:"Philippines",timezone:"Asia/Manila"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta"},{code:"IN",name:"India",timezone:"Asia/Kolkata"},{code:"AU",name:"Australia",timezone:"Australia/Sydney"},{code:"US",name:"United States",timezone:"America/New_York"},{code:"GB",name:"United Kingdom",timezone:"Europe/London"}],J=()=>{var e,n,r,i,J,V,H,Q,Y,X,Z,ee,ne,re,te,ie,ae,oe,se,le,de,ce,pe,he,ge,xe,ue;const{user:ye}=(0,l.As)(),{updateSettings:me}=(0,d.Pj)(),{categories:ve}=(0,c.b)(),{setTheme:je,resetTheme:be,isDefaultTheme:fe}=(0,p.e)(),Ce=["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===ye||void 0===ye?void 0:ye.role)||"")?"company":"store",[we,Se]=function(e){const[n,r]=(0,x.ok)(),i=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[a,o]=(0,t.useState)(i());return[a,(0,t.useCallback)(e=>{o(e),r({tab:e})},[r])]}(Ce),[Ae,Te]=(0,t.useState)(!1),[ke,Be]=(0,t.useState)(null),[Fe,Pe]=(0,t.useState)(null),[Ee,Ie]=(0,t.useState)([]),Re=()=>{const e=localStorage.getItem("storeSettings");return e?JSON.parse(e):{store:{name:"FOODCOURT CENTRAL",businessRegistration:"000123456789",phone:"+60 3-1234-5678",email:"contact@foodcourt.com",address:"123 Main Street, City Center",city:"Kuala Lumpur",state:"Wilayah Persekutuan",postalCode:"50000",country:"MY",gstRegNo:"000123456789",logo:""},operations:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur",orderNumberReset:"daily",defaultPreparationTime:15,taxEnabled:!0,taxRate:6,serviceChargeEnabled:!1,serviceChargeRate:10,currency:"RM",cashRounding:.05,roundingApplyTo:"cash_only",pagerSystem:{enabled:!1,totalPagers:50},takeawayPricing:{enabled:!1,pricingType:"per-item",perItemCharge:.5,categoryCharges:{food:1,beverage:.5,dessert:.5,other:.5}},deliveryPricing:{enabled:!1,minimumOrder:0,freeAbove:999999,zones:[]},loyaltyTiers:{enabled:!0,bronze:{minOrders:0,minSpent:0},silver:{minOrders:5,minSpent:500},gold:{minOrders:15,minSpent:1500},vip:{minOrders:30,minSpent:3e3}},orderTypes:{dineIn:!0,takeaway:!0,pickup:!1,delivery:!1},breakTimes:[]}}},[ze,Me]=(0,t.useState)(Re().store),[De,_e]=(0,t.useState)(Re().operations),[Ne,Oe]=(0,t.useState)({brand_id:null,brand_name:null}),Ke=Re().operations,[Le,$e]=(0,t.useState)({currency:Ke.currency||"RM",cashRounding:null!==Ke.cashRounding&&void 0!==Ke.cashRounding?Ke.cashRounding:null,roundingApplyTo:Ke.roundingApplyTo||"cash_only"}),[Ue,qe]=(0,t.useState)({name:"Food Court Management Corp",businessRegistration:"202301234567",phone:"+60 3-2123-4567",email:"admin@foodcourtmanagement.com",address:"123 Business District",city:"Kuala Lumpur",state:"Wilayah Persekutuan",postalCode:"50450",website:"www.foodcourtmanagement.com",logo:"",taxId:"90-1234567",industry:"Food Service Management"}),[We,Ge]=(0,t.useState)({brands:[{id:"1",name:"Local Delights",description:"Traditional Malaysian cuisine",logo:"",primaryColor:"#635BFF",secondaryColor:"#F8FAFC",accentColor:"#5A51E6",isActive:!0,restaurantCount:3,restaurants:[{id:"rest-001",name:"Local Delights",branchName:"KLCC Branch",location:"KLCC"},{id:"rest-002",name:"Local Delights",branchName:"Pavilion Branch",location:"Pavilion KL"},{id:"rest-003",name:"Local Delights",branchName:"Mid Valley Branch",location:"Mid Valley"}]},{id:"2",name:"International Fusion",description:"Global flavors and modern cuisine",logo:"",primaryColor:"#059669",secondaryColor:"#ECFDF5",accentColor:"#047857",isActive:!0,restaurantCount:2,restaurants:[{id:"rest-004",name:"International Fusion",branchName:"Sunway Branch",location:"Sunway Pyramid"},{id:"rest-005",name:"International Fusion",branchName:"IOI Branch",location:"IOI City Mall"}]},{id:"3",name:"Quick Bites",description:"Fast casual dining experience",logo:"",primaryColor:"#DC2626",secondaryColor:"#FEF2F2",accentColor:"#B91C1C",isActive:!1,restaurantCount:1,restaurants:[{id:"rest-006",name:"Quick Bites",branchName:"One Utama Branch",location:"One Utama"}]}]}),[Je,Ve]=(0,t.useState)(""),[He,Qe]=(0,t.useState)({enableTableNumbers:!0,tableNumberRequired:!1,tablePrefix:"T",totalTables:20,qrCodeBaseUrl:window.location.origin}),[Ye,Xe]=(0,t.useState)([]),[Ze,en]=(0,t.useState)([]),[nn,rn]=(0,t.useState)(!1);(0,t.useEffect)(()=>{(async()=>{if(null!==ye&&void 0!==ye&&ye.restaurantId)try{const i=await fetch(`/api/restaurants/${ye.restaurantId}`);if(i.ok){var e,n;const a=await i.json(),o=a.data||a;if(console.log("\ud83d\udd0d RAW API Response for restaurant:",{currency:o.currency,cash_rounding:o.cash_rounding,rounding_apply_to:o.rounding_apply_to,raw_cash_rounding_type:typeof o.cash_rounding}),Me({name:o.name||"",businessRegistration:o.business_registration||"",phone:o.phone||"",email:o.email||"",address:o.address||"",city:o.city||"",state:o.state||"",postalCode:o.postal_code||"",country:o.country||"MY",gstRegNo:o.tax_id||"",logo:o.logo_url||""}),Oe({brand_id:o.brand_id||null,brand_name:(null===(e=o.brand)||void 0===e?void 0:e.name)||null}),o.slug&&Ve(o.slug),o.payment_settings){console.log("\u2705 Loading payment settings from DB:",JSON.stringify(o.payment_settings).substring(0,200)),Pe(o.payment_settings);const e=o.payment_settings._order,n=Object.keys(o.payment_settings).filter(e=>"_order"!==e);if(e&&Array.isArray(e)){const r=[...e.filter(e=>n.includes(e))];n.forEach(e=>{r.includes(e)||r.push(e)}),Ie(r)}else Ie(n);console.log("\u2705 Loaded payment methods:",Object.keys(o.payment_settings))}else console.log("\u26a0\ufe0f  No payment settings found in DB, using default values");const s=Re().operations,l=o.operation_settings?{...s,...o.operation_settings,pagerSystem:{...s.pagerSystem,...o.operation_settings.pagerSystem||{}},takeawayPricing:{...s.takeawayPricing,...o.operation_settings.takeawayPricing||{},categoryCharges:{...s.takeawayPricing.categoryCharges,...o.operation_settings.takeawayPricing&&o.operation_settings.takeawayPricing.categoryCharges||{}}},deliveryPricing:{...s.deliveryPricing,...o.operation_settings.deliveryPricing||{},zones:(null===(n=o.operation_settings.deliveryPricing)||void 0===n?void 0:n.zones)||[]},loyaltyTiers:{...s.loyaltyTiers,...o.operation_settings.loyaltyTiers||{},bronze:{...s.loyaltyTiers.bronze,...o.operation_settings.loyaltyTiers&&o.operation_settings.loyaltyTiers.bronze||{}},silver:{...s.loyaltyTiers.silver,...o.operation_settings.loyaltyTiers&&o.operation_settings.loyaltyTiers.silver||{}},gold:{...s.loyaltyTiers.gold,...o.operation_settings.loyaltyTiers&&o.operation_settings.loyaltyTiers.gold||{}},vip:{...s.loyaltyTiers.vip,...o.operation_settings.loyaltyTiers&&o.operation_settings.loyaltyTiers.vip||{}}},orderTypes:{...s.orderTypes,...o.operation_settings.orderTypes||{}},breakTimes:o.operation_settings.breakTimes||s.breakTimes}:s,d=o.currency||"RM",c=null!==o.cash_rounding&&void 0!==o.cash_rounding?parseFloat(o.cash_rounding):null,p=o.rounding_apply_to||"cash_only",h={...l,currency:d,cashRounding:c,roundingApplyTo:p};var r,t;if(console.log("\u2705 Loading currency from DB:",{currency:d,cashRounding:c,roundingApplyTo:p,raw_cash_rounding:o.cash_rounding}),console.log("\u2705 Final operation settings with currency:",h),_e(h),$e({currency:d,cashRounding:null!==o.cash_rounding&&void 0!==o.cash_rounding?parseFloat(o.cash_rounding):null,roundingApplyTo:p}),o.table_settings)console.log("\u2705 Loading table settings from DB:",o.table_settings),Qe({enableTableNumbers:null===(r=o.table_settings.enableTableNumbers)||void 0===r||r,tableNumberRequired:null!==(t=o.table_settings.tableNumberRequired)&&void 0!==t&&t,tablePrefix:o.table_settings.tablePrefix||"T",totalTables:o.table_settings.totalTables||20,qrCodeBaseUrl:o.table_settings.qrCodeBaseUrl||window.location.origin})}}catch(i){console.error("Failed to load store data:",i)}})()},[null===ye||void 0===ye?void 0:ye.restaurantId]),(0,t.useEffect)(()=>{"managers"===we&&(async()=>{if(null!==ye&&void 0!==ye&&ye.restaurantId){rn(!0);try{const e=await fetch(`/api/restaurants/${ye.restaurantId}`);if(e.ok){const n=await e.json(),r=n.data||n;r.managers&&Array.isArray(r.managers)&&en(r.managers.map(e=>({id:e.id.toString(),name:e.name||e.full_name||e.username,email:e.email,role:e.role,company:e.company||"",phone:e.phone||"",isPrimary:e.isPrimary||!1})))}}catch(e){console.error("Failed to load managers:",e)}finally{rn(!1)}}})()},[we,null===ye||void 0===ye?void 0:ye.restaurantId]),(0,t.useEffect)(()=>{const e=localStorage.getItem("tableSettings");if(e){const n=JSON.parse(e);Qe(n)}},[]),(0,t.useEffect)(()=>{if(!Je)return;const e=[];for(let n=1;n<=He.totalTables;n++){const r=`${He.tablePrefix}${String(n).padStart(3,"0")}`,t=`${He.qrCodeBaseUrl}/mobile/${Je}?table=${r}`;e.push({id:`table-${n}`,number:n,qrCode:t,isActive:!0})}Xe(e)},[Je,He.totalTables,He.tablePrefix,He.qrCodeBaseUrl]);const tn=(e,n,r)=>{Pe(t=>{const i=t[e];let a=[...i.availableIn||[]];return r?a.includes(n)||a.push(n):a=a.filter(e=>e!==n),{...t,[e]:{...i,availableIn:a,enabled:a.length>0}}}),Te(!0)},an=(e,n,r)=>{Pe(t=>({...t,[e]:{...t[e],[n]:r}})),Te(!0)},on=(e,n,r)=>{Pe(t=>({...t,[e]:{...t[e],config:{...t[e].config,[n]:r}}})),Te(!0)},sn=(e,n)=>{Ie(r=>{const t=r.indexOf(e);if(-1===t)return r;const i="up"===n?t-1:t+1;if(i<0||i>=r.length)return r;const a=[...r];return[a[t],a[i]]=[a[i],a[t]],a}),Te(!0)},ln=async()=>{console.log("\ud83d\udd04 handleSave called"),console.log("\ud83d\udcca user?.restaurantId:",null===ye||void 0===ye?void 0:ye.restaurantId);try{const e={store:ze,operations:De};if(localStorage.setItem("storeSettings",JSON.stringify(e)),localStorage.setItem("tableSettings",JSON.stringify(He)),localStorage.setItem("tables",JSON.stringify(Ye)),window.dispatchEvent(new Event("storage")),console.log("\u2705 localStorage saved"),null!==ye&&void 0!==ye&&ye.restaurantId){console.log("\ud83d\udce4 Preparing PUT request to /api/restaurants/"+ye.restaurantId);const e={};Fe&&(Object.keys(Fe).forEach(n=>{"_order"!==n&&(e[n]=Fe[n])}),e._order=Ee);const n={name:ze.name,business_registration:ze.businessRegistration,phone:ze.phone,email:ze.email,address:ze.address,city:ze.city,state:ze.state,postal_code:ze.postalCode,country:ze.country,tax_id:ze.gstRegNo,logo_url:ze.logo,payment_settings:e,operation_settings:De,table_settings:He,currency:Le.currency,cash_rounding:Le.cashRounding,rounding_apply_to:Le.roundingApplyTo};console.log("\ud83d\udce6 Request body (first 500 chars):",JSON.stringify(n).substring(0,500)),console.log("\ud83d\udcb3 Payment settings being saved:",JSON.stringify(Fe).substring(0,300)),console.log("\u2699\ufe0f Operation settings being saved:",JSON.stringify(De)),console.log("\ud83d\udcb0 Currency settings being saved:",{currency:Le.currency,cashRounding:Le.cashRounding,roundingApplyTo:Le.roundingApplyTo});const r=localStorage.getItem("auth_token");console.log("\ud83d\udd11 Auth token length:",(null===r||void 0===r?void 0:r.length)||0),console.log("\ud83d\udc64 User restaurantId:",ye.restaurantId),console.log("\ud83d\udce1 Sending PUT request to:",`/api/store/settings?restaurantId=${ye.restaurantId}`);const t=await fetch(`/api/store/settings?restaurantId=${ye.restaurantId}&_t=${Date.now()}`,{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json","Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify(n)});if(console.log("\ud83d\udce8 Response received:",t.status,t.statusText),console.log("\ud83d\udce8 Response headers:",Object.fromEntries(t.headers.entries())),!t.ok){const e=await t.text();return console.error("\u274c Failed to save store info to database. Status:",t.status,"Error:",e),console.error("\u274c Full error response:",e),Be({type:"error",message:`\u274c Failed to save settings to database (${t.status}: ${t.statusText})`}),void setTimeout(()=>{Be(null)},8e3)}const i=await t.json();console.log("\u2705 Database save successful:",i),console.log("\ud83d\udd04 Updating StoreContext with new operation settings"),me({store:ze,operations:{...De,currency:Le.currency,cashRounding:Le.cashRounding||.05,roundingApplyTo:Le.roundingApplyTo}}),console.log("\ud83d\udd04 Reloading settings from DB to verify...");const a=await fetch(`/api/restaurants/${ye.restaurantId}`);if(a.ok){const e=await a.json(),n=e.data||e;n.payment_settings?(console.log("\u2705 Verified payment settings from DB:",JSON.stringify(n.payment_settings).substring(0,200)),Pe(n.payment_settings)):console.log("\u26a0\ufe0f  Payment settings not found in DB after save!"),console.log("\u2705 Verified currency settings from DB:",{currency:n.currency,cash_rounding:n.cash_rounding,rounding_apply_to:n.rounding_apply_to}),$e({currency:n.currency||"RM",cashRounding:null!==n.cash_rounding&&void 0!==n.cash_rounding?parseFloat(n.cash_rounding):null,roundingApplyTo:n.rounding_apply_to||"cash_only"})}}else console.log("\u26a0\ufe0f  No restaurantId found, skipping database save");Be({type:"success",message:"\u2705 Settings saved successfully!"}),Te(!1),console.log("\u2705 Save completed successfully"),setTimeout(()=>{Be(null)},5e3)}catch(e){console.error("\u274c Error saving settings:",e),Be({type:"error",message:"\u274c Failed to save settings"}),setTimeout(()=>{Be(null)},8e3)}};return(0,u.jsx)(o.A,{children:(0,u.jsxs)(y,{children:[(0,u.jsx)(m,{children:(0,u.jsx)(v,{children:"Store Settings"})}),(0,u.jsxs)(f,{children:[(0,u.jsx)(s.j,{children:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===ye||void 0===ye?void 0:ye.role)||"")?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.oz,{active:"company"===we,onClick:()=>Se("company"),children:"Company Info"}),(0,u.jsx)(s.oz,{active:"brands"===we,onClick:()=>Se("brands"),children:"Brand Management"}),(0,u.jsx)(s.oz,{active:"billing"===we,onClick:()=>Se("billing"),children:"Billing & Subscriptions"})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.oz,{active:"store"===we,onClick:()=>Se("store"),children:"Store Info"}),(0,u.jsx)(s.oz,{active:"operations"===we,onClick:()=>Se("operations"),children:"Operations"}),(0,u.jsx)(s.oz,{active:"payment"===we,onClick:()=>Se("payment"),children:"Payment Methods"}),(0,u.jsx)(s.oz,{active:"managers"===we,onClick:()=>Se("managers"),children:"Managers"})]})}),"payment"===we&&(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Payment Methods"}),(0,u.jsx)("p",{style:{color:"#6B7C93",marginBottom:"24px",fontSize:"14px"},children:"Configure payment methods for POS Terminal and Mobile Order"}),Fe?Ee.map((e,n)=>{var r,t,i,a,o,l,d,c,p,h,x,y,m,v,j,b,f,C,w,S,F,E,I,R,z,M,D,_,O,K,L,$,U,q,W;const G=Fe[e];return G&&"_order"!==e?(0,u.jsxs)(N,{children:[(0,u.jsx)("div",{style:{marginBottom:G.enabled?"16px":"0"},children:(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:G.enabled?"16px":"0"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,u.jsx)(s.Xd,{onMoveUp:()=>sn(e,"up"),onMoveDown:()=>sn(e,"down"),disableUp:0===n,disableDown:n===Ee.length-1}),(0,u.jsx)(P,{children:G.label})]}),(0,u.jsxs)("div",{style:{display:"flex",gap:"20px",alignItems:"center"},children:[(0,u.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,u.jsx)("input",{type:"checkbox",checked:(null===(r=G.availableIn)||void 0===r?void 0:r.includes("pos"))||!1,onChange:n=>tn(e,"pos",n.target.checked),style:{width:"18px",height:"18px",cursor:"pointer",accentColor:"#635BFF"}}),(0,u.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:null!==(t=G.availableIn)&&void 0!==t&&t.includes("pos")?"#0A2540":"#6B7C93",whiteSpace:"nowrap"},children:"Enable for POS Terminal"})]}),(0,u.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,u.jsx)("input",{type:"checkbox",checked:(null===(i=G.availableIn)||void 0===i?void 0:i.includes("mobile"))||!1,onChange:n=>tn(e,"mobile",n.target.checked),style:{width:"18px",height:"18px",cursor:"pointer",accentColor:"#635BFF"}}),(0,u.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:null!==(a=G.availableIn)&&void 0!==a&&a.includes("mobile")?"#0A2540":"#6B7C93",whiteSpace:"nowrap"},children:"Enable for Mobile Orders"})]})]})]})}),"card"===e&&G.enabled&&(0,u.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Payment Gateway Provider"}),(0,u.jsxs)(B,{value:G.provider||"",onChange:n=>an(e,"provider",n.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Gateway"}),(0,u.jsx)("option",{value:"ipay88",children:"iPay88"}),(0,u.jsx)("option",{value:"molpay",children:"MOLPay"}),(0,u.jsx)("option",{value:"2c2p",children:"2C2P"}),(0,u.jsx)("option",{value:"stripe",children:"Stripe"}),(0,u.jsx)("option",{value:"paypal",children:"PayPal"})]})]}),"ipay88"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant Code"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter iPay88 Merchant Code",value:(null===(o=G.config)||void 0===o?void 0:o.ipay88MerchantCode)||"",onChange:n=>on(e,"ipay88MerchantCode",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter iPay88 Merchant Key",value:(null===(l=G.config)||void 0===l?void 0:l.ipay88MerchantKey)||"",onChange:n=>on(e,"ipay88MerchantKey",n.target.value)})]})]}),"molpay"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter MOLPay Merchant ID",value:(null===(d=G.config)||void 0===d?void 0:d.molpayMerchantId)||"",onChange:n=>on(e,"molpayMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Verify Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter MOLPay Verify Key",value:(null===(c=G.config)||void 0===c?void 0:c.molpayVerifyKey)||"",onChange:n=>on(e,"molpayVerifyKey",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Secret Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter MOLPay Secret Key",value:(null===(p=G.config)||void 0===p?void 0:p.molpaySecretKey)||"",onChange:n=>on(e,"molpaySecretKey",n.target.value)})]})]}),"2c2p"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter 2C2P Merchant ID",value:(null===(h=G.config)||void 0===h?void 0:h["2c2pMerchantId"])||"",onChange:n=>on(e,"2c2pMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Secret Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter 2C2P Secret Key",value:(null===(x=G.config)||void 0===x?void 0:x["2c2pSecretKey"])||"",onChange:n=>on(e,"2c2pSecretKey",n.target.value)})]})]}),"stripe"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Publishable Key"}),(0,u.jsx)(k,{type:"text",placeholder:"pk_live_...",value:(null===(y=G.config)||void 0===y?void 0:y.stripePublicKey)||"",onChange:n=>on(e,"stripePublicKey",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Secret Key"}),(0,u.jsx)(k,{type:"password",placeholder:"sk_live_...",value:(null===(m=G.config)||void 0===m?void 0:m.stripeSecretKey)||"",onChange:n=>on(e,"stripeSecretKey",n.target.value)})]})]}),"paypal"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Client ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter PayPal Client ID",value:(null===(v=G.config)||void 0===v?void 0:v.paypalClientId)||"",onChange:n=>on(e,"paypalClientId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Client Secret"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter PayPal Client Secret",value:(null===(j=G.config)||void 0===j?void 0:j.paypalClientSecret)||"",onChange:n=>on(e,"paypalClientSecret",n.target.value)})]})]})]}),"ewallet"===e&&G.enabled&&(0,u.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"E-Wallet Provider"}),(0,u.jsxs)(B,{value:G.provider||"",onChange:n=>an(e,"provider",n.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select E-Wallet"}),(0,u.jsx)("option",{value:"tng",children:"Touch 'n Go eWallet"}),(0,u.jsx)("option",{value:"grabpay",children:"GrabPay"}),(0,u.jsx)("option",{value:"boost",children:"Boost"}),(0,u.jsx)("option",{value:"shopeepay",children:"ShopeePay"})]})]}),"tng"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter TNG Merchant ID",value:(null===(b=G.config)||void 0===b?void 0:b.tngMerchantId)||"",onChange:n=>on(e,"tngMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"API Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter TNG API Key",value:(null===(f=G.config)||void 0===f?void 0:f.tngApiKey)||"",onChange:n=>on(e,"tngApiKey",n.target.value)})]})]}),"grabpay"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter GrabPay Merchant ID",value:(null===(C=G.config)||void 0===C?void 0:C.grabpayMerchantId)||"",onChange:n=>on(e,"grabpayMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Client ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter GrabPay Client ID",value:(null===(w=G.config)||void 0===w?void 0:w.grabpayClientId)||"",onChange:n=>on(e,"grabpayClientId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Client Secret"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter GrabPay Client Secret",value:(null===(S=G.config)||void 0===S?void 0:S.grabpayClientSecret)||"",onChange:n=>on(e,"grabpayClientSecret",n.target.value)})]})]}),"boost"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter Boost Merchant ID",value:(null===(F=G.config)||void 0===F?void 0:F.boostMerchantId)||"",onChange:n=>on(e,"boostMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"API Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter Boost API Key",value:(null===(E=G.config)||void 0===E?void 0:E.boostApiKey)||"",onChange:n=>on(e,"boostApiKey",n.target.value)})]})]}),"shopeepay"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter ShopeePay Merchant ID",value:(null===(I=G.config)||void 0===I?void 0:I.shopeePayMerchantId)||"",onChange:n=>on(e,"shopeePayMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"API Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter ShopeePay API Key",value:(null===(R=G.config)||void 0===R?void 0:R.shopeePayApiKey)||"",onChange:n=>on(e,"shopeePayApiKey",n.target.value)})]})]})]}),"bankTransfer"===e&&G.enabled&&(0,u.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Bank Name"}),(0,u.jsx)(k,{type:"text",placeholder:"e.g., Maybank, CIMB, Public Bank",value:G.bankName||"",onChange:n=>an(e,"bankName",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Account Number"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter Bank Account Number",value:G.accountNumber||"",onChange:n=>an(e,"accountNumber",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Account Name"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter Account Holder Name",value:G.accountName||"",onChange:n=>an(e,"accountName",n.target.value)})]})]}),"qrPayment"===e&&G.enabled&&(0,u.jsx)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:(0,u.jsx)(g.A,{value:G.qrImage||"",onChange:n=>an(e,"qrImage",n),label:"QR Code Image",helpText:"Upload QR code image for customers to scan and make payment",changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"QR Code"})}),"online"===e&&G.enabled&&(0,u.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Payment Provider"}),(0,u.jsxs)(B,{value:G.provider||"stripe",onChange:n=>an(e,"provider",n.target.value),children:[(0,u.jsx)("option",{value:"stripe",children:"Stripe"}),(0,u.jsx)("option",{value:"paypal",children:"PayPal"}),(0,u.jsx)("option",{value:"both",children:"Both Stripe & PayPal"})]})]}),("stripe"===G.provider||"both"===G.provider)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Stripe Public Key"}),(0,u.jsx)(k,{type:"text",placeholder:"pk_live_...",value:(null===(z=G.config)||void 0===z?void 0:z.stripePublicKey)||"",onChange:n=>on(e,"stripePublicKey",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Stripe Secret Key"}),(0,u.jsx)(k,{type:"password",placeholder:"sk_live_...",value:(null===(M=G.config)||void 0===M?void 0:M.stripeSecretKey)||"",onChange:n=>on(e,"stripeSecretKey",n.target.value)})]})]}),("paypal"===G.provider||"both"===G.provider)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"PayPal Client ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter PayPal Client ID",value:(null===(D=G.config)||void 0===D?void 0:D.paypalClientId)||"",onChange:n=>on(e,"paypalClientId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"PayPal Client Secret"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter PayPal Client Secret",value:(null===(_=G.config)||void 0===_?void 0:_.paypalClientSecret)||"",onChange:n=>on(e,"paypalClientSecret",n.target.value)})]})]})]}),"fpx"===e&&G.enabled&&(0,u.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"FPX Gateway Provider"}),(0,u.jsxs)(B,{value:G.provider||"",onChange:n=>an(e,"provider",n.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select FPX Gateway"}),(0,u.jsx)("option",{value:"ipay88",children:"iPay88 FPX"}),(0,u.jsx)("option",{value:"molpay",children:"MOLPay FPX"}),(0,u.jsx)("option",{value:"2c2p",children:"2C2P FPX"})]})]}),"ipay88"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant Code"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter iPay88 Merchant Code",value:(null===(O=G.config)||void 0===O?void 0:O.ipay88MerchantCode)||"",onChange:n=>on(e,"ipay88MerchantCode",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter iPay88 Merchant Key",value:(null===(K=G.config)||void 0===K?void 0:K.ipay88MerchantKey)||"",onChange:n=>on(e,"ipay88MerchantKey",n.target.value)})]})]}),"molpay"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter MOLPay Merchant ID",value:(null===(L=G.config)||void 0===L?void 0:L.molpayMerchantId)||"",onChange:n=>on(e,"molpayMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Verify Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter MOLPay Verify Key",value:(null===($=G.config)||void 0===$?void 0:$.molpayVerifyKey)||"",onChange:n=>on(e,"molpayVerifyKey",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Secret Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter MOLPay Secret Key",value:(null===(U=G.config)||void 0===U?void 0:U.molpaySecretKey)||"",onChange:n=>on(e,"molpaySecretKey",n.target.value)})]})]}),"2c2p"===G.provider&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Merchant ID"}),(0,u.jsx)(k,{type:"text",placeholder:"Enter 2C2P Merchant ID",value:(null===(q=G.config)||void 0===q?void 0:q["2c2pMerchantId"])||"",onChange:n=>on(e,"2c2pMerchantId",n.target.value)})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Secret Key"}),(0,u.jsx)(k,{type:"password",placeholder:"Enter 2C2P Secret Key",value:(null===(W=G.config)||void 0===W?void 0:W["2c2pSecretKey"])||"",onChange:n=>on(e,"2c2pSecretKey",n.target.value)})]})]})]})]},e):null}):(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"Loading payment settings..."}),Fe&&(0,u.jsxs)(_,{children:[(0,u.jsx)(j,{onClick:ln,disabled:!Ae,children:Ae?"Save Changes":"Saved"}),ke&&(0,u.jsx)(D,{type:ke.type,children:ke.message})]})]}),"company"===we&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Company Information"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Company Name"}),(0,u.jsx)(k,{type:"text",value:Ue.name,onChange:e=>{qe(n=>({...n,name:e.target.value})),Te(!0)},placeholder:"Food Court Management Corp"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Business Registration"}),(0,u.jsx)(k,{type:"text",value:Ue.businessRegistration,onChange:e=>{qe(n=>({...n,businessRegistration:e.target.value})),Te(!0)},placeholder:"202301234567"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Tax ID"}),(0,u.jsx)(k,{type:"text",value:Ue.taxId,onChange:e=>{qe(n=>({...n,taxId:e.target.value})),Te(!0)},placeholder:"90-1234567"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Industry"}),(0,u.jsx)(k,{type:"text",value:Ue.industry,onChange:e=>{qe(n=>({...n,industry:e.target.value})),Te(!0)},placeholder:"Food Service Management"})]}),(0,u.jsx)(g.A,{value:Ue.logo,onChange:e=>{qe(n=>({...n,logo:e})),Te(!0)},label:"Company Logo",helpText:"Upload your company logo for branding and official documents",changeButtonText:"Change Logo",removeButtonText:"Remove Logo",imageAltText:"Company Logo"})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Contact Information"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Phone Number"}),(0,u.jsx)(k,{type:"text",value:Ue.phone,onChange:e=>{qe(n=>({...n,phone:e.target.value})),Te(!0)},placeholder:"+60 3-2123-4567"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Email Address"}),(0,u.jsx)(k,{type:"email",value:Ue.email,onChange:e=>{qe(n=>({...n,email:e.target.value})),Te(!0)},placeholder:"admin@foodcourtmanagement.com"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Website"}),(0,u.jsx)(k,{type:"url",value:Ue.website,onChange:e=>{qe(n=>({...n,website:e.target.value})),Te(!0)},placeholder:"www.foodcourtmanagement.com"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Address"}),(0,u.jsx)(k,{type:"text",value:Ue.address,onChange:e=>{qe(n=>({...n,address:e.target.value})),Te(!0)},placeholder:"123 Business District"})]})]})]}),(0,u.jsxs)(_,{children:[(0,u.jsx)(j,{onClick:ln,disabled:!Ae,children:Ae?"Save Changes":"Saved"}),ke&&(0,u.jsx)(D,{type:ke.type,children:ke.message})]})]}),"brands"===we&&(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[(0,u.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Brand Management"}),(0,u.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[!fe&&"Restaurant Admin"===(null===ye||void 0===ye?void 0:ye.role)&&(0,u.jsx)(h.cc,{variant:"outline",size:"small",onClick:be,children:"Reset Theme"}),"Restaurant Admin"===(null===ye||void 0===ye?void 0:ye.role)?(0,u.jsx)(h.cc,{onClick:()=>alert("Add Brand functionality coming soon"),children:"+ Add Brand"}):(0,u.jsx)(b,{onClick:()=>alert("Add Brand functionality coming soon"),children:"+ Add Brand"})]})]}),!fe&&"Restaurant Admin"===(null===ye||void 0===ye?void 0:ye.role)&&(0,u.jsx)("div",{style:{background:"rgba(196, 181, 253, 0.2)",border:"1px solid var(--brand-primary, #8B5CF6)",borderRadius:"8px",padding:"12px 16px",fontSize:"14px",color:"var(--brand-primary, #8B5CF6)"},children:"\ud83c\udfa8 Theme preview is active. Changes will apply to restaurant management pages."})]}),We.brands.map(e=>(0,u.jsxs)(w,{style:{marginBottom:"24px"},children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,u.jsx)(S,{children:e.name}),(0,u.jsx)("span",{style:{padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontWeight:"500",background:e.isActive?"#ECFDF5":"#FEF2F2",color:e.isActive?"#059669":"#DC2626"},children:e.isActive?"Active":"Inactive"}),(0,u.jsxs)("span",{style:{padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontWeight:"500",background:"#F3F4F6",color:"#6B7280"},children:[e.restaurantCount," Restaurant",1!==e.restaurantCount?"s":""]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px"},children:"Restaurant Admin"===(null===ye||void 0===ye?void 0:ye.role)?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(h.cc,{variant:"outline",size:"small",onClick:()=>je({primaryColor:e.primaryColor,secondaryColor:e.secondaryColor,accentColor:e.accentColor,logo:e.logo}),children:"Preview Theme"}),(0,u.jsx)(h.cc,{size:"small",children:"Edit"})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(b,{onClick:()=>je({primaryColor:e.primaryColor,secondaryColor:e.secondaryColor,accentColor:e.accentColor,logo:e.logo}),children:"Preview Theme"}),(0,u.jsx)(b,{children:"Edit"})]})})]}),(0,u.jsx)("p",{style:{color:"#6B7280",marginBottom:"20px",fontSize:"14px"},children:e.description}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",marginBottom:"20px"},children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Primary Color"}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"color",value:e.primaryColor,style:{width:"40px",height:"40px",border:"none",borderRadius:"8px",cursor:"pointer"},onChange:n=>{const r=We.brands.map(r=>r.id===e.id?{...r,primaryColor:n.target.value}:r);Ge({brands:r}),Te(!0)}}),(0,u.jsx)(k,{value:e.primaryColor,style:{width:"100px"},readOnly:!0})]})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Secondary Color"}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"color",value:e.secondaryColor,style:{width:"40px",height:"40px",border:"none",borderRadius:"8px",cursor:"pointer"},onChange:n=>{const r=We.brands.map(r=>r.id===e.id?{...r,secondaryColor:n.target.value}:r);Ge({brands:r}),Te(!0)}}),(0,u.jsx)(k,{value:e.secondaryColor,style:{width:"100px"},readOnly:!0})]})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Accent Color"}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"color",value:e.accentColor,style:{width:"40px",height:"40px",border:"none",borderRadius:"8px",cursor:"pointer"},onChange:n=>{const r=We.brands.map(r=>r.id===e.id?{...r,accentColor:n.target.value}:r);Ge({brands:r}),Te(!0)}}),(0,u.jsx)(k,{value:e.accentColor,style:{width:"100px"},readOnly:!0})]})]})]}),(0,u.jsx)(g.A,{value:e.logo,onChange:n=>{const r=We.brands.map(r=>r.id===e.id?{...r,logo:n}:r);Ge({brands:r}),Te(!0)},label:"Brand Logo",helpText:`Upload logo for ${e.name} brand`,changeButtonText:"Change Brand Logo",removeButtonText:"Remove Brand Logo",imageAltText:"Brand Logo"}),(0,u.jsxs)("div",{children:[(0,u.jsxs)(T,{children:["Connected Restaurants (",e.restaurants.length,")"]}),(0,u.jsx)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px"},children:e.restaurants.length>0?(0,u.jsx)("div",{style:{display:"grid",gap:"8px"},children:e.restaurants.map(n=>(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"white",borderRadius:"6px",border:`2px solid ${e.primaryColor}20`},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:"600",fontSize:"14px",color:"#0A2540"},children:n.name}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n.branchName," \u2022 ",n.location]})]}),(0,u.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:e.primaryColor}})]},n.id))}):(0,u.jsx)("p",{style:{color:"#6B7280",textAlign:"center",margin:"20px 0"},children:"No restaurants connected to this brand"})})]})]},e.id)),(0,u.jsxs)(_,{children:[(0,u.jsx)(j,{onClick:ln,disabled:!Ae,children:Ae?"Save Changes":"Saved"}),ke&&(0,u.jsx)(D,{type:ke.type,children:ke.message})]})]}),"billing"===we&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Subscription Overview"}),(0,u.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,u.jsx)("span",{style:{fontWeight:"500"},children:"Current Plan"}),(0,u.jsx)("span",{style:{padding:"4px 12px",background:"#ECFDF5",color:"#059669",borderRadius:"6px",fontSize:"14px",fontWeight:"600"},children:"Enterprise"})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,u.jsx)("span",{style:{color:"#6B7280"},children:"Monthly Fee"}),(0,u.jsx)("span",{style:{fontWeight:"600"},children:"RM 299.00"})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,u.jsx)("span",{style:{color:"#6B7280"},children:"Next Billing Date"}),(0,u.jsx)("span",{children:"January 15, 2025"})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsx)("span",{style:{color:"#6B7280"},children:"Active Restaurants"}),(0,u.jsx)("span",{children:"12 / 15"})]})]}),(0,u.jsx)(b,{onClick:()=>alert("Billing management functionality coming soon"),children:"Manage Billing"})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Usage Statistics"}),(0,u.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,u.jsx)("span",{style:{color:"#6B7280"},children:"Total Orders (This Month)"}),(0,u.jsx)("span",{style:{fontWeight:"600",fontSize:"18px"},children:"8,945"})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,u.jsx)("span",{style:{color:"#6B7280"},children:"Total Revenue (This Month)"}),(0,u.jsx)("span",{style:{fontWeight:"600",fontSize:"18px"},children:"RM 145,230"})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,u.jsx)("span",{style:{color:"#6B7280"},children:"Active Staff Members"}),(0,u.jsx)("span",{style:{fontWeight:"600"},children:"87"})]}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsx)("span",{style:{color:"#6B7280"},children:"Storage Used"}),(0,u.jsx)("span",{style:{fontWeight:"600"},children:"2.4 GB / 10 GB"})]})]})]})]}),(0,u.jsxs)(_,{children:[(0,u.jsx)(j,{onClick:ln,disabled:!Ae,children:Ae?"Save Changes":"Saved"}),ke&&(0,u.jsx)(D,{type:ke.type,children:ke.message})]})]}),"store"===we&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Basic Information"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Store Name"}),(0,u.jsx)(k,{type:"text",value:ze.name,onChange:e=>{Me(n=>({...n,name:e.target.value})),Te(!0)},placeholder:"FOODCOURT CENTRAL"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Business Registration"}),(0,u.jsx)(k,{type:"text",value:ze.businessRegistration,onChange:e=>{Me(n=>({...n,businessRegistration:e.target.value})),Te(!0)},placeholder:"123456789"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Tax No"}),(0,u.jsx)(k,{type:"text",value:ze.gstRegNo,onChange:e=>{Me(n=>({...n,gstRegNo:e.target.value})),Te(!0)},placeholder:"Enter tax registration number (optional)"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Phone Number"}),(0,u.jsx)(k,{type:"tel",value:ze.phone,onChange:e=>{Me(n=>({...n,phone:e.target.value})),Te(!0)},placeholder:"+60 3-1234-5678"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Email"}),(0,u.jsx)(k,{type:"email",value:ze.email,onChange:e=>{Me(n=>({...n,email:e.target.value})),Te(!0)},placeholder:"contact@foodcourt.com"})]}),(0,u.jsx)(g.A,{value:ze.logo,onChange:e=>{Me(n=>({...n,logo:e})),Te(!0)},label:"Brand Logo",helpText:"Upload your restaurant's brand logo for use in mobile orders and customer displays",changeButtonText:"Change Logo",removeButtonText:"Remove Logo",imageAltText:"Brand Logo"})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Location"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Address"}),(0,u.jsx)(k,{type:"text",value:ze.address,onChange:e=>{Me(n=>({...n,address:e.target.value})),Te(!0)},placeholder:"123 Main Street, City Center"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"City"}),(0,u.jsx)(k,{type:"text",value:ze.city,onChange:e=>{Me(n=>({...n,city:e.target.value})),Te(!0)},placeholder:"Kuala Lumpur"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"State"}),(0,u.jsx)(k,{type:"text",value:ze.state,onChange:e=>{Me(n=>({...n,state:e.target.value})),Te(!0)},placeholder:"Wilayah Persekutuan"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Postal Code"}),(0,u.jsx)(k,{type:"text",value:ze.postalCode,onChange:e=>{Me(n=>({...n,postalCode:e.target.value})),Te(!0)},placeholder:"50000"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Country"}),(0,u.jsx)(B,{value:ze.country,onChange:e=>{const n=e.target.value;Me(e=>({...e,country:n}));const r=G.find(e=>e.code===n);r&&_e(e=>({...e,timeZone:r.timezone})),Te(!0)},children:G.map(e=>(0,u.jsx)("option",{value:e.code,children:e.name},e.code))})]})]})]}),Ne.brand_id&&(0,u.jsxs)(w,{style:{marginTop:"24px"},children:[(0,u.jsx)(S,{children:"Brand"}),(0,u.jsx)(A,{children:(0,u.jsx)("div",{style:{padding:"10px 12px",background:"#F6F9FC",borderRadius:"6px",fontSize:"14px",color:"#0A2540",border:"1px solid #E6EBF1"},children:Ne.brand_name||"-"})})]}),(0,u.jsxs)(_,{children:[(0,u.jsx)(j,{onClick:ln,disabled:!Ae,children:Ae?"Save Changes":"Saved"}),ke&&(0,u.jsx)(D,{type:ke.type,children:ke.message})]})]}),"operations"===we&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Operating Hours"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Opening Time"}),(0,u.jsx)(k,{type:"time",value:De.openingTime,onChange:e=>{_e(n=>({...n,openingTime:e.target.value})),Te(!0)}})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Closing Time"}),(0,u.jsx)(k,{type:"time",value:De.closingTime,onChange:e=>{_e(n=>({...n,closingTime:e.target.value})),Te(!0)}})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Time Zone"}),(0,u.jsxs)(B,{value:De.timeZone,onChange:e=>{_e(n=>({...n,timeZone:e.target.value})),Te(!0)},children:[(0,u.jsx)("option",{value:"Asia/Kuala_Lumpur",children:"Asia/Kuala_Lumpur (GMT+8)"}),(0,u.jsx)("option",{value:"Asia/Singapore",children:"Asia/Singapore (GMT+8)"}),(0,u.jsx)("option",{value:"Asia/Jakarta",children:"Asia/Jakarta (GMT+7)"})]})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Order Types"}),(0,u.jsx)("p",{style:{color:"#6B7C93",marginBottom:"16px",fontSize:"14px"},children:"Enable or disable order types for mobile ordering"}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Dine In"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:null===(e=null===(n=De.orderTypes)||void 0===n?void 0:n.dineIn)||void 0===e||e,onChange:e=>{_e(n=>({...n,orderTypes:{...n.orderTypes,dineIn:e.target.checked}})),Te(!0)}}),(0,u.jsx)(R,{})]})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Takeaway"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:null===(r=null===(i=De.orderTypes)||void 0===i?void 0:i.takeaway)||void 0===r||r,onChange:e=>{_e(n=>({...n,orderTypes:{...n.orderTypes,takeaway:e.target.checked}})),Te(!0)}}),(0,u.jsx)(R,{})]})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Pre-order Pickup"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:null!==(J=null===(V=De.orderTypes)||void 0===V?void 0:V.pickup)&&void 0!==J&&J,onChange:e=>{_e(n=>({...n,orderTypes:{...n.orderTypes,pickup:e.target.checked}})),Te(!0)}}),(0,u.jsx)(R,{})]})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Delivery"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:null!==(H=null===(Q=De.orderTypes)||void 0===Q?void 0:Q.delivery)&&void 0!==H&&H,onChange:e=>{_e(n=>({...n,orderTypes:{...n.orderTypes,delivery:e.target.checked}})),Te(!0)}}),(0,u.jsx)(R,{})]})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Break Times"}),(0,u.jsx)("p",{style:{color:"#6B7C93",marginBottom:"16px",fontSize:"14px"},children:"Set break times when orders cannot be picked up"}),(De.breakTimes||[]).map((e,n)=>(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px",padding:"12px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,u.jsx)(k,{type:"time",value:e.start,onChange:e=>{const r=[...De.breakTimes];r[n]={...r[n],start:e.target.value},_e(e=>({...e,breakTimes:r})),Te(!0)},style:{flex:1}}),(0,u.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,u.jsx)(k,{type:"time",value:e.end,onChange:e=>{const r=[...De.breakTimes];r[n]={...r[n],end:e.target.value},_e(e=>({...e,breakTimes:r})),Te(!0)},style:{flex:1}}),(0,u.jsx)("button",{onClick:()=>{const e=De.breakTimes.filter((e,r)=>r!==n);_e(n=>({...n,breakTimes:e})),Te(!0)},style:{padding:"8px 12px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:"Delete"})]},e.id)),(0,u.jsx)("button",{onClick:()=>{const e={id:Date.now().toString(),start:"14:00",end:"15:00"};_e(n=>({...n,breakTimes:[...n.breakTimes||[],e]})),Te(!0)},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 16px",background:"white",color:"#635BFF",border:"1px dashed #635BFF",borderRadius:"8px",cursor:"pointer",fontSize:"14px",width:"100%",justifyContent:"center"},children:"+ Add Break Time"})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Order Settings"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Order Number Reset"}),(0,u.jsxs)(B,{value:De.orderNumberReset,onChange:e=>{_e(n=>({...n,orderNumberReset:e.target.value})),Te(!0)},children:[(0,u.jsx)("option",{value:"daily",children:"Daily"}),(0,u.jsx)("option",{value:"weekly",children:"Weekly"}),(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"never",children:"Never"})]})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Default Preparation Time"}),(0,u.jsx)(O,{type:"number",value:De.defaultPreparationTime,onChange:e=>{_e(n=>({...n,defaultPreparationTime:Number(e.target.value)})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"minutes"})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Tax Settings"}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Enable Tax"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:De.taxEnabled,onChange:e=>{_e(n=>({...n,taxEnabled:e.target.checked})),Te(!0)}}),(0,u.jsx)(R,{})]})]}),De.taxEnabled&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(z,{}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Tax Rate (%)"}),(0,u.jsx)(O,{type:"number",step:"0.01",min:"0",max:"100",value:De.taxRate,onChange:e=>{_e(n=>({...n,taxRate:Number(e.target.value)})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"%"})]})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(S,{children:"Service Charge Settings"}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Enable Service Charge"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:De.serviceChargeEnabled,onChange:e=>{_e(n=>({...n,serviceChargeEnabled:e.target.checked})),Te(!0)}}),(0,u.jsx)(R,{})]})]}),De.serviceChargeEnabled&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(z,{}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Service Charge Rate (%)"}),(0,u.jsx)(O,{type:"number",step:"0.01",min:"0",max:"100",value:De.serviceChargeRate,onChange:e=>{_e(n=>({...n,serviceChargeRate:Number(e.target.value)})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"%"})]})]})]}),(0,u.jsxs)(w,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:"Currency & Rounding Settings"}),(0,u.jsx)("p",{style:{color:"#6B7C93",marginBottom:"24px",fontSize:"14px"},children:"Configure currency and cash rounding for payments"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Currency"}),(0,u.jsxs)(B,{value:Le.currency,onChange:e=>{$e(n=>({...n,currency:e.target.value})),Te(!0)},children:[(0,u.jsx)("option",{value:"RM",children:"Malaysian Ringgit (RM)"}),(0,u.jsx)("option",{value:"USD",children:"US Dollar ($)"}),(0,u.jsx)("option",{value:"SGD",children:"Singapore Dollar (S$)"}),(0,u.jsx)("option",{value:"JPY",children:"Japanese Yen (\xa5)"}),(0,u.jsx)("option",{value:"THB",children:"Thai Baht (\u0e3f)"}),(0,u.jsx)("option",{value:"KRW",children:"Korean Won (\u20a9)"}),(0,u.jsx)("option",{value:"EUR",children:"Euro (\u20ac)"}),(0,u.jsx)("option",{value:"GBP",children:"British Pound (\xa3)"}),(0,u.jsx)("option",{value:"AUD",children:"Australian Dollar (A$)"}),(0,u.jsx)("option",{value:"CNY",children:"Chinese Yuan (\xa5)"}),(0,u.jsx)("option",{value:"INR",children:"Indian Rupee (\u20b9)"}),(0,u.jsx)("option",{value:"PHP",children:"Philippine Peso (\u20b1)"}),(0,u.jsx)("option",{value:"VND",children:"Vietnamese Dong (\u20ab)"}),(0,u.jsx)("option",{value:"IDR",children:"Indonesian Rupiah (Rp)"}),(0,u.jsx)("option",{value:"TWD",children:"Taiwan Dollar (NT$)"}),(0,u.jsx)("option",{value:"HKD",children:"Hong Kong Dollar (HK$)"})]})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Cash Rounding"}),(0,u.jsxs)(B,{value:null!==Le.cashRounding?Le.cashRounding.toFixed(2):"",onChange:e=>{const n=e.target.value?parseFloat(e.target.value):null;$e(e=>({...e,cashRounding:n})),Te(!0)},children:[(0,u.jsx)("option",{value:"",children:"Disabled (No Rounding)"}),(0,u.jsx)("option",{value:"0.05",children:"0.05 (5 sen/cent)"}),(0,u.jsx)("option",{value:"0.10",children:"0.10 (10 sen/cent)"}),(0,u.jsx)("option",{value:"0.50",children:"0.50 (50 sen/cent)"}),(0,u.jsx)("option",{value:"1.00",children:"1.00 (1 dollar/ringgit)"})]}),(0,u.jsx)(M,{children:"Round total amount to nearest value (e.g., RM 12.52 \u2192 RM 12.50 with 0.05 rounding)"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Apply Rounding To"}),(0,u.jsxs)(B,{value:Le.roundingApplyTo,onChange:e=>{$e(n=>({...n,roundingApplyTo:e.target.value})),Te(!0)},disabled:!Le.cashRounding,children:[(0,u.jsx)("option",{value:"cash_only",children:"Cash Payments Only"}),(0,u.jsx)("option",{value:"all",children:"All Payments"})]}),(0,u.jsx)(M,{children:"Choose whether to apply rounding to cash only or all payment methods"})]})]}),(0,u.jsxs)(w,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:"Takeaway Pricing Settings"}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Enable Takeaway Charges"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:De.takeawayPricing.enabled,onChange:e=>{_e(n=>({...n,takeawayPricing:{...n.takeawayPricing,enabled:e.target.checked}})),Te(!0)}}),(0,u.jsx)(R,{})]})]}),De.takeawayPricing.enabled&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(z,{}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Pricing Type"}),(0,u.jsxs)(B,{value:De.takeawayPricing.pricingType,onChange:e=>{_e(n=>({...n,takeawayPricing:{...n.takeawayPricing,pricingType:e.target.value}})),Te(!0)},children:[(0,u.jsx)("option",{value:"per-item",children:"Per Item (Fixed charge per item)"}),(0,u.jsx)("option",{value:"per-category",children:"Per Category (Different charges by category)"})]})]}),"per-item"===De.takeawayPricing.pricingType?(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Charge Per Item"}),(0,u.jsx)(O,{type:"number",step:"0.10",value:De.takeawayPricing.perItemCharge,onChange:e=>{_e(n=>({...n,takeawayPricing:{...n.takeawayPricing,perItemCharge:Number(e.target.value)}})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"RM"}),(0,u.jsx)(M,{children:"This amount will be added to each item for takeaway orders"})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(T,{style:{marginBottom:"16px"},children:"Category Charges"}),(0,u.jsx)(C,{children:ve.map(e=>(0,u.jsxs)(A,{children:[(0,u.jsxs)(T,{children:[e.emoji," ",e.name]}),(0,u.jsx)(O,{type:"number",step:"0.10",value:De.takeawayPricing.categoryCharges[e.id.toLowerCase()]||0,onChange:n=>{_e(r=>({...r,takeawayPricing:{...r.takeawayPricing,categoryCharges:{...r.takeawayPricing.categoryCharges,[e.id.toLowerCase()]:Number(n.target.value)}}})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"RM"})]},e.id))}),(0,u.jsx)(M,{children:"These amounts will be added to items based on their category for takeaway orders"})]})]})]}),(0,u.jsxs)(w,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:"Delivery Pricing Settings"}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Enable Delivery Service"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:(null===(Y=De.deliveryPricing)||void 0===Y?void 0:Y.enabled)||!1,onChange:e=>{_e(n=>({...n,deliveryPricing:{...n.deliveryPricing,enabled:e.target.checked}})),Te(!0)}}),(0,u.jsx)(R,{})]})]}),(null===(X=De.deliveryPricing)||void 0===X?void 0:X.enabled)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(z,{}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Minimum Order Amount"}),(0,u.jsx)(O,{type:"number",step:"1.00",value:De.deliveryPricing.minimumOrder,onChange:e=>{_e(n=>({...n,deliveryPricing:{...n.deliveryPricing,minimumOrder:Number(e.target.value)}})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"RM"}),(0,u.jsx)(M,{children:"Minimum subtotal required for delivery orders (0 = no minimum)"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Free Delivery Above"}),(0,u.jsx)(O,{type:"number",step:"1.00",value:De.deliveryPricing.freeAbove,onChange:e=>{_e(n=>({...n,deliveryPricing:{...n.deliveryPricing,freeAbove:Number(e.target.value)}})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"RM"}),(0,u.jsx)(M,{children:"Waive delivery fee if order subtotal exceeds this amount (999999 = never free)"})]}),(0,u.jsx)(z,{}),(0,u.jsx)(T,{style:{marginBottom:"16px"},children:"Delivery Zones"}),(0,u.jsx)(M,{style:{marginBottom:"16px"},children:"Configure delivery zones and their corresponding fees"}),(De.deliveryPricing.zones||[]).map((e,n)=>(0,u.jsxs)("div",{style:{background:"#FAFBFC",padding:"16px",borderRadius:"8px",marginBottom:"12px",border:"1px solid #E6EBF1"},children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,u.jsxs)(T,{style:{margin:0},children:["Zone ",n+1]}),(0,u.jsx)("button",{onClick:()=>{const e=[...De.deliveryPricing.zones||[]];e.splice(n,1),_e(n=>({...n,deliveryPricing:{...n.deliveryPricing,zones:e}})),Te(!0)},style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"14px",padding:"4px 8px"},children:"Remove"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Zone Name"}),(0,u.jsx)(k,{type:"text",placeholder:"e.g., Zone A (City Center)",value:e.name,onChange:e=>{const r=[...De.deliveryPricing.zones||[]];r[n]={...r[n],name:e.target.value},_e(e=>({...e,deliveryPricing:{...e.deliveryPricing,zones:r}})),Te(!0)}})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Description"}),(0,u.jsx)(k,{type:"text",placeholder:"e.g., 3km radius",value:e.description,onChange:e=>{const r=[...De.deliveryPricing.zones||[]];r[n]={...r[n],description:e.target.value},_e(e=>({...e,deliveryPricing:{...e.deliveryPricing,zones:r}})),Te(!0)}})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Delivery Fee"}),(0,u.jsx)(O,{type:"number",step:"0.50",value:e.fee,onChange:e=>{const r=[...De.deliveryPricing.zones||[]];r[n]={...r[n],fee:Number(e.target.value)},_e(e=>({...e,deliveryPricing:{...e.deliveryPricing,zones:r}})),Te(!0)}}),(0,u.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"RM"})]})]},n)),(0,u.jsx)("button",{onClick:()=>{const e=[...De.deliveryPricing.zones||[]];e.push({id:`zone-${Date.now()}`,name:"",description:"",fee:0}),_e(n=>({...n,deliveryPricing:{...n.deliveryPricing,zones:e}})),Te(!0)},style:{width:"100%",padding:"12px",background:"#F0F4FF",border:"1px dashed #635BFF",borderRadius:"8px",color:"#635BFF",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s"},children:"+ Add Delivery Zone"})]})]}),(0,u.jsxs)(w,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:"Loyalty Tier Settings"}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Enable Loyalty Tier System"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:(null===De||void 0===De||null===(Z=De.loyaltyTiers)||void 0===Z?void 0:Z.enabled)||!1,onChange:e=>{_e(n=>{var r,t,i,a;return{...n,loyaltyTiers:{...n.loyaltyTiers||{},enabled:e.target.checked,bronze:(null===n||void 0===n||null===(r=n.loyaltyTiers)||void 0===r?void 0:r.bronze)||{minOrders:0,minSpent:0},silver:(null===n||void 0===n||null===(t=n.loyaltyTiers)||void 0===t?void 0:t.silver)||{minOrders:5,minSpent:500},gold:(null===n||void 0===n||null===(i=n.loyaltyTiers)||void 0===i?void 0:i.gold)||{minOrders:15,minSpent:1500},vip:(null===n||void 0===n||null===(a=n.loyaltyTiers)||void 0===a?void 0:a.vip)||{minOrders:30,minSpent:3e3}}}}),Te(!0)}}),(0,u.jsx)(R,{})]})]}),(0,u.jsx)(M,{children:"Enable automatic loyalty tier upgrades based on customer orders and spending"}),(null===De||void 0===De||null===(ee=De.loyaltyTiers)||void 0===ee?void 0:ee.enabled)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(z,{}),(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsx)(T,{style:{color:"#CD7F32",fontWeight:600,fontSize:"15px",marginBottom:"8px"},children:"\ud83e\udd49 Bronze Tier (Default)"}),(0,u.jsx)(M,{children:"All new customers start at Bronze tier"})]}),(0,u.jsxs)("div",{style:{marginBottom:"32px"},children:[(0,u.jsx)(T,{style:{color:"#C0C0C0",fontWeight:600,fontSize:"15px",marginBottom:"16px",display:"block"},children:"\ud83e\udd48 Silver Tier Requirements"}),(0,u.jsxs)(C,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Minimum Orders"}),(0,u.jsx)(k,{type:"number",min:"0",value:(null===De||void 0===De||null===(ne=De.loyaltyTiers)||void 0===ne||null===(re=ne.silver)||void 0===re?void 0:re.minOrders)||5,onChange:e=>{_e(n=>({...n,loyaltyTiers:{...n.loyaltyTiers,silver:{...n.loyaltyTiers.silver,minOrders:Number(e.target.value)}}})),Te(!0)}}),(0,u.jsx)(M,{children:"Number of completed orders"})]}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(T,{children:["Minimum Spent (",Le.currency,")"]}),(0,u.jsx)(k,{type:"number",min:"0",step:"0.01",value:(null===De||void 0===De||null===(te=De.loyaltyTiers)||void 0===te||null===(ie=te.silver)||void 0===ie?void 0:ie.minSpent)||500,onChange:e=>{_e(n=>({...n,loyaltyTiers:{...n.loyaltyTiers,silver:{...n.loyaltyTiers.silver,minSpent:Number(e.target.value)}}})),Te(!0)}}),(0,u.jsx)(M,{children:"Total amount spent"})]})]})]}),(0,u.jsxs)("div",{style:{marginBottom:"32px"},children:[(0,u.jsx)(T,{style:{color:"#FFD700",fontWeight:600,fontSize:"15px",marginBottom:"16px",display:"block"},children:"\ud83e\udd47 Gold Tier Requirements"}),(0,u.jsxs)(C,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Minimum Orders"}),(0,u.jsx)(k,{type:"number",min:"0",value:(null===De||void 0===De||null===(ae=De.loyaltyTiers)||void 0===ae||null===(oe=ae.gold)||void 0===oe?void 0:oe.minOrders)||15,onChange:e=>{_e(n=>({...n,loyaltyTiers:{...n.loyaltyTiers,gold:{...n.loyaltyTiers.gold,minOrders:Number(e.target.value)}}})),Te(!0)}}),(0,u.jsx)(M,{children:"Number of completed orders"})]}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(T,{children:["Minimum Spent (",Le.currency,")"]}),(0,u.jsx)(k,{type:"number",min:"0",step:"0.01",value:(null===De||void 0===De||null===(se=De.loyaltyTiers)||void 0===se||null===(le=se.gold)||void 0===le?void 0:le.minSpent)||1500,onChange:e=>{_e(n=>({...n,loyaltyTiers:{...n.loyaltyTiers,gold:{...n.loyaltyTiers.gold,minSpent:Number(e.target.value)}}})),Te(!0)}}),(0,u.jsx)(M,{children:"Total amount spent"})]})]})]}),(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsx)(T,{style:{color:"#9B59B6",fontWeight:600,fontSize:"15px",marginBottom:"16px",display:"block"},children:"\ud83d\udc8e VIP Tier Requirements"}),(0,u.jsxs)(C,{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Minimum Orders"}),(0,u.jsx)(k,{type:"number",min:"0",value:(null===De||void 0===De||null===(de=De.loyaltyTiers)||void 0===de||null===(ce=de.vip)||void 0===ce?void 0:ce.minOrders)||30,onChange:e=>{_e(n=>({...n,loyaltyTiers:{...n.loyaltyTiers,vip:{...n.loyaltyTiers.vip,minOrders:Number(e.target.value)}}})),Te(!0)}}),(0,u.jsx)(M,{children:"Number of completed orders"})]}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(T,{children:["Minimum Spent (",Le.currency,")"]}),(0,u.jsx)(k,{type:"number",min:"0",step:"0.01",value:(null===De||void 0===De||null===(pe=De.loyaltyTiers)||void 0===pe||null===(he=pe.vip)||void 0===he?void 0:he.minSpent)||3e3,onChange:e=>{_e(n=>({...n,loyaltyTiers:{...n.loyaltyTiers,vip:{...n.loyaltyTiers.vip,minSpent:Number(e.target.value)}}})),Te(!0)}}),(0,u.jsx)(M,{children:"Total amount spent"})]})]})]}),(0,u.jsxs)(M,{style:{fontSize:"13px",marginTop:"16px"},children:[(0,u.jsx)("strong",{children:"Note:"})," Customers are automatically upgraded when they meet ",(0,u.jsx)("strong",{children:"EITHER"})," the minimum orders ",(0,u.jsx)("strong",{children:"OR"})," minimum spent requirement for a tier."]})]})]}),(0,u.jsxs)(w,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:"Pager System Settings"}),(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Enable Pager System"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:(null===De||void 0===De||null===(ge=De.pagerSystem)||void 0===ge?void 0:ge.enabled)||!1,onChange:e=>{_e(n=>{var r;return{...n,pagerSystem:{enabled:e.target.checked,totalPagers:(null===n||void 0===n||null===(r=n.pagerSystem)||void 0===r?void 0:r.totalPagers)||50}}}),Te(!0)}}),(0,u.jsx)(R,{})]})]}),(null===De||void 0===De||null===(xe=De.pagerSystem)||void 0===xe?void 0:xe.enabled)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(z,{}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Total Number of Pagers"}),(0,u.jsx)(k,{type:"number",min:"1",max:"999",value:(null===De||void 0===De||null===(ue=De.pagerSystem)||void 0===ue?void 0:ue.totalPagers)||50,onChange:e=>{_e(n=>{var r;return{...n,pagerSystem:{enabled:(null===n||void 0===n||null===(r=n.pagerSystem)||void 0===r?void 0:r.enabled)||!1,totalPagers:Number(e.target.value)}}}),Te(!0)}})]}),(0,u.jsx)(M,{children:"Set the total number of pager devices available in your restaurant. The POS Terminal will allow staff to assign pager numbers to orders."})]})]}),(0,u.jsxs)(w,{style:{gridColumn:"1 / -1"},children:[(0,u.jsx)(S,{children:"Table Management"}),(0,u.jsx)("p",{style:{color:"#6B7C93",marginBottom:"20px",fontSize:"14px"},children:"Configure table numbers, QR codes, and customer seating options for your restaurant."}),(0,u.jsxs)(C,{children:[(0,u.jsxs)("div",{children:[(0,u.jsxs)(A,{children:[(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Enable Table Numbers"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:He.enableTableNumbers,onChange:e=>{Qe({...He,enableTableNumbers:e.target.checked}),Te(!0)}}),(0,u.jsx)(R,{})]})]}),(0,u.jsx)(M,{children:"Allow customers to select table numbers when ordering"})]}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(F,{children:[(0,u.jsx)(P,{children:"Table Number Required"}),(0,u.jsxs)(E,{children:[(0,u.jsx)(I,{type:"checkbox",checked:He.tableNumberRequired,onChange:e=>{Qe({...He,tableNumberRequired:e.target.checked}),Te(!0)},disabled:!He.enableTableNumbers}),(0,u.jsx)(R,{})]})]}),(0,u.jsx)(M,{children:"Make table number selection mandatory for dine-in orders"})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Table Prefix"}),(0,u.jsx)(k,{type:"text",value:He.tablePrefix,onChange:e=>{Qe({...He,tablePrefix:e.target.value}),Te(!0)},placeholder:"e.g., T, TABLE"}),(0,u.jsx)(M,{children:"Prefix for table numbers (e.g., T001, TABLE001)"})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"Number of Tables"}),(0,u.jsx)(k,{type:"number",value:He.totalTables,onChange:e=>{Qe({...He,totalTables:parseInt(e.target.value)||1}),Te(!0)},min:"1",max:"999"})]})]})]}),(0,u.jsxs)(A,{children:[(0,u.jsx)(T,{children:"QR Code Base URL"}),(0,u.jsx)(k,{type:"text",value:He.qrCodeBaseUrl,onChange:e=>{Qe({...He,qrCodeBaseUrl:e.target.value}),Te(!0)},placeholder:"https://yourdomain.com"}),(0,u.jsx)(M,{children:"Base URL for QR codes (usually your domain)"})]}),(0,u.jsx)("button",{onClick:()=>{if(!Je)return void console.error("Restaurant slug not available for QR code generation");const e=[];for(let n=1;n<=He.totalTables;n++){const r=`${He.tablePrefix}${String(n).padStart(3,"0")}`,t=`${He.qrCodeBaseUrl}/mobile/${Je}?table=${r}`;e.push({id:`table-${n}`,number:n,qrCode:t,isActive:!0})}Xe(e),Te(!0)},style:{padding:"10px 20px",background:"#E6EBF1",color:"#0A2540",border:"none",borderRadius:"6px",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s",marginTop:"16px"},onMouseEnter:e=>{e.currentTarget.style.background="#D1D5DB"},onMouseLeave:e=>{e.currentTarget.style.background="#E6EBF1"},children:"Generate QR Codes"}),(0,u.jsx)(z,{}),(0,u.jsxs)("div",{style:{marginTop:"24px"},children:[(0,u.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Table QR Codes"}),(0,u.jsx)(K,{children:Ye.map(e=>{const n=`${He.tablePrefix}${String(e.number).padStart(3,"0")}`;return(0,u.jsxs)(L,{children:[(0,u.jsx)($,{children:n}),(0,u.jsxs)(U,{children:[(0,u.jsx)(a.X,{id:`qr-${e.id}`,value:e.qrCode,size:100,level:"H",includeMargin:!0,style:{display:"none"}}),(0,u.jsx)(a.h,{id:`qr-svg-${e.id}`,value:e.qrCode,size:100,level:"H",includeMargin:!0})]}),(0,u.jsxs)(q,{children:[(0,u.jsx)(W,{onClick:()=>(e=>{const n=`${He.tablePrefix}${String(e.number).padStart(3,"0")}`,r=ze.name||"Restaurant",t=document.getElementById(`qr-svg-${e.id}`);if(t){const e=t.cloneNode(!0),i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("width","300"),i.setAttribute("height","350"),i.setAttribute("viewBox","0 0 300 350");const a=document.createElementNS("http://www.w3.org/2000/svg","rect");a.setAttribute("width","300"),a.setAttribute("height","350"),a.setAttribute("fill","white"),i.appendChild(a);const o=document.createElementNS("http://www.w3.org/2000/svg","text");o.setAttribute("x","150"),o.setAttribute("y","30"),o.setAttribute("text-anchor","middle"),o.setAttribute("font-family","Arial, sans-serif"),o.setAttribute("font-size","16"),o.setAttribute("font-weight","600"),o.setAttribute("fill","#0A2540"),o.textContent=r,i.appendChild(o);const s=document.createElementNS("http://www.w3.org/2000/svg","text");s.setAttribute("x","150"),s.setAttribute("y","60"),s.setAttribute("text-anchor","middle"),s.setAttribute("font-family","Arial, sans-serif"),s.setAttribute("font-size","28"),s.setAttribute("font-weight","bold"),s.setAttribute("fill","#0A2540"),s.textContent=n,i.appendChild(s);const l=document.createElementNS("http://www.w3.org/2000/svg","g");l.setAttribute("transform","translate(50, 80)"),e.setAttribute("width","200"),e.setAttribute("height","200"),l.appendChild(e),i.appendChild(l);const d=(new XMLSerializer).serializeToString(i),c=new Blob([d],{type:"image/svg+xml"}),p=URL.createObjectURL(c),h=document.createElement("a");h.download=`${n}-qr.svg`,h.href=p,h.click(),URL.revokeObjectURL(p)}})(e),title:"Download SVG (recommended for print)",children:"SVG"}),(0,u.jsx)(W,{onClick:()=>(e=>{const n=`${He.tablePrefix}${String(e.number).padStart(3,"0")}`,r=document.getElementById(`qr-${e.id}`);if(r){const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return;const i=20,a=50,o=r.width||100;e.width=o+2*i,e.height=o+2*i+a,t.fillStyle="white",t.fillRect(0,0,e.width,e.height),t.fillStyle="#0A2540",t.font="bold 28px Arial, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(n,e.width/2,i+a/2),t.drawImage(r,i,i+a);const s=e.toDataURL("image/png"),l=document.createElement("a");l.download=`${n}-qr.png`,l.href=s,l.click()}})(e),title:"Download PNG",children:"PNG"}),(0,u.jsx)(W,{onClick:()=>(e=>{const n=`${He.tablePrefix}${String(e.number).padStart(3,"0")}`,r=ze.name||"Restaurant",t=document.getElementById(`qr-svg-${e.id}`);if(t){const e=(new XMLSerializer).serializeToString(t),i=window.open("","_blank");i&&(i.document.write(`\n          <!DOCTYPE html>\n          <html>\n          <head>\n            <title>Print QR - ${n}</title>\n            <style>\n              body {\n                margin: 0;\n                padding: 20px;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: center;\n                min-height: 100vh;\n                font-family: Arial, sans-serif;\n              }\n              .store-name {\n                font-size: 18px;\n                font-weight: 600;\n                color: #0A2540;\n                margin-bottom: 8px;\n              }\n              .table-number {\n                font-size: 32px;\n                font-weight: bold;\n                color: #0A2540;\n                margin-bottom: 16px;\n              }\n              .qr-container {\n                padding: 20px;\n                background: white;\n              }\n              .qr-container svg {\n                width: 200px;\n                height: 200px;\n              }\n              @media print {\n                body { padding: 0; }\n                .qr-container svg {\n                  width: 250px;\n                  height: 250px;\n                }\n              }\n            </style>\n          </head>\n          <body>\n            <div class="store-name">${r}</div>\n            <div class="table-number">${n}</div>\n            <div class="qr-container">${e}</div>\n            <script>\n              window.onload = function() {\n                window.print();\n                window.onafterprint = function() { window.close(); };\n              };\n            <\/script>\n          </body>\n          </html>\n        `),i.document.close())}})(e),children:"Print"})]})]},e.id)})})]})]})]}),(0,u.jsxs)(_,{children:[(0,u.jsx)(j,{onClick:ln,disabled:!Ae,children:Ae?"Save Changes":"Saved"}),ke&&(0,u.jsx)(D,{type:ke.type,children:ke.message})]})]}),"managers"===we&&(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",padding:"16px",marginBottom:"24px"},children:(0,u.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#075985",lineHeight:"1.5"},children:"View all managers connected to this restaurant. Managers can assist with operations, reporting, and business management."})}),nn?(0,u.jsx)(w,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"Loading managers..."})}):0===Ze.length?(0,u.jsx)(w,{children:(0,u.jsxs)("div",{style:{textAlign:"center",padding:"40px"},children:[(0,u.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px"},children:"No Managers Connected"}),(0,u.jsx)("p",{style:{color:"#6B7C93",fontSize:"14px"},children:"No managers are currently assigned to this restaurant."})]})}):(0,u.jsx)(C,{children:Ze.map(e=>{const n=(e=>{switch(e){case"Foodcourt General":return{bg:"#ECFDF5",color:"#059669",border:"#A7F3D0"};case"Brand General":return{bg:"#F0F9FF",color:"#0284C7",border:"#BAE6FD"};case"Foodcourt Manager":return{bg:"#FEF3C7",color:"#D97706",border:"#FDE68A"};case"Brand Manager":return{bg:"#FAE8FF",color:"#A855F7",border:"#E9D5FF"};default:return{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}}})(e.role);return(0,u.jsx)(w,{children:(0,u.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"16px"},children:[(0,u.jsx)("div",{style:{width:"56px",height:"56px",borderRadius:"50%",background:"linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px",fontWeight:"600",flexShrink:0},children:e.name.charAt(0).toUpperCase()}),(0,u.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,u.jsx)("h4",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.name}),e.isPrimary&&(0,u.jsx)("span",{style:{padding:"2px 8px",borderRadius:"12px",fontSize:"11px",fontWeight:"600",background:"#FEF3C7",color:"#D97706",border:"1px solid #FDE68A"},children:"PRIMARY"})]}),(0,u.jsx)("p",{style:{margin:"0 0 4px 0",fontSize:"14px",color:"#6B7C93",wordBreak:"break-all"},children:e.email}),e.company&&(0,u.jsx)("p",{style:{margin:"0 0 4px 0",fontSize:"14px",color:"#6B7C93"},children:e.company}),e.phone&&(0,u.jsx)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7C93"},children:e.phone}),(0,u.jsx)("div",{style:{display:"inline-flex",alignItems:"center",padding:"4px 12px",borderRadius:"6px",fontSize:"13px",fontWeight:"500",background:n.bg,color:n.color,border:`1px solid ${n.border}`},children:e.role})]})]})},e.id)})}),(0,u.jsxs)(_,{children:[(0,u.jsx)(j,{onClick:ln,disabled:!Ae,children:Ae?"Save Changes":"Saved"}),ke&&(0,u.jsx)(D,{type:ke.type,children:ke.message})]})]})]})]})})}},3705:(e,n,r)=>{r.d(n,{cc:()=>i});var t=r(4752);const i=t.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4669:(e,n,r)=>{r.d(n,{A:()=>v});var t=r(9950),i=r(4752),a=r(4414);const o=i.Ay.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,s=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=i.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=i.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,p=i.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,h=i.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,g=i.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,x=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,u=i.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
  }

  input {
    display: none;
  }
`,y=i.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,m=i.Ay.input`
  display: none;
`,v=e=>{let{value:n,onChange:r,label:i="Logo Upload",helpText:v="Upload an image for your logo",maxSize:j=2,previewSize:b=150,showRemoveButton:f=!0,changeButtonText:C="Change Image",removeButtonText:w="Remove Image",imageAltText:S="Uploaded"}=e;const[A,T]=(0,t.useState)(!1),k=(0,t.useRef)(null),B=(0,t.useRef)(null),F=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);const n=new FileReader;n.onload=e=>{var n;const t=new Image;t.onload=()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return;const i=800;let a=t.width,o=t.height;(a>i||o>i)&&(a>o?(o=o/a*i,a=i):(a=a/o*i,o=i)),e.width=a,e.height=o,n.drawImage(t,0,0,a,o);const s=e.toDataURL("image/jpeg",.85);r(s)},t.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},P=e=>{const n=e.target.files;n&&n.length>0&&F(n[0])};return(0,a.jsxs)(o,{children:[i&&(0,a.jsx)(s,{children:i}),v&&(0,a.jsx)(l,{children:v}),(0,a.jsxs)(d,{children:[(0,a.jsx)(c,{ref:B,isDragging:A,hasImage:!!n,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),T(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&T(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),T(!1);const n=e.dataTransfer.files;n&&n.length>0&&F(n[0])},onClick:()=>{var e;n||(null===(e=k.current)||void 0===e||e.click())},children:n?(0,a.jsx)("img",{src:n,alt:S}):(0,a.jsxs)(p,{children:[(0,a.jsx)(h,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,a.jsxs)(g,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),n&&(0,a.jsxs)(x,{children:[(0,a.jsxs)(u,{children:[C,(0,a.jsx)("input",{ref:k,type:"file",accept:"image/*",onChange:P})]}),f&&(0,a.jsx)(y,{onClick:()=>{r("")},children:w})]})]}),!n&&(0,a.jsx)(m,{ref:k,type:"file",accept:"image/*",onChange:P})]})}}}]);