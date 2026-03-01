"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2766],{1472:(e,t,n)=>{n.d(t,{A:()=>o});n(9950);var i=n(9610),r=n(4414);const o=e=>{let{isOpen:t,onClose:n,onConfirm:o,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,r.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:l})]});return(0,r.jsx)(i.aF,{isOpen:t,onClose:n,title:a,footer:p,children:(0,r.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,r.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,r.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2538:(e,t,n)=>{n.d(t,{A:()=>p});var i=n(8819),r=n(9950),o=n(9610),a=n(4752),s=n(4414);const l=a.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${i.w.colors.borderLight};
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }
`,d=a.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,c=a.Ay.div`
  color: ${i.w.colors.text.secondary};
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,p=e=>{let{isOpen:t,onClose:n,onConfirm:i,title:a,label:p,placeholder:u="",min:x=0,max:h,step:g=1,suffix:m="",confirmText:y="Apply",cancelText:f="Cancel"}=e;const[v,j]=(0,r.useState)(""),[b,w]=(0,r.useState)(""),F=()=>{const e=parseFloat(v);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(i(v),j(""),w(""),n())},C=()=>{j(""),w(""),n()},k=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.yl,{variant:"secondary",onClick:C,children:f}),(0,s.jsx)(o.yl,{variant:"primary",onClick:F,disabled:!v||!!b||parseFloat(v)<x,children:y})]});return(0,s.jsx)(o.aF,{isOpen:t,onClose:C,title:a,footer:k,children:(0,s.jsxs)("div",{children:[(0,s.jsx)(o.lR,{children:p}),(0,s.jsx)(l,{type:"text",value:v,onChange:e=>{const t=e.target.value;if(""===t)return j(""),void w("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||w(n<x?`Minimum value is ${x}${m}`:void 0!==h&&n>h?`Maximum value is ${h}${m}`:""),j(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!b&&v&&F()}}),b&&(0,s.jsx)(d,{children:b}),!b&&void 0!==h&&(0,s.jsxs)(c,{children:["Enter a value between ",x,m," and ",h,m]})]})})}},2766:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ye});var i=n(8819),r=n(9950),o=n(4492),a=n(4752),s=n(8930),l=n(1472),d=n(2538),c=n(4877),p=n(2674),u=n(9194),x=n(4021),h=n(6038),g=n(4414);const m=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,y=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${i.w.colors.border};
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,f=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${i.w.colors.secondary};
`,v=a.Ay.div`
  display: flex;
  gap: 12px;
`,j=a.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,b=a.Ay.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`,w=a.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,F=a.Ay.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &::placeholder {
    color: ${i.w.colors.text.light};
  }
`,C=a.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,k=a.Ay.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F6F9FC;
  border-radius: 50%;
  color: ${i.w.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: ${i.w.colors.border};
    color: #0A2540;
  }
`,A=a.Ay.div`
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #635BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$=a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6B7C93;
  text-align: center;
  background: white;
  border-radius: 12px;
  border: 1px solid ${i.w.colors.border};
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .message {
    font-size: 14px;
    opacity: 0.8;
  }
`,E=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,S=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.15s;
  position: relative;
  display: flex;
  flex-direction: column;

  ${e=>e.inactive&&"\n    opacity: 0.5;\n    background: #F9FAFB;\n\n    &::before {\n      content: 'INACTIVE';\n      position: absolute;\n      top: 10px;\n      left: 10px;\n      background: #6B7280;\n      color: white;\n      padding: 2px 8px;\n      border-radius: 4px;\n      font-size: 10px;\n      font-weight: 600;\n      z-index: 10;\n    }\n  "}

  ${e=>e.soldOut&&!e.inactive&&"\n    opacity: 0.7;\n\n    &::after {\n      content: 'SOLD OUT';\n      position: absolute;\n      top: 20px;\n      right: -30px;\n      background: #FF6B6B;\n      color: white;\n      padding: 4px 40px;\n      transform: rotate(45deg);\n      font-size: 12px;\n      font-weight: 600;\n    }\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,B=a.Ay.div`
  width: 100%;
  height: 180px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`,_=a.Ay.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`,I=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
`,z=a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,R=a.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: ${i.w.colors.primary};
`,M=a.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 8px 0;
  line-height: 1.4;
`,O=a.Ay.span`
  font-size: 12px;
  color: #635BFF;
  cursor: pointer;
  display: inline-block;
  margin-top: 8px;
  transition: all 0.15s;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '→ ';
    opacity: 0.6;
  }
`,D=a.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: ${i.w.colors.primary};
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 12px;
  align-self: flex-start;
  width: fit-content;
`,L=a.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid ${i.w.colors.backgroundAlt};
  margin-top: auto;
`,T=a.Ay.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${i.w.colors.border};

  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n\n    &:hover {\n      background: #FFE6E6;\n    }\n  ":`\n    background: white;\n    color: ${i.w.colors.text.secondary};\n\n    &:hover {\n      background: ${i.w.colors.backgroundAlt};\n      color: ${i.w.colors.primary};\n      border-color: #C7D2FE;\n    }\n  `}
`,N=a.Ay.button`
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${i.w.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;

  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n    &:hover { background: #FFE6E6; }\n  ":e.warning?`\n    background: #FFFBEB;\n    color: #F59E0B;\n    border-color: ${i.w.colors.status.warningLightAlt};\n    &:hover { background: #FEF3C7; }\n  `:e.inactive?`\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: ${i.w.colors.borderLight};\n    &:hover { background: #E5E7EB; }\n  `:`\n    background: white;\n    color: #6B7C93;\n    &:hover { background: #F6F9FC; color: ${i.w.colors.primary}; border-color: #C7D2FE; }\n  `}
`,G=a.Ay.div`
  background: white;
  border: 2px dashed #C7D2FE;
  border-radius: 12px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: ${i.w.colors.primary};
    background: #F0F4FF;
    transform: translateY(-2px);
  }
`,q=a.Ay.div`
  font-size: 48px;
  color: ${i.w.colors.primary};
  margin-bottom: 12px;
`,P=a.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
`,U=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,W=a.Ay.button`
  width: 48px;
  height: 48px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  font-size: 24px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: ${i.w.colors.primary};
    background: #F0F4FF;
  }
`,Z=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,Q=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${i.w.colors.secondary};

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`,H=a.Ay.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,J=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 36px;
`,V=a.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 20px;
  font-size: 13px;
  color: #4338CA;
`,X=a.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #635BFF;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 600;
`,K=a.Ay.span`
  font-weight: 500;
`,Y=a.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${e=>"required"===e.type?"background: #FEE2E2; color: #DC2626;":"background: #DCFCE7; color: #16A34A;"}
`,ee=a.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6B7280;
  border-radius: 50%;
  padding: 0;
  transition: all 0.15s;

  &:hover {
    background: #E0E7FF;
    color: #4338CA;
  }
`,te=a.Ay.div`
  margin-top: 24px;
`,ne=a.Ay.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  z-index: 1;
`,ie=a.Ay.div`
  background: ${i.w.colors.backgroundAlt};
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
`,re=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid ${i.w.colors.border};

  &:last-child {
    margin-bottom: 0;
  }
`,oe=a.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,ae=a.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: ${i.w.colors.secondary};
`,se=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,le=a.Ay.button`
  width: 28px;
  height: 28px;
  border: 1px solid ${i.w.colors.border};
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: ${i.w.colors.primary};
  transition: all 0.15s;

  &:hover {
    background: #F0F4FF;
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,de=a.Ay.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #0A2540;
`,ce=a.Ay.button`
  padding: 4px 12px;
  background: #FFF4F4;
  color: #FF6B6B;
  border: 1px solid #FFE6E6;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FFE6E6;
  }
`,pe=a.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`,ue=a.Ay.div`
  padding: 12px;
  border-bottom: 1px solid #F6F9FC;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.selected?"#F0F4FF":"white"};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F6F9FC;
  }

  display: flex;
  align-items: center;
  gap: 12px;
`,xe=a.Ay.span`
  font-size: 24px;
`,he=a.Ay.div`
  flex: 1;
`,ge=a.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`,me=a.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,ye=()=>{const{categories:e,menuItems:t,optionGroups:n,updateMenuItem:i,addMenuItem:a,removeMenuItem:ye,toggleItemSoldOut:fe}=(0,s.b)(),ve=(0,o.Zp)(),[je,be]=(0,r.useState)("all"),[we,Fe]=(0,r.useState)(""),[Ce,ke]=(0,r.useState)(!1),[Ae,$e]=(0,r.useState)(!1),[Ee,Se]=(0,r.useState)(null),[Be,_e]=(0,r.useState)(!1),[Ie,ze]=(0,r.useState)(null),[Re,Me]=(0,r.useState)(!1),[Oe,De]=(0,r.useState)(null),{defaultCurrency:Le}=(0,x.i1)(),[Te,Ne]=(0,r.useState)("RM");(0,r.useEffect)(()=>{Le&&Ne(Le)},[Le]);const[Ge,qe]=(0,r.useState)([]),[Pe,Ue]=(0,r.useState)(!1),[We,Ze]=(0,r.useState)([]),[,]=(0,r.useState)(0),[Qe,He]=(0,r.useState)(""),[Je,Ve]=(0,r.useState)(40),Xe=(0,r.useRef)(null),[Ke,Ye]=(0,r.useState)({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null});r.useEffect(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let i=null;if(n>=0&&(i=t[n+1]),!i)return void console.error("No restaurantId found in URL");const[r,o]=await Promise.all([fetch(`/api/restaurants/${i}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),fetch(`/api/restaurants/${i}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}})]);let a=[];if(r.ok){const e=await r.json();e.success&&(a=[...a,...e.data||[]])}if(o.ok){const e=await o.json();e.success&&(a=[...a,...e.data||[]])}qe(a)}catch(e){console.error("Failed to fetch recipes:",e)}})()},[]);const[et,tt]=(0,r.useState)([]),nt={other:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83e\uded7","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\uded8","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83e\uded0","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\uded2","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udedb","\ud83e\udd54","\ud83e\udeda","\ud83c\udf44","\ud83c\udf7d\ufe0f","\ud83e\udd44","\ud83c\udf74","\ud83e\udd62","\ud83c\udf71","\ud83e\udd61","\ud83d\udd2a","\ud83e\uddc2","\ud83e\uded5"]},it=(()=>{let n="all"===je?t:t.filter(e=>e.category===je);if(we.trim()){const t=we.toLowerCase().trim();n=n.filter(n=>{var i;return n.name.toLowerCase().includes(t)||n.description&&n.description.toLowerCase().includes(t)||n.price.toString().includes(t)||(null===(i=e.find(e=>e.id===n.category))||void 0===i?void 0:i.name.toLowerCase().includes(t))})}return n})(),rt=it.length>50;(0,r.useEffect)(()=>{Ve(40)},[je,we]),(0,r.useEffect)(()=>{if(!rt)return;const e=Xe.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Ve(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[rt,Je,it.length]);const ot=()=>{Ye({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null}),tt([]),Ze([]),ke(!0)},at=(e,t)=>{Ze(We.map(n=>{if(n.menuItemId===e){const e=Math.max(1,n.quantity+t);return{...n,quantity:e}}return n}))};return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(m,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(f,{children:"Menu"}),(0,g.jsxs)(v,{children:[(0,g.jsx)(p.$n,{variant:"secondary",onClick:()=>{Ye({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!0,set_items:[],set_display_order:0,recipe_id:null}),tt([]),Ze([]),Ue(!0)},children:"Create Set Menu"}),(0,g.jsx)(p.$n,{variant:"primary",onClick:ot,children:"Add New Item"})]})]}),(0,g.jsxs)(j,{children:[(0,g.jsx)(b,{children:(0,g.jsxs)(w,{children:[(0,g.jsx)(C,{children:"\ud83d\udd0d"}),(0,g.jsx)(F,{type:"text",placeholder:"Search menu items by name, description, price, or category...",value:we,onChange:e=>Fe(e.target.value)}),we&&(0,g.jsx)(k,{onClick:()=>Fe(""),title:"Clear search",children:"\xd7"})]})}),we&&it.length>0&&(0,g.jsxs)(A,{children:[(0,g.jsxs)("span",{children:["Found ",it.length," item",1!==it.length?"s":"",' matching "',we,'"']}),(0,g.jsx)(p.$n,{variant:"secondary",onClick:()=>Fe(""),children:"Clear Search"})]}),(0,g.jsxs)(p.j,{children:[(0,g.jsxs)(p.oz,{active:"all"===je,onClick:()=>{be("all"),Fe("")},children:["All Items (",t.length,")"]}),e.map(e=>(0,g.jsxs)(p.oz,{active:je===e.id,onClick:()=>{be(e.id),Fe("")},children:[e.emoji," ",e.name]},e.id))]}),we&&0===it.length?(0,g.jsxs)($,{children:[(0,g.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,g.jsxs)("div",{className:"title",children:['No results for "',we,'"']}),(0,g.jsx)("div",{className:"message",children:"Try searching with different keywords or check the spelling"})]}):(0,g.jsxs)(E,{children:[(rt?it.slice(0,Je):it).map(r=>{var o;return(0,g.jsxs)(S,{soldOut:r.soldOut,inactive:!1===r.is_active,children:[(0,g.jsxs)(B,{children:[r.is_set_menu&&(0,g.jsx)(ne,{children:"SET"}),r.image&&""!==r.image.trim()?(0,g.jsx)("img",{src:r.image,alt:r.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none",e.currentTarget.parentElement&&(e.currentTarget.parentElement.innerHTML=r.emoji||"\ud83c\udf7d\ufe0f",e.currentTarget.parentElement.style.fontSize="48px",e.currentTarget.parentElement.style.display="flex",e.currentTarget.parentElement.style.alignItems="center",e.currentTarget.parentElement.style.justifyContent="center")}}):(0,g.jsx)("span",{style:{fontSize:"48px"},children:r.emoji||"\ud83c\udf7d\ufe0f"})]}),(0,g.jsxs)(_,{children:[(0,g.jsx)(D,{children:null===(o=e.find(e=>e.id===r.category))||void 0===o?void 0:o.name}),(0,g.jsxs)(I,{children:[(0,g.jsxs)(z,{children:[r.code?`${r.code} `:"",r.name]}),(0,g.jsx)(R,{children:(0,h.vv)(r.price,Te)})]}),(0,g.jsx)(M,{children:r.description||"No description available"}),r.is_set_menu&&r.set_items&&r.set_items.length>0&&(0,g.jsxs)(M,{style:{fontSize:"11px",color:"#667eea",fontWeight:500},children:["Set includes: ",r.set_items.map(e=>{const n=t.find(t=>t.id===e.menuItemId.toString()),i=null===n||void 0===n?void 0:n.code;return`${i?`${i} `:""}${e.name} x${e.quantity}`}).join(", ")]}),r.optionGroups&&r.optionGroups.length>0&&(0,g.jsxs)(M,{style:{fontSize:"11px",color:"#8898AA"},children:["Option Groups: ",r.optionGroups.map(e=>{var t;return null===(t=n.find(t=>t.id===e))||void 0===t?void 0:t.name}).filter(Boolean).join(", ")]}),r.recipe_id&&(()=>{const e=Ge.find(e=>e.id===r.recipe_id);return e?(0,g.jsxs)(O,{onClick:t=>{t.stopPropagation();const n=window.location.pathname.split("/"),i=n.indexOf("restaurant"),r=i>=0?n[i+1]:"";ve(`/restaurant/${r}/recipe-management?search=${encodeURIComponent(e.name)}`)},children:["Recipe: ",e.name]}):null})(),(0,g.jsxs)(L,{children:[(0,g.jsx)(T,{onClick:()=>(e=>{Se(e),Ye({...e,emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image||"",optionGroups:e.optionGroups||[],is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}),tt(e.optionGroups||[]),Ze(e.set_items||[]),e.is_set_menu?Ue(!0):$e(!0)})(r),children:"Edit"}),(0,g.jsx)(N,{onClick:()=>(async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),i=n>=0?t[n+1]:"",r=localStorage.getItem("auth_token"),o=await fetch(`/api/menu/product/${e.id}/copy?restaurantId=${i}`,{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),a=await o.json();a.success?window.location.reload():alert(a.error||"Failed to copy menu item")}catch(t){console.error("Error copying menu item:",t),alert("Failed to copy menu item")}})(r),title:"Copy",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",stroke:"currentColor",strokeWidth:"2"}),(0,g.jsx)("path",{d:"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",stroke:"currentColor",strokeWidth:"2"})]})}),(0,g.jsx)(N,{onClick:()=>(async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),r=n>=0?t[n+1]:"",o=localStorage.getItem("auth_token"),a=await fetch(`/api/menu/product/${e.id}/toggle-active?restaurantId=${r}`,{method:"PUT",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}}),s=await a.json();s.success?i({...e,is_active:s.data.is_active}):alert(s.error||"Failed to toggle menu item status")}catch(t){console.error("Error toggling menu item status:",t),alert("Failed to toggle menu item status")}})(r),inactive:!1===r.is_active,title:!1===r.is_active?"Activate":"Deactivate",children:!1===r.is_active?(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",stroke:"currentColor",strokeWidth:"2"}),(0,g.jsx)("circle",{cx:"12",cy:"12",r:"3",stroke:"currentColor",strokeWidth:"2"})]}):(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,g.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,g.jsx)(N,{onClick:()=>fe(r.id),warning:r.soldOut,title:r.soldOut?"Mark In Stock":"Mark Sold Out",children:r.soldOut?(0,g.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,g.jsx)("polyline",{points:"20 6 9 17 4 12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}):(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2"}),(0,g.jsx)("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07",stroke:"currentColor",strokeWidth:"2"})]})}),(0,g.jsx)(N,{danger:!0,onClick:()=>{return e=r.id,ze(e),void _e(!0);var e},title:"Delete",children:(0,g.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,g.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,g.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})})]})]})]},r.id)}),(0,g.jsxs)(G,{onClick:ot,children:[(0,g.jsx)(q,{children:"+"}),(0,g.jsx)(P,{children:"Add New Menu Item"})]}),rt&&Je<it.length&&(0,g.jsx)("div",{ref:Xe,style:{gridColumn:"1 / -1",height:"20px"}})]})]}),(0,g.jsxs)(p.aF,{isOpen:Ce,onClose:()=>ke(!1),title:"Add New Menu Item",size:"medium",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(p.$n,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,g.jsx)(p.$n,{variant:"primary",onClick:()=>{if(!Ke.category)return;const e={id:`item-${Date.now()}`,code:Ke.code||"",name:Ke.name||"",price:Ke.price||0,category:Ke.category,emoji:Ke.emoji||"\ud83c\udf7d\ufe0f",description:Ke.description,image:Ke.image,optionGroups:et,soldOut:!1,is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:Ke.recipe_id||null};a(e),ke(!1)},disabled:!Ke.name||!Ke.category,children:"Add Item"})]}),children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Item Code"}),(0,g.jsx)(p.ZQ,{type:"text",value:Ke.code||"",onChange:e=>Ye({...Ke,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Item Name *"}),(0,g.jsx)(p.ZQ,{type:"text",value:Ke.name,onChange:e=>Ye({...Ke,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Price (RM) *"}),(0,g.jsx)(p.ZQ,{type:"number",value:Ke.price,onChange:e=>Ye({...Ke,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Category *"}),(0,g.jsxs)(p.FX,{value:Ke.category,onChange:e=>Ye({...Ke,category:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"-- Select Category --"}),e.map(e=>(0,g.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Emoji Icon"}),(0,g.jsx)(U,{children:nt.other.map(e=>(0,g.jsx)(W,{selected:Ke.emoji===e,onClick:()=>Ye({...Ke,emoji:e}),children:e},e))})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Description"}),(0,g.jsx)(p.Lz,{value:Ke.description,onChange:e=>Ye({...Ke,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,g.jsx)(c.A,{value:Ke.image||"",onChange:e=>Ye({...Ke,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,g.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,g.jsx)(p.lR,{children:"Linked Recipe"}),(0,g.jsx)(u.A,{options:Ge.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ke.recipe_id||null,onChange:e=>Ye({...Ke,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,g.jsx)(te,{children:(0,g.jsxs)(p.gE,{children:[(0,g.jsxs)(p.lR,{children:["Option Groups ",et.length>0&&`(${et.length} selected)`]}),(0,g.jsxs)(H,{value:"",onChange:e=>{e.target.value&&!et.includes(e.target.value)&&tt([...et,e.target.value])},children:[(0,g.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!et.includes(e.id)).map(e=>(0,g.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,g.jsx)(J,{children:et.map((e,t)=>{const i=n.find(t=>t.id===e);return i?(0,g.jsxs)(V,{children:[(0,g.jsx)(X,{children:t+1}),(0,g.jsx)(K,{children:i.name}),(0,g.jsx)(Y,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,g.jsx)(ee,{onClick:()=>tt(et.filter(t=>t!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,g.jsxs)(p.aF,{isOpen:Ae,onClose:()=>$e(!1),title:"Edit Menu Item",size:"medium",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(p.$n,{variant:"secondary",onClick:()=>$e(!1),children:"Cancel"}),(0,g.jsx)(p.$n,{variant:"primary",onClick:()=>{if(Ee){const e={...Ee,...Ke,optionGroups:et};i(e),$e(!1),Se(null)}},children:"Save Changes"})]}),children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Item Code"}),(0,g.jsx)(p.ZQ,{type:"text",value:Ke.code||"",onChange:e=>Ye({...Ke,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Item Name *"}),(0,g.jsx)(p.ZQ,{type:"text",value:Ke.name,onChange:e=>Ye({...Ke,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Price (RM) *"}),(0,g.jsx)(p.ZQ,{type:"number",value:Ke.price,onChange:e=>Ye({...Ke,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Category *"}),(0,g.jsxs)(p.FX,{value:Ke.category,onChange:e=>Ye({...Ke,category:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"-- Select Category --"}),e.map(e=>(0,g.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Emoji Icon"}),(0,g.jsx)(U,{children:nt.other.map(e=>(0,g.jsx)(W,{selected:Ke.emoji===e,onClick:()=>Ye({...Ke,emoji:e}),children:e},e))})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Description"}),(0,g.jsx)(p.Lz,{value:Ke.description,onChange:e=>Ye({...Ke,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,g.jsx)(c.A,{value:Ke.image||"",onChange:e=>Ye({...Ke,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,g.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,g.jsx)(p.lR,{children:"Linked Recipe"}),(0,g.jsx)(u.A,{options:Ge.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ke.recipe_id||null,onChange:e=>Ye({...Ke,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,g.jsx)(te,{children:(0,g.jsxs)(p.gE,{children:[(0,g.jsxs)(p.lR,{children:["Option Groups ",et.length>0&&`(${et.length} selected)`]}),(0,g.jsxs)(H,{value:"",onChange:e=>{e.target.value&&!et.includes(e.target.value)&&tt([...et,e.target.value])},children:[(0,g.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!et.includes(e.id)).map(e=>(0,g.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,g.jsx)(J,{children:et.map((e,t)=>{const i=n.find(t=>t.id===e);return i?(0,g.jsxs)(V,{children:[(0,g.jsx)(X,{children:t+1}),(0,g.jsx)(K,{children:i.name}),(0,g.jsx)(Y,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,g.jsx)(ee,{onClick:()=>tt(et.filter(t=>t!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,g.jsxs)(p.aF,{isOpen:Pe,onClose:()=>{Ue(!1),Se(null),Ze([])},title:Ee?"Edit Set Menu":"Create Set Menu",size:"large",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(p.$n,{variant:"secondary",onClick:()=>{Ue(!1),Se(null),Ze([])},children:"Cancel"}),(0,g.jsx)(p.$n,{variant:"primary",onClick:()=>{if(0===We.length)return void alert("Set menu must contain at least one menu item.");if(!Ke.category)return;const e={id:(null===Ee||void 0===Ee?void 0:Ee.id)||`item-${Date.now()}`,code:Ke.code||"",name:Ke.name||"",price:Ke.price||0,category:Ke.category,emoji:Ke.emoji||"\ud83c\udf7d\ufe0f",description:Ke.description,image:Ke.image,optionGroups:et,soldOut:!1,is_set_menu:!0,set_items:We,set_display_order:Ke.set_display_order||0};Ee?i(e):a(e),Ue(!1),Se(null),Ze([])},disabled:!Ke.name||!Ke.category,children:Ee?"Save Changes":"Create Set Menu"})]}),children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Item Code"}),(0,g.jsx)(p.ZQ,{type:"text",value:Ke.code||"",onChange:e=>Ye({...Ke,code:e.target.value}),placeholder:"e.g., S01, S02 (optional)"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Set Menu Name *"}),(0,g.jsx)(p.ZQ,{type:"text",value:Ke.name,onChange:e=>Ye({...Ke,name:e.target.value}),placeholder:"e.g., Family Set, Lunch Combo"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Set Price (RM) *"}),(0,g.jsx)(p.ZQ,{type:"number",value:Ke.price,onChange:e=>Ye({...Ke,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Category *"}),(0,g.jsxs)(p.FX,{value:Ke.category,onChange:e=>Ye({...Ke,category:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"-- Select Category --"}),e.map(e=>(0,g.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Emoji Icon"}),(0,g.jsx)(U,{children:nt.other.map(e=>(0,g.jsx)(W,{selected:Ke.emoji===e,onClick:()=>Ye({...Ke,emoji:e}),children:e},e))})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Description"}),(0,g.jsx)(p.Lz,{value:Ke.description,onChange:e=>Ye({...Ke,description:e.target.value}),placeholder:"Brief description of this set menu..."})]}),(0,g.jsx)(c.A,{value:Ke.image||"",onChange:e=>Ye({...Ke,image:e}),label:"Set Menu Image"}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Display Order (for sorting set menus)"}),(0,g.jsx)(p.ZQ,{type:"number",value:Ke.set_display_order||0,onChange:e=>Ye({...Ke,set_display_order:parseInt(e.target.value)||0}),min:"0"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Set Menu Items * (at least 1 item required)"}),We.length>0&&(0,g.jsx)(ie,{children:We.map(e=>{const n=t.find(t=>parseInt(t.id)===e.menuItemId),i=null===n||void 0===n?void 0:n.code;return(0,g.jsxs)(re,{children:[(0,g.jsx)(oe,{children:(0,g.jsxs)(ae,{children:[i?`${i} `:"",e.name]})}),(0,g.jsxs)(se,{children:[(0,g.jsx)(le,{onClick:()=>at(e.menuItemId,-1),disabled:e.quantity<=1,children:"\u2212"}),(0,g.jsx)(de,{children:e.quantity}),(0,g.jsx)(le,{onClick:()=>at(e.menuItemId,1),children:"+"})]}),(0,g.jsx)(ce,{onClick:()=>{return t=e.menuItemId,void Ze(We.filter(e=>e.menuItemId!==t));var t},children:"Remove"})]},e.menuItemId)})}),(0,g.jsxs)("div",{style:{marginTop:"12px"},children:[(0,g.jsx)(p.lR,{children:"Available Menu Items (select items to add to set)"}),(0,g.jsx)(p.ZQ,{type:"text",value:Qe,onChange:e=>He(e.target.value),placeholder:"Search by code or name...",style:{marginBottom:"12px"}}),(0,g.jsx)(pe,{children:t.filter(e=>!e.is_set_menu).filter(e=>{var t;if(!Qe)return!0;const n=Qe.toLowerCase(),i=null===(t=e.code)||void 0===t?void 0:t.toLowerCase().includes(n),r=e.name.toLowerCase().includes(n);return i||r}).map(n=>{var i;return(0,g.jsxs)(ue,{selected:We.some(e=>e.menuItemId===parseInt(n.id)),onClick:()=>(e=>{const n=t.find(t=>t.id===e.toString());if(!n||n.is_set_menu)return;const i=We.find(t=>t.menuItemId===e);Ze(i?We.map(t=>t.menuItemId===e?{...t,quantity:t.quantity+1}:t):[...We,{menuItemId:e,name:n.name,quantity:1}])})(parseInt(n.id)),children:[n.image?(0,g.jsx)("img",{src:n.image,alt:n.name,loading:"lazy",style:{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",marginRight:"12px"}}):(0,g.jsx)(xe,{children:n.emoji||"\ud83c\udf7d\ufe0f"}),(0,g.jsxs)(he,{children:[(0,g.jsxs)(ge,{children:[n.code?`${n.code} `:"",n.name]}),(0,g.jsxs)(me,{children:[(0,h.vv)(n.price,Te)," \xb7 ",null===(i=e.find(e=>e.id===n.category))||void 0===i?void 0:i.name]})]})]},n.id)})})]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Set Menu Options (options for entire set)"}),(0,g.jsx)(Z,{children:n.map(e=>(0,g.jsxs)(Q,{children:[(0,g.jsx)("input",{type:"checkbox",checked:et.includes(e.id),onChange:()=>{return t=e.id,void(et.includes(t)?tt(et.filter(e=>e!==t)):tt([...et,t]));var t}}),e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))})]})]}),(0,g.jsx)(l.A,{isOpen:Be,onClose:()=>_e(!1),onConfirm:()=>{Ie&&(ye(Ie),_e(!1),ze(null))},title:"Delete Menu Item",message:"Are you sure you want to delete this menu item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel",variant:"danger"}),(0,g.jsx)(d.A,{isOpen:Re,onClose:()=>Me(!1),onConfirm:e=>{if(Oe){const t=parseFloat(e);i({...Oe,price:t}),Me(!1),De(null)}},title:"Update Price",label:`Enter new price for ${null===Oe||void 0===Oe?void 0:Oe.name}:`,placeholder:null===Oe||void 0===Oe?void 0:Oe.price.toString(),min:0,step:.01,suffix:" RM",confirmText:"Update Price",cancelText:"Cancel"})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var i=n(9950),r=n(1367),o=n(6038);const a=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[a,s]=(0,i.useState)(Object.keys(o.DL)),[l,d]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(i)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:l,error:c}}},4877:(e,t,n)=>{n.d(t,{A:()=>b});var i=n(8819),r=n(9950),o=n(4752),a=n(4414);const s=o.Ay.div`
  margin-bottom: 16px;
`,l=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=o.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,c=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=o.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.isUploading?"wait":"pointer"};
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  opacity: ${e=>e.isUploading?.7:1};

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,u=o.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=o.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,h=o.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=o.Ay.label`
  padding: 8px 16px;
  border: 1px solid ${i.w.colors.primary};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: ${e=>e.disabled?"wait":"pointer"};
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    background: ${e=>e.disabled?"transparent":"#635BFF"};
    color: ${e=>e.disabled?"#635BFF":"white"};
  }

  input {
    display: none;
  }
`,y=o.Ay.button`
  padding: 8px 16px;
  border: 1px solid ${i.w.colors.danger};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${i.w.colors.danger};
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,f=o.Ay.input`
  display: none;
`,v=o.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",b=e=>{let{value:t,onChange:n,label:i="Logo Upload",helpText:o="Upload an image for your logo",maxSize:b=2,previewSize:w=150,showRemoveButton:F=!0,changeButtonText:C="Change Image",removeButtonText:k="Remove Image",imageAltText:A="Uploaded"}=e;const[$,E]=(0,r.useState)(!1),[S,B]=(0,r.useState)(!1),_=(0,r.useRef)(null),I=(0,r.useRef)(null),z=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*b*1024)return void alert(`Image size should be less than ${b}MB`);B(!0);const t=new FileReader;t.onload=async e=>{var t;const i=new Image;i.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void B(!1);const r=1200;let o=i.width,a=i.height;(o>r||a>r)&&(o>a?(a=a/o*r,o=r):(o=o/a*r,a=r)),e.width=o,e.height=a,t.drawImage(i,0,0,o,a);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),i=await n.json();return i.success?i.data.original:(console.error("Image upload failed:",i.message),null)}catch(t){return console.error("Image upload error:",t),null}})(s);B(!1),l?n(l):alert("Failed to upload image. Please try again.")},i.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},R=e=>{if(S)return;const t=e.target.files;t&&t.length>0&&z(t[0]),e.target.value=""};return(0,a.jsxs)(s,{children:[i&&(0,a.jsx)(l,{children:i}),o&&(0,a.jsx)(d,{children:o}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{ref:I,isDragging:$,hasImage:!!t,isUploading:S,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),S||E(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===I.current&&E(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),E(!1),S)return;const t=e.dataTransfer.files;t&&t.length>0&&z(t[0])},onClick:()=>{var e;t||S||(null===(e=_.current)||void 0===e||e.click())},children:S?(0,a.jsxs)(u,{children:[(0,a.jsx)(v,{}),(0,a.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,a.jsx)("img",{src:(M=t,M?M.startsWith("http")?M:M.startsWith("/uploads/")?`${j()}${M}`:M:""),alt:A}):(0,a.jsxs)(u,{children:[(0,a.jsx)(x,{children:$?"Drop image here":"Drag & drop or click to upload"}),(0,a.jsxs)(h,{children:["PNG, JPG, GIF up to ",b,"MB"]})]})}),t&&!S&&(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{disabled:S,children:[C,(0,a.jsx)("input",{ref:_,type:"file",accept:"image/*",onChange:R,disabled:S})]}),F&&(0,a.jsx)(y,{onClick:()=>{n("")},disabled:S,children:k})]})]}),!t&&!S&&(0,a.jsx)(f,{ref:_,type:"file",accept:"image/*",onChange:R})]});var M}},9194:(e,t,n)=>{n.d(t,{A:()=>y});var i=n(8819),r=n(9950),o=n(4752),a=n(4414);const s=o.Ay.div`
  position: relative;
  width: 100%;
`,l=o.Ay.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid ${e=>e.isOpen?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.disabled?"#F9FAFB":"white"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.disabled?"#E6EBF1":"#635BFF"};
  }

  ${e=>e.isOpen&&"\n    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);\n  "}
`,d=o.Ay.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: ${e=>e.disabled?"#9CA3AF":"#0A2540"};
  cursor: ${e=>e.disabled?"not-allowed":"text"};

  &::placeholder {
    color: #9CA3AF;
  }
`,c=o.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: #E5E7EB;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;

  &:hover {
    background: #D1D5DB;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #6B7280;
  }
`,p=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  transform: ${e=>e.isOpen?"rotate(180deg)":"rotate(0deg)"};

  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,u=o.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${e=>e.isOpen?"block":"none"};
`,x=o.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,h=o.Ay.div`
  font-size: 14px;
`,g=o.Ay.div`
  font-size: 12px;
  color: ${i.w.colors.text.muted};
  margin-top: 2px;
`,m=o.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,y=e=>{let{options:t,value:n,onChange:i,placeholder:o="Select...",disabled:y=!1,allowClear:f=!0,noOptionsMessage:v="No options found"}=e;const[j,b]=(0,r.useState)(!1),[w,F]=(0,r.useState)(""),[C,k]=(0,r.useState)(-1),A=(0,r.useRef)(null),$=(0,r.useRef)(null),E=t.find(e=>e.value===n),S=t.filter(e=>e.label.toLowerCase().includes(w.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(w.toLowerCase()));(0,r.useEffect)(()=>{const e=e=>{A.current&&!A.current.contains(e.target)&&(b(!1),F(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,r.useEffect)(()=>{j||(F(""),k(-1))},[j]);const B=e=>{i(e.value),b(!1),F("")},_=j?w:(null===E||void 0===E?void 0:E.label)||"";return(0,a.jsxs)(s,{ref:A,children:[(0,a.jsxs)(l,{isOpen:j,disabled:y,onClick:()=>{var e;y||(b(!0),null===(e=$.current)||void 0===e||e.focus())},children:[(0,a.jsx)(d,{ref:$,type:"text",value:_,onChange:e=>{F(e.target.value),k(0),j||b(!0)},onKeyDown:e=>{if(!y)switch(e.key){case"ArrowDown":e.preventDefault(),j?k(e=>e<S.length-1?e+1:e):b(!0);break;case"ArrowUp":e.preventDefault(),k(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),j&&C>=0&&S[C]?B(S[C]):j||b(!0);break;case"Escape":b(!1),F("")}},placeholder:o,disabled:y}),f&&n&&!y&&(0,a.jsx)(c,{onClick:e=>{e.stopPropagation(),i(null),F("")},type:"button",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,a.jsx)(p,{isOpen:j,children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,a.jsx)(u,{isOpen:j,children:S.length>0?S.map((e,t)=>(0,a.jsxs)(x,{isSelected:e.value===n,isHighlighted:t===C,onClick:()=>B(e),onMouseEnter:()=>k(t),children:[(0,a.jsx)(h,{children:e.label}),e.subLabel&&(0,a.jsx)(g,{children:e.subLabel})]},e.value)):(0,a.jsx)(m,{children:v})})]})}}}]);