"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2980],{2488:(e,t,n)=>{n.d(t,{DO:()=>c,Jt:()=>d,Qn:()=>o});n(9950);var i=n(4752),r=n(4414);const s=i.Ay.div`
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
`,o=e=>{let{children:t,className:n,style:i,...a}=e;return(0,r.jsx)(s,{className:n,style:i,...a,children:t})},c=e=>{let{placeholder:t="Search...",...n}=e;return(0,r.jsx)(a,{placeholder:t,...n})},d=e=>{let{children:t,...n}=e;return(0,r.jsx)(l,{...n,children:t})}},2980:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Z});var i=n(9950),r=n(4492),s=n(4752),a=n(3310),l=n(7492),o=n(2488),c=n(1367),d=n(9610),u=n(4021),p=n(6038),x=n(4414);const h=s.Ay.div`
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
`,j=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,m=s.Ay.div`
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
`,k=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,_=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,f=s.Ay.div`
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
`,b=s.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #DC2626; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #059669; color: white;"}}}
`,S=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,C=s.Ay.button`
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
`,w=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,F=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,E=s.Ay.div``,A=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,z=(0,s.Ay)(l.A0)`
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
`,$=(0,s.Ay)(l.Hj)`
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
`,O=s.Ay.div`
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
`,R=s.Ay.input`
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
`,I=s.Ay.input`
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
`,D=s.Ay.button`
  padding: 4px 12px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #5046E4;
  }
`,T=s.Ay.div`
  position: relative;
`,M=s.Ay.input`
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
`,P=s.Ay.div`
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
`,L=s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  color: ${e=>e.selected?"#635BFF":"#0A2540"};

  &:hover {
    background: #F3F4F6;
  }
