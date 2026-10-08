# Yayın Öncesi Kontrol Listesi

Bu site, mevcut web sitesine ve Instagram hesabına doğrudan erişilemeden, müşteri tarafından sağlanan araştırma notlarıyla hazırlandı. Aşağıdaki maddeler yayından önce işletmeyle birlikte doğrulanmalıdır.

## İşletmenin doğrulaması gerekenler
- [ ] **Araç özellikleri:** Klima (Instagram ilanında geçiyor), taşıma alanı düzeni, mola, temizlik ve yolculuk sırasında bilgilendirme uygulaması. Doğrulananlar “Araç ve yolculuk” bölümüne somut madde olarak eklenecek.
- [ ] **Refakatli taşıma:** Kapsamı ve hangi rotalarda sunulduğu.
- [ ] **Yurt dışı rotalar:** Hangi ülkelere, hangi koşullarla hizmet verildiği. Sitede ülke listesi verilmedi; rota bazında bilgi alınması isteniyor.
- [ ] **Hava yolu organizasyonu:** İşletmenin rolü (organizasyon/refakat/evrak).
- [ ] **Kafes:** İşletme kafes sağlıyor mu, müşterinin kafesi kullanılabiliyor mu?
- [ ] **Hayvan türleri:** Formda Kedi / Köpek / Diğer seçenekleri var; kabul edilmeyen tür varsa güncellenecek.
- [ ] **İkinci numara (0544 598 42 86):** Bazı ilanlarda görülüyor; işlevi doğrulanmadığı için sitede kullanılmadı.
- [ ] **Mevcut sitedeki sayısal iddialar** (yıl, transfer sayısı vb.): Yeni sitede kullanılmadı. Belgelenirse eklenebilir.
- [ ] **“Resmî” ifadesi / yetki belgesi:** Instagram biyografisindeki ifade tek başına kanıt sayılmadı. Yetki belgesi varsa belge adı ve numarasıyla eklenebilir.
- [ ] **Açık adres / unvan:** KVKK metni ve yapılandırılmış veri (LocalBusiness) için.

## İçerik ve görseller
- [ ] Orijinal logo dosyası alınacak; `index.html` başlığındaki geçici pati ikonu ve renk değişkenleri logoya göre eşleştirilecek.
- [ ] Gerçek araç fotoğrafı → `assets/img/hero-arac.webp`, araç içi → `assets/img/arac-ic.webp`.
- [ ] Galeri için Instagram’daki gerçek fotoğraflar (araç, yolculuk, teslimat) işletmeden orijinal çözünürlükte alınacak; `assets/js/galeri.js` doldurulacak.
- [ ] İnsanların, plakaların veya müşteri bilgilerinin göründüğü her görsel için **web kullanım izni** alınacak.
- [ ] Yapay zekâ ile üretilmiş görsel, gerçek transfer veya müşteri kanıtı olarak kullanılmayacak.
- [ ] Geçmiş Instagram ilanları “Yaklaşan seferler” listesine eklenmeyecek.
- [ ] Gerçek görsel eklendiğinde `og:image` etiketi açılacak.

## Hukuki
- [ ] `kvkk.html` ve `kullanim-kosullari.html` taslaktır; hukuk danışmanı onayından sonra sarı uyarı kutusu ve `noindex` etiketi kaldırılacak.

## Teknik
- [ ] Gerçek cihazda (iOS Safari + Android Chrome) form → WhatsApp akışı denenecek.
- [ ] Alan adına yüklendikten sonra Google Search Console’a `sitemap.xml` gönderilecek.
- [ ] Lighthouse ile mobil performans ve erişilebilirlik ölçülecek (görseller eklendikten sonra).
