<?php

namespace DJEM\Editor\Controls;

class Tag extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.tag');
    }

    public function loadRelation($model)
    {
        return $this->getRelation($model)->select('id', 'name')->get()->map(function ($value) {
            return [
                'value' => $value->id,
                'text'  => $value->name
            ];
        });
    }

    public function prepareUserValue($values, $getValue = null)
    {
        $getValue; // unused

        $data = [];
        if (!empty($values)) {
            foreach ($values as $value) {
                if (is_array($value)) {
                    $data[] = $value['value'];
                } else {
                    $data[] = $value;
                }
            }
        }
        return $this->setUserValue($data);
    }
}
