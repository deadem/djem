<?php

namespace DJEM\Main;

class Fields
{
    private $fields = [];

    public function __construct(\Closure $callback)
    {
        $callback($this);
    }

    private function addField(Field $field)
    {
        $this->fields[] = $field;

        return $field;
    }

    public function field($name)
    {
        return $this->addField(new Field($name));
    }

    public function getFields()
    {
        return collect($this->fields);
    }

    public function merge(Fields $fields)
    {
        foreach ($fields->getFields() as $field) {
            $this->field($field);
        }
    }
}
