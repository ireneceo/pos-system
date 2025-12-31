"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2980],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>o});n(9950);var i=n(4752),r=n(4414);const s=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,l=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,o=e=>{let{children:t,className:n,style:i,...a}=e;return(0,r.jsx)(s,{className:n,style:i,...a,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,r.jsx)(a,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,r.jsx)(l,{...n,children:t})}},2980:(e,t,n)=>{n.r(t),n.d(t,{default:()=>J});var i=n(9950),r=n(4492),s=n(4752),a=n(3310),l=n(7492),o=n(2488),d=n(1367),c=n(9610),u=n(4021),p=n(6038),x=n(4414);const h=s.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,g=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,m=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,j=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${e=>"out_of_stock"===e.type?"#FEF2F2":"#FFFBEB"};
  border: 1px solid ${e=>"out_of_stock"===e.type?"#FECACA":"#FED7AA"};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,y=s.Ay.div`
  flex: 1;
`,v=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,_=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,f=s.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #F3F4F6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,k=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,b=s.Ay.div`
  display: flex;
  flex-direction: column;
`,S=s.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,C=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,w=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${e=>{switch(e.urgency){case"expired":case"critical":return"#FEF2F2";case"warning":return"#FFFBEB";default:return"#F0F9FF"}}};
  border: 1px solid ${e=>{switch(e.urgency){case"expired":case"critical":return"#FECACA";case"warning":return"#FED7AA";default:return"#BAE6FD"}}};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,F=s.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #DC2626; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #059669; color: white;"}}}
`,E=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,A=s.Ay.button`
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  padding: 6px 12px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`,B=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,z=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,R=(s.Ay.div``,s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`),$=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,O=(0,s.Ay)(l.A0)`
  @media (max-width: 1200px) {
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(4) {
      display: none;
    }
  }
`,D=(0,s.Ay)(l.Hj)`
  @media (max-width: 1200px) {
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(4) {
      display: none;
    }
  }
`,I=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,T=s.Ay.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #635BFF;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.2);
  }
`,M=s.Ay.input`
  width: 70px;
  padding: 4px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,P=s.Ay.button`
  padding: 6px 12px;
  background: #F0FDF4;
  color: #16A34A;
  border: 1px solid #16A34A;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #DCFCE7;
  }
`,U=s.Ay.div`
  position: relative;
