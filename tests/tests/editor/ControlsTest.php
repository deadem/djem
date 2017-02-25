<?php

namespace Tests\Editor;

use TestCase;
use App\Doctypes\Controls;

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

    public function testTextArea()
    {
        $editor = (new Controls\TextArea())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'name' => 'name',
                    'xtype' => 'djem.textarea',
                    'fieldLabel' => 'Name',
                    'bind' => '{name}',
                ],
            ],
        ], $view);
    }
}
