<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $comments = Comment::publicList()->take(20)->get();
        $totalComments = Comment::count();
        $projects = Project::ordered()->get();
        $skills = Skill::ordered()->get();

        return Inertia::render('Home', [
            'initialComments' => $comments,
            'totalComments' => $totalComments,
            'projects' => $projects,
            'skills' => $skills,
        ]);
    }
}

