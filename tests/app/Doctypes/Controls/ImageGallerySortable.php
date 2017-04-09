<?php

namespace App\Doctypes\Controls;

use DJEM\Editor\Control;

class ImageGallerySortable extends \DJEM\Doctype
{
    use Traits\UploadImage;
    use Traits\Sortable;
    use Traits\HighlightCode;

    public function editor()
    {
        $editor = parent::editor();

        $editor->create(Control::vlayout()->items([
            Control::text('name')->label('Name')->validate('required|max:255'),
            Control::images('images')->sortable($this->rearrange('sort'))->height(256)->save($this->uploadImage()),

            $this->addHighlightedCode(__FILE__, ['Traits\UploadImage' => 'Traits/UploadImage.php', 'Traits\Sortable' => 'Traits/Sortable.php']),
        ]));

        return $editor;
    }
}
