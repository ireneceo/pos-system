"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4022],{4022:(e,r,t)=>{t.r(r),t.d(r,{default:()=>M});var i=t(8819),n=t(9950),o=t(4752),s=t(1367),a=t(4302),l=t(2674),d=t(4414);const c=o.Ay.div`
  min-height: 100vh;
`,p=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,x=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,u=o.Ay.div`
  display: flex;
  gap: 12px;
`,g=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${i.w.colors.border};\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,m=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,f=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${i.w.colors.secondary};
  margin-bottom: 4px;
`,j=o.Ay.div`
  font-size: 13px;
  color: ${i.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${i.w.colors.border};
`,w=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,b=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: ${i.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,k=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,C=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,E=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,$=o.Ay.div`
  flex: 1;
`,S=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=o.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,I=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,B=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,_=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,R=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,N=o.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,T=o.Ay.div`
  font-size: 14px;
  color: ${i.w.colors.text.muted};
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,D=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: ${i.w.colors.text.muted};
  flex-wrap: wrap;
  gap: 12px;
`,q=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,P=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,L=o.Ay.span`
  color: ${i.w.colors.text.dark};
`,O=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,M=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,n.useState)([]),[i,o]=(0,n.useState)([]),[M,U]=(0,n.useState)(""),[J,H]=(0,n.useState)("all"),[W,X]=(0,n.useState)("all"),[K,Q]=(0,n.useState)("all"),[Y,G]=(0,n.useState)("all"),[Z,V]=(0,n.useState)(!1),[ee,re]=(0,n.useState)(!1),[te,ie]=(0,n.useState)(null),[ne,oe]=(0,n.useState)("open"),[se,ae]=(0,n.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}),[le,de]=(0,n.useState)([]),[ce,pe]=(0,n.useState)({});(0,n.useEffect)(()=>{e&&xe()},[e]),(0,n.useEffect)(()=>{if(i.length>0){he();const e=setInterval(he,1e4);return()=>clearInterval(e)}},[i]);const xe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;o(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},he=async()=>{try{const r=await fetch("/api/support-tickets");if(r.ok){const n=await r.json(),o=n.data||n,s=i.map(e=>e.id),a=o.filter(r=>r.restaurantId&&s.includes(r.restaurantId)||r.customerId===String(null===e||void 0===e?void 0:e.id));t(a),ue(a)}}catch(r){console.error("Error fetching tickets:",r)}},ue=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),pe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ge=r.filter(e=>{const r=e.subject.toLowerCase().includes(M.toLowerCase())||e.ticketNumber.toLowerCase().includes(M.toLowerCase()),t="all"===J||e.status===J,i="all"===W||e.priority===W,n="all"===K||e.category===K,o="all"===Y||String(e.restaurantId)===Y;return r&&t&&i&&n&&o}),me=r.filter(e=>"open"===e.status).length,ye=r.filter(e=>"in-progress"===e.status).length,fe=r.filter(e=>"resolved"===e.status).length,je=e=>new Date(e).toLocaleString("en-MY"),ve=e=>{if(!e)return"";const r=i.find(r=>r.id===e);return r?r.name:""};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"System Inquiry"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:he,children:"Refresh"}),(0,d.jsx)(g,{variant:"primary",onClick:()=>V(!0),children:"New Inquiry"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(m,{children:[(0,d.jsxs)(y,{color:"#635BFF",children:[(0,d.jsx)(f,{children:r.length}),(0,d.jsx)(j,{children:"Total Inquiries"})]}),(0,d.jsxs)(y,{color:"#F59E0B",children:[(0,d.jsx)(f,{children:me}),(0,d.jsx)(j,{children:"Open"})]}),(0,d.jsxs)(y,{color:"#3B82F6",children:[(0,d.jsx)(f,{children:ye}),(0,d.jsx)(j,{children:"In Progress"})]}),(0,d.jsxs)(y,{color:"#10B981",children:[(0,d.jsx)(f,{children:fe}),(0,d.jsx)(j,{children:"Resolved"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(b,{children:"Search"}),(0,d.jsx)(A,{placeholder:"Search inquiries...",value:M,onChange:e=>U(e.target.value)})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(b,{children:"Restaurant"}),(0,d.jsxs)(k,{value:Y,onChange:e=>G(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),i.map(e=>(0,d.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(b,{children:"Status"}),(0,d.jsxs)(k,{value:J,onChange:e=>H(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(b,{children:"Priority"}),(0,d.jsxs)(k,{value:W,onChange:e=>X(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"low",children:"Low"})]})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(b,{children:"Category"}),(0,d.jsxs)(k,{value:K,onChange:e=>Q(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Categories"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,d.jsx)("option",{value:"general",children:"General"})]})]})]}),(0,d.jsxs)(F,{children:[ge.map(e=>(0,d.jsxs)(C,{onClick:()=>{ie(e),oe(e.status),re(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))},children:[(0,d.jsxs)(E,{children:[(0,d.jsxs)($,{children:[(0,d.jsx)(S,{children:e.ticketNumber}),(0,d.jsx)(z,{children:e.subject}),(0,d.jsxs)(I,{children:[e.customerName,e.restaurantName&&(0,d.jsx)(N,{children:e.restaurantName})]})]}),(0,d.jsxs)(B,{children:[(0,d.jsx)(_,{status:e.status,children:e.status}),(0,d.jsx)(R,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(T,{children:e.description}),(0,d.jsxs)(D,{children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(P,{children:"Created"}),(0,d.jsx)(L,{children:je(e.createdAt)})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(P,{children:"Category"}),(0,d.jsx)(L,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(P,{children:"Restaurant"}),(0,d.jsx)(L,{children:ve(e.restaurantId)||e.restaurantName||"-"})]}),ce[e.id]&&(0,d.jsx)(q,{children:(0,d.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ce[e.id].total_comments,ce[e.id].unread_count>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ce[e.id].unread_count," new"]})]})})]})]},e.id)),0===ge.length&&(0,d.jsxs)(O,{children:[(0,d.jsx)("h3",{children:"No inquiries yet"}),(0,d.jsx)("p",{children:'Click "New Inquiry" to submit a system inquiry for your restaurants.'})]})]}),Z&&(0,d.jsx)(l.mH,{onClick:()=>V(!1),children:(0,d.jsxs)(l.$m,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(l.rQ,{children:[(0,d.jsx)(l.wt,{children:"Create System Inquiry"}),(0,d.jsx)(l.Jn,{onClick:()=>V(!1),children:"\xd7"})]}),(0,d.jsxs)(l.cw,{children:[(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(l.lR,{children:"Restaurant *"}),(0,d.jsxs)(l.FX,{value:se.restaurantId,onChange:e=>ae({...se,restaurantId:e.target.value}),required:!0,children:[(0,d.jsx)("option",{value:"",children:"Select Restaurant"}),i.map(e=>(0,d.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(l.lR,{children:"Subject *"}),(0,d.jsx)(l.ZQ,{type:"text",value:se.subject,onChange:e=>ae({...se,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(l.lR,{children:"Description *"}),(0,d.jsx)(l.Lz,{value:se.description,onChange:e=>ae({...se,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,d.jsxs)(l.fh,{children:[(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(l.lR,{children:"Priority"}),(0,d.jsxs)(l.FX,{value:se.priority,onChange:e=>ae({...se,priority:e.target.value}),children:[(0,d.jsx)("option",{value:"low",children:"Low"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(l.lR,{children:"Category"}),(0,d.jsxs)(l.FX,{value:se.category,onChange:e=>ae({...se,category:e.target.value}),children:[(0,d.jsx)("option",{value:"general",children:"General"}),(0,d.jsx)("option",{value:"technical",children:"Technical"}),(0,d.jsx)("option",{value:"billing",children:"Billing"}),(0,d.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,d.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,d.jsxs)(l.jl,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,d.jsx)(g,{variant:"primary",onClick:async()=>{if(!se.restaurantId||!se.subject.trim()||!se.description.trim())return;const r=i.find(e=>e.id===parseInt(se.restaurantId));try{const t={customerId:(null===e||void 0===e?void 0:e.id)||"",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",customerEmail:(null===e||void 0===e?void 0:e.email)||"",customerRole:"manager",restaurantId:parseInt(se.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:se.subject,description:se.description,status:"open",priority:se.priority,category:se.category};(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok&&(he(),V(!1),ae({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}))}catch(t){console.error("Error creating ticket:",t)}},disabled:!se.restaurantId||!se.subject.trim()||!se.description.trim(),children:"Submit Inquiry"})]})]})}),ee&&te&&(0,d.jsx)(l.mH,{onClick:()=>re(!1),children:(0,d.jsxs)(l.$m,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(l.rQ,{children:[(0,d.jsx)(l.wt,{children:"Inquiry Details"}),(0,d.jsx)(l.Jn,{onClick:()=>re(!1),children:"\xd7"})]}),(0,d.jsxs)(l.cw,{children:[(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Ticket Number"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:te.ticketNumber})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Status"}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,d.jsxs)(l.FX,{value:ne,onChange:e=>oe(e.target.value),style:{flex:1},children:[(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]}),ne!==te.status&&(0,d.jsx)(g,{variant:"primary",onClick:async()=>{if(te)try{(await fetch(`/api/support-tickets/${te.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:ne})})).ok&&(t(e=>e.map(e=>e.id===te.id?{...e,status:ne}:e)),ie(e=>e?{...e,status:ne}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Priority"}),(0,d.jsx)("div",{style:{padding:"8px 0"},children:(0,d.jsx)(R,{priority:te.priority,children:te.priority})})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Restaurant"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#374151"},children:ve(te.restaurantId)||te.restaurantName||"-"})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Subject"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:te.subject})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Description"}),(0,d.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:te.description})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Created"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:je(te.createdAt)})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)(l.lR,{children:"Category"}),(0,d.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:te.category.replace("-"," ")})]})]})]}),(0,d.jsx)(a.A,{entityType:"support_ticket",entityId:te.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>pe(e=>{const r={...e};return r[te.id]&&(r[te.id]={...r[te.id],unread_count:0}),r})})]}),(0,d.jsx)(l.jl,{children:(0,d.jsx)(g,{variant:"secondary",onClick:()=>re(!1),children:"Close"})})]})})]})]})})}},4185:(e,r,t)=>{t.d(r,{A:()=>g});var i=t(8819),n=(t(9950),t(4752)),o=t(4414);const s=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${i.w.colors.text.muted};
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,d=n.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid ${i.w.colors.border};
  border-radius: 6px;
  text-decoration: none;
  color: ${i.w.colors.secondary};
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: ${i.w.colors.primary};
    background: #F4F3FF;
  }
`,c=n.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,p=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,x=n.Ay.span`
  color: ${i.w.colors.text.placeholder};
  flex-shrink: 0;
  font-size: 11px;
`,h=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,u=n.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${i.w.colors.border};
  transition: all 0.15s;

  &:hover {
    border-color: ${i.w.colors.primary};
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const g=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),i=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,o.jsxs)(s,{children:[(0,o.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,o.jsx)(h,{children:t.map((e,r)=>(0,o.jsx)(u,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},r))}),i.length>0&&(0,o.jsx)(l,{children:i.map((e,r)=>{return(0,o.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(c,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(p,{children:e.originalName}),(0,o.jsx)(x,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,i})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>T});var i=t(8819),n=t(9950),o=t(4752),s=t(4185),a=t(4414);const l=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid ${i.w.colors.border};
  padding-top: 20px;
`,d=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${i.w.colors.secondary};
  margin: 0 0 16px 0;
`,c=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,p=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=o.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${i.w.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,h=o.Ay.div`
  flex: 1;
  min-width: 0;
`,u=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: ${i.w.colors.secondary};
`,m=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,y=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${i.w.colors.status.warningLightAlt};
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,f=o.Ay.span`
  font-size: 11px;
  color: ${i.w.colors.text.placeholder};
  margin-left: auto;
`,j=o.Ay.p`
  font-size: 13px;
  color: ${i.w.colors.text.dark};
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,v=o.Ay.button`
  background: none;
  border: none;
  color: ${i.w.colors.text.placeholder};
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,w=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=o.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }
  &::placeholder { color: ${i.w.colors.text.placeholder}; }
`,k=o.Ay.div`
  display: flex;
  gap: 4px;
`,F=o.Ay.button`
  padding: 10px 12px;
  background: ${i.w.colors.surfaceMuted};
  color: ${i.w.colors.text.muted};
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: ${i.w.colors.borderLight}; color: ${i.w.colors.secondary}; }
`,C=o.Ay.button`
  padding: 10px 16px;
  background: ${i.w.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,E=o.Ay.p`
  font-size: 13px;
  color: ${i.w.colors.text.placeholder};
  text-align: center;
  padding: 12px 0;
`,$=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,S=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: ${i.w.colors.primary};
`,z=o.Ay.button`
  background: none;
  border: none;
  color: ${i.w.colors.text.placeholder};
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,I=o.Ay.span`
  font-size: 11px;
  color: ${i.w.colors.primary};
  padding: 3px 8px;
`,B=o.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,_=o.Ay.input`
  display: none;
`,R=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,N=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${i.w.colors.text.muted};
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: ${i.w.colors.status.warningAlt};
    cursor: pointer;
  }
`,T=e=>{let{entityType:r,entityId:t,currentUserId:i,onMarkRead:o}=e;const[T,D]=(0,n.useState)([]),[q,P]=(0,n.useState)(""),[L,O]=(0,n.useState)(!1),[M,U]=(0,n.useState)([]),[J,H]=(0,n.useState)(!1),[W,X]=(0,n.useState)(""),[K,Q]=(0,n.useState)(!1),Y=(0,n.useRef)(null),G=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&D(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(G(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),o&&o(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const Z=async()=>{if(J)return;const e=q.trim(),i=M.length>0;if((e||i)&&!K){Q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:q.trim(),attachments:i?M:void 0,is_internal:L||void 0})})).ok&&(P(""),U([]),O(!1),G())}catch(n){console.error("Error adding comment:",n)}finally{Q(!1)}}},V=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),i=Math.floor(t/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(l,{children:[(0,a.jsxs)(d,{children:["Comments (",T.length,")"]}),T.length>0?(0,a.jsx)(c,{children:T.map(e=>{var r,t,n;return(0,a.jsxs)(p,{isInternal:e.is_internal,children:[(0,a.jsx)(x,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(h,{children:[(0,a.jsxs)(u,{children:[(0,a.jsx)(g,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,a.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),e.is_internal&&(0,a.jsx)(y,{children:"Internal"}),(0,a.jsx)(f,{children:V(e.createdAt)}),i&&e.author_id===i&&(0,a.jsx)(v,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&G()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(j,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(s.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(E,{children:"No comments yet"}),(0,a.jsxs)(w,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(A,{value:q,onChange:e=>P(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Z())},placeholder:L?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(k,{children:[(0,a.jsx)(F,{onClick:()=>{var e;return null===(e=Y.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(C,{onClick:Z,disabled:!q.trim()&&0===M.length||K||J,children:"Send"})]})]}),(0,a.jsx)(R,{children:(0,a.jsxs)(N,{children:[(0,a.jsx)("input",{type:"checkbox",checked:L,onChange:e=>O(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(M.length>0||J||W)&&(0,a.jsxs)($,{children:[J&&(0,a.jsx)(I,{children:"Uploading..."}),W&&(0,a.jsx)(B,{children:W}),M.map((e,r)=>(0,a.jsxs)(S,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(z,{onClick:()=>(e=>{const r=M[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),U(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(_,{ref:Y,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const t=5-M.length,i=Array.from(r).slice(0,t);if(e.target.value="",0!==i.length){H(!0),X("");try{const e=new FormData;i.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data?U(e=>[...e,...n.data]):X(n.message||"Upload failed")}catch(n){console.error("File upload error:",n),X("File upload failed. Please try again.")}finally{H(!1)}}}})]})}}}]);