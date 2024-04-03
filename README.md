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
    </script>
    ```