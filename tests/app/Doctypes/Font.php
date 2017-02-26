<?php

namespace App\Doctypes;

use View;
use DJEM\Main\Grid;
use Illuminate\Http\Request;

class Font extends \DJEM\Doctype
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

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

        $editor->createLayout('hbox')->items(function ($items) {
            $items->addStaticHtml($this->font())->flex(1);
        });

        return $editor;
    }

    public function font()
    {
        return View::make('djem.font')->render();
    }
}
