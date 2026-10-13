/* ==========================================================================
   TO'Y TAKLIFNOMASI — JAVASCRIPT SOZLAMALARI VA INTERAKTIV FUNKSIYALAR
   Ushbu CONFIG obyektidagi ma'lumotlarni o'zingizning to'y ma'lumotlaringizga
   moslab o'zgartirishingiz mumkin.
   ========================================================================== */

const CONFIG = {
  groom: "Ali",
  bride: "Lola",
  date: "2027-07-07T18:00:00+05:00",
  venueCity: "JIZZAX SHAHRI",
  venueHall: "Yakkasaroy to‘ylar maskani",
  mapUrl: "https://maps.google.com/?q=Jizzax+Yakkasaroy+to'ylar+maskani",
  cardNumber: "9860 0825 5624 1501",
  cardHolder: "Usmonov Umarbek",
  family: "Xamrayevlar oilasi",
  whatsappNumber: "998901234567", // RSVP uchun xalqaro formatda (+ siz)
  musicUrl: "music.mp3"
};

const $ = (id) => document.getElementById(id);
const eventDate = new Date(CONFIG.date);

const UZ_MONTHS = [
  "YANVAR", "FEVRAL", "MART", "APREL", "MAY", "IYUN",
  "IYUL", "AVGUST", "SENTABR", "OKTABR", "NOYABR", "DEKABR"
];

const UZ_WEEKDAYS = [
  "YAKSHANBA", "DUSHANBA", "SESHANBA", "CHORSHANBA", "PAYSHANBA", "JUMA", "SHANBA"
];

const pad = (n, len = 2) => String(n).padStart(len, "0");

/* ==========================================================================
   1. SAHIFA MA'LUMOTLARINI O'RNATISH (RENDER CONFIG)
   ========================================================================== */
function renderConfig() {
  // Ismlar va Monogram
  const groomInitial = CONFIG.groom.charAt(0).toUpperCase();
  const brideInitial = CONFIG.bride.charAt(0).toUpperCase();
  $("coverMonogram").textContent = `${groomInitial} & ${brideInitial}`;
  $("coverNames").textContent = `${CONFIG.groom.toUpperCase()} & ${CONFIG.bride.toUpperCase()}`;
  $("headerGroom").textContent = CONFIG.groom;
  $("headerBride").textContent = CONFIG.bride;

  // Sana bloklari
  const monthName = UZ_MONTHS[eventDate.getMonth()];
  const weekdayName = UZ_WEEKDAYS[eventDate.getDay()];
  const dayNum = pad(eventDate.getDate());
  const yearNum = eventDate.getFullYear();

  $("displayMonth").textContent = monthName;
  $("displayWeekday").textContent = weekdayName;
  $("displayDay").textContent = dayNum;
  $("displayYear").textContent = yearNum;
  $("calMonthYear").textContent = `${monthName} ${yearNum}`;

  // Manzil va Sovg'a ma'lumotlari
  $("venueTime").textContent = `${pad(eventDate.getHours())}:${pad(eventDate.getMinutes())}`;
  $("venueCity").textContent = CONFIG.venueCity;
  $("venueHall").textContent = CONFIG.venueHall;
  $("mapBtn").href = CONFIG.mapUrl;

  $("cardNumberDisplay").textContent = CONFIG.cardNumber;
  $("cardHolderDisplay").textContent = CONFIG.cardHolder;
  $("familyName").textContent = CONFIG.family;

  // Hujjat sarlavhasi
  document.title = `${CONFIG.groom} & ${CONFIG.bride} | To‘y taklifnomasi`;

  // Musiqa manbasi
  const audio = $("bgMusic");
  if (CONFIG.musicUrl) {
    audio.src = CONFIG.musicUrl;
  }
}

/* ==========================================================================
   2. DINAMIK KALENDAR YASASH
   ========================================================================== */
function renderCalendar() {
  const container = $("calendarDays");
  container.innerHTML = "";

  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();
  const weddingDay = eventDate.getDate();

  // Oyning 1-kuni haftaning qaysi kuniga to'g'ri kelishi (Dushanba = 0)
  const firstDay = new Date(year, month, 1).getDay();
  const startCol = (firstDay + 6) % 7; // Dushanba: 0, Yakshanba: 6

  // Ushbu oyda necha kun bor
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Bo'sh kataklar (oy boshlanishidan oldin)
  for (let i = 0; i < startCol; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "cal-day-cell empty";
    container.appendChild(emptyCell);
  }

  // Kunlar
  for (let d = 1; d <= totalDays; d++) {
    const dayCell = document.createElement("div");
    dayCell.className = "cal-day-cell";

    if (d === weddingDay) {
      dayCell.classList.add("wedding-day");
      dayCell.innerHTML = `
        <div class="wedding-heart-badge">
          <span class="heart-icon">❤️</span>
          <span class="day-number-text">${d}</span>
        </div>
      `;
    } else {
      dayCell.textContent = d;
    }

    container.appendChild(dayCell);
  }
}

