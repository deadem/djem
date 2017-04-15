<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class StaticHtml extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        return parent::editor()->create(
            Control::vlayout()->items([
                Control::staticHtml('<b>Static html content</b><p>Text content</p>'),

                $this->addHighlightedCode(__FILE__),
            ])
        );
    }
}
