"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3667],{2488:(e,r,t)=>{t.d(r,{DO:()=>d,Jt:()=>p,Qn:()=>c});var s=t(8819),i=(t(9950),t(4752)),n=t(4414);const a=i.Ay.div`
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
  border: 1px solid ${s.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${s.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${s.w.colors.primary};
    box-shadow: 0 0 0 3px ${s.w.colors.primaryLight};
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
  border: 1px solid ${s.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${s.w.colors.primary};
    box-shadow: 0 0 0 3px ${s.w.colors.primaryLight};
  }

  &:disabled {
    background: ${s.w.colors.surfaceHover};
    color: ${s.w.colors.text.muted};
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
`,c=e=>{let{children:r,className:t,style:s,...i}=e;return(0,n.jsx)(a,{className:t,style:s,...i,children:r})},d=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(o,{placeholder:r,...t})},p=e=>{let{children:r,...t}=e;return(0,n.jsx)(l,{...t,children:r})}},3667:(e,r,t)=>{t.r(r),t.d(r,{default:()=>he});var s=t(8819),i=t(9950),n=t(4752),a=t(9246),o=t(3832),l=t(4728),c=t(5665),d=t(2488),p=t(9610);const h={"server-health":{critical:{whatHappened:"Production server health check failed or a critical threshold exceeded (disk >90%, CPU >95%, Nginx/MySQL down).",whatToDo:["SSH to production: ssh irene@87.106.78.146","Check services: systemctl status nginx / systemctl status mysql","If down: systemctl restart nginx or systemctl restart mysql","If disk full: df -h \u2192 clear old logs/backups","If unresponsive: contact hosting provider"]},error:{whatHappened:"One or more PM2 processes stopped on the production server.",whatToDo:["SSH to production: ssh irene@87.106.78.146","Check processes: pm2 status","Restart failed process: pm2 restart <name>","Check process logs: pm2 logs <name> --lines 50"]},warning:{whatHappened:"Server resource usage exceeded 80% threshold (disk, memory, or CPU).",whatToDo:["Monitor the trend over the next few hours","If disk: schedule cleanup of old logs and backups","If memory: check for memory leaks with pm2 monit","If CPU: check if any scheduled task is consuming resources"]}},"invoice-scheduler":{critical:{whatHappened:"Invoice scheduler crashed entirely. No invoices were generated in this run.",whatToDo:["Check backend logs: pm2 logs dev-backend --lines 100","Verify database connectivity","Scheduler retries on next cron run (daily at 2 AM)","If persistent: pm2 restart dev-backend"]},error:{whatHappened:"Individual restaurant invoice generation failed.",whatToDo:["Check error details for the specific restaurant/plan","Verify restaurant subscription and plan settings","The failed invoice can be manually created from Invoices page"]},warning:{whatHappened:"Invoice email notification failed to send (SMTP error).",whatToDo:["Check SMTP settings in Admin > Notification Settings","Verify the recipient email address is valid","Invoice was created successfully, only email failed","Resend email manually from the Invoices page"]}},"subscription-scheduler":{error:{whatHappened:"Subscription status check failed for one or more restaurants.",whatToDo:["Check error details for the affected restaurant","Verify the subscription plan settings","Review the restaurant status in Admin > Restaurants"]},warning:{whatHappened:"Subscription status check found expiring subscriptions.",whatToDo:["Review expiring subscriptions in Admin > Subscriptions","Contact restaurant admins about renewal"]}},stripe:{error:{whatHappened:"Stripe PaymentIntent creation or charge failed.",whatToDo:["Check Stripe Dashboard (dashboard.stripe.com) for the payment status","Verify Stripe API keys in Admin > Payment Settings","Check if the customer card was declined","Contact the restaurant to retry payment or use alternative method"]},warning:{whatHappened:"Stripe payment encountered a non-critical issue.",whatToDo:["Check the payment status in Stripe Dashboard","No immediate action needed unless customer reports an issue"]}},"stripe-webhook":{error:{whatHappened:"Stripe webhook signature verification failed or handler error.",whatToDo:["Verify Webhook Secret in Admin > Payment Settings > Stripe","Ensure webhook endpoint URL matches: /api/payment/stripe/webhook","Check Stripe Dashboard > Developers > Webhooks for delivery failures"]},warning:{whatHappened:"Stripe webhook received but payment was not completed.",whatToDo:["Check the invoice status in the Invoices page","The payment may still be processing on Stripe side"]}},paypal:{error:{whatHappened:"PayPal order creation or capture failed.",whatToDo:["Check PayPal Dashboard for transaction status","Verify PayPal API credentials in Admin > Payment Settings","If capture failed: payment may be pending on PayPal side","Contact restaurant to retry or use alternative payment"]},warning:{whatHappened:"PayPal transaction completed with unexpected status.",whatToDo:["Check PayPal Dashboard for the order details","Payment may be pending review","No action needed unless customer reports an issue"]}},"paypal-webhook":{error:{whatHappened:"PayPal webhook handler encountered an error.",whatToDo:["Check PayPal Developer Dashboard for webhook delivery status","Verify webhook URL and event subscriptions","Check the invoice status manually in Invoices page"]},warning:{whatHappened:"PayPal webhook received a payment denial or unexpected event.",whatToDo:["Check the specific invoice status","Contact the payer if payment was denied"]}},"backup-service":{critical:{whatHappened:"Database backup failed completely.",whatToDo:["Verify disk space on backup destination","Check database connectivity","Run manual backup and check for errors","Previous successful backups are still available"]},error:{whatHappened:"Backup process encountered an error.",whatToDo:["Check error details for specific failure reason","Verify backup storage permissions and disk space"]},warning:{whatHappened:"Backup completed but with warnings (slow or large size).",whatToDo:["Monitor backup size trends","Consider archiving or purging old data if backups grow too large"]}},_default:{critical:{whatHappened:"A critical system error occurred.",whatToDo:["Check error details below for specific information","Check server logs: pm2 logs dev-backend --lines 100","This requires immediate investigation"]},error:{whatHappened:"A system error occurred.",whatToDo:["Review the error details below","If recurring, investigate the root cause in service logs","Check pm2 logs dev-backend for related errors"]},warning:{whatHappened:"A potential issue was detected.",whatToDo:["Review the details below","Monitor if the warning frequency increases","Usually no immediate action needed"]}}};var u=t(4414);const x=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${s.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,m=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`,g=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>e.active?`\n    background: ${s.w.colors.status.successAlt};\n    color: white;\n    border-color: #059669;\n    \n    &:hover {\n      background: #047857;\n    }\n  `:`\n    background: transparent;\n    color: #6B7280;\n    border-color: ${s.w.colors.border};\n    \n    &:hover {\n      background: ${s.w.colors.surfaceHover};\n      color: ${s.w.colors.secondary};\n    }\n  `}
`,f=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${s.w.colors.border};
  overflow: hidden;
`,y=n.Ay.div`
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
`,w=n.Ay.div`
  display: flex;
  gap: 8px;
`,b=n.Ay.div`
  max-height: 700px;
  overflow-y: auto;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.4;
`,j=n.Ay.div`
  padding: 12px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  ${e=>{switch(e.level){case"error":case"critical":return"\n          background: #FEF2F2;\n          border-left: 4px solid #DC2626;\n        ";case"warning":return"\n          background: #FFFBEB;\n          border-left: 4px solid #F59E0B;\n        ";case"debug":return`\n          background: #F8FAFC;\n          border-left: 4px solid ${s.w.colors.text.muted};\n        `;default:return"\n          &:hover {\n            background: #FAFBFC;\n          }\n        "}}}
  
  &:last-child {
    border-bottom: none;
  }
`,k=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`,A=n.Ay.span`
  color: #6B7280;
  font-size: 12px;
`,S=n.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.level){case"critical":return"#FEE2E2";case"error":return"#FED7D7";case"warning":return"#FEF3C7";case"info":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.level){case"critical":return"#DC2626";case"error":return"#E53E3E";case"warning":return"#D97706";case"info":return"#1E40AF";default:return"#6B7280"}}};
`,C=n.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  background: #E0F2FE;
  color: #0891B2;
`,F=n.Ay.span`
  color: ${s.w.colors.text.dark};
  font-weight: 500;
`,D=n.Ay.div`
  color: #1F2937;
  margin-bottom: 4px;
`,$=n.Ay.div`
  color: #9CA3AF;
  font-size: 11px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,I=n.Ay.pre`
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
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 14px 16px;
  margin-top: 10px;
