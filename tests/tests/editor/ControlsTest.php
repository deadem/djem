<?php

namespace Tests\Editor;

use TestCase;
use App\Doctypes\Controls;

class ControlsTest extends TestCase
{
    public function testButton()
    {
        $editor = (new Controls\Button())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'xtype' => 'button',
                    'text' => 'Click me',
                    'reference' => 'name',
                    'height' => 64,
                    'cls' => 'color-black bgcolor-light-green',
                ],
            ],
        ], $view);
    }

    public function testCheckbox()
    {
        $editor = (new Controls\Checkbox())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'xtype' => 'djem.checkbox',
                    'name' => 'name',
                    'fieldLabel' => 'Switch control',
                    'bind' => '{name}',
                ],
            ],
        ], $view);
    }

    public function testSelect()
    {
        $editor = (new Controls\Select())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'xtype' => 'djem.select',
                    'name' => 'name',
                    'fieldLabel' => 'Name',
                    'forceSelection' => false,
                    'queryMode' => 'local',
                    'store' => [
                        'fields' => [['name' => 'value'], ['name' => 'text']],
                        'data' => [
                            ['value' => 'One', 'text' => 'One'],
                            ['value' => 'Two', 'text' => 'Two'],
                            ['value' => 'Three', 'text' => 'Three'],
                        ],
                    ],
                    'bind' => '{name}',
                ],
            ],
        ], $view);
    }

    public function testStaticHtml()
    {
        $editor = (new Controls\StaticHtml())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'html' => '<b>Static html content</b><p>Text content</p>',
                ],
            ],
        ], $view);
    }

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
