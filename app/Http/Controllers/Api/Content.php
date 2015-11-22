<?php
namespace DJEM\Http\Controllers\Api;

use DJEM\Doctype as Doctype;
use Illuminate\Http\Request;

class Content extends \Illuminate\Routing\Controller
{
    public function get(Request $request)
    {
        $model = Doctype::getModel($request->input('_model'));
        return $model::getContentView($request->input('id'));
    }

    public function set(Request $request)
    {
        $model = Doctype::getModel($request->input('_model'));

        if (!$request->input('id')) {
            // если не передавли id, попробуем создать такую сущность
            $obj = new $model(\Input::all());
            $obj->save();
            \Input::merge([ 'id' => $obj->id ]);
        }

        $model::findOrFail($request->input('id'))->update(\Input::all());
        return $this->get($request);
    }
}
