!(function () {
  function t() {
    if (this.complete) {
      const e = this.getAttribute("data-lazy-src");
      if (e && this.src !== e) return void this.addEventListener("onload", t);
      const n = this.width,
        d = this.height;
      n &&
        n > 0 &&
        d &&
        d > 0 &&
        (this.setAttribute("width", n),
        this.setAttribute("height", d),
        i(this));
    } else this.addEventListener("onload", t);
  }
  var e = function () {
      const e = document.querySelectorAll("img[data-recalc-dims]");
      for (let i = 0; i < e.length; i++) t.call(e[i]);
    },
    i = function (t) {
      t.removeAttribute("data-recalc-dims"), t.removeAttribute("scale");
    };
  "undefined" != typeof window &&
    "undefined" != typeof document &&
    ("loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", e)
      : e()),
    document.body.addEventListener("is.post-load", e);
})();
