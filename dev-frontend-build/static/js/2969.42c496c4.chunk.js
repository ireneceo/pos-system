"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2969],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var s=r(4752),i=r(4414);const n=s.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:s,...a}=e;return(0,i.jsx)(n,{className:r,style:s,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(o,{...r,children:t})}},2969:(e,t,r)=>{r.r(t),r.d(t,{default:()=>le});var s=r(9950),i=r(4752),n=r(9246),a=r(3310),o=r(3832),l=r(4728),d=r(5665),c=r(2488),x=r(9610),h=r(4414);const p=i.Ay.input`
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
`,j=i.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,v=i.Ay.h3`
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
`,w=i.Ay.div`
  padding: 12px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  ${e=>{switch(e.level){case"error":case"critical":return"\n          background: #FEF2F2;\n          border-left: 4px solid #DC2626;\n        ";case"warning":return"\n          background: #FFFBEB;\n          border-left: 4px solid #F59E0B;\n        ";case"debug":return"\n          background: #F8FAFC;\n          border-left: 4px solid #6B7280;\n        ";default:return"\n          &:hover {\n            background: #FAFBFC;\n          }\n        "}}}
  
  &:last-child {
    border-bottom: none;
  }
`,b=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`,F=i.Ay.span`
  color: #6B7280;
  font-size: 12px;
`,A=i.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.level){case"critical":return"#FEE2E2";case"error":return"#FED7D7";case"warning":return"#FEF3C7";case"info":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.level){case"critical":return"#DC2626";case"error":return"#E53E3E";case"warning":return"#D97706";case"info":return"#1E40AF";default:return"#6B7280"}}};
`,k=i.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  background: #E0F2FE;
  color: #0891B2;
`,S=i.Ay.span`
  color: #374151;
  font-weight: 500;
`,C=i.Ay.div`
  color: #1F2937;
  margin-bottom: 4px;
`,B=i.Ay.div`
  color: #9CA3AF;
  font-size: 11px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,E=i.Ay.pre`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #374151;
  overflow-x: auto;
  white-space: pre-wrap;
`,D=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,z=i.Ay.div`
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
`,$=i.Ay.div`
  font-size: 24px;
`,I=i.Ay.div`
  flex: 1;
`,M=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,L=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,O=i.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,N=i.Ay.div`
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
`,P=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`,T=i.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`,R=i.Ay.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: none;
  color: ${e=>e.active?"#635BFF":"#6B7280"};
  border-bottom: 2px solid ${e=>e.active?"#635BFF":"transparent"};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: ${e=>e.active?"#635BFF":"#374151"};
  }
`,W=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,q=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${e=>{switch(e.status){case"ok":return"#D1FAE5";case"warning":return"#FDE68A";case"critical":return"#FCA5A5";default:return"#E6EBF1"}}};
  background: ${e=>{switch(e.status){case"ok":return"#F0FDF4";case"warning":return"#FFFBEB";case"critical":return"#FEF2F2";default:return"#F8FAFC"}}};
`,J=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 8px;
`,_=i.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: ${e=>{switch(e.status){case"ok":return"#059669";case"warning":return"#D97706";case"critical":return"#DC2626";default:return"#6B7280"}}};
`,H=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Y=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px 24px;
  margin-bottom: 16px;
`,Q=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,K=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,V=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,G=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"online":return"#D1FAE5";case"offline":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"online":return"#059669";case"offline":return"#DC2626";default:return"#6B7280"}}};
`,X=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
`,Z=i.Ay.span`
  color: #6B7280;
  min-width: 50px;
`,ee=i.Ay.div`
  height: 16px;
  width: ${e=>Math.max(e.percent,1)}%;
  max-width: 100%;
  background: ${e=>e.color};
  border-radius: 3px;
  transition: width 0.3s;
`,te=i.Ay.div`
  flex: 1;
  background: #F3F4F6;
  border-radius: 3px;
  height: 16px;
`,re=i.Ay.span`
  color: #374151;
  font-weight: 500;
  min-width: 45px;
  text-align: right;
`,se=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,ie=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,ne=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #635BFF;
  background: #635BFF;
  color: white;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5A51E6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ae=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  font-size: 16px;
