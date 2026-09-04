<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProjectAdminController;
use App\Http\Controllers\Admin\SkillAdminController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GuestbookController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/guestbook', [GuestbookController::class, 'index'])->name('guestbook');
Route::get('/comments', [CommentController::class, 'index'])->name('comments.index');
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');

// Admin Auth Routes
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

    // Protected Admin Routes
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

        // Comment Moderation
        Route::post('/comments/{id}/reply', [AdminDashboardController::class, 'reply'])->name('admin.comments.reply');
        Route::delete('/comments/{id}', [AdminDashboardController::class, 'destroy'])->name('admin.comments.destroy');
        Route::post('/comments/{id}/restore', [AdminDashboardController::class, 'restore'])->name('admin.comments.restore');
        Route::delete('/comments/{id}/force', [AdminDashboardController::class, 'forceDelete'])->name('admin.comments.force-delete');

        // Project CRUD
        Route::post('/projects', [ProjectAdminController::class, 'store'])->name('admin.projects.store');
        Route::put('/projects/{id}', [ProjectAdminController::class, 'update'])->name('admin.projects.update');
        Route::delete('/projects/{id}', [ProjectAdminController::class, 'destroy'])->name('admin.projects.destroy');

        // Skill / Tech Stack CRUD
        Route::post('/skills', [SkillAdminController::class, 'store'])->name('admin.skills.store');
        Route::put('/skills/{id}', [SkillAdminController::class, 'update'])->name('admin.skills.update');
        Route::delete('/skills/{id}', [SkillAdminController::class, 'destroy'])->name('admin.skills.destroy');
    });
});
