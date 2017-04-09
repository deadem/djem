<?php

namespace DJEM\Editor\Controls;

use DJEM\Editor\Items;

class Panel extends Item
{
    private $items = null;

    public function __construct($value = null)
    {
        parent::__construct($value);
        $this->align('stretch');

        $this->setProperty('autoScroll', true);
    }

    public function items($items)
    {
        $this->items = new Items();

        $addItems = function ($items) use (&$addItems) {
            if (is_array($items)) {
                foreach ($items as $item) {
                    $addItems($item);
                }

                return;
            }
            $this->items->add($items);
        };

        $addItems($items);

        return $this;
    }

    public function getItems()
    {
        return ($this->items) ? $this->items->getItems() : null;
    }

    public function flex($value)
    {
        $this->setProperty('flex', $value);

        return $this;
    }

    public function align($value)
    {
        $this->setProperty('align', $value);
    }
}
