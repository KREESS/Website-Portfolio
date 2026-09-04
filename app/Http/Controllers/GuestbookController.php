<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Inertia\Inertia;

class GuestbookController extends Controller
{
    public function index()
    {
        $comments = Comment::publicList()->take(20)->get();
        $totalComments = Comment::count();

        return Inertia::render('Guestbook', [
            'initialComments' => $comments,
            'totalComments' => $totalComments,
        ]);
    }
}
