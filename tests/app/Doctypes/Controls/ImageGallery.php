<?php

namespace App\Doctypes\Controls;

class ImageGallery extends \DJEM\Doctype
{
    use Traits\UploadImage;
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('vbox')->items(function ($items) {
            $items->addText('name')->label('Name')->validate('required|max:255');
            $items->addImages('images')->height(256)->save($this->uploadImage());

            $this->addHighlightedCode($items, __FILE__, ['Traits\UploadImage' => 'Traits/UploadImage.php']);
        });

        return $editor;
    }
}
