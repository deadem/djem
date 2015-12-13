<?php
namespace DJEM\Http\Controllers\Api;

use DJEM\Doctype as Doctype;
use Illuminate\Http\Request;
use Input;

class Content extends \Illuminate\Routing\Controller
{
    private $request;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    private function doctype()
    {
        return Input::get('_doctype');
    }

    private function model()
    {
        return Input::get('_model');
    }

    public function get()
    {
        $doctype = $this->doctype();
        return [
            'metaData' => (new $doctype)->getContentView($this->model(), Input::get('id'))
        ];
    }

    public function set()
    {
        $doctype = $this->doctype();
        (new $doctype)->saveModel($this->model(), $this->request->all());
        return $this->get();
    }

    public function load()
    {
        $doctype = $this->doctype();
        $doctype = new $doctype;
        if (method_exists($doctype, $method = 'load'.ucfirst(Input::get('field')))) {
            return $doctype->$method();
        }
        abort(400, 'Unknown field: '.Input::get('field'));
    }
}
