<?php
namespace DJEM\Http\Controllers\Api;

use DJEM\Doctype as Doctype;
use Illuminate\Http\Request;
use Input;

class Content extends \Illuminate\Routing\Controller
{
    private function doctype()
    {
        return Input::get('_doctype');
    }

    public function get()
    {
        $doctype = $this->doctype();
        return [
            'metaData' => (new $doctype)->load()
        ];
    }

    public function set()
    {
        $doctype = $this->doctype();
        (new $doctype)->save();
        return $this->get();
    }

    public function loadRelation()
    {
        $doctype = $this->doctype();
        $doctype = new $doctype;
        if (method_exists($doctype, $method = 'load'.ucfirst(Input::get('field')))) {
            return $doctype->$method();
        }
        abort(400, 'Unknown field: '.Input::get('field'));
    }
}
