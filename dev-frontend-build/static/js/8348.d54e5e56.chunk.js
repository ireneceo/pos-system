"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8348],{8348:(e,n,t)=>{t.r(n),t.d(n,{default:()=>N});var i=t(9950),a=t(4752),r=t(3310),s=t(1367),o=t(4414);const d=a.Ay.div`
  min-height: 100vh;
`,l=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    flex-direction: column;
    gap: 12px;
  }
`,c=a.Ay.h1`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,x=a.Ay.div`
  display: flex;
  gap: 8px;
`,p=a.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${e=>"secondary"===e.variant?"#E6EBF1":"#635BFF"};
  background: ${e=>"secondary"===e.variant?"white":"#635BFF"};
  color: ${e=>"secondary"===e.variant?"#0A2540":"white"};
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`,h=a.Ay.div`
  padding: 24px 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,u=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
`,g=a.Ay.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=a.Ay.td`
  padding: 12px 16px;
  font-size: 13px;
  color: #0A2540;
  border-bottom: 1px solid #F1F5F9;
`,j=a.Ay.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FFF7ED";case"inactive":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#EA580C";case"inactive":return"#DC2626";default:return"#6B7280"}}};
`,m=a.Ay.button`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #FCA5A5;
  background: #FEF2F2;
  color: #DC2626;
  transition: all 0.2s;

  &:hover {
    background: #FEE2E2;
  }
`,f=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6B7C93;
  font-size: 14px;
`,b=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
  font-size: 14px;
`,v=a.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
`,A=a.Ay.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
  margin: auto;
  flex-shrink: 0;
`,k=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
`,C=a.Ay.h2`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,F=a.Ay.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
`,w=a.Ay.div`
  padding: 24px;
`,E=a.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,z=a.Ay.div`
  margin-bottom: 16px;
`,B=a.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`,S=a.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,$=a.Ay.div`
  margin-top: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
`,R=a.Ay.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,_=a.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 13px;
`,T=a.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`,D=a.Ay.div`
  margin-top: 8px;
  padding: 12px;
  background: #F0F0FF;
  border: 1px solid #C4B5FD;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,L=a.Ay.p`
  font-size: 14px;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.5;
