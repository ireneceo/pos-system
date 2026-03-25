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
`,h=e=>{let{restaurantId:t}=e;const r=(0,s.Zp)(),[i,n]=(0,o.useState)(null),[a,l]=(0,o.useState)(null),[d,h]=(0,o.useState)({}),[m,u]=(0,o.useState)(!1),[g,f]=(0,o.useState)(null),[y,b]=(0,o.useState)(""),[j,F]=(0,o.useState)(null),[v,S]=(0,o.useState)([]),[B,w]=(0,o.useState)([]),[k,A]=(0,o.useState)([]),[C,_]=(0,o.useState)({}),[E,z]=(0,o.useState)(!1);(0,o.useEffect)(()=>{if(!t)return;const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`};fetch(`/api/import/stats?restaurant_id=${t}`,{headers:e}).then(e=>e.json()).then(e=>{e.success&&F(e.data)}).catch(()=>{}),fetch(`/api/import/history?restaurant_id=${t}`,{headers:e}).then(e=>e.json()).then(e=>{e.success&&S(e.data||[])}).catch(()=>{}),fetch(`/api/menu?restaurant_id=${t}&excludeImage=true`,{headers:e}).then(e=>e.json()).then(e=>{var t;const r=(null===(t=e.data)||void 0===t?void 0:t.items)||[];A(r.map(e=>({id:e.id,name:e.name})))}).catch(()=>{})},[t,g]);const D=()=>{n(null),l(null),h({}),f(null),b(""),w([]),_({})},I=Object.values(d).filter(e=>e).length;return(0,c.jsxs)("div",{children:[j&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Current Data in Your Restaurant"}),(0,c.jsx)("p",{style:{color:"#6B7C93",fontSize:"13px",margin:"4px 0 16px"},children:"Data currently registered in the system. Import will add order history to these."}),(0,c.jsx)("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[{label:"Categories",value:j.categories,color:"#635BFF"},{label:"Menu Items",value:j.menuItems,color:"#10B981"},{label:"Option Groups",value:j.options,color:"#8B5CF6"},{label:"Orders",value:j.orders,color:"#F59E0B"}].map(e=>(0,c.jsxs)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",flex:"1",minWidth:"110px"},children:[(0,c.jsx)("div",{style:{fontSize:"22px",fontWeight:700,color:e.color},children:e.value.toLocaleString()}),(0,c.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93",marginTop:"2px"},children:e.label})]},e.label))})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Import Order History"}),(0,c.jsx)("p",{style:{color:"#6B7C93",margin:"4px 0 20px",fontSize:"14px",lineHeight:"1.6"},children:"Upload order history from your previous POS system. The system will automatically match item names to your registered menu. Amounts are imported as-is from your CSV (no recalculation)."}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"24px"},children:[(0,c.jsxs)("div",{style:{padding:"12px 16px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#065F46",marginBottom:"6px"},children:"Summary Format"}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#047857",lineHeight:"1.6"},children:["1 row = 1 order",(0,c.jsx)("br",{}),"Date, Total, Payment Method"]})]}),(0,c.jsxs)("div",{style:{padding:"12px 16px",background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#075985",marginBottom:"6px"},children:"Detail Format"}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#0369A1",lineHeight:"1.6"},children:["1 row = 1 item",(0,c.jsx)("br",{}),"Date, Item Name, Qty, Price"]})]})]}),!g&&(0,c.jsx)("div",{style:{marginBottom:"20px"},children:(0,c.jsxs)("label",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 32px",border:"2px dashed #D1D5DB",borderRadius:"8px",cursor:"pointer",background:i?"#F5F3FF":"#FAFBFC",borderColor:i?"#635BFF":"#D1D5DB"},children:[(0,c.jsx)("input",{type:"file",accept:".csv",onChange:async e=>{var t;const r=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!r)return;n(r),l(null),f(null),b(""),w([]);const o=new FormData;o.append("file",r),o.append("type","orders");try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/import/preview",{method:"POST",headers:{Authorization:`Bearer ${e}`},body:o}),r=await t.json();r.success?(l(r.data),h(r.data.autoMapping||{})):b(r.message||"Failed to parse CSV")}catch{b("Failed to upload file")}},style:{display:"none"}}),(0,c.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",textAlign:"center"},children:i?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"20px",marginBottom:"8px"},children:"\ud83d\udcc4"}),(0,c.jsx)("strong",{style:{color:"#374151"},children:i.name}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"4px"},children:[(i.size/1024).toFixed(1)," KB \u2014 Click to change"]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"20px",marginBottom:"8px"},children:"\ud83d\udce4"}),(0,c.jsx)("strong",{style:{color:"#374151"},children:"Click to upload CSV file"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"4px"},children:"Any column order. Max 5MB."})]})})]})}),y&&(0,c.jsx)("div",{style:{padding:"12px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",marginBottom:"16px",color:"#991B1B",fontSize:"13px"},children:y}),a&&!g&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{style:{marginBottom:"16px",padding:"10px 14px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"6px",fontSize:"13px",color:"#065F46"},children:[(0,c.jsxs)("strong",{children:[a.totalRows," rows"]})," found","detail"===a.format&&" (detail format \u2014 items grouped into orders)","summary"===a.format&&" (summary format \u2014 1 row per order)"]}),(0,c.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"4px"},children:"Column Mapping"}),(0,c.jsxs)("p",{style:{fontSize:"12px",color:"#9CA3AF",margin:"0 0 12px"},children:["We auto-detected ",I," columns. Adjust if needed."]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px",alignItems:"center",marginBottom:"8px",fontSize:"11px",color:"#9CA3AF",fontWeight:600,textTransform:"uppercase"},children:[(0,c.jsx)("div",{children:"Your CSV Column"}),(0,c.jsx)("div",{}),(0,c.jsx)("div",{children:"System Field"})]}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center"},children:a.headers.map(e=>(0,c.jsxs)(o.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:500,padding:"6px 0"},children:e}),(0,c.jsx)("div",{style:{color:d[e]?"#10B981":"#D1D5DB",fontSize:"16px"},children:"\u2192"}),(0,c.jsxs)("select",{value:d[e]||"",onChange:t=>h(r=>({...r,[e]:t.target.value})),style:{padding:"6px 10px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"13px",background:d[e]?"#ECFDF5":"#fff",color:d[e]?"#065F46":"#6B7280"},children:[(0,c.jsx)("option",{value:"",children:"-- Skip --"}),(0,c.jsx)("option",{value:"date",children:"Order Date"}),(0,c.jsx)("option",{value:"total_amount",children:"Total Amount"}),(0,c.jsx)("option",{value:"payment_method",children:"Payment Method"}),(0,c.jsx)("option",{value:"order_type",children:"Order Type"}),(0,c.jsx)("option",{value:"item_name",children:"Item Name"}),(0,c.jsx)("option",{value:"quantity",children:"Quantity"}),(0,c.jsx)("option",{value:"unit_price",children:"Unit Price"})]})]},e))})]}),(0,c.jsxs)("div",{style:{marginBottom:"20px",overflowX:"auto"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"8px"},children:"Data Preview"}),(0,c.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"12px"},children:[(0,c.jsx)("thead",{children:(0,c.jsx)("tr",{children:a.headers.map(e=>(0,c.jsxs)("th",{style:{padding:"8px 10px",background:d[e]?"#F0FDF4":"#F3F4F6",borderBottom:"2px solid #E5E7EB",textAlign:"left",whiteSpace:"nowrap",fontSize:"11px"},children:[e,d[e]&&(0,c.jsxs)("span",{style:{display:"block",fontSize:"10px",color:"#10B981",marginTop:"2px"},children:["\u2192 ",d[e]]})]},e))})}),(0,c.jsx)("tbody",{children:a.rows.map((e,t)=>(0,c.jsx)("tr",{style:{background:t%2===0?"#fff":"#FAFBFC"},children:a.headers.map(t=>(0,c.jsx)("td",{style:{padding:"6px 10px",borderBottom:"1px solid #F3F4F6",maxWidth:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e[t]},t))},t))})]})]}),!Object.values(d).includes("date")&&(0,c.jsx)("div",{style:{padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",marginBottom:"12px",fontSize:"13px",color:"#991B1B"},children:'\u26a0 "Order Date" is required. Please map one of your columns.'}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[(0,c.jsx)("button",{onClick:D,style:{padding:"8px 16px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Cancel"}),(0,c.jsx)("button",{onClick:async()=>{if(!i||!t)return;u(!0),f(null),b(""),w([]);const e=new FormData;e.append("file",i),e.append("mapping",JSON.stringify(d)),e.append("restaurant_id",t.toString()),e.append("format",(null===a||void 0===a?void 0:a.format)||"summary");try{const t=localStorage.getItem("auth_token"),r=await fetch("/api/import/execute-orders",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await r.json();o.success?(f(o.data),o.data.unmatchedNames&&o.data.unmatchedNames.length>0&&w(o.data.unmatchedNames)):b(o.message||"Import failed")}catch{b("Import request failed")}finally{u(!1)}},disabled:m||!Object.values(d).includes("date"),style:{padding:"8px 24px",fontSize:"14px",fontWeight:600,border:"none",borderRadius:"6px",cursor:"pointer",background:m?"#C4C1F7":"#635BFF",color:"#fff",opacity:Object.values(d).includes("date")?1:.5},children:m?"Importing...":`Import ${a.totalRows} Orders`})]})]}),g&&void 0!==g.success&&(0,c.jsxs)("div",{style:{padding:"16px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px",marginBottom:(B.length,"0")},children:[(0,c.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#065F46",marginBottom:"10px"},children:"Import Complete"}),(0,c.jsxs)("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap",fontSize:"14px",color:"#047857",marginBottom:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:g.success})," orders imported"]}),g.failed>0&&(0,c.jsxs)("div",{style:{color:"#991B1B"},children:[(0,c.jsx)("strong",{children:g.failed})," failed"]}),g.matched>0&&(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:g.matched})," items matched"]}),(g.unmatched>0||B.length>0)&&(0,c.jsxs)("div",{style:{color:"#92400E"},children:[(0,c.jsx)("strong",{children:B.length||g.unmatched})," items unmatched"]})]}),(0,c.jsx)("button",{onClick:D,style:{padding:"6px 16px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",cursor:"pointer",color:"#374151"},children:"Import More"})]})]}),B.length>0&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Match Unrecognized Items"}),(0,c.jsx)("p",{style:{color:"#6B7C93",margin:"4px 0 16px",fontSize:"13px",lineHeight:"1.6"},children:'These item names from your CSV didn\'t match any registered menu. Select the correct menu item for each, or leave as "Unknown" for items no longer on your menu.'}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px",alignItems:"center",marginBottom:"8px",fontSize:"11px",color:"#9CA3AF",fontWeight:600,textTransform:"uppercase"},children:[(0,c.jsx)("div",{children:"CSV Item Name"}),(0,c.jsx)("div",{}),(0,c.jsx)("div",{children:"Your Menu Item"})]}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center",marginBottom:"20px"},children:B.map(e=>(0,c.jsxs)(o.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:500,padding:"6px 0"},children:e}),(0,c.jsx)("div",{style:{color:C[e]?"#10B981":"#D1D5DB",fontSize:"16px"},children:"\u2192"}),(0,c.jsxs)("select",{value:C[e]||"",onChange:t=>_(r=>({...r,[e]:parseInt(t.target.value)||0})),style:{padding:"6px 10px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"13px",background:C[e]?"#ECFDF5":"#fff"},children:[(0,c.jsx)("option",{value:"",children:"-- Leave as Unknown --"}),k.map(e=>(0,c.jsx)("option",{value:e.id,children:e.name},e.id))]})]},e))}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"space-between",alignItems:"center"},children:[(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:[Object.values(C).filter(e=>e).length," of ",B.length," items matched"]}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,c.jsx)("button",{onClick:()=>w([]),style:{padding:"6px 14px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Skip"}),Object.values(C).some(e=>e)&&(0,c.jsx)("button",{onClick:async()=>{if(null!==g&&void 0!==g&&g.batchId&&0!==Object.keys(C).length){z(!0);try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/import/apply-matching",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({batch_id:g.batchId,restaurant_id:t,matching:C})}),o=await r.json();o.success&&(w([]),_({}),f(e=>({...e,matched:((null===e||void 0===e?void 0:e.matched)||0)+o.data.matchedCount,unmatched:0})))}catch{}z(!1)}},disabled:E,style:{padding:"6px 20px",fontSize:"13px",fontWeight:600,border:"none",borderRadius:"6px",background:"#635BFF",color:"#fff",cursor:"pointer"},children:E?"Applying...":"Apply Matching"})]})]}),(0,c.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:"6px",fontSize:"12px",color:"#92400E",lineHeight:"1.6"},children:["Don't see the right menu item? ",(0,c.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},onClick:()=>r(t?`/restaurant/${t}/menu`:"#"),children:"Add it in Menu Management"})," first, then come back here."]})]}),v.filter(e=>"orders"===e.import_type).length>0&&(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:"Import History"}),(0,c.jsx)("p",{style:{color:"#6B7C93",fontSize:"13px",margin:"4px 0 16px"},children:'Click "Undo" to remove all orders from a specific import.'}),(0,c.jsx)("div",{style:{overflowX:"auto"},children:(0,c.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{style:{background:"#F9FAFB"},children:[(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"left",borderBottom:"1px solid #E5E7EB"},children:"Date"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"left",borderBottom:"1px solid #E5E7EB"},children:"File"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"right",borderBottom:"1px solid #E5E7EB"},children:"Imported"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"right",borderBottom:"1px solid #E5E7EB"},children:"Failed"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"center",borderBottom:"1px solid #E5E7EB"},children:"Status"}),(0,c.jsx)("th",{style:{padding:"8px 12px",textAlign:"center",borderBottom:"1px solid #E5E7EB"}})]})}),(0,c.jsx)("tbody",{children:v.filter(e=>"orders"===e.import_type).map(e=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",whiteSpace:"nowrap"},children:new Date(e.createdAt).toLocaleString()}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",maxWidth:"200px",overflow:"hidden",textOverflow:"ellipsis"},children:e.file_name||"-"}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"right",color:"#059669",fontWeight:600},children:e.success_count}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"right",color:e.failed_count>0?"#991B1B":"#6B7280"},children:e.failed_count}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"center"},children:(0,c.jsx)("span",{style:{padding:"2px 8px",borderRadius:"10px",fontSize:"11px",fontWeight:600,background:"completed"===e.status?"#ECFDF5":"#FEF2F2",color:"completed"===e.status?"#065F46":"#991B1B"},children:"completed"===e.status?"Active":"Undone"})}),(0,c.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"center"},children:"completed"===e.status&&(0,c.jsx)("button",{onClick:()=>(async e=>{if(window.confirm("Undo this import? All imported orders will be deleted."))try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/import/undo/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});(await r.json()).success&&(S(t=>t.map(t=>t.batch_id===e?{...t,status:"undone"}:t)),f({}))}catch{}})(e.batch_id),style:{padding:"4px 12px",fontSize:"12px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Undo"})})]},e.id))})]})})]})]})},m=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,u=i.Ay.div`
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
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,f=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,y=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,b=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=i.Ay.div`
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
`,v=i.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,S=i.Ay.input`
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
`,B=i.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,w=i.Ay.label`
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
`,A=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,C=i.Ay.button`
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
`,E=i.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,z=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`,D=i.Ay.button`
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
`,I=i.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,T=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,O=i.Ay.div`
  flex: 1;
  min-width: 0;
`,$=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 2px;
`,N=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
`,M=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 16px;
`,P=i.Ay.span`
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
`,R=i.Ay.input`
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
`,L=i.Ay.div`
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
`,H=(i.Ay.span`
  font-size: 18px;
  flex-shrink: 0;
`,i.Ay.div`
  flex: 1;
`),V=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,Y=i.Ay.a`
  color: #635BFF;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`,G=()=>{const{user:e}=(0,d.As)(),{restaurantId:t}=(0,s.g)(),[r,i]=(0,l.M)("preferences"),[p,x]=(0,o.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:""}),[G,J]=(0,o.useState)({}),[q,K]=(0,o.useState)([]),[Q,X]=(0,o.useState)(!1),[Z,ee]=(0,o.useState)(!1),[te,re]=(0,o.useState)(!1),[oe,ie]=(0,o.useState)(!1),[ne,se]=(0,o.useState)(null),[ae,le]=(0,o.useState)(null),[de,ce]=(0,o.useState)(!1),[pe,xe]=(0,o.useState)(""),[he,me]=(0,o.useState)(!1),[ue,ge]=(0,o.useState)(!1),[fe,ye]=(0,o.useState)({success:!1,text:""}),be=(0,o.useCallback)(()=>t?{entityType:"restaurant",entityId:Number(t)}:e?"Restaurant Admin"===e.role||"Staff"===e.role?{entityType:"restaurant",entityId:Number(e.restaurantId)||1}:"Brand General"===e.role||"Brand Manager"===e.role?{entityType:"brand",entityId:Number(e.brand_id)||1}:"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?{entityType:"foodcourt",entityId:Number(e.foodcourt_id)||1}:"System Admin"===e.role?{entityType:"admin",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:Number(e.id)||1}:{entityType:"restaurant",entityId:1},[e,t]),{entityType:je,entityId:Fe}=(0,o.useMemo)(()=>be(),[be]),ve=(0,o.useCallback)(async()=>{re(!0);try{const e=await fetch(`/api/notification-settings/${je}/${Fe}`,{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();x({email_enabled:t.email_enabled||!1,smtp_host:t.smtp_host||"",smtp_port:t.smtp_port||587,smtp_secure:t.smtp_secure||!1,smtp_user:t.smtp_user||"",smtp_password:t.smtp_password||"",from_email:t.from_email||"",from_name:t.from_name||"",reply_to_email:t.reply_to_email||""})}}catch(e){console.error("Failed to load SMTP settings:",e)}finally{re(!1)}},[je,Fe]),Se=(0,o.useCallback)(async()=>{X(!0);try{const e=await fetch("/api/notification-settings/preferences",{headers:{Authorization:`Bearer ${localStorage.getItem("auth_token")}`}});if(e.ok){const t=await e.json();t.success&&t.data&&(J(t.data.preferences||{}),K(t.data.categories||[]))}}catch(e){console.error("Failed to load preferences:",e)}finally{X(!1)}},[]);(0,o.useEffect)(()=>{e&&(Se(),ve())},[e,Se,ve]);const Be=(0,o.useMemo)(()=>{const e={};return q.forEach(t=>{e[t.section]||(e[t.section]=[]),e[t.section].push(t)}),e},[q]);if(!e)return null;return te&&Q?(0,c.jsxs)(m,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(g,{children:"System Settings"})}),(0,c.jsx)(f,{children:(0,c.jsx)(y,{children:"Loading..."})})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(g,{children:"System Settings"})}),(0,c.jsxs)(f,{children:[(0,c.jsxs)(a.tU,{children:[(0,c.jsx)(a.oz,{active:"preferences"===r,onClick:()=>i("preferences"),children:"Notification Preferences"}),(0,c.jsx)(a.oz,{active:"email"===r,onClick:()=>i("email"),children:"Email Setup"}),(0,c.jsx)(a.oz,{active:"import"===r,onClick:()=>i("import"),children:"Import Data"})]}),"preferences"===r&&(0,c.jsxs)(y,{children:[(0,c.jsx)(U,{children:"Choose which notifications you want to receive via email. All notifications are enabled by default."}),(null===e||void 0===e?void 0:e.email)&&(0,c.jsx)(L,{children:(0,c.jsxs)(H,{children:["Notifications will be sent to ",(0,c.jsx)(V,{children:e.email}),(0,c.jsx)("br",{}),"To change your email, go to ",(0,c.jsx)(Y,{href:"/pos/profile",children:"Profile Settings"}),"."]})}),Q?(0,c.jsx)(U,{children:"Loading preferences..."}):0===q.length?(0,c.jsx)(U,{children:"No notification categories available for your role."}):(0,c.jsxs)(c.Fragment,{children:[Object.entries(Be).map((e,t)=>{let[r,i]=e;return(0,c.jsxs)(o.Fragment,{children:[t>0&&(0,c.jsx)(W,{}),(0,c.jsx)(I,{children:r}),i.map(e=>(0,c.jsxs)(T,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)($,{children:e.label}),(0,c.jsx)(N,{children:e.description})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(R,{type:"checkbox",checked:!1!==G[e.key],onChange:()=>{return t=e.key,void J(e=>({...e,[t]:!e[t]}));var t}}),(0,c.jsx)(P,{checked:!1!==G[e.key]})]})]},e.key))]},r)}),(0,c.jsx)(A,{children:(0,c.jsx)(C,{onClick:async()=>{ee(!0),le(null);try{const e=await fetch("/api/notification-settings/preferences",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({preferences:G})}),t=await e.json();e.ok&&t.success?le({type:"success",text:"Notification preferences saved"}):le({type:"error",text:t.message||"Failed to save preferences"})}catch(e){console.error("Prefs save error:",e),le({type:"error",text:"An error occurred while saving preferences"})}finally{ee(!1)}},disabled:Z,children:Z?"Saving...":"Save Preferences"})}),ae&&(0,c.jsx)(E,{type:ae.type,children:ae.text})]})]}),"email"===r&&(0,c.jsxs)(y,{children:[(0,c.jsx)(U,{children:"By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain."}),(0,c.jsxs)(w,{children:[(0,c.jsx)(B,{type:"checkbox",checked:p.email_enabled,onChange:e=>x({...p,email_enabled:e.target.checked})}),"Enable Custom Email (SMTP)"]}),(0,c.jsxs)(b,{children:[(0,c.jsxs)(j,{children:[(0,c.jsxs)(F,{children:["SMTP Server",(0,c.jsx)(v,{children:"*"})]}),(0,c.jsx)(S,{type:"text",placeholder:"smtp.gmail.com",value:p.smtp_host,onChange:e=>x({...p,smtp_host:e.target.value}),disabled:!p.email_enabled}),(0,c.jsx)(k,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(F,{children:["SMTP Port",(0,c.jsx)(v,{children:"*"})]}),(0,c.jsx)(S,{type:"number",placeholder:"587",value:p.smtp_port,onChange:e=>x({...p,smtp_port:parseInt(e.target.value)}),disabled:!p.email_enabled}),(0,c.jsx)(k,{children:"Typically 587 (TLS) or 465 (SSL)"})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(F,{children:["SMTP Username",(0,c.jsx)(v,{children:"*"})]}),(0,c.jsx)(S,{type:"email",placeholder:"your-email@gmail.com",value:p.smtp_user,onChange:e=>x({...p,smtp_user:e.target.value}),disabled:!p.email_enabled}),(0,c.jsx)(k,{children:"Your full email address"})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(F,{children:["SMTP Password",(0,c.jsx)(v,{children:"*"})]}),(0,c.jsx)(S,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:p.smtp_password,onChange:e=>x({...p,smtp_password:e.target.value}),disabled:!p.email_enabled}),(0,c.jsx)(k,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(F,{children:["From Email",(0,c.jsx)(v,{children:"*"})]}),(0,c.jsx)(S,{type:"email",placeholder:"noreply@yourstore.com",value:p.from_email,onChange:e=>x({...p,from_email:e.target.value}),disabled:!p.email_enabled}),(0,c.jsx)(k,{children:"Email address shown to recipients"})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(F,{children:["From Name",(0,c.jsx)(v,{children:"*"})]}),(0,c.jsx)(S,{type:"text",placeholder:"Your Store Name",value:p.from_name,onChange:e=>x({...p,from_name:e.target.value}),disabled:!p.email_enabled}),(0,c.jsx)(k,{children:"Display name shown to recipients"})]})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(F,{children:"Reply-To Email (Optional)"}),(0,c.jsx)(S,{type:"email",placeholder:"support@yourstore.com",value:p.reply_to_email,onChange:e=>x({...p,reply_to_email:e.target.value}),disabled:!p.email_enabled}),(0,c.jsx)(k,{children:"Where replies should be sent"})]}),(0,c.jsxs)(A,{children:[(0,c.jsx)(C,{onClick:async()=>{ie(!0),se(null);try{const e=localStorage.getItem("auth_token");if(!e)return se({type:"error",text:"No authentication token found. Please log in again."}),void ie(!1);const t=await fetch(`/api/notification-settings/${je}/${Fe}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(p)}),r=await t.json();t.ok?se({type:"success",text:"Email settings saved successfully"}):se({type:"error",text:r.error||"Failed to save settings"})}catch(e){console.error("Save error:",e),se({type:"error",text:"An error occurred while saving settings"})}finally{ie(!1)}},disabled:oe,children:oe?"Saving...":"Save Settings"}),p.email_enabled&&(0,c.jsx)(_,{onClick:()=>{xe(""),ce(!0)},children:"Send Test Email"})]}),ne&&(0,c.jsx)(E,{type:ne.type,children:ne.text})]}),"import"===r&&(0,c.jsx)(h,{restaurantId:(null===e||void 0===e?void 0:e.restaurantId)||t})]})]}),de&&(0,c.jsxs)(n.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Send Test Email",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(D,{onClick:()=>ce(!1),children:"Cancel"}),(0,c.jsx)(C,{onClick:async()=>{if(pe){me(!0);try{const e=await fetch(`/api/notification-settings/${je}/${Fe}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({testEmail:pe})}),t=await e.json();ce(!1),e.ok?ye({success:!0,text:"Test email sent successfully!"}):ye({success:!1,text:t.error||"Failed to send test email"}),ge(!0)}catch(e){ce(!1),ye({success:!1,text:"An error occurred while sending test email"}),ge(!0)}finally{me(!1)}}},disabled:he||!pe,children:he?"Sending...":"Send"})]}),children:[(0,c.jsx)(z,{children:"Enter the email address where you want to receive the test email."}),(0,c.jsxs)(j,{children:[(0,c.jsx)(F,{children:"Email Address"}),(0,c.jsx)(S,{type:"email",placeholder:"test@example.com",value:pe,onChange:e=>xe(e.target.value),autoFocus:!0})]})]}),ue&&(0,c.jsx)(n.aF,{isOpen:!0,onClose:()=>ge(!1),title:fe.success?"Success":"Error",footer:(0,c.jsx)(C,{onClick:()=>ge(!1),children:"OK"}),children:(0,c.jsx)(z,{children:fe.text})})]})}},2653:(e,t,r)=>{r.d(t,{M:()=>n});var o=r(9950),i=r(4492);function n(e){const[t,r]=(0,i.ok)(),n=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,o.useState)(n());return[s,(0,o.useCallback)(e=>{a(e),r({tab:e})},[r])]}}}]);