<?php

namespace DJEM\Editor\Controls;

class RichText extends Control
{
    use Traits\File;

    private $images = null;
    private $relatedData = [];
    private $imageSaveHandler = null;

    public function __construct($name = null)
    {
        parent::__construct($name);

        $this->xtype('djem.html');
    }

    public function images($values, $imageSaveHandler)
    {
        $this->images = $values;
        $this->imageSaveHandler = $imageSaveHandler;

        return $this;
    }

    public function prepareUserValue($value, $getValue = null)
    {
        if (empty($this->images) || empty($this->imageSaveHandler)) {
            return parent::prepareUserValue($value, $getValue);
        }

        $value = preg_replace_callback('/(<img.*?src=\s*([\'"]))(.*?)(\\2)/is', function ($matches) use ($getValue) {
            if (preg_match('/^blob:http.*?#(.+)$/i', $matches[3], $urls)) {
                $relation = call_user_func($getValue->relation, $this->images);
                $file = $this->getFilePath($urls[1]);

                $value = call_user_func($this->imageSaveHandler, ['file' => $file], $relation->getRelated(), $getValue);

                if ($value) {
                    $this->relatedData[] = [
                        'relation' => $relation,
                        'value' => $value,
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
