<?php

namespace DJEM\Editor\Controls;

class Relation extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);
    }

    public function getProperties($model)
    {
        $model;

        return [];
    }

    public function getItems()
    {
        return false;
    }

    public function prepareUserValue($value, $getValue = null)
    {
        return $this;
    }

    public function loadRelation($model)
    {
        return $this->getRelation($model)->first();
    }
}
