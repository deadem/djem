<?php

namespace App\Doctypes;

use DJEM\Editor\Control;
use DJEM\Main\Grid;
use View;

class Colors extends \DJEM\Doctype
{
    public function grid()
    {
        return Grid::custom($this);
    }

    public function load()
    {
        $editor = $this->editor();

        return [
            'data' => '',
            'code' => View::make('djem.colors-js')->render(),
            'view' => $editor->getView(),
        ];
    }

    public function editor()
    {
        $editor = parent::editor();

        $editor->create(Control::hlayout()->items([
            Control::staticHtml($this->colors())->flex(1),
        ]));

        return $editor;
    }

    public function colors()
    {
        return View::make('djem.colors')->render();
    }
}
