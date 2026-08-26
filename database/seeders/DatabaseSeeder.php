<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create/Update Admin user
        User::updateOrCreate(
            ['email' => 'adityasholahuddin@gmail.com'],
            [
                'name' => 'Aditya Putra Sholahuddin',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Seed Projects from PRD
        $projects = [
            [
                'slug' => 'stock-recommendation-random-forest',
                'title' => 'Sistem Rekomendasi Saham Berbasis Web (Random Forest)',
                'category' => 'AI / ML',
                'description' => 'Skripsi — Web-based stock recommendation system using the Random Forest algorithm to classify stock signals (buy / hold / sell) and support smarter investment decisions.',
                'long_description' => 'Proyek skripsi yang membangun sistem rekomendasi saham berbasis web dengan algoritma Random Forest. Data historis harga saham diproses menjadi fitur teknikal (moving average, RSI, MACD, volatility), kemudian model Random Forest dilatih untuk mengklasifikasikan sinyal saham ke dalam kelas Buy, Hold, dan Sell. Evaluasi model menggunakan akurasi, precision, recall, dan confusion matrix. Hasil klasifikasi disajikan melalui dashboard web interaktif untuk membantu investor mengambil keputusan investasi yang lebih terukur dan berbasis data.',
                'tech_stack' => ['Laravel', 'Python', 'Scikit-Learn', 'Random Forest', 'Pandas', 'MySQL', 'Chart.js'],
                'github_url' => null,
                'live_url' => null,
                'icon_name' => 'Cpu',
                'gradient' => 'from-[#2563eb] to-[#0ea5e9]',
                'is_featured' => true,
                'sort_order' => 0,
            ],
            [
                'slug' => 'smartskin-facial-acne-ai',
                'title' => 'SmartSkin (Facial Acne AI)',
                'category' => 'Mobile',
                'description' => 'A cutting-edge Flutter mobile app powered by a CNN-based deep learning API to detect facial acne, redness, and provide skin health analysis in real time.',
                'long_description' => 'SmartSkin integrates mobile camera streaming with a Python TensorFlow/Keras backend to perform real-time facial acne detection. It categorizes severity into 4 distinct stages and offers personalized skincare suggestions.',
                'tech_stack' => ['Flutter', 'Dart', 'Python', 'CNN Deep Learning', 'FastAPI'],
                'github_url' => 'https://github.com/KREESS/detection_of_facial_acne',
                'live_url' => null,
                'icon_name' => 'Smartphone',
                'gradient' => 'from-[#ff6b6b] to-[#a855f7]',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'ai-face-acne-detector',
                'title' => 'AI Face Acne Detector (CNN Engine)',
                'category' => 'AI / ML',
                'description' => 'Automated severity classification of facial acne from camera images using custom convolutional neural networks and computer vision pipelines.',
                'long_description' => 'End-to-end Machine Learning pipeline utilizing OpenCV for face bounding box extraction, dataset augmentation, and a trained CNN classifier achieving 94%+ validation accuracy.',
                'tech_stack' => ['Python', 'TensorFlow', 'OpenCV', 'Scikit-Learn', 'NumPy'],
                'github_url' => 'https://github.com/KREESS/AI-Face-Acne-Detector',
                'live_url' => null,
                'icon_name' => 'Bot',
                'gradient' => 'from-[#a855f7] to-[#38bdf8]',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'restaurant-ordering-queue-system',
                'title' => 'Restaurant Ordering & Queue System',
                'category' => 'Web App',
                'description' => 'Web-based food ordering and smart queuing system with real-time on-site queue ticket generation and kitchen order management.',
                'long_description' => 'Built with pure native PHP and optimized JavaScript DOM for lightning-fast on-premise execution, featuring dynamic ticket printing and live kitchen status dashboard.',
                'tech_stack' => ['PHP Native', 'JavaScript', 'CSS3', 'MySQL', 'WebSockets'],
                'github_url' => 'https://github.com/KREESS/Restaurant-Ordering-Queue-System',
                'live_url' => null,
                'icon_name' => 'Utensils',
                'gradient' => 'from-[#38bdf8] to-[#10b981]',
                'is_featured' => false,
                'sort_order' => 3,
            ],
            [
                'slug' => 'web-based-utbk-tryout-system',
                'title' => 'Web-Based UTBK Tryout System',
                'category' => 'Web App',
                'description' => 'Comprehensive college entrance exam simulator (UTBK SNBT) with timed test modules, automated scoring algorithm, and in-depth student analytics.',
                'long_description' => 'Developed in Laravel featuring secure exam lockdown timers, question randomization, IRT (Item Response Theory) grading calculation, and performance graph breakdowns.',
                'tech_stack' => ['Laravel', 'Blade', 'MySQL', 'Tailwind CSS', 'Chart.js'],
                'github_url' => 'https://github.com/KREESS/UTBK-Tryout-System',
                'live_url' => null,
                'icon_name' => 'BookOpen',
                'gradient' => 'from-[#f59e0b] to-[#ff6b6b]',
                'is_featured' => true,
                'sort_order' => 4,
            ],
            [
                'slug' => 'siobe-academic-monitoring-system',
                'title' => 'SIOBE — Academic Learning Outcome System',
                'category' => 'Web App',
                'description' => 'Academic monitoring application designed to assess Program Learning Outcomes (CPL/CPMK/Sub-CPMK) for higher education accreditation compliance.',
                'long_description' => 'Enables lecturers to calculate curriculum rubric matrices, student outcome fulfillment curves, and generate automated academic accreditation PDF summaries.',
                'tech_stack' => ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'FPDF'],
                'github_url' => 'https://github.com/KREESS/SIOBE-Monitoring-System',
                'live_url' => null,
                'icon_name' => 'GraduationCap',
                'gradient' => 'from-[#10b981] to-[#38bdf8]',
                'is_featured' => false,
                'sort_order' => 5,
            ],
            [
                'slug' => 'insulmart-ecommerce-platform',
                'title' => 'Insulmart E-Commerce Platform',
                'category' => 'Web App',
                'description' => 'Modern specialized e-commerce store with catalog indexing, shopping cart, transactional invoice flow, and administrative inventory control.',
                'long_description' => 'Full-fledged Laravel web application with product search filters, cart state persistence, role-based access control (Admin vs Customer), and receipt export.',
                'tech_stack' => ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL', 'Alpine.js'],
                'github_url' => 'https://github.com/KREESS/Insulmart',
                'live_url' => null,
                'icon_name' => 'Store',
                'gradient' => 'from-[#ec4899] to-[#a855f7]',
                'is_featured' => false,
                'sort_order' => 6,
            ],
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(['slug' => $proj['slug']], $proj);
        }

        // 3. Seed Skills & Technologies
        $skills = [
            // Languages
            ['name' => 'JavaScript', 'category' => 'Languages', 'level' => 'Advanced', 'badge' => 'ES6+', 'color' => '#f7df1e', 'proficiency' => 90, 'sort_order' => 1],
            ['name' => 'TypeScript', 'category' => 'Languages', 'level' => 'Intermediate', 'badge' => 'Typed', 'color' => '#3178c6', 'proficiency' => 85, 'sort_order' => 2],
            ['name' => 'PHP', 'category' => 'Languages', 'level' => 'Advanced', 'badge' => 'Backend', 'color' => '#777bb4', 'proficiency' => 92, 'sort_order' => 3],
            ['name' => 'Python', 'category' => 'Languages', 'level' => 'Intermediate', 'badge' => 'AI/CNN', 'color' => '#3776ab', 'proficiency' => 85, 'sort_order' => 4],
            ['name' => 'Dart', 'category' => 'Languages', 'level' => 'Intermediate', 'badge' => 'Flutter', 'color' => '#0175c2', 'proficiency' => 80, 'sort_order' => 5],
            ['name' => 'Go', 'category' => 'Languages', 'level' => 'Basic', 'badge' => 'Cloud', 'color' => '#00add8', 'proficiency' => 65, 'sort_order' => 8],
            ['name' => 'HTML5 & CSS3', 'category' => 'Languages', 'level' => 'Expert', 'badge' => 'UI', 'color' => '#e34f26', 'proficiency' => 95, 'sort_order' => 11],

            // Frameworks & Frontend
            ['name' => 'Laravel 12', 'category' => 'Frameworks & Frontend', 'level' => 'Advanced', 'badge' => 'Core Stack', 'color' => '#ff2d20', 'proficiency' => 95, 'sort_order' => 12],
            ['name' => 'React.js', 'category' => 'Frameworks & Frontend', 'level' => 'Advanced', 'badge' => 'SPA', 'color' => '#61dafb', 'proficiency' => 90, 'sort_order' => 13],
            ['name' => 'Inertia.js', 'category' => 'Frameworks & Frontend', 'level' => 'Advanced', 'badge' => 'Fullstack', 'color' => '#9553e9', 'proficiency' => 90, 'sort_order' => 14],
            ['name' => 'Node.js & Express', 'category' => 'Frameworks & Frontend', 'level' => 'Intermediate', 'badge' => 'API', 'color' => '#339933', 'proficiency' => 82, 'sort_order' => 15],
            ['name' => 'Flutter', 'category' => 'Frameworks & Frontend', 'level' => 'Intermediate', 'badge' => 'Mobile App', 'color' => '#02569b', 'proficiency' => 85, 'sort_order' => 18],
            ['name' => 'Tailwind CSS', 'category' => 'Frameworks & Frontend', 'level' => 'Expert', 'badge' => 'Styling', 'color' => '#06b6d4', 'proficiency' => 95, 'sort_order' => 19],
            ['name' => 'Three.js & GSAP', 'category' => 'Frameworks & Frontend', 'level' => 'Intermediate', 'badge' => '3D / Motion', 'color' => '#88ce02', 'proficiency' => 80, 'sort_order' => 20],
            ['name' => 'Bootstrap', 'category' => 'Frameworks & Frontend', 'level' => 'Advanced', 'badge' => null, 'color' => '#7952b3', 'proficiency' => 88, 'sort_order' => 21],

            // Databases & Storage
            ['name' => 'MySQL', 'category' => 'Databases & Storage', 'level' => 'Advanced', 'badge' => 'RDBMS', 'color' => '#4479a1', 'proficiency' => 90, 'sort_order' => 22],
            ['name' => 'PostgreSQL', 'category' => 'Databases & Storage', 'level' => 'Intermediate', 'badge' => 'SQL', 'color' => '#4169e1', 'proficiency' => 80, 'sort_order' => 23],
            ['name' => 'SQLite', 'category' => 'Databases & Storage', 'level' => 'Advanced', 'badge' => 'Embedded', 'color' => '#003b57', 'proficiency' => 90, 'sort_order' => 24],
            ['name' => 'MongoDB', 'category' => 'Databases & Storage', 'level' => 'Intermediate', 'badge' => 'NoSQL', 'color' => '#47a248', 'proficiency' => 78, 'sort_order' => 25],

            // DevOps, AI & Tools
            ['name' => 'Git & GitHub', 'category' => 'DevOps, AI & Tools', 'level' => 'Advanced', 'badge' => 'VCS', 'color' => '#f05032', 'proficiency' => 92, 'sort_order' => 27],
            ['name' => 'Docker', 'category' => 'DevOps, AI & Tools', 'level' => 'Intermediate', 'badge' => 'Container', 'color' => '#2496ed', 'proficiency' => 78, 'sort_order' => 28],
            ['name' => 'Vite', 'category' => 'DevOps, AI & Tools', 'level' => 'Advanced', 'badge' => 'Build Tool', 'color' => '#646cff', 'proficiency' => 90, 'sort_order' => 29],
            ['name' => 'TensorFlow / Keras', 'category' => 'DevOps, AI & Tools', 'level' => 'Intermediate', 'badge' => 'AI / Deep Learning', 'color' => '#ff6f00', 'proficiency' => 82, 'sort_order' => 30],
            ['name' => 'Android Studio', 'category' => 'DevOps, AI & Tools', 'level' => 'Intermediate', 'badge' => 'Mobile IDE', 'color' => '#3ddc84', 'proficiency' => 80, 'sort_order' => 31],
            ['name' => 'Postman / REST APIs', 'category' => 'DevOps, AI & Tools', 'level' => 'Advanced', 'badge' => 'Testing', 'color' => '#ff6c37', 'proficiency' => 90, 'sort_order' => 32],
            ['name' => 'Linux / VPS Nginx', 'category' => 'DevOps, AI & Tools', 'level' => 'Intermediate', 'badge' => 'Hosting', 'color' => '#fcc624', 'proficiency' => 80, 'sort_order' => 33],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                $skill
            );
        }

        Skill::whereNotIn('name', array_column($skills, 'name'))->delete();

        // 3. Seed initial comments
        if (Comment::count() === 0) {
            $initialComments = [
                [
                    'nickname' => 'Sarah Developer',
                    'message' => 'Portfolionya keren banget Mas Aditya! Desainnya sleek dan interaksinya sangat mulus. Sukses terus untuk project AI & Web3-nya! 🚀',
                    'avatar_color' => '#38bdf8',
                    'ip_address' => '127.0.0.1',
                    'user_agent' => 'Mozilla/5.0 Seeder',
                    'created_at' => now()->subHours(5),
                ],
                [
                    'nickname' => 'Budi Santoso',
                    'message' => 'Kombinasi Flutter + AI di project SmartSkin menarik banget. Semangat terus berkarya bro!',
                    'avatar_color' => '#a855f7',
                    'ip_address' => '127.0.0.1',
                    'user_agent' => 'Mozilla/5.0 Seeder',
                    'created_at' => now()->subHours(2),
                ],
                [
                    'nickname' => 'Anonymous Recruiter',
                    'message' => 'Great portfolio and impressive tech stack! Will definitely keep your profile in mind for upcoming full-stack opportunities.',
                    'avatar_color' => '#ff6b6b',
                    'ip_address' => '127.0.0.1',
                    'user_agent' => 'Mozilla/5.0 Seeder',
                    'created_at' => now()->subMinutes(45),
                ],
                [
                    'nickname' => 'Alex (Fellow Dev)',
                    'message' => 'Suka banget sama micro-interactions dan vibe dark neon-nya. Clean architecture!',
                    'avatar_color' => '#10b981',
                    'ip_address' => '127.0.0.1',
                    'user_agent' => 'Mozilla/5.0 Seeder',
                    'created_at' => now()->subMinutes(12),
                ],
            ];

            foreach ($initialComments as $commentData) {
                Comment::create($commentData);
            }
        }
    }
}
