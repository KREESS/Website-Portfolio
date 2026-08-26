<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectAdminController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'category' => ['required', 'string', 'max:50'],
            'description' => ['required', 'string', 'max:500'],
            'long_description' => ['nullable', 'string'],
            'tech_stack' => ['required'], // can be array or comma-separated string
            'github_url' => ['nullable', 'url', 'max:255'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'icon_name' => ['nullable', 'string', 'max:50'],
            'gradient' => ['nullable', 'string', 'max:100'],
            'is_featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        // Format tech_stack to array if comma separated
        $techStack = $validated['tech_stack'];
        if (is_string($techStack)) {
            $techStack = array_values(array_filter(array_map('trim', explode(',', $techStack))));
        }

        $project = Project::create([
            'slug' => Str::slug($validated['title']) . '-' . Str::random(4),
            'title' => $validated['title'],
            'category' => $validated['category'],
            'description' => $validated['description'],
            'long_description' => $validated['long_description'] ?? null,
            'tech_stack' => $techStack,
            'github_url' => $validated['github_url'] ?? null,
            'live_url' => $validated['live_url'] ?? null,
            'icon_name' => $validated['icon_name'] ?? 'Smartphone',
            'gradient' => $validated['gradient'] ?? 'from-[#ff6b6b] to-[#a855f7]',
            'is_featured' => $request->boolean('is_featured'),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ]);

        return back()->with('success', 'Project "' . $project->title . '" berhasil ditambahkan!');
    }

    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'category' => ['required', 'string', 'max:50'],
            'description' => ['required', 'string', 'max:500'],
            'long_description' => ['nullable', 'string'],
            'tech_stack' => ['required'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'icon_name' => ['nullable', 'string', 'max:50'],
            'gradient' => ['nullable', 'string', 'max:100'],
            'is_featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $techStack = $validated['tech_stack'];
        if (is_string($techStack)) {
            $techStack = array_values(array_filter(array_map('trim', explode(',', $techStack))));
        }

        $project->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'description' => $validated['description'],
            'long_description' => $validated['long_description'] ?? null,
            'tech_stack' => $techStack,
            'github_url' => $validated['github_url'] ?? null,
            'live_url' => $validated['live_url'] ?? null,
            'icon_name' => $validated['icon_name'] ?? $project->icon_name,
            'gradient' => $validated['gradient'] ?? $project->gradient,
            'is_featured' => $request->boolean('is_featured'),
            'sort_order' => (int) ($validated['sort_order'] ?? $project->sort_order),
        ]);

        return back()->with('success', 'Project "' . $project->title . '" berhasil diperbarui!');
    }

    public function destroy(int $id)
    {
        $project = Project::findOrFail($id);
        $title = $project->title;
        $project->delete();

        return back()->with('success', 'Project "' . $title . '" berhasil dihapus!');
    }
}
