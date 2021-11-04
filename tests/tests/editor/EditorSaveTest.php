<?php

namespace Tests\EditorSave;

use App\Tests\CheckModel;
use DJEM\Doctype;
use DJEM\Editor\Control;
use Illuminate\Database\Eloquent\Model;
use TestCase;

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

    public function testModelFields()
    {
        $data = ['name' => 'test', 'text' => 'textfield'];

        $editor = (new NewsDoctype())->editor()->setInput($data);
        $editor->create(Control::layout()->items([
            Control::text('name'),
            Control::text('text'),
        ]));

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
        $editor->create(Control::layout()->items([
            Control::text('name'),
            Control::text('text'),
            Control::tag('tagsList')->store(['first', 'second', 'third']),
        ]));

        $editor->putData();

        $this->checkData($editor);

        $this->assertEquals($data['name'], $editor->model()->name);
        $this->assertEquals($data['text'], $editor->model()->text);
        $this->assertEquals('first,second,third', $editor->model()->tagsList);

        $editor->model()->delete();
    }
}
