<?php

namespace App\Doctypes\Traits;

trait UploadImage
{
    public function uploadImage()
    {
        $copyToPublic = function ($file) {
            $url = '/files/';
            $path = public_path().'/files/';

            if (! is_dir($path)) {
                mkdir($path, 0777, true);
            }

            $path = $path.basename($file);
            $url = $url.basename($file);

            copy($file, $path);

            return [$path, $url];
        };

        return function ($fileData, $model, $getter) use ($copyToPublic) {
            $model = new $model;

            $model->name = $fileData['name'];
            [$model->path, $model->url] = $copyToPublic($fileData['file']);

            return $model;
        };
    }
}
