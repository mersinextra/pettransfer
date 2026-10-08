(function () {
  "use strict";

  var WA_NUMBER = "905444144286";

  /* Yıl */
  var yil = document.getElementById("yil");
  if (yil) yil.textContent = String(new Date().getFullYear());

  /* Mobil menü */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("open", open);
      toggle.querySelector(".visually-hidden").textContent = open ? "Menüyü kapat" : "Menüyü aç";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* Henüz eklenmemiş fotoğraflar: dosya yoksa görseli kaldır, yedek içerik görünsün */
  document.querySelectorAll("img[data-optional-img]").forEach(function (img) {
    var drop = function () { img.remove(); };
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener("error", drop);
  });

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function icon(id, cls) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", cls || "icon");
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  }
  function waUrl(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  /* Yaklaşan seferler */
  var trFormat = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" });
  function parseDate(s) {
    var p = String(s || "").split("-").map(Number);
    if (p.length !== 3 || p.some(isNaN)) return null;
    return new Date(p[0], p[1] - 1, p[2]);
  }
  var list = document.getElementById("sefer-listesi");
  var empty = document.getElementById("sefer-bos");
  if (list && empty) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var upcoming = (window.SEFERLER || [])
      .map(function (s) { return Object.assign({}, s, { _d: parseDate(s.tarih) }); })
      .filter(function (s) { return s._d && s._d >= today && s.cikis; })
      .sort(function (a, b) { return a._d - b._d; });

    upcoming.forEach(function (s) {
      var dateText = trFormat.format(s._d);
      var stops = (s.duraklar || []).filter(Boolean);
      var route = [s.cikis].concat(stops);
      var msg = "Merhaba, " + dateText + " tarihli " + route.join(" – ") +
        " seferi hakkında bilgi almak istiyorum.";
      var card = el("article", { class: "trip" }, [
        el("p", { class: "trip-date" }, [icon("i-calendar"), el("span", { text: dateText })]),
        el("p", { class: "trip-from" }, [
          document.createTextNode("Çıkış: "), el("strong", { text: s.cikis })
        ]),
        stops.length ? el("ul", { class: "trip-route", "aria-label": "Güzergâh" },
          stops.map(function (d) { return el("li", { text: d }); })) : null,
        s.not ? el("p", { class: "trip-note", text: s.not }) : null,
        el("a", { class: "btn btn-whatsapp", href: waUrl(msg), rel: "noopener", target: "_blank" },
          [icon("i-wa"), document.createTextNode("Bu Sefer İçin Bilgi Al")])
      ]);
      list.appendChild(card);
    });
    if (upcoming.length) {
      document.getElementById("sefer-bos-baslik").textContent = "Rotanız listede yok mu?";
      document.getElementById("sefer-bos-metin").textContent = "Farklı güzergâh ve tarihler için de bize yazabilirsiniz.";
    }
  }

  /* Galeri */
  var gallery = document.getElementById("galeri");
  var labels = { arac: "Araç", yolculuk: "Yolculuk", teslimat: "Teslimat" };
  var icons = { arac: "i-van", yolculuk: "i-road", teslimat: "pati" };
  if (gallery) {
    (window.GALERI || []).forEach(function (g) {
      var media = el("div", { class: "g-media" });
      if (g.gorsel) {
        media.appendChild(el("img", { src: g.gorsel, alt: g.alt || g.baslik, loading: "lazy", decoding: "async", width: "800", height: "600" }));
      } else {
        media.appendChild(icon(icons[g.kategori] || "pati"));
      }
      gallery.appendChild(el("article", { class: "g-item", "data-kategori": g.kategori }, [
        media,
        el("div", { class: "g-body" }, [
          el("span", { class: "g-tag", text: labels[g.kategori] || "" }),
          el("h3", { text: g.baslik }),
          g.metin ? el("p", { text: g.metin }) : null,
          g.link ? el("a", { href: g.link, rel: "noopener", target: "_blank", text: "Instagram’da görüntüle" }) : null
        ])
      ]));
    });

    var tabs = Array.prototype.slice.call(document.querySelectorAll(".tabs [role=tab]"));
    var select = function (tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      var f = tab.getAttribute("data-filter");
      gallery.querySelectorAll(".g-item").forEach(function (item) {
        item.hidden = f !== "hepsi" && item.getAttribute("data-kategori") !== f;
      });
    };
    tabs.forEach(function (t, i) {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!dir) return;
        var next = tabs[(i + dir + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
  }

  /* WhatsApp bağlantıları yeni sekmede açılsın */
  document.querySelectorAll("a[data-wa-link]").forEach(function (a) {
    a.target = "_blank";
    a.rel = "noopener";
  });
})();