`,L=s.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }
`,Q=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 4px;
`,Z=s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: #F3F4F6;
  }
`,q=s.Ay.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #FEE2E2;
  background: #FEF2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  color: #DC2626;

  &:hover {
    background: #FEE2E2;
    border-color: #FECACA;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`,N=s.Ay.button`
  padding: 6px 12px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`,W=e=>{let{restaurantId:t,currency:n}=e;const[r,s]=(0,i.useState)([]),[a,o]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/inventory/transactions?limit=50`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&s(i.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{o(!1)}})()},[t]);const d=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},c=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return a?(0,x.jsx)(l.pp,{children:"Loading transactions..."}):0===r.length?(0,x.jsxs)(l.pp,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(l.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,x.jsx)("span",{children:"Date"}),(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Type"}),(0,x.jsx)("span",{children:"Change"}),(0,x.jsx)("span",{children:"After"}),(0,x.jsx)("span",{children:"Notes"})]}),r.map(e=>{var t;return(0,x.jsx)(l.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,x.jsxs)(l.Np,{children:[(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Ingredient"}),(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Type"}),(0,x.jsx)("span",{style:{color:c(e.transaction_type),fontWeight:600},children:d(e.transaction_type)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Change"}),(0,x.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"After"}),(0,x.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Notes"}),(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})},J=()=>{var e,t;const{user:n}=(0,d.As)(),{restaurantId:s}=(0,r.g)(),[J,G]=(0,r.ok)(),{defaultCurrency:H}=(0,u.i1)(),[X,K]=(0,i.useState)("RM"),Y=J.get("tab")||"dashboard",V=e=>{G({tab:e})},[ee,te]=(0,i.useState)(!0),[ne,ie]=(0,i.useState)(null),[re,se]=(0,i.useState)([]),[ae,le]=(0,i.useState)([]),[oe,de]=(0,i.useState)([]),[ce,ue]=(0,i.useState)([]),[pe,xe]=(0,i.useState)(""),[he,ge]=(0,i.useState)("all"),[me,je]=(0,i.useState)([]),[ye,ve]=(0,i.useState)(null),[_e,fe]=(0,i.useState)(!1),[ke,be]=(0,i.useState)(""),[Se,Ce]=(0,i.useState)(""),[we,Fe]=(0,i.useState)("all"),[Ee,Ae]=(0,i.useState)(!1),[Be,ze]=(0,i.useState)(!1),[Re,$e]=(0,i.useState)(!1),[Oe,De]=(0,i.useState)(!1),[Ie,Te]=(0,i.useState)(null),[Me,Pe]=(0,i.useState)(""),[Ue,Le]=(0,i.useState)(""),[Qe,Ze]=(0,i.useState)(""),[qe,Ne]=(0,i.useState)(""),[We,Je]=(0,i.useState)(""),[Ge,He]=(0,i.useState)({}),[Xe,Ke]=(0,i.useState)(!1),[Ye,Ve]=(0,i.useState)(!1),[et,tt]=(0,i.useState)(!1),[nt,it]=(0,i.useState)(null),[rt,st]=(0,i.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[at,lt]=(0,i.useState)(!1),[ot,dt]=(0,i.useState)(!1),[ct,ut]=(0,i.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[pt,xt]=(0,i.useState)(!1),[ht,gt]=(0,i.useState)([]),[mt,jt]=(0,i.useState)([]),[yt,vt]=(0,i.useState)(""),[_t,ft]=(0,i.useState)(!1),[kt,bt]=(0,i.useState)(!1),[St,Ct]=(0,i.useState)(null),[wt,Ft]=(0,i.useState)(!1),[Et,At]=(0,i.useState)(null),[Bt,zt]=(0,i.useState)(!1),[Rt,$t]=(0,i.useState)(null),[Ot,Dt]=(0,i.useState)(""),It=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],Tt=It.filter(e=>e.label.toLowerCase().includes(yt.toLowerCase())||e.value.toLowerCase().includes(yt.toLowerCase())),[Mt,Pt]=(0,i.useState)(null),[Ut,Lt]=(0,i.useState)(""),[Qt,Zt]=(0,i.useState)("ingredient"),[qt,Nt]=(0,i.useState)({}),Wt=s?parseInt(s,10):null===n||void 0===n?void 0:n.restaurant_id;(0,i.useEffect)(()=>{H&&K(H)},[H]);const Jt=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),Gt=(0,i.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Jt();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[Jt]),Ht=(0,i.useCallback)(async()=>{if(Wt)try{te(!0);const[e,t,n,i,r]=await Promise.all([Gt(`/api/restaurants/${Wt}/inventory/summary`),Gt(`/api/restaurants/${Wt}/inventory`),Gt(`/api/restaurants/${Wt}/inventory/alerts?resolved=false`),Gt(`/api/restaurants/${Wt}/inventory/reorder-suggestions`),Gt(`/api/restaurants/${Wt}/inventory/expiring?days=14`)]);e.success&&ie(e.data),t.success&&se(t.data),n.success&&le(n.data),i.success&&de(i.data),r.success&&ue(r.data);try{const e=await Gt(`/api/restaurants/${Wt}/inventory/general-stock`);e.success&&je(e.data||[])}catch{je([])}try{const e=await Gt(`/api/restaurants/${Wt}/suppliers`);e.success&&gt(e.data||[])}catch{gt([])}try{const e=await Gt(`/api/restaurants/${Wt}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];jt(t)}}catch{jt([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{te(!1)}},[Wt,Gt]);(0,i.useEffect)(()=>{Ht()},[Ht]),(0,i.useEffect)(()=>{if(re.length>0){const e=re.some(e=>e.current_stock>0||e.last_stock_take_at);Ke(!e)}},[re]);const Xt=(e,t,n)=>{He(i=>({...i,[e]:{...i[e],[t]:n}}))},Kt=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},Yt=e=>{Te(e),Pe(""),Le(""),Ze(""),Ne(""),Je(""),Ae(!0)},Vt=(e,t,n)=>{Pt(e),Lt(t.toString()),Zt(n)},en=()=>{Pt(null),Lt("")},tn=async e=>{const t=parseFloat(Ut);if(isNaN(t)||t<0)en();else try{const n="ingredient"===Qt?`/api/restaurants/${Wt}/inventory/adjust`:`/api/restaurants/${Wt}/inventory/general-stock/${e}/adjust`,i={new_quantity:t,reason:"Stock adjustment"};"ingredient"===Qt&&(i.ingredient_id=e);(await Gt(n,{method:"POST",body:JSON.stringify(i)})).success&&("ingredient"===Qt?se(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)):je(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)))}catch(n){console.error("Failed to adjust stock:",n)}finally{en()}},nn=(e,t)=>{"Enter"===e.key?tn(t):"Escape"===e.key&&en()},rn=e=>{$t(e),Dt(e.min_order?String(e.min_order):""),zt(!0)},sn=re.filter(e=>{const t=e.name.toLowerCase().includes(pe.toLowerCase()),n="all"===he||e.stock_status===he;return t&&n}),an=(("all"===we||"ingredients"===we)&&sn.map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===we||"general_stock"===we)&&me.filter(e=>{const t=e.name.toLowerCase().includes(pe.toLowerCase()),n="all"===he||e.stock_status===he;return t&&n}).map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}});return Wt?(0,x.jsxs)(a.A,{children:[(0,x.jsxs)(l.mc,{children:[(0,x.jsx)(l.Y9,{children:(0,x.jsx)(l.hE,{children:"Inventory"})}),(0,x.jsxs)(l.UC,{children:[(0,x.jsxs)(l.j,{children:[(0,x.jsx)(l.oz,{active:"dashboard"===Y,onClick:()=>V("dashboard"),children:"Dashboard"}),(0,x.jsx)(l.oz,{active:"list"===Y,onClick:()=>V("list"),children:"Stock List"}),(0,x.jsx)(l.oz,{active:"history"===Y,onClick:()=>V("history"),children:"History"})]}),ee?(0,x.jsx)(l.pp,{children:"Loading..."}):"dashboard"===Y?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#059669",children:[(0,x.jsx)(l.Os,{children:(null===ne||void 0===ne?void 0:ne.total_items)||0}),(0,x.jsx)(l.v0,{children:"Total Ingredients"}),(0,x.jsx)(l.d1,{children:"managed items"})]}),(0,x.jsxs)(l.hI,{color:"#D97706",children:[(0,x.jsx)(l.Os,{children:(null===ne||void 0===ne?void 0:ne.low_stock_count)||0}),(0,x.jsx)(l.v0,{children:"Low Stock"}),(0,x.jsx)(l.d1,{children:"need attention"})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:(null===ne||void 0===ne?void 0:ne.out_of_stock_count)||0}),(0,x.jsx)(l.v0,{children:"Out of Stock"}),(0,x.jsx)(l.d1,{children:"urgent"})]}),(0,x.jsxs)(l.hI,{color:"#7C3AED",children:[(0,x.jsx)(l.Os,{children:(0,p.vv)((null===ne||void 0===ne?void 0:ne.monthly_loss)||0,X)}),(0,x.jsx)(l.v0,{children:"Monthly Loss"}),(0,x.jsx)(l.d1,{children:"this month"})]}),(0,x.jsxs)(l.hI,{color:"#EA580C",children:[(0,x.jsx)(l.Os,{children:ce.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,x.jsx)(l.v0,{children:"Expiring Soon"}),(0,x.jsx)(l.d1,{children:"within 3 days"})]})]}),ae.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:"Stock Alerts"}),(0,x.jsx)("div",{children:ae.slice(0,5).map(e=>(0,x.jsxs)(j,{type:e.alert_type,children:[(0,x.jsxs)(y,{children:[(0,x.jsx)(v,{children:e.ingredient.name}),(0,x.jsxs)(_,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,x.jsxs)(l.wr,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>{const t=re.find(t=>t.id===e.ingredient_id);t&&Yt(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,x.jsx)(l.$n,{variant:"secondary",onClick:()=>(async e=>{try{(await Gt(`/api/restaurants/${Wt}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&Ht()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),ce.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:"Expiring Items"}),(0,x.jsx)("div",{children:ce.slice(0,5).map(e=>(0,x.jsxs)(w,{urgency:e.urgency,children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(v,{children:[e.ingredient_name,e.batch_number&&(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,x.jsxs)(_,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,x.jsx)(F,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,x.jsx)(l.$n,{variant:"danger",onClick:()=>{const t=re.find(t=>t.id===e.ingredient_id);t&&(Te(t),Pe(""),Le(""),ze(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),oe.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:"Reorder Suggestions"}),(0,x.jsx)(h,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(l.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Current Stock"}),(0,x.jsx)("span",{children:"Daily Usage"}),(0,x.jsx)("span",{children:"Suggested Qty"}),(0,x.jsx)("span",{children:"Est. Cost"}),(0,x.jsx)("span",{children:"Urgency"}),(0,x.jsx)("span",{children:"Order"})]}),oe.slice(0,10).map(e=>(0,x.jsxs)(l.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,x.jsx)("div",{children:e.ingredient.name}),(0,x.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,x.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,x.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,x.jsx)("div",{children:(0,p.vv)(e.estimated_cost,X)}),(0,x.jsx)("div",{children:(0,x.jsx)(C,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,x.jsx)(M,{type:"number",min:"0",step:"1",value:qt[e.ingredient.id]||e.suggested_qty,onChange:t=>Nt(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,x.jsx)(P,{onClick:()=>{const t=re.find(t=>t.id===e.ingredient.id);t&&rn({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>{0===re.length?window.location.href=`/restaurant/${Wt}/recipe-management?tab=ingredients`:V("list")},children:"+ Receive Stock"}),(0,x.jsx)(l.$n,{variant:"secondary",onClick:()=>{0===re.length?window.location.href=`/restaurant/${Wt}/recipe-management?tab=ingredients`:V("list")},children:"+ Record Waste"}),(0,x.jsx)(l.$n,{variant:"secondary",onClick:()=>V("history"),children:"View All Transactions"})]})]}):"list"===Y?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(o.Qn,{children:[(0,x.jsxs)(o.Jt,{value:we,onChange:e=>Fe(e.target.value),style:{minWidth:"140px"},children:[(0,x.jsx)("option",{value:"all",children:"All Items"}),(0,x.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,x.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,x.jsx)(o.DO,{type:"text",placeholder:"Search...",value:pe,onChange:e=>xe(e.target.value)}),(0,x.jsxs)(o.Jt,{value:he,onChange:e=>ge(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,x.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>dt(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===we||"general_stock"===we)&&me.length>0&&(0,x.jsxs)(x.Fragment,{children:["all"===we&&(0,x.jsxs)(g,{children:["General Stock (",me.filter(e=>{const t=e.name.toLowerCase().includes(pe.toLowerCase()),n="all"===he||e.stock_status===he;return t&&n}).length,")"]}),(0,x.jsxs)(l.XI,{style:{marginBottom:"24px"},children:[(0,x.jsxs)(O,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{children:"Item"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Current Stock"}),(0,x.jsx)("span",{children:"Min Stock"}),(0,x.jsx)("span",{children:"Unit Cost"}),(0,x.jsx)("span",{children:"Supplier"}),(0,x.jsx)("span",{children:"Actions"})]}),me.filter(e=>{const t=e.name.toLowerCase().includes(pe.toLowerCase()),n="all"===he||e.stock_status===he;return t&&n}).map(e=>(0,x.jsxs)(D,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(l.Np,{children:[(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Item"}),(0,x.jsxs)(k,{children:[(0,x.jsx)(f,{children:e.image_url?(0,x.jsx)("img",{src:e.image_url,alt:e.name}):(0,x.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,x.jsxs)(b,{children:[(0,x.jsx)(R,{children:e.name}),e.code&&(0,x.jsx)(S,{children:e.code}),(0,x.jsx)($,{children:e.category})]})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Status"}),(0,x.jsx)(m,{status:e.stock_status,children:an(e.stock_status)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Current Stock"}),Mt===e.id&&"general_stock"===Qt?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,x.jsx)(T,{type:"number",step:"0.01",value:Ut,onChange:e=>Lt(e.target.value),onKeyDown:t=>nn(t,e.id),onBlur:()=>tn(e.id),autoFocus:!0}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,x.jsxs)(I,{onClick:()=>Vt(e.id,e.current_stock,"general_stock"),children:[(0,x.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Min Stock"}),(0,x.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.stock_unit]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Unit Cost"}),(0,x.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,X)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Supplier"}),(0,x.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]})]}),(0,x.jsxs)(l.wr,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>{ve(e),be(""),Ce(""),fe(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,x.jsx)(P,{onClick:()=>rn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),children:"Order"}),(0,x.jsx)(N,{onClick:()=>{var t;Ct(e),ut({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),bt(!0)},children:"Edit"}),(0,x.jsx)(q,{onClick:()=>{At({type:"general_stock",id:e.id,name:e.name}),Ft(!0)},children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===we||"ingredients"===we)&&(0,x.jsxs)(x.Fragment,{children:["all"===we&&(0,x.jsxs)(g,{children:["Ingredients (",sn.length,")"]}),0===sn.length?(0,x.jsxs)(l.pp,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===re.length?"No ingredients found":"No matching ingredients"}),(0,x.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===re.length?"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===re.length&&(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>window.location.href=`/restaurant/${Wt}/recipe-management?tab=ingredients`,children:"Go to Ingredients"})]}):(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(O,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Current Stock"}),(0,x.jsx)("span",{children:"Min / Prediction"}),(0,x.jsx)("span",{children:"Unit Cost"}),(0,x.jsx)("span",{children:"Supplier"}),(0,x.jsx)("span",{children:"Last Stock Take"}),(0,x.jsx)("span",{children:"Actions"})]}),sn.map(e=>{return(0,x.jsxs)(D,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(l.Np,{children:[(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Ingredient"}),(0,x.jsxs)(k,{children:[(0,x.jsx)(f,{children:e.image_url?(0,x.jsx)("img",{src:e.image_url,alt:e.name}):(0,x.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,x.jsxs)(b,{children:[(0,x.jsx)(R,{children:e.name}),e.code&&(0,x.jsx)(S,{children:e.code}),(0,x.jsxs)($,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Status"}),(0,x.jsx)(m,{status:e.stock_status,children:an(e.stock_status)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Current Stock"}),Mt===e.id&&"ingredient"===Qt?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,x.jsx)(T,{type:"number",step:"0.01",value:Ut,onChange:e=>Lt(e.target.value),onKeyDown:t=>nn(t,e.id),onBlur:()=>tn(e.id),autoFocus:!0}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,x.jsxs)(I,{onClick:()=>Vt(e.id,e.current_stock,"ingredient"),children:[(0,x.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Min / Prediction"}),(0,x.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",e.min_stock," ",e.unit]}),(0,x.jsx)(E,{level:e.prediction_confidence||"none",children:Kt(e.prediction_confidence||"none")})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Unit Cost"}),(0,x.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,X)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Supplier"}),(0,x.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Last Stock Take"}),(0,x.jsx)("div",{style:{color:"#6B7280"},children:(t=e.last_stock_take_at,t?new Date(t).toLocaleDateString():"-")})]})]}),(0,x.jsxs)(l.wr,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>Yt(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,x.jsx)(P,{onClick:()=>rn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),children:"Order"}),(0,x.jsx)(A,{onClick:()=>(e=>{var t;it(e),st({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),tt(!0)})(e),children:"Settings"}),(0,x.jsx)(q,{onClick:()=>{At({type:"ingredient",id:e.id,name:e.name}),Ft(!0)},children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id);var t})]})]})]}):(0,x.jsx)(W,{restaurantId:Wt,currency:X})]})]}),(0,x.jsx)(c.aF,{isOpen:Ee,onClose:()=>Ae(!1),title:"Receive Stock",size:"medium",children:Ie&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Ingredient"}),(0,x.jsx)(c.ZQ,{type:"text",value:Ie.name,disabled:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Current Stock"}),(0,x.jsx)(c.ZQ,{type:"text",value:`${Ie.current_stock} ${Ie.unit}`,disabled:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsxs)(c.lR,{children:["Quantity Received (",Ie.unit,") *"]}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",value:Me,onChange:e=>Pe(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,x.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,x.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,x.jsx)(c.lR,{children:"Batch/Lot Number"}),(0,x.jsx)(c.ZQ,{type:"text",value:Qe,onChange:e=>Ze(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,x.jsxs)(c.gE,{style:{marginBottom:0},children:[(0,x.jsx)(c.lR,{children:"Manufacture Date"}),(0,x.jsx)(c.ZQ,{type:"date",value:qe,onChange:e=>Ne(e.target.value)})]})]}),(0,x.jsxs)(c.gE,{style:{marginTop:"12px"},children:[(0,x.jsx)(c.lR,{children:"Expiry Date"}),(0,x.jsx)(c.ZQ,{type:"date",value:We,onChange:e=>Je(e.target.value)}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Notes (Optional)"}),(0,x.jsx)(c.ZQ,{type:"text",value:Ue,onChange:e=>Le(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>Ae(!1),children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Ie&&Me)try{(await Gt(`/api/restaurants/${Wt}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:Ie.id,quantity:parseFloat(Me),notes:Ue,batch_number:Qe||null,manufacture_date:qe||null,expiry_date:We||null})})).success&&(Ae(!1),Te(null),Pe(""),Le(""),Ze(""),Ne(""),Je(""),Ht())}catch(e){console.error("Failed to receive stock:",e)}},children:"Confirm Receive"})]})]})}),(0,x.jsx)(c.aF,{isOpen:Be,onClose:()=>ze(!1),title:"Record Waste",size:"small",children:Ie&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Ingredient"}),(0,x.jsx)(c.ZQ,{type:"text",value:Ie.name,disabled:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Current Stock"}),(0,x.jsx)(c.ZQ,{type:"text",value:`${Ie.current_stock} ${Ie.unit}`,disabled:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsxs)(c.lR,{children:["Waste Quantity (",Ie.unit,") *"]}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",value:Me,onChange:e=>Pe(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Reason (Optional)"}),(0,x.jsx)(c.ZQ,{type:"text",value:Ue,onChange:e=>Le(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>ze(!1),children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Ie&&Me)try{(await Gt(`/api/restaurants/${Wt}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:Ie.id,quantity:parseFloat(Me),notes:Ue})})).success&&(ze(!1),Te(null),Pe(""),Le(""),Ht())}catch(e){console.error("Failed to record waste:",e)}},children:"Confirm Waste"})]})]})}),(0,x.jsxs)(c.aF,{isOpen:Re,onClose:()=>$e(!1),title:"Set Initial Stock",size:"large",children:[(0,x.jsx)(h,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,x.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(re.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,x.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,x.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(l.A0,{columns:"2fr 1fr 1fr",children:[(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Current Qty"}),(0,x.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,x.jsxs)(l.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,x.jsx)("div",{children:(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=Ge[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>Xt(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,x.jsx)("div",{children:(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=Ge[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>Xt(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>$e(!1),children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(Ge).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{Ve(!0);(await Gt(`/api/restaurants/${Wt}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success&&($e(!1),Ke(!1),Ht())}catch(t){console.error("Failed to save initial stock:",t)}finally{Ve(!1)}},disabled:Ye,children:Ye?"Saving...":"Save Initial Stock"})]})]}),(0,x.jsx)(c.aF,{isOpen:_e,onClose:()=>fe(!1),title:`Receive Stock: ${(null===ye||void 0===ye?void 0:ye.name)||""}`,size:"small",children:ye&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,x.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[ye.current_stock," ",ye.stock_unit]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Quantity to Add *"}),(0,x.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:ke,onChange:e=>be(e.target.value),placeholder:"Enter quantity"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Notes (Optional)"}),(0,x.jsx)(c.ZQ,{value:Se,onChange:e=>Ce(e.target.value),placeholder:"Enter notes"})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(ke&&!(parseFloat(ke)<=0))try{(await Gt(`/api/restaurants/${Wt}/inventory/general-stock/${ye.id}/receive`,{method:"POST",body:JSON.stringify({quantity:parseFloat(ke),notes:Se})})).success&&(fe(!1),Ht())}catch(e){console.error("Failed to receive general stock:",e)}},disabled:!ke||parseFloat(ke)<=0,children:"Receive"})]})]})}),(0,x.jsx)(c.aF,{isOpen:Bt,onClose:()=>zt(!1),title:`Order: ${(null===Rt||void 0===Rt?void 0:Rt.name)||""}`,size:"small",children:Rt&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,x.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Rt.current_stock," ",Rt.unit]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,x.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[Rt.min_stock," ",Rt.unit]})]})]}),Rt.min_order&&Rt.min_order>0&&(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",Rt.min_order," ",Rt.unit]}),Rt.supplier_name&&(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Rt.supplier_name]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsxs)(c.lR,{children:["Order Quantity (",Rt.unit,") *"]}),(0,x.jsx)(c.ZQ,{type:"number",min:"0",step:"0.01",value:Ot,onChange:e=>Dt(e.target.value),placeholder:Rt.min_order?`Min: ${Rt.min_order}`:"Enter quantity"})]}),Ot&&parseFloat(Ot)>0&&(0,x.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,x.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,p.vv)(parseFloat(Ot)*Rt.unit_cost,X)})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>zt(!1),children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:()=>{Rt&&Ot&&(alert(`Order sent: ${Ot} ${Rt.unit} of ${Rt.name}`),zt(!1),$t(null),Dt(""))},disabled:!Ot||parseFloat(Ot)<=0,children:"Send Order"})]})]})}),(0,x.jsx)(c.aF,{isOpen:et,onClose:()=>tt(!1),title:`Settings: ${(null===nt||void 0===nt?void 0:nt.name)||""}`,size:"small",children:nt&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,x.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)(E,{level:nt.prediction_confidence||"none",children:Kt(nt.prediction_confidence||"none")}),(0,x.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(nt.avg_daily_usage))||0).toFixed(2)," ",nt.unit,"/day (calculated)"]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsxs)(c.lR,{children:["Minimum Stock Level (",nt.unit,")"]}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:rt.min_stock,onChange:e=>st({...rt,min_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsxs)(c.lR,{children:["Minimum Order (",nt.unit,")"]}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:rt.min_order,onChange:e=>st({...rt,min_order:e.target.value}),placeholder:"0"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Lead Time (days)"}),(0,x.jsx)(c.ZQ,{type:"number",min:"1",value:rt.lead_time_days,onChange:e=>st({...rt,lead_time_days:e.target.value}),placeholder:"1"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Safety Stock (%)"}),(0,x.jsx)(c.ZQ,{type:"number",min:"0",max:"100",value:rt.safety_stock_percent,onChange:e=>st({...rt,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsxs)(c.lR,{children:["Manual Daily Usage (",nt.unit,"/day)"]}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:rt.manual_daily_usage,onChange:e=>st({...rt,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>tt(!1),children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(nt)try{lt(!0);(await Gt(`/api/restaurants/${Wt}/inventory/${nt.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(rt.lead_time_days)||1,safety_stock_percent:parseFloat(rt.safety_stock_percent)||20,manual_daily_usage:rt.manual_daily_usage?parseFloat(rt.manual_daily_usage):null,min_stock:parseFloat(rt.min_stock)||0,min_order:parseFloat(rt.min_order)||0})})).success&&(tt(!1),Ht())}catch(e){console.error("Failed to save settings:",e)}finally{lt(!1)}},disabled:at,children:at?"Saving...":"Save Settings"})]})]})}),(0,x.jsxs)(c.aF,{isOpen:ot,onClose:()=>{dt(!1),ft(!1)},title:"Add General Stock",size:"medium",children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Item Name *"}),(0,x.jsx)(c.ZQ,{type:"text",value:ct.name,onChange:e=>ut({...ct,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Code (SKU)"}),(0,x.jsx)(c.ZQ,{type:"text",value:ct.code,onChange:e=>ut({...ct,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Image (Optional)"}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[ct.image_url&&(0,x.jsx)("div",{style:{width:"80px",height:"80px",borderRadius:"8px",overflow:"hidden",flexShrink:0},children:(0,x.jsx)("img",{src:ct.image_url,alt:"Preview",style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,x.jsx)(c.ZQ,{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{ut({...ct,image_url:e.result})},e.readAsDataURL(n)}},style:{flex:1}}),ct.image_url&&(0,x.jsx)("button",{type:"button",onClick:()=>ut({...ct,image_url:""}),style:{padding:"4px 8px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:"Remove"})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Unit *"}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{type:"text",value:_t?yt:(null===(e=It.find(e=>e.value===ct.stock_unit))||void 0===e?void 0:e.label)||ct.stock_unit,onChange:e=>{vt(e.target.value),ft(!0)},onFocus:()=>{ft(!0),vt("")},onBlur:()=>setTimeout(()=>ft(!1),200),placeholder:"Search unit..."}),_t&&(0,x.jsxs)(Q,{children:[Tt.map(e=>(0,x.jsx)(Z,{selected:ct.stock_unit===e.value,onClick:()=>{ut({...ct,stock_unit:e.value}),ft(!1),vt("")},children:e.label},e.value)),0===Tt.length&&(0,x.jsxs)(Z,{onClick:()=>{ut({...ct,stock_unit:yt}),ft(!1)},children:['Use "',yt,'"']})]})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Category"}),(0,x.jsxs)(o.Jt,{value:ct.category,onChange:e=>ut({...ct,category:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Category"}),mt.length>0?mt.map(e=>(0,x.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,x.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,x.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,x.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,x.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Supplier"}),(0,x.jsxs)(o.Jt,{value:ct.supplier_id,onChange:e=>ut({...ct,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),ht.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Unit Cost"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.unit_cost,onChange:e=>ut({...ct,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Initial Stock"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.current_stock,onChange:e=>ut({...ct,current_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Min Stock"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_stock,onChange:e=>ut({...ct,min_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Min Order"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_order,onChange:e=>ut({...ct,min_order:e.target.value}),placeholder:"0"})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>{dt(!1),ft(!1)},children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(ct.name.trim())try{xt(!0);(await Gt(`/api/restaurants/${Wt}/inventory/general-stock`,{method:"POST",body:JSON.stringify({name:ct.name,code:ct.code||null,image_url:ct.image_url||null,stock_unit:ct.stock_unit,unit_cost:parseFloat(ct.unit_cost)||0,category:ct.category||"Other",current_stock:parseFloat(ct.current_stock)||0,min_stock:parseFloat(ct.min_stock)||0,min_order:parseFloat(ct.min_order)||0,supplier_id:ct.supplier_id?parseInt(ct.supplier_id):null})})).success&&(dt(!1),ut({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),Ht())}catch(e){console.error("Failed to add general stock:",e)}finally{xt(!1)}},disabled:pt||!ct.name.trim(),children:pt?"Adding...":"Add Item"})]})]}),(0,x.jsxs)(c.aF,{isOpen:kt,onClose:()=>{bt(!1),Ct(null)},title:"Edit General Stock",size:"medium",children:[(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Item Name *"}),(0,x.jsx)(c.ZQ,{type:"text",value:ct.name,onChange:e=>ut({...ct,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Code (SKU)"}),(0,x.jsx)(c.ZQ,{type:"text",value:ct.code,onChange:e=>ut({...ct,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Image (Optional)"}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[ct.image_url&&(0,x.jsx)("div",{style:{width:"80px",height:"80px",borderRadius:"8px",overflow:"hidden",flexShrink:0},children:(0,x.jsx)("img",{src:ct.image_url,alt:"Preview",style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,x.jsx)(c.ZQ,{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{ut({...ct,image_url:e.result})},e.readAsDataURL(n)}},style:{flex:1}}),ct.image_url&&(0,x.jsx)("button",{type:"button",onClick:()=>ut({...ct,image_url:""}),style:{padding:"4px 8px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:"Remove"})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Unit *"}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{type:"text",value:_t?yt:(null===(t=It.find(e=>e.value===ct.stock_unit))||void 0===t?void 0:t.label)||ct.stock_unit,onChange:e=>{vt(e.target.value),ft(!0)},onFocus:()=>{ft(!0),vt("")},onBlur:()=>setTimeout(()=>ft(!1),200),placeholder:"Search unit..."}),_t&&(0,x.jsxs)(Q,{children:[Tt.map(e=>(0,x.jsx)(Z,{selected:ct.stock_unit===e.value,onClick:()=>{ut({...ct,stock_unit:e.value}),ft(!1),vt("")},children:e.label},e.value)),0===Tt.length&&(0,x.jsxs)(Z,{onClick:()=>{ut({...ct,stock_unit:yt}),ft(!1)},children:['Use "',yt,'"']})]})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Category"}),(0,x.jsxs)(o.Jt,{value:ct.category,onChange:e=>ut({...ct,category:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Category"}),mt.length>0?mt.map(e=>(0,x.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,x.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,x.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,x.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,x.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Supplier"}),(0,x.jsxs)(o.Jt,{value:ct.supplier_id,onChange:e=>ut({...ct,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),ht.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Unit Cost"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.unit_cost,onChange:e=>ut({...ct,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Current Stock"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.current_stock,onChange:e=>ut({...ct,current_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Min Stock"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_stock,onChange:e=>ut({...ct,min_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Min Order"}),(0,x.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_order,onChange:e=>ut({...ct,min_order:e.target.value}),placeholder:"0"})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>{bt(!1),Ct(null)},children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(ct.name.trim()&&St)try{xt(!0);(await Gt(`/api/restaurants/${Wt}/inventory/general-stock/${St.id}`,{method:"PUT",body:JSON.stringify({name:ct.name,code:ct.code||null,image_url:ct.image_url||null,stock_unit:ct.stock_unit,unit_cost:parseFloat(ct.unit_cost)||0,category:ct.category||"Other",current_stock:parseFloat(ct.current_stock)||0,min_stock:parseFloat(ct.min_stock)||0,min_order:parseFloat(ct.min_order)||0,supplier_id:ct.supplier_id?parseInt(ct.supplier_id):null})})).success&&(bt(!1),Ct(null),ut({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),Ht())}catch(e){console.error("Failed to update general stock:",e)}finally{xt(!1)}},disabled:pt||!ct.name.trim(),children:pt?"Saving...":"Save Changes"})]})]}),(0,x.jsx)(c.aF,{isOpen:wt,onClose:()=>{Ft(!1),At(null)},title:"Unlink from Inventory",size:"small",children:Et&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,x.jsx)("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"ingredient"===Et.type?"\ud83e\udd6c":"\ud83d\udce6"}),(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:Et.name}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===Et.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>{Ft(!1),At(null)},children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===Et.type){(await Gt(`/api/restaurants/${Wt}/inventory/adjust`,{method:"POST",body:JSON.stringify({ingredient_id:Et.id,new_quantity:0,reason:"Unlinked from inventory"})})).success&&se(e=>e.filter(e=>e.id!==Et.id))}else{(await Gt(`/api/restaurants/${Wt}/inventory/general-stock/${Et.id}`,{method:"DELETE"})).success&&je(e=>e.filter(e=>e.id!==Et.id))}Ft(!1),At(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===Et.type?"Unlink":"Delete"})]})]})})]}):(0,x.jsx)(a.A,{children:(0,x.jsx)(l.mc,{children:(0,x.jsx)(l.pp,{children:(0,x.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var i=n(9950),r=n(1367),s=n(6038);const a=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[a,l]=(0,i.useState)(Object.keys(s.DL)),[o,d]=(0,i.useState)(!0),[c,u]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),i=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(i)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),u("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:c}}}}]);