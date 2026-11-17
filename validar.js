// Comprueba datos.json antes de subirlo:  node validar.js
const fs=require("fs");
const CATS=["transporte","servicios","salud","geo","clima","human"];
let j;try{j=JSON.parse(fs.readFileSync("datos.json","utf8"))}catch(e){console.error("JSON no válido: "+e.message);process.exit(1)}
const err=[];
if(isNaN(Date.parse(j.actualizado)))err.push("actualizado no es una fecha ISO");
if(!Array.isArray(j.eventos)||!j.eventos.length)err.push("eventos vacío o ausente");
const ids=new Set();
(j.eventos||[]).forEach((e,n)=>{const w=m=>err.push(`evento ${n} (${e&&e.id}): ${m}`);
  if(typeof e.id!=="string"||!/^[a-z0-9-]+$/.test(e.id))w("id debe ser minúsculas, números y guiones");
  if(ids.has(e.id))w("id repetido");ids.add(e.id);
  if(!CATS.includes(e.cat))w("cat desconocida");
  if(![1,2,3,4].includes(e.sev))w("sev debe ser 1-4");
  if(typeof e.t!=="string"||!e.t.trim()||e.t.length>90)w("t (título) vacío o de más de 90 caracteres");
  if(typeof e.p!=="string")w("p (lugar) ausente");
  if(typeof e.st!=="string"||e.st.length>24)w("st (estado) ausente o demasiado largo");
  if(typeof e.s!=="string"||e.s.length>420)w("s (resumen) ausente o de más de 420 caracteres");
  const d=typeof e.d==="string"?Date.parse(e.d.length>10?e.d:e.d+"T12:00:00Z"):NaN;
  if(isNaN(d))w("d no es fecha ISO");else if(d>Date.now()+36*36e5)w("d está en el futuro");
  if(!((e.lat===null&&e.lon===null)||(typeof e.lat==="number"&&typeof e.lon==="number"&&Math.abs(e.lat)<=90&&Math.abs(e.lon)<=180)))w("lat/lon no válidos");
  if(!Array.isArray(e.f)||e.f.length>3||!e.f.every(x=>Array.isArray(x)&&x.length===2&&x.every(y=>typeof y==="string")))w("f debe ser hasta 3 pares [valor, etiqueta]");
  if(!Array.isArray(e.src)||!e.src.length||e.src.length>3||!e.src.every(x=>Array.isArray(x)&&typeof x[0]==="string"&&/^https?:\/\//.test(x[1]||"")))w("src debe ser 1-3 pares [nombre, url http(s)]");
});
if(err.length){console.error(err.join("\n"));process.exit(1)}
console.log("datos.json correcto: "+j.eventos.length+" fichas, actualizado "+j.actualizado);
