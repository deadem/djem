<?php

namespace DJEM\Editor\Controls;

class Checkbox extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.checkbox');
    }
}
