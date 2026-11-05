# Bydeso: ghi chú cho Claude

Trang bất động sản tĩnh. Repo `git@github.com:vuongb749-gif/bydeso.git`, nhánh `main`, làm thẳng trên main.
Lên mạng tại https://vuongb749-gif.github.io/bydeso/ và https://bydeso.pages.dev/ (Cloudflare Pages tự cập nhật từ GitHub, bộ nhớ đệm khoảng 10 phút).

## Làm việc với chủ trang
- Chủ trang nói tiếng Việt, không phải lập trình viên: trả lời tiếng Việt, đơn giản, không thuật ngữ.
- Chỉ commit và đẩy lên khi chủ trang bảo ("đẩy lên"). Hỏi trước khi đẩy.
- Phong cách mong muốn: 3D phải giống bản vẽ/phối cảnh kiến trúc, thật, không kiểu hoạt hình hay game.
- Giao diện luôn nền tối kiểu moso.vn (không có nút sáng/tối): nền `#111111`, thẻ `#171717`, viền `#2e2e2e`, chữ `#f5f5f5`, chữ phụ `#a3a3a3`, màu nhấn vàng `#facc15` (Moso dùng cam, Bydeso dùng vàng). Nền phẳng, không quầng sáng màu.
- Khối chữ trên sa bàn không có nền mờ tối phía sau (áp dụng cho mọi dự án).
- Thẻ dự án ở trang chủ không ghi giá. Bấm thẻ mở trang thông tin dự án, sa bàn chỉ mở qua nút riêng.
- Thư viện ảnh trang dự án chỉ hiện ảnh phối cảnh và mô hình 3D, không có layout hay mặt bằng 2D.

## Các file
- `index.html`: trang chính, khoảng 2 MB, JS và ảnh base64 viết thẳng trong file. Sửa bằng script node thay chuỗi đúng một chỗ, giữ nguyên CRLF; không mở cả file ra đọc.
- `camellia-3d.html`: sa bàn tòa nhà (three.js 0.160 qua importmap jsdelivr), nhúng bằng iframe, nói chuyện với trang chính bằng postMessage (`b3d-back`...).
- `camellia-units.js`: dữ liệu căn (`window.BYDESO_3D = {P, DIR, VIEW, VF, ST, TYPES, rng, units}`). Trang chủ và sa bàn cùng đọc nên số liệu luôn khớp. `P.slots` là các căn của tầng điển hình theo Salekit.
- `can-3d.html`: mô hình 3D xoay 360° của từng mẫu căn. Tham số `?plan=ch-03|ch-11|ch-19|ch-20&code=&embed=1&lang=en`.
- `layout/`: ảnh theo mẫu căn: `ch-XX-layout.jpg` (layout 2D, dùng để dựng 3D), `ch-XX-3d.jpg` (phối cảnh Salekit, làm ảnh bìa), `ch-XX-vi-tri.jpg`, cùng `mat-bang-tang-dien-hinh.jpg`.
- `bydeso-sheet.js` và `google-apps-script.gs`: gửi form về Google Sheet. Khi thử form, thay `window.bydesoSend` bằng hàm giả để không ghi vào Sheet thật.

## Đường dẫn trong trang (hash)
`#du-an` danh sách dự án · `#da/<slug>` trang thông tin dự án · `#3d/<slug>` sa bàn · `#sp/<id>` trang căn · `#da-luu`, `#quan-tam`.
Biến toàn cục: `window.bydesoProjects` (`card`, `projects`, `facts`, `open(n)`), `window.bydeso3D` (`has`, `hash`, `open`, `stats`...), `window.bydesoFeed`, `window.bydesoDetail`.

## Thêm một dự án căn hộ mới (đi theo mẫu The Camellia)
1. **Dữ liệu dự án** trong `index.html`: thêm vào mảng `P` (tên, loại, tỉnh, khu vực, ảnh) và `FACTS` (quy mô + vị trí, tiếng Việt và tiếng Anh).
2. **Dữ liệu căn**: tạo file kiểu `camellia-units.js` từ Salekit: số tầng, các căn của tầng điển hình (`slots` theo mét), loại căn, diện tích thông thủy và tim tường, hướng.
3. **Sa bàn**: sao chép `camellia-3d.html`, đổi hình khối (`slots`, `cores`, `slabs`) và file dữ liệu, rồi đăng ký trong `window.bydeso3D` ở `index.html`.
4. **Trang dự án**: thêm các mẫu căn vào `PLANS` trong `index.html` (`[khóa, mã căn, DT thông thủy, DT tim tường]`).
5. **3D từng mẫu căn** trong `can-3d.html`:
   - thêm vào `METAS` (rộng `w`, sâu `d` theo mét, mã, diện tích);
   - viết hàm `planXX()` dùng `draft(ox, oy, k)`: đổi tọa độ pixel trên ảnh layout ra mét (`k` = số pixel mỗi mét). Có sẵn:
     - tường: `WZ`, `WX`, `solid`, `slab`, `door`, `clad`
     - sàn: `oak`, `tile`, `balc`
     - nội thất: `bed`, `night`, `ward`, `chair`, `plant`, `toilet`, `vanity`, `shower`, `sofa`, `tv`, `art`, `rug`, `tables`, `table`, `counter`, `hob`, `sink`, `fridge`, `washer`, `led`
   - thêm vào bảng `PLANS` (tên phòng, các góc nhìn qua `roomView`).
   Mở ảnh `ch-XX-layout.jpg`, đọc tọa độ tường và cửa bằng pixel, dựng giống các mẫu ch-03, ch-19, ch-20 đã có.

## Chất lượng hình 3D (đã chỉnh, giữ nguyên khi thêm mẫu mới)
- Hậu kỳ: EffectComposer + RenderPass + GTAOPass (che khuất môi trường) + OutputPass. Chỉ vẽ lại khi cảnh thay đổi.
- Đã chốt với chủ trang:
  - ánh sáng: exposure .9; Hemisphere `0xfff8f0 / 0xb8a68e / .32`; nắng `0xffeedb` cường độ 2.1, bóng 4096 (2048 trên điện thoại)
  - AO: radius .6, scale 1.45
  - vật liệu: sàn gỗ sồi `rgb(184,148,110)` có vân và mắt gỗ; tường `0xf2efea`, mép cắt màu xám
- Muốn kiểm tra hình: chụp canvas bằng `renderer.domElement.toDataURL` rồi xem. Khung trình duyệt bị ẩn sẽ bị chậm, đừng tin số fps đo được lúc đó.

## Việc còn mở
- Chưa có dữ liệu căn tầng 24–25; cách gọi tên tầng (3A, 12A, 12B) còn cần chủ trang xác nhận.
- Giá và trạng thái căn là minh họa (trừ CH-0301); đang chờ bảng giá thật.
