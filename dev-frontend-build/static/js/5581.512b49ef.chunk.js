"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5581],{2597:(e,r,t)=>{t.d(r,{Ex:()=>d,oz:()=>c,tU:()=>o});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,a=n.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,l=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,o=e=>{let{children:r,className:t,style:n}=e;return(0,s.jsx)(i,{className:t,style:n,children:r})},c=e=>{let{active:r,onClick:t,children:n,className:i}=e;return(0,s.jsx)(a,{active:r,onClick:t,className:i,children:n})},d=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,s.jsx)(l,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>i});var n=t(9950),s=t(4492);function i(e){const[r,t]=(0,s.ok)(),i=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[a,l]=(0,n.useState)(i());return[a,(0,n.useCallback)(e=>{l(e),t({tab:e})},[t])]}},5581:(e,r,t)=>{t.r(r),t.d(r,{default:()=>V});var n=t(9950),s=t(4752),i=t(3832),a=t(4728),l=t(1721),o=t(5665),c=t(2597),d=t(2653),p=t(9610),h=t(4414);const x=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,u=s.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,g=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,j=s.Ay.div`
  display: flex;
  gap: 8px;
`,m=s.Ay.div`
  display: grid;
  gap: 0;
`,f=s.Ay.div`
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
`,y=s.Ay.div``,b=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,v=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 12px;
`,k=s.Ay.div``,F=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,B=s.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,w=s.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`,A=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.variant){case"type":return"#DBEAFE";case"encrypted":return"#ECFDF5";case"compressed":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.variant){case"type":return"#1E40AF";case"encrypted":return"#059669";case"compressed":return"#D97706";default:return"#6B7280"}}};
`,C=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,E=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#ECFDF5";case"in-progress":return"#DBEAFE";case"failed":return"#FEE2E2";case"scheduled":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#059669";case"in-progress":return"#1E40AF";case"failed":return"#DC2626";case"scheduled":return"#D97706";default:return"#6B7280"}}};
`,z=s.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,D=s.Ay.div`
  padding: 0;
`,S=s.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
  }
`,$=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,M=s.Ay.div``,O=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,T=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,N=s.Ay.div`
  width: 100%;
  height: 8px;
  background: #F3F4F6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`,I=s.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: #635BFF;
  transition: width 0.3s ease;
`,R=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,K=s.Ay.div`
  margin-bottom: 20px;
`,U=s.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,q=s.Ay.input`
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
`,H=s.Ay.textarea`
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
`,L=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.4;
`,W=s.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
`,Y=s.Ay.div`
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
`,Z=s.Ay.div`
  flex: 1;
