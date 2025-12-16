"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,r,t)=>{t.d(r,{DO:()=>a,Jt:()=>c,Qn:()=>d});t(9950);var i=t(4752),n=t(4414);const s=i.Ay.div`
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
`,o=i.Ay.input`
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
`,d=e=>{let{children:r,className:t,style:i,...o}=e;return(0,n.jsx)(s,{className:t,style:i,...o,children:r})},a=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(o,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(l,{...t,children:r})}},5871:(e,r,t)=>{t.r(r),t.d(r,{default:()=>V});var i=t(9950),n=t(4752),s=t(3310),o=t(2488),l=t(3832),d=t(5665),a=t(4414);const c=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 2px solid #E6EBF1;
  padding-bottom: 0;
`,p=n.Ay.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  background: ${e=>e.active?"#635BFF":"transparent"};
  color: ${e=>e.active?"white":"#6B7280"};
  border: none;
  border-bottom: 2px solid ${e=>e.active?"#635BFF":"transparent"};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px 6px 0 0;

  &:hover {
    background: ${e=>e.active?"#5A54E5":"#F8FAFC"};
    color: ${e=>e.active?"white":"#0A2540"};
  }
`,x=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    gap: 12px;
  }
`,h=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,m=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,j=n.Ay.div`
  flex: 1;
`,y=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,b=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
`,v=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,f=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,C=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,k=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,F=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,w=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,A=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,E=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,B=n.Ay.span`
  color: #374151;
