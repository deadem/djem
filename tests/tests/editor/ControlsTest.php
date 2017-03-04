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

    public function testDate()
    {
        $editor = (new Controls\Date())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'layout' => [
                        'align' => 'stretch',
                    ],
                    'autoScroll' => true,
                    'items' => [
                        (object) [
                            'name' => 'name',
                            'xtype' => 'djem.date',
                            'fieldLabel' => 'Date',
                            'bind' => '{name}',
                        ],
                    ],
                ],
            ],
        ], $view);
    }

    public function testGrid()
    {
        $editor = (new Controls\GridLocal())->editor();

        $view = $editor->getView();
        unset($view->items[1]);
        unset($view->items[2]);

        $this->assertEquals((object) [
            'layout' => ['type' => 'vbox', 'align' => 'stretch'],
            'autoScroll' => true,
            'items' => [
                (object) [
                    'xtype' => 'djem.grid.panel',
                    'name' => 'name',
                    'bind' => '{name}',
                    'columns' => [
                        ['text' => 'Name', 'dataIndex' => 'name'],
                        ['text' => 'Email', 'dataIndex' => 'email', 'flex' => 1],
                        ['text' => 'Phone', 'dataIndex' => 'phone', 'width' => 200],
                    ],
                    'store' => [
                        'fields' => ['name', 'email', 'phone'],
                        'data' => [
                            ['name' => 'Lisa', 'email' => 'lisa@simpsons.com', 'phone' => '555-111-1224'],
                            ['name' => 'Bart', 'email' => 'bart@simpsons.com', 'phone' => '555-222-1234'],
                            ['name' => 'Homer', 'email' => 'homer@simpsons.com', 'phone' => '555-222-1244'],
                            ['name' => 'Marge', 'email' => 'marge@simpsons.com', 'phone' => '555-222-1254'],
                        ],
                    ],
                    'queryMode' => 'local',
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

    public function testImagesGallery()
    {
        $editor = (new Controls\ImageGallery())->editor();

        $view = $editor->getView();
        unset($view->items[2]);
        unset($view->items[3]);

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
                (object) [
                    'name' => 'images',
                    'xtype' => 'djem.images',
                    'height' => 256,
                    'bind' => '{images}',
                ],
            ],
        ], $view);
    }

    public function testImagesGallerySortable()
    {
        $editor = (new Controls\ImageGallerySortable())->editor();

        $view = $editor->getView();
        unset($view->items[2]);
        unset($view->items[3]);

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
                (object) [
                    'name' => 'images',
                    'xtype' => 'djem.images',
                    'height' => 256,
                    'bind' => '{images}',
                    'sortable' => true,
                ],
            ],
        ], $view);
    }
}
