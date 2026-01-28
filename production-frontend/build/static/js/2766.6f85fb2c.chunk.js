"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2766],{1472:(e,t,n)=>{n.d(t,{A:()=>o});n(9950);var i=n(9610),r=n(4414);const o=e=>{let{isOpen:t,onClose:n,onConfirm:o,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,r.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:l})]});return(0,r.jsx)(i.aF,{isOpen:t,onClose:n,title:a,footer:p,children:(0,r.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,r.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,r.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2538:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),r=n(9610),o=n(4752),a=n(4414);const s=o.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,l=o.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,d=o.Ay.div`
  color: #6B7C93;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:o,title:c,label:p,placeholder:u="",min:x=0,max:g,step:h=1,suffix:m="",confirmText:f="Apply",cancelText:v="Cancel"}=e;const[y,j]=(0,i.useState)(""),[b,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(y);!isNaN(e)&&e>=x&&(void 0===g||e<=g)&&(o(y),j(""),F(""),n())},w=()=>{j(""),F(""),n()},A=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.yl,{variant:"secondary",onClick:w,children:v}),(0,a.jsx)(r.yl,{variant:"primary",onClick:C,disabled:!y||!!b||parseFloat(y)<x,children:f})]});return(0,a.jsx)(r.aF,{isOpen:t,onClose:w,title:c,footer:A,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(r.lR,{children:p}),(0,a.jsx)(s,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return j(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<x?`Minimum value is ${x}${m}`:void 0!==g&&n>g?`Maximum value is ${g}${m}`:""),j(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!b&&y&&C()}}),b&&(0,a.jsx)(l,{children:b}),!b&&void 0!==g&&(0,a.jsxs)(d,{children:["Enter a value between ",x,m," and ",g,m]})]})})}},2766:(e,t,n)=>{n.r(t),n.d(t,{default:()=>fe});var i=n(9950),r=n(4492),o=n(4752),a=n(3310),s=n(8930),l=n(1472),d=n(2538),c=n(4877),p=n(2674),u=n(9194),x=n(4021),g=n(6038),h=n(4414);const m=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,f=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,v=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,y=o.Ay.div`
  display: flex;
  gap: 12px;
`,j=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,b=o.Ay.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`,F=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,C=o.Ay.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &::placeholder {
    color: #8898AA;
  }
`,w=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,A=o.Ay.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F6F9FC;
  border-radius: 50%;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }
`,k=o.Ay.div`
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #635BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6B7C93;
  text-align: center;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  
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
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,S=o.Ay.div`
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
`,_=o.Ay.div`
  width: 100%;
  height: 180px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`,I=o.Ay.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`,z=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
`,R=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,$=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
`,M=o.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 8px 0;
  line-height: 1.4;
`,O=o.Ay.span`
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
`,D=o.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 12px;
  align-self: flex-start;
  width: fit-content;
`,T=o.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  margin-top: auto;
`,L=o.Ay.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;

  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n\n    &:hover {\n      background: #FFE6E6;\n    }\n  ":"\n    background: white;\n    color: #6B7C93;\n\n    &:hover {\n      background: #F6F9FC;\n      color: #635BFF;\n      border-color: #C7D2FE;\n    }\n  "}
`,G=o.Ay.button`
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n    &:hover { background: #FFE6E6; }\n  ":e.warning?"\n    background: #FFFBEB;\n    color: #F59E0B;\n    border-color: #FEF3C7;\n    &:hover { background: #FEF3C7; }\n  ":e.inactive?"\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: #E5E7EB;\n    &:hover { background: #E5E7EB; }\n  ":"\n    background: white;\n    color: #6B7C93;\n    &:hover { background: #F6F9FC; color: #635BFF; border-color: #C7D2FE; }\n  "}
`,N=o.Ay.div`
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
    border-color: #635BFF;
    background: #F0F4FF;
    transform: translateY(-2px);
  }
`,q=o.Ay.div`
  font-size: 48px;
  color: #635BFF;
  margin-bottom: 12px;
`,P=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
`,U=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,Z=o.Ay.button`
  width: 48px;
  height: 48px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  font-size: 24px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    background: #F0F4FF;
  }
`,Q=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,H=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #0A2540;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`,W=o.Ay.select`
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
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,J=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 36px;
`,X=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 20px;
  font-size: 13px;
  color: #4338CA;
