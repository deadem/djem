<?php

namespace DJEM;

class Resolver
{
    protected $object;
    protected $container;

    public function __construct($object, $container)
    {
        $this->object = $object;
        $this->container = $container;
    }

    public function __call($name, $arguments)
    {
        return $this->container->call([ $this->object, $name ], $arguments);
    }
}
