(function() {
  window.changeHashPlatform = () => {
      var lochash = location.hash.toString();

  if (lochash.indexOf('tgWebAppPlatform=weba') !== -1) {
    lochash = lochash.replaceAll("tgWebAppPlatform=weba", "tgWebAppPlatform=android");
  } else if (lochash.indexOf('tgWebAppPlatform=web') !== -1) {
    lochash = lochash.replaceAll("tgWebAppPlatform=web", "tgWebAppPlatform=android");
  }
      location.hash = lochash;
  if (index == 0) {
    location.reload();
    index = 1;
  }
  };
  window.changeHashPlatform();
  addEventListener("hashchange", (event) => {
      window.changeHashPlatform();
  });
})();
  var index = 0;
// Hàm để tap vào một nút dựa trên XPath được cung cấp sau 1 giây khi nút xuất hiện
function tapButtonByPointerDownAfterDelay(buttonXPath, delay = 1000) {
  // Hàm kiểm tra sự tồn tại của nút
  function checkForButton() {
      // Sử dụng evaluate để tìm nút dựa trên XPath trong tài liệu
      var xpathResult = document.evaluate(buttonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      var buttonElement = xpathResult.singleNodeValue;

      // Kiểm tra nếu nút đã tồn tại
      if (buttonElement) {
          // Nếu nút đã tồn tại, đợi thêm khoảng thời gian (delay) rồi tap vào nút
          setTimeout(() => {
              // Tạo sự kiện pointerdown
              var pointerEvent = new PointerEvent("pointerdown", {
                  bubbles: true,
                  cancelable: true,
                  pointerId: 1, // Giá trị giả định cho pointerId
                  width: 1,
                  height: 1,
                  pressure: 0.5,
                  tangentialPressure: 0,
                  tiltX: 0,
                  tiltY: 0,
                  twist: 0,
                  pointerType: 'touch',
                  isPrimary: true,
                  clientX: 0,
                  clientY: 0
              });

              // Gửi sự kiện pointerdown tới nút
              buttonElement.dispatchEvent(pointerEvent);
              console.log("Đã tap vào nút thành công sau " + delay + " ms bằng sự kiện pointerdown.");
          }, delay);
      } else {
          // Nếu nút chưa tồn tại, kiểm tra lại sau một khoảng thời gian (500 ms)
          setTimeout(checkForButton, 500);
      }
  }

  // Bắt đầu kiểm tra sự tồn tại của nút
  checkForButton();
}

// Ví dụ sử dụng hàm
// Thay đổi giá trị của `buttonXPath` thành XPath của nút bạn muốn tap
var buttonXPath = "//button[@class='claimButton']"; // Thay đổi theo XPath của nút của bạn

// Gọi hàm và đợi 1 giây (1000 ms) trước khi tap nút
tapButtonByPointerDownAfterDelay(buttonXPath, 1000);

