# Değerlendirme, Öncelikler ve Sayfa Yapısı

## Kaynak erişimi
Çalışma ortamının ağ politikası `pettransfer.tr` ve `instagram.com` alan adlarını engelledi; web aramasında da indekslenmiş içerik bulunamadı. Bu yüzden mevcut site ve Instagram içerikleri **doğrudan incelenemedi**. Tüm içerik, sağlanan araştırma notlarına dayanır. Notlarda bulunmayan her bilgi “doğrulanacak” olarak bırakıldı (bkz. `YAYIN-KONTROL.md`).

## Kısa değerlendirme
- Hizmetin değeri güvende ve iletişimde: Ziyaretçi “dostum güvende mi, süreç nasıl işler, fiyat ne olur?” sorularına hızlı cevap arıyor.
- Talepler WhatsApp’tan geliyor, ancak eksik bilgiyle gelen mesajlar ek yazışma gerektirir. Teklif bölümü gereken bilgileri listeliyor ve bu başlıklarla hazır bir WhatsApp mesajı açıyor.
- Instagram’daki ilan görselleri yoğun yazılı. Web’de bu bilgi tarih, çıkış ve güzergâh alanlarına ayrıldı.
- Güven, uydurma rakam veya yorumlarla değil, gerçek araç ve teslimat görselleri, açık süreç ve dürüst SSS ile kuruluyor.

## Öncelikler
1. **Nitelikli WhatsApp talebi:** Ana buton, mobil sabit çubuk ve teklif bölümündeki başlıklı hazır mesaj.
2. **Mobil kullanım:** Tek sütun, 48 px dokunma alanları, 16 px form yazısı, sabit Ara/WhatsApp çubuğu.
3. **Güven:** Altı adımlı süreç, gerçek fotoğraf alanları, doğrulanmamış iddiaların çıkarılması.
4. **Güncellenebilir seferler:** `seferler.js` ile kod bilgisi gerektirmeden güncelleme, tarihi geçenlerin otomatik gizlenmesi.
5. **Arama görünürlüğü:** Başlık, açıklama, bölüm başlıkları ve LocalBusiness yapılandırılmış verisi.

## Sayfa yapısı
| # | Bölüm | Amaç | Ana eylem |
|---|-------|------|-----------|
| 1 | Ana bölüm | Ne yapıldığını tek bakışta anlatmak | WhatsApp’tan Teklif Al / Transfer Sürecini İncele |
| 2 | Hizmetler | Altı hizmetin kapsamı | — |
| 3 | Yaklaşan seferler | Planlanan güzergâhlar ya da boş durum mesajı | Bu Sefer İçin Bilgi Al |
| 4 | Transfer süreci | Talepten teslimata altı adım | Talep Formuna Git |
| 5 | Araç ve yolculuk | Taşıma düzeni (yalnızca doğrulanmış özellikler) | Yolculuk Koşullarını Sor |
| 6 | Gerçek yolculuklar | Araç / Yolculuk / Teslimat galerisi | Instagram’da görüntüle |
| 7 | SSS | Teklif, fiyat, kafes, teslim alma, evrak, ülke, iletişim | — |
| 8 | Teklif talebi | Gereken bilgiler + başlıklı hazır WhatsApp mesajı | WhatsApp’ta Hazır Mesajı Aç |
| 9 | İletişim / alt bilgi | Telefon, WhatsApp, e-posta, Instagram | Ara / WhatsApp (mobil çubuk) |

## Metin ve doğruluk kararları
- İngilizce süs başlıkları kullanılmadı; tüm başlıklar Türkçe.
- Müşteri yorumu, sertifika, yetki belgesi, sigorta, tecrübe yılı, transfer sayısı ve güvenlik garantisi **eklenmedi**.
- “Klimalı araç” ifadesi doğrulanana kadar kesin dille yazılmadı; yalnızca “sorabilirsiniz” şeklinde yer aldı.
- Yolculuk sırasında bilgilendirme sıklığı için taahhüt verilmedi; “yola çıkmadan önce birlikte kararlaştırıyoruz” dendi.
- Yurt dışı için ülke listesi verilmedi; rota bazında bilgi istendi.
- Kıbrıs transferi, belgelenmiş Girne–İzmir–Seferihisar paylaşımı üzerinden geçmiş örnek olarak anlatıldı.
- Eğitim ve yavru ilanları siteye eklenmedi; odak transfer hizmeti.
- İşletme kararıyla site formu ve KVKK/koşullar sayfaları kaldırıldı; site kişisel veri toplamıyor. Teklif bölümü mesajın kullanıcı WhatsApp’ta Gönder’e dokunduğunda ulaşacağını açıkça belirtir.

## Anahtar ifadeler (doğal kullanım)
“evcil hayvan taşıma” (başlık, açıklama, ana bölüm), “pet transfer” (marka, başlık), “şehirler arası evcil hayvan transferi” (ana bölüm, yurt içi kartı), “yurt dışı evcil hayvan taşıma” (yurt dışı kartı), “Kıbrıs evcil hayvan transferi” (Kıbrıs kartı).

## Renkler
Yaklaşık web paleti uygulandı; resmî ölçülmüş marka kodu değildir. Kontrast oranları (WCAG):
- Beyaz / #174B2B: 10.1:1 · Beyaz / #39843C: 4.6:1 · #174B2B / #B8E34B: 6.8:1 · #5E6B60 / #EFF5E9: 5.0:1
- #39843C, açık yeşil zeminde küçük yazı için yetersiz (4.2:1); orada yalnızca ikon ve süs olarak kullanıldı.
- WhatsApp butonu için beyaz yazıyla daha yüksek kontrastlı #1F7A3A kullanıldı.

## Uygulama doğrulaması
Playwright (Chromium) ile 375 px mobil ve 1366 px masaüstünde test edildi: yatay kaydırma yok, menü aç/kapa, galeri filtresi, hazır WhatsApp mesajı içeriği, sefer kartlarında geçmiş tarihin gizlenmesi, eksik fotoğraf yedekleri ve sayfa içi bağlantılar çalışıyor. Konsol hatası yok. WhatsApp’ın gerçek cihazda açılması ortam ağ kısıtı nedeniyle denenemedi.
