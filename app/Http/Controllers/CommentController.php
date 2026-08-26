<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class CommentController extends Controller
{
    /**
     * Get paginated public comments (API / JSON)
     */
    public function index(Request $request)
    {
        $perPage = 10;
        $comments = Comment::publicList()->paginate($perPage);

        return response()->json($comments);
    }

    /**
     * Store a new anonymous comment
     */
    public function store(Request $request)
    {
        // 1. Honeypot protection (if honeypot field is filled, silently reject or fake success)
        if ($request->filled('website_url') || $request->filled('honeypot')) {
            return back()->with('success', 'Komentar berhasil dikirim!');
        }

        // 2. IP-based Rate limiting (e.g. 1 comment per 30 seconds per IP)
        $ip = $request->ip();
        $rateLimitKey = 'comment-submission:' . $ip;

        if (RateLimiter::tooManyAttempts($rateLimitKey, 2)) {
            $seconds = RateLimiter::availableIn($rateLimitKey);
            return back()->withErrors([
                'rate_limit' => "Terlalu banyak komentar. Harap tunggu {$seconds} detik lagi.",
            ])->with('error', "Terlalu banyak permintaan. Harap tunggu {$seconds} detik lagi.");
        }

        RateLimiter::hit($rateLimitKey, 60);

        // 3. Validation
        $validated = $request->validate([
            'nickname' => ['nullable', 'string', 'max:50'],
            'message' => ['required', 'string', 'min:2', 'max:500'],
            'avatar_color' => ['nullable', 'string', 'max:20'],
        ]);

        // 4. Sanitize inputs
        $nickname = trim(strip_tags($validated['nickname'] ?? ''));
        if (empty($nickname)) {
            $nickname = 'Anonymous';
        }

        $message = trim(strip_tags($validated['message']));
        
        // Random cool avatar color palettes if not provided
        $colors = ['#ff6b6b', '#38bdf8', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];
        $avatarColor = $validated['avatar_color'] ?? $colors[array_rand($colors)];

        $comment = Comment::create([
            'nickname' => $nickname,
            'message' => $message,
            'avatar_color' => $avatarColor,
            'ip_address' => $ip,
            'user_agent' => Str::limit($request->userAgent() ?? '', 250),
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'comment' => [
                    'id' => $comment->id,
                    'nickname' => $comment->nickname,
                    'message' => $comment->message,
                    'avatar_color' => $comment->avatar_color,
                    'created_at' => $comment->created_at,
                ],
            ]);
        }

        return back()->with('success', 'Pesan Anda berhasil diposting!');
    }
}
