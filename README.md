# FC Turkse Rangers — website (demo)

Genk'teki **F.C. Turkse Rangers Waterschei** (stamnummer 9147, kuruluş 1976) için
oluşturulan kulüp websitesinin kaynak kodları.

> ⚠️ **Bu bir demodur.** Oyuncu isimleri, yönetim kurulu isimleri, fikstür ve
> puan durumu **uydurma örnek verilerdir**. Yayına almadan önce gerçek verilerle
> değiştirilmelidir. Ayrıntı için aşağıdaki *"Yayına almadan önce"* bölümüne bakın.

---

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
```

Diğer komutlar:

```bash
npm run build      # üretim derlemesi
npm start          # derlenmiş sürümü çalıştırır
npm run typecheck  # TypeScript kontrolü
```

---

## Admin paneli

`/nl/admin` (veya `/tr/admin`, `/en/admin`) adresinden girilir.

Demo hesapları — **şifre hepsinde `demo1234`**:

| E-posta | Rol | Yetkisi |
|---|---|---|
| `superadmin@turkserangers.be` | Süper yönetici | Her şey + kullanıcı yönetimi |
| `admin@turkserangers.be` | Yönetici | Tüm içerik, kullanıcı yönetimi hariç |
| `redactie@turkserangers.be` | Editör | Haber + medya + sayfa metinleri |
| `akern@turkserangers.be` | Takım sorumlusu | Sadece A-kern ve B-kern |
| `auteur@turkserangers.be` | Yazar | Haber yazar, **yayınlayamaz** |

Farklı hesaplarla giriş yapınca sol menünün ve sayfaların değiştiğini
görürsünüz — yetki matrisi `src/data/users.ts` içinde tanımlı.

**Demo sınırı:** Bu aşamada veriler tarayıcının `localStorage`'ında tutulur.
Yani değişiklikler sadece sizin tarayıcınızda kalır, sunucuya gitmez. Sol alttaki
*"Demo resetten"* düğmesi her şeyi başlangıç durumuna döndürür.

---

## Diller

Hollandaca (`nl`, varsayılan), Türkçe (`tr`) ve İngilizce (`en`).

- URL yapısı: `/nl/teams`, `/tr/teams`, `/en/teams`
- Kök adres (`/`) tarayıcı diline göre yönlendirilir (`src/middleware.ts`)
- Çeviriler: `src/i18n/dictionaries/{nl,tr,en}.ts`

`nl.ts` referans sözlüktür — `Dictionary` tipi buradan türetilir, dolayısıyla
TR veya EN'de bir anahtar unutulursa **TypeScript hata verir**.

Admin panelindeki haber editöründe her haber üç dilde ayrı ayrı yazılır;
sekmelerdeki yeşil nokta o dilin doldurulduğunu gösterir.

---

## Klasör yapısı

```
src/
  app/[locale]/
    (site)/          → halka açık sayfalar
    admin/           → yönetim paneli
  components/
    layout/          → Navbar, Footer, dil seçici
    site/            → maç kartı, haber kartı, kadro, puan tablosu…
    ui/              → Reveal, Counter, PhotoSlot, Section
  data/              → TÜM İÇERİK BURADA (tipli, tek kaynak)
  i18n/              → diller
  admin/             → panel altyapısı (store, kabuk, giriş ekranı)
