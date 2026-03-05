"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3667],{2488:(e,t,r)=>{r.d(t,{DO:()=>p,Jt:()=>h,Qn:()=>c});r(9950);var i=r(4752),s=r(4414);const n=i.Ay.div`
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
`,a=i.Ay.input`
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
`,o=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,l=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,d=i.Ay.select`
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
`,c=e=>{let{children:t,className:r,style:i,...a}=e;return(0,s.jsx)(n,{className:r,style:i,...a,children:t})},p=e=>{let{placeholder:t="Search...",value:r,onChange:i,style:n,...d}=e;return(0,s.jsxs)(o,{style:n,children:[(0,s.jsx)(a,{placeholder:t,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,s.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,s.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},h=e=>{let{children:t,...r}=e;return(0,s.jsx)(d,{...r,children:t})}},3667:(e,t,r)=>{r.r(t),r.d(t,{default:()=>he});var i=r(9950),s=r(4752),n=r(9246),a=r(3832),o=r(4728),l=r(5665),d=r(2488),c=r(9610);const p={"server-health":{critical:{whatHappened:"Production server health check failed or a critical threshold exceeded (disk >90%, CPU >95%, Nginx/MySQL down).",whatToDo:["SSH to production: ssh irene@87.106.78.146","Check services: systemctl status nginx / systemctl status mysql","If down: systemctl restart nginx or systemctl restart mysql","If disk full: df -h \u2192 clear old logs/backups","If unresponsive: contact hosting provider"]},error:{whatHappened:"One or more PM2 processes stopped on the production server.",whatToDo:["SSH to production: ssh irene@87.106.78.146","Check processes: pm2 status","Restart failed process: pm2 restart <name>","Check process logs: pm2 logs <name> --lines 50"]},warning:{whatHappened:"Server resource usage exceeded 80% threshold (disk, memory, or CPU).",whatToDo:["Monitor the trend over the next few hours","If disk: schedule cleanup of old logs and backups","If memory: check for memory leaks with pm2 monit","If CPU: check if any scheduled task is consuming resources"]}},"invoice-scheduler":{critical:{whatHappened:"Invoice scheduler crashed entirely. No invoices were generated in this run.",whatToDo:["Check backend logs: pm2 logs dev-backend --lines 100","Verify database connectivity","Scheduler retries on next cron run (daily at 2 AM)","If persistent: pm2 restart dev-backend"]},error:{whatHappened:"Individual restaurant invoice generation failed.",whatToDo:["Check error details for the specific restaurant/plan","Verify restaurant subscription and plan settings","The failed invoice can be manually created from Invoices page"]},warning:{whatHappened:"Invoice email notification failed to send (SMTP error).",whatToDo:["Check SMTP settings in Admin > Notification Settings","Verify the recipient email address is valid","Invoice was created successfully, only email failed","Resend email manually from the Invoices page"]}},"subscription-scheduler":{error:{whatHappened:"Subscription status check failed for one or more restaurants.",whatToDo:["Check error details for the affected restaurant","Verify the subscription plan settings","Review the restaurant status in Admin > Restaurants"]},warning:{whatHappened:"Subscription status check found expiring subscriptions.",whatToDo:["Review expiring subscriptions in Admin > Subscriptions","Contact restaurant admins about renewal"]}},stripe:{error:{whatHappened:"Stripe PaymentIntent creation or charge failed.",whatToDo:["Check Stripe Dashboard (dashboard.stripe.com) for the payment status","Verify Stripe API keys in Admin > Payment Settings","Check if the customer card was declined","Contact the restaurant to retry payment or use alternative method"]},warning:{whatHappened:"Stripe payment encountered a non-critical issue.",whatToDo:["Check the payment status in Stripe Dashboard","No immediate action needed unless customer reports an issue"]}},"stripe-webhook":{error:{whatHappened:"Stripe webhook signature verification failed or handler error.",whatToDo:["Verify Webhook Secret in Admin > Payment Settings > Stripe","Ensure webhook endpoint URL matches: /api/payment/stripe/webhook","Check Stripe Dashboard > Developers > Webhooks for delivery failures"]},warning:{whatHappened:"Stripe webhook received but payment was not completed.",whatToDo:["Check the invoice status in the Invoices page","The payment may still be processing on Stripe side"]}},paypal:{error:{whatHappened:"PayPal order creation or capture failed.",whatToDo:["Check PayPal Dashboard for transaction status","Verify PayPal API credentials in Admin > Payment Settings","If capture failed: payment may be pending on PayPal side","Contact restaurant to retry or use alternative payment"]},warning:{whatHappened:"PayPal transaction completed with unexpected status.",whatToDo:["Check PayPal Dashboard for the order details","Payment may be pending review","No action needed unless customer reports an issue"]}},"paypal-webhook":{error:{whatHappened:"PayPal webhook handler encountered an error.",whatToDo:["Check PayPal Developer Dashboard for webhook delivery status","Verify webhook URL and event subscriptions","Check the invoice status manually in Invoices page"]},warning:{whatHappened:"PayPal webhook received a payment denial or unexpected event.",whatToDo:["Check the specific invoice status","Contact the payer if payment was denied"]}},"backup-service":{critical:{whatHappened:"Database backup failed completely.",whatToDo:["Verify disk space on backup destination","Check database connectivity","Run manual backup and check for errors","Previous successful backups are still available"]},error:{whatHappened:"Backup process encountered an error.",whatToDo:["Check error details for specific failure reason","Verify backup storage permissions and disk space"]},warning:{whatHappened:"Backup completed but with warnings (slow or large size).",whatToDo:["Monitor backup size trends","Consider archiving or purging old data if backups grow too large"]}},_default:{critical:{whatHappened:"A critical system error occurred.",whatToDo:["Check error details below for specific information","Check server logs: pm2 logs dev-backend --lines 100","This requires immediate investigation"]},error:{whatHappened:"A system error occurred.",whatToDo:["Review the error details below","If recurring, investigate the root cause in service logs","Check pm2 logs dev-backend for related errors"]},warning:{whatHappened:"A potential issue was detected.",whatToDo:["Review the details below","Monitor if the warning frequency increases","Usually no immediate action needed"]}}};var h=r(4414);const u=s.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,x=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`,m=s.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>e.active?"\n    background: #059669;\n    color: white;\n    border-color: #059669;\n    \n    &:hover {\n      background: #047857;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,g=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,y=s.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,f=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,v=s.Ay.div`
  display: flex;
  gap: 8px;
