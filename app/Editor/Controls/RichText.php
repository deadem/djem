<?php

namespace DJEM\Editor\Controls;

class RichText extends Control
{
    private $images = null;
    private $relatedData = [];

    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.html');
    }

    public function images($values, $saveHandler)
    {
        $this->images = $values;
        $this->saveHandler = $saveHandler;

        return $this;
    }

    public function prepareUserValue($value, $getValue = null)
    {
        if (empty($this->images) || empty($this->saveHandler)) {
            return parent::prepareUserValue($value, $getValue);
        }

        $value = preg_replace_callback('/(<img.*?src=\s*([\'"]))(.*?)(\\2)/is', function ($matches) use ($getValue) {
            if (preg_match('/^blob:http.*?#(.+)$/i', $matches[3], $urls)) {
                $relation = call_user_func($getValue->relation, $this->images);
                $value = call_user_func($this->saveHandler, [ 'file' => $urls[1] ], $relation->getRelated());

                if ($value) {
                    $this->relatedData[] = [
                        'relation' => $relation,
                        'value' => $value
                    ];
                    return $matches[1].htmlentities($value->url).$matches[4];
                }
            }
            return $matches[0];
        }, $value);

        parent::prepareUserValue($value, $getValue);
    }

    public function putRelatedData($model)
    {
        $model; // unused
        foreach ($this->relatedData as $row) {
            $row['relation']->attach($row['value']);
        }

        return $this;
    }
}
