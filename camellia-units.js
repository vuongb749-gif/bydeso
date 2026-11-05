// Dữ liệu căn của sa bàn The Camellia: trang chủ và sa bàn 3D cùng đọc file này để số liệu luôn khớp.
// Số căn, loại căn và diện tích theo Salekit và mặt bằng tầng 3; trạng thái và giá là minh họa (cố định theo hạt giống), riêng CH-0301 là dữ liệu thật.
(function(){
const P={
  podiumFloors:2, podiumH:4.5, floorH:3.3, firstRes:3, topFloor:25,
  // 22 căn tầng điển hình theo Salekit: [x0,z0,x1,z1] theo mét trên hình khối (x sang phải, z xuống dưới bản vẽ), loại, DT thông thủy, mặt hướng, số căn, DT tim tường, số phòng tắm của căn 2PN
  slots:[
    [24,53.5,37.7,62,'2PN',68.3,['TN'],'01',73.8,2],[10,53.5,24,62,'2PN',69.9,['TN'],'02',76.5,2],[0,51,10,62,'3PN',89.3,['TN','TB'],'03',100],
    [0,41,9.6,51,'2PN',65.1,['TB'],'03A',71.1,2],[0,31,9.6,41,'2PN',69.9,['TB'],'05',76,2],[0,24.5,9.6,31,'1.5PN',47,['TB'],'06',51.5],[0,14,9.6,24.5,'2PN',70.1,['TB'],'07',77.3,2],[0,0,9.6,14,'2PN',70.1,['TB','ĐB'],'08',76.5,2],
    [18,42.5,25,51,'Studio',28.4,['ĐB'],'09',32],[25,42.5,37.7,51,'2PN',61.7,['ĐB'],'10',66.9,2],
    [40,0,48.5,17,'3PN',88.7,['ĐB'],'11',97.9],[48.5,0,54.5,8.5,'1.5PN',47.2,['ĐB'],'12',51.4],[54.5,0,58.5,8.5,'Studio',27.8,['ĐB'],'12A',30.9],[58.5,0,64,8.5,'2PN',72.7,['ĐB','ĐN'],'12B',80.4,2],
    [55.5,8.5,64,19,'2PN',57.4,['ĐN'],'15',63.8,1],[55.5,19,64,27,'Studio',31.4,['ĐN'],'16',35.4],[55.5,27,64,37,'1.5PN',47.3,['ĐN'],'17',51.4],[55.5,37,64,53.5,'2PN',72.1,['ĐN'],'18',81,2],
    [55.5,53.5,64,62,'3PN',103.6,['ĐN','TN'],'19',114.8],[46,53.5,55.5,62,'3PN',84.2,['TN'],'20',93.7],[40,41.5,48.5,51,'1.5PN',47.1,['SAN'],'21',52.8],[40,32,48.5,41.5,'Studio',30,['SAN'],'22',33]
  ],
  floor3:['01','02','03','03A','05','06','07','08','20','21','22'], // tầng 3 theo mặt bằng tầng 3, phần còn lại là tiện ích
  dataTop:23, // Salekit chỉ có đến tầng 23; tầng 24, 25 chưa có dữ liệu căn
  floorNames:{4:'3A',13:'12A',14:'12B'}, // Salekit gọi tầng 4 là 3A; 12A, 12B suy theo cách đặt số căn
  cores:[[9.6,0,12,51],[10,51,55.5,53.5],[37.7,53.5,46,62],[48.5,8.5,55.5,53.5],[40,17,48.5,32],[12,20,18,32]],
  slabs:[[0,0,12,62],[10,51,64,62],[40,0,64,53.5],[12,20,18,32],[18,42.5,37.7,51]],
  real:{code:'CH-0301',list:4284446665,dir:'Tây Nam',status:'ok'}
};
const DIR={TN:'Tây Nam',TB:'Tây Bắc','ĐB':'Đông Bắc','ĐN':'Đông Nam',SAN:'Tây Bắc'};
const VIEW={TN:'Phố, đường Lê Đức Thọ',TB:'Phố, đường Lê Văn Lương','ĐB':'Núi Sơn Trà','ĐN':'Hướng biển',SAN:'Sân vườn nội khu'};
const VF={TN:1,TB:1,'ĐB':1.03,'ĐN':1.06,SAN:.98};
const ST={ok:{t:'Còn hàng',c:0x2fbf87,cls:'ok'},hold:{t:'Có khách quan tâm',c:0xf3b33d,cls:'hold'},sold:{t:'Đã bán',c:0x6a6f7b,cls:'sold'}};
const TYPES=['Studio','1.5PN','2PN','3PN'];

// sinh dữ liệu căn (minh họa, cố định theo hạt giống)
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
// 4 căn 3 phòng ngủ theo Salekit mặt bằng dự án (tầng 3A đến 23); khóa là số căn trong mã, ảnh nằm ở thư mục layout/
const PLANS={'03':'ch-03','11':'ch-11','19':'ch-19','20':'ch-20'};
const R=rng(20261103), units=[];
for(let f=P.firstRes;f<=P.dataTop;f++){
  P.slots.forEach((s,i)=>{
    const no=s[7]; if(f===3&&!P.floor3.includes(no))return;
    const floorName=P.floorNames[f]||String(f).padStart(2,'0'), code='CH-'+floorName+no;
    const isReal=code===P.real.code, faces=s[6];
    let st; const r=R(); st=r<.36?'sold':r<.48?'hold':'ok';
    const corner=faces.length>1?1.03:1, ff=1+.006*(f-3);
    let price=Math.round(s[5]*62.73e6*ff*VF[faces[0]]*corner/1e6)*1e6;
    if(isReal){st=P.real.status;price=P.real.list}
    units.push({code,floor:f,floorName,no,idx:i+1,gross:s[8],wc:s[9],box:s.slice(0,4),type:s[4],area:s[5],faces,dir:isReal?P.real.dir:faces.map(x=>DIR[x]).join(' – '),
      view:isReal?null:VIEW[faces[0]],price,status:st,real:isReal,plan:f>=4&&PLANS[no]?{key:PLANS[no],gross:s[8]}:null});
  });
}
window.BYDESO_3D={P,DIR,VIEW,VF,ST,TYPES,rng,units};
})();
