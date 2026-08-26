<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="200" alt="Laravel Logo">
  &nbsp;&nbsp;+&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="70" alt="React Logo">
</p>

<h1 align="center">Website Portfolio</h1>

<p align="center">
  Personal portfolio website of <b>Aditya Putra Sholahuddin</b>, built with <b>Laravel</b> as the backend/API and <b>React</b> as the frontend, showcasing profile, projects, skills, and experience as a <b>Full Stack Developer</b> in an interactive and modern way.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/aditya-putra-sholahuddin-717a8921a/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://instagram.com/xxaditptr_" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"></a>
  <a href="https://kreess.my.id" target="_blank"><img src="https://img.shields.io/badge/Website-kreess.my.id-000000?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website"></a>
  <a href="https://github.com/KREESS" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
</p>

---

## 👤 About Me

| | |
|---|---|
| **Name** | Aditya Putra Sholahuddin |
| **Role** | Full Stack Developer |
| **GitHub** | [github.com/KREESS](https://github.com/KREESS) |
| **Repository** | [github.com/KREESS/Website-Portfolio](https://github.com/KREESS/Website-Portfolio) |
| **Website** | [kreess.my.id](https://kreess.my.id) |
| **LinkedIn** | [Aditya Putra Sholahuddin](https://www.linkedin.com/in/aditya-putra-sholahuddin-717a8921a/) |
| **Instagram** | [@xxaditptr_](https://instagram.com/xxaditptr_) |
| **Email** | adityasholahuddin@gmail.com |

---

## 📖 About the Project

This project is a **portfolio website** built to showcase personal information such as biodata, skills, experience, and a list of completed projects. It uses **Laravel (Backend/API)** to serve data through a REST API, and **React (Frontend)** as a Single Page Application (SPA) to deliver a fast, responsive, and interactive user interface.

## 📸 Website Preview

<p align="center">
    <img width="100%" alt="Portfolio Website Screenshot" src="https://github.com/user-attachments/assets/c76085de-4b74-45d3-96b4-302408a2aaa2" />
</p>

## ✨ Features

- 🏠 **Landing Page** — A modern self-introduction section
- 👤 **About Me** — Biodata and personal description
- 💼 **Portfolio / Projects** — A list of completed projects with details and demo links
- 🛠️ **Skills** — Displays technologies and tools mastered
- 📩 **Contact** — A form for reaching out via email/message
- 📱 **Responsive Design** — Optimized display on desktop, tablet, and mobile
- ⚡ **API Driven** — Data is managed via the Laravel API and consumed by React

## 🧰 Tech Stack

**Backend**
- [Laravel](https://laravel.com) — PHP framework for the REST API
- MySQL / PostgreSQL — Database
- Laravel Sanctum *(optional)* — API authentication

**Frontend**
- [React.js](https://react.dev) — Component-based UI library
- [TypeScript](https://www.typescriptlang.org) — Typed superset of JavaScript for safer, more maintainable code
- [Axios](https://axios-http.com) — HTTP client for consuming the API
- [Tailwind CSS](https://tailwindcss.com) / CSS — UI styling
- [React Router](https://reactrouter.com) — SPA page routing

## 📊 Language Breakdown

| Language | Percentage |
|---|---|
| TypeScript | 67.2% |
| PHP | 29.2% |
| CSS | 2.9% |
| Other | 0.7% |

## 📁 Project Structure

```
website-portfolio/
├── backend/                 # Laravel project (API)
│   ├── app/
│   ├── database/
│   ├── routes/
│   │   └── api.php
│   └── ...
│
└── frontend/                # React + TypeScript project
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.tsx
    └── ...
```

## ⚙️ Installation & Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/KREESS/Website-Portfolio.git
cd Website-Portfolio
```

### 2. Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure the database settings in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=
```

Run the database migrations:

```bash
php artisan migrate --seed
```

Start the Laravel server:

```bash
php artisan serve
```

The backend will run at `http://127.0.0.1:8000`

### 3. Frontend Setup (React + TypeScript)

Open a new terminal:

```bash
cd frontend
npm install
```

Configure the API base URL in the frontend's `.env` file:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

Start React:

```bash
npm start
```

The frontend will run at `http://localhost:3000`

## 🔗 API Consumption

Example API endpoints provided by Laravel and consumed by React:

| Method | Endpoint          | Description                     |
|--------|-------------------|----------------------------------|
| GET    | `/api/projects`   | Retrieve the list of projects    |
| GET    | `/api/projects/{id}` | Retrieve project details      |
| GET    | `/api/skills`     | Retrieve the list of skills      |
| POST   | `/api/contact`    | Send a message from the contact form |

## 🚀 Deployment

- **Backend (Laravel)** can be deployed to services such as a VPS, Laravel Forge, or PHP-compatible shared hosting.
- **Frontend (React + TypeScript)** can be built using `npm run build` and deployed to Netlify, Vercel, or served directly through Laravel.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork this repository
2. Create a new branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Open a Pull Request

## 📄 License

This project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT).

## 📬 Contact

If you have any questions, collaboration ideas, or feedback, feel free to reach out:

- 👤 **Name:** Aditya Putra Sholahuddin
- 📧 **Email:** adityasholahuddin@gmail.com
- 💼 **LinkedIn:** [Aditya Putra Sholahuddin](https://www.linkedin.com/in/aditya-putra-sholahuddin-717a8921a/)
- 📸 **Instagram:** [@xxaditptr_](https://instagram.com/xxaditptr_)
- 🌐 **Website:** [kreess.my.id](https://kreess.my.id)
- 🐙 **GitHub:** [github.com/KREESS](https://github.com/KREESS)

---

<p align="center">Made with ❤️ by <b>Aditya Putra Sholahuddin</b> using Laravel & React</p>