`,K=o.Ay.span`
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
`,Y=o.Ay.span`
  font-weight: 500;
`,V=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${e=>"required"===e.type?"background: #FEE2E2; color: #DC2626;":"background: #DCFCE7; color: #16A34A;"}
`,ee=o.Ay.button`
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
`,te=o.Ay.div`
  margin-top: 24px;
`,ne=o.Ay.div`
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
`,ie=o.Ay.div`
  background: #F6F9FC;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
`,re=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #E6EBF1;

  &:last-child {
    margin-bottom: 0;
  }
`,oe=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,ae=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,se=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,le=o.Ay.button`
  width: 28px;
  height: 28px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #635BFF;
  transition: all 0.15s;

  &:hover {
    background: #F0F4FF;
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,de=o.Ay.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #0A2540;
`,ce=o.Ay.button`
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
`,pe=o.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`,ue=o.Ay.div`
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
`,xe=o.Ay.span`
  font-size: 24px;
`,ge=o.Ay.div`
  flex: 1;
`,he=o.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`,me=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,fe=()=>{const{categories:e,menuItems:t,optionGroups:n,updateMenuItem:o,addMenuItem:fe,removeMenuItem:ve,toggleItemSoldOut:ye}=(0,s.b)(),je=(0,r.Zp)(),[be,Fe]=(0,i.useState)("all"),[Ce,we]=(0,i.useState)(""),[Ae,ke]=(0,i.useState)(!1),[Ee,Be]=(0,i.useState)(!1),[Se,_e]=(0,i.useState)(null),[Ie,ze]=(0,i.useState)(!1),[Re,$e]=(0,i.useState)(null),[Me,Oe]=(0,i.useState)(!1),[De,Te]=(0,i.useState)(null),{defaultCurrency:Le}=(0,x.i1)(),[Ge,Ne]=(0,i.useState)("RM");(0,i.useEffect)(()=>{Le&&Ne(Le)},[Le]);const[qe,Pe]=(0,i.useState)([]),[Ue,Ze]=(0,i.useState)(!1),[Qe,He]=(0,i.useState)([]),[,]=(0,i.useState)(0),[We,Je]=(0,i.useState)(""),[Xe,Ke]=(0,i.useState)(40),Ye=(0,i.useRef)(null),[Ve,et]=(0,i.useState)({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null});i.useEffect(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let i=null;if(n>=0&&(i=t[n+1]),!i)return void console.error("No restaurantId found in URL");const[r,o]=await Promise.all([fetch(`/api/restaurants/${i}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),fetch(`/api/restaurants/${i}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}})]);let a=[];if(r.ok){const e=await r.json();e.success&&(a=[...a,...e.data||[]])}if(o.ok){const e=await o.json();e.success&&(a=[...a,...e.data||[]])}Pe(a)}catch(e){console.error("Failed to fetch recipes:",e)}})()},[]);const[tt,nt]=(0,i.useState)([]),it={other:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83e\uded7","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\uded8","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83e\uded0","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\uded2","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udedb","\ud83e\udd54","\ud83e\udeda","\ud83c\udf44","\ud83c\udf7d\ufe0f","\ud83e\udd44","\ud83c\udf74","\ud83e\udd62","\ud83c\udf71","\ud83e\udd61","\ud83d\udd2a","\ud83e\uddc2","\ud83e\uded5"]},rt=(()=>{let n="all"===be?t:t.filter(e=>e.category===be);if(Ce.trim()){const t=Ce.toLowerCase().trim();n=n.filter(n=>{var i;return n.name.toLowerCase().includes(t)||n.description&&n.description.toLowerCase().includes(t)||n.price.toString().includes(t)||(null===(i=e.find(e=>e.id===n.category))||void 0===i?void 0:i.name.toLowerCase().includes(t))})}return n})(),ot=rt.length>50;(0,i.useEffect)(()=>{Ke(40)},[be,Ce]),(0,i.useEffect)(()=>{if(!ot)return;const e=Ye.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Ke(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[ot,Xe,rt.length]);const at=()=>{et({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null}),nt([]),He([]),ke(!0)},st=(e,t)=>{He(Qe.map(n=>{if(n.menuItemId===e){const e=Math.max(1,n.quantity+t);return{...n,quantity:e}}return n}))};return(0,h.jsx)(a.A,{children:(0,h.jsxs)(m,{children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(v,{children:"Menu"}),(0,h.jsxs)(y,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>{et({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!0,set_items:[],set_display_order:0,recipe_id:null}),nt([]),He([]),Ze(!0)},children:"Create Set Menu"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:at,children:"Add New Item"})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(b,{children:(0,h.jsxs)(F,{children:[(0,h.jsx)(w,{children:"\ud83d\udd0d"}),(0,h.jsx)(C,{type:"text",placeholder:"Search menu items by name, description, price, or category...",value:Ce,onChange:e=>we(e.target.value)}),Ce&&(0,h.jsx)(A,{onClick:()=>we(""),title:"Clear search",children:"\xd7"})]})}),Ce&&rt.length>0&&(0,h.jsxs)(k,{children:[(0,h.jsxs)("span",{children:["Found ",rt.length," item",1!==rt.length?"s":"",' matching "',Ce,'"']}),(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>we(""),children:"Clear Search"})]}),(0,h.jsxs)(p.j,{children:[(0,h.jsxs)(p.oz,{active:"all"===be,onClick:()=>{Fe("all"),we("")},children:["All Items (",t.length,")"]}),e.map(e=>(0,h.jsxs)(p.oz,{active:be===e.id,onClick:()=>{Fe(e.id),we("")},children:[e.emoji," ",e.name]},e.id))]}),Ce&&0===rt.length?(0,h.jsxs)(E,{children:[(0,h.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,h.jsxs)("div",{className:"title",children:['No results for "',Ce,'"']}),(0,h.jsx)("div",{className:"message",children:"Try searching with different keywords or check the spelling"})]}):(0,h.jsxs)(B,{children:[(ot?rt.slice(0,Xe):rt).map(i=>{var r;return(0,h.jsxs)(S,{soldOut:i.soldOut,inactive:!1===i.is_active,children:[(0,h.jsxs)(_,{children:[i.is_set_menu&&(0,h.jsx)(ne,{children:"SET"}),i.image&&""!==i.image.trim()?(0,h.jsx)("img",{src:i.image,alt:i.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none",e.currentTarget.parentElement&&(e.currentTarget.parentElement.innerHTML=i.emoji||"\ud83c\udf7d\ufe0f",e.currentTarget.parentElement.style.fontSize="48px",e.currentTarget.parentElement.style.display="flex",e.currentTarget.parentElement.style.alignItems="center",e.currentTarget.parentElement.style.justifyContent="center")}}):(0,h.jsx)("span",{style:{fontSize:"48px"},children:i.emoji||"\ud83c\udf7d\ufe0f"})]}),(0,h.jsxs)(I,{children:[(0,h.jsx)(D,{children:null===(r=e.find(e=>e.id===i.category))||void 0===r?void 0:r.name}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(R,{children:[i.code?`${i.code} `:"",i.name]}),(0,h.jsx)($,{children:(0,g.vv)(i.price,Ge)})]}),(0,h.jsx)(M,{children:i.description||"No description available"}),i.is_set_menu&&i.set_items&&i.set_items.length>0&&(0,h.jsxs)(M,{style:{fontSize:"11px",color:"#667eea",fontWeight:500},children:["Set includes: ",i.set_items.map(e=>{const n=t.find(t=>t.id===e.menuItemId.toString()),i=null===n||void 0===n?void 0:n.code;return`${i?`${i} `:""}${e.name} x${e.quantity}`}).join(", ")]}),i.optionGroups&&i.optionGroups.length>0&&(0,h.jsxs)(M,{style:{fontSize:"11px",color:"#8898AA"},children:["Option Groups: ",i.optionGroups.map(e=>{var t;return null===(t=n.find(t=>t.id===e))||void 0===t?void 0:t.name}).filter(Boolean).join(", ")]}),i.recipe_id&&(()=>{const e=qe.find(e=>e.id===i.recipe_id);return e?(0,h.jsxs)(O,{onClick:t=>{t.stopPropagation();const n=window.location.pathname.split("/"),i=n.indexOf("restaurant"),r=i>=0?n[i+1]:"";je(`/restaurant/${r}/recipe-management?search=${encodeURIComponent(e.name)}`)},children:["Recipe: ",e.name]}):null})(),(0,h.jsxs)(T,{children:[(0,h.jsx)(L,{onClick:()=>(e=>{_e(e),et({...e,emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image||"",optionGroups:e.optionGroups||[],is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}),nt(e.optionGroups||[]),He(e.set_items||[]),e.is_set_menu?Ze(!0):Be(!0)})(i),children:"Edit"}),(0,h.jsx)(G,{onClick:()=>(async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),i=n>=0?t[n+1]:"",r=localStorage.getItem("auth_token"),o=await fetch(`/api/menu/product/${e.id}/copy?restaurantId=${i}`,{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),a=await o.json();a.success?window.location.reload():alert(a.error||"Failed to copy menu item")}catch(t){console.error("Error copying menu item:",t),alert("Failed to copy menu item")}})(i),title:"Copy",children:"\ud83d\udccb"}),(0,h.jsx)(G,{onClick:()=>(async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),i=n>=0?t[n+1]:"",r=localStorage.getItem("auth_token"),a=await fetch(`/api/menu/product/${e.id}/toggle-active?restaurantId=${i}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),s=await a.json();s.success?o({...e,is_active:s.data.is_active}):alert(s.error||"Failed to toggle menu item status")}catch(t){console.error("Error toggling menu item status:",t),alert("Failed to toggle menu item status")}})(i),inactive:!1===i.is_active,title:!1===i.is_active?"Activate":"Deactivate",children:!1===i.is_active?"\ud83d\udc41\ufe0f":"\ud83d\udeab"}),(0,h.jsx)(G,{onClick:()=>ye(i.id),warning:i.soldOut,title:i.soldOut?"Mark In Stock":"Mark Sold Out",children:i.soldOut?"\u2713":"\u2715"}),(0,h.jsx)(G,{danger:!0,onClick:()=>{return e=i.id,$e(e),void ze(!0);var e},title:"Delete",children:"\ud83d\uddd1\ufe0f"})]})]})]},i.id)}),(0,h.jsxs)(N,{onClick:at,children:[(0,h.jsx)(q,{children:"+"}),(0,h.jsx)(P,{children:"Add New Menu Item"})]}),ot&&Xe<rt.length&&(0,h.jsx)("div",{ref:Ye,style:{gridColumn:"1 / -1",height:"20px"}})]})]}),(0,h.jsxs)(p.aF,{isOpen:Ae,onClose:()=>ke(!1),title:"Add New Menu Item",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:()=>{const e={id:`item-${Date.now()}`,code:Ve.code||"",name:Ve.name||"",price:Ve.price||0,category:Ve.category||"korean",emoji:Ve.emoji||"\ud83c\udf7d\ufe0f",description:Ve.description,image:Ve.image,optionGroups:tt,soldOut:!1,is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:Ve.recipe_id||null};fe(e),ke(!1)},children:"Add Item"})]}),children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Code"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ve.code||"",onChange:e=>et({...Ve,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ve.name,onChange:e=>et({...Ve,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Price (RM) *"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ve.price,onChange:e=>et({...Ve,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category *"}),(0,h.jsx)(p.FX,{value:Ve.category,onChange:e=>et({...Ve,category:e.target.value}),children:e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji Icon"}),(0,h.jsx)(U,{children:it.other.map(e=>(0,h.jsx)(Z,{selected:Ve.emoji===e,onClick:()=>et({...Ve,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:Ve.description,onChange:e=>et({...Ve,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,h.jsx)(c.A,{value:Ve.image||"",onChange:e=>et({...Ve,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,h.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,h.jsx)(p.lR,{children:"Linked Recipe"}),(0,h.jsx)(u.A,{options:qe.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ve.recipe_id||null,onChange:e=>et({...Ve,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,h.jsx)(te,{children:(0,h.jsxs)(p.gE,{children:[(0,h.jsxs)(p.lR,{children:["Option Groups ",tt.length>0&&`(${tt.length} selected)`]}),(0,h.jsxs)(W,{value:"",onChange:e=>{e.target.value&&!tt.includes(e.target.value)&&nt([...tt,e.target.value])},children:[(0,h.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!tt.includes(e.id)).map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,h.jsx)(J,{children:tt.map((e,t)=>{const i=n.find(t=>t.id===e);return i?(0,h.jsxs)(X,{children:[(0,h.jsx)(K,{children:t+1}),(0,h.jsx)(Y,{children:i.name}),(0,h.jsx)(V,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,h.jsx)(ee,{onClick:()=>nt(tt.filter(t=>t!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,h.jsxs)(p.aF,{isOpen:Ee,onClose:()=>Be(!1),title:"Edit Menu Item",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:()=>{if(Se){const e={...Se,...Ve,optionGroups:tt};o(e),Be(!1),_e(null)}},children:"Save Changes"})]}),children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Code"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ve.code||"",onChange:e=>et({...Ve,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ve.name,onChange:e=>et({...Ve,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Price (RM) *"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ve.price,onChange:e=>et({...Ve,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category *"}),(0,h.jsx)(p.FX,{value:Ve.category,onChange:e=>et({...Ve,category:e.target.value}),children:e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji Icon"}),(0,h.jsx)(U,{children:it.other.map(e=>(0,h.jsx)(Z,{selected:Ve.emoji===e,onClick:()=>et({...Ve,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:Ve.description,onChange:e=>et({...Ve,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,h.jsx)(c.A,{value:Ve.image||"",onChange:e=>et({...Ve,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,h.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,h.jsx)(p.lR,{children:"Linked Recipe"}),(0,h.jsx)(u.A,{options:qe.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ve.recipe_id||null,onChange:e=>et({...Ve,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,h.jsx)(te,{children:(0,h.jsxs)(p.gE,{children:[(0,h.jsxs)(p.lR,{children:["Option Groups ",tt.length>0&&`(${tt.length} selected)`]}),(0,h.jsxs)(W,{value:"",onChange:e=>{e.target.value&&!tt.includes(e.target.value)&&nt([...tt,e.target.value])},children:[(0,h.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!tt.includes(e.id)).map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,h.jsx)(J,{children:tt.map((e,t)=>{const i=n.find(t=>t.id===e);return i?(0,h.jsxs)(X,{children:[(0,h.jsx)(K,{children:t+1}),(0,h.jsx)(Y,{children:i.name}),(0,h.jsx)(V,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,h.jsx)(ee,{onClick:()=>nt(tt.filter(t=>t!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,h.jsxs)(p.aF,{isOpen:Ue,onClose:()=>{Ze(!1),_e(null),He([])},title:Se?"Edit Set Menu":"Create Set Menu",size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>{Ze(!1),_e(null),He([])},children:"Cancel"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:()=>{if(0===Qe.length)return void alert("Set menu must contain at least one menu item.");const e={id:(null===Se||void 0===Se?void 0:Se.id)||`item-${Date.now()}`,code:Ve.code||"",name:Ve.name||"",price:Ve.price||0,category:Ve.category||"korean",emoji:Ve.emoji||"\ud83c\udf7d\ufe0f",description:Ve.description,image:Ve.image,optionGroups:tt,soldOut:!1,is_set_menu:!0,set_items:Qe,set_display_order:Ve.set_display_order||0};Se?o(e):fe(e),Ze(!1),_e(null),He([])},children:Se?"Save Changes":"Create Set Menu"})]}),children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Code"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ve.code||"",onChange:e=>et({...Ve,code:e.target.value}),placeholder:"e.g., S01, S02 (optional)"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Menu Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ve.name,onChange:e=>et({...Ve,name:e.target.value}),placeholder:"e.g., Family Set, Lunch Combo"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Price (RM) *"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ve.price,onChange:e=>et({...Ve,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category *"}),(0,h.jsx)(p.FX,{value:Ve.category,onChange:e=>et({...Ve,category:e.target.value}),children:e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji Icon"}),(0,h.jsx)(U,{children:it.other.map(e=>(0,h.jsx)(Z,{selected:Ve.emoji===e,onClick:()=>et({...Ve,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:Ve.description,onChange:e=>et({...Ve,description:e.target.value}),placeholder:"Brief description of this set menu..."})]}),(0,h.jsx)(c.A,{value:Ve.image||"",onChange:e=>et({...Ve,image:e}),label:"Set Menu Image"}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Display Order (for sorting set menus)"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ve.set_display_order||0,onChange:e=>et({...Ve,set_display_order:parseInt(e.target.value)||0}),min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Menu Items * (at least 1 item required)"}),Qe.length>0&&(0,h.jsx)(ie,{children:Qe.map(e=>{const n=t.find(t=>parseInt(t.id)===e.menuItemId),i=null===n||void 0===n?void 0:n.code;return(0,h.jsxs)(re,{children:[(0,h.jsx)(oe,{children:(0,h.jsxs)(ae,{children:[i?`${i} `:"",e.name]})}),(0,h.jsxs)(se,{children:[(0,h.jsx)(le,{onClick:()=>st(e.menuItemId,-1),disabled:e.quantity<=1,children:"\u2212"}),(0,h.jsx)(de,{children:e.quantity}),(0,h.jsx)(le,{onClick:()=>st(e.menuItemId,1),children:"+"})]}),(0,h.jsx)(ce,{onClick:()=>{return t=e.menuItemId,void He(Qe.filter(e=>e.menuItemId!==t));var t},children:"Remove"})]},e.menuItemId)})}),(0,h.jsxs)("div",{style:{marginTop:"12px"},children:[(0,h.jsx)(p.lR,{children:"Available Menu Items (select items to add to set)"}),(0,h.jsx)(p.ZQ,{type:"text",value:We,onChange:e=>Je(e.target.value),placeholder:"Search by code or name...",style:{marginBottom:"12px"}}),(0,h.jsx)(pe,{children:t.filter(e=>!e.is_set_menu).filter(e=>{var t;if(!We)return!0;const n=We.toLowerCase(),i=null===(t=e.code)||void 0===t?void 0:t.toLowerCase().includes(n),r=e.name.toLowerCase().includes(n);return i||r}).map(n=>{var i;return(0,h.jsxs)(ue,{selected:Qe.some(e=>e.menuItemId===parseInt(n.id)),onClick:()=>(e=>{const n=t.find(t=>t.id===e.toString());if(!n||n.is_set_menu)return;const i=Qe.find(t=>t.menuItemId===e);He(i?Qe.map(t=>t.menuItemId===e?{...t,quantity:t.quantity+1}:t):[...Qe,{menuItemId:e,name:n.name,quantity:1}])})(parseInt(n.id)),children:[n.image?(0,h.jsx)("img",{src:n.image,alt:n.name,loading:"lazy",style:{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",marginRight:"12px"}}):(0,h.jsx)(xe,{children:n.emoji||"\ud83c\udf7d\ufe0f"}),(0,h.jsxs)(ge,{children:[(0,h.jsxs)(he,{children:[n.code?`${n.code} `:"",n.name]}),(0,h.jsxs)(me,{children:[(0,g.vv)(n.price,Ge)," \xb7 ",null===(i=e.find(e=>e.id===n.category))||void 0===i?void 0:i.name]})]})]},n.id)})})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Menu Options (options for entire set)"}),(0,h.jsx)(Q,{children:n.map(e=>(0,h.jsxs)(H,{children:[(0,h.jsx)("input",{type:"checkbox",checked:tt.includes(e.id),onChange:()=>{return t=e.id,void(tt.includes(t)?nt(tt.filter(e=>e!==t)):nt([...tt,t]));var t}}),e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))})]})]}),(0,h.jsx)(l.A,{isOpen:Ie,onClose:()=>ze(!1),onConfirm:()=>{Re&&(ve(Re),ze(!1),$e(null))},title:"Delete Menu Item",message:"Are you sure you want to delete this menu item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel",variant:"danger"}),(0,h.jsx)(d.A,{isOpen:Me,onClose:()=>Oe(!1),onConfirm:e=>{if(De){const t=parseFloat(e);o({...De,price:t}),Oe(!1),Te(null)}},title:"Update Price",label:`Enter new price for ${null===De||void 0===De?void 0:De.name}:`,placeholder:null===De||void 0===De?void 0:De.price.toString(),min:0,step:.01,suffix:" RM",confirmText:"Update Price",cancelText:"Cancel"})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var i=n(9950),r=n(1367),o=n(6038);const a=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[a,s]=(0,i.useState)(Object.keys(o.DL)),[l,d]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(i)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:l,error:c}}},4877:(e,t,n)=>{n.d(t,{A:()=>v});var i=n(9950),r=n(4752),o=n(4414);const a=r.Ay.div`
  margin-bottom: 16px;
`,s=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=r.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=r.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,p=r.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,u=r.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=r.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,h=r.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
  }

  input {
    display: none;
  }
`,m=r.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,f=r.Ay.input`
  display: none;
`,v=e=>{let{value:t,onChange:n,label:r="Logo Upload",helpText:v="Upload an image for your logo",maxSize:y=2,previewSize:j=150,showRemoveButton:b=!0,changeButtonText:F="Change Image",removeButtonText:C="Remove Image",imageAltText:w="Uploaded"}=e;const[A,k]=(0,i.useState)(!1),E=(0,i.useRef)(null),B=(0,i.useRef)(null),S=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*y*1024)return void alert(`Image size should be less than ${y}MB`);const t=new FileReader;t.onload=e=>{var t;const i=new Image;i.onload=()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return;const r=800;let o=i.width,a=i.height;(o>r||a>r)&&(o>a?(a=a/o*r,o=r):(o=o/a*r,a=r)),e.width=o,e.height=a,t.drawImage(i,0,0,o,a);const s=e.toDataURL("image/jpeg",.85);n(s)},i.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},_=e=>{const t=e.target.files;t&&t.length>0&&S(t[0])};return(0,o.jsxs)(a,{children:[r&&(0,o.jsx)(s,{children:r}),v&&(0,o.jsx)(l,{children:v}),(0,o.jsxs)(d,{children:[(0,o.jsx)(c,{ref:B,isDragging:A,hasImage:!!t,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),k(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&k(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),k(!1);const t=e.dataTransfer.files;t&&t.length>0&&S(t[0])},onClick:()=>{var e;t||(null===(e=E.current)||void 0===e||e.click())},children:t?(0,o.jsx)("img",{src:t,alt:w}):(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(x,{children:["PNG, JPG, GIF up to ",y,"MB"]})]})}),t&&(0,o.jsxs)(g,{children:[(0,o.jsxs)(h,{children:[F,(0,o.jsx)("input",{ref:E,type:"file",accept:"image/*",onChange:_})]}),b&&(0,o.jsx)(m,{onClick:()=>{n("")},children:C})]})]}),!t&&(0,o.jsx)(f,{ref:E,type:"file",accept:"image/*",onChange:_})]})}},9194:(e,t,n)=>{n.d(t,{A:()=>m});var i=n(9950),r=n(4752),o=n(4414);const a=r.Ay.div`
  position: relative;
  width: 100%;
`,s=r.Ay.div`
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
`,l=r.Ay.input`
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
`,d=r.Ay.button`
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
`,c=r.Ay.div`
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
`,p=r.Ay.div`
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
`,u=r.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,x=r.Ay.div`
  font-size: 14px;
`,g=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,h=r.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:t,value:n,onChange:r,placeholder:m="Select...",disabled:f=!1,allowClear:v=!0,noOptionsMessage:y="No options found"}=e;const[j,b]=(0,i.useState)(!1),[F,C]=(0,i.useState)(""),[w,A]=(0,i.useState)(-1),k=(0,i.useRef)(null),E=(0,i.useRef)(null),B=t.find(e=>e.value===n),S=t.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,i.useEffect)(()=>{const e=e=>{k.current&&!k.current.contains(e.target)&&(b(!1),C(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,i.useEffect)(()=>{j||(C(""),A(-1))},[j]);const _=e=>{r(e.value),b(!1),C("")},I=j?F:(null===B||void 0===B?void 0:B.label)||"";return(0,o.jsxs)(a,{ref:k,children:[(0,o.jsxs)(s,{isOpen:j,disabled:f,onClick:()=>{var e;f||(b(!0),null===(e=E.current)||void 0===e||e.focus())},children:[(0,o.jsx)(l,{ref:E,type:"text",value:I,onChange:e=>{C(e.target.value),A(0),j||b(!0)},onKeyDown:e=>{if(!f)switch(e.key){case"ArrowDown":e.preventDefault(),j?A(e=>e<S.length-1?e+1:e):b(!0);break;case"ArrowUp":e.preventDefault(),A(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),j&&w>=0&&S[w]?_(S[w]):j||b(!0);break;case"Escape":b(!1),C("")}},placeholder:m,disabled:f}),v&&n&&!f&&(0,o.jsx)(d,{onClick:e=>{e.stopPropagation(),r(null),C("")},type:"button",children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,o.jsx)(c,{isOpen:j,children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,o.jsx)(p,{isOpen:j,children:S.length>0?S.map((e,t)=>(0,o.jsxs)(u,{isSelected:e.value===n,isHighlighted:t===w,onClick:()=>_(e),onMouseEnter:()=>A(t),children:[(0,o.jsx)(x,{children:e.label}),e.subLabel&&(0,o.jsx)(g,{children:e.subLabel})]},e.value)):(0,o.jsx)(h,{children:y})})]})}}}]);