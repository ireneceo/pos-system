"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2980],{2980:(e,t,n)=>{n.r(t),n.d(t,{default:()=>H});var i=n(9950),r=n(4492),s=n(4752),a=n(3310),l=n(7492),o=n(2488),c=n(1367),d=n(9610),u=n(4021),p=n(6038),x=n(5631),h=n(4669),g=n(4414);const m=s.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,j=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,y=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,v=s.Ay.div`
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
`,_=s.Ay.div`
  flex: 1;
`,f=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,b=s.Ay.div`
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
`,C=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,S=s.Ay.div`
  display: flex;
  flex-direction: column;
`,F=s.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`,w=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,A=s.Ay.div`
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
`,B=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,z=s.Ay.button`
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
`,$=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,D=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,I=(s.Ay.div``,s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`),R=s.Ay.div`
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
`,T=(0,s.Ay)(l.Hj)`
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
`,P=s.Ay.div`
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
`,U=s.Ay.input`
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
`,L=s.Ay.button`
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
`,Q=s.Ay.div`
  position: relative;
  z-index: 10;
`,Z=s.Ay.input`
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
`,q=s.Ay.div`
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
  z-index: 1000;
  margin-top: 4px;
`,N=s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: #F3F4F6;
  }
`,W=s.Ay.button`
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
`,J=s.Ay.button`
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
`,G=e=>{let{restaurantId:t,currency:n}=e;const[r,s]=(0,i.useState)([]),[a,o]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/inventory/transactions?limit=50`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&s(i.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{o(!1)}})()},[t]);const c=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},d=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return a?(0,g.jsx)(l.pp,{children:"Loading transactions..."}):0===r.length?(0,g.jsxs)(l.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,g.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,g.jsxs)(l.XI,{children:[(0,g.jsxs)(l.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,g.jsx)("span",{children:"Date"}),(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Type"}),(0,g.jsx)("span",{children:"Change"}),(0,g.jsx)("span",{children:"After"}),(0,g.jsx)("span",{children:"Notes"})]}),r.map(e=>{var t;return(0,g.jsx)(l.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,g.jsxs)(l.Np,{children:[(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Date"}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Ingredient"}),(0,g.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Type"}),(0,g.jsx)("span",{style:{color:d(e.transaction_type),fontWeight:600},children:c(e.transaction_type)})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Change"}),(0,g.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"After"}),(0,g.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Notes"}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})},H=()=>{var e,t;const{user:n}=(0,c.As)(),{restaurantId:s}=(0,r.g)(),[H,X]=(0,r.ok)(),{defaultCurrency:K}=(0,u.i1)(),[Y,V]=(0,i.useState)("RM"),ee=H.get("tab")||"dashboard",te=e=>{X({tab:e})},[ne,ie]=(0,i.useState)(0),[re,se]=(0,i.useState)(0),[ae,le]=(0,i.useState)(!0),[oe,ce]=(0,i.useState)(null),[de,ue]=(0,i.useState)([]),[pe,xe]=(0,i.useState)([]),[he,ge]=(0,i.useState)([]),[me,je]=(0,i.useState)([]),[ye,ve]=(0,i.useState)(""),[_e,fe]=(0,i.useState)("all"),[ke,be]=(0,i.useState)([]),[Ce,Se]=(0,i.useState)(null),[Fe,we]=(0,i.useState)(!1),[Ae,Ee]=(0,i.useState)(""),[Be,ze]=(0,i.useState)(""),[$e,De]=(0,i.useState)("all"),[Ie,Re]=(0,i.useState)(!1),[Oe,Te]=(0,i.useState)(!1),[Pe,Me]=(0,i.useState)(!1),[Ue,Le]=(0,i.useState)(!1),[Qe,Ze]=(0,i.useState)(null),[qe,Ne]=(0,i.useState)(""),[We,Je]=(0,i.useState)(""),[Ge,He]=(0,i.useState)(""),[Xe,Ke]=(0,i.useState)(""),[Ye,Ve]=(0,i.useState)(""),[et,tt]=(0,i.useState)({}),[nt,it]=(0,i.useState)(!1),[rt,st]=(0,i.useState)(!1),[at,lt]=(0,i.useState)(!1),[ot,ct]=(0,i.useState)(null),[dt,ut]=(0,i.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[pt,xt]=(0,i.useState)(!1),[ht,gt]=(0,i.useState)(!1),[mt,jt]=(0,i.useState)({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[yt,vt]=(0,i.useState)(!1),[_t,ft]=(0,i.useState)([]),[kt,bt]=(0,i.useState)([]),[Ct,St]=(0,i.useState)(""),[Ft,wt]=(0,i.useState)(!1),[At,Et]=(0,i.useState)(!1),[Bt,zt]=(0,i.useState)(null),[$t,Dt]=(0,i.useState)(!1),[It,Rt]=(0,i.useState)(null),[Ot,Tt]=(0,i.useState)(!1),[Pt,Mt]=(0,i.useState)(null),[Ut,Lt]=(0,i.useState)(""),Qt=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],Zt=Qt.filter(e=>e.label.toLowerCase().includes(Ct.toLowerCase())||e.value.toLowerCase().includes(Ct.toLowerCase())),[qt,Nt]=(0,i.useState)(null),[Wt,Jt]=(0,i.useState)(""),[Gt,Ht]=(0,i.useState)("ingredient"),[Xt,Kt]=(0,i.useState)({}),Yt=s?parseInt(s,10):null===n||void 0===n?void 0:n.restaurant_id;(0,i.useEffect)(()=>{K&&V(K)},[K]);const Vt=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),en=(0,i.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Vt();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[Vt]),tn=(0,i.useCallback)(async()=>{if(Yt)try{le(!0);const[e,t,n,i,r]=await Promise.all([en(`/api/restaurants/${Yt}/inventory/summary`),en(`/api/restaurants/${Yt}/inventory`),en(`/api/restaurants/${Yt}/inventory/alerts?resolved=false`),en(`/api/restaurants/${Yt}/inventory/reorder-suggestions`),en(`/api/restaurants/${Yt}/inventory/expiring?days=14`)]);e.success&&ce(e.data),t.success&&ue(t.data),n.success&&xe(n.data),i.success&&ge(i.data),r.success&&je(r.data);try{const e=await en(`/api/restaurants/${Yt}/inventory/general-stock`);e.success&&be(e.data||[])}catch{be([])}try{const e=await en(`/api/restaurants/${Yt}/suppliers`);e.success&&ft(e.data||[])}catch{ft([])}try{const e=await en(`/api/restaurants/${Yt}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];bt(t)}}catch{bt([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{le(!1)}},[Yt,en]);(0,i.useEffect)(()=>{tn()},[tn]),(0,i.useEffect)(()=>{if(de.length>0){const e=de.some(e=>e.current_stock>0||e.last_stock_take_at);it(!e)}},[de]);const nn=(e,t,n)=>{tt(i=>({...i,[e]:{...i[e],[t]:n}}))},rn=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},sn=e=>{Ze(e),Ne(""),Je(""),He(""),Ke(""),Ve(""),Re(!0)},an=(e,t,n)=>{Nt(e),Jt(t.toString()),Ht(n)},ln=()=>{Nt(null),Jt("")},on=async e=>{const t=parseFloat(Wt);if(isNaN(t)||t<0)ln();else try{const n="ingredient"===Gt?`/api/restaurants/${Yt}/inventory/adjust`:`/api/restaurants/${Yt}/inventory/general-stock/${e}/adjust`,i={new_quantity:t,reason:"Stock adjustment"};"ingredient"===Gt&&(i.ingredient_id=e);(await en(n,{method:"POST",body:JSON.stringify(i)})).success&&("ingredient"===Gt?ue(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)):be(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)))}catch(n){console.error("Failed to adjust stock:",n)}finally{ln()}},cn=(e,t)=>{"Enter"===e.key?on(t):"Escape"===e.key&&ln()},dn=e=>{Mt(e),Lt(e.min_order?String(e.min_order):""),Tt(!0)},un=de.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===_e||e.stock_status===_e;return t&&n}),pn=(("all"===$e||"ingredients"===$e)&&un.map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===$e||"general_stock"===$e)&&ke.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===_e||e.stock_status===_e;return t&&n}).map(e=>({id:e.id,name:e.name,code:e.code||null,image_url:e.image_url||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}});return Yt?(0,g.jsxs)(a.A,{children:[(0,g.jsxs)(l.mc,{children:[(0,g.jsx)(l.Y9,{children:(0,g.jsx)(l.hE,{children:"Inventory"})}),(0,g.jsxs)(l.UC,{children:[(0,g.jsxs)(l.j,{children:[(0,g.jsx)(l.oz,{active:"dashboard"===ee,onClick:()=>te("dashboard"),children:"Dashboard"}),(0,g.jsx)(l.oz,{active:"list"===ee,onClick:()=>te("list"),children:"Stock List"}),(0,g.jsx)(l.oz,{active:"history"===ee,onClick:()=>te("history"),children:"History"}),(0,g.jsx)(l.oz,{active:"categories"===ee,onClick:()=>te("categories"),children:"Categories"})]}),ae?(0,g.jsx)(l.pp,{children:"Loading..."}):"dashboard"===ee?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(l.MD,{children:[(0,g.jsxs)(l.hI,{color:"#059669",children:[(0,g.jsx)(l.Os,{children:(null===oe||void 0===oe?void 0:oe.total_items)||0}),(0,g.jsx)(l.v0,{children:"Total Ingredients"}),(0,g.jsx)(l.d1,{children:"managed items"})]}),(0,g.jsxs)(l.hI,{color:"#D97706",children:[(0,g.jsx)(l.Os,{children:(null===oe||void 0===oe?void 0:oe.low_stock_count)||0}),(0,g.jsx)(l.v0,{children:"Low Stock"}),(0,g.jsx)(l.d1,{children:"need attention"})]}),(0,g.jsxs)(l.hI,{color:"#DC2626",children:[(0,g.jsx)(l.Os,{children:(null===oe||void 0===oe?void 0:oe.out_of_stock_count)||0}),(0,g.jsx)(l.v0,{children:"Out of Stock"}),(0,g.jsx)(l.d1,{children:"urgent"})]}),(0,g.jsxs)(l.hI,{color:"#7C3AED",children:[(0,g.jsx)(l.Os,{children:(0,p.vv)((null===oe||void 0===oe?void 0:oe.monthly_loss)||0,Y)}),(0,g.jsx)(l.v0,{children:"Monthly Loss"}),(0,g.jsx)(l.d1,{children:"this month"})]}),(0,g.jsxs)(l.hI,{color:"#EA580C",children:[(0,g.jsx)(l.Os,{children:me.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,g.jsx)(l.v0,{children:"Expiring Soon"}),(0,g.jsx)(l.d1,{children:"within 3 days"})]})]}),pe.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(j,{children:"Stock Alerts"}),(0,g.jsx)("div",{children:pe.slice(0,5).map(e=>(0,g.jsxs)(v,{type:e.alert_type,children:[(0,g.jsxs)(_,{children:[(0,g.jsx)(f,{children:e.ingredient.name}),(0,g.jsxs)(k,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,g.jsxs)(l.wr,{children:[(0,g.jsx)(l.$n,{variant:"primary",onClick:()=>{const t=de.find(t=>t.id===e.ingredient_id);t&&sn(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(l.$n,{variant:"secondary",onClick:()=>(async e=>{try{(await en(`/api/restaurants/${Yt}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&tn()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),me.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(j,{children:"Expiring Items"}),(0,g.jsx)("div",{children:me.slice(0,5).map(e=>(0,g.jsxs)(A,{urgency:e.urgency,children:[(0,g.jsxs)(_,{children:[(0,g.jsxs)(f,{children:[e.ingredient_name,e.batch_number&&(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,g.jsxs)(k,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,g.jsx)(E,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,g.jsx)(l.$n,{variant:"danger",onClick:()=>{const t=de.find(t=>t.id===e.ingredient_id);t&&(Ze(t),Ne(""),Je(""),Te(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),he.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(j,{children:"Reorder Suggestions"}),(0,g.jsx)(m,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,g.jsxs)(l.XI,{children:[(0,g.jsxs)(l.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Daily Usage"}),(0,g.jsx)("span",{children:"Suggested Qty"}),(0,g.jsx)("span",{children:"Est. Cost"}),(0,g.jsx)("span",{children:"Urgency"}),(0,g.jsx)("span",{children:"Order"})]}),he.slice(0,10).map(e=>(0,g.jsxs)(l.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,g.jsx)("div",{children:e.ingredient.name}),(0,g.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,g.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,g.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,g.jsx)("div",{children:(0,p.vv)(e.estimated_cost,Y)}),(0,g.jsx)("div",{children:(0,g.jsx)(w,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(U,{type:"number",min:"0",step:"1",value:Xt[e.ingredient.id]||e.suggested_qty,onChange:t=>Kt(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,g.jsx)(L,{onClick:()=>{const t=de.find(t=>t.id===e.ingredient.id);t&&dn({id:t.id,name:t.name,code:t.code,image_url:t.image_url,category:t.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:t.min_order||0,unit:t.unit,unit_cost:t.unit_cost,supplier_name:t.supplier_name,stock_status:t.stock_status,last_stock_take_at:t.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:t.prediction_confidence})},children:"Order"})]})]},e.ingredient.id))]})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(l.$n,{variant:"primary",onClick:()=>{0===de.length?window.location.href=`/restaurant/${Yt}/recipe-management?tab=ingredients`:te("list")},children:"+ Receive Stock"}),(0,g.jsx)(l.$n,{variant:"secondary",onClick:()=>{0===de.length?window.location.href=`/restaurant/${Yt}/recipe-management?tab=ingredients`:te("list")},children:"+ Record Waste"}),(0,g.jsx)(l.$n,{variant:"secondary",onClick:()=>te("history"),children:"View All Transactions"})]})]}):"list"===ee?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(o.Qn,{children:[(0,g.jsxs)(o.Jt,{value:$e,onChange:e=>De(e.target.value),style:{minWidth:"140px"},children:[(0,g.jsx)("option",{value:"all",children:"All Items"}),(0,g.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,g.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,g.jsx)(o.DO,{type:"text",placeholder:"Search...",value:ye,onChange:e=>ve(e.target.value)}),(0,g.jsxs)(o.Jt,{value:_e,onChange:e=>fe(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,g.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,g.jsx)(l.$n,{variant:"primary",onClick:()=>gt(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===$e||"general_stock"===$e)&&ke.length>0&&(0,g.jsxs)(g.Fragment,{children:["all"===$e&&(0,g.jsxs)(j,{children:["General Stock (",ke.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===_e||e.stock_status===_e;return t&&n}).length,")"]}),(0,g.jsxs)(l.XI,{style:{marginBottom:"24px"},children:[(0,g.jsxs)(O,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsx)("span",{children:"Item"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Min Stock"}),(0,g.jsx)("span",{children:"Unit Cost"}),(0,g.jsx)("span",{children:"Supplier"}),(0,g.jsx)("span",{children:"Order"}),(0,g.jsx)("span",{children:"Actions"})]}),ke.filter(e=>{const t=e.name.toLowerCase().includes(ye.toLowerCase()),n="all"===_e||e.stock_status===_e;return t&&n}).map(e=>(0,g.jsxs)(T,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsxs)(l.Np,{children:[(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Item"}),(0,g.jsxs)(C,{children:[(0,g.jsx)(b,{children:e.image_url?(0,g.jsx)("img",{src:e.image_url,alt:e.name}):(0,g.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83d\udce6"})}),(0,g.jsxs)(S,{children:[(0,g.jsx)(I,{children:e.name}),e.code&&(0,g.jsx)(F,{children:e.code}),(0,g.jsx)(R,{children:e.category})]})]})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Status"}),(0,g.jsx)(y,{status:e.stock_status,children:pn(e.stock_status)})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Current Stock"}),qt===e.id&&"general_stock"===Gt?(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,g.jsx)(M,{type:"number",step:"0.01",value:Wt,onChange:e=>Jt(e.target.value),onKeyDown:t=>cn(t,e.id),onBlur:()=>on(e.id),autoFocus:!0}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,g.jsxs)(P,{onClick:()=>an(e.id,e.current_stock,"general_stock"),children:[(0,g.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Min Stock"}),(0,g.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.stock_unit]})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Unit Cost"}),(0,g.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,Y)})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Supplier"}),(0,g.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(U,{type:"number",min:"0",step:"1",value:Xt[`gs_${e.id}`]||"",onChange:t=>Kt(n=>({...n,[`gs_${e.id}`]:t.target.value})),placeholder:String(e.min_order||1)}),(0,g.jsx)(L,{onClick:()=>{const t=Xt[`gs_${e.id}`]||String(e.min_order||1);t&&parseFloat(t)>0&&(dn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"}),Lt(t))},children:"Order"})]}),(0,g.jsxs)(l.wr,{children:[(0,g.jsx)(l.$n,{variant:"primary",onClick:()=>{Se(e),Ee(""),ze(""),we(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(J,{onClick:()=>{var t;zt(e),jt({name:e.name,code:e.code||"",image_url:e.image_url||"",stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),Et(!0)},children:"Edit"}),(0,g.jsx)(W,{onClick:()=>{Rt({type:"general_stock",id:e.id,name:e.name}),Dt(!0)},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===$e||"ingredients"===$e)&&(0,g.jsxs)(g.Fragment,{children:["all"===$e&&(0,g.jsxs)(j,{children:["Ingredients (",un.length,")"]}),0===un.length?(0,g.jsxs)(l.pp,{children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===de.length?"No ingredients found":"No matching ingredients"}),(0,g.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===de.length?"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===de.length&&(0,g.jsx)(l.$n,{variant:"primary",onClick:()=>window.location.href=`/restaurant/${Yt}/recipe-management?tab=ingredients`,children:"Go to Ingredients"})]}):(0,g.jsxs)(l.XI,{children:[(0,g.jsxs)(O,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Status"}),(0,g.jsx)("span",{children:"Current Stock"}),(0,g.jsx)("span",{children:"Min / Prediction"}),(0,g.jsx)("span",{children:"Unit Cost"}),(0,g.jsx)("span",{children:"Supplier"}),(0,g.jsx)("span",{children:"Last Stock Take"}),(0,g.jsx)("span",{children:"Order"}),(0,g.jsx)("span",{children:"Actions"})]}),un.map(e=>{return(0,g.jsxs)(T,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 150px 120px",children:[(0,g.jsxs)(l.Np,{children:[(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Ingredient"}),(0,g.jsxs)(C,{children:[(0,g.jsx)(b,{children:e.image_url?(0,g.jsx)("img",{src:e.image_url,alt:e.name}):(0,g.jsx)("span",{style:{fontSize:"16px",color:"#9CA3AF"},children:"\ud83e\udd57"})}),(0,g.jsxs)(S,{children:[(0,g.jsx)(I,{children:e.name}),e.code&&(0,g.jsx)(F,{children:e.code}),(0,g.jsxs)(R,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Status"}),(0,g.jsx)(y,{status:e.stock_status,children:pn(e.stock_status)})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Current Stock"}),qt===e.id&&"ingredient"===Gt?(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,g.jsx)(M,{type:"number",step:"0.01",value:Wt,onChange:e=>Jt(e.target.value),onKeyDown:t=>cn(t,e.id),onBlur:()=>on(e.id),autoFocus:!0}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,g.jsxs)(P,{onClick:()=>an(e.id,e.current_stock,"ingredient"),children:[(0,g.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,g.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Min / Prediction"}),(0,g.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",e.min_stock," ",e.unit]}),(0,g.jsx)(B,{level:e.prediction_confidence||"none",children:rn(e.prediction_confidence||"none")})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Unit Cost"}),(0,g.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,Y)})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Supplier"}),(0,g.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,g.jsxs)(l.Uj,{children:[(0,g.jsx)(l.PM,{children:"Last Stock Take"}),(0,g.jsx)("div",{style:{color:"#6B7280"},children:(t=e.last_stock_take_at,t?new Date(t).toLocaleDateString():"-")})]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,g.jsx)(U,{type:"number",min:"0",step:"1",value:Xt[e.id]||"",onChange:t=>Kt(n=>({...n,[e.id]:t.target.value})),placeholder:String(e.min_order||1)}),(0,g.jsx)(L,{onClick:()=>{const t=Xt[e.id]||String(e.min_order||1);t&&parseFloat(t)>0&&(dn({id:e.id,name:e.name,code:e.code,image_url:e.image_url,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,min_order:e.min_order||0,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:e.avg_daily_usage,prediction_confidence:e.prediction_confidence}),Lt(t))},children:"Order"})]}),(0,g.jsxs)(l.wr,{children:[(0,g.jsx)(l.$n,{variant:"primary",onClick:()=>sn(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,g.jsx)(z,{onClick:()=>(e=>{var t;ct(e),ut({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),lt(!0)})(e),children:"Settings"}),(0,g.jsx)(W,{onClick:()=>{Rt({type:"ingredient",id:e.id,name:e.name}),Dt(!0)},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id);var t})]})]})]}):"categories"===ee?(0,g.jsx)(x.A,{brandId:null,restaurantId:Yt?Number(Yt):null,onCountChange:ie,onCategoryChange:()=>se(e=>e+1)}):(0,g.jsx)(G,{restaurantId:Yt,currency:Y})]})]}),(0,g.jsx)(d.aF,{isOpen:Ie,onClose:()=>Re(!1),title:"Receive Stock",size:"medium",children:Qe&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Ingredient"}),(0,g.jsx)(d.ZQ,{type:"text",value:Qe.name,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Current Stock"}),(0,g.jsx)(d.ZQ,{type:"text",value:`${Qe.current_stock} ${Qe.unit}`,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Quantity Received (",Qe.unit,") *"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",value:qe,onChange:e=>Ne(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,g.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,g.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,g.jsx)(d.lR,{children:"Batch/Lot Number"}),(0,g.jsx)(d.ZQ,{type:"text",value:Ge,onChange:e=>He(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,g.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,g.jsx)(d.lR,{children:"Manufacture Date"}),(0,g.jsx)(d.ZQ,{type:"date",value:Xe,onChange:e=>Ke(e.target.value)})]})]}),(0,g.jsxs)(d.gE,{style:{marginTop:"12px"},children:[(0,g.jsx)(d.lR,{children:"Expiry Date"}),(0,g.jsx)(d.ZQ,{type:"date",value:Ye,onChange:e=>Ve(e.target.value)}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Notes (Optional)"}),(0,g.jsx)(d.ZQ,{type:"text",value:We,onChange:e=>Je(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Re(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Qe&&qe)try{(await en(`/api/restaurants/${Yt}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:Qe.id,quantity:parseFloat(qe),notes:We,batch_number:Ge||null,manufacture_date:Xe||null,expiry_date:Ye||null})})).success&&(Re(!1),Ze(null),Ne(""),Je(""),He(""),Ke(""),Ve(""),tn())}catch(e){console.error("Failed to receive stock:",e)}},children:"Confirm Receive"})]})]})}),(0,g.jsx)(d.aF,{isOpen:Oe,onClose:()=>Te(!1),title:"Record Waste",size:"small",children:Qe&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Ingredient"}),(0,g.jsx)(d.ZQ,{type:"text",value:Qe.name,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Current Stock"}),(0,g.jsx)(d.ZQ,{type:"text",value:`${Qe.current_stock} ${Qe.unit}`,disabled:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Waste Quantity (",Qe.unit,") *"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",value:qe,onChange:e=>Ne(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Reason (Optional)"}),(0,g.jsx)(d.ZQ,{type:"text",value:We,onChange:e=>Je(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Te(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Qe&&qe)try{(await en(`/api/restaurants/${Yt}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:Qe.id,quantity:parseFloat(qe),notes:We})})).success&&(Te(!1),Ze(null),Ne(""),Je(""),tn())}catch(e){console.error("Failed to record waste:",e)}},children:"Confirm Waste"})]})]})}),(0,g.jsxs)(d.aF,{isOpen:Pe,onClose:()=>Me(!1),title:"Set Initial Stock",size:"large",children:[(0,g.jsx)(m,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,g.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(de.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,g.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,g.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,g.jsxs)(l.XI,{children:[(0,g.jsxs)(l.A0,{columns:"2fr 1fr 1fr",children:[(0,g.jsx)("span",{children:"Ingredient"}),(0,g.jsx)("span",{children:"Current Qty"}),(0,g.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,g.jsxs)(l.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,g.jsx)("div",{children:(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=et[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>nn(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,g.jsx)("div",{children:(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=et[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>nn(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Me(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(et).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{st(!0);(await en(`/api/restaurants/${Yt}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success&&(Me(!1),it(!1),tn())}catch(t){console.error("Failed to save initial stock:",t)}finally{st(!1)}},disabled:rt,children:rt?"Saving...":"Save Initial Stock"})]})]}),(0,g.jsx)(d.aF,{isOpen:Fe,onClose:()=>we(!1),title:`Receive Stock: ${(null===Ce||void 0===Ce?void 0:Ce.name)||""}`,size:"small",children:Ce&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Ce.current_stock," ",Ce.stock_unit]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Quantity to Add *"}),(0,g.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:Ae,onChange:e=>Ee(e.target.value),placeholder:"Enter quantity"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Notes (Optional)"}),(0,g.jsx)(d.ZQ,{value:Be,onChange:e=>ze(e.target.value),placeholder:"Enter notes"})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Ae&&!(parseFloat(Ae)<=0))try{(await en(`/api/restaurants/${Yt}/inventory/general-stock/${Ce.id}/receive`,{method:"POST",body:JSON.stringify({quantity:parseFloat(Ae),notes:Be})})).success&&(we(!1),tn())}catch(e){console.error("Failed to receive general stock:",e)}},disabled:!Ae||parseFloat(Ae)<=0,children:"Receive"})]})]})}),(0,g.jsx)(d.aF,{isOpen:Ot,onClose:()=>Tt(!1),title:`Order: ${(null===Pt||void 0===Pt?void 0:Pt.name)||""}`,size:"small",children:Pt&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[Pt.current_stock," ",Pt.unit]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Min Stock"}),(0,g.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#6B7280"},children:[Pt.min_stock," ",Pt.unit]})]})]}),Pt.min_order&&Pt.min_order>0&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#16A34A",marginTop:"8px"},children:["Minimum order quantity: ",Pt.min_order," ",Pt.unit]}),Pt.supplier_name&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Supplier: ",Pt.supplier_name]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Order Quantity (",Pt.unit,") *"]}),(0,g.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:Ut,onChange:e=>Lt(e.target.value),placeholder:Pt.min_order?`Min: ${Pt.min_order}`:"Enter quantity"})]}),Ut&&parseFloat(Ut)>0&&(0,g.jsxs)("div",{style:{padding:"12px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Estimated Cost"}),(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#16A34A"},children:(0,p.vv)(parseFloat(Ut)*Pt.unit_cost,Y)})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>Tt(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:()=>{Pt&&Ut&&(alert(`Order sent: ${Ut} ${Pt.unit} of ${Pt.name}`),Tt(!1),Mt(null),Lt(""))},disabled:!Ut||parseFloat(Ut)<=0,children:"Send Order"})]})]})}),(0,g.jsx)(d.aF,{isOpen:at,onClose:()=>lt(!1),title:`Settings: ${(null===ot||void 0===ot?void 0:ot.name)||""}`,size:"small",children:ot&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,g.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,g.jsx)(B,{level:ot.prediction_confidence||"none",children:rn(ot.prediction_confidence||"none")}),(0,g.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(ot.avg_daily_usage))||0).toFixed(2)," ",ot.unit,"/day (calculated)"]})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Minimum Stock Level (",ot.unit,")"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:dt.min_stock,onChange:e=>ut({...dt,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Minimum Order (",ot.unit,")"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:dt.min_order,onChange:e=>ut({...dt,min_order:e.target.value}),placeholder:"0"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Lead Time (days)"}),(0,g.jsx)(d.ZQ,{type:"number",min:"1",value:dt.lead_time_days,onChange:e=>ut({...dt,lead_time_days:e.target.value}),placeholder:"1"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Safety Stock (%)"}),(0,g.jsx)(d.ZQ,{type:"number",min:"0",max:"100",value:dt.safety_stock_percent,onChange:e=>ut({...dt,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsxs)(d.lR,{children:["Manual Daily Usage (",ot.unit,"/day)"]}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:dt.manual_daily_usage,onChange:e=>ut({...dt,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>lt(!1),children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(ot)try{xt(!0);(await en(`/api/restaurants/${Yt}/inventory/${ot.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(dt.lead_time_days)||1,safety_stock_percent:parseFloat(dt.safety_stock_percent)||20,manual_daily_usage:dt.manual_daily_usage?parseFloat(dt.manual_daily_usage):null,min_stock:parseFloat(dt.min_stock)||0,min_order:parseFloat(dt.min_order)||0})})).success&&(lt(!1),tn())}catch(e){console.error("Failed to save settings:",e)}finally{xt(!1)}},disabled:pt,children:pt?"Saving...":"Save Settings"})]})]})}),(0,g.jsxs)(d.aF,{isOpen:ht,onClose:()=>{gt(!1),wt(!1)},title:"Add General Stock",size:"medium",children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Item Name *"}),(0,g.jsx)(d.ZQ,{type:"text",value:mt.name,onChange:e=>jt({...mt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Code (SKU)"}),(0,g.jsx)(d.ZQ,{type:"text",value:mt.code,onChange:e=>jt({...mt,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,g.jsx)(h.A,{value:mt.image_url,onChange:e=>jt({...mt,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit *"}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(Z,{type:"text",value:Ft?Ct:(null===(e=Qt.find(e=>e.value===mt.stock_unit))||void 0===e?void 0:e.label)||mt.stock_unit,onChange:e=>{St(e.target.value),wt(!0)},onFocus:()=>{wt(!0),St("")},onBlur:()=>setTimeout(()=>wt(!1),200),placeholder:"Search unit..."}),Ft&&(0,g.jsxs)(q,{children:[Zt.map(e=>(0,g.jsx)(N,{selected:mt.stock_unit===e.value,onClick:()=>{jt({...mt,stock_unit:e.value}),wt(!1),St("")},children:e.label},e.value)),0===Zt.length&&(0,g.jsxs)(N,{onClick:()=>{jt({...mt,stock_unit:Ct}),wt(!1)},children:['Use "',Ct,'"']})]})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Category"}),(0,g.jsxs)(o.Jt,{value:mt.category,onChange:e=>jt({...mt,category:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Category"}),kt.length>0?kt.map(e=>(0,g.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,g.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,g.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,g.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,g.jsx)("option",{value:"Other",children:"Other"})]})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Supplier"}),(0,g.jsxs)(o.Jt,{value:mt.supplier_id,onChange:e=>jt({...mt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),_t.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))]})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit Cost"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.unit_cost,onChange:e=>jt({...mt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Initial Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.current_stock,onChange:e=>jt({...mt,current_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_stock,onChange:e=>jt({...mt,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Order"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_order,onChange:e=>jt({...mt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>{gt(!1),wt(!1)},children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(mt.name.trim())try{vt(!0);(await en(`/api/restaurants/${Yt}/inventory/general-stock`,{method:"POST",body:JSON.stringify({name:mt.name,code:mt.code||null,image_url:mt.image_url||null,stock_unit:mt.stock_unit,unit_cost:parseFloat(mt.unit_cost)||0,category:mt.category||"Other",current_stock:parseFloat(mt.current_stock)||0,min_stock:parseFloat(mt.min_stock)||0,min_order:parseFloat(mt.min_order)||0,supplier_id:mt.supplier_id?parseInt(mt.supplier_id):null})})).success&&(gt(!1),jt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),tn())}catch(e){console.error("Failed to add general stock:",e)}finally{vt(!1)}},disabled:yt||!mt.name.trim(),children:yt?"Adding...":"Add Item"})]})]}),(0,g.jsxs)(d.aF,{isOpen:At,onClose:()=>{Et(!1),zt(null)},title:"Edit General Stock",size:"medium",children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Item Name *"}),(0,g.jsx)(d.ZQ,{type:"text",value:mt.name,onChange:e=>jt({...mt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Code (SKU)"}),(0,g.jsx)(d.ZQ,{type:"text",value:mt.code,onChange:e=>jt({...mt,code:e.target.value}),placeholder:"Auto-generate if empty"})]})]}),(0,g.jsx)(h.A,{value:mt.image_url,onChange:e=>jt({...mt,image_url:e}),label:"Image (Optional)",helpText:"Drag & drop or click to upload item image",maxSize:2}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit *"}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(Z,{type:"text",value:Ft?Ct:(null===(t=Qt.find(e=>e.value===mt.stock_unit))||void 0===t?void 0:t.label)||mt.stock_unit,onChange:e=>{St(e.target.value),wt(!0)},onFocus:()=>{wt(!0),St("")},onBlur:()=>setTimeout(()=>wt(!1),200),placeholder:"Search unit..."}),Ft&&(0,g.jsxs)(q,{children:[Zt.map(e=>(0,g.jsx)(N,{selected:mt.stock_unit===e.value,onClick:()=>{jt({...mt,stock_unit:e.value}),wt(!1),St("")},children:e.label},e.value)),0===Zt.length&&(0,g.jsxs)(N,{onClick:()=>{jt({...mt,stock_unit:Ct}),wt(!1)},children:['Use "',Ct,'"']})]})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Category"}),(0,g.jsxs)(o.Jt,{value:mt.category,onChange:e=>jt({...mt,category:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Category"}),kt.length>0?kt.map(e=>(0,g.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,g.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,g.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,g.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,g.jsx)("option",{value:"Other",children:"Other"})]})]})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Supplier"}),(0,g.jsxs)(o.Jt,{value:mt.supplier_id,onChange:e=>jt({...mt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,g.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),_t.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))]})]})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Unit Cost"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.unit_cost,onChange:e=>jt({...mt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Current Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.current_stock,onChange:e=>jt({...mt,current_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Stock"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_stock,onChange:e=>jt({...mt,min_stock:e.target.value}),placeholder:"0"})]}),(0,g.jsxs)(d.gE,{children:[(0,g.jsx)(d.lR,{children:"Min Order"}),(0,g.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:mt.min_order,onChange:e=>jt({...mt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>{Et(!1),zt(null)},children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(mt.name.trim()&&Bt)try{vt(!0);(await en(`/api/restaurants/${Yt}/inventory/general-stock/${Bt.id}`,{method:"PUT",body:JSON.stringify({name:mt.name,code:mt.code||null,image_url:mt.image_url||null,stock_unit:mt.stock_unit,unit_cost:parseFloat(mt.unit_cost)||0,category:mt.category||"Other",current_stock:parseFloat(mt.current_stock)||0,min_stock:parseFloat(mt.min_stock)||0,min_order:parseFloat(mt.min_order)||0,supplier_id:mt.supplier_id?parseInt(mt.supplier_id):null})})).success&&(Et(!1),zt(null),jt({name:"",code:"",image_url:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),tn())}catch(e){console.error("Failed to update general stock:",e)}finally{vt(!1)}},disabled:yt||!mt.name.trim(),children:yt?"Saving...":"Save Changes"})]})]}),(0,g.jsx)(d.aF,{isOpen:$t,onClose:()=>{Dt(!1),Rt(null)},title:"Unlink from Inventory",size:"small",children:It&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,g.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:It.name}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===It.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)(d.yl,{variant:"secondary",onClick:()=>{Dt(!1),Rt(null)},children:"Cancel"}),(0,g.jsx)(d.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===It.type){(await en(`/api/restaurants/${Yt}/ingredients/${It.id}`,{method:"PUT",body:JSON.stringify({track_stock:!1})})).success&&ue(e=>e.filter(e=>e.id!==It.id))}else{(await en(`/api/restaurants/${Yt}/inventory/general-stock/${It.id}`,{method:"DELETE"})).success&&be(e=>e.filter(e=>e.id!==It.id))}Dt(!1),Rt(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===It.type?"Unlink":"Delete"})]})]})})]}):(0,g.jsx)(a.A,{children:(0,g.jsx)(l.mc,{children:(0,g.jsx)(l.pp,{children:(0,g.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}},4669:(e,t,n)=>{n.d(t,{A:()=>y});var i=n(9950),r=n(4752),s=n(4414);const a=r.Ay.div`
  margin-bottom: 16px;
`,l=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,o=r.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,c=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,d=r.Ay.div`
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
`,u=r.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,p=r.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=r.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=r.Ay.label`
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
`,m=r.Ay.button`
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
`,j=r.Ay.input`
  display: none;
`,y=e=>{let{value:t,onChange:n,label:r="Logo Upload",helpText:y="Upload an image for your logo",maxSize:v=2,previewSize:_=150,showRemoveButton:f=!0,changeButtonText:k="Change Image",removeButtonText:b="Remove Image",imageAltText:C="Uploaded"}=e;const[S,F]=(0,i.useState)(!1),w=(0,i.useRef)(null),A=(0,i.useRef)(null),E=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);const t=new FileReader;t.onload=e=>{var t;const i=new Image;i.onload=()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return;const r=800;let s=i.width,a=i.height;(s>r||a>r)&&(s>a?(a=a/s*r,s=r):(s=s/a*r,a=r)),e.width=s,e.height=a,t.drawImage(i,0,0,s,a);const l=e.toDataURL("image/jpeg",.85);n(l)},i.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},B=e=>{const t=e.target.files;t&&t.length>0&&E(t[0])};return(0,s.jsxs)(a,{children:[r&&(0,s.jsx)(l,{children:r}),y&&(0,s.jsx)(o,{children:y}),(0,s.jsxs)(c,{children:[(0,s.jsx)(d,{ref:A,isDragging:S,hasImage:!!t,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===A.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),F(!1);const t=e.dataTransfer.files;t&&t.length>0&&E(t[0])},onClick:()=>{var e;t||(null===(e=w.current)||void 0===e||e.click())},children:t?(0,s.jsx)("img",{src:t,alt:C}):(0,s.jsxs)(u,{children:[(0,s.jsx)(p,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,s.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&(0,s.jsxs)(h,{children:[(0,s.jsxs)(g,{children:[k,(0,s.jsx)("input",{ref:w,type:"file",accept:"image/*",onChange:B})]}),f&&(0,s.jsx)(m,{onClick:()=>{n("")},children:b})]})]}),!t&&(0,s.jsx)(j,{ref:w,type:"file",accept:"image/*",onChange:B})]})}}}]);