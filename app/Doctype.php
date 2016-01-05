<?php
namespace DJEM;

use DJEM\GridHeader;
use DJEM\LoadEditorFields;
use Illuminate\Support\Collection;
use Input;

/**
 * базовый тип документа.
 */
class Doctype extends \Illuminate\Routing\Controller
{
    /**
     * модель, отображением и изменением которой занимается тип
     * @var class
     */
    public $model = null;

    /**
     * Поиск данных для отображения по URL
     * @param string $url      URL.
     * @param string $urlModel модель, которая обрабатывает URL и хранит данные о них.
     * @return object класс с полями doctype, model, refid для отображения соответствующим
     *         типом модели, найденной по идентификатору.
     */
    public function view($url, $urlModel)
    {
        return $this->viewAddress($urlModel::where('url', '=', $url)->first());
    }

    /**
     * Переопределение вью для грида
     * @return array описание вьювера и данных для просмотра
     */
    public function gridView()
    {
        return [];
    }

    /**
     * Загрузка из объекта URL данных из типа документа и вызов метода renderView для отображения
     * @param object $address с полями doctype, model, refid.
     * @return object данные для отображения
     */
    public function viewAddress($address)
    {
        if (!$address) {
            abort(404);
        }
        return (new $address->doctype)->render($address->refid);
    }

    /**
     * Перегружаемая функция, рендерит указанную модель
     * @param string $id идентификатор.
     * @return object данные для отображения.
     */
    public function render($id)
    {
        return [ 'model' => $this->model, 'id' => $id ];
    }

    public function getModelView()
    {
        return [];
    }

    public function save()
    {
    }

    public function load()
    {
    }

    /**
     * Получить список моделей, доступных для создания
     * @return array список классов типов, которые можно создавать внутри этого типа.
     */
    protected function getSubtypes()
    {
        return [];
    }

    /**
     * Список полей грида для указанного mount-id
     * @return array массив с типами и именами полей.
     */
    protected function fields()
    {
        return [
            [ 'name' => 'id', 'type' => 'string' ],
            [ 'name' => '_doctype', 'type' => 'string' ],
            [ 'name' => 'name', 'title' => true, 'text' => 'Name', 'type' => 'string', 'flex' => 1 ]
        ];
    }

    /**
     * Получить список документов для грида
     * @return Illuminate\Support\Collection список документов в гриде
     */
    protected function gridItems()
    {
        return new Collection();
    }

    /**
     * Получить заголовок грида со служебными данными для указанного mount-id
     * @return array объект со списком полей, их типами и описанием.
     */
    private function header()
    {
        $fields = (new GridHeader)->getFields($this->fields());
        $fields['options'] += [
            'subtypes' => $this->getSubtypes(),
            '_doctype' => get_class($this)
        ];
        return $fields;
    }

    /**
     * Подготовить данные для грида в указанном mount-id.
     * @return array объект, содержащий заголовок грила и собственно данные
     */
    public function grid()
    {
        $items = $this->gridItems();
        $total = $items->count();
        if ($total && method_exists($items, 'total')) {
            $total = $items->total();
        }
        return [
            'metaData' => $this->header(),
            'items' => $items->all(),
            'total' => $total
        ];
    }

    /**
     * Загрузить связанные с моделью данные для редактирования
     * @param Model $model  загруженная модель или ничего, для автоматической подгрузки
     * @param array $fields массив полей для инициализации или ничего, для автоматического разбора
     * @return LoadEditorFields класс для подгрузки полей в нужном формате
     */
    public function editor($model = null, $fields = null)
    {
        if ($model === null) {
            if (Input::get('id')) {
                $myModel = $this->model;
                $model = $myModel::find(Input::get('id'));
            }
        }
        if ($fields === null) {
            $fields = Input::all();
        }
        return new EditorLoadFields($this, $model, $fields);
    }
}