`,_=s.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,G=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,P=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,V=()=>{const[e,r]=(0,d.M)("backups"),[t,s]=(0,n.useState)([]),[V,J]=(0,n.useState)([]),[Q,X]=(0,n.useState)(!1),[ee,re]=(0,n.useState)(!1),[te,ne]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[se,ie]=(0,n.useState)("full"),[ae,le]=(0,n.useState)("");(0,n.useEffect)(()=>{s([]),J([])},[]);const oe=t.filter(e=>"completed"===e.status).length,ce=t.filter(e=>"failed"===e.status).length,de=t.filter(e=>"completed"===e.status).reduce((e,r)=>e+r.size,0),pe=e=>{if(0===e)return"0 Bytes";const r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(2))+" "+["Bytes","KB","MB","GB","TB"][r]},he=e=>{const r=Math.floor(e/3600),t=Math.floor(e%3600/60),n=e%60;return r>0?`${r}h ${t}m ${n}s`:t>0?`${t}m ${n}s`:`${n}s`},xe=e=>new Date(e).toLocaleString("en-MY"),ue=()=>{X(!0)};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(i.mc,{children:[(0,h.jsxs)(i.Y9,{children:[(0,h.jsx)(i.hE,{children:"Backup & Restore"}),(0,h.jsxs)(i.ex,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{0!==t.filter(e=>"completed"===e.status).length?ne(!0):alert("No completed backups available for download.")},children:"Download Backup"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ue,children:"Create Backup"})]})]}),(0,h.jsxs)(i.UC,{children:[(0,h.jsxs)(o.MD,{children:[(0,h.jsxs)(o.hI,{color:"#059669",children:[(0,h.jsx)(o.Os,{children:t.length}),(0,h.jsx)(o.v0,{children:"Total Backups"})]}),(0,h.jsxs)(o.hI,{color:"#2563EB",children:[(0,h.jsx)(o.Os,{children:oe}),(0,h.jsx)(o.v0,{children:"Successful Backups"})]}),(0,h.jsxs)(o.hI,{color:"#DC2626",children:[(0,h.jsx)(o.Os,{children:ce}),(0,h.jsx)(o.v0,{children:"Failed Backups"})]}),(0,h.jsxs)(o.hI,{color:"#7C3AED",children:[(0,h.jsx)(o.Os,{children:pe(de)}),(0,h.jsx)(o.v0,{children:"Total Storage Used"})]})]}),(0,h.jsxs)(c.tU,{children:[(0,h.jsx)(c.oz,{active:"backups"===e,onClick:()=>r("backups"),children:"Backup History"}),(0,h.jsx)(c.oz,{active:"restore"===e,onClick:()=>r("restore"),children:"Restore Operations"}),(0,h.jsx)(c.oz,{active:"schedule"===e,onClick:()=>r("schedule"),children:"Backup Schedule"})]}),(0,h.jsxs)(x,{children:["backups"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{children:"Backup History"}),(0,h.jsxs)(j,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{const e=t.filter(e=>{const r=new Date(e.createdAt),t=new Date;return t.setDate(t.getDate()-30),r<t&&"completed"===e.status});if(0!==e.length){if(confirm(`This will delete ${e.length} backups older than 30 days. Continue?`)){const r=t.filter(r=>!e.includes(r));s(r),alert(`Successfully cleaned up ${e.length} old backups.`)}}else alert("No old backups found to clean up.")},children:"Cleanup Old Backups"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ue,children:"New Backup"})]})]}),(0,h.jsx)(m,{children:t.map(e=>(0,h.jsxs)(f,{status:e.status,children:[(0,h.jsxs)(y,{children:[(0,h.jsx)(b,{children:e.name}),(0,h.jsxs)(v,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Size"}),(0,h.jsx)(B,{children:pe(e.size)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Duration"}),(0,h.jsx)(B,{children:e.duration>0?he(e.duration):"N/A"})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Created"}),(0,h.jsx)(B,{children:xe(e.createdAt)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Tables"}),(0,h.jsxs)(B,{children:[e.tables.length," tables"]})]})]}),e.description&&(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:e.description}),(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{variant:"type",children:e.type}),e.encrypted&&(0,h.jsx)(A,{variant:"encrypted",children:"Encrypted"}),e.compressed&&(0,h.jsx)(A,{variant:"compressed",children:"Compressed"})]})]}),(0,h.jsxs)(C,{children:[(0,h.jsx)(E,{status:e.status,children:e.status}),"completed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(z,{variant:"primary",children:"Restore"}),(0,h.jsx)(z,{children:"Download"}),(0,h.jsx)(z,{variant:"danger",children:"Delete"})]}),"failed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(z,{variant:"primary",children:"Retry"}),(0,h.jsx)(z,{variant:"danger",children:"Delete"})]}),"scheduled"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(z,{children:"Edit Schedule"}),(0,h.jsx)(z,{variant:"danger",children:"Cancel"})]})]})]},e.id))})]}),"restore"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u,{children:(0,h.jsx)(g,{children:"Restore Operations"})}),(0,h.jsxs)(D,{children:[V.map(e=>(0,h.jsxs)(S,{children:[(0,h.jsxs)($,{children:[(0,h.jsxs)(M,{children:[(0,h.jsxs)(O,{children:["Restoring: ",e.backupName]}),(0,h.jsxs)(T,{children:["Started: ",xe(e.startedAt)," |",e.completedAt&&` Completed: ${xe(e.completedAt)}`]})]}),(0,h.jsx)(E,{status:e.status,children:e.status})]}),(0,h.jsx)(N,{children:(0,h.jsx)(I,{percentage:e.progress})}),(0,h.jsxs)(R,{children:[(0,h.jsxs)("span",{children:[e.restoredTables.length," of ",e.totalTables," tables restored"]}),(0,h.jsxs)("span",{children:[e.progress,"%"]})]}),e.errorMessage&&(0,h.jsxs)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:["Error: ",e.errorMessage]})]},e.id)),0===V.length&&(0,h.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:"40px"},children:"No restore operations in progress"})]})]}),"schedule"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{children:"Backup Schedule"}),(0,h.jsx)(j,{children:(0,h.jsx)(a.SC,{variant:"primary",onClick:()=>{re(!0)},children:"Add Schedule"})})]}),(0,h.jsxs)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:["Backup scheduling configuration will be implemented here.",(0,h.jsx)("br",{}),"Features: Daily/Weekly/Monthly schedules, retention policies, notification settings."]})]})]}),(0,h.jsxs)(p.aF,{isOpen:Q,onClose:()=>X(!1),title:"Create New Backup",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{const e={id:`backup-${Date.now()}`,name:`${se.charAt(0).toUpperCase()+se.slice(1)} Backup - ${(new Date).toLocaleDateString()}`,type:se,size:0,createdAt:(new Date).toISOString().replace("T"," ").slice(0,19),status:"in-progress",duration:0,location:`s3://orderhere-backups/${se}-${(new Date).toISOString().split("T")[0]}.sql.gz`,description:ae||`${se} backup created manually`,tables:"full"===se?["users","restaurants","orders","menu_items","payments","subscriptions","invoices"]:["orders","payments","order_items"],compressed:!0,encrypted:!0};s([e,...t]),X(!1),le(""),setTimeout(()=>{s(r=>r.map(r=>r.id===e.id?{...r,status:"completed",duration:Math.floor(1800*Math.random())+300,size:Math.floor(1e9*Math.random())+1e8}:r)),alert("Backup completed successfully!")},3e3)},children:"Create Backup"})]}),children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(U,{children:"Backup Type"}),(0,h.jsxs)(l.mM,{value:se,onChange:e=>ie(e.target.value),children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"}),(0,h.jsx)("option",{value:"differential",children:"Differential Backup"})]}),(0,h.jsx)(L,{children:"Full: Complete database backup. Incremental: Only changes since last backup. Differential: Changes since last full backup."})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(U,{children:"Description (Optional)"}),(0,h.jsx)(H,{value:ae,onChange:e=>le(e.target.value),placeholder:"Enter a description for this backup...",rows:3})]})]}),(0,h.jsxs)(p.aF,{isOpen:te,onClose:()=>ne(!1),title:"Download Backup",footer:(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),children:[(0,h.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a backup to download:"}),(0,h.jsx)(W,{children:t.filter(e=>"completed"===e.status).map(e=>(0,h.jsxs)(Y,{onClick:()=>(e=>{const r=document.createElement("a");r.href="#",r.download=`${e.name.replace(/[^a-zA-Z0-9]/g,"-")}.sql.gz`,document.body.appendChild(r),r.click(),document.body.removeChild(r),alert(`Starting download of ${e.name}...`),ne(!1)})(e),children:[(0,h.jsxs)(Z,{children:[(0,h.jsx)(_,{children:e.name}),(0,h.jsxs)(G,{children:[pe(e.size)," \u2022 ",xe(e.createdAt)]})]}),(0,h.jsx)(P,{children:pe(e.size)})]},e.id))})]}),(0,h.jsxs)(p.aF,{isOpen:ee,onClose:()=>re(!1),title:"Add Backup Schedule",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{alert("Backup schedule created successfully!"),re(!1)},children:"Create Schedule"})]}),children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(U,{children:"Schedule Name"}),(0,h.jsx)(q,{type:"text",placeholder:"e.g., Daily Full Backup"})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(U,{children:"Backup Type"}),(0,h.jsxs)(l.mM,{children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"})]})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(U,{children:"Frequency"}),(0,h.jsxs)(l.mM,{children:[(0,h.jsx)("option",{value:"daily",children:"Daily"}),(0,h.jsx)("option",{value:"weekly",children:"Weekly"}),(0,h.jsx)("option",{value:"monthly",children:"Monthly"})]})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(U,{children:"Time"}),(0,h.jsx)(q,{type:"time",defaultValue:"02:00"})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(U,{children:"Retention Policy"}),(0,h.jsxs)(l.mM,{children:[(0,h.jsx)("option",{value:"7",children:"Keep for 7 days"}),(0,h.jsx)("option",{value:"30",children:"Keep for 30 days"}),(0,h.jsx)("option",{value:"90",children:"Keep for 90 days"}),(0,h.jsx)("option",{value:"365",children:"Keep for 1 year"})]})]})]})]})]})})}}}]);