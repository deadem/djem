<?php

namespace DJEM\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class Files extends \Illuminate\Routing\Controller
{
    public function get(Request $request)
    {
        return [];
    }

    public function set(Request $request)
    {
    }

    public function upload(Request $request)
    {
        $files = $request->file('data');
        if (! is_array($files)) {
            abort(413, 'Upload error');
        }

        return collect($files)->map(function (UploadedFile $file) {
            if (! $file->isValid()) {
                abort(413, 'Upload error');
            }
            $tempFileName = uniqid().'.'.$file->getClientOriginalName();
            $file->move(sys_get_temp_dir(), $tempFileName);

            return [
                'name' => $file->getClientOriginalName(),
                'file' => $tempFileName,
            ];
        })->toArray();
    }
}
