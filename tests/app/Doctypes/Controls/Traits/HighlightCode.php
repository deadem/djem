<?php

namespace App\Doctypes\Controls\Traits;

use DJEM\Editor\Control;
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

    private function addSourceCode($file)
    {
        $code = file_get_contents($file);

        // cleanup
        $code = preg_replace('/\s*namespace App\\\\[^\n]+/', '', $code);
        $code = preg_replace('/\s*use Traits\\\\HighlightCode[^\n]+/', '', $code);
        $code = preg_replace('/\s*\\$this->addHighlightedCode[^\n]+/', '', $code);

        $code = preg_replace('/[^\n]+\\$this->highlightCode()[^\n]+\n/', '', $code);

        return Control::staticHtml(View::make('djem.highlight', ['code' => $code])->render());
    }

    private function addHighlightedCode($file, $tabs = [])
    {
        $items = [];
        $items[] = Control::label()->height(32);

        if (! empty($tabs)) {
            $items[] = Control::tabPanel()->reference('highlightCode')->flex(1)->items([
                Control::layout()->title('Control')->items([
                    $this->addSourceCode($file),
                ]),

                collect($tabs)->map(function ($path, $name) use (&$items, $file) {
                    return Control::layout()->title($name)->items([
                        $this->addSourceCode(dirname($file).'/'.$path),
                    ]);
                })->toArray(),
            ]);

            return $items;
        }

        $items[] = $this->addSourceCode($file);

        return $items;
    }
}
