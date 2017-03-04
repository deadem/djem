<?php

namespace App\Doctypes\Traits;

trait UploadImage
{
    public function uploadImage()
    {
        return function ($fileData, $model, $getter) {
            $folder = explode('\\', get_class($model));
            $folder = array_pop($folder);

            $url = '/files/'.$folder;
            $path = public_path().'/files/'.$folder;

            if (! is_dir($path)) {
                mkdir($path, 0777, true);
            }

            $path = $path.'/'.basename($fileData['file']);
            $url = $url.'/'.basename($fileData['file']);

            copy($fileData['file'], $path);

            $model = new $model;

            $model->name = $fileData['name'];
            $model->path = $path;
            $model->url = $url;

            return $model;
        };
    }
}
