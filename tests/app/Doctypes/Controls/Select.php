<?php

namespace App\Doctypes\Controls;

class Select extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            // addCombobox() is an alias for addSelect()
            $items->addSelect('name')->label('Name')->forceSelection(false)->store([
                'One',
                'Two',
                'Three',
            ])->validate('required');

            $this->addHighlightedCode($items, __FILE__);
        });

        return $editor;
    }
}
