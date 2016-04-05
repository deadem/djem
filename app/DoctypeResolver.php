<?php

namespace DJEM;

class DoctypeResolver extends Resolver
{
    public function controller()
    {
        $resolver = new Resolver(new $this->object->controller);
        $resolver->container = $this->container;
        return $resolver;
    }
}
