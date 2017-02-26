<?php

namespace DJEM;

class Resolver
{
    protected $object;
    protected $container;

    public function getResolverObject()
    {
        return $this->object;
    }

    public function __construct($object, $container)
    {
        $this->object = $object;
        $this->container = $container;
    }

    public function __get($name)
    {
        return $this->object->$name;
    }

    public function __set($name, $value)
    {
        $this->object->$name = $value;
    }

    public function __call($name, $arguments)
    {
        return $this->container->call([$this->object, $name], $arguments);
    }
}
