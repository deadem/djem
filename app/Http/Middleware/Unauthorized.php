<?php

namespace DJEM\Http\Middleware;

trait Unauthorized
{
    protected function unauthorizedResponse()
    {
        return response()->json([
            'state' => 'unauthorized',
        ])->header('x-csrf-token', \Request::session()->token())->setStatusCode(401);
    }
}
