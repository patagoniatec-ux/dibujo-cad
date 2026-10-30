import {dataReady,esc,safeURL} from './app.js?v=expo-2';
const $=id=>document.getElementById(id);
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
const dialog=document.createElement('dialog');dialog.className='expo-view';document.body.append(dialog);
let selected,zoom=100,previousFocus;
function close(){dialog.close();previousFocus?.focus()}
dialog.addEventListener('close',()=>{dialog.innerHTML='';previousFocus?.focus()});
function open(item){
selected=item;zoom=100;previousFocus=document.activeElement;
const image=safeURL(item.image),url=safeURL(item.url);
dialog.innerHTML=`<div class="expo-toolbar"><h2>${esc(item.student||item.title)}</h2><button class="small-btn" id="expo-close" aria-label="Cerrar lámina">Cerrar ×</button></div><p>${esc(item.course)}${item.description?' · '+esc(item.description):''}</p><div class="expo-toolbar"><label>Ampliar <input id="expo-zoom" type="range" min="50" max="300" step="25" value="100"></label><output id="expo-percent">100 %</output><button class="small-btn" id="expo-reset">Ajustar</button><button class="small-btn" id="expo-full">Pantalla completa</button>${url?`<a class="button secondary" href="${esc(url)}" target="_blank" rel="noopener">Ver PDF / más láminas ↗</a>`:''}</div><div class="expo-stage" id="expo-stage"><img id="expo-photo" src="${esc(image)}" alt="${esc(item.title)}"></div>`;
dialog.showModal();$('expo-close').onclick=close;
const photo=$('expo-photo'),stage=$('expo-stage');
const fit=()=>{const rotated=item.imageRotation===-90;photo.style.width=zoom+'%';photo.style.transform='';$('expo-zoom').value=zoom;$('expo-percent').textContent=zoom+' %'};
$('expo-zoom').oninput=e=>{zoom=Number(e.target.value);fit()};
$('expo-reset').onclick=()=>{zoom=100;fit();stage.scrollTo(0,0)};
$('expo-full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await dialog.requestFullscreen()}catch{$('expo-full').textContent='Usá ampliar para recorrer la lámina'}};
if(item.imageRotation===-90){photo.onload=()=>{photo.onload=null;try{const canvas=document.createElement('canvas');canvas.width=photo.naturalHeight;canvas.height=photo.naturalWidth;const ctx=canvas.getContext('2d');ctx.translate(0,canvas.height);ctx.rotate(-Math.PI/2);ctx.drawImage(photo,0,0);photo.src=canvas.toDataURL('image/jpeg',0.94)}catch{}};if(photo.complete)photo.onload()}fit();
}
try{
const data=await dataReady,items=[...(data.gallery||[])].sort((a,b)=>(a.student||a.title).localeCompare(b.student||b.title,'es'));
[...new Set(items.map(x=>x.course).filter(Boolean))].sort().forEach(c=>$('course').add(new Option(c,c)));
function render(){
const query=norm($('search').value),course=$('course').value;
const visible=items.filter(x=>(!course||x.course===course)&&norm([x.student,x.title,x.description,x.body,x.course].join(' ')).includes(query));
$('result-count').textContent=visible.length+' '+(visible.length===1?'trabajo':'trabajos');
$('listing').innerHTML=visible.map(x=>`<article class="card"><img src="${esc(safeURL(x.image))}" alt="${esc(x.title)}" loading="lazy"><div><h2 class="student-name">${esc(x.student||x.title)}</h2><span class="tag">${esc(x.course||'Dibujo Técnico')}</span><p>${esc(x.description||x.title)}</p><button class="button secondary" data-expo="${esc(x.id)}">Ver y ampliar lámina →</button></div></article>`).join('')||'<p class="empty">No encontramos trabajos. Probá con otro nombre o curso.</p>';
$('listing').querySelectorAll('[data-expo]').forEach(b=>b.onclick=()=>open(items.find(x=>x.id===b.dataset.expo)));
}
$('search').oninput=render;$('course').onchange=render;render();
}catch(e){$('result-count').textContent='No pudimos cargar los trabajos. Recargá la página.'}