`,S=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,T=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,D=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,z=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,N=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,R=n.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`,P=n.Ay.div`
  padding: 24px;
`,I=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,O=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=n.Ay.div`
  margin-bottom: 20px;
`,M=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,H=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,U=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,q=(0,n.Ay)(W)`
  width: 100%;
`,J=n.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,_=n.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,G=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Y=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Q=n.Ay.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`,V=()=>{const[e,r]=(0,i.useState)([]),[t,n]=(0,i.useState)("open"),[V,K]=(0,i.useState)(""),[X,Z]=(0,i.useState)("all"),[ee,re]=(0,i.useState)("all"),[te,ie]=(0,i.useState)("all"),[ne,se]=(0,i.useState)(!1),[oe,le]=(0,i.useState)(!1),[de,ae]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(!1),[xe,he]=(0,i.useState)(!1),[ue,ge]=(0,i.useState)(!1),[me,je]=(0,i.useState)(null),[ye,be]=(0,i.useState)(""),[ve,fe]=(0,i.useState)("in-progress"),[Ce,ke]=(0,i.useState)(""),[Fe,we]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[Ae,Ee]=(0,i.useState)([]),[Be,Se]=(0,i.useState)(""),[Te,De]=(0,i.useState)([]),[ze,Ne]=(0,i.useState)(!1),[$e,Re]=(0,i.useState)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(console.log("\ud83d\udd25 Admin fetch response status:",e.status,e.ok),e.ok){const t=await e.json();console.log("\ud83d\udd25 Admin page loaded tickets:",t.length),console.log("\ud83d\udd25 Manager tickets:",t.filter(e=>"manager"===e.customerRole)),console.log("\ud83d\udd25 All tickets:",t),r(t)}else console.error("\ud83d\udd25 Admin fetch failed:",e.status)}catch(e){console.error("Error fetching support tickets:",e)}};e(),(async()=>{try{const e=await fetch("/api/users");if(e.ok){const r=await e.json(),t=r.data||r;console.log("\u2705 Loaded users for dropdown:",t.length,"users"),Ee(t)}else console.error("\u274c Failed to fetch users:",e.status)}catch(e){console.error("\u274c Error fetching users:",e)}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const Pe=e.filter(e=>{const r=e.subject.toLowerCase().includes(V.toLowerCase())||e.customerName.toLowerCase().includes(V.toLowerCase())||e.ticketNumber.toLowerCase().includes(V.toLowerCase()),i="all"===t||e.status===t,n="all"===X||e.status===X,s="all"===ee||e.priority===ee,o="all"===te||e.category===te;return r&&i&&n&&s&&o});console.log("Admin page - Total tickets:",e.length,"Filtered tickets:",Pe.length);const Ie=e.length,Oe=e.filter(e=>"open"===e.status).length,Le=e.filter(e=>"in-progress"===e.status).length,Me=e.filter(e=>"closed"===e.status).length,We=e.filter(e=>e.responseTime&&e.responseTime>0),He=(We.length>0&&Math.round(We.reduce((e,r)=>e+r.responseTime,0)/We.length),e=>new Date(e).toLocaleString("en-MY")),Ue=e=>{if(!e||0===e)return"Pending";const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`},qe=e=>{je(e),pe(!0)},Je=e=>{je(e),be(e.replyMessage||""),fe(e.status),ae(!0)};return(0,a.jsx)(s.A,{children:(0,a.jsxs)(l.mc,{children:[(0,a.jsxs)(l.Y9,{children:[(0,a.jsx)(l.hE,{children:"System Inquiry"}),(0,a.jsxs)(l.ex,{children:[(0,a.jsx)(l.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json();r(t)}}catch(e){console.error("Error fetching support tickets:",e)}},children:"Refresh"}),(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=Pe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,a.jsx)(l.$n,{variant:"primary",onClick:()=>{se(!0)},children:"Create Ticket"})]})]}),(0,a.jsxs)(l.UC,{children:[(0,a.jsxs)(d.MD,{children:[(0,a.jsxs)(d.hI,{color:"#059669",children:[(0,a.jsx)(d.Os,{children:Ie}),(0,a.jsx)(d.v0,{children:"Total Tickets"}),(0,a.jsx)(d.d1,{children:"All support requests"})]}),(0,a.jsxs)(d.hI,{color:"#D97706",children:[(0,a.jsx)(d.Os,{children:Oe}),(0,a.jsx)(d.v0,{children:"Open Tickets"}),(0,a.jsx)(d.d1,{children:"Awaiting response"})]}),(0,a.jsxs)(d.hI,{color:"#2563EB",children:[(0,a.jsx)(d.Os,{children:Le}),(0,a.jsx)(d.v0,{children:"In Progress"}),(0,a.jsx)(d.d1,{children:"Currently being handled"})]}),(0,a.jsxs)(d.hI,{color:"#7C3AED",children:[(0,a.jsx)(d.Os,{children:Me}),(0,a.jsx)(d.v0,{children:"Closed"}),(0,a.jsxs)(d.d1,{children:[Ie>0?Math.round(Me/Ie*100):0,"% completion rate"]})]})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{active:"open"===t,onClick:()=>n("open"),children:"Open"}),(0,a.jsx)(p,{active:"in-progress"===t,onClick:()=>n("in-progress"),children:"In Progress"}),(0,a.jsx)(p,{active:"all"===t,onClick:()=>n("all"),children:"All Tickets"})]}),(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{children:(0,a.jsx)(o.DO,{placeholder:"Search tickets...",value:V,onChange:e=>K(e.target.value)})}),"all"===t&&(0,a.jsx)(h,{children:(0,a.jsxs)(o.Jt,{value:X,onChange:e=>Z(e.target.value),style:{maxWidth:"180px"},children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,a.jsx)(h,{children:(0,a.jsxs)(o.Jt,{value:ee,onChange:e=>re(e.target.value),style:{maxWidth:"180px"},children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})}),(0,a.jsx)(h,{children:(0,a.jsxs)(o.Jt,{value:te,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,a.jsx)("option",{value:"all",children:"All Categories"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,a.jsx)("option",{value:"general",children:"General"})]})})]}),(0,a.jsx)(u,{children:Pe.map(e=>(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(y,{children:e.ticketNumber}),(0,a.jsx)(b,{children:e.subject}),(0,a.jsxs)(v,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(C,{status:e.status,children:e.status}),(0,a.jsx)(k,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(F,{children:e.description}),e.replyMessage&&(0,a.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",He(e.repliedAt||"")]}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,a.jsxs)(w,{children:[(0,a.jsxs)(A,{children:[(0,a.jsx)(E,{children:"Created"}),(0,a.jsx)(B,{children:He(e.createdAt)})]}),(0,a.jsxs)(A,{children:[(0,a.jsx)(E,{children:"Category"}),(0,a.jsx)(B,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,a.jsxs)(A,{children:[(0,a.jsx)(E,{children:"Response Time"}),(0,a.jsx)(B,{children:e.replyMessage?Ue(e.responseTime):"Pending"})]})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(T,{variant:"primary",onClick:()=>(e=>{je(e),le(!0)})(e),children:"View"}),"closed"!==e.status&&(0,a.jsx)(T,{variant:"primary",onClick:()=>Je(e),children:"Reply"}),(0,a.jsx)(T,{onClick:()=>qe(e),children:"Add Note"}),e.replyMessage&&"closed"!==e.status&&(0,a.jsx)(T,{onClick:()=>(e=>{je(e),he(!0)})(e),children:"Close Ticket"}),(0,a.jsx)(T,{variant:"danger",onClick:()=>(e=>{je(e),ge(!0)})(e),children:"Delete"})]})]},e.id))}),ne&&(0,a.jsx)(D,{onClick:()=>se(!1),children:(0,a.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(N,{children:[(0,a.jsx)($,{children:"Create Support Ticket"}),(0,a.jsx)(R,{onClick:()=>se(!1),children:"\xd7"})]}),(0,a.jsxs)(P,{children:[(0,a.jsxs)(L,{style:{position:"relative"},children:[(0,a.jsx)(M,{children:"Select User *"}),(0,a.jsx)(q,{type:"text",value:Be,onChange:e=>(e=>{if(Se(e),Ne(!0),console.log("\ud83d\udd0d User search - Query:",e,"Total users:",Ae.length),e.length<1){const e=Ae.slice(0,10);return console.log("\ud83d\udccb Showing initial",e.length,"users"),void De(e)}const r=Ae.filter(r=>r.full_name&&r.full_name.toLowerCase().includes(e.toLowerCase())||r.username&&r.username.toLowerCase().includes(e.toLowerCase())||r.email&&r.email.toLowerCase().includes(e.toLowerCase()));console.log("\ud83d\udd0d Filtered results:",r.length,"users"),De(r.slice(0,10))})(e.target.value),onFocus:()=>{Ne(!0),0===Be.length&&De(Ae.slice(0,10))},onBlur:()=>setTimeout(()=>Ne(!1),200),placeholder:"Search by name, username, or email..."}),ze&&Te.length>0&&(0,a.jsx)(J,{children:Te.map(e=>(0,a.jsxs)(_,{onClick:()=>(e=>{Re(e),Se(e.full_name||e.username),Ne(!1),we(r=>({...r,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,a.jsx)(G,{children:e.full_name||e.username}),(0,a.jsxs)(Y,{children:[e.email," \u2022 ",e.role]})]},e.id))}),$e&&(0,a.jsxs)(Q,{children:["\u2713 Selected: ",(0,a.jsx)("strong",{children:$e.full_name||$e.username})," (",$e.email,")"]})]}),(0,a.jsxs)(L,{children:[(0,a.jsx)(M,{children:"Subject *"}),(0,a.jsx)(W,{type:"text",value:Fe.subject,onChange:e=>we({...Fe,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,a.jsxs)(L,{children:[(0,a.jsx)(M,{children:"Description *"}),(0,a.jsx)(U,{value:Fe.description,onChange:e=>we({...Fe,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,a.jsxs)(O,{children:[(0,a.jsxs)(L,{children:[(0,a.jsx)(M,{children:"Priority"}),(0,a.jsxs)(H,{value:Fe.priority,onChange:e=>we({...Fe,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(L,{children:[(0,a.jsx)(M,{children:"Category"}),(0,a.jsxs)(H,{value:Fe.category,onChange:e=>we({...Fe,category:e.target.value}),children:[(0,a.jsx)("option",{value:"general",children:"General"}),(0,a.jsx)("option",{value:"technical",children:"Technical"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,a.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,a.jsxs)(I,{children:[(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,a.jsx)(l.$n,{variant:"primary",onClick:async()=>{if($e){try{const t={customerId:Fe.customerId,customerName:Fe.customerName,customerEmail:Fe.customerEmail,customerRole:"System Admin"===$e.role?"admin":"Restaurant Admin"===$e.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes($e.role)?"manager":"staff",subject:Fe.subject,description:Fe.description,status:"open",priority:Fe.priority,category:Fe.category},i=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!i.ok)return console.error("Failed to create ticket"),void alert("Failed to create support ticket. Please try again.");{const t=await i.json();r([t,...e])}}catch(t){return console.error("Error creating ticket:",t),void alert("Error creating support ticket. Please try again.")}se(!1),we({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),Re(null),Se(""),De([])}else alert("Please select a user to create ticket for")},disabled:!Fe.subject||!Fe.description||!$e,children:"Create Ticket"})]})]})}),oe&&me&&(0,a.jsx)(D,{onClick:()=>le(!1),children:(0,a.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(N,{children:[(0,a.jsx)($,{children:"Ticket Details"}),(0,a.jsx)(R,{onClick:()=>le(!1),children:"\xd7"})]}),(0,a.jsx)(P,{children:(0,a.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Ticket Number"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:me.ticketNumber})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Status"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"open"===me.status?"#FEF3C7":"in-progress"===me.status?"#DBEAFE":"#ECFDF5",color:"open"===me.status?"#D97706":"in-progress"===me.status?"#1E40AF":"#059669"},children:me.status})})]})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Priority"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"urgent"===me.priority?"#FEE2E2":"high"===me.priority?"#FEF3C7":"medium"===me.priority?"#DBEAFE":"#F3F4F6",color:"urgent"===me.priority?"#DC2626":"high"===me.priority?"#D97706":"medium"===me.priority?"#1E40AF":"#6B7280"},children:me.priority})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Category"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:me.category.replace("-"," ")})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Customer Information"}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:me.customerName}),(0,a.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:me.customerEmail})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Subject"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:me.subject})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Description"}),(0,a.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:me.description})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Created At"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:me.createdAt})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Last Updated"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:me.updatedAt})]})]}),me.assignedTo&&(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Assigned To"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:me.assignedTo})]}),me.replyMessage&&(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Support Reply"}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD",marginTop:"8px"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#0369A1",marginBottom:"8px",fontWeight:"600"},children:[me.repliedBy," \u2022 ",He(me.repliedAt||"")]}),(0,a.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:me.replyMessage})]})]}),me.notes&&me.notes.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Internal Notes (Admin Only)"}),(0,a.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"12px",marginTop:"8px"},children:me.notes.map(e=>(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEF3C7",borderRadius:"8px",border:"1px solid #FCD34D"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#92400E",marginBottom:"8px",fontWeight:"600"},children:[e.createdBy," \u2022 ",He(e.createdAt)]}),(0,a.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:e.message})]},e.id))})]})]})}),(0,a.jsxs)(I,{children:[(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>le(!1),children:"Close"}),"closed"!==me.status&&(0,a.jsx)(l.$n,{variant:"primary",onClick:()=>{le(!1),Je(me)},children:"Reply"}),(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>qe(me),children:"Add Note"})]})]})}),de&&me&&(0,a.jsx)(D,{onClick:()=>ae(!1),children:(0,a.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(N,{children:[(0,a.jsxs)($,{children:["Reply to Ticket ",me.ticketNumber]}),(0,a.jsx)(R,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,a.jsxs)(P,{children:[(0,a.jsx)("div",{style:{marginBottom:"20px"},children:(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:me.subject}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",me.customerName," (",me.customerEmail,")"]}),(0,a.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:me.description})]})}),me.notes&&me.notes.length>0&&(0,a.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,a.jsx)(M,{children:"Internal Notes (Admin Only)"}),(0,a.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px",marginTop:"8px"},children:me.notes.map(e=>(0,a.jsxs)("div",{style:{padding:"10px",backgroundColor:"#FEF3C7",borderRadius:"6px",border:"1px solid #FCD34D"},children:[(0,a.jsxs)("div",{style:{fontSize:"11px",color:"#92400E",marginBottom:"6px",fontWeight:"600"},children:["\ud83d\udcdd ",e.createdBy," \u2022 ",He(e.createdAt)]}),(0,a.jsx)("div",{style:{color:"#374151",fontSize:"13px",lineHeight:"1.4"},children:e.message})]},e.id))})]}),(0,a.jsxs)(L,{children:[(0,a.jsx)(M,{children:"Ticket Status"}),(0,a.jsxs)(H,{value:ve,onChange:e=>fe(e.target.value),children:[(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(L,{children:[(0,a.jsx)(M,{children:"Your Reply"}),(0,a.jsx)(U,{value:ye,onChange:e=>be(e.target.value),placeholder:"Type your reply to the customer...",style:{minHeight:"120px"}})]})]}),(0,a.jsxs)(I,{children:[(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,a.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(!ye.trim()||!me)return;const e=new Date(me.createdAt).getTime(),t=(new Date).getTime(),i=Math.round((t-e)/6e4);try{const e=await fetch(`/api/support-tickets/${me.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:ve,replyMessage:ye,repliedBy:"Support Agent",repliedAt:(new Date).toISOString().replace("T"," ").slice(0,19),responseTime:i>0?i:1,..."closed"===ve&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(!e.ok)return console.error("Failed to send reply"),void alert("Failed to send reply. Please try again.");{const t=await e.json();r(e=>e.map(e=>e.id===me.id?{...e,...t}:e))}}catch(n){return console.error("Error sending reply:",n),void alert("Error sending reply. Please try again.")}be(""),ae(!1)},disabled:!ye.trim(),children:"Send Reply"})]})]})}),ce&&me&&(0,a.jsx)(D,{onClick:()=>pe(!1),children:(0,a.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(N,{children:[(0,a.jsxs)($,{children:["Add Note to Ticket ",me.ticketNumber]}),(0,a.jsx)(R,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,a.jsxs)(P,{children:[(0,a.jsx)("div",{style:{marginBottom:"20px"},children:(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:me.subject}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",me.customerName," (",me.customerEmail,")"]})]})}),(0,a.jsxs)(L,{children:[(0,a.jsx)(M,{children:"Internal Note (Not visible to customer)"}),(0,a.jsx)(U,{value:Ce,onChange:e=>ke(e.target.value),placeholder:"Add an internal note for your team..."})]})]}),(0,a.jsxs)(I,{children:[(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,a.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(!Ce.trim()||!me)return;const e={id:`note-${Date.now()}`,message:Ce,createdBy:"System Admin",createdAt:(new Date).toISOString().replace("T"," ").slice(0,19)},t=[...me.notes||[],e];try{const e=await fetch(`/api/support-tickets/${me.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({notes:t})});if(!e.ok)return console.error("Failed to add note"),void alert("Failed to add note. Please try again.");{const t=await e.json();r(e=>e.map(e=>e.id===me.id?{...e,...t}:e))}}catch(i){return console.error("Error adding note:",i),void alert("Error adding note. Please try again.")}ke(""),pe(!1)},disabled:!Ce.trim(),children:"Add Note"})]})]})}),xe&&me&&(0,a.jsx)(D,{onClick:()=>he(!1),children:(0,a.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(N,{children:[(0,a.jsx)($,{children:"Close Ticket"}),(0,a.jsx)(R,{onClick:()=>he(!1),children:"\xd7"})]}),(0,a.jsx)(P,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Close This Ticket?"}),(0,a.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This will mark ticket ",(0,a.jsx)("strong",{children:me.ticketNumber})," as ",(0,a.jsx)("strong",{children:"CLOSED"}),".",(0,a.jsx)("br",{}),"The customer will be notified that their issue has been resolved."]}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #86EFAC",marginBottom:"20px"},children:[(0,a.jsxs)("div",{style:{fontWeight:"600",color:"#065F46",marginBottom:"4px"},children:["Subject: ",me.subject]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Customer: ",me.customerName]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Current Status: ",(0,a.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:me.status})]})]})]})}),(0,a.jsxs)(I,{children:[(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,a.jsx)(l.$n,{variant:"primary",onClick:()=>{me&&(r(e=>e.map(e=>e.id===me.id?{...e,status:"closed",resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}:e)),he(!1))},children:"Close Ticket"})]})]})}),ue&&me&&(0,a.jsx)(D,{onClick:()=>ge(!1),children:(0,a.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(N,{children:[(0,a.jsx)($,{children:"Delete Ticket"}),(0,a.jsx)(R,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,a.jsx)(P,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Delete This Ticket?"}),(0,a.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This action ",(0,a.jsx)("strong",{children:"cannot be undone"}),". This will permanently delete ticket ",(0,a.jsx)("strong",{children:me.ticketNumber})," and remove all associated data."]}),(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEE2E2",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"20px"},children:[(0,a.jsxs)("div",{style:{fontWeight:"600",color:"#991B1B",marginBottom:"4px"},children:["Subject: ",me.subject]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Customer: ",me.customerName]}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Status: ",(0,a.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:me.status})]})]})]})}),(0,a.jsxs)(I,{children:[(0,a.jsx)(l.$n,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,a.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(me){try{if(!(await fetch(`/api/support-tickets/${me.id}`,{method:"DELETE"})).ok)return console.error("Failed to delete ticket"),void alert("Failed to delete support ticket. Please try again.");r(e=>e.filter(e=>e.id!==me.id)),console.log("\u2705 Support ticket deleted:",me.ticketNumber)}catch(e){return console.error("Error deleting ticket:",e),void alert("Error deleting support ticket. Please try again.")}ge(!1),je(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete Permanently"})]})]})})]})]})})}}}]);