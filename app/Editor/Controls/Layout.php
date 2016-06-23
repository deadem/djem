<?php

namespace DJEM\Editor\Controls;

class Layout extends Panel
{
    public function __construct($value = null)
    {
        parent::__construct($value);

        if ($value) {
            $this->setProperty('layout', $value);
        }
    }

    public function title($value)
    {
        $this->setProperty('title', $value);

        return $this;
    }

    public function align($value)
    {
        $layout = $this->getProperty('layout');
        if (empty($layout)) {
            $layout = [];
        }
        if (is_string($layout)) {
            $layout = ['type' => $layout];
        }
        $layout['align'] = $value;

        $this->setProperty('layout', $layout);

        return $this;
    }

    public function type($value)
    {
        $this->setProperty('type', $value);

        return $this;
    }
}
