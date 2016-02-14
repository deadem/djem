<?php

namespace DJEM;

use \Illuminate\Database\Eloquent\Relations;
use Illuminate\Support\Collection;

class EditorSaveFields
{
    private $model = null;
    private $doctype = null;
    private $input = null;
    private $url = null;

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

    public function url($fields)
    {
        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [
                'url' => $fields
            ];
        }
        $fields = array_merge($fields, [
            'refid' => $this->model->id,
            'doctype' => get_class($this->doctype),
            'model' => get_class($this->model)
        ]);
        $url = $this->model->url()->first();
        if (!$url) {
            $model = $this->model->url()->getRelated();
            $url = new $model;
        }
        foreach ($fields as $key => $value) {
            $url->{$key} = $value;
        }
        $url->save();
        return $this;
    }

    private function ensureModelIdExists()
    {
        if (!$this->model->id) {
            $this->model->save();
        }
    }

    public function relations()
    {
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
                $this->detachRelation($this->model->{$field}());
            }
            foreach ($fieldValue as $filename) {
                if ($onlyOne && isset($filename['file'])) {
                    $this->detachRelation($this->model->{$field}());
                }
                if (isset($filename['file'])) {
                    // если переменная указана - это новый файл, который нужно подключить
                    $this->updateRelation($field, $callable($filename, $this->model->{$field}()->getRelated()));
                }

                if ($onlyOne) {
                    break;
                }
            }
        }
    }

    private function detachRelation($relation)
    {
        switch (get_class($relation)) {
            case Relations\BelongsToMany::class:
            case Relations\MorphToMany::class:
                $relation->detach();
                break;

            case Relations\BelongsTo::class:
                $relation->dissociate();
                break;

            default:
                dd('Unknown relation: '.get_class($relation));
                break;
        }
    }

    private function updateRelation($field, $fieldValue)
    {
        if ($fieldValue === null) {
            return $this;
        }
        $collection = $this->model->{$field}();
        $this->detachRelation($collection);

        switch (get_class($collection)) {
            case Relations\BelongsToMany::class:
            case Relations\MorphToMany::class:
                $this->ensureModelIdExists();
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
        return $this;
    }
}
