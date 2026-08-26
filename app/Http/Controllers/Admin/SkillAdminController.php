<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillAdminController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:50'],
            'level' => ['required', 'string', 'max:50'],
            'badge' => ['nullable', 'string', 'max:50'],
            'icon' => ['nullable', 'string', 'max:100'],
            'color' => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:255'],
            'proficiency' => ['nullable', 'integer', 'min:1', 'max:100'],
            'is_featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $skill = Skill::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'level' => $validated['level'],
            'badge' => $validated['badge'] ?? null,
            'icon' => $validated['icon'] ?? null,
            'color' => $validated['color'] ?? '#ff6b6b',
            'description' => $validated['description'] ?? null,
            'proficiency' => (int) ($validated['proficiency'] ?? 80),
            'is_featured' => $request->boolean('is_featured', true),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ]);

        return back()->with('success', 'Skill/Tech "' . $skill->name . '" berhasil ditambahkan!');
    }

    public function update(Request $request, int $id)
    {
        $skill = Skill::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:50'],
            'level' => ['required', 'string', 'max:50'],
            'badge' => ['nullable', 'string', 'max:50'],
            'icon' => ['nullable', 'string', 'max:100'],
            'color' => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:255'],
            'proficiency' => ['nullable', 'integer', 'min:1', 'max:100'],
            'is_featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $skill->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'level' => $validated['level'],
            'badge' => $validated['badge'] ?? null,
            'icon' => $validated['icon'] ?? null,
            'color' => $validated['color'] ?? $skill->color,
            'description' => $validated['description'] ?? null,
            'proficiency' => (int) ($validated['proficiency'] ?? $skill->proficiency),
            'is_featured' => $request->boolean('is_featured', true),
            'sort_order' => (int) ($validated['sort_order'] ?? $skill->sort_order),
        ]);

        return back()->with('success', 'Skill/Tech "' . $skill->name . '" berhasil diperbarui!');
    }

    public function destroy(int $id)
    {
        $skill = Skill::findOrFail($id);
        $name = $skill->name;
        $skill->delete();

        return back()->with('success', 'Skill/Tech "' . $name . '" berhasil dihapus!');
    }
}

