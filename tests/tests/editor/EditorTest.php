<?php

namespace Tests\Editor;

use TestCase;
use DJEM\Doctype;
use Illuminate\Database\Eloquent\Model;
use App\Tests\CheckModel;

class News extends Model
{
    public $table = 'news';
    public $fillable = ['name', 'text'];
}

class NewsDocType extends Doctype
{
    public $model = News::class;
}

class EditorTest extends TestCase
{
    use CheckModel;

    public function testEditor()
    {
        $editor = (new NewsDoctype())->editor();
        $this->assertNotEmpty($editor);

        $model = new News();
        $this->assertEquals($model, $editor->model());
    }

    public function testExistingModel()
    {
        $editor = (new NewsDoctype())->editor();
        $this->assertNotEmpty($editor);

        $model = News::first();
        $editor->loadModel($model);
        $this->assertEquals($model, $editor->model());
    }

    public function testModelFields()
    {
        $editor = (new Doctype())->editor();

        $model = News::first();
        $editor->loadModel($model);
        $this->assertEquals($model, $editor->model());

        $this->checkData($editor);
    }

    public function testEmptyView()
    {
        $editor = (new Doctype())->editor();

        $model = News::first();
        $editor->loadModel($model);
        $this->assertEquals((object) [], $editor->getView());
    }

    public function testTabPanel()
    {
        $editor = (new Doctype())->editor();

        $model = News::first();
        $editor->loadModel($model);

        $editor->createTabPanel();
        $this->assertEquals((object) ['xtype' => 'tabpanel'], $editor->getView());

        $editor->createTabPanel()->region('center')->plain(true)->tabPosition('left');
        $this->assertEquals((object) [
            'xtype' => 'tabpanel',
            'region' => 'center',
            'plain' => true,
            'tabPosition' => 'left',
        ], $editor->getView());

        $this->checkData($editor);
    }

    public function testTags()
    {
        $editor = (new Doctype())->editor();

        $model = News::first();
        $editor->loadModel($model);

        $editor->createTag('tagsList')->filterPickList(true)->store(['one', 'two', 'three'])->label('tag name');
        $this->assertEquals((object) [
            'xtype' => 'djem.tag',
            'name' => 'tagsList',
            'filterPickList' => true,
            'store' => ['one', 'two', 'three'],
            'fieldLabel' => 'tag name',
            'queryMode' => 'local',
            'bind' => '{tagsList}',
        ], $editor->getView());

        $this->checkData($editor);
    }
}
