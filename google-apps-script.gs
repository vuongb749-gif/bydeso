// Dán toàn bộ file này vào Google Sheets > Tiện ích mở rộng > Apps Script.
var TIEU_DE = ['Thời gian', 'Loại yêu cầu', 'Họ tên', 'Số điện thoại', 'Telegram', 'Email',
  'Dự án / Căn', 'Kênh nhận tin', 'Nội dung quan tâm', 'Tần suất', 'Trang gửi',
  'Đồng ý', 'Thời điểm đồng ý'];
var SO_COT_CU = 11; // Bảng tạo trước khi có ô đồng ý chỉ có 11 cột tiêu đề.
var GIOI_HAN_MOI_PHUT = 30; // Chặn bớt thư rác: tối đa 30 yêu cầu mỗi phút.

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse(e.postData.contents);
    if (!d.sdt && !d.telegram && !d.email) return traLoi(false);
    lock.waitLock(20000);
    if (quaGioiHan()) return traLoi(false);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(TIEU_DE);
      sheet.getRange(1, 1, 1, TIEU_DE.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    } else if (!sheet.getRange(1, TIEU_DE.length).getValue()) {
      // Bảng cũ: chỉ thêm tiêu đề hai cột mới, không đụng vào các cột đang có.
      sheet.getRange(1, SO_COT_CU + 1, 1, TIEU_DE.length - SO_COT_CU)
        .setValues([TIEU_DE.slice(SO_COT_CU)]).setFontWeight('bold');
    }
    var thoiGian = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    sheet.appendRow([
      vanBan(thoiGian),
      vanBan(d.loai), vanBan(d.hoTen), vanBan(d.sdt), vanBan(d.telegram), vanBan(d.email),
      vanBan(d.duAn), vanBan(d.kenh), vanBan(d.noiDung), vanBan(d.tanSuat), vanBan(d.trang),
      vanBan(d.dongY), d.dongY ? vanBan(thoiGian) : ''
    ]);
    return traLoi(true);
  } catch (err) {
    return traLoi(false);
  } finally {
    lock.releaseLock();
  }
}

// Mở link Web App trên trình duyệt để kiểm tra link còn hoạt động.
function doGet() {
  return ContentService.createTextOutput('Bydeso Sheets dang hoat dong');
}

// Dấu ' ở đầu giúp giữ số 0 đầu số điện thoại và ngăn nội dung khách nhập chạy như công thức.
function vanBan(v) {
  v = String(v == null ? '' : v).slice(0, 300);
  return v ? "'" + v : '';
}

function quaGioiHan() {
  var cache = CacheService.getScriptCache();
  var dem = Number(cache.get('dem') || 0) + 1;
  cache.put('dem', String(dem), 60);
  return dem > GIOI_HAN_MOI_PHUT;
}

function traLoi(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}
