(this["webpackJsonpafd-react"]=this["webpackJsonpafd-react"]||[]).push([[0],{21:function(e,t,s){},24:function(e,t,s){},26:function(e,t,s){},27:function(e,t,s){"use strict";s.r(t);var i=s(1),n=s.n(i),r=s(12),a=s.n(r),c=(s(21),s(2)),o=s(8),d=s(13),u=s.n(d),l=(s(24),s(14)),h=s(15),j=s(16),b=function(){function e(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"json";Object(h.a)(this,e),this.grammar=void 0,this.grammarType=void 0,this.name=void 0,this.states=void 0,this.alphbet=void 0,this.productions=void 0,this.initialState=void 0,this.currentState=void 0,this.terminals=void 0,this.history=void 0,this.grammar=t,this.grammarType=s;var i=JSON.parse(t),n=i.name,r=i.states,a=i.alphbet,c=i.productions,o=i.initialState,d=i.terminals;this.name=n,this.states=r,this.alphbet=a,this.productions=this._validatesProductions(c),this.initialState=o,this.currentState=o,this.terminals=d,this.history=[]}return Object(j.a)(e,[{key:"run",value:function(e){if(!e)return this.terminals.includes(this.initialState);var t=Object(l.a)(e),s=t[0],i=t.slice(1),n=this.productions[this.currentState][s];return this.history.push([this.currentState,s,n]),n?0!==i.length?(this._moveTo(n),this.run(i)):this.terminals.includes(n)?(this._moveTo(this.initialState),!0):(this._moveTo(this.initialState),!1):(this._moveTo(this.initialState),!1)}},{key:"_moveTo",value:function(e){return this.currentState=e,this.currentState}},{key:"_validatesProductions",value:function(e){var t=this;if(Object.keys(e).find((function(e){return!t.states.includes(e)})))throw new Error("Estado da produ\xe7\xe3o indefinido");var s=new Set(Object.values(e).reduce((function(e,t){return[].concat(Object(c.a)(e),Object(c.a)(Object.values(t)))}),[]));if(Object(c.a)(s).find((function(e){return!t.states.includes(e)})))throw new Error("Estado da produ\xe7\xe3o indefinido");var i=new Set(Object.values(e).reduce((function(e,t){return[].concat(Object(c.a)(e),Object(c.a)(Object.keys(t)))}),[]));if(Object(c.a)(i).find((function(e){return!t.alphbet.includes(e)})))throw new Error("Simbolo da produ\xe7\xe3o indefinido");return e}}]),e}(),m=s(0);function _(e){var t=Object(o.a)(e.grammarState,2),s=t[0],n=t[1],r=Object(i.useState)([{word:"",result:"disabled",history:[]}]),a=Object(o.a)(r,2),d=a[0],l=a[1];var h=function(e){switch(e.result){case"error":return Object(m.jsx)("label",{className:"nes-text is-error",children:"Palavra rejeitada"});case"success":return Object(m.jsx)("label",{className:"nes-text is-success",children:"Palavra aceita"});case"disabled":return Object(m.jsx)("label",{className:"nes-text is-disabled",children:"Crie um AFD"})}};return Object(m.jsxs)("section",{id:"editor",children:[Object(m.jsxs)("div",{className:"editor__group1 nes-container is-rounded",children:[Object(m.jsxs)("nav",{className:"editor__controlsBar",children:[Object(m.jsx)("div",{className:"editor__editorControl",children:Object(m.jsxs)("label",{className:"nes-btn is-primary",children:[Object(m.jsx)("span",{children:"Selecione um arquivo"}),Object(m.jsx)("input",{type:"file",className:"editor__fileInput is-primary",onChange:function(e){e.preventDefault();var t=e.target.files[0];if(t){var s=new FileReader;s.onloadend=function(){n(s.result)},s.readAsText(t)}}})]})}),Object(m.jsx)("div",{className:"editor__editorControl",children:Object(m.jsx)("input",{type:"button",value:"Executar",className:"nes-btn is-success",onClick:function(){return function(e){try{window.__AFD__=new b(e),l(d.map((function(){return{word:"",result:window.__AFD__.run("")?"success":"error",history:[]}})))}catch(t){u()("Erro na execu\xe7\xe3o",t.message,"error")}}(s)}})})]}),Object(m.jsx)("div",{className:"editor__textEditor nes-field",children:Object(m.jsx)("textarea",{name:"editor",cols:90,rows:30,value:s,onChange:function(e){e.preventDefault(),n(e.target.value)},spellCheck:"false",className:"nes-textarea",wrap:"soft"})})]}),Object(m.jsxs)("div",{className:"editor__group2 nes-container is-rounded",children:[Object(m.jsx)("input",{type:"button",value:"Add input",className:"nes-btn is-".concat(window.__AFD__?"warning":"disabled"),onClick:function(){l([].concat(Object(c.a)(d),[{word:"",result:window.__AFD__.run("")?"success":"error",history:[]}]))}}),d.map((function(e,t){return Object(m.jsxs)("div",{className:"editor__wordsInputs nes-container is-rounded",children:[Object(m.jsxs)("div",{className:"editor__inputHeader",children:[Object(m.jsx)(h,{result:e.result}),Object(m.jsx)("button",{className:"nes-btn is-error",onClick:function(){return e=t,void l(d.filter((function(t,s){return e!==s})));var e},children:"X"})]}),Object(m.jsx)("input",{type:"text",value:e.word,onChange:function(e){return s=t,i=e.target.value,void l(d.map((function(e,t){return window.__AFD__?t===s?(window.__AFD__.history=[],window.__AFD__.run(i)?{word:i,result:"success",history:window.__AFD__.history}:{word:i,result:"error",history:window.__AFD__.history}):e:{word:"",result:"disabled",history:[]}})));var s,i},className:"nes-input is-".concat(e.result),placeholder:window.__AFD__?"Insira uma palavra":"Crie um Automato"}),Object(m.jsxs)("details",{style:{marginTop:"1rem"},children:[Object(m.jsx)("summary",{children:"Hist\xf3rico"}),Object(m.jsx)("div",{className:"nes-container is-rounded is-dark",style:{textAlign:"center"},children:e.history.map((function(e,t){var s=Object(o.a)(e,3),i=s[0],n=s[1],r=s[2];return Object(m.jsxs)("p",{children:[Object(m.jsxs)("strong",{className:"nes-text is-success",children:[i," "]}),r?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("span",{className:"nes-text is-primary",children:" (".concat(n,") ")}),Object(m.jsxs)("strong",{className:"nes-text is-success",children:[" ",r]})]}):Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("span",{className:"nes-text is-error",children:" (".concat(n,") ")})})]},t)}))})]})]},t)}))]})]})}s(26);var v=function(){var e=Object(i.useState)("");return Object(m.jsx)("main",{className:"App",children:Object(m.jsx)(_,{grammarState:e})})},O=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,28)).then((function(t){var s=t.getCLS,i=t.getFID,n=t.getFCP,r=t.getLCP,a=t.getTTFB;s(e),i(e),n(e),r(e),a(e)}))};a.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(v,{})}),document.getElementById("root")),O()}},[[27,1,2]]]);
//# sourceMappingURL=main.e354cf80.chunk.js.map