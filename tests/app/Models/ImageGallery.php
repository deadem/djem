<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageGallery extends Model
{
    public $table = 'controls_image_gallery';
    public $fillable = ['name'];

    public function images()
    {
        return $this->belongsToMany(Image::class);
    }
}
