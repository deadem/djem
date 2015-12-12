<?php
namespace DJEM\Http\Controllers\Api;

use DJEM\Doctype as Doctype;
use Illuminate\Http\Request;

class Content extends \Illuminate\Routing\Controller
{
    private $request;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    private function doctype()
    {
        return $this->request->input('_doctype');
    }

    private function model()
    {
        return $this->request->input('_model');
    }

    public function get()
    {
        $doctype = $this->doctype();
        return [
            'metaData' => (new $doctype)->getContentView($this->model(), $this->request->input('id'))
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
        return (new $doctype)->load($this->model(), $this->request->input('id'), $this->request->input('field'), $this->request->input('filter'));
    }
}
