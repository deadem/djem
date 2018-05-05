<?php

namespace DJEM\Editor\Controls;

class Button extends Control
{
    public function __construct($text = null)
    {
        parent::__construct();

        $this->xtype('button');

        if ($text) {
            $this->text($text);
        }

        return $this;
    }

    public function text($value)
    {
        return $this->setProperty('text', $value);
    }
}
