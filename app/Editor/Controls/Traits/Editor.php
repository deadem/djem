<?php

namespace DJEM\Editor\Controls\Traits;

use ReflectionClass;
use DJEM\Editor\Controls;
use BadMethodCallException;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations;

trait Editor
{
    private $root = null;
    protected $model = null;
    private $input;

    public function create(Controls\Item $item = null)
    {
        $this->root = $item;

        return $this;
    }

    public function loadModel($model = null)
    {
        $this->model = $model;

        return $this;
    }

    public function setInput($input)
    {
        $this->input = collect($input);

        return $this;
    }

    public function model()
    {
        if (! $this->model) {
            $this->loadModel();
        }

        return $this->model;
    }

    public static function createControl($name, $args)
    {
        $name = '\\DJEM\\Editor\\Controls\\'.$name;
        if (class_exists($name)) {
            $object = new ReflectionClass($name);

            return $object->newInstanceArgs($args);
        }

        throw new BadMethodCallException('Can\'t create class '.$name);
    }

    public function __call($name, $args)
    {
        if (! preg_match('/^create/', $name)) {
            throw new BadMethodCallException('Call to undefined method '.get_class($this).'::'.$name);
        }

        $className = preg_replace('/^create/', '', $name);

        return $this->create(self::createControl($className, $args))->root;
    }

    public function getView($item = null)
    {
        if (! $item) {
            $item = $this->root;
        }

        $viewItem = (object) [];
        if ($item) {
            foreach ($item->getProperties($this->model()) as $key => $value) {
                $viewItem->{$key} = $value;
            }

            $viewItems = $item->getViewItems();

            if ($viewItems) {
                if (! isset($viewItem->items)) {
                    $viewItem->items = [];
                }
                foreach ($viewItems as $item) {
                    $viewItem->items[] = $this->getView($item);
                }
            }
        }

        return $viewItem;
    }

    public function getControls($item = null)
    {
        $controls = collect([]);

        if (! $item) {
            $item = $this->root;
        }

        if (is_subclass_of($item, Controls\Control::class)) {
            $controls->put($item->getName(), $item);
        }

        if ($item && $items = $item->getItems()) {
            foreach ($items as $item) {
                $controls = $controls->merge($this->getControls($item));
            }
        }

        return $controls;
    }

    public function isRelation($field)
    {
        if (! method_exists($this->model(), $field)) {
            return false;
        }

        $relation = $this->getRelation($field);
        if (! is_object($relation)) {
            return false;
        }

        return is_subclass_of($relation, Relations\Relation::class);
    }

    public function getRelation($field)
    {
        return $this->model()->{$field}();
    }

    public function prepareValues($controls)
    {
        $getField = (object) [
            'field' => function ($field) {
                return $this->input->get($field);
            },
            'relation' => function ($field) {
                return $this->isRelation($field) ? $this->getRelation($field) : null;
            },
            'model' => function () {
                return $this->model();
            },
        ];

        foreach ($controls as $field => $item) {
            $item->initControl($controls);
            $value = $this->input->get($field);

            $relation = null;

            if ($this->isRelation($field)) {
                $relation = $this->getRelation($field);
            }

            $item->prepareUserValue($value, $getField, $relation);
        }

        return $this;
    }

    public function putFillableData(Collection $controls)
    {
        $controls->each(function (Controls\Control $item, $field) {
            if ($this->isRelation($field)) {
                if (get_class($this->getRelation($field)) == Relations\BelongsTo::class) {
                    $this->addSingleRelation($item, $field);
                }
            } elseif ($this->model->isFillable($field)) {
                $this->model()->fill([$field => $item->getUserValue()]);
            }
        });

        return $this;
    }

    private function putRelatedData(Collection $controls)
    {
        $controls->each(function (Controls\Control $item, $field) {
            $item->putValueRelatedData($this->model());

            if ($this->isRelation($field)) {
                switch (get_class($this->getRelation($field))) {
                    case Relations\BelongsToMany::class:
                    case Relations\MorphToMany::class:
                        $this->addMultipleRelation($item, $field);
                        break;

                    case Relations\HasMany::class:
                    case Relations\HasOne::class:
                        $this->addReversedSingleRelation($item, $field);
                        break;

                    case Relations\BelongsTo::class:
                        // это уже обработано
                        break;

                    default:
                        // неизвестный relation
                        throw new \Exception('Field: '.$field." \n".'Unknown relation: '.get_class($this->getRelation($field)));
                        break;
                }
            }
        });

        return $this;
    }

    private function addSingleRelation(Controls\Item $item, $field)
    {
        $relation = $this->getRelation($field);

        $value = $item->getUserValue();

        if (empty($value)) {
            $relation->dissociate();
        } else {
            $relation->associate($value);
        }
    }

    private function addMultipleRelation(Controls\Item $item, $field)
    {
        $values = $item->getUserValue();
        $relation = $this->getRelation($field);
        $relation->detach();

        if (! empty($values)) {
            foreach ($values as $value) {
                $relation->attach($value);
            }
        }
    }

    private function addReversedSingleRelation(Controls\Item $item, $field)
    {
        $values = collect($item->getUserValue());
        $relation = $this->getRelation($field);

        $ids = $values->pluck('id')->filter(null);
        $relation->whereNotIn('id', $ids->all())->delete();

        $values->each(function ($value) use (&$relation) {
            $relation->save($value);
        });
    }

    public function putData($model, $values)
    {
        $this->loadModel($model);
        $this->setInput($values);

        $controls = $this->getControls();

        $this->prepareValues($controls)
            ->putFillableData($controls)
            ->putRelatedData($this->getControls());

        return $this;
    }
}
