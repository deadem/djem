<?php

namespace App\Doctypes\Controls;

class StaticHtml extends \DJEM\Doctype
{
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addStaticHtml('<b>Static html content</b><p>Text content</p>');

            $this->addHighlightedCode($items, __FILE__);
        });

        return $editor;
    }
}
