<?php

namespace App\Doctypes\Controls;

class ImageGallerySortable extends \DJEM\Doctype
{
    use Traits\UploadImage;
    use Traits\Sortable;
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addText('name')->label('Name')->validate('required|max:255');
            $items->addImages('images')->sortable($this->rearrange('sort'))->height(256)->save($this->uploadImage());

            $this->addHighlightedCode($items, __FILE__, ['Traits\UploadImage' => 'Traits/UploadImage.php', 'Traits\Sortable' => 'Traits/Sortable.php']);
        });

        return $editor;
    }
}
