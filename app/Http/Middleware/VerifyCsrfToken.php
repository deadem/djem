<?php

namespace DJEM\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;
use Illuminate\Session\TokenMismatchException;

class VerifyCsrfToken extends BaseVerifier
{
    use Unauthorized;

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];

    public function handle($request, \Closure $next)
    {
        try {
            $response = parent::handle($request, $next);
        } catch (TokenMismatchException $e) {
            $response = $this->unauthorizedResponse();
        }

        return $response->header('x-csrf-token', $request->session()->token());
    }
}
