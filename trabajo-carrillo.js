const photos=[{src:'assets/trabajos/carrillo/vivienda.jpg',title:'Lámina 1 · Planta de vivienda amueblada'},{src:'assets/trabajos/carrillo/escalas-bano.jpg',title:'Lámina 2 · Baño a escalas 1:200, 1:50 y 1:20'}];
let index=0,zoom=1;
const $=id=>document.getElementById(id);
function resize(){ $('sheet').style.width=`${zoom*100}%`;$('zoom').textContent=`${Math.round(zoom*100)} %`;$('minus').disabled=zoom<=1;$('plus').disabled=zoom>=4;}
function show(){const photo=photos[index];$('photo').src=photo.src;$('photo').alt=`Carrillo: ${photo.title}`;$('caption').textContent=photo.title;$('counter').textContent=`${index+1} de ${photos.length}`;$('status').textContent='';zoom=1;resize();$('viewport').scrollTo(0,0);}
$('previous').onclick=()=>{index=(index+photos.length-1)%photos.length;show()};
$('next').onclick=()=>{index=(index+1)%photos.length;show()};
$('plus').onclick=()=>{zoom=Math.min(4,zoom+.5);resize()};
$('minus').onclick=()=>{zoom=Math.max(1,zoom-.5);resize()};
$('fit').onclick=()=>{zoom=1;resize();$('viewport').scrollTo(0,0)};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('viewer').requestFullscreen()}catch{$('status').textContent='Podés seguir ampliando la lámina con los botones + y −.'}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Salir de pantalla completa':'Pantalla completa'});
$('photo').onerror=()=>{$('status').textContent='No se pudo cargar la fotografía. Recargá la página para volver a intentar.'};
show();
