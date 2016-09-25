<?php

namespace DJEM;

use Illuminate\Container\Container;

class DoctypeResolver extends Resolver
{
    public static function createDoctype($doctype, $bindings = [])
    {
        $container = Container::getInstance();
        $container->bind(Container::class, function () use ($container) {
            return $container;
        });

        collect($bindings)->each(function ($closure, $name) use ($container) {
            $container->bind($name, $closure);
        });

        return new self($container->build($doctype), $container);
    }

    public function controller()
    {
        $controller = $this->__call('controller', func_get_args());
        $resolver = new Resolver($this->container->build($controller), $this->container);

        return $resolver;
    }
}
