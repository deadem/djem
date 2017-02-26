<?php

namespace App\Doctypes;

use DJEM\Main\Grid;

class StartPage extends \DJEM\Doctype
{
    public function grid()
    {
        return Grid::fields(function ($fields) {
            $fields->field('id');
            $fields->field('_doctype');
            $fields->field('name')->text('Control name')->flex(1);
        })->items([
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
    }
}
