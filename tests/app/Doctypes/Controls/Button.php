<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class Button extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        return parent::editor()->create(
            Control::vlayout()->items([
                Control::button('Click me')->name('name')->height(64)->color('#000000')->bgcolor('#4CAF50'),

                $this->addHighlightedCode(__FILE__),
            ])
        );
    }

    public function load()
    {
        $editor = $this->editor();

        $code = <<<'EOF'
        this.querySelector('#name').onclick = function() { alert('Button clicked'); };
EOF;
        $code .= $this->highlightCode();

        return [
            'data' => $editor->getData(),
            'code' => $code,
            'view' => $editor->getView(),
        ];
    }
}
