<?php

namespace Tests\EditorRelations;

use TestCase;
use DJEM\Doctype;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public $table = 'news';
    public $fillable = ['name', 'text'];
}

class NewsDocType extends Doctype
{
    public $model = News::class;
}

class EditorRelations extends TestCase
{
    public function testTags()
    {
        $editor = (new Doctype())->editor();

        $model = News::first();
        $editor->loadModel($model);

        $editor->createTag('name')->filterPickList(true)->store(['one', 'two', 'three'])->label('tag name');
        $this->assertEquals((object) [
            'xtype' => 'djem.tag',
            'name' => 'name',
            'filterPickList' => true,
            'store' => ['one', 'two', 'three'],
            'fieldLabel' => 'tag name',
            'queryMode' => 'local',
            'bind' => '{name}',
        ], $editor->getView());
    }
}
