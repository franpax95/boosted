<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    protected $fillable = [ 'user_id', 'name', 'description', 'exercises' ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
