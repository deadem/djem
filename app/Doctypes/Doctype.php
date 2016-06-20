<?php

namespace App\Doctypes;

class Doctype extends \DJEM\Doctype
{
    /**
     * Модель, отображением которой занимается тип
     *
     * @var class
     */
    public $model = null;

    public function controller()
    {
        return;
    }
}
