<?php

namespace DJEM\Editor\Controls;

class Hidden extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);
        $this->bind(false);
    }
}
