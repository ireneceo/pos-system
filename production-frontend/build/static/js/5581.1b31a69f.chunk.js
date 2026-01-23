"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5581],{5581:(e,r,s)=>{s.r(r),s.d(r,{default:()=>Z});var n=s(9950),t=s(4752),i=s(3310),l=s(3832),a=s(4728),o=s(1721),d=s(5665),c=s(2674),p=s(9610),h=s(4414);const x=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,u=t.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,j=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,g=t.Ay.div`
  display: flex;
  gap: 8px;
`,m=t.Ay.div`
  display: grid;
  gap: 0;
`,y=t.Ay.div`
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
`,f=t.Ay.div``,b=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,v=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 12px;
`,F=t.Ay.div``,k=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,A=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,B=t.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`,C=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.variant){case"type":return"#DBEAFE";case"encrypted":return"#ECFDF5";case"compressed":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.variant){case"type":return"#1E40AF";case"encrypted":return"#059669";case"compressed":return"#D97706";default:return"#6B7280"}}};
`,w=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,E=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#ECFDF5";case"in-progress":return"#DBEAFE";case"failed":return"#FEE2E2";case"scheduled":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#059669";case"in-progress":return"#1E40AF";case"failed":return"#DC2626";case"scheduled":return"#D97706";default:return"#6B7280"}}};
`,S=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,D=t.Ay.div`
  padding: 0;
`,z=t.Ay.div`
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
`,R=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,K=t.Ay.div`
  margin-bottom: 20px;
`,q=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=t.Ay.input`
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
`,H=t.Ay.textarea`
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
`,L=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.4;
`,W=t.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
`,Y=t.Ay.div`
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
`,_=t.Ay.div`
  flex: 1;
