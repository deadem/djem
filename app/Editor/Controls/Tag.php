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
            $store = collect($this->getStore());

            $data = $this->getRelation($model)->get()->map(function (Model $value) use ($store) {
                $text = $value->name;

                $storeKey = $store->search(function ($item) use ($value) {
                    return $item['value'] == $value->name;
                });

                if ($storeKey !== false) {
                    $text = $store->get($storeKey)['text'];
                }

                return [
                    'value' => $value->name,
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
                $store = collect($this->getStore());

                $data = collect($values)->map(function ($value) use ($store) {
                    if ($store->search(function ($item) use ($value) {
                        return $item['value'] == $value;
                    }) !== false) {
                        return $value;
                    }
                })->filter(function ($value) {
                    return $value;
                });

                if ($relation) {
                    $related = $relation->getRelated();
                    $data = $data->map(function ($value) use ($related) {
                        $model = $related->where('name', '=', $value)->first();
                        if ($model) {
                            return $model;
                        }

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
