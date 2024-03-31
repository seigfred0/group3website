(()=>{"use strict";const t={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},e=t=>1e3*t,n=t=>t/1e3,i=()=>{},a=t=>t;function r(t,e=!0){if(t&&"finished"!==t.playState)try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch(t){}}const s=t=>t(),o=(e,n,i=t.duration)=>new Proxy({animations:e.map(s).filter(Boolean),duration:i,options:n},c),c={get:(t,e)=>{const a=t.animations[0];switch(e){case"duration":return t.duration;case"currentTime":return n((null==a?void 0:a[e])||0);case"playbackRate":case"playState":return null==a?void 0:a[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(l)).catch(i)),t.finished;case"stop":return()=>{t.animations.forEach((t=>r(t)))};case"forEachNative":return e=>{t.animations.forEach((n=>e(n,t)))};default:return void 0===(null==a?void 0:a[e])?void 0:()=>t.animations.forEach((t=>t[e]()))}},set:(t,n,i)=>{switch(n){case"currentTime":i=e(i);case"playbackRate":for(let e=0;e<t.animations.length;e++)t.animations[e][n]=i;return!0}return!1}},l=t=>t.finished,u=t=>"object"==typeof t&&Boolean(t.createAnimation),h=t=>"number"==typeof t,d=t=>Array.isArray(t)&&!h(t[0]),f=(t,e,n)=>-n*t+n*e+t,p=(t,e,n)=>e-t==0?1:(n-t)/(e-t);function m(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const a=p(0,e,i);t.push(f(n,1,a))}}const y=(t,e,n)=>Math.min(Math.max(n,t),e);const g=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,v=1e-7,w=12;function b(t,e,n,i){if(t===e&&n===i)return a;return a=>0===a||1===a?a:g(function(t,e,n,i,a){let r,s,o=0;do{s=e+(n-e)/2,r=g(s,i,a)-t,r>0?n=s:e=s}while(Math.abs(r)>v&&++o<w);return s}(a,0,1,t,n),e,i)}const T=t=>"function"==typeof t,S=t=>Array.isArray(t)&&h(t[0]),x={ease:b(.25,.1,.25,1),"ease-in":b(.42,0,1,1),"ease-in-out":b(.42,0,.58,1),"ease-out":b(0,0,.58,1)},A=/\((.*?)\)/;function D(t){if(T(t))return t;if(S(t))return b(...t);if(x[t])return x[t];if(t.startsWith("steps")){const e=A.exec(t);if(e){const t=e[1].split(",");return((t,e="end")=>n=>{const i=(n="end"===e?Math.min(n,.999):Math.max(n,.001))*t,a="end"===e?Math.floor(i):Math.ceil(i);return y(0,1,a/t)})(parseFloat(t[0]),t[1].trim())}}return a}class k{constructor(e,n=[0,1],{easing:i,duration:r=t.duration,delay:s=t.delay,endDelay:o=t.endDelay,repeat:c=t.repeat,offset:l,direction:h="normal",autoplay:g=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=a,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise(((t,e)=>{this.resolve=t,this.reject=e})),i=i||t.easing,u(i)){const t=i.createAnimation(n);i=t.easing,n=t.keyframes||n,r=t.duration||r}this.repeat=c,this.easing=d(i)?a:D(i),this.updateDuration(r);const v=function(t,e=function(t){const e=[0];return m(e,t-1),e}(t.length),n=a){const i=t.length,r=i-e.length;return r>0&&m(e,r),a=>{let r=0;for(;r<i-2&&!(a<e[r+1]);r++);let s=y(0,1,p(e[r],e[r+1],a));const o=function(t,e){return d(t)?t[((t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t})(0,t.length,e)]:t}(n,r);return s=o(s),f(t[r],t[r+1],s)}}(n,l,d(i)?i.map(D):a);this.tick=t=>{var n;let i=0;i=void 0!==this.pauseTime?this.pauseTime:(t-this.startTime)*this.rate,this.t=i,i/=1e3,i=Math.max(i-s,0),"finished"===this.playState&&void 0===this.pauseTime&&(i=this.totalDuration);const a=i/this.duration;let r=Math.floor(a),c=a%1;!c&&a>=1&&(c=1),1===c&&r--;const l=r%2;("reverse"===h||"alternate"===h&&l||"alternate-reverse"===h&&!l)&&(c=1-c);const u=i>=this.totalDuration?1:Math.min(c,1),d=v(this.easing(u));e(d),void 0===this.pauseTime&&("finished"===this.playState||i>=this.totalDuration+o)?(this.playState="finished",null===(n=this.resolve)||void 0===n||n.call(this,d)):"idle"!==this.playState&&(this.frameRequestId=requestAnimationFrame(this.tick))},g&&this.play()}play(){const t=performance.now();this.playState="running",void 0!==this.pauseTime?this.startTime=t-this.pauseTime:this.startTime||(this.startTime=t),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var t;this.playState="idle",void 0!==this.frameRequestId&&cancelAnimationFrame(this.frameRequestId),null===(t=this.reject)||void 0===t||t.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(t){this.duration=t,this.totalDuration=t*(this.repeat+1)}get currentTime(){return this.t}set currentTime(t){void 0!==this.pauseTime||0===this.rate?this.pauseTime=t:this.startTime=performance.now()-t/this.rate}get playbackRate(){return this.rate}set playbackRate(t){this.rate=t}}class O{setAnimation(t){this.animation=t,null==t||t.finished.then((()=>this.clearAnimation())).catch((()=>{}))}clearAnimation(){this.animation=this.generator=void 0}}const M=new WeakMap;function E(t){return M.has(t)||M.set(t,{transforms:[],values:new Map}),M.get(t)}const j=["","X","Y","Z"],R={x:"translateX",y:"translateY",z:"translateZ"},P={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},_={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:P,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:a},skew:P},q=new Map,I=t=>`--motion-${t}`,V=["x","y","z"];["translate","scale","rotate","skew"].forEach((t=>{j.forEach((e=>{V.push(t+e),q.set(I(t+e),_[t])}))}));const $=(t,e)=>V.indexOf(t)-V.indexOf(e),B=new Set(V),F=t=>B.has(t),U=t=>t.sort($).reduce(C,"").trim(),C=(t,e)=>`${t} ${e}(var(${I(e)}))`,W=t=>t.startsWith("--"),z=new Set,Y=(t,e)=>document.createElement("div").animate(t,e),L={cssRegisterProperty:()=>"undefined"!=typeof CSS&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Y({opacity:[1]})}catch(t){return!1}return!0},finished:()=>Boolean(Y({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{Y({opacity:0},{easing:"linear(0, 1)"})}catch(t){return!1}return!0}},K={},N={};for(const t in L)N[t]=()=>(void 0===K[t]&&(K[t]=L[t]()),K[t]);const X=(e,n)=>T(e)?N.linearEasing()?`linear(${((t,e)=>{let n="";const i=Math.round(e/.015);for(let e=0;e<i;e++)n+=t(p(0,i-1,e))+", ";return n.substring(0,n.length-2)})(e,n)})`:t.easing:S(e)?Z(e):e,Z=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function G(t){return R[t]&&(t=R[t]),F(t)?I(t):t}const H=(t,e)=>{e=G(e);let n=W(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&0!==n){const t=q.get(e);t&&(n=t.initialValue)}return n},J=(t,e,n)=>{e=G(e),W(e)?t.style.setProperty(e,n):t.style[e]=n};function Q(n,s,o,c={},l){const f=window.__MOTION_DEV_TOOLS_RECORD,p=!1!==c.record&&f;let m,{duration:y=t.duration,delay:g=t.delay,endDelay:v=t.endDelay,repeat:w=t.repeat,easing:b=t.easing,persist:S=!1,direction:x,offset:A,allowWebkitAcceleration:D=!1,autoplay:k=!0}=c;const M=E(n),j=F(s);let P=N.waapi();j&&((t,e)=>{R[e]&&(e=R[e]);const{transforms:n}=E(t);var i,a;a=e,-1===(i=n).indexOf(a)&&i.push(a),t.style.transform=U(n)})(n,s);const _=G(s),I=function(t,e){return t.has(e)||t.set(e,new O),t.get(e)}(M.values,_),V=q.get(_);return r(I.animation,!(u(b)&&I.generator)&&!1!==c.record),()=>{const t=()=>{var t,e;return null!==(e=null!==(t=H(n,_))&&void 0!==t?t:null==V?void 0:V.initialValue)&&void 0!==e?e:0};let r=function(t,e){for(let n=0;n<t.length;n++)null===t[n]&&(t[n]=n?t[n-1]:e());return t}((t=>Array.isArray(t)?t:[t])(o),t);const O=function(t,e){var n;let i=(null==e?void 0:e.toDefaultUnit)||a;const r=t[t.length-1];if("string"==typeof r){const t=(null===(n=r.match(/(-?[\d.]+)([a-z%]*)/))||void 0===n?void 0:n[2])||"";t&&(i=e=>e+t)}return i}(r,V);if(u(b)){const e=b.createAnimation(r,"opacity"!==s,t,_,I);b=e.easing,r=e.keyframes||r,y=e.duration||y}if(W(_)&&(N.cssRegisterProperty()?function(t){if(!z.has(t)){z.add(t);try{const{syntax:e,initialValue:n}=q.has(t)?q.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch(t){}}}(_):P=!1),j&&!N.linearEasing()&&(T(b)||d(b)&&b.some(T))&&(P=!1),P){V&&(r=r.map((t=>h(t)?V.toDefaultUnit(t):t))),1!==r.length||N.partialKeyframes()&&!p||r.unshift(t());const a={delay:e(g),duration:e(y),endDelay:e(v),easing:d(b)?void 0:X(b,y),direction:x,iterations:w+1,fill:"both"};m=n.animate({[_]:r,offset:A,easing:d(b)?b.map((t=>X(t,y))):void 0},a),m.finished||(m.finished=new Promise(((t,e)=>{m.onfinish=t,m.oncancel=e})));const s=r[r.length-1];m.finished.then((()=>{S||(J(n,_,s),m.cancel())})).catch(i),D||(m.playbackRate=1.000001)}else if(l&&j)r=r.map((t=>"string"==typeof t?parseFloat(t):t)),1===r.length&&r.unshift(parseFloat(t())),m=new l((t=>{J(n,_,O?O(t):t)}),r,Object.assign(Object.assign({},c),{duration:y,easing:b}));else{const t=r[r.length-1];J(n,_,V&&h(t)?V.toDefaultUnit(t):t)}return p&&f(n,s,r,{duration:y,delay:g,easing:b,repeat:w,offset:A},"motion-one"),I.setAnimation(m),m&&!k&&m.pause(),m}}const tt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function et(t,e){var n;return"string"==typeof t?e?(null!==(n=e[t])&&void 0!==n||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}function nt(t,e,n){return T(t)?t(e,n):t}const it=(at=k,function(t,e,n={}){const i=(t=et(t)).length;Boolean(i),Boolean(e);const a=[];for(let r=0;r<i;r++){const s=t[r];for(const t in e){const o=tt(n,t);o.delay=nt(o.delay,r,i);const c=Q(s,t,e[t],o,at);a.push(c)}}return o(a,n,n.duration)});var at;function rt(t,e={}){return o([()=>{const n=new k(t,[0,1],e);return n.finished.catch((()=>{})),n}],e,e.duration)}function st(t,e,n){return(T(t)?rt:it)(t,e,n)}const ot={any:0,all:1};function ct(t,e,{root:n,margin:i,amount:a="any"}={}){if("undefined"==typeof IntersectionObserver)return()=>{};const r=et(t),s=new WeakMap,o=new IntersectionObserver((t=>{t.forEach((t=>{const n=s.get(t.target);if(t.isIntersecting!==Boolean(n))if(t.isIntersecting){const n=e(t);T(n)?s.set(t.target,n):o.unobserve(t.target)}else n&&(n(t),s.delete(t.target))}))}),{root:n,rootMargin:i,threshold:"number"==typeof a?a:ot[a]});return r.forEach((t=>o.observe(t))),()=>o.disconnect()}var lt=function(t){st(t,{opacity:[0,.5,1]},{duration:4})};lt(".title-one"),st(".paragraph-one",{transform:"translateY(-2em)"},{duration:2}),ct(".line3",(function(){setTimeout((function(){st(".animateLine-four",{display:"flex"})}),5e3),setTimeout((function(){st(".card-title_three",{display:"block"}),st(".card-text_three",{display:"block"}),lt(".card-title_three"),lt(".card-text_three")}),7e3)})),ct(".second-card",(function(t){ct(".card-title_one",(function(){st(".animateLine-three",{display:"flex"})})),lt(".card-title_two"),lt(".secondcard-paragraph"),st(".card-title_two",{color:"#508A59"},{duration:7}),st(".second-card",{transform:"translateY(-90%)"},{duration:3}),document.querySelector(".first-card"),st(".card-lines",{opacity:[1,0]},{duration:.5})})),ct(".java-container",(function(){lt(".java-container")})),ct(".python-container",(function(){lt(".python-container")})),ct(".javascript-container",(function(){lt(".javascript-container")}))})();