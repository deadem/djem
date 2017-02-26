<?php

namespace DJEM\Main;

class Grid extends \Illuminate\Support\Facades\Facade
{
    protected static function getFacadeAccessor()
    {
        return new GridBuilder();
    }
}
