<?php

namespace DJEM\Http\Controllers\Api;

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

        $doctype = $this->getDoctype($id);
        $doctypeObject = new $doctype;
        $grid = $doctypeObject->grid($id);

        $data = $grid->getData();
        $data['metaData']['options'] += [
            'doctypes' => $doctypeObject->getDoctypes(),
            '_doctype' => $doctype,
            'contextMenu' => $doctypeObject->getContextMenu(),
        ];

        return response()->json($data);
    }

    protected function getTree($id = 0)
    {
        return config('djem.tree');
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
            if (isset($leaf['items'])) {
                $found = $this->findLeaf($id, $leaf['items']);
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

        return $doctype;
    }
}
