<?php

namespace DJEM;

use Request;

/**
 * Базовый тип документа.
 */
class Doctype extends \Illuminate\Routing\Controller
{
    /**
     * Модель, отображением и изменением которой занимается тип
     *
     * @var class
     */
    public $model;

    /**
     * Контроллер, которому должно быть передано управление при обработке http-запроса к этому типу.
     *
     * @return class | null
     */
    public function controller()
    {
        return '';
    }

    /**
     * Поиск данных для отображения по URL.
     *
     * @param string $url      URL.
     * @param string $urlModel Модель, которая обрабатывает URL и хранит данные о них.
     *
     * @return object класс с полями doctype, refid для отображения соответствующим
     *                типом модели, найденной по идентификатору.
     */
    public function findUrl($url, $urlModel)
    {
        $address = $urlModel::where('url', '=', $url)->first();
        if (! $address) {
            abort(404);
        }

        return $address;
    }

    /**
     * Поиск и создание прокси-объекта для вызова методов типа документа.
     *
     * @param string $url      URL.
     * @param string $urlModel Модель, которая обрабатывает URL и хранит данные о них.
     *
     * @return DoctypeResolver прокси-объект для вызова типа документа.
     */
    public function find($url, $urlModel)
    {
        $address = $this->findUrl($url, $urlModel);

        return DoctypeResolver::createDoctype($address->doctype, [$urlModel => function () use ($address) {
            return $address;
        }]);
    }

    /**
     * Переопределение вью для грида.
     *
     * @return array описание вьювера и данных для просмотра
     */
    public function gridView()
    {
        return [];
    }

    public function getModelView()
    {
        return [];
    }

    public function loadRelation($relation)
    {
        $relation;
        abort(400, 'Override Doctype::loadRelation()');
    }

    public function delete()
    {
    }

    /**
     * Получить список моделей, доступных для создания.
     *
     * @return array список классов типов, которые можно создавать внутри этого типа.
     */
    public function getSubtypes()
    {
        return [];
    }

    /**
     * Получить контекстное меню для текущего раздела.
     *
     * @return array массив с указанием возможных действий
     */
    public function getContextMenu()
    {
        return [];
    }

    /**
     * Подготовить данные для грида в указанном mount-id.
     *
     * @return array объект, содержащий заголовок грида и собственно данные
     */
    public function grid()
    {
        return new Main\GridBuilder();
    }

    /**
     * Загрузить связанные с моделью данные для редактирования.
     *
     * @return Editor класс для подгрузки полей в нужном формате
     */
    public function editor()
    {
        return (new Editor\Editor($this->model))->setInput(Request::all());
    }

    public function save()
    {
        $editor = $this->editor()->putData();
        if ($editor->model()->id) {
            Request::merge(['id' => $editor->model()->id]);
        }

        return $editor;
    }

    public function load()
    {
        $editor = $this->editor();

        return [
            'data' => $editor->getData(),
            'view' => $editor->getView(),
        ];
    }
}
