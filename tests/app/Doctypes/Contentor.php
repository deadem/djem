<?php

namespace App\Doctypes;

use DJEM\Main\Grid;
use Illuminate\Http\Request;

class Contentor extends \DJEM\Doctype
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function grid()
    {
        return Grid::custom($this);
    }

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('hbox')->items(function ($items) {
            $items->addStaticHtml('<h1>ХУЙ!</h1>')->flex(1);
            $items->addItem('editor')->xtype('djem.contentor');
        });

        return $editor;
    }
}
