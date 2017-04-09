<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class Select extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->create(Control::vlayout()->items([
            Control::select('name')->label('Name')->forceSelection(false)->store([
                'One',
                'Two',
                'Three',
            ])->validate('required'),

            $this->addHighlightedCode(__FILE__),
        ]));

        return $editor;
    }
}
