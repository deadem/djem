<?php

namespace DJEM\Editor\Controls;

class Text extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.text');
    }
}
