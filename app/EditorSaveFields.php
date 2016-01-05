<?php

namespace DJEM;

use \Illuminate\Database\Eloquent\Relations;
use Illuminate\Support\Collection;

class EditorSaveFields
{
    private $model = null;
    private $doctype = null;
    private $input = null;

    public function __construct($doctype, $model, $input)
    {
        $this->doctype = $doctype;
        $this->model = $model;
        $this->input = $input;
    }

    private function get($field)
    {
        if (isset($this->input[$field])) {
            return $this->input[$field];
        }
        return null;
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
            $this->updateRelation($field, $this->get($field));
        }
        return $this;
    }

    public function deleteMissed($field, $id = 'id', $callable = null)
    {
        $ids = [];

        $fieldValue = $this->get($field);
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

    public function image($fields, $callable = null)
    {
        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [ $fields ];
        }
        foreach ($fields as $field) {
            $this->uploadFile($field, $callable, true);
        }
        return $this;
    }

    public function images($fields, $callable = null)
    {
        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [ $fields ];
        }
        foreach ($fields as $field) {
            $this->deleteMissed($field);
            $this->uploadFile($field, $callable, false);
        }
        return $this;
    }

    public function file($fields, $callable = null)
    {
        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [ $fields ];
        }
        foreach ($fields as $field) {
            $this->uploadFile($field, $callable, true);
        }
        return $this;
    }

    public function files($fields, $callable = null)
    {
        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [ $fields ];
        }
        foreach ($fields as $field) {
            $this->deleteMissed($field);
            $this->uploadFile($field, $callable, false);
        }
        return $this;
    }

    private function uploadFile($field, $callable, $onlyOne)
    {
        $fieldValue = $this->get($field);
        if ($fieldValue !== null && is_array($fieldValue)) {
            if ($onlyOne && empty($fieldValue)) {
                $this->model->{$field}()->detach();
            }
            foreach ($fieldValue as $filename) {
                if ($onlyOne && isset($filename['file'])) {
                    $this->model->{$field}()->detach();
                }
                $this->updateRelation($field, $callable($filename, isset($filename['file']), $field));

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
                        $values = (new Collection($fieldValue))->map(function ($item) {
                            if (is_array($item) && isset($item['value'])) {
                                return $item['value'];
                            }
                            return $item;
                        })->unique();
                        foreach ($values as $value) {
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
