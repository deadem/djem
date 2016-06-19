<?php

namespace DJEM\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->guest()) {
            $credentials = ['email' => $request->input('login'), 'password' => $request->input('password')];
            if (!Auth::guard($guard)->attempt($credentials)) {
                return response([
                    'state' => 'unauthorized'
                ], 401)->header('x-csrf-token', $request->session()->token());
            }
        }
        return $next($request)->header('x-csrf-token', $request->session()->token());
    }
}
