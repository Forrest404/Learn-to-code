(function () {
  var EMAIL = "willshoots@gmail.com";
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".thumb"));
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lb-img");
  var enquire = document.getElementById("lb-enquire");
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + thumbs.length) % thumbs.length;
    var src = thumbs[current].querySelector("img");
    var n = current + 1;
    img.src = src.getAttribute("src");
    img.alt = src.alt;
    var subject = "Enquiry about photo " + n;
    var body = "Hi, I'm interested in photo " + n + " (" + new URL(img.src, location.href).href + ").";
    enquire.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lb-close").focus();
  }

  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  thumbs.forEach(function (t, i) {
    t.addEventListener("click", function () { open(i); });
  });

  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { show(current + 1); });

  // Click on the dark backdrop closes
  box.addEventListener("click", function (e) { if (e.target === box) close(); });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
