# Pet Transfer Ercan Aktaş – Web Sitesi

Statik, bağımlılıksız tek sayfa site (HTML + CSS + az miktarda JavaScript). Herhangi bir statik barındırmaya (cPanel, Netlify, GitHub Pages vb.) dosyalar olduğu gibi yüklenebilir.

```
index.html                 Ana sayfa (9 bölüm)
kvkk.html                  KVKK aydınlatma metni – TASLAK
kullanim-kosullari.html    Kullanım koşulları – TASLAK
assets/css/style.css       Stiller ve renk değişkenleri
assets/js/seferler.js      Yaklaşan seferler listesi (güncellenebilir)
assets/js/galeri.js        Gerçek yolculuklar galerisi (güncellenebilir)
assets/js/main.js          Menü, sefer kartları, galeri filtresi, WhatsApp formu
assets/img/                Gerçek fotoğraflar buraya eklenecek
docs/DEGERLENDIRME.md      Değerlendirme, öncelikler, sayfa yapısı ve metin notları
docs/YAYIN-KONTROL.md      Yayın öncesi doğrulama listesi
```

Yerelde görüntülemek için: `python3 -m http.server` ve tarayıcıda `http://localhost:8000`.

## Sefer eklemek
`assets/js/seferler.js` içindeki listeye kayıt ekleyin:

```js
{ tarih: "2026-11-20", cikis: "Mersin", duraklar: ["Adana", "Ankara", "İstanbul"], not: "" },
```

Tarihi geçen kayıtlar otomatik gizlenir. Liste boşsa “Güncel güzergâh ve tarihler için bize ulaşın” mesajı görünür.

## Fotoğraf eklemek
- Ana bölüm: `assets/img/hero-arac.webp` (1200×900)
- Araç bölümü: `assets/img/arac-ic.webp` (900×675)
- Galeri: `assets/js/galeri.js` içindeki `gorsel` ve `alt` alanları (800×600)

Dosya yoksa site hata vermez; yerine sade bir yedek kart görünür. Görselleri WebP olarak, 200 KB altında tutun.
