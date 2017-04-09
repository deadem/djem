<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class TextArea extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->create(Control::vlayout()->items([
            Control::textArea('name')->label('Name')->validate('required|max:255'),

            $this->addHighlightedCode(__FILE__),
        ]));

        return $editor;
    }
}
