<?php

namespace DJEM\Editor\Controls;

use Illuminate\Database\Eloquent\Model;

class Tag extends Select
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.tag');
    }

    public function loadRelation($model)
    {
        if ($this->isLocalMode()) {
            $store = $this->getStore();
            $indexed = array_keys($store) === range(0, count($store) - 1);

            return collect($store)->map(function ($text, $value) use ($indexed) {
                return [
                    'value' => $indexed ? $text : $value,
                    'text' => $text,
                ];
            });
        }

        return $this->getRelation($model)->select('id', 'name')->get()->map(function (Model $value) {
            return [
                'value' => $value->id,
                'text' => $value->name,
            ];
        });
    }

    public function prepareUserValue($values, $getValue = null)
    {
        $data = null;
        if (! empty($values)) {
            if ($this->isLocalMode()) {
                $data = implode(',', $values);
            } else {
                $data = [];
                foreach ($values as $value) {
                    if (is_array($value)) {
                        $data[] = $value['value'];
                    } else {
                        $data[] = $value;
                    }
                }
            }
        }

        return parent::prepareUserValue($data, $getValue);
    }
}