`,w=s.Ay.div`
  max-height: 700px;
  overflow-y: auto;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.4;
`,j=s.Ay.div`
  padding: 12px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  ${e=>{switch(e.level){case"error":case"critical":return"\n          background: #FEF2F2;\n          border-left: 4px solid #DC2626;\n        ";case"warning":return"\n          background: #FFFBEB;\n          border-left: 4px solid #F59E0B;\n        ";case"debug":return"\n          background: #F8FAFC;\n          border-left: 4px solid #6B7280;\n        ";default:return"\n          &:hover {\n            background: #FAFBFC;\n          }\n        "}}}
  
  &:last-child {
    border-bottom: none;
  }
`,b=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`,k=s.Ay.span`
  color: #6B7280;
  font-size: 12px;
`,A=s.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.level){case"critical":return"#FEE2E2";case"error":return"#FED7D7";case"warning":return"#FEF3C7";case"info":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.level){case"critical":return"#DC2626";case"error":return"#E53E3E";case"warning":return"#D97706";case"info":return"#1E40AF";default:return"#6B7280"}}};
`,F=s.Ay.span`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  background: #E0F2FE;
  color: #0891B2;
`,C=s.Ay.span`
  color: #374151;
  font-weight: 500;
`,S=s.Ay.div`
  color: #1F2937;
  margin-bottom: 4px;
`,D=s.Ay.div`
  color: #9CA3AF;
  font-size: 11px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,B=s.Ay.pre`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #374151;
  overflow-x: auto;
  white-space: pre-wrap;
`,E=s.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 14px 16px;
  margin-top: 10px;
`,I=s.Ay.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #0369A1;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`,P=s.Ay.div`
  font-size: 13px;
  color: #1E3A5F;
  margin-bottom: 10px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`,T=s.Ay.ol`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #1E3A5F;
  line-height: 1.7;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;

  li {
    margin-bottom: 2px;
  }
`,z=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,M=s.Ay.div`
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
`,$=s.Ay.div`
  font-size: 24px;
`,H=s.Ay.div`
  flex: 1;
`,L=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,U=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,N=s.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,R=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-align: center;
  margin-bottom: 8px;
