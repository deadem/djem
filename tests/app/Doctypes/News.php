<?php

namespace App\Doctypes;

use App\Models;
use DJEM\Main\Grid;
use Illuminate\Http\Request;

class News extends \DJEM\Doctype
{
    use Traits\UploadImage;

    public $model = Models\News::class;

    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function grid()
    {
        return Grid::fields(function ($fields) {
            $fields->field('id');
            $fields->field('name')->text('Name')->flex(1);
        })->items(function () {
            $items = (new $this->model())->orderBy('id');
            $items = $items->paginate($this->request->input('limit'));

            return $items;
        });
    }

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('hbox')->flex(1)->items(function ($items) {
            $items->addLayout(['type' => 'vbox', 'align' => 'stretch'])->flex(1)->items(function ($items) {
                $items->addText('name')->label('Name')->validate('required|max:255');
                $items->addTag('tagsList')->label('Field Tags')->filterPickList(true)->store(['one', 'two', 'three']);
                $items->addRichText('text')->label('Text')->flex(1);
            });
            $items->addImages('images')->height('100%')->width('20%')->save($this->uploadImage());
        });

        return $editor;
    }
}
