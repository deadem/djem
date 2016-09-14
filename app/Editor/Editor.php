<?php

namespace DJEM\Editor;

use Input;
use DB;

class Editor
{
    use Controls\Traits\Editor {
        loadModel as editorLoadModel;
    }

    private $modelClass = null;

    public function __construct($model, Controls\Item $item = null)
    {
        $this->modelClass = $model;
        $this->create($item);
    }

    public function loadModelClass($model)
    {
        $this->model = null;
        $this->modelClass = $model;

        return $this->loadModel();
    }

    public function loadModel($model = null)
    {
        if (! $this->modelClass) {
            if ($model === null) {
                return $this;
            }

            $this->modelClass = get_class($model);
        }

        if ($model === null) {
            $id = Input::get('id');
            if (! $id) {
                $id = Input::get('clone');
            }
            if ($id) {
                $myModel = $this->modelClass;
                $model = $myModel::find($id);

                if (! Input::get('id') && Input::get('clone')) {
                    $model = $model->replicate();
                }
            }
        }
        if ($model) {
            $this->editorLoadModel($model);
        } else {
            $this->editorLoadModel(new $this->modelClass());
        }

        return $this;
    }

    public function create(Controls\Item $item = null)
    {
        $this->root = $item;

        return $this;
    }

    public function getData()
    {
        $controls = $this->getControls();
        $model = $this->model();

        $data = (object) $model->getAttributes();

        foreach ($controls as $field => $item) {
            if ($this->isRelation($field)) {
                $result = $item->loadRelation($model);
                $data->{$field} = $result;

                if (! empty($result) && (! ($result instanceof \Countable) || $result->count())) {
                    continue;
                }
            }
            if ($item->hasCustomValue()) {
                $data->{$field} = $item->getCustomValue($model);
            }
        }

        return $data;
    }

    public function putData()
    {
        DB::transaction(function () {
            // всё сохранение выполняем в транзакции
            $controls = $this->getControls();
            $this->validate($controls);

            $this->prepareValues($controls, Input::all());
            $this->putFillableData($controls);

            $this->model()->save();
            $this->putRelatedData($controls);
        });

        Input::merge(['id' => $this->model()->id]);

        return $this;
    }

    private function validate($controls)
    {
        $rules = [];
        foreach ($controls as $field => $item) {
            if (is_subclass_of($item, Controls\Control::class)) {
                $rule = $item->getValidationRule();
                if ($rule) {
                    $rules[$item->getName()] = $rule;
                }
            }
        }
        (new Validator())->validate($rules);
    }
}
