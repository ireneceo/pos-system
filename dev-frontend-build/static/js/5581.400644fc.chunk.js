"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5581],{2653:(e,r,n)=>{n.d(r,{M:()=>s});var a=n(9950),t=n(4492);function s(e){const[r,n]=(0,t.ok)(),s=(0,a.useCallback)(()=>r.get("tab")||e,[r,e]),[i,o]=(0,a.useState)(s());return[i,(0,a.useCallback)(e=>{o(e),n({tab:e})},[n])]}},5581:(e,r,n)=>{n.r(r),n.d(r,{default:()=>Q});var a=n(9950),t=n(4752),s=n(3832),i=n(4728),o=n(1721),d=n(5665),l=n(2597),c=n(2653),p=n(9610),u=n(7617),x=n(5030),h=n(4414);const g=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,m=t.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,b=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,j=t.Ay.div`
  display: flex;
  gap: 8px;
`,y=t.Ay.div`
  display: grid;
  gap: 0;
`,k=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  ${e=>"failed"===e.status&&"\n    background: #FEF2F2;\n  "}

  ${e=>"in-progress"===e.status&&"\n    background: #EFF6FF;\n  "}

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,f=t.Ay.div``,v=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,F=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 12px;
`,A=t.Ay.div``,C=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,w=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,B=t.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`,E=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.variant){case"type":return"#DBEAFE";case"encrypted":return"#ECFDF5";case"compressed":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.variant){case"type":return"#1E40AF";case"encrypted":return"#059669";case"compressed":return"#D97706";default:return"#6B7280"}}};
`,P=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,R=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#ECFDF5";case"in-progress":return"#DBEAFE";case"failed":return"#FEE2E2";case"scheduled":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#059669";case"in-progress":return"#1E40AF";case"failed":return"#DC2626";case"scheduled":return"#D97706";default:return"#6B7280"}}};
`,z=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,S=t.Ay.div`
  padding: 0;
`,D=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
  }
`,$=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,M=t.Ay.div``,O=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,T=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,I=t.Ay.div`
  width: 100%;
  height: 8px;
  background: #F3F4F6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`,N=t.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: #635BFF;
  transition: width 0.3s ease;
`,U=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,Y=t.Ay.div`
  margin-bottom: 20px;
`,q=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,H=t.Ay.input`
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
`,L=t.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,_=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.4;
`,G=t.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
`,K=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,V=t.Ay.div`
  flex: 1;
