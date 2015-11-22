<?php
namespace DJEM\Http\Controllers\Api;

use DJEM\Doctype as Doctype;
use Illuminate\Http\Request;

class Main extends \Illuminate\Routing\Controller
{
    public function tree(Request $request)
    {
        return $this->getTree($request->input('node'));
    }

    public function grid(Request $request)
    {
        $id = $request->input('tree');
        return $this->getDoctype($id)->grid($id);
    }

    protected function getTree($id = 0)
    {
        return call_user_func(config('djem.tree'), $id);
    }

    protected function findLeaf($id, $tree = null)
    {
        if ($tree === null) {
             $tree = $this->getTree();
        }
        foreach ($tree as $key => $leaf) {
            if (isset($leaf['id']) && $leaf['id'] == $id) {
                return $leaf;
            }
            if ($key == 'items') {
                $found = $this->findLeaf($id, $leaf);
                if ($found) {
                    return $found;
                }
            }
        }
        return false;
    }

    public function getDoctype($id)
    {
        $doctype = null;
        $leaf = $this->findLeaf($id);
        if ($leaf) {
            $doctype = Doctype::getDoctype($leaf['_doctype']);
        }
        return new $doctype;
    }
}
