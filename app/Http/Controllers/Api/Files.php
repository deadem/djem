<?php
namespace DJEM\Http\Controllers\Api;

use Illuminate\Http\Request;

class Files extends \Illuminate\Routing\Controller
{
    public function get(Request $request)
    {
        $request;
        return [];
    }

    public function set(Request $request)
    {
        $request;
    }

    public function upload(Request $request)
    {
        $files = $request->file('data');
        $isValid = true;
        $result = [];

        foreach ($files as $file) {
            if ($file->isValid()) {
                $tempFileName = uniqid().'.'.$file->getClientOriginalName();
                $file->move(sys_get_temp_dir(), $tempFileName);
                $result[] = [
                    'name' => $file->getClientOriginalName(),
                    // 'url' => 'http://lorempixel.com/64/64/?'. rand(),
                    'file' => $tempFileName
                ];
            } else {
                $isValid = false;
            }
        }

        if ($isValid) {
            return $result;
        }
        abort(500, 'Upload error');
    }
}
