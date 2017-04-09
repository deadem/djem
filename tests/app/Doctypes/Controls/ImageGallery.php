<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class ImageGallery extends \DJEM\Doctype
{
    use Traits\UploadImage;
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->create(Control::vlayout()->items([
            Control::text('name')->label('Name')->validate('required|max:255'),
            Control::images('images')->height(256)->save($this->uploadImage()),

            $this->addHighlightedCode(__FILE__, ['Traits\UploadImage' => 'Traits/UploadImage.php']),
        ]));

        return $editor;
    }
}
