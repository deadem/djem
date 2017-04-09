<?php

namespace App\Doctypes;

use DJEM\Main\Grid;

class StartPage extends \DJEM\Doctype
{
    public function grid()
    {
        return Grid::fields([
            Grid::field('id'),
            Grid::field('_doctype'),
            Grid::field('name')->text('Control name')->flex(1),
        ])->items([
            ['name' => 'Button', '_doctype' => Controls\Button::class],
            ['name' => 'Checkbox', '_doctype' => Controls\Checkbox::class],
            ['name' => 'Date', '_doctype' => Controls\Date::class],
            ['name' => 'Grid local', '_doctype' => Controls\GridLocal::class],
            ['name' => 'Grid remote', '_doctype' => Controls\GridRemote::class],
            ['name' => 'Image gallery', '_doctype' => Controls\ImageGallery::class],
            ['name' => 'Image gallery. Sortable', '_doctype' => Controls\ImageGallerySortable::class],
            ['name' => 'Select', '_doctype' => Controls\Select::class],
            ['name' => 'StaticHtml', '_doctype' => Controls\StaticHtml::class],
            ['name' => 'Text', '_doctype' => Controls\Text::class],
            ['name' => 'TextArea', '_doctype' => Controls\TextArea::class],
        ]);
    }
}
