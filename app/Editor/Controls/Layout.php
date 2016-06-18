<?php

namespace DJEM\Editor\Controls;

use DJEM\Editor\Items;

class Layout extends Panel
{
    public function __construct($value = null)
    {
        parent::__construct($value);

        if ($value) {
            $this->setProperty('layout', $value);
        }
    }

    public function title($value)
    {
        $this->setProperty('title', $value);

        return $this;
    }
}
