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

            $data = collect($store)->map(function ($text, $value) use ($indexed) {
                return [
                    'value' => $indexed ? $text : $value,
                    'text' => $text,
                ];
            });
        } else {
            $data = $this->getRelation($model)->select('id', 'name')->get()->map(function (Model $value) {
                return [
                    'value' => $value->id,
                    'text' => $value->name,
                ];
            });
        }

        return collect(array_values($data->all()));
    }

    public function prepareUserValue($values, $getter = null, $relation = null)
    {
        $data = null;
        if (! empty($values)) {
            if ($this->isLocalMode()) {
                $store = $this->getStore();
                $indexed = array_keys($store) === range(0, count($store) - 1);

                $data = collect($values)->map(function ($value) use ($indexed, $store) {
                    if ($indexed) {
                        if (in_array($value, $store)) {
                            return $value;
                        }
                    } else {
                        if (isset($store[$value])) {
                            return $value;
                        }
                    }
                })->filter(function ($value) {
                    return $value;
                });

                if ($relation) {
                    $related = $relation->getRelated();
                    $data = $data->map(function ($value) use ($related) {
                        return new $related($value);
                    })->all();
                } else {
                    $data = $data->implode(',');
                }
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

        return parent::prepareUserValue($data, $getter);
    }
}
