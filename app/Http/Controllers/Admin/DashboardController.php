<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tab = $request->query('tab', 'overview'); // 'overview', 'skills', 'projects', 'comments', 'deleted'
        $skillCategory = $request->query('skill_category', 'all');

        $query = Comment::query();

        if ($tab === 'deleted') {
            $query->onlyTrashed();
        }

        if ($search && in_array($tab, ['comments', 'deleted'])) {
            $query->where(function ($q) use ($search) {
                $q->where('nickname', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%")
                  ->orWhere('ip_address', 'like', "%{$search}%");
            });
        }

        $comments = $query->latest()->paginate(15)->withQueryString();
        $projects = Project::ordered()->get();
        $skills = Skill::ordered()->get();

        $stats = [
            'total_active' => Comment::count(),
            'total_deleted' => Comment::onlyTrashed()->count(),
            'total_today' => Comment::whereDate('created_at', today())->count(),
            'total_projects' => Project::count(),
            'total_skills' => Skill::count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'comments' => $comments,
            'projects' => $projects,
            'skills' => $skills,
            'filters' => [
                'search' => $search,
                'tab' => $tab,
                'skill_category' => $skillCategory,
            ],
            'stats' => $stats,
        ]);
    }

    public function destroy(int $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete(); // Soft delete

        return back()->with('success', 'Komentar berhasil dihapus (soft-deleted).');
    }

    /**
     * Admin replies to a guestbook comment
     */
    public function reply(Request $request, int $id)
    {
        $parent = Comment::findOrFail($id);

        // Flatten: always attach to the top-level parent
        $parentId = $parent->parent_id ?? $parent->id;

        $validated = $request->validate([
            'message' => ['required', 'string', 'min:2', 'max:500'],
        ]);

        Comment::create([
            'nickname' => 'Aditya P. S.',
            'message' => trim(strip_tags($validated['message'])),
            'avatar_color' => '#2563eb',
            'ip_address' => $request->ip(),
            'user_agent' => 'Admin Panel',
            'parent_id' => $parentId,
            'is_admin' => true,
        ]);

        return back()->with('success', "Balasan atas komentar #{$id} berhasil dikirim!");
    }

    public function restore(int $id)
    {
        $comment = Comment::onlyTrashed()->findOrFail($id);
        $comment->restore();

        return back()->with('success', 'Komentar berhasil dipulihkan.');
    }

    public function forceDelete(int $id)
    {
        $comment = Comment::onlyTrashed()->findOrFail($id);
        $comment->forceDelete();

        return back()->with('success', 'Komentar berhasil dihapus permanen.');
    }
}
