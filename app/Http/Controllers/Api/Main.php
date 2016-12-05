<?php

namespace DJEM\Http\Controllers\Api;

use DJEM\DoctypeResolver;
use BadMethodCallException;
use Illuminate\Http\Request;

class Main extends \Illuminate\Routing\Controller
{
    public function tree(Request $request)
    {
        return response()->json($this->getTree($request->input('node')));
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
            $doctype = $leaf['_doctype'];
        }

        if (! class_exists($doctype)) {
            throw new BadMethodCallException('Can\'t create class '.$doctype);
        }

        return DoctypeResolver::createDoctype($doctype);
    }
}
