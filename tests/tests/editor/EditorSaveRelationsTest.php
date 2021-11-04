<?php

namespace Tests\EditorSaveRelations;

use App\Tests\CheckModel;
use DJEM\Doctype;
use DJEM\Editor\Control;
use Illuminate\Database\Eloquent\Model;
use TestCase;

class LinkedValue extends Model
{
    public $table = 'linked_values';

    public $timestamps = false;
    public $fillable = ['name'];

    public function __construct($value = [])
    {
        if (is_array($value)) {
            return parent::__construct($value);
        }

        $this->name = $value;
    }
}

class News extends Model
{
    public $table = 'news';
    public $fillable = ['name', 'text'];

    public function tags()
    {
        return $this->hasMany(LinkedValue::class, 'reference');
    }
}

class NewsDoctype extends Doctype
{
    public $model = News::class;
}

class EditorSaveRelationsTest extends TestCase
{
    use CheckModel;

    public function testModelTagsLocalStore()
    {
        // проверяем добавление связи
        $data = ['name' => 'test', 'text' => 'textfield', 'tags' => ['first', 'second', 'third', 'fourth']];

        $editor = (new NewsDoctype())->editor()->setInput($data);
        $editor->create(Control::layout()->items([
            Control::text('name'),
            Control::text('text'),
            Control::tag('tags')->store(['first', 'second', 'third']),
        ]));
        $editor->putData();

        $this->checkData($editor);
        $this->assertEquals(collect([
            ['value' => 'first', 'text' => 'first'],
            ['value' => 'second', 'text' => 'second'],
            ['value' => 'third', 'text' => 'third'],
        ]), $editor->getData()->tags);

        $this->assertEquals($data['name'], $editor->model()->name);
        $this->assertEquals($data['text'], $editor->model()->text);

        // проверим удаление связи
        $data = ['name' => 'test', 'text' => 'textfield', 'tags' => ['second', 'third', 'fourth']];
        $editor->setInput($data);
        $editor->putData();

        $this->checkData($editor);
        $this->assertEquals(collect([
            ['value' => 'second', 'text' => 'second'],
            ['value' => 'third', 'text' => 'third'],
        ]), $editor->getData()->tags);

        $editor->model()->delete();
    }

    public function testModelTagsLocalStoreAssoc()
    {
        $data = ['name' => 'test', 'text' => 'textfield', 'tags' => ['first', 'second', 'third', 'fourth']];

        $editor = (new NewsDoctype())->editor()->setInput($data);
        $editor->create(Control::layout()->items([
            Control::text('name'),
            Control::text('text'),
            Control::tag('tags')->store(['first' => '1', 'second' => '2', 'third' => '3']),
        ]));
        $editor->putData();

        $this->checkData($editor);
        $this->assertEquals(collect([
            ['value' => 'first', 'text' => '1'],
            ['value' => 'second', 'text' => '2'],
            ['value' => 'third', 'text' => '3'],
        ]), $editor->getData()->tags);

        $this->assertEquals($data['name'], $editor->model()->name);
        $this->assertEquals($data['text'], $editor->model()->text);

        $editor->model()->delete();
    }
}
