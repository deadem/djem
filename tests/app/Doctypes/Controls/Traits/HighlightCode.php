<?php

namespace App\Doctypes\Controls\Traits;

use View;

trait HighlightCode
{
    public function highlightCode()
    {
        $code = file_get_contents(public_path().'/highlight.js/highlight.min.js');
        $code .= 'Ext.select("PRE CODE").each(function(el) { hljs.highlightBlock(el.dom); });';

        return $code;
    }

    public function load()
    {
        $editor = $this->editor();

        return [
            'data' => $editor->getData(),
            'code' => $this->highlightCode(),
            'view' => $editor->getView(),
        ];
    }

    private function addHighlightedCode(&$items, $file)
    {
        $items->addLabel()->height(32);

        $code = file_get_contents($file);

        // cleanup
        $code = preg_replace('/\s*namespace App\\\\[^\n]+/', '', $code);
        $code = preg_replace('/\s*use Traits\\\\HighlightCode[^\n]+/', '', $code);
        $code = preg_replace('/\s*\\$this->addHighlightedCode[^\n]+/', '', $code);

        $code = preg_replace('/[^\n]+\\$this->highlightCode()[^\n]+\n/', '', $code);

        $items->addStaticHtml(View::make('djem.highlight', ['code' => $code])->render());
    }
}
