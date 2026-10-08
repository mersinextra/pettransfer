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

  /* Talep formu → WhatsApp mesajı */
  var form = document.getElementById("talep-formu");
  if (form) {
    var dateInput = form.querySelector("#f-tarih");
    if (dateInput) {
      var t = new Date();
      dateInput.min = t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
    }
    var errorBox = document.getElementById("form-hata");
    var statusBox = document.getElementById("form-durum");

    var messages = {
      ad: "Lütfen adınızı ve soyadınızı yazın.",
      telefon: "Lütfen size ulaşabileceğimiz bir telefon numarası yazın.",
      cikis: "Lütfen çıkış noktasını yazın.",
      varis: "Lütfen varış noktasını yazın.",
      tarih: "Lütfen tahmini bir tarih seçin.",
      tur: "Lütfen hayvan türünü seçin.",
      sayi: "Lütfen hayvan sayısını yazın.",
      kilo: "Lütfen yaklaşık ağırlığı yazın."
    };

    var setError = function (field, msg) {
      var id = field.id + "-hata";
      var existing = document.getElementById(id);
      if (msg) {
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", id);
        if (!existing) {
          existing = el("p", { id: id, class: "field-error" });
          field.parentNode.appendChild(existing);
        }
        existing.textContent = msg;
      } else {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
        if (existing) existing.remove();
      }
    };

    var validate = function (field) {
      var v = field.value.trim();
      var msg = "";
      if (field.required && !v) msg = messages[field.name] || "Bu alan gerekli.";
      else if (field.name === "telefon" && v.replace(/\D/g, "").length < 10) msg = "Telefon numarası eksik görünüyor.";
      else if (field.name === "sayi" && (!/^\d+$/.test(v) || +v < 1)) msg = "Lütfen geçerli bir sayı yazın.";
      else if (field.name === "tarih" && field.min && v && v < field.min) msg = "Lütfen bugünden sonraki bir tarih seçin.";
      setError(field, msg);
      return !msg;
    };

    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      f.addEventListener("blur", function () { if (f.hasAttribute("aria-invalid")) validate(f); });
      f.addEventListener("change", function () { if (f.hasAttribute("aria-invalid")) validate(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea"));
      var invalid = fields.filter(function (f) { return !validate(f); });
      if (invalid.length) {
        errorBox.textContent = "Lütfen işaretli alanları kontrol edin.";
        errorBox.hidden = false;
        statusBox.hidden = true;
        invalid[0].focus();
        return;
      }
      errorBox.hidden = true;

      var d = new FormData(form);
      var g = function (k) { return String(d.get(k) || "").trim(); };
      var tarih = parseDate(g("tarih"));
      var lines = [
        "Merhaba, evcil hayvan transferi için teklif almak istiyorum.",
        "",
        "Ad soyad: " + g("ad"),
        "Telefon: " + g("telefon"),
        "Çıkış: " + g("cikis"),
        "Varış: " + g("varis"),
        "Tahmini tarih: " + (tarih ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(tarih) : g("tarih")),
        "Hayvan türü: " + g("tur"),
        "Sayı: " + g("sayi"),
        "Yaklaşık ağırlık: " + g("kilo") + (/kg/i.test(g("kilo")) ? "" : " kg")
      ];
      if (g("not")) lines.push("Not: " + g("not"));
      var url = waUrl(lines.join("\n"));

      var win = window.open(url, "_blank");
      if (win) { try { win.opener = null; } catch (err) { /* yok say */ } }
      statusBox.innerHTML = "";
      statusBox.appendChild(el("p", {}, [el("strong", { text: "WhatsApp mesajınız hazırlandı." })]));
      statusBox.appendChild(el("p", { text: "Talebinizin bize ulaşması için WhatsApp’ta mesajı kontrol edip Gönder’e dokunun. Gönderilmeyen mesaj bize ulaşmaz." }));
      statusBox.appendChild(el("p", {}, [
        document.createTextNode(win ? "WhatsApp açılmadıysa " : "WhatsApp’ı açmak için "),
        el("a", { href: url, rel: "noopener", target: "_blank", text: "buraya dokunun" }),
        document.createTextNode(" ya da 0544 414 42 86 numarasını arayın.")
      ]));
      statusBox.hidden = false;
      statusBox.setAttribute("tabindex", "-1");
      statusBox.focus();
    });
  }

  /* WhatsApp bağlantıları yeni sekmede açılsın */
  document.querySelectorAll("a[data-wa-link]").forEach(function (a) {
    a.target = "_blank";
    a.rel = "noopener";
  });
})();
