# Yayın Öncesi Kontrol Listesi

Bu site, mevcut web sitesine ve Instagram hesabına doğrudan erişilemeden, müşteri tarafından sağlanan araştırma notlarıyla hazırlandı. Aşağıdaki maddeler yayından önce işletmeyle birlikte doğrulanmalıdır.

## İşletmenin doğrulaması gerekenler
- [ ] **Araç özellikleri:** Klima (Instagram ilanında geçiyor), taşıma alanı düzeni, mola, temizlik ve yolculuk sırasında bilgilendirme uygulaması. Doğrulananlar “Araç ve yolculuk” bölümüne somut madde olarak eklenecek.
- [ ] **Refakatli taşıma:** Kapsamı ve hangi rotalarda sunulduğu.
- [ ] **Yurt dışı rotalar:** Hangi ülkelere, hangi koşullarla hizmet verildiği. Sitede ülke listesi verilmedi; rota bazında bilgi alınması isteniyor.
- [ ] **Hava yolu organizasyonu:** İşletmenin rolü (organizasyon/refakat/evrak).
- [ ] **Kafes:** İşletme kafes sağlıyor mu, müşterinin kafesi kullanılabiliyor mu?
- [ ] **İkinci numara (0544 598 42 86):** Dört ilandan üçünde “Bilgi ve rezervasyon” numarası olarak, bir ilanda araç kaplamasında da geçiyor. İşletme onaylarsa iletişim bölümüne eklenebilir; şimdilik sitede yalnızca ana numara var.
- [ ] **İlanlardaki iddialar:** “7/24 kamera sistemi ile takip”, “%100 güvenlik”, “deneyimli ekip”, “zamanında teslim” ifadeleri sitede metin olarak kullanılmadı. Kamera ile takip gerçekten sunuluyorsa, kapsamı netleştirilip “Araç ve yolculuk” bölümüne eklenebilir. 
- [ ] **Mevcut sitedeki sayısal iddialar** (yıl, transfer sayısı vb.): Yeni sitede kullanılmadı. Belgelenirse eklenebilir.
- [ ] **“Resmî” ifadesi / yetki belgesi:** Instagram biyografisindeki ifade tek başına kanıt sayılmadı. Yetki belgesi varsa belge adı ve numarasıyla eklenebilir.
- [ ] **Açık adres / unvan:** Yapılandırılmış veri (LocalBusiness) için; şu an yalnızca Mezitli / Mersin yazılı.

## İçerik ve görseller
- [ ] Orijinal logo dosyası alınacak; `index.html` başlığındaki geçici pati ikonu ve renk değişkenleri logoya göre eşleştirilecek.
- [x] İşletmenin gönderdiği 5 gerçek fotoğraf eklendi: araç (ana bölüm, galeri, paylaşım görseli `og-arac.jpg`) ve 4 teslim anı (araç bölümü + galeri).
- [x] Yapay zekâ görseli içeren sefer ilanları ve onlardan kırpılan görseller işletmenin isteğiyle siteden kaldırıldı.
- [ ] Teslim fotoğraflarında yüzü görünen kişilerden web kullanım izni alındığı işletme tarafından teyit edilecek.
- [ ] Kıbrıs yolculuğu kartına gerçek fotoğraf eklenecek; şu an Instagram bağlantılı ikon kart.
- [ ] Taşıma alanının (araç içi) fotoğrafı gelirse araç bölümüne eklenebilir.
- [ ] İnsanların, plakaların veya müşteri bilgilerinin göründüğü her görsel için **web kullanım izni** alınacak.
- [ ] Yapay zekâ ile üretilmiş görsel, gerçek transfer veya müşteri kanıtı olarak kullanılmayacak.
- [ ] Geçmiş Instagram ilanları “Yaklaşan seferler” listesine eklenmeyecek.
- [x] `og:image` etiketi açıldı (WhatsApp/sosyal medya paylaşım önizlemesi).

## Teknik
- [ ] Gerçek cihazda (iOS Safari + Android Chrome) WhatsApp butonları ve hazır mesaj denenecek.
- [ ] İleride sitede form, analiz aracı veya çerez kullanılırsa KVKK aydınlatma metni yeniden ele alınacak.

## Google Ads ölçümü (AW-18355595125)
- Etiket `index.html` <head> içinde tek kez yüklenir; tıklama dinleyicisi `assets/js/olcum.js`.
- WhatsApp hedefi: `AW-18355595125/ULKOCLGe0pUdEPXO0LBE` (wa.me, api.whatsapp.com bağlantıları)
- Telefon hedefi: `AW-18355595125/SQcBCLSe0pUdEPXO0LBE` (tel: bağlantıları)
- Consent Mode varsayılanı: reklam/analiz çerezleri **denied**. Sitede çerez bandı yok; Google bu durumda çerezsiz ping gönderir, dönüşümler Google Ads'te kısmen modellenmiş görünür.
- [ ] Çerez bandı/izin yönetimi eklenip eklenmeyeceğine işletme karar verecek. Eklenirse onay anında `gtag('consent','update',{...})` çağrılmalı; KVKK aydınlatma metni ve çerez politikası hazırlanmalı.
- [ ] Yayından sonra Google Tag Assistant (tagassistant.google.com) ile kontrol: her WhatsApp/telefon butonuna bir kez tıklayın, her tıklamada doğru `send_to` ile tek `conversion` olayı görünmeli; sayfa açılışında conversion olmamalı.
- [ ] Test tıklamaları Google Ads'te dönüşüm olarak görünebilir; bunlar gerçek görüşme/satış değildir.
- [ ] Alan adına yüklendikten sonra Google Search Console’a `sitemap.xml` gönderilecek.
- [ ] Lighthouse ile mobil performans ve erişilebilirlik ölçülecek (görseller eklendikten sonra).
