"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3667],{3667:(e,t,r)=>{r.r(t),r.d(t,{default:()=>xe});var s=r(9950),i=r(4752),n=r(9246),a=r(3832),o=r(4728),l=r(5665),c=r(2488),d=r(9610);const h={"server-health":{critical:{whatHappened:"Production server health check failed or a critical threshold exceeded (disk >90%, CPU >95%, Nginx/MySQL down).",whatToDo:["SSH to production: ssh irene@87.106.78.146","Check services: systemctl status nginx / systemctl status mysql","If down: systemctl restart nginx or systemctl restart mysql","If disk full: df -h \u2192 clear old logs/backups","If unresponsive: contact hosting provider"]},error:{whatHappened:"One or more PM2 processes stopped on the production server.",whatToDo:["SSH to production: ssh irene@87.106.78.146","Check processes: pm2 status","Restart failed process: pm2 restart <name>","Check process logs: pm2 logs <name> --lines 50"]},warning:{whatHappened:"Server resource usage exceeded 80% threshold (disk, memory, or CPU).",whatToDo:["Monitor the trend over the next few hours","If disk: schedule cleanup of old logs and backups","If memory: check for memory leaks with pm2 monit","If CPU: check if any scheduled task is consuming resources"]}},"invoice-scheduler":{critical:{whatHappened:"Invoice scheduler crashed entirely. No invoices were generated in this run.",whatToDo:["Check backend logs: pm2 logs dev-backend --lines 100","Verify database connectivity","Scheduler retries on next cron run (daily at 2 AM)","If persistent: pm2 restart dev-backend"]},error:{whatHappened:"Individual restaurant invoice generation failed.",whatToDo:["Check error details for the specific restaurant/plan","Verify restaurant subscription and plan settings","The failed invoice can be manually created from Invoices page"]},warning:{whatHappened:"Invoice email notification failed to send (SMTP error).",whatToDo:["Check SMTP settings in Admin > Notification Settings","Verify the recipient email address is valid","Invoice was created successfully, only email failed","Resend email manually from the Invoices page"]}},"subscription-scheduler":{error:{whatHappened:"Subscription status check failed for one or more restaurants.",whatToDo:["Check error details for the affected restaurant","Verify the subscription plan settings","Review the restaurant status in Admin > Restaurants"]},warning:{whatHappened:"Subscription status check found expiring subscriptions.",whatToDo:["Review expiring subscriptions in Admin > Subscriptions","Contact restaurant admins about renewal"]}},stripe:{error:{whatHappened:"Stripe PaymentIntent creation or charge failed.",whatToDo:["Check Stripe Dashboard (dashboard.stripe.com) for the payment status","Verify Stripe API keys in Admin > Payment Settings","Check if the customer card was declined","Contact the restaurant to retry payment or use alternative method"]},warning:{whatHappened:"Stripe payment encountered a non-critical issue.",whatToDo:["Check the payment status in Stripe Dashboard","No immediate action needed unless customer reports an issue"]}},"stripe-webhook":{error:{whatHappened:"Stripe webhook signature verification failed or handler error.",whatToDo:["Verify Webhook Secret in Admin > Payment Settings > Stripe","Ensure webhook endpoint URL matches: /api/payment/stripe/webhook","Check Stripe Dashboard > Developers > Webhooks for delivery failures"]},warning:{whatHappened:"Stripe webhook received but payment was not completed.",whatToDo:["Check the invoice status in the Invoices page","The payment may still be processing on Stripe side"]}},paypal:{error:{whatHappened:"PayPal order creation or capture failed.",whatToDo:["Check PayPal Dashboard for transaction status","Verify PayPal API credentials in Admin > Payment Settings","If capture failed: payment may be pending on PayPal side","Contact restaurant to retry or use alternative payment"]},warning:{whatHappened:"PayPal transaction completed with unexpected status.",whatToDo:["Check PayPal Dashboard for the order details","Payment may be pending review","No action needed unless customer reports an issue"]}},"paypal-webhook":{error:{whatHappened:"PayPal webhook handler encountered an error.",whatToDo:["Check PayPal Developer Dashboard for webhook delivery status","Verify webhook URL and event subscriptions","Check the invoice status manually in Invoices page"]},warning:{whatHappened:"PayPal webhook received a payment denial or unexpected event.",whatToDo:["Check the specific invoice status","Contact the payer if payment was denied"]}},"backup-service":{critical:{whatHappened:"Database backup failed completely.",whatToDo:["Verify disk space on backup destination","Check database connectivity","Run manual backup and check for errors","Previous successful backups are still available"]},error:{whatHappened:"Backup process encountered an error.",whatToDo:["Check error details for specific failure reason","Verify backup storage permissions and disk space"]},warning:{whatHappened:"Backup completed but with warnings (slow or large size).",whatToDo:["Monitor backup size trends","Consider archiving or purging old data if backups grow too large"]}},_default:{critical:{whatHappened:"A critical system error occurred.",whatToDo:["Check error details below for specific information","Check server logs: pm2 logs dev-backend --lines 100","This requires immediate investigation"]},error:{whatHappened:"A system error occurred.",whatToDo:["Review the error details below","If recurring, investigate the root cause in service logs","Check pm2 logs dev-backend for related errors"]},warning:{whatHappened:"A potential issue was detected.",whatToDo:["Review the details below","Monitor if the warning frequency increases","Usually no immediate action needed"]}}};var p=r(5030),u=r(9955),x=r(4414);const g=i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,m=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`,v=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>e.active?"\n    background: #10B981;\n    color: white;\n    border-color: #059669;\n    \n    &:hover {\n      background: #047857;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,y=i.Ay.div`
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
`,w=i.Ay.div`
  display: flex;
  gap: 8px;
