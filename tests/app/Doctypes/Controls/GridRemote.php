<?php

namespace App\Doctypes\Controls;

class GridRemote extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addGrid('gridField')->columns([
                ['text' => 'Name', 'dataIndex' => 'name'],
                ['text' => 'Email', 'dataIndex' => 'email', 'flex' => 1],
                ['text' => 'Phone', 'dataIndex' => 'phone', 'width' => 200],
            ])->fields(['name', 'email', 'phone']);

            $this->addHighlightedCode($items, __FILE__);
        });

        return $editor;
    }

    public function loadRelation($relation)
    {
        return [ // $relation == 'gridField'
            ['name' => 'Lisa', 'email' => 'lisa@simpsons.com', 'phone' => '555-111-1224'],
            ['name' => 'Bart', 'email' => 'bart@simpsons.com', 'phone' => '555-222-1234'],
            ['name' => 'Homer', 'email' => 'homer@simpsons.com', 'phone' => '555-222-1244'],
            ['name' => 'Marge', 'email' => 'marge@simpsons.com', 'phone' => '555-222-1254'],
        ];
    }
}
