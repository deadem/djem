<?php

namespace DJEM;

use Input;

class EditorSaveFields
{
    private $model = null;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function model()
    {
        return $this->model;
    }

    public function fields()
    {
        foreach (func_get_args() as $field) {
            $this->updateRelation($field);
        }
        return $this;
    }

    private function updateRelation($field)
    {
        $fieldValue = Input::get($field);
        if ($fieldValue !== null) {
            $collection = $this->{$field}();

            switch (get_class($collection)) {
                case Relations\BelongsToMany::class:
                case Relations\MorphToMany::class:
                    $collection->detach();

                    if (is_array($fieldValue)) {
                        foreach (array_unique($fieldValue) as $value) {
                            $collection->attach($value);
                        }
                    } elseif (!empty($fieldValue)) {
                        $collection->attach($fieldValue);
                    }
                    break;

                case Relations\BelongsTo::class:
                    $collection->associate($fieldValue);
                    break;

                default:
                    dd('Unknown relation: '.get_class($collection));
                    break;
            }
        }
        return $this;
    }
}
