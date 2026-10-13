# Zamonaviy Mobile To‘y Taklifnomasi (MP4 video dizayni asosida)

Ushbu taklifnoma to‘liq mobil qurilmalar uchun moslashtirilgan bo‘lib, video namunadagi estetika, ranglar va bo‘limlar asosida yaratilgan.

## Asosiy imkoniyatlar
- **Kirish ekrani (Cover):** "Taklifnomani ochish" tugmasi bosilganda sahifa ochiladi va musiqa avtomatik ijro etiladi.
- **Romantik musiqa:** Video fayldan olingan musiqiy trek (`music.mp3`) va ekranning pastki o‘ng burchagidagi animatsion ekvalayzerli boshqaruvchi.
- **Dinamik Kalendar:** Belgilangan to‘y sanasi oyining to‘liq kalendari avtomatik hisoblanadi va to‘y kuni urib turuvchi qizil yurak (`❤️`) bilan belgilanadi.
- **Vaqt sanagichi (Countdown):** To‘y kunigacha qolgan kun, soat, daqiqa va soniyalarni real vaqt rejimida ko‘rsatadi.
- **Kun tartibi (Dastur):** Markaziy chiziq bo‘ylab navbatma-navbat joylashgan vaqt va marosim bosqichlari.
- **Manzil va xarita:** Google Maps / xaritaga to‘g‘ridan-to‘g‘ri o‘tish tugmasi.
- **WhatsApp RSVP:** Mehmonlar o‘z ishtirokini WhatsApp orqali tasdiqlashlari mumkin.
- **Moslashuvchanlik (Responsive):** Telefonlarda to‘liq 100% ekran bo‘lib ochiladi; kompyuterda esa chiroyli iPhone ramkasida ko‘rsatiladi.

---

## O‘zingizga moslash
Barcha ma'lumotlarni o‘zgartirish uchun `script.js` faylini oching va yuqoridagi `CONFIG` obyektini tahrirlang:

```javascript
const CONFIG = {
  groom: "Abdusattor",                               // Kuyov ismi
  bride: "Mohinur",                                  // Kelin ismi
  date: "2026-11-04T17:00:00+05:00",                 // To'y sanasi va vaqti (4-noyabr, 2026)
  venueCity: "SAMARQAND CHARXIN",                    // Shahar / Hudud
  venueHall: "Ratana restarani",                     // To'yxona / Restoran
  mapUrl: "https://maps.google.com/?q=Samarqand+Charxin+Ratana+restorani", // Geolokatsiya havolasi
  family: "Ganievlar oilasi",                        // Oila nomi (Ehtirom ila)
  whatsappNumber: "998901234567",                    // RSVP javobi boradigan raqam
  musicUrl: "music.mp3"                              // Musiqa fayli
};
```

---

## Saytni ochish va sinash
Brauzerda to‘g‘ridan-to‘g‘ri `index.html` faylini oching yoki mahalliy serverdan (masalan, Live Server yoki `python3 -m http.server 8000`) foydalaning.

## GitHub Pages orqali bepul e'lon qilish
1. GitHub-da yangi ochiq (public) repozitoriy oching.
2. Papkadagi fayllarni (`index.html`, `style.css`, `script.js`, `music.mp3`, `assets/`) repozitoriyga yuklang.
3. Repozitoriy **Settings** -> **Pages** bo‘limiga o‘ting.
4. **Branch: main**, folder: `/ (root)` ni tanlab **Save** tugmasini bosing.
5. Bir necha daqiqada sizga tayyor internet havola beriladi.
