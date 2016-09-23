<?php

namespace DJEM\Editor\Controls;

class StaticHtml extends Item
{
    public function __construct($html = null)
    {
        parent::__construct();

        if ($html) {
            $this->html($html);
        }

        return $this;
    }

    public function html($value)
    {
        return $this->setProperty('html', $value);
    }
}