`,G=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,P=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,V=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,Z=()=>{const[e,r]=(0,n.useState)("backups"),[s,t]=(0,n.useState)([]),[Z,J]=(0,n.useState)([]),[Q,X]=(0,n.useState)(!1),[ee,re]=(0,n.useState)(!1),[se,ne]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[te,ie]=(0,n.useState)("full"),[le,ae]=(0,n.useState)("");(0,n.useEffect)(()=>{t([]),J([])},[]);const oe=s.filter(e=>"completed"===e.status).length,de=s.filter(e=>"failed"===e.status).length,ce=s.filter(e=>"completed"===e.status).reduce((e,r)=>e+r.size,0),pe=e=>{if(0===e)return"0 Bytes";const r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(2))+" "+["Bytes","KB","MB","GB","TB"][r]},he=e=>{const r=Math.floor(e/3600),s=Math.floor(e%3600/60),n=e%60;return r>0?`${r}h ${s}m ${n}s`:s>0?`${s}m ${n}s`:`${n}s`},xe=e=>new Date(e).toLocaleString("en-MY"),ue=()=>{X(!0)};return(0,h.jsx)(i.A,{children:(0,h.jsxs)(l.mc,{children:[(0,h.jsxs)(l.Y9,{children:[(0,h.jsx)(l.hE,{children:"Backup & Restore"}),(0,h.jsxs)(l.ex,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{0!==s.filter(e=>"completed"===e.status).length?ne(!0):alert("No completed backups available for download.")},children:"Download Backup"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ue,children:"Create Backup"})]})]}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{color:"#059669",children:[(0,h.jsx)(d.Os,{children:s.length}),(0,h.jsx)(d.v0,{children:"Total Backups"})]}),(0,h.jsxs)(d.hI,{color:"#2563EB",children:[(0,h.jsx)(d.Os,{children:oe}),(0,h.jsx)(d.v0,{children:"Successful Backups"})]}),(0,h.jsxs)(d.hI,{color:"#DC2626",children:[(0,h.jsx)(d.Os,{children:de}),(0,h.jsx)(d.v0,{children:"Failed Backups"})]}),(0,h.jsxs)(d.hI,{color:"#7C3AED",children:[(0,h.jsx)(d.Os,{children:pe(ce)}),(0,h.jsx)(d.v0,{children:"Total Storage Used"})]})]}),(0,h.jsxs)(c.j,{children:[(0,h.jsx)(c.oz,{active:"backups"===e,onClick:()=>r("backups"),children:"Backup History"}),(0,h.jsx)(c.oz,{active:"restore"===e,onClick:()=>r("restore"),children:"Restore Operations"}),(0,h.jsx)(c.oz,{active:"schedule"===e,onClick:()=>r("schedule"),children:"Backup Schedule"})]}),(0,h.jsxs)(x,{children:["backups"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(j,{children:"Backup History"}),(0,h.jsxs)(g,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{const e=s.filter(e=>{const r=new Date(e.createdAt),s=new Date;return s.setDate(s.getDate()-30),r<s&&"completed"===e.status});if(0!==e.length){if(confirm(`This will delete ${e.length} backups older than 30 days. Continue?`)){const r=s.filter(r=>!e.includes(r));t(r),alert(`Successfully cleaned up ${e.length} old backups.`)}}else alert("No old backups found to clean up.")},children:"Cleanup Old Backups"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ue,children:"New Backup"})]})]}),(0,h.jsx)(m,{children:s.map(e=>(0,h.jsxs)(y,{status:e.status,children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(b,{children:e.name}),(0,h.jsxs)(v,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(k,{children:"Size"}),(0,h.jsx)(A,{children:pe(e.size)})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(k,{children:"Duration"}),(0,h.jsx)(A,{children:e.duration>0?he(e.duration):"N/A"})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(k,{children:"Created"}),(0,h.jsx)(A,{children:xe(e.createdAt)})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(k,{children:"Tables"}),(0,h.jsxs)(A,{children:[e.tables.length," tables"]})]})]}),e.description&&(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:e.description}),(0,h.jsxs)(B,{children:[(0,h.jsx)(C,{variant:"type",children:e.type}),e.encrypted&&(0,h.jsx)(C,{variant:"encrypted",children:"Encrypted"}),e.compressed&&(0,h.jsx)(C,{variant:"compressed",children:"Compressed"})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(E,{status:e.status,children:e.status}),"completed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(S,{variant:"primary",children:"Restore"}),(0,h.jsx)(S,{children:"Download"}),(0,h.jsx)(S,{variant:"danger",children:"Delete"})]}),"failed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(S,{variant:"primary",children:"Retry"}),(0,h.jsx)(S,{variant:"danger",children:"Delete"})]}),"scheduled"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(S,{children:"Edit Schedule"}),(0,h.jsx)(S,{variant:"danger",children:"Cancel"})]})]})]},e.id))})]}),"restore"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u,{children:(0,h.jsx)(j,{children:"Restore Operations"})}),(0,h.jsxs)(D,{children:[Z.map(e=>(0,h.jsxs)(z,{children:[(0,h.jsxs)($,{children:[(0,h.jsxs)(M,{children:[(0,h.jsxs)(O,{children:["Restoring: ",e.backupName]}),(0,h.jsxs)(T,{children:["Started: ",xe(e.startedAt)," |",e.completedAt&&` Completed: ${xe(e.completedAt)}`]})]}),(0,h.jsx)(E,{status:e.status,children:e.status})]}),(0,h.jsx)(I,{children:(0,h.jsx)(N,{percentage:e.progress})}),(0,h.jsxs)(R,{children:[(0,h.jsxs)("span",{children:[e.restoredTables.length," of ",e.totalTables," tables restored"]}),(0,h.jsxs)("span",{children:[e.progress,"%"]})]}),e.errorMessage&&(0,h.jsxs)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:["Error: ",e.errorMessage]})]},e.id)),0===Z.length&&(0,h.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:"40px"},children:"No restore operations in progress"})]})]}),"schedule"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(j,{children:"Backup Schedule"}),(0,h.jsx)(g,{children:(0,h.jsx)(a.SC,{variant:"primary",onClick:()=>{re(!0)},children:"Add Schedule"})})]}),(0,h.jsxs)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:["Backup scheduling configuration will be implemented here.",(0,h.jsx)("br",{}),"Features: Daily/Weekly/Monthly schedules, retention policies, notification settings."]})]})]}),(0,h.jsxs)(p.aF,{isOpen:Q,onClose:()=>X(!1),title:"Create New Backup",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{const e={id:`backup-${Date.now()}`,name:`${te.charAt(0).toUpperCase()+te.slice(1)} Backup - ${(new Date).toLocaleDateString()}`,type:te,size:0,createdAt:(new Date).toISOString().replace("T"," ").slice(0,19),status:"in-progress",duration:0,location:`s3://orderhere-backups/${te}-${(new Date).toISOString().split("T")[0]}.sql.gz`,description:le||`${te} backup created manually`,tables:"full"===te?["users","restaurants","orders","menu_items","payments","subscriptions","invoices"]:["orders","payments","order_items"],compressed:!0,encrypted:!0};t([e,...s]),X(!1),ae(""),setTimeout(()=>{t(r=>r.map(r=>r.id===e.id?{...r,status:"completed",duration:Math.floor(1800*Math.random())+300,size:Math.floor(1e9*Math.random())+1e8}:r)),alert("Backup completed successfully!")},3e3)},children:"Create Backup"})]}),children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:"Backup Type"}),(0,h.jsxs)(o.mM,{value:te,onChange:e=>ie(e.target.value),children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"}),(0,h.jsx)("option",{value:"differential",children:"Differential Backup"})]}),(0,h.jsx)(L,{children:"Full: Complete database backup. Incremental: Only changes since last backup. Differential: Changes since last full backup."})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:"Description (Optional)"}),(0,h.jsx)(H,{value:le,onChange:e=>ae(e.target.value),placeholder:"Enter a description for this backup...",rows:3})]})]}),(0,h.jsxs)(p.aF,{isOpen:se,onClose:()=>ne(!1),title:"Download Backup",footer:(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),children:[(0,h.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a backup to download:"}),(0,h.jsx)(W,{children:s.filter(e=>"completed"===e.status).map(e=>(0,h.jsxs)(Y,{onClick:()=>(e=>{const r=document.createElement("a");r.href="#",r.download=`${e.name.replace(/[^a-zA-Z0-9]/g,"-")}.sql.gz`,document.body.appendChild(r),r.click(),document.body.removeChild(r),alert(`Starting download of ${e.name}...`),ne(!1)})(e),children:[(0,h.jsxs)(_,{children:[(0,h.jsx)(G,{children:e.name}),(0,h.jsxs)(P,{children:[pe(e.size)," \u2022 ",xe(e.createdAt)]})]}),(0,h.jsx)(V,{children:pe(e.size)})]},e.id))})]}),(0,h.jsxs)(p.aF,{isOpen:ee,onClose:()=>re(!1),title:"Add Backup Schedule",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{alert("Backup schedule created successfully!"),re(!1)},children:"Create Schedule"})]}),children:[(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:"Schedule Name"}),(0,h.jsx)(U,{type:"text",placeholder:"e.g., Daily Full Backup"})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:"Backup Type"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"})]})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:"Frequency"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"daily",children:"Daily"}),(0,h.jsx)("option",{value:"weekly",children:"Weekly"}),(0,h.jsx)("option",{value:"monthly",children:"Monthly"})]})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:"Time"}),(0,h.jsx)(U,{type:"time",defaultValue:"02:00"})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(q,{children:"Retention Policy"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"7",children:"Keep for 7 days"}),(0,h.jsx)("option",{value:"30",children:"Keep for 30 days"}),(0,h.jsx)("option",{value:"90",children:"Keep for 90 days"}),(0,h.jsx)("option",{value:"365",children:"Keep for 1 year"})]})]})]})]})]})})}}}]);