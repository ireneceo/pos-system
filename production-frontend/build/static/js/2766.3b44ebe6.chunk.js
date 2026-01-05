"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2766],{496:(e,n,t)=>{t.d(n,{A:()=>o});t(9950);var i=t(9610),r=t(4414);const o=e=>{let{isOpen:n,onClose:t,onConfirm:o,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.yl,{variant:"secondary",onClick:t,children:d}),(0,r.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:l})]});return(0,r.jsx)(i.aF,{isOpen:n,onClose:t,title:a,footer:p,children:(0,r.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,r.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,r.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2766:(e,n,t)=>{t.r(n),t.d(n,{default:()=>me});var i=t(9950),r=t(4492),o=t(4752),a=t(3310),s=t(8930),l=t(496),d=t(3338),c=t(4669),p=t(7492),u=t(9194),x=t(4021),g=t(6038),h=t(4414);const m=o.Ay.div`
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
`,j=o.Ay.div`
  display: flex;
  gap: 12px;
`,y=o.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
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
`,A=o.Ay.div`
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

  ${e=>e.soldOut&&"\n    opacity: 0.7;\n\n    &::after {\n      content: 'SOLD OUT';\n      position: absolute;\n      top: 20px;\n      right: -30px;\n      background: #FF6B6B;\n      color: white;\n      padding: 4px 40px;\n      transform: rotate(45deg);\n      font-size: 12px;\n      font-weight: 600;\n    }\n  "}

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
`,D=o.Ay.span`
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
`,L=o.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  margin-top: auto;
`,T=o.Ay.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  
  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n    \n    &:hover {\n      background: #FFE6E6;\n    }\n  ":"\n    background: white;\n    color: #6B7C93;\n    \n    &:hover {\n      background: #F6F9FC;\n      color: #635BFF;\n      border-color: #C7D2FE;\n    }\n  "}
`,G=o.Ay.div`
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
`,N=o.Ay.div`
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
`,Z=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,Q=o.Ay.label`
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
`,H=o.Ay.select`
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
`,W=o.Ay.div`
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
`,X=o.Ay.span`
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
`,K=o.Ay.span`
  font-weight: 500;
`,Y=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${e=>"required"===e.type?"background: #FEE2E2; color: #DC2626;":"background: #DCFCE7; color: #16A34A;"}
`,V=o.Ay.button`
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
`,te=o.Ay.div`
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
`,ge=o.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`,he=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,me=()=>{const{categories:e,menuItems:n,optionGroups:t,updateMenuItem:o,addMenuItem:me,removeMenuItem:fe,toggleItemSoldOut:ve}=(0,s.b)(),je=(0,r.Zp)(),[ye,be]=(0,i.useState)("all"),[Fe,Ce]=(0,i.useState)(""),[Ae,we]=(0,i.useState)(!1),[ke,Ee]=(0,i.useState)(!1),[Be,Se]=(0,i.useState)(null),[_e,Ie]=(0,i.useState)(!1),[ze,Re]=(0,i.useState)(null),[$e,Me]=(0,i.useState)(!1),[De,Oe]=(0,i.useState)(null),{defaultCurrency:Le}=(0,x.i1)(),[Te,Ge]=(0,i.useState)("RM");(0,i.useEffect)(()=>{Le&&Ge(Le)},[Le]);const[qe,Ne]=(0,i.useState)([]),[Pe,Ue]=(0,i.useState)(!1),[Ze,Qe]=(0,i.useState)([]),[,]=(0,i.useState)(0),[He,We]=(0,i.useState)(""),[Je,Xe]=(0,i.useState)(40),Ke=(0,i.useRef)(null),[Ye,Ve]=(0,i.useState)({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null});i.useEffect(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let i=null;if(t>=0&&(i=n[t+1]),!i)return void console.error("No restaurantId found in URL");const[r,o]=await Promise.all([fetch(`/api/restaurants/${i}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),fetch(`/api/restaurants/${i}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}})]);let a=[];if(r.ok){const e=await r.json();e.success&&(a=[...a,...e.data||[]])}if(o.ok){const e=await o.json();e.success&&(a=[...a,...e.data||[]])}Ne(a)}catch(e){console.error("Failed to fetch recipes:",e)}})()},[]);const[en,nn]=(0,i.useState)([]),tn={other:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83e\uded7","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\uded8","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83e\uded0","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\uded2","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udedb","\ud83e\udd54","\ud83e\udeda","\ud83c\udf44","\ud83c\udf7d\ufe0f","\ud83e\udd44","\ud83c\udf74","\ud83e\udd62","\ud83c\udf71","\ud83e\udd61","\ud83d\udd2a","\ud83e\uddc2","\ud83e\uded5"]},rn=(()=>{let t="all"===ye?n:n.filter(e=>e.category===ye);if(Fe.trim()){const n=Fe.toLowerCase().trim();t=t.filter(t=>{var i;return t.name.toLowerCase().includes(n)||t.description&&t.description.toLowerCase().includes(n)||t.price.toString().includes(n)||(null===(i=e.find(e=>e.id===t.category))||void 0===i?void 0:i.name.toLowerCase().includes(n))})}return t})(),on=rn.length>50;(0,i.useEffect)(()=>{Xe(40)},[ye,Fe]),(0,i.useEffect)(()=>{if(!on)return;const e=Ke.current;if(!e)return;const n=new IntersectionObserver(e=>{e[0].isIntersecting&&Xe(e=>e+30)},{threshold:.1,rootMargin:"100px"});return n.observe(e),()=>n.disconnect()},[on,Je,rn.length]);const an=()=>{Ve({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null}),nn([]),Qe([]),we(!0)},sn=(e,n)=>{Qe(Ze.map(t=>{if(t.menuItemId===e){const e=Math.max(1,t.quantity+n);return{...t,quantity:e}}return t}))};return(0,h.jsx)(a.A,{children:(0,h.jsxs)(m,{children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(v,{children:"Menu"}),(0,h.jsxs)(j,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>{Ve({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!0,set_items:[],set_display_order:0,recipe_id:null}),nn([]),Qe([]),Ue(!0)},children:"Create Set Menu"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:an,children:"Add New Item"})]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(b,{children:(0,h.jsxs)(F,{children:[(0,h.jsx)(A,{children:"\ud83d\udd0d"}),(0,h.jsx)(C,{type:"text",placeholder:"Search menu items by name, description, price, or category...",value:Fe,onChange:e=>Ce(e.target.value)}),Fe&&(0,h.jsx)(w,{onClick:()=>Ce(""),title:"Clear search",children:"\xd7"})]})}),Fe&&rn.length>0&&(0,h.jsxs)(k,{children:[(0,h.jsxs)("span",{children:["Found ",rn.length," item",1!==rn.length?"s":"",' matching "',Fe,'"']}),(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>Ce(""),children:"Clear Search"})]}),(0,h.jsxs)(p.j,{children:[(0,h.jsxs)(p.oz,{active:"all"===ye,onClick:()=>{be("all"),Ce("")},children:["All Items (",n.length,")"]}),e.map(e=>(0,h.jsxs)(p.oz,{active:ye===e.id,onClick:()=>{be(e.id),Ce("")},children:[e.emoji," ",e.name]},e.id))]}),Fe&&0===rn.length?(0,h.jsxs)(E,{children:[(0,h.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,h.jsxs)("div",{className:"title",children:['No results for "',Fe,'"']}),(0,h.jsx)("div",{className:"message",children:"Try searching with different keywords or check the spelling"})]}):(0,h.jsxs)(B,{children:[(on?rn.slice(0,Je):rn).map(i=>{var r;return(0,h.jsxs)(S,{soldOut:i.soldOut,children:[(0,h.jsxs)(_,{children:[i.is_set_menu&&(0,h.jsx)(ne,{children:"SET"}),i.image&&""!==i.image.trim()?(0,h.jsx)("img",{src:i.image,alt:i.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none",e.currentTarget.parentElement&&(e.currentTarget.parentElement.innerHTML=i.emoji||"\ud83c\udf7d\ufe0f",e.currentTarget.parentElement.style.fontSize="48px",e.currentTarget.parentElement.style.display="flex",e.currentTarget.parentElement.style.alignItems="center",e.currentTarget.parentElement.style.justifyContent="center")}}):(0,h.jsx)("span",{style:{fontSize:"48px"},children:i.emoji||"\ud83c\udf7d\ufe0f"})]}),(0,h.jsxs)(I,{children:[(0,h.jsx)(O,{children:null===(r=e.find(e=>e.id===i.category))||void 0===r?void 0:r.name}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(R,{children:[i.code?`${i.code} `:"",i.name]}),(0,h.jsx)($,{children:(0,g.vv)(i.price,Te)})]}),(0,h.jsx)(M,{children:i.description||"No description available"}),i.is_set_menu&&i.set_items&&i.set_items.length>0&&(0,h.jsxs)(M,{style:{fontSize:"11px",color:"#667eea",fontWeight:500},children:["Set includes: ",i.set_items.map(e=>{const t=n.find(n=>n.id===e.menuItemId.toString()),i=null===t||void 0===t?void 0:t.code;return`${i?`${i} `:""}${e.name} x${e.quantity}`}).join(", ")]}),i.optionGroups&&i.optionGroups.length>0&&(0,h.jsxs)(M,{style:{fontSize:"11px",color:"#8898AA"},children:["Option Groups: ",i.optionGroups.map(e=>{var n;return null===(n=t.find(n=>n.id===e))||void 0===n?void 0:n.name}).filter(Boolean).join(", ")]}),i.recipe_id&&(()=>{const e=qe.find(e=>e.id===i.recipe_id);return e?(0,h.jsxs)(D,{onClick:n=>{n.stopPropagation();const t=window.location.pathname.split("/"),i=t.indexOf("restaurant"),r=i>=0?t[i+1]:"";je(`/restaurant/${r}/recipe-management?search=${encodeURIComponent(e.name)}`)},children:["Recipe: ",e.name]}):null})(),(0,h.jsxs)(L,{children:[(0,h.jsx)(T,{onClick:()=>(e=>{Se(e),Ve({...e,emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image||"",optionGroups:e.optionGroups||[],is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}),nn(e.optionGroups||[]),Qe(e.set_items||[]),e.is_set_menu?Ue(!0):Ee(!0)})(i),children:"Edit"}),(0,h.jsx)(T,{onClick:()=>(e=>{Oe(e),Me(!0)})(i),children:"Price"}),(0,h.jsx)(T,{onClick:()=>ve(i.id),children:i.soldOut?"In Stock":"Sold Out"}),(0,h.jsx)(T,{danger:!0,onClick:()=>{return e=i.id,Re(e),void Ie(!0);var e},children:"Delete"})]})]})]},i.id)}),(0,h.jsxs)(G,{onClick:an,children:[(0,h.jsx)(q,{children:"+"}),(0,h.jsx)(N,{children:"Add New Menu Item"})]}),on&&Je<rn.length&&(0,h.jsx)("div",{ref:Ke,style:{gridColumn:"1 / -1",height:"20px"}})]})]}),(0,h.jsxs)(p.aF,{isOpen:Ae,onClose:()=>we(!1),title:"Add New Menu Item",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:()=>{const e={id:`item-${Date.now()}`,code:Ye.code||"",name:Ye.name||"",price:Ye.price||0,category:Ye.category||"korean",emoji:Ye.emoji||"\ud83c\udf7d\ufe0f",description:Ye.description,image:Ye.image,optionGroups:en,soldOut:!1,is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:Ye.recipe_id||null};me(e),we(!1)},children:"Add Item"})]}),children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Code"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ye.code||"",onChange:e=>Ve({...Ye,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ye.name,onChange:e=>Ve({...Ye,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Price (RM) *"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ye.price,onChange:e=>Ve({...Ye,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category *"}),(0,h.jsx)(p.FX,{value:Ye.category,onChange:e=>Ve({...Ye,category:e.target.value}),children:e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji Icon"}),(0,h.jsx)(P,{children:tn.other.map(e=>(0,h.jsx)(U,{selected:Ye.emoji===e,onClick:()=>Ve({...Ye,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:Ye.description,onChange:e=>Ve({...Ye,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,h.jsx)(c.A,{value:Ye.image||"",onChange:e=>Ve({...Ye,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,h.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,h.jsx)(p.lR,{children:"Linked Recipe"}),(0,h.jsx)(u.A,{options:qe.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ye.recipe_id||null,onChange:e=>Ve({...Ye,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,h.jsx)(ee,{children:(0,h.jsxs)(p.gE,{children:[(0,h.jsxs)(p.lR,{children:["Option Groups ",en.length>0&&`(${en.length} selected)`]}),(0,h.jsxs)(H,{value:"",onChange:e=>{e.target.value&&!en.includes(e.target.value)&&nn([...en,e.target.value])},children:[(0,h.jsx)("option",{value:"",children:"Select option group to add..."}),t.filter(e=>!en.includes(e.id)).map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,h.jsx)(W,{children:en.map((e,n)=>{const i=t.find(n=>n.id===e);return i?(0,h.jsxs)(J,{children:[(0,h.jsx)(X,{children:n+1}),(0,h.jsx)(K,{children:i.name}),(0,h.jsx)(Y,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,h.jsx)(V,{onClick:()=>nn(en.filter(n=>n!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,h.jsxs)(p.aF,{isOpen:ke,onClose:()=>Ee(!1),title:"Edit Menu Item",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>Ee(!1),children:"Cancel"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:()=>{if(Be){const e={...Be,...Ye,optionGroups:en};o(e),Ee(!1),Se(null)}},children:"Save Changes"})]}),children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Code"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ye.code||"",onChange:e=>Ve({...Ye,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ye.name,onChange:e=>Ve({...Ye,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Price (RM) *"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ye.price,onChange:e=>Ve({...Ye,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category *"}),(0,h.jsx)(p.FX,{value:Ye.category,onChange:e=>Ve({...Ye,category:e.target.value}),children:e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji Icon"}),(0,h.jsx)(P,{children:tn.other.map(e=>(0,h.jsx)(U,{selected:Ye.emoji===e,onClick:()=>Ve({...Ye,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:Ye.description,onChange:e=>Ve({...Ye,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,h.jsx)(c.A,{value:Ye.image||"",onChange:e=>Ve({...Ye,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,h.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,h.jsx)(p.lR,{children:"Linked Recipe"}),(0,h.jsx)(u.A,{options:qe.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ye.recipe_id||null,onChange:e=>Ve({...Ye,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,h.jsx)(ee,{children:(0,h.jsxs)(p.gE,{children:[(0,h.jsxs)(p.lR,{children:["Option Groups ",en.length>0&&`(${en.length} selected)`]}),(0,h.jsxs)(H,{value:"",onChange:e=>{e.target.value&&!en.includes(e.target.value)&&nn([...en,e.target.value])},children:[(0,h.jsx)("option",{value:"",children:"Select option group to add..."}),t.filter(e=>!en.includes(e.id)).map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,h.jsx)(W,{children:en.map((e,n)=>{const i=t.find(n=>n.id===e);return i?(0,h.jsxs)(J,{children:[(0,h.jsx)(X,{children:n+1}),(0,h.jsx)(K,{children:i.name}),(0,h.jsx)(Y,{type:i.required?"required":"optional",children:i.required?"Required":"Optional"}),(0,h.jsx)(V,{onClick:()=>nn(en.filter(n=>n!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,h.jsxs)(p.aF,{isOpen:Pe,onClose:()=>{Ue(!1),Se(null),Qe([])},title:Be?"Edit Set Menu":"Create Set Menu",size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.$n,{variant:"secondary",onClick:()=>{Ue(!1),Se(null),Qe([])},children:"Cancel"}),(0,h.jsx)(p.$n,{variant:"primary",onClick:()=>{if(0===Ze.length)return void alert("Set menu must contain at least one menu item.");const e={id:(null===Be||void 0===Be?void 0:Be.id)||`item-${Date.now()}`,code:Ye.code||"",name:Ye.name||"",price:Ye.price||0,category:Ye.category||"korean",emoji:Ye.emoji||"\ud83c\udf7d\ufe0f",description:Ye.description,image:Ye.image,optionGroups:en,soldOut:!1,is_set_menu:!0,set_items:Ze,set_display_order:Ye.set_display_order||0};Be?o(e):me(e),Ue(!1),Se(null),Qe([])},children:Be?"Save Changes":"Create Set Menu"})]}),children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Item Code"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ye.code||"",onChange:e=>Ve({...Ye,code:e.target.value}),placeholder:"e.g., S01, S02 (optional)"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Menu Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:Ye.name,onChange:e=>Ve({...Ye,name:e.target.value}),placeholder:"e.g., Family Set, Lunch Combo"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Price (RM) *"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ye.price,onChange:e=>Ve({...Ye,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category *"}),(0,h.jsx)(p.FX,{value:Ye.category,onChange:e=>Ve({...Ye,category:e.target.value}),children:e.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji Icon"}),(0,h.jsx)(P,{children:tn.other.map(e=>(0,h.jsx)(U,{selected:Ye.emoji===e,onClick:()=>Ve({...Ye,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:Ye.description,onChange:e=>Ve({...Ye,description:e.target.value}),placeholder:"Brief description of this set menu..."})]}),(0,h.jsx)(c.A,{value:Ye.image||"",onChange:e=>Ve({...Ye,image:e}),label:"Set Menu Image"}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Display Order (for sorting set menus)"}),(0,h.jsx)(p.ZQ,{type:"number",value:Ye.set_display_order||0,onChange:e=>Ve({...Ye,set_display_order:parseInt(e.target.value)||0}),min:"0"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Menu Items * (at least 1 item required)"}),Ze.length>0&&(0,h.jsx)(te,{children:Ze.map(e=>{const t=n.find(n=>parseInt(n.id)===e.menuItemId),i=null===t||void 0===t?void 0:t.code;return(0,h.jsxs)(ie,{children:[(0,h.jsx)(re,{children:(0,h.jsxs)(oe,{children:[i?`${i} `:"",e.name]})}),(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{onClick:()=>sn(e.menuItemId,-1),disabled:e.quantity<=1,children:"\u2212"}),(0,h.jsx)(le,{children:e.quantity}),(0,h.jsx)(se,{onClick:()=>sn(e.menuItemId,1),children:"+"})]}),(0,h.jsx)(de,{onClick:()=>{return n=e.menuItemId,void Qe(Ze.filter(e=>e.menuItemId!==n));var n},children:"Remove"})]},e.menuItemId)})}),(0,h.jsxs)("div",{style:{marginTop:"12px"},children:[(0,h.jsx)(p.lR,{children:"Available Menu Items (select items to add to set)"}),(0,h.jsx)(p.ZQ,{type:"text",value:He,onChange:e=>We(e.target.value),placeholder:"Search by code or name...",style:{marginBottom:"12px"}}),(0,h.jsx)(ce,{children:n.filter(e=>!e.is_set_menu).filter(e=>{var n;if(!He)return!0;const t=He.toLowerCase(),i=null===(n=e.code)||void 0===n?void 0:n.toLowerCase().includes(t),r=e.name.toLowerCase().includes(t);return i||r}).map(t=>{var i;return(0,h.jsxs)(pe,{selected:Ze.some(e=>e.menuItemId===parseInt(t.id)),onClick:()=>(e=>{const t=n.find(n=>n.id===e.toString());if(!t||t.is_set_menu)return;const i=Ze.find(n=>n.menuItemId===e);Qe(i?Ze.map(n=>n.menuItemId===e?{...n,quantity:n.quantity+1}:n):[...Ze,{menuItemId:e,name:t.name,quantity:1}])})(parseInt(t.id)),children:[t.image?(0,h.jsx)("img",{src:t.image,alt:t.name,loading:"lazy",style:{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",marginRight:"12px"}}):(0,h.jsx)(ue,{children:t.emoji||"\ud83c\udf7d\ufe0f"}),(0,h.jsxs)(xe,{children:[(0,h.jsxs)(ge,{children:[t.code?`${t.code} `:"",t.name]}),(0,h.jsxs)(he,{children:[(0,g.vv)(t.price,Te)," \xb7 ",null===(i=e.find(e=>e.id===t.category))||void 0===i?void 0:i.name]})]})]},t.id)})})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Menu Options (options for entire set)"}),(0,h.jsx)(Z,{children:t.map(e=>(0,h.jsxs)(Q,{children:[(0,h.jsx)("input",{type:"checkbox",checked:en.includes(e.id),onChange:()=>{return n=e.id,void(en.includes(n)?nn(en.filter(e=>e!==n)):nn([...en,n]));var n}}),e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))})]})]}),(0,h.jsx)(l.A,{isOpen:_e,onClose:()=>Ie(!1),onConfirm:()=>{ze&&(fe(ze),Ie(!1),Re(null))},title:"Delete Menu Item",message:"Are you sure you want to delete this menu item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel",variant:"danger"}),(0,h.jsx)(d.A,{isOpen:$e,onClose:()=>Me(!1),onConfirm:e=>{if(De){const n=parseFloat(e);o({...De,price:n}),Me(!1),Oe(null)}},title:"Update Price",label:`Enter new price for ${null===De||void 0===De?void 0:De.name}:`,placeholder:null===De||void 0===De?void 0:De.price.toString(),min:0,step:.01,suffix:" RM",confirmText:"Update Price",cancelText:"Cancel"})]})})}},3338:(e,n,t)=>{t.d(n,{A:()=>c});var i=t(9950),r=t(9610),o=t(4752),a=t(4414);const s=o.Ay.input`
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
`,c=e=>{let{isOpen:n,onClose:t,onConfirm:o,title:c,label:p,placeholder:u="",min:x=0,max:g,step:h=1,suffix:m="",confirmText:f="Apply",cancelText:v="Cancel"}=e;const[j,y]=(0,i.useState)(""),[b,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(j);!isNaN(e)&&e>=x&&(void 0===g||e<=g)&&(o(j),y(""),F(""),t())},A=()=>{y(""),F(""),t()},w=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.yl,{variant:"secondary",onClick:A,children:v}),(0,a.jsx)(r.yl,{variant:"primary",onClick:C,disabled:!j||!!b||parseFloat(j)<x,children:f})]});return(0,a.jsx)(r.aF,{isOpen:n,onClose:A,title:c,footer:w,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(r.lR,{children:p}),(0,a.jsx)(s,{type:"text",value:j,onChange:e=>{const n=e.target.value;if(""===n)return y(""),void F("");if(!/^\d*\.?\d*$/.test(n))return;const t=parseFloat(n);isNaN(t)||F(t<x?`Minimum value is ${x}${m}`:void 0!==g&&t>g?`Maximum value is ${g}${m}`:""),y(n)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!b&&j&&C()}}),b&&(0,a.jsx)(l,{children:b}),!b&&void 0!==g&&(0,a.jsxs)(d,{children:["Enter a value between ",x,m," and ",g,m]})]})})}},4021:(e,n,t)=>{t.d(n,{i1:()=>a});var i=t(9950),r=t(1367),o=t(6038);const a=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,i.useState)("RM"),[a,s]=(0,i.useState)(Object.keys(o.DL)),[l,d]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),i=n.indexOf("restaurant");let r=i>=0?n[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(i)}else t("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:a,loading:l,error:c}}},4669:(e,n,t)=>{t.d(n,{A:()=>v});var i=t(9950),r=t(4752),o=t(4414);const a=r.Ay.div`
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
`,v=e=>{let{value:n,onChange:t,label:r="Logo Upload",helpText:v="Upload an image for your logo",maxSize:j=2,previewSize:y=150,showRemoveButton:b=!0,changeButtonText:F="Change Image",removeButtonText:C="Remove Image",imageAltText:A="Uploaded"}=e;const[w,k]=(0,i.useState)(!1),E=(0,i.useRef)(null),B=(0,i.useRef)(null),S=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);const n=new FileReader;n.onload=e=>{var n;const i=new Image;i.onload=()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return;const r=800;let o=i.width,a=i.height;(o>r||a>r)&&(o>a?(a=a/o*r,o=r):(o=o/a*r,a=r)),e.width=o,e.height=a,n.drawImage(i,0,0,o,a);const s=e.toDataURL("image/jpeg",.85);t(s)},i.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},_=e=>{const n=e.target.files;n&&n.length>0&&S(n[0])};return(0,o.jsxs)(a,{children:[r&&(0,o.jsx)(s,{children:r}),v&&(0,o.jsx)(l,{children:v}),(0,o.jsxs)(d,{children:[(0,o.jsx)(c,{ref:B,isDragging:w,hasImage:!!n,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),k(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&k(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),k(!1);const n=e.dataTransfer.files;n&&n.length>0&&S(n[0])},onClick:()=>{var e;n||(null===(e=E.current)||void 0===e||e.click())},children:n?(0,o.jsx)("img",{src:n,alt:A}):(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{children:w?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(x,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),n&&(0,o.jsxs)(g,{children:[(0,o.jsxs)(h,{children:[F,(0,o.jsx)("input",{ref:E,type:"file",accept:"image/*",onChange:_})]}),b&&(0,o.jsx)(m,{onClick:()=>{t("")},children:C})]})]}),!n&&(0,o.jsx)(f,{ref:E,type:"file",accept:"image/*",onChange:_})]})}},9194:(e,n,t)=>{t.d(n,{A:()=>m});var i=t(9950),r=t(4752),o=t(4414);const a=r.Ay.div`
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
`,m=e=>{let{options:n,value:t,onChange:r,placeholder:m="Select...",disabled:f=!1,allowClear:v=!0,noOptionsMessage:j="No options found"}=e;const[y,b]=(0,i.useState)(!1),[F,C]=(0,i.useState)(""),[A,w]=(0,i.useState)(-1),k=(0,i.useRef)(null),E=(0,i.useRef)(null),B=n.find(e=>e.value===t),S=n.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,i.useEffect)(()=>{const e=e=>{k.current&&!k.current.contains(e.target)&&(b(!1),C(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,i.useEffect)(()=>{y||(C(""),w(-1))},[y]);const _=e=>{r(e.value),b(!1),C("")},I=y?F:(null===B||void 0===B?void 0:B.label)||"";return(0,o.jsxs)(a,{ref:k,children:[(0,o.jsxs)(s,{isOpen:y,disabled:f,onClick:()=>{var e;f||(b(!0),null===(e=E.current)||void 0===e||e.focus())},children:[(0,o.jsx)(l,{ref:E,type:"text",value:I,onChange:e=>{C(e.target.value),w(0),y||b(!0)},onKeyDown:e=>{if(!f)switch(e.key){case"ArrowDown":e.preventDefault(),y?w(e=>e<S.length-1?e+1:e):b(!0);break;case"ArrowUp":e.preventDefault(),w(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),y&&A>=0&&S[A]?_(S[A]):y||b(!0);break;case"Escape":b(!1),C("")}},placeholder:m,disabled:f}),v&&t&&!f&&(0,o.jsx)(d,{onClick:e=>{e.stopPropagation(),r(null),C("")},type:"button",children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,o.jsx)(c,{isOpen:y,children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,o.jsx)(p,{isOpen:y,children:S.length>0?S.map((e,n)=>(0,o.jsxs)(u,{isSelected:e.value===t,isHighlighted:n===A,onClick:()=>_(e),onMouseEnter:()=>w(n),children:[(0,o.jsx)(x,{children:e.label}),e.subLabel&&(0,o.jsx)(g,{children:e.subLabel})]},e.value)):(0,o.jsx)(h,{children:j})})]})}}}]);