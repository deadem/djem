<?php

namespace DJEM\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class Authenticate
{
    use Unauthorized;

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param string $usertype
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $usertype = null)
    {
        $auth = Auth::guard($usertype);
        if ($auth->guest()) {
            $credentials = ['email' => $request->input('login'), 'password' => $request->input('password')];
            if (! $auth->attempt($credentials)) {
                return $this->unauthorizedResponse();
            }
        }

        return $next($request)->header('x-csrf-token', $request->session()->token());
    }
}
