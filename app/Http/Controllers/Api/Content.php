<?php

namespace DJEM\Http\Controllers\Api;

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
        $doctype = $this->request->input('_doctype');

        return new $doctype;
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
        try {
            $this->doctype()->save();
        } catch (\InvalidArgumentException $e) {
            return response($e->getMessage(), 400);
        }

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
