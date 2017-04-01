<?php

namespace DJEM\Editor\Controls;

class Checkbox extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.checkbox');
    }

    public function label($value, $align = null)
    {
        if ($align !== null && $align !== 'left' && 'align' !== 'right') {
            return parent::label($value, $align);
        }

        $this->setProperty('hideLabel', true);
        $this->setProperty('boxLabel', htmlspecialchars($value));
        $this->setProperty('boxLabelAlign', $align === 'left' ? 'before' : 'after');

        return $this;
    }
}
