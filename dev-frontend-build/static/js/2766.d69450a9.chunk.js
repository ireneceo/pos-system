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
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:o,title:c,label:p,placeholder:u="",min:x=0,max:h,step:g=1,suffix:m="",confirmText:f="Apply",cancelText:v="Cancel"}=e;const[y,j]=(0,i.useState)(""),[b,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(y);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(o(y),j(""),F(""),n())},w=()=>{j(""),F(""),n()},k=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.yl,{variant:"secondary",onClick:w,children:v}),(0,a.jsx)(r.yl,{variant:"primary",onClick:C,disabled:!y||!!b||parseFloat(y)<x,children:f})]});return(0,a.jsx)(r.aF,{isOpen:t,onClose:w,title:c,footer:k,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(r.lR,{children:p}),(0,a.jsx)(s,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return j(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<x?`Minimum value is ${x}${m}`:void 0!==h&&n>h?`Maximum value is ${h}${m}`:""),j(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!b&&y&&C()}}),b&&(0,a.jsx)(l,{children:b}),!b&&void 0!==h&&(0,a.jsxs)(d,{children:["Enter a value between ",x,m," and ",h,m]})]})})}},2766:(e,t,n)=>{n.r(t),n.d(t,{default:()=>me});var i=n(9950),r=n(4492),o=n(4752),a=n(8930),s=n(1472),l=n(2538),d=n(4877),c=n(8409),p=n(9194),u=n(4021),x=n(6038),h=n(4414);const g=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=o.Ay.div`
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
`,f=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,v=o.Ay.div`
  display: flex;
  gap: 12px;
`,y=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,j=o.Ay.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`,b=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,F=o.Ay.input`
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
`,C=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,w=o.Ay.button`
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
`,A=o.Ay.div`
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
`,E=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,B=o.Ay.div`
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
`,S=o.Ay.div`
  width: 100%;
  height: 180px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`,_=o.Ay.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`,I=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
`,z=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,$=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
`,R=o.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 8px 0;
  line-height: 1.4;
`,M=o.Ay.span`
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
`,O=o.Ay.div`
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
`,D=o.Ay.div`
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
`,T=o.Ay.button`
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
`,G=o.Ay.div`
  font-size: 48px;
  color: #635BFF;
  margin-bottom: 12px;
`,q=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
`,P=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,U=o.Ay.button`
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
`,W=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,Z=o.Ay.label`
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
`,Q=o.Ay.select`
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
`,H=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 36px;
`,J=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 20px;
  font-size: 13px;
  color: #4338CA;
`,V=o.Ay.span`
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
`,X=o.Ay.span`
  font-weight: 500;
`,K=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${e=>"required"===e.type?"background: #FEE2E2; color: #DC2626;":"background: #DCFCE7; color: #16A34A;"}
`,Y=o.Ay.button`
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
`,ee=o.Ay.div`
  margin-top: 24px;
`,te=o.Ay.div`
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
`,ne=o.Ay.div`
  background: #F6F9FC;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
`,ie=o.Ay.div`
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
`,re=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,oe=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ae=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,se=o.Ay.button`
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
`,le=o.Ay.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #0A2540;
`,de=o.Ay.button`
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
`,ce=o.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`,pe=o.Ay.div`
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
`,ue=o.Ay.span`
  font-size: 24px;
`,xe=o.Ay.div`
  flex: 1;
`,he=o.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`,ge=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,me=()=>{const{categories:e,menuItems:t,optionGroups:n,updateMenuItem:o,addMenuItem:me,removeMenuItem:fe,toggleItemSoldOut:ve}=(0,a.b)(),ye=(0,r.Zp)(),[je,be]=(0,i.useState)("all"),[Fe,Ce]=(0,i.useState)(""),[we,ke]=(0,i.useState)(!1),[Ae,Ee]=(0,i.useState)(!1),[Be,Se]=(0,i.useState)(null),[_e,Ie]=(0,i.useState)(!1),[ze,$e]=(0,i.useState)(null),[Re,Me]=(0,i.useState)(!1),[Oe,De]=(0,i.useState)(null),{defaultCurrency:Le}=(0,u.i1)(),[Te,Ne]=(0,i.useState)("RM");(0,i.useEffect)(()=>{Le&&Ne(Le)},[Le]);const[Ge,qe]=(0,i.useState)([]),[Pe,Ue]=(0,i.useState)(!1),[We,Ze]=(0,i.useState)([]),[,]=(0,i.useState)(0),[Qe,He]=(0,i.useState)(""),[Je,Ve]=(0,i.useState)(40),Xe=(0,i.useRef)(null),[Ke,Ye]=(0,i.useState)({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null});i.useEffect(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let i=null;if(n>=0&&(i=t[n+1]),!i)return void console.error("No restaurantId found in URL");const[r,o]=await Promise.all([fetch(`/api/restaurants/${i}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),fetch(`/api/restaurants/${i}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}})]);let a=[];if(r.ok){const e=await r.json();e.success&&(a=[...a,...e.data||[]])}if(o.ok){const e=await o.json();e.success&&(a=[...a,...e.data||[]])}qe(a)}catch(e){console.error("Failed to fetch recipes:",e)}})()},[]);const[et,tt]=(0,i.useState)([]),nt={other:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83e\uded7","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\uded8","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83e\uded0","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\uded2","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udedb","\ud83e\udd54","\ud83e\udeda","\ud83c\udf44","\ud83c\udf7d\ufe0f","\ud83e\udd44","\ud83c\udf74","\ud83e\udd62","\ud83c\udf71","\ud83e\udd61","\ud83d\udd2a","\ud83e\uddc2","\ud83e\uded5"]},it=(()=>{let n="all"===je?t:t.filter(e=>e.category===je);if(Fe.trim()){const t=Fe.toLowerCase().trim();n=n.filter(n=>{var i;return n.name.toLowerCase().includes(t)||n.description&&n.description.toLowerCase().includes(t)||n.price.toString().includes(t)||(null===(i=e.find(e=>e.id===n.category))||void 0===i?void 0:i.name.toLowerCase().includes(t))})}return n})(),rt=it.length>50;(0,i.useEffect)(()=>{Ve(40)},[je,Fe]),(0,i.useEffect)(()=>{if(!rt)return;const e=Xe.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Ve(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[rt,Je,it.length]);const ot=()=>{Ye({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null}),tt([]),Ze([]),ke(!0)},at=(e,t)=>{Ze(We.map(n=>{if(n.menuItemId===e){const e=Math.max(1,n.quantity+t);return{...n,quantity:e}}return n}))};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsx)(f,{children:"Menu"}),(0,h.jsxs)(v,{children:[(0,h.jsx)(c.$n,{variant:"secondary",onClick:()=>{Ye({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!0,set_items:[],set_display_order:0,recipe_id:null}),tt([]),Ze([]),Ue(!0)},children:"Create Set Menu"}),(0,h.jsx)(c.$n,{variant:"primary",onClick:ot,children:"Add New Item"})]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(j,{children:(0,h.jsxs)(b,{children:[(0,h.jsx)(C,{children:"\ud83d\udd0d"}),(0,h.jsx)(F,{type:"text",placeholder:"Search menu items by name, description, price, or category...",value:Fe,onChange:e=>Ce(e.target.value)}),Fe&&(0,h.jsx)(w,{onClick:()=>Ce(""),title:"Clear search",children:"\xd7"})]})}),Fe&&it.length>0&&(0,h.jsxs)(k,{children:[(0,h.jsxs)("span",{children:["Found ",it.length," item",1!==it.length?"s":"",' matching "',Fe,'"']}),(0,h.jsx)(c.$n,{variant:"secondary",onClick:()=>Ce(""),children:"Clear Search"})]}),(0,h.jsxs)(c.j,{children:[(0,h.jsxs)(c.oz,{active:"all"===je,onClick:()=>{be("all"),Ce("")},children:["All Items (",t.length,")"]}),e.map(e=>(0,h.jsxs)(c.oz,{active:je===e.id,onClick:()=>{be(e.id),Ce("")},children:[e.emoji," ",e.name]},e.id))]}),Fe&&0===it.length?(0,h.jsxs)(A,{children:[(0,h.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,h.jsxs)("div",{className:"title",children:['No results for "',Fe,'"']}),(0,h.jsx)("div",{className:"message",children:"Try searching with different keywords or check the spelling"})]}):(0,h.jsxs)(E,{children:[(rt?it.slice(0,Je):it).map(i=>{var r;return(0,h.jsxs)(B,{soldOut:i.soldOut,inactive:!1===i.is_active,children:[(0,h.jsxs)(S,{children:[i.is_set_menu&&(0,h.jsx)(te,{children:"SET"}),i.image&&""!==i.image.trim()?(0,h.jsx)("img",{src:i.image,alt:i.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none",e.currentTarget.parentElement&&(e.currentTarget.parentElement.innerHTML=i.emoji||"\ud83c\udf7d\ufe0f",e.currentTarget.parentElement.style.fontSize="48px",e.currentTarget.parentElement.style.display="flex",e.currentTarget.parentElement.style.alignItems="center",e.currentTarget.parentElement.style.justifyContent="center")}}):(0,h.jsx)("span",{style:{fontSize:"48px"},children:i.emoji||"\ud83c\udf7d\ufe0f"})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)(O,{children:null===(r=e.find(e=>e.id===i.category))||void 0===r?void 0:r.name}),(0,h.jsxs)(I,{children:[(0,h.jsxs)(z,{children:[i.code?`${i.code} `:"",i.name]}),(0,h.jsx)($,{children:(0,x.vv)(i.price,Te)})]}),(0,h.jsx)(R,{children:i.description||"No description available"}),i.is_set_menu&&i.set_items&&i.set_items.length>0&&(0,h.jsxs)(R,{style:{fontSize:"11px",color:"#667eea",fontWeight:500},children:["Set includes: ",i.set_items.map(e=>{const n=t.find(t=>t.id===e.menuItemId.toString()),i=null===n||void 0===n?void 0:n.code;return`${i?`${i} `:""}${e.name} x${e.quantity}`}).join(", ")]}),i.optionGroups&&i.optionGroups.length>0&&(0,h.jsxs)(R,{style:{fontSize:"11px",color:"#8898AA"},children:["Option Groups: ",i.optionGroups.map(e=>{var t;return null===(t=n.find(t=>t.id===e))||void 0===t?void 0:t.name}).filter(Boolean).join(", ")]}),i.recipe_id&&(()=>{const e=Ge.find(e=>e.id===i.recipe_id);return e?(0,h.jsxs)(M,{onClick:t=>{t.stopPropagation();const n=window.location.pathname.split("/"),i=n.indexOf("restaurant"),r=i>=0?n[i+1]:"";ye(`/restaurant/${r}/recipe-management?search=${encodeURIComponent(e.name)}`)},children:["Recipe: ",e.name]}):null})(),(0,h.jsxs)(D,{children:[(0,h.jsx)(L,{onClick:()=>(e=>{Se(e),Ye({...e,emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image||"",optionGroups:e.optionGroups||[],is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}),tt(e.optionGroups||[]),Ze(e.set_items||[]),e.is_set_menu?Ue(!0):Ee(!0)})(i),children:"Edit"}),(0,h.jsx)(T,{onClick:()=>(async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),i=n>=0?t[n+1]:"",r=localStorage.getItem("auth_token"),o=await fetch(`/api/menu/product/${e.id}/copy?restaurantId=${i}`,{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),a=await o.json();a.success?window.location.reload():alert(a.error||"Failed to copy menu item")}catch(t){console.error("Error copying menu item:",t),alert("Failed to copy menu item")}})(i),title:"Copy",children:(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",stroke:"currentColor",strokeWidth:"2"}),(0,h.jsx)("path",{d:"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",stroke:"currentColor",strokeWidth:"2"})]})}),(0,h.jsx)(T,{onClick:()=>(async e=>{try{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant"),i=n>=0?t[n+1]:"",r=localStorage.getItem("auth_token"),a=await fetch(`/api/menu/product/${e.id}/toggle-active?restaurantId=${i}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),s=await a.json();s.success?o({...e,is_active:s.data.is_active}):alert(s.error||"Failed to toggle menu item status")}catch(t){console.error("Error toggling menu item status:",t),alert("Failed to toggle menu item status")}})(i),inactive:!1===i.is_active,title:!1===i.is_active?"Activate":"Deactivate",children:!1===i.is_active?(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",stroke:"currentColor",strokeWidth:"2"}),(0,h.jsx)("circle",{cx:"12",cy:"12",r:"3",stroke:"currentColor",strokeWidth:"2"})]}):(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,h.jsx)(T,{onClick:()=>ve(i.id),warning:i.soldOut,title:i.soldOut?"Mark In Stock":"Mark Sold Out",children:i.soldOut?(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,h.jsx)("polyline",{points:"20 6 9 17 4 12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}):(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2"}),(0,h.jsx)("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07",stroke:"currentColor",strokeWidth:"2"})]})}),(0,h.jsx)(T,{danger:!0,onClick:()=>{return e=i.id,$e(e),void Ie(!0);var e},title:"Delete",children:(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})})]})]})]},i.id)}),(0,h.jsxs)(N,{onClick:ot,children:[(0,h.jsx)(G,{children:"+"}),(0,h.jsx)(q,{children:"Add New Menu Item"})]}),rt&&Je<it.length&&(0,h.jsx)("div",{ref:Xe,style:{gridColumn:"1 / -1",height:"20px"}})]})]}),(0,h.jsxs)(c.aF,{isOpen:we,onClose:()=>ke(!1),title:"Add New Menu Item",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.$n,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,h.jsx)(c.$n,{variant:"primary",onClick:()=>{if(!Ke.category)return;const e={id:`item-${Date.now()}`,code:Ke.code||"",name:Ke.name||"",price:Ke.price||0,category:Ke.category,emoji:Ke.emoji||"\ud83c\udf7d\ufe0f",description:Ke.description,image:Ke.image,optionGroups:et,soldOut:!1,is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:Ke.recipe_id||null};me(e),ke(!1)},disabled:!Ke.name||!Ke.category,children:"Add Item"})]}),children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Code"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ke.code||"",onChange:e=>Ye({...Ke,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ke.name,onChange:e=>Ye({...Ke,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Price (RM) *"}),(0,h.jsx)(c.ZQ,{type:"number",value:Ke.price,onChange:e=>Ye({...Ke,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category *"}),(0,h.jsxs)(c.FX,{value:Ke.category,onChange:e=>Ye({...Ke,category:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"-- Select Category --"}),e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Emoji Icon"}),(0,h.jsx)(P,{children:nt.other.map(e=>(0,h.jsx)(U,{selected:Ke.emoji===e,onClick:()=>Ye({...Ke,emoji:e}),children:e},e))})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Description"}),(0,h.jsx)(c.Lz,{value:Ke.description,onChange:e=>Ye({...Ke,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,h.jsx)(d.A,{value:Ke.image||"",onChange:e=>Ye({...Ke,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,h.jsxs)(c.gE,{style:{marginTop:"24px"},children:[(0,h.jsx)(c.lR,{children:"Linked Recipe"}),(0,h.jsx)(p.A,{options:Ge.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ke.recipe_id||null,onChange:e=>Ye({...Ke,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,h.jsx)(ee,{children:(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Option Groups ",et.length>0&&`(${et.length} selected)`]}),(0,h.jsxs)(Q,{value:"",onChange:e=>{e.target.value&&!et.includes(e.target.value)&&tt([...et,e.target.value])},children:[(0,h.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!et.includes(e.id)).map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,h.jsx)(H,{children:et.map((e,t)=>{const i=n.find(t=>t.id===e);return i?(0,h.jsxs)(J,{children:[(0,h.jsx)(V,{children:t+1}),(0,h.jsx)(X,{children:i.name}),(0,h.jsx)(K,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,h.jsx)(Y,{onClick:()=>tt(et.filter(t=>t!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,h.jsxs)(c.aF,{isOpen:Ae,onClose:()=>Ee(!1),title:"Edit Menu Item",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.$n,{variant:"secondary",onClick:()=>Ee(!1),children:"Cancel"}),(0,h.jsx)(c.$n,{variant:"primary",onClick:()=>{if(Be){const e={...Be,...Ke,optionGroups:et};o(e),Ee(!1),Se(null)}},children:"Save Changes"})]}),children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Code"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ke.code||"",onChange:e=>Ye({...Ke,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ke.name,onChange:e=>Ye({...Ke,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Price (RM) *"}),(0,h.jsx)(c.ZQ,{type:"number",value:Ke.price,onChange:e=>Ye({...Ke,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category *"}),(0,h.jsxs)(c.FX,{value:Ke.category,onChange:e=>Ye({...Ke,category:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"-- Select Category --"}),e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Emoji Icon"}),(0,h.jsx)(P,{children:nt.other.map(e=>(0,h.jsx)(U,{selected:Ke.emoji===e,onClick:()=>Ye({...Ke,emoji:e}),children:e},e))})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Description"}),(0,h.jsx)(c.Lz,{value:Ke.description,onChange:e=>Ye({...Ke,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,h.jsx)(d.A,{value:Ke.image||"",onChange:e=>Ye({...Ke,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,h.jsxs)(c.gE,{style:{marginTop:"24px"},children:[(0,h.jsx)(c.lR,{children:"Linked Recipe"}),(0,h.jsx)(p.A,{options:Ge.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ke.recipe_id||null,onChange:e=>Ye({...Ke,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,h.jsx)(ee,{children:(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Option Groups ",et.length>0&&`(${et.length} selected)`]}),(0,h.jsxs)(Q,{value:"",onChange:e=>{e.target.value&&!et.includes(e.target.value)&&tt([...et,e.target.value])},children:[(0,h.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!et.includes(e.id)).map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,h.jsx)(H,{children:et.map((e,t)=>{const i=n.find(t=>t.id===e);return i?(0,h.jsxs)(J,{children:[(0,h.jsx)(V,{children:t+1}),(0,h.jsx)(X,{children:i.name}),(0,h.jsx)(K,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,h.jsx)(Y,{onClick:()=>tt(et.filter(t=>t!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,h.jsxs)(c.aF,{isOpen:Pe,onClose:()=>{Ue(!1),Se(null),Ze([])},title:Be?"Edit Set Menu":"Create Set Menu",size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.$n,{variant:"secondary",onClick:()=>{Ue(!1),Se(null),Ze([])},children:"Cancel"}),(0,h.jsx)(c.$n,{variant:"primary",onClick:()=>{if(0===We.length)return void alert("Set menu must contain at least one menu item.");if(!Ke.category)return;const e={id:(null===Be||void 0===Be?void 0:Be.id)||`item-${Date.now()}`,code:Ke.code||"",name:Ke.name||"",price:Ke.price||0,category:Ke.category,emoji:Ke.emoji||"\ud83c\udf7d\ufe0f",description:Ke.description,image:Ke.image,optionGroups:et,soldOut:!1,is_set_menu:!0,set_items:We,set_display_order:Ke.set_display_order||0};Be?o(e):me(e),Ue(!1),Se(null),Ze([])},disabled:!Ke.name||!Ke.category,children:Be?"Save Changes":"Create Set Menu"})]}),children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Item Code"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ke.code||"",onChange:e=>Ye({...Ke,code:e.target.value}),placeholder:"e.g., S01, S02 (optional)"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Set Menu Name *"}),(0,h.jsx)(c.ZQ,{type:"text",value:Ke.name,onChange:e=>Ye({...Ke,name:e.target.value}),placeholder:"e.g., Family Set, Lunch Combo"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Set Price (RM) *"}),(0,h.jsx)(c.ZQ,{type:"number",value:Ke.price,onChange:e=>Ye({...Ke,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category *"}),(0,h.jsxs)(c.FX,{value:Ke.category,onChange:e=>Ye({...Ke,category:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"-- Select Category --"}),e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Emoji Icon"}),(0,h.jsx)(P,{children:nt.other.map(e=>(0,h.jsx)(U,{selected:Ke.emoji===e,onClick:()=>Ye({...Ke,emoji:e}),children:e},e))})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Description"}),(0,h.jsx)(c.Lz,{value:Ke.description,onChange:e=>Ye({...Ke,description:e.target.value}),placeholder:"Brief description of this set menu..."})]}),(0,h.jsx)(d.A,{value:Ke.image||"",onChange:e=>Ye({...Ke,image:e}),label:"Set Menu Image"}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Display Order (for sorting set menus)"}),(0,h.jsx)(c.ZQ,{type:"number",value:Ke.set_display_order||0,onChange:e=>Ye({...Ke,set_display_order:parseInt(e.target.value)||0}),min:"0"})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Set Menu Items * (at least 1 item required)"}),We.length>0&&(0,h.jsx)(ne,{children:We.map(e=>{const n=t.find(t=>parseInt(t.id)===e.menuItemId),i=null===n||void 0===n?void 0:n.code;return(0,h.jsxs)(ie,{children:[(0,h.jsx)(re,{children:(0,h.jsxs)(oe,{children:[i?`${i} `:"",e.name]})}),(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{onClick:()=>at(e.menuItemId,-1),disabled:e.quantity<=1,children:"\u2212"}),(0,h.jsx)(le,{children:e.quantity}),(0,h.jsx)(se,{onClick:()=>at(e.menuItemId,1),children:"+"})]}),(0,h.jsx)(de,{onClick:()=>{return t=e.menuItemId,void Ze(We.filter(e=>e.menuItemId!==t));var t},children:"Remove"})]},e.menuItemId)})}),(0,h.jsxs)("div",{style:{marginTop:"12px"},children:[(0,h.jsx)(c.lR,{children:"Available Menu Items (select items to add to set)"}),(0,h.jsx)(c.ZQ,{type:"text",value:Qe,onChange:e=>He(e.target.value),placeholder:"Search by code or name...",style:{marginBottom:"12px"}}),(0,h.jsx)(ce,{children:t.filter(e=>!e.is_set_menu).filter(e=>{var t;if(!Qe)return!0;const n=Qe.toLowerCase(),i=null===(t=e.code)||void 0===t?void 0:t.toLowerCase().includes(n),r=e.name.toLowerCase().includes(n);return i||r}).map(n=>{var i;return(0,h.jsxs)(pe,{selected:We.some(e=>e.menuItemId===parseInt(n.id)),onClick:()=>(e=>{const n=t.find(t=>t.id===e.toString());if(!n||n.is_set_menu)return;const i=We.find(t=>t.menuItemId===e);Ze(i?We.map(t=>t.menuItemId===e?{...t,quantity:t.quantity+1}:t):[...We,{menuItemId:e,name:n.name,quantity:1}])})(parseInt(n.id)),children:[n.image?(0,h.jsx)("img",{src:n.image,alt:n.name,loading:"lazy",style:{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",marginRight:"12px"}}):(0,h.jsx)(ue,{children:n.emoji||"\ud83c\udf7d\ufe0f"}),(0,h.jsxs)(xe,{children:[(0,h.jsxs)(he,{children:[n.code?`${n.code} `:"",n.name]}),(0,h.jsxs)(ge,{children:[(0,x.vv)(n.price,Te)," \xb7 ",null===(i=e.find(e=>e.id===n.category))||void 0===i?void 0:i.name]})]})]},n.id)})})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Set Menu Options (options for entire set)"}),(0,h.jsx)(W,{children:n.map(e=>(0,h.jsxs)(Z,{children:[(0,h.jsx)("input",{type:"checkbox",checked:et.includes(e.id),onChange:()=>{return t=e.id,void(et.includes(t)?tt(et.filter(e=>e!==t)):tt([...et,t]));var t}}),e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))})]})]}),(0,h.jsx)(s.A,{isOpen:_e,onClose:()=>Ie(!1),onConfirm:()=>{ze&&(fe(ze),Ie(!1),$e(null))},title:"Delete Menu Item",message:"Are you sure you want to delete this menu item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel",variant:"danger"}),(0,h.jsx)(l.A,{isOpen:Re,onClose:()=>Me(!1),onConfirm:e=>{if(Oe){const t=parseFloat(e);o({...Oe,price:t}),Me(!1),De(null)}},title:"Update Price",label:`Enter new price for ${null===Oe||void 0===Oe?void 0:Oe.name}:`,placeholder:null===Oe||void 0===Oe?void 0:Oe.price.toString(),min:0,step:.01,suffix:" RM",confirmText:"Update Price",cancelText:"Cancel"})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var i=n(9950),r=n(1367),o=n(6038);const a=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[a]=(0,i.useState)(Object.keys(o.DL)),[s,l]=(0,i.useState)(!0),[d,c]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(i)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:s,error:d}}},4877:(e,t,n)=>{n.d(t,{A:()=>j});var i=n(9950),r=n(4752),o=n(4414);const a=r.Ay.div`
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
`,h=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=r.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
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
`,v=r.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,y=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",j=e=>{let{value:t,onChange:n,label:r="Logo Upload",helpText:j="Upload an image for your logo",maxSize:b=2,previewSize:F=150,showRemoveButton:C=!0,changeButtonText:w="Change Image",removeButtonText:k="Remove Image",imageAltText:A="Uploaded"}=e;const[E,B]=(0,i.useState)(!1),[S,_]=(0,i.useState)(!1),I=(0,i.useRef)(null),z=(0,i.useRef)(null),$=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*b*1024)return void alert(`Image size should be less than ${b}MB`);_(!0);const t=new FileReader;t.onload=async e=>{var t;const i=new Image;i.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void _(!1);const r=1200;let o=i.width,a=i.height;(o>r||a>r)&&(o>a?(a=a/o*r,o=r):(o=o/a*r,a=r)),e.width=o,e.height=a,t.drawImage(i,0,0,o,a);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`${y()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),i=await n.json();return i.success?i.data.original:(console.error("Image upload failed:",i.message),null)}catch(t){return console.error("Image upload error:",t),null}})(s);_(!1),l?n(l):alert("Failed to upload image. Please try again.")},i.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},R=e=>{if(S)return;const t=e.target.files;t&&t.length>0&&$(t[0]),e.target.value=""};return(0,o.jsxs)(a,{children:[r&&(0,o.jsx)(s,{children:r}),j&&(0,o.jsx)(l,{children:j}),(0,o.jsxs)(d,{children:[(0,o.jsx)(c,{ref:z,isDragging:E,hasImage:!!t,isUploading:S,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),S||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),S)return;const t=e.dataTransfer.files;t&&t.length>0&&$(t[0])},onClick:()=>{var e;t||S||(null===(e=I.current)||void 0===e||e.click())},children:S?(0,o.jsxs)(p,{children:[(0,o.jsx)(v,{}),(0,o.jsx)(u,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,o.jsx)("img",{src:(M=t,M?M.startsWith("http")?M:M.startsWith("/uploads/")?`${y()}${M}`:M:""),alt:A}):(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{children:E?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(x,{children:["PNG, JPG, GIF up to ",b,"MB"]})]})}),t&&!S&&(0,o.jsxs)(h,{children:[(0,o.jsxs)(g,{disabled:S,children:[w,(0,o.jsx)("input",{ref:I,type:"file",accept:"image/*",onChange:R,disabled:S})]}),C&&(0,o.jsx)(m,{onClick:()=>{n("")},disabled:S,children:k})]})]}),!t&&!S&&(0,o.jsx)(f,{ref:I,type:"file",accept:"image/*",onChange:R})]});var M}},9194:(e,t,n)=>{n.d(t,{A:()=>m});var i=n(9950),r=n(4752),o=n(4414);const a=r.Ay.div`
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
`,h=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,g=r.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:t,value:n,onChange:r,placeholder:m="Select...",disabled:f=!1,allowClear:v=!0,noOptionsMessage:y="No options found"}=e;const[j,b]=(0,i.useState)(!1),[F,C]=(0,i.useState)(""),[w,k]=(0,i.useState)(-1),A=(0,i.useRef)(null),E=(0,i.useRef)(null),B=t.find(e=>e.value===n),S=t.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,i.useEffect)(()=>{const e=e=>{A.current&&!A.current.contains(e.target)&&(b(!1),C(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,i.useEffect)(()=>{j||(C(""),k(-1))},[j]);const _=e=>{r(e.value),b(!1),C("")},I=j?F:(null===B||void 0===B?void 0:B.label)||"";return(0,o.jsxs)(a,{ref:A,children:[(0,o.jsxs)(s,{isOpen:j,disabled:f,onClick:()=>{var e;f||(b(!0),null===(e=E.current)||void 0===e||e.focus())},children:[(0,o.jsx)(l,{ref:E,type:"text",value:I,onChange:e=>{C(e.target.value),k(0),j||b(!0)},onKeyDown:e=>{if(!f)switch(e.key){case"ArrowDown":e.preventDefault(),j?k(e=>e<S.length-1?e+1:e):b(!0);break;case"ArrowUp":e.preventDefault(),k(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),j&&w>=0&&S[w]?_(S[w]):j||b(!0);break;case"Escape":b(!1),C("")}},placeholder:m,disabled:f}),v&&n&&!f&&(0,o.jsx)(d,{onClick:e=>{e.stopPropagation(),r(null),C("")},type:"button",children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,o.jsx)(c,{isOpen:j,children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,o.jsx)(p,{isOpen:j,children:S.length>0?S.map((e,t)=>(0,o.jsxs)(u,{isSelected:e.value===n,isHighlighted:t===w,onClick:()=>_(e),onMouseEnter:()=>k(t),children:[(0,o.jsx)(x,{children:e.label}),e.subLabel&&(0,o.jsx)(h,{children:e.subLabel})]},e.value)):(0,o.jsx)(g,{children:y})})]})}}}]);