`,oe=e=>({id:String(e.id),timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,details:e.details,userId:e.user_id?String(e.user_id):void 0,userName:e.user_name||void 0,ipAddress:e.ip_address||void 0,userAgent:e.user_agent||void 0,requestId:e.request_id||void 0,duration:e.duration||void 0,statusCode:e.status_code||void 0}),le=()=>{const[e,t]=(0,s.useState)("logs"),[r,i]=(0,s.useState)([]),[le,de]=(0,s.useState)(""),[ce,xe]=(0,s.useState)("all"),[he,pe]=(0,s.useState)("all"),[ue,ge]=(0,s.useState)("all"),[me,je]=(0,s.useState)(""),[ve,ye]=(0,s.useState)(!1),[fe,we]=(0,s.useState)(new Set),[be,Fe]=(0,s.useState)(!1),[Ae,ke]=(0,s.useState)(!1),[Se,Ce]=(0,s.useState)(!1),[Be,Ee]=(0,s.useState)({total24h:0,errors:0,warnings:0,recent1h:0}),[De,ze]=(0,s.useState)(!1),$e=(0,s.useRef)(null),Ie=(0,s.useRef)(null),[Me,Le]=(0,s.useState)(null),[Oe,Ne]=(0,s.useState)(!1),[Ue,Pe]=(0,s.useState)(!1),[Te,Re]=(0,s.useState)(0),We={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},qe=(0,s.useCallback)(async()=>{ze(!0);try{const e=new URLSearchParams({limit:"200"});"all"!==ce&&e.set("level",ce),"all"!==he&&e.set("category",he),"all"!==ue&&e.set("service",ue),me&&e.set("start_date",me),le&&e.set("search",le);const[t,r]=await Promise.all([n.A.get(`/api/system-logs?${e}`,{headers:We}),n.A.get("/api/system-logs/stats",{headers:We})]);t.data.success&&i(t.data.data.logs.map(oe)),r.data.success&&Ee(r.data.data)}catch(e){console.error("Failed to fetch logs:",e)}finally{ze(!1)}},[ce,he,ue,me,le]),Je=(0,s.useCallback)(async()=>{Ne(!0);try{const e=await n.A.get("/api/system-logs/server-health",{headers:We});e.data.success&&Le(e.data.data)}catch(e){console.error("Failed to fetch server health:",e)}finally{Ne(!1)}},[]),_e=async()=>{Pe(!0);try{(await n.A.post("/api/system-logs/server-health/check-now",{},{headers:We})).data.success&&await Je()}catch(t){var e;429===(null===(e=t.response)||void 0===e?void 0:e.status)?console.warn("Rate limited:",t.response.data.message):console.error("Check now failed:",t)}finally{Pe(!1),Re(60)}};(0,s.useEffect)(()=>{if(Te<=0)return;const e=setTimeout(()=>Re(e=>e-1),1e3);return()=>clearTimeout(e)},[Te]),(0,s.useEffect)(()=>{qe()},[qe]),(0,s.useEffect)(()=>{"health"===e&&Je()},[e,Je]),(0,s.useEffect)(()=>(ve?$e.current=setInterval(qe,5e3):$e.current&&(clearInterval($e.current),$e.current=null),()=>{$e.current&&clearInterval($e.current)}),[ve,qe]),(0,s.useEffect)(()=>{be&&Ie.current&&(Ie.current.scrollTop=Ie.current.scrollHeight)},[r,be]);const He=r,Ye=Be.total24h,Qe=Be.errors,Ke=Be.warnings,Ve=Be.recent1h,Ge=e=>{const t=He.map(e=>({timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,userId:e.userId,userName:e.userName,ipAddress:e.ipAddress,requestId:e.requestId,duration:e.duration,statusCode:e.statusCode,details:e.details?JSON.stringify(e.details):""}));let r="",s="",i="";switch(e){case"csv":r=[["Timestamp","Level","Category","Service","Message","User ID","User Name","IP Address","Request ID","Duration","Status Code","Details"].join(","),...t.map(e=>[e.timestamp,e.level,e.category,e.service,`"${e.message}"`,e.userId||"",e.userName||"",e.ipAddress||"",e.requestId||"",e.duration||"",e.statusCode||"",`"${e.details}"`].join(","))].join("\n"),s="text/csv",i=`system-logs-${(new Date).toISOString().split("T")[0]}.csv`;break;case"json":r=JSON.stringify(t,null,2),s="application/json",i=`system-logs-${(new Date).toISOString().split("T")[0]}.json`;break;case"txt":r=He.map(e=>`[${e.timestamp}] ${e.level.toUpperCase()} ${e.category}/${e.service}: ${e.message}${e.details?"\nDetails: "+JSON.stringify(e.details,null,2):""}`).join("\n\n"),s="text/plain",i=`system-logs-${(new Date).toISOString().split("T")[0]}.txt`}const n=new Blob([r],{type:s}),a=window.URL.createObjectURL(n),o=document.createElement("a");o.href=a,o.download=i,o.click(),window.URL.revokeObjectURL(a),Ce(!1)},Xe=e=>e>=90?"critical":e>=80?"warning":"ok",Ze=e=>"active"===e||"online"===e?"online":"inactive"===e||"stopped"===e||"errored"===e?"offline":"unknown",et=e=>e>=90?"#DC2626":e>=80?"#D97706":e>=60?"#2563EB":"#059669",tt=e=>{if(!e)return"N/A";try{const t=new Date(e),r=(new Date).getTime()-t.getTime(),s=Math.floor(r/864e5);return`${s}d ${Math.floor(r%864e5/36e5)}h`}catch{return e}};return(0,h.jsx)(a.A,{children:(0,h.jsxs)(o.mc,{children:[(0,h.jsxs)(o.Y9,{children:[(0,h.jsx)(o.hE,{children:"System Logs"}),(0,h.jsx)(o.ex,{children:"logs"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.SC,{variant:"secondary",onClick:()=>{Ce(!0)},children:"Export Logs"}),(0,h.jsx)(l.SC,{variant:"danger",onClick:()=>{ke(!0)},children:"Clear Logs"})]})})]}),(0,h.jsxs)(o.UC,{children:[(0,h.jsxs)(T,{children:[(0,h.jsx)(R,{active:"logs"===e,onClick:()=>t("logs"),children:"Logs"}),(0,h.jsx)(R,{active:"health"===e,onClick:()=>t("health"),children:"Server Health"})]}),"health"===e?(()=>{if(Oe&&!Me)return(0,h.jsx)(ae,{children:"Loading server health data..."});if(!Me||!Me.current)return(0,h.jsxs)(ae,{children:["No health data available yet.",(0,h.jsx)("br",{}),'Health checks run every 30 minutes, or click "Check Now" to trigger one.',(0,h.jsx)("div",{style:{marginTop:16},children:(0,h.jsx)(ne,{onClick:_e,disabled:Ue,children:Ue?"Checking...":"Check Now"})})]});const{current:e,lastCheck:t,lastLevel:r,trend:s,alertCount:i}=Me,n=Xe(e.cpu.usage),a=Xe(e.memory.usagePercent),o=Xe(e.disk.usagePercent),l="critical"===r?"critical":"error"===r||"warn"===r||"warning"===r?"warning":"ok";return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(se,{children:[(0,h.jsx)(ie,{children:t?(0,h.jsxs)(h.Fragment,{children:["Last check: ",new Date(t).toLocaleString("en-MY",{hour12:!1})," \xb7 Status: ",(0,h.jsx)("span",{style:{fontWeight:600,color:"ok"===l?"#059669":"warning"===l?"#D97706":"#DC2626"},children:"ok"===l?"Healthy":"warning"===l?"Warning":"Critical"})," \xb7 Alerts (24h): ",i]}):"No health data yet"}),(0,h.jsx)(ne,{onClick:_e,disabled:Ue||Te>0,children:Ue?"Checking...":Te>0?`Wait ${Te}s`:"Check Now"})]}),(0,h.jsxs)(W,{children:[(0,h.jsxs)(q,{status:n,children:[(0,h.jsx)(J,{children:"CPU Usage"}),(0,h.jsxs)(_,{status:n,children:[e.cpu.usage,"%"]}),(0,h.jsx)(H,{children:"Production Server"})]}),(0,h.jsxs)(q,{status:a,children:[(0,h.jsx)(J,{children:"Memory Usage"}),(0,h.jsxs)(_,{status:a,children:[e.memory.usagePercent,"%"]}),(0,h.jsxs)(H,{children:[e.memory.used,"MB / ",e.memory.total,"MB"]})]}),(0,h.jsxs)(q,{status:o,children:[(0,h.jsx)(J,{children:"Disk Usage"}),(0,h.jsxs)(_,{status:o,children:[e.disk.usagePercent,"%"]}),(0,h.jsxs)(H,{children:[e.disk.used," / ",e.disk.total]})]})]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(Q,{children:"Services"}),(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{children:"Nginx (Web Server)"}),(0,h.jsx)(G,{status:Ze(e.services.nginx),children:"active"===e.services.nginx?"Active":e.services.nginx})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{children:"MySQL (Database)"}),(0,h.jsx)(G,{status:Ze(e.services.mysql),children:"active"===e.services.mysql?"Active":e.services.mysql})]}),(e.pm2||[]).map((e,t)=>(0,h.jsxs)(K,{children:[(0,h.jsxs)(V,{children:["PM2: ",e.name]}),(0,h.jsxs)("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[(0,h.jsxs)("span",{style:{fontSize:12,color:"#6B7280"},children:["CPU: ",e.cpu,"% \xb7 MEM: ",e.memory,"MB \xb7 Restarts: ",e.restarts]}),(0,h.jsx)(G,{status:Ze(e.status),children:"online"===e.status?"Online":e.status})]})]},t))]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(Q,{children:"Server Info"}),(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{children:"Server"}),(0,h.jsxs)("span",{style:{fontSize:14,color:"#374151"},children:[e.ip," (production)"]})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{children:"Uptime"}),(0,h.jsx)("span",{style:{fontSize:14,color:"#374151"},children:tt(e.serverUptime)})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(V,{children:"Pending Security Updates"}),(0,h.jsx)("span",{style:{fontSize:14,fontWeight:600,color:e.securityUpdates>10?"#D97706":"#374151"},children:e.securityUpdates})]})]}),s.length>0&&(0,h.jsxs)(Y,{children:[(0,h.jsxs)(Q,{children:["24h Resource Trend (",s.length," data points)"]}),(0,h.jsxs)("div",{style:{marginBottom:16},children:[(0,h.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"CPU"}),s.filter((e,t)=>t%Math.max(1,Math.floor(s.length/12))===0||t===s.length-1).map((e,t)=>(0,h.jsxs)(X,{children:[(0,h.jsx)(Z,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,h.jsx)(te,{children:(0,h.jsx)(ee,{percent:e.cpu,color:et(e.cpu)})}),(0,h.jsxs)(re,{children:[e.cpu,"%"]})]},`cpu-${t}`))]}),(0,h.jsxs)("div",{style:{marginBottom:16},children:[(0,h.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Memory"}),s.filter((e,t)=>t%Math.max(1,Math.floor(s.length/12))===0||t===s.length-1).map((e,t)=>(0,h.jsxs)(X,{children:[(0,h.jsx)(Z,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,h.jsx)(te,{children:(0,h.jsx)(ee,{percent:e.memory,color:et(e.memory)})}),(0,h.jsxs)(re,{children:[e.memory,"%"]})]},`mem-${t}`))]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Disk"}),s.filter((e,t)=>t%Math.max(1,Math.floor(s.length/12))===0||t===s.length-1).map((e,t)=>(0,h.jsxs)(X,{children:[(0,h.jsx)(Z,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,h.jsx)(te,{children:(0,h.jsx)(ee,{percent:e.disk,color:et(e.disk)})}),(0,h.jsxs)(re,{children:[e.disk,"%"]})]},`disk-${t}`))]})]})]})})():(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{color:"#059669",children:[(0,h.jsx)(d.Os,{children:Ye}),(0,h.jsx)(d.v0,{children:"Total Logs (24h)"})]}),(0,h.jsxs)(d.hI,{color:"#DC2626",children:[(0,h.jsx)(d.Os,{children:Qe}),(0,h.jsx)(d.v0,{children:"Errors & Critical"})]}),(0,h.jsxs)(d.hI,{color:"#D97706",children:[(0,h.jsx)(d.Os,{children:Ke}),(0,h.jsx)(d.v0,{children:"Warnings"})]}),(0,h.jsxs)(d.hI,{color:"#2563EB",children:[(0,h.jsx)(d.Os,{children:Ve}),(0,h.jsx)(d.v0,{children:"Recent (1h)"})]})]}),(0,h.jsxs)(c.Qn,{children:[(0,h.jsx)(c.DO,{placeholder:"Search logs...",value:le,onChange:e=>de(e.target.value)}),(0,h.jsxs)(c.Jt,{value:ce,onChange:e=>xe(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Levels"}),(0,h.jsx)("option",{value:"critical",children:"Critical"}),(0,h.jsx)("option",{value:"error",children:"Error"}),(0,h.jsx)("option",{value:"warning",children:"Warning"}),(0,h.jsx)("option",{value:"info",children:"Info"}),(0,h.jsx)("option",{value:"debug",children:"Debug"})]}),(0,h.jsxs)(c.Jt,{value:he,onChange:e=>pe(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),(0,h.jsx)("option",{value:"system",children:"System"}),(0,h.jsx)("option",{value:"database",children:"Database"}),(0,h.jsx)("option",{value:"auth",children:"Authentication"}),(0,h.jsx)("option",{value:"payment",children:"Payment"}),(0,h.jsx)("option",{value:"api",children:"API"}),(0,h.jsx)("option",{value:"security",children:"Security"}),(0,h.jsx)("option",{value:"backup",children:"Backup"})]}),(0,h.jsxs)(c.Jt,{value:ue,onChange:e=>ge(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Services"}),(0,h.jsx)("option",{value:"server-health",children:"Server Health"}),(0,h.jsx)("option",{value:"invoice-scheduler",children:"Invoice Scheduler"}),(0,h.jsx)("option",{value:"subscription-scheduler",children:"Subscription Scheduler"}),(0,h.jsx)("option",{value:"stripe",children:"Stripe"}),(0,h.jsx)("option",{value:"stripe-webhook",children:"Stripe Webhook"}),(0,h.jsx)("option",{value:"order-service",children:"Order Service"}),(0,h.jsx)("option",{value:"auth-service",children:"Auth Service"}),(0,h.jsx)("option",{value:"pos-api",children:"POS API"}),(0,h.jsx)("option",{value:"payment-service",children:"Payment Service"}),(0,h.jsx)("option",{value:"backup-service",children:"Backup Service"}),(0,h.jsx)("option",{value:"kitchen-display-service",children:"Kitchen Display"})]}),(0,h.jsx)(p,{type:"date",value:me,onChange:e=>je(e.target.value)}),(0,h.jsxs)(u,{children:[(0,h.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",textTransform:"uppercase"},children:"Live Mode"}),(0,h.jsx)(g,{active:ve,onClick:()=>ye(!ve),children:ve?"ON":"OFF"})]})]}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(j,{children:[(0,h.jsxs)(v,{children:["System Logs (",He.length," entries)"]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(l.SC,{variant:be?"primary":"secondary",onClick:()=>Fe(!be),children:be?"\u2713 Auto-scroll":"Auto-scroll"}),(0,h.jsx)(l.SC,{variant:"secondary",onClick:()=>{qe()},children:"\ud83d\udd04 Refresh"})]})]}),(0,h.jsxs)(f,{ref:Ie,children:[He.map(e=>{return(0,h.jsxs)(w,{level:e.level,children:[(0,h.jsxs)(b,{children:[(0,h.jsx)(F,{children:(t=e.timestamp,new Date(t).toLocaleString("en-MY",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})+`.${t.split(".")[1]||"000"}`)}),(0,h.jsx)(A,{level:e.level,children:e.level}),(0,h.jsx)(k,{children:e.category}),(0,h.jsx)(S,{children:e.service}),e.statusCode&&(0,h.jsx)("span",{style:{color:e.statusCode>=400?"#DC2626":"#059669",fontWeight:"500"},children:e.statusCode}),e.duration&&(0,h.jsxs)("span",{style:{color:"#6B7280"},children:[e.duration,"ms"]})]}),(0,h.jsx)(C,{children:e.message}),(0,h.jsxs)(B,{children:[e.requestId&&(0,h.jsxs)("span",{children:["Request: ",e.requestId]}),e.userId&&(0,h.jsxs)("span",{children:["User: ",e.userName||e.userId]}),e.ipAddress&&(0,h.jsxs)("span",{children:["IP: ",e.ipAddress]}),e.details&&(0,h.jsx)("span",{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>(e=>{const t=new Set(fe);t.has(e)?t.delete(e):t.add(e),we(t)})(e.id),children:fe.has(e.id)?"Hide Details":"Show Details"})]}),fe.has(e.id)&&e.details&&(0,h.jsx)(E,{children:JSON.stringify(e.details,null,2)})]},e.id);var t}),0===He.length&&(0,h.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"No logs match the current filters"})]})]})]})]}),(0,h.jsxs)(x.aF,{isOpen:Se,onClose:()=>Ce(!1),title:"Export System Logs",children:[(0,h.jsxs)("p",{children:["Select the format for exporting ",He.length," log entries:"]}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(z,{onClick:()=>Ge("csv"),children:[(0,h.jsx)($,{children:"\ud83d\udcca"}),(0,h.jsxs)(I,{children:[(0,h.jsx)(M,{children:"CSV Format"}),(0,h.jsx)(L,{children:"Comma-separated values for spreadsheet analysis"})]})]}),(0,h.jsxs)(z,{onClick:()=>Ge("json"),children:[(0,h.jsx)($,{children:"\ud83d\udcc4"}),(0,h.jsxs)(I,{children:[(0,h.jsx)(M,{children:"JSON Format"}),(0,h.jsx)(L,{children:"Structured data with full details"})]})]}),(0,h.jsxs)(z,{onClick:()=>Ge("txt"),children:[(0,h.jsx)($,{children:"\ud83d\udcdd"}),(0,h.jsxs)(I,{children:[(0,h.jsx)(M,{children:"Text Format"}),(0,h.jsx)(L,{children:"Human-readable log format"})]})]})]})]}),(0,h.jsxs)(x.aF,{isOpen:Ae,onClose:()=>ke(!1),title:"Clear System Logs",footer:(0,h.jsxs)(P,{children:[(0,h.jsx)(x.yl,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,h.jsx)(x.yl,{variant:"danger",onClick:async()=>{try{await n.A.delete("/api/system-logs",{headers:We}),ke(!1),qe()}catch(e){console.error("Failed to clear logs:",e),ke(!1)}},children:"Clear All Logs"})]}),children:[(0,h.jsx)(O,{children:"\u26a0\ufe0f"}),(0,h.jsx)(N,{children:"Are you sure you want to clear all system logs?"}),(0,h.jsxs)(U,{children:["This action cannot be undone. All ",r.length," log entries will be permanently removed."]})]})]})})}}}]);