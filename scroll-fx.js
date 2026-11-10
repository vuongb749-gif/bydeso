// Hiệu ứng cuộn của trang chủ. Chỉ đọc dữ liệu thật trong camellia-units.js, không gửi gì đi đâu.
(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement,calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const T=(a,b)=>root.lang==='en'?b:a,clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const FACE={TN:['Tây Nam','Southwest'],'ĐN':['Đông Nam','Southeast'],'ĐB':['Đông Bắc','Northeast'],TB:['Tây Bắc','Northwest'],SAN:['Sân trong','Courtyard']};
const TYPE={Studio:'Studio','1.5PN':'1.5BR','2PN':'2BR','3PN':'3BR'};
const P=(window.BYDESO_3D||{}).P||{slots:[]},SL=P.slots;

// ---- Hiện dần khi cuộn tới ----
if(!calm)root.classList.add('sx-on');
const rv=['#loai-hinh .center','.types .type','#du-an-noi-bat .feed-head','#homeGrid','#dang-ky .cta'].flatMap(s=>$$(s));
rv.forEach(e=>e.classList.add('sx-r'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
$$('.sx-r').forEach(e=>io.observe(e));

// ---- Bốn bước vận hành ----
const steps=$$('.vh-step'),panels=$$('.vh-p'),Q='căn hộ sơn trà dưới 3 tỷ';
const qEl=$('#vpQ'),chips=$$('#vpChips>span'),topics=$$('#vpTopics li'),read=$('#vpRead');
const svg=$('#vpPlan');let hover=-1,slot=-1;
const sayS=i=>{if(!read||!SL[i])return;const s=SL[i];read.textContent=T('Căn ','Unit ')+s[7]+' · '+(root.lang==='en'?TYPE[s[4]]||s[4]:s[4])+' · '+String(s[5]).replace('.',root.lang==='en'?'.':',')+T(' m² thông thủy · Hướng ',' m² net · Facing ')+s[6].map(f=>T(FACE[f][0],FACE[f][1])).join(', ')};
const pick=i=>{if(i===slot)return;slot=i;svg.querySelectorAll('rect').forEach((r,k)=>r.classList.toggle('on',k===i));sayS(i)};
if(svg&&SL.length){
  svg.setAttribute('viewBox','-.5 -.5 56.5 49');
  svg.innerHTML=SL.map((s,i)=>'<rect x="'+s[0]+'" y="'+s[1]+'" width="'+(s[2]-s[0])+'" height="'+(s[3]-s[1])+'" rx=".35" data-i="'+i+'"></rect>').join('');
  svg.addEventListener('pointerover',e=>{if(e.target.tagName==='rect'){hover=+e.target.dataset.i;pick(hover)}});
  svg.addEventListener('pointerleave',()=>{hover=-1});
}
const vpTry=$('#vpTry');
if(vpTry)vpTry.onclick=()=>{const i=$('#srchQ');if(!i)return;i.value=Q;i.dispatchEvent(new Event('input',{bubbles:true}));window.scrollTo({top:0,behavior:calm?'instant':'smooth'});i.focus({preventScroll:true})};
function stepsFrame(){
  if(!steps.length||!steps[0].offsetHeight)return;
  const stage=$('.vh-stage'),ph=matchMedia('(max-width:860px)').matches;
  const line=ph?stage.getBoundingClientRect().bottom+110:innerHeight*.5;
  let cur=0,loc=0;steps.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<=line){cur=i;loc=clamp((line-r.top)/r.height)}});
  steps.forEach((s,i)=>s.classList.toggle('on',i===cur));panels.forEach((p,i)=>p.classList.toggle('on',i===cur));
  const k=calm?1:loc;
  if(qEl){const n=cur>0?Q.length:Math.round(clamp(k/.55)*Q.length);if(qEl.dataset.n!=n){qEl.dataset.n=n;qEl.textContent=Q.slice(0,n)}}
  chips.forEach((c,i)=>c.classList.toggle('on',cur>0||k>.6+i*.1));
  if(cur===2&&hover<0&&SL.length)pick(clamp(Math.floor(k*SL.length),0,SL.length-1));
  topics.forEach((t,i)=>t.classList.toggle('on',cur===3&&k>=.12+i*.16||cur>3));
}

