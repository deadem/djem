<?php

namespace Tests\EditorSave;

use TestCase;
use DJEM\Doctype;
use Illuminate\Database\Eloquent\Model;
use App\Tests\CheckModel;

class News extends Model
{
    public $table = 'news';
    public $fillable = ['name', 'text', 'tagsList'];
}

class NewsDoctype extends Doctype
{
    public $model = News::class;
}

class EditorSaveTest extends TestCase
{
    use CheckModel;

    public function testEmptyModel()
    {
        $count = count(News::all());
        try {
            $editor = (new NewsDoctype())->editor([]);
            $editor->putData();
        } catch (\Exception $e) {
            // не должно сохранить модель без схемы и данных
            $this->assertTrue(true);
        }
        $this->assertEquals($count, count(News::all()));
    }

    public function testModelFields()
    {
        $data = ['name' => 'test', 'text' => 'textfield'];

        $editor = (new NewsDoctype())->editor()->setInput($data);
        $editor->createLayout()->items(function ($items) {
            $items->addText('name');
            $items->addText('text');
        });
        $editor->putData();
        $this->checkData($editor);

        $this->assertEquals($data['name'], $editor->model()->name);
        $this->assertEquals($data['text'], $editor->model()->text);

        $editor->model()->delete();
    }

    public function testModelTagsLocalStore()
    {
        $data = ['name' => 'test', 'text' => 'textfield', 'tagsList' => ['first', 'second', 'third', 'fourth']];

        $editor = (new NewsDoctype())->editor()->setInput($data);
        $editor->createLayout()->items(function ($items) {
            $items->addText('name');
            $items->addText('text');
            $items->addTag('tagsList')->store(['first', 'second', 'third']);
        });
        $editor->putData();

        $this->checkData($editor);

        $this->assertEquals($data['name'], $editor->model()->name);
        $this->assertEquals($data['text'], $editor->model()->text);
        $this->assertEquals('first,second,third', $editor->model()->tagsList);

        $editor->model()->delete();
    }
}
