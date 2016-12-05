<?php

namespace DJEM\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class StaticFiles extends Controller
{
    public static function get($file = null)
    {
        $directory = env('DJEM_DEBUG', false) ? 'panel' : 'panel-compiled';
        if (empty($file)) {
            $file = 'index.html';
        }
        $public = realpath(__DIR__.'/../../../'.$directory);
        $file = realpath($public.'/'.preg_replace('|[^-_0-9a-z/.]|i', '', $file));

        if (! is_file($file) || substr($file, 0, strlen($public)) !== $public) {
            abort(404);
        } // @codeCoverageIgnore

        $response = new Response(
            file_get_contents($file),
            200,
            ['Content-type' => self::getContentType($file)]
        );

        $response->setSharedMaxAge(3600);
        $response->setMaxAge(3600);
        $response->setExpires(new \DateTime('+1 hour'));

        return $response;
    }

    public static function getContentType($file)
    {
        if (preg_match('/\.js$/i', $file)) {
            return 'text/javascript';
        }
        if (preg_match('/\.css$/i', $file)) {
            return 'text/css';
        }
        if (preg_match('/\.(html|htm)$/i', $file)) {
            return 'text/html';
        }

        return 'text/plain';
    }
}
