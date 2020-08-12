<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $fillable = [ 'user_id', 'name', 'category_id', 'description', 'image' ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function getgetImageAttribute(){
        return url("storage/$this->image");
    }
}
