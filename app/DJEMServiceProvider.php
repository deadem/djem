<?php

namespace DJEM;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;

class DJEMServiceProvider extends ServiceProvider
{
    private function routes(Router $router)
    {
        $router->middleware('djem.auth', '\DJEM\Http\Middleware\Authenticate');

        Route::group(['middleware' => ['web', 'djem.auth'], 'namespace' => '\DJEM\Http\Controllers'], function () {
            Route::any('djem/api', 'Api@getState');
            Route::any('djem/api/tree', config('djem.main').'@tree');
            Route::any('djem/api/grid', config('djem.main').'@grid');
            Route::any('djem/api/content/delete', 'Api\Content@delete');
            Route::get('djem/api/content/load', 'Api\Content@loadRelation');
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
     * @param Router $router
     * @return void
     */
    public function boot(Router $router)
    {
        $this->publishes([
            __DIR__.'/../app/Doctypes' => base_path('app/Doctypes'),
            __DIR__.'/../config' => base_path('config'),
            __DIR__.'/../resources/djem' => base_path('resources/djem'),
        ]);
        $this->routes($router);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/djem.php', 'djem');
    }
}
