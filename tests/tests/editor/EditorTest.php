<?php

use App\Models;

class Doctype extends DJEM\Doctype
{
    //    public $model = Models\News::class;
}

class Editor extends TestCase
{
    public function testEditor()
    {
        $editor = (new Doctype())->editor();
        $this->assertNotEmpty($editor);

        $model = Models\News::first();
        $editor->loadModel($model);
        $this->assertEquals($model, $editor->model());
    }

    public function testModelFields()
    {
        $editor = (new Doctype())->editor();

        $model = Models\News::first();
        $editor->loadModel($model);

        $data = collect($editor->getData());
        $attr = collect($model->getAttributes());

        // проверяем, что все поля модели есть в выдаче
        $attr->each(function ($value, $key) use ($data) {
            $this->assertEquals($value, $data->get($key));
        });

        // проверяем, что в выдаче нет ничего, кроме полей модели
        $data->each(function ($value, $key) use ($attr) {
            $this->assertEquals($value, $attr->get($key));
        });
    }
}
