/*
 * GOOGLE ADS TIKLAMA ÖLÇÜMÜ
 * ------------------------------------------------------------
 * WhatsApp (wa.me, api.whatsapp.com) ve telefon (tel:) bağlantılarına yapılan
 * gerçek kullanıcı tıklamalarında Google Ads dönüşüm olayı gönderir.
 *
 * - Google etiketi (gtag.js) index.html <head> içinde tek kez yüklenir.
 * - Sayfa açılışında olay gönderilmez; yalnızca gerçek tıklamada (event.isTrusted).
 * - Bağlantının varsayılan davranışı hiçbir zaman engellenmez: ölçüm engellense
 *   ya da gtag yüklenemese de WhatsApp/arama normal açılır.
 * - Olayla birlikte kişisel veri, bağlantı adresi veya tutar gönderilmez.
 * - Aynı türde art arda (2 sn içinde) gelen tıklamalar tek olay sayılır.
 */
(function () {
  "use strict";

  if (window.__ptAdsClickTracking) return; // dinleyici ikinci kez eklenmesin
  window.__ptAdsClickTracking = true;

  var HEDEFLER = {
    whatsapp: "AW-18355595125/ULKOCLGe0pUdEPXO0LBE",
    telefon: "AW-18355595125/SQcBCLSe0pUdEPXO0LBE"
  };
  var TEKRAR_SURESI_MS = 2000;
  var sonGonderim = {};

  function hedefTuru(link) {
    var href = link.getAttribute("href") || "";
    if (/^tel:/i.test(href)) return "telefon";
    var url;
    try { url = new URL(href, location.href); } catch (e) { return null; }
    var host = url.hostname.toLowerCase();
    if (host === "wa.me" || host === "api.whatsapp.com") return "whatsapp";
    return null;
  }

  document.addEventListener("click", function (e) {
    if (!e.isTrusted) return;
    var link = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!link) return;
    var tur = hedefTuru(link);
    if (!tur) return;

    var simdi = Date.now();
    if (sonGonderim[tur] && simdi - sonGonderim[tur] < TEKRAR_SURESI_MS) return;
    sonGonderim[tur] = simdi;

    if (typeof window.gtag !== "function") return;
    try {
      window.gtag("event", "conversion", {
        send_to: HEDEFLER[tur],
        transport_type: "beacon"
      });
    } catch (err) { /* ölçüm hatası iletişimi engellemez */ }
  });
})();
