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

    public function store($value)
    {
        parent::store($value);
        $this->queryMode('local');

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
