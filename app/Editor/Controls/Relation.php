<?php

namespace DJEM\Editor\Controls;

class Relation extends Control
{
    private $parent;
    public function __construct($parent, $name = null)
    {
        parent::__construct($name);

        $this->parent = $parent;
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
