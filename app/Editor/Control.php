<?php

namespace DJEM\Editor;

use BadMethodCallException;

class Control
{
    public static function __callStatic($name, $args)
    {
        // create controls
        $methods = [
            'button',
            'checkbox',
            'date',
            'grid',
            'hidden',
            'hlayout',
            'image',
            'images',
            'label',
            'layout',
            'richText',
            'select',
            'staticHtml',
            'staticImage',
            'tabPanel',
            'tag',
            'text',
            'textArea',
            'time',
            'vlayout',
        ];

        if (! in_array($name, $methods)) {
            throw new BadMethodCallException('Call to undefined method '.self::class.'::'.$name);
        }

        return Controls\Item::createControl(ucfirst($name), $args);
    }
}
