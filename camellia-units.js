// Dữ liệu căn của sa bàn The Camellia: trang chủ và sa bàn 3D cùng đọc file này để số liệu luôn khớp.
// Số căn, trạng thái và giá là minh họa (cố định theo hạt giống), riêng CH-0301 là dữ liệu thật.
(function(){
const P={
  podiumFloors:2, podiumH:4.5, floorH:3.3, firstRes:3, topFloor:25,
  // Căn tầng điển hình: [x0,z0,x1,z1] theo mét trên mặt bằng (x sang phải, z xuống dưới bản vẽ), loại, diện tích, mặt hướng
  slots:[
    [28.5,53.5,37.7,62,'2PN',68.3,['TN']],[19.8,53.5,28.5,62,'2PN',66.5,['TN']],[10,53.5,19.8,62,'1PN',52.1,['TN']],[0,51,10,62,'3PN',98.6,['TN','TB']],
    [0,42,9.6,51,'2PN',70.2,['TB']],[0,35.5,9.6,42,'1PN',47.3,['TB']],[0,29,9.6,35.5,'1PN',47.3,['TB']],[0,21.5,9.6,29,'2PN',63.8,['TB']],
    [0,15,9.6,21.5,'1PN',46.9,['TB']],[0,8.5,9.6,15,'Studio',31.6,['TB']],[0,0,10,8.5,'2PN',74.5,['TB','ĐB']],
    [40,0,48,8.5,'1PN',50.2,['ĐB']],[48,0,56,8.5,'2PN',67.9,['ĐB']],[56,0,64,8.5,'2PN',75.4,['ĐB','ĐN']],
    [55.5,8.5,64,17,'1PN',48.8,['ĐN']],[55.5,17,64,25.5,'Studio',33.2,['ĐN']],[55.5,25.5,64,34,'1PN',49.5,['ĐN']],[55.5,34,64,42.5,'2PN',69.1,['ĐN']],
    [55.5,42.5,64,53.5,'2PN',72.6,['ĐN']],[55.5,53.5,64,62,'3PN',105.2,['ĐN','TN']],[46,53.5,55.5,62,'1PN',51.4,['TN']],
    [40,8.5,48.5,17,'1PN',46.2,['SAN']],[40,17,48.5,25.5,'Studio',30.8,['SAN']]
  ],
  floor3Skip:[2,12,13,14,15,16,17,18,19,20,22,23], // tầng 3: sân vườn và khu tiện ích
  cores:[[9.6,0,12,51],[10,51,55.5,53.5],[37.7,53.5,46,62],[48.5,8.5,55.5,53.5],[40,25.5,48.5,51],[12,20,18,32]],
  slabs:[[0,0,12,62],[10,51,64,62],[40,0,64,53.5],[12,20,18,32]],
  real:{code:'CH-0301',list:4284446665,dir:'Tây Nam',status:'ok'}
};
const DIR={TN:'Tây Nam',TB:'Tây Bắc','ĐB':'Đông Bắc','ĐN':'Đông Nam',SAN:'Tây Bắc'};
const VIEW={TN:'Phố, đường Lê Đức Thọ',TB:'Phố, đường Lê Văn Lương','ĐB':'Núi Sơn Trà','ĐN':'Hướng biển',SAN:'Sân vườn nội khu'};
const VF={TN:1,TB:1,'ĐB':1.03,'ĐN':1.06,SAN:.98};
const ST={ok:{t:'Còn hàng',c:0x2fbf87,cls:'ok'},hold:{t:'Có khách quan tâm',c:0xf3b33d,cls:'hold'},sold:{t:'Đã bán',c:0x6a6f7b,cls:'sold'}};
const TYPES=['Studio','1PN','2PN','3PN'];

// sinh dữ liệu căn (minh họa, cố định theo hạt giống)
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=rng(20261103), units=[];
for(let f=P.firstRes;f<=P.topFloor;f++){
  P.slots.forEach((s,i)=>{
    const no=i+1; if(f===3&&P.floor3Skip.includes(no))return;
    const code='CH-'+String(f).padStart(2,'0')+String(no).padStart(2,'0');
    const isReal=code===P.real.code, faces=s[6];
    let st; const r=R(); st=r<.36?'sold':r<.48?'hold':'ok';
    const corner=faces.length>1?1.03:1, ff=1+.006*(f-3);
    let price=Math.round(s[5]*62.73e6*ff*VF[faces[0]]*corner/1e6)*1e6;
    if(isReal){st=P.real.status;price=P.real.list}
    units.push({code,floor:f,no,box:s.slice(0,4),type:s[4],area:s[5],faces,dir:isReal?P.real.dir:faces.map(x=>DIR[x]).join(' – '),
      view:isReal?null:VIEW[faces[0]],price,status:st,real:isReal});
  });
}
window.BYDESO_3D={P,DIR,VIEW,VF,ST,TYPES,rng,units};
})();
