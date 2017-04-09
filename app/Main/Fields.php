<?php

namespace DJEM\Main;

class Fields
{
    private $fields = [];

    public function addField(Field $field)
    {
        $this->fields[] = $field;

        return $field;
    }

    public function getFields()
    {
        return collect($this->fields);
    }
}
