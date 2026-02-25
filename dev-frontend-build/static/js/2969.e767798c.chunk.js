"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2969],{2488:(e,r,t)=>{t.d(r,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var s=t(4752),i=t(4414);const n=s.Ay.div`
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
`,a=s.Ay.input`
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
`,o=s.Ay.select`
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
`,l=e=>{let{children:r,className:t,style:s,...a}=e;return(0,i.jsx)(n,{className:t,style:s,...a,children:r})},d=e=>{let{placeholder:r="Search...",...t}=e;return(0,i.jsx)(a,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,i.jsx)(o,{...t,children:r})}},2969:(e,r,t)=>{t.r(r),t.d(r,{default:()=>P});var s=t(9950),i=t(4752),n=t(9246),a=t(3310),o=t(3832),l=t(4728),d=t(5665),c=t(2488),p=t(9610),x=t(4414);const h=i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,u=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`,g=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>e.active?"\n    background: #059669;\n    color: white;\n    border-color: #059669;\n    \n    &:hover {\n      background: #047857;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,m=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,v=i.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,j=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,y=i.Ay.div`
  display: flex;
  gap: 8px;
`,f=i.Ay.div`
  max-height: 700px;
  overflow-y: auto;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.4;
`,b=i.Ay.div`
  padding: 12px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  ${e=>{switch(e.level){case"error":case"critical":return"\n          background: #FEF2F2;\n          border-left: 4px solid #DC2626;\n        ";case"warning":return"\n          background: #FFFBEB;\n          border-left: 4px solid #F59E0B;\n        ";case"debug":return"\n          background: #F8FAFC;\n          border-left: 4px solid #6B7280;\n        ";default:return"\n          &:hover {\n            background: #FAFBFC;\n          }\n        "}}}
  
  &:last-child {
    border-bottom: none;
  }
`,w=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`,A=i.Ay.span`
  color: #6B7280;
  font-size: 12px;
`,F=i.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.level){case"critical":return"#FEE2E2";case"error":return"#FED7D7";case"warning":return"#FEF3C7";case"info":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.level){case"critical":return"#DC2626";case"error":return"#E53E3E";case"warning":return"#D97706";case"info":return"#1E40AF";default:return"#6B7280"}}};
`,S=i.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  background: #E0F2FE;
  color: #0891B2;
`,C=i.Ay.span`
  color: #374151;
  font-weight: 500;
`,k=i.Ay.div`
  color: #1F2937;
  margin-bottom: 4px;
`,E=i.Ay.div`
  color: #9CA3AF;
  font-size: 11px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,B=i.Ay.pre`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #374151;
  overflow-x: auto;
  white-space: pre-wrap;
`,I=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,D=i.Ay.div`
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
`,O=i.Ay.div`
  font-size: 24px;
`,z=i.Ay.div`
  flex: 1;