`,O=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 24px;
`,W=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`,q=s.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`,V=s.Ay.button`
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
`,_=s.Ay.div`
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
`,J=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${e=>{switch(e.status){case"ok":return"#D1FAE5";case"warning":return"#FDE68A";case"critical":return"#FCA5A5";default:return"#E6EBF1"}}};
  background: ${e=>{switch(e.status){case"ok":return"#F0FDF4";case"warning":return"#FFFBEB";case"critical":return"#FEF2F2";default:return"#F8FAFC"}}};
`,Y=s.Ay.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6B7280;
  margin-bottom: 8px;
`,Q=s.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: ${e=>{switch(e.status){case"ok":return"#059669";case"warning":return"#D97706";case"critical":return"#DC2626";default:return"#6B7280"}}};
`,G=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,K=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px 24px;
  margin-bottom: 16px;
`,X=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,Z=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,ee=s.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,te=s.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"online":return"#D1FAE5";case"offline":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"online":return"#059669";case"offline":return"#DC2626";default:return"#6B7280"}}};
`,re=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
`,ie=s.Ay.span`
  color: #6B7280;
  min-width: 50px;
`,se=s.Ay.div`
  height: 16px;
  width: ${e=>Math.max(e.percent,1)}%;
  max-width: 100%;
  background: ${e=>e.color};
  border-radius: 3px;
  transition: width 0.3s;
`,ne=s.Ay.div`
  flex: 1;
  background: #F3F4F6;
  border-radius: 3px;
  height: 16px;
`,ae=s.Ay.span`
  color: #374151;
  font-weight: 500;
  min-width: 45px;
  text-align: right;
`,oe=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,le=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,de=s.Ay.button`
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
`,ce=s.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  font-size: 16px;
`,pe=e=>({id:String(e.id),timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,details:e.details,userId:e.user_id?String(e.user_id):void 0,userName:e.user_name||void 0,ipAddress:e.ip_address||void 0,userAgent:e.user_agent||void 0,requestId:e.request_id||void 0,duration:e.duration||void 0,statusCode:e.status_code||void 0}),he=()=>{const[e,t]=(0,i.useState)("logs"),[r,s]=(0,i.useState)([]),[he,ue]=(0,i.useState)(""),[xe,me]=(0,i.useState)("all"),[ge,ye]=(0,i.useState)("all"),[fe,ve]=(0,i.useState)("all"),[we,je]=(0,i.useState)(""),[be,ke]=(0,i.useState)(!1),[Ae,Fe]=(0,i.useState)(new Set),[Ce,Se]=(0,i.useState)(!1),[De,Be]=(0,i.useState)(!1),[Ee,Ie]=(0,i.useState)(!1),[Pe,Te]=(0,i.useState)({total24h:0,errors:0,warnings:0,recent1h:0}),[,ze]=(0,i.useState)(!1),Me=(0,i.useRef)(null),$e=(0,i.useRef)(null),[He,Le]=(0,i.useState)(null),[Ue,Ne]=(0,i.useState)(!1),[Re,Oe]=(0,i.useState)(!1),[We,qe]=(0,i.useState)(0),Ve={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},_e=(0,i.useCallback)(async()=>{ze(!0);try{const e=new URLSearchParams({limit:"200"});"all"!==xe&&e.set("level",xe),"all"!==ge&&e.set("category",ge),"all"!==fe&&e.set("service",fe),we&&e.set("start_date",we),he&&e.set("search",he);const[t,r]=await Promise.all([n.A.get(`/api/system-logs?${e}`,{headers:Ve}),n.A.get("/api/system-logs/stats",{headers:Ve})]);t.data.success&&s(t.data.data.logs.map(pe)),r.data.success&&Te(r.data.data)}catch(e){console.error("Failed to fetch logs:",e)}finally{ze(!1)}},[xe,ge,fe,we,he]),Je=(0,i.useCallback)(async()=>{Ne(!0);try{const e=await n.A.get("/api/system-logs/server-health",{headers:Ve});e.data.success&&Le(e.data.data)}catch(e){console.error("Failed to fetch server health:",e)}finally{Ne(!1)}},[]),Ye=async()=>{Oe(!0);try{(await n.A.post("/api/system-logs/server-health/check-now",{},{headers:Ve})).data.success&&await Je()}catch(t){var e;429===(null===(e=t.response)||void 0===e?void 0:e.status)?console.warn("Rate limited:",t.response.data.message):console.error("Check now failed:",t)}finally{Oe(!1),qe(60)}};(0,i.useEffect)(()=>{if(We<=0)return;const e=setTimeout(()=>qe(e=>e-1),1e3);return()=>clearTimeout(e)},[We]),(0,i.useEffect)(()=>{_e()},[_e]),(0,i.useEffect)(()=>{"health"===e&&Je()},[e,Je]),(0,i.useEffect)(()=>(be?Me.current=setInterval(_e,5e3):Me.current&&(clearInterval(Me.current),Me.current=null),()=>{Me.current&&clearInterval(Me.current)}),[be,_e]),(0,i.useEffect)(()=>{Ce&&$e.current&&($e.current.scrollTop=$e.current.scrollHeight)},[r,Ce]);const Qe=r,Ge=Pe.total24h,Ke=Pe.errors,Xe=Pe.warnings,Ze=Pe.recent1h,et=e=>{const t=Qe.map(e=>({timestamp:e.timestamp,level:e.level,category:e.category,service:e.service,message:e.message,userId:e.userId,userName:e.userName,ipAddress:e.ipAddress,requestId:e.requestId,duration:e.duration,statusCode:e.statusCode,details:e.details?JSON.stringify(e.details):""}));let r="",i="",s="";switch(e){case"csv":r=[["Timestamp","Level","Category","Service","Message","User ID","User Name","IP Address","Request ID","Duration","Status Code","Details"].join(","),...t.map(e=>[e.timestamp,e.level,e.category,e.service,`"${e.message}"`,e.userId||"",e.userName||"",e.ipAddress||"",e.requestId||"",e.duration||"",e.statusCode||"",`"${e.details}"`].join(","))].join("\n"),i="text/csv",s=`system-logs-${(new Date).toISOString().split("T")[0]}.csv`;break;case"json":r=JSON.stringify(t,null,2),i="application/json",s=`system-logs-${(new Date).toISOString().split("T")[0]}.json`;break;case"txt":r=Qe.map(e=>`[${e.timestamp}] ${e.level.toUpperCase()} ${e.category}/${e.service}: ${e.message}${e.details?"\nDetails: "+JSON.stringify(e.details,null,2):""}`).join("\n\n"),i="text/plain",s=`system-logs-${(new Date).toISOString().split("T")[0]}.txt`}const n=new Blob([r],{type:i}),a=window.URL.createObjectURL(n),o=document.createElement("a");o.href=a,o.download=s,o.click(),window.URL.revokeObjectURL(a),Ie(!1)},tt=e=>e>=90?"critical":e>=80?"warning":"ok",rt=e=>"active"===e||"online"===e?"online":"inactive"===e||"stopped"===e||"errored"===e?"offline":"unknown",it=e=>e>=90?"#DC2626":e>=80?"#D97706":e>=60?"#2563EB":"#059669",st=e=>{if(!e)return"N/A";try{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/864e5);return`${i}d ${Math.floor(r%864e5/36e5)}h`}catch{return e}};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(a.mc,{children:[(0,h.jsxs)(a.Y9,{children:[(0,h.jsx)(a.hE,{children:"System Logs"}),(0,h.jsx)(a.ex,{children:"logs"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.SC,{variant:"secondary",onClick:()=>{Ie(!0)},children:"Export Logs"}),(0,h.jsx)(o.SC,{variant:"danger",onClick:()=>{Be(!0)},children:"Clear Logs"})]})})]}),(0,h.jsxs)(a.UC,{children:[(0,h.jsxs)(q,{children:[(0,h.jsx)(V,{active:"logs"===e,onClick:()=>t("logs"),children:"Logs"}),(0,h.jsx)(V,{active:"health"===e,onClick:()=>t("health"),children:"Server Health"})]}),"health"===e?(()=>{if(Ue&&!He)return(0,h.jsx)(ce,{children:"Loading server health data..."});if(!He||!He.current)return(0,h.jsxs)(ce,{children:["No health data available yet.",(0,h.jsx)("br",{}),'Health checks run every 30 minutes, or click "Check Now" to trigger one.',(0,h.jsx)("div",{style:{marginTop:16},children:(0,h.jsx)(de,{onClick:Ye,disabled:Re,children:Re?"Checking...":"Check Now"})})]});const{current:e,lastCheck:t,lastLevel:r,trend:i,alertCount:s}=He,n=tt(e.cpu.usage),a=tt(e.memory.usagePercent),o=tt(e.disk.usagePercent),l="critical"===r?"critical":"error"===r||"warn"===r||"warning"===r?"warning":"ok";return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(oe,{children:[(0,h.jsx)(le,{children:t?(0,h.jsxs)(h.Fragment,{children:["Last check: ",new Date(t).toLocaleString("en-MY",{hour12:!1})," \xb7 Status: ",(0,h.jsx)("span",{style:{fontWeight:600,color:"ok"===l?"#059669":"warning"===l?"#D97706":"#DC2626"},children:"ok"===l?"Healthy":"warning"===l?"Warning":"Critical"})," \xb7 Alerts (24h): ",s]}):"No health data yet"}),(0,h.jsx)(de,{onClick:Ye,disabled:Re||We>0,children:Re?"Checking...":We>0?`Wait ${We}s`:"Check Now"})]}),(0,h.jsxs)(_,{children:[(0,h.jsxs)(J,{status:n,children:[(0,h.jsx)(Y,{children:"CPU Usage"}),(0,h.jsxs)(Q,{status:n,children:[e.cpu.usage,"%"]}),(0,h.jsx)(G,{children:"Production Server"})]}),(0,h.jsxs)(J,{status:a,children:[(0,h.jsx)(Y,{children:"Memory Usage"}),(0,h.jsxs)(Q,{status:a,children:[e.memory.usagePercent,"%"]}),(0,h.jsxs)(G,{children:[e.memory.used,"MB / ",e.memory.total,"MB"]})]}),(0,h.jsxs)(J,{status:o,children:[(0,h.jsx)(Y,{children:"Disk Usage"}),(0,h.jsxs)(Q,{status:o,children:[e.disk.usagePercent,"%"]}),(0,h.jsxs)(G,{children:[e.disk.used," / ",e.disk.total]})]})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(X,{children:"Services"}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(ee,{children:"Nginx (Web Server)"}),(0,h.jsx)(te,{status:rt(e.services.nginx),children:"active"===e.services.nginx?"Active":e.services.nginx})]}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(ee,{children:"MySQL (Database)"}),(0,h.jsx)(te,{status:rt(e.services.mysql),children:"active"===e.services.mysql?"Active":e.services.mysql})]}),(e.pm2||[]).map((e,t)=>(0,h.jsxs)(Z,{children:[(0,h.jsxs)(ee,{children:["PM2: ",e.name]}),(0,h.jsxs)("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[(0,h.jsxs)("span",{style:{fontSize:12,color:"#6B7280"},children:["CPU: ",e.cpu,"% \xb7 MEM: ",e.memory,"MB \xb7 Restarts: ",e.restarts]}),(0,h.jsx)(te,{status:rt(e.status),children:"online"===e.status?"Online":e.status})]})]},t))]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(X,{children:"Server Info"}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(ee,{children:"Server"}),(0,h.jsxs)("span",{style:{fontSize:14,color:"#374151"},children:[e.ip," (production)"]})]}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(ee,{children:"Uptime"}),(0,h.jsx)("span",{style:{fontSize:14,color:"#374151"},children:st(e.serverUptime)})]}),(0,h.jsxs)(Z,{children:[(0,h.jsx)(ee,{children:"Pending Security Updates"}),(0,h.jsx)("span",{style:{fontSize:14,fontWeight:600,color:e.securityUpdates>10?"#D97706":"#374151"},children:e.securityUpdates})]})]}),i.length>0&&(0,h.jsxs)(K,{children:[(0,h.jsxs)(X,{children:["24h Resource Trend (",i.length," data points)"]}),(0,h.jsxs)("div",{style:{marginBottom:16},children:[(0,h.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"CPU"}),i.filter((e,t)=>t%Math.max(1,Math.floor(i.length/12))===0||t===i.length-1).map((e,t)=>(0,h.jsxs)(re,{children:[(0,h.jsx)(ie,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,h.jsx)(ne,{children:(0,h.jsx)(se,{percent:e.cpu,color:it(e.cpu)})}),(0,h.jsxs)(ae,{children:[e.cpu,"%"]})]},`cpu-${t}`))]}),(0,h.jsxs)("div",{style:{marginBottom:16},children:[(0,h.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Memory"}),i.filter((e,t)=>t%Math.max(1,Math.floor(i.length/12))===0||t===i.length-1).map((e,t)=>(0,h.jsxs)(re,{children:[(0,h.jsx)(ie,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,h.jsx)(ne,{children:(0,h.jsx)(se,{percent:e.memory,color:it(e.memory)})}),(0,h.jsxs)(ae,{children:[e.memory,"%"]})]},`mem-${t}`))]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:13,fontWeight:600,color:"#374151",marginBottom:8},children:"Disk"}),i.filter((e,t)=>t%Math.max(1,Math.floor(i.length/12))===0||t===i.length-1).map((e,t)=>(0,h.jsxs)(re,{children:[(0,h.jsx)(ie,{children:new Date(e.timestamp).toLocaleTimeString("en-MY",{hour:"2-digit",minute:"2-digit",hour12:!1})}),(0,h.jsx)(ne,{children:(0,h.jsx)(se,{percent:e.disk,color:it(e.disk)})}),(0,h.jsxs)(ae,{children:[e.disk,"%"]})]},`disk-${t}`))]})]})]})})():(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:Ge}),(0,h.jsx)(l.v0,{children:"Total Logs (24h)"})]}),(0,h.jsxs)(l.hI,{color:"#DC2626",children:[(0,h.jsx)(l.Os,{children:Ke}),(0,h.jsx)(l.v0,{children:"Errors & Critical"})]}),(0,h.jsxs)(l.hI,{color:"#D97706",children:[(0,h.jsx)(l.Os,{children:Xe}),(0,h.jsx)(l.v0,{children:"Warnings"})]}),(0,h.jsxs)(l.hI,{color:"#2563EB",children:[(0,h.jsx)(l.Os,{children:Ze}),(0,h.jsx)(l.v0,{children:"Recent (1h)"})]})]}),(0,h.jsxs)(d.Qn,{children:[(0,h.jsxs)(d.Jt,{value:xe,onChange:e=>me(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Levels"}),(0,h.jsx)("option",{value:"critical",children:"Critical"}),(0,h.jsx)("option",{value:"error",children:"Error"}),(0,h.jsx)("option",{value:"warning",children:"Warning"}),(0,h.jsx)("option",{value:"info",children:"Info"}),(0,h.jsx)("option",{value:"debug",children:"Debug"})]}),(0,h.jsxs)(d.Jt,{value:ge,onChange:e=>ye(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),(0,h.jsx)("option",{value:"system",children:"System"}),(0,h.jsx)("option",{value:"database",children:"Database"}),(0,h.jsx)("option",{value:"auth",children:"Authentication"}),(0,h.jsx)("option",{value:"payment",children:"Payment"}),(0,h.jsx)("option",{value:"api",children:"API"}),(0,h.jsx)("option",{value:"security",children:"Security"}),(0,h.jsx)("option",{value:"backup",children:"Backup"})]}),(0,h.jsxs)(d.Jt,{value:fe,onChange:e=>ve(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Services"}),(0,h.jsx)("option",{value:"server-health",children:"Server Health"}),(0,h.jsx)("option",{value:"invoice-scheduler",children:"Invoice Scheduler"}),(0,h.jsx)("option",{value:"subscription-scheduler",children:"Subscription Scheduler"}),(0,h.jsx)("option",{value:"stripe",children:"Stripe"}),(0,h.jsx)("option",{value:"stripe-webhook",children:"Stripe Webhook"}),(0,h.jsx)("option",{value:"order-service",children:"Order Service"}),(0,h.jsx)("option",{value:"auth-service",children:"Auth Service"}),(0,h.jsx)("option",{value:"pos-api",children:"POS API"}),(0,h.jsx)("option",{value:"payment-service",children:"Payment Service"}),(0,h.jsx)("option",{value:"backup-service",children:"Backup Service"}),(0,h.jsx)("option",{value:"kitchen-display-service",children:"Kitchen Display"})]}),(0,h.jsx)(u,{type:"date",value:we,onChange:e=>je(e.target.value)}),(0,h.jsx)(d.DO,{placeholder:"Search logs...",value:he,onChange:e=>ue(e.target.value)}),(0,h.jsxs)(x,{children:[(0,h.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",textTransform:"uppercase"},children:"Live Mode"}),(0,h.jsx)(m,{active:be,onClick:()=>ke(!be),children:be?"ON":"OFF"})]})]}),(0,h.jsxs)(g,{children:[(0,h.jsxs)(y,{children:[(0,h.jsxs)(f,{children:["System Logs (",Qe.length," entries)"]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(o.SC,{variant:Ce?"primary":"secondary",onClick:()=>Se(!Ce),children:Ce?"\u2713 Auto-scroll":"Auto-scroll"}),(0,h.jsx)(o.SC,{variant:"secondary",onClick:()=>{_e()},children:"\ud83d\udd04 Refresh"})]})]}),(0,h.jsxs)(w,{ref:$e,children:[Qe.map(e=>{return(0,h.jsxs)(j,{level:e.level,children:[(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:(t=e.timestamp,new Date(t).toLocaleString("en-MY",{hour12:!1,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})+`.${t.split(".")[1]||"000"}`)}),(0,h.jsx)(A,{level:e.level,children:e.level}),(0,h.jsx)(F,{children:e.category}),(0,h.jsx)(C,{children:e.service}),e.statusCode&&(0,h.jsx)("span",{style:{color:e.statusCode>=400?"#DC2626":"#059669",fontWeight:"500"},children:e.statusCode}),e.duration&&(0,h.jsxs)("span",{style:{color:"#6B7280"},children:[e.duration,"ms"]})]}),(0,h.jsx)(S,{children:e.message}),(0,h.jsxs)(D,{children:[e.requestId&&(0,h.jsxs)("span",{children:["Request: ",e.requestId]}),e.userId&&(0,h.jsxs)("span",{children:["User: ",e.userName||e.userId]}),e.ipAddress&&(0,h.jsxs)("span",{children:["IP: ",e.ipAddress]}),e.details&&(0,h.jsx)("span",{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>(e=>{const t=new Set(Ae);t.has(e)?t.delete(e):t.add(e),Fe(t)})(e.id),children:Ae.has(e.id)?"Hide Details":"Show Details"})]}),Ae.has(e.id)&&e.details&&(0,h.jsx)(B,{children:JSON.stringify(e.details,null,2)}),Ae.has(e.id)&&["warning","error","critical"].includes(e.level)&&(()=>{const t=function(e,t){var r,i;return(null===(r=p[e])||void 0===r?void 0:r[t])||(null===(i=p._default)||void 0===i?void 0:i[t])||null}(e.service,e.level);return t?(0,h.jsxs)(E,{children:[(0,h.jsx)(I,{children:"Action Guide"}),(0,h.jsx)(P,{children:t.whatHappened}),(0,h.jsx)(I,{style:{fontSize:"11px",marginBottom:"6px"},children:"What to do"}),(0,h.jsx)(T,{children:t.whatToDo.map((e,t)=>(0,h.jsx)("li",{children:e},t))})]}):null})()]},e.id);var t}),0===Qe.length&&(0,h.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"No logs match the current filters"})]})]})]})]}),(0,h.jsxs)(c.aF,{isOpen:Ee,onClose:()=>Ie(!1),title:"Export System Logs",children:[(0,h.jsxs)("p",{children:["Select the format for exporting ",Qe.length," log entries:"]}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(M,{onClick:()=>et("csv"),children:[(0,h.jsx)($,{children:"\ud83d\udcca"}),(0,h.jsxs)(H,{children:[(0,h.jsx)(L,{children:"CSV Format"}),(0,h.jsx)(U,{children:"Comma-separated values for spreadsheet analysis"})]})]}),(0,h.jsxs)(M,{onClick:()=>et("json"),children:[(0,h.jsx)($,{children:"\ud83d\udcc4"}),(0,h.jsxs)(H,{children:[(0,h.jsx)(L,{children:"JSON Format"}),(0,h.jsx)(U,{children:"Structured data with full details"})]})]}),(0,h.jsxs)(M,{onClick:()=>et("txt"),children:[(0,h.jsx)($,{children:"\ud83d\udcdd"}),(0,h.jsxs)(H,{children:[(0,h.jsx)(L,{children:"Text Format"}),(0,h.jsx)(U,{children:"Human-readable log format"})]})]})]})]}),(0,h.jsxs)(c.aF,{isOpen:De,onClose:()=>Be(!1),title:"Clear System Logs",footer:(0,h.jsxs)(W,{children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"danger",onClick:async()=>{try{await n.A.delete("/api/system-logs",{headers:Ve}),Be(!1),_e()}catch(e){console.error("Failed to clear logs:",e),Be(!1)}},children:"Clear All Logs"})]}),children:[(0,h.jsx)(N,{children:"\u26a0\ufe0f"}),(0,h.jsx)(R,{children:"Are you sure you want to clear all system logs?"}),(0,h.jsxs)(O,{children:["This action cannot be undone. All ",r.length," log entries will be permanently removed."]})]})]})})}}}]);