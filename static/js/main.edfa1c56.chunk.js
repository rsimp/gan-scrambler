(this["webpackJsonpgan-scrambler"]=this["webpackJsonpgan-scrambler"]||[]).push([[0],{102:function(e,t,n){e.exports=n(119)},113:function(e,t,n){var r={"./translations/en-us.json":114};function a(e){var t=c(e);return n(t)}function c(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=c,e.exports=a,a.id=113},114:function(e){e.exports=JSON.parse('{"appTitle":"GAN Scrambler","scramble":{"actions":{"scramble":"Scramble","send":"Send"}}}')},115:function(e,t,n){var r={"./app/robot-widget/store/on-startup.ts":120};function a(e){var t=c(e);return n(t)}function c(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=c,e.exports=a,a.id=115},116:function(e,t,n){var r={"./assets/styles/main.css":117,"./tailwind.css":118};function a(e){var t=c(e);return n(t)}function c(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=c,e.exports=a,a.id=116},117:function(e,t,n){},118:function(e,t,n){},119:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),o=n.n(c),i=n(29),l=n(169),s=n(168),u=n(18),f=n(23),h=n(160),d=n(161),v=n(121),m=n(162),b=n(163),g=n(164),p=n(165),x=n(166),k=n(159),w=n(26),y=n.n(w),E=n(60),O=n(150),j=n(154),T=n(155),D=n(48),U=function(e){return e.robot.device},M=function(e){var t,n=U(e);return n&&(null===(t=n.gatt)||void 0===t?void 0:t.connected)?n.gatt:null};var L=Object(i.b)((function(e){return{robotDevice:U(e)}}),{registerRobot:D.a,unregisterRobot:D.b})((function(e){return a.a.createElement(O.a,{color:"inherit",onClick:Object(E.a)(y.a.mark((function t(){var n,r,a,c,o,i;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.bluetooth.requestDevice({filters:[{namePrefix:"GAN"}],optionalServices:[65520,6154]});case 3:return r=t.sent,t.next=6,null===(n=r.gatt)||void 0===n?void 0:n.connect();case 6:if(!(a=t.sent)){t.next=19;break}return t.next=10,a.getPrimaryService(6154);case 10:return c=t.sent,t.next=13,c.getCharacteristic(10788);case 13:return o=t.sent,t.next=16,o.readValue();case 16:i=t.sent,"GAN ROBOTCUBE"===(new TextDecoder).decode(i).toUpperCase()&&(r.addEventListener("gattserverdisconnected",(function(){return e.unregisterRobot()})),e.registerRobot(r));case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(0),console.log(t.t0);case 24:case"end":return t.stop()}}),t,null,[[0,21]])})))},e.robotDevice?a.a.createElement(j.a,null):a.a.createElement(T.a,null))})),R=n(173),C=n(156),B=n(171),F=n(157),A=n(170),S=n(158),I=["D","L","B","U","R","F"],N=["","2","'"],z={D:[46,45,44,38,37,36,22,21,20,14,13,12],L:[24,31,30,40,47,46,0,7,6,20,19,18],B:[26,25,24,8,15,14,6,5,4,36,35,34],U:[18,17,16,34,33,32,42,41,40,10,9,8],R:[28,27,26,16,23,22,4,3,2,44,43,42],F:[30,29,28,32,39,38,2,1,0,12,11,10]};function _(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:26,t=P(),n=t.scramble(e);return n.join(" ")}function P(){var e=["DDDDDDDDLLLLLLLLBBBBBBBBUUUUUUUURRRRRRRRFFFFFFFF"],t=function(e,t){for(var n=t.charAt(0),r=8*I.indexOf(n),a=t.length>1?"2"===t.charAt(1)?2:3:1,c=e.split(""),o=c.slice(0),i=0;i<8;i++){var l=(i+6*a)%8;c[r+i]=o[r+l]}for(var s=0;s<12;s++){var u=(s+9*a)%12;c[z[n][s]]=o[z[n][u]]}return c.join("")};return{scramble:function(){for(var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:26,r=[],a=e[e.length-1];r.length<n;){var c=I[Math.floor(6*Math.random())]+N[Math.floor(3*Math.random())];if("F"!==c.charAt(0)&&(!(r.length>0&&c.charAt(0)===r[r.length-1].charAt(0))&&!(r.length>1&&c.charAt(0)===r[r.length-2].charAt(0)&&r[r.length-1].charAt(0)===I[(I.indexOf(c.charAt(0))+3)%6]))){var o=t(a,c);-1===e.indexOf(o)&&(r.push(c),e.push(o),a=o)}}return r},reset:function(){return e.splice(1)},twist:t,currentState:e[e.length-1]}}var V=[],G=function e(t){return 0===t||1===t?1:(V[t]>0||(V[t]=e(t-1)*t),V[t])},W=[],q=function(e,t){if(t>e)return 0;for(;e>=W.length;){var n=W.length,r=[];r[0]=1;for(var a=1,c=n-1;a<n;a+=1)r[a]=W[c][a-1]+W[c][a];r[n]=1,W.push(r)}return W[e][t]},J=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},$=function(e,t){var n=e.slice(0);n[t[0]]=e[t[t.length-1]];for(var r=1;r<t.length;r+=1)n[t[r]]=e[t[r-1]];return n},H=function(e,t,n){for(var r=e[t],a=t;a<n;a+=1)e[a]=e[a+1];e[n]=r},K=function(e,t,n){for(var r=e[n],a=n;a>t;a-=1)e[a]=e[a-1];e[t]=r},Q=function(e,t){for(var n=0,r=0;r<e.length-1;r+=1)n=t*n+e[r];return n},X=function(e,t,n){for(var r=[],a=0,c=t-2;c>=0;c-=1){var o=e%n;e=Math.floor(e/n),r[c]=o,a+=o}return r[t-1]=(n-a%n)%n,r},Y=function(e){for(var t=0,n=e.length-1;n>0;n-=1)for(var r=n-1;r>=0;r-=1)e[r]>e[n]&&(t+=1);return t%2},Z=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=e.length-1,a=0,c=1,o=[];if(n)for(var i=e.length-1;i>=0;i-=1)t.indexOf(e[i])>=0&&(r=Math.min(r,e[i]),a+=q(e.length-1-i,c),o.unshift(e[i]),c+=1);else for(var l=0;l<e.length;l+=1)t.indexOf(e[l])>=0&&(r=Math.min(r,e[l]),a+=q(l,c),o.push(e[l]),c+=1);for(var s=0,u=o.length-1;u>0;u-=1){for(var f=0;o[u]!==t[u];)H(o,0,u),f+=1;s=(u+1)*s+f}return G(t.length)*a+s},ee=function(e,t,n){for(var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],a=G(t.length),c=Math.floor(e/a),o=e%a,i=[],l=0;l<n;l+=1)i.push(-1);for(var s=1;s<t.length;s+=1){var u=o%(s+1);for(o=Math.floor(o/(s+1));u>0;)K(t,0,s),u-=1}var f=t.length-1;if(r)for(var h=0;h<n;h+=1){var d=q(n-1-h,f+1);c-d>=0&&(i[h]=t[t.length-1-f],c-=d,f-=1)}else for(var v=n-1;v>=0;v-=1){var m=q(v,f+1);c-m>=0&&(i[v]=t[f],c-=m,f-=1)}return i},te=n(34),ne=n(35),re=n(90),ae=n(88),ce=n(19),oe={"":0,2:1,"'":2},ie=function(e){return/^([FRUBLDfrubldxyzMSE][2']?\s*)+$/.test(e)},le={f:["z","B"],r:["x","L"],u:["y","D"],b:["z'","F"],l:["x'","R"],d:["y'","U"],M:["x'","R","L'"],S:["z","F'","B"],E:["y'","U","D'"]},se={x:"DRFULB",y:"RBULFD",z:"FULBDR"},ue=function(e){e=e.reduce((function(e,t){var n=t.charAt(0),r=t.charAt(1);return le[n]?e.concat(le[n].map((function(e){return e+r}))):e.concat(t)}),[]);for(var t=[],n=[],r=function(r){var a=e[r].charAt(0),c=oe[e[r].charAt(1)];if("xyz".includes(a)){n.unshift(e[r]);for(var o=0;o<=c;o+=1)t=t.map((function(e){return se[a]["FRUBLD".indexOf(e[0])]+e.charAt(1)}))}else t.unshift(e[r])},a=e.length-1;a>=0;a-=1)r(a);return[t,n]};function fe(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!ie(e))throw new Error("Invalid algorithm provided to algorithm parser");var n=[],r=ue(e.match(/[FRUBLDfrubldxyzMSE][2']?/g)||[]),a=Object(u.a)(r,2),c=a[0],o=a[1];return c.forEach((function(e){var t="FRUBLD".indexOf(e.charAt(0)),r=oe[e.charAt(1)];n.push(3*t+r)})),t?[n,o]:n}var he,de,ve,me,be=function(e){if(!ie(e))throw new Error("Invalid algorithm provided to algorithm parser");return(e.match(/[FRUBLDfrubldxyzMSE][2']?/g)||[]).reverse().map((function(e){var t=e.charAt(0),n=oe[e.charAt(1)],r=n-n%3*2+2;return 1===r?"".concat(t,"2"):2===r?"".concat(t,"'"):t})).join(" ")},ge=function(e){var t="";return e.forEach((function(e){switch(t+=" ",t+="FRUBLD".charAt(Math.floor(e/3)),e%3){case 1:t+="2";break;case 2:t+="'"}})),t.trim()},pe=0,xe=1,ke=2,we=3,ye=4,Ee=5,Oe=0,je=1,Te=2,De=3,Ue=4,Me=5,Le=6,Re=7,Ce=8,Be=9,Fe=10,Ae=11,Se=0,Ie=1,Ne=2,ze=3,_e=4,Pe=5,Ve=6,Ge=7,We={center:[0,1,2,3,4,5],ep:[0,1,2,3,4,5,6,7,8,9,10,11],eo:[0,0,0,0,0,0,0,0,0,0,0,0],cp:[0,1,2,3,4,5,6,7],co:[0,0,0,0,0,0,0,0]},qe=[{center:We.center,cp:[Ie,Pe,2,3,Se,_e,6,7],co:[1,2,0,0,2,1,0,0],ep:[0,Be,2,3,4,Ce,6,7,je,Me,10,11],eo:[0,1,0,0,0,1,0,0,1,1,0,0]},{center:We.center,cp:[_e,1,2,Se,Ge,5,6,ze],co:[2,0,0,1,1,0,0,2],ep:[Ce,1,2,3,Ae,5,6,7,Ue,9,10,Oe],eo:We.eo},{center:We.center,cp:[ze,Se,Ie,Ne,4,5,6,7],co:We.co,ep:[De,Oe,je,Te,4,5,6,7,8,9,10,11],eo:We.eo},{center:We.center,cp:[0,1,ze,Ge,4,5,Ne,Ve],co:[0,0,1,2,0,0,2,1],ep:[0,1,2,Ae,4,5,6,Fe,8,9,De,Re],eo:[0,0,0,1,0,0,0,1,0,0,1,1]},{center:We.center,cp:[0,Ne,Ve,3,4,Ie,Pe,7],co:[0,1,2,0,0,2,1,0],ep:[0,1,Fe,3,4,5,Be,7,8,Te,Le,11],eo:We.eo},{center:We.center,cp:[0,1,2,3,Pe,Ve,Ge,_e],co:We.co,ep:[0,1,2,3,Me,Le,Re,Ue,8,9,10,11],eo:We.eo},{center:[0,ke,ye,3,Ee,xe],cp:We.cp,co:We.co,ep:[0,1,2,3,4,5,6,7,Be,Fe,Ae,Ce],eo:[0,0,0,0,0,0,0,0,1,1,1,1]},{center:[Ee,1,pe,ke,4,we],cp:We.cp,co:We.co,ep:[0,De,2,Re,4,je,6,Me,8,9,10,11],eo:[0,1,0,1,0,1,0,1,0,0,0,0]},{center:[ye,pe,2,xe,we,5],cp:We.cp,co:We.co,ep:[Te,1,Le,3,Oe,5,Ue,7,8,9,10,11],eo:[1,0,1,0,1,0,1,0,0,0,0,0]}],Je=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],$e=[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],He=function(e,t,n){for(var r=qe[Math.floor(t/3)],a=t%3+1,c=0;c<a;c++)e=n(e,r);return e},Ke=function(e,t){return t.center===We.center?t.center:t.center.reduce((function(t,n,r){return t[r]=e[n],t}),new Array(6))},Qe=function(e,t){return t.ep.reduce((function(n,r,a){return n.ep[a]=e.ep[r],n.eo[a]=(e.eo[r]+t.eo[a])%2,n}),{ep:new Array(12),eo:new Array(12)})},Xe=function(e,t){return t.cp.reduce((function(n,r,a){return n.cp[a]=e.cp[r],n.co[a]=(e.co[r]+t.co[a])%3,n}),{cp:new Array(8),co:new Array(8)})},Ye=function(e,t){return Object(ce.a)(Object(ce.a)(Object(ce.a)({},He(e,t,Xe)),He(e,t,Qe)),{},{center:He(e.center,t,Ke)})},Ze=function(){function e(t){var n=this;Object(te.a)(this,e),this.name=void 0,this.size=void 0,this.defaultIndex=void 0,this.solvedIndexes=void 0,this.table=void 0,this.name=t.name,this.size=t.size,this.defaultIndex=t.defaultIndex||0,this.solvedIndexes=t.solvedIndexes||[this.defaultIndex];var r=t.doMove;if(r&&(this.doMove=function(e,t){return r(n.table,e,t)}),"table"in t)this.table=t.table;else{var a=function(e,t,n){return function(r,a){var c=e(r);return c=t(c,a),n(c)}}(t.getVector,t.cubieMove,t.getIndex);this.table=this.createMoveTable(t.size,a,t.moves)}}return Object(ne.a)(e,[{key:"doMove",value:function(e,t){return this.table[e][t]}},{key:"createMoveTable",value:function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Je,r=[],a=0;a<e;a+=1)r.push([]);for(var c=0;c<e;c+=1)for(var o=0;o<n.length;o+=1){var i=n[o];if(!r[c][i]){var l=t(c,i),s=i-i%3*2+2;r[c][i]=l,r[l][s]=c}}return r}}]),e}(),et=function(e){return new Ze({name:e.name,moves:e.moves,defaultIndex:Z([0,1,2,3,4,5,6,7,8,9,10,11],e.affected,e.reversed),size:e.size||G(12)/G(12-e.affected.length),getVector:function(t){return ee(t,e.affected.slice(),12,e.reversed)},cubieMove:function(e,t){return He({ep:e,eo:We.eo},t,Qe).ep},getIndex:function(t){return Z(t,e.affected,e.reversed)}})},tt=function(e,t,n){for(var r=[],a=Math.pow(n,t-1),c=Math.pow(n,t-e.length-1),o=function(a){var c=X(a,t,n);e.every((function(e){return 0===c[e]}))&&r.push(a)},i=0;i<a&&r.length<c;i+=1)o(i);return r},nt=function(e){return new Ze({name:e.name,size:2048,solvedIndexes:tt(e.affected,12,2),getVector:function(e){return X(e,12,2)},cubieMove:function(e,t){return He({ep:We.ep,eo:e},t,Qe).eo},getIndex:function(e){return Q(e,2)}})},rt=function(e){return new Ze({name:e.name,size:2187,solvedIndexes:tt(e.affected,8,3),getVector:function(e){return X(e,8,3)},cubieMove:function(e,t){return He({cp:We.cp,co:e},t,Xe).co},getIndex:function(e){return Q(e,3)}})},at=function(){function e(t,n){Object(te.a)(this,e),this.table=void 0,this.table=[],this.computePruningTable(t,n)}return Object(ne.a)(e,[{key:"setPruningValue",value:function(e,t){this.table[e>>3]^=(15^t)<<((7&e)<<2)}},{key:"getPruningValue",value:function(e){return this.table[e>>3]>>((7&e)<<2)&15}},{key:"computePruningTable",value:function(e,t){var n=e.reduce((function(e,t){return e*t.size}),1);this.table.length=0;for(var r=0;r<n+7>>3;r+=1)this.table.push(-1);for(var a=0,c=0,o=[1],i=1;i<e.length;i+=1)o.push(e[i-1].size*o[i-1]);for(var l=function(e){var t=[],n=e.length-1;return function r(a,c){for(var o=0;o<e[c].length;o+=1){var i=a.slice(0);i.push(e[c][o]),c===n?t.push(i):r(i,c+1)}}([],0),t}(e.map((function(e){return e.solvedIndexes}))),s=0;s<l.length;s+=1){for(var u=0,f=0;f<l[s].length;f+=1)u+=o[f]*l[s][f];this.setPruningValue(u,0),c+=1}for(;c!==n;){var h=c>n/2,d=h?15:a,v=h?a:15;a+=1;for(var m=0;m<n;m+=1)if(this.getPruningValue(m)===d)for(var b=0;b<t.length;b+=1){for(var g=t[b],p=m,x=0,k=o.length-1;k>=0;k-=1)x+=o[k]*e[k].doMove(Math.floor(p/o[k]),g),p%=o[k];if(this.getPruningValue(x)===v){if(c+=1,h){this.setPruningValue(m,a);break}this.setPruningValue(x,a)}}}}}]),e}(),ct=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Je;Object(te.a)(this,e),this.moves=void 0,this.initialized=void 0,this.moveTables=void 0,this.settings=void 0,this.pruningTables=void 0,this.createTables=void 0,this.createTables=t,this.moves=n}return Object(ne.a)(e,[{key:"initialize",value:function(){var e=this;if(!this.initialized){this.initialized=!0;var t=this.createTables(),n=t.moveTables,r=t.pruningTables;this.moveTables=n,this.pruningTables=[],r.forEach((function(t){var n=t.map((function(t){return e.moveTables.map((function(e){return e.name})).indexOf(t)}));n.sort((function(t,n){return e.moveTables[t].size-e.moveTables[n].size}));var r=[];n.forEach((function(t){return r.push(e.moveTables[t])}));var a=new at(r,e.moves);e.pruningTables.push({pruningTable:a,moveTableIndexes:n})}))}}},{key:"handleSolution",value:function(e,t){return{solution:e,indexes:t}}},{key:"search",value:function(e,t,n,r){for(var a=0,c=0;c<this.pruningTables.length;c+=1){for(var o=e[this.pruningTables[c].moveTableIndexes[0]],i=1,l=1;l<this.pruningTables[c].moveTableIndexes.length;l+=1)i*=this.moveTables[this.pruningTables[c].moveTableIndexes[l-1]].size,o+=e[this.pruningTables[c].moveTableIndexes[l]]*i;var s=this.pruningTables[c].pruningTable.getPruningValue(o);if(s>t)return!1;s>a&&(a=s)}if(0===a)return this.handleSolution(r,e);if(t>0)for(var u=0;u<this.moves.length;u+=1){var f=this.moves[u];if(Math.floor(f/3)!==Math.floor(n/3)&&Math.floor(f/3)!==Math.floor(n/3)-3){for(var h=[],d=0;d<e.length;d+=1)h.push(this.moveTables[d].doMove(e[d],f));var v=this.search(h,t-1,f,r.concat([f]));if(v)return v}}return!1}},{key:"solve",value:function(e){var t=this;this.initialize(),this.settings=Object(ce.a)({maxDepth:22,lastMove:0,format:!0},e);var n,r=this.settings.indexes||[];if(this.settings.scramble){var a=fe(this.settings.scramble,!0),c=Object(u.a)(a,2),o=c[0],i=c[1];i.length>0&&(n=be(i.join(" ")));for(var l=0;l<this.moveTables.length;l+=1)r.push(this.moveTables[l].defaultIndex);o.forEach((function(e){for(var n=0;n<r.length;n+=1)r[n]=t.moveTables[n].doMove(r[n],e)}))}for(var s=0;s<=this.settings.maxDepth;s+=1){var f=this.search(r,s,this.settings.lastMove,[]);if(f){if(this.settings.format){var h=ge(f.solution);return n?ge(fe("".concat(n," ").concat(h))):h}return f}}return!1}}]),e}(),ot=[10,4,13,6,7,8,15,16,17],it=new ct((function(){var e=function(e,t){for(var n=ee(e,[0,1,2],12),r=ee(t,[3,4,5],12),a=0;a<8;a+=1)if(-1!==n[a]){if(-1!==r[a])return-1;r[a]=n[a]}return Z(r,[0,1,2,3,4,5])};me=[];for(var t=0;t<336;t+=1){me.push([]);for(var n=0;n<336;n+=1)me[t][n]=e(t,n)}return{moveTables:[new Ze({name:"slicePermutation",size:24,table:ve.table}),he,de,et({name:"URToDF",size:20160,moves:ot,affected:[0,1,2,3,4,5]})],pruningTables:[["slicePermutation","parity","URFToDLF"],["slicePermutation","parity","URToDF"]]}}),ot),lt=new(function(e){Object(re.a)(n,e);var t=Object(ae.a)(n);function n(){var e;Object(te.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).maxDepth=void 0,e.solution=void 0,e.maxDepth=40,e.solution=[],e}return Object(ne.a)(n,[{key:"handleSolution",value:function(e,t){var n=e.slice(-1)[0];if(n%2===0&&6===Math.floor(n/3)&&15===Math.floor(n/3))return!1;var r=it.solve({indexes:[t[3],t[4],t[5],me[t[6]][t[7]]],maxDepth:this.maxDepth-e.length,lastMove:n,format:!1});if(r){if(this.solution=e.concat(r.solution),this.maxDepth<=this.settings.maxDepth)return{solution:this.solution,indexes:t};this.maxDepth=this.solution.length-1}return!1}}]),n}(ct))((function(){var e;return he=new Ze({name:"parity",size:2,table:[[1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]]}),de=new Ze({name:(e={name:"URFToDLF",affected:[0,1,2,3,4,5]}).name,moves:e.moves,defaultIndex:Z([0,1,2,3,4,5,6,7],e.affected,e.reversed),size:e.size||G(8)/G(8-e.affected.length),getVector:function(t){return ee(t,e.affected.slice(),8,e.reversed)},cubieMove:function(e,t){return He({cp:e,co:We.co},t,Xe).cp},getIndex:function(t){return Z(t,e.affected,e.reversed)}}),ve=et({name:"slice",affected:[8,9,10,11],reversed:!0}),it.initialize(),{moveTables:[new Ze({name:"slicePosition",size:495,table:ve.table,doMove:function(e,t,n){return Math.floor(e[24*t][n]/24)}}),rt({name:"twist",affected:[0,1,2,3,4,5,6,7]}),nt({name:"flip",affected:[0,1,2,3,4,5,6,7,8,9,10,11]}),ve,he,de,et({name:"URToUL",affected:[0,1,2]}),et({name:"UBToDF",affected:[3,4,5]})],pruningTables:[["slicePosition","flip"],["slicePosition","twist"]]}}),$e),st=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:40;return Array.isArray(e)?lt.solve({indexes:e,maxDepth:t}):lt.solve({scramble:e,maxDepth:t})},ut=function(e,t,n,r){return st([Math.floor(Z(t,[8,9,10,11],!0)/24),Q(n,3),Q(e,2),Z(t,[8,9,10,11],!0),Y(r),Z(r,[0,1,2,3,4,5]),Z(t,[0,1,2]),Z(t,[3,4,5])])},ft=[0,1,2,3],ht=function(e,t,n){var r=X(J(0,Math.pow(t,e.length-1)),e.length,t),a=Array(n).fill(0);return e.forEach((function(e,t){a[e]=r[t]})),a},dt=function(e,t){var n=ee(J(0,G(e.length)),e.slice(0),e.length),r=[0,1,2,3,4,5,6,7,8,9,10,11].slice(0,t);return e.forEach((function(e,t){r[e]=n[t]})),r},vt=function(e,t){t=t||J(0,4);for(var n=0;n<t;n+=1)e=$(e,ft);return e},mt=function(e,t){var n,r,a,c,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t,l=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];do{n=ht(o,2,12),r=dt(e,12),l&&(r=vt(r)),a=ht(i,3,8),c=dt(t,8),s&&(c=vt(c))}while(Y(r)!==Y(c));return ut(n,r,a,c)},bt=mt,gt=new ct((function(){return{moveTables:[et({name:"EdgePermutation",affected:[De,je,Te,Oe]}),nt({name:"EdgeOrientation",affected:[De,je,Te,Oe]})],pruningTables:[["EdgePermutation"],["EdgeOrientation"]]}}),$e),pt=["U","R","F","D","L","B"],xt=[["U8","R0","F2"],["U6","F0","L2"],["U0","L0","B2"],["U2","B0","R2"],["D2","F8","R6"],["D0","L8","F6"],["D6","B8","L6"],["D8","R8","B6"]],kt=[["U5","R1"],["U7","F1"],["U3","L1"],["U1","B1"],["D5","R7"],["D1","F7"],["D3","L7"],["D7","B7"],["F5","R3"],["F3","L5"],["B5","L3"],["B3","R5"]],wt={x:{center:[ke,1,we,Ee,4,pe],cp:[_e,Pe,Ie,Se,Ge,Ve,Ne,ze],co:[2,1,2,1,1,2,1,2],ep:[Ce,Me,Be,je,Ae,Re,Fe,De,Ue,Le,Te,Oe],eo:[0,1,0,1,0,1,0,1,0,0,0,0]},y:{center:[0,Ee,xe,3,ke,ye],cp:[ze,Se,Ie,Ne,Ge,_e,Pe,Ve],co:We.co,ep:[3,0,1,2,7,4,5,6,11,8,9,10],eo:[0,0,0,0,0,0,0,0,1,1,1,1]},z:{center:[ye,pe,2,xe,we,5],cp:[Ie,Pe,Ve,Ne,Se,_e,Ge,ze],co:[1,2,1,2,2,1,2,1],ep:[Te,Be,Me,Fe,Oe,Ce,Ue,Ae,je,Le,Re,De],eo:[1,1,1,1,1,1,1,1,1,1,1,1]}},yt=function(e,t){return(e%t+t)%t},Et=function(e){return 9*pt.indexOf(e[0])+Number(e[1])},Ot=function(e,t,n){return xt[e.cp[t]][yt(n-e.co[t],3)][0]},jt=function(e,t,n){return kt[e.ep[t]][yt(n-e.eo[t],2)][0]},Tt={"":1,2:2,"'":3},Dt=function(e,t){return t.split(" ").map((function(e){return{move:wt[e.charAt(0)],pow:Tt[e.charAt(1)]}})).reduce((function(e,t){for(var n=t.move,r=t.pow,a=0;a<r;a++)e=Object(ce.a)(Object(ce.a)({center:Ke(e.center,n)},Qe(e,n)),Xe(e,n));return e}),e)};function Ut(e){var t=e.type?Lt[e.type]:void 0,n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];return t.rotations&&(e=Dt(e,t.rotations)),pt.forEach((function(t,r){n[9*e.center[r]+4]=t})),xt.forEach((function(r,a){r.forEach((function(r,c){var o,i,l=Et(r),s=Ot(e,a,c);n[l]=!t.filter||(null===(o=t.filter.corners)||void 0===o?void 0:o.includes(e.cp[a]))||(null===(i=t.filter.facelets)||void 0===i?void 0:i.includes(s))?s:"G"}))})),kt.forEach((function(r,a){r.forEach((function(r,c){var o,i,l=Et(r),s=jt(e,a,c);n[l]=!t.filter||(null===(o=t.filter.edges)||void 0===o?void 0:o.includes(e.ep[a]))||(null===(i=t.filter.facelets)||void 0===i?void 0:i.includes(s))?s:"G"}))})),n}(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:We;return e?fe(e).reduce(Ye,t):t}(e.scrambleCode),{filter:t,rotations:e.rotations}).map((function(e){return Mt[e]})).reduce((function(e,t){return e.replace("{}",t)}),Rt);return a.a.createElement("div",{className:"w-3/4 self-center",dangerouslySetInnerHTML:{__html:n}})}var Mt={U:"white",R:"red",F:"green",D:"yellow",L:"orange",B:"blue",G:"gray"},Lt={cross:{edges:[De,je,Oe,Te]},f2l:{edges:[De,je,Oe,Te,Fe,Ae,Be,Ce],corners:[ze,Ie,Ne,Se]},oll:{edges:[De,je,Oe,Te,Fe,Ae,Be,Ce],corners:[ze,Ie,Ne,Se],facelets:["D"]}},Rt='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 258 196" style="stroke-linejoin:round;">\n  <g>\n    <rect x="64" y="2" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="2" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="2" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="22" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="22" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="22" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="42" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="42" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="42" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="126" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="146" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="166" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="126" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="146" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="166" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="126" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="146" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="166" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="126" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="126" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="126" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="146" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="146" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="146" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="64" y="166" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="84" y="166" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="104" y="166" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="2" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="22" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="42" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="2" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="22" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="42" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="2" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="22" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="42" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="188" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="208" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="228" y="64" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="188" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="208" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="228" y="84" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="188" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="208" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n    <rect x="228" y="104" width="20" height="20" fill="{}" stroke="black"></rect>\n  </g>\n</svg>',Ct={R:0,R2:1,"R'":2,D:3,D2:4,"D'":5,B:6,B2:7,"B'":8,L:9,L2:10,"L'":11,U:12,U2:13,"U'":14};function Bt(e){return new Uint8Array(e.split(" ").map((function(e){return Ct[e]})).reduce(function(e){var t;return function(n,r){return t&&t.length!==e||(t=[],n.push(t)),t.push(r),n}}(2),[]).map((function(e){var t;return 16*e[0]+(null!==(t=e[1])&&void 0!==t?t:15)})))}var Ft=function(){var e=Object(E.a)(y.a.mark((function e(t,n){var r,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t){e.next=10;break}return e.next=4,t.getPrimaryService(65520);case 4:return r=e.sent,e.next=7,r.getCharacteristic(65523);case 7:return a=e.sent,e.next=10,a.writeValue(Bt(n));case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t,n){return e.apply(this,arguments)}}(),At=f.a.div.attrs({className:"flex flex-col m-med children:mt-lg children:first:mt-0"}).withConfig({displayName:"cfop-scramble__ContentContainer",componentId:"sc-1763m0p-0"})([""]),St=f.a.div.attrs({className:"flex flex-col children:mt-sm children:first:mt-0"}).withConfig({displayName:"cfop-scramble__ContentGroup",componentId:"sc-1763m0p-1"})([""]);var It=Object(i.b)((function(e){return{robotServer:M(e)}}))((function(e){var t=Object(r.useState)("cross"),n=Object(u.a)(t,2),c=n[0],o=n[1],i=Object(r.useState)(""),l=Object(u.a)(i,2),s=l[0],f=l[1];return a.a.createElement(At,null,a.a.createElement(St,null,a.a.createElement(R.a,{component:"fieldset"},a.a.createElement(C.a,{component:"legend"},"Scramble Type"),a.a.createElement(B.a,{row:!0,"aria-label":"Scramble Type",name:"scrambleType",value:c,onChange:function(e){e.currentTarget.value!==c&&f(""),o(e.currentTarget.value)}},a.a.createElement(F.a,{value:"cross",control:a.a.createElement(A.a,null),label:"Cross"}),a.a.createElement(F.a,{value:"f2l",control:a.a.createElement(A.a,null),label:"F2L"}),a.a.createElement(F.a,{value:"oll",control:a.a.createElement(A.a,null),label:"OLL"}),a.a.createElement(F.a,{value:"pll",control:a.a.createElement(A.a,null),label:"PLL"}))),a.a.createElement(S.a,{variant:"contained",onClick:function(){switch(c){case"cross":f(_());break;case"f2l":var e=_(19),t=function(e){return gt.solve({scramble:e})}(e);t&&f("".concat(e," ").concat(t));break;case"oll":var n=bt([Ue,Me,Le,Re],[Ue,Me,Le,Re],[_e,Pe,Ve,Ge],[_e,Pe,Ve,Ge]);n&&f(n);break;case"pll":var r=mt([Ue,Me,Le,Re],[_e,Pe,Ve,Ge],[],[]);r&&f(r)}}},a.a.createElement(k.a,{id:"scramble.actions.scramble"}))),a.a.createElement(St,null,a.a.createElement(Ut,{scrambleCode:s,type:c,rotations:"x2"}),a.a.createElement(S.a,{variant:"contained",disabled:!Boolean(s)||!Boolean(e.robotServer),onClick:function(){return Ft(e.robotServer,s)}},a.a.createElement(k.a,{id:"scramble.actions.send"}))))})),Nt=f.a.div.attrs({className:"flex flex-col m-med children:mt-lg children:first:mt-0"}).withConfig({displayName:"random-scramble__ContentContainer",componentId:"sc-7r8okx-0"})([""]),zt=f.a.div.attrs({className:"flex flex-col children:mt-sm children:first:mt-0"}).withConfig({displayName:"random-scramble__ContentGroup",componentId:"sc-7r8okx-1"})([""]);var _t=Object(i.b)((function(e){return{robotServer:M(e)}}))((function(e){var t=Object(r.useState)(""),n=Object(u.a)(t,2),c=n[0],o=n[1];return a.a.createElement(Nt,null,a.a.createElement(zt,null,a.a.createElement(S.a,{variant:"contained",onClick:function(){o(_())}},a.a.createElement(k.a,{id:"scramble.actions.scramble"}))),a.a.createElement(zt,null,a.a.createElement(v.a,{variant:"body1"},c),a.a.createElement(Ut,{scrambleCode:c}),a.a.createElement(S.a,{variant:"contained",disabled:!Boolean(e.robotServer),onClick:function(){return Ft(e.robotServer,c)}},a.a.createElement(k.a,{id:"scramble.actions.send"}))))})),Pt=n(167),Vt=f.a.div.attrs({className:"flex flex-col m-med children:mt-lg children:first:mt-0"}).withConfig({displayName:"manual-scramble__ContentContainer",componentId:"sc-1qch5wh-0"})([""]),Gt=f.a.div.attrs({className:"flex flex-col children:mt-sm children:first:mt-0"}).withConfig({displayName:"manual-scramble__ContentGroup",componentId:"sc-1qch5wh-1"})([""]);var Wt=Object(i.b)((function(e){return{robotServer:M(e)}}))((function(e){var t=Object(r.useState)(""),n=Object(u.a)(t,2),c=n[0],o=n[1],i=Object(r.useState)(!1),l=Object(u.a)(i,2),s=l[0],f=l[1];return a.a.createElement(Vt,null,a.a.createElement(Gt,null,a.a.createElement("form",{noValidate:!0,autoComplete:"off",className:"container"},a.a.createElement(Pt.a,{id:"manual-scramble",label:"Manual Scramble",multiline:!0,rowsMax:4,fullWidth:!0,error:s,helperText:s&&"Invalid Scramble Code",onBlur:function(e){var t=e.target.value;if(t.length>0)if(ie(t)){var n=st(t);if(n){var r=be(n);o(r)}}else f(!0),o("");else f(!1),o("")}}))),a.a.createElement(Gt,null,a.a.createElement(Ut,{scrambleCode:c}),a.a.createElement(S.a,{variant:"contained",disabled:!Boolean(e.robotServer)&&Boolean(c),onClick:function(){return Ft(e.robotServer,c)}},a.a.createElement(k.a,{id:"scramble.actions.send"}))))})),qt=f.a.div.attrs({className:"flex flex-col h-screen"}).withConfig({displayName:"main-screen__Screen",componentId:"sc-1sagbya-0"})([""]),Jt=f.a.div.attrs({className:"flex flex-row ml-auto"}).withConfig({displayName:"main-screen__IconContainer",componentId:"sc-1sagbya-1"})([""]);function $t(){var e=a.a.useState("random"),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){window.screen.orientation.lock("portrait"),lt.initialize()}),[]),a.a.createElement(qt,null,a.a.createElement(h.a,{position:"static"},a.a.createElement(d.a,null,a.a.createElement(v.a,{variant:"h5"},a.a.createElement(k.a,{id:"appTitle"})),a.a.createElement(Jt,null,a.a.createElement(L,null)))),a.a.createElement("div",{className:"flex flex-col h-full"},"random"===n&&a.a.createElement(_t,null),"cfop"===n&&a.a.createElement(It,null),"manual"===n&&a.a.createElement(Wt,null),a.a.createElement("div",{className:"w-full mt-auto"},a.a.createElement(m.a,{showLabels:!0,value:n,onChange:function(e,t){c(t)},className:"w-full"},a.a.createElement(b.a,{icon:a.a.createElement(g.a,null),value:"random",label:"RANDOM","aria-label":"phone"}),a.a.createElement(b.a,{icon:a.a.createElement(p.a,null),value:"cfop",label:"CFOP","aria-label":"favorite"}),a.a.createElement(b.a,{icon:a.a.createElement(x.a,null),value:"manual",label:"MANUAL","aria-label":"person"})))))}var Ht=n(66),Kt=n(68),Qt=n(87),Xt=n.n(Qt);function Yt(e){var t={};return e.keys().forEach((function(n){return t[n]=e(n)})),t}var Zt=Yt(n(113)),en=Object.keys(Zt).reduce((function(e,t){var n=Xt()(t).name;return e[n]=Object(ce.a)(Object(ce.a)({},e[n]),function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object.keys(t).reduce((function(r,a){var c=[].concat(Object(Kt.a)(n),[a]),o=t[a];return"object"===typeof o?r=Object(ce.a)(Object(ce.a)({},r),e(o,c)):r[c.join(".")]=o,r}),{})}(Zt[t])),e}),{}),tn=navigator.language,nn=en[tn.toLowerCase()],rn=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function an(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}Yt(n(115)),Yt(n(116));var cn=Object(Ht.a)();o.a.render(a.a.createElement(i.a,{store:cn},a.a.createElement(l.a,{locale:tn,messages:nn},a.a.createElement(s.b,{injectFirst:!0},a.a.createElement($t,null)))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/gan-scrambler",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/gan-scrambler","/service-worker.js");rn?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):an(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):an(t,e)}))}}()},120:function(e,t,n){"use strict";n.r(t);var r=n(66),a=n(21),c=n(44),o=n(48),i=function(e,t){return t.payload},l=Object(a.c)({device:Object(c.c)(null,(function(e){var t;e.addCase(o.a,i),e.addCase(o.b,(t=null,function(){return t}))}))});Object(r.b)("robot",l)},48:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return c}));var r=n(44),a=Object(r.b)("".concat("setup","/register_robot")),c=Object(r.b)("".concat("setup","/unregister_robot"))},66:function(e,t,n){"use strict";n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return m}));var r=n(26),a=n.n(r),c=(n(68),n(44)),o=n(89),i=n(69),l=a.a.mark(d),s=a.a.mark(v),u={};function f(e,t){u[e]=t}var h=[];function d(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=1,t.next=4,Object(i.a)(e);case 4:console.error("Unexpected root saga termination",e),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.error("Saga error, the saga will be restarted",t.t0);case 10:return t.next=12,Object(i.b)(500);case 12:t.next=0;break;case 14:case"end":return t.stop()}}),l,null,[[1,7]])}function v(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.map((function(e){return Object(i.c)(d,e)}));case 2:case"end":return e.stop()}}),s)}function m(){var e=Object(o.a)(),t=Object(c.a)({reducer:u,middleware:[e]});return e.run(v),t}}},[[102,1,2]]]);
//# sourceMappingURL=main.edfa1c56.chunk.js.map