# Pet Transfer Ercan Aktaş – Web Sitesi

Statik, bağımlılıksız tek sayfa site (HTML + CSS + az miktarda JavaScript). Herhangi bir statik barındırmaya (cPanel, Netlify, GitHub Pages vb.) dosyalar olduğu gibi yüklenebilir.

```
index.html                 Ana sayfa (9 bölüm)
assets/css/style.css       Stiller ve renk değişkenleri
assets/js/seferler.js      Yaklaşan seferler listesi (güncellenebilir)
assets/js/galeri.js        Gerçek yolculuklar galerisi (güncellenebilir)
assets/js/main.js          Menü, sefer kartları, galeri filtresi
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
- Ana bölüm: `assets/img/arac-yan.webp` + `arac-yan-760.webp` (17:10 oran)
- Araç bölümü: `assets/img/teslim-1.webp` (4:3)
- Galeri: `assets/js/galeri.js` içindeki `gorsel` (küçük, ~600px), `tam` (büyük), `konum` (kırpma odağı) ve `alt` alanları
- Paylaşım önizlemesi: `assets/img/og-arac.jpg` (1200×630)

Dosya yoksa site hata vermez; yerine sade bir yedek kart görünür. Görselleri WebP olarak, 200 KB altında tutun.

## Yayına alma (mevcut hosting)
1. Hosting paneline (cPanel vb.) girin, **Dosya Yöneticisi → public_html** klasörünü açın.
2. Mevcut sitenin yedeğini alın (klasördeki dosyaları ZIP'leyip indirin).
3. `pettransfer-site.zip` dosyasını yükleyip çıkartın; `index.html` doğrudan `public_html` içinde olmalı.
4. Eski siteden kalan, yeni sitede olmayan sayfalar varsa (ör. eski hizmet sayfaları) silmeden önce web sorumlunuzla yönlendirme gerekip gerekmediğini konuşun.
