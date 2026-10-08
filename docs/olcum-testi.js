// Google Ads tıklama ölçümü tarayıcı testi (Playwright). Çalıştırma: site kökünde `python3 -m http.server 8123`, sonra `node docs/olcum-testi.js`.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const WA='AW-18355595125/ULKOCLGe0pUdEPXO0LBE', TEL='AW-18355595125/SQcBCLSe0pUdEPXO0LBE';
let fails=0; const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m); if(!c) fails++;};
async function setup(b, vp, opts={}) {
  const ctx = await b.newContext({ viewport: vp, isMobile: vp.width<500, hasTouch: vp.width<500 });
  const popups=[];
  await ctx.route('**/googletagmanager.com/**', r => opts.blockGtag ? r.abort() : r.fulfill({contentType:'application/javascript', body:'/* stub */'}));
  await ctx.route(/wa\.me|api\.whatsapp\.com/, r => { popups.push(r.request().url()); r.fulfill({contentType:'text/html', body:'ok'}); });
  if (opts.sefer) await ctx.route('**/seferler.js*', r => r.fulfill({contentType:'application/javascript', body:'window.SEFERLER=[{tarih:"2026-12-20",cikis:"Mersin",duraklar:["Ankara"],not:""}];'}));
  const p = await ctx.newPage(); const errs=[]; p.on('pageerror', e=>errs.push(e.message));
  await p.addInitScript(() => {
    window.__tel=[]; window.__prevented=[];
    window.addEventListener('click', e => { const a=e.target.closest&&e.target.closest('a[href]'); if(a){ window.__prevented.push(e.defaultPrevented); if(a.href.startsWith('tel:')){ e.preventDefault(); window.__tel.push(a.href);} } }, false); // window bubble: runs after document listener; stop real tel: navigation in headless only
  });
  await p.goto('http://localhost:8123/index.html', { waitUntil: 'networkidle' });
  return { ctx, p, popups, errs };
}
const conv = p => p.evaluate(() => dataLayer.filter(a => a[0]==='event' && a[1]==='conversion').map(a => ({send_to:a[2].send_to, keys:Object.keys(a[2]).sort().join(',')})));
async function clickAndCheck(p, sel, expected, label) {
  const before = (await conv(p)).length;
  await p.locator(sel).first().scrollIntoViewIfNeeded();
  await p.locator(sel).first().click();
  await p.waitForTimeout(300);
  const after = await conv(p); const added = after.slice(before);
  ok(added.length===1 && added[0].send_to===expected && added[0].keys==='send_to,transport_type', `${label}: tek olay → ${expected===WA?'WhatsApp':'Telefon'} (${added.length} olay)`);
  await p.waitForTimeout(2100);
}
(async () => {
  const b = await chromium.launch();
  for (const [name, vp] of [['MOBİL 375', {width:375,height:812}], ['MASAÜSTÜ 1366', {width:1366,height:900}]]) {
    console.log('\n== '+name);
    const { ctx, p, popups, errs } = await setup(b, vp, { sefer: true });
    const dl = await p.evaluate(() => dataLayer.map(a => Array.from(a).slice(0,2).map(String).join(' ')));
    ok(dl.filter(x=>x.startsWith('config AW-18355595125')).length===1, 'Google etiketi bir kez yapılandırıldı');
    ok(dl[0]==='consent default', 'İzin varsayılanı ilk komut (consent default)');
    ok((await conv(p)).length===0, 'Sayfa açılışında dönüşüm yok');
    ok(await p.locator('script[src*="googletagmanager.com/gtag/js"]').count()===1, 'gtag.js tek kez yükleniyor');
    const cases = [
      ['#ust a.btn-whatsapp svg', WA, 'Ana bölüm WhatsApp (simgeye tıklama)'],
      ['#ust a.btn-whatsapp', WA, 'Ana bölüm WhatsApp (yazıya tıklama)'],
      ['#seferler .trip a', WA, 'Sefer kartı "Bu Sefer İçin Bilgi Al" (dinamik)'],
      ['#arac a[href*="wa.me"]', WA, 'Araç bölümü WhatsApp'],
      ['#talep a.btn-whatsapp', WA, 'Teklif bölümü hazır mesaj'],
      ['#talep a[href^="tel:"]', TEL, 'Teklif bölümü telefon metni'],
      ['footer a[href^="tel:"] svg', TEL, 'Alt bilgi telefon (simge)'],
      ['footer a[href*="wa.me"]', WA, 'Alt bilgi WhatsApp'],
    ];
    if (vp.width < 900) cases.push(['.mobile-bar .mb-call svg', TEL, 'Mobil çubuk Ara (simge)'], ['.mobile-bar .mb-wa', WA, 'Mobil çubuk WhatsApp']);
    else ok(!(await p.locator('.mobile-bar').isVisible()), 'Mobil çubuk masaüstünde gizli');
    for (const c of cases) await clickAndCheck(p, ...c);
    // boş durum kutusu (sefer varken başlık değişiyor ama buton duruyor)
    await clickAndCheck(p, '#sefer-bos a', WA, 'Seferler bölümü WhatsApp');
    // hızlı çift tıklama
    const n0=(await conv(p)).length; const hero = p.locator('#ust a.btn-whatsapp');
    await hero.click(); await hero.click(); await p.waitForTimeout(300);
    ok((await conv(p)).length-n0===1, 'Hızlı iki tıklama → tek olay');
    await p.waitForTimeout(2100);
    // programatik (gerçek olmayan) tıklama
    const n1=(await conv(p)).length; await p.evaluate(() => document.querySelector('footer a[href^="tel:"]').click());
    ok((await conv(p)).length===n1, 'Kod ile tetiklenen tıklama sayılmıyor');
    // olay adı/metin kontrolü
    const prevented = await p.evaluate(() => window.__prevented);
    ok(prevented.every(x=>x===false), 'Ölçüm kodu hiçbir bağlantının varsayılan davranışını engellemedi');
    const heroHref = await p.getAttribute('#ust a.btn-whatsapp','href');
    ok(popups.includes(heroHref), 'WhatsApp hazır mesajı adresi değişmeden açıldı');
    ok(popups.every(u=>/^https:\/\/wa\.me\/905444144286/.test(u)), `Tüm WhatsApp pencereleri doğru numaraya (${popups.length} pencere)`);
    ok((await p.evaluate(()=>window.__tel)).every(u=>u==='tel:+905444144286'), 'Telefon bağlantıları tel:+905444144286');
    const nonContact=(await conv(p)).length; await p.locator('header a[href="#talep"]').first().click({force:true}).catch(()=>{}); await p.waitForTimeout(200);
    ok((await conv(p)).length===nonContact, '"Teklif Al" (sayfa içi bağlantı) dönüşüm üretmiyor');
    const all = await conv(p);
    ok(all.every(e=>e.keys==='send_to,transport_type'), 'Olaylarda yalnızca send_to ve transport_type var (kişisel veri/tutar yok)');
    ok(errs.length===0, 'Sayfa hatası yok '+JSON.stringify(errs));
    await ctx.close();
  }
  console.log('\n== Ölçüm engellendiğinde (gtag.js yüklenemiyor / gtag tanımsız)');
  { const { ctx, p, popups, errs } = await setup(b, {width:375,height:812}, { blockGtag: true });
    await p.evaluate(() => { delete window.gtag; });
    await p.locator('.mobile-bar .mb-wa').click(); await p.waitForTimeout(500);
    await p.locator('.mobile-bar .mb-call').click(); await p.waitForTimeout(300);
    ok(popups.length===1, 'WhatsApp yine açıldı');
    ok((await p.evaluate(()=>window.__tel)).length===1, 'Arama bağlantısı yine çalıştı');
    ok(errs.length===0, 'Hata yok');
    await ctx.close(); }
  console.log(`\nSONUÇ: ${fails===0?'tüm kontroller geçti':fails+' kontrol başarısız'}`);
  await b.close();
})();
