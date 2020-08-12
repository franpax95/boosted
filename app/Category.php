<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [ 'user_id', 'name' ];

    public function exercises(){
        return $this->hasMany(Exercise::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
