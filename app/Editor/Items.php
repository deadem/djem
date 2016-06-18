<?php

namespace DJEM\Editor;

use DJEM\Editor\Controls;
use BadMethodCallException;

class Items
{
    private $items = [];

    public function __construct(\Closure $callback)
    {
        $callback($this);
    }

    public function add(Controls\Item $item)
    {
        $this->items[] = $item;

        return $this;
    }

    public function getItems()
    {
        return $this->items;
    }

    private function addControl(Controls\Item $item)
    {
        $this->items[] = $item;
        return $item;
    }

    public function __call($name, $args)
    {
        if (!preg_match('/^add/', $name)) {
            throw new BadMethodCallException('Call to undefined method '.get_class($this).'::'.$name);
        }

        $className = preg_replace('/^add/', '', $name);
        return $this->addControl(Controls\Item::createControl($className, $args));
    }
}
