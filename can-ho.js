// Trang "Căn hộ" (#can-ho): căn còn hàng của từng dự án, chia theo dự án.
// Lấy từ window.bydesoFeed.items (cùng dữ liệu với sa bàn và trang dự án) nên số liệu luôn khớp.
(function(){
const root=document.getElementById('chRoot'); if(!root)return;
const en=()=>document.documentElement.lang==='en', L=(v,e)=>en()?e:v;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ORDER=['Studio','1PN','1PN+1','1.5PN','2PN','3PN'];
const tEn=t=>t.replace('PN','BR');
// Ghi chú nguồn dữ liệu theo dự án
const NOTE={
  'The Camellia Sơn Trà':['Giá và tình trạng căn là minh họa (trừ căn CH-0301 là dữ liệu thật).','Prices and availability are illustrative (except unit CH-0301, which is real).'],
  'The Legend Danang':['Theo giỏ hàng chủ đầu tư ngày 05/05/2026, giá đã gồm VAT và phí bảo trì.','From the developer’s inventory list of 5 May 2026; prices include VAT and maintenance fee.']
};
const PER=6;
let pf='', tf='';
const spread=(a,n)=>{a=[...a].sort((p,q)=>p.d3.floor-q.d3.floor||(p.d3.idx||0)-(q.d3.idx||0));return a.length<=n?a:Array.from({length:n},(_,i)=>a[Math.floor((i+.5)*a.length/n)])};
function pick(av){
  if(tf)return spread(av.filter(it=>it.d3.type===tf),PER);
  const real=av.filter(it=>it.d3.real&&!it.d3.src), rest=av.filter(it=>!real.includes(it));
  const types=ORDER.filter(t=>rest.some(it=>it.d3.type===t));
  const lists=types.map(t=>spread(rest.filter(it=>it.d3.type===t),PER)), out=[...real];
  for(let i=0;out.length<PER&&lists.some(l=>l[i]);i++)lists.forEach(l=>{if(l[i]&&out.length<PER)out.push(l[i])});
  return out.sort((p,q)=>(q.d3.real&&!q.d3.src)-(p.d3.real&&!p.d3.src)||ORDER.indexOf(p.d3.type)-ORDER.indexOf(q.d3.type)||p.d3.floor-q.d3.floor);
}
function render(){
  if(location.hash!=='#can-ho')return;
  const F=window.bydesoFeed, PJ=window.bydesoProjects; if(!F||!PJ)return;
  const facts=PJ.facts||{}, all=F.items.filter(it=>it.d3&&it.d3.status==='ok');
  const projs=PJ.projects.map(p=>p.n).filter(n=>all.some(it=>it.pj===n));
  const types=ORDER.filter(t=>all.some(it=>it.d3.type===t&&(!pf||it.pj===pf)));
  if(tf&&!types.includes(tf))tf='';
  root.innerHTML='<div class="ch-head"><h2 class="h-accent" style="color:var(--text)">'+L('Căn hộ còn hàng','Available apartments')+'</h2><p class="feed-sub">'+L('Một số căn đang còn trong kho của Bydeso, chia theo từng dự án. Bấm vào căn để xem chi tiết.','Some of the units Bydeso currently has available, grouped by project. Tap a unit for details.')+'</p></div>'+
    '<div class="feed-chips" role="group" aria-label="'+L('Lọc theo dự án','Filter by project')+'">'+[['',L('Tất cả dự án','All projects')]].concat(projs.map(n=>[n,n])).map(([v,l])=>'<button type="button" data-pf="'+esc(v)+'" aria-pressed="'+(v===pf)+'">'+esc(l)+'</button>').join('')+'</div>'+
    '<div class="feed-chips" role="group" aria-label="'+L('Lọc theo loại căn','Filter by unit type')+'">'+[['',L('Mọi loại căn','All types')]].concat(types.map(t=>[t,en()?tEn(t):t])).map(([v,l])=>'<button type="button" data-tf="'+esc(v)+'" aria-pressed="'+(v===tf)+'">'+esc(l)+'</button>').join('')+'</div>'+
    '<div id="chGroups"></div>';
  const box=root.querySelector('#chGroups');
  (pf?[pf]:projs).forEach(n=>{
    const av=all.filter(it=>it.pj===n), shown=pick(av), fa=facts[n]||[], slug=(window.bydeso3D&&window.bydeso3D.hash(n)||'').replace(/^3d\//,'');
    const sec=document.createElement('section');sec.className='ch-group';
    sec.innerHTML='<div class="ch-ghead"><div><span class="ch-kick">'+L('Dự án','Project')+'</span><h3>'+esc(n)+'</h3><p>'+esc([fa[en()?3:2],fa[en()?1:0]].filter(Boolean).join(' · '))+'</p></div>'+
      '<div class="ch-gside"><b>'+av.length+'</b><span>'+L('căn còn hàng','units available')+'</span><a class="btn btn-ghost" href="#da/'+esc(slug)+'">'+L('Thông tin dự án','Project details')+' →</a></div></div>'+
      '<p class="ch-note">'+esc(L(...(NOTE[n]||['',''])))+'</p><div class="feed-grid ch-grid"></div>'+
      (tf&&!shown.length?'<p class="feed-empty">'+L('Dự án này hiện chưa có căn '+tf+' còn hàng.','No '+tEn(tf)+' units available in this project right now.')+'</p>':'');
    const g=sec.querySelector('.ch-grid');shown.forEach(it=>g.append(F.card(it)));
    box.append(sec);
  });
  root.querySelectorAll('[data-pf]').forEach(b=>b.onclick=()=>{pf=b.dataset.pf;render()});
  root.querySelectorAll('[data-tf]').forEach(b=>b.onclick=()=>{tf=b.dataset.tf;render()});
}
window.addEventListener('hashchange',render);
document.querySelectorAll('.lang-switch button').forEach(b=>b.addEventListener('click',()=>setTimeout(render)));
render();
window.bydesoCanHo={render};
})();
