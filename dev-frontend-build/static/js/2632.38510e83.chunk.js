"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2632],{2632:(e,t,i)=>{i.r(t),i.d(t,{default:()=>q});var o=i(9950),n=i(4752),r=i(8409),s=i(4492),a=i(2597),l=i(2653),d=i(1367),c=i(9955),p=i(4414);const x=n.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 24px;
  margin-bottom: 24px;
`,h=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px;
`,u=e=>{let{restaurantId:t}=e;const i=(0,s.Zp)(),[n,r]=(0,o.useState)(null),[a,l]=(0,o.useState)(null),[d,u]=(0,o.useState)({}),[m,g]=(0,o.useState)(!1),[f,y]=(0,o.useState)(null),[j,b]=(0,o.useState)(""),[v,F]=(0,o.useState)(null),[S,A]=(0,o.useState)([]),[B,w]=(0,o.useState)([]),[C,k]=(0,o.useState)([]),[E,z]=(0,o.useState)({}),[_,D]=(0,o.useState)(!1);(0,o.useEffect)(()=>{if(!t)return;const e={Authorization:`Bearer ${(0,c.c4)()}`};fetch(`/api/import/stats?restaurant_id=${t}`,{headers:e}).then(e=>e.json()).then(e=>{e.success&&F(e.data)}).catch(()=>{}),fetch(`/api/import/history?restaurant_id=${t}`,{headers:e}).then(e=>e.json()).then(e=>{e.success&&A(e.data||[])}).catch(()=>{}),fetch(`/api/menu?restaurant_id=${t}&excludeImage=true`,{headers:e}).then(e=>e.json()).then(e=>{var t;const i=(null===(t=e.data)||void 0===t?void 0:t.items)||[];k(i.map(e=>({id:e.id,name:e.name})))}).catch(()=>{})},[t,f]);const T=()=>{r(null),l(null),u({}),y(null),b(""),w([]),z({})},I=Object.values(d).filter(e=>e).length;return(0,p.jsxs)("div",{children:[v&&(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{children:"Current Data in Your Restaurant"}),(0,p.jsx)("p",{style:{color:"#6B7C93",fontSize:"13px",margin:"4px 0 16px"},children:"Data currently registered in the system. Import will add order history to these."}),(0,p.jsx)("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[{label:"Categories",value:v.categories,color:"#635BFF"},{label:"Menu Items",value:v.menuItems,color:"#10B981"},{label:"Option Groups",value:v.options,color:"#8B5CF6"},{label:"Orders",value:v.orders,color:"#F59E0B"}].map(e=>(0,p.jsxs)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",flex:"1",minWidth:"110px"},children:[(0,p.jsx)("div",{style:{fontSize:"22px",fontWeight:700,color:e.color},children:e.value.toLocaleString()}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93",marginTop:"2px"},children:e.label})]},e.label))})]}),(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{children:"Import Order History"}),(0,p.jsx)("p",{style:{color:"#6B7C93",margin:"4px 0 20px",fontSize:"14px",lineHeight:"1.6"},children:"Upload order history from your previous POS system. The system will automatically match item names to your registered menu. Amounts are imported as-is from your CSV (no recalculation)."}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"24px"},children:[(0,p.jsxs)("div",{style:{padding:"12px 16px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#065F46",marginBottom:"6px"},children:"Summary Format"}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#047857",lineHeight:"1.6"},children:["1 row = 1 order",(0,p.jsx)("br",{}),"Date, Total, Payment Method"]})]}),(0,p.jsxs)("div",{style:{padding:"12px 16px",background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#075985",marginBottom:"6px"},children:"Detail Format"}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#0369A1",lineHeight:"1.6"},children:["1 row = 1 item",(0,p.jsx)("br",{}),"Date, Item Name, Qty, Price"]})]})]}),!f&&(0,p.jsx)("div",{style:{marginBottom:"20px"},children:(0,p.jsxs)("label",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 32px",border:"2px dashed #D1D5DB",borderRadius:"8px",cursor:"pointer",background:n?"#F5F3FF":"#FAFBFC",borderColor:n?"#635BFF":"#D1D5DB"},children:[(0,p.jsx)("input",{type:"file",accept:".csv",onChange:async e=>{var t;const i=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!i)return;r(i),l(null),y(null),b(""),w([]);const o=new FormData;o.append("file",i),o.append("type","orders");try{const e=(0,c.c4)(),t=await fetch("/api/import/preview",{method:"POST",headers:{Authorization:`Bearer ${e}`},body:o}),i=await t.json();i.success?(l(i.data),u(i.data.autoMapping||{})):b(i.message||"Failed to parse CSV")}catch{b("Failed to upload file")}},style:{display:"none"}}),(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",textAlign:"center"},children:n?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"20px",marginBottom:"8px"},children:"\ud83d\udcc4"}),(0,p.jsx)("strong",{style:{color:"#374151"},children:n.name}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"4px"},children:[(n.size/1024).toFixed(1)," KB \u2014 Click to change"]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"20px",marginBottom:"8px"},children:"\ud83d\udce4"}),(0,p.jsx)("strong",{style:{color:"#374151"},children:"Click to upload CSV file"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginTop:"4px"},children:"Any column order. Max 5MB."})]})})]})}),j&&(0,p.jsx)("div",{style:{padding:"12px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",marginBottom:"16px",color:"#991B1B",fontSize:"13px"},children:j}),a&&!f&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"16px",padding:"10px 14px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"6px",fontSize:"13px",color:"#065F46"},children:[(0,p.jsxs)("strong",{children:[a.totalRows," rows"]})," found","detail"===a.format&&" (detail format \u2014 items grouped into orders)","summary"===a.format&&" (summary format \u2014 1 row per order)"]}),(0,p.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"4px"},children:"Column Mapping"}),(0,p.jsxs)("p",{style:{fontSize:"12px",color:"#9CA3AF",margin:"0 0 12px"},children:["We auto-detected ",I," columns. Adjust if needed."]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px",alignItems:"center",marginBottom:"8px",fontSize:"11px",color:"#9CA3AF",fontWeight:600,textTransform:"uppercase"},children:[(0,p.jsx)("div",{children:"Your CSV Column"}),(0,p.jsx)("div",{}),(0,p.jsx)("div",{children:"System Field"})]}),(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center"},children:a.headers.map(e=>(0,p.jsxs)(o.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:500,padding:"6px 0"},children:e}),(0,p.jsx)("div",{style:{color:d[e]?"#10B981":"#D1D5DB",fontSize:"16px"},children:"\u2192"}),(0,p.jsxs)("select",{value:d[e]||"",onChange:t=>u(i=>({...i,[e]:t.target.value})),style:{padding:"6px 10px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"13px",background:d[e]?"#ECFDF5":"#fff",color:d[e]?"#065F46":"#6B7280"},children:[(0,p.jsx)("option",{value:"",children:"-- Skip --"}),(0,p.jsx)("option",{value:"date",children:"Order Date"}),(0,p.jsx)("option",{value:"total_amount",children:"Total Amount"}),(0,p.jsx)("option",{value:"payment_method",children:"Payment Method"}),(0,p.jsx)("option",{value:"order_type",children:"Order Type"}),(0,p.jsx)("option",{value:"item_name",children:"Item Name"}),(0,p.jsx)("option",{value:"quantity",children:"Quantity"}),(0,p.jsx)("option",{value:"unit_price",children:"Unit Price"})]})]},e))})]}),(0,p.jsxs)("div",{style:{marginBottom:"20px",overflowX:"auto"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#374151",marginBottom:"8px"},children:"Data Preview"}),(0,p.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"12px"},children:[(0,p.jsx)("thead",{children:(0,p.jsx)("tr",{children:a.headers.map(e=>(0,p.jsxs)("th",{style:{padding:"8px 10px",background:d[e]?"#F0FDF4":"#F3F4F6",borderBottom:"2px solid #E5E7EB",textAlign:"left",whiteSpace:"nowrap",fontSize:"11px"},children:[e,d[e]&&(0,p.jsxs)("span",{style:{display:"block",fontSize:"10px",color:"#10B981",marginTop:"2px"},children:["\u2192 ",d[e]]})]},e))})}),(0,p.jsx)("tbody",{children:a.rows.map((e,t)=>(0,p.jsx)("tr",{style:{background:t%2===0?"#fff":"#FAFBFC"},children:a.headers.map(t=>(0,p.jsx)("td",{style:{padding:"6px 10px",borderBottom:"1px solid #F3F4F6",maxWidth:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e[t]},t))},t))})]})]}),!Object.values(d).includes("date")&&(0,p.jsx)("div",{style:{padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",marginBottom:"12px",fontSize:"13px",color:"#991B1B"},children:'\u26a0 "Order Date" is required. Please map one of your columns.'}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[(0,p.jsx)("button",{onClick:T,style:{padding:"8px 16px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Cancel"}),(0,p.jsx)("button",{onClick:async()=>{if(!n||!t)return;g(!0),y(null),b(""),w([]);const e=new FormData;e.append("file",n),e.append("mapping",JSON.stringify(d)),e.append("restaurant_id",t.toString()),e.append("format",(null===a||void 0===a?void 0:a.format)||"summary");try{const t=(0,c.c4)(),i=await fetch("/api/import/execute-orders",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await i.json();o.success?(y(o.data),o.data.unmatchedNames&&o.data.unmatchedNames.length>0&&w(o.data.unmatchedNames)):b(o.message||"Import failed")}catch{b("Import request failed")}finally{g(!1)}},disabled:m||!Object.values(d).includes("date"),style:{padding:"8px 24px",fontSize:"14px",fontWeight:600,border:"none",borderRadius:"6px",cursor:"pointer",background:m?"#C4C1F7":"#635BFF",color:"#fff",opacity:Object.values(d).includes("date")?1:.5},children:m?"Importing...":`Import ${a.totalRows} Orders`})]})]}),f&&void 0!==f.success&&(0,p.jsxs)("div",{style:{padding:"16px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"8px",marginBottom:(B.length,"0")},children:[(0,p.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#065F46",marginBottom:"10px"},children:"Import Complete"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap",fontSize:"14px",color:"#047857",marginBottom:"12px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("strong",{children:f.success})," orders imported"]}),f.failed>0&&(0,p.jsxs)("div",{style:{color:"#991B1B"},children:[(0,p.jsx)("strong",{children:f.failed})," failed"]}),f.matched>0&&(0,p.jsxs)("div",{children:[(0,p.jsx)("strong",{children:f.matched})," items matched"]}),(f.unmatched>0||B.length>0)&&(0,p.jsxs)("div",{style:{color:"#92400E"},children:[(0,p.jsx)("strong",{children:B.length||f.unmatched})," items unmatched"]})]}),(0,p.jsx)("button",{onClick:T,style:{padding:"6px 16px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",cursor:"pointer",color:"#374151"},children:"Import More"})]})]}),B.length>0&&(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{children:"Match Unrecognized Items"}),(0,p.jsx)("p",{style:{color:"#6B7C93",margin:"4px 0 16px",fontSize:"13px",lineHeight:"1.6"},children:'These item names from your CSV didn\'t match any registered menu. Select the correct menu item for each, or leave as "Unknown" for items no longer on your menu.'}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px",alignItems:"center",marginBottom:"8px",fontSize:"11px",color:"#9CA3AF",fontWeight:600,textTransform:"uppercase"},children:[(0,p.jsx)("div",{children:"CSV Item Name"}),(0,p.jsx)("div",{}),(0,p.jsx)("div",{children:"Your Menu Item"})]}),(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center",marginBottom:"20px"},children:B.map(e=>(0,p.jsxs)(o.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:500,padding:"6px 0"},children:e}),(0,p.jsx)("div",{style:{color:E[e]?"#10B981":"#D1D5DB",fontSize:"16px"},children:"\u2192"}),(0,p.jsxs)("select",{value:E[e]||"",onChange:t=>z(i=>({...i,[e]:parseInt(t.target.value)||0})),style:{padding:"6px 10px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"13px",background:E[e]?"#ECFDF5":"#fff"},children:[(0,p.jsx)("option",{value:"",children:"-- Leave as Unknown --"}),C.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]},e))}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"space-between",alignItems:"center"},children:[(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:[Object.values(E).filter(e=>e).length," of ",B.length," items matched"]}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,p.jsx)("button",{onClick:()=>w([]),style:{padding:"6px 14px",fontSize:"13px",border:"1px solid #D1D5DB",borderRadius:"6px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Skip"}),Object.values(E).some(e=>e)&&(0,p.jsx)("button",{onClick:async()=>{if(null!==f&&void 0!==f&&f.batchId&&0!==Object.keys(E).length){D(!0);try{const e=(0,c.c4)(),i=await fetch("/api/import/apply-matching",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({batch_id:f.batchId,restaurant_id:t,matching:E})}),o=await i.json();o.success&&(w([]),z({}),y(e=>({...e,matched:((null===e||void 0===e?void 0:e.matched)||0)+o.data.matchedCount,unmatched:0})))}catch{}D(!1)}},disabled:_,style:{padding:"6px 20px",fontSize:"13px",fontWeight:600,border:"none",borderRadius:"6px",background:"#635BFF",color:"#fff",cursor:"pointer"},children:_?"Applying...":"Apply Matching"})]})]}),(0,p.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:"6px",fontSize:"12px",color:"#92400E",lineHeight:"1.6"},children:["Don't see the right menu item? ",(0,p.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline"},onClick:()=>i(t?`/restaurant/${t}/menu`:"#"),children:"Add it in Menu Management"})," first, then come back here."]})]}),S.filter(e=>"orders"===e.import_type).length>0&&(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{children:"Import History"}),(0,p.jsx)("p",{style:{color:"#6B7C93",fontSize:"13px",margin:"4px 0 16px"},children:'Click "Undo" to remove all orders from a specific import.'}),(0,p.jsx)("div",{style:{overflowX:"auto"},children:(0,p.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"},children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{style:{background:"#F9FAFB"},children:[(0,p.jsx)("th",{style:{padding:"8px 12px",textAlign:"left",borderBottom:"1px solid #E5E7EB"},children:"Date"}),(0,p.jsx)("th",{style:{padding:"8px 12px",textAlign:"left",borderBottom:"1px solid #E5E7EB"},children:"File"}),(0,p.jsx)("th",{style:{padding:"8px 12px",textAlign:"right",borderBottom:"1px solid #E5E7EB"},children:"Imported"}),(0,p.jsx)("th",{style:{padding:"8px 12px",textAlign:"right",borderBottom:"1px solid #E5E7EB"},children:"Failed"}),(0,p.jsx)("th",{style:{padding:"8px 12px",textAlign:"center",borderBottom:"1px solid #E5E7EB"},children:"Status"}),(0,p.jsx)("th",{style:{padding:"8px 12px",textAlign:"center",borderBottom:"1px solid #E5E7EB"}})]})}),(0,p.jsx)("tbody",{children:S.filter(e=>"orders"===e.import_type).map(e=>(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",whiteSpace:"nowrap"},children:new Date(e.createdAt).toLocaleString()}),(0,p.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",maxWidth:"200px",overflow:"hidden",textOverflow:"ellipsis"},children:e.file_name||"-"}),(0,p.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"right",color:"#059669",fontWeight:600},children:e.success_count}),(0,p.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"right",color:e.failed_count>0?"#991B1B":"#6B7280"},children:e.failed_count}),(0,p.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"center"},children:(0,p.jsx)("span",{style:{padding:"2px 8px",borderRadius:"10px",fontSize:"11px",fontWeight:600,background:"completed"===e.status?"#ECFDF5":"#FEF2F2",color:"completed"===e.status?"#065F46":"#991B1B"},children:"completed"===e.status?"Active":"Undone"})}),(0,p.jsx)("td",{style:{padding:"8px 12px",borderBottom:"1px solid #F3F4F6",textAlign:"center"},children:"completed"===e.status&&(0,p.jsx)("button",{onClick:()=>(async e=>{if(window.confirm("Undo this import? All imported orders will be deleted."))try{const t=(0,c.c4)(),i=await fetch(`/api/import/undo/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});(await i.json()).success&&(A(t=>t.map(t=>t.batch_id===e?{...t,status:"undone"}:t)),y({}))}catch{}})(e.batch_id),style:{padding:"4px 12px",fontSize:"12px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"#fff",color:"#6B7280",cursor:"pointer"},children:"Undo"})})]},e.id))})]})})]})]})};var m=i(5370),g=i(5030);const f=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,y=n.Ay.div`
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
`,j=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,b=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,v=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,F=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,S=n.Ay.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,A=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,B=n.Ay.span`
  color: #EF4444;
  margin-left: 2px;
`,w=n.Ay.input`
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
`,C=n.Ay.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
`,k=n.Ay.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 24px;
`,E=n.Ay.small`
  display: block;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,z=n.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,_=n.Ay.button`
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
`,D=n.Ay.button`
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
`,T=(n.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;

  ${e=>"success"===e.type?"\n    background: #D1FAE5;\n    color: #065F46;\n  ":"\n    background: #FEE2E2;\n    color: #991B1B;\n  "}
`,n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 16px 0;
`),I=n.Ay.button`
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
`,P=n.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,$=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,R=n.Ay.div`
  flex: 1;
  min-width: 0;
`,O=n.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 2px;
`,M=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
`,N=n.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 16px;
`,W=n.Ay.span`
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
`,U=n.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,H=n.Ay.div`
  margin-top: 28px;
`,Y=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 24px 0;
  line-height: 1.5;
`,V=n.Ay.div`
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
`,G=n.Ay.div`
  flex: 1;
`,J=n.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,L=n.Ay.a`
  color: #635BFF;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`,q=()=>{const{t:e}=(0,g.Bd)("notifications"),{user:t}=(0,d.As)(),{restaurantId:i}=(0,s.g)(),[n,x]=(0,l.M)("preferences"),[h,q]=(0,o.useState)({email_enabled:!1,smtp_host:"",smtp_port:587,smtp_secure:!1,smtp_user:"",smtp_password:"",from_email:"",from_name:"",reply_to_email:""}),[Q,X]=(0,o.useState)({}),[K,Z]=(0,o.useState)([]),[ee,te]=(0,o.useState)(!1),[ie,oe]=(0,o.useState)(!1),ne=(0,o.useRef)(new Map),re=(0,o.useRef)(null),se=(0,o.useRef)({}),[ae,le]=(0,o.useState)(!1),[de,ce]=(0,o.useState)(""),[pe,xe]=(0,o.useState)(!1),[he,ue]=(0,o.useState)(!1),[me,ge]=(0,o.useState)({success:!1,text:""}),fe=(0,o.useCallback)(()=>i?{entityType:"restaurant",entityId:Number(i)}:t?"Restaurant Admin"===t.role||"Staff"===t.role?{entityType:"restaurant",entityId:Number(t.restaurantId)||1}:"Brand General"===t.role||"Brand Manager"===t.role?{entityType:"brand",entityId:Number(t.brand_id)||1}:"Foodcourt General"===t.role||"Foodcourt Manager"===t.role?{entityType:"foodcourt",entityId:Number(t.foodcourt_id)||1}:"System Admin"===t.role?{entityType:"admin",entityId:Number(t.id)||1}:{entityType:"restaurant",entityId:Number(t.id)||1}:{entityType:"restaurant",entityId:1},[t,i]),{entityType:ye,entityId:je}=(0,o.useMemo)(()=>fe(),[fe]),be=(0,o.useCallback)(async()=>{oe(!0);try{const e=await fetch(`/api/notification-settings/${ye}/${je}`,{headers:{Authorization:`Bearer ${(0,c.c4)()}`}});if(e.ok){const t=await e.json();q({email_enabled:t.email_enabled||!1,smtp_host:t.smtp_host||"",smtp_port:t.smtp_port||587,smtp_secure:t.smtp_secure||!1,smtp_user:t.smtp_user||"",smtp_password:t.smtp_password||"",from_email:t.from_email||"",from_name:t.from_name||"",reply_to_email:t.reply_to_email||""})}}catch(e){console.error("Failed to load SMTP settings:",e)}finally{oe(!1)}},[ye,je]),ve=(0,o.useCallback)(async()=>{te(!0);try{const e=await fetch("/api/notification-settings/preferences",{headers:{Authorization:`Bearer ${(0,c.c4)()}`}});if(e.ok){const t=await e.json();t.success&&t.data&&(X(t.data.preferences||{}),Z(t.data.categories||[]))}}catch(e){console.error("Failed to load preferences:",e)}finally{te(!1)}},[]);(0,o.useEffect)(()=>{t&&(ve(),be())},[t,ve,be]);const Fe=(0,o.useMemo)(()=>{const e={};return K.forEach(t=>{e[t.section]||(e[t.section]=[]),e[t.section].push(t)}),e},[K]);if(!t)return null;const Se=async()=>{const e=(0,c.c4)();if(!e)throw new Error("No authentication token found. Please log in again.");const t=await fetch(`/api/notification-settings/${ye}/${je}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(h)}),i=await t.json();if(!t.ok)throw new Error(i.error||"Failed to save settings")},Ae=async()=>{const e=await fetch("/api/notification-settings/preferences",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(0,c.c4)()}`},body:JSON.stringify({preferences:se.current})}),t=await e.json();if(!e.ok||!t.success)throw new Error(t.message||"Failed to save preferences")},Be=e=>{var t;(e=>{se.current=e,X(e)})({...se.current,[e]:!se.current[e]}),null===(t=ne.current.get(e))||void 0===t||t.triggerSave()};return ie&&ee?(0,p.jsxs)(f,{children:[(0,p.jsx)(y,{children:(0,p.jsx)(j,{children:e("notifications:notificationSettingsPage.systemSettings")})}),(0,p.jsx)(b,{children:(0,p.jsx)(v,{children:e("notifications:notificationSettingsPage.loading")})})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(f,{children:[(0,p.jsx)(y,{children:(0,p.jsx)(j,{children:e("notifications:notificationSettingsPage.systemSettings")})}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(a.tU,{children:[(0,p.jsx)(a.oz,{active:"preferences"===n,onClick:()=>x("preferences"),children:"Notification Preferences"}),(0,p.jsx)(a.oz,{active:"email"===n,onClick:()=>x("email"),children:"Email Setup"}),(0,p.jsx)(a.oz,{active:"import"===n,onClick:()=>x("import"),children:"Import Data"})]}),"preferences"===n&&(0,p.jsxs)(v,{children:[(0,p.jsx)(Y,{children:"Choose which notifications you want to receive via email. All notifications are enabled by default."}),(null===t||void 0===t?void 0:t.email)&&(0,p.jsx)(V,{children:(0,p.jsxs)(G,{children:["Notifications will be sent to ",(0,p.jsx)(J,{children:t.email}),(0,p.jsx)("br",{}),"To change your email, go to ",(0,p.jsx)(L,{href:"/pos/profile",children:e("notifications:notificationSettingsPage.profileSettings")}),"."]})}),ee?(0,p.jsx)(Y,{children:e("notifications:notificationSettingsPage.loadingPreferences")}):0===K.length?(0,p.jsx)(Y,{children:e("notifications:notificationSettingsPage.noNotificationCategoriesAvailableForYourRole")}):(0,p.jsx)(p.Fragment,{children:Object.entries(Fe).map((e,t)=>{let[i,n]=e;return(0,p.jsxs)(o.Fragment,{children:[t>0&&(0,p.jsx)(H,{}),(0,p.jsx)(P,{children:i}),n.map(e=>(0,p.jsxs)($,{children:[(0,p.jsxs)(R,{children:[(0,p.jsx)(O,{children:e.label}),(0,p.jsx)(M,{children:e.description})]}),(0,p.jsx)(m.A,{ref:t=>{t?ne.current.set(e.key,t):ne.current.delete(e.key)},onSave:Ae,type:"toggle",children:(0,p.jsxs)(N,{children:[(0,p.jsx)(U,{type:"checkbox",checked:!1!==Q[e.key],onChange:()=>Be(e.key)}),(0,p.jsx)(W,{checked:!1!==Q[e.key]})]})})]},e.key))]},i)})})]}),"email"===n&&(0,p.jsxs)(v,{children:[(0,p.jsx)(Y,{children:"By default, notifications are sent from the platform. Set up custom SMTP to send emails from your own domain."}),(0,p.jsxs)(k,{children:[(0,p.jsx)(m.A,{ref:re,onSave:Se,type:"toggle",children:(0,p.jsx)(C,{type:"checkbox",checked:h.email_enabled,onChange:e=>{var t;q({...h,email_enabled:e.target.checked}),null===(t=re.current)||void 0===t||t.triggerSave()}})}),"Enable Custom Email (SMTP)"]}),(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:[(0,p.jsxs)(A,{children:[e("notifications:notificationSettingsPage.smtpServer"),(0,p.jsx)(B,{children:"*"})]}),(0,p.jsx)(m.A,{onSave:Se,children:(0,p.jsx)(w,{type:"text",placeholder:"smtp.gmail.com",value:h.smtp_host,onChange:e=>q({...h,smtp_host:e.target.value}),disabled:!h.email_enabled})}),(0,p.jsx)(E,{children:"Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com"})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(A,{children:[e("notifications:notificationSettingsPage.smtpPort"),(0,p.jsx)(B,{children:"*"})]}),(0,p.jsx)(m.A,{onSave:Se,children:(0,p.jsx)(w,{type:"number",placeholder:"587",value:h.smtp_port,onChange:e=>q({...h,smtp_port:parseInt(e.target.value)}),disabled:!h.email_enabled})}),(0,p.jsx)(E,{children:e("notifications:notificationSettingsPage.typically587TlsOr465Ssl")})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(A,{children:[e("notifications:notificationSettingsPage.smtpUsername"),(0,p.jsx)(B,{children:"*"})]}),(0,p.jsx)(m.A,{onSave:Se,children:(0,p.jsx)(w,{type:"email",placeholder:"your-email@gmail.com",value:h.smtp_user,onChange:e=>q({...h,smtp_user:e.target.value}),disabled:!h.email_enabled})}),(0,p.jsx)(E,{children:e("notifications:notificationSettingsPage.yourFullEmailAddress")})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(A,{children:[e("notifications:notificationSettingsPage.smtpPassword"),(0,p.jsx)(B,{children:"*"})]}),(0,p.jsx)(m.A,{onSave:Se,children:(0,p.jsx)(w,{type:"password",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:h.smtp_password,onChange:e=>q({...h,smtp_password:e.target.value}),disabled:!h.email_enabled})}),(0,p.jsx)(E,{children:"Gmail: app password, Outlook: account password or app password"})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(A,{children:[e("notifications:notificationSettingsPage.fromEmail"),(0,p.jsx)(B,{children:"*"})]}),(0,p.jsx)(m.A,{onSave:Se,children:(0,p.jsx)(w,{type:"email",placeholder:"noreply@yourstore.com",value:h.from_email,onChange:e=>q({...h,from_email:e.target.value}),disabled:!h.email_enabled})}),(0,p.jsx)(E,{children:e("notifications:notificationSettingsPage.emailAddressShownToRecipients")})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(A,{children:[e("notifications:notificationSettingsPage.fromName"),(0,p.jsx)(B,{children:"*"})]}),(0,p.jsx)(m.A,{onSave:Se,children:(0,p.jsx)(w,{type:"text",placeholder:"Your Store Name",value:h.from_name,onChange:e=>q({...h,from_name:e.target.value}),disabled:!h.email_enabled})}),(0,p.jsx)(E,{children:e("notifications:notificationSettingsPage.displayNameShownToRecipients")})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(A,{children:e("notifications:notificationSettingsPage.replytoEmailOptional")}),(0,p.jsx)(m.A,{onSave:Se,children:(0,p.jsx)(w,{type:"email",placeholder:"support@yourstore.com",value:h.reply_to_email,onChange:e=>q({...h,reply_to_email:e.target.value}),disabled:!h.email_enabled})}),(0,p.jsx)(E,{children:e("notifications:notificationSettingsPage.whereRepliesShouldBeSent")})]}),h.email_enabled&&(0,p.jsx)(z,{children:(0,p.jsx)(D,{onClick:()=>{ce(""),le(!0)},children:"Send Test Email"})})]}),"import"===n&&(0,p.jsx)(u,{restaurantId:(null===t||void 0===t?void 0:t.restaurantId)||i})]})]}),ae&&(0,p.jsxs)(r.aF,{isOpen:!0,onClose:()=>le(!1),title:"Send Test Email",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(I,{onClick:()=>le(!1),children:e("notifications:notificationSettingsPage.cancel")}),(0,p.jsx)(_,{onClick:async()=>{if(de){xe(!0);try{const e=await fetch(`/api/notification-settings/${ye}/${je}/test-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(0,c.c4)()}`},body:JSON.stringify({testEmail:de})}),t=await e.json();le(!1),e.ok?ge({success:!0,text:"Test email sent successfully!"}):ge({success:!1,text:t.error||"Failed to send test email"}),ue(!0)}catch(e){le(!1),ge({success:!1,text:"An error occurred while sending test email"}),ue(!0)}finally{xe(!1)}}},disabled:pe||!de,children:pe?"Sending...":"Send"})]}),children:[(0,p.jsx)(T,{children:e("notifications:notificationSettingsPage.enterTheEmailAddressWhereYouWantToReceiveTheTestEmail")}),(0,p.jsxs)(S,{children:[(0,p.jsx)(A,{children:e("notifications:notificationSettingsPage.emailAddress")}),(0,p.jsx)(w,{type:"email",placeholder:"test@example.com",value:de,onChange:e=>ce(e.target.value),autoFocus:!0})]})]}),he&&(0,p.jsx)(r.aF,{isOpen:!0,onClose:()=>ue(!1),title:me.success?"Success":"Error",footer:(0,p.jsx)(_,{onClick:()=>ue(!1),children:e("notifications:notificationSettingsPage.ok")}),children:(0,p.jsx)(T,{children:me.text})})]})}},2653:(e,t,i)=>{i.d(t,{M:()=>r});var o=i(9950),n=i(4492);function r(e){const[t,i]=(0,n.ok)(),r=(0,o.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,o.useState)(r());return[s,(0,o.useCallback)(e=>{a(e),i({tab:e})},[i])]}},5370:(e,t,i)=>{i.d(t,{A:()=>b});var o=i(9950),n=i(4752),r=i(4414);const s=n.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,a=n.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=n.i7`
  to { transform: rotate(360deg); }
`,d=n.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=n.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?n.AH`${a} 0.3s ease forwards`:n.AH`${s} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=n.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,x=n.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=n.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,u=n.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,m=n.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,g=n.Ay.span`
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
`,f=n.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,y=n.Ay.span`
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
`,j=(0,o.forwardRef)((e,t)=>{let{children:i,onSave:n,type:s="input",debounceMs:a=2e3,style:l}=e;const[c,j]=(0,o.useState)("idle"),[b,v]=(0,o.useState)(!1),F=(0,o.useRef)(null),S=(0,o.useRef)(null),A=(0,o.useRef)(null),B=(0,o.useRef)(!0),w=(0,o.useRef)(n);w.current=n;const C=(0,o.useCallback)(()=>{F.current&&clearTimeout(F.current),S.current&&clearTimeout(S.current),A.current&&clearTimeout(A.current)},[]),k=2e3!==a?a:"toggle"===s||"select"===s||"list"===s||"image"===s?300:a,E=(0,o.useCallback)(()=>{C(),v(!1),j("saving"),F.current=setTimeout(async()=>{if(B.current)try{if(await w.current(),!B.current)return;j("saved"),S.current=setTimeout(()=>{B.current&&(v(!0),A.current=setTimeout(()=>{B.current&&(j("idle"),v(!1))},300))},2e3)}catch{if(!B.current)return;j("error"),S.current=setTimeout(()=>{B.current&&(v(!0),A.current=setTimeout(()=>{B.current&&(j("idle"),v(!1))},300))},4e3)}},k)},[k,C]);(0,o.useImperativeHandle)(t,()=>({triggerSave:E}),[E]),(0,o.useEffect)(()=>(B.current=!0,()=>{B.current=!1,C()}),[C]);const z=o.Children.map(i,e=>{if(!o.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:o.cloneElement(e,{onChange:function(){t(...arguments),E()}})}),_="saving"===c?(0,r.jsx)(f,{}):"saved"===c?(0,r.jsx)(g,{children:"\u2713"}):"error"===c?(0,r.jsx)(y,{children:"!"}):null,D="select"===s?x:"toggle"===s?h:"image"===s?u:"list"===s?m:p;return(0,r.jsxs)(d,{$type:s,style:l,children:[z,"idle"!==c&&(0,r.jsx)(D,{$fading:b,children:_})]})});j.displayName="AutoSaveField";const b=j}}]);