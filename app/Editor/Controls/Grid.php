<?php

namespace DJEM\Editor\Controls;

class Grid extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.grid.panel');
    }

    public function queryMode($value)
    {
        $this->setProperty('queryMode', $value);

        return $this;
    }

    public function columns($value)
    {
        $this->setProperty('columns', $value);

        return $this;
    }

    public function fields($fields)
    {
        $store = [
            'fields' => $fields,
        ];
        if (! empty($this->store)) {
            $store['data'] = $this->store;
        }
        $this->setProperty('store', $store);

        return $this;
    }

    public function store($value)
    {
        $this->store = $value;
        $this->queryMode('local');

        $store = $this->getProperty('store');
        if (! is_array($store)) {
            $store = [];
        }

        $store['data'] = $value;
        $this->setProperty('store', $store);

        return $this;
    }

    public function loadRelation($model)
    {
    }

    public function prepareUserValue($values, $getValue = null)
    {
        $values;

        return parent::prepareUserValue(null, $getValue);
    }
}