`,E=n.Ay.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #0369A1;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`,P=n.Ay.div`
  font-size: 13px;
  color: #1E3A5F;
  margin-bottom: 10px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`,T=n.Ay.ol`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #1E3A5F;
  line-height: 1.7;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;

  li {
    margin-bottom: 2px;
  }
`,z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,M=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${s.w.colors.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
    border-color: #635BFF;
    transform: translateY(-1px);
  }
`,H=n.Ay.div`
  font-size: 24px;
`,L=n.Ay.div`
  flex: 1;
`,U=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: ${s.w.colors.secondary};
  margin-bottom: 4px;
`,N=n.Ay.div`
  font-size: 14px;
  color: ${s.w.colors.text.muted};
`,O=n.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,R=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-align: center;
  margin-bottom: 8px;
`,q=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 24px;
`,W=n.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`,V=n.Ay.button`
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
`,_=n.Ay.div`
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
`,J=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${e=>{switch(e.status){case"ok":return"#D1FAE5";case"warning":return"#FDE68A";case"critical":return"#FCA5A5";default:return"#E6EBF1"}}};
  background: ${e=>{switch(e.status){case"ok":return"#F0FDF4";case"warning":return"#FFFBEB";case"critical":return"#FEF2F2";default:return"#F8FAFC"}}};
`,Y=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 8px;
`,Q=n.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: ${e=>{switch(e.status){case"ok":return"#059669";case"warning":return"#D97706";case"critical":return"#DC2626";default:return"#6B7280"}}};
`,G=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,K=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px 24px;
  margin-bottom: 16px;
