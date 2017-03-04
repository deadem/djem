<?php

namespace App\Doctypes\Controls\Traits;

use View;

trait HighlightCode
{
    public function highlightCode()
    {
        $code = file_get_contents(public_path().'/highlight.js/highlight.min.js');
        $code .= 'Ext.select("PRE CODE").each(function(el) { hljs.highlightBlock(el.dom); });';
        $code .= 'var tabs = this.lookupReference("highlightCode");';
        $code .= 'tabs && tabs.on("tabchange", function() { '.
            'Ext.select("PRE CODE").each(function(el) { hljs.highlightBlock(el.dom); });'.
            '});';

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

    private function addSourceCode(&$items, $file)
    {
        $code = file_get_contents($file);

        // cleanup
        $code = preg_replace('/\s*namespace App\\\\[^\n]+/', '', $code);
        $code = preg_replace('/\s*use Traits\\\\HighlightCode[^\n]+/', '', $code);
        $code = preg_replace('/\s*\\$this->addHighlightedCode[^\n]+/', '', $code);

        $code = preg_replace('/[^\n]+\\$this->highlightCode()[^\n]+\n/', '', $code);

        $items->addStaticHtml(View::make('djem.highlight', ['code' => $code])->render());
    }

    private function addHighlightedCode(&$items, $file, $tabs = [])
    {
        $items->addLabel()->height(32);

        if (! empty($tabs)) {
            $items->addTabPanel()->reference('highlightCode')->flex(1)->items(function ($items) use ($tabs, $file) {
                $items->addLayout()->title('Control')->items(function ($items) use ($file) {
                    $this->addSourceCode($items, $file);
                });
                collect($tabs)->each(function ($path, $name) use (&$items, $file) {
                    $items->addLayout()->title($name)->items(function ($items) use ($file, $path) {
                        $this->addSourceCode($items, dirname($file).'/'.$path);
                    });
                });
            });

            return;
        }

        $this->addSourceCode($items, $file);
    }
}
