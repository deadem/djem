<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class Date extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        return parent::editor()->create(
            Control::vlayout()->items([
                Control::layout()->items([
                    Control::date('name')->label('Date')->validate('required'),
                ]),

                $this->addHighlightedCode(__FILE__),
            ])
        );
    }
}