`,X=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,Z=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,ee=n.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,re=n.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"online":return"#D1FAE5";case"offline":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"online":return"#059669";case"offline":return"#DC2626";default:return"#6B7280"}}};
`,te=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
`,se=n.Ay.span`
  color: ${s.w.colors.text.muted};
  min-width: 50px;
`,ie=n.Ay.div`
  height: 16px;
  width: ${e=>Math.max(e.percent,1)}%;
  max-width: 100%;
  background: ${e=>e.color};
  border-radius: 3px;
  transition: width 0.3s;
`,ne=n.Ay.div`
  flex: 1;
  background: #F3F4F6;
  border-radius: 3px;
  height: 16px;
`,ae=n.Ay.span`
  color: #374151;
  font-weight: 500;
  min-width: 45px;
  text-align: right;
`,oe=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,le=n.Ay.div`
  font-size: 13px;
  color: ${s.w.colors.text.muted};
`,ce=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${s.w.colors.primary};
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
`,de=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  font-size: 16px;
`,pe=e=>({id:String(e.id),timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,details:e.details,userId:e.user_id?String(e.user_id):void 0,userName:e.user_name||void 0,ipAddress:e.ip_address||void 0,userAgent:e.user_agent||void 0,requestId:e.request_id||void 0,duration:e.duration||void 0,statusCode:e.status_code||void 0}),he=()=>{const[e,r]=(0,i.useState)("logs"),[t,s]=(0,i.useState)([]),[n,he]=(0,i.useState)(""),[ue,xe]=(0,i.useState)("all"),[me,ge]=(0,i.useState)("all"),[fe,ye]=(0,i.useState)("all"),[ve,we]=(0,i.useState)(""),[be,je]=(0,i.useState)(!1),[ke,Ae]=(0,i.useState)(new Set),[Se,Ce]=(0,i.useState)(!1),[Fe,De]=(0,i.useState)(!1),[$e,Ie]=(0,i.useState)(!1),[Be,Ee]=(0,i.useState)({total24h:0,errors:0,warnings:0,recent1h:0}),[Pe,Te]=(0,i.useState)(!1),ze=(0,i.useRef)(null),Me=(0,i.useRef)(null),[He,Le]=(0,i.useState)(null),[Ue,Ne]=(0,i.useState)(!1),[Oe,Re]=(0,i.useState)(!1),[qe,We]=(0,i.useState)(0),Ve={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},_e=(0,i.useCallback)(async()=>{Te(!0);try{const e=new URLSearchParams({limit:"200"});"all"!==ue&&e.set("level",ue),"all"!==me&&e.set("category",me),"all"!==fe&&e.set("service",fe),ve&&e.set("start_date",ve),n&&e.set("search",n);const[r,t]=await Promise.all([a.A.get(`/api/system-logs?${e}`,{headers:Ve}),a.A.get("/api/system-logs/stats",{headers:Ve})]);r.data.success&&s(r.data.data.logs.map(pe)),t.data.success&&Ee(t.data.data)}catch(e){console.error("Failed to fetch logs:",e)}finally{Te(!1)}},[ue,me,fe,ve,n]),Je=(0,i.useCallback)(async()=>{Ne(!0);try{const e=await a.A.get("/api/system-logs/server-health",{headers:Ve});e.data.success&&Le(e.data.data)}catch(e){console.error("Failed to fetch server health:",e)}finally{Ne(!1)}},[]),Ye=async()=>{Re(!0);try{(await a.A.post("/api/system-logs/server-health/check-now",{},{headers:Ve})).data.success&&await Je()}catch(r){var e;429===(null===(e=r.response)||void 0===e?void 0:e.status)?console.warn("Rate limited:",r.response.data.message):console.error("Check now failed:",r)}finally{Re(!1),We(60)}};(0,i.useEffect)(()=>{if(qe<=0)return;const e=setTimeout(()=>We(e=>e-1),1e3);return()=>clearTimeout(e)},[qe]),(0,i.useEffect)(()=>{_e()},[_e]),(0,i.useEffect)(()=>{"health"===e&&Je()},[e,Je]),(0,i.useEffect)(()=>(be?ze.current=setInterval(_e,5e3):ze.current&&(clearInterval(ze.current),ze.current=null),()=>{ze.current&&clearInterval(ze.current)}),[be,_e]),(0,i.useEffect)(()=>{Se&&Me.current&&(Me.current.scrollTop=Me.current.scrollHeight)},[t,Se]);const Qe=t,Ge=Be.total24h,Ke=Be.errors,Xe=Be.warnings,Ze=Be.recent1h,er=e=>{const r=Qe.map(e=>({timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,userId:e.userId,userName:e.userName,ipAddress:e.ipAddress,requestId:e.requestId,duration:e.duration,statusCode:e.statusCode,details:e.details?JSON.stringify(e.details):""}));let t="",s="",i="";switch(e){case"csv":t=[["Timestamp","Level","Category","Service","Message","User ID","User Name","IP Address","Request ID","Duration","Status Code","Details"].join(","),...r.map(e=>[e.timestamp,e.level,e.category,e.service,`"${e.message}"`,e.userId||"",e.userName||"",e.ipAddress||"",e.requestId||"",e.duration||"",e.statusCode||"",`"${e.details}"`].join(","))].join("\n"),s="text/csv",i=`system-logs-${(new Date).toISOString().split("T")[0]}.csv`;break;case"json":t=JSON.stringify(r,null,2),s="application/json",i=`system-logs-${(new Date).toISOString().split("T")[0]}.json`;break;case"txt":t=Qe.map(e=>`[${e.timestamp}] ${e.level.toUpperCase()} ${e.category}/${e.service}: ${e.message}${e.details?"\nDetails: "+JSON.stringify(e.details,null,2):""}`).join("\n\n"),s="text/plain",i=`system-logs-${(new Date).toISOString().split("T")[0]}.txt`}const n=new Blob([t],{type:s}),a=window.URL.createObjectURL(n),o=document.createElement("a");o.href=a,o.download=i,o.click(),window.URL.revokeObjectURL(a),Ie(!1)},rr=e=>e>=90?"critical":e>=80?"warning":"ok",tr=e=>"active"===e||"online"===e?"online":"inactive"===e||"stopped"===e||"errored"===e?"offline":"unknown",sr=e=>e>=90?"#DC2626":e>=80?"#D97706":e>=60?"#2563EB":"#059669",ir=e=>{if(!e)return"N/A";try{const r=new Date(e),t=(new Date).getTime()-r.getTime(),s=Math.floor(t/864e5);return`${s}d ${Math.floor(t%864e5/36e5)}h`}catch{return e}};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(o.mc,{children:[(0,u.jsxs)(o.Y9,{children:[(0,u.jsx)(o.hE,{children:"System Logs"}),(0,u.jsx)(o.ex,{children:"logs"===e&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.SC,{variant:"secondary",onClick:()=>{Ie(!0)},children:"Export Logs"}),(0,u.jsx)(l.SC,{variant:"danger",onClick:()=>{De(!0)},children:"Clear Logs"})]})})]}),(0,u.jsxs)(o.UC,{children:[(0,u.jsxs)(W,{children:[(0,u.jsx)(V,{active:"logs"===e,onClick:()=>r("logs"),children:"Logs"}),(0,u.jsx)(V,{active:"health"===e,onClick:()=>r("health"),children:"Server Health"})]}),"health"===e?(()=>{if(Ue&&!He)return(0,u.jsx)(de,{children:"Loading server health data..."});if(!He||!He.current)return(0,u.jsxs)(de,{children:["No health data available yet.",(0,u.jsx)("br",{}),'Health checks run every 30 minutes, or click "Check Now" to trigger one.',(0,u.jsx)("div",{style:{marginTop:16},children:(0,u.jsx)(ce,{onClick:Ye,disabled:Oe,children:Oe?"Checking...":"Check Now"})})]});const{current:e,lastCheck:r,lastLevel:t,trend:s,alertCount:i}=He,n=rr(e.cpu.usage),a=rr(e.memory.usagePercent),o=rr(e.disk.usagePercent),l="critical"===t?"critical":"error"===t||"warn"===t||"warning"===t?"warning":"ok";return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(oe,{children:[(0,u.jsx)(le,{children:r?(0,u.jsxs)(u.Fragment,{children:["Last check: ",new Date(r).toLocaleString("en-MY",{hour12:!1})," \xb7 Status: ",(0,u.jsx)("span",{style:{fontWeight:600,color:"ok"===l?"#059669":"warning"===l?"#D97706":"#DC2626"},children:"ok"===l?"Healthy":"warning"===l?"Warning":"Critical"})," \xb7 Alerts (24h): ",i]}):"No health data yet"}),(0,u.jsx)(ce,{onClick:Ye,disabled:Oe||qe>0,children:Oe?"Checking...":qe>0?`Wait ${qe}s`:"Check Now"})]}),(0,u.jsxs)(_,{children:[(0,u.jsxs)(J,{status:n,children:[(0,u.jsx)(Y,{children:"CPU Usage"}),(0,u.jsxs)(Q,{status:n,children:[e.cpu.usage,"%"]}),(0,u.jsx)(G,{children:"Production Server"})]}),(0,u.jsxs)(J,{status:a,children:[(0,u.jsx)(Y,{children:"Memory Usage"}),(0,u.jsxs)(Q,{status:a,children:[e.memory.usagePercent,"%"]}),(0,u.jsxs)(G,{children:[e.memory.used,"MB / ",e.memory.total,"MB"]})]}),(0,u.jsxs)(J,{status:o,children:[(0,u.jsx)(Y,{children:"Disk Usage"}),(0,u.jsxs)(Q,{status:o,children:[e.disk.usagePercent,"%"]}),(0,u.jsxs)(G,{children:[e.disk.used," / ",e.disk.total]})]})]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(X,{children:"Services"}),(0,u.jsxs)(Z,{children:[(0,u.jsx)(ee,{children:"Nginx (Web Server)"}),(0,u.jsx)(re,{status:tr(e.services.nginx),children:"active"===e.services.nginx?"Active":e.services.nginx})]}),(0,u.jsxs)(Z,{children:[(0,u.jsx)(ee,{children:"MySQL (Database)"}),(0,u.jsx)(re,{status:tr(e.services.mysql),children:"active"===e.services.mysql?"Active":e.services.mysql})]}),(e.pm2||[]).map((e,r)=>(0,u.jsxs)(Z,{children:[(0,u.jsxs)(ee,{children:["PM2: ",e.name]}),(0,u.jsxs)("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[(0,u.jsxs)("span",{style:{fontSize:12,color:"#6B7280"},children:["CPU: ",e.cpu,"% \xb7 MEM: ",e.memory,"MB \xb7 Restarts: ",e.restarts]}),(0,u.jsx)(re,{status:tr(e.status),children:"online"===e.status?"Online":e.status})]})]},r))]}),(0,u.jsxs)(K,{children:[(0,u.jsx)(X,{children:"Server Info"}),(0,u.jsxs)(Z,{children:[(0,u.jsx)(ee,{children:"Server"}),(0,u.jsxs)("span",{style:{fontSize:14,color:"#374151"},children:[e.ip," (production)"]})]}),(0,u.jsxs)(Z,{children:[(0,u.jsx)(ee,{children:"Uptime"}),(0,u.jsx)("span",{style:{fontSize:14,color:"#374151"},children:ir(e.serverUptime)})]}),(0,u.jsxs)(Z,{children:[(0,u.jsx)(ee,{children:"Pending Security Updates"}),(0,u.jsx)("span",{style:{fontSize:14,fontWeight:600,color:e.securityUpdates>10?"#D97706":"#374151"},children:e.securityUpdates})]})]}),s.length>0&&(0,u.jsxs)(K,{children:[(0,u.jsxs)(X,{children:["24h Resource Trend (",s.length," data points)"]}),(0,u.jsxs)("div",{style:{marginBottom:16},children:[(0,u.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"CPU"}),s.filter((e,r)=>r%Math.max(1,Math.floor(s.length/12))===0||r===s.length-1).map((e,r)=>(0,u.jsxs)(te,{children:[(0,u.jsx)(se,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,u.jsx)(ne,{children:(0,u.jsx)(ie,{percent:e.cpu,color:sr(e.cpu)})}),(0,u.jsxs)(ae,{children:[e.cpu,"%"]})]},`cpu-${r}`))]}),(0,u.jsxs)("div",{style:{marginBottom:16},children:[(0,u.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Memory"}),s.filter((e,r)=>r%Math.max(1,Math.floor(s.length/12))===0||r===s.length-1).map((e,r)=>(0,u.jsxs)(te,{children:[(0,u.jsx)(se,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,u.jsx)(ne,{children:(0,u.jsx)(ie,{percent:e.memory,color:sr(e.memory)})}),(0,u.jsxs)(ae,{children:[e.memory,"%"]})]},`mem-${r}`))]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Disk"}),s.filter((e,r)=>r%Math.max(1,Math.floor(s.length/12))===0||r===s.length-1).map((e,r)=>(0,u.jsxs)(te,{children:[(0,u.jsx)(se,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,u.jsx)(ne,{children:(0,u.jsx)(ie,{percent:e.disk,color:sr(e.disk)})}),(0,u.jsxs)(ae,{children:[e.disk,"%"]})]},`disk-${r}`))]})]})]})})():(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(c.MD,{children:[(0,u.jsxs)(c.hI,{color:"#059669",children:[(0,u.jsx)(c.Os,{children:Ge}),(0,u.jsx)(c.v0,{children:"Total Logs (24h)"})]}),(0,u.jsxs)(c.hI,{color:"#DC2626",children:[(0,u.jsx)(c.Os,{children:Ke}),(0,u.jsx)(c.v0,{children:"Errors & Critical"})]}),(0,u.jsxs)(c.hI,{color:"#D97706",children:[(0,u.jsx)(c.Os,{children:Xe}),(0,u.jsx)(c.v0,{children:"Warnings"})]}),(0,u.jsxs)(c.hI,{color:"#2563EB",children:[(0,u.jsx)(c.Os,{children:Ze}),(0,u.jsx)(c.v0,{children:"Recent (1h)"})]})]}),(0,u.jsxs)(d.Qn,{children:[(0,u.jsx)(d.DO,{placeholder:"Search logs...",value:n,onChange:e=>he(e.target.value)}),(0,u.jsxs)(d.Jt,{value:ue,onChange:e=>xe(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Levels"}),(0,u.jsx)("option",{value:"critical",children:"Critical"}),(0,u.jsx)("option",{value:"error",children:"Error"}),(0,u.jsx)("option",{value:"warning",children:"Warning"}),(0,u.jsx)("option",{value:"info",children:"Info"}),(0,u.jsx)("option",{value:"debug",children:"Debug"})]}),(0,u.jsxs)(d.Jt,{value:me,onChange:e=>ge(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Categories"}),(0,u.jsx)("option",{value:"system",children:"System"}),(0,u.jsx)("option",{value:"database",children:"Database"}),(0,u.jsx)("option",{value:"auth",children:"Authentication"}),(0,u.jsx)("option",{value:"payment",children:"Payment"}),(0,u.jsx)("option",{value:"api",children:"API"}),(0,u.jsx)("option",{value:"security",children:"Security"}),(0,u.jsx)("option",{value:"backup",children:"Backup"})]}),(0,u.jsxs)(d.Jt,{value:fe,onChange:e=>ye(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Services"}),(0,u.jsx)("option",{value:"server-health",children:"Server Health"}),(0,u.jsx)("option",{value:"invoice-scheduler",children:"Invoice Scheduler"}),(0,u.jsx)("option",{value:"subscription-scheduler",children:"Subscription Scheduler"}),(0,u.jsx)("option",{value:"stripe",children:"Stripe"}),(0,u.jsx)("option",{value:"stripe-webhook",children:"Stripe Webhook"}),(0,u.jsx)("option",{value:"order-service",children:"Order Service"}),(0,u.jsx)("option",{value:"auth-service",children:"Auth Service"}),(0,u.jsx)("option",{value:"pos-api",children:"POS API"}),(0,u.jsx)("option",{value:"payment-service",children:"Payment Service"}),(0,u.jsx)("option",{value:"backup-service",children:"Backup Service"}),(0,u.jsx)("option",{value:"kitchen-display-service",children:"Kitchen Display"})]}),(0,u.jsx)(x,{type:"date",value:ve,onChange:e=>we(e.target.value)}),(0,u.jsxs)(m,{children:[(0,u.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",textTransform:"uppercase"},children:"Live Mode"}),(0,u.jsx)(g,{active:be,onClick:()=>je(!be),children:be?"ON":"OFF"})]})]}),(0,u.jsxs)(f,{children:[(0,u.jsxs)(y,{children:[(0,u.jsxs)(v,{children:["System Logs (",Qe.length," entries)"]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(l.SC,{variant:Se?"primary":"secondary",onClick:()=>Ce(!Se),children:Se?"\u2713 Auto-scroll":"Auto-scroll"}),(0,u.jsx)(l.SC,{variant:"secondary",onClick:()=>{_e()},children:"\ud83d\udd04 Refresh"})]})]}),(0,u.jsxs)(b,{ref:Me,children:[Qe.map(e=>{return(0,u.jsxs)(j,{level:e.level,children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(A,{children:(r=e.timestamp,new Date(r).toLocaleString("en-MY",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})+`.${r.split(".")[1]||"000"}`)}),(0,u.jsx)(S,{level:e.level,children:e.level}),(0,u.jsx)(C,{children:e.category}),(0,u.jsx)(F,{children:e.service}),e.statusCode&&(0,u.jsx)("span",{style:{color:e.statusCode>=400?"#DC2626":"#059669",fontWeight:"500"},children:e.statusCode}),e.duration&&(0,u.jsxs)("span",{style:{color:"#6B7280"},children:[e.duration,"ms"]})]}),(0,u.jsx)(D,{children:e.message}),(0,u.jsxs)($,{children:[e.requestId&&(0,u.jsxs)("span",{children:["Request: ",e.requestId]}),e.userId&&(0,u.jsxs)("span",{children:["User: ",e.userName||e.userId]}),e.ipAddress&&(0,u.jsxs)("span",{children:["IP: ",e.ipAddress]}),e.details&&(0,u.jsx)("span",{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>(e=>{const r=new Set(ke);r.has(e)?r.delete(e):r.add(e),Ae(r)})(e.id),children:ke.has(e.id)?"Hide Details":"Show Details"})]}),ke.has(e.id)&&e.details&&(0,u.jsx)(I,{children:JSON.stringify(e.details,null,2)}),ke.has(e.id)&&["warning","error","critical"].includes(e.level)&&(()=>{const r=function(e,r){var t,s;return(null===(t=h[e])||void 0===t?void 0:t[r])||(null===(s=h._default)||void 0===s?void 0:s[r])||null}(e.service,e.level);return r?(0,u.jsxs)(B,{children:[(0,u.jsx)(E,{children:"Action Guide"}),(0,u.jsx)(P,{children:r.whatHappened}),(0,u.jsx)(E,{style:{fontSize:"11px",marginBottom:"6px"},children:"What to do"}),(0,u.jsx)(T,{children:r.whatToDo.map((e,r)=>(0,u.jsx)("li",{children:e},r))})]}):null})()]},e.id);var r}),0===Qe.length&&(0,u.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"No logs match the current filters"})]})]})]})]}),(0,u.jsxs)(p.aF,{isOpen:$e,onClose:()=>Ie(!1),title:"Export System Logs",children:[(0,u.jsxs)("p",{children:["Select the format for exporting ",Qe.length," log entries:"]}),(0,u.jsxs)(z,{children:[(0,u.jsxs)(M,{onClick:()=>er("csv"),children:[(0,u.jsx)(H,{children:"\ud83d\udcca"}),(0,u.jsxs)(L,{children:[(0,u.jsx)(U,{children:"CSV Format"}),(0,u.jsx)(N,{children:"Comma-separated values for spreadsheet analysis"})]})]}),(0,u.jsxs)(M,{onClick:()=>er("json"),children:[(0,u.jsx)(H,{children:"\ud83d\udcc4"}),(0,u.jsxs)(L,{children:[(0,u.jsx)(U,{children:"JSON Format"}),(0,u.jsx)(N,{children:"Structured data with full details"})]})]}),(0,u.jsxs)(M,{onClick:()=>er("txt"),children:[(0,u.jsx)(H,{children:"\ud83d\udcdd"}),(0,u.jsxs)(L,{children:[(0,u.jsx)(U,{children:"Text Format"}),(0,u.jsx)(N,{children:"Human-readable log format"})]})]})]})]}),(0,u.jsxs)(p.aF,{isOpen:Fe,onClose:()=>De(!1),title:"Clear System Logs",footer:(0,u.jsxs)(p.jl,{children:[(0,u.jsx)(p.yl,{variant:"secondary",onClick:()=>De(!1),children:"Cancel"}),(0,u.jsx)(p.yl,{variant:"danger",onClick:async()=>{try{await a.A.delete("/api/system-logs",{headers:Ve}),De(!1),_e()}catch(e){console.error("Failed to clear logs:",e),De(!1)}},children:"Clear All Logs"})]}),children:[(0,u.jsx)(O,{children:"\u26a0\ufe0f"}),(0,u.jsx)(R,{children:"Are you sure you want to clear all system logs?"}),(0,u.jsxs)(q,{children:["This action cannot be undone. All ",t.length," log entries will be permanently removed."]})]})]})})}}}]);