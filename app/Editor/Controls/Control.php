<?php

namespace DJEM\Editor\Controls;

use Illuminate\Database\Eloquent\Relations;

class Control extends Item
{
    private $validation = false;
    private $userValue = null;
    protected $saveHandler = null;
    protected $associate = null;

    protected function __construct($name = null)
    {
        parent::__construct($name);

        if ($name) {
            $this->name($name);
        }

        $this->bind = true;
    }

    public function name($value)
    {
        $this->setProperty('name', $value);

        return $this;
    }

    public function getName()
    {
        return $this->getProperty('name');
    }

    public function associate($field)
    {
        $this->associate = $field;

        return $this;
    }

    public function label($value)
    {
        $this->setProperty('fieldLabel', $value);

        return $this;
    }

    public function store($value)
    {
        $this->setProperty('store', $value);

        return $this;
    }

    public function validate($value)
    {
        $this->validation = $value;

        return $this;
    }

    public function getValidationRule()
    {
        return $this->validation;
    }

    public function initControl($controls)
    {
        $controls; // не используется
    }

    protected function getRelation($model)
    {
        $field = $this->getName();
        return $model->{$field}();
    }

    protected function detachRelation($relation, $field)
    {

    }

    protected function attachToRelation($relation, $value)
    {
        switch (get_class($relation)) {
            case Relations\BelongsToMany::class:
            case Relations\MorphToMany::class:
                $relation->attach($value);
                break;

            case Relations\BelongsTo::class:
                $relation->associate($value);
                break;

            default:
                // неизвестный relation
                break;
        }

        return $this;
    }

    public function prepareUserValue($value, $getter = null)
    {
        if (is_callable($this->saveHandler)) {
            $relation = call_user_func($getter->relation, $this->getName());
            if ($relation) {
                $value = call_user_func($this->saveHandler, $value, $relation->getRelated(), $getter);
            }
        }

        return $this->setUserValue($value);
    }

    protected function setUserValue($value)
    {
        $this->userValue = $value;

        return $this;
    }

    public function getUserValue()
    {
        return $this->userValue;
    }

    public function putRelatedData($model)
    {
        if ($this->associate) {
            $value = $this->getUserValue();
            if (is_object($value)) {
                call_user_func([ $value, $this->associate ])->associate($model);
                $value->save();
            }
        }
        return $this;
    }

    public function save(\Closure $callable)
    {
        $this->saveHandler = $callable;

        return $this;
    }
}
