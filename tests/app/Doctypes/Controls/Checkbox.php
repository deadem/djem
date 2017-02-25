<?php

namespace App\Doctypes\Controls;

class Checkbox extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addCheckbox('name')->label('Switch control');

            $this->addHighlightedCode($items, __FILE__);
        });

        return $editor;
    }
}
