<?php

// @codingStandardsIgnoreStart
//
// example route:
// Route::get('{any}', function ($url) {
//    return (new App\Doctypes\Doctype)->view('/'.$url, App\Models\Url::class);
// })->where('any', '(?!(djem|_debugbar)/?).*');
// 
// example URL Model
//     namespace App\Models;
//     ...
//     class Url extends ...
//     {
//         protected $table = 'url';
//         protected $primaryKey = 'url';
//         protected $hidden = [ 'url', 'doctype', 'model', 'refid' ];
//         ...
//     }
//
// @codingStandardsIgnoreEnd

namespace App\Doctypes;

class Doctype extends \DJEM\Doctype
{
}
