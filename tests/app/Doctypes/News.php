<?php

namespace App\Doctypes;

use App\Models;
use DJEM\Main\Grid;
use DJEM\Editor\Control;
use Illuminate\Http\Request;

class News extends \DJEM\Doctype
{
    use Traits\UploadImage;
    use Traits\Sortable;

    public $model = Models\News::class;

    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function grid()
    {
        return Grid::fields([
            Grid::field('id'),
            Grid::field('name')->text('Name')->flex(1),
        ])->items(function () {
            $items = (new $this->model())->orderBy('id');
            $items = $items->paginate($this->request->input('limit'));

            return $items;
        });
    }

    public function editor()
    {
        return parent::editor()->create(
            Control::hlayout()->flex(1)->items([
                Control::vlayout()->flex(1)->items([
                    Control::text('name')->label('Name')->validate('required|max:255'),
                    Control::tag('tagsList')->label('Field Tags')->filterPickList(true)->store(['one', 'two', 'three']),

                    Control::richText('text')->label('Text')->flex(1),
                ]),
                Control::layout('vbox')->width('20%')->items([
                    Control::layout()->items([
                        Control::image('smallImage')->save($this->uploadImage()),
                    ]),
                    Control::images('images')->sortable($this->rearrange('sort'))->flex(1)->save($this->uploadImage()),
                ]),
            ])
        );
    }
}
