<?php

namespace DJEM\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StaticFiles extends Controller
{
    public static function get($file = null)
    {
        if (empty($file)) {
            $file = 'index.html';
        }
        $public = realpath(__DIR__.'/../../../public');
        $file = realpath($public.'/'.preg_replace('|[^-_0-9a-z/.]|i', '', $file));
        if (substr($file, 0, strlen($public)) == $public && is_file($file)) {
            return new Response(
                file_get_contents($file),
                200,
                [ 'Content-type' => self::getContentType($file) ]
            );
        } else {
            abort(404);
        }
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
