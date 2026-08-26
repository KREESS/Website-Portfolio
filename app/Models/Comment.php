<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nickname',
        'message',
        'ip_address',
        'user_agent',
        'avatar_color',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Scope to get public active comments (not deleted)
     */
    public function scopePublicList($query)
    {
        return $query->select(['id', 'nickname', 'message', 'avatar_color', 'created_at'])
            ->latest();
    }
}
