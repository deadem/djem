<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public $table = 'news';

    public $fillable = ['name', 'text', 'tagsList', 'sort'];

    public function smallImage()
    {
        return $this->belongsTo(SmallImage::class);
    }

    public function images()
    {
        return $this->belongsToMany(Image::class)->orderBy('sort');
    }
}
