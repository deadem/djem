<?php

namespace DJEM\Editor\Controls;

class Select extends Control
{
    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.select');
    }

    public function filterPickList($value)
    {
        $this->setProperty('filterPickList', $value);

        return $this;
    }

    public function queryMode($value)
    {
        $this->setProperty('queryMode', $value);

        return $this;
    }

    public function isLocalMode()
    {
        return $this->getProperty('queryMode') === 'local';
    }

    public function store($value)
    {
        parent::store($value);
        $this->queryMode('local');

        return $this;
    }

    public function loadRelation($model)
    {
        $value = $this->getRelation($model)->select(['id', 'name'])->first();
        if ($value) {
            return ['value' => $value->id, 'text' => $value->name];
        }
    }

    public function triggerAction($mode)
    {
        return $this->setProperty('triggerAction', $mode);
    }

    public function forceSelection($mode = true)
    {
        return $this->setProperty('forceSelection', $mode);
    }

    public function autocomplete($value = true)
    {
        if (! $value) {
            $this->forceSelection(false);
        }

        return $this->setProperty('minChars', ($value) ? 1 : 255);
    }
}
