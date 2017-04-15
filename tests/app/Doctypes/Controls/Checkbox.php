<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class Checkbox extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        return parent::editor()->create(
            Control::vlayout()->items([
                Control::checkbox('name')->label('Switch control'),

                $this->addHighlightedCode(__FILE__),
            ])
        );
    }
}
