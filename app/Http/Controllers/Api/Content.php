<?php

namespace DJEM\Http\Controllers\Api;

use DJEM\DoctypeResolver;
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
        return DoctypeResolver::createDoctype($this->request->input('_doctype'));
    }

    public function get()
    {
        $doctype = $this->doctype();

        if ($this->request->input('raw')) {
            return $doctype->load();
        }

        return [
            'metaData' => $doctype->load(),
        ];
    }

    public function set()
    {
        $this->doctype()->save();

        return $this->get();
    }

    public function delete()
    {
        $this->doctype()->delete();

        return [];
    }

    public function loadRelation()
    {
        return $this->doctype()->loadRelation($this->request->input('field'));
    }
}
