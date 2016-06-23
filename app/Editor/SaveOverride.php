<?php

namespace DJEM\Editor;

class SaveOverride
{
    private $originalModel = null;
    private $saveCallback = null;

    public function __construct($model)
    {
        $this->originalModel = $model;
    }

    public function __set($name, $value)
    {
        $this->originalModel->{$name} = $value;

        return $this;
    }

    public function __get($name)
    {
        return $this->originalModel->{$name};
    }

    public function __call($name, $args)
    {
        return call_user_func_array([$this->originalModel, $name], $args);
    }

    public function saveHandler($saveCallback)
    {
        $this->saveCallback = $saveCallback;

        return $this;
    }

    public function isMethodExists($method)
    {
        return method_exists($this->originalModel, $method);
    }

    public function getOriginalModel()
    {
        return $this->originalModel;
    }

    public function save()
    {
        $saved = call_user_func_array([$this->originalModel, 'save'], func_get_args());
        if ($saved && $this->saveCallback) {
            call_user_func($this->saveCallback);
        }

        return $saved;
    }
}
