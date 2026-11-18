// Bảng "Đặt lịch tư vấn" mở từ nút "Nhận tư vấn dự án này" ở trang dự án.
// Gửi về Google Sheet qua window.bydesoSend, Loại yêu cầu "Đặt lịch tư vấn" (không cần sửa Apps Script):
// hoTen, sdt, email, duAn, kenh = hình thức tư vấn, noiDung = lịch hẹn · loại căn · ngân sách · ghi chú.
(function(){
const en=()=>document.documentElement.lang==='en', L=(v,e)=>en()?e:v;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const WAYS=[['call','Gọi điện thoại','Phone call'],['zalo','Zalo','Zalo'],['meet','Gặp trực tiếp, xem nhà mẫu','Meet in person, visit show unit']];
const SLOTS=[['Sáng (8h–11h)','Morning (8–11am)'],['Trưa (11h–14h)','Midday (11am–2pm)'],['Chiều (14h–17h)','Afternoon (2–5pm)'],['Tối (17h–20h)','Evening (5–8pm)']];
const BUDGET=[['Dưới 3 tỷ','Under 3B VND'],['3 – 5 tỷ','3–5B VND'],['5 – 10 tỷ','5–10B VND'],['10 – 15 tỷ','10–15B VND'],['Trên 15 tỷ','Over 15B VND'],['Chưa xác định','Not sure yet']];
const ORDER=['Studio','1PN','1PN+1','1.5PN','2PN','3PN'];
let box=null, last=null;
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
function typesOf(n){
  const D=window.bydeso3D&&window.bydeso3D.data&&window.bydeso3D.data(n);
  const u=D?D.units:(window.bydesoFeed?window.bydesoFeed.items.filter(it=>it.pj===n).map(it=>it.d3):[]);
  return ORDER.filter(t=>u.some(x=>x&&x.type===t));
}
function close(){if(!box)return;box.hidden=true;document.removeEventListener('keydown',onKey);if(last&&last.focus)last.focus()}
function onKey(e){if(e.key==='Escape')close()}
function open(n){
  last=document.activeElement;
  if(!box){box=document.createElement('div');box.className='prov-overlay dl-ov';box.id='dlModal';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-labelledby','dlTitle');document.body.append(box);
    box.addEventListener('click',e=>{if(e.target===box)close()})}
  const types=typesOf(n), tmr=new Date(Date.now()+864e5);
  box.innerHTML='<div class="prov-box price-box dl-box"><div class="prov-head"><div><h3 id="dlTitle">'+L('Đặt lịch tư vấn','Book a consultation')+'</h3><p class="prov-sub">'+esc(n)+'</p></div>'+
    '<button type="button" class="prov-close" aria-label="'+L('Đóng','Close')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>'+
    '<form class="dl-form" novalidate>'+
    '<div class="dl-row"><label class="pf-field"><span>'+L('Họ và tên','Full name')+' *</span><input name="ten" type="text" autocomplete="name" required placeholder="'+L('VD: Nguyễn Văn An','e.g. Nguyen Van An')+'"></label>'+
    '<label class="pf-field"><span>'+L('Số điện thoại','Phone number')+' *</span><input name="sdt" type="tel" inputmode="tel" autocomplete="tel" required placeholder="'+L('VD: 0905 123 456','e.g. 0905 123 456')+'"></label></div>'+
    '<label class="pf-field"><span>'+L('Email nhận biên bản và thông tin sau buổi tư vấn','Email for the minutes and follow-up information')+' *</span><input name="email" type="email" inputmode="email" autocomplete="email" required placeholder="'+L('VD: ten@gmail.com','e.g. name@gmail.com')+'"></label>'+
    '<div class="pf-label fl-gap">'+L('Hình thức tư vấn','How to consult')+'</div><div class="fl-freq dl-ways">'+WAYS.map((w,i)=>'<label><input type="radio" name="cach" value="'+w[0]+'"'+(i?'':' checked')+'><span>'+L(w[1],w[2])+'</span></label>').join('')+'</div>'+
    '<div class="pf-label fl-gap">'+L('Lịch hẹn mong muốn','Preferred time')+'</div><div class="dl-row"><label class="pf-field dl-date"><span>'+L('Ngày','Date')+'</span><input name="ngay" type="date" min="'+ymd(new Date())+'" value="'+ymd(tmr)+'"></label></div>'+
    '<div class="fl-freq dl-slots">'+SLOTS.map((s,i)=>'<label><input type="radio" name="gio" value="'+i+'"'+(i?'':' checked')+'><span>'+L(s[0],s[1])+'</span></label>').join('')+'</div>'+
    (types.length?'<div class="pf-label fl-gap">'+L('Loại căn quan tâm','Unit types of interest')+' <span>'+L('(chọn một hoặc nhiều)','(one or more)')+'</span></div><div class="fl-topics dl-types">'+types.map(t=>'<label><input type="checkbox" value="'+t+'"><span>'+(en()?t.replace('PN','BR'):t)+'</span></label>').join('')+'</div>':'')+
    '<div class="pf-label fl-gap">'+L('Ngân sách dự kiến','Expected budget')+'</div><div class="fl-freq dl-budget">'+BUDGET.map((b,i)=>'<label><input type="radio" name="ns" value="'+i+'"'+(i===5?' checked':'')+'><span>'+L(b[0],b[1])+'</span></label>').join('')+'</div>'+
    '<label class="pf-field fl-gap dl-note"><span>'+L('Câu hỏi hoặc ghi chú cho chuyên viên','Questions or notes for the advisor')+'</span><textarea name="ghichu" rows="3" maxlength="200" placeholder="'+L('VD: muốn vay ngân hàng 70%, cần căn tầng cao','e.g. need a 70% bank loan, prefer a high floor')+'"></textarea></label>'+
    '<label class="consent fl-consent"><input type="checkbox" name="dongy"><span>'+L('Tôi đồng ý để Bydeso lưu và dùng thông tin trên để liên hệ tư vấn và gửi biên bản qua email, theo ','I agree that Bydeso may store and use this information to contact me and email the minutes, under the ')+'<a href="chinh-sach-bao-mat.html" target="_blank" rel="noopener">'+L('Chính sách bảo mật','Privacy Policy')+'</a>.</span></label>'+
    '<p class="pf-error" hidden></p><button type="submit" class="btn btn-primary pf-submit">'+L('Gửi yêu cầu đặt lịch','Send booking request')+'</button>'+
    '<p class="fl-privacy">'+L('Chuyên viên Bydeso sẽ gọi xác nhận lịch hẹn. Sau buổi tư vấn, biên bản những thông tin quan trọng được gửi vào email của bạn.','A Bydeso advisor will call to confirm. After the consultation, the minutes with the key points are sent to your email.')+'</p></form></div>';
  box.hidden=false;document.addEventListener('keydown',onKey);
  box.querySelector('.prov-close').onclick=close;
  const f=box.querySelector('form'), er=box.querySelector('.pf-error'), btn=f.querySelector('.pf-submit');
  const say=t=>{er.textContent=t;er.hidden=false};
  f.onsubmit=async e=>{
    e.preventDefault();er.hidden=true;
    const v=k=>(f.elements[k].value||'').trim(), sdt=v('sdt').replace(/[^\d+]/g,''), mail=v('email');
    if(!v('ten'))return say(L('Vui lòng nhập họ tên.','Please enter your name.'));
    if(!/^(\+?84|0)\d{8,10}$/.test(sdt))return say(L('Số điện thoại chưa đúng, vui lòng kiểm tra lại.','The phone number looks wrong, please check it.'));
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail))return say(L('Email chưa đúng, vui lòng kiểm tra lại.','The email looks wrong, please check it.'));
    if(!f.elements.dongy.checked)return say(L('Vui lòng đánh dấu đồng ý để Bydeso liên hệ.','Please tick the consent box so Bydeso can contact you.'));
    const way=WAYS.find(w=>w[0]===f.elements.cach.value), slot=SLOTS[+f.elements.gio.value], bud=BUDGET[+f.elements.ns.value];
    const d=v('ngay'), dd=d?d.split('-').reverse().join('/'):'';
    const tps=[...f.querySelectorAll('.dl-types input:checked')].map(i=>i.value);
    const noiDung=['Lịch hẹn: '+(dd?dd+', ':'')+slot[0],tps.length?'Loại căn: '+tps.join(', '):'','Ngân sách: '+bud[0],v('ghichu')?'Ghi chú: '+v('ghichu'):''].filter(Boolean).join(' · ');
    btn.disabled=true;btn.textContent=L('Đang gửi…','Sending…');
    const ok=window.bydesoSend?await window.bydesoSend({loai:'Đặt lịch tư vấn',hoTen:v('ten'),sdt,email:mail,duAn:n,kenh:way[1],noiDung,dongY:window.BYDESO_DONG_Y}):false;
    if(!ok){btn.disabled=false;btn.textContent=L('Gửi yêu cầu đặt lịch','Send booking request');return say(L('Chưa gửi được, vui lòng thử lại hoặc gọi 0325 982 512.','Could not send, please try again or call 0325 982 512.'))}
    box.querySelector('.dl-box').innerHTML='<div class="dl-done"><div class="su-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h3 id="dlTitle">'+L('Đã nhận yêu cầu đặt lịch','Booking request received')+'</h3><p>'+L('Chuyên viên Bydeso sẽ gọi số ','A Bydeso advisor will call ')+esc(sdt)+L(' để xác nhận lịch '+(dd?dd+', ':'')+slot[0].toLowerCase()+'. Sau buổi tư vấn, biên bản sẽ được gửi vào ',' to confirm '+(dd?dd+', ':'')+slot[1].toLowerCase()+'. After the consultation, the minutes will be sent to ')+esc(mail)+'.</p><button type="button" class="btn btn-primary">'+L('Đã hiểu','Got it')+'</button></div>';
    box.querySelector('.dl-done button').onclick=close;box.querySelector('.dl-done button').focus();
  };
  setTimeout(()=>f.elements.ten.focus(),30);
}
window.bydesoBook=open;
})();
