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
        if (Input::get('raw')) {
            return (new $doctype)->load();
        }

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

    public function delete()
    {
        $doctype = $this->doctype();
        (new $doctype)->delete();
        return [];
    }

    public function loadRelation()
    {
        $doctype = $this->doctype();
        return (new $doctype)->loadRelation(Input::get('field'));
    }
}
