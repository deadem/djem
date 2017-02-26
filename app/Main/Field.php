<?php

namespace DJEM\Main;

class Field
{
    public $field = [];
    public $column = [];

    private function field($name, $value)
    {
        $this->field[$name] = $value;

        return $this;
    }

    private function column($name, $value)
    {
        $this->column[$name] = $value;

        return $this;
    }

    public function __construct($name)
    {
        $this->field('name', $name);
    }

    public function text($text)
    {
        $this->column('hideable', false);
        $this->column('dataIndex', $this->field['name']);
        $this->column('text', $text);

        return $this;
    }

    public function mapping($value)
    {
        return $this->field('mapping', $value);
    }

    public function type($value)
    {
        return $this->field('type', $value);
    }

    public function xtype($value)
    {
        return $this->column('xtype', $value);
    }

    public function sortable($value)
    {
        return $this->column('sortable', $value);
    }

    public function flex($value)
    {
        return $this->column('flex', $value);
    }

    public function width($value)
    {
        return $this->column('width', $value);
    }

    public function title($value = true)
    {
        return $this->field('title', $value);
    }
}
