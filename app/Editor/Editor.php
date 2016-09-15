<?php

namespace DJEM\Editor;

use Request;
use DB;

class Editor
{
    use Controls\Traits\Editor {
        loadModel as editorLoadModel;
    }

    private $modelClass = null;
    private $request;

    public function __construct($model, Controls\Item $item = null)
    {
        $this->modelClass = $model;
        $this->create($item);

        $this->request = Request();
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
            $id = $this->request->input('id');
            if (! $id) {
                $id = $this->request->input('clone');
            }
            if ($id) {
                $myModel = $this->modelClass;
                $model = $myModel::find($id);

                if (! $this->request->input('id') && $this->request->input('clone')) {
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

            $this->prepareValues($controls, $this->request->all());
            $this->putFillableData($controls);

            $this->model()->save();
            $this->putRelatedData($controls);
        });

        $this->request->merge(['id' => $this->model()->id]);

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
