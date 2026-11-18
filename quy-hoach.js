// Trang "Quy hoạch" (#quy-hoach/<thành phố>): dữ liệu và cách hiện.
// Dữ liệu tổng hợp từ văn bản đã phê duyệt và báo chính thống, có ghi nguồn. Cập nhật: sửa mảng CITIES bên dưới,
// ghi lại ngày ở "upd". Mỗi chữ có hai bản [tiếng Việt, tiếng Anh].
(function(){
const CITIES=[
{
  id:'da-nang', name:['Thành phố Đà Nẵng','Da Nang City'], upd:'18/11/2026',
  img:'anh-quy-hoach/cau-rong.webp', imgPos:'50% 45%', photo:['Cầu Rồng về đêm: Supanut Arunoprayote, CC BY 4.0','Dragon Bridge at night: Supanut Arunoprayote, CC BY 4.0','https://commons.wikimedia.org/wiki/File:Da_Nang_Dragon_Bridge_(II).jpg'],
  now:{
    lead:['Thành phố trực thuộc Trung ương, hợp nhất với tỉnh Quảng Nam từ 01/07/2025 (Nghị quyết 202/2025/QH15).','Centrally governed city, merged with Quang Nam province on 1 Jul 2025 (Resolution 202/2025/QH15).'],
    items:[
      ['11.859,59 km²',['diện tích tự nhiên','natural area'],'11,859.59 km²'],
      ['3.065.628',['người, quy mô dân số','people, population size'],'3,065,628'],
      ['94',['đơn vị cấp xã: 23 phường, 70 xã, 1 đặc khu Hoàng Sa','commune-level units: 23 wards, 70 communes, Hoang Sa special zone']],
      ['9,18%',['tăng trưởng GRDP năm 2025, cao nhất giai đoạn 2021–2025','GRDP growth in 2025, the highest of 2021–2025'],'9.18%'],
      ['316,1 nghìn tỷ',['đồng quy mô GRDP 2025, khoảng 2,5% GDP cả nước','VND GRDP in 2025, about 2.5% of national GDP'],'VND 316.1 trillion'],
      ['4.287 USD',['GRDP bình quân đầu người 2025 (trên 110 triệu đồng)','GRDP per capita in 2025 (over VND 110 million)'],'US$4,287'],
      ['17,8 triệu',['lượt khách lưu trú 2025, trong đó 7,7 triệu khách quốc tế','overnight visitors in 2025, incl. 7.7 million international'],'17.8 million'],
      ['85.824 tỷ',['đồng vốn đầu tư phát triển 2025, tăng 16,7%','VND development investment in 2025, up 16.7%'],'VND 85.8 trillion']
    ],
    src:['Diện tích, dân số: Nghị quyết 202/2025/QH15 · Đơn vị hành chính: Nghị quyết 1659/NQ-UBTVQH15 · Số liệu năm 2025: Thống kê TP Đà Nẵng (ước tính, công bố 31/12/2025).','Area, population: Resolution 202/2025/QH15 · Administrative units: Resolution 1659/NQ-UBTVQH15 · 2025 figures: Da Nang Statistics Office (estimates, released 31 Dec 2025).']
  },
  tag:['Đô thị biển sinh thái, kết nối toàn cầu','Eco-coastal city, globally connected'],
  plan:['Quy hoạch chung thành phố Đà Nẵng đến năm 2050, tầm nhìn đến năm 2075','Da Nang General Plan to 2050, vision to 2075'],
  doc:['Quyết định 2016/QĐ-TTg ngày 21/10/2026 của Thủ tướng Chính phủ','Prime Minister’s Decision 2016/QĐ-TTg, 21 Oct 2026'],
  note:['Áp dụng cho toàn bộ thành phố sau khi hợp nhất với Quảng Nam (từ 01/07/2025), gồm đặc khu Hoàng Sa và vùng biển.','Covers the whole city after merging with Quang Nam (from 1 Jul 2025), including Hoang Sa special zone and its sea area.'],
  stats:[
    ['11.870 km²',['diện tích trong phạm vi quy hoạch','area covered by the plan'],'11,870 km²'],
    ['5,5 triệu',['dân số năm 2040','population in 2040'],'5.5 million'],
    ['6,5 triệu+',['dân số năm 2050','population in 2050'],'6.5 million+'],
    ['130–135 triệu',['lượt khách lưu trú năm 2050','overnight visitors in 2050'],'130–135 million']
  ],
  miles:[
    ['2026–2030',['Ưu tiên hạ tầng khung: Trung tâm Tài chính quốc tế, Khu thương mại tự do, cảng Liên Chiểu, đô thị lấn biển.','Core infrastructure first: International Financial Centre, Free Trade Zone, Lien Chieu port, sea-reclaimed districts.']],
    ['2030–2040',['Hoàn thiện chuỗi đô thị ven biển nhiều cực; làm đường sắt đô thị (Metro/LRT), đường sắt tốc độ cao, đô thị quanh nhà ga.','Complete the multi-pole coastal chain; build urban rail (Metro/LRT), high-speed rail and transit-oriented districts.']],
    ['2050',['Cực tăng trưởng quốc gia; trung tâm tài chính, logistics, kinh tế biển, đổi mới sáng tạo, du lịch.','National growth pole; hub for finance, logistics, marine economy, innovation and tourism.']],
    ['2075',['Từng bước đạt tiêu chí đô thị đặc biệt, thuộc nhóm đô thị giàu bản sắc hàng đầu châu Á.','Moving toward special-class city status, among Asia’s most distinctive cities.']]
  ],
  struct:['3 vùng · 3 cực · 2 trục · 4 hành lang','3 regions · 3 poles · 2 axes · 4 corridors'],
  structNote:['Mô hình chuỗi đô thị nhiều cực, nhiều trung tâm, khoảng 30 đô thị đến năm 2050.','A multi-pole, multi-centre chain of about 30 urban areas by 2050.'],
  poles:[
    [['Cực phía Bắc','Northern pole'],['Đà Nẵng hiện hữu mở rộng, Điện Bàn, Hội An, các khu lấn biển','Existing Da Nang expanded, Dien Ban, Hoi An, reclaimed districts'],['Dịch vụ, tài chính, du lịch, công nghệ cao','Services, finance, tourism, high-tech']],
    [['Cực liên kết Nam Hội An','South Hoi An link pole'],['Duy Xuyên, Thăng Bình, Quế Sơn','Duy Xuyen, Thang Binh, Que Son'],['Đô thị mới, du lịch, thương mại','New urban areas, tourism, trade']],
    [['Cực phía Nam','Southern pole'],['Chu Lai, Tam Kỳ, Núi Thành','Chu Lai, Tam Ky, Nui Thanh'],['Công nghiệp, năng lượng, logistics','Industry, energy, logistics']]
  ],
  lines:[
    [['3 vùng','3 regions'],['Ven biển phía Đông (công nghiệp, dịch vụ, đô thị) · Trung du, miền núi phía Tây (sinh thái, nông nghiệp công nghệ cao, di sản) · Biển, quần đảo Hoàng Sa và các đảo','Eastern coast (industry, services, urban) · Western midlands and mountains (ecology, hi-tech farming, heritage) · Sea, Hoang Sa and islands']],
    [['2 trục Bắc – Nam','2 north–south axes'],['Trục Đông: Quốc lộ 1, cao tốc Bắc – Nam, đường sắt tốc độ cao, đường ven biển · Trục Tây: đường Hồ Chí Minh, Đông Trường Sơn','East: National Route 1, North–South expressway, high-speed rail, coastal road · West: Ho Chi Minh road, East Truong Son']],
    [['4 hành lang Đông – Tây','4 east–west corridors'],['Quốc lộ 40B, 14E, 14D, 14G nối ven biển với miền núi và cửa khẩu quốc tế','Routes 40B, 14E, 14D, 14G link the coast with the mountains and border gates']]
  ],
  drivers:[
    ['on',['Trung tâm Tài chính quốc tế','International Financial Centre'],['Khai trương 09/01/2026 tại Công viên phần mềm số 2. Quy mô khoảng 300 ha ở nhiều khu, gồm khu đất hơn 6 ha trên đường Võ Văn Kiệt (phường An Hải) và khu lấn biển đối diện đường Nguyễn Tất Thành.','Opened 9 Jan 2026 at Software Park No. 2. About 300 ha across several sites, including a 6+ ha site on Vo Van Kiet St (An Hai ward) and a reclaimed area facing Nguyen Tat Thanh St.']],
    ['on',['Khu thương mại tự do Đà Nẵng','Da Nang Free Trade Zone'],['Thành lập theo Quyết định 1142/QĐ-TTg ngày 13/06/2025, khoảng 1.881 ha tại 7 vị trí: sản xuất, logistics, thương mại, công nghệ số.','Established by Decision 1142/QĐ-TTg (13 Jun 2025), about 1,881 ha at 7 sites: production, logistics, trade, digital tech.']],
    ['go',['Cảng container Liên Chiểu','Lien Chieu container port'],['Khởi công tháng 4/2026, vốn hơn 45.000 tỷ đồng, công suất thiết kế khoảng 74 triệu tấn/năm; định hướng thành cửa khẩu quốc tế.','Construction began Apr 2026, over VND 45,000 billion, design capacity about 74 million tonnes/year; planned as an international gateway.']],
    ['plan',['Đô thị lấn biển','Sea-reclaimed districts'],['Khoảng 2.050 ha nghiên cứu tại vịnh Đà Nẵng (khoảng 1.500 ha), cảng Liên Chiểu (khoảng 450 ha), phía Nam bán đảo Sơn Trà (khoảng 100 ha).','About 2,050 ha under study: Da Nang Bay (about 1,500 ha), Lien Chieu port (about 450 ha), south of Son Tra peninsula (about 100 ha).']],
    ['plan',['Đường sắt đô thị','Urban rail'],['Ưu tiên tuyến sân bay Đà Nẵng – Hội An, nối dài tới Tam Kỳ, Chu Lai. Nhà đầu tư đang đề xuất theo hình thức PPP, dự kiến khởi công năm 2027.','Priority line: Da Nang airport – Hoi An, extending to Tam Ky and Chu Lai. Investors are proposing a PPP model; construction expected in 2027.']],
    ['on',['Khu công nghệ và khu kinh tế','Tech parks and economic zones'],['Khu công nghệ cao mở rộng 1.710 ha · Khu công nghệ thông tin tập trung 341 ha · Khu kinh tế mở Chu Lai 27.040 ha · Sân bay Chu Lai thành trung tâm logistics hàng không.','Expanded Hi-Tech Park 1,710 ha · IT park 341 ha · Chu Lai open economic zone 27,040 ha · Chu Lai airport as an air-logistics hub.']]
  ],
  near:[
    ['The Legend Danang','#da/the-legend-danang',['Lô A20 Võ Văn Kiệt, phường An Hải: cùng trục đường với khu đất Trung tâm Tài chính quốc tế (lô A12–A15, hơn 6 ha), thuộc cực phía Bắc của quy hoạch.','Lot A20 Vo Van Kiet, An Hai ward: on the same street as the International Financial Centre site (lots A12–A15, over 6 ha), within the plan’s northern pole.']],
    ['The Camellia Sơn Trà','#da/the-camellia-son-tra',['Khu Sơn Trà: bán đảo Sơn Trà là một trong 3 khu du lịch quốc gia tiềm năng (cùng Cù Lao Chàm, Bà Nà); phía Nam bán đảo có khu lấn biển nghiên cứu khoảng 100 ha.','Son Tra area: the peninsula is one of 3 potential national tourism areas (with Cu Lao Cham and Ba Na); about 100 ha of reclamation is under study south of it.']]
  ],
  src:[
    ['VnEconomy, 02/01/2026: Số liệu kinh tế Đà Nẵng năm 2025 (Thống kê TP Đà Nẵng)','https://vneconomy.vn/da-nang-toc-do-tang-grdp-nam-2025-dat-918-dung-thu-1334-tinh-thanh-pho-trong-ca-nuoc.htm'],
    ['Tạp chí Công Thương: Công bố thành lập thành phố Đà Nẵng mới','https://tapchicongthuong.vn/cong-bo-thanh-lap-thanh-pho-da-nang-moi-142278.htm'],
    ['Báo Nhân Dân, 21/10/2026: Thủ tướng phê duyệt Quy hoạch chung TP Đà Nẵng','https://nhandan.vn/thu-tuong-chinh-phu-phe-duyet-quy-hoach-chung-thanh-pho-da-nang-den-nam-2050-tam-nhin-den-nam-2075-post997014.html'],
    ['Báo Sài Gòn Giải Phóng, 21/10/2026','https://www.sggp.org.vn/thu-tuong-chinh-phu-phe-duyet-quy-hoach-chung-tp-da-nang-post877693.html'],
    ['Cổng thông tin TP Đà Nẵng: Khai trương Trung tâm Tài chính quốc tế','https://danang.gov.vn/vi/web/dng/w/khai-truong-trung-tam-tai-chinh-quoc-te-viet-nam-tai-thanh-pho-da-nang'],
    ['Tuổi Trẻ, 13/03/2026: 5 khu đất cho Trung tâm Tài chính quốc tế','https://tuoitre.vn/da-nang-keu-goi-dau-tu-trung-tam-tai-chinh-quoc-te-tai-5-khu-dat-vang-20260313182451685.htm'],
    ['Tạp chí Công Thương: Thành lập Khu thương mại tự do Đà Nẵng','https://tapchicongthuong.vn/thanh-lap-khu-thuong-mai-tu-do-da-nang-quy-mo-hon-1-880-ha-141815.htm'],
    ['Cổng thông tin TP Đà Nẵng: Hoàn thiện quy hoạch chung (cảng Liên Chiểu)','https://danang.gov.vn/vi/w/hoan-thien-quy-hoach-chung-da-nang-voi-tam-nhin-dai-han-ben-vung'],
    ['Tuổi Trẻ, 20/04/2026: Tuyến đường sắt đô thị Đà Nẵng','https://tuoitre.vn/tuyen-duong-sat-do-thi-da-nang-se-khoi-cong-vao-thang-2-2027-20260420182515178.htm']
  ]
},
{
  id:'hue', name:['Thành phố Huế','Hue City'], upd:'18/11/2026',
  img:'anh-quy-hoach/cau-truong-tien.webp', imgPos:'50% 52%', photo:['Cầu Trường Tiền về đêm: Lưu Ly, phạm vi công cộng','Truong Tien Bridge at night: Luu Ly, public domain','https://commons.wikimedia.org/wiki/File:Cau_Trang_tien_ve_dem.jpg'],
  now:{
    lead:['Thành phố trực thuộc Trung ương từ 01/01/2025 (Nghị quyết 175/2024/QH15), giữ nguyên địa giới khi sắp xếp tỉnh năm 2025.','Centrally governed city since 1 Jan 2025 (Resolution 175/2024/QH15); its boundary was unchanged in the 2025 provincial reorganisation.'],
    items:[
      ['4.947,11 km²',['diện tích tự nhiên','natural area'],'4,947.11 km²'],
      ['1.236.393',['người, quy mô dân số','people, population size'],'1,236,393'],
      ['40',['đơn vị cấp xã: 21 phường, 19 xã (từ 01/07/2025)','commune-level units: 21 wards, 19 communes (from 1 Jul 2025)']],
      ['8,5%',['tăng trưởng GRDP năm 2025 (ước tính)','GRDP growth in 2025 (estimate)'],'8.5%'],
      ['89.591 tỷ',['đồng quy mô GRDP 2025, giá hiện hành','VND GRDP in 2025, current prices'],'VND 89.6 trillion'],
      ['gần 6 triệu',['lượt khách du lịch 2025, khoảng 1,76 triệu khách quốc tế','tourist visits in 2025, about 1.76 million international'],'nearly 6 million'],
      ['gần 15.000 tỷ',['đồng thu ngân sách 2025, tăng 14,5%','VND budget revenue in 2025, up 14.5%'],'nearly VND 15 trillion'],
      ['Loại I',['đơn vị hành chính cấp tỉnh, từ 27/11/2025','provincial administrative class, from 27 Nov 2025'],'Class I']
    ],
    src:['Diện tích, dân số: Nghị quyết 175/2024/QH15 · Đơn vị hành chính: Nghị quyết 1675/NQ-UBTVQH15 · Phân loại: Nghị định 307/2025/NĐ-CP · Số liệu năm 2025: Thống kê TP Huế và báo cáo cuối năm (ước tính).','Area, population: Resolution 175/2024/QH15 · Administrative units: Resolution 1675/NQ-UBTVQH15 · Class: Decree 307/2025/NĐ-CP · 2025 figures: Hue Statistics Office and year-end reports (estimates).']
  },
  tag:['Đô thị di sản, thành phố Festival hướng biển','Heritage city, a Festival city facing the sea'],
  plan:['Quy hoạch chung đô thị Thừa Thiên Huế đến năm 2045, tầm nhìn đến năm 2065','Thua Thien Hue General Urban Plan to 2045, vision to 2065'],
  doc:['Quyết định 108/QĐ-TTg ngày 26/01/2024 của Thủ tướng Chính phủ','Prime Minister’s Decision 108/QĐ-TTg, 26 Jan 2024'],
  note:['Huế là thành phố trực thuộc Trung ương từ 01/01/2025 (Nghị quyết 175/2024/QH15). Quy hoạch thành phố thời kỳ 2021–2030, tầm nhìn 2050 được điều chỉnh theo Quyết định 756/QĐ-UBND ngày 28/02/2026.','Hue has been a centrally governed city since 1 Jan 2025 (Resolution 175/2024/QH15). Its 2021–2030 master plan (vision 2050) was adjusted by Decision 756/QĐ-UBND, 28 Feb 2026.'],
  stats:[
    ['01/01/2025',['trực thuộc Trung ương','centrally governed city']],
    ['45–50%',['GRDP từ kinh tế biển và đầm phá năm 2030','GRDP share from marine and lagoon economy by 2030']],
    ['12 triệu',['khách/năm qua sân bay Phú Bài năm 2050','passengers/year at Phu Bai airport by 2050'],'12 million'],
    ['18.400 tỷ+',['vốn 12 dự án trọng điểm','for 12 key projects'],'VND 18,400 bn+']
  ],
  miles:[
    ['2030',['Đô thị di sản đặc trưng của Việt Nam; trung tâm văn hóa, du lịch, y tế chuyên sâu; kinh tế biển mạnh.','Vietnam’s signature heritage city; hub for culture, tourism, specialised healthcare; strong marine economy.']],
    ['2045',['Thành phố hướng biển, thông minh, thích ứng và bền vững; thành phố Festival.','A sea-facing, smart, adaptive and sustainable Festival city.']],
    ['2050',['Đô thị lớn, kinh tế phát triển cao, chất lượng sống dẫn đầu cả nước.','A large, highly developed city with top quality of life nationwide.']],
    ['2065',['Thành phố Festival thuộc nhóm dẫn đầu hệ thống đô thị Việt Nam.','A Festival city among Vietnam’s leading cities.']]
  ],
  struct:['6 vùng · 2 hành lang · 3 cụm đô thị động lực','6 zones · 2 corridors · 3 driving urban clusters'],
  structNote:['Sông Hương là trục xương sống khi mở rộng đô thị từ trung tâm ra biển.','The Perfume River is the backbone as the city expands toward the sea.'],
  poles:[
    [['Đô thị trung tâm','Central urban area'],['Khu di sản và lõi đô thị hai bờ sông Hương','Heritage zone and urban core on both banks of the Perfume River'],['Văn hóa, du lịch, y tế, giáo dục','Culture, tourism, healthcare, education']],
    [['Đô thị Phong Điền','Phong Dien urban area'],['Vùng phía Bắc thành phố','Northern zone'],null],
    [['Đô thị Chân Mây','Chan May urban area'],['Khu kinh tế Chân Mây – Lăng Cô, Phú Lộc và các xã ven biển','Chan May – Lang Co economic zone, Phu Loc and coastal communes'],['Cảng biển, logistics, du lịch biển','Seaport, logistics, coastal tourism']]
  ],
  lines:[
    [['6 vùng phát triển','6 development zones'],['Di sản · Trung tâm · Phía Bắc · Chân Mây – Lăng Cô · Sinh thái phía Tây · Sinh thái phía Tây – Nam','Heritage · Central · North · Chan May – Lang Co · Western ecology · South-western ecology']],
    [['2 hành lang kinh tế','2 economic corridors'],['Bắc – Nam: tuyến đô thị phía Đông và Quốc lộ 1A · Đông – Tây: Quốc lộ 49. Thêm đường ven biển và Quốc lộ 14.','North–South: eastern urban route and Route 1A · East–West: Route 49. Plus the coastal road and Route 14.']]
  ],
  drivers:[
    ['on',['Khu kinh tế Chân Mây – Lăng Cô','Chan May – Lang Co economic zone'],['Cực tăng trưởng theo hướng sinh thái; đầu tư hạ tầng khu công nghiệp, khu phi thuế quan; định hướng trung tâm logistics quốc tế và khu thương mại tự do gắn cảng Chân Mây, sân bay Phú Bài.','An eco-oriented growth pole investing in industrial and non-tariff zones; an international logistics hub and free trade zone linked to Chan May port and Phu Bai airport are planned.']],
    ['go',['Sân bay quốc tế Phú Bài','Phu Bai International Airport'],['Quyết định 1140/QĐ-BXD ngày 01/07/2026: khoảng 4 triệu khách/năm vào 2030, 12 triệu khách/năm vào 2050.','Decision 1140/QĐ-BXD (1 Jul 2026): about 4 million passengers/year by 2030, 12 million by 2050.']],
    ['go',['Cảng Chân Mây','Chan May port'],['Đang đón tàu du lịch lớn và mở rộng cho tàu đến 100.000 GT; gắn với trung tâm logistics quốc tế.','Receiving large cruise ships and expanding for vessels up to 100,000 GT; linked to an international logistics hub.']],
    ['go',['Khu công nghiệp VSIP Huế','VSIP Hue industrial park'],['Một trong 12 dự án trọng điểm, vốn khoảng 3.075 tỷ đồng.','One of 12 key projects, about VND 3,075 billion.']],
    ['plan',['Khu công nghệ cao, công nghệ số','Hi-tech and digital parks'],['Nghiên cứu hình thành khu công nghệ cao, khu công nghệ số tập trung, khu đô thị khoa học công nghệ; ưu tiên bán dẫn, năng lượng sạch, vật liệu mới.','Studying a hi-tech park, digital-tech park and science city; priority on semiconductors, clean energy, new materials.']]
  ],
  near:[],
  src:[
    ['VnEconomy: Thành phố Huế chính thức trực thuộc Trung ương từ 1/1/2025','https://vneconomy.vn/thanh-pho-hue-chinh-thuc-truc-thuoc-trung-uong-tu-1-1-2025.htm'],
    ['Báo Nhân Dân: Thành phố Huế còn 40 đơn vị hành chính cấp xã','https://nhandan.vn/thanh-pho-hue-con-40-don-vi-hanh-chinh-cap-xa-sau-khi-sap-xep-post873473.html'],
    ['Tạp chí Kinh tế Tài chính: Kinh tế TP Huế năm 2025 (Thống kê TP Huế)','https://tapchikinhtetaichinh.vn/kinh-te-tp-hue-tang-truong-on-dinh-chuyen-dich-dung-huong-140458.html'],
    ['Diễn đàn Doanh nghiệp, 16/12/2025: Huế 2025 vượt sóng tạo bứt phá','https://diendandoanhnghiep.vn/hue-2025-vuot-song-tao-but-pha-10167589.html'],
    ['VOV, 27/01/2024: Phê duyệt Quy hoạch chung đô thị Thừa Thiên Huế','https://vov.vn/chinh-tri/thu-tuong-chinh-phu-phe-duyet-quy-hoach-chung-do-thi-thua-thien-hue-post1074182.vov'],
    ['Luật Việt Nam: Quyết định 108/QĐ-TTg','https://luatvietnam.vn/xay-dung/quyet-dinh-108-qd-ttg-2024-phe-duyet-quy-hoach-chung-do-thi-thua-thien-hue-293400-d1.html'],
    ['Báo Chính phủ: Thành lập thành phố Huế trực thuộc Trung ương','https://xaydungchinhsach.chinhphu.vn/thanh-lap-thanh-pho-hue-truc-thuoc-trung-uong-tu-1-1-2025-119241130091551714.htm'],
    ['Diễn đàn Doanh nghiệp, 30/05/2026: Công bố điều chỉnh quy hoạch Huế','https://diendandoanhnghiep.vn/khong-gian-phat-trien-dot-pha-moi-cua-hue-10179686.html'],
    ['Bộ Xây dựng: Phát triển Cảng hàng không quốc tế Phú Bài','https://moc.gov.vn/vn/tin-tuc/1196/93220/phat-trien-cang-hkqt-phu-bai-theo-dinh-huong-san-bay-thong-minh-phu-hop-voi-xu-the-chuyen-doi-so-va-phat-trien-ben-vung.aspx']
  ]
}
];

const en=()=>document.documentElement.lang==='en', T=a=>Array.isArray(a)?a[en()?1:0]:a, L=(v,e)=>en()?e:v;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ST={on:['Đang hoạt động','In operation','qh-s-on'],go:['Đang triển khai','Under way','qh-s-go'],plan:['Đang nghiên cứu','Under study','qh-s-plan']};
const root=document.getElementById('qhRoot'); if(!root)return;

function city(){const id=location.hash.slice(1).split('/')[1];return CITIES.find(c=>c.id===id)||null}
function render(){
  if(!location.hash.startsWith('#quy-hoach'))return;
  const c=city();
  let h='<div class="qh-head"><span class="qh-kick">'+L('Thông tin quy hoạch','Planning information')+'</span><h2>'+L('Quy hoạch đô thị theo thành phố','Urban planning by city')+'</h2><p>'+L('Bydeso đọc các quyết định quy hoạch đã phê duyệt và tin chính thức rồi tóm tắt lại. Chọn một thành phố để xem.','Bydeso reads approved planning decisions and official news, then sums them up. Pick a city.')+'</p></div>';
  h+='<div class="qh-cities" role="tablist" aria-label="'+L('Chọn thành phố','Choose a city')+'">'+CITIES.map(x=>'<a class="qh-city'+(x.img?' qh-ph':'')+'" role="tab" href="#quy-hoach/'+x.id+'" aria-selected="'+(c&&c.id===x.id)+'"'+(x.img?' style="--ph:url('+x.img+');--pp:'+(x.imgPos||'center')+'"':'')+'>'+(c&&c.id===x.id?'<i class="qh-on-tag">'+L('Đang xem','Viewing')+'</i>':'')+'<b>'+esc(T(x.name))+'</b><span>'+esc(T(x.tag))+'</span><em>'+L('Xem quy hoạch','See the plan')+' →</em></a>').join('')+'</div>'+'<p class="qh-credit">'+L('Ảnh: ','Photos: ')+CITIES.filter(x=>x.photo).map(x=>'<a href="'+x.photo[2]+'" target="_blank" rel="noopener">'+esc(L(x.photo[0],x.photo[1]))+'</a>').join(' · ')+' (Wikimedia Commons)</p>';
  if(c){
    const num=s=>en()&&s[2]?s[2]:s[0];
    h+='<article class="qh-body" aria-label="'+esc(T(c.name))+'">'+
      (c.now?'<section class="qh-now"><span class="qh-kick">'+L('Thông tin chung · số liệu hiện tại','At a glance · current figures')+'</span><h3>'+esc(T(c.name))+'</h3><p class="qh-lead">'+esc(T(c.now.lead))+'</p>'+
        '<div class="qh-nums">'+c.now.items.map(s=>'<div><b>'+esc(num(s))+'</b><span>'+esc(T(s[1]))+'</span></div>').join('')+'</div><p class="qh-nsrc">'+esc(T(c.now.src))+'</p></section>':'')+
      '<div class="qh-hero"><span class="qh-kick">'+L('Quy hoạch đã phê duyệt','Approved plan')+'</span><h3 class="qh-h3s">'+L('Định hướng đến tương lai','Where the city is heading')+'</h3><p class="qh-plan">'+esc(T(c.plan))+'</p><p class="qh-doc">'+esc(T(c.doc))+'</p><p class="qh-note">'+esc(T(c.note))+'</p>'+
      '<div class="qh-stats">'+c.stats.map(s=>'<div><b>'+esc(num(s))+'</b><span>'+esc(T(s[1]))+'</span></div>').join('')+'</div></div>'+
      '<section class="qh-sec"><h4>'+L('Các mốc phát triển','Milestones')+'</h4><ol class="qh-time">'+c.miles.map(m=>'<li><b>'+m[0]+'</b><p>'+esc(T(m[1]))+'</p></li>').join('')+'</ol></section>'+
      '<section class="qh-sec"><h4>'+L('Cấu trúc không gian','Spatial structure')+'</h4><p class="qh-formula">'+esc(T(c.struct))+'</p><p class="qh-sub">'+esc(T(c.structNote))+'</p>'+
      '<div class="qh-poles">'+c.poles.map((p,i)=>'<div class="qh-pole"><i>'+(i+1)+'</i><b>'+esc(T(p[0]))+'</b><span>'+esc(T(p[1]))+'</span>'+(p[2]?'<em>'+esc(T(p[2]))+'</em>':'')+'</div>').join('')+'</div>'+
      '<dl class="qh-lines">'+c.lines.map(l=>'<div><dt>'+esc(T(l[0]))+'</dt><dd>'+esc(T(l[1]))+'</dd></div>').join('')+'</dl></section>'+
      '<section class="qh-sec"><h4>'+L('Động lực tăng trưởng','Growth drivers')+'</h4><div class="qh-drv">'+c.drivers.map(d=>'<div class="qh-card"><span class="qh-st '+ST[d[0]][2]+'">'+L(ST[d[0]][0],ST[d[0]][1])+'</span><b>'+esc(T(d[1]))+'</b><p>'+esc(T(d[2]))+'</p></div>').join('')+'</div></section>'+
      (c.near.length?'<section class="qh-sec qh-near"><h4>'+L('Dự án trên Bydeso trong vùng quy hoạch','Bydeso projects in this plan')+'</h4><div class="qh-nl">'+c.near.map(n=>'<a href="'+n[1]+'"><b>'+esc(n[0])+'</b><span>'+esc(T(n[2]))+'</span><em>'+L('Xem dự án','View project')+' →</em></a>').join('')+'</div></section>':'')+
      '<section class="qh-sec qh-src"><h4>'+L('Nguồn','Sources')+'</h4><ul>'+c.src.map(s=>'<li><a href="'+s[1]+'" target="_blank" rel="noopener">'+esc(s[0])+'</a></li>').join('')+'</ul>'+
      '<p>'+L('Cập nhật ngày ','Updated ')+c.upd+'. '+L('Thông tin để tham khảo, tóm tắt từ văn bản và báo chí chính thống. Hãy đối chiếu văn bản gốc trước khi quyết định đầu tư.','For reference only, summarised from official documents and press. Check the original documents before investing.')+'</p></section>'+
    '</article>';
  } else h+='<p class="qh-pick">'+L('Bấm vào một thành phố ở trên để xem thông tin quy hoạch.','Tap a city above to see its planning information.')+'</p>';
  root.innerHTML=h;
}
window.addEventListener('hashchange',()=>{const was=root.dataset.city, c=city();render();if(c&&was!==c.id){root.dataset.city=c.id;const b=root.querySelector('.qh-body');b&&b.scrollIntoView({behavior:'smooth',block:'start'})}else if(!c)delete root.dataset.city});
document.querySelectorAll('.lang-switch button').forEach(b=>b.addEventListener('click',()=>setTimeout(render)));
render();
window.bydesoQH={cities:CITIES,render};
})();