`,U=s.Ay.button`
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
`,Q=s.Ay.button`
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
`,q=e=>{let{restaurantId:t,currency:n}=e;const[r,s]=(0,i.useState)([]),[a,o]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/inventory/transactions?limit=50`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&s(i.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{o(!1)}})()},[t]);const c=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},d=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return a?(0,x.jsx)(l.pp,{children:"Loading transactions..."}):0===r.length?(0,x.jsxs)(l.pp,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(l.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,x.jsx)("span",{children:"Date"}),(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Type"}),(0,x.jsx)("span",{children:"Change"}),(0,x.jsx)("span",{children:"After"}),(0,x.jsx)("span",{children:"Notes"})]}),r.map(e=>{var t;return(0,x.jsx)(l.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,x.jsxs)(l.Np,{children:[(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Ingredient"}),(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Type"}),(0,x.jsx)("span",{style:{color:d(e.transaction_type),fontWeight:600},children:c(e.transaction_type)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Change"}),(0,x.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"After"}),(0,x.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Notes"}),(0,x.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})},Z=()=>{var e,t;const{user:n}=(0,c.As)(),{restaurantId:s}=(0,r.g)(),[Z,N]=(0,r.ok)(),{defaultCurrency:W}=(0,u.i1)(),[J,G]=(0,i.useState)("RM"),H=Z.get("tab")||"dashboard",X=e=>{N({tab:e})},[K,Y]=(0,i.useState)(!0),[V,ee]=(0,i.useState)(null),[te,ne]=(0,i.useState)([]),[ie,re]=(0,i.useState)([]),[se,ae]=(0,i.useState)([]),[le,oe]=(0,i.useState)([]),[ce,de]=(0,i.useState)(""),[ue,pe]=(0,i.useState)("all"),[xe,he]=(0,i.useState)([]),[ge,je]=(0,i.useState)(null),[me,ye]=(0,i.useState)(!1),[ve,ke]=(0,i.useState)(""),[_e,fe]=(0,i.useState)(""),[be,Se]=(0,i.useState)("all"),[Ce,we]=(0,i.useState)(!1),[Fe,Ee]=(0,i.useState)(!1),[Ae,Be]=(0,i.useState)(!1),[ze,$e]=(0,i.useState)(!1),[Oe,Re]=(0,i.useState)(null),[Ie,De]=(0,i.useState)(""),[Te,Me]=(0,i.useState)(""),[Pe,Le]=(0,i.useState)(""),[Ue,Qe]=(0,i.useState)(""),[qe,Ze]=(0,i.useState)(""),[Ne,We]=(0,i.useState)({}),[Je,Ge]=(0,i.useState)(!1),[He,Xe]=(0,i.useState)(!1),[Ke,Ye]=(0,i.useState)(!1),[Ve,et]=(0,i.useState)(null),[tt,nt]=(0,i.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:"",min_order:"",new_stock:"",adjustment_reason:""}),[it,rt]=(0,i.useState)(!1),[st,at]=(0,i.useState)(!1),[lt,ot]=(0,i.useState)({name:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),[ct,dt]=(0,i.useState)(!1),[ut,pt]=(0,i.useState)([]),[xt,ht]=(0,i.useState)([]),[gt,jt]=(0,i.useState)(""),[mt,yt]=(0,i.useState)(!1),[vt,kt]=(0,i.useState)(!1),[_t,ft]=(0,i.useState)(null),[bt,St]=(0,i.useState)(!1),[Ct,wt]=(0,i.useState)(null),Ft=[{value:"piece",label:"Piece"},{value:"box",label:"Box"},{value:"pack",label:"Pack"},{value:"roll",label:"Roll"},{value:"bag",label:"Bag"},{value:"set",label:"Set"},{value:"bundle",label:"Bundle"},{value:"case",label:"Case"},{value:"carton",label:"Carton"},{value:"pallet",label:"Pallet"},{value:"bottle",label:"Bottle"},{value:"can",label:"Can"},{value:"jar",label:"Jar"},{value:"tube",label:"Tube"},{value:"container",label:"Container"},{value:"kg",label:"Kilogram (kg)"},{value:"g",label:"Gram (g)"},{value:"L",label:"Liter (L)"},{value:"ml",label:"Milliliter (ml)"},{value:"m",label:"Meter (m)"},{value:"cm",label:"Centimeter (cm)"},{value:"pair",label:"Pair"},{value:"dozen",label:"Dozen"},{value:"sheet",label:"Sheet"},{value:"ream",label:"Ream"}],Et=Ft.filter(e=>e.label.toLowerCase().includes(gt.toLowerCase())||e.value.toLowerCase().includes(gt.toLowerCase())),[At,Bt]=(0,i.useState)(null),[zt,$t]=(0,i.useState)(""),[Ot,Rt]=(0,i.useState)("ingredient"),[It,Dt]=(0,i.useState)({}),Tt=s?parseInt(s,10):null===n||void 0===n?void 0:n.restaurant_id;(0,i.useEffect)(()=>{W&&G(W)},[W]);const Mt=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),Pt=(0,i.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Mt();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[Mt]),Lt=(0,i.useCallback)(async()=>{if(Tt)try{Y(!0);const[e,t,n,i,r]=await Promise.all([Pt(`/api/restaurants/${Tt}/inventory/summary`),Pt(`/api/restaurants/${Tt}/inventory`),Pt(`/api/restaurants/${Tt}/inventory/alerts?resolved=false`),Pt(`/api/restaurants/${Tt}/inventory/reorder-suggestions`),Pt(`/api/restaurants/${Tt}/inventory/expiring?days=14`)]);e.success&&ee(e.data),t.success&&ne(t.data),n.success&&re(n.data),i.success&&ae(i.data),r.success&&oe(r.data);try{const e=await Pt(`/api/restaurants/${Tt}/inventory/general-stock`);e.success&&he(e.data||[])}catch{he([])}try{const e=await Pt(`/api/restaurants/${Tt}/suppliers`);e.success&&pt(e.data||[])}catch{pt([])}try{const e=await Pt(`/api/restaurants/${Tt}/general-stock-categories`);if(e.success){const t=[...e.data.brand_categories||[],...e.data.own_categories||[]];ht(t)}}catch{ht([])}}catch(e){console.error("Failed to fetch inventory data:",e)}finally{Y(!1)}},[Tt,Pt]);(0,i.useEffect)(()=>{Lt()},[Lt]),(0,i.useEffect)(()=>{if(te.length>0){const e=te.some(e=>e.current_stock>0||e.last_stock_take_at);Ge(!e)}},[te]);const Ut=(e,t,n)=>{We(i=>({...i,[e]:{...i[e],[t]:n}}))},Qt=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},qt=e=>{Re(e),De(""),Me(""),Le(""),Qe(""),Ze(""),we(!0)},Zt=(e,t,n)=>{Bt(e),$t(t.toString()),Rt(n)},Nt=()=>{Bt(null),$t("")},Wt=async e=>{const t=parseFloat(zt);if(isNaN(t)||t<0)Nt();else try{const n="ingredient"===Ot?`/api/restaurants/${Tt}/inventory/adjust`:`/api/restaurants/${Tt}/inventory/general-stock/${e}/adjust`,i={new_quantity:t,reason:"Stock adjustment"};"ingredient"===Ot&&(i.ingredient_id=e);(await Pt(n,{method:"POST",body:JSON.stringify(i)})).success&&("ingredient"===Ot?ne(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)):he(n=>n.map(n=>n.id===e?{...n,current_stock:t}:n)))}catch(n){console.error("Failed to adjust stock:",n)}finally{Nt()}},Jt=(e,t)=>{"Enter"===e.key?Wt(t):"Escape"===e.key&&Nt()},Gt=e=>{alert("\ubc1c\uc8fc \uad00\ub9ac \uae30\ub2a5 \uc900\ube44 \uc911\uc785\ub2c8\ub2e4.")},Ht=te.filter(e=>{const t=e.name.toLowerCase().includes(ce.toLowerCase()),n="all"===ue||e.stock_status===ue;return t&&n}),Xt=(("all"===be||"ingredients"===be)&&Ht.map(e=>({id:e.id,name:e.name,code:e.code||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,unit:e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"ingredient",avg_daily_usage:parseFloat(String(e.avg_daily_usage))||0,prediction_confidence:e.prediction_confidence})),("all"===be||"general_stock"===be)&&xe.filter(e=>{const t=e.name.toLowerCase().includes(ce.toLowerCase()),n="all"===ue||e.stock_status===ue;return t&&n}).map(e=>({id:e.id,name:e.name,code:e.code||null,category:e.category,current_stock:e.current_stock,min_stock:e.min_stock,unit:e.stock_unit||e.unit,unit_cost:e.unit_cost,supplier_name:e.supplier_name,stock_status:e.stock_status,last_stock_take_at:e.last_stock_take_at,item_type:"general_stock"})),e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}});return Tt?(0,x.jsxs)(a.A,{children:[(0,x.jsxs)(l.mc,{children:[(0,x.jsx)(l.Y9,{children:(0,x.jsx)(l.hE,{children:"Inventory"})}),(0,x.jsxs)(l.UC,{children:[(0,x.jsxs)(l.j,{children:[(0,x.jsx)(l.oz,{active:"dashboard"===H,onClick:()=>X("dashboard"),children:"Dashboard"}),(0,x.jsx)(l.oz,{active:"list"===H,onClick:()=>X("list"),children:"Stock List"}),(0,x.jsx)(l.oz,{active:"history"===H,onClick:()=>X("history"),children:"History"})]}),K?(0,x.jsx)(l.pp,{children:"Loading..."}):"dashboard"===H?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#059669",children:[(0,x.jsx)(l.Os,{children:(null===V||void 0===V?void 0:V.total_items)||0}),(0,x.jsx)(l.v0,{children:"Total Ingredients"}),(0,x.jsx)(l.d1,{children:"managed items"})]}),(0,x.jsxs)(l.hI,{color:"#D97706",children:[(0,x.jsx)(l.Os,{children:(null===V||void 0===V?void 0:V.low_stock_count)||0}),(0,x.jsx)(l.v0,{children:"Low Stock"}),(0,x.jsx)(l.d1,{children:"need attention"})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:(null===V||void 0===V?void 0:V.out_of_stock_count)||0}),(0,x.jsx)(l.v0,{children:"Out of Stock"}),(0,x.jsx)(l.d1,{children:"urgent"})]}),(0,x.jsxs)(l.hI,{color:"#7C3AED",children:[(0,x.jsx)(l.Os,{children:(0,p.vv)((null===V||void 0===V?void 0:V.monthly_loss)||0,J)}),(0,x.jsx)(l.v0,{children:"Monthly Loss"}),(0,x.jsx)(l.d1,{children:"this month"})]}),(0,x.jsxs)(l.hI,{color:"#EA580C",children:[(0,x.jsx)(l.Os,{children:le.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,x.jsx)(l.v0,{children:"Expiring Soon"}),(0,x.jsx)(l.d1,{children:"within 3 days"})]})]}),ie.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:"Stock Alerts"}),(0,x.jsx)("div",{children:ie.slice(0,5).map(e=>(0,x.jsxs)(m,{type:e.alert_type,children:[(0,x.jsxs)(y,{children:[(0,x.jsx)(v,{children:e.ingredient.name}),(0,x.jsxs)(k,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,x.jsxs)(l.wr,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>{const t=te.find(t=>t.id===e.ingredient_id);t&&qt(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,x.jsx)(l.$n,{variant:"secondary",onClick:()=>(async e=>{try{(await Pt(`/api/restaurants/${Tt}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&Lt()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),le.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:"Expiring Items"}),(0,x.jsx)("div",{children:le.slice(0,5).map(e=>(0,x.jsxs)(f,{urgency:e.urgency,children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(v,{children:[e.ingredient_name,e.batch_number&&(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,x.jsxs)(k,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,x.jsx)(b,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,x.jsx)(l.$n,{variant:"danger",onClick:()=>{const t=te.find(t=>t.id===e.ingredient_id);t&&(Re(t),De(""),Me(""),Ee(!0))},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),se.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:"Reorder Suggestions"}),(0,x.jsx)(h,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(l.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Current Stock"}),(0,x.jsx)("span",{children:"Daily Usage"}),(0,x.jsx)("span",{children:"Suggested Qty"}),(0,x.jsx)("span",{children:"Est. Cost"}),(0,x.jsx)("span",{children:"Urgency"}),(0,x.jsx)("span",{children:"Order"})]}),se.slice(0,10).map(e=>(0,x.jsxs)(l.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px 150px",children:[(0,x.jsx)("div",{children:e.ingredient.name}),(0,x.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,x.jsxs)("div",{children:[(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,x.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,x.jsx)("div",{children:(0,p.vv)(e.estimated_cost,J)}),(0,x.jsx)("div",{children:(0,x.jsx)(_,{level:e.urgency,children:e.urgency.toUpperCase()})}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,x.jsx)(I,{type:"number",min:"0",step:"1",value:It[e.ingredient.id]||e.suggested_qty,onChange:t=>Dt(n=>({...n,[e.ingredient.id]:t.target.value})),placeholder:String(e.suggested_qty)}),(0,x.jsx)(D,{onClick:()=>Gt(e.ingredient.id),children:"Order"})]})]},e.ingredient.id))]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>{0===te.length?window.location.href=`/restaurant/${Tt}/recipe-management?tab=ingredients`:X("list")},children:"+ Receive Stock"}),(0,x.jsx)(l.$n,{variant:"secondary",onClick:()=>{0===te.length?window.location.href=`/restaurant/${Tt}/recipe-management?tab=ingredients`:X("list")},children:"+ Record Waste"}),(0,x.jsx)(l.$n,{variant:"secondary",onClick:()=>X("history"),children:"View All Transactions"})]})]}):"list"===H?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(o.Qn,{children:[(0,x.jsxs)(o.Jt,{value:be,onChange:e=>Se(e.target.value),style:{minWidth:"140px"},children:[(0,x.jsx)("option",{value:"all",children:"All Items"}),(0,x.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,x.jsx)("option",{value:"general_stock",children:"General Stock"})]}),(0,x.jsx)(o.DO,{type:"text",placeholder:"Search...",value:ce,onChange:e=>de(e.target.value)}),(0,x.jsxs)(o.Jt,{value:ue,onChange:e=>pe(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,x.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]}),(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>at(!0),style:{marginLeft:"auto"},children:"+ Add General Stock"})]}),("all"===be||"general_stock"===be)&&xe.length>0&&(0,x.jsxs)(x.Fragment,{children:["all"===be&&(0,x.jsxs)(g,{children:["General Stock (",xe.filter(e=>{const t=e.name.toLowerCase().includes(ce.toLowerCase()),n="all"===ue||e.stock_status===ue;return t&&n}).length,")"]}),(0,x.jsxs)(l.XI,{style:{marginBottom:"24px"},children:[(0,x.jsxs)(z,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 150px",children:[(0,x.jsx)("span",{children:"Item"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Current Stock"}),(0,x.jsx)("span",{children:"Min Stock"}),(0,x.jsx)("span",{children:"Unit Cost"}),(0,x.jsx)("span",{children:"Supplier"}),(0,x.jsx)("span",{children:"Actions"})]}),xe.filter(e=>{const t=e.name.toLowerCase().includes(ce.toLowerCase()),n="all"===ue||e.stock_status===ue;return t&&n}).map(e=>(0,x.jsxs)($,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 150px",children:[(0,x.jsxs)(l.Np,{children:[(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Item"}),(0,x.jsxs)(E,{children:[(0,x.jsx)(A,{children:e.name}),(0,x.jsxs)(B,{children:[e.category," ",e.code&&`\u2022 ${e.code}`]})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Status"}),(0,x.jsx)(j,{status:e.stock_status,children:Xt(e.stock_status)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Current Stock"}),At===e.id&&"general_stock"===Ot?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,x.jsx)(R,{type:"number",step:"0.01",value:zt,onChange:e=>$t(e.target.value),onKeyDown:t=>Jt(t,e.id),onBlur:()=>Wt(e.id),autoFocus:!0}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]}):(0,x.jsxs)(O,{onClick:()=>Zt(e.id,e.current_stock,"general_stock"),children:[(0,x.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.stock_unit})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Min Stock"}),(0,x.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.stock_unit]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Unit Cost"}),(0,x.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,J)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Supplier"}),(0,x.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]})]}),(0,x.jsxs)(l.wr,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>{je(e),ke(""),fe(""),ye(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,x.jsx)(D,{onClick:()=>Gt(e.id),children:"Order"}),(0,x.jsx)(Q,{onClick:()=>{var t;ft(e),ot({name:e.name,stock_unit:e.stock_unit||e.unit,unit_cost:e.unit_cost.toString(),category:e.category,current_stock:e.current_stock.toString(),min_stock:e.min_stock.toString(),min_order:(e.min_order||0).toString(),supplier_id:(null===(t=e.supplier_id)||void 0===t?void 0:t.toString())||""}),kt(!0)},children:"Edit"}),(0,x.jsx)(U,{onClick:()=>{wt({type:"general_stock",id:e.id,name:e.name}),St(!0)},children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},`general-stock-${e.id}`))]})]}),("all"===be||"ingredients"===be)&&(0,x.jsxs)(x.Fragment,{children:["all"===be&&(0,x.jsxs)(g,{children:["Ingredients (",Ht.length,")"]}),0===Ht.length?(0,x.jsxs)(l.pp,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===te.length?"No ingredients found":"No matching ingredients"}),(0,x.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===te.length?"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===te.length&&(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>window.location.href=`/restaurant/${Tt}/recipe-management?tab=ingredients`,children:"Go to Ingredients"})]}):(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(z,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Current Stock"}),(0,x.jsx)("span",{children:"Min / Prediction"}),(0,x.jsx)("span",{children:"Unit Cost"}),(0,x.jsx)("span",{children:"Supplier"}),(0,x.jsx)("span",{children:"Last Stock Take"}),(0,x.jsx)("span",{children:"Actions"})]}),Ht.map(e=>{return(0,x.jsxs)($,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,x.jsxs)(l.Np,{children:[(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Ingredient"}),(0,x.jsxs)(E,{children:[(0,x.jsx)(A,{children:e.name}),(0,x.jsxs)(B,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Status"}),(0,x.jsx)(j,{status:e.stock_status,children:Xt(e.stock_status)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Current Stock"}),At===e.id&&"ingredient"===Ot?(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,x.jsx)(R,{type:"number",step:"0.01",value:zt,onChange:e=>$t(e.target.value),onKeyDown:t=>Jt(t,e.id),onBlur:()=>Wt(e.id),autoFocus:!0}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}):(0,x.jsxs)(O,{onClick:()=>Zt(e.id,e.current_stock,"ingredient"),children:[(0,x.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:e.current_stock}),(0,x.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Min / Prediction"}),(0,x.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",e.min_stock," ",e.unit]}),(0,x.jsx)(S,{level:e.prediction_confidence||"none",children:Qt(e.prediction_confidence||"none")})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Unit Cost"}),(0,x.jsx)("div",{style:{color:"#0A2540"},children:(0,p.vv)(e.unit_cost,J)})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Supplier"}),(0,x.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,x.jsxs)(l.Uj,{children:[(0,x.jsx)(l.PM,{children:"Last Stock Take"}),(0,x.jsx)("div",{style:{color:"#6B7280"},children:(t=e.last_stock_take_at,t?new Date(t).toLocaleDateString():"-")})]})]}),(0,x.jsxs)(l.wr,{children:[(0,x.jsx)(l.$n,{variant:"primary",onClick:()=>qt(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,x.jsx)(D,{onClick:()=>Gt(e.id),children:"Order"}),(0,x.jsx)(C,{onClick:()=>(e=>{var t;et(e),nt({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString(),min_order:(e.min_order||0).toString(),new_stock:"",adjustment_reason:""}),Ye(!0)})(e),children:"Settings"}),(0,x.jsx)(U,{onClick:()=>{wt({type:"ingredient",id:e.id,name:e.name}),St(!0)},children:(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})})]})]},e.id);var t})]})]})]}):(0,x.jsx)(q,{restaurantId:Tt,currency:J})]})]}),(0,x.jsx)(d.aF,{isOpen:Ce,onClose:()=>we(!1),title:"Receive Stock",size:"medium",children:Oe&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Ingredient"}),(0,x.jsx)(d.ZQ,{type:"text",value:Oe.name,disabled:!0})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Current Stock"}),(0,x.jsx)(d.ZQ,{type:"text",value:`${Oe.current_stock} ${Oe.unit}`,disabled:!0})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsxs)(d.lR,{children:["Quantity Received (",Oe.unit,") *"]}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",value:Ie,onChange:e=>De(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,x.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,x.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,x.jsx)(d.lR,{children:"Batch/Lot Number"}),(0,x.jsx)(d.ZQ,{type:"text",value:Pe,onChange:e=>Le(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,x.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,x.jsx)(d.lR,{children:"Manufacture Date"}),(0,x.jsx)(d.ZQ,{type:"date",value:Ue,onChange:e=>Qe(e.target.value)})]})]}),(0,x.jsxs)(d.gE,{style:{marginTop:"12px"},children:[(0,x.jsx)(d.lR,{children:"Expiry Date"}),(0,x.jsx)(d.ZQ,{type:"date",value:qe,onChange:e=>Ze(e.target.value)}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Notes (Optional)"}),(0,x.jsx)(d.ZQ,{type:"text",value:Te,onChange:e=>Me(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Oe&&Ie)try{(await Pt(`/api/restaurants/${Tt}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:Oe.id,quantity:parseFloat(Ie),notes:Te,batch_number:Pe||null,manufacture_date:Ue||null,expiry_date:qe||null})})).success&&(we(!1),Re(null),De(""),Me(""),Le(""),Qe(""),Ze(""),Lt())}catch(e){console.error("Failed to receive stock:",e)}},children:"Confirm Receive"})]})]})}),(0,x.jsx)(d.aF,{isOpen:Fe,onClose:()=>Ee(!1),title:"Record Waste",size:"small",children:Oe&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Ingredient"}),(0,x.jsx)(d.ZQ,{type:"text",value:Oe.name,disabled:!0})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Current Stock"}),(0,x.jsx)(d.ZQ,{type:"text",value:`${Oe.current_stock} ${Oe.unit}`,disabled:!0})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsxs)(d.lR,{children:["Waste Quantity (",Oe.unit,") *"]}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",value:Ie,onChange:e=>De(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Reason (Optional)"}),(0,x.jsx)(d.ZQ,{type:"text",value:Te,onChange:e=>Me(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>Ee(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Oe&&Ie)try{(await Pt(`/api/restaurants/${Tt}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:Oe.id,quantity:parseFloat(Ie),notes:Te})})).success&&(Ee(!1),Re(null),De(""),Me(""),Lt())}catch(e){console.error("Failed to record waste:",e)}},children:"Confirm Waste"})]})]})}),(0,x.jsxs)(d.aF,{isOpen:Ae,onClose:()=>Be(!1),title:"Set Initial Stock",size:"large",children:[(0,x.jsx)(h,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,x.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(te.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,x.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,x.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,x.jsxs)(l.XI,{children:[(0,x.jsxs)(l.A0,{columns:"2fr 1fr 1fr",children:[(0,x.jsx)("span",{children:"Ingredient"}),(0,x.jsx)("span",{children:"Current Qty"}),(0,x.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,x.jsxs)(l.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,x.jsx)("div",{children:(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=Ne[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>Ut(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,x.jsx)("div",{children:(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=Ne[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>Ut(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(Ne).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{Xe(!0);(await Pt(`/api/restaurants/${Tt}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success&&(Be(!1),Ge(!1),Lt())}catch(t){console.error("Failed to save initial stock:",t)}finally{Xe(!1)}},disabled:He,children:He?"Saving...":"Save Initial Stock"})]})]}),(0,x.jsx)(d.aF,{isOpen:me,onClose:()=>ye(!1),title:`Receive Stock: ${(null===ge||void 0===ge?void 0:ge.name)||""}`,size:"small",children:ge&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,x.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[ge.current_stock," ",ge.stock_unit]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Quantity to Add *"}),(0,x.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:ve,onChange:e=>ke(e.target.value),placeholder:"Enter quantity"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Notes (Optional)"}),(0,x.jsx)(d.ZQ,{value:_e,onChange:e=>fe(e.target.value),placeholder:"Enter notes"})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>ye(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(ve&&!(parseFloat(ve)<=0))try{(await Pt(`/api/restaurants/${Tt}/inventory/general-stock/${ge.id}/receive`,{method:"POST",body:JSON.stringify({quantity:parseFloat(ve),notes:_e})})).success&&(ye(!1),Lt())}catch(e){console.error("Failed to receive general stock:",e)}},disabled:!ve||parseFloat(ve)<=0,children:"Receive"})]})]})}),(0,x.jsx)(d.aF,{isOpen:Ke,onClose:()=>Ye(!1),title:`Settings: ${(null===Ve||void 0===Ve?void 0:Ve.name)||""}`,size:"small",children:Ve&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,x.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)(S,{level:Ve.prediction_confidence||"none",children:Qt(Ve.prediction_confidence||"none")}),(0,x.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(Ve.avg_daily_usage))||0).toFixed(2)," ",Ve.unit,"/day (calculated)"]})]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsxs)(d.lR,{children:["Minimum Stock Level (",Ve.unit,")"]}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:tt.min_stock,onChange:e=>nt({...tt,min_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsxs)(d.lR,{children:["Minimum Order (",Ve.unit,")"]}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:tt.min_order,onChange:e=>nt({...tt,min_order:e.target.value}),placeholder:"0"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Minimum order quantity from supplier"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Lead Time (days)"}),(0,x.jsx)(d.ZQ,{type:"number",min:"1",value:tt.lead_time_days,onChange:e=>nt({...tt,lead_time_days:e.target.value}),placeholder:"1"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Safety Stock (%)"}),(0,x.jsx)(d.ZQ,{type:"number",min:"0",max:"100",value:tt.safety_stock_percent,onChange:e=>nt({...tt,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsxs)(d.lR,{children:["Manual Daily Usage (",Ve.unit,"/day)"]}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:tt.manual_daily_usage,onChange:e=>nt({...tt,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>Ye(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Ve)try{rt(!0);(await Pt(`/api/restaurants/${Tt}/inventory/${Ve.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(tt.lead_time_days)||1,safety_stock_percent:parseFloat(tt.safety_stock_percent)||20,manual_daily_usage:tt.manual_daily_usage?parseFloat(tt.manual_daily_usage):null,min_stock:parseFloat(tt.min_stock)||0,min_order:parseFloat(tt.min_order)||0})})).success&&(Ye(!1),Lt())}catch(e){console.error("Failed to save settings:",e)}finally{rt(!1)}},disabled:it,children:it?"Saving...":"Save Settings"})]})]})}),(0,x.jsxs)(d.aF,{isOpen:st,onClose:()=>{at(!1),yt(!1)},title:"Add General Stock",size:"medium",children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Item Name *"}),(0,x.jsx)(d.ZQ,{type:"text",value:lt.name,onChange:e=>ot({...lt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Unit *"}),(0,x.jsxs)(T,{children:[(0,x.jsx)(M,{type:"text",value:mt?gt:(null===(e=Ft.find(e=>e.value===lt.stock_unit))||void 0===e?void 0:e.label)||lt.stock_unit,onChange:e=>{jt(e.target.value),yt(!0)},onFocus:()=>{yt(!0),jt("")},onBlur:()=>setTimeout(()=>yt(!1),200),placeholder:"Search unit..."}),mt&&(0,x.jsxs)(P,{children:[Et.map(e=>(0,x.jsx)(L,{selected:lt.stock_unit===e.value,onClick:()=>{ot({...lt,stock_unit:e.value}),yt(!1),jt("")},children:e.label},e.value)),0===Et.length&&(0,x.jsxs)(L,{onClick:()=>{ot({...lt,stock_unit:gt}),yt(!1)},children:['Use "',gt,'"']})]})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Category"}),(0,x.jsxs)(o.Jt,{value:lt.category,onChange:e=>ot({...lt,category:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Category"}),xt.length>0?xt.map(e=>(0,x.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,x.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,x.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,x.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,x.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Supplier"}),(0,x.jsxs)(o.Jt,{value:lt.supplier_id,onChange:e=>ot({...lt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),ut.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Unit Cost"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.unit_cost,onChange:e=>ot({...lt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Initial Stock"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.current_stock,onChange:e=>ot({...lt,current_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Min Stock"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.min_stock,onChange:e=>ot({...lt,min_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Min Order"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.min_order,onChange:e=>ot({...lt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>{at(!1),yt(!1)},children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(lt.name.trim())try{dt(!0);(await Pt(`/api/restaurants/${Tt}/inventory/general-stock`,{method:"POST",body:JSON.stringify({name:lt.name,stock_unit:lt.stock_unit,unit_cost:parseFloat(lt.unit_cost)||0,category:lt.category||"Other",current_stock:parseFloat(lt.current_stock)||0,min_stock:parseFloat(lt.min_stock)||0,min_order:parseFloat(lt.min_order)||0,supplier_id:lt.supplier_id?parseInt(lt.supplier_id):null})})).success&&(at(!1),ot({name:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),Lt())}catch(e){console.error("Failed to add general stock:",e)}finally{dt(!1)}},disabled:ct||!lt.name.trim(),children:ct?"Adding...":"Add Item"})]})]}),(0,x.jsxs)(d.aF,{isOpen:vt,onClose:()=>{kt(!1),ft(null)},title:"Edit General Stock",size:"medium",children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Item Name *"}),(0,x.jsx)(d.ZQ,{type:"text",value:lt.name,onChange:e=>ot({...lt,name:e.target.value}),placeholder:"e.g., Takeaway Containers"})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Unit *"}),(0,x.jsxs)(T,{children:[(0,x.jsx)(M,{type:"text",value:mt?gt:(null===(t=Ft.find(e=>e.value===lt.stock_unit))||void 0===t?void 0:t.label)||lt.stock_unit,onChange:e=>{jt(e.target.value),yt(!0)},onFocus:()=>{yt(!0),jt("")},onBlur:()=>setTimeout(()=>yt(!1),200),placeholder:"Search unit..."}),mt&&(0,x.jsxs)(P,{children:[Et.map(e=>(0,x.jsx)(L,{selected:lt.stock_unit===e.value,onClick:()=>{ot({...lt,stock_unit:e.value}),yt(!1),jt("")},children:e.label},e.value)),0===Et.length&&(0,x.jsxs)(L,{onClick:()=>{ot({...lt,stock_unit:gt}),yt(!1)},children:['Use "',gt,'"']})]})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Category"}),(0,x.jsxs)(o.Jt,{value:lt.category,onChange:e=>ot({...lt,category:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Category"}),xt.length>0?xt.map(e=>(0,x.jsxs)("option",{value:e.name,children:[e.emoji?`${e.emoji} `:"",e.name]},e.id)):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"Supplies",children:"Supplies"}),(0,x.jsx)("option",{value:"Packaging",children:"Packaging"}),(0,x.jsx)("option",{value:"Cleaning",children:"Cleaning"}),(0,x.jsx)("option",{value:"Equipment",children:"Equipment"}),(0,x.jsx)("option",{value:"Other",children:"Other"})]})]})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Supplier"}),(0,x.jsxs)(o.Jt,{value:lt.supplier_id,onChange:e=>ot({...lt,supplier_id:e.target.value}),style:{width:"100%"},children:[(0,x.jsx)("option",{value:"",children:"Select Supplier (Optional)"}),ut.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Unit Cost"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.unit_cost,onChange:e=>ot({...lt,unit_cost:e.target.value}),placeholder:"0.00"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Current Stock"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.current_stock,onChange:e=>ot({...lt,current_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Min Stock"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.min_stock,onChange:e=>ot({...lt,min_stock:e.target.value}),placeholder:"0"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Min Order"}),(0,x.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:lt.min_order,onChange:e=>ot({...lt,min_order:e.target.value}),placeholder:"0"})]})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>{kt(!1),ft(null)},children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(lt.name.trim()&&_t)try{dt(!0);(await Pt(`/api/restaurants/${Tt}/inventory/general-stock/${_t.id}`,{method:"PUT",body:JSON.stringify({name:lt.name,stock_unit:lt.stock_unit,unit_cost:parseFloat(lt.unit_cost)||0,category:lt.category||"Other",current_stock:parseFloat(lt.current_stock)||0,min_stock:parseFloat(lt.min_stock)||0,min_order:parseFloat(lt.min_order)||0,supplier_id:lt.supplier_id?parseInt(lt.supplier_id):null})})).success&&(kt(!1),ft(null),ot({name:"",stock_unit:"piece",unit_cost:"",category:"",current_stock:"",min_stock:"",min_order:"",supplier_id:""}),Lt())}catch(e){console.error("Failed to update general stock:",e)}finally{dt(!1)}},disabled:ct||!lt.name.trim(),children:ct?"Saving...":"Save Changes"})]})]}),(0,x.jsx)(d.aF,{isOpen:bt,onClose:()=>{St(!1),wt(null)},title:"Unlink from Inventory",size:"small",children:Ct&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{style:{padding:"16px 0",textAlign:"center"},children:[(0,x.jsx)("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"ingredient"===Ct.type?"\ud83e\udd6c":"\ud83d\udce6"}),(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:Ct.name}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"ingredient"===Ct.type?"This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.":"This will permanently delete this general stock item."})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>{St(!1),wt(null)},children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:async()=>{try{if("ingredient"===Ct.type){(await Pt(`/api/restaurants/${Tt}/inventory/adjust`,{method:"POST",body:JSON.stringify({ingredient_id:Ct.id,new_quantity:0,reason:"Unlinked from inventory"})})).success&&ne(e=>e.filter(e=>e.id!==Ct.id))}else{(await Pt(`/api/restaurants/${Tt}/inventory/general-stock/${Ct.id}`,{method:"DELETE"})).success&&he(e=>e.filter(e=>e.id!==Ct.id))}St(!1),wt(null)}catch(e){console.error("Failed to delete:",e)}},style:{background:"#DC2626"},children:"ingredient"===Ct.type?"Unlink":"Delete"})]})]})})]}):(0,x.jsx)(a.A,{children:(0,x.jsx)(l.mc,{children:(0,x.jsx)(l.pp,{children:(0,x.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var i=n(9950),r=n(1367),s=n(6038);const a=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[a,l]=(0,i.useState)(Object.keys(s.DL)),[o,c]=(0,i.useState)(!0),[d,u]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),i=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(i)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),u("Failed to load currency settings"),n("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:d}}}}]);