<?php

namespace Tests\EditorRelations;

use App\Models;
use TestCase;
use DJEM\Doctype;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public $table = 'news';
    public $fillable = ['name', 'text'];

    public function tags()
    {
        return $this->hasMany(Models\LinkedValue::class, 'reference');
    }
}

class NewsDocType extends Doctype
{
    public $model = News::class;
}

class EditorRelationsTest extends TestCase
{
    public function testTags()
    {
        $editor = (new Doctype())->editor();

        $model = News::first();
        $model->tags()->delete();

        $editor->loadModel($model);

        $value = new Models\LinkedValue(['value' => 'four']);
        $model->tags()->save($value);

        $editor->createTag('tags')->filterPickList(true)->store(['one', 'two', 'three'])->label('tag name');
        $this->assertEquals((object) [
            'xtype' => 'djem.tag',
            'name' => 'tags',
            'filterPickList' => true,
            'store' => ['one', 'two', 'three'],
            'fieldLabel' => 'tag name',
            'queryMode' => 'local',
            'bind' => '{tags}',
        ], $editor->getView());

        $this->assertEquals(collect([
            ['value' => 'one', 'text' => 'one'],
            ['value' => 'two', 'text' => 'two'],
            ['value' => 'three', 'text' => 'three'],
        ]), $editor->getData()->tags);
    }
}
