(this["webpackJsonpafd-react"]=this["webpackJsonpafd-react"]||[]).push([[0],{24:function(t,e,i){},27:function(t,e,i){},29:function(t,e,i){},30:function(t,e,i){"use strict";i.r(e);var n=i(4),s=i.n(n),r=i(18),a=i.n(r),c=(i(24),i(1)),o=i(2),l=i(13),u=i.n(l),d=(i(27),i(15)),h=i(3),j=i(19),f=i(11),b=i(12),v=function(){function t(e){if(Object(f.a)(this,t),this._disjoint_set=void 0,this._disjoint_set=[],e){var i,n=Object(h.a)(new Set(e));try{for(n.s();!(i=n.n()).done;){var s=i.value;this._disjoint_set.push([s])}}catch(r){n.e(r)}finally{n.f()}}}return Object(b.a)(t,[{key:"_get_index",value:function(t){var e,i=Object(h.a)(this._disjoint_set);try{for(i.s();!(e=i.n()).done;){var n,s=e.value,r=Object(h.a)(s);try{for(r.s();!(n=r.n()).done;){if(n.value===t)return this._disjoint_set.indexOf(s)}}catch(a){r.e(a)}finally{r.f()}}}catch(a){i.e(a)}finally{i.f()}return null}},{key:"union",value:function(t,e){var i=this._get_index(t),n=this._get_index(e);i!==n&&(this._disjoint_set[i]=[].concat(Object(c.a)(this._disjoint_set[i]),Object(c.a)(this._disjoint_set[n])),this._disjoint_set=this._disjoint_set.filter((function(t,e){return e!==n})))}},{key:"get",value:function(){return this._disjoint_set}}]),t}(),_=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"json";Object(f.a)(this,t),this.grammar=void 0,this.grammarType=void 0,this.name=void 0,this.states=void 0,this.alphbet=void 0,this.productions=void 0,this.initialState=void 0,this.currentState=void 0,this.terminals=void 0,this.history=void 0,this.grammar=e,this.grammarType=i;var n=JSON.parse(e),s=n.name,r=n.states,a=n.alphbet,o=n.productions,l=n.initialState,u=n.terminals;this.name=s,this.states=r,this.alphbet=[""].concat(Object(c.a)(a)),this.productions=this._validatesProductions(o),this.initialState=this._validatesInitialState(l),this.terminals=this._validatesTerminals(u),this.history=[],this.currentState=l}return Object(b.a)(t,[{key:"run",value:function(t){if(!t)return this.history=[[this.initialState,"",this.initialState]],this.terminals.includes(this.initialState);var e=Object(j.a)(t),i=e[0],n=e.slice(1),s=this.productions[this.currentState]?this.productions[this.currentState][i]:void 0;return this.history.push([this.currentState,i,s]),s?0!==n.length?(this._moveTo(s),this.run(n)):this.terminals.includes(s)?(this._moveTo(this.initialState),!0):(this._moveTo(this.initialState),!1):(this._moveTo(this.initialState),!1)}},{key:"_moveTo",value:function(t){return this.currentState=t,this.currentState}},{key:"_validatesProductions",value:function(t){var e=this;if(Object.keys(t).find((function(t){return!e.states.includes(t)})))throw new Error("Estado da produ\xe7\xe3o indefinido");var i=new Set(Object.values(t).reduce((function(t,e){return[].concat(Object(c.a)(t),Object(c.a)(Object.values(e)))}),[]));if(Object(c.a)(i).find((function(t){return!e.states.includes(t)})))throw new Error("Estado da produ\xe7\xe3o indefinido");var n=new Set(Object.values(t).reduce((function(t,e){return[].concat(Object(c.a)(t),Object(c.a)(Object.keys(e)))}),[]));if(Object(c.a)(n).find((function(t){return!e.alphbet.includes(t)})))throw new Error("Simbolo da produ\xe7\xe3o indefinido");return t}},{key:"_validatesInitialState",value:function(t){if(this.states.includes(t))return t;throw new Error("Estado inicial n\xe3o pertence ao conjunto de estados!")}},{key:"_validatesTerminals",value:function(t){var e=this;return t.map((function(t){if(e.states.includes(t))return t;throw new Error("Estado indefinido entre os estados terminais")}))}},{key:"_remove_unreachable_states",value:function(){for(var t=new Map,e=0,i=Object.keys(this.productions);e<i.length;e++){var n=i[e];t.set(n,[]);for(var s=0,r=Object.values(this.productions[n]);s<r.length;s++){var a=r[s];t.get(n).push(a)}}for(var o=[this.initialState],l=new Set;o.length;){var u=o.pop();!l.has(u)&&t.get(u)&&(o=[].concat(Object(c.a)(o),Object(c.a)(t.get(u)))),l.add(u)}this.states=this.states.filter((function(t){return l.has(t)})),this.terminals=this.terminals.filter((function(t){return l.has(t)})),this.productions=Object.fromEntries(Object.entries(this.productions).filter((function(t){return l.has(t[0])})))}},{key:"print",value:function(){console.log({name:this.name,states:this.states,alphbet:this.alphbet,productions:this.productions,initialState:this.initialState,terminals:this.terminals})}},{key:"_minimization",value:function(){var t=this;this.alphbet=this.alphbet.slice(1),this._remove_unreachable_states();var e=new Map,i=this.states.sort();i.forEach((function(n,s){i.slice(s+1).forEach((function(i){e.set([n,i].toString(),t.terminals.includes(n)!==t.terminals.includes(i))}))}));for(var n=!0;n;){n=!1;for(var s=0,r=Object.entries(i);s<r.length;s++){var a,l=Object(o.a)(r[s],2),u=l[0],d=l[1],j=Object(h.a)(i.slice(parseInt(u)+1));try{for(j.s();!(a=j.n()).done;){var f=a.value;if(!e.get([d,f].toString())){var b,_=Object(h.a)(this.alphbet);try{for(_.s();!(b=_.n()).done;){var m=b.value,p=this.productions[d][m]||null,O=this.productions[f][m]||null;if(p!==O&&p&&O){var y=[p,O].sort(),w=e.get(y.toString());if(n=n||w,e.set([d,f].toString(),w),w)break}}}catch(T){_.e(T)}finally{_.f()}}}}catch(T){j.e(T)}finally{j.f()}}}var x,g=new v(this.states),S=Object(h.a)(e.entries());try{for(S.s();!(x=S.n()).done;){var N=Object(o.a)(x.value,2),k=N[0],A=N[1],E=k.split(","),F=Object(o.a)(E,2),D=F[0],C=F[1];A||g.union(D,C)}}catch(T){S.e(T)}finally{S.f()}this.states=g.get().map((function(t){return t.reduce((function(t,e){return t+e}),"")})),this.initialState=this.states.filter((function(e){return e.includes(t.initialState)}))[0],this.terminals=this.states.filter((function(e){var i,n=!1,s=Object(h.a)(t.terminals);try{for(s.s();!(i=s.n()).done;){var r=i.value;n=n||e.includes(r)}}catch(T){s.e(T)}finally{s.f()}return n})),this._updateProductions(),this.alphbet=[""].concat(Object(c.a)(this.alphbet)),this.print()}},{key:"_updateProductions",value:function(){for(var t={},e=0,i=Object.entries(this.productions);e<i.length;e++){var n=Object(o.a)(i[e],2),s=n[0],r=n[1];t[this._findUnion(s)]?t[this._findUnion(s)]=Object(d.a)(Object(d.a)({},t[this._findUnion(s)]),this.productions[this._findUnion(s)]):t[this._findUnion(s)]=r}var a,c=Object(h.a)(this.states);try{for(c.s();!(a=c.n()).done;){var l=a.value;if(t[l])for(var u=0,j=Object.keys(t[l]);u<j.length;u++){var f=j[u];t[l][f]=this._findUnion(t[l][f])}}}catch(b){c.e(b)}finally{c.f()}this.productions=t}},{key:"_findUnion",value:function(t){return this.states.filter((function(e){return e.includes(t)}))[0]}}]),t}(),m=i(10);var p=i(0);function O(t){var e=Object(o.a)(t.grammarState,2),i=e[0],s=e[1],r=Object(n.useState)([{word:"",result:"disabled",history:[]}]),a=Object(o.a)(r,2),l=a[0],d=a[1];function j(t){try{window.__AFD__=new _(function(t){var e={name:"",states:[],alphbet:[],productions:{},initialState:"",terminals:[]};try{var i=t.split("\n"),n=i[0].split("=({"),s=Object(o.a)(n,2),r=s[0],a=s[1];e.name=r.trim();var c=a.split("},{"),l=Object(o.a)(c,2),u=l[0],d=l[1];e.states=u.split(",").map((function(t){return t.trim()}));var j=d.split("},"),f=Object(o.a)(j,2),b=f[0],v=f[1];e.alphbet=b.split(",").map((function(t){return t.trim()}));var _=v.split(","),p=Object(o.a)(_,3),O=p[0],y=p[1],w=p[2];e.initialState=y.trim();var x=w.slice(1,w.length-2).split(",");if(e.terminals=x.map((function(t){return t.trim()})),O!==i[1])throw new Error("Nome das produ\xe7\xf5es errado");var g,S=Object(h.a)(i.slice(2));try{for(S.s();!(g=S.n()).done;){var N=g.value;if(N.length){var k=(N=N.trim()).slice(1).split(")=").map((function(t){return t.trim()})),A=Object(o.a)(k,2),E=A[0],F=A[1],D=E.split(",").map((function(t){return t.trim()})),C=Object(o.a)(D,2),T=C[0],I=C[1];e.productions[T]?e.productions[T][I]=F:e.productions[T]=Object(m.a)({},I,F)}}}catch(P){S.e(P)}finally{S.f()}return JSON.stringify(e)}catch(P){throw new Error("Formato de entrada errado")}}(t)),d(l.map((function(){return{word:"",result:window.__AFD__.run("")?"success":"error",history:window.__AFD__.history}})))}catch(e){u()("Erro na cria\xe7\xe3o",e.message,"error")}}var f=function(t){switch(t.result){case"error":return Object(p.jsx)("span",{className:"nes-badge",children:Object(p.jsx)("span",{className:"is-error",children:"REJEITA"})});case"success":return Object(p.jsx)("span",{className:"nes-badge",children:Object(p.jsx)("span",{className:"is-success",children:"ACEITA"})});case"disabled":return Object(p.jsx)("span",{className:"nes-badge",children:Object(p.jsx)("span",{className:"is-dark",children:"_"})})}},b=function(t){var e=t.lastRound[1],i=t.lastRound[2];return window.__AFD__.alphbet.includes(e)?i?window.__AFD__.terminals.includes(i)?Object(p.jsx)("p",{className:"nes-text is-success",children:"Palavra aceita"}):Object(p.jsx)("p",{className:"nes-text is-error",children:"Estado final n\xe3o \xe9 terminal"}):Object(p.jsx)("p",{className:"nes-text is-error",children:"Produ\xe7\xe3o indefinida"}):Object(p.jsx)("p",{className:"nes-text is-error",children:"Simbolo n\xe3o pertence ao alfabeto"})};return Object(p.jsxs)("section",{id:"editor",children:[Object(p.jsxs)("div",{className:"editor__group1 nes-container is-rounded",children:[Object(p.jsxs)("nav",{className:"editor__controlsBar",children:[Object(p.jsx)("div",{className:"editor__editorControl",children:Object(p.jsxs)("label",{className:"nes-btn is-primary",children:[Object(p.jsx)("span",{children:"Selecione um arquivo"}),Object(p.jsx)("input",{type:"file",className:"editor__fileInput is-primary",onChange:function(t){t.preventDefault();var e=t.target.files[0];if(e)try{var i=new FileReader;i.onloadend=function(){s(i.result)},i.readAsText(e)}catch(n){u()("Erro",n.message,"error")}else u()("Nenhum arquivo")}})]})}),Object(p.jsx)("div",{className:"editor__editorControl",children:Object(p.jsx)("input",{type:"button",value:"Criar automato",className:"nes-btn is-success",onClick:function(){return j(i)}})})]}),Object(p.jsx)("div",{className:"editor__textEditor nes-field",children:Object(p.jsx)("textarea",{name:"editor",cols:90,rows:20,value:i,onChange:function(t){t.preventDefault(),s(t.target.value)},spellCheck:"false",className:"nes-textarea",wrap:"soft"})})]}),Object(p.jsxs)("div",{className:"editor__group2 nes-container is-rounded",children:[Object(p.jsx)("input",{type:"button",value:"Add input",className:"nes-btn is-".concat(window.__AFD__?"warning":"disabled"),onClick:function(){d([].concat(Object(c.a)(l),[{word:"",result:window.__AFD__.run("")?"success":"error",history:window.__AFD__.history}]))}}),l.map((function(t,e){return Object(p.jsxs)("div",{className:"editor__wordsInputs nes-container is-rounded",children:[Object(p.jsxs)("div",{className:"editor__inputHeader",children:[Object(p.jsx)(f,{result:t.result}),Object(p.jsx)("button",{className:"nes-btn is-error",onClick:function(){return t=e,void d(l.filter((function(e,i){return t!==i})));var t},children:"X"})]}),Object(p.jsx)("input",{type:"text",value:t.word,onChange:function(t){return i=e,n=t.target.value,void d(l.map((function(t,e){return window.__AFD__?e===i?(window.__AFD__.history=[],window.__AFD__.run(n)?{word:n,result:"success",history:window.__AFD__.history}:{word:n,result:"error",history:window.__AFD__.history}):t:{word:"",result:"disabled",history:[]}})));var i,n},className:"nes-input is-".concat(t.result),placeholder:window.__AFD__?"Palavra vazia":"Crie um Automato"}),Object(p.jsxs)("details",{style:{marginTop:"1rem"},children:[Object(p.jsx)("summary",{children:"Hist\xf3rico"}),Object(p.jsxs)("div",{className:"nes-container is-rounded is-dark",style:{textAlign:"center"},children:[t.history.map((function(t,e){var i=Object(o.a)(t,3),n=i[0],s=i[1],r=i[2];return Object(p.jsxs)("p",{children:[Object(p.jsx)("span",{className:"nes-text is-warning",children:"".concat(e+1,") ")}),Object(p.jsx)("strong",{className:"nes-text is-success",children:n}),r?Object(p.jsxs)(p.Fragment,{children:["|",Object(p.jsx)("span",{className:"nes-text is-primary",children:"(".concat(s,")")}),"|",Object(p.jsx)("strong",{className:"nes-text is-success",children:r})]}):Object(p.jsxs)(p.Fragment,{children:["|",Object(p.jsx)("span",{className:"nes-text is-error",children:"(".concat(s,")")})]})]},e)})),t.history.length?Object(p.jsx)(b,{lastRound:t.history[t.history.length-1]}):""]})]})]},e)}))]})]})}i(29);var y=function(){var t=Object(n.useState)("");return Object(p.jsx)("main",{className:"App",children:Object(p.jsx)(O,{grammarState:t})})},w=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,31)).then((function(e){var i=e.getCLS,n=e.getFID,s=e.getFCP,r=e.getLCP,a=e.getTTFB;i(t),n(t),s(t),r(t),a(t)}))};a.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(y,{})}),document.getElementById("root")),w()}},[[30,1,2]]]);
//# sourceMappingURL=main.0409c68d.chunk.js.map