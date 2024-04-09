[Kolik je europoslanců, kdo hájí ‚české zájmy‘ a co je to trialog? Zjistěte, co víte o Evropské unii](https://www.irozhlas.cz/zpravy-domov/kolik-je-europoslancu-kdo-haji-ceske-zajmy-a-co-je-trialog-zjistete-co-vite-o_2404040500_aur)

```
<iframe
  src="https://data.irozhlas.cz/eu-kviz"
  loading="lazy"
  scrolling="no"
  frameborder="0"
  allowtransparency="true"
  style="width: 0; min-width: 100% !important"
  height="530"
  id="eu-kviz"
></iframe>
<script type="text/javascript">
  window.addEventListener("message", function (a) {
    if (void 0 !== a.data["cro-embed-height"])
      for (var e in a.data["cro-embed-height"])
        if ("eu-kviz" == e) {
          var d = document.querySelector("#eu-kviz");
          d && (d.style.height = a.data["cro-embed-height"][e] + "px");
        }
  });
  window.addEventListener("scroll", () => {
    const iframeRect = document.querySelector("iframe").getBoundingClientRect();
    // Example message structure. You'd need to tailor it to your requirements.
    const visibleInfo = { top: iframeRect.top, bottom: iframeRect.bottom };
    document
      .querySelector("iframe")
      .contentWindow.postMessage(visibleInfo, "*");
  });
</script>
