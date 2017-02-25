<?php

namespace App\Doctypes\Controls;

class Text extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addText('name')->label('Name')->validate('required|max:255');

            $this->addHighlightedCode($items, __FILE__);
        });

        return $editor;
    }
}
