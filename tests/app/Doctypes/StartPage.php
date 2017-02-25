<?php

namespace App\Doctypes;

class StartPage extends \DJEM\Doctype
{
    public function gridItems()
    {
        $items = collect([
            ['name' => 'Button', '_doctype' => Controls\Button::class],
            ['name' => 'StaticHtml', '_doctype' => Controls\StaticHtml::class],
            ['name' => 'Text', '_doctype' => Controls\Text::class],
            ['name' => 'TextArea', '_doctype' => Controls\TextArea::class],
        ]);

        return $items;
    }
}
