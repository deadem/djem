<?php

namespace Tests\Editor;

use App\Doctypes\Controls;
use TestCase;

class ControlsTest extends TestCase
{
    public function testText()
    {
        $editor = (new Controls\Text())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'name' => 'name',
                    'xtype' => 'djem.text',
                    'fieldLabel' => 'Name',
                    'bind' => '{name}',
                ],
            ],
        ], $view);
    }
}