`,W=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Z=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,J=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,Q=()=>{const{t:e}=(0,x.Bd)("admin"),[r,n]=(0,c.M)("backups"),[t,Q]=(0,a.useState)([]),[X,ee]=(0,a.useState)([]),[re,ne]=(0,a.useState)(!1),[ae,te]=(0,a.useState)(!1),[se,ie]=(0,a.useState)(!1),[,]=(0,a.useState)(null),[oe,de]=(0,a.useState)("full"),[le,ce]=(0,a.useState)(""),[pe,ue]=(0,a.useState)(!1),[xe,he]=(0,a.useState)(0),[ge,me]=(0,a.useState)([]);(0,a.useEffect)(()=>{Q([]),ee([])},[]);const be=t.filter(e=>"completed"===e.status).length,je=t.filter(e=>"failed"===e.status).length,ye=t.filter(e=>"completed"===e.status).reduce((e,r)=>e+r.size,0),ke=e=>{if(0===e)return"0 Bytes";const r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(2))+" "+["Bytes","KB","MB","GB","TB"][r]},fe=e=>{const r=Math.floor(e/3600),n=Math.floor(e%3600/60),a=e%60;return r>0?`${r}h ${n}m ${a}s`:n>0?`${n}m ${a}s`:`${a}s`},ve=e=>new Date(e).toLocaleString("en-MY"),Fe=()=>{ne(!0)};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(s.mc,{children:[(0,h.jsxs)(s.Y9,{children:[(0,h.jsx)(s.hE,{children:e("admin:backupRestorePage.backupRestore")}),(0,h.jsxs)(s.ex,{children:[(0,h.jsx)(i.SC,{variant:"secondary",onClick:()=>{0!==t.filter(e=>"completed"===e.status).length&&ie(!0)},children:e("admin:backupRestorePage.downloadBackup")}),(0,h.jsx)(i.SC,{variant:"primary",onClick:Fe,children:e("admin:backupRestorePage.createBackup")})]})]}),(0,h.jsxs)(s.UC,{children:[(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{color:"#059669",children:[(0,h.jsx)(d.Os,{children:t.length}),(0,h.jsx)(d.v0,{children:e("admin:backupRestorePage.totalBackups")})]}),(0,h.jsxs)(d.hI,{color:"#2563EB",children:[(0,h.jsx)(d.Os,{children:be}),(0,h.jsx)(d.v0,{children:e("admin:backupRestorePage.successfulBackups")})]}),(0,h.jsxs)(d.hI,{color:"#DC2626",children:[(0,h.jsx)(d.Os,{children:je}),(0,h.jsx)(d.v0,{children:e("admin:backupRestorePage.failedBackups")})]}),(0,h.jsxs)(d.hI,{color:"#7C3AED",children:[(0,h.jsx)(d.Os,{children:ke(ye)}),(0,h.jsx)(d.v0,{children:e("admin:backupRestorePage.totalStorageUsed")})]})]}),(0,h.jsxs)(l.tU,{children:[(0,h.jsx)(l.oz,{active:"backups"===r,onClick:()=>n("backups"),children:"Backup History"}),(0,h.jsx)(l.oz,{active:"restore"===r,onClick:()=>n("restore"),children:"Restore Operations"}),(0,h.jsx)(l.oz,{active:"schedule"===r,onClick:()=>n("schedule"),children:"Backup Schedule"})]}),(0,h.jsxs)(g,{children:["backups"===r&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(b,{children:e("admin:backupRestorePage.backupHistory")}),(0,h.jsxs)(j,{children:[(0,h.jsx)(i.SC,{variant:"secondary",onClick:()=>{const e=t.filter(e=>{const r=new Date(e.createdAt),n=new Date;return n.setDate(n.getDate()-30),r<n&&"completed"===e.status});0!==e.length&&(me(e),he(e.length),ue(!0))},children:e("admin:backupRestorePage.cleanupOldBackups")}),(0,h.jsx)(i.SC,{variant:"primary",onClick:Fe,children:e("admin:backupRestorePage.newBackup")})]})]}),(0,h.jsx)(y,{children:t.map(r=>(0,h.jsxs)(k,{status:r.status,children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(v,{children:r.name}),(0,h.jsxs)(F,{children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(C,{children:e("admin:backupRestorePage.size")}),(0,h.jsx)(w,{children:ke(r.size)})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(C,{children:e("admin:backupRestorePage.duration")}),(0,h.jsx)(w,{children:r.duration>0?fe(r.duration):"N/A"})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(C,{children:e("admin:backupRestorePage.created")}),(0,h.jsx)(w,{children:ve(r.createdAt)})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(C,{children:e("admin:backupRestorePage.tables")}),(0,h.jsxs)(w,{children:[r.tables.length," tables"]})]})]}),r.description&&(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:r.description}),(0,h.jsxs)(B,{children:[(0,h.jsx)(E,{variant:"type",children:r.type}),r.encrypted&&(0,h.jsx)(E,{variant:"encrypted",children:e("admin:backupRestorePage.encrypted")}),r.compressed&&(0,h.jsx)(E,{variant:"compressed",children:e("admin:backupRestorePage.compressed")})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(R,{status:r.status,children:r.status}),"completed"===r.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(z,{variant:"primary",children:e("admin:backupRestorePage.restore")}),(0,h.jsx)(z,{children:e("admin:backupRestorePage.download")}),(0,h.jsx)(z,{variant:"danger",children:e("admin:backupRestorePage.delete")})]}),"failed"===r.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(z,{variant:"primary",children:e("admin:backupRestorePage.retry")}),(0,h.jsx)(z,{variant:"danger",children:e("admin:backupRestorePage.delete")})]}),"scheduled"===r.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(z,{children:e("admin:backupRestorePage.editSchedule")}),(0,h.jsx)(z,{variant:"danger",children:e("admin:backupRestorePage.cancel")})]})]})]},r.id))})]}),"restore"===r&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{children:(0,h.jsx)(b,{children:e("admin:backupRestorePage.restoreOperations")})}),(0,h.jsxs)(S,{children:[X.map(e=>(0,h.jsxs)(D,{children:[(0,h.jsxs)($,{children:[(0,h.jsxs)(M,{children:[(0,h.jsxs)(O,{children:["Restoring: ",e.backupName]}),(0,h.jsxs)(T,{children:["Started: ",ve(e.startedAt)," |",e.completedAt&&` Completed: ${ve(e.completedAt)}`]})]}),(0,h.jsx)(R,{status:e.status,children:e.status})]}),(0,h.jsx)(I,{children:(0,h.jsx)(N,{percentage:e.progress})}),(0,h.jsxs)(U,{children:[(0,h.jsxs)("span",{children:[e.restoredTables.length," of ",e.totalTables," tables restored"]}),(0,h.jsxs)("span",{children:[e.progress,"%"]})]}),e.errorMessage&&(0,h.jsxs)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:["Error: ",e.errorMessage]})]},e.id)),0===X.length&&(0,h.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:"40px"},children:"No restore operations in progress"})]})]}),"schedule"===r&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(b,{children:e("admin:backupRestorePage.backupSchedule")}),(0,h.jsx)(j,{children:(0,h.jsx)(i.SC,{variant:"primary",onClick:()=>{te(!0)},children:e("admin:backupRestorePage.addSchedule")})})]}),(0,h.jsxs)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:["Backup scheduling configuration will be implemented here.",(0,h.jsx)("br",{}),"Features: Daily/Weekly/Monthly schedules, retention policies, notification settings."]})]})]}),(0,h.jsxs)(p.aF,{isOpen:re,onClose:()=>ne(!1),title:"Create New Backup",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{const e={id:`backup-${Date.now()}`,name:`${oe.charAt(0).toUpperCase()+oe.slice(1)} Backup - ${(new Date).toLocaleDateString()}`,type:oe,size:0,createdAt:(new Date).toISOString().replace("T"," ").slice(0,19),status:"in-progress",duration:0,location:`s3://orderhere-backups/${oe}-${(new Date).toISOString().split("T")[0]}.sql.gz`,description:le||`${oe} backup created manually`,tables:"full"===oe?["users","restaurants","orders","menu_items","payments","subscriptions","invoices"]:["orders","payments","order_items"],compressed:!0,encrypted:!0};Q([e,...t]),ne(!1),ce(""),setTimeout(()=>{Q(r=>r.map(r=>r.id===e.id?{...r,status:"completed",duration:Math.floor(1800*Math.random())+300,size:Math.floor(1e9*Math.random())+1e8}:r))},3e3)},children:"Create Backup"})]}),children:[(0,h.jsxs)(Y,{children:[(0,h.jsx)(q,{children:e("admin:backupRestorePage.backupType")}),(0,h.jsxs)(o.mM,{value:oe,onChange:e=>de(e.target.value),children:[(0,h.jsx)("option",{value:"full",children:e("admin:backupRestorePage.fullBackup")}),(0,h.jsx)("option",{value:"incremental",children:e("admin:backupRestorePage.incrementalBackup")}),(0,h.jsx)("option",{value:"differential",children:e("admin:backupRestorePage.differentialBackup")})]}),(0,h.jsx)(_,{children:"Full: Complete database backup. Incremental: Only changes since last backup. Differential: Changes since last full backup."})]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(q,{children:e("admin:backupRestorePage.descriptionOptional")}),(0,h.jsx)(L,{value:le,onChange:e=>ce(e.target.value),placeholder:"Enter a description for this backup...",rows:3})]})]}),(0,h.jsxs)(p.aF,{isOpen:se,onClose:()=>ie(!1),title:"Download Backup",footer:(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),children:[(0,h.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a backup to download:"}),(0,h.jsx)(G,{children:t.filter(e=>"completed"===e.status).map(e=>(0,h.jsxs)(K,{onClick:()=>(e=>{const r=document.createElement("a");r.href="#",r.download=`${e.name.replace(/[^a-zA-Z0-9]/g,"-")}.sql.gz`,document.body.appendChild(r),r.click(),document.body.removeChild(r),ie(!1)})(e),children:[(0,h.jsxs)(V,{children:[(0,h.jsx)(W,{children:e.name}),(0,h.jsxs)(Z,{children:[ke(e.size)," \u2022 ",ve(e.createdAt)]})]}),(0,h.jsx)(J,{children:ke(e.size)})]},e.id))})]}),(0,h.jsxs)(p.aF,{isOpen:ae,onClose:()=>te(!1),title:"Add Backup Schedule",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{alert("Backup schedule created successfully!"),te(!1)},children:"Create Schedule"})]}),children:[(0,h.jsxs)(Y,{children:[(0,h.jsx)(q,{children:e("admin:backupRestorePage.scheduleName")}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Daily Full Backup"})]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(q,{children:e("admin:backupRestorePage.backupType")}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"full",children:e("admin:backupRestorePage.fullBackup")}),(0,h.jsx)("option",{value:"incremental",children:e("admin:backupRestorePage.incrementalBackup")})]})]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(q,{children:e("admin:backupRestorePage.frequency")}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"daily",children:e("admin:backupRestorePage.daily")}),(0,h.jsx)("option",{value:"weekly",children:e("admin:backupRestorePage.weekly")}),(0,h.jsx)("option",{value:"monthly",children:e("admin:backupRestorePage.monthly")})]})]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(q,{children:e("admin:backupRestorePage.time")}),(0,h.jsx)(H,{type:"time",defaultValue:"02:00"})]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(q,{children:e("admin:backupRestorePage.retentionPolicy")}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"7",children:e("admin:backupRestorePage.keepFor7Days")}),(0,h.jsx)("option",{value:"30",children:e("admin:backupRestorePage.keepFor30Days")}),(0,h.jsx)("option",{value:"90",children:e("admin:backupRestorePage.keepFor90Days")}),(0,h.jsx)("option",{value:"365",children:e("admin:backupRestorePage.keepFor1Year")})]})]})]})]})]}),(0,h.jsx)(u.A,{isOpen:pe,title:"Cleanup Old Backups",message:`This will delete ${xe} backups older than 30 days. Continue?`,onConfirm:()=>{const e=t.filter(e=>!ge.includes(e));Q(e),ue(!1),me([])},onCancel:()=>{ue(!1),me([])},confirmText:"Delete",cancelText:"Cancel",type:"warning"})]})}},7617:(e,r,n)=>{n.d(r,{A:()=>x});n(9950);var a=n(7119),t=n(4752),s=n(9610),i=n(4414);const o=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,x=e=>{let{isOpen:r,title:n,message:t,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:b="warning"}=e;return r?a.createPortal((0,i.jsx)(s.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,i.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(d,{children:[(0,i.jsx)(l,{children:n}),(0,i.jsx)(c,{children:t})]}),(0,i.jsxs)(p,{children:[(0,i.jsx)(u,{variant:"secondary",onClick:h,children:m}),(0,i.jsx)(u,{variant:"primary",type:b,onClick:x,children:g})]})]})}),document.body):null}}}]);