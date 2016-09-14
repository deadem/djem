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

    public function testTabPanel()
    {
        $editor = (new Doctype())->editor();

        $model = Models\News::first();
        $editor->loadModel($model);

        //dd($editor->getData());
    }
}
