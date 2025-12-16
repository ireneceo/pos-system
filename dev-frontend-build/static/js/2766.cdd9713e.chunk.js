"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2766],{496:(e,i,n)=>{n.d(i,{A:()=>o});n(9950);var t=n(9610),r=n(4414);const o=e=>{let{isOpen:i,onClose:n,onConfirm:o,title:a,message:l,confirmText:s="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.yl,{variant:"secondary",onClick:n,children:d}),(0,r.jsx)(t.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:s})]});return(0,r.jsx)(t.aF,{isOpen:i,onClose:n,title:a,footer:p,children:(0,r.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,r.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,r.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:l})]})})}},2766:(e,i,n)=>{n.r(i),n.d(i,{default:()=>pe});var t=n(9950),r=n(4752),o=n(3310),a=n(8930),l=n(496),s=n(3338),d=n(4669),c=n(7492),p=n(4414);const x=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,u=r.Ay.div`
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
`,g=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,h=r.Ay.div`
  display: flex;
  gap: 12px;
`,m=r.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
`,j=r.Ay.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`,y=r.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,f=r.Ay.input`
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
`,v=r.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,F=r.Ay.button`
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
`,b=r.Ay.div`
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #635BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=r.Ay.div`
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
`,A=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,w=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.15s;
  position: relative;
  
  ${e=>e.soldOut&&"\n    opacity: 0.7;\n    \n    &::after {\n      content: 'SOLD OUT';\n      position: absolute;\n      top: 20px;\n      right: -30px;\n      background: #FF6B6B;\n      color: white;\n      padding: 4px 40px;\n      transform: rotate(45deg);\n      font-size: 12px;\n      font-weight: 600;\n    }\n  "}
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,k=r.Ay.div`
  width: 100%;
  height: 180px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`,E=r.Ay.div`
  padding: 16px;
`,B=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
`,I=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,z=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
`,S=r.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 8px 0;
  line-height: 1.4;
`,_=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 12px;
`,R=r.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
`,$=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  
  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n    \n    &:hover {\n      background: #FFE6E6;\n    }\n  ":"\n    background: white;\n    color: #6B7C93;\n    \n    &:hover {\n      background: #F6F9FC;\n      color: #635BFF;\n      border-color: #C7D2FE;\n    }\n  "}
`,M=r.Ay.div`
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
`,D=r.Ay.div`
  font-size: 48px;
  color: #635BFF;
  margin-bottom: 12px;
`,O=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
`,T=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,G=r.Ay.button`
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
`,q=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,N=r.Ay.label`
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
`,L=r.Ay.select`
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
`,P=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 36px;
`,Q=r.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 20px;
  font-size: 13px;
  color: #4338CA;
`,U=r.Ay.span`
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
`,Z=r.Ay.span`
  font-weight: 500;
`,J=r.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${e=>"required"===e.type?"background: #FEE2E2; color: #DC2626;":"background: #DCFCE7; color: #16A34A;"}
`,X=r.Ay.button`
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
`,H=r.Ay.div`
  margin-top: 24px;
`,W=r.Ay.div`
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
`,Y=r.Ay.div`
  background: #F6F9FC;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
`,K=r.Ay.div`
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
`,V=r.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,ee=r.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ie=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ne=r.Ay.button`
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
`,te=r.Ay.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #0A2540;
`,re=r.Ay.button`
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
`,oe=r.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`,ae=r.Ay.div`
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
`,le=r.Ay.span`
  font-size: 24px;
`,se=r.Ay.div`
  flex: 1;
`,de=r.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`,ce=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,pe=()=>{const{categories:e,menuItems:i,optionGroups:n,updateMenuItem:r,addMenuItem:pe,removeMenuItem:xe,toggleItemSoldOut:ue}=(0,a.b)(),[ge,he]=(0,t.useState)("all"),[me,je]=(0,t.useState)(""),[ye,fe]=(0,t.useState)(!1),[ve,Fe]=(0,t.useState)(!1),[be,Ce]=(0,t.useState)(null),[Ae,we]=(0,t.useState)(!1),[ke,Ee]=(0,t.useState)(null),[Be,Ie]=(0,t.useState)(!1),[ze,Se]=(0,t.useState)(null),[_e,Re]=(0,t.useState)(!1),[$e,Me]=(0,t.useState)([]),[,]=(0,t.useState)(0),[De,Oe]=(0,t.useState)(""),[Te,Ge]=(0,t.useState)({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0}),[qe,Ne]=(0,t.useState)([]),Le={other:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83e\uded7","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\uded8","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83e\uded0","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\uded2","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udedb","\ud83e\udd54","\ud83e\udeda","\ud83c\udf44","\ud83c\udf7d\ufe0f","\ud83e\udd44","\ud83c\udf74","\ud83e\udd62","\ud83c\udf71","\ud83e\udd61","\ud83d\udd2a","\ud83e\uddc2","\ud83e\uded5"]},Pe=(()=>{let n="all"===ge?i:i.filter(e=>e.category===ge);if(me.trim()){const i=me.toLowerCase().trim();n=n.filter(n=>{var t;return n.name.toLowerCase().includes(i)||n.description&&n.description.toLowerCase().includes(i)||n.price.toString().includes(i)||(null===(t=e.find(e=>e.id===n.category))||void 0===t?void 0:t.name.toLowerCase().includes(i))})}return n})(),Qe=()=>{Ge({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0}),Ne([]),Me([]),fe(!0)},Ue=(e,i)=>{Me($e.map(n=>{if(n.menuItemId===e){const e=Math.max(1,n.quantity+i);return{...n,quantity:e}}return n}))};return(0,p.jsx)(o.A,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Menu"}),(0,p.jsxs)(h,{children:[(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>{Ge({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!0,set_items:[],set_display_order:0}),Ne([]),Me([]),Re(!0)},children:"Create Set Menu"}),(0,p.jsx)(c.$n,{variant:"primary",onClick:Qe,children:"Add New Item"})]})]}),(0,p.jsxs)(m,{children:[(0,p.jsx)(j,{children:(0,p.jsxs)(y,{children:[(0,p.jsx)(v,{children:"\ud83d\udd0d"}),(0,p.jsx)(f,{type:"text",placeholder:"Search menu items by name, description, price, or category...",value:me,onChange:e=>je(e.target.value)}),me&&(0,p.jsx)(F,{onClick:()=>je(""),title:"Clear search",children:"\xd7"})]})}),me&&Pe.length>0&&(0,p.jsxs)(b,{children:[(0,p.jsxs)("span",{children:["Found ",Pe.length," item",1!==Pe.length?"s":"",' matching "',me,'"']}),(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>je(""),children:"Clear Search"})]}),(0,p.jsxs)(c.j,{children:[(0,p.jsxs)(c.oz,{active:"all"===ge,onClick:()=>{he("all"),je("")},children:["All Items (",i.length,")"]}),e.map(e=>(0,p.jsxs)(c.oz,{active:ge===e.id,onClick:()=>{he(e.id),je("")},children:[e.emoji," ",e.name]},e.id))]}),me&&0===Pe.length?(0,p.jsxs)(C,{children:[(0,p.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,p.jsxs)("div",{className:"title",children:['No results for "',me,'"']}),(0,p.jsx)("div",{className:"message",children:"Try searching with different keywords or check the spelling"})]}):(0,p.jsxs)(A,{children:[Pe.map(t=>{var r;return(0,p.jsxs)(w,{soldOut:t.soldOut,children:[(0,p.jsxs)(k,{children:[t.is_set_menu&&(0,p.jsx)(W,{children:"SET"}),t.image&&""!==t.image.trim()?(0,p.jsx)("img",{src:t.image,alt:t.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none",e.currentTarget.parentElement&&(e.currentTarget.parentElement.innerHTML=t.emoji||"\ud83c\udf7d\ufe0f",e.currentTarget.parentElement.style.fontSize="48px",e.currentTarget.parentElement.style.display="flex",e.currentTarget.parentElement.style.alignItems="center",e.currentTarget.parentElement.style.justifyContent="center")}}):(0,p.jsx)("span",{style:{fontSize:"48px"},children:t.emoji||"\ud83c\udf7d\ufe0f"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:null===(r=e.find(e=>e.id===t.category))||void 0===r?void 0:r.name}),(0,p.jsxs)(B,{children:[(0,p.jsxs)(I,{children:[t.code?`${t.code} `:"",t.name]}),(0,p.jsxs)(z,{children:["RM ",t.price.toFixed(2)]})]}),(0,p.jsx)(S,{children:t.description||"No description available"}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,p.jsxs)(S,{style:{fontSize:"11px",color:"#667eea",fontWeight:500},children:["Set includes: ",t.set_items.map(e=>{const n=i.find(i=>i.id===e.menuItemId.toString()),t=null===n||void 0===n?void 0:n.code;return`${t?`${t} `:""}${e.name} x${e.quantity}`}).join(", ")]}),t.optionGroups&&t.optionGroups.length>0&&(0,p.jsxs)(S,{style:{fontSize:"11px",color:"#8898AA"},children:["Option Groups: ",t.optionGroups.map(e=>{var i;return null===(i=n.find(i=>i.id===e))||void 0===i?void 0:i.name}).filter(Boolean).join(", ")]}),(0,p.jsxs)(R,{children:[(0,p.jsx)($,{onClick:()=>(e=>{Ce(e),Ge({...e,emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image||"",optionGroups:e.optionGroups||[],is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:e.set_display_order||0}),Ne(e.optionGroups||[]),Me(e.set_items||[]),e.is_set_menu?Re(!0):Fe(!0)})(t),children:"Edit"}),(0,p.jsx)($,{onClick:()=>(e=>{Se(e),Ie(!0)})(t),children:"Price"}),(0,p.jsx)($,{onClick:()=>ue(t.id),children:t.soldOut?"In Stock":"Sold Out"}),(0,p.jsx)($,{danger:!0,onClick:()=>{return e=t.id,Ee(e),void we(!0);var e},children:"Delete"})]})]})]},t.id)}),(0,p.jsxs)(M,{onClick:Qe,children:[(0,p.jsx)(D,{children:"+"}),(0,p.jsx)(O,{children:"Add New Menu Item"})]})]})]}),(0,p.jsxs)(c.aF,{isOpen:ye,onClose:()=>fe(!1),title:"Add New Menu Item",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,p.jsx)(c.$n,{variant:"primary",onClick:()=>{const e={id:`item-${Date.now()}`,code:Te.code||"",name:Te.name||"",price:Te.price||0,category:Te.category||"korean",emoji:Te.emoji||"\ud83c\udf7d\ufe0f",description:Te.description,image:Te.image,optionGroups:qe,soldOut:!1,is_set_menu:!1,set_items:[],set_display_order:0};pe(e),fe(!1)},children:"Add Item"})]}),children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Item Code"}),(0,p.jsx)(c.ZQ,{type:"text",value:Te.code||"",onChange:e=>Ge({...Te,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Item Name *"}),(0,p.jsx)(c.ZQ,{type:"text",value:Te.name,onChange:e=>Ge({...Te,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Price (RM) *"}),(0,p.jsx)(c.ZQ,{type:"number",value:Te.price,onChange:e=>Ge({...Te,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Category *"}),(0,p.jsx)(c.FX,{value:Te.category,onChange:e=>Ge({...Te,category:e.target.value}),children:e.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Emoji Icon"}),(0,p.jsx)(T,{children:Le.other.map(e=>(0,p.jsx)(G,{selected:Te.emoji===e,onClick:()=>Ge({...Te,emoji:e}),children:e},e))})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Description"}),(0,p.jsx)(c.Lz,{value:Te.description,onChange:e=>Ge({...Te,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,p.jsx)(d.A,{value:Te.image||"",onChange:e=>Ge({...Te,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,p.jsx)(H,{children:(0,p.jsxs)(c.gE,{children:[(0,p.jsxs)(c.lR,{children:["Option Groups ",qe.length>0&&`(${qe.length} selected)`]}),(0,p.jsxs)(L,{value:"",onChange:e=>{e.target.value&&!qe.includes(e.target.value)&&Ne([...qe,e.target.value])},children:[(0,p.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!qe.includes(e.id)).map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,p.jsx)(P,{children:qe.map((e,i)=>{const t=n.find(i=>i.id===e);return t?(0,p.jsxs)(Q,{children:[(0,p.jsx)(U,{children:i+1}),(0,p.jsx)(Z,{children:t.name}),(0,p.jsx)(J,{type:t.required?"required":"optional",children:t.required?"Required":"Optional"}),(0,p.jsx)(X,{onClick:()=>Ne(qe.filter(i=>i!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,p.jsxs)(c.aF,{isOpen:ve,onClose:()=>Fe(!1),title:"Edit Menu Item",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,p.jsx)(c.$n,{variant:"primary",onClick:()=>{if(be){const e={...be,...Te,optionGroups:qe};r(e),Fe(!1),Ce(null)}},children:"Save Changes"})]}),children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Item Code"}),(0,p.jsx)(c.ZQ,{type:"text",value:Te.code||"",onChange:e=>Ge({...Te,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Item Name *"}),(0,p.jsx)(c.ZQ,{type:"text",value:Te.name,onChange:e=>Ge({...Te,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Price (RM) *"}),(0,p.jsx)(c.ZQ,{type:"number",value:Te.price,onChange:e=>Ge({...Te,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Category *"}),(0,p.jsx)(c.FX,{value:Te.category,onChange:e=>Ge({...Te,category:e.target.value}),children:e.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Emoji Icon"}),(0,p.jsx)(T,{children:Le.other.map(e=>(0,p.jsx)(G,{selected:Te.emoji===e,onClick:()=>Ge({...Te,emoji:e}),children:e},e))})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Description"}),(0,p.jsx)(c.Lz,{value:Te.description,onChange:e=>Ge({...Te,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,p.jsx)(d.A,{value:Te.image||"",onChange:e=>Ge({...Te,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,p.jsx)(H,{children:(0,p.jsxs)(c.gE,{children:[(0,p.jsxs)(c.lR,{children:["Option Groups ",qe.length>0&&`(${qe.length} selected)`]}),(0,p.jsxs)(L,{value:"",onChange:e=>{e.target.value&&!qe.includes(e.target.value)&&Ne([...qe,e.target.value])},children:[(0,p.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!qe.includes(e.id)).map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,p.jsx)(P,{children:qe.map((e,i)=>{const t=n.find(i=>i.id===e);return t?(0,p.jsxs)(Q,{children:[(0,p.jsx)(U,{children:i+1}),(0,p.jsx)(Z,{children:t.name}),(0,p.jsx)(J,{type:t.required?"required":"optional",children:t.required?"Required":"Optional"}),(0,p.jsx)(X,{onClick:()=>Ne(qe.filter(i=>i!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,p.jsxs)(c.aF,{isOpen:_e,onClose:()=>{Re(!1),Ce(null),Me([])},title:be?"Edit Set Menu":"Create Set Menu",size:"large",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.$n,{variant:"secondary",onClick:()=>{Re(!1),Ce(null),Me([])},children:"Cancel"}),(0,p.jsx)(c.$n,{variant:"primary",onClick:()=>{if(0===$e.length)return void alert("Set menu must contain at least one menu item.");const e={id:(null===be||void 0===be?void 0:be.id)||`item-${Date.now()}`,code:Te.code||"",name:Te.name||"",price:Te.price||0,category:Te.category||"korean",emoji:Te.emoji||"\ud83c\udf7d\ufe0f",description:Te.description,image:Te.image,optionGroups:qe,soldOut:!1,is_set_menu:!0,set_items:$e,set_display_order:Te.set_display_order||0};be?r(e):pe(e),Re(!1),Ce(null),Me([])},children:be?"Save Changes":"Create Set Menu"})]}),children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Item Code"}),(0,p.jsx)(c.ZQ,{type:"text",value:Te.code||"",onChange:e=>Ge({...Te,code:e.target.value}),placeholder:"e.g., S01, S02 (optional)"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Set Menu Name *"}),(0,p.jsx)(c.ZQ,{type:"text",value:Te.name,onChange:e=>Ge({...Te,name:e.target.value}),placeholder:"e.g., Family Set, Lunch Combo"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Set Price (RM) *"}),(0,p.jsx)(c.ZQ,{type:"number",value:Te.price,onChange:e=>Ge({...Te,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Category *"}),(0,p.jsx)(c.FX,{value:Te.category,onChange:e=>Ge({...Te,category:e.target.value}),children:e.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Emoji Icon"}),(0,p.jsx)(T,{children:Le.other.map(e=>(0,p.jsx)(G,{selected:Te.emoji===e,onClick:()=>Ge({...Te,emoji:e}),children:e},e))})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Description"}),(0,p.jsx)(c.Lz,{value:Te.description,onChange:e=>Ge({...Te,description:e.target.value}),placeholder:"Brief description of this set menu..."})]}),(0,p.jsx)(d.A,{value:Te.image||"",onChange:e=>Ge({...Te,image:e}),label:"Set Menu Image"}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Display Order (for sorting set menus)"}),(0,p.jsx)(c.ZQ,{type:"number",value:Te.set_display_order||0,onChange:e=>Ge({...Te,set_display_order:parseInt(e.target.value)||0}),min:"0"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Set Menu Items * (at least 1 item required)"}),$e.length>0&&(0,p.jsx)(Y,{children:$e.map(e=>{const n=i.find(i=>parseInt(i.id)===e.menuItemId),t=null===n||void 0===n?void 0:n.code;return(0,p.jsxs)(K,{children:[(0,p.jsx)(V,{children:(0,p.jsxs)(ee,{children:[t?`${t} `:"",e.name]})}),(0,p.jsxs)(ie,{children:[(0,p.jsx)(ne,{onClick:()=>Ue(e.menuItemId,-1),disabled:e.quantity<=1,children:"\u2212"}),(0,p.jsx)(te,{children:e.quantity}),(0,p.jsx)(ne,{onClick:()=>Ue(e.menuItemId,1),children:"+"})]}),(0,p.jsx)(re,{onClick:()=>{return i=e.menuItemId,void Me($e.filter(e=>e.menuItemId!==i));var i},children:"Remove"})]},e.menuItemId)})}),(0,p.jsxs)("div",{style:{marginTop:"12px"},children:[(0,p.jsx)(c.lR,{children:"Available Menu Items (select items to add to set)"}),(0,p.jsx)(c.ZQ,{type:"text",value:De,onChange:e=>Oe(e.target.value),placeholder:"Search by code or name...",style:{marginBottom:"12px"}}),(0,p.jsx)(oe,{children:i.filter(e=>!e.is_set_menu).filter(e=>{var i;if(!De)return!0;const n=De.toLowerCase(),t=null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(n),r=e.name.toLowerCase().includes(n);return t||r}).map(n=>{var t;return(0,p.jsxs)(ae,{selected:$e.some(e=>e.menuItemId===parseInt(n.id)),onClick:()=>(e=>{const n=i.find(i=>i.id===e.toString());if(!n||n.is_set_menu)return;const t=$e.find(i=>i.menuItemId===e);Me(t?$e.map(i=>i.menuItemId===e?{...i,quantity:i.quantity+1}:i):[...$e,{menuItemId:e,name:n.name,quantity:1}])})(parseInt(n.id)),children:[n.image?(0,p.jsx)("img",{src:n.image,alt:n.name,loading:"lazy",style:{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",marginRight:"12px"}}):(0,p.jsx)(le,{children:n.emoji||"\ud83c\udf7d\ufe0f"}),(0,p.jsxs)(se,{children:[(0,p.jsxs)(de,{children:[n.code?`${n.code} `:"",n.name]}),(0,p.jsxs)(ce,{children:["RM ",n.price.toFixed(2)," \xb7 ",null===(t=e.find(e=>e.id===n.category))||void 0===t?void 0:t.name]})]})]},n.id)})})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Set Menu Options (options for entire set)"}),(0,p.jsx)(q,{children:n.map(e=>(0,p.jsxs)(N,{children:[(0,p.jsx)("input",{type:"checkbox",checked:qe.includes(e.id),onChange:()=>{return i=e.id,void(qe.includes(i)?Ne(qe.filter(e=>e!==i)):Ne([...qe,i]));var i}}),e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))})]})]}),(0,p.jsx)(l.A,{isOpen:Ae,onClose:()=>we(!1),onConfirm:()=>{ke&&(xe(ke),we(!1),Ee(null))},title:"Delete Menu Item",message:"Are you sure you want to delete this menu item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel",variant:"danger"}),(0,p.jsx)(s.A,{isOpen:Be,onClose:()=>Ie(!1),onConfirm:e=>{if(ze){const i=parseFloat(e);r({...ze,price:i}),Ie(!1),Se(null)}},title:"Update Price",label:`Enter new price for ${null===ze||void 0===ze?void 0:ze.name}:`,placeholder:null===ze||void 0===ze?void 0:ze.price.toString(),min:0,step:.01,suffix:" RM",confirmText:"Update Price",cancelText:"Cancel"})]})})}},3338:(e,i,n)=>{n.d(i,{A:()=>c});var t=n(9950),r=n(9610),o=n(4752),a=n(4414);const l=o.Ay.input`
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
`,s=o.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,d=o.Ay.div`
  color: #6B7C93;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,c=e=>{let{isOpen:i,onClose:n,onConfirm:o,title:c,label:p,placeholder:x="",min:u=0,max:g,step:h=1,suffix:m="",confirmText:j="Apply",cancelText:y="Cancel"}=e;const[f,v]=(0,t.useState)(""),[F,b]=(0,t.useState)(""),C=()=>{const e=parseFloat(f);!isNaN(e)&&e>=u&&(void 0===g||e<=g)&&(o(f),v(""),b(""),n())},A=()=>{v(""),b(""),n()},w=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.yl,{variant:"secondary",onClick:A,children:y}),(0,a.jsx)(r.yl,{variant:"primary",onClick:C,disabled:!f||!!F||parseFloat(f)<u,children:j})]});return(0,a.jsx)(r.aF,{isOpen:i,onClose:A,title:c,footer:w,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(r.lR,{children:p}),(0,a.jsx)(l,{type:"text",value:f,onChange:e=>{const i=e.target.value;if(""===i)return v(""),void b("");if(!/^\d*\.?\d*$/.test(i))return;const n=parseFloat(i);isNaN(n)||b(n<u?`Minimum value is ${u}${m}`:void 0!==g&&n>g?`Maximum value is ${g}${m}`:""),v(i)},placeholder:x,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!F&&f&&C()}}),F&&(0,a.jsx)(s,{children:F}),!F&&void 0!==g&&(0,a.jsxs)(d,{children:["Enter a value between ",u,m," and ",g,m]})]})})}},4669:(e,i,n)=>{n.d(i,{A:()=>y});var t=n(9950),r=n(4752),o=n(4414);const a=r.Ay.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,l=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=r.Ay.p`
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
`,x=r.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,u=r.Ay.p`
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
`,j=r.Ay.input`
  display: none;
`,y=e=>{let{value:i,onChange:n,label:r="Logo Upload",helpText:y="Upload an image for your logo",maxSize:f=2,previewSize:v=150,showRemoveButton:F=!0,changeButtonText:b="Change Image",removeButtonText:C="Remove Image",imageAltText:A="Uploaded"}=e;const[w,k]=(0,t.useState)(!1),E=(0,t.useRef)(null),B=(0,t.useRef)(null),I=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*f*1024)return void alert(`Image size should be less than ${f}MB`);const i=new FileReader;i.onload=e=>{var i;const t=new Image;t.onload=()=>{const e=document.createElement("canvas"),i=e.getContext("2d");if(!i)return;const r=800;let o=t.width,a=t.height;(o>r||a>r)&&(o>a?(a=a/o*r,o=r):(o=o/a*r,a=r)),e.width=o,e.height=a,i.drawImage(t,0,0,o,a);const l=e.toDataURL("image/jpeg",.85);n(l)},t.src=null===(i=e.target)||void 0===i?void 0:i.result},i.readAsDataURL(e)},z=e=>{const i=e.target.files;i&&i.length>0&&I(i[0])};return(0,o.jsxs)(a,{children:[r&&(0,o.jsx)(l,{children:r}),y&&(0,o.jsx)(s,{children:y}),(0,o.jsxs)(d,{children:[(0,o.jsx)(c,{ref:B,isDragging:w,hasImage:!!i,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),k(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&k(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),k(!1);const i=e.dataTransfer.files;i&&i.length>0&&I(i[0])},onClick:()=>{var e;i||(null===(e=E.current)||void 0===e||e.click())},children:i?(0,o.jsx)("img",{src:i,alt:A}):(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:w?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(u,{children:["PNG, JPG, GIF up to ",f,"MB"]})]})}),i&&(0,o.jsxs)(g,{children:[(0,o.jsxs)(h,{children:[b,(0,o.jsx)("input",{ref:E,type:"file",accept:"image/*",onChange:z})]}),F&&(0,o.jsx)(m,{onClick:()=>{n("")},children:C})]})]}),!i&&(0,o.jsx)(j,{ref:E,type:"file",accept:"image/*",onChange:z})]})}}}]);