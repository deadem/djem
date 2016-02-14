<?php

namespace DJEM;

use Input;

class EditorLoadFields
{
    private $model = null;
    private $doctype = null;
    private $input = null;

    public function __construct($doctype, $model, $input)
    {
        $this->doctype = $doctype;
        $this->model = $model;
        $this->input = $input;
    }

    public function model()
    {
        return $this->model;
    }

    public function save($callable = null)
    {
        if (!$this->model) {
            $this->model = new $this->doctype->model;
        }

        $this->model->fill($this->input);
        if ($callable) {
            $callable(new EditorSaveFields($this->doctype, $this->model, $this->input));
        }

        $this->model->save();
        Input::merge([ 'id' => $this->model->id ]);
        return $this;
    }

    private function params($params)
    {
        $result = [];
        foreach ($params as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $key => $value) {
                    $result[$key] = $value;
                }
            } else {
                $result[] = $value;
            }
        }
        return $result;
    }

    private function loadTypeRelation($key, $value, $callable = null)
    {
        if (!$this->model) {
            return;
        }

        $field = $value;
        if ($value instanceof \Closure) {
            $field = $key;
        }

        $relation = $this->model->{$field}();

        if ($callable instanceof \Closure) {
            $collection = $callable($relation);
        } else {
            $collection = $relation;
        }

        if ($value instanceof \Closure) {
            $this->model->{$field} = $value($collection);
        } else {
            $this->model->{$field} = $collection;
        }
    }

    public function image()
    {
        // алиас для $this->one
        return call_user_func_array([ $this, 'one' ], func_get_args());
    }

    public function one()
    {
        foreach ($this->params(func_get_args()) as $key => $relation) {
            $this->loadTypeRelation($key, $relation, function ($relation) {
                return $relation->first();
            });
        }
        return $this;
    }

    public function all()
    {
        foreach ($this->params(func_get_args()) as $key => $relation) {
            $this->loadTypeRelation($key, $relation, function ($relation) {
                return $relation->get();
            });
        }
        return $this;
    }

    public function select()
    {
        foreach ($this->params(func_get_args()) as $key => $relation) {
            $this->loadTypeRelation($key, $relation, function ($relation) {
                $value = $relation->select([ 'id', 'name' ])->first();
                if ($value) {
                    return [ 'value' => $value->id, 'text' => $value->name ];
                } else {
                    return (object) [];
                }
            });
        }
        return $this;
    }

    public function tag()
    {
        foreach ($this->params(func_get_args()) as $key => $relation) {
            $this->loadTypeRelation($key, $relation, function ($relation) {
                return $relation->select('id', 'name')->get()->map(function ($value) {
                    return [
                        'value' => $value->id,
                        'text'  => $value->name
                    ];
                });
            });
        }
        return $this;
    }
}
