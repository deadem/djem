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
    private $saveCallbacks = [];

    public function __construct($value = null)
    {
        // not used
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

    protected function onSave($closure)
    {
        $this->saveCallbacks[] = $closure;
    }

    public function fireSaveEvent()
    {
        foreach ($this->saveCallbacks as $closure) {
            $closure();
        }

        if ($this->editor) {
            $this->editor->fireSaveEvent();
        }
    }

    protected function setProperty($name, $value)
    {
        $this->properties[$name] = $value;

        return $this;
    }

    protected function getProperty($name, $model = null)
    {
        if (! isset($this->properties[$name])) {
            return;
        }

        $value = $this->properties[$name];

        if (is_subclass_of($value, self::class) && is_callable($value)) {
            $value = call_user_func($value, $model);
        }

        return $value;
    }

    protected function removeProperty($name)
    {
        unset($this->properties[$name]);

        return $this;
    }

    public function getProperties($model)
    {
        $properties = [];
        foreach ($this->properties as $key => $value) {
            $properties[$key] = $this->getProperty($key, $model);
        }

        $bind = $this->getBind();
        if ($bind) {
            $properties['bind'] = $bind;
        }

        return $properties;
    }

    public function editor(\Closure $editor)
    {
        $this->editor = new Editor($editor);
        $this->setProperty('editor', $this->editor);

        return $this;
    }

    public function bind($name = true)
    {
        $this->bind = $name;

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

    public function getViewItems()
    {
        return $this->getItems();
    }

    public function __call($name, $values)
    {
        $methods = ['xtype', 'style', 'height', 'width', 'flex', 'title', 'reference', 'cls'];
        if (! in_array($name, $methods)) {
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

        return $this;
    }

    public function color($value)
    {
        $cls = $this->getProperty('cls') ? [$this->getProperty('cls')] : [];
        array_push($cls, 'color-'.$value);
        $this->setProperty('cls', implode(' ', $cls));

        return $this;
    }

    public function bgcolor($value)
    {
        $cls = $this->getProperty('cls') ? [$this->getProperty('cls')] : [];
        array_push($cls, 'bgcolor-'.$value);
        $this->setProperty('cls', implode(' ', $cls));

        return $this;
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
