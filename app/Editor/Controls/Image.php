<?php

namespace DJEM\Editor\Controls;

class Image extends Control
{
    use Traits\File;

    private $copy = [];
    private $images = [];

    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.image');
    }

    public function getProperties($model)
    {
        $properties = parent::getProperties($model);

        if ($this->bind === true) {
            $related = call_user_func([$model, $this->getProperty('name')])->getRelated();
            $properties = array_merge([
                'height' => $related->height,
                'width' => $related->width,
                'modelHeight' => $related->height,
                'modelWidth' => $related->width,
            ], $properties);

            if ($related->height && $related->width) {
                $properties = ['items' => [$properties]];
            }
        }

        return $properties;
    }

    public function copyFrom($field)
    {
        $this->copy[] = $field;

        return $this;
    }

    public function images($images)
    {
        if (! is_array($images)) {
            $images = func_get_args();
        }

        $this->images = [];

        foreach ($images as $image) {
            $this->images[] = new Relation($image);
        }

        return $this;
    }

    public function getItems()
    {
        return $this->images;
    }

    public function getViewItems()
    {
        return false;
    }

    public function initControl($controls)
    {
        $this->copy = $this->getCopyFields($controls);
    }

    public function getCopyFields($controls, &$objects = [])
    {
        // защитимся от циклических ссылок внутри copyFrom
        if (in_array($this->getName(), $objects)) {
            return [];
        }
        $objects[] = $this->getName();

        $copy = $this->copy;
        foreach ($this->copy as $field) {
            $copy = array_merge($copy, $controls->get($field)->getCopyFields($controls, $objects));
        }

        return $copy;
    }

    public function prepareUserValue($value, $getValue = null)
    {
        if (is_array($value)) {
            $value = array_shift($value);
        }

        if (empty($value)) {
            foreach ($this->copy as $field) {
                $parentValue = call_user_func($getValue->field, $field);
                if (is_array($parentValue)) {
                    $parentValue = array_shift($parentValue);
                }
                if (! empty($parentValue) && isset($parentValue['file'])) {
                    $value = $parentValue;
                    break;
                }
            }
        }

        if (! empty($value)) {
            if (isset($value['file'])) {
                // если указан файл - это новая картинка, загружаем
                $value['file'] = $this->normalizeImageExtension($this->getFilePath($value['file']));

                foreach ($this->images as $image) {
                    $image->setUserValue($this->prepareUserSaveValue($value, $image->getName(), $getValue));
                }

                parent::prepareUserValue($value, $getValue);
                $this->getUserValue()->save();

                return $this;
            }
            // если файл не указан, значит нужно обновить данные уже подцепленной картинки
            foreach ($this->images as $image) {
                $relation = call_user_func($getValue->relation, $image->getName());
                $image->setUserValue($relation->first());
            }

            $relation = call_user_func($getValue->relation, $this->getName());

            return $this->setUserValue($relation->first());
        }

        return $this;
    }

    public function loadRelation($model)
    {
        return $this->getRelation($model)->first();
    }
}
