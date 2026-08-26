<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Aditya Putra Sholahuddin (Kreess) — Full-Stack Developer</title>

    <!-- Favicon: logo -->
    <link rel="icon" type="image/png" href="/img/logo-adit.png">
    <link rel="apple-touch-icon" href="/img/logo-adit.png">

    <!-- SEO & Metadata -->
    <meta name="description" content="Portfolio of Aditya Putra Sholahuddin (Kreess) - Full-Stack Developer experienced in Laravel, Node.js, Flutter, React, and Python AI." />
    <meta name="keywords" content="Aditya Putra Sholahuddin, Kreess, Full Stack Developer, Laravel, React, Flutter, AI, Portfolio" />
    <meta name="author" content="Aditya Putra Sholahuddin" />

    <!-- Open Graph -->
    <meta property="og:title" content="Aditya Putra Sholahuddin (Kreess) — Portfolio" />
    <meta property="og:description" content="Full-Stack Developer | Tech Enthusiast | Lifelong Learner" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ url()->current() }}" />

    <!-- Fonts: Syne (Ultra luxury editorial display) + Plus Jakarta Sans + Space Grotesk + JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

    <script>
        (function () {
            try {
                if (localStorage.getItem('theme') === 'light') {
                    document.documentElement.classList.add('light');
                }
            } catch (e) {}
        })();
    </script>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body class="font-sans antialiased overflow-x-hidden min-h-screen">
    @inertia
</body>
</html>
