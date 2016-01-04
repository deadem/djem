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
            $this->updateRelation($field, Input::get($field));
        }
        return $this;
    }

    public function deleteMissed($field, $id = 'id', $callable = null)
    {
        $ids = [];

        $fieldValue = Input::get($field);
        if ($fieldValue !== null) {
            if (!is_array($fieldValue)) {
                $fieldValue = [ $fieldValue ];
            }
            foreach ($fieldValue as $value) {
                if (is_array($value) && isset($value[$id])) {
                    $ids[] = $value[$id];
                } elseif (is_object($value)) {
                    $ids[] = $value->id;
                }
            }
            $collection = $this->model->{$field}()->whereNotIn($id, $ids);
            if ($callable) {
                $collection = $callable($collection);
            }
            $collection->delete();
        }
        return $this;
    }

    public function image($field, $callable = null)
    {
        $this->ensureModelIdExists();
        $this->uploadFile($field, $callable, true);
        return $this;
    }

    public function images($field, $callable = null)
    {
        $this->ensureModelIdExists();
        $this->deleteMissed($field);
        $this->uploadFile($field, $callable, false);
        return $this;
    }

    public function file($field, $callable = null)
    {
        $this->ensureModelIdExists();
        $this->uploadFile($field, $callable, true);
        return $this;
    }

    public function files($field, $callable = null)
    {
        $this->ensureModelIdExists();
        $this->deleteMissed($field);
        $this->uploadFile($field, $callable, false);
        return $this;
    }

    private function uploadFile($field, $callable, $onlyOne)
    {
        $fieldValue = Input::get($field);
        if ($fieldValue !== null && is_array($fieldValue)) {
            foreach ($fieldValue as $filename) {
                if ($onlyOne && (isset($filename['file']) || empty($filename))) {
                    $this->model->{$field}()->detach();
                }
                if (isset($filename['file'])) {
                    $this->updateRelation($field, $callable($filename, $field));
                }

                if ($onlyOne) {
                    break;
                }
            }
        }
    }

    private function updateRelation($field, $fieldValue)
    {
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
