<?php

namespace DJEM\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param string $guard
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->guest()) {
            $credentials = ['email' => $request->input('login'), 'password' => $request->input('password')];
            if (! Auth::guard($guard)->attempt($credentials)) {
                return response([
                    'state' => 'unauthorized',
                ], 401)->header('x-csrf-token', $request->session()->token());
            }
        }

        return $next($request)->header('x-csrf-token', $request->session()->token());
    }
}
