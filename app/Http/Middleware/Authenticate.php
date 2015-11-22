<?php

namespace DJEM\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

class Authenticate
{
    /**
     * The Guard implementation.
     *
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     *
     * @param  Guard  $auth
     * @return void
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // $this->auth->logout();
        if ($this->auth->guest()) {
            $credentials = ['email' => $request->input('login'), 'password' => $request->input('password')];
            if (!$this->auth->attempt($credentials)) {
                return response([
                    'state' => 'unauthorized'
                ], 401)->header('x-csrf-token', $request->session()->token());
            }
        }
        return $next($request)->header('x-csrf-token', $request->session()->token());
    }
}
