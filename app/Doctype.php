<?php
namespace DJEM;

// @codingStandardsIgnoreStart
//
// example route:
// Route::get('{any}', function ($url) {
//    return (new App\Doctypes\Doctype)->view('/'.$url, App\Models\Url::class);
// })->where('any', '(?!djem/).*');
// 
// example URL Model
//     namespace App\Models;
//     ...
//     class Url extends ...
//     {
//         protected $table = 'url';
//         protected $primaryKey = 'url';
//         protected $hidden = [ 'url', 'doctype', 'model', 'refid' ];
//         ...
//     }
//
// @codingStandardsIgnoreEnd

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
            abort(404, 'File not found');
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
     * @return array список документов в гриде.
     */
    protected function all()
    {
        return [];
    }

    /**
     * Получить заголовок грида со служебными данными для указанного mount-id
     * @param string $id идентификатор ветки (точки подключения типа документа).
     * @return array объект со списком полей, их типами и описанием.
     */
    private function header($id)
    {
        $fields = [];
        $columns = [];
        $options = [];

        foreach ($this->fields($id) as $row) {
            $field = [];
            $column = [];
            foreach ($row as $key => $value) {
                switch ($key) {
                    case 'name':
                        $field[$key] = $value;
                        if (isset($row['title']) && $row['title']) {
                            $options['title'] = $value;
                        }
                        if (isset($row['text'])) {
                            $column['hideable'] = false;
                            $column['dataIndex'] = $value;
                        }
                        break;

                    case 'type':
                        $field[$key] = $value;
                        break;

                    case 'sortable':
                    case 'text':
                    case 'flex':
                    case 'width':
                        $column[$key] = $value;
                        break;

                    default:
                        // неизвестные параметры не обрабатываем
                        break;
                }
            }
            $fields[] = $field;
            if (count($column)) {
                $columns[] = $column;
            }
        }
        $options['models'] = $this->getModelList($id);
        $options['_doctype'] = get_class($this);
        return [ 'fields' => $fields, 'columns' => $columns, 'options' => $options ];
    }

    /**
     * Подготовить данные для грида в указанном mount-id.
     * @param string $id идентификатор ветки (точки подключения типа документа).
     * @return array объект, содержащий заголовок грила и собственно данные
     */
    public function grid($id)
    {
        return [
            'metaData' => $this->header($id),
            'items' => $this->all($id)
        ];
    }
}
