<?php
namespace DJEM\Http\Controllers\Api;

use DJEM\Doctype as Doctype;
use Illuminate\Http\Request;

class Content extends \Illuminate\Routing\Controller
{
    public function get(Request $request)
    {
        $doctype = $request->input('_doctype');
        $model = $request->input('_model');

        return [
            'metaData' => (new $doctype)->getContentView($model, $request->input('id'))
        ];
    }

    public function set(Request $request)
    {
        $doctype = $request->input('_doctype');
        $model = $request->input('_model');

        (new $doctype)->saveModel($model, \Input::all());
        return $this->get($request);
    }
}
