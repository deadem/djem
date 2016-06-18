<?php

namespace DJEM\Editor\Controls;

class TabPanel extends Layout
{
    public function __construct()
    {
        parent::__construct();

        $this->xtype('tabpanel');

        return $this;
    }

    public function region($value)
    {
        $this->setProperty('region', $value);

        return $this;
    }

    public function plain($value)
    {
        $this->setProperty('plain', $value);

        return $this;
    }

    public function tabPosition($value)
    {
        $this->setProperty('tabPosition', $value);

        return $this;
    }
}