`,$=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,L=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,N=i.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,R=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-align: center;
  margin-bottom: 8px;
`,U=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 24px;
`,q=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`,J=e=>({id:String(e.id),timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,details:e.details,userId:e.user_id?String(e.user_id):void 0,userName:e.user_name||void 0,ipAddress:e.ip_address||void 0,userAgent:e.user_agent||void 0,requestId:e.request_id||void 0,duration:e.duration||void 0,statusCode:e.status_code||void 0}),P=()=>{const[e,r]=(0,s.useState)([]),[t,i]=(0,s.useState)(""),[P,T]=(0,s.useState)("all"),[_,M]=(0,s.useState)("all"),[W,Y]=(0,s.useState)("all"),[H,Q]=(0,s.useState)(""),[K,V]=(0,s.useState)(!1),[G,X]=(0,s.useState)(new Set),[Z,ee]=(0,s.useState)(!1),[re,te]=(0,s.useState)(!1),[se,ie]=(0,s.useState)(!1),[ne,ae]=(0,s.useState)({total24h:0,errors:0,warnings:0,recent1h:0}),[oe,le]=(0,s.useState)(!1),de=(0,s.useRef)(null),ce={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},pe=(0,s.useCallback)(async()=>{le(!0);try{const e=new URLSearchParams({limit:"200"});"all"!==P&&e.set("level",P),"all"!==_&&e.set("category",_),"all"!==W&&e.set("service",W),H&&e.set("start_date",H),t&&e.set("search",t);const[s,i]=await Promise.all([n.A.get(`/api/system-logs?${e}`,{headers:ce}),n.A.get("/api/system-logs/stats",{headers:ce})]);s.data.success&&r(s.data.data.logs.map(J)),i.data.success&&ae(i.data.data)}catch(e){console.error("Failed to fetch logs:",e)}finally{le(!1)}},[P,_,W,H,t]);(0,s.useEffect)(()=>{pe()},[pe]),(0,s.useEffect)(()=>(K?de.current=setInterval(pe,5e3):de.current&&(clearInterval(de.current),de.current=null),()=>{de.current&&clearInterval(de.current)}),[K,pe]);const xe=e,he=ne.total24h,ue=ne.errors,ge=ne.warnings,me=ne.recent1h,ve=e=>{const r=xe.map(e=>({timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,userId:e.userId,userName:e.userName,ipAddress:e.ipAddress,requestId:e.requestId,duration:e.duration,statusCode:e.statusCode,details:e.details?JSON.stringify(e.details):""}));let t="",s="",i="";switch(e){case"csv":t=[["Timestamp","Level","Category","Service","Message","User ID","User Name","IP Address","Request ID","Duration","Status Code","Details"].join(","),...r.map(e=>[e.timestamp,e.level,e.category,e.service,`"${e.message}"`,e.userId||"",e.userName||"",e.ipAddress||"",e.requestId||"",e.duration||"",e.statusCode||"",`"${e.details}"`].join(","))].join("\n"),s="text/csv",i=`system-logs-${(new Date).toISOString().split("T")[0]}.csv`;break;case"json":t=JSON.stringify(r,null,2),s="application/json",i=`system-logs-${(new Date).toISOString().split("T")[0]}.json`;break;case"txt":t=xe.map(e=>`[${e.timestamp}] ${e.level.toUpperCase()} ${e.category}/${e.service}: ${e.message}${e.details?"\nDetails: "+JSON.stringify(e.details,null,2):""}`).join("\n\n"),s="text/plain",i=`system-logs-${(new Date).toISOString().split("T")[0]}.txt`}const n=new Blob([t],{type:s}),a=window.URL.createObjectURL(n),o=document.createElement("a");o.href=a,o.download=i,o.click(),window.URL.revokeObjectURL(a),ie(!1)};return(0,x.jsx)(a.A,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsxs)(o.Y9,{children:[(0,x.jsx)(o.hE,{children:"System Logs"}),(0,x.jsxs)(o.ex,{children:[(0,x.jsx)(l.SC,{variant:"secondary",onClick:()=>{ie(!0)},children:"Export Logs"}),(0,x.jsx)(l.SC,{variant:"danger",onClick:()=>{te(!0)},children:"Clear Logs"})]})]}),(0,x.jsxs)(o.UC,{children:[(0,x.jsxs)(d.MD,{children:[(0,x.jsxs)(d.hI,{color:"#059669",children:[(0,x.jsx)(d.Os,{children:he}),(0,x.jsx)(d.v0,{children:"Total Logs (24h)"})]}),(0,x.jsxs)(d.hI,{color:"#DC2626",children:[(0,x.jsx)(d.Os,{children:ue}),(0,x.jsx)(d.v0,{children:"Errors & Critical"})]}),(0,x.jsxs)(d.hI,{color:"#D97706",children:[(0,x.jsx)(d.Os,{children:ge}),(0,x.jsx)(d.v0,{children:"Warnings"})]}),(0,x.jsxs)(d.hI,{color:"#2563EB",children:[(0,x.jsx)(d.Os,{children:me}),(0,x.jsx)(d.v0,{children:"Recent (1h)"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{placeholder:"Search logs...",value:t,onChange:e=>i(e.target.value)}),(0,x.jsxs)(c.Jt,{value:P,onChange:e=>T(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Levels"}),(0,x.jsx)("option",{value:"critical",children:"Critical"}),(0,x.jsx)("option",{value:"error",children:"Error"}),(0,x.jsx)("option",{value:"warning",children:"Warning"}),(0,x.jsx)("option",{value:"info",children:"Info"}),(0,x.jsx)("option",{value:"debug",children:"Debug"})]}),(0,x.jsxs)(c.Jt,{value:_,onChange:e=>M(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),(0,x.jsx)("option",{value:"system",children:"System"}),(0,x.jsx)("option",{value:"database",children:"Database"}),(0,x.jsx)("option",{value:"auth",children:"Authentication"}),(0,x.jsx)("option",{value:"payment",children:"Payment"}),(0,x.jsx)("option",{value:"api",children:"API"}),(0,x.jsx)("option",{value:"security",children:"Security"}),(0,x.jsx)("option",{value:"backup",children:"Backup"})]}),(0,x.jsxs)(c.Jt,{value:W,onChange:e=>Y(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Services"}),(0,x.jsx)("option",{value:"invoice-scheduler",children:"Invoice Scheduler"}),(0,x.jsx)("option",{value:"subscription-scheduler",children:"Subscription Scheduler"}),(0,x.jsx)("option",{value:"stripe",children:"Stripe"}),(0,x.jsx)("option",{value:"stripe-webhook",children:"Stripe Webhook"}),(0,x.jsx)("option",{value:"order-service",children:"Order Service"}),(0,x.jsx)("option",{value:"auth-service",children:"Auth Service"}),(0,x.jsx)("option",{value:"pos-api",children:"POS API"}),(0,x.jsx)("option",{value:"payment-service",children:"Payment Service"}),(0,x.jsx)("option",{value:"backup-service",children:"Backup Service"}),(0,x.jsx)("option",{value:"kitchen-display-service",children:"Kitchen Display"})]}),(0,x.jsx)(h,{type:"date",value:H,onChange:e=>Q(e.target.value)}),(0,x.jsxs)(u,{children:[(0,x.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",textTransform:"uppercase"},children:"Live Mode"}),(0,x.jsx)(g,{active:K,onClick:()=>V(!K),children:K?"ON":"OFF"})]})]}),(0,x.jsxs)(m,{children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(j,{children:["System Logs (",xe.length," entries)"]}),(0,x.jsxs)(y,{children:[(0,x.jsx)(l.SC,{variant:Z?"primary":"secondary",onClick:()=>ee(!Z),children:Z?"\u2713 Auto-scroll":"Auto-scroll"}),(0,x.jsx)(l.SC,{variant:"secondary",onClick:()=>{pe()},children:"\ud83d\udd04 Refresh"})]})]}),(0,x.jsxs)(f,{children:[xe.map(e=>{return(0,x.jsxs)(b,{level:e.level,children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:(r=e.timestamp,new Date(r).toLocaleString("en-MY",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})+`.${r.split(".")[1]||"000"}`)}),(0,x.jsx)(F,{level:e.level,children:e.level}),(0,x.jsx)(S,{children:e.category}),(0,x.jsx)(C,{children:e.service}),e.statusCode&&(0,x.jsx)("span",{style:{color:e.statusCode>=400?"#DC2626":"#059669",fontWeight:"500"},children:e.statusCode}),e.duration&&(0,x.jsxs)("span",{style:{color:"#6B7280"},children:[e.duration,"ms"]})]}),(0,x.jsx)(k,{children:e.message}),(0,x.jsxs)(E,{children:[e.requestId&&(0,x.jsxs)("span",{children:["Request: ",e.requestId]}),e.userId&&(0,x.jsxs)("span",{children:["User: ",e.userName||e.userId]}),e.ipAddress&&(0,x.jsxs)("span",{children:["IP: ",e.ipAddress]}),e.details&&(0,x.jsx)("span",{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>(e=>{const r=new Set(G);r.has(e)?r.delete(e):r.add(e),X(r)})(e.id),children:G.has(e.id)?"Hide Details":"Show Details"})]}),G.has(e.id)&&e.details&&(0,x.jsx)(B,{children:JSON.stringify(e.details,null,2)})]},e.id);var r}),0===xe.length&&(0,x.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"No logs match the current filters"})]})]})]}),(0,x.jsxs)(p.aF,{isOpen:se,onClose:()=>ie(!1),title:"Export System Logs",children:[(0,x.jsxs)("p",{children:["Select the format for exporting ",xe.length," log entries:"]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(D,{onClick:()=>ve("csv"),children:[(0,x.jsx)(O,{children:"\ud83d\udcca"}),(0,x.jsxs)(z,{children:[(0,x.jsx)($,{children:"CSV Format"}),(0,x.jsx)(L,{children:"Comma-separated values for spreadsheet analysis"})]})]}),(0,x.jsxs)(D,{onClick:()=>ve("json"),children:[(0,x.jsx)(O,{children:"\ud83d\udcc4"}),(0,x.jsxs)(z,{children:[(0,x.jsx)($,{children:"JSON Format"}),(0,x.jsx)(L,{children:"Structured data with full details"})]})]}),(0,x.jsxs)(D,{onClick:()=>ve("txt"),children:[(0,x.jsx)(O,{children:"\ud83d\udcdd"}),(0,x.jsxs)(z,{children:[(0,x.jsx)($,{children:"Text Format"}),(0,x.jsx)(L,{children:"Human-readable log format"})]})]})]})]}),(0,x.jsxs)(p.aF,{isOpen:re,onClose:()=>te(!1),title:"Clear System Logs",footer:(0,x.jsxs)(q,{children:[(0,x.jsx)(p.yl,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,x.jsx)(p.yl,{variant:"danger",onClick:async()=>{try{await n.A.delete("/api/system-logs",{headers:ce}),te(!1),pe()}catch(e){console.error("Failed to clear logs:",e),te(!1)}},children:"Clear All Logs"})]}),children:[(0,x.jsx)(N,{children:"\u26a0\ufe0f"}),(0,x.jsx)(R,{children:"Are you sure you want to clear all system logs?"}),(0,x.jsxs)(U,{children:["This action cannot be undone. All ",e.length," log entries will be permanently removed."]})]})]})})}}}]);