/* ==========================================================================
   3. VAQT SANAGICHI (COUNTDOWN TIMER)
   ========================================================================== */
function updateCountdown() {
  const diff = eventDate.getTime() - Date.now();

  if (diff <= 0) {
    $("cdDays").textContent = "00";
    $("cdHours").textContent = "00";
    $("cdMinutes").textContent = "00";
    $("cdSeconds").textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  $("cdDays").textContent = days > 99 ? String(days) : pad(days);
  $("cdHours").textContent = pad(hours);
  $("cdMinutes").textContent = pad(minutes);
  $("cdSeconds").textContent = pad(seconds);
}

/* ==========================================================================
   4. AUDIO VA MUSIQA BOSHQARUVI
   ========================================================================== */
const audio = $("bgMusic");
const musicBar = $("musicBar");

function toggleMusic() {
  if (audio.paused) {
    audio.play().then(() => {
      musicBar.classList.add("playing");
    }).catch((err) => {
      console.warn("Audio play prevented:", err);
    });
  } else {
    audio.pause();
    musicBar.classList.remove("playing");
  }
}

musicBar.addEventListener("click", toggleMusic);

audio.addEventListener("play", () => {
  musicBar.classList.add("playing");
});

audio.addEventListener("pause", () => {
  musicBar.classList.remove("playing");
});

/* ==========================================================================
   5. TAKLIFNOMANI OCHISH (COVER SCREEN)
   ========================================================================== */
$("openInviteBtn").addEventListener("click", () => {
  const cover = $("coverScreen");
  cover.classList.add("opened");

  // Foydalanuvchi tugmani bosganda audio avtomatik ishga tushadi
  audio.play().then(() => {
    musicBar.classList.add("playing");
  }).catch((err) => {
    console.warn("Avtomatik musiqa ijrosi:", err);
  });
});

/* ==========================================================================
   6. KARTA RAQAMINI NUSXALASH (CLIPBOARD COPY)
   ========================================================================== */
function showToast(msg) {
  const toast = $("toastNotice");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

$("copyCardBtn").addEventListener("click", () => {
  const rawNum = CONFIG.cardNumber.replace(/\s+/g, "");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(rawNum).then(() => {
      showToast("Karta raqami nusxalandi! ✓");
    }).catch(() => {
      fallbackCopy(rawNum);
    });
  } else {
    fallbackCopy(rawNum);
  }
});

function fallbackCopy(text) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
    showToast("Karta raqami nusxalandi! ✓");
  } catch (e) {
    showToast("Karta raqami: " + text);
  }
  document.body.removeChild(input);
}

/* ==========================================================================
   7. RSVP (WHATSAPP ORQALI JAVOB BERISH)
   ========================================================================== */
const rsvpModal = $("rsvpModal");

$("rsvpOpenBtn").addEventListener("click", () => {
  rsvpModal.classList.remove("hidden");
});

$("rsvpCloseBtn").addEventListener("click", () => {
  rsvpModal.classList.add("hidden");
});

rsvpModal.addEventListener("click", (e) => {
  if (e.target === rsvpModal) {
    rsvpModal.classList.add("hidden");
  }
});

$("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("rsvpName").value.trim();
  const status = $("rsvpStatus").value;
  const count = $("rsvpCount").value;

  if (!name) return;

  const textMsg =
    `Assalomu alaykum!\n` +
    `To‘y taklifnomasi bo‘yicha javob:\n` +
    `Mehmon: ${name}\n` +
    `Holati: ${status}\n` +
    `Mehmonlar soni: ${count}\n\n` +
    `${CONFIG.groom} va ${CONFIG.bride} to‘yi`;

  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(textMsg)}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");
  rsvpModal.classList.add("hidden");
  showToast("WhatsApp orqali javob yuborildi! ✓");
});

/* ==========================================================================
   8. DESKTOP EKRANGA MOSLASHTIRISH TUGMASI
   ========================================================================== */
$("viewToggleBtn").addEventListener("click", () => {
  document.body.classList.toggle("fullscreen-mode");
  const isFull = document.body.classList.contains("fullscreen-mode");
  $("viewToggleBtn").textContent = isFull ? "iPhone rejimiga qaytish" : "Ekranga moslashtirish";
});

/* ==========================================================================
   9. ISHGA TUSHIRISH (INIT)
   ========================================================================== */
renderConfig();
renderCalendar();
updateCountdown();
setInterval(updateCountdown, 1000);
