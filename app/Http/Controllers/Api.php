<?php
namespace DJEM\Http\Controllers;

use Illuminate\Http\Request;

class Api extends \Illuminate\Routing\Controller
{
    public function getState()
    {
        return response()->json(['username' => \Auth::user()['name'], 'token' => csrf_token() ]);
    }
}
