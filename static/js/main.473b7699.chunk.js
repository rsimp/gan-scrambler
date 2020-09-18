(this["webpackJsonpgan-scrambler"]=this["webpackJsonpgan-scrambler"]||[]).push([[0],{107:function(e,t,n){var r={"./translations/en-us.json":108};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=107},108:function(e){e.exports=JSON.parse('{"appTitle":"GAN Scrambler","scrambleGenerator.actions.generate":"Generate","scrambleGenerator.actions.execute":"Execute"}')},109:function(e,t,n){var r={"./app/robot-widget/store/on-startup.ts":113};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=109},110:function(e,t,n){var r={"./styles/main.global.css":111};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=110},111:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(21),c=n.n(o),i=n(26),u=n(139),s=n(137),l=n(143),f=n(135),d=n(115),v=n(134),b=n(17),m=n.n(b),g=n(39),h=n(129),p=n(130),w=n(131),O=n(28),E=function(e){return e.robot.device},x=function(e){var t,n=E(e);return n&&(null===(t=n.gatt)||void 0===t?void 0:t.connected)?n.gatt:null},j=n(66),k=n.n(j);var y=Object(i.b)((function(e){return{robotDevice:E(e)}}),{registerRobot:O.a,unregisterRobot:O.b})((function(e){return a.a.createElement(s.a,{flexDirection:"row",flexGrow:1},a.a.createElement("div",{className:k.a.robotWidgetContainer},a.a.createElement(h.a,{color:"inherit",onClick:Object(g.a)(m.a.mark((function t(){var n,r,a,o,c,i;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.bluetooth.requestDevice({filters:[{namePrefix:"GAN"}],optionalServices:[65520,6154]});case 3:return r=t.sent,t.next=6,null===(n=r.gatt)||void 0===n?void 0:n.connect();case 6:if(!(a=t.sent)){t.next=19;break}return t.next=10,a.getPrimaryService(6154);case 10:return o=t.sent,t.next=13,o.getCharacteristic(10788);case 13:return c=t.sent,t.next=16,c.readValue();case 16:i=t.sent,"GAN ROBOTCUBE"===(new TextDecoder).decode(i).toUpperCase()&&(r.addEventListener("gattserverdisconnected",(function(){return e.unregisterRobot()})),e.registerRobot(r));case 19:t.next=25;break;case 21:t.prev=21,t.t0=t.catch(0),alert(t.t0),console.log(t.t0);case 25:case"end":return t.stop()}}),t,null,[[0,21]])})))},e.robotDevice?a.a.createElement(p.a,null):a.a.createElement(w.a,null))))})),D=n(57),U=n(140),S=n(142),L=n(141),R=n(132),A=n(138),C=n(133),B=function(e){var t;return function(n,r){return t&&t.length!==e||(t=[],n.push(t)),t.push(r),n}},F=["D","L","B","U","R","F"],N=["","2","'"],T={R:0,R2:1,"R'":2,F:3,F2:4,"F'":5,D:6,D2:7,"D'":8,L:9,L2:10,"L'":11,B:12,B2:13,"B'":14},_={D:[46,45,44,38,37,36,22,21,20,14,13,12],L:[24,31,30,40,47,46,0,7,6,20,19,18],B:[26,25,24,8,15,14,6,5,4,36,35,34],U:[18,17,16,34,33,32,42,41,40,10,9,8],R:[28,27,26,16,23,22,4,3,2,44,43,42],F:[30,29,28,32,39,38,2,1,0,12,11,10]};function G(){var e=function(){var e=["DDDDDDDDLLLLLLLLBBBBBBBBUUUUUUUURRRRRRRRFFFFFFFF"],t=function(e,t){for(var n=t.charAt(0),r=8*F.indexOf(n),a=t.length>1?"2"===t.charAt(1)?2:3:1,o=e.split(""),c=o.slice(0),i=0;i<8;i++){var u=(i+6*a)%8;o[r+i]=c[r+u]}for(var s=0;s<12;s++){var l=(s+9*a)%12;o[_[n][s]]=c[_[n][l]]}return o.join("")};return{scramble:function(){for(var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:26,r=[],a=e[e.length-1];r.length<n;){var o=F[Math.floor(6*Math.random())]+N[Math.floor(3*Math.random())];if("U"!==o.charAt(0)&&(!(r.length>0&&o.charAt(0)===r[r.length-1].charAt(0))&&!(r.length>1&&o.charAt(0)===r[r.length-2].charAt(0)&&r[r.length-1].charAt(0)===F[(F.indexOf(o.charAt(0))+3)%6]))){var c=t(a,o);-1===e.indexOf(c)&&(r.push(o),e.push(c),a=c)}}return r},reset:function(){return e.splice(1)},twist:t,currentState:e[e.length-1]}}(),t=e.scramble();return{code:t.join(" "),GANEncoding:t.map((function(e){return T[e]})).reduce(B(2),[]).map((function(e){return 16*e[0]+e[1]})),cubeState:e.currentState}}var W=n(70),M=n.n(W),P=n(71),I=n.n(P);function J(e){var t=function(e){var t=new M.a;return t.move(e),(new I.a).svgString(t.asString())}(e.scramble.code);return a.a.createElement("div",{style:{width:"50%"},dangerouslySetInnerHTML:{__html:t}})}var V=Object(i.b)((function(e){return{robotServer:x(e)}}))((function(e){var t=Object(r.useState)("full"),n=Object(D.a)(t,2),o=n[0],c=n[1],i=Object(r.useState)(null),u=Object(D.a)(i,2),l=u[0],f=u[1];return a.a.createElement(s.a,{display:"flex",flexDirection:"column",alignItems:"flex-start"},a.a.createElement(U.a,{component:"fieldset"},a.a.createElement(S.a,{component:"legend"},"Scramble Type"),a.a.createElement(L.a,{row:!0,"aria-label":"Scramble Type",name:"scrambleType",value:o,onChange:function(e){return c(e.currentTarget.value)}},a.a.createElement(R.a,{value:"full",control:a.a.createElement(A.a,null),label:"Full"}))),a.a.createElement(C.a,{variant:"contained",onClick:function(){f(G())}},a.a.createElement(v.a,{id:"scrambleGenerator.actions.generate"})),l&&a.a.createElement(a.a.Fragment,null,a.a.createElement(d.a,{variant:"body1"},l.code),a.a.createElement(J,{scramble:l}),a.a.createElement(C.a,{variant:"contained",disabled:!Boolean(e.robotServer),onClick:Object(g.a)(m.a.mark((function t(){var n,r;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!e.robotServer){t.next=10;break}return t.next=4,e.robotServer.getPrimaryService(65520);case 4:return n=t.sent,t.next=7,n.getCharacteristic(65523);case 7:return r=t.sent,t.next=10,r.writeValue(new Uint8Array(l.GANEncoding));case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))},a.a.createElement(v.a,{id:"scrambleGenerator.actions.execute"}))))}));function q(){return a.a.createElement(s.a,{flexGrow:1},a.a.createElement(l.a,{position:"static"},a.a.createElement(f.a,null,a.a.createElement(d.a,{variant:"h5"},a.a.createElement(v.a,{id:"appTitle"})),a.a.createElement(y,null))),a.a.createElement(V,null))}var H=n(49),$=n(37),z=n(51),K=n(72),Q=n.n(K);function X(e){var t={};return e.keys().forEach((function(n){return t[n]=e(n)})),t}var Y=X(n(107)),Z=Object.keys(Y).reduce((function(e,t){var n=Q()(t).name;return e[n]=Object($.a)(Object($.a)({},e[n]),function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object.keys(t).reduce((function(r,a){var o=[].concat(Object(z.a)(n),[a]),c=t[a];return"object"===typeof c?r=Object($.a)(Object($.a)({},r),e(c,o)):r[o.join(".")]=c,r}),{})}(Y[t])),e}),{}),ee=navigator.language,te=Z[ee.toLowerCase()],ne=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function re(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}X(n(109)),X(n(110));var ae=Object(H.a)();c.a.render(a.a.createElement(i.a,{store:ae},a.a.createElement(u.a,{locale:ee,messages:te},a.a.createElement(q,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/gan-scrambler",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/gan-scrambler","/service-worker.js");ne?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):re(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):re(t,e)}))}}()},113:function(e,t,n){"use strict";n.r(t);var r=n(49),a=n(15),o=n(25),c=n(28),i=function(e,t){return t.payload},u=Object(a.c)({device:Object(o.c)(null,(function(e){var t;e.addCase(c.a,i),e.addCase(c.b,(t=null,function(){return t}))}))});Object(r.b)("robot",u)},28:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o}));var r=n(25),a=Object(r.b)("".concat("setup","/register_robot")),o=Object(r.b)("".concat("setup","/unregister_robot"))},49:function(e,t,n){"use strict";n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return m}));var r=n(17),a=n.n(r),o=(n(51),n(25)),c=n(73),i=n(52),u=a.a.mark(v),s=a.a.mark(b),l={};function f(e,t){l[e]=t}var d=[];function v(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=1,t.next=4,Object(i.a)(e);case 4:console.error("Unexpected root saga termination",e),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.error("Saga error, the saga will be restarted",t.t0);case 10:return t.next=12,Object(i.b)(500);case 12:t.next=0;break;case 14:case"end":return t.stop()}}),u,null,[[1,7]])}function b(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.map((function(e){return Object(i.c)(v,e)}));case 2:case"end":return e.stop()}}),s)}function m(){var e=Object(c.a)(),t=Object(o.a)({reducer:l,middleware:[e]});return e.run(b),t}},66:function(e,t,n){e.exports={robotWidgetContainer:"styles_robotWidgetContainer__1NUaw"}},86:function(e,t,n){e.exports=n(112)}},[[86,1,2]]]);
//# sourceMappingURL=main.473b7699.chunk.js.map