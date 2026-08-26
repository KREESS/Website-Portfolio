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
        'parent_id',
        'is_admin',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Parent comment (if this is a reply)
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Replies to this comment
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')->oldest();
    }

    /**
     * Scope to get public active top-level comments (not deleted)
     */
    public function scopePublicList($query)
    {
        return $query->select(['id', 'nickname', 'message', 'avatar_color', 'is_admin', 'created_at'])
            ->whereNull('parent_id')
            ->with(['replies' => fn ($q) => $q->select(['id', 'parent_id', 'nickname', 'message', 'avatar_color', 'is_admin', 'created_at'])])
            ->latest();
    }
}
