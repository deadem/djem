<?php

namespace DJEM;

use \Illuminate\Container\Container;

class Resolver
{
    protected $object;
    protected $container;

    public function __construct()
    {
        $this->container = new Container;

        $parameters = func_get_args();
        $this->object = array_shift($parameters);

        $parameters = array_shift($parameters);
        if ($parameters) {
            foreach ($parameters as $key => $value) {
                $this->container->bind($key, $value);
            }
        }
    }

    public function __call($name, $arguments)
    {
        return $this->container->call([ $this->object, $name ], $arguments);
    }
}
