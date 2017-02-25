<?php

namespace App\Doctypes;

class StartPage extends \DJEM\Doctype
{
    public function gridItems()
    {
        $items = collect([
            ['name' => 'Button', '_doctype' => Controls\Button::class],
            ['name' => 'Checkbox', '_doctype' => Controls\Checkbox::class],
            ['name' => 'Date', '_doctype' => Controls\Date::class],
            ['name' => 'Grid remote', '_doctype' => Controls\GridRemote::class],
            ['name' => 'Grid local', '_doctype' => Controls\GridLocal::class],
            ['name' => 'Select', '_doctype' => Controls\Select::class],
            ['name' => 'StaticHtml', '_doctype' => Controls\StaticHtml::class],
            ['name' => 'Text', '_doctype' => Controls\Text::class],
            ['name' => 'TextArea', '_doctype' => Controls\TextArea::class],
        ]);

        return $items;
    }
}
