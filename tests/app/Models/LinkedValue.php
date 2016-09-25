<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkedValue extends Model
{
    public $table = 'linked_values';

    public $timestamps = false;
    public $fillable = ['name'];
}
