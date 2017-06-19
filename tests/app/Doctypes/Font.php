<?php

namespace App\Doctypes;

use View;
use DJEM\Main\Grid;
use DJEM\Editor\Control;

class Font extends \DJEM\Doctype
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
            'view' => $editor->getView(),
        ];
    }

    public function editor()
    {
        $editor = parent::editor();

        $editor->create(Control::hlayout()->items([
            Control::staticHtml($this->font())->flex(1),
        ]));

        return $editor;
    }

    public function font()
    {
        return View::make('djem.font')->render();
    }
}