`,N=()=>{var e;const{user:n}=(0,s.As)(),[t,a]=(0,i.useState)([]),[N,P]=(0,i.useState)(!0),[U,I]=(0,i.useState)(!1),[O,W]=(0,i.useState)({name:"",address:"",phone:"",email:"",cuisine_type:""}),[J,K]=(0,i.useState)(!1),[M,Y]=(0,i.useState)(!1),[q,G]=(0,i.useState)(""),[H,Q]=(0,i.useState)([]),[V,X]=(0,i.useState)(null),[Z,ee]=(0,i.useState)(!1),[ne,te]=(0,i.useState)(!1),[ie,ae]=(0,i.useState)(null),[re,se]=(0,i.useState)(!1),oe=localStorage.getItem("auth_token");(0,i.useEffect)(()=>{de()},[]);const de=async()=>{try{const e=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${oe}`}});if(e.ok){const n=await e.json();n.success&&a(n.data)}}catch(e){console.error("Failed to load restaurants:",e)}finally{P(!1)}},le=(0,i.useCallback)(async e=>{try{const n=await fetch(`/api/owner/available-restaurants?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${oe}`}});if(n.ok){const e=await n.json();e.success&&Q(e.data)}}catch(n){console.error("Failed to search restaurants:",n)}},[oe]);(0,i.useEffect)(()=>{if(M){const e=setTimeout(()=>le(q),300);return()=>clearTimeout(e)}},[q,M,le]);return(0,o.jsx)(r.A,{children:(0,o.jsxs)(d,{children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{children:"My Restaurants"}),(0,o.jsxs)(x,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:()=>{Y(!0),G(""),X(null)},children:"Link Existing"}),(0,o.jsx)(p,{variant:"primary",onClick:()=>I(!0),children:"+ Add Restaurant"})]})]}),(0,o.jsx)(h,{children:N?(0,o.jsx)(f,{children:"Loading..."}):0===t.length?(0,o.jsxs)(b,{children:["No restaurants linked to your account yet.",(0,o.jsx)("br",{}),'Click "Add Restaurant" to create a new one, or "Link Existing" to connect an existing restaurant.']}):(0,o.jsxs)(u,{children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)(g,{children:"Restaurant"}),(0,o.jsx)(g,{children:"Admin"}),(0,o.jsx)(g,{children:"Plan"}),(0,o.jsx)(g,{children:"Status"}),(0,o.jsx)(g,{children:"Contact"}),(0,o.jsx)(g,{style:{width:"80px"},children:"Action"})]})}),(0,o.jsx)("tbody",{children:t.map(e=>{var n,t;return(0,o.jsxs)("tr",{children:[(0,o.jsx)(y,{style:{fontWeight:600},children:e.name}),(0,o.jsx)(y,{children:(null===(n=e.admin)||void 0===n?void 0:n.full_name)||e.admin_name||"-"}),(0,o.jsx)(y,{children:e.plan_type||"-"}),(0,o.jsx)(y,{children:(0,o.jsx)(j,{status:e.status,children:e.status})}),(0,o.jsx)(y,{children:(null===(t=e.admin)||void 0===t?void 0:t.email)||e.email||e.phone||"-"}),(0,o.jsx)(y,{children:(0,o.jsx)(m,{onClick:()=>{ae(e),te(!0)},children:"Unlink"})})]},e.id)})})]})}),U&&(0,o.jsx)(v,{onClick:()=>I(!1),children:(0,o.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(k,{children:[(0,o.jsx)(C,{children:"Add New Restaurant"}),(0,o.jsx)(F,{onClick:()=>I(!1),children:"\xd7"})]}),(0,o.jsxs)(w,{children:[(0,o.jsxs)(z,{children:[(0,o.jsx)(B,{children:"Restaurant Name *"}),(0,o.jsx)(S,{type:"text",value:O.name,onChange:e=>W({...O,name:e.target.value}),placeholder:"Enter restaurant name"})]}),(0,o.jsxs)(z,{children:[(0,o.jsx)(B,{children:"Address"}),(0,o.jsx)(S,{type:"text",value:O.address,onChange:e=>W({...O,address:e.target.value}),placeholder:"Enter address"})]}),(0,o.jsxs)(z,{children:[(0,o.jsx)(B,{children:"Phone"}),(0,o.jsx)(S,{type:"text",value:O.phone,onChange:e=>W({...O,phone:e.target.value}),placeholder:"e.g., +60-12-345-6789"})]}),(0,o.jsxs)(z,{children:[(0,o.jsx)(B,{children:"Email"}),(0,o.jsx)(S,{type:"email",value:O.email,onChange:e=>W({...O,email:e.target.value}),placeholder:"restaurant@example.com"})]}),(0,o.jsxs)(z,{children:[(0,o.jsx)(B,{children:"Cuisine Type"}),(0,o.jsx)(S,{type:"text",value:O.cuisine_type,onChange:e=>W({...O,cuisine_type:e.target.value}),placeholder:"e.g., Korean, Italian, Cafe"})]})]}),(0,o.jsxs)(E,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:()=>I(!1),children:"Cancel"}),(0,o.jsx)(p,{variant:"primary",onClick:async()=>{if(O.name.trim()){K(!0);try{(await fetch("/api/owner/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${oe}`},body:JSON.stringify(O)})).ok&&(I(!1),W({name:"",address:"",phone:"",email:"",cuisine_type:""}),await de())}catch(e){console.error("Failed to add restaurant:",e)}finally{K(!1)}}},disabled:!O.name.trim()||J,children:J?"Creating...":"Create Restaurant"})]})]})}),M&&(0,o.jsx)(v,{onClick:()=>Y(!1),children:(0,o.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(k,{children:[(0,o.jsx)(C,{children:"Link Existing Restaurant"}),(0,o.jsx)(F,{onClick:()=>Y(!1),children:"\xd7"})]}),(0,o.jsxs)(w,{children:[(0,o.jsxs)(z,{children:[(0,o.jsx)(B,{children:"Search Restaurant"}),(0,o.jsx)(S,{type:"text",value:q,onChange:e=>{G(e.target.value),X(null)},placeholder:"Type restaurant name to search...",autoFocus:!0})]}),V?(0,o.jsxs)(D,{children:[(0,o.jsxs)("div",{children:[(0,o.jsx)(_,{children:V.name}),(0,o.jsxs)(T,{children:[null!==(e=V.admin)&&void 0!==e&&e.full_name?`Admin: ${V.admin.full_name}`:"No Admin",V.address?` | ${V.address}`:""]})]}),(0,o.jsx)(F,{onClick:()=>X(null),style:{fontSize:"16px"},children:"\xd7"})]}):H.length>0?(0,o.jsx)($,{children:H.map(e=>{var n;return(0,o.jsxs)(R,{onClick:()=>X(e),children:[(0,o.jsx)(_,{children:e.name}),(0,o.jsxs)(T,{children:[null!==(n=e.admin)&&void 0!==n&&n.full_name?`Admin: ${e.admin.full_name}`:"No Admin",e.address?` | ${e.address}`:"",e.status?` | ${e.status}`:""]})]},e.id)})}):q?(0,o.jsx)(T,{style:{padding:"16px 0",textAlign:"center"},children:"No available restaurants found"}):null]}),(0,o.jsxs)(E,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:()=>Y(!1),children:"Cancel"}),(0,o.jsx)(p,{variant:"primary",onClick:async()=>{if(V){ee(!0);try{(await fetch(`/api/owner/restaurants/${V.id}/claim`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${oe}`}})).ok&&(Y(!1),X(null),G(""),await de())}catch(e){console.error("Failed to link restaurant:",e)}finally{ee(!1)}}},disabled:!V||Z,children:Z?"Linking...":"Link Restaurant"})]})]})}),ne&&ie&&(0,o.jsx)(v,{onClick:()=>te(!1),children:(0,o.jsxs)(A,{onClick:e=>e.stopPropagation(),style:{maxWidth:"400px"},children:[(0,o.jsxs)(k,{children:[(0,o.jsx)(C,{children:"Unlink Restaurant"}),(0,o.jsx)(F,{onClick:()=>te(!1),children:"\xd7"})]}),(0,o.jsxs)(w,{children:[(0,o.jsxs)(L,{children:["Are you sure you want to unlink ",(0,o.jsx)("strong",{children:ie.name})," from your account?"]}),(0,o.jsx)(L,{style:{fontSize:"12px",color:"#6B7C93"},children:"This will remove your ownership. You can link it again later."})]}),(0,o.jsxs)(E,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,o.jsx)(p,{variant:"primary",onClick:async()=>{if(ie){se(!0);try{(await fetch(`/api/owner/restaurants/${ie.id}/unclaim`,{method:"DELETE",headers:{Authorization:`Bearer ${oe}`}})).ok&&(te(!1),ae(null),await de())}catch(e){console.error("Failed to unlink restaurant:",e)}finally{se(!1)}}},disabled:re,style:{background:"#DC2626",borderColor:"#DC2626"},children:re?"Unlinking...":"Unlink"})]})]})})]})})}}}]);