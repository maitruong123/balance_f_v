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
