<?php

namespace DJEM\Editor\Controls;

class Tag extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.tag');
    }

    public function filterPickList($value)
    {
        $this->setProperty('filterPickList', $value);

        return $this;
    }

    public function queryMode($value)
    {
        $this->setProperty('queryMode', $value);
        
        return $this;
    }

    public function store($value)
    {
        parent::store($value);
        $this->queryMode('local');

        return $this;
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
        $data = null;
        if (!empty($values)) {
            if ($this->getProperty('queryMode') == 'local') {
                $data = implode(',', $values);
            } else {
                $data = [];
                foreach ($values as $value) {
                    if (is_array($value)) {
                        $data[] = $value['value'];
                    } else {
                        $data[] = $value;
                    }
                }
            }
        }

        return parent::prepareUserValue($data, $getValue);
    }
}
