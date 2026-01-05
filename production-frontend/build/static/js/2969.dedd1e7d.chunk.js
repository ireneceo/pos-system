"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2969],{2488:(e,r,t)=>{t.d(r,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),n=t(4414);const s=i.Ay.div`
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
`,a=i.Ay.select`
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
`,l=e=>{let{children:r,className:t,style:i,...o}=e;return(0,n.jsx)(s,{className:t,style:i,...o,children:r})},d=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(o,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(a,{...t,children:r})}},2969:(e,r,t)=>{t.r(r),t.d(r,{default:()=>R});var i=t(9950),n=t(4752),s=t(3310),o=t(3832),a=t(4728),l=t(5665),d=t(2488),c=t(9610),x=t(4414);const p=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`,u=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>e.active?"\n    background: #059669;\n    color: white;\n    border-color: #059669;\n    \n    &:hover {\n      background: #047857;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,m=n.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,v=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,j=n.Ay.div`
  display: flex;
  gap: 8px;
`,f=n.Ay.div`
  max-height: 700px;
  overflow-y: auto;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.4;
`,y=n.Ay.div`
  padding: 12px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  ${e=>{switch(e.level){case"error":case"critical":return"\n          background: #FEF2F2;\n          border-left: 4px solid #DC2626;\n        ";case"warning":return"\n          background: #FFFBEB;\n          border-left: 4px solid #F59E0B;\n        ";case"debug":return"\n          background: #F8FAFC;\n          border-left: 4px solid #6B7280;\n        ";default:return"\n          &:hover {\n            background: #FAFBFC;\n          }\n        "}}}
  
  &:last-child {
    border-bottom: none;
  }
`,w=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`,b=n.Ay.span`
  color: #6B7280;
  font-size: 12px;
`,F=n.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.level){case"critical":return"#FEE2E2";case"error":return"#FED7D7";case"warning":return"#FEF3C7";case"info":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.level){case"critical":return"#DC2626";case"error":return"#E53E3E";case"warning":return"#D97706";case"info":return"#1E40AF";default:return"#6B7280"}}};
`,A=n.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  background: #E0F2FE;
  color: #0891B2;
`,C=n.Ay.span`
  color: #374151;
  font-weight: 500;
`,S=n.Ay.div`
  color: #1F2937;
  margin-bottom: 4px;
`,k=n.Ay.div`
  color: #9CA3AF;
  font-size: 11px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,E=n.Ay.pre`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #374151;
  overflow-x: auto;
  white-space: pre-wrap;
`,B=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,D=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    border-color: #635BFF;
    transform: translateY(-1px);
  }
`,I=n.Ay.div`
  font-size: 24px;
`,L=n.Ay.div`
  flex: 1;
`,O=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,N=n.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,$=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-align: center;
  margin-bottom: 8px;
