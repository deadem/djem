<?php

namespace DJEM\Http\Controllers\Api;

use DJEM\DoctypeResolver;
use BadMethodCallException;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

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

        $grid = $doctype->grid($id);

        $metaData = $grid->getMetaData();
        if (! isset($metaData['options'])) {
            $metaData['options'] = [];
        }

        $metaData['options'] += [
            'subtypes' => $doctype->getSubtypes(),
            '_doctype' => get_class($doctype->getResolverObject()),
            'contextMenu' => $doctype->getContextMenu(),
        ];

        $items = $grid->getItems() ?: new Collection();
        $total = $items->count();
        if ($total && method_exists($items, 'total')) {
            $total = $items->total();
        }

        if (empty($metaData['fields'])) {
            // fields data required
            $metaData['fields'] = [['name' => 'id']];
            $metaData['columns'] = [];
        }

        return [
            'metaData' => $metaData,
            'items' => $items->all(),
            'total' => $total,
        ];
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

        return DoctypeResolver::createDoctype($doctype);
    }
}
