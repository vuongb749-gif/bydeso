// Gửi dữ liệu các form của Bydeso về Google Sheets.
// Dán link Web App của Google Apps Script vào giữa hai dấu nháy ở dòng dưới.
window.BYDESO_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwL8qNVfSP0qtjP8DCJXEt52Y3yI1wf4wZZUJqQXwKoJeun8CJke7vC9DLLAxrSo9rHZQ/exec';

// Trả về true chỉ khi Google Sheets xác nhận đã ghi xong.
window.bydesoSend = function (data) {
  var url = window.BYDESO_SHEET_URL;
  if (!url) return Promise.resolve(false);
  var ctrl = new AbortController();
  var timer = setTimeout(function () { ctrl.abort(); }, 20000);
  return fetch(url, {
    method: 'POST',
    // text/plain là bắt buộc: Apps Script không trả lời được yêu cầu kiểm tra CORS của application/json.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(Object.assign({ trang: location.pathname.split('/').pop() || 'index.html' }, data)),
    signal: ctrl.signal
  })
    .then(function (r) { return r.json(); })
    .then(function (j) { return j.ok === true; })
    .catch(function () { return false; })
    .finally(function () { clearTimeout(timer); });
};
