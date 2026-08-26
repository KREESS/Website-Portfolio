<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="200" alt="Laravel Logo">
  &nbsp;&nbsp;+&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="70" alt="React Logo">
</p>

<h1 align="center">Website Portfolio</h1>

<p align="center">
  Website portfolio pribadi yang dibangun menggunakan <b>Laravel</b> sebagai backend/API dan <b>React</b> sebagai frontend, untuk menampilkan profil, proyek, skill, dan pengalaman secara interaktif dan modern.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

---

## 📖 Tentang Project

Project ini merupakan website **portfolio** yang dikembangkan untuk menampilkan informasi pribadi seperti biodata, keahlian (skills), pengalaman, dan daftar proyek yang pernah dikerjakan. Website ini menggunakan arsitektur **Laravel (Backend/API)** yang menyediakan data melalui REST API, dan **React (Frontend)** yang berperan sebagai Single Page Application (SPA) untuk menampilkan antarmuka yang cepat, responsif, dan interaktif.

## 📸 Tampilan Website

<p align="center">
  <img width="100%" alt="Screenshot Website Portfolio" src="https://github.com/user-attachments/assets/67e0cfde-64b8-41e8-9f8a-a7d3a088a31e">
</p>

## ✨ Fitur

- 🏠 **Landing Page** — Menampilkan perkenalan diri dengan tampilan modern
- 👤 **Tentang Saya (About)** — Informasi biodata dan deskripsi diri
- 💼 **Portfolio / Proyek** — Daftar proyek yang pernah dikerjakan lengkap dengan detail dan link demo
- 🛠️ **Skill & Keahlian** — Menampilkan teknologi dan tools yang dikuasai
- 📩 **Kontak** — Form untuk menghubungi melalui email/pesan
- 📱 **Responsive Design** — Tampilan optimal di desktop, tablet, dan mobile
- ⚡ **API Driven** — Data dikelola melalui Laravel API dan dikonsumsi oleh React

## 🧰 Tech Stack

**Backend**
- [Laravel](https://laravel.com) — Framework PHP untuk REST API
- MySQL / PostgreSQL — Database
- Laravel Sanctum *(opsional)* — Autentikasi API

**Frontend**
- [React.js](https://react.dev) — Library UI berbasis komponen
- [Axios](https://axios-http.com) — HTTP client untuk konsumsi API
- [Tailwind CSS](https://tailwindcss.com) / CSS — Styling antarmuka
- [React Router](https://reactrouter.com) — Routing halaman SPA

## 📁 Struktur Project

```
website-portfolio/
├── backend/                 # Project Laravel (API)
│   ├── app/
│   ├── database/
│   ├── routes/
│   │   └── api.php
│   └── ...
│
└── frontend/                # Project React
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    └── ...
```

## ⚙️ Instalasi & Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/username/website-portfolio.git
cd website-portfolio
```

### 2. Setup Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Sesuaikan konfigurasi database pada file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migrasi database:

```bash
php artisan migrate --seed
```

Jalankan server Laravel:

```bash
php artisan serve
```

Backend akan berjalan di `http://127.0.0.1:8000`

### 3. Setup Frontend (React)

Buka terminal baru:

```bash
cd frontend
npm install
```

Sesuaikan base URL API pada file `.env` di folder frontend:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

Jalankan React:

```bash
npm start
```

Frontend akan berjalan di `http://localhost:3000`

## 🔗 Konsumsi API

Contoh endpoint API yang disediakan oleh Laravel dan dikonsumsi React:

| Method | Endpoint          | Deskripsi                     |
|--------|-------------------|--------------------------------|
| GET    | `/api/projects`   | Mengambil daftar proyek        |
| GET    | `/api/projects/{id}` | Mengambil detail proyek     |
| GET    | `/api/skills`     | Mengambil daftar skill         |
| POST   | `/api/contact`    | Mengirim pesan dari form kontak|

## 🚀 Deployment

- **Backend (Laravel)** dapat di-deploy ke layanan seperti VPS, Laravel Forge, atau shared hosting yang mendukung PHP.
- **Frontend (React)** dapat di-build menggunakan `npm run build` lalu di-deploy ke Netlify, Vercel, atau disajikan langsung melalui Laravel.

## 🤝 Kontribusi

Kontribusi sangat terbuka! Jika ingin berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📄 Lisensi

Project ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).

## 📬 Kontak

Jika ada pertanyaan atau masukan, silakan hubungi:

- **Email:** adityasholahuddin@gmail.com
- **LinkedIn:** [linkedin.com/in/username](https://linkedin.com)
- **GitHub:** [github.com/username](https://github.com)

---

<p align="center">Dibuat dengan ❤️ menggunakan Laravel & React</p>
