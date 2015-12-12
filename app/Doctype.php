<?php
namespace DJEM;

use DJEM\GridHeader;
use Illuminate\Support\Collection;

/**
 * базовый тип документа.
 */
class Doctype extends \Illuminate\Routing\Controller
{
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
     * Загрузка из объекта URL данных из типа документа и вызов метода renderView для отображения
     * @param object $address с полями doctype, model, refid.
     * @return object данные для отображения
     */
    public function viewAddress($address)
    {
        if (!$address) {
            abort(404);
        }
        return (new $address->doctype)->renderView($address->model, $address->refid);
    }

    /**
     * Перегружаемая функция, рендерит указанную модель
     * @param string $model модель.
     * @param string $id    идентификатор.
     * @return object данные для отображения.
     */
    public function renderView($model, $id)
    {
        return [ 'model' => $model, 'id' => $id ];
    }

    public function getContentView($model, $id)
    {
        $model;
        $id; // disable warninigs
        return [];
    }

    public function saveModel($model, $values)
    {
        $model;
        $values; // disable warninigs
        return false;
    }

    public function load($model, $id, $field, $filter)
    {
        $model;
        $id;
        $field;
        $filter; // disable warnings
        return [];
    }

    /**
     * Получить список моделей, доступных для создания
     * @return array список классов моделей, которые можно создавать внутри этого типа.
     */
    protected function getModelList()
    {
        return [];
    }

    /**
     * Список полей грида для указанного mount-id
     * @param string $id идентификатор ветки (точки подключения типа документа).
     * @return array массив с типами и именами полей.
     */
    protected function fields($id)
    {
        $id; // disable warninig
        return [
            [ 'name' => 'id', 'type' => 'string' ],
            [ 'name' => '_doctype', 'type' => 'string' ],
            [ 'name' => '_model', 'type' => 'string' ],
            [ 'name' => 'name', 'title' => true, 'text' => 'Name', 'type' => 'string', 'flex' => 1 ]
        ];
    }

    /**
     * Получить список документов для грида
     * @param string $id идентификатор ветки типа.
     * @return Illuminate\Support\Collection список документов в гриде
     */
    protected function items($id)
    {
        $id; // disable warning
        return new Collection();
    }

    /**
     * Получить заголовок грида со служебными данными для указанного mount-id
     * @param string $id идентификатор ветки (точки подключения типа документа).
     * @return array объект со списком полей, их типами и описанием.
     */
    private function header($id)
    {
        $fields = (new GridHeader)->getFields($this->fields($id));
        $fields['options'] += [
            'models' => $this->getModelList($id),
            '_doctype' => get_class($this)
        ];
        return $fields;
    }

    /**
     * Подготовить данные для грида в указанном mount-id.
     * @param string $id идентификатор ветки (точки подключения типа документа).
     * @return array объект, содержащий заголовок грила и собственно данные
     */
    public function grid($id)
    {
        $items = $this->items($id);
        $total = $items->count();
        if ($total && method_exists($items, 'total')) {
            $total = $items->total();
        }
        return [
            'metaData' => $this->header($id),
            'items' => $items->all(),
            'total' => $total
        ];
    }
}
