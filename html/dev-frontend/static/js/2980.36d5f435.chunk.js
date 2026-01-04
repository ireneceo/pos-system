"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2980],{2980:(e,t,n)=>{n.r(t),n.d(t,{default:()=>G});var i=n(9950),r=n(4492),s=n(4752),a=n(3310),l=n(7492),o=n(2488),c=n(1367),d=n(9610),u=n(4021),p=n(6038),x=n(5631),h=n(4414);const g=s.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,m=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,j=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,y=s.Ay.div`
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
`,v=s.Ay.div`
  flex: 1;
`,_=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=s.Ay.div`
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
`,S=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,b=s.Ay.div`
  display: flex;
  flex-direction: column;
`,C=s.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,F=s.Ay.span`
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
`,E=s.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #DC2626; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #059669; color: white;"}}}
`,A=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,B=s.Ay.button`
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
`,z=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,R=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,$=(s.Ay.div``,s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`),O=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,I=(0,s.Ay)(l.A0)`
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
`,T=s.Ay.div`
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
`,M=s.Ay.input`
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
`,P=s.Ay.input`
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
`,U=s.Ay.button`
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
`,L=s.Ay.div`
  position: relative;
`,Q=s.Ay.input`
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
`,Z=s.Ay.div`
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
`,q=s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: #F3F4F6;
  }
`,N=s.Ay.button`
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
`,W=s.Ay.button`
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
`,J=e=>{let{restaurantId:t,currency:n}=e;const[r,s]=(0,i.useState)([]),[a,o]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/inventory/transactions?limit=50`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&s(i.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{o(!1)}})()},[t]);const c=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},d=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return a?(0,h.jsx)(l.pp,{children:"Loading transactions..."}):0===r.length?(0,h.jsxs)(l.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,h.jsxs)(l.XI,{children:[(0,h.jsxs)(l.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,h.jsx)("span",{children:"Date"}),(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Type"}),(0,h.jsx)("span",{children:"Change"}),(0,h.jsx)("span",{children:"After"}),(0,h.jsx)("span",{children:"Notes"})]}),r.map(e=>{var t;return(0,h.jsx)(l.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,h.jsxs)(l.Np,{children:[(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Date"}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Ingredient"}),(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Type"}),(0,h.jsx)("span",{style:{color:d(e.transaction_type),fontWeight:600},children:c(e.transaction_type)})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Change"}),(0,h.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"After"}),(0,h.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Notes"}),(0,h.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})},G=()=>{var e,t;const{user:n}=(0,c.As)(),{restaurantId:s}=(0,r.g)(),[G,H]=(0,r.ok)(),{defaultCurrency:X}=(0,u.i1)(),[K,Y]=(0,i.useState)("RM"),V=G.get("tab")||"dashboard",ee=e=>{H({tab:e})},[te,ne]=(0,i.useState)(0),[ie,re]=(0,i.useState)(0),[se,ae]=(0,i.useState)(!0),[le,oe]=(0,i.useState)(null),[ce,de]=(0,i.useState)([]),[ue,pe]=(0,i.useState)([]),[xe,he]=(0,i.useState)([]),[ge,me]=(0,i.useState)([]),[je,ye]=(0,i.useState)(""),[ve,_e]=(0,i.useState)("all"),[ke,fe]=(0,i.useState)([]),[Se,be]=(0,i.useState)(null),[Ce,Fe]=(0,i.useState)(!1),[we,Ee]=(0,i.useState)(""),[Ae,Be]=(0,i.useState)(""),[ze,Re]=(0,i.useState)("all"),[$e,Oe]=(0,i.useState)(!1),[Ie,De]=(0,i.useState)(!1),[Te,Me]=(0,i.useState)(!1),[Pe,Ue]=(0,i.useState)(!1),[Le,Qe]=(0,i.useState)(null),[Ze,qe]=(0,i.useState)(""),[Ne,We]=(0,i.useState)(""),[Je,Ge]=(0,i.useState)(""),[He,Xe]=(0,i.useState)(""),[Ke,Ye]=(0,i.useState)(""),[Ve,et]=(0,i.useState)({}),[tt,nt]=(0,i.useState)(!1),[it,rt]=(0,i.useState)(!1),[st,at]=(0,i.useState)(!1),[lt,ot]=(0,i.useState)(null),[ct,dt]=(0,i.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[ut,pt]=(0,i.useState)(!1),[xt,ht]=(0,i.useState)(!1),[gt,mt]=(0,i.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[jt,yt]=(0,i.useState)(!1),[vt,_t]=(0,i.useState)([]),[kt,ft]=(0,i.useState)([]),[St,bt]=(0,i.useState)(""),[Ct,Ft]=(0,i.useState)(!1),[wt,Et]=(0,i.useState)(!1),[At,Bt]=(0,i.useState)(null),[zt,Rt]=(0,i.useState)(!1),[$t,Ot]=(0,i.useState)(null),[It,Dt]=(0,i.useState)(!1),[Tt,Mt]=(0,i.useState)(null),[Pt,Ut]=(0,i.useState)(""),Lt=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],Qt=Lt.filter(e=>e.label.toLowerCase().includes(St.toLowerCase())||e.value.toLowerCase().includes(St.toLowerCase())),[Zt,qt]=(0,i.useState)(null),[Nt,Wt]=(0,i.useState)(""),[Jt,Gt]=(0,i.useState)("ingredient"),[Ht,Xt]=(0,i.useState)({}),Kt=s?parseInt(s,10):null===n||void 0===n?void 0:n.restaurant_id;(0,i.useEffect)(()=>{X&&Y(X)},[X]);const Yt=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),Vt=(0,i.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Yt();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[Yt]),en=(0,i.useCallback)(async()=>{if(Kt)try{ae(!0);const[e,t,n,i,r]=await Promise.all([Vt(`/api/restaurants/${Kt}/inventory/summary`),Vt(`/api/restaurants/${Kt}/inventory`),Vt(`/api/restaurants/${Kt}/inventory/alerts?resolved=false`),Vt(`/api/restaurants/${Kt}/inventory/reorder-suggestions`),Vt(`/api/restaurants/${Kt}/inventory/expiring?days=14`)]);e.success&&oe(e.data),t.success&&de(t.data),n.success&&pe(n.data),i.success&&he(i.data),r.success&&me(r.data);try{const e=await Vt(`/api/restaurants/${Kt}/inventory/general-stock`);e.success&&fe(e.data||[])}catch{fe([])}try{const e=await Vt(`/api/restaurants/${Kt}/suppliers`);e.success&&_t(e.data||[])}catch{_t([])}try{const e=await Vt(`/api/restaurants/${Kt}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];ft(t)}}catch{ft([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{ae(!1)}},[Kt,Vt]);(0,i.useEffect)(()=>{en()},[en]),(0,i.useEffect)(()=>{if(ce.length>0){const e=ce.some(e=>e.current_stock>0||e.last_stock_take_at);nt(!e)}},[ce]);const tn=(e,t,n)=>{et(i=>({...i,[e]:{...i[e],[t]:n}}))},nn=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},rn=e=>{Qe(e),qe(""),We(""),Ge(""),Xe(""),Ye(""),Oe(!0)},sn=(e,t,n)=>{qt(e),Wt(t.toString()),Gt(n)},an=()=>{qt(null),Wt("")},ln=async e=>{const t=parseFloat(Nt);if(isNaN(t)||t<0)an();else try{const n="ingredient"===Jt?`/api/restaurants/${Kt}/inventory/adjust`:`/api/restaurants/${Kt}/inventory/general-stock/${e}/adjust`,i={new_quantity:t,reason:"Stock adjustment"};"ingredient"===Jt&&(i.ingredient_id=e);(await Vt(n,{method:"POST",body:JSON.stringify(i)})).success&&("ingredient"===Jt?de(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)):fe(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)))}catch(n){console.error("Failed to adjust stock:",n)}finally{an()}},on=(e,t)=>{"Enter"===e.key?ln(t):"Escape"===e.key&&an()},cn=e=>{Mt(e),Ut(e.min_order?String(e.min_order):""),Dt(!0)},dn=ce.filter(e=>{const t=e.name.toLowerCase().includes(je.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}),un=(("all"===ze||"ingredients"===ze)&&dn.map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===ze||"general_stock"===ze)&&ke.filter(e=>{const t=e.name.toLowerCase().includes(je.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}).map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}});return Kt?(0,h.jsxs)(a.A,{children:[(0,h.jsxs)(l.mc,{children:[(0,h.jsx)(l.Y9,{children:(0,h.jsx)(l.hE,{children:"Inventory"})}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(l.j,{children:[(0,h.jsx)(l.oz,{active:"dashboard"===V,onClick:()=>ee("dashboard"),children:"Dashboard"}),(0,h.jsx)(l.oz,{active:"list"===V,onClick:()=>ee("list"),children:"Stock List"}),(0,h.jsx)(l.oz,{active:"history"===V,onClick:()=>ee("history"),children:"History"}),(0,h.jsx)(l.oz,{active:"categories"===V,onClick:()=>ee("categories"),children:"Categories"})]}),se?(0,h.jsx)(l.pp,{children:"Loading..."}):"dashboard"===V?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:(null===le||void 0===le?void 0:le.total_items)||0}),(0,h.jsx)(l.v0,{children:"Total Ingredients"}),(0,h.jsx)(l.d1,{children:"managed items"})]}),(0,h.jsxs)(l.hI,{color:"#D97706",children:[(0,h.jsx)(l.Os,{children:(null===le||void 0===le?void 0:le.low_stock_count)||0}),(0,h.jsx)(l.v0,{children:"Low Stock"}),(0,h.jsx)(l.d1,{children:"need attention"})]}),(0,h.jsxs)(l.hI,{color:"#DC2626",children:[(0,h.jsx)(l.Os,{children:(null===le||void 0===le?void 0:le.out_of_stock_count)||0}),(0,h.jsx)(l.v0,{children:"Out of Stock"}),(0,h.jsx)(l.d1,{children:"urgent"})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:(0,p.vv)((null===le||void 0===le?void 0:le.monthly_loss)||0,K)}),(0,h.jsx)(l.v0,{children:"Monthly Loss"}),(0,h.jsx)(l.d1,{children:"this month"})]}),(0,h.jsxs)(l.hI,{color:"#EA580C",children:[(0,h.jsx)(l.Os,{children:ge.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,h.jsx)(l.v0,{children:"Expiring Soon"}),(0,h.jsx)(l.d1,{children:"within 3 days"})]})]}),ue.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{children:"Stock Alerts"}),(0,h.jsx)("div",{children:ue.slice(0,5).map(e=>(0,h.jsxs)(y,{type:e.alert_type,children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(_,{children:e.ingredient.name}),(0,h.jsxs)(k,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,h.jsxs)(l.wr,{children:[(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>{const t=ce.find(t=>t.id===e.ingredient_id);t&&rn(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>(async e=>{try{(await Vt(`/api/restaurants/${Kt}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&en()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),ge.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{children:"Expiring Items"}),(0,h.jsx)("div",{children:ge.slice(0,5).map(e=>(0,h.jsxs)(w,{urgency:e.urgency,children:[(0,h.jsxs)(v,{children:[(0,h.jsxs)(_,{children:[e.ingredient_name,e.batch_number&&(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,h.jsxs)(k,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,h.jsx)(E,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,h.jsx)(l.$n,{variant:"danger",onClick:()=>{const t=ce.find(t=>t.id===e.ingredient_id);t&&(Qe(t),qe(""),We(""),De(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),xe.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{children:"Reorder Suggestions"}),(0,h.jsx)(g,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,h.jsxs)(l.XI,{children:[(0,h.jsxs)(l.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Daily Usage"}),(0,h.jsx)("span",{children:"Suggested Qty"}),(0,h.jsx)("span",{children:"Est. Cost"}),(0,h.jsx)("span",{children:"Urgency"}),(0,h.jsx)("span",{children:"Order"})]}),xe.slice(0,10).map(e=>(0,h.jsxs)(l.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,h.jsx)("div",{children:e.ingredient.name}),(0,h.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,h.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,h.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,h.jsx)("div",{children:(0,p.vv)(e.estimated_cost,K)}),(0,h.jsx)("div",{children:(0,h.jsx)(F,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)(P,{type:"number",min:"0",step:"1",value:Ht[e.ingredient.id]||e.suggested_qty,onChange:t=>Xt(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,h.jsx)(U,{onClick:()=>{const t=ce.find(t=>t.id===e.ingredient.id);t&&cn({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>{0===ce.length?window.location.href=`/restaurant/${Kt}/recipe-management?tab=ingredients`:ee("list")},children:"+ Receive Stock"}),(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>{0===ce.length?window.location.href=`/restaurant/${Kt}/recipe-management?tab=ingredients`:ee("list")},children:"+ Record Waste"}),(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>ee("history"),children:"View All Transactions"})]})]}):"list"===V?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(o.Qn,{children:[(0,h.jsxs)(o.Jt,{value:ze,onChange:e=>Re(e.target.value),style:{minWidth:"140px"},children:[(0,h.jsx)("option",{value:"all",children:"All Items"}),(0,h.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,h.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,h.jsx)(o.DO,{type:"text",placeholder:"Search...",value:je,onChange:e=>ye(e.target.value)}),(0,h.jsxs)(o.Jt,{value:ve,onChange:e=>_e(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"normal",children:"Normal"}),(0,h.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,h.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>ht(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===ze||"general_stock"===ze)&&ke.length>0&&(0,h.jsxs)(h.Fragment,{children:["all"===ze&&(0,h.jsxs)(m,{children:["General Stock (",ke.filter(e=>{const t=e.name.toLowerCase().includes(je.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}).length,")"]}),(0,h.jsxs)(l.XI,{style:{marginBottom:"24px"},children:[(0,h.jsxs)(I,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,h.jsx)("span",{children:"Item"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Min Stock"}),(0,h.jsx)("span",{children:"Unit Cost"}),(0,h.jsx)("span",{children:"Supplier"}),(0,h.jsx)("span",{children:"Actions"})]}),ke.filter(e=>{const t=e.name.toLowerCase().includes(je.toLowerCase()),n="all"===ve||e.stock_status===ve;return t&&n}).map(e=>(0,h.jsxs)(D,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,h.jsxs)(l.Np,{children:[(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Item"}),(0,h.jsxs)(S,{children:[(0,h.jsx)(f,{children:e.image_url?(0,h.jsx)("img",{src:e.image_url,alt:e.name}):(0,h.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,h.jsxs)(b,{children:[(0,h.jsx)($,{children:e.name}),e.code&&(0,h.jsx)(C,{children:e.code}),(0,h.jsx)(O,{children:e.category})]})]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Status"}),(0,h.jsx)(j,{status:e.stock_status,children:un(e.stock_status)})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Current Stock"}),Zt===e.id&&"general_stock"===Jt?(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,h.jsx)(M,{type:"number",step:"0.01",value:Nt,onChange:e=>Wt(e.target.value),onKeyDown:t=>on(t,e.id),onBlur:()=>ln(e.id),autoFocus:!0}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,h.jsxs)(T,{onClick:()=>sn(e.id,e.current_stock,"general_stock"),children:[(0,h.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Min Stock"}),(0,h.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.stock_unit]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Unit Cost"}),(0,h.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,K)})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Supplier"}),(0,h.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]})]}),(0,h.jsxs)(l.wr,{children:[(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>{be(e),Ee(""),Be(""),Fe(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(U,{onClick:()=>cn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),children:"Order"}),(0,h.jsx)(W,{onClick:()=>{var t;Bt(e),mt({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),Et(!0)},children:"Edit"}),(0,h.jsx)(N,{onClick:()=>{Ot({type:"general_stock",id:e.id,name:e.name}),Rt(!0)},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===ze||"ingredients"===ze)&&(0,h.jsxs)(h.Fragment,{children:["all"===ze&&(0,h.jsxs)(m,{children:["Ingredients (",dn.length,")"]}),0===dn.length?(0,h.jsxs)(l.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===ce.length?"No ingredients found":"No matching ingredients"}),(0,h.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===ce.length?"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===ce.length&&(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>window.location.href=`/restaurant/${Kt}/recipe-management?tab=ingredients`,children:"Go to Ingredients"})]}):(0,h.jsxs)(l.XI,{children:[(0,h.jsxs)(I,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Min / Prediction"}),(0,h.jsx)("span",{children:"Unit Cost"}),(0,h.jsx)("span",{children:"Supplier"}),(0,h.jsx)("span",{children:"Last Stock Take"}),(0,h.jsx)("span",{children:"Actions"})]}),dn.map(e=>{return(0,h.jsxs)(D,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,h.jsxs)(l.Np,{children:[(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Ingredient"}),(0,h.jsxs)(S,{children:[(0,h.jsx)(f,{children:e.image_url?(0,h.jsx)("img",{src:e.image_url,alt:e.name}):(0,h.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,h.jsxs)(b,{children:[(0,h.jsx)($,{children:e.name}),e.code&&(0,h.jsx)(C,{children:e.code}),(0,h.jsxs)(O,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Status"}),(0,h.jsx)(j,{status:e.stock_status,children:un(e.stock_status)})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Current Stock"}),Zt===e.id&&"ingredient"===Jt?(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,h.jsx)(M,{type:"number",step:"0.01",value:Nt,onChange:e=>Wt(e.target.value),onKeyDown:t=>on(t,e.id),onBlur:()=>ln(e.id),autoFocus:!0}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,h.jsxs)(T,{onClick:()=>sn(e.id,e.current_stock,"ingredient"),children:[(0,h.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Min / Prediction"}),(0,h.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",e.min_stock," ",e.unit]}),(0,h.jsx)(A,{level:e.prediction_confidence||"none",children:nn(e.prediction_confidence||"none")})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Unit Cost"}),(0,h.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,K)})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Supplier"}),(0,h.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Last Stock Take"}),(0,h.jsx)("div",{style:{color:"#6B7280"},children:(t=e.last_stock_take_at,t?new Date(t).toLocaleDateString():"-")})]})]}),(0,h.jsxs)(l.wr,{children:[(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>rn(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,h.jsx)(U,{onClick:()=>cn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),children:"Order"}),(0,h.jsx)(B,{onClick:()=>(e=>{var t;ot(e),dt({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),at(!0)})(e),children:"Settings"}),(0,h.jsx)(N,{onClick:()=>{Ot({type:"ingredient",id:e.id,name:e.name}),Rt(!0)},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id);var t})]})]})]}):"categories"===V?(0,h.jsx)(x.A,{brandId:null,restaurantId:Kt?Number(Kt):null,onCountChange:ne,onCategoryChange:()=>re(e=>e+1)}):(0,h.jsx)(J,{restaurantId:Kt,currency:K})]})]}),(0,h.jsx)(d.aF,{isOpen:$e,onClose:()=>Oe(!1),title:"Receive Stock",size:"medium",children:Le&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Ingredient"}),(0,h.jsx)(d.ZQ,{type:"text",value:Le.name,disabled:!0})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Current Stock"}),(0,h.jsx)(d.ZQ,{type:"text",value:`${Le.current_stock} ${Le.unit}`,disabled:!0})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsxs)(d.lR,{children:["Quantity Received (",Le.unit,") *"]}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",value:Ze,onChange:e=>qe(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,h.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,h.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,h.jsx)(d.lR,{children:"Batch/Lot Number"}),(0,h.jsx)(d.ZQ,{type:"text",value:Je,onChange:e=>Ge(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,h.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,h.jsx)(d.lR,{children:"Manufacture Date"}),(0,h.jsx)(d.ZQ,{type:"date",value:He,onChange:e=>Xe(e.target.value)})]})]}),(0,h.jsxs)(d.gE,{style:{marginTop:"12px"},children:[(0,h.jsx)(d.lR,{children:"Expiry Date"}),(0,h.jsx)(d.ZQ,{type:"date",value:Ke,onChange:e=>Ye(e.target.value)}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Notes (Optional)"}),(0,h.jsx)(d.ZQ,{type:"text",value:Ne,onChange:e=>We(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>Oe(!1),children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Le&&Ze)try{(await Vt(`/api/restaurants/${Kt}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:Le.id,quantity:parseFloat(Ze),notes:Ne,batch_number:Je||null,manufacture_date:He||null,expiry_date:Ke||null})})).success&&(Oe(!1),Qe(null),qe(""),We(""),Ge(""),Xe(""),Ye(""),en())}catch(e){console.error("Failed to receive stock:",e)}},children:"Confirm Receive"})]})]})}),(0,h.jsx)(d.aF,{isOpen:Ie,onClose:()=>De(!1),title:"Record Waste",size:"small",children:Le&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Ingredient"}),(0,h.jsx)(d.ZQ,{type:"text",value:Le.name,disabled:!0})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Current Stock"}),(0,h.jsx)(d.ZQ,{type:"text",value:`${Le.current_stock} ${Le.unit}`,disabled:!0})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsxs)(d.lR,{children:["Waste Quantity (",Le.unit,") *"]}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",value:Ze,onChange:e=>qe(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Reason (Optional)"}),(0,h.jsx)(d.ZQ,{type:"text",value:Ne,onChange:e=>We(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>De(!1),children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Le&&Ze)try{(await Vt(`/api/restaurants/${Kt}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:Le.id,quantity:parseFloat(Ze),notes:Ne})})).success&&(De(!1),Qe(null),qe(""),We(""),en())}catch(e){console.error("Failed to record waste:",e)}},children:"Confirm Waste"})]})]})}),(0,h.jsxs)(d.aF,{isOpen:Te,onClose:()=>Me(!1),title:"Set Initial Stock",size:"large",children:[(0,h.jsx)(g,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,h.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(ce.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,h.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,h.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,h.jsxs)(l.XI,{children:[(0,h.jsxs)(l.A0,{columns:"2fr 1fr 1fr",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Current Qty"}),(0,h.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,h.jsxs)(l.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,h.jsx)("div",{children:(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=Ve[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>tn(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,h.jsx)("div",{children:(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=Ve[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>tn(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>Me(!1),children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(Ve).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{rt(!0);(await Vt(`/api/restaurants/${Kt}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success&&(Me(!1),nt(!1),en())}catch(t){console.error("Failed to save initial stock:",t)}finally{rt(!1)}},disabled:it,children:it?"Saving...":"Save Initial Stock"})]})]}),(0,h.jsx)(d.aF,{isOpen:Ce,onClose:()=>Fe(!1),title:`Receive Stock: ${(null===Se||void 0===Se?void 0:Se.name)||""}`,size:"small",children:Se&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Se.current_stock," ",Se.stock_unit]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Quantity to Add *"}),(0,h.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:we,onChange:e=>Ee(e.target.value),placeholder:"Enter quantity"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Notes (Optional)"}),(0,h.jsx)(d.ZQ,{value:Ae,onChange:e=>Be(e.target.value),placeholder:"Enter notes"})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(we&&!(parseFloat(we)<=0))try{(await Vt(`/api/restaurants/${Kt}/inventory/general-stock/${Se.id}/receive`,{method:"POST",body:JSON.stringify({quantity:parseFloat(we),notes:Ae})})).success&&(Fe(!1),en())}catch(e){console.error("Failed to receive general stock:",e)}},disabled:!we||parseFloat(we)<=0,children:"Receive"})]})]})}),(0,h.jsx)(d.aF,{isOpen:It,onClose:()=>Dt(!1),title:`Order: ${(null===Tt||void 0===Tt?void 0:Tt.name)||""}`,size:"small",children:Tt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Tt.current_stock," ",Tt.unit]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,h.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[Tt.min_stock," ",Tt.unit]})]})]}),Tt.min_order&&Tt.min_order>0&&(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",Tt.min_order," ",Tt.unit]}),Tt.supplier_name&&(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Tt.supplier_name]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsxs)(d.lR,{children:["Order Quantity (",Tt.unit,") *"]}),(0,h.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:Pt,onChange:e=>Ut(e.target.value),placeholder:Tt.min_order?`Min: ${Tt.min_order}`:"Enter quantity"})]}),Pt&&parseFloat(Pt)>0&&(0,h.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,p.vv)(parseFloat(Pt)*Tt.unit_cost,K)})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>Dt(!1),children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:()=>{Tt&&Pt&&(alert(`Order sent: ${Pt} ${Tt.unit} of ${Tt.name}`),Dt(!1),Mt(null),Ut(""))},disabled:!Pt||parseFloat(Pt)<=0,children:"Send Order"})]})]})}),(0,h.jsx)(d.aF,{isOpen:st,onClose:()=>at(!1),title:`Settings: ${(null===lt||void 0===lt?void 0:lt.name)||""}`,size:"small",children:lt&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,h.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)(A,{level:lt.prediction_confidence||"none",children:nn(lt.prediction_confidence||"none")}),(0,h.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(lt.avg_daily_usage))||0).toFixed(2)," ",lt.unit,"/day (calculated)"]})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsxs)(d.lR,{children:["Minimum Stock Level (",lt.unit,")"]}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_stock,onChange:e=>dt({...ct,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsxs)(d.lR,{children:["Minimum Order (",lt.unit,")"]}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:ct.min_order,onChange:e=>dt({...ct,min_order:e.target.value}),placeholder:"0"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Lead Time (days)"}),(0,h.jsx)(d.ZQ,{type:"number",min:"1",value:ct.lead_time_days,onChange:e=>dt({...ct,lead_time_days:e.target.value}),placeholder:"1"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Safety Stock (%)"}),(0,h.jsx)(d.ZQ,{type:"number",min:"0",max:"100",value:ct.safety_stock_percent,onChange:e=>dt({...ct,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsxs)(d.lR,{children:["Manual Daily Usage (",lt.unit,"/day)"]}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:ct.manual_daily_usage,onChange:e=>dt({...ct,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>at(!1),children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(lt)try{pt(!0);(await Vt(`/api/restaurants/${Kt}/inventory/${lt.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(ct.lead_time_days)||1,safety_stock_percent:parseFloat(ct.safety_stock_percent)||20,manual_daily_usage:ct.manual_daily_usage?parseFloat(ct.manual_daily_usage):null,min_stock:parseFloat(ct.min_stock)||0,min_order:parseFloat(ct.min_order)||0})})).success&&(at(!1),en())}catch(e){console.error("Failed to save settings:",e)}finally{pt(!1)}},disabled:ut,children:ut?"Saving...":"Save Settings"})]})]})}),(0,h.jsxs)(d.aF,{isOpen:xt,onClose:()=>{ht(!1),Ft(!1)},title:"Add General Stock",size:"medium",children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Item Name *"}),(0,h.jsx)(d.ZQ,{type:"text",value:gt.name,onChange:e=>mt({...gt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Code (SKU)"}),(0,h.jsx)(d.ZQ,{type:"text",value:gt.code,onChange:e=>mt({...gt,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Image (Optional)"}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[gt.image_url&&(0,h.jsx)("div",{style:{width:"80px",height:"80px",borderRadius:"8px",overflow:"hidden",flexShrink:0},children:(0,h.jsx)("img",{src:gt.image_url,alt:"Preview",style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,h.jsx)(d.ZQ,{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{mt({...gt,image_url:e.result})},e.readAsDataURL(n)}},style:{flex:1}}),gt.image_url&&(0,h.jsx)("button",{type:"button",onClick:()=>mt({...gt,image_url:""}),style:{padding:"4px 8px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:"Remove"})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Unit *"}),(0,h.jsxs)(L,{children:[(0,h.jsx)(Q,{type:"text",value:Ct?St:(null===(e=Lt.find(e=>e.value===gt.stock_unit))||void 0===e?void 0:e.label)||gt.stock_unit,onChange:e=>{bt(e.target.value),Ft(!0)},onFocus:()=>{Ft(!0),bt("")},onBlur:()=>setTimeout(()=>Ft(!1),200),placeholder:"Search unit..."}),Ct&&(0,h.jsxs)(Z,{children:[Qt.map(e=>(0,h.jsx)(q,{selected:gt.stock_unit===e.value,onClick:()=>{mt({...gt,stock_unit:e.value}),Ft(!1),bt("")},children:e.label},e.value)),0===Qt.length&&(0,h.jsxs)(q,{onClick:()=>{mt({...gt,stock_unit:St}),Ft(!1)},children:['Use "',St,'"']})]})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Category"}),(0,h.jsxs)(o.Jt,{value:gt.category,onChange:e=>mt({...gt,category:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),kt.length>0?kt.map(e=>(0,h.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,h.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,h.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,h.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,h.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Supplier"}),(0,h.jsxs)(o.Jt,{value:gt.supplier_id,onChange:e=>mt({...gt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),vt.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Unit Cost"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.unit_cost,onChange:e=>mt({...gt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Initial Stock"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.current_stock,onChange:e=>mt({...gt,current_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Min Stock"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_stock,onChange:e=>mt({...gt,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Min Order"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_order,onChange:e=>mt({...gt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>{ht(!1),Ft(!1)},children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(gt.name.trim())try{yt(!0);(await Vt(`/api/restaurants/${Kt}/inventory/general-stock`,{method:"POST",body:JSON.stringify({name:gt.name,code:gt.code||null,image_url:gt.image_url||null,stock_unit:gt.stock_unit,unit_cost:parseFloat(gt.unit_cost)||0,category:gt.category||"Other",current_stock:parseFloat(gt.current_stock)||0,min_stock:parseFloat(gt.min_stock)||0,min_order:parseFloat(gt.min_order)||0,supplier_id:gt.supplier_id?parseInt(gt.supplier_id):null})})).success&&(ht(!1),mt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),en())}catch(e){console.error("Failed to add general stock:",e)}finally{yt(!1)}},disabled:jt||!gt.name.trim(),children:jt?"Adding...":"Add Item"})]})]}),(0,h.jsxs)(d.aF,{isOpen:wt,onClose:()=>{Et(!1),Bt(null)},title:"Edit General Stock",size:"medium",children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Item Name *"}),(0,h.jsx)(d.ZQ,{type:"text",value:gt.name,onChange:e=>mt({...gt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Code (SKU)"}),(0,h.jsx)(d.ZQ,{type:"text",value:gt.code,onChange:e=>mt({...gt,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Image (Optional)"}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[gt.image_url&&(0,h.jsx)("div",{style:{width:"80px",height:"80px",borderRadius:"8px",overflow:"hidden",flexShrink:0},children:(0,h.jsx)("img",{src:gt.image_url,alt:"Preview",style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,h.jsx)(d.ZQ,{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{mt({...gt,image_url:e.result})},e.readAsDataURL(n)}},style:{flex:1}}),gt.image_url&&(0,h.jsx)("button",{type:"button",onClick:()=>mt({...gt,image_url:""}),style:{padding:"4px 8px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:"Remove"})]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Unit *"}),(0,h.jsxs)(L,{children:[(0,h.jsx)(Q,{type:"text",value:Ct?St:(null===(t=Lt.find(e=>e.value===gt.stock_unit))||void 0===t?void 0:t.label)||gt.stock_unit,onChange:e=>{bt(e.target.value),Ft(!0)},onFocus:()=>{Ft(!0),bt("")},onBlur:()=>setTimeout(()=>Ft(!1),200),placeholder:"Search unit..."}),Ct&&(0,h.jsxs)(Z,{children:[Qt.map(e=>(0,h.jsx)(q,{selected:gt.stock_unit===e.value,onClick:()=>{mt({...gt,stock_unit:e.value}),Ft(!1),bt("")},children:e.label},e.value)),0===Qt.length&&(0,h.jsxs)(q,{onClick:()=>{mt({...gt,stock_unit:St}),Ft(!1)},children:['Use "',St,'"']})]})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Category"}),(0,h.jsxs)(o.Jt,{value:gt.category,onChange:e=>mt({...gt,category:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),kt.length>0?kt.map(e=>(0,h.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,h.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,h.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,h.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,h.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Supplier"}),(0,h.jsxs)(o.Jt,{value:gt.supplier_id,onChange:e=>mt({...gt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,h.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),vt.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Unit Cost"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.unit_cost,onChange:e=>mt({...gt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Current Stock"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.current_stock,onChange:e=>mt({...gt,current_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Min Stock"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_stock,onChange:e=>mt({...gt,min_stock:e.target.value}),placeholder:"0"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Min Order"}),(0,h.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:gt.min_order,onChange:e=>mt({...gt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>{Et(!1),Bt(null)},children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(gt.name.trim()&&At)try{yt(!0);(await Vt(`/api/restaurants/${Kt}/inventory/general-stock/${At.id}`,{method:"PUT",body:JSON.stringify({name:gt.name,code:gt.code||null,image_url:gt.image_url||null,stock_unit:gt.stock_unit,unit_cost:parseFloat(gt.unit_cost)||0,category:gt.category||"Other",current_stock:parseFloat(gt.current_stock)||0,min_stock:parseFloat(gt.min_stock)||0,min_order:parseFloat(gt.min_order)||0,supplier_id:gt.supplier_id?parseInt(gt.supplier_id):null})})).success&&(Et(!1),Bt(null),mt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),en())}catch(e){console.error("Failed to update general stock:",e)}finally{yt(!1)}},disabled:jt||!gt.name.trim(),children:jt?"Saving...":"Save Changes"})]})]}),(0,h.jsx)(d.aF,{isOpen:zt,onClose:()=>{Rt(!1),Ot(null)},title:"Unlink from Inventory",size:"small",children:$t&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,h.jsx)("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"ingredient"===$t.type?"\ud83e\udd6c":"\ud83d\udce6"}),(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:$t.name}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===$t.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>{Rt(!1),Ot(null)},children:"Cancel"}),(0,h.jsx)(d.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===$t.type){(await Vt(`/api/restaurants/${Kt}/inventory/adjust`,{method:"POST",body:JSON.stringify({ingredient_id:$t.id,new_quantity:0,reason:"Unlinked from inventory"})})).success&&de(e=>e.filter(e=>e.id!==$t.id))}else{(await Vt(`/api/restaurants/${Kt}/inventory/general-stock/${$t.id}`,{method:"DELETE"})).success&&fe(e=>e.filter(e=>e.id!==$t.id))}Rt(!1),Ot(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===$t.type?"Unlink":"Delete"})]})]})})]}):(0,h.jsx)(a.A,{children:(0,h.jsx)(l.mc,{children:(0,h.jsx)(l.pp,{children:(0,h.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}}}]);