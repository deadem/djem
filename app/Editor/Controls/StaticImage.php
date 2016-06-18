<?php

namespace DJEM\Editor\Controls;

class StaticImage extends Item
{
    public function __construct()
    {
        parent::__construct();

        $this->xtype('image');
        return $this;
    }
}
