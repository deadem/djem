<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public $table = 'news';

    public $fillable = ['name', 'text', 'tagsList'];
}
