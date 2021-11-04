<?php

namespace App\Doctypes\Controls\Traits;

trait UploadImage
{
    public function uploadImage()
    {
        $copyToPublic = function ($file) {
            $url = '/files/'.basename($file);
            $path = public_path().'/files/'.basename($file);
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
