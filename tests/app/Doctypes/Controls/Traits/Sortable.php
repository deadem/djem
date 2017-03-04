<?php

namespace App\Doctypes\Controls\Traits;

trait Sortable
{
    public function rearrange($field)
    {
        return function ($list) use ($field) {
            foreach ($list as $key => &$value) {
                $value[$field] = $key;
            }

            return $list;
        };
    }
}
