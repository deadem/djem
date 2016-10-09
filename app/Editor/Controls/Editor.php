<?php

namespace DJEM\Editor\Controls;

class Editor extends Item
{
    use Traits\Editor;

    public function __construct(\Closure $callback = null)
    {
        parent::__construct();

        if (is_callable($callback)) {
            call_user_func($callback, $this);
        }

        return $this;
    }

    public function __invoke($model)
    {
        $this->loadModel($model);

        return $this->getView();
    }

    public function create(Item $item = null)
    {
        $this->root = $item;

        $this->onSave(function () {
            foreach ($this->getControls() as $field => $item) {
                $item->fireSaveEvent();
            }
        });

        return $this;
    }
}
