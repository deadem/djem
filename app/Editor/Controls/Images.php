<?php

namespace DJEM\Editor\Controls;

use DJEM\Editor;
use Illuminate\Database\Eloquent\Model;

class Images extends Control
{
    use Traits\File;

    private $images = [];
    private $action = null;

    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.images');
    }

    public function images($images)
    {
        if (is_array($images)) {
            $this->images = $images;
        } else {
            $this->images = func_get_args();
        }

        return $this;
    }

    public function onSaveImages(\Closure $callable)
    {
        if (is_callable($callable)) {
            $this->action = $callable;
        }

        return $this;
    }

    public function loadRelation($model)
    {
        $relation = $this->getRelation($model);
        $image = false;
        if (is_array($this->images) && ! empty($this->images)) {
            $image = array_values($this->images)[0];
            $relation->with($image);
        }
        $models = $relation->get();
        $controls = false;
        if ($this->editor) {
            $this->editor->loadModel($relation->getRelated());
            $controls = $this->editor->getControls();

            $models->transform(function (Model $model) use ($image, $controls) {
                $data = $model->getAttributes();

                foreach ($controls as $field => $control) {
                    if ($this->editor->isRelation($field)) {
                        $data[$field] = $control->loadRelation($model);
                    } elseif ($control->hasCustomValue()) {
                        $data[$field] = $control->getCustomValue($model);
                    }
                }

                if ($image && $model->{$image}) {
                    // если есть картинка, добавим её неперекрывающиеся свойства в контроль
                    $image = $model->{$image};
                    $data += $image->getAttributes();
                }

                return (object) $data;
            });
        }

        return $models;
    }

    public function prepareUserValue($values, $getValue = null)
    {
        $data = [];
        if ($this->action) {
            $values = call_user_func($this->action, $values);
        }
        foreach ($values as $i => $value) {
            $relation = call_user_func($getValue->relation, $this->getName());

            if (isset($value['file'])) {
                // если указан файл - это новая картинка, загружаем
                $value['file'] = $this->normalizeImageExtension($this->getFilePath($value['file']));

                if (empty($this->images)) {
                    $model = call_user_func($getValue->model, $this->getName());
                    $model = $this->createImage($value, $model, $this->getName(), $getValue);
                } else {
                    $model = $relation->getRelated();
                    $model = new $model();
                    foreach ($this->images as $image) {
                        $this->createImage($value, $model, $image, $getValue);
                    }
                }
            } else {
                // если файл не указан, значит нужно обновить данные уже подцепленной картинки
                $model = $relation->find($value['id']);
            }

            if (! empty($this->images)) {
                foreach ($value as $key => $var) {
                    if ($model->isFillable($key)) {
                        $model->fill([$key => $var]);
                    }
                }
            }

            $data[] = $model;

            if ($this->editor) {
                $this->onSave(function () use ($model, $value) {
                    $this->editor->putData($model, $value);
                });
            }
        }

        return $this->setUserValue($data);
    }

    private function createImage($value, &$model, $field, $getter)
    {
        $image = null;
        if (method_exists($model, $field) && is_callable($this->saveHandler)) {
            $relation = call_user_func([$model, $field]);

            $image = $relation->getRelated();
            $image = call_user_func($this->saveHandler, $value, $image, $getter);
            if ($image) {
                $image->save();
            }
            $this->attachToRelation($relation, $image);
        }

        return $image;
    }

    public function putRelatedData($model)
    {
        foreach ($this->getUserValue() as $value) {
            if ($this->associate) {
                call_user_func([$value, $this->associate])->associate($model);
            }
            $value->save();
        }

        return $this;
    }
}
