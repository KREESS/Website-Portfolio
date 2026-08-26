# Product Requirements Document (PRD)
## Portfolio Website — Aditya Putra Sholahuddin (Kreess)

| | |
|---|---|
| **Dokumen** | PRD Website Portfolio Pribadi |
| **Pemilik Produk** | Aditya Putra Sholahuddin (Kreess) |
| **Versi** | 1.0 |
| **Tanggal** | 21 Agustus 2026 |
| **Status** | Draft — Ready for Development |
| **Referensi Desain/Interaksi** | [moncy.dev](https://www.moncy.dev/) & repo [MoncyDev/Portfolio-Website](https://github.com/MoncyDev/Portfolio-Website) |

---

## 1. Latar Belakang & Tujuan

### 1.1 Latar Belakang
Aditya Putra Sholahuddin ("Kreess") adalah Software Engineering dengan pengalaman di web dan mobile development (Laravel, Node.js, Flutter/Dart, dan Python untuk AI). Saat ini belum memiliki portfolio pribadi yang representatif untuk menampilkan profil, skill, proyek, dan sebagai media personal branding sekaligus kanal interaksi dengan pengunjung (recruiter, klien, sesama developer).

# ## 1.2 Tujuan Produk
1. Membangun website portfolio pribadi yang modern, interaktif, dan mencerminkan identitas sebagai Full-Stack Developer.
2. Menampilkan informasi diri, tech stack, proyek, dan kontak secara profesional — dengan gaya interaksi/visual terinspirasi dari **moncy.dev** (smooth animation, transisi modern, 3D/GSAP feel).
3. Menyediakan fitur **komentar anonim** sebagai wall of feedback/guestbook dari pengunjung, tanpa proses approval (komentar langsung tayang), namun tetap dapat dimoderasi (dihapus) oleh admin.
4. Membangun dengan stack **Laravel 12 + Inertia.js + TypeScript (React)** agar development cepat, type-safe, dan tetap SPA-like experience.

### 1.3 Target Pengguna
| Persona | Deskripsi | Kebutuhan |
|---|---|---|
| Recruiter / HR | Mencari kandidat developer | Info skill, proyek, CV, kontak cepat |
| Klien Freelance | Mencari jasa pengembangan web/mobile/AI | Portfolio proyek, cara kontak |
| Sesama Developer | Networking, kolaborasi open source | Link GitHub, tech stack, proyek open source |
| Pengunjung Umum | Melihat profil, meninggalkan pesan | Fitur comment/guestbook anonim |
| Admin (Aditya sendiri) | Mengelola konten & moderasi komentar | Dashboard admin sederhana |

---

## 2. Referensi & Gaya Desain

### 2.1 Referensi Struktur & Interaksi
Menggunakan [MoncyDev/Portfolio-Website](https://github.com/MoncyDev/Portfolio-Website) dan live demo [moncy.dev](https://www.moncy.dev/) sebagai acuan gaya:
- Landing page dengan **hero section 3D/animasi** yang menarik perhatian di awal (bisa disederhanakan pakai CSS/GSAP animation, tanpa harus full Three.js jika kompleksitas backend Laravel jadi prioritas).
- **Smooth scroll & scroll-triggered animation** (GSAP / Framer Motion) antar section.
- **Custom cursor**, micro-interaction saat hover di card/button.
- **Dark theme** dengan aksen warna signature (bisa disesuaikan dengan preferensi Aditya — misal accent warna cyan/violet gradient).
- Navigasi minimalis (sticky navbar / floating dock), transisi antar halaman terasa mulus (didukung Inertia.js sehingga transisi antar page tanpa reload penuh).
- Struktur section: Hero → About → Skills/Tech Stack → Projects → Experience (opsional) → Comments/Guestbook → Contact → Footer.

### 2.2 Catatan
Karena repo asli MoncyDev berbasis React + Vite + Three.js murni (client-side only, tanpa backend), pada proyek ini struktur di-*porting* konsepnya ke **Laravel 12 (backend + API) + Inertia.js + React/TypeScript (frontend)**, sehingga tetap SPA experience namun punya backend penuh untuk fitur komentar, admin, dan database.

---

## 3. Ruang Lingkup (Scope)

### 3.1 In-Scope
- Landing page single-page portfolio (multi-section, bisa dengan sedikit multi-halaman: Home, Projects Detail, Admin).
- Konten statis diri (bio, skill, proyek, kontak) — dikelola lewat seed data / admin panel sederhana.
- Fitur **Comment Anonim (Guestbook)**:
  - Semua pengunjung (tanpa login/register) bisa mengirim komentar.
  - Komentar langsung tayang (no approval / no moderation queue).
  - Admin bisa login dan menghapus komentar yang tidak pantas.
- Admin panel sederhana (protected route) untuk:
  - Login admin.
  - Melihat & menghapus komentar.
  - (Opsional) CRUD data proyek.
- Responsive design (mobile-first, tablet, desktop).
- SEO dasar (meta tag, OG image, sitemap).

### 3.2 Out-of-Scope (v1)
- Multi-user authentication untuk pengunjung (register/login publik).
- Reply/threaded comment, like/upvote komentar.
- Blog/CMS artikel penuh (bisa jadi fase berikutnya).
- Multi-bahasa (i18n) — v1 hanya Bahasa Indonesia atau Inggris (pilih salah satu, default Inggris agar internasional).
- Real-time chat/notifikasi push.

---

## 4. Tech Stack

| Layer | Teknologi |
|---|---|
| Backend Framework | **Laravel 12** |
| Frontend Bridge | **Inertia.js** (server-driven SPA, tanpa REST API terpisah untuk halaman utama) |
| Frontend Language | **TypeScript** |
| Frontend UI Library | **React 18/19** (via Inertia adapter) |
| Styling | **Tailwind CSS** (utility-first, konsisten dengan gaya moncy.dev) |
| Animasi | **GSAP** dan/atau **Framer Motion** untuk scroll animation, transisi, micro-interaction |
| 3D (opsional, jika ingin full mirip referensi) | **Three.js** / **React Three Fiber** untuk hero section 3D |
| Database | **MySQL** atau **PostgreSQL** |
| Auth Admin | **Laravel Breeze/Fortify** (Inertia + React starter kit) khusus untuk 1 akun admin |
| Rate Limiting / Anti-Spam | Laravel built-in `throttle` middleware + honeypot field + (opsional) Google reCAPTCHA v3 / Cloudflare Turnstile |
| Build Tool | **Vite** |
| Hosting/Deployment | VPS (Nginx + PHP-FPM) atau platform seperti Laravel Forge/Vercel (frontend statis)+ backend terpisah; disarankan **single deployment** VPS karena full-stack Laravel |
| Storage untuk aset (gambar proyek, avatar) | Laravel Storage (local/public disk), opsional S3-compatible (Cloudflare R2) |

---

## 5. Struktur Halaman & Konten

### 5.1 Peta Situs (Sitemap)
```
/                → Home (single page: Hero, About, Skills, Projects, Comments, Contact)
/projects/{slug} → (Opsional) Detail proyek jika ingin halaman terpisah
/admin/login      → Login admin
/admin/dashboard  → Dashboard admin (kelola komentar & proyek)
```

### 5.2 Detail Konten per Section (berdasarkan profil GitHub Aditya)

#### A. Hero Section
- Nama: **Aditya Putra Sholahuddin** (a.k.a. **Kreess**)
- Tagline: *"Full-Stack Developer | Tech Enthusiast | Lifelong Learner"*
- CTA button: "View Projects" & "Contact Me"
- Animasi hero (3D object / particle / GSAP text reveal) — gaya moncy.dev.

#### B. About Section
- Deskripsi singkat: *Software Engineering student, berpengalaman di web & mobile development menggunakan Laravel, Node.js, Flutter (Dart), dan Python untuk AI.*
- Lokasi: Tambun Selatan, Bekasi, Jawa Barat, Indonesia.
- Fun fact: suka coding sambil dengar lo-fi music, tertarik pada AI, Web 3.0, dan Blockchain.
- Foto profil (avatar GitHub atau foto pribadi).

#### C. Skills / Tech Stack Section
Ditampilkan dalam bentuk grid icon/badge, dikelompokkan:
- **Bahasa Pemrograman:** HTML, CSS, JavaScript, TypeScript, PHP, Python, C, C++, Java, Go, Ruby, Dart, Solidity
- **Framework & Tools:** Laravel, Node.js, Express.js, React, Next.js, Vue.js, Tailwind CSS, Bootstrap, Flutter
- **Database:** MySQL, PostgreSQL, MongoDB, SQLite
- **DevOps & Tools:** Git, GitHub, Docker, Vite, VS Code, Android Studio

#### D. Projects Section
Diambil dari repository pinned/utama GitHub Aditya, contoh:
| Proyek | Deskripsi | Tech |
|---|---|---|
| **SmartSkin (detection_of_facial_acne)** | Aplikasi Flutter yang menggunakan CNN-based AI API untuk mendeteksi masalah kulit wajah (jerawat, kemerahan) dari foto | Dart, AI/CNN |
| **AI Face Acne Detector** | Deteksi otomatis tingkat keparahan jerawat dari citra wajah menggunakan CNN deep learning | Python |
| **Restaurant Ordering & Queue System** | Sistem pemesanan makanan & antrian berbasis web (PHP & JS murni), pemesanan on-site dengan nomor antrian | PHP, CSS, JS |
| **Web-Based UTBK Tryout System** | Sistem try-out UTBK berbasis web | Laravel (Blade) |
| **SIOBE — Sistem Monitoring PL/CPL/CPMK/Sub-CPMK** | Sistem monitoring capaian pembelajaran akademik | PHP |
| **Insulmart** | Proyek berbasis Laravel (Blade) | Laravel |

Setiap card proyek menampilkan: judul, deskripsi singkat, badge tech stack, link ke GitHub repo, dan link live demo (jika ada).

#### E. Comments / Guestbook Section — **Fitur Utama**
Lihat detail lengkap di **Section 6**.

#### F. Contact Section
- Email: adityasholahuddin@gmail.com
- LinkedIn: [aditya-putra-sholahuddin](https://www.linkedin.com/in/aditya-putra-sholahuddin-717a8921a/)
- Instagram: [@xxaditptr_](https://www.instagram.com/xxaditptr_/)
- X (Twitter): [@xxkreess](https://x.com/xxkreess)
- GitHub: [KREESS](https://github.com/KREESS)
- WhatsApp: link `wa.me`
- Website: kreess.my.id
- (Opsional) Contact form yang mengirim email via Laravel Mail.

#### G. Footer
- Copyright, social links ulang, back-to-top button.

---

## 6. Fitur Utama: Anonymous Comment / Guestbook

### 6.1 Deskripsi Fitur
Fitur komentar publik yang memungkinkan **siapa saja** meninggalkan pesan di portfolio **tanpa perlu login/register dan tanpa menampilkan identitas asli** (anonymous). Komentar **langsung tampil real-time di halaman** setelah dikirim (**tanpa proses approval/moderasi terlebih dahulu**). Admin (Aditya) memiliki akses khusus untuk **menghapus** komentar yang tidak pantas kapan saja, tetapi tidak perlu menyetujui komentar sebelum tayang.

### 6.2 User Story
| ID | Sebagai | Saya ingin | Agar |
|---|---|---|---|
| US-01 | Pengunjung | Menulis komentar tanpa perlu daftar/login | Bisa cepat meninggalkan kesan/pesan |
| US-02 | Pengunjung | Memberi nama panggilan/nickname (opsional) saat komentar | Komentar tetap terasa personal walau anonim |
| US-03 | Pengunjung | Melihat komentar saya langsung muncul setelah submit | Mendapat kepuasan instan (tanpa menunggu approval) |
| US-04 | Pengunjung | Melihat komentar dari pengunjung lain | Tahu portfolio ini pernah dilihat & mendapat respon orang lain |
| US-05 | Admin | Login ke dashboard admin | Mengelola komentar yang masuk |
| US-06 | Admin | Menghapus komentar tertentu | Menjaga portfolio tetap profesional dari spam/kata kasar |
| US-07 | Admin | Melihat daftar semua komentar (termasuk metadata seperti IP/timestamp) | Analisis & moderasi lebih mudah |
| US-08 | Sistem | Mencegah spam/bot mengirim komentar bertubi-tubi | Kualitas & keamanan platform terjaga |

### 6.3 Alur Pengguna (Flow)

**Flow Pengunjung Kirim Komentar:**
```
1. Pengunjung scroll ke section "Comments"
2. Mengisi form: [Nama/Nickname (opsional, default "Anonymous")] + [Pesan Komentar]
3. Klik "Post Comment"
4. Sistem validasi (client-side + server-side): panjang teks, honeypot, rate-limit
5. Jika valid → komentar tersimpan ke DB → langsung tampil di list (via Inertia partial reload / optimistic UI)
6. Jika gagal validasi/rate-limit → tampilkan pesan error, komentar TIDAK tersimpan
```

**Flow Admin Hapus Komentar:**
```
1. Admin login di /admin/login
2. Masuk ke /admin/dashboard → tab "Comments"
3. Melihat list seluruh komentar (terbaru di atas), lengkap dengan waktu & (opsional) IP address
4. Klik tombol "Delete" pada komentar yang ingin dihapus
5. Muncul konfirmasi (modal "Are you sure?")
6. Setelah konfirmasi → komentar dihapus permanen dari DB → hilang juga dari halaman publik
```

### 6.4 Functional Requirements

| No | Requirement | Prioritas |
|---|---|---|
| FR-1 | Form komentar terdiri dari field: `nickname` (opsional, max 50 char, default "Anonymous" jika kosong) dan `message` (wajib, min 1 – max 500 karakter) | Must Have |
| FR-2 | Komentar disimpan tanpa memerlukan akun/login pengunjung | Must Have |
| FR-3 | Komentar yang berhasil disubmit **langsung muncul** di halaman publik tanpa status "pending"/"waiting approval" | Must Have |
| FR-4 | Sistem menyimpan `created_at` untuk setiap komentar dan menampilkannya (format relatif: "2 menit lalu") | Must Have |
| FR-5 | List komentar ditampilkan urut dari terbaru ke terlama (descending), dengan pagination atau infinite scroll (misal 10 komentar per load) | Should Have |
| FR-6 | Admin memiliki halaman login terpisah, terproteksi (tidak ada link publik yang mencolok ke halaman ini) | Must Have |
| FR-7 | Admin dapat melihat seluruh komentar dalam bentuk tabel/list di dashboard, termasuk yang sudah lama | Must Have |
| FR-8 | Admin dapat menghapus 1 komentar (soft delete atau hard delete — direkomendasikan **soft delete** agar bisa di-recover jika salah hapus) | Must Have |
| FR-9 | Setelah dihapus admin, komentar langsung tidak tampil lagi di halaman publik (tanpa perlu refresh manual — bisa pakai Inertia reload atau polling ringan) | Must Have |
| FR-10 | Sistem mencatat IP address & user-agent pengirim komentar (disimpan di DB, **tidak ditampilkan ke publik**, hanya untuk keperluan admin/anti-abuse) | Should Have |
| FR-11 | Validasi server-side untuk mencegah XSS (sanitize input, escape HTML saat render) | Must Have |
| FR-12 | Rate limiting: 1 komentar per IP setiap X detik (misal 30–60 detik) untuk mencegah spam beruntun | Must Have |
| FR-13 | Honeypot field tersembunyi untuk mendeteksi bot sederhana | Should Have |
| FR-14 | (Opsional) Filter kata kasar dasar (basic profanity filter) sebelum tampil, sebagai lapisan tambahan selain hapus manual admin | Could Have |
| FR-15 | (Opsional) reCAPTCHA v3 / Cloudflare Turnstile untuk proteksi bot lanjutan | Could Have |

### 6.5 Non-Functional Requirements Fitur Comment
- **Performa:** Submit komentar harus selesai < 1 detik (feedback instan ke user).
- **Keamanan:**
  - Semua input di-sanitize (Laravel `strip_tags`/`e()` di Blade, atau React auto-escape).
  - CSRF protection aktif (default Laravel + Inertia).
  - Admin route dilindungi middleware `auth` khusus role admin.
  - Tidak menyimpan/menampilkan data pribadi pengunjung selain nickname yang mereka isi sendiri.
- **Privasi:** Karena sifatnya anonim, sistem **tidak boleh menampilkan IP/user-agent di UI publik** — hanya untuk log internal admin.
- **Reliabilitas:** Jika terjadi error saat submit, tidak boleh membuat komentar duplikat/ganda.

### 6.6 Data Model — Tabel `comments`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint, PK | Auto increment |
| `nickname` | varchar(50), nullable | Default "Anonymous" jika kosong |
| `message` | text | Isi komentar, max 500 char (divalidasi di aplikasi) |
| `ip_address` | varchar(45), nullable | Untuk rate limiting & anti-abuse (tidak publik) |
| `user_agent` | varchar(255), nullable | Untuk anti-abuse |
| `is_deleted` | boolean, default false | Soft delete flag (atau gunakan `deleted_at` Laravel SoftDeletes) |
| `created_at` | timestamp | Waktu komentar dibuat |
| `updated_at` | timestamp | Waktu update terakhir |

Tabel `admins` (atau reuse tabel `users` bawaan Laravel Breeze dengan role tunggal admin):

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint, PK | |
| `name` | varchar | Nama admin |
| `email` | varchar, unique | Login admin |
| `password` | varchar, hashed | |
| `created_at`/`updated_at` | timestamp | |

### 6.7 API / Route Design (Inertia + Controller)

| Method | Route | Deskripsi | Akses |
|---|---|---|---|
| GET | `/` | Halaman utama (termasuk data comments awal via props Inertia) | Publik |
| POST | `/comments` | Submit komentar baru | Publik (dengan rate limit) |
| GET | `/comments?page=` | Load komentar tambahan (pagination) | Publik |
| GET | `/admin/login` | Halaman login admin | Publik (form saja) |
| POST | `/admin/login` | Proses login | Publik |
| POST | `/admin/logout` | Logout admin | Admin |
| GET | `/admin/dashboard` | Dashboard admin (list komentar) | Admin only |
| DELETE | `/admin/comments/{id}` | Hapus komentar tertentu | Admin only |

---

## 7. Requirement Non-Fungsional (Umum)

| Kategori | Requirement |
|---|---|
| **Responsiveness** | Full responsive: mobile (≥360px), tablet, desktop; breakpoint mengikuti Tailwind default |
| **Performance** | Lighthouse score target ≥ 90 (Performance, Accessibility, Best Practices, SEO); lazy load gambar/asset 3D |
| **SEO** | Meta title/description dinamis, Open Graph tags, sitemap.xml, robots.txt |
| **Accessibility** | Kontras warna sesuai WCAG AA, alt text pada gambar, keyboard navigable |
| **Browser Support** | Chrome, Firefox, Edge, Safari (2 versi terakhir) |
| **Security** | HTTPS wajib, CSRF protection, rate limiting, input sanitization, dependency terbaru (Laravel 12) |
| **Maintainability** | Kode terstruktur (Controller-Service pattern), TypeScript strict mode, komponen React reusable |
| **Deployment** | CI/CD sederhana (GitHub Actions) untuk build & deploy otomatis ke server |

---

## 8. Wireframe Konsep (Deskripsi Tekstual)

```
┌─────────────────────────────────────────────┐
│  [Navbar: Logo/Kreess | About | Projects |   │
│   Comments | Contact]           (sticky)     │
├─────────────────────────────────────────────┤
│                                               │
│        HERO: Nama besar + Tagline            │
│        + animasi 3D/GSAP + CTA buttons       │
│                                               │
├─────────────────────────────────────────────┤
│  ABOUT: Foto + deskripsi diri + lokasi       │
├─────────────────────────────────────────────┤
│  SKILLS: Grid badge tech stack               │
├─────────────────────────────────────────────┤
│  PROJECTS: Card grid (image, judul, tech,    │
│  link GitHub/live demo)                      │
├─────────────────────────────────────────────┤
│  COMMENTS / GUESTBOOK:                       │
│   [Form: Nickname (opsional) + Message]      │
│   [Post Comment button]                      │
│   ────────────────────────────               │
│   💬 Anonymous — 2 menit lalu                │
│      "Keren banget portfolionya!"            │
│   💬 Budi — 1 jam lalu                       │
│      "Semangat terus kak Aditya!"            │
│   [Load more comments]                       │
├─────────────────────────────────────────────┤
│  CONTACT: Email, Sosmed, WA, Contact form    │
├─────────────────────────────────────────────┤
│  FOOTER: © 2026 Kreess | social icons        │
└─────────────────────────────────────────────┘
```

---

## 9. Metrik Keberhasilan (Success Metrics)

| Metrik | Target |
|---|---|
| Page Load Time (LCP) | < 2.5 detik |
| Jumlah komentar masuk per bulan (setelah launch) | Baseline awal, dipantau growth |
| Bounce rate | < 50% |
| Uptime | ≥ 99.5% |
| Jumlah spam/komentar dihapus admin per bulan | Dipantau, target rate spam < 10% dari total komentar |
| Konversi ke kontak (klik email/WA/LinkedIn) | Dipantau via analytics |

---

## 10. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Komentar anonim disalahgunakan untuk spam/kata kasar (karena tidak ada approval dulu) | Reputasi portfolio menurun | Rate limiting per IP, honeypot, admin bisa hapus cepat, opsional profanity filter otomatis |
| Bot mengirim komentar massal | Database penuh sampah, performa turun | reCAPTCHA/Turnstile, rate limit ketat, throttle middleware Laravel |
| Kompleksitas 3D/animasi terlalu berat untuk load awal | Performance turun, SEO buruk | Gunakan animasi ringan (CSS/GSAP) dulu, 3D Three.js opsional & lazy-loaded |
| Admin lupa password / akun admin dibobol | Komentar tidak termoderasi, potensi defacement | Password kuat, 2FA (opsional), backup DB berkala |
| Data komentar hilang saat dihapus permanen tanpa sengaja | Kehilangan histori | Gunakan **soft delete**, bukan hard delete langsung |

---

## 11. Roadmap / Fase Pengembangan

| Fase | Deliverable | Estimasi |
|---|---|---|
| **Fase 1 — Setup & Struktur** | Setup Laravel 12 + Inertia + React + TypeScript + Tailwind, struktur folder, auth admin (Breeze) | 3–5 hari |
| **Fase 2 — UI Statis** | Hero, About, Skills, Projects, Contact section (styling + animasi dasar) | 5–7 hari |
| **Fase 3 — Fitur Comment** | Model, migration, controller, form submit, list comment realtime, rate limit | 4–6 hari |
| **Fase 4 — Admin Dashboard** | Login admin, list & delete comment, (opsional) CRUD project | 3–4 hari |
| **Fase 5 — Polish & Animasi Lanjutan** | GSAP scroll animation, custom cursor, transisi ala moncy.dev, optimasi 3D (jika dipakai) | 4–6 hari |
| **Fase 6 — Testing & QA** | Cross-browser test, responsive test, security test (XSS, rate limit) | 2–3 hari |
| **Fase 7 — Deployment** | Setup server, domain (kreess.my.id), SSL, CI/CD, monitoring | 1–2 hari |

**Total estimasi: ± 22–33 hari kerja** (bisa lebih cepat jika 3D/animasi kompleks dikurangi).

---

## 12. Open Questions (Perlu Konfirmasi Aditya)

1. Apakah butuh halaman detail proyek terpisah (`/projects/{slug}`) atau cukup card + link keluar ke GitHub/live demo?
2. Bahasa utama konten: Bahasa Indonesia atau Inggris (atau toggle keduanya)?
3. Apakah hero section wajib pakai 3D (Three.js) seperti moncy.dev, atau cukup animasi 2D/GSAP agar development lebih cepat?
4. Apakah perlu fitur report komentar oleh pengunjung (selain admin manual delete)?
5. Domain final yang dipakai: `kreess.my.id` atau domain baru?
6. Apakah admin dashboard perlu statistik pengunjung (visitor analytics) juga?

---

*Dokumen ini adalah living document — dapat diperbarui seiring diskusi lebih lanjut dengan stakeholder (Aditya Putra Sholahuddin).*
