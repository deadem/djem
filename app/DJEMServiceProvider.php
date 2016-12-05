<?php

namespace DJEM;

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class DJEMServiceProvider extends ServiceProvider
{
    private function routes(Router $router)
    {
        $router->middleware('djem.auth', \DJEM\Http\Middleware\Authenticate::class);
        $router->middlewareGroup('djem.web', [
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \DJEM\Http\Middleware\VerifyCsrfToken::class,
        ]);

        Route::group(['middleware' => ['djem.web', 'djem.auth'], 'namespace' => '\DJEM\Http\Controllers'], function () {
            Route::any('djem/api', 'Api@getState');
            Route::any('djem/api/tree', 'Api\Main@tree');
            Route::any('djem/api/grid', 'Api\Main@grid');
            Route::any('djem/api/content/delete', 'Api\Content@delete');
            Route::any('djem/api/content/load', 'Api\Content@loadRelation');
            Route::get('djem/api/content', 'Api\Content@get');
            Route::post('djem/api/content', 'Api\Content@set');
            Route::get('djem/api/files', 'Api\Files@get');
            Route::post('djem/api/files/upload', 'Api\Files@upload');
            Route::post('djem/api/files', 'Api\Files@set');
        });
        Route::get('djem/{file?}', '\DJEM\Http\Controllers\StaticFiles@get')->where('file', '.*');
    }

    /**
     * Bootstrap the application services.
     *
     * @param Router $router
     */
    public function boot(Router $router)
    {
        $this->publishes([
            __DIR__.'/../app/Doctypes' => base_path('app/Doctypes'),
            __DIR__.'/../config' => base_path('config'),
        ]);
        $this->routes($router);
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/djem.php', 'djem');
    }
}
