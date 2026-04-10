"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4022],{4022:(e,r,n)=>{n.r(r),n.d(r,{default:()=>U});var t=n(9950),i=n(4752),o=n(2853),a=n(1367),s=n(4302),l=n(8409),d=n(5030),c=n(9955),p=n(4414);const x=i.Ay.div`
  min-height: 100vh;
`,u=i.Ay.div`
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
`,h=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,y=i.Ay.div`
  display: flex;
  gap: 12px;
`,m=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,w=(i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`),j=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,b=i.Ay.div`
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
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,A=i.Ay.div`
  flex: 1;
`,S=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,I=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,E=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,k=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,B=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,q=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,C=i.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,P=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,z=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,$=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,_=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=i.Ay.span`
  color: #374151;
`,T=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,D=i.Ay.div`
  margin-bottom: 20px;
`,O=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,R=i.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,L=i.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,U=()=>{const{t:e}=(0,d.Bd)("owner"),{user:r}=(0,a.As)(),[n,i]=(0,t.useState)([]),[U,J]=(0,t.useState)([]),[W,Y]=(0,t.useState)(""),[K,H]=(0,t.useState)("all"),[G,Q]=(0,t.useState)("all"),[V,X]=(0,t.useState)("all"),[Z,ee]=(0,t.useState)("all"),[re,ne]=(0,t.useState)(!1),[te,ie]=(0,t.useState)(!1),[oe,ae]=(0,t.useState)(null),[se,le]=(0,t.useState)("open"),[de,ce]=(0,t.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}),[pe,xe]=(0,t.useState)({});(0,t.useEffect)(()=>{r&&ue()},[r]),(0,t.useEffect)(()=>{if(U.length>0){he();const e=setInterval(he,1e4);return()=>clearInterval(e)}},[U]);const ue=async()=>{try{const e=(0,c.c4)(),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;J(n.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},he=async()=>{try{const e=(0,c.c4)(),r=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;i(n),ge(n)}}catch(e){console.error("Error fetching tickets:",e)}},ge=async e=>{if(0!==e.length)try{const r=(0,c.c4)(),n=e.map(e=>e.id).join(","),t=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${n}`,{headers:{Authorization:`Bearer ${r}`}});if(t.ok){const e=await t.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),xe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ye=n.filter(e=>{const r=e.subject.toLowerCase().includes(W.toLowerCase())||e.ticketNumber.toLowerCase().includes(W.toLowerCase()),n="all"===K||e.status===K,t="all"===G||e.priority===G,i="all"===V||e.category===V,o="all"===Z||String(e.restaurantId)===Z;return r&&n&&t&&i&&o}),me=n.filter(e=>"open"===e.status).length,fe=n.filter(e=>"in-progress"===e.status).length,we=n.filter(e=>"resolved"===e.status).length,je=e=>new Date(e).toLocaleString("en-MY"),ve=e=>{if(!e)return"";const r=U.find(r=>r.id===e);return r?r.name:""};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:e("owner:ownerSystemInquiryPage.systemInquiry")}),(0,p.jsx)(y,{children:(0,p.jsx)(m,{variant:"primary",onClick:()=>ne(!0),children:e("owner:ownerSystemInquiryPage.newInquiry")})})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(l.MD,{children:[(0,p.jsxs)(l.hI,{color:"#635BFF",children:[(0,p.jsx)(l.Os,{children:n.length}),(0,p.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.totalInquiries")})]}),(0,p.jsxs)(l.hI,{color:"#F59E0B",children:[(0,p.jsx)(l.Os,{children:me}),(0,p.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.open")})]}),(0,p.jsxs)(l.hI,{color:"#3B82F6",children:[(0,p.jsx)(l.Os,{children:fe}),(0,p.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.inProgress")})]}),(0,p.jsxs)(l.hI,{color:"#10B981",children:[(0,p.jsx)(l.Os,{children:we}),(0,p.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.resolved")})]})]}),(0,p.jsxs)(f,{children:[(0,p.jsxs)(j,{value:Z,onChange:e=>ee(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allRestaurants")}),U.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]}),(0,p.jsxs)(j,{value:K,onChange:e=>H(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allStatus")}),(0,p.jsx)("option",{value:"open",children:e("owner:ownerSystemInquiryPage.open")}),(0,p.jsx)("option",{value:"in-progress",children:e("owner:ownerSystemInquiryPage.inProgress")}),(0,p.jsx)("option",{value:"resolved",children:e("owner:ownerSystemInquiryPage.resolved")}),(0,p.jsx)("option",{value:"closed",children:e("owner:ownerSystemInquiryPage.closed")})]}),(0,p.jsxs)(j,{value:G,onChange:e=>Q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allPriority")}),(0,p.jsx)("option",{value:"urgent",children:e("owner:ownerSystemInquiryPage.urgent")}),(0,p.jsx)("option",{value:"high",children:e("owner:ownerSystemInquiryPage.high")}),(0,p.jsx)("option",{value:"medium",children:e("owner:ownerSystemInquiryPage.medium")}),(0,p.jsx)("option",{value:"low",children:e("owner:ownerSystemInquiryPage.low")})]}),(0,p.jsxs)(j,{value:V,onChange:e=>X(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allCategories")}),(0,p.jsx)("option",{value:"technical",children:e("owner:ownerSystemInquiryPage.technical")}),(0,p.jsx)("option",{value:"billing",children:e("owner:ownerSystemInquiryPage.billing")}),(0,p.jsx)("option",{value:"feature-request",children:e("owner:ownerSystemInquiryPage.featureRequest")}),(0,p.jsx)("option",{value:"bug-report",children:e("owner:ownerSystemInquiryPage.bugReport")}),(0,p.jsx)("option",{value:"general",children:e("owner:ownerSystemInquiryPage.general")})]}),(0,p.jsx)(w,{placeholder:"Search inquiries...",value:W,onChange:e=>Y(e.target.value)})]}),(0,p.jsxs)(v,{children:[ye.map(r=>(0,p.jsxs)(b,{onClick:()=>{ae(r),le(r.status),ie(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))},children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(S,{children:r.ticketNumber}),(0,p.jsx)(I,{children:r.subject}),(0,p.jsxs)(E,{children:[r.customerName,r.restaurantName&&(0,p.jsx)(C,{children:r.restaurantName})]})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(B,{status:r.status,children:r.status}),(0,p.jsx)(q,{priority:r.priority,children:r.priority})]})]}),(0,p.jsx)(P,{children:r.description}),(0,p.jsxs)(z,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(_,{children:e("owner:ownerSystemInquiryPage.created")}),(0,p.jsx)(N,{children:je(r.createdAt)})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(_,{children:e("owner:ownerSystemInquiryPage.category")}),(0,p.jsx)(N,{style:{textTransform:"capitalize"},children:r.category.replace("-"," ")})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(_,{children:e("owner:ownerSystemInquiryPage.restaurant")}),(0,p.jsx)(N,{children:ve(r.restaurantId)||r.restaurantName||"-"})]}),pe[r.id]&&(0,p.jsx)($,{children:(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",pe[r.id].total_comments,pe[r.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[pe[r.id].unread_count," new"]})]})})]})]},r.id)),0===ye.length&&(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("h3",{children:e("owner:ownerSystemInquiryPage.noInquiriesYet")}),(0,p.jsx)("p",{children:'Click "New Inquiry" to submit a system inquiry for your restaurants.'})]})]}),re&&(0,p.jsxs)(l.aF,{isOpen:!0,onClose:()=>ne(!1),title:"Create System Inquiry",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>ne(!1),children:e("owner:ownerSystemInquiryPage.cancel")}),(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(!de.restaurantId||!de.subject.trim()||!de.description.trim())return;const e=U.find(e=>e.id===parseInt(de.restaurantId));try{const r={restaurantId:parseInt(de.restaurantId),restaurantName:(null===e||void 0===e?void 0:e.name)||"",subject:de.subject,description:de.description,status:"open",priority:de.priority,category:de.category},n=(0,c.c4)();(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(r)})).ok&&(he(),ne(!1),ce({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}))}catch(r){console.error("Error creating ticket:",r)}},disabled:!de.restaurantId||!de.subject.trim()||!de.description.trim(),children:"Submit Inquiry"})]}),children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:"Restaurant *"}),(0,p.jsxs)(L,{value:de.restaurantId,onChange:e=>ce({...de,restaurantId:e.target.value}),required:!0,children:[(0,p.jsx)("option",{value:"",children:e("owner:ownerSystemInquiryPage.selectRestaurant")}),U.map(e=>(0,p.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:"Subject *"}),(0,p.jsx)(R,{type:"text",value:de.subject,onChange:e=>ce({...de,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:"Description *"}),(0,p.jsx)(M,{value:de.description,onChange:e=>ce({...de,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,p.jsxs)(T,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.priority")}),(0,p.jsxs)(L,{value:de.priority,onChange:e=>ce({...de,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:e("owner:ownerSystemInquiryPage.low")}),(0,p.jsx)("option",{value:"medium",children:e("owner:ownerSystemInquiryPage.medium")}),(0,p.jsx)("option",{value:"high",children:e("owner:ownerSystemInquiryPage.high")}),(0,p.jsx)("option",{value:"urgent",children:e("owner:ownerSystemInquiryPage.urgent")})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.category")}),(0,p.jsxs)(L,{value:de.category,onChange:e=>ce({...de,category:e.target.value}),children:[(0,p.jsx)("option",{value:"general",children:e("owner:ownerSystemInquiryPage.general")}),(0,p.jsx)("option",{value:"technical",children:e("owner:ownerSystemInquiryPage.technical")}),(0,p.jsx)("option",{value:"billing",children:e("owner:ownerSystemInquiryPage.billing")}),(0,p.jsx)("option",{value:"feature-request",children:e("owner:ownerSystemInquiryPage.featureRequest")}),(0,p.jsx)("option",{value:"bug-report",children:e("owner:ownerSystemInquiryPage.bugReport")})]})]})]})]}),te&&oe&&(0,p.jsxs)(l.aF,{isOpen:!0,onClose:()=>ie(!1),title:"Inquiry Details",footer:(0,p.jsx)(m,{variant:"secondary",onClick:()=>ie(!1),children:e("owner:ownerSystemInquiryPage.close")}),children:[(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.ticketNumber")}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:oe.ticketNumber})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.status")}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,p.jsxs)(L,{value:se,onChange:e=>le(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:e("owner:ownerSystemInquiryPage.open")}),(0,p.jsx)("option",{value:"in-progress",children:e("owner:ownerSystemInquiryPage.inProgress")}),(0,p.jsx)("option",{value:"resolved",children:e("owner:ownerSystemInquiryPage.resolved")}),(0,p.jsx)("option",{value:"closed",children:e("owner:ownerSystemInquiryPage.closed")})]}),se!==oe.status&&(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(oe)try{const e=(0,c.c4)();(await fetch(`/api/support-tickets/${oe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:se})})).ok&&(i(e=>e.map(e=>e.id===oe.id?{...e,status:se}:e)),ae(e=>e?{...e,status:se}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:e("owner:ownerSystemInquiryPage.save")})]})]})]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.priority")}),(0,p.jsx)("div",{style:{padding:"8px 0"},children:(0,p.jsx)(q,{priority:oe.priority,children:oe.priority})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.restaurant")}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#374151"},children:ve(oe.restaurantId)||oe.restaurantName||"-"})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.subject")}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:oe.subject})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.description")}),(0,p.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:oe.description})]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.created")}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:je(oe.createdAt)})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(O,{children:e("owner:ownerSystemInquiryPage.category")}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:oe.category.replace("-"," ")})]})]})]}),(0,p.jsx)(s.A,{entityType:"support_ticket",entityId:oe.id,currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>xe(e=>{const r={...e};return r[oe.id]&&(r[oe.id]={...r[oe.id],unread_count:0}),r})})]})]})]})})}},4185:(e,r,n)=>{n.d(r,{A:()=>h});n(9950);var t=n(4752),i=n(4414);const o=t.Ay.div`
  margin-top: 12px;
`,a=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=t.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,d=t.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=t.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=t.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,u=t.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const h=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const n=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),t=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),n.length>0&&(0,i.jsx)(x,{children:n.map((e,r)=>(0,i.jsx)(u,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),t.length>0&&(0,i.jsx)(s,{children:t.map((e,r)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(t=e.mimeType,"application/pdf"===t?"\ud83d\udcc4":t.includes("word")||t.includes("document")?"\ud83d\udcdd":t.includes("sheet")||t.includes("excel")?"\ud83d\udcca":t.includes("zip")||t.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},r);var n,t})})]})}},4302:(e,r,n)=>{n.d(r,{A:()=>D});var t=n(9950),i=n(4752),o=n(4185),a=n(9061),s=n(5030),l=n(9955),d=n(4414);const c=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,p=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,x=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,h=i.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,g=i.Ay.div`
  flex: 1;
  min-width: 0;
`,y=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,m=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,f=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,w=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,j=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,v=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,F=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,S=i.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,I=i.Ay.div`
  display: flex;
  gap: 4px;
`,E=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,k=i.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,B=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,q=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,C=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,P=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,$=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,_=i.Ay.input`
  display: none;
`,N=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`,D=e=>{let{entityType:r,entityId:n,currentUserId:i,onMarkRead:D}=e;const{t:O}=(0,s.Bd)("common"),[R,L]=(0,t.useState)([]),[M,U]=(0,t.useState)(""),[J,W]=(0,t.useState)(!1),[Y,K]=(0,t.useState)([]),[H,G]=(0,t.useState)(!1),[Q,V]=(0,t.useState)(""),[X,Z]=(0,t.useState)(!1),ee=(0,t.useRef)(null),re=async()=>{try{const e=(0,l.c4)(),t=await fetch(`/api/comments/${r}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&L(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{n&&(re(),(async()=>{try{const e=(0,l.c4)();await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n})}),D&&D(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,n]);const ne=async()=>{if(H)return;const e=M.trim(),t=Y.length>0;if((e||t)&&!X){Z(!0);try{const e=(0,l.c4)();(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n,content:M.trim(),attachments:t?Y:void 0,is_internal:J||void 0})})).ok&&(U(""),K([]),W(!1),re())}catch(i){console.error("Error adding comment:",i)}finally{Z(!1)}}},te=e=>{const r=new Date(e),n=(new Date).getTime()-r.getTime(),t=Math.floor(n/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const i=Math.floor(t/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:["Comments (",R.length,")"]}),R.length>0?(0,d.jsx)(x,{children:R.map(e=>{var r,n,s;return(0,d.jsxs)(u,{isInternal:e.is_internal,children:[(0,d.jsx)(h,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,d.jsx)(f,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,d.jsx)(w,{children:"Internal"}),(0,d.jsx)(j,{children:te(e.createdAt)}),i&&e.author_id===Number(i)&&(0,d.jsx)(b,{onClick:()=>(async e=>{try{const r=(0,l.c4)();(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&re()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,d.jsx)(v,{children:e.content.split("\n").map((e,r)=>(0,d.jsxs)(t.Fragment,{children:[r>0&&(0,d.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,d.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,d.jsx)(B,{children:"No comments yet"}),(0,d.jsxs)(F,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(S,{value:M,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ne())},placeholder:J?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,d.jsxs)(I,{children:[(0,d.jsx)(E,{onClick:()=>{var e;return null===(e=ee.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,d.jsx)(k,{onClick:ne,disabled:!M.trim()&&0===Y.length||X||H,children:"Send"})]})]}),(0,d.jsx)(N,{children:(0,d.jsxs)(T,{children:[(0,d.jsx)("input",{type:"checkbox",checked:J,onChange:e=>W(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(Y.length>0||H||Q)&&(0,d.jsxs)(q,{children:[H&&(0,d.jsx)(z,{children:"Uploading..."}),Q&&(0,d.jsx)($,{children:Q}),Y.map((e,r)=>(0,d.jsxs)(C,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,d.jsx)(P,{onClick:()=>(e=>{const r=Y[e],n=(0,l.c4)();fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),K(r=>r.filter((r,n)=>n!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,d.jsx)(_,{ref:ee,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const n=5-Y.length,t=Array.from(r).slice(0,n);if(e.target.value="",0!==t.length){G(!0),V("");try{const e=new FormData;t.forEach(r=>e.append("files",r));const r=(0,l.c4)(),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),i=await n.json();i.success&&i.data?K(e=>[...e,...i.data]):V(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),V("File upload failed. Please try again.")}finally{G(!1)}}}})]})}},9061:(e,r,n)=>{n.d(r,{c:()=>a});var t=n(9950),i=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(o);return 1===r.length?e:r.map((e,r)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,i.jsx)(t.Fragment,{children:e},r))}}}]);