const miJuego=(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"];let r=[];const o=document.querySelector("#btnNuevo"),s=document.querySelector("#btnPedir"),l=document.querySelector("#btnDetener"),c=document.querySelectorAll("small");let d=document.querySelectorAll(".divCartas");const a=(t=2)=>{e=i(),console.log({numJugadores:t});for(let e=0;e<t;e++)r.push(0);c.forEach(e=>e.innerText=0),d.forEach(e=>e.innerHTML="")},i=()=>{e=[];for(let n=2;n<=10;n++)for(let r of t)e.push(n+r);for(let r of t)for(let t of n)e.push(t+r);return _.shuffle(e)},u=()=>{do{f(r.length-1)}while(0!=r[1]&&r[1]<=r[0]);l.disabled=!0,setTimeout(b(),10)},b=()=>{r[0]>r[1]?c[0].innerHTML+="<b> GANADOR!!</b>":c[1].innerHTML+="<b> GANADOR!!</b>"},f=t=>{const n=(()=>{if(0===e.length)throw"No quedan cartas";return e.pop()})(),o=document.createElement("img");o.src=`assets/cartas/${n}.png`,o.classList.add("carta"),d[t].append(o),r[t]+=(e=>{const t=e.substring(0,e.length-1);let n=0;return n=isNaN(t)?"A"===t?11:10:1*t})(n),c[t].innerText=r[t],r[t]>21?(console.warn("Te has pasado de 21"),s.disabled=!0,c[t].innerHTML="<b>Límite superado</b>",r[t]=0,0==t&&u()):21===r[t]&&(console.log("GENIAL!"),0==t&&u())};return s.addEventListener("click",()=>{f(0)}),l.addEventListener("click",()=>{s.disabled=!0,l.disabled=!0,u()}),o.addEventListener("click",()=>{a();for(let e=0;e<2;e++)r[e]=0,c[e].innerText=0,d[e].innerHTML="";s.disabled=!1,l.disabled=!1}),{nuevoJuego:a}})();