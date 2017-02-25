<?php

namespace App\Doctypes\Controls;

class Button extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addButton('Click me')->reference('name')->height(64)->color('black')->bgcolor('light-green');

            $this->addHighlightedCode($items, __FILE__);
        });

        return $editor;
    }

    public function load()
    {
        $editor = $this->editor();

        $code = <<<'EOF'
        var me = this;
        me.lookupReference('name').on('click', function() {
            alert('click!');
        });
EOF;
        $code .= $this->highlightCode();

        return [
            'data' => $editor->getData(),
            'code' => $code,
            'view' => $editor->getView(),
        ];
    }
}
