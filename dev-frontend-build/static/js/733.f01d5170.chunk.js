"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[733],{733:(e,i,n)=>{n.r(i),n.d(i,{default:()=>J});var t=n(9950),s=n(4752),r=n(3832),l=n(4728),a=n(1721),o=n(5665),c=n(2597),d=n(2653),h=n(9610),x=n(5030),p=n(4414);const u=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,g=s.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: between;
  align-items: center;
`,m=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,y=s.Ay.div`
  max-height: 600px;
  overflow-y: auto;
`,j=s.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  &:hover {
    background: #FAFBFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,v=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`,b=s.Ay.div`
  flex: 1;
`,f=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,A=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,C=s.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,k=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.severity){case"critical":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.severity){case"critical":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,F=s.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
`,w=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0;
  line-height: 1.4;
`,P=s.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
`,S=s.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,E=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;
  opacity: ${e=>e.enabled?1:.6};

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,B=s.Ay.div`
  flex: 1;
`,z=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,D=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`,U=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,T=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,O=s.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`,_=s.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #635BFF;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`,L=s.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #CBD5E1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`,M=s.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,I=s.Ay.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`,R=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 12px;
  line-height: 1.5;
`,V=s.Ay.div`
  margin-top: 24px;
`,$=s.Ay.div`
  margin-bottom: 20px;
`,Y=s.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,N=s.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,q=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,J=()=>{const{t:e}=(0,x.Bd)("admin"),[i,n]=(0,d.M)("events"),[s,J]=(0,t.useState)([]),[W,X]=(0,t.useState)([]),[G,H]=(0,t.useState)(!1),[K,Q]=(0,t.useState)(null),[Z,ee]=(0,t.useState)(!1);(0,t.useEffect)(()=>{J([]),X([])},[]);const ie=s.length,ne=s.filter(e=>"critical"===e.severity).length,te=s.filter(e=>!e.resolved).length,se=W.filter(e=>e.enabled).length,re=e=>{X(W.map(i=>i.id===e?{...i,enabled:!i.enabled,lastUpdated:(new Date).toISOString().replace("T"," ").slice(0,19)}:i))},le=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(r.mc,{children:[(0,p.jsxs)(r.Y9,{children:[(0,p.jsx)(r.hE,{children:e("admin:securityPage.securityAccessControl")}),(0,p.jsxs)(r.ex,{children:[(0,p.jsx)(l.SC,{variant:"secondary",onClick:()=>{const e={generatedAt:(new Date).toISOString(),summary:{totalEvents:s.length,criticalEvents:ne,unresolvedEvents:te,activePolicies:se,totalPolicies:W.length},eventBreakdown:{critical:s.filter(e=>"critical"===e.severity).length,high:s.filter(e=>"high"===e.severity).length,medium:s.filter(e=>"medium"===e.severity).length,low:s.filter(e=>"low"===e.severity).length},eventTypes:{login:s.filter(e=>"login"===e.eventType).length,failed_login:s.filter(e=>"failed_login"===e.eventType).length,permission_change:s.filter(e=>"permission_change"===e.eventType).length,data_access:s.filter(e=>"data_access"===e.eventType).length,suspicious_activity:s.filter(e=>"suspicious_activity"===e.eventType).length},recentEvents:s.slice(0,20),policies:W.map(e=>({name:e.name,enabled:e.enabled,category:e.category,lastUpdated:e.lastUpdated}))},i=JSON.stringify(e,null,2),n=new Blob([i],{type:"application/json"}),t=URL.createObjectURL(n),r=document.createElement("a");r.href=t,r.download=`security-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:e("admin:securityPage.securityReport")}),(0,p.jsx)(l.SC,{variant:"primary",onClick:()=>{ee(!0)},children:e("admin:securityPage.lockAllSessions")})]})]}),(0,p.jsxs)(r.UC,{children:[(0,p.jsxs)(o.MD,{children:[(0,p.jsxs)(o.hI,{color:"#059669",children:[(0,p.jsx)(o.Os,{children:ie}),(0,p.jsx)(o.v0,{children:e("admin:securityPage.securityEvents24h")})]}),(0,p.jsxs)(o.hI,{color:"#DC2626",children:[(0,p.jsx)(o.Os,{children:ne}),(0,p.jsx)(o.v0,{children:e("admin:securityPage.criticalAlerts")})]}),(0,p.jsxs)(o.hI,{color:"#D97706",children:[(0,p.jsx)(o.Os,{children:te}),(0,p.jsx)(o.v0,{children:e("admin:securityPage.unresolvedEvents")})]}),(0,p.jsxs)(o.hI,{color:"#2563EB",children:[(0,p.jsxs)(o.Os,{children:[se,"/",W.length]}),(0,p.jsx)(o.v0,{children:e("admin:securityPage.activePolicies")})]})]}),(0,p.jsxs)(c.tU,{children:[(0,p.jsx)(c.oz,{active:"events"===i,onClick:()=>n("events"),children:"Security Events"}),(0,p.jsx)(c.oz,{active:"policies"===i,onClick:()=>n("policies"),children:"Security Policies"}),(0,p.jsx)(c.oz,{active:"access"===i,onClick:()=>n("access"),children:"Access Control"})]}),(0,p.jsxs)(u,{children:["events"===i&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:(0,p.jsx)(m,{children:e("admin:securityPage.recentSecurityEvents")})}),(0,p.jsx)(y,{children:s.map(e=>(0,p.jsxs)(j,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:e.eventType.replace("_"," ")}),(0,p.jsxs)(A,{children:[e.userName," (",e.userRole,")"]})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(k,{severity:e.severity,children:e.severity}),(0,p.jsx)(F,{children:le(e.timestamp)})]})]}),(0,p.jsx)(w,{children:e.description}),(0,p.jsxs)(P,{children:["IP: ",e.ipAddress," | Location: ",e.location||"Unknown"," | Status: ",e.resolved?"Resolved":"Unresolved"]})]},e.id))})]}),"policies"===i&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:(0,p.jsx)(m,{children:e("admin:securityPage.securityPolicies")})}),(0,p.jsx)(S,{children:W.map(i=>(0,p.jsxs)(E,{enabled:i.enabled,children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(z,{children:i.name}),(0,p.jsx)(D,{children:i.description}),(0,p.jsx)(U,{children:i.category.replace("_"," ")})]}),(0,p.jsxs)(T,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{type:"checkbox",checked:i.enabled,onChange:()=>re(i.id)}),(0,p.jsx)(L,{})]}),(0,p.jsx)(l.SC,{variant:"secondary",onClick:()=>(e=>{Q(e),H(!0)})(i),children:e("admin:securityPage.configure")})]})]},i.id))})]}),"access"===i&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:(0,p.jsx)(m,{children:e("admin:securityPage.accessControlMatrix")})}),(0,p.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:"Access Control Matrix will be implemented here with role-based permissions management."})]})]}),(0,p.jsxs)(h.aF,{isOpen:Z,onClose:()=>ee(!1),title:"Lock All User Sessions",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(h.yl,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,p.jsx)(h.yl,{variant:"primary",onClick:()=>{alert("All user sessions have been locked. Users will be required to re-authenticate."),ee(!1);const e={id:`event-${Date.now()}`,timestamp:(new Date).toISOString().replace("T"," ").slice(0,19),eventType:"permission_change",severity:"high",userId:"admin",userName:"System Administrator",userRole:"Admin",ipAddress:"127.0.0.1",userAgent:"Admin Console",description:"All user sessions locked by administrator",location:"System",resolved:!0};J([e,...s])},children:"Lock All Sessions"})]}),children:[(0,p.jsx)(M,{children:"\u26a0\ufe0f"}),(0,p.jsx)(I,{children:(0,p.jsx)("strong",{children:e("admin:securityPage.areYouSureYouWantToLockAllActiveUserSessions")})}),(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"0",textAlign:"center"},children:"This will immediately terminate all user sessions across all devices. Users will need to log in again to continue using the system."})]}),K&&(0,p.jsxs)(h.aF,{isOpen:G,onClose:()=>H(!1),title:`Configure Policy: ${K.name}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(h.yl,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,p.jsx)(h.yl,{onClick:()=>{alert("Policy configuration updated successfully!"),H(!1)},children:"Save Configuration"})]}),children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(D,{children:K.description}),(0,p.jsxs)(R,{children:[(0,p.jsx)("strong",{children:"Category:"})," ",K.category.replace("_"," "),(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Status:"})," ",K.enabled?"Enabled":"Disabled",(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Last Updated:"})," ",le(K.lastUpdated)]})]}),(0,p.jsxs)(V,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(Y,{children:e("admin:securityPage.policyStatus")}),(0,p.jsxs)(q,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{type:"checkbox",checked:K.enabled,onChange:()=>re(K.id)}),(0,p.jsx)(L,{})]}),(0,p.jsx)("span",{children:K.enabled?"Enabled":"Disabled"})]})]}),"authentication"===K.category&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(Y,{children:e("admin:securityPage.sessionTimeoutMinutes")}),(0,p.jsx)(N,{type:"number",defaultValue:"30",min:"5",max:"480"})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(Y,{children:e("admin:securityPage.maxLoginAttempts")}),(0,p.jsx)(N,{type:"number",defaultValue:"5",min:"3",max:"10"})]})]}),"data_protection"===K.category&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(Y,{children:e("admin:securityPage.encryptionLevel")}),(0,p.jsxs)(a.mM,{defaultValue:"aes256",children:[(0,p.jsx)("option",{value:"aes128",children:e("admin:securityPage.aes128")}),(0,p.jsx)("option",{value:"aes256",children:e("admin:securityPage.aes256")})]})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(Y,{children:e("admin:securityPage.dataRetentionDays")}),(0,p.jsx)(N,{type:"number",defaultValue:"365",min:"30",max:"2555"})]})]}),"monitoring"===K.category&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(Y,{children:e("admin:securityPage.alertThreshold")}),(0,p.jsxs)(a.mM,{defaultValue:"medium",children:[(0,p.jsx)("option",{value:"low",children:e("admin:securityPage.low")}),(0,p.jsx)("option",{value:"medium",children:e("admin:securityPage.medium")}),(0,p.jsx)("option",{value:"high",children:e("admin:securityPage.high")}),(0,p.jsx)("option",{value:"critical",children:e("admin:securityPage.critical")})]})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(Y,{children:e("admin:securityPage.monitoringIntervalMinutes")}),(0,p.jsx)(N,{type:"number",defaultValue:"5",min:"1",max:"60"})]})]})]})]})]})]})})}},2653:(e,i,n)=>{n.d(i,{M:()=>r});var t=n(9950),s=n(4492);function r(e){const[i,n]=(0,s.ok)(),r=(0,t.useCallback)(()=>i.get("tab")||e,[i,e]),[l,a]=(0,t.useState)(r());return[l,(0,t.useCallback)(e=>{a(e),n({tab:e})},[n])]}}}]);