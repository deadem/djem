<?php

namespace DJEM\Editor\Controls;

class TextArea extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('textarea');
    }
}
