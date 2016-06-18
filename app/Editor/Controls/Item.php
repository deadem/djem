<?php

namespace DJEM\Editor\Controls;

use BadMethodCallException;
use ReflectionClass;

class Item
{
    protected $bind = false;
    protected $properties = [];
    protected $customValue = null;
    protected $editor = null;

    public function __construct($value = null)
    {
        $value; // not used
    }

    public static function createControl($name, $args)
    {
        $name = '\\DJEM\\Editor\\Controls\\'.$name;
        if (class_exists($name)) {
            $object = new ReflectionClass($name);
            return $object->newInstanceArgs($args);
        }

        throw new BadMethodCallException('Can\'t create class '.$name);
    }

    protected function setProperty($name, $value)
    {
        $this->properties[$name] = $value;

        return $this;
    }

    protected function getProperty($name, $model = null)
    {
        if (!isset($this->properties[$name])) {
            return null;
        }

        $value = $this->properties[$name];

        if (is_subclass_of($value, self::class) && is_callable($value)) {
            $value = call_user_func($value, $model);
        }

        return $value;
    }

    public function getProperties($model)
    {
        $model; // unused variable

        $properties = [];
        foreach ($this->properties as $key => $value) {
            $properties[$key] = $this->getProperty($key, $model);
        }

        return $properties;
    }

    public function editor(\Closure $editor)
    {
        $this->editor = new Editor($editor);
        $this->setProperty('editor', $this->editor);

        return $this;
    }

    public function bind($name = null)
    {
        $this->bind = ($name) ?: true;

        return $this;
    }

    public function getBind()
    {
        if ($this->bind === true) {
            return (isset($this->properties['name'])) ? '{'.$this->properties['name'].'}' : null;
        }

        return $this->bind;
    }

    public function getItems()
    {
        return false;
    }

    public function __call($name, $values)
    {
        $methods = [ 'xtype', 'style', 'height', 'width', 'flex', 'title', 'reference', 'cls' ];
        if (!in_array($name, $methods)) {
            throw new BadMethodCallException('Call to undefined method '.get_class($this).'::'.$name);
        }
        $this->setProperty($name, $values[0]);

        return $this;
    }

    public function hidden($mode = true)
    {
        $this->setProperty('hidden', $mode);

        return $this;
    }

    public function readOnly($mode = true)
    {
        $this->setProperty('readOnly', $mode);

        return $this;
    }

    public function value($value)
    {
        $this->customValue = $value;
    }

    public function hasCustomValue()
    {
        return $this->customValue !== null;
    }

    public function getCustomValue($model)
    {
        if (is_callable($this->customValue)) {
            return call_user_func($this->customValue, $model, $this->getName());
        }

        return $this->customValue;
    }
}