`,b=i.Ay.div`
  max-height: 700px;
  overflow-y: auto;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.4;
`,k=i.Ay.div`
  padding: 12px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  ${e=>{switch(e.level){case"error":case"critical":return"\n          background: #FEF2F2;\n          border-left: 4px solid #DC2626;\n        ";case"warning":return"\n          background: #FFFBEB;\n          border-left: 4px solid #F59E0B;\n        ";case"debug":return"\n          background: #F8FAFC;\n          border-left: 4px solid #6B7280;\n        ";default:return"\n          &:hover {\n            background: #FAFBFC;\n          }\n        "}}}
  
  &:last-child {
    border-bottom: none;
  }
`,A=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,S=i.Ay.span`
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
`,C=i.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  background: #E0F2FE;
  color: #0891B2;
`,D=i.Ay.span`
  color: #374151;
  font-weight: 500;
`,B=i.Ay.div`
  color: #1F2937;
  margin-bottom: 4px;
`,E=i.Ay.div`
  color: #9CA3AF;
  font-size: 11px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
`,I=i.Ay.pre`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #374151;
  overflow-x: auto;
  white-space: pre-wrap;
`,P=i.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 14px 16px;
  margin-top: 10px;
`,T=i.Ay.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #0369A1;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`,M=i.Ay.div`
  font-size: 13px;
  color: #1E3A5F;
  margin-bottom: 10px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`,z=i.Ay.ol`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #1E3A5F;
  line-height: 1.7;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;

  li {
    margin-bottom: 2px;
  }
`,$=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,H=i.Ay.div`
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
`,L=i.Ay.div`
  font-size: 24px;
`,U=i.Ay.div`
  flex: 1;
`,N=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,R=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,O=i.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,q=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-align: center;
  margin-bottom: 8px;
`,W=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 24px;
`,V=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`,_=i.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`,J=i.Ay.button`
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
`,Y=i.Ay.div`
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
`,Q=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${e=>{switch(e.status){case"ok":return"#D1FAE5";case"warning":return"#FDE68A";case"critical":return"#FCA5A5";default:return"#E6EBF1"}}};
  background: ${e=>{switch(e.status){case"ok":return"#F0FDF4";case"warning":return"#FFFBEB";case"critical":return"#FEF2F2";default:return"#F8FAFC"}}};