```

**`src/data/` klasörü kasıtlı olarak veritabanı şemasının aynısı gibi kurgulandı.**
Supabase'e geçtiğimizde sadece bu dosyaların yerine sorgular gelecek; arayüzde
hiçbir şey değişmeyecek.

---

## Test sitesindeki düzeltilen hatalar

Referans aldığımız `fc-turkserangers-test.netlify.app` sitesinde tespit edilen ve
burada giderilen sorunlar:

1. **Sayaçlar `0` gösteriyordu.** "Rakamlarla kulüp" bölümü HTML'de `0, 0, 0+, 0`
   olarak render ediliyordu; doğru değerler yalnızca JavaScript çalışınca beliriyordu.
   Artık ilk render'da gerçek değerler var, animasyon sadece üzerine biniyor.
2. **JavaScript olmadan sayfanın yarısı görünmezdi.** Tüm bölümler HTML'de
   `opacity: 0` ile geliyordu. Artık gizleme kuralı yalnızca `<html class="js">`
   altında geçerli; bu sınıfı da inline script ekliyor. JS çalışmazsa içerik
   olduğu gibi görünür.
3. **Ölü sosyal medya linkleri.** `href="#"` olan Facebook/YouTube linkleri
   kaldırıldı — adres girilene kadar hiç gösterilmiyor (`src/data/club.ts`).
4. **Instagram tutarsızlığı.** Link ve etiket artık aynı hesabı gösteriyor.
5. **Bayat içerik.** Fikstür, sezon ve puan durumu güncel tarihe göre yeniden düzenlendi.
6. **Eksik sayfalar** eklendi: Altyapı, Kulüp Tüzüğü, Gizlilik, Çerez politikası.

---

## GDPR / reşit olmayan oyuncular

Kulüpte U6–U19 takımları var, yani **çocukların isim ve fotoğrafları** söz konusu.
Belçika AB üyesi olduğu için bu ciddi bir konu.

Sitede her oyuncunun `publishConsent` alanı var (`src/data/players.ts`):

- **Açık** → isim ve fotoğraf gösterilir
- **Kapalı** → sadece forma numarası ve pozisyon; isim "Speler #7" olur

Bu ayar admin panelinden **Oyuncular** sayfasından tek tıkla değiştirilebilir.
Demoda U10 takımının tamamı ve U17'den iki oyuncu bilerek "izin yok" olarak
işaretlendi ki davranış görülebilsin.

**Kulübün yapması gereken:** her altyapı oyuncusu için veliden yazılı görüntü
izni toplamak. İzin olmadan `publishConsent` açılmamalı.

---

## Yayına almadan önce yapılacaklar

- [ ] **Logo** — `src/components/layout/Navbar.tsx` ve `Footer.tsx` içindeki
      kalkan ikonu yerine gerçek logo
- [ ] **Fotoğraflar** — hero, takım fotoğrafları, oyuncu portreleri, tesis, galeri.
      Şu an hepsi `PhotoSlot` çerçevesi gösteriyor; `src` verilince otomatik dolar
- [ ] **Oyuncu isimleri ve kadrolar** (`src/data/players.ts`) — hepsi uydurma
- [ ] **Yönetim kurulu ve teknik ekip** (`src/data/club.ts`) — hepsi "Demo …"
- [ ] **Fikstür ve puan durumu** (`src/data/matches.ts`)
- [ ] **Sponsor logoları** (`src/data/sponsors.ts`)
- [ ] **Saha adı teyidi** — şu an "Anfield — Hoevenzavel"
- [ ] **Facebook / YouTube adresleri** (`src/data/club.ts`)
- [ ] **Gizlilik ve çerez metinleri** (`src/data/legal.ts`) — taslak, hukuki kontrol şart
- [ ] **Kulüp tüzüğü** (`src/data/legal.ts`) — kulübün gerçek metniyle değiştirilmeli

---

## Sonraki adım: gerçek altyapı

Demo onaylanırsa sıradaki iş:

1. **Supabase projesi** — Postgres veritabanı + Auth + Storage
2. `src/data/*` dosyalarındaki tipler birebir tablo şemasına dönüşür
3. **Gerçek giriş sistemi** — Supabase Auth, hash'lenmiş şifreler, 2FA opsiyonu.
   Demodaki düz metin şifreler tamamen kalkar
4. **Fotoğraf yükleme** Supabase Storage'a gider (şimdi tarayıcıda tutuluyor)
5. **İletişim formu** gerçekten e-posta gönderir
6. **Row Level Security** — takım sorumlusu veritabanı seviyesinde de sadece
   kendi takımına erişebilir, sadece arayüzde değil
7. Yayın: Vercel (veya Netlify)

Fikstür/puan durumunun Voetbal Vlaanderen'den otomatik çekilmesi ayrıca
araştırılmalı; şimdilik elle giriliyor.
