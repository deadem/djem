<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class GridLocal extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        return parent::editor()->create(
            Control::vlayout()->items([
                Control::grid('name')->columns([
                    ['text' => 'Name', 'dataIndex' => 'name'],
                    ['text' => 'Email', 'dataIndex' => 'email', 'flex' => 1],
                    ['text' => 'Phone', 'dataIndex' => 'phone', 'width' => 200],
                ])
                ->fields(['name', 'email', 'phone'])
                ->store([
                    ['name' => 'Lisa', 'email' => 'lisa@simpsons.com', 'phone' => '555-111-1224'],
                    ['name' => 'Bart', 'email' => 'bart@simpsons.com', 'phone' => '555-222-1234'],
                    ['name' => 'Homer', 'email' => 'homer@simpsons.com', 'phone' => '555-222-1244'],
                    ['name' => 'Marge', 'email' => 'marge@simpsons.com', 'phone' => '555-222-1254'],
                ]),

                $this->addHighlightedCode(__FILE__),
            ])
        );
    }
}
