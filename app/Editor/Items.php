<?php

namespace DJEM\Editor;

class Items
{
    private $items = [];

    public function getItems()
    {
        return $this->items;
    }

    public function add(Controls\Item $item)
    {
        $this->items[] = $item;

        return $item;
    }
}
