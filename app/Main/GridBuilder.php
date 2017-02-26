<?php

namespace DJEM\Main;

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
        $this->fields = new Fields($callback);

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

    public function getItems()
    {
        return $this->items;
    }

    public function getMetaData()
    {
        if ($this->custom) {
            return ['view' => 'custom', '_doctype' => $this->custom];
        }

        if (! $this->fields) {
            return [];
        }

        return $this->fields->getFields()->reduce(function ($data, $field) {
            $data['fields'][] = $field->field;
            if (! empty($field->column)) {
                $data['columns'][] = $field->column;

                if (empty($data['options']['title']) && ! empty($field->column['text'])) {
                    $data['options']['title'] = $field->field['name'];
                }
            }

            if (isset($field->title) && $field->title) {
                $data['options']['title'] = $field->field['name'];
            }

            return $data;
        }, [
            'fields' => [],
            'columns' => [],
            'options' => [],
        ]);
    }
}
