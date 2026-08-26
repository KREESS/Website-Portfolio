<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_loads_with_initial_comments_and_projects(): void
    {
        Comment::create([
            'nickname' => 'Tester',
            'message' => 'Hello test message',
            'ip_address' => '127.0.0.1',
        ]);

        Project::create([
            'title' => 'Test Project',
            'category' => 'Web App',
            'description' => 'Test Description',
            'tech_stack' => ['Laravel', 'React'],
            'is_featured' => true,
        ]);

        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_guest_can_post_anonymous_comment_instantly(): void
    {
        $response = $this->post('/comments', [
            'nickname' => 'Guest Visitor',
            'message' => 'Great work on your portfolio!',
            'avatar_color' => '#ff6b6b',
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('comments', [
            'nickname' => 'Guest Visitor',
            'message' => 'Great work on your portfolio!',
        ]);
    }

    public function test_admin_can_login_and_access_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('password123'),
        ]);

        $loginResponse = $this->post('/admin/login', [
            'email' => 'admin@test.com',
            'password' => 'password123',
        ]);

        $loginResponse->assertRedirect(route('admin.dashboard'));
        $this->assertAuthenticatedAs($user);

        $dashboardResponse = $this->actingAs($user)->get('/admin/dashboard');
        $dashboardResponse->assertStatus(200);
    }

    public function test_admin_can_create_update_and_delete_project(): void
    {
        $admin = User::factory()->create();

        // 1. Create Project
        $createResponse = $this->actingAs($admin)->post('/admin/projects', [
            'title' => 'Super AI Platform',
            'category' => 'AI / ML',
            'description' => 'A cutting-edge deep learning platform',
            'long_description' => 'Full architectural details of the neural network model',
            'tech_stack' => 'Python, TensorFlow, FastAPI, React',
            'github_url' => 'https://github.com/KREESS/super-ai',
            'is_featured' => true,
            'sort_order' => 1,
        ]);

        $createResponse->assertStatus(302);
        $this->assertDatabaseHas('projects', [
            'title' => 'Super AI Platform',
            'category' => 'AI / ML',
            'is_featured' => true,
        ]);

        $project = Project::where('title', 'Super AI Platform')->first();

        // 2. Update Project
        $updateResponse = $this->actingAs($admin)->put("/admin/projects/{$project->id}", [
            'title' => 'Super AI Platform (Updated)',
            'category' => 'AI / ML',
            'description' => 'Updated description text',
            'tech_stack' => ['Python', 'FastAPI'],
            'is_featured' => false,
        ]);

        $updateResponse->assertStatus(302);
        $this->assertDatabaseHas('projects', [
            'title' => 'Super AI Platform (Updated)',
            'is_featured' => false,
        ]);

        // 3. Delete Project
        $deleteResponse = $this->actingAs($admin)->delete("/admin/projects/{$project->id}");
        $deleteResponse->assertStatus(302);
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }
}
