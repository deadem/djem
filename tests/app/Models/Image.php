<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public $table = 'images';
    public $timestamps = false;

    public function news()
    {
        return $this->belongsTo(News::class);
    }
}
