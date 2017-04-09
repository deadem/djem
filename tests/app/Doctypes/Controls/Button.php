<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class Button extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->create(Control::vlayout()->items([
            Control::button('Click me')->reference('name')->height(64)->color('black')->bgcolor('light-green'),

            $this->addHighlightedCode(__FILE__),
        ]));

        return $editor;
    }

    public function load()
    {
        $editor = $this->editor();

        $code = <<<'EOF'
        var me = this;
        me.lookupReference('name').on('click', function() {
            Ext.Msg.alert('Click', 'Button clicked');
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