`,T=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 24px;
`,J=n.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`,R=()=>{const[e,r]=(0,i.useState)([]),[t,n]=(0,i.useState)(""),[R,U]=(0,i.useState)("all"),[q,P]=(0,i.useState)("all"),[M,W]=(0,i.useState)("all"),[Y,H]=(0,i.useState)(""),[Q,K]=(0,i.useState)(!1),[V,G]=(0,i.useState)(new Set),[X,Z]=(0,i.useState)(!1),[_,ee]=(0,i.useState)(!1),[re,te]=(0,i.useState)(!1);(0,i.useEffect)(()=>{r([])},[]);const ie=e.filter(e=>{const r=e.message.toLowerCase().includes(t.toLowerCase())||e.service.toLowerCase().includes(t.toLowerCase())||e.userName&&e.userName.toLowerCase().includes(t.toLowerCase()),i="all"===R||e.level===R,n="all"===q||e.category===q,s="all"===M||e.service===M,o=!Y||e.timestamp.startsWith(Y);return r&&i&&n&&s&&o}),ne=e.length,se=e.filter(e=>"error"===e.level||"critical"===e.level).length,oe=e.filter(e=>"warning"===e.level).length,ae=e.filter(e=>new Date(e.timestamp).getTime()>Date.now()-36e5).length,le=e=>{const r=ie.map(e=>({timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,userId:e.userId,userName:e.userName,ipAddress:e.ipAddress,requestId:e.requestId,duration:e.duration,statusCode:e.statusCode,details:e.details?JSON.stringify(e.details):""}));let t="",i="",n="";switch(e){case"csv":t=[["Timestamp","Level","Category","Service","Message","User ID","User Name","IP Address","Request ID","Duration","Status Code","Details"].join(","),...r.map(e=>[e.timestamp,e.level,e.category,e.service,`"${e.message}"`,e.userId||"",e.userName||"",e.ipAddress||"",e.requestId||"",e.duration||"",e.statusCode||"",`"${e.details}"`].join(","))].join("\n"),i="text/csv",n=`system-logs-${(new Date).toISOString().split("T")[0]}.csv`;break;case"json":t=JSON.stringify(r,null,2),i="application/json",n=`system-logs-${(new Date).toISOString().split("T")[0]}.json`;break;case"txt":t=ie.map(e=>`[${e.timestamp}] ${e.level.toUpperCase()} ${e.category}/${e.service}: ${e.message}${e.details?"\nDetails: "+JSON.stringify(e.details,null,2):""}`).join("\n\n"),i="text/plain",n=`system-logs-${(new Date).toISOString().split("T")[0]}.txt`}const s=new Blob([t],{type:i}),o=window.URL.createObjectURL(s),a=document.createElement("a");a.href=o,a.download=n,a.click(),window.URL.revokeObjectURL(o),te(!1)};return(0,x.jsx)(s.A,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsxs)(o.Y9,{children:[(0,x.jsx)(o.hE,{children:"System Logs"}),(0,x.jsxs)(o.ex,{children:[(0,x.jsx)(a.SC,{variant:"secondary",onClick:()=>{te(!0)},children:"Export Logs"}),(0,x.jsx)(a.SC,{variant:"danger",onClick:()=>{ee(!0)},children:"Clear Logs"})]})]}),(0,x.jsxs)(o.UC,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#059669",children:[(0,x.jsx)(l.Os,{children:ne}),(0,x.jsx)(l.v0,{children:"Total Logs (24h)"})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:se}),(0,x.jsx)(l.v0,{children:"Errors & Critical"})]}),(0,x.jsxs)(l.hI,{color:"#D97706",children:[(0,x.jsx)(l.Os,{children:oe}),(0,x.jsx)(l.v0,{children:"Warnings"})]}),(0,x.jsxs)(l.hI,{color:"#2563EB",children:[(0,x.jsx)(l.Os,{children:ae}),(0,x.jsx)(l.v0,{children:"Recent (1h)"})]})]}),(0,x.jsxs)(d.Qn,{children:[(0,x.jsx)(d.DO,{placeholder:"Search logs...",value:t,onChange:e=>n(e.target.value)}),(0,x.jsxs)(d.Jt,{value:R,onChange:e=>U(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Levels"}),(0,x.jsx)("option",{value:"critical",children:"Critical"}),(0,x.jsx)("option",{value:"error",children:"Error"}),(0,x.jsx)("option",{value:"warning",children:"Warning"}),(0,x.jsx)("option",{value:"info",children:"Info"}),(0,x.jsx)("option",{value:"debug",children:"Debug"})]}),(0,x.jsxs)(d.Jt,{value:q,onChange:e=>P(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),(0,x.jsx)("option",{value:"system",children:"System"}),(0,x.jsx)("option",{value:"database",children:"Database"}),(0,x.jsx)("option",{value:"auth",children:"Authentication"}),(0,x.jsx)("option",{value:"payment",children:"Payment"}),(0,x.jsx)("option",{value:"api",children:"API"}),(0,x.jsx)("option",{value:"security",children:"Security"}),(0,x.jsx)("option",{value:"backup",children:"Backup"})]}),(0,x.jsxs)(d.Jt,{value:M,onChange:e=>W(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Services"}),(0,x.jsx)("option",{value:"order-service",children:"Order Service"}),(0,x.jsx)("option",{value:"auth-service",children:"Auth Service"}),(0,x.jsx)("option",{value:"pos-api",children:"POS API"}),(0,x.jsx)("option",{value:"payment-service",children:"Payment Service"}),(0,x.jsx)("option",{value:"backup-service",children:"Backup Service"}),(0,x.jsx)("option",{value:"kitchen-display-service",children:"Kitchen Display"})]}),(0,x.jsx)(p,{type:"date",value:Y,onChange:e=>H(e.target.value)}),(0,x.jsxs)(h,{children:[(0,x.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",textTransform:"uppercase"},children:"Live Mode"}),(0,x.jsx)(u,{active:Q,onClick:()=>K(!Q),children:Q?"ON":"OFF"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(m,{children:[(0,x.jsxs)(v,{children:["System Logs (",ie.length," entries)"]}),(0,x.jsxs)(j,{children:[(0,x.jsx)(a.SC,{variant:X?"primary":"secondary",onClick:()=>Z(!X),children:X?"\u2713 Auto-scroll":"Auto-scroll"}),(0,x.jsx)(a.SC,{variant:"secondary",onClick:()=>{console.log("Refreshing logs...")},children:"\ud83d\udd04 Refresh"})]})]}),(0,x.jsxs)(f,{children:[ie.map(e=>{return(0,x.jsxs)(y,{level:e.level,children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(b,{children:(r=e.timestamp,new Date(r).toLocaleString("en-MY",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})+`.${r.split(".")[1]||"000"}`)}),(0,x.jsx)(F,{level:e.level,children:e.level}),(0,x.jsx)(A,{children:e.category}),(0,x.jsx)(C,{children:e.service}),e.statusCode&&(0,x.jsx)("span",{style:{color:e.statusCode>=400?"#DC2626":"#059669",fontWeight:"500"},children:e.statusCode}),e.duration&&(0,x.jsxs)("span",{style:{color:"#6B7280"},children:[e.duration,"ms"]})]}),(0,x.jsx)(S,{children:e.message}),(0,x.jsxs)(k,{children:[e.requestId&&(0,x.jsxs)("span",{children:["Request: ",e.requestId]}),e.userId&&(0,x.jsxs)("span",{children:["User: ",e.userName||e.userId]}),e.ipAddress&&(0,x.jsxs)("span",{children:["IP: ",e.ipAddress]}),e.details&&(0,x.jsx)("span",{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>(e=>{const r=new Set(V);r.has(e)?r.delete(e):r.add(e),G(r)})(e.id),children:V.has(e.id)?"Hide Details":"Show Details"})]}),V.has(e.id)&&e.details&&(0,x.jsx)(E,{children:JSON.stringify(e.details,null,2)})]},e.id);var r}),0===ie.length&&(0,x.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"No logs match the current filters"})]})]})]}),(0,x.jsxs)(c.aF,{isOpen:re,onClose:()=>te(!1),title:"Export System Logs",children:[(0,x.jsxs)("p",{children:["Select the format for exporting ",ie.length," log entries:"]}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(D,{onClick:()=>le("csv"),children:[(0,x.jsx)(I,{children:"\ud83d\udcca"}),(0,x.jsxs)(L,{children:[(0,x.jsx)(O,{children:"CSV Format"}),(0,x.jsx)(z,{children:"Comma-separated values for spreadsheet analysis"})]})]}),(0,x.jsxs)(D,{onClick:()=>le("json"),children:[(0,x.jsx)(I,{children:"\ud83d\udcc4"}),(0,x.jsxs)(L,{children:[(0,x.jsx)(O,{children:"JSON Format"}),(0,x.jsx)(z,{children:"Structured data with full details"})]})]}),(0,x.jsxs)(D,{onClick:()=>le("txt"),children:[(0,x.jsx)(I,{children:"\ud83d\udcdd"}),(0,x.jsxs)(L,{children:[(0,x.jsx)(O,{children:"Text Format"}),(0,x.jsx)(z,{children:"Human-readable log format"})]})]})]})]}),(0,x.jsxs)(c.aF,{isOpen:_,onClose:()=>ee(!1),title:"Clear System Logs",footer:(0,x.jsxs)(J,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"danger",onClick:()=>{r([]),ee(!1),console.log("Logs cleared")},children:"Clear All Logs"})]}),children:[(0,x.jsx)(N,{children:"\u26a0\ufe0f"}),(0,x.jsx)($,{children:"Are you sure you want to clear all system logs?"}),(0,x.jsxs)(T,{children:["This action cannot be undone. All ",e.length," log entries will be permanently removed."]})]})]})})}}}]);