<?php

namespace DJEM;

use \Illuminate\Database\Eloquent\Relations;
use Input;

class EditorSaveFields
{
    private $model = null;
    private $doctype = null;

    public function __construct($doctype, $model)
    {
        $this->doctype = $doctype;
        $this->model = $model;
    }

    public function model()
    {
        return $this->model;
    }

    private function ensureModelIdExists()
    {
        if (!$this->model->id) {
            $this->model->save();
        }
    }

    public function relations()
    {
        $this->ensureModelIdExists();
        foreach (func_get_args() as $field) {
            $this->updateRelation($field);
        }
        return $this;
    }

    public function images($field, $callable = null)
    {
        $this->ensureModelIdExists();
        $this->uploadFile($field, $callable);
    }

    public function files($field, $callable = null)
    {
        $this->ensureModelIdExists();
        foreach (func_get_args() as $field) {
            $this->uploadFile($field, $callable);
        }
    }

    private function uploadFile($field, $callable)
    {
        $fieldValue = Input::get($field);
        if ($fieldValue !== null && is_array($fieldValue)) {
            $filename = array_shift($fieldValue);

            if (isset($filename['file']) || empty($filename)) {
                $this->model->{$field}()->detach();
            }
            if (isset($filename['file'])) {
                $this->model->{$field}()->attach($callable($filename, $field));
            }
        }
    }

    private function updateRelation($field)
    {
        $fieldValue = Input::get($field);
        if ($fieldValue !== null) {
            $collection = $this->model->{$field}();

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
