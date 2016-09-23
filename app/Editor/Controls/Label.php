<?php

namespace DJEM\Editor\Controls;

class Label extends Item
{
    public function __construct($text = null)
    {
        parent::__construct();

        $this->xtype('label');

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
