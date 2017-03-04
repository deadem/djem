<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public $table = 'images';

    public $fillable = ['name', 'sort'];
    public $guarded = ['url'];
    public $hidden = ['path'];
}
