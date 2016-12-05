<?php

namespace Tests\EditorEditor;

use TestCase;
use DJEM\Doctype;
use App\Tests\CheckModel;
use Illuminate\Database\Eloquent\Model;

class LinkedValue extends Model
{
    public $table = 'linked_values';

    public $timestamps = false;
    public $fillable = ['name', 'reference'];

    public function images()
    {
        return $this->belongsTo(News::class);
    }
}

class News extends Model
{
    public $table = 'news';
    public $fillable = ['name', 'text'];

    public function images()
    {
        return $this->hasOne(LinkedValue::class, 'reference');
    }
}

class NewsDoctype extends Doctype
{
    public $model = News::class;
}

class EditorSaveTest extends TestCase
{
    use CheckModel;

    public function testEditorInEditor()
    {
        $value = new LinkedValue(['name' => 'test']);
        $value->save();

        $news = new News(['name' => $value->id, 'text' => 'text']);
        $news->save();

        $value->reference = $news->id;
        $value->save();

        $data = [
            'id' => $news->id,
            'images' => [
                [
                    'id' => $value->id, 'name' => 'linked-name',
                ],
            ],
        ];

        $editor = (new NewsDoctype())->editor()->setInput($data);
        $editor->createLayout()->items(function ($items) {
            $items->addImages('images')->images('images')->editor(function ($editor) {
                $editor->createLayout('vbox')->items(function ($items) {
                    $items->addSelect('news');
                });
            });
        });

        $this->assertEquals(
            (object) [
                'items' => [
                    (object) [
                        'name' => 'images',
                        'xtype' => 'djem.images',
                        'editor' => (object) [
                            'layout' => 'vbox',
                            'items' => [
                                (object) [
                                    'name' => 'news',
                                    'xtype' => 'djem.select',
                                    'bind' => '{news}',
                                ],
                            ],
                        ],
                        'bind' => '{images}',
                    ],
                ],
            ],
            $editor->getView()
        );
        $editor->putData();

        $this->checkData($editor);

        $result = (object) $data['images'][0];
        $result->reference = $news->id;

        $this->assertEquals([$result], $editor->getData()->images->all());

        $editor->model()->delete();
        $news->delete();
        $value->delete();
    }
}
