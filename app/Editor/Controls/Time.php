<?php

namespace DJEM\Editor\Controls;

class Time extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('time');
    }

    public function increment($value)
    {
        return $this->setProperty('increment', $value);
    }
}
