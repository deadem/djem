<?php

namespace DJEM\Editor\Controls;

use DJEM\Editor\Items;

class Layout extends Item
{
    private $items = null;

    public function __construct($value = null)
    {
        parent::__construct($value);

        if ($value) {
            $this->setProperty('layout', $value);
        }
    }

    public function items(\Closure $callback)
    {
        $this->items = new Items($callback);

        return $this;
    }

    public function getItems()
    {
        return ($this->items) ? $this->items->getItems() : null;
    }

    public function title($value)
    {
        $this->setProperty('title', $value);

        return $this;
    }

    public function flex($value)
    {
        $this->setProperty('flex', $value);

        return $this;
    }
}
