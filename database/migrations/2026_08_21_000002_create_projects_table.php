<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category', 50)->default('Web App'); // AI / ML, Mobile, Web App, etc.
            $table->text('description');
            $table->text('long_description')->nullable();
            $table->json('tech_stack'); // JSON array of strings e.g. ["Laravel", "React", "Python"]
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('icon_name', 50)->nullable()->default('Smartphone');
            $table->string('gradient', 100)->nullable()->default('from-[#ff6b6b] to-[#a855f7]');
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
