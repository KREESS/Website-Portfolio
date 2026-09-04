<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $projects = Project::ordered()->get();
        $skills = Skill::ordered()->get();

        return Inertia::render('Home', [
            'projects' => $projects,
            'skills' => $skills,
        ]);
    }
}

