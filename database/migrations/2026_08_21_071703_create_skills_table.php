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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category', 50)->default('Languages'); // Languages, Frameworks & Frontend, Databases & Storage, DevOps & Tools, etc.
            $table->string('level', 50)->default('Intermediate'); // Basic, Intermediate, Advanced, Expert
            $table->string('badge', 50)->nullable(); // e.g. Core, AI, Mobile, Web3
            $table->string('icon', 100)->nullable(); // e.g. SiReact, Code2, or URL
            $table->string('color', 50)->nullable()->default('#ff6b6b');
            $table->text('description')->nullable();
            $table->integer('proficiency')->default(80); // 1-100%
            $table->boolean('is_featured')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
