<?php

namespace App\Doctypes\Controls;

class Date extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addLayout()->items(function ($items) {
                $items->addDate('name')->label('Date')->validate('required');
            });

            $this->addHighlightedCode($items, __FILE__);
        });

        return $editor;
    }
}
