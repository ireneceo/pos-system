"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2632],{2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var o=r(4752),i=r(4414);const n=o.Ay.div`
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
`,s=o.Ay.button`
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
`,a=o.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:o}=e;return(0,i.jsx)(n,{className:r,style:o,children:t})},d=e=>{let{active:t,onClick:r,children:o,className:n}=e;return(0,i.jsx)(s,{active:t,onClick:r,className:n,children:o})},c=e=>{let{count:t,variant:r="default",showZero:o=!1}=e;return 0!==t||o?(0,i.jsx)(a,{variant:r,children:t}):null}},2632:(e,t,r)=>{r.r(t),r.d(t,{default:()=>G});var o=r(9950),i=r(4752),n=r(8409),s=r(4492),a=r(2597),l=r(2653),d=r(1367),c=r(4414);const p=i.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 24px;
  margin-bottom: 24px;
`,x=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px;
`,h=e=>{let{restaurantId:t}=e;const r=(0,s.Zp)(),[i,n]=(0,o.useState)(null),[a,l]=(0,o.useState)(null),[d,h]=(0,o.useState)({}),[u,m]=(0,o.useState)(!1),[g,f]=(0,o.useState)(null),[y,b]=(0,o.useState)(""),[j,v]=(0,o.useState)(null),[F,S]=(0,o.useState)([]),[w,A]=(0,o.useState)([]),[B,k]=(0,o.useState)([]),[C,E]=(0,o.useState)({}),[_,z]=(0,o.useState)(!1);(0,o.useEffect)(()=>{if(!t)return;const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`};fetch(`/api/import/stats?restaurant_id=${t}`,{headers:e}).then(e=>e.json()).then(e=>{e.success&&v(e.data)}).catch(()=>{}),fetch(`/api/import/history?restaurant_id=${t}`,{headers:e}).then(e=>e.json()).then(e=>{e.success&&S(e.data||[])}).catch(()=>{}),fetch(`/api/menu?restaurant_id=${t}&excludeImage=true`,{headers:e}).then(e=>e.json()).then(e=>{var t;const r=(null===(t=e.data)||void 0===t?void 0:t.items)||[];k(r.map(e=>({id:e.id,name:e.name})))}).catch(()=>{})},[t,g]);const D=()=>{n(null),l(null),h({}),f(null),b(""),A([]),E({})},T=Object.values(d).filter(e=>e).length;return(0,c.jsxs)("div",{children:[j&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Current Data in Your Restaurant"}),(0,c.jsx)("p",{style:{color:"#6B7C93",fontSize:"13px",margin:"4px 0 16px"},children:"Data currently registered in the system. Import will add order history to these."}),(0,c.jsx)("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[{label:"Categories",value:j.categories,color:"#635BFF"},{label:"Menu Items",value:j.menuItems,color:"#10B981"},{label:"Option Groups",value:j.options,color:"#8B5CF6"},{label:"Orders",value:j.orders,color:"#F59E0B"}].map(e=>(0,c.jsxs)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",flex:"1",minWidth:"110px"},children:[(0,c.jsx)("div",{style:{fontSize:"22px",fontWeight:700,color:e.color},children:e.value.toLocaleString()}),(0,c.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93",marginTop:"2px"},children:e.label})]},e.label))})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Import Order History"}),(0,c.jsx)("p",{style:{color:"#6B7C93",margin:"4px 0 20px",fontSize:"14px",lineHeight:"1.6"},children:"Upload order history from your previous POS system. The system will automatically match item names to your registered menu. Amounts are imported as-is from your CSV (no recalculation)."}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"24px"},children:[(0,c.jsxs)("div",{style:{padding:"12px 16px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#065F46",marginBottom:"6px"},children:"Summary Format"}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#047857",lineHeight:"1.6"},children:["1 row = 1 order",(0,c.jsx)("br",{}),"Date, Total, Payment Method"]})]}),(0,c.jsxs)("div",{style:{padding:"12px 16px",background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#075985",marginBottom:"6px"},children:"Detail Format"}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#0369A1",lineHeight:"1.6"},children:["1 row = 1 item",(0,c.jsx)("br",{}),"Date, Item Name, Qty, Price"]})]})]}),!g&&(0,c.jsx)("div",{style:{marginBottom:"20px"},children:(0,c.jsxs)("label",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 32px",border:"2px dashed #D1D5DB",borderRadius:"8px",cursor:"pointer",background:i?"#F5F3FF":"#FAFBFC",borderColor:i?"#635BFF":"#D1D5DB"},children:[(0,c.jsx)("input",{type:"file",accept:".csv",onChange:async e=>{var t;const r=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!r)return;n(r),l(null),f(null),b(""),A([]);const o=new FormData;o.append("file",r),o.append("type","orders");try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/import/preview",{method:"POST",headers:{Authorization:`Bearer ${e}`},body:o}),r=await t.json();r.success?(l(r.data),h(r.data.autoMapping||{})):b(r.message||"Failed to parse CSV")}catch{b("Failed to upload file")}},style:{display:"none"}}),(0,c.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",textAlign:"center"},children:i?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"20px",marginBottom:"8px"},children:"\ud83d\udcc4"}),(0,c.jsx)("strong",{style:{color:"#374151"},children:i.name}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"4px"},children:[(i.size/1024).toFixed(1)," KB \u2014 Click to change"]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"20px",marginBottom:"8px"},children:"\ud83d\udce4"}),(0,c.jsx)("strong",{style:{color:"#374151"},children:"Click to upload CSV file"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"4px"},children:"Any column order. Max 5MB."})]})})]})}),y&&(0,c.jsx)("div",{style:{padding:"12px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",marginBottom:"16px",color:"#991B1B",fontSize:"13px"},children:y}),a&&!g&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{style:{marginBottom:"16px",padding:"10px 14px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"6px",fontSize:"13px",color:"#065F46"},children:[(0,c.jsxs)("strong",{children:[a.totalRows," rows"]})," found","detail"===a.format&&" (detail format \u2014 items grouped into orders)","summary"===a.format&&" (summary format \u2014 1 row per order)"]}),(0,c.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"4px"},children:"Column Mapping"}),(0,c.jsxs)("p",{style:{fontSize:"12px",color:"#9CA3AF",margin:"0 0 12px"},children:["We auto-detected ",T," columns. Adjust if needed."]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px",alignItems:"center",marginBottom:"8px",fontSize:"11px",color:"#9CA3AF",fontWeight:600,textTransform:"uppercase"},children:[(0,c.jsx)("div",{children:"Your CSV Column"}),(0,c.jsx)("div",{}),(0,c.jsx)("div",{children:"System Field"})]}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center"},children:a.headers.map(e=>(0,c.jsxs)(o.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:500,padding:"6px 0"},children:e}),(0,c.jsx)("div",{style:{color:d[e]?"#10B981":"#D1D5DB",fontSize:"16px"},children:"\u2192"}),(0,c.jsxs)("select",{value:d[e]||"",onChange:t=>h(r=>({...r,[e]:t.target.value})),style:{padding:"6px 10px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"13px",background:d[e]?"#ECFDF5":"#fff",color:d[e]?"#065F46":"#6B7280"},children:[(0,c.jsx)("option",{value:"",children:"-- Skip --"}),(0,c.jsx)("option",{value:"date",children:"Order Date"}),(0,c.jsx)("option",{value:"total_amount",children:"Total Amount"}),(0,c.jsx)("option",{value:"payment_method",children:"Payment Method"}),(0,c.jsx)("option",{value:"order_type",children:"Order Type"}),(0,c.jsx)("option",{value:"item_name",children:"Item Name"}),(0,c.jsx)("option",{value:"quantity",children:"Quantity"}),(0,c.jsx)("option",{value:"unit_price",children:"Unit Price"})]})]},e))})]}),(0,c.jsxs)("div",{style:{marginBottom:"20px",overflowX:"auto"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"8px"},children:"Data Preview"}),(0,c.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"12px"},children:[(0,c.jsx)("thead",{children:(0,c.jsx)("tr",{children:a.headers.map(e=>(0,c.jsxs)("th",{style:{padding:"8px 10px",background:d[e]?"#F0FDF4":"#F3F4F6",borderBottom:"2px solid #E5E7EB",textAlign:"left",whiteSpace:"nowrap",fontSize:"11px"},children:[e,d[e]&&(0,c.jsxs)("span",{style:{display:"block",fontSize:"10px",color:"#10B981",marginTop:"2px"},children:["\u2192 ",d[e]]})]},e))})}),(0,c.jsx)("tbody",{children:a.rows.map((e,t)=>(0,c.jsx)("tr",{style:{background:t%2===0?"#fff":"#FAFBFC"},children:a.headers.map(t=>(0,c.jsx)("td",{style:{padding:"6px 10px",borderBottom:"1px solid #F3F4F6",maxWidth:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e[t]},t))},t))})]})]}),!Object.values(d).includes("date")&&(0,c.jsx)("div",{style:{padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",marginBottom:"12px",fontSize:"13px",color:"#991B1B"},children:'\u26a0 "Order Date" is required. Please map one of your columns.'}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[(0,c.jsx)("button",{onClick:D,style:{padding:"8px 16px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Cancel"}),(0,c.jsx)("button",{onClick:async()=>{if(!i||!t)return;m(!0),f(null),b(""),A([]);const e=new FormData;e.append("file",i),e.append("mapping",JSON.stringify(d)),e.append("restaurant_id",t.toString()),e.append("format",(null===a||void 0===a?void 0:a.format)||"summary");try{const t=localStorage.getItem("auth_token"),r=await fetch("/api/import/execute-orders",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await r.json();o.success?(f(o.data),o.data.unmatchedNames&&o.data.unmatchedNames.length>0&&A(o.data.unmatchedNames)):b(o.message||"Import failed")}catch{b("Import request failed")}finally{m(!1)}},disabled:u||!Object.values(d).includes("date"),style:{padding:"8px 24px",fontSize:"14px",fontWeight:600,border:"none",borderRadius:"6px",cursor:"pointer",background:u?"#C4C1F7":"#635BFF",color:"#fff",opacity:Object.values(d).includes("date")?1:.5},children:u?"Importing...":`Import ${a.totalRows} Orders`})]})]}),g&&void 0!==g.success&&(0,c.jsxs)("div",{style:{padding:"16px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px",marginBottom:(w.length,"0")},children:[(0,c.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#065F46",marginBottom:"10px"},children:"Import Complete"}),(0,c.jsxs)("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap",fontSize:"14px",color:"#047857",marginBottom:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:g.success})," orders imported"]}),g.failed>0&&(0,c.jsxs)("div",{style:{color:"#991B1B"},children:[(0,c.jsx)("strong",{children:g.failed})," failed"]}),g.matched>0&&(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:g.matched})," items matched"]}),(g.unmatched>0||w.length>0)&&(0,c.jsxs)("div",{style:{color:"#92400E"},children:[(0,c.jsx)("strong",{children:w.length||g.unmatched})," items unmatched"]})]}),(0,c.jsx)("button",{onClick:D,style:{padding:"6px 16px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",cursor:"pointer",color:"#374151"},children:"Import More"})]})]}),w.length>0&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Match Unrecognized Items"}),(0,c.jsx)("p",{style:{color:"#6B7C93",margin:"4px 0 16px",fontSize:"13px",lineHeight:"1.6"},children:'These item names from your CSV didn\'t match any registered menu. Select the correct menu item for each, or leave as "Unknown" for items no longer on your menu.'}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px",alignItems:"center",marginBottom:"8px",fontSize:"11px",color:"#9CA3AF",fontWeight:600,textTransform:"uppercase"},children:[(0,c.jsx)("div",{children:"CSV Item Name"}),(0,c.jsx)("div",{}),(0,c.jsx)("div",{children:"Your Menu Item"})]}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center",marginBottom:"20px"},children:w.map(e=>(0,c.jsxs)(o.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:500,padding:"6px 0"},children:e}),(0,c.jsx)("div",{style:{color:C[e]?"#10B981":"#D1D5DB",fontSize:"16px"},children:"\u2192"}),(0,c.jsxs)("select",{value:C[e]||"",onChange:t=>E(r=>({...r,[e]:parseInt(t.target.value)||0})),style:{padding:"6px 10px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"13px",background:C[e]?"#ECFDF5":"#fff"},children:[(0,c.jsx)("option",{value:"",children:"-- Leave as Unknown --"}),B.map(e=>(0,c.jsx)("option",{value:e.id,children:e.name},e.id))]})]},e))}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"space-between",alignItems:"center"},children:[(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:[Object.values(C).filter(e=>e).length," of ",w.length," items matched"]}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,c.jsx)("button",{onClick:()=>A([]),style:{padding:"6px 14px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Skip"}),Object.values(C).some(e=>e)&&(0,c.jsx)("button",{onClick:async()=>{if(null!==g&&void 0!==g&&g.batchId&&0!==Object.keys(C).length){z(!0);try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/import/apply-matching",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({batch_id:g.batchId,restaurant_id:t,matching:C})}),o=await r.json();o.success&&(A([]),E({}),f(e=>({...e,matched:((null===e||void 0===e?void 0:e.matched)||0)+o.data.matchedCount,unmatched:0})))}catch{}z(!1)}},disabled:_,style:{padding:"6px 20px",fontSize:"13px",fontWeight:600,border:"none",borderRadius:"6px",background:"#635BFF",color:"#fff",cursor:"pointer"},children:_?"Applying...":"Apply Matching"})]})]}),(0,c.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:"6px",fontSize:"12px",color:"#92400E",lineHeight:"1.6"},children:["Don't see the right menu item? ",(0,c.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},onClick:()=>r(t?`/restaurant/${t}/menu`:"#"),children:"Add it in Menu Management"})," first, then come back here."]})]}),F.filter(e=>"orders"===e.import_type).length>0&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Import History"}),(0,c.jsx)("p",{style:{color:"#6B7C93",fontSize:"13px",margin:"4px 0 16px"},children:'Click "Undo" to remove all orders from a specific import.'}),(0,c.jsx)("div",{style:{overflowX:"auto"},children:(0,c.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{style:{background:"#F9FAFB"},children:[(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"left",borderBottom:"1px solid #E5E7EB"},children:"Date"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"left",borderBottom:"1px solid #E5E7EB"},children:"File"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"right",borderBottom:"1px solid #E5E7EB"},children:"Imported"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"right",borderBottom:"1px solid #E5E7EB"},children:"Failed"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"center",borderBottom:"1px solid #E5E7EB"},children:"Status"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"center",borderBottom:"1px solid #E5E7EB"}})]})}),(0,c.jsx)("tbody",{children:F.filter(e=>"orders"===e.import_type).map(e=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",whiteSpace:"nowrap"},children:new Date(e.createdAt).toLocaleString()}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",maxWidth:"200px",overflow:"hidden",textOverflow:"ellipsis"},children:e.file_name||"-"}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"right",color:"#059669",fontWeight:600},children:e.success_count}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"right",color:e.failed_count>0?"#991B1B":"#6B7280"},children:e.failed_count}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"center"},children:(0,c.jsx)("span",{style:{padding:"2px 8px",borderRadius:"10px",fontSize:"11px",fontWeight:600,background:"completed"===e.status?"#ECFDF5":"#FEF2F2",color:"completed"===e.status?"#065F46":"#991B1B"},children:"completed"===e.status?"Active":"Undone"})}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"center"},children:"completed"===e.status&&(0,c.jsx)("button",{onClick:()=>(async e=>{if(window.confirm("Undo this import? All imported orders will be deleted."))try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/import/undo/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});(await r.json()).success&&(S(t=>t.map(t=>t.batch_id===e?{...t,status:"undone"}:t)),f({}))}catch{}})(e.batch_id),style:{padding:"4px 12px",fontSize:"12px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Undo"})})]},e.id))})]})})]})]})};var u=r(5370);const m=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,g=i.Ay.div`
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
`,f=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,y=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,b=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,v=i.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,F=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,S=i.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,w=i.Ay.input`
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

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,A=i.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,B=i.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,k=i.Ay.small`
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,C=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,E=i.Ay.button`
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
`,_=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: #635BFF;
  border: 1px solid #635BFF;

  &:hover {
    background: #F0F4FF;
  }
`,z=(i.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`),D=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: #F3F4F6;
  color: #374151;
  border: none;
  transition: all 0.15s;

  &:hover {
    background: #E5E7EB;
  }
`,T=i.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,I=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,$=i.Ay.div`
  flex: 1;
  min-width: 0;
`,O=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 2px;
`,R=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
`,M=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 16px;
`,N=i.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${e=>e.checked?"#635BFF":"#D1D5DB"};
  border-radius: 24px;
  transition: 0.2s;

  &::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: ${e=>e.checked?"23px":"3px"};
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.2s;
  }
`,P=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,W=i.Ay.div`
  margin-top: 28px;
`,U=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 24px 0;
  line-height: 1.5;
`,H=i.Ay.div`
  background: #F0F4FF;
  border: 1px solid #D6E0FF;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #425466;
  line-height: 1.5;
`,L=i.Ay.div`
  flex: 1;
`,Y=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,V=i.Ay.a`
  color: #635BFF;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`,G=()=>{const{user:e}=(0,d.As)(),{restaurantId:t}=(0,s.g)(),[r,i]=(0,l.M)("preferences"),[p,x]=(0,o.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:""}),[G,J]=(0,o.useState)({}),[q,K]=(0,o.useState)([]),[Q,X]=(0,o.useState)(!1),[Z,ee]=(0,o.useState)(!1),te=(0,o.useRef)(new Map),re=(0,o.useRef)(null),oe=(0,o.useRef)({}),[ie,ne]=(0,o.useState)(!1),[se,ae]=(0,o.useState)(""),[le,de]=(0,o.useState)(!1),[ce,pe]=(0,o.useState)(!1),[xe,he]=(0,o.useState)({success:!1,text:""}),ue=(0,o.useCallback)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]),{entityType:me,entityId:ge}=(0,o.useMemo)(()=>ue(),[ue]),fe=(0,o.useCallback)(async()=>{ee(!0);try{const e=await fetch(`/api/notification-settings/${me}/${ge}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();x({email_enabled:t.email_enabled||!1,smtp_host:t.smtp_host||"",smtp_port:t.smtp_port||587,smtp_secure:t.smtp_secure||!1,smtp_user:t.smtp_user||"",smtp_password:t.smtp_password||"",from_email:t.from_email||"",from_name:t.from_name||"",reply_to_email:t.reply_to_email||""})}}catch(e){console.error("Failed to load SMTP settings:",e)}finally{ee(!1)}},[me,ge]),ye=(0,o.useCallback)(async()=>{X(!0);try{const e=await fetch("/api/notification-settings/preferences",{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();t.success&&t.data&&(J(t.data.preferences||{}),K(t.data.categories||[]))}}catch(e){console.error("Failed to load preferences:",e)}finally{X(!1)}},[]);(0,o.useEffect)(()=>{e&&(ye(),fe())},[e,ye,fe]);const be=(0,o.useMemo)(()=>{const e={};return q.forEach(t=>{e[t.section]||(e[t.section]=[]),e[t.section].push(t)}),e},[q]);if(!e)return null;const je=async()=>{const e=localStorage.getItem("auth_token");if(!e)throw new Error("No authentication token found. Please log in again.");const t=await fetch(`/api/notification-settings/${me}/${ge}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(p)}),r=await t.json();if(!t.ok)throw new Error(r.error||"Failed to save settings")},ve=async()=>{const e=await fetch("/api/notification-settings/preferences",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({preferences:oe.current})}),t=await e.json();if(!e.ok||!t.success)throw new Error(t.message||"Failed to save preferences")},Fe=e=>{var t;(e=>{oe.current=e,J(e)})({...oe.current,[e]:!oe.current[e]}),null===(t=te.current.get(e))||void 0===t||t.triggerSave()};return Z&&Q?(0,c.jsxs)(m,{children:[(0,c.jsx)(g,{children:(0,c.jsx)(f,{children:"System Settings"})}),(0,c.jsx)(y,{children:(0,c.jsx)(b,{children:"Loading..."})})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(g,{children:(0,c.jsx)(f,{children:"System Settings"})}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(a.tU,{children:[(0,c.jsx)(a.oz,{active:"preferences"===r,onClick:()=>i("preferences"),children:"Notification Preferences"}),(0,c.jsx)(a.oz,{active:"email"===r,onClick:()=>i("email"),children:"Email Setup"}),(0,c.jsx)(a.oz,{active:"import"===r,onClick:()=>i("import"),children:"Import Data"})]}),"preferences"===r&&(0,c.jsxs)(b,{children:[(0,c.jsx)(U,{children:"Choose which notifications you want to receive via email. All notifications are enabled by default."}),(null===e||void 0===e?void 0:e.email)&&(0,c.jsx)(H,{children:(0,c.jsxs)(L,{children:["Notifications will be sent to ",(0,c.jsx)(Y,{children:e.email}),(0,c.jsx)("br",{}),"To change your email, go to ",(0,c.jsx)(V,{href:"/pos/profile",children:"Profile Settings"}),"."]})}),Q?(0,c.jsx)(U,{children:"Loading preferences..."}):0===q.length?(0,c.jsx)(U,{children:"No notification categories available for your role."}):(0,c.jsx)(c.Fragment,{children:Object.entries(be).map((e,t)=>{let[r,i]=e;return(0,c.jsxs)(o.Fragment,{children:[t>0&&(0,c.jsx)(W,{}),(0,c.jsx)(T,{children:r}),i.map(e=>(0,c.jsxs)(I,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:e.label}),(0,c.jsx)(R,{children:e.description})]}),(0,c.jsx)(u.A,{ref:t=>{t?te.current.set(e.key,t):te.current.delete(e.key)},onSave:ve,type:"toggle",children:(0,c.jsxs)(M,{children:[(0,c.jsx)(P,{type:"checkbox",checked:!1!==G[e.key],onChange:()=>Fe(e.key)}),(0,c.jsx)(N,{checked:!1!==G[e.key]})]})})]},e.key))]},r)})})]}),"email"===r&&(0,c.jsxs)(b,{children:[(0,c.jsx)(U,{children:"By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain."}),(0,c.jsxs)(B,{children:[(0,c.jsx)(u.A,{ref:re,onSave:je,type:"toggle",children:(0,c.jsx)(A,{type:"checkbox",checked:p.email_enabled,onChange:e=>{var t;x({...p,email_enabled:e.target.checked}),null===(t=re.current)||void 0===t||t.triggerSave()}})}),"Enable Custom Email (SMTP)"]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:[(0,c.jsxs)(F,{children:["SMTP Server",(0,c.jsx)(S,{children:"*"})]}),(0,c.jsx)(u.A,{onSave:je,children:(0,c.jsx)(w,{type:"text",placeholder:"smtp.gmail.com",value:p.smtp_host,onChange:e=>x({...p,smtp_host:e.target.value}),disabled:!p.email_enabled})}),(0,c.jsx)(k,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(F,{children:["SMTP Port",(0,c.jsx)(S,{children:"*"})]}),(0,c.jsx)(u.A,{onSave:je,children:(0,c.jsx)(w,{type:"number",placeholder:"587",value:p.smtp_port,onChange:e=>x({...p,smtp_port:parseInt(e.target.value)}),disabled:!p.email_enabled})}),(0,c.jsx)(k,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(F,{children:["SMTP Username",(0,c.jsx)(S,{children:"*"})]}),(0,c.jsx)(u.A,{onSave:je,children:(0,c.jsx)(w,{type:"email",placeholder:"your-email@gmail.com",value:p.smtp_user,onChange:e=>x({...p,smtp_user:e.target.value}),disabled:!p.email_enabled})}),(0,c.jsx)(k,{children:"Your full email address"})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(F,{children:["SMTP Password",(0,c.jsx)(S,{children:"*"})]}),(0,c.jsx)(u.A,{onSave:je,children:(0,c.jsx)(w,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:p.smtp_password,onChange:e=>x({...p,smtp_password:e.target.value}),disabled:!p.email_enabled})}),(0,c.jsx)(k,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(F,{children:["From Email",(0,c.jsx)(S,{children:"*"})]}),(0,c.jsx)(u.A,{onSave:je,children:(0,c.jsx)(w,{type:"email",placeholder:"noreply@yourstore.com",value:p.from_email,onChange:e=>x({...p,from_email:e.target.value}),disabled:!p.email_enabled})}),(0,c.jsx)(k,{children:"Email address shown to recipients"})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(F,{children:["From Name",(0,c.jsx)(S,{children:"*"})]}),(0,c.jsx)(u.A,{onSave:je,children:(0,c.jsx)(w,{type:"text",placeholder:"Your Store Name",value:p.from_name,onChange:e=>x({...p,from_name:e.target.value}),disabled:!p.email_enabled})}),(0,c.jsx)(k,{children:"Display name shown to recipients"})]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(F,{children:"Reply-To Email (Optional)"}),(0,c.jsx)(u.A,{onSave:je,children:(0,c.jsx)(w,{type:"email",placeholder:"support@yourstore.com",value:p.reply_to_email,onChange:e=>x({...p,reply_to_email:e.target.value}),disabled:!p.email_enabled})}),(0,c.jsx)(k,{children:"Where replies should be sent"})]}),p.email_enabled&&(0,c.jsx)(C,{children:(0,c.jsx)(_,{onClick:()=>{ae(""),ne(!0)},children:"Send Test Email"})})]}),"import"===r&&(0,c.jsx)(h,{restaurantId:(null===e||void 0===e?void 0:e.restaurantId)||t})]})]}),ie&&(0,c.jsxs)(n.aF,{isOpen:!0,onClose:()=>ne(!1),title:"Send Test Email",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(D,{onClick:()=>ne(!1),children:"Cancel"}),(0,c.jsx)(E,{onClick:async()=>{if(se){de(!0);try{const e=await fetch(`/api/notification-settings/${me}/${ge}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:se})}),t=await e.json();ne(!1),e.ok?he({success:!0,text:"Test email sent successfully!"}):he({success:!1,text:t.error||"Failed to send test email"}),pe(!0)}catch(e){ne(!1),he({success:!1,text:"An error occurred while sending test email"}),pe(!0)}finally{de(!1)}}},disabled:le||!se,children:le?"Sending...":"Send"})]}),children:[(0,c.jsx)(z,{children:"Enter the email address where you want to receive the test email."}),(0,c.jsxs)(v,{children:[(0,c.jsx)(F,{children:"Email Address"}),(0,c.jsx)(w,{type:"email",placeholder:"test@example.com",value:se,onChange:e=>ae(e.target.value),autoFocus:!0})]})]}),ce&&(0,c.jsx)(n.aF,{isOpen:!0,onClose:()=>pe(!1),title:xe.success?"Success":"Error",footer:(0,c.jsx)(E,{onClick:()=>pe(!1),children:"OK"}),children:(0,c.jsx)(z,{children:xe.text})})]})}},2653:(e,t,r)=>{r.d(t,{M:()=>n});var o=r(9950),i=r(4492);function n(e){const[t,r]=(0,i.ok)(),n=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,o.useState)(n());return[s,(0,o.useCallback)(e=>{a(e),r({tab:e})},[r])]}},5370:(e,t,r)=>{r.d(t,{A:()=>j});var o=r(9950),i=r(4752),n=r(4414);const s=i.i7`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,a=i.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=i.i7`
  to { transform: rotate(360deg); }
`,d=i.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=i.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?i.AH`${a} 0.3s ease forwards`:i.AH`${s} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=i.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,x=i.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=i.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,u=i.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,m=i.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,g=i.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 700;
`,f=i.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,y=i.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
`,b=(0,o.forwardRef)((e,t)=>{let{children:r,onSave:i,type:s="input",debounceMs:a=2e3,style:l}=e;const[c,b]=(0,o.useState)("idle"),[j,v]=(0,o.useState)(!1),F=(0,o.useRef)(null),S=(0,o.useRef)(null),w=(0,o.useRef)(null),A=(0,o.useRef)(!0),B=(0,o.useRef)(i);B.current=i;const k=(0,o.useCallback)(()=>{F.current&&clearTimeout(F.current),S.current&&clearTimeout(S.current),w.current&&clearTimeout(w.current)},[]),C=2e3!==a?a:"toggle"===s||"select"===s||"list"===s||"image"===s?300:a,E=(0,o.useCallback)(()=>{k(),v(!1),F.current=setTimeout(async()=>{if(A.current){b("saving");try{if(await B.current(),!A.current)return;b("saved"),S.current=setTimeout(()=>{A.current&&(v(!0),w.current=setTimeout(()=>{A.current&&(b("idle"),v(!1))},300))},2e3)}catch{if(!A.current)return;b("error"),S.current=setTimeout(()=>{A.current&&(v(!0),w.current=setTimeout(()=>{A.current&&(b("idle"),v(!1))},300))},4e3)}}},C)},[C,k]);(0,o.useImperativeHandle)(t,()=>({triggerSave:E}),[E]),(0,o.useEffect)(()=>(A.current=!0,()=>{A.current=!1,k()}),[k]);const _=o.Children.map(r,e=>{if(!o.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:o.cloneElement(e,{onChange:function(){t(...arguments),E()}})}),z="saving"===c?(0,n.jsx)(f,{}):"saved"===c?(0,n.jsx)(g,{children:"\u2713"}):"error"===c?(0,n.jsx)(y,{children:"!"}):null,D="select"===s?x:"toggle"===s?h:"image"===s?u:"list"===s?m:p;return(0,n.jsxs)(d,{$type:s,style:l,children:[_,"idle"!==c&&(0,n.jsx)(D,{$fading:j,children:z})]})});b.displayName="AutoSaveField";const j=b}}]);