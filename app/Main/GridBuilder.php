<?php

namespace DJEM\Main;

use Illuminate\Support\Collection;

class GridBuilder extends \Illuminate\Support\Facades\Facade
{
    private $fields;
    private $items;
    private $custom;

    public function custom($class)
    {
        $this->custom = get_class($class);

        return $this;
    }

    public function fields(\Closure $callback)
    {
        if (! $this->fields) {
            $this->fields = new Fields($callback);
        } else {
            $this->fields->merge(new Fields($callback));
        }

        return $this;
    }

    public function items($items)
    {
        if (is_callable($items)) {
            $this->items = call_user_func($items);
        } else {
            $this->items = collect($items);
        }

        return $this;
    }

    private function getItems()
    {
        return $this->items;
    }

    private function getMetaData()
    {
        if ($this->custom) {
            return ['view' => 'custom', '_doctype' => $this->custom];
        }

        if (! $this->fields) {
            return [];
        }

        return $this->fields->getFields()->reduce(function ($data, Field $field) {
            $data['fields'][] = $field->field;
            if (! empty($field->column)) {
                $data['columns'][] = $field->column;

                if (empty($data['options']['title']) && ! empty($field->column['text'])) {
                    $data['options']['title'] = $field->field['name'];
                }
            }

            if (isset($field->field['title']) && $field->field['title']) {
                $data['options']['title'] = $field->field['name'];
            }

            return $data;
        }, [
            'fields' => [],
            'columns' => [],
            'options' => [],
        ]);
    }

    public function getData()
    {
        $metaData = $this->getMetaData();
        if (! isset($metaData['options'])) {
            $metaData['options'] = [];
        }

        $items = $this->getItems() ?: new Collection();
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

    public function __toString()
    {
        return json_encode($this->getData());
    }
}