`,G=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 8px;
`,K=i.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: ${e=>{switch(e.status){case"ok":return"#059669";case"warning":return"#D97706";case"critical":return"#DC2626";default:return"#6B7280"}}};
`,X=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Z=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px 24px;
  margin-bottom: 16px;
`,ee=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,te=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,re=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,se=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"online":return"#D1FAE5";case"offline":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"online":return"#059669";case"offline":return"#DC2626";default:return"#6B7280"}}};
`,ie=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
`,ne=i.Ay.span`
  color: #6B7280;
  min-width: 50px;
`,ae=i.Ay.div`
  height: 16px;
  width: ${e=>Math.max(e.percent,1)}%;
  max-width: 100%;
  background: ${e=>e.color};
  border-radius: 3px;
  transition: width 0.3s;
`,oe=i.Ay.div`
  flex: 1;
  background: #F3F4F6;
  border-radius: 3px;
  height: 16px;
`,le=i.Ay.span`
  color: #374151;
  font-weight: 500;
  min-width: 45px;
  text-align: right;
`,ce=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,de=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,he=i.Ay.button`
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
`,pe=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  font-size: 16px;
`,ue=e=>({id:String(e.id),timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,details:e.details,userId:e.user_id?String(e.user_id):void 0,userName:e.user_name||void 0,ipAddress:e.ip_address||void 0,userAgent:e.user_agent||void 0,requestId:e.request_id||void 0,duration:e.duration||void 0,statusCode:e.status_code||void 0}),xe=()=>{const{t:e}=(0,p.Bd)("admin"),[t,r]=(0,s.useState)("logs"),[i,xe]=(0,s.useState)([]),[ge,me]=(0,s.useState)(""),[ve,fe]=(0,s.useState)("all"),[ye,je]=(0,s.useState)("all"),[we,be]=(0,s.useState)("all"),[ke,Ae]=(0,s.useState)(""),[Se,Fe]=(0,s.useState)(!1),[Ce,De]=(0,s.useState)(new Set),[Be,Ee]=(0,s.useState)(!1),[Ie,Pe]=(0,s.useState)(!1),[Te,Me]=(0,s.useState)(!1),[ze,$e]=(0,s.useState)({total24h:0,errors:0,warnings:0,recent1h:0}),[,He]=(0,s.useState)(!1),Le=(0,s.useRef)(null),Ue=(0,s.useRef)(null),[Ne,Re]=(0,s.useState)(null),[Oe,qe]=(0,s.useState)(!1),[We,Ve]=(0,s.useState)(!1),[_e,Je]=(0,s.useState)(0),Ye={Authorization:`Bearer ${(0,u.c4)()}`},Qe=(0,s.useCallback)(async()=>{He(!0);try{const e=new URLSearchParams({limit:"200"});"all"!==ve&&e.set("level",ve),"all"!==ye&&e.set("category",ye),"all"!==we&&e.set("service",we),ke&&e.set("start_date",ke),ge&&e.set("search",ge);const[t,r]=await Promise.all([n.A.get(`/api/system-logs?${e}`,{headers:Ye}),n.A.get("/api/system-logs/stats",{headers:Ye})]);t.data.success&&xe(t.data.data.logs.map(ue)),r.data.success&&$e(r.data.data)}catch(e){console.error("Failed to fetch logs:",e)}finally{He(!1)}},[ve,ye,we,ke,ge]),Ge=(0,s.useCallback)(async()=>{qe(!0);try{const e=await n.A.get("/api/system-logs/server-health",{headers:Ye});e.data.success&&Re(e.data.data)}catch(e){console.error("Failed to fetch server health:",e)}finally{qe(!1)}},[]),Ke=async()=>{Ve(!0);try{(await n.A.post("/api/system-logs/server-health/check-now",{},{headers:Ye})).data.success&&await Ge()}catch(t){var e;429===(null===(e=t.response)||void 0===e?void 0:e.status)?console.warn("Rate limited:",t.response.data.message):console.error("Check now failed:",t)}finally{Ve(!1),Je(60)}};(0,s.useEffect)(()=>{if(_e<=0)return;const e=setTimeout(()=>Je(e=>e-1),1e3);return()=>clearTimeout(e)},[_e]),(0,s.useEffect)(()=>{Qe()},[Qe]),(0,s.useEffect)(()=>{"health"===t&&Ge()},[t,Ge]),(0,s.useEffect)(()=>(Se?Le.current=setInterval(Qe,5e3):Le.current&&(clearInterval(Le.current),Le.current=null),()=>{Le.current&&clearInterval(Le.current)}),[Se,Qe]),(0,s.useEffect)(()=>{Be&&Ue.current&&(Ue.current.scrollTop=Ue.current.scrollHeight)},[i,Be]);const Xe=i,Ze=ze.total24h,et=ze.errors,tt=ze.warnings,rt=ze.recent1h,st=e=>{const t=Xe.map(e=>({timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,userId:e.userId,userName:e.userName,ipAddress:e.ipAddress,requestId:e.requestId,duration:e.duration,statusCode:e.statusCode,details:e.details?JSON.stringify(e.details):""}));let r="",s="",i="";switch(e){case"csv":r=[["Timestamp","Level","Category","Service","Message","User ID","User Name","IP Address","Request ID","Duration","Status Code","Details"].join(","),...t.map(e=>[e.timestamp,e.level,e.category,e.service,`"${e.message}"`,e.userId||"",e.userName||"",e.ipAddress||"",e.requestId||"",e.duration||"",e.statusCode||"",`"${e.details}"`].join(","))].join("\n"),s="text/csv",i=`system-logs-${(new Date).toISOString().split("T")[0]}.csv`;break;case"json":r=JSON.stringify(t,null,2),s="application/json",i=`system-logs-${(new Date).toISOString().split("T")[0]}.json`;break;case"txt":r=Xe.map(e=>`[${e.timestamp}] ${e.level.toUpperCase()} ${e.category}/${e.service}: ${e.message}${e.details?"\nDetails: "+JSON.stringify(e.details,null,2):""}`).join("\n\n"),s="text/plain",i=`system-logs-${(new Date).toISOString().split("T")[0]}.txt`}const n=new Blob([r],{type:s}),a=window.URL.createObjectURL(n),o=document.createElement("a");o.href=a,o.download=i,o.click(),window.URL.revokeObjectURL(a),Me(!1)},it=e=>e>=90?"critical":e>=80?"warning":"ok",nt=e=>"active"===e||"online"===e?"online":"inactive"===e||"stopped"===e||"errored"===e?"offline":"unknown",at=e=>e>=90?"#DC2626":e>=80?"#D97706":e>=60?"#2563EB":"#059669",ot=e=>{if(!e)return"N/A";try{const t=new Date(e),r=(new Date).getTime()-t.getTime(),s=Math.floor(r/864e5);return`${s}d ${Math.floor(r%864e5/36e5)}h`}catch{return e}};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(a.mc,{children:[(0,x.jsxs)(a.Y9,{children:[(0,x.jsx)(a.hE,{children:"System Logs"}),(0,x.jsx)(a.ex,{children:"logs"===t&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.SC,{variant:"secondary",onClick:()=>{Me(!0)},children:"Export Logs"}),(0,x.jsx)(o.SC,{variant:"danger",onClick:()=>{Pe(!0)},children:"Clear Logs"})]})})]}),(0,x.jsxs)(a.UC,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(J,{active:"logs"===t,onClick:()=>r("logs"),children:"Logs"}),(0,x.jsx)(J,{active:"health"===t,onClick:()=>r("health"),children:"Server Health"})]}),"health"===t?(()=>{if(Oe&&!Ne)return(0,x.jsx)(pe,{children:"Loading server health data..."});if(!Ne||!Ne.current)return(0,x.jsxs)(pe,{children:["No health data available yet.",(0,x.jsx)("br",{}),'Health checks run every 30 minutes, or click "Check Now" to trigger one.',(0,x.jsx)("div",{style:{marginTop:16},children:(0,x.jsx)(he,{onClick:Ke,disabled:We,children:We?"Checking...":"Check Now"})})]});const{current:e,lastCheck:t,lastLevel:r,trend:s,alertCount:i}=Ne,n=it(e.cpu.usage),a=it(e.memory.usagePercent),o=it(e.disk.usagePercent),l="critical"===r?"critical":"error"===r||"warn"===r||"warning"===r?"warning":"ok";return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(ce,{children:[(0,x.jsx)(de,{children:t?(0,x.jsxs)(x.Fragment,{children:["Last check: ",new Date(t).toLocaleString("en-MY",{hour12:!1})," \xb7 Status: ",(0,x.jsx)("span",{style:{fontWeight:600,color:"ok"===l?"#059669":"warning"===l?"#D97706":"#DC2626"},children:"ok"===l?"Healthy":"warning"===l?"Warning":"Critical"})," \xb7 Alerts (24h): ",i]}):"No health data yet"}),(0,x.jsx)(he,{onClick:Ke,disabled:We||_e>0,children:We?"Checking...":_e>0?`Wait ${_e}s`:"Check Now"})]}),(0,x.jsxs)(Y,{children:[(0,x.jsxs)(Q,{status:n,children:[(0,x.jsx)(G,{children:"CPU Usage"}),(0,x.jsxs)(K,{status:n,children:[e.cpu.usage,"%"]}),(0,x.jsx)(X,{children:"Production Server"})]}),(0,x.jsxs)(Q,{status:a,children:[(0,x.jsx)(G,{children:"Memory Usage"}),(0,x.jsxs)(K,{status:a,children:[e.memory.usagePercent,"%"]}),(0,x.jsxs)(X,{children:[e.memory.used,"MB / ",e.memory.total,"MB"]})]}),(0,x.jsxs)(Q,{status:o,children:[(0,x.jsx)(G,{children:"Disk Usage"}),(0,x.jsxs)(K,{status:o,children:[e.disk.usagePercent,"%"]}),(0,x.jsxs)(X,{children:[e.disk.used," / ",e.disk.total]})]})]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(ee,{children:"Services"}),(0,x.jsxs)(te,{children:[(0,x.jsx)(re,{children:"Nginx (Web Server)"}),(0,x.jsx)(se,{status:nt(e.services.nginx),children:"active"===e.services.nginx?"Active":e.services.nginx})]}),(0,x.jsxs)(te,{children:[(0,x.jsx)(re,{children:"MySQL (Database)"}),(0,x.jsx)(se,{status:nt(e.services.mysql),children:"active"===e.services.mysql?"Active":e.services.mysql})]}),(e.pm2||[]).map((e,t)=>(0,x.jsxs)(te,{children:[(0,x.jsxs)(re,{children:["PM2: ",e.name]}),(0,x.jsxs)("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[(0,x.jsxs)("span",{style:{fontSize:12,color:"#6B7280"},children:["CPU: ",e.cpu,"% \xb7 MEM: ",e.memory,"MB \xb7 Restarts: ",e.restarts]}),(0,x.jsx)(se,{status:nt(e.status),children:"online"===e.status?"Online":e.status})]})]},t))]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(ee,{children:"Server Info"}),(0,x.jsxs)(te,{children:[(0,x.jsx)(re,{children:"Server"}),(0,x.jsxs)("span",{style:{fontSize:14,color:"#374151"},children:[e.ip," (production)"]})]}),(0,x.jsxs)(te,{children:[(0,x.jsx)(re,{children:"Uptime"}),(0,x.jsx)("span",{style:{fontSize:14,color:"#374151"},children:ot(e.serverUptime)})]}),(0,x.jsxs)(te,{children:[(0,x.jsx)(re,{children:"Pending Security Updates"}),(0,x.jsx)("span",{style:{fontSize:14,fontWeight:600,color:e.securityUpdates>10?"#D97706":"#374151"},children:e.securityUpdates})]})]}),s.length>0&&(0,x.jsxs)(Z,{children:[(0,x.jsxs)(ee,{children:["24h Resource Trend (",s.length," data points)"]}),(0,x.jsxs)("div",{style:{marginBottom:16},children:[(0,x.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"CPU"}),s.filter((e,t)=>t%Math.max(1,Math.floor(s.length/12))===0||t===s.length-1).map((e,t)=>(0,x.jsxs)(ie,{children:[(0,x.jsx)(ne,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,x.jsx)(oe,{children:(0,x.jsx)(ae,{percent:e.cpu,color:at(e.cpu)})}),(0,x.jsxs)(le,{children:[e.cpu,"%"]})]},`cpu-${t}`))]}),(0,x.jsxs)("div",{style:{marginBottom:16},children:[(0,x.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Memory"}),s.filter((e,t)=>t%Math.max(1,Math.floor(s.length/12))===0||t===s.length-1).map((e,t)=>(0,x.jsxs)(ie,{children:[(0,x.jsx)(ne,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,x.jsx)(oe,{children:(0,x.jsx)(ae,{percent:e.memory,color:at(e.memory)})}),(0,x.jsxs)(le,{children:[e.memory,"%"]})]},`mem-${t}`))]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Disk"}),s.filter((e,t)=>t%Math.max(1,Math.floor(s.length/12))===0||t===s.length-1).map((e,t)=>(0,x.jsxs)(ie,{children:[(0,x.jsx)(ne,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,x.jsx)(oe,{children:(0,x.jsx)(ae,{percent:e.disk,color:at(e.disk)})}),(0,x.jsxs)(le,{children:[e.disk,"%"]})]},`disk-${t}`))]})]})]})})():(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#059669",children:[(0,x.jsx)(l.Os,{children:Ze}),(0,x.jsx)(l.v0,{children:"Total Logs (24h)"})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:et}),(0,x.jsx)(l.v0,{children:"Errors & Critical"})]}),(0,x.jsxs)(l.hI,{color:"#D97706",children:[(0,x.jsx)(l.Os,{children:tt}),(0,x.jsx)(l.v0,{children:"Warnings"})]}),(0,x.jsxs)(l.hI,{color:"#2563EB",children:[(0,x.jsx)(l.Os,{children:rt}),(0,x.jsx)(l.v0,{children:"Recent (1h)"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsxs)(c.Jt,{value:ve,onChange:e=>fe(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Levels"}),(0,x.jsx)("option",{value:"critical",children:"Critical"}),(0,x.jsx)("option",{value:"error",children:"Error"}),(0,x.jsx)("option",{value:"warning",children:"Warning"}),(0,x.jsx)("option",{value:"info",children:"Info"}),(0,x.jsx)("option",{value:"debug",children:"Debug"})]}),(0,x.jsxs)(c.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),(0,x.jsx)("option",{value:"system",children:"System"}),(0,x.jsx)("option",{value:"database",children:"Database"}),(0,x.jsx)("option",{value:"auth",children:"Authentication"}),(0,x.jsx)("option",{value:"payment",children:"Payment"}),(0,x.jsx)("option",{value:"api",children:"API"}),(0,x.jsx)("option",{value:"security",children:"Security"}),(0,x.jsx)("option",{value:"backup",children:"Backup"})]}),(0,x.jsxs)(c.Jt,{value:we,onChange:e=>be(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Services"}),(0,x.jsx)("option",{value:"server-health",children:"Server Health"}),(0,x.jsx)("option",{value:"invoice-scheduler",children:"Invoice Scheduler"}),(0,x.jsx)("option",{value:"subscription-scheduler",children:"Subscription Scheduler"}),(0,x.jsx)("option",{value:"stripe",children:"Stripe"}),(0,x.jsx)("option",{value:"stripe-webhook",children:"Stripe Webhook"}),(0,x.jsx)("option",{value:"order-service",children:"Order Service"}),(0,x.jsx)("option",{value:"auth-service",children:"Auth Service"}),(0,x.jsx)("option",{value:"pos-api",children:"POS API"}),(0,x.jsx)("option",{value:"payment-service",children:"Payment Service"}),(0,x.jsx)("option",{value:"backup-service",children:"Backup Service"}),(0,x.jsx)("option",{value:"kitchen-display-service",children:"Kitchen Display"})]}),(0,x.jsx)(g,{type:"date",value:ke,onChange:e=>Ae(e.target.value)}),(0,x.jsx)(c.DO,{placeholder:"Search logs...",value:ge,onChange:e=>me(e.target.value)}),(0,x.jsxs)(m,{children:[(0,x.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",textTransform:"uppercase"},children:"Live Mode"}),(0,x.jsx)(v,{active:Se,onClick:()=>Fe(!Se),children:Se?"ON":"OFF"})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(j,{children:["System Logs (",Xe.length," entries)"]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(o.SC,{variant:Be?"primary":"secondary",onClick:()=>Ee(!Be),children:Be?"\u2713 Auto-scroll":"Auto-scroll"}),(0,x.jsx)(o.SC,{variant:"secondary",onClick:()=>{Qe()},children:"\ud83d\udd04 Refresh"})]})]}),(0,x.jsxs)(b,{ref:Ue,children:[Xe.map(e=>{return(0,x.jsxs)(k,{level:e.level,children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(S,{children:(t=e.timestamp,new Date(t).toLocaleString("en-MY",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})+`.${t.split(".")[1]||"000"}`)}),(0,x.jsx)(F,{level:e.level,children:e.level}),(0,x.jsx)(C,{children:e.category}),(0,x.jsx)(D,{children:e.service}),e.statusCode&&(0,x.jsx)("span",{style:{color:e.statusCode>=400?"#DC2626":"#059669",fontWeight:"500"},children:e.statusCode}),e.duration&&(0,x.jsxs)("span",{style:{color:"#6B7280"},children:[e.duration,"ms"]})]}),(0,x.jsx)(B,{children:e.message}),(0,x.jsxs)(E,{children:[e.requestId&&(0,x.jsxs)("span",{children:["Request: ",e.requestId]}),e.userId&&(0,x.jsxs)("span",{children:["User: ",e.userName||e.userId]}),e.ipAddress&&(0,x.jsxs)("span",{children:["IP: ",e.ipAddress]}),e.details&&(0,x.jsx)("span",{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>(e=>{const t=new Set(Ce);t.has(e)?t.delete(e):t.add(e),De(t)})(e.id),children:Ce.has(e.id)?"Hide Details":"Show Details"})]}),Ce.has(e.id)&&e.details&&(0,x.jsx)(I,{children:JSON.stringify(e.details,null,2)}),Ce.has(e.id)&&["warning","error","critical"].includes(e.level)&&(()=>{const t=function(e,t){var r,s;return(null===(r=h[e])||void 0===r?void 0:r[t])||(null===(s=h._default)||void 0===s?void 0:s[t])||null}(e.service,e.level);return t?(0,x.jsxs)(P,{children:[(0,x.jsx)(T,{children:"Action Guide"}),(0,x.jsx)(M,{children:t.whatHappened}),(0,x.jsx)(T,{style:{fontSize:"11px",marginBottom:"6px"},children:"What to do"}),(0,x.jsx)(z,{children:t.whatToDo.map((e,t)=>(0,x.jsx)("li",{children:e},t))})]}):null})()]},e.id);var t}),0===Xe.length&&(0,x.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"No logs match the current filters"})]})]})]})]}),(0,x.jsxs)(d.aF,{isOpen:Te,onClose:()=>Me(!1),title:"Export System Logs",children:[(0,x.jsxs)("p",{children:["Select the format for exporting ",Xe.length," log entries:"]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(H,{onClick:()=>st("csv"),children:[(0,x.jsx)(L,{children:"\ud83d\udcca"}),(0,x.jsxs)(U,{children:[(0,x.jsx)(N,{children:"CSV Format"}),(0,x.jsx)(R,{children:"Comma-separated values for spreadsheet analysis"})]})]}),(0,x.jsxs)(H,{onClick:()=>st("json"),children:[(0,x.jsx)(L,{children:"\ud83d\udcc4"}),(0,x.jsxs)(U,{children:[(0,x.jsx)(N,{children:"JSON Format"}),(0,x.jsx)(R,{children:"Structured data with full details"})]})]}),(0,x.jsxs)(H,{onClick:()=>st("txt"),children:[(0,x.jsx)(L,{children:"\ud83d\udcdd"}),(0,x.jsxs)(U,{children:[(0,x.jsx)(N,{children:"Text Format"}),(0,x.jsx)(R,{children:"Human-readable log format"})]})]})]})]}),(0,x.jsxs)(d.aF,{isOpen:Ie,onClose:()=>Pe(!1),title:"Clear System Logs",footer:(0,x.jsxs)(V,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>Pe(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"danger",onClick:async()=>{try{await n.A.delete("/api/system-logs",{headers:Ye}),Pe(!1),Qe()}catch(e){console.error("Failed to clear logs:",e),Pe(!1)}},children:"Clear All Logs"})]}),children:[(0,x.jsx)(O,{children:"\u26a0\ufe0f"}),(0,x.jsx)(q,{children:"Are you sure you want to clear all system logs?"}),(0,x.jsxs)(W,{children:["This action cannot be undone. All ",i.length," log entries will be permanently removed."]})]})]})})}}}]);