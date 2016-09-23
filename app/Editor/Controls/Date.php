<?php

namespace DJEM\Editor\Controls;

class Date extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.date');
    }

    public function prepareUserValue($value, $getValue = null)
    {
        if (empty($value)) {
            $value = null;
        }

        return parent::prepareUserValue($value, $getValue);
    }
}
