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

        $doctype = $this->getDoctype($id);
        $doctypeObject = DoctypeResolver::createDoctype($doctype);
        $grid = $doctypeObject->grid($id);

        $data = $grid->getData();
        $data['metaData']['options'] += [
            'subtypes' => $doctypeObject->getSubtypes(),
            '_doctype' => $doctype,
            'contextMenu' => $doctypeObject->getContextMenu(),
        ];

        return $data;
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

        return $doctype;
    }
}
