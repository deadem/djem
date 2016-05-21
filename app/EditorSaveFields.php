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

    private function set($field, $value)
    {
        $this->input[$field] = $value;
        return $this;
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

    public function html($fields, $callable)
    {
        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [ $fields ];
        }
        foreach ($fields as $field => $relation) {
            $this->model->{$field} = preg_replace_callback('/(<img.*?src=\s*([\'"]))(.*?)(\\2)/is', function ($matches) use ($field, $relation, $callable) {
                if (preg_match('/^blob:http.*?#(.+)$/i', $matches[3], $urls)) {
                    $value = $callable([ 'file' => $urls[1] ], $this->model->{$relation}()->getRelated());
                    if ($value) {
                        $this->updateRelation($relation, $value);
                        return $matches[1].htmlentities($value->url).$matches[4];
                    }
                }
                return $matches[0];
            }, $this->model->{$field});
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

    public function imageCopy($fields, $callable = null)
    {
        $referenceValue = null;

        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [ $fields ];
        }
        foreach ($fields as $field) {
            $fieldValue = $this->get($field);
            $hasImage = false;
            if ($fieldValue !== null && is_array($fieldValue)) {
                foreach ($fieldValue as $filename) {
                    if (isset($filename['file']) && !empty($filename['file'])) {
                        if (!$referenceValue) {
                            $referenceValue = $fieldValue;
                        }
                        $hasImage = true;
                    }
                }
            }
            if (!$hasImage && !$this->model()->{$field}()->first()) {
                // если картинки ещё нет - добавим копию
                $this->set($field, $referenceValue);
            }
        }
        return $this->image($fields, $callable);
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
                    $value = $callable($filename, $this->model->{$field}()->getRelated());
                    if (!empty($value)) {
                        $this->updateRelation($field, $value);
                    }
                }

                if ($onlyOne) {
                    break;
                }
            }
        }
    }

    public function images($fields, $callable = null)
    {
        $this->ensureModelIdExists();
        if (!is_array($fields)) {
            $fields = [ $fields ];
        }
        foreach ($fields as $field) {
            $this->deleteMissed($field);
            $this->uploadFiles($field, $callable, false);
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
            $this->uploadFiles($field, $callable, false);
        }
        return $this;
    }

    private function uploadFiles($field, $callable, $onlyOne)
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
                if (is_callable($callable)) {
                    $callable($filename);
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
                if (!empty($fieldValue)) {
                    $collection->associate($fieldValue);
                }
                break;

            default:
                dd('Unknown relation: '.get_class($collection));
                break;
        }
        return $this;
    }
}