// ---- Xoay dự án 360 độ: khung hình chụp từ chính sa bàn ----
const N=48,pk=$('#xoay-3d'),cv=$('#pkCv');
const ctx=cv&&cv.getContext('2d'),imgs=[];let floor=null,loaded=false,tgt=0,now=0,raf=0,lastK='';
const lowData=()=>innerWidth<760||(navigator.connection&&navigator.connection.saveData);
const name=i=>'sa-ban-xoay/f'+String(i).padStart(2,'0')+'.webp';
const add=(src,cb)=>{const m=new Image();m.decoding='async';m.onload=()=>{cb&&cb(m);paint(true)};m.src=src;return m};
function loadAll(){if(loaded||!pk)return;loaded=true;const step=lowData()?2:1;
  imgs[0]=add(name(0));
  floor=add('sa-ban-xoay/floor.webp');
  if(calm)return;
  for(let i=step;i<N;i+=step)imgs[i]=add(name(i));
}
const ready=i=>{const m=imgs[i];return m&&m.complete&&m.naturalWidth};
const near=i=>{for(let d=0;d<N;d++){const a=(i+d)%N,b=(i-d+N)%N;if(ready(a))return imgs[a];if(ready(b))return imgs[b]}return null};
const cover=(m,al)=>{const W=cv.width,H=cv.height,s=Math.max(W/m.naturalWidth,H/m.naturalHeight),w=m.naturalWidth*s,h=m.naturalHeight*s;ctx.globalAlpha=al;ctx.drawImage(m,(W-w)/2,(H-h)/2,w,h);ctx.globalAlpha=1};
function fit(){if(!cv)return;const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);if(!r.width)return;const W=Math.round(r.width*d),H=Math.round(r.height*d);if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H;lastK=''}}
const ROT_END=.62,FADE_END=.72;
const faceAt=rot=>{const a=Math.atan2(-118,208)+rot*Math.PI*2,s=Math.sin(a),c=Math.cos(a);return Math.abs(c)>=Math.abs(s)?(c>0?'TN':'ĐB'):(s>0?'ĐN':'TB')};
let lastFace='';
function say(rot,force){const f=faceAt(rot);if(f===lastFace&&!force)return;lastFace=f;$('#pkFace').textContent=T(FACE[f][0],FACE[f][1]);const n=SL.filter(s=>s[6].includes(f)).length;$('#pkCount').textContent=n?T(n+' căn mỗi tầng có mặt quay về hướng này',n+' units per floor face this way'):''}
function paint(force){
  if(!ctx)return;const p=calm?0:now,rot=clamp(p/ROT_END),idx=Math.min(N-1,Math.floor(rot*N)),fade=clamp((p-ROT_END)/(FADE_END-ROT_END));
  const c=p<ROT_END?0:p<.86?1:2,key=idx+'|'+fade.toFixed(3)+'|'+c;if(key===lastK&&!force)return;lastK=key;
  const m=near(idx);if(m&&fade<1)cover(m,1);if(fade>0&&ready2(floor))cover(floor,fade);
  $('.pk-view').style.setProperty('--rot',rot.toFixed(4));say(rot);
  $$('.pk-c').forEach((e,i)=>e.classList.toggle('on',i===c));
  $('#pkNote').classList.toggle('on',fade>.5);$('.pk-rule').style.opacity=1-fade;$('.pk-read').style.opacity=1-fade;
}
const ready2=m=>m&&m.complete&&m.naturalWidth;
function pkFrame(){
  if(!pk||!pk.offsetHeight)return;const r=pk.getBoundingClientRect(),H=r.height-(innerHeight-hd);tgt=clamp((hd-r.top)/H);
  if(calm){now=0;paint();return}
  if(!raf)raf=requestAnimationFrame(run);
}
function run(){raf=0;const d=tgt-now;now=Math.abs(d)<.0006?tgt:now+d*.18;paint();if(now!==tgt)raf=requestAnimationFrame(run)}
if(pk){new IntersectionObserver(es=>{if(es[0].isIntersecting){loadAll();fit();paint(true)}},{rootMargin:'120% 0px'}).observe(pk)}

