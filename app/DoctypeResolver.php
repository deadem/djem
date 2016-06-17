<?php

namespace DJEM;

class DoctypeResolver extends Resolver
{
    public function controller()
    {
        $controller = $this->__call('controller', []);
        $resolver = new Resolver($this->container->build($controller), $this->container);
        return $resolver;
    }
}
