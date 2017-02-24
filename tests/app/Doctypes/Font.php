<?php

namespace App\Doctypes;

use Illuminate\Http\Request;
use View;

class Font extends \DJEM\Doctype
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function grid()
    {
        return [
            'metaData' => ['view' => 'custom', '_doctype' => self::class],
        ];
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

        $editor->createLayout(['type' => 'hbox', 'align' => 'stretch'])->items(function ($items) {
            $items->addStaticHtml($this->font())->flex(1);
        });

        return $editor;
    }

    public function font()
    {
        return View::make('djem.font')->render();
    }
}