// ---- Dịch ảnh trong thẻ loại hình và thanh tiến độ đọc ----
const types=$$('.type');
function typesFrame(){if(calm)return;types.forEach(t=>{const r=t.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.height)return;t.style.setProperty('--par',((innerHeight/2-(r.top+r.height/2))/innerHeight*r.height*.14).toFixed(1)+'px')})}
const bar=$('.sx-bar');
function barFrame(){if(!bar)return;const m=root.scrollHeight-innerHeight;root.style.setProperty('--sx',m>0?(scrollY/m).toFixed(4):0)}

// ---- Họa tiết trống đồng: chim Lạc bay ngược chiều kim đồng hồ, chỗ con trỏ đi qua sáng lên và lay nhẹ ----
(function(){
  // Chủ trang chọn cho họa tiết luôn chuyển động, kể cả khi máy tắt hiệu ứng hoạt hình
  const rings=$$('.dr'),lit=$('.dr-lit'),inner=$('.dr-lit-in');if(rings.length<2)return;
  const R=260,SPEED=1.1;
  let ang=0,last=performance.now(),tx=-999,ty=-999,x=tx,y=ty,sway=0,dx=0,dy=0,idle=0;
  addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;if(tx<0){x=e.clientX;y=e.clientY}sway=clamp(sway+(e.clientX-tx)*.012,-1.6,1.6);tx=e.clientX;ty=e.clientY;lit.classList.add('on');clearTimeout(idle);idle=setTimeout(()=>lit.classList.remove('on'),1600)},{passive:true});
  document.documentElement.addEventListener('mouseleave',()=>lit.classList.remove('on'));
  function spin(now){
    requestAnimationFrame(spin);
    const dt=Math.min(.05,(now-last)/1000);last=now;
    if(document.body.classList.contains('in-3d'))return;
    ang-=dt*SPEED;sway*=Math.pow(.05,dt);
    const on=tx>=0,wx=on?(tx/innerWidth-.5)*-16:0,wy=on?(ty/innerHeight-.5)*-12:0;
    dx+=(wx-dx)*.06;dy+=(wy-dy)*.06;x+=(tx-x)*.14;y+=(ty-y)*.14;
    const a=ang-scrollY*.01,base='translate3d('+dx.toFixed(2)+'px,'+dy.toFixed(2)+'px,0) rotate(';
    rings[0].style.transform=base+a.toFixed(3)+'deg)';
    if(on){rings[1].style.transform=base+(a+sway).toFixed(3)+'deg)';lit.style.transform='translate3d('+(x-R).toFixed(1)+'px,'+(y-R).toFixed(1)+'px,0)';inner.style.transform='translate3d('+(R-x).toFixed(1)+'px,'+(R-y).toFixed(1)+'px,0)'}
  }
  requestAnimationFrame(spin);
})();

let hd=68,tick=false;
function measure(){const h=$('header');hd=h?h.offsetHeight:68;root.style.setProperty('--hd',hd+'px');fit();paint(true);frame()}
function frame(){tick=false;stepsFrame();pkFrame();typesFrame();barFrame()}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
addEventListener('resize',measure);
addEventListener('hashchange',()=>setTimeout(measure,60));
document.querySelectorAll('.lang-switch button').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{if(SL.length&&slot>=0)sayS(slot);if(lastFace)say(clamp(now/ROT_END),true)},0)));
measure();
if(SL.length&&svg)pick(0);
say(0,true);
})();
