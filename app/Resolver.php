<?php

namespace DJEM;

use Illuminate\Container\Container;

class Resolver
{
    protected $object;
    protected $container;

    public static function createInstance($type, $bindings = [])
    {
        $container = Container::getInstance();
        $container->bind(Container::class, function () use ($container) {
            return $container;
        });

        collect($bindings)->each(function ($closure, $name) use ($container) {
            $container->bind($name, $closure);
        });

        $class = get_called_class();

        return new $class($container->build($type), $container);
